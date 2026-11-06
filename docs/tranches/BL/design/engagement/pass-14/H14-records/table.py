import sys,json,re,collections
# H14: per member (M-row) counts on each run of record: pass/fail/unmeasured/report per JSON; argv = label=path ...
runs=[a.split('=',1) for a in sys.argv[1:]]
data={}; order=[]
for lab,p in runs:
    for c in json.load(open(p))['cells']:
        m=re.match(r'(M\d+|residue|cost)',c['name']); k=m.group(1) if m else 'other'
        if k not in order: order.append(k)
        data.setdefault(k,{}).setdefault(lab,collections.Counter())[c['status'][0]]+=1
print('| member | '+' | '.join(l for l,_ in runs)+' |'); print('|---|'+'---|'*len(runs))
def fmt(c): return '/'.join(str(c.get(x,0)) for x in 'PFU')+(f" R{c['R']}" if c.get('R') else '') if c else '—'
for k in sorted(order,key=lambda x:(int(x[1:]) if x[1:].isdigit() else 99)):
    print(f'| {k} | '+' | '.join(fmt(data[k].get(l)) for l,_ in runs)+' |')
