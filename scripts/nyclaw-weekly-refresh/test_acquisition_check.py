import copy
import datetime as dt
import importlib.util
import json
import os
from pathlib import Path
import subprocess
import tempfile
import unittest
from unittest.mock import patch, MagicMock

HERE=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('acquisition',HERE/'acquisition-check.py')
a=importlib.util.module_from_spec(spec);spec.loader.exec_module(a)
NOW=dt.datetime.now(dt.timezone.utc)

class AcquisitionTests(unittest.TestCase):
 def packet(self):
  return {'schema_version':1,'generated_at':NOW.isoformat(),'run_id':'fixture-run','outreach_authorized':False,'sent_count':0,'checked_sources':['https://firmcompany.com/practice'],'companies':[{'name':'Fictional Company','domain':'firmcompany.com','location':'New York','source_url':'https://firmcompany.com/practice','observed_at':NOW.isoformat(),'quoted_evidence':'We handle residential transactions.','workflow_fit':'Document follow-up is a workflow hypothesis, not stated buying intent.','intent':'workflow_fit','status':'draft','draft':{'subject':'Review a document handoff','body':'AI-prepared draft for NYClaw. Your company site describes residential transactions. Would a free fit call be relevant? Follow-on scope and fee agreed in writing. '+a.LINK}}]}
 def test_valid_and_honest_empty(self):
  self.assertTrue(a.validate(self.packet(),'fixture-run',NOW))
  p=self.packet();p['companies']=[];p['no_matches_reason']='No new primary evidence beyond prior companies.'
  self.assertTrue(a.validate(p,now=NOW))
  del p['no_matches_reason']
  with self.assertRaises(ValueError):a.validate(p,now=NOW)
 def test_source_budget_accepts_eight_and_rejects_ninth(self):
  p=self.packet()
  p['checked_sources']=['https://firmcompany.com/practice']+[f'https://firmcompany.com/page-{i}' for i in range(7)]
  self.assertTrue(a.validate(p,now=NOW))
  p['checked_sources'].append('https://firmcompany.com/ninth')
  with self.assertRaises(ValueError):a.validate(p,now=NOW)
 def test_stale_future_run_and_send_gates(self):
  for field,value in [('generated_at',(NOW-dt.timedelta(days=9)).isoformat()),('generated_at',(NOW+dt.timedelta(minutes=6)).isoformat()),('sent_count',1),('outreach_authorized',True),('schema_version',True)]:
   p=self.packet();p[field]=value
   with self.assertRaises(ValueError):a.validate(p,now=NOW)
  with self.assertRaises(ValueError):a.validate(self.packet(),'wrong',NOW)
 def test_company_and_evidence_boundaries(self):
  for field,value in [('source_url','https://differentcompany.com/practice'),('domain','127.0.0.1'),('intent','buying'),('quoted_evidence','word '*26),('location','person@example.com')]:
   p=self.packet();p['companies'][0][field]=value
   with self.assertRaises(ValueError):a.validate(p,now=NOW)
  p=self.packet();p['companies']*=2
  with self.assertRaises(ValueError):a.validate(p,now=NOW)
  p['companies']*=2
  with self.assertRaises(ValueError):a.validate(p,now=NOW)
  p=self.packet();p['companies'][0]['draft']['body']='Please buy now'
  with self.assertRaises(ValueError):a.validate(p,now=NOW)
 def test_public_urls(self):
  for url in ['http://localhost/','http://127.0.0.1/','http://[::1]/','http://host.local/','https://user:pass@company.com/','file:///tmp/file']:
   with self.assertRaises(ValueError):a.host(url)
  p=self.packet();p['companies'][0]['source_url']='https://news.firmcompany.com/practice';p['checked_sources']=[p['companies'][0]['source_url']]
  self.assertTrue(a.validate(p,now=NOW))
 def test_plan_run_and_word_limit(self):
  with tempfile.TemporaryDirectory() as tmp:
   p=Path(tmp)/'plan.md';p.write_text('Run ID: fixture-run\nOne measured next step.')
   a.validate_plan(p,'fixture-run')
   p.write_text('Run ID: fixture-run\n'+'word '*1201)
   with self.assertRaises(ValueError):a.validate_plan(p,'fixture-run')
 def test_model_failure_runs_scope_guard_and_invalidates_previous_health(self):
  with tempfile.TemporaryDirectory() as tmp:
   root=Path(tmp);scripts=root/'scripts/nyclaw-weekly-refresh';scripts.mkdir(parents=True)
   runner=scripts/'run.sh';runner.write_text((HERE/'run.sh').read_text().replace('/Users/gianibrussich/project-claude/scripts/loops/preflight-quota.sh',str(root/'missing-preflight.sh')))
   (scripts/'scope-guard.sh').write_text('#!/bin/bash\necho "$1" >> "'+str(root/'guard-calls')+'"\n')
   model=root/'fake-model';model.write_text('#!/bin/bash\n[ "$1" = --model ] || exit 9\nexit 7\n');model.chmod(0o755)
   logs=scripts/'logs';logs.mkdir();(logs/'acquisition-health.json').write_text('{"ok":true}')
   result=subprocess.run(['bash',str(runner)],env={**os.environ,'GROK_BIN':str(model)},capture_output=True)
   self.assertEqual(result.returncode,2,result.stderr.decode()+result.stdout.decode()+''.join(x.read_text() for x in logs.glob('*.log')))
   health=json.loads((logs/'acquisition-health.json').read_text());self.assertFalse(health['ok']);self.assertEqual(health['status'],'model_failed')
   self.assertEqual((root/'guard-calls').read_text().splitlines(),['before','after'])

class SourceTests(unittest.TestCase):
 packet=AcquisitionTests.packet
 def test_excerpt_is_bounded_relevant_case_preserved_and_contacts_removed(self):
  page='<script>InvisibleDocument</script><style>HiddenIntake</style><p>'+'Noise '*800+'New York Document Intake records for fictional firm. Email hello@firmcompany.com or call (212) 555-0199. '+'Tail '*900+'</p>'
  excerpt=a.source_excerpt(page)
  self.assertLessEqual(len(excerpt.split()),600)
  self.assertIn('New York Document Intake records',excerpt)
  self.assertNotIn('hello@',excerpt);self.assertNotIn('555-0199',excerpt)
  self.assertNotIn('InvisibleDocument',excerpt);self.assertNotIn('HiddenIntake',excerpt)
  plain=a.source_excerpt('<p>'+'Ordinary '*900+'</p>')
  self.assertEqual(len(plain.split()),600)
  self.assertTrue(plain.startswith('Ordinary'))
 def test_visible_quote_verification_rejects_fabrication_and_hidden_scripts(self):
  p=self.packet()
  self.assertTrue(a.verify_sources(p,lambda url:'<p>We handle residential transactions.</p>'))
  for page in ['<p>Unrelated firm description.</p>','<script>We handle residential transactions.</script><p>Other</p>','<style>We handle residential transactions.</style>']:
   with self.assertRaises(ValueError):a.verify_sources(p,lambda url:page)
  p['companies']=[];p['no_matches_reason']='No qualifying evidence.'
  self.assertTrue(a.verify_sources(p,lambda url:'<p>Company practice page</p>'))
  with self.assertRaises(ValueError):a.verify_sources(p,lambda url:'<script>Only scripts</script>')
 def test_resolution_rejects_any_private_ip(self):
  with patch.object(a.socket,'getaddrinfo',return_value=[(2,1,6,'',('93.184.216.34',443)),(2,1,6,'',('127.0.0.1',443))]):
   with self.assertRaises(ValueError):a.public_ips('firmcompany.com')
  with patch.object(a.socket,'getaddrinfo',return_value=[(2,1,6,'',('93.184.216.34',443))]):
   self.assertEqual(a.public_ips('firmcompany.com'),['93.184.216.34'])
 def test_fetch_timeout_and_redirect_are_not_evidence(self):
  for failure in [TimeoutError(),a.urllib.error.HTTPError('https://firmcompany.com',302,'redirect',{},None)]:
   with patch.object(a,'public_ips',return_value=['93.184.216.34']),patch.object(a.urllib.request,'build_opener') as opener:
    opener.return_value.open.side_effect=failure
    with self.assertRaises(Exception):a.fetch_source('https://firmcompany.com')
    self.assertEqual(opener.return_value.open.call_args.kwargs['timeout'],10)
 def test_model_timeout_still_runs_guard_and_fails_health(self):
  with tempfile.TemporaryDirectory() as tmp:
   root=Path(tmp);scripts=root/'scripts/nyclaw-weekly-refresh';scripts.mkdir(parents=True)
   runner=scripts/'run.sh';runner.write_text((HERE/'run.sh').read_text().replace('/Users/gianibrussich/project-claude/scripts/loops/preflight-quota.sh',str(root/'absent')))
   (scripts/'scope-guard.sh').write_text('#!/bin/bash\necho "$1" >> "'+str(root/'calls')+'"\n')
   model=root/'model';model.write_text('#!/bin/bash\nsleep 30\n');model.chmod(0o755)
   result=subprocess.run(['bash',str(runner)],env={**os.environ,'GROK_BIN':str(model),'GROK_TIMEOUT_SECONDS':'1'},capture_output=True,timeout=8)
   self.assertEqual(result.returncode,2);self.assertEqual((root/'calls').read_text().splitlines(),['before','after'])
   self.assertEqual(json.loads((scripts/'logs/acquisition-health.json').read_text())['status'],'model_timeout')
 def test_latest_requires_unchanged_packet_and_source_proof_without_fetch(self):
  with tempfile.TemporaryDirectory() as tmp:
   root=Path(tmp);folder=root/'docs/loop';folder.mkdir(parents=True);logs=root/'scripts/nyclaw-weekly-refresh/logs';logs.mkdir(parents=True)
   date=NOW.strftime('%Y-%m-%d');packet=folder/f'acquisition-{date}.json';packet.write_text(json.dumps(self.packet()))
   (folder/f'weekly-refresh-{date}.md').write_text('Run ID: fixture-run\nReview one measurable next step.')
   health={'ok':True,'checked_at':NOW.isoformat(),'date':date,'run_id':'fixture-run','source_verified':True,'packet_sha256':a.hashlib.sha256(packet.read_bytes()).hexdigest()}
   (logs/'acquisition-health.json').write_text(json.dumps(health))
   command=['python3',str(HERE/'acquisition-check.py'),'--root',str(root),'--validate-latest','--json']
   self.assertEqual(subprocess.run(command,capture_output=True).returncode,0)
   packet.write_text(packet.read_text()+' ')
   self.assertEqual(subprocess.run(command,capture_output=True).returncode,2)
 def test_actual_scope_guard_flags_clean_change_and_preserves_dirty_before(self):
  with tempfile.TemporaryDirectory() as tmp:
   root=Path(tmp);scripts=root/'scripts/nyclaw-weekly-refresh';scripts.mkdir(parents=True)
   guard=scripts/'scope-guard.sh';guard.write_text((HERE/'scope-guard.sh').read_text())
   def git(*args):subprocess.run(['git','-C',str(root),*args],check=True,capture_output=True)
   git('init');(root/'clean.txt').write_text('original');(root/'dirty.txt').write_text('original');git('add','.');git('-c','user.name=Fixture','-c','user.email=fixture@invalid.test','commit','-m','fixture')
   (root/'dirty.txt').write_text('existing work')
   snap=root/'snapshot';subprocess.run(['bash',str(guard),'before',str(snap)],check=True)
   (root/'clean.txt').write_text('model edit');(root/'dirty.txt').write_text('concurrent work')
   result=subprocess.run(['bash',str(guard),'after',str(snap),str(root/'plan.md')],capture_output=True)
   self.assertNotEqual(result.returncode,0);self.assertEqual((root/'clean.txt').read_text(),'original');self.assertEqual((root/'dirty.txt').read_text(),'concurrent work')

if __name__=='__main__':unittest.main()
