import { expect, test } from 'vitest'
import { evaluateFit, fitSchema, formatFitBrief } from './workflow-fit'
const base = {recipe:'quote-followup',weeklyCases:20,minutesPerCase:15,nativeSupport:'no',reviewOwner:'yes'} as const
test.each([['yes','yes','native_first'],['yes','no','native_first'],['unknown','yes','native_check'],['no','no','groundwork'],['no','yes','scoped_review']])('route %s/%s conservatively', (nativeSupport,reviewOwner,route)=>{expect(evaluateFit({...base,nativeSupport,reviewOwner}).route).toBe(route)})
test('zero baseline supports manual measurement, not custom sales',()=>{expect(evaluateFit({...base,weeklyCases:0}).route).toBe('manual_first');expect(evaluateFit({...base,minutesPerCase:0}).route).toBe('manual_first')})
test.each([null,{}, {...base,weeklyCases:'20'},{...base,weeklyCases:-1},{...base,minutesPerCase:NaN},{...base,weeklyCases:Infinity},{...base,weeklyCases:10001},{...base,minutesPerCase:241},{...base,weeklyCases:1.5},{...base,recipe:'__proto__'},{...base,route:'approved'},{...base,reviewOwner:'unknown'}])('rejects incomplete, coerced or injected facts %#',value=>expect(fitSchema.safeParse(value).success).toBe(false))
test('baseline exact and brief never promises savings or a contract',()=>{expect(evaluateFit(base).weeklyHours).toBe(5);expect(formatFitBrief(base)).toContain('baseline, not estimated savings');expect(formatFitBrief(base)).toContain('separate agreement')})
test('repeat calls preserve exact deterministic brief',()=>expect(formatFitBrief(base)).toBe(formatFitBrief(base)))
