# s7.sh <engine>: S7's cells (RU-103 as amended for C8-M9, C8-M13, C8-16). Chromium on the GPU lane (the item runs under
# guarded --cpu-cores 0): G-11 by trace with the landing frames (s9/cost9.mjs: the trigger frame and the two after it, the
# landing frame and the two after it, the rest clause), the many-dock first frame (m9/trace9.mjs --mode docks, 18 and 10
# pills), then the morphing gate's plant (s7-nogate) on G-11's cells. WebKit: the rest clause (cost9 --engine webkit).
. s9/common.sh; E="$1"
if [ "$E" = chromium ]; then
  node s9/cost9.mjs "$PORT" s9-s7 --reps 3 >> "$L/s9-s7-$E.log" 2>&1; echo "cost $E rc=$?"
  for n in 18 10; do node m9/trace9.mjs "$PORT" "s9-s7-docks$n" --mode docks --n $n >> "$L/s9-s7-$E.log" 2>&1; echo "docks $n rc=$?"; done
  plant s7-nogate apply; node s9/cost9.mjs "$PORT" s9-s7-nogate --reps 1 --cells w-pill,w-flow >> "$L/s9-s7-$E.log" 2>&1; plant s7-nogate revert
else
  node s9/cost9.mjs "$PORT" s9-s7 --engine webkit >> "$L/s9-s7-$E.log" 2>&1; echo "cost $E rc=$?"
fi
echo "s7 $E done"
