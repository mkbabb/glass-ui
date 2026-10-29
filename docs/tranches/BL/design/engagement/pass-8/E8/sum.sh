#!/bin/zsh
# P-E8: one line per stage log (verdict line, the first and last load stamps).
cd /Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-8/E8/logs
for f in ${@:-*.log}; do v=$(grep -E ' (PASS|FAIL|UNMEASURED) · [0-9]+ pass' $f | tail -1 | sed -E 's/^ +//' | cut -c1-140); s=$(head -1 $f | grep -o 'load.*' | head -1); echo "$f · $v · start $s"; done
