import json,glob,re,sys
eng=sys.argv[1]
def uni(d):
    h=min(d['plateW'],d['plateH'])/2
    return all(re.match(r'^[\d.]+px$',x) and abs(float(x[:-2])-h)<=0.5 for x in d['radii'])
def walk(o):
    if isinstance(o,dict):
        if 'radii' in o and 'plateW' in o: yield o
        for v in o.values(): yield from walk(v)
    elif isinstance(o,list):
        for v in o: yield from walk(v)
for f in sorted(glob.glob(f'{eng}/dock-*.json')):
    rows=list(walk(json.load(open(f)))); bad=[]
    for d in rows:
        run=d.get('run')
        fitsrun = run and run['sw']<=run['cw'] and run['sh']<=run['ch']
        pct=any('%' in x for x in d['radii'])
        cl=lambda s:min(v for v in (s['clearL'],s['clearR'],s['clearT'],s['clearB']) if v is not None)
        ringcut=[(s['label'],round(cl(s),2)) for s in d['seats'] if s['focus'] and cl(s)< -0.5]
        if pct or (fitsrun and not uni(d) and not d['morphing'] and 'collapsed' not in d['cls']) or ringcut or ('collapsed' in d['cls'] and not uni(d) and not d['morphing']):
            bad.append((d.get('tag'),d.get('width'),d['cls'][:40],d['radii'],run and (run['sw'],run['cw'],run['sh'],run['ch'],run['sl']),ringcut))
    print(f,len(rows),'bad',len(bad))
    for b in bad[:20]: print('  ',b)
