#!/usr/bin/env bash
# g14.sh <tree> <tag> <port> <engine: chromium|webkit|both> [spec-filter ...]: G-14 for MEASURE-4,
# the release specs of the shipped line (10.1.1 to 10.1.5, 11.0.1) on one tree, Chromium
# (headless-new and coarse-touch) and WebKit 2287, one guarded run at a time, --workers=1.
# With no filter it runs the six specs whole; a filter (spec.ts:line ...) runs those sites.
# Logs: logs/m4-g14-<tag>-*.log.
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; L="$H/../logs"; G=~/.claude/guard/guarded
T="$1"; TAG="$2"; PORT="$3"; ENG="$4"; shift 4
ALL="release-10-1-1.spec.ts release-10-1-2.spec.ts release-10-1-3.spec.ts release-10-1-4.spec.ts release-10-1-5.spec.ts release-11-0-1.spec.ts"
F="${*:-$ALL}"
step() { echo "== $(date '+%H:%M:%S') $1 (load $(sysctl -n vm.loadavg))" >> "$L/m4-g14.log"; }
if [ "$ENG" != webkit ]; then
step "$TAG chromium"; (cd "$T" && GLASS_UI_DEMO_PORT=$PORT PI_REPORT="$L/m4-g14-$TAG-chromium.json" $G --timeout 80 -- npx playwright test -c tests-visual/playwright.config.ts $F --project=chromium-headless-new --project=coarse-touch --workers=1 --reporter=list > "$L/m4-g14-$TAG-chromium.log" 2>&1; echo "rc=$?" >> "$L/m4-g14-$TAG-chromium.log")
fi
if [ "$ENG" != chromium ]; then
A=""; B=""
for f in $F; do case "$f" in release-10-1-1*|release-10-1-2*) A="$A $f";; *) B="$B $f";; esac; done
if [ -n "$A" ]; then step "$TAG webkit a"; (cd "$T" && GLASS_UI_DEMO_PORT=$PORT PI_REPORT="$L/m4-g14-$TAG-webkit-a.json" $G --exclusive webkit --timeout 60 -- npx playwright test -c tests-visual/webkit-2287.config.ts $A --project=webkit --workers=1 --reporter=list > "$L/m4-g14-$TAG-webkit-a.log" 2>&1; echo "rc=$?" >> "$L/m4-g14-$TAG-webkit-a.log"); fi
if [ -n "$B" ]; then step "$TAG webkit b"; (cd "$T" && GLASS_UI_DEMO_PORT=$PORT PI_REPORT="$L/m4-g14-$TAG-webkit-b.json" $G --exclusive webkit --timeout 60 -- npx playwright test -c tests-visual/release-11-0-1.config.ts $B --project=webkit --workers=1 --reporter=list > "$L/m4-g14-$TAG-webkit-b.log" 2>&1; echo "rc=$?" >> "$L/m4-g14-$TAG-webkit-b.log"); fi
fi
step "$TAG done"
