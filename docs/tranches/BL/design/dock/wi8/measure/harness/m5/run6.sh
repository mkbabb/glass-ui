#!/usr/bin/env bash
# run6.sh: run5.sh reading scenarios-m5/ first, then scenarios-m3/.
# run5.sh <engine> <list-file> <out-name> [port]: MEASURE-3 probe runs from scenarios-m3/, one
# browser per probe call, one probe at a time. Rows to ../../rows/<out-name>/.
set -uo pipefail
HERE="$(cd "$(dirname "$0")/.." && pwd)"
ENGINE="$1"; LIST="$2"; OUT="$HERE/../rows/$3"; PORT="${4:-5401}"
TREE=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8
mkdir -p "$OUT"
while read -r which name extra; do
    [ -z "$which" ] && continue
    case "$which" in \#*) continue;; esac
    SC="$HERE/scenarios-m5/$name.json"; [ -f "$SC" ] || SC="$HERE/scenarios-m3/$name.json"
    echo "== $name $ENGINE $(date '+%H:%M:%S')"
    node "$HERE/probe.mjs" "$TREE" dock-wi8 "$SC" --port "$PORT" --engine "$ENGINE" --out "$OUT" --no-strip $extra 2>&1 | cut -c1-300
done < "$LIST"
