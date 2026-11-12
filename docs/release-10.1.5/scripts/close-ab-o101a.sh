#!/bin/zsh
# 10.1.5 release close: release-10-1-2's O-101a cells (a host change during the morph), branch and v10.1.4,
# 6 repeats each, Chromium then WebKit 2287; each arm its own guarded call; a refusal stops (exit 3).
#   zsh docs/release-10.1.5/scripts/close-ab-o101a.sh
set -u
WT=${0:A:h:h:h:h}
cd $WT
S=docs/release-10.1.5/scripts; L=docs/release-10.1.5/close/ab; G=~/.claude/guard/guarded; B=.cache/close/v1014
mkdir -p $L
GREP='O-101a'
arm() { local tag=$1; shift; "$@" > $L/$tag.guard.log 2>&1; local rc=$?
  if grep -q REFUSED $L/$tag.guard.log; then echo "$(date '+%F %T') STOP: refused at $tag" | tee -a $L/ab.txt; exit 3; fi; }
arm o101a-branch-ch $G --timeout 30 -- zsh $S/close-cell.sh o101a-branch-ch . 5311 tests-visual/playwright.config.ts chromium-headless-new release-10-1-2.spec.ts "$GREP" 6
arm o101a-v1014-ch $G --timeout 30 -- zsh $S/close-cell.sh o101a-v1014-ch $B 5312 tests-visual/playwright.config.ts chromium-headless-new release-10-1-2.spec.ts "$GREP" 6
arm o101a-branch-wk $G --exclusive webkit --timeout 30 -- zsh $S/close-cell.sh o101a-branch-wk . 5313 tests-visual/webkit-2287.config.ts webkit release-10-1-2.spec.ts "$GREP" 6
arm o101a-v1014-wk $G --exclusive webkit --timeout 30 -- zsh $S/close-cell.sh o101a-v1014-wk $B 5314 tests-visual/webkit-2287.config.ts webkit release-10-1-2.spec.ts "$GREP" 6
