# strips8.py <owner-dir> <plate-shots-dir> <logs-dir> <out-dir> <sha>: MEASURE-8 H7 (RU-83 as amended for R7-2, R7-9, C7-2,
# C7-M1). The owner's strips from m8/owner9.mjs's frames and m8/plate8.mjs's Q10, wash and fission frames, every frame
# labelled in plain words. strips7.py's scheme check, and RU-83's posture check: a frame whose label (or whose `wanted`
# posture) names a posture other than the dock's at the shot is refused (printed, left out). Q10: nav (open; nav never
# folds, its stage is collapse=false) and the pill (folded and open), on the grid, the warm field and daraksha's ground,
# today's dock (v11.0.2's build) then levels 1, 0.85, 0.7, 0.55, 0.4, both schemes, the default marked per scheme
# (light 1; dark the rung RU-67's rule returns, passed as DARK=<rung> in the environment, else 0.7 "chosen on the warm
# field"); beside each frame plate against field and show-through to two decimals. Writes <out>/strip-*-8.<engine>.png.
import sys, os, json, glob, re
from PIL import Image, ImageDraw
owner, shots, logs, out, sha = sys.argv[1:6]
ENG = {"chromium": "Chromium", "webkit": "Safari's engine (Playwright WebKit 2287)"}
DARK = os.environ.get("DARK", "0.7")
DARK_WHY = os.environ.get("DARK_WHY", "chosen on the warm field, provisional")
refused = []

def ok(m):
    words = re.findall(r"\b(light|dark)\b", m.get("label", ""))
    if words and m.get("scheme") not in (None, words[-1]):
        refused.append(f'{m.get("set")} {os.path.basename(m.get("file", ""))}: label says {words[-1]}, the page was {m.get("scheme")}'); return False
    want = m.get("wanted")
    if want and m.get("posture") and m["posture"] != want and not (want == "open" and m["posture"] == "rest"):
        refused.append(f'{m.get("set")} {os.path.basename(m.get("file", ""))}: label says {want}, the dock was {m["posture"]}'); return False
    return True

def grid(items, cols, title, dest, scale=0.5):
    ims = []
    for lab, p in items:
        if not p or not os.path.exists(p): continue
        im = Image.open(p).convert("RGB"); im = im.resize((max(1, round(im.width * scale)), max(1, round(im.height * scale))), Image.LANCZOS)
        ims.append((lab, im))
    if not ims:
        print("nothing for", dest); return
    cw = max(max(i.width for _, i in ims) + 12, 320); ch = max(i.height for _, i in ims) + 44
    rows = -(-len(ims) // cols)
    W = max(cols * cw + 6, 700); H = 28 + rows * ch + 6
    c = Image.new("RGB", (W, H), "white"); dr = ImageDraw.Draw(c); dr.text((6, 8), title, fill="black")
    for k, (lab, im) in enumerate(ims):
        x = 6 + (k % cols) * cw; y = 28 + (k // cols) * ch
        per = max(10, int((cw - 8) / 6))
        lines = [lab[i:i + per] for i in range(0, len(lab), per)][:2]
        for j, l in enumerate(lines): dr.text((x, y + j * 12), l, fill=(40, 40, 40))
        c.paste(im, (x, y + 28))
    c.save(dest, optimize=True); print("wrote", dest, c.size)

RUNG_NAME = {"today": "today's dock (11.0.2)", "1": "level 1", "0.85": "level 0.85", "0.7": "level 0.7", "0.55": "level 0.55", "0.4": "level 0.4"}
GROUND_NAME = {"grid": "the dark grid (its light twin in light)", "field": "the warm field", "daraksha": "daraksha's Colour ground"}
os.makedirs(out, exist_ok=True)
for engine in ("chromium", "webkit"):
    E = ENG[engine]
    # Q10, from plate8's logs: today (v11.0.2's build) and the build's rungs
    rows = []
    for f in sorted(glob.glob(f"{logs}/m8-plate-q10*.{engine}.json")):
        d = json.load(open(f))
        for c in d.get("cells", []):
            for r in c.get("docks", []):
                fr = r.get("frame")
                if not fr: continue
                m = {"set": "q10", "file": os.path.join(shots, fr["file"]), "scheme": fr.get("schemeAtShot"), "posture": fr.get("postureAtShot"), "wanted": r.get("postureAsked")}
                default = (c["scheme"] == "light" and c["rung"] == "1") or (c["scheme"] == "dark" and c["rung"] == DARK)
                mark = (" [the default in light]" if c["scheme"] == "light" else f" [the default in dark: {DARK_WHY}]") if default else ""
                pv = r.get("plateVsField"); sh = r.get("show")
                m["label"] = f'{RUNG_NAME.get(c["rung"], c["rung"])}{mark}; {c["page"]} {r.get("postureAsked")}; on {GROUND_NAME.get(c["ground"], c["ground"])}; plate against field {pv:.2f}:1' + (f"; show-through {sh:.2f}" if sh is not None else "") + f'; {c["scheme"]}'
                if not ok(m): continue
                order = (["grid", "field", "daraksha"].index(c["ground"]) if c["ground"] in ("grid", "field", "daraksha") else 9, ["dark", "light"].index(c["scheme"]), c["page"], r.get("postureAsked"), ["today", "1", "0.85", "0.7", "0.55", "0.4"].index(c["rung"]) if c["rung"] in RUNG_NAME else 9)
                rows.append((order, m["label"], m["file"]))
    rows.sort()
    for ground in ("grid", "field", "daraksha"):
        items = [(lab, f) for o, lab, f in rows if o[0] == ["grid", "field", "daraksha"].index(ground)]
        grid(items, 6, f"Q10, a firmer dock: nav (open) and the pill (folded and open), today's dock then five levels, dark then light, on {GROUND_NAME[ground]}; plate against field and show-through beside each; {E}; build {sha}", f"{out}/strip-q10-{ground}-8.{engine}.png", 0.6)
    # the wash row and the fission, from plate8's logs
    for name, pat, title in (("wash", "m8-plate-wash*", "slides's wash tier (its parkway-lab rule, .deck-dock:not(.dark)) beside the default tier, open, over the warm field"), ("fission", "m8-plate-fission*", "daraksha's fission held at t 0.62 over its Colour ground: the neck between the site dock and the theme dock")):
        items = []
        for f in sorted(glob.glob(f"{logs}/{pat}.{engine}.json")):
            d = json.load(open(f))
            for c in d.get("cells", []):
                fr = next((r["frame"] for r in c.get("docks", []) if r.get("frame")), None)
                if not fr: continue
                parts = "; ".join(f'{r["key"]} {r["plateVsField"]:.2f}:1' for r in c["docks"] if r.get("plateVsField") is not None)
                lab = f'{RUNG_NAME.get(c["rung"], c["rung"])}{" (the neck at the dock level, the README recipe)" if "match" in os.path.basename(f) else ""}; plate against field: {parts}; {c["scheme"]}'
                if fr.get("schemeAtShot") and fr["schemeAtShot"] != c["scheme"]:
                    refused.append(f"{name} {fr['file']}: label says {c['scheme']}, the page was {fr['schemeAtShot']}"); continue
                items.append((lab, os.path.join(shots, fr["file"])))
        grid(items, 2, f"{title}; {E}; build {sha}", f"{out}/strip-{name}-8.{engine}.png", 0.6)
    # owner9's sets
    by = {}
    for src in sorted(glob.glob(f"{owner}/owner9.*.{engine}.json")):
        for m in json.load(open(src)):
            if not m.get("file") or not ok(m): continue
            lab = m["label"].replace("Hover at 10 (the build's, for reference) %", "Hover at 10 % (the build's, for reference)")
            by.setdefault(m["set"], []).append((lab, os.path.join(owner, os.path.basename(m["file"]))))
    grid(by.get("q13", []), 1, f"Q13, a page name on a phone: an icon seat pressed and held on a dock of many seats; {E}; build {sha}", f"{out}/strip-q13-8.{engine}.png", 0.5)
    grid(by.get("q14", []), 3, f"Q14, a dock in a row: atlas's head row folded, open, and in the linger; the prototype's rows cropped to the row; {E}; build {sha}", f"{out}/strip-q14-8.{engine}.png", 0.5)
    grid(by.get("q17", []), 2, f"Q17, icons beside words: share 0.5 (v11.0.2), 0.9 (this build), sized from the words; a glyph and its word spaced as a site spaces them; a 21 px tab glyph beside a 24 px one; {E}; build {sha}", f"{out}/strip-q17-8.{engine}.png", 0.5)
    grid(by.get("q18", []), 2, f"Q18, a hovered seat beside the current page: hover at 5, 6.5 and 8 % over the current step, and the build's 10 % for reference; {E}; build {sha}", f"{out}/strip-q18-8.{engine}.png", 0.5)
    grid(by.get("seatset", []), 4, f"A change of seat set (a seat added) with the pointer off the dock, frames about 25 to 40 ms apart; {E}; build {sha}", f"{out}/strip-seatset-8.{engine}.png", 0.5)
print("refused by the scheme and posture checks:", len(refused)); [print("  ", r) for r in refused]
