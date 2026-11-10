# P-E15 part B plants: one edit set each to cand15 (base + pass-15/P-E15.patch) in the seat's worktree. Each steps ONE rule of S15 back
# (P-E15 §S15-a..§S15-i as folded; the plant names are S15's), or ports one of P-E14's plants (plants14.py) to cand15's bytes, so the
# cells H15 names for it must read red. usage: python3 -I plants15.py <worktree> <plant>   (the caller restores the sources and reads the
# src tree back after the build)
# S15's plants (H15 §1, §S15-FOLD2):
#   paintabove  rule 1 stepped back: a level at or above a transformed link goes to paint (cand14's route)        -> E-15 M28 of/above
#   glideonce   rule 4 stepped back: a glide answering a level at or above a transformed link is written once      -> E-15 F5
#   flat3d      rule 2 (iv) stepped back: a level inside a 3D rendering context is measured on the chain            -> E-15 F3
#   zoomchain   rule 2 (v) stepped back: a zoomed level, and a zoom change, are measured by root-px Q on the chain  -> E-15 M22 (X8 in WebKit; host zoom)
#   pointcentre F-8 stepped back: the paint route's step is the centre's                                           -> E-15 M22 (B3, F-8's cells)
#   lateread    class 7's construction stepped back: K read in the rAF callback, before the frame's layout          -> E-14 M9, E-15 M9
#   hostgutter  S15-e as written (withdrawn): the gutter read on the held control's ::before                        -> E-15 D8 rows 1-2
#   noflat      A1's flat-tree walk removed                                                                        -> E-15 A1 open cells
#   nodetect    A1's detector removed (at the hold and after it)                                                   -> E-15 A1 closed cells
#   inlinepct   rule 3 stepped back to cand14's percentage test (the computed translate or the inline transform)    -> E-15 A2
#   leastmoved  A3's alignment table removed: S14 b.5's least-moved point of the frame                             -> E-15 A3 insert rows
#   insetlevel  A12 stepped back: a relative inset change is a level change                                        -> E-15 A12
#   dockexit    F-11 stepped back: the exit bound without the grow's exit clock                                    -> E-15 EXIT 0.08 s
# P-E14's plants, ported (their rules stand in S15):
#   chordstep rawsum nosticky norange velnone velreset noimportant subtreewait level reachzero inlineread hostseat
import pathlib, sys
wt, plant = pathlib.Path(sys.argv[1]), sys.argv[2]
E = wt / "src/composables/motion/engage"; S = E / "stage.ts"; T = E / "settle.ts"; C = wt / "src/styles/utilities/engage.css"
ZOOMROUTE = "                if (k.zp[i] !== 1 || zoomed[i]) return true; // (v) a zoomed level, or a zoom change\n"
EDITS = {
    "paintabove": [(S, ZOOMROUTE, "                if (cv.slice(1, i + 1).some((c) => c?.tf)) return true;\n" + ZOOMROUTE)],
    "glideonce": [(S, "                if (follow) h.follow.add({ a, i: follow.i, w: follow.w, t });\n", "                void follow;\n")],
    "flat3d": [(S, "                    if (c?.ctx3d) return true; // (iv) a 3D rendering context at or above the level\n", ""),
               (S, "cv.every((c, i) => !c || (!c.ctx3d && (i === 0 || (!c.proj && !c.path))))", "cv.every((c, i) => !c || i === 0 || (!c.proj && !c.path))")],
    "zoomchain": [(S, ZOOMROUTE, ""),
                  (S, "                scrolled ||\n                zoomed.some(Boolean) ||\n", "                scrolled ||\n")],
    "pointcentre": [(S, "        s = add(dc, sub(o(pk, ref), o(k, ref)));", "        s = dc;\n        void ref;")],
    "lateread": [(S, "    if (!sizes) sizes = new ResizeObserver(step);", "    if (!sizes) sizes = new ResizeObserver(() => {});"),
                 (S, "        if (h.engaged) sizes?.observe(h.host);\n    }\n    frame = requestAnimationFrame(tick);", "        if (h.engaged) sizes?.observe(h.host);\n    }\n    step();\n    frame = requestAnimationFrame(tick);")],
    "hostgutter": [(S, "    h.gutter = readOf(document.documentElement, \"--stage-read-gutter\", \"px\", {", "    h.gutter = readOf(h.host, \"--stage-read-gutter\", \"px\", {"),
                   (C, "    :root::before {\n        --stage-read-gutter", "    .engage-held::before {\n        --stage-read-gutter")],
    "noflat": [(S, "    h.walk = { sc, st, unseen: flatUnseen(k.links), ref: alignOf(h.host) };", "    h.walk = { sc, st, unseen: Number.POSITIVE_INFINITY, ref: alignOf(h.host) };")],
    "nodetect": [(S, "    if (h.walk.unseen === Number.POSITIVE_INFINITY && unseenByMap(h, k)) h.walk.unseen = 0;\n", ""),
                 (S, "            if (walk.unseen === Number.POSITIVE_INFINITY && h.affine && !h.blocked", "            if (walk.unseen < 0 && h.affine && !h.blocked")],
    "inlinepct": [(S, "            p = shareOf(e, c, RS);", "            p = /%/.test(c.translate) || /%/.test(e.style.transform) ? null : [0, 0];")],
    "leastmoved": [(S, "    h.walk = { sc, st, unseen: flatUnseen(k.links), ref: alignOf(h.host) };", "    h.walk = { sc, st, unseen: flatUnseen(k.links), ref: [null, null] };")],
    "insetlevel": [(S, "            if (i > 0 && a && b) {", "            if (i < 0 && a && b) {")],
    "dockexit": [(S, "    const ms = Math.max(Number.isFinite(dock) ? dock : 0, Number.isFinite(exit) ? exit : 0, late);", "    const ms = Math.max(Number.isFinite(dock) ? dock : 0, late);\n    void exit;")],
    # P-E14's plants on cand15's bytes
    "chordstep": [(S, "    for (let i = 0; i < NEWTON; i++) {\n        const m = i === 0 ? m0 : mapAt(el, t, sc);", "    for (let i = 0; i < 2; i++) {\n        const m = i === 0 ? m0 : { ...m0, p0: probe(el, t, sc) };")],
    "rawsum": [(S, "        const edge = !!p && p !== document.body;", "        const edge = false;")],
    "nosticky": [(S, "            if (si < 0 || !dS[si]) return;", "            return;")],
    "norange": [(S, "    const engineScroll = dS.some((d, i) => nz(d) && ranged(i));",
                    "    const engineScroll = dS.some((d, i) => nz(d) && sameLinks && k.R[i]![1] < pk.R[i]![1] && k.S[i]![1] >= k.R[i]![1] - 1);")],
    "velnone": [(S, "        const d: Pt = sub(u, h.v);", "        const d: Pt = u;")],
    "velreset": [(S, "    } else if ((!kind || still) && hyp(h.v) > CHAIN_PX) h.v = [0, 0];", "    } else if (!kind || still) h.v = [0, 0];"),
                 (S, "    const still = kind === \"paint\" ? hyp(s) <= GLIDE_FLOOR : hyp(u) <= CHAIN_PX;", "    const still = kind === \"paint\" ? hyp(s) <= GLIDE_FLOOR : hyp(u) <= GLIDE_FLOOR;"),
                 (S, "        const past = kind === \"paint\" ? hyp(fwd(paintJ!, d)) > GLIDE_FLOOR : hyp(d) > CHAIN_PX;", "        const past = kind === \"paint\" ? hyp(fwd(paintJ!, d)) > GLIDE_FLOOR : hyp(d) > GLIDE_FLOOR;")],
    "noimportant": [(S, "    h.blocked = owned(h.host);", "    h.blocked = false;")],
    "subtreewait": [(S, "    let late = 0;\n    for (const a of h.glides) {",
                        "    let late = 0;\n    for (const a of h.host.getAnimations({ subtree: true })) {\n        const end = a.effect?.getComputedTiming().endTime;\n        const at = typeof a.currentTime === \"number\" ? a.currentTime : 0;\n        if (!h.glides.has(a) && typeof end === \"number\" && Number.isFinite(end) && a.playState !== \"finished\") late = Math.max(late, end - at);\n    }\n    for (const a of h.glides) {")],
    "level": [(S, "    return { p0, a: (px[0] - p0[0]) / PROBE_PX, b: (py[0] - p0[0]) / PROBE_PX, c: (px[1] - p0[1]) / PROBE_PX, d: (py[1] - p0[1]) / PROBE_PX };",
                  "    const a = (px[0] - p0[0]) / PROBE_PX, b = (py[0] - p0[0]) / PROBE_PX, c = (px[1] - p0[1]) / PROBE_PX, d = (py[1] - p0[1]) / PROBE_PX;\n    return { p0, a: Math.hypot(a, c), b: 0, c: 0, d: Math.hypot(b, d) };"),
              (S, "const NEWTON = 4;", "const NEWTON = 1;")],
    "reachzero": [(S, "    let reach = \"1\";", "    let reach = \"0\";")],
    "inlineread": [(T, "    const text = getComputedStyle(el, pseudo).getPropertyValue(name).trim();",
                       "    if (el instanceof HTMLElement) {\n        el.style.setProperty(\"--stage-plant\", \"1\");\n        el.style.removeProperty(\"--stage-plant\");\n    }\n    const text = getComputedStyle(el, pseudo).getPropertyValue(name).trim();")],
    "hostseat": [(T, "pseudo = \"::before\",", "pseudo = null,"),
                 (C, "    .engage-held::before {", "    .engage-held {"),
                 (C, "    :where(.engage-chosen, .engage-pressed, .engage-disclosed)::before {", "    :where(.engage-chosen, .engage-pressed, .engage-disclosed) {"),
                 (C, "    :where(.engage-pressed, .engage-chosen, .engage-disclosed, .engage-held, .engage-dragged)::before {", "    :where(.engage-pressed, .engage-chosen, .engage-disclosed, .engage-held, .engage-dragged) {"),
                 (C, "    :root::before {\n        --stage-read-gutter", "    :root {\n        --stage-read-gutter")],
}
for f, old, new in EDITS[plant]:
    s = f.read_text()
    assert s.count(old) == 1, f"{plant}: {f.name}: the text is not there exactly once: {old[:60]!r}"
    f.write_text(s.replace(old, new))
print(f"plant {plant}: {len(EDITS[plant])} edit(s)")
