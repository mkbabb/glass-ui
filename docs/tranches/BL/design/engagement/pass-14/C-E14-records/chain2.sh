#!/bin/zsh
# C-E14 chain: a list as named acquisitions <P>1..<P>n, each ONE guarded call (`--timeout 90`; WebKit with `--exclusive webkit`) running
# batch.sh; acquisition n+1 takes n's .held list unchanged. A guard refusal (no <name>.log written) stops the chain and leaves the list unrun.
#   chain.sh <prefix C|WK> <list> [first n]
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-14/C-E14-records
px=$1; list=$2; n=${3:-1}; X=(); [[ $px == WK* ]] && X=(--exclusive webkit)
while (( n <= 8 )); do
  [[ $(grep -v '^#' $list | grep -cv '^[[:space:]]*$') -gt 0 ]] || break
  echo "# $px$n queued $(date '+%F %T') · load $(sysctl -n vm.loadavg) · list ${list:t}" >> $R/chain.log
  ~/.claude/guard/guarded $X --timeout 90 -- zsh $R/batch.sh $px$n $list >> $R/chain.log 2>&1; x=$?
  echo "# $px$n guard exit $x · $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/chain.log
  [[ -e $R/$px$n.log ]] || { echo "# $px$n never admitted (no $px$n.log): the chain stops; ${list:t} is unrun" >> $R/chain.log; break; }
  list=$R/$px$n.held; n=$((n+1))
done
echo "# $px chain done $(date '+%F %T')" >> $R/chain.log
