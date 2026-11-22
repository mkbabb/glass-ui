# plant9.py <tree-dir> <plant>[+<plant>...] apply|revert|check, or plant9.py <tree-dir> - list: MEASURE-9 part H's
# counter-tests and candidate values, applied to part H's `git archive` tree of the tip (.m9-tip) only, never the
# worktree. pm/plant.py's table (every plant the eighth pass's gates claim) with RULINGS-8's harness items:
#   g1-afterseat  RU-89 (H1): the persistent-seat branch removed (a leave after a persistent seat's press lingers)
#   g8-nohold     RU-114 (H1): the overlay hold ignored on a leave (the linger runs under an open menu)
#   g2-step       RU-104 as amended for C8-M8 (H2): a fade of at least 66.7 ms with a one-frame step inside it: the
#                 content window falls 1 to 0.85 over the first 0.3 of the travel (about 40 ms), steps to 0.25 in one
#                 frame, and falls to 0 by 0.75 (the window widened from 0.55 so the fade outlasts 66.7 ms; the first
#                 form, its step at 0.24 inside the 0.55 window, read 65.4 to 66.1 ms and failed the length part too)
#   g3-hold       RU-104 (H2): a retarget held past G-3's own bound: a posture change that arrives mid-travel is not
#                 read for 85 ms (the largest bound the tip's turns read is 46.2 ms, WebKit, pm-judge8; two 60 Hz rows
#                 more is 79.6 ms), only a reversal (a posture travel running, the frame loop live, the posture
#                 changed): the plate goes on along its old travel, its inset written against the root's box as
#                 it now is, every sync in the window returns, and the deferred sync then turns it. (Its first form
#                 stopped every quantity for the 85 ms; judge8 reads a step of zero as the turn, so it bit nothing. Its
#                 second form also deferred a fold from rest, where the frame loop is idle, so the plate jumped.)
#   g9-three      RU-104 as amended for C8-M17 (H2): the published progress compressed to three frames (each frame of a
#                 posture travel moves it a third of the way, then it holds at its end); read only if G-9's root clause
#                 is added
#   g13-shown     RU-104 as amended for C8-15 (H2): g13-box rewritten: the face that is not showing given a box as the
#                 fault would, shown and sized (laid out at its own content size, visible, opaque) instead of none
#   stale-target  RU-112 (H4): a travel keeps its first target when the pane or host changes mid-travel (a resize
#                 that arrives while a travel runs is not a retarget), so the plate glides to the old endpoint and the
#                 root's new rest is met by a snap at the landing
#   g2-curve      (pm's) the curve inset never written: on the tip, RU-91's plant state (the stadium on the root with
#                 the inset gone), since S1 takes the inset out and the plant puts `--radius-dock` back
# Candidate values (cand-*): the ruled value laid over the tree so a restated witness can be read GREEN before S
# writes it; never committed, the source is S's.
#   cand-ru91       RU-91: the root's corner `var(--dock-cap-rest)` for every shape (shape.css:11), the stadium rule
#                   (run.css:763-765) out, the curve inset never written
#   cand-ru91-cross cand-ru91 with master's two measured cross lines (`--dock-cross` from `--dock-plate-cross-px`),
#                   the cure RU-112 names if w-tallrow reads the token's cross short of the painted row
#   cand-face       RU-112: the folded face's inline padding the room its floor leaves the glyph at the share
#   cand-hover5     RU-92 as amended for C8-M16: the hover step 5 % (the light scheme's ruled step)
#   cand-pressgate  RU-89's press gate in its least form: a leave after a persistent seat's press folds at once only when
#                   no press holds; under a held press it takes the ordinary linger (the fold at the lift is S's)
# Several names joined by `+` apply together (one saved original per file; applied in order, reverted together).
import contextlib, importlib.util, io, json, os, shutil, subprocess, sys
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W = "/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8"
D = "src/components/dock/"
BODY = D + "composables/useDockBody.ts"
STATE = D + "composables/useDockState.ts"

spec = importlib.util.spec_from_file_location("pmplant", os.path.join(H, "pm", "plant.py"))
pm = importlib.util.module_from_spec(spec)
_argv = sys.argv; sys.argv = ["plant.py", "x", "-", "list"]
try:
    with contextlib.redirect_stdout(io.StringIO()):
        spec.loader.exec_module(pm)
except SystemExit:
    pass
sys.argv = _argv
P = dict(pm.P)
P["g1-afterseat"] = ("RU-89: the persistent-seat branch removed (a leave after its press lingers)",
    [(STATE, "            if (afterSeat) collapse();\n            else scheduleCollapse();", "            void afterSeat;\n            scheduleCollapse();")])
P["g8-nohold"] = ("RU-114: the overlay hold ignored on a leave and when the linger runs out",
    [(STATE, "            // Something is explicitly holding the dock open (dropdown, edit, etc.)\n            if (keepOpenCount.value > 0) return;", "            // Something is explicitly holding the dock open (dropdown, edit, etc.)\n            if (false && keepOpenCount.value > 0) return;"),
     (STATE, "    function holdsOpen(): boolean {\n        if (keepOpenCount.value > 0) return true;", "    function holdsOpen(): boolean {\n        if (false && keepOpenCount.value > 0) return true;"),
     (STATE, "    function scheduleCollapse() {\n        if (isQuiet()) return;\n        if (keepOpenCount.value > 0) return;", "    function scheduleCollapse() {\n        if (isQuiet()) return;\n        if (false && keepOpenCount.value > 0) return;")])
P["g2-step"] = ("RU-104 (C8-M8): a fade of at least 66.7 ms with a one-frame step of 0.6 inside it",
    [(BODY, "const w = (x: number) => (x <= 0 ? 1 : x >= W_END ? 0 : 1 - x / W_END);",
      "const w = (x: number) => (x <= 0 ? 1 : x >= 0.75 ? 0 : x < 0.3 ? 1 - (0.15 * x) / 0.3 : 0.25 * (1 - (x - 0.3) / 0.45));")])
P["g3-hold"] = ("RU-104: a posture change mid-travel read 85 ms late (the plate goes on along its old travel), then turned",
    [(BODY, "        const el = root();\n        if (!el || !el.isConnected) return;\n        Z = (el as HTMLElement & { currentCSSZoom?: number }).currentCSSZoom ?? 1;",
      "        const el = root();\n        if (!el || !el.isConnected) return;\n        const g3 = window as unknown as { __g3until?: number };\n        if (postureTravel && raf !== null && reason === \"posture\" && o.expanded() !== lastPosture && !g3.__g3until) { g3.__g3until = performance.now() + 85; window.setTimeout(() => { g3.__g3until = -1; sync(\"posture\"); g3.__g3until = 0; }, 85); return; }\n        if ((g3.__g3until ?? 0) > 0) return;\n        Z = (el as HTMLElement & { currentCSSZoom?: number }).currentCSSZoom ?? 1;"),
     (BODY, "        plate.style.inset = `${P.t - layout.t}px ${layout.r - P.r}px ${layout.b - P.b}px ${P.l - layout.l}px`;",
      "        const LB = ((window as unknown as { __g3until?: number }).__g3until ?? 0) > 0 ? rectOf(el) : layout;\n        plate.style.inset = `${P.t - LB.t}px ${LB.r - P.r}px ${LB.b - P.b}px ${P.l - LB.l}px`;")])
P["g9-three"] = ("RU-104 (C8-M17): the published progress compressed to three frames",
    [(BODY, '        el.style.setProperty("--dock-expand-t", e.toFixed(4));',
      '        const w9 = window as unknown as { __g9: number };\n        const tgt = lastPosture ? 1 : 0;\n        if (!travelling) w9.__g9 = tgt;\n        else w9.__g9 = Math.abs(tgt - (w9.__g9 ?? tgt)) <= 0.34 ? tgt : (w9.__g9 ?? 1 - tgt) + (tgt > (w9.__g9 ?? 1 - tgt) ? 1 / 3 : -1 / 3);\n        el.style.setProperty("--dock-expand-t", (travelling ? w9.__g9 : e).toFixed(4));')])
P["stale-target"] = ("RU-112: a travel keeps its first target when the pane or host changes mid-travel",
    [(BODY, "            if (prevPainted && changed) {", "            if (prevPainted && changed && !(travelling && !postureChanged)) {")])
CAP = (D + "styles/shape.css", "    .glass-dock {\n        border-radius: var(--radius-dock);\n    }", "    .glass-dock {\n        border-radius: var(--dock-cap-rest);\n    }")
PILL = (D + "styles/run.css", "    .glass-dock.shape-pill {\n        border-radius: var(--radius-dock);\n    }\n", "")
INSET = P["g2-curve"][1][0]
P["cand-ru91"] = ("RU-91 candidate: the root's corner --dock-cap-rest, the stadium rule out, the curve inset never written", [CAP, PILL, INSET])
P["cand-ru91-cross"] = ("RU-91 candidate with master's measured cross extent (--dock-plate-cross-px)", [CAP, PILL, INSET,
    (D + "styles/run.css", "        --dock-cross: calc(var(--dock-layer-height) + 2 * var(--dock-padding-block));", "        --dock-cross: var(--dock-plate-cross-px, calc(var(--dock-layer-height) + 2 * var(--dock-padding-block)));"),
    (D + "styles/run.css", "        --dock-cross: calc(var(--dock-control-size) + 2 * var(--dock-padding-inline));", "        --dock-cross: var(--dock-plate-cross-px, calc(var(--dock-control-size) + 2 * var(--dock-padding-inline)));")])
P["cand-face"] = ("RU-112 candidate: the face's inline padding the room its floor leaves the glyph at the share",
    [(D + "styles/morph.css", "        padding-inline: 0.5rem;", "        padding-inline: calc((var(--dock-layer-height, 2.5rem) - var(--dock-control-glyph-size)) / 2);")])
P["cand-hover5"] = ("RU-92/RU-94 candidate: the hover step 5 %",
    [(D + "styles/dock.css", "        --dock-control-hover-bg: color-mix(in oklab, var(--dock-fg-on-aurora, var(--foreground)) 8%, transparent);", "        --dock-control-hover-bg: color-mix(in oklab, var(--dock-fg-on-aurora, var(--foreground)) 5%, transparent);")])

P["cand-pressgate"] = ("RU-89 candidate: the persistent-seat fold gated on no held press (least form)",
    [(STATE, "            if (afterSeat) collapse();\n            else scheduleCollapse();", "            if (afterSeat && !pressHolds()) collapse();\n            else scheduleCollapse();")])

P["g13-shown"] = ("RU-104 (C8-15): the hidden posture face shown and sized at rest (g13-box rewritten)",
    [(D + "styles/layers.css", "    .glass-dock:not([data-morphing]) > .dock-controls > .dock-layers > .dock-layer:not(.is-active):not(.is-press-keepalive) {\n        display: none;\n    }",
      "    .glass-dock:not([data-morphing]) > .dock-controls > .dock-layers > .dock-layer:not(.is-active):not(.is-press-keepalive) {\n        display: flex !important;\n        visibility: visible !important;\n        opacity: 1 !important;\n        inline-size: max-content !important;\n        inset: 0 auto auto 0 !important;\n    }")])

def reps_of(tree, names):
    out = []
    for n in names:
        desc, reps = pm.resolve(tree, n) if n in pm.P else P[n]
        out += list(reps)
    return out

def stage(tree, names):
    staged, bad = {}, []
    for f, old, new in reps_of(tree, names):
        p = os.path.join(tree, f)
        if not os.path.exists(p): bad.append(f"{f}: missing"); continue
        s = staged.get(f) if f in staged else open(p).read()
        if old is None: s = s + new
        else:
            c = s.count(old)
            if c != 1: bad.append(f"{f}: matches {c} times ({old[:50]!r})"); continue
            s = s.replace(old, new)
        staged[f] = s
    return staged, bad

if __name__ == "__main__":
    tree, name, act = sys.argv[1], sys.argv[2], (sys.argv[3] if len(sys.argv) > 3 else "list")
    if act == "list" or name == "-":
        print(json.dumps({k: v[0] for k, v in P.items()}, indent=1)); sys.exit(0)
    names = name.split("+")
    orig = os.path.join(tree, ".m9-orig", name)
    if act == "check":
        staged, bad = stage(tree, names)
        print(("OK   " if not bad else "BAD  ") + name + ("" if not bad else "  " + " | ".join(bad))); sys.exit(1 if bad else 0)
    if act == "apply":
        if os.path.exists(os.path.join(tree, ".m9-orig")) and os.listdir(os.path.join(tree, ".m9-orig")): sys.exit(f"a plant is already applied: {os.listdir(os.path.join(tree, '.m9-orig'))}")
        staged, bad = stage(tree, names)
        if bad: sys.exit(f"{name}: " + " | ".join(bad))
        for f in staged:
            os.makedirs(os.path.dirname(os.path.join(orig, f)), exist_ok=True)
            shutil.copyfile(os.path.join(tree, f), os.path.join(orig, f))
        for f, s in staged.items(): open(os.path.join(tree, f), "w").write(s)
        print("applied", name, "-", " | ".join(P[n][0] for n in names))
    elif act == "revert":
        if not os.path.exists(orig): sys.exit(f"{name} not applied")
        for root, _, files in os.walk(orig):
            for fn in files:
                src = os.path.join(root, fn); rel = os.path.relpath(src, orig)
                shutil.copyfile(src, os.path.join(tree, rel))
        shutil.rmtree(orig)
        print("reverted", name)
