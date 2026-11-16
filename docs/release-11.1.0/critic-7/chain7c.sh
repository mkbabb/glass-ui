#!/usr/bin/env bash
# Critic 7, third chain (reruns of two cells that read off under load), after chain B ends.
set -u
HERE=$(cd "$(dirname "$0")" && pwd); ROOT=$(cd "$HERE/../../.." && pwd)
G=~/.claude/guard/guarded; LOG=$HERE/chain.log
say() { echo "$(date +%T) $*" >> "$LOG"; }
until grep -q "CHAIN-B-DONE" "$LOG"; do sleep 20; done
# release-10-1-5 part B again, Chromium (p2 failed at a load of 246)
mkdir -p "$HERE/release-rerun"
sed "s#critic-7/release#critic-7/release-rerun#" "$HERE/release.sh" > "$HERE/release-rerun.sh"
$G --timeout 40 -- bash "$HERE/release-rerun.sh" ch partB > "$HERE/release-rerun/chain-ch.out" 2>&1
say "release-rerun partB ch exit $?: $(tail -2 "$HERE/release-rerun/runs.txt" | head -1)"
# lane L7 again, WebKit, the branch (its screencast saw no frame after drawn)
mkdir -p "$HERE/rerun/lane-L7/out-first"; cp "$HERE/rerun/lane-L7/out/green-webkit."* "$HERE/rerun/lane-L7/out-first/" 2>/dev/null
"$HERE/rerun/lane-L7/witness.sh" "$ROOT" 8871 green green webkit
say "lane L7 webkit rerun: $(grep -v '^\s*$' "$HERE/rerun/lane-L7/out/green-webkit.log" | tail -1)"
say "CHAIN-C-DONE"
