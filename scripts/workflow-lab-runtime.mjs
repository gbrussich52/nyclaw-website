// classification: PUBLIC
/** Shared local-only replay plumbing. Never connects to a hosted project. */
import { execFileSync } from 'node:child_process'
import { readdirSync, existsSync } from 'node:fs'
import { homedir } from 'node:os'
import { fileURLToPath } from 'node:url'
import assert from 'node:assert/strict'
export const root = fileURLToPath(new URL('../', import.meta.url))
export function localRuntime() {
  let status
  try {
    status = JSON.parse(execFileSync('supabase', ['status', '--workdir', root, '--output-format', 'json'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 30000 }))
  } catch { throw Error('Local stack status could not be read; no credentials emitted') }
  const env = status.env
  assert(env?.API_URL === 'http://127.0.0.1:54581' && env.DB_URL?.includes('@127.0.0.1:54582/'), 'Requires dedicated fictional loopback stack')
  const db = new URL(env.DB_URL)
  let psql = process.env.PSQL_BIN
  if (!psql) {
    const directory = `${homedir()}/.supabase/cache/stack/slim-services/postgres`
    for (const version of readdirSync(directory).sort().reverse()) {
      const candidate = `${directory}/${version}/${process.platform}-${process.arch}/bin/psql`
      if (existsSync(candidate)) { psql = candidate; break }
    }
  }
  assert(psql && existsSync(psql), 'Set PSQL_BIN to the local Postgres client')
  const run = (sql, file = false) => execFileSync(psql, [
    '--host', '127.0.0.1', '--port', '54582', '--username', 'postgres', '--dbname', 'postgres',
    '--no-psqlrc', '--set', 'ON_ERROR_STOP=1', '--tuples-only', '--no-align', file ? '--file' : '--command', sql,
  ], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 30000, env: { ...process.env, PGPASSWORD: decodeURIComponent(db.password) } })
  const resetFixtures = () => {
    const shape = run("select (select count(*) from workflow_lab.workspaces)=2 and (select count(*) from workflow_lab.cases)=6 and not exists(select 1 from workflow_lab.cases where id::text not in ('30000000-0000-4000-8000-000000000001','30000000-0000-4000-8000-000000000002','30000000-0000-4000-8000-000000000003','30000000-0000-4000-8000-000000000004','30000000-0000-4000-8000-000000000005','30000000-0000-4000-8000-000000000006'));")
    assert(shape.trim() === 't', 'Replay refuses a database that differs from the six-case fictional fixture')
    run("begin; truncate workflow_lab.events,workflow_lab.draft_requests,workflow_lab.drafts restart identity; update workflow_lab.cases set version=1, observed_at=clock_timestamp()-case when id='30000000-0000-4000-8000-000000000004' then interval '8 days' else interval '1 hour' end; commit;")
  }
  return { env, sql: (sql) => run(sql), sqlFile: (file) => run(file, true), resetFixtures }
}
