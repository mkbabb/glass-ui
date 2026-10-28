#!/bin/zsh
# H7 (D5 pass 7): the worktree and the three builds the seat reads. Run under guarded. Builds and trees live inside the
# worktree (out/), which `git worktree remove --force` deletes at the seat's end.
#   head   HEAD's src (master; v10.1.1 not an ancestor; src = v10.1.0's bytes)
#   f5ppp  HEAD + F5ppp.patch (24cec509), the floor F5‴: the Sheet velocity reading (§P6-8.2)
#   cand6  HEAD + P-E6-noveil-coarse.patch (8f952538), the pass-6 candidate: the current construction the CK-20
#          clip-vanish cell must fail on, the arm-ii faces the PRM plant must reach
set -e
G=/Users/mkbabb/Programming/glass-ui
H=$G/docs/tranches/BL/design/engagement/harness
P6=$G/docs/tranches/BL/design/engagement/pass-6
S=$G/.claude/worktrees/bl/D5/p7/H7
WT=$S/wt; OUT=$WT/out
echo "build-h7 start $(date '+%F %T') load $(sysctl -n vm.loadavg)"
if [ ! -d $WT ]; then mkdir -p $S; git -C $G worktree add --detach $WT HEAD; fi
[ -e $WT/node_modules ] || ln -s $G/node_modules $WT/node_modules
[ -e $WT/tests-visual/node_modules ] || { [ -d $WT/tests-visual ] && ln -s $G/tests-visual/node_modules $WT/tests-visual/node_modules || true; }
echo "worktree at $(git -C $WT rev-parse --short HEAD); status: $(git -C $WT status --porcelain | wc -l | tr -d ' ') changed paths"
mk() { # label [patch]
  local L=$1 PATCH=$2
  if [ -n "$PATCH" ]; then shasum $PATCH; git -C $WT apply $PATCH; fi
  echo "== build $L $(date '+%T') load $(sysctl -n vm.loadavg)"
  node $H/build.mjs $WT --label $L --out $OUT
  rm -rf $OUT/trees/$L; mkdir -p $OUT/trees/$L; cp -R $WT/src $OUT/trees/$L/src
  if [ -n "$PATCH" ]; then git -C $WT apply -R $PATCH; fi
  echo "after $L: $(git -C $WT status --porcelain | grep -v '^?? out/' | wc -l | tr -d ' ') changed paths (0 = HEAD's bytes again)"
}
mk head
mk f5ppp $P6/F5ppp.patch
mk cand6 $P6/P-E6-noveil-coarse.patch
ls $OUT/builds
echo "build-h7 end $(date '+%F %T') load $(sysctl -n vm.loadavg)"
