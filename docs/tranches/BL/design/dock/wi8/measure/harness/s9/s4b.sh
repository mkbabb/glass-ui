# s4b.sh <engine>: S4's cells on the final S4 build. ink9 with no step injected (G-15 at the source's steps and levels;
# grid and daraksha grounds in Chromium only, RU-107); seg9; G-14's release-11-0-2 spec (the dark lift :634 static and
# live, the light fills :677) in the fine and coarse projects; then the plants, each read on the cell its gate claims:
# s4-press2 on :634 coarse, s4-hover8 on :677, s4-channel and s4-toggle08 on seg9, s4-cureqhover on ink9 nav.
. s9/common.sh; E="$1"
G=field,flat; [ "$E" = chromium ] && G=field,flat,grid,daraksha
node m9/ink9.mjs "$PORT" s9-s4 --engine "$E" --pages nav,action-row,canvas-tools,dials --grounds $G >> "$L/s9-s4-$E.log" 2>&1; echo "ink $E rc=$?"
node s9/seg9.mjs "$PORT" s9-s4 --engine "$E" >> "$L/s9-s4-$E.log" 2>&1; echo "seg $E rc=$?"
if [ "$E" = chromium ]; then
  pw s4-fills chromium chromium-headless-new coarse-touch -- release-11-0-2.spec.ts -g "fill ·"
  plant s4-press2 apply; pw s4-press2 chromium coarse-touch -- release-11-0-2.spec.ts -g "fill · in dark"; plant s4-press2 revert
  plant s4-hover8 apply; pw s4-hover8 chromium chromium-headless-new -- release-11-0-2.spec.ts -g "light scheme"; plant s4-hover8 revert
  plant s4-cureqhover apply; node m9/ink9.mjs "$PORT" s9-s4-cureqhover --engine "$E" --pages nav --grounds flat >> "$L/s9-s4-$E.log" 2>&1; plant s4-cureqhover revert
else
  CFGWK=release-11-0-2.config.ts pw s4-fills webkit webkit webkit-touch -- release-11-0-2.spec.ts -g "fill ·"
fi
plant s4-channel apply; node s9/seg9.mjs "$PORT" s9-s4-channel --engine "$E" >> "$L/s9-s4-$E.log" 2>&1; plant s4-channel revert
plant s4-toggle08 apply; node s9/seg9.mjs "$PORT" s9-s4-toggle08 --engine "$E" >> "$L/s9-s4-$E.log" 2>&1; plant s4-toggle08 revert
echo "s4 $E done"
