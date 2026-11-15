#!/bin/bash
# Fix seat 2: the new cells again on the tip in Chromium and coarse-touch (after the morph
# transition cure), then in Playwright WebKit 2287 on the tip, v11.0.1 and ff51cdea3.
S=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2/docs/release-11.0.2/fix-2/scripts
export GREP="slider · |edge · a host|blob · through|transition · |fold · a "
$S/pw.sh tip c2-tip-chco chco playwright.config.ts 40 release-11-0-2.spec.ts
$S/pw.sh tip c2-tip-wk wk release-11-0-2.config.ts 40 release-11-0-2.spec.ts
$S/pw.sh v1101 c2-v1101-wk wk release-11-0-2.config.ts 40 release-11-0-2.spec.ts
$S/pw.sh ff51 c2-ff51-wk wk release-11-0-2.config.ts 40 release-11-0-2.spec.ts
echo done2 >> /Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2/docs/release-11.0.2/fix-2/logs/chain.out
