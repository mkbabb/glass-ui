# MEASURE-8, queue R (the resume, 2026-11-18): what queues B and C did not read when guarded refused every browser run at
# 11:18 on 2026-11-17 (kernel zone at 8.36M). The plants first (g13-tabsvg, H12, first), each run once (`-`: the refusal logs
# of 2026-11-17 are in git at their commits); then H9's memory plant, G-16's fixture with its two plants and G-12 on the
# archive tree, the canceller-stack reread, Q14's prototype, and G-14's plants in WebKit 2287 last (the longest).
dev raw 60 - m8/plantrun8.sh g13-tabsvg
dev raw 60 - m8/plantrun8.sh g2-facehalf
dev raw 60 - m8/plantrun8.sh g4-ghost
dev raw 60 - m8/plantrun8.sh g8-exempt
dev raw 60 - m8/plantrun8.sh g8-trigger
dev raw 60 - m8/plantrun8.sh g11-rest
dev raw 80 - m8/plantrun8.sh g15-baked
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
