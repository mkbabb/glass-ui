# Critic 4: each @keyframes name in a tree's src and how many places outside its own
# definition name it; prints the names named on the first tree and on none on the second.
#   python3 -I kfuse.py <tree a> <tree b>
import os, re, sys

def corpus(root):
    out = []
    for d, _, fs in os.walk(os.path.join(root, "src")):
        for f in fs:
            if f.endswith((".css", ".vue", ".ts")):
                out.append(open(os.path.join(d, f), encoding="utf8").read())
    return "\n".join(out)

def uses(root):
    text = corpus(root)
    names = sorted(set(re.findall(r"@keyframes\s+([A-Za-z0-9_-]+)", text)))
    body = re.sub(r"@keyframes\s+[A-Za-z0-9_-]+", "", text)
    return {k: len(re.findall(r"(?<![A-Za-z0-9_-])" + re.escape(k) + r"(?![A-Za-z0-9_-])", body)) for k in names}

a, b = uses(sys.argv[1]), uses(sys.argv[2])
for k in sorted(a):
    if a[k] > 0 and b.get(k, 0) == 0:
        print("named on a, on none on b:", k, a[k])
for k in sorted(a):
    if k in b and a[k] != b[k]:
        print("count", k, a[k], "->", b[k])
