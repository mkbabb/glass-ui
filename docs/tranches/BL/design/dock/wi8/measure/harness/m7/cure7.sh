#!/usr/bin/env bash
# cure7.sh <tag> <chromium cmds> <webkit cmds> [g14 sites...]: MEASURE-7 step 4, one cure's own cells. The worktree's
# dev server with the hold flag (m6/devserve.sh, 127.0.0.1:5402) and this seat's pages (the audit app with dock-wi8,
# the compositions and the loose cell); the Chromium commands under one guarded run, the WebKit 2287 commands under
# `--exclusive webkit`; then G-14's named sites in the three projects (m5/g14.sh, tag m7<tag>). Each command line is
# run from the harness directory with PORT=5402. Log: logs/m7-cure.log.
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; L="$H/../logs"; W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8; G=~/.claude/guard/guarded
APP="/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/audit/animation/harness/app"
TAG="$1"; C="$2"; K="$3"; shift 3
log() { echo "== $(date '+%H:%M:%S') $TAG $1 (load $(sysctl -n vm.loadavg))" >> "$L/m7-cure.log"; }
rm -rf "$W/demo/__anim"; mkdir -p "$W/demo/__anim/mounts/comp"; cp -R "$APP/." "$W/demo/__anim/"
cp "$H/m6/comp/"*.vue "$H/m7/comp/"*.vue "$W/demo/__anim/mounts/comp/"; cp "$H/m6/dock-comp.vue" "$W/demo/__anim/mounts/dock-comp.vue"; cp "$H/dock-wi8.vue" "$W/demo/__anim/mounts/dock-wi8.vue"
sed -i '' 's|    dock: { mount: "hand" },|    dock: { mount: "hand" },\n    "dock-comp": { mount: "hand" },\n    "dock-wi8": { mount: "hand" },|' "$W/demo/__anim/registry.ts"
if [ -n "$C$K" ]; then
  rm -f "$L/m7-devserve.log"; (cd "$H" && $G --light --timeout 60 -- "$H/m6/devserve.sh" 5402 58 > "$L/m7-devserve.log" 2>&1 &)
  for i in $(seq 1 300); do grep -q "dev up" "$L/m7-devserve.log" 2>/dev/null && break; sleep 2; done
  grep -q "dev up" "$L/m7-devserve.log" || { log "dev server did not start"; exit 2; }
  if [ -n "$C" ]; then log chromium; (cd "$H" && PORT=5402 $G --timeout 40 -- sh -c "$C") >> "$L/m7-cure.log" 2>&1; fi
  if [ -n "$K" ]; then log webkit; (cd "$H" && PORT=5402 $G --exclusive webkit --timeout 40 -- sh -c "$K") >> "$L/m7-cure.log" 2>&1; fi
  pkill -f "m6/devserve.sh 5402"; sleep 3; pkill -f "port 5402 --strictPort"
fi
if [ $# -gt 0 ]; then log "g14 $*"; "$H/m5/g14.sh" "$W" "m7$TAG" 5413 both "$@"; fi
log done
