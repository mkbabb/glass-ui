# C-E12 plants (D5 pass 12, the critic's own rebuild): one shape each that a CK row's pass rule forbids, applied to the candidate
# (HEAD + pass-12/P-E12.patch) in this seat's worktree, sources restored by the caller and the src tree read back after each.
#   python3 -I ce12-plants.py <worktree> <plant>
# P-E12's must-prove plants, rebuilt here from their stated shapes (pass-12/E12/plants.py, line text checked to occur once):
#   listcheck  the easing checked with CSS.supports on a list-valued property (CK-21: a list throws in animate())
#   unitread   the token read takes parseFloat x1000 for a time (CK-21: 210ms read as 210 000 ms, silently)
#   noframe    the re-render glide writes the painted move as host px (CK-20: every scaled or zoomed hostglide cell)
#   glideframe C-A11's glideframe shape on these bytes (CK-20: an ancestor's running scale read as a move)
#   nopivot    no scaled box's origin in the place (CK-20: a card resized under the host about its centre)
#   roomframe  the reach's room left painted, not over the host's frame (CK-20 x CK-04: the reach under scale or zoom)
# The lens's plants from pass-11/E11/plants.py, re-cut to these bytes (P-E12 §9 item 3 left them for the critics):
#   nozoom     frameOf's zoom term 1 (pass-11's second edit, flowBox's ratio, no longer exists: placeOf replaced flowBox)
#   owedframe  the travel's owed remainder in the lens's own px, not painted
#   swap       the side changes with no travel
#   fast       the travel at 3x its row's clock
#   clock      the correction back inside `transform`, the anchor leaving a 40 px gap (CK-25's clocks)
#   loop       the frame read never stops at release (O-103f (3), CK-16)
import sys
wt, plant = sys.argv[1], sys.argv[2]
ST = "src/composables/motion/engage/stage.ts"; SE = "src/composables/motion/engage/settle.ts"; CSS = "src/components/slider/styles.css"
TRAVEL = "        L.travel = glide(lens, 0, L.span);\n"
EDITS = {
    "listcheck": [(SE, "void new KeyframeEffect(null, null, { easing });", 'if (!CSS.supports("animation-timing-function", easing)) throw new TypeError(easing);')],
    "unitread": [(SE, "v = CSSNumericValue.parse(text).to(unit).value;", 'v = Number.parseFloat(text) * (unit === "ms" ? 1000 : 1);')],
    "noframe": [(ST, "glide(h.host, d.x / f.x, d.y / f.y);", "glide(h.host, d.x, d.y);")],
    "glideframe": [(ST, "    for (let e: HTMLElement | null = el; e; e = e.offsetParent as HTMLElement | null) c.push({ e, x: e.offsetLeft, y: e.offsetTop });",
                    "    for (let e: HTMLElement | null = el; e; e = e.offsetParent as HTMLElement | null) c.push({ e, x: (e.offsetLeft * frameOf(e).x) / frameOf(el).x, y: (e.offsetTop * frameOf(e).y) / frameOf(el).y });"),
                   (ST, "            const f = frameOf(o.e);\n            x += k * o.x * f.x;", "            const f = { x: 1, y: 1 };\n            x += k * o.x * f.x;"),
                   (ST, "glide(h.host, d.x / f.x, d.y / f.y);", "glide(h.host, d.x, d.y);")],
    "nopivot": [(ST, "    for (const q of a.pivots) {", "    for (const q of a.pivots.slice(a.pivots.length)) {")],
    "roomframe": [(ST, "vw - (cx + (w * f.x) / 2))) / f.x;", "vw - (cx + (w * f.x) / 2)));")],
    "nozoom": [(ST, "    let x = el.currentCSSZoom;\n", "    let x = 1;\n")],
    "owedframe": [(ST, "    let owed = L.span * f.y * (1 - (", "    let owed = L.span * (1 - (")],
    "swap": [(ST, TRAVEL, "")],
    "fast": [(ST, TRAVEL, TRAVEL + "        L.travel?.updatePlaybackRate(3);\n")],
    "clock": [(CSS, "    translate: calc(-50% + var(--lens-dx, 0px)) var(--lens-dy, 0px);\n    scale: 0.13;\n    transform: scale(var(--lens-sx, 1), var(--lens-sy, 1));\n",
                    "    translate: -50% 0;\n    scale: 0.13;\n    transform: translate(var(--lens-dx, 0px), var(--lens-dy, 0px)) scale(var(--lens-sx, 1), var(--lens-sy, 1));\n"),
              (CSS, "    position: fixed;\n    inset: auto;\n    margin: 0;\n", "    position: fixed;\n    inset: auto;\n    margin: 40px 0;\n")],
    "loop": [(ST, "    if (![...holders.values()].some((x) => x.engaged)) stopFrames();\n", "")],
}
for f, old, new in EDITS[plant]:
    p = f"{wt}/{f}"; s = open(p).read()
    assert s.count(old) == 1, (plant, f, old[:80], s.count(old))
    open(p, "w").write(s.replace(old, new))
print("plant", plant)
