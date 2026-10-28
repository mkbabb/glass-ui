#!/bin/bash
# C-A6 CK-22: consumer greps for the candidate's consumer-visible paths (sibling trees read only; value.js by grep only).
cd ~/Programming
R="atlas bbnf-buddy chicago keyframes.js slides speedtest value.js fourier-analysis sci-report"
X="--exclude-dir=node_modules --exclude-dir=dist --exclude-dir=dist-demo --exclude-dir=.worktrees --exclude-dir=.claude --exclude-dir=docs --exclude-dir=.git --exclude-dir=bench"
I="--include=*.vue --include=*.css --include=*.ts --include=*.scss --include=*.html"
echo "# $(date '+%F %T') C-A6 consumer greps"
for r in $R; do [ -d $r ] || { echo "absent $r"; continue; }
 a=$(grep -rEn "glass-specular-track" $r $I $X 2>/dev/null | wc -l | tr -d ' ')
 b=$(grep -rEn "glass-capsule-hover|configurator-preset-chip" $r $I $X 2>/dev/null | wc -l | tr -d ' ')
 c=$(grep -rEn "<Configurator\b" $r --include=*.vue $X 2>/dev/null | wc -l | tr -d ' ')
 d=$(grep -rEn "data-engage-(face|light)|--rung-light|commit-light|--scale-commit-pop|--rung-crest|--rung-commit" $r $I $X 2>/dev/null | wc -l | tr -d ' ')
 e=$(grep -rEn "(glass-material|glass-specular)[^{]*:active" $r $I $X 2>/dev/null | wc -l | tr -d ' ')
 echo "$r specular-track=$a capsule-hover/preset-chip=$b Configurator-sites=$c commit-tokens=$d material-active=$e"; done
echo "# listings"
for r in $R; do [ -d $r ] || continue
 grep -rEn "glass-specular-track|glass-capsule-hover|(glass-material|glass-specular)[^{]*:active" $r $I $X 2>/dev/null | head -12
 grep -rEn "<Configurator\b" $r --include=*.vue $X 2>/dev/null | head -5; done
