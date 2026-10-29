#!/bin/bash
# chain6.sh (D2 pass 8, B′ prototype): the open rows re-read at a lower load. The battery (battery/) ran at 30-52; the H8
# baseline for bp7 ran at 13-31. Each step starts only at a 1-minute load <= MAXLOAD (default 31, the baseline's top), and
# waits at most WAIT_S (default 2400 s) for it, else logs DEFERRED and skips that step:
#   F7 on the tree (f7·units carried the menu file red);
#   the Playwright WebKit battery, one `theme` slot per theme (--exclusive webkit, queued and never cancelled), into
#   battery-low/ (REC) — every witness, so the WebKit columns can be digested whole at this load; re-runs as the battery's.
# Then strips.sh (the B2 strips on the same build).
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p8/Bp-proto; OUT=$B/out; WT=$B/wt
D=$G/docs/tranches/BL/design/dock; H=$D/harness; REC=$D/pass-8/D2-Bp-proto-records; S=$REC/scripts; GD=$HOME/.claude/guard/guarded
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $REC/chain.log; }
load1() { sysctl -n vm.loadavg | awk '{print $2}'; }
gate() { local t0=$(date +%s); while [ "$(echo "$(load1) > ${MAXLOAD:-31}" | bc)" = 1 ]; do
  [ $(( $(date +%s) - t0 )) -ge ${WAIT_S:-2400} ] && { L "DEFERRED $1: the 1-minute load stayed over ${MAXLOAD:-31}"; return 1; }; sleep 30; done; }
mkdir -p $REC/F7-low $REC/battery-low
if gate "F7-low"; then L "start F7-low"; rm -rf $OUT/f7-low
  (uptime; $GD --timeout 60 -- node $H/f7.mjs $WT --out $OUT/f7-low; echo "exit $?"; uptime) > $REC/F7-low/F7.log 2>&1
  find $OUT/f7-low -name F7.json -exec cp {} $REC/F7-low/F7.json \; ; L "end F7-low"; fi
# battery.sh copies every *.json under out/webkit/bp8 into its REC: set chain5's fmlow outputs aside first.
[ -d $OUT/webkit/bp8 ] && mv $OUT/webkit/bp8 $OUT/webkit/bp8-before-low
for t in light dark; do
  if gate "bp8 webkit $t (low)"; then L "start bp8 webkit $t (low)"
    BUILD=bp8 ENG=webkit REC=$REC/battery-low THEME=$t TMIN=90 WT=$WT bash $H/battery.sh $OUT theme >> $REC/battery-low/chain-bp8-webkit.log 2>&1
    L "end bp8 webkit $t (low) exit $?"; fi
done
L "start strips"; bash $S/strips.sh; L "end strips"; L "CHAIN6-DONE"
