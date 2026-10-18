#!/usr/bin/env bash
# D3-crit-run.sh · D3 pass 8, the fresh critic (REGISTRY P7-6.2 step 5): every command this seat ran, by phase.
# One worktree (.claude/worktrees/bl/D3/p8/crit/wt) at HEAD; patches swapped in and out of it, each swap checked with
# cmp (or a clean git status at HEAD). Trees for the static reads are copied out to $B/trees/<name>.
# Builds and caches live in $W/.d3out and $W/.cache-crit. Records land in pass-8/crit-records/.
#   bash D3-crit-run.sh setup|compose|trees|static|same|bite|toolchain|teardown
# Each phase is launched as `~/.claude/guard/guarded [--light] --timeout N -- bash D3-crit-run.sh <phase>`
# (the guard is the literal command word). No phase launches a browser.
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p8/crit
W=$B/wt
T=$B/trees
M=$R/docs/tranches/BL/design/material
H=$M/harness
P8=$M/pass-8
REC=$P8/crit-records
FV6=$M/pass-7/floor-v6.patch
FV7=$P8/floor-v7.patch
MS5=$M/pass-7/minor-split-v5.patch
MS6=$P8/minor-split-v6.patch
export D3_OUT=$W/.d3out
mkdir -p "$REC"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
is() { git -C "$W" diff HEAD --binary | cmp -s - "$1" && echo "worktree = $(basename "$1")"; }
clean() { test -z "$(git -C "$W" status --porcelain -- src demo tests DESIGN.md docs)"; }
to_head() { if [ -n "${1:-}" ]; then is "$1" >/dev/null && git -C "$W" apply -R "$1" || exit 3; fi; clean || exit 3; echo "worktree = HEAD"; }
from_head() { clean || exit 3; git -C "$W" apply "$1" || exit 3; is "$1" || exit 3; }
cut_tree() { rm -rf "$T/$1"; mkdir -p "$T/$1"; (cd "$W" && cp -R src demo tests "$T/$1/" && mkdir -p "$T/$1/docs" && cp -R docs/canon "$T/$1/docs/" && cp ./*.md "$T/$1/"); echo "tree $1 cut"; }
phase=$1; shift
echo "== $phase start $(ts)" | tee -a "$REC/phases.log"
case $phase in
setup)
  git -C "$R" worktree add --detach "$W" HEAD 2>&1 | tail -1
  ln -s "$R/node_modules" "$W/node_modules"
  git -C "$W" rev-parse --short=9 HEAD
  ;;
compose)
  # Patch composition, byte for byte, and git apply --check of each patch at HEAD.
  { cd "$W"
    for p in "$FV6" "$FV7" "$MS5" "$MS6"; do git apply --check "$p"; echo "apply --check $(basename "$p") at $(git rev-parse --short=9 HEAD): exit $? · $(grep -c '^diff --git' "$p") files · sha1 $(shasum "$p" | cut -c1-8)"; done
    from_head "$FV6"; git apply "$P8/floor-v7-R17.diff" && git diff HEAD --binary | cmp - "$FV7"; echo "floor-v6 + floor-v7-R17.diff = floor-v7.patch: cmp exit $?"
    git apply -R "$FV7" && to_head
    from_head "$MS5"; git apply "$P8/minor-split-v6-R18.diff" && git diff HEAD --binary | cmp - "$MS6"; echo "minor-v5 + minor-split-v6-R18.diff = minor-split-v6.patch: cmp exit $?"
    git apply -R "$MS6" && to_head
    echo "R-17 delta paths:"; git apply --numstat "$P8/floor-v7-R17.diff"
    echo "R-18 delta paths:"; git apply --numstat "$P8/minor-split-v6-R18.diff"
  } 2>&1 | tee "$REC/compose.log"
  ;;
trees)
  # Cut every tree the static reads need: HEAD, floor v6, floor v7, minor v5, minor v6.
  to_head; cut_tree head
  from_head "$FV6"; cut_tree fv6; git -C "$W" apply -R "$FV6"; to_head
  from_head "$FV7"; cut_tree fv7; git -C "$W" apply -R "$FV7"; to_head
  from_head "$MS5"; cut_tree minor5; git -C "$W" apply -R "$MS5"; to_head
  from_head "$MS6"; cut_tree minor6; git -C "$W" apply -R "$MS6"; to_head
  ;;
static)
  # DEL under H8-1 + H8-2: the seats' declarations reproduced, and floor v6 / floor v7 / minor v5 / minor v6 read.
  cd "$H"
  { echo "-- declaration rebuilt from floor-v7.patch on floor v7"
    node declare-removed.mjs --patch "$FV7" --root "$T/fv7" --concepts deletes-floor.json --exact "$P8/H8-exact-floor-v6.json" --out "$REC/declare-fv7.json" 2>&1 | tail -1
    python3 -I -c 'import json,sys; a=json.load(open(sys.argv[1])); b=json.load(open(sys.argv[2])); a.pop("patch",None); b.pop("patch",None); print("crit vs FV7 declaration:", "IDENTICAL" if a==b else "DIFFER")' "$REC/declare-fv7.json" "$P8/FV7-records/declare-floor-v7.json"
    for t in fv7 fv6; do node deleted-mechanisms.mjs --root "$T/$t" --declare "$REC/declare-fv7.json" --patch "$FV7" > "$REC/del-H8-$t.log" 2>&1; echo "DEL H8 $t exit $?: $(grep -E '^(PASS|FAIL)' "$REC/del-H8-$t.log")"; done
    node deleted-mechanisms.mjs --root "$T/fv7" --declare deletes-floor.json --patch "$FV7" > "$REC/del-floorjson-fv7.log" 2>&1; echo "DEL deletes-floor.json alone fv7 exit $?: $(grep -E '^(PASS|FAIL)' "$REC/del-floorjson-fv7.log")"
    echo "-- minor"
    for t in minor6 minor5; do node deleted-mechanisms.mjs --root "$T/$t" --declare deletes-minor.json > "$REC/del-minor-h7-$t.log" 2>&1; echo "H7-3 (src/demo) $t exit $?: $(grep -E '^(PASS|FAIL)' "$REC/del-minor-h7-$t.log")"; done
    for t in minor6 minor5; do node deleted-mechanisms.mjs --root "$T/$t" --declare deletes-minor.json --patch "$MS6" > "$REC/del-minor-h8-$t.log" 2>&1; echo "H8-1 over the minor v6 patch $t exit $?: $(grep -E '^(PASS|FAIL)' "$REC/del-minor-h8-$t.log")"; done
    node deleted-mechanisms.mjs --root "$T/minor6" --declare "$P8/MS6-proposed-sites.json" --patch "$MS6" > "$REC/del-minor-h8-proposed-minor6.log" 2>&1; echo "H8-1 minor6 with MS6-proposed-sites exit $?: $(grep -E '^(PASS|FAIL)' "$REC/del-minor-h8-proposed-minor6.log")"
    node launch-law.mjs > "$REC/law.log" 2>&1; echo "LAW exit $?: $(tail -1 "$REC/law.log")"
    for t in fv7 minor6; do node "$M/pass-4/lighting-census.mjs" "$T/$t" > "$REC/census-$t.log" 2>&1; echo "census $t exit $?: $(tail -1 "$REC/census-$t.log")"; done
    node "$M/pass-4/lighting-census.mjs" "$T/head" > "$REC/census-head.log" 2>&1; echo "census HEAD exit $?: $(tail -1 "$REC/census-head.log")"
    for t in fv7 minor6; do node hover-fill-selected.mjs --root "$T/$t" > "$REC/HOV-$t.log" 2>&1; echo "HOV $t exit $?: $(tail -1 "$REC/HOV-$t.log")"; done
  } 2>&1 | tee "$REC/static.log"
  ;;
sweep)
  # The critic's own sweep, sharing no harness code: crit-sweep.py over each tree and its patch.
  { python3 -I "$P8/crit-sweep.py" "$FV7" "$T/fv7" "$T/head" > "$REC/sweep-fv7.txt"; echo "sweep fv7 exit $?: $(tail -1 "$REC/sweep-fv7.txt")"
    python3 -I "$P8/crit-sweep.py" "$MS6" "$T/minor6" "$T/head" > "$REC/sweep-minor6.txt"; echo "sweep minor6 exit $?: $(tail -1 "$REC/sweep-minor6.txt")"
  } 2>&1 | tee "$REC/sweep.log"
  ;;
same)
  # Byte identity: floor v7, floor v6, minor v6, minor v5, HEAD, each built by harness/build.mjs --demo under ONE label.
  O=$D3_OUT/builds; S=$D3_OUT/same; rm -rf "$S"; mkdir -p "$S"
  bl() { node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/$1"; echo "$1 built $(ts)"; }
  { to_head; from_head "$FV7"; bl fv7; git -C "$W" apply -R "$FV7"
    to_head; from_head "$FV6"; bl fv6; git -C "$W" apply -R "$FV6"
    to_head; from_head "$MS6"; bl minor6; git -C "$W" apply -R "$MS6"
    to_head; from_head "$MS5"; bl minor5; git -C "$W" apply -R "$MS5"
    to_head; bl head
    for pr in "fv6 fv7" "minor5 minor6" "head fv7" "head minor6"; do set -- $pr
      for k in dist demo; do n=$(diff -rq -x build.json "$S/$1/$k" "$S/$2/$k" | wc -l | tr -d ' '); echo "$k $1 vs $2: $n differing entries"; done; done
    for l in fv7 fv6 minor6 minor5 head; do for k in dist demo; do (cd "$S/$l/$k" && find . -type f ! -name build.json | sort | xargs shasum -a 256) > "$REC/same-$l-$k.sha256"; done
      for c in "$S/$l/dist"/assets/*.css; do echo "$l specimen css $(basename "$c") $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -c1-16)"; done; done
    echo "-- against banked lists"
    diff "$M/pass-7/FV6-records/same-fv6-demo.sha256" "$REC/same-fv7-demo.sha256" >/dev/null; echo "demo banked fv6 (pass 7) vs crit fv7: exit $?"
    diff "$M/pass-7/MS5-records/same-m5-demo.sha256" "$REC/same-minor6-demo.sha256" >/dev/null; echo "demo banked minor5 (pass 7) vs crit minor6: exit $?"
    diff "$P8/FV7-records/same-fv7-demo.sha256" "$REC/same-fv7-demo.sha256" >/dev/null; echo "demo FV7 fv7 vs crit fv7: exit $?"
    diff "$P8/MS6-records/same-m6-demo.sha256" "$REC/same-minor6-demo.sha256" >/dev/null; echo "demo MS6 minor6 vs crit minor6: exit $?"
    N=$B/pathnorm; rm -rf "$N"; mkdir -p "$N"
    for pr in "fv7 p7/floor6" "minor6 p7/minor5"; do set -- $pr; cp -R "$S/$1/dist" "$N/$1"
      for f in "$N/$1"/assets/*.js; do LC_ALL=C sed -i '' "s#\.claude/worktrees/bl/D3/p8/crit/wt/#.claude/worktrees/bl/D3/$2/wt/#g" "$f"; echo "$1 JS path-normalised to $2: $(shasum -a 256 "$f" | cut -d' ' -f1)"; done; done
    grep -E 'index-[A-Za-z0-9_-]+\.js$' "$M/pass-7/FV6-records/same-fv6-dist.sha256" | sed 's/^/banked fv6 JS: /'
    grep -E 'index-[A-Za-z0-9_-]+\.js$' "$M/pass-7/MS5-records/same-m5-dist.sha256" | sed 's/^/banked minor5 JS: /'
  } 2>&1 | tee "$REC/same.log"
  ;;
toolchain)
  # vitest (maxWorkers 2) on floor v7 and the minor v6, after the library build; test typecheck after it.
  cd "$W"
  printf 'import base from "./vite.config";\nexport default { ...(base as object), cacheDir: ".cache-crit/vite" };\n' > vite.crit.config.ts
  printf 'import base from "./vitest.config";\nexport default { ...(base as object), cacheDir: ".cache-crit/vitest" };\n' > vitest.crit.config.ts
  printf 'import base from "./demo/vite.demo-dist.config";\nexport default { ...(base as object), cacheDir: ".cache-crit/vite-demo" };\n' > vite.critdemo.config.ts
  # (first run omitted the dist-demo build, so boot-graph's three build-arm rows read "dist-demo absent":
  #  records kept as units-*-nodemo.log)
  { for p in "$FV7" "$MS6"; do n=$(basename "$p" .patch); to_head; from_head "$p"
      npx vue-tsc --noEmit > "$REC/tsc-app-$n.log" 2>&1; echo "$n typecheck app exit $? $(ts)"
      npx vite build --config vite.crit.config.ts > "$REC/libbuild-$n.log" 2>&1; echo "$n library build exit $? $(ts)"
      npx vue-tsc --noEmit -p tsconfig.test.json > "$REC/tsc-test-$n.log" 2>&1; echo "$n typecheck tests exit $? $(ts)"
      npx vite build --config vite.critdemo.config.ts > "$REC/demobuild-$n.log" 2>&1; echo "$n dist-demo exit $? $(ts)"
      npx vitest run --config vitest.crit.config.ts --maxWorkers=2 --testTimeout 240000 > "$REC/units-$n.log" 2>&1; echo "$n vitest exit $? $(ts)"
      grep -E "Test Files|Tests  " "$REC/units-$n.log"
      grep -n "G-F2" "$REC/units-$n.log" | head -3
      git apply -R "$p"; rm -rf dist; done; to_head
  } 2>&1 | tee "$REC/toolchain.log"
  rm -f vite.crit.config.ts vitest.crit.config.ts vite.critdemo.config.ts; rm -rf dist-demo
  ;;
teardown)
  git -C "$R" worktree remove --force "$W"; git -C "$R" worktree prune; rm -rf "$B"; rmdir "$R/.claude/worktrees/bl/D3/p8" 2>/dev/null; ls "$R/.claude/worktrees/bl/D3/" 2>&1; git -C "$R" worktree list | grep -c 'D3/p8'; true
  ;;
esac
echo "== $phase end $(ts)" | tee -a "$REC/phases.log"
