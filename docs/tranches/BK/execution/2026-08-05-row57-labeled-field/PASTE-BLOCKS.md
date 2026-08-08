# Banked paste blocks — Row #57 W-LABELED-FIELD

Both blocks are OUT of the executing seat's fence; the driver pastes them at the landing commit and
substitutes the real SHA for `<SHA>`.

**THE ⊕-INDEX IS DERIVED AT COMMIT TIME FROM THE CURSOR'S TAIL — NEVER BANKED AS A CONSTANT.** These
blocks were first banked at ⊕⁵², which #55 WATERCOLOR-RELOCATE had already taken
(`EXECUTION-PROGRESS.md:1670`, `62305f4a`) while this row was in flight; the collision was caught at
adjudication, not at paste. Re-indexed to **⊕⁵³** against the cursor's real tail. The driver re-reads
the tail one more time immediately before pasting and re-indexes again if a lane landed in between —
the index below is a best-known value, not an authority.

---

## A · `docs/tranches/BK/EXECUTION-PROGRESS.md` — append to the ledger (after ⊕⁵², #55's block)

```
⊕⁵³ **#57 W-LABELED-FIELD LANDS (2026-08-07, `<SHA>`).** The tier-3 SPLIT and FFN-10 in one
cut, and the split's POINT is the edge: `LabeledSelect` — 61 lines whose whole content was an
`items` array — **DELETED from `src/components/labeled-field/`** with `LabeledSelectProps`, so
`./labeled-field` stops importing `../select` and stops dragging select→popover→portal→
dismissable-layer behind every consumer of a label (`DAG-RULINGS:188` names exactly this
sever). The subpath SURVIVES at `PUBLISH` with four members; the preset lands demo-private at
`demo/chassis/field/LabeledSelect.vue` on the chassis barrel's own stated terms, imported
deep-relative like the other 190+ chassis sites and **not** added to a barrel with one consumer.
**FFN-10 CLOSED, born-RED**: `items` is now `readonly (T | {value, label})[]` over a
`generic="T extends string"` SFC with ONE normalising computed — *a bare string is an option
whose label is its own value* — and the RED was the option rendering its own JSON
(`"{ \"label\": \"Fourier (warm)\", \"value\": \"var(--viz-fourier)\" }"` where
`"Fourier (warm)"` was owed), with the bare-string and anatomy cases GREEN at the same
pre-cure bytes: the honest signature of a behaviour-preserving relocation carrying one real
defect. The case pins BOTH halves in one place — the rendered text is the label AND
`[role="option"][aria-selected="true"]` is the option the VALUE keyed. **THE DEAD LABEL TABLES
DIE**: `fourier-field.vue`'s `:items="SOURCE_OPTIONS.map((o) => o.value)"` ×2 pass their pairs
now, and the erased value type pays itself back at **9 call sites** — 4 `as unknown as
readonly string[]` casts (blob ×3, configurator ×1) and 3 re-narrowing `@update:model-value`
handlers (settings, now plain `v-model`) delete themselves because the type stopped lying.
**#68's TOKEN LAW on the survivor**: `LabeledField.vue` held **4 of the repo's 7** bare
`var(--spacing)` reads (7 hits in 3 files at HEAD; `card/styles.css` ×2 and `alert/index.ts:15`
are the others, and the alert site is #33's live lane, routed not touched) and hand-multiplied a
Tailwind bridge primitive, which forks the space series AND does not step down; it now reads the
named rungs (`--space-atom` / `--space-residue` / `--space-body`), so the ONE width-conditional
declaration in `tokens/sizing.css` §1.1 tightens the field for free. **PAINT MOVES IN FOUR CELLS
AND ALL FOUR ARE STATED: 16→12 desktop · 16→8 mid (576–768px) · 8→4 stacked-mobile · 8→4
collapsed.** The desktop 16→12 is the rank change — 16 is not on the `4·8·12·20·32` series, and it
goes DOWN because `color-radius.css` §1.2 rules 20 (`--space-family`) the SEAM between sibling
fields while ≤12 (`--space-body`) is within one object, which a label beside its own control is.
The other three are §1.1's ≤768px step-down ARRIVING, which is the whole point of adopting the
rungs — and still paint, so still owed a capture. **ZERO bespoke material, verified not asserted**
(two grep hits across both halves, neither a declaration: one README prose line, one `//` comment).
`MIGRATION.md` §8.0.0 + `CHANGELOG.md` book the removal by line with the ~30-line worked
composition that IS the replacement — **no drop-in, by design**. **G-RELAY walked at the cut: 0
dangling importers**; the one stale committed record (`docs/consumer-evidence/
labeled-field-action-slot.md:18`) is struck in place and dated. **GATES: zero minted, zero
bound, zero moved** — the register receipt is BYTE-IDENTICAL pre and post, `seats:60 active:48
reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1
rosterSha256:dc05df91 violations:1`, the one violation being #40's uncommitted
`pager-dots.contract.test.ts` deletion — recorded, not papered over, and not this row's to
reach. Verify: **vue-tsc 0** · `tests/styles tests/components tests/gates` **12 failed / 1385
passed / 2 expected fail — the SAME 12 as the pre-edit baseline, every one foreign** (#40 ×9,
#7/#40 born-RED ×1, the driver's dist-freshness arm ×1) · `tests/demo` + `public-surface`
**145 passed / 2 failed, both #46's named foreign pair** (the embla lock-root disagreement, the
six missing dist partials) · **row-own 9/9** — `tests/demo/labeled-select.test.ts` **3/3** and
`labeled-field.contract.test.ts` **6/6** (6 cases at HEAD, 6 now; no case was re-homed — what
left is ONE `mount()` inside the multi-mount adapter-anatomy case). The one foreign byte in
`tests/public-surface.spec.ts` — #46's `GlassTimeline`→`Timeline` runtime-export rename, missed by
`9bc8d25f`'s scoped add — is **not booked row-own**: it landed first as its own `#46 completion`
commit (`a53cf98d`, the `ff7451d7` precedent). **π NOT CLAIMED**: all four cells are owed to #10
π-SUITE, the mobile three at the estate's 390×844. Record:
`docs/tranches/BK/execution/2026-08-05-row57-labeled-field/RECORD.md`. **ROUTED**: the four paint
cells (desktop + every mobile cell) + the four `tests-visual/` naming comments → **#10** ·
`alert/index.ts:15`'s bare `var(--spacing)` → **#33's live alert lane** · `card/styles.css`'s
surviving `calc(var(--spacing) * n)` → **#79** · external `LabeledSelect` importers → **#76** (one
marked addendum per repo at ship-time) · the unbuilt `#action`-slot evidence record's stale
artefact path → **#14**.

**Φ5 procession: next = re-scout.** #57 unblocks nothing — no DAG row deps it. #21 stays gated
on #17 (hard, Φ4-UNSTARTED), #25 on its rides-clause, #42 on #47, #45 on #52, #52 on #35, #44
behind #43's cut, #47 behind #72 + the #7-fence, #48 behind #47 W7; #22 is IN-FLIGHT at its cure
cut and never selectable; **#32 · #33 · #34 · #35 · #40 · #71 sit UNCOMMITTED IN THIS WORKING
TREE**; #49/#50/#51/#53 are ASK-gated (g3+g7 · g1 · atlas-ACK+g12 · g4 with #54/#52/C-13). The
cursor alone cannot show a lane that has not committed (⊕⁴⁸), so the next scout re-derives from
the DAG **and** `git status`, never from this block's list.
```

---

## B · `docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md` — row 57 append

Append inside row 57's last cell (before the closing `|`). **PIPE-COUNT LAW**: row 57 carries **6
structural pipes** at `TERMINAL-ROSTER.md:207` and must still carry 6 after the append — the one
`|` inside the FFN-10 type below is written `\|` for exactly that reason (the roster's own
convention, cf. rows 1/22/35/38/40/43/53/71). The block as first banked had it RAW, which would have
split the cell; fixed here.

```
 ⊕⁵³ **LANDED 2026-08-07 (`<SHA>`; record `docs/tranches/BK/execution/2026-08-05-row57-labeled-field/RECORD.md`).** Both halves cut together. **SPLIT**: `LabeledSelect` + `LabeledSelectProps` DELETED from the library (61 ln), the `labeled-field→select` edge SEVERED (`DAG-RULINGS:188`) so the subpath stops dragging the overlay chain; subpath stays `PUBLISH` with 4 members; the preset lands demo-private at `demo/chassis/field/LabeledSelect.vue` (99 ln), 8 importers touched — **7 re-pointed + 1 deleted** (`forms/labeled-field.vue`, whose specimen is struck). **FFN-10 CLOSED**: `items: readonly (T \| {value,label})[]` on a `generic="T extends string"` SFC, ONE normalising computed, born-RED at the option rendering its own JSON; the dead label tables die (`fourier-field` ×2) and **9 call sites** lose 4 `as unknown as` casts + 3 re-narrowing handlers because the value type stopped lying. **#68 token law**: **4 of the repo's 7** bare `var(--spacing)` reads move onto the named rungs (the other 3 are `card/styles.css` ×2 → #79 and `alert/index.ts:15` → #33's live lane), so the `sizing.css` §1.1 step-down reaches the field — **paint moves in FOUR cells, all stated: 16→12 desktop · 16→8 mid (576–768px) · 8→4 stacked-mobile · 8→4 collapsed** (the desktop cell is the rank change — 16 is off the `4·8·12·20·32` series, DOWN to `--space-body` because `color-radius.css` §1.2 rules 20 the sibling-field seam; the other three are §1.1's floor arriving, which is the point of the adoption). **Zero bespoke material, verified** (2 grep hits, neither a declaration). Break booked by line in `MIGRATION.md` §8.0.0 + `CHANGELOG.md` with the worked composition, **no drop-in by design**. G-RELAY walked: **0 dangling importers**. **Gates seats +0, register receipt byte-identical pre/post**; verify vue-tsc 0, suites at the pre-edit baseline (12 foreign failures), **row-own 9/9 (3/3 + 6/6)**. The `public-surface.spec.ts` `GlassTimeline`→`Timeline` byte is #46's, landed first as its own completion commit (`a53cf98d`), not booked here. π owed to #10 — desktop **and** the 390×844 mobile cell.
```
