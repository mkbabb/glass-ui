#!/usr/bin/env bash
# MS10-run.sh · D3 pass 12, the minor-split v10 seat (REGISTRY P11-6.3 step 4): every command the seat ran, by phase.
# The minor v10 = pass-11/minor-split-v9.patch + pass-11/MS9-seat-proposed.diff + pass-11/crit-minor-proposed.diff.
# Base: HEAD of master at launch (release/10.1.1 NOT merged during pass 12, P11-5). One worktree
# (.claude/worktrees/bl/D3/p12/minor10/wt) cut at HEAD with node_modules symlinked; each patch is applied there, checked
# with cmp, copied out to $B/trees/<name> and reversed. Builds and caches live under $W/.d3out and $W/.cache-m10.
# Records land in pass-12/MS10-records/.
#   bash MS10-run.sh setup|compose|trees|static|same|toolchain|ratchet|teardown
# Launched as `~/.claude/guard/guarded [--light] [--timeout N] -- bash MS10-run.sh <phase>`. No phase launches a browser
# except `toolchain` (vitest's slider test launches its own headless shell): heavy, never --light. `same` builds: heavy.
# Built on pass-12/OWED-run.sh and pass-11/MS9-run.sh.
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p12/minor10
W=$B/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
P11=$M/pass-11
P12=$M/pass-12
REC=$P12/MS10-records
MS9=$P11/minor-split-v9.patch
MS9S=$P11/MS9-seat-proposed.diff
CRM=$P11/crit-minor-proposed.diff
MS9C=$P12/minor-split-v9c.patch
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
radii() { grep -E -- '--glass-blur-(wash|quiet|resting|floating|overlay)-radius:' "$W/src/styles/tokens/glass.css" | sed 's/^ *//'; }
# on name patch: apply one whole patch at HEAD, cmp it against the worktree diff, run $FN, reverse to HEAD
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
  { echo "worktree HEAD $(git -C "$W" rev-parse --short=9 HEAD) (master at launch; release/10.1.1 not merged)"
    echo "10.1.0 source diff 1da7eb17b..HEAD (empty = none): [$(git -C "$W" diff --stat 1da7eb17b HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon | tail -1)]"
    git -C "$W" apply --check "$MS9"; echo "git apply --check minor-split-v9.patch at HEAD: exit $?"
    for f in "$MS9" "$MS9S" "$CRM" "$MS9C" "$CR" "$PL" "$DM"; do echo "$(basename "$f"): sha1 $(shasum "$f" | cut -c1-8)"; done
    for f in "$MS9" "$MS9S" "$CRM"; do echo "$(basename "$f"): $(grep -c '^diff --git' "$f") files, +$(grep -c '^+[^+]' "$f")/-$(grep -c '^-[^-]' "$f")"; done
  } 2>&1 | tee "$REC/setup.log"
  ;;
compose)
  # minor v10 = minor v9 + MS9-seat + crit-minor, applied in that order and cut as the worktree's binary diff. Cross-check:
  # pass-12/minor-split-v9c.patch (= minor v9 + MS9-seat, OWED seat) + crit-minor composes to the same bytes.
  { clean || exit 3
    git -C "$W" apply "$MS9" && git -C "$W" apply --check "$MS9S" && git -C "$W" apply "$MS9S" && git -C "$W" apply --check "$CRM" && git -C "$W" apply "$CRM" && echo "applied minor-split-v9 + MS9-seat + crit-minor (each --check exit 0 on its predecessor)"
    git -C "$W" diff HEAD --binary > "$MS10"; git -C "$W" apply -R "$MS10" && clean && echo "back to HEAD"
    git -C "$W" apply --check "$MS10"; echo "git apply --check minor-split-v10.patch at HEAD: exit $?"
    git -C "$W" apply "$MS9C" && git -C "$W" apply "$CRM" && git -C "$W" diff HEAD --binary | cmp -s - "$MS10"; echo "minor-split-v9c.patch + crit-minor = minor-split-v10.patch: cmp exit $?"
    git -C "$W" apply -R "$CRM" && git -C "$W" apply -R "$MS9C" && clean && echo "back to HEAD"
    echo "$(basename "$MS10"): sha1 $(shasum "$MS10" | cut -c1-8), $(grep -c '^diff --git' "$MS10") files, +$(grep -c '^+[^+]' "$MS10")/-$(grep -c '^-[^-]' "$MS10"), $(wc -c < "$MS10" | tr -d ' ') B"
    diff <(git apply --numstat "$MS9" | cut -f3) <(git apply --numstat "$MS10" | cut -f3) >/dev/null; echo "path list minor v9 = minor v10: exit $?"
    echo "-- patch-of-patches: every +/- line that differs between minor v9 and minor v10 (only comment lines may)"
    diff "$MS9" "$MS10" | grep '^[<>] [-+]' | sed 's/^/m9->m10  /'
  } 2>&1 | tee "$REC/compose.log"
  ;;
trees)
  { FN=copyout on minor9 "$MS9"
    FN=copyout on minor10 "$MS10"
    FN=h7copy on minor9 "$MS9"
    FN=h7copy on minor10 "$MS10"
    ls "$B/trees" "$B/h7trees"
    diff -r "$B/trees/minor9" "$B/trees/minor10" | grep '^[<>]' | tee "$REC/tree-diff-minor9-minor10.txt" | wc -l | sed 's/^/lines differing minor9 vs minor10: /'
    diff -r "$B/trees/minor9" "$B/trees/minor10" | grep '^diff' | sed 's/^/  /'
    for t in minor9 minor10; do wc -l < "$B/trees/$t/src/styles/glass/grasp.css" | sed "s/^/grasp.css lines $t: /"; wc -l < "$B/trees/$t/tests/styles/glass-subtlety.test.ts" | sed "s/^/glass-subtlety.test.ts lines $t: /"; done
  } 2>&1 | tee "$REC/trees.log"
  ;;
static)
  cd "$H"; T=$B/trees
  sw() { node prose-sweep.mjs --root "$T/$1" --patch "$2" --declare "$DM" ${3:+--rulings "$3"} > "$REC/sweep-$4.log" 2>&1; echo "SWEEP $4 exit $?: $(tail -1 "$REC/sweep-$4.log")"; }
  { echo "-- H7-3, deletes-minor.json, H7 scope (src/ demo/), no patch"
    for t in minor10 minor9; do node deleted-mechanisms.mjs --root "$B/h7trees/$t" --declare "$DM" > "$REC/del-H7-$t.log" 2>&1; echo "H7-3 $t exit $?: $(tail -1 "$REC/del-H7-$t.log")"; done
    echo "-- DEL with H9-H11 over the patch"
    node deleted-mechanisms.mjs --root "$T/minor10" --declare "$DM" --patch "$MS10" > "$REC/del-minor10.log" 2>&1; echo "DEL minor10 + v10 patch exit $?: $(tail -1 "$REC/del-minor10.log")"; grep -E 'text files|names=' "$REC/del-minor10.log" | head -3
    node deleted-mechanisms.mjs --root "$T/minor10" --declare "$DM" --patch "$MS9" > "$REC/del-minor10-v9patch.log" 2>&1; echo "DEL minor10 + v9 patch exit $?: $(tail -1 "$REC/del-minor10-v9patch.log")"
    node deleted-mechanisms.mjs --root "$T/minor9" --declare "$DM" --patch "$MS10" > "$REC/del-minor9-v10patch.log" 2>&1; echo "DEL minor9 + v10 patch (control) exit $?: $(tail -1 "$REC/del-minor9-v10patch.log")"
    node deleted-mechanisms.mjs --root "$B/absent" --declare "$DM" --patch "$MS10" > "$REC/del-absent.log" 2>&1; echo "DEL absent root exit $?: $(tail -1 "$REC/del-absent.log")"
    echo "-- the list (R-21 (b)) under crit-ms9-rulings.json, and the plants"
    sw minor10 "$MS10" "" minor10-list
    sw minor10 "$MS10" "$CR" minor10-crit
    sw minor10 "$MS9" "$CR" minor10-crit-v9patch
    sw minor9 "$MS9" "$CR" minor9-crit
    sw minor10 "$MS10" "$PL" minor10-plant
    sw minor9 "$MS9" "$PL" minor9-plant
    node prose-sweep.mjs --root "$B/absent" --patch "$MS10" --declare "$DM" --rulings "$CR" > "$REC/sweep-absent.log" 2>&1; echo "SWEEP absent exit $?: $(tail -1 "$REC/sweep-absent.log")"
    echo "-- the plants' unread / stale lines"; grep -hE "✗" "$REC/sweep-minor10-plant.log" "$REC/sweep-minor9-plant.log" "$REC/sweep-minor9-crit.log" | cut -c1-200
    echo "-- the list's line keys: minor9 vs minor10 (lines printed)"; diff <(grep -oE '^ *[^ ]+:[0-9]+' "$REC/sweep-minor9-crit.log" | sort -u) <(grep -oE '^ *[^ ]+:[0-9]+' "$REC/sweep-minor10-crit.log" | sort -u) > /dev/null; echo "diff exit $?"
    echo "-- H11-2 print"
    for t in minor9 minor10; do node neighbourhood.mjs --root "$T/$t" --patch "$MS9" > "$REC/neighbourhood-$t.log" 2>&1; echo "NBHD $t exit $?: $(tail -1 "$REC/neighbourhood-$t.log")"; done
    node neighbourhood.mjs --root "$T/minor10" --patch "$MS10" > "$REC/neighbourhood-minor10-ownpatch.log" 2>&1; echo "NBHD minor10 own patch exit $?: $(tail -1 "$REC/neighbourhood-minor10-ownpatch.log")"
    diff <(sed 1d "$REC/neighbourhood-minor9.log" | sed "s#$T/minor9##g") <(sed 1d "$REC/neighbourhood-minor10.log" | sed "s#$T/minor10##g") > "$REC/neighbourhood-minor9-minor10.diff"; echo "print diff minor9 vs minor10 exit $?, $(grep -c '^[<>]' "$REC/neighbourhood-minor9-minor10.diff") lines"
    echo "-- LAW, census (+ its 10.1.0 bite), HOV, LIT, ladder, FL-14"
    node launch-law.mjs > "$REC/law.log" 2>&1; echo "LAW exit $?: $(tail -1 "$REC/law.log")"
    node "$M/pass-4/lighting-census.mjs" "$T/minor10" > "$REC/census-minor10.log" 2>&1; echo "census minor10 exit $?: $(tail -1 "$REC/census-minor10.log")"
    t=$B/v1010; rm -rf "$t"; mkdir -p "$t"; git -C "$R" archive v10.1.0 src/styles | tar -x -C "$t"
    node "$M/pass-4/lighting-census.mjs" "$t" > "$REC/census-v1010.log" 2>&1; echo "census v10.1.0 exit $?: $(tail -1 "$REC/census-v1010.log")"; rm -rf "$t"
    node hover-fill-selected.mjs --root "$T/minor10" > "$REC/HOV-minor10.log" 2>&1; echo "HOV minor10 exit $?: $(tail -1 "$REC/HOV-minor10.log")"
    node lighting-literals.mjs --root "$T/minor10" > "$REC/LIT-minor10.log" 2>&1; echo "LIT minor10 exit $?: $(grep -o 'LIGHTING-LITERALS.*' "$REC/LIT-minor10.log" | tail -1)"
    grep -E -- '--glass-blur-(wash|quiet|resting|floating|overlay)-radius:' "$T/minor10/src/styles/tokens/glass.css" | sed 's/^ *//' > "$REC/radii-minor10.txt"; diff "$REC/radii-minor10.txt" "$P11/MS9-records/radii-minor9.txt"; echo "LADDER diff to pass-11 radii-minor9 exit $?"
    echo "FL-14: $(sed -n '/^@utility glass-plate/,/^}/p' "$T/minor10/src/styles/glass/veil.css" | grep -c 'isolation: isolate') isolation line(s) in @utility glass-plate"
  } 2>&1 | tee "$REC/static.log"
  ;;
read)
  # The reading aid for the two rewritten sentences (R-26, R-33, R-36): the sentences in both trees and every line the
  # carried why of grasp.css:135 cites, read on the minor v10. Not gated.
  T=$B/trees/minor10
  { for t in minor9 minor10; do echo "== $t grasp.css:128-140"; sed -n '128,140p' "$B/trees/$t/src/styles/glass/grasp.css" | cat -n | sed 's/^ *\([0-9]*\)/\1+127/' ; done
    for t in minor9 minor10; do echo "== $t glass-subtlety.test.ts:190-198"; sed -n '190,198p' "$B/trees/$t/tests/styles/glass-subtlety.test.ts"; done
    echo "== minor10 shell.css:140-152"; sed -n '140,152p' "$T/src/components/dock/styles/shell.css" 2>/dev/null || grep -rn "glass-veil-dock\|glass-veil-wash" "$T/src" | grep shell.css
    echo "== minor10 shell.css veil reads"; grep -rn -- "--glass-veil-\(wash\|dock\)" "$T/src" --include=shell.css
    echo "== minor10 tokens/glass.css:45-60, :140-158"; sed -n '45,60p;140,158p' "$T/src/styles/tokens/glass.css"
    echo "== minor10 dark-arm.css:270-298"; sed -n '270,298p' "$T/src/styles/tokens/dark-arm.css"
    echo "== minor10 veil.css:66-92"; sed -n '66,92p' "$T/src/styles/glass/veil.css"
    echo "== minor10 liquid-fill.css veil-rest / rung reads"; grep -n -- "--glass-veil-rest\|--glass-veil-rung" "$T/src/styles/glass/liquid-fill.css"
    echo "== every consumer of the grasp register (data-grasp, glass-grasp-carrier) in src/ demo/"; grep -rln -- 'data-grasp\|glass-grasp-carrier' "$T/src" "$T/demo" | sed "s#$T/##"
    echo "== every reader of --glass-veil-rung / --glass-veil-floor in src/"; grep -rn -- "var(--glass-veil-rung\|var(--glass-veil-floor\|--glass-veil-floor:" "$T/src" | sed "s#$T/##"
    echo "== old phrases (expect minor9 only) / new phrases (expect minor10 only)"
    for t in minor9 minor10; do echo "$t: old 'paint fact on BOTH' $(grep -c 'paint fact on BOTH' "$B/trees/$t/src/styles/glass/grasp.css"), new 'keeps the bound in light' $(grep -c 'keeps the bound in light' "$B/trees/$t/src/styles/glass/grasp.css"), old 'the rung darkens' $(grep -c 'the rung darkens' "$B/trees/$t/tests/styles/glass-subtlety.test.ts"), new 'never the cream foreground' $(grep -c 'never the cream foreground' "$B/trees/$t/tests/styles/glass-subtlety.test.ts")"; done
  } 2>&1 | tee "$REC/read.log"
  ;;
same)
  # R-22 / R-27: the minor v9, the minor v10 and the minor v9 again, each built by harness/build.mjs --demo under ONE label
  # in this worktree, each output moved aside before the next, compared raw; the specimen CSS hash and the dist-demo
  # sha256 list tied to the banks. HEAD is built last as the bite.
  O=$D3_OUT/builds; S=$D3_OUT/same; mkdir -p "$S"
  bld() { rm -rf "$O/same"; node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; rm -rf "$S/$1"; mv "$O/same" "$S/$1"; echo "$1 built $(ts)"; }
  { FN=bld on minor9 "$MS9"
    FN=bld on minor10 "$MS10"
    FN=bld on minor9b "$MS9"
    clean && bld head
    for n in minor9 minor10 minor9b head; do for k in dist demo; do (cd "$S/$n/$k" && find . -type f ! -name build.json | sort | xargs shasum -a 256) > "$REC/same-$n-$k.sha256"; done
      for c in "$S/$n/dist"/assets/*.css; do echo "$n specimen css $(basename "$c") $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -c1-16)"; done
      echo "$n dist files: $(wc -l < "$REC/same-$n-dist.sha256" | tr -d ' '), dist-demo files: $(wc -l < "$REC/same-$n-demo.sha256" | tr -d ' ')"; done
    for k in dist demo; do diff -rq -x build.json "$S/minor9/$k" "$S/minor10/$k" > "$REC/same-$k-minor9-minor10.txt"; echo "$k minor9 vs minor10: diff -rq exit $?, $(wc -l < "$REC/same-$k-minor9-minor10.txt" | tr -d ' ') lines"; done
    for k in dist demo; do diff -rq -x build.json "$S/minor9/$k" "$S/minor9b/$k" > /dev/null; echo "$k minor9 vs minor9 rebuilt: diff -rq exit $?"; done
    for k in dist demo; do diff -rq -x build.json "$S/head/$k" "$S/minor10/$k" > "$REC/bite-$k-head-minor10.txt"; echo "bite $k HEAD vs minor10: diff -rq exit $?, $(wc -l < "$REC/bite-$k-head-minor10.txt" | tr -d ' ') lines"; done
    echo "-- R-27 tie: the banked minor v9 specimen css (pass-11 critic) and the OWED seat's minor v9c"; grep -E '\.css$' "$P11/crit-records/same-minor9-dist.sha256"; grep -E '\.css$' "$P12/OWED-records/same-minor9c-dist.sha256"
    diff "$P11/crit-records/same-minor9-demo.sha256" "$REC/same-minor10-demo.sha256" > /dev/null; echo "banked pass-11 minor9 dist-demo sha256 list vs minor10: diff exit $?"
    diff "$P12/OWED-records/same-minor9c-demo.sha256" "$REC/same-minor10-demo.sha256" > /dev/null; echo "OWED minor9c dist-demo sha256 list vs minor10: diff exit $?"
    diff <(grep -E '\.css$' "$P11/crit-records/same-minor9-dist.sha256" | cut -d' ' -f1) <(grep -E '\.css$' "$REC/same-minor10-dist.sha256" | cut -d' ' -f1) > /dev/null; echo "banked minor9 specimen css sha256 vs minor10: diff exit $?"
  } 2>&1 | tee "$REC/same.log"
  ;;
toolchain)
  # The minor v10: typecheck, library build, test typecheck, dist-demo (built before vitest), vitest --maxWorkers=2.
  # The worktree is left at the minor v10 for `ratchet` (it reads the library dist/); teardown removes it.
  cd "$W"; clean || exit 3
  git apply "$MS10" && is "$MS10" | tee "$REC/toolchain.log"
  printf 'import base from "./vite.config";\nexport default { ...(base as object), cacheDir: ".cache-m10/vite" };\n' > vite.m10.config.ts
  printf 'import base from "./vitest.config";\nexport default { ...(base as object), cacheDir: ".cache-m10/vitest" };\n' > vitest.m10.config.ts
  printf 'import base from "./demo/vite.demo-dist.config";\nexport default { ...(base as object), cacheDir: ".cache-m10/vite-demo" };\n' > vite.m10demo.config.ts
  { npx vue-tsc --noEmit > "$REC/tsc-app.log" 2>&1; echo "typecheck app exit $? $(ts)"
    npx vite build --config vite.m10.config.ts > "$REC/libbuild.log" 2>&1; echo "library build exit $? $(ts)"
    npx vue-tsc --noEmit -p tsconfig.test.json > "$REC/tsc-test.log" 2>&1; echo "typecheck tests exit $? $(ts)"
    npx vite build --config vite.m10demo.config.ts > "$REC/demobuild.log" 2>&1; echo "dist-demo exit $? $(ts)"
    npx vitest run --config vitest.m10.config.ts --maxWorkers=2 > "$REC/units.log" 2>&1; echo "vitest exit $? $(ts)"
    grep -E "Test Files|Tests  " "$REC/units.log"
  } 2>&1 | tee -a "$REC/toolchain.log"
  rm -f vite.m10.config.ts vitest.m10.config.ts vite.m10demo.config.ts
  ;;
reds)
  # A red file from `toolchain`, re-run alone on the minor v10: bash MS10-run.sh reds <run> <test file>...
  run=$1; shift; cd "$W"; is "$MS10" || exit 3
  printf 'import base from "./vitest.config";\nexport default { ...(base as object), cacheDir: ".cache-m10/vitest" };\n' > vitest.m10.config.ts
  { npx vitest run --config vitest.m10.config.ts --maxWorkers=2 "$@" > "$REC/reds-$run.log" 2>&1; echo "reds $run exit $? $(ts)"; grep -E "Test Files|Tests  " "$REC/reds-$run.log"; } 2>&1 | tee -a "$REC/reds.log"
  rm -f vitest.m10.config.ts
  ;;
ratchet)
  # G5: the export/roster verifier on the minor v10's library build, the datum unrebound; then rebound in the worktree
  # only and restored; and which library dist files carry a rewritten sentence.
  cd "$W"; is "$MS10" || exit 3
  { node scripts/verify-export-types.mjs > "$REC/verifier.log" 2>&1; echo "verifier exit $?: $(grep -E 'RATCHET|terminal|PRESENT' "$REC/verifier.log" | head -4 | tr '\n' ' ')"
    n=$(grep -oE "forbidden: [0-9]+" "$REC/verifier.log" | grep -oE "[0-9]+" | head -1); echo "HEAD datum $(git show HEAD:.bundle-ratchet), measured $n"; echo "$n" > .bundle-ratchet
    node scripts/verify-export-types.mjs > "$REC/verifier-rebound.log" 2>&1; echo "verifier (datum $n in the worktree) exit $?: $(grep -E 'terminal|PRESENT' "$REC/verifier-rebound.log" | head -3 | tr '\n' ' ')"
    git show HEAD:.bundle-ratchet > .bundle-ratchet; test -z "$(git status --porcelain -- .bundle-ratchet)" && echo ".bundle-ratchet restored to HEAD"
    git -C "$R" diff --stat v10.1.0 HEAD -- .published-roster; git diff --stat HEAD -- .published-roster; echo "roster diff (v10.1.0..HEAD, and the worktree) above: empty = unchanged"
    echo "-- library dist files carrying a rewritten sentence (grep over dist/)"
    grep -rlE 'keeps the bound in light|strength in paint|never the cream foreground' dist 2>/dev/null | head; echo "(end)"
  } 2>&1 | tee "$REC/ratchet.log"
  ;;
teardown)
  { git -C "$R" worktree remove --force "$W"; git -C "$R" worktree prune; rm -rf "$B"
    rmdir "$R/.claude/worktrees/bl/D3/p12" 2>/dev/null
    echo "worktrees naming D3/p12/minor10: $(git -C "$R" worktree list | grep -c 'D3/p12/minor10')"; ls "$R/.claude/worktrees/bl/D3/"
    echo "checkout source status (empty = untouched): [$(git -C "$R" status --porcelain -- src demo tests DESIGN.md)]"
  } 2>&1 | tee "$REC/teardown.log"
  ;;
esac
echo "== $phase end $(ts)" | tee -a "$REC/phases.log"
