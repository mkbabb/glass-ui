#!/bin/zsh
# C-A14 chain: a list as named acquisitions <P>1..<P>n, each ONE guarded call running batch.sh; <P>n+1 takes <P>n.held unchanged.
# `chain.sh C $R/CQ.q` → guarded --timeout 90;  `chain.sh WK $R/WQ.q` → guarded --exclusive webkit --timeout 90 (queues for the one WebKit lock).
# A guard refusal (no <P>n.log written) stops the chain and leaves the held list as the next completion's file.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-14/C-A14-records
P=$1; list=$2; n=${3:-1}; X=(); [[ $P == WK || $P == WA || $P == WR ]] && X=(--exclusive webkit)
while (( n <= 6 )); do
  [[ $(grep -v '^#' $list | grep -cv '^[[:space:]]*$') -gt 0 ]] || break
  echo "# $P-$n queued $(date '+%F %T') · load $(sysctl -n vm.loadavg) · list ${list:t}" >> $R/chain.log
  ~/.claude/guard/guarded ${X[@]} --timeout 90 -- zsh $R/cc-batch.sh $P-$n $list >> $R/chain.log 2>&1; x=$?
  echo "# $P-$n guard exit $x · $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/chain.log
  [[ -e $R/$P-$n.log ]] || { echo "# $P-$n never admitted (no $P-$n.log): chain stops; ${list:t} is unrun" >> $R/chain.log; break; }
  list=$R/$P-$n.held; n=$((n+1))
done
echo "# $P chain done $(date '+%F %T')" >> $R/chain.log
