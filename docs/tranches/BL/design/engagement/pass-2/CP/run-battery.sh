#!/bin/zsh
# run-battery.sh <build: css|waapi> <tag> [engines...]: the H2 battery (../../harness/) on one CP build, both engines,
# each witness narrowed to the CP members' scenes. E-7's static arm reads the worktree's source, so the worktree must
# hold the same build's tree when this runs (the caller swaps it; run-battery.sh checks the patch hash).
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-2/CP
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p2/CP/wt
GUARD=~/.claude/guard/guarded
B=$1; TAG=$2; shift 2; ENG=(${=${*:-chromium webkit}})
OUT=$D/json/battery-$B-$TAG; mkdir -p $OUT
stamp() { echo "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
CHK=${TMPDIR:-/tmp}/cp-check-$$.patch; $D/mkpatch.sh $WT $CHK >/dev/null; cmp -s $CHK $D/../CP-$B.patch && echo "# worktree holds CP-$B.patch" || echo "# WARNING: worktree does not hold CP-$B.patch (E-7 static arm reads another tree)"; rm -f $CHK
cd $H
# the machine law: a run that starts Playwright WebKit takes the guard's exclusive WebKit slot
XW=""; [[ " $ENG " == *" webkit "* ]] && XW="--exclusive webkit"
typeset -A SC
SC=(E-1 switch,accordion,button,slider E-2 switch,accordion,button E-3 slider E-4 slider E-5 press_switch,accordion,button E-6 s6 E-7 modal,slider E-8 switch,accordion,button E-9 switch,accordion,button,slider E-10 slider,slider2 E-11 switch,slider)
for w in ${=WITS:-E-1 E-2 E-3 E-4 E-5 E-6 E-7 E-8 E-9 E-10 E-11}; do
  stamp "$w $B start"; $GUARD ${=XW} --timeout 30 -- node run.mjs --build $WT/.cp-out/builds/$B --wt $WT --only $w --engines ${(j:,:)ENG} --scenes $SC[$w] --out $OUT --verbose; stamp "$w $B end exit $?"
done
