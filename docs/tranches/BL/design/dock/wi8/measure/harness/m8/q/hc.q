# MEASURE-8, queue C: G-16's consumer fixture and G-12 on `git archive` builds (the builds run under the guard inside)
preview webkit 20 ../logs/m8-trig-build-who.webkit.json node m8/trig8.mjs 5401 build-who --engine webkit --only select-touch,sheet-touch >> ../logs/m8-hc.log 2>&1
preview chromium 20 ../logs/m8-trig-build-who.chromium.json node m8/trig8.mjs 5401 build-who --engine chromium --only select-touch,sheet-touch >> ../logs/m8-hc.log 2>&1
none raw 30 ../logs/m8-g16-base.json m8/g16fix8.sh v11.0.2 /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/.v11.0.2 base
none raw 30 ../logs/m8-g16-cand.json m8/g16fix8.sh 943fe6e9d /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/.g16-cand cand
none raw 30 ../logs/m8-g16-unused.json m8/g16fix8.sh 943fe6e9d /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/.g16-cand unused unused
none raw 30 ../logs/m8-g16-used.json m8/g16fix8.sh 943fe6e9d /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/.g16-cand used used
