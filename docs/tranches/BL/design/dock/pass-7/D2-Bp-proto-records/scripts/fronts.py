# fronts.py <trace.log>: per frame, the leaving P's start cut and the arriving 1's visible end (box-local px).
import json, re, sys
for line in open(sys.argv[1]):
    t,_,rest=line.partition(' ')
    try: s=json.loads(rest)
    except: continue
    d={q[0]:q for q in s}
    def ins(q):
        m=re.match(r'inset\(([-\d.]+)px ([-\d.]+)px(?: ([-\d.]+)px ([-\d.]+)px)?', q[3]) if q and q[3] else None
        if not m: return None
        a=[float(x) if x else None for x in m.groups()]
        if a[2] is None: a=[a[0],a[1],a[0],a[1]]
        return a
    P=ins(d.get('P')); O=ins(d.get('1'))
    print(f"{float(t):6.1f}  P paints from {P[3] if P else 0:6.2f}{' (gone)' if P and P[1]>=40 else ''}   1 paints to {40-O[1] if O else 40:6.2f}")
