#!/bin/zsh
# 10.1.5 re-close: a `git archive HEAD` tree at .cache/reclose/archive that stands for CI's fresh
# checkout. It gets its own one-commit repo with the branch's file list (the comment census reads
# git HEAD), then the install symlinked in (npm ci's stand-in; links made after the commit).
#   zsh docs/release-10.1.5/scripts/reclose-archive.sh
set -eu
WT=${0:A:h:h:h:h}
A=$WT/.cache/reclose/archive
rm -rf $A; mkdir -p $A
git -C $WT archive HEAD | tar -x -C $A
cd $A
git init -q && git add -A && git -c user.name=reclose -c user.email=reclose@localhost commit -q -m "archive of $(git -C $WT rev-parse --short HEAD)"
ln -s $WT/node_modules node_modules
ln -s $WT/tests-visual/node_modules tests-visual/node_modules
echo "archive $(git -C $WT rev-parse --short HEAD) files=$(git ls-files | wc -l | tr -d ' ') branch-files=$(git -C $WT ls-files | wc -l | tr -d ' ')"
