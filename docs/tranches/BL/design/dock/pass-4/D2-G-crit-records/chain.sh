#!/bin/bash
# chain.sh (D2-G pass-4 CRITIC; after D2-G-proto-records/chain.sh): builds fv3 (G patch reversed) and g (re-applied)
# in the critic worktree, then each engine's full H4 battery (run.sh stages main rest dark darkrest extra faces
# darkfaces) in its own guarded slot; the WebKit slot holds the WebKit lock (NOGUARD inside).
#   bash chain.sh <worktree> [build|chromium|webkit]...
set -u
WT=$1; shift; REC=$(cd "$(dirname "$0")" && pwd); P4=$(cd "$REC/.." && pwd); H=$(cd "$P4/../harness" && pwd)
O=$WT/.critout; G=~/.claude/guard/guarded
for step in "$@"; do case $step in
build) $G --timeout 40 -- bash -c "
  uptime; cd '$WT' && git apply -R '$P4/D2-G-proto.patch' && echo reversed-g
  node '$H/build.mjs' '$WT' --out '$O' --label fv3; echo fv3-build-exit \$?
  git apply '$P4/D2-G-proto.patch' && echo reapplied-g
  node '$H/build.mjs' '$WT' --out '$O' --label g; echo g-build-exit \$?; uptime" > "$REC/build.log" 2>&1 ;;
chromium|webkit)
  e=$step; mkdir -p "$O-$e"; ln -sfn "$O/builds" "$O-$e/builds"; X=""; [ $e = webkit ] && X="--exclusive webkit"
  $G $X --timeout 90 -- bash -c "for s in ${STAGES:-main rest dark darkrest extra faces darkfaces}; do NOGUARD=1 ENG=$e WT='$WT' bash '$REC/run.sh' '$O-$e' \$s; done; echo ENGINE-DONE $e; uptime" > "$REC/chain-$e.log" 2>&1
  echo "exit $?" >> "$REC/chain-$e.log" ;;
esac; done
