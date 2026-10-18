#!/bin/bash
# CK-22 (C-E3): consumer greps over the sibling main trees, read only (node_modules, dist, worktrees, .claude, docs, .git,
# bench excluded). P-E3's columns plus the promotion's reach: global [popover] / :popover-open / ::backdrop rules (a
# promoted control is a manual popover in the top layer), touch-action and the number-field input, data-engaged readers.
cd ~/Programming
R="atlas bbnf-buddy chicago keyframes.js slides speedtest value.js fourier-analysis sci-report"
X="--exclude-dir=node_modules --exclude-dir=dist --exclude-dir=dist-demo --exclude-dir=.worktrees --exclude-dir=.claude --exclude-dir=docs --exclude-dir=.git --exclude-dir=bench"
I="--include=*.vue --include=*.ts --include=*.css --include=*.scss"
c() { grep -rEn "$1" $2 $I $X 2>/dev/null | wc -l | tr -d ' '; }
echo "# $(date '+%F %T') consumer greps (C-E3)"
for r in $R; do [ -d $r ] || { echo "absent $r"; continue; }
  echo "$r Slider $(grep -rEn '<Slider\b' $r --include='*.vue' $X 2>/dev/null | wc -l | tr -d ' ') NumberField $(grep -rEn '<NumberField\b' $r --include='*.vue' $X 2>/dev/null | wc -l | tr -d ' ') NumberFieldStep $(grep -rEn '<NumberFieldStep\b' $r --include='*.vue' $X 2>/dev/null | wc -l | tr -d ' ') anchor $(c 'anchor-name|position-anchor' $r) engage-footprint $(c 'engage-footprint' $r) scrub-pitch $(c 'scrub-pitch' $r) glass-focus-veil $(c 'glass-focus-veil' $r) data-engaged $(c 'data-engaged' $r) popover-rule $(c '\[popover\]|:popover-open|::backdrop' $r) number-field__input $(c 'number-field__input' $r) touch-action $(c 'touch-action' $r)"
done
echo "# listing: anchor / focus-veil / engage-footprint / data-engaged / popover-rule / number-field__input sites"
for r in $R; do [ -d $r ] && grep -rEn 'anchor-name|position-anchor|glass-focus-veil|engage-footprint|data-engaged|\[popover\]|:popover-open|::backdrop|number-field__input' $r $I $X 2>/dev/null | cut -c1-220; done
