#!/bin/bash
# Fix seat 3: the tip sweep, every release spec in Chromium (and coarse-touch for the 11.0.2
# cells) and Playwright WebKit (2287, and 2311 for the 11.0.2 spec), one guarded run at a time.
S=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2/docs/release-11.0.2/fix-3/scripts
O=$S/../logs/chain.out
echo "$(date +%H:%M:%S) sweep at $(git -C $S rev-parse --short HEAD)" >> $O
$S/pw.sh tip sweep-chco chco playwright.config.ts 45 release-11-0-2.spec.ts slider-forced-colors.spec.ts
$S/pw.sh tip sweep-ch ch playwright.config.ts 75 release-10-1-2.spec.ts release-10-1-3.spec.ts release-10-1-4.spec.ts release-10-1-5.spec.ts release-11-0-1.spec.ts release-11-0-1-daraksha.spec.ts release-11-0-1-critic-1.spec.ts release-11-0-1-critic-1b.spec.ts release-11-0-1-fix-2.spec.ts release-11-0-1-critic-2.spec.ts
$S/pw.sh tip sweep-wk-a wkw3 release-11-0-2.config.ts 75 release-11-0-2.spec.ts slider-forced-colors.spec.ts release-10-1-2.spec.ts release-10-1-5.spec.ts
$S/pw.sh tip sweep-wk-b wk release-11-0-1-critic-2.config.ts 60 release-11-0-1.spec.ts release-11-0-1-daraksha.spec.ts release-11-0-1-critic-1.spec.ts release-11-0-1-critic-1b.spec.ts release-11-0-1-fix-2.spec.ts release-11-0-1-critic-2.spec.ts release-10-1-3.spec.ts release-10-1-4.spec.ts
echo "$(date +%H:%M:%S) sweep-done" >> $O
