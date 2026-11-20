#!/bin/zsh
# 11.1.0 close queue (the 11.0.1 close's): each step its own guarded call, one at a time. A guarded
# REFUSED ends the queue (exit 3); under 6 GB free on the data volume ends it (exit 4).
#   zsh queue.sh step...   steps: ch-<list> | co-<list> | wk-proj | wk-rel
#   (<list> names close/lists/<list>: rel, part-aa..al)
set -u
C=${0:A:h:h}; WT=${C:h:h:h}; S=$C/scripts; L=$C/suite; LI=$C/lists; G=~/.claude/guard/guarded
CFG=tests-visual/playwright.config.ts; WCFG=tests-visual/webkit-2287.config.ts; RCFG=tests-visual/release-11-0-1.config.ts
mkdir -p $L
step() { local n=$1; shift
  local free=$(df -g /System/Volumes/Data | awk 'NR==2{print $4}')
  if (( free < 6 )); then echo "$(date '+%F %T') STOP: disk ${free}G free at $n" | tee -a $L/queue.txt; exit 4; fi
  echo "$(date '+%F %T') $n queued (disk ${free}G)" | tee -a $L/queue.txt; "$@" > $L/$n.guard.log 2>&1; local rc=$?
  echo "$(date '+%F %T') $n guard-rc=$rc $(grep -m1 -E 'REFUSED' $L/$n.guard.log)" | tee -a $L/queue.txt
  if grep -q REFUSED $L/$n.guard.log; then echo "$(date '+%F %T') STOP: refused at $n" | tee -a $L/queue.txt; exit 3; fi; }
for s in ${@}; do
  case $s in
    wk-proj) step $s $G --exclusive webkit --timeout 60 -- zsh $S/suite.sh $s 5753 $WCFG webkit $LI/wk-proj.txt;;
    wk-rel) step $s $G --exclusive webkit --timeout 30 -- zsh $S/suite.sh $s 5753 $RCFG webkit $LI/wk-rel.txt;;
    ch-*) step $s $G --timeout 85 -- zsh $S/suite.sh $s 5751 $CFG chromium-headless-new $LI/${s#ch-};;
    co-*) step $s $G --timeout 85 -- zsh $S/suite.sh $s 5751 $CFG coarse-touch $LI/${s#co-};;
  esac
done
echo "$(date '+%F %T') queue done: $*" | tee -a $L/queue.txt
