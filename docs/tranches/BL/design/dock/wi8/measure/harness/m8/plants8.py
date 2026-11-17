# plants8.py <name> apply|revert|list: MEASURE-8's counter-tests. m7/plants7.py's, with RULINGS-7's harness items:
#   g2-facehalf  H1, RU-70's new plant: the content window halved (RULINGS-2's 0.55 to 0.275, about 40 ms, about 0.45 a frame)
#   g4-ghost     H4, RU-81 rewritten to the fault it names: a removed seat keeps painting at its own opacity for every row of
#                its exit and is cut at the landing (the leave window not applied to a held seat); it leans on no clip
#   g1-presshold H3, RU-73: the press hold removed (a held finger no longer holds)
#   g1-frompress H3, RU-73: the linger timed from the touch press (scheduled at the pointerdown, not after the lift)
#   g15-onestep  H5, RU-68's second plant: the current step set equal to hover (10 %)
#   g8-exempt    H2, RU-72: the trigger exemption removed (a press on the trigger of an open surface is the dock's outside
#                press: the dock folds under it)
# g4-ghost's MEASURE-7 form (the held seat appended inside the run's port) is replaced. Originals in m8/.plant-orig.
import importlib.util, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("plants7", os.path.join(HERE, "..", "m7", "plants7.py"))
p7 = importlib.util.module_from_spec(spec)
_argv = sys.argv; sys.argv = ["plants7", "x", "list"]
try:
    spec.loader.exec_module(p7)
except SystemExit:
    pass
sys.argv = _argv
p4 = p7.p4
p4.ORIG = os.path.join(HERE, ".plant-orig")
D = p7.D
P = dict(p7.P)
BODY = D + "composables/useDockBody.ts"
STATE = D + "composables/useDockState.ts"
P["g2-facehalf"] = ("G-2/G-4 (RU-70): the content window halved, 0.55 to 0.275",
    [(BODY, "const W_END = 0.55;", "const W_END = 0.275;")])
P["g4-ghost"] = ("G-4 (RU-81): a removed seat keeps painting at its own opacity through its exit and is cut at the landing",
    [(BODY, '            else if (face.role === "leave") op = face.from * win(f);', '            else if (face.role === "leave") op = face.ghost ? face.from : face.from * win(f);')])
P["g1-presshold"] = ("G-1 (f) (RU-73): the press hold removed",
    [(STATE, '    const pressHolds = () => press === "down" || press === "compat";', '    const pressHolds = () => false && (press === "down" || press === "compat");')])
P["g1-frompress"] = ("G-1 (f) (RU-73): the linger timed from the touch press, not the lift",
    [(STATE, '        if (e.type === "pointerup" && e.pointerType === "touch" && state.value === "hover") {', '        if (e.type === "pointerdown" && e.pointerType === "touch" && state.value === "hover") {')])
P["g8-exempt"] = ("G-8 (RU-72): a press on the trigger of an open surface folds the dock (the trigger exemption removed)",
    [(STATE, "        if (!root || root.contains(e.target as Node)) return;", "        if (!root || (root.contains(e.target as Node) && !(e.target as Element).closest?.(\"[aria-expanded='true'], [data-state='open']\"))) return;")])
P["g15-onestep"] = ("G-15 (RU-68): the current step set equal to hover",
    [(D + "styles/dock.css", "        --dock-control-active-bg: color-mix(in oklab, var(--dock-fg-on-aurora, var(--foreground)) 20%, transparent);", "        --dock-control-active-bg: color-mix(in oklab, var(--dock-fg-on-aurora, var(--foreground)) 10%, transparent);")])
if __name__ == "__main__":
    p4.P = P
    name, act = (sys.argv[1], sys.argv[2]) if len(sys.argv) > 2 else (None, "list")
    if act == "list":
        import json; print(json.dumps({k: v[0] for k, v in P.items()}, indent=1))
    elif act == "apply": p4.apply(name)
    elif act == "revert": p4.revert(name)
