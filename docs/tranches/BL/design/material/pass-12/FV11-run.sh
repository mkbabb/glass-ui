#!/usr/bin/env bash
# FV11-run.sh · D3 pass 12, floor v11 (REGISTRY P11-6.3 step 3, the build and static half): every command this seat ran,
# by phase. floor v11 = pass-12/floor-v11a.patch (08c13d4e, OWED.md) + R-32 in the dark arm only (FV11-r32.diff:
# dark-arm.css's --glass-focus-veil-dim and the veil's one filter chain in focus-veil.css). No browser battery here
# (the next seat runs it). Base: HEAD of master at launch; release/10.1.1 is NOT merged during pass 12 (P11-5).
# One worktree (.claude/worktrees/bl/D3/p12/floor11/wt) cut at HEAD, node_modules symlinked; floor v11 applied by
# default; a phase that needs floor v11a or HEAD swaps and swaps back, each swap cmp-checked. Builds and caches live in
# $W/.d3out and $W/.cache-fv11. Records land in pass-12/FV11-records/.
#   bash FV11-run.sh setup|patch|check|declare|static|rekey|sweep|nbhd|same|hashnames|toolchain|plant|reds|teardown
# (order run: setup, patch, check, declare, static, sweep, nbhd; patch..nbhd again after the seat's own false lines were
# rewritten; rekey, sweep, same, hashnames (by hand), toolchain, plant, teardown. `reds` was never needed.)
# Each phase is launched as `~/.claude/guard/guarded [--light] [--timeout N] -- bash FV11-run.sh <phase>`. Static
# phases run --light; `same` and `toolchain` run heavy (vitest's slider test launches its own headless shell).
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p12/floor11
W=$B/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
P11=$M/pass-11
P12=$M/pass-12
REC=$P12/FV11-records
FV10=$P11/floor-v10.patch
FV11A=$P12/floor-v11a.patch
FV11=$P12/floor-v11.patch
R32=$P12/FV11-r32.diff
EXACT=$M/pass-9/H9-exact-floor.json
D10=$P11/FV10-records/declare-floor-v10.json
export D3_OUT=$W/.d3out
mkdir -p "$REC"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
is() { git -C "$W" diff HEAD --binary | cmp -s - "$1" && echo "worktree = $(basename "$1")"; }
swap() { is "$1" >/dev/null && git -C "$W" apply -R "$1" 2>/dev/null && git -C "$W" apply "$2" 2>/dev/null; is "$2" || exit 3; }
clean() { test -z "$(git -C "$W" status --porcelain -- src demo tests docs/canon DESIGN.md)"; }
to_head() { is "$1" >/dev/null && git -C "$W" apply -R "$1" 2>/dev/null && clean && echo "worktree = HEAD" || exit 3; }
from_head() { clean && git -C "$W" apply "$1" 2>/dev/null; is "$1" || exit 3; }
radii() { grep -E -- '--glass-blur-(wash|quiet|resting|floating|overlay)-radius:' "$W/src/styles/tokens/glass.css" | sed 's/^ *//'; }
copyout() { rm -rf "$B/trees/$1"; mkdir -p "$B/trees/$1/docs" && cp -R "$W/src" "$W/demo" "$W/tests" "$B/trees/$1/" && cp -R "$W/docs/canon" "$B/trees/$1/docs/" && cp "$W"/*.md "$B/trees/$1/"; }
phase=$1; shift
echo "== $phase start $(ts)" | tee -a "$REC/phases.log"
case $phase in
setup)
  mkdir -p "$B"; git -C "$R" worktree add --detach "$W" HEAD && ln -s "$R/node_modules" "$W/node_modules"
  { echo "worktree HEAD $(git -C "$W" rev-parse --short=9 HEAD) (master at launch; release/10.1.1 not merged, P11-5)"
    echo "10.1.0 source diff 1da7eb17b..HEAD (empty = none): [$(git -C "$W" diff --stat 1da7eb17b HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon | tail -1)]"
    git -C "$W" apply --check "$FV11A"; echo "git apply --check floor-v11a.patch at HEAD: exit $?"
    echo "floor-v11a.patch: sha1 $(shasum "$FV11A" | cut -c1-8), $(grep -c '^diff --git' "$FV11A") files"
    from_head "$FV11A"
  } 2>&1 | tee "$REC/setup.log"
  ;;
patch)
  # The worktree holds floor v11a plus R-32's hunks, written by hand in four files (FLOOR-V11.md §1). Cut floor v11 as
  # the worktree's binary diff, cut the delta over floor v11a as FV11-r32.diff, and prove floor v11a + delta = floor v11.
  git -C "$W" diff HEAD --binary > "$FV11"
  FILES=$(git -C "$W" diff --name-only HEAD | while read -r f; do git apply --numstat "$FV11A" | cut -f3 | grep -qx "$f" || echo "NEW $f"; done)
  D=$B/r32; rm -rf "$D"; mkdir -p "$D/a" "$D/b"
  T="src/styles/glass/focus-veil.css src/styles/tokens/glass.css src/styles/tokens/dark-arm.css tests/styles/focus-veil.test.ts"
  for f in $T; do mkdir -p "$D/b/$(dirname "$f")"; cp "$W/$f" "$D/b/$f"; done
  git -C "$W" apply -R "$FV11" && clean && git -C "$W" apply "$FV11A" && is "$FV11A" || exit 3
  for f in $T; do mkdir -p "$D/a/$(dirname "$f")"; cp "$W/$f" "$D/a/$f"; done
  (cd "$D" && git diff --no-index a b) | sed -e 's#^diff --git a/a/#diff --git a/#' -e 's# b/b/# b/#' -e 's#^--- a/a/#--- a/#' -e 's#^+++ b/b/#+++ b/#' > "$R32"
  { git -C "$W" apply "$R32" && git -C "$W" diff HEAD --binary | cmp - "$FV11" && echo "floor-v11a.patch + FV11-r32.diff = floor-v11.patch (cmp)"
    is "$FV11" || exit 3
    echo "files new to the patch relative to floor v11a: [$FILES]"
    echo "FV11-r32.diff: $(grep -c '^diff --git' "$R32") files, +$(grep -c '^+[^+]' "$R32")/-$(grep -c '^-[^-]' "$R32"), sha1 $(shasum "$R32" | cut -c1-8)"
    echo "floor-v11.patch: $(grep -c '^diff --git' "$FV11") files, sha1 $(shasum "$FV11" | cut -c1-8); git diff --shortstat: $(git -C "$W" diff HEAD --shortstat)"
    echo "floor-v11a.patch: $(grep -c '^diff --git' "$FV11A") files"
  } 2>&1 | tee "$REC/patch.log"
  ;;
check)
  to_head "$FV11"; git -C "$W" apply --check "$FV11"; echo "git apply --check floor-v11.patch at $(git -C "$W" rev-parse --short=9 HEAD) (worktree) exit $?" | tee "$REC/check.log"
  git -C "$W" apply --check "$FV11A" && git -C "$W" apply "$FV11A" && git -C "$W" apply --check "$R32"; echo "git apply --check FV11-r32.diff on floor v11a exit $?" | tee -a "$REC/check.log"
  git -C "$W" apply -R "$FV11A" && clean || exit 3
  from_head "$FV11"
  git -C "$R" apply --check "$FV11"; echo "git apply --check floor-v11.patch at $(git -C "$R" rev-parse --short=9 HEAD) (checkout, read only) exit $?" | tee -a "$REC/check.log"
  echo "10.1.0 source diff 1da7eb17b..HEAD (empty = none): [$(git -C "$R" diff --stat 1da7eb17b HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon | tail -1)]" | tee -a "$REC/check.log"
  ;;
declare)
  # H8-2's declaration with H9-1's homonyms, built from floor-v11.patch on floor v11; compared with floor v10's banked one.
  is "$FV11" || exit 3
  cd "$H"
  node declare-removed.mjs --patch "$FV11" --root "$W" --concepts deletes-floor.json --exact "$EXACT" --out "$REC/declare-floor-v11.json" 2>&1 | tee "$REC/declare-floor-v11.log"
  python3 -I -c 'import json,sys; a=json.load(open(sys.argv[1])); c=json.load(open(sys.argv[2])); [x.pop("patch",None) for x in (a,c)]; print("declaration floor-v11.patch on floor v11 vs pass-11 banked declare-floor-v10.json (patch label aside):", "IDENTICAL" if a==c else "DIFFER: "+",".join(k for k in sorted(set(a)|set(c)) if a.get(k)!=c.get(k)))' "$REC/declare-floor-v11.json" "$D10" | tee -a "$REC/declare-floor-v11.log"
  ;;
static)
  # DEL under H8..H11 (floor v11; floor v11a beside it; absent root; HEAD bite), LAW, HOV, LIT, the census (bite: HEAD),
  # the ladder diff (floor v11a to floor v11; bite HEAD).
  is "$FV11" || exit 3
  cd "$H"; mkdir -p "$B/absent"
  { for d in "$REC/declare-floor-v11.json:fv11" "$D10:fv10decl"; do f=${d%%:*}; n=${d##*:}
      node deleted-mechanisms.mjs --root "$W" --declare "$f" --patch "$FV11" > "$REC/del-fv11-$n.log" 2>&1; echo "DEL fv11 ($n declaration, floor-v11.patch) exit $?: $(tail -1 "$REC/del-fv11-$n.log")"; done
    node deleted-mechanisms.mjs --root "$B/absent" --declare "$REC/declare-floor-v11.json" --patch "$FV11" > "$REC/del-absent.log" 2>&1; echo "DEL absent exit $?: $(tail -1 "$REC/del-absent.log")"
    node launch-law.mjs > "$REC/law.log" 2>&1; echo "LAW exit $?: $(tail -1 "$REC/law.log")"
    node hover-fill-selected.mjs --root "$W" > "$REC/HOV-fv11.log" 2>&1; echo "HOV exit $?: $(tail -1 "$REC/HOV-fv11.log")"
    node lighting-literals.mjs --root "$W" > "$REC/LIT-static-fv11.log" 2>&1; echo "LIT exit $?: $(grep -o 'LIGHTING-LITERALS.*' "$REC/LIT-static-fv11.log" | tail -1)"
    node "$M/pass-4/lighting-census.mjs" "$W" > "$REC/census-fv11.log" 2>&1; echo "census fv11 exit $?: $(tail -1 "$REC/census-fv11.log")"
    radii > "$REC/radii-fv11.txt"
    swap "$FV11" "$FV11A"
    node deleted-mechanisms.mjs --root "$W" --declare "$REC/declare-floor-v11.json" --patch "$FV11" > "$REC/del-fv11a-under-fv11.log" 2>&1; echo "DEL fv11a under the floor v11 declaration and patch exit $?: $(tail -1 "$REC/del-fv11a-under-fv11.log")"
    node lighting-literals.mjs --root "$W" > "$REC/LIT-static-fv11a.log" 2>&1; echo "LIT fv11a exit $?: $(grep -o 'LIGHTING-LITERALS.*' "$REC/LIT-static-fv11a.log" | tail -1)"
    node "$M/pass-4/lighting-census.mjs" "$W" > "$REC/census-fv11a.log" 2>&1; echo "census fv11a exit $?: $(tail -1 "$REC/census-fv11a.log")"
    radii > "$REC/radii-fv11a.txt"
    to_head "$FV11A"; radii > "$REC/radii-head.txt"
    node "$M/pass-4/lighting-census.mjs" "$W" > "$REC/census-head.log" 2>&1; echo "census HEAD (10.1.0 source) exit $?: $(tail -1 "$REC/census-head.log")"
    node deleted-mechanisms.mjs --root "$W" --declare "$REC/declare-floor-v11.json" --patch "$FV11" > "$REC/del-head.log" 2>&1; echo "DEL HEAD (bite) exit $?: $(tail -1 "$REC/del-head.log")"
    from_head "$FV11"
    echo "-- LADDER diff radii-fv11a radii-fv11 (prints nothing: the arm moves no radius)"; diff "$REC/radii-fv11a.txt" "$REC/radii-fv11.txt"; echo "LADDER fv11a-fv11 exit $?"
    echo "-- LADDER diff radii-head radii-fv11 (bite)"; diff "$REC/radii-head.txt" "$REC/radii-fv11.txt"; echo "LADDER head exit $?"
  } 2>&1 | tee "$REC/static.log"
  ;;
rekey)
  # FV11-rulings.json: the carried 207 re-keyed where R-32's hunks moved a line (FV11-rekey.py measures each move).
  is "$FV11" || exit 3
  T="src/styles/glass/focus-veil.css src/styles/tokens/glass.css src/styles/tokens/dark-arm.css tests/styles/focus-veil.test.ts"
  rm -rf "$B/v11a"; swap "$FV11" "$FV11A"; for f in $T; do mkdir -p "$B/v11a/$(dirname "$f")"; cp "$W/$f" "$B/v11a/$f"; done; swap "$FV11A" "$FV11"
  python3 -I "$P12/FV11-rekey.py" "$W" "$B/v11a" 2>&1 | tee "$REC/rekey.log"
  ;;
sweep)
  # R-21 (b) under R-34: floor v11's list (LIST); floor v11 under the carried crit-fv10-rulings.json (the unread and stale
  # lines are this build's own scope); floor v11 under FV11-rulings.json (the carried 207 + this seat's rulings on its
  # own lines); floor v11a under FV11-rulings.json (plant: R-32's new lines go stale or the rewritten ones unread).
  is "$FV11" || exit 3
  cd "$H"
  sw() { node prose-sweep.mjs --root "$W" --patch "$FV11" --declare "$REC/declare-floor-v11.json" ${1:+--rulings "$1"} > "$REC/sweep-$2.log" 2>&1; echo "SWEEP $2 exit $?: $(tail -1 "$REC/sweep-$2.log")"; }
  { sw "" fv11-list
    sw "$P11/crit-fv10-rulings.json" fv11-under-crit-fv10
    test -f "$P12/FV11-rulings.json" && sw "$P12/FV11-rulings.json" fv11-ruled
    swap "$FV11" "$FV11A"
    test -f "$P12/FV11-rulings.json" && sw "$P12/FV11-rulings.json" fv11a-plant
    swap "$FV11A" "$FV11"
  } 2>&1 | tee "$REC/sweep.log"
  ;;
same)
  # The light-byte proof's inputs (R-22's one-label, one-session build): floor v11a and floor v11, each built under the
  # label "same" and moved aside, then floor v11 rebuilt (determinism). The specimen CSS of each is what FV11-lightproof.py
  # reads; the dist / dist-demo diffs list every output file R-32 moved.
  O=$D3_OUT/builds; S=$D3_OUT/same; rm -rf "$S"; mkdir -p "$S"
  bld() { rm -rf "$O/same"; node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; rm -rf "$S/$1"; mv "$O/same" "$S/$1"; echo "$1 built $(ts)"; }
  { swap "$FV11" "$FV11A"; bld fv11a
    swap "$FV11A" "$FV11"; bld fv11; bld fv11b
    for n in fv11a fv11 fv11b; do for k in dist demo; do (cd "$S/$n/$k" && find . -type f ! -name build.json | sort | xargs shasum -a 256) > "$REC/same-$n-$k.sha256"; done
      for c in "$S/$n/dist"/assets/*.css; do echo "$n specimen css $(basename "$c") $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -c1-16)"; done
      echo "$n dist-demo files: $(wc -l < "$REC/same-$n-demo.sha256" | tr -d ' ')"; done
    for k in dist demo; do diff -rq -x build.json "$S/fv11/$k" "$S/fv11b/$k" > /dev/null; echo "$k fv11 vs fv11 rebuilt: diff -rq exit $?"
      diff -rq -x build.json "$S/fv11a/$k" "$S/fv11/$k" > "$REC/same-$k-fv11a-fv11.txt"; echo "$k fv11a vs fv11: diff -rq exit $?, $(wc -l < "$REC/same-$k-fv11a-fv11.txt" | tr -d ' ') files differ"; done
    echo "-- R-27 tie: floor v11a's specimen CSS against OWED's banked 347288745da7cf97"; grep -E '\.css$' "$REC/same-fv11a-dist.sha256"
    diff "$P12/OWED-records/same-fv11a-demo.sha256" "$REC/same-fv11a-demo.sha256" > /dev/null; echo "banked fv11a dist-demo sha256 list (OWED) vs this session's fv11a: diff exit $?"
    mkdir -p "$REC/css"; cp "$S/fv11a/dist"/assets/*.css "$REC/css/fv11a.css"; cp "$S/fv11/dist"/assets/*.css "$REC/css/fv11.css"
    python3 -I "$P12/FV11-lightproof.py" "$REC/css/fv11a.css" "$REC/css/fv11.css" > "$REC/lightproof.log" 2>&1; echo "LIGHTPROOF exit $?: $(tail -1 "$REC/lightproof.log")"
  } 2>&1 | tee "$REC/same.log"
  ;;
toolchain)
  # Floor v11: typecheck, library build, test typecheck, dist-demo (built before vitest), vitest --maxWorkers=2.
  is "$FV11" || exit 3
  cd "$W"
  printf 'import base from "./vite.config";\nexport default { ...(base as object), cacheDir: ".cache-fv11/vite" };\n' > vite.fv11.config.ts
  printf 'import base from "./vitest.config";\nexport default { ...(base as object), cacheDir: ".cache-fv11/vitest" };\n' > vitest.fv11.config.ts
  printf 'import base from "./demo/vite.demo-dist.config";\nexport default { ...(base as object), cacheDir: ".cache-fv11/vite-demo" };\n' > vite.fv11demo.config.ts
  { npx vue-tsc --noEmit > "$REC/tsc-app.log" 2>&1; echo "typecheck app exit $? $(ts)"
    npx vite build --config vite.fv11.config.ts > "$REC/libbuild.log" 2>&1; echo "library build exit $? $(ts)"
    npx vue-tsc --noEmit -p tsconfig.test.json > "$REC/tsc-test.log" 2>&1; echo "typecheck tests exit $? $(ts)"
    npx vite build --config vite.fv11demo.config.ts > "$REC/demobuild.log" 2>&1; echo "dist-demo exit $? $(ts)"
    npx vitest run --config vitest.fv11.config.ts --maxWorkers=2 > "$REC/units.log" 2>&1; echo "vitest exit $? $(ts)"
    grep -E "Test Files|Tests  " "$REC/units.log"
    npx vitest run --config vitest.fv11.config.ts --maxWorkers=2 tests/styles/focus-veil.test.ts > "$REC/units-focus-veil.log" 2>&1; echo "vitest focus-veil.test.ts exit $? $(ts)"; grep -E "Test Files|Tests  " "$REC/units-focus-veil.log"
  } 2>&1 | tee "$REC/toolchain.log"
  rm -f vite.fv11.config.ts vitest.fv11.config.ts vite.fv11demo.config.ts
  ;;
hashnames)
  # Run by hand at 20:41-20:42 (after `same`, before teardown), recorded here as run: every dist and dist-demo file of
  # floor v11a and floor v11 with its content-hash suffix normalised in its name and in every reference inside JS, CSS
  # and HTML, paired by content. The lightproof re-run that follows is the fixed FV11-lightproof.py (source order and
  # the colour @supports block; the first run's resolver skipped that block and is superseded).
  S=$D3_OUT/same
  python3 -I - "$S" <<'PY' | tee "$REC/hashnames.log"
import sys, os, re, hashlib, collections
S = sys.argv[1]
def norm(root):
    out = collections.Counter()
    for d, _, fs in os.walk(root):
        for f in fs:
            if f == "build.json": continue
            p = os.path.join(d, f); b = open(p, "rb").read()
            if f.endswith((".js", ".css", ".html")): b = re.sub(rb"-[A-Za-z0-9_-]{8}\.(js|css)", rb"-H.\1", b)
            out[(re.sub(r"-[A-Za-z0-9_-]{8}\.", "-H.", os.path.relpath(p, root)), hashlib.sha256(b).hexdigest())] += 1
    return out
for k in ("dist", "demo"):
    a, b = norm(f"{S}/fv11a/{k}"), norm(f"{S}/fv11/{k}")
    only_a, only_b = a - b, b - a
    print(f"{k}: {sum(a.values())} vs {sum(b.values())} files; after hash-name normalisation, content differs in {sum(only_a.values())} (floor v11a side) / {sum(only_b.values())} (floor v11 side): {sorted(n for n, _ in only_b)}")
PY
  python3 -I "$P12/FV11-lightproof.py" "$REC/css/fv11a.css" "$REC/css/fv11.css" > "$REC/lightproof.log" 2>&1; echo "LIGHTPROOF exit $?: $(tail -1 "$REC/lightproof.log")"
  ;;
plant)
  # The rewritten test bites: floor v11's tests/styles/focus-veil.test.ts run on floor v11a's bytes (R-2) must FAIL on
  # the arm's assertions and nothing else. One jsdom unit file, no browser (--light).
  is "$FV11" || exit 3; cd "$W"
  cp tests/styles/focus-veil.test.ts "$B/focus-veil.test.v11.ts"; swap "$FV11" "$FV11A"
  cp tests/styles/focus-veil.test.ts "$B/focus-veil.test.v11a.ts"; cp "$B/focus-veil.test.v11.ts" tests/styles/focus-veil.test.ts
  printf 'import base from "./vitest.config";\nexport default { ...(base as object), cacheDir: ".cache-fv11/vitest" };\n' > vitest.fv11.config.ts
  { npx vitest run --config vitest.fv11.config.ts --maxWorkers=2 tests/styles/focus-veil.test.ts > "$REC/plant-focus-veil-on-fv11a.log" 2>&1; echo "plant: floor v11's focus-veil.test.ts on floor v11a exit $? $(ts)"
    grep -E "Test Files|Tests  |✗|×|FAIL" "$REC/plant-focus-veil-on-fv11a.log" | head -8; } 2>&1 | tee "$REC/plant.log"
  rm -f vitest.fv11.config.ts; cp "$B/focus-veil.test.v11a.ts" tests/styles/focus-veil.test.ts; swap "$FV11A" "$FV11" | tee -a "$REC/plant.log"
  ;;
reds)
  # A red file from `toolchain`, re-run alone on floor v11: bash FV11-run.sh reds <run> <test file>...
  run=$1; shift; is "$FV11" || exit 3; cd "$W"
  printf 'import base from "./vitest.config";\nexport default { ...(base as object), cacheDir: ".cache-fv11/vitest" };\n' > vitest.fv11.config.ts
  { npx vitest run --config vitest.fv11.config.ts --maxWorkers=2 "$@" > "$REC/reds-$run.log" 2>&1; echo "reds $run exit $? $(ts)"; grep -E "Test Files|Tests  " "$REC/reds-$run.log"; } 2>&1 | tee -a "$REC/reds.log"
  rm -f vitest.fv11.config.ts
  ;;
teardown)
  { git -C "$R" worktree remove --force "$W"; git -C "$R" worktree prune; rm -rf "$B"
    rmdir "$R/.claude/worktrees/bl/D3/p12" 2>/dev/null
    echo "worktrees naming D3/p12/floor11: $(git -C "$R" worktree list | grep -c 'D3/p12/floor11')"; ls "$R/.claude/worktrees/bl/D3/" 2>&1
  } 2>&1 | tee "$REC/teardown.log"
  ;;
nbhd)
  # H11-2's print (R-34's neighbourhood, R-36's reading aid, ungated) over floor v11 with FV11-r32.diff (the tokens this
  # build re-values) and with floor-v11.patch; the lines it reaches are read in FLOOR-V11.md §4.
  is "$FV11" || exit 3
  cd "$H"
  { node neighbourhood.mjs --root "$W" --patch "$R32" > "$REC/neighbourhood-r32.log" 2>&1; echo "NEIGHBOURHOOD fv11 (FV11-r32.diff) exit $?: $(tail -1 "$REC/neighbourhood-r32.log")"
    node neighbourhood.mjs --root "$W" --patch "$FV11" > "$REC/neighbourhood-fv11.log" 2>&1; echo "NEIGHBOURHOOD fv11 (floor-v11.patch) exit $?: $(tail -1 "$REC/neighbourhood-fv11.log")"
  } 2>&1 | tee "$REC/nbhd.log"
  ;;
esac
echo "== $phase end $(ts)" | tee -a "$REC/phases.log"
