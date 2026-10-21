#!/usr/bin/env bash
# MS10R-run.sh · D3 pass 13, the minor-split v10 re-measure (REGISTRY P12-6.3 step 3, base (a): no browser of its own).
# Re-applies pass-12/minor-split-v10.patch (2aa0e5c9) at HEAD of master in one worktree
# (.claude/worktrees/bl/D3/p13/minor10m/wt, node_modules symlinked), proves the specimen dist and dist-demo raw-identical
# to the pass-12 bank (CSS sha256 e11613c3eeb45cab, pass-12/MS10-records/same-minor10-demo.sha256) in ONE session
# (minor v10, minor v10 again, HEAD as the bite), then runs H7-3, DEL (H9-H11) at 0, the list under
# pass-11/crit-ms9-rulings.json (PASS 368) with its plant, and the toolchain. Records land in pass-13/MS10R-records/.
#   bash MS10R-run.sh setup|trees|static|same|toolchain|reds|ratchet|teardown
# Launched as `~/.claude/guard/guarded [--light] [--timeout N] -- bash MS10R-run.sh <phase>`. `same` builds and
# `toolchain` builds and runs vitest (its slider unit launches a headless shell): heavy, never --light.
# Built on pass-12/MS10-run.sh.
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p13/minor10m
W=$B/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
P11=$M/pass-11
P12=$M/pass-12
P13=$M/pass-13
REC=$P13/MS10R-records
MS10=$P12/minor-split-v10.patch
DM=$H/deletes-minor.json
CR=$P11/crit-ms9-rulings.json
PL=$P11/crit-ms9s-reading.json
export D3_OUT=$W/.d3out
mkdir -p "$REC"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
clean() { test -z "$(git -C "$W" status --porcelain -- src demo tests docs/canon DESIGN.md)"; }
is() { git -C "$W" diff HEAD --binary | cmp -s - "$1" && echo "worktree = $(basename "$1")"; }
copyout() { rm -rf "$B/trees/$1"; mkdir -p "$B/trees/$1/docs" && cp -R "$W/src" "$W/demo" "$W/tests" "$B/trees/$1/" && cp -R "$W/docs/canon" "$B/trees/$1/docs/" && cp "$W"/*.md "$B/trees/$1/"; }
h7copy() { rm -rf "$B/h7trees/$1"; mkdir -p "$B/h7trees/$1" && cp -R "$W/src" "$W/demo" "$B/h7trees/$1/"; }
on() { local name=$1 p=$2
  clean || { echo "worktree not clean before $name"; exit 3; }
  git -C "$W" apply "$p" || exit 3
  is "$p" || { echo "cmp FAIL $p"; exit 3; }
  $FN "$name"
  git -C "$W" apply -R "$p" && clean && echo "back to HEAD" || exit 3; }
phase=$1; shift
echo "== $phase start $(ts)" | tee -a "$REC/phases.log"
case $phase in
setup)
  mkdir -p "$B/trees" "$B/h7trees" "$B/absent"; git -C "$R" worktree add --detach "$W" HEAD && ln -s "$R/node_modules" "$W/node_modules"
  { echo "worktree HEAD $(git -C "$W" rev-parse --short=9 HEAD) (master at launch; release/10.1.1 and release/10.1.2 not merged)"
    echo "base (a) check, 1da7eb17b..HEAD -- src demo tests package.json (empty = base (a)): [$(git -C "$W" diff --stat 1da7eb17b HEAD -- src demo tests package.json | tail -1)]"
    echo "wider list (+ scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon): [$(git -C "$W" diff --stat 1da7eb17b HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon | tail -1)]"
    git -C "$W" apply --check "$MS10"; echo "git apply --check minor-split-v10.patch at HEAD: exit $?"
    for f in "$MS10" "$CR" "$PL" "$DM"; do echo "$(basename "$f"): sha1 $(shasum "$f" | cut -c1-8)"; done
    echo "$(basename "$MS10"): $(grep -c '^diff --git' "$MS10") files, +$(grep -c '^+[^+]' "$MS10")/-$(grep -c '^-[^-]' "$MS10"), $(wc -c < "$MS10" | tr -d ' ') B"
  } 2>&1 | tee "$REC/setup.log"
  ;;
trees)
  { FN=copyout on minor10 "$MS10"
    FN=h7copy on minor10 "$MS10"
    ls "$B/trees" "$B/h7trees"
  } 2>&1 | tee "$REC/trees.log"
  ;;
static)
  cd "$H"; T=$B/trees
  sw() { node prose-sweep.mjs --root "$T/$1" --patch "$2" --declare "$DM" ${3:+--rulings "$3"} > "$REC/sweep-$4.log" 2>&1; echo "SWEEP $4 exit $?: $(tail -1 "$REC/sweep-$4.log")"; }
  { echo "-- H7-3, deletes-minor.json, H7 scope (src/ demo/), no patch"
    node deleted-mechanisms.mjs --root "$B/h7trees/minor10" --declare "$DM" > "$REC/del-H7-minor10.log" 2>&1; echo "H7-3 minor10 exit $?: $(tail -1 "$REC/del-H7-minor10.log")"
    echo "-- DEL with H9-H11 over the patch"
    node deleted-mechanisms.mjs --root "$T/minor10" --declare "$DM" --patch "$MS10" > "$REC/del-minor10.log" 2>&1; echo "DEL minor10 + v10 patch exit $?: $(tail -1 "$REC/del-minor10.log")"; grep -E 'text files|names=' "$REC/del-minor10.log" | head -3
    node deleted-mechanisms.mjs --root "$B/absent" --declare "$DM" --patch "$MS10" > "$REC/del-absent.log" 2>&1; echo "DEL absent root exit $?: $(tail -1 "$REC/del-absent.log")"
    echo "-- the list (R-21 (b)) under crit-ms9-rulings.json, and its plant"
    sw minor10 "$MS10" "" minor10-list
    sw minor10 "$MS10" "$CR" minor10-crit
    sw minor10 "$MS10" "$PL" minor10-plant
    node prose-sweep.mjs --root "$B/absent" --patch "$MS10" --declare "$DM" --rulings "$CR" > "$REC/sweep-absent.log" 2>&1; echo "SWEEP absent exit $?: $(tail -1 "$REC/sweep-absent.log")"
    echo "-- the plant's unread / stale lines"; grep -hE "✗" "$REC/sweep-minor10-plant.log" | cut -c1-200
    echo "-- pass-12 vs pass-13 logs (paths stripped): DEL, H7-3, the list"
    for f in del-H7-minor10 del-minor10 sweep-minor10-list sweep-minor10-crit sweep-minor10-plant; do
      diff <(sed -E "s#$R/\.claude/worktrees/bl/D3/p1[23]/minor10m?/(h7trees|trees)/minor10##g" "$P12/MS10-records/$f.log") <(sed -E "s#$R/\.claude/worktrees/bl/D3/p1[23]/minor10m?/(h7trees|trees)/minor10##g" "$REC/$f.log") > "$REC/vs-p12-$f.diff"; echo "$f vs pass-12: diff exit $?, $(grep -c '^[<>]' "$REC/vs-p12-$f.diff") lines"; done
    echo "-- LAW, census, HOV, ladder, FL-14 (carried checks, read again)"
    node launch-law.mjs > "$REC/law.log" 2>&1; echo "LAW exit $?: $(tail -1 "$REC/law.log")"
    node "$M/pass-4/lighting-census.mjs" "$T/minor10" > "$REC/census-minor10.log" 2>&1; echo "census minor10 exit $?: $(tail -1 "$REC/census-minor10.log")"
    node hover-fill-selected.mjs --root "$T/minor10" > "$REC/HOV-minor10.log" 2>&1; echo "HOV minor10 exit $?: $(tail -1 "$REC/HOV-minor10.log")"
    grep -E -- '--glass-blur-(wash|quiet|resting|floating|overlay)-radius:' "$T/minor10/src/styles/tokens/glass.css" | sed 's/^ *//' > "$REC/radii-minor10.txt"; diff "$REC/radii-minor10.txt" "$P12/MS10-records/radii-minor10.txt"; echo "LADDER diff to pass-12 radii-minor10 exit $?"
    echo "FL-14: $(sed -n '/^@utility glass-plate/,/^}/p' "$T/minor10/src/styles/glass/veil.css" | grep -c 'isolation: isolate') isolation line(s) in @utility glass-plate"
  } 2>&1 | tee "$REC/static.log"
  ;;
same)
  # R-22 / R-27: the minor v10, the minor v10 again and HEAD (the bite), each by harness/build.mjs --demo under ONE label
  # in this worktree in one session; each output moved aside before the next; tied to the pass-12 banks.
  O=$D3_OUT/builds; S=$D3_OUT/same; mkdir -p "$S"
  bld() { rm -rf "$O/same"; node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; rm -rf "$S/$1"; mv "$O/same" "$S/$1"; echo "$1 built $(ts)"; }
  { FN=bld on minor10 "$MS10"
    FN=bld on minor10b "$MS10"
    clean && bld head
    for n in minor10 minor10b head; do for k in dist demo; do (cd "$S/$n/$k" && find . -type f ! -name build.json | sort | xargs shasum -a 256) > "$REC/same-$n-$k.sha256"; done
      for c in "$S/$n/dist"/assets/*.css; do echo "$n specimen css $(basename "$c") $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -c1-16)"; done
      echo "$n dist files: $(wc -l < "$REC/same-$n-dist.sha256" | tr -d ' '), dist-demo files: $(wc -l < "$REC/same-$n-demo.sha256" | tr -d ' ')"; done
    for k in dist demo; do diff -rq -x build.json "$S/minor10/$k" "$S/minor10b/$k" > "$REC/same-$k-minor10-minor10b.txt"; echo "$k minor10 vs minor10 rebuilt: diff -rq exit $?, $(wc -l < "$REC/same-$k-minor10-minor10b.txt" | tr -d ' ') lines"; done
    for k in dist demo; do diff -rq -x build.json "$S/head/$k" "$S/minor10/$k" > "$REC/bite-$k-head-minor10.txt"; echo "bite $k HEAD vs minor10: diff -rq exit $?, $(wc -l < "$REC/bite-$k-head-minor10.txt" | tr -d ' ') lines"; done
    echo "-- R-27 tie to the pass-12 bank (MS10-records)"
    diff <(grep -E '\.css$' "$P12/MS10-records/same-minor10-dist.sha256") <(grep -E '\.css$' "$REC/same-minor10-dist.sha256") > /dev/null; echo "pass-12 minor10 specimen css line (sha256 + name) vs pass-13: diff exit $?"
    diff <(grep -E '\.css$' "$P12/MS10-records/same-minor10-dist.sha256") <(grep -E '\.css$' "$REC/same-minor10b-dist.sha256") > /dev/null; echo "pass-12 minor10 specimen css line vs pass-13 rebuilt: diff exit $?"
    diff "$P12/MS10-records/same-minor10-demo.sha256" "$REC/same-minor10-demo.sha256" > /dev/null; echo "pass-12 minor10 dist-demo sha256 list vs pass-13: diff exit $?"
    diff "$P12/MS10-records/same-minor10-demo.sha256" "$REC/same-minor10b-demo.sha256" > /dev/null; echo "pass-12 minor10 dist-demo sha256 list vs pass-13 rebuilt: diff exit $?"
    diff "$P12/MS10-records/same-minor10-dist.sha256" "$REC/same-minor10-dist.sha256" > "$REC/vs-p12-dist-list.diff"; echo "pass-12 minor10 dist sha256 list vs pass-13 (the JS embeds the worktree path, OWED §1.2): diff exit $?, $(grep -c '^[<>]' "$REC/vs-p12-dist-list.diff") lines"
    diff <(grep -E '\.css$' "$P12/MS10-records/same-head-dist.sha256") <(grep -E '\.css$' "$REC/same-head-dist.sha256") > /dev/null; echo "pass-12 HEAD specimen css vs pass-13 HEAD: diff exit $?"
    diff "$P12/MS10-records/same-head-demo.sha256" "$REC/same-head-demo.sha256" > /dev/null; echo "pass-12 HEAD dist-demo list vs pass-13 HEAD: diff exit $?"
  } 2>&1 | tee "$REC/same.log"
  ;;
toolchain)
  cd "$W"; clean || exit 3
  git apply "$MS10" && is "$MS10" | tee "$REC/toolchain.log"
  printf 'import base from "./vite.config";\nexport default { ...(base as object), cacheDir: ".cache-m10r/vite" };\n' > vite.m10r.config.ts
  printf 'import base from "./vitest.config";\nexport default { ...(base as object), cacheDir: ".cache-m10r/vitest" };\n' > vitest.m10r.config.ts
  printf 'import base from "./demo/vite.demo-dist.config";\nexport default { ...(base as object), cacheDir: ".cache-m10r/vite-demo" };\n' > vite.m10rdemo.config.ts
  { npx vue-tsc --noEmit > "$REC/tsc-app.log" 2>&1; echo "typecheck app exit $? $(ts)"
    npx vite build --config vite.m10r.config.ts > "$REC/libbuild.log" 2>&1; echo "library build exit $? $(ts)"
    npx vue-tsc --noEmit -p tsconfig.test.json > "$REC/tsc-test.log" 2>&1; echo "typecheck tests exit $? $(ts)"
    npx vite build --config vite.m10rdemo.config.ts > "$REC/demobuild.log" 2>&1; echo "dist-demo exit $? $(ts)"
    npx vitest run --config vitest.m10r.config.ts --maxWorkers=2 > "$REC/units.log" 2>&1; echo "vitest exit $? $(ts)"
    grep -E "Test Files|Tests  " "$REC/units.log"
  } 2>&1 | tee -a "$REC/toolchain.log"
  rm -f vite.m10r.config.ts vitest.m10r.config.ts vite.m10rdemo.config.ts
  ;;
reds)
  run=$1; shift; cd "$W"; is "$MS10" || exit 3
  printf 'import base from "./vitest.config";\nexport default { ...(base as object), cacheDir: ".cache-m10r/vitest" };\n' > vitest.m10r.config.ts
  { npx vitest run --config vitest.m10r.config.ts --maxWorkers=2 "$@" > "$REC/reds-$run.log" 2>&1; echo "reds $run exit $? $(ts)"; grep -E "Test Files|Tests  " "$REC/reds-$run.log"; } 2>&1 | tee -a "$REC/reds.log"
  rm -f vitest.m10r.config.ts
  ;;
ratchet)
  cd "$W"; is "$MS10" || exit 3
  { node scripts/verify-export-types.mjs > "$REC/verifier.log" 2>&1; echo "verifier exit $?: $(grep -E 'RATCHET|terminal|PRESENT' "$REC/verifier.log" | head -4 | tr '\n' ' ')"
    n=$(grep -oE "forbidden: [0-9]+" "$REC/verifier.log" | grep -oE "[0-9]+" | head -1); echo "HEAD datum $(git show HEAD:.bundle-ratchet), measured $n"; echo "$n" > .bundle-ratchet
    node scripts/verify-export-types.mjs > "$REC/verifier-rebound.log" 2>&1; echo "verifier (datum $n in the worktree) exit $?: $(grep -E 'terminal|PRESENT' "$REC/verifier-rebound.log" | head -3 | tr '\n' ' ')"
    git show HEAD:.bundle-ratchet > .bundle-ratchet; test -z "$(git status --porcelain -- .bundle-ratchet)" && echo ".bundle-ratchet restored to HEAD"
  } 2>&1 | tee "$REC/ratchet.log"
  ;;
teardown)
  { git -C "$R" worktree remove --force "$W"; git -C "$R" worktree prune; rm -rf "$B"
    rmdir "$R/.claude/worktrees/bl/D3/p13" 2>/dev/null
    echo "worktrees naming D3/p13/minor10m: $(git -C "$R" worktree list | grep -c 'D3/p13/minor10m')"; ls "$R/.claude/worktrees/bl/D3/"
    echo "checkout source status (empty = untouched): [$(git -C "$R" status --porcelain -- src demo tests DESIGN.md)]"
  } 2>&1 | tee "$REC/teardown.log"
  ;;
esac
echo "== $phase end $(ts)" | tee -a "$REC/phases.log"
