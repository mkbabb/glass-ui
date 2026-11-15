#!/usr/bin/env bash
# run.sh <engine> <list-file>: each line "<proto|red> <scenario-name>"; one browser per probe
# call, one probe at a time. Rows to ../rows/<proto|red>/, the judge's lines to ../logs/.
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
P="$HERE/probe.mjs"
ENGINE="$1"; LIST="$2"
mkdir -p "$HERE/../rows/proto" "$HERE/../rows/red" "$HERE/../logs" "$HERE/../strips/proto" "$HERE/../strips/red"
while read -r which name extra; do
    [ -z "$which" ] && continue
    case "$which" in \#*) continue;; esac
    if [ "$which" = proto ]; then TREE=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8; PORT=5401;
    else TREE=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/.red-v11.0.1; PORT=5402; fi
    echo "== $which $name $ENGINE $extra"
    node "$P" "$TREE" dock-wi8 "$HERE/scenarios/$name.json" --port "$PORT" --engine "$ENGINE" --out "$HERE/../rows/$which" $extra 2>&1 | cut -c1-300
done < "$LIST"
