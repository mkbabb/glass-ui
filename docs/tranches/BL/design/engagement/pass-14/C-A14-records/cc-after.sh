#!/bin/zsh
# C-A14-complete: after cc-resume.sh ends (waits on its PID), WR-1 (WR.q, WebKit) then CX-1 (CX.q, Chromium), one at a time.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-14/C-A14-records
while kill -0 $1 2>/dev/null; do sleep 20; done
grep -q "cc-resume stops" $R/chain.log && { echo "# cc-after: cc-resume stopped; WR.q and CX.q unrun" >> $R/chain.log; exit 3; }
echo "# cc-after $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/chain.log
f=$(df -g /System/Volumes/Data | awk 'NR==2{print $4}'); (( f >= 15 )) || { echo "# cc-after stops: disk ${f} GB" >> $R/chain.log; exit 4; }
zsh $R/cc-chain.sh WR $R/WR.q 1; grep -q "^# WR-1 never admitted" $R/chain.log && exit 3
zsh $R/cc-chain.sh CX $R/CX.q 1
echo "# cc-after done $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/chain.log
