# Banked paste blocks — Row #72 W-RAIL-RENAME-THEN-BUILD

Authored by the CURE seat (2026-08-08) with CURE-ORDER-72 C5 + C7 already folded in — the two
refuted claims (*"only the mandatory G-RELAY … was taken"* and *"42 files (+528/−944)"*) do not
appear below in any form. Both blocks are OUT of the executing seat's fence; the driver pastes
them at the landing commit and substitutes the real SHA for `<SHA>`.

**THE ⊕-INDEX IS DERIVED AT COMMIT TIME FROM THE CURSOR'S TAIL — NEVER BANKED AS A CONSTANT.**
At this seat the tail is **⊕⁵⁴** (#59, `EXECUTION-PROGRESS.md:1787`), so **⊕⁵⁵** below is the
best-known value, not an authority. The driver re-reads the tail immediately before pasting and
re-indexes if a lane landed in between.

---

## A · `docs/tranches/BK/EXECUTION-PROGRESS.md` — append to the ledger

```
⊕⁵⁵ **#72 W-RAIL-RENAME-THEN-BUILD LANDS (2026-08-08, `<SHA>`) — CURED before the cut.**
The rename half and the build half in one commit, because neither alone is the wave. **THE
STRIKE**: `rail` named a VERTICALLY-ORIENTED DOCK throughout the band's identifiers — the exact
inversion of the correction ARCHAEOLOGY E29 records the owner making ≥4× — and the noun covered
three unrelated referents at once. Three things, three names: the in-dock tab strip is the
**layer switcher** (`show-rail`→`show-switcher`, `rail-position`→`switcher-position`,
`.dock-layer-rail`→`.dock-layer-switcher`, seven `--dock-layer-rail-*`→`--dock-layer-switcher-*`,
`dockRailContext.ts`→`dockSwitcherContext.ts` with its injection-key STRING, seventeen
component-local identifiers); the vertical dock is `orientation="vertical"`
(`--dock-rail-{padding,extend-length,accent-*}`→`--dock-vertical-*`); the hairline is §BUILD. No
aliases. `--dock-rail-active-accent` was the G-ONE-NAME breach in miniature — the SWITCHER TAB's
selected glyph wearing the vertical dock's prefix, one name over two registers. **CENSUS
RE-DERIVED AT THE CUT, NEVER TRUSTED (the J-10 law this row once violated)**: TR's own
word-boundary detector `rg -w rail src/components/dock/styles` gives **115 occ / 103 lines / 13
files → 0/0/0**, reproducing J-7 exactly and refuting ⊕⁵'s 114/102/13 in the opposite direction
from what ⊕⁵ assumed; a SECOND detector exists because the first is blind to camelCase
(`rg -w rail` cannot see `showRail`) — **D2, the identifier arm, 25 files → 0** across the whole
band. **THE BUILD**: `<DockSeparator anchor>` stamped `data-rail-anchor` +
`.dock-separator--anchor` for a `#rail` slot that existed in NO file, and both markers were read
by **zero** selectors and **zero** code — a prop that did nothing, describing a facility never
built (E29's "five builds, zero surviving components", sitting in the tree as an API). `anchor`
now promotes the separator to `.dock-hairline`: the same primitive and the same ONE colour,
SPANNING its layout root's cross extent instead of floating at `--dock-separator-height`. Both
arms root at `:is(.glass-dock, .dock-layer-group)` — the layer group is a layout root in its own
right everywhere else in that partial, and an arm naming only `.glass-dock` made a standalone
group + `anchor` a paint NO-OP. The two arms do NOT win the same way, and the record says so:
the row arm is **(0,4,0)** and beats every `.dock-separator` layout rule on SPECIFICITY, the
column arm is (0,3,0) and TIES `.glass-dock.vertical .dock-separator`, winning on SOURCE ORDER
alone (declared before it, the column arm silently lost). **ONE HAIRLINE COLOUR**: the band
painted two 1px rules from two sources (`--surface-tint-15` and a `--border 40%` literal); they
collapse onto **`--dock-hairline`**, declared once, read by the separator, the hairline and all
four switcher divider edges — that collapse IS the G-ONE-NAME arm. **ONE PAINT DELTA, stated**:
the switcher divider moves onto `--surface-tint-15`, the dock's own tint rung, which
`dark-arm.css:313` already CLAIMED it rode and did not — the comment was false and is corrected
in this cut. `.dock-separator`'s own paint is byte-unchanged. **LIVE CONSUMER**:
`demo/stories/dock/sections.vue` gains *The hairline*, two live docks (row + column) carrying
`<DockSeparator anchor />` at `data-testid="dock-hairline-{row,column}"`, so #10 has something to
shoot. **GATE seats +0** — `TERMINAL-ROSTER:337` already seats the arm under G-ONE-NAME;
`tests/styles/dock-name-canon.test.ts` ships as an ordinary test file, **7 cases, BORN-RED
`7 failed / 0 passed` on the pre-edit bytes** with case 1 REPORTING the census figure quoted
above (the gate's own output, not a hand count), **6 mutations all biting and all restored
byte-exact**. `SEAT-BINDING.json` untouched, register receipt **byte-identical** pre→post.
**CURED BEFORE THE CUT (CURE-ORDER-72, 8 cures):** three survivors of the row's own target class
struck (`railLayer` in `dock/layers.vue`, `showRail:false` in `useDragMorph.ts:181`, the "Dock
rail navigation" fixture in `data/search.vue`) — and the gate WIDENED to catch them, born-RED
proved on the pre-C1 bytes (`1 failed / 6 passed`, case 4 naming `useDragMorph.ts`) then GREEN;
D2 hardened with the SCREAMING_CASE arm (`DOCK_RAIL_KEY` matched neither of its first two arms).
**FIVE BLIND-RENAME MISATTRIBUTIONS** fixed, where `rail`→`switcher` handed a VERTICAL-DOCK
referent to the tab strip (`density.css` ×2 · `shell.css:387` · `touch-floor.css` ×3 ·
`icon-button.css` ×2) — **and a sixth, `morph.css:254`, VERIFIED CORRECT and left alone** rather
than falsified to satisfy a checklist. **THREE FALSE CLAIMS STRUCK IN THE ROW'S OWN RECORD**: the
"(0,3,0) for both arms" cascade note; "`.dock-layer-group` centres its children" (it is
`align-items: stretch`); and the §9 diffstat, which **did not reproduce for anyone** — re-derived
with a stated detector **D3**, whose PATH arm is load-bearing because the 189-line deletion
`demo/stories/dock/rail.vue` never says the word in its body. D3 on the pre-cure bytes returns
**43 / +529 / −945** (both challengers exactly); the landing cut is **45 tracked files
(+564/−958) + 4 new + 3 renames**, of which **+49/−2 are FOREIGN lines in three HUNK-MIXED files
the driver splits at commit** (`MIGRATION.md`, `CHANGELOG.md`, `src/components/dock/index.ts`) —
so the row's own bytes are **+515/−956**. §7's "the ONE thing taken" clause from `#59`'s
`dock-nav.css` was itself refuted by the diff: a second hunk had gone in, and it carried a
sentence citing `stack-rail.css`, **a file that exists in no tree of this repo**, for a
`--dock-hairline` line nothing in `demo/` paints — STRUCK. `MIGRATION.md`'s "added at 8.0" row
listed eleven names as added when only four are DECLARED in `src/`; it is now two rows, defaults
vs consumer handles. **#47 GF-DOCK's stated hard precondition is DISCHARGED by this landing**
(and with it #42's and #48's chain). π **NOT CLAIMED** — the span in both orientations, light and
dark, and the divider delta are owed to **#10** at its serialized browser seat, with the
`sections.vue` testids as its subjects. ROUTED: `--dock-vertical-{padding,extend-length}`
declared nowhere → **#47** (the dock reach; §8 finding 1) · one surviving `DockRail-chip` PROSE
mention in `glass/surfaces-pager.css` → **#40** (the pager register §7 refuses; a mention is not
a G-RELAY read, and this row does not reach into another lane's file) · `demo/shell/dock-nav.css`
line 94's dead `src/styles/dock-controls.css` cite → the lane that owns that file.
```

---

## B · `docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md` — row 72 append

Append inside row 72's last cell (before the closing `|`). **PIPE-COUNT LAW**: row 72 carries **6
structural pipes** at `TERMINAL-ROSTER.md:222` and must still carry 6 after the append — the
block below contains no raw `|`.

```
 ⊕⁵⁵ **LANDED 2026-08-08 (`<SHA>`; record `docs/tranches/BK/execution/2026-08-08-row72-rail-rename-then-build/RECORD.md`).** Rename AND build in one commit. **CENSUS RE-DERIVED AT THE CUT with both detectors stated in the executable**: TR's own `rg -w rail src/components/dock/styles` = **115 occ / 103 lines / 13 files → 0/0/0** (reproducing J-7, refuting ⊕⁵'s 114/102/13 in the opposite direction), plus **D2**, the identifier arm the word-boundary detector is blind to (`rg -w rail` cannot see `showRail`), **25 files → 0** band-wide. **THREE NOUNS, THREE NAMES**: layer switcher (props, classes, seven tokens, the context file + its injection-key STRING, 17 local identifiers) · vertical dock (`--dock-vertical-*`) · hairline. No aliases. `--dock-rail-active-accent` was the breach in miniature — the switcher tab's glyph wearing the vertical dock's prefix. **THE BUILD**: `anchor` stamped a class and an attribute read by **zero** selectors and **zero** code for a `#rail` slot in **no** file; it now promotes the separator to `.dock-hairline`, spanning its layout root's cross extent, both arms rooted at `:is(.glass-dock, .dock-layer-group)` so a standalone group is not a paint no-op. Row arm **(0,4,0)**, wins on specificity; column arm (0,3,0), wins on source order — the two do not win the same way and the comment now says which. **ONE COLOUR**: two rival 1px sources collapse onto `--dock-hairline`; ONE paint delta, the switcher divider onto `--surface-tint-15`, the rung `dark-arm.css:313` falsely claimed it already rode. LIVE at `demo/stories/dock/sections.vue` (two docks, `dock-hairline-row` + `dock-hairline-column`). **Seats +0**, arm = an ordinary test file, **BORN-RED 7 failed / 0 passed** with case 1 reporting the census, **6 mutations biting, all restored byte-exact**, receipt byte-identical. **CURED BEFORE THE CUT**: 3 survivors struck with the gate widened around them (born-RED proved, then GREEN) · D2 hardened for SCREAMING_CASE · 5 blind-rename misattributions fixed and a 6th VERIFIED CORRECT and left alone · the record's cascade figure, its centring claim and its diffstat all struck as FALSE. **Diffstat re-derived with a stated detector D3** whose PATH arm is load-bearing (the 189-line `dock/rail.vue` deletion never says the word in its body): pre-cure **43 / +529 / −945**, matching both challengers and refuting `42 / +528 / −944`; landing cut **45 files (+564/−958) + 4 new + 3 renames**, **+49/−2 of it FOREIGN in three hunk-mixed files the driver splits**. §7's "ONE thing taken" from `#59`'s `dock-nav.css` was refuted by its own diff — the extra hunk carried a sentence citing `stack-rail.css`, a file in no tree, STRUCK. **#47's hard precondition DISCHARGED.** π NOT CLAIMED → **#10**. ROUTED: `--dock-vertical-{padding,extend-length}` declared nowhere → **#47** · one `DockRail-chip` prose mention in the pager register → **#40**.
```
