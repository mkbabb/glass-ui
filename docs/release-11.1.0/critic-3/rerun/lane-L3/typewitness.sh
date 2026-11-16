#!/usr/bin/env bash
# O-178's type witness: vue-tsc over a consumer SFC that passes a typed virtual element
# to PopoverContent's `reference`, on the branch and on the v11.0.0 tree (the tree has
# `checkUnknownProps`, so an undeclared prop is an error). One light guarded run each.
HERE=$(cd "$(dirname "$0")" && pwd)
ROOT=$(cd "$HERE/../../.." && pwd)
OUT=$HERE/out
mkdir -p "$OUT"
RED=$ROOT/.cache/l3-v1100
# (never run this while a witness chain is serving either tree: vite force-reloads the
# page when a tsconfig.json under its root changes)
mkdir -p "$RED/docs/release-11.1.0/lane-L3/typewitness"
cp "$HERE"/typewitness/* "$RED/docs/release-11.1.0/lane-L3/typewitness/"
for T in green red; do
  TREE=$([ $T = green ] && echo "$ROOT" || echo "$RED")
  ~/.claude/guard/guarded --light --timeout 10 -- bash -c "cd '$TREE' && npx vue-tsc --noEmit -p docs/release-11.1.0/lane-L3/typewitness/tsconfig.json" > "$OUT/type-$T.log" 2>&1
  rc=$?
  echo "$(date +%T) type $T exit $rc" >> "$OUT/chain.log"
done
