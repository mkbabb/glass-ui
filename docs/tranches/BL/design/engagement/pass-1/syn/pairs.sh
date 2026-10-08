#!/bin/bash
W=${1:?worktree at HEAD}
P=$(cd "$(dirname "$0")/.." && pwd)
cd $W
for pair in "A B" "A E" "B E" "D B" "D E" "C B" "C E" "A D" "A C" "C D"; do
  set -- $pair
  git apply $P/R-$1.patch
  out=$(git apply --check $P/R-$2.patch 2>&1 | grep -E 'patch failed|already exists' | sed 's/error: //' | tr '\n' ';')
  echo "$1 then $2: ${out:-clean}"
  git checkout -q -- . ; git clean -fdq src tests
done
git status --short | head
