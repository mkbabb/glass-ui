#!/usr/bin/env bash
# g14plantrun.sh <group>: MEASURE-8 part M, G-14's restated group <group> (m4/g14plants.py's plant, pm/plant.py's
# g14-<group>, re-anchored where the merge moved its site) applied to the measure's tree of the tip (.pm-tip) only, its
# release sites run in all three projects against the tree's own dev server (the config's webServer, which reads the
# tree's src live, port 5414): Chromium's two projects (chromium-headless-new, coarse-touch) in one run, WebKit 2287 by
# its config (10.1.1 and 10.1.2 on webkit-2287.config.ts, the rest on release-11-0-1.config.ts) under `--exclusive webkit`;
# then reverted (also on exit) and the tree's src checked against HEAD. The sites are m7/g14plantrun7.sh's, at the tip's
# line numbers (the merge moved release-10-1-2's and release-10-1-3's: clock 390 and 942, lane 607 and 643, reserve 458
# and 507, zoom 942). A group bites in a project when one of its sites fails under the plant and passes on the tip's own
# G-14 run (logs/pm-g14-tip-*). Log: logs/pm-g14plant-<group>.log.
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; L="$H/../logs"; T=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/.pm-tip; G=~/.claude/guard/guarded
p="$1"; log="$L/pm-g14plant-$p.log"; tmp="$log.part"
sites() { case "$1" in
  corner) echo "release-10-1-5.spec.ts:217 release-10-1-5.spec.ts:294 release-10-1-5.spec.ts:318 release-10-1-5.spec.ts:336 release-10-1-5.spec.ts:999 release-11-0-1.spec.ts:105 release-11-0-1.spec.ts:115 release-11-0-1.spec.ts:126 release-11-0-1.spec.ts:142";;
  clock) echo "release-10-1-3.spec.ts:167 release-10-1-3.spec.ts:390 release-10-1-3.spec.ts:942";;
  lane) echo "release-10-1-3.spec.ts:607 release-10-1-3.spec.ts:643";;
  reserve) echo "release-10-1-2.spec.ts:458 release-10-1-2.spec.ts:507";;
  touch) echo "release-10-1-1.spec.ts:137 release-10-1-1.spec.ts:156 release-10-1-1.spec.ts:186";;
  press) echo "release-10-1-5.spec.ts:1617";;
  cap) echo "release-10-1-5.spec.ts:2603 release-10-1-5.spec.ts:1424";;
  fits) echo "release-10-1-5.spec.ts:732 release-10-1-5.spec.ts:1228 release-10-1-5.spec.ts:1453";;
  zoom) echo "release-10-1-3.spec.ts:942";;
  esac; }
revert() { if [ -d "$T/.pm-orig/g14-$p" ]; then python3 "$H/pm/plant.py" "$T" "g14-$p" revert >> "$tmp" 2>&1; fi; }
trap revert EXIT INT TERM
echo "== $p $(date '+%F %T') (load $(sysctl -n vm.loadavg))" > "$tmp"
python3 "$H/pm/plant.py" "$T" "g14-$p" apply >> "$tmp" 2>&1 || { echo "apply failed" >> "$tmp"; mv "$tmp" "$log"; exit 0; }
S=$(sites "$p"); A=""; B=""
for s in $S; do case "$s" in release-10-1-1*|release-10-1-2*) A="$A $s";; *) B="$B $s";; esac; done
echo "-- chromium $(date '+%T') (load $(sysctl -n vm.loadavg))" >> "$tmp"
(cd "$T" && GLASS_UI_DEMO_PORT=5414 $G --timeout 45 -- npx playwright test -c tests-visual/playwright.config.ts $S --project=chromium-headless-new --project=coarse-touch --workers=1 --reporter=list) >> "$tmp" 2>&1; echo "chromium rc=$?" >> "$tmp"
[ -n "$A" ] && { echo "-- webkit-a $(date '+%T') (load $(sysctl -n vm.loadavg))" >> "$tmp"; (cd "$T" && GLASS_UI_DEMO_PORT=5414 $G --exclusive webkit --timeout 45 -- npx playwright test -c tests-visual/webkit-2287.config.ts $A --project=webkit --workers=1 --reporter=list) >> "$tmp" 2>&1; echo "webkit-a rc=$?" >> "$tmp"; }
[ -n "$B" ] && { echo "-- webkit-b $(date '+%T') (load $(sysctl -n vm.loadavg))" >> "$tmp"; (cd "$T" && GLASS_UI_DEMO_PORT=5414 $G --exclusive webkit --timeout 45 -- npx playwright test -c tests-visual/release-11-0-1.config.ts $B --project=webkit --workers=1 --reporter=list) >> "$tmp" 2>&1; echo "webkit-b rc=$?" >> "$tmp"; }
revert
python3 "$H/pm/clean.py" "$T" >> "$tmp" 2>&1 || { echo "TREE NOT CLEAN after $p" >> "$tmp"; mv "$tmp" "$log"; exit 3; }
echo "== done $(date '+%F %T')" >> "$tmp"; mv "$tmp" "$log"
