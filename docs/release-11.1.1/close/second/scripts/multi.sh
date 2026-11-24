#!/bin/zsh
# The 11.1.1 second close: several suite chunks in one guarded call, in order, each its own
# Playwright process on its own server (suite.sh). ROOT names the tree (a full git-archive tree).
#   multi.sh <chunk>...   chunks: ch-<list> | co-<list> | wk-proj | wk-rel   (<list> names close/lists/<list>)
#                         | res-<name> (a resolution job, scripts/jobs/res-<name>.sh)
set -u
C=${0:A:h:h}; S=$C/scripts; LI=${C:h}/lists
CFG=tests-visual/playwright.config.ts; WCFG=tests-visual/webkit-2287.config.ts; RCFG=tests-visual/release-11-0-1.config.ts
echo "$(date '+%F %T') multi start: $*"
for c in $@; do
  case $c in
    wk-proj) zsh $S/suite.sh $c 5354 $WCFG webkit $LI/wk-proj.txt;;
    wk-rel) zsh $S/suite.sh $c 5354 $RCFG webkit $LI/wk-rel.txt;;
    ch-*) zsh $S/suite.sh $c 5353 $CFG chromium-headless-new $LI/${c#ch-};;
    co-*) zsh $S/suite.sh $c 5353 $CFG coarse-touch $LI/${c#co-};;
    res-*) zsh $S/jobs/$c.sh;;
  esac
  echo "$(date '+%F %T') $c rc=$?"
done
echo "$(date '+%F %T') multi done: $*"
