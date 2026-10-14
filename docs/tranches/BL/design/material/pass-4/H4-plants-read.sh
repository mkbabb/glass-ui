#!/bin/zsh
# H4-plants-read.sh · D3 pass 4, H4: reads each floor v2 mechanism-removal plant (pass-3/FV2-plants.mjs, captured by
# `H4-run.sh plants`) with the witness it must red, gated once per engine on the cells the plant took.
# Records: pass-4/H4-records/plants/<plant>-<witness>-<engine>.log and readings.log (one verdict per line).
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p4/H4
H=$R/docs/tranches/BL/design/material/harness
P=$B/out/plants
REC=$R/docs/tranches/BL/design/material/pass-4/H4-records/plants
mkdir -p $REC
echo "read $(date +%T) load $(sysctl -n vm.loadavg)" > $REC/readings.log
function readplant {
  local id=$1 w=$2 cells=$3 e
  for e in chromium webkit; do
    node $H/$w.mjs $P/$id --gate $e --cells "$cells" > $REC/$id-$w-$e.log 2>&1
    echo "$id | $w | $e | $(tail -1 $REC/$id-$w-$e.log)" | tee -a $REC/readings.log
  done
}
readplant plant-bound m2-text-contrast '(ladder|dialog)$'
readplant plant-heldfloor m2-text-contrast 'held$'
readplant plant-carrierveil m2-text-contrast 'held$'
readplant plant-darkperim m3-non-text 'dark'
readplant plant-noisolation m2-text-contrast 'held$'
readplant plant-noisolation stack-host 'held$'
readplant risk-opaque-ancestor m2-text-contrast 'held$'
readplant diag-held-nosliderblur m2-held-window '.'
readplant diag-held-noveil m2-held-window '.'
echo "end $(date +%T) load $(sysctl -n vm.loadavg)" >> $REC/readings.log
