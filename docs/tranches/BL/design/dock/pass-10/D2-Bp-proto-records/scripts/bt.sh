#!/bin/bash
# bt.sh <label> [trace]: build the worktree's tree as <label> (scene + demo, guarded, under the seat lock); `trace` builds with the diagnosis instrument.
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p10/Bp-build; WT=$B/wt; OUT=$B/out; D=$G/docs/tranches/BL/design/dock; H=$D/harness; REC=$D/pass-10/D2-Bp-proto-records; S=$REC/scripts
F=$WT/src/components/dock/composables/useDockScene.ts
if [ "${2:-}" = trace ]; then cp $F $B/hold.ts; python3 -I $S/instrument.py $F; fi
$S/seatlock.sh $HOME/.claude/guard/guarded --timeout 20 -- node $H/build.mjs $WT --out $OUT --label $1 > $REC/build-$1.log 2>&1; echo "build $1 exit $?"
if [ "${2:-}" = trace ]; then cp $B/hold.ts $F; fi
