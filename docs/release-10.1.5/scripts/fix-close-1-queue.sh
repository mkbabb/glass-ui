#!/bin/zsh
# 10.1.5 fix-close-1: the witness queue, one guarded call per arm; a refusal stops (exit 3).
#   zsh docs/release-10.1.5/scripts/fix-close-1-queue.sh
set -u
WT=${0:A:h:h:h:h}
cd $WT
S=docs/release-10.1.5/scripts/fix-close-1-cell.sh; L=docs/release-10.1.5/fix-close-1; G=~/.claude/guard/guarded
CH=(tests-visual/playwright.config.ts chromium-headless-new); CO=(tests-visual/playwright.config.ts coarse-touch); WK=(tests-visual/webkit-2287.config.ts webkit)
R5="tests-visual/release-10-1-2.spec.ts tests-visual/release-10-1-3.spec.ts tests-visual/release-10-1-4.spec.ts tests-visual/release-10-1-5.spec.ts"
arm() { local tag=$1; shift; "$@" > $L/$tag.guard.log 2>&1
  if grep -q REFUSED $L/$tag.guard.log; then echo "$(date '+%F %T') STOP: refused at $tag" | tee -a $L/runs.txt; exit 3; fi; }
arm rev6-ch $G --timeout 30 -- zsh $S rev6-ch 5321 $CH tests-visual/release-10-1-2.spec.ts reversal 6
arm rev6-co $G --timeout 30 -- zsh $S rev6-co 5321 $CO tests-visual/release-10-1-2.spec.ts reversal 6
arm rev6-wk $G --exclusive webkit --timeout 45 -- zsh $S rev6-wk 5323 $WK tests-visual/release-10-1-2.spec.ts reversal 6
arm specs-ch $G --timeout 90 -- zsh $S specs-ch 5321 $CH "$R5" "" 1
arm specs-wk $G --exclusive webkit --timeout 90 -- zsh $S specs-wk 5323 $WK "$R5" "" 1
arm r2-co $G --timeout 45 -- zsh $S r2-co 5321 $CO tests-visual/release-10-1-2.spec.ts "" 1
