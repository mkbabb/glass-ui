#!/usr/bin/env bash
# H7-run.sh · D3 pass 7, H7: every command this seat ran, by phase. No build, no browser, no capture: H7-1 re-scores the
# pass-6 critic's banked M-3 records and lays its self-test captures out from banked pixels; H7-2 and H7-3 are static.
# One worktree (.claude/worktrees/bl/D3/p7/H7/wt), used only to apply each patch and copy its src/ and demo/ into
# $B/trees (fv4, fv5, minor4, head); each swap checked with cmp. Removed in `teardown`.
#   bash H7-run.sh setup|static|selftest|plantrows|rescore|teardown   (each phase runs under guarded --light)
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p7/H7
W=$B/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
P7=$M/pass-7
REC=$P7/H7-records
C=$M/pass-6/crit-records
G="$HOME/.claude/guard/guarded --light --timeout 15 --"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
echo "== $1 start $(ts)" | tee -a "$REC/phases.log"
case $1 in
setup)
  mkdir -p "$B/trees"; git -C "$R" worktree add --detach "$W" HEAD; ln -s "$R/node_modules" "$W/node_modules"
  for p in fv5:pass-6/floor-v5.patch minor4:pass-6/minor-split-v4.patch fv4:pass-5/floor-v4.patch; do
    git -C "$W" apply "$M/${p#*:}" && git -C "$W" diff HEAD --binary | cmp - "$M/${p#*:}" && echo "worktree = ${p#*:}"
    mkdir -p "$B/trees/${p%%:*}" && cp -R "$W/src" "$W/demo" "$B/trees/${p%%:*}/"
    git -C "$W" apply -R "$M/${p#*:}" && test -z "$(git -C "$W" status --porcelain -- src demo tests)" && echo "back to HEAD"
  done
  mkdir -p "$B/trees/head" && cp -R "$W/src" "$W/demo" "$B/trees/head/"
  # The fixture trees: floor v5 with its five stale sentences rewritten name-free, the minor v4 with R-16 (i)'s two
  # rewrites (H7.md §2.2 and §2.3 list each edit; scratch copies only, never a source edit).
  cp -R "$B/trees/fv5" "$B/trees/fv5fix"; cp -R "$B/trees/minor4" "$B/trees/minor4fix"
  python3 - "$B/trees" <<'EOF'
import sys
B = sys.argv[1]
def sub(f, old, new):
    p = f"{B}/{f}"; s = open(p).read(); assert s.count(old) == 1, (f, old); open(p, "w").write(s.replace(old, new))
F = "fv5fix"
sub(f"{F}/src/components/dock/README.md", "owns the plate, orientation, collapse state, overflow, and backdrop mode.", "owns the plate, orientation, collapse state, and overflow.")
sub(f"{F}/demo/stories/dock/dock-search.vue", "rides the morph; adaptive tinting\n                             keeps its text contrast at or above 4.5:1.", "rides the morph; the field reads the\n                             floating rung at the bound, which keeps its text contrast at or above 4.5:1.")
sub(f"{F}/demo/stories/substrates/glass-material.vue", "the three\n// SOTA folds (squircle, chromatic fringe, adaptive tint) ride that", "the\n// SOTA folds ride that")
sub(f"{F}/src/styles/glass/overlay-plate.css", "There is no adaptive-tint layer and no", "There is no second tint layer and no")
sub(f"{F}/demo/stories/compositions/auth-shell.vue", "cannot inherit the glass\n   backdrop bucket.", "cannot inherit the glass\n   ladder's ink.")
M = "minor4fix"
sub(f"{M}/src/components/dock/styles/adaptive-legibility.css", "The PLATE half — the earned\n * darken off the measured backdrop luminance — is composed", "The PLATE half — the earned\n * ink (darker in dark, a thicker cream pole in light) — is composed")
sub(f"{M}/src/styles/glass/overlay-plate.css", "the veil already carries the earned\n       darken, and", "the veil already carries the earned\n       ink (darker in dark, a thicker cream pole in light), and")
EOF
  ;;
static)
  cd "$H"
  $G node launch-law.mjs > "$REC/law.log" 2>&1; echo "LAW exit $?"
  for t in fv4 fv5 fv5fix head; do $G node deleted-mechanisms.mjs --root "$B/trees/$t" --declare deletes-floor.json > "$REC/del-floor-$t.log" 2>&1; echo "DEL floor $t exit $?"; done
  for t in minor4 minor4fix; do $G node deleted-mechanisms.mjs --root "$B/trees/$t" --declare deletes-minor.json > "$REC/del-minor-$t.log" 2>&1; echo "DEL minor $t exit $?"; done
  $G node declare-removed.mjs --patch ../pass-6/floor-v5.patch --root "$B/trees/fv5" --concepts deletes-floor.json --exact "$P7/H7-exact-floor-v5.json" --out "$REC/declare-floor-v5.json" > "$REC/declare-floor-v5.log" 2>&1; echo "declare exit $?"
  for t in fv5 fv5fix; do $G node deleted-mechanisms.mjs --root "$B/trees/$t" --declare "$REC/declare-floor-v5.json" > "$REC/del-derived-$t.log" 2>&1; echo "DEL derived $t exit $?"; done
  ;;
selftest)
  cd "$H"
  D3_OUT=$B/out $G node selftest.mjs --only H7-1,H7-2,H7-3 --h7-trees "$B/trees" --h7-decl "$REC/declare-floor-v5.json" > "$REC/selftest-h7.log" 2>&1; echo "selftest H7 exit $?"
  D3_OUT=$B/out $G node selftest.mjs --only LAW,DEL,H7-1,H7-2,H7-3 --tree "$B/trees/fv4" --h7-trees "$B/trees" --h7-decl "$REC/declare-floor-v5.json" > "$REC/selftest-static-h7-run2.log" 2>&1; echo "selftest static exit $?"
  ;;
plantrows)
  cd "$H"
  $G bash -c 'for n in h7-fv5-ring h7-head-ring h7-alpha40-ring h7-1px-ring h7-straight-ring h7-perimeter; do echo "== $n"; node m3-non-text.mjs "'"$B"'/out/selftest/caps/$n" --gate chromium --verbose --cells "^chromium light paper dialog$" | grep -E "·(ring|perimeter):|^(PASS|FAIL)"; done; echo
    node "'"$P7"'/h7-cols.mjs" "'"$B"'"/out/selftest/caps/h7-{fv5,head,alpha40,1px}-ring' > "$REC/h7-1-plant-rows.log" 2>&1
  ;;
rescore)
  cd "$P7"; O=H7-records/rescore
  for n in "" -run2 -run3; do $G bash -c "
    node h7-rescore.mjs --verbose $C/verbose/m3-fv5.txt --apex $C/ringapex-fv5-chromium.log,$C/ringapex-fv5-webkit.log --label fv5 --out $O
    node h7-rescore.mjs --verbose $C/verbose/m3-minor4.txt --apex $C/ringapex-minor4-chromium.log,$C/ringapex-minor4-webkit.log --label minor4 --out $O
    node h7-rescore.mjs --verbose $C/verbose/m3-head.txt --apex $C/ringapex-head-chromium.log --label head --out $O
    for l in fv5 minor4 head; do echo \"== diff m3-\$l-H6-verdicts.txt m3-\$l-H7-verdicts.txt\"; diff $O/m3-\$l-H6-verdicts.txt $O/m3-\$l-H7-verdicts.txt; echo \"(diff exit \$?)\"; done" > "$REC/rescore$n.log" 2>&1; done
  cmp "$REC/rescore.log" "$REC/rescore-run2.log" && cmp "$REC/rescore.log" "$REC/rescore-run3.log" && echo "rescore identical x3"
  ;;
teardown)
  git -C "$R" worktree remove --force "$W"; rm -rf "$B"; git -C "$R" worktree prune; ls "$R/.claude/worktrees/bl/D3/"
  ;;
esac
echo "== $1 end $(ts)" | tee -a "$REC/phases.log"
