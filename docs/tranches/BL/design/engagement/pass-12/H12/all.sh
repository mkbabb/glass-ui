#!/bin/zsh
# H12: the Chromium chain (c1.txt), then the one WebKit acquisition (wk-w1.txt). One waiter, one heavy run at a time.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-12/H12
zsh $R/chain.sh c1.txt
zsh $R/wk-queue.sh
echo "# all done $(date '+%F %T')" >> $R/logs/all.log
