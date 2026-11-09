# redsum.py <battery dir>: every non-PASS cell line of the battery (main and re-runs), with its failed checks and load
import glob, re, sys, os
for f in sorted(glob.glob(sys.argv[1] + "/bp13-*.log")):
    for l in open(f, encoding="utf8"):
        m = re.match(r"^(FAIL|NOT-REPRODUCED|OWNER-BLOCKED|UNMEASURED)  (\w+)  (Chromium|Playwright WebKit)  (\S+)", l)
        if not m: continue
        fl = re.search(r"⟶ (FAILED: [^\[]*|OWNER-BLOCKED[^\[]*|UNMEASURED[^\[]*|NOT-REPRODUCED[^\[]*)", l)
        ld = re.search(r"\[load ([\d.]+)\]", l)
        print("%-44s %-15s %-6s %-18s %-34s %s load %s" % (os.path.basename(f), m.group(1), m.group(2), m.group(3), m.group(4), (fl.group(1).strip() if fl else "").ljust(30), ld.group(1) if ld else "?"))
