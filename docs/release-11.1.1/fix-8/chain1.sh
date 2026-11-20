#!/bin/bash
# Fix seat 8: the witness, one guarded Playwright process per tree and project (fix-7/run.sh;
# reports and logs in fix-7/logs, named f8-*): the three CommandDialog routes cells on the tip
# snapshot (02dd6a7cb) and on v11.1.0 with the branch's specs, Chromium 390 and 1440, WebKit
# 1440 and 390 (WebKit 390 skips the outside press).
D7=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/fix-7
L=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/fix-8/logs
echo "CHAIN1-START $(date +%T) load $(sysctl -n vm.loadavg)" >> $L/runs.out
C="routes · a CommandDialog keeps its list through its exit"
for p in chromium-phone chromium-desktop webkit-desktop webkit-phone; do
    $D7/run.sh tip $p f8-w-tip-$p "$C"
    $D7/run.sh red $p f8-w-red-$p "$C"
done
echo "CHAIN1-DONE $(date +%T) load $(sysctl -n vm.loadavg)" >> $L/runs.out
