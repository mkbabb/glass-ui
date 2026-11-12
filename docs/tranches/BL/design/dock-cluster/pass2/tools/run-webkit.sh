#!/bin/sh
# pass 2, WebKit: one run at a time under the WebKit lock. F5 first (the root hunt), then the battery.
cd /Users/mkbabb/Programming/glass-ui
D=docs/tranches/BL/design/dock-cluster/pass2
S=.claude/worktrees/bl/cluster/pass2-build/.p2/site-r5
G=~/.claude/guard/guarded
P="node $D/tools/probe.mjs --engine webkit --site $S --out $D"
ISO='[{"name":"f5share","q":{"shape":"onedock","open":"1","ink":"share","tone":"share"},"fused":true,"pre":[["set",true]]},{"name":"f5one","q":{"shape":"onedock","open":"1"},"fused":true,"pre":[["set",true]]}]'
for dsf in 2.2 1.25 2.625; do
  $G --exclusive webkit --timeout 15 -- $P --tag f5iso-$dsf --parts iso --dsf $dsf --ws 1440,390 --themes light,dark --iso "$ISO" > $D/logs/webkit-f5iso-$dsf.log 2>&1; echo "rc=$?" >> $D/logs/webkit-f5iso-$dsf.log
done
$G --exclusive webkit --timeout 30 -- $P --tag rest-share --parts rest --dsfs 2,1.25,2.2,2.625 --query "ink=share&tone=share" > $D/logs/webkit-rest-share.log 2>&1; echo "rc=$?" >> $D/logs/webkit-rest-share.log
$G --exclusive webkit --timeout 40 -- $P --tag r5 --parts rest,onedock,swap,prm,a11y --dsfs 2,1,3,1.25,1.5,2.2,2.625 > $D/logs/webkit-r5.log 2>&1; echo "rc=$?" >> $D/logs/webkit-r5.log
echo WEBKITDONE > $D/logs/run-webkit.done
# then Chromium on the same site: the final battery, the fold A/B of the rest seam, and the F5 isolation
C="node $D/tools/probe.mjs --engine chromium --site $S --out $D"
$G --timeout 30 -- $C --tag r5 --parts rest,onedock,swap,prm,a11y --dsfs 2,1,3,1.25,1.5,2.2,2.625 > $D/logs/chromium-r5.log 2>&1; echo "rc=$?" >> $D/logs/chromium-r5.log
$G --timeout 20 -- $C --tag rest-share --parts rest --dsfs 2,1.25,2.2,2.625 --query "ink=share&tone=share" > $D/logs/chromium-rest-share.log 2>&1; echo "rc=$?" >> $D/logs/chromium-rest-share.log
echo ALLDONE >> $D/logs/run-webkit.done
