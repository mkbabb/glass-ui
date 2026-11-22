#!/usr/bin/env bash
# tree9.sh <ref> <tree-dir> [pages|units]: MEASURE-9 part H. A `git archive` of <ref> without docs/ in <tree-dir> (kept
# when it is already at the ref), node_modules linked to the main checkout's (s8/tree8.sh's form). `pages` copies the
# measure's pages in (pages9.sh); `units` makes RU-121's tree instead: docs/ linked read-only to a checkout whose docs
# are the ref's (the worktree for the branch, the main checkout for master), no page in demo/__anim, and a dist/ built
# from the tree before the units run (the caller builds it).
set -euo pipefail
H="$(cd "$(dirname "$0")/.." && pwd)"; W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8; L="$H/../logs"
REF="$1"; T="$2"; MODE="${3:-}"; SHA=$(git -C "$W" rev-parse --short "$REF")
if [ -f "$T/.g16-ref" ] && [ "$(cat "$T/.g16-ref")" = "$SHA" ]; then :; else
  rm -rf "$T"; mkdir -p "$T"
  git -C "$W" archive "$REF" -- . ':(exclude)docs' | tar -x -C "$T"
  ln -s /Users/mkbabb/Programming/glass-ui/node_modules "$T/node_modules"
  echo "$SHA" > "$T/.g16-ref"
  echo "$(date '+%F %T') tree9: archived $REF ($SHA) into $T, docs/ left out" >> "$L/m9-disk.log"
fi
case "$MODE" in
  pages) "$H/m9/pages9.sh" "$T" >/dev/null;;
  units)
    rm -rf "$T/demo/__anim"
    if [ ! -e "$T/docs" ]; then
      case "$REF" in aeb6f3ee7*|master) ln -s /Users/mkbabb/Programming/glass-ui/docs "$T/docs";; *) ln -s "$W/docs" "$T/docs";; esac
    fi;;
esac
echo "$T at $SHA ${MODE:-bare}"
