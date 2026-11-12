# colmax.py <dir>: the highest 1-minute load any battery record under <dir> carries: every `load averages: X` in a log
# (uptime at each witness run's start and end) and every cell's "load" in a witness JSON. Prints the max (or nothing).
import os, re, sys, json
m = None
for root, _, fs in os.walk(sys.argv[1]):
    for f in fs:
        p = os.path.join(root, f)
        try:
            if f.startswith("bp13-") and f.endswith(".log"):
                for x in re.findall(r"load averages: ([0-9.]+)", open(p, errors="replace").read()):
                    m = max(m or 0, float(x))
            elif f.endswith(".json") and "/json/" in p:
                def walk(o):
                    global m
                    if isinstance(o, dict):
                        for k, v in o.items():
                            if k == "load" and isinstance(v, (int, float)): m = max(m or 0, float(v))
                            else: walk(v)
                    elif isinstance(o, list):
                        for v in o: walk(v)
                walk(json.load(open(p)))
        except Exception:
            pass
print("" if m is None else m)
