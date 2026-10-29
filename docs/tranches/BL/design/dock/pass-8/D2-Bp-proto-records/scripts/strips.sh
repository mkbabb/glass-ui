#!/bin/bash
# strips.sh (D2 pass 8, B′ prototype): FM's six B2 strips on bp8 (c4, patch b1ea7d86…) per engine and theme, for the eye
# (filmstrips/). The battery's own strip PNGs were removed with out/ by chain3's cleanup; its JSON and logs are the record.
# One FM run per engine and theme, each guarded; Playwright WebKit under --exclusive webkit, queued, never cancelled.
set -u
G=/Users/mkbabb/Programming/glass-ui; OUT=$G/.claude/worktrees/bl/D2/p8/Bp-proto/out; D=$G/docs/tranches/BL/design/dock
H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs; F=$D/pass-8/D2-Bp-proto-records/filmstrips; mkdir -p $F
for e in chromium webkit; do for t in light dark; do
  X=""; [ $e = webkit ] && X="--exclusive webkit"
  (echo "queued $(date) $(uptime)"; DOCK_HARNESS_THEME=$([ $t = dark ] && echo dark) ~/.claude/guard/guarded $X --timeout 30 -- node $H/film.mjs --build $OUT/builds/bp8 --adapter $AD --out $OUT/strips-$e-$t --engine $e; echo "exit $? $(date) $(uptime)") > $F/fm-$e-$t.log 2>&1
  for p in $(find $OUT/strips-$e-$t -name 'strip-*.png'); do cp $p $F/$t-$(basename $p); done
done; done
echo STRIPS-DONE >> $F/fm-done.txt
