# Critic 8: the frost probe's readings, one line per film leg: frames, frames with the frost
# layer present, the worst gap between its opacity and the plate's, its first and last
# opacity, the error's first line, and (with -v) the first frames as [ms, plate, frost].
import json, base64, sys, re
v = "-v" in sys.argv
for f in [a for a in sys.argv[1:] if a != "-v"]:
    d = json.load(open(f))
    def walk(s):
        for sp in s.get("specs", []):
            for t in sp["tests"]:
                for r in t["results"]:
                    e = r.get("errors") or []
                    m = re.sub(r"\x1b\[[0-9;]*m", "", e[0]["message"]).split("\n")[0][:70] if e else ""
                    for a in r.get("attachments", []):
                        if a.get("name") != "frost" or "body" not in a: continue
                        j = json.loads(base64.b64decode(a["body"]))
                        for leg in ("in", "out"):
                            L = j[leg]
                            print(f.split("/")[-1][:28].ljust(28), sp["title"][8:34].ljust(26), leg.ljust(3), r["status"][:4], "frames", L["frames"], "frost", L["haloFrames"], "gap", L["worstGap"], "first", L["firstHalo"], "last", L["lastHalo"], "|", m[:60] if leg == "in" else "")
                            if v: print("     ", L["strip"])
        for c in s.get("suites", []): walk(c)
    for s in d["suites"]: walk(s)
