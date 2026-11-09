#!/bin/zsh
# C-A14-complete (D5 pass 14, c5, 2026-11-08): the parent's resume.sh order on this seat's builds, plus §P14-8.0's adds (ADD.q, WADD.q).
# One chain at a time (one heavy run per seat): C-4.. on C-1.held unchanged; CR-1.. on CR.q; AD-1 on ADD.q; WK-1.. on WQ.q (one
# --exclusive webkit lock each); WA-1 on WADD.q. A guard refusal (no <name>.log) stops that chain; this script then stops every later chain.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-14/C-A14-records
echo "# cc-resume $(date '+%F %T') · load $(sysctl -n vm.loadavg) · pid $$" >> $R/chain.log
ok() { grep -q "^# $1 never admitted" $R/chain.log && { echo "# cc-resume stops: $1 was refused; later chains unrun" >> $R/chain.log; exit 3; }; true; }
df1() { local f=$(df -g /System/Volumes/Data | awk 'NR==2{print $4}'); echo "# disk free ${f} GB before $1" >> $R/chain.log; (( f >= 15 )) || { echo "# cc-resume stops: disk ${f} GB < 15 before $1" >> $R/chain.log; exit 4; }; }
df1 C-4;  zsh $R/cc-chain.sh C  $R/C-1.held 4; ok C-4; ok C-5; ok C-6
df1 CR-1; zsh $R/cc-chain.sh CR $R/CR.q 1;     ok CR-1; ok CR-2
df1 AD-1; zsh $R/cc-chain.sh AD $R/ADD.q 1;    ok AD-1; ok AD-2
df1 WK-1; zsh $R/cc-chain.sh WK $R/WQ.q 1;     for i in 1 2 3 4 5 6; do ok WK-$i; done
df1 WA-1; zsh $R/cc-chain.sh WA $R/WADD.q 1;   ok WA-1; ok WA-2
echo "# cc-resume done $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/chain.log
