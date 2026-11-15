#!/usr/bin/env bash
# run3.sh <engine> <list-file>: PROTOTYPE-3 runs from scenarios-p3/, prototype tree only, one
# browser per probe call, one probe at a time. Rows to ../rows/p3/.
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
ENGINE="$1"; LIST="$2"
TREE=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8
mkdir -p "$HERE/../rows/p3"
while read -r which name extra; do
    [ -z "$which" ] && continue
    case "$which" in \#*) continue;; esac
    echo "== $name $ENGINE $(date '+%H:%M:%S')"
    node "$HERE/probe.mjs" "$TREE" dock-wi8 "$HERE/scenarios-p3/$name.json" --port 5401 --engine "$ENGINE" --out "$HERE/../rows/p3" --no-strip $extra 2>&1 | cut -c1-300
done < "$LIST"
