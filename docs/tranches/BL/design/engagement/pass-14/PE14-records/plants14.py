# P-E14 part B plants: one edit set each to cand14 (HEAD + P-E14.patch) in the seat's worktree, each stepping one S14 rule back to the
# construction it replaced (P-E14 §S14-b, FOLD2, H14 §2.2's fixture plants ported to the library), so its E-14 / E-11 cells must read red.
# usage: python3 -I plants14.py <worktree> <plant>   (the caller restores the sources and reads the src tree back after the build)
#   chordstep   Newton's map read once at the start, two chord steps (the chord step)                  -> E-14 M1, M2
#   rawsum      Q without the offsetParents' client edges (a link joining moves it by the border)       -> E-14 M10
#   nosticky    no sticky rule: a stuck link's offset change is layout                                 -> E-14 M23
#   norange     the pre-fold clamp rule: a scroll is the engine's only on a shrink with the offset at its end -> E-14 M24 (WebKit)
#   nozoom      a zoom change read by Q                                                                -> E-14 M22
#   velnone     every step glided, no carried velocity                                                 -> E-14 M18, M27
#   velreset    every still frame resets the velocity, the chain's step on the 0.5 px floor            -> E-14 M27
#   noimportant no check at the hold                                                                   -> E-14 M26
#   subtreewait the exit waits on every finite subtree animation (cand13's leave())                    -> E-14 M29
#   level       the map as its axis lengths, one Newton step (the pass-12 construction)                -> E-14 M3
#   reachzero   a refused reach input writes 0                                                         -> E-11 reachin
#   inlineread  a read writes and removes an inline property on the element it reads (cand13's residue)-> E-14 residue
#   hostseat    the declared reads on the host itself, not its ::before                                -> E-14 M30 (WebKit)
#   dbg         NOT A PLANT: an instrument build, cand14 with each frame's classification kept in window.__s14dbg (dbg14.mjs reads it)
import pathlib, sys
wt, plant = pathlib.Path(sys.argv[1]), sys.argv[2]
E = wt / "src/composables/motion/engage"; S = E / "stage.ts"; T = E / "settle.ts"; C = wt / "src/styles/utilities/engage.css"
EDITS = {
    "chordstep": [(S, "    let t = t0;\n    for (let i = 0; i < NEWTON; i++) {\n        const m = mapAt(el, t);",
                      "    let t = t0;\n    const m0 = mapAt(el, t0);\n    for (let i = 0; i < 2; i++) {\n        const m = i === 0 ? m0 : { ...m0, p0: probe(el, t) };")],
    "rawsum": [(S, "        const cx = !p || p === document.body ? 0 : p.clientLeft;\n        const cy = !p || p === document.body ? 0 : p.clientTop;",
                   "        const cx = 0;\n        const cy = 0;")],
    "nosticky": [(S, "            if (si < 0 || !dS[si]) return;", "            return;")],
    "norange": [(S, "    const engineScroll = dS.some((d, i) => (d[0] !== 0 || d[1] !== 0) && ranged(i));",
                    "    const engineScroll = dS.some((d, i) => (d[0] !== 0 || d[1] !== 0) && sameSc && k.R[i]![1] < pk.R[i]![1] && k.S[i]![1] >= k.R[i]![1] - 1);")],
    "nozoom": [(S, "        if (zoomed) kind = \"paint\";\n        else if (levelled || sized) {", "        if (zoomed && k.links.length < 0) kind = \"paint\";\n        else if (levelled || sized) {")],
    "velnone": [(S, "        const d: Pt = [s[0] - h.v[0], s[1] - h.v[1]];", "        const d: Pt = [s[0], s[1]];")],
    "velreset": [(S, "    } else if ((!kind || still) && hyp(h.v) > CHAIN_PX) h.v = [0, 0];", "    } else if (!kind || still) h.v = [0, 0];"),
                 (S, "                res = CHAIN_PX;", "                res = GLIDE_FLOOR;")],
    "noimportant": [(S, "    h.blocked = owned(h.host);", "    h.blocked = false;")],
    "subtreewait": [(S, "            if (now > Math.max(h.exitAt, late)) {",
                        "            const sub = h.host.getAnimations({ subtree: true }).some((a) => !h.glides.has(a) && Number.isFinite(a.effect?.getComputedTiming().endTime ?? Number.NaN) && a.playState !== \"finished\");\n            if (now > Math.max(h.exitAt, late) && !sub) {")],
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
    "dbg": [(S, "    let t: Pt | null = null;\n    let J: Map2 | null = null;",
                "    ((window as unknown as { __s14dbg?: unknown[] }).__s14dbg ??= []).push({ t: Math.round(performance.now()), kind, sameLinks, scrolled, engineScroll, dS, R: k.R, pR: pk.R, S: k.S, q: k.q, pq: pk.q, w: k.w, h: k.h, ti: k.ti, lv: k.lv, v: h.v, P, pP: prev.P, g, blocked: h.blocked, nsc: k.sc.length });\n    let t: Pt | null = null;\n    let J: Map2 | null = null;"),
            (S, "        h.v = s;\n", "        h.v = s;\n        ((window as unknown as { __s14dbg?: unknown[] }).__s14dbg ??= []).push({ solved: t, s, d, res, tIn, J: kind === \"paint\" ? J : null });\n"),
            (S, "            const a = glide(h.host, h.host, t);\n", "            const a = glide(h.host, h.host, t);\n            ((window as unknown as { __s14dbg?: unknown[] }).__s14dbg ??= []).push({ glid: !!a, gt: t, ps: a?.playState });\n")],
}
for f, old, new in EDITS[plant]:
    s = f.read_text()
    assert s.count(old) == 1, f"{plant}: {f.name}: the text is not there exactly once: {old[:60]!r}"
    f.write_text(s.replace(old, new))
print(f"plant {plant}: {len(EDITS[plant])} edit(s)")
