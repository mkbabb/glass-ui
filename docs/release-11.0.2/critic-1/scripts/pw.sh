#!/bin/bash
# Critic 1: one guarded Playwright call against a tree on its own demo server.
#   pw.sh <tree: tip|v1101> <tag> <engine: ch|co|chco|wk> <config> <timeout-min> <spec files...>
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2
L=$W/docs/release-11.0.2/critic-1/logs
G=~/.claude/guard/guarded
T=$1; TAG=$2; E=$3; CFG=$4; TO=$5; shift 5
case $T in tip) D=$W; P=5341;; v1101) D=$W/.cache/red-v11.0.1/tree; P=5342;; esac
case $E in ch) PR="--project=chromium-headless-new"; X="";; co) PR="--project=coarse-touch"; X="";; chco) PR="--project=chromium-headless-new --project=coarse-touch"; X="";; wk) PR="--project=webkit"; X="--exclusive webkit";; esac
cd "$D" && GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$TAG.json \
  $G $X --timeout $TO -- npx playwright test -c tests-visual/$CFG "$@" $PR --workers=1 > $L/$TAG.log 2>&1; rc=$?
echo "$(date +%H:%M:%S) $TAG exit $rc $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $L/$TAG.log | tr -s ' ' | tr '\n' ' ')" >> $L/chain.out
