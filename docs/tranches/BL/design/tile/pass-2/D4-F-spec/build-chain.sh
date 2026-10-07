#!/bin/sh
# D4-F-spec/build-chain.sh · the seat's builds, one after another, each stamped with the clock and the load.
#   sh build-chain.sh <worktree> <out> [labels...]   labels: f-src f-src-dev lib f-dist (default: all, in that order)
H="$(cd "$(dirname "$0")/../../harness" && pwd)"; R="$(cd "$(dirname "$0")" && pwd)/route"
WT="$1"; OUT="$2"; shift 2; [ $# -eq 0 ] && set -- f-src f-src-dev lib f-dist
stamp() { echo "$(date '+%Y-%m-%d %H:%M:%S') · load $(sysctl -n vm.loadavg) · $*"; }
for l in "$@"; do
  stamp "start $l"
  case "$l" in
    lib) node "$H/libbuild.mjs" "$WT"; echo "exit $?" ;;
    f-src) node "$H/build.mjs" "$WT" --label f-src --out "$OUT" --flavor src --route "$R"; echo "exit $?" ;;
    f-src-dev) node "$H/build.mjs" "$WT" --label f-src-dev --out "$OUT" --flavor src-dev --route "$R"; echo "exit $?" ;;
    f-dist) node "$H/build.mjs" "$WT" --label f-dist --out "$OUT" --flavor dist --route "$R"; echo "exit $?" ;;
    floor-src) node "$H/build.mjs" "$WT" --label floor-src --out "$OUT" --flavor src --route "$R"; echo "exit $?" ;;
  esac
  stamp "end $l"
done
