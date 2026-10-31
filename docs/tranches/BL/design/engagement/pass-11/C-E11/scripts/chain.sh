#!/bin/zsh
# C-E11 Chromium chain: each line `stage [args]` in its own guarded call, one heavy run at a time; the list re-read before each stage (replace by rename only).
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-11/C-E11; cd $R/scripts; Q=$1; tag=${Q:t:r}; done_f=$R/logs/$tag.done; touch $done_f
echo "## $(date '+%F %T') chain $tag start · load $(sysctl -n vm.loadavg)"
while true; do
  line=$(grep -v '^#' $Q | grep -v '^\s*$' | grep -vxF -f $done_f | head -1)
  [[ -z $line || $line == END ]] && break
  set -- ${=line}; s=$1; shift
  to=45; [[ $s == cand11-E-10 || $s == cand11-E-2 || $s == cand11-E-12 || $s == *-ce10 || $s == *-ce11 ]] && to=90
  echo "## $(date '+%T') $s chromium $* · load $(sysctl -n vm.loadavg)"
  GUARD_TAG=ce11 $HOME/.claude/guard/guarded --timeout $to -- ./run.sh $s chromium "$@"
  echo "## $(date '+%T') end ($?) · load $(sysctl -n vm.loadavg)"
  echo "$line" >> $done_f
done
echo "## $(date '+%F %T') chain $tag end · load $(sysctl -n vm.loadavg)"
