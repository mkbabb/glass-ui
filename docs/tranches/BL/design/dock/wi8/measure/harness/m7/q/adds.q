# MEASURE-7 step 7, the two small adds on their sites' cells (m7/adds7.mjs: w-trig, w-group), before and after m7/adds7.py
dev chromium 15 ../logs/m7-adds-adds7pre.chromium.json node m7/adds7.mjs 5402 adds7pre --engine chromium >> ../logs/m7-tokens.log 2>&1
dev webkit 15 ../logs/m7-adds-adds7pre.webkit.json node m7/adds7.mjs 5402 adds7pre --engine webkit >> ../logs/m7-tokens.log 2>&1
none light 3 - python3 m7/adds7.py >> ../logs/m7-tokens.log 2>&1; sleep 5
dev chromium 15 ../logs/m7-adds-adds7.chromium.json node m7/adds7.mjs 5402 adds7 --engine chromium >> ../logs/m7-tokens.log 2>&1
dev webkit 15 ../logs/m7-adds-adds7.webkit.json node m7/adds7.mjs 5402 adds7 --engine webkit >> ../logs/m7-tokens.log 2>&1
