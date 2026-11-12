#!/bin/zsh
# 10.1.6 close: the queue, one guarded call per arm, one at a time; a refusal stops (exit 3).
# Trees: .cache/r1016/v1015 (git archive v10.1.5 + the witness files) for the RED arm;
# .cache/r1016/tip (git archive of the committed tip) for the gates and floors; the worktree
# for the branch arms. Ports 5361 (archive v10.1.5), 5362 (archive tip), 5363 (branch
# Chromium and coarse), 5364 (WebKit).
#   zsh docs/release-10.1.6/scripts/queue.sh <stage>...
set -u
WT=${0:A:h:h:h:h}
cd $WT
S=docs/release-10.1.6/scripts/cell.sh; L=docs/release-10.1.6/close-1; G=~/.claude/guard/guarded
V=.cache/r1016/v1015; T=.cache/r1016/tip
PC=tests-visual/playwright.config.ts; WC=tests-visual/webkit-2287.config.ts; FC=tests-visual/release-10-1-6.config.ts
FS=tests-visual/slider-forced-colors.spec.ts
R24="tests-visual/release-10-1-2.spec.ts tests-visual/release-10-1-3.spec.ts tests-visual/release-10-1-4.spec.ts"
R5=tests-visual/release-10-1-5.spec.ts
SL="$(ls tests-visual | grep -i slider | grep '\.spec\.ts$' | sed 's|^|tests-visual/|' | tr '\n' ' ')"
mkdir -p $L
arm() { local tag=$1; shift; "$@" > $L/$tag.guard.log 2>&1; local rc=$?
  echo "$(date '+%F %T') arm $tag exit=$rc" >> $L/runs.txt
  if grep -q REFUSED $L/$tag.guard.log; then echo "$(date '+%F %T') STOP: refused at $tag" | tee -a $L/runs.txt; exit 3; fi; }
for stage in "$@"; do
  case $stage in
    red)
      arm fc-v1015-ch $G --timeout 20 -- zsh $S fc-v1015-ch $V 5361 $PC chromium-headless-new $FS
      arm fc-v1015-co $G --timeout 20 -- zsh $S fc-v1015-co $V 5361 $PC coarse-touch $FS
      arm fc-v1015-wk $G --exclusive webkit --timeout 20 -- zsh $S fc-v1015-wk $V 5364 $FC webkit $FS;;
    green)
      arm fc-branch-ch $G --timeout 20 -- zsh $S fc-branch-ch . 5363 $PC chromium-headless-new $FS
      arm fc-branch-co $G --timeout 20 -- zsh $S fc-branch-co . 5363 $PC coarse-touch $FS
      arm fc-branch-wk $G --exclusive webkit --timeout 20 -- zsh $S fc-branch-wk . 5364 $FC webkit $FS;;
    gates)  arm gates $G --timeout 60 -- zsh docs/release-10.1.6/scripts/gates.sh tip $T;;
    floors) arm floors $G --timeout 60 -- zsh docs/release-10.1.6/scripts/floors.sh $T 5362;;
    r24)
      arm r24-ch $G --timeout 60 -- zsh $S r24-ch . 5363 $PC chromium-headless-new "$R24"
      arm r24-co $G --timeout 60 -- zsh $S r24-co . 5363 $PC coarse-touch "$R24"
      arm r24-wk $G --exclusive webkit --timeout 60 -- zsh $S r24-wk . 5364 $WC webkit "$R24";;
    r5)
      arm r5-ch $G --timeout 75 -- zsh $S r5-ch . 5363 $PC chromium-headless-new $R5
      arm r5-co $G --timeout 75 -- zsh $S r5-co . 5363 $PC coarse-touch $R5
      arm r5-wk $G --exclusive webkit --timeout 75 -- zsh $S r5-wk . 5364 $WC webkit $R5;;
    slider)
      arm sl-ch $G --timeout 60 -- zsh $S sl-ch . 5363 $PC chromium-headless-new "$SL"
      arm sl-co $G --timeout 60 -- zsh $S sl-co . 5363 $PC coarse-touch "$SL";;
  esac
done
echo "$(date '+%F %T') queue done: $*" | tee -a $L/runs.txt
