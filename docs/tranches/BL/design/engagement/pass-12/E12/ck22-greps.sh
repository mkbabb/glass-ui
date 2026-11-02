#!/bin/bash
# P-E12 CK-22: the consumer greps at the pass-12 HEAD. P-E11's script runs unchanged (it runs P-E10's two, then its ZM census; every
# pattern through `grep -e`), then the censuses this patch's rows name: consumers that write the travel row's tokens (--spring-dock,
# --spring-dock-settle, any --spring-*-settle, read now in their own unit), the gutter (--space-section, now resolved on the host's
# shape-margin), shape-margin itself, and the stage's names (--stage-reach, --stage-room, --stage-w). Self-checks on glass-ui's own src.
# Sibling trees READ ONLY; value.js by grep only; nothing built or run in any sibling.
bash /Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-11/E11/ck22-greps.sh
echo
cd ~/Programming
X="--exclude-dir=node_modules --exclude-dir=dist --exclude-dir=dist-demo --exclude-dir=dist-ob11 --exclude-dir=.worktrees --exclude-dir=worktrees --exclude-dir=.claude --exclude-dir=docs --exclude-dir=.git --exclude-dir=bench --exclude-dir=coverage --exclude-dir=.lighthouseci"
I="--include=*.vue --include=*.css --include=*.ts --include=*.tsx --include=*.scss --include=*.html --include=*.js --include=*.mjs"
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p12/E12/wt/src
P=(SD:'--spring-dock *:' SS:'--spring-[a-z-]*-settle *:' GS:'--space-section *:' SM:'shape-margin' ST:'--stage-(reach|room|w)\b')
echo "# P-E12 censuses. Self-check on the candidate's own src (each must count)"
for p in "${P[@]}"; do k=${p%%:*}; e=${p#*:}; echo "#   $k '$e' in the candidate's src: $(grep -rEn $I -e "$e" $WT 2>/dev/null | wc -l | tr -d ' ')"; done
for r in atlas bbnf-buddy chicago keyframes.js slides speedtest value.js fourier-analysis sci-report; do
  line="$r ·"; for p in "${P[@]}"; do k=${p%%:*}; e=${p#*:}; line="$line $k $(grep -rEn $I $X -e "$e" $r 2>/dev/null | wc -l | tr -d ' ')"; done; echo "$line"
  for p in "${P[@]}"; do k=${p%%:*}; e=${p#*:}; grep -rEn $I $X -e "$e" $r 2>/dev/null | cut -c1-200 | sed "s/^/   $k /"; done
done
