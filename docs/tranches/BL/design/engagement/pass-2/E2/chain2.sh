#!/bin/zsh
# P-E2 second stage: WebKit battery (veil), the census on A's scene app (both engines), the noveil rows, the probes.
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-2/E2
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
B=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p2/E2
GUARD=~/.claude/guard/guarded
stamp() { echo "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
cd $D
ENGINES=webkit zsh run-e2.sh bat-veil
cd $H
{ stamp "a2app build start"; $GUARD --light --timeout 15 -- node build.mjs $B/wt --label veil-a2app --out $B/out --app $D/../A2/scenes/App.vue; stamp "a2app build end exit $?"; } > $D/logs/app-veil-a2app.log 2>&1
for e in chromium webkit; do X=(); [ $e = webkit ] && X=(--exclusive webkit)
  { stamp "E-1/E-2 on A2's scene app, veil, $e start"; $GUARD $X --timeout 60 -- node run.mjs --build $B/out/builds/veil-a2app --wt $B/wt --engines $e --only E-1,E-2 --out $D/json/veil-a2app --verbose; stamp "end exit $?"; } > $D/logs/battery-veil-a2app-$e.log 2>&1
done
cd $D
ONLY=E-3,E-7,E-10,E-11 zsh run-e2.sh bat-noveil
zsh run-e2.sh probe-veil probe-noveil
ENGINES=chromium TAG=-r2 zsh run-e2.sh probe-veil
echo "chain2 done $(date '+%F %T')"
