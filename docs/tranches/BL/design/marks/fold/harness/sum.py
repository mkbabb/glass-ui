import json,sys,collections
d=json.load(open(sys.argv[1]))
rows=d['cells']['static-fold']['rows']
g=collections.OrderedDict()
for k,v in rows.items():
    base,_,i=k.rpartition('~')
    g.setdefault(base,[]).append(v)
print(d.get('version'), d['cells']['static-fold']['face'], d['cells']['static-fold']['errors'])
for base,vs in g.items():
    print(f"{base:44s} pieces {[v['pieces'] for v in vs]} cross {[v['crossDevicePx'] for v in vs]} top {[v['topEm'] for v in vs]} bot {[v['bottomEm'] for v in vs]} glyphBot {max(v['glyphBottomEm'] for v in vs)} thick {[v['thickness'] for v in vs]} pDesc {vs[0]['pDescentEm']}")
