# g14plants.py <name> apply|revert|list: MEASURE-4's counter-tests for G-14's restated groups
# (RU-22 pile (a)). Each plant is one fault planted in the worktree's source (an exact
# replacement), read by the restated group's release sites on the dev server, and reverted.
# `apply` saves each touched file's original under m4/.plant-orig/ and refuses if a replacement
# does not match exactly once; `revert` writes the originals back.
import json, os, shutil, sys
W = "/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/"
D = "src/components/dock/"
HERE = os.path.dirname(os.path.abspath(__file__))
ORIG = os.path.join(HERE, ".plant-orig")
P = {
  # The used corner (10.1.5 g1 g2 e1 e4 h1 h4 k3 l1 m1 m3 m4 q1 s1 s2 O-160's neighbours,
  # 11.0.1 o2 o3): the pill rests at the old pill rung, 16 px, not half its cross extent.
  "corner": ("the pill's rest corner a fixed 16 px",
    [(D+"styles/run.css", "    .glass-dock.shape-pill {\n        border-radius: 9999px;\n    }", "    .glass-dock.shape-pill {\n        border-radius: 16px;\n    }")]),
  # The painted box (10.1.3 O-110, D-1 critique-3/4/7): the loop's clock started at the
  # trigger, so the first frame of a travel already moves.
  "clock": ("the plate jumps to the new layout on the trigger frame (no edge carries the painted box)",
    [(D+"composables/useDockBody.ts", "                edge.l.d = prevPainted.l - next.l;\n                edge.t.d = prevPainted.t - next.t;\n                edge.r.d = prevPainted.r - next.r;\n                edge.b.d = prevPainted.b - next.b;", "                edge.l.d = 0;\n                edge.t.d = 0;\n                edge.r.d = 0;\n                edge.b.d = 0;")]),
  # The lane clip read by the spill witnesses (10.1.3 critique-4): no lane clips while a travel runs.
  "lane": ("no region is clipped to its lane while a travel runs",
    [(D+"composables/useDockBody.ts", "        const clipTo = (t: RegionTrack, box: Box, rIn: number) => {", "        const clipTo = (t: RegionTrack, box: Box, rIn: number) => {\n            if (t) return;")]),
  # The reservation (10.1.2 O-101, O-101a): the root held at its painted size through a
  # travel (a stale endpoint), as the old reservation could be.
  "reserve": ("the root held at the size it had when the travel began",
    [(D+"composables/useDockBody.ts", "            el.setAttribute(\"data-morphing\", \"\");\n            o.moving.value = true;", "            if (!el.style.inlineSize) el.style.inlineSize = `${(prevPainted ?? next).r - (prevPainted ?? next).l}px`;\n            el.setAttribute(\"data-morphing\", \"\");\n            o.moving.value = true;"),
     (D+"composables/useDockBody.ts", "        el?.removeAttribute(\"data-morphing\");\n        o.moving.value = false;", "        el?.style.removeProperty(\"inline-size\");\n        el?.removeAttribute(\"data-morphing\");\n        o.moving.value = false;")]),
  # The face under touch (10.1.1 O-102(3) coarse): a dock with a folded face rests open too.
  "touch": ("every dock rests open under (hover: none), with a folded face or not",
    [(D+"GlassDock.vue", "declaredOpen.value || (noHover.value && !slots.collapsed)", "declaredOpen.value || noHover.value")]),
  # The press aimed at paint (10.1.5 O-177): the seats take no press while a travel runs.
  "press": ("the run takes no pointer events while [data-morphing] is set",
    [(D+"styles/dock.css", "    .glass-dock {\n        pointer-events: none;\n    }", "    .glass-dock {\n        pointer-events: none;\n    }\n    .glass-dock[data-morphing] .dock-run {\n        pointer-events: none;\n    }")]),
  # O-160 restated: a cut-cap keyframe returns.
  "cap": ("a cut-cap keyframe restored on the plate",
    [(D+"styles/run.css", "@keyframes gl-dock-clip-inline-start {", "@keyframes gl-dock-cap-inline-start {\n    from {\n        border-radius: 50%;\n    }\n}\n\n@keyframes gl-dock-clip-inline-start {")]),
  # The fit law (pile (b), cured): the flag never written.
  "fits": ("data-run-fits never written",
    [(D+"composables/useDockBody.ts", "        el.toggleAttribute(\"data-run-fits\", fits);", "        el.toggleAttribute(\"data-run-fits\", false);")]),
  # The zoom cure (pile (b)): reads not divided by the ancestor zoom.
  "zoom": ("the carrier's reads not divided by the ancestor zoom",
    [(D+"composables/useDockBody.ts", "        Z = (el as HTMLElement & { currentCSSZoom?: number }).currentCSSZoom ?? 1;", "        Z = 1;")]),
}
name, act = sys.argv[1], sys.argv[2]
if act == "list": print(json.dumps(list(P))); sys.exit(0)
desc, reps = P[name]
os.makedirs(ORIG, exist_ok=True)
if act == "apply":
    texts = {}
    for f, old, new in reps:
        t = texts.get(f) or open(W + f).read()
        if t.count(old) != 1: sys.exit(f"{name}: {f}: the replacement matches {t.count(old)} times")
        texts[f] = t.replace(old, new)
    for f, t in texts.items():
        shutil.copy(W + f, os.path.join(ORIG, f.replace("/", "__")))
        open(W + f, "w").write(t)
    print(f"applied {name}: {desc}")
elif act == "revert":
    for f in {f for f, _, _ in reps}:
        o = os.path.join(ORIG, f.replace("/", "__"))
        shutil.copy(o, W + f); os.remove(o)
    print(f"reverted {name}")
