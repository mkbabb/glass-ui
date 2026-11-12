#!/bin/zsh
# 11.0.1 close, after the suite queue: the restated radius-scale dock rows alone, motion2's
# substrate cell alone six times, then the gates again on the committed tree. One guarded call at
# a time; a REFUSED ends it (exit 3).
#   zsh after.sh
set -u
C=${0:A:h:h}; WT=${C:h:h:h}; S=$C/scripts; L=$C/suite; LI=$C/lists; G=~/.claude/guard/guarded
CFG=tests-visual/playwright.config.ts
step() { local n=$1; shift
  echo "$(date '+%F %T') $n queued" | tee -a $L/queue.txt; "$@" > $L/$n.guard.log 2>&1; local rc=$?
  echo "$(date '+%F %T') $n guard-rc=$rc $(grep -m1 REFUSED $L/$n.guard.log)" | tee -a $L/queue.txt
  if grep -q REFUSED $L/$n.guard.log; then echo "$(date '+%F %T') STOP: refused at $n" | tee -a $L/queue.txt; exit 3; fi; }
step ch-radius $G --timeout 20 -- zsh $S/suite.sh ch-radius 5331 $CFG chromium-headless-new $LI/radius
step ch-motion2 $G --timeout 20 -- zsh $S/suite.sh ch-motion2 5331 $CFG chromium-headless-new $LI/motion2 --repeat-each=6 -g "calm substrate"
step gates-final $G --timeout 40 -- zsh $S/gates.sh final $WT
echo "$(date '+%F %T') after done" | tee -a $L/queue.txt
