#!/usr/bin/env bash
# run2.sh <engine> <list-file>: PROTOTYPE-2 runs from scenarios-p2/, prototype tree only, one
# browser per probe call, one probe at a time. Rows to ../rows/p2/.
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
ENGINE="$1"; LIST="$2"
TREE=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8
mkdir -p "$HERE/../rows/p2"
while read -r which name extra; do
    [ -z "$which" ] && continue
    case "$which" in \#*) continue;; esac
    echo "== $name $ENGINE $(date '+%H:%M:%S')"
    node "$HERE/probe.mjs" "$TREE" dock-wi8 "$HERE/scenarios-p2/$name.json" --port 5401 --engine "$ENGINE" --out "$HERE/../rows/p2" --no-strip $extra 2>&1 | cut -c1-300
done < "$LIST"
