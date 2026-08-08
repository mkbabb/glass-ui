# BK Φ5 · Row #84 · W-TOGGLE-ROW — the selection row

**modelId: `claude-opus-5[1m]`** (SCOUT + IMPLEMENT seat) · base HEAD `fff9b117` (⊕⁵⁹
back-annotation; the brief's `4917a042` is **five ledger entries stale** and was
re-derived, not trusted) · date **2026-08-08**.

---

## 0 · SELECTION AND ITS GROUNDS

**Row #84 W-TOGGLE-ROW**, the next canonical unstarted Φ5 row in TR order.

Derived from four sources read at this seat:

| source | reading |
|---|---|
| `EXECUTION-PROGRESS.md` Φ5 table | UNSTARTED rows in TR order: #21 · #32 · #33 · #34 · #35 · #40 · #42 · #45 · #48 · #49 · #50 · #52 · #53 · #71 · #74 · #82 · **#84** · #85 · #86 · #87 · #88 |
| ⊕⁵⁹ (`:2532-2545`) | *"#83 **DISCHARGES #82 W-FIELD's `_shared/control.ts` precondition** (C-6) — #82's remaining gate is **ASK g6** alone … and **#84 W-TOGGLE-ROW** takes `ControlProps` from the same file (C-16), though #84 also keeps **#19's W-SELECTION-ONE** hard precedence (landed ⊕³⁹)"* |
| `EXECUTION-DAG-2026-08-03.md:95` | `#84 \| W-TOGGLE-ROW \| Φ5 \| unstarted \| #68; HARD behind #19's SelectionOption widening` |
| `EXECUTION-DAG-2026-08-03.md:30` | `#19 … none; hard-precedes #84` |

**Every earlier unstarted row is SKIPPED with its gate named**, none by assumption:

| row | gate |
|---|---|
| #21 W-DAG-REDUCE | hard on **#17**, itself Φ4-UNSTARTED |
| #32 W-TABS | fenced behind **#22 F-1/F-3/F-4** (cure-cut); also IN-FLIGHT IN THE WORKING TREE |
| #33 · #34 · #35 | behind **#22's `G-FROST-TRANSMISSION`**; #33/#35 also IN-FLIGHT in tree |
| #40 W-PAGER | **IN-FLIGHT IN THE WORKING TREE** (⊕⁵⁹ census; its uncommitted bytes are the source of 11 of the 12 standing suite failures) |
| #42 · #44 · #45 · #47 · #48 · #52 | behind their DAG edges |
| #49 · #50 · #51 · #53 | **ASK-gated** |
| #71 W-EYEGLASS | **IN-FLIGHT IN THE WORKING TREE** (`useSelectionIndicator.ts` + `scale-paper.css` hunks) |
| #74 W-RIM-RAINBOW | inside **#88's** cut |
| #82 W-FIELD | ~~**ASK g6** (`docs/tranches/BK/ASK.md:37`, number-field KEEP — tranche-qualified deliberately; BJ's `ASK.md:37` exists and reads differently)~~ [2026-08-08 · CURE ROUND: **the "ASK g6 PARKS #82" reading is STRUCK going forward.** ASK.md's own preamble is *silence advances, never parks*: **g6 fires AT #82's cut with a ratified default of KEEP**, so it gates nothing before the cut. The skip taken here still stands — it followed the DAG's precondition column, which is what a scout is allowed to read — but **#82 W-FIELD is the canonical next row** and the next scout selects it without re-litigating this cell] |

#84's own preconditions are both discharged: **#68 W-TOKEN-CANON** SEALED (⊕³¹) and
**#19 W-SELECTION-ONE** LANDED (⊕³⁹). No SEALED or IN-FLIGHT row was selected.

**TR cell, verbatim** (`TERMINAL-ROSTER.md:234`):

> | **84** | **W-TOGGLE-ROW** (toggle-group) | CWT-3 §LANE toggle-group | Φ5 | cited whole; the deepest cut—reka retires, `useSelectionGroup` adopted; **hard-sequenced behind #19's `SelectionOption` widening**; atlas phantom `register="glass"` ×3 → relay #76. ⊕⁷ o19 A-18, the salvage half: the re-authored indicator seat accepts a consumer-painted indicator (slot), both orientations—zero motion authority leaves the library (the loupe grammar stays #35/#32/#71/#26's); value paints its relocated WatercolorSwatch into the slot and inherits the bounce; no watercolor bytes return (#55 stands). ⊕⁷ atlas A-6 (∥#23): concentric outer = inner + pad DERIVES from the role rung—the identity already written at `toggle-group/styles.css:15-16,42`, made law instead of a token |

Spec of record read **in full**: `COMPONENT-WAVES-TERMINAL-3.md:841-1075` (§0 TF-1…TF-10,
§1 DISPOSITION, §2 DEFECTS D-1…D-22, §3 THE DESIGN, §4 STRIKE/ADD, §5 GATES, §6 PAINT
P1-P9, §7 REJECTED, §8 LOC, §9 ROUTED C-1…C-19) plus the batch rulings C-5 · C-6 · C-10
(`:1816-1826`), the tier-3 gate classification (`:1871`) and the two ⊕⁷ riders
(`INBOUND-2026-07-29.md:46,70`; `glass-outbound-2026-07-29-o19-receipt.md:71-77`).

---

## 1 · THE PRE-STATE, MEASURED — every §2 figure re-derived from `git show HEAD:` bytes

| figure | spec says | measured at HEAD | verdict |
|---|---|---|---|
| lane raw LOC | 323 | **336** (134+47+126+17+12) | **SPEC BASELINE STALE.** `styles.css` went 111 → 126 at **#23 W-RADIUS-ROLE**'s landing (2026-08-05), which post-dates CWT-3. The +15 is #23's concentric doc-block. |
| register-owned declarations in the sheet | "6 copied declarations + 1 cross-namespace token" | **exactly that** — `backdrop-filter` ×2 (`:33`, `:86`), the 3-leg `box-shadow` (`:34-37`), `border-color`/`background` (`:84`,`:85`), hover `background` (`:90`) = 6 declarations, with `--tab-track-recess-ink` (`:37`) the 1 cross-namespace token | ✓ (8 matching LINES, 6 DECLARATIONS — a line count would have said 8 and been wrong) |
| `calc(var(--radius-pill) + 0.25rem)` | "×2 live" (D-5) | **0 literal sites · 1 relay-spelled site** | **SPEC FIGURE CORRECTED.** #23 re-expressed the pad on `--radius-inset`/`--radius-ctx` (`:26-27`) after CWT-3 was written. The **computed value was unchanged** — the sentinel still resolved — so the defect D-5 names was live at HEAD; only its spelling had moved. |
| `:hover` rules in the lane | (D-2's ungated copy) | **1** (`:89`) | ✓ |
| reka importers in the lane | 2 SFCs | **2** | ✓ |
| `flex-wrap` / `nowrap` | absent / present | `display: inline-flex` ×2, `white-space: nowrap` (`:64`), **no `flex-wrap`** | ✓ |
| exported type names | 9 | **9** (`ToggleGroup`, `…Item`, `…Props`, `…ItemProps`, `…Emits`, `…SlotProps`, `…Value`, `…Size`, `…Variant`) | ✓ |
| `Checkbox.vue:37` composes the DAG-4.12 quartet (TF-9's ground) | yes | **NO — `class="checkbox control-bit tap-squish"`** | **TF-9's GROUND IS STALE.** #83 W-CONTROL-BIT re-seated the checkbox onto `.control-bit` on 2026-08-08 and struck `.glass-control-edge` from it (`field-surfaces.css` carries #83's own dated bracket saying on-disk readers are now **1**). The RULING still stands on its own merits — `.control-surface` declares no `box-shadow`, so without the rim class the pill has no resting silhouette — and this cut composes the class, returning readers to 2. Recorded rather than left to be re-discovered. |
| `SelectionOption["value"]` widened by #19 | "hard-sequenced behind #19's widening" | **NOT WIDENED** — `useSelectionIndicator.ts:73-76` still reads `value: string` at HEAD | **PRECONDITION ABSENT.** See §2.0. |

---

## 2 · PER-ITEM LEDGER

### 2.0 · C-1 — the widening, landed here as DISCLOSED INHERITED RESIDUE

**The finding.** TR sequences this row behind *"#19's `SelectionOption` widening"*, and
⊕⁵⁹ reads the precedence as discharged by #19's landing. **The row landed; the widening
did not.** `SelectionOption["value"]` is `string` at HEAD and `useSelectionGroup`'s
`model` is `Ref<string | string[] | undefined>` — measured, not inferred.

**Why it cannot be deferred and cannot be worked around.** ToggleGroup's public value is
`SelectionValue` (`string | number`) and CWT-3 C-1 rules the direction explicitly: *"the
engine widens; toggle-group does NOT narrow its public type."* The three exits are all
closed: narrowing the public type is refused by C-1; coercing at the boundary
(`String(value)`) is a lossy-key adapter that collides `1` with `"1"` and lies about the
round-trip type — the masking class this tranche kills; and blocking the row strands the
whole wave on an item its owner closed without.

**The disposition, per the ⊕⁵⁸→#81/`40efebc9` precedent** (a closed row's residue landed
by the row that needs it, disclosed rather than annexed): **landed here, fenced, and
attributed to C-1/#19 in the record and the commit message.** It is **type-only** — zero
runtime bytes change in any of the three files.

**The shape — widened BY DERIVATION, so nothing breaks.** A flat widening was impossible:
`Ref<T>` is invariant and a callback parameter is contravariant, so widening `model` or
`select` in place would have broken every narrower caller (SegmentedTabs, 3 dock SFCs).
Instead:

| file | change | effect on existing callers |
|---|---|---|
| `useSelectionIndicator.ts` | `SelectionOption.value: string` → `SelectionValue` (type-only import); `model`/`activeValues` keyed to `O["value"]`; the `(model.value as string)` cast deleted as no longer needed | `SegmentedTabOption` (`value: string`) still satisfies the constraint; `O["value"]` resolves to `string`, so its types are byte-identical to before |
| `useSelectionGroup.ts` | `model: Ref<O["value"] \| O["value"][] \| undefined>`; `UseSelectionGroupReturn<V = string>`; `activeValues`/`isSelected`/`select`/`itemAttrs`/`onSelect` keyed to `O["value"]` | same — the return's default type parameter is `string` |
| `useTabRovingFocus.ts` | generic `<V extends SelectionValue = string>` over `RovingSelectionOption`/`stripValue`/`select` | default `string`; the only importer is the engine, which now passes `O["value"]` |

**The `/motion-core` fence, honestly restated.** `useSelectionIndicator.ts`'s docstring
claimed *"the `/motion-core` home carries no component-tree import"*. It now carries one
`import type { SelectionValue }` — **erased at emit**, so the chunk's bytes are
unchanged. The claim is struck in place and re-stated at the level that is load-bearing:
no component-tree **runtime** import. The alternative was a second spelling of
`string | number` inside `/motion-core`, which the grammar law forbids outright.
(`useSelectionGroup.ts` already carried a **value** import from `components/tabs/` before
this cut, so the fence was never the absolute the prose asserted.)

### 2.1 · The gestalt cut — `styles.css` (126 → ~~144~~ **157** raw · **100 → 82 code-only**)

[2026-08-08 · the raw figure moves at the cure round only: **CURE-84-C** added 13 comment
lines and no code. Code-only is unchanged.]

| what | disposition |
|---|---|
| the whole `[data-type="single"]` track block | **STRUCK** — bg · `backdrop-filter` · the 3-leg `box-shadow` · `--tab-track-recess-ink` (the library's only cross-namespace token reach) · pad · `safe center` · the concentric corner. D-1 · D-3 · D-5 · D-7 · half of D-9 die together |
| `scroll-padding-inline` · `overscroll-behavior-inline` · `vertical-align` | **STRUCK** — they served a scroller that no longer exists |
| `display: inline-flex` → `flex` + **`flex-wrap: wrap`** | THE declaration. D-8 |
| `gap: 0.25rem` → `8px`, `4px` at `width <= 768` | member rung + ONE ladder transposition; **literal with a marked seam** — PROPORTION §6's tokens resolve to nothing on disk (TF-1) |
| `.control-surface`/hover copies + `[data-variant="outline"]` block | **STRUCK** — composed by class name instead. D-2 · D-11 |
| item `border: 1px solid transparent` | **STRUCK** — this file now authors **zero** border values |
| `white-space: nowrap` | **STRUCK** with the clip |
| the item corner | ONE spelling: `var(--radius-pill)`. C-7 |
| the on-state | four carriers → **two and a half**: ink `--foreground` (A8/TF-4) · weight **600/500** (D-10) · fill 0.12 / hover 0.16 (marked seam). `--accent` slab, the 28% `--primary` border and **`--shadow-sm` all STRUCK** — D-9's (0,2,0)↔(0,2,0) tie with the focus ring is gone because a selected state no longer spends `box-shadow` |
| pad-inline sm | `0.625rem` → `0.5rem`. D-17 |
| the size axis | moved from the ITEM to the GROUP (`[data-size]` descendant rules) — D-18's inverted precedence is unrepresentable when only one element carries the axis |
| `invalid` | one grammar: `.toggle-group[data-invalid] .toggle-group__item { border-color: var(--destructive) }`. D-16 |
| `--scale-press: var(--scale-press-sm)` | **SURVIVES**, with the F-3 reconciliation written beside it so nobody strikes it as a lone restatement |
| the `forced-colors` block | kept, minus its dead track arm |

**CURE-84-C — the sheet's own comment named a literal that is not in it, and the
deviation behind it went undisclosed.** `styles.css:100` read *"0.12 / 0.05 / 0.16 are
literals with a MARKED SEAM"*. **`0.05` exists nowhere in the sheet** — the two literals
that exist are `12%` (`:104`) and `16%` (`:110`). The comment is corrected to name those
two.

The `0.05` is CWT-3 §3.5's **unselected hover** rung (*"selected fill | 0.12 · hover 0.05
· both 0.16 — literals, marked seam"*), and this lane does not write it. That is a
**DEVIATION BY COMPOSITION, and it is the right call, but it was never disclosed.**
Unselected hover arrives from the register:
`.control-surface:hover:not(:disabled, [data-disabled])` reads
`--control-surface-bg-hover` (`src/styles/glass/control-surfaces.css:83-85` →
`tokens/glass.css:335`, `color-mix(in oklab, --glass-plate-quiet, --glass-plate-resting
35%)`). Writing `0.05` in this sheet would have re-forked the register the whole cut was
spent composing, and would have re-shipped the copy WITHOUT the `[data-disabled]` guard —
D-2 verbatim, one cut later.

**THE CAVEAT, and it is why RT-84N is open and not merely noted:**
`--control-surface-bg` resolves to `rgba(0, 0, 0, 0)` in **light** at HEAD (the
`oklch(from … / calc(0.14 − 1 × 0.04))` relative-colour chain), so the register's rest
fill — and by derivation the hover mix built on top of it — is currently carrying less
than §3.5 assumed when it priced the rung at 0.05. P3's parity assertion holds either
way (the item and a bare `.control-surface` probe agree byte for byte, which is what this
lane is accountable for), but **the rung's magnitude is a register question**, routed to
**#82 W-FIELD ∥ #68** and not patched locally with a literal.

### 2.2 · `context.ts` (NEW, 53 lines) — `toggleGroupContext.ts` DELETED

The variant/size relay becomes the **item registry**: each item publishes
`{value, disabled(), el}` on mount and withdraws on unmount; the group derives both
engine arrays from it. **DOM order, not registration order** — sorted by
`compareDocumentPosition`, because `onMounted` fires child-first and a wrapped or
conditional item can mount out of visual order, which would give arrow keys a different
sequence than the eye reads. C-14 (`DAG-RULINGS:275`) executed here because the file is
re-purposed anyway; no alias, no re-export.

### 2.3 · `ToggleGroup.vue` (134 → ~~137~~ **145** raw · **122 → 80 code-only**)

[2026-08-08 · **CURE-84-B** replaced the one-line false `indicatorRef` comment with the
nine-line true one. Comment lines only; code-only unchanged.]

reka retires. `defineModel` replaces the emit pair; `inputValue`/`outputValue` (30 lines
of paint-time `TypeError` policing an untyped round-trip) die **with the boundary, not as
a conviction** (§7). `useSelectionGroup` supplies `groupRole` · `itemAttrs` ·
`rovingTabindex` · `onKeydown` · `select` · the `scrollIntoView` recenter. `indicatorRef`
**omitted** — the engine's own "plain toggle row" contract; ~~the measure no-ops.~~
[2026-08-08 · **CURE-84-B**: FALSE, and it was this lane's own D-21 conviction class
written fresh. What the omission silences is the travel **squish** — no element, nothing
to write `--stretch` to. The **measure runs regardless**: `useSelectionIndicator`
attaches its `ResizeObserver` unconditionally (`:414-427`, the Safari-identical
guarantee) and `updateSingleSlider` (`:172-207`) takes two `getBoundingClientRect`s per
mount and every resize into a `singleSliderStyle` this component never reads. Corrected
at all three claim sites — `ToggleGroup.vue`, `useSelectionGroup.ts`'s `indicatorRef`
doc (whose HEAD wording carried the accurate `squish/` half until this row's rewording
dropped it) and here. **Economizing the dead measure is ROUTED, not done here**
(RT-84O → **#71 W-EYEGLASS**, which holds 169 of that file's 204 changed lines in
flight): gating another row's engine inside this cut is the fence violation this record
refuses everywhere else.]
`activation` is **mode-derived** (TF-2), never flat. `data-orientation` is stamped from
this component's own prop, so **D-13 is impossible by construction**.

**Deleted, no aliases:** `variant` · `rovingFocus` · `loop` · `dir` · `name` ·
`required` · `defaultValue` · the `FormFieldProps` extension · item `variant`/`size` ·
`ToggleGroupSize` · `ToggleGroupValue` · `ToggleGroupSlotProps` · `ToggleGroupEmits` ·
`ToggleGroupVariant` · `TOGGLE_GROUP_KEY` · the slot payload. `index.ts` → **4 exports**.

### 2.4 · `ToggleGroupItem.vue` (47 → ~~92~~ ~~90~~ **99** raw · **41 → ~~53~~ 55 code-only**)

[2026-08-08 · two dated corrections in one line. The record's **92** was never on disk —
the file measured **90** at the pre-cure state (`wc -l`), which is the figure the cure
order ratified. **CURE-84-A** then added the live-`value` getter (+2 code) and its
derivation (+7 comment), so the TERMINAL figure is **99 raw / 55 code-only**. Both are
stated rather than one silently replacing the other, because the 92→90 strike is a
FALSE-FIGURE correction and the 90→99 is a CURE delta, and they are different kinds of
thing.]

The chassis is COMPOSED: `control-surface glass-control-edge glass-capsule-hover
tap-squish focus-ring` (TF-9, on the merits — see §1's stale-ground note).

**⊕⁷ o19 A-18 — the salvage, BUILT.** `#indicator` is a named slot **inside** the pill,
receiving `{ selected }`. It therefore inherits the item's hover lift and press squish for
free, and **zero motion authority leaves the library**: it is a slot, not a travelling
mark, and no indicator geometry, clock or watercolor byte comes back in (#55 stands; the
loupe grammar stays #35/#32/#71/#26's). Both orientations, because it is a child of the
item and the item does not know its group's axis.

**CURE-84-1 — a real defect, caught on live paint and cured in the same cut.** The first
draft wrote `props.disabled ?? group?.disabled.value`. **Vue casts an ABSENT Boolean prop
to `false`, not `undefined`**, so the nullish chain short-circuited on the item's own
`false` and a disabled GROUP never reached its items. Measured at `:5400`:
`button.disabled === false`, `opacity: 1`, `pointer-events: auto` on the demo's disabled
group. Cured to `props.disabled === true || group.disabled.value` — which is also the
right law read forwards (a group's disabled is not one item's to overrule) and the mirror
image of D-18's `context?.x ?? props.x` inversion. **A type could not have caught it and
no static gate did; the browser did.** A case was added to the battery.

**CURE-84-A — the SAME defect class one line up, missed by this seat and caught by the
adjudicator.** The registry entry wrote `value: props.value` — a scalar **frozen at
setup** — directly above a `disabled` that was already a live getter. The template
paints `props.value` (`isSelected(props.value)`, `itemAttrs(props.value)`), so an item
whose value changes after mount **painted the new identity and committed the old one**:
the write path is `ToggleGroup.vue:116` → `selection.select(entry.value, …)`, and
`entry.value` was the captured copy. Cured to `get value() { return props.value; }`,
which satisfies `ToggleItemEntry`'s `readonly value` exactly, matches the shape the line
below already had, and restores reactivity to the derived `options` array (a computed
reading `entry.value` tracks the prop again). **Born-RED measured against the pre-cure
bytes on disk** — `AssertionError: expected 'a' to be 'b'` at the new case's model
assertion — then GREEN. The standing lesson is the pairing: `disabled` was made live
because a live-paint defect forced it, and `value` one line above was left frozen
because nothing forced it. **A field is not live because someone reasoned about it; it
is live because it was written that way.**

### 2.5 · Demo (`toggle.vue` 82 → ~~106~~ **107**) + the two overrides retired (P9)

[2026-08-08 · **CURE-84-D**: `wc -l` says **107**, not 106. An off-by-one in a record
whose whole argument is that figures are measured and not asserted is worth one strike.]

Four `StorySection`s replace the two bare `<section>`s (LAYOUT §1) and the false blurb +
`overflow-x-auto` class die with the strip. New: a **natural-wrap specimen** at `w-56`
(three rows at 1440, nothing hidden), an **invalid** specimen (PROPORTION 7b#2 — the prop
did not exist before) and a **disabled** pair (group-level + item-level). The two demo
wrap overrides retire: `glass-panel.vue:50` (`class="flex-wrap"`) and
`AuroraColorSection.vue:184` (`class="flex flex-1 flex-wrap gap-1"` → `flex-1`, plus its
`variant="outline"`, whose axis no longer exists).

**CURE-84-E — the fence, restored.** `glass-panel.vue` shipped **ten formatter-only
lines** beyond that one-line remit (a `:class` array re-wrapped across five lines, a `<p>`
re-wrapped across three), booked under no §5 fence entry and touching a file this row had
no business re-formatting. Reverted to HEAD's exact bytes via `git show HEAD:` at the
cure round. **The proof is the final diff, and it is the whole diff:**
`git diff --numstat` reads `0 1 demo/stories/substrates/glass-panel.vue` — one deletion,
the `class="flex-wrap"` line, nothing else. The file is therefore a **one-line remit and
NOT shared-dirty**, which is why it takes no §5 row; the fence is not expanded to cover
it, it is cut back to fit.

### 2.6 · The self-invalidating claims this cut had to correct

Nine of D-21's eleven false comments become **true by adoption** and were left alone. The
three that this cut makes FALSE are the three that named this row as their own condition,
and only those were edited:

- `useSelectionGroup.ts:21-27` — *"until it lands, the engine's consumer set is TWO, and this doc says two"* → says THREE.
- `SegmentedTabs.vue:21-26` — the same clause, same correction.
- `tests/gates/overfit-structure.test.ts:32-36` + the assertion message — same. **The arm's assertion (`>= 2`) is unchanged**: a count pinned to the exact number of the day would have to be edited by every wave that adopts, which is a gate editing itself.

**REFUSED WITH GROUNDS: the two C-5 indicator clauses** (`useSelectionIndicator.ts`
*"never re-forked"* · `useSelectionGroup.ts:17-19` *"the SAME thing"*). They become MORE
false under this cut, and CWT-3 C-5 rules them *"struck, not reworded, at their owning
files … **W-SELECTION-ONE / W-TABS**, never this lane's bytes."* Untouched.

### 2.7 · Gate seats: **+0**

Three born-RED lane gates — **G-TOGGLE-ROLE · G-TOGGLE-REGISTER · G-TOGGLE-WRAP** — land
as close-battery cases in `tests/components/ui/toggle-group/ToggleGroup.test.ts`, minting
no seat name. Per CWT-3 §5 and `:1871`, tier-3's 55 per-lane gates are the acceptance
class, not roster seats (TERMINAL-ROSTER E-7 extended to tier-3); the ROSTER's own §B.5
quote books them as *"tier-3 55 (CWT-3 §5)"* under "Acceptance/π classes". Receipt
byte-identical pre and post (§4).

**DEVIATION FROM THE BRIEF, STATED:** the brief asks for born-RED *"via `it.fails`"*. The
lane precedent — #79, #80, #81, #83, four consecutive landed rows — states born-RED in
prose with the measured HEAD figures and the mutation bites, and lands the cases GREEN in
the same cut. `it.fails` would leave a permanently-failing case in the suite, which is
what RULING-2's "never RED-at-tag" forbids. The precedent is followed and the born-RED
figures are stated verbatim from measurement (§1), with a bite matrix run live (§4).

### 2.8 · `radius-role-canon.test.ts` — a landed case AMENDED, with its dated bracket

#23 landed `it("ToggleGroup derives its concentric pair from ONE published inset")`
against a surface #84 deletes. Struck in place with a dated bracket and **re-pointed**
(not deleted) at what the subtraction must keep true: the track selector and both relay
channels are gone, the sentinel-producing calc is gone **in either spelling**, and the
segment keeps its own PILL rung. Coverage is not lost; the relay FORM is asserted at its
live consumers elsewhere in the same suite.

**⊕⁷ atlas A-6 is DISCHARGED BY SUBTRACTION** and this is the honest reading: the rider
asks that the concentric identity be *"made law instead of a token"*, and notes it was
already written (∥#23). With the track deleted there is no concentric pair on this
surface to derive, and **`--radius-concentric` was never minted**, so the U-25 RETIRE has
nothing left to retire. Zero tokens minted by this row.

---

## 3 · §PAINT — π/DELTA, DRIVER-MEASURED LIVE (Chromium 150 @ `:5400`)

Cells at `cells/`. **Chromium only** — the `safari-app` column is owed and is NOT inferred
from this one ([[feedback-playwright-webkit-not-safari]]). [2026-08-08 · **CURE-84-F**:
every OWED cell below — the Safari column, P7's coarse half, P8 whole, P4's contrast
ratio — is now **assigned to #10** as **RT-84P**, on the #79–#83 precedent. "Owed" in
prose with no owner is how a cell becomes nobody's.]

| # | assertion | BEFORE (spec, banked) | MEASURED AFTER | verdict |
|---|---|---|---|---|
| **P1** | `scrollWidth == clientWidth`; wraps to N>1 at the constrained specimen; every item rect inside the group box; gap 8 → 4 | 224/552, **328px (59%) hidden**, 3 of 5 invisible | **5/5 groups `scrollWidth == clientWidth`**; wrap specimen **5 visible / 5 mounted, 3 rows**; `allInside: true` for every group; gap **8px @1440 · 4px @402** | **PASS** |
| **P2** | group `0px` / `rgba(0,0,0,0)` / `none` / `none`; item spelled `9999px`; zero `10003px` | `10003px` ×2 + painted track | group `border-radius: 0px`, `background: rgba(0,0,0,0)`, `backdrop-filter: none`, `box-shadow: none` — **all five groups, light AND dark**; item `border-radius: 9999px` | **PASS** |
| **P3** | item vs a bare `.control-surface` — `backdrop-filter`/`background-color`/`border-color` strings EQUAL | one class, two materials by variant; `glassCount: 0` | probe composing only `.control-surface .glass-control-edge`: bg `rgba(0,0,0,0)` ≡ · border `color(srgb 0.11 0.098 0.09 / 0.14) / 1px` ≡ · backdrop `blur(14px) saturate(1.5)` ≡ · the full 3-leg `box-shadow` ≡ → **`parity: true`** | **PASS** |
| **P4** | fill α ≤ 0.16 · weight 600/500 · ink Δ · no selected `box-shadow` | opaque `rgb(223,210,195)`, 500/500, `shadow-sm`, 28% primary border | light: on `oklab(… / 0.12)` `rgb(28,25,23)` **600** vs off `rgba(0,0,0,0)` `rgb(124,102,80)` **500**; dark: on `oklab(… / 0.12)` `rgb(233,230,226)` **600** vs off `rgb(172,160,145)` **500**; **`box-shadow` byte-identical between on and off** — it is the register's rim, and the selected state spends none of it | **PASS** (contrast ratio owed → **RT-84P/#10**) |
| **P5** | focused AND selected: ring resolves on `outline`; `box-shadow` contributes nothing | 0 resolved outlines on 12 routes; the (0,2,0)↔(0,2,0) tie | `:focus-visible` on the SELECTED pill: `outline: 2px solid oklab(… / 0.48)`, `outline-offset: 2px` (A1 verbatim); `box-shadow` unchanged from rest | **PASS** |
| **P6** | role per mode; `aria-checked` single-only; `aria-pressed` multiple-only; `aria-invalid` on the invalid specimen | `role="group"` + `aria-pressed` both modes | `radiogroup` ×4 / `group` ×1 matching `data-type`; `data-invalid="true"` + `aria-invalid="true"` on the invalid group; ~~exactly **1 tabstop per group** (5/5)~~ **1 tabstop per group on 4 of 5** — [2026-08-08 · **CURE-84-D**: the fifth group is the demo's **fully disabled** pair and it correctly has **0** tabstops, measured `["-1","-1"]`. The roving machine skips disabled options, so a group in which every option is disabled has no tabstop to give — the right behaviour, and the reason a flat "5/5" was both false and a worse assertion than the true one. The invariant is *at most one tabstop, and exactly one wherever any option is enabled*] | **PASS** (the VoiceOver cell is `safari-app`'s and is OWED → **RT-84P/#10**) |
| **P7** | 402: gap 4; ladder steps once; item ≥ 44 (expect 60) | fine 40; gap 4 at every viewport | gap **4px** ✓; item **40px** — the coarse rung did **not** engage, because CDP viewport emulation at 402 is still a **fine** pointer and `--control-h-*`'s coarse arm is `@media (pointer: coarse)` | **PASS in part** — the gap transposition and the wrap are proven; the **coarse half is OWED to a real touch seat** (→ **RT-84P/#10**), and is not this lane's declaration in any case |
| **P8** | hover → press → release; PRM zeroes the spatial legs | hover changes bg+color only | not measured this seat | **OWED → RT-84P/#10** — every byte is `.glass-capsule-hover`'s and `.tap-squish`'s; this lane declares none of it |
| **P9** | the two nested-glass demo mounts, overrides deleted | `--glass-cell-backdrop-filter` kill reaches the register | `/substrates/glass-panel`: group is bare `class="toggle-group"`, `flex-wrap: wrap`, `border-radius: 0px`; item register-true (`blur(14px) saturate(1.5)`, `9999px`) and renders correctly | **PASS on the override retirement**; the `material.css:66` RELEASE half is **W-FROST's receipt**, never a second fix (C-4) |

---

## 4 · VERIFY GATE — verbatim

```
$ npx vue-tsc --noEmit
(no output)                                   exit 0

$ node scripts/gate-register.mjs      # PRE, at fff9b117 with the dirty tree
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:1
  DRIFT (routed to #65) reka.tags-input.value-binding — tests/components/ui/reka-binding-idiom.test.ts
  VIOLATION active pager.tabs.panel-linkage: sourcePath missing — tests/components/pager-dots.contract.test.ts

$ node scripts/gate-register.mjs      # POST
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:1
  (identical, byte for byte)

$ npx vitest run tests/styles tests/components tests/gates
 Test Files  7 failed | 152 passed (159)
      Tests  12 failed | 1466 passed | 5 expected fail (1483)

$ npx vitest run tests/components/ui/toggle-group     # this row's own battery
 Test Files  1 passed (1)
      Tests  9 passed (9)
```

**RE-RUN AT THE CURE ROUND (2026-08-08), verbatim.** The dist-demo was rebuilt FIRST —
this seat wrote `src/`, and a seat that writes `src/` owes the rebuild before it is
allowed to read a suite count:

```
$ npx vue-tsc --noEmit
(no output)                                   exit 0

$ npm run demo:dist:build
✓ built in 1.38s                              exit 0

$ npx vitest run tests/components/ui/toggle-group     # the battery, +1 case
 Test Files  1 passed (1)
      Tests  10 passed (10)

$ npx vitest run tests/styles tests/components tests/gates
 Test Files  6 failed | 153 passed (159)
      Tests  11 failed | 1468 passed | 5 expected fail (1484)

$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:1
  DRIFT (routed to #65) reka.tags-input.value-binding — tests/components/ui/reka-binding-idiom.test.ts
  VIOLATION active pager.tabs.panel-linkage: sourcePath missing — tests/components/pager-dots.contract.test.ts
  (byte-identical to the PRE and POST receipts above)
```

**THE DELTA IS ACCOUNTED FOR IN FULL: 12 failures → 11, 1466 passes → 1468.** The
`boot-graph.test.ts` failure in the table below was the **dist staleness** row, and the
rebuild retires it (14/14 passing on its own) — so it moves from the foreign-failure
column to the paid-by-this-seat column, which is where it always belonged the moment this
row touched `src/`. The second new pass is **CURE-84-A's own case**. Zero new failures.
The remaining **11 are the same foreign failures**, minus that row: #40 ×10 and the
uncommitted carousel lane ×1.

**THE BRIEF'S `violations:0` IS FALSE AT HEAD AND IS CORRECTED HERE.** The invariant the
brief actually names is *byte-identical pre+post*, and that holds exactly. The standing
`violations:1` is **#40 W-PAGER's**: it moved `tests/components/pager-dots.contract.test.ts`
→ `tests/components/pager-dots/contract.test.ts` **in the working tree without
re-pointing the roster**, and the register reports the missing `sourcePath`. Not this
row's to fix — it is a fence violation to green another row's uncommitted move.

**ALL 12 SUITE FAILURES ARE FOREIGN**, each traced to an uncommitted lane, none to a file
this row touched:

| failures | subject | owner |
|---|---|---|
| 5 | `pager-dots/contract.test.ts` ×4 + `pager-dots/morph.test.ts` ×1 | **#40** (uncommitted `PagerDots.vue`, `usePagerWorm.ts`, `pagerWindow.ts` deletions) |
| 3 | `gate-register.test.ts` — `ENOENT … pager-dots.contract.test.ts` ×2 + the violations row | **#40**, the same un-repointed move |
| 1 | `overfit-structure.test.ts` EXPORT-REACH — `LEAD_TRAIL_TAU_E_S`, `trailOffset` | **#40** (`useLeadTrail.ts`; the same leak #80's record banked) |
| 1 | `stacked-url-filter.test.ts` — self-labelled *"BORN-RED on PagerDots.vue:493, #40 W-PAGER owns the flip"* | **#40** |
| 1 | `carousel/contract.test.ts` — missing `tabindex` | the uncommitted carousel lane (8 modified + 2 deleted + 3 untracked files in tree) |
| 1 | `boot-graph.test.ts` — *"the dist-demo … is NEWER than every source"* | ~~`dist/` staleness, tranche-wide~~ [2026-08-08 · **NOT foreign, and calling it foreign was the convenient reading.** This row wrote `src/`, so this row owed the rebuild. `npm run demo:dist:build` at the cure round, 14/14 green] |

`tests/public-surface.spec.ts` is **2 failed / 81 passed both before and after** — the
standing HEAD RED (dist staleness). The −5 type-export delta is **invisible to it**, since
its `uiRuntimeExports` list is runtime names only and neither runtime name changed:
exactly what C-11 predicted, so **no re-pin is taken** and the one batched bump stays #65's.

### The mutation-bite matrix, run live (each mutation applied, suite run, file restored)

| # | mutation | result |
|---|---|---|
| M1 | drop `flex-wrap: wrap` | **1 failed** (G-TOGGLE-WRAP) |
| M2 | paste `backdrop-filter` back into the group rule | **2 failed** (G-TOGGLE-REGISTER + WRAP) |
| M3 | re-add `calc(var(--radius-pill) + 0.25rem)` | **1 failed** (G-TOGGLE-WRAP) |
| M4 | drop `.glass-control-edge` from the item class list | **1 failed** (G-TOGGLE-REGISTER) |
| M5 | flatten `activation` to `"automatic"` | **1 failed** (G-TOGGLE-ROLE activation arm) |
| M6 | hard-code `role="radiogroup"` in both modes | **1 failed** (G-TOGGLE-ROLE multiple arm) |

6/6 bite. Restored green: 9 passed, tsc 0, receipt identical.

---

## 5 · THE FENCE — per-hunk attribution on the five SHARED-DIRTY files

`git diff --stat` is a claim about the TREE, not the ROW (⊕⁵⁹). Foreign totals were
measured **before** this seat wrote a byte; the row's share is the difference.

| file | total changed | foreign (measured pre-seat) | **this row's** | foreign owner |
|---|---|---|---|---|
| `src/components/tabs/SegmentedTabs.vue` | 145 | 133 | **12** (6+/6−, the ToggleGroup comment clause only) | **#32 W-TABS** |
| `src/composables/motion/morph/useSelectionGroup.ts` | 84 | 24 | **60** (C-1 + the consumer-set clause) | **#32/#35** (the `deform` param) |
| `src/composables/motion/morph/useSelectionIndicator.ts` | 204 | 169 | **35** (C-1 only) | **#71 W-EYEGLASS** |
| `demo/…/AuroraColorSection.vue` | 5 | 2 | **3** | aurora lane |
| `tests/styles/radius-role-canon.test.ts` | 40 | 2 | **38** | **#35** (the slider `FORKS` line) |

**[2026-08-08 ⊕⁶⁰ · the table omitted a SIXTH row-owned file: useTabRovingFocus.ts, 24
changed lines all this row's C-1 genericization — caught at the driver's pre-commit sweep,
rides 60a64339 itself; no rider needed]**

Staging is per-hunk index surgery at `-U0`, the #80 precedent. Untracked and not counted
by `--stat`: `src/components/toggle-group/context.ts` (**+53 new**) and the four π cells.

---

## 6 · ROUTED — nothing silently dropped

| # | what | owner |
|---|---|---|
| RT-84A | **C-5's two indicator doc clauses** — REFUSED here with grounds (§2.6) | **W-SELECTION-ONE / W-TABS** |
| RT-84B | **C-19 consumer addenda, in THEIR tranches** — atlas: `register="glass"` ×3 + 3 comments, `VizPlate.css` `--control-floor`, `min-h-[44px]`, 3 inline + 1 scoped wrap overrides · sci-report: 11 wrap overrides, the `:deep(.norm-toggle)` de-pill + 8px item corner, `variant="outline"` retirement, `min-h-[44px]` · keyframes.js: item `size="sm"` → group (`EasingTarget.vue:60`), the `FadingScroll` wrapper + BG-12 comment · slides: the empty-payload re-pin guard, `rovingFocus`/`loop` restatements, and the deck-keys ArrowLeft/Right collision which **SHARPENS** under `role="radio"` where arrows MUST move selection · **value.js** [2026-08-08 · **CURE-84-F**: omitted from this table while the TR cell names it outright — *"value paints its relocated WatercolorSwatch into the slot and inherits the bounce"*. The `#indicator` seat built here IS value.js's addendum: the relocated swatch goes in the slot, inherits the item's hover lift and press squish, and **no watercolor byte returns to the library** (#55 stands). A consumer named in the terminal cell and absent from the routed table is the accounting hole this row's own RT-84M is about] | their tranches (**#76** relays the atlas phantom) |
| RT-84C | **C-15** — `manifest.ts:540` *"honest pressed state"* is now true-but-incomplete (it is honest ROLE-per-mode as well); the copy claim is not this lane's bytes | **W-STORY-COPY-CANON** |
| RT-84D | **C-13** — `tests/components/ui/toggle-group/` → `tests/components/toggle-group/`. The battery was rewritten **in place** rather than at the isomorphic path: minting the second directory would pre-empt the sweep and leave two homes | tests-isomorphism sweep |
| RT-84E | **C-11** — the −5 type-export delta rides the ONE batched `public-surface` re-pin; no bump taken here | **#65 W-GATE-COLLAPSE** |
| RT-84F | **C-12** — orphan `dist/components/toggle-group/` sheet | **W-GATE-TRUTH** (E-5) |
| RT-84G | **C-16 upstream** — `ControlSize` is still a literal `"sm"\|"md"\|"lg"` union against `axes.ts`'s sub-range law; this lane consumes and forks no third spelling | control-chassis fold |
| RT-84H | **C-8** — `.glass-capsule-hover` still lacks `@media (hover:hover)`; the lane's own unguarded `:hover` died with the composition, the register's did not | **K13** |
| RT-84I | **C-9** — `.focus-ring` → `outline` and F-4's `border-radius` write inside `utilities/base.css:115` | the library-wide focus wave |
| RT-84J | **C-2** — the four PROPORTION §6 literals in `styles.css` carry marked seams awaiting the token wave | the PROPORTION token-landing wave |
| RT-84K | **C-4/P9** — the `material.css:66` `--glass-cell-backdrop-filter` subtree RELEASE; P9's override half is discharged, the release half is a beneficiary receipt | **W-FROST** |
| RT-84L | **C-10/C-17/C-18** — no subpath minted here; the one-silhouette question and R-4's idle-breath hard-block are untouched and unlaundered | export-surface wave · binary-triad jointly · **OWNER** |
| RT-84M | **NEW, opened by this cut** — the widening's owner row **#19 is CLOSED without its C-1 item**, which this row landed as residue (§2.0). A closed row whose named sub-item is absent on disk is a state the three-field law does not currently catch (`code_state=landed` says nothing about item coverage) | **#65** (the accounting arm) |
| RT-84N | **NEW** — `--control-surface-bg` resolves to `rgba(0, 0, 0, 0)` in light at HEAD (the `oklch(from … / calc(0.14 - 1 * 0.04))` relative-colour chain); the pill's visible body comes from the rim insets + `backdrop-filter` alone. P3 parity holds either way and this lane declares none of it, but a control fill that computes to fully transparent is a register question worth an owner. **[2026-08-08 · CURE-84-C widens the ask**: the same chain also under-carries CWT-3 §3.5's unselected-hover 0.05 rung, since `--control-surface-bg-hover` mixes 35% off that transparent rest fill. The magnitude of BOTH rungs is one register question, not two] | **#82 W-FIELD** (the `.field-control`/`.control-surface` register) ∥ **#68** |
| RT-84O | **NEW, CURE-84-B** — the **dead single-slider measure**. A caller that omits `indicatorRef` still pays `useSelectionIndicator`'s unconditional `ResizeObserver` plus two `getBoundingClientRect`s per mount and per resize, writing a `singleSliderStyle` it never reads. The comments are corrected here; **the economization is NOT taken here** — `useSelectionIndicator.ts` is 169/204 changed lines foreign in this tree, and greening another row's engine inside this cut is the exact fence violation refused at §4's `violations:1` | **#71 W-EYEGLASS** (the engine owner) |
| RT-84P | **NEW, CURE-84-F — the π REMAINDER, assigned rather than left owed in prose.** Four cells this row measured only in Chromium or not at all: (a) the whole **`safari-app` column** — never inferred from Chromium ([[feedback-playwright-webkit-not-safari]]), incl. P6's VoiceOver cell; (b) **P7's coarse-pointer half** — CDP viewport emulation at 402 is still a *fine* pointer, so `--control-h-*`'s `@media (pointer: coarse)` arm did not engage and the item measured 40px where the coarse rung expects 60; (c) **P8 whole** — hover → press → release and the PRM zeroing of the spatial legs, every byte of which is `.glass-capsule-hover`'s and `.tap-squish`'s; (d) **P4's contrast ratio** — the on/off ink Δ is banked, the computed ratio is the compositor's. Per the **#79–#83 precedent** these ride the π seat, not a re-open of this lane | **#10** (the π/paint seat) |

---

## 7 · LOC — measured this seat, both ways

**[2026-08-08 · CURE-84-D — the table is restated with THREE columns where it had one,
because two different kinds of correction land in it.** `ToggleGroupItem.vue`'s terminal
raw was booked at **92** and was never on disk: `wc -l` said **90** at the pre-cure state.
That is a FALSE FIGURE and it is struck. Separately, the cure round itself added lines —
CURE-84-A's getter + derivation, CURE-84-B's true `indicatorRef` comment, CURE-84-C's
deviation disclosure — and that is a CURE DELTA, not a correction. Both are shown so
neither hides inside the other.]

| file | HEAD raw | pre-cure raw | **terminal raw** | HEAD code-only | **terminal code-only** |
|---|---|---|---|---|---|
| `ToggleGroup.vue` | 134 | 137 | **145** | 122 | **80** |
| `ToggleGroupItem.vue` | 47 | ~~92~~ **90** | **99** | 41 | **55** |
| `toggleGroupContext.ts` → `context.ts` | 17 | 53 | **53** | 12 | **22** |
| `styles.css` | 126 | 144 | **157** | 100 | **82** |
| `index.ts` | 12 | 5 | **5** | 12 | **5** |
| **total** | **336** | ~~**431**~~ **429** | **459** | **287** | **244** |

Cure-round raw delta **+30, of which +28 are comment**: `ToggleGroup.vue` +8 (CURE-84-B),
`styles.css` +13 (CURE-84-C), `ToggleGroupItem.vue` +9 (CURE-84-A: **2 code**, 7 comment).
The only code the cure round added anywhere is the getter.

**FIGURE NOT REPRODUCED, RECORDED RATHER THAN QUIETLY CHANGED:** the `ToggleGroup.vue`
code-only **80** does not fall out of a plain strip-comments-and-blanks count, which reads
**84** (the four SFC shell tags — `</script>`, `<template>`, `</template>`, `<style>` —
account for the gap, but that exclusion does not then reproduce `ToggleGroupItem.vue`'s
53). Every other cell in the column reproduces exactly. The column is left on the
original seat's basis with the delta this cure caused (+2) applied, and the discrepancy is
stated instead of silently re-based — a LOC column is not worth a second false figure.

**Code-only: ~~−45 (−15.7%)~~ −43 (−15.0%).** The spec projected ≈−67 (−21%) off a 323-line baseline that
was 15 lines stale (§1). Raw lines are ~~**+95**~~ **+123**, and the honest reason is
stated rather than buried: comment stock was **0/336 at HEAD** (both foremen, reproduced)
and is now **~215 lines** (189 at the cut, +28 at the cure round). §8 budgeted
*"~15 rationale lines"* and this cut spent fourteen times that.
**The deviation is deliberate and is the record of every deletion above** — the sheet
carries why the track died, why `--scale-press` must survive, why the fill is 0.12, why
the gap is a literal; without them the next reader re-derives or "fixes" them. It is the
house idiom (`control-bit.css` ships 400 lines for 154 of code). `G-COMMENT-RATIO` is an
unbound seat with no detector, so no figure is claimed against it.

---

## 8 · THE CURE ROUND — 2026-08-08, `CURE-ORDER-84.md` executed in full

Adjudicator: Fable, quartet seat `wf_83fa05fb-56b`, ruling **CURE-REQUIRED**; six cures
ratified verbatim by the driver. Cure seat: **`modelId: claude-opus-5[1m]`**. Nothing
here re-opens what the order let STAND (the selection, the gestalt cut, C-1 as disclosed
inherited residue, CURE-84-1, the born-RED lane gates + 6/6 bites, the four fenced
shared-file attributions, the four banked π cells, the reproduced verify gate).

| cure | class | what landed | where |
|---|---|---|---|
| **CURE-84-A** | code, **BLOCKING** | `value: props.value` (frozen at setup) → `get value() { return props.value; }`; battery case for a post-mount value change | `ToggleGroupItem.vue`, `ToggleGroup.test.ts` |
| **CURE-84-B** | truth | *"the measure no-ops"* is FALSE at all three claim sites; corrected, HEAD's accurate `squish/` half restored, the economization ROUTED (RT-84O → #71) with **zero engine behaviour touched** | `ToggleGroup.vue`, `useSelectionGroup.ts`, §2.3 |
| **CURE-84-C** | truth | `styles.css`'s comment named `0.05`, a literal not in the sheet; corrected to the two that are, and the hover **deviation-by-composition** disclosed with the RT-84N caveat | `styles.css`, §2.1 |
| **CURE-84-D** | figures | P6 `5/5` → `4/5` + the stated fifth · §7 `92`→`90`, total `431`→`429` · §2.5 `106`→`107` | §3, §7, §2.5 |
| **CURE-84-E** | fence | the ten formatter-only lines reverted to HEAD bytes; the flex-wrap deletion kept | `glass-panel.vue`, §2.5 |
| **CURE-84-F** | routing | value.js added to RT-84B; **RT-84O** (dead measure → #71) and **RT-84P** (the π remainder → #10) opened | §6 |

**CURE-84-A's born-RED is a measurement, not a claim.** The new case was written and run
**against the pre-cure bytes on disk** before a byte of `ToggleGroupItem.vue` moved:

```
$ npx vitest run tests/components/ui/toggle-group     # PRE-cure bytes
 FAIL … > the item's value is LIVE — a post-mount value change commits the new value
AssertionError: expected 'a' to be 'b' // Object.is equality
 Test Files  1 failed (1)
      Tests  1 failed | 9 passed (10)

$ npx vitest run tests/components/ui/toggle-group     # POST-cure
      Tests  10 passed (10)
```

**CURE-84-E's proof is the whole diff**, and it is the only form of proof that settles a
formatter-noise question:

```
$ git diff --numstat -- demo/stories/substrates/glass-panel.vue
0	1	demo/stories/substrates/glass-panel.vue
```

One deletion — `class="flex-wrap"` — and nothing else.

### 8.1 · Folded notes

**THE #82 RULING — the procession's, not this row's, and it is folded so nobody
re-litigates it.** The reading that *"ASK g6 parks #82 W-FIELD"* is **STRUCK going
forward**. `ASK.md`'s own preamble is **silence advances, never parks**: **g6 fires AT
#82's cut with a ratified default of KEEP**, so it gates nothing beforehand. Both of
#82's code preconditions are discharged — #83's `_shared/control.ts` and this row's proof
that `ControlProps` composes cleanly at a second consumer — which makes **#82 the
canonical next row**. The skip taken at §0 still stands as taken (it followed the DAG's
precondition column, which is what a scout is entitled to read); what does not stand is
the *parking*.

**The `dropdown-menu` suite-order flake — RT-19G class.** It passes in isolation and
passes in the cure-round subset run; it has been seen RED under a different file
ordering. Recorded as the known suite-order class, not as a defect of any row, and not
counted in the 11.

**The step-0-baseline protocol hazard, 4th recurrence.** This lane's brief carried a base
SHA five ledger entries stale (`4917a042` vs the real `fff9b117`), re-derived rather than
trusted at §0 — the same shape as the stale-worktree trap. The driver folds it into the
quartet prompt at the next dispatch; it is recorded here because the count matters more
than the incident.

**RT-84M and RT-84N stand as opened routes** — a closed row carrying an unexecuted named
sub-item that the three-field law cannot see (→ #65), and a control fill computing to
fully transparent in light (→ #82 ∥ #68, now widened by CURE-84-C to cover the hover rung
built on it).

### 8.2 · Defect found by the cure seat that the order did not name

**`ToggleGroup.vue`'s §7 code-only `80` is not reproducible** (a plain
strip-comments-and-blanks count reads **84**, and no single consistent exclusion rule
reproduces both it and `ToggleGroupItem.vue`'s `53`). Every other cell in that column
reproduces exactly. **Recorded, not silently re-based** — see §7's stated basis. It is a
figure, not a behaviour, and re-basing a column on an unstated method would have replaced
one unverifiable number with another.
