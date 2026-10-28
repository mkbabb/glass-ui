#!/bin/zsh
# H7 chain: each line of a phase file is `<stage> <engine> [arg]`. chromium: one guarded call per stage.
# webkit: the caller wraps this whole script in ONE `guarded --exclusive webkit` acquisition.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-7/H7
mode=$1; phase=$2
echo "# chain $phase ($mode) start $(date '+%F %T') load $(sysctl -n vm.loadavg)"
while read -r st en arg; do
  [[ -z "$st" || "$st" == \#* ]] && continue
  echo "## $st $en $arg · $(date '+%T') · load $(sysctl -n vm.loadavg)"
  if [[ $mode == guarded ]]; then ~/.claude/guard/guarded --timeout 90 -- $R/run-h7.sh $st $en $arg; echo "## guarded exit $?"
  else $R/run-h7.sh $st $en $arg; echo "## exit $?"; fi
done < $R/$phase
echo "# chain $phase end $(date '+%F %T') load $(sysctl -n vm.loadavg)"
