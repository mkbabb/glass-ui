#!/bin/bash
# P-E8 CK-22: the consolidated MIGRATION table's consumer greps, re-run at the pass-8 HEAD (sibling trees READ ONLY; value.js by
# grep only, nothing built or run in any sibling). Main trees only: node_modules, dist*, worktrees, .claude, docs, bench, .git excluded.
cd ~/Programming
R="atlas bbnf-buddy chicago keyframes.js slides speedtest value.js fourier-analysis sci-report"
X="--exclude-dir=node_modules --exclude-dir=dist --exclude-dir=dist-demo --exclude-dir=dist-ob11 --exclude-dir=.worktrees --exclude-dir=worktrees --exclude-dir=.claude --exclude-dir=docs --exclude-dir=.git --exclude-dir=bench --exclude-dir=coverage"
I="--include=*.vue --include=*.css --include=*.ts --include=*.tsx --include=*.scss --include=*.html"
g() { grep -rEn "$1" $2 $I $X 2>/dev/null; }
n() { g "$1" $2 | wc -l | tr -d ' '; }
echo "# $(date '+%F %T') P-E8 consumer greps · glass-ui HEAD $(git -C ~/Programming/glass-ui rev-parse --short HEAD)"
for r in $R; do echo "## $r HEAD $(git -C $r rev-parse --short HEAD 2>/dev/null)"; done
echo
echo "# S1 <Slider · S2 <NumberField · L glass-loupe · V glass-focus-veil · VX --veil-x/--veil-y · ST engage-footprint|data-engage-stage|data-engaged"
echo "# PA position-anchor|clip-path|mask-image|transform on a glass-slider/number-field rule · HS --held-scale-|--stage-reach|--stage-room|--stage-w"
echo "# AU <Aurora|<GlassAurora mounts · SC setCursor|clearCursor · TQ tap-squish|interactive-item · AC :active on .glass-slider"
for r in $R; do
 s1=$(grep -rEn "<Slider\b" $r --include=*.vue $X 2>/dev/null | wc -l | tr -d ' ')
 s2=$(grep -rEn "<NumberField\b" $r --include=*.vue $X 2>/dev/null | wc -l | tr -d ' ')
 echo "$r · S1 $s1 · S2 $s2 · L $(n 'glass-loupe' $r) · V $(n 'glass-focus-veil' $r) · VX $(n -- '--veil-[xy]' $r) · ST $(n 'engage-footprint|data-engage-stage|data-engaged' $r) · PA $(n '(glass-slider|number-field)[^{;]*\{[^}]*(position-anchor|clip-path|mask-image|transform)' $r) · HS $(n -- '--held-scale-|--stage-reach|--stage-room|--stage-w\b' $r) · AU $(n '<(Glass)?Aurora\b' $r) · SC $(n 'setCursor|clearCursor' $r) · TQ $(n 'tap-squish|interactive-item' $r) · AC $(n 'glass-slider[^{]*:active' $r)"
done
echo
echo "# the L, V, VX, ST, PA, HS, TQ, AC lines in full"
for r in $R; do g "glass-loupe|glass-focus-veil|--veil-[xy]|engage-footprint|data-engage-stage|data-engaged|--held-scale-|--stage-reach|--stage-room|tap-squish|interactive-item|glass-slider[^{]*:active" $r; done
echo
echo "# AU: every <Aurora>/<GlassAurora> mount, and the pointer-events lines of the same file"
for r in $R; do for f in $(grep -rlE "<(Glass)?Aurora\b" $r $I $X 2>/dev/null); do grep -nE "<(Glass)?Aurora\b" $f | sed "s#^#$f:#"; grep -nE "pointer-events" $f | sed "s#^#   $f:#"; done; done
echo
echo "# SC: setCursor/clearCursor callers"
for r in $R; do g "setCursor|clearCursor" $r; done
