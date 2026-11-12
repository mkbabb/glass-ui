# P-E15 part B: splice the part-B text into P-E15.md, replacing everything from its "# P-E15, part B" heading on. Placeholders
# @@NAME@@ are filled from a JSON map (missing ones read "pending: the WebKit acquisitions are queued").  usage: splice15.py <partB.md> <fill.json>
import json, pathlib, re, sys
src, fill = pathlib.Path(sys.argv[1]).read_text(), json.loads(pathlib.Path(sys.argv[2]).read_text())
body = re.sub(r"@@([A-Za-z0-9-]+)@@", lambda m: fill.get(m.group(1), "pending: the WebKit acquisitions are queued"), src)
p = pathlib.Path(__file__).resolve().parent.parent / "P-E15.md"; s = p.read_text()
i = s.index("# P-E15, part B: the build (§P14-8.2 wave 3)")
p.write_text(s[:i] + body)
print("spliced", len(body), "chars; unfilled:", sorted(set(re.findall(r"@@([A-Za-z0-9-]+)@@", src)) - set(fill)))
