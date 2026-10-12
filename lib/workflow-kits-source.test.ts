import {expect,test} from 'vitest';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
test('browser domain bytes match the published package source',()=>{
 const manifest=JSON.parse(readFileSync(new URL('../public/workflow-kits-release.json',import.meta.url),'utf8'));
 const bytes=readFileSync(new URL('./workflow-kits.ts',import.meta.url));
 expect(createHash('sha256').update(bytes).digest('hex')).toBe(manifest.core_sha256);
 expect(manifest.version).toBe('0.1.4');
});
