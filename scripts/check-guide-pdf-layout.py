#!/usr/bin/env python3
# Claude Sonnet 5.5, 2026-11-15: check the guide's PDF layout after any edit to public/ai-operators-playbook.html.
# Why: the print layout left half-blank pages, source lines alone at the top of a page, and one-line paragraph
# tails. This script catches them from the built PDF.
# Checks: (1) each source line sits on the same PDF page as the text before it, (2) each heading sits on the
# same page as what follows it, (3) no paragraph or list item leaves a single line on either side of a page
# break; it also prints the first and last two lines of every page.
# Run from the repo root after rebuilding the PDF (poppler's pdftotext and pdfinfo must be installed):
#   python3 -I scripts/check-guide-pdf-layout.py
# Exit status 0 means no failures or flags; look at the page images for blank space (over 30% blank is only
# expected before a forced new page and on the last page).
import re,html,subprocess,sys,collections,glob,os
G='public/ai-operators-playbook.html'; PDF='public/downloads/ai-operators-playbook.pdf'
def norm(t):
    t=html.unescape(t)
    for a,b in (('‘',"'"),('’',"'"),('“','"'),('”','"'),(' ',' ')): t=t.replace(a,b)
    return re.sub(r'\s+',' ',t).strip()
n=int(re.search(r'Pages:\s+(\d+)',subprocess.run(['pdfinfo',PDF],capture_output=True,text=True).stdout).group(1))
pages=[None]+[norm(subprocess.run(['pdftotext','-f',str(i),'-l',str(i),PDF,'-'],capture_output=True,text=True).stdout) for i in range(1,n+1)]
raw=open(G).read(); body=raw[raw.find('<body'):]
body=re.sub(r'<!--.*?-->','',body,flags=re.S)
def strip(t):
    t=re.sub(r'</?(a|strong|em|mark|small|span|code|i|q|cite)\b[^>]*>','',t)
    return re.sub(r'<[^>]+>',' ',t)
def words(t,k,last=False):
    w=norm(strip(t)).split(); return ' '.join(w[-k:] if last else w[:k])
def find(seq): return [i for i in range(1,n+1) if seq in pages[i]]
print('== SOURCE LINES')
bad=0
for m in re.finditer(r'<p class="src">(.*?)</p>',body,re.S):
    first=words(m.group(1),4)
    prev=body[:m.start()].rstrip()
    # previous element: last <p>/<div class="said">/<li> chunk
    pm=None
    for pm in re.finditer(r'<(p|q|li)\b[^>]*>(.*?)</\1>',prev,re.S): pass
    last=words(pm.group(2),4,True)
    pf,pl=find(first),find(last)
    ok=bool(set(pf)&set(pl))
    bad+=not ok
    print('PASS' if ok else 'FAIL',f'src p{pf} vs text p{pl} | {last} || {first}')
print('== HEADINGS')
hb=0
for m in re.finditer(r'<(h2|h3)\b[^>]*>(.*?)</\1>|<p class="(?:sheet-title|paste-label|week)">(.*?)</p>',body,re.S):
    h=norm(strip(m.group(2) or m.group(3)))
    nxt=words(body[m.end():],4)
    ok=False; pg=[]
    for i in range(1,n+1):
        a=pages[i].find(h)
        while a!=-1:
            b=pages[i].find(nxt,a+len(h))
            if b!=-1 and b-(a+len(h))<500: ok=True; pg.append(i)
            a=pages[i].find(h,a+1)
    if not ok:
        hw=h.split()
        for i in range(3,n+1):
            if nxt in pages[i] and all(w in pages[i].split() for w in hw): ok=True; pg.append(str(i)+'*')
    hb+=not ok
    print('PASS' if ok else 'FAIL',pg,'|',h[:50],'->',nxt)
print('SOURCE FAILS',bad,'HEADING FAILS',hb)

# ---- check 4: no paragraph or list item leaves a single line on either side of a page break
print('== PARAGRAPH SPLITS (first/last two lines per page)')
def lines_of(i):
    t=subprocess.run(['pdftotext','-layout','-f',str(i),'-l',str(i),PDF,'-'],capture_output=True,text=True).stdout
    return [norm(l) for l in t.splitlines() if l.strip()]
PL=[None]+[lines_of(i) for i in range(1,n+1)]
def line_idx(i,seq,last=False):
    joined='';offs=[]
    for k,l in enumerate(PL[i]):
        offs.append(len(joined)); joined+=l+' '
    a=joined.rfind(seq) if last else joined.find(seq)
    if a==-1: return None
    b=a+len(seq)-1
    return max(k for k,o in enumerate(offs) if o<=(b if last else a))
flags={}
for m in re.finditer(r'<(p|li)\b[^>]*>(.*?)</\1>',body,re.S):
    w=norm(strip(m.group(2))).split()
    if len(w)<12: continue
    f,l=' '.join(w[:4]),' '.join(w[-4:])
    pf=[i for i in range(2,n+1) if f in ' '.join(PL[i])]
    pl=[i for i in range(2,n+1) if l in ' '.join(PL[i])]
    for a in pf:
        if a+1 in pl and a not in pl:
            b=a+1
            ia=line_idx(a,f); ib=line_idx(b,l,True)
            left=len(PL[a])-ia; carried=ib+1
            if left<2 or carried<2: flags[b]=f'{f}... ({left} line left behind on p{a}, {carried} carried to p{b})'
fl=0
for i in range(2,n+1):
    L=PL[i]; ok=i not in flags; fl+=not ok
    print('PASS' if ok else 'FLAG',i,'| first:',L[0][:45],'/',L[1][:45] if len(L)>1 else '','| last:',L[-2][:45] if len(L)>1 else '','/',L[-1][:45])
    if not ok: print('   ',flags[i])
print('PARAGRAPH FLAGS',fl)
sys.exit(1 if (bad or hb or fl) else 0)
