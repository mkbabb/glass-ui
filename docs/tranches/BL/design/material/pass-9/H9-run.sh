#!/usr/bin/env bash
# H9-run.sh · D3 pass 9, H9: every check this seat ran, by phase, on the trees H9-setup.sh built. Static only: no build,
# no browser, no capture. Run each phase under ~/.claude/guard/guarded --light.
#   bash H9-run.sh selftest-h9|selftest-all|static
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p9/H9
M=$R/docs/tranches/BL/design/material
H=$M/harness
REC=$M/pass-9/H9-records
H7ARGS="--tree $B/h7trees/fv4 --h7-trees $B/h7trees --h7-decl $M/pass-7/H7-records/declare-floor-v5.json"
H8ARGS="--h8-trees $B/trees --h8-patch $M/pass-7/floor-v6.patch --h8-exact $M/pass-8/H8-exact-floor-v6.json"
H9ARGS="--h9-trees $B/trees --h9-patch $M/pass-8/floor-v7.patch --h9-exact $M/pass-9/H9-exact-floor.json --h9-minor-patch $M/pass-8/minor-split-v6.patch"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
echo "== $1 start $(ts)" | tee -a "$REC/phases.log"
cd "$H"
case $1 in
selftest-h9)
  D3_OUT=$B/out node selftest.mjs --only H9-1,H9-2,H9-3,H9-4,H9-5,H9-6 $H9ARGS > "$REC/selftest-h9.log" 2>&1; echo "selftest H9 exit $?"
  ;;
selftest-all)
  D3_OUT=$B/out2 node selftest.mjs --only LAW,DEL,H7-1,H7-2,H7-3,H8-1,H8-2,H9-1,H9-2,H9-3,H9-4,H9-5,H9-6 $H7ARGS $H8ARGS $H9ARGS > "$REC/selftest-static-h6-h9.log" 2>&1; echo "selftest static exit $?"
  ;;
static)
  for t in fv7 fv8; do node declare-removed.mjs --patch "$M/pass-8/floor-v7.patch" --root "$B/trees/$t" --concepts deletes-floor.json --exact "$M/pass-9/H9-exact-floor.json" --out "$REC/declare-floor-v7-on-$t.json" > "$REC/declare-floor-v7-on-$t.log" 2>&1; echo "declare on $t exit $?"; done
  for t in fv7 fv8 fv6; do node deleted-mechanisms.mjs --root "$B/trees/$t" --declare "$REC/declare-floor-v7-on-fv7.json" --patch "$M/pass-8/floor-v7.patch" > "$REC/del-H9-$t.log" 2>&1; echo "DEL H9 $t exit $?"; done
  node deleted-mechanisms.mjs --root "$B/trees/minor6" --declare deletes-minor.json --patch "$M/pass-8/minor-split-v6.patch" > "$REC/del-H9-minor6.log" 2>&1; echo "DEL H9 minor6 exit $?"
  for t in fv7 fv8; do node prose-sweep.mjs --root "$B/trees/$t" --patch "$M/pass-8/floor-v7.patch" --declare "$REC/declare-floor-v7-on-fv7.json" > "$REC/sweep-$t.log" 2>&1; echo "SWEEP $t exit $?"; done
  node prose-sweep.mjs --root "$B/trees/minor6" --patch "$M/pass-8/minor-split-v6.patch" --declare deletes-minor.json > "$REC/sweep-minor6.log" 2>&1; echo "SWEEP minor6 exit $?"
  node launch-law.mjs > "$REC/law.log" 2>&1; echo "LAW exit $?"
  ;;
esac
echo "== $1 end $(ts)" | tee -a "$REC/phases.log"
