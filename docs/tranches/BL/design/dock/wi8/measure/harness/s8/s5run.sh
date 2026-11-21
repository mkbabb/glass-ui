#!/usr/bin/env bash
# s5run.sh <engine> <tree-dir> <port>: S5's run on the item's dev server (run under devtree.sh on <port>). G-13's census
# (the seat and glyph lines, census8) on the item, then under each of RU-75's two plants (tabauto, iconword); the
# folded-face line (face8) on the item and under RU-76's plant (facerule); G-15 re-read on chrome (RU-76: the hexagon
# face, its size class off). Then S3's fold read again past the idle window (fold8b; ControlsDock.vue is as S3 left it)
# and under RU-79's plant. Each plant is applied to the item's tree only and reverted before the next read.
set -uo pipefail
E="$1"; T="$2"; P="$3"
node m8/census8.mjs "$P" s8-s5 --engine "$E"
for pl in tabauto iconword; do
  python3 s8/plant8.py "$T" $pl apply; sleep 3
  node m8/census8.mjs "$P" "s8-s5-$pl" --engine "$E"
  python3 s8/plant8.py "$T" $pl revert; sleep 2
done
node s8/face8.mjs "$P" s5 --engine "$E"
python3 s8/plant8.py "$T" facerule apply; sleep 3
node s8/face8.mjs "$P" s5-facerule --engine "$E"
python3 s8/plant8.py "$T" facerule revert; sleep 2
node m8/ink8.mjs "$P" s8-s5-chrome --engine "$E" --pages chrome --base "../logs/m8-ink-base.$E.json"
node s8/fold8b.mjs "$P" s3b --engine "$E"
python3 s8/foldplant.py "$T" 969137aac apply; sleep 3; node s8/fold8b.mjs "$P" s3b-plant --engine "$E"; python3 s8/foldplant.py "$T" 969137aac revert
echo "s5run $E done"
