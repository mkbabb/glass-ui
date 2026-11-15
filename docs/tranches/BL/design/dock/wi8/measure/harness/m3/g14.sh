#!/usr/bin/env bash
# g14.sh <tree> <tag> <port>: G-14, the release specs of the shipped line (10.1.1 to 10.1.5,
# 11.0.1) on one tree: Chromium (headless-new and coarse-touch) and WebKit 2287, one guarded run
# at a time, --workers=1. The tree is the worktree (the build) or .base-master (the master
# snapshot at the merge base). Logs: logs/m3-g14-<tag>-*.log, reports *.json.
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; L="$H/../logs"; G=~/.claude/guard/guarded
T="$1"; TAG="$2"; PORT="$3"
step() { echo "== $(date '+%H:%M:%S') $1 (load $(sysctl -n vm.loadavg))" >> "$L/m3-g14.log"; }
step "$TAG chromium"; (cd "$T" && GLASS_UI_DEMO_PORT=$PORT PI_REPORT="$L/m3-g14-$TAG-chromium.json" $G --timeout 75 -- npx playwright test -c tests-visual/playwright.config.ts release-10-1-1.spec.ts release-10-1-2.spec.ts release-10-1-3.spec.ts release-10-1-4.spec.ts release-10-1-5.spec.ts release-11-0-1.spec.ts --project=chromium-headless-new --project=coarse-touch --workers=1 --reporter=list > "$L/m3-g14-$TAG-chromium.log" 2>&1; echo "rc=$?" >> "$L/m3-g14-$TAG-chromium.log")
step "$TAG webkit a"; (cd "$T" && GLASS_UI_DEMO_PORT=$PORT PI_REPORT="$L/m3-g14-$TAG-webkit-a.json" $G --exclusive webkit --timeout 60 -- npx playwright test -c tests-visual/webkit-2287.config.ts release-10-1-1.spec.ts release-10-1-2.spec.ts --project=webkit --workers=1 --reporter=list > "$L/m3-g14-$TAG-webkit-a.log" 2>&1; echo "rc=$?" >> "$L/m3-g14-$TAG-webkit-a.log")
step "$TAG webkit b"; (cd "$T" && GLASS_UI_DEMO_PORT=$PORT PI_REPORT="$L/m3-g14-$TAG-webkit-b.json" $G --exclusive webkit --timeout 60 -- npx playwright test -c tests-visual/release-11-0-1.config.ts release-10-1-3.spec.ts release-10-1-4.spec.ts release-10-1-5.spec.ts release-11-0-1.spec.ts --project=webkit --workers=1 --reporter=list > "$L/m3-g14-$TAG-webkit-b.log" 2>&1; echo "rc=$?" >> "$L/m3-g14-$TAG-webkit-b.log")
step "$TAG done"
