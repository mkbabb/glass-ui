# checktrace.py <worktree>: applied after lanetrace.py on a diagnosis build only (never landed). Every check() appends, under
# window.__laneTrace: per mover taken, its model position before and after (`pos`), the whole-px offset sum it was refined from
# (`at`), the painted-against-frame fraction fine() read (`fx`, accepted only within OFFSET_ROUNDING_PX), the two rects' left
# edges and the translate the scene had written, whether it matches :hover, its computed scale / transform / translate, its own
# offsetLeft and painted width; then reach, whether an episode or the window was open, and every lane that the
# re-expression left away from 0.
import sys, os
S = os.path.join(sys.argv[1], "src/components/dock/composables/useDockScene.ts")
s = open(S).read()
A = ["            const m = mover(el, parent);\n            m.pos = fine(el, frame, at, edge);\n", "            const m = mover(el, parent);\n            const s = sizeOf(el);\n            m.pos = fine(el, frame, at, s, edge);\n"]
a = [x for x in A if x in s]
assert a, "take anchor"
a = a[0]
b = a.replace("            m.pos = fine(", "            const __was = { x: m.pos.x, y: m.pos.y };\n            m.pos = fine(") + """            { const T = (window as any).__laneTrace; if (T) { const q = rectOf(el), f0 = rectOf(frame); const w = movers.get(el)?.wrote; const fx = (q.left - f0.left) / sx - (w?.x ?? 0) - (edge ? frame.clientLeft : 0) - at.x; (T.__take ??= []).push([((el.textContent || "").trim().slice(0, 10) || el.className.toString().split(" ")[0]), +__was.x.toFixed(3), +m.pos.x.toFixed(3), at.x, +fx.toFixed(3), +q.left.toFixed(3), +f0.left.toFixed(3), w ? +w.x.toFixed(3) : null, el.matches(":hover") ? 1 : 0, (() => { const c = getComputedStyle(el); return [c.scale, c.transform === "none" ? "none" : c.transform.slice(0, 40), c.translate]; })(), el.offsetLeft, +q.width.toFixed(3)]); } }
"""
s = s.replace(a, b)
a = "        arm(vert);\n\n        if (reach <= LAND_PX && !exchanging() && !episode) {"
assert a in s, "arm anchor"
b = """        { const T = (window as any).__laneTrace; if (T) { const W = window as any; T.push({ k: "chk", n: W.__dockFrames, pn: +performance.now().toFixed(2), reach: +reach.toFixed(3), episode, morphing, d, rootLeft: +rect.left.toFixed(3), take: T.__take ?? [], lanes: [...movers.values()].filter((m) => Math.abs(m.lx.value) > 0.05 || Math.abs(m.ly.value) > 0.05).map((m) => [((m.el.textContent || "").trim().slice(0, 10) || m.el.className.toString().split(" ")[0]), depth(m), +m.lx.value.toFixed(3), +m.ly.value.toFixed(3), m.lx.moving ? 1 : 0]), edges: [edge.l.value, edge.r.value].map((v) => +v.toFixed(3)) }); T.__take = []; } }
"""
s = s.replace(a, b + a)
open(S, "w").write(s)
print("checktrace: patched", S)
