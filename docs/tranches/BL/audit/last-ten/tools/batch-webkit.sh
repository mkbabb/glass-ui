#!/usr/bin/env bash
# Playwright WebKit cells, one browser at a time. Run each step in its own exclusive slot:
#   ~/.claude/guard/guarded --exclusive webkit --timeout 60 -- ./batch-webkit.sh <step>
set -u
cd "$(dirname "$0")"
L=../logs
for S in "$@"; do
  echo "== $S $(date +%T)"
  case $S in
    wm)   node motion.mjs 11.1.0 webkit touch390 select dropdown-menu popover dialog sheet-side sheet-detents accordion collapsible tabs-indicator switch toast carousel pager > $L/motion-11.1.0-webkit-touch390.log 2>&1 ;;
    wmf)  node motion.mjs 11.1.0 webkit fine dock-collapse tooltip > $L/motion-11.1.0-webkit-fine.log 2>&1 ;;
    ws)   node scroll.mjs 11.1.0 webkit fine > $L/scroll-11.1.0-webkit-fine.log 2>&1 ;;
    wvp)  node viewport.mjs 11.1.0 webkit 360x780 844x390 > $L/viewport-11.1.0-webkit.log 2>&1 ;;
    wd)   node drag.mjs 11.1.0 webkit fine > $L/drag-11.1.0-webkit-fine.log 2>&1 ;;
    *) echo "unknown $S" ;;
  esac
  echo "   exit $? $(date +%T)"
done
