import json,sys
e=sys.argv[1]
for f in ['type-fine','type-coarse']:
    for r in json.load(open(f'{e}/{f}.json')):
        print(f, r['width'], 'coarse',r['coarse'], 'bar',r['bar'],'pill',r['pill'],'subtitle',r['subtitle'],'ratio',round(r['bar']/r['subtitle'],3), 'barH',r['barH'],'mitem',r['menuItem'],'btnSm',r['btnSm'])
for f in ['menu-fine','menu-coarse']:
    m=json.load(open(f'{e}/{f}.json'))[0]
    print(f,'token',m['token'],[(x['id'],x['iconToLabel'],x['gapCss']) for x in m['rows']])
for f in ['slider','slider-dark']:
    rows=json.load(open(f'{e}/{f}.json'))
    for blk in rows:
        rs=blk['rows']
        sizes={}
        for r in rs:
            t=r['thumb']; 
            vis = t and t['w']>0 and float(r['opacity'])>0
            key=r['id']
            sizes.setdefault(key.rsplit('-',1)[0],[]).append((r['id'],r['value'],t and (t['w'],t['h']),r['opacity'], r['range'] and r['range']['w'] if r['range'] else None, r['track'] and r['track']['w']))
        print(f, blk['tag'])
        for k,v in sizes.items(): print('   ',k, v)
