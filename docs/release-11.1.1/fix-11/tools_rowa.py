# Fix seat 11: row A's cell in one report, per run: taps, late taps, aimed misses, aimed taps
# that hit and closed at each delay, the rise's height spread and share, and each late tap.
#   tools_rowa.py <report.json>
import json, base64, sys
r = json.load(open(sys.argv[1]))
def walk(s):
    for sp in s.get("specs", []):
        for t in sp["tests"]:
            for res in t["results"]:
                errs = [e.get("message", "").split("\n")[0][:160] for e in res.get("errors", [])]
                for a in res.get("attachments", []):
                    if a["name"] != "sheet": continue
                    d = json.loads(base64.b64decode(a["body"])); taps = d["taps"]; rise = d["rise"]
                    late = [x for x in taps if not x["aimed"]]
                    am = [x for x in taps if x["aimed"] and not x["hit"]]
                    per = {k: sum(1 for x in taps if x["after"] == k and x["aimed"] and x["hit"] and x["closed"]) for k in (120, 190, 250, 400)}
                    print(t["projectName"], res["status"], "taps", len(taps), "late", len(late), "aimed-miss", len(am),
                          "aimed hit+closed", per, "spread", rise["heightSpread"], "share", rise["share"])
                    for x in late: print("   late", x["after"], x["at"], x["dy"], x["events"])
                    for x in am: print("   AIMED-MISS", x["after"], x["at"], x["dy"], x["events"])
                for e in errs: print("   error:", e)
    for c in s.get("suites", []): walk(c)
for s in r["suites"]: walk(s)
