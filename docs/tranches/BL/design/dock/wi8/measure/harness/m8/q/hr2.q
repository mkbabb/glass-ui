# MEASURE-8, queue R2 (the resume, 2026-11-19): what queue R did not read when the owner paused every run at 12:45 on
# 2026-11-18 (the battery at 41 %). g15-onestep first (it was running at the pause; its log holds only the apply), then
# queue R's remaining items in its order: H9's memory plant, G-16's fixture with its two plants and G-12 on the archive
# tree, the canceller-stack reread, Q14's prototype, and G-14's plants in WebKit 2287 last (the longest).
dev raw 80 - m8/plantrun8.sh g15-onestep
dev raw 80 ../logs/m8-cost.h9-fitmemory.chromium.json m8/h9.sh
none raw 30 ../logs/m8-g16-base.json m8/g16fix8.sh v11.0.2 /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/.v11.0.2 base
none raw 30 ../logs/m8-g16-cand.json m8/g16fix8.sh 943fe6e9d /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/.g16-cand cand
none raw 30 ../logs/m8-g16-unused.json m8/g16fix8.sh 943fe6e9d /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/.g16-cand unused unused
none raw 30 ../logs/m8-g16-used.json m8/g16fix8.sh 943fe6e9d /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/.g16-cand used used
preview webkit 20 ../logs/m8-trig-build-who.webkit.json node m8/trig8.mjs 5401 build-who --engine webkit --only select-touch,sheet-touch >> ../logs/m8-hr.log 2>&1
preview chromium 20 ../logs/m8-trig-build-who.chromium.json node m8/trig8.mjs 5401 build-who --engine chromium --only select-touch,sheet-touch >> ../logs/m8-hr.log 2>&1
dev raw 40 - m8/proto14.sh
none raw 120 - m8/g14plantrun8.sh
