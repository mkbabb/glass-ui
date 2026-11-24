#!/bin/zsh
# The 11.1.1 second close queue (the 11.1.0 close's): each step its own guarded call, one at a time. A
# guarded REFUSED ends the queue (exit 3); under 6 GB free on the data volume ends it (exit 4); a
# kernel zone at 12.8M or more ends it before the guard's 13M refusal (exit 5).
# ROOT, when set, is passed to suite.sh and the restore is skipped (the tree is deleted after).
# After each step the tracked files a spec rewrites (docs/tranches PNGs, docs/release-10.1.5
# readings) are restored from HEAD and the step's new untracked files there are listed.
#   zsh queue.sh step...   steps: ch-<list> | co-<list> | wk-proj | wk-rel
#   (<list> names close/lists/<list>: rel, part-aa..al)
set -u
C=${0:A:h:h}; WT=${C:h:h:h:h}; S=$C/scripts; L=$C/suite; LI=${C:h}/lists; G=~/.claude/guard/guarded
CFG=tests-visual/playwright.config.ts; WCFG=tests-visual/webkit-2287.config.ts; RCFG=tests-visual/release-11-0-1.config.ts
mkdir -p $L
restore() { local n=$1 d
  [[ -n ${ROOT:-} ]] && return 0
  d=$(git -C $WT status --porcelain -- docs/tranches docs/release-10.1.5 docs/release-11.0.1 docs/release-11.1.0 tests-visual | grep -v '^??' | wc -l | tr -d ' ')
  if (( d > 0 )); then git -C $WT checkout -- docs/tranches docs/release-10.1.5 docs/release-11.0.1 docs/release-11.1.0 tests-visual; echo "$(date '+%F %T') $n restored $d tracked files from HEAD" | tee -a $L/queue.txt; fi
  git -C $WT status --porcelain --untracked-files=all -- docs/tranches docs/release-10.1.5 docs/release-11.0.1 docs/release-11.1.0 tests-visual | grep '^??' >> $L/untracked-after-$n.txt; }
step() { local n=$1; shift
  local free=$(df -g /System/Volumes/Data | awk 'NR==2{print $4}')
  if (( free < 6 )); then echo "$(date '+%F %T') STOP: disk ${free}G free at $n" | tee -a $L/queue.txt; exit 4; fi
  local zone=$(tail -1 ~/.claude/guard/log/zone.log | grep -oE 'inuse=[0-9]+' | cut -d= -f2)
  if (( ${zone:-0} >= 12800000 )); then echo "$(date '+%F %T') STOP: kernel zone at ${zone} before $n (the guard refuses heavy runs at 13M); the seat stops its own queue first" | tee -a $L/queue.txt; exit 5; fi
  echo "$(date '+%F %T') $n queued (disk ${free}G, $(tail -1 ~/.claude/guard/log/zone.log | grep -oE 'inuse=[0-9]+'))" | tee -a $L/queue.txt; "$@" > $L/$n.guard.log 2>&1; local rc=$?
  echo "$(date '+%F %T') $n guard-rc=$rc $(grep -m1 -E '^\[guarded\] REFUSED' $L/$n.guard.log)" | tee -a $L/queue.txt
  restore $n
  if grep -qE '^\[guarded\] REFUSED' $L/$n.guard.log; then echo "$(date '+%F %T') STOP: refused at $n" | tee -a $L/queue.txt; exit 3; fi; }
for s in ${@}; do
  case $s in
    wk-proj) step $s $G --exclusive webkit --timeout 60 -- zsh $S/suite.sh $s 5354 $WCFG webkit $LI/wk-proj.txt;;
    wk-rel) step $s $G --exclusive webkit --timeout 30 -- zsh $S/suite.sh $s 5354 $RCFG webkit $LI/wk-rel.txt;;
    ch-*) step $s $G --timeout 85 -- zsh $S/suite.sh $s 5353 $CFG chromium-headless-new $LI/${s#ch-};;
    co-*) step $s $G --timeout 85 -- zsh $S/suite.sh $s 5353 $CFG coarse-touch $LI/${s#co-};;
  esac
done
echo "$(date '+%F %T') queue done: $*" | tee -a $L/queue.txt
