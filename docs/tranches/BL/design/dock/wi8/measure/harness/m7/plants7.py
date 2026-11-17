# plants7.py <name> apply|revert|list: MEASURE-7's counter-tests. plants6.py's, with RULINGS-6:
#   g2-fitwhole, g2-whole-length: re-anchored on RU-54's fitRun (the line after `room` is now the key's write).
#   g2-capcalc: retired. It restored d50460b34's capped arithmetic over the `capOn` region memory, which RU-54
#     removes ("the carrier's region memory and RU-50's attempt", the final REMOVES list); g14-fitmemory and
#     g14-fitsibs bite the rule that replaced it.
#   new: g14-fitmemory (RU-54: the memory removed), g14-fitsibs (RU-54, C6-M8: the sibling boxes dropped from the key),
#     g6-overflow (RU-52: the cure removed, the fitting run a scroll port again and reach spending it), g15-baked
#     (RU-56: the :root-baked plates restored inside the dock), g15-onestep (RU-56's fallback plant: hover and
#     current one value), g13-tabsvg (RU-65: the tab seat's rule cut back to `> svg`), g8-trigger (RU-62: the scrim's
#     stamp removed and the quiet focus return cancelling the linger again), g13-trigseat (step 7: the trigger's seat
#     default removed), g4-groupframe (step 7: the group-as-frame selectors removed).
import importlib.util, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("plants6", os.path.join(HERE, "..", "m6", "plants6.py"))
p6 = importlib.util.module_from_spec(spec)
_argv = sys.argv; sys.argv = ["plants6", "x", "list"]
try:
    spec.loader.exec_module(p6)
except SystemExit:
    pass
sys.argv = _argv
p4 = p6.p4
p4.ORIG = os.path.join(HERE, ".plant-orig")
D = p6.D
S = D.replace("components/dock/", "")
P = dict(p6.P)
P.pop("g2-capcalc")
ROOM = '        const room = v && fits ? `${Math.floor(((port - span) / 2) * 100) / 100}px` : "";\n'
OLD5 = ROOM + "        return { run, fits, whole, room, span, n };"
NEW7 = ROOM + "        fitKey = { run, span, n, ext, sibs };"
for k in ("g2-fitwhole", "g2-whole-length"):
    d, eds = P[k]
    out = []
    for e in eds:
        if e[1] == OLD5:
            out.append((e[0], NEW7, e[2].replace("        return { run, fits, whole, room, span, n };", "        fitKey = { run, span, n, ext, sibs };")))
        else:
            out.append(e)
    P[k] = (d, out)
P["g14-fitmemory"] = ("G-14 s2 / RU-54: the fit's memory removed (every sync decides again)",
    [(D+"composables/useDockBody.ts", "if (fitKey && fitHeld && fitKey.run === run", "if (false && fitKey && fitHeld && fitKey.run === run")])
P["g14-fitsibs"] = ("RU-54 (C6-M8): the root's other regions dropped from the key",
    [(D+"composables/useDockBody.ts", "        return { ext: v ? el.offsetHeight : el.offsetWidth, sibs };", "        return { ext: v ? el.offsetHeight : el.offsetWidth, sibs: \"\" && sibs };")])
P["g6-overflow"] = ("G-6 / RU-52: the cure removed (a fitting run a scroll port again, reach spending its reserve)",
    [(D+"styles/run.css", "    .glass-dock[data-run-fits] :where(.dock-layers) > .dock-run {\n        overflow: visible;\n    }", ""),
     (D+"composables/useDockRun.ts", "        if (run.closest(\".glass-dock\")?.hasAttribute(\"data-run-fits\")) {\n            glide.dispose();\n            return;\n        }\n", "")])
P["g15-baked"] = ("G-15 / RU-56: the :root-baked plates restored inside the dock (the ink-derived fills removed)",
    [(D+"styles/dock.css", "RU56_DECL_START", "RU56_DECL_START")])  # replaced below once RU-56 is in source
P["g13-tabsvg"] = ("G-13 / RU-65: the tab seat's glyph rule cut back to a direct svg",
    [(D+"styles/controls/tab-button.css", ".dock-tab-button > :is(svg, img, picture, [data-dock-glyph]) {", ".dock-tab-button > svg {")])
P["g8-trigger"] = ("G-8 / RU-62: the scrim's stamp removed and a quiet focus return cancelling the linger again",
    [("src/components/sheet/SheetContent.vue", '<ModalOverlay v-bind="dock.portalAttrs.value" :opacity', '<ModalOverlay :opacity'),
     ("src/components/dialog/DialogContent.vue", '<ModalOverlay v-bind="dock.portalAttrs.value" veil', '<ModalOverlay veil'),
     (D+"composables/useDockState.ts", "        if (!quietReturn) clearTimer();", "        clearTimer();")])
P["g13-trigseat"] = ("step 7: a DockTrigger in a run no longer takes the run's seat height and padding",
    [(D+"styles/controls/triggers.css", "TRIGSEAT_START", "TRIGSEAT_START")])
P["g4-groupframe"] = ("step 7: a role=group child of the run is a snap area again",
    [(D+"styles/run.css", "GROUPFRAME_START", "GROUPFRAME_START")])
# The three rules written after this file (RU-56's fills, step 7's two adds) are cut out whole between their markers.
def _cut(rel, start, end):
    path = rel if rel.startswith("/") else os.path.join("/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8", rel)
    try:
        s = open(path).read()
    except OSError:
        return None
    i = s.find(start)
    j = s.find(end, i)
    if i < 0 or j < 0:
        return None
    return s[i:j + len(end)]
for k, rel, a, b in (("g15-baked", D + "styles/dock.css", "/* W-I.8 RU-56:", "/* RU-56 end */"),
                     ("g13-trigseat", D + "styles/controls/triggers.css", "/* W-I.8 step 7 (the trigger's seat):", "/* trigger seat end */"),
                     ("g4-groupframe", D + "styles/run.css", "/* W-I.8 step 7 (the group as a frame):", "/* group frame end */")):
    blk = _cut(rel, a, b)
    if blk:
        P[k] = (P[k][0], [(rel, blk, "")])
    else:
        P.pop(k)
if __name__ == "__main__":
    p4.P = P
    name, act = (sys.argv[1], sys.argv[2]) if len(sys.argv) > 2 else (None, "list")
    if act == "list":
        import json; print(json.dumps({k: v[0] for k, v in P.items()}, indent=1))
    elif act == "apply": p4.apply(name)
    elif act == "revert": p4.revert(name)
