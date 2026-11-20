#!/bin/bash
# Critic 3: one guarded Playwright call against a tree on its own demo server.
#   pw.sh <tree: tip|v1101> <tag> <engine: ch|co|chco|wk> <config> <timeout-min> <spec files...>
# GREP (env) narrows to titles. The 11.0.2 spec, config and harnesses are copied onto the
# v11.0.1 tree first, so both trees run the same cells.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2
L=$W/docs/release-11.0.2/critic-3/logs
G=~/.claude/guard/guarded
T=$1; TAG=$2; E=$3; CFG=$4; TO=$5; shift 5
case $T in tip) D=$W; P=5341;; v1101) D=$W/.cache/red-v11.0.1/tree; P=5342;; esac
if [ "$T" != tip ]; then
  cp $W/tests-visual/release-11-0-2.spec.ts $W/tests-visual/release-11-0-2.config.ts $W/tests-visual/slider-forced-colors.spec.ts $D/tests-visual/
  mkdir -p $D/tests-visual/release-11-0-2 $D/tests-visual/slider-forced-colors
  cp $W/tests-visual/release-11-0-2/* $D/tests-visual/release-11-0-2/
  cp $W/tests-visual/slider-forced-colors/* $D/tests-visual/slider-forced-colors/
fi
case $E in ch) PR="--project=chromium-headless-new";; co) PR="--project=coarse-touch";; chco) PR="--project=chromium-headless-new --project=coarse-touch";; wk) PR="--project=webkit";; w3) PR="--project=webkit-2311";; wkw3) PR="--project=webkit --project=webkit-2311";; esac
X=""; [[ $E == w* ]] && X="--exclusive webkit"
GR=(); [ -n "$GREP" ] && GR=(--grep "$GREP")
cd "$D" && GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$TAG.json \
  $G $X --timeout $TO -- npx playwright test -c tests-visual/$CFG "$@" "${GR[@]}" $PR --workers=1 > $L/$TAG.log 2>&1; rc=$?
echo "$(date +%H:%M:%S) $TAG rc=$rc $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $L/$TAG.log | tr -s ' ' | tr '\n' ' ')" >> $L/chain.out
