# bakedplant.py <tree-dir> apply|revert: RU-56's plant (m7/plants7.py's g15-baked: "the :root-baked plates restored
# inside the dock"), applied to a candidate tree only, never the worktree. apply cuts the block between the RU-56
# markers out of the tree's dock.css and keeps the original beside it; revert puts the original back.
import os, sys
T, op = sys.argv[1:3]
p = f"{T}/src/components/dock/styles/dock.css"
keep = p + ".s8-orig"
if op == "apply":
    s = open(p).read()
    i = s.find("/* W-I.8 RU-56:")
    j = s.find("/* RU-56 end */", i)
    assert i >= 0 and j > i, "plant site not found"
    open(keep, "w").write(s)
    open(p, "w").write(s[:i] + s[j + len("/* RU-56 end */"):])
    print("applied")
else:
    os.replace(keep, p)
    print("reverted")
