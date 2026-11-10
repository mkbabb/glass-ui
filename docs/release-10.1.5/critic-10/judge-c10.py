import json,sys,os,collections
arm,eng=sys.argv[1],sys.argv[2]
d=f'{arm}/{eng}'
if os.path.exists(f'{d}/c10a.json'):
    rows=json.load(open(f'{d}/c10a.json'))
    c=collections.Counter(); ex={}
    for r in rows:
        for p in r['plates']:
            ok = p['uniform'] and not p['pct'] and p['sw']==p['cw']
            k=(r['width'],p['dock'],r['shape'],'ok' if ok else ('pct' if p['pct'] else 'cut' if p['sw']!=p['cw'] else 'other'))
            c[k]+=1
            if not ok: ex.setdefault(k,(r['dark'],r['backdrop'],r['at'],p['w'],p['radii'],p['sw'],p['cw']))
    print('c10a'); [print('  ',k,v,ex.get(k,'')) for k,v in sorted(c.items())]
for ptr in ['fine','coarse']:
    p=f'{d}/c10b-{ptr}.json'
    if not os.path.exists(p): continue
    for r in json.load(open(p)):
        if 'sweep' in r: print('c10b',ptr,r['axis'],'W',r.get('W'),'E',r.get('E',r.get('Ev'))); continue
        print('c10b',ptr,r['axis'],r.get('from'),r.get('to'),r.get('at'),r.get('ramp',''),'dS1',r['dS1'],'dPlate',r['dPlate'],'endfits',r['end']['fits'],'over',r['end']['over'])
for ptr in ['fine','coarse']:
    p=f'{d}/c10c-{ptr}.json'
    if not os.path.exists(p): continue
    for r in json.load(open(p)):
        R=r['rest']
        print('c10c',ptr,r['width'],r['q'][11:70],'radii',R['radii'][:2],'half',R['half'],'fits',R['fits'],'run',R['run']['sw'],R['run']['cw'],'nest',R['nest'] and (R['nest']['overflow'],R['nest']['inline'],R['nest']['sw'],R['nest']['cw']),'tl',len(R['timelines']),'ov',R['overlaps'])
        for h in r['hovers']:
            if h['run']['sw']!=h['run']['cw'] or len(set(h['radii']))>1: print('     hover',h['S'],h['radii'],h['run']['sw'],h['run']['cw'])
p=f'{d}/c10d.json'
if os.path.exists(p):
    for r in json.load(open(p)): print('c10d',r)
