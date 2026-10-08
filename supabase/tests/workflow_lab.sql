-- Execute as local postgres after Auth fixtures + seed. Rolls back all test mutations.
-- No credentials, remote access or production writes. Failure raises an exception.
begin;
delete from workflow_lab.events;
delete from workflow_lab.draft_requests;
delete from workflow_lab.drafts;
create temporary table workflow_test_ids(name text primary key,id uuid);
grant select,insert,update on workflow_test_ids to authenticated;
create function pg_temp.expect_error(command text,expected_state text) returns void
language plpgsql as $$
begin
 begin
  execute command;
 exception when others then
  if sqlstate=expected_state then return; end if;
  raise exception 'Unexpected SQLSTATE: %, expected %',sqlstate,expected_state;
 end;
 raise exception 'Expected rejection, operation succeeded';
end $$;

set local role anon;
select pg_temp.expect_error('select workflow_lab.describe_session()','42501');
reset role;
select set_config('request.jwt.claim.sub','10000000-0000-4000-8000-000000000001',true);
set local role authenticated;
do $$
declare data jsonb;
begin
 if (workflow_lab.describe_session()->>'role')<>'staff' then raise exception 'Wrong persona'; end if;
 if (select count(*) from workflow_lab.cases)<>5 then raise exception 'Cross-firm RLS leak'; end if;
 data:=workflow_lab.list_document_exceptions();
 if jsonb_array_length(data)<>5 then raise exception 'Cross-firm RPC leak'; end if;
 if data->0->>'state'<>'followup' or data->1->>'state'<>'complete' or data->2->>'state'<>'review' or data->3->>'state'<>'review' then raise exception 'Classification failed'; end if;
 if data->0->'latestDraftId'<>'null'::jsonb then raise exception 'Unexpected initial draft'; end if;
end $$;
select pg_temp.expect_error('select workflow_lab.acquire_mutation_session()','42501');
select pg_temp.expect_error('update workflow_lab.cases set version=2','42501');
select pg_temp.expect_error('insert into workflow_lab.events(draft_id,kind,actor_id,detail) values(null,''x'',null,''x'')','42501');
select pg_temp.expect_error('update workflow_lab.memberships set active=false','42501');
select pg_temp.expect_error('select workflow_lab.prepare_followup_draft(''30000000-0000-4000-8000-000000000006'',''50000000-0000-4000-8000-000000000001'')','42501');
select pg_temp.expect_error('select workflow_lab.prepare_followup_draft(''30000000-0000-4000-8000-000000000002'',''50000000-0000-4000-8000-000000000001'')','40001');
select pg_temp.expect_error('select workflow_lab.prepare_followup_draft(''30000000-0000-4000-8000-000000000003'',''50000000-0000-4000-8000-000000000001'')','40001');
select pg_temp.expect_error('select workflow_lab.prepare_followup_draft(''30000000-0000-4000-8000-000000000004'',''50000000-0000-4000-8000-000000000001'')','40001');
insert into workflow_test_ids values('missing',(workflow_lab.prepare_followup_draft('30000000-0000-4000-8000-000000000001','50000000-0000-4000-8000-000000000001')->>'id')::uuid);
do $$
declare did uuid; data jsonb;
begin
 select id into did from workflow_test_ids where name='missing';
 if (workflow_lab.prepare_followup_draft('30000000-0000-4000-8000-000000000001','50000000-0000-4000-8000-000000000001')->>'id')::uuid<>did then raise exception 'Retry duplicate'; end if;
 if (workflow_lab.prepare_followup_draft('30000000-0000-4000-8000-000000000001','50000000-0000-4000-8000-000000000002')->>'id')::uuid<>did then raise exception 'Case version duplicate'; end if;
 data:=workflow_lab.list_document_exceptions();
 if (data->0->>'latestDraftId')::uuid<>did then raise exception 'Draft discovery failed'; end if;
 perform pg_temp.expect_error(format('select workflow_lab.approve_followup(%L)',did),'42501');
 perform pg_temp.expect_error(format('select workflow_lab.simulate_delivery(%L,''confirmed'')',did),'42501');
end $$;
select pg_temp.expect_error('select workflow_lab.prepare_followup_draft(''30000000-0000-4000-8000-000000000005'',''50000000-0000-4000-8000-000000000001'')','40001');
insert into workflow_test_ids values('instruction',(workflow_lab.prepare_followup_draft('30000000-0000-4000-8000-000000000005','50000000-0000-4000-8000-000000000005')->>'id')::uuid);
reset role;
select set_config('request.jwt.claim.sub','10000000-0000-4000-8000-000000000004',true);
set local role authenticated;
select pg_temp.expect_error(format('select workflow_lab.get_workflow_receipt(%L)',id),'42501') from workflow_test_ids where name='missing';
select pg_temp.expect_error(format('select workflow_lab.approve_followup(%L)',id),'42501') from workflow_test_ids where name='missing';
reset role;
select set_config('request.jwt.claim.sub','10000000-0000-4000-8000-000000000002',true);
set local role authenticated;
select workflow_lab.approve_followup(id) from workflow_test_ids where name='missing';
select workflow_lab.simulate_delivery(id,'failed') from workflow_test_ids where name='missing';
do $$
declare did uuid; first_receipt jsonb; retry_receipt jsonb;
begin
 select id into did from workflow_test_ids where name='missing';
 first_receipt:=workflow_lab.simulate_delivery(did,'confirmed');
 retry_receipt:=workflow_lab.simulate_delivery(did,'confirmed');
 if first_receipt<>retry_receipt or first_receipt->>'status'<>'simulated_confirmed' then raise exception 'Confirmation receipt not idempotent'; end if;
 if (select count(*) from workflow_lab.events where draft_id=did and kind='simulated_confirmed')<>1 then raise exception 'Duplicate confirmation'; end if;
 if (workflow_lab.list_document_exceptions()->0->>'state')<>'followup' then raise exception 'Delivery falsely completed case'; end if;
end $$;
select workflow_lab.approve_followup(id) from workflow_test_ids where name='instruction';
do $$
declare did uuid; before_receipt jsonb;
begin
 select id into did from workflow_test_ids where name='instruction';
 before_receipt:=workflow_lab.simulate_delivery(did,'timeout');
 if before_receipt->>'status'<>'unconfirmed' then raise exception 'Timeout was not unconfirmed'; end if;
 if workflow_lab.simulate_delivery(did,'confirmed')<>before_receipt then raise exception 'Timeout automatically retried'; end if;
 perform pg_temp.expect_error(format('select workflow_lab.approve_followup(%L)',did),'40001');
end $$;
reset role;
-- Change version invalidates prior approval and draft reuse.
update workflow_lab.cases set version=version+1 where id='30000000-0000-4000-8000-000000000001';
set local role authenticated;
select pg_temp.expect_error(format('select workflow_lab.simulate_delivery(%L,''confirmed'')',id),'40001') from workflow_test_ids where name='missing';
select pg_temp.expect_error('select workflow_lab.prepare_followup_draft(''30000000-0000-4000-8000-000000000001'',''50000000-0000-4000-8000-000000000001'')','40001');
insert into workflow_test_ids values('new_version',(workflow_lab.prepare_followup_draft('30000000-0000-4000-8000-000000000001','50000000-0000-4000-8000-000000000009')->>'id')::uuid);
select workflow_lab.approve_followup(id) from workflow_test_ids where name='new_version';
reset role;
update workflow_lab.drafts set approval_expires_at=now()-interval '1 minute' where id=(select id from workflow_test_ids where name='new_version');
set local role authenticated;
select pg_temp.expect_error(format('select workflow_lab.simulate_delivery(%L,''confirmed'')',id),'40001') from workflow_test_ids where name='new_version';
select workflow_lab.approve_followup(id) from workflow_test_ids where name='new_version';
reset role;
update workflow_lab.drafts set body=body||' altered' where id=(select id from workflow_test_ids where name='new_version');
set local role authenticated;
select pg_temp.expect_error(format('select workflow_lab.simulate_delivery(%L,''confirmed'')',id),'40001') from workflow_test_ids where name='new_version';
select workflow_lab.approve_followup(id) from workflow_test_ids where name='new_version';
reset role;
update workflow_lab.memberships set active=false where user_id='10000000-0000-4000-8000-000000000002';
set local role authenticated;
select pg_temp.expect_error('select workflow_lab.describe_session()','42501');
select pg_temp.expect_error('select workflow_lab.list_document_exceptions()','42501');
select pg_temp.expect_error(format('select workflow_lab.get_workflow_receipt(%L)',id),'42501') from workflow_test_ids where name='missing';
do $$begin if (select count(*) from workflow_lab.cases)<>0 then raise exception 'Revoked member sees data'; end if; end $$;
reset role;
-- A still-active new reviewer replaces a valid-but-revoked reviewer's approval.
update workflow_lab.memberships set role='reviewer' where user_id='10000000-0000-4000-8000-000000000001';
select set_config('request.jwt.claim.sub','10000000-0000-4000-8000-000000000001',true);
set local role authenticated;
do $$
declare receipt jsonb;
begin
 select workflow_lab.approve_followup(id) into receipt from workflow_test_ids where name='new_version';
 if receipt->>'approvedBy'<>'10000000-0000-4000-8000-000000000001' or receipt->>'status'<>'approved' then raise exception 'Revoked approver was reused'; end if;
end $$;
reset role;
rollback;
