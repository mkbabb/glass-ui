# lanetrace.py <worktree> [--units]: the per-frame lane trace, for diagnosis builds only (never landed). Patches the worktree copy of
# useDockBody.ts (the rAF timestamp and dt of every body frame, on window.__dockNow / __dockDt) and useDockScene.ts: when
# window.__laneTrace exists, every write() appends the frame's every lane (value = remaining distance to its target, moving,
# landed, velocity): the plate's edges l/t/r/b/radius, the expanded-ness e, each mover's lx and ly (label, depth, hold, ghost),
# each exchange's progress lane; the plate rect the scene writes; and the units' painted spans and clip/mask writes (vis,
# opacity is the page's). check() and setWindow() append a mark with the frame they ran in.
import sys, os
wt = sys.argv[1]; UNITS = '--units' in sys.argv
B = os.path.join(wt, "src/components/dock/composables/useDockBody.ts")
S = os.path.join(wt, "src/components/dock/composables/useDockScene.ts")
b = open(B).read()
a = "        frames++;\n        lastDt = dt;\n"
assert a in b, "body anchor"
b = b.replace(a, a + "        { const W = window as any; W.__dockNow = now; W.__dockDt = dt; W.__dockFrames = frames; }\n")
open(B, "w").write(b)
s = open(S).read()
a = "        land();\n    }\n\n    /** The episode, and with it the window, ends on the frame every lane"
assert a in s, "write anchor"
t = '''        { const T = (window as any).__laneTrace; if (T) { const W = window as any; const R = (v: number) => +v.toFixed(3);
            const ln = (l: DockLane) => [R(l.value), l.moving ? 1 : 0, (l as any).landed ? 1 : 0, R(l.velocity)];
            const lb = (m: Mover) => (m.el.getAttribute("data-dock-ghost") !== null ? "~" : "") + ((m.el.textContent || "").trim().slice(0, 10) || m.el.className.toString().split(" ")[0]);
            T.push({ k: "w", ts: W.__dockNow, dt: W.__dockDt, n: W.__dockFrames, frame, pn: +performance.now().toFixed(2), Pr: [R(Pr.l), R(Pr.t), R(Pr.r), R(Pr.b)],
                edge: { l: ln(edge.l), t: ln(edge.t), r: ln(edge.r), b: ln(edge.b), rad: ln(edge.radius) }, e: ln(e),
                mv: [...movers.values()].filter((m) => m.lx.moving || m.ly.moving || Math.abs(m.lx.value) > 0.01 || Math.abs(m.ly.value) > 0.01 || m.hold || m.exit || m.enter || m.joined).map((m) => ({ l: lb(m), d: depth(m), x: ln(m.lx), y: ln(m.ly), h: m.hold ? 1 : 0, g: m.ghost ? 1 : 0, ex: m.exit ? 1 : 0, en: m.enter ? 1 : 0, j: m.joined ? 1 : 0, vis: m.vis ? [R(m.vis[0]), R(m.vis[1])] : null, clip: m.clip, mask: m.mask ? m.mask.length : 0 UNITSX })),
                ex: [...exchanges.values()].map((x) => ln(x.lane)), any: anyMoving() ? 1 : 0, win: morphing ? 1 : 0 }); } }
'''
t = t.replace(' UNITSX', ', bx: (() => { const q = painted(m); return [R(vert ? q.y : q.x), R(vert ? m.size.y : m.size.x)]; })(), mk: m.mask, rv: m.reveal ? [R(m.reveal.s), R(m.reveal.e), R(m.reveal.ds), R(m.reveal.de)] : null, gf: gift.get(m) ?? null, own: m.own, xp: m.exit ? { s0: R(m.exit.s0), e0: R(m.exit.e0), r: R(m.exit.r), d: R(m.exit.d), heir: !!m.exit.heir, path: m.exit.path ?? null } : null' if UNITS else '')
s = s.replace(a, t + a)
a = "    function setWindow(open: boolean): void {\n"
assert a in s, "setWindow anchor"
s = s.replace(a, a + "        { const T = (window as any).__laneTrace; if (T) { const W = window as any; T.push({ k: \"win\", open, ts: W.__dockNow, n: W.__dockFrames, pn: +performance.now().toFixed(2) }); } }\n")
a = "    function check(): void {\n"
assert a in s, "check anchor"
s = s.replace(a, a + "        { const T = (window as any).__laneTrace; if (T) { const W = window as any; T.push({ k: \"check\", ts: W.__dockNow, n: W.__dockFrames, pn: +performance.now().toFixed(2) }); } }\n")
open(S, "w").write(s)
print("lanetrace: patched", B, S)
