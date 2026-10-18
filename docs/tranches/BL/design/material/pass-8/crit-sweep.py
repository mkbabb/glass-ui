"""crit-sweep.py · the pass-8 critic's own prose sweep, sharing no harness code.

usage: python3 -I crit-sweep.py <patch> <patched-tree> <head-tree>

Scope: every path the patch lists that exists in the patched tree, plus all of src/, demo/, tests/.
Prose lines: lines inside /* */ blocks, // comments, <!-- --> blocks, markdown files, and it/test/describe titles.

Arms (all printed for reading in context; nothing here is a verdict):
  V1  changed value, ONE-word reading: a removed `--x: v` and an added `--x: v'` in the same file (any file the
      patch touches, every arm: :root, .dark, @media), v not among the added values of --x; a prose line carrying
      the literal v (word-bounded) and at least one word (>= 3 letters) of x's name.
  V2  changed value, the token named: a prose line naming `--x` in full and carrying v.
  D   deleted token: a `--x:` declaration on a removed line, no `--x:` declaration anywhere in the patched tree;
      a prose line naming `--x` in full.
"""
import os
import re
import sys

patch, tree, head = sys.argv[1], sys.argv[2], sys.argv[3]
TEXT = (".css", ".ts", ".vue", ".js", ".mjs", ".md", ".json", ".html")

paths, cur = [], None
removed, added = {}, {}
for line in open(patch, encoding="utf-8", errors="replace"):
    m = re.match(r"^diff --git a/(\S+) b/(\S+)", line)
    if m:
        cur = m.group(2)
        paths.append(cur)
        continue
    if cur is None or line.startswith(("---", "+++")):
        continue
    for sign, store in (("-", removed), ("+", added)):
        if line.startswith(sign):
            body = line[1:]
            if re.match(r"\s*(/\*|\*|//)", body):
                continue
            for d in re.finditer(r"(--[a-z0-9-]+)\s*:\s*([^;{}]+?)\s*(?:;|$)", body):
                store.setdefault((cur, d.group(1)), set()).add(d.group(2).strip())

changed = {}
for (f, tok), olds in removed.items():
    news = added.get((f, tok))
    if not news:
        continue
    for v in olds:
        if v in news:
            continue
        if re.fullmatch(r"-?\d*\.?\d+(px|rem|em|%|ms|s|deg)?", v):
            changed.setdefault(tok, set()).add(v)


def files_in_scope():
    out = set()
    for root in ("src", "demo", "tests"):
        for dp, _, fs in os.walk(os.path.join(tree, root)):
            for fn in fs:
                if fn.endswith(TEXT):
                    out.add(os.path.relpath(os.path.join(dp, fn), tree))
    for p in paths:
        if os.path.exists(os.path.join(tree, p)) and p.endswith(TEXT):
            out.add(p)
    return sorted(out)


def declared_anywhere(tok):
    pat = re.compile(r"^\s*(?:[^/*\s][^;]*?;\s*)?" + re.escape(tok) + r"\s*:")
    for f in files_in_scope():
        if not f.startswith("src/"):
            continue
        for ln in prose_and_code(f):
            if pat.search(ln[1]):
                return True
    return False


_cache = {}


def prose_and_code(f):
    """yield (lineno, text, is_prose)"""
    if f in _cache:
        return _cache[f]
    try:
        lines = open(os.path.join(tree, f), encoding="utf-8", errors="replace").read().split("\n")
    except OSError:
        _cache[f] = []
        return []
    out, inblock, inhtml = [], False, False
    md = f.endswith(".md")
    for i, t in enumerate(lines, 1):
        prose = md
        s = t.strip()
        if inblock:
            prose = True
            if "*/" in t:
                inblock = False
        elif inhtml:
            prose = True
            if "-->" in t:
                inhtml = False
        else:
            if "/*" in t:
                prose = True
                if "*/" not in t[t.index("/*") :]:
                    inblock = True
            if "<!--" in t:
                prose = True
                if "-->" not in t[t.index("<!--") :]:
                    inhtml = True
            if s.startswith("//") or re.search(r"\s//\s", t):
                prose = True
            if re.search(r"\b(it|test|describe)(\.\w+)?\(\s*[\"'`]", t):
                prose = True
        out.append((i, t, prose))
    _cache[f] = out
    return out


scope = files_in_scope()
print(f"# patch {os.path.basename(patch)}: {len(paths)} paths; scope {len(scope)} files; changed tokens {len(changed)}")
for tok, vs in sorted(changed.items()):
    print(f"#   changed {tok}: {sorted(vs)}")

n = 0
for tok, vs in sorted(changed.items()):
    words = [w for w in tok[2:].split("-") if len(w) >= 3]
    for v in vs:
        lit = re.compile(r"(?<![\w.])" + re.escape(v) + r"(?![\w])")
        for f in scope:
            for i, t, prose in prose_and_code(f):
                if not prose or not lit.search(t):
                    continue
                if tok in t:
                    print(f"V2 {f}:{i} [{tok} {v}] {t.strip()[:200]}")
                    n += 1
                elif any(re.search(r"\b" + w + r"\w*", t, re.I) for w in words):
                    print(f"V1 {f}:{i} [{tok} {v}] {t.strip()[:200]}")
                    n += 1

deleted = set()
for (f, tok), olds in removed.items():
    if f.startswith("src/") and tok not in deleted and not declared_anywhere(tok):
        deleted.add(tok)
print(f"# deleted tokens (declared on a removed src line, declared nowhere in the patched src): {len(deleted)}")
for tok in sorted(deleted):
    pat = re.compile(re.escape(tok) + r"(?![\w-])")
    for f in scope:
        for i, t, prose in prose_and_code(f):
            if prose and pat.search(t):
                print(f"D {f}:{i} [{tok}] {t.strip()[:200]}")
                n += 1
print(f"SWEEP lines={n}")
