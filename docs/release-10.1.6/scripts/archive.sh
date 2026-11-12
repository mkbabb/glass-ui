#!/bin/zsh
# 10.1.6 close: a `git archive <rev>` tree at .cache/r1016/<name> that stands for CI's fresh
# checkout: its own one-commit repo with the rev's file list, then the install symlinked in.
# With OVERLAY=1 the branch's forced-colors witness files are copied in (for the v10.1.5 RED arm).
#   zsh docs/release-10.1.6/scripts/archive.sh <rev> <name>
set -eu
WT=${0:A:h:h:h:h}
REV=$1; A=$WT/.cache/r1016/$2
rm -rf $A; mkdir -p $A
git -C $WT archive $REV | tar -x -C $A
if [[ ${OVERLAY:-0} = 1 ]]; then
  for f in tests-visual/slider-forced-colors.spec.ts tests-visual/slider-forced-colors/harness.html \
           tests-visual/slider-forced-colors/harness.ts tests-visual/release-10-1-6.config.ts; do
    mkdir -p $A/${f:h}; git -C $WT show HEAD:$f > $A/$f
  done
fi
cd $A
git init -q && git add -A -f && git -c user.name=close -c user.email=close@localhost commit -q -m "archive of $(git -C $WT rev-parse --short $REV)"
ln -s $WT/node_modules node_modules
ln -s $WT/tests-visual/node_modules tests-visual/node_modules
echo "archive $2 rev=$(git -C $WT rev-parse --short $REV) files=$(git ls-files | wc -l | tr -d ' ') rev-files=$(git -C $WT ls-tree -r --name-only $REV | wc -l | tr -d ' ')"
