#!/bin/zsh
# FLOOR-V6 seat · part 3, after chain.sh's CHAIN-DONE: typecheck and the whole suite on each state WITH its own built
# dist (chain 1's fv6 unit ran before any library build, so its dist-reading cases read no dist), and HEAD's own suite
# with HEAD's dist as the baseline the floor's counts are read against. Ends at state dp. Note: chain.log's
# "exit N" after each stage is not the stage's code (the date substitution resets $?); each stage log's last line is.
D=${0:A:h}; R=$D/run-fv6.sh; C=$D/logs/chain.log
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p7/floor6; WT=$W/wt
T=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile
HN=$T/harness; L=$D/logs; G=~/.claude/guard/guarded
st() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg) · start $*" >> $C; zsh $R "$@"; local rc=$?; echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg) · rc $rc $*" >> $C; }
until grep -q CHAIN-DONE $C; do sleep 30; done
echo "=== chain2 $(date '+%F %T')" >> $C
# HEAD: reverse the route and the floor, build HEAD's dist, run HEAD's suite
F=$L/state-head.log; date > $F
( cd $WT && git apply -R $T/pass-7/D4-Dp.patch && git apply -R $T/pass-7/floor-v6.patch && echo "HEAD $(git rev-parse --short HEAD) · git diff HEAD $(git diff HEAD --binary | wc -c | tr -d ' ') bytes" ) >> $F 2>&1
st libbuild head; st tsc head; st unit head
st state fv6; st libbuild fv6; st tsc fv6-2; st unit fv6-2
st state dp; st libbuild dp-2; st tsc dp-2; st unit dp-2
echo "=== CHAIN2-DONE $(date '+%F %T')" >> $C
