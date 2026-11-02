#!/usr/bin/env python3
# C-A11's library plants, each one edit to the candidate (HEAD + P-E11.patch). `ca11-plants.py <worktree> <plant>`:
#   listcure    CONTROL: glide asks the engine itself whether it will take the easing (a KeyframeEffect built in a try), not CSS.supports,
#               which accepts a list ("ease, linear") that animate() refuses. Proves the cause of CK-21's list counterexample, not bytes
#   flowone     the host's re-render glide sums offsets with no zoom ratio (flowBox z = 1): the layout read out of the frame
#   roomnoframe --stage-room written in painted px (frameOf(host) taken as 1): the reach out of the frame
#   glideframe  CONTROL: flowBox brings each offset into the host's px through its box's whole frame (frameOf(e) over frameOf(host)),
#               not the zoom ratio alone: proves the cause of the hostglide counterexample under an ancestor scale, not bytes
import sys
W, which = sys.argv[1], sys.argv[2]
ST = f"{W}/src/composables/motion/engage/stage.ts"
E = {
  "listcure": [('    const parsed = easing !== "" && CSS.supports("animation-timing-function", easing);\n',
                '    const parsed = easing !== "" && (() => { try { new KeyframeEffect(null, null, { easing }); return true; } catch { return false; } })();\n')],
  "flowone": [("        const z = e.currentCSSZoom / el.currentCSSZoom;\n", "        const z = 1;\n")],
  "glideframe": [("        const z = e.currentCSSZoom / el.currentCSSZoom;\n", "        const z = frameOf(e).y / frameOf(el).y;\n")],
  "roomnoframe": [("    const f = frameOf(host).x;\n", "    const f = 1;\n")],
}
s = open(ST).read()
for a, b in E[which]:
    assert s.count(a) == 1, (which, a)
    s = s.replace(a, b)
open(ST, "w").write(s); print("plant", which)
