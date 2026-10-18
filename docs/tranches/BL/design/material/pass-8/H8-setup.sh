#!/usr/bin/env bash
# H8-setup.sh · D3 pass 8, H8: the worktree and the trees H8's static checks read. One worktree
# (.claude/worktrees/bl/D3/p8/H8/wt), used only to apply each patch and copy what DEL's H8-1 scope reads
# (src/, demo/, tests/, docs/canon/, the repo-root *.md) into $B/trees/<name>; each swap checked with cmp and a clean
# status. Run under guarded --light (no browser, no build).
#   bash H8-setup.sh setup|teardown
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p8/H8
W=$B/wt
M=$R/docs/tranches/BL/design/material
REC=$M/pass-8/H8-records
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
echo "== $1 start $(ts)" | tee -a "$REC/phases.log"
copyout() { mkdir -p "$B/trees/$1/docs" && cp -R "$W/src" "$W/demo" "$W/tests" "$B/trees/$1/" && cp -R "$W/docs/canon" "$B/trees/$1/docs/" && cp "$W"/*.md "$B/trees/$1/"; }
case $1 in
setup)
  mkdir -p "$B/trees"; git -C "$R" worktree add --detach "$W" HEAD; ln -s "$R/node_modules" "$W/node_modules"
  for p in fv6:pass-7/floor-v6.patch fv5:pass-6/floor-v5.patch minor5:pass-7/minor-split-v5.patch; do
    git -C "$W" apply "$M/${p#*:}" && git -C "$W" diff HEAD --binary | cmp - "$M/${p#*:}" && echo "worktree = ${p#*:}"
    copyout "${p%%:*}"
    git -C "$W" apply -R "$M/${p#*:}" && test -z "$(git -C "$W" status --porcelain)" && echo "back to HEAD"
  done
  copyout head
  bash "$0" fixture
  ;;
fixture)
  # The fixture: floor v6 with forms-seam.test.ts's two passages rewritten as R-17 (i) orders, and the one sentence
  # H8-1's value arm finds beyond them (liquid-fill.css:74 quotes the quiet radius at HEAD's 14px; floor v6's is 10px).
  # A scratch copy; the floor v7 seat owns the wording.
  rm -rf "$B/trees/fv6fix"; cp -R "$B/trees/fv6" "$B/trees/fv6fix"
  python3 -I - "$B/trees" <<'PY'
import sys
B = sys.argv[1]
def sub(f, old, new):
    p = f"{B}/{f}"; s = open(p).read(); assert s.count(old) == 1, (f, old); open(p, "w").write(s.replace(old, new))
F = "fv6fix/tests/components/field/forms-seam.test.ts"
sub(F, " *   · G-F2's `bg α < 1.0` + `field L* ≤ page L* − 3` halves — both resolve\n *     `--input-on-glass`, which is #22 W-FROST's token (§9 row 2, \"both or\n *     nothing paints\"). The other half",
       " *   · G-F2's `bg α < 1.0` + `field L* ≤ page L* − 3` halves — both resolve\n *     the field well, `--control-surface-bg: var(--glass-well)`, which the\n *     check below reads. The other half")
sub(F, "the perimeter rides the 0.48 ink rung and the well is a real inset (fill α fenced on W-FROST)",
       "the perimeter rides the `--ink-perimeter` rung and the well is a real inset")
sub("fv6fix/src/styles/glass/liquid-fill.css", "rung (the 14px radius that SCALES by", "rung (its radius SCALES by")
PY
  ;;
h7trees)
  # The H6/H7 self-test rows' real trees, built as H7-run.sh `setup` built them: src/ and demo/ only (H7's rows read
  # that scope; H8-1's tests/ arm is read on the fv6 trees above), with H7's fixture edits (H7.md §2.2, §2.3).
  mkdir -p "$B/h7trees"
  for p in fv4:pass-5/floor-v4.patch fv5:pass-6/floor-v5.patch minor4:pass-6/minor-split-v4.patch minor5:pass-7/minor-split-v5.patch; do
    git -C "$W" apply "$M/${p#*:}" && git -C "$W" diff HEAD --binary | cmp - "$M/${p#*:}" && echo "worktree = ${p#*:}"
    mkdir -p "$B/h7trees/${p%%:*}" && cp -R "$W/src" "$W/demo" "$B/h7trees/${p%%:*}/"
    git -C "$W" apply -R "$M/${p#*:}" && test -z "$(git -C "$W" status --porcelain)" && echo "back to HEAD"
  done
  cp -R "$B/h7trees/fv5" "$B/h7trees/fv5fix"; cp -R "$B/h7trees/minor4" "$B/h7trees/minor4fix"
  python3 -I - "$B/h7trees" <<'PY'
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
PY
  ;;
teardown)
  git -C "$R" worktree remove --force "$W"; rm -rf "$B"; git -C "$R" worktree prune; rmdir "$R/.claude/worktrees/bl/D3/p8" 2>/dev/null; ls "$R/.claude/worktrees/bl/D3/"
  ;;
esac
echo "== $1 end $(ts)" | tee -a "$REC/phases.log"
