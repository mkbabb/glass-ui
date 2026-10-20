#!/bin/zsh
# the WebKit phases in order, each its own `guarded --exclusive webkit` acquisition (<= 90 min by the machine law)
H5=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-5/H5
ps=($@); (( $#ps )) || ps=(wa1 wa2 wa3 wb wb2 wc wd)
for p in $ps; do zsh $H5/chain.sh $H5/phase-$p.txt webkit; done
