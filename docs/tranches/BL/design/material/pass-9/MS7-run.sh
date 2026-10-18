#!/usr/bin/env bash
# MS7-run.sh · D3 pass 9, the minor split v7 (REGISTRY P8-6.2 step 3): every command this seat ran, by phase.
# minor v7 = pass-8/minor-split-v6.patch + R-23 (Crit8 §5.2's table, fixed: 11 comment rewrites in 9 files, applied by
# MS7-r23-edits.py; the three site entries land in harness/deletes-minor.json), written whole as pass-9/minor-split-v7.patch;
# the delta is pass-9/minor-split-v7-R23.diff. One worktree (.claude/worktrees/bl/D3/p9/minor7/wt); the minor v7 is applied
# by default, and a phase that needs the minor v6 or HEAD swaps the patch and swaps it back, each swap checked with cmp (or a
# clean git status at HEAD). Builds and caches live in $W/.d3out and $W/.cache-m7. Records land in pass-9/MS7-records/.
# No phase launches a browser: the bytes are proved first, and a browser phase would be added only if they did not hold.
# Each phase is launched as `~/.claude/guard/guarded [--light] --timeout N -- bash MS7-run.sh <phase>`.
#   --light: setup edit paths check trees static selftest ratchet law teardown     heavy: same bite toolchain
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p9/minor7
W=$B/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
P8=$M/pass-8
P9=$M/pass-9
REC=$P9/MS7-records
MS5=$M/pass-7/minor-split-v5.patch
MS6=$P8/minor-split-v6.patch
MS7=$P9/minor-split-v7.patch
export D3_OUT=$W/.d3out
mkdir -p "$REC"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
is() { git -C "$W" diff HEAD --binary | cmp -s - "$1" && echo "worktree = $(basename "$1")"; }
swap() { is "$1" >/dev/null && git -C "$W" apply -R "$1" 2>/dev/null && git -C "$W" apply "$2" 2>/dev/null; is "$2" || exit 3; }
to_head() { is "$1" >/dev/null && git -C "$W" apply -R "$1" 2>/dev/null && test -z "$(git -C "$W" status --porcelain -- src demo tests DESIGN.md)" && echo "worktree = HEAD" || exit 3; }
from_head() { test -z "$(git -C "$W" status --porcelain -- src demo tests DESIGN.md)" && git -C "$W" apply "$1" 2>/dev/null; is "$1" || exit 3; }
radii() { grep -E -- '--glass-blur-(wash|quiet|resting|floating|overlay)-radius:' "$W/src/styles/tokens/glass.css" | sed 's/^ *//'; }
cuttree() { rm -rf "$B/trees/$1"; mkdir -p "$B/trees/$1"; cp -R "$W/src" "$W/demo" "$W/tests" "$W/DESIGN.md" "$B/trees/$1/"; mkdir -p "$B/trees/$1/docs"; cp -R "$W/docs/canon" "$B/trees/$1/docs/"; cp "$W"/*.md "$B/trees/$1/" 2>/dev/null; true; }
FILES="DESIGN.md src/styles/glass/liquid-fill.css tests/components/button/Button.test.ts tests/gates/feedback-tint-seam.test.ts src/components/dock/styles/adaptive-legibility.css src/styles/glass/surfaces-pager.css src/styles/tokens/property-regs.css tests/components/field/forms-seam.test.ts src/styles/tokens/glass-deep.css"
phase=$1; shift
echo "== $phase start $(ts)" | tee -a "$REC/phases.log"
case $phase in
setup)
  # The worktree at HEAD, node_modules symlinked, the minor v6 applied; trees/minor6 cut before any edit (src demo tests
  # DESIGN.md docs/canon and the root *.md: H8-1's scope plus the REPORTED arm's).
  git -C "$R" worktree add --detach "$W" HEAD && ln -s "$R/node_modules" "$W/node_modules"
  git -C "$W" apply "$MS6"; is "$MS6" || exit 3
  cuttree minor6; ls "$B/trees"
  ;;
edit)
  # The worktree holds the minor v6. Apply R-23 by exact-string substitution, write minor-split-v7.patch and the R-23
  # delta (minor v6 -> minor v7), and check minor v6 + delta = minor v7 byte for byte.
  is "$MS6" || exit 3
  python3 -I "$P9/MS7-r23-edits.py" "$W" || exit 4
  git -C "$W" diff HEAD --binary > "$MS7"
  D=$B/r23; rm -rf "$D"; mkdir -p "$D/a" "$D/b"
  for f in $FILES; do mkdir -p "$D/b/$(dirname "$f")"; cp "$W/$f" "$D/b/$f"; done
  swap "$MS7" "$MS6"; for f in $FILES; do mkdir -p "$D/a/$(dirname "$f")"; cp "$W/$f" "$D/a/$f"; done
  (cd "$D" && git diff --no-index a b) | sed -e 's#^diff --git a/a/#diff --git a/#' -e 's# b/b/# b/#' -e 's#^--- a/a/#--- a/#' -e 's#^+++ b/b/#+++ b/#' > "$P9/minor-split-v7-R23.diff"
  git -C "$W" apply "$P9/minor-split-v7-R23.diff" && git -C "$W" diff HEAD --binary | cmp - "$MS7" && echo "minor-split-v6.patch + minor-split-v7-R23.diff = minor-split-v7.patch (cmp)"
  is "$MS7" || exit 3
  { echo "minor-split-v7-R23.diff: $(grep -c '^diff --git' "$P9/minor-split-v7-R23.diff") files, +$(grep -c '^+[^+]' "$P9/minor-split-v7-R23.diff")/-$(grep -c '^-[^-]' "$P9/minor-split-v7-R23.diff"), sha1 $(shasum "$P9/minor-split-v7-R23.diff" | cut -c1-8)"
    echo "minor-split-v6.patch: $(grep -c '^diff --git' "$MS6") files, sha1 $(shasum "$MS6" | cut -c1-8)"
    echo "minor-split-v7.patch: $(grep -c '^diff --git' "$MS7") files, sha1 $(shasum "$MS7" | cut -c1-8); git diff --shortstat: $(git -C "$W" diff HEAD --shortstat)"
  } 2>&1 | tee "$REC/patch.log"
  ;;
paths)
  { echo "-- paths the minor v7 adds to the minor v6's list"; diff <(git -C "$R" apply --numstat "$MS6" | cut -f3 | sort) <(git -C "$R" apply --numstat "$MS7" | cut -f3 | sort)
    echo "-- R-23 files: $(grep '^diff --git' "$P9/minor-split-v7-R23.diff" | awk '{print $3}' | sed 's#^a/##' | tr '\n' ' ')"
    echo "-- .vue files in the R-23 delta: $(grep '^diff --git' "$P9/minor-split-v7-R23.diff" | grep -c '\.vue ')"
    echo "-- line counts per R-23 file, minor v6 -> minor v7 (an edit that keeps its comment's line count moves no line below it)"
    for f in $FILES; do echo "   $f $(wc -l < "$B/trees/minor6/$f" | tr -d ' ') -> $(wc -l < "$W/$f" | tr -d ' ')"; done; } 2>&1 | tee -a "$REC/patch.log"
  ;;
check)
  to_head "$MS7"; git -C "$W" apply --check "$MS7"; echo "git apply --check minor-split-v7.patch at $(git -C "$W" rev-parse --short=9 HEAD) (worktree) exit $?" | tee "$REC/check.log"; from_head "$MS7"
  git -C "$R" apply --check "$MS7"; echo "git apply --check minor-split-v7.patch at $(git -C "$R" rev-parse --short=9 HEAD) (checkout, read only) exit $?" | tee -a "$REC/check.log"
  git -C "$R" diff --stat 1da7eb17b HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon | tee -a "$REC/check.log"; echo "source diff 1da7eb17b..HEAD above (empty = none)" | tee -a "$REC/check.log"
  ;;
trees)
  # trees/minor7 (H8-1's scope and the REPORTED arm's) and h7trees/ (src/ demo/ only, H7-3's banked scope) for minor6, minor7.
  is "$MS7" || exit 3
  cuttree minor7
  for t in minor6 minor7; do rm -rf "$B/h7trees/$t"; mkdir -p "$B/h7trees/$t"; cp -R "$B/trees/$t/src" "$B/trees/$t/demo" "$B/h7trees/$t/"; done
  ls "$B/trees" "$B/h7trees"
  ;;
oldtrees)
  # The H7-3 self-test's older plants: h7trees/minor4 and minor5 (src/ demo/), cut from HEAD + each banked patch.
  to_head "$MS7"
  for v in 4 5; do P=$M/pass-$((v + 2))/minor-split-v$v.patch; from_head "$P"; rm -rf "$B/h7trees/minor$v"; mkdir -p "$B/h7trees/minor$v"; cp -R "$W/src" "$W/demo" "$B/h7trees/minor$v/"; to_head "$P"; done
  from_head "$MS7"; ls "$B/h7trees"
  ;;
static)
  # H7-3 (the minor's declaration, grown for R-23, on H7's scope: fixture minor v7, plants minor v6, v5, v4); H8-1 with
  # H9 over the minor's own patch (fixture minor v7 + minor-split-v7.patch at 0; plant minor v6 under the same declaration
  # and patch, and the minor v6 under its own patch); the R-16 darken sweep; LAW; census and its bite; HOV; LIT; ladder.
  is "$MS7" || exit 3
  # DEL reads an absent root as 0 files in scope and PASS (pass-10 instrument list, MINOR-SPLIT-v7.md §7): refuse here.
  for t in h7trees/minor4 h7trees/minor5 h7trees/minor6 h7trees/minor7 trees/minor6 trees/minor7; do test -d "$B/$t/src" || { echo "MISSING TREE $t"; exit 5; }; done
  cd "$H"
  { echo "-- H7-3, deletes-minor.json ($(python3 -I -c 'import json,sys; d=json.load(open(sys.argv[1])); print(len(d["names"]), "names,", len(d.get("exact", [])), "sites")' deletes-minor.json)), H7 scope (src/ demo/), no patch"
    for t in minor7 minor6 minor5 minor4; do node deleted-mechanisms.mjs --root "$B/h7trees/$t" --declare deletes-minor.json > "$REC/del-H7-$t.log" 2>&1; echo "DEL H7-3 $t exit $?: $(tail -1 "$REC/del-H7-$t.log")"; done
    echo "-- H8-1 with H9 over the minor's own patch (src/ demo/ tests/ + every touched path; REPORTED arm)"
    node deleted-mechanisms.mjs --root "$B/trees/minor7" --declare deletes-minor.json --patch "$MS7" > "$REC/del-H9-minor7.log" 2>&1; echo "DEL H9 minor7 + v7 patch exit $?: $(tail -1 "$REC/del-H9-minor7.log")"
    node deleted-mechanisms.mjs --root "$B/trees/minor6" --declare deletes-minor.json --patch "$MS7" > "$REC/del-H9-minor6-plant.log" 2>&1; echo "DEL H9 minor6 + v7 patch (plant) exit $?: $(tail -1 "$REC/del-H9-minor6-plant.log")"
    node deleted-mechanisms.mjs --root "$B/trees/minor6" --declare deletes-minor.json --patch "$MS6" > "$REC/del-H9-minor6-ownpatch.log" 2>&1; echo "DEL H9 minor6 + v6 patch exit $?: $(tail -1 "$REC/del-H9-minor6-ownpatch.log")"
    echo "-- the R-16 sweep (grep -i darken minus press|tone-step|well|darker in dark|in dark), src + demo/stories"
    for t in minor6 minor7; do grep -rnEi 'darken' "$B/trees/$t/src" "$B/trees/$t/demo/stories" | grep -viE 'press|tone-step|well|darker in dark|in dark' | sed "s#$B/trees/$t/##" > "$REC/sweep-darken-$t.txt"; echo "   $t: $(wc -l < "$REC/sweep-darken-$t.txt" | tr -d ' ') lines"; done
    diff "$REC/sweep-darken-minor6.txt" "$REC/sweep-darken-minor7.txt"; echo "   diff exit $?"
    node launch-law.mjs > "$REC/law.log" 2>&1; echo "LAW exit $?: $(tail -1 "$REC/law.log")"
    node "$M/pass-4/lighting-census.mjs" "$W" > "$REC/census-minor7.log" 2>&1; echo "census minor7 exit $?: $(tail -1 "$REC/census-minor7.log")"
    t=$B/v1010; rm -rf "$t"; mkdir -p "$t"; git -C "$R" archive v10.1.0 src/styles | tar -x -C "$t"
    node "$M/pass-4/lighting-census.mjs" "$t" > "$REC/census-v1010.log" 2>&1; echo "census v10.1.0 exit $?: $(tail -1 "$REC/census-v1010.log")"; rm -rf "$t"
    node hover-fill-selected.mjs --root "$W" > "$REC/HOV-minor7.log" 2>&1; echo "HOV exit $?: $(tail -1 "$REC/HOV-minor7.log")"
    node lighting-literals.mjs --root "$W" > "$REC/LIT-static-minor7.log" 2>&1; echo "LIT exit $?: $(grep -o 'LIGHTING-LITERALS.*' "$REC/LIT-static-minor7.log" | tail -1)"
    radii > "$REC/radii-minor7.txt"; echo "-- LADDER diff radii-minor7 pass-8 radii-minor6 (prints nothing)"; diff "$REC/radii-minor7.txt" "$P8/MS6-records/radii-minor6.txt"; echo "LADDER exit $?"
    echo "-- FL-14 static: @utility glass-plate declares isolation"; sed -n '/^@utility glass-plate/,/^}/p' "$W/src/styles/glass/veil.css" | grep -n "isolation"
    echo "-- identifiers on R-23's removed and added lines (comments only, so no declaration should move)"
    grep -E '^[-+][^-+]' "$P9/minor-split-v7-R23.diff" | grep -oE -- '--[a-z][a-z0-9-]+|data-[a-z-]+' | sort | uniq -c | sort -rn
  } 2>&1 | tee "$REC/static.log"
  ;;
selftest)
  # The rows this seat's inputs reach: LAW, DEL, H7-1, H7-3 (tiny rows and minor4..minor7), H8-1 and H8-2's tree-free
  # rows, H9-1..H9-6's tiny rows, and H9-3's minor rows (minor v6 plant with minor-split-v6.patch, minor v7 fixture with
  # minor-split-v7.patch). The floor-tree rows (--h8-trees, --h9-patch) are the floor seats' and do not run here.
  cd "$H"
  D3_OUT=$B/out node selftest.mjs --only LAW,DEL,H7-1,H7-2,H7-3,H8-1,H8-2,H9-1,H9-2,H9-3,H9-4,H9-5,H9-6 --h7-trees "$B/h7trees" --h9-trees "$B/trees" --h9-minor-patch "$MS6" --h9-minor7-patch "$MS7" > "$REC/selftest.log" 2>&1; echo "selftest exit $?: $(tail -1 "$REC/selftest.log")" | tee -a "$REC/selftest.log"
  ;;
proposed)
  # The R-21 (b) proposed delta (MS7-r21b-proposed.py: two lines read false on the minor v7), applied on top of the
  # minor v7, written as MS7-r21b-proposed.diff, cut as trees/minor7p, then reversed: the worktree returns to the minor v7.
  is "$MS7" || exit 3
  python3 -I "$P9/MS7-r21b-proposed.py" "$W" || exit 4
  git -C "$W" diff HEAD --binary > "$B/ms7p.patch"
  D=$B/r21b; rm -rf "$D"; mkdir -p "$D/a" "$D/b"; PF="DESIGN.md src/styles/glass/surface-axis.css"
  for f in $PF; do mkdir -p "$D/b/$(dirname "$f")"; cp "$W/$f" "$D/b/$f"; done
  cuttree minor7p
  git -C "$W" apply -R "$B/ms7p.patch" && git -C "$W" apply "$MS7"; is "$MS7" || exit 3
  for f in $PF; do mkdir -p "$D/a/$(dirname "$f")"; cp "$W/$f" "$D/a/$f"; done
  (cd "$D" && git diff --no-index a b) | sed -e 's#^diff --git a/a/#diff --git a/#' -e 's# b/b/# b/#' -e 's#^--- a/a/#--- a/#' -e 's#^+++ b/b/#+++ b/#' > "$P9/MS7-r21b-proposed.diff"
  git -C "$W" apply --check "$P9/MS7-r21b-proposed.diff" && echo "MS7-r21b-proposed.diff applies on the minor v7: exit 0"
  echo "MS7-r21b-proposed.diff: $(grep -c '^diff --git' "$P9/MS7-r21b-proposed.diff") files, +$(grep -c '^+[^+]' "$P9/MS7-r21b-proposed.diff")/-$(grep -c '^-[^-]' "$P9/MS7-r21b-proposed.diff"), sha1 $(shasum "$P9/MS7-r21b-proposed.diff" | cut -c1-8)" | tee -a "$REC/patch.log"
  cd "$H"
  node deleted-mechanisms.mjs --root "$B/trees/minor7p" --declare deletes-minor.json --patch "$MS7" > "$REC/del-H9-minor7p.log" 2>&1; echo "DEL H9 minor7 + proposed, v7 patch exit $?: $(tail -1 "$REC/del-H9-minor7p.log")" | tee -a "$REC/patch.log"
  ;;
sweep)
  # R-21 (b): the frozen list over every file the minor's patch touches, with the minor's declaration; the rulings this
  # seat wrote (MS7-rulings.py: true, REPORTED, and two FALSE lines left unruled) read back on the minor v7 (expect the two
  # FALSE lines unread), on the minor v7 + the proposed delta (--proposed rulings: expect PASS), and on the minor v6 (plant).
  cd "$H"
  node prose-sweep.mjs --root "$B/trees/minor7" --patch "$MS7" --declare deletes-minor.json > "$REC/sweep-minor7.log" 2>&1; echo "SWEEP minor7 LIST exit $?: $(tail -1 "$REC/sweep-minor7.log")" | tee "$REC/sweep.log"
  node prose-sweep.mjs --root "$B/trees/minor7p" --patch "$MS7" --declare deletes-minor.json > "$REC/sweep-minor7p.log" 2>&1; echo "SWEEP minor7p LIST exit $?: $(tail -1 "$REC/sweep-minor7p.log")" | tee -a "$REC/sweep.log"
  python3 -I "$P9/MS7-rulings.py" "$REC/sweep-minor7.log" "$P9/MS7-rulings.json" | tee -a "$REC/sweep.log"
  python3 -I "$P9/MS7-rulings.py" "$REC/sweep-minor7p.log" "$P9/MS7-rulings-proposed.json" --proposed | tee -a "$REC/sweep.log"
  node prose-sweep.mjs --root "$B/trees/minor7" --patch "$MS7" --declare deletes-minor.json --rulings "$P9/MS7-rulings.json" > "$REC/sweep-minor7-ruled.log" 2>&1; echo "SWEEP minor7 ruled exit $?: $(tail -1 "$REC/sweep-minor7-ruled.log")" | tee -a "$REC/sweep.log"
  node prose-sweep.mjs --root "$B/trees/minor7p" --patch "$MS7" --declare deletes-minor.json --rulings "$P9/MS7-rulings-proposed.json" > "$REC/sweep-minor7p-ruled.log" 2>&1; echo "SWEEP minor7p ruled exit $?: $(tail -1 "$REC/sweep-minor7p-ruled.log")" | tee -a "$REC/sweep.log"
  node prose-sweep.mjs --root "$B/trees/minor6" --patch "$MS7" --declare deletes-minor.json --rulings "$P9/MS7-rulings.json" > "$REC/sweep-minor6-plant.log" 2>&1; echo "SWEEP minor6 (plant) ruled exit $?: $(tail -1 "$REC/sweep-minor6-plant.log")" | tee -a "$REC/sweep.log"
  grep -E "✗" "$REC/sweep-minor7-ruled.log" "$REC/sweep-minor6-plant.log" | sed "s#$REC/##" | tee -a "$REC/sweep.log"
  ;;
same)
  # The byte-identity proof (P7-2.2 thin builds, R-22's raw branch): the minor v7, the minor v6, the minor v7 again
  # (determinism) and the minor v7 + the proposed delta, each built by harness/build.mjs --demo under ONE label in this
  # worktree, each output moved aside before the next build, compared byte for byte (specimen dist and dist-demo).
  is "$MS7" || exit 3
  O=$D3_OUT/builds; S=$D3_OUT/same; rm -rf "$S"; mkdir -p "$S"
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/m7"; echo "minor v7 built as 'same' $(ts)"
  swap "$MS7" "$MS6"
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/m6"; echo "minor v6 built as 'same' $(ts)"
  swap "$MS6" "$MS7"
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/m7b"; echo "minor v7 rebuilt as 'same' (determinism) $(ts)"
  git -C "$W" apply "$P9/MS7-r21b-proposed.diff" || exit 3
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/m7p"; echo "minor v7 + proposed built as 'same' $(ts)"
  git -C "$W" apply -R "$P9/MS7-r21b-proposed.diff"; is "$MS7" || exit 3
  { for l in m7 m6 m7b m7p; do echo "$l build.json: $(grep -ohE '"srcDirtyFiles":[ ]*[0-9]+' "$S/$l/build.json" "$S/$l/dist/build.json" 2>/dev/null | head -1)"; done
    for k in dist demo; do
      diff -rq -x build.json "$S/m6/$k" "$S/m7/$k" > "$REC/same-$k-m6-m7.txt"; echo "$k minor v6 vs minor v7: diff -rq exit $?, $(wc -l < "$REC/same-$k-m6-m7.txt" | tr -d ' ') lines"
      diff -rq -x build.json "$S/m7/$k" "$S/m7b/$k" > /dev/null; echo "$k minor v7 vs minor v7 rebuilt: diff -rq exit $?"
      diff -rq -x build.json "$S/m7/$k" "$S/m7p/$k" > /dev/null; echo "$k minor v7 vs minor v7 + proposed: diff -rq exit $?"
      for l in m6 m7; do (cd "$S/$l/$k" && find . -type f ! -name build.json | sort | xargs shasum -a 256) > "$REC/same-$l-$k.sha256"; done
      echo "$k files: m6 $(wc -l < "$REC/same-m6-$k.sha256" | tr -d ' '), m7 $(wc -l < "$REC/same-m7-$k.sha256" | tr -d ' '); sha256 list diff exit $(diff -q "$REC/same-m6-$k.sha256" "$REC/same-m7-$k.sha256" > /dev/null; echo $?)"
    done
    for l in m6 m7; do for c in "$S/$l/dist"/assets/*.css; do echo "$l specimen css $(basename "$c") $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -c1-16)"; done; done
    for l in m6 m7; do echo "$l dist-demo css total $(find "$S/$l/demo" -name '*.css' -exec cat {} + | wc -c | tr -d ' ') B, files $(find "$S/$l/demo" -type f | wc -l | tr -d ' ')"; done
    echo "-- against pass 8's banked minor v6 same-label lists (pass-8/MS6-records/same-m6-*.sha256)"
    for k in dist demo; do diff "$P8/MS6-records/same-m6-$k.sha256" "$REC/same-m7-$k.sha256" > "$REC/same-$k-m6banked-m7.txt"; echo "$k banked m6 vs m7: diff exit $?, $(wc -l < "$REC/same-$k-m6banked-m7.txt" | tr -d ' ') lines"; done
  } 2>&1 | tee "$REC/same.log"
  ;;
bite)
  # HEAD built the same way under the same label must differ from the minor v7; and the tie to pass 8's banked specimen JS
  # through the worktree path its //#region comments print (p8/minor6 then, p9/minor7 now).
  O=$D3_OUT/builds; S=$D3_OUT/same
  to_head "$MS7"
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; rm -rf "$S/head"; mv "$O/same" "$S/head"; echo "HEAD built as 'same' $(ts)"
  from_head "$MS7"
  { for k in dist demo; do diff -rq -x build.json "$S/head/$k" "$S/m7/$k" > "$REC/bite-$k-head-m7.txt"; echo "bite $k HEAD vs minor v7: diff -rq exit $?, $(wc -l < "$REC/bite-$k-head-m7.txt" | tr -d ' ') lines"; done
    for c in "$S/head/dist"/assets/*.css; do echo "HEAD specimen css $(basename "$c") $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -c1-16)"; done
    N=$B/pathnorm; rm -rf "$N"; cp -R "$S/m7/dist" "$N"
    for f in "$N"/assets/*.js; do LC_ALL=C sed -i '' 's#\.claude/worktrees/bl/D3/p9/minor7/wt/#.claude/worktrees/bl/D3/p8/minor6/wt/#g' "$f"; done
    for f in "$N"/assets/*.js; do echo "minor v7 specimen JS, worktree path rewritten to pass 8's: $(basename "$f") sha256 $(shasum -a 256 "$f" | cut -d' ' -f1)"; done
    grep -E 'index-[A-Za-z0-9_-]+\.js$' "$P8/MS6-records/same-m6-dist.sha256" | sed 's/^/banked minor v6 specimen JS: /'
  } 2>&1 | tee "$REC/bite.log"
  ;;
toolchain)
  # Typecheck, library build, the test typecheck after it, the dist-demo BEFORE the units (P8-5: the boot-graph rows read
  # it), vitest --maxWorkers=2, and the three test files R-23 edits alone.
  is "$MS7" || exit 3
  cd "$W"
  printf 'import base from "./vite.config";\nexport default { ...(base as object), cacheDir: ".cache-m7/vite" };\n' > vite.m7.config.ts
  printf 'import base from "./vitest.config";\nexport default { ...(base as object), cacheDir: ".cache-m7/vitest" };\n' > vitest.m7.config.ts
  printf 'import base from "./demo/vite.demo-dist.config";\nexport default { ...(base as object), cacheDir: ".cache-m7/vite-demo" };\n' > vite.m7demo.config.ts
  { npx vue-tsc --noEmit > "$REC/tsc-app.log" 2>&1; echo "typecheck app exit $? $(ts)"
    npx vite build --config vite.m7.config.ts > "$REC/libbuild.log" 2>&1; echo "library build exit $? $(ts)"
    npx vue-tsc --noEmit -p tsconfig.test.json > "$REC/tsc-test.log" 2>&1; echo "typecheck tests exit $? $(ts)"
    npx vite build --config vite.m7demo.config.ts > "$REC/demobuild.log" 2>&1; echo "dist-demo exit $? $(ts)"
    npx vitest run --config vitest.m7.config.ts --maxWorkers=2 --testTimeout 240000 > "$REC/units.log" 2>&1; echo "vitest exit $? $(ts)"
    grep -E "Test Files|Tests  " "$REC/units.log"
    npx vitest run --config vitest.m7.config.ts --maxWorkers=2 tests/components/button/Button.test.ts tests/gates/feedback-tint-seam.test.ts tests/components/field/forms-seam.test.ts > "$REC/units-r23.log" 2>&1; echo "vitest R-23 files exit $? $(ts)"; grep -E "Test Files|Tests  " "$REC/units-r23.log"
  } 2>&1 | tee "$REC/toolchain.log"
  rm -f vite.m7.config.ts vitest.m7.config.ts vite.m7demo.config.ts
  ;;
ratchet)
  # G5: the export/roster verifier on the minor v7's library build, the datum unrebound; then rebound in the worktree
  # only and restored; and which library dist files carry an R-23 sentence.
  is "$MS7" || exit 3
  cd "$W"; { node scripts/verify-export-types.mjs > "$REC/verifier.log" 2>&1; echo "verifier exit $?: $(grep -E 'RATCHET|terminal|PRESENT' "$REC/verifier.log" | head -4 | tr '\n' ' ')"
    n=$(grep -oE "forbidden: [0-9]+" "$REC/verifier.log" | grep -oE "[0-9]+" | head -1); echo "$n" > .bundle-ratchet
    node scripts/verify-export-types.mjs > "$REC/verifier-rebound.log" 2>&1; echo "verifier (datum $n in the worktree) exit $?: $(grep -E 'terminal|PRESENT' "$REC/verifier-rebound.log" | head -3 | tr '\n' ' ')"
    git show HEAD:.bundle-ratchet > .bundle-ratchet; test -z "$(git status --porcelain -- .bundle-ratchet)" && echo ".bundle-ratchet restored to HEAD"
    git -C "$R" diff --stat v10.1.0 HEAD -- .published-roster; git diff --stat HEAD -- .published-roster; echo "roster diff (v10.1.0..HEAD, and the worktree) above: empty = unchanged"
    echo "-- library dist files carrying an R-23 rewrite (grep over dist/)"
    grep -rlE 'earned-ink clamp|its radius SCALES|the self-engage is the floor|pill runs no oklab mix|rides this knob alone|in ascending order' dist 2>/dev/null | head; echo "(end)"; } 2>&1 | tee "$REC/ratchet.log"
  ;;
law)
  cd "$H"; node launch-law.mjs > "$REC/law.log" 2>&1; echo "LAW exit $?: $(tail -1 "$REC/law.log")" | tee -a "$REC/law.log"
  ;;
teardown)
  git -C "$R" worktree remove --force "$W"; git -C "$R" worktree prune; rm -rf "$B"; rmdir "$R/.claude/worktrees/bl/D3/p9" 2>/dev/null; ls "$R/.claude/worktrees/bl/D3/" 2>&1; git -C "$R" worktree list | grep -c 'D3/p9'; git -C "$R" status --porcelain -- src demo tests | wc -l; true
  ;;
esac
echo "== $phase end $(ts)" | tee -a "$REC/phases.log"
