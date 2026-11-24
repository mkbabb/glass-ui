#!/bin/bash
# The 11.1.1 second close: each branch-only title of one project on master's tip (11.1.0's source with the
# rebuilt demo) in one guarded run; the titles that pass there run on the pre-merge tip and again
# on the branch, twice each. Every tree is a full git-archive tree under .cache/close-full.
#   resolve.sh <ch|co> <branch-only list>
C=$(cd "$(dirname "$0")/.." && pwd); G=~/.claude/guard/guarded; F=$C/../../../../.cache/close-full
X=$1; LIST=$2; S=$C/suite/resolve; mkdir -p $S
case $X in ch) P=chromium-headless-new;; co) P=coarse-touch;; esac
step() { # tag tree port list [extra]
  local tag=$1 tree=$2 port=$3 list=$4; shift 4
  python3 -I $C/scripts/rerun-args.py $list files > $S/$tag.files
  ROOT=$(cd $F/$tree/tree && pwd) $G --timeout 85 -- zsh $C/scripts/suite.sh resolve/$tag $port tests-visual/playwright.config.ts $P $S/$tag.files -g "$(python3 -I $C/scripts/rerun-args.py $list grep)" "$@" > $S/$tag.guard.log 2>&1
  echo "$(date '+%F %T') $tag guard-rc=$? $(grep -m1 -E '^\[guarded\] REFUSED' $S/$tag.guard.log)" | tee -a $C/suite/queue.txt
  grep -qE '^\[guarded\] REFUSED' $S/$tag.guard.log && exit 3; return 0; }
# coarse-touch: a title that already failed on master's tip in Chromium's resolution is
# attributed by that reading (same file, same title) and not run again.
if [ $X = co ] && [ -f $S/ch-master.json ]; then
  python3 -I - "$LIST" "$S/ch-master.json" > $S/co-to-run.txt 2> $S/co-by-parity.txt <<'PY'
import json, sys
want = [l.rstrip("\n") for l in open(sys.argv[1]) if l.strip()]
st = {}
def walk(s, p):
    for c in s.get("suites", []) or []:
        walk(c, p + ([c["title"]] if c.get("title") and not c["title"].endswith(".ts") else []))
    for sp in s.get("specs", []) or []:
        for t in sp.get("tests", []):
            st[f"{sp.get('file','')}\t{' > '.join(p + [sp['title']])}"] = t.get("status", "")
for s in json.load(open(sys.argv[2])).get("suites", []):
    walk(s, [])
for w in want:
    print(w, file=sys.stderr if st.get(w) == "unexpected" else sys.stdout)
PY
  echo "$(date '+%F %T') co: $(wc -l < $S/co-by-parity.txt | tr -d ' ') titles failed on master's tip in Chromium; $(wc -l < $S/co-to-run.txt | tr -d ' ') run" | tee -a $C/suite/queue.txt
  LIST=$S/co-to-run.txt
fi
[ -s $LIST ] && step $X-master master 5355 $LIST
python3 -I - "$LIST" "$S/$X-master.json" > $S/$X-candidates.txt <<'PY'
import json, sys
want = {l.rstrip("\n") for l in open(sys.argv[1]) if l.strip()}
st = {}
def walk(s, p):
    for c in s.get("suites", []) or []:
        walk(c, p + ([c["title"]] if c.get("title") and not c["title"].endswith(".ts") else []))
    for sp in s.get("specs", []) or []:
        for t in sp.get("tests", []):
            st[f"{sp.get('file','')}\t{' > '.join(p + [sp['title']])}"] = t.get("status", "")
for s in json.load(open(sys.argv[2])).get("suites", []):
    walk(s, [])
for w in sorted(want):
    if st.get(w) != "unexpected" and st.get(w) != "flaky":
        print(w)
PY
echo "$(date '+%F %T') $X: $(wc -l < $LIST | tr -d ' ') branch-only, $(wc -l < $S/$X-candidates.txt | tr -d ' ') not failing on master's tip" | tee -a $C/suite/queue.txt
[ -f $S/$X-master.json ] || : > $S/$X-candidates.txt
if [ -s $S/$X-candidates.txt ]; then
  step $X-premerge premerge 5356 $S/$X-candidates.txt
  step $X-head-x2 head 5353 $S/$X-candidates.txt --repeat-each=2
fi
