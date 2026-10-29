#!/bin/zsh
# H8's one WebKit acquisition: queued early behind the machine's WebKit lock; on acquiring it, it waits (≤ 20 min) for this
# seat's Chromium phases to end (logs/driver-c.log "driver end") and the stage list (stages-<tag>.txt) to exist, then runs
# that list in order. If either is missing after 20 min it releases the lock and says so (logs/wk-gate-<tag>.log).
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-8/H8; cd $R
tag=$1
echo "# $(date '+%F %T') WebKit lock acquired ($tag) · load $(sysctl -n vm.loadavg)"
for k in {1..120}; do grep -q 'driver end' logs/driver-c.log 2>/dev/null && [[ -f stages-$tag.txt ]] && break; sleep 10; done
if ! { grep -q 'driver end' logs/driver-c.log 2>/dev/null && [[ -f stages-$tag.txt ]]; }; then echo "# $(date '+%T') not ready after 20 min: lock released, nothing run"; exit 7; fi
echo "# $(date '+%T') ready: $(tr '\n' ' ' < stages-$tag.txt)"
./chain.sh webkit $(cat stages-$tag.txt)
echo "# $(date '+%F %T') WebKit acquisition ($tag) end · load $(sysctl -n vm.loadavg)"
