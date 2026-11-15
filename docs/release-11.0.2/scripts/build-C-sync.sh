#!/bin/bash
# Copies the branch's 11.0.2 spec, config and harnesses (and any extra paths given) into the
# red trees, so a cell runs unchanged against v11.0.1 and v11.0.0.
#   build-C-sync.sh [extra repo-relative paths...]
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2
for t in red-v11.0.1 red-v11.0.0; do
  D=$W/.cache/$t/tree
  cp $W/tests-visual/release-11-0-2.spec.ts $W/tests-visual/release-11-0-2.config.ts $D/tests-visual/
  mkdir -p $D/tests-visual/release-11-0-2 && cp $W/tests-visual/release-11-0-2/* $D/tests-visual/release-11-0-2/
  for p in "$@"; do mkdir -p "$(dirname $D/$p)"; cp $W/$p $D/$p; done
done
