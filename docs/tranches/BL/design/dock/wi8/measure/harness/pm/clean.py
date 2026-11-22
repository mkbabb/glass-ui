# clean.py <tree-dir>: exits 0 when every file under the tree's src/ equals HEAD's blob (and no file is added or missing),
# else prints the differing paths and exits 3. The measure's check after every plant's revert (part M).
import os, subprocess, sys
W = "/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8"
T = sys.argv[1]
ref = dict(l.split("\t")[::-1] for l in subprocess.run(["git", "-C", W, "ls-tree", "-r", "HEAD", "src"], capture_output=True, text=True, check=True).stdout.strip().split("\n"))
ref = {p: meta.split()[2] for p, meta in ref.items()}
have = []
for root, _, files in os.walk(os.path.join(T, "src")):
    for f in files: have.append(os.path.relpath(os.path.join(root, f), T))
hs = subprocess.run(["git", "-C", W, "hash-object", "--stdin-paths"], input="\n".join(os.path.join(T, p) for p in have), capture_output=True, text=True, check=True).stdout.split()
bad = [p for p, h in zip(have, hs) if ref.get(p) != h] + [p for p in ref if p not in set(have)]
if bad:
    print("TREE NOT CLEAN:", " ".join(bad[:20])); sys.exit(3)
print("tree clean:", len(have), "src files equal HEAD")
