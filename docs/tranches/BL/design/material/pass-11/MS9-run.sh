#!/usr/bin/env bash
# MS9-run.sh · D3 pass 11, the minor split v9 (REGISTRY P10-6.3 step 3): every command this seat ran, by phase.
# minor v9 = pass-10/minor-split-v8.patch + R-29 = pass-10/MS8-r26-proposed.diff (sha1 6e095ae9: ladder.css:298,
# sizing.css:258-259; CSS comments only), nothing else, written whole as pass-11/minor-split-v9.patch; the delta as cut
# from the worktree is pass-11/minor-split-v9-R29.diff. Rulings: pass-11/MS9-rulings.json = pass-10/MS8-rulings-proposed.json,
# copied forward byte for byte. Owner rulings: INBOUND O-103 (R-21 (b), Q-1 a, Q-3 a, Q-11 a + grey content accepted,
# Q-14 a) replaces the driver's defaults; the minor builds no owner option either way.
# One worktree (.claude/worktrees/bl/D3/p11/minor9/wt); the minor v9 is applied by default, and a phase that needs the
# minor v8 or HEAD swaps the patch and swaps it back, each swap checked with cmp (or a clean git status at HEAD).
# Builds and caches live in $W/.d3out and $W/.cache-m9. Records land in pass-11/MS9-records/.
# No phase launches a browser. Each phase: `~/.claude/guard/guarded [--light] --timeout N -- bash MS9-run.sh <phase>`.
#   --light: setup patch check trees static sweep nbhd ratchet teardown        heavy: same bite toolchain
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p11/minor9
W=$B/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
P10=$M/pass-10
P11=$M/pass-11
REC=$P11/MS9-records
MS8=$P10/minor-split-v8.patch
R29=$P10/MS8-r26-proposed.diff
MS9=$P11/minor-split-v9.patch
D29=$P11/minor-split-v9-R29.diff
RUL=$P11/MS9-rulings.json
export D3_OUT=$W/.d3out
mkdir -p "$REC"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
is() { git -C "$W" diff HEAD --binary | cmp -s - "$1" && echo "worktree = $(basename "$1")"; }
swap() { is "$1" >/dev/null && git -C "$W" apply -R "$1" 2>/dev/null && git -C "$W" apply "$2" 2>/dev/null; is "$2" || exit 3; }
to_head() { is "$1" >/dev/null && git -C "$W" apply -R "$1" 2>/dev/null && test -z "$(git -C "$W" status --porcelain -- src demo tests DESIGN.md)" && echo "worktree = HEAD" || exit 3; }
from_head() { test -z "$(git -C "$W" status --porcelain -- src demo tests DESIGN.md)" && git -C "$W" apply "$1" 2>/dev/null; is "$1" || exit 3; }
radii() { grep -E -- '--glass-blur-(wash|quiet|resting|floating|overlay)-radius:' "$W/src/styles/tokens/glass.css" | sed 's/^ *//'; }
cuttree() { rm -rf "$B/trees/$1"; mkdir -p "$B/trees/$1"; cp -R "$W/src" "$W/demo" "$W/tests" "$W/DESIGN.md" "$B/trees/$1/"; mkdir -p "$B/trees/$1/docs"; cp -R "$W/docs/canon" "$B/trees/$1/docs/"; cp "$W"/*.md "$B/trees/$1/" 2>/dev/null; true; }
FILES="src/styles/glass/ladder.css src/styles/tokens/sizing.css"
phase=$1; shift
echo "== $phase start $(ts)" | tee -a "$REC/phases.log"
case $phase in
setup)
  # The worktree at HEAD, node_modules symlinked, the minor v8 applied (cmp-checked); trees/minor8 cut before any edit.
  mkdir -p "$B"; git -C "$R" worktree add --detach "$W" HEAD && ln -s "$R/node_modules" "$W/node_modules"
  echo "worktree HEAD $(git -C "$W" rev-parse --short=9 HEAD)" | tee "$REC/setup.log"
  from_head "$MS8" | tee -a "$REC/setup.log"
  cuttree minor8; ls "$B/trees" | tee -a "$REC/setup.log"
  ;;
patch)
  # The worktree holds the minor v8. R-29: apply MS8-r26-proposed.diff as banked. Write minor-split-v9.patch and the
  # worktree delta (minor v8 -> minor v9); check minor v8 + delta = minor v9 byte for byte; the worktree delta's hunk
  # ranges and +/- lines equal R-29's; path list equal to the minor v8's; line counts kept; no .vue file.
  is "$MS8" || exit 3
  git -C "$W" apply "$R29" || exit 4
  git -C "$W" diff HEAD --binary > "$MS9"
  D=$B/r29; rm -rf "$D"; mkdir -p "$D/a" "$D/b"
  for f in $FILES; do mkdir -p "$D/b/$(dirname "$f")"; cp "$W/$f" "$D/b/$f"; done
  swap "$MS9" "$MS8"; for f in $FILES; do mkdir -p "$D/a/$(dirname "$f")"; cp "$W/$f" "$D/a/$f"; done
  (cd "$D" && git diff --no-index a b) | sed -e 's#^diff --git a/a/#diff --git a/#' -e 's# b/b/# b/#' -e 's#^--- a/a/#--- a/#' -e 's#^+++ b/b/#+++ b/#' > "$D29"
  git -C "$W" apply "$D29" && git -C "$W" diff HEAD --binary | cmp - "$MS9" && echo "minor-split-v8.patch + minor-split-v9-R29.diff = minor-split-v9.patch (cmp)" | tee "$REC/patch.log"
  is "$MS9" || exit 3
  ;;
patchlog)
  is "$MS9" || exit 3
  { swap "$MS9" "$MS8" >/dev/null; git -C "$W" apply "$R29" && git -C "$W" diff HEAD --binary | cmp - "$MS9" && echo "minor-split-v8.patch + MS8-r26-proposed.diff (as banked) = minor-split-v9.patch (cmp)"; is "$MS9"
    echo "minor-split-v9-R29.diff: $(grep -c '^diff --git' "$D29") files, +$(grep -c '^+[^+]' "$D29")/-$(grep -c '^-[^-]' "$D29"), sha1 $(shasum "$D29" | cut -c1-8)"
    echo "MS8-r26-proposed.diff (R-29): $(grep -c '^diff --git' "$R29") files, +$(grep -c '^+[^+]' "$R29")/-$(grep -c '^-[^-]' "$R29"), sha1 $(shasum "$R29" | cut -c1-8)"
    diff <(grep -E '^(@@|[-+][^-+])' "$R29") <(grep -E '^(@@|[-+][^-+])' "$D29") > /dev/null; echo "R-29 delta vs the worktree delta, hunk ranges and +/- lines: diff exit $?"
    echo "minor-split-v8.patch: $(grep -c '^diff --git' "$MS8") files, sha1 $(shasum "$MS8" | cut -c1-8)"
    echo "minor-split-v9.patch: $(grep -c '^diff --git' "$MS9") files, sha1 $(shasum "$MS9" | cut -c1-8); git diff --shortstat: $(git -C "$W" diff HEAD --shortstat)"
    echo "-- path list, minor v8 vs minor v9 (prints nothing = equal)"; diff <(git -C "$R" apply --numstat "$MS8" | cut -f3 | sort) <(git -C "$R" apply --numstat "$MS9" | cut -f3 | sort); echo "paths diff exit $?"
    echo "-- line counts per R-29 file, minor v8 -> minor v9"
    for f in $FILES; do echo "   $f $(wc -l < "$B/trees/minor8/$f" | tr -d ' ') -> $(wc -l < "$W/$f" | tr -d ' ')"; done
    echo "-- .vue files in the R-29 delta: $(grep '^diff --git' "$D29" | grep -c '\.vue ')"
    echo "-- the R-29 delta's changed lines"; grep -E '^[-+][^-+]' "$D29"
    echo "-- every changed line of the delta sits inside a CSS block comment (minor v8 -> minor v9, difflib; comment state read on the minor v9 file)"
    for f in $FILES; do python3 -I -c '
import sys, difflib
a=open(sys.argv[1]).read().split("\n"); b=open(sys.argv[2]).read().split("\n")
inside=False; state=[]
for ln in b:
    start=inside; i=0
    while i < len(ln):
        if not inside and ln.startswith("/*", i): inside=True; i+=2; continue
        if inside and ln.startswith("*/", i): inside=False; i+=2; continue
        i+=1
    state.append(start or "/*" in ln)
for op,i1,i2,j1,j2 in [o for o in difflib.SequenceMatcher(None,a,b,autojunk=False).get_opcodes() if o[0]!="equal"]:
    for j in range(j1,j2):
        print("   ", sys.argv[3]+":"+str(j+1), "in comment" if state[j] else "CODE")
' "$B/trees/minor8/$f" "$W/$f" "$f"; done
  } 2>&1 | tee -a "$REC/patch.log"
  ;;
check)
  to_head "$MS9"; git -C "$W" apply --check "$MS9"; echo "git apply --check minor-split-v9.patch at $(git -C "$W" rev-parse --short=9 HEAD) (worktree) exit $?" | tee "$REC/check.log"; from_head "$MS9" | tee -a "$REC/check.log"
  git -C "$R" apply --check "$MS9"; echo "git apply --check minor-split-v9.patch at $(git -C "$R" rev-parse --short=9 HEAD) (checkout, read only) exit $?" | tee -a "$REC/check.log"
  echo "10.1.0 source diff 1da7eb17b..HEAD (empty = none): [$(git -C "$R" diff --stat 1da7eb17b HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon | tail -1)]" | tee -a "$REC/check.log"
  ;;
trees)
  # trees/minor9 (the sweep's and DEL's scope) and h7trees/ (src/ demo/ only, H7-3's scope) for minor8, minor9.
  is "$MS9" || exit 3
  cuttree minor9
  for t in minor8 minor9; do rm -rf "$B/h7trees/$t"; mkdir -p "$B/h7trees/$t"; cp -R "$B/trees/$t/src" "$B/trees/$t/demo" "$B/h7trees/$t/"; done
  ls "$B/trees" "$B/h7trees" | tee "$REC/trees.log"
  ;;
static)
  # H7-3 (deletes-minor.json, H7's scope, no patch); DEL with H9-H11 over the minor's own patch (fixture minor v9 at 0;
  # the minor v8 under the same; H10-1 the absent root); LAW; census and its bite; HOV; LIT; ladder; FL-14 static.
  is "$MS9" || exit 3
  for t in h7trees/minor8 h7trees/minor9 trees/minor8 trees/minor9; do test -d "$B/$t/src" || { echo "MISSING TREE $t"; exit 5; }; done
  cd "$H"
  { echo "-- H7-3, deletes-minor.json ($(python3 -I -c 'import json,sys; d=json.load(open(sys.argv[1])); print(len(d["names"]), "names,", len(d.get("exact", [])), "sites")' deletes-minor.json)), H7 scope (src/ demo/), no patch"
    for t in minor9 minor8; do node deleted-mechanisms.mjs --root "$B/h7trees/$t" --declare deletes-minor.json > "$REC/del-H7-$t.log" 2>&1; echo "DEL H7-3 $t exit $?: $(tail -1 "$REC/del-H7-$t.log")"; done
    echo "-- DEL with H9-H11 over the minor's own patch (src/ demo/ tests/ + every touched path)"
    node deleted-mechanisms.mjs --root "$B/trees/minor9" --declare deletes-minor.json --patch "$MS9" > "$REC/del-minor9.log" 2>&1; echo "DEL minor9 + v9 patch exit $?: $(tail -1 "$REC/del-minor9.log")"; grep -E 'text files|names=' "$REC/del-minor9.log" | head -3
    node deleted-mechanisms.mjs --root "$B/trees/minor8" --declare deletes-minor.json --patch "$MS9" > "$REC/del-minor8-under-v9.log" 2>&1; echo "DEL minor8 + v9 patch exit $?: $(tail -1 "$REC/del-minor8-under-v9.log")"
    node deleted-mechanisms.mjs --root "$B/trees/minor8" --declare deletes-minor.json --patch "$MS8" > "$REC/del-minor8.log" 2>&1; echo "DEL minor8 + v8 patch (pass 10's read) exit $?: $(tail -1 "$REC/del-minor8.log")"
    node deleted-mechanisms.mjs --root "$B/absent" --declare deletes-minor.json --patch "$MS9" > "$REC/del-absent.log" 2>&1; echo "DEL absent root (H10-1) exit $?: $(tail -1 "$REC/del-absent.log")"
    node launch-law.mjs > "$REC/law.log" 2>&1; echo "LAW exit $?: $(tail -1 "$REC/law.log")"
    node "$M/pass-4/lighting-census.mjs" "$W" > "$REC/census-minor9.log" 2>&1; echo "census minor9 exit $?: $(tail -1 "$REC/census-minor9.log")"
    t=$B/v1010; rm -rf "$t"; mkdir -p "$t"; git -C "$R" archive v10.1.0 src/styles | tar -x -C "$t"
    node "$M/pass-4/lighting-census.mjs" "$t" > "$REC/census-v1010.log" 2>&1; echo "census v10.1.0 exit $?: $(tail -1 "$REC/census-v1010.log")"; rm -rf "$t"
    node hover-fill-selected.mjs --root "$W" > "$REC/HOV-minor9.log" 2>&1; echo "HOV exit $?: $(tail -1 "$REC/HOV-minor9.log")"
    node lighting-literals.mjs --root "$W" > "$REC/LIT-static-minor9.log" 2>&1; echo "LIT exit $?: $(grep -o 'LIGHTING-LITERALS.*' "$REC/LIT-static-minor9.log" | tail -1)"
    radii > "$REC/radii-minor9.txt"; echo "-- LADDER diff radii-minor9 pass-10 radii-minor8 (prints nothing)"; diff "$REC/radii-minor9.txt" "$P10/MS8-records/radii-minor8.txt"; echo "LADDER exit $?"
    echo "-- FL-14 static: @utility glass-plate declares isolation"; sed -n '/^@utility glass-plate/,/^}/p' "$W/src/styles/glass/veil.css" | grep -n "isolation"
    echo "-- identifiers on R-29's removed and added lines (comments only)"
    grep -E '^[-+][^-+]' "$D29" | grep -oE -- '--[a-z][a-z0-9-]+|data-[a-z-]+' | sort | uniq -c | sort -rn
  } 2>&1 | tee "$REC/static.log"
  ;;
sweep)
  # R-21 (b) under R-26 and R-30: the frozen list over every file the minor v9's patch touches; read back under
  # MS9-rulings.json (= MS8-rulings-proposed.json, copied forward byte for byte); plants: the minor v8 under the same
  # (R-29's four lines unread), the minor v9 under MS8-rulings.json (H10-2: the two sizing.css lines read stale);
  # SWEEP on an absent root.
  cd "$H"
  { cmp "$P10/MS8-rulings-proposed.json" "$RUL" && echo "MS9-rulings.json = MS8-rulings-proposed.json (cmp), sha1 $(shasum "$RUL" | cut -c1-8)"
    node prose-sweep.mjs --root "$B/trees/minor9" --patch "$MS9" --declare deletes-minor.json > "$REC/sweep-minor9.log" 2>&1; echo "SWEEP minor9 LIST exit $?: $(tail -1 "$REC/sweep-minor9.log")"
    node prose-sweep.mjs --root "$B/trees/minor9" --patch "$MS9" --declare deletes-minor.json --rulings "$RUL" > "$REC/sweep-minor9-ruled.log" 2>&1; echo "SWEEP minor9 under MS9-rulings.json exit $?: $(tail -1 "$REC/sweep-minor9-ruled.log")"; grep -E '^SWEEP ' "$REC/sweep-minor9-ruled.log"
    node prose-sweep.mjs --root "$B/trees/minor8" --patch "$MS9" --declare deletes-minor.json --rulings "$RUL" > "$REC/sweep-minor8-plant.log" 2>&1; echo "SWEEP minor8 under MS9-rulings.json (plant) exit $?: $(tail -1 "$REC/sweep-minor8-plant.log")"
    node prose-sweep.mjs --root "$B/trees/minor9" --patch "$MS9" --declare deletes-minor.json --rulings "$P10/MS8-rulings.json" > "$REC/sweep-minor9-under-ms8.log" 2>&1; echo "SWEEP minor9 under MS8-rulings.json (H10-2 plant) exit $?: $(tail -1 "$REC/sweep-minor9-under-ms8.log")"
    grep -E "✗" "$REC/sweep-minor9-ruled.log" "$REC/sweep-minor8-plant.log" "$REC/sweep-minor9-under-ms8.log" | sed "s#$REC/##"
    node prose-sweep.mjs --root "$B/absent" --patch "$MS9" --declare deletes-minor.json > "$REC/sweep-absent.log" 2>&1; echo "SWEEP absent root exit $?: $(tail -1 "$REC/sweep-absent.log")"
    if test -f "$P11/MS9-rulings-seat.json"; then
      node prose-sweep.mjs --root "$B/trees/minor9" --patch "$MS9" --declare deletes-minor.json --rulings "$P11/MS9-rulings-seat.json" > "$REC/sweep-minor9-seat.log" 2>&1; echo "SWEEP minor9 under MS9-rulings-seat.json exit $?: $(tail -1 "$REC/sweep-minor9-seat.log")"; grep -E '^SWEEP ' "$REC/sweep-minor9-seat.log"
    fi
  } 2>&1 | tee "$REC/sweep.log"
  ;;
nbhd)
  # H11-2's print (R-30's reading aid, not gated) over the minor v9 with its own patch; then which printed-list lines it
  # reaches; and the print over the minor v8 (H11's banked minor8 read) for the tally diff.
  is "$MS9" || exit 3
  cd "$H"
  { node neighbourhood.mjs --root "$B/trees/minor9" --patch "$MS9" > "$REC/neighbourhood-minor9.log" 2>&1; echo "NEIGHBOURHOOD minor9 exit $?: $(tail -1 "$REC/neighbourhood-minor9.log")"; grep '^NEIGHBOURHOOD' "$REC/neighbourhood-minor9.log"
    grep -oE '^[^ ]+:[0-9]+ \[' "$REC/neighbourhood-minor9.log" | sed 's/ \[$//' | sort -u > "$B/nb.txt"
    grep -oE '^· [^ ]+:[0-9]+' "$REC/sweep-minor9.log" | sed 's/^· //' | sort -u > "$B/sw.txt"
    comm -12 "$B/nb.txt" "$B/sw.txt" > "$REC/printed-in-neighbourhood-minor9.txt"; echo "printed-list lines the neighbourhood print reaches: $(wc -l < "$REC/printed-in-neighbourhood-minor9.txt" | tr -d ' ') of $(wc -l < "$B/sw.txt" | tr -d ' ')"
    node neighbourhood.mjs --root "$B/trees/minor8" --patch "$MS8" > "$REC/neighbourhood-minor8.log" 2>&1; echo "NEIGHBOURHOOD minor8 exit $?: $(tail -1 "$REC/neighbourhood-minor8.log")"
    diff <(grep '^NEIGHBOURHOOD' "$REC/neighbourhood-minor8.log") <(grep '^NEIGHBOURHOOD' "$REC/neighbourhood-minor9.log"); echo "tally minor8 vs minor9: diff exit $?"
    diff <(cut -d'|' -f1 "$REC/neighbourhood-minor8.log") <(cut -d'|' -f1 "$REC/neighbourhood-minor9.log") > "$REC/neighbourhood-minor8-minor9.diff"; echo "line keys minor8 vs minor9: diff exit $?, $(grep -c '^[<>]' "$REC/neighbourhood-minor8-minor9.diff") lines"
  } 2>&1 | tee "$REC/nbhd.log"
  ;;
seat)
  # The seat's own R-26 / R-30 reading (MS9-readsheet.py over the 369 lines, H11-2's print beside it; MS9-hover-dark.py's
  # arithmetic) reads one printed line false that the carried rulings call true, and three true that are reported at worst
  # (MINOR-SPLIT-v9.md §4.3-§4.4). Read on plain copies outside git: trees/minor9 and trees/minor9s = the same +
  # MS9-seat-proposed.diff (tests/styles/glass-subtlety.test.ts:193-194). Static only.
  T=$B/trees/minor9; TS=$B/trees/minor9s; cd "$H"
  { python3 -I "$P11/MS9-hover-dark.py" | tee "$REC/hover-dark.log"
    python3 -I "$P11/MS9-rulings-seat.py" "$RUL" "$P11/MS9-rulings-seat.json"
    rm -rf "$TS"; cp -R "$T" "$TS"; python3 -I "$P11/MS9-seat-proposed.py" "$TS"
    (cd "$B/trees" && git diff --no-index minor9/tests minor9s/tests) | sed -e 's#^diff --git a/minor9/#diff --git a/#' -e 's# b/minor9s/# b/#' -e 's#^--- a/minor9/#--- a/#' -e 's#^+++ b/minor9s/#+++ b/#' > "$P11/MS9-seat-proposed.diff"
    echo "MS9-seat-proposed.diff: $(grep -c '^diff --git' "$P11/MS9-seat-proposed.diff") files, +$(grep -c '^+[^+]' "$P11/MS9-seat-proposed.diff")/-$(grep -c '^-[^-]' "$P11/MS9-seat-proposed.diff"), sha1 $(shasum "$P11/MS9-seat-proposed.diff" | cut -c1-8)"
    diff -rq "$T" "$TS" | sed "s#$B/##g"
    git -C "$W" apply --check "$P11/MS9-seat-proposed.diff"; echo "MS9-seat-proposed.diff applies on the minor v9 (worktree): exit $?"
    node prose-sweep.mjs --root "$T" --patch "$MS9" --declare deletes-minor.json --rulings "$P11/MS9-rulings-seat.json" > "$REC/sweep-minor9-seat.log" 2>&1; echo "SWEEP minor9 under MS9-rulings-seat.json exit $?: $(tail -1 "$REC/sweep-minor9-seat.log")"; grep -E '^SWEEP lines' "$REC/sweep-minor9-seat.log"; grep -E '✗' "$REC/sweep-minor9-seat.log"
    node prose-sweep.mjs --root "$TS" --patch "$MS9" --declare deletes-minor.json > "$REC/sweep-minor9s.log" 2>&1; echo "SWEEP minor9 + seat delta LIST exit $?: $(tail -1 "$REC/sweep-minor9s.log")"
    node prose-sweep.mjs --root "$TS" --patch "$MS9" --declare deletes-minor.json --rulings "$P11/MS9-rulings-seat.json" > "$REC/sweep-minor9s-seatp.log" 2>&1; echo "SWEEP minor9 + seat delta under MS9-rulings-seat.json exit $?: $(tail -1 "$REC/sweep-minor9s-seatp.log")"; grep -E '^SWEEP lines' "$REC/sweep-minor9s-seatp.log"
    node prose-sweep.mjs --root "$T" --patch "$MS9" --declare deletes-minor.json --rulings "$P11/MS9-rulings-seat.json" > "$REC/sweep-minor9-under-seatp.log" 2>&1; echo "SWEEP minor9 under MS9-rulings-seat.json (plant) exit $?: $(tail -1 "$REC/sweep-minor9-under-seatp.log")"
    node deleted-mechanisms.mjs --root "$TS" --declare deletes-minor.json --patch "$MS9" > "$REC/del-minor9s.log" 2>&1; echo "DEL minor9 + seat delta exit $?: $(tail -1 "$REC/del-minor9s.log")"
    node neighbourhood.mjs --root "$TS" --patch "$MS9" > "$REC/neighbourhood-minor9s.log" 2>&1; echo "NEIGHBOURHOOD minor9 + seat delta exit $?: $(tail -1 "$REC/neighbourhood-minor9s.log")"
  } 2>&1 | tee "$REC/seat.log"
  ;;
seat-same)
  # The seat delta's byte proof: the minor v9 + MS9-seat-proposed.diff built in the worktree under the same label after
  # the `same` phase, compared raw with that phase's minor v9 output (this session, this worktree).
  is "$MS9" || exit 3
  O=$D3_OUT/builds; S=$D3_OUT/same
  git -C "$W" apply "$P11/MS9-seat-proposed.diff" || exit 3
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; rm -rf "$S/m9s"; mv "$O/same" "$S/m9s"; echo "minor v9 + seat delta built as 'same' $(ts)"
  git -C "$W" apply -R "$P11/MS9-seat-proposed.diff" || exit 3; is "$MS9" || exit 3
  { for k in dist demo; do diff -rq -x build.json "$S/m9/$k" "$S/m9s/$k" > /dev/null; echo "$k minor v9 vs minor v9 + seat delta: diff -rq exit $?"; done
    for c in "$S/m9s/dist"/assets/*.css; do echo "minor v9 + seat delta specimen css $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -c1-16)"; done
  } 2>&1 | tee "$REC/seat-same.log"
  ;;
same)
  # R-22's raw branch, R-27's same-session pair: the minor v9, the minor v8 and the minor v9 again, each built by
  # harness/build.mjs --demo under ONE label in this worktree, each output moved aside before the next build, compared
  # byte for byte; then R-27's ties to pass 10's banked minor v8 (specimen CSS hash, dist-demo sha256 list).
  is "$MS9" || exit 3
  O=$D3_OUT/builds; S=$D3_OUT/same; rm -rf "$S"; mkdir -p "$S"
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/m9"; echo "minor v9 built as 'same' $(ts)"
  swap "$MS9" "$MS8"
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/m8"; echo "minor v8 built as 'same' $(ts)"
  swap "$MS8" "$MS9"
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/m9b"; echo "minor v9 rebuilt as 'same' (determinism) $(ts)"
  { for k in dist demo; do
      diff -rq -x build.json "$S/m8/$k" "$S/m9/$k" > "$REC/same-$k-m8-m9.txt"; echo "$k minor v8 vs minor v9: diff -rq exit $?, $(wc -l < "$REC/same-$k-m8-m9.txt" | tr -d ' ') lines"
      diff -rq -x build.json "$S/m9/$k" "$S/m9b/$k" > /dev/null; echo "$k minor v9 vs minor v9 rebuilt: diff -rq exit $?"
      for l in m8 m9; do (cd "$S/$l/$k" && find . -type f ! -name build.json | sort | xargs shasum -a 256) > "$REC/same-$l-$k.sha256"; done
      echo "$k files: m8 $(wc -l < "$REC/same-m8-$k.sha256" | tr -d ' '), m9 $(wc -l < "$REC/same-m9-$k.sha256" | tr -d ' '); sha256 list diff exit $(diff -q "$REC/same-m8-$k.sha256" "$REC/same-m9-$k.sha256" > /dev/null; echo $?)"
    done
    for l in m8 m9; do for c in "$S/$l/dist"/assets/*.css; do echo "$l specimen css $(basename "$c") $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -d' ' -f1)"; done; done
    for l in m8 m9; do echo "$l dist-demo css total $(find "$S/$l/demo" -name '*.css' -exec cat {} + | wc -c | tr -d ' ') B, files $(find "$S/$l/demo" -type f | wc -l | tr -d ' ')"; done
    echo "-- R-27: the ties to pass 10's banked minor v8 (pass-10/MS8-records/same-m8-*.sha256): specimen CSS hash and dist-demo list only"
    grep -E '\.css$' "$P10/MS8-records/same-m8-dist.sha256" | sed 's/^/banked minor v8 specimen css: /'
    grep -E '\.css$' "$REC/same-m9-dist.sha256" | sed 's/^/minor v9 specimen css:        /'
    diff "$P10/MS8-records/same-m8-demo.sha256" "$REC/same-m9-demo.sha256" > "$REC/same-demo-m8banked-m9.txt"; echo "demo banked m8 list vs m9 list: diff exit $?, $(wc -l < "$REC/same-demo-m8banked-m9.txt" | tr -d ' ') lines"
  } 2>&1 | tee "$REC/same.log"
  ;;
bite)
  # HEAD built the same way under the same label must differ from the minor v9.
  O=$D3_OUT/builds; S=$D3_OUT/same
  to_head "$MS9"
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; rm -rf "$S/head"; mv "$O/same" "$S/head"; echo "HEAD built as 'same' $(ts)"
  from_head "$MS9"
  { for k in dist demo; do diff -rq -x build.json "$S/head/$k" "$S/m9/$k" > "$REC/bite-$k-head-m9.txt"; echo "bite $k HEAD vs minor v9: diff -rq exit $?, $(wc -l < "$REC/bite-$k-head-m9.txt" | tr -d ' ') lines"; done
    for c in "$S/head/dist"/assets/*.css; do echo "HEAD specimen css $(basename "$c") $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -c1-16)"; done
  } 2>&1 | tee "$REC/bite.log"
  ;;
toolchain)
  # Typecheck, library build, the test typecheck after it, the dist-demo BEFORE the units, vitest --maxWorkers=2.
  is "$MS9" || exit 3
  cd "$W"
  printf 'import base from "./vite.config";\nexport default { ...(base as object), cacheDir: ".cache-m9/vite" };\n' > vite.m9.config.ts
  printf 'import base from "./vitest.config";\nexport default { ...(base as object), cacheDir: ".cache-m9/vitest" };\n' > vitest.m9.config.ts
  printf 'import base from "./demo/vite.demo-dist.config";\nexport default { ...(base as object), cacheDir: ".cache-m9/vite-demo" };\n' > vite.m9demo.config.ts
  { npx vue-tsc --noEmit > "$REC/tsc-app.log" 2>&1; echo "typecheck app exit $? $(ts)"
    npx vite build --config vite.m9.config.ts > "$REC/libbuild.log" 2>&1; echo "library build exit $? $(ts)"
    npx vue-tsc --noEmit -p tsconfig.test.json > "$REC/tsc-test.log" 2>&1; echo "typecheck tests exit $? $(ts)"
    npx vite build --config vite.m9demo.config.ts > "$REC/demobuild.log" 2>&1; echo "dist-demo exit $? $(ts)"
    npx vitest run --config vitest.m9.config.ts --maxWorkers=2 --testTimeout 240000 > "$REC/units.log" 2>&1; echo "vitest exit $? $(ts)"
    grep -E "Test Files|Tests  " "$REC/units.log"
  } 2>&1 | tee "$REC/toolchain.log"
  rm -f vite.m9.config.ts vitest.m9.config.ts vite.m9demo.config.ts
  ;;
reds)
  # The machine law's re-run of any red vitest file, twice, one vitest at a time. Files are passed as arguments.
  is "$MS9" || exit 3
  cd "$W"
  printf 'import base from "./vitest.config";\nexport default { ...(base as object), cacheDir: ".cache-m9/vitest" };\n' > vitest.m9.config.ts
  { for k in 1 2; do
      npx vitest run --config vitest.m9.config.ts --maxWorkers=2 --testTimeout 240000 "$@" > "$REC/reds-run$k.log" 2>&1
      echo "reds run $k exit $? $(ts): $(grep -E '^ +(Test Files|Tests) ' "$REC/reds-run$k.log" | tr -s ' ' | tr '\n' ' ')"
    done
  } 2>&1 | tee "$REC/reds.log"
  rm -f vitest.m9.config.ts
  ;;
ratchet)
  # G5: the export/roster verifier on the minor v9's library build, the datum unrebound; then rebound in the worktree only
  # and restored; and which library dist files carry an R-29 sentence.
  is "$MS9" || exit 3
  cd "$W"; { node scripts/verify-export-types.mjs > "$REC/verifier.log" 2>&1; echo "verifier exit $?: $(grep -E 'RATCHET|terminal|PRESENT' "$REC/verifier.log" | head -4 | tr '\n' ' ')"
    n=$(grep -oE "forbidden: [0-9]+" "$REC/verifier.log" | grep -oE "[0-9]+" | head -1); echo "$n" > .bundle-ratchet
    node scripts/verify-export-types.mjs > "$REC/verifier-rebound.log" 2>&1; echo "verifier (datum $n in the worktree) exit $?: $(grep -E 'terminal|PRESENT' "$REC/verifier-rebound.log" | head -3 | tr '\n' ' ')"
    git show HEAD:.bundle-ratchet > .bundle-ratchet; test -z "$(git status --porcelain -- .bundle-ratchet)" && echo ".bundle-ratchet restored to HEAD"
    git -C "$R" diff --stat v10.1.0 HEAD -- .published-roster; git diff --stat HEAD -- .published-roster; echo "roster diff (v10.1.0..HEAD, and the worktree) above: empty = unchanged"
    echo "-- library dist files carrying an R-29 sentence (grep over dist/)"
    grep -rlE 'at or above the bound|The press FILL|brief fill rather' dist 2>/dev/null | head; echo "(end)"; } 2>&1 | tee "$REC/ratchet.log"
  ;;
teardown)
  git -C "$R" worktree remove --force "$W"; git -C "$R" worktree prune; rm -rf "$B"; rmdir "$R/.claude/worktrees/bl/D3/p11" 2>/dev/null
  { ls "$R/.claude/worktrees/bl/D3/" "$R/.claude/worktrees/bl/D3/p11" 2>&1; echo "D3/p11/minor9 worktrees listed: $(git -C "$R" worktree list | grep -c 'D3/p11/minor9')"; echo "minor9 dir present: $(test -e "$B" && echo yes || echo no)"; echo "checkout src/demo/tests/DESIGN.md dirty files: $(git -C "$R" status --porcelain -- src demo tests DESIGN.md | wc -l | tr -d ' ')"; } 2>&1 | tee "$REC/teardown.log"
  ;;
esac
echo "== $phase end $(ts)" | tee -a "$REC/phases.log"
