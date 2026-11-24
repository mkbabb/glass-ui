#!/bin/zsh
# The 11.1.1 second close: scripts/release.sh's exits gate (tests-visual/release-11-1-1/gate.sh) on
# the full tree of the tip, its sixteen parts as gate.sh splits them (four projects, four parts),
# each one Playwright process through its own guarded call (WebKit under --exclusive webkit) on its
# own server (GLASS_UI_DEMO_OWN, port 5352), carrying on past a failing part (gate.sh stops at
# the first under set -e) so every part is read. Logs and reports in exits/.
#   zsh exits.sh [project...]
set -u
C=${0:A:h:h}; WT=${C:h:h:h:h}; L=$C/exits; G=~/.claude/guard/guarded
T=$WT/.cache/close-full/head/tree
parts=("(form|glass|exit|routes|round|weight|lift|sheet) · " "(reverse|tooltip|expand|leave) · " "standing · " "(site|fade|fold|mark|press|still) · ")
projects=(${@:-chromium-phone chromium-desktop webkit-phone webkit-desktop})
for project in $projects; do
  ex=(); [[ $project = webkit-* ]] && ex=(--exclusive webkit)
  for n in 0 1 2 3; do
    tag=$project-$n; s=$(date +%s); l0=$(sysctl -n vm.loadavg | tr -d '{}')
    (cd $T/tests-visual && GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=5352 GLASS_UI_DEMO_URL=http://localhost:5352 PI_REPORT=$L/$tag.json \
      $G $ex --timeout 60 -- npx playwright test -c release-11-1-1.config.ts --project=$project --workers=1 -g "${parts[$((n+1))]}" > $L/$tag.log 2>&1)
    rc=$?
    echo "$(date '+%F %T') $tag exit $rc $(( $(date +%s) - s ))s load $l0 -> $(sysctl -n vm.loadavg | tr -d '{}') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $L/$tag.log | tr -s ' ' | tr '\n' ' ')" | tee -a $L/runs.out
    grep -qE '^\[guarded\] REFUSED' $L/$tag.log && { echo "$(date '+%F %T') STOP: refused at $tag" | tee -a $L/runs.out; exit 3; }
  done
done
