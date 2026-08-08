# Banked paste blocks — BK #80 W-BUTTON (2026-08-08)

Out of the code fence. The driver applies these at the landing commit, substituting the real SHA for
`<SHA>` and the real ledger index for `⊕ⁿ`. **Both stay LITERAL here.** The ⊕-index was banked as a
hard `⊕⁵⁷` on the first pass; it is a placeholder again because the driver derives it at commit time
from the cursor tail, and a lane that commits ahead of this one moves it.

> **[CORRECTION 2026-08-08 · CURE-ORDER-80]** Every figure in these cells is folded to the
> post-cure truth: the `backdrop-filter` detector · the C-7 cell (the chip arm was NOT free — C1
> strikes `outline-none` from `chipVariants.ts` + `menuRowClass.ts`, and the DropdownMenu/Command
> rows are still dark by unlayered CSS) · the specular blast radius (ONE live delta, the dock, with
> a #47-unpark notice) · R-C's withdrawn Safari ground + the undisclosed `@media (hover: hover)`
> fence · the diff-stat captioned FENCE-FILTERED with the real repo figure named · FOUR shared-dirty
> files with their `-U0` hunk addresses, `focus-visible.test.ts` hunk 1 excluded as #35's · P7 recast
> two-plus-one. Seat modelId `claude-opus-5[1m]`.

---

## A · `docs/tranches/BK/EXECUTION-PROGRESS.md` — Φ5 table, replace the row #80 cell

Current:

```
| 80 | W-BUTTON | Φ5 | UNSTARTED | TR#80 → CWT-3 §LANE button | lane gates; owns `base.css:113-117` (C-7); precedes K2 strike (C-8); after #68 |
```

Replace with:

```
| 80 | W-BUTTON | Φ5 | ⊕ⁿ **LANDED 2026-08-08** at `<SHA>` ~~UNSTARTED~~ — the tier-3 band's second lane, and the one where the louder rung stopped being the deader material. **ONE MATERIAL OWNER**: the host drops `.glass-wash` and composes `.glass-capsule` + **`.glass-specular-track`**, and `button/styles.css` declares **zero** `backdrop-filter` DECLARATIONS, down from 2 (detector stated, because the bare figure misleads: `grep -c backdrop-filter src/components/button/styles.css` returns **1**, not 0 — `grep -c` counts LINES and the one hit is `styles.css:5`, a prose line in the header comment naming the property it forbids) — on HEAD `--glass-blur-deep` was scoped to `.glass-deep`, which the host did not carry, so primary resolved IACVT → `none` at (0,2,0) and BEAT the capsule's working fallback: the loudest button in the library painted no glass at all. The gleam seat moved for a mechanism, not a preference — `material.css:269` transitions `.glass-specular-track::before` **unqualified** while every ladder rung is `:hover`/`:active`-scoped, so a rung-seated gleam faded in over 240ms and snapped out in 0. **PRIMARY carries `.glass-deep` AND `--glass-depth: var(--glass-depth-content)`**, mandatory because `deep.css:105-113`'s tier map keys on the ladder classes this host deliberately does not carry — without the grade the registered `initial-value: 1` paints the 16px MENU ceiling on a button. **SECONDARY becomes the quiet rung on BOTH axes** (`--glass-veil-tier` + `--glass-blur-floating` → quiet), which the HEAD file's own comment already demanded, and which is what makes `blur(primary) > blur(secondary)` true on merit (18.6 vs 14px) rather than by luck — see the §4 defect below. **THE RING LEAVES `box-shadow` (C-7)**: `.focus-ring:focus-visible` + `.interactive-item:focus-visible` invert to `outline: var(--focus-ring-width) solid <--ink-perimeter 0.48>` + `outline-offset: 2px`, and **both** the `box-shadow` and the `border-radius: var(--radius-pill)` writes die — the second was a GEOMETRY mutation on focus, live on every non-pill `.focus-ring` consumer (dialog ✕, toast action, chip cell arm all corner-snapped on Tab). Every emphasis×tone cell now has an indicator; none loses its material; the retired 0.30 ring measured 1.91:1 against a 3:1 bar and its 8px bloom was sub-edge (1.17:1) rescue. **THE INVERSION IS NOT FREE ON EVERY CONSUMER, AND SAYING SO WAS THE CUT'S ONE BLOCKING ERROR.** `outline` is a channel with competitors after all — not in the cascade, but in the LAYER order: `.outline-none { outline-style: none }` sat in `@layer utilities` (built-sheet offset 209175) and both inverted utilities sit in `@layer components` (116253 / 117687), so any consumer composing the Tailwind `outline-none` beside them handed the new ring straight back. Two did, and the strike is part of this cut: **`chip/chipVariants.ts:6`** — the chip's interactive arm, which the "three components fixed by one declaration leaving" line had claimed as free collateral when in fact it was left with a fixed corner and NO indicator at all — and **`_shared/menu/menuRowClass.ts:6`**, which cost `SelectItem`'s rows the ring the inversion had just installed. The token's whole job was killing the UA ring in the box-shadow era; an author-origin `outline` supersedes it, so nothing replaces it, and the bare `.outline-none` rule is now ABSENT from the built sheet entirely. Dialog ✕ and toast action ARE free; the chip is **two-plus-one**, bought by a strike. Still dark, recorded not hidden: the four `DropdownMenu` rows and `CommandItem` compose `.interactive-item` beside a bare `outline: none` in UNLAYERED SFC-imported CSS (`dropdown-menu/styles.css:54`, `command/styles.css:96`), which beats every layered rule outright — they keep `menu.css`'s row-fill highlight and no outline, which is a C-7 completeness gap for their own lanes, with **#31** the consistency home. **TONE TINTS, IT NEVER REPLACES**: `tone` narrows to `Extract<Tone,"neutral"\|"destructive">` (clean break, no alias, `ButtonTone` published), the three dead tone blocks + the opaque `background: var(--destructive)` + the fourth boundary ink + `--shadow-sm` all die, and destructive re-points `--glass-capsule-fill` to the emphasis's own composed plate mixed toward the tone at **`--feedback-tone-strength`** — byte-identical mix SHAPE to `feedback-tone.css:71-76`, so a destructive Button and a destructive Alert are one grammar. Emphasis stays live under tone by construction: **no selector names two axes** (HEAD's primary-destructive ≡ secondary-destructive modulo `font-weight: 650`, which dies). The product resolves through five channel seams (`--button-tone`/`--button-accent`/`--button-quiet-ink` hues owned by `[data-tone]`; `--button-ink`/`--button-edge` roles owned by `[data-emphasis]`), never a matrix of compound selectors. **THREE STATES THAT DIFFER**: `loading` stops writing native `disabled` — it stays Tab-reachable, reports `aria-busy`, and its `cursor: progress` becomes reachable at last (it sat behind `:disabled { pointer-events: none }`, which no cursor resolves through); the guard widens to every host so a loading native button still refuses its form submit. Disabled recasts to **dim ≠ desaturate**: the blanket `opacity` and `pointer-events: none` die (restoring the cursor and any consumer `title`), the silhouette keeps full alpha and the INK alone recedes with its chroma. The PRM block dies outright — it existed only to clobber composed surface legs `base.css`'s own doctrine says survive PRM; the spatial legs stay zeroed by `.tap-squish` + `.glass-capsule-hover` + `respectReducedMotion`. **THE MERGED TRANSITION LIST is authored, not accidental** (T-2): `.button` imports after both `.tap-squish` and `.glass-capsule-hover` and declares the coherent set once, mirroring tap-squish's legs; deleting the loser's `scale` leg — the other candidate cure — resurrects nothing and leaves `scale` untransitioned on every tap-squish consumer in the library. **THE BOX RIDES THE RANK SERIES**: pads `{8,8,12,12}` and gaps `{4,4,8,8}` read `--space-atom`/`--space-body`/`--space-residue`, so §3.4's mobile transposition (12→8, 8→4, 4→4) arrives from the ONE width query at `sizing.css:595-604` and the file carries **no breakpoint of its own**; three type faces over four boxes (`--control-text-sm` · `--control-text` · `--type-body`, the W-SEARCH ruling carried not re-derived); `size="xs"` KEPT (TR, atlas `YearScrubber.vue:65`). `data-control-target` stamps **unconditionally** — HEAD stamped it only on the arm that was already square, the exact inversion of `responsive.css:6`'s live `min-inline-size` leg. **U-40 DISCHARGED**: `el` is threaded into `useLiquidPress` via the ONE `asElement` resolver, so the press cap derives off the live `--motion-weight` at the host; the silent half-wire is gone. **THE SILENT BREAK GETS A VOICE** (T-9b, o19 A-1): a DEV-gated `console.error` on `variant` / `size ∈ {icon, default}`, prod-stripped, never a throw. Struck elsewhere: the `--scale-press-btn` alias (one name per rung; `SegmentedTabs` re-points and drops its `"0.97"` masking literal; five prose citations corrected on the text) · `outline-none` from `chip/chipVariants.ts` + `_shared/menu/menuRowClass.ts`, per the C-7 note above · `--glass-specular-btn-hover` → **`--glass-specular-capsule-hover`** declared on `.glass-capsule-hover` (T-9c — the rung is the capsule's). **Blast radius, RE-COMPOSED after the first statement over-claimed it:** the rung reaches only a host that HAS a `::before` for `material.css` to light, so of every capsule composer exactly **ONE** changes paint — `.dock-icon-button` (`DockControl.vue:92`), a `::before`-cohort member, moving 0.10→0.14 light / 0.08→0.11 dark on hover. The chip, the segmented pill and the drag-lift hosts carry `.glass-capsule`/`.glass-chip`, which are in NO cohort, so they had no gleam to change and still have none. **NOTICE TO #47 GF-DOCK (the C-8 pattern — a handoff, not a gate):** that one delta lands on the PARKED dock's surface; #47 reads it at unpark and either ratifies the capsule rung on its controls or re-points the token at its own seat. #80 owes no dock capture and claims none. · the dead host `--specular-intensity: 0.14` literal and its false "drives the REAL gleam-opacity channel" comment (`inherits: false` AND `material.css:178` declares it on the pseudo — doubly dead; and the `.glass-drag-lift` host loses nothing not because the `[data-dragging]::before` cohort rescues it — it cannot: that cohort keys on an ATTRIBUTE whose sole library writer is `SheetContent.vue:301`, on a class list the `.glass-capsule` host is not in — but because the host has no `::before` AT ALL) · `glass.css`'s false import-rationale sentence (custom properties resolve at computed-value time; the real consequence is cascade-tie order) · the `tests/components/ui/` phantom hop. Demo re-authored: a 4×2 emphasis×tone matrix, an `as-child` mount on the story surface, a real loading specimen, the `<StatusDot>` pseudo-spinner and both false blurbs gone. **THREE REFUSALS WITH GROUNDS, all on rows that landed AFTER the spec was written**: (a) the §3.5 **loading track** — #28 W-FEEDBACK-MOTION made `<DotRing>` *"the library's ONE work-in-flight affordance"*, so a button-local seam track is the second mark #28 spent a row collapsing, and T-9a's clock precondition can never arrive because #26 renamed `orb-drop` → **`present`**, not `transient` (no such row on disk); the Button mounts `<DotRing>` on the EasingPicker precedent; (b) the §3.4 **r10 icon corner** — #23 W-RADIUS-ROLE's spine assigns `icon / single tap-target → 50%` and `calc(--button-size / 2)` on a square box IS that; (c) G-BTN-MATERIAL's literal "warm-floor `color-mix`" wording — the substance (compose over `var(--glass-veil)`, never a bare plate token) is what ships and what the executable asserts, and the tone replacing the warm floor as the chroma source is the better answer for a destructive command. The Safari-nesting ground first offered for this refusal is **DECORATIVE and is withdrawn as load-bearing**: the house already nests `color-mix` through `var()` indirection in this very register — `glass-capsule.css:49-56` writes `color-mix(in oklab, var(--glass-veil), …)` and `--glass-veil` is itself a `color-mix(` at `glass/veil.css:65` — so the declaration-drop trap `material.css:199-201` names is not a hazard this deviation escapes. It stands on paint merit alone. **A fourth deviation, undisclosed on the first pass and on the record now:** the quiet/text hover arms (`styles.css:183-186`ff) are fenced behind `@media (hover: hover)`, correct on merit and the same idiom `utilities/base.css:217` already rules `.interactive-item:hover` with (`:hover` latches on a coarse pointer and paints a tapped command as permanently pointed-at) — but it DOES change coarse-pointer behaviour for two arms, which now acknowledge by the press rung alone. **FOUND BESIDE THE ORDER, recorded not silently fixed: `.glass-deep` IS INVERTED AT HEAD** — `--glass-blur-floating-radius` is **20px** and `--glass-blur-deep-radius` is **16px**, so `deep.css:63-70`'s LERP paints content **18.6** / popover **17.2** / menu **16.0** px against a plain floating rung of **20px**: every deep surface in the library is LESS blurred than the same surface without the decoration, under prose still citing an 11px floating floor. Not this row's fix (calm radii are #22's, SEALED; deep endpoints are #68's, SEALED) → **routed #69 W-PERF** (F-6 blur budget) with #68 named as the token home. Also routed: `material.css:327`'s false leave-transition comment → **#61**. Gate seats **+0** (§5's five are execution-time probes, §B.5 acceptance class — the #79 precedent); executable `tests/components/button/Button.test.ts`, **24 cases**, **11/11 mutation bites RED** and every mutation reverted byte-exact, no `it.fails` latch. **VERIFY**: `vue-tsc --noEmit` exit 0, no output · battery `11 failed \| 1437 passed \| 5 expected fail (1453)`, **every failure FOREIGN** and traced (#40 W-PAGER ×9 incl. the 3 `gate-register` rows whose subject file it moved, #7's unit case ×1, the `useLeadTrail` export leak ×1) · `tests/components/button` **24 passed (24)** · register receipt **byte-identical pre→post** `seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:1` (the violation is #40's) · `regen-exports` **exportKeys 66/66, EXACT REPRODUCTION: YES** · `npm run demo:dist:build` exit 0 (the only build path this fence can green; `npm run build` stays RED on #40's uncommitted `embla-carousel*` lockfile disagreement, and `public-surface.spec.ts`'s 2 failures are both downstream of it, exactly as #79 ⊕⁵⁶ recorded). π NOT CLAIMED — P1-P9 → **#10** against RECORD §7's ten-row delta table (P7's collateral is **two-plus-one**, not three free: dialog ✕ and toast action come free with the `border-radius` write leaving, the chip cell arm is bought by the `outline-none` strike — and #10 should add one `/display/select` menu row to the walk while banking the DropdownMenu/Command rows as the known-RED cell, never as a fresh find), P6 BLOCKED on **#3**; `/display/buttons`'s banked 229/222 void baseline is SUPERSEDED by the re-authored story, so #10 re-takes it rather than checking the old figure. `git diff --numstat` **FENCE-FILTERED to the 16 paths this cut owns outright** (15 M + 1 D): **+456 −327**, of which one file is a whole deletion, −139 (the `tests/components/ui/` hop), plus the new **355-line** executable. That figure is a FILTER, not the repo's: bare `git diff --stat` at this tree emits **91 files changed, 2911 insertions(+), 3698 deletions(−)**, because five foreign lanes sit uncommitted beside it. **FOUR further files were ALREADY DIRTY from those lanes** and carry hunks of this cut's in regions the foreign diff does not touch — the driver splits them at **`-U0`** by index surgery, and `-U0` is not a preference: at the default `-U3` `scale-paper.css`'s line-26 deletion and the nearest foreign hunk at line 32 overlap on context and git emits them as one. `SegmentedTabs.vue` (#32) — `@@ -270 +277,4 @@`, the `readToken` re-point plus its 3-line rationale. `scale-paper.css` (**#71 GF-EYEGLASS**, not the tab-indicator retune: its hunks delete `--tab-indicator-blob-max` and cite `morph/eyeglass.ts`) — `@@ -15,2 +15,4 @@` and `@@ -26 +27,0 @@`. `tabs/styles/drag.css` (#32) — `@@ -31,5 +31,17 @@`, the dangling-citation correction to a specular group THIS cut deleted. And `tests/components/a11y/focus-visible.test.ts` (**#35 W-SLIDER**) — **the dropdown-comment hunk `@@ -43 +43,3 @@` ONLY**: hunk 1 re-points `const SLIDER` to `src/components/slider/styles.css`, a file that is UNTRACKED at this commit, so carrying it here RED's a clean checkout on `readFileSync`; it is #35's, and the twin re-point in the unclaimed `coarse-target.test.ts:38` proves the class rather than the coincidence. Record: `execution/2026-08-08-row80-button/RECORD.md` | TR#80 → CWT-3 §LANE button | lane gates; owns `base.css:113-117` (C-7) — LANDED; precedes K2 strike (C-8) — the Button edge is in, #86 may cut; after #68 (SEALED) |
```

## B · `docs/tranches/BK/EXECUTION-PROGRESS.md` — append after the ⊕⁵⁶ block

```
⊕ⁿ **#80 W-BUTTON LANDS (2026-08-08, `<SHA>`) — the tier-3 band's second lane.** [body as recorded
in the row cell above; the seat-level detail lives at
`docs/tranches/BK/execution/2026-08-08-row80-button/RECORD.md`.]

**Φ5 procession: next = re-scout.** #80 unblocks **#86 W-SURFACE-MATERIAL**'s K2 half by discharging
C-8 (Button edge first) — but #86 also carries the C-1 joint `track-well.css` cut with **#88** and
#89's `resolve.ts` move, so it opens only with those read fresh. The rest of the tier-3 band
(#81 · #83 · #84 · #85 · #86 · #87 · #88 · #89) keeps the single satisfied precondition #68 and is
selectable in TR order, with the §B.7 sequencing re-derived, never assumed: **#82** stays behind
**#83** (C-6 `_shared/control.ts`) and ASK g6 · **#86** and **#88** cut `track-well.css` JOINTLY (C-1)
· **#84** is hard behind #19's `SelectionOption` widening (LANDED ⊕³⁹, satisfied) · **#89**'s sever
precedes #47's first build commit · and **C-10 stands for all ten**: ONE batched export-surface cut
and ONE `public-surface.spec.ts` re-pin for the subpath mints, which no lane bumps solo (this row's
`ButtonTone` addition is a types-only publication on an existing subpath, not a subpath mint — the
#79 `CardAction` precedent read the other way). #21 stays gated on #17 (Φ4-UNSTARTED), #25 on its
rides-clause, #22 is CURE-CUT, #42/#44/#45/#47/#48/#52 stay behind their DAG edges, #49/#50/#51/#53
are ASK-gated, #58/#73 on ASK g11, #67 on the owner's R-7 footage, #74 inside #88's cut. **#32 · #33
· #35 · #40 · #71 STILL SIT UNCOMMITTED IN THIS WORKING TREE** — all eleven of this cut's foreign
failures trace to #40 and #7. The cursor alone cannot show a lane that has not committed (⊕⁴⁸), so
the next scout re-derives from the DAG **and** `git status`, never from this block's list.

**THE CUT WAS ADJUDICATED CURE-REQUIRED AND THE CURES ARE IN IT, not appended to it.** The one
BLOCKING code cure: C-7 inverted the shared focus ring onto `outline`, and two consumers were still
composing Tailwind's `outline-none` beside it — `@layer utilities` beats `@layer components`
outright, so the chip's interactive arm shipped with NO indicator and `SelectItem`'s rows lost the
ring the inversion had just installed. Both strikes are in this commit (`chip/chipVariants.ts:6`,
`_shared/menu/menuRowClass.ts:6`); the bare `.outline-none` rule is now absent from the built sheet;
the FULL verify gate was re-run after and every figure below is the post-cure run. **FOUR files in
this cut are shared-dirty with foreign lanes** and were split at `-U0` by index surgery, not at the
default `-U3` (where `scale-paper.css`'s deletion merges with #71's): `SegmentedTabs.vue` (#32) ·
`scale-paper.css` (#71) · `tabs/styles/drag.css` (#32) · and `tests/components/a11y/focus-visible.
test.ts` (#35) — **from which ONLY the dropdown-comment hunk travelled**, because hunk 1 re-points a
constant at `src/components/slider/styles.css`, a file #35 has not committed yet, and carrying it
here would RED a clean checkout on `readFileSync`.

**NEW ON THE REGISTER — two live defects this cut found and refused to hide.**
**(1)** `.glass-deep` paints a
THINNER blur than the plain floating rung at every grade: `--glass-blur-floating-radius` **20px** vs
`--glass-blur-deep-radius` **16px** gives content 18.60 / popover 17.20 / menu 16.00 px against a
20px floor, so the deep register is inverted library-wide (deep Card, dialog, menu content) under
prose at `glass-deep.css:56-58` and `deep.css:49` still citing an 11px floating floor. #80 routed
around it on merit (secondary took the quiet rung on both axes) rather than working around it.
**Owner: #69 W-PERF** (F-6 blur budget), token home **#68**.
**(2)** C-7's outline is DEAD on five more surfaces, and by a mechanism the `outline-none` strike
cannot reach: `DropdownMenuItem` / `CheckboxItem` / `RadioItem` / `SubTrigger` and `CommandItem` all
compose `.interactive-item` beside a bare `outline: none` in `dropdown-menu/styles.css:54` and
`command/styles.css:96`, which ship **UNLAYERED** via `<style src>` on their SFCs and therefore beat
every layered rule in the sheet regardless of specificity. They keep `menu.css`'s row-fill
highlight, so none is indicator-less — but `SelectItem` now rings and its five structural twins do
not, which is a consistency defect the strike EXPOSED rather than caused. Untouched here (neither
file is in this fence, and whether a menu row should carry both a fill and an outline is a design
call). **Owners: each surface's own UNSTARTED tier-3 lane; consistency home #31 BAND-A11Y.**
```

## C · `docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md` — append to the §A row #80 cell

Append, in place, at the end of the existing cell text (after `…the allowlist form is the F14 class,
no escalation seat`):

```
 ⊕ⁿ **LANDED 2026-08-08 (`<SHA>`)** — cut per CWT-3 §LANE button as adjudicated, with C-7 executed
and C-8 satisfied by ordering. **U-40 DISCHARGED by THREADING** (`el` → `useLiquidPress` via
`asElement`; the static path was never taken as terminal). **Atlas A-5 CONFIRMED ALREADY ON DISK**
from #23's landing and kept verbatim — bare `min()` still refused. **o19 A-1 LANDED** as the CWT-3
§3.9 DEV-gated `console.error` (`variant` / `size ∈ {icon, default}`), prod-stripped, never a throw,
no allowlist and no escalation seat. `size="xs"` KEPT as ruled. **THREE SPEC CLAUSES REFUSED, each
superseded by a row that landed after the spec was authored, each with its ground on record**:
(a) §3.5's loading TRACK → `<DotRing>`, because #28 made it *the library's ONE work-in-flight
affordance* and because T-9a's `transient` clock does not exist (#26 renamed `orb-drop` → `present`);
(b) §3.4's r10 icon corner → the resolved 50%, because #23's role spine owns
`icon / single tap-target`; (c) G-BTN-MATERIAL's literal "warm-floor color-mix" wording → a
single-level compose over `var(--glass-veil)`, on PAINT merit (the tone is the better chroma source
for a destructive command) — the Safari nested-color-mix ground first offered for it is DECORATIVE
and withdrawn as load-bearing, since `glass-capsule.css:49-56` already nests through `var()`
indirection onto a `--glass-veil` that is itself a `color-mix(`. The substance ships and the
executable asserts it. Also DEVIATED: the disabled ink reads `--opacity-disabled` rather than a
minted 0.45; and the quiet/text hover arms took an undisclosed `@media (hover: hover)` fence —
correct on the `base.css:217` idiom, but a coarse-pointer behaviour change for two arms, now on the
record. **C-7 CARRIED A BLOCKING RESIDUE THAT IS CURED IN THIS SAME COMMIT**: `outline-none` struck
from `chip/chipVariants.ts:6` + `_shared/menu/menuRowClass.ts:6`, because `@layer utilities` beat
the inverted `@layer components` ring and left the chip's interactive arm with no indicator at all.
Five further `.interactive-item` composers (the four DropdownMenu rows + CommandItem) stay dark
behind UNLAYERED SFC `outline: none` — recorded, routed to their own lanes with **#31** as the
consistency home, not fixed here.
Gate seats **+0** (§5's five are execution-time probes, §B.5 acceptance class); register receipt
byte-identical pre→post. π NOT CLAIMED — P1-P9 → **#10** (the `/display/buttons` 229/222 void
baseline is SUPERSEDED by the re-authored story, not violated), P6 BLOCKED on **#3**. §9's routed
rows re-affirmed and re-owned where their original owner has since sealed: the `--focus-ring-shadow`
retirement is now each remaining lane's (#81/#82/#83/#84/#85/#87/#88), the capsule-into-cohorts row
stays the glass register wave's, the T-4 census stays #76's, `material.css:327` → #61. **FOUND
BESIDE THE ORDER**: `.glass-deep` is inverted at HEAD (deep 16px endpoint under a 20px floating rung
⇒ 18.6/17.2/16.0 vs 20) → routed **#69** with **#68** as token home. Record:
`docs/tranches/BK/execution/2026-08-08-row80-button/RECORD.md`.
```

## D · one-line note for the §B.7 collision table (same file)

`C-7`'s cell may take a dated bracket:

```
| C-7 | `base.css:113-117` focus | #80 | outline-only wins on ground; glow legal only where a lane owns the complete resting list [2026-08-08: **EXECUTED** at `<SHA>` — `.focus-ring:focus-visible` AND `.interactive-item:focus-visible` both inverted to `outline` at the `--ink-perimeter` rung; no glow leg authored; `--focus-ring-shadow` survives for the lanes that still read it. **THE INVERSION NEEDS A COMPOSITION SWEEP, and C-7 is only discharged with it**: `@layer utilities`' `.outline-none` and any unlayered `outline: none` both beat an `@layer components` ring. Struck at this cut: `chip/chipVariants.ts:6`, `_shared/menu/menuRowClass.ts:6`. Still open, each on its own lane with #31 the consistency home: `dropdown-menu/styles.css:54` and `command/styles.css:96`, unlayered via `<style src>`] |
| C-8 | K2 specular-ring strike | #80 before/with #86 | Button edge first; P10 precondition; GF-DOCK notified [2026-08-08: **the Button edge LANDED first** at `<SHA>` — the ordering precondition is satisfied and #86 may cut K2; P10's post-both capture is still owed. **NOTICE ROW FOR #47 GF-DOCK AT UNPARK**: `--glass-specular-btn-hover` → `--glass-specular-capsule-hover` moves `.dock-icon-button`'s hover gleam 0.10→0.14 light / 0.08→0.11 dark. That is the ONE live paint delta of the rename in the whole library — every other capsule composer carries `.glass-capsule`/`.glass-chip`, which are in no `material.css` `::before` cohort and so had no gleam to move. #47 ratifies the capsule rung on its controls or re-points at its own seat; #80 owes no dock capture and claims none] |
```
