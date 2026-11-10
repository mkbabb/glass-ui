#!/usr/bin/env bash
# Lane L6 witness chain: the branch, then v11.0.0 (`git archive v11.0.0` at .cache/l6-v1100
# with this harness copied in), Chromium then WebKit. Ends with WITNESS-DONE in out/chain.log.
#   chain.sh <green-label> <red-label> [engines]
HERE=$(cd "$(dirname "$0")" && pwd)
ROOT=$(cd "$HERE/../../.." && pwd)
RED=$ROOT/.cache/l6-v1100
mkdir -p "$RED/docs/release-11.1.0/lane-L6" && rm -rf "$RED/docs/release-11.1.0/lane-L6/harness" && cp -R "$HERE/harness" "$RED/docs/release-11.1.0/lane-L6/harness"
"$HERE/witness.sh" "$ROOT" 7963 "${1:-green}" "${3:-chromium webkit}"
"$HERE/witness.sh" "$RED" 7964 "${2:-red}" "${3:-chromium webkit}"
echo "WITNESS-DONE $(date +%T)" >> "$HERE/out/chain.log"
