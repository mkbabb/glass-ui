#!/usr/bin/env bash
# H10-run.sh · D3 pass 10, H10 (REGISTRY P9-6.2 step 1): every check this seat ran, by phase, on the trees H10-setup.sh
# built. Static only: no build, no browser, no capture. Run each phase under ~/.claude/guard/guarded --light.
#   bash H10-run.sh migrate|static|selftest-h10|selftest-all
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p10/H10
M=$R/docs/tranches/BL/design/material
H=$M/harness
P9=$M/pass-9
REC=$M/pass-10/H10-records
H7ARGS="--tree $B/h7trees/fv4 --h7-trees $B/h7trees --h7-decl $M/pass-7/H7-records/declare-floor-v5.json"
H8ARGS="--h8-trees $B/trees --h8-patch $M/pass-7/floor-v6.patch --h8-exact $M/pass-8/H8-exact-floor-v6.json"
H9ARGS="--h9-trees $B/trees --h9-patch $M/pass-8/floor-v7.patch --h9-exact $P9/H9-exact-floor.json --h9-minor-patch $M/pass-8/minor-split-v6.patch --h9-minor7-patch $P9/minor-split-v7.patch"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
echo "== $1 start $(ts)" | tee -a "$REC/phases.log"
cd "$H"
case $1 in
migrate)
  # H10-2's migration: the pass-9 generators (now emitting `verdict`) re-run over the same banked sweep logs that wrote
  # the banked files, in place; then the check against the banked (git HEAD) versions: no reading changed.
  { python3 -I "$P9/FV8-rulings.py" "$P9/FV8-records/sweep-fv8.log" "$P9/FV8-rulings.json"
    python3 -I "$P9/MS7-rulings.py" "$P9/MS7-records/sweep-minor7.log" "$P9/MS7-rulings.json"
    python3 -I "$P9/MS7-rulings.py" "$P9/MS7-records/sweep-minor7p.log" "$P9/MS7-rulings-proposed.json" --proposed
    python3 -I "$M/pass-10/H10-migrate-check.py" "$R"; echo "migrate-check exit $?"
    shasum "$P9/FV8-rulings.json" "$P9/MS7-rulings.json" "$P9/MS7-rulings-proposed.json"; } 2>&1 | tee "$REC/migrate.log"
  ;;
static)
  # H10-1 and H10-2 read directly on the real trees, for the record beside the self-test's rows.
  node deleted-mechanisms.mjs --root "$B/absent" --declare deletes-minor.json > "$REC/del-absent.log" 2>&1; echo "DEL absent root exit $?: $(tail -1 "$REC/del-absent.log")"
  node prose-sweep.mjs --root "$B/absent" --patch "$P9/minor-split-v7.patch" --declare deletes-minor.json > "$REC/sweep-absent.log" 2>&1; echo "SWEEP absent root exit $?: $(tail -1 "$REC/sweep-absent.log")"
  node deleted-mechanisms.mjs --root "$B/trees/fv8" --declare "$P9/FV8-records/declare-floor-v8.json" --patch "$P9/floor-v8.patch" > "$REC/del-fv8.log" 2>&1; echo "DEL fv8 exit $?: $(tail -1 "$REC/del-fv8.log")"
  node deleted-mechanisms.mjs --root "$B/trees/fv7" --declare "$P9/FV8-records/declare-floor-v8.json" --patch "$P9/floor-v8.patch" > "$REC/del-fv7-plant.log" 2>&1; echo "DEL fv7 (plant) exit $?: $(tail -1 "$REC/del-fv7-plant.log")"
  node deleted-mechanisms.mjs --root "$B/trees/minor7" --declare deletes-minor.json --patch "$P9/minor-split-v7.patch" > "$REC/del-minor7.log" 2>&1; echo "DEL minor7 exit $?: $(tail -1 "$REC/del-minor7.log")"
  node deleted-mechanisms.mjs --root "$B/h7trees/minor7" --declare deletes-minor.json > "$REC/del-H7-minor7.log" 2>&1; echo "DEL H7-3 minor7 exit $?: $(tail -1 "$REC/del-H7-minor7.log")"
  node prose-sweep.mjs --root "$B/trees/fv8" --patch "$P9/floor-v8.patch" --declare "$P9/FV8-records/declare-floor-v8.json" --rulings "$P9/FV8-rulings.json" > "$REC/sweep-fv8-ruled.log" 2>&1; echo "SWEEP fv8 ruled exit $?: $(tail -1 "$REC/sweep-fv8-ruled.log")"
  node prose-sweep.mjs --root "$B/trees/fv7" --patch "$P9/floor-v8.patch" --declare "$P9/FV8-records/declare-floor-v8.json" --rulings "$P9/FV8-rulings.json" > "$REC/sweep-fv7-plant.log" 2>&1; echo "SWEEP fv7 plant exit $?: $(tail -1 "$REC/sweep-fv7-plant.log")"
  node prose-sweep.mjs --root "$B/trees/minor7" --patch "$P9/minor-split-v7.patch" --declare deletes-minor.json --rulings "$P9/MS7-rulings.json" > "$REC/sweep-minor7-ruled.log" 2>&1; echo "SWEEP minor7 ruled exit $?: $(tail -1 "$REC/sweep-minor7-ruled.log")"
  node prose-sweep.mjs --root "$B/trees/minor7p" --patch "$P9/minor-split-v7.patch" --declare deletes-minor.json --rulings "$P9/MS7-rulings-proposed.json" > "$REC/sweep-minor7p-ruled.log" 2>&1; echo "SWEEP minor7p ruled exit $?: $(tail -1 "$REC/sweep-minor7p-ruled.log")"
  node launch-law.mjs > "$REC/law.log" 2>&1; echo "LAW exit $?: $(tail -1 "$REC/law.log")"
  ;;
selftest-h10)
  D3_OUT=$B/out node selftest.mjs --only H10-1,H10-2 $H9ARGS > "$REC/selftest-h10.log" 2>&1; echo "selftest H10 exit $?: $(tail -1 "$REC/selftest-h10.log")"
  ;;
selftest-all)
  D3_OUT=$B/out2 node selftest.mjs --only LAW,DEL,H7-1,H7-2,H7-3,H8-1,H8-2,H9-1,H9-2,H9-3,H9-4,H9-5,H9-6,H10-1,H10-2 $H7ARGS $H8ARGS $H9ARGS > "$REC/selftest-static-h6-h10.log" 2>&1; echo "selftest static exit $?: $(tail -1 "$REC/selftest-static-h6-h10.log")"
  ;;
esac
echo "== $1 end $(ts)" | tee -a "$REC/phases.log"
