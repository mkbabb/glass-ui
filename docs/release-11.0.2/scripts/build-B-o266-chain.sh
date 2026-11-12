#!/bin/bash
# Build seat B's O-266 cells: every O-101 and O-101a title of release-10-1-2.spec.ts, restated,
# on the branch, v11.0.1 and v11.0.0, Chromium (both projects) then WebKit 2287.
S=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2/docs/release-11.0.2/scripts
for t in branch v1101 v1100; do
  $S/build-B-chromium.sh $t o266-$t-chromium "O-101" release-10-1-2.spec.ts
  $S/build-B-webkit.sh $t o266-$t-webkit "O-101" release-10-1-2.spec.ts
done
