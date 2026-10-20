#!/usr/bin/env bash
# H13-run.sh · D3 pass 13, H13 (REGISTRY P12-6.3 step 1): every check this seat ran, by phase, on the trees H13-setup.sh
# built. Static only: no build, no browser, no capture (H13's rows lay their captures out from pixels and from the banked
# pass-12 BV11 logs). Run each phase under ~/.claude/guard/guarded --light.
#   bash H13-run.sh selftest-h13 <run>|selftest-all|law
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p13/H13
M=$R/docs/tranches/BL/design/material
H=$M/harness
P9=$M/pass-9
REC=$M/pass-13/H13-records
H7ARGS="--tree $B/h7trees/fv4 --h7-trees $B/h7trees --h7-decl $M/pass-7/H7-records/declare-floor-v5.json"
H8ARGS="--h8-trees $B/trees --h8-patch $M/pass-7/floor-v6.patch --h8-exact $M/pass-8/H8-exact-floor-v6.json"
H9ARGS="--h9-trees $B/trees --h9-patch $M/pass-8/floor-v7.patch --h9-exact $P9/H9-exact-floor.json --h9-minor-patch $M/pass-8/minor-split-v6.patch --h9-minor7-patch $P9/minor-split-v7.patch"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
echo "== $1 start $(ts)" | tee -a "$REC/phases.log"
cd "$H"
case $1 in
selftest-h13)
  # $2 names the run (run1, run2).
  D3_OUT=$B/out-h13-$2 node selftest.mjs --only H13-1,H13-2,H13-3,H13-4 > "$REC/selftest-h13-$2.log" 2>&1; echo "selftest H13 $2 exit $?: $(tail -1 "$REC/selftest-h13-$2.log")"
  ;;
selftest-all)
  D3_OUT=$B/out-all node selftest.mjs --only LAW,DEL,H7-1,H7-2,H7-3,H8-1,H8-2,H9-1,H9-2,H9-3,H9-4,H9-5,H9-6,H10-1,H10-2,H11-1,H11-2,H12-1,H13-1,H13-2,H13-3,H13-4 $H7ARGS $H8ARGS $H9ARGS > "$REC/selftest-static-h6-h13.log" 2>&1; echo "selftest static exit $?: $(tail -1 "$REC/selftest-static-h6-h13.log")"
  ;;
law)
  node launch-law.mjs > "$REC/law.log" 2>&1; echo "LAW exit $?: $(tail -1 "$REC/law.log")"
  ;;
esac
echo "== $1 end $(ts)" | tee -a "$REC/phases.log"
