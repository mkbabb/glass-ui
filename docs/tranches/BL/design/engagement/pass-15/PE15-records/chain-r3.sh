#!/bin/zsh
# P-E15 part B, resume r3: the cured cand15 (P-E15.patch 4e987d66, src tree d564e84f3244; the cure is S15-g rule 1's re-ask, B-12) re-read
# through the whole list of record. Order, one heavy run at a time: the 31 builds (one guarded call, BTAG=-r3b), then the Chromium queues
# CQ3a, CQ3b, MCQ (guarded --timeout 90 each), then the WebKit queues WQ3a, WQ3b, MWQ (guarded --exclusive webkit --timeout 90 each,
# queued for the one WebKit lock). Each queue was split before the run into its named acquisitions; a stage the start cutoff holds goes,
# unchanged, to the same queue's next acquisition (<queue>-2, -3). THE STOP IS THE GUARD'S REFUSAL: a REFUSED line stops the chain, which
# records exactly what ran and leaves the held list. A disk under 15 GiB free stops it too. Everything is appended to chain.log.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-15/PE15-records; G=~/.claude/guard/guarded
export RUNTAG=r3; mkdir -p $R/logs/r3
log() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg) · df $(df -h /System/Volumes/Data | tail -1 | awk '{print $4}') · r3 · $*" >> $R/chain.log; }
refused() { grep -q '^\[guarded\] REFUSED' $1 && { log "REFUSED by the guard in ${1:t}: $(grep '^\[guarded\] REFUSED' $1 | head -1 | cut -c1-200); the chain stops"; exit 75; }; }
disk() { local f=$(df -g /System/Volumes/Data | tail -1 | awk '{print $4}'); (( f < 15 )) && { log "DISK ${f} GiB free (< 15): the chain stops"; exit 76; }; }
log "chain-r3 start (pid $$)"
if [[ -z $SKIPBUILD ]]; then
  disk; log "builds queued (31: cand15 cured + references + 25 plants)"
  BTAG=-r3b $G --timeout 40 -- zsh $R/builds15.sh cand15 cand14 cand13 cand12 cand11 cand8 paintabove glideonce flat3d zoomchain pointcentre lateread hostgutter noflat nodetect inlinepct leastmoved insetlevel dockexit chordstep rawsum nosticky norange velnone velreset noimportant subtreewait level reachzero inlineread hostseat > $R/logs/builds-r3b.log 2>&1
  x=$?; refused $R/logs/builds-r3b.log; log "builds exit $x · $(grep -c 'build exit 0' $R/logs/builds-r3b.log) built · $(grep -E 'DRIFT|FAILED' $R/logs/builds-r3b.log | head -2)"
  (( x == 0 )) || { log "builds failed; the chain stops"; exit 3; }
fi
acq() { # acq <engine> <queue-name>: the queue's named acquisitions until nothing is held
  local eng=$1 base=$2 q=$R/$2.q n i=1
  while [[ -s $q && $(grep -cv '^#' $q) -gt 0 && $i -le 4 ]]; do
    n=$base; (( i > 1 )) && n=$base-$i; disk
    if [[ $eng == webkit ]]; then log "$n queued for the WebKit lock ($(grep -cv '^#' $q) stages from ${q:t})"; $G --exclusive webkit --timeout 90 -- zsh $R/batch15.sh $n $q > $R/logs/r3/guard-$n.log 2>&1
    else log "$n queued ($(grep -cv '^#' $q) stages from ${q:t})"; $G --timeout 90 -- zsh $R/batch15.sh $n $q > $R/logs/r3/guard-$n.log 2>&1; fi
    local x=$?; refused $R/logs/r3/guard-$n.log; log "$n exit $x · held $(wc -l < $R/$n.held | tr -d ' ')"; q=$R/$n.held; i=$((i+1))
  done
}
for Q in ${=CQUEUES:-CQ3a CQ3b MCQ}; do [[ $Q == MCQ ]] && export GATE_S=600 || unset GATE_S; acq chromium $Q; done
for Q in ${=WQUEUES:-WQ3a WQ3b MWQ}; do [[ $Q == MWQ ]] && export GATE_S=600 || unset GATE_S; acq webkit $Q; done
log "chain-r3 end"
