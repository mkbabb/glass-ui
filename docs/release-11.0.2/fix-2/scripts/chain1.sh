#!/bin/bash
# Fix seat 2: the new and restated cells in Chromium and coarse-touch on the tip, v11.0.1
# and the pre-fix tip (ff51cdea3), one guarded run at a time.
S=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2/docs/release-11.0.2/fix-2/scripts
export GREP="slider · |edge · a host|blob · through|transition · |fold · a "
$S/pw.sh tip c1-tip-chco chco playwright.config.ts 40 release-11-0-2.spec.ts
$S/pw.sh v1101 c1-v1101-chco chco playwright.config.ts 40 release-11-0-2.spec.ts
$S/pw.sh ff51 c1-ff51-chco chco playwright.config.ts 40 release-11-0-2.spec.ts
echo done1 >> /Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2/docs/release-11.0.2/fix-2/logs/chain.out
