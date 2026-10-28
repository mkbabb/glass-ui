#!/bin/zsh
# D4 pass 11 · RE-MEASURE · the re-runs of one flipped cell (the task's "re-run any janky cell twice").
# `unit-plant-clean` read 67/68 in the chain (12:34, load 34.25 → 35.19): one radius-role-canon case. This runs the
# chain's exact `P clean` command (run-r11.sh unit-plants-inner) twice more, each under guarded --rss-gb 8, serially,
# after CHAIN-DONE, with plants.mjs's state line before and after. Logs: logs/unit-plant-clean-rerun{1,2}.log.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p11/remeasure11; WT=$W/wt; O=$W/out
T=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile; HN=$T/harness; L=$T/pass-11/logs
TG=tests/components/ui/toggle-group/ToggleGroup.test.ts; RCT=tests/styles/radius-role-canon.test.ts
export TILE_HARNESS_OUT=$O
for n in 1 2; do F=$L/unit-plant-clean-rerun$n.log
  { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg) · $(node $HN/plants.mjs $WT state)"
    ~/.claude/guard/guarded --rss-gb 8 --timeout 20 -- zsh -c 'echo "admitted · $(date "+%F %T") · load $(sysctl -n vm.loadavg)"; exec "$@"' _ node $HN/unit.mjs $WT --label plant-clean-rerun$n --out $O $TG $RCT
    echo "exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · $(node $HN/plants.mjs $WT state)"; } > $F 2>&1
done
