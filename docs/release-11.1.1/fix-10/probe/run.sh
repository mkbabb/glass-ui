#!/bin/bash
# Fix seat 10 probe run: run.sh <commit|branch> <project> <log name>
# Copies the probe into the worktree's tests-visual/fix10-probe/ with the film module of the
# named commit (or the worktree's own), runs it through the guard on port 5354, and removes
# the copy. The probe writes a tsconfig.json under the worktree's .cache, which reloads every
# page any Vite dev server watching this checkout serves, so it refuses to run while a dev
# server other than its own is rooted at the worktree or the main checkout.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
M=/Users/mkbabb/Programming/glass-ui
D=$W/docs/release-11.1.1/fix-10/probe
L=$W/docs/release-11.1.1/fix-10/logs
T=$W/tests-visual/fix10-probe
for pid in $(pgrep -f "vite"); do
  cmd=$(ps -o command= -p $pid)
  case $cmd in *preview*|*" build"*|*guarded*) continue ;; esac
  cwd=$(lsof -a -p $pid -d cwd -Fn 2>/dev/null | grep ^n | cut -c2-)
  if [[ $cwd == "$W" || $cwd == "$M" ]]; then
    echo "$(date +%T) $3 SKIPPED: a dev server (pid $pid) watches $cwd" >> $L/runs.out; exit 3
  fi
done
case $2 in webkit-*) EX=(--exclusive webkit) ;; *) EX=() ;; esac
rm -rf $T && mkdir -p $T && cp $D/*.probe.ts $D/probe.config.ts $T/
if [[ $1 == branch ]]; then cp $W/tests-visual/release-11-1-1/film.ts $T/film.ts
else git -C $W show "$1:tests-visual/release-11-1-1/film.ts" > $T/film.ts; fi
start=$(date +%s)
cd $W/tests-visual && GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=5354 GLASS_UI_DEMO_URL=http://localhost:5354 PI_REPORT=$L/$3.json \
  ~/.claude/guard/guarded "${EX[@]}" --timeout 20 -- npx playwright test -c fix10-probe/probe.config.ts --project=$2 --workers=1 > $L/$3.log 2>&1
rc=$?
rm -rf $T $W/.cache/fix10-reload
echo "$(date +%T) $3 probe film@$1 $2 exit $rc $(( $(date +%s) - start ))s load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/$3.log | tr -s ' ' | tr '\n' ' ')" >> $L/runs.out
exit $rc
