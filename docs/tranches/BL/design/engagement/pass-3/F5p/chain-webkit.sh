#!/bin/zsh
# F5' WebKit queue: the floor probe (Chromium re-read, then WebKit), the HEAD battery, the F5' battery; every WebKit run
# through `guarded --exclusive webkit` (queued, never skipped). One heavy run at a time.
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-3/F5p
B=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p3/F5p/wt/.f5p-out/builds
G=~/.claude/guard/guarded
cd $D
mv logs/floor-probe-f5p-chromium.log logs/superseded/floor-probe-f5p-chromium-r1.log
{ $G --timeout 10 -- node probe/floor-probe.mjs --build $B/f5p --engine chromium; } > logs/floor-probe-f5p-chromium.log 2>&1
{ print "# queued $(date '+%F %T') load $(sysctl -n vm.loadavg)"; $G --exclusive webkit --timeout 30 -- node probe/floor-probe.mjs --build $B/f5p --engine webkit; print "# end $(date '+%F %T')"; } > logs/floor-probe-f5p-webkit.log 2>&1
zsh run-f5p.sh bat-head-webkit > logs/stage-head-webkit.out 2>&1
zsh run-f5p.sh bat-f5p-webkit > logs/stage-f5p-webkit.out 2>&1
print "# chain done $(date '+%F %T')" >> logs/stage-f5p-webkit.out
