#!/usr/bin/env bash
# H11-run.sh · D3 pass 11, H11 (REGISTRY P10-6.3 step 1): every check this seat ran, by phase, on the trees H11-setup.sh
# built. Static only: no build, no browser, no capture. Run each phase under ~/.claude/guard/guarded --light.
#   bash H11-run.sh static|selftest-h11|selftest-all
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p11/H11
M=$R/docs/tranches/BL/design/material
H=$M/harness
P9=$M/pass-9
P10=$M/pass-10
REC=$M/pass-11/H11-records
H7ARGS="--tree $B/h7trees/fv4 --h7-trees $B/h7trees --h7-decl $M/pass-7/H7-records/declare-floor-v5.json"
H8ARGS="--h8-trees $B/trees --h8-patch $M/pass-7/floor-v6.patch --h8-exact $M/pass-8/H8-exact-floor-v6.json"
H9ARGS="--h9-trees $B/trees --h9-patch $M/pass-8/floor-v7.patch --h9-exact $P9/H9-exact-floor.json --h9-minor-patch $M/pass-8/minor-split-v6.patch --h9-minor7-patch $P9/minor-split-v7.patch"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
echo "== $1 start $(ts)" | tee -a "$REC/phases.log"
cd "$H"
case $1 in
static)
  # H11-1 and H11-2 read directly, for the record beside the self-test's rows. The pipe probe is the pass-10 critic's
  # (crit-pipe-truncation.mjs: six runs through spawnSync's pipe, the minor v7 under MS7-rulings.json), re-run on H11.
  node "$P10/crit-pipe-truncation.mjs" --root "$B/trees/minor7" --patch "$P9/minor-split-v7.patch" --declare deletes-minor.json --rulings "$P9/MS7-rulings.json" > "$REC/pipe-probe.log" 2>&1; echo "pipe probe exit $?: $(grep -c 'tally true' "$REC/pipe-probe.log")/6 runs carry the tally"
  node deleted-mechanisms.mjs --root "$B/trees/fv9" --declare "$P10/FV9-records/declare-floor-v9.json" --patch "$P10/floor-v9.patch" > "$REC/del-fv9.log" 2>&1; echo "DEL fv9 exit $?: $(tail -1 "$REC/del-fv9.log")"
  node deleted-mechanisms.mjs --root "$B/trees/minor8" --declare deletes-minor.json --patch "$P10/minor-split-v8.patch" > "$REC/del-minor8.log" 2>&1; echo "DEL minor8 exit $?: $(tail -1 "$REC/del-minor8.log")"
  node deleted-mechanisms.mjs --root "$B/absent" --declare deletes-minor.json > "$REC/del-absent.log" 2>&1; echo "DEL absent exit $?: $(tail -1 "$REC/del-absent.log")"
  node prose-sweep.mjs --root "$B/trees/fv9" --patch "$P10/floor-v9.patch" --declare "$P10/FV9-records/declare-floor-v9.json" --rulings "$P10/FV9-rulings.json" > "$REC/sweep-fv9-ruled.log" 2>&1; echo "SWEEP fv9 ruled exit $?: $(tail -1 "$REC/sweep-fv9-ruled.log")"
  node prose-sweep.mjs --root "$B/trees/fv9" --patch "$P10/floor-v9.patch" --declare "$P10/FV9-records/declare-floor-v9.json" --rulings "$P10/crit-fv10-rulings-proposed.json" > "$REC/sweep-fv9-under-fv10r.log" 2>&1; echo "SWEEP fv9 under crit-fv10 rulings exit $?: $(tail -1 "$REC/sweep-fv9-under-fv10r.log")"
  node prose-sweep.mjs --root "$B/trees/fv9p" --patch "$P10/floor-v9.patch" --declare "$P10/FV9-records/declare-floor-v9.json" --rulings "$P10/crit-fv10-rulings-proposed.json" > "$REC/sweep-fv9p-ruled.log" 2>&1; echo "SWEEP fv9p ruled exit $?: $(tail -1 "$REC/sweep-fv9p-ruled.log")"
  node prose-sweep.mjs --root "$B/trees/minor8" --patch "$P10/minor-split-v8.patch" --declare deletes-minor.json --rulings "$P10/MS8-rulings.json" > "$REC/sweep-minor8-ruled.log" 2>&1; echo "SWEEP minor8 ruled exit $?: $(tail -1 "$REC/sweep-minor8-ruled.log")"
  node prose-sweep.mjs --root "$B/trees/minor8p" --patch "$P10/minor-split-v8.patch" --declare deletes-minor.json --rulings "$P10/MS8-rulings-proposed.json" > "$REC/sweep-minor8p-ruled.log" 2>&1; echo "SWEEP minor8p ruled exit $?: $(tail -1 "$REC/sweep-minor8p-ruled.log")"
  node neighbourhood.mjs --root "$B/trees/fv9" --patch "$P10/floor-v9.patch" > "$REC/neighbourhood-fv9.log" 2>&1; echo "NEIGHBOURHOOD fv9 exit $?: $(tail -1 "$REC/neighbourhood-fv9.log")"
  node neighbourhood.mjs --root "$B/trees/minor8" --patch "$P10/minor-split-v8.patch" > "$REC/neighbourhood-minor8.log" 2>&1; echo "NEIGHBOURHOOD minor8 exit $?: $(tail -1 "$REC/neighbourhood-minor8.log")"
  node launch-law.mjs > "$REC/law.log" 2>&1; echo "LAW exit $?: $(tail -1 "$REC/law.log")"
  ;;
selftest-h11)
  D3_OUT=$B/out node selftest.mjs --only H11-1,H11-2 $H7ARGS $H9ARGS > "$REC/selftest-h11.log" 2>&1; echo "selftest H11 exit $?: $(tail -1 "$REC/selftest-h11.log")"
  ;;
selftest-all)
  D3_OUT=$B/out2 node selftest.mjs --only LAW,DEL,H7-1,H7-2,H7-3,H8-1,H8-2,H9-1,H9-2,H9-3,H9-4,H9-5,H9-6,H10-1,H10-2,H11-1,H11-2 $H7ARGS $H8ARGS $H9ARGS > "$REC/selftest-static-h6-h11.log" 2>&1; echo "selftest static exit $?: $(tail -1 "$REC/selftest-static-h6-h11.log")"
  ;;
esac
echo "== $1 end $(ts)" | tee -a "$REC/phases.log"
