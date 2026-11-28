#!/bin/zsh
# The 11.1.1 third close: several steps in one guarded call, in order, so a step does not wait again
# in the guard's machine-wide queue behind other sessions' runs. Steps: co-<list> (a coarse-touch
# chunk, suite.sh), res-<name> (a resolution job, jobs/res-<name>.sh), mkres (sorts the coarse-touch
# chunks and writes lists/co-res for res-co), ex-<project>-<n> (release.sh's exits gate, part n of
# 0 to 3 as exits.sh splits it, on its own server at 5352).
# Each step reads kern.sleeptime before and after. A step that spans a sleep keeps its logs as
# *-<HHMM>-asleep-void.*, waits for the lid to read open, and runs again.
#   ~/.claude/guard/guarded [--exclusive webkit] --timeout 90 -- zsh group.sh <step>...
set -u
C=${0:A:h:h}; S=$C/scripts; L=$C/suite; X=$C/exits; WT=${C:h:h:h:h}; LI=${C:h}/lists
export ROOT=${ROOT:-$WT/.cache/close-full/head/tree}
CFG=tests-visual/playwright.config.ts
parts=("(form|glass|exit|routes|round|weight|lift|sheet) · " "(reverse|tooltip|expand|leave) · " "standing · " "(site|fade|fold|mark|press|still) · ")
slept() { sysctl -n kern.sleeptime | grep -oE 'sec = [0-9]+' | head -1 | grep -oE '[0-9]+' }
lidshut() { ioreg -r -k AppleClamshellState -d 1 | grep -q '"AppleClamshellState" = Yes' }
load() { sysctl -n vm.loadavg | tr -d '{}' | xargs }
counts() { grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $1 2>/dev/null | tr -s ' ' | tr '\n' ' ' }
mkdir -p $X $L/resolve
echo "$(date '+%F %T') group start: $*"
for st in $@; do
  while true; do
    while lidshut; do sleep 60; done
    s0=$(slept); t0=$(date +%s); l0=$(load)
    case $st in
      co-*) files=($L/$st.log $L/$st.json); zsh $S/suite.sh $st 5353 $CFG coarse-touch $LI/${st#co-}; rc=$?;;
      res-co-*) files=($L/resolve/co-${st#res-co-}.{log,json}); zsh $S/jobs/$st.sh; rc=$?;;
      res-wk-swr) files=($L/resolve/wk-swr-{red,head}-a.{log,json}); zsh $S/jobs/$st.sh; rc=$?;;
      mkres)
        files=()
        (cd $L && for x in aa ab ac ad ae af ag ah ai aj ak al; do zsh $S/sort.sh co co-$x co-part-$x.json; done
         args=(); for x in aa ab ac ad ae af ag ah ai aj ak al; do args+=(co-$x-branch-only.txt co-$x-errs-vs-master.txt); done
         python3 -I $S/mkres.py $C/lists/co-res $args); rc=$?;;
      ex-*)
        tag=${st#ex-}; proj=${tag%-*}; n=${tag##*-}; files=($X/$tag.log $X/$tag.json)
        (cd $ROOT/tests-visual && GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=5352 GLASS_UI_DEMO_URL=http://localhost:5352 PI_REPORT=$X/$tag.json \
          npx playwright test -c release-11-1-1.config.ts --project=$proj --workers=1 -g "${parts[$((n+1))]}" > $X/$tag.log 2>&1); rc=$?
        echo "$(date '+%F %T') $tag exit $rc $(( $(date +%s) - t0 ))s load $l0 -> $(load) $(counts $X/$tag.log)" >> $X/runs.out;;
      *) echo "unknown step $st"; rc=2; files=();;
    esac
    s1=$(slept)
    if [[ $s1 != $s0 ]]; then
      stamp=$(date +%H%M); for f in $files; do [[ -e $f ]] && mv $f ${f:r}-$stamp-asleep-void.${f:e}; done
      echo "$(date '+%F %T') $st rc=$rc spanned a sleep (sleeptime $s0 -> $s1): kept as *-$stamp-asleep-void, runs again"
      continue
    fi
    echo "$(date '+%F %T') $st rc=$rc $(( $(date +%s) - t0 ))s, no sleep; load $l0 -> $(load)"
    break
  done
done
echo "$(date '+%F %T') group done: $*"
