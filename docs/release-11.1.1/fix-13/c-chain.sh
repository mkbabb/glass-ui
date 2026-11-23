#!/bin/bash
# Fix seat 13, item (c): the CommandDialog cells with the pick's box and next-open clauses.
#   c-chain.sh pre    the worktree before the cure (the merged tip) and the red tree
#   c-chain.sh post   the worktree after the cure
D=$(cd "$(dirname "$0")" && pwd)
case $1 in pre) trees=(tip red) ;; post) trees=(tip) ;; *) exit 2 ;; esac
for project in chromium-phone chromium-desktop webkit-phone webkit-desktop; do
  for tree in "${trees[@]}"; do
    bash $D/part.sh $tree $project "CommandDialog" c-$1-$tree-$project "${@:2}"
    [ $? -eq 75 ] && exit 75
  done
done
echo "$(date +%T) c-chain $1 done" >> $D/logs/runs.out
