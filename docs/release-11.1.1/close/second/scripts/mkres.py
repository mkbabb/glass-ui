# The 11.1.1 third close: from sort.sh's outputs, the branch-only titles whose first error is not
# master's tip's (errs.py's DIFF lines, line-aligned with the branch-only list), written as a list of
# spec files and one -g regex of their test titles (the last part of each title, escaped).
#   python3 -I mkres.py <out-stem> <stem>-branch-only.txt <stem>-errs-vs-master.txt ...   (pairs)
import re, sys
out, args = sys.argv[1], sys.argv[2:]
files, titles = set(), []
for bo, ev in zip(args[0::2], args[1::2]):
    rows = [l.rstrip("\n") for l in open(bo) if l.strip()]
    verdicts = [l.split("\t", 1)[0] for l in open(ev) if l.strip()]
    assert len(rows) == len(verdicts), (bo, len(rows), len(verdicts))
    for row, v in zip(rows, verdicts):
        if v == "same":
            continue
        f, title = row.split("\t", 1)
        files.add(f)
        titles.append(title)
open(out, "w").write("".join(f + "\n" for f in sorted(files)))
last = sorted(set(t.split(" > ")[-1] for t in titles))
open(out + ".grep", "w").write("|".join(re.escape(t) for t in last) + "\n")
open(out + ".titles", "w").write("".join(f + "\n" for f in titles))
print(f"{len(titles)} titles in {len(files)} files")
