# s2.sh <engine>: S2's cells (RU-109 as amended for R8-4; RU-98's cockpit line). G-1 (k) and (k2) (m9/h1.mjs): the run
# seat's leave still lingers one `--dock-linger` (now with no dwell), the persistent seat's still folds at once; the
# hold build's marks after the pose block's removal (s9/marks9.mjs): dock:read, dock:write and dock:reread only, no
# __dockHold.
. s9/common.sh; E="$1"
node m9/h1.mjs "$PORT" s9-s2 --engine "$E" --only k,k2 >> "$L/s9-s2-$E.log" 2>&1; echo "h1 $E rc=$?"
node s9/marks9.mjs "$PORT" s9-s2 --engine "$E" >> "$L/s9-s2-$E.log" 2>&1; echo "marks $E rc=$?"
echo "s2 $E done"
