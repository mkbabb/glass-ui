# same.py <records>: REGISTRY §P13-7.3 item 1, "same build, proved". Compares this seat's bp13 with pass 13's: the scene chunk
# (21,473 B; bp12 21,483 B), the boot graph (503,777 B), F7 13/13 and PR 6/6, and the patch hashes. Prints SAME or DIFFERS last.
import json, re, sys, hashlib, os
R = sys.argv[1]; D = os.path.dirname(os.path.dirname(os.path.dirname(R))); bad = []
want = {"pass-13/D2-Bp-p13.patch": "bb7cb08da92677aa6e4e2c753ce9f901b17f4ddb2051d2f4162ef43e97648121", "pass-12/D2-Bp-p12.patch": "5318a3dcefdb9ca86337b780ff35784a82291f9108953098b950905e8696cff7", "pass-6/floor-v5.patch": "cba6bdc249bedaf59bae78ac75e76bc1e2b917ce4040aeb726053ddab77667fe", "pass-4/floor-v3.patch": "637d1625d7b39b5d4f496fffc8a6a039e162f39facd07e0e57b812f7ec23d9b1"}
for p, h in want.items():
    g = hashlib.sha256(open(os.path.join(D, p), "rb").read()).hexdigest(); print(p, g, "equal" if g == h else "DIFFERS"); g == h or bad.append(p)
ap = open(R + "/apply.log").read()
for b, n in (("bp13", 21473), ("bp12", 21483)):
    m = re.search(r"scene chunk %s: (\d+)" % b, ap); v = int(m.group(1)) if m else None; print("scene chunk", b, v, "want", n); v == n or bad.append("chunk " + b)
print("apply failures:", ap.count("FAILED")); ap.count("FAILED") and bad.append("apply")
print("build exits:", re.findall(r"built (\w+): build exit (\d+)", ap)); any(e != "0" for _, e in re.findall(r"built (\w+): build exit (\d+)", ap)) and bad.append("build")
bg = open(R + "/F7/boot-graph.txt").readline().strip(); print("boot graph:", bg); "503777 B" in bg or bad.append("boot graph")
for f, n in (("F7/F7.json", 13), ("PR/PR.json", 6)):
    try: cs = json.load(open(os.path.join(R, f)))["cells"]
    except Exception as e: cs = []; print(f, "unreadable", e)
    ok = sum(1 for c in cs if c.get("pass")); print(f, "%d/%d PASS" % (ok, len(cs)), [c["cell"] for c in cs if not c.get("pass")]); (ok == n and len(cs) == n) or bad.append(f)
print("differs:", bad)
print("SAME" if not bad else "DIFFERS")
