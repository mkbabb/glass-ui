#!/bin/bash
# C-A7 CK-22 consumer greps (sibling trees READ ONLY; nothing built or run). Main trees: node_modules, dist, worktrees,
# .claude, docs, bench excluded. Adds what P-A7's grep left out: .glass-card / .glass-specular-track sites, material
# classes applied from TS strings or :class bindings, and the receivers of setCursor.
cd ~/Programming
R="atlas bbnf-buddy chicago keyframes.js slides speedtest value.js fourier-analysis sci-report"
X=(--exclude-dir=node_modules --exclude-dir=dist --exclude-dir=dist-demo --exclude-dir=.worktrees --exclude-dir=worktrees --exclude-dir=.claude --exclude-dir=docs --exclude-dir=.git --exclude-dir=bench --exclude-dir=coverage)
echo "# $(date '+%F %T') C-A7 consumer greps · glass-ui HEAD $(git -C ~/Programming/glass-ui rev-parse --short HEAD)"
for r in $R; do echo "## $r HEAD $(git -C $r rev-parse --short HEAD 2>/dev/null)"; done
echo "# G1 .glass-card/.glass-specular-track in .vue/.ts/.html · G2 material classes in TS/TSX strings · G3 material classes inside :class bindings"
echo "# G4 material class on an element with a handler/role (any line of its open tag) · G5 :active on any material class in consumer CSS"
for r in $R; do
 g1=$(grep -rEn "\bglass-(card|specular-track)\b" $r --include=*.vue --include=*.ts --include=*.tsx --include=*.html "${X[@]}" 2>/dev/null | wc -l | tr -d ' ')
 g2=$(grep -rEn "[\"'\` ]glass-(wash|quiet|resting|floating|overlay|card|specular-track)\b" $r --include=*.ts --include=*.tsx "${X[@]}" 2>/dev/null | wc -l | tr -d ' ')
 g3=$(grep -rEn ":class=[^>]*glass-(wash|quiet|resting|floating|overlay|card|specular-track)\b" $r --include=*.vue "${X[@]}" 2>/dev/null | wc -l | tr -d ' ')
 g5=$(grep -rEn "\.glass-(wash|quiet|resting|floating|overlay|card|specular-track)[^{,]*:active" $r --include=*.vue --include=*.css --include=*.scss "${X[@]}" 2>/dev/null | wc -l | tr -d ' ')
 echo "$r G1=$g1 G2=$g2 G3=$g3 G5=$g5"
done
echo "## G1 listing"; for r in $R; do grep -rEn "\bglass-(card|specular-track)\b" $r --include=*.vue --include=*.ts --include=*.tsx --include=*.html "${X[@]}" 2>/dev/null | cut -c1-200; done
echo "## G2 listing"; for r in $R; do grep -rEn "[\"'\` ]glass-(wash|quiet|resting|floating|overlay|card|specular-track)\b" $r --include=*.ts --include=*.tsx "${X[@]}" 2>/dev/null | cut -c1-200; done
echo "## G3 listing"; for r in $R; do grep -rEn ":class=[^>]*glass-(wash|quiet|resting|floating|overlay|card|specular-track)\b" $r --include=*.vue "${X[@]}" 2>/dev/null | cut -c1-200; done
echo "## setCursor/clearCursor receivers"; for r in $R; do grep -rEn "\.(setCursor|clearCursor)\(" $r --include=*.vue --include=*.ts "${X[@]}" 2>/dev/null | cut -c1-200; done
echo "## <Aurora component sites (the root leg exists only on the component)"; for r in $R; do grep -rEn "<Aurora\b" $r --include=*.vue "${X[@]}" 2>/dev/null | cut -c1-200; done
