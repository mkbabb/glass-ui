#!/bin/zsh
# 10.1.6 close: the arms the first queue did not finish (r24 WebKit ended 143 while it waited
# for the lock; r5 coarse hit the guard timeout at load 150), then the release.yml gates again on
# the tip archive after the ratchet rebind. One guarded call per arm; a refusal stops (exit 3).
#   zsh docs/release-10.1.6/scripts/rerun.sh
set -u
WT=${0:A:h:h:h:h}
cd $WT
S=docs/release-10.1.6/scripts/cell.sh; L=docs/release-10.1.6/close-1; G=~/.claude/guard/guarded
PC=tests-visual/playwright.config.ts; WC=tests-visual/webkit-2287.config.ts
R24="tests-visual/release-10-1-2.spec.ts tests-visual/release-10-1-3.spec.ts tests-visual/release-10-1-4.spec.ts"
arm() { local tag=$1; shift; "$@" > $L/$tag.guard.log 2>&1; local rc=$?
  echo "$(date '+%F %T') arm $tag exit=$rc" >> $L/runs.txt
  if grep -q REFUSED $L/$tag.guard.log; then echo "$(date '+%F %T') STOP: refused at $tag" | tee -a $L/runs.txt; exit 3; fi; }
arm r24-wk2 $G --exclusive webkit --timeout 60 -- zsh $S r24-wk2 . 5364 $WC webkit "$R24"
arm r5-co2 $G --timeout 90 -- zsh $S r5-co2 . 5363 $PC coarse-touch tests-visual/release-10-1-5.spec.ts
arm gates2 $G --timeout 60 -- zsh docs/release-10.1.6/scripts/gates.sh tip2 .cache/r1016/tip
echo "$(date '+%F %T') rerun done" | tee -a $L/runs.txt
