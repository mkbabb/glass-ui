#!/bin/zsh
A5=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-5/A5
R=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p5/A5
G=~/.claude/guard/guarded
$G --timeout 60 -- zsh $A5/gates.sh $R/wt > $A5/logs/gates-light.log 2>&1
$G --timeout 60 -- zsh $A5/gates.sh $R/wt-geom > $A5/logs/gates-geom.log 2>&1
zsh $A5/chain-a5.sh $A5/phase-chromium.txt > $A5/logs/chain-chromium.log 2>&1
print -- "ALLDONE $(date '+%F %T')" >> $A5/logs/chain-chromium.log
