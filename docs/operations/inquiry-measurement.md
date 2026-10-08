---
classification: PUBLIC
---
# Count stored inquiries without exporting customer records

Run from the repository with the existing Redis credentials in `.env.local`:

```sh
python3 scripts/request-counts.py --days 7
```

Optional `--env-file` selects a local credential file; a present file is authoritative instead of mixing another project's process credentials. `--output` saves only the aggregate report. Treat that report as PRIVATE; do not publish private sales/visitor figures or use them as customer outcomes.

The report separates guide requests from other submissions, and groups only recognized source labels. Older records appear as unknown. Counts include owner, test and spam submissions unless separately reviewed; they are not unique people or qualified leads. The latest contact timestamp helps an operator notice new work even when a rolling total stays unchanged. The existing store retains at most5000 records; insufficient window coverage fails rather than claiming completeness.

On a failed read the process exits nonzero with `counts: null`. No upstream error body, raw record, message, email or credential is printed. The helper makes one read-only Redis pipeline request, with a12-second timeout and bounded response size. Its negative/privacy gate is:

```sh
python3 -m unittest discover -s scripts/__tests__ -p '*_test.py'
```

The estate's existing revenue-health sensor can consume this helper. This repository installs no new schedule. A submitted form and a guide opening are separate events; this counter measures the former only.
