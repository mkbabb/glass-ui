# g14errs.py <logs-dir> <tag-prefix> [base-tag]: for each test that fails on <tag> and passes on base,
# print project, spec:line, title and the first error line (the list reporter's numbered failure blocks).
# Output TSV: proj, file, line, title, err
import re, sys, glob, json
d, tag = sys.argv[1], sys.argv[2]
base = sys.argv[3] if len(sys.argv) > 3 else None
HEAD = re.compile(r"^\s+\d+\) \[([^\]]+)\] › (\S+?):(\d+):\d+ › (.*?)\s*$")
LINE = re.compile(r"^\s+([✓✘-])\s+\d+\s+\[([^\]]+)\]\s+›\s+(\S+?):(\d+):\d+\s+›\s+(.*?)(?:\s+\(\d+(?:\.\d+)?m?s\))?\s*$")
def status(t):
    out = {}
    for f in sorted(glob.glob(f"{d}/{t}-*.log")):
        for l in open(f, encoding="utf-8"):
            m = LINE.match(l)
            if not m: continue
            st, proj, fn, ln, title = m.groups()
            k = (proj, fn.split("/")[-1], title)
            prev = out.get(k)
            out[k] = "flaky" if prev == "fail" and st == "✓" else ("pass" if st == "✓" else "fail" if st == "✘" else "skip")
    return out
def errors(t):
    out = {}
    for f in sorted(glob.glob(f"{d}/{t}-*.log")):
        lines = open(f, encoding="utf-8").read().split("\n")
        i = 0
        while i < len(lines):
            m = HEAD.match(lines[i])
            if m:
                proj, fn, ln, title = m.groups()
                title = re.sub(r"\s+$", "", title)
                err = ""
                j = i + 1
                while j < len(lines) and not HEAD.match(lines[j]):
                    s = lines[j].strip()
                    if s.startswith("Error:") or s.startswith("TimeoutError") or s.startswith("Test timeout"):
                        err = s; break
                    j += 1
                k = (proj, fn.split("/")[-1], title.replace(" ──", "").strip())
                out.setdefault(k, (ln, err))
            i += 1
    return out
b = status(tag); e = errors(tag)
m = status(base) if base else {}
for k, st in sorted(b.items()):
    if st != "fail": continue
    if base and m.get(k) != "pass": continue
    ln, err = e.get(k, ("?", ""))
    if ln == "?":
        # retries print "Retry #n" suffix; try prefix match
        for kk, v in e.items():
            if kk[0] == k[0] and kk[1] == k[1] and kk[2].startswith(k[2][:60]): ln, err = v; break
    print("\t".join([k[0], k[1], ln, k[2], err[:220]]))
