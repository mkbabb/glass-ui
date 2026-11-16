#!/usr/bin/env bash
# Fix 7: the 11.0.1 release specs on the merged branch (orchestrator-note-merge-master.md),
# one Playwright process per step inside ONE guarded call (WebKit 2287 under
# --exclusive webkit, by the caller). From 11.0.1's carry chain.
#   release.sh <ch|wk> step...   steps: r2 partA partB g6-4 g6-3 owner fix2 c2
set -u
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.0
L=$WT/docs/release-11.1.0/critic-7/release
mkdir -p "$L"
E=$1; shift
cd "$WT"
case $E in
  wk) CFG=(-c tests-visual/release-11-0-1-critic-2.config.ts --project=webkit); R2=(-c tests-visual/webkit-2287.config.ts --project=webkit); export GLASS_UI_DEMO_PORT=5492;;
  *)  CFG=(-c tests-visual/playwright.config.ts --project=chromium-headless-new); R2=("${CFG[@]}"); export GLASS_UI_DEMO_PORT=5491;;
esac
export GLASS_UI_DEMO_URL=http://localhost:$GLASS_UI_DEMO_PORT
HALF='(^| )(n1|p[12]|q[123]|r1|s[1-4]|t1|u1) '
note() { echo "$(date +%H:%M) $1 rc=$2 head=$(git rev-parse --short HEAD) load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' "$L/$1.log" 2>/dev/null | tr -s ' ' | tr '\n' ' ')" >> "$L/runs.txt"; }
one() {
  local n=$1 tag=$1-$E rc
  case $n in
    r2) PI_REPORT=$L/$tag.json npx playwright test "${R2[@]}" release-10-1-2.spec.ts --workers=1 > "$L/$tag.log" 2>&1; rc=$?;;
    partA) PI_REPORT=$L/$tag.json npx playwright test "${CFG[@]}" release-10-1-5.spec.ts --grep-invert "$HALF" --workers=1 > "$L/$tag.log" 2>&1; rc=$?;;
    partB) PI_REPORT=$L/$tag.json npx playwright test "${CFG[@]}" release-10-1-5.spec.ts --grep "$HALF" --workers=1 > "$L/$tag.log" 2>&1; rc=$?;;
    g6-4) PI_REPORT=$L/$tag.json npx playwright test "${CFG[@]}" release-10-1-4.spec.ts --workers=1 > "$L/$tag.log" 2>&1; rc=$?;;
    g6-3) PI_REPORT=$L/$tag.json npx playwright test "${CFG[@]}" release-10-1-3.spec.ts --workers=1 > "$L/$tag.log" 2>&1; rc=$?;;
    owner) OWNER_OUT=$L/owner-$E PI_REPORT=$L/$tag.json npx playwright test "${CFG[@]}" release-11-0-1.spec.ts --workers=1 > "$L/$tag.log" 2>&1; rc=$?;;
    fix2) FIX2_OUT=$L/fix2-$E PI_REPORT=$L/$tag.json npx playwright test "${CFG[@]}" release-11-0-1-fix-2.spec.ts --workers=1 > "$L/$tag.log" 2>&1; rc=$?;;
    c2) CRITIC_OUT=$L/c2-shots PI_REPORT=$L/$tag.json npx playwright test "${CFG[@]}" release-11-0-1-critic-2.spec.ts --workers=1 > "$L/$tag.log" 2>&1; rc=$?;;
  esac
  note "$tag" $rc
}
for s in "$@"; do one "$s"; done
echo "$(date +%H:%M) chain $E done: $*" >> "$L/runs.txt"
