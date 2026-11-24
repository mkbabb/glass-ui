# Critic 13 (copied by critic 14): compare a built tree with a git tree-ish, path by path, by blob hash.
#   treecmp.py <repo> <tree-ish> <dir> <include-prefix|-> <exclude-prefix,...|->
# prints "same N", and each differing, missing or extra path.
import os, subprocess, sys
repo, rev, d, inc, exc = sys.argv[1:6]
exc = [] if exc == "-" else exc.split(",")
out = subprocess.run(["git", "-C", repo, "ls-tree", "-r", "-z", rev], capture_output=True, check=True).stdout
want = {}
for rec in out.split(b"\0"):
    if not rec: continue
    meta, path = rec.split(b"\t", 1); mode, typ, sha = meta.split()
    p = path.decode()
    if inc != "-" and not p.startswith(inc): continue
    if any(p.startswith(e) for e in exc): continue
    if typ != b"blob": continue
    want[p] = (mode.decode(), sha.decode())
paths = sorted(want)
files = [p for p in paths if want[p][0] != "120000"]
hp = subprocess.run(["git", "-C", repo, "hash-object", "--no-filters", "--stdin-paths"], input="\n".join(os.path.join(d, p) for p in files).encode(), capture_output=True, check=True).stdout.decode().split()
got = dict(zip(files, hp))
for p in paths:
    if want[p][0] == "120000":
        got[p] = subprocess.run(["git", "-C", repo, "hash-object", "--stdin"], input=os.readlink(os.path.join(d, p)).encode(), capture_output=True).stdout.decode().strip()
bad = [p for p in paths if got.get(p) != want[p][1]]
base = os.path.join(d, inc) if inc != "-" else d
extra = []
if inc != "-":
    for root, _, fs in os.walk(base):
        for f in fs:
            rel = os.path.relpath(os.path.join(root, f), d)
            if rel not in want: extra.append(rel)
print(f"same {len(paths) - len(bad)} of {len(paths)}; differ {len(bad)}; extra {len(extra)}")
for p in bad: print("DIFF", p)
for p in extra: print("EXTRA", p)
sys.exit(1 if bad or extra else 0)
