# C-A7's own plant: `python3 -I plants.py <name> apply|revert <wt>`; apply keeps a byte copy in <wt>/.c7plant/.
#   chipfaint  CK-27 "a gate that cannot fail": the preset chip's hover ink at 0.001 (a hover no eye sees) with the
#              press unchanged. If H7's `capsule preset chip answers` still PASSES, the cell reads a property, not paint.
import sys, os, shutil
name, op, wt = sys.argv[1], sys.argv[2], sys.argv[3]
P = {
  "chipfaint": ("src/components/configurator/styles.css", [
      ("        .configurator-preset-chip:hover {\n            --preset-chip-ink: var(--fill-hover);\n        }",
       "        .configurator-preset-chip:hover {\n            --preset-chip-ink: 0.001;\n        }")]),
}
f, subs = P[name]; src = os.path.join(wt, f); bak = os.path.join(wt, ".c7plant", name, f)
if op == "apply":
    os.makedirs(os.path.dirname(bak), exist_ok=True); shutil.copy2(src, bak)
    s = open(src).read()
    for a, b in subs:
        assert s.count(a) == 1, f"{name}: anchor not unique/absent: {a[:60]!r}"
        s = s.replace(a, b)
    open(src, "w").write(s); print(f"applied {name} on {f}")
else:
    shutil.copy2(bak, src); shutil.rmtree(os.path.join(wt, ".c7plant", name)); print(f"reverted {name} on {f}")
