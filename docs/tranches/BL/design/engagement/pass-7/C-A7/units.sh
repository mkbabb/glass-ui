#!/bin/zsh
# C-A7b unit plants (vitest, --light single files, --maxWorkers=2): control, then the writer and crest plants (P-A7's plants.py)
C=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-7/C-A7
A=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-7/A7
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p7/C-A7b/wt
cd $WT
V=(node $WT/node_modules/vitest/vitest.mjs run --maxWorkers=2)
$C/run.sh unit-control --light --timeout 15 -- $V tests/components/custom/aurora/Aurora.cursor-writer.test.ts tests/styles/engage-ladder.test.ts; echo "unit-control exit $?"
python3 -I $A/plants.py writer apply $WT && { $C/run.sh unit-plant-writer --light --timeout 15 -- $V tests/components/custom/aurora/Aurora.cursor-writer.test.ts; echo "unit-plant-writer exit $?"; python3 -I $A/plants.py writer revert $WT; }
python3 -I $A/plants.py crest apply $WT && { $C/run.sh unit-plant-crest --light --timeout 15 -- $V tests/styles/engage-ladder.test.ts; echo "unit-plant-crest exit $?"; python3 -I $A/plants.py crest revert $WT; }
rmdir $WT/.a7plant 2>/dev/null; git -C $WT status --short | wc -l
