#!/bin/zsh
# C-A5 plants on the candidate (P-E5-noveil-coarse = F5″ + P-A5-light + E), applied ONLY in the critic's own worktree
# wt-plant. Each plant is a counterexample a CK row's pass rule names, aimed at one cell (C-A5.md §1.3):
#   Q1  CK-01      Switch root loses `engage-chosen`                          → E-1 adoption switch + latch must FAIL
#   Q2  CK-01/24   every Card focusable (role=option, tabindex=0) under static → E-1 static-inert card must FAIL
#   Q3  CK-03      Checkbox loses its door                                    → E-2 checkbox arrival/ownflush must FAIL
#   Q4  CK-14      the forced-colours arm reaches the dock triggers again     → E-12 fcslop + fc-reach must FAIL
#   Q5  CK-20×12   the control bit's commit light held by a 120 ms delay again (A4's cure, which A5 deleted)
#                                                                              → E-10 rebound switch/checkbox must FAIL
#   Q6  CK-02      Button `--rung-light: transparent`                          → E-2 button arm iii must FAIL (paint)
#   Q7  CK-25      the disclosed press lighter than its hover (200 % → 50 %)  → CAP accordion ladder must FAIL
#   Q8  CK-10      SegmentedTabs' reduce light seat never paints              → E-9 tabs commit-light must FAIL
#   Q9  CK-08      a second writer of data-press outside engage/              → E-7 static must FAIL
#   Q10 CK-09      a minted 77 ms transition on the Chip's press              → E-8 literal chip must FAIL
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p5/C-A5/wt-plant
cd $WT || exit 1
perl -0pi -e "s/'switch control-bit engage-chosen'/'switch control-bit'/" src/components/switch/Switch.vue
perl -0pi -e 's/:role="selectable \? .option. : undefined"/role="option"/; s/:tabindex="selectable \? 0 : undefined"/tabindex="0"/' src/components/card/Card.vue
perl -0pi -e 's/^useEngage\(\(\) => \(rootRef/\/\/ C-A5 PLANT Q3 useEngage(() => (rootRef/m' src/components/checkbox/Checkbox.vue
perl -0pi -e 's/(\@media \(forced-colors: active\) \{\s*):where\(\.engage-chosen, \.engage-pressed, \.engage-disclosed\):where\(:not\(\.dock-trigger, \.dock-select-trigger, \.dock-dropdown-trigger\)\)::after,/$1:where(.engage-chosen, .engage-pressed, .engage-disclosed)::after,/' src/styles/utilities/engage.css
print -- '\n@layer components { .control-bit .control-bit__face > .control-bit__light { transition-delay: var(--engage-press-drain-release); } } /* C-A5 PLANT Q5 */' >> src/styles/glass/control-bit.css
print -- '\n@layer components { .button { --rung-light: transparent; } } /* C-A5 PLANT Q6 */' >> src/styles/utilities/engage.css
perl -0pi -e 's/var\(--foreground\) calc\(var\(--fill-hover\) \* 200%\)/var(--foreground) calc(var(--fill-hover) * 50%) \/* C-A5 PLANT Q7 *\//' src/styles/utilities/engage.css
print -- '\n@layer components { .segmented-tab > .segmented-tab__light { display: none !important; } } /* C-A5 PLANT Q8 */' >> src/components/tabs/styles/segmented.css
print -- '// C-A5 PLANT Q9: a second writer of data-press outside engage/\nexport const plantPress = (el: HTMLElement) => el.setAttribute("data-press", "");' > src/components/toggle-group/plantWriter.ts
print -- '\n@layer components { .glass-chip--interactive[data-press] { opacity: 0.98; transition: opacity 77ms linear; } } /* C-A5 PLANT Q10 */' >> src/styles/glass/glass-chip.css
git diff --stat -- src | cat; git status --short -- src | grep '^??'
grep -c "C-A5 PLANT" src/components/switch/Switch.vue src/components/checkbox/Checkbox.vue src/styles/utilities/engage.css src/styles/glass/control-bit.css src/components/tabs/styles/segmented.css src/styles/glass/glass-chip.css src/components/toggle-group/plantWriter.ts
