#!/bin/bash
# C-A12 CK-22: my own consumer greps at the pass-12 HEAD, every pattern through `grep -e` (ERE), sibling trees READ ONLY (value.js by grep
# only); build outputs, worktrees, docs and .git excluded. Self-checks count on the candidate's own src in my worktree first.
# Censuses: the slider and number-field sites C-2/C-9 address; consumers that write the tokens whose script read changed (--spring-dock,
# any --spring-*-settle, --space-section, --scale-engage) or the stage's names; shape-margin; CSS zoom; and, for the move families this
# critique drives, a Slider/NumberField file that also uses v-show (an attribute-only re-render near a held control), and rotate/skew/
# perspective in consumer styles.
cd ~/Programming || exit 1
X="--exclude-dir=node_modules --exclude-dir=dist --exclude-dir=dist-demo --exclude-dir=.worktrees --exclude-dir=worktrees --exclude-dir=.claude --exclude-dir=docs --exclude-dir=.git --exclude-dir=coverage --exclude-dir=.vite --exclude-dir=build --exclude-dir=.output --exclude-dir=.lighthouseci --exclude-dir=bench --exclude-dir=_build"
I="--include=*.vue --include=*.css --include=*.ts --include=*.tsx --include=*.scss --include=*.html --include=*.js --include=*.mjs"
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p12/C-A12/wt/src
P=(SL:'<Slider\b' NF:'<NumberField\b' SD:'--spring-dock *:' SS:'--spring-[a-z-]*-settle *:' GS:'--space-section *:' GE:'--scale-engage *:' ST:'--stage-(reach|room|w)\b' SM:'shape-margin' ZM:'(^|[^-a-z])zoom *:' RT:'(rotate|skew|perspective)\(|(^|[^-a-z])rotate *:' OA:'overflow-anchor')
echo "# C-A12 CK-22 greps · $(date '+%F %T') · glass-ui HEAD $(git -C glass-ui rev-parse --short HEAD)"
echo "# self-check on the candidate's own src (counts, each pattern must be countable)"
for p in "${P[@]}"; do k=${p%%:*}; e=${p#*:}; echo "#   $k '$e': $(grep -rEn $I -e "$e" $WT 2>/dev/null | wc -l | tr -d ' ')"; done
for r in atlas bbnf-buddy chicago keyframes.js slides speedtest value.js fourier-analysis sci-report; do
  [[ -d $r ]] || { echo "$r · absent"; continue; }
  line="$r @ $(git -C $r rev-parse --short HEAD 2>/dev/null) ·"; for p in "${P[@]}"; do k=${p%%:*}; e=${p#*:}; line="$line $k $(grep -rEn $I $X -e "$e" $r 2>/dev/null | wc -l | tr -d ' ')"; done; echo "$line"
  for p in SD SS GS GE ST SM ZM; do e=$(printf '%s\n' "${P[@]}" | grep "^$p:" | cut -d: -f2-); grep -rEn $I $X -e "$e" $r 2>/dev/null | cut -c1-180 | sed "s/^/   $p /"; done
  # files that hold a Slider or NumberField AND a v-show
  for fl in $(grep -rlE $I $X -e '<(Slider|NumberField)\b' $r 2>/dev/null); do n=$(grep -cE -e 'v-show' $fl); [[ $n -gt 0 ]] && echo "   VS $fl: v-show $n, Slider/NumberField $(grep -cE -e '<(Slider|NumberField)\b' $fl)"; done
done
exit 0
