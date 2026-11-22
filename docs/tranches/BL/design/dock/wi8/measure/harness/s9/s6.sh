# s6.sh <engine>: S6's cells (RU-101, RU-90, RU-89) on the item's tree. w-words's growth and shrink (p6-words-fine: read6's
# held and overlap clauses on the rows); G-6's press cell (p9-press-fine, m9/g6d.mjs on the rows) and G-1 (k), (k2)
# (m9/h1.mjs); release-11-0-2's rail cells (O-262, :1126 among them) and, in Chromium, the idle-fold cell (:702); then
# the idle fold's writes (s9/idle9.mjs, O-268, Chromium); the plants: s6-words on p6-words-fine, s6-empty on the rail cells, s6-nogate on the press cell, s6-afterseat on (k2).
. s9/common.sh; E="$1"
probes s9-s6 "$E" scenarios-m6/p6-words-fine.json scenarios-m9/p9-press-fine.json; echo "probes $E done"
node m9/h1.mjs "$PORT" s9-s6 --engine "$E" --only k,k2 >> "$L/s9-s6-$E.log" 2>&1; echo "h1 $E rc=$?"
[ "$E" = chromium ] && { node s9/idle9.mjs "$PORT" s9-s6 >> "$L/s9-s6-$E.log" 2>&1; echo "idle $E rc=$?"; }
if [ "$E" = chromium ]; then pw s6-g14 chromium chromium-headless-new coarse-touch -- release-11-0-2.spec.ts -g "rail ·|fold · an idle fold"
else CFGWK=release-11-0-2.config.ts pw s6-g14 webkit webkit webkit-touch -- release-11-0-2.spec.ts -g "rail ·"; fi
plant s6-words apply; probes s9-s6-words "$E" scenarios-m6/p6-words-fine.json; plant s6-words revert
plant s6-empty apply
if [ "$E" = chromium ]; then pw s6-empty chromium chromium-headless-new -- release-11-0-2.spec.ts -g "rail ·"
else CFGWK=release-11-0-2.config.ts pw s6-empty webkit webkit -- release-11-0-2.spec.ts -g "rail ·"; fi
plant s6-empty revert
plant s6-nogate apply; probes s9-s6-nogate "$E" scenarios-m9/p9-press-fine.json; plant s6-nogate revert
plant s6-afterseat apply; node m9/h1.mjs "$PORT" s9-s6-afterseat --engine "$E" --only k2 >> "$L/s9-s6-$E.log" 2>&1; plant s6-afterseat revert
echo "s6 $E done"
