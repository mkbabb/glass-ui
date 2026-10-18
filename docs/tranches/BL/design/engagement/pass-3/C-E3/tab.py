# C-E3 tabulator: python3 -I tab.py <arm> <witness> <regex>  -> each engine's matching cells (status, name, line)
import json, re, sys, os
D = os.path.dirname(os.path.abspath(__file__)) + "/json"
arm, w, rx = sys.argv[1], sys.argv[2], re.compile(sys.argv[3] if len(sys.argv) > 3 else ".")
for eng in ("chromium", "webkit"):
    p = f"{D}/{arm}/{w}-{eng}.json"
    if not os.path.exists(p): print(eng, "absent"); continue
    d = json.load(open(p)); print(f"## {eng} {d['verdict']} load {d['loadStart']}")
    for c in d["cells"]:
        s = json.dumps(c) if not isinstance(c, dict) else f"{c.get('status', c.get('v'))} {c.get('name')} · {c.get('line', '')}"
        if rx.search(s): print("  " + s[:int(os.environ.get('W', 330))])
