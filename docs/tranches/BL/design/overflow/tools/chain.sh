#!/usr/bin/env bash
# chain.sh: the study's remaining runs. Four guarded calls, one after another (one heavy
# run of this study at a time). Inside a call the runs go one by one, each its own
# headless browser (closed in its finally), a context per cell or job.
#   A Chromium: the RED/GREEN witness, the triage jobs, the cure sweep at 390 touch light
#     on REP (one route per fault family)
#   B WebKit (exclusive): the witness, then the base and cure sweeps of REP at 390 touch
#     light and 1440 light
#   C Chromium: the base sweep at 1440 light (every route), the cure sweep on REP
#   D Chromium: the base sweeps in dark (the base pass, every route), both widths
# Both preview servers (5391 base, 5392 cure) are checked before each call. Logs: trees/.
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/.." && pwd)"
G=~/.claude/guard/guarded
log() { echo "== $(date +%T) $*"; }
ensure() { # port tree outdir
    curl -s -o /dev/null "http://127.0.0.1:$1/ovf.html" && return 0
    log "restart server $1"
    "$HERE/stop.sh" "$1" >/dev/null 2>&1
    ( $G --light --timeout 90 -- "$HERE/serve.sh" "$ROOT/trees/$2" "$3" "$1" >> "$ROOT/trees/serve-$1.log" 2>&1 & )
    for _ in $(seq 1 60); do curl -s -o /dev/null "http://127.0.0.1:$1/ovf.html" && return 0; sleep 1; done
    log "server $1 did not come up"
}
servers() { ensure 5391 v11.1.1 dist-base; ensure 5392 cure dist-cure; }
call() { # name [guard flags] -- group
    local name="$1"; shift
    servers
    log "call $name"
    $G "$@" >> "$ROOT/trees/call-$name.log" 2>&1
    log "call $name exit $?"
}
call A --timeout 85 -- "$HERE/probe-group.sh" A chromium
call B --exclusive webkit --timeout 85 -- "$HERE/probe-group.sh" B webkit
call C --timeout 85 -- "$HERE/probe-group.sh" C chromium
call D --timeout 60 -- "$HERE/probe-group.sh" D chromium
log done
