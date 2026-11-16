#!/usr/bin/env bash
# step3.sh: MEASURE-7, RULINGS-6's step 3 (readings that decide a cure; no source change but the reach stub, applied
# and reverted around its two runs). On the worktree's dev server with the hold flag (m6/devserve.sh, 127.0.0.1:5402):
#   Chromium: cost7 (G-11's trigger frames by stack, dock:rect on a fold frame, the observer's misses; GPU lane),
#             step3 reach, trigorder, s2inset, touchname
#   WebKit 2287: step3 reach, trigorder, s2inset
#   reach again in both engines with reach stubbed (useDockRun's reach returns at once)
# Logs: logs/m7-step3-*.
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; L="$H/../logs"; W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8; G=~/.claude/guard/guarded
APP="/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/audit/animation/harness/app"
log() { echo "== $(date '+%H:%M:%S') $1 (load $(sysctl -n vm.loadavg))" >> "$L/m7-step3.log"; }
# the pages: the audit app with dock-wi8, the ten compositions and the loose cell
rm -rf "$W/demo/__anim"; mkdir -p "$W/demo/__anim/mounts/comp"; cp -R "$APP/." "$W/demo/__anim/"
cp "$H/m6/comp/"*.vue "$H/m7/comp/"*.vue "$W/demo/__anim/mounts/comp/"; cp "$H/m6/dock-comp.vue" "$W/demo/__anim/mounts/dock-comp.vue"; cp "$H/dock-wi8.vue" "$W/demo/__anim/mounts/dock-wi8.vue"
sed -i '' 's|    dock: { mount: "hand" },|    dock: { mount: "hand" },\n    "dock-comp": { mount: "hand" },\n    "dock-wi8": { mount: "hand" },|' "$W/demo/__anim/registry.ts"
start() { rm -f "$L/m7-devserve.log"; (cd "$H" && $G --light --timeout 88 -- "$H/m6/devserve.sh" 5402 86 > "$L/m7-devserve.log" 2>&1 &); for i in $(seq 1 300); do grep -q "dev up" "$L/m7-devserve.log" 2>/dev/null && return 0; sleep 2; done; return 1; }
stop() { pkill -f "m6/devserve.sh 5402"; sleep 3; pkill -f "port 5402 --strictPort"; }
log "dev server"; start || { log "dev server did not start"; exit 2; }
S="node $H/m7/step3.mjs"
log "chromium"
(cd "$H" && $G --timeout 40 --cpu-cores 0 -- sh -c "node m7/cost7.mjs 5402 m7-step3 > $L/m7-step3-cost.chromium.txt 2>&1; $S reach 5402 chromium > $L/m7-step3-reach.chromium.txt 2>&1; $S trigorder 5402 chromium > $L/m7-step3-trig.chromium.txt 2>&1; $S s2inset 5402 chromium > $L/m7-step3-s2.chromium.txt 2>&1; $S touchname 5402 chromium > $L/m7-step3-touch.chromium.txt 2>&1") >> "$L/m7-step3.log" 2>&1
log "webkit"
(cd "$H" && $G --exclusive webkit --timeout 40 -- sh -c "$S reach 5402 webkit > $L/m7-step3-reach.webkit.txt 2>&1; $S trigorder 5402 webkit > $L/m7-step3-trig.webkit.txt 2>&1; $S s2inset 5402 webkit > $L/m7-step3-s2.webkit.txt 2>&1") >> "$L/m7-step3.log" 2>&1
log "reach stubbed"
F="$W/src/components/dock/composables/useDockRun.ts"
python3 - "$F" <<'EOF'
import sys; p=sys.argv[1]; s=open(p).read()
old="    function reach(seat: HTMLElement): void {\n        const run = runEl.value;\n        if (!run) return;\n"
assert old in s; s=s.replace(old, old + "        if ((globalThis as { __m7StubReach?: boolean }).__m7StubReach !== false) return;\n", 1); open(p,"w").write(s)
EOF
sleep 3
(cd "$H" && $G --timeout 20 -- sh -c "$S reach 5402 chromium --tag stub > $L/m7-step3-reach-stub.chromium.txt 2>&1") >> "$L/m7-step3.log" 2>&1
(cd "$H" && $G --exclusive webkit --timeout 20 -- sh -c "$S reach 5402 webkit --tag stub > $L/m7-step3-reach-stub.webkit.txt 2>&1") >> "$L/m7-step3.log" 2>&1
git -C "$W" checkout -- src/components/dock/composables/useDockRun.ts
git -C "$W" diff --quiet -- src || log "SOURCE NOT CLEAN after the stub"
stop
log "done"
