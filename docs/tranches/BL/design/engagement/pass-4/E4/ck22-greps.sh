#!/bin/bash
# CK-22 (P-E4): consumer greps over the sibling main trees, read only (node_modules, dist*, worktrees, .claude, docs,
# .git, bench excluded). value.js is read by grep only. Output: logs/ck22-greps.txt
cd ~/Programming
R="atlas bbnf-buddy chicago keyframes.js slides speedtest value.js fourier-analysis sci-report"
X="--exclude-dir=node_modules --exclude-dir=dist --exclude-dir=dist-demo --exclude-dir=dist-ob11 --exclude-dir=.worktrees --exclude-dir=.claude --exclude-dir=docs --exclude-dir=.git --exclude-dir=bench"
I="--include=*.vue --include=*.ts --include=*.css --include=*.scss"
c() { grep -rEn "$1" $2 $3 $X 2>/dev/null | wc -l | tr -d ' '; }
echo "# $(date '+%F %T') consumer greps (P-E4)"
for r in $R; do [ -d $r ] || { echo "absent $r"; continue; }
  sf=$(grep -rlE '<(Slider|NumberField)\b' $r --include='*.vue' $X 2>/dev/null)
  clip=0; scroll=0; for f in $sf; do grep -qE 'overflow-(x-|y-)?hidden|overflow(-[xy])?:\s*hidden|overflow-clip' $f && clip=$((clip+1)); grep -qE 'overflow-(x-|y-)?(auto|scroll)|overflow(-[xy])?:\s*(auto|scroll)|ScrollArea' $f && scroll=$((scroll+1)); done
  echo "$r Slider $(c '<Slider\b' $r --include=*.vue) NumberField $(c '<NumberField\b' $r --include=*.vue) · files with a Slider/NumberField: $(echo "$sf" | grep -c . ) (same file clips: $clip, scrolls: $scroll) · position-anchor $(c 'position-anchor' $r "$I") · data-engaged|data-engage-stage $(c 'data-engaged|data-engage-stage' $r "$I") · @wheel/onWheel $(c '@wheel|onWheel|addEventListener\(.wheel' $r "$I") · popover-open $(c ':popover-open' $r "$I")"
done
echo "# listing: position-anchor / data-engaged / data-engage-stage / wheel handlers in files that also render a Slider or NumberField"
for r in $R; do [ -d $r ] && for f in $(grep -rlE '<(Slider|NumberField)\b' $r --include='*.vue' $X 2>/dev/null); do grep -HnE 'position-anchor|data-engaged|data-engage-stage|@wheel|onWheel' $f | cut -c1-200; done; done
echo "# listing: global position-anchor and data-engaged sites"
for r in $R; do [ -d $r ] && grep -rEn 'position-anchor|data-engaged|data-engage-stage' $r $I $X 2>/dev/null | cut -c1-200; done
