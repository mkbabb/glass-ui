#!/usr/bin/env bash
# H10-setup.sh · D3 pass 10, H10: the worktree and the trees H10's static checks and the H6..H10 self-test read. One
# worktree (.claude/worktrees/bl/D3/p10/H10/wt), cut at HEAD with node_modules symlinked, used only to apply each banked
# patch and copy what DEL and SWEEP read into $B/trees/<name> (src/ demo/ tests/ docs/canon/ and the root *.md) or
# $B/h7trees/<name> (src/ demo/, H7's scope). Each swap is cmp-checked against its patch and reversed to a clean status.
# fv8 is the REAL floor v8 (pass-9/floor-v8.patch); H9's scratch stand-in is kept apart as trees/fv8stand.
# minor7p is the minor v7 + MS7-r21b-proposed.diff (MS7-run.sh's cut, the tree MS7-rulings-proposed.json reads).
# Run each step under ~/.claude/guard/guarded --light (no browser, no build).
#   bash H10-setup.sh setup|fixture|teardown
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p10/H10
W=$B/wt
M=$R/docs/tranches/BL/design/material
REC=$M/pass-10/H10-records
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
echo "== $1 start $(ts)" | tee -a "$REC/phases.log"
clean() { test -z "$(git -C "$W" status --porcelain -- src demo tests docs DESIGN.md)"; }
copyout() { rm -rf "$B/trees/$1"; mkdir -p "$B/trees/$1/docs" && cp -R "$W/src" "$W/demo" "$W/tests" "$B/trees/$1/" && cp -R "$W/docs/canon" "$B/trees/$1/docs/" && cp "$W"/*.md "$B/trees/$1/"; }
h7copy() { rm -rf "$B/h7trees/$1"; mkdir -p "$B/h7trees/$1" && cp -R "$W/src" "$W/demo" "$B/h7trees/$1/"; }
swap() { # name patch copier: apply, cmp-check, copy, reverse, check clean
  clean || { echo "worktree not clean before $2"; exit 3; }
  git -C "$W" apply "$M/$2" && git -C "$W" diff HEAD --binary | cmp - "$M/$2" && echo "worktree = $2" || exit 3
  $3 "$1"
  git -C "$W" apply -R "$M/$2" && clean && echo "back to HEAD" || exit 3
}
case $1 in
setup)
  mkdir -p "$B/trees" "$B/h7trees"; git -C "$R" worktree add --detach "$W" HEAD; ln -s "$R/node_modules" "$W/node_modules"
  echo "worktree HEAD $(git -C "$W" rev-parse --short HEAD)"
  git -C "$W" diff --stat 1da7eb17b HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon | tail -1; echo "(source diff since 1da7eb17b above; empty = the published 10.1.0 source)"
  for p in fv6:pass-7/floor-v6.patch fv7:pass-8/floor-v7.patch minor6:pass-8/minor-split-v6.patch minor7:pass-9/minor-split-v7.patch; do swap "${p%%:*}" "${p#*:}" copyout; done
  for p in fv4:pass-5/floor-v4.patch fv5:pass-6/floor-v5.patch minor4:pass-6/minor-split-v4.patch minor5:pass-7/minor-split-v5.patch minor6:pass-8/minor-split-v6.patch minor7:pass-9/minor-split-v7.patch; do swap "${p%%:*}" "${p#*:}" h7copy; done
  # minor7p: the minor v7 with the proposed R-21 (b) delta on top.
  clean && git -C "$W" apply "$M/pass-9/minor-split-v7.patch" && git -C "$W" apply "$M/pass-9/MS7-r21b-proposed.diff" && echo "worktree = minor v7 + MS7-r21b-proposed.diff" || exit 3
  copyout minor7p
  git -C "$W" apply -R "$M/pass-9/MS7-r21b-proposed.diff" && git -C "$W" apply -R "$M/pass-9/minor-split-v7.patch" && clean && echo "back to HEAD" || exit 3
  ;;
fixture)
  # H8's and H7's fixtures (fv6fix, fv5fix, minor4fix) exactly as H9-setup.sh `fixture` wrote them; H9-fixtures.py also
  # writes its floor v8 stand-in over trees/fv8, so the stand-in moves to fv8stand and the real floor v8 is cut after.
  rm -rf "$B/trees/fv6fix" "$B/h7trees/fv5fix" "$B/h7trees/minor4fix" "$B/trees/fv8" "$B/trees/fv8stand"
  cp -R "$B/trees/fv6" "$B/trees/fv6fix"; cp -R "$B/h7trees/fv5" "$B/h7trees/fv5fix"; cp -R "$B/h7trees/minor4" "$B/h7trees/minor4fix"
  python3 -I "$M/pass-9/H9-fixtures.py" "$B" && mv "$B/trees/fv8" "$B/trees/fv8stand" && echo "H9 fixtures written; stand-in at trees/fv8stand"
  swap fv8 pass-9/floor-v8.patch copyout
  ls "$B/trees" "$B/h7trees"
  ;;
teardown)
  git -C "$R" worktree remove --force "$W"; rm -rf "$B"; git -C "$R" worktree prune; rmdir "$R/.claude/worktrees/bl/D3/p10" 2>/dev/null; ls "$R/.claude/worktrees/bl/D3/"
  ;;
esac
echo "== $1 end $(ts)" | tee -a "$REC/phases.log"
