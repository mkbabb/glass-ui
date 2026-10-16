#!/bin/zsh
# P-E2 Chromium-only stage, run while chain2 queues for the machine-wide WebKit lock: A's scene app census, the noveil rows, the noveil probe.
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-2/E2
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
B=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p2/E2
GUARD=~/.claude/guard/guarded
stamp() { echo "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
cd $H
{ stamp "a2app build start"; $GUARD --light --timeout 15 -- node build.mjs $B/wt --label veil-a2app --out $B/out --app $D/../A2/scenes/App.vue; stamp "a2app build end exit $?"; } > $D/logs/app-veil-a2app.log 2>&1
{ stamp "E-1/E-2 on A2's scene app, veil, chromium start"; $GUARD --timeout 60 -- node run.mjs --build $B/out/builds/veil-a2app --wt $B/wt --engines chromium --only E-1,E-2 --out $D/json/veil-a2app-c1 --verbose; stamp "end exit $?"; } > $D/logs/battery-veil-a2app-chromium-c1.log 2>&1
cd $D
ENGINES=chromium ONLY=E-3,E-7,E-10,E-11 TAG=-c1 zsh run-e2.sh bat-noveil
ENGINES=chromium TAG=-c1 zsh run-e2.sh probe-noveil
echo "chain-c done $(date '+%F %T')"
