#!/usr/bin/env bash
# Lane L3 witness chain: branch then v11.0.0, Chromium then WebKit, one guarded browser
# run each (witness.sh). Ends with WITNESS-DONE in out/chain.log.
HERE=$(cd "$(dirname "$0")" && pwd)
ROOT=$(cd "$HERE/../../.." && pwd)
"$HERE/witness.sh" "$ROOT" 7961 green green
"$HERE/witness.sh" "$ROOT/.cache/l3-v1100" 7962 red red
echo "WITNESS-DONE $(date +%T)" >> "$HERE/out/chain.log"
