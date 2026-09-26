import sys, pathlib
W = pathlib.Path(sys.argv[2]); name = sys.argv[1]
C = W / "src/components/dock/composables"
def edit(rel, a, b, count=1):
    p = W / rel if not str(rel).startswith("/") else pathlib.Path(rel)
    s = p.read_text()
    assert s.count(a) == count, (name, rel, a[:80], s.count(a))
    p.write_text(s.replace(a, b))
SC = "src/components/dock/composables/useDockScene.ts"
BD = "src/components/dock/composables/useDockBody.ts"
if name == "bp-nocell":
    edit(SC, "            m.hold = null;\n            const pp = parentPainted(m);", "            m.hold = null;\n            if (m.parent && m.parent.parent) { m.lx.seat(0); m.ly.seat(0); continue; }\n            const pp = parentPainted(m);")
elif name == "bp-overlap":
    edit(SC, "if (face === currentLayer.value) return clamp01((f.value - CROSS_SPLIT) / (1 - CROSS_SPLIT));", "if (face === currentLayer.value) return clamp01(f.value);")
    edit(SC, "if (face === leavingLayer.value) return clamp01(1 - f.value / CROSS_SPLIT);", "if (face === leavingLayer.value) return clamp01(1 - f.value);")
elif name == "bp-wall":
    for e in "lrtb":
        edit(SC, f"edge.{e}.from(n{e}, edge.{e}.velocity, 0);", f"edge.{e}.from(n{e}, 0, 0);")
    edit(SC, "m.lx.from(ox, was.v.x - pv.x, 0);\n            m.ly.from(oy, was.v.y - pv.y, 0);", "m.lx.from(ox, 0, 0);\n            m.ly.from(oy, 0, 0);")
elif name == "bp-norest":
    edit(BD, "        if (live) raf = requestAnimationFrame(step);", "        void live;\n        raf = requestAnimationFrame(step);")
elif name == "bp-resizemorph":
    edit(SC, "    function onViewportResize(): void {\n        viewportChanged = true;\n    }", "    function onViewportResize(): void {}")
elif name == "bp-nomo-track":
    edit(SC, "        mo = new MutationObserver(check);\n        mo.observe(r, { childList: true, characterData: true, subtree: true });\n", "")
elif name == "bp-ring":
    edit(SC, 'const spatial = (): DockLane => body.lane({ kind: "spatial", eps: LAND_PX });', 'const spatial = (): DockLane => body.lane({ kind: "spatial", eps: LAND_PX, dampingFraction: 0.6 });')
elif name == "bp-q5b":
    edit(SC, "const edge = { l: spatial(), t: spatial(), r: spatial(), b: spatial(), radius: spatial() };", 'const bounce = (): DockLane => body.lane({ kind: "spatial", eps: LAND_PX, dampingFraction: 0.72 });\n    const edge = { l: bounce(), t: bounce(), r: bounce(), b: bounce(), radius: bounce() };')
elif name == "bp-pop":
    edit("src/components/dock/styles/scroll-rungs.css", ":not([data-dock-leaving])", "", count=None) if False else None
    p = W / "src/components/dock/styles/scroll-rungs.css"; s = p.read_text(); n = s.count(":not([data-dock-leaving])"); assert n >= 1; p.write_text(s.replace(":not([data-dock-leaving])", ""))
elif name == "bp-rect":
    edit(SC, """function posIn(el: HTMLElement, frame: HTMLElement): V | null {
    let x = 0;""", """function posIn(el: HTMLElement, frame: HTMLElement): V | null {
    if (frame.contains(el) || el === frame) { const a = el.getBoundingClientRect(), b = frame.getBoundingClientRect(); return { x: a.left - b.left - frame.clientLeft, y: a.top - b.top - frame.clientTop }; }
    let x = 0;""")
else:
    raise SystemExit("unknown " + name)
print("applied", name)
