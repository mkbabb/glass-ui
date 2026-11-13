#!/bin/zsh
# 10.1.6 critic 1: the queue after the Chromium probe, one guarded call per arm, one at a
# time; a refusal stops (exit 3).
#   zsh docs/release-10.1.6/critic-1/queue.sh
set -u
WT=${0:A:h:h:h:h}
cd $WT
C=docs/release-10.1.6/critic-1; L=$C/out; G=~/.claude/guard/guarded
R5=tests-visual/release-10-1-5.spec.ts
arm() { local tag=$1; shift; "$@" > $L/$tag.guard.log 2>&1; local rc=$?
  echo "$(date '+%F %T') arm $tag exit=$rc" >> $L/runs.txt
  if grep -q "REFUSED:" $L/$tag.guard.log; then echo "$(date '+%F %T') STOP: refused at $tag" | tee -a $L/runs.txt; exit 3; fi; }
arm gates $G --timeout 45 -- zsh $C/gates.sh
arm r5-ch $G --timeout 75 -- zsh $C/cell.sh r5-ch . 5363 tests-visual/playwright.config.ts chromium-headless-new $R5
arm probe-wk $G --exclusive webkit --timeout 40 -- zsh $C/probe.sh wk
arm r5-wk $G --exclusive webkit --timeout 75 -- zsh $C/cell.sh r5-wk . 5364 tests-visual/webkit-2287.config.ts webkit $R5
echo "$(date '+%F %T') queue done" | tee -a $L/runs.txt
