import sys,json
# H14: tabulate E-14 JSON runs side by side: one row per cell, one column per run (P pass, F fail, U unmeasured, R report, . absent)
runs=sys.argv[1:]; rows={}; order=[]
for j,p in enumerate(runs):
    for c in json.load(open(p))['cells']:
        nm=c['name']
        if nm not in rows: rows[nm]=['.']*len(runs); order.append(nm)
        rows[nm][j]=c['status'][0]
print(' '.join(p.split('/')[-2][:10].ljust(10) for p in runs))
for nm in order: print(' '.join(c.ljust(10) for c in rows[nm]), nm[:150])
