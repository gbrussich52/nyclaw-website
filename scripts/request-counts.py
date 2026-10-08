#!/usr/bin/env python3
# classification: PUBLIC
"""Read-only, aggregate-only counts from the existing capped inquiry store. No model or schedule."""
from __future__ import annotations
import argparse
import datetime as dt
import json
import os
import re
import urllib.parse
import urllib.request
from pathlib import Path

SOURCES = ('contact_form', 'resource_form', 'playbook_form', 'unknown')
CAP = 5000
MAX_BYTES = 8 * 1024 * 1024

class MeasurementError(Exception):
    pass

class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None

def credentials(path):
    values = {} if path.exists() else dict(os.environ)
    if path.exists():
        for line in path.read_text().splitlines():
            match = re.fullmatch(r'(UPSTASH_REDIS_REST_URL|UPSTASH_REDIS_REST_TOKEN|KV_REST_API_URL|KV_REST_API_TOKEN)=(.*)', line.strip())
            if match:
                values[match[1]] = match[2].strip().strip('\"\'')
    url = (values.get('UPSTASH_REDIS_REST_URL') or values.get('KV_REST_API_URL') or '').rstrip('/')
    token = values.get('UPSTASH_REDIS_REST_TOKEN') or values.get('KV_REST_API_TOKEN')
    parsed = urllib.parse.urlsplit(url)
    if not token or parsed.scheme != 'https' or not parsed.hostname or not parsed.hostname.endswith(('.upstash.io', '.vercel-storage.com')) or parsed.username or parsed.query or parsed.fragment:
        raise MeasurementError('CONFIG_UNAVAILABLE')
    return url, token

def read_store(url, token):
    request = urllib.request.Request(url + '/pipeline', data=json.dumps([
        ['LLEN', 'nyclaw:leads'], ['LRANGE', 'nyclaw:leads', '0', str(CAP - 1)]
    ]).encode(), headers={'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'}, method='POST')
    with urllib.request.build_opener(NoRedirect).open(request, timeout=12) as response:
        raw = response.read(MAX_BYTES + 1)
        if len(raw) > MAX_BYTES:
            raise MeasurementError('OVERSIZE')
        return json.loads(raw)

def aggregate(batch, days=7, now=None):
    now = now or dt.datetime.now(dt.timezone.utc)
    if now.tzinfo is None or not isinstance(days, int) or isinstance(days, bool) or not 1 <= days <= 90:
        raise MeasurementError('INVALID_WINDOW')
    if not isinstance(batch, list) or len(batch) != 2 or any(not isinstance(x, dict) or 'error' in x for x in batch):
        raise MeasurementError('READ_UNAVAILABLE')
    total, rows = batch[0].get('result'), batch[1].get('result')
    if type(total) is not int or total < 0 or not isinstance(rows, list) or total != len(rows) or total > CAP:
        raise MeasurementError('INCOMPLETE_OR_CHANGED_READ')
    cutoff = now - dt.timedelta(days=days)
    counts = {'guide_requests': 0, 'other_contact_submissions': 0}
    by_source = dict.fromkeys(SOURCES, 0)
    timestamps = []
    latest_contact = None
    for encoded in rows:
        try:
            entry = json.loads(encoded)
            if not isinstance(entry, dict) or not isinstance(entry.get('timestamp'), str):
                raise ValueError()
            created = dt.datetime.fromisoformat(entry['timestamp'].replace('Z', '+00:00'))
            if created.tzinfo is None or created > now + dt.timedelta(minutes=5):
                raise ValueError()
        except (TypeError, ValueError):
            raise MeasurementError('INVALID_RECORD') from None
        timestamps.append(created)
        if created < cutoff:
            continue
        guide = entry.get('challenge') == 'guide-download'
        counts['guide_requests' if guide else 'other_contact_submissions'] += 1
        if not guide and (latest_contact is None or created > latest_contact):
            latest_contact = created
        source = entry.get('source')
        by_source[source if isinstance(source, str) and source in SOURCES else 'unknown'] += 1
    if total == CAP and min(timestamps) >= cutoff:
        raise MeasurementError('WINDOW_MAY_BE_TRUNCATED')
    return {
        'classification': 'PRIVATE', 'as_of': now.isoformat(), 'ok': True,
        'window_days': days, 'retained_records': total, 'counts': counts,
        'by_form_source': by_source, 'latest_other_contact_at': latest_contact.isoformat() if latest_contact else None,
        'owner_test_and_spam_records_excluded': False,
        'measurement': 'Stored submissions, not people, qualified leads, guide reads, bookings or sales.',
        'coverage': 'Current capped Redis store; old records without source appear as unknown.',
        'privacy': 'No names, emails, messages, raw records or credentials exported; reads only.'
    }

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--env-file', type=Path, default=Path('.env.local'))
    parser.add_argument('--days', type=int, default=7)
    parser.add_argument('--output', type=Path, help='Optional PRIVATE count-only JSON output; never publish as client results.')
    args = parser.parse_args()
    if not 1 <= args.days <= 90:
        parser.error('--days must be between 1 and 90')
    try:
        url, token = credentials(args.env_file)
        result = aggregate(read_store(url, token), days=args.days)
    except Exception as error:
        # Never print exception bodies: HTTP/JSON errors can contain credentials or records.
        code = str(error) if isinstance(error, MeasurementError) else type(error).__name__
        print(json.dumps({'ok': False, 'error_code': code, 'counts': None}))
        return 1
    encoded = json.dumps(result, indent=2) + '\n'
    if args.output:
        args.output.write_text(encoded)
    print(encoded, end='')
    return 0

if __name__ == '__main__':
    raise SystemExit(main())
