# vlsum.py <vl dir>: slotink-axis on vmorph lead-remove and morph lead-remove, per engine, theme, sequence and build: (longest empty run, minInk) per run.
import json,glob,os,sys,collections
t=collections.defaultdict(list)
for f in sorted(glob.glob(sys.argv[1]+'/*.json')):
    b,e,th,r=os.path.basename(f)[:-5].split('-')
    for x in json.load(open(f)): t[(e,th,x['seq'],b)].append((x['worstRun'],x['minInk'],x['load']))
for k in sorted(t): print(k,[(a[0],a[1]) for a in t[k]],'load',t[k][0][2],'-',t[k][-1][2])
