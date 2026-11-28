# table-into-root.py <ROOT.md> <verdicts.md> <heading>: replace the verdict table under
# <heading> in ROOT.md with the table judge.mjs wrote.
import sys
root_path, verdicts_path, heading = sys.argv[1:4]
root = open(root_path).read().split("\n")
table = [l for l in open(verdicts_path).read().split("\n") if l.startswith("|")]
i = root.index(heading)
start = next(k for k in range(i + 1, len(root)) if root[k].startswith("|"))
end = start
while end < len(root) and root[end].startswith("|"):
    end += 1
root[start:end] = table
open(root_path, "w").write("\n".join(root))
