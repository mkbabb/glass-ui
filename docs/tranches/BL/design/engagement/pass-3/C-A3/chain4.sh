#!/bin/zsh
# C-A3 chain 4 (the seat redeployed at 22:00 after the first run was stopped mid chain 3 at 21:30, during plant E-2 Chromium).
# Same worktrees, same builds. Chromium first, then two WebKit acquisitions (`guarded --exclusive webkit`, queued, never
# skipped), one node process (one browser) at a time.
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-3/C-A3
A=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-3/A3/probe
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
R=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p3/C-A3
O=$R/wt/.ca3-out
G=~/.claude/guard/guarded
stamp() { print -- "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
run() { local log=$1; shift; { stamp "start $*"; "$@"; print -- "# exit $?"; stamp end; } > $D/logs/$log 2>&1; print -- "$log: $(grep -E '^(E-[0-9]+ +(chromium|webkit) +exit|a3-probe|ca3-probe|ck16|CAP|\[guarded\])' $D/logs/$log | tail -4 | cut -c1-220 | tr '\n' '|')"; }
cd $H
if [[ $1 != webkit ]]; then
run plant-chromium-E-2.log $G --timeout 30 -- node run.mjs --build $O/builds/plant --wt $R/wt-plant --engines chromium --only E-2 --out $D/json/plant --verbose
run a3probe-plant-chromium.log zsh -c "cd $A && $G --timeout 20 -- node a3-probe.mjs --build $O/builds/plant --engine chromium --label ca3-plant --only ck14"
run geom-arms-chromium-E-2.log $G --timeout 30 -- node run.mjs --build $O/builds/geom --wt $R/wt-geom --engines chromium --only E-2 --out $D/json/geom-arms --verbose --commit-arms i,ii,iii
run geom-chromium-E-9.log $G --timeout 30 -- node run.mjs --build $O/builds/geom --wt $R/wt-geom --engines chromium --only E-9 --out $D/json/geom --verbose
run ck16-light-chromium.log zsh -c "cd $D/probe && $G --timeout 10 -- node ck16.mjs --build $O/builds/light --engine chromium"
run light-r2-chromium-E-5.log $G --timeout 30 -- node run.mjs --build $O/builds/light --wt $R/wt --engines chromium --only E-5 --out $D/json/light-r2 --verbose
run light-r3-chromium-E-5.log $G --timeout 30 -- node run.mjs --build $O/builds/light --wt $R/wt --engines chromium --only E-5 --out $D/json/light-r3 --verbose
print "chromium side done $(date '+%F %T')"
fi
# ── WebKit W1: the rest of the light battery, the probes, the capture ──
run wk-W1.log $G --exclusive webkit --timeout 90 -- zsh -c "cd $H; for id in E-7 E-4 E-5 E-6; do print -- \"# start \$id \$(date '+%T') load \$(sysctl -n vm.loadavg)\"; node run.mjs --build $O/builds/light --wt $R/wt --engines webkit --only \$id --out $D/json/light --verbose; done; print -- \"# probes \$(date '+%T') load \$(sysctl -n vm.loadavg)\"; cd $A && node a3-probe.mjs --build $O/builds/light --engine webkit --label ca3-light; cd $D/probe && node ca3-probe.mjs --build $O/builds/light --engine webkit; node radiopix.mjs --build $O/builds/light --engine webkit; node ck16.mjs --build $O/builds/light --engine webkit; print -- \"# capture \$(date '+%T') load \$(sysctl -n vm.loadavg)\"; cd $H && node capture.mjs --build $O/builds/light --label ca3-light --frames $D/glance/frames --sheets $D/glance --engine webkit"
# ── WebKit W2: plants + geom ──
run wk-W2.log $G --exclusive webkit --timeout 90 -- zsh -c "cd $H; node run.mjs --build $O/builds/plant --wt $R/wt-plant --engines webkit --only E-1 --out $D/json/plant --verbose; node run.mjs --build $O/builds/plant --wt $R/wt-plant --engines webkit --only E-2 --out $D/json/plant --verbose; cd $A && node a3-probe.mjs --build $O/builds/plant --engine webkit --label ca3-plant --only ck14; cd $H; node run.mjs --build $O/builds/geom --wt $R/wt-geom --engines webkit --only E-2 --out $D/json/geom-arms --verbose --commit-arms i,ii,iii; node run.mjs --build $O/builds/geom --wt $R/wt-geom --engines webkit --only E-9 --out $D/json/geom --verbose"
print "# chain4 done $(date '+%F %T')"
