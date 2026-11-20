#!/usr/bin/env bash
# Lane L5 witness chain: the branch, then v11.0.0 (`git archive v11.0.0` at .cache/l5-v1100
# with this harness copied in), Chromium then WebKit. Ends with WITNESS-DONE in out/chain.log.
HERE=$(cd "$(dirname "$0")" && pwd)
ROOT=$(cd "$HERE/../../.." && pwd)
RED=$ROOT/.cache/l5-v1100
mkdir -p "$RED/docs/release-11.1.0/lane-L5" && rm -rf "$RED/docs/release-11.1.0/lane-L5/harness" && cp -R "$HERE/harness" "$RED/docs/release-11.1.0/lane-L5/harness"
"$HERE/witness.sh" "$ROOT" 7991 green green "${1:-chromium webkit}"
"$HERE/witness.sh" "$RED" 7992 red red "${1:-chromium webkit}"
echo "WITNESS-DONE $(date +%T)" >> "$HERE/out/chain.log"
