#!/bin/zsh
# P-E13-complete: the Chromium list (c1.txt) in named batches (c-queue.sh), then the WebKit named acquisitions (wk-queue.sh). One heavy run at a time.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-13/E13c
echo "# all start $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/all.log
zsh $R/c-queue.sh; rc=$?; echo "# chain exit $rc $(date '+%F %T')" >> $R/logs/all.log
(( rc == 75 )) && { echo "# all stopped on a refusal" >> $R/logs/all.log; exit 75; }
zsh $R/wk-queue.sh; echo "# wk-queue exit $? $(date '+%F %T')" >> $R/logs/all.log
echo "# all done $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/all.log
