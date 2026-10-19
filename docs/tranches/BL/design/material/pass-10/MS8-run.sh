#!/usr/bin/env bash
# MS8-run.sh · D3 pass 10, the minor split v8 (REGISTRY P9-6.2 step 3): every command this seat ran, by phase.
# minor v8 = pass-9/minor-split-v7.patch + R-25: pass-9/MS7-r21b-proposed.diff (sha1 ccee3e30, DESIGN.md:34 and
# surface-axis.css:21-22) + the closing parenthesis the surfaces-pager.css fold dropped (MS8-r25-paren.py), written whole as
# pass-10/minor-split-v8.patch; the delta is pass-10/minor-split-v8-R25.diff. One worktree
# (.claude/worktrees/bl/D3/p10/minor8/wt); the minor v8 is applied by default, and a phase that needs the minor v7 or HEAD
# swaps the patch and swaps it back, each swap checked with cmp (or a clean git status at HEAD).
# Builds and caches live in $W/.d3out and $W/.cache-m8. Records land in pass-10/MS8-records/.
# No phase launches a browser: the bytes are proved first, and a browser phase would be added only if they did not hold.
# Each phase is launched as `~/.claude/guard/guarded [--light] --timeout N -- bash MS8-run.sh <phase>`.
#   --light: setup edit check trees static proposed sweep ratchet teardown     heavy: same bite toolchain proposed-same
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p10/minor8
W=$B/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
P9=$M/pass-9
P10=$M/pass-10
REC=$P10/MS8-records
MS7=$P9/minor-split-v7.patch
R21B=$P9/MS7-r21b-proposed.diff
MS8=$P10/minor-split-v8.patch
D25=$P10/minor-split-v8-R25.diff
export D3_OUT=$W/.d3out
mkdir -p "$REC"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
is() { git -C "$W" diff HEAD --binary | cmp -s - "$1" && echo "worktree = $(basename "$1")"; }
swap() { is "$1" >/dev/null && git -C "$W" apply -R "$1" 2>/dev/null && git -C "$W" apply "$2" 2>/dev/null; is "$2" || exit 3; }
to_head() { is "$1" >/dev/null && git -C "$W" apply -R "$1" 2>/dev/null && test -z "$(git -C "$W" status --porcelain -- src demo tests DESIGN.md)" && echo "worktree = HEAD" || exit 3; }
from_head() { test -z "$(git -C "$W" status --porcelain -- src demo tests DESIGN.md)" && git -C "$W" apply "$1" 2>/dev/null; is "$1" || exit 3; }
radii() { grep -E -- '--glass-blur-(wash|quiet|resting|floating|overlay)-radius:' "$W/src/styles/tokens/glass.css" | sed 's/^ *//'; }
cuttree() { rm -rf "$B/trees/$1"; mkdir -p "$B/trees/$1"; cp -R "$W/src" "$W/demo" "$W/tests" "$W/DESIGN.md" "$B/trees/$1/"; mkdir -p "$B/trees/$1/docs"; cp -R "$W/docs/canon" "$B/trees/$1/docs/"; cp "$W"/*.md "$B/trees/$1/" 2>/dev/null; true; }
FILES="DESIGN.md src/styles/glass/surface-axis.css src/styles/glass/surfaces-pager.css"
phase=$1; shift
echo "== $phase start $(ts)" | tee -a "$REC/phases.log"
case $phase in
setup)
  # The worktree at HEAD, node_modules symlinked, the minor v7 applied (cmp-checked); trees/minor7 cut before any edit.
  git -C "$R" worktree add --detach "$W" HEAD && ln -s "$R/node_modules" "$W/node_modules"
  git -C "$W" apply "$MS7"; is "$MS7" || exit 3
  cuttree minor7; ls "$B/trees"
  ;;
edit)
  # The worktree holds the minor v7. R-25: apply MS7-r21b-proposed.diff as banked, then the one closing parenthesis
  # (MS8-r25-paren.py, an exact-once substitution). Write minor-split-v8.patch and the R-25 delta (minor v7 -> minor v8),
  # and check minor v7 + delta = minor v8 byte for byte, and minor v7 + r21b + paren-only = minor v8.
  is "$MS7" || exit 3
  git -C "$W" apply "$R21B" || exit 4
  python3 -I "$P10/MS8-r25-paren.py" "$W" || exit 4
  git -C "$W" diff HEAD --binary > "$MS8"
  D=$B/r25; rm -rf "$D"; mkdir -p "$D/a" "$D/b"
  for f in $FILES; do mkdir -p "$D/b/$(dirname "$f")"; cp "$W/$f" "$D/b/$f"; done
  swap "$MS8" "$MS7"; for f in $FILES; do mkdir -p "$D/a/$(dirname "$f")"; cp "$W/$f" "$D/a/$f"; done
  (cd "$D" && git diff --no-index a b) | sed -e 's#^diff --git a/a/#diff --git a/#' -e 's# b/b/# b/#' -e 's#^--- a/a/#--- a/#' -e 's#^+++ b/b/#+++ b/#' > "$D25"
  git -C "$W" apply "$D25" && git -C "$W" diff HEAD --binary | cmp - "$MS8" && echo "minor-split-v7.patch + minor-split-v8-R25.diff = minor-split-v8.patch (cmp)"
  is "$MS8" || exit 3
  { echo "minor-split-v8-R25.diff: $(grep -c '^diff --git' "$D25") files, +$(grep -c '^+[^+]' "$D25")/-$(grep -c '^-[^-]' "$D25"), sha1 $(shasum "$D25" | cut -c1-8)"
    echo "MS7-r21b-proposed.diff: $(grep -c '^diff --git' "$R21B") files, sha1 $(shasum "$R21B" | cut -c1-8)"
    echo "minor-split-v7.patch: $(grep -c '^diff --git' "$MS7") files, sha1 $(shasum "$MS7" | cut -c1-8)"
    echo "minor-split-v8.patch: $(grep -c '^diff --git' "$MS8") files, sha1 $(shasum "$MS8" | cut -c1-8); git diff --shortstat: $(git -C "$W" diff HEAD --shortstat)"
    echo "-- path list, minor v7 vs minor v8 (prints nothing = equal)"; diff <(git -C "$R" apply --numstat "$MS7" | cut -f3 | sort) <(git -C "$R" apply --numstat "$MS8" | cut -f3 | sort); echo "paths diff exit $?"
    echo "-- the R-25 delta, the r21b hunks removed: what is left must be the one parenthesis"
    diff <(grep -E '^[-+][^-+]' "$R21B") <(grep -E '^[-+][^-+]' "$D25")
    echo "-- line counts per R-25 file, minor v7 -> minor v8"
    for f in $FILES; do echo "   $f $(wc -l < "$B/trees/minor7/$f" | tr -d ' ') -> $(wc -l < "$W/$f" | tr -d ' ')"; done
    echo "-- parentheses in the surfaces-pager.css pill comment (:20-40): minor v7 then minor v8"
    for t in "$B/trees/minor7" "$W"; do sed -n '20,40p' "$t/src/styles/glass/surfaces-pager.css" | awk '{o+=gsub(/\(/,"(");c+=gsub(/\)/,")")} END {print "   opens " o ", closes " c}'; done
    echo "-- .vue files in the R-25 delta: $(grep '^diff --git' "$D25" | grep -c '\.vue ')"
  } 2>&1 | tee "$REC/patch.log"
  ;;
check)
  to_head "$MS8"; git -C "$W" apply --check "$MS8"; echo "git apply --check minor-split-v8.patch at $(git -C "$W" rev-parse --short=9 HEAD) (worktree) exit $?" | tee "$REC/check.log"; from_head "$MS8"
  git -C "$R" apply --check "$MS8"; echo "git apply --check minor-split-v8.patch at $(git -C "$R" rev-parse --short=9 HEAD) (checkout, read only) exit $?" | tee -a "$REC/check.log"
  git -C "$R" diff --stat 1da7eb17b HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon | tee -a "$REC/check.log"; echo "source diff 1da7eb17b..HEAD above (empty = none)" | tee -a "$REC/check.log"
  ;;
trees)
  # trees/minor8 (H8-1's scope and the REPORTED arm's) and h7trees/ (src/ demo/ only, H7-3's scope) for minor7, minor8.
  is "$MS8" || exit 3
  cuttree minor8
  for t in minor7 minor8; do rm -rf "$B/h7trees/$t"; mkdir -p "$B/h7trees/$t"; cp -R "$B/trees/$t/src" "$B/trees/$t/demo" "$B/h7trees/$t/"; done
  ls "$B/trees" "$B/h7trees"
  ;;
static)
  # H7-3 (deletes-minor.json, H7's scope, no patch); DEL with H9 and H10 over the minor's own patch (fixture minor v8 at 0;
  # the minor v7 under the same; H10-1 the absent root); LAW; census and its bite; HOV; LIT; ladder; FL-14 static.
  is "$MS8" || exit 3
  for t in h7trees/minor7 h7trees/minor8 trees/minor7 trees/minor8; do test -d "$B/$t/src" || { echo "MISSING TREE $t"; exit 5; }; done
  cd "$H"
  { echo "-- H7-3, deletes-minor.json ($(python3 -I -c 'import json,sys; d=json.load(open(sys.argv[1])); print(len(d["names"]), "names,", len(d.get("exact", [])), "sites")' deletes-minor.json)), H7 scope (src/ demo/), no patch"
    for t in minor8 minor7; do node deleted-mechanisms.mjs --root "$B/h7trees/$t" --declare deletes-minor.json > "$REC/del-H7-$t.log" 2>&1; echo "DEL H7-3 $t exit $?: $(tail -1 "$REC/del-H7-$t.log")"; done
    echo "-- DEL with H9 and H10 over the minor's own patch (src/ demo/ tests/ + every touched path)"
    node deleted-mechanisms.mjs --root "$B/trees/minor8" --declare deletes-minor.json --patch "$MS8" > "$REC/del-minor8.log" 2>&1; echo "DEL minor8 + v8 patch exit $?: $(tail -1 "$REC/del-minor8.log")"; grep -E 'text files|names=' "$REC/del-minor8.log" | head -3
    node deleted-mechanisms.mjs --root "$B/trees/minor7" --declare deletes-minor.json --patch "$MS8" > "$REC/del-minor7-under-v8.log" 2>&1; echo "DEL minor7 + v8 patch exit $?: $(tail -1 "$REC/del-minor7-under-v8.log")"
    node deleted-mechanisms.mjs --root "$B/trees/minor7" --declare deletes-minor.json --patch "$MS7" > "$REC/del-minor7.log" 2>&1; echo "DEL minor7 + v7 patch (pass 9's read) exit $?: $(tail -1 "$REC/del-minor7.log")"
    node deleted-mechanisms.mjs --root "$B/absent" --declare deletes-minor.json --patch "$MS8" > "$REC/del-absent.log" 2>&1; echo "DEL absent root (H10-1) exit $?: $(tail -1 "$REC/del-absent.log")"
    node launch-law.mjs > "$REC/law.log" 2>&1; echo "LAW exit $?: $(tail -1 "$REC/law.log")"
    node "$M/pass-4/lighting-census.mjs" "$W" > "$REC/census-minor8.log" 2>&1; echo "census minor8 exit $?: $(tail -1 "$REC/census-minor8.log")"
    t=$B/v1010; rm -rf "$t"; mkdir -p "$t"; git -C "$R" archive v10.1.0 src/styles | tar -x -C "$t"
    node "$M/pass-4/lighting-census.mjs" "$t" > "$REC/census-v1010.log" 2>&1; echo "census v10.1.0 exit $?: $(tail -1 "$REC/census-v1010.log")"; rm -rf "$t"
    node hover-fill-selected.mjs --root "$W" > "$REC/HOV-minor8.log" 2>&1; echo "HOV exit $?: $(tail -1 "$REC/HOV-minor8.log")"
    node lighting-literals.mjs --root "$W" > "$REC/LIT-static-minor8.log" 2>&1; echo "LIT exit $?: $(grep -o 'LIGHTING-LITERALS.*' "$REC/LIT-static-minor8.log" | tail -1)"
    radii > "$REC/radii-minor8.txt"; echo "-- LADDER diff radii-minor8 pass-9 radii-minor7 (prints nothing)"; diff "$REC/radii-minor8.txt" "$P9/MS7-records/radii-minor7.txt"; echo "LADDER exit $?"
    echo "-- FL-14 static: @utility glass-plate declares isolation"; sed -n '/^@utility glass-plate/,/^}/p' "$W/src/styles/glass/veil.css" | grep -n "isolation"
    echo "-- identifiers on R-25's removed and added lines (comments and doc prose only)"
    grep -E '^[-+][^-+]' "$D25" | grep -oE -- '--[a-z][a-z0-9-]+|data-[a-z-]+' | sort | uniq -c | sort -rn
  } 2>&1 | tee "$REC/static.log"
  ;;
sweep)
  # R-21 (b) under R-26 and H10-2: the frozen list over every file the minor v8's patch touches; read back under pass 9's
  # MS7-rulings-proposed.json (as H10 migrated it) and under this seat's MS8-rulings.json; the minor v7 under MS8's rulings
  # (R-25's plant); SWEEP on an absent root (H10-1's departure).
  cd "$H"
  { node prose-sweep.mjs --root "$B/trees/minor8" --patch "$MS8" --declare deletes-minor.json > "$REC/sweep-minor8.log" 2>&1; echo "SWEEP minor8 LIST exit $?: $(tail -1 "$REC/sweep-minor8.log")"
    node prose-sweep.mjs --root "$B/trees/minor8" --patch "$MS8" --declare deletes-minor.json --rulings "$P9/MS7-rulings-proposed.json" > "$REC/sweep-minor8-under-ms7p.log" 2>&1; echo "SWEEP minor8 under MS7-rulings-proposed.json exit $?: $(tail -1 "$REC/sweep-minor8-under-ms7p.log")"
    if test -f "$P10/MS8-rulings.json"; then
      node prose-sweep.mjs --root "$B/trees/minor8" --patch "$MS8" --declare deletes-minor.json --rulings "$P10/MS8-rulings.json" > "$REC/sweep-minor8-ruled.log" 2>&1; echo "SWEEP minor8 ruled (MS8-rulings.json) exit $?: $(tail -1 "$REC/sweep-minor8-ruled.log")"; grep -E '^SWEEP ' "$REC/sweep-minor8-ruled.log"
      node prose-sweep.mjs --root "$B/trees/minor7" --patch "$MS8" --declare deletes-minor.json --rulings "$P10/MS8-rulings.json" > "$REC/sweep-minor7-plant.log" 2>&1; echo "SWEEP minor7 under MS8-rulings.json (plant) exit $?: $(tail -1 "$REC/sweep-minor7-plant.log")"
      grep -E "✗" "$REC/sweep-minor8-ruled.log" "$REC/sweep-minor7-plant.log" | sed "s#$REC/##"
    fi
    node prose-sweep.mjs --root "$B/absent" --patch "$MS8" --declare deletes-minor.json > "$REC/sweep-absent.log" 2>&1; echo "SWEEP absent root exit $?: $(tail -1 "$REC/sweep-absent.log")"
    if test -d "$B/trees/minor8p/src"; then
      node prose-sweep.mjs --root "$B/trees/minor8p" --patch "$MS8" --declare deletes-minor.json > "$REC/sweep-minor8p.log" 2>&1; echo "SWEEP minor8 + proposed LIST exit $?: $(tail -1 "$REC/sweep-minor8p.log")"
      python3 -I "$P10/MS8-rulings.py" "$REC/sweep-minor8p.log" "$P10/MS8-rulings-proposed.json" --proposed
      node prose-sweep.mjs --root "$B/trees/minor8p" --patch "$MS8" --declare deletes-minor.json --rulings "$P10/MS8-rulings-proposed.json" > "$REC/sweep-minor8p-ruled.log" 2>&1; echo "SWEEP minor8 + proposed ruled (MS8-rulings-proposed.json) exit $?: $(tail -1 "$REC/sweep-minor8p-ruled.log")"; grep -E '^SWEEP ' "$REC/sweep-minor8p-ruled.log"
    fi
  } 2>&1 | tee "$REC/sweep.log"
  ;;
proposed)
  # MS8-r26-proposed.py (the four lines read false under R-26, MINOR-SPLIT-v8.md §4.3) applied on the minor v8, written as
  # MS8-r26-proposed.diff, cut as trees/minor8p, then reversed: the worktree returns to the minor v8. DEL over it.
  is "$MS8" || exit 3
  python3 -I "$P10/MS8-r26-proposed.py" "$W" || exit 4
  PF="src/styles/glass/ladder.css src/styles/tokens/sizing.css"
  D=$B/r26; rm -rf "$D"; mkdir -p "$D/a" "$D/b"
  for f in $PF; do mkdir -p "$D/b/$(dirname "$f")"; cp "$W/$f" "$D/b/$f"; done
  cuttree minor8p
  git -C "$W" diff HEAD --binary > "$B/ms8p.patch"
  git -C "$W" apply -R "$B/ms8p.patch" && git -C "$W" apply "$MS8"; is "$MS8" || exit 3
  for f in $PF; do mkdir -p "$D/a/$(dirname "$f")"; cp "$W/$f" "$D/a/$f"; done
  (cd "$D" && git diff --no-index a b) | sed -e 's#^diff --git a/a/#diff --git a/#' -e 's# b/b/# b/#' -e 's#^--- a/a/#--- a/#' -e 's#^+++ b/b/#+++ b/#' > "$P10/MS8-r26-proposed.diff"
  { git -C "$W" apply --check "$P10/MS8-r26-proposed.diff" && echo "MS8-r26-proposed.diff applies on the minor v8: exit 0"
    echo "MS8-r26-proposed.diff: $(grep -c '^diff --git' "$P10/MS8-r26-proposed.diff") files, +$(grep -c '^+[^+]' "$P10/MS8-r26-proposed.diff")/-$(grep -c '^-[^-]' "$P10/MS8-r26-proposed.diff"), sha1 $(shasum "$P10/MS8-r26-proposed.diff" | cut -c1-8)"
    for f in $PF; do echo "   $f lines $(wc -l < "$B/trees/minor8/$f" | tr -d ' ') -> $(wc -l < "$B/trees/minor8p/$f" | tr -d ' ')"; done
    cd "$H"; node deleted-mechanisms.mjs --root "$B/trees/minor8p" --declare deletes-minor.json --patch "$MS8" > "$REC/del-minor8p.log" 2>&1; echo "DEL minor8 + proposed, v8 patch exit $?: $(tail -1 "$REC/del-minor8p.log")"
  } 2>&1 | tee "$REC/proposed.log"
  ;;
proposed-same)
  # The minor v8 and the minor v8 + MS8-r26-proposed.diff built under ONE label in this worktree, compared raw.
  is "$MS8" || exit 3
  O=$D3_OUT/builds; S=$D3_OUT/same
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; rm -rf "$S/m8c"; mv "$O/same" "$S/m8c"; echo "minor v8 built as 'same' $(ts)"
  git -C "$W" apply "$P10/MS8-r26-proposed.diff" || exit 3
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; rm -rf "$S/m8p"; mv "$O/same" "$S/m8p"; echo "minor v8 + proposed built as 'same' $(ts)"
  git -C "$W" apply -R "$P10/MS8-r26-proposed.diff"; is "$MS8" || exit 3
  { for k in dist demo; do
      diff -rq -x build.json "$S/m8c/$k" "$S/m8p/$k" > /dev/null; echo "$k minor v8 vs minor v8 + proposed: diff -rq exit $?"
      diff -rq -x build.json "$S/m8/$k" "$S/m8c/$k" > /dev/null; echo "$k minor v8 (this run) vs minor v8 (the same phase): diff -rq exit $?"
    done
    for c in "$S/m8p/dist"/assets/*.css; do echo "m8p specimen css $(basename "$c") $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -c1-16)"; done
  } 2>&1 | tee "$REC/proposed-same.log"
  ;;
same)
  # R-22's raw branch, R-27's same-session pair: the minor v8, the minor v7 and the minor v8 again, each built by
  # harness/build.mjs --demo under ONE label in this worktree, each output moved aside before the next build, compared
  # byte for byte (specimen dist and dist-demo); then R-27's path-free ties to pass 9's banked minor v7 lists.
  is "$MS8" || exit 3
  O=$D3_OUT/builds; S=$D3_OUT/same; rm -rf "$S"; mkdir -p "$S"
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/m8"; echo "minor v8 built as 'same' $(ts)"
  swap "$MS8" "$MS7"
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/m7"; echo "minor v7 built as 'same' $(ts)"
  swap "$MS7" "$MS8"
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/m8b"; echo "minor v8 rebuilt as 'same' (determinism) $(ts)"
  { for k in dist demo; do
      diff -rq -x build.json "$S/m7/$k" "$S/m8/$k" > "$REC/same-$k-m7-m8.txt"; echo "$k minor v7 vs minor v8: diff -rq exit $?, $(wc -l < "$REC/same-$k-m7-m8.txt" | tr -d ' ') lines"
      diff -rq -x build.json "$S/m8/$k" "$S/m8b/$k" > /dev/null; echo "$k minor v8 vs minor v8 rebuilt: diff -rq exit $?"
      for l in m7 m8; do (cd "$S/$l/$k" && find . -type f ! -name build.json | sort | xargs shasum -a 256) > "$REC/same-$l-$k.sha256"; done
      echo "$k files: m7 $(wc -l < "$REC/same-m7-$k.sha256" | tr -d ' '), m8 $(wc -l < "$REC/same-m8-$k.sha256" | tr -d ' '); sha256 list diff exit $(diff -q "$REC/same-m7-$k.sha256" "$REC/same-m8-$k.sha256" > /dev/null; echo $?)"
    done
    for l in m7 m8; do for c in "$S/$l/dist"/assets/*.css; do echo "$l specimen css $(basename "$c") $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -d' ' -f1)"; done; done
    for l in m7 m8; do echo "$l dist-demo css total $(find "$S/$l/demo" -name '*.css' -exec cat {} + | wc -c | tr -d ' ') B, files $(find "$S/$l/demo" -type f | wc -l | tr -d ' ')"; done
    echo "-- R-27: the path-free ties to pass 9's banked minor v7 (pass-9/MS7-records/same-m7-*.sha256)"
    grep -E '\.css$' "$P9/MS7-records/same-m7-dist.sha256" | sed 's/^/banked minor v7 specimen css: /'
    diff "$P9/MS7-records/same-m7-demo.sha256" "$REC/same-m8-demo.sha256" > "$REC/same-demo-m7banked-m8.txt"; echo "demo banked m7 vs m8: diff exit $?, $(wc -l < "$REC/same-demo-m7banked-m8.txt" | tr -d ' ') lines"
  } 2>&1 | tee "$REC/same.log"
  ;;
bite)
  # HEAD built the same way under the same label must differ from the minor v8.
  O=$D3_OUT/builds; S=$D3_OUT/same
  to_head "$MS8"
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; rm -rf "$S/head"; mv "$O/same" "$S/head"; echo "HEAD built as 'same' $(ts)"
  from_head "$MS8"
  { for k in dist demo; do diff -rq -x build.json "$S/head/$k" "$S/m8/$k" > "$REC/bite-$k-head-m8.txt"; echo "bite $k HEAD vs minor v8: diff -rq exit $?, $(wc -l < "$REC/bite-$k-head-m8.txt" | tr -d ' ') lines"; done
    for c in "$S/head/dist"/assets/*.css; do echo "HEAD specimen css $(basename "$c") $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -c1-16)"; done
  } 2>&1 | tee "$REC/bite.log"
  ;;
toolchain)
  # Typecheck, library build, the test typecheck after it, the dist-demo BEFORE the units, vitest --maxWorkers=2.
  is "$MS8" || exit 3
  cd "$W"
  printf 'import base from "./vite.config";\nexport default { ...(base as object), cacheDir: ".cache-m8/vite" };\n' > vite.m8.config.ts
  printf 'import base from "./vitest.config";\nexport default { ...(base as object), cacheDir: ".cache-m8/vitest" };\n' > vitest.m8.config.ts
  printf 'import base from "./demo/vite.demo-dist.config";\nexport default { ...(base as object), cacheDir: ".cache-m8/vite-demo" };\n' > vite.m8demo.config.ts
  { npx vue-tsc --noEmit > "$REC/tsc-app.log" 2>&1; echo "typecheck app exit $? $(ts)"
    npx vite build --config vite.m8.config.ts > "$REC/libbuild.log" 2>&1; echo "library build exit $? $(ts)"
    npx vue-tsc --noEmit -p tsconfig.test.json > "$REC/tsc-test.log" 2>&1; echo "typecheck tests exit $? $(ts)"
    npx vite build --config vite.m8demo.config.ts > "$REC/demobuild.log" 2>&1; echo "dist-demo exit $? $(ts)"
    npx vitest run --config vitest.m8.config.ts --maxWorkers=2 --testTimeout 240000 > "$REC/units.log" 2>&1; echo "vitest exit $? $(ts)"
    grep -E "Test Files|Tests  " "$REC/units.log"
  } 2>&1 | tee "$REC/toolchain.log"
  rm -f vite.m8.config.ts vitest.m8.config.ts vite.m8demo.config.ts
  ;;
ratchet)
  # G5: the export/roster verifier on the minor v8's library build, the datum unrebound; then rebound in the worktree only
  # and restored; and which library dist files carry an R-25 sentence.
  is "$MS8" || exit 3
  cd "$W"; { node scripts/verify-export-types.mjs > "$REC/verifier.log" 2>&1; echo "verifier exit $?: $(grep -E 'RATCHET|terminal|PRESENT' "$REC/verifier.log" | head -4 | tr '\n' ' ')"
    n=$(grep -oE "forbidden: [0-9]+" "$REC/verifier.log" | grep -oE "[0-9]+" | head -1); echo "$n" > .bundle-ratchet
    node scripts/verify-export-types.mjs > "$REC/verifier-rebound.log" 2>&1; echo "verifier (datum $n in the worktree) exit $?: $(grep -E 'terminal|PRESENT' "$REC/verifier-rebound.log" | head -3 | tr '\n' ' ')"
    git show HEAD:.bundle-ratchet > .bundle-ratchet; test -z "$(git status --porcelain -- .bundle-ratchet)" && echo ".bundle-ratchet restored to HEAD"
    git -C "$R" diff --stat v10.1.0 HEAD -- .published-roster; git diff --stat HEAD -- .published-roster; echo "roster diff (v10.1.0..HEAD, and the worktree) above: empty = unchanged"
    echo "-- library dist files carrying an R-25 sentence (grep over dist/)"
    grep -rlE 'cream frost, never an ink|with no tint axis to zero|solved bound' dist 2>/dev/null | head; echo "(end)"; } 2>&1 | tee "$REC/ratchet.log"
  ;;
teardown)
  git -C "$R" worktree remove --force "$W"; git -C "$R" worktree prune; rm -rf "$B"; rmdir "$R/.claude/worktrees/bl/D3/p10" 2>/dev/null; ls "$R/.claude/worktrees/bl/D3/" 2>&1; echo "D3/p10 worktree entries: $(git -C "$R" worktree list | grep -c 'D3/p10')"; echo "checkout src/demo/tests dirty files: $(git -C "$R" status --porcelain -- src demo tests DESIGN.md | wc -l | tr -d ' ')"; true
  ;;
esac
echo "== $phase end $(ts)" | tee -a "$REC/phases.log"
