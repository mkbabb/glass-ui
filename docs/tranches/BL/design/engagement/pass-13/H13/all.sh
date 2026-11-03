#!/bin/zsh
# H13: the Chromium chain (c1.txt), then the WebKit acquisition(s) (wk-queue.sh). One waiter, one heavy run at a time.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-13/H13
zsh $R/chain.sh c1.txt
zsh $R/wk-queue.sh
echo "# all done $(date '+%F %T')" >> $R/logs/all.log
