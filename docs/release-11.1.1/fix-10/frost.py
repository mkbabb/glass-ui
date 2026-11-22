# Fix seat 10: the reduce spec's Sheet cells, one line per film: status, the frost clauses'
# verdict read from the attachment (frost: ok, or the clauses that fail, the new one being
# out:bare), the out leg's frames that hold the plate without its frost layer, the frost
# layer's last opacity against the plate's last, the plate's fading frames and span out, and
# the error's first line.
#   frost.py <report.json>...
import json, base64, sys, re
for f in sys.argv[1:]:
    d = json.load(open(f))
    def walk(s):
        for sp in s.get("specs", []):
            for t in sp["tests"]:
                for r in t["results"]:
                    e = r.get("errors") or []
                    m = re.sub(r"\x1b\[[0-9;]*m", "", e[0]["message"]).split("\n")[0][:110] if e else ""
                    for a in r.get("attachments", []):
                        if a.get("name") != "fade" or "body" not in a: continue
                        j = json.loads(base64.b64decode(a["body"]))
                        fr = j.get("frost") or {}
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
                        o = fr.get("out") or {}
                        if o.get("bare", 0) > 0: bad.append("out:bare")
                        verdict = "frost:ok" if not bad else "frost:" + ",".join(bad)
                        print(f.split("/")[-1][:22].ljust(22), sp["title"][9:24].ljust(15), r["status"][:4], verdict.ljust(30),
                              f"bare in {fr.get('in', {}).get('bare')} out {o.get('bare')}",
                              f"| frost last {o.get('last')} plate last {o.get('plateLast')}",
                              f"| plate out {j['out']['fading']}/{j['out']['span']}ms", "|", m)
        for c in s.get("suites", []): walk(c)
    for s in d["suites"]: walk(s)
