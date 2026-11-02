# abstub.py <item3 dir> [ab|ab-inband]: per column and build, the A/B's W3 retarget main reads: stub frames (with the stub line's detail),
# the R2-style worst one-frame vanish drop with its seat and offset, and load. A reading; enters no row.
import glob,re,collections,sys
R=sys.argv[1]; AB=sys.argv[2] if len(sys.argv)>2 else 'ab'; rt={}; st=collections.defaultdict(lambda:[0,0,[]]); dr={}
for f in sorted(glob.glob(R+'/'+AB+'/w3rt-*.log')):
    e,t,b,k=re.search(r'w3rt-(\w+)-(\w+)-(bp\d+)-r(\d)',f).groups()
    for l in open(f,encoding='utf8'):
        n=re.match(r'^(PASS|FAIL)  W3  [A-Za-z ]+  (retarget·\d+)(?!·control) ',l)
        if not n: continue
        ld=float(re.search(r'\[load ([\d.]+)\]',l).group(1)); s=re.search(r'stub (\d+) stub frame\(s\) of (\d+) judged',l)
        c=st[(e,t,b)]; c[0]+=1
        if s and int(s.group(1))>0: c[1]+=1; c[2].append((n.group(2),k,s.group(1),ld,(re.search(r'stub \d+ stub frame.*?;',l) or re.search(r'stub .{0,160}',l)).group(0)[:200]))
        v=re.search(r'vanish worst one-frame drop beyond the closing edge ([\d.]+) \((seat \d+) [\d.]+ → [\d.]+ at \+([\d.]+) ms\)',l)
        if v:
            key=(e,t,b); x=(float(v.group(1)),n.group(2),k,v.group(2),v.group(3),ld)
            if key not in dr or x[0]>dr[key][0]: dr[key]=x
        w=re.search(r'vanish worst one-frame drop from the retarget ([\d.]+) \((seat \d+) [\d.]+ → [\d.]+ at \+([\d.]+) ms\)',l)
        if w:
            key=(e,t,b); x=(float(w.group(1)),n.group(2),k,w.group(2),w.group(3),ld)
            if key not in rt or x[0]>rt[key][0]: rt[key]=x
for k in sorted(st): print(k,'reads',st[k][0],'stub reads',st[k][1],st[k][2],'| worst vanish drop',dr.get(k),'margin',round(0.5-dr[k][0],3) if k in dr else None,'| worst drop from the retarget',rt.get(k),'margin',round(0.5-rt[k][0],3) if k in rt else None)
