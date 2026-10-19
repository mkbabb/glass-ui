"""MS8-aids.py · two reads that guide where R-26's clause-by-clause reading must look hardest (FV9 §4's method):
(1) the printed lines the minor v8's patch itself writes (a '+' line in minor-split-v8.patch at that new line number);
(2) the printed lines that name a custom property whose declared value the patch changes (a name declared on a '-' line
and on a '+' line of the same file with different values). Usage: python3 -I MS8-aids.py <patch> <sweep LIST log> <out1> <out2>"""
import re, sys
patch, log, out1, out2 = sys.argv[1:5]
added = {}; changed = set(); cur = None
decl = re.compile(r'^\s*(--[a-z0-9-]+)\s*:\s*(.+?);?\s*$')
minus, plus = {}, {}
for line in open(patch, encoding='utf-8', errors='replace'):
    if line.startswith('+++ b/'):
        cur = line[6:].strip(); continue
    if line.startswith('--- '):
        continue
    m = re.match(r'^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@', line)
    if m:
        n = int(m.group(1)); continue
    if cur is None or line.startswith('diff --git'):
        continue
    if line.startswith('+'):
        added.setdefault(cur, set()).add(n)
        d = decl.match(line[1:])
        if d: plus.setdefault(d.group(1), set()).add(d.group(2).strip())
        n += 1
    elif line.startswith('-'):
        d = decl.match(line[1:])
        if d: minus.setdefault(d.group(1), set()).add(d.group(2).strip())
    elif line.startswith(' '):
        n += 1
for k in set(minus) & set(plus):
    if minus[k] != plus[k]: changed.add(k)
printed = []
for line in open(log, encoding='utf-8'):
    m = re.match(r'^· (\S+):(\d+) ', line)
    if m: printed.append((m.group(1), int(m.group(2))))
text = {}
cur = None
for line in open(log, encoding='utf-8'):
    m = re.match(r'^· (\S+):(\d+) ', line)
    if m: cur = (m.group(1), int(m.group(2))); continue
    m = re.match(r'^\s+>\s+\d+ \| (.*)$', line)
    if m and cur: text[cur] = m.group(1)
with open(out1, 'w') as f:
    for at in printed:
        if at[1] in added.get(at[0], ()): f.write(f"{at[0]}:{at[1]}\n")
with open(out2, 'w') as f:
    f.write(f"# {len(changed)} names whose declared value the patch changes\n")
    for at in printed:
        t = text.get(at, '')
        hit = sorted(k for k in changed if re.search(re.escape(k) + r'(?![a-z0-9-])', t))
        if hit: f.write(f"{at[0]}:{at[1]} {' '.join(hit)}\n")
print(f"printed {len(printed)}; written by the patch {sum(1 for a in printed if a[1] in added.get(a[0], ()))}; naming a changed value: see {out2}; changed names {len(changed)}")
