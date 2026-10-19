#!/bin/bash
# CK-22: the consumer greps for P-A4's new consumer-visible paths (sibling main trees, read only; node_modules, dist,
# worktrees, .claude and docs excluded). Output: logs/ck22-greps.txt
cd ~/Programming
R="atlas bbnf-buddy chicago keyframes.js slides speedtest value.js fourier-analysis"
X="--exclude-dir=node_modules --exclude-dir=dist --exclude-dir=dist-demo --exclude-dir=.worktrees --exclude-dir=.claude --exclude-dir=docs --exclude-dir=.git --exclude-dir=bench"
I="--include=*.vue --include=*.css --include=*.ts --include=*.scss"
echo "# $(date '+%F %T') consumer greps (P-A4)"
# M-8: a consumer that styles the press of a light-pressing member on :active, or reads data-press
for r in $R; do n=$(grep -rEn "(control-bit|toggle-group__item|segmented-tab|glass-chip|disclosure-trigger|accordion-trigger|engage-disclosed)[^{]*:active" $r $I $X 2>/dev/null | wc -l | tr -d ' '); echo "active-on-light-press-member $r $n"; done
for r in $R; do n=$(grep -rEn "data-press\b|\[data-press\]|dataset\.press\b" $r $I $X 2>/dev/null | wc -l | tr -d ' '); echo "data-press-reader $r $n"; done
# M-9: a consumer that reaches into a SegmentedTabs tab's children, or styles the tab's ::after / its last child
for r in $R; do n=$(grep -rEn "segmented-tab(\b|[^s_-])[^{]*(> *\*|:last-child|:empty|::after|::before|children)" $r $I $X 2>/dev/null | wc -l | tr -d ' '); echo "segmented-tab-children $r $n"; done
for r in $R; do n=$(grep -rEn "<SegmentedTabs\b" $r --include='*.vue' $X 2>/dev/null | wc -l | tr -d ' '); echo "SegmentedTabs-sites $r $n"; done
for r in $R; do n=$(grep -rEn "#option|v-slot:option" $r --include='*.vue' $X 2>/dev/null | wc -l | tr -d ' '); echo "SegmentedTabs-option-slot $r $n"; done
# M-10: a consumer that re-paints the disclosure press, or a test that reads its fill
for r in $R; do n=$(grep -rEn "disclosure-(group-)?trigger" $r $I $X 2>/dev/null | wc -l | tr -d ' '); echo "disclosure-trigger-class $r $n"; done
# M-12: useEngage consumers (its `organ` option is new)
for r in $R; do n=$(grep -rEn "\buseEngage\b|\busePressMark\b" $r $I $X 2>/dev/null | wc -l | tr -d ' '); echo "useEngage-consumer $r $n"; done
echo "# listing: :active on a light-press member, data-press readers"
for r in $R; do grep -rEn "(control-bit|toggle-group__item|segmented-tab|glass-chip|disclosure-trigger|accordion-trigger|engage-disclosed)[^{]*:active" $r $I $X 2>/dev/null; grep -rEn "data-press\b|\[data-press\]" $r $I $X 2>/dev/null; grep -rEn "segmented-tab(\b|[^s_-])[^{]*(> *\*|:last-child|:empty|::after|::before|children)" $r $I $X 2>/dev/null; done | head -60
