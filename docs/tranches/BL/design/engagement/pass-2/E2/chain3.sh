#!/bin/zsh
# P-E2 third stage: the CK-25 owner-glance capture. veil: every class exemplar; noveil: the held class (the slider), the one the Q-3 split changes.
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-2/E2
cd $D
ENGINES=webkit zsh run-e2.sh cap-veil
ENGINES=webkit CAPARGS="--scenes slider" zsh run-e2.sh cap-noveil
echo "chain3 done $(date '+%F %T')"
