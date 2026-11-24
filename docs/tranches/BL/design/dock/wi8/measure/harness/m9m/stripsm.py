# stripsm.py (m9/strips9.py with the measure of part M's logs: m8-plate-m9m-q10*, m9m-names.txt; RU-107, RU-122) <owner-dir> <plate-shots-dir> <logs-dir> <out-dir> <sha>: MEASURE-8 part M, the owner's strips for questions
# 10, 12, 14 and 18 to 21, from pm/ownerm.mjs's frames, m8/plate8.mjs's question 10 frames and the measure's name table,
# every frame labelled in words a visitor knows (no gate or ruling ids). m8/strips8.py's two checks: a frame whose label
# names another scheme than the page had at the shot, or whose wanted posture is not the dock's at the shot, is refused
# (printed, left out). Question 10's default: light firmness 1; dark the rung RU-67's rule returns on the measure's
# readings, passed as DARK=<rung>. Writes <out>/strip-*-8m.<engine>.png (and strip-q12-names-8m.png).
import sys, os, json, glob, re
from PIL import Image, ImageDraw, ImageFont
owner, shots, logs, out, sha = sys.argv[1:6]
ENG = {"chromium": "Chromium", "webkit": "headless WebKit, which draws the glass without its blur"}
CHROMIUM_ONLY = {"q5", "q10", "q14", "q18", "q21"}
DARK = os.environ.get("DARK", "0.7")
FONT = "/System/Library/Fonts/Helvetica.ttc"
f13 = ImageFont.truetype(FONT, 13); f15 = ImageFont.truetype(FONT, 15)
refused = []
USED = set()  # every frame a strip draws, written to <logs>/pm-strip-frames.txt so the rest can be deleted

def ok(m):
    words = re.findall(r"\b(light|dark)\b", m.get("label", ""))
    if words and m.get("scheme") not in (None, words[-1]):
        refused.append(f'{m.get("set")} {os.path.basename(m.get("file", ""))}: label says {words[-1]}, the page was {m.get("scheme")}'); return False
    want = m.get("wanted")
    if want and m.get("posture") and m["posture"] != want and not (want == "open" and m["posture"] == "rest"):
        refused.append(f'{m.get("set")} {os.path.basename(m.get("file", ""))}: label says {want}, the dock was {m["posture"]}'); return False
    return True

def wrap(text, width, font):
    words, lines, cur = text.split(" "), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if font.getlength(t) <= width: cur = t
        else:
            if cur: lines.append(cur)
            cur = w
    if cur: lines.append(cur)
    return lines

def grid(items, cols, title, dest, scale=0.5, minw=300, first_scale=None):
    ims = []
    for n, (lab, p) in enumerate(items):
        if not p or not os.path.exists(p): continue
        sc = first_scale if (first_scale and n == 0) else scale
        USED.add(os.path.abspath(p)); im = Image.open(p).convert("RGB"); im = im.resize((max(1, round(im.width * sc)), max(1, round(im.height * sc))), Image.LANCZOS)
        ims.append((lab, im))
    if not ims:
        print("nothing for", dest); return
    cw = max(max(i.width for _, i in ims) + 16, minw)
    labs = [wrap(lab, cw - 12, f13) for lab, _ in ims]
    lh = 16 * max(len(l) for l in labs) + 6
    ch = max(i.height for _, i in ims) + lh + 14
    rows = -(-len(ims) // cols)
    tl = wrap(title, max(cols * cw, 700) - 12, f15)
    th = 20 * len(tl) + 14
    Wd = max(cols * cw + 8, 700); Ht = th + rows * ch + 8
    c = Image.new("RGB", (Wd, Ht), "white"); dr = ImageDraw.Draw(c)
    for j, l in enumerate(tl): dr.text((8, 8 + j * 20), l, fill="black", font=f15)
    for k, ((lab, im), ll) in enumerate(zip(ims, labs)):
        x = 8 + (k % cols) * cw; y = th + (k // cols) * ch
        for j, l in enumerate(ll): dr.text((x, y + j * 16), l, fill=(40, 40, 40), font=f13)
        c.paste(im, (x, y + lh))
    c.save(dest, optimize=True); print("wrote", dest, c.size)

STEP = {"today": "today's dock (11.0.2)", "1": "firmness 1 of 5, the clearest", "0.85": "firmness 2 of 5", "0.7": "firmness 3 of 5", "0.55": "firmness 4 of 5", "0.4": "firmness 5 of 5, the firmest"}
GROUND = {"grid": "a near-black grid page with text under the dock (its white twin in light)", "field": "a warm figure page", "daraksha": "daraksha's ground"}
POST = {"open": "open", "folded": "folded", "rest": "open"}
os.makedirs(out, exist_ok=True)
for engine in ("chromium", "webkit"):
    E = ENG[engine]
    rows = []
    TODAY_SEEN = set()
    for f in sorted(glob.glob(f"{logs}/m8-plate-m9m-q10*.{engine}.json")):
        d = json.load(open(f))
        for c in d.get("cells", []):
            for r in c.get("docks", []):
                fr = r.get("frame")
                if not fr: continue
                m = {"set": "q10", "file": os.path.join(shots, fr["file"]), "scheme": fr.get("schemeAtShot"), "posture": fr.get("postureAtShot"), "wanted": r.get("postureAsked")}
                default = (c["scheme"] == "light" and c["rung"] == "1") or (c["scheme"] == "dark" and c["rung"] == DARK)
                pv = r.get("plateVsField"); sh = r.get("show")
                who = {"nav": "a page dock", "pill": "a round dock"}.get(c["page"], c["page"])
                m["label"] = (f'{STEP.get(c["rung"], c["rung"])}{" (the new default)" if default else ""}: {who}, {POST.get(r.get("postureAsked"), r.get("postureAsked"))}; '
                              f'it stands {pv:.2f}:1 off the page' + (f', and {sh:.2f} of the grid shows through it' if sh is not None and c["ground"] == "grid" else "") + f'; {c["scheme"]}')
                if not ok(m): continue
                order = (["grid", "field", "daraksha"].index(c["ground"]) if c["ground"] in ("grid", "field", "daraksha") else 9, ["dark", "light"].index(c["scheme"]), c["page"], r.get("postureAsked") or "", ["today", "1", "0.85", "0.7", "0.55", "0.4"].index(c["rung"]) if c["rung"] in STEP else 9)
                if c["rung"] == "today":
                    if (c["ground"], c["scheme"]) in TODAY_SEEN: continue
                    TODAY_SEEN.add((c["ground"], c["scheme"]))
                rows.append((order, c["ground"], m["label"], m["file"]))
    rows.sort()
    for ground in ("grid", "field", "daraksha") if engine == "chromium" else ():
        items = [(lab, fl) for o, g, lab, fl in rows if g == ground]
        grid(items, 6, f"A firmer dock (question 10), on {GROUND[ground]}: today's dock, then five firmnesses from the clearest to the firmest, dark then light; a page dock open, then a round dock folded and open. "
             f"Beside each frame: how far the dock stands off the page (1:1 is not at all), and on the grid page how much of the grid shows through it (1 is all of it). {E}; build {sha}.",
             f"{out}/strip-q10-{ground}-9m.{engine}.png", 0.5)
    by = {}
    GROUND14 = {}
    for src in sorted(glob.glob(f"{owner}/owner9m.*.{engine}.json")):
        lab_of = os.path.basename(src).split(".")[1]
        for m in json.load(open(src)):
            if not m.get("file") or not ok(m): continue
            if m.get("set") in CHROMIUM_ONLY and engine != "chromium": continue
            if m.get("set") == "q19" and "landedMs" in m and m.get("landedMs") is None:
                refused.append(f'q19 {os.path.basename(m["file"])}: not shot after the fold landed'); continue
            if m.get("set") == "q14":
                g0 = GROUND14.setdefault(engine, m.get("ground"))
                if m.get("ground") != g0:
                    refused.append(f'q14 {os.path.basename(m["file"])}: ground {m.get("ground")}, the strip\'s is {g0}'); continue
            by.setdefault((m["set"], lab_of), []).append((m["label"], os.path.join(owner, os.path.basename(m["file"]))))
    if engine == "chromium": grid(by.get(("q14", "build"), []) + by.get(("q14", "proto"), []), 3,
         f"A dock that sits in a row with other things (question 14): atlas's figure header on this build, light then dark, folded, open, and 1 s after the pointer leaves. The opening dock pushes the legend beside it and covers none of it. The overlay that would let it open over its row instead is not built and was not shot for this build. {E}; build {sha}.",
         f"{out}/strip-q14-9m.{engine}.png", 0.5)
    if engine == "chromium": grid(by.get(("q18", "build"), []), 2,
         f"How a hovered icon differs from the current page's (question 18): the pointer rests on Home; Reports is the current page, its highlight 10 % of the dock's text colour. Hover at 5, 6.5 and 8 % (this build's is 6.5 % in light and 5 % in dark), and 10 %, the current page's own step, for reference. Light on the left, dark on the right. {E}; build {sha}.",
         f"{out}/strip-q18-9m.{engine}.png", 0.5)
    grid(by.get(("q19", "build"), []), 3,
         f"A dialog opened from the dock (question 19): a press on the dimmed page closes the dialog and the dock stays open for its usual pause; a press outside a menu closes the menu and the dock together. {E}; build {sha}.",
         f"{out}/strip-q19-9m.{engine}.png", 0.35, first_scale=0.6)
    grid(by.get(("q20", "build"), []), 3,
         f"The controls dock on a desktop (question 20): with two or more controls it folds at every width after its short pause; with one control it is that control. {E}; build {sha}.",
         f"{out}/strip-q20-9m.{engine}.png", 0.5)
    if engine == "chromium": grid(by.get(("q21", "today"), []) + by.get(("q21", "build"), []), 3,
         f"The selected tab in dark (question 21): top, today's dock; below, this build. Each label gives how well the selected item's words read on its highlight (4.5:1 is the floor for words) and how far the highlight stands off the dock. {E}; build {sha}.",
         f"{out}/strip-q21-9m.{engine}.png", 0.5)
    if engine == "chromium": grid(by.get(("q5", "build"), []), 2, f"A folded card or rounded dock (question 5): each folded, then open, with its corner in px; a folded dock is a disc when its corner is half its side. {E}; build {sha}.", f"{out}/strip-q5-9m.{engine}.png", 0.6)

# question 12: the name table, as text
names = os.path.join(logs, "m9m-names.txt")
if os.path.exists(names):
    import json as _j
    KIND = {"component": "components", "function": "functions", "prop": "props", "slot": "slots", "exposed": "exposed methods", "emit": "events", "attribute": "attributes"}
    def plain(l):
        # the counter's lines in a visitor's words: no git ref names, no JSON
        m = re.match(r"^(v11\.1\.0|HEAD|[0-9a-f]{7,40}): (\d+) names\s+(\{.*\})$", l)
        if m:
            who = "11.1.0" if m.group(1) != "HEAD" else "this build"
            parts = ", ".join(f"{n} {KIND.get(k, k) if n != 1 else KIND.get(k, k).rstrip('s').replace('exposed method', 'exposed method')}" for k, n in _j.loads(m.group(3)).items())
            return f"{who}: {m.group(2)} names ({parts})"
        m = re.match(r"^(?:HEAD|[0-9a-f]{7,40}) against v11\.1\.0: \+(\d+) -(\d+) net -(\d+)$", l)
        if m: return f"this build against 11.1.0: {m.group(1)} added, {m.group(2)} deleted, {m.group(3)} fewer in all"
        m = re.match(r"^\s+([+-]) (\w+) (.*)$", l)
        if m: return f"   {'added  ' if m.group(1) == '+' else 'deleted'}  {m.group(2)}  {m.group(3)}"
        return l
    txt = [plain(l) for l in open(names).read().strip().split("\n")]
    head = ["Delete what no site uses, now (question 12): the names a site can use on the dock,", f"counted on build {sha} against 11.1.0. Fewer than 80 is the bound.", ""]
    lines = head + txt
    Wd = 1100; Ht = 30 + 17 * len(lines)
    c = Image.new("RGB", (Wd, Ht), "white"); dr = ImageDraw.Draw(c)
    mono = ImageFont.truetype("/System/Library/Fonts/SFNSMono.ttf", 12)
    for j, l in enumerate(lines): dr.text((10, 10 + j * 17), l[:150], fill="black", font=f15 if j < 2 else mono)
    dest = f"{out}/strip-q12-names-9m.png"; c.save(dest, optimize=True); print("wrote", dest, c.size)
open(os.path.join(sys.argv[3], "m9m-strip-frames.txt"), "w").write("\n".join(sorted(os.path.relpath(u, sys.argv[3]) for u in USED)) + "\n")
print("frames drawn:", len(USED))
print("refused by the scheme and posture checks:", len(refused)); [print("  ", r) for r in refused]
