#!/usr/bin/env python3
# C-A11 library plants (D5 pass 11, a fresh critic of HEAD + pass-11/P-E11.patch). Each is one edit to the candidate, to
# prove a cause or to give a cell the plant that must fail it; none proposes bytes. `ca11-plants.py <worktree> <plant>`.
# P-E10's plants that P-E11 did not rebuild (P-E11 §8 item 4), re-expressed on P-E11's line text:
#   owed nohyst fixed zero reducetravel exitfrozen noread nolens
# C-A11's own:
#   hostthrow   the host's re-render glide alone skips the parse check (an `animate()` on any non-empty easing): the
#               rerender cell must separate the host path from the lens path (CK-21, E-11 `travel loud · … · rerender`)
#   roomnozoom  `--stage-room` written in painted px (writeGeometry's frame set to 1): P-E10's shape for the reach
#   listcure    a control, not a cure of record: the travel's easing parsed by the engine's own easing grammar (a
#               KeyframeEffect built in a try), so an easing list that `CSS.supports("animation-timing-function", …)`
#               accepts is refused by name rather than thrown
#   settlecure  a control: `--spring-<row>-settle` read as a <time> (ms or s, by its unit), not parseFloat(seconds)
import sys
W, which = sys.argv[1], sys.argv[2]
ST = f"{W}/src/composables/motion/engage/stage.ts"; CSS = f"{W}/src/components/slider/styles.css"; SE = f"{W}/src/composables/motion/engage/settle.ts"
GAP = ("    position: fixed;\n    inset: auto;\n    margin: 0;\n", "    position: fixed;\n    inset: auto;\n    margin: 40px 0;\n")
BAND = "    const below = L.below ? room <= HOLD_SLOP_PX : room < 0;\n"
HOSTGLIDE = "        glide(h.host, was.x - h.at.x, was.y - h.at.y);\n"
E = {
  "owed": [(ST, "    let owed = L.span * f.y * (1 - (L.travel?.effect?.getComputedTiming().progress ?? 1));\n", "    let owed = 0;\n")],
  "nohyst": [(ST, BAND, "    const below = room < 0;\n")],
  "fixed": [(ST, BAND, "    const below = L.written ? L.below : room < 0;\n")],
  "zero": [(ST, "    const dy = (below ? t.bottom - r.top : t.top - r.bottom) + owed;\n", "    if (turned) { L.dx = 0; L.dy = 0; }\n    const dy = turned ? 0 : (below ? t.bottom - r.top : t.top - r.bottom) + owed;\n"),
           (ST, "    L.dx = round(L.dx + (t.left + t.width / 2 - (r.left + r.width / 2)) / f.x);\n", "    if (!turned) L.dx = round(L.dx + (t.left + t.width / 2 - (r.left + r.width / 2)) / f.x);\n"),
           (ST, "        L.span = round((painted - (r.top + r.height / 2 + dy)) / f.y);\n", "        L.span = 96;\n"),
           (CSS, *GAP)],
  "reducetravel": [(ST, "    if (Math.hypot(dx, dy) < 0.5 || reducedMotion()) return undefined;\n", "    if (Math.hypot(dx, dy) < 0.5) return undefined;\n")],
  "exitfrozen": [(ST, HOSTGLIDE + "        if (!h.engaged) placeLens(h);\n", HOSTGLIDE),
                 (ST, "        writeGeometry(h);\n        if (!h.engaged) placeLens(h);\n", "        writeGeometry(h);\n")],
  "noread": [(ST, "        sizes?.unobserve(h.host);\n        sizes?.observe(h.host);\n", "")],
  "nolens": [(ST, "function placeLens(h: Holder): void {\n", "function placeLens(h: Holder): void {\n    if (h) return;\n")],
  "hostthrow": [(ST, HOSTGLIDE,
      "        { const dx = was.x - h.at.x, dy = was.y - h.at.y; if (Math.hypot(dx, dy) >= 0.5 && !reducedMotion()) h.host.animate({ translate: [`${dx}px ${dy}px`, \"0 0\"] }, { duration: rowClockMs(\"dock\", h.host) || 210, easing: getComputedStyle(h.host).getPropertyValue(\"--spring-dock\").trim() || \"linear\", composite: \"add\" }); } // PLANT hostthrow\n")],
  "roomnozoom": [(ST, "    const f = frameOf(host).x;\n", "    const f = 1; // PLANT roomnozoom\n")],
  "listcure": [(ST, '    const parsed = easing !== "" && CSS.supports("animation-timing-function", easing);\n',
      '    let parsed = easing !== "";\n    try { if (parsed) new KeyframeEffect(null, null, { easing }); } catch { parsed = false; } // CONTROL listcure\n')],
  "settlecure": [(SE, "    const s = Number.parseFloat(getComputedStyle(el).getPropertyValue(token));\n",
      "    const raw = getComputedStyle(el).getPropertyValue(token).trim(); const s = /ms$/.test(raw) ? Number.parseFloat(raw) / 1000 : /s$/.test(raw) || /^[0-9.]+$/.test(raw) ? Number.parseFloat(raw) : NaN; // CONTROL settlecure\n")],
}
for p, old, new in E[which]:
    s = open(p).read(); assert s.count(old) == 1, (which, old[:80]); open(p, "w").write(s.replace(old, new))
print("plant", which)
