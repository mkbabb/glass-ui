#!/bin/zsh
# fix 9 scratch: the D-1 per-frame probe, N repeats, on the branch and on a rev's src (restored after).
#   ~/.claude/guard/guarded --exclusive webkit --timeout 30 -- zsh docs/release-10.1.5/scripts/d1-probe-fix-9.sh webkit N rev...
set -u
ENGINE=$1; N=$2; shift 2
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/fix-9
export GLASS_UI_DEMO_PORT=5285
if [[ $ENGINE == webkit ]]; then CFG=(-c tests-visual/release-10-1-5-d1-probe.config.ts --project=webkit)
else CFG=(-c tests-visual/playwright.config.ts --project=chromium-headless-new); fi
trap 'git checkout HEAD -- src' EXIT INT TERM
run() { : > $L/d1probe-$1-$ENGINE.jsonl; PROBE_OUT=$WT/$L/d1probe-$1-$ENGINE.jsonl npx playwright test $CFG release-10-1-5-d1-probe.spec.ts --repeat-each=$N --workers=1 > $L/d1probe-$1-$ENGINE.log 2>&1; echo "d1probe-$1 $(wc -l < $L/d1probe-$1-$ENGINE.jsonl)"; }
run branch
for rev in $@; do
  files=(${(f)"$(git diff --name-only --diff-filter=M $rev HEAD -- src)"})
  git checkout $rev -- $files; sleep 3; run $rev; git checkout HEAD -- $files; sleep 3
done
git status --short src
