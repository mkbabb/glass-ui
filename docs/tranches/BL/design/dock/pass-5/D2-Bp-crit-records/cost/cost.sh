#!/bin/bash
# cost.sh (D2-B′ critic, pass 5): the prototype's cost arm (pass-2/D2-Bp-probes.mjs --arm pcost,plead), Chromium
# traced, on bp and fv4 (built here by reversing the route patch), each in its own guarded slot, --cpu-cores 0
# (timing-sensitive). Not a row: recorded for Q-15.   bash cost.sh <worktree> <out>
set -u
WT=$1; OUT=$2; D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock; C=$D/pass-5/D2-Bp-crit-records/cost
BP=$D/pass-5/D2-Bp-proto.patch; AD=$D/pass-3/adapter-floor-v2.mjs
G="$HOME/.claude/guard/guarded --cpu-cores 0 --timeout 60 --"
(cd $WT && git apply -R $BP) && echo "tree fv4" > $C/apply.log
(uptime; $G node $D/harness/build.mjs $WT --out $OUT --label fv4; echo "exit $?"; uptime) > $C/build-fv4.log 2>&1
(cd $WT && git apply $BP) && echo "tree bp" >> $C/apply.log
for b in bp fv4; do
  (uptime; $G node $D/pass-2/D2-Bp-probes.mjs --build $OUT/builds/$b --adapter $AD --arm pcost,plead --engine chromium --out $C/cost-$b-chromium.json; echo "exit $?"; uptime) > $C/cost-$b-chromium.log 2>&1
done
echo COST-DONE >> $C/apply.log
