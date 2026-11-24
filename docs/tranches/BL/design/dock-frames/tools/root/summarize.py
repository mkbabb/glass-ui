# summarize.py <witness.json>: one line per tree, cell and page, then the extra cells.
import json, sys

d = json.load(open(sys.argv[1]))


def f(x):
    return "-" if x is None else (f"{x['ms']}ms/{x['maxStep17']}" if isinstance(x, dict) else str(x))


keys = [("pop", "popOpen"), ("drift", "driftOpen"), ("leaveO", "leaveDriftOpen"), ("sealDrift", "sealDriftClose"), ("leaveC", "leaveDriftClose"),
        ("sealJump", "sealSettleJump"), ("persJump", "persSettleJump"), ("inO", "fadeInOpen"), ("outO", "fadeOutOpen"), ("inC", "fadeInClose"),
        ("outC", "fadeOutClose"), ("bothO", "bothOpen"), ("bothC", "bothClose"), ("tailO", "tailOpenMs"), ("tailC", "tailCloseMs"),
        ("open", "openMs"), ("close", "closeMs"), ("long", "longFramesClose"), ("lastO", "openLastSteps"), ("lastC", "closeLastSteps")]
for c in d["cells"]:
    for p in c["pages"]:
        head = f"{c['tree']:5} {c['w']} {c['scheme'][:1]} {p['page'][:9]:9} {p.get('error') or ''}"
        if "tip" in p:
            print(head, "tip", json.dumps(p["tip"]))
            continue
        row = " ".join(f"{k}={f(p.get(v))}" for k, v in keys)
        print(head, row)
        for name in ("press", "key"):
            pr = p.get(name)
            if pr:
                b = pr["before"]
                print(f"{'':24}{name}: move={pr['move']} maxStep={pr['maxStep']} frames={pr['frames']} at={pr.get('at')} focusVisible={pr.get('focusVisible')} onTheme={pr.get('onTheme')} fits={b['fits']} max={b['max']} overflow={b.get('overflow')}")
for e in d.get("extra", []):
    print(json.dumps(e))
