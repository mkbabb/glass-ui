#!/bin/bash
# Critic 2, after chain1: the Select probe on v11.0.1 and the tip in both engines, then the
# dock edge's load cell on the WebKit build the repo's Playwright resolves (2311).
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2
C=$W/docs/release-11.0.2/critic-2; L=$C/logs; S=$C/scripts; O=$L/chain.out
G=~/.claude/guard/guarded
say() { echo "$(date +%H:%M:%S) $*" >> $O; }
until grep -q done1 $O; do sleep 30; done
mkdir -p $W/.cache/red-v11.0.1/tree/docs/release-11.0.2/o212 && cp -R $W/docs/release-11.0.2/o212/harness $W/.cache/red-v11.0.1/tree/docs/release-11.0.2/o212/
for t in v1101 tip; do
  $G --timeout 25 -- $S/select-probe.sh $t chromium > $L/select-$t-chromium.log 2>&1; rc=$?; say "select-$t-chromium rc=$rc"
  $G --exclusive webkit --timeout 25 -- $S/select-probe.sh $t webkit > $L/select-$t-webkit.log 2>&1; rc=$?; say "select-$t-webkit rc=$rc"
done
for t in v1101 tip; do
  case $t in tip) D=$W; P=5341;; v1101) D=$W/.cache/red-v11.0.1/tree; P=5342;; esac
  cd "$D" && GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/edge-2311-$t.json \
    $G --exclusive webkit --timeout 15 -- npx playwright test -c tests-visual/release-11-0-2.config.ts release-11-0-2.spec.ts --project=webkit-2311 --workers=1 -g "edge · a GlassDock page" > $L/edge-2311-$t.log 2>&1; rc=$?
  say "edge-2311-$t rc=$rc $(grep -E '^\s+[0-9]+ (passed|failed|skipped)' $L/edge-2311-$t.log | tr -s ' ' | tr '\n' ' ')"
done
say done2
