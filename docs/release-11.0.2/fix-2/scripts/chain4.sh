#!/bin/bash
# Fix seat 2: demo:dist:build and the full vitest on the committed tip, then the tip sweep
# (every release spec, Chromium, coarse-touch and WebKit 2287), one guarded run at a time.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2
L=$W/docs/release-11.0.2/fix-2/logs; O=$L/chain.out; G=~/.claude/guard/guarded; S=$W/docs/release-11.0.2/fix-2/scripts
cd $W
echo "$(date +%H:%M:%S) chain4 at $(git rev-parse --short HEAD)" >> $O
$G --timeout 20 -- npm run demo:dist:build > $L/demo-dist-build.log 2>&1; echo "$(date +%H:%M:%S) demo:dist:build rc=$?" >> $O
$G --timeout 30 -- npx vitest run --maxWorkers=2 > $L/vitest.log 2>&1; echo "$(date +%H:%M:%S) vitest rc=$?" >> $O
unset GREP
$S/pw.sh tip sweep-wk-a wk release-11-0-2.config.ts 60 release-11-0-2.spec.ts slider-forced-colors.spec.ts release-10-1-2.spec.ts release-10-1-5.spec.ts
$S/pw.sh tip sweep-wk-b wk release-11-0-1-critic-2.config.ts 45 release-11-0-1.spec.ts release-11-0-1-daraksha.spec.ts release-11-0-1-critic-1.spec.ts release-11-0-1-critic-1b.spec.ts release-11-0-1-fix-2.spec.ts release-11-0-1-critic-2.spec.ts release-10-1-3.spec.ts release-10-1-4.spec.ts
$S/pw.sh tip sweep-ch ch playwright.config.ts 75 release-11-0-2.spec.ts slider-forced-colors.spec.ts release-10-1-2.spec.ts release-10-1-3.spec.ts release-10-1-4.spec.ts release-10-1-5.spec.ts release-11-0-1.spec.ts release-11-0-1-daraksha.spec.ts release-11-0-1-critic-1.spec.ts release-11-0-1-critic-1b.spec.ts release-11-0-1-fix-2.spec.ts release-11-0-1-critic-2.spec.ts
$S/pw.sh tip sweep-co co playwright.config.ts 75 release-11-0-2.spec.ts slider-forced-colors.spec.ts release-10-1-2.spec.ts release-10-1-3.spec.ts release-10-1-4.spec.ts release-10-1-5.spec.ts release-11-0-1.spec.ts release-11-0-1-daraksha.spec.ts release-11-0-1-critic-1.spec.ts release-11-0-1-critic-1b.spec.ts release-11-0-1-fix-2.spec.ts release-11-0-1-critic-2.spec.ts
echo done4 >> $O
