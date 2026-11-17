#!/bin/bash
# Fix seat 6: the exits gate's parts from index $1 on (0..15, project-major as gate.sh runs
# them), each in its own guarded Playwright process on port 5353, carrying on past a
# failure. Exit codes to logs/gate-rest.out, output to logs/gate-<project>-<n>.log.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/fix-6/logs
G=~/.claude/guard/guarded
start=${1:-0}
parts=(
    "(form|glass|exit|routes|round|weight|lift) · "
    "(reverse|tooltip|expand|leave) · "
    "standing · "
    "(site|fade|fold|mark|press|still) · "
)
cd $W/tests-visual
export GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=5353 GLASS_UI_DEMO_URL=http://localhost:5353
i=0
for project in chromium-phone chromium-desktop webkit-phone webkit-desktop; do
    for n in 0 1 2 3; do
        if (( i >= start )); then
            run=(npx playwright test -c release-11-1-1.config.ts --project="$project" --workers=1 -g "${parts[$n]}")
            case $project in
                webkit-*) run=("$G" --exclusive webkit --timeout 60 -- "${run[@]}") ;;
                *) run=("$G" --timeout 60 -- "${run[@]}") ;;
            esac
            "${run[@]}" > $L/gate-$project-$n.log 2>&1
            rc=$?
            echo "$(date +%T) $project part $n exit $rc $(git rev-parse --short HEAD)" >> $L/gate-rest.out
        fi
        i=$((i + 1))
    done
done
echo "GATE-REST-DONE $(date +%T)" >> $L/gate-rest.out
