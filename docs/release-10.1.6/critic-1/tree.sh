#!/bin/zsh
# 10.1.6 critic 1: a `git archive <rev>` tree at .cache/r1016c/<name>, its own one-commit
# repo, with the install symlinked in. OVERLAY=1 copies in the critic directory and the
# committed forced-colors witness (for the v10.1.4 and v10.1.5 arms).
#   zsh docs/release-10.1.6/critic-1/tree.sh <rev> <name>
set -eu
WT=${0:A:h:h:h:h}
REV=$1; A=$WT/.cache/r1016c/$2
rm -rf $A; mkdir -p $A
git -C $WT archive $REV | tar -x -C $A
if [[ ${OVERLAY:-0} = 1 ]]; then
  for f in tests-visual/slider-forced-colors.spec.ts tests-visual/slider-forced-colors/harness.html \
           tests-visual/slider-forced-colors/harness.ts tests-visual/release-10-1-6.config.ts; do
    mkdir -p $A/${f:h}; git -C $WT show HEAD:$f > $A/$f
  done
  mkdir -p $A/docs/release-10.1.6/critic-1
  cp $WT/docs/release-10.1.6/critic-1/{harness.html,harness.ts,critic-1.spec.ts,critic-1.config.ts} $A/docs/release-10.1.6/critic-1/
fi
cd $A
git init -q && git add -A -f && git -c user.name=critic -c user.email=critic@localhost commit -q -m "archive of $(git -C $WT rev-parse --short $REV)"
ln -s $WT/node_modules node_modules
ln -s $WT/tests-visual/node_modules tests-visual/node_modules
echo "tree $2 rev=$(git -C $WT rev-parse --short $REV) files=$(git ls-files | wc -l | tr -d ' ') rev-files=$(git -C $WT ls-tree -r --name-only $REV | wc -l | tr -d ' ')"
