#!/usr/bin/env bash
# g14plantrun8.sh [group ...]: MEASURE-8 H4 (RU-81: G-14's plants ran in Chromium and coarse touch only). Each restated
# group's plant (m4/g14plants.py) applied to the worktree's source, its release sites run in WebKit 2287 (the 10.1.1 and
# 10.1.2 specs by tests-visual/webkit-2287.config.ts, the rest by release-11-0-1.config.ts, --project=webkit, against the
# config's own dev server, which reads src/ live), under `guarded --exclusive webkit`, then reverted and the source
# checked clean. m7/g14plantrun7.sh's sites. A group bites in WebKit when one of its sites fails under the plant and
# passes on the build (logs/m5-g14-m7p-webkit-*: the pass's WebKit run on 943fe6e9d). Log: logs/m8-g14plant-<group>.log.
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
P="${*:-corner clock lane reserve touch press cap fits zoom}"
for p in $P; do
  log="$L/m8-g14plant-$p.log"; echo "== $p $(date '+%H:%M:%S') (load $(sysctl -n vm.loadavg))" > "$log"
  python3 "$H/m4/g14plants.py" "$p" apply >> "$log" 2>&1 || { echo "apply failed" >> "$log"; continue; }
  A=""; B=""
  for s in $(sites "$p"); do case "$s" in release-10-1-1*|release-10-1-2*) A="$A $s";; *) B="$B $s";; esac; done
  [ -n "$A" ] && { (cd "$W" && GLASS_UI_DEMO_PORT=5414 $G --exclusive webkit --timeout 40 -- npx playwright test -c tests-visual/webkit-2287.config.ts $A --project=webkit --workers=1 --reporter=list) >> "$log" 2>&1; echo "webkit-a rc=$?" >> "$log"; }
  [ -n "$B" ] && { (cd "$W" && GLASS_UI_DEMO_PORT=5414 $G --exclusive webkit --timeout 40 -- npx playwright test -c tests-visual/release-11-0-1.config.ts $B --project=webkit --workers=1 --reporter=list) >> "$log" 2>&1; echo "webkit-b rc=$?" >> "$log"; }
  python3 "$H/m4/g14plants.py" "$p" revert >> "$log" 2>&1
  (cd "$W" && git diff --quiet -- src) || { echo "SOURCE NOT CLEAN after $p" >> "$log"; exit 3; }
  echo "== done $(date '+%H:%M:%S')" >> "$log"
done
