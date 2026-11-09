#!/bin/zsh
# H15 queue runner: `qrun.sh <queue> <acq-name> <cutoff-min>`, run INSIDE one guarded call. Each queue line is `<est-min> <stage> <engine> [args]`.
# A stage starts only when the minutes elapsed plus its estimate fit the cutoff; what does not fit goes to <acq-name>.held, in order, unrun
# (the next named acquisition runs it unchanged). Every stage's start and end are in <acq-name>.log.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-15/H15-records
Q=$1; A=$2; CUT=${3:-86}; T0=$(date +%s); : > $R/$A.held
echo "# $A start $(date '+%F %T') · load $(sysctl -n vm.loadavg) · queue ${Q:t} · cutoff $CUT min" >> $R/$A.log
while read -r est stage eng rest; do
  [[ -z $est || $est == \#* ]] && continue
  el=$(( ($(date +%s) - T0) / 60 ))
  if (( el + est > CUT )); then echo "$est $stage $eng $rest" >> $R/$A.held; echo "  held $stage $eng (elapsed $el + est $est > $CUT)" >> $R/$A.log; continue; fi
  echo "  start $stage $eng $rest · $(date +%T) · load $(sysctl -n vm.loadavg)" >> $R/$A.log
  out=$(zsh $R/run.sh $stage $eng ${=rest} 2>&1 < /dev/null)
  echo "  end   $out · $(date +%T)" >> $R/$A.log
done < $Q
echo "# $A end $(date '+%F %T') · load $(sysctl -n vm.loadavg) · held $(grep -c . $R/$A.held)" >> $R/$A.log
