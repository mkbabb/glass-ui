# s1.sh <engine>: S1's cells (RU-91, RU-112) on the item's tree, inside s9/dev9.sh. G-2's outline clause and the corners on
# m9/items9.py's TALL scenarios (read6 and m9/corner9.mjs on the rows); the corner cell (s8/corner8.mjs, w-card, w-rounded,
# w-pill, both schemes); the one-glyph faces' boxes (m9/face9.mjs); G-14's corner specs (release-10-1-5, release-11-0-1:
# the 110); then RU-91's plant (s1-stadium) on the outline and the corner specs, and RU-112's (s1-facepad) on the faces.
. s9/common.sh; E="$1"
TALL="scenarios-m9/p9-tall-fine.json scenarios-m9/p9-tall-dark.json scenarios-m3/p3-swap-layers-fine.json scenarios-m3/p3-fold-flow-fine.json scenarios-m3/p3-swap-xf-fine.json scenarios-m3/p3-fold-vert-fine.json scenarios-m3/p3-fold-rail-fine.json scenarios-m9/p9-tallrow-fine.json scenarios-m3/p3-fold-pill-fine.json"
probes s9-s1 "$E" $TALL; echo "probes $E done"
for sch in light dark; do node s8/corner8.mjs "$PORT" s9-s1 --engine "$E" --scheme $sch --cells w-card,w-rounded,w-pill >> "$L/s9-s1-$E.log" 2>&1; done; echo "corner $E done"
node m9/face9.mjs "$PORT" s9-s1 --engine "$E" >> "$L/s9-s1-$E.log" 2>&1; echo "face $E done"
if [ "$E" = chromium ]; then pw s1-corner chromium chromium-headless-new coarse-touch -- tests-visual/release-11-0-1.spec.ts tests-visual/release-10-1-5.spec.ts
else pw s1-corner webkit webkit -- tests-visual/release-11-0-1.spec.ts tests-visual/release-10-1-5.spec.ts; fi
plant s1-stadium apply
probes s9-s1-stadium "$E" scenarios-m9/p9-tall-fine.json scenarios-m9/p9-tall-dark.json scenarios-m3/p3-swap-layers-fine.json scenarios-m3/p3-fold-flow-fine.json
[ "$E" = chromium ] && pw s1-corner-stadium chromium chromium-headless-new coarse-touch -- tests-visual/release-11-0-1.spec.ts tests-visual/release-10-1-5.spec.ts:217 tests-visual/release-10-1-5.spec.ts:647 tests-visual/release-10-1-5.spec.ts:1424
plant s1-stadium revert
plant s1-facepad apply
node m9/face9.mjs "$PORT" s9-s1-facepad --engine "$E" >> "$L/s9-s1-$E.log" 2>&1
plant s1-facepad revert
echo "s1 $E done"
