# tables.py <summary.json> — the markdown tables RECORD.md quotes, from analyze.mjs's summary.
# Run: python3 -I tables.py ../record/summary.json > ../record/tables.md
import json
import sys

d = json.load(open(sys.argv[1]))
cells = [c for c in d["cells"] if "error" not in c]


def f(x, nd=1):
    if x is None:
        return "–"
    if isinstance(x, float):
        return f"{x:.{nd}f}"
    return str(x)


def calls(g):
    cs = g.get("calls") or []
    if not cs:
        return "0"
    kinds = {}
    for c in cs:
        k = "smooth" if "smooth" in c["args"] else "instant" if "instant" in c["args"] else c["fn"]
        kinds[k] = kinds.get(k, 0) + 1
    first = cs[0]
    return f"{len(cs)} ({', '.join(f'{v} {k}' for k, v in kinds.items())}); first at {f(first['t'])} ms, strip at {first['sl']} px"


def jump(g):
    """the largest single-frame step against the motion's direction after release, or the
    largest step at all for a turn without a hand"""
    m = g.get("afterRelease") or g["motion"]
    u = (m or {}).get("uneven") or {}
    revs = u.get("revFrames") or []
    big = max([abs(r["step"]) for r in revs], default=0)
    return big


rows = []
hdr = "| cell | gesture | hand→picture px | release→rest ms | picture: biggest step / back-steps (largest) | strip scroll: back-steps (largest) | content lag max / max one-frame change (% of member width) | frames >25 ms | commit ms | page scroll calls |"
sep = "|" + "---|" * 10
print(hdr)
print(sep)
for c in sorted(cells, key=lambda c: (c["source"], c["variant"], c["input"], -c["w"], c["engine"], c.get("traced", False))):
    name = f"{c['source']}{('-' + c['variant']) if c['variant'] else ''}.{c['input']}.{c['w']}" + (" (traced)" if c.get("traced") else "")
    for g in c["gestures"]:
        m = g["motion"] or {}
        ar = g.get("afterRelease")
        mm = ar if ar else m
        u = (mm or {}).get("uneven") or {}
        hand = g.get("hand")
        handtxt = f"{f(hand['pointerPx'],0)}→{f(hand['picturePx'],0)}" if hand else "–"
        rest = (ar or {}).get("lastMoveMs") if ar else m.get("lastMoveMs")
        commits = "; ".join(f"{f(x['t'])} ({x['from']}→{x['to']})" for x in g["commits"]) or "none"
        w = g["writes"]
        sc = (g.get("scroll") or {}).get("uneven") or {}
        srev = sc.get("revFrames") or []
        pr = g.get("projection") or {}
        rows.append(
            f"| {name} {c['engine']} | {g['name']} | {handtxt} | {f(rest)} | {f(mm.get('maxStep'))} / {u.get('reversals','–')} ({f(jump(g))}) | {sc.get('reversals','–')} ({f(max([abs(r['step']) for r in srev], default=0))}) | {f(pr.get('lagMax'))} / {f(pr.get('lagMaxStep'))} | {g['dt']['over25']} (max {f(g['dt']['max'])}) | {commits} | {calls(g)} |"
        )
print("\n".join(rows))
