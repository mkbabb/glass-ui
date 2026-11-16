import json,sys
d=json.load(open(sys.argv[1]))
def walk(s,pre=""):
    for sp in s.get('specs',[]):
        for t in sp['tests']:
            for r in t['results'][:1]:
                if r['status'] not in('passed','skipped'):
                    print("--",sp['title'][:150]); print("  ",(r.get('error') or {}).get('message','').replace('\x1b','')[:int(sys.argv[2]) if len(sys.argv)>2 else 400].replace('\n','\n   '))
    for c in s.get('suites',[]): walk(c)
for s in d['suites']: walk(s)
