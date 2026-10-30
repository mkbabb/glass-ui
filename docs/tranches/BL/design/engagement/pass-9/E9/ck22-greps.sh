#!/bin/bash
# P-E9 CK-22: the consolidated MIGRATION table's consumer greps, re-run at the pass-9 HEAD (sibling trees READ ONLY; value.js by
# grep only, nothing built or run in any sibling). Main trees only: node_modules, dist*, worktrees, .claude, docs, bench, .git
# excluded. Every pattern is passed with `grep -e` (pass 8's `n -- '<pattern>'` passed `--` as the pattern: REGISTRY §P8-7 item 6).
cd ~/Programming
R="atlas bbnf-buddy chicago keyframes.js slides speedtest value.js fourier-analysis sci-report"
X="--exclude-dir=node_modules --exclude-dir=dist --exclude-dir=dist-demo --exclude-dir=dist-ob11 --exclude-dir=.worktrees --exclude-dir=worktrees --exclude-dir=.claude --exclude-dir=docs --exclude-dir=.git --exclude-dir=bench --exclude-dir=coverage"
I="--include=*.vue --include=*.css --include=*.ts --include=*.tsx --include=*.scss --include=*.html"
g() { grep -rEn $I $X -e "$1" $2 2>/dev/null; }
n() { g "$1" $2 | wc -l | tr -d ' '; }
echo "# $(date '+%F %T') P-E9 consumer greps · glass-ui HEAD $(git -C ~/Programming/glass-ui rev-parse --short HEAD)"
for r in $R; do echo "## $r HEAD $(git -C $r rev-parse --short HEAD 2>/dev/null)"; done
echo
echo "# self-check: the summary counts its own patterns (a pattern that cannot count would print 0 here):"
echo "#   glass-ui src --stage-reach $(n '--stage-reach' ~/Programming/glass-ui/src) · glass-ui src --veil-x/y $(n '--veil-[xy]' ~/Programming/glass-ui/src) (HEAD v10.1.0 src)"
echo
echo "# S1 <Slider · S2 <NumberField · L glass-loupe · V glass-focus-veil · VX --veil-x/-y · ST engage-footprint|data-engage-stage|data-engaged"
echo "# PA position-anchor|clip-path|mask-image|transform|anchor-name on a slider/number-field/slider-track rule · HS --held-scale-|--stage-*|--lens-*"
echo "# AU <Aurora|<GlassAurora · SC setCursor|clearCursor · TQ tap-squish|interactive-item · AC :active on .glass-slider · DH data-held"
echo "# DC data-commit|data-press · PT --glass-btn-press-t|--press-t · UH useDockHold · LP useLiquidPress · UE useEngage · ES engageStage|releaseStage|useEngageStage|flingStage"
echo "# FV data-focus-veil|--loupe-left|--loupe-top · ED ENGAGE_DECLARATION|--rung-class|--rung-commit|--rung-grow|--scale-engage|--scale-commit-pop"
for r in $R; do
 s1=$(grep -rEn --include=*.vue $X -e "<Slider\b" $r 2>/dev/null | wc -l | tr -d ' ')
 s2=$(grep -rEn --include=*.vue $X -e "<NumberField\b" $r 2>/dev/null | wc -l | tr -d ' ')
 echo "$r · S1 $s1 · S2 $s2 · L $(n 'glass-loupe' $r) · V $(n 'glass-focus-veil' $r) · VX $(n '--veil-[xy]' $r) · ST $(n 'engage-footprint|data-engage-stage|data-engaged' $r) · PA $(n '(glass-slider|number-field|slider-track)[^{;]*\{[^}]*(position-anchor|clip-path|mask-image|transform|anchor-name)' $r) · HS $(n '--held-scale-|--stage-reach|--stage-room|--stage-w\b|--lens-(d|s)[xy]' $r) · AU $(n '<(Glass)?Aurora\b' $r) · SC $(n 'setCursor|clearCursor' $r) · TQ $(n 'tap-squish|interactive-item' $r) · AC $(n 'glass-slider[^{]*:active' $r) · DH $(n 'data-held' $r) · DC $(n 'data-commit|data-press' $r) · PT $(n '--glass-btn-press-t|--press-t\b' $r) · UH $(n 'useDockHold' $r) · LP $(n 'useLiquidPress' $r) · UE $(n '\buseEngage\b' $r) · ES $(n 'engageStage|releaseStage|useEngageStage|flingStage' $r) · FV $(n 'data-focus-veil|--loupe-left|--loupe-top' $r) · ED $(n 'ENGAGE_DECLARATION|--rung-(class|commit|grow)|--scale-engage|--scale-commit-pop' $r)"
done
echo
echo "# every nonzero column's lines in full (S1/S2/AU/SC listed below)"
for r in $R; do g "glass-loupe|glass-focus-veil|--veil-[xy]|engage-footprint|data-engage-stage|data-engaged|--held-scale-|--stage-reach|--stage-room|--lens-(d|s)[xy]|tap-squish|interactive-item|glass-slider[^{]*:active|data-held|data-commit|data-press|--glass-btn-press-t|--press-t\b|useDockHold|useLiquidPress|\buseEngage\b|engageStage|releaseStage|useEngageStage|flingStage|data-focus-veil|--loupe-left|--loupe-top|ENGAGE_DECLARATION|--rung-(class|commit|grow)|--scale-engage|--scale-commit-pop" $r; done
echo
echo "# S1/S2: every <Slider>/<NumberField> site"
for r in $R; do grep -rEn --include=*.vue $X -e "<(Slider|NumberField)\b" $r 2>/dev/null; done
echo
echo "# a <Slider>/<NumberField> within 20 lines below an ancestor-paint declaration (opacity, filter, clip-path, rotate, transform, scale) in the same file"
for r in $R; do for f in $(grep -rlE --include=*.vue $X -e "<(Slider|NumberField)\b" $r 2>/dev/null); do grep -nE -e "<(Slider|NumberField)\b" "$f" | cut -d: -f1 | while read L; do s=$((L>20?L-20:1)); sed -n "${s},${L}p" "$f" | grep -nE -e "(opacity|filter|clip-path|rotate|transform|scale)[-:= ]" | sed "s#^#$f:$s+#"; done; done; done
echo
echo "# AU: every <Aurora>/<GlassAurora> mount, and the pointer-events lines of the same file"
for r in $R; do for f in $(grep -rlE $I $X -e "<(Glass)?Aurora\b" $r 2>/dev/null); do grep -nE -e "<(Glass)?Aurora\b" $f | sed "s#^#$f:#"; grep -nE -e "pointer-events" $f | sed "s#^#   $f:#"; done; done
echo
echo "# SC: setCursor/clearCursor callers"
for r in $R; do g "setCursor|clearCursor" $r; done
