#!/usr/bin/env bash
# Critic 5, resumed 2026-11-12 (the first seat was stopped at 16:10 on 11-11 with phase B's
# WebKit pass at "probe"). What it had not banked, one guarded run at a time:
# probe8's mount, active, both and dir cells (phase C) in both engines on both trees; critic 3's
# probe and probe4 to probe7 in WebKit; then the touched e2e specs on both trees in both engines.
HERE=$(cd "$(dirname "$0")" && pwd); cd "$HERE"
ROOT=$(cd "$HERE/../../.." && pwd); RED=$ROOT/.cache/c1-v1100; G=~/.claude/guard/guarded
echo "$(date '+%F %T') resume (run-d) at $(git -C "$ROOT" rev-parse --short HEAD)" >> chain.log
df -h /System/Volumes/Data | tail -1 | sed 's/^/disk /' >> chain.log
p8() { # p8 <engine> <label> <tree> <port>
  local EX=""; [ "$1" = webkit ] && EX="--exclusive webkit"
  ONLY=mount,active,both,dir $G $EX --timeout 30 -- bash probe8/runprobe.sh "$3" "$4" "$1" "$2" > "probe8/out/$2-$1-mount+active+both+dir.log" 2>&1; echo "$(date +%T) probe8 (mount, active, both, dir) $2 $1 exit $?" >> chain.log
}
pr() { # pr <dir> <engine> <label> <tree> <port>
  mkdir -p "$1/out"
  local EX=""; [ "$2" = webkit ] && EX="--exclusive webkit"
  $G $EX --timeout 30 -- bash "$1/runprobe.sh" "$4" "$5" "$2" "$3" > "$1/out/$3-$2.log" 2>&1; echo "$(date +%T) $1 $3 $2 exit $?" >> chain.log
}
p8 chromium green "$ROOT" 8878
p8 chromium red "$RED" 8879
echo "$(date +%T) PHASE-C-CHROMIUM-DONE" >> chain.log
p8 webkit green "$ROOT" 8878
p8 webkit red "$RED" 8879
echo "$(date +%T) PHASE-C-DONE" >> chain.log
pr probe webkit green "$ROOT" 8891
pr probe webkit red "$RED" 8892
pr probe4 webkit green "$ROOT" 8871
pr probe4 webkit red "$RED" 8872
pr probe5 webkit green "$ROOT" 8873
pr probe6 webkit green "$ROOT" 8874
pr probe6 webkit red "$RED" 8875
pr probe7 webkit green "$ROOT" 8876
pr probe7 webkit red "$RED" 8877
echo "$(date +%T) WEBKIT-DONE" >> chain.log
