#!/usr/bin/env bash
# FV9-run.sh · D3 pass 10, floor v9 (REGISTRY P9-6.2 step 2): every command this seat ran, by phase.
# floor v9 = pass-9/floor-v8.patch + R-24 (i)-(iii) (FV9-r24-edits.py: surfaces-pager.css, a11y-fallback.css,
# dock/styles/dock.css; CSS comments only), written whole as pass-10/floor-v9.patch.
# No owner ruling has arrived (INBOUND ends at O-98), so no variant is selected.
# One worktree (.claude/worktrees/bl/D3/p10/floor9/wt), floor v9 applied by default; a phase that needs floor v8 or HEAD
# swaps the patch and swaps it back, each swap checked with cmp (or a clean git status at HEAD).
# Builds and caches live in $W/.d3out and $W/.cache-fv9. Records land in pass-10/FV9-records/.
#   bash FV9-run.sh patch|check|declare|static|del-h9decl|sweep|same|bite|toolchain|wk-dlg|dlg-read|teardown
# Each phase is launched as `~/.claude/guard/guarded [--light] --timeout N -- bash FV9-run.sh <phase>` (the guard is the
# literal command word). Only wk-dlg launches a browser, under `guarded --exclusive webkit --timeout 60`.
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p10/floor9
W=$B/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
P9=$M/pass-9
P10=$M/pass-10
REC=$P10/FV9-records
FV8=$P9/floor-v8.patch
FV9=$P10/floor-v9.patch
EXACT=$P9/H9-exact-floor.json
export D3_OUT=$W/.d3out
mkdir -p "$REC"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
is() { git -C "$W" diff HEAD --binary | cmp -s - "$1" && echo "worktree = $(basename "$1")"; }
swap() { is "$1" >/dev/null && git -C "$W" apply -R "$1" 2>/dev/null && git -C "$W" apply "$2" 2>/dev/null; is "$2" || exit 3; }
to_head() { is "$1" >/dev/null && git -C "$W" apply -R "$1" 2>/dev/null && test -z "$(git -C "$W" status --porcelain -- src demo tests)" && echo "worktree = HEAD" || exit 3; }
from_head() { test -z "$(git -C "$W" status --porcelain -- src demo tests)" && git -C "$W" apply "$1" 2>/dev/null; is "$1" || exit 3; }
radii() { grep -E -- '--glass-blur-(wash|quiet|resting|floating|overlay)-radius:' "$W/src/styles/tokens/glass.css" | sed 's/^ *//'; }
FILES="src/styles/glass/surfaces-pager.css src/styles/glass/a11y-fallback.css src/components/dock/styles/dock.css"
phase=$1; shift
echo "== $phase start $(ts)" | tee -a "$REC/phases.log"
case $phase in
patch)
  # The worktree holds floor v8 (cmp-checked at setup). Write R-24, then floor-v9.patch and the R-24 delta, and check
  # floor v8 + delta = floor v9 byte for byte.
  is "$FV8" || exit 3
  python3 -I "$P10/FV9-r24-edits.py" "$W"
  git -C "$W" diff HEAD --binary > "$FV9"
  D=$B/r24; rm -rf "$D"; mkdir -p "$D/a" "$D/b"
  for f in $FILES; do mkdir -p "$D/b/$(dirname "$f")"; cp "$W/$f" "$D/b/$f"; done
  swap "$FV9" "$FV8"; for f in $FILES; do mkdir -p "$D/a/$(dirname "$f")"; cp "$W/$f" "$D/a/$f"; done
  (cd "$D" && git diff --no-index a b) | sed -e 's#^diff --git a/a/#diff --git a/#' -e 's# b/b/# b/#' -e 's#^--- a/a/#--- a/#' -e 's#^+++ b/b/#+++ b/#' > "$P10/floor-v9-delta.diff"
  git -C "$W" apply "$P10/floor-v9-delta.diff" && git -C "$W" diff HEAD --binary | cmp - "$FV9" && echo "floor-v8.patch + floor-v9-delta.diff = floor-v9.patch (cmp)"
  is "$FV9" || exit 3
  { echo "floor-v9-delta.diff: $(grep -c '^diff --git' "$P10/floor-v9-delta.diff") files, +$(grep -c '^+[^+]' "$P10/floor-v9-delta.diff")/-$(grep -c '^-[^-]' "$P10/floor-v9-delta.diff"), sha1 $(shasum "$P10/floor-v9-delta.diff" | cut -c1-8)"
    echo "floor-v8.patch: $(grep -c '^diff --git' "$FV8") files, sha1 $(shasum "$FV8" | cut -c1-8)"
    echo "floor-v9.patch: $(grep -c '^diff --git' "$FV9") files, sha1 $(shasum "$FV9" | cut -c1-8); git diff --shortstat: $(git -C "$W" diff HEAD --shortstat)"
    diff <(git apply --numstat "$FV8" | cut -f3) <(git apply --numstat "$FV9" | cut -f3); echo "same path list as floor v8: exit $?"; } 2>&1 | tee "$REC/patch.log"
  ;;
check)
  to_head "$FV9"; git -C "$W" apply --check "$FV9"; echo "git apply --check floor-v9.patch at $(git -C "$W" rev-parse --short=9 HEAD) (worktree) exit $?" | tee "$REC/check.log"; from_head "$FV9"
  git -C "$R" apply --check "$FV9"; echo "git apply --check floor-v9.patch at $(git -C "$R" rev-parse --short=9 HEAD) (checkout, read only) exit $?" | tee -a "$REC/check.log"
  echo "10.1.0 source diff 1da7eb17b..HEAD (empty line = none): [$(git -C "$R" diff --stat 1da7eb17b HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon | tail -1)]" | tee -a "$REC/check.log"
  ;;
declare)
  # H8-2's declaration with H9-1's homonyms, built from floor-v9.patch, and from floor-v8.patch on the same tree.
  is "$FV9" || exit 3
  cd "$H"
  node declare-removed.mjs --patch "$FV9" --root "$W" --concepts deletes-floor.json --exact "$EXACT" --out "$REC/declare-floor-v9.json" 2>&1 | tee "$REC/declare-floor-v9.log"
  node declare-removed.mjs --patch "$FV8" --root "$W" --concepts deletes-floor.json --exact "$EXACT" --out "$REC/declare-floor-v8-on-fv9.json" > "$REC/declare-floor-v8-on-fv9.log" 2>&1
  python3 -I -c 'import json,sys; a=json.load(open(sys.argv[1])); b=json.load(open(sys.argv[2])); c=json.load(open(sys.argv[3])); [x.pop("patch",None) for x in (a,b,c)]; print("declaration floor-v9.patch vs floor-v8.patch (same tree, patch label aside):", "IDENTICAL" if a==b else "DIFFER"); print("declaration floor-v9.patch on floor v9 vs pass-9 banked declare-floor-v8.json (patch label aside):", "IDENTICAL" if a==c else "DIFFER")' "$REC/declare-floor-v9.json" "$REC/declare-floor-v8-on-fv9.json" "$P9/FV8-records/declare-floor-v8.json" | tee -a "$REC/declare-floor-v9.log"
  ;;
static)
  # DEL under H8, H9 and H10 (fixture floor v9; floor v8 under the same declaration and patch, read beside it; H10-1's
  # absent root), LAW, HOV, LIT, the census (bite: HEAD), the ladder diff (fixture vs floor v8; bite HEAD).
  is "$FV9" || exit 3
  cd "$H"
  { echo "-- DEL (H8+H9+H10) floor v9 (fixture)"; node deleted-mechanisms.mjs --root "$W" --declare "$REC/declare-floor-v9.json" --patch "$FV9" > "$REC/del-fv9.log" 2>&1; echo "DEL fv9 exit $?: $(grep -E '^(PASS|FAIL)' "$REC/del-fv9.log")"; grep -E 'text files|names=' "$REC/del-fv9.log" | head -3
    echo "-- DEL H10-1, absent root, floor v9's declaration"; node deleted-mechanisms.mjs --root "$B/absent" --declare "$REC/declare-floor-v9.json" --patch "$FV9" > "$REC/del-absent.log" 2>&1; echo "DEL absent exit $?: $(tail -1 "$REC/del-absent.log")"
    echo "-- LAW"; node launch-law.mjs > "$REC/law.log" 2>&1; echo "LAW exit $?: $(tail -1 "$REC/law.log")"
    node hover-fill-selected.mjs --root "$W" > "$REC/HOV-fv9.log" 2>&1; echo "HOV exit $?: $(tail -1 "$REC/HOV-fv9.log")"
    node lighting-literals.mjs --root "$W" > "$REC/LIT-static-fv9.log" 2>&1; echo "LIT exit $?: $(grep -o 'LIGHTING-LITERALS.*' "$REC/LIT-static-fv9.log" | tail -1)"
    node "$M/pass-4/lighting-census.mjs" "$W" > "$REC/census-fv9.log" 2>&1; echo "census fv9 exit $?: $(tail -1 "$REC/census-fv9.log")"
    radii > "$REC/radii-fv9.txt"
    swap "$FV9" "$FV8"
    echo "-- DEL floor v8 under the floor v9 declaration and patch"; node deleted-mechanisms.mjs --root "$W" --declare "$REC/declare-floor-v9.json" --patch "$FV9" > "$REC/del-fv8-under-fv9.log" 2>&1; echo "DEL fv8 exit $?: $(grep -E '^(PASS|FAIL)' "$REC/del-fv8-under-fv9.log")"
    radii > "$REC/radii-fv8.txt"
    to_head "$FV8"; radii > "$REC/radii-head.txt"
    node "$M/pass-4/lighting-census.mjs" "$W" > "$REC/census-head.log" 2>&1; echo "census HEAD (10.1.0 source) exit $?: $(tail -1 "$REC/census-head.log")"
    echo "-- DEL HEAD under the floor v9 declaration and patch (bite)"; node deleted-mechanisms.mjs --root "$W" --declare "$REC/declare-floor-v9.json" --patch "$FV9" > "$REC/del-head.log" 2>&1; echo "DEL HEAD exit $?: $(grep -E '^(PASS|FAIL)' "$REC/del-head.log")"
    from_head "$FV9"
    echo "-- LADDER diff radii-fv8 radii-fv9 (fixture: prints nothing)"; diff "$REC/radii-fv8.txt" "$REC/radii-fv9.txt"; echo "LADDER fv8-fv9 exit $?"
    echo "-- LADDER diff radii-head radii-fv9 (bite)"; diff "$REC/radii-head.txt" "$REC/radii-fv9.txt"; echo "LADDER head exit $?"
  } 2>&1 | tee "$REC/static.log"
  ;;
del-h9decl)
  # H9's own gated declaration (built from floor-v7.patch, 72 names) over floor v9 with floor-v7.patch, as FV8 read it.
  is "$FV9" || exit 3
  cd "$H"
  node deleted-mechanisms.mjs --root "$W" --declare "$P9/H9-records/declare-floor-v7-on-fv8.json" --patch "$M/pass-8/floor-v7.patch" > "$REC/del-H9decl-fv9.log" 2>&1; echo "DEL (H9's declaration, floor-v7.patch) fv9 exit $?: $(grep -E '^(PASS|FAIL)' "$REC/del-H9decl-fv9.log")" | tee "$REC/del-h9decl.log"
  ;;
sweep)
  # R-21 (b): the frozen list over floor v9, printed (LIST); floor v8's banked rulings over floor v9 (they must go stale at
  # R-24's lines); floor v9 against this seat's rulings (FV9-rulings.json, every entry with H10-2's verdict); floor v8
  # against the same rulings (plant).
  is "$FV9" || exit 3
  cd "$H"
  { node prose-sweep.mjs --root "$W" --patch "$FV9" --declare "$REC/declare-floor-v9.json" > "$REC/sweep-fv9.log" 2>&1; echo "SWEEP fv9 LIST exit $?: $(tail -1 "$REC/sweep-fv9.log")"
    node prose-sweep.mjs --root "$W" --patch "$FV9" --declare "$REC/declare-floor-v9.json" --rulings "$P9/FV8-rulings.json" > "$REC/sweep-fv9-under-fv8-rulings.log" 2>&1; echo "SWEEP fv9 under FV8-rulings.json exit $?: $(tail -1 "$REC/sweep-fv9-under-fv8-rulings.log")"
    if [ -f "$P10/FV9-rulings.json" ]; then
      node prose-sweep.mjs --root "$W" --patch "$FV9" --declare "$REC/declare-floor-v9.json" --rulings "$P10/FV9-rulings.json" > "$REC/sweep-fv9-ruled.log" 2>&1; echo "SWEEP fv9 ruled exit $?: $(tail -1 "$REC/sweep-fv9-ruled.log")"
      swap "$FV9" "$FV8"
      node prose-sweep.mjs --root "$W" --patch "$FV9" --declare "$REC/declare-floor-v9.json" --rulings "$P10/FV9-rulings.json" > "$REC/sweep-fv8-plant.log" 2>&1; echo "SWEEP fv8 under fv9's rulings (plant) exit $?: $(tail -1 "$REC/sweep-fv8-plant.log")"
      swap "$FV8" "$FV9"
    fi
  } 2>&1 | tee "$REC/sweep.log"
  ;;
same)
  # R-22 / R-27: floor v9, floor v8 and floor v9 again, each built under one label ("same") in this one session, each
  # output moved aside; compared raw (diff -rq, sha256 lists). The tie to pass 9's bank cites only the specimen CSS hash
  # and the dist-demo sha256 list (R-27).
  is "$FV9" || exit 3
  O=$D3_OUT/builds; S=$D3_OUT/same; rm -rf "$S"; mkdir -p "$S"
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/fv9"; echo "fv9 built as 'same' $(ts)"
  swap "$FV9" "$FV8"
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/fv8"; echo "fv8 built as 'same' $(ts)"
  swap "$FV8" "$FV9"
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/fv9b"; echo "fv9 rebuilt as 'same' (determinism) $(ts)"
  { for k in dist demo; do
      diff -rq -x build.json "$S/fv8/$k" "$S/fv9/$k" > "$REC/same-$k-fv8-fv9.txt"; echo "$k fv8 vs fv9: diff -rq exit $?, $(wc -l < "$REC/same-$k-fv8-fv9.txt" | tr -d ' ') lines"
      diff -rq -x build.json "$S/fv9/$k" "$S/fv9b/$k" > /dev/null; echo "$k fv9 vs fv9 rebuilt: diff -rq exit $?"
      (cd "$S/fv9/$k" && find . -type f ! -name build.json | sort | xargs shasum -a 256) > "$REC/same-fv9-$k.sha256"
      (cd "$S/fv8/$k" && find . -type f ! -name build.json | sort | xargs shasum -a 256) > "$REC/same-fv8-$k.sha256"
      echo "$k: fv9 $(wc -l < "$REC/same-fv9-$k.sha256" | tr -d ' ') files, fv8 $(wc -l < "$REC/same-fv8-$k.sha256" | tr -d ' ') files; sha256 lists diff: $(diff -q "$REC/same-fv8-$k.sha256" "$REC/same-fv9-$k.sha256" >/dev/null && echo identical || echo DIFFER)"
    done
    for l in fv8 fv9; do for c in "$S/$l/dist"/assets/*.css; do echo "$l specimen css $(basename "$c") $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -c1-16)"; done; done
    echo "-- R-27 tie to pass 9's bank: the specimen CSS hash and the dist-demo sha256 list only"
    grep -E '\.css$' "$P9/FV8-records/same-fv8-dist.sha256" | sed 's/^/banked fv8 specimen css: /'
    grep -E '\.css$' "$REC/same-fv9-dist.sha256" | sed 's/^/fv9 specimen css:        /'
    diff "$P9/FV8-records/same-fv8-demo.sha256" "$REC/same-fv9-demo.sha256" > "$REC/same-demo-fv8banked-fv9.txt"; echo "demo banked fv8 list vs fv9 list: diff exit $?, $(wc -l < "$REC/same-demo-fv8banked-fv9.txt" | tr -d ' ') lines"
  } 2>&1 | tee "$REC/same.log"
  ;;
bite)
  # The byte proof's bite: HEAD built the same way under the same label must differ from floor v9.
  O=$D3_OUT/builds; S=$D3_OUT/same
  to_head "$FV9"
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; rm -rf "$S/head"; mv "$O/same" "$S/head"; echo "HEAD built as 'same' $(ts)"
  from_head "$FV9"
  { for k in dist demo; do diff -rq -x build.json "$S/head/$k" "$S/fv9/$k" > "$REC/bite-$k-head-fv9.txt"; echo "bite $k HEAD vs fv9: diff -rq exit $?, $(wc -l < "$REC/bite-$k-head-fv9.txt" | tr -d ' ') lines"; done
    for c in "$S/head/dist"/assets/*.css; do echo "HEAD specimen css $(basename "$c") $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -c1-16)"; done
  } 2>&1 | tee "$REC/bite.log"
  ;;
toolchain)
  # Typecheck (src), library build, the test typecheck after it, the dist-demo (before the units: the boot-graph rows
  # read it), vitest --maxWorkers=2.
  is "$FV9" || exit 3
  cd "$W"
  printf 'import base from "./vite.config";\nexport default { ...(base as object), cacheDir: ".cache-fv9/vite" };\n' > vite.fv9.config.ts
  printf 'import base from "./vitest.config";\nexport default { ...(base as object), cacheDir: ".cache-fv9/vitest" };\n' > vitest.fv9.config.ts
  printf 'import base from "./demo/vite.demo-dist.config";\nexport default { ...(base as object), cacheDir: ".cache-fv9/vite-demo" };\n' > vite.fv9demo.config.ts
  { npx vue-tsc --noEmit > "$REC/tsc-app.log" 2>&1; echo "typecheck app exit $? $(ts)"
    npx vite build --config vite.fv9.config.ts > "$REC/libbuild.log" 2>&1; echo "library build exit $? $(ts)"
    npx vue-tsc --noEmit -p tsconfig.test.json > "$REC/tsc-test.log" 2>&1; echo "typecheck tests exit $? $(ts)"
    npx vite build --config vite.fv9demo.config.ts > "$REC/demobuild.log" 2>&1; echo "dist-demo exit $? $(ts)"
    npx vitest run --config vitest.fv9.config.ts --maxWorkers=2 --testTimeout 240000 > "$REC/units.log" 2>&1; echo "vitest exit $? $(ts)"
    grep -E "Test Files|Tests  " "$REC/units.log"
  } 2>&1 | tee "$REC/toolchain.log"
  rm -f vite.fv9.config.ts vitest.fv9.config.ts vite.fv9demo.config.ts
  ;;
wk-dlg)
  # P9-5's one informational WebKit cell: floor v9's specimen (the `same` build), dialog scene, both themes, Playwright
  # WebKit, one browser for the run (capture.mjs closes it in its finally, fresh context per cell). Run as its own
  # `guarded --exclusive webkit --timeout 60` admission.
  node "$H/capture.mjs" "$D3_OUT/same/fv9/dist" --out "$D3_OUT/caps/fv9-dlg-webkit" --engines webkit --themes light,dark --scenes dialog > "$REC/cap-fv9-dlg-webkit.log" 2>&1
  echo "capture fv9 dialog webkit exit $? $(ts)" | tee -a "$REC/phases.log"
  grep -h "retired\|STALL\|captured\|crash" "$REC/cap-fv9-dlg-webkit.log" | tail -3
  ;;
dlg-read)
  # The witnesses, --light outside the lock: M-3 (variant base, H9-4) and the pass-7 critic's ring reader, compared
  # line for line with the owed-WebKit seat's floor v7 records (pass-8/WK-records; floor v7 = floor v8 = floor v9 bytes).
  C=$D3_OUT/caps/fv9-dlg-webkit
  node "$H/m3-non-text.mjs" "$C" --gate webkit --verbose --cells "dialog$" > "$REC/m3-fv9-dlg-webkit.txt" 2>&1; echo "M-3 fv9 dialog webkit exit $?: $(tail -1 "$REC/m3-fv9-dlg-webkit.txt")" | tee "$REC/dlg-read.log"
  grep -E "dialog·ring:close" "$REC/m3-fv9-dlg-webkit.txt" | sort | uniq -c | tee -a "$REC/dlg-read.log"
  node "$M/pass-7/crit-ringpx.mjs" "$C" --engine webkit > "$REC/ringpx-fv9-dlg-webkit.log" 2>&1; echo "ringpx exit $?" | tee -a "$REC/dlg-read.log"
  grep -E "^RING webkit (light|dark) (paper|black)" "$REC/ringpx-fv9-dlg-webkit.log" | tee -a "$REC/dlg-read.log"
  diff <(grep -E "dialog·ring:close" "$REC/m3-fv9-dlg-webkit.txt") <(grep -E "dialog·ring:close" "$M/pass-8/WK-records/verbose/m3-fv7-dlg-webkit.txt") > "$REC/dlg-m3-vs-wk.diff"; echo "Close-ring rows, fv9 vs WK seat's fv7: diff exit $?" | tee -a "$REC/dlg-read.log"
  diff <(grep -E "^RING" "$REC/ringpx-fv9-dlg-webkit.log") <(grep -E "^RING" "$M/pass-8/WK-records/ringpx-fv7-dlg-webkit.log") > "$REC/dlg-ringpx-vs-wk.diff"; echo "ringpx RING rows, fv9 vs WK seat's fv7: diff exit $?" | tee -a "$REC/dlg-read.log"
  ;;
teardown)
  git -C "$R" worktree remove --force "$W"; git -C "$R" worktree prune; rm -rf "$B"; rmdir "$R/.claude/worktrees/bl/D3/p10" 2>/dev/null; ls "$R/.claude/worktrees/bl/D3/" 2>&1; echo "p10 worktrees listed: $(git -C "$R" worktree list | grep -c 'D3/p10')"; true
  ;;
esac
echo "== $phase end $(ts)" | tee -a "$REC/phases.log"
