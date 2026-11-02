#!/bin/bash
# C-A11 CK-22: my own consumer census at the pass-11 HEAD, every pattern through `grep -e`, written independently of P-E10's/P-E11's scripts.
# Sibling trees READ ONLY (grep and `git rev-parse` only); value.js by grep only. Scoped per repo; no whole-volume walk.
cd /Users/mkbabb/Programming
X="--exclude-dir=node_modules --exclude-dir=dist --exclude-dir=dist-demo --exclude-dir=.worktrees --exclude-dir=worktrees --exclude-dir=.claude --exclude-dir=docs --exclude-dir=.git --exclude-dir=coverage --exclude-dir=.lighthouseci --exclude-dir=bench --exclude-dir=dist-ob11"
I="--include=*.vue --include=*.ts --include=*.tsx --include=*.css --include=*.scss"
echo "# C-A11 ck22 · $(date '+%F %T') · glass-ui HEAD $(git -C glass-ui rev-parse --short HEAD)"
echo "# self-check: the candidate's own tree (worktree) must count the stage's writes"
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p11/C-A11/wt
echo "  candidate src '--stage-room' $(grep -rn -e '--stage-room' $WT/src | wc -l | tr -d ' ') · 'currentCSSZoom' $(grep -rn -e 'currentCSSZoom' $WT/src | wc -l | tr -d ' ') · 'CSS.supports' in stage.ts $(grep -c -e 'CSS.supports' $WT/src/composables/motion/engage/stage.ts)"
c() { grep -rEn $I $X -e "$2" "$1" 2>/dev/null | wc -l | tr -d ' '; }
printf "%-17s %-10s %6s %6s %6s %6s %6s %6s %6s %6s\n" repo HEAD Slider NumFld squish iitem dheld veil zoom engage
for r in atlas bbnf-buddy chicago keyframes.js slides speedtest value.js fourier-analysis sci-report; do
  [ -d "$r" ] || { echo "$r absent"; continue; }
  printf "%-17s %-10s %6s %6s %6s %6s %6s %6s %6s %6s\n" $r "$(git -C $r rev-parse --short HEAD 2>/dev/null)" "$(c $r '<Slider[ >/]|<Slider$')" "$(c $r '<NumberField[ >/]|<NumberField$')" "$(c $r 'tap-squish')" "$(c $r 'interactive-item')" "$(c $r 'data-held')" "$(c $r '--veil-[xy]')" "$(c $r '(^|[^-a-zA-Z])zoom *:|\.style\.zoom|\[zoom:')" "$(c $r 'data-engage|--stage-(room|w|reach)|--lens-(dx|dy|sx|sy)|useDockHold|--press-t')"
done
echo
echo "# zoom hits, each (C-9 names zoom; a consumer that sets CSS zoom on a slider's ancestor)"
for r in atlas bbnf-buddy chicago keyframes.js slides speedtest value.js fourier-analysis sci-report; do grep -rEn $I $X -e '(^|[^-a-zA-Z])zoom *:|\.style\.zoom|\[zoom:' $r 2>/dev/null | cut -c1-170 | sed "s/^/  /"; done
echo
echo "# §P9-7 item 9's site (speedtest): the Slider and its overflow ancestor"
grep -n -e '<Slider' -e 'overflow-hidden' -e '<Card' speedtest/src/components/dashboard/DashboardMapControls.vue 2>/dev/null | cut -c1-160
echo
echo "# --spring-dock written by a consumer (a value the stage's glide would read)"
for r in atlas bbnf-buddy chicago keyframes.js slides speedtest value.js fourier-analysis sci-report; do n=$(c $r '--spring-dock *:'); [ "$n" != 0 ] && { echo "  $r $n"; grep -rEn $I $X -e '--spring-dock *:' $r | cut -c1-170 | sed 's/^/    /'; }; done; echo "  (end)"
