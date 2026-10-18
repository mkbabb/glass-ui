#!/usr/bin/env bash
# H9-setup.sh · D3 pass 9, H9: the worktree and the trees H9's static checks read. One worktree
# (.claude/worktrees/bl/D3/p9/H9/wt), used only to apply each patch and copy what DEL reads (src/, demo/, tests/,
# docs/canon/, the repo-root *.md) into $B/trees/<name>; each swap checked with cmp and a clean status. The H6/H7 rows'
# trees (src/ and demo/ only, H7's scope) go to $B/h7trees as H8-setup.sh built them. Run under guarded --light
# (no browser, no build).
#   bash H9-setup.sh setup|fixture|teardown
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p9/H9
W=$B/wt
M=$R/docs/tranches/BL/design/material
REC=$M/pass-9/H9-records
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
echo "== $1 start $(ts)" | tee -a "$REC/phases.log"
copyout() { mkdir -p "$B/trees/$1/docs" && cp -R "$W/src" "$W/demo" "$W/tests" "$B/trees/$1/" && cp -R "$W/docs/canon" "$B/trees/$1/docs/" && cp "$W"/*.md "$B/trees/$1/"; }
swap() { # name patch → applies, cmp-checks, runs $3 (copy), reverses, checks clean
  git -C "$W" apply "$M/$2" && git -C "$W" diff HEAD --binary | cmp - "$M/$2" && echo "worktree = $2"
  $3 "$1"
  git -C "$W" apply -R "$M/$2" && test -z "$(git -C "$W" status --porcelain)" && echo "back to HEAD"
}
h7copy() { mkdir -p "$B/h7trees/$1" && cp -R "$W/src" "$W/demo" "$B/h7trees/$1/"; }
case $1 in
setup)
  mkdir -p "$B/trees" "$B/h7trees"; git -C "$R" worktree add --detach "$W" HEAD; ln -s "$R/node_modules" "$W/node_modules"
  for p in fv6:pass-7/floor-v6.patch fv7:pass-8/floor-v7.patch minor6:pass-8/minor-split-v6.patch minor5:pass-7/minor-split-v5.patch; do swap "${p%%:*}" "${p#*:}" copyout; done
  copyout head
  for p in fv4:pass-5/floor-v4.patch fv5:pass-6/floor-v5.patch minor4:pass-6/minor-split-v4.patch minor5:pass-7/minor-split-v5.patch minor6:pass-8/minor-split-v6.patch; do swap "${p%%:*}" "${p#*:}" h7copy; done
  ;;
fixture)
  # H8's fixtures, rebuilt exactly as H8-setup.sh `fixture` and `h7trees` wrote them (fv6fix, fv5fix, minor4fix).
  rm -rf "$B/trees/fv6fix" "$B/h7trees/fv5fix" "$B/h7trees/minor4fix"
  cp -R "$B/trees/fv6" "$B/trees/fv6fix"; cp -R "$B/h7trees/fv5" "$B/h7trees/fv5fix"; cp -R "$B/h7trees/minor4" "$B/h7trees/minor4fix"
  python3 -I "$M/pass-9/H9-fixtures.py" "$B"
  ;;
teardown)
  git -C "$R" worktree remove --force "$W"; rm -rf "$B"; git -C "$R" worktree prune; rmdir "$R/.claude/worktrees/bl/D3/p9" 2>/dev/null; ls "$R/.claude/worktrees/bl/D3/"
  ;;
esac
echo "== $1 end $(ts)" | tee -a "$REC/phases.log"
