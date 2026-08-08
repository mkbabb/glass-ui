# BK #72 — W-RAIL-RENAME-THEN-BUILD · RECORD

**modelId: `claude-opus-5[1m]`** (scout + implement seat; asserted by prefix `claude-opus-5`).
Spec of record: **TERMINAL-ROSTER.md §A row 72** → ARCHAEOLOGY §4 N2 (E29). TR wins on divergence.
Cursor at selection: `docs/tranches/BK/EXECUTION-PROGRESS.md` ⊕⁵⁴, disk HEAD `abd462e0`.

---

## §0 THE SELECTION AND ITS GROUNDS

**Row #72 W-RAIL-RENAME-THEN-BUILD** is the next canonical unstarted Φ5 row in TR order.

TR order is ascending row id. Every lower-numbered Φ5 row is gated, in-flight, or landed, and
each is named here with its gate rather than skipped silently:

| row | why not selectable |
|---|---|
| #21 W-DAG-REDUCE | hard-gated on **#17** (`EXECUTION-DAG:21`), and #17 is Φ4-UNSTARTED |
| #25 W-FIELD-WELL | its own rides-clause — #82's `field-control.css` cut (C-13k) unbuilt |
| #32 · #33 · #34 · #35 | **IN-FLIGHT**: uncommitted bytes in this shared tree (`tabs/SegmentedTabs.vue` + `tabs/styles/*`, `alert/*` + `_shared/feedback/feedback-tone.css`, `slider/Slider.vue` + `slider/types.ts`), the ⊕⁵⁴ census confirmed live at `git status` |
| #40 W-PAGER | **IN-FLIGHT**: `pager-dots/*`, `carousel/*`, `deck/*` uncommitted (10 of this cut's 12 foreign test failures trace here) |
| #42 W-SEARCH | HARD-GATED on **#47** (`EXECUTION-DAG:53`); its scout census was banked INBOUND at `abd462e0` |
| #44 W-TAGS-FIELD | sequenced behind **#43**'s cut (#43 is Φ6-UNSTARTED) |
| #45 W-CONSTELLATION | dep **#52** → dep **#35** (in-flight) |
| #47 GF-DOCK | **#72 hard-precedes it**, plus #89's sever, the #7 fence, and **ASK g11** |
| #48 W-DOCK-FISSION | dep **#47 W7** |
| #49 · #50 · #51 · #53 | **ASK-gated** — g3+g7 · g1 · atlas-ACK+g12 · g4 |
| #52 W-CONFIG-EXPRESS | dep **#35** (C12), in-flight |
| #54 DUAL-ENGINE BAND | Φ4/5, cursor-homed in the Φ4 table; its completion rides ASK-gated #50 W0 and #53 (cursor `:1698`) |
| #55 · #57 · #59 | LANDED (⊕⁵², ⊕⁵³, ⊕⁵⁴) |
| #56 W-DEMO-TRUTH | Q-4 slice landed early; the row stays behind "after lane cuts" |
| #58 | **ASK g11** (ℱ home control), and #73 rides its chassis |
| #67 IOS27-EXEC | **OWNER-GATE: R-7 footage ×3** (draggable loupe · Siri waveform · ChatGPT dock motion; owner = the owner — only the user can film the device) |
| #71 W-EYEGLASS | executes INSIDE #32's cut, which is in-flight |

**#72 itself: zero blockers.** `EXECUTION-DAG:72` — *"none; HARD-PRECEDES #47's first build
commit"*. No ASK gate, no owner gate. `git status --porcelain -- src/components/dock/styles` was
EMPTY at selection. **[CORRECTED 2026-08-08 · CURE-ORDER-72 C7]** The clause that followed —
*"the one dirty dock file, `dock/index.ts`, is another lane's comment-only edit and was not
touched"* — is FALSE. `src/components/dock/index.ts` is HUNK-MIXED: its first hunk (`:7-8`,
`a rail exists` → `a switcher exists` on the `<DockCrossfade>` export note) is THIS cut's, and
only its second hunk (`:43-49`) is foreign. The DRIVER splits it at commit. Landing the row
discharges #47's stated precondition, which in turn is what #42 and #48 wait on.

---

## §1 THE WORK ORDER (TR#72, verbatim)

> strike the rail-as-vertical-dock vocabulary in the same commit that builds the
> hairline-INSIDE-dock; a word the owner corrected ≥2× is forbidden in identifiers.
> ~~✦ census adjudicated (J-7): 115/103/13, layer-group 61, shell 10~~ **⊕⁵ the J-7 figures do
> not reproduce and named no detector (SE-8; zero dock-styles commits since the pin — the drift
> was at adjudication). Re-derived THIS seat, detectors stated: word-boundary
> `rg -w rail src/components/dock/styles` → 114 occurrences / 102 lines / 13 files**
> (layer-group 69 · touch-floor 13 · shell 9 · layers 7 · density 5 · the rest ≤2);
> **plain-substring `rg rail` → 118 / 106 / 14** (+`crossfade.css`). Target 0 unchanged; the
> figure re-derives at the wave's own cut with its detector, never trusted from any census (the
> J-10 law this row itself once violated). **Hard-precedes #47's first build commit**; rides
> G-ONE-NAME

The owner's word (ARCHAEOLOGY §4 E29, reissued ≥4×), quoted once, here, and deliberately NOT
copied back into `src/` — that file tree is where every new reader learned the rejected meaning:

> *"The rail should not be a vertical dock--its a hairline that sits INSIDE the horizontal or
> vertical dock."*

---

## §2 THE CENSUS, RE-DERIVED AT THIS CUT (the J-10 law)

TR's ⊕⁵ pin was **114 / 102 / 13**. It does not reproduce; it had drifted by one, in `shell.css`,
since the pin (dock styles moved under #22, #23, #31). **Re-derived here, and used:**

| detector | pre-cut | post-cut |
|---|---|---|
| **D1** — TR's own, `rg -w rail src/components/dock/styles` | **115 occ / 103 lines / 13 files** | **0 / 0 / 0** |
| D1 per-file (pre) | layer-group **69** · touch-floor 13 · shell **10** · layers 7 · density 5 · shell-regions 2 · icon-button 2 · morph 2 · controls 1 · dock 1 · index 1 · overflow 1 · shape 1 | — |
| plain-substring `rg rail src/components/dock/styles` | **119 / 107 / 14** | **3 / 3 / 3** — every survivor is the *word* `trailing` (`shell.css:252`, `overflow.css:88`, `crossfade.css:113`), not the noun |
| **D2** — the identifier arm, whole dock band | **25 files** | **0** |

**D1 reproduces J-7's original 115/103/13 exactly and refutes ⊕⁵'s 114/102/13** — the opposite
direction from what ⊕⁵ assumed. Both figures ship with their detector, stated in the executable.

**Why D2 exists.** TR's own detector is word-boundary and therefore blind to a camelCase
identifier: `rg -w rail` does not match `showRail` (a word char precedes the `R`). A census that
declares 0 while `showRail` is on disk is precisely the J-10 failure this row once committed. D2
is stated in the test verbatim:

```
D2 = /(?:(?<![A-Za-z])rail|Rail)(?![a-z])/g
```

matches `rail` · `--dock-rail-padding` · `railPosition` · `showRail` · `DockRailContext`;
does not match `trail` · `trailing` · `trailArc` · `useLeadTrail`.

---

## §3 THE STRIKE — three things, three names (G-ONE-NAME)

The noun covered three unrelated referents. Each gets its own, and the corrected word is gone
from the band's identifiers **and** its prose.

**(a) the layer switcher** — the in-dock tab strip that picks a `<DockLayer>` face:
`.dock-layer-rail` → `.dock-layer-switcher` · `.rail-start`/`.rail-end` →
`.switcher-start`/`.switcher-end` · `--dock-layer-rail-{bg,hover,active,gap,padding,glyph}` →
`--dock-layer-switcher-*` · `--dock-rail-active-accent` → `--dock-layer-switcher-glyph-active`
(it was the *switcher tab's* selected glyph all along, wearing the vertical-dock prefix — one
name over two registers, the G-ONE-NAME breach in miniature) · props `showRail` → `showSwitcher`,
`railPosition` → `switcherPosition` · `dockRailContext.ts` → `dockSwitcherContext.ts` with
`DockRailContext`/`DOCK_RAIL_KEY`/`provideDockRailContext`/`useDockRailContext` and the injection
key string all renamed · seventeen component-local identifiers (`railListEl`, `railDrag`,
`railHolds`, `resolveRailSnapTargets`, …) → `switcher*`.

**(b) the vertical dock** — the actual inversion: `--dock-rail-padding` →
`--dock-vertical-padding` · `--dock-rail-extend-length` → `--dock-vertical-extend-length` ·
`--dock-rail-accent-{width,gap,inset}` → `--dock-vertical-accent-*`. The one live consumer,
`demo/shell/dock-nav.css:102`, is re-pointed (G-RELAY: a rename that leaves a consumer reading
the dead name is a silent no-op, the exact failure class the binding-verification discipline
exists for).

**(c) the hairline** — §4.

Prose followed the identifiers: "vertical rail" → vertical/column dock, "side-rail" → side-nav,
"switcher rail" → switcher, "a tall rail" → a tall column, "always-present rail" →
always-present region, "the InstrumentRail component" → the retired instrument-strip component,
and the `layer-group.css` header's whole "de-overloaded the rail noun" NOTE — the paragraph that
taught the rejected meaning to every reader — replaced by a three-noun table.

Clean break, **no aliases** (MEMORY: no backwards compat). `MIGRATION.md` §8.0.0 + `CHANGELOG.md`
book every removed prop, class, attribute and token with its replacement.

---

## §4 THE BUILD — the hairline INSIDE the dock

**What was on disk.** `<DockSeparator anchor>` stamped `data-rail-anchor` and
`.dock-separator--anchor`, and its docblock said `GlassDock` "reads [it] to seat the `#rail` line
AT this divider's measured offset". Measured at this seat:

- `.dock-separator--anchor` — declared in **zero** stylesheets, in `src/` or `demo/`.
- `data-rail-anchor` — read by **zero** selectors and **zero** code.
- the `#rail` slot — **does not exist** in `GlassDock.vue` or anywhere else.

`anchor` was a prop that did nothing, describing a facility that was never built. That is E29's
"five builds, zero surviving components" sitting in the tree as an API.

**What it is now.** `anchor` promotes the separator to **the hairline**: the same primitive, the
same one `--dock-hairline` colour, but SPANNING the dock's cross extent instead of floating at
`--dock-separator-height` with a gap either side.

```css
:is(.glass-dock, .dock-layer-group):not(.vertical):not(.layout-grid) .dock-hairline { align-self: stretch; height: 100%; margin-block: 0; }
:is(.glass-dock, .dock-layer-group).vertical                         .dock-hairline { align-self: stretch; width: 100%;  margin-inline: 0; }
```

**[AMENDED 2026-08-08 · CURE-ORDER-72 C6]** The arms shipped rooted at `.glass-dock` alone, which
made a standalone `<DockLayerGroup>` + `anchor` a paint NO-OP — no arm matched, and the anchored
separator painted as the plain divider while the docblock read as though it spanned. The group is
a layout root in its own right everywhere else in that partial (`:where(.glass-dock,
.dock-layer-group)` anchors ~12 rules; the separator's own column arm already names
`.dock-layer-group.vertical`), so the ARM was built rather than the promise disclosed: the two
arms now root at `:is(.glass-dock, .dock-layer-group)`. `:is()` and not `:where()` — the arms
must keep the specificities in note 1, and a zero-specificity anchor loses to the very separator
rules they exist to override. The specificities are byte-for-byte what shipped: (0,4,0) row,
(0,3,0) column.

Four things are stated rather than assumed:

1. **Cascade.** **[CORRECTED 2026-08-08 · CURE-ORDER-72 C4]** The shipped claim *"Both arms are
   (0,3,0) … source order, not a specificity escalation"* was FALSE for the row arm. Counted:
   `:is(.glass-dock, .dock-layer-group):not(.vertical):not(.layout-grid) .dock-hairline` is
   **(0,4,0)** — `:is()` contributes its most specific argument (0,1,0), each `:not()` its
   argument, plus the target — and it beats every `.dock-separator` layout rule (the most
   specific of those is (0,3,0)) on SPECIFICITY. Only the column arm,
   `:is(…).vertical .dock-hairline`, is (0,3,0): it TIES `.glass-dock.vertical .dock-separator`
   and wins on SOURCE ORDER alone. Declared before them (the first draft) the COLUMN arm
   silently lost — the row arm would not have. The comment in `layer-group.css` now states
   that split mechanism instead of one wrong figure for both.
2. **`align-self: stretch` is load-bearing**, not decoration: a bare `height: 100%` resolves
   against a centred, content-sized box. **[CORRECTED 2026-08-08 · CURE-ORDER-72, same class as
   C4]** the parents that CENTRE are `.glass-dock` (`shell.css:146`) and `.dock-layer`
   (`layers.css:193`); `.dock-layer-group` is `align-items: stretch` on both axes
   (`layer-group.css`), so there the keyword is a no-op belt and the size declaration carries
   the span. The shipped comment named `.dock-layer-group` as a centring parent — it is not.
3. **Grid is excluded from the row arm.** A grid dock is not `.vertical`, and its section break
   already spans (`grid-column: 1 / -1`); `height: 100%` there would stretch a full-row rule to
   the row's height.
4. **No motion is introduced.** The hairline is static chrome inheriting the dock's own
   padding/radius morph through its parent; it never gets a second clock. (The liquid-weight
   edict governs motion the library *adds* — it does not license animating a 1px rule that has
   no state.)

**ONE hairline colour.** The band painted two 1px rules from two different sources:
`.dock-separator` off `--surface-tint-15`, the switcher divider off
`color-mix(in srgb, var(--border) 40%, transparent)`. They collapse onto **`--dock-hairline`**,
declared once in `tokens/sizing.css`, read by the separator, the hairline, and all four switcher
divider edges. That collapse *is* the G-ONE-NAME arm, not a decoration on it.

**PAINT DELTA — one, stated.** The switcher divider moves
`color-mix(in srgb, var(--border) 40%, transparent)` → `var(--surface-tint-15)` =
`color-mix(in srgb, var(--foreground) 15%, transparent)`. The value taken is the dock's own tint
rung, not the shadcn `--border` bridge: `tokens/dark-arm.css:313` already *claims* the dock
divider rides `--surface-tint-*` (it did not — that comment was false, and is corrected in this
cut), and the tint ladder is the one dark re-resolves warm by derivation. `.dock-separator`'s own
paint is **byte-unchanged**; only its source became a name.

**LIVE CONSUMER.** `demo/stories/dock/sections.vue` gains a *The hairline* section with two live
docks — one row, one column — each carrying `<DockSeparator anchor />`
(`data-testid="dock-hairline-row"` / `"dock-hairline-column"`), so the build is visible in the
storybook and not only assertable.

---

## §5 THE GATE — G-ONE-NAME · rail arm, seats +0

`TERMINAL-ROSTER.md:337` already seats it: *"rail-vocabulary → G-ONE-NAME"*. The arm ships as an
ordinary test file, **`tests/styles/dock-name-canon.test.ts`** — 7 cases across two describes.
`SEAT-BINDING.json` is **untouched**; the register receipt is **byte-identical** pre and post
(the #24 precedent: an arm is a test file, not a seat).

**BORN-RED, measured on the pre-edit bytes: `7 failed | 0 passed (7)`**, with case 1 reporting
`{ occ: 115, lines: 103, files: 13 }` — the census figure quoted in §2 is the *gate's own* output,
not a hand count. **GREEN after: `7 passed (7)`.** No `it.fails` latch is left on disk.

### Mutations — five, all bite, all restored byte-exact

| # | mutation | result | sha256 restored |
|---|---|---|---|
| M1 | re-introduce the noun as prose in `dock/styles/shell.css` | `2 failed \| 5 passed` (D1 + D2) | `c6ef73da…5739` ✓ |
| M2 | `showSwitcher?: boolean` → `showRail?: boolean` | `1 failed \| 6 passed` (D2 catches the camelCase D1 cannot) | `a3f78c3b…be67` ✓ |
| M3 | drop `.dock-hairline` from the anchored stamp | `1 failed \| 6 passed` | `3b37d8b1…5a7d` ✓ |
| M4 | drop `align-self: stretch` from the vertical hairline arm | `1 failed \| 6 passed` | `d78bfc1f…2a75` ✓ |
| M5 | switcher divider back onto the `--border 40%` literal | `1 failed \| 6 passed` | `d78bfc1f…2a75` ✓ |
| M6 | drop `.dock-layer-group` from the hairline row arm's root (the C6 build) | `1 failed \| 6 passed` (case 6) | `shasum -a 256 -c` OK ✓ |

M5's first attempt reported "no bite" — the BSD-`sed` edit had silently failed to apply (sha256
unchanged). Re-run through a verified-applied Python edit it bites. It also exposed a real
weakness in case 7, which asserted only ONE of the four divider edges; it now asserts **all
seven** `border-{side}` declarations in the partial resolve to `none` or
`1px solid var(--dock-hairline)`, and that no rival hairline name survives anywhere in the band.

---

## §6 VERIFY GATE (verbatim)

```
$ npx vue-tsc --noEmit
(no output; exit 0)

$ npx vitest run tests/styles tests/components tests/gates
 Test Files  7 failed | 149 passed (156)
      Tests  12 failed | 1415 passed | 5 expected fail (1432)

$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:1
```

**Receipt BYTE-IDENTICAL pre → post.** `violations:1` is **#40's uncommitted deletion of
`tests/components/pager-dots.contract.test.ts`** — recorded, not papered over, and not this row's
to reach (the ⊕⁵¹/⊕⁵³ precedent). The task's quoted `violations:0` cannot reproduce while that
lane sits uncommitted in the shared tree; what this row can and does hold is the byte-identity.

### The 12 failures are FOREIGN — proved, not asserted

The pre-edit baseline was **measured**, not remembered. Every file this cut touches was rewritten
from its `HEAD` bytes in place (`git show HEAD:<path> > <path>` — a read, never `checkout`/
`stash`/`add`), the four new files removed, the three renamed-away originals restored, and the
same battery run:

```
BASELINE (my diff reverted, other lanes' dirt untouched)
 Test Files  7 failed | 148 passed (155)
      Tests  12 failed | 1408 passed | 5 expected fail (1425)

THIS CUT
 Test Files  7 failed | 149 passed (156)
      Tests  12 failed | 1415 passed | 5 expected fail (1432)
```

**The failing set is identical, name for name — 12 before, 12 after. Δ = +7 passed (exactly this
arm's 7 cases), +0 failed.** The 12, with owners:

- `pager-dots/contract.test.ts` ×4 · `pager-dots/morph.test.ts` ×1 · `carousel/contract.test.ts` ×1 → **#40** (untracked test dirs)
- `gates/gate-register.test.ts` ×3 → **#40** (its deleted `pager-dots.contract.test.ts` is the violation)
- `gates/overfit-structure.test.ts` ×1 → **#40** (`useLeadTrail.ts` untracked, 2 unreachable exports)
- `styles/stacked-url-filter.test.ts` ×1 → **#7/#40**, born-RED by its own title (`PagerDots.vue:493`)
- `gates/boot-graph.test.ts` ×1 → dist-demo freshness; the driver's `npm run demo:dist:build` greens it (⊕⁵⁴ precedent)

Zero of the twelve names a dock, a token, or a file in this diff.

**[RE-RUN 2026-08-08 after CURE-ORDER-72]** `npx vue-tsc --noEmit` → **exit 0, no output**.
`npx vitest run tests/styles/dock-name-canon.test.ts tests/components/custom/dock
tests/components/a11y/native-title.test.ts` → **14 files / 104 passed**, the arm still **7/7**
(the cure changed three cases, not their count: case 1 gained the any-case assertion, case 4 the
widened read regex, case 6 the group-root arm). The FULL battery + `gate-register.mjs` receipt +
`demo:dist:build` are the DRIVER's at commit, not re-asserted here; the 12/1415/5 figures below
are the pre-cure measurement and are superseded by whatever the driver measures.

Adjacent suites, run separately: `tests/components/custom/dock` + the arm + `native-title` →
**14 files / 104 passed**. `tests/demo` + `tests/public-surface.spec.ts` → **145 passed / 2
failed**, the same foreign pair #46/#57/#59 each banked (package/lock root metadata and the style
closure, both driven by another lane's `package.json` and unbuilt partials).

---

## §7 REFUSED WITH GROUNDS — other rows' `rail`

The noun lives in registers this row does not own. Each is left alone, named, and routed:

| site | register | owner |
|---|---|---|
| `.progress-rail` (22 sites, `Progress.vue`, `glass/track-well.css`, `glass.css`, `styles/index.css`) | a progress TRACK | **#88 W-PROGRESS-SEAM** |
| `--pager-rail-gap`, `glass/surfaces-pager.css`, carousel/deck/pager "dot rail" prose | the pager dot run | **#40 W-PAGER** — and IN-FLIGHT in this tree |
| `segmented.css` / `SegmentedTabs.vue` "ink rail" | the underline ink | **#32 W-TABS** — in-flight |
| `Slider.marks.test.ts` "mark rail" | the slider mark run | **#35 W-SLIDER** — in-flight |
| `handmark/README.md` "section rail" | math-paper ruling | **#51 GF-HANDMARK** — ASK g12 |
| `timeline.contract.test.ts` "the old rail" | retired prose | **#46**, landed |
| `glass/surface-axis.css` math-paper "section-rail" | the paper ruling | **#86 W-SURFACE-MATERIAL** |
| `sizing.css:486` "value.js's letter-rail ask" | a *foreign consumer's* ask name for a DECLINED primitive | quoted, not an identifier here |
| `demo/shell/{AppShell,SidebarDock,BottomDock,useShellNavDock,dock-nav.css}` + `demo/chassis/layout.css`: `.demo-sidebar-rail`, `grid-area: rail`, `"rail main"/"rail dock"`, `gl-shell-rail`, `railItems`, `--demo-nav-rail-accent-w`, and `layout-canon.test.ts:136`'s asserted `[".demo-sidebar-rail", "rail"]` pair | the demo SHELL's grid contract | **#59 W-LAYOUT**, landed `80f3455f` **2026-08-07** with its own remaining half ORDERED. Re-keying another row's grid-area names one day after its landing, against its own live gate assertion, is the collision the tranche forbids. The ONE thing taken here is mandatory G-RELAY: `dock-nav.css:102` consumed `--dock-rail-accent-width`, a token this cut renames, and a stale consumer there is a silent geometry no-op. |

Everything in scope — the whole of `src/components/dock/**` and the dock's tokens in
`src/styles/tokens/**` — is at 0 on both detectors.

---

## §8 FINDINGS, recorded not silently fixed

1. **`--dock-vertical-extend-length` (was `--dock-rail-extend-length`) is declared NOWHERE.**
   `density.css:35`'s `--dock-content-safe-inset` therefore always resolves its `2.5rem`
   fallback, and the prose claiming the content gutter "tracks the dock geometry in lockstep"
   and "rides `--dock-scale` transitively" is false today. It is a consumer handle with no
   library default. → **#47 GF-DOCK** owns the dock reach.
2. **`tokens/dark-arm.css:313` named the dock divider as a `--surface-tint-*` consumer when it
   was not** — it read `--border 40%`. The claim is now TRUE by construction (§4's fold), and the
   comment is corrected in place.
3. **`layer-group.css` called the vertical separator "cross-extent"** while it sizes off
   `--dock-separator-height`. Struck in place and dated `[BK #72]`; the rule that actually spans
   is `.dock-hairline`.
4. **`--dock-vertical-padding` is likewise undeclared** — `shell.css` falls through to
   `--dock-padding-inline`. Same class as (1), same owner.

**Added 2026-08-08 by CURE-ORDER-72:**

5. **The G-RELAY sentence in `demo/shell/dock-nav.css` was dead on arrival** (C5). It cited
   `stack-rail.css` — a file that exists in NO tree of this repo (only in stale
   `.claude/worktrees`) — for a `--dock-hairline` line nothing in `demo/` paints. It is STRUCK,
   with a dated one-line note in its place; the "transient fan" fact #59 relies on survives in
   the following sentence, untouched. It arrived in the SECOND hunk of a file this row declared
   it had taken exactly ONE thing from (§7's last row, the `--dock-rail-accent-width` re-point)
   — the declaration and the diff disagreed, and the extra hunk minted a fresh instance of the
   very false-comment class this row struck at `tokens/dark-arm.css:313`. A "ONE thing taken"
   clause is a claim about the DIFF, and it has to be counted against the diff.
6. **The `--dock-vertical-*` and four `--dock-layer-switcher-*` names are CONSUMER HANDLES, not
   declared tokens** — `{gap,padding,glyph,glyph-active}` on the switcher and all five
   `--dock-vertical-*` are read through an inline `var(…, fallback)` and declared nowhere in
   `src/`, exactly as their `--dock-rail-*` predecessors were. Only
   `--dock-layer-switcher-{bg,hover,active}` and `--dock-hairline` carry a library default
   (`tokens/sizing.css:420,431-433`). `MIGRATION.md`'s single "added at 8.0" row listed all of
   them as added without the distinction; it is now two rows that say which is which.
7. **`morph.css:254` is the one C3 site that verified CORRECT and was NOT changed.** The order
   listed it among the blind-rename misattributions; measured, it is not one. HEAD read *"the
   16px-min the rail glyph carries"*, and HEAD's own `Floor the rail glyph` rule was
   `:where(.glass-dock, .dock-layer-group) .dock-layer-rail .dock-layer-tab svg { width: 1rem;
   height: 1rem }` — the layer SWITCHER's glyph, today `layer-group.css:246`. The referent is
   the switcher; the comment's parenthetical (*"never a sliver inside an inline-flex column"*)
   quotes that rule's own 4px-sliver derivation. Rewriting it to "the vertical dock" would have
   installed a false comment to satisfy a checklist. Five of the six C3 sites were wrong and
   are fixed; this one was right.

---

## §9 THE CUT

- **45 tracked files changed** (+564 / −958) **+ 4 new**. **[RE-DERIVED 2026-08-08 ·
  CURE-ORDER-72 C7]** The shipped `42 / +528 / −944` did not reproduce for anyone. The figure
  now ships with its detector, **D3**, stated in full: a tracked file with a working-tree diff
  belongs to row #72 iff **(1)** R72 matches its PATH or one of its added/removed diff lines,
  **(2)** it is in the dock band by path (`src/components/dock/**`,
  `tests/components/custom/dock/**`) **or** R72 matched the path **or** one of the matching
  lines is in the dock register (`/dock/i`, or the match is a dock-API prop name —
  `showRail`/`showSwitcher`/`railPosition`/`switcherPosition` do not spell "dock" on their own
  line), and **(3)** its path is not one §7 routes to another owner. R72 is D2 ∪ the build's
  introduced names (`dock-hairline`, `dock-layer-switcher`, `dockSwitcherContext`,
  `--dock-vertical-`, `showSwitcher`, `switcherPosition`, `switcher-start|end`,
  `DockLayerSwitcher`, `dock-name-canon`). Clause (1)'s PATH arm is load-bearing: the 189-line
  deletion `demo/stories/dock/rail.vue` never says the word in its body — the noun is only in
  its filename, and every content-only detector drops it. Run on the PRE-cure bytes D3 returns
  **43 / +529 / −945**, reproducing both challengers exactly and refuting `42 / +528 / −944`;
  the 45 / +564 / −958 above is the same detector after the cure's own edits.
  **Of those totals, +49 / −2 are FOREIGN lines inside three hunk-mixed files** —
  `MIGRATION.md` hunk 2 (+37, #57's `LabeledSelect`), `CHANGELOG.md` hunk 2 (+9, the same),
  `src/components/dock/index.ts` hunk 2 (+3/−2) — so the row's own bytes are **+515 / −956**.
  The four new files:
  `src/components/dock/composables/dockSwitcherContext.ts` ·
  `tests/components/custom/dock/DockLayerSwitcher.a11y.test.ts` ·
  `tests/styles/dock-name-canon.test.ts` · `demo/stories/dock/vertical.vue`.
- **3 renames** (delete + add, unstaged — the driver commits):
  `dockRailContext.ts` → `dockSwitcherContext.ts` ·
  `DockLayerRail.a11y.test.ts` → `DockLayerSwitcher.a11y.test.ts` ·
  `demo/stories/dock/rail.vue` → `vertical.vue` (with the story id `dock/rail` → `dock/vertical`
  re-pointed at `manifest.ts`, `dock-layer-contexts.ts`, `chassis/hero/focal.ts`; the loader is
  `import.meta.glob`, so the file move needs no registry edit).
- **Zero gate seats minted. `SEAT-BINDING.json` untouched. Receipt byte-identical.**
- **[CORRECTED 2026-08-08 · CURE-ORDER-72 C7]** *"No foreign-dirty file was touched"* is FALSE.
  **THREE files are HUNK-MIXED** and the DRIVER splits each at commit: `MIGRATION.md` (hunk 1 =
  this row, hunk 2 = #57's `LabeledSelect` block), `CHANGELOG.md` (same split),
  `src/components/dock/index.ts` (hunk 1 `:7-8` = this row, hunk 2 `:43-49` = foreign). What is
  true, and is what the clause meant to say, is that this row wrote no line into any hunk it
  does not own. `git add` / `commit` / `stash` / `checkout` were not used; one accidental
  `git mv` staged a rename and was immediately unstaged with `git restore --staged`, leaving
  the tree as an ordinary unstaged delete+add.

**#47 GF-DOCK's stated hard precondition is DISCHARGED by this landing.**

### π — NOT CLAIMED

The hairline's cross-extent span, both orientations, light and dark, and the switcher-divider
paint delta are **owed to #10 π-SUITE** at its serialized browser seat. Nothing here is asserted
from paint; every geometric claim in §4 is a source/cascade claim, and the mounted-DOM claims
(cases 5) are mounted-DOM claims. The demo consumer exists so #10's seat has something to shoot.

---

## §10 CURE-ORDER-72 — executed 2026-08-08 (`claude-opus-5[1m]`)

| cure | status | what was done |
|---|---|---|
| C1 | DONE | `demo/stories/dock/layers.vue`: `railLayer` → `verticalLayer` (decl + 3 bindings) · `useDragMorph.ts:181` `showRail:false` → `showSwitcher:false` · `demo/stories/data/search.vue` fixture → "Vertical dock navigation" / "Vertical GlassDock nav column …" / tag `"vertical"`. **Scope note:** the same `layers.vue` block also carried the blind rename in its heading and both testids — `Switcher-hosted layer stack`, `dock-switcher-layer-{host,group}` — on a story whose group is `:show-switcher="false"` inside a VERTICAL dock. Same defect, same file, same block: corrected to `Vertical-dock-hosted layer stack` / `dock-vertical-layer-{host,group}` / `aria-label="Vertical layer dock"`. No consumer reads those ids (checked: only two historical audit docs mention the pre-rename ones). |
| C2 | DONE, born-RED PROVED | Case 4 widened to `…\|showRail\|railPosition\|DockRail(?!-)\|DOCK_RAIL\|rail-(start\|end)` and re-titled "token, class or API". D2 gained the SCREAMING_CASE arm (`(?<![A-Za-z])RAIL(?![a-z])` — `DOCK_RAIL_KEY` matched neither of its first two arms; `TRAIL_MS` still does not match). D1 stays TR's detector VERBATIM (its census figure's provenance) and case 1 asserts the any-case whole word separately. **RED on the pre-C1 bytes: `1 failed \| 6 passed (7)`, offender `src/composables/motion/morph/useDragMorph.ts`. GREEN after C1: `7 passed (7)`.** `DockRail` is in the regex at IDENTIFIER position only — the hyphenated prose form (`DockRail-chip`, one line in `src/styles/glass/surfaces-pager.css`, the pager register §7 routes to #40) is a mention, not a G-RELAY read, and this row does not reach into another lane's file to strike prose. Routed. |
| C3 | 5 of 6 FIXED, 1 VERIFIED CORRECT | Fixed: `density.css:17,21` · `shell.css:387` · `touch-floor.css:91` · `icon-button.css:166,172` — each handed a vertical-dock referent to the switcher. The two negative references at `touch-floor.css:66,96` no longer name the switcher's glyph token inside vertical-dock rules; they name `var(--primary)` directly, which is what the sentence was ever about. **`morph.css:254` NOT changed** — §8 finding 7 gives the measurement: its referent really is the switcher's glyph floor. |
| C4 | DONE | `layer-group.css` + RECORD §4 note 1. Row arm **(0,4,0)**, wins on specificity; column arm (0,3,0), ties `.glass-dock.vertical .dock-separator` and wins on source order. Note 2's centring claim, false in the same block, corrected with it. |
| C5 | DONE | `demo/shell/dock-nav.css` — the `stack-rail.css` / `--dock-hairline` sentence STRUCK, a dated one-line note in its place. The "transient fan" fact #59 depends on survives in the next sentence. §8 finding 5 records the "ONE thing taken" refutation. |
| C6 | **ARM BUILT** (not disclosed) | Ground: `<DockLayerGroup>` is a layout root in its own right *everywhere else in `layer-group.css`* — `:where(.glass-dock, .dock-layer-group)` anchors ~12 rules and the separator's own column arm already names `.dock-layer-group.vertical`. The hairline arms were the ONLY rules in the partial naming `.glass-dock` alone; that asymmetry is the defect, not the docblock. The promise was the design, so the paint was built to it: both arms root at `:is(.glass-dock, .dock-layer-group)`, specificities byte-identical to what shipped. `:is()` not `:where()` — a zero-specificity anchor loses to the separator rules the arms exist to override. Mutation **M6** proves the bite (`1 failed \| 6 passed`, restored `shasum -c` OK). `DockSeparator.vue`'s docblock now states the root pair and the honest residual: with neither ancestor there is no cross extent to span. |
| C7 | DONE | §0:37-39 and §9's "no foreign-dirty file was touched" struck with dated brackets and the hunk-mixed truth stated (driver splits 3 files) · §9 diffstat re-derived with **D3**, stated in full · `MIGRATION.md`'s "added at 8.0" row split into declared-default vs consumer-handle (all eleven names audited, not only the five named in the order) · `sizing.css:477`'s dead `dock-controls.css` path re-pointed to `dock/styles/controls/touch-floor.css`. |
| C8 | DONE | `PASTE-BLOCKS.md` did not exist at this row — the scout never banked it. Both blocks are AUTHORED here with C5/C7 folded in: neither refuted claim appears in either block. Pipe-count law verified on block B (0 raw pipes; the TR row still carries its 6 after a simulated append). |

**VERIFY (this seat):** `npx vue-tsc --noEmit` → exit 0, no output. `npx vitest run
tests/styles/dock-name-canon.test.ts tests/components/custom/dock
tests/components/a11y/native-title.test.ts` → **14 files / 104 passed**, arm **7/7**. Nothing
else run — the full battery, the register receipt and `demo:dist:build` are the driver's at
commit.

**UNFINISHED / ROUTED BY THIS SEAT:** one `DockRail-chip` prose mention in
`src/styles/glass/surfaces-pager.css` → **#40** · `demo/shell/dock-nav.css:94`'s dead
`src/styles/dock-controls.css` cite (outside the one sentence C5 fences) → the lane owning that
file · the three hunk splits → the DRIVER.
