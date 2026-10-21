#!/bin/zsh
# P-E5 gates on one worktree: build, typecheck (after the build: the fourier-math self-import), demo:dist:build,
# vitest --maxWorkers=2. The caller wraps it in guarded.   zsh gates.sh <worktree>
cd $1 || exit 2
st() { print -- "## $(date '+%F %T') load $(sysctl -n vm.loadavg) · $*"; }
st build; npm run build > /dev/null 2>&1; print -- "exit build $?"
st typecheck; npm run typecheck > $1/../tc.out 2>&1; rc=$?; tail -15 $1/../tc.out; rm -f $1/../tc.out; print -- "exit typecheck $rc"
st demo:dist:build; npm run demo:dist:build > /dev/null 2>&1; print -- "exit demo:dist:build $?"
st vitest; npx vitest run --maxWorkers=2 > $1/../vt.out 2>&1; rc=$?; tail -40 $1/../vt.out; rm -f $1/../vt.out; print -- "exit vitest $rc"
st end
