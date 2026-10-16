#!/bin/sh
# AMEND-4 serial glass-ui driver: one headless Chromium at a time over the demo built in this seat's own worktree
# (GAP_DIST or the g4probe default), each run guard-contained (light, RSS cap, short timeout).
cd "$(dirname "$0")" || exit 1
G="$HOME/.claude/guard/guarded --light --rss-gb 4 --timeout 4 --"
run() { echo "== $*"; $G "$@" 2>&1 | tail -1; }
run node g4probe.mjs retarget-mf r1   # run first, on its own, to check the instrument
run node g4probe.mjs retarget-mf r2
for b in 0 45 150 400; do run env BLOCK=$b node g4probe.mjs block r1; done
run node g4probe.mjs jump4 r1
run node g4probe.mjs jump4 r2
run node g4probe.mjs enter3 wheel
run node g4probe.mjs enter3 jump
run node g4probe.mjs enter3 outback
run env PLANT=linear node g4probe.mjs enter3 wheel
run env PLANT=linear node g4probe.mjs enter3 jump
run env PLANT=token node g4probe.mjs enter3 wheel
run env PLANT=token node g4probe.mjs enter3 jump
run env PLANT=rafspring node g4probe.mjs enter3 jump
run env PLANT=cascade node g4probe.mjs enter3 wheel   # superseded: the hero enters from above, past the view() entry range
run env PLANT=cascade node g4probe.mjs enter3 jump    # superseded, as above
run env PLANT=replay node g4probe.mjs enter3 outback
# pass 2 (after the plant's observer moved to the carousel and the keyframe easing was logged): the plants re-run;
# the cascade plant enters carousel 2 from below
for p in linear token; do run env PLANT=$p node g4probe.mjs enter3 wheel; run env PLANT=$p node g4probe.mjs enter3 jump; done
run env PLANT=rafspring node g4probe.mjs enter3 jump
run env PLANT=replay node g4probe.mjs enter3 outback
run env K=2 PLANT=cascade node g4probe.mjs enter3 below-wheel
run env K=2 PLANT=cascade node g4probe.mjs enter3 below-jump
run env K=2 PLANT=linear node g4probe.mjs enter3 below-wheel
run env K=2 PLANT=linear node g4probe.mjs enter3 below-jump
# pass 3: every enter3 run above is superseded. At 1440 x 900 <main> scrolls only 324 px, so the hero never left the
# viewport and the plants fired at arm time. The entrance runs are repeated at 1440 x 500, where it leaves.
for t in wheel jump outback; do run node g4probe.mjs enter3 $t 1440 500; done
for p in linear token; do run env PLANT=$p node g4probe.mjs enter3 wheel 1440 500; run env PLANT=$p node g4probe.mjs enter3 jump 1440 500; done
run env PLANT=rafspring node g4probe.mjs enter3 jump 1440 500
run env PLANT=replay node g4probe.mjs enter3 outback 1440 500
for p in cascade linear; do run env K=2 PLANT=$p node g4probe.mjs enter3 below-wheel 1440 500; run env K=2 PLANT=$p node g4probe.mjs enter3 below-jump 1440 500; done
# pass 4: the hero runs of pass 3 re-run with the in-position at 25 % of the viewport (pass 3 jumped to <main> 0,
# where 55 % of the hero shows, under the plants' 0.6 threshold, so the jump plants never fired); the k2 runs stand
for t in wheel jump outback; do run node g4probe.mjs enter3 $t 1440 500; done
for p in linear token; do run env PLANT=$p node g4probe.mjs enter3 wheel 1440 500; run env PLANT=$p node g4probe.mjs enter3 jump 1440 500; done
run env PLANT=rafspring node g4probe.mjs enter3 jump 1440 500
run env PLANT=replay node g4probe.mjs enter3 outback 1440 500
echo DONE
