#!/bin/bash
R=$(dirname $0)/run.sh
LG='leave · a (Popover inside|ContextMenu|hover card|Dialog unmounted)'
$R red chromium-phone ctl-red2-chromium-phone "" release-11-1-1-controls
$R red webkit-desktop ctl-red-webkit-desktop "" release-11-1-1-controls
for p in chromium-phone chromium-desktop webkit-phone webkit-desktop; do
  $R branch $p ctl-green-$p "" release-11-1-1-controls
  $R branch $p leave-green-$p "$LG" release-11-1-1.spec
  $R red $p leave-red-$p "$LG" release-11-1-1.spec
done
echo CHAIN1-DONE >> $(dirname $0)/logs/runs.out
