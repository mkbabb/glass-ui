#!/bin/bash
# P-E13 CK-22: the consumer greps at the pass-13 HEAD, every pattern through `grep -e`. Sibling trees READ ONLY (grep only); nothing
# built or run in any sibling. Censuses: P-E12's rows (SD --spring-dock:, SS --spring-*-settle:, GS --space-section:, SM shape-margin,
# ST --stage-*), this patch's private read names (RD --engage-read-*), and the held-control consumer sites the derivation's members
# reach: a <Slider> or <NumberField> in a file with <DialogContent> (the library Dialog's -50% -50% plate, (a)(iii)), and in a file
# with v-show (an attribute re-render, (a)(i)). Self-checks on the candidate's own src (each named pattern must count where it lives).
cd ~/Programming || exit 1
X="--exclude-dir=node_modules --exclude-dir=dist --exclude-dir=dist-demo --exclude-dir=dist-ob11 --exclude-dir=.worktrees --exclude-dir=worktrees --exclude-dir=.claude --exclude-dir=docs --exclude-dir=.git --exclude-dir=bench --exclude-dir=coverage --exclude-dir=.vite --exclude-dir=.vite-critic-9216"
I="--include=*.vue --include=*.css --include=*.ts --include=*.tsx --include=*.scss --include=*.html --include=*.js --include=*.mjs"
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p13/E13/wt/src
echo "# $(date '+%F %T') · glass-ui HEAD $(git -C glass-ui rev-parse --short HEAD) · load $(sysctl -n vm.loadavg)"
P=(SD:'--spring-dock *:' SS:'--spring-[a-z-]*-settle *:' GS:'--space-section *:' SM:'shape-margin' ST:'--stage-(reach|room|w)\b' RD:'--engage-read-')
echo "# self-check on the candidate's own src"
for p in "${P[@]}"; do k=${p%%:*}; e=${p#*:}; echo "#   $k '$e': $(grep -rEn $I -e "$e" $WT 2>/dev/null | wc -l | tr -d ' ')"; done
for r in atlas bbnf-buddy chicago keyframes.js slides speedtest value.js fourier-analysis sci-report gregg; do
  [ -d "$r" ] || { echo "$r · absent"; continue; }
  line="$r ·"; for p in "${P[@]}"; do k=${p%%:*}; e=${p#*:}; line="$line $k $(grep -rEn $I $X -e "$e" $r 2>/dev/null | wc -l | tr -d ' ')"; done; echo "$line"
  for p in "${P[@]}"; do k=${p%%:*}; e=${p#*:}; grep -rEn $I $X -e "$e" $r 2>/dev/null | cut -c1-200 | sed "s/^/   $k /"; done
  for f in $(grep -rlE --include=*.vue $X -e '<(Slider|NumberField)\b' $r 2>/dev/null); do
    d=$(grep -nE -e '<DialogContent\b' "$f" | head -1 | cut -d: -f1); v=$(grep -cE -e '\bv-show=' "$f")
    h=$(grep -nE -e '<(Slider|NumberField)\b' "$f" | cut -d: -f1 | tr '\n' ',' | sed 's/,$//')
    [ -n "$d" ] && echo "   DLG $f · held control at :$h inside <DialogContent> at :$d"
    [ "$v" != "0" ] && echo "   VSHOW $f · held control at :$h · v-show ${v}"
  done
done
echo "# speedtest HEAD $(git -C speedtest rev-parse --short HEAD 2>/dev/null)"
echo "# $(date '+%F %T') · load $(sysctl -n vm.loadavg)"
