#!/bin/zsh
# C-A7b: the whole chain, serially: plant builds (already started) → Chromium phase → unit plants → ONE WebKit acquisition
C=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-7/C-A7
until grep -q "builds exit" $C/logs/builds.log; do sleep 20; done
echo "$(date '+%T') builds: $(tail -1 $C/logs/builds.log)"
$C/chain-chromium.sh >> $C/logs/chain-chromium.log 2>&1
echo "$(date '+%T') chromium phase done"
$C/units.sh > $C/logs/units.log 2>&1
echo "$(date '+%T') units done"
$C/all-webkit.sh > $C/logs/all-webkit.log 2>&1
echo "$(date '+%T') webkit phase done: $(tail -1 $C/logs/all-webkit.log)"
