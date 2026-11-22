# s3.sh <engine>: S3's cells (RU-93, RU-111) on the item's tree, inside s9/dev9.sh: level9 (the token in every cell, the
# recipe's plate and the dock in a light document under the brackets), the dark dock's computed blur beside a dark card's
# (m9/blur9.mjs, its "build" state now the source's 0.7), then RU-93's plant (the token's dark line removed) on level9.
. s9/common.sh; E="$1"
node s9/level9.mjs "$PORT" s9-s3 --engine "$E" > /dev/null 2>> "$L/s9-s3-$E.log"; echo "level9 $E done"
node m9/blur9.mjs "$PORT" s9-s3 --engine "$E" >> "$L/s9-s3-$E.log" 2>&1; echo "blur $E done"
plant s3-nodark apply
node s9/level9.mjs "$PORT" s9-s3-nodark --engine "$E" > /dev/null 2>> "$L/s9-s3-$E.log"
plant s3-nodark revert
echo "s3 $E done"
