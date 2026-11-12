#!/bin/zsh
# 10.1.5 release close queue: each step its own guarded call (WebKit under --exclusive webkit,
# at most 90 min each), one at a time; a refusal ends the queue (exit 3).
#   zsh docs/release-10.1.5/scripts/close-queue.sh step...
# steps: ch-aa..ch-ah, af-1..af-4 (branch, chromium-headless-new, by spec list; af re-splits ch-af, whose 666 tests outrun one 90 min call), coarse (branch, coarse-touch,
#   every spec), wk-rest (branch WebKit 2287: every webkit-project spec but release-10-1-5), wk-a, wk-b
#   (release-10-1-5 in two processes split by title, as critique 16), floors (the three pixel-floor
#   arms of scripts/release.sh), coarse-aa..coarse-ad (branch, coarse-touch, every spec but the
#   release-10-1-5 critic/fix/d1 probes, which build their own coarse cells and ran only in
#   chromium-headless-new and webkit), v1014-in/v1014-out (the critics' `git archive v10.1.4 src demo`
#   copy the probes' v10.1.4 arms import, placed for af-1..af-4 and removed after), base-<project> (v10.1.4's own specs over lists/base-<project>.txt,
#   in the v10.1.4 archive tree), base-wk (v10.1.4's WebKit project).
set -u
WT=${0:A:h:h:h:h}
cd $WT
S=docs/release-10.1.5/scripts; L=docs/release-10.1.5/close/suite; LI=$L/lists; G=~/.claude/guard/guarded
B=.cache/close/v1014
mkdir -p $L
step() { local n=$1; shift; echo "$(date '+%F %T') $n queued" | tee -a $L/queue.txt; "$@" > $L/$n.guard.log 2>&1; local rc=$?
  echo "$(date '+%F %T') $n guard-rc=$rc $(grep -m1 -E 'REFUSED' $L/$n.guard.log)" | tee -a $L/queue.txt
  if grep -q REFUSED $L/$n.guard.log; then echo "$(date '+%F %T') STOP: refused at $n" | tee -a $L/queue.txt; exit 3; fi; }
for s in ${@}; do
  case $s in
    ch-*|af-*) step $s $G --timeout 90 -- zsh $S/close-suite.sh branch-$s . 5311 tests-visual/playwright.config.ts chromium-headless-new $LI/$s;;
    coarse-*) step $s $G --timeout 90 -- zsh $S/close-suite.sh branch-$s . 5311 tests-visual/playwright.config.ts coarse-touch $LI/$s;;
    v1014-in) mkdir -p tests-visual/release-10-1-5/v1014 && git archive v10.1.4 src demo | tar -x -C tests-visual/release-10-1-5/v1014 && echo "$(date '+%F %T') v1014-in" | tee -a $L/queue.txt;;
    v1014-out) rm -rf tests-visual/release-10-1-5/v1014 && echo "$(date '+%F %T') v1014-out" | tee -a $L/queue.txt;;
    wk-rest) step wk-rest $G --exclusive webkit --timeout 90 -- zsh $S/close-suite.sh branch-wk-rest . 5313 tests-visual/webkit-2287.config.ts webkit $LI/wk-rest.txt;;
    wk-a) step wk-a $G --exclusive webkit --timeout 90 -- zsh $S/close-wk-half.sh A;;
    wk-b) step wk-b $G --exclusive webkit --timeout 90 -- zsh $S/close-wk-half.sh B;;
    floors) step floors $G --timeout 60 -- zsh $S/close-floors.sh;;
    base-chromium*|base-coarse*) p=chromium-headless-new; [[ $s == base-coarse* ]] && p=coarse-touch
      step $s $G --timeout 90 -- zsh $S/close-suite.sh $s $B 5312 tests-visual/playwright.config.ts $p $LI/$s.txt;;
    base-wk) step base-wk $G --exclusive webkit --timeout 90 -- zsh $S/close-suite.sh base-wk $B 5314 tests-visual/webkit-2287.config.ts webkit -;;
  esac
done
echo "$(date '+%F %T') queue done: $*" | tee -a $L/queue.txt
