# plant9s.py <tree-dir> <plant>[+<plant>...] apply|revert|check, or - list: the ninth pass's source seat (MEASURE-9 part S).
# m9/plant9.py's table (every plant part H read) with each S item's own plants, anchored on the item's tree (.s9-cand),
# never the worktree. apply keeps each touched file's original under <tree>/.s9-orig/<name>/ and refuses when a
# replacement does not match exactly once or a plant is already applied; revert puts the originals back.
#   s1-stadium   RU-91's plant on S1's tree: `--radius-dock` back on the root (shape.css), the stadium on every shape
#   s1-facepad   RU-112's plant: the folded face's inline padding back to 0.5rem (morph.css)
import importlib.util, json, os, shutil, sys
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
spec = importlib.util.spec_from_file_location("m9plant", os.path.join(H, "m9", "plant9.py"))
m9 = importlib.util.module_from_spec(spec); spec.loader.exec_module(m9)
D = "src/components/dock/"
P = m9.P
P["s1-stadium"] = ("RU-91 plant: --radius-dock back on the root", [(D + "styles/shape.css", "        border-radius: var(--dock-cap-rest);\n    }", "        border-radius: var(--radius-dock);\n    }")])
P["s1-facepad"] = ("RU-112 plant: the folded face's inline padding 0.5rem", [(D + "styles/morph.css", "        padding-inline: calc((var(--dock-layer-height, 2.5rem) - var(--dock-control-glyph-size)) / 2);", "        padding-inline: 0.5rem;")])
EXTRA = os.path.join(H, "s9", "plants-extra.py")
if os.path.exists(EXTRA): exec(open(EXTRA).read())
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
