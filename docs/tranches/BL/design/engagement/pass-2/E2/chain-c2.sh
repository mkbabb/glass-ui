#!/bin/zsh
# P-E2 Chromium stage run while chain2 queues for the machine-wide WebKit lock (one run at a time inside it).
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-2/E2
cd $D
ENGINES=chromium ONLY=E-3,E-7,E-10,E-11 TAG=-c2 zsh run-e2.sh bat-noveil
ENGINES=chromium TAG=-c2 zsh run-e2.sh probe-noveil
ENGINES=chromium zsh run-e2.sh cap-veil
ENGINES=chromium CAPARGS="--scenes slider" zsh run-e2.sh cap-noveil
echo "chain-c2 done $(date '+%F %T')"
