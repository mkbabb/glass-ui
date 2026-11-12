#!/bin/zsh
# Carry critic: the RED arm of (c). The O-101a reversal (390->1440) cell, six repeats, on a
# git-archive tree of bc30490cc (the tip before the carry) under .cache/carry-pre, in
# Chromium, coarse-touch and WebKit 2287; the tree is deleted after. Runs after gates-2.
set -u
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.1
R=$WT/docs/release-11.0.1/critic-carry/runs
L=$WT/docs/release-11.0.1/critic-carry/logs
G=~/.claude/guard/guarded
T=$WT/.cache/carry-pre
until grep -q "^done" $L/gates-2.txt 2>/dev/null; do sleep 30; done
# The tip's WebKit arm of (b) and (c) first: the queue's wk-1 matched no test (the 11.0.1
# WebKit configs leave release-10-1-2.spec.ts out; carry-chain.sh now uses the 2287 base).
$G --exclusive webkit --timeout 40 -- zsh $WT/docs/release-11.0.1/scripts/carry-chain.sh wk r2 rev6 > $R/chain-wk-1b.guard.log 2>&1; echo "wk-1b guard exit $?" >> $R/runs.txt
mkdir -p $T && git -C $WT archive bc30490cc -- . ':!docs' | tar -x -C $T && ln -s /Users/mkbabb/Programming/glass-ui/node_modules $T/node_modules
cd $T
GREP='O-101a · a host change during the morph · reversal \(390->1440\)'
row() { echo "$(date +%H:%M) $1 rc=$2 tree=bc30490cc load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $R/$1.log | tr -s ' ' | tr '\n' ' ') $(sed 's/\x1b\[[0-9;]*m//g' $R/$1.log | grep -E 'Error: morphing' | sort | uniq -c | tr -s ' ' | tr '\n' ';')" >> $R/runs.txt; }
export GLASS_UI_DEMO_PORT=5433 GLASS_UI_DEMO_URL=http://localhost:5433
$G --timeout 20 -- npx playwright test -c tests-visual/playwright.config.ts --project=chromium-headless-new release-10-1-2.spec.ts --grep "$GREP" --repeat-each=6 --workers=1 > $R/pre-rev6-ch.log 2>&1; row pre-rev6-ch $?
$G --timeout 20 -- npx playwright test -c tests-visual/playwright.config.ts --project=coarse-touch release-10-1-2.spec.ts --grep "$GREP" --repeat-each=6 --workers=1 > $R/pre-rev6-co.log 2>&1; row pre-rev6-co $?
export GLASS_UI_DEMO_PORT=5434 GLASS_UI_DEMO_URL=http://localhost:5434
$G --exclusive webkit --timeout 20 -- npx playwright test -c tests-visual/webkit-2287.config.ts --project=webkit release-10-1-2.spec.ts --grep "$GREP" --repeat-each=6 --workers=1 > $R/pre-rev6-wk.log 2>&1; row pre-rev6-wk $?
cd $WT
rm -rf $T
echo "pre done" >> $R/runs.txt
