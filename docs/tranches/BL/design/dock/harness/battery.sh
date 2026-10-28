#!/bin/bash
# battery.sh · the D2 battery runner (H5-9, pass-5/H5.md; after pass-4/D2-G-crit-records/run.sh).
#
#   BUILD=<label> ENG=chromium|webkit REC=<records dir> [WT=<tree>] bash battery.sh <out> <stage>
#     stage: main | rest | dark | darkrest | extra
#   <out>/builds/<label> is the route build (build.mjs --label <label>); <out>/builds/fv3 is L1's reference.
#   The adapter follows the label (head: adapter-head; fv3, bp: pass-3/adapter-floor-v2; g: pass-3/adapter-G-p3);
#   AD=<file> overrides it.
#
# Each stage runs in one guarded slot. ENG=webkit takes the machine-wide WebKit lock (--exclusive webkit); NOGUARD=1
# means the caller already holds the slot. Inside, the witnesses run one at a time; each is followed by two re-runs
# of its red cells. Three changes from pass 4 (H5-9):
#   · main's W3 runs its pixel faces pass (pass 4 ran main's W3 with --no-faces and the faces as a later stage; a
#     stage that ran out of time left the faces unread);
#   · the red cells come from the witness JSON (reds.mjs), so a cell turned red by the faces merge is re-run;
#   · the re-run pattern keeps each cell's control: ^(<cell>(·control)?|…)$.
# Plants: `node reds.mjs --selftest` (selftest witness RUN). Logs: $REC/<build>-<stage>-<W>-<ENG>[-rerun<k>].log;
# witness JSON copied to $REC/json/<build>-<ENG>/.
#
# H6-10 (pass-6/H6.md): stage `theme` (THEME=light|dark) runs every stage of one theme in ONE guarded slot (for WebKit,
# one --exclusive webkit slot per theme): light = main + rest, dark = dark + darkrest, the same witnesses, stage names
# and records as the four stages. Pass 5 queued the machine-wide WebKit lock once per stage or group, and the lock waits
# (70-105 min each) were most of a seat's wall clock (B′-crit §6, B′-proto §5); the witnesses ran in minutes. The slot
# splits only where the 90-min clamp requires: before each witness the slot compares its elapsed time plus that witness's
# estimate (EST, minutes: pass-5's measured WebKit time with its re-runs, × 3, floor 3) against BUDGET_MIN (default 80,
# under the guard's 90); when it would not fit, the slot ends and the rest queues as the next slot. DRYRUN=1 prints the
# slot plan from the estimates (EST_MIN=<n> sets every estimate) and runs nothing: the runner's plant
# (`node reds.mjs --selftest`).
#
# H7-3 (pass-7/H7.md): FM's six B2 cells (B2_CELLS) are re-run twice after every FM run, red or not, in every stage that
# runs FM (main and dark, both engines), so B2's hole is read from paint on the main run and both re-runs inside the
# battery. H8-1 (pass-8/H8.md) replaces H7-3's per-cell reading for `hole`: the digest reads the hole as a class per column
# (cells.mjs holeColumn); the re-runs stay, every read counts.
#
# H8-2 (pass-8/H8.md): stage `fmlow` (THEME=light|dark), the low-load B2 re-read, one slot per theme, three runs of the six
# B2 cells. The load gate is read at ADMISSION, not at queue time: the stage waits outside the lock for a 1-minute load at
# or under FMLOW_MAX (default 15; at most FMLOW_QUEUE_MIN minutes, default 90), queues the slot (WebKit: --exclusive
# webkit), and the slot's first act reads the load again. Above the bound the slot is DEFERRED: it runs no cell, releases
# the lock and re-queues after headroom, at most FMLOW_TRIES times (default 3). Every attempt is written to
# $REC/json/<build>-<eng>/fmlow-<theme>/admit.json; the digest reads the runs only when admit.json says admitted at or under
# the bound. Runs r1, r2, r3 land as runs/, rerun1/, rerun2/ (cells.mjs reads them as one column's reads); each cell logs
# its own load (FM's cell `load`), and uptime is logged between runs. FIXTURE=<name> runs a fixture in place of the build
# (the self-test's plants, BUILD=fixture-<name>).
set -u
OUT=$1; STAGE=$2
H=$(cd "$(dirname "$0")" && pwd); D=$(cd "$H/.." && pwd)
BUILD=${BUILD:?BUILD=<label>}; E=${ENG:?ENG=chromium|webkit}; REC=${REC:?REC=<records dir>}
case $BUILD in head) DA=$H/adapter-head.mjs;; g) DA=$D/pass-3/adapter-G-p3.mjs;; *) DA=$D/pass-3/adapter-floor-v2.mjs;; esac
AD=${AD:-$DA}; REF=$D/pass-3/adapter-floor-v2.mjs; B=$OUT/builds/$BUILD
mkdir -p "$REC"
export DOCK_HARNESS_BLOCK_TIMEOUT_MS=${DOCK_HARNESS_BLOCK_TIMEOUT_MS:-480000}
script() { case $1 in ST) echo stall.mjs;; W3) echo w3-morph.mjs;; FM) echo film.mjs;; R5) echo r5-hit.mjs;; W1) echo w1-corner.mjs;; W2) echo w2-run.mjs;; W4) echo w4-state.mjs;; W5) echo w5-rim.mjs;; W6) echo w6-collapsed-form.mjs;; W7) echo w7-edge.mjs;; W8) echo w8-motion.mjs;; R6) echo r6-probe.mjs;; CF) echo c-facility.mjs;; L1) echo "l1-light.mjs --ref-build $OUT/builds/fv3 --ref-adapter $REF";; CASES) echo "$D/pass-4/D2-Bp-proto-records/probes/cases.mjs";; esac; }
run() { # log witness out [cells]
  local log=$1 w=$2 o=$3 cells=${4:-} s tg; s=$(script $w); [ "${s:0:1}" = / ] || s="$H/$s"
  if [ -n "${FIXTURE:-}" ]; then tg="--fixture $FIXTURE"; else tg="--build $B --adapter $AD"; fi
  uptime > "$log"
  if [ -n "$cells" ]; then node $s $tg --out "$o" --engine "$E" --cells "$cells" >> "$log" 2>&1
  else node $s $tg --out "$o" --engine "$E" >> "$log" 2>&1; fi
  (echo "exit $?"; uptime) >> "$log"
}
json() { find "$1/runs" -maxdepth 2 -name "$2.json" -path "*/$2-*" 2>/dev/null; }
one() { # stage witness
  local o="$OUT/$E/$BUILD/$1" log="$REC/$BUILD-$1-$2-$E.log" r
  run "$log" $2 "$o"
  r=$(node "$H/reds.mjs" $(json "$o" $2))
  # H7-3 (pass-7/H7.md) · FM's six B2 cells are re-run twice on EVERY run, red or not, so the hole read from paint (H7-1)
  # is read three times per column inside the battery (pass 6's critic re-ran them outside it, fmre.sh)
  [ "$2" = FM ] && r="$B2_CELLS"
  echo "reds: ${r:-none}" >> "$log"
  if [ -n "$r" ]; then for k in 1 2; do run "$REC/$BUILD-$1-$2-$E-rerun$k.log" $2 "$o/rerun$k" "$r"; done; fi
}
stage() { for w in $2; do one $1 $w; done; }
extra() {
  [ -n "$WT" ] && (uptime; node "$H/prose.mjs" "$WT" --out "$OUT/$E/$BUILD/pr"; echo "exit $?"; uptime) > "$REC/$BUILD-extra-PR.log" 2>&1
  (uptime; node "$H/adapter-law.mjs" "$AD"; echo "exit $?") > "$REC/$BUILD-extra-adapter-law.log" 2>&1
}
X=""; [ "$E" = webkit ] && X="--exclusive webkit"
G="$HOME/.claude/guard/guarded $X --timeout ${TMIN:-90} --"
[ -n "${NOGUARD:-}" ] && G=""
B2_CELLS='^film·(first-expand|warm-expand|warm-collapse|content-add|swap-short|swap-long)$'
load1() { sysctl -n vm.loadavg | awk '{print $2}'; }
lowslot() { # H8-2 · inside the slot: the admission read, then r1-r3 of the B2 cells, or DEFERRED
  local l o="$OUT/$E/$BUILD/fmlow-$THEME" k; l=$(load1)
  echo "$(date '+%F %T') $l" > "$ADM.now"
  if [ "$(echo "$l > $FMLOW_MAX" | bc)" = 1 ]; then echo "deferred: admitted at load $l > $FMLOW_MAX" >> "$REC/$BUILD-fmlow-$THEME-FM-$E.log"; return 0; fi
  echo admitted >> "$ADM.now"
  for k in 1 2 3; do run "$REC/$BUILD-fmlow-$THEME-FM-$E-r$k.log" FM "$o$([ $k -gt 1 ] && echo /rerun$((k - 1)))" "$B2_CELLS"; done
}
export -f run one stage script json extra load1 lowslot; export OUT B AD REF H D E BUILD REC WT=${WT:-} B2_CELLS FIXTURE=${FIXTURE:-}
# H6-10 · per-witness estimates (minutes, Playwright WebKit with re-runs; pass-5/D2-Bp-crit-records/battery logs × 3).
# H7-3: FM runs three times on every run (main + two re-runs), so its estimate is three runs' worth
est() { [ -n "${EST_MIN:-}" ] && { echo "$EST_MIN"; return; }; case $1 in CF) echo 21;; W3) echo 9;; FM) echo 9;; *) echo 3;; esac; }
themed() { # runs "<stage>:<W> …" in order inside one slot; on a budget stop writes the rest to $REM and exits 75
  local t0=$SECONDS item st w left=() stop=
  for item in $SEG; do
    if [ -n "$stop" ]; then left+=("$item"); continue; fi
    st=${item%%:*}; w=${item#*:}
    if [ $(( (SECONDS - t0) / 60 + $(est $w) )) -gt "${BUDGET_MIN:-80}" ]; then stop=1; left+=("$item"); continue; fi
    one "$st" "$w"
  done
  if [ ${#left[@]} -gt 0 ]; then echo "${left[*]}" > "$REM"; exit 75; fi
}
segs() { # theme → "<stage>:<W> …"
  if [ "$1" = dark ]; then for w in ST FM W1 W3 W2 R5 CF; do printf 'dark:%s ' $w; done; for w in W4 W5 W6 W7 W8 R6; do printf 'darkrest:%s ' $w; done
  else for w in W3 ST R5 CF L1 FM W2 CASES; do printf 'main:%s ' $w; done; for w in W1 W4 W5 W6 W7 W8 R6; do printf 'rest:%s ' $w; done; fi
}
plan() { # DRYRUN: the slots the estimates give, one line per slot
  local k=1 used=0 line="" item w e
  for item in $SEG; do w=${item#*:}; e=$(est $w)
    if [ $((used + e)) -gt "${BUDGET_MIN:-80}" ] && [ -n "$line" ]; then echo "slot $k:$line"; k=$((k + 1)); used=0; line=""; fi
    used=$((used + e)); line="$line $item"; done
  [ -n "$line" ] && echo "slot $k:$line"
}
export -f est themed
case $STAGE in
theme)
  THEME=${THEME:-light}; REM=$REC/remain-$BUILD-$THEME-$E.txt; SEG=${SEG:-$(segs $THEME)}; export REM
  if [ -n "${DRYRUN:-}" ]; then plan; exit 0; fi
  k=0
  while :; do
    k=$((k + 1)); rm -f "$REM"; export SEG
    echo "$(date) slot $k $BUILD $E $THEME [$SEG] · $(uptime)" >> "$REC/slots.log"
    if [ "$THEME" = dark ]; then $G env DOCK_HARNESS_THEME=dark bash -c themed; else $G bash -c themed; fi
    echo "$(date) slot $k end exit $? · $(uptime)" >> "$REC/slots.log"
    [ -s "$REM" ] || break
    SEG=$(cat "$REM")
  done
  STAGE=theme-$THEME ;;
fmlow)
  THEME=${THEME:-light}; FMLOW_MAX=${FMLOW_MAX:-15}; STAGE=fmlow-$THEME
  J=$REC/json/$BUILD-$E/fmlow-$THEME; mkdir -p "$J"; ADM=$J/admit; export THEME FMLOW_MAX ADM
  rm -rf "$OUT/$E/$BUILD/fmlow-$THEME"; atts=""; ok=false
  for t in $(seq 1 "${FMLOW_TRIES:-3}"); do
    q0=$SECONDS; while [ "$(echo "$(load1) > $FMLOW_MAX" | bc)" = 1 ] && [ $(( (SECONDS - q0) / 60 )) -lt "${FMLOW_QUEUE_MIN:-90}" ]; do sleep 30; done
    echo "$(date) fmlow $BUILD $E $THEME try $t queued at load $(load1) · $(uptime)" >> "$REC/slots.log"
    rm -f "$ADM.now"
    if [ "$THEME" = dark ]; then $G env DOCK_HARNESS_THEME=dark bash -c lowslot; else $G bash -c lowslot; fi
    read -r d tm l < "$ADM.now" 2>/dev/null || l=null
    a=$(grep -c admitted "$ADM.now" 2>/dev/null)
    echo "$(date) fmlow try $t admitted at load $l: $([ "$a" = 1 ] && echo READ || echo DEFERRED) · $(uptime)" >> "$REC/slots.log"
    atts="$atts${atts:+,}{\"try\":$t,\"at\":\"$d $tm\",\"load\":$l,\"deferred\":$([ "$a" = 1 ] && echo false || echo true)}"
    if [ "$a" = 1 ]; then ok=true; break; fi
  done
  rm -f "$ADM.now"
  echo "{\"stage\":\"fmlow-$THEME\",\"build\":\"$BUILD\",\"engine\":\"$E\",\"max\":$FMLOW_MAX,\"deferred\":$([ $ok = true ] && echo false || echo true),\"load\":$(echo "$atts" | sed -E 's/.*"load":([^,}]*).*/\1/'),\"attempts\":[$atts]}" > "$J/admit.json"
  ;;
main) $G bash -c "stage main 'W3 ST R5 CF L1 FM W2 CASES'" ;;
rest) $G bash -c "stage rest 'W1 W4 W5 W6 W7 W8 R6'" ;;
dark) $G env DOCK_HARNESS_THEME=dark bash -c "stage dark 'ST FM W1 W3 W2 R5 CF'" ;;
darkrest) $G env DOCK_HARNESS_THEME=dark bash -c "stage darkrest 'W4 W5 W6 W7 W8 R6'" ;;
extra) $G bash -c extra ;;
esac
echo "exit $? · $(date) $(uptime)" > "$REC/stage-$BUILD-$STAGE-$E.txt"
(cd "$OUT/$E/$BUILD" 2>/dev/null && find . -name '[A-Z]*.json' -path '*runs*' | while read -r f; do mkdir -p "$REC/json/$BUILD-$E/$(dirname "$f")"; cp "$f" "$REC/json/$BUILD-$E/$f"; done)
