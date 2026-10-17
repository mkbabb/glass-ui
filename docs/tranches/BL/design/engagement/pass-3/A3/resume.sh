#!/bin/zsh
# P-A3 resume after the 2026-10-17 kernel-zone reboot: the rest of the queue, strictly sequential, one heavy run at a time.
# WebKit stages queue on `guarded --exclusive webkit` (via queue.sh/run-a3.sh gw); never skipped.
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-3/A3
cd $D
{
TAG=-arms ARGS="--commit-arms i,ii,iii" zsh queue.sh bat-geom-chromium-E-2
zsh queue.sh cap-geom-chromium
zsh queue.sh bat-light-webkit-E-7,E-8,E-9,E-10,E-11
zsh queue.sh probe-light-webkit
zsh queue.sh bat-geom-webkit-E-1,E-2,E-8,E-9
TAG=-arms ARGS="--commit-arms i,ii,iii" zsh queue.sh bat-geom-webkit-E-2
zsh queue.sh probe-geom-webkit-ck20,ck14
zsh queue.sh cap-light-webkit
zsh queue.sh cap-geom-webkit
print "# resume done $(date '+%F %T') load $(sysctl -n vm.loadavg)"
} >> $D/logs/queue-resume.txt 2>&1
