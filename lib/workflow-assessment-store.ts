// classification: PUBLIC
import { createHash } from 'node:crypto'
import { getRedisRestCredentials } from './rate-limit'
import { assessmentRecordSchema, type AssessmentInput, type AssessmentRecord, publicRecord } from './workflow-assessment'

const TTL_SECONDS = 30 * 24 * 60 * 60
const QUEUE_LIMIT = 1000
const QUEUE_KEY = 'nyclaw:workflow-assessments:v1:queue'
const recordKey = (reference: string) => `nyclaw:workflow-assessments:v1:record:${reference}`

const CREATE_SCRIPT = `
local record_type = redis.call('TYPE', KEYS[1]).ok
local queue_type = redis.call('TYPE', KEYS[2]).ok
if (record_type ~= 'none' and record_type ~= 'string') or (queue_type ~= 'none' and queue_type ~= 'list') then return 'corrupt' end
local existing = redis.call('GET', KEYS[1])
if existing then
  local ok, record = pcall(cjson.decode, existing)
  if not ok or type(record) ~= 'table' then return 'corrupt' end
  if record.digest == ARGV[1] then
    if redis.call('LPOS', KEYS[2], ARGV[4]) == false then return 'corrupt' end
    return 'duplicate'
  end
  return 'conflict'
end
if redis.call('LLEN', KEYS[2]) >= tonumber(ARGV[5]) then
  local refs = redis.call('LRANGE', KEYS[2], 0, -1)
  for _, ref in ipairs(refs) do
    if redis.call('EXISTS', ARGV[6] .. ref) == 0 then redis.call('LREM', KEYS[2], 0, ref) end
  end
end
if redis.call('LLEN', KEYS[2]) >= tonumber(ARGV[5]) then return 'full' end
redis.call('SET', KEYS[1], ARGV[2], 'EX', ARGV[3])
redis.call('LPUSH', KEYS[2], ARGV[4])
redis.call('EXPIRE', KEYS[2], ARGV[3])
return 'created'
`

const UPDATE_SCRIPT = `
local raw = redis.call('GET', KEYS[1])
if not raw then return 'missing' end
local ok, record = pcall(cjson.decode, raw)
if not ok or type(record) ~= 'table' or type(record.status) ~= 'string' then return 'corrupt' end
local current = record.status
local next = ARGV[1]
if current == next then return raw end
if current == 'closed' then return 'invalid' end
if current == 'received' and next ~= 'reviewing' then return 'invalid' end
if current == 'reviewing' and next ~= 'needs_info' and next ~= 'scoped' and next ~= 'closed' then return 'invalid' end
if current == 'needs_info' and next ~= 'reviewing' and next ~= 'closed' then return 'invalid' end
if current == 'scoped' and next ~= 'closed' then return 'invalid' end
record.status = next
record.updatedAt = ARGV[2]
local updated = cjson.encode(record)
redis.call('SET', KEYS[1], updated, 'KEEPTTL')
return updated
`

function credentials() {
  const creds = getRedisRestCredentials()
  if (!creds) throw new Error('storage_unconfigured')
  return creds
}

async function command(args: (string | number)[]): Promise<unknown> {
  const creds = credentials()
  const response = await fetch(creds.url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${creds.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(args),
    cache: 'no-store',
    signal: AbortSignal.timeout(3000),
  })
  if (!response.ok) throw new Error('storage_http_failure')
  const payload = await response.json() as { result?: unknown; error?: unknown }
  if (!payload || payload.error || !('result' in payload)) throw new Error('storage_command_failure')
  return payload.result
}

function parseRecord(value: unknown): AssessmentRecord {
  if (typeof value !== 'string') throw new Error('storage_record_missing_or_corrupt')
  let data: unknown
  try { data = JSON.parse(value) } catch { throw new Error('storage_record_corrupt') }
  const parsed = assessmentRecordSchema.safeParse(data)
  if (!parsed.success) throw new Error('storage_record_corrupt')
  return parsed.data
}

export async function storageReady(): Promise<boolean> {
  if (!getRedisRestCredentials()) return false
  try { return (await command(['PING'])) === 'PONG' } catch { return false }
}

export async function createAssessment(input: AssessmentInput): Promise<'created' | 'duplicate' | 'conflict' | 'full'> {
  const { requestId, website: _website, ts: _ts, contactConsent: _consent, ...fields } = input
  const digest = createHash('sha256').update(JSON.stringify(fields)).digest('hex')
  const now = new Date().toISOString()
  const record: AssessmentRecord = { reference: requestId, ...fields, status: 'received', createdAt: now, updatedAt: now, digest }
  const result = await command(['EVAL', CREATE_SCRIPT, 2, recordKey(requestId), QUEUE_KEY, digest, JSON.stringify(record), TTL_SECONDS, requestId, QUEUE_LIMIT, 'nyclaw:workflow-assessments:v1:record:'])
  if (result === 'created' || result === 'duplicate' || result === 'conflict' || result === 'full') return result
  throw new Error('storage_create_failure')
}

export async function listAssessments(): Promise<Omit<AssessmentRecord, 'digest'>[]> {
  const references = await command(['LRANGE', QUEUE_KEY, 0, QUEUE_LIMIT - 1])
  if (!Array.isArray(references) || references.some(ref => typeof ref !== 'string' || !/^[0-9a-f-]{36}$/i.test(ref))) throw new Error('storage_queue_corrupt')
  if (references.length === 0) return []
  const values = await command(['MGET', ...references.map(recordKey)])
  if (!Array.isArray(values) || values.length !== references.length) throw new Error('storage_read_failure')
  return values.flatMap((value, index) => {
    if (value === null) return [] // expired record; queue is bounded and expires too
    const record = parseRecord(value)
    if (record.reference !== references[index]) throw new Error('storage_record_mismatch')
    return [publicRecord(record)]
  })
}

export async function readAssessment(reference: string): Promise<Omit<AssessmentRecord, 'digest'> | null> {
  const raw = await command(['GET', recordKey(reference)])
  if (raw === null) return null
  const record = parseRecord(raw)
  if (record.reference !== reference) throw new Error('storage_record_mismatch')
  return publicRecord(record)
}

export async function updateAssessment(reference: string, status: Exclude<AssessmentRecord['status'], 'received'>): Promise<{ kind: 'updated'; item: Omit<AssessmentRecord, 'digest'> } | { kind: 'missing' } | { kind: 'invalid' }> {
  const result = await command(['EVAL', UPDATE_SCRIPT, 1, recordKey(reference), status, new Date().toISOString()])
  if (result === 'missing' || result === 'invalid') return { kind: result }
  const record = parseRecord(result)
  if (record.reference !== reference) throw new Error('storage_record_mismatch')
  return { kind: 'updated', item: publicRecord(record) }
}
