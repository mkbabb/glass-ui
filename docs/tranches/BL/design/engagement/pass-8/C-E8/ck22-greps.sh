#!/bin/bash
# C-E8 CK-22: the consolidated MIGRATION table's consumer greps re-run at this HEAD (sibling trees READ ONLY: grep only).
# Fixes P-E8's summary line, whose `n -- '<pat>'` calls passed "--" as the pattern and dropped the repo path (VX and HS
# always printed 0); here every pattern goes through `grep -e`.
cd ~/Programming
R="atlas bbnf-buddy chicago keyframes.js slides speedtest value.js fourier-analysis sci-report"
X="--exclude-dir=node_modules --exclude-dir=dist --exclude-dir=dist-demo --exclude-dir=dist-ob11 --exclude-dir=.worktrees --exclude-dir=worktrees --exclude-dir=.claude --exclude-dir=docs --exclude-dir=.git --exclude-dir=bench --exclude-dir=coverage"
I="--include=*.vue --include=*.css --include=*.ts --include=*.tsx --include=*.scss --include=*.html"
g() { grep -rEn $I $X -e "$1" "$2" 2>/dev/null; }
n() { g "$1" "$2" | wc -l | tr -d ' '; }
echo "# $(date '+%F %T') C-E8 consumer greps · glass-ui HEAD $(git -C ~/Programming/glass-ui rev-parse --short HEAD)"
for r in $R; do echo "## $r HEAD $(git -C $r rev-parse --short HEAD 2>/dev/null)"; done
for r in $R; do
 echo "$r · Slider $(grep -rEn --include=*.vue $X -e '<Slider\b' $r 2>/dev/null | wc -l | tr -d ' ') · NumberField $(grep -rEn --include=*.vue $X -e '<NumberField\b' $r 2>/dev/null | wc -l | tr -d ' ') · glass-loupe $(n 'glass-loupe' $r) · focus-veil $(n 'glass-focus-veil' $r) · --veil-x/y $(n '--veil-[xy]' $r) · stage attrs $(n 'engage-footprint|data-engage-stage|data-engaged' $r) · held/stage vars $(n '--held-scale-|--stage-reach|--stage-room|--stage-w\b' $r) · Aurora mounts $(n '<(Glass)?Aurora\b' $r) · setCursor $(n 'setCursor|clearCursor' $r) · tap-squish/interactive-item $(n 'tap-squish|interactive-item' $r) · slider-track anchor $(n 'slider-track[^{]*\{[^}]*anchor' $r)"
done
echo "# --veil-x/y lines"; for r in $R; do g '--veil-[xy]' $r; done
echo "# Aurora mounts"; for r in $R; do g '<(Glass)?Aurora\b' $r; done
echo "# Slider/NumberField under an opacity/filter/clip-path/rotate wrapper (same file, ±6 lines): candidates for C-2's 'keeps the look of its place'"
for r in $R; do for f in $(grep -rlE --include=*.vue $X -e '<(Slider|NumberField)\b' $r 2>/dev/null); do grep -nE -B6 '<(Slider|NumberField)\b' $f | grep -E 'opacity-|opacity:|filter|clip-path|rotate|blur' | sed "s#^#$f:#"; done; done
