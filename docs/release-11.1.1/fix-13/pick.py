"""Fix seat 13: the CommandDialog pick cell of each report: its status, the plate's layout box at
rest and its smallest through the exit (from the clause's message when it fails), and the
painted frames of the exit with their bounding height (from the cell's routes attachment).
   python3 -I pick.py <report.json>..."""
import base64, json, re, sys

def results(suite):
    for s in suite.get("suites", []):
        yield from results(s)
    for spec in suite.get("specs", []):
        for t in spec["tests"]:
            for r in t["results"]:
                yield spec["title"], r

for f in sys.argv[1:]:
    rep = json.load(open(f))
    for s in rep["suites"]:
        for title, r in results(s):
            if "CommandDialog keeps its list through its exit by pick" not in title:
                continue
            line = f"{f.rsplit('/', 1)[-1]:40} {r['status']:7}"
            msg = re.sub(r"\x1b\[[0-9;]*m", "", (r.get("errors") or [{}])[0].get("message", ""))
            m = re.search(r'keeps its box through its exit (\{"rest".*?\]\]\})', msg)
            if m:
                d = json.loads(m.group(1))
                box = d["box"]
                rw, rh = d["rest"]
                first = next(b for b in box if max(abs(b[1] - rw), abs(b[2] - rh)) > 1)
                low = min(b[2] for b in box)
                line += f" rest {rw}x{rh}; first off {first[1]}x{first[2]} at +{first[0]} ms; smallest h {low}; frames {len(box)}"
            elif msg:
                line += " " + msg.splitlines()[0][:120]
            for a in r.get("attachments", []):
                if a["name"] == "routes" and a.get("body"):
                    read = json.loads(base64.b64decode(a["body"]))
                    fr = read["frames"]
                    hs = [x[2] for x in fr if x[2] is not None]
                    line += f" | painted {read['painted']}, share {read['share']}, bounding h {max(hs)}..{min(hs)}"
            print(line)
