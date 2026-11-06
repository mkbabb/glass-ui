import sys,re,os
# H14: one row per self-test log of record: runs OK / BROKEN / N/A, time, load at start and end, harness hash
R=sys.argv[1]; rows=[]
for name in sys.argv[2:]:
    p=os.path.join(R,'logs',name+'.log'); t=open(p).read().split('\n')
    head=t[0]; tail=[l for l in t if l.startswith('# end')]
    ok=sum(l.startswith('OK') for l in t); br=sum(l.startswith('BROKEN') for l in t); na=sum(l.startswith('N/A') for l in t)
    clean=[l for l in t if re.match(r'^E-\d+ (chromium|webkit) (PASS|FAIL)',l)]
    t0=re.search(r'(\d\d:\d\d:\d\d)',head).group(1); t1=re.search(r'(\d\d:\d\d:\d\d)',tail[-1]).group(1) if tail else '?'
    l0=re.search(r'load \{ ([\d.]+)',head).group(1); l1=re.search(r'load \{ ([\d.]+)',tail[-1]).group(1) if tail else '?'
    h=re.search(r'harness ([0-9a-f]+)',head).group(1); args=head.split('· harness '+h+' · ')[-1].strip()
    if clean and ok==0 and br==0: ok='clean '+re.search(r'(\d+ pass, \d+ fail, \d+ unmeasured of \d+)',clean[-1]).group(1)
    rows.append(f'| `{name}` {("`"+args[:60]+"…`") if len(args)>60 else ("`"+args+"`" if args else "")} | {ok} | {br} | {na} | {t0}-{t1} | {l0} → {l1} | `{h}` |')
print('| log | OK | BROKEN | N/A | time | 1-min load | harness |'); print('|---|---|---|---|---|---|---|'); print('\n'.join(rows))
