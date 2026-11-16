# plants6.py <name> apply|revert|list: MEASURE-6's counter-tests. plants5.py's, with RULINGS-5:
#   RU-42: G-4's inline-size plant retired (RU-28 left nothing for it to bite; G-4's "no seat's width
#   changes in one row" is proved by g4-openseat). G-1 (f)'s WebKit cell retired with it (the unit
#   witness in GlassDock.posture.test.ts carries the clause under g1-lift).
import importlib.util, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("plants5", os.path.join(HERE, "..", "m5", "plants5.py"))
p5 = importlib.util.module_from_spec(spec); spec.loader.exec_module(p5)
p4 = p5.p4
p4.ORIG = os.path.join(HERE, ".plant-orig")
D = p5.D
P = dict(p5.P)
P.pop("g4-inline")
#   RU-42: G-3's intent plant (WebKit-only bite) dropped; the new plant is in the carrier: a posture change
#   that arrives mid-travel has its retarget held four rows (the quantities stand still, then turn).
P.pop("g3-intent")
P["g3-retarget"] = ("G-3 (RU-42): a retarget mid-travel held four rows",
    [(D+"composables/useDockBody.ts", "                eq.d = e - (posture ? 1 : 0);\n                postureTravel = true;", "                eq.d = e - (posture ? 1 : 0);\n                if (travelling) (window as unknown as { __g3hold: number }).__g3hold = 4;\n                postureTravel = true;"),
     (D+"composables/useDockBody.ts", "        let live = false;\n        if (dt > 0) {", "        let live = false;\n        const w3 = window as unknown as { __g3hold?: number };\n        if (dt > 0 && !((w3.__g3hold ?? 0) > 0 && (w3.__g3hold!--, true))) {")])
#   RU-36: the seated branch removed for a room change.
P["g2-room"] = ("G-2 (RU-36): a room change put on the spring (the seated branch removed for it)",
    [(D+"composables/useDockBody.ts", "            const room = roomChange && !postureChanged && !pendingLeaves.length;", "            const room = false && roomChange && !postureChanged && !pendingLeaves.length;")])
#   RU-39: the capped arithmetic restored (d50460b34's port: the region plus a remembered extra).
P["g2-capcalc"] = ("G-2/G-14 (RU-39): the capped run's port rebuilt by arithmetic (d50460b34)",
    [(D+"composables/useDockBody.ts", """        const region = run.parentElement?.clientWidth ?? 0;
        if (!v && run.hasAttribute("data-run-whole")) {
            if (capOn && capOn.span === span && capOn.n === n && capOn.region === region) return { run, fits: false, whole: true, room: "", span, n };
            run.removeAttribute("data-run-whole");
        }
        // The port is the shipped one, the run's client box, uncapped.
        const port = v ? run.clientHeight : run.clientWidth;
        const fits = span > 0 && span <= port;
""", """        const region = run.parentElement?.clientWidth ?? 0;
        void region;
        const host = run.parentElement;
        const capped = !v && !!host && run.hasAttribute("data-run-whole");
        const port = v ? run.clientHeight : capped ? Math.round(host!.getBoundingClientRect().width + (window as unknown as { __capExtra?: number }).__capExtra! || 0) : run.clientWidth;
        const fits = span > 0 && span <= port;
        if (!v && host && !capped && !fits) (window as unknown as { __capExtra?: number }).__capExtra = run.clientWidth - host.getBoundingClientRect().width;
""")])
# The fit plan carries span and n (RU-36): the two RU-26/RU-27 plants re-anchored on it.
def _re(k):
    desc, reps = P[k]
    P[k] = (desc, [(f, o.replace("return { run, fits, whole, room };", "return { run, fits, whole, room, span, n };") if o else o, nw.replace("return { run, fits, whole, room };", "return { run, fits, whole, room, span, n };")) for f, o, nw in reps])
for _k in ("g2-fitwhole", "g2-whole-length"): _re(_k)
if __name__ == "__main__":
    p4.P = P
    name, act = (sys.argv[1], sys.argv[2]) if len(sys.argv) > 2 else (None, "list")
    if act == "list":
        import json; print(json.dumps({k: v[0] for k, v in P.items()}, indent=1))
    elif act == "apply": p4.apply(name)
    elif act == "revert": p4.revert(name)
