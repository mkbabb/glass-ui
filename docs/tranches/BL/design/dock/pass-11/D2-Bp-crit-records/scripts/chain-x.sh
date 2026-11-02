#!/bin/bash
# chain-x.sh (D2 pass 11, fresh CRITIC of D2-B′; readings beside the rows, none turns a row). Added at 08:45, after the battery
# digest, for the two reds the battery showed; it starts only when chain.sh has ended (one heavy run at a time per seat):
#   cr    the battery's W·d W3 `content-remove` FAIL [window] (Q-4 (c) "closed 44 ms after landing", main 11.35, re-run 2 8.51;
#         P3 FAIL on the ruled digest): W3 `content-remove` alone, bp10 and bp8 alternating, 8 rounds, each read started at
#         load <= 11 after a wait of at most 180 s Chromium / 60 s WebKit; the witness JSON kept per read (window open, land,
#         close). Is it the build's, and how often?
#   fmx   the battery's W·l `fmlow` r2 `film·warm-expand` hole (seat 2 at ink 0.03 for two cast frames at +120 ms, load 9.29;
#         H8-1 reads one read as NOT-REPRODUCED): FM `film·warm-expand` and `film·first-expand`, bp10 and bp8 alternating,
#         10 rounds, Playwright WebKit only, strips kept. How often does the run show a hole, on which build?
#   e240  (added 10:45, before this chain started) the edge sweep's two Playwright WebKit light `stub` reads at retarget·240
#         (r1 10.47, r2 9.55; sweep.mjs keeps no glyph): sweep2.mjs (sweep.mjs with the stub's glyph, edge and plate kept) at
#         N 230-250 by 2, bp10 2 runs, bp8 1 run, in each WebKit slot
# Every run guarded, browser runs never --light, Playwright WebKit under --exclusive webkit (queued, never cancelled). One slot per
# engine and theme for WebKit; the two Chromium themes share one slot.
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p11/Bp-crit; OUT=$B/out
D=$G/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs
REC=$D/pass-11/D2-Bp-crit-records; GD=$HOME/.claude/guard/guarded
mkdir -p $REC/cr $REC/fmx
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $REC/chain.log; }
load1() { sysctl -n vm.loadavg | awk '{print $2}'; }
waitload() { local t0=$(date +%s); while [ "$(echo "$(load1) > $1" | bc)" = 1 ]; do sleep 30; done; L "start-gate $2 at load $(load1) (bound $1, waited $(( $(date +%s) - t0 )) s)"; }
softload() { local t0=$SECONDS; while [ "$(echo "$(load1) > $1" | bc)" = 1 ] && [ $((SECONDS - t0)) -lt ${2:-180} ]; do sleep 10; done; }
export G B OUT D H AD REC
export -f load1 softload
[ -n "${WAITPID:-}" ] && { while kill -0 $WAITPID 2>/dev/null; do sleep 30; done; }
L "CHAIN-X start; harness $(cd $D && find harness -type f | sort | xargs shasum -a 256 | shasum -a 256 | cut -c1-16)"
cr() { E=$1; t=$2; TE=""; [ $t = dark ] && TE="env DOCK_HARNESS_THEME=dark"; SOFT=180; [ $E = webkit ] && SOFT=60
  echo "cr $E $t start $(date '+%F %T') · $(uptime)"
  for k in 1 2 3 4 5 6 7 8; do for b in bp10 bp8; do
    softload 11 $SOFT
    (uptime; $TE node $H/w3-morph.mjs --build $OUT/builds/$b --adapter $AD --engine $E --cells '^content-remove(·control)?$' --out $OUT/cr/$E-$t-$b-r$k; echo "exit $?"; uptime) > $REC/cr/w3cr-$E-$t-$b-r$k.log 2>&1
    j=$(find $OUT/cr/$E-$t-$b-r$k -name W3.json | head -1); [ -n "$j" ] && cp $j $REC/cr/w3cr-$E-$t-$b-r$k.json
  done; done; echo "cr $E $t end $(date '+%F %T') · $(uptime)"; }
fmx() { E=$1; t=$2; TE=""; [ $t = dark ] && TE="env DOCK_HARNESS_THEME=dark"
  echo "fmx $E $t start $(date '+%F %T') · $(uptime)"
  for k in 1 2 3 4 5 6 7 8 9 10; do for b in bp10 bp8; do
    o=$OUT/fmx/$E-$t-$b-r$k
    (uptime; $TE node $H/film.mjs --build $OUT/builds/$b --adapter $AD --engine $E --cells '^film·(warm-expand|first-expand)$' --out $o; echo "exit $?"; uptime) > $REC/fmx/fm-$E-$t-$b-r$k.log 2>&1
    (cd $o 2>/dev/null && find . -name 'strip-*.png' | while read -r f; do cp "$f" "$REC/fmx/$E-$t-$b-r${k}_$(basename $f)"; done)
  done; done; echo "fmx $E $t end $(date '+%F %T') · $(uptime)"; }
e240() { E=$1; t=$2; TH=""; [ $t = dark ] && TH="--theme dark"; mkdir -p $REC/e240
  echo "e240 $E $t start $(date '+%F %T') · $(uptime)"
  node $REC/scripts/sweep2.mjs --build $OUT/builds/bp10 --adapter $AD --engine $E $TH --from 230 --to 250 --step 2 --runs 2 --json $REC/e240/bp10-$E-$t.json > $REC/e240/bp10-$E-$t.log 2>&1
  node $REC/scripts/sweep2.mjs --build $OUT/builds/bp8 --adapter $AD --engine $E $TH --from 230 --to 250 --step 2 --runs 1 --json $REC/e240/bp8-$E-$t.json > $REC/e240/bp8-$E-$t.log 2>&1
  echo "e240 $E $t end $(date '+%F %T') · $(uptime)"; }
export -f cr fmx e240
waitload 20 "x chromium"; L "queue x chromium (cr light, cr dark)"
$GD --timeout 88 -- bash -c "cr chromium light; cr chromium dark" > $REC/slot-x-chromium.log 2>&1
L "end x chromium exit $?"
for t in light dark; do
  waitload 20 "x webkit $t"; L "queue x webkit $t (cr, e240, fmx)"
  $GD --exclusive webkit --timeout 88 -- bash -c "cr webkit $t; e240 webkit $t; fmx webkit $t" > $REC/slot-x-webkit-$t.log 2>&1
  L "end x webkit $t exit $?"
done
L "CHAIN-X-DONE"
