import json,sys,glob,re
for st in sys.argv[2:]:
  for f in sorted(glob.glob(f'{st}/*{sys.argv[1]}*.json')):
    d=json.load(open(f)); print('##',f)
    for c in d['cells']:
      l=c['line']; l=re.sub(r'\s+',' ',l)
      print(f"{c['status'][:4]} | {c['name']} | {l[:int(240)]} | load {c.get('load','')}")
