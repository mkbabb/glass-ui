# residue.py <traced sweep json>…: per read, A's far-side residue at the retarget (40 − e0: what the handoff's second front had taken) and whether the read spliced.
import json,sys
for f in sys.argv[1:]:
    print(f.split('/')[-1])
    for r in json.load(open(f)):
        tr=[w for w in r.get('trace',[]) if w.get('k')=='w']
        res=None
        for w in tr:
            for u in w['u']:
                x=u.get('ex')
                if u['l']=='A' and x and x.get('mv'): res=(round(40-x['e0'],2),x['cut'],x['lead']); break
            if res: break
        sp=r['splice']['first']
        print(f" +{r['after']} r{r['run']} frame {r['i0']} residue {res} splice {sp['gapPx'] if sp else '-'} [load {r['load']}]")
