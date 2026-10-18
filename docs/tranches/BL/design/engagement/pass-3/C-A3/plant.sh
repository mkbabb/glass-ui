#!/bin/zsh
# C-A3 plants on P-A3-light, in the critic's worktree only: `plant.sh apply` / `plant.sh revert`.
#   P1 CK-01  Switch root loses `engage-chosen`            → E-1 must FAIL the switch (latch / rung-class)
#   P3 CK-03  Checkbox loses its door (no one-frame arming)  → E-2 checkbox arrival·own/ownflush must FAIL
#   P4 CK-14  the seat claims the dock trigger's ::after again → a3-probe ck14 must FAIL
#   P6 CK-02  Button's seat light is transparent             → E-2 button arm iii must FAIL
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p3/C-A3/wt-plant
BK=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-3/C-A3/plant-backup-scratch
F=(src/components/switch/Switch.vue src/components/checkbox/Checkbox.vue src/styles/utilities/engage.css)
case $1 in
  apply)
    mkdir -p $BK; for f in $F; do mkdir -p $BK/${f:h}; cp $WT/$f $BK/$f; done
    perl -0pi -e "s/'switch control-bit engage-chosen'/'switch control-bit'/" $WT/src/components/switch/Switch.vue
    perl -0pi -e 's/^useEngage\(\(\) => \(rootRef/\/\/ C-A3 PLANT P3 useEngage(() => (rootRef/m' $WT/src/components/checkbox/Checkbox.vue
    perl -0pi -e 's/:where\(:not\(\.dock-trigger, \.dock-select-trigger, \.dock-dropdown-trigger\)\)::after/::after/g' $WT/src/styles/utilities/engage.css
    print -- '\n@layer components { .button { --rung-light: transparent; } } /* C-A3 PLANT P6 */' >> $WT/src/styles/utilities/engage.css
    cd $WT && git diff --stat -- $F ;;
  revert)
    for f in $F; do cp $BK/$f $WT/$f; done; rm -rf $BK; cd $WT && git diff --stat -- $F | tail -1 ;;
esac
