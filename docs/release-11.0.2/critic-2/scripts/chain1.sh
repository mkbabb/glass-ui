#!/bin/bash
# Critic 2, the whole reading in order, one guarded run at a time: the five release gates on
# the committed tip, the unit witnesses on both trees, the 11.0.2 cells on v11.0.1 and the
# tip (Chromium, coarse-touch, WebKit 2287), then the older release specs on the tip.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2
C=$W/docs/release-11.0.2/critic-2; L=$C/logs; S=$C/scripts; O=$L/chain.out
G=~/.claude/guard/guarded
R=$W/.cache/red-v11.0.1/tree
say() { echo "$(date +%H:%M:%S) $*" >> $O; }
cd $W
say "chain1 at $(git rev-parse --short HEAD); dirty: $(git status --porcelain -- src tests tests-visual package.json .bundle-ratchet CHANGELOG.md | wc -l | tr -d ' ')"
$G --light --timeout 15 -- npm run typecheck > $L/typecheck.log 2>&1; rc=$?; say "typecheck rc=$rc"
$G --timeout 20 -- npm run build > $L/build.log 2>&1; rc=$?; say "build rc=$rc"
$G --light --timeout 10 -- npm run verify:package > $L/verify-package.log 2>&1; rc=$?; say "verify:package rc=$rc"
$G --timeout 20 -- npm run demo:dist:build > $L/demo-dist-build.log 2>&1; rc=$?; say "demo:dist:build rc=$rc"
$G --timeout 30 -- npx vitest run --maxWorkers=2 > $L/vitest.log 2>&1; rc=$?; say "vitest rc=$rc"
UNITS="tests/composables/dark/useGlobalDark.test.ts tests/components/custom/blob/blob-breath.test.ts tests/components/custom/dock/dockMorphMeasure.test.ts tests/components/custom/dock/g-dock-lattice.test.ts tests/components/pager-dots/worm-dot-px.test.ts tests/components/slider.size-tokens.test.ts tests/styles/slider-thumb-bg.test.ts tests/components/select/open-input.test.ts tests/styles/overlay-plate-inline-bound.test.ts"
for p in $UNITS; do mkdir -p "$(dirname $R/$p)"; cp $W/$p $R/$p; done
cd $R && $G --light --timeout 15 -- npx vitest run --maxWorkers=2 $UNITS > $L/units-v1101.log 2>&1; rc=$?; say "units-v1101 rc=$rc"
cd $W && $G --light --timeout 15 -- npx vitest run --maxWorkers=2 $UNITS > $L/units-tip.log 2>&1; rc=$?; say "units-tip rc=$rc"
$S/pw.sh v1101 v1101-chco chco playwright.config.ts 45 release-11-0-2.spec.ts slider-forced-colors.spec.ts
$S/pw.sh tip tip-chco chco playwright.config.ts 45 release-11-0-2.spec.ts slider-forced-colors.spec.ts
$S/pw.sh v1101 v1101-wk wk release-11-0-2.config.ts 45 release-11-0-2.spec.ts slider-forced-colors.spec.ts
$S/pw.sh tip tip-wk-a wk release-11-0-2.config.ts 60 release-11-0-2.spec.ts slider-forced-colors.spec.ts release-10-1-2.spec.ts release-10-1-5.spec.ts
$S/pw.sh tip tip-wk-b wk release-11-0-1-critic-2.config.ts 45 release-11-0-1.spec.ts release-11-0-1-daraksha.spec.ts release-11-0-1-critic-1.spec.ts release-11-0-1-critic-1b.spec.ts release-11-0-1-fix-2.spec.ts release-11-0-1-critic-2.spec.ts release-10-1-3.spec.ts release-10-1-4.spec.ts
$S/pw.sh tip tip-ch ch playwright.config.ts 75 release-10-1-2.spec.ts release-10-1-3.spec.ts release-10-1-4.spec.ts release-10-1-5.spec.ts release-11-0-1.spec.ts release-11-0-1-daraksha.spec.ts release-11-0-1-critic-1.spec.ts release-11-0-1-critic-1b.spec.ts release-11-0-1-fix-2.spec.ts release-11-0-1-critic-2.spec.ts
say done1
