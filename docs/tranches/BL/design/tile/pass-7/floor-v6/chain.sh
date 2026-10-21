#!/bin/zsh
# FLOOR-V6 seat · the order run (run 2; run 1's logs are in logs/run1/, stopped before any WebKit admission when its
# battery showed FV6-3's first spelling outranking the hover). Engine-free and Chromium first, then every Playwright WebKit
# read in two `--exclusive webkit` holds (queued behind the machine-wide lock, never cancelled for the wait), then HEAD's
# own suite with HEAD's dist as the baseline. Serial: one heavy run at a time. Each stage's code is the `rc` below.
D=${0:A:h}; R=$D/run-fv6.sh; C=$D/logs/chain.log
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p7/floor6; WT=$W/wt
T=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile
st() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg) · start $*" >> $C; zsh $R "$@"; local rc=$?; echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg) · rc $rc $*" >> $C; }
echo "=== chain run 2 $(date '+%F %T')" >> $C
st check
st state fv6; st sheet fv6; st libbuild fv6; st tsc fv6; st unit fv6; st build fv6; st plant fv6
st state dp; st sheet dp; st libbuild dp; st tsc dp; st unit dp; st unit-plants; st build dp; st plant dp
st reads fv6 chromium; st reads dp chromium; st probe dp chromium; st battery dp chromium
echo "=== chain part 1 done $(date '+%F %T')" >> $C
st wk A reads:fv6 reads:dp probe:dp
st wk B battery:dp
echo "=== chain part 2 done $(date '+%F %T')" >> $C
F=$D/logs/state-head.log; date > $F
( cd $WT && git apply -R $T/pass-7/D4-Dp.patch && git apply -R $T/pass-7/floor-v6.patch && echo "HEAD $(git rev-parse --short HEAD) · git diff HEAD $(git diff HEAD --binary | wc -c | tr -d ' ') bytes" ) >> $F 2>&1
st libbuild head; st tsc head; st unit head
st state dp
echo "=== CHAIN-DONE $(date '+%F %T')" >> $C
