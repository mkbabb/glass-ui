#!/bin/bash
# run13.sh (D2 pass 13, BUILDER): the seat's remaining order, one heavy run at a time (each step takes the seat lock).
#   1 build bp13 / bp13x / bp13i (build.sh ONLY=bp13) and the patch of record (mkpatch.sh), under the seat lock
#   2 the read queues (mkq.sh), written once
#   3 Chromium: PR, F7 + boot graph; the battery C·l, C·d; their read queues; cost
#   4 Playwright WebKit: per theme one --exclusive webkit slot (battery theme stage + fmlow + that column's queue), then the
#     rest of each WebKit queue in q slots
#   5 the digest (default and --ruled) and the harness check at the end
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p13/Bp-build; S=$G/docs/tranches/BL/design/dock/pass-13/D2-Bp-build-records/scripts
R=$S/../v2; mkdir -p $R/q; L() { echo "$(date '+%F %T') run13: $* · $(uptime | sed 's/.*load/load/')" >> $R/chain.log; }
if [ "${SKIP_BUILD:-}" != 1 ]; then
  LK=$B/seat.lock; until mkdir $LK 2>/dev/null; do sleep 5; done
  L "build bp13 (v2) into out2"; ONLY=bp13 OUT2=1 bash $S/build.sh; L "mkpatch"; bash $S/mkpatch.sh > $R/mkpatch.log 2>&1; L "mkpatch: $(tail -1 $R/mkpatch.log)"
  rmdir $LK
fi
# the final bp13x in the item-1 trace, 4 rounds per Chromium theme (the cure read by the same instrument as bp12x / bp10x)
OUT=$B/out2 TR=$R/trace BLDS=bp13x ROUNDS=4 bash $S/trace-c.sh
[ -s $R/q/chromium-light.q ] || { bash $S/mkq.sh > $R/q/mkq.log 2>&1; L "queues: $(tr '\n' ' ' < $R/q/mkq.log)"; }
STEPS="${S3:-pr f7}" bash $S/chain.sh
STEPS=bat COLS="chromium-light chromium-dark" bash $S/chain.sh
STEPS=q COLS="chromium-light chromium-dark" bash $S/chain.sh
STEPS=cost bash $S/chain.sh
STEPS=wk bash $S/chain.sh
STEPS=q COLS="webkit-light webkit-dark" bash $S/chain.sh
STEPS="digest hend" bash $S/chain.sh
L "RUN13-DONE"
