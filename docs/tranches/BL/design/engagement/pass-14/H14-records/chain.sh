#!/bin/zsh
# H14 chain: the acquisitions in order, one heavy run at a time, each its own guarded call. `chain.sh <phase>...`:
#   builds   builds.sh head cand13 cand12 (the scene app changed: E-14 M30's chip mode), one guarded call
#   chromium successive Chromium acquisitions C2, C3, ... (guarded --timeout 90, qrun.sh on the shared queue CQ.q) until CQ.q is empty
#            and CQ.stop exists (each acquisition stops at its cutoff and leaves the rest of CQ.q to the next)
#   webkit   successive WebKit acquisitions WK1, WK2, ... (guarded --exclusive webkit --timeout 90, qrun.sh on WQ.q), the same way
# The list each acquisition ran is its log (<name>.log); a stage the guard killed has a start line and no end line, and is re-run whole.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-14/H14-records; GD=$HOME/.claude/guard/guarded
for ph in "$@"; do
  case $ph in
    builds) echo "# builds · $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/chain.log
            $GD --timeout 60 -- zsh $R/builds.sh head cand13 cand12 >> $R/logs/builds2.log 2>&1; echo "  builds exit $? · $(date '+%T')" >> $R/chain.log ;;
    chromium) i=${CI:-2}; while grep -qv '^#' $R/CQ.q 2>/dev/null || [[ ! -e $R/CQ.stop ]]; do
                echo "# C$i · $(date '+%F %T') · requested · load $(sysctl -n vm.loadavg)" >> $R/chain.log
                $GD --timeout 90 -- zsh $R/qrun.sh C$i CQ > $R/logs/C$i-guard.log 2>&1; echo "  C$i exit $? · $(date '+%T')" >> $R/chain.log
                i=$((i+1)); [[ -e $R/CQ.stop ]] && ! grep -qv '^#' $R/CQ.q && break; done ;;
    webkit) i=${WI:-1}; while grep -qv '^#' $R/WQ.q 2>/dev/null || [[ ! -e $R/WQ.stop ]]; do
                echo "# WK$i · $(date '+%F %T') · requested (--exclusive webkit) · load $(sysctl -n vm.loadavg)" >> $R/chain.log
                $GD --exclusive webkit --timeout 90 -- zsh $R/qrun.sh WK$i WQ > $R/logs/WK$i-guard.log 2>&1; echo "  WK$i exit $? · $(date '+%T')" >> $R/chain.log
                i=$((i+1)); [[ -e $R/WQ.stop ]] && ! grep -qv '^#' $R/WQ.q && break; done ;;
  esac
done
echo "# chain done · $(date '+%F %T')" >> $R/chain.log
