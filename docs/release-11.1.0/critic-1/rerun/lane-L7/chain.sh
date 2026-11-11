#!/usr/bin/env bash
# Lane L7 witness chain: the branch, then v11.0.0 (the cached `git archive v11.0.0` tree at
# .cache/l5-v1100, its HandMark byte-identical to the tag, with this harness copied in),
# Chromium then WebKit; then compare.mjs reads the at-rest look across the two trees.
# Ends with WITNESS-DONE in out/chain.log.
HERE=$(cd "$(dirname "$0")" && pwd)
ROOT=$(cd "$HERE/../../.." && pwd)
RED=$ROOT/.cache/l5-v1100
mkdir -p "$RED/docs/release-11.1.0/lane-L7" && rm -rf "$RED/docs/release-11.1.0/lane-L7/harness" && cp -R "$HERE/harness" "$RED/docs/release-11.1.0/lane-L7/harness"
"$HERE/witness.sh" "$ROOT" 7981 green green "${1:-chromium webkit}"
"$HERE/witness.sh" "$RED" 7982 red red "${1:-chromium webkit}"
node "$HERE/compare.mjs" "$HERE/out" > "$HERE/out/compare.log" 2>&1
echo "$(date +%T) compare exit $?" >> "$HERE/out/chain.log"
echo "WITNESS-DONE $(date +%T)" >> "$HERE/out/chain.log"
