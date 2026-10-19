"""MS9-seat-proposed.py · the measured comment delta MINOR-SPLIT-v9.md §4.3 proposes for the next comment-only build or
the landing docs pass (NOT in the minor v9: R-29 is its whole delta). tests/styles/glass-subtlety.test.ts:193-194, two
lines for two, the file keeping its line count; each old string must occur exactly once.
Usage: python3 -I MS9-seat-proposed.py <tree root>"""
import sys, pathlib
p = pathlib.Path(sys.argv[1]) / "tests/styles/glass-subtlety.test.ts"
s = p.read_text()
old = ("        // near-black ink over paper (O-62). Dark: the sign law holds, the rung darkens\n"
       "        // what is behind it.\n")
new = ("        // near-black ink over paper (O-62). Dark: the ink stays near-black (L 0.17 < 0.5,\n"
       "        // asserted below), never the cream foreground.\n")
assert s.count(old) == 1, s.count(old)
n = s.count("\n"); s = s.replace(old, new); assert s.count("\n") == n
p.write_text(s); print(f"{p}: rewrote :193-194 ({n} lines kept)")
