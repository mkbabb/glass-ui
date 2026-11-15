#!/bin/zsh
# 11.0.2 close queue: each step its own guarded call, one at a time. A line starting
# "[guarded] REFUSED:" ends the queue (exit 3); under 6 GB free on the data volume ends it (exit 4).
#   zsh queue.sh step...
#   steps: gates-archive | gates-wt | floors | wk-proj | wk-rel | wk-112 | w3-112 | ch-<list> | co-<list>
#   (<list> names close/lists/<list>: rel, part-aa..al)
set -u
C=${0:A:h:h}; WT=${C:h:h:h}; S=$C/scripts; L=$C/suite; LI=$C/lists; G=~/.claude/guard/guarded
CFG=tests-visual/playwright.config.ts; WCFG=tests-visual/webkit-2287.config.ts
RCFG=tests-visual/release-11-0-1.config.ts; R2CFG=tests-visual/release-11-0-2.config.ts
step() { local n=$1; shift
  local free=$(df -g /System/Volumes/Data | awk 'NR==2{print $4}')
  if (( free < 6 )); then echo "$(date '+%F %T') STOP: disk ${free}G free at $n" | tee -a $L/queue.txt; exit 4; fi
  echo "$(date '+%F %T') $n queued (disk ${free}G)" | tee -a $L/queue.txt; "$@" > $L/$n.guard.log 2>&1; local rc=$?
  echo "$(date '+%F %T') $n guard-rc=$rc $(grep -m1 '^\[guarded\] REFUSED:' $L/$n.guard.log)" | tee -a $L/queue.txt
  if grep -q '^\[guarded\] REFUSED:' $L/$n.guard.log; then echo "$(date '+%F %T') STOP: refused at $n" | tee -a $L/queue.txt; exit 3; fi; }
for s in ${@}; do
  case $s in
    gates-archive) step $s $G --timeout 45 -- zsh $S/gates.sh archive $WT/.cache/close/tree;;
    gates-wt) step $s $G --timeout 45 -- zsh $S/gates.sh worktree $WT;;
    gates-final) step $s $G --timeout 45 -- zsh $S/gates.sh final $WT;;
    floors) step $s $G --timeout 30 -- zsh $S/floors.sh;;
    wk-proj) step $s $G --exclusive webkit --timeout 60 -- zsh $S/suite.sh $s 5343 $WCFG webkit $LI/wk-proj.txt;;
    wk-rel) step $s $G --exclusive webkit --timeout 30 -- zsh $S/suite.sh $s 5343 $RCFG webkit $LI/wk-rel.txt;;
    wk-112) step $s $G --exclusive webkit --timeout 45 -- zsh $S/suite.sh $s 5343 $R2CFG webkit $LI/wk-112.txt;;
    w3-112) step $s $G --exclusive webkit --timeout 45 -- zsh $S/suite.sh $s 5343 $R2CFG webkit-2311 $LI/w3-112.txt;;
    ch-*) step $s $G --timeout 85 -- zsh $S/suite.sh $s 5341 $CFG chromium-headless-new $LI/${s#ch-};;
    co-*) step $s $G --timeout 85 -- zsh $S/suite.sh $s 5341 $CFG coarse-touch $LI/${s#co-};;
    *) echo "$(date '+%F %T') unknown step $s" | tee -a $L/queue.txt;;
  esac
done
echo "$(date '+%F %T') queue done: $*" | tee -a $L/queue.txt
