"""Class sweep: a gate whose RED is borrowed from another wave (FG-03; the FA-01/FA-02 'not RED at its base' class).

A gate in wave Y enters Y green, or reads RED only for a reason Y does not cure, when either holds:
  RESTATED  its command, normalised, is another wave's gate command (the later wave's copy enters green on the
            earlier wave's cure);
  BORROWED  its command runs a file another wave X lands (X's §4 lists it as new), X lands before Y, Y's §4
            does not edit that file, and Y's HEAD reading is the file's absence. At Y's base the file exists,
            so the recorded RED is not Y's defect.
  CURED-EARLIER  its command greps a pattern over a scope, and a gate of a wave X that lands before Y greps the
            same pattern over a scope that contains Y's (X's gate requires 0 hits there). At Y's base X has zeroed
            the pattern, so Y's grep enters green (fix-9: W-I.1 G13 against W-A.2 A2-G7, the latch class of FH-01).
Each listed row needs a reading in ADJUDICATED (key 'Y|gate id|kind'); a row with none is OPEN.
Exit 1 while any OPEN row stands, 0 when none does.
"""
import os
import re
import sys

from plan_dag import before, section, spec_ids

ROW = re.compile(r"^\|\s*([^|]*?)\s*\|(.*)$")
TICK = re.compile(r"`([^`]+)`")
ABSENT = re.compile(r"absent|Cannot find module|does not exist|no such file|not exist|no script|exit 2\b", re.I)
PATHS = re.compile(r"(?<![\w./-])((?:scripts|tests|tests-visual|\.github)/[\w./<>-]+\.(?:mjs|js|ts|json|yml|sh))")


def gates(w):
    out = []
    for line in section(w, 5).splitlines():
        if not line.startswith("|") or line.startswith("|---") or line.startswith("| id"):
            continue
        cells = [c.strip() for c in line.strip().strip("|").replace("\\|", "\x00").split("|")]
        cells = [c.replace("\x00", "|") for c in cells]
        if len(cells) < 4:
            continue
        gid, cmd, head = cells[0], cells[1], cells[3]
        if gid.startswith("~~"):
            continue
        out.append((gid.split(" · ")[0], cmd, head))
    return out


def norm(cmd):
    spans = TICK.findall(cmd)
    if not spans:
        return None
    c = " && ".join(spans)
    c = re.sub(r"\b(npm run build|git diff --quiet HEAD)\s*&&\s*", "", c)
    c = re.sub(r"\s+", " ", c).strip()
    return c if len(c) > 25 else None


GREP = re.compile(r"""(?:git grep|grep)\s+((?:-[\w]+\s+)*)(?:-e\s+)?(['"])(.+?)\2\s*(?:--\s*)?([^|&;)`]*)""")
LSFILES = re.compile(r"git ls-files\s+([^|&;)`]*)")


def greps(cmd):
    """(pattern, scope paths) for every grep in a gate's spans; a piped `git ls-files <scope> | grep` takes the
    ls-files scope."""
    out = []
    for span in TICK.findall(cmd):
        ls = LSFILES.search(span)
        lscope = ls.group(1).split() if ls else []
        for g in GREP.finditer(span):
            paths = [p for p in g.group(4).split() if not p.startswith("-")] or lscope
            out.append((g.group(3), paths))
    return out


def covers(outer, inner):
    if not outer:
        return True
    if not inner:
        return False
    return all(any(p == q or p.startswith(q.rstrip("/") + "/") for q in outer) for p in inner)


def new_files(w):
    s4 = section(w, 4)
    out = set()
    for m in re.finditer(r"New:?([^\n]*)", s4):
        clause = re.split(r"\b(?:Edited|Deleted|Moved)\b", m.group(1))[0]
        out.update(p for p in TICK.findall(clause) if "/" in p)
    for m in re.finditer(r"`([^`]+)`\s*\((?:new|lands)", s4):
        out.add(m.group(1))
    return {re.sub(r":\d+(-\d+)?$", "", p) for p in out}


# Each row read by fix-8 (formation-audit/fix-8.md, FG-03): key 'Y|gate|kind' -> the reason it is not OPEN.
ADJUDICATED = {
    'W-I.1|G13|CURED-EARLIER':
        "re-founded by fix-9 (FH-01): `test ! -e tests/owed/g-dock-lattice.test.ts && …`; W-A.2's owed file holds it RED at the wave's base, and only W-I.1's move home clears it",
}
# SWEEP_RAW=1 drops every reading, so the run is the bare enumeration (the record of the class before a cure).
if os.environ.get("SWEEP_RAW"):
    ADJUDICATED = {}


def main():
    ids = spec_ids()
    allg = {w: gates(w) for w in ids}
    landers = {w: new_files(w) for w in ids}
    rows = []
    seen = {}
    for w in ids:
        for gid, cmd, head in allg[w]:
            n = norm(cmd)
            if n:
                seen.setdefault(n, []).append((w, gid))
    for n, hits in seen.items():
        waves = {w for w, _ in hits}
        if len(waves) < 2:
            continue
        for w, gid in hits:
            others = ", ".join(f"{x}:{g}" for x, g in hits if x != w)
            rows.append((w, gid, "RESTATED", f"same command as {others}"))
    for y in ids:
        s4y = section(y, 4)
        for gid, cmd, head in allg[y]:
            if not ABSENT.search(head):
                continue
            for p in set(PATHS.findall(" ".join(TICK.findall(cmd)))):
                for x in ids:
                    if x == y or not before(x, y):
                        continue
                    if any(p == q or p.startswith(q.rstrip("*").rstrip("/") + "/") for q in landers[x]) and p not in s4y:
                        rows.append((y, gid, "BORROWED", f"{p} landed by {x}"))
    for y in ids:
        for gid, cmd, head in allg[y]:
            for pat, paths in greps(cmd):
                for x in ids:
                    if x == y or not before(x, y):
                        continue
                    for gx, cx, _ in allg[x]:
                        if any(px == pat and covers(ppx, paths) for px, ppx in greps(cx)):
                            rows.append((y, gid, "CURED-EARLIER", f"`{pat}` over {paths or 'the tree'} is zeroed by {x}:{gx}"))
    open_n = 0
    for y, gid, kind, why in sorted(set(rows)):
        verdict = ADJUDICATED.get(f"{y}|{gid}|{kind}")
        status = "read" if verdict else "OPEN"
        open_n += status == "OPEN"
        print(f"{status:4} {kind:8} {y} {gid} :: {why}" + (f"  [{verdict}]" if verdict else ""))
    keys = {f"{y}|{g}|{k}" for y, g, k, _ in rows}
    stale = sorted(set(ADJUDICATED) - keys)
    for k in stale:
        print(f"STALE adjudication with no row: {k}")
    print(f"rows {len(set(rows))}, open {open_n}, stale {len(stale)}")
    sys.exit(1 if open_n or stale else 0)


if __name__ == "__main__":
    main()
