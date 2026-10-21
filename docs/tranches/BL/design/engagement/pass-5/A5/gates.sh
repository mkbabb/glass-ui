#!/bin/zsh
# P-A5 gates on one worktree: build, typecheck, demo:dist:build, vitest (--maxWorkers=2). The caller wraps it in guarded.
#   zsh gates.sh <worktree> ; each step's exit printed on its own line
cd $1 || exit 2
st() { print -- "## $(date '+%F %T') load $(sysctl -n vm.loadavg) · $*"; }
st build; npm run build > /dev/null 2>&1; print -- "exit build $?"
st typecheck; npm run typecheck 2>&1 | tail -15; print -- "exit typecheck ${pipestatus[1]}"
st demo:dist:build; npm run demo:dist:build > /dev/null 2>&1; print -- "exit demo:dist:build $?"
st vitest; npx vitest run --maxWorkers=2 2>&1 | tail -40; print -- "exit vitest ${pipestatus[1]}"
st end
