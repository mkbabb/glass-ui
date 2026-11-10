#!/bin/zsh
# P-E15 part B chain: the builds (one guarded call), then the Chromium list as named acquisitions C1..C4 (guarded --timeout 90), then the
# WebKit list as named acquisitions W1..W6 (guarded --exclusive webkit --timeout 90, queued for the one WebKit lock), one heavy run at a time.
# Each acquisition runs batch15.sh on the previous one's .held list. THE STOP IS THE GUARD'S REFUSAL: a REFUSED line stops the chain, which
# records exactly what ran and leaves the held list for the next completion. Everything is appended to chain.log.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-15/PE15-records; G=~/.claude/guard/guarded
log() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg) · df $(df -h /System/Volumes/Data | tail -1 | awk '{print $4}') · $*" >> $R/chain.log; }
refused() { grep -q '^\[guarded\] REFUSED' $1 && { log "REFUSED by the guard in ${1:t}: $(grep '^\[guarded\] REFUSED' $1 | head -1 | cut -c1-200); the chain stops"; exit 75; }; }
log "chain start (pid $$)"
if [[ -n $GATES ]]; then
  log "gates $GATES queued"
  $G --timeout 30 -- zsh $R/gates15.sh $GATES > $R/logs/$GATES.txt 2>&1; refused $R/logs/$GATES.txt
  log "gates $GATES: $(grep -E 'exit' $R/logs/$GATES.txt | cut -c1-60 | tr '\n' ' ')"
  grep -E '^(build|typecheck|demo|vitest) exit [1-9]' $R/logs/$GATES.txt && { log "a gate failed; the chain stops"; exit 4; }
  zsh $R/mkpatch.sh /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p15/PE15/wt $R/../P-E15.patch > $R/logs/mkpatch.txt; log "P-E15.patch $(cat $R/logs/mkpatch.txt)"
fi
if [[ -z $SKIPBUILD ]]; then
  log "builds queued"
  $G --timeout 40 -- zsh $R/builds15.sh cand15 cand14 cand13 cand12 cand11 cand8 paintabove glideonce flat3d zoomchain pointcentre lateread hostgutter noflat nodetect inlinepct leastmoved insetlevel dockexit chordstep rawsum nosticky norange velnone velreset noimportant subtreewait level reachzero inlineread hostseat > $R/logs/builds.log 2>&1
  x=$?; refused $R/logs/builds.log; log "builds exit $x · $(grep -c 'build exit 0' $R/logs/builds.log) built · $(grep -E 'DRIFT|FAILED' $R/logs/builds.log | head -2)"
  (( x == 0 )) || { log "builds failed; the chain stops"; exit 3; }
fi
q=$R/CQ.q
for n in C1 C2 C3 C4; do
  [[ $(grep -cv '^#' $q) -gt 0 ]] || break
  log "$n queued ($(grep -cv '^#' $q) stages from ${q:t})"
  $G --timeout 90 -- zsh $R/batch15.sh $n $q > $R/logs/guard-$n.log 2>&1; x=$?; refused $R/logs/guard-$n.log
  log "$n exit $x · held $(wc -l < $R/$n.held | tr -d ' ')"; q=$R/$n.held
done
q=$R/WQ.q
for n in W1 W2 W3 W4 W5 W6; do
  [[ $(grep -cv '^#' $q) -gt 0 ]] || break
  log "$n queued for the WebKit lock ($(grep -cv '^#' $q) stages from ${q:t})"
  $G --exclusive webkit --timeout 90 -- zsh $R/batch15.sh $n $q > $R/logs/guard-$n.log 2>&1; x=$?; refused $R/logs/guard-$n.log
  log "$n exit $x · held $(wc -l < $R/$n.held | tr -d ' ')"; q=$R/$n.held
done
log "chain end"
