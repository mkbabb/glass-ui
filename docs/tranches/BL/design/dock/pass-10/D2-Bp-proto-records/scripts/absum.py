# absum.py <records dir>: the retarget A/B table (after the pass-9 critic's xsum.py): reads per build, reads with a splice or a sliver, gap, load; reading only.
import glob,re,collections,sys
R=sys.argv[1]
agg=collections.defaultdict(list)
for f in sorted(glob.glob(R+'/ab/w3rt-*.log')):
    m=re.search(r'w3rt-(\w+)-(\w+)-(bp\d+)-r(\d)',f); e,t,b,k=m.groups()
    for l in open(f,encoding='utf8'):
        n=re.match(r'^(PASS|FAIL|NOT-REPRODUCED|OWNER-BLOCKED)  W3  [A-Za-z ]+  (retarget·\d+)(?!·control) ',l)
        if not n: continue
        sp=re.search(r'splice (\d+) splice',l); sl=re.search(r', (\d+) sliver frame',l); fr=re.search(r'frame (\d+)\)',l); ld=re.search(r'\[load ([\d.]+)\]',l); gap=re.search(r'meet at a ([\d.]+) px',l); fail=re.search(r'FAILED: (.*?)  \[',l)
        agg[(e,t,b,n.group(2))].append(dict(sp=int(sp.group(1)) if sp else 0,sl=int(sl.group(1)) if sl else 0,fr=fr and fr.group(1),ld=float(ld.group(1)),gap=gap and gap.group(1),v=n.group(1),f=fail and fail.group(1),k=k))
tot=collections.Counter(); sp=collections.Counter(); sl=collections.Counter(); lo={}; hi={}
for k in sorted(agg):
    v=agg[k]; key=(k[0],k[2]); tot[key]+=len(v); s=[a for a in v if a['sp']]; sp[key]+=len(s); sl[key]+=sum(1 for a in v if a['sl'])
    lo[key]=min(lo.get(key,1e9),min(a['ld'] for a in v)); hi[key]=max(hi.get(key,0),max(a['ld'] for a in v))
    print(k,'reads',len(v),'splice',len(s),[(a['k'],a['fr'],a['gap'],a['ld']) for a in s],'sliver',[(a['k'],a['ld']) for a in v if a['sl']],'other red',[(a['k'],a['f'],a['ld']) for a in v if a['v']=='FAIL' and not a['sp'] and not a['sl']],'load',min(a['ld'] for a in v),'-',max(a['ld'] for a in v))
for k in sorted(tot): print(k,f"splice {sp[k]}/{tot[k]} sliver {sl[k]}/{tot[k]} load {lo[k]}-{hi[k]}")
