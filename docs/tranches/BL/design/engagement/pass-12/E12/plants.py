# P-E12 plants: one edit each to the candidate (HEAD + P-E12.patch), each the shape a must-prove item forbids.
#   python3 -I plants.py <worktree> <plant>
#   noframe    the re-render glide writes the painted move as the host's px (no frame): every scale and zoom hostglide cell lands off
#   framethen  (first form, two edits: offsets × their own box's frame at the read) does not separate: it reads 26/26 on hostglide,
#              logs/plant-framethen-E-10-chromium-23cd0b.log. Kept as a recorded non-plant.
#   glideframe C-A11's glideframe shape on these bytes (three edits): each offset read in the host's px through the frames at the read
#              (offset × frameOf(box) / frameOf(host)), summed raw and glided raw: an ancestor's running scale changes the card's term
#              every frame, so an unrelated mutation glides it (hostglide · animating)
#   listcheck  the easing checked with CSS.supports on animation-timing-function (a list-valued property): a list throws in animate()
#   unitread   the one token read takes parseFloat, x1000 for a time, whatever the unit: 210ms is read as 210 000 ms, silently
#   roomframe  the reach's room left in painted px, not over the host's frame: the reach under a scale or zoom is not the gutter's
#   nopivot    the re-render glide reads offsets only, no scaled box's origin: a card resized below the host about its centre jumps
import sys
wt, plant = sys.argv[1], sys.argv[2]
ST = "src/composables/motion/engage/stage.ts"; SE = "src/composables/motion/engage/settle.ts"
EDITS = {
    "noframe": [(ST, "glide(h.host, d.x / f.x, d.y / f.y);", "glide(h.host, d.x, d.y);")],
    "framethen": [(ST, "c.push({ e, x: e.offsetLeft, y: e.offsetTop });", "c.push({ e, x: e.offsetLeft * frameOf(e).x, y: e.offsetTop * frameOf(e).y });"),
                  (ST, "            const f = frameOf(o.e);\n            x += k * o.x * f.x;", "            const f = { x: 1, y: 1 };\n            x += k * o.x * f.x;")],
    "glideframe": [(ST, "    for (let e: HTMLElement | null = el; e; e = e.offsetParent as HTMLElement | null) c.push({ e, x: e.offsetLeft, y: e.offsetTop });",
                    "    for (let e: HTMLElement | null = el; e; e = e.offsetParent as HTMLElement | null) c.push({ e, x: (e.offsetLeft * frameOf(e).x) / frameOf(el).x, y: (e.offsetTop * frameOf(e).y) / frameOf(el).y });"),
                   (ST, "            const f = frameOf(o.e);\n            x += k * o.x * f.x;", "            const f = { x: 1, y: 1 };\n            x += k * o.x * f.x;"),
                   (ST, "glide(h.host, d.x / f.x, d.y / f.y);", "glide(h.host, d.x, d.y);")],
    "listcheck": [(SE, "void new KeyframeEffect(null, null, { easing });", 'if (!CSS.supports("animation-timing-function", easing)) throw new TypeError(easing);')],
    "unitread": [(SE, "v = CSSNumericValue.parse(text).to(unit).value;", 'v = Number.parseFloat(text) * (unit === "ms" ? 1000 : 1);')],
    "nopivot": [(ST, "    for (const q of a.pivots) {", "    for (const q of a.pivots.slice(a.pivots.length)) {")],
    "roomframe": [(ST, "vw - (cx + (w * f.x) / 2))) / f.x;", "vw - (cx + (w * f.x) / 2)));")],
}
for f, old, new in EDITS[plant]:
    p = f"{wt}/{f}"; s = open(p).read()
    assert s.count(old) == 1, (plant, s.count(old))
    open(p, "w").write(s.replace(old, new)); print(f"plant {plant}: {f}")
