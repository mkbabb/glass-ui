#!/usr/bin/env bash
# Critic 10: probe11 in WebKit, the pre-fix tree beside the tip, at rest.  sheets-p11.sh <kind-width-theme>
cd "$(dirname "$0")"; P=probe11/out/png; F=""
for s in zoom125 zoom080 scale grow dialog; do F="$F $P/pre-webkit-$s-$1-rest.png $P/green-webkit-$s-$1-rest.png"; done
node sheet.mjs sheets/p11-webkit-$1-rest.png 2 $F
