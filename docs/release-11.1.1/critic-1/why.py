# Critic 1: why each failing title failed (the first line of its error).
#   why.py <report> [chars]
import json, sys, re
r = json.load(open(sys.argv[1])); n = int(sys.argv[2]) if len(sys.argv) > 2 else 150
def walk(s):
    for sp in s.get("specs", []):
        for t in sp["tests"]:
            res = t["results"][-1] if t["results"] else None
            if res and res["status"] not in ("passed", "skipped"):
                msg = (res.get("error") or {}).get("message", "") or ""
                msg = re.sub(r"\x1b\[[0-9;]*m", "", msg)
                first = msg.split("\n")[0]
                exp = re.search(r"Expected[^\n]*\n[^\n]*", msg)
                print(res["status"][:4], "|", sp["title"][:58].ljust(58), "|", first[:n].split(" {")[0].split(" [")[0], "|", (exp.group(0).replace("\n", " ") if exp else "")[:70])
    for c in s.get("suites", []): walk(c)
for s in r["suites"]: walk(s)
