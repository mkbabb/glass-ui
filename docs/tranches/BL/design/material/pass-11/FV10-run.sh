#!/usr/bin/env bash
# FV10-run.sh · D3 pass 11, floor v10 (REGISTRY P10-6.3 step 2): every command this seat ran, by phase.
# floor v10 = pass-10/floor-v9.patch + R-28 in R-28's exact words (pass-10/crit-fv10-proposed.diff: icon-button.css,
# sizing.css, overlay-plate.css; CSS comments only; tab-button.css and triggers.css stay out), written whole as
# pass-11/floor-v10.patch. (Resumed 14:04 after the 14:01 reboot: INBOUND O-103 now RULES R-21 (b), Q-1 a, Q-3 a,
# Q-11 a + grey content accepted, Q-14 a, replacing the defaults below; no measurement changes.) At launch no owner
# ruling had arrived; the driver applied the registry DEFAULTS under the owner's
# 2026-10-19 order (R-21 (b), Q-1 (a), Q-3 (a), Q-11 (a) chrome, Q-11 content REPORTED, Q-14 (a)). No variant selected.
# One worktree (.claude/worktrees/bl/D3/p11/floor10/wt), floor v10 applied by default; a phase that needs floor v9 or
# HEAD swaps the patch and swaps it back, each swap checked with cmp (or a clean git status at HEAD).
# Builds and caches live in $W/.d3out and $W/.cache-fv10. Records land in pass-11/FV10-records/.
#   bash FV10-run.sh setup|patch|check|declare|static|sweep|nbhd|same|bite|toolchain|teardown
# Each phase is launched as `~/.claude/guard/guarded [--light] [--timeout N] -- bash FV10-run.sh <phase>`. No phase
# launches a browser (R-31: no WebKit cell; no owner variant selected, so no battery).
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p11/floor10
W=$B/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
P9=$M/pass-9
P10=$M/pass-10
P11=$M/pass-11
REC=$P11/FV10-records
FV9=$P10/floor-v9.patch
FV10=$P11/floor-v10.patch
R28=$P10/crit-fv10-proposed.diff
EXACT=$P9/H9-exact-floor.json
export D3_OUT=$W/.d3out
mkdir -p "$REC"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
is() { git -C "$W" diff HEAD --binary | cmp -s - "$1" && echo "worktree = $(basename "$1")"; }
swap() { is "$1" >/dev/null && git -C "$W" apply -R "$1" 2>/dev/null && git -C "$W" apply "$2" 2>/dev/null; is "$2" || exit 3; }
to_head() { is "$1" >/dev/null && git -C "$W" apply -R "$1" 2>/dev/null && test -z "$(git -C "$W" status --porcelain -- src demo tests)" && echo "worktree = HEAD" || exit 3; }
from_head() { test -z "$(git -C "$W" status --porcelain -- src demo tests)" && git -C "$W" apply "$1" 2>/dev/null; is "$1" || exit 3; }
radii() { grep -E -- '--glass-blur-(wash|quiet|resting|floating|overlay)-radius:' "$W/src/styles/tokens/glass.css" | sed 's/^ *//'; }
FILES="src/components/dock/styles/controls/icon-button.css src/styles/tokens/sizing.css src/styles/glass/overlay-plate.css"
phase=$1; shift
echo "== $phase start $(ts)" | tee -a "$REC/phases.log"
case $phase in
setup)
  mkdir -p "$B"; git -C "$R" worktree add --detach "$W" HEAD && ln -s "$R/node_modules" "$W/node_modules"
  echo "worktree HEAD $(git -C "$W" rev-parse --short=9 HEAD)" | tee "$REC/setup.log"
  from_head "$FV9" | tee -a "$REC/setup.log"
  ;;
patch)
  # The worktree holds floor v9 (cmp-checked). Apply R-28's delta as banked, write floor-v10.patch, and check
  # floor v9 + delta = floor v10 byte for byte; the worktree delta's +/- lines and hunk ranges equal the banked delta's.
  is "$FV9" || exit 3
  git -C "$W" apply "$R28" || exit 3
  git -C "$W" diff HEAD --binary > "$FV10"
  D=$B/r28; rm -rf "$D"; mkdir -p "$D/a" "$D/b"
  for f in $FILES; do mkdir -p "$D/b/$(dirname "$f")"; cp "$W/$f" "$D/b/$f"; done
  swap "$FV10" "$FV9"; for f in $FILES; do mkdir -p "$D/a/$(dirname "$f")"; cp "$W/$f" "$D/a/$f"; done
  (cd "$D" && git diff --no-index a b) | sed -e 's#^diff --git a/a/#diff --git a/#' -e 's# b/b/# b/#' -e 's#^--- a/a/#--- a/#' -e 's#^+++ b/b/#+++ b/#' > "$P11/floor-v10-delta.diff"
  git -C "$W" apply "$P11/floor-v10-delta.diff" && git -C "$W" diff HEAD --binary | cmp - "$FV10" && echo "floor-v9.patch + floor-v10-delta.diff = floor-v10.patch (cmp)"
  is "$FV10" || exit 3
  { echo "floor-v10-delta.diff: $(grep -c '^diff --git' "$P11/floor-v10-delta.diff") files, +$(grep -c '^+[^+]' "$P11/floor-v10-delta.diff")/-$(grep -c '^-[^-]' "$P11/floor-v10-delta.diff"), sha1 $(shasum "$P11/floor-v10-delta.diff" | cut -c1-8)"
    echo "crit-fv10-proposed.diff (R-28): $(grep -c '^--- a/' "$R28") files, +$(grep -c '^+[^+]' "$R28")/-$(grep -c '^-[^-]' "$R28"), sha1 $(shasum "$R28" | cut -c1-8)"
    diff <(grep -E '^(@@|[-+][^-+])' "$R28") <(grep -E '^(@@|[-+][^-+])' "$P11/floor-v10-delta.diff") > /dev/null; echo "R-28 delta vs the worktree delta, hunk ranges and +/- lines: diff exit $?"
    echo "floor-v9.patch: $(grep -c '^diff --git' "$FV9") files, sha1 $(shasum "$FV9" | cut -c1-8)"
    echo "floor-v10.patch: $(grep -c '^diff --git' "$FV10") files, sha1 $(shasum "$FV10" | cut -c1-8); git diff --shortstat: $(git -C "$W" diff HEAD --shortstat)"
    diff <(git apply --numstat "$FV9" | cut -f3) <(git apply --numstat "$FV10" | cut -f3); echo "same path list as floor v9: exit $?"
    for f in $FILES; do echo "$f lines: fv9 $(wc -l < "$D/a/$f" | tr -d ' ') fv10 $(wc -l < "$D/b/$f" | tr -d ' ')"; done
    echo "files the delta touches: $(grep '^diff --git' "$P11/floor-v10-delta.diff" | sed 's#diff --git a/##; s# b/.*##' | tr '\n' ' ')"
    for f in src/components/dock/styles/controls/tab-button.css src/components/dock/styles/controls/triggers.css; do echo "$f in floor-v10.patch: $(grep -c "^diff --git a/$f" "$FV10")"; done
  } 2>&1 | tee "$REC/patch.log"
  ;;
deltacmp)
  # Added after the first `patch` run, whose single-stream diff of R-28's delta against the worktree delta read exit 1:
  # the two list the same three files in a different order (R-28's: icon-button, sizing, overlay-plate; git's: sorted
  # paths). Compared per file: each file's hunk ranges and +/- lines.
  perfile() { awk -v want="$2" '/^(diff --git|--- a\/)/{f=""} /^\+\+\+ b\//{f=$2; sub(/^b\//,"",f); next} f==want && /^(@@|[-+][^-+])/{ if ($0 ~ /^@@/) { split($0,h," "); print h[1],h[2],h[3],h[4] } else print }' "$1"; }
  { for f in $FILES; do diff <(perfile "$R28" "$f") <(perfile "$P11/floor-v10-delta.diff" "$f") > /dev/null; echo "$f: R-28 vs worktree delta, hunk ranges and +/- lines ($(perfile "$R28" "$f" | wc -l | tr -d ' ') lines): diff exit $?"; done
  } 2>&1 | tee "$REC/deltacmp.log"
  ;;
check)
  to_head "$FV10"; git -C "$W" apply --check "$FV10"; echo "git apply --check floor-v10.patch at $(git -C "$W" rev-parse --short=9 HEAD) (worktree) exit $?" | tee "$REC/check.log"; from_head "$FV10"
  git -C "$R" apply --check "$FV10"; echo "git apply --check floor-v10.patch at $(git -C "$R" rev-parse --short=9 HEAD) (checkout, read only) exit $?" | tee -a "$REC/check.log"
  echo "10.1.0 source diff 1da7eb17b..HEAD (empty line = none): [$(git -C "$R" diff --stat 1da7eb17b HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon | tail -1)]" | tee -a "$REC/check.log"
  ;;
declare)
  # H8-2's declaration with H9-1's homonyms, built from floor-v10.patch on floor v10; compared with floor v9's banked one.
  is "$FV10" || exit 3
  cd "$H"
  node declare-removed.mjs --patch "$FV10" --root "$W" --concepts deletes-floor.json --exact "$EXACT" --out "$REC/declare-floor-v10.json" 2>&1 | tee "$REC/declare-floor-v10.log"
  python3 -I -c 'import json,sys; a=json.load(open(sys.argv[1])); c=json.load(open(sys.argv[2])); [x.pop("patch",None) for x in (a,c)]; print("declaration floor-v10.patch on floor v10 vs pass-10 banked declare-floor-v9.json (patch label aside):", "IDENTICAL" if a==c else "DIFFER: "+",".join(k for k in sorted(set(a)|set(c)) if a.get(k)!=c.get(k)))' "$REC/declare-floor-v10.json" "$P10/FV9-records/declare-floor-v9.json" | tee -a "$REC/declare-floor-v10.log"
  ;;
static)
  # DEL under H8..H11 (fixture floor v10; floor v9 beside it; absent root; HEAD bite), H9's own declaration, LAW, HOV,
  # LIT, the census (bite: HEAD), the ladder diff (floor v9 to floor v10; bite HEAD).
  is "$FV10" || exit 3
  cd "$H"
  { echo "-- DEL (H8..H11) floor v10 (fixture)"; node deleted-mechanisms.mjs --root "$W" --declare "$REC/declare-floor-v10.json" --patch "$FV10" > "$REC/del-fv10.log" 2>&1; echo "DEL fv10 exit $?: $(tail -1 "$REC/del-fv10.log")"; grep -E 'text files|names=' "$REC/del-fv10.log" | head -3
    echo "-- DEL H10-1, absent root"; node deleted-mechanisms.mjs --root "$B/absent" --declare "$REC/declare-floor-v10.json" --patch "$FV10" > "$REC/del-absent.log" 2>&1; echo "DEL absent exit $?: $(tail -1 "$REC/del-absent.log")"
    echo "-- DEL, H9's own declaration (floor-v7.patch, 72 names)"; node deleted-mechanisms.mjs --root "$W" --declare "$P9/H9-records/declare-floor-v7-on-fv8.json" --patch "$M/pass-8/floor-v7.patch" > "$REC/del-H9decl-fv10.log" 2>&1; echo "DEL H9decl fv10 exit $?: $(tail -1 "$REC/del-H9decl-fv10.log")"
    echo "-- LAW"; node launch-law.mjs > "$REC/law.log" 2>&1; echo "LAW exit $?: $(tail -1 "$REC/law.log")"
    node hover-fill-selected.mjs --root "$W" > "$REC/HOV-fv10.log" 2>&1; echo "HOV exit $?: $(tail -1 "$REC/HOV-fv10.log")"
    node lighting-literals.mjs --root "$W" > "$REC/LIT-static-fv10.log" 2>&1; echo "LIT exit $?: $(grep -o 'LIGHTING-LITERALS.*' "$REC/LIT-static-fv10.log" | tail -1)"
    node "$M/pass-4/lighting-census.mjs" "$W" > "$REC/census-fv10.log" 2>&1; echo "census fv10 exit $?: $(tail -1 "$REC/census-fv10.log")"
    radii > "$REC/radii-fv10.txt"
    swap "$FV10" "$FV9"
    echo "-- DEL floor v9 under the floor v10 declaration and patch"; node deleted-mechanisms.mjs --root "$W" --declare "$REC/declare-floor-v10.json" --patch "$FV10" > "$REC/del-fv9-under-fv10.log" 2>&1; echo "DEL fv9 exit $?: $(tail -1 "$REC/del-fv9-under-fv10.log")"
    radii > "$REC/radii-fv9.txt"
    to_head "$FV9"; radii > "$REC/radii-head.txt"
    node "$M/pass-4/lighting-census.mjs" "$W" > "$REC/census-head.log" 2>&1; echo "census HEAD (10.1.0 source) exit $?: $(tail -1 "$REC/census-head.log")"
    echo "-- DEL HEAD under the floor v10 declaration and patch (bite)"; node deleted-mechanisms.mjs --root "$W" --declare "$REC/declare-floor-v10.json" --patch "$FV10" > "$REC/del-head.log" 2>&1; echo "DEL HEAD exit $?: $(tail -1 "$REC/del-head.log")"
    from_head "$FV10"
    echo "-- LADDER diff radii-fv9 radii-fv10 (fixture: prints nothing)"; diff "$REC/radii-fv9.txt" "$REC/radii-fv10.txt"; echo "LADDER fv9-fv10 exit $?"
    echo "-- LADDER diff radii-head radii-fv10 (bite)"; diff "$REC/radii-head.txt" "$REC/radii-fv10.txt"; echo "LADDER head exit $?"
  } 2>&1 | tee "$REC/static.log"
  ;;
sweep)
  # R-21 (b): the frozen list over floor v10 (LIST); floor v10 under FV10-rulings.json (the critic's proposed rulings
  # carried forward); floor v9 under the same (plant: red at R-28's seven lines); floor v10 under FV9-rulings.json
  # (H10-2's plant: the rewritten lines go stale or unread).
  is "$FV10" || exit 3
  cd "$H"
  { node prose-sweep.mjs --root "$W" --patch "$FV10" --declare "$REC/declare-floor-v10.json" > "$REC/sweep-fv10.log" 2>&1; echo "SWEEP fv10 LIST exit $?: $(tail -1 "$REC/sweep-fv10.log")"
    node prose-sweep.mjs --root "$W" --patch "$FV10" --declare "$REC/declare-floor-v10.json" --rulings "$P11/FV10-rulings.json" > "$REC/sweep-fv10-ruled.log" 2>&1; echo "SWEEP fv10 under FV10-rulings.json exit $?: $(tail -1 "$REC/sweep-fv10-ruled.log")"
    node prose-sweep.mjs --root "$W" --patch "$FV10" --declare "$REC/declare-floor-v10.json" --rulings "$P10/FV9-rulings.json" > "$REC/sweep-fv10-under-fv9-rulings.log" 2>&1; echo "SWEEP fv10 under FV9-rulings.json exit $?: $(tail -1 "$REC/sweep-fv10-under-fv9-rulings.log")"
    swap "$FV10" "$FV9"
    node prose-sweep.mjs --root "$W" --patch "$FV10" --declare "$REC/declare-floor-v10.json" --rulings "$P11/FV10-rulings.json" > "$REC/sweep-fv9-plant.log" 2>&1; echo "SWEEP fv9 under FV10-rulings.json (plant) exit $?: $(tail -1 "$REC/sweep-fv9-plant.log")"
    swap "$FV9" "$FV10"
  } 2>&1 | tee "$REC/sweep.log"
  ;;
nbhd)
  # H11-2's print (R-30's reading aid, not gated) over floor v10 with floor-v10.patch, and over floor v9 with
  # floor-v9.patch (H11's plant, re-read); then the printed list's lines that the neighbourhood print reaches.
  is "$FV10" || exit 3
  cd "$H"
  { node neighbourhood.mjs --root "$W" --patch "$FV10" > "$REC/neighbourhood-fv10.log" 2>&1; echo "NEIGHBOURHOOD fv10 exit $?: $(tail -1 "$REC/neighbourhood-fv10.log")"; grep '^NEIGHBOURHOOD' "$REC/neighbourhood-fv10.log"
    grep -oE '^[^ ]+:[0-9]+ \[' "$REC/neighbourhood-fv10.log" | sed 's/ \[$//' | sort -u > "$B/nb.txt"
    grep -oE '^· [^ ]+:[0-9]+' "$REC/sweep-fv10.log" | sed 's/^· //' | sort -u > "$B/sw.txt"
    comm -12 "$B/nb.txt" "$B/sw.txt" > "$REC/printed-in-neighbourhood-fv10.txt"; echo "printed-list lines the neighbourhood print reaches: $(wc -l < "$REC/printed-in-neighbourhood-fv10.txt" | tr -d ' ') of $(wc -l < "$B/sw.txt" | tr -d ' ')"
    swap "$FV10" "$FV9"
    node neighbourhood.mjs --root "$W" --patch "$FV9" > "$REC/neighbourhood-fv9.log" 2>&1; echo "NEIGHBOURHOOD fv9 exit $?: $(tail -1 "$REC/neighbourhood-fv9.log")"
    swap "$FV9" "$FV10"
    diff <(grep '^NEIGHBOURHOOD' "$REC/neighbourhood-fv9.log") <(grep '^NEIGHBOURHOOD' "$REC/neighbourhood-fv10.log"); echo "tally fv9 vs fv10: diff exit $?"
    diff <(cut -d'|' -f1 "$REC/neighbourhood-fv9.log") <(cut -d'|' -f1 "$REC/neighbourhood-fv10.log") > "$REC/neighbourhood-fv9-fv10.diff"; echo "line keys fv9 vs fv10: diff exit $?, $(grep -c '^[<>]' "$REC/neighbourhood-fv9-fv10.diff") lines"
  } 2>&1 | tee "$REC/nbhd.log"
  ;;
same)
  # R-22 / R-27: floor v10, floor v9 and floor v10 again, each built under one label ("same") in this one session, each
  # output moved aside; compared raw (diff -rq, sha256 lists). The tie to pass 10's bank cites only the specimen CSS hash
  # and the dist-demo sha256 list (R-27).
  is "$FV10" || exit 3
  O=$D3_OUT/builds; S=$D3_OUT/same; rm -rf "$S"; mkdir -p "$S"
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/fv10"; echo "fv10 built as 'same' $(ts)"
  swap "$FV10" "$FV9"
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/fv9"; echo "fv9 built as 'same' $(ts)"
  swap "$FV9" "$FV10"
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/fv10b"; echo "fv10 rebuilt as 'same' (determinism) $(ts)"
  { for k in dist demo; do
      diff -rq -x build.json "$S/fv9/$k" "$S/fv10/$k" > "$REC/same-$k-fv9-fv10.txt"; echo "$k fv9 vs fv10: diff -rq exit $?, $(wc -l < "$REC/same-$k-fv9-fv10.txt" | tr -d ' ') lines"
      diff -rq -x build.json "$S/fv10/$k" "$S/fv10b/$k" > /dev/null; echo "$k fv10 vs fv10 rebuilt: diff -rq exit $?"
      (cd "$S/fv10/$k" && find . -type f ! -name build.json | sort | xargs shasum -a 256) > "$REC/same-fv10-$k.sha256"
      (cd "$S/fv9/$k" && find . -type f ! -name build.json | sort | xargs shasum -a 256) > "$REC/same-fv9-$k.sha256"
      echo "$k: fv10 $(wc -l < "$REC/same-fv10-$k.sha256" | tr -d ' ') files, fv9 $(wc -l < "$REC/same-fv9-$k.sha256" | tr -d ' ') files; sha256 lists diff: $(diff -q "$REC/same-fv9-$k.sha256" "$REC/same-fv10-$k.sha256" >/dev/null && echo identical || echo DIFFER)"
    done
    for l in fv9 fv10; do for c in "$S/$l/dist"/assets/*.css; do echo "$l specimen css $(basename "$c") $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -c1-16)"; done; done
    echo "-- R-27 tie to pass 10's bank: the specimen CSS hash and the dist-demo sha256 list only"
    grep -E '\.css$' "$P10/FV9-records/same-fv9-dist.sha256" | sed 's/^/banked fv9 specimen css: /'
    grep -E '\.css$' "$REC/same-fv10-dist.sha256" | sed 's/^/fv10 specimen css:        /'
    diff "$P10/FV9-records/same-fv9-demo.sha256" "$REC/same-fv10-demo.sha256" > "$REC/same-demo-fv9banked-fv10.txt"; echo "demo banked fv9 list vs fv10 list: diff exit $?, $(wc -l < "$REC/same-demo-fv9banked-fv10.txt" | tr -d ' ') lines"
  } 2>&1 | tee "$REC/same.log"
  ;;
bite)
  # The byte proof's bite: HEAD built the same way under the same label must differ from floor v10.
  O=$D3_OUT/builds; S=$D3_OUT/same
  to_head "$FV10"
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; rm -rf "$S/head"; mv "$O/same" "$S/head"; echo "HEAD built as 'same' $(ts)"
  from_head "$FV10"
  { for k in dist demo; do diff -rq -x build.json "$S/head/$k" "$S/fv10/$k" > "$REC/bite-$k-head-fv10.txt"; echo "bite $k HEAD vs fv10: diff -rq exit $?, $(wc -l < "$REC/bite-$k-head-fv10.txt" | tr -d ' ') lines"; done
    for c in "$S/head/dist"/assets/*.css; do echo "HEAD specimen css $(basename "$c") $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -c1-16)"; done
  } 2>&1 | tee "$REC/bite.log"
  ;;
toolchain)
  # Typecheck (src), library build, the test typecheck after it, the dist-demo (before the units: the boot-graph rows
  # read it), vitest --maxWorkers=2. Caches inside the worktree.
  is "$FV10" || exit 3
  cd "$W"
  printf 'import base from "./vite.config";\nexport default { ...(base as object), cacheDir: ".cache-fv10/vite" };\n' > vite.fv10.config.ts
  printf 'import base from "./vitest.config";\nexport default { ...(base as object), cacheDir: ".cache-fv10/vitest" };\n' > vitest.fv10.config.ts
  printf 'import base from "./demo/vite.demo-dist.config";\nexport default { ...(base as object), cacheDir: ".cache-fv10/vite-demo" };\n' > vite.fv10demo.config.ts
  { npx vue-tsc --noEmit > "$REC/tsc-app.log" 2>&1; echo "typecheck app exit $? $(ts)"
    npx vite build --config vite.fv10.config.ts > "$REC/libbuild.log" 2>&1; echo "library build exit $? $(ts)"
    npx vue-tsc --noEmit -p tsconfig.test.json > "$REC/tsc-test.log" 2>&1; echo "typecheck tests exit $? $(ts)"
    npx vite build --config vite.fv10demo.config.ts > "$REC/demobuild.log" 2>&1; echo "dist-demo exit $? $(ts)"
    npx vitest run --config vitest.fv10.config.ts --maxWorkers=2 --testTimeout 240000 > "$REC/units.log" 2>&1; echo "vitest exit $? $(ts)"
    grep -E "Test Files|Tests  " "$REC/units.log"
  } 2>&1 | tee "$REC/toolchain.log"
  rm -f vite.fv10.config.ts vitest.fv10.config.ts vite.fv10demo.config.ts
  ;;
seat)
  # Added after the sweep phase: the seat's own R-26 / R-30 reading (FV10-readsheet.py over the 207 lines, H11-2's print
  # beside it) reads two printed lines false that the carried rulings call true. Read on two plain copies outside git
  # (the worktree is busy with the heavy phases): $B/fv10tree = HEAD's src/demo/tests/docs + floor-v10.patch, and
  # $B/fv10s = the same + FV10-seat-proposed.diff. Static only.
  T=$B/fv10tree; TS=$B/fv10s; cd "$H"
  { python3 -I "$P11/FV10-rulings-seat.py" "$P11/FV10-rulings.json" "$P11/FV10-rulings-seat.json" "$P11/FV10-rulings-seat-proposed.json"
    rm -rf "$TS"; cp -R "$T" "$TS"; python3 -I "$P11/FV10-seat-proposed.py" "$TS"
    (cd "$B" && git diff --no-index fv10tree/src fv10s/src) | sed -e 's#^diff --git a/fv10tree/#diff --git a/#' -e 's# b/fv10s/# b/#' -e 's#^--- a/fv10tree/#--- a/#' -e 's#^+++ b/fv10s/#+++ b/#' > "$P11/FV10-seat-proposed.diff"
    echo "FV10-seat-proposed.diff: $(grep -c '^diff --git' "$P11/FV10-seat-proposed.diff") files, +$(grep -c '^+[^+]' "$P11/FV10-seat-proposed.diff")/-$(grep -c '^-[^-]' "$P11/FV10-seat-proposed.diff"), sha1 $(shasum "$P11/FV10-seat-proposed.diff" | cut -c1-8)"
    diff -rq "$T" "$TS" | sed "s#$B/##g"
    node prose-sweep.mjs --root "$T" --patch "$FV10" --declare "$REC/declare-floor-v10.json" --rulings "$P11/FV10-rulings.json" > "$REC/sweep-fv10copy-carried.log" 2>&1; echo "SWEEP floor v10 (copy) under FV10-rulings.json exit $?: $(tail -1 "$REC/sweep-fv10copy-carried.log")"
    node prose-sweep.mjs --root "$T" --patch "$FV10" --declare "$REC/declare-floor-v10.json" --rulings "$P11/FV10-rulings-seat.json" > "$REC/sweep-fv10-seat.log" 2>&1; echo "SWEEP floor v10 under FV10-rulings-seat.json exit $?: $(tail -1 "$REC/sweep-fv10-seat.log")"; grep -E '^\s*(✗|\?|unread|·.*unread)' "$REC/sweep-fv10-seat.log" | head -4
    node prose-sweep.mjs --root "$TS" --patch "$FV10" --declare "$REC/declare-floor-v10.json" --rulings "$P11/FV10-rulings-seat-proposed.json" > "$REC/sweep-fv10s-seatp.log" 2>&1; echo "SWEEP floor v10 + seat delta under FV10-rulings-seat-proposed.json exit $?: $(tail -1 "$REC/sweep-fv10s-seatp.log")"
    node prose-sweep.mjs --root "$T" --patch "$FV10" --declare "$REC/declare-floor-v10.json" --rulings "$P11/FV10-rulings-seat-proposed.json" > "$REC/sweep-fv10-under-seatp.log" 2>&1; echo "SWEEP floor v10 under FV10-rulings-seat-proposed.json (plant) exit $?: $(tail -1 "$REC/sweep-fv10-under-seatp.log")"
    node deleted-mechanisms.mjs --root "$TS" --declare "$REC/declare-floor-v10.json" --patch "$FV10" > "$REC/del-fv10s.log" 2>&1; echo "DEL floor v10 + seat delta exit $?: $(tail -1 "$REC/del-fv10s.log")"
    node deleted-mechanisms.mjs --root "$T" --declare "$REC/declare-floor-v10.json" --patch "$FV10" > "$REC/del-fv10copy.log" 2>&1; echo "DEL floor v10 (copy) exit $?: $(tail -1 "$REC/del-fv10copy.log")"
    node neighbourhood.mjs --root "$TS" --patch "$FV10" > "$REC/neighbourhood-fv10s.log" 2>&1; echo "NEIGHBOURHOOD floor v10 + seat delta exit $?: $(tail -1 "$REC/neighbourhood-fv10s.log")"
  } 2>&1 | tee "$REC/seat.log"
  ;;
seat-same)
  # The seat delta's byte proof: floor v10 + FV10-seat-proposed.diff built in the worktree under the same label after the
  # `same` phase, compared raw with that phase's floor v10 output (this session, this worktree).
  is "$FV10" || exit 3
  O=$D3_OUT/builds; S=$D3_OUT/same
  git -C "$W" apply "$P11/FV10-seat-proposed.diff" || exit 3
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; rm -rf "$S/fv10s"; mv "$O/same" "$S/fv10s"; echo "fv10 + seat delta built as 'same' $(ts)"
  git -C "$W" apply -R "$P11/FV10-seat-proposed.diff" || exit 3; is "$FV10" || exit 3
  { for k in dist demo; do diff -rq -x build.json "$S/fv10/$k" "$S/fv10s/$k" > /dev/null; echo "$k fv10 vs fv10 + seat delta: diff -rq exit $?"; done
    for c in "$S/fv10s/dist"/assets/*.css; do echo "fv10 + seat delta specimen css $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -c1-16)"; done
  } 2>&1 | tee "$REC/seat-same.log"
  ;;
reds)
  # The machine law's re-run: the two files red in `toolchain` (load 126-145 at the time), each re-run twice on floor
  # v10, one vitest at a time, --maxWorkers=2. slider.size-tokens launches a headless browser (its own afterAll closes it).
  is "$FV10" || exit 3
  cd "$W"
  printf 'import base from "./vitest.config";\nexport default { ...(base as object), cacheDir: ".cache-fv10/vitest" };\n' > vitest.fv10.config.ts
  { for k in 1 2; do
      npx vitest run --config vitest.fv10.config.ts --maxWorkers=2 --testTimeout 240000 tests/components/menu/contract.test.ts tests/components/slider.size-tokens.test.ts > "$REC/reds-run$k.log" 2>&1
      echo "reds run $k exit $? $(ts): $(grep -E '^ +Tests ' "$REC/reds-run$k.log" | tr -s ' ')"
    done
  } 2>&1 | tee "$REC/reds.log"
  rm -f vitest.fv10.config.ts
  ;;
recheck)
  # Resume after the 14:01 reboot: HEAD moved (docs only) to the O-103 bank; re-read apply --check and the 10.1.0
  # source diff at the new HEAD, into a log named by that HEAD (check.log keeps the 04424ac60 reading).
  Hh=$(git -C "$R" rev-parse --short=9 HEAD)
  { git -C "$R" apply --check "$FV10"; echo "git apply --check floor-v10.patch at $Hh (checkout, read only) exit $?"
    to_head "$FV10" >/dev/null; git -C "$W" apply --check "$FV10"; echo "git apply --check floor-v10.patch at $(git -C "$W" rev-parse --short=9 HEAD) (worktree, cut at the pre-reboot HEAD) exit $?"; from_head "$FV10" >/dev/null
    echo "04424ac60..$Hh non-docs diff (empty = none): [$(git -C "$R" diff --stat 04424ac60 HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon | tail -1)]"
    echo "10.1.0 source diff 1da7eb17b..$Hh (empty = none): [$(git -C "$R" diff --stat 1da7eb17b HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon | tail -1)]"
    is "$FV10"
  } 2>&1 | tee "$REC/check-$Hh.log"
  ;;
resume-same)
  # After the reboot: floor v10 built again under the same label (fv10c), compared raw with the pre-reboot fv10, fv10b
  # and the seat delta's fv10s, so the seat delta's proof has a same-boot partner as well as the same-worktree one.
  is "$FV10" || exit 3
  O=$D3_OUT/builds; S=$D3_OUT/same
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; rm -rf "$S/fv10c"; mv "$O/same" "$S/fv10c"; echo "fv10 rebuilt after the reboot as 'same' $(ts)"
  { for k in dist demo; do for o in fv10 fv10b fv10s; do diff -rq -x build.json "$S/fv10c/$k" "$S/$o/$k" > /dev/null; echo "$k fv10c (post-reboot) vs $o: diff -rq exit $?"; done; done
    for c in "$S/fv10c/dist"/assets/*.css; do echo "fv10c specimen css $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -c1-16)"; done
  } 2>&1 | tee "$REC/resume-same.log"
  ;;
teardown)
  git -C "$R" worktree remove --force "$W"; git -C "$R" worktree prune; rm -rf "$B"; rmdir "$R/.claude/worktrees/bl/D3/p11" 2>/dev/null; ls "$R/.claude/worktrees/bl/D3/" 2>&1; echo "D3/p11/floor10 worktrees listed: $(git -C "$R" worktree list | grep -c 'D3/p11/floor10')"; true
  ;;
esac
echo "== $phase end $(ts)" | tee -a "$REC/phases.log"
