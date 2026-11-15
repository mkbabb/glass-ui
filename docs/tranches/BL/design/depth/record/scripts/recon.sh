#!/bin/sh
# Recon: one guarded run per site, wide mode only. usage: sh recon.sh <list> <frameDir>
set -u
while read -r n u; do
  [ -z "$n" ] && continue
  ~/.claude/guard/guarded --timeout 6 -- node scan.mjs chromium ../data/recon-$n.json "$2" $n "$u" --modes=wide --steps=24 --wait=4500 --gate=1 2>&1 | grep -E '^ok|ERR|REFUS|refus' | cut -c1-400
done < "$1"
