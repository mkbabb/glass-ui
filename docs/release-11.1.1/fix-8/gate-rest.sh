#!/bin/bash
# Fix seat 8: the exits gate's parts from index $1 to $2 (0..15, project-major as the gate runs
# them; $2 defaults to 15), each in its own guarded Playwright process on port 5354, carrying on
# past a failure, each with its own report. Exit codes to logs/gate-rest.out, output to
# logs/gate-<project>-<n>.log and .json.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/fix-8/logs
G=~/.claude/guard/guarded
start=${1:-0}
end=${2:-15}
parts=(
    "(form|glass|exit|routes|round|weight|lift|sheet) · "
    "(reverse|tooltip|expand|leave) · "
    "standing · "
    "(site|fade|fold|mark|press|still) · "
)
cd $W/tests-visual
export GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=5354 GLASS_UI_DEMO_URL=http://localhost:5354
i=0
for project in chromium-phone chromium-desktop webkit-phone webkit-desktop; do
    for n in 0 1 2 3; do
        if (( i >= start && i <= end )); then
            run=(npx playwright test -c release-11-1-1.config.ts --project="$project" --workers=1 -g "${parts[$n]}")
            case $project in
                webkit-*) run=("$G" --exclusive webkit --timeout 60 -- "${run[@]}") ;;
                *) run=("$G" --timeout 60 -- "${run[@]}") ;;
            esac
            PI_REPORT=$L/gate-$project-$n.json "${run[@]}" > $L/gate-$project-$n.log 2>&1
            rc=$?
            echo "$(date +%T) $project part $n exit $rc $(git rev-parse --short HEAD) load $(sysctl -n vm.loadavg) $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $L/gate-$project-$n.log | tr -s ' ' | tr '\n' ' ')" >> $L/gate-rest.out
        fi
        i=$((i + 1))
    done
done
echo "GATE-REST-DONE $(date +%T)" >> $L/gate-rest.out
