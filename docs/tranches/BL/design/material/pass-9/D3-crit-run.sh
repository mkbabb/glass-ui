#!/usr/bin/env bash
# D3-crit-run.sh · D3 pass 9, the fresh critic (REGISTRY P8-6.2 step 5): every command the critic ran, by phase.
# One worktree (.claude/worktrees/bl/D3/p9/crit/wt) at HEAD with node_modules symlinked. Trees cut per build under
# $B/trees/{head,fv7,fv8,m6,m7,m7p}. Builds and caches inside the worktree ($W/.d3out, $W/.cache-crit).
# Records land in pass-9/crit-records/. Each phase runs as `~/.claude/guard/guarded [--light] --timeout N -- bash
# D3-crit-run.sh <phase>`; no phase launches a browser and no WebKit lock is taken (the task says so).
#   setup | compose | declare | del | sweep | readlines | selftest | same | toolchain-fv8 | toolchain-m7 | teardown
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p9/crit
W=$B/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
P8=$M/pass-8
P9=$M/pass-9
REC=$P9/crit-records
FV7=$P8/floor-v7.patch
FV8=$P9/floor-v8.patch
MS6=$P8/minor-split-v6.patch
MS7=$P9/minor-split-v7.patch
EXACT=$P9/H9-exact-floor.json
export D3_OUT=$W/.d3out
mkdir -p "$REC"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
is() { git -C "$W" diff HEAD --binary | cmp -s - "$1" && echo "worktree = $(basename "$1")"; }
clean() { test -z "$(git -C "$W" status --porcelain --untracked-files=no)"; }
use() { # use <patch|HEAD>: return the worktree to HEAD, then apply the patch, cmp-checked
  git -C "$W" reset -q --hard HEAD; git -C "$W" clean -qfd -e .d3out -e .cache-crit -e node_modules -e "*.crit*.config.ts"; clean || exit 3
  [ "$1" = HEAD ] && return 0
  git -C "$W" apply "$1" || exit 3; is "$1" >/dev/null || exit 3; }
cuttree() { rm -rf "$B/trees/$1"; mkdir -p "$B/trees/$1/docs"; cp -R "$W/src" "$W/demo" "$W/tests" "$W/DESIGN.md" "$B/trees/$1/"; cp -R "$W/docs/canon" "$B/trees/$1/docs/"; cp "$W"/*.md "$B/trees/$1/" 2>/dev/null; true; }
phase=$1; shift
echo "== $phase start $(ts)" | tee -a "$REC/phases.log"
case $phase in
setup)
  git -C "$R" worktree add --detach "$W" HEAD && ln -s "$R/node_modules" "$W/node_modules"
  echo "worktree at $(git -C "$W" rev-parse --short=9 HEAD)"
  for p in HEAD:head "$FV7":fv7 "$FV8":fv8 "$MS6":m6 "$MS7":m7; do use "${p%%:*}"; cuttree "${p##*:}"; echo "tree ${p##*:} cut"; done
  use "$MS7"; git -C "$W" apply "$P9/MS7-r21b-proposed.diff" || exit 3; cuttree m7p; echo "tree m7p cut (minor v7 + MS7-r21b-proposed.diff)"
  use "$FV8"; is "$FV8"
  ;;
compose)
  # The two compositions, re-proved here (not taken from the seats' logs), and the --check at this HEAD.
  { use "$FV7"; git -C "$W" apply "$P9/floor-v8-delta.diff" && is "$FV8" && echo "floor-v7.patch + floor-v8-delta.diff = floor-v8.patch (worktree diff cmp exit 0)"
    use "$MS6"; git -C "$W" apply "$P9/minor-split-v7-R23.diff" && is "$MS7" && echo "minor-split-v6.patch + minor-split-v7-R23.diff = minor-split-v7.patch (worktree diff cmp exit 0)"
    use "$FV8"
    for p in "$FV7" "$FV8" "$MS6" "$MS7" "$P9/floor-v8-delta.diff" "$P9/minor-split-v7-R23.diff" "$P9/MS7-r21b-proposed.diff"; do echo "$(basename "$p"): $(grep -c '^diff --git' "$p") files, sha1 $(shasum "$p" | cut -c1-8)"; done
    git -C "$R" apply --check "$FV8"; echo "apply --check floor-v8 at checkout $(git -C "$R" rev-parse --short=9 HEAD) exit $?"
    git -C "$R" apply --check "$MS7"; echo "apply --check minor-v7 at checkout exit $?"
    echo "delta files floor v8: $(grep '^diff --git' "$P9/floor-v8-delta.diff" | awk '{print $3}' | tr '\n' ' ')"
    echo "delta files minor v7: $(grep '^diff --git' "$P9/minor-split-v7-R23.diff" | awk '{print $3}' | tr '\n' ' ')"
    echo "-- non-comment lines in the floor v8 delta (every +/- line, for the critic to read)"; grep -E '^[-+][^-+]' "$P9/floor-v8-delta.diff" | wc -l
    git -C "$R" diff --stat 1da7eb17b HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon | tail -1; echo "10.1.0 source diff to HEAD (empty above = none)"
  } 2>&1 | tee "$REC/compose.log"
  ;;
declare)
  cd "$H"
  { node declare-removed.mjs --patch "$FV8" --root "$B/trees/fv8" --concepts deletes-floor.json --exact "$EXACT" --out "$REC/declare-fv8.json" 2>&1 | tail -2
    python3 -I -c 'import json,sys; a=json.load(open(sys.argv[1])); b=json.load(open(sys.argv[2])); [x.pop("patch",None) for x in (a,b)]; print("critic declaration vs FV8 seat declaration:", "IDENTICAL" if a==b else "DIFFER")' "$REC/declare-fv8.json" "$P9/FV8-records/declare-floor-v8.json"
  } 2>&1 | tee "$REC/declare.log"
  ;;
del)
  cd "$H"
  { for t in fv8 fv7 head; do node deleted-mechanisms.mjs --root "$B/trees/$t" --declare "$REC/declare-fv8.json" --patch "$FV8" > "$REC/del-$t.log" 2>&1; echo "DEL floor-decl $t exit $?: $(grep -E '^(PASS|FAIL)' "$REC/del-$t.log" | tail -1)"; done
    node deleted-mechanisms.mjs --root "$B/trees/fv8" --declare "$P9/H9-records/declare-floor-v7-on-fv8.json" --patch "$FV7" > "$REC/del-fv8-H9decl.log" 2>&1; echo "DEL H9's decl fv8 exit $?: $(grep -E '^(PASS|FAIL)' "$REC/del-fv8-H9decl.log" | tail -1)"
    for t in m7 m6 m7p; do node deleted-mechanisms.mjs --root "$B/trees/$t" --declare deletes-minor.json --patch "$MS7" > "$REC/del-minor-$t.log" 2>&1; echo "DEL minor-decl $t exit $?: $(grep -E '^(PASS|FAIL)' "$REC/del-minor-$t.log" | tail -1)"; done
    for t in m7 m6; do rm -rf "$B/h7/$t"; mkdir -p "$B/h7/$t"; cp -R "$B/trees/$t/src" "$B/trees/$t/demo" "$B/h7/$t/"; node deleted-mechanisms.mjs --root "$B/h7/$t" --declare deletes-minor.json > "$REC/del-H7-$t.log" 2>&1; echo "DEL H7-3 $t exit $?: $(tail -1 "$REC/del-H7-$t.log")"; done
    node deleted-mechanisms.mjs --root "$B/no-such-tree" --declare deletes-minor.json > "$REC/del-absent.log" 2>&1; echo "DEL on an absent root exit $?: $(tail -1 "$REC/del-absent.log")"
    node launch-law.mjs > "$REC/law.log" 2>&1; echo "LAW exit $?: $(tail -1 "$REC/law.log")"
    for t in fv8 m7; do node "$M/pass-4/lighting-census.mjs" "$B/trees/$t" > "$REC/census-$t.log" 2>&1; echo "census $t exit $?: $(tail -1 "$REC/census-$t.log")"; done
    node "$M/pass-4/lighting-census.mjs" "$B/trees/head" > "$REC/census-head.log" 2>&1; echo "census head exit $?: $(tail -1 "$REC/census-head.log")"
    for t in fv8 m7; do node hover-fill-selected.mjs --root "$B/trees/$t" > "$REC/HOV-$t.log" 2>&1; echo "HOV $t exit $?: $(tail -1 "$REC/HOV-$t.log")"; done
  } 2>&1 | tee "$REC/del.log"
  ;;
sweep)
  cd "$H"
  { node prose-sweep.mjs --root "$B/trees/fv8" --patch "$FV8" --declare "$REC/declare-fv8.json" > "$REC/sweep-fv8.log" 2>&1; echo "SWEEP fv8 LIST exit $?: $(tail -1 "$REC/sweep-fv8.log")"
    node prose-sweep.mjs --root "$B/trees/fv8" --patch "$FV8" --declare "$REC/declare-fv8.json" --rulings "$P9/FV8-rulings.json" > "$REC/sweep-fv8-ruled.log" 2>&1; echo "SWEEP fv8 ruled exit $?: $(tail -1 "$REC/sweep-fv8-ruled.log")"
    node prose-sweep.mjs --root "$B/trees/fv7" --patch "$FV8" --declare "$REC/declare-fv8.json" --rulings "$P9/FV8-rulings.json" > "$REC/sweep-fv7-plant.log" 2>&1; echo "SWEEP fv7 plant exit $?: $(tail -1 "$REC/sweep-fv7-plant.log")"
    node prose-sweep.mjs --root "$B/trees/m7" --patch "$MS7" --declare deletes-minor.json > "$REC/sweep-m7.log" 2>&1; echo "SWEEP m7 LIST exit $?: $(tail -1 "$REC/sweep-m7.log")"
    node prose-sweep.mjs --root "$B/trees/m7" --patch "$MS7" --declare deletes-minor.json --rulings "$P9/MS7-rulings.json" > "$REC/sweep-m7-ruled.log" 2>&1; echo "SWEEP m7 ruled exit $?: $(tail -1 "$REC/sweep-m7-ruled.log")"
    node prose-sweep.mjs --root "$B/trees/m7p" --patch "$MS7" --declare deletes-minor.json --rulings "$P9/MS7-rulings-proposed.json" > "$REC/sweep-m7p-ruled.log" 2>&1; echo "SWEEP m7p ruled exit $?: $(tail -1 "$REC/sweep-m7p-ruled.log")"
    node prose-sweep.mjs --root "$B/trees/m6" --patch "$MS7" --declare deletes-minor.json --rulings "$P9/MS7-rulings.json" > "$REC/sweep-m6-plant.log" 2>&1; echo "SWEEP m6 plant exit $?: $(tail -1 "$REC/sweep-m6-plant.log")"
  } 2>&1 | tee "$REC/sweep.log"
  ;;
selftest)
  cd "$H"
  D3_OUT=$B/out node selftest.mjs > "$REC/selftest.log" 2>&1; echo "selftest (default rows) exit $?: $(tail -1 "$REC/selftest.log")" | tee -a "$REC/selftest.log"
  ;;
same)
  # R-22: floor v8 and minor v7 built under one label; each compared to pass 8's banked same-label lists of its
  # predecessor (dist-demo raw; specimen CSS by hash; specimen JS after rewriting the worktree path), and floor v7
  # built here as well for a raw same-session compare.
  O=$D3_OUT/builds; S=$D3_OUT/same; rm -rf "$S"; mkdir -p "$S"
  for p in "$FV8":fv8 "$FV7":fv7 "$MS7":m7; do use "${p%%:*}"; node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/${p##*:}"; echo "${p##*:} built $(ts)"; done
  use HEAD; node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/head"; echo "head built $(ts)"
  use "$FV8"
  { for k in dist demo; do diff -rq -x build.json "$S/fv7/$k" "$S/fv8/$k" > /dev/null; echo "$k fv7 vs fv8 (this session): diff -rq exit $?"; diff -rq -x build.json "$S/head/$k" "$S/fv8/$k" > /dev/null; echo "$k HEAD vs fv8 (bite): diff -rq exit $?"; done
    for l in fv8 m7; do for k in dist demo; do (cd "$S/$l/$k" && find . -type f ! -name build.json | sort | xargs shasum -a 256) > "$REC/same-$l-$k.sha256"; done; done
    for k in dist demo; do diff "$P8/FV7-records/same-fv7-$k.sha256" "$REC/same-fv8-$k.sha256" > "$REC/same-$k-fv7banked-fv8.txt"; echo "$k banked fv7 vs fv8: diff exit $?, $(wc -l < "$REC/same-$k-fv7banked-fv8.txt" | tr -d ' ') lines"; done
    for k in dist demo; do diff "$P8/MS6-records/same-m6-$k.sha256" "$REC/same-m7-$k.sha256" > "$REC/same-$k-m6banked-m7.txt"; echo "$k banked m6 vs m7: diff exit $?, $(wc -l < "$REC/same-$k-m6banked-m7.txt" | tr -d ' ') lines"; done
    for l in fv8 fv7 m7 head; do for c in "$S/$l/dist"/assets/*.css; do echo "$l specimen css $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -c1-16)"; done; done
    for l in fv8:floor8:floor7 m7:minor7:minor6; do IFS=: read n a b <<< "$l"; N=$B/pn-$n; rm -rf "$N"; cp -R "$S/$n/dist" "$N"
      for f in "$N"/assets/*.js; do LC_ALL=C sed -i '' "s#\.claude/worktrees/bl/D3/p9/crit/wt/#.claude/worktrees/bl/D3/p8/$b/wt/#g" "$f"; echo "$n specimen JS, path rewritten to p8/$b: sha256 $(shasum -a 256 "$f" | cut -d' ' -f1)"; done; done
    grep -E 'index-[A-Za-z0-9_-]+\.js$' "$P8/FV7-records/same-fv7-dist.sha256" | sed 's/^/banked fv7 JS: /'
    grep -E 'index-[A-Za-z0-9_-]+\.js$' "$P8/MS6-records/same-m6-dist.sha256" | sed 's/^/banked m6 JS: /'
  } 2>&1 | tee "$REC/same.log"
  ;;
toolchain-fv8|toolchain-m7)
  [ "$phase" = toolchain-fv8 ] && use "$FV8" || use "$MS7"
  cd "$W"
  printf 'import base from "./vite.config";\nexport default { ...(base as object), cacheDir: ".cache-crit/vite" };\n' > vite.crit.config.ts
  printf 'import base from "./vitest.config";\nexport default { ...(base as object), cacheDir: ".cache-crit/vitest" };\n' > vitest.crit.config.ts
  printf 'import base from "./demo/vite.demo-dist.config";\nexport default { ...(base as object), cacheDir: ".cache-crit/vite-demo" };\n' > vite.critdemo.config.ts
  L=${phase#toolchain-}
  { npx vue-tsc --noEmit > "$REC/tsc-app-$L.log" 2>&1; echo "typecheck app exit $? $(ts)"
    npx vite build --config vite.crit.config.ts > "$REC/libbuild-$L.log" 2>&1; echo "library build exit $? $(ts)"
    npx vue-tsc --noEmit -p tsconfig.test.json > "$REC/tsc-test-$L.log" 2>&1; echo "typecheck tests exit $? $(ts)"
    npx vite build --config vite.critdemo.config.ts > "$REC/demobuild-$L.log" 2>&1; echo "dist-demo exit $? $(ts)"
    npx vitest run --config vitest.crit.config.ts --maxWorkers=2 --testTimeout 240000 > "$REC/units-$L.log" 2>&1; echo "vitest exit $? $(ts)"
    grep -E "Test Files|Tests  " "$REC/units-$L.log"
  } 2>&1 | tee "$REC/toolchain-$L.log"
  rm -f vite.crit.config.ts vitest.crit.config.ts vite.critdemo.config.ts
  ;;
same-m6)
  # The minor's raw same-session compare: minor v6 built here beside the minor v7 of `same`.
  O=$D3_OUT/builds; S=$D3_OUT/same
  use "$MS6"; node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; rm -rf "$S/m6"; mv "$O/same" "$S/m6"; echo "m6 built $(ts)"
  use "$MS7"; node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; rm -rf "$S/m7b"; mv "$O/same" "$S/m7b"; echo "m7 rebuilt $(ts)"
  use "$FV8"
  { for k in dist demo; do diff -rq -x build.json "$S/m6/$k" "$S/m7/$k" > /dev/null; echo "$k m6 vs m7 (this session): diff -rq exit $?"; diff -rq -x build.json "$S/m7/$k" "$S/m7b/$k" > /dev/null; echo "$k m7 vs m7 rebuilt: diff -rq exit $?"; diff -rq -x build.json "$S/head/$k" "$S/m7/$k" > /dev/null; echo "$k HEAD vs m7 (bite): diff -rq exit $?"; done
    for k in dist demo; do echo "$k files m7: $(find "$S/m7/$k" -type f ! -name build.json | wc -l | tr -d ' ')"; done
  } 2>&1 | tee "$REC/same-m6.log"
  ;;
teardown)
  git -C "$R" worktree remove --force "$W"; git -C "$R" worktree prune; rm -rf "$B"; rmdir "$R/.claude/worktrees/bl/D3/p9" 2>/dev/null; ls "$R/.claude/worktrees/bl/D3/" 2>&1; git -C "$R" worktree list | grep -c 'D3/p9'; true
  ;;
esac
echo "== $phase end $(ts)" | tee -a "$REC/phases.log"
