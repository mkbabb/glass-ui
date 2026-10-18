#!/usr/bin/env python3
# crit-declcheck.py · D3 pass 7, the critic: R-15 (iii) checked with my own extractor and matcher (no harness code).
#   python3 -I crit-declcheck.py <patch> <tree> <seat declaration.json> [--plant]
# 1. Every identifier-shaped token on the patch's removed lines of src/ and demo/ files (custom properties, data-
#    attributes, camelCase / PascalCase / UPPER_SNAKE names, kebab class names, and lowercase names in call or
#    declaration position) is looked up in <tree> as a whole token. Each one the tree no longer names must appear in the
#    seat's `names`; each one it still names must appear in the seat's `present` (or be ordinary English).
# 2. Every declared name is searched in <tree> in its word form by my own matcher: camel/kebab/snake split to words,
#    joined by any run of whitespace, comment leaders (* / # < ! -), hyphens, underscores, dots, slashes or nothing,
#    case-insensitive, each word with an optional inflection suffix. Exact-only names (the seat's `exact`) are searched
#    exact only, and their word-form hits are printed separately for reading.
import json, os, re, sys

patch, tree, declf = sys.argv[1:4]
plant = "--plant" in sys.argv
decl = json.load(open(declf))
names = set(decl["names"])
exact = {e["name"] if isinstance(e, dict) else e for e in decl.get("exact", [])}
present = set()
for p in decl.get("present", []):
    present.add(p["id"] if isinstance(p, dict) else p)

EXT = (".ts", ".vue", ".css", ".js", ".mjs", ".md", ".json", ".html", ".tsx", ".scss")
files = {}
for top in ("src", "demo"):
    for dp, _, fs in os.walk(os.path.join(tree, top)):
        for f in fs:
            if f.endswith(EXT):
                p = os.path.join(dp, f)
                try: files[os.path.relpath(p, tree)] = open(p, encoding="utf8", errors="replace").read()
                except OSError: pass
blob = "\n".join(files.values())

# 1. extraction
removed = []
cur = None
for line in open(patch, encoding="utf8", errors="replace"):
    if line.startswith("diff --git"):
        m = re.search(r" b/(\S+)", line); cur = m.group(1) if m else None
    elif line.startswith("-") and not line.startswith("---") and cur and re.match(r"(src|demo)/", cur):
        removed.append((cur, line[1:]))
tok = set()
for f, l in removed:
    for m in re.finditer(r"--[a-z][a-z0-9-]*[a-z0-9]", l): tok.add(m.group(0))
    for m in re.finditer(r"\bdata-[a-z][a-z0-9-]*[a-z0-9]", l): tok.add(m.group(0))
    for m in re.finditer(r"\b[a-z]+[A-Z][A-Za-z0-9]*\b", l): tok.add(m.group(0))            # camelCase
    for m in re.finditer(r"\b[A-Z][a-z0-9]+[A-Z][A-Za-z0-9]*\b", l): tok.add(m.group(0))    # PascalCase
    for m in re.finditer(r"\b[A-Z][A-Z0-9]*_[A-Z0-9_]+\b", l): tok.add(m.group(0))         # UPPER_SNAKE
    for m in re.finditer(r"(?:function|const|let|class|interface|type)\s+([A-Za-z_]\w*)", l): tok.add(m.group(1))
    for m in re.finditer(r"@utility\s+([a-z][a-z0-9-]+)", l): tok.add(m.group(1))
    if f.endswith((".css", ".vue")):
        for m in re.finditer(r"\.([a-z][a-z0-9]*(?:-[a-z0-9]+)+)\b", l): tok.add(m.group(1))
absent, still = [], []
for t in sorted(tok):
    hit = re.search(r"(?<![A-Za-z0-9_-])" + re.escape(t) + r"(?![A-Za-z0-9_-])", blob)
    (still if hit else absent).append(t)
undeclared = [t for t in absent if t not in names]
print(f"removed src/demo lines: {len(removed)}; identifier tokens: {len(tok)}; absent from tree: {len(absent)}; still named: {len(still)}")
if not plant:
    print(f"ABSENT-NOT-DECLARED ({len(undeclared)}): {' '.join(undeclared)}")
    extra = sorted(n for n in names if n not in tok and not n.startswith(("earned", "darkened", "luma", "backdrop mode", "adaptive")))
    print(f"declared but not found by my extractor ({len(extra)}): {' '.join(extra)}")
    unlisted = [t for t in still if t not in present and t not in names]
    print(f"still named, not in the seat's present list ({len(unlisted)}): {' '.join(unlisted[:80])}")

# 2. word forms
def words(n):
    n = n.lstrip("-")
    n = re.sub(r"^data-", "", n)
    parts = re.split(r"[-_\s]+", n)
    out = []
    for p in parts:
        out += [w for w in re.findall(r"[A-Z]+(?=[A-Z][a-z])|[A-Z]?[a-z]+|[A-Z]+|\d+", p)]
    return [w.lower() for w in out if w]
SEP = r"(?:[\s*/#<>!\-_.]|//)*"
hits_total = 0
rows = []
for n in sorted(names):
    ws = words(n)
    pats = [re.escape(n)]
    if len(ws) >= 2 and n not in exact:
        pats.append(r"(?<![A-Za-z])" + SEP.join(re.escape(w) + r"[a-z]{0,4}" for w in ws) + r"(?![A-Za-z])")
    hits = []
    for f, s in files.items():
        for pat in pats:
            for m in re.finditer(pat, s, re.I if pat != pats[0] else 0):
                ln = s.count("\n", 0, m.start()) + 1
                hits.append(f"{f}:{ln} «{m.group(0)[:60]!s}»".replace("\n", "⏎"))
    hits = sorted(set(hits))
    if n in exact and len(ws) >= 2:
        pat = r"(?<![A-Za-z])" + SEP.join(re.escape(w) + r"[a-z]{0,4}" for w in ws) + r"(?![A-Za-z])"
        wf = sorted({f"{f}:{s.count(chr(10),0,m.start())+1}" for f, s in files.items() for m in re.finditer(pat, s, re.I)})
        rows.append(f"  exact-only {n}: word-form sites {len(wf)} · {' '.join(wf[:14])}")
    if hits:
        hits_total += len(hits)
        print(f"HIT {n} ({len(hits)}): " + " | ".join(hits[:8]))
print("\n".join(rows))
print(f"DECLCHECK {'plant ' if plant else ''}names={len(names)} hits={hits_total} absent-not-declared={len(undeclared) if not plant else '-'}")
sys.exit(1 if hits_total or (undeclared and not plant) else 0)
