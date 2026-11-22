# plantm.py <tree-dir> <plant>[+<plant>...] apply|revert|check, or - list: MEASURE-9 part M's counter-tests, applied to the
# measure's tree of the ninth tip (.m9m-tip) only, never the worktree. s9/plant9s.py's table (part H's m9/plant9.py, which
# carries pm/plant.py's, and every S item's plants) with the four whose anchors S moved, re-anchored, the fault the same:
#   g1-linger    the linger token ignored (master's fixed 3.6 s): S2 removed the dwell linger it was anchored on; the
#                leave's one linger is `tokenMs("--dock-linger", collapseDelay)`, and the plant writes 3600 there
#   g14-corner   G-14's corner group: the pill's rest corner a fixed 16 px. S1 put every shape on `--dock-cap-rest`
#                (shape.css); the plant adds the pill's 16 px beside that rule
#   s3-nodark    RU-93's plant: the token's dark line removed. S4 added the hover step to the same `.dark` block
#   g2-curve     RU-91's plant on the outline clause is S1's s1-stadium (`--radius-dock` back on the root); the name is
#                kept for the ready list's "the outline clause, its plant RED"
#   g1-afterseat RU-89's plant on (k2) is S6's s6-afterseat (the persistent seat's branch removed)
# apply keeps each touched file's original under <tree>/.s9-orig/<name>/ (s9/plant9s.py's form).
import importlib.util, json, os, shutil, sys
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
spec = importlib.util.spec_from_file_location("s9plant", os.path.join(H, "s9", "plant9s.py"))
s9 = importlib.util.module_from_spec(spec); spec.loader.exec_module(s9)
P = s9.P; m9 = s9.m9
D = "src/components/dock/"
P["g1-linger"] = ("G-1 (k) plant: the linger token ignored (master's fixed 3.6 s)",
    [(D + "composables/useDockState.ts", '}, tokenMs("--dock-linger", collapseDelay));', "}, 3600);")])
P["g14-corner"] = ("G-14 corner: the pill's rest corner a fixed 16 px",
    [(D + "styles/shape.css", "    .glass-dock {\n        border-radius: var(--dock-cap-rest);\n    }",
      "    .glass-dock {\n        border-radius: var(--dock-cap-rest);\n    }\n    .glass-dock.shape-pill {\n        border-radius: 16px;\n    }")])
P["s3-nodark"] = ("RU-93 plant: the token's dark line removed",
    [("src/styles/tokens/glass.css", ".dark {\n    --glass-level-dock: 0.7;\n    --dock-hover-step: 5%;\n}", ".dark {\n    --dock-hover-step: 5%;\n}")])
P["g2-curve"] = ("RU-91 plant (S1's s1-stadium): `--radius-dock` back on the root", P["s1-stadium"][1])
P["g1-afterseat"] = ("RU-89 plant (S6's s6-afterseat): the persistent seat's branch removed", P["s6-afterseat"][1])
for k in ("cand-ru91", "cand-ru91-cross", "cand-face", "cand-hover5", "cand-pressgate"): P.pop(k, None)
# touchcure: S6's two touch cures removed and nothing else (pm's form restored both files whole from 88ff3ff7e^, which
# on the ninth tip would also put back the three `v-specular` S4 removed from DockTrigger)
P["touchcure"] = ("RU-72 (S6): the two touch cures removed (DockTrigger's close on a touch press, the scrim's touch click)",
    [("src/components/dialog/ModalScrim.vue", "        @pointerup.self=\"onPointerup\"\n", ""),
     (D + "DockTrigger.vue", "        @pointerdown=\"onSelectPointerdown\"\n        @pointerup=\"onSelectPointerup\"\n", "")])
# m9.reps_of resolves a name pm/plant.py also holds through pm's own table, so the re-anchored entries go there too
for k in ("g1-linger", "g14-corner", "g2-curve", "touchcure"): m9.pm.P[k] = P[k]

if __name__ == "__main__":
    tree, name, act = sys.argv[1], sys.argv[2], (sys.argv[3] if len(sys.argv) > 3 else "list")
    if act == "list" or name == "-":
        print(json.dumps({k: v[0] for k, v in P.items()}, indent=1)); sys.exit(0)
    names = name.split("+"); base = os.path.join(tree, ".s9-orig"); orig = os.path.join(base, name)
    staged, bad = m9.stage(tree, names)
    if act == "check":
        print(("OK   " if not bad else "BAD  ") + name + ("" if not bad else "  " + " | ".join(bad))); sys.exit(1 if bad else 0)
    if act == "apply":
        if os.path.isdir(base) and os.listdir(base): sys.exit(f"a plant is already applied: {os.listdir(base)}")
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
                src = os.path.join(root, fn); shutil.copyfile(src, os.path.join(tree, os.path.relpath(src, orig)))
        shutil.rmtree(orig); print("reverted", name)
