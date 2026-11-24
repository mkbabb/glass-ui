#!/bin/bash
# Critic 13 extra readings: the typed-then-pick palette probe on the demo's Command page.
D=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/critic-13
echo "$(date +%T) extra start" >> $D/logs/runs.out
bash $D/probe-cmd/run-typed.sh tip chromium-desktop typed-tip-cd
bash $D/probe-cmd/run-typed.sh red chromium-desktop typed-red-cd
bash $D/probe-cmd/run-typed.sh pre chromium-desktop typed-pre-cd
bash $D/probe-cmd/run-typed.sh tip chromium-phone typed-tip-cp
echo "$(date +%T) extra done" >> $D/logs/runs.out
