# MEASURE-7 step 9's frames on the pass's build (owner7: glyph, hover, seatset; owner8: Q10, Q13 to Q18; many-strip), the name table, the strips into the main checkout's fold/ (*-7*); then the page's dist deleted
preview chromium 20 - node m7/owner7.mjs 5401 ../owner-m7 --engine chromium --only glyph >> ../logs/m7p-owner-chromium.log 2>&1
preview chromium 20 - node m7/owner7.mjs 5401 ../owner-m7 --engine chromium --only hover >> ../logs/m7p-owner-chromium.log 2>&1
preview chromium 20 - node m7/owner7.mjs 5401 ../owner-m7 --engine chromium --only seatset >> ../logs/m7p-owner-chromium.log 2>&1
preview chromium 45 ../owner-m7/owner8.chromium.json node m7/owner8.mjs 5401 ../owner-m7 --engine chromium >> ../logs/m7p-owner-chromium.log 2>&1
preview chromium 10 - node m5/many-strip.mjs 5401 ../owner-m7 chromium >> ../logs/m7p-owner-chromium.log 2>&1
preview webkit 20 - node m7/owner7.mjs 5401 ../owner-m7 --engine webkit --only glyph >> ../logs/m7p-owner-webkit.log 2>&1
preview webkit 20 - node m7/owner7.mjs 5401 ../owner-m7 --engine webkit --only hover >> ../logs/m7p-owner-webkit.log 2>&1
preview webkit 20 - node m7/owner7.mjs 5401 ../owner-m7 --engine webkit --only seatset >> ../logs/m7p-owner-webkit.log 2>&1
preview webkit 45 ../owner-m7/owner8.webkit.json node m7/owner8.mjs 5401 ../owner-m7 --engine webkit >> ../logs/m7p-owner-webkit.log 2>&1
preview webkit 10 - node m5/many-strip.mjs 5401 ../owner-m7 webkit >> ../logs/m7p-owner-webkit.log 2>&1
none light 5 ../logs/m7p-names.txt node m7/names.mjs v11.1.0 HEAD > ../logs/m7p-names.txt 2>&1
none light 10 - python3 m7/strips7.py ../crops-m7p ../owner-m7 /Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/wi8/fold ../logs /Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/wi8/fold $(cd /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8 && git rev-parse --short HEAD) > ../logs/m7p-strips.txt 2>&1
none light 3 - rm -rf /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/dist-wi8
