#!/bin/bash
# Build seat B's O-268 witness and sweep, one guarded run at a time: the fold cell on
# v11.0.1 and the branch, then the branch's whole 11.0.2 spec and the dock specs it
# re-witnesses (release-10-1-2, release-10-1-5, release-11-0-1, release-11-0-1-daraksha)
# in the Chromium projects and WebKit 2287.
S=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2/docs/release-11.0.2/scripts
SPECS="release-11-0-2.spec.ts release-10-1-2.spec.ts release-10-1-5.spec.ts release-11-0-1.spec.ts release-11-0-1-daraksha.spec.ts"
$S/build-B-chromium.sh v1101 o268-v1101-chromium "fold ·"
$S/build-B-chromium.sh branch o268-branch-chromium "fold ·"
$S/build-B-chromium.sh branch sweep-B-branch-chromium "." "$SPECS"
$S/build-B-webkit.sh branch sweep-B-branch-webkit "." "$SPECS"
echo done
