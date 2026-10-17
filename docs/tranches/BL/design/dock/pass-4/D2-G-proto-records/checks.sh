#!/bin/bash
# checks.sh (D2-G pass 4): in the seat worktree, each through the machine guard: the library build, the demo
# dist build, both typechecks, the boot-graph gate and its byte count, then vitest (2 workers). For the base
# count, the same demo dist build and byte count in the HEAD + floor-v3 checkout. Logs: checks/<step>.log.
#   bash checks.sh <worktree> <head+fv3 checkout> [steps...]   steps: lib demo tsc boot vitest base (default: all)
set -u
WT=$1; FV=$2; shift 2; STEPS=${*:-lib demo tsc boot vitest base}
REC=$(cd "$(dirname "$0")" && pwd); D=$(cd "$REC/../.." && pwd); G=~/.claude/guard/guarded; L=$REC/checks; mkdir -p "$L"
for s in $STEPS; do case $s in
  lib) (cd "$WT" && uptime && $G --timeout 30 -- npx vite build; echo "exit $?"; uptime) > "$L/lib-build.log" 2>&1 ;;
  demo) (cd "$WT" && uptime && $G --timeout 30 -- npx vite build --config demo/vite.demo-dist.config.ts; echo "exit $?"; uptime) > "$L/demo-dist-build.log" 2>&1 ;;
  tsc) (cd "$WT" && uptime && $G --light --timeout 20 -- npx vue-tsc --noEmit; echo "exit src $?"; $G --light --timeout 20 -- npx vue-tsc --noEmit -p tsconfig.test.json; echo "exit test $?"; uptime) > "$L/typecheck.log" 2>&1 ;;
  boot) (cd "$WT" && uptime && $G --light --timeout 10 -- npx vitest run --maxWorkers=2 tests/gates/boot-graph.test.ts; echo "exit $?"; node "$D/pass-3/D2-G-eager.mjs" "$WT/dist-demo"; uptime) > "$L/boot-graph.log" 2>&1 ;;
  vitest) (cd "$WT" && uptime && $G --timeout 40 -- npx vitest run --maxWorkers=2; echo "exit $?"; uptime) > "$L/vitest.log" 2>&1 ;;
  base) (cd "$FV" && uptime && $G --timeout 30 -- npx vite build --config demo/vite.demo-dist.config.ts; echo "exit $?"; node "$D/pass-3/D2-G-eager.mjs" "$FV/dist-demo"; uptime) > "$L/base-demo-dist-build.log" 2>&1 ;;
esac; echo "$s: $(tail -2 "$L"/*"${s}"*.log 2>/dev/null | grep -E '^exit' | tr '\n' ' ')"; done
