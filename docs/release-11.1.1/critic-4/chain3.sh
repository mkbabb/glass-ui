#!/bin/bash
# Critic 4, chain 3: the disclosure reopen cells in WebKit 390, the tip and v11.1.0
# alternated, five repeats a run, so the two trees are read under the same load.
D=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/critic-4
G='reverse · a (Accordion|Collapsible) reopened'
for i in 1 2; do
  bash $D/run.sh branch webkit-phone reopen$i-tip-webkit-phone "$G" "--repeat-each=5"
  bash $D/run.sh red webkit-phone reopen$i-red-webkit-phone "$G" "--repeat-each=5"
done
bash $D/run.sh branch chromium-phone reopen-tip-chromium-phone "$G" "--repeat-each=10"
echo "CHAIN3-DONE $(date +%T)" >> $D/logs/runs.out
