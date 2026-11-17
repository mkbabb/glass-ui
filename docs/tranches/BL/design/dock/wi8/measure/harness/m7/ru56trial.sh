#!/usr/bin/env bash
# ru56trial.sh: MEASURE-7 step 5, RU-56's alphas read before the source is written. First v11.0.2's WebKit G-15 reading
# (the mark clause's base; Chromium's was read at step 1), then candidates a, b, c (m7/states/ru56-*.css: hover,
# current and press as the dock's ink at an alpha over the plate) through ink7 on the worktree's dev server, Chromium
# then WebKit, each against its engine's v11.0.2 reading. Logs: logs/m7-ink-ru56<n>.<engine>.json, logs/m7-tokens.log.
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; L="$H/../logs"; W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8; G=~/.claude/guard/guarded
log() { echo "== $(date '+%H:%M:%S') $1 (load $(sysctl -n vm.loadavg))" >> "$L/m7-tokens.log"; }
if [ ! -f "$L/m7-ink-base1102.webkit.json" ]; then
  log "v11.0.2 webkit"
  (cd "$H" && $G --exclusive webkit --timeout 40 -- m7/session7.sh "$W/.v11.0.2" dist-base 5431 node m7/ink7.mjs 5431 base1102 --engine webkit --label v11.0.2) >> "$L/m7-tokens.log" 2>&1
fi
C=""; K=""
for n in a b c; do
  C="$C node m7/ink7.mjs 5402 ru56$n --css m7/states/ru56-$n.css --label ru56-$n --base ../logs/m7-ink-base1102.chromium.json >> ../logs/m7-tokens.log 2>&1;"
  K="$K node m7/ink7.mjs 5402 ru56$n --engine webkit --css m7/states/ru56-$n.css --label ru56-$n --base ../logs/m7-ink-base1102.webkit.json >> ../logs/m7-tokens.log 2>&1;"
done
log "trials"
"$H/m7/cure7.sh" ru56trial "$C" "$K"
log done
