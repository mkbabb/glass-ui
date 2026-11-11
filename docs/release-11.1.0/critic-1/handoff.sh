#!/usr/bin/env bash
HERE=$(cd "$(dirname "$0")" && pwd)
until [ $(sed -n '/restart 3/,$p' "$HERE/chain.log" | grep -c "critic .* exit") -ge 4 ]; do sleep 30; done
P=$(pgrep -f "bash ./chain.sh$" | head -1); [ -n "$P" ] && kill -TERM -$(ps -o pgid= -p $P | tr -d ' ')
sleep 3
echo "--- handoff to chain2 (lane reruns, Chromium pass then WebKit pass)" >> "$HERE/chain.log"
cd "$HERE" && exec ./chain2.sh
