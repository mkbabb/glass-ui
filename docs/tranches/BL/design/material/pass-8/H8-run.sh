#!/usr/bin/env bash
# H8-run.sh · D3 pass 8, H8: every check this seat ran, by phase, on the trees H8-setup.sh built. Static only: no build,
# no browser, no capture. Each phase runs under guarded --light.
#   bash H8-run.sh selftest-h8|selftest-all|static
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p8/H8
M=$R/docs/tranches/BL/design/material
H=$M/harness
P8=$M/pass-8
REC=$P8/H8-records
H8ARGS="--h8-trees $B/trees --h8-patch $M/pass-7/floor-v6.patch --h8-exact $P8/H8-exact-floor-v6.json"
H7ARGS="--tree $B/h7trees/fv4 --h7-trees $B/h7trees --h7-decl $M/pass-7/H7-records/declare-floor-v5.json"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
echo "== $1 start $(ts)" | tee -a "$REC/phases.log"
cd "$H"
case $1 in
selftest-h8)
  D3_OUT=$B/out node selftest.mjs --only H8-1,H8-2 $H8ARGS > "$REC/selftest-h8.log" 2>&1; echo "selftest H8 exit $?"
  ;;
selftest-all)
  D3_OUT=$B/out2 node selftest.mjs --only LAW,DEL,H7-1,H7-2,H7-3,H8-1,H8-2 $H7ARGS $H8ARGS > "$REC/selftest-static-h6-h7-h8.log" 2>&1; echo "selftest static exit $?"
  ;;
static)
  node declare-removed.mjs --patch "$M/pass-7/floor-v6.patch" --root "$B/trees/fv6" --concepts deletes-floor.json --exact "$P8/H8-exact-floor-v6.json" --out "$REC/declare-floor-v6-H8.json" > "$REC/declare-floor-v6-H8.log" 2>&1; echo "declare exit $?"
  for t in fv6 fv6fix head; do node deleted-mechanisms.mjs --root "$B/trees/$t" --declare "$REC/declare-floor-v6-H8.json" --patch "$M/pass-7/floor-v6.patch" > "$REC/del-H8-$t.log" 2>&1; echo "DEL H8 $t exit $?"; done
  node deleted-mechanisms.mjs --root "$B/trees/fv6" --declare "$M/pass-7/FV6-records/declare-floor-v6.json" > "$REC/del-H7scope-fv6.log" 2>&1; echo "DEL pass-7 declaration, H8 scope, no patch, fv6 exit $?"
  node deleted-mechanisms.mjs --root "$B/trees/minor5" --declare deletes-minor.json --patch "$M/pass-7/minor-split-v5.patch" > "$REC/del-H8-minor5.log" 2>&1; echo "DEL H8 minor5 (R-18 (v), informational) exit $?"
  node launch-law.mjs > "$REC/law.log" 2>&1; echo "LAW exit $?"
  ;;
esac
echo "== $1 end $(ts)" | tee -a "$REC/phases.log"
