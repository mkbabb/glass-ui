# MEASURE-7 step 5, RU-58: the composition census before and after the size classes come off (m7/comp58.mjs), and G-15's ink on the three pages after
dev chromium 20 ../logs/m7-comp58-ru58pre.chromium.json node m7/comp58.mjs 5402 ru58pre --engine chromium >> ../logs/m7-tokens.log 2>&1
dev webkit 20 ../logs/m7-comp58-ru58pre.webkit.json node m7/comp58.mjs 5402 ru58pre --engine webkit >> ../logs/m7-tokens.log 2>&1
none light 3 - cp m7/comp-ru58/*.vue m7/comp/ && cp m7/comp/*.vue /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/demo/__anim/mounts/comp/ && sleep 5
dev chromium 20 ../logs/m7-comp58-ru58.chromium.json node m7/comp58.mjs 5402 ru58 --engine chromium >> ../logs/m7-tokens.log 2>&1
dev chromium 20 ../logs/m7-ink-ru58.chromium.json node m7/ink7.mjs 5402 ru58 --engine chromium --pages nav,chrome,rail --label ru58 --base ../logs/m7-ink-base1102.chromium.json >> ../logs/m7-tokens.log 2>&1
dev webkit 20 ../logs/m7-comp58-ru58.webkit.json node m7/comp58.mjs 5402 ru58 --engine webkit >> ../logs/m7-tokens.log 2>&1
dev webkit 20 ../logs/m7-ink-ru58.webkit.json node m7/ink7.mjs 5402 ru58 --engine webkit --pages nav,chrome,rail --label ru58 --base ../logs/m7-ink-base1102.webkit.json >> ../logs/m7-tokens.log 2>&1
