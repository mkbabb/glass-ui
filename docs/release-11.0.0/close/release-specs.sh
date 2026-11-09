#!/usr/bin/env bash
# 11.0.0 close — the release specs (10.1.3, 10.1.4, the U line's u-b7 and its shape set) in
# headless Chromium and Playwright WebKit 2287, then release.sh's three pixel-floor arms.
# One guarded call per run; every WebKit run under --exclusive webkit.
cd "$(dirname "$0")/../../.."
W=$PWD; D=docs/release-11.0.0/close; O=${1:?out dir}
G=~/.claude/guard/guarded
S=$D/release-summary.txt
dfgate() { local a; a=$(df -g /System/Volumes/Data | awk 'NR==2{print $4}'); [ "$a" -ge 6 ] || { echo "DISK STOP before $1 (${a}G)" >> "$S"; exit 9; }; }
run() { local name=$1 port=$2; shift 2; dfgate "$name"
  PI_REPORT=$O/$name.json GLASS_UI_DEMO_PORT=$port GLASS_UI_DEMO_URL=http://localhost:$port "$@" > "$D/$name.log" 2>&1
  echo "$name exit $? $(date +%T) $(tail -12 "$D/$name.log" | grep -E '^ +[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' | tr -s ' ' | tr '\n' ' ')" >> "$S"
  rm -rf tests-visual/test-results test-results; }
: > "$S"; echo "HEAD $(git rev-parse --short HEAD) $(date +%F' '%T)" >> "$S"
run release-chromium 7991 $G --timeout 40 -- npx playwright test -c tests-visual/playwright.config.ts --project=chromium-headless-new --workers=1 release-10-1-3 release-10-1-4
run u-b7-chromium 7992 $G --timeout 30 -- npx playwright test -c tests-visual/u-b7/playwright.config.ts --project=chromium-desk --project=chromium-coarse --workers=1
run b7-shape-chromium 7993 $G --timeout 30 -- npx playwright test -c tests-visual/b7-shape.config.ts --project=chromium --workers=1
run release-webkit 7994 $G --exclusive webkit --timeout 40 -- npx playwright test -c tests-visual/webkit-2287.config.ts --project=webkit --workers=1 release-10-1-3 release-10-1-4
run u-line-webkit 7995 $G --exclusive webkit --timeout 45 -- npx playwright test -c docs/release-11.0.0/u-line-webkit.config.ts --workers=1
for s in gate:pixel-floor gate:pixel-floor:planted gate:pixel-floor:planted:flood; do
  dfgate "$s"
  GLASS_UI_DEMO_PORT=7996 GLASS_UI_DEMO_URL=http://localhost:7996 $G --timeout 45 -- npm -w tests-visual run $s > "$D/$s.log" 2>&1
  echo "$s exit $? $(date +%T)" >> "$S"
  rm -rf tests-visual/test-results
done
cp tests-visual/.cache/pi-report-green.json tests-visual/.cache/pi-report-planted.json tests-visual/.cache/pi-report-flood.json "$D/" 2>/dev/null
echo DONE >> "$S"
