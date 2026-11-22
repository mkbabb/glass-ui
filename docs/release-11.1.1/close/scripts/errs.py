# The 11.1.1 close: for each title in a list, its first error line in one set of reports and in
# another, normalised (ANSI, ports, numbers), and whether the two agree.
#   python3 -I errs.py <list> <reports A...> -- <reports B...>
import json, re, sys
args = sys.argv[1:]; lst = args[0]; cut = args.index("--")
A, B = args[1:cut], args[cut + 1:]
def errs(paths):
    out = {}
    def walk(s, p):
        for c in s.get("suites", []) or []:
            walk(c, p + ([c["title"]] if c.get("title") and not c["title"].endswith(".ts") else []))
        for sp in s.get("specs", []) or []:
            for t in sp.get("tests", []):
                r = t["results"][-1] if t.get("results") else {}
                m = re.sub(r"\x1b\[[0-9;]*m", "", (r.get("error") or {}).get("message", "")).strip().split("\n")[0]
                out[f"{sp.get('file','')}\t{' > '.join(p + [sp['title']])}"] = (t.get("status"), m)
    for path in paths:
        for s in json.load(open(path)).get("suites", []):
            walk(s, [])
    return out
a, b = errs(A), errs(B)
norm = lambda m: re.sub(r"\d+(\.\d+)?", "#", re.sub(r"localhost:\d+", "localhost", m))[:160]
same = diff = 0
for w in [l.rstrip("\n") for l in open(lst) if l.strip()]:
    ea, eb = a.get(w, ("-", "")), b.get(w, ("-", ""))
    agree = norm(ea[1]) == norm(eb[1])
    same += agree; diff += not agree
    print(f"{'same' if agree else 'DIFF'}\t{w.split(chr(9))[0]}\t{w.split(chr(9))[1][:90]}\t{ea[0]}:{norm(ea[1])[:110]}\t{eb[0]}:{norm(eb[1])[:110]}")
print(f"# same {same}, differ {diff}", file=sys.stderr)
