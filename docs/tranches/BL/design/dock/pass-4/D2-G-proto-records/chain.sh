#!/bin/bash
# chain.sh (D2-G pass 4; after D2-Bp-crit-records/chain.sh): the final build g from the seat worktree, then each
# engine's full H4 battery (run.sh stages main, rest, dark, darkrest, extra) in its own guarded slot (the WebKit one
# holds the WebKit lock; NOGUARD inside).
#   bash chain.sh <worktree> [build|chromium|webkit]...
set -u
WT=$1; shift; REC=$(cd "$(dirname "$0")" && pwd); P4=$(cd "$REC/.." && pwd); H=$(cd "$P4/../harness" && pwd)
O=$WT/.gout; G=~/.claude/guard/guarded
for step in "$@"; do case $step in
build) (uptime; $G --timeout 30 -- node "$H/build.mjs" "$WT" --out "$O" --label g; echo "build exit $?"; uptime) > "$REC/build-g.log" 2>&1 ;;
chromium|webkit)
  e=$step; mkdir -p "$O-fin-$e"; ln -sfn "$O/builds" "$O-fin-$e/builds"; X=""; [ $e = webkit ] && X="--exclusive webkit"
  $G $X --timeout 90 -- bash -c "for s in ${STAGES:-main rest dark darkrest extra}; do NOGUARD=1 ENG=$e WT='$WT' bash '$REC/run.sh' '$O-fin-$e' \$s; done; echo ENGINE-DONE $e; uptime" > "$REC/chain-$e.log" 2>&1
  echo "exit $?" >> "$REC/chain-$e.log" ;;
esac; done
