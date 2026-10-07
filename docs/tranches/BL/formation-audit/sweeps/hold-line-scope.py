"""Class sweep: a static hold line fenced to fewer files than its own wave writes (pass 10, FJ-04).

A hold line passes at HEAD and earns its place by its bite: the regression it fails on. When its pathspec covers
only some of the files the wave's §4 says the cure writes, the regression written in any other file passes it, so
the bite holds only where the cure is least likely to land. W-H.6 H6-G3 scanned `ladder.css` while §4 and §3 put the
overshoot in `material.css` and four more files. This lists every instance it can read:

  SCOPE   a labelled hold line that asserts absence (`!`, `test -z`, a zero count, `grep -v`) and whose static span names paths (a `git grep … -- <paths>`, a `grep`/`rg`/`sed`/`node -e`
          file argument), and a `src/` or `demo/` file the same spec's §4 lists, with a file type the span reads, that no named path
          covers (equal, under a named directory, or matched by a named glob or brace list)

A hold that asserts presence is not read: moved or written elsewhere, it fails closed. A span whose subject is one named file by design (an export barrel, a test file the wave deletes) is still listed;
the cure is to widen the span or to say in §4 that the file is outside the hold. Exit 1 while any row is open.
BL_ROOT reads another copy.
"""
import fnmatch
import re
import sys

from gates import gates
from plan_dag import section

ABSENCE = re.compile(r"^\s*!|test -z|-eq 0\b|\b= 0\b|grep -v")  # a hold that asserts absence; a presence hold fails closed when its file moves
PATH = re.compile(r"(?<![\w$])((?:src|demo|tests|scripts|\.github)/[\w./{},*@-]*)")


def braces(p):
    m = re.search(r"\{([^{}]*)\}", p)
    if not m:
        return [p]
    return [x for alt in m.group(1).split(",") for x in braces(p[: m.start()] + alt + p[m.end():])]


def ext(p):
    m = re.search(r"\.([a-z0-9]+)$", p)
    return m.group(1) if m else None


def covered(f, paths):
    for p in paths:
        p = p.rstrip("/")
        if f == p or f.startswith(p + "/") or fnmatch.fnmatch(f, p) or fnmatch.fnmatch(f, p + "/*"):
            return True
        if "**" in p and fnmatch.fnmatch(f, p.replace("**/", "*")):
            return True
    return False


def main():
    out = []
    n = 0
    for g in gates():
        if g.struck or not g.hold:
            continue
        spans = [s for s in g.spans if re.match(r"^\s*(?:!\s*)?(?:test|grep|git grep|rg|sed|node -e|awk)\b", s) and ABSENCE.search(s)]
        if not spans:
            continue
        paths = [x for s in spans for p in PATH.findall(s.split(" -- ", 1)[1] if " -- " in s else s) for x in braces(p.rstrip("'\")"))]
        paths = [p for p in paths if not p.endswith(".mjs") or "node -e" in " ".join(spans)]
        if not paths:
            continue
        n += 1
        exts = {ext(p) for p in paths if ext(p)} or None
        s4 = section(g.wave, 4)
        files = sorted({x for p in PATH.findall(s4) for x in braces(p.split(":")[0].rstrip(".,;)"))})
        for f in files:
            if not f.startswith(("src/", "demo/")) or not ext(f) or (exts and ext(f) not in exts):
                continue
            if exts is None and not any(f.startswith(p.rstrip("/") + "/") for p in paths):
                continue
            if not covered(f, paths):
                out.append(f"OPEN SCOPE  waves/{g.wave}.md:{g.line} {g.gid[:40]}: reads {', '.join(sorted(set(paths)))[:120]}; §4 lists `{f}`, which it does not read")
    for r in out:
        print(r)
    print(f"static hold lines with paths {n}, open {len(out)}")
    return 1 if out else 0


if __name__ == "__main__":
    sys.exit(main())
