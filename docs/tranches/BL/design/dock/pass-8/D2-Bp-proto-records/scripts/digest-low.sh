#!/bin/bash
# digest-low.sh (D2 pass 8, B′ prototype): the 38 rows with the Playwright WebKit columns read at low load. A records view
# is assembled under out/ (symlinks only, outside the checkout): Chromium from battery/ (the battery of record), WebKit
# main/rest/dark/darkrest from battery-low/ (chain6, load <= 31 at start), WebKit fmlow-* from battery/; F7 from F7-low/.
# Writes digest/*-p8bp-low[-ruled]* beside the battery digest. Pure node, no browser.
set -u
G=/Users/mkbabb/Programming/glass-ui; OUT=$G/.claude/worktrees/bl/D2/p8/Bp-proto/out; D=$G/docs/tranches/BL/design/dock
R=$D/pass-8/D2-Bp-proto-records; V=$OUT/low-view; rm -rf $V; mkdir -p $V/battery/json/bp8-webkit
ln -s $R/battery/json/bp8-chromium $V/battery/json/bp8-chromium
for s in main rest dark darkrest; do [ -d $R/battery-low/json/bp8-webkit/$s ] && ln -s $R/battery-low/json/bp8-webkit/$s $V/battery/json/bp8-webkit/$s; done
for s in fmlow-light fmlow-dark; do ln -s $R/battery/json/bp8-webkit/$s $V/battery/json/bp8-webkit/$s; done
for x in "" --ruled; do ~/.claude/guard/guarded --light --timeout 5 -- node $D/harness/cells.mjs --build bp8=$V --f7 bp8=$R/F7-low/F7.json --pr bp8=$R/PR-bp/PR.json --out $R/digest --tag p8bp-low $x | tail -2; done
