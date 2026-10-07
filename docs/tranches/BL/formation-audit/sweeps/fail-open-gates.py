"""Class sweep: a gate in a fail-open form that reads its pass value at HEAD (pass 10, FJ-02 and FJ-03).

A fail-open form is one where an absent reader, an unmatched pattern or a grep error reads as the pass value: a
`!` negation, `test -z`, a zero count (`-eq 0`, `= 0`, "prints 0"), or a printed value. Pass 10 found two: W-0.11
G1-G3 count lines from a census the wave lands (absent at HEAD, so `grep -c` prints the pass value 0), and W-0.8
G18 greps a docket row for a bare `pending` cell that carries a suffix. This lists every instance it can read:

  PASS-AT-HEAD  a §5 row with a fail-open span whose every light span, run at <root> in rendered form, reads its
                pass value, and the row is not a labelled hold line (PLAN §1: no gate enters a wave green)
  PIPE-MASK     a span that pipes a script reader (`node`, `bash`, `sh`, `python3` on a file) into a count or a
                negated match: the pipeline's status is the last command's, so a reader that is absent or crashes
                reads as a pass. A gate reads the reader's own summary line with a positive match instead
  DOCKET        a docket gate (`grep … '^\\| <row> \\|.*\\| pending'`) whose LEDGER §4 row is missing, whose answer
                cell holds `pending` with other words (the PLAN §1 template matches a bare cell only), or which
                exits 0 at <root> while the row is pending

"Light" spans are the ones that need no build, browser, network or placeholder: spans naming npm, npx, vitest,
playwright, vite, gh, `$H`, `$D3_OUT`, `dist/`, `.cache/`, a `<placeholder>` or `…` are not run, and a row with one
is not judged by the run arm. A span's reads of `LEDGER.md`, `PLAN.md` and `waves/` read the plan copy under audit (a row that needs a prior run, "after any `npx playwright test`", is judged at its wave). Usage: fail-open-gates.py <root>, where <root> is a checkout of HEAD (a worktree; the
spans run there). Exit 1 while any row is open. BL_ROOT reads another copy of the plan.
"""
import concurrent.futures as cf
import os
import re
import signal
import subprocess
import sys

from gates import gates
from plan_dag import BL

HEAVY = re.compile(r"\b(npx|npm|vitest|playwright|vite|gh|curl)\b|\$H\b|\$D3_OUT|\bdist/|\.cache/|<(?!/?style\b)[A-Za-z][^<>]*>|…")  # a `<placeholder>`; an awk `/<style/` or a regex `[<>]` is not one
CMD = re.compile(r"^\s*(?:!\s*)?(?:test|grep|git|rg|node|sed|awk|find|ls|diff|cat|wc|python3|bash|sh)\b")
FAILOPEN = re.compile(r"^\s*!|test -z|-eq 0\b|\b= 0\b|\|\s*grep -c|\bgrep -c\b|\brg -c\b|\|\s*wc -l")
READER = re.compile(r"^\s*!?\s*(?:node|bash|sh|python3)\s+[\w./-]+\.(?:m?js|sh|py)\b[^|]*\|")
COUNTISH = re.compile(r"\|\s*grep -c|\|\s*wc -l|^\s*!|test -z")  # a positive `| grep -q` fails closed
DOCKET = re.compile(r"grep -q?E? *'\^\\\| ((?:OW|DOCKET)-[\w.-]+) \\\|\.\*\\\| pending")


def prints(passes):
    """The value a printing gate passes on: "prints 0", or a bare value cell such as "0" or "`4.0.1`"."""
    m = re.match(r"prints\s+`?([^`:;,\s]+)`?", passes) or re.fullmatch(r"`?(-?\d+|\d+\.\d+\.\d+)`?", passes.strip())
    return m.group(1) if m else None


def run(root, span, timeout=60):
    # a span that reads a plan file reads the copy under audit (BL), not <root>'s committed one
    span = re.sub(r"docs/tranches/BL/(LEDGER\.md|PLAN\.md|waves/)", lambda m: f"{BL}/{m.group(1)}", span)
    p = subprocess.Popen(["bash", "-c", span], cwd=root, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL, text=True,
                         start_new_session=True)
    try:
        out, _ = p.communicate(timeout=timeout)
        return p.returncode, out
    except subprocess.TimeoutExpired:
        os.killpg(p.pid, signal.SIGKILL)
        return "TIMEOUT", ""


def ledger_docket():
    rows = {}
    sec = (BL / "LEDGER.md").read_text().split("## 4 · Owner docket", 1)[1].split("\n## ", 1)[0]
    for line in sec.splitlines():
        c = [x.strip() for x in line.strip().strip("|").split("|")]
        if len(c) >= 6 and re.fullmatch(r"(?:OW|DOCKET)-[\w.-]+", c[0]):
            rows[c[0]] = c[3]
    return rows


def main():
    root = sys.argv[1] if len(sys.argv) > 1 else None
    if not root or not os.path.isdir(os.path.join(root, ".git")) and not os.path.isfile(os.path.join(root, ".git")):
        print("usage: fail-open-gates.py <root: a checkout of HEAD>")
        return 2
    gs = [g for g in gates() if not g.struck]
    docket = ledger_docket()
    out = []

    # PIPE-MASK and DOCKET (static)
    for g in gs:
        for s in g.spans:
            if READER.search(s) and (COUNTISH.search(s) or prints(g.passes) == "0"):
                out.append(f"OPEN PIPE-MASK    waves/{g.wave}.md:{g.line} {g.gid[:40]}: `{s[:100]}` pipes a script reader into a count or a negation")
            m = DOCKET.search(s)
            if not m and "LEDGER.md" in s and "pending" in s:
                out.append(f"OPEN DOCKET       waves/{g.wave}.md:{g.line} {g.gid[:40]}: `{s[:90]}` reads a docket row outside the PLAN §1 template's rendered form")
            if m:
                rid = m.group(1)
                if rid not in docket:
                    out.append(f"OPEN DOCKET       waves/{g.wave}.md:{g.line} {g.gid[:40]}: reads docket row {rid}, which LEDGER §4 does not have")
                elif "pending" in docket[rid] and docket[rid] != "pending":
                    out.append(f"OPEN DOCKET       LEDGER §4 {rid}: answer cell \"{docket[rid][:60]}\" is not a bare `pending`, so the gate in waves/{g.wave}.md:{g.line} cannot match it")

    # PASS-AT-HEAD (run)
    todo = []
    for g in gs:
        cmds = [s for s in g.spans if CMD.match(s)]
        if not cmds or not any(FAILOPEN.search(s) or prints(g.passes) is not None for s in cmds):
            continue
        if any(HEAVY.search(s) for s in g.spans):
            continue
        todo.append((g, cmds))
    jobs = [(i, s) for i, (_, cmds) in enumerate(todo) for s in cmds]
    res = {}
    with cf.ThreadPoolExecutor(4) as ex:
        for (i, s), r in zip(jobs, ex.map(lambda j: run(root, j[1]), jobs)):
            res.setdefault(i, []).append((s, r))
    ran = 0
    for i, (g, cmds) in enumerate(todo):
        ran += 1
        want = prints(g.passes)
        verdicts = []
        for s, (rc, so) in res[i]:
            if rc == "TIMEOUT":
                verdicts.append(None)
            elif want is not None and len(cmds) == 1:
                last = so.strip().splitlines()[-1].strip() if so.strip() else ""
                verdicts.append(last == want)
            else:
                verdicts.append(rc == 0)
        if None in verdicts:
            out.append(f"OPEN TIMEOUT      waves/{g.wave}.md:{g.line} {g.gid[:40]}: a span timed out; not judged")
            continue
        if all(verdicts) and not g.hold:
            out.append(f"OPEN PASS-AT-HEAD waves/{g.wave}.md:{g.line} {g.gid[:40]}: every span reads its pass value at HEAD"
                       f" (exit {[r[1][0] for r in res[i]]}); HEAD cell: \"{g.head[:70]}\"")
        if docket and any(DOCKET.search(s) for s in cmds):
            rid = DOCKET.search(next(s for s in cmds if DOCKET.search(s))).group(1)
            if rid in docket and "pending" in docket[rid] and all(verdicts):
                out.append(f"OPEN DOCKET       waves/{g.wave}.md:{g.line} {g.gid[:40]}: exits 0 while {rid} reads pending")
    for r in out:
        print(r)
    print(f"gate rows {len(gs)}, fail-open rows run {ran}, docket rows {len(docket)}, open {len(out)}")
    return 1 if out else 0


if __name__ == "__main__":
    sys.exit(main())
