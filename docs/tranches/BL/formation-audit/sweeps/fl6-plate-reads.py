"""Class sweep: a state fill or dim reads a `--glass-plate-*` rung, and the plan names no cure for it (FE-02, FF-03, FG-02).

Source half: every `var(--glass-plate-…)` read in a checkout's tracked `src/**/*.{css,vue}`, comments blanked, by file:line.
Plan half, against W-H.1 (the one source of record for FL-6's list, W-H.1 §3.2 item 8):
  GATE      W-H.1 appendix C (H1-G23's reader) exists; it is run on the checkout and must flag a set of lines;
  NAMED     every line the reader flags is cited in §3.2 item 8 (path suffix + line, list or range);
  SURFACE   every read the reader passes sits in a rule on its SURFACES set (by construction of the reader).
A read is OPEN when the reader is absent and item 8 does not cite it, or when the reader flags it and item 8 does not cite it.
Exit 1 while any read is OPEN, 0 when none is.

  python3 fl6-plate-reads.py <checkout> [<W-H.1.md>]
"""
import re
import subprocess
import sys
import tempfile
from pathlib import Path

from plan_dag import WAVES

root = Path(sys.argv[1]).resolve()
spec = Path(sys.argv[2]) if len(sys.argv) > 2 else WAVES / "W-H.1.md"
text = spec.read_text()

files = subprocess.run(["git", "ls-files", "--", "src/*.css", "src/*.vue"], cwd=root, capture_output=True, text=True, check=True).stdout.split()
reads = []
for f in files:
    t = (root / f).read_text()
    t = re.sub(r"/\*.*?\*/", lambda m: re.sub(r"[^\n]", " ", m.group(0)), t, flags=re.S)
    for m in re.finditer(r"var\(\s*--glass-plate-[\w-]+", t):
        reads.append((f, t.count("\n", 0, m.start()) + 1))

m8 = re.search(r"^8\. \*\*No state fill or dim reads a plate token\*\*.*$", text, re.M)
item8 = m8.group(0) if m8 else ""
cited = set()
for path, spec_lines in re.findall(r"`([\w./-]+\.(?:css|vue)):([\d,\-]+)`", item8):
    for part in spec_lines.split(","):
        if "-" in part:
            a, b = part.split("-")
            cited.update((path, n) for n in range(int(a), int(b) + 1))
        elif part:
            cited.add((path, int(part)))


def is_cited(f, line):
    return any((f == p or f.endswith("/" + p)) and line == n for p, n in cited)


gate = re.search(r"## Appendix C · `plate-reads\.mjs`.*?```js\n(.*?)```", text, re.S)
flagged = None
if gate:
    with tempfile.TemporaryDirectory() as d:
        js = Path(d) / "plate-reads.mjs"
        js.write_text(gate.group(1))
        out = subprocess.run(["node", str(js), str(root)], capture_output=True, text=True).stdout
    flagged = {(l.split(":")[0], int(l.split(":")[1].split()[0])) for l in out.splitlines() if re.match(r"src/\S+:\d+ ", l)}

open_n = 0
print(f"spec {spec.name}; appendix C reader {'present' if gate else 'ABSENT'}; item 8 cites {len(cited)} lines")
for f, line in reads:
    if flagged is None:
        status = "named" if is_cited(f, line) else "OPEN"
        why = "cited in item 8" if status == "named" else "no reader, not cited in item 8"
    elif (f, line) in flagged:
        status = "named" if is_cited(f, line) else "OPEN"
        why = "flagged by H1-G23, cited in item 8" if status == "named" else "flagged by H1-G23, not cited in item 8"
    else:
        status, why = "surface", "passed by H1-G23 (a SURFACES rule)"
    open_n += status == "OPEN"
    print(f"{status:7} {f}:{line} :: {why}")
print(f"reads {len(reads)}, open {open_n}")
sys.exit(1 if open_n or flagged is None else 0)
