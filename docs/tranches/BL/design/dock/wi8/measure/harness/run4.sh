#!/usr/bin/env bash
# run4.sh <engine> <list-file> <out-name>: FOLD-2 runs from scenarios-p3/ on the amended
# build, one browser per probe call, one probe at a time. Rows to ../rows/<out-name>/.
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
ENGINE="$1"; LIST="$2"; OUT="$HERE/../rows/$3"
TREE=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8
mkdir -p "$OUT"
while read -r which name extra; do
    [ -z "$which" ] && continue
    case "$which" in \#*) continue;; esac
    echo "== $name $ENGINE $(date '+%H:%M:%S')"
    node "$HERE/probe.mjs" "$TREE" dock-wi8 "$HERE/scenarios-p3/$name.json" --port 5401 --engine "$ENGINE" --out "$OUT" --no-strip $extra 2>&1 | cut -c1-300
done < "$LIST"
