#!/bin/bash
# Critic 13 (copied by critic 14): one job, run bare inside the caller's one guarded call (batch.sh), so a batch waits
# for the guard's admission once. Each Playwright process starts its own server and stops it.
#   job.sh part <tip|red|pre> <project> <part 0-3 | grep> <tag> [playwright args]
#   job.sh probe <cmd|typed|text> <tip|red|pre> <project> <tag>
#   job.sh lift <tip|red> <project> <tag>
#   job.sh e <tip|red> <tag>
#   job.sh c1 <tip|red> <tag> [repeats]
#   job.sh d1 <tip|red> <tag> [repeats]
#   job.sh rev <tip|red> <project> <tag> [repeats]
#   job.sh leave <tip|red> <project> <tag> [repeats]
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$W/docs/release-11.1.1/critic-14; L=$D/logs
parts=(
    "(form|glass|exit|routes|round|weight|lift|sheet) · "
    "(reverse|tooltip|expand|leave) · "
    "standing · "
    "(site|fade|fold|mark|press|still) · "
)
tree() { case $1 in tip) T=$W; P=5351 ;; red) T=$W/.cache/critic14-red/tree; P=5352 ;; pre) T=$W/.cache/critic14-pre/tree; P=5353 ;; norule) T=$W/.cache/critic14-norule/tree; P=5354 ;; esac; }
sum() { grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' "$1" 2>/dev/null | tr -s ' ' | tr '\n' ' '; }
# A queued extra.jobs (readings this seat adds while a batch runs) runs once, before this job,
# inside the same guarded call, so no two heavy runs of this seat overlap.
if [ -z "$IN_EXTRA" ] && [ -f $D/extra.jobs ]; then
  mv $D/extra.jobs $D/extra.jobs.ran.$(date +%H%M%S)
  while read -r line; do [ -n "$line" ] && IN_EXTRA=1 bash $D/job.sh $line; done < $(ls -t $D/extra.jobs.ran.* | head -1)
fi
kind=$1; shift
start=$(date +%s); lstart=$(sysctl -n vm.loadavg)
case $kind in
  part)
    tree $1; project=$2; case $3 in [0-3]) GREP="${parts[$3]}" ;; *) GREP="$3" ;; esac; tag=$4
    ( cd $T/tests-visual && GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$tag.json \
      npx playwright test -c release-11-1-1.config.ts --project=$project --workers=1 -g "$GREP" "${@:5}" ) > $L/$tag.log 2>&1
    rc=$?; what="$1 $project [$3]" ;;
  probe)
    which=$1; tree $2; project=$3; tag=$4; P=5356
    mkdir -p $T/tests-visual/critic14-cmd
    cp $D/probe-cmd/probe.config.ts $T/tests-visual/critic14-cmd/
    if [ $which = typed ]; then cp $D/probe-cmd/typed.probe.ts $T/tests-visual/critic14-cmd/
    elif [ $which = text ]; then cp $D/probe-cmd/text.probe.ts $T/tests-visual/critic14-cmd/
    else cp $D/probe-cmd/cmd.probe.ts $D/probe-cmd/cmd-harness.html $D/probe-cmd/cmd-harness.ts $T/tests-visual/critic14-cmd/; fi
    ( cd $T/tests-visual && GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$tag.json \
      npx playwright test -c critic14-cmd/probe.config.ts --project=$project --workers=1 ) > $L/$tag.log 2>&1
    rc=$?; rm -rf $T/tests-visual/critic14-cmd; what="probe $which $2 $project" ;;
  lift)
    tree $1; project=$2; tag=$3; P=5356
    mkdir -p $T/tests-visual/critic14-lift && cp $D/probe-lift/probe.config.ts $D/probe-lift/lift.probe.ts $T/tests-visual/critic14-lift/
    ( cd $T/tests-visual && GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$tag.json \
      npx playwright test -c critic14-lift/probe.config.ts --project=$project --workers=1 ) > $L/$tag.log 2>&1
    rc=$?; rm -rf $T/tests-visual/critic14-lift; what="lift $1 $project" ;;
  rev)
    tree $1; project=$2; tag=$3
    ( cd $T/tests-visual && GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$tag.json \
      npx playwright test -c release-11-1-1.config.ts --project=$project --workers=1 \
      -g "reverse · a (Select|DropdownMenu) closed while it opens" --repeat-each=${4:-3} ) > $L/$tag.log 2>&1
    rc=$?; what="rev $1 $project [a Select or DropdownMenu closed while it opens x${4:-3}]" ;;
  leave)
    tree $1; project=$2; tag=$3; P=5356
    mkdir -p $T/tests-visual/critic14-leave && cp $D/probe-leave/probe.config.ts $D/probe-leave/leave.probe.ts $T/tests-visual/critic14-leave/
    ( cd $T/tests-visual && GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$tag.json \
      npx playwright test -c critic14-leave/probe.config.ts --project=$project --workers=1 --repeat-each=${4:-10} ) > $L/$tag.log 2>&1
    rc=$?; rm -rf $T/tests-visual/critic14-leave; what="leave $1 $project x${4:-10}" ;;
  d1)
    tree $1; P=5355; tag=$2
    ( cd $T && GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$tag.json \
      npx playwright test -c tests-visual/webkit-2287.config.ts tests-visual/release-10-1-3.spec.ts \
      --project=webkit --workers=1 -g "390 · (right|left|bottom)-anchored · ancestor zoom 1.25 D-1" --repeat-each=${3:-5} ) > $L/$tag.log 2>&1
    rc=$?; what="d1 $1 webkit [release-10-1-3 390 D-1, three anchors x${3:-5}]" ;;
  c1)
    tree $1; P=5355; tag=$2
    ( cd $T && GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$tag.json \
      npx playwright test -c tests-visual/release-11-0-1-critic-2.config.ts --project=webkit release-11-0-1-critic-1.spec.ts \
      --workers=1 -g "a light-(390c|1440f): the wide label" --repeat-each=${3:-3} ) > $L/$tag.log 2>&1
    rc=$?; what="c1 $1 webkit [release-11-0-1-critic-1 light-390c and light-1440f x${3:-3}]" ;;
  e)
    tree $1; P=5355; tag=$2
    ( cd $T && GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$tag.json \
      npx playwright test -c tests-visual/webkit-2287.config.ts tests-visual/release-10-1-5.spec.ts \
      --project=webkit --workers=1 -g "fix 12, coarse phone" --repeat-each=3 ) > $L/$tag.log 2>&1
    rc=$?; what="e $1 webkit [fix 12, coarse phone x3]" ;;
esac
echo "$(date +%T) $tag $what exit $rc $(( $(date +%s) - start ))s load-at-start=$lstart load-end=$(sysctl -n vm.loadavg) $(sum $L/$tag.log)" >> $L/runs.out
exit 0
