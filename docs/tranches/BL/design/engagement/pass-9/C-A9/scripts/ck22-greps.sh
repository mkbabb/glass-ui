#!/bin/bash
# C-A9 CK-22: my own consumer greps at the pass-9 HEAD (siblings READ ONLY; grep only; nothing built or run in any sibling).
# Written independently of E9/ck22-greps.sh: one `grep -rn -E -e <pattern>` per (repo, pattern), counts AND lines printed,
# so a pattern that cannot count shows as an empty list beside a nonzero self-check.
cd ~/Programming || exit 1
R="atlas bbnf-buddy chicago keyframes.js slides speedtest value.js fourier-analysis sci-report"
EX=(--exclude-dir=node_modules --exclude-dir=dist --exclude-dir=dist-demo --exclude-dir=.worktrees --exclude-dir=worktrees --exclude-dir=.claude --exclude-dir=docs --exclude-dir=.git --exclude-dir=bench --exclude-dir=coverage --exclude-dir=.u-build)
IN=(--include=*.vue --include=*.ts --include=*.tsx --include=*.css --include=*.scss --include=*.html)
hits() { grep -rn -E "${IN[@]}" "${EX[@]}" -e "$1" "$2" 2>/dev/null; }
echo "# $(date '+%F %T') C-A9 consumer greps · glass-ui HEAD $(git -C glass-ui rev-parse --short HEAD) · load $(sysctl -n vm.loadavg)"
for r in $R; do echo "#   $r HEAD $(git -C $r rev-parse --short HEAD 2>/dev/null)"; done
echo "# self-check on glass-ui's own src at HEAD (v10.1.0 src): --veil-x/y $(hits '--veil-[xy]' glass-ui/src | wc -l | tr -d ' ') · --stage-reach $(hits '--stage-reach' glass-ui/src | wc -l | tr -d ' ') · <Slider in demo $(grep -rn -E --include=*.vue -e '<Slider\b' glass-ui/demo 2>/dev/null | wc -l | tr -d ' ')"
PATS=(
 "SLIDER::<Slider\\b"
 "NUMBERFIELD::<NumberField\\b"
 "TAPSQUISH::tap-squish"
 "INTERACTIVE::interactive-item"
 "VEILXY::--veil-[xy]"
 "FOCUSVEIL::glass-focus-veil"
 "LOUPE::glass-loupe|--loupe-(left|top|x|k)"
 "LENSVARS::--lens-[ds][xy]|--held-scale-|--stage-(reach|room|w)\\b"
 "STAGEATTR::engage-footprint|data-engage-stage|data-engaged|data-engage-lens"
 "TRACKANCHOR::slider-track[^{]*\\{[^}]*anchor-name"
 "DATAHELD::data-held"
 "PRESS::data-press|data-commit|--glass-btn-press-t|--press-t\\b"
 "DOCKHOLD::useDockHold"
 "STAGEAPI::engageStage|releaseStage|useEngageStage|flingStage"
 "AURORA::<(Glass)?Aurora\\b"
 "CURSOR::setCursor|clearCursor"
 "REGISTER::ENGAGE_DECLARATION|--rung-(class|commit|grow)|--scale-engage|--scale-commit-pop"
)
echo; echo "# counts"
for r in $R; do line="$r"; for p in "${PATS[@]}"; do k=${p%%::*}; e=${p#*::}; c=$(hits "$e" $r | wc -l | tr -d ' '); line="$line · $k $c"; done; echo "$line"; done
echo; echo "# lines (every nonzero count but SLIDER/NUMBERFIELD in full; those two listed per site)"
for p in "${PATS[@]}"; do k=${p%%::*}; e=${p#*::}; echo "## $k  ($e)"; for r in $R; do hits "$e" $r; done; done
