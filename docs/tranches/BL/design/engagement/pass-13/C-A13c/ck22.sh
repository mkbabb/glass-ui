#!/bin/bash
# C-A13-complete CK-22: consumer greps at the pass-13 HEAD, every pattern through `grep -E -e`, sibling trees READ ONLY, one repo at a time
# (never a walk of ~ or /); build outputs, worktrees, docs and .git excluded. The self-check counts each pattern on the candidate's own src.
# Censuses for the members this critique drives: consumers that write a token the stage reads (--spring-*-settle, --scale-engage,
# --motion-tempo, --space-section), a calc() fragment value for them, a transition on a member host (Tailwind transition-*, transition:),
# selectors that read a style attribute's absence (residue), rotate/skew/perspective, field-sizing, shadow roots, the private read names.
cd /Users/mkbabb/Programming || exit 1
X="--exclude-dir=node_modules --exclude-dir=dist --exclude-dir=dist-demo --exclude-dir=.worktrees --exclude-dir=worktrees --exclude-dir=.claude --exclude-dir=docs --exclude-dir=.git --exclude-dir=coverage --exclude-dir=.vite --exclude-dir=build --exclude-dir=.output --exclude-dir=.lighthouseci --exclude-dir=bench --exclude-dir=_build"
I="--include=*.vue --include=*.css --include=*.ts --include=*.tsx --include=*.scss --include=*.html --include=*.js --include=*.mjs"
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p13c/C-A13c/wt/src
P=(SL:'<Slider\b' NF:'<NumberField\b' SS:'--spring-[a-z-]*-settle *:' GE:'--scale-engage *:' MT:'--motion-tempo *:' GS:'--space-section *:' TA:'transition-all|transition: *all|transition-property: *all' NS:'not\(\[style\]\)|\[style\]' RT:'(rotate|skew|perspective)\(|(^|[^-a-z])rotate *:' FS:'field-sizing' SH:'attachShadow' ER:'--engage-read-')
echo "# C-A13c CK-22 greps · $(date '+%F %T') · glass-ui HEAD $(git -C glass-ui rev-parse --short HEAD)"
echo "# self-check on the candidate's own src (counts)"
for p in "${P[@]}"; do k=${p%%:*}; e=${p#*:}; echo "#   $k '$e': $(grep -rEn $I -e "$e" $WT 2>/dev/null | wc -l | tr -d ' ')"; done
for r in atlas bbnf-buddy chicago keyframes.js slides speedtest value.js fourier-analysis sci-report gregg; do
  [[ -d $r ]] || { echo "$r · absent"; continue; }
  line="$r @ $(git -C $r rev-parse --short HEAD 2>/dev/null) ·"; for p in "${P[@]}"; do k=${p%%:*}; e=${p#*:}; line="$line $k $(grep -rEn $I $X -e "$e" $r 2>/dev/null | wc -l | tr -d ' ')"; done; echo "$line"
  for p in SS GE MT GS NS FS SH ER; do e=$(printf '%s\n' "${P[@]}" | grep "^$p:" | cut -d: -f2-); grep -rEn $I $X -e "$e" $r 2>/dev/null | cut -c1-170 | sed "s/^/   $p /"; done
  # files holding a Slider or NumberField AND a transition-all / transition: all (the F7 host)
  for fl in $(grep -rlE $I $X -e '<(Slider|NumberField)\b' $r 2>/dev/null); do n=$(grep -cE -e 'transition-all|transition: *all' $fl); [[ $n -gt 0 ]] && echo "   TAF $fl: transition-all $n"; done
done
exit 0
