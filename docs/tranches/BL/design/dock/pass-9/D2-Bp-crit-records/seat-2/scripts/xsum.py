# xsum.py <seat dir>: the extras' tables (retarget A/B, W3 R2 by theme, content-add A/B, vl and fs2 probe): reading only.
import glob,re,collections,sys,json,os
R=sys.argv[1]; X=R+'/extras'
print('## retarget A/B')
agg=collections.defaultdict(list)
for f in sorted(glob.glob(X+'/rt/w3rt-*.log')):
    m=re.search(r'w3rt-(\w+)-(\w+)-(bp\d)-r(\d)',f); e,t,b,k=m.groups()
    for l in open(f,encoding='utf8'):
        n=re.match(r'^(PASS|FAIL|NOT-REPRODUCED|OWNER-BLOCKED)  W3  [A-Za-z ]+  (retarget·\d+)(?!·control) ',l)
        if not n: continue
        sp=re.search(r'splice (\d+) splice',l); fr=re.search(r'frame (\d+)\)',l); ld=re.search(r'\[load ([\d.]+)\]',l); gap=re.search(r'meet at a ([\d.]+) px',l)
        fail=re.search(r'FAILED: (.*?)  \[',l)
        agg[(e,t,b,n.group(2))].append(dict(sp=int(sp.group(1)) if sp else 0,fr=fr and fr.group(1),ld=float(ld.group(1)),gap=gap and gap.group(1),v=n.group(1),f=fail and fail.group(1),k=k))
tot=collections.Counter(); sp=collections.Counter()
for k in sorted(agg):
    v=agg[k]; tot[(k[0],k[2])]+=len(v); s=[a for a in v if a['sp']]; sp[(k[0],k[2])]+=len(s)
    print(k,'reads',len(v),'splice',len(s),[(a['k'],a['fr'],a['gap'],a['ld']) for a in s],'other red',[(a['k'],a['f'],a['ld']) for a in v if a['v']=='FAIL' and not a['sp']],'load',min(a['ld'] for a in v),'-',max(a['ld'] for a in v))
print({str(k):f"{sp[k]}/{tot[k]}" for k in tot})
print('## W3 webkit x2 per theme: R2 worst, reds')
for f in sorted(glob.glob(X+'/w3/w3-webkit-*.log')):
    w=(0,'');reds=[]
    for l in open(f,encoding='utf8'):
        m=re.search(r'^(\w[\w-]*)  W3  Playwright WebKit  (\S+) .*vanish worst one-frame drop beyond the closing edge ([\d.]+) \(([^)]*)\).*\[load ([\d.]+)\]',l)
        if m and float(m.group(3))>w[0]: w=(float(m.group(3)),m.group(2),m.group(4),m.group(5))
        if l.startswith('FAIL  W3  Playwright WebKit  '):
            q=re.search(r'FAILED: (.*?)  \[load ([\d.]+)',l); reds.append((l.split()[4],q and q.group(1),q and q.group(2)))
    print(os.path.basename(f),'worst',w,'margin',round(.5-w[0],3),'reds',reds)
print('## content-add A/B')
ab=collections.defaultdict(list)
for f in sorted(glob.glob(X+'/ab/fm-*.log')):
    m=re.search(r'fm-(\w+)-(\w+)-(bp\d)-r(\d)',f); e,t,b,k=m.groups()
    for l in open(f,encoding='utf8'):
        if 'film·content-add' in l and re.match(r'^(PASS|FAIL)  FM  ',l):
            s=re.search(r'stub (\d+) stub',l); ld=re.search(r'\[load ([\d.]+)\]',l); ab[(e,t,b)].append((int(s.group(1)) if s else None,ld and ld.group(1),l[:4]))
for k in sorted(ab):
    v=ab[k]; print(k,'reads',len(v),'stub reads',sum(1 for a in v if a[0]),'not measured',sum(1 for a in v if a[0] is None),'load',v[0][1],'-',v[-1][1])
print('## probes')
for d in ('vl','fs2'):
    t=collections.defaultdict(list)
    for f in sorted(glob.glob(f'{X}/{d}/*.json')):
        b,e,th,r=os.path.basename(f)[:-5].split('-')
        for x in json.load(open(f)): t[(e,th,x['seq'],b)].append((x['worstRun'],x['minInk'],x.get('worstAt'),x['load']))
    for k in sorted(t): print(d,k,[(a[0],a[1]) for a in t[k]],'at',t[k][0][2],'load',t[k][0][3],'-',t[k][-1][3])
