# Fix seat 9: the reduce spec's Sheet cells, one line per film: status, the plate's legs
# (fading frames, span), the frost clauses' verdict read from the attachment (frost: ok, or
# the clauses that fail), and the frost layer's legs (frames, gap to the plate, first and
# last opacity, the plate's last opacity, fading frames, span), with the error's first line.
#   frost.py <report.json>...
import json, base64, sys, re
for f in sys.argv[1:]:
    d = json.load(open(f))
    def walk(s):
        for sp in s.get("specs", []):
            for t in sp["tests"]:
                for r in t["results"]:
                    e = r.get("errors") or []
                    m = re.sub(r"\x1b\[[0-9;]*m", "", e[0]["message"]).split("\n")[0][:90] if e else ""
                    for a in r.get("attachments", []):
                        if a.get("name") != "fade" or "body" not in a: continue
                        j = json.loads(base64.b64decode(a["body"]))
                        fr = j.get("frost") or {}
                        def leg(k):
                            L = fr.get(k)
                            if not L: return "-"
                            return f"{k}: n{L['frames']} gap{L['gap']} first{L['first']} last{L['last']} plateLast{L['plateLast']} fading{L['leg']['fading']} span{L['leg']['span']}"
                        bad = []
                        for k in ("in", "out"):
                            L = fr.get(k)
                            if not L: bad.append(k + ":absent"); continue
                            if L["frames"] <= 0: bad.append(k + ":unfilmed")
                            if L["gap"] > 0.02: bad.append(k + ":gap")
                            g = L["leg"]
                            if g["fading"] < 2: bad.append(k + ":fading")
                            if not (g["rises"] if k == "in" else g["falls"]): bad.append(k + ":monotone")
                            if g["span"] > 200 + 1000 / 60 + 4: bad.append(k + ":span")
                        if fr.get("in") and (fr["in"]["first"] is None or fr["in"]["first"] > 0.02): bad.append("in:enters")
                        verdict = "frost:ok" if not bad else "frost:" + ",".join(bad)
                        print(f.split("/")[-1][:34].ljust(34), sp["title"][9:24].ljust(15), r["status"][:4], verdict.ljust(44), f"plate in {j['in']['fading']}/{j['in']['span']} out {j['out']['fading']}/{j['out']['span']}", "|", leg("in"), "|", leg("out"), "|", m)
        for c in s.get("suites", []): walk(c)
    for s in d["suites"]: walk(s)
