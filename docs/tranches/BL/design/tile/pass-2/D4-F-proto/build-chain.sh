#!/bin/sh
# D4-F-proto/build-chain.sh · the prototype's scene builds, one after another, each stamped with the clock and load.
#   sh build-chain.sh <worktree> <out> [labels...]   labels: f-src f-src-dev f-dist (the library dist is built first)
H="$(cd "$(dirname "$0")/../../harness" && pwd)"; R="$(cd "$(dirname "$0")" && pwd)/route"
WT="$1"; OUT="$2"; shift 2; [ $# -eq 0 ] && set -- f-src f-src-dev f-dist
stamp() { echo "$(date '+%Y-%m-%d %H:%M:%S') · load $(sysctl -n vm.loadavg) · $*"; }
for l in "$@"; do
  stamp "start $l"
  case "$l" in
    f-src) node "$H/build.mjs" "$WT" --label f-src --out "$OUT" --flavor src --route "$R"; echo "exit $?" ;;
    f-src-dev) node "$H/build.mjs" "$WT" --label f-src-dev --out "$OUT" --flavor src-dev --route "$R"; echo "exit $?" ;;
    f-dist) node "$H/build.mjs" "$WT" --label f-dist --out "$OUT" --flavor dist --route "$R"; echo "exit $?" ;;
  esac
  stamp "end $l"
done
