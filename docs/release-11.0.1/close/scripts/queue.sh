#!/bin/zsh
# 11.0.1 close queue: each step its own guarded call, one at a time. A guarded REFUSED ends the
# queue (exit 3); under 6 GB free on the data volume ends it (exit 4).
#   zsh queue.sh step...   (queue.sh plus the two WebKit alone-reruns wk-reA, wk-reB)   steps: gates-archive | gates-wt | floors | wk-proj | wk-rel | ch-<list> | co-<list>
#   (<list> names close/lists/<list>: rel, part-aa..al, probes)
set -u
C=${0:A:h:h}; WT=${C:h:h:h}; S=$C/scripts; L=$C/suite; LI=$C/lists; G=~/.claude/guard/guarded
CFG=tests-visual/playwright.config.ts; WCFG=tests-visual/webkit-2287.config.ts; RCFG=tests-visual/release-11-0-1.config.ts
step() { local n=$1; shift
  local free=$(df -g /System/Volumes/Data | awk 'NR==2{print $4}')
  if (( free < 6 )); then echo "$(date '+%F %T') STOP: disk ${free}G free at $n" | tee -a $L/queue.txt; exit 4; fi
  echo "$(date '+%F %T') $n queued (disk ${free}G)" | tee -a $L/queue.txt; "$@" > $L/$n.guard.log 2>&1; local rc=$?
  echo "$(date '+%F %T') $n guard-rc=$rc $(grep -m1 -E 'REFUSED' $L/$n.guard.log)" | tee -a $L/queue.txt
  if grep -q REFUSED $L/$n.guard.log; then echo "$(date '+%F %T') STOP: refused at $n" | tee -a $L/queue.txt; exit 3; fi; }
for s in ${@}; do
  case $s in
    gates-archive) step $s $G --timeout 40 -- zsh $S/gates.sh archive $WT/.cache/close/tree;;
    gates-wt) step $s $G --timeout 40 -- zsh $S/gates.sh worktree $WT;;
    floors) step $s $G --timeout 30 -- zsh $S/floors.sh;;
    wk-proj) step $s $G --exclusive webkit --timeout 45 -- zsh $S/suite.sh $s 5333 $WCFG webkit $LI/wk-proj.txt;;
    wk-rel) step $s $G --exclusive webkit --timeout 30 -- zsh $S/suite.sh $s 5333 $RCFG webkit $LI/wk-rel.txt;;
    ch-*) step $s $G --timeout 85 -- zsh $S/suite.sh $s 5331 $CFG chromium-headless-new $LI/${s#ch-};;
    wk-reA) step $s $G --exclusive webkit --timeout 20 -- zsh $S/suite.sh $s 5333 $WCFG webkit $LI/wk-reA.txt --repeat-each=6 -g "page.pdf: a deck in a modal dialog";;
    wk-reB) step $s $G --exclusive webkit --timeout 20 -- zsh $S/suite.sh $s 5333 $WCFG webkit $LI/wk-reB.txt --repeat-each=6 -g "q2 O-187 at 1440";;
    co-*) step $s $G --timeout 85 -- zsh $S/suite.sh $s 5331 $CFG coarse-touch $LI/${s#co-};;
  esac
done
echo "$(date '+%F %T') queue done: $*" | tee -a $L/queue.txt
