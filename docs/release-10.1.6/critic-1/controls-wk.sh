#!/bin/zsh
# 10.1.6 critic 1: the control rows again in WebKit over the three trees, focused with
# Option+Tab (plain Tab skips buttons there). Records go to out/controls-<tree>-wk.json.
#   ~/.claude/guard/guarded --exclusive webkit --timeout 30 -- zsh docs/release-10.1.6/critic-1/controls-wk.sh
set -u
WT=${0:A:h:h:h:h}
cd $WT
C=docs/release-10.1.6/critic-1
for t in "tip . 5363" "v1015 .cache/r1016c/v1015 5362" "v1014 .cache/r1016c/v1014 5361"; do
  set -- ${=t}
  zsh $C/cell.sh controls-$1-wk $2 $3 $C/critic-1.config.ts webkit "-g control"
done
exit 0
