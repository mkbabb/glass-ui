# MEASURE-7 step 8, the budget: names (m7/names.mjs), lines (m7/lines.sh), G-16 (m7/g16.sh, a git-archive build of each ref; v11.0.2's tree kept until the end, then deleted)
none light 5 ../logs/m7p-lines.txt m7/lines.sh v11.0.2 v11.1.0 HEAD > ../logs/m7p-lines.txt 2>&1
none raw 30 ../logs/m7p-g16.txt { m7/g16.sh v11.0.2 /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/.v11.0.2; m7/g16.sh HEAD /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/.g16-cand; } > ../logs/m7p-g16.txt 2>&1
