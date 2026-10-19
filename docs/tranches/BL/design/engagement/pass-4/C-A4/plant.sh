#!/bin/zsh
# C-A4 plants on P-A4-light, applied ONLY in the critic's worktree wt-plant (its own checkout of HEAD + the light patch).
# Each plant is a counterexample the CK row's pass rule names, aimed at a different cell:
#   P1 CK-01  Switch root loses `engage-chosen`                       → E-1 adoption switch + latch must FAIL
#   P2 CK-01  every Card focusable (role=option, tabindex=0) under `engage-static` → E-1 static-inert card must FAIL
#   P3 CK-03  Checkbox loses its door (no one-frame arming, no press mark) → E-2 checkbox arrival·own/ownflush must FAIL
#   P4 CK-14/27 forced-colours arm reaches the dock triggers' ::after again → E-12 fcslop dt-dropdown + fc-reach must FAIL
#   P6 CK-02  Button `--rung-light: transparent`                       → E-2 button arm iii must FAIL
#   P7 CK-06  ToggleGroupItem's press back on `:active`, not `[data-press]` → E-5 toggle (the pre-cure state)
#   P8 CK-10  SegmentedTabs' reduce light seat never paints            → E-9 tabs commit-light must FAIL
#   P9 CK-02  the control bit's light no longer waits for the fill     → E-2 radio dark arm iii (the pre-cure state)
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p4/C-A4/wt-plant
cd $WT || exit 1
perl -0pi -e "s/'switch control-bit engage-chosen'/'switch control-bit'/" src/components/switch/Switch.vue
perl -0pi -e 's/:role="selectable \? .option. : undefined"/role="option"/; s/:tabindex="selectable \? 0 : undefined"/tabindex="0"/' src/components/card/Card.vue
perl -0pi -e 's/^useEngage\(\(\) => \(rootRef/\/\/ C-A4 PLANT P3 useEngage(() => (rootRef/m' src/components/checkbox/Checkbox.vue
perl -0pi -e 's/(\@media \(forced-colors: active\) \{\s*):where\(\.engage-chosen, \.engage-pressed, \.engage-disclosed\):where\(:not\(\.dock-trigger, \.dock-select-trigger, \.dock-dropdown-trigger\)\)::after,/$1:where(.engage-chosen, .engage-pressed, .engage-disclosed)::after,/' src/styles/utilities/engage.css
print -- '\n@layer components { .button { --rung-light: transparent; } } /* C-A4 PLANT P6 */' >> src/styles/utilities/engage.css
perl -0pi -e 's/\.toggle-group__item:not\(:disabled, \[data-disabled\]\)\[data-press\]/.toggle-group__item:not(:disabled, [data-disabled]):active/; s/\.toggle-group__item\[data-state="on"\]:not\(:disabled, \[data-disabled\]\)\[data-press\]/.toggle-group__item[data-state="on"]:not(:disabled, [data-disabled]):active/' src/components/toggle-group/styles.css
print -- '\n@layer components { .segmented-tab > .segmented-tab__light { display: none !important; } } /* C-A4 PLANT P8 */' >> src/components/tabs/styles/segmented.css
perl -0pi -e 's/transition-delay: var\(--engage-press-drain-release\);/transition-delay: 0s; \/* C-A4 PLANT P9 *\//' src/styles/glass/control-bit.css
git diff --stat -- src | cat
# second round (appended; run as `plant.sh round2` after the first round is in place):
#   P10 CK-08 a second writer of `data-press` outside engage/ (static only: E-7 reads the tree, the build does not import it)
#   P11 CK-09 a minted 77 ms transition on the Chip's press               → E-8 literal chip must FAIL
