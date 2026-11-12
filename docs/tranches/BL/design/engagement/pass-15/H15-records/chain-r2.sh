#!/bin/zsh
# H15 chain, RESUME (r2, 2026-11-09 after the reboot): HELD.q unchanged from C2. the named acquisitions in order, one heavy run at a time. Chromium C1, C2; WebKit WK1, WK2 (each `--exclusive webkit`, queued
# on the machine's one WebKit lock); Chromium C3. A .held file is what an acquisition's cutoff did not admit (run next, unchanged).
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-15/H15-records; cd $R
acq() { local name=$1 q=$2 ex=$3; local d=$(df -h /System/Volumes/Data | tail -1 | awk '{print $4}'); echo "# $(date '+%F %T') $name queued · load $(sysctl -n vm.loadavg) · disk free $d" >> chain.log
  if [[ $ex == webkit ]]; then ~/.claude/guard/guarded --exclusive webkit --timeout 90 -- zsh $R/qrun.sh $R/$q $name 86 > $R/logs/guard-$name.log 2>&1
  else ~/.claude/guard/guarded --timeout 90 -- zsh $R/qrun.sh $R/$q $name 86 > $R/logs/guard-$name.log 2>&1; fi
  local rc=$?; echo "# $(date '+%F %T') $name exit $rc · load $(sysctl -n vm.loadavg)" >> chain.log
  if grep -qi "refus" $R/logs/guard-$name.log; then echo "# $(date '+%F %T') GUARD REFUSED $name: chain stops" >> chain.log; exit 9; fi; }
acq C2 C2.q chromium; acq WK1 WK1.q webkit; acq WK2 WK2.q webkit; acq C3 C3.q chromium
echo "# chain done · $(date '+%F %T')" >> chain.log
