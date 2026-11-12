#!/bin/zsh
# 10.1.5 re-close: the queue, one guarded call per arm, one at a time; a refusal stops (exit 3).
# Trees: .cache/reclose/archive (git archive HEAD, CI's stand-in) for the gates and floors; the
# worktree for the visual arms. Ports 5371 (archive), 5372 (branch Chromium), 5374 (branch WebKit).
#   zsh docs/release-10.1.5/scripts/reclose-queue.sh <stage>...
set -u
WT=${0:A:h:h:h:h}
cd $WT
S=docs/release-10.1.5/scripts/reclose-cell.sh; L=docs/release-10.1.5/close/reclose; G=~/.claude/guard/guarded
A=.cache/reclose/archive
PC=tests-visual/playwright.config.ts; WC=tests-visual/webkit-2287.config.ts
R24="tests-visual/release-10-1-2.spec.ts tests-visual/release-10-1-3.spec.ts tests-visual/release-10-1-4.spec.ts"
R5=tests-visual/release-10-1-5.spec.ts
DOCK="$(ls tests-visual | grep -i dock | grep '\.spec\.ts$' | sed 's|^|tests-visual/|' | tr '\n' ' ')"
mkdir -p $L
arm() { local tag=$1; shift; "$@" > $L/$tag.guard.log 2>&1; local rc=$?
  echo "$(date '+%F %T') arm $tag exit=$rc" >> $L/runs.txt
  if grep -q REFUSED $L/$tag.guard.log; then echo "$(date '+%F %T') STOP: refused at $tag" | tee -a $L/runs.txt; exit 3; fi; }
for stage in "$@"; do
  case $stage in
    gates)  arm gates $G --timeout 60 -- zsh docs/release-10.1.5/scripts/close-gates.sh reclose-archive $A;;
    floors) arm floors $G --timeout 60 -- zsh docs/release-10.1.5/scripts/reclose-floors.sh $A 5371;;
    r24)
      arm r24-ch $G --timeout 60 -- zsh $S r24-ch . 5372 $PC chromium-headless-new "$R24"
      arm r24-co $G --timeout 60 -- zsh $S r24-co . 5372 $PC coarse-touch "$R24"
      arm r24-wk $G --exclusive webkit --timeout 60 -- zsh $S r24-wk . 5374 $WC webkit "$R24";;
    r5)
      arm r5-ch $G --timeout 75 -- zsh $S r5-ch . 5372 $PC chromium-headless-new $R5
      arm r5-co $G --timeout 75 -- zsh $S r5-co . 5372 $PC coarse-touch $R5
      arm r5-wk $G --exclusive webkit --timeout 75 -- zsh $S r5-wk . 5374 $WC webkit $R5;;
    dock)
      arm dock-ch $G --timeout 75 -- zsh $S dock-ch . 5372 $PC chromium-headless-new "$DOCK"
      arm dock-co $G --timeout 75 -- zsh $S dock-co . 5372 $PC coarse-touch "$DOCK";;
  esac
done
echo "$(date '+%F %T') queue done: $*" | tee -a $L/runs.txt
