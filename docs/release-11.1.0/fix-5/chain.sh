#!/usr/bin/env bash
# Fix 5 chain, one guarded run at a time: the witness on the pre-fix tree and v11.0.0 in
# Chromium, then on all three trees in WebKit 2287 (--exclusive webkit); lane L1's witness
# on the branch in both engines; the committed-tree gates as one heavy run; the dock e2e
# specs the cure touches on the branch and v11.0.0 in both engines.
#   STAGES="witness l1 gates e2e" bash chain.sh
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
ROOT=$(cd "$HERE/../../.." && pwd)
PRE=$ROOT/.cache/f5-pre
RED=$ROOT/.cache/c1-v1100
G=~/.claude/guard/guarded
LOG=$HERE/chain.log
STAGES=${STAGES:-"witness l1 gates e2e"}
say() { echo "$(date +%T) $*" >> "$LOG"; }
has() { case " $STAGES " in *" $1 "*) return 0;; esac; return 1; }
cd "$ROOT"
say "disk $(df -h /System/Volumes/Data | tail -1 | awk '{print $4}') free; HEAD $(git rev-parse --short HEAD); stages: $STAGES"
if has witness; then
  $G --timeout 40 -- bash "$HERE/witness/run.sh" chromium 8791 pre=$PRE v1100=$RED >> "$LOG" 2>&1; say "witness chromium pre+v1100 guarded exit $?"
  $G --exclusive webkit --timeout 60 -- bash "$HERE/witness/run.sh" webkit 8792 green=$ROOT pre=$PRE v1100=$RED >> "$LOG" 2>&1; say "witness webkit green+pre+v1100 guarded exit $?"
fi
if has l1; then
  mkdir -p "$HERE/l1/out"
  $G --timeout 30 -- bash "$HERE/l1/runprobe.sh" "$ROOT" 8793 chromium fix5 > "$HERE/l1/out/fix5-chromium.log" 2>&1; say "lane L1 witness chromium branch guarded exit $?"
  $G --exclusive webkit --timeout 30 -- bash "$HERE/l1/runprobe.sh" "$ROOT" 8794 webkit fix5 > "$HERE/l1/out/fix5-webkit.log" 2>&1; say "lane L1 witness webkit branch guarded exit $?"
fi
if has gates; then
  mkdir -p "$HERE/gates"
  say "gates on committed tree $(git rev-parse --short HEAD), dirty src: $(git status --short -- src package.json tests | wc -l | tr -d ' ')"
  $G --timeout 80 -- bash -c '
    D='"$HERE/gates"'
    run() { local n=$1; shift; "$@" > "$D/$n.log" 2>&1; local rc=$?; echo "$(date +%T) $n exit $rc" >> "$D/chain.log"; }
    run build npm run build
    run typecheck npm run typecheck
    run demo-dist-build npm run demo:dist:build
    run vitest npx vitest run --maxWorkers=2
    run verify-package npm run verify:package'
  say "gates guarded exit $?: $(tr '\n' ';' < "$HERE/gates/chain.log")"
fi
if has e2e; then
  mkdir -p "$HERE/e2e"
  export C3_SPECS="nav-dock-fix.spec.ts liquid-hover.spec.ts dock-plate-clearance.spec.ts register-ios.spec.ts dock-morph-family.spec.ts"
  for T in branch v1100; do
    TREE=$([ $T = branch ] && echo "$ROOT" || echo "$RED")
    ( cd "$TREE" && PI_REPORT=$HERE/e2e/chromium-$T.json GLASS_UI_DEMO_PORT=8881 $G --timeout 45 -- \
      npx playwright test -c tests-visual/playwright.config.ts --project=chromium-headless-new --workers=1 $C3_SPECS ) > "$HERE/e2e/chromium-$T.log" 2>&1
    say "e2e chromium $T exit $?"
    ( cd "$ROOT" && F2_ROOT=$TREE PI_REPORT=$HERE/e2e/webkit-$T.json GLASS_UI_DEMO_PORT=8882 $G --exclusive webkit --timeout 60 -- \
      npx playwright test -c docs/release-11.1.0/critic-4/e2e-webkit.config.ts --workers=1 ) > "$HERE/e2e/webkit-$T.log" 2>&1
    say "e2e webkit $T exit $?"
  done
fi
say "CHAIN-DONE"
