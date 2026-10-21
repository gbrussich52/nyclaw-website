"""Create only the public connector package; never archive the website or customer files."""
from pathlib import Path
import hashlib,json,zipfile
root=Path(__file__).resolve().parents[2]
files=['plugin.json','mcp.json','assets/icon.svg']
base=root/'chatgpt-contractor-plugin'
assert sorted(str(p.relative_to(base)) for p in base.rglob('*') if p.is_file())==sorted(files)
plugin=json.loads((base/'plugin.json').read_text())
info=plugin['extensions']['com.openai']
assert len(info['interface']['shortDescription'])<=30
assert len(info['review']['test_cases']['positive'])==5
assert len(info['review']['test_cases']['negative'])==3
assert info['review']['commerce'] is False
mcp=json.loads((base/'mcp.json').read_text())
assert mcp['mcpServers']['contractor-evidence']=={'type':'streamable-http','url':'https://nyclaw.io/api/contractors/mcp'}
out=root/'.release';out.mkdir(exist_ok=True)
archive=out/'nyclaw-contractor-plugin.zip'
with zipfile.ZipFile(archive,'w',compression=zipfile.ZIP_DEFLATED) as z:
 for name in files:
  raw=(base/name).read_bytes()
  assert b'PRIVATE KEY' not in raw and b'service_role' not in raw
  entry=zipfile.ZipInfo(name,(2026,10,20,0,0,0));entry.compress_type=zipfile.ZIP_DEFLATED;entry.external_attr=0o644<<16
  z.writestr(entry,raw)
with zipfile.ZipFile(archive) as z:
 assert sorted(z.namelist())==sorted(files)
 for name in files: assert z.read(name)==(base/name).read_bytes()
receipt={'file':archive.name,'files':files,'bytes':archive.stat().st_size,'sha256':hashlib.sha256(archive.read_bytes()).hexdigest(),'directory_status':'not_submitted'}
(out/'contractor-receipt.json').write_text(json.dumps(receipt,indent=2)+'\n')
print(json.dumps(receipt,indent=2))
