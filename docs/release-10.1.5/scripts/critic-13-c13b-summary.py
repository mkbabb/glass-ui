# 10.1.5 critic round 13: c13b (n1's collapse start per frame) per arm and stage.
#   python3 -I docs/release-10.1.5/scripts/critic-13-c13b-summary.py docs/release-10.1.5/critic-13/c13b-webkit.json ...
import json,sys
for f in sys.argv[1:]:
    d=json.load(open(f)); print(f.split('/')[-1])
    for arm in sorted(set(x['arm'] for x in d)):
        for sh in sorted(set(x['stageH'] for x in d)):
            r=[x for x in d if x['arm']==arm and x['stageH']==sh]
            print('  ',arm,sh,'n',len(r),'rest sh/ch',sorted(set(( (x.get("rest") or {"sh":None,"ch":None,"fits":None,"pad":None,"st":None})['sh'], (x.get("rest") or {"sh":None,"ch":None,"fits":None,"pad":None,"st":None})['ch'], (x.get("rest") or {"sh":None,"ch":None,"fits":None,"pad":None,"st":None})['fits'], (x.get("rest") or {"sh":None,"ch":None,"fits":None,"pad":None,"st":None})['pad'], (x.get("rest") or {"sh":None,"ch":None,"fits":None,"pad":None,"st":None})['st']) for x in r)),'steps>0.5:',sum(x['step']>0.5 for x in r),sorted(set(x['step'] for x in r)),'stAtQ',sorted(set(x.get("stAtQ") for x in r)),'dt max',max(x['dt'] for x in r))
