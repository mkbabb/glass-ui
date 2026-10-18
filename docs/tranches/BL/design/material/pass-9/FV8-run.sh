#!/usr/bin/env bash
# FV8-run.sh · D3 pass 9, floor v8 (REGISTRY P8-6.2 steps 2 and 4): every command this seat ran, by phase.
# floor v8 = pass-8/floor-v7.patch + R-20 (i)-(iv) (FV8-r20-edits.py: surfaces-pager.css, GlassDock.vue,
# dock/styles/index.css, glass-deep.css; comments only), written whole as pass-9/floor-v8.patch.
# No owner ruling has arrived (INBOUND ends at O-98), so no variant is selected.
# One worktree (.claude/worktrees/bl/D3/p9/floor8/wt), floor v8 applied by default; a phase that needs floor v7 or HEAD
# swaps the patch and swaps it back, each swap checked with cmp (or a clean git status at HEAD).
# Builds and caches live in $W/.d3out and $W/.cache-fv8. Records land in pass-9/FV8-records/.
#   bash FV8-run.sh patch|check|declare|static|sweep|same|bite|toolchain|wk-dlg|dlg-read|teardown
# Each phase is launched as `~/.claude/guard/guarded [--light] --timeout N -- bash FV8-run.sh <phase>` (the guard is the
# literal command word). Only wk-dlg launches a browser, under `guarded --exclusive webkit --timeout 60`.
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p9/floor8
W=$B/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
P9=$M/pass-9
REC=$P9/FV8-records
FV7=$M/pass-8/floor-v7.patch
FV8=$P9/floor-v8.patch
EXACT=$P9/H9-exact-floor.json
export D3_OUT=$W/.d3out
mkdir -p "$REC"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
is() { git -C "$W" diff HEAD --binary | cmp -s - "$1" && echo "worktree = $(basename "$1")"; }
swap() { is "$1" >/dev/null && git -C "$W" apply -R "$1" 2>/dev/null && git -C "$W" apply "$2" 2>/dev/null; is "$2" || exit 3; }
to_head() { is "$1" >/dev/null && git -C "$W" apply -R "$1" 2>/dev/null && test -z "$(git -C "$W" status --porcelain -- src demo tests)" && echo "worktree = HEAD" || exit 3; }
from_head() { test -z "$(git -C "$W" status --porcelain -- src demo tests)" && git -C "$W" apply "$1" 2>/dev/null; is "$1" || exit 3; }
radii() { grep -E -- '--glass-blur-(wash|quiet|resting|floating|overlay)-radius:' "$W/src/styles/tokens/glass.css" | sed 's/^ *//'; }
FILES="src/styles/glass/surfaces-pager.css src/components/dock/GlassDock.vue src/components/dock/styles/index.css src/styles/tokens/glass-deep.css src/components/_shared/feedback/feedback-tone.css src/styles/glass/a11y-fallback.css src/styles/tokens/glass-fx.css"
phase=$1; shift
echo "== $phase start $(ts)" | tee -a "$REC/phases.log"
case $phase in
patch)
  # The worktree holds floor v7 (cmp-checked at setup). Write R-20, then floor-v8.patch and the R-20 delta, and check
  # floor v7 + delta = floor v8 byte for byte.
  is "$FV7" || exit 3
  python3 -I "$P9/FV8-r20-edits.py" "$W"
  git -C "$W" diff HEAD --binary > "$FV8"
  D=$B/r20; rm -rf "$D"; mkdir -p "$D/a" "$D/b"
  for f in $FILES; do mkdir -p "$D/b/$(dirname "$f")"; cp "$W/$f" "$D/b/$f"; done
  swap "$FV8" "$FV7"; for f in $FILES; do mkdir -p "$D/a/$(dirname "$f")"; cp "$W/$f" "$D/a/$f"; done
  (cd "$D" && git diff --no-index a b) | sed -e 's#^diff --git a/a/#diff --git a/#' -e 's# b/b/# b/#' -e 's#^--- a/a/#--- a/#' -e 's#^+++ b/b/#+++ b/#' > "$P9/floor-v8-delta.diff"
  git -C "$W" apply "$P9/floor-v8-delta.diff" && git -C "$W" diff HEAD --binary | cmp - "$FV8" && echo "floor-v7.patch + floor-v8-delta.diff = floor-v8.patch (cmp)"
  is "$FV8" || exit 3
  { echo "floor-v8-delta.diff: $(grep -c '^diff --git' "$P9/floor-v8-delta.diff") files, +$(grep -c '^+[^+]' "$P9/floor-v8-delta.diff")/-$(grep -c '^-[^-]' "$P9/floor-v8-delta.diff")"
    echo "floor-v7.patch: $(grep -c '^diff --git' "$FV7") files, sha1 $(shasum "$FV7" | cut -c1-8)"
    echo "floor-v8.patch: $(grep -c '^diff --git' "$FV8") files, sha1 $(shasum "$FV8" | cut -c1-8); git diff --shortstat: $(git -C "$W" diff HEAD --shortstat)"
    diff <(git apply --numstat "$FV7" | cut -f3) <(git apply --numstat "$FV8" | cut -f3); echo "same path list as floor v7: exit $?"; } 2>&1 | tee "$REC/patch.log"
  ;;
check)
  to_head "$FV8"; git -C "$W" apply --check "$FV8"; echo "git apply --check floor-v8.patch at $(git -C "$W" rev-parse --short=9 HEAD) (worktree) exit $?" | tee "$REC/check.log"; from_head "$FV8"
  git -C "$R" apply --check "$FV8"; echo "git apply --check floor-v8.patch at $(git -C "$R" rev-parse --short=9 HEAD) (checkout, read only) exit $?" | tee -a "$REC/check.log"
  git -C "$R" diff --stat 1da7eb17b HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon | tail -1; echo "10.1.0 source diff to HEAD (empty = none) exit $?" | tee -a "$REC/check.log"
  ;;
declare)
  # H8-2's declaration with H9-1's homonyms, built from floor-v8.patch (H9 §8), and from floor-v7.patch on the same tree.
  is "$FV8" || exit 3
  cd "$H"
  node declare-removed.mjs --patch "$FV8" --root "$W" --concepts deletes-floor.json --exact "$EXACT" --out "$REC/declare-floor-v8.json" 2>&1 | tee "$REC/declare-floor-v8.log"
  node declare-removed.mjs --patch "$FV7" --root "$W" --concepts deletes-floor.json --exact "$EXACT" --out "$REC/declare-floor-v7-on-fv8.json" > "$REC/declare-floor-v7-on-fv8.log" 2>&1
  python3 -I -c 'import json,sys; a=json.load(open(sys.argv[1])); b=json.load(open(sys.argv[2])); a.pop("patch",None); b.pop("patch",None); print("declaration floor-v8.patch vs floor-v7.patch (same tree, patch label aside):", "IDENTICAL" if a==b else "DIFFER")' "$REC/declare-floor-v8.json" "$REC/declare-floor-v7-on-fv8.json" | tee -a "$REC/declare-floor-v8.log"
  ;;
static)
  # DEL under H8 and H9 (fixture floor v8; plant floor v7 under the same declaration and patch), LAW, HOV, LIT,
  # the census (bite: HEAD's src/styles), the ladder diff (fixture vs floor v7; bite HEAD).
  is "$FV8" || exit 3
  cd "$H"
  { echo "-- DEL H9 floor v8 (fixture)"; node deleted-mechanisms.mjs --root "$W" --declare "$REC/declare-floor-v8.json" --patch "$FV8" > "$REC/del-H9-fv8.log" 2>&1; echo "DEL fv8 exit $?: $(grep -E '^(PASS|FAIL)' "$REC/del-H9-fv8.log")"
    echo "-- LAW"; node launch-law.mjs > "$REC/law.log" 2>&1; echo "LAW exit $?: $(tail -1 "$REC/law.log")"
    node hover-fill-selected.mjs --root "$W" > "$REC/HOV-fv8.log" 2>&1; echo "HOV exit $?: $(tail -1 "$REC/HOV-fv8.log")"
    node lighting-literals.mjs --root "$W" > "$REC/LIT-static-fv8.log" 2>&1; echo "LIT exit $?: $(grep -o 'LIGHTING-LITERALS.*' "$REC/LIT-static-fv8.log" | tail -1)"
    node "$M/pass-4/lighting-census.mjs" "$W" > "$REC/census-fv8.log" 2>&1; echo "census fv8 exit $?: $(tail -1 "$REC/census-fv8.log")"
    radii > "$REC/radii-fv8.txt"
    swap "$FV8" "$FV7"
    echo "-- DEL H9 floor v7 under the floor v8 declaration and patch (plant)"; node deleted-mechanisms.mjs --root "$W" --declare "$REC/declare-floor-v8.json" --patch "$FV8" > "$REC/del-H9-fv7-plant.log" 2>&1; echo "DEL fv7 exit $?: $(grep -E '^(PASS|FAIL)' "$REC/del-H9-fv7-plant.log")"
    radii > "$REC/radii-fv7.txt"
    to_head "$FV7"; radii > "$REC/radii-head.txt"
    node "$M/pass-4/lighting-census.mjs" "$W" > "$REC/census-head.log" 2>&1; echo "census HEAD (10.1.0 source) exit $?: $(tail -1 "$REC/census-head.log")"
    from_head "$FV8"
    echo "-- LADDER diff radii-fv7 radii-fv8 (fixture: prints nothing)"; diff "$REC/radii-fv7.txt" "$REC/radii-fv8.txt"; echo "LADDER fv7-fv8 exit $?"
    echo "-- LADDER diff radii-head radii-fv8 (bite)"; diff "$REC/radii-head.txt" "$REC/radii-fv8.txt"; echo "LADDER head exit $?"
  } 2>&1 | tee "$REC/static.log"
  ;;
del-h9decl)
  # H9's own gated declaration (built from floor-v7.patch, H9-records/declare-floor-v7-on-fv8.json, 72 names) over
  # floor v8 with floor-v7.patch: the rows H9 banked on its stand-in, read on the real wording.
  is "$FV8" || exit 3
  cd "$H"
  node deleted-mechanisms.mjs --root "$W" --declare "$P9/H9-records/declare-floor-v7-on-fv8.json" --patch "$FV7" > "$REC/del-H9decl-fv8.log" 2>&1; echo "DEL (H9's declaration, floor-v7.patch) fv8 exit $?: $(grep -E '^(PASS|FAIL)' "$REC/del-H9decl-fv8.log")" | tee "$REC/del-h9decl.log"
  ;;
sweep)
  # R-21 (b): the frozen list over floor v8, printed (LIST), then read against this seat's rulings (FV8-rulings.json);
  # and floor v7 against the same rulings (plant: A-1's lines print unread).
  is "$FV8" || exit 3
  cd "$H"
  { node prose-sweep.mjs --root "$W" --patch "$FV8" --declare "$REC/declare-floor-v8.json" > "$REC/sweep-fv8.log" 2>&1; echo "SWEEP fv8 LIST exit $?: $(tail -1 "$REC/sweep-fv8.log")"
    if [ -f "$P9/FV8-rulings.json" ]; then
      node prose-sweep.mjs --root "$W" --patch "$FV8" --declare "$REC/declare-floor-v8.json" --rulings "$P9/FV8-rulings.json" > "$REC/sweep-fv8-ruled.log" 2>&1; echo "SWEEP fv8 ruled exit $?: $(tail -1 "$REC/sweep-fv8-ruled.log")"
      swap "$FV8" "$FV7"
      node prose-sweep.mjs --root "$W" --patch "$FV8" --declare "$REC/declare-floor-v8.json" --rulings "$P9/FV8-rulings.json" > "$REC/sweep-fv7-plant.log" 2>&1; echo "SWEEP fv7 under fv8's rulings (plant) exit $?: $(tail -1 "$REC/sweep-fv7-plant.log")"
      swap "$FV7" "$FV8"
    fi
  } 2>&1 | tee "$REC/sweep.log"
  ;;
same)
  # R-22: floor v8, floor v7 and floor v8 again, each built under one label ("same"), each output moved aside; compared
  # raw (diff -rq, sha256 lists), then the dist-demo with Vite's chunk hashes and Vue's scoped ids normalised (FV6's
  # normaliser, pass-7/FV6-run.sh `same`).
  is "$FV8" || exit 3
  O=$D3_OUT/builds; S=$D3_OUT/same; rm -rf "$S"; mkdir -p "$S"
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/fv8"; echo "fv8 built as 'same' $(ts)"
  swap "$FV8" "$FV7"
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/fv7"; echo "fv7 built as 'same' $(ts)"
  swap "$FV7" "$FV8"
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/fv8b"; echo "fv8 rebuilt as 'same' (determinism) $(ts)"
  { for k in dist demo; do
      diff -rq -x build.json "$S/fv7/$k" "$S/fv8/$k" > "$REC/same-$k-fv7-fv8.txt"; echo "$k fv7 vs fv8: diff -rq exit $?, $(wc -l < "$REC/same-$k-fv7-fv8.txt" | tr -d ' ') lines"
      diff -rq -x build.json "$S/fv8/$k" "$S/fv8b/$k" > /dev/null; echo "$k fv8 vs fv8 rebuilt: diff -rq exit $?"
      (cd "$S/fv8/$k" && find . -type f ! -name build.json | sort | xargs shasum -a 256) > "$REC/same-fv8-$k.sha256"
      (cd "$S/fv7/$k" && find . -type f ! -name build.json | sort | xargs shasum -a 256) > "$REC/same-fv7-$k.sha256"
      echo "$k: fv8 $(wc -l < "$REC/same-fv8-$k.sha256" | tr -d ' ') files, fv7 $(wc -l < "$REC/same-fv7-$k.sha256" | tr -d ' ') files; sha256 lists diff: $(diff -q "$REC/same-fv7-$k.sha256" "$REC/same-fv8-$k.sha256" >/dev/null && echo identical || echo DIFFER)"
    done
    for l in fv7 fv8; do for c in "$S/$l/dist"/assets/*.css; do echo "$l specimen css $(basename "$c") $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -c1-16)"; done; done
    echo "-- against pass 8's banked floor v7 same-label lists (FV7-records/same-fv7-*.sha256)"
    for k in dist demo; do diff "$M/pass-8/FV7-records/same-fv7-$k.sha256" "$REC/same-fv8-$k.sha256" > "$REC/same-$k-fv7banked-fv8.txt"; echo "$k banked fv7 vs fv8: diff exit $?, $(wc -l < "$REC/same-$k-fv7banked-fv8.txt" | tr -d ' ') lines"; done
    python3 -I - "$S" <<'EOF'
import os, re, sys, hashlib
S = sys.argv[1]
HASH = rb'-[A-Za-z0-9_-]{8}\.(js|css|woff2?|svg|png|json|wasm|html)'
def norm(root, scoped):
    out = {}
    for dp, _, fs in os.walk(root):
        for f in fs:
            if f == "build.json": continue
            p = os.path.join(dp, f); b = open(p, "rb").read()
            b = re.sub(HASH, rb'-H.\1', b)
            if scoped: b = re.sub(rb'data-v-[0-9a-f]{8}', b'data-v-S', b)
            k = re.sub(r'-[A-Za-z0-9_-]{8}\.', '-H.', os.path.relpath(p, root))
            out.setdefault(k, []).append(hashlib.sha256(b).hexdigest())
    return out
for scoped in (False, True):
    a, b = norm(f"{S}/fv7/demo", scoped), norm(f"{S}/fv8/demo", scoped)
    d = [k for k in sorted(set(a) | set(b)) if sorted(a.get(k, [])) != sorted(b.get(k, []))]
    print(f"demo, chunk hashes normalised{', scoped ids normalised' if scoped else ''}: {len(a)} files · {len(b)} files · differ {len(d)} {d}")
EOF
  } 2>&1 | tee "$REC/same.log"
  ;;
bite)
  # The byte proof's bite: HEAD built the same way under the same label must differ from floor v8.
  O=$D3_OUT/builds; S=$D3_OUT/same
  to_head "$FV8"
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; rm -rf "$S/head"; mv "$O/same" "$S/head"; echo "HEAD built as 'same' $(ts)"
  from_head "$FV8"
  { for k in dist demo; do diff -rq -x build.json "$S/head/$k" "$S/fv8/$k" > "$REC/bite-$k-head-fv8.txt"; echo "bite $k HEAD vs fv8: diff -rq exit $?, $(wc -l < "$REC/bite-$k-head-fv8.txt" | tr -d ' ') lines"; done
    for c in "$S/head/dist"/assets/*.css; do echo "HEAD specimen css $(basename "$c") $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -c1-16)"; done
    # The tie to pass 8's banked floor v7 specimen JS: the JS's //#region comments print the worktree path
    # (p8/floor7 then, p9/floor8 now); rewrite it to pass 8's and hash again.
    N=$B/pathnorm; rm -rf "$N"; cp -R "$S/fv8/dist" "$N"
    for f in "$N"/assets/*.js; do LC_ALL=C sed -i '' 's#\.claude/worktrees/bl/D3/p9/floor8/wt/#.claude/worktrees/bl/D3/p8/floor7/wt/#g' "$f"; done
    for f in "$N"/assets/*.js; do echo "fv8 specimen JS, worktree path rewritten to pass 8's: sha256 $(shasum -a 256 "$f" | cut -d' ' -f1)"; done
    grep -E 'index-[A-Za-z0-9_-]+\.js$' "$M/pass-8/FV7-records/same-fv7-dist.sha256" | sed 's/^/banked fv7 specimen JS: /'
  } 2>&1 | tee "$REC/bite.log"
  ;;
toolchain)
  # Typecheck (src), library build, the test typecheck after it, the dist-demo (before the units: the boot-graph rows
  # read it), vitest --maxWorkers=2.
  is "$FV8" || exit 3
  cd "$W"
  printf 'import base from "./vite.config";\nexport default { ...(base as object), cacheDir: ".cache-fv8/vite" };\n' > vite.fv8.config.ts
  printf 'import base from "./vitest.config";\nexport default { ...(base as object), cacheDir: ".cache-fv8/vitest" };\n' > vitest.fv8.config.ts
  printf 'import base from "./demo/vite.demo-dist.config";\nexport default { ...(base as object), cacheDir: ".cache-fv8/vite-demo" };\n' > vite.fv8demo.config.ts
  { npx vue-tsc --noEmit > "$REC/tsc-app.log" 2>&1; echo "typecheck app exit $? $(ts)"
    npx vite build --config vite.fv8.config.ts > "$REC/libbuild.log" 2>&1; echo "library build exit $? $(ts)"
    npx vue-tsc --noEmit -p tsconfig.test.json > "$REC/tsc-test.log" 2>&1; echo "typecheck tests exit $? $(ts)"
    npx vite build --config vite.fv8demo.config.ts > "$REC/demobuild.log" 2>&1; echo "dist-demo exit $? $(ts)"
    npx vitest run --config vitest.fv8.config.ts --maxWorkers=2 --testTimeout 240000 > "$REC/units.log" 2>&1; echo "vitest exit $? $(ts)"
    grep -E "Test Files|Tests  " "$REC/units.log"
  } 2>&1 | tee "$REC/toolchain.log"
  rm -f vite.fv8.config.ts vitest.fv8.config.ts vite.fv8demo.config.ts
  ;;
wk-dlg)
  # P8-5's one informational WebKit cell: floor v8's specimen (the `same` build), dialog scene, both themes, Playwright
  # WebKit, one browser for the run (capture.mjs closes it in its finally, fresh context per cell). Run as its own
  # `guarded --exclusive webkit --timeout 60` admission (D3-crit-run2.sh wk-dlg, on floor v8's bytes).
  node "$H/capture.mjs" "$D3_OUT/same/fv8/dist" --out "$D3_OUT/caps/fv8-dlg-webkit" --engines webkit --themes light,dark --scenes dialog > "$REC/cap-fv8-dlg-webkit.log" 2>&1
  echo "capture fv8 dialog webkit exit $? $(ts)" | tee -a "$REC/phases.log"
  grep -h "retired\|STALL\|captured\|crash" "$REC/cap-fv8-dlg-webkit.log" | tail -3
  ;;
dlg-read)
  # The witnesses, --light outside the lock: M-3 (variant base, H9-4) and the pass-7 critic's ring reader, compared
  # line for line with the owed-WebKit seat's floor v7 records (pass-8/WK-records).
  C=$D3_OUT/caps/fv8-dlg-webkit
  node "$H/m3-non-text.mjs" "$C" --gate webkit --verbose --cells "dialog$" > "$REC/m3-fv8-dlg-webkit.txt" 2>&1; echo "M-3 fv8 dialog webkit: $(tail -1 "$REC/m3-fv8-dlg-webkit.txt")" | tee "$REC/dlg-read.log"
  grep -E "dialog·ring:close" "$REC/m3-fv8-dlg-webkit.txt" | sort | uniq -c | tee -a "$REC/dlg-read.log"
  node "$M/pass-7/crit-ringpx.mjs" "$C" --engine webkit > "$REC/ringpx-fv8-dlg-webkit.log" 2>&1; echo "ringpx exit $?" | tee -a "$REC/dlg-read.log"
  grep -E "^RING webkit (light|dark) (paper|black)" "$REC/ringpx-fv8-dlg-webkit.log" | tee -a "$REC/dlg-read.log"
  diff <(grep -E "dialog·ring:close" "$REC/m3-fv8-dlg-webkit.txt") <(grep -E "dialog·ring:close" "$M/pass-8/WK-records/verbose/m3-fv7-dlg-webkit.txt") > "$REC/dlg-m3-vs-wk.diff"; echo "Close-ring rows, fv8 vs WK seat's fv7: diff exit $?" | tee -a "$REC/dlg-read.log"
  diff <(grep -E "^RING" "$REC/ringpx-fv8-dlg-webkit.log") <(grep -E "^RING" "$M/pass-8/WK-records/ringpx-fv7-dlg-webkit.log") > "$REC/dlg-ringpx-vs-wk.diff"; echo "ringpx RING rows, fv8 vs WK seat's fv7: diff exit $?" | tee -a "$REC/dlg-read.log"
  ;;
teardown)
  git -C "$R" worktree remove --force "$W"; git -C "$R" worktree prune; rm -rf "$B"; rmdir "$R/.claude/worktrees/bl/D3/p9" 2>/dev/null; ls "$R/.claude/worktrees/bl/D3/" 2>&1; git -C "$R" worktree list | grep -c 'D3/p9' ; true
  ;;
esac
echo "== $phase end $(ts)" | tee -a "$REC/phases.log"
