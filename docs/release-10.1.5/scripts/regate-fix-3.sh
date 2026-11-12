#!/bin/zsh
# 10.1.5 fix round 3 re-gate after the bundle-ratchet rebind: vitest (after the build the
# gates already made from the same src), then verify:package.
set -u
cd ${0:A:h:h:h:h}
L=docs/release-10.1.5/fix-3
npx vitest run --maxWorkers=2 > $L/vitest-2.log 2>&1; echo "vitest-2 exit=$?" | tee -a $L/gates.txt
grep -E "Test Files|Tests " $L/vitest-2.log | tee -a $L/gates.txt
npm run verify:package > $L/verify-package-2.log 2>&1; echo "verify-package-2 exit=$?" | tee -a $L/gates.txt
echo "regate done" | tee -a $L/gates.txt
