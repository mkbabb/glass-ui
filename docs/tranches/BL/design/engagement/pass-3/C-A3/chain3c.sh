#!/bin/zsh
# C-A3 chain 3. Chromium first (plant + geom builds and reads, CK-16, an E-5 re-read), then three WebKit acquisitions
# (`guarded --exclusive webkit`, queued, never skipped), each well under 90 min; one node process (one browser) at a time.
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-3/C-A3
A=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-3/A3/probe
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
R=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p3/C-A3
O=$R/wt/.ca3-out
G=~/.claude/guard/guarded
stamp() { print -- "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
run() { local log=$1; shift; { stamp "start $*"; "$@"; print -- "# exit $?"; stamp end; } > $D/logs/$log 2>&1; print -- "$log: $(grep -E '^(E-[0-9]+ +(chromium|webkit) +exit|a3-probe|ca3-probe|ck16|CAP)' $D/logs/$log | tail -3 | cut -c1-200 | tr '\n' '|')"; }
cd $H
# ── Chromium ──
run build-plant.log $G --timeout 20 -- node build.mjs $R/wt-plant --label plant --out $O
run build-geom.log  $G --timeout 20 -- node build.mjs $R/wt-geom --label geom --out $O
run plant-chromium-E-1.log $G --timeout 30 -- node run.mjs --build $O/builds/plant --wt $R/wt-plant --engines chromium --only E-1 --out $D/json/plant --verbose
run plant-chromium-E-2.log $G --timeout 30 -- node run.mjs --build $O/builds/plant --wt $R/wt-plant --engines chromium --only E-2 --out $D/json/plant --verbose
run a3probe-plant-chromium.log zsh -c "cd $A && $G --timeout 20 -- node a3-probe.mjs --build $O/builds/plant --engine chromium --label ca3-plant --only ck14"
run geom-arms-chromium-E-2.log $G --timeout 30 -- node run.mjs --build $O/builds/geom --wt $R/wt-geom --engines chromium --only E-2 --out $D/json/geom-arms --verbose --commit-arms i,ii,iii
run geom-chromium-E-9.log $G --timeout 30 -- node run.mjs --build $O/builds/geom --wt $R/wt-geom --engines chromium --only E-9 --out $D/json/geom --verbose
run ck16-light-chromium.log zsh -c "cd $D/probe && $G --timeout 10 -- node ck16.mjs --build $O/builds/light --engine chromium"
run light-r2-chromium-E-5.log $G --timeout 30 -- node run.mjs --build $O/builds/light --wt $R/wt --engines chromium --only E-5 --out $D/json/light-r2 --verbose
print "chromium side done $(date)"
