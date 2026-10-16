#!/bin/zsh
# C-E2 queue 1: the full battery on the veil build, Chromium then WebKit (serial).
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-2/C-E2
$D/run-ce2.sh veil full chromium
$D/run-ce2.sh veil full webkit
echo "queue1 done $(date '+%F %T')"
