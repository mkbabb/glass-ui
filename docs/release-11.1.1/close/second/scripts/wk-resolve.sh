#!/bin/bash
# The 11.1.1 second close: WebKit's branch-only titles (wk-proj) on master's tip once and on the branch
# three times, each a full git-archive tree, under --exclusive webkit.
C=$(cd "$(dirname "$0")/.." && pwd); G=~/.claude/guard/guarded; F=$C/../../../../.cache/close-full; S=$C/suite/resolve
LIST=$C/suite/wk-branch-only.txt; mkdir -p $S
python3 -I $C/scripts/rerun-args.py $LIST files > $S/wk.files
GREP=$(python3 -I $C/scripts/rerun-args.py $LIST grep)
for spec in "master 5355 1" "head 5354 3"; do
  set -- $spec
  ROOT=$(cd $F/$1/tree && pwd) $G --exclusive webkit --timeout 40 -- zsh $C/scripts/suite.sh resolve/wk-$1 $2 tests-visual/webkit-2287.config.ts webkit $S/wk.files -g "$GREP" --repeat-each=$3 > $S/wk-$1.guard.log 2>&1
  echo "$(date '+%F %T') wk-$1 guard-rc=$? $(grep -m1 -E '^\[guarded\] REFUSED' $S/wk-$1.guard.log)" | tee -a $C/suite/queue.txt
  grep -qE '^\[guarded\] REFUSED' $S/wk-$1.guard.log && exit 3
done
