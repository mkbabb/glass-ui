#!/usr/bin/env bash
# MS5-run.sh · D3 pass 7, the minor split v5 (REGISTRY P6-6.2 step 3): every command this seat ran, by phase.
# minor v5 = pass-6/minor-split-v4.patch + R-16 (comments only: R-16 (i)'s two sentences and the MS4 §1.2 sentences
# ruled false in light, applied by MS5-r16-edits.py), written whole as pass-7/minor-split-v5.patch; the delta is
# pass-7/minor-split-v5-R16.diff. One worktree (.claude/worktrees/bl/D3/p7/minor5/wt); minor v5 is applied by default, a
# phase that needs the minor v4 or HEAD swaps the patch and swaps it back, each swap checked with cmp (or a clean
# git status at HEAD). Builds and caches live in $W/.d3out and $W/.cache-m5. Records land in pass-7/MS5-records/.
#   ~/.claude/guard/guarded --light --timeout 15 -- bash MS5-run.sh static|selftest|g7m3
#   ~/.claude/guard/guarded --timeout 60 -- bash MS5-run.sh same|m3-cr|toolchain|ratchet
#   ~/.claude/guard/guarded --timeout 60 --exclusive webkit -- bash MS5-run.sh m3-wk
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p7/minor5
W=$B/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
P6=$M/pass-6
P7=$M/pass-7
REC=$P7/MS5-records
MS4=$P6/minor-split-v4.patch
MS5=$P7/minor-split-v5.patch
GL=(~/.claude/guard/guarded --light --timeout 15 --)
export D3_OUT=$W/.d3out
mkdir -p "$REC"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
is() { git -C "$W" diff HEAD --binary | cmp -s - "$1" && echo "worktree = $(basename "$1")"; }
swap() { is "$1" >/dev/null && git -C "$W" apply -R "$1" 2>/dev/null && git -C "$W" apply "$2" 2>/dev/null; is "$2" || exit 3; }
to_head() { is "$1" >/dev/null && git -C "$W" apply -R "$1" 2>/dev/null && test -z "$(git -C "$W" status --porcelain -- src demo tests DESIGN.md)" && echo "worktree = HEAD" || exit 3; }
from_head() { test -z "$(git -C "$W" status --porcelain -- src demo tests DESIGN.md)" && git -C "$W" apply "$1" 2>/dev/null; is "$1" || exit 3; }
radii() { grep -E -- '--glass-blur-(wash|quiet|resting|floating|overlay)-radius:' "$W/src/styles/tokens/glass.css" | sed 's/^ *//'; }
phase=$1; shift
echo "== $phase start $(ts)" | tee -a "$REC/phases.log"
case $phase in
static)
  # H7-3 (DEL with the minor's declaration: fixture minor v5, plant minor v4), MS4's R-13 grep and its §1.2 sweep on both,
  # LAW, the census (bite on v10.1.0 src/styles), HOV, LIT, the ladder diff, FL-14's static half.
  is "$MS5" || exit 3
  cd "$H"
  { echo "-- H7-3 DEL minor v5 (fixture) and minor v4 (plant), harness/deletes-minor.json"
    for t in minor5 minor4; do node deleted-mechanisms.mjs --root "$B/trees/$t" --declare deletes-minor.json > "$REC/del-minor-$t.log" 2>&1; echo "DEL $t exit $?: $(tail -2 "$REC/del-minor-$t.log" | tr '\n' ' ')"; done
    R13='earned-darken clamp|earned darken|whole dynamic darken|darkens toward the ink in BOTH modes|darkened by whatever'
    echo "-- MS4's R-13 line grep, minor v5: $(grep -rnE "$R13" "$W/src" "$W/demo" | wc -l | tr -d ' ') lines"
    echo "-- MS4 §1.2's sweep (grep -i darken minus press|tone-step|well|darker in dark|in dark), src + demo/stories"
    for t in minor4 minor5; do grep -rnEi 'darken' "$B/trees/$t/src" "$B/trees/$t/demo/stories" | grep -viE 'press|tone-step|well|darker in dark|in dark' | sed "s#$B/trees/$t/##" > "$REC/sweep-$t.txt"; echo "   $t: $(wc -l < "$REC/sweep-$t.txt" | tr -d ' ') lines"; done
    diff "$REC/sweep-minor4.txt" "$REC/sweep-minor5.txt" > "$REC/sweep-diff-minor4-minor5.txt"; echo "   diff sweep v4 v5: $(grep -c '^<' "$REC/sweep-diff-minor4-minor5.txt") lines gone, $(grep -c '^>' "$REC/sweep-diff-minor4-minor5.txt") added"
    node launch-law.mjs > "$REC/law.log" 2>&1; echo "LAW exit $?: $(tail -1 "$REC/law.log")"
    node "$M/pass-4/lighting-census.mjs" "$W" > "$REC/census-minor5.log" 2>&1; echo "census minor5 exit $?: $(tail -1 "$REC/census-minor5.log")"
    t=$B/v1010; rm -rf "$t"; mkdir -p "$t"; git -C "$R" archive v10.1.0 src/styles | tar -x -C "$t"
    node "$M/pass-4/lighting-census.mjs" "$t" > "$REC/census-v1010.log" 2>&1; echo "census v10.1.0 exit $?: $(tail -1 "$REC/census-v1010.log")"; rm -rf "$t"
    node hover-fill-selected.mjs --root "$W" > "$REC/HOV-minor5.log" 2>&1; echo "HOV exit $?: $(tail -1 "$REC/HOV-minor5.log")"
    node lighting-literals.mjs --root "$W" > "$REC/LIT-static-minor5.log" 2>&1; echo "LIT exit $?: $(grep -o 'LIGHTING-LITERALS.*' "$REC/LIT-static-minor5.log" | tail -1)"
    radii > "$REC/radii-minor5.txt"; echo "-- LADDER diff radii-minor5 FV6 radii-minor4 (prints nothing)"; diff "$REC/radii-minor5.txt" "$P7/FV6-records/radii-minor4.txt"; echo "LADDER exit $?"
    echo "-- FL-14 static: @utility glass-plate declares isolation"; sed -n '/^@utility glass-plate/,/^}/p' "$W/src/styles/glass/veil.css" | grep -n "isolation"
    echo "-- names: identifiers on R-16's removed and added lines (comments only, so none should move)"
    grep -E '^[-+][^-+]' "$P7/minor-split-v5-R16.diff" | grep -oE -- '--[a-z][a-z0-9-]+|data-[a-z-]+' | sort | uniq -c | sort -rn | head -20
  } 2>&1 | tee "$REC/static.log"
  ;;
selftest)
  # The harness self-test for the H7 rows (H7-3's rows grown by R-16), on the real minor trees; static only.
  cd "$H"; D3_OUT=$B/selftest-out node selftest.mjs --only H7-1,H7-3,DEL,LAW --h7-trees "$B/trees" > "$REC/selftest-h7.log" 2>&1; echo "selftest exit $?: $(tail -1 "$REC/selftest-h7.log")"
  ;;
same)
  # The byte-identity proof (REGISTRY P6-2.2, thin builds): the minor v5 and the minor v4 built under ONE label, each output
  # moved aside, then compared byte for byte (specimen dist and dist-demo), plus a v5 rebuild for determinism, plus the
  # demo with Vite's chunk hashes and Vue's scoped ids normalised (FV6 §4's method).
  is "$MS5" || exit 3
  O=$D3_OUT/builds; S=$D3_OUT/same; rm -rf "$S"; mkdir -p "$S"
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/m5"; echo "minor v5 built as 'same' $(ts)"
  swap "$MS5" "$MS4"
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/m4"; echo "minor v4 built as 'same' $(ts)"
  swap "$MS4" "$MS5"
  node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; mv "$O/same" "$S/m5b"; echo "minor v5 rebuilt as 'same' (determinism) $(ts)"
  { for k in dist demo; do
      diff -rq -x build.json "$S/m4/$k" "$S/m5/$k" > "$REC/same-$k-m4-m5.txt"; echo "$k minor v4 vs minor v5: diff -rq exit $?, $(wc -l < "$REC/same-$k-m4-m5.txt" | tr -d ' ') lines"
      diff -rq -x build.json "$S/m5/$k" "$S/m5b/$k" > /dev/null; echo "$k minor v5 vs minor v5 rebuilt: diff -rq exit $?"
      (cd "$S/m5/$k" && find . -type f ! -name build.json | sort | xargs shasum -a 256) > "$REC/same-m5-$k.sha256"
      (cd "$S/m4/$k" && find . -type f ! -name build.json | sort | xargs shasum -a 256) > "$REC/same-m4-$k.sha256"
      echo "$k files: m4 $(wc -l < "$REC/same-m4-$k.sha256" | tr -d ' '), m5 $(wc -l < "$REC/same-m5-$k.sha256" | tr -d ' '); sha256 list diff exit $(diff -q "$REC/same-m4-$k.sha256" "$REC/same-m5-$k.sha256" > /dev/null; echo $?)"
    done
    for l in m4 m5; do for c in "$S/$l/dist"/assets/*.css; do echo "$l specimen css $(basename "$c") $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -c1-16)"; done; done
    for l in m4 m5; do echo "$l dist-demo css total $(find "$S/$l/demo" -name '*.css' -exec cat {} + | wc -c | tr -d ' ') B, files $(find "$S/$l/demo" -type f | wc -l | tr -d ' ')"; done
  } 2>&1 | tee "$REC/same.log"
  ;;
m3-cr)
  # H7-1's M-3 re-read on the minor v5's own pixels: the dialog scene (the Close ring), Chromium, both themes, every ground,
  # captured fresh and read by the live m3-non-text.mjs (H7-1's ringFallbackRead) with --verbose; then HEAD's dialog the
  # same way (G7's M-3 half needs HEAD-PASS under H7). One guarded run per capture, one browser each.
  is "$MS5" || exit 3
  N=${M3_RUN:-1}; S=$D3_OUT/same
  node "$H/capture.mjs" "$S/m5/dist" --out "$D3_OUT/caps/m5-m3-cr-$N" --engines chromium --themes light,dark --scenes dialog > "$REC/m3-capture-cr-m5-$N.log" 2>&1; echo "capture minor v5 chromium $N exit $? $(ts)"
  node "$H/m3-non-text.mjs" "$D3_OUT/caps/m5-m3-cr-$N" --gate chromium --verbose > "$REC/m3-cr-m5-$N.txt" 2>&1; echo "M-3 minor v5 chromium $N exit $?: $(tail -1 "$REC/m3-cr-m5-$N.txt")"
  ;;
m3-head)
  # HEAD's specimen built in this worktree (to_head, build, back), dialog scene, Chromium; read under H7-1.
  is "$MS5" || exit 3
  to_head "$MS5"; node "$H/build.mjs" "$W" --label head 2>&1 | tail -1; from_head "$MS5"; echo "HEAD built $(ts)"
  N=${M3_RUN:-1}
  node "$H/capture.mjs" "$D3_OUT/builds/head/dist" --out "$D3_OUT/caps/head-m3-cr-$N" --engines chromium --themes light,dark --scenes dialog > "$REC/m3-capture-cr-head-$N.log" 2>&1; echo "capture HEAD chromium $N exit $? $(ts)"
  node "$H/m3-non-text.mjs" "$D3_OUT/caps/head-m3-cr-$N" --gate chromium --verbose > "$REC/m3-cr-head-$N.txt" 2>&1; echo "M-3 HEAD chromium $N exit $?: $(tail -1 "$REC/m3-cr-head-$N.txt")"
  ;;
m3-wk)
  # Under ONE `guarded --exclusive webkit` admission, queued after every Chromium phase: the dialog scene of the minor v5
  # and of HEAD in Playwright WebKit, read under H7-1 (H7 §5: HEAD's 14 WebKit Close rings were UNSCORED for want of a
  # banked column record; this capture scores them).
  echo "admitted $(ts)" | tee -a "$REC/wk-admission.log"
  for l in m5 head; do
    d=$D3_OUT/same/m5/dist; [ $l = head ] && d=$D3_OUT/builds/head/dist
    node "$H/capture.mjs" "$d" --out "$D3_OUT/caps/$l-m3-wk" --engines webkit --themes light,dark --scenes dialog > "$REC/m3-capture-wk-$l.log" 2>&1; echo "capture $l webkit exit $? $(ts)"
    node "$H/m3-non-text.mjs" "$D3_OUT/caps/$l-m3-wk" --gate webkit --verbose > "$REC/m3-wk-$l.txt" 2>&1; echo "M-3 $l webkit exit $?: $(tail -1 "$REC/m3-wk-$l.txt")"
  done 2>&1 | tee -a "$REC/wk-admission.log"
  echo "done $(ts)" | tee -a "$REC/wk-admission.log"
  ;;
toolchain)
  # Typecheck (src), library build, the test typecheck after it (FV6 §6's order), dist-demo, vitest --maxWorkers=2.
  is "$MS5" || exit 3
  cd "$W"
  printf 'import base from "./vite.config";\nexport default { ...(base as object), cacheDir: ".cache-m5/vite" };\n' > vite.m5.config.ts
  printf 'import base from "./vitest.config";\nexport default { ...(base as object), cacheDir: ".cache-m5/vitest" };\n' > vitest.m5.config.ts
  printf 'import base from "./demo/vite.demo-dist.config";\nexport default { ...(base as object), cacheDir: ".cache-m5/vite-demo" };\n' > vite.m5demo.config.ts
  { npx vue-tsc --noEmit > "$REC/tsc-app.log" 2>&1; echo "typecheck app exit $? $(ts)"
    npx vite build --config vite.m5.config.ts > "$REC/libbuild.log" 2>&1; echo "library build exit $? $(ts)"
    npx vue-tsc --noEmit -p tsconfig.test.json > "$REC/tsc-test.log" 2>&1; echo "typecheck tests exit $? $(ts)"
    npx vite build --config vite.m5demo.config.ts > "$REC/demobuild.log" 2>&1; echo "dist-demo exit $? $(ts)"
    npx vitest run --config vitest.m5.config.ts --maxWorkers=2 --testTimeout 240000 > "$REC/units.log" 2>&1; echo "vitest exit $? $(ts)"
    grep -E "Test Files|Tests  " "$REC/units.log"; } 2>&1 | tee "$REC/toolchain.log"
  rm -f vite.m5.config.ts vitest.m5.config.ts vite.m5demo.config.ts
  ;;
ratchet)
  # G5: the export/roster verifier on the minor v5's library build (the ratchet datum unrebound), and the roster diff.
  is "$MS5" || exit 3
  cd "$W"; { node scripts/verify-export-types.mjs > "$REC/verifier.log" 2>&1; echo "verifier exit $?: $(grep -E 'RATCHET|terminal|PRESENT' "$REC/verifier.log" | head -4 | tr '\n' ' ')"
    git -C "$W" diff --stat HEAD -- .published-roster .bundle-ratchet; echo "roster/ratchet diff above (empty = untouched)"; } 2>&1 | tee "$REC/ratchet.log"
  ;;
teardown)
  git -C "$R" worktree remove --force "$W"; git -C "$R" worktree prune; rm -rf "$B"; rmdir "$R/.claude/worktrees/bl/D3/p7" 2>/dev/null; ls "$R/.claude/worktrees/bl/D3/" 2>&1
  ;;
esac
echo "== $phase end $(ts)" | tee -a "$REC/phases.log"
# ── appended after the run: the rebound verifier (MS4-run.sh's method), run as its own phase ──────────────────────────
# ~/.claude/guard/guarded --light --timeout 10 -- bash MS5-run.sh rebound   (the case below is reached via MS5_PHASE)
if [ "${phase}" = rebound ]; then
  cd "$W"; is "$MS5" || exit 3; n=$(grep -oE "forbidden: [0-9]+" "$REC/verifier.log" | grep -oE "[0-9]+" | head -1); echo "$n" > .bundle-ratchet
  { node scripts/verify-export-types.mjs > "$REC/verifier-rebound.log" 2>&1; echo "verifier (minor v5, datum $n in the worktree) exit $? $(ts)"
    git show HEAD:.bundle-ratchet > .bundle-ratchet; test -z "$(git status --porcelain -- .bundle-ratchet)" && echo ".bundle-ratchet restored to HEAD"
    grep -oE '"terminal":"[A-Z]+"|"roster":\{[^}]*\}|"claims":[0-9]+|"declarations":[0-9]+' "$REC/verifier-rebound.log" | head -6
    grep -E "terminal|PRESENT" "$REC/verifier-rebound.log" | head -4
    git -C "$R" diff --stat v10.1.0 HEAD -- .published-roster; git diff --stat HEAD -- .published-roster; echo "roster diff (v10.1.0..HEAD, and the worktree) above: empty = unchanged"
    for f in $(git apply --numstat "$MS4" | cut -f3) ; do :; done
    echo "-- library dist: which emitted file differs (minor v5 build vs a minor v4 build, both in this worktree)"; } 2>&1 | tee "$REC/rebound.log"
  echo "== $phase end $(ts)" | tee -a "$REC/phases.log"
fi
# rerun-wk: the minor v5's Playwright WebKit red cells (the dark dialog Close rings, 10.1.0's dark arm) re-captured twice
# under ONE admission:  ~/.claude/guard/guarded --timeout 30 --exclusive webkit -- bash MS5-run.sh rerun-wk
if [ "${phase}" = rerun-wk ]; then
  echo "admitted $(ts)" | tee -a "$REC/wk-admission.log"
  for n in 1 2; do
    node "$H/capture.mjs" "$D3_OUT/same/m5/dist" --out "$D3_OUT/caps/m5-m3-wk-rerun$n" --engines webkit --themes dark --scenes dialog > "$REC/rerun-webkit$n-capture.log" 2>&1
    node "$H/m3-non-text.mjs" "$D3_OUT/caps/m5-m3-wk-rerun$n" --gate webkit --verbose > "$REC/rerun-webkit$n-m3.txt" 2>&1; echo "rerun webkit $n $(ts): $(awk '/dialog: perimeter/{c=$3} /ring:close/{printf "%s %s  ", c, $3}' "$REC/rerun-webkit$n-m3.txt")"
  done 2>&1 | tee -a "$REC/wk-admission.log"
  echo "== $phase end $(ts)" | tee -a "$REC/phases.log"
fi
