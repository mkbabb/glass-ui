#!/usr/bin/env bash
# Strips for the FINDINGS rows that cite one (harness probe.mjs; rows + PNG strips to films/).
#   ~/.claude/guard/guarded --timeout 30 -- ./strips.sh [tree-dir port]
set -u
cd "$(dirname "$0")"
H=../../animation/harness
TREE=${1:-tree-11.1.0-acd8db1eb}; PORT=${2:-5411}
OUT=$(cd ..; pwd)/films
mkdir -p "$OUT"
for N in lt-menu-reverse lt-collapsible-reverse lt-toast-dismiss-mid-enter lt-dock-layers; do
  F=$(pwd)/scenarios/$N.json
  C=$(node -e 'console.log(require(process.argv[1]).component)' "$F")
  echo "== $N ($C)"
  (cd $H && node probe.mjs "$TREE" "$C" "$F" --port "$PORT" --out "$OUT" --frames 10) | cut -c1-300 || echo "FAILED $N"
done
