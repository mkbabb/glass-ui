#!/bin/zsh
# C-E5 plants on the candidate (noveil-coarse), applied ONLY in the critic's worktree, each build restored byte-identical
# (`git diff --shortstat HEAD -- src` printed before and after). Each plant is a counterexample the CK row's pass rule
# names, aimed at its own cell; plants that share a build aim at disjoint cells.
#   x1   P1  CK-01  the Switch root loses `engage-chosen`                           → E-1 adoption switch, latch
#        P2  CK-01  every Card focusable (role=option, tabindex=0) under `engage-static` → E-1 static-inert card
#        P3  CK-03  the Checkbox loses its door (useEngage)                        → E-2 checkbox arrival·own
#        P4  CK-14  the forced-colours arm reaches the dock triggers' ::after       → E-12 fcslop
#        P6  CK-02  the Button's `--rung-light: transparent`                       → E-2 button arm iii
#        P7  CK-06  ToggleGroupItem's press back on `:active`                      → E-5 toggle sustain (Chromium)
#        P8  CK-10  SegmentedTabs' light seat never paints                         → E-9 tabs commit-light
#        P11 CK-09  a minted 77 ms transition on the Chip's press                  → E-8 literal chip
#        LAD CK-25  the disclosed press at 30 % of the hover's ink (lighter than the hover) → CAP accordion ladder
#        ANC CK-22  the consumer anchor's write-back removed (C-E4 pl-anchorlost)   → E-12 consumer anchor
#        WHL CK-22  the wheel listener removed (C-E4 pl-wheelchain)                → E-12 wheel over engaged control
#   x2   RBD CK-20  the commit light's fill-clock delay restored (the pass-4 defect) → E-10 rebound switch/checkbox
#        NOW CK-20  the place observer never armed (P-E5's `nowatch`)               → E-10 stale place
#   x3   PAN CK-20  one shared footprint anchor (C-E3's p-anchor)                  → E-10 hand-off centre
#   x4   LOUD CK-21 settle.ts `loud` says nothing (console.debug)                  → E-11
#   k-char, k-script, k-tabhand, k-mod  CK-04 (C-E4's four)                        → E-3
#   act  CK-06/17 the slider's squish back on `:active` alone (P-E5's activeonly)  → P-E5 slider-press
#   P10  CK-08  a second writer of `data-press` outside engage/ (static: a copy of src with one file added) → E-7 static
set -u
source /Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-5/C-E5/run-ce5.sh
cd $W || exit 2
pp() { perl -0pi -e "$2" $W/$1; if grep -qF -- "$3" $W/$1; then print -- "  applied: $1 ($(grep -nF -- "$3" $W/$1 | head -1 | cut -c1-110))"; else print -- "  NOT APPLIED: $1 ($3)"; fi; }
app() { print -- "$2" >> $W/$1; print -- "  appended: $1"; }
open_() { arm noveil-coarse; print -- "== $1 · before: $(git diff --shortstat HEAD -- src | tr -d '\n')"; cp -R $W/src $O/src.bak; }
close_() { build $1; rm -rf $W/src && mv $O/src.bak $W/src; print -- "== $1 · restored: $(git diff --shortstat HEAD -- src | tr -d '\n') · $(consts)"; }

open_ plant-x1
pp src/components/switch/Switch.vue "s/'switch control-bit engage-chosen'/'switch control-bit'/" "'switch control-bit'"
pp src/components/card/Card.vue 's/:role="selectable \? .option. : undefined"/role="option"/; s/:tabindex="selectable \? 0 : undefined"/tabindex="0"/' 'tabindex="0"'
pp src/components/checkbox/Checkbox.vue 's/^useEngage\(\(\) => \(rootRef/\/\/ C-E5 PLANT P3 useEngage(() => (rootRef/m' 'C-E5 PLANT P3'
pp src/styles/utilities/engage.css 's/(\@media \(forced-colors: active\) \{\s*):where\(\.engage-chosen, \.engage-pressed, \.engage-disclosed\):where\(:not\(\.dock-trigger, \.dock-select-trigger, \.dock-dropdown-trigger\)\)::after,/$1:where(.engage-chosen, .engage-pressed, .engage-disclosed)::after,/' ':where(.engage-chosen, .engage-pressed, .engage-disclosed)::after,'
app src/styles/utilities/engage.css '@layer components { .button { --rung-light: transparent; } } /* C-E5 PLANT P6 */'
pp src/components/toggle-group/styles.css 's/\.toggle-group__item:not\(:disabled, \[data-disabled\]\)\[data-press\]/.toggle-group__item:not(:disabled, [data-disabled]):active/; s/\.toggle-group__item\[data-state="on"\]:not\(:disabled, \[data-disabled\]\)\[data-press\]/.toggle-group__item[data-state="on"]:not(:disabled, [data-disabled]):active/' '.toggle-group__item:not(:disabled, [data-disabled]):active'
app src/components/tabs/styles/segmented.css '@layer components { .segmented-tab > .segmented-tab__light { display: none !important; } } /* C-E5 PLANT P8 */'
app src/styles/glass/glass-chip.css '@layer components { .glass-chip--interactive[data-press] { opacity: 0.98; transition: opacity 77ms linear; } } /* C-E5 PLANT P11 */'
pp src/styles/utilities/engage.css 's/var\(--foreground\) calc\(var\(--fill-hover\) \* 200%\)/var(--foreground) calc(var(--fill-hover) * 30%)/' 'calc(var(--fill-hover) * 30%)'
pp $ST 's/    if \(h\.own\[0\]\) host\.style\.setProperty\("position-anchor", h\.own\[0\], h\.own\[1\]\);/    if (false) host.style.setProperty("position-anchor", h.own[0], h.own[1]);/' 'if (false) host.style.setProperty("position-anchor"'
pp $ST 's/    host\.addEventListener\("wheel", onWheel, \{ passive: false \}\);/    void onWheel; \/\/ C-E5 plant WHL/' 'void onWheel; // C-E5 plant WHL'
close_ plant-x1

open_ plant-x2
pp src/styles/utilities/engage.css 's/(            opacity var\(--engage-commit-light-attack\) var\(--ease-decelerate\),\n            background-color var\(--engage-commit-light-release\) var\(--ease-standard\);\n)/$1        transition-delay: var(--engage-press-drain-release); \/* C-E5 PLANT RBD *\/\n/' 'C-E5 PLANT RBD'
pp $ST 's/    arm\(1\);\n    h\.unwatch = /    \/\/ C-E5 PLANT NOW: arm(1);\n    h.unwatch = /' 'C-E5 PLANT NOW'
close_ plant-x2

open_ plant-x3
pp $ST 's/const anchor = `--engage-footprint-\$\{page\}-\$\{\+\+anchors\}`;/const anchor = "--engage-footprint"; void page; void anchors;/' 'const anchor = "--engage-footprint";'
close_ plant-x3

open_ plant-x4
pp src/composables/motion/engage/settle.ts 's/    console\.error\(\n        `\[glass-ui\] \$\{who\}: \$\{token\} is unreadable/    console.debug( \/\/ C-E5 PLANT LOUD\n        `[glass-ui] ${who}: ${token} is unreadable/' 'C-E5 PLANT LOUD'
close_ plant-x4

open_ plant-k-char; pp $UE 's/\} else if \(keys\.has\(k\)\) keyed\.value = true;/} else if (keys.has(k) || k.length === 1) keyed.value = true;/' 'keys.has(k) || k.length === 1'; close_ plant-k-char
open_ plant-k-script; pp $UE 's/keyed\.value = !pointed && keysDown\.has\("Tab"\);/keyed.value = !pointed;/' 'keyed.value = !pointed;'; close_ plant-k-script
open_ plant-k-tabhand; pp $UE 's/const isHeld = computed\(\(\) => hand\.value \|\| scrubbing\.value\);/const isHeld = computed(() => hand.value || scrubbing.value || keyed.value);/' 'scrubbing.value || keyed.value);'; close_ plant-k-tabhand
open_ plant-k-mod; pp $UE 's/\} else if \(keys\.has\(k\)\) keyed\.value = true;/} else if (keys.has(k) || ["Shift", "Meta", "Control", "Alt"].includes(k)) keyed.value = true;/' '["Shift", "Meta", "Control", "Alt"].includes(k)'; close_ plant-k-mod
open_ plant-act; pp src/components/slider/styles.css 's/^\.glass-slider\[data-held\] \.slider-range \{/.glass-slider:active .slider-range { \/* C-E5 PLANT act *\//m' 'C-E5 PLANT act'; close_ plant-act

# P10: E-7's static arm reads <wt>/src; a copy of the candidate's src with one extra writer
rm -rf $O/p10 && mkdir -p $O/p10 && cp -R $W/src $O/p10/src
print -- '// C-E5 PLANT P10: a second writer of data-press outside engage/\nexport const plantPress = (el: HTMLElement) => el.setAttribute("data-press", "");' > $O/p10/src/components/toggle-group/plantWriter.ts
print -- "P10 tree: $O/p10 ($(grep -rl 'C-E5 PLANT P10' $O/p10/src))"
print -- "worktree vs HEAD after plants: $(git diff --shortstat HEAD -- src | tr -d '\n') · $(consts)"
