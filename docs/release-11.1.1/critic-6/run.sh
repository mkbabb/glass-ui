#!/bin/bash
# Critic 6: one part of the exits gate, as gate.sh runs it (its own server, never a
# server it did not start), with its own report.
#   run.sh <branch|red> <project> <part 0-3> <log name>
# red is v11.1.0: the git-archive tree at .cache/red-v11.1.0/tree (its src, demo,
# scripts, tests, package files, vite and tsconfig files and the two base Playwright
# configs checked equal to a fresh `git archive v11.1.0`), with the tip's 11.1.1 specs,
# config and harnesses copied in, so the same cells read that tree's source.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/critic-6/logs
G=~/.claude/guard/guarded
parts=(
    "(form|glass|exit|routes|round|weight|lift) · "
    "(reverse|tooltip|expand|leave) · "
    "standing · "
    "(site|fade|fold|mark|press|still) · "
)
case $1 in
  branch) T=$W; P=5351 ;;
  red) T=$W/.cache/red-v11.1.0/tree; P=5352
       mkdir -p $T/tests-visual/release-11-1-1
       cp $W/tests-visual/release-11-1-1*.ts $T/tests-visual/
       cp $W/tests-visual/release-11-1-1/* $T/tests-visual/release-11-1-1/ ;;
esac
case $2 in webkit-*) EX=(--exclusive webkit) ;; *) EX=() ;; esac
start=$(date +%s)
cd $T/tests-visual && GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$4.json \
  $G "${EX[@]}" --timeout 60 -- npx playwright test -c release-11-1-1.config.ts --project=$2 --workers=1 -g "${parts[$3]}" > $L/$4.log 2>&1
rc=$?
echo "$(date +%T) $4 $1 $2 part$3 exit $rc $(( $(date +%s) - start ))s load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $L/$4.log | tr -s ' ' | tr '\n' ' ')" >> $L/runs.out
