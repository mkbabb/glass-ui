#!/bin/zsh
# 10.1.6 critic 1: the release-10-1-5 spec in WebKit a second time, after the first run's
# one failure (a `page.goto` that never loaded, test 90). The failed title three times,
# then the whole spec.
#   ~/.claude/guard/guarded --exclusive webkit --timeout 75 -- zsh docs/release-10.1.6/critic-1/r5-wk2.sh
set -u
WT=${0:A:h:h:h:h}
cd $WT
C=docs/release-10.1.6/critic-1; R5=tests-visual/release-10-1-5.spec.ts
zsh $C/cell.sh r5-wk-t90 . 5364 tests-visual/webkit-2287.config.ts webkit "$R5 --repeat-each=3 -g nested..dock-run.group.keeps.each.hovered"
zsh $C/cell.sh r5-wk2 . 5364 tests-visual/webkit-2287.config.ts webkit $R5
