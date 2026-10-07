// classification: PUBLIC
import { z } from 'zod'

const singleLine = (max: number) => z.string().trim().min(1).max(max).refine(v => !/[\x00-\x1f<>]/.test(v))

export const assessmentSchema = z.strictObject({
  requestId: z.string().uuid(),
  name: singleLine(80),
  email: z.string().trim().email().max(254).transform(v => v.toLowerCase()),
  firm: singleLine(120),
  workflow: z.enum(['intake', 'documents', 'billing']),
  software: z.string().trim().max(120).refine(v => !v || (/^[\p{L}\p{N}][\p{L}\p{N} .&+()/,\-]*$/u.test(v) && v.split(',').length <= 4 && v.split(',').every(part => part.trim().length <= 40))),
  bottleneck: z.enum(['chasing', 'reentry', 'ownership', 'review']),
  volume: z.enum(['low', 'medium', 'high', 'unknown']),
  contactConsent: z.literal(true),
  website: z.string().max(120),
  ts: z.number().int(),
})

export type AssessmentInput = z.infer<typeof assessmentSchema>
export type AssessmentStatus = 'received' | 'reviewing' | 'needs_info' | 'scoped' | 'closed'
export const assessmentStatusSchema = z.enum(['received', 'reviewing', 'needs_info', 'scoped', 'closed'])
export const assessmentUpdateSchema = z.strictObject({ status: z.enum(['reviewing', 'needs_info', 'scoped', 'closed']) })

export interface AssessmentRecord {
  reference: string
  name: string
  email: string
  firm: string
  workflow: AssessmentInput['workflow']
  software: string
  bottleneck: AssessmentInput['bottleneck']
  volume: AssessmentInput['volume']
  status: AssessmentStatus
  createdAt: string
  updatedAt: string
  digest: string
}

export const assessmentRecordSchema = z.strictObject({
  reference: z.string().uuid(),
  name: singleLine(80),
  email: z.email().max(254),
  firm: singleLine(120),
  workflow: z.enum(['intake', 'documents', 'billing']),
  software: z.string().max(120),
  bottleneck: z.enum(['chasing', 'reentry', 'ownership', 'review']),
  volume: z.enum(['low', 'medium', 'high', 'unknown']),
  status: assessmentStatusSchema,
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  digest: z.string().regex(/^[a-f0-9]{64}$/),
})

export type PublicAssessmentResponse = { ok: true; reference: string; status: 'received' }
export type AssessmentListResponse = { items: Omit<AssessmentRecord, 'digest'>[]; count: number }

export function publicRecord(record: AssessmentRecord): Omit<AssessmentRecord, 'digest'> {
  return {
    reference: record.reference, name: record.name, email: record.email, firm: record.firm,
    workflow: record.workflow, software: record.software, bottleneck: record.bottleneck,
    volume: record.volume, status: record.status, createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  }
}
