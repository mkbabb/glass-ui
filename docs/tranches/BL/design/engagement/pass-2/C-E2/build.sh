#!/bin/zsh
# C-E2 (D5 pass 2, critic of P-E2): the four builds, through the guard. The worktree carries P-E2-veil.patch;
# the noveil builds flip only KEYBOARD_VEIL (the one line the two patches differ in), then flip it back.
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-2/C-E2
E2=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-2/E2
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p2/C-E2/wt
O=$W/.ce2-out
GUARD=~/.claude/guard/guarded
S=$W/src/composables/motion/engage/stage.ts
stamp() { echo "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
cd $H
b() { stamp "build $1 start"; $GUARD --light --timeout 15 -- node build.mjs $W --label $1 --out $O $2 $3; stamp "build $1 end exit $?"; }
{ grep -n 'KEYBOARD_VEIL =' $S
  b veil; b veil-probe --app $E2/probe/App.vue; b veil-a2app --app $E2/../A2/scenes/App.vue
  sed -i '' 's/export const KEYBOARD_VEIL = true;/export const KEYBOARD_VEIL = false;/' $S; grep -n 'KEYBOARD_VEIL =' $S
  b noveil; b noveil-probe --app $E2/probe/App.vue
  sed -i '' 's/export const KEYBOARD_VEIL = false;/export const KEYBOARD_VEIL = true;/' $S; grep -n 'KEYBOARD_VEIL =' $S
} > $D/logs/build.log 2>&1
echo done
