#!/usr/bin/env bash
# One guarded browser run: serve the three scratch worktrees with vite, run one probe in one
# engine against all three, stop the servers.   run.sh <probe.mjs|stall.mjs> <engine> <out>
set -u
PROBE=$1; ENGINE=$2; OUT=$3
HERE=$(cd "$(dirname "$0")" && pwd)
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/marks
mkdir -p "$OUT"
PIDS=()
port() { case $1 in ctl) echo 7961;; a) echo 7962;; b) echo 7963;; esac; }
for l in ctl a b; do
  ( cd "$WT/measure-$l" && exec npx vite --host 127.0.0.1 --port "$(port $l)" --strictPort ) > "$OUT/$ENGINE-$l-server.log" 2>&1 &
  PIDS+=($!)
done
trap 'for p in "${PIDS[@]}"; do kill $p 2>/dev/null; done; wait 2>/dev/null' EXIT
for l in ctl a b; do
  for i in $(seq 1 90); do
    curl -sf "http://127.0.0.1:$(port $l)/ab/index.html" > /dev/null && break
    sleep 2
  done
done
export TREE_CTL=$WT/measure-ctl TREE_A=$WT/measure-a TREE_B=$WT/measure-b
cd "$HERE" && node "$HERE/$PROBE" "$ENGINE" "$OUT" ctl=http://127.0.0.1:7961 a=http://127.0.0.1:7962 b=http://127.0.0.1:7963
