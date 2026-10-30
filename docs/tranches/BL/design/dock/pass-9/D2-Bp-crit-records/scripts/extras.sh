#!/bin/bash
# extras.sh (D2 pass 9, fresh critic of B′): the attack readings, none a row. Waits for chain.sh's CHAIN-DONE (one heavy
# run at a time for this seat). Every run guarded; browser runs never --light; Playwright WebKit under --exclusive webkit
# (queued, never cancelled).
#   fs    farside.mjs on bp8i (bp8 + one console line in arm()), Chromium: does any harness scene or demo dock reach
#         heir && de > 0 (the handoff switched off by a unit arriving on the far side)?
#   rt    W3 `retarget·40/80/120` alone, bp8 and bp7 alternating, five rounds per build, Playwright WebKit light, the
#         slot STARTED at a 1-minute load <= 12 (the battery read retarget·80 [splice] in W·l at 18.34 and 20.22): is the
#         splice load-borne, and is it the handoff's (bp7 in the same slot)? Then the same in Chromium light.
#   w3    W3 whole, Playwright WebKit, twice per theme, no load gate (R2's WebKit margin at the machine's load)
#   ab    `film·content-add` alone, bp8 and bp7 alternating, 5 rounds, light and dark, Chromium then Playwright WebKit
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p9/Bp-crit; OUT=$B/out
D=$G/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs
REC=$D/pass-9/D2-Bp-crit-records; S=$REC/scripts; GD=$HOME/.claude/guard/guarded; X=$REC/extras
mkdir -p $X/fs $X/ab $X/w3 $X/rt
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $REC/chain.log; }
load1() { sysctl -n vm.loadavg | awk '{print $2}'; }
waitload() { local t0=$(date +%s); while [ "$(echo "$(load1) > $1" | bc)" = 1 ]; do sleep 30; done
  L "admit $2 at load $(load1) (bound $1, waited $(( $(date +%s) - t0 )) s)"; }
until grep -q "CHAIN-DONE" $REC/chain.log 2>/dev/null; do sleep 60; done
has() { case " ${STEPS:-fs rt w3 ab} " in *" $1 "*) return 0;; esac; return 1; }
L "EXTRAS start (steps: ${STEPS:-all})"
if has fs; then
  L "start farside chromium"
  (uptime; $GD --timeout 30 -- node $S/farside.mjs --build $OUT/builds/bp8i --adapter $AD --engine chromium --json $X/fs/farside-chromium.json; echo "exit $?"; uptime) > $X/fs/farside-chromium.log 2>&1
  L "end farside chromium"
fi
RT='echo admitted $(date) $(uptime); for k in 1 2 3 4 5; do for b in bp8 bp7; do
      (uptime; node '$H'/w3-morph.mjs --build '$OUT'/builds/$b --adapter '$AD' --engine $E --cells "^retarget·(40|80|120)$" --out '$OUT'/rt/$E-$b-r$k; echo "exit $?"; uptime) > '$X'/rt/w3rt-$E-$b-r$k.log 2>&1
    done; done'
if has rt; then
  waitload 12 "rt webkit"
  L "queue retarget A/B webkit"
  $GD --exclusive webkit --timeout 60 -- env E=webkit bash -c "$RT" > $X/rt/slot-webkit.log 2>&1
  L "end retarget A/B webkit exit $?"
  waitload 12 "rt chromium"
  $GD --timeout 60 -- env E=chromium bash -c "$RT" > $X/rt/slot-chromium.log 2>&1
  L "end retarget A/B chromium exit $?"
fi
if has w3; then
  L "queue W3 webkit x2 per theme"
  $GD --exclusive webkit --timeout 60 -- bash -c "echo admitted \$(date) \$(uptime);
    for t in light dark; do for k in 1 2; do
      if [ \$t = dark ]; then TH='env DOCK_HARNESS_THEME=dark'; else TH=''; fi
      (uptime; \$TH node $H/w3-morph.mjs --build $OUT/builds/bp8 --adapter $AD --engine webkit --out $OUT/w3x/\$t-r\$k; echo \"exit \$?\"; uptime) > $X/w3/w3-webkit-\$t-r\$k.log 2>&1
    done; done" > $X/w3/slot-webkit.log 2>&1
  L "end W3 webkit exit $?"
fi
AB='echo admitted $(date) $(uptime); for t in light dark; do for k in 1 2 3 4 5; do for b in bp8 bp7; do
      if [ $t = dark ]; then TH="env DOCK_HARNESS_THEME=dark"; else TH=""; fi
      (uptime; $TH node '$H'/film.mjs --build '$OUT'/builds/$b --adapter '$AD' --engine $E --cells "^film·content-add$" --out '$OUT'/ab/$E-$t-$b-r$k; echo "exit $?"; uptime) > '$X'/ab/fm-$E-$t-$b-r$k.log 2>&1
    done; done; done'
if has ab; then
  L "start content-add A/B chromium"
  $GD --timeout 60 -- env E=chromium bash -c "$AB" > $X/ab/slot-chromium.log 2>&1
  L "end content-add A/B chromium exit $?"
  L "queue content-add A/B webkit"
  $GD --exclusive webkit --timeout 60 -- env E=webkit bash -c "$AB" > $X/ab/slot-webkit.log 2>&1
  L "end content-add A/B webkit exit $?"
fi
L "EXTRAS-DONE"
