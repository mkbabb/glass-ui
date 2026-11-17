#!/bin/bash
# Critic 5: one witness run, as the exits gate runs a part, with its own report.
#   run.sh <branch|red> <project> <log name> <grep> [extra playwright args]
# A red run (v11.1.0: the git-archive tree at .cache/red-v11.1.0/tree, its src, demo,
# package files and configs checked equal to a fresh `git archive v11.1.0`) copies the
# 11.1.1 specs, config, harnesses and the restated radius-scale spec into that tree first,
# so the same cells read that tree's source.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/critic-5/logs
G=~/.claude/guard/guarded
case $1 in
  branch) T=$W; P=5353 ;;
  red) T=$W/.cache/red-v11.1.0/tree; P=5354
       mkdir -p $T/tests-visual/release-11-1-1
       cp $W/tests-visual/release-11-1-1*.ts $W/tests-visual/radius-scale.spec.ts $T/tests-visual/
       cp $W/tests-visual/release-11-1-1/* $T/tests-visual/release-11-1-1/ ;;
esac
case $2 in webkit-*) EX="--exclusive webkit" ;; *) EX="" ;; esac
cd $T && GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$3.json \
  $G $EX --timeout 60 -- npx playwright test -c tests-visual/release-11-1-1.config.ts --project=$2 --workers=1 -g "$4" ${5:-} > $L/$3.log 2>&1
rc=$?
echo "$(date +%T) $3 exit $rc load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/$3.log | tr -s ' ' | tr '\n' ' ')" >> $L/runs.out
