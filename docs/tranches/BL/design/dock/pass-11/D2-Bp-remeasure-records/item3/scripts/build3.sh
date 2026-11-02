#!/bin/bash
# build3.sh (D2 pass 11, B′ re-measure COMPLETION seat, REGISTRY §P10-7.3 item 3): the three builds the readings need, in the
# seat worktree, each guarded, one at a time. fv5 = HEAD + pass-6/floor-v5.patch; bp8 = fv5 + pass-9/D2-Bp-p9.patch;
# bp10 = fv5 + pass-11/D2-Bp-p11.patch (b5d5c9db…). Then on the bp10 tree the library and demo dist builds (what F7 builds),
# for the boot graph (pass-10 bootsize.py). Steps 1-2 are not redone.
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p11/Bp-remeasure-c; WT=$B/wt; OUT=$B/out
D=$G/docs/tranches/BL/design/dock; H=$D/harness; R=$D/pass-11/D2-Bp-remeasure-records/item3
FV5=$D/pass-6/floor-v5.patch; P9=$D/pass-9/D2-Bp-p9.patch; P11=$D/pass-11/D2-Bp-p11.patch
GD="$HOME/.claude/guard/guarded --timeout 30 --"; A=$R/apply.log
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $R/chain.log; }
ap() { (cd $WT && git apply --check "$1" && git apply "$1") >> $A 2>&1 && echo "applied $1" >> $A || { echo "APPLY FAILED $1" >> $A; exit 1; }; }
rv() { (cd $WT && git apply -R "$1") >> $A 2>&1 && echo "reversed $1" >> $A || { echo "REVERSE FAILED $1" >> $A; exit 1; }; }
build() { (uptime; $GD node $H/build.mjs $WT --out $OUT --label "$1"; echo "build exit $?"; uptime) > $R/build-$1.log 2>&1; echo "built $1: $(grep 'build exit' $R/build-$1.log)" >> $A; }
{ date; git -C $WT rev-parse HEAD; shasum -a 256 $FV5 $P9 $P11; } > $A
L "BUILD3 start"
ap $FV5; build fv5
ap $P9; build bp8; rv $P9
ap $P11; build bp10
echo "dirty files at bp10: $(git -C $WT status --porcelain --untracked-files=no | wc -l | tr -d ' ')" >> $A
(uptime; $GD bash -c "cd $WT && npx vite build && npm run demo:dist:build"; echo "exit $?"; uptime) > $R/build-bp10-dist.log 2>&1
echo "bp10 dist: $(grep '^exit' $R/build-bp10-dist.log)" >> $A
python3 -I $D/pass-10/D2-Bp-proto-records/scripts/bootsize.py $WT > $R/boot-graph.txt 2>&1
L "BUILD3 done: $(head -1 $R/boot-graph.txt)"
