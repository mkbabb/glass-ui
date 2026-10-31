#!/bin/bash
# C-E11 CK-22: C-E10s independently written census (not P-E11s script), every pattern through grep -e, at the pass-11 HEAD, plus a CSS zoom census of my own. Siblings READ ONLY; value.js by grep only.
cd ~/Programming
X="--exclude-dir=node_modules --exclude-dir=dist --exclude-dir=dist-demo --exclude-dir=dist-ob11 --exclude-dir=.worktrees --exclude-dir=worktrees --exclude-dir=.claude --exclude-dir=docs --exclude-dir=.git --exclude-dir=bench --exclude-dir=coverage --exclude-dir=.u-build"
echo "# $(date '+%F %T') glass-ui HEAD $(git -C glass-ui rev-parse --short HEAD)"
for r in atlas bbnf-buddy chicago keyframes.js slides speedtest value.js fourier-analysis sci-report; do
 s=$(grep -rE --include=*.vue $X -e '<Slider\b' $r 2>/dev/null | wc -l | tr -d ' ')
 n=$(grep -rE --include=*.vue $X -e '<NumberField\b' $r 2>/dev/null | wc -l | tr -d ' ')
 t=$(grep -rnE --include=*.vue --include=*.css --include=*.ts $X -e 'tap-squish' $r 2>/dev/null | wc -l | tr -d ' ')
 i=$(grep -rnE --include=*.vue --include=*.css --include=*.ts $X -e 'interactive-item' $r 2>/dev/null | wc -l | tr -d ' ')
 l=$(grep -rnE --include=*.vue --include=*.css --include=*.ts $X -e 'glass-loupe|--lens-(dx|dy|sx|sy)|data-engage-lens|data-engaged|data-engage-stage|engage-footprint|--held-scale' $r 2>/dev/null | wc -l | tr -d ' ')
 v=$(grep -rnE --include=*.vue --include=*.css --include=*.ts $X -e '--veil-[xy]' $r 2>/dev/null | wc -l | tr -d ' ')
 h=$(grep -rnE --include=*.vue --include=*.css --include=*.ts $X -e 'data-held' $r 2>/dev/null | wc -l | tr -d ' ')
 u=$(grep -rnE --include=*.vue --include=*.css --include=*.ts $X -e 'useDockHold' $r 2>/dev/null | wc -l | tr -d ' ')
 p=$(grep -rnE --include=*.vue --include=*.css --include=*.ts $X -e '--glass-btn-press-t|--press-t' $r 2>/dev/null | wc -l | tr -d ' ')
 echo "$r head $(git -C $r rev-parse --short HEAD 2>/dev/null) · Slider $s · NumberField $n · tap-squish $t · interactive-item $i · lens/stage names $l · veil-xy $v · data-held $h · useDockHold $u · press-t $p"
done
echo "--- self-check on the candidate's own tree: glass-ui src --stage-reach $(grep -rE $X -e '--stage-reach' $HOME/Programming/glass-ui/.claude/worktrees/bl/D5/p11/C-E11/wt/src 2>/dev/null | wc -l | tr -d ' ')"
echo "--- item 9: speedtest"; grep -nE -e 'overflow-hidden|<Card\b|<Slider\b' speedtest/src/components/dashboard/DashboardMapControls.vue | cut -c1-120
git -C speedtest rev-parse --short HEAD
echo "--- every Slider/NumberField file with an overflow clip, whole file"
for r in atlas bbnf-buddy keyframes.js slides speedtest value.js fourier-analysis sci-report chicago; do for f in $(grep -rlE --include=*.vue $X -e '<(Slider|NumberField)\b' $r 2>/dev/null); do c=$(grep -nE -e 'overflow-(hidden|clip)|overflow(-[xy])?: *(hidden|clip)' "$f" | cut -c1-90 | tr '\n' '|'); [ -n "$c" ] && echo "$f :: sliders $(grep -nE -e '<(Slider|NumberField)\b' "$f" | cut -d: -f1 | tr '\n' ',') :: $c"; done; done
echo "--- CSS zoom a consumer could set on a slider's ancestor (my pattern: a declaration 'zoom:' with a value, a script .style.zoom, a Tailwind [zoom:], or a 'zoom-' utility)"
for r in atlas bbnf-buddy chicago keyframes.js slides speedtest value.js fourier-analysis sci-report; do
 echo "$r ZM $(grep -rnE --include=*.vue --include=*.css --include=*.scss --include=*.ts --include=*.tsx $X -e '(^|[^-a-zA-Z_.])zoom *: *[0-9.]|\.style\.zoom|\[zoom:|style\.setProperty\(.zoom' $r 2>/dev/null | wc -l | tr -d ' ')"
 grep -rnE --include=*.vue --include=*.css --include=*.scss --include=*.ts --include=*.tsx $X -e '(^|[^-a-zA-Z_.])zoom *: *[0-9.]|\.style\.zoom|\[zoom:|style\.setProperty\(.zoom' $r 2>/dev/null | cut -c1-170 | sed 's/^/   /'
done
echo "--- self-check: the pattern counts glass-ui harness lib.mjs zoom writes: $(grep -cE -e '(^|[^-a-zA-Z_.])zoom *: *[0-9.]|\.style\.zoom|\[zoom:' $HOME/Programming/glass-ui/docs/tranches/BL/design/engagement/harness/lib.mjs)"
