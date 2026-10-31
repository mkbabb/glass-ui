# tracedump.py <json> <after> <run> [from_ms to_ms]: per write() one line per unit named, the scene's own spans around a read.
import json,sys
d=json.load(open(sys.argv[1])); a=int(sys.argv[2]); k=int(sys.argv[3])
r=[x for x in d if x['after']==a and x['run']==k][0]
print('i0',r['i0'],'tR',r['tR'],'splice',r['splice'])
tr=[w for w in r['trace'] if w.get('k')=='w']; t0=tr[0]['t'] if tr else 0
lo=float(sys.argv[4]) if len(sys.argv)>4 else 0; hi=float(sys.argv[5]) if len(sys.argv)>5 else 1e9
labels=sys.argv[6].split(',') if len(sys.argv)>6 else ['A','Mid','E','B','C','Tools','F']
for w in tr:
    t=w['t']-t0
    if t<lo or t>hi: continue
    print(f"--- t {t:.1f} frame {w['frame']} P {w['P']}")
    for u in w['u']:
        if u['l'] not in labels: continue
        x=u.get('ex'); e=u.get('en')
        s=f"  {u['l']:6} box {u['box']} laid {u['laid']} v {u['v']} own {u['own']} fo {u['fo']} seam {u['seam']}"
        if x: s+=f" EX s0e0 {x['s0']},{x['e0']} to {x['to']} lead {x['lead']} pto {x['pto']} cut {x['cut']} r {x['r']} d {x['d']} mv {x.get('mv')} heir {x.get('heir')} q {x['q']}"
        if e: s+=f" EN from {e['from']} q {e['q']}"
        if u.get('rv'): s+=f" rv {u['rv']}"
        print(s)
