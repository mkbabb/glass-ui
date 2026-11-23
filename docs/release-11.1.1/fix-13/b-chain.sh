#!/bin/bash
# Fix seat 13, item (b): the CommandDialog cells, restated for the rebuilt Command page, on the
# red tree (master's tip: 11.1.0's source with the rebuilt demo) and on the worktree, in each
# project, one guarded run at a time.
D=$(cd "$(dirname "$0")" && pwd)
for project in chromium-phone chromium-desktop webkit-phone webkit-desktop; do
  for tree in red tip; do
    bash $D/part.sh $tree $project "CommandDialog" b-$tree-$project
    [ $? -eq 75 ] && exit 75
  done
done
echo "$(date +%T) b-chain done" >> $D/logs/runs.out
