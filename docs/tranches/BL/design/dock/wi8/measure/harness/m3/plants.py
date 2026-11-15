# plants.py <name> apply|revert|list: MEASURE-3's counter-tests. Each plant is one planted fault
# (an exact replacement in the worktree's source) that its gate must read RED. `apply` saves
# the original of each file it touches under m3/.plant-orig/ and refuses if a replacement does
# not match exactly once; `revert` writes the originals back. Nothing else touches source.
import json, os, shutil, sys
W = "/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/"
D = "src/components/dock/"
HERE = os.path.dirname(os.path.abspath(__file__))
ORIG = os.path.join(HERE, ".plant-orig")
P = {
  # gate: (what the plant is, [(file, old, new)])
  "g1-linger": ("G-1: the linger token ignored (a fixed 3.6 s, master's literal)",
    [(D+"composables/useDockState.ts", "        return Math.min(max, base + dwellMs / 2);", "        void max;\n        return 3600;")]),
  "g2-clock": ("G-2: the loop's clock started at the trigger (the first frame advances 33 ms)",
    [(D+"composables/useDockBody.ts", "            last = inFrame ? (document.timeline.currentTime as number | null) : null;", "            last = performance.now() - 33;")]),
  "g2-curve": ("G-2 (inside the curve): the curve inset never written",
    [(D+"composables/useDockBody.ts", "        const had = el.style.getPropertyValue(\"--dock-curve-inset\") !== \"\";\n        if (!o.pill() || !open", "        if (open) return;\n        const had = el.style.getPropertyValue(\"--dock-curve-inset\") !== \"\";\n        if (!o.pill() || !open")]),
  "g2-touch": ("G-2 (no folded face under touch): the rule removed",
    [(D+"GlassDock.vue", "declaredOpen.value || (noHover.value && !slots.collapsed)", "declaredOpen.value || (false && noHover.value && !slots.collapsed)")]),
  "g2-compact": ("G-2 (the compact run): never compact",
    [(D+"composables/useDockBody.ts", "        if (last - first > port + 0.5) run.setAttribute(\"data-compact\", \"\");", "        void last; void first; void port;")]),
  "g2-rim": ("G-2 (the rim): the rim drawn on the root, not the plate",
    [(D+"GlassDock.vue", "            <slot name=\"rim\" />\n", ""),
     (D+"GlassDock.vue", "        <div class=\"dock-controls\">\n", "        <slot name=\"rim\" />\n        <div class=\"dock-controls\">\n")]),
  "g3-intent": ("G-3: the intent wait applied to a return mid-fold",
    [(D+"composables/useDockState.ts", "        if (isTransitioning?.value) {\n            clearHoverIntent();", "        if (false && isTransitioning?.value) {\n            clearHoverIntent();")]),
  "g4-inline": ("G-4: the seat's inline-size leg restored (210 ms)",
    [(D+"styles/controls/icon-button.css", "        transition:\n            background-color var(--dock-motion-fast),", "        transition:\n            inline-size 210ms ease,\n            background-color var(--dock-motion-fast),")]),
  "g4-join": ("G-4 (a control joins or leaves): the records ignored",
    [(D+"composables/useDockBody.ts", "        const run = runEl();\n        if (!run || !shown || !o.expanded() || run.offsetParent === null) return;\n        const joined", "        return;\n        const run = runEl();\n        if (!run || !shown || !o.expanded() || run.offsetParent === null) return;\n        const joined")]),
  "g4-snap": ("G-4 (two changes within 90 ms): the rest off the snap positions",
    [(D+"composables/useDockRun.ts", "        return best;\n    }", "        void best;\n        return clamped;\n    }")]),
  "g4-scroll": ("G-4 (the open seat changes in a compact scrolling run): the offset left to the run's reach",
    [(D+"composables/useDockBody.ts", "                scrollOnly = to !== null && Math.abs(to - from) > 0.5;", "                scrollOnly = false && to !== null && Math.abs(to - from) > 0.5;")]),
  "g6-flow": ("G-6: a name put in flow on hover (the seat grows 12 px a side)",
    [(D+"styles/controls/icon-button.css", None, "\n.glass-dock .dock-run > .dock-icon-button:hover { padding-inline: 12px; }\n")]),
  "g7-provide": ("G-7: the outlet's provide removed",
    [(D+"DockOutlet.vue", "        provide(DOCK_CONTEXT_KEY, p.context);", "        void p.context;")]),
  "g8-hold": ("G-8: the hold count consulted on a press outside",
    [(D+"composables/useDockState.ts", "        if (isTeleportedTarget(e.target, dockId)) return;\n\n        collapse();", "        if (isTeleportedTarget(e.target, dockId)) return;\n        if (isHeld.value) return;\n\n        collapse();")]),
  "g9-scope": ("G-9: the scope write removed",
    [(D+"composables/useDockBody.ts", "        scopeEl?.style.setProperty(\"--dock-expand-t\", v);", "        void scopeEl;")]),
  "g10-rm": ("G-10: reduced motion's seat removed (geometry glides on the spring)",
    [(D+"composables/useDockBody.ts", "            if (reduce) {\n                // R-11: under reduced motion, the preference set mid-travel included, every", "            if (false) {\n                // R-11: under reduced motion, the preference set mid-travel included, every")]),
  "g11-rest": ("G-11: a loop left running at rest",
    [(D+"composables/useDockBody.ts", "        el?.removeAttribute(\"data-morphing\");\n        o.moving.value = false;", "        el?.removeAttribute(\"data-morphing\");\n        const spin = () => requestAnimationFrame(spin);\n        spin();\n        o.moving.value = false;")]),
  "g12-scale": ("G-12: a scale on .glass-dock",
    [(D+"styles/shell.css", None, "\n.glass-dock { scale: 1; }\n")]),
  "g13-box": ("G-13: the hidden posture face keeps its box at rest",
    [(D+"styles/layers.css", "        display: none;", "        display: flex;")]),
  "g14-rmclock": ("G-14: reduced motion's content clock 300 ms, not 100 (a restated unit witness)",
    [(D+"composables/useDockBody.ts", "                u = Math.max(0, u - dt / 0.1);", "                u = Math.max(0, u - dt / 0.3);")]),
}
def apply(name):
    desc, reps = P[name]
    d = os.path.join(ORIG, name)
    if os.path.exists(d): sys.exit(f"{name} already applied")
    texts = {}
    for f, old, new in reps:
        texts.setdefault(f, open(W + f).read())
    staged = dict(texts)
    for f, old, new in reps:
        s = staged[f]
        if old is None: s = s + new
        else:
            if s.count(old) != 1: sys.exit(f"{name}: {f}: match count {s.count(old)}")
            s = s.replace(old, new)
        staged[f] = s
    os.makedirs(d)
    for f, s in texts.items():
        os.makedirs(os.path.dirname(os.path.join(d, f)), exist_ok=True)
        open(os.path.join(d, f), "w").write(s)
    for f, s in staged.items(): open(W + f, "w").write(s)
    print("applied", name, "-", desc)
def revert(name):
    d = os.path.join(ORIG, name)
    if not os.path.exists(d): sys.exit(f"{name} not applied")
    for root, _, files in os.walk(d):
        for fn in files:
            src = os.path.join(root, fn); rel = os.path.relpath(src, d)
            shutil.copyfile(src, W + rel)
    shutil.rmtree(d)
    print("reverted", name)
if __name__ == "__main__":
    name, act = (sys.argv[1], sys.argv[2]) if len(sys.argv) > 2 else (None, "list")
    if act == "list":
        print(json.dumps({k: v[0] for k, v in P.items()}, indent=1))
    elif act == "apply": apply(name)
    elif act == "revert": revert(name)
