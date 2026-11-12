#!/bin/zsh
# 10.1.5 critic-close-1: the gate queue, one guarded call per arm, one at a time; a refusal stops (exit 3).
# Trees: . (the tip), .cache/crit-close-1/red (git archive 1ae63cde5), .cache/crit-close-1/v1014 (git archive v10.1.4).
#   zsh docs/release-10.1.5/scripts/critic-close-1-queue.sh <stage>...
set -u
WT=${0:A:h:h:h:h}
cd $WT
S=docs/release-10.1.5/scripts/critic-close-1-cell.sh; L=docs/release-10.1.5/critic-close-1; G=~/.claude/guard/guarded
PC=tests-visual/playwright.config.ts; WC=tests-visual/webkit-2287.config.ts
R2=tests-visual/release-10-1-2.spec.ts
G6="tests-visual/release-10-1-3.spec.ts tests-visual/release-10-1-4.spec.ts"
R5=tests-visual/release-10-1-5.spec.ts
RED=.cache/crit-close-1/red; V=.cache/crit-close-1/v1014
mkdir -p $L
arm() { local tag=$1; shift; "$@" > $L/$tag.guard.log 2>&1
  if grep -q REFUSED $L/$tag.guard.log; then echo "$(date '+%F %T') STOP: refused at $tag" | tee -a $L/runs.txt; exit 3; fi; }
for stage in "$@"; do
  case $stage in
    rev-tip)
      arm rev6-tip-ch $G --timeout 30 -- zsh $S rev6-tip-ch . 5331 $PC chromium-headless-new $R2 reversal 6
      arm rev6-tip-co $G --timeout 30 -- zsh $S rev6-tip-co . 5331 $PC coarse-touch $R2 reversal 6
      arm rev6-tip-wk $G --exclusive webkit --timeout 45 -- zsh $S rev6-tip-wk . 5334 $WC webkit $R2 reversal 6;;
    rev-red)
      arm rev6-red-ch $G --timeout 30 -- zsh $S rev6-red-ch $RED 5332 $PC chromium-headless-new $R2 reversal 6
      arm rev6-red-co $G --timeout 30 -- zsh $S rev6-red-co $RED 5332 $PC coarse-touch $R2 reversal 6
      arm rev6-red-wk $G --exclusive webkit --timeout 45 -- zsh $S rev6-red-wk $RED 5335 $WC webkit $R2 reversal 6;;
    r2-tip)
      arm r2-tip-ch $G --timeout 45 -- zsh $S r2-tip-ch . 5331 $PC chromium-headless-new $R2 "" 1
      arm r2-tip-co $G --timeout 45 -- zsh $S r2-tip-co . 5331 $PC coarse-touch $R2 "" 1
      arm r2-tip-wk $G --exclusive webkit --timeout 45 -- zsh $S r2-tip-wk . 5334 $WC webkit $R2 "" 1;;
    r2-v1014)
      arm r2-v1014-ch $G --timeout 45 -- zsh $S r2-v1014-ch $V 5333 $PC chromium-headless-new $R2 "" 1
      arm r2-v1014-co $G --timeout 45 -- zsh $S r2-v1014-co $V 5333 $PC coarse-touch $R2 "" 1
      arm r2-v1014-wk $G --exclusive webkit --timeout 45 -- zsh $S r2-v1014-wk $V 5336 $WC webkit $R2 "" 1;;
    g6)
      arm g6-tip-ch $G --timeout 60 -- zsh $S g6-tip-ch . 5331 $PC chromium-headless-new "$G6" "" 1
      arm g6-tip-wk $G --exclusive webkit --timeout 60 -- zsh $S g6-tip-wk . 5334 $WC webkit "$G6" "" 1;;
    r5)
      arm r5-tip-ch $G --timeout 60 -- zsh $S r5-tip-ch . 5331 $PC chromium-headless-new $R5 "" 1
      arm r5-tip-wk $G --exclusive webkit --timeout 75 -- zsh $S r5-tip-wk . 5334 $WC webkit $R5 "" 1;;
  esac
done
echo "$(date '+%F %T') queue done: $*" | tee -a $L/runs.txt
