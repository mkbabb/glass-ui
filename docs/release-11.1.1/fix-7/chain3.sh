#!/bin/bash
# The disclosure guard cell, ten repeats in WebKit 390 on the tip snapshot and on v11.1.0,
# interleaved by tree; then Chromium 390 on both.
D=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/fix-7
echo "CHAIN3-START $(date +%T)" >> $D/logs/runs.out
G="reverse · a disclosure reopened while it closes"
$D/run.sh tip webkit-phone g-tip-webkit-phone "$G" --repeat-each=10
$D/run.sh red webkit-phone g-red-webkit-phone "$G" --repeat-each=10
$D/run.sh tip chromium-phone g-tip-chromium-phone "$G" --repeat-each=10
$D/run.sh red chromium-phone g-red-chromium-phone "$G" --repeat-each=10
echo "CHAIN3-DONE $(date +%T)" >> $D/logs/runs.out
