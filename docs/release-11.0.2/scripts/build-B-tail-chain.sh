#!/bin/bash
# Build seat B's later rows, one guarded run at a time: the O-266 restatement on the branch,
# v11.0.1 and v11.0.0 in both engines, then the O-268 layout probe in Chromium on v11.0.1
# and the branch. (O-269 and O-273 ran before this chain, logs o269-* and o269-o273-*.)
S=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2/docs/release-11.0.2/scripts
$S/build-B-o266-chain.sh
for t in v1101 branch; do
  $S/build-B-chromium.sh $t o268-probe-$t "probe ·" _o268-probe.spec.ts
done
echo done
