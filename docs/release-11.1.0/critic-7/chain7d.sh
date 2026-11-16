#!/usr/bin/env bash
# Critic 7, resumed after the 04:09 zone stop and the reboot: only what the refusal cut.
# One guarded run at a time (WebKit under --exclusive webkit). A guarded exit 75 stops the chain.
#   chain7d.sh <phase>...   phases: partB l7 fix3 redw relw e2ew
set -u
HERE=$(cd "$(dirname "$0")" && pwd); ROOT=$(cd "$HERE/../../.." && pwd)
G=~/.claude/guard/guarded; LOG=$HERE/chain.log; RED=$ROOT/.cache/c1-v1100; PKG_RED=$ROOT/.cache/l4-pack/package
R=$HERE/rerun
say() { echo "$(date +%T) $*" >> "$LOG"; }
stop75() { [ "$1" = 75 ] && { say "STOP: guarded REFUSED at $2"; exit 75; }; }
disk() { local a; a=$(df -g /System/Volumes/Data | tail -1 | awk '{print $4}'); say "disk ${a}G free, load $(uptime | sed 's/.*averages: //')"; [ "$a" -lt 6 ] && { say "STOP disk"; exit 9; }; }
lanerc() { tail -1 "$R/lane-L$1/out/chain.log" | grep -q 'exit 75' && { say "STOP: guarded REFUSED at lane L$1"; exit 75; }; }
say "RESUME (2026-11-14, after the reboot): $*"
for P in "$@"; do
  disk
  case $P in
    partB) # release-10-1-5 part B again, Chromium (p2 failed once at a load of 246)
      mkdir -p "$HERE/release-rerun"
      $G --timeout 40 -- bash "$HERE/release-rerun.sh" ch partB > "$HERE/release-rerun/chain-ch.out" 2>&1; rc=$?
      say "release-rerun partB ch exit $rc: $(tail -2 "$HERE/release-rerun/runs.txt" | head -1)"; stop75 $rc partB;;
    l7) # lane L7 again, WebKit, the branch (the first pass's screencast held no frame after drawn; kept in out-first/)
      mkdir -p "$R/lane-L7/out-refused"; mv "$R/lane-L7/out/green-webkit.log" "$R/lane-L7/out-refused/" 2>/dev/null
      "$R/lane-L7/witness.sh" "$ROOT" 8871 green green webkit
      say "lane L7 webkit rerun: $(tail -1 "$R/lane-L7/out/chain.log") :: $(grep -v '^\s*$' "$R/lane-L7/out/green-webkit.log" | tail -1)"; lanerc 7;;
    fix3)
      for T in green red; do
        TREE=$([ $T = green ] && echo "$ROOT" || echo "$RED")
        $G --exclusive webkit --timeout 30 -- bash "$HERE/fix3-witness/runprobe.sh" "$TREE" 8811 webkit "$T" > "$HERE/fix3-witness/out/$T-webkit.log" 2>&1; rc=$?
        say "fix3-witness $T webkit exit $rc"; stop75 $rc "fix3 $T"
      done
      : > "$HERE/fix3-witness/out/judge-webkit.log"
      for T in green red; do node "$HERE/fix3-witness/judge.mjs" "$HERE/fix3-witness/out" "$T" webkit red >> "$HERE/fix3-witness/out/judge-webkit.log" 2>&1; done
      say "fix3 judge webkit: $(tr '\n' ';' < "$HERE/fix3-witness/out/judge-webkit.log" | cut -c1-600)";;
    redw) # v11.0.0 in WebKit: the fix-5, fix-4, fix-2 witnesses and lanes L1-L5
      $G --exclusive webkit --timeout 40 -- bash "$HERE/fix5-witness/run.sh" webkit 8791 red="$RED" > "$HERE/fix5-witness/out/run-webkit-red.log" 2>&1; rc=$?
      say "fix5-witness red webkit exit $rc: $(tail -1 "$HERE/fix5-witness/out/chain.log")"; stop75 $rc fix5
      $G --exclusive webkit --timeout 30 -- bash "$HERE/fix4-witness/run.sh" webkit 8801 red="$RED" > "$HERE/fix4-witness/out/run-webkit-red.log" 2>&1; rc=$?
      say "fix4-witness red webkit exit $rc: $(tail -1 "$HERE/fix4-witness/out/chain.log")"; stop75 $rc fix4
      $G --exclusive webkit --timeout 30 -- bash "$HERE/fix2-witness/runprobe.sh" "$RED" 8822 webkit red > "$HERE/fix2-witness/out/red-webkit.log" 2>&1; rc=$?
      say "fix2-witness red webkit exit $rc: $(grep -v '^\s*$' "$HERE/fix2-witness/out/red-webkit.log" | tail -1 | cut -c1-200)"; stop75 $rc fix2
      for L in 1 2 3 4 5; do
        W=$R/lane-L$L/witness.sh
        case $L in
          1) "$W" "$RED" 8812 red webkit ;;
          4) "$W" "$RED" "$PKG_RED" 8842 red red webkit ;;
          *) "$W" "$RED" 88${L}2 red red webkit ;;
        esac
        say "lane L$L red webkit: $(tail -1 "$R/lane-L$L/out/chain.log") :: $(grep -v '^\s*$' "$R/lane-L$L/out/red-webkit.log" | tail -1 | cut -c1-200)"; lanerc $L
      done;;
    relw) # the 11.0.1 release specs on the branch, WebKit 2287, two guarded calls
      $G --exclusive webkit --timeout 90 -- bash "$HERE/release.sh" wk partA partB g6-4 > "$HERE/release/chain-wk-1.out" 2>&1; rc=$?
      say "release wk (partA partB g6-4) exit $rc: $(tail -1 "$HERE/release/runs.txt")"; stop75 $rc relw-1
      $G --exclusive webkit --timeout 90 -- bash "$HERE/release.sh" wk g6-3 r2 owner fix2 c2 > "$HERE/release/chain-wk-2.out" 2>&1; rc=$?
      say "release wk (g6-3 r2 owner fix2 c2) exit $rc: $(tail -1 "$HERE/release/runs.txt")"; stop75 $rc relw-2;;
    e2ew)
      export C3_SPECS="disclosure-rotate.spec.ts SegmentedTabs.glide.spec.ts tabs-std.spec.ts a11y-slider.spec.ts aria-orientation.spec.ts Select.bound.spec.ts overlay-sizing.spec.ts menu-glass.spec.ts config-chassis.spec.ts config-right.spec.ts nav-dock-fix.spec.ts Sheet.position.spec.ts handmark.spec.ts liquid-hover.spec.ts dock-plate-clearance.spec.ts register-ios.spec.ts dock-morph-family.spec.ts"
      for T in branch v1100; do
        TREE=$([ $T = branch ] && echo "$ROOT" || echo "$RED")
        ( cd "$ROOT" && F2_ROOT=$TREE PI_REPORT=$HERE/e2e/webkit-$T.json GLASS_UI_DEMO_PORT=8882 $G --exclusive webkit --timeout 60 -- \
          npx playwright test -c docs/release-11.1.0/critic-4/e2e-webkit.config.ts --workers=1 ) > "$HERE/e2e/webkit-$T.log" 2>&1; rc=$?
        say "e2e webkit $T exit $rc: $(grep -E '^\s+[0-9]+ (passed|failed|skipped|did not run)' "$HERE/e2e/webkit-$T.log" | tr -s ' ' | tr '\n' ' ')"; stop75 $rc "e2e $T"
      done;;
  esac
  say "PHASE-D-$P-DONE"
done
say "CHAIN-D-DONE $*"
