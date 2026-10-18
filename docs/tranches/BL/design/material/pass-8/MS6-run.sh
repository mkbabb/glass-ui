#!/usr/bin/env bash
# MS6-run.sh · D3 pass 8, the minor split v6 (REGISTRY P7-6.2 step 3): every command this seat ran, by phase.
# minor v6 = pass-7/minor-split-v5.patch + R-18 (Crit A-3's table, fixed, and forms-seam.test.ts:91's title; comments
# and one test title, applied by MS6-r18-edits.py), written whole as pass-8/minor-split-v6.patch; the delta is
# pass-8/minor-split-v6-R18.diff. One worktree (.claude/worktrees/bl/D3/p8/minor6/wt); the minor v6 is applied by
# default, and a phase that needs the minor v5 or HEAD swaps the patch and swaps it back, each swap checked with cmp (or
# a clean git status at HEAD). Builds and caches live in $W/.d3out and $W/.cache-m6. Records land in pass-8/MS6-records/.
# No phase launches a browser: the bytes are proved first, and a browser phase would be added only if they did not hold.
# Each phase is launched as `~/.claude/guard/guarded [--light] --timeout N -- bash MS6-run.sh <phase>` (the guard is the
# literal command word, P7-5).
#   --light: edit check trees static selftest ratchet rebound teardown     heavy: same bite toolchain
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p8/minor6
W=$B/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
P8=$M/pass-8
REC=$P8/MS6-records
MS4=$M/pass-6/minor-split-v4.patch
MS5=$M/pass-7/minor-split-v5.patch
MS6=$P8/minor-split-v6.patch
FV7=$P8/floor-v7.patch
export D3_OUT=$W/.d3out
mkdir -p "$REC"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
is() { git -C "$W" diff HEAD --binary | cmp -s - "$1" && echo "worktree = $(basename "$1")"; }
swap() { is "$1" >/dev/null && git -C "$W" apply -R "$1" 2>/dev/null && git -C "$W" apply "$2" 2>/dev/null; is "$2" || exit 3; }
to_head() { is "$1" >/dev/null && git -C "$W" apply -R "$1" 2>/dev/null && test -z "$(git -C "$W" status --porcelain -- src demo tests DESIGN.md)" && echo "worktree = HEAD" || exit 3; }
from_head() { test -z "$(git -C "$W" status --porcelain -- src demo tests DESIGN.md)" && git -C "$W" apply "$1" 2>/dev/null; is "$1" || exit 3; }
radii() { grep -E -- '--glass-blur-(wash|quiet|resting|floating|overlay)-radius:' "$W/src/styles/tokens/glass.css" | sed 's/^ *//'; }
FILES="src/components/dock/styles/adaptive-legibility.css src/components/dock/styles/search.css src/components/dock/styles/shell.css src/components/dock/styles/index.css src/styles/tokens/property-regs.css src/styles/glass/surface-axis.css src/styles/glass/surfaces-pager.css tests/components/field/forms-seam.test.ts"
phase=$1; shift
echo "== $phase start $(ts)" | tee -a "$REC/phases.log"
case $phase in
edit)
  # The worktree holds the minor v5. Apply R-18 by exact-string substitution, write minor-split-v6.patch and the R-18
  # delta (minor v5 -> minor v6), and check minor v5 + delta = minor v6 byte for byte.
  is "$MS5" || exit 3
  python3 -I "$P8/MS6-r18-edits.py" "$W" || exit 4
  git -C "$W" diff HEAD --binary > "$MS6"
  D=$B/r18; rm -rf "$D"; mkdir -p "$D/a" "$D/b"
  for f in $FILES; do mkdir -p "$D/b/$(dirname "$f")"; cp "$W/$f" "$D/b/$f"; done
  swap "$MS6" "$MS5"; for f in $FILES; do mkdir -p "$D/a/$(dirname "$f")"; cp "$W/$f" "$D/a/$f"; done
  (cd "$D" && git diff --no-index a b) | sed -e 's#^diff --git a/a/#diff --git a/#' -e 's# b/b/# b/#' -e 's#^--- a/a/#--- a/#' -e 's#^+++ b/b/#+++ b/#' > "$P8/minor-split-v6-R18.diff"
  git -C "$W" apply "$P8/minor-split-v6-R18.diff" && git -C "$W" diff HEAD --binary | cmp - "$MS6" && echo "minor-split-v5.patch + minor-split-v6-R18.diff = minor-split-v6.patch (cmp)"
  is "$MS6" || exit 3
  { echo "minor-split-v6-R18.diff: $(grep -c '^diff --git' "$P8/minor-split-v6-R18.diff") files, +$(grep -c '^+[^+]' "$P8/minor-split-v6-R18.diff")/-$(grep -c '^-[^-]' "$P8/minor-split-v6-R18.diff"), sha1 $(shasum "$P8/minor-split-v6-R18.diff" | cut -c1-8)"
    echo "minor-split-v5.patch: $(grep -c '^diff --git' "$MS5") files, sha1 $(shasum "$MS5" | cut -c1-8)"
    echo "minor-split-v6.patch: $(grep -c '^diff --git' "$MS6") files, sha1 $(shasum "$MS6" | cut -c1-8); git diff --shortstat: $(git -C "$W" diff HEAD --shortstat)"
  } 2>&1 | tee "$REC/patch.log"
  ;;
paths)
  # The path lists (git apply --numstat run at the repo root: from a subdirectory it prints nothing, which the first
  # edit run hit), and the R-18 hunks' files by kind.
  { echo "-- paths the minor v6 adds to the minor v5's list"; diff <(git -C "$R" apply --numstat "$MS5" | cut -f3 | sort) <(git -C "$R" apply --numstat "$MS6" | cut -f3 | sort)
    echo "-- R-18 files: $(grep '^diff --git' "$P8/minor-split-v6-R18.diff" | awk '{print $3}' | sed 's#^a/##' | tr '\n' ' ')"
    echo "-- .vue files in the R-18 delta: $(grep '^diff --git' "$P8/minor-split-v6-R18.diff" | grep -c '\.vue ')"; } 2>&1 | tee -a "$REC/patch.log"
  ;;
check)
  # git apply --check of minor-split-v6.patch at HEAD, in the worktree returned to HEAD and in the checkout (read only).
  to_head "$MS6"; git -C "$W" apply --check "$MS6"; echo "git apply --check minor-split-v6.patch at $(git -C "$W" rev-parse --short=9 HEAD) (worktree) exit $?" | tee "$REC/check.log"; from_head "$MS6"
  git -C "$R" apply --check "$MS6"; echo "git apply --check minor-split-v6.patch at $(git -C "$R" rev-parse --short=9 HEAD) (checkout, read only) exit $?" | tee -a "$REC/check.log"
  git -C "$R" diff --stat 72cde4317 HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon | tee -a "$REC/check.log"; echo "source diff 72cde4317..HEAD above (empty = none)" | tee -a "$REC/check.log"
  ;;
trees)
  # The trees DEL reads: minor4 and minor5 (cut before the edit phase, from the same worktree) and minor6, each with
  # src/ demo/ tests/ and DESIGN.md (H8-1's scope); h7trees/ holds src/ demo/ only (H7-3's banked scope, the self-test's).
  is "$MS6" || exit 3
  rm -rf "$B/trees/minor6"; mkdir -p "$B/trees/minor6"; cp -R "$W/src" "$W/demo" "$W/tests" "$W/DESIGN.md" "$B/trees/minor6/"
  rm -rf "$B/h7trees"; for t in minor4 minor5 minor6; do mkdir -p "$B/h7trees/$t"; cp -R "$B/trees/$t/src" "$B/trees/$t/demo" "$B/h7trees/$t/"; done
  ls "$B/trees" "$B/h7trees"
  ;;
static)
  # H7-3 (DEL with the minor's declaration, grown by R-18 (ii): fixture minor v6, plants minor v5 and v4), on H7's scope
  # (src/ demo/) and on H8-1's (src/ demo/ tests/); H8-1 over the minor's own patch (R-18 (v)), the minor v6 and the
  # minor v5 under the minor v6 patch; the R-16 sweep; LAW; census (bite on v10.1.0 src/styles); HOV; LIT; the ladder.
  is "$MS6" || exit 3
  cd "$H"
  { echo "-- H7-3, deletes-minor.json ($(python3 -I -c 'import json,sys; print(len(json.load(open(sys.argv[1]))["names"]))' deletes-minor.json) names), H7 scope (src/ demo/)"
    for t in minor6 minor5 minor4; do node deleted-mechanisms.mjs --root "$B/h7trees/$t" --declare deletes-minor.json > "$REC/del-minor-$t.log" 2>&1; echo "DEL $t exit $?: $(tail -2 "$REC/del-minor-$t.log" | tr '\n' ' ')"; done
    echo "-- H7-3 under H8-1's scope (src/ demo/ tests/), no patch"
    for t in minor6 minor5; do node deleted-mechanisms.mjs --root "$B/trees/$t" --declare deletes-minor.json > "$REC/del-minor-h8scope-$t.log" 2>&1; echo "DEL $t exit $?: $(tail -1 "$REC/del-minor-h8scope-$t.log")"; done
    echo "-- H8-1 over the minor's own patch (R-18 (v)): minor v6 with minor-split-v6.patch; minor v5 with minor-split-v6.patch (plant) and with minor-split-v5.patch (H8 §4.3's reading)"
    node deleted-mechanisms.mjs --root "$B/trees/minor6" --declare deletes-minor.json --patch "$MS6" > "$REC/del-H8-minor6.log" 2>&1; echo "DEL H8 minor6 exit $?: $(tail -1 "$REC/del-H8-minor6.log")"
    node deleted-mechanisms.mjs --root "$B/trees/minor5" --declare deletes-minor.json --patch "$MS6" > "$REC/del-H8-minor5-plant.log" 2>&1; echo "DEL H8 minor5 under v6 decl+patch exit $?: $(tail -1 "$REC/del-H8-minor5-plant.log")"
    node deleted-mechanisms.mjs --root "$B/trees/minor5" --declare "$P8/MS6-records/deletes-minor-v5.json" --patch "$MS5" > "$REC/del-H8-minor5-asH8.log" 2>&1; echo "DEL H8 minor5 under v5 decl+patch (H8 §4.3) exit $?: $(tail -1 "$REC/del-H8-minor5-asH8.log")"
    echo "-- the R-16 sweep (grep -i darken minus press|tone-step|well|darker in dark|in dark), src + demo/stories"
    for t in minor5 minor6; do grep -rnEi 'darken' "$B/trees/$t/src" "$B/trees/$t/demo/stories" | grep -viE 'press|tone-step|well|darker in dark|in dark' | sed "s#$B/trees/$t/##" > "$REC/sweep-$t.txt"; echo "   $t: $(wc -l < "$REC/sweep-$t.txt" | tr -d ' ') lines"; done
    diff "$REC/sweep-minor5.txt" "$REC/sweep-minor6.txt" > "$REC/sweep-diff-minor5-minor6.txt"; echo "   diff sweep v5 v6: $(grep -c '^<' "$REC/sweep-diff-minor5-minor6.txt") lines gone, $(grep -c '^>' "$REC/sweep-diff-minor5-minor6.txt") added"
    echo "-- tint sweep (grep -i 'tint (axis|seam|arm|clamp)'), src"
    for t in minor5 minor6; do grep -rnEi 'tint[ -](axis|seam|arm|clamp)' "$B/trees/$t/src" | sed "s#$B/trees/$t/##" > "$REC/tint-$t.txt"; echo "   $t: $(wc -l < "$REC/tint-$t.txt" | tr -d ' ') lines"; done
    node launch-law.mjs > "$REC/law.log" 2>&1; echo "LAW exit $?: $(tail -1 "$REC/law.log")"
    node "$M/pass-4/lighting-census.mjs" "$W" > "$REC/census-minor6.log" 2>&1; echo "census minor6 exit $?: $(tail -1 "$REC/census-minor6.log")"
    t=$B/v1010; rm -rf "$t"; mkdir -p "$t"; git -C "$R" archive v10.1.0 src/styles | tar -x -C "$t"
    node "$M/pass-4/lighting-census.mjs" "$t" > "$REC/census-v1010.log" 2>&1; echo "census v10.1.0 exit $?: $(tail -1 "$REC/census-v1010.log")"; rm -rf "$t"
    node hover-fill-selected.mjs --root "$W" > "$REC/HOV-minor6.log" 2>&1; echo "HOV exit $?: $(tail -1 "$REC/HOV-minor6.log")"
    node lighting-literals.mjs --root "$W" > "$REC/LIT-static-minor6.log" 2>&1; echo "LIT exit $?: $(grep -o 'LIGHTING-LITERALS.*' "$REC/LIT-static-minor6.log" | tail -1)"
    radii > "$REC/radii-minor6.txt"; echo "-- LADDER diff radii-minor6 FV7 radii-minor5 (prints nothing)"; diff "$REC/radii-minor6.txt" "$P8/FV7-records/radii-minor5.txt"; echo "LADDER exit $?"
    echo "-- FL-14 static: @utility glass-plate declares isolation"; sed -n '/^@utility glass-plate/,/^}/p' "$W/src/styles/glass/veil.css" | grep -n "isolation"
    echo "-- identifiers on R-18's removed and added lines (comments and a title, so no declaration should move)"
    grep -E '^[-+][^-+]' "$P8/minor-split-v6-R18.diff" | grep -oE -- '--[a-z][a-z0-9-]+|data-[a-z-]+' | sort | uniq -c | sort -rn
  } 2>&1 | tee "$REC/static.log"
  ;;
selftest)
  # H7-3's rows (grown in place for R-18) with H6's DEL and LAW, H7-1 and the H8 rows' static parts that need no trees.
  cd "$H"
  node selftest.mjs --only H7-1,H7-3,DEL,LAW --h7-trees "$B/h7trees" > "$REC/selftest.log" 2>&1; echo "selftest exit $?: $(tail -1 "$REC/selftest.log")" | tee -a "$REC/selftest.log"
  ;;
selftest-h8)
  # The H8 rows' tree-free parts beside H7-3's (no --h8-trees: the floor trees are the floor seat's), so the record shows
  # the grown minor declaration moves no H8 row.
  cd "$H"
  node selftest.mjs --only LAW,DEL,H7-1,H7-3,H8-1,H8-2 --h7-trees "$B/h7trees" > "$REC/selftest-h8.log" 2>&1; echo "selftest (LAW, DEL, H7-1, H7-3, H8-1, H8-2) exit $?: $(tail -1 "$REC/selftest-h8.log")" | tee -a "$REC/selftest-h8.log"
  ;;
same)
  # The byte-identity proof (P7-2.2, thin builds): the minor v6 and the minor v5 built under ONE label, each output moved
  # aside, then compared byte for byte (specimen dist and dist-demo), plus a v6 rebuild for determinism.
  is "$MS6" || exit 3
  O=$D3_OUT/builds; S=$D3_OUT/same; rm -rf "$S"; mkdir -p "$S"
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/m6"; echo "minor v6 built as 'same' $(ts)"
  swap "$MS6" "$MS5"
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/m5"; echo "minor v5 built as 'same' $(ts)"
  swap "$MS5" "$MS6"
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/m6b"; echo "minor v6 rebuilt as 'same' (determinism) $(ts)"
  { for l in m6 m5 m6b; do echo "$l build.json: $(grep -oE '"srcDirtyFiles":[ ]*[0-9]+' "$S/$l/dist/build.json" 2>/dev/null || grep -oE '"srcDirtyFiles":[ ]*[0-9]+' "$S/$l/build.json" 2>/dev/null)"; done
    for k in dist demo; do
      diff -rq -x build.json "$S/m5/$k" "$S/m6/$k" > "$REC/same-$k-m5-m6.txt"; echo "$k minor v5 vs minor v6: diff -rq exit $?, $(wc -l < "$REC/same-$k-m5-m6.txt" | tr -d ' ') lines"
      diff -rq -x build.json "$S/m6/$k" "$S/m6b/$k" > /dev/null; echo "$k minor v6 vs minor v6 rebuilt: diff -rq exit $?"
      (cd "$S/m6/$k" && find . -type f ! -name build.json | sort | xargs shasum -a 256) > "$REC/same-m6-$k.sha256"
      (cd "$S/m5/$k" && find . -type f ! -name build.json | sort | xargs shasum -a 256) > "$REC/same-m5-$k.sha256"
      echo "$k files: m5 $(wc -l < "$REC/same-m5-$k.sha256" | tr -d ' '), m6 $(wc -l < "$REC/same-m6-$k.sha256" | tr -d ' '); sha256 list diff exit $(diff -q "$REC/same-m5-$k.sha256" "$REC/same-m6-$k.sha256" > /dev/null; echo $?)"
    done
    for l in m5 m6; do for c in "$S/$l/dist"/assets/*.css; do echo "$l specimen css $(basename "$c") $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -c1-16)"; done; done
    for l in m5 m6; do echo "$l dist-demo css total $(find "$S/$l/demo" -name '*.css' -exec cat {} + | wc -c | tr -d ' ') B, files $(find "$S/$l/demo" -type f | wc -l | tr -d ' ')"; done
    echo "-- against pass 7's banked minor v5 same-label lists (MS5-records/same-m5-*.sha256)"
    for k in dist demo; do diff "$M/pass-7/MS5-records/same-m5-$k.sha256" "$REC/same-m6-$k.sha256" > "$REC/same-$k-m5banked-m6.txt"; echo "$k banked m5 vs m6: diff exit $?, $(wc -l < "$REC/same-$k-m5banked-m6.txt" | tr -d ' ') lines"; done
  } 2>&1 | tee "$REC/same.log"
  ;;
bite)
  # The proof's bite: HEAD built the same way under the same label must differ from the minor v6 (a build that ignored
  # the tree would read identical). And the tie to pass 7's banked specimen JS, through the worktree path its //#region
  # comments print (p7/minor5 then, p8/minor6 now), if the banked JS differs.
  O=$D3_OUT/builds; S=$D3_OUT/same
  to_head "$MS6"
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; rm -rf "$S/head"; mv "$O/same" "$S/head"; echo "HEAD built as 'same' $(ts)"
  from_head "$MS6"
  { for k in dist demo; do diff -rq -x build.json "$S/head/$k" "$S/m6/$k" > "$REC/bite-$k-head-m6.txt"; echo "bite $k HEAD vs minor v6: diff -rq exit $?, $(wc -l < "$REC/bite-$k-head-m6.txt" | tr -d ' ') lines"; done
    for c in "$S/head/dist"/assets/*.css; do echo "HEAD specimen css $(basename "$c") $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -c1-16)"; done
    N=$B/pathnorm; rm -rf "$N"; cp -R "$S/m6/dist" "$N"
    for f in "$N"/assets/*.js; do LC_ALL=C sed -i '' 's#\.claude/worktrees/bl/D3/p8/minor6/wt/#.claude/worktrees/bl/D3/p7/minor5/wt/#g' "$f"; done
    for f in "$N"/assets/*.js; do echo "minor v6 specimen JS, worktree path rewritten to pass 7's: sha256 $(shasum -a 256 "$f" | cut -d' ' -f1)"; done
    grep -E 'index-[A-Za-z0-9_-]+\.js$' "$M/pass-7/MS5-records/same-m5-dist.sha256" | sed 's/^/banked minor v5 specimen JS: /'
  } 2>&1 | tee "$REC/bite.log"
  ;;
toolchain)
  # Typecheck (src), library build, the test typecheck after it (P7-5's order), dist-demo, vitest --maxWorkers=2, and
  # forms-seam.test.ts alone (its title moved).
  is "$MS6" || exit 3
  cd "$W"
  printf 'import base from "./vite.config";\nexport default { ...(base as object), cacheDir: ".cache-m6/vite" };\n' > vite.m6.config.ts
  printf 'import base from "./vitest.config";\nexport default { ...(base as object), cacheDir: ".cache-m6/vitest" };\n' > vitest.m6.config.ts
  printf 'import base from "./demo/vite.demo-dist.config";\nexport default { ...(base as object), cacheDir: ".cache-m6/vite-demo" };\n' > vite.m6demo.config.ts
  { npx vue-tsc --noEmit > "$REC/tsc-app.log" 2>&1; echo "typecheck app exit $? $(ts)"
    npx vite build --config vite.m6.config.ts > "$REC/libbuild.log" 2>&1; echo "library build exit $? $(ts)"
    npx vue-tsc --noEmit -p tsconfig.test.json > "$REC/tsc-test.log" 2>&1; echo "typecheck tests exit $? $(ts)"
    npx vite build --config vite.m6demo.config.ts > "$REC/demobuild.log" 2>&1; echo "dist-demo exit $? $(ts)"
    npx vitest run --config vitest.m6.config.ts --maxWorkers=2 --testTimeout 240000 > "$REC/units.log" 2>&1; echo "vitest exit $? $(ts)"
    grep -E "Test Files|Tests  " "$REC/units.log"
    npx vitest run --config vitest.m6.config.ts --maxWorkers=2 tests/components/field/forms-seam.test.ts > "$REC/units-forms-seam.log" 2>&1; echo "vitest forms-seam exit $? $(ts)"; grep -E "Tests  |G-F2" "$REC/units-forms-seam.log"
  } 2>&1 | tee "$REC/toolchain.log"
  rm -f vite.m6.config.ts vitest.m6.config.ts vite.m6demo.config.ts
  ;;
ratchet)
  # G5: the export/roster verifier on the minor v6's library build, the datum unrebound; then rebound in the worktree
  # only (MS5's method) and restored; and which library dist files carry an R-18 sentence.
  is "$MS6" || exit 3
  cd "$W"; { node scripts/verify-export-types.mjs > "$REC/verifier.log" 2>&1; echo "verifier exit $?: $(grep -E 'RATCHET|terminal|PRESENT' "$REC/verifier.log" | head -4 | tr '\n' ' ')"
    n=$(grep -oE "forbidden: [0-9]+" "$REC/verifier.log" | grep -oE "[0-9]+" | head -1); echo "$n" > .bundle-ratchet
    node scripts/verify-export-types.mjs > "$REC/verifier-rebound.log" 2>&1; echo "verifier (datum $n in the worktree) exit $?: $(grep -E 'terminal|PRESENT' "$REC/verifier-rebound.log" | head -3 | tr '\n' ' ')"
    git show HEAD:.bundle-ratchet > .bundle-ratchet; test -z "$(git status --porcelain -- .bundle-ratchet)" && echo ".bundle-ratchet restored to HEAD"
    git -C "$R" diff --stat v10.1.0 HEAD -- .published-roster; git diff --stat HEAD -- .published-roster; echo "roster diff (v10.1.0..HEAD, and the worktree) above: empty = unchanged"
    echo "-- library dist files carrying an R-18 phrase or rewrite (grep over dist/)"
    grep -rlE 'earned ink \(darker in dark|self-engage\. This|declarative lift|no tint axis to zero|plate composed at the element|foreground self-engage|plate.s earned ink|continuous ink' dist 2>/dev/null | head; echo "(end)"; } 2>&1 | tee "$REC/ratchet.log"
  ;;
law)
  # LAW over the harness and every pass-N/ (N >= 6), read after this seat's last script edit.
  cd "$H"; node launch-law.mjs > "$REC/law.log" 2>&1; echo "LAW exit $?: $(tail -1 "$REC/law.log")" | tee -a "$REC/law.log"
  ;;
teardown)
  git -C "$R" worktree remove --force "$W"; git -C "$R" worktree prune; rm -rf "$B"; rmdir "$R/.claude/worktrees/bl/D3/p8" 2>/dev/null; ls "$R/.claude/worktrees/bl/D3/" 2>&1; git -C "$R" worktree list | grep -c 'D3/p8'; git -C "$R" status --porcelain -- src demo tests | wc -l; true
  ;;
esac
echo "== $phase end $(ts)" | tee -a "$REC/phases.log"
