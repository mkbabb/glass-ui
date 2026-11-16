#!/usr/bin/env bash
# Lane L4 witness chain: the consumer-bundler witness on both packages (one guarded run),
# then the browser witness, branch then v11.0.0, Chromium then WebKit. The branch package
# is this worktree's built dist/; the v11.0.0 package is the published 11.0.0 tarball
# (.cache/l4-pack/package); the v11.0.0 source tree is `git archive v11.0.0`
# (.cache/l4-v1100) with this harness copied in. Ends with WITNESS-DONE in out/chain.log.
HERE=$(cd "$(dirname "$0")" && pwd)
ROOT=$(cd "$HERE/../../.." && pwd)
RED=$ROOT/.cache/l4-v1100
PACK=$ROOT/.cache/l4-pack/package
G=~/.claude/guard/guarded
mkdir -p "$RED/docs/release-11.1.0/lane-L4" && rm -rf "$RED/docs/release-11.1.0/lane-L4/harness" && cp -R "$HERE/harness" "$RED/docs/release-11.1.0/lane-L4/harness"
$G --timeout 15 -- bash -c "cd '$ROOT' && node '$HERE/consumer.mjs' '$ROOT' '$HERE/out/consumer-green.json'; echo \"\$(date +%T) consumer green exit \$?\" >> '$HERE/out/chain.log'; node '$HERE/consumer.mjs' '$PACK' '$HERE/out/consumer-red.json'; echo \"\$(date +%T) consumer red exit \$?\" >> '$HERE/out/chain.log'" > "$HERE/out/consumer.log" 2>&1
"$HERE/witness.sh" "$ROOT" "$ROOT" 7981 green green
"$HERE/witness.sh" "$RED" "$PACK" 7982 red red
echo "WITNESS-DONE $(date +%T)" >> "$HERE/out/chain.log"
