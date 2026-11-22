# s4a.sh <engine>: S4's step reading on the S4 build (the catch-light off, the channel off, RU-93's levels from the
# source): ink9 at hover 5 and 6.5 % over current 10 % on nav, action-row, canvas-tools and dials (field, flat), and
# the dials marks at current 12 and 14 %, each step injected over the source's; then seg9 (the segment pair, the active
# seat's shadow, the catch-light, the toggle) as the source stands. Chromium decides the steps (RU-94).
. s9/common.sh; E="$1"
for h in 5 6.5; do node m9/ink9.mjs "$PORT" s9-s4a-h$h-c10 --engine "$E" --pages nav,action-row,canvas-tools,dials --grounds field,flat --hstep $h --cstep 10 >> "$L/s9-s4a-$E.log" 2>&1; echo "ink h$h c10 $E rc=$?"; done
for c in 12 14; do node m9/ink9.mjs "$PORT" s9-s4a-h5-c$c-dials --engine "$E" --pages dials --grounds field,flat --hstep 5 --cstep $c >> "$L/s9-s4a-$E.log" 2>&1; echo "ink dials c$c $E rc=$?"; done
node s9/seg9.mjs "$PORT" s9-s4a --engine "$E" >> "$L/s9-s4a-$E.log" 2>&1; echo "seg $E rc=$?"
echo "s4a $E done"
