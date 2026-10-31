#!/bin/zsh
# P-E11 Chromium chain: each stage (a line of the list: `stage [args…]`) in its own guarded call, one heavy run at a time.
# `chain.sh <list file>`. The list is re-read before each stage (replace it only by atomic rename); done lines are logged; END ends it.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-11/E11; cd $R; Q=$1; tag=${Q:t:r}; done_f=logs/$tag.done; touch $done_f
echo "## $(date '+%F %T') chain $tag start · load $(sysctl -n vm.loadavg)"
while true; do
  line=$(grep -v '^#' $Q | grep -v '^\s*$' | grep -vxF -f $done_f | head -1)
  [[ -z $line || $line == END ]] && break
  set -- ${=line}; s=$1; shift
  to=45; [[ $s == cand11-E-10 || $s == cand11-E-2 || $s == cand11-E-12 ]] && to=90
  echo "## $(date '+%T') $s chromium $* · load $(sysctl -n vm.loadavg)"
  GUARD_TAG=e11 $HOME/.claude/guard/guarded --timeout $to -- ./run-e11.sh $s chromium "$@"
  echo "## $(date '+%T') end ($?) · load $(sysctl -n vm.loadavg)"
  echo "$line" >> $done_f
done
echo "## $(date '+%F %T') chain $tag end · load $(sysctl -n vm.loadavg)"
