#!/bin/bash
# Fix seat 2: the restated fold cells on the three trees in all three projects, and the
# critic-2 `v light-1440f` cell that failed once in the WebKit sweep, again on the tip and
# on ff51cdea3.
S=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2/docs/release-11.0.2/fix-2/scripts
export GREP="fold · a "
$S/pw.sh tip c5-fold-tip-chco chco playwright.config.ts 30 release-11-0-2.spec.ts
$S/pw.sh tip c5-fold-tip-wk wk release-11-0-2.config.ts 30 release-11-0-2.spec.ts
$S/pw.sh v1101 c5-fold-v1101-chco chco playwright.config.ts 30 release-11-0-2.spec.ts
$S/pw.sh v1101 c5-fold-v1101-wk wk release-11-0-2.config.ts 30 release-11-0-2.spec.ts
$S/pw.sh ff51 c5-fold-ff51-chco chco playwright.config.ts 30 release-11-0-2.spec.ts
$S/pw.sh ff51 c5-fold-ff51-wk wk release-11-0-2.config.ts 30 release-11-0-2.spec.ts
export GREP="v light-1440f"
$S/pw.sh tip c5-v-tip-wk wk release-11-0-1-critic-2.config.ts 20 release-11-0-1-critic-2.spec.ts
$S/pw.sh tip c5-v-tip-wk2 wk release-11-0-1-critic-2.config.ts 20 release-11-0-1-critic-2.spec.ts
$S/pw.sh ff51 c5-v-ff51-wk wk release-11-0-1-critic-2.config.ts 20 release-11-0-1-critic-2.spec.ts
echo done5 >> /Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2/docs/release-11.0.2/fix-2/logs/chain.out
