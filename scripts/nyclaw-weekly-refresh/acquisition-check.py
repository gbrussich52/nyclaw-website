#!/usr/bin/env python3
"""Validate private research artifacts. Fetches only bounded public source evidence when explicitly requested; never sends outreach."""
import argparse
import hashlib
import html
import http.client
import socket
import ssl
import urllib.request
from html.parser import HTMLParser
import datetime as dt
import ipaddress
import json
import re
from pathlib import Path
from urllib.parse import urlsplit

LINK = 'https://nyclaw.io/law-firm-workflows?utm_source=company_research&utm_medium=outreach_draft&utm_campaign=law_firm_workflows'


def moment(value):
    value = dt.datetime.fromisoformat(value.replace('Z', '+00:00'))
    if value.utcoffset() != dt.timedelta(0):
        raise ValueError('UTC required')
    return value


def host(url):
    parsed = urlsplit(url)
    name = parsed.hostname or ''
    if parsed.scheme != 'https' or parsed.username or parsed.password or parsed.port not in (None,443) or parsed.query or parsed.fragment or '.' not in name:
        raise ValueError('Public URL required')
    if name.endswith(('.local','.internal','.localhost','.test','.invalid','.example')) or name in ('localhost','metadata.google.internal'):
        raise ValueError('Public URL required')
    try:
        ipaddress.ip_address(name)
    except ValueError:
        if re.fullmatch(r'[a-z0-9.-]+',name) and not re.fullmatch(r'[\d.]+',name):
            return name.lower().removeprefix('www.')
    raise ValueError('Public domain required')


def text(value, maximum=3000, contact=True):
    if not isinstance(value,str) or not value.strip() or len(value)>maximum:
        raise ValueError('Text required')
    if contact and re.search(r'[\w.+-]+@[\w.-]+\.[a-z]{2,}|(?:\+?\d[\s().-]*){8,}',value,re.I):
        raise ValueError('Contact details prohibited')


def validate(data, run_id=None, now=None):
    now = now or dt.datetime.now(dt.timezone.utc)
    if not isinstance(data,dict) or set(data) - {'schema_version','generated_at','run_id','outreach_authorized','sent_count','checked_sources','companies','no_matches_reason'}:
        raise ValueError('Unexpected packet fields')
    if type(data.get('schema_version')) is not int or data['schema_version'] != 1 or data.get('outreach_authorized') is not False or type(data.get('sent_count')) is not int or data['sent_count'] != 0:
        raise ValueError('Draft-only packet required')
    text(data.get('run_id'),100,False)
    if run_id is not None and data['run_id'] != run_id:
        raise ValueError('Wrong run')
    generated = moment(data['generated_at'])
    if not -300 <= (now-generated).total_seconds() <= 8*86400:
        raise ValueError('Stale packet')
    sources=data.get('checked_sources')
    if not isinstance(sources,list) or not sources or len(sources)>8:
        raise ValueError('Sources required')
    for source in sources:host(source)
    companies=data.get('companies')
    if not isinstance(companies,list) or len(companies)>3:
        raise ValueError('Bound exceeded')
    if not companies:text(data.get('no_matches_reason'))
    seen=set()
    for company in companies:
        if not isinstance(company,dict) or set(company) != {'name','domain','location','source_url','observed_at','quoted_evidence','workflow_fit','intent','status','draft'}:
            raise ValueError('Unexpected company fields')
        for field in ('name','domain','location','source_url','observed_at','quoted_evidence','workflow_fit'):
            text(company.get(field),contact=field != 'observed_at')
        domain=host('https://'+company['domain'])
        if company['domain'] != domain or domain in seen:
            raise ValueError('Duplicate or invalid company domain')
        seen.add(domain)
        source=host(company['source_url'])
        if not (source==domain or source.endswith('.'+domain)) or company['source_url'] not in sources:
            raise ValueError('Primary source required')
        if not -300 <= (now-moment(company['observed_at'])).total_seconds() <= 8*86400:
            raise ValueError('Stale observation')
        if len(company['quoted_evidence'].split())>25 or company.get('intent')!='workflow_fit' or company.get('status')!='draft':
            raise ValueError('Evidence or intent invalid')
        draft=company.get('draft',{})
        if not isinstance(draft,dict) or set(draft) != {'subject','body'}:
            raise ValueError('Unexpected draft fields')
        text(draft.get('subject'),180);text(draft.get('body'))
        body=draft['body']
        if 'AI-prepared draft for NYClaw' not in body or LINK not in body or 'free fit call' not in body.lower() or 'scope and fee agreed in writing' not in body.lower():
            raise ValueError('Draft disclosure/offer missing')
    return True


class VisibleText(HTMLParser):
    def __init__(self):
        super().__init__(); self.hidden=0; self.parts=[]
    def handle_starttag(self,tag,attrs):
        if tag in ('script','style'):self.hidden+=1
    def handle_endtag(self,tag):
        if tag in ('script','style') and self.hidden:self.hidden-=1
    def handle_data(self,data):
        if not self.hidden:self.parts.append(data)


def normalized(value):
    return ' '.join(html.unescape(value).casefold().split())


def public_ips(name):
    addresses={entry[4][0] for entry in socket.getaddrinfo(name,443,type=socket.SOCK_STREAM)}
    if not addresses or any(not ipaddress.ip_address(ip).is_global for ip in addresses):
        raise ValueError('Nonpublic source resolution')
    return sorted(addresses)


def fetch_source(url):
    host(url)
    name=urlsplit(url).hostname
    addresses=public_ips(name)
    # Pin the checked IP for the TLS connection; preserve hostname certificate/SNI checks.
    class PinnedHTTPS(urllib.request.HTTPSHandler):
        def https_open(self,request):
            def connection(*args,**kwargs):
                conn=http.client.HTTPSConnection(*args,**kwargs)
                conn._create_connection=lambda address,timeout=10,source_address=None: socket.create_connection((addresses[0],443),timeout,source_address)
                return conn
            return self.do_open(connection,request,context=ssl.create_default_context())
    class NoRedirect(urllib.request.HTTPRedirectHandler):
        def redirect_request(self,*args,**kwargs):return None
    opener=urllib.request.build_opener(urllib.request.ProxyHandler({}),PinnedHTTPS(),NoRedirect())
    with opener.open(urllib.request.Request(url,headers={'User-Agent':'NYClaw-source-check/1.0'}),timeout=10) as response:
        if response.status!=200 or 'text/html' not in response.headers.get('Content-Type','').lower():
            raise ValueError('Source unavailable')
        raw=response.read(1024*1024+1)
        if len(raw)>1024*1024:raise ValueError('Source too large')
        return raw.decode('utf-8',errors='replace')


def verify_sources(data,fetch=fetch_source):
    validate(data)
    visible={}
    for url in dict.fromkeys(data['checked_sources']):
        parser=VisibleText();parser.feed(fetch(url));visible[url]=normalized(' '.join(parser.parts))
        if not visible[url]:raise ValueError('No visible source evidence')
    for company in data['companies']:
        if normalized(company['quoted_evidence']) not in visible[company['source_url']]:
            raise ValueError('Quote not supported by source')
    return True


def validate_plan(path, run_id):
    content=path.read_text()
    if not content.strip() or len(content.split())>1200 or f'Run ID: {run_id}' not in content:
        raise ValueError('Plan missing, stale or too long')


def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--root',type=Path,default=Path(__file__).resolve().parents[2])
    parser.add_argument('--validate-latest',action='store_true')
    parser.add_argument('--verify-sources',action='store_true');parser.add_argument('--json',action='store_true')
    parser.add_argument('--packet',type=Path);parser.add_argument('--run-id');parser.add_argument('--plan',type=Path)
    args=parser.parse_args()
    try:
        packet=args.packet
        run_id=args.run_id
        if args.validate_latest:
            health=json.loads((args.root/'scripts/nyclaw-weekly-refresh/logs/acquisition-health.json').read_text())
            if health.get('ok') is not True or not -300 <= (dt.datetime.now(dt.timezone.utc)-moment(health['checked_at'])).total_seconds() <= 8*86400:
                raise ValueError('Unhealthy latest run')
            packet=args.root/'docs/loop'/f"acquisition-{health['date']}.json"
            run_id=health['run_id']
            args.plan=args.root/'docs/loop'/f"weekly-refresh-{health['date']}.md"
        if not packet:raise ValueError('Packet required')
        raw=packet.read_bytes()
        digest=hashlib.sha256(raw).hexdigest()
        data=json.loads(raw)
        validate(data,run_id)
        verified=False
        if args.validate_latest:
            if health.get('source_verified') is not True or health.get('packet_sha256') != digest:raise ValueError('Source proof absent or changed')
            verified=True
        if args.verify_sources:verified=verify_sources(data)
        if args.plan:validate_plan(args.plan,run_id)
        print(json.dumps({'ok':True,'source_verified':verified,'packet_sha256':digest}) if args.json else 'Acquisition artifacts valid; no outreach sent')
        return 0
    except Exception:
        print(json.dumps({'ok':False,'source_verified':False}) if args.json else 'Acquisition artifacts invalid or incomplete')
        return 2

if __name__=='__main__':raise SystemExit(main())
