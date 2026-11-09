# edgetrace.py <worktree>: run AFTER the pass-12 builder's lanetrace.py --units (diagnosis builds only, never landed).
# Widens the trace's mover filter so every mover the scene wrote a clip or a mask on is recorded on every write (lanetrace
# records only movers that move, hold, leave, arrive or joined), and adds each mover's model layout place (pos, size) and
# the plate radius the write used. No DOM read is added to the scene's write: the paint is read by the probe's own rAF.
import sys, os
S = os.path.join(sys.argv[1], "src/components/dock/composables/useDockScene.ts")
s = open(S).read()
a = "m.hold || m.exit || m.enter || m.joined)"
assert s.count(a) == 1, "filter anchor"
s = s.replace(a, "m.hold || m.exit || m.enter || m.joined || m.clip || m.mask)")
a = "mk: m.mask,"
assert s.count(a) == 1, "units anchor"
s = s.replace(a, "mk: m.mask, ps: [R(m.pos.x), R(m.pos.y), R(m.size.x), R(m.size.y)], sm: R(m.seam), un: isUnit(m, parents) ? 1 : 0,")
a = "ex: [...exchanges.values()].map((x) => ln(x.lane)),"
assert s.count(a) == 1, "ex anchor"
s = s.replace(a, "ex: [...exchanges.values()].map((x) => ln(x.lane)), rad: R(radius),")
open(S, "w").write(s)
print("edgetrace: patched", S)
