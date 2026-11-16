#!/bin/bash
# Build seat B: one grep in every cell, on the branch and on v11.1.0.
# Usage: build-B-cells.sh <label> <grep> [projects...]
S=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/scripts/build-B-run.sh
label=$1; grep=$2; shift 2
projects=${@:-chromium-phone chromium-desktop webkit-phone webkit-desktop}
for p in $projects; do
  $S branch $p $label-green-$p "$grep"
  $S red $p $label-red-$p "$grep"
done
echo "$label CELLS-DONE" >> /Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/logs/runs-B.out
