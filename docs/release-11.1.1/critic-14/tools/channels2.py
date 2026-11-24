# Critic 12, after critic 4's channels.py: the films now carry each frame's computed `scale`,
# `transform` and `filter`, so the table adds the channels the earlier films could not see.
# One line per film: place (x, y), size (w, h), opacity, clip, backdrop, fill, form, material,
# and the scale the computed `scale` and `transform` apply on either axis (its largest
# distance from 1 over the mounted frames) and every filter other than none or a zero blur.
#   channels2.py <report>...
import json, base64, sys, os, re

KEYS = [("x", "x"), ("y", "y"), ("w", "w"), ("h", "h"), ("op", "op"), ("clip", "clip"), ("bf", "bf"), ("bg", "bg"), ("form", "form"), ("surface", "surface")]

def films(d, name=""):
    # A film's first frames may be unmounted ({t, present: false}), so any frame counts.
    if isinstance(d, list) and d and isinstance(d[0], dict) and any(k in f for f in d if isinstance(f, dict) for k in ("op", "y", "bf")):
        yield name, d
    elif isinstance(d, dict):
        for k, v in d.items():
            yield from films(v, f"{name}.{k}" if name else k)

def scale_of(f):
    x = y = 1.0
    s = f.get("scale")
    if s and s != "none":
        v = [float(n) for n in s.split()]
        x *= v[0]; y *= v[1] if len(v) > 1 else v[0]
    m = re.match(r"^matrix(3d)?\((.*)\)$", f.get("transform") or "")
    if m:
        v = [float(n) for n in m.group(2).split(",")]
        a, b, c, d = (v[0], v[1], v[4], v[5]) if m.group(1) else v[:4]
        x *= (a * a + b * b) ** 0.5; y *= (c * c + d * d) ** 0.5
    return x, y

def moved(frames):
    out = []
    live = [f for f in frames if f.get("present", True)]
    for key, label in KEYS:
        vals = [f.get(key) for f in live if key in f]
        if not vals: continue
        if isinstance(vals[0], (int, float)):
            nums = [v for v in vals if isinstance(v, (int, float))]
            if nums and max(nums) - min(nums) > (0.02 if key == "op" else 1.0):
                out.append(f"{label}[{min(nums):.3g}..{max(nums):.3g}]")
        elif len(set(map(str, vals))) > 1:
            out.append(f"{label}x{len(set(map(str, vals)))}")
    sc = [scale_of(f) for f in live if "scale" in f or "transform" in f]
    if sc:
        dev = max(max(abs(a - 1), abs(b - 1)) for a, b in sc)
        if dev > 0.001:
            out.append(f"SCALE[{min(a for a, _ in sc):.4g}..{max(a for a, _ in sc):.4g} x {min(b for _, b in sc):.4g}..{max(b for _, b in sc):.4g}]")
    fl = sorted({f.get("filter") for f in live if f.get("filter") not in (None, "none") and not re.match(r"^blur\(0(px)?\)$", f.get("filter"))})
    if fl:
        out.append(f"FILTER{fl[:3]}")
    if not sc:
        out.append("(no scale read)")
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
                        print(f"  {sp['title'][:72].ljust(72)} {name[:22].ljust(22)} n={len(fr):3d} " + " ".join(moved(fr)))
        for c in s.get("suites", []): walk(c)
    for s in r["suites"]: walk(s)
