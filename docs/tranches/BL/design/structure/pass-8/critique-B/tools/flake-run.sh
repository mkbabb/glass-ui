#!/usr/bin/env bash
# flake-run.sh <scratch> · critique-B pass 8 · written AFTER the battery hash (invocation glue only). Generates the
# hashed flake-cases.mjs fixtures and runs the pass-8 kit's tools/browser-tally.mjs over them with the flags LAW §13
# names (--base, --route, --base-rerun x3, --route-rerun x3), then prints each case's line against EXPECT.json.
set -u
S="$1"; HERE="$(cd "$(dirname "$0")" && pwd)"; ST="$HERE/../../.."
node "$HERE/../battery/flake-cases.mjs" --out "$S/flake"
F="$S/flake"
node "$ST/pass-8/B-kit/tools/browser-tally.mjs" --base "$F/base.json" --route "$F/route.json" \
  --base-rerun "$F/rerun-base-1.json" --base-rerun "$F/rerun-base-2.json" --base-rerun "$F/rerun-base-3.json" \
  --route-rerun "$F/rerun-route-1.json" --route-rerun "$F/rerun-route-2.json" --route-rerun "$F/rerun-route-3.json" > "$F/tally.txt" 2>&1
echo "tally rc=$?"; cat "$F/tally.txt"
echo "EXPECT $(cat "$F/EXPECT.json" | tr -d '\n ')"
