# MEASURE-8, queue R3 (the second resume, 2026-11-19 evening, after the battery stop at 17:03 and a reboot): what queue R2
# had not read when the power hold paused it at 13:04 inside G-16's candidate tree. That tree was half extracted (5.0 GB)
# and was removed; g16fix8.sh now archives the ref without docs/. In R2's order: G-16 on the candidate (and G-12 on that
# archive's dist) with its two plants, the canceller-stack reread, Q14's prototype, and G-14's plants in WebKit 2287 last.
none raw 30 ../logs/m8-g16-cand.json m8/g16fix8.sh 943fe6e9d /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/.g16-cand cand
none raw 30 ../logs/m8-g16-unused.json m8/g16fix8.sh 943fe6e9d /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/.g16-cand unused unused
none raw 30 ../logs/m8-g16-used.json m8/g16fix8.sh 943fe6e9d /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/.g16-cand used used
preview webkit 20 ../logs/m8-trig-build-who.webkit.json node m8/trig8.mjs 5401 build-who --engine webkit --only select-touch,sheet-touch >> ../logs/m8-hr3.log 2>&1
preview chromium 20 ../logs/m8-trig-build-who.chromium.json node m8/trig8.mjs 5401 build-who --engine chromium --only select-touch,sheet-touch >> ../logs/m8-hr3.log 2>&1
dev raw 40 ../logs/m8-owner/owner9.proto.webkit.json m8/proto14.sh
none raw 120 ../logs/m8-g14plant-zoom.log m8/g14plantrun8.sh
