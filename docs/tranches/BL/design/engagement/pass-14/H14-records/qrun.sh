#!/bin/zsh
# H14 queue consumer: one named Chromium acquisition (`guarded --timeout 90 -- zsh qrun.sh <name>`) that runs the stages placed in
# <name>.q one at a time, in order. A stage is added only by atomic rename of the whole queue file (q.add), and every start and end is
# logged with its time and load. It starts no stage after LIMIT minutes less the stage's estimate (class 6 (i)); it stops when <name>.stop
# exists and the queue is empty, or at the cutoff, leaving what is unstarted in <name>.q for the next acquisition.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-14/H14-records
# `qrun.sh <name> [<queue>]`: the queue file defaults to <name>.q; chain.sh passes one shared queue (CQ, WQ) to successive acquisitions
name=$1; LIMIT=${LIMIT:-86}; t0=$(date +%s); Q=$R/${2:-$name}.q; touch $Q
echo "# $name · $(date '+%F %T') · admitted · load $(sysctl -n vm.loadavg)" >> $R/$name.log
while true; do
  el=$(( ($(date +%s) - t0) / 60 ))
  # the first stage that fits the cutoff (a stage that does not fit stays in place for the next acquisition; a later, shorter one may run first)
  line=""; first=$(grep -v '^#' $Q | grep -v '^[[:space:]]*$' | head -1)
  while read -r cand; do [[ -z $cand ]] && continue; (( el + ${cand%% *} <= LIMIT )) && { line=$cand; break; }; done < <(grep -v '^#' $Q | grep -v '^[[:space:]]*$')
  [[ -z $line && -n $first ]] && line=$first
  if [[ -z $line ]]; then [[ -e $R/$name.stop || -e $R/${2:-$name}.stop ]] && break; (( el >= LIMIT )) && break; sleep 5; continue; fi
  est=${line%% *}; rest=${line#* }
  if (( el + est > LIMIT )); then echo "  HELD at the cutoff (+$el min, est $est) · $rest" >> $R/$name.log; break; fi
  grep -vxF "$line" $Q > $Q.tmp; mv $Q.tmp $Q
  echo "  start $(date '+%T') · +$el min · $rest" >> $R/$name.log
  out=$(zsh $R/run.sh ${=rest} 2>&1)
  echo "  end   $(date '+%T') · $out" >> $R/$name.log
done
echo "# $name · $(date '+%F %T') · done · load $(sysctl -n vm.loadavg) · left $(grep -cv '^#' $Q)" >> $R/$name.log
