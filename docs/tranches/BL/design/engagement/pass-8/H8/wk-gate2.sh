#!/bin/zsh
# H8's WebKit acquisitions: queued early behind the machine's WebKit lock; on acquiring it, waits (≤ 20 min) until this seat's
# Chromium gate condition holds (the line `<cond>` in logs/driver-c2.log) and no Chromium chain of this seat runs, then marks
# logs/wk-running (the Chromium driver waits on it) and runs stages-<tag>.txt in order. Not ready after 20 min: the lock is
# released and that is logged.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-8/H8; cd $R
tag=$1; cond=$2
echo "# $(date '+%F %T') WebKit lock acquired ($tag) · load $(sysctl -n vm.loadavg)"
ready() { [[ -f stages-$tag.txt ]] && { [[ -z $cond ]] || grep -q "$cond" logs/driver-c2.log 2>/dev/null; } && ! pgrep -f '^/bin/zsh ./chain.sh chromium' >/dev/null; }
for k in {1..120}; do ready && break; sleep 10; done
if ! ready; then echo "# $(date '+%T') not ready after 20 min: lock released, nothing run"; exit 7; fi
touch logs/wk-running; trap 'rm -f logs/wk-running' EXIT
echo "# $(date '+%T') ready: $(tr '\n' ' ' < stages-$tag.txt)"
./chain.sh webkit $(cat stages-$tag.txt)
echo "# $(date '+%F %T') WebKit acquisition ($tag) end · load $(sysctl -n vm.loadavg)"
