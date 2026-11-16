#!/bin/bash
# Build seat A's closing pass: the whole 11.1.1 spec on the branch and on v11.1.0, every cell.
S=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/scripts/build-A-run.sh
for p in chromium-phone chromium-desktop webkit-phone webkit-desktop; do
  $S branch $p final-green-$p
  $S red $p final-red-$p
done
echo FINAL-DONE >> /Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/logs/runs.out
