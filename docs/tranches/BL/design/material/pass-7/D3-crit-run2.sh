#!/usr/bin/env bash
# D3-crit-run2.sh · D3 pass 7, the critic: the phases written after D3-crit-run.sh's first admission had started (a bash
# script is read by offset while it runs, so the running file was never edited again). Same worktree, same records.
#   bash D3-crit-run2.sh inner-c|inner-w|inner-l <phase>...
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p7/crit
W=$B/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
P7=$M/pass-7
REC=$P7/crit-records
FV6=$P7/floor-v6.patch
export D3_OUT=$W/.d3out
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
is() { git -C "$W" diff HEAD --binary | cmp -s - "$1" && echo "worktree = $(basename "$1")"; }

if [ "${1:-}" = inner-c ] || [ "${1:-}" = inner-w ] || [ "${1:-}" = inner-l ]; then
  case $1 in inner-w) EX="--timeout ${CRIT_TIMEOUT:-90} --exclusive webkit";; inner-l) EX="--light --timeout 30";; *) EX="--timeout ${CRIT_TIMEOUT:-90}";; esac
  shift; echo "queued $(ts) [$EX] for: $* (run2)" | tee -a "$REC/admissions.log"
  exec "$HOME/.claude/guard/guarded" $EX -- bash -c '
    echo "admitted $(date +%T) load $(sysctl -n vm.loadavg) for: $* (run2)" >> "'"$REC"'/admissions.log"
    for p in "$@"; do bash "$0" "$p" 2>&1 | tee -a "'"$REC"'/phase-$p.log"; done
    echo "ended $(date +%T) load $(sysctl -n vm.loadavg) for: $* (run2)" >> "'"$REC"'/admissions.log"' "$P7/D3-crit-run2.sh" "$@"
fi

phase=$1; shift
echo "== $phase start $(ts) (run2)" | tee -a "$REC/phases.log"
case $phase in
ring-read)
  # R-14 on the raw ring PNGs: the live M-3 (H7-1) beside my own reader (crit-ringpx.mjs), with the ink alpha each tree
  # paints the Close ring at (--ink-perimeter): floor v6 0.52 light / 0.60 dark (the reader's default); the minor 0.54 in
  # both themes (R-7; no dark override); HEAD 0.48 in both; the alpha-0.40 plant; the 1 px plant at floor v6's alpha.
  e=${ENG:-chromium}; [ -e "$D3_OUT/caps/fv6-dlg-$e" ] || ln -sfn "$D3_OUT/caps/fv6" "$D3_OUT/caps/fv6-dlg-$e"
  for c in fv6-dlg: minor5-dlg:0.54 head-dlg:0.48 fv6-ring040:0.40 fv6-ring1px:; do
    n=${c%%:*}; al=${c#*:}; [ -d "$D3_OUT/caps/$n-$e" ] || { echo "no capture $n-$e"; continue; }
    node "$H/m3-non-text.mjs" "$D3_OUT/caps/$n-$e" --gate $e --verbose --cells "dialog$" > "$REC/verbose/m3-$n-$e.txt" 2>&1; echo "M-3 $n $e: $(tail -1 "$REC/verbose/m3-$n-$e.txt")"
    node "$P7/crit-ringpx.mjs" "$D3_OUT/caps/$n-$e" --engine $e ${al:+--alpha $al} > "$REC/ringpx-$n-$e.log" 2>&1; echo "ringpx $n $e exit $?: $(grep -E '^SUM' "$REC/ringpx-$n-$e.log")"
  done
  ;;
rerun)
  # Every red cell's scenes re-captured twice on floor v6 and re-read (Chromium: held, ladder, dialog over black, white,
  # aurora, paper; Playwright WebKit: the light checker ladder, its one red row).
  is "$FV6" || exit 3
  e=${ENG:-chromium}
  if [ $e = chromium ]; then SC="--scenes held,ladder,dialog --grounds black,white,aurora,paper"; WS="m2-held-window m3-non-text m6-separable-ladder"; else SC="--themes light --scenes ladder --grounds checker"; WS="m3-non-text"; fi
  for n in 1 2; do
    node "$H/capture.mjs" "$D3_OUT/builds/fv6/dist" --out "$D3_OUT/caps/rerun-$e$n" --engines $e $SC > "$REC/rerun-$e$n-capture.log" 2>&1
    for w in $WS; do node "$H/$w.mjs" "$D3_OUT/caps/rerun-$e$n" --gate $e --verbose > "$REC/verbose/rerun-$e$n-$w.txt" 2>&1; echo "rerun $e $n $w $(ts): $(tail -1 "$REC/verbose/rerun-$e$n-$w.txt")"; done
  done
  ;;
refs-c)
  # G7's M-3 half and W-0.11 G6's under H7-1 on fresh pixels: HEAD's ladder, dialog, held and hostile cells, and the W-0.1
  # tree (the minor v5 with W-0.11's values backed out, pass-5/MS3-variants/w01ref.css), Chromium, light and dark. The
  # minor v5's own cells are fl14-c's `minor5-fl` capture (the same scenes plus halo and state).
  node "$H/capture.mjs" "$D3_OUT/builds/head/dist" --out "$D3_OUT/caps/head-full" --engines chromium --themes light,dark --scenes ladder,dialog,held,hostile > "$REC/cap-head-full.log" 2>&1; echo "head full exit $? $(ts)"
  node "$H/capture.mjs" "$D3_OUT/builds/minor5/dist" --out "$D3_OUT/caps/w01ref" --engines chromium --themes light,dark --scenes ladder,dialog,held,hostile --inject "$M/pass-5/MS3-variants/w01ref.css" > "$REC/cap-w01ref.log" 2>&1; echo "w01ref exit $? $(ts)"
  ;;
g7-read)
  for l in head-full w01ref minor5-fl; do for w in m2-text-contrast:m2 m3-non-text:m3 m6-separable-ladder:m6 m1-no-grey:m1; do
    node "$H/${w%%:*}.mjs" "$D3_OUT/caps/$l" --gate chromium --verbose > "$REC/verbose/${w##*:}-$l.txt" 2>&1; echo "$l ${w##*:}: $(tail -1 "$REC/verbose/${w##*:}-$l.txt")"; done; done
  g() { node "$M/pass-3/MS-g7.mjs" "$1" "$REC/verbose/$2" "$REC/verbose/$3" > "$REC/$4"; echo "$4: $(tail -1 "$REC/$4")"; }
  g m3 m3-head-full.txt m3-minor5-fl.txt g7-m3-H7.txt
  g m2 m2-head-full.txt m2-minor5-fl.txt g7-m2.txt
  g dark m6-head-full.txt m6-minor5-fl.txt g6-dark-raw.txt
  g m3 m3-w01ref.txt m3-minor5-fl.txt w011g6-m3-H7.txt
  g m2 m2-w01ref.txt m2-minor5-fl.txt w011g6-m2.txt
  ;;
esac
echo "== $phase end $(ts) (run2)" | tee -a "$REC/phases.log"
