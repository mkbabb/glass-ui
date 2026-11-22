# mkstrips9.py: MEASURE-9 part H, item H14 (RU-107, RU-122). Writes m9/strips9.py from part M's pm/stripsm.py by exact
# replacements (each must match once), keeping its scheme and posture checks, and changing what the rulings name:
#   - the WebKit label reads "Playwright WebKit 2287, which draws the glass without its blur; not what Safari shows";
#   - questions 5, 10, 14, 18 and 21 are drawn from Chromium only (the blur decides what the owner sees there); 19 and 20
#     in both engines, the WebKit strips labelled as above;
#   - question 10: today's dock once a row (one ground and scheme), the dark default the rung DARK names (0.7 is
#     "firmness 3 of 5");
#   - question 14 (RU-122): every frame on one ground; a frame whose recorded ground differs from the first is refused,
#     and the title names the ground;
#   - question 19: the dialog's first frame drawn at 0.6 (its title legible); a third frame not shot after the fold
#     landed (no landedMs) is refused;
#   - question 5: the folded and open card, rounded and pill docks, with their corners;
#   - frames read from m9/owner9m.mjs (owner9m.*.json), strips written as strip-*-9m.<engine>.png.
import os
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
s = open(os.path.join(H, "pm/stripsm.py")).read()
def rep(old, new, n=1):
    global s
    assert s.count(old) == n, (s.count(old), old[:90])
    s = s.replace(old, new)
rep("# stripsm.py <owner-dir>", "# strips9.py (m9/mkstrips9.py writes it from pm/stripsm.py; RU-107, RU-122: see that script) <owner-dir>")
rep('ENG = {"chromium": "Chromium", "webkit": "Safari\'s engine (Playwright WebKit)"}', 'ENG = {"chromium": "Chromium", "webkit": "Playwright WebKit 2287, which draws the glass without its blur; not what Safari shows"}\nCHROMIUM_ONLY = {"q5", "q10", "q14", "q18", "q21"}')
rep('DARK = os.environ.get("DARK", "1")', 'DARK = os.environ.get("DARK", "0.7")')
# q10: Chromium only, today's dock once a row
rep('''                rows.append((order, c["ground"], m["label"], m["file"]))
    rows.sort()''', '''                if c["rung"] == "today":
                    if (c["ground"], c["scheme"]) in TODAY_SEEN: continue
                    TODAY_SEEN.add((c["ground"], c["scheme"]))
                rows.append((order, c["ground"], m["label"], m["file"]))
    rows.sort()''')
rep('''for engine in ("chromium", "webkit"):
    E = ENG[engine]
    rows = []''', '''for engine in ("chromium", "webkit"):
    E = ENG[engine]
    rows = []
    TODAY_SEEN = set()''')
rep('''    for ground in ("grid", "field", "daraksha"):
        items = [(lab, fl) for o, g, lab, fl in rows if g == ground]''', '''    for ground in ("grid", "field", "daraksha") if engine == "chromium" else ():
        items = [(lab, fl) for o, g, lab, fl in rows if g == ground]''')
rep('f"{out}/strip-q10-{ground}-8m.{engine}.png"', 'f"{out}/strip-q10-{ground}-9m.{engine}.png"')
# the frames from owner9m
rep('for src in sorted(glob.glob(f"{owner}/ownerm.*.{engine}.json")):', 'for src in sorted(glob.glob(f"{owner}/owner9m.*.{engine}.json")):')
rep('''            if not m.get("file") or not ok(m): continue''', '''            if not m.get("file") or not ok(m): continue
            if m.get("set") in CHROMIUM_ONLY and engine != "chromium": continue
            if m.get("set") == "q19" and "landedMs" in m and m.get("landedMs") is None:
                refused.append(f'q19 {os.path.basename(m["file"])}: not shot after the fold landed'); continue
            if m.get("set") == "q14":
                g0 = GROUND14.setdefault(engine, m.get("ground"))
                if m.get("ground") != g0:
                    refused.append(f'q14 {os.path.basename(m["file"])}: ground {m.get("ground")}, the strip\\'s is {g0}'); continue''')
rep('''    by = {}''', '''    by = {}
    GROUND14 = {}''')
# q14: the ground in the title, -9m names
rep('''    grid(by.get(("q14", "build"), []) + by.get(("q14", "proto"), []), 3,''', '''    if engine == "chromium": grid(by.get(("q14", "build"), []) + by.get(("q14", "proto"), []), 3,''')
rep('f"{out}/strip-q14-8m.{engine}.png", 0.5)', 'f"{out}/strip-q14-9m.{engine}.png", 0.5)')
rep('f"A dock that sits in a row with other things (question 14). ', 'f"A dock that sits in a row with other things (question 14), every row on one ground, the build page\'s ({GROUND14.get(engine) or \'not recorded\'}). ')
rep('''    grid(by.get(("q18", "build"), []), 2,''', '''    if engine == "chromium": grid(by.get(("q18", "build"), []), 2,''')
rep('f"{out}/strip-q18-8m.{engine}.png", 0.5)', 'f"{out}/strip-q18-9m.{engine}.png", 0.5)')
rep('f"{out}/strip-q19-8m.{engine}.png", 0.35)', 'f"{out}/strip-q19-9m.{engine}.png", 0.35, first_scale=0.6)')
rep('f"{out}/strip-q20-8m.{engine}.png", 0.5)', 'f"{out}/strip-q20-9m.{engine}.png", 0.5)')
rep('''    grid(by.get(("q21", "today"), []) + by.get(("q21", "build"), []), 3,''', '''    if engine == "chromium": grid(by.get(("q21", "today"), []) + by.get(("q21", "build"), []), 3,''')
rep('f"{out}/strip-q21-8m.{engine}.png", 0.5)', 'f"{out}/strip-q21-9m.{engine}.png", 0.5)\n    if engine == "chromium": grid(by.get(("q5", "build"), []), 2, f"A folded card or rounded dock (question 5): each folded, then open, with its corner in px; a folded dock is a disc when its corner is half its side. {E}; build {sha}.", f"{out}/strip-q5-9m.{engine}.png", 0.6)')
# grid: the first frame's own scale (q19's dialog)
rep('''def grid(items, cols, title, dest, scale=0.5, minw=300):
    ims = []
    for lab, p in items:
        if not p or not os.path.exists(p): continue
        USED.add(os.path.abspath(p)); im = Image.open(p).convert("RGB"); im = im.resize((max(1, round(im.width * scale)), max(1, round(im.height * scale))), Image.LANCZOS)''', '''def grid(items, cols, title, dest, scale=0.5, minw=300, first_scale=None):
    ims = []
    for n, (lab, p) in enumerate(items):
        if not p or not os.path.exists(p): continue
        sc = first_scale if (first_scale and n == 0) else scale
        USED.add(os.path.abspath(p)); im = Image.open(p).convert("RGB"); im = im.resize((max(1, round(im.width * sc)), max(1, round(im.height * sc))), Image.LANCZOS)''')
rep('dest = f"{out}/strip-q12-names-8m.png"', 'dest = f"{out}/strip-q12-names-9m.png"')
rep('open(os.path.join(sys.argv[3], "pm-strip-frames.txt"), "w")', 'open(os.path.join(sys.argv[3], "m9-strip-frames.txt"), "w")')
open(os.path.join(H, "m9/strips9.py"), "w").write(s)
print("wrote m9/strips9.py")
