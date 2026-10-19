#!/bin/zsh
# C-E4 chain: ce4 probe rebuilt on the three other arms, the Chromium battery, the E-4 re-reads, the unit read, then ONE
# `guarded --exclusive webkit` admission for every WebKit stage (queued, never skipped). Strictly sequential.
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-4/C-E4
cd $D
CE4ONLY=1 ARMS="veil-coarse veil-every noveil-every noveil-coarse" zsh run-ce4.sh builds > logs/stage-builds2.txt 2>&1
zsh run-ce4.sh chromium > logs/stage-chromium.txt 2>&1
zsh run-ce4.sh reread-chromium > logs/stage-reread.txt 2>&1
zsh run-ce4.sh unit >> logs/stage-reread.txt 2>&1
print -- "wk queued $(date '+%F %T') load $(sysctl -n vm.loadavg)" >> logs/wk-admission.log
~/.claude/guard/guarded --exclusive webkit --timeout 90 -- zsh run-ce4.sh wk-inner > logs/stage-webkit.txt 2>&1
print -- "guarded exit $? $(date '+%F %T') load $(sysctl -n vm.loadavg)" >> logs/wk-admission.log
print -- "# chain done $(date '+%F %T')" >> logs/stage-webkit.txt
