#!/usr/bin/env bash
# FV7-run.sh · D3 pass 8, floor v7 (REGISTRY P7-6.2 step 2): every command this seat ran, by phase.
# floor v7 = pass-7/floor-v6.patch + R-17 (i) (forms-seam.test.ts: the header fence, the G-F2 title, the G-F2 perimeter
# comment) + the one further sentence H8-1 finds (liquid-fill.css:74), written whole as pass-8/floor-v7.patch.
# No owner ruling has arrived (INBOUND ends at O-98), so no variant is selected.
# One worktree (.claude/worktrees/bl/D3/p8/floor7/wt), floor v7 applied by default; a phase that needs floor v6 or HEAD
# swaps the patch and swaps it back, each swap checked with cmp (or a clean git status at HEAD).
# Builds and caches live in $W/.d3out and $W/.cache-fv7. Records land in pass-8/FV7-records/.
#   bash FV7-run.sh patch|check|declare|static|same|toolchain|teardown
# Each phase is launched as `~/.claude/guard/guarded [--light] --timeout N -- bash FV7-run.sh <phase>` (the guard is the
# literal command word, P7-5); inside a phase nothing launches a browser.
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p8/floor7
W=$B/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
P8=$M/pass-8
REC=$P8/FV7-records
FV6=$M/pass-7/floor-v6.patch
FV7=$P8/floor-v7.patch
MS5=$M/pass-7/minor-split-v5.patch
export D3_OUT=$W/.d3out
mkdir -p "$REC"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
is() { git -C "$W" diff HEAD --binary | cmp -s - "$1" && echo "worktree = $(basename "$1")"; }
swap() { is "$1" >/dev/null && git -C "$W" apply -R "$1" 2>/dev/null && git -C "$W" apply "$2" 2>/dev/null; is "$2" || exit 3; }
to_head() { is "$1" >/dev/null && git -C "$W" apply -R "$1" 2>/dev/null && test -z "$(git -C "$W" status --porcelain -- src demo tests)" && echo "worktree = HEAD" || exit 3; }
from_head() { test -z "$(git -C "$W" status --porcelain -- src demo tests)" && git -C "$W" apply "$1" 2>/dev/null; is "$1" || exit 3; }
radii() { grep -E -- '--glass-blur-(wash|quiet|resting|floating|overlay)-radius:' "$W/src/styles/tokens/glass.css" | sed 's/^ *//'; }
FILES="tests/components/field/forms-seam.test.ts src/styles/glass/liquid-fill.css"
phase=$1; shift
echo "== $phase start $(ts)" | tee -a "$REC/phases.log"
case $phase in
patch)
  # The worktree holds floor v6 + the seat's edits (made in place, by exact-string substitution). Write floor-v7.patch
  # and the R-17 delta (floor v6 -> floor v7), and check floor v6 + delta = floor v7 byte for byte.
  git -C "$W" diff HEAD --binary > "$FV7"
  D=$B/r17; rm -rf "$D"; mkdir -p "$D/a" "$D/b"
  for f in $FILES; do mkdir -p "$D/b/$(dirname "$f")"; cp "$W/$f" "$D/b/$f"; done
  swap "$FV7" "$FV6"; for f in $FILES; do mkdir -p "$D/a/$(dirname "$f")"; cp "$W/$f" "$D/a/$f"; done
  (cd "$D" && git diff --no-index a b) | sed -e 's#^diff --git a/a/#diff --git a/#' -e 's# b/b/# b/#' -e 's#^--- a/a/#--- a/#' -e 's#^+++ b/b/#+++ b/#' > "$P8/floor-v7-R17.diff"
  git -C "$W" apply "$P8/floor-v7-R17.diff" && git -C "$W" diff HEAD --binary | cmp - "$FV7" && echo "floor-v6.patch + floor-v7-R17.diff = floor-v7.patch (cmp)"
  is "$FV7" || exit 3
  { echo "floor-v7-R17.diff: $(grep -c '^diff --git' "$P8/floor-v7-R17.diff") files, +$(grep -c '^+[^+]' "$P8/floor-v7-R17.diff")/-$(grep -c '^-[^-]' "$P8/floor-v7-R17.diff")"
    echo "floor-v6.patch: $(grep -c '^diff --git' "$FV6") files, sha1 $(shasum "$FV6" | cut -c1-8)"
    echo "floor-v7.patch: $(grep -c '^diff --git' "$FV7") files, sha1 $(shasum "$FV7" | cut -c1-8); git diff --shortstat: $(git -C "$W" diff HEAD --shortstat)"
    diff <(git apply --numstat "$FV6" | cut -f3) <(git apply --numstat "$FV7" | cut -f3); echo "same path list as floor v6: exit $?"; } 2>&1 | tee "$REC/patch.log"
  ;;
check)
  # git apply --check of floor-v7.patch at HEAD, in the worktree returned to HEAD and in the checkout (read only).
  to_head "$FV7"; git -C "$W" apply --check "$FV7"; echo "git apply --check floor-v7.patch at $(git -C "$W" rev-parse --short=9 HEAD) (worktree) exit $?" | tee "$REC/check.log"; from_head "$FV7"
  git -C "$R" apply --check "$FV7"; echo "git apply --check floor-v7.patch at $(git -C "$R" rev-parse --short=9 HEAD) (checkout, read only) exit $?" | tee -a "$REC/check.log"
  ;;
declare)
  # H8-2's declaration built from floor-v7.patch, with deletes-floor.json and H8's exact list (H8 §6).
  is "$FV7" || exit 3
  cd "$H"
  node declare-removed.mjs --patch "$FV7" --root "$W" --concepts deletes-floor.json --exact "$P8/H8-exact-floor-v6.json" --out "$REC/declare-floor-v7.json" 2>&1 | tee "$REC/declare-floor-v7.log"
  node declare-removed.mjs --patch "$FV6" --root "$W" --concepts deletes-floor.json --exact "$P8/H8-exact-floor-v6.json" --out "$REC/declare-floor-v6-on-fv7.json" > "$REC/declare-floor-v6-on-fv7.log" 2>&1
  python3 -I -c 'import json,sys; a=json.load(open(sys.argv[1])); b=json.load(open(sys.argv[2])); print("declaration floor-v7.patch vs floor-v6.patch (same tree):", "IDENTICAL" if a==b else "DIFFER")' "$REC/declare-floor-v7.json" "$REC/declare-floor-v6-on-fv7.json" | tee -a "$REC/declare-floor-v7.log"
  ;;
static)
  # DEL under H8-1 and H8-2 (fixture floor v7; plant floor v6 under the same declaration and patch), LAW, HOV, LIT,
  # the census (bite: HEAD's src/styles), the ladder diff (fixture vs the minor v5; bite HEAD).
  is "$FV7" || exit 3
  cd "$H"
  { echo "-- DEL H8 floor v7 (fixture)"; node deleted-mechanisms.mjs --root "$W" --declare "$REC/declare-floor-v7.json" --patch "$FV7" > "$REC/del-H8-fv7.log" 2>&1; echo "DEL fv7 exit $?: $(grep -E '^(PASS|FAIL)' "$REC/del-H8-fv7.log")"
    echo "-- DEL deletes-floor.json alone, floor v7"; node deleted-mechanisms.mjs --root "$W" --declare deletes-floor.json --patch "$FV7" > "$REC/del-floor-fv7.log" 2>&1; echo "exit $?: $(grep -E '^(PASS|FAIL)' "$REC/del-floor-fv7.log")"
    echo "-- LAW"; node launch-law.mjs > "$REC/law.log" 2>&1; echo "LAW exit $?: $(tail -1 "$REC/law.log")"
    node hover-fill-selected.mjs --root "$W" > "$REC/HOV-fv7.log" 2>&1; echo "HOV exit $?: $(tail -1 "$REC/HOV-fv7.log")"
    node lighting-literals.mjs --root "$W" > "$REC/LIT-static-fv7.log" 2>&1; echo "LIT exit $?: $(grep -o 'LIGHTING-LITERALS.*' "$REC/LIT-static-fv7.log" | tail -1)"
    node "$M/pass-4/lighting-census.mjs" "$W" > "$REC/census-fv7.log" 2>&1; echo "census fv7 exit $?: $(tail -1 "$REC/census-fv7.log")"
    radii > "$REC/radii-fv7.txt"
    swap "$FV7" "$FV6"
    echo "-- DEL H8 floor v6 under the floor v7 declaration and patch (plant)"; node deleted-mechanisms.mjs --root "$W" --declare "$REC/declare-floor-v7.json" --patch "$FV7" > "$REC/del-H8-fv6-plant.log" 2>&1; echo "DEL fv6 exit $?: $(grep -E '^(PASS|FAIL)' "$REC/del-H8-fv6-plant.log")"
    radii > "$REC/radii-fv6.txt"
    swap "$FV6" "$MS5"; radii > "$REC/radii-minor5.txt"
    to_head "$MS5"; radii > "$REC/radii-head.txt"
    node "$M/pass-4/lighting-census.mjs" "$W" > "$REC/census-head.log" 2>&1; echo "census HEAD (10.1.0 source) exit $?: $(tail -1 "$REC/census-head.log")"
    from_head "$FV7"
    echo "-- LADDER diff radii-fv7 radii-minor5 (fixture: prints nothing)"; diff "$REC/radii-fv7.txt" "$REC/radii-minor5.txt"; echo "LADDER fv7 exit $?"
    echo "-- LADDER diff radii-fv6 radii-fv7"; diff "$REC/radii-fv6.txt" "$REC/radii-fv7.txt"; echo "LADDER fv6-fv7 exit $?"
    echo "-- LADDER diff radii-head radii-minor5 (bite)"; diff "$REC/radii-head.txt" "$REC/radii-minor5.txt"; echo "LADDER head exit $?"
  } 2>&1 | tee "$REC/static.log"
  ;;
same)
  # The byte-identity proof. Floor v7 and floor v6 are each built by harness/build.mjs --demo under ONE label ("same"),
  # each output moved aside, and floor v7 rebuilt once for determinism; then compared byte for byte, dist and demo.
  is "$FV7" || exit 3
  O=$D3_OUT/builds; S=$D3_OUT/same; rm -rf "$S"; mkdir -p "$S"
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/fv7"; echo "fv7 built as 'same' $(ts)"
  swap "$FV7" "$FV6"
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/fv6"; echo "fv6 built as 'same' $(ts)"
  swap "$FV6" "$FV7"
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/fv7b"; echo "fv7 rebuilt as 'same' (determinism) $(ts)"
  { for k in dist demo; do
      diff -rq -x build.json "$S/fv6/$k" "$S/fv7/$k" > "$REC/same-$k-fv6-fv7.txt"; echo "$k fv6 vs fv7: diff -rq exit $?, $(wc -l < "$REC/same-$k-fv6-fv7.txt" | tr -d ' ') lines"
      diff -rq -x build.json "$S/fv7/$k" "$S/fv7b/$k" > /dev/null; echo "$k fv7 vs fv7 rebuilt: diff -rq exit $?"
      (cd "$S/fv7/$k" && find . -type f ! -name build.json | sort | xargs shasum -a 256) > "$REC/same-fv7-$k.sha256"
      (cd "$S/fv6/$k" && find . -type f ! -name build.json | sort | xargs shasum -a 256) > "$REC/same-fv6-$k.sha256"
      echo "$k: fv7 $(wc -l < "$REC/same-fv7-$k.sha256" | tr -d ' ') files, fv6 $(wc -l < "$REC/same-fv6-$k.sha256" | tr -d ' ') files; sha256 lists diff: $(diff -q "$REC/same-fv6-$k.sha256" "$REC/same-fv7-$k.sha256" >/dev/null && echo identical || echo DIFFER)"
    done
    for l in fv6 fv7; do for c in "$S/$l/dist"/assets/*.css; do echo "$l specimen css $(basename "$c") $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -c1-16)"; done; done
    echo "-- against pass 7's banked floor v6 same-label lists (FV6-records/same-fv6-*.sha256)"
    for k in dist demo; do diff "$M/pass-7/FV6-records/same-fv6-$k.sha256" "$REC/same-fv7-$k.sha256" > "$REC/same-$k-fv6banked-fv7.txt"; echo "$k banked fv6 vs fv7: diff exit $?, $(wc -l < "$REC/same-$k-fv6banked-fv7.txt" | tr -d ' ') lines"; done
  } 2>&1 | tee "$REC/same.log"
  ;;
bite)
  # The byte-identity proof's bite and its tie to pass 7's banked bytes. (1) HEAD built the same way under the same
  # label must differ from floor v7 (a build that ignored the tree would read identical). (2) The banked floor v6 specimen
  # JS (FV6-records/same-fv6-dist.sha256) differs from floor v7's only by the worktree path its //#region comments print
  # (p7/floor6 then, p8/floor7 now): rewrite that path in floor v7's JS and index.html, and hash again.
  O=$D3_OUT/builds; S=$D3_OUT/same
  to_head "$FV7"
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; rm -rf "$S/head"; mv "$O/same" "$S/head"; echo "HEAD built as 'same' $(ts)"
  from_head "$FV7"
  { for k in dist demo; do diff -rq -x build.json "$S/head/$k" "$S/fv7/$k" > "$REC/bite-$k-head-fv7.txt"; echo "bite $k HEAD vs fv7: diff -rq exit $?, $(wc -l < "$REC/bite-$k-head-fv7.txt" | tr -d ' ') lines"; done
    for c in "$S/head/dist"/assets/*.css; do echo "HEAD specimen css $(basename "$c") $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -c1-16)"; done
    N=$B/pathnorm; rm -rf "$N"; cp -R "$S/fv7/dist" "$N"
    for f in "$N"/assets/*.js; do LC_ALL=C sed -i '' 's#\.claude/worktrees/bl/D3/p8/floor7/wt/#.claude/worktrees/bl/D3/p7/floor6/wt/#g' "$f"; done
    for f in "$N"/assets/*.js; do echo "fv7 specimen JS, worktree path rewritten to pass 7's: sha256 $(shasum -a 256 "$f" | cut -d' ' -f1)"; done
    grep -E 'index-[A-Za-z0-9_-]+\.js$' "$M/pass-7/FV6-records/same-fv6-dist.sha256" | sed 's/^/banked fv6 specimen JS: /'
  } 2>&1 | tee "$REC/bite.log"
  ;;
toolchain)
  # Typecheck (src), library build, then the test typecheck (after the build: the self-import resolves through dist/,
  # P7-5), dist-demo (before the units: the boot-graph rows read it), vitest --maxWorkers=2.
  is "$FV7" || exit 3
  cd "$W"
  printf 'import base from "./vite.config";\nexport default { ...(base as object), cacheDir: ".cache-fv7/vite" };\n' > vite.fv7.config.ts
  printf 'import base from "./vitest.config";\nexport default { ...(base as object), cacheDir: ".cache-fv7/vitest" };\n' > vitest.fv7.config.ts
  printf 'import base from "./demo/vite.demo-dist.config";\nexport default { ...(base as object), cacheDir: ".cache-fv7/vite-demo" };\n' > vite.fv7demo.config.ts
  { npx vue-tsc --noEmit > "$REC/tsc-app.log" 2>&1; echo "typecheck app exit $? $(ts)"
    npx vite build --config vite.fv7.config.ts > "$REC/libbuild.log" 2>&1; echo "library build exit $? $(ts)"
    npx vue-tsc --noEmit -p tsconfig.test.json > "$REC/tsc-test.log" 2>&1; echo "typecheck tests exit $? $(ts)"
    npx vite build --config vite.fv7demo.config.ts > "$REC/demobuild.log" 2>&1; echo "dist-demo exit $? $(ts)"
    npx vitest run --config vitest.fv7.config.ts --maxWorkers=2 --testTimeout 240000 > "$REC/units.log" 2>&1; echo "vitest exit $? $(ts)"
    grep -E "Test Files|Tests  " "$REC/units.log"
    npx vitest run --config vitest.fv7.config.ts --maxWorkers=2 tests/components/field/forms-seam.test.ts > "$REC/units-forms-seam.log" 2>&1; echo "vitest forms-seam exit $? $(ts)"; grep -E "Tests  |G-F2" "$REC/units-forms-seam.log"
  } 2>&1 | tee "$REC/toolchain.log"
  rm -f vite.fv7.config.ts vitest.fv7.config.ts vite.fv7demo.config.ts
  ;;
teardown)
  git -C "$R" worktree remove --force "$W"; git -C "$R" worktree prune; rm -rf "$B"; rmdir "$R/.claude/worktrees/bl/D3/p8" 2>/dev/null; ls "$R/.claude/worktrees/bl/D3/" 2>&1; git -C "$R" worktree list | grep -c 'D3/p8' ; true
  ;;
esac
echo "== $phase end $(ts)" | tee -a "$REC/phases.log"
