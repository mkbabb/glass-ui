# Condense the AB readings into the numbers AB.md quotes.   python3 -I summarize.py <AB dir>
import json, os, sys, math

AB = sys.argv[1]
D = os.path.join(AB, "data")
sys.path.insert(0, "")


def oklch(rgb):
    def lin(c):
        c /= 255
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    R, G, B = (lin(v) for v in rgb)
    l = (0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B) ** (1 / 3)
    m = (0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B) ** (1 / 3)
    s = (0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B) ** (1 / 3)
    L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
    a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
    b = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
    return round(L, 3), round(math.hypot(a, b), 3), round((math.degrees(math.atan2(b, a)) + 360) % 360, 1)


out = {}
for eng in ("chromium", "webkit"):
    p = os.path.join(D, f"sheet-{eng}.json")
    if not os.path.exists(p):
        continue
    rec = json.load(open(p))
    print(f"\n######## {eng}  errors={rec['errors']}")
    for c in rec["cells"]:
        m = c["marks"]
        tag = f"{eng} {c['vp']} {c['cand']:3} {c['shape']:9}"
        ext = []
        for i, mk in m.items():
            for k, l in enumerate(mk["lines"]):
                if l.get("marked"):
                    ext.append((i, k, l["pastLeft"], l["pastRight"]))
        worst_l = max(ext, key=lambda e: e[2]) if ext else None
        worst_r = max(ext, key=lambda e: e[3]) if ext else None
        inter = {i: sum(l.get("intersectDevPx", 0) or 0 for l in m[i]["lines"]) for i in ("h16", "h48", "h85", "h112", "wake", "google") if i in m}
        wt = {i: (m[i]["lines"][0].get("weightPx"), m[i]["lines"][0].get("weightEm")) for i in ("h16", "h48", "h85", "h112") if i in m}
        seat = {i: (m[i]["lines"][0].get("topBelowBaselineEm"), m[i]["lines"][0].get("bottomBelowBaselineEm")) for i in ("h16", "h48", "h85", "h112", "wake", "google") if i in m}
        lines = {i: f"{sum(1 for l in m[i]['lines'] if l.get('marked'))}/{len(m[i]['lines'])}" for i in ("wrap", "atlas21", "atlas42", "rtl") if i in m}
        ink = {}
        for i in ("atlas21", "atlas42"):
            if i in m and m[i]["lines"] and m[i]["lines"][0].get("ink"):
                ink[i] = {th: oklch(v) for th, v in m[i]["lines"][0]["ink"].items()}
        sw = {"light": oklch(c["swatch"]) if c.get("swatch") else None, "dark": oklch(c["swatchDark"]) if c.get("swatchDark") else None}
        an = c.get("animations", {})
        props = sorted({p for a in an.get("list", []) for p in a["props"]})
        kinds = sorted({f"{a['name']}@{a['el']}:{'+'.join(a['props'])}:{a['duration']}ms:{'present' if a['easing']==an.get('presentEasing') else a['easing'][:20]}" for a in an.get("list", [])})
        lg = c.get("ledger", {})
        mount = sum(lg.get("byPhase", {}).get("mount", {}).values())
        indraw = lg.get("inDrawWindow", {})
        print(f"{tag} worstPastL={worst_l} worstPastR={worst_r}")
        print(f"   inter(devpx@2x)={inter}  weight={wt}")
        print(f"   seat(em below baseline top,bottom)={seat}")
        print(f"   lines={lines} ink={ink} swatch={sw}")
        print(f"   anim={kinds} props={props}")
        print(f"   reads mount={mount} byPhase={ {k: sum(v.values()) for k, v in lg.get('byPhase', {}).items()} } inDraw={indraw} drawn={lg.get('drawnEvents')} sheetH={c.get('sheetH')} errs={c.get('errors_light')}")
        print(f"   all lines: " + "; ".join(f"{i}:" + ",".join(f"[{l.get('pastLeft')},{l.get('pastRight')}]" for l in mk['lines']) for i, mk in m.items()))
    for s in rec.get("still", []):
        print(f"STILL {eng} {s['cand']} {s['shape']}: " + json.dumps({k: v for k, v in s.items() if k not in ("cand", "shape")})[:1500])
    for s in rec.get("inview", []):
        print(f"INVIEW {eng} {json.dumps(s)}")
for eng in ("chromium", "webkit"):
    p = os.path.join(D, f"stall-{eng}.json")
    if os.path.exists(p):
        rec = json.load(open(p))
        print(f"\n######## stall {eng}")
        for c in rec["cells"]:
            print(json.dumps(c)[:900])
        for t in rec["traces"]:
            print(json.dumps(t)[:1400])
    p = os.path.join(D, f"scroll-{eng}.json")
    if os.path.exists(p):
        print(f"\n######## scroll {eng}", open(p).read())
for k in ("ctl", "a", "b"):
    p = os.path.join(D, f"bytes-{k}.json")
    if os.path.exists(p):
        b = json.load(open(p))
        print("BYTES", k, {x: b[x] for x in ("js", "css", "jsGz", "cssGz", "total", "totalGz")})
