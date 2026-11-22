# Critic 4: for every film a run report carries (an attachment that is a list of frames
# with a box, an opacity or a material), which channels move over the film: place (x, y),
# size (w, h), opacity, clip, backdrop, fill, form and material attribute. One line per
# film, so the gestalt (one effect per change) reads as a table.   channels.py <report>...
import json, base64, sys, os

KEYS = [("x", "x"), ("y", "y"), ("w", "w"), ("h", "h"), ("op", "op"), ("clip", "clip"), ("bf", "bf"), ("bg", "bg"), ("form", "form"), ("surface", "surface")]

def films(d, name=""):
    if isinstance(d, list) and d and isinstance(d[0], dict) and any(k in d[0] for k in ("op", "y", "bf")):
        yield name, d
    elif isinstance(d, dict):
        for k, v in d.items():
            yield from films(v, f"{name}.{k}" if name else k)

def moved(frames):
    out = []
    for key, label in KEYS:
        vals = [f.get(key) for f in frames if f.get("present", True) and key in f]
        if not vals: continue
        if isinstance(vals[0], (int, float)):
            nums = [v for v in vals if isinstance(v, (int, float))]
            if nums and max(nums) - min(nums) > (0.02 if key == "op" else 1.0):
                out.append(f"{label}[{min(nums):.3g}..{max(nums):.3g}]")
        elif len(set(map(str, vals))) > 1:
            out.append(f"{label}x{len(set(map(str, vals)))}")
    return out

for path in sys.argv[1:]:
    r = json.load(open(path))
    print("==", os.path.basename(path))
    def walk(s):
        for sp in s.get("specs", []):
            for t in sp["tests"]:
                res = t["results"][-1] if t["results"] else None
                for a in (res or {}).get("attachments", []):
                    if "body" not in a: continue
                    try: d = json.loads(base64.b64decode(a["body"]))
                    except Exception: continue
                    for name, fr in films(d, a["name"]):
                        print(f"  {sp['title'][:64].ljust(64)} {name[:22].ljust(22)} n={len(fr):3d} " + " ".join(moved(fr)))
        for c in s.get("suites", []): walk(c)
    for s in r["suites"]: walk(s)
