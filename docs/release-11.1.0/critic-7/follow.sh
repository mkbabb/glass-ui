#!/usr/bin/env bash
# Fix 7 follower: after the Chromium chain's CHAIN-DONE, run the next phases one guarded run at a time.
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
until grep -q "CHAIN-DONE p9c wc relc" "$HERE/chain.log" 2>/dev/null; do sleep 30; done
bash "$HERE/chain.sh" "$@"
