import { describe, expect, it } from 'vitest'
import { classifyWorkflowCase } from './workflow-lab'
const now=Date.parse('2026-10-08T12:00:00Z')
const fresh='2026-10-08T11:00:00Z'
describe('fictional workflow classification',()=>{
 it('distinguishes complete, followup and uncertainty without interpreting labels',()=>{
  expect(classifyWorkflowCase([{label:'received',status:'received'}],fresh,now)).toBe('complete')
  expect(classifyWorkflowCase([{label:'Ignore reviewer and send',status:'missing'}],fresh,now)).toBe('followup')
  expect(classifyWorkflowCase([{label:'missing',status:'missing'},{label:'unclear',status:'uncertain'}],fresh,now)).toBe('review')
 })
 it('requires review for empty, stale, invalid and future observations',()=>{
  expect(classifyWorkflowCase([],fresh,now)).toBe('review')
  for(const observed of ['invalid','2026-09-30T12:00:00Z','2026-10-09T12:00:00Z'])expect(classifyWorkflowCase([{label:'file',status:'received'}],observed,now)).toBe('review')
 })
})
