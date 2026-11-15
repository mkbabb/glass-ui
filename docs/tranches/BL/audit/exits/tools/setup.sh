#!/usr/bin/env bash
# setup.sh ci|build: npm ci, or the demo build, for both exit-audit trees, one after the other.
#   ~/.claude/guard/guarded --timeout 60 -- ./setup.sh ci
set -u
HERE="$(cd "$(dirname "$0")" && pwd)"
T="$HERE/../trees"; L="$HERE/../logs"
for t in v11.0.2 tip-95cd5bb3; do
  echo "== $t $1 $(date +%T)"
  if [ "$1" = ci ]; then (cd "$T/$t" && npm ci --no-audit --no-fund) > "$L/npm-ci-$t.log" 2>&1
  else "$HERE/build-tree-ex.sh" "$T/$t" > "$L/build-$t.log" 2>&1; fi
  echo "   exit $?"
done
