"""seams.py <probe json>: I8-G1 at rest (line / tone max, corner r = h/2) and the motion seam (neck rows; contacted cuts over 1.5)."""
import json, sys
def walk(o):
    if isinstance(o, dict):
        yield o
        for v in o.values(): yield from walk(v)
    elif isinstance(o, list):
        for v in o: yield from walk(v)
for p in sys.argv[1:]:
    c = json.load(open(p))["cells"]
    r = c.get("rest", [])
    js = [j for cell in r for j in (cell.get("joins") or []) if "line" in j]
    co = [x for x in walk(r) if "halfH" in x]
    print(p.split("/")[-1], "rest: cells", len(r), "joins", len(js), "line max", max((j["line"] for j in js), default=None), "tone max", max((j["tone"] for j in js), default=None), "corner r=h/2", sum(1 for x in co if x["r"] == x["halfH"]), "/", len(co))
    m = [x for x in walk(c.get("mseam", [])) if "line" in x and "neck" in x]
    cont = [x for x in m if x.get("now") and max(x["now"]) >= 0 and x["neck"] and x["neck"][1] > x["neck"][0]]
    print("  mseam: cuts", len(cont), "neck line max", max((x["line"] for x in cont), default=None), "over 1.5", sum(1 for x in cont if x["line"] > 1.5), "| member rows max", max((x.get("memberLine", 0) for x in cont), default=None))
