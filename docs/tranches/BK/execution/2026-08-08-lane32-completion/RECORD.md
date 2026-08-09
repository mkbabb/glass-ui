# BK #32 W-TABS — COMPLETION SEAT RECORD

**Seat opened** 2026-08-08 · **model asserted before the first byte:** `claude-opus-5[1m]`
(Opus 5, 1M context). Opus, as the lane requires.

**Charter** — cursor `docs/tranches/BK/EXECUTION-PROGRESS.md:3878` (row 32) and
`docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md:182`. Job: COMPLETION to
green + an airtight census. Not redesign.

---

## §0 · BASELINE, BANKED BEFORE ANY BYTE

| | |
|---|---|
| epoch | `1786241247` |
| baseline diff | `/tmp/bk-lane32-baseline-1786241247.diff` — 163,283 B, 2,784 lines |
| HEAD | `727f672327fcd5cdc18e37a43d2da0e15f171bf6` |
| porcelain | **60** (54 modified · 6 untracked) |
| untracked, enumerated separately (`-U0` is blind to them) | `docs/tranches/BK/execution/2026-08-08-lane33-completion/` · `docs/tranches/BK/execution/2026-08-08-lane35-completion/` · `src/components/slider/styles.css` · `src/composables/motion/morph/eyeglass.ts` · `tests/gates/feedback-tint-seam.test.ts` · `tests/gates/tabs-seam.test.ts` |

**The tree was re-derived at this seat, not inherited from the prompt.** HEAD is unchanged
from #33's and #35's opens (`727f6723`), so **#33's and #35's dirt is still in-tree,
pending-commit by the driver** — foreign, untouched. #40 W-PAGER's bytes are absent
(committed at `85c322dd`), which is what makes `npm run build` green here.

Post-seat porcelain **62** (56 modified · 6 untracked): this seat newly modified exactly two
files, `src/components/tabs/README.md` and `src/components/handmark/README.md`.

---

## §1 · THE #32-vs-#71 ADJUDICATION, FROM THE CURSOR, WITH GROUNDS

The prompt asks whether the deform half of `useSelectionGroup`/`useSelectionIndicator` is
this lane's. The cursor answers it by MEASUREMENT, at ⊕⁶⁰ (#84 W-TOGGLE-ROW's per-hunk fence,
`EXECUTION-PROGRESS.md:2583`), which measured every shared-dirty file BEFORE #84 wrote a byte:

> `useSelectionGroup.ts` 84 of which **60** (#32/#35's `deform` owns 24) ·
> `useSelectionIndicator.ts` 204 of which **35** (**#71 W-EYEGLASS owns 169**)

and again at ⊕⁶⁰'s RT-84O routing, which sends the dead measure "to **#71**, which holds
169/204 of that file in flight."

**RULING.**

- **`useSelectionIndicator.ts` is #71's, NOT this lane's.** 169 of its 204 changed lines are
  named #71's by the driver's own pre-write measurement. Untouched by this seat.
- **`eyeglass.ts` (untracked) is #71's.** It is the module `useSelectionIndicator` imports,
  and row 71's spec of record (`TERMINAL-ROSTER.md:221`) is EXEMPLARS-CODEX §C C1 — the file
  quotes §C1 at every constant. Untouched by this seat.
- **`useSelectionGroup.ts`'s `deform` hunks ARE this lane's.** ⊕⁶⁰ labels them "#32/#35's",
  and **#35's completion seat DISCLAIMED them** — its census routes
  `motion/morph/{useSelectionGroup,useSelectionIndicator}.ts` to #71
  (`2026-08-08-lane35-completion/RECORD.md:197`). #33's does the same (`:60`). With #35
  disclaiming, the ⊕⁶⁰ label resolves onto **#32**. Current remaining diff 18/3, entirely the
  `deform` parameter, its doc, the `SelectionDeform` type import, and one declaration reorder.

**ONE COUPLING, DISCLOSED RATHER THAN RESOLVED HERE.** #32's `useSelectionGroup` hunk imports
`type SelectionDeform` from `useSelectionIndicator` — #71's file. #32's share cannot land
before #71's type export exists. The roster already rules the shape: row 32's gate cell reads
"**#71 executes inside this cut**". So either the driver cuts #32 and #71 JOINTLY (the roster's
own reading, and the cheapest), or #32 carries the single `export type SelectionDeform` line as
disclosed inherited residue on the ⊕⁵⁸→`40efebc9` / #84 precedent. **No bytes moved for this;
it is a staging fact the driver owns.**

**A LABEL INCONSISTENCY IN THE RECORD, FLAGGED AND NOT SILENTLY RECONCILED.** Retiring the
`--tab-blob` area-inflation channel is ONE act split across two files, and the cursor labels
the two halves differently: ⊕⁶⁴'s driver disclosure (`:3447`) calls `property-regs.css`'s
`@property --tab-blob` deletion "**#32/#35's**"; ⊕⁵⁹/⊕⁶⁰ (`:2544`) call the whole remaining
`scale-paper.css` diff "**#71 W-EYEGLASS hunks that are NOT this row's** — 10 / 18", and
`scale-paper.css` measures **exactly 10 / 18** at this seat, so that figure is still live and
still names #71. Both labels are recorded as given. Either way the act lands in the #32/#71
joint cut, so nothing is at risk; the reconciliation is the driver's, on the ⊕⁶⁴
eight-vs-nine precedent.

---

## §2 · CENSUS — every path attributed

### MINE (#32 W-TABS) — 10 paths

| path | state | this seat? |
|---|---|---|
| `src/components/tabs/SegmentedTabs.vue` | M, 50/83 | no — in-tree, left alone |
| `src/components/tabs/styles/segmented.css` | M, 199/131 | no |
| `src/components/tabs/styles/drag.css` | M, 13/4 | no |
| `src/components/tabs/README.md` | M, 90/40 | **YES** |
| `demo/stories/navigation/tabs.vue` | M, 3/2 | **YES** (2 of 3 added lines; the `span="full"` hunk is in-tree) |
| `src/styles/glass/surface-axis.css` | M, 10/8 | no — the `.paper-ink-mark` re-doc |
| `src/styles/tokens/property-regs.css` | M, 0/16 | no — the `@property --tab-blob` deletion (⊕⁶⁴ label) |
| `src/components/handmark/README.md` | M, 8/2 | **YES** — the strike this lane's own re-doc made necessary |
| `tests/gates/tabs-seam.test.ts` | ?? , 386 ln | no — the `G-TABS-SEAM` executable |
| `src/composables/motion/morph/useSelectionGroup.ts` | M, 18/3 | no — the `deform` param (§1) |

### #71 W-EYEGLASS — executes inside this cut, untouched by this seat

`src/composables/motion/morph/useSelectionIndicator.ts` (M, 123/46 — the 169/204 share) ·
`src/composables/motion/morph/eyeglass.ts` (??, 232 ln) · `src/styles/tokens/scale-paper.css`
(M, 10/18 — per ⊕⁵⁹'s live figure; see §1's flag).

### FOREIGN, untouched — 44 paths, attributed

- **#33 W-ALERT / W-FEEDBACK-TONE** (pending-commit): `_shared/feedback/feedback-tone.css` ·
  `alert/{index.ts,AlertTitle.vue,AlertDescription.vue}` · `button/styles.css` ·
  `styles/glass/ladder.css` · `styles/index.css` · `tests/styles/typography.test.ts` ·
  `tests/gates/feedback-tint-seam.test.ts` (??) · `demo/stories/foundations/typography.vue` ·
  `demo/stories/substrates/glass-material.vue` ·
  `docs/tranches/BK/execution/2026-08-08-lane33-completion/` (??)
- **#35 W-SLIDER** (pending-commit): `slider/{Slider.vue,types.ts}` · `slider/styles.css` (??) ·
  `composables/dom/useDragVelocity.ts` · `styles/glass/grasp.css` · `styles/theme/radius.css` ·
  `styles/tokens/sizing.css` · `tests/styles/glass-subtlety.test.ts` ·
  `tests/styles/radius-role-canon.test.ts` · `tests/styles/typed-track-seam.test.ts` ·
  `tests/components/a11y/focus-visible.test.ts` · `tests/components/a11y/coarse-target.test.ts` ·
  `demo/stories/forms/slider.vue` ·
  `docs/tranches/BK/execution/2026-08-08-lane35-completion/` (??)
- **#84 W-TOGGLE-ROW residue**: `tests/gates/overfit-structure.test.ts` — every changed line is
  the `<ToggleGroup>` adoption prose and its assertion message.
- **#46 GF-TIMELINE**: `composables/motion/spring/springPresets.ts` ·
  `composables/motion/core/index.ts` (the `useLiquidFlex` consumer list gains Timeline) ·
  `tests/components/slider.contract.test.ts`
- **#55 WATERCOLOR-RELOCATE**: `src/components/PROCEDURAL-SUITE.md` · `blob/README.md` ·
  `demo/stories/substrates/blob.vue`
- **unattributed-here, no marker, not this lane's subject** (named so the census has no hole):
  `demo/stories/containers/configurator.vue` · `configurator/styles.css` ·
  `demo/stories/substrates/aurora.vue` + `aurora/sections/{AuroraColorSection,AuroraCompositionSection,AuroraMotionSection}.vue` ·
  `demo/stories/substrates/fourier-field.vue` · `handmark/{HandMark.vue,texture.ts}` ·
  `composables/dark/darkModeSyncScript.ts` · `composables/glass/procedural/{color.glsl.ts,prng.ts}` ·
  `src/index.ts` (the 5th row to fence around it; RT-84E → #65) · `styles/glass/rim.css` ·
  `tests/styles/engage-ladder.test.ts` · `vite.library.ts`

---

## §3 · COMPLETION LEDGER

The lane's CODE was already whole and already green: `G-TABS-SEAM` **26/26**, the battery at
the banked expectation, `vue-tsc` 0, build green. What was NOT whole was the family's own
declared truth. Three files were asserting, in committed text, a mechanism this lane deleted.

### C-1 · `src/components/tabs/README.md` — the source of truth was false about the source

The file's own header calls it "the SOURCE OF TRUTH for … the indicator mechanism … and the
colocation map". Both were false, and one of them had been false since before this lane.

- **§The indicator mechanism** described `scale: var(--stretch) calc(1 / var(--stretch))` —
  the volume-preserving reciprocal pairing — and the `--tab-blob` area-inflation channel with
  its composed-area fence `blob × stretch ≤ ~1.14`. **Both are deleted on disk** (`--tab-blob`
  resolves NOWHERE in `src/`: the `@property` block, the `--tab-indicator-blob-max` token and
  the `calc()` composition are all gone). Replaced with the law that is actually on disk — the
  `deform` policy, `plate` (span/swell/origin, armed by `--eyeglass-span-max`) vs `mark`
  (`--stretch` only) — plus the `[data-active]` seam. Struck in place, dated, bracketed.
- **The mechanism section credited `useTabIndicator` (`composables/`).** There is no such file
  and there was none when the paragraph was written. The writer is `useSelectionIndicator`,
  reached through `useSelectionGroup`. Struck, re-pointed.
- **The colocation map was wrong in BOTH directions**: it listed `constants.ts` and
  `composables/useTabIndicator.ts`, **neither of which exists**, and omitted `styles/` —
  `segmented.css` (397 ln) and `drag.css` (98 ln) — **which does**. Map reconciled to disk.
- **§Gates named `proof:tabs-unified` · `proof:no-god-module` · `proof:colocation`.** `grep -c
  proof package.json` → **0**; none of the three exists. Replaced with the live seat,
  `G-TABS-SEAM` at `tests/gates/tabs-seam.test.ts`, its five arms described by the defect each
  convicts. The ≤500-line claim is restated as a MEASUREMENT, not a gate, because **no
  line-bound executable exists anywhere in `tests/`** — SFC 419, leaves 215/172/135, sheets
  397/98. A gate citation that names nothing is worth what a self-certifying one is worth.

### C-2 · `src/components/handmark/README.md:51` — a strike this lane's own re-doc forced

The three-underline-register fence named `.paper-ink-mark`'s consumers as "the tab underline
indicator **+ the math-paper section rail**". This lane's `surface-axis.css` re-doc convicts
exactly that claim: the rail "was named as a consumer while composing nothing". Verified
independently at this seat — `grep -rn paper-ink-mark src demo` returns the register itself,
the tabs sheet, the SFC, one demo that sets only the colour custom property, and this README.
**No math-paper rail composes the class.** The rail half struck in place with a dated bracket;
the fence itself is untouched in both directions. This is the same duty the cursor records at
⊕⁶⁰ ("Every lane landing strikes must run the same check — this is the third row this tranche
to pay it"); it is the fourth.

### C-3 · `demo/stories/navigation/tabs.vue` — two blurbs the code had overtaken

- The underline section said **"It SLIDES (a hairline does not squish)"**. Under
  `deform: "mark"` the hairline gets `--stretch` — it LENGTHENS along its travel. The
  sentence was true of the retired law and false of the shipped one. Corrected.
- The pill section described "transient travel squish" and never named the organ that is the
  whole point of the lane. Corrected to what the pill does: spans, leans, swells, inverts
  well→dome, and the bar lifting in chroma one frame ahead.

**No source, no CSS, no test byte was touched by this seat.** The lane's implementation
stands exactly as the driver will find it.

---

## §4 · NAMED GAPS — stated, not invented

### G-1 · "dispersion rims" is a charter item with ZERO bytes on disk

`TERMINAL-ROSTER.md:182` and `EXEMPLARS-CODEX.md:190` both list, for #32, "…2:1 edges,
mandatory track overflow, **dispersion rims**, polarity inversion, boundary clamp…". Every
other item in that list is on disk and gated:

| charter item | on disk | gated |
|---|---|---|
| span-not-travel 1.35–1.6× | `EYEGLASS_SPAN_MAX = 1.6`, `--eyeglass-span-max: 1.6` | yes |
| width-only elasticity | `deform: "mark"` = `--stretch` only | yes |
| 2:1 edges | `EYEGLASS_ORIGIN_FRACTION` derived from `EYEGLASS_EDGE_RATIO` | yes |
| mandatory track overflow | `.segmented-tabs { overflow: visible }` + `EYEGLASS_OVERFLOW_LICENSE` | yes |
| **dispersion rims** | **NO** | no |
| polarity inversion | the well↔dome `box-shadow` swap on `[data-eyeglass-wake]` | yes |
| boundary clamp | `[data-eyeglass-clamped]` + the two-headroom solve | yes |
| the 36:1 watermark | `.segmented-tab` `color-mix(…, --glass-capsule-warm 12%)` | — (deviation stated in-sheet) |
| the commit cascade | `CASCADE_RANKS` + `--eyeglass-cascade-annotation: 100ms` | yes |

The indicator's rim is `--glass-rim-top` / `--glass-rim-bottom`, and both are **achromatic** —
`hsl(0 0% 100% / …)` over a `--foreground` mix (`tokens/glass-fx.css:171`). No spectral
dispersion anywhere in the tabs paint.

**NOT BUILT HERE, and the grounds are three.** (1) The construction is RULED and the ruling is
row 71's, not this row's: `TERMINAL-ROSTER.md:221` SE-5 kills C1's
`armGlassRefract`/`supportsBackdropRefract` path by #2's Φ0 delete and routes the eyeglass onto
"the codex §8 **specular-strip substitution**". (2) The codex routes C1 to four rows —
`W-TABS #32 · #47 W4 · #2 · #22` — so the register's home is a shared question, not a tabs-local
one. (3) A completion seat inventing an ungated, unmeasured light channel by taste is exactly
what `eyeglass.ts` refuses in its own header ("Nothing here is tuned by taste"), and what the
no-masking-fallback law forbids — a rim that "only dims" is, in C1's own words, "a highlight,
not an eyeglass". **ROUTED: the dispersion-rim register to #22 / #71's specular-strip
substitution, with #32 as the first consumer.**

### G-2 · the `G-TABS-SEAM` seat is EXECUTABLE but not BOUND

`tests/gates/tabs-seam.test.ts` names the seat in its live `describe` title, which is what the
register scores. `SEAT-BINDING.json`
(`docs/tranches/BK/execution/2026-08-03-row9-register/`) does not declare it, so the receipt
reads `bound:8 … unbound:50`. **Deliberately NOT bound at this seat**: the standing verify
requires the receipt byte-identical, binding moves `bound`→9 and `unbound`→49, and the file is
still untracked so a clean checkout would RED on the missing path. This is a C-10-shaped
batched cut. **ROUTED → the driver, at #32's commit or the next batched binding cut.**

### G-3 · the two OWED capture obligations on row 32

- **⊕² the row-42 fringe magnitude** — the loupe prototype's 3.0–3.6px band with its
  0.92-alpha ceiling and 0.98 leading stop, owed at "this wave's paired capture, **both arms —
  moving AND at rest**". Browser row. **OWED**, unchanged by this seat.
- **⊕⁴ U-41 the console-clean clause** — owed at the same paired capture. **Its named
  subject is GONE**: the clause exists because "the TooltipProvider console error was never
  live-checked (provider live, consumed by SegmentedTabs)", and the lane DELETED the tooltip
  fork — `SegmentedTabs.vue` no longer imports `Tooltip*` and `SegmentedTabOption.tooltip?` is
  struck from the public type. Verified not orphaning: `TooltipProvider` retains five other
  live consumers. The console-clean clause itself still stands as a capture obligation.

---

## §5 · ROUTED FINDINGS (no bytes taken)

| id | finding | owner |
|---|---|---|
| RT-32A | the dispersion-rim register — §4 G-1 | #22 / #71 (consumer: #32) |
| RT-32B | `G-TABS-SEAM` seat binding — §4 G-2 | driver / batched binding cut |
| RT-32C | `useSelectionGroup.ts:52` declares a LOCAL `type SelectionValue = SelectionOption["value"]` while the library owns the canonical `SelectionValue` at `_shared/selection.ts:9` — the same identity, respelled. It is #84's C-1 residue (the alias predates this lane; only the declaration ORDER moved), and it is the exact class ⊕⁶⁰ congratulated itself on curing one file over. One-line de-duplication, foreign, not annexed. | #65 (#84 residue) |
| RT-32D | `useTabIndicator` — a composable that does not exist — is still named in prose at `useDragMorph.ts:50,:240`, `useLiquidFlex.ts:3`, `useTabResponsive.ts:12`. All four are clean at HEAD and pre-date this lane. The tabs README's two instances ARE struck here. | #61 W-DOC-TRUTH |
| RT-32E | the `--tab-blob` label inconsistency between ⊕⁶⁴ (`property-regs.css` → "#32/#35") and ⊕⁵⁹/⊕⁶⁰ (`scale-paper.css` → "#71") — §1. Recorded as given, on the ⊕⁶⁴ eight-vs-nine precedent. | driver |

---

## §6 · THE LESSON THIS SEAT PAID FOR

**A lane that edits any `demo/` source MUST re-run `npm run demo:dist:build` BEFORE the
battery, or `gate:boot-graph`'s staleness arm adds a THIRD failure that reads as lane
breakage.** Measured here: after two demo blurb edits the battery went **3 failed | 1542
passed**, the new row being *"the dist-demo it measures is NEWER than every source it is built
from"* — not the eager-graph ceiling, a different arm of the same file. One
`demo:dist:build` and it returned to **2 failed | 1543 passed**, twice consecutively. The
standing-verify legs are not order-free: `demo:dist:build` precedes the battery whenever demo
sources moved.

---

## §7 · STANDING VERIFY — VERBATIM

**`npx vue-tsc --noEmit`**
```
VUE_TSC_EXIT=0
```

**`npx vitest run tests/styles tests/components tests/gates`** — two consecutive runs, both at
the banked expectation, ZERO added, zero subtracted:
```
 Test Files  2 failed | 160 passed (162)
      Tests  2 failed | 1543 passed | 5 expected fail (1550)
```
The two, verbatim and unclaimed by this lane:
```
 FAIL  tests/gates/boot-graph.test.ts > gate:boot-graph — build arm > the eager graph stays under the modulepreload and byte ceilings
AssertionError: eager graph: 63 modulepreloads + 1 entry = 64 files / 477311 B: expected 63 to be less than or equal to 60
 FAIL  tests/styles/emitted-utility-vars.test.ts > emitted component utilities > routes the emitted transition-duration chain through --duration-fast
AssertionError: expected '0s' to contain 'var(--duration-fast'
```
→ `boot-graph` = **#66**, `emitted-utility-vars` = **#85**.

**lane-own:** `npx vitest run tests/gates/tabs-seam.test.ts`
```
 Test Files  1 passed (1)
      Tests  26 passed (26)
```

**`node scripts/gate-register.mjs`** — byte-identical to the pinned receipt:
```
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:0
```

**`npm run build`**
```
BUILD_EXIT=0
declaration entries: projected 61 public entries
{"type":"glass-ui:ready","generation":"13ff005d308adb6d366dedaaf54a87c71e08ebe5e4ee0e9424e1ac678a3524d4","output":"/Users/mkbabb/Programming/glass-ui/dist","tuple":"js/sfc-css/declarations/relays/styles/fonts/utilities/component-styles"}
```
The `85c322dd` unblock is NOT regressed.

**`npm run demo:dist:build`**
```
DEMO_EXIT=0
✓ built in 1.39s
```

**`node scripts/regen-exports.mjs`**
```
REGEN (PUBLISH-driven): exportKeys 66/66  jsSubpaths=60  drops=0 adds=0 targetMismatch=0 tvDrops=0 tvAdds=0 collisions=(none)
  >>> EXACT REPRODUCTION: YES

EXIT 0 — fail-closed PASS + fidelity PASS + regen exact.
```

**`npx vitest run tests/public-surface.spec.ts`** (not in the standing set; run because this
lane narrows a published type by striking `SegmentedTabOption.tooltip?`)
```
 Test Files  1 passed (1)
      Tests  83 passed (83)
```

---

## §8 · FENCE

- **This seat's bytes: THREE files, and all three are prose.** `src/components/tabs/README.md`
  (90/40) · `src/components/handmark/README.md` (8/2) · `demo/stories/navigation/tabs.vue`
  (2 of the 3 added lines — the `span="full"` hunk was already in-tree). **Zero source, zero
  CSS, zero test bytes.**
- **`demo/stories/navigation/tabs.vue` is the one SPLIT file and it splits per-hunk**: the
  `span="full"` addition is #32's pre-existing in-tree byte; the two blurb rewrites are this
  seat's. Same row either way — no cross-lane split.
- Nothing was `git add`ed, committed, stashed, or checked out. The driver commits.
- No gate minted, no seat bound, no roster touched. Gates remain exactly **60**;
  `rosterSha256:dc05df91` unchanged.
- Foreign dirt from #33, #35, #46, #55, #71, #84 and the unattributed set is byte-untouched;
  it is committed or pending-commit by the driver, not by this lane.
- After diff: `/tmp/bk-lane32-after-1786241247.diff` (2,947 lines vs the baseline's 2,784).
