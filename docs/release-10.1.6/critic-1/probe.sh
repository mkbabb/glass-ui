#!/bin/zsh
# 10.1.6 critic 1: the critic spec and the committed witness over three trees in ONE
# engine, one Playwright process at a time (v10.1.4 on 5361, v10.1.5 on 5362, the branch
# on 5363).
#   ~/.claude/guard/guarded --timeout 40 -- zsh docs/release-10.1.6/critic-1/probe.sh ch
#   ~/.claude/guard/guarded --exclusive webkit --timeout 40 -- zsh docs/release-10.1.6/critic-1/probe.sh wk
set -u
WT=${0:A:h:h:h:h}
cd $WT
E=$1; C=docs/release-10.1.6/critic-1; S=$C/cell.sh
case $E in
  ch) P=chromium-headless-new; WCFG=tests-visual/playwright.config.ts;;
  co) P=coarse-touch; WCFG=tests-visual/playwright.config.ts;;
  wk) P=webkit; WCFG=tests-visual/release-10-1-6.config.ts;;
esac
for t in "tip . 5363" "v1015 .cache/r1016c/v1015 5362" "v1014 .cache/r1016c/v1014 5361"; do
  set -- ${=t}
  zsh $S critic-$1-$E $2 $3 $C/critic-1.config.ts $P
  zsh $S witness-$1-$E $2 $3 $WCFG $P tests-visual/slider-forced-colors.spec.ts
done
exit 0
