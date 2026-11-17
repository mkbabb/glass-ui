#!/usr/bin/env bash
# MEASURE-7 copy of m5/g14plantrun.sh (logs m7p-g14plant-*); the sites are re-read at the current line numbers. g14plantrun.sh [plant ...]: MEASURE-4, RU-22 pile (a)'s bites. For each plant (g14plants.py):
# apply it to the worktree's source, run its restated group's release sites in headless
# Chromium against the dev server (which reads src/ live), revert it. One guarded run at a
# time. A group bites when at least one of its sites fails under the plant (and passes on the
# build, logs/m4-g14-build-*). Log: logs/m5-g14plant-<plant>.log.
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; L="$H/../logs"; W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8; G=~/.claude/guard/guarded
sites() { case "$1" in
  corner) echo "release-10-1-5.spec.ts:217 release-10-1-5.spec.ts:294 release-10-1-5.spec.ts:318 release-10-1-5.spec.ts:336 release-10-1-5.spec.ts:999 release-11-0-1.spec.ts:105 release-11-0-1.spec.ts:115 release-11-0-1.spec.ts:126 release-11-0-1.spec.ts:142";;
  clock) echo "release-10-1-3.spec.ts:167 release-10-1-3.spec.ts:385 release-10-1-3.spec.ts:931";;
  lane) echo "release-10-1-3.spec.ts:601 release-10-1-3.spec.ts:637";;
  reserve) echo "release-10-1-2.spec.ts:446 release-10-1-2.spec.ts:495";;
  touch) echo "release-10-1-1.spec.ts:137 release-10-1-1.spec.ts:156 release-10-1-1.spec.ts:186";;
  press) echo "release-10-1-5.spec.ts:1617";;
  cap) echo "release-10-1-5.spec.ts:2603 release-10-1-5.spec.ts:1424";;
  fits) echo "release-10-1-5.spec.ts:732 release-10-1-5.spec.ts:1228 release-10-1-5.spec.ts:1453";;
  zoom) echo "release-10-1-3.spec.ts:931";;
  esac; }
P="${*:-$(python3 "$H/m4/g14plants.py" x list | python3 -c 'import json,sys;print(" ".join(json.load(sys.stdin)))')}"
for p in $P; do
  log="$L/m7p-g14plant-$p.log"; echo "== $p $(date '+%H:%M:%S')" > "$log"
  python3 "$H/m4/g14plants.py" "$p" apply >> "$log" 2>&1 || { echo "apply failed" >> "$log"; continue; }
  (cd "$W" && GLASS_UI_DEMO_PORT=5414 $G --timeout 40 -- npx playwright test -c tests-visual/playwright.config.ts $(sites "$p") $( [ "$p" = touch ] && echo --project=coarse-touch || echo --project=chromium-headless-new ) --workers=1 --reporter=list) >> "$log" 2>&1
  echo "rc=$?" >> "$log"
  python3 "$H/m4/g14plants.py" "$p" revert >> "$log" 2>&1
  (cd "$W" && git diff --quiet -- src) || { echo "SOURCE NOT CLEAN after $p" >> "$log"; exit 3; }
done
