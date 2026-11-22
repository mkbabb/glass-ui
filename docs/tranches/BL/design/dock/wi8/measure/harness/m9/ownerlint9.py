# ownerlint9.py <OWNER-READ.md> <fold-dir> [--section "<heading text>"]: MEASURE-9 part H, item H14 (RU-107). Reads the
# owner's page (one section of it, from the heading that contains the given text to the next heading of the same level,
# or the whole file) and lists what RU-107 rules out:
#   - a pointer to a `.webkit.png` strip for questions 5, 10, 14, 18 or 21 (shown from Chromium only);
#   - the words "Safari's engine" (a WebKit strip is "Playwright WebKit 2287, which draws the glass without its blur;
#     not what Safari shows");
#   - a pointer to a part H strip (`-8.` or `-9.` without `m`), which is cut mid-word and cited nowhere;
#   - a strip the page names that is not in the fold directory.
# Prints each finding with its line; exit 1 when there is one.
import os, re, sys
page, fold = sys.argv[1], sys.argv[2]
sec = sys.argv[sys.argv.index("--section") + 1] if "--section" in sys.argv else None
lines = open(page).read().split("\n")
a, b = 0, len(lines)
if sec:
    hs = [i for i, l in enumerate(lines) if l.startswith("#") and sec in l]
    if not hs: print(f"no heading contains {sec!r}"); sys.exit(2)
    a = hs[0]; lvl = len(lines[a]) - len(lines[a].lstrip("#"))
    b = next((i for i in range(a + 1, len(lines)) if re.match(r"^#{1,%d} " % lvl, lines[i])), len(lines))
found = []
for i in range(a, b):
    l = lines[i]
    for m in re.finditer(r"strip-q(\d+)[\w-]*?\.webkit\.png", l):
        if m.group(1) in {"5", "10", "14", "18", "21"}: found.append((i + 1, f"{m.group(0)}: question {m.group(1)} is shown from Chromium only"))
    if "Safari's engine" in l: found.append((i + 1, "\"Safari's engine\": a WebKit strip says it is Playwright WebKit 2287, without the blur"))
    for m in re.finditer(r"strip-[\w-]+?-(8|9)\.(?:chromium|webkit)\.png", l): found.append((i + 1, f"{m.group(0)}: a part H strip"))
    for m in re.finditer(r"(strip-[\w-]+?\.(?:chromium\.|webkit\.)?png)", l):
        if not os.path.exists(os.path.join(fold, m.group(1))): found.append((i + 1, f"{m.group(1)}: not in {fold}"))
for n, t in found: print(f"{page}:{n}: {t}")
print(f"{len(found)} findings in lines {a + 1} to {b}")
sys.exit(1 if found else 0)
