#!/usr/bin/env python3
# Claude Sonnet 5.5, 2026-11-16: structure check for the short edition of the free guide.
# Why this file is new: the guide now makes two promises that no check could fail before. (1) "The method takes
# about ten minutes to read" (the read-time claim on the cover, on /resources, on /knowledge and in llms.txt) was
# only a number in the copy, so the guide could grow back to 35 minutes unnoticed. (2) The contents page and the
# numbered references are jump links; a renamed id, a missing reference or a PDF without named destinations broke
# them silently. check-guide-pdf-layout.py checks page layout only.
# Fails when: any href="#x" has no matching id; a sup.ref number has no id="rN" or its text differs from its
# target; a reference is never cited; reference numbers are not in order of first use; the visible text from
# the Start heading to the end of Part 7 is over 2,350 words (about ten minutes at 235 words a minute); the
# contents page omits a section id; the PDF lacks a named destination for a contents target; Contents is not on
# PDF page 2 or Start is not on page 3.
# Run from the repo root after rebuilding the PDF (poppler's pdfinfo and pdftotext must be installed):
#   python3 -I scripts/check-guide-structure.py [guide.html [guide.pdf]]
import re, subprocess, sys

HTML = sys.argv[1] if len(sys.argv) > 1 else 'public/ai-operators-playbook.html'
PDF = sys.argv[2] if len(sys.argv) > 2 else 'public/downloads/ai-operators-playbook.pdf'
MAX_CORE_WORDS = 2350
SECTIONS = ['start'] + [f'p{i}' for i in range(1, 12)] + ['a', 'b', 'c', 'notes', 'refs', 'about']

raw = open(HTML, encoding='utf-8').read()
body = raw[raw.find('<body'):]
body = re.sub(r'<!--.*?-->', '', body, flags=re.S)
errors = []

def words(fragment):
    # visible words: tags become spaces so a reference number never glues onto the word before it
    text = re.sub(r'<[^>]+>', ' ', fragment)
    text = re.sub(r'&nbsp;|&#160;', ' ', text)
    text = re.sub(r'&[a-z]+;|&#\d+;', 'x', text)
    return len(text.split())

# ---- 1. every in-page link has a target
ids = set(re.findall(r'\bid="([^"]+)"', body))
for h in sorted(set(re.findall(r'href="#([^"]+)"', body))):
    if h not in ids:
        errors.append(f'href="#{h}" has no matching id')

# ---- 2 to 4. numbered references
cites = re.findall(r'<sup class="ref"><a href="#r(\d+)">(\d+)</a></sup>', body)
ref_ids = [int(x) for x in re.findall(r'<li id="r(\d+)"', body)]
for target, text in cites:
    if target != text:
        errors.append(f'sup.ref text {text} points to #r{target}')
    if int(target) not in ref_ids:
        errors.append(f'sup.ref {target} has no id="r{target}"')
if ref_ids != list(range(1, len(ref_ids) + 1)):
    errors.append(f'reference ids are not 1..N in the list: {ref_ids}')
cited = {int(t) for t, _ in cites}
for n in ref_ids:
    if n not in cited:
        errors.append(f'reference r{n} is never cited')
first = []
for t, _ in cites:
    if int(t) not in first:
        first.append(int(t))
if first != sorted(first) or (first and first != list(range(1, len(first) + 1))):
    errors.append(f'reference numbers are not in order of first use: {first}')

# ---- 5. read-time budget: Start heading to the end of Part 7
def pos(id_):
    m = re.search(r'<[a-z0-9]+\b[^>]*\bid="%s"' % re.escape(id_), body)
    return m.start() if m else -1
s, e = pos('start'), pos('p8')
if s < 0 or e < 0 or e < s:
    errors.append('cannot find the start and p8 ids')
    core = 0
else:
    core = words(body[s:e])
    if core > MAX_CORE_WORDS:
        errors.append(f'core is {core} words, over {MAX_CORE_WORDS}')
print('WORDS core (start to end of part 7):', core, '(limit', MAX_CORE_WORDS, ')')
marks = [('start', 'Start here')] + [(f'p{i}', f'Part {i}') for i in range(1, 12)] + [('a', 'Appendix A'), ('b', 'Appendix B'), ('c', 'Appendix C'), ('notes', 'Notes'), ('refs', 'References'), ('about', 'About, CTA, footer')]
pts = [(label, pos(i)) for i, label in marks] + [('end', len(body))]
for (label, a), (_, b) in zip(pts, pts[1:]):
    if a >= 0 and b >= 0:
        print(f'  {label}: {words(body[a:b])}')
print('WORDS whole document (body):', words(body[body.find('<header'):]))

# ---- 6. contents page lists every section
m = re.search(r'<section[^>]*\bid="contents".*?</section>', body, flags=re.S)
if not m:
    errors.append('no section with id="contents"')
    targets = set()
else:
    targets = set(re.findall(r'href="#([^"]+)"', m.group(0)))
    for sid in SECTIONS:
        if sid not in targets:
            errors.append(f'contents page omits #{sid}')

# ---- 7 and 8. PDF named destinations and page positions
try:
    dests = subprocess.run(['pdfinfo', '-dests', PDF], capture_output=True, text=True, check=True).stdout
    npages = int(re.search(r'Pages:\s+(\d+)', subprocess.run(['pdfinfo', PDF], capture_output=True, text=True).stdout).group(1))
    # pdfinfo -dests prints one row per destination: page, [ XYZ x y null ], "name"
    dest_names = set(re.findall(r'"([^"]+)"\s*$', dests, flags=re.M))
    for t in sorted(targets):
        if t not in dest_names:
            errors.append(f'PDF has no named destination for #{t}')
    def page_lines(i):
        t = subprocess.run(['pdftotext', '-f', str(i), '-l', str(i), PDF, '-'], capture_output=True, text=True).stdout
        return [l.strip() for l in t.splitlines() if l.strip()]
    p2, p3 = page_lines(2), page_lines(3)
    if not p2 or p2[0] != 'Contents' or 'Find your situation' not in p2:
        errors.append(f'Contents is not on PDF page 2 (page 2 starts: {p2[:1]})')
    if not p3 or p3[0] != 'Start here':
        errors.append(f'Start here does not begin PDF page 3 (page 3 starts: {p3[:1]})')
    print('PDF pages:', npages, '| page 2 starts:', p2[:1], '| page 3 starts:', p3[:1])
except (OSError, subprocess.CalledProcessError, AttributeError) as ex:
    errors.append(f'PDF check could not run: {ex}')

if errors:
    print('FAIL')
    for x in errors:
        print(' -', x)
    sys.exit(1)
print('PASS: links, references, word budget, contents, PDF destinations and pages')
