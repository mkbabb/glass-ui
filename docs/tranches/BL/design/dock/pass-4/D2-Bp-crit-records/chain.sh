#!/bin/bash
# chain.sh (D2-B′ pass-4 critic): the bp build (B′ patch already applied in the critic worktree, apply-bp.log),
# then each engine's full battery in its own guarded slot (the WebKit one holds the WebKit lock; NOGUARD inside).
#   bash chain.sh <worktree> [build|chromium|webkit]...
set -u
WT=$1; shift; REC=$(cd "$(dirname "$0")" && pwd); P4=$(cd "$REC/.." && pwd); H=$(cd "$P4/../harness" && pwd)
O=$WT/.critout; G=~/.claude/guard/guarded
for step in "$@"; do case $step in
build) (uptime; $G --timeout 30 -- node "$H/build.mjs" "$WT" --out "$O" --label bp; echo "build exit $?"; uptime) > "$REC/build-bp.log" 2>&1 ;;
chromium|webkit)
  e=$step; mkdir -p "$O-$e"; ln -sfn "$O/builds" "$O-$e/builds"; X=""; [ $e = webkit ] && X="--exclusive webkit"
  $G $X --timeout 90 -- bash -c "for s in main rest dark darkrest extra; do NOGUARD=1 ENG=$e WT='$WT' bash '$REC/run.sh' '$O-$e' \$s; done; echo ENGINE-DONE $e; uptime" > "$REC/chain-$e.log" 2>&1
  echo "exit $?" >> "$REC/chain-$e.log" ;;
esac; done
