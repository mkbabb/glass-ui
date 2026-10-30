#!/bin/zsh
# H10: the clean fixture's hand-off rev, the harness before H10 (a scratch copy of pre/, its driver import absolute) against H10's, in turn
for i in 1 2 3 4; do
  for w in pre h10; do
    d=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness; [[ $w == pre ]] && d=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/prehar
    echo "## $i $w $(date '+%T') load $(sysctl -n vm.loadavg)"
    node $d/e10-continuity.mjs --fixture --scenes slider,slider2 --engine chromium 2>&1 | grep -E 'hand-off rev|^E-10 chromium' | cut -c1-210
  done
done
