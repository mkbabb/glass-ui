# s5.sh <engine>: S5's G-13 lines (RU-98, RU-99, RU-100) on the item's tree (s9/trig9.mjs: the trigger in every region and
# both axes on w-trigr, the tab seats on w-glyphs-tab, the controls preset's glyph on w-ctl), then each plant on them:
# s5-tab38 (RU-98), s5-trigrun (RU-99), g13-trigseat (step 7's rule), s5-ctlglyph (RU-100).
. s9/common.sh; E="$1"
node s9/trig9.mjs "$PORT" s9-s5 --engine "$E" >> "$L/s9-s5-$E.log" 2>&1; echo "trig $E rc=$?"
for pl in s5-tab38 s5-trigrun g13-trigseat s5-ctlglyph; do plant $pl apply; node s9/trig9.mjs "$PORT" "s9-s5-$pl" --engine "$E" >> "$L/s9-s5-$E.log" 2>&1; plant $pl revert; done
echo "s5 $E done"
