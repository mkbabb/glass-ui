#!/usr/bin/env bash
# OWED-run.sh · D3 pass 12, the owed-cells seat (R-35, REGISTRY P11-6.3 step 1): every command the seat ran, by phase.
# Base: HEAD of master at launch (release/10.1.1 NOT merged during pass 12, P11-5). One worktree
# (.claude/worktrees/bl/D3/p12/owed/wt) cut at HEAD with node_modules symlinked; each patch is applied there, checked,
# copied out to $B/trees/<name> and reversed. Builds and caches live under $W/.d3out and $W/.cache-owed (inside the
# worktree). Records land in pass-12/OWED-records/.
#   bash OWED-run.sh setup|compose|trees|static|same|toolchain|reds|teardown
# Launched as `~/.claude/guard/guarded [--light] [--timeout N] -- bash OWED-run.sh <phase>`. No phase launches a browser
# except `toolchain` and `reds` (vitest's slider.size-tokens test launches its own headless shell): heavy, never --light.
# Built on pass-11/crit-run.sh (the critic's owed phases `crit`, the byte proofs and `toolchain`).
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p12/owed
W=$B/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
P11=$M/pass-11
P12=$M/pass-12
REC=$P12/OWED-records
FV10=$P11/floor-v10.patch
FV10S=$P11/FV10-seat-proposed.diff
CRF=$P11/crit-floor-proposed.diff
MS9=$P11/minor-split-v9.patch
MS9S=$P11/MS9-seat-proposed.diff
CRM=$P11/crit-minor-proposed.diff
FV11A=$P12/floor-v11a.patch
MS9C=$P12/minor-split-v9c.patch
D10=$P11/FV10-records/declare-floor-v10.json
DM=$H/deletes-minor.json
export D3_OUT=$W/.d3out
mkdir -p "$REC"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
clean() { test -z "$(git -C "$W" status --porcelain -- src demo tests docs/canon DESIGN.md)"; }
copyout() { rm -rf "$B/trees/$1"; mkdir -p "$B/trees/$1/docs" && cp -R "$W/src" "$W/demo" "$W/tests" "$B/trees/$1/" && cp -R "$W/docs/canon" "$B/trees/$1/docs/" && cp "$W"/*.md "$B/trees/$1/"; }
h7copy() { rm -rf "$B/h7trees/$1"; mkdir -p "$B/h7trees/$1" && cp -R "$W/src" "$W/demo" "$B/h7trees/$1/"; }
# on name patch: apply one whole patch at HEAD, cmp it against the worktree diff, run $FN, reverse to HEAD
on() { local name=$1 p=$2
  clean || { echo "worktree not clean before $name"; exit 3; }
  git -C "$W" apply "$p" || exit 3
  git -C "$W" diff HEAD --binary | cmp -s - "$p" && echo "worktree = $(basename "$p")" || { echo "cmp FAIL $p"; exit 3; }
  $FN "$name"
  git -C "$W" apply -R "$p" && clean && echo "back to HEAD" || exit 3; }
phase=$1; shift
echo "== $phase start $(ts)" | tee -a "$REC/phases.log"
case $phase in
setup)
  mkdir -p "$B/trees" "$B/h7trees"; git -C "$R" worktree add --detach "$W" HEAD && ln -s "$R/node_modules" "$W/node_modules"
  { echo "worktree HEAD $(git -C "$W" rev-parse --short=9 HEAD) (master at launch; release/10.1.1 not merged)"
    echo "10.1.0 source diff 1da7eb17b..HEAD (empty = none): [$(git -C "$W" diff --stat 1da7eb17b HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon | tail -1)]"
    for p in "$FV10" "$MS9"; do git -C "$W" apply --check "$p"; echo "git apply --check $(basename "$p") at HEAD: exit $?"; done
    for f in "$FV10" "$FV10S" "$CRF" "$MS9" "$MS9S" "$CRM"; do echo "$(basename "$f"): sha1 $(shasum "$f" | cut -c1-8), $(grep -c '^diff --git' "$f") files, +$(grep -c '^+[^+]' "$f")/-$(grep -c '^-[^-]' "$f")"; done
  } 2>&1 | tee "$REC/setup.log"
  ;;
compose)
  # floor v11a = floor v10 + FV10-seat-proposed.diff + crit-floor-proposed.diff; minor v9c = minor v9 + MS9-seat-proposed.diff.
  # Each composed in the worktree and cut as the worktree's binary diff; then re-checked at HEAD and re-composed.
  { clean || exit 3
    git -C "$W" apply "$FV10" && git -C "$W" apply "$FV10S" && git -C "$W" apply "$CRF" && echo "applied floor-v10 + FV10-seat + crit-floor"
    git -C "$W" diff HEAD --binary > "$FV11A"; git -C "$W" apply -R "$FV11A" && clean && echo "back to HEAD"
    git -C "$W" apply --check "$FV11A"; echo "git apply --check floor-v11a.patch at HEAD: exit $?"
    git -C "$W" apply "$MS9" && git -C "$W" apply "$MS9S" && echo "applied minor-split-v9 + MS9-seat"
    git -C "$W" diff HEAD --binary > "$MS9C"; git -C "$W" apply -R "$MS9C" && clean && echo "back to HEAD"
    git -C "$W" apply --check "$MS9C"; echo "git apply --check minor-split-v9c.patch at HEAD: exit $?"
    for f in "$FV11A" "$MS9C"; do echo "$(basename "$f"): sha1 $(shasum "$f" | cut -c1-8), $(grep -c '^diff --git' "$f") files, +$(grep -c '^+[^+]' "$f")/-$(grep -c '^-[^-]' "$f")"; done
    diff <(git apply --numstat "$FV10" | cut -f3) <(git apply --numstat "$FV11A" | cut -f3) >/dev/null; echo "path list floor v10 = floor v11a: exit $?"
    diff <(git apply --numstat "$MS9" | cut -f3) <(git apply --numstat "$MS9C" | cut -f3) >/dev/null; echo "path list minor v9 = minor v9c: exit $?"
    # what floor v11a adds over floor v10 / minor v9c over minor v9, as a patch-of-patches: only comment lines may differ
    diff "$FV10" "$FV11A" | grep '^[<>] [-+]' | sed 's/^/fv10->fv11a  /'
    diff "$MS9" "$MS9C" | grep '^[<>] [-+]' | sed 's/^/m9->m9c  /'
  } 2>&1 | tee "$REC/compose.log"
  ;;
trees)
  { FN=copyout on fv10 "$FV10"
    clean && git -C "$W" apply "$FV10" && git -C "$W" apply "$FV10S" && copyout fv10s && git -C "$W" apply -R "$FV10S" && git -C "$W" apply -R "$FV10" && clean && echo "fv10s copied (floor v10 + FV10-seat), back to HEAD"
    FN=copyout on fv11a "$FV11A"
    FN=copyout on minor9 "$MS9"
    FN=copyout on minor9c "$MS9C"
    # the critic's own 'minor v9c' (D3-critique §3.5/§5: + crit-minor-proposed.diff), read statically beside the task's
    clean && git -C "$W" apply "$MS9C" && git -C "$W" apply "$CRM" && copyout minor9cc && git -C "$W" apply -R "$CRM" && git -C "$W" apply -R "$MS9C" && clean && echo "minor9cc copied (minor v9c + crit-minor), back to HEAD"
    FN=h7copy on minor9c "$MS9C"
    mkdir -p "$B/absent"
    ls "$B/trees" "$B/h7trees"
    for t in fv10s fv11a; do diff -r "$B/trees/fv10" "$B/trees/$t" | grep -c '^[<>]' | sed "s/^/lines differing fv10 vs $t: /"; done
    diff -r "$B/trees/minor9" "$B/trees/minor9c" | grep -c '^[<>]' | sed "s/^/lines differing minor9 vs minor9c: /"
  } 2>&1 | tee "$REC/trees.log"
  ;;
static)
  cd "$H"; T=$B/trees
  sw() { node prose-sweep.mjs --root "$T/$1" --patch "$2" --declare "$3" ${4:+--rulings "$4"} > "$REC/sweep-$5.log" 2>&1; echo "SWEEP $5 exit $?: $(tail -1 "$REC/sweep-$5.log")"; }
  { for t in fv11a fv10s fv10; do node deleted-mechanisms.mjs --root "$T/$t" --declare "$D10" --patch "$FV10" > "$REC/del-$t.log" 2>&1; echo "DEL $t (floor v10 decl+patch) exit $?: $(tail -1 "$REC/del-$t.log")"; done
    node deleted-mechanisms.mjs --root "$T/fv11a" --declare "$D10" --patch "$FV11A" > "$REC/del-fv11a-ownpatch.log" 2>&1; echo "DEL fv11a (floor v10 decl + floor-v11a.patch) exit $?: $(tail -1 "$REC/del-fv11a-ownpatch.log")"
    node deleted-mechanisms.mjs --root "$B/absent" --declare "$D10" --patch "$FV11A" > "$REC/del-absent.log" 2>&1; echo "DEL absent exit $?: $(tail -1 "$REC/del-absent.log")"
    sw fv11a "$FV10" "$D10" "" fv11a-list
    sw fv11a "$FV10" "$D10" "$P11/crit-fv10-rulings.json" fv11a-crit
    sw fv11a "$FV11A" "$D10" "$P11/crit-fv10-rulings.json" fv11a-crit-ownpatch
    sw fv10s "$FV10" "$D10" "$P11/crit-fv10s-reading.json" fv10s-plant
    sw fv11a "$FV10" "$D10" "$P11/crit-fv10s-reading.json" fv11a-plant
    sw fv10s "$FV10" "$D10" "$P11/crit-fv10-rulings.json" fv10s-under-crit
    sw fv10 "$FV10" "$D10" "$P11/crit-fv10-rulings.json" fv10-under-crit
    for t in minor9c minor9cc minor9; do node deleted-mechanisms.mjs --root "$T/$t" --declare "$DM" --patch "$MS9" > "$REC/del-$t.log" 2>&1; echo "DEL $t (deletes-minor + minor v9 patch) exit $?: $(tail -1 "$REC/del-$t.log")"; done
    node deleted-mechanisms.mjs --root "$B/h7trees/minor9c" --declare "$DM" > "$REC/del-H7-minor9c.log" 2>&1; echo "H7-3 minor9c exit $?: $(tail -1 "$REC/del-H7-minor9c.log")"
    sw minor9c "$MS9" "$DM" "" minor9c-list
    sw minor9c "$MS9" "$DM" "$P11/crit-ms9-rulings.json" minor9c-crit
    sw minor9c "$MS9C" "$DM" "$P11/crit-ms9-rulings.json" minor9c-crit-ownpatch
    sw minor9c "$MS9" "$DM" "$P11/crit-ms9s-reading.json" minor9c-plant
    sw minor9cc "$MS9" "$DM" "$P11/crit-ms9-rulings.json" minor9cc-crit
    sw minor9 "$MS9" "$DM" "$P11/crit-ms9-rulings.json" minor9-under-crit
    for t in fv11a fv10s; do node neighbourhood.mjs --root "$T/$t" --patch "$FV10" > "$REC/neighbourhood-$t.log" 2>&1; echo "NBHD $t exit $?: $(tail -1 "$REC/neighbourhood-$t.log")"; done
    node neighbourhood.mjs --root "$T/minor9c" --patch "$MS9" > "$REC/neighbourhood-minor9c.log" 2>&1; echo "NBHD minor9c exit $?: $(tail -1 "$REC/neighbourhood-minor9c.log")"
    echo "-- grasp.css:128-135 in the fv11a print:"; grep -E "^src/styles/glass/grasp.css:13[0-5] " "$REC/neighbourhood-fv11a.log" | cut -c1-200
    echo "-- the plants' unread lines:"; grep -iE "unread|stale" "$REC/sweep-fv10s-plant.log" "$REC/sweep-minor9c-plant.log" | grep -v '^.*: *$' | cut -c1-240 | head -12
    node launch-law.mjs > "$REC/law.log" 2>&1; echo "LAW exit $?: $(tail -1 "$REC/law.log")"
    for t in fv11a minor9c; do node hover-fill-selected.mjs --root "$T/$t" > "$REC/HOV-$t.log" 2>&1; echo "HOV $t exit $?: $(tail -1 "$REC/HOV-$t.log")"
      node "$M/pass-4/lighting-census.mjs" "$T/$t" > "$REC/census-$t.log" 2>&1; echo "census $t exit $?: $(tail -1 "$REC/census-$t.log")"; done
  } 2>&1 | tee "$REC/static.log"
  ;;
same)
  # R-22 / R-27: each build under one label in one session, each output moved aside; compared raw. The specimen CSS hash
  # and the dist-demo sha256 list are tied to the pass-11 critic's bank. HEAD is built last as the bite.
  O=$D3_OUT/builds; S=$D3_OUT/same; mkdir -p "$S"
  bld() { rm -rf "$O/same"; node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; rm -rf "$S/$1"; mv "$O/same" "$S/$1"; echo "$1 built $(ts)"; }
  { FN=bld on fv10 "$FV10"
    FN=bld on fv11a "$FV11A"
    FN=bld on minor9 "$MS9"
    FN=bld on minor9c "$MS9C"
    clean && bld head
    for n in fv10 fv11a minor9 minor9c head; do for k in dist demo; do (cd "$S/$n/$k" && find . -type f ! -name build.json | sort | xargs shasum -a 256) > "$REC/same-$n-$k.sha256"; done
      for c in "$S/$n/dist"/assets/*.css; do echo "$n specimen css $(basename "$c") $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -c1-16)"; done
      echo "$n dist-demo files: $(wc -l < "$REC/same-$n-demo.sha256" | tr -d ' ')"; done
    for k in dist demo; do diff -rq -x build.json "$S/fv10/$k" "$S/fv11a/$k" > /dev/null; echo "$k fv10 vs fv11a: diff -rq exit $?"; done
    for k in dist demo; do diff -rq -x build.json "$S/minor9/$k" "$S/minor9c/$k" > /dev/null; echo "$k minor9 vs minor9c: diff -rq exit $?"; done
    for n in fv11a minor9c; do for k in dist demo; do diff -rq -x build.json "$S/head/$k" "$S/$n/$k" > "$REC/bite-$k-head-$n.txt"; echo "bite $k HEAD vs $n: diff -rq exit $?, $(wc -l < "$REC/bite-$k-head-$n.txt" | tr -d ' ') lines"; done; done
    echo "-- R-27 tie: pass-11 critic's banked specimen css lines"; grep -E '\.css$' "$P11/crit-records/same-fv10-dist.sha256"; grep -E '\.css$' "$P11/crit-records/same-minor9-dist.sha256"
    diff "$P11/crit-records/same-fv10-demo.sha256" "$REC/same-fv11a-demo.sha256" > /dev/null; echo "banked fv10 dist-demo sha256 list vs fv11a: diff exit $?"
    diff "$P11/crit-records/same-minor9-demo.sha256" "$REC/same-minor9c-demo.sha256" > /dev/null; echo "banked minor9 dist-demo sha256 list vs minor9c: diff exit $?"
    diff "$P11/crit-records/same-fv10-dist.sha256" "$REC/same-fv11a-dist.sha256" > /dev/null; echo "banked fv10 dist sha256 list vs fv11a: diff exit $?"
    diff "$P11/crit-records/same-minor9-dist.sha256" "$REC/same-minor9c-dist.sha256" > /dev/null; echo "banked minor9 dist sha256 list vs minor9c: diff exit $?"
  } 2>&1 | tee "$REC/same.log"
  ;;
toolchain)
  # Floor v11a: typecheck, library build, test typecheck, dist-demo (built before vitest), vitest --maxWorkers=2.
  # Then the minor v9c's one rewritten test file (glass-subtlety.test.ts).
  cd "$W"; clean || exit 3
  git apply "$FV11A" && echo "worktree = floor v11a" | tee "$REC/toolchain.log"
  printf 'import base from "./vite.config";\nexport default { ...(base as object), cacheDir: ".cache-owed/vite" };\n' > vite.owed.config.ts
  printf 'import base from "./vitest.config";\nexport default { ...(base as object), cacheDir: ".cache-owed/vitest" };\n' > vitest.owed.config.ts
  printf 'import base from "./demo/vite.demo-dist.config";\nexport default { ...(base as object), cacheDir: ".cache-owed/vite-demo" };\n' > vite.oweddemo.config.ts
  { npx vue-tsc --noEmit > "$REC/tsc-app.log" 2>&1; echo "typecheck app exit $? $(ts)"
    npx vite build --config vite.owed.config.ts > "$REC/libbuild.log" 2>&1; echo "library build exit $? $(ts)"
    npx vue-tsc --noEmit -p tsconfig.test.json > "$REC/tsc-test.log" 2>&1; echo "typecheck tests exit $? $(ts)"
    npx vite build --config vite.oweddemo.config.ts > "$REC/demobuild.log" 2>&1; echo "dist-demo exit $? $(ts)"
    npx vitest run --config vitest.owed.config.ts --maxWorkers=2 > "$REC/units.log" 2>&1; echo "vitest exit $? $(ts)"
    grep -E "Test Files|Tests  " "$REC/units.log"
  } 2>&1 | tee -a "$REC/toolchain.log"
  git apply -R "$FV11A"
  git apply "$MS9C" && echo "worktree = minor v9c" | tee -a "$REC/toolchain.log"
  { npx vitest run --config vitest.owed.config.ts --maxWorkers=2 tests/styles/glass-subtlety.test.ts > "$REC/units-minor9c-subtlety.log" 2>&1; echo "vitest glass-subtlety on minor9c exit $? $(ts)"; grep -E "Test Files|Tests  " "$REC/units-minor9c-subtlety.log"; } 2>&1 | tee -a "$REC/toolchain.log"
  git apply -R "$MS9C"
  rm -f vite.owed.config.ts vitest.owed.config.ts vite.oweddemo.config.ts
  clean && echo "back to HEAD" | tee -a "$REC/toolchain.log"
  ;;
reds)
  # A red file from `toolchain`, re-run alone on floor v11a: bash OWED-run.sh reds <run> <test file>...
  run=$1; shift; cd "$W"; clean || exit 3; git apply "$FV11A"
  printf 'import base from "./vitest.config";\nexport default { ...(base as object), cacheDir: ".cache-owed/vitest" };\n' > vitest.owed.config.ts
  { npx vitest run --config vitest.owed.config.ts --maxWorkers=2 "$@" > "$REC/reds-$run.log" 2>&1; echo "reds $run exit $? $(ts)"; grep -E "Test Files|Tests  " "$REC/reds-$run.log"; } 2>&1 | tee -a "$REC/reds.log"
  rm -f vitest.owed.config.ts; git apply -R "$FV11A"; clean && echo "back to HEAD" | tee -a "$REC/reds.log"
  ;;
teardown)
  { git -C "$R" worktree remove --force "$W"; git -C "$R" worktree prune; rm -rf "$B"
    rmdir "$R/.claude/worktrees/bl/D3/p12" 2>/dev/null
    echo "worktrees naming D3/p12/owed: $(git -C "$R" worktree list | grep -c 'D3/p12/owed')"; ls "$R/.claude/worktrees/bl/D3/"
  } 2>&1 | tee "$REC/teardown.log"
  ;;
esac
echo "== $phase end $(ts)" | tee -a "$REC/phases.log"
