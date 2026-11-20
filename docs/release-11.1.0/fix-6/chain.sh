#!/usr/bin/env bash
# Fix 6: every browser run one at a time under guarded, WebKit under --exclusive webkit.
#   chain.sh witness   the witness on the branch, the pre-fix tree and v11.0.0, both engines
set -u
R=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.0
F=$R/docs/release-11.1.0/fix-6
W=$F/witness
G=$HOME/.claude/guard/guarded
log() { echo "$(date '+%F %T') $*" >> "$F/chain.log"; }
run() { # tree label engine port
  local ex=""; [ "$3" = webkit ] && ex="--exclusive webkit"
  log "start witness $2 $3"
  "$G" $ex --timeout 25 -- bash "$W/run.sh" "$1" "$4" "$3" "$2" > "$W/out-$2-$3.txt" 2>&1
  local rc=$?; log "end witness $2 $3 exit $rc: $(tail -1 "$W/out-$2-$3.txt")"
  return 0
}
case "$1" in
witness)
  run "$R" green chromium 5291
  run "$R/.cache/f6-pre" pre chromium 5292
  run "$R/.cache/c1-v1100" v1100 chromium 5293
  run "$R" green webkit 5294
  run "$R/.cache/f6-pre" pre webkit 5295
  run "$R/.cache/c1-v1100" v1100 webkit 5296
  log "witness chain done";;
esac
# Stage 2: lane L1's witness on the branch, the committed-tree gates, the touched e2e specs.
#   chain.sh after
if [ "$1" = after ]; then
  RED=$R/.cache/c1-v1100
  mkdir -p "$F/l1/out" "$F/gates" "$F/e2e"
  log "disk $(df -h /System/Volumes/Data | tail -1 | awk '{print $4}') free; HEAD $(cd $R && git rev-parse --short HEAD)"
  "$G" --timeout 30 -- bash "$F/l1/runprobe.sh" "$R" 5297 chromium fix6 > "$F/l1/out/fix6-chromium.log" 2>&1; log "lane L1 chromium exit $?: $(tail -1 $F/l1/out/fix6-chromium.log)"
  "$G" --exclusive webkit --timeout 30 -- bash "$F/l1/runprobe.sh" "$R" 5298 webkit fix6 > "$F/l1/out/fix6-webkit.log" 2>&1; log "lane L1 webkit exit $?: $(tail -1 $F/l1/out/fix6-webkit.log)"
  log "gates on committed tree $(cd $R && git rev-parse --short HEAD), dirty src: $(cd $R && git status --short -- src package.json tests CHANGELOG.md | wc -l | tr -d ' ')"
  ( cd "$R" && "$G" --timeout 80 -- bash -c '
    D='"$F/gates"'
    run() { local n=$1; shift; "$@" > "$D/$n.log" 2>&1; local rc=$?; echo "$(date +%T) $n exit $rc" >> "$D/chain.log"; }
    run build npm run build
    run typecheck npm run typecheck
    run demo-dist-build npm run demo:dist:build
    run vitest npx vitest run --maxWorkers=2
    run verify-package npm run verify:package' )
  log "gates guarded exit $?: $(tr '\n' ';' < "$F/gates/chain.log")"
  export C3_SPECS="nav-dock-fix.spec.ts liquid-hover.spec.ts dock-plate-clearance.spec.ts register-ios.spec.ts dock-morph-family.spec.ts drag-morph.spec.ts u-b7.spec.ts release-10-1-1.spec.ts"
  for T in branch v1100; do
    TREE=$([ $T = branch ] && echo "$R" || echo "$RED")
    ( cd "$TREE" && PI_REPORT=$F/e2e/chromium-$T.json GLASS_UI_DEMO_PORT=8883 "$G" --timeout 60 -- \
      npx playwright test -c tests-visual/playwright.config.ts --project=chromium-headless-new --workers=1 $C3_SPECS ) > "$F/e2e/chromium-$T.log" 2>&1
    log "e2e chromium $T exit $?"
    ( cd "$R" && F2_ROOT=$TREE PI_REPORT=$F/e2e/webkit-$T.json GLASS_UI_DEMO_PORT=8884 "$G" --exclusive webkit --timeout 75 -- \
      npx playwright test -c docs/release-11.1.0/critic-4/e2e-webkit.config.ts --workers=1 ) > "$F/e2e/webkit-$T.log" 2>&1
    log "e2e webkit $T exit $?"
  done
  log "after chain done"
fi
