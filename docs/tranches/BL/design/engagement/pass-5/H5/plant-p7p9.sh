#!/bin/zsh
# H5: C-A4's plants P7 and P9 (pass-4/C-A4/plant.sh, the same perl lines), applied ONLY in H5's worktree on top of
# P-A4-light.patch, to show the new cells read the defects pass 4 found:
#   P7 CK-06  ToggleGroupItem's press back on `:active`, not `[data-press]`  → E-5 toggle sustain must FAIL (onset, Chromium)
#   P9 CK-20  the control bit's light no longer waits for the fill (delay 0s) → E-10 rebound is the no-delay CONTROL (must PASS)
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p5/H5/wt
cd $WT || exit 1
perl -0pi -e 's/\.toggle-group__item:not\(:disabled, \[data-disabled\]\)\[data-press\]/.toggle-group__item:not(:disabled, [data-disabled]):active/; s/\.toggle-group__item\[data-state="on"\]:not\(:disabled, \[data-disabled\]\)\[data-press\]/.toggle-group__item[data-state="on"]:not(:disabled, [data-disabled]):active/' src/components/toggle-group/styles.css
perl -0pi -e 's/transition-delay: var\(--engage-press-drain-release\);/transition-delay: 0s; \/* C-A4 PLANT P9 *\//' src/styles/glass/control-bit.css
git diff --stat -- src/components/toggle-group/styles.css src/styles/glass/control-bit.css | cat
