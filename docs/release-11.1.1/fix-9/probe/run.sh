#!/bin/bash
# Fix seat 9 probe run: run.sh <commit|branch> <project> <log name>
# Copies the probe into the worktree's tests-visual/fix9-probe/ with the film module of the
# named commit (or the worktree's own), runs it through the guard on port 5354, and removes
# the copy.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$W/docs/release-11.1.1/fix-9/probe
L=$W/docs/release-11.1.1/fix-9/logs
T=$W/tests-visual/fix9-probe
case $2 in webkit-*) EX=(--exclusive webkit) ;; *) EX=() ;; esac
rm -rf $T && mkdir -p $T && cp $D/*.probe.ts $D/probe.config.ts $T/
if [[ $1 == branch ]]; then cp $W/tests-visual/release-11-1-1/film.ts $T/film.ts
else git -C $W show "$1:tests-visual/release-11-1-1/film.ts" > $T/film.ts; fi
start=$(date +%s)
cd $W/tests-visual && GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=5354 GLASS_UI_DEMO_URL=http://localhost:5354 PI_REPORT=$L/$3.json \
  ~/.claude/guard/guarded "${EX[@]}" --timeout 20 -- npx playwright test -c fix9-probe/probe.config.ts --project=$2 --workers=1 > $L/$3.log 2>&1
rc=$?
rm -rf $T
echo "$(date +%T) $3 probe film@$1 $2 exit $rc $(( $(date +%s) - start ))s load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/$3.log | tr -s ' ' | tr '\n' ' ')" >> $L/runs.out
