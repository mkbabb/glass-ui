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
  local log=$1 w=$2 o=$3 cells=${4:-} s; s=$(script $w); [ "${s:0:1}" = / ] || s="$H/$s"
  uptime > "$log"
  if [ -n "$cells" ]; then node $s --build "$B" --adapter "$AD" --out "$o" --engine "$E" --cells "$cells" >> "$log" 2>&1
  else node $s --build "$B" --adapter "$AD" --out "$o" --engine "$E" >> "$log" 2>&1; fi
  (echo "exit $?"; uptime) >> "$log"
}
json() { find "$1/runs" -maxdepth 2 -name "$2.json" -path "*/$2-*" 2>/dev/null; }
one() { # stage witness
  local o="$OUT/$E/$BUILD/$1" log="$REC/$BUILD-$1-$2-$E.log" r
  run "$log" $2 "$o"
  r=$(node "$H/reds.mjs" $(json "$o" $2))
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
export -f run one stage script json extra; export OUT B AD REF H D E BUILD REC WT=${WT:-}
# H6-10 · per-witness estimates (minutes, Playwright WebKit with re-runs; pass-5/D2-Bp-crit-records/battery logs × 3)
est() { [ -n "${EST_MIN:-}" ] && { echo "$EST_MIN"; return; }; case $1 in CF) echo 21;; W3) echo 9;; *) echo 3;; esac; }
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
main) $G bash -c "stage main 'W3 ST R5 CF L1 FM W2 CASES'" ;;
rest) $G bash -c "stage rest 'W1 W4 W5 W6 W7 W8 R6'" ;;
dark) $G env DOCK_HARNESS_THEME=dark bash -c "stage dark 'ST FM W1 W3 W2 R5 CF'" ;;
darkrest) $G env DOCK_HARNESS_THEME=dark bash -c "stage darkrest 'W4 W5 W6 W7 W8 R6'" ;;
extra) $G bash -c extra ;;
esac
echo "exit $? · $(date) $(uptime)" > "$REC/stage-$BUILD-$STAGE-$E.txt"
(cd "$OUT/$E/$BUILD" 2>/dev/null && find . -name '[A-Z]*.json' -path '*runs*' | while read -r f; do mkdir -p "$REC/json/$BUILD-$E/$(dirname "$f")"; cp "$f" "$REC/json/$BUILD-$E/$f"; done)
