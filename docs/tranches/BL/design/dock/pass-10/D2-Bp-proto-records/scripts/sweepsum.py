# sweepsum.py <dir> <build>: the phase map: per engine, theme and phase, reads, reads with a splice, gap range; retarget frames; load range.
import json,glob,sys,collections,os
d,b=sys.argv[1],sys.argv[2]
for f in sorted(glob.glob(f'{d}/{b}-*.json')):
    rows=json.load(open(f)); name=os.path.basename(f)[:-5]
    m=collections.defaultdict(list)
    for r in rows:
        if 'error' in r: continue
        m[r['after']].append(r)
    n=sum(len(v) for v in m.values()); sp=[r for v in m.values() for r in v if r['splice']['n']]; sl=[r for v in m.values() for r in v if r['splice']['sliver']]
    bl=[r for v in m.values() for r in v if not r['blank']['ok']]; st=[r for v in m.values() for r in v if r.get('stub') and not r['stub']['ok']]
    lds=[r['load'] for v in m.values() for r in v]; err=sum(1 for r in rows if 'error' in r)
    print(f"{name}: {n} reads, load {min(lds)}-{max(lds)}; splice {len(sp)}, sliver {len(sl)}, blank {len(bl)}, stub {len(st)}, errors {err}")
    if sp:
        for a in sorted(m):
            s=[r for r in m[a] if r['splice']['n']]
            if s: print(f"   +{a} ms: {len(s)}/{len(m[a])} frames {sorted(set(r['i0'] for r in s))} pair {sorted(set('|'.join(r['splice']['first']['units']) for r in s))} gap {min(r['splice']['first']['gapPx'] for r in s)}-{max(r['splice']['first']['gapPx'] for r in s)}")
    for r in sl: print(f"   sliver +{r['after']} r{r['run']}: {r['splice']['firstSliver']} load {r['load']}")
    for r in st: print(f"   stub +{r['after']} r{r['run']}: load {r['load']} {r['stub']}")
