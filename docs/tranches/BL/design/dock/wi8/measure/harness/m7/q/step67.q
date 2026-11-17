dev chromium 25 ../logs/m7-inflow-ru61pre.chromium.json node m7/inflow7.mjs 5402 ru61pre --engine chromium >> ../logs/m7-tokens.log 2>&1
dev webkit 25 ../logs/m7-inflow-ru61pre.webkit.json node m7/inflow7.mjs 5402 ru61pre --engine webkit >> ../logs/m7-tokens.log 2>&1
none light 3 - python3 m7/ru61.py >> ../logs/m7-tokens.log 2>&1; sleep 5
dev chromium 25 ../logs/m7-inflow-ru61.chromium.json node m7/inflow7.mjs 5402 ru61 --engine chromium --shots ../owner-m7/inflow >> ../logs/m7-tokens.log 2>&1
dev webkit 25 ../logs/m7-inflow-ru61.webkit.json node m7/inflow7.mjs 5402 ru61 --engine webkit --shots ../owner-m7/inflow >> ../logs/m7-tokens.log 2>&1
dev gpu 30 ../logs/cost2.ru61.json node m7/cost7.mjs 5402 ru61 --cells w-inflow >> ../logs/m7-tokens.log 2>&1
none light 3 - cd /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8 && git diff -- src/components/dock/composables/useDockBody.ts > /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/docs/tranches/BL/design/dock/wi8/measure/harness/m7/ru61.patch && git checkout -- src/components/dock/composables/useDockBody.ts && git diff --quiet -- src && echo 'ru61 reverted' >> /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/docs/tranches/BL/design/dock/wi8/measure/harness/../logs/m7-tokens.log
dev chromium 15 ../logs/m7-adds-adds7pre.chromium.json node m7/adds7.mjs 5402 adds7pre --engine chromium >> ../logs/m7-tokens.log 2>&1
dev webkit 15 ../logs/m7-adds-adds7pre.webkit.json node m7/adds7.mjs 5402 adds7pre --engine webkit >> ../logs/m7-tokens.log 2>&1
none light 3 - python3 m7/adds7.py >> ../logs/m7-tokens.log 2>&1; sleep 5
dev chromium 15 ../logs/m7-adds-adds7.chromium.json node m7/adds7.mjs 5402 adds7 --engine chromium >> ../logs/m7-tokens.log 2>&1
dev webkit 15 ../logs/m7-adds-adds7.webkit.json node m7/adds7.mjs 5402 adds7 --engine webkit >> ../logs/m7-tokens.log 2>&1
