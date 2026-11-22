# s4spec.py <tree-or-worktree> <light-hover> <light-current>: RU-92 as amended for C8-M16 on S4's steps: release-11-0-2's
# light-fill test (:667-700) compares the hovered seat's and the selected tab's computed fills with the dock's ink mixed
# in the test at the ruled light steps, which S4 sets.
import sys, re
W, LH, LC = sys.argv[1], sys.argv[2], sys.argv[3]
p = W + "/tests-visual/release-11-0-2.spec.ts"
s = open(p).read()
old1 = "// selected tab's at the current step, each mixed here from the literal ink (5 % and 10 % in\n// light, RU-94 as folded). Any drift from the ruled steps fails it, the force it had."
new1 = f"// selected tab's at the current step, each mixed here from the literal ink ({LH} % and {LC} % in\n// light, S4's steps by RU-94 as folded). Any drift from the ruled steps fails it, the force it had."
assert s.count(old1) == 1; s = s.replace(old1, new1)
s, n = re.subn(r"const LIGHT_HOVER_STEP = [\d.]+;", f"const LIGHT_HOVER_STEP = {LH};", s); assert n == 1
s, n = re.subn(r"const LIGHT_CURRENT_STEP = [\d.]+;", f"const LIGHT_CURRENT_STEP = {LC};", s); assert n == 1
open(p, "w").write(s)
print("spec steps", LH, LC)
