#!/bin/bash
# Fix seat 9, chain 1: the frost witness (the reduce spec's three Sheet cells, three times
# each) on v11.1.0, d0f85bd29 and the branch in the four projects; then item 1's probe with
# d0f85bd29's film module and the branch's.
F=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/fix-9
G="fade · a (Sheet right|Sheet bottom|detented Sheet) appears"
for p in chromium-phone chromium-desktop webkit-phone webkit-desktop; do
  for t in red d0 branch; do $F/run.sh $t $p frost-$t-$p "$G" "--repeat-each=3"; done
done
for p in webkit-phone webkit-desktop chromium-phone chromium-desktop; do
  $F/probe/run.sh d0f85bd29 $p ff-d0-$p
  $F/probe/run.sh branch $p ff-branch-$p
done
echo "$(date +%T) chain1 done" >> $F/logs/runs.out
