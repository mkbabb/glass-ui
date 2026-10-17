#!/bin/bash
# CK-22: the consumer greps P-A3 re-ran at its HEAD (sibling main trees, read only; node_modules, dist,
# worktrees, .claude and docs excluded). Output: logs/ck22-greps.txt
cd ~/Programming
R="atlas bbnf-buddy chicago keyframes.js slides speedtest value.js fourier-analysis"
X="--exclude-dir=node_modules --exclude-dir=dist --exclude-dir=dist-demo --exclude-dir=.worktrees --exclude-dir=.claude --exclude-dir=docs --exclude-dir=.git"
echo "# $(date '+%F %T') consumer greps"
for t in PopoverTrigger DropdownMenuTrigger CollapsibleTrigger; do
  for r in $R; do n=$(grep -rEn "<$t[^>]*as-?[cC]hild" $r --include='*.vue' $X 2>/dev/null | wc -l | tr -d ' '); echo "as-child $t $r $n"; done
done
for r in $R; do n=$(grep -rEn -A2 "<(PopoverTrigger|DropdownMenuTrigger|CollapsibleTrigger)[^>]*as-?[cC]hild" $r --include='*.vue' $X 2>/dev/null | grep -cE "<Button\b"); echo "as-child-over-Button $r $n"; done
for r in $R; do n=$(grep -rEn "\bengage-(pressed|chosen|disclosed|held|dragged|presented|field|ambient|static)\b" $r --include='*.vue' --include='*.ts' --include='*.css' $X 2>/dev/null | wc -l | tr -d ' '); echo "engage-class $r $n"; done
for r in $R; do n=$(grep -rEn "<Timeline\b" $r --include='*.vue' $X 2>/dev/null | wc -l | tr -d ' '); echo "Timeline $r $n"; done
for r in $R; do n=$(grep -rEn "(\.button|\.glass-chip|toggle-group__item|menu__trigger|disclosure-trigger|segmented-tabs|control-bit|select-trigger)[^{,]*::?after" $r --include='*.vue' --include='*.css' $X 2>/dev/null | wc -l | tr -d ' '); echo "after-on-member-host $r $n"; done
for r in $R; do n=$(grep -rEn "\.control-bit__face|\.control-bit\b" $r --include='*.vue' --include='*.css' $X --exclude-dir=.vite-critic-9216 2>/dev/null | wc -l | tr -d ' '); echo "control-bit-css $r $n"; done
for r in $R; do n=$(grep -rEn "dock-(dropdown|select)?-?trigger" $r --include='*.vue' --include='*.css' $X 2>/dev/null | wc -l | tr -d ' '); echo "dock-trigger-class $r $n"; done
echo "# listing: as-child sites"
for r in $R; do grep -rEn "<(PopoverTrigger|DropdownMenuTrigger|CollapsibleTrigger)[^>]*as-?[cC]hild" $r --include='*.vue' $X 2>/dev/null; done
