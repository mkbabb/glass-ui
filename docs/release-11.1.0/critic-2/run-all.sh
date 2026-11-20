#!/usr/bin/env bash
# Critic 2 driver: fix-2's chain (copied unchanged but for output paths), Chromium first,
# then the committed-tree gates, then WebKit, then the touched e2e specs. One run at a time.
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
STAGES="witness l2 lanes-chromium" W_ENGINES=chromium L2_ENGINES=chromium CLANES="1 3 4 5 6 7" bash "$HERE/chain.sh"
STAGES="gates" bash "$HERE/chain.sh"
STAGES="witness l2 lanes-webkit" W_ENGINES=webkit L2_ENGINES=webkit WLANES="1 3 4 5 6 7" bash "$HERE/chain.sh"
echo "$(date +%T) RUN-ALL-DONE" >> "$HERE/chain.log"
# The critic's own probe (probe/), both trees, Chromium then WebKit; then the touched e2e specs.
ROOT=$(cd "$HERE/../../.." && pwd); RED=$ROOT/.cache/c1-v1100; G=~/.claude/guard/guarded
for E in chromium webkit; do
  for T in green red; do
    TREE=$([ $T = green ] && echo "$ROOT" || echo "$RED")
    EX=$([ $E = webkit ] && echo "--exclusive webkit" || echo "")
    $G $EX --timeout 30 -- bash "$HERE/probe/runprobe.sh" "$TREE" 8691 "$E" "$T" > "$HERE/probe/out/$T-$E.log" 2>&1
    echo "$(date +%T) critic probe $T $E exit $?" >> "$HERE/chain.log"
  done
done
STAGES="e2e" bash "$HERE/chain.sh"
echo "$(date +%T) RUN-ALL-2-DONE" >> "$HERE/chain.log"
