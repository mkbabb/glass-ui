#!/bin/bash
# Critic 3, the whole reading in order, one guarded run at a time: the gates on the
# committed tip, the unit witnesses on both trees, the older release specs on the tip in
# Chromium and WebKit 2287, the 11.0.2 cells on the tip and on v11.0.1 (Chromium,
# coarse-touch, WebKit 2287 and 2311), then the Select probe on both trees.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2
C=$W/docs/release-11.0.2/critic-3; L=$C/logs; S=$C/scripts; O=$L/chain.out
G=~/.claude/guard/guarded
R=$W/.cache/red-v11.0.1/tree
say() { echo "$(date +%H:%M:%S) $*" >> $O; }
cd $W
say "chain at $(git rev-parse --short HEAD); dirty: $(git status --porcelain -- src tests tests-visual package.json .bundle-ratchet CHANGELOG.md | wc -l | tr -d ' ')"
$G --light --timeout 15 -- npm run typecheck > $L/typecheck.log 2>&1; say "typecheck rc=$?"
$G --timeout 20 -- npm run build > $L/build.log 2>&1; say "build rc=$?"
$G --timeout 20 -- npm run demo:dist:build > $L/demo-dist-build.log 2>&1; say "demo:dist:build rc=$?"
CI=true $G --timeout 40 -- npx vitest run --maxWorkers=2 > $L/vitest.log 2>&1; say "vitest (CI=true) rc=$? $(grep -E '^\s+(Test Files|Tests) ' $L/vitest.log | tr -s ' ' | tr '\n' ' ')"
$G --timeout 15 -- npm run test:browser > $L/test-browser.log 2>&1; say "test:browser rc=$? $(grep -E '^\s+(Test Files|Tests) ' $L/test-browser.log | tr -s ' ' | tr '\n' ' ')"
$G --light --timeout 10 -- npm run verify:package > $L/verify-package.log 2>&1; say "verify:package rc=$?"
say gates-done
UNITS="tests/composables/dark/useGlobalDark.test.ts tests/components/custom/blob/blob-breath.test.ts tests/components/custom/dock/dockMorphMeasure.test.ts tests/components/custom/dock/g-dock-lattice.test.ts tests/components/custom/dock/GlassDock.idle-window.test.ts tests/components/pager-dots/worm-dot-px.test.ts tests/components/ui/slider/Slider.loupe.test.ts tests/styles/slider-thumb-bg.test.ts tests/components/select/open-input.test.ts tests/styles/overlay-plate-inline-bound.test.ts"
for p in $UNITS; do mkdir -p "$(dirname $R/$p)"; cp $W/$p $R/$p; done
cp $W/tests/components/slider.size-tokens.browser.test.ts $R/tests/components/slider.size-tokens.test.ts
cd $R && $G --timeout 15 -- npx vitest run --maxWorkers=2 $UNITS tests/components/slider.size-tokens.test.ts > $L/units-v1101.log 2>&1; say "units-v1101 rc=$? $(grep -E '^\s+(Test Files|Tests) ' $L/units-v1101.log | tr -s ' ' | tr '\n' ' ')"
cd $W && $G --light --timeout 15 -- npx vitest run --maxWorkers=2 $UNITS > $L/units-tip.log 2>&1; say "units-tip rc=$? $(grep -E '^\s+(Test Files|Tests) ' $L/units-tip.log | tr -s ' ' | tr '\n' ' ')"
OLD="release-10-1-2.spec.ts release-10-1-3.spec.ts release-10-1-4.spec.ts release-10-1-5.spec.ts release-11-0-1.spec.ts release-11-0-1-daraksha.spec.ts release-11-0-1-critic-1.spec.ts release-11-0-1-critic-1b.spec.ts release-11-0-1-fix-2.spec.ts release-11-0-1-critic-2.spec.ts"
$S/pw.sh tip tip-ch ch playwright.config.ts 75 $OLD
$S/pw.sh tip tip-wk-a wkw3 release-11-0-2.config.ts 75 release-11-0-2.spec.ts slider-forced-colors.spec.ts release-10-1-2.spec.ts release-10-1-5.spec.ts
$S/pw.sh tip tip-wk-b wk release-11-0-1-critic-2.config.ts 60 release-11-0-1.spec.ts release-11-0-1-daraksha.spec.ts release-11-0-1-critic-1.spec.ts release-11-0-1-critic-1b.spec.ts release-11-0-1-fix-2.spec.ts release-11-0-1-critic-2.spec.ts release-10-1-3.spec.ts release-10-1-4.spec.ts
$S/pw.sh tip tip-chco chco playwright.config.ts 45 release-11-0-2.spec.ts slider-forced-colors.spec.ts
$S/pw.sh v1101 v1101-chco chco playwright.config.ts 45 release-11-0-2.spec.ts slider-forced-colors.spec.ts
$S/pw.sh v1101 v1101-wk wkw3 release-11-0-2.config.ts 60 release-11-0-2.spec.ts slider-forced-colors.spec.ts
say sweeps-done
mkdir -p $R/docs/release-11.0.2/o212 && cp -R $W/docs/release-11.0.2/o212/harness $R/docs/release-11.0.2/o212/
for t in v1101 tip; do
  $G --timeout 25 -- $S/select-probe.sh $t chromium > $L/select-$t-chromium.log 2>&1; say "select-$t-chromium rc=$?"
  $G --exclusive webkit --timeout 25 -- $S/select-probe.sh $t webkit > $L/select-$t-webkit.log 2>&1; say "select-$t-webkit rc=$?"
done
say done
