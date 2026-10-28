#!/bin/zsh
# H7 development reads (not of record): one witness per line, logged with the load before and after
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
L=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-7/H7/logs
tag=$1; shift
{ echo "# $tag · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · node $*"; node "$@"; echo "# exit $? · $(date '+%T') · load $(sysctl -n vm.loadavg)"; } > $L/dev-$tag.log 2>&1
tail -3 $L/dev-$tag.log
