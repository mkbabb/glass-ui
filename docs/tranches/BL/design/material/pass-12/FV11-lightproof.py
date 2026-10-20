#!/usr/bin/env python3
"""FV11-lightproof.py · D3 pass 12, floor v11: the light-mode byte proof for R-32's dark arm, read off the BUILT
specimen CSS (no browser). Two halves:
  (1) THE DIFF. Every declaration of floor v11a's and floor v11's specimen CSS, keyed by its block path (the chain of
      selectors and at-rule preludes around it), its property and its occurrence. Every key whose value differs is
      printed and classed: DARK (its block path names `.dark`), CHAIN (the `.glass-focus-veil` rule's backdrop-filter
      pair), TONE-LIGHT (the one new light `--glass-focus-veil-tone`). Any other difference is a FAIL: a light byte moved.
  (2) THE RESOLUTION. The veil's `backdrop-filter`, `-webkit-backdrop-filter` and `background`, resolved by var()
      substitution against the custom properties the built CSS declares on light `:root` blocks (and, for dark, those
      blocks then every `.dark` block in source order). Every declaring block of each token the chain reads is listed,
      so a scope that could re-declare one under the veil shows. PASS needs the light resolution identical on both
      trees (and the dark one different).
  python3 -I FV11-lightproof.py <floor v11a specimen.css> <floor v11 specimen.css>"""
import re, sys
from collections import defaultdict

def blocks(css):
    """Yield (path, prop, value) for every declaration; path is the tuple of enclosing preludes."""
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    out, stack, buf, i, q = [], [], "", 0, None
    while i < len(css):
        ch = css[i]
        if q:
            buf += ch
            if ch == "\\": buf += css[i + 1]; i += 1
            elif ch == q: q = None
        elif ch in "\"'": q = ch; buf += ch
        elif ch == "(":  # keep parenthesised groups whole (url(), var() fallbacks, :is(), @supports conditions)
            depth, j = 0, i
            while j < len(css):
                if css[j] == "(": depth += 1
                elif css[j] == ")":
                    depth -= 1
                    if depth == 0: break
                j += 1
            buf += css[i:j + 1]; i = j
        elif ch == "{": stack.append(" ".join(buf.split())); buf = ""
        elif ch in ";}":
            d = buf.strip(); buf = ""
            if d and ":" in d and not d.startswith("@"):
                p, v = d.split(":", 1); out.append((tuple(stack), p.strip(), " ".join(v.split())))
            if ch == "}" and stack: stack.pop()
        else: buf += ch
        i += 1
    return out

def keyed(decls):
    seen, out = defaultdict(int), {}
    for path, p, v in decls:
        k = (path, p); seen[k] += 1; out[(path, p, seen[k])] = v
    return out

def dark(path): return any(re.search(r"(^|[\s,>+~(])\.dark\b", s) for s in path)
def supported(path):
    """Every enclosing at-rule is one the target engines pass: no @media, and @supports only on a colour feature
    (color-mix / oklab / lab), which Chromium, Playwright WebKit and Safari all support."""
    return all((not s.startswith("@media")) and (not s.startswith("@supports") or re.search(r"color-mix|oklab|\blab\(", s)) for s in path[:-1])
def root_light(path):
    """A block that matches <html> in light: the selector list names :root, no `.dark`, every at-rule around it passes."""
    return bool(path) and not dark(path) and supported(path) and re.search(r"(^|,)\s*:root\s*(,|$)", path[-1]) is not None
def root_dark(path):
    """A block that matches <html class="dark"> and is a dark arm: `.dark` (or `:root, .dark`), every at-rule passes."""
    return bool(path) and dark(path) and supported(path) and re.fullmatch(r"(:root\s*,\s*)?\.dark(\s*,\s*:root)?", path[-1]) is not None

def env(decls, with_dark):
    """Custom properties on <html>, in SOURCE ORDER: `:root` and `.dark` have equal specificity, so where both match
    <html class="dark"> the later declaration wins. Light reads the light :root blocks; dark reads those and the
    `.dark` blocks together, in the order the built CSS gives them."""
    e = {}
    for path, p, v in decls:
        if p.startswith("--") and (root_light(path) or (with_dark and root_dark(path))): e[p] = v
    return e

def resolve(v, e, depth=0):
    if depth > 20: return v + " /*cycle*/"
    def sub(m):
        name, fb = m.group(1), m.group(2)
        return resolve(e[name], e, depth + 1) if name in e else (resolve(fb.strip(), e, depth + 1) if fb is not None else f"<UNRESOLVED {name}>")
    prev = None
    while prev != v:
        prev, v = v, re.sub(r"var\(\s*(--[\w-]+)\s*(?:,\s*([^()]*(?:\([^()]*\)[^()]*)*))?\)", sub, v)
    return v

def veil_rule(decls):
    out = {}
    for path, p, v in decls:
        if path and re.fullmatch(r"\.glass-focus-veil", path[-1]) and p in ("backdrop-filter", "-webkit-backdrop-filter", "background"):
            out.setdefault(p, v)
    return out

if __name__ == "__main__":
    a_css, b_css = (open(f).read() for f in sys.argv[1:3])
    A, B = blocks(a_css), blocks(b_css)
    ka, kb = keyed(A), keyed(B)
    print(f"declarations: floor v11a {len(A)}, floor v11 {len(B)}")
    bad, rows = 0, []
    for k in sorted(set(ka) | set(kb), key=str):
        va, vb = ka.get(k), kb.get(k)
        if va == vb: continue
        path, p, n = k
        if dark(path): cls = "DARK"
        elif path and path[-1] == ".glass-focus-veil" and p in ("backdrop-filter", "-webkit-backdrop-filter"): cls = "CHAIN"
        elif p == "--glass-focus-veil-tone" and va is None and root_light(path): cls = "TONE-LIGHT"
        else: cls = "LIGHT BYTE MOVED ✗"; bad += 1
        rows.append(cls)
        print(f"  {cls:<20} {' » '.join(path)} {{ {p} }}#{n}\n      floor v11a: {va}\n      floor v11:  {vb}")
    print(f"differing declarations: {len(rows)} ({', '.join(f'{c} {rows.count(c)}' for c in dict.fromkeys(rows))})")
    print("\nevery block that declares a token the veil's chain or background reads (both trees):")
    for t in ("--glass-focus-veil-tone", "--glass-focus-veil-dim", "--glass-focus-veil-blur", "--glass-blur-floating-radius", "--glass-saturate", "--overlay-scrim-ink"):
        for name, D in (("floor v11a", A), ("floor v11", B)):
            where = [(" » ".join(path), v) for path, p, v in D if p == t]
            print(f"  {t} · {name}: {len(where)} — " + " | ".join(f"[{w}] {v}" for w, v in where))
    ok = bad == 0
    print("\nsource order on <html> of every declaration of the two re-valued tokens (equal specificity: the later wins):")
    for name, D in (("floor v11a", A), ("floor v11", B)):
        for k, (path, p, v) in enumerate(D):
            if p in ("--glass-focus-veil-tone", "--glass-focus-veil-dim") and (root_light(path) or root_dark(path)):
                print(f"  {name:<10} #{k:<5} [{' » '.join(path)}] {p}: {v}")
    print("\nresolved on the veil (light: the light :root blocks; dark: those and the `.dark` blocks, in source order):")
    res = {}
    for name, D in (("floor v11a", A), ("floor v11", B)):
        rule = veil_rule(D)
        for mode in ("light", "dark"):
            e = env(D, mode == "dark")
            for p in ("backdrop-filter", "-webkit-backdrop-filter", "background"):
                r = resolve(rule.get(p, "<absent>"), e); res[(name, mode, p)] = r
                print(f"  {name:<10} {mode:<5} {p:<24} {rule.get(p)}  →  {r}")
    for p in ("backdrop-filter", "-webkit-backdrop-filter", "background"):
        same = res[("floor v11a", "light", p)] == res[("floor v11", "light", p)]
        ok &= same
        print(f"  light {p}: floor v11a {'=' if same else '≠'} floor v11{'' if same else ' ✗'}")
    moved = [p for p in ("backdrop-filter", "background") if res[("floor v11a", "dark", p)] != res[("floor v11", "dark", p)]]
    print(f"  dark: moved {moved or 'NOTHING ✗'}")
    ok &= bool(moved)
    print(f"\nLIGHTPROOF {'PASS' if ok else 'FAIL'}: {len(rows)} differing declarations, {bad} outside the dark arm, the chain and the light tone; light chain and background {'identical' if ok else 'NOT identical'} after resolution")
    sys.exit(0 if ok else 1)
