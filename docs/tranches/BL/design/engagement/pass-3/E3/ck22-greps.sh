#!/bin/bash
# CK-22 (P-E3): consumer greps over the sibling main trees, read only (node_modules, dist, worktrees, .claude, docs,
# .git excluded). Output: logs/ck22-greps.txt
cd ~/Programming
R="atlas bbnf-buddy chicago keyframes.js slides speedtest value.js fourier-analysis sci-report"
X="--exclude-dir=node_modules --exclude-dir=dist --exclude-dir=dist-demo --exclude-dir=.worktrees --exclude-dir=.claude --exclude-dir=docs --exclude-dir=.git --exclude-dir=bench"
I="--include=*.vue --include=*.ts --include=*.css --include=*.scss"
echo "# $(date '+%F %T') consumer greps"
for r in $R; do [ -d $r ] || { echo "absent $r"; continue; }
  echo "$r Slider $(grep -rEn '<Slider\b' $r --include='*.vue' $X 2>/dev/null | wc -l | tr -d ' ') NumberField $(grep -rEn '<NumberField\b' $r --include='*.vue' $X 2>/dev/null | wc -l | tr -d ' ') NumberFieldStep $(grep -rEn '<NumberFieldStep\b' $r --include='*.vue' $X 2>/dev/null | wc -l | tr -d ' ') anchor-name $(grep -rEn 'anchor-name|position-anchor' $r $I $X 2>/dev/null | wc -l | tr -d ' ') engage-footprint $(grep -rEn 'engage-footprint' $r $I $X 2>/dev/null | wc -l | tr -d ' ') scrub-pitch $(grep -rEn 'scrub-pitch' $r $I $X 2>/dev/null | wc -l | tr -d ' ') glass-focus-veil $(grep -rEn 'glass-focus-veil' $r $I $X 2>/dev/null | wc -l | tr -d ' ') number-field-held $(grep -rEn 'number-field\[data-held\]|data-held' $r $I $X 2>/dev/null | wc -l | tr -d ' ')"
done
echo "# listing: anchor-name / position-anchor / glass-focus-veil / data-held sites"
for r in $R; do [ -d $r ] && grep -rEn 'anchor-name|position-anchor|glass-focus-veil|engage-footprint|data-held' $r $I $X 2>/dev/null | cut -c1-200; done
