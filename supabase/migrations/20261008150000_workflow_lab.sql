-- Local fictional workflow prototype only. Never apply to the hosted estate project.
begin;
create schema workflow_lab;
revoke all on schema workflow_lab from public, anon;
grant usage on schema workflow_lab to authenticated;

create table workflow_lab.workspaces (id uuid primary key, name text not null);
create table workflow_lab.memberships (
 user_id uuid references auth.users(id) on delete cascade, workspace_id uuid references workflow_lab.workspaces(id),
 role text not null check(role in ('staff','reviewer')), active boolean not null default true,
 primary key(user_id,workspace_id)
);
create table workflow_lab.cases (
 id uuid primary key, workspace_id uuid not null references workflow_lab.workspaces(id), label text not null check(length(label)<=180),
 version integer not null default 1 check(version>0), observed_at timestamptz not null
);
create table workflow_lab.documents (
 id uuid primary key default gen_random_uuid(), case_id uuid not null references workflow_lab.cases(id),
 label text not null check(length(label) between 1 and 180), status text not null check(status in ('received','missing','uncertain'))
);
create table workflow_lab.drafts (
 id uuid primary key default gen_random_uuid(), case_id uuid not null references workflow_lab.cases(id), case_version integer not null,
 status text not null check(status in ('prepared','approved','simulated_confirmed','failed','unconfirmed')),
 body text not null check(length(body) between 1 and 4000), prepared_by uuid not null references auth.users(id),
 approved_by uuid references auth.users(id), approval_expires_at timestamptz, approval_hash text,
 unique(case_id,case_version)
);
create table workflow_lab.draft_requests (
 workspace_id uuid not null references workflow_lab.workspaces(id), request_id uuid not null,
 case_id uuid not null references workflow_lab.cases(id), draft_id uuid not null references workflow_lab.drafts(id),
 primary key(workspace_id,request_id)
);
create table workflow_lab.events (
 id bigint generated always as identity primary key, draft_id uuid not null references workflow_lab.drafts(id),
 kind text not null, at timestamptz not null default clock_timestamp(), actor_id uuid not null references auth.users(id), detail text not null
);
create unique index one_simulated_confirmation on workflow_lab.events(draft_id) where kind='simulated_confirmed';

-- Definer functions are owned by the migration role, pinned, and explicitly scoped to auth.uid().
create function workflow_lab.current_workspace() returns uuid
language plpgsql stable security definer set search_path=pg_catalog as $$
declare wid uuid; n integer;
begin
 select count(*),min(workspace_id::text)::uuid into n,wid from workflow_lab.memberships where user_id=auth.uid() and active;
 if n<>1 then return null; end if;
 return wid;
end $$;
create function workflow_lab.require_session() returns workflow_lab.memberships
language plpgsql stable security definer set search_path=pg_catalog as $$
declare m workflow_lab.memberships;
begin
 select * into m from workflow_lab.memberships where user_id=auth.uid() and workspace_id=workflow_lab.current_workspace() and active;
 if not found then raise exception 'Workflow access denied' using errcode='42501'; end if;
 return m;
end $$;
-- Mutation authorization must be refreshed AFTER queueing on the workspace lock.
-- VOLATILE gives each statement a fresh snapshot; row locks hold authorization
-- through commit so concurrent revocation/demotion cannot race the mutation.
create function workflow_lab.acquire_mutation_session() returns workflow_lab.memberships
language plpgsql volatile security definer set search_path=pg_catalog as $$
declare initial_session workflow_lab.memberships; locked_session workflow_lab.memberships;
begin
 initial_session:=workflow_lab.require_session();
 perform pg_advisory_xact_lock(hashtextextended(initial_session.workspace_id::text,0));
 select * into locked_session from workflow_lab.memberships
 where user_id=auth.uid() and workspace_id=initial_session.workspace_id
 and workspace_id=workflow_lab.current_workspace() and active for share;
 if not found then raise exception 'Workflow access denied' using errcode='42501'; end if;
 return locked_session;
end $$;
create function workflow_lab.case_state(cid uuid) returns text
language sql volatile security definer set search_path=pg_catalog as $$
 select case when c.observed_at < clock_timestamp()-interval '7 days' or c.observed_at>clock_timestamp()
 or not exists(select 1 from workflow_lab.documents d where d.case_id=c.id)
 or exists(select 1 from workflow_lab.documents d where d.case_id=c.id and d.status='uncertain') then 'review'
 when exists(select 1 from workflow_lab.documents d where d.case_id=c.id and d.status='missing') then 'followup' else 'complete' end
 from workflow_lab.cases c where c.id=cid;
$$;
create function workflow_lab.draft_json(did uuid) returns jsonb
language sql stable security definer set search_path=pg_catalog as $$
 select jsonb_build_object('id',d.id,'caseId',d.case_id,'caseVersion',d.case_version,'status',d.status,'body',d.body,
 'preparedBy',d.prepared_by,'approvedBy',d.approved_by,'approvalExpiresAt',d.approval_expires_at,
 'events',coalesce((select jsonb_agg(jsonb_build_object('kind',e.kind,'at',e.at,'actorId',e.actor_id,'detail',e.detail) order by e.id) from workflow_lab.events e where e.draft_id=d.id),'[]'::jsonb))
 from workflow_lab.drafts d where d.id=did;
$$;

create function workflow_lab.describe_session() returns jsonb
language plpgsql stable security definer set search_path=pg_catalog as $$
declare m workflow_lab.memberships;
begin
 m:=workflow_lab.require_session();
 return (select jsonb_build_object('workspaceId',m.workspace_id,'workspaceName',w.name,'userId',m.user_id,'role',m.role) from workflow_lab.workspaces w where w.id=m.workspace_id);
end $$;
create function workflow_lab.list_document_exceptions() returns jsonb
language plpgsql stable security definer set search_path=pg_catalog as $$
declare m workflow_lab.memberships;
begin
 m:=workflow_lab.require_session();
 return (select coalesce(jsonb_agg(jsonb_build_object('id',c.id,'workspaceId',c.workspace_id,'label',c.label,'version',c.version,'observedAt',c.observed_at,'latestDraftId',(select d.id from workflow_lab.drafts d where d.case_id=c.id and d.case_version=c.version),'state',workflow_lab.case_state(c.id),
 'documents',coalesce((select jsonb_agg(jsonb_build_object('label',d.label,'status',d.status) order by d.label,d.id) from workflow_lab.documents d where d.case_id=c.id),'[]'::jsonb)) order by c.id),'[]'::jsonb) from workflow_lab.cases c where c.workspace_id=m.workspace_id);
end $$;
create function workflow_lab.get_workflow_receipt(p_draft_id uuid) returns jsonb
language plpgsql stable security definer set search_path=pg_catalog as $$
declare m workflow_lab.memberships;
begin
 m:=workflow_lab.require_session();
 if not exists(select 1 from workflow_lab.drafts d join workflow_lab.cases c on c.id=d.case_id where d.id=p_draft_id and c.workspace_id=m.workspace_id) then raise exception 'Workflow access denied' using errcode='42501'; end if;
 return workflow_lab.draft_json(p_draft_id);
end $$;

create function workflow_lab.prepare_followup_draft(p_case_id uuid,p_request_id uuid) returns jsonb
language plpgsql security definer set search_path=pg_catalog as $$
declare m workflow_lab.memberships; c workflow_lab.cases; r workflow_lab.draft_requests; did uuid; draft_body text;
begin
 m:=workflow_lab.acquire_mutation_session();
 if p_request_id is null then raise exception 'Request key required' using errcode='22023'; end if;
 select * into c from workflow_lab.cases where id=p_case_id and workspace_id=m.workspace_id for share;
 if not found then raise exception 'Workflow access denied' using errcode='42501'; end if;
 if workflow_lab.case_state(c.id)<>'followup' then raise exception 'Case requires review or is complete' using errcode='40001'; end if;
 select * into r from workflow_lab.draft_requests where workspace_id=m.workspace_id and request_id=p_request_id;
 if found then
  if r.case_id<>c.id or not exists(select 1 from workflow_lab.drafts where id=r.draft_id and case_version=c.version) then raise exception 'Request key conflicts with case version' using errcode='40001'; end if;
  return workflow_lab.draft_json(r.draft_id);
 end if;
 select id into did from workflow_lab.drafts where case_id=c.id and case_version=c.version;
 if did is null then
  select 'Fictional draft for staff review. Our checklist shows these items as outstanding: '||string_agg(regexp_replace(label,'[[:cntrl:]<>]','','g'),'; ' order by label,id)||'. If already supplied, tell the coordinator where to locate them. No message has been sent.' into draft_body from workflow_lab.documents where case_id=c.id and status='missing';
  if length(draft_body)>4000 then raise exception 'Draft requires manual scoping' using errcode='22023'; end if;
  insert into workflow_lab.drafts(case_id,case_version,status,body,prepared_by) values(c.id,c.version,'prepared',draft_body,m.user_id) returning id into did;
  insert into workflow_lab.events(draft_id,kind,actor_id,detail) values(did,'prepared',m.user_id,'Fictional draft prepared; no delivery attempted.');
 end if;
 insert into workflow_lab.draft_requests(workspace_id,request_id,case_id,draft_id) values(m.workspace_id,p_request_id,c.id,did);
 return workflow_lab.draft_json(did);
end $$;

create function workflow_lab.approve_followup(p_draft_id uuid) returns jsonb
language plpgsql security definer set search_path=pg_catalog as $$
declare m workflow_lab.memberships; d workflow_lab.drafts; c workflow_lab.cases;
begin
 m:=workflow_lab.acquire_mutation_session();
 if m.role<>'reviewer' then raise exception 'Reviewer required' using errcode='42501'; end if;
 select d0.* into d from workflow_lab.drafts d0 join workflow_lab.cases c0 on c0.id=d0.case_id where d0.id=p_draft_id and c0.workspace_id=m.workspace_id for update of d0;
 if not found then raise exception 'Workflow access denied' using errcode='42501'; end if;
 select * into c from workflow_lab.cases where id=d.case_id for share;
 if c.version<>d.case_version or workflow_lab.case_state(c.id)<>'followup' or d.status in ('unconfirmed','simulated_confirmed') then raise exception 'Approval rejected; refresh receipt' using errcode='40001'; end if;
 if d.status='approved' and d.approval_hash=md5(d.body) then
  -- Reuse only an approval whose author remains authorized through this transaction.
  perform 1 from workflow_lab.memberships where user_id=d.approved_by and workspace_id=m.workspace_id and active and role='reviewer' for share;
  if found and d.approval_expires_at>clock_timestamp() and workflow_lab.case_state(c.id)='followup' then return workflow_lab.draft_json(d.id); end if;
 end if;
 if workflow_lab.case_state(c.id)<>'followup' then raise exception 'Observation expired while waiting' using errcode='40001'; end if;
 update workflow_lab.drafts set status='approved',approved_by=m.user_id,approval_expires_at=clock_timestamp()+interval '15 minutes',approval_hash=md5(body) where id=d.id;
 insert into workflow_lab.events(draft_id,kind,actor_id,detail) values(d.id,'approved',m.user_id,'Reviewer approved this case version and draft body for simulated delivery only.');
 return workflow_lab.draft_json(d.id);
end $$;
create function workflow_lab.simulate_delivery(p_draft_id uuid,p_outcome text) returns jsonb
language plpgsql security definer set search_path=pg_catalog as $$
declare m workflow_lab.memberships; d workflow_lab.drafts; c workflow_lab.cases; outcome text;
begin
 m:=workflow_lab.acquire_mutation_session();
 if m.role<>'reviewer' then raise exception 'Reviewer required' using errcode='42501'; end if;
 if p_outcome is null or p_outcome not in ('confirmed','failed','timeout') then raise exception 'Unknown simulation outcome' using errcode='22023'; end if;
 select d0.* into d from workflow_lab.drafts d0 join workflow_lab.cases c0 on c0.id=d0.case_id where d0.id=p_draft_id and c0.workspace_id=m.workspace_id for update of d0;
 if not found then raise exception 'Workflow access denied' using errcode='42501'; end if;
 select * into c from workflow_lab.cases where id=d.case_id for share;
 if c.version<>d.case_version or workflow_lab.case_state(c.id)<>'followup' then raise exception 'Case changed; simulation rejected' using errcode='40001'; end if;
 -- Terminal receipts are immutable. A timeout is never silently retried.
 if d.status in ('simulated_confirmed','unconfirmed') then return workflow_lab.draft_json(d.id); end if;
 -- Lock the approving reviewer too; their authorization must survive to commit.
 perform 1 from workflow_lab.memberships where user_id=d.approved_by and workspace_id=m.workspace_id and active and role='reviewer' for share;
 if not found then raise exception 'Valid reviewer approval required' using errcode='40001'; end if;
 if d.status not in ('approved','failed') or d.approved_by is null or d.approval_expires_at is null or d.approval_expires_at<=clock_timestamp() or d.approval_hash is distinct from md5(d.body)
 then raise exception 'Valid reviewer approval required' using errcode='40001'; end if;
 if workflow_lab.case_state(c.id)<>'followup' then raise exception 'Observation expired while waiting' using errcode='40001'; end if;
 outcome:=case p_outcome when 'confirmed' then 'simulated_confirmed' when 'timeout' then 'unconfirmed' else 'failed' end;
 update workflow_lab.drafts set status=outcome where id=d.id;
 insert into workflow_lab.events(draft_id,kind,actor_id,detail) values(d.id,outcome,m.user_id,case p_outcome when 'confirmed' then 'Simulated confirmation only; no provider contacted and no document marked complete.' when 'timeout' then 'Simulated timeout; delivery unconfirmed. Do not retry automatically.' else 'Simulated failure; no provider contacted. Explicit reviewer retry is allowed while approval remains valid.' end);
 return workflow_lab.draft_json(d.id);
end $$;

alter table workflow_lab.workspaces enable row level security;
alter table workflow_lab.memberships enable row level security;
alter table workflow_lab.cases enable row level security;
alter table workflow_lab.documents enable row level security;
alter table workflow_lab.drafts enable row level security;
alter table workflow_lab.draft_requests enable row level security;
alter table workflow_lab.events enable row level security;
create policy own_workspace on workflow_lab.workspaces for select to authenticated using(id=workflow_lab.current_workspace());
create policy own_membership on workflow_lab.memberships for select to authenticated using(user_id=auth.uid() and active and workspace_id=workflow_lab.current_workspace());
create policy own_cases on workflow_lab.cases for select to authenticated using(workspace_id=workflow_lab.current_workspace());
create policy own_documents on workflow_lab.documents for select to authenticated using(exists(select 1 from workflow_lab.cases c where c.id=case_id and c.workspace_id=workflow_lab.current_workspace()));
create policy own_drafts on workflow_lab.drafts for select to authenticated using(exists(select 1 from workflow_lab.cases c where c.id=case_id and c.workspace_id=workflow_lab.current_workspace()));
create policy own_events on workflow_lab.events for select to authenticated using(exists(select 1 from workflow_lab.drafts d join workflow_lab.cases c on c.id=d.case_id where d.id=draft_id and c.workspace_id=workflow_lab.current_workspace()));
revoke all on all tables in schema workflow_lab from public,anon,authenticated;
revoke all on all sequences in schema workflow_lab from public,anon,authenticated;
grant select on workflow_lab.workspaces,workflow_lab.memberships,workflow_lab.cases,workflow_lab.documents,workflow_lab.drafts,workflow_lab.events to authenticated;
revoke execute on all functions in schema workflow_lab from public,anon,authenticated;
grant execute on function workflow_lab.current_workspace(),workflow_lab.describe_session(),workflow_lab.list_document_exceptions(),workflow_lab.get_workflow_receipt(uuid),workflow_lab.prepare_followup_draft(uuid,uuid),workflow_lab.approve_followup(uuid),workflow_lab.simulate_delivery(uuid,text) to authenticated;
commit;
