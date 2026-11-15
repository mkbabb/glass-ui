#!/usr/bin/env bash
# One guard slot, Chromium runs in sequence (one browser at a time).
#   ~/.claude/guard/guarded --timeout 90 -- ./batch-chromium.sh <step...>
set -u
cd "$(dirname "$0")"
L=../logs
for S in "$@"; do
  echo "== $S $(date +%T)"
  case $S in
    m390)   node motion.mjs 11.1.0 chromium t4x390 > $L/motion-11.1.0-t4x390.log 2>&1 ;;
    m360)   node motion.mjs 11.1.0 chromium t4x360 > $L/motion-11.1.0-t4x360.log 2>&1 ;;
    mtouch) node motion.mjs 11.1.0 chromium touch390 > $L/motion-11.1.0-touch390.log 2>&1 ;;
    dfine)  node drag.mjs 11.1.0 chromium fine > $L/drag-11.1.0-fine.log 2>&1 ;;
    dtouch) node drag.mjs 11.1.0 chromium touch390 > $L/drag-11.1.0-touch390.log 2>&1 ;;
    d4x)    node drag.mjs 11.1.0 chromium t4x390 > $L/drag-11.1.0-t4x390.log 2>&1 ;;
    stouch) node scroll.mjs 11.1.0 chromium touch390 > $L/scroll-11.1.0-touch390.log 2>&1 ;;
    sfine)  node scroll.mjs 11.1.0 chromium fine > $L/scroll-11.1.0-fine.log 2>&1 ;;
    vp)     node viewport.mjs 11.1.0 chromium > $L/viewport-11.1.0-chromium.log 2>&1 ;;
    sh1440) node shell.mjs 11.1.0 chromium d1440 > $L/shell-11.1.0-d1440.log 2>&1 ;;
    sh390)  node shell.mjs 11.1.0 chromium p390 > $L/shell-11.1.0-p390.log 2>&1 ;;
    sh4x)   node shell.mjs 11.1.0 chromium t4x390 24 > $L/shell-11.1.0-t4x390.log 2>&1 ;;
    o2m)    node motion.mjs 11.0.2 chromium fine > $L/motion-11.0.2-fine.log 2>&1 ;;
    o2m4x)  node motion.mjs 11.0.2 chromium t4x390 > $L/motion-11.0.2-t4x390.log 2>&1 ;;
    o2d)    node drag.mjs 11.0.2 chromium touch390 > $L/drag-11.0.2-touch390.log 2>&1 ;;
    o2df)   node drag.mjs 11.0.2 chromium fine > $L/drag-11.0.2-fine.log 2>&1 ;;
    o2sh)   node shell.mjs 11.0.2 chromium d1440 > $L/shell-11.0.2-d1440.log 2>&1 ;;
    o2vp)   node viewport.mjs 11.0.2 chromium 360x780 844x390 > $L/viewport-11.0.2-chromium.log 2>&1 ;;
    *) echo "unknown step $S" ;;
  esac
  echo "   exit $? $(date +%T)"
done
