#!/usr/bin/env python3
# C-A9 plants (D5 pass 9, the fresh critic). Each takes the candidate (HEAD + pass-9/P-E9.patch) back to one defect a CK
# row's pass rule names. `python3 -I plants.py <name> apply|revert <worktree>`; apply keeps a byte copy under
# <wt>/.ca9plant/<name>/ and revert restores it (the caller checks the tree hash).
#   noread    CK-20 stale place: the per-frame re-observe skipped (hear() visits no holder)          -> E-10 stale-place cells
#   ancscale  CK-25 loupe place: the lens's painted scale stops at the host (its ancestors' scale dropped) -> E-13 place·scale
#   nobelow   CK-25 loupe viewport: the lens never hangs below its track                          -> E-13 viewport
#   loop      O-103f (3): the frame loop not stopped at release (kept to the exit clock's end)     -> the loop-at-release cells
#   glidepx   CK-20 glide under scale: the glide's offset converted to painted px before it is drawn -> E-10 glidescale·scale
#   crest     CK-12: the pass-6 crest literals (1.02 wide, 1.05 bit) in place of the register's rows -> ca8-probe crest
#   prmY      CK-10: the one reduce mechanism's transition clock removed                          -> E-9 / ca6 prm plant cells
import sys, os, shutil
name, op, wt = sys.argv[1], sys.argv[2], sys.argv[3]
ST = "src/composables/motion/engage/stage.ts"
P = {
  "noread": (ST, [("    for (const h of holders.values()) {\n        if (!h.engaged) continue;\n        sizes?.unobserve(h.host);",
                   "    for (const h of holders.values()) {\n        if (h) continue; // PLANT noread\n        sizes?.unobserve(h.host);")]),
  "ancscale": (ST, [("        if (e.matches(\":popover-open, :modal\")) break;\n",
                     "        if (e.matches(\":popover-open, :modal\")) break;\n        if (e.hasAttribute(\"data-engage-stage\")) break; // PLANT ancscale\n")]),
  "nobelow": (ST, [("    const below = t.top - lens.offsetHeight * s.y < 0;\n",
                    "    const below = false && t.top - lens.offsetHeight * s.y < 0; // PLANT nobelow\n")]),
  "loop": (ST, [("    if (![...holders.values()].some((x) => x.engaged)) stopFrames();\n", "    // PLANT loop: the loop is not stopped at release\n")]),
  "glidepx": (ST, [("    if (Math.hypot(dx, dy) < 0.5 || reducedMotion()) return;\n",
                    "    { const k = paintedScale(host.parentElement as HTMLElement); dx *= k.x; dy *= k.y; } // PLANT glidepx\n    if (Math.hypot(dx, dy) < 0.5 || reducedMotion()) return;\n")]),
  "crest": ("src/styles/utilities/engage.css", [
      ("    :where(.engage-pressed, .engage-chosen.control-bit) {\n        --rung-crest: var(--scale-engage);", "    :where(.engage-chosen.control-bit) {\n        --rung-crest: 1.05;"),
      ("        --rung-crest: var(--scale-commit-pop);\n", "        --rung-crest: 1.02;\n")]),
  "prmY": ("src/styles/utilities/a11y-overrides.css", [
      ("            animation-iteration-count: 1 !important;\n            transition-duration: 0s !important;\n", "            animation-iteration-count: 1 !important;\n")]),
}
f, subs = P[name]; src = os.path.join(wt, f); bak = os.path.join(wt, ".ca9plant", name, f)
if op == "apply":
    os.makedirs(os.path.dirname(bak), exist_ok=True); shutil.copy2(src, bak)
    s = open(src).read()
    for a, b in subs:
        assert s.count(a) == 1, f"{name}: anchor not unique/absent: {a[:70]!r}"
        s = s.replace(a, b)
    open(src, "w").write(s); print(f"applied {name} on {f}")
else:
    shutil.copy2(bak, src); shutil.rmtree(os.path.join(wt, ".ca9plant", name)); print(f"reverted {name} on {f}")
