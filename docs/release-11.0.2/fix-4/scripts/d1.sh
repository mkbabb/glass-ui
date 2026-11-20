#!/bin/bash
# Fix seat 4, D-1: the `edge ·` cells on the branch before the cure (the five cured source
# files stashed for the run), on the cure, and on v11.0.1, in Chromium, coarse-touch,
# WebKit 2287 and WebKit 2311. One run at a time.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2
S=$W/docs/release-11.0.2/fix-4/scripts/pw.sh
export GREP="edge ·"
SRC="src/styles/tokens/glass.css src/components/dock/styles/dock.css src/components/dock/styles/shell.css src/components/dock/styles/morph.css src/components/dock/styles/adaptive-legibility.css"
cd $W && git stash push -m fix-4-d1 -- $SRC
$S tip d1-pre-chco chco release-11-0-2.config.ts 15 release-11-0-2.spec.ts
$S tip d1-pre-wkw3 wkw3 release-11-0-2.config.ts 20 release-11-0-2.spec.ts
cd $W && git stash pop
$S tip d1-tip-chco chco release-11-0-2.config.ts 15 release-11-0-2.spec.ts
$S tip d1-tip-wkw3 wkw3 release-11-0-2.config.ts 20 release-11-0-2.spec.ts
$S v1101 d1-v1101-chco chco release-11-0-2.config.ts 15 release-11-0-2.spec.ts
$S v1101 d1-v1101-wkw3 wkw3 release-11-0-2.config.ts 20 release-11-0-2.spec.ts
