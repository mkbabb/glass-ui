#!/bin/bash
# Fix seat 13, item (d): release.sh's steps before verify:package on the worktree, whose
# dist-demo/ is older than the demo's sources, each through one guarded call.
#   red    the line release.sh ran before: npm run prepublishOnly (typecheck, build, npm test)
#   green  the lines release.sh runs now, read from it: npm run demo:dist:build, then
#          npm run prepublishOnly
# vitest's workers are held to two (VITEST_MAX_WORKERS), as the machine's law asks.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/fix-13/logs
G=~/.claude/guard/guarded
cd $W
stamp() { echo "$(date +%T) $1 dist-demo/index.html $(stat -f '%Sm' -t '%F %T' dist-demo/index.html 2>/dev/null || echo absent); newest demo source $(find demo src index.html -type f -newer dist-demo/index.html 2>/dev/null | head -3 | tr '\n' ' ')" >> $L/d.out; }
for leg in "$@"; do
  case $leg in
    red) cmd='npm run prepublishOnly' ;;
    green) cmd=$(sed -n '/^npm run demo:dist:build$/,/^npm run prepublishOnly$/p' scripts/release.sh) ;;
  esac
  stamp "$leg before"
  echo "$(date +%T) $leg runs: $(echo "$cmd" | tr '\n' ';')" >> $L/d.out
  s=$(date +%s)
  VITEST_MAX_WORKERS=2 $G --timeout 45 -- bash -c "set -euo pipefail; $cmd" > $L/d-$leg.log 2>&1
  rc=$?
  echo "$(date +%T) $leg exit $rc $(( $(date +%s) - s ))s load $(sysctl -n vm.loadavg) $(grep -E 'Test Files|Tests ' $L/d-$leg.log | tr -s ' ' | tr '\n' ' ')" >> $L/d.out
  stamp "$leg after"
  grep -q '^\[guarded\] REFUSED' $L/d-$leg.log && exit 75
done
