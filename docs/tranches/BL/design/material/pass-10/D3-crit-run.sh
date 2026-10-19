#!/usr/bin/env bash
# D3-crit-run.sh · D3 pass 10, the fresh critic (REGISTRY P9-6.2 step 4): every command the critic ran, by phase.
# One worktree (.claude/worktrees/bl/D3/p10/crit/wt) at HEAD with node_modules symlinked. Trees cut per build under
# $B/trees/{head,fv7,fv8,fv9,minor7,minor7p,minor8,minor8p}. Builds and caches inside the worktree ($W/.d3out,
# $W/.cache-crit). Records land in pass-10/crit-records/. Each phase runs as
# `~/.claude/guard/guarded [--light] --timeout N -- bash D3-crit-run.sh <phase>`; no phase launches a browser and no
# WebKit lock is taken (the task says so). The worktree is moved between patches only by `git apply` / `git apply -R`,
# each state cmp-checked against its patch or a clean status.
#   setup | compose | declare | del | sweep | selftest | same | toolchain-fv9 | toolchain-m8 | teardown
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p10/crit
W=$B/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
P8=$M/pass-8
P9=$M/pass-9
P10=$M/pass-10
REC=$P10/crit-records
FV7=$P8/floor-v7.patch
FV8=$P9/floor-v8.patch
FV9=$P10/floor-v9.patch
MS7=$P9/minor-split-v7.patch
MS8=$P10/minor-split-v8.patch
EXACT=$P9/H9-exact-floor.json
export D3_OUT=$W/.d3out
mkdir -p "$REC"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
clean() { test -z "$(git -C "$W" status --porcelain --untracked-files=no)"; }
CUR=$B/current
is() { git -C "$W" diff HEAD --binary | cmp -s - "$1"; }
# use <patch...|HEAD>: reverse whatever the worktree holds (recorded in $CUR), then apply the named patches in order.
use() { local p;
  if [ -s "$CUR" ]; then tac "$CUR" 2>/dev/null > "$CUR.r" || tail -r "$CUR" > "$CUR.r"; while read -r p; do git -C "$W" apply -R "$p" || exit 3; done < "$CUR.r"; fi
  : > "$CUR"; clean || { echo "worktree not clean"; exit 3; }
  [ "$1" = HEAD ] && return 0
  for p in "$@"; do git -C "$W" apply "$p" || exit 3; echo "$p" >> "$CUR"; done
}
cuttree() { rm -rf "$B/trees/$1"; mkdir -p "$B/trees/$1/docs"; cp -R "$W/src" "$W/demo" "$W/tests" "$W/DESIGN.md" "$B/trees/$1/"; cp -R "$W/docs/canon" "$B/trees/$1/docs/"; cp "$W"/*.md "$B/trees/$1/" 2>/dev/null; true; }
phase=$1; shift
echo "== $phase start $(ts)" | tee -a "$REC/phases.log"
case $phase in
setup)
  git -C "$R" worktree add --detach "$W" HEAD && ln -s "$R/node_modules" "$W/node_modules"
  echo "worktree at $(git -C "$W" rev-parse --short=9 HEAD)"
  use HEAD; cuttree head
  use "$FV7"; is "$FV7" && cuttree fv7 && echo "fv7 cut"
  use "$FV8"; is "$FV8" && cuttree fv8 && echo "fv8 cut"
  use "$FV9"; is "$FV9" && cuttree fv9 && echo "fv9 cut"
  use "$MS7"; is "$MS7" && cuttree minor7 && echo "minor7 cut"
  use "$MS7" "$P9/MS7-r21b-proposed.diff"; cuttree minor7p && echo "minor7p cut"
  use "$MS8"; is "$MS8" && cuttree minor8 && echo "minor8 cut"
  use "$MS8" "$P10/MS8-r26-proposed.diff"; cuttree minor8p && echo "minor8p cut"
  use "$FV9"; is "$FV9" && echo "worktree = floor v9"
  ;;
compose)
  { use "$FV8" "$P10/floor-v9-delta.diff"; is "$FV9" && echo "floor-v8.patch + floor-v9-delta.diff = floor-v9.patch (worktree diff cmp exit 0)"
    use "$MS7" "$P10/minor-split-v8-R25.diff"; is "$MS8" && echo "minor-split-v7.patch + minor-split-v8-R25.diff = minor-split-v8.patch (worktree diff cmp exit 0)"
    use "$MS7" "$P9/MS7-r21b-proposed.diff"; git -C "$W" diff HEAD --binary > "$B/m7p.diff"
    use "$MS8"; git -C "$W" diff HEAD --binary > "$B/m8.diff"
    echo "-- the minor v8 against the minor v7 + MS7-r21b-proposed.diff (R-25's 'nothing else'):"; diff "$B/m7p.diff" "$B/m8.diff" | grep -E '^[<>] [-+]'
    use "$FV9"
    for p in "$FV8" "$FV9" "$MS7" "$MS8" "$P10/floor-v9-delta.diff" "$P10/minor-split-v8-R25.diff" "$P9/MS7-r21b-proposed.diff" "$P10/MS8-r26-proposed.diff"; do echo "$(basename "$p"): $(grep -c '^diff --git' "$p") files, sha1 $(shasum "$p" | cut -c1-8)"; done
    git -C "$R" apply --check "$FV9"; echo "apply --check floor-v9 at checkout $(git -C "$R" rev-parse --short=9 HEAD) exit $?"
    git -C "$R" apply --check "$MS8"; echo "apply --check minor-v8 at checkout exit $?"
    diff <(git apply --numstat "$FV8" | cut -f3) <(git apply --numstat "$FV9" | cut -f3) >/dev/null; echo "path list fv8 = fv9: exit $?"
    diff <(git apply --numstat "$MS7" | cut -f3) <(git apply --numstat "$MS8" | cut -f3) >/dev/null; echo "path list m7 = m8: exit $?"
    git -C "$R" diff --stat 1da7eb17b HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon | tail -1; echo "10.1.0 source diff to HEAD (empty above = none)"
  } 2>&1 | tee "$REC/compose.log"
  ;;
declare)
  cd "$H"
  { node declare-removed.mjs --patch "$FV9" --root "$B/trees/fv9" --concepts deletes-floor.json --exact "$EXACT" --out "$REC/declare-fv9.json" 2>&1 | tail -2
    python3 -I -c 'import json,sys; a=json.load(open(sys.argv[1])); b=json.load(open(sys.argv[2])); [x.pop("patch",None) for x in (a,b)]; print("critic declaration vs FV9 seat declaration:", "IDENTICAL" if a==b else "DIFFER")' "$REC/declare-fv9.json" "$P10/FV9-records/declare-floor-v9.json"
  } 2>&1 | tee "$REC/declare.log"
  ;;
del)
  cd "$H"
  { for t in fv9 fv8 head; do node deleted-mechanisms.mjs --root "$B/trees/$t" --declare "$REC/declare-fv9.json" --patch "$FV9" > "$REC/del-$t.log" 2>&1; echo "DEL floor-decl $t exit $?: $(grep -E '^(PASS|FAIL)' "$REC/del-$t.log" | tail -1)"; done
    node deleted-mechanisms.mjs --root "$B/no-such-tree" --declare "$REC/declare-fv9.json" --patch "$FV9" > "$REC/del-absent-floor.log" 2>&1; echo "DEL floor-decl absent root exit $?: $(tail -1 "$REC/del-absent-floor.log")"
    mkdir -p "$B/empty"; node deleted-mechanisms.mjs --root "$B/empty" --declare deletes-minor.json > "$REC/del-empty.log" 2>&1; echo "DEL empty dir exit $?: $(tail -1 "$REC/del-empty.log")"
    for t in minor8 minor7 minor8p; do node deleted-mechanisms.mjs --root "$B/trees/$t" --declare deletes-minor.json --patch "$MS8" > "$REC/del-minor-$t.log" 2>&1; echo "DEL minor-decl $t exit $?: $(grep -E '^(PASS|FAIL)' "$REC/del-minor-$t.log" | tail -1)"; done
    rm -rf "$B/h7/minor8"; mkdir -p "$B/h7/minor8"; cp -R "$B/trees/minor8/src" "$B/trees/minor8/demo" "$B/h7/minor8/"; node deleted-mechanisms.mjs --root "$B/h7/minor8" --declare deletes-minor.json > "$REC/del-H7-minor8.log" 2>&1; echo "DEL H7-3 minor8 exit $?: $(tail -1 "$REC/del-H7-minor8.log")"
    node launch-law.mjs > "$REC/law.log" 2>&1; echo "LAW exit $?: $(tail -1 "$REC/law.log")"
    for t in fv9 minor8 head; do node "$M/pass-4/lighting-census.mjs" "$B/trees/$t" > "$REC/census-$t.log" 2>&1; echo "census $t exit $?: $(tail -1 "$REC/census-$t.log")"; done
    for t in fv9 minor8; do node hover-fill-selected.mjs --root "$B/trees/$t" > "$REC/HOV-$t.log" 2>&1; echo "HOV $t exit $?: $(tail -1 "$REC/HOV-$t.log")"; done
  } 2>&1 | tee "$REC/del.log"
  ;;
sweep)
  cd "$H"
  { node prose-sweep.mjs --root "$B/trees/fv9" --patch "$FV9" --declare "$REC/declare-fv9.json" > "$REC/sweep-fv9.log" 2>&1; echo "SWEEP fv9 LIST exit $?: $(tail -1 "$REC/sweep-fv9.log")"
    node prose-sweep.mjs --root "$B/trees/fv9" --patch "$FV9" --declare "$REC/declare-fv9.json" --rulings "$P10/FV9-rulings.json" > "$REC/sweep-fv9-ruled.log" 2>&1; echo "SWEEP fv9 ruled exit $?: $(tail -1 "$REC/sweep-fv9-ruled.log")"
    node prose-sweep.mjs --root "$B/trees/fv8" --patch "$FV9" --declare "$REC/declare-fv9.json" --rulings "$P10/FV9-rulings.json" > "$REC/sweep-fv8-plant.log" 2>&1; echo "SWEEP fv8 plant exit $?: $(tail -1 "$REC/sweep-fv8-plant.log")"
    node prose-sweep.mjs --root "$B/trees/fv9" --patch "$FV9" --declare "$REC/declare-fv9.json" --rulings "$P9/FV8-rulings.json" > "$REC/sweep-fv9-under-fv8r.log" 2>&1; echo "SWEEP fv9 under FV8-rulings exit $?: $(tail -1 "$REC/sweep-fv9-under-fv8r.log")"
    node prose-sweep.mjs --root "$B/trees/minor8" --patch "$MS8" --declare deletes-minor.json > "$REC/sweep-m8.log" 2>&1; echo "SWEEP m8 LIST exit $?: $(tail -1 "$REC/sweep-m8.log")"
    node prose-sweep.mjs --root "$B/trees/minor8" --patch "$MS8" --declare deletes-minor.json --rulings "$P10/MS8-rulings.json" > "$REC/sweep-m8-ruled.log" 2>&1; echo "SWEEP m8 ruled exit $?: $(tail -1 "$REC/sweep-m8-ruled.log")"
    node prose-sweep.mjs --root "$B/trees/minor7" --patch "$MS8" --declare deletes-minor.json --rulings "$P10/MS8-rulings.json" > "$REC/sweep-m7-plant.log" 2>&1; echo "SWEEP m7 plant exit $?: $(tail -1 "$REC/sweep-m7-plant.log")"
    node prose-sweep.mjs --root "$B/trees/minor8" --patch "$MS8" --declare deletes-minor.json --rulings "$P9/MS7-rulings-proposed.json" > "$REC/sweep-m8-under-ms7p.log" 2>&1; echo "SWEEP m8 under MS7-rulings-proposed exit $?: $(tail -1 "$REC/sweep-m8-under-ms7p.log")"
    node prose-sweep.mjs --root "$B/trees/minor8p" --patch "$MS8" --declare deletes-minor.json --rulings "$P10/MS8-rulings-proposed.json" > "$REC/sweep-m8p-ruled.log" 2>&1; echo "SWEEP m8p ruled exit $?: $(tail -1 "$REC/sweep-m8p-ruled.log")"
    node prose-sweep.mjs --root "$B/no-such-tree" --patch "$MS8" --declare deletes-minor.json > "$REC/sweep-absent.log" 2>&1; echo "SWEEP absent exit $?: $(tail -1 "$REC/sweep-absent.log")"
  } 2>&1 | tee "$REC/sweep.log"
  ;;
selftest)
  # H10's own rows on the critic's trees (fv7, fv8 and minor7 as the H10 seat read them; minor7p for R-25's fixture).
  rm -rf "$B/st"; mkdir -p "$B/st"; for t in fv7 fv8 minor7 minor7p; do cp -R "$B/trees/$t" "$B/st/$t"; done
  cd "$H"
  D3_OUT=$B/out node selftest.mjs --only H10-1,H10-2 --h9-trees "$B/st" --h9-patch "$FV7" --h9-exact "$EXACT" --h9-minor-patch "$P8/minor-split-v6.patch" --h9-minor7-patch "$MS7" > "$REC/selftest-h10.log" 2>&1; echo "selftest H10 exit $?: $(tail -1 "$REC/selftest-h10.log")" | tee -a "$REC/selftest-h10.log"
  ;;
same)
  # R-22 / R-27: floor v8, floor v9, minor v7, minor v8 built under one label in one session; raw diffs; the ties to the
  # banked lists cite only the specimen CSS hash and the dist-demo sha256 list.
  O=$D3_OUT/builds; S=$D3_OUT/same; rm -rf "$S"; mkdir -p "$S"
  for p in "$FV9":fv9 "$FV8":fv8 "$MS8":m8 "$MS7":m7; do use "${p%%:*}"; node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/${p##*:}"; echo "${p##*:} built $(ts)"; done
  use HEAD; node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/head"; echo "head built $(ts)"
  use "$FV9"
  { for k in dist demo; do diff -rq -x build.json "$S/fv8/$k" "$S/fv9/$k" > /dev/null; echo "$k fv8 vs fv9 (this session): diff -rq exit $?"; diff -rq -x build.json "$S/m7/$k" "$S/m8/$k" > /dev/null; echo "$k m7 vs m8 (this session): diff -rq exit $?"; diff -rq -x build.json "$S/head/$k" "$S/fv9/$k" > /dev/null; echo "$k HEAD vs fv9 (bite): diff -rq exit $?"; diff -rq -x build.json "$S/head/$k" "$S/m8/$k" > /dev/null; echo "$k HEAD vs m8 (bite): diff -rq exit $?"; done
    for l in fv9 m8; do (cd "$S/$l/demo" && find . -type f ! -name build.json | sort | xargs shasum -a 256) > "$REC/same-$l-demo.sha256"; echo "$l demo files: $(wc -l < "$REC/same-$l-demo.sha256" | tr -d ' ')"; done
    diff "$P9/FV8-records/same-fv8-demo.sha256" "$REC/same-fv9-demo.sha256" > /dev/null; echo "demo banked fv8 (pass 9) vs fv9 (this session): diff exit $?"
    diff "$P9/MS7-records/same-m7-demo.sha256" "$REC/same-m8-demo.sha256" > /dev/null; echo "demo banked m7 (pass 9) vs m8 (this session): diff exit $?"
    for l in fv9 fv8 m8 m7 head; do for c in "$S/$l/dist"/assets/*.css; do echo "$l specimen css $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -d' ' -f1)"; done; done
    grep -E '\.css$' "$P9/FV8-records/same-fv8-dist.sha256" | sed 's/^/banked fv8 CSS: /'
    grep -E '\.css$' "$P9/MS7-records/same-m7-dist.sha256" | sed 's/^/banked m7 CSS: /'
  } 2>&1 | tee "$REC/same.log"
  ;;
toolchain-fv9|toolchain-m8)
  [ "$phase" = toolchain-fv9 ] && use "$FV9" || use "$MS8"
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
teardown)
  git -C "$R" worktree remove --force "$W"; git -C "$R" worktree prune; rm -rf "$B"; rmdir "$R/.claude/worktrees/bl/D3/p10" 2>/dev/null; ls "$R/.claude/worktrees/bl/D3/" 2>&1; echo "D3/p10 worktrees left: $(git -C "$R" worktree list | grep -c 'D3/p10')"; true
  ;;
esac
echo "== $phase end $(ts)" | tee -a "$REC/phases.log"
# Added after the first run: the proposed delta's byte proof (floor v9 vs floor v9 + crit-fv10-proposed.diff, one session).
case $phase in
proposed-same)
  O=$D3_OUT/builds; S=$D3_OUT/same
  use "$FV9"; python3 -I "$P10/crit-fv10-proposed.py" "$W"; node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; rm -rf "$S/fv9p"; mv "$O/same" "$S/fv9p"
  for f in src/components/dock/styles/controls/icon-button.css src/styles/tokens/sizing.css src/styles/glass/overlay-plate.css; do cp "$B/trees/fv9/$f" "$W/$f"; done; is "$FV9" || exit 3
  { for k in dist demo; do diff -rq -x build.json "$S/fv9/$k" "$S/fv9p/$k" > /dev/null; echo "$k fv9 vs fv9+proposed: diff -rq exit $?"; done
    for c in "$S/fv9p/dist"/assets/*.css; do echo "fv9p specimen css $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -c1-16)"; done
  } 2>&1 | tee "$REC/proposed-same.log"
  echo "== $phase end $(ts)" | tee -a "$REC/phases.log" ;;
esac
