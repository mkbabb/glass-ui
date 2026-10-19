#!/usr/bin/env bash
# crit-run.sh · D3 pass 11, the critic (REGISTRY P10-6.3 step 4): every command the critic ran, by phase.
# One worktree (.claude/worktrees/bl/D3/p11/crit/wt) cut at HEAD with node_modules symlinked; each banked patch (and
# each proposed delta) is applied there, cmp-checked against its file, copied out to $B/trees/<name> and reversed.
# Builds and caches live under $W/.d3out and $W/.cache-crit. Records land in pass-11/crit-records/.
#   bash crit-run.sh setup|compose|trees|static|sweep|nbhd|selftest|same-floor|same-minor|toolchain|teardown
# Launched as `~/.claude/guard/guarded [--light] [--timeout N] -- bash crit-run.sh <phase>`. No phase launches a browser
# except `toolchain` (vitest's slider.size-tokens test launches its own headless shell), which runs heavy, never --light.
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p11/crit
W=$B/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
P9=$M/pass-9
P10=$M/pass-10
P11=$M/pass-11
REC=$P11/crit-records
FV9=$P10/floor-v9.patch
FV10=$P11/floor-v10.patch
MS8=$P10/minor-split-v8.patch
MS9=$P11/minor-split-v9.patch
D10=$P11/FV10-records/declare-floor-v10.json
D9=$P10/FV9-records/declare-floor-v9.json
DM=$H/deletes-minor.json
export D3_OUT=$W/.d3out
mkdir -p "$REC"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
clean() { test -z "$(git -C "$W" status --porcelain -- src demo tests docs/canon DESIGN.md)"; }
copyout() { rm -rf "$B/trees/$1"; mkdir -p "$B/trees/$1/docs" && cp -R "$W/src" "$W/demo" "$W/tests" "$B/trees/$1/" && cp -R "$W/docs/canon" "$B/trees/$1/docs/" && cp "$W"/*.md "$B/trees/$1/"; }
h7copy() { rm -rf "$B/h7trees/$1"; mkdir -p "$B/h7trees/$1" && cp -R "$W/src" "$W/demo" "$B/h7trees/$1/"; }
# on name base [delta...]: apply base (+ deltas) at HEAD, cmp the base, run $FN, reverse to HEAD
on() { local name=$1 base=$2; shift 2
  clean || { echo "worktree not clean before $name"; exit 3; }
  git -C "$W" apply "$base" || exit 3
  git -C "$W" diff HEAD --binary | cmp -s - "$base" && echo "worktree = $(basename "$base")" || { echo "cmp FAIL $base"; exit 3; }
  for d in "$@"; do git -C "$W" apply "$d" && echo "  + $(basename "$d")" || exit 3; done
  $FN "$name"
  for ((i=$#; i>0; i--)); do git -C "$W" apply -R "${!i}" || exit 3; done
  git -C "$W" apply -R "$base" && clean && echo "back to HEAD" || exit 3; }
phase=$1; shift
echo "== $phase start $(ts)" | tee -a "$REC/phases.log"
case $phase in
setup)
  mkdir -p "$B/trees" "$B/h7trees"; git -C "$R" worktree add --detach "$W" HEAD && ln -s "$R/node_modules" "$W/node_modules"
  { echo "worktree HEAD $(git -C "$W" rev-parse --short=9 HEAD)"
    echo "10.1.0 source diff 1da7eb17b..HEAD (empty = none): [$(git -C "$W" diff --stat 1da7eb17b HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon | tail -1)]"
    for p in "$FV10" "$MS9" "$FV9" "$MS8"; do git -C "$W" apply --check "$p"; echo "git apply --check $(basename "$p") at HEAD: exit $?"; done
  } 2>&1 | tee "$REC/setup.log"
  ;;
compose)
  # The compositions, independently: floor v9 + R-28 (crit-fv10-proposed.diff, as the pass-10 critic wrote it) = floor v10;
  # minor v8 + R-29 (MS8-r26-proposed.diff) = minor v9. Byte for byte, as the worktree diff.
  { clean || exit 3
    git -C "$W" apply "$FV9" && git -C "$W" apply "$P10/crit-fv10-proposed.diff" && git -C "$W" diff HEAD --binary | cmp - "$FV10" && echo "floor-v9.patch + crit-fv10-proposed.diff (R-28) = floor-v10.patch: cmp exit 0"
    git -C "$W" diff HEAD --binary > "$B/fv10.wt"; git -C "$W" apply -R "$B/fv10.wt" && clean && echo "back to HEAD"
    git -C "$W" apply "$MS8" && git -C "$W" apply "$P10/MS8-r26-proposed.diff" && git -C "$W" diff HEAD --binary | cmp - "$MS9" && echo "minor-split-v8.patch + MS8-r26-proposed.diff (R-29) = minor-split-v9.patch: cmp exit 0"
    git -C "$W" diff HEAD --binary > "$B/ms9.wt"; git -C "$W" apply -R "$B/ms9.wt" && clean && echo "back to HEAD"
    for f in "$FV9" "$FV10" "$MS8" "$MS9" "$P10/crit-fv10-proposed.diff" "$P10/MS8-r26-proposed.diff" "$P11/FV10-seat-proposed.diff" "$P11/MS9-seat-proposed.diff" "$P11/floor-v10-delta.diff" "$P11/minor-split-v9-R29.diff"; do echo "$(basename "$f"): sha1 $(shasum "$f" | cut -c1-8), $(grep -c '^diff --git' "$f") files, +$(grep -c '^+[^+]' "$f")/-$(grep -c '^-[^-]' "$f")"; done
    diff <(git apply --numstat "$FV9" | cut -f3) <(git apply --numstat "$FV10" | cut -f3) >/dev/null; echo "path list fv9 = fv10: exit $?"
    diff <(git apply --numstat "$MS8" | cut -f3) <(git apply --numstat "$MS9" | cut -f3) >/dev/null; echo "path list minor8 = minor9: exit $?"
    cmp "$P11/FV10-rulings.json" "$P10/crit-fv10-rulings-proposed.json" && echo "FV10-rulings.json = crit-fv10-rulings-proposed.json (cmp)"
    cmp "$P11/MS9-rulings.json" "$P10/MS8-rulings-proposed.json" && echo "MS9-rulings.json = MS8-rulings-proposed.json (cmp)"
  } 2>&1 | tee "$REC/compose.log"
  ;;
trees)
  { FN=copyout on fv9 "$FV9"
    FN=copyout on fv10 "$FV10"
    FN=copyout on fv10s "$FV10" "$P11/FV10-seat-proposed.diff"
    FN=copyout on fv9p "$FV9" "$P10/crit-fv10-proposed.diff"
    FN=copyout on minor7 "$P9/minor-split-v7.patch"
    FN=copyout on minor8 "$MS8"
    FN=copyout on minor8p "$MS8" "$P10/MS8-r26-proposed.diff"
    FN=copyout on minor9 "$MS9"
    FN=copyout on minor9s "$MS9" "$P11/MS9-seat-proposed.diff"
    FN=h7copy on minor8 "$MS8"
    FN=h7copy on minor9 "$MS9"
    ls "$B/trees" "$B/h7trees"
  } 2>&1 | tee "$REC/trees.log"
  ;;
static)
  cd "$H"; T=$B/trees
  { for t in fv10 fv10s fv9; do node deleted-mechanisms.mjs --root "$T/$t" --declare "$D10" --patch "$FV10" > "$REC/del-$t.log" 2>&1; echo "DEL $t (floor v10 decl+patch) exit $?: $(tail -1 "$REC/del-$t.log")"; done
    node deleted-mechanisms.mjs --root "$B/absent" --declare "$D10" --patch "$FV10" > "$REC/del-absent.log" 2>&1; echo "DEL absent exit $?: $(tail -1 "$REC/del-absent.log")"
    for t in minor9 minor9s; do node deleted-mechanisms.mjs --root "$T/$t" --declare "$DM" --patch "$MS9" > "$REC/del-$t.log" 2>&1; echo "DEL $t (deletes-minor + minor v9 patch) exit $?: $(tail -1 "$REC/del-$t.log")"; done
    node deleted-mechanisms.mjs --root "$B/h7trees/minor9" --declare "$DM" > "$REC/del-H7-minor9.log" 2>&1; echo "H7-3 minor9 exit $?: $(tail -1 "$REC/del-H7-minor9.log")"
    node launch-law.mjs > "$REC/law.log" 2>&1; echo "LAW exit $?: $(tail -1 "$REC/law.log")"
    for t in fv10 minor9; do node hover-fill-selected.mjs --root "$T/$t" > "$REC/HOV-$t.log" 2>&1; echo "HOV $t exit $?: $(tail -1 "$REC/HOV-$t.log")"
      node "$M/pass-4/lighting-census.mjs" "$T/$t" > "$REC/census-$t.log" 2>&1; echo "census $t exit $?: $(tail -1 "$REC/census-$t.log")"; done
  } 2>&1 | tee "$REC/static.log"
  ;;
sweep)
  cd "$H"; T=$B/trees
  sw() { node prose-sweep.mjs --root "$T/$1" --patch "$2" --declare "$3" ${4:+--rulings "$4"} > "$REC/sweep-$5.log" 2>&1; echo "SWEEP $5 exit $?: $(tail -1 "$REC/sweep-$5.log")"; }
  { sw fv10 "$FV10" "$D10" "" fv10-list
    sw fv10 "$FV10" "$D10" "$P11/FV10-rulings.json" fv10-carried
    sw fv10 "$FV10" "$D10" "$P11/FV10-rulings-seat.json" fv10-seat
    sw fv10s "$FV10" "$D10" "$P11/FV10-rulings-seat-proposed.json" fv10s-seatp
    sw fv10 "$FV10" "$D10" "$P11/FV10-rulings-seat-proposed.json" fv10-under-seatp
    sw fv9 "$FV10" "$D10" "$P11/FV10-rulings.json" fv9-plant
    sw minor9 "$MS9" "$DM" "" minor9-list
    sw minor9 "$MS9" "$DM" "$P11/MS9-rulings.json" minor9-carried
    sw minor9 "$MS9" "$DM" "$P11/MS9-rulings-seat.json" minor9-seat
    sw minor9s "$MS9" "$DM" "$P11/MS9-rulings-seat.json" minor9s-seat
    sw minor8 "$MS9" "$DM" "$P11/MS9-rulings.json" minor8-plant
    [ -f "$P11/crit-fv10-rulings.json" ] && { sw fv10s "$FV10" "$D10" "$P11/crit-fv10-rulings.json" fv10s-crit; sw fv10 "$FV10" "$D10" "$P11/crit-fv10-rulings.json" fv10-crit; }
    [ -f "$P11/crit-ms9-rulings.json" ] && { sw minor9s "$MS9" "$DM" "$P11/crit-ms9-rulings.json" minor9s-crit; sw minor9 "$MS9" "$DM" "$P11/crit-ms9-rulings.json" minor9-crit; }
    true
  } 2>&1 | tee "$REC/sweep.log"
  ;;
nbhd)
  cd "$H"; T=$B/trees
  { node neighbourhood.mjs --root "$T/fv10" --patch "$FV10" > "$REC/neighbourhood-fv10.log" 2>&1; echo "NBHD fv10 exit $?: $(tail -1 "$REC/neighbourhood-fv10.log")"
    node neighbourhood.mjs --root "$T/fv10s" --patch "$FV10" > "$REC/neighbourhood-fv10s.log" 2>&1; echo "NBHD fv10s exit $?: $(tail -1 "$REC/neighbourhood-fv10s.log")"
    node neighbourhood.mjs --root "$T/minor9" --patch "$MS9" > "$REC/neighbourhood-minor9.log" 2>&1; echo "NBHD minor9 exit $?: $(tail -1 "$REC/neighbourhood-minor9.log")"
    node neighbourhood.mjs --root "$T/fv9" --patch "$FV9" > "$REC/neighbourhood-fv9.log" 2>&1; echo "NBHD fv9 (H11-2 plant) exit $?: $(tail -1 "$REC/neighbourhood-fv9.log")"
    for l in "src/components/dock/styles/controls/icon-button.css:95 " "src/components/dock/styles/controls/icon-button.css:104 " "src/components/dock/styles/controls/icon-button.css:118 " "src/components/dock/styles/controls/icon-button.css:119 " "src/components/dock/styles/controls/icon-button.css:120 " "src/styles/tokens/sizing.css:256 " "src/styles/tokens/sizing.css:257 " "src/styles/glass/overlay-plate.css:271 " "src/styles/glass/overlay-plate.css:273 "; do echo "fv9 print carries ${l}: $(grep -c "^${l}\[" "$REC/neighbourhood-fv9.log")"; done
    for l in "src/styles/tokens/property-regs.css:151 " "src/components/_shared/feedback/feedback-tone.css:38 " "tests/styles/glass-subtlety.test.ts:193 "; do echo "fv10/minor9 print carries ${l}: fv10 $(grep -c "^${l}\[" "$REC/neighbourhood-fv10.log") minor9 $(grep -c "^${l}\[" "$REC/neighbourhood-minor9.log")"; done
  } 2>&1 | tee "$REC/nbhd.log"
  ;;
selftest)
  # H11's own rows, re-run by the critic on its own trees (the plants: TRUNC, PIPE x6, H11-2's floor v9 print).
  cd "$H"
  D3_OUT=$B/stout node selftest.mjs --only H11-1,H11-2 --h9-trees "$B/trees" --h7-trees "$B/h7trees" > "$REC/selftest-h11-$1.log" 2>&1; echo "selftest H11 ($1) exit $?: $(tail -1 "$REC/selftest-h11-$1.log")" | tee -a "$REC/selftest.log"
  ;;
same-floor|same-minor)
  # R-22 / R-27: each build under one label in one session, each output moved aside; compared raw. Only the specimen CSS
  # hash and the dist-demo sha256 list are tied to the bank (R-27).
  O=$D3_OUT/builds; S=$D3_OUT/same; mkdir -p "$S"
  bld() { rm -rf "$O/same"; node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; rm -rf "$S/$1"; mv "$O/same" "$S/$1"; echo "$1 built $(ts)"; }
  if [ "$phase" = same-floor ]; then set -- fv10:"$FV10" fv9:"$FV9" fv10s:"$FV10":"$P11/FV10-seat-proposed.diff"; K=fv10; BANK=$P10/FV9-records/same-fv9-demo.sha256; BCSS=$P10/FV9-records/same-fv9-dist.sha256
  else set -- minor9:"$MS9" minor8:"$MS8" minor9s:"$MS9":"$P11/MS9-seat-proposed.diff"; K=minor9; BANK=$P10/MS8-records/same-m8-demo.sha256; BCSS=$P10/MS8-records/same-m8-dist.sha256; fi
  { for spec in "$@"; do IFS=: read -r name base delta <<< "$spec"; FN=bld on "$name" "$base" ${delta:+"$delta"}; done
    names=$(for spec in "$@"; do echo "${spec%%:*}"; done)
    for n in $names; do for k in dist demo; do (cd "$S/$n/$k" && find . -type f ! -name build.json | sort | xargs shasum -a 256) > "$REC/same-$n-$k.sha256"; done
      for c in "$S/$n/dist"/assets/*.css; do echo "$n specimen css $(basename "$c") $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -c1-16)"; done
      echo "$n dist-demo files: $(wc -l < "$REC/same-$n-demo.sha256" | tr -d ' ')"; done
    for n in $names; do [ "$n" = "$K" ] && continue; for k in dist demo; do diff -rq -x build.json "$S/$K/$k" "$S/$n/$k" > /dev/null; echo "$k $K vs $n: diff -rq exit $?"; done; done
    echo "-- R-27 tie: banked specimen css line"; grep -E '\.css$' "$BCSS"
    diff "$BANK" "$REC/same-$K-demo.sha256" > /dev/null; echo "banked dist-demo sha256 list vs $K: diff exit $?"
  } 2>&1 | tee "$REC/$phase.log"
  ;;
bite)
  # The byte proof's bite: HEAD built the same way under the same label must differ from floor v10 and from the minor v9.
  O=$D3_OUT/builds; S=$D3_OUT/same; clean || exit 3
  { rm -rf "$O/same"; node "$H/build.mjs" "$W" --label same --demo 2>&1 | tail -1; rm -rf "$S/head"; mv "$O/same" "$S/head"; echo "HEAD built $(ts)"
    for n in fv10 minor9; do for k in dist demo; do diff -rq -x build.json "$S/head/$k" "$S/$n/$k" > "$REC/bite-$k-head-$n.txt"; echo "bite $k HEAD vs $n: diff -rq exit $?, $(wc -l < "$REC/bite-$k-head-$n.txt" | tr -d ' ') lines"; done; done
    for c in "$S/head/dist"/assets/*.css; do echo "HEAD specimen css $(basename "$c") $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -c1-16)"; done
  } 2>&1 | tee "$REC/bite.log"
  ;;
crit)
  # The critic's proposed deltas on plain tree copies (no worktree swap): floor v11 = floor v10 + FV10-seat-proposed.diff +
  # crit-floor-proposed.diff; the minor v9c = the minor v9 + MS9-seat-proposed.diff + crit-minor-proposed.diff. Diffs cut
  # with git diff --no-index from the one file each touches; static reads and the list under the critic's rulings.
  T=$B/trees; cd "$H"
  { for pair in fv11:fv10s:floor minor9c:minor9s:minor; do IFS=: read -r new old kind <<< "$pair"
      rm -rf "$T/$new"; cp -R "$T/$old" "$T/$new"; python3 -I "$P11/crit-proposed.py" --tree "$kind" "$T/$new"
      D=$B/d-$kind; rm -rf "$D"; mkdir -p "$D/a/src/styles/glass" "$D/b/src/styles/glass"
      cp "$T/$old/src/styles/glass/grasp.css" "$D/a/src/styles/glass/"; cp "$T/$new/src/styles/glass/grasp.css" "$D/b/src/styles/glass/"
      (cd "$D" && git diff --no-index a b) | sed -e 's#^diff --git a/a/#diff --git a/#' -e 's# b/b/# b/#' -e 's#^--- a/a/#--- a/#' -e 's#^+++ b/b/#+++ b/#' > "$P11/crit-$kind-proposed.diff"
      echo "crit-$kind-proposed.diff: sha1 $(shasum "$P11/crit-$kind-proposed.diff" | cut -c1-8), +$(grep -c '^+[^+]' "$P11/crit-$kind-proposed.diff")/-$(grep -c '^-[^-]' "$P11/crit-$kind-proposed.diff")"
      diff -r "$T/$old" "$T/$new" | grep -c '^[<>]' | sed "s/^/lines differing $old vs $new: /"
    done
    node deleted-mechanisms.mjs --root "$T/fv11" --declare "$D10" --patch "$FV10" > "$REC/del-fv11.log" 2>&1; echo "DEL fv11 exit $?: $(tail -1 "$REC/del-fv11.log")"
    node deleted-mechanisms.mjs --root "$T/minor9c" --declare "$DM" --patch "$MS9" > "$REC/del-minor9c.log" 2>&1; echo "DEL minor9c exit $?: $(tail -1 "$REC/del-minor9c.log")"
    sw() { node prose-sweep.mjs --root "$T/$1" --patch "$2" --declare "$3" ${4:+--rulings "$4"} > "$REC/sweep-$5.log" 2>&1; echo "SWEEP $5 exit $?: $(tail -1 "$REC/sweep-$5.log")"; }
    sw fv11 "$FV10" "$D10" "" fv11-list
    sw fv11 "$FV10" "$D10" "$P11/crit-fv10-rulings.json" fv11-crit
    sw fv10s "$FV10" "$D10" "$P11/crit-fv10s-reading.json" fv10s-critreading
    sw fv10s "$FV10" "$D10" "$P11/crit-fv10-rulings.json" fv10s-under-crit
    sw fv10 "$FV10" "$D10" "$P11/crit-fv10-rulings.json" fv10-under-crit
    sw minor9c "$MS9" "$DM" "" minor9c-list
    sw minor9c "$MS9" "$DM" "$P11/crit-ms9-rulings.json" minor9c-crit
    sw minor9s "$MS9" "$DM" "$P11/crit-ms9s-reading.json" minor9s-critreading
    sw minor9 "$MS9" "$DM" "$P11/crit-ms9-rulings.json" minor9-under-crit
    node neighbourhood.mjs --root "$T/fv11" --patch "$FV10" > "$REC/neighbourhood-fv11.log" 2>&1; echo "NBHD fv11 exit $?: $(tail -1 "$REC/neighbourhood-fv11.log")"
    grep -E "^src/styles/glass/grasp.css:13[0-5] " "$REC/neighbourhood-fv11.log" | cut -c1-160
  } 2>&1 | tee "$REC/crit.log"
  ;;
toolchain)
  # Floor v10 + the seat delta (the build rows 20 and FL-12 close on, if the critic upholds §4.3): typecheck, library
  # build, test typecheck, dist-demo, vitest --maxWorkers=2. Then the minor v9 + its seat delta's one test file.
  cd "$W"; clean || exit 3
  git apply "$FV10" && git apply "$P11/FV10-seat-proposed.diff" && echo "worktree = floor v10 + FV10-seat-proposed.diff"
  printf 'import base from "./vite.config";\nexport default { ...(base as object), cacheDir: ".cache-crit/vite" };\n' > vite.crit.config.ts
  printf 'import base from "./vitest.config";\nexport default { ...(base as object), cacheDir: ".cache-crit/vitest" };\n' > vitest.crit.config.ts
  printf 'import base from "./demo/vite.demo-dist.config";\nexport default { ...(base as object), cacheDir: ".cache-crit/vite-demo" };\n' > vite.critdemo.config.ts
  { npx vue-tsc --noEmit > "$REC/tsc-app.log" 2>&1; echo "typecheck app exit $? $(ts)"
    npx vite build --config vite.crit.config.ts > "$REC/libbuild.log" 2>&1; echo "library build exit $? $(ts)"
    npx vue-tsc --noEmit -p tsconfig.test.json > "$REC/tsc-test.log" 2>&1; echo "typecheck tests exit $? $(ts)"
    npx vite build --config vite.critdemo.config.ts > "$REC/demobuild.log" 2>&1; echo "dist-demo exit $? $(ts)"
    npx vitest run --config vitest.crit.config.ts --maxWorkers=2 > "$REC/units.log" 2>&1; echo "vitest exit $? $(ts)"
    grep -E "Test Files|Tests  " "$REC/units.log"
  } 2>&1 | tee "$REC/toolchain.log"
  git apply -R "$P11/FV10-seat-proposed.diff" && git apply -R "$FV10"
  git apply "$MS9" && git apply "$P11/MS9-seat-proposed.diff" && echo "worktree = minor v9 + MS9-seat-proposed.diff" | tee -a "$REC/toolchain.log"
  { npx vitest run --config vitest.crit.config.ts --maxWorkers=2 tests/styles/glass-subtlety.test.ts > "$REC/units-minor9s-subtlety.log" 2>&1; echo "vitest glass-subtlety on minor9s exit $? $(ts)"; grep -E "Test Files|Tests  " "$REC/units-minor9s-subtlety.log"; } 2>&1 | tee -a "$REC/toolchain.log"
  git apply -R "$P11/MS9-seat-proposed.diff" && git apply -R "$MS9"
  rm -f vite.crit.config.ts vitest.crit.config.ts vite.critdemo.config.ts
  clean && echo "back to HEAD" | tee -a "$REC/toolchain.log"
  ;;
teardown)
  { git -C "$R" worktree remove --force "$W"; git -C "$R" worktree prune; rm -rf "$B"
    rmdir "$R/.claude/worktrees/bl/D3/p11" 2>/dev/null
    echo "worktrees naming D3/p11/crit: $(git -C "$R" worktree list | grep -c 'D3/p11/crit')"; ls "$R/.claude/worktrees/bl/D3/"
  } 2>&1 | tee "$REC/teardown.log"
  ;;
esac
echo "== $phase end $(ts)" | tee -a "$REC/phases.log"
