#!/bin/zsh
# C-E3: after the builds stage, the second build stage (p-mod), then the Chromium queue (each stage its own guarded call).
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-3/C-E3
cd $D
while ! grep -q "worktree vs HEAD" builds.out 2>/dev/null; do sleep 10; done
zsh run-ce3.sh builds2 > builds2.out 2>&1
print -- "# ch queue start $(date '+%F %T') load $(sysctl -n vm.loadavg)"
zsh chain-ce3.sh ch
print -- "# ch queue done $(date '+%F %T') load $(sysctl -n vm.loadavg)"
