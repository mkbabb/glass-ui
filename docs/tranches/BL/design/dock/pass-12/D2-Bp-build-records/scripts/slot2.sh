#!/bin/bash
# slot2.sh (D2 pass 12, BUILDER, §P11-7.3 items 1 and 3): one guarded slot per engine (Playwright WebKit under --exclusive webkit):
#   chk   the window tail's model read: lanes2.mjs on bp10c and bp12c alternating (lanetrace --units + checktrace), morph scene,
#         CHK rounds per theme (bp12c added 15:09, before the slot was admitted)
#   fmx   FM film·warm-expand and film·first-expand (harness/film.mjs, unchanged), bp10 and bp8 alternating, FMX rounds per theme
#   fmt   the same two sequences through fmtrace.mjs on bp10u, bp8u and bp12u alternating (bp12u added 15:09, before admission) (the cast hole read beside the scene's state), FMX rounds per theme
# Each read started at 1-min load <= 11 after a wait of at most 180 s (Chromium) / 60 s (WebKit).
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p12/Bp-build; OUT=$B/out
D=$G/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs; R=$D/pass-12/D2-Bp-build-records; S=$R/scripts
mkdir -p $R/chk $R/fmx $R/fmt
load1() { sysctl -n vm.loadavg | awk '{print $2}'; }
softload() { local t0=$SECONDS; while [ "$(echo "$(load1) > $1" | bc)" = 1 ] && [ $((SECONDS - t0)) -lt ${2:-180} ]; do sleep 10; done; }
SOFT=180; [ $E = webkit ] && SOFT=60
L=$B/seat.lock; until mkdir $L 2>/dev/null; do sleep 5; done; trap 'rmdir $L 2>/dev/null' EXIT
echo "slot2 $E admitted $(date '+%F %T') · $(uptime)"
for t in light dark; do
  TH=""; TE=""; [ $t = dark ] && { TH="--theme dark"; TE="env DOCK_HARNESS_THEME=dark"; }
  case " ${STEPS:-chk fmx fmt} " in *" chk "*)
  for k in $(seq 1 ${CHK:-6}); do for b in ${CHKB:-bp10c bp12c}; do softload 11 $SOFT; echo "$(date '+%T') chk $E $t $b r$k load $(load1)"
    node $S/lanes2.mjs --build $OUT/builds/$b --adapter $AD --engine $E $TH --runs 1 --scene morph --json $R/chk/morph-$E-$t-$b-r$k.json 2>&1 | tail -2; done; done;; esac
  case " ${STEPS:-chk fmx fmt} " in *" fmx "*)
  for k in $(seq 1 ${FMX:-10}); do for b in bp10 bp8; do softload 11 $SOFT; echo "$(date '+%T') fmx $E $t $b r$k load $(load1)"
    o=$OUT/fmx/$E-$t-$b-r$k
    (uptime; $TE node $H/film.mjs --build $OUT/builds/$b --adapter $AD --engine $E --cells '^film·(warm-expand|first-expand)$' --out $o; echo "exit $?"; uptime) > $R/fmx/fm-$E-$t-$b-r$k.log 2>&1
    (cd $o 2>/dev/null && find . -name 'strip-*.png' | while read -r f; do cp "$f" "$R/fmx/$E-$t-$b-r${k}_$(basename $f)"; done)
    j=$(find $o -name FM.json | head -1); [ -n "$j" ] && cp $j $R/fmx/fm-$E-$t-$b-r$k.json
  done; done;; esac
  case " ${STEPS:-chk fmx fmt} " in *" fmt "*)
  for k in $(seq 1 ${FMX:-10}); do for b in bp10u bp8u bp12u; do softload 11 $SOFT; echo "$(date '+%T') fmt $E $t $b r$k load $(load1)"
    node $S/fmtrace.mjs --build $OUT/builds/$b --adapter $AD --engine $E $TH --cells warm-expand,first-expand --out $OUT/fmt/$E-$t-$b-r$k --json $R/fmt/$E-$t-$b-r$k.json 2>&1 | tail -3
    for f in $OUT/fmt/$E-$t-$b-r$k/strip-*.png; do [ -f "$f" ] && cp "$f" "$R/fmt/$E-$t-$b-r${k}_$(basename $f)"; done
  done; done;; esac
done
echo "slot2 $E end $(date '+%F %T') · $(uptime)"
