#!/bin/bash
# P-E10 CK-22, §P9-7 item 9: C-2's census looked 20 lines up from a <Slider>. Whole file: every <Slider>/<NumberField> in a .vue that also names an overflow clip, and the lines. Siblings read only (value.js by grep only).
cd ~/Programming
X="--exclude-dir=node_modules --exclude-dir=dist --exclude-dir=dist-demo --exclude-dir=dist-ob11 --exclude-dir=.worktrees --exclude-dir=worktrees --exclude-dir=.claude --exclude-dir=docs --exclude-dir=.git --exclude-dir=bench --exclude-dir=coverage"
echo "# $(date '+%F %T') · glass-ui HEAD $(git -C glass-ui rev-parse --short HEAD)"
for r in atlas bbnf-buddy keyframes.js speedtest value.js fourier-analysis sci-report; do for f in $(grep -rlE --include=*.vue $X -e '<(Slider|NumberField)\b' $r 2>/dev/null); do c=$(grep -nE -e 'overflow-(hidden|auto|scroll|clip|x-|y-)|overflow(-[xy])?: *(hidden|auto|scroll|clip)' "$f" | cut -c1-110 | sed 's/  */ /g' | tr '\n' '|'); [ -n "$c" ] && echo "$f :: sliders at $(grep -nE -e '<(Slider|NumberField)\b' "$f" | cut -d: -f1 | tr '\n' ',') :: $c"; done; done
