#!/bin/bash
# P-A7 CK-22: consumer greps for every consumer-visible change of pass 6 and pass 7 (sibling trees READ ONLY; value.js by
# grep only, nothing built or run there). Main trees only: node_modules, dist, worktrees, .claude, docs, bench excluded.
cd ~/Programming
R="atlas bbnf-buddy chicago keyframes.js slides speedtest value.js fourier-analysis sci-report"
X="--exclude-dir=node_modules --exclude-dir=dist --exclude-dir=dist-demo --exclude-dir=.worktrees --exclude-dir=worktrees --exclude-dir=.claude --exclude-dir=docs --exclude-dir=.git --exclude-dir=bench --exclude-dir=coverage"
I="--include=*.vue --include=*.css --include=*.ts --include=*.tsx --include=*.scss --include=*.html"
g() { grep -rEn "$1" $2 $I $X 2>/dev/null; }
echo "# $(date '+%F %T') P-A7 consumer greps · glass-ui HEAD $(git -C ~/Programming/glass-ui rev-parse --short HEAD)"
for r in $R; do echo "## $r HEAD $(git -C $r rev-parse --short HEAD 2>/dev/null)"; done
echo
echo "# per repo: M1 material-class lines (.vue) · M1b of them on a <button/@click/role=button line · M1c :active on a material class"
echo "#           M2 --glass-btn-press-t · M3 commit tokens · M4 <Configurator · M4b its #presets slot · M4c preset-chip CSS"
echo "#           M5 Aurora setCursor/clearCursor callers · M6 <Dialog/<DialogContent sites · M7 data-press readers"
echo "#           M8 glass-capsule-hover · M9 SegmentedTabs sites · M10 transform/scale overrides on committing members"
for r in $R; do
 m1=$(grep -rEn "\bglass-(wash|quiet|resting|floating|overlay)\b" $r --include=*.vue $X 2>/dev/null | wc -l | tr -d ' ')
 m1b=$(grep -rEn "\bglass-(wash|quiet|resting|floating|overlay)\b" $r --include=*.vue $X 2>/dev/null | grep -cE "<button|@click|role=\"button\"")
 m1c=$(g "\.glass-(wash|quiet|resting|floating|overlay)[^{,]*:active" $r | wc -l | tr -d ' ')
 m2=$(g "glass-btn-press-t" $r | wc -l | tr -d ' ')
 m3=$(g "data-engage-(face|light)|--rung-light|commit-light|--scale-commit-pop|--rung-crest|--rung-commit|segmented-tab__light" $r | wc -l | tr -d ' ')
 m4=$(grep -rEn "<Configurator\b" $r --include=*.vue $X 2>/dev/null | wc -l | tr -d ' ')
 m4b=$(grep -rEn "#presets|v-slot:presets" $r --include=*.vue $X 2>/dev/null | wc -l | tr -d ' ')
 m4c=$(g "configurator-preset-chip|data-preset-tile" $r | wc -l | tr -d ' ')
 m5=$(g "\.(setCursor|clearCursor)\(" $r | wc -l | tr -d ' ')
 m6=$(grep -rEn "<(Dialog|DialogContent|Sheet|SheetContent)\b" $r --include=*.vue $X 2>/dev/null | wc -l | tr -d ' ')
 m7=$(g "data-press\b" $r | wc -l | tr -d ' ')
 m8=$(g "glass-capsule-hover" $r | wc -l | tr -d ' ')
 m9=$(grep -rEn "<SegmentedTabs\b" $r --include=*.vue $X 2>/dev/null | wc -l | tr -d ' ')
 m10=$(g "\.(switch|checkbox|radio-group-item|toggle-group__item|segmented-tab|chip|button|accordion-trigger|configurator-preset-chip)[^{]*\{[^}]*\b(transform|scale)\s*:" $r | wc -l | tr -d ' ')
 echo "$r M1=$m1 M1b=$m1b M1c=$m1c M2=$m2 M3=$m3 M4=$m4 M4b=$m4b M4c=$m4c M5=$m5 M6=$m6 M7=$m7 M8=$m8 M9=$m9 M10=$m10"
done
echo
echo "# listings"
echo "## M1b material class on an interactive element (press now on [data-press]::before; the way back is usePressMark)"
for r in $R; do grep -rEn "\bglass-(wash|quiet|resting|floating|overlay)\b" $r --include=*.vue $X 2>/dev/null | grep -E "<button|@click|role=\"button\"" | cut -c1-220; done
echo "## M1c, M2, M3, M4c, M7, M8, M10"
for r in $R; do g "\.glass-(wash|quiet|resting|floating|overlay)[^{,]*:active|glass-btn-press-t|data-engage-(face|light)|--rung-light|commit-light|--scale-commit-pop|--rung-crest|--rung-commit|segmented-tab__light|configurator-preset-chip|data-preset-tile|data-press\b|glass-capsule-hover" $r | cut -c1-220; done
echo "## M5 cursor writers"
for r in $R; do g "\.(setCursor|clearCursor)\(" $r | cut -c1-200; done
echo "## M4 Configurator sites"
for r in $R; do grep -rEn "<Configurator\b" $r --include=*.vue $X 2>/dev/null | cut -c1-200; done
