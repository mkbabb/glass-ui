#!/usr/bin/env bash
# ru56wk.sh: MEASURE-7 step 5, ru56trial.sh's WebKit half again (the first was stopped by job control, see detach.py),
# and a control: the loose cell on the worktree as it stands, both engines (the loose clause's base is v11.0.2, whose
# dark arm carries O-269's seat fills, 8124e3e53; this branch's merge base 99a1389e6 predates it).
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; L="$H/../logs"
K=""; for n in ${RU56_N:-a b c}; do K="$K node m7/ink7.mjs 5402 ru56$n --engine webkit --css m7/states/ru56-$n.css --label ru56-$n --base ../logs/m7-ink-base1102.webkit.json >> ../logs/m7-tokens.log 2>&1;"; done
K="$K node m7/ink7.mjs 5402 now7loose --engine webkit --pages loose --label now --base ../logs/m7-ink-base1102.webkit.json >> ../logs/m7-tokens.log 2>&1"
C="node m7/ink7.mjs 5402 now7loose --pages loose --label now --base ../logs/m7-ink-base1102.chromium.json >> ../logs/m7-tokens.log 2>&1"
echo "== $(date '+%H:%M:%S') trials webkit again + loose control (load $(sysctl -n vm.loadavg))" >> "$L/m7-tokens.log"
"$H/m7/cure7.sh" ru56wk "$C" "$K"
echo "== $(date '+%H:%M:%S') done" >> "$L/m7-tokens.log"
