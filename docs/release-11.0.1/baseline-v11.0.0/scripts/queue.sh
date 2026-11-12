#!/bin/zsh
# v11.0.0 baseline queue: each step its own guarded call, one at a time; a guarded REFUSED ends the queue (exit 3);
# under 45 GB free on the data volume ends it (exit 4).
#   zsh queue.sh step...    steps: ch-<part> | coarse-<part> (part = aa..am of lists/part-*), wk-<name> (lists/wk-<name>.txt, extra args after ':' unsupported; see wk steps)
set -u
B=${0:A:h:h}; S=$B/scripts; L=$B/reports; LI=$B/lists; G=~/.claude/guard/guarded
CFG=tests-visual/playwright.config.ts; WCFG=tests-visual/webkit-2287.config.ts
step() { local n=$1; shift
  local free=$(df -g /System/Volumes/Data | awk 'NR==2{print $4}')
  if (( free < 45 )); then echo "$(date '+%F %T') STOP: disk ${free}G free at $n" | tee -a $L/queue.txt; exit 4; fi
  echo "$(date '+%F %T') $n queued (disk ${free}G)" | tee -a $L/queue.txt; "$@" > $L/$n.guard.log 2>&1; local rc=$?
  echo "$(date '+%F %T') $n guard-rc=$rc $(grep -m1 -E 'REFUSED' $L/$n.guard.log)" | tee -a $L/queue.txt
  if grep -q REFUSED $L/$n.guard.log; then echo "$(date '+%F %T') STOP: refused at $n" | tee -a $L/queue.txt; exit 3; fi; }
for s in ${@}; do
  case $s in
    ch-*) step $s $G --timeout 60 -- zsh $S/suite.sh $s 5321 $CFG chromium-headless-new $LI/part-${s#ch-};;
    coarse-*) step $s $G --timeout 60 -- zsh $S/suite.sh $s 5321 $CFG coarse-touch $LI/part-${s#coarse-};;
    wk-*) step $s $G --exclusive webkit --timeout 20 -- zsh $S/suite.sh $s 5323 $WCFG webkit $LI/$s.txt;;
  esac
done
echo "$(date '+%F %T') queue done: $*" | tee -a $L/queue.txt
