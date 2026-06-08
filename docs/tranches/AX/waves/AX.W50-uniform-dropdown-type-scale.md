# AX.W50 — Uniform dropdown/select/menu type-scale: one `--dropdown-text` token the whole picker family reads

**Band** G · PRIMITIVES · **Severity** minor · **dependsOn** AX.W00 (the π visual-runtime lane that
closes the family-parity audit) · **Charter** AX convergence-plan NET-NEW row W50 (D17 —
orchestrator-added after WF1; the WF3 lane audits D17 at source, recorded here) · **Audit**
`convergence/CONVERGENCE-PLAN.md` line 28 (the W50 mint) + the SOURCE audit this doc records
(no `D17.md` finding file exists — D17 was orchestrator-added, so the born-RED witnesses below are
the grounded source probe done at authoring time, not a re-statement of a WF1 finding).

---

## State (born-RED — the gate must fail at HEAD before the wave)

The shadcn-vue picker family (Select / DropdownMenu / Combobox / ContextMenu / Command +
MultiSelect) inherits a **scattered raw-Tailwind font-size leak** — every item, trigger, label,
heading, shortcut, input, and empty hardcodes a `text-sm` / `text-xs` Tailwind literal, with NO
shared house token any of them reads. The result is the user-reported "dropdowns have inconsistent
font-size + scaling": the family's *type-scale is uncontrollable* (no single override re-tints it) and
*internally divergent* (item rows at `text-sm`, group-headings + shortcuts at `text-xs`, the two
combobox/command inputs at `text-sm` but on MISMATCHED heights `h-10` vs `h-11`). Four falsifiable RED
witnesses, each a source-true line probe the new gate inverts:

- **RED witness 1 (the headline — there is NO `--dropdown-text` token; every site is a raw Tailwind
  literal; grep-falsifiable).** `grep -rn "\-\-dropdown-text\|\-\-menu-text" src/` returns **0** at
  HEAD — no shared type-scale token for the family exists. Instead the scale is hardcoded as a raw
  `text-sm` Tailwind literal at the SHARED item base (`_shared/menuItemVariants.ts:33`,
  `"text-sm outline-none"`) AND independently re-stated at every NON-item surface:
  `SelectTrigger.vue:42` (`text-sm`), `SelectLabel.vue:10` (`text-sm`),
  `DropdownMenuLabel.vue:20` (`text-sm`), `ContextMenuLabel.vue:19` (`text-sm`),
  `ComboboxInput.vue:33` (`text-sm`), `ComboboxEmpty.vue:17` (`text-sm`),
  `CommandInput.vue:32` (`text-sm`), `CommandEmpty.vue:17` (`text-sm`). **Falsifiable RED:** *grep the
  family dir for `text-sm`/`text-xs` literals → at HEAD ≥ 14 literal hits across ≥ 11 files, 0
  token reads (RED — no controllable scale, the shadcn default leak). After the wave: 0 raw
  `text-sm`/`text-xs` literals in the family; every item/trigger/label/input/shortcut/heading resolves
  the SAME `--dropdown-text` (or its `--dropdown-text-secondary` sub-rung) token (GREEN).*

- **RED witness 2 (the family is internally INCONSISTENT — three different literals for one
  conceptual scale; grep-falsifiable).** The "secondary" surfaces (group-headings + keyboard
  shortcuts) hardcode `text-xs` while the primary surfaces hardcode `text-sm` — but the choice is
  ad-hoc per-file, not a governed two-rung scale: `DropdownMenuShortcut.vue:11` (`text-xs`),
  `ContextMenuShortcut.vue:11` (`text-xs`), `CommandShortcut.vue:11` (`text-xs`),
  `ComboboxGroup.vue:22` (`text-xs` heading), `CommandGroup.vue:22` (`text-xs` cmdk-group-heading),
  `MultiSelect.vue:139` (`text-xs` badge). Meanwhile `SelectLabel`/`DropdownMenuLabel`/
  `ContextMenuLabel` — conceptually the SAME "section label" role as a combobox/command group-heading
  — are at `text-sm`, not `text-xs`. **Falsifiable RED:** *the same conceptual role (a section
  label) paints at `text-sm` in Select/DropdownMenu/ContextMenu but at `text-xs` in Combobox/Command
  — a within-family scale contradiction (RED). After the wave: every section-label/heading reads ONE
  `--dropdown-text-secondary` rung; the primary/secondary split is governed by the token pair, not the
  per-file literal lottery (GREEN).*

- **RED witness 3 (the two text inputs scale-mismatch on BOTH font AND height; runtime-falsifiable).**
  `ComboboxInput.vue:33` is `h-10 … text-sm`; `CommandInput.vue:32` is `h-11 … text-sm` — the same
  primitive role (a filter input at the top of a picker list) renders at two different control
  heights, and neither font-size reads the family token. **Falsifiable RED:** *mount a `<Combobox>`
  filter input beside a `<Command>` filter input and read back `getComputedStyle().height` +
  `fontSize` — at HEAD the heights differ (`h-10`=2.5rem vs `h-11`=2.75rem) and the font-size is a raw
  literal (RED). After the wave: both inputs read the family `--dropdown-text` token and a shared
  input-height register so the picker-input role is byte-consistent (GREEN).*

- **RED witness 4 (the scale is NOT overridable from one token — the consumer cannot re-tint the
  family; runtime-falsifiable).** Because every site is a raw Tailwind literal, a consumer who wants
  the whole picker family one notch larger (the user's actual ask — "the scaling is inconsistent")
  has NO single override: there is no `:root { --dropdown-text: … }` seam, because the token does not
  exist. The only path today is to override each component's `class` at every call site (the
  anti-pattern the token-first axis exists to kill). **Falsifiable RED:** *set `:root { --dropdown-text:
  var(--type-body); }` and mount the family → at HEAD NOTHING changes (the token is read by no
  component; RED — the override is dead). After the wave: that one override re-resolves every
  item/trigger/label/input/shortcut font-size library-wide with zero call-site edit (GREEN — the
  token-first axis, J invariant 1).*

The wave is RED at HEAD on all four; the HardGate below drives each to GREEN.

---

## Goal

The whole shadcn-vue picker family (Select / DropdownMenu / Combobox / ContextMenu / Command +
MultiSelect) converges onto ONE governed two-rung type-scale — a `--dropdown-text` primary token +
a `--dropdown-text-secondary` token — that every item, trigger, label, heading, shortcut, input, and
empty reads, so the family paints at ONE uniform scale, the within-family `text-sm`/`text-xs`
contradictions are resolved into a governed primary/secondary split, the two filter inputs share one
height register, and a consumer re-tints the entire family from a single `:root` override (the
token-first axis), with the shadcn raw-`text-sm`/`text-xs` literal leak excised.

---

## Scope (the gestalt fix — one token pair, no per-call-site override, no shadcn literal)

The four witnesses are the SAME pathology — the shadcn-vue family ships its font-size as raw Tailwind
`text-sm`/`text-xs` literals with no house token — read at four altitudes. ONE cohesive token-first
pass mints the controllable scale and routes every family surface through it.

1. **Mint the `--dropdown-text` token pair (the headline — token-first, House ladder anchored).** Add
   a two-rung family type-scale to the cascade, anchored on the EXISTING golden-ratio typography ladder
   (NOT a fresh magic number — `--type-small` = `0.875rem` is the existing `text-sm`-equivalent house
   rung, `--type-caption` = `0.75rem` is the existing `text-xs`-equivalent rung):
   - `--dropdown-text: var(--type-small)` — the PRIMARY family scale (items, triggers, labels,
     inputs, empties). Defaults to `0.875rem` so the wave is **visually byte-identical at default** to
     the HEAD `text-sm` (a clean-break refactor of the *plumbing*, not a visual-scale change — the
     uniformity + the override seam are the deliverable, not a size bump; the GLOBAL comfortable-sizing
     bump is W51's `--ui-scale`, see Dedup).
   - `--dropdown-text-secondary: var(--type-caption)` — the SECONDARY rung (group-headings, keyboard
     shortcuts), defaulting to `0.75rem` so the secondary surfaces stay byte-identical to the HEAD
     `text-xs`.
   The token's HOME: `src/styles/tokens.css` raw rung + the `@theme inline` bridge in `theme.css` so a
   Tailwind `text-dropdown` utility resolves through it (the same `--text-small: var(--type-small)`
   bridge pattern the ladder already uses at `theme.css:74`). NEVER `hsl(var(--token))`-style
   double-wrap; the rung is a length, consumed directly as `var(--dropdown-text)`.

2. **Route the SHARED item base through the token (one edit, 13 item SFCs inherit).** Replace
   `menuItemVariants.ts:33` `"text-sm outline-none"` → `"text-[length:var(--dropdown-text)] outline-none"`
   (the Tailwind v4 arbitrary-length form reading the token). All 13 item SFCs that compose
   `menuItemVariants` (SelectItem, DropdownMenuItem/CheckboxItem/RadioItem/SubTrigger,
   ContextMenuItem/CheckboxItem/RadioItem/SubTrigger, ComboboxItem, CommandItem) inherit the token in
   ONE edit — the CVA is already the single shared item authority; this just points its scale at the
   token instead of the literal.

3. **Route every NON-item family surface through the token pair (excise the scattered literals).**
   Replace the raw `text-sm` / `text-xs` at each surface with the family token:
   - **Primary (`--dropdown-text`):** `SelectTrigger.vue:42`, `SelectLabel.vue:10`,
     `DropdownMenuLabel.vue:20`, `ContextMenuLabel.vue:19`, `ComboboxInput.vue:33`,
     `CommandInput.vue:32`, `ComboboxEmpty.vue:17`, `CommandEmpty.vue:17`.
   - **Secondary (`--dropdown-text-secondary`):** `DropdownMenuShortcut.vue:11`,
     `ContextMenuShortcut.vue:11`, `CommandShortcut.vue:11`, `ComboboxGroup.vue:22` (heading),
     `CommandGroup.vue:22` (the `[&_[cmdk-group-heading]]:text-xs` arbitrary-selector heading) +
     `CommandGroup.vue:24` (the inline `ComboboxLabel` heading), `MultiSelect.vue:139` (the selected
     badge — RATIFY: the badge is a `<Badge variant="secondary">`, conceptually a chip not a menu
     surface; if it reads as a Badge-family scale not a dropdown scale, leave it on the Badge token —
     see Open Questions; the gate scopes to the picker surfaces, not the chip).
   - **RESOLVE the section-label contradiction (witness 2):** the Select/DropdownMenu/ContextMenu
     `*Label` surfaces are conceptually the SAME role as the Combobox/Command group-headings. RATIFY
     ONE rung for the role (recommend: section-labels → `--dropdown-text-secondary` to match the
     combobox/command heading, since a section label is a quieter-than-item caption) so the same role
     paints at ONE scale family-wide. The recommendation collapses the `text-sm` labels DOWN to the
     secondary rung — the within-family scale contradiction is the defect; pick the quieter rung.

4. **Unify the two filter-input height registers (witness 3).** `ComboboxInput` (`h-10`) and
   `CommandInput` (`h-11`) are the same primitive role at two heights. Mint `--dropdown-input-height`
   (defaulting to `2.5rem`, the `h-10` register, the more common picker-input height) and point BOTH
   inputs at `h-[var(--dropdown-input-height)]` so the picker-input role is one register. (This is a
   HEIGHT register, sibling to the font token — both ride the family scale so a consumer bump moves
   them in lockstep; the font + height co-vary, the proportion-preserving move.)

5. **Govern the family scale (the rationale layer).** Document the token pair + which surface-class
   reads which rung in a `tokens.css` §-comment (the family scale-contract): primary rung →
   item rows + triggers + filter inputs + empties; secondary rung → section labels + group-headings +
   keyboard shortcuts. This is the doc-table the `proof:dropdown-type-scale` gate's allow-list mirrors.

### Token-first / no-overfitting alignment

- The `--dropdown-text` token has **≥ 6 component-family consumers** (Select, DropdownMenu, Combobox,
  ContextMenu, Command, MultiSelect) — far above the ≥ 2-consumer overfitting bar. It is a public
  token (a `@theme`-bridged custom property a consumer can override), the canonical token-first
  artefact.
- The clean break: the raw `text-sm`/`text-xs` literals are EXCISED, not aliased — no
  `--dropdown-text` that merely re-states `text-sm` while the literals survive (that would leave two
  scale authorities, the W05-class no-legacy violation). Every family surface reads the token; the
  literal is gone (no-backwards-compat MEMORY: clean break).
- This wave is **visually byte-identical at default** (the tokens default to the existing
  `--type-small`/`--type-caption` rungs the `text-sm`/`text-xs` literals already resolved to in the
  glass-ui ladder). The DELIVERABLE is the uniformity + the single-override seam, not a size change.
  A consumer who wants the family *larger* gets it from one `:root { --dropdown-text: var(--type-body); }`
  override — which is exactly the user's "inconsistent scaling" remedy, now a one-line token write.

### Forward-reconcile note (W51 `--ui-scale` — NOT executed here)

The convergence plan's W51 mints a library-wide `--ui-scale` comfortable-sizing axis and records that
**W50's `--dropdown-text` becomes a SPECIALIZATION that reads `--ui-scale`** (one scale system, not
three). This wave authors `--dropdown-text` as a STANDALONE family token anchored on the typography
ladder; when W51 lands, the reconcile is a one-line re-anchor (`--dropdown-text: calc(var(--type-small)
* var(--ui-scale))` or the W51-canonical derivation). This wave does NOT pre-build the `--ui-scale`
plumbing (W51 owns it) — it leaves the token's default on the ladder rung so the W51 specialization is
a clean re-point, not a rewrite. Flagged so an implementer does not invent a parallel `--ui-scale`
here (the §3a scope-reveal trigger).

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/styles/tokens.css` | **ADD** the `--dropdown-text` / `--dropdown-text-secondary` / `--dropdown-input-height` raw rungs (anchored on `--type-small`/`--type-caption`) + the family scale-contract §-comment (which surface-class reads which rung). |
| `src/styles/theme.css` | **ADD** the `@theme inline` bridge (`--text-dropdown: var(--dropdown-text)` …) mirroring the existing `--text-small: var(--type-small)` ladder-bridge pattern (`:74`), so a `text-dropdown` Tailwind utility resolves the token. |
| `src/components/ui/_shared/menuItemVariants.ts` | `:33` — `"text-sm outline-none"` → `"text-[length:var(--dropdown-text)] outline-none"` (the shared item base; 13 item SFCs inherit). |
| `src/components/ui/select/SelectTrigger.vue` | `:42` — the `text-sm` literal → the `--dropdown-text` token read. |
| `src/components/ui/select/SelectLabel.vue` | `:10` — `text-sm` → `--dropdown-text-secondary` (the section-label rung per the RATIFY). |
| `src/components/ui/dropdown-menu/DropdownMenuLabel.vue` | `:20` — `text-sm` → `--dropdown-text-secondary`. |
| `src/components/ui/dropdown-menu/DropdownMenuShortcut.vue` | `:11` — `text-xs` → `--dropdown-text-secondary`. |
| `src/components/ui/context-menu/ContextMenuLabel.vue` | `:19` — `text-sm` → `--dropdown-text-secondary`. |
| `src/components/ui/context-menu/ContextMenuShortcut.vue` | `:11` — `text-xs` → `--dropdown-text-secondary`. |
| `src/components/ui/combobox/ComboboxInput.vue` | `:33` — `text-sm` → `--dropdown-text`; `h-10` → `h-[var(--dropdown-input-height)]`. |
| `src/components/ui/combobox/ComboboxEmpty.vue` | `:17` — `text-sm` → `--dropdown-text`. |
| `src/components/ui/combobox/ComboboxGroup.vue` | `:22` — the `text-xs` heading → `--dropdown-text-secondary`. |
| `src/components/ui/command/CommandInput.vue` | `:32` — `text-sm` → `--dropdown-text`; `h-11` → `h-[var(--dropdown-input-height)]` (the height-register unification). |
| `src/components/ui/command/CommandEmpty.vue` | `:17` — `text-sm` → `--dropdown-text`. |
| `src/components/ui/command/CommandShortcut.vue` | `:11` — `text-xs` → `--dropdown-text-secondary`. |
| `src/components/ui/command/CommandGroup.vue` | `:22` (the `[&_[cmdk-group-heading]]:text-xs` arbitrary-selector) + `:24` (the inline `ComboboxLabel` heading `text-xs`) → `--dropdown-text-secondary`. |
| `src/components/ui/multi-select/MultiSelect.vue` | `:139` — the selected-badge `text-xs` (RATIFY: leave on Badge token if it reads as a chip not a picker surface — see Open Questions; default disposition is leave-on-Badge, the gate scopes the picker surfaces only). |
| `scripts/proof-dropdown-type-scale.mjs` | **NEW** — the device-free SOURCE gate (see HardGate): no raw `text-sm`/`text-xs` literal survives in the family dirs; every family surface reads `--dropdown-text` / `--dropdown-text-secondary`; the token resolves on the cascade (tokens.css → theme bridge). |
| `package.json` | Register `proof:dropdown-type-scale` + the W00 meta-gate parity match. |
| `docs/tranches/AX/audit/W50-uniform-dropdown-type-scale.json` | **NEW** — the born-RED→GREEN audit artefact + the paired-π font-size-parity readback. |

**OUT of bounds:** the metric-pill / metric-badge / metric-cell / metric-stack token family + the
configurator density cascade (**W21** — the metric/configurator reconcile, distinct token cohort —
see Dedup); the Card / overlay / GlassPanel surfaces + `animations.css` top-layer backdrop
(**W20** — primitive-fix card/overlay, no picker surface); the library-wide `--ui-scale`
comfortable-sizing axis + the CVA height/glyph bases (**W51** — the global umbrella this wave
forward-reconciles to but does NOT pre-build); the `Input`/`Textarea` standalone form atoms (NOT
picker-family — they ship via `/forms`, a separate scale concern, not in this gate's scope unless a
later wave folds them); the dock control type-scale + `--dock-scale` (**W45** — the dock-local scale
specialization).

---

## Disjointness (sibling waves it must NOT overlap)

W50 is a Band-G primitive-polish wave touching ONLY the picker-family SFCs + their two new tokens. Its
collision surface is the dropdown family dir + two token-cohort additions:

- **vs W20 (primitive fix — native-top-layer + card toggles + GlassPanel retire).** W20 edits
  `animations.css` (the `.glass-top-layer::backdrop` scrim), the `demo/stories/primitives/card.vue`
  Card-toggle story, and the GlassPanel retire (`glass-panel/` + its subpath/api/package.json). **NONE
  of those are picker-family surfaces.** W50 touches NO Card / overlay / GlassPanel file. File-disjoint;
  both touch `package.json` (proof-gate registration — coordinate the disjoint script-entry hunks) but
  no source overlap.

- **vs W21 (primitive recategorize — barrel coherence + metric-pill reconcile + Drawer spring prop).**
  W21 owns `src/index.ts` (the configurator barrel-coherence), the metric-pill/metric-cell/metric-stack
  reconcile (`MIGRATION.md`, `src/subpaths/metric-*.ts`, `tokens.css` §17 `--metric-row-*`), and the
  Drawer spring prop. **The metric token family (`--metric-row-*`, §17) is a DISJOINT token cohort from
  the picker `--dropdown-text` family.** Both touch `tokens.css` — W21 the §17 metric rows, W50 a NEW
  dropdown-scale §-block — coordinate the disjoint `tokens.css` hunks (different sections, no semantic
  overlap). W21 touches NO Select/DropdownMenu/Combobox/ContextMenu/Command SFC; the metric-pill/-badge
  surfaces it reconciles are NOT picker surfaces. File-disjoint on the SFC tree.

- **vs W51 (library-wide `--ui-scale` comfortable sizing).** W51 mints the GLOBAL `--ui-scale` axis +
  threads it through the CVA height/font/glyph bases + the typography ladder; the convergence plan
  sequences **W51 BEFORE W45/W50 so they specialize the global axis**. If W51 lands first, W50's
  `--dropdown-text` re-anchors onto `--ui-scale` (a one-line derivation change); if W50 lands first
  (this doc's standalone form), W51 re-points the dropdown token in its own pass. Either order is a
  clean re-anchor (the token's default-on-the-ladder makes the specialization trivial). NO file
  collision: W51 owns the CVA size bases + the typography ladder rungs; W50 owns the picker font-size
  literals + the family token. Coordinate the `tokens.css`/`theme.css` token-addition hunks (disjoint
  blocks).

- **vs W45 (dock region-model + `--dock-scale`).** W45 mints a dock-LOCAL `--dock-scale` coarse-pointer
  multiplier for the dock controls. W50's `--dropdown-text` is the PICKER family, NOT the dock controls
  — file-disjoint (W45: `dock.css`/`GlassDock.vue`/`DockSeparator`; W50: the `ui/` picker SFCs). Both
  are scale specializations that W51 reconciles onto `--ui-scale`, but they own disjoint surfaces.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

- **Implement (≤1 agent — one cohesive token-mint + family re-point fold).** Mints the
  `--dropdown-text` / `--dropdown-text-secondary` / `--dropdown-input-height` tokens (tokens.css +
  theme.css bridge + the §-comment scale-contract), re-points the `menuItemVariants` base + the ~14
  non-item family surfaces onto the token pair, unifies the two filter-input heights, and resolves the
  section-label rung per the RATIFY. Lint + typecheck at every interval.
- **Adversarially-verify (≤1 read-only lane).** Re-greps the family dirs at wave-open to confirm the
  EXACT literal set (≥ 14 `text-sm`/`text-xs` hits, 0 token reads) before trusting any count; confirms
  ZERO raw `text-sm`/`text-xs` survivors in the family after the wave; confirms a `:root {
  --dropdown-text: var(--type-body); }` override re-resolves EVERY family surface's `getComputedStyle
  font-size` on a live mount (the token-first seam is live, not dead); confirms the two filter inputs
  read the same `height` + `font-size`. ADVERSARIAL twist: tries to make `proof:dropdown-type-scale`
  PASS with a single surviving raw `text-sm` literal (confirms the gate REDs); tries to mint the token
  but leave a literal aliased (confirms the no-legacy assertion catches the dual authority). Drives the
  VISUAL-TRUTH live audit (the binding close — see HardGate).
- **Gate-author (≤1 agent — born-RED→GREEN).** Authors `proof-dropdown-type-scale.mjs` (the device-free
  source arm: no raw `text-sm`/`text-xs` in the family dirs + every surface reads the token + the token
  resolves on the cascade) and confirms it FAILS at HEAD (the literals present) + PASSES on the patched
  tree; wires the fail-CLOSED π live arm (the `getComputedStyle font-size` parity readback across the
  family); registers `proof:dropdown-type-scale` in `package.json` + the W00 meta-gate parity.

(All within the AX ≤6-implementation / ≤7-read-only ceiling — this wave's actual count is 3.)

**Autonomous-resilience clause + triumvirate auto-triggers (per WAVE_SPEC §3a; AX REQUIREMENTS §22.4b
— mandatory):** the wave-agnostic authorization grant is AX.md §6.1 (work AROUND a roadblock with an
idiomatic gestalt fix, never stall; §6.2 is the halt-vs-work-around decision tree) — by reference, not
restated. This wave's §3a auto-triggers:

- **Scope-reveal → halt + triumvirate (Class 2; NEVER absorb in-line):** any need to touch the
  OUT-of-bounds surfaces — the metric/configurator token cohort (**W21**), the Card/overlay/GlassPanel
  surfaces (**W20**), the library-wide `--ui-scale` CVA-base/typography-ladder plumbing (**W51** — do
  NOT pre-build `--ui-scale` here; leave the dropdown token on the ladder rung for W51 to re-anchor),
  the dock `--dock-scale` (**W45**), or the `/forms` Input/Textarea atoms.
- **Non-local hard-gate failure → triumvirate (Class 2):** if `proof:dropdown-type-scale` REDs
  non-locally — a family surface that reads no token, a surviving raw literal, or the π font-size
  parity readback diverging across the family — escalate the gate design, do NOT make the gate pass
  over a residual literal.
- **§Open-Questions RATIFY reached un-ratified → HALT-and-ratify (Class 3):** the section-label rung
  (primary `--dropdown-text` vs secondary `--dropdown-text-secondary` — the witness-2 contradiction
  resolution) and the MultiSelect-badge disposition (Badge-family scale vs picker scale) are
  ratify-before-impl decisions; if reached un-ratified, take the recorded default (section-labels →
  secondary; badge → leave on Badge) and surface to the orchestrator, do NOT self-ratify a scale
  collapse that a live audit might read as wrong.
- **3rd diagnostic-loop iteration → triumvirate (Class 2):** if the family does NOT read as ONE uniform
  scale after three retunes (a surface reads visibly off-scale on the token), dispatch
  research→plan→redress rather than ad-hoc per-surface size tweaks.

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / runtime gates — born-RED→GREEN.** ONE new gate with a device-free SOURCE arm + a
fail-CLOSED π live arm:

- **`proof:dropdown-type-scale` — device-free SOURCE arm (born-RED).** A source-parse over the picker
  family dirs (`select/`, `dropdown-menu/`, `combobox/`, `context-menu/`, `command/`, `multi-select/`,
  `_shared/menuItemVariants.ts`): assert (a) **NO raw `text-sm`/`text-xs` literal survives** in any
  family SFC or the CVA base (the deletion-proof — the shadcn leak excised); (b) **every family
  type-bearing surface reads `--dropdown-text` or `--dropdown-text-secondary`** (the item base, every
  trigger, every label/heading, every input, every shortcut, every empty — the allow-list mirrors the
  §-comment scale-contract); (c) **the token resolves on the cascade** — `--dropdown-text` is defined
  in `tokens.css` (anchored on `--type-small`) and bridged in `theme.css` (the override-resolves
  chain, the §shadow-contract-style CHAIN-INTACT assertion); (d) **the two filter inputs read the
  shared `--dropdown-input-height`** (no surviving `h-10`/`h-11` literal on Combobox/Command input).
  **Born-RED at HEAD** (≥ 14 raw literals present, 0 token reads, no token defined). This is a
  **source-structure + deletion-proof** gate (the precept-valid artefact form per SPEC.md §Hard Gates
  — the SFC class strings + the token-cascade resolution are the artefact, NOT "grep found a string for
  runtime behaviour"; the runtime PAINT is proven by the π arm below).

- **`proof:dropdown-type-scale` — fail-CLOSED π live arm (born-RED; the cardinal-lesson close).** A
  π-lane `getComputedStyle` font-size PARITY readback on a live mount of the whole family (a story that
  renders a `<Select>`, `<DropdownMenu>`, `<Combobox>`, `<ContextMenu>`, `<Command>` open at once):
  (a) **item-row parity** — every item row's computed `font-size` is IDENTICAL across all five families
  (one number, not five); (b) **trigger/input parity** — the SelectTrigger + the two filter inputs read
  the same primary scale; (c) **the override seam is LIVE** — flip `:root { --dropdown-text:
  var(--type-body); }` and assert EVERY family item's computed font-size moves in lockstep (the dead-token
  witness-4 inverted: the override now re-resolves the whole family); (d) **input-height parity** — the
  Combobox + Command filter inputs read the same computed `height`. **Fail-CLOSED:** if the π lane
  cannot stand up the live mount or the readback is absent, the gate FAILS (it does NOT pass on a
  missing render — the AW headless-green-over-unvalidated-render risk is closed by the gate failing
  when the device truth is absent). **Born-RED at HEAD** (the item font-sizes are coincidentally equal
  today since all items share the `menuItemVariants` `text-sm` base, but the trigger/label/heading/input
  surfaces diverge, the override is dead, and the input heights differ — the parity readback measures
  the divergence + the dead override).

These two arms are the device-free SOURCE proof (the class-string + token-cascade structure) + the
fail-CLOSED π live arm (the painted-pixel font-size parity) — the wave does NOT close on the source arm
alone.

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion).** A live Playwright
+ frontend-design pass rendering the picker family open side-by-side, at ≥ 2 viewports in light AND
dark:

- **The whole family reads as ONE uniform type-scale** — a Select item, a DropdownMenu item, a Combobox
  item, a Command item, and a ContextMenu item all paint at the same visual size; the triggers + filter
  inputs share the primary scale; the section labels + group-headings + shortcuts share the quieter
  secondary scale. Side-by-side BEFORE (the `text-sm`/`text-xs` lottery — labels at `text-sm` in
  Select/DropdownMenu but headings at `text-xs` in Combobox/Command; inputs at two heights) / AFTER
  (one governed primary/secondary scale; one input height).
- **The single-override seam works on a real mount** — set `:root { --dropdown-text: var(--type-body); }`
  in the demo and confirm the WHOLE family scales up in lockstep with zero call-site edit (the
  token-first deliverable the user asked for — "fix the inconsistent scaling" is now a one-line write).
- **No regression on the four-state contract / affordance / spacing / NO visual occlusion** per the AX
  cardinal gate — the hover/focus/data-highlighted accent + the indicator gutters + the active-scale
  are unchanged (the token swap touches ONLY font-size + the two input heights, not the interaction
  surface).

**The wave does NOT close on the headless gates alone** — the executed live audit (captured as a
paired-π BEFORE/AFTER + DELTA artefact under `docs/tranches/AX/audit/`, per the W00 protocol) is the
binding close criterion. The single-override-scales-the-family demo is the load-bearing visual proof.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** Re-grep the family dirs against HEAD: confirm the
   EXACT raw-literal set (≥ 14 `text-sm`/`text-xs` hits across ≥ 11 files), confirm 0 `--dropdown-text`
   reads, confirm the two input heights (`h-10` vs `h-11`), confirm the section-label scale
   contradiction (`text-sm` labels vs `text-xs` headings). Capture the BEFORE π font-size readback
   (the per-family divergence + the dead override) in `audit/W50-uniform-dropdown-type-scale.json` as
   the born-RED baseline. Do NOT proceed on the convergence-plan word — re-prove.
2. **Author the born-RED gate.** Author `proof-dropdown-type-scale.mjs` (the device-free source arm +
   the fail-CLOSED π live arm); register `proof:dropdown-type-scale` in `package.json` + the W00
   meta-gate; confirm it FAILS at HEAD.
3. **Mint the token pair.** Add `--dropdown-text` / `--dropdown-text-secondary` /
   `--dropdown-input-height` to `tokens.css` (anchored on `--type-small`/`--type-caption`) + the
   `theme.css` `@theme inline` bridge + the §-comment scale-contract. Lint.
4. **Route the shared item base.** `menuItemVariants.ts:33` `text-sm` → the token; confirm all 13 item
   SFCs inherit (typecheck the CVA). Lint + typecheck.
5. **Route the non-item surfaces + resolve the section-label rung.** Re-point every trigger / label /
   heading / input / shortcut / empty onto the token pair per the FileBounds; resolve the section-label
   rung per the RATIFY (recommend → secondary). Lint + typecheck.
6. **Unify the filter-input heights.** `ComboboxInput`/`CommandInput` `h-10`/`h-11` →
   `h-[var(--dropdown-input-height)]`. Lint.
7. **Gate GREEN + VISUAL-TRUTH.** Confirm `proof:dropdown-type-scale` passes (both arms); run the
   VISUAL-TRUTH live π audit of the family open side-by-side + the single-override-scales-the-family
   demo; capture the paired-π BEFORE/AFTER + DELTA; write `audit/W50-uniform-dropdown-type-scale.json`
   to GREEN.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W50-uniform-dropdown-type-scale.json` — the born-RED→GREEN ledger: the four
  RED witnesses (the no-token literal scatter, the within-family scale contradiction, the input
  height/font mismatch, the dead override), the per-surface re-point disposition, the section-label /
  MultiSelect-badge RATIFY records, and the post-wave GREEN structure + π font-size-parity readback.
- `scripts/proof-dropdown-type-scale.mjs` — the NEW gate (the device-free source arm + the fail-CLOSED
  π live font-size-parity arm).
- The paired-π **BEFORE/AFTER + DELTA** capture (the W00 protocol): the family-open side-by-side at the
  `text-sm`/`text-xs` lottery BEFORE vs the one-governed-scale AFTER, the two-input-height-mismatch
  BEFORE vs one-register AFTER, and the single-`:root`-override-scales-the-whole-family demo, at ≥ 2
  viewports × light/dark.
- A forward-reconcile NOTE (folded into the W51 coordination ledger, NOT executed here): the
  `--dropdown-text` → `--ui-scale` re-anchor (W50's family token becomes a specialization of W51's
  global axis — one scale system, not three).

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(ui): proof:dropdown-type-scale born-RED — no raw text-sm/text-xs in the picker family, every surface reads --dropdown-text (AX.W50)`
2. `feat(tokens): mint --dropdown-text / --dropdown-text-secondary / --dropdown-input-height — the picker-family type-scale, ladder-anchored (AX.W50)`
3. `refactor(ui): route menuItemVariants + every picker trigger/label/heading/input/shortcut/empty onto the --dropdown-text token pair — excise the shadcn text-sm/text-xs literal leak (AX.W50)`
4. `fix(ui): unify Combobox/Command filter-input height register onto --dropdown-input-height (AX.W50)`
5. `chore(AX.W50): audit ledger GREEN + paired-π BEFORE/AFTER + DELTA + W51 --ui-scale reconcile note`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/
stash per the hardened agent git clause. These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W00 (π visual-runtime lane) — the close machinery.** The `proof:dropdown-type-scale` π arm + the
  single-override-scales-the-family VISUAL-TRUTH audit ride the W00 fail-CLOSED lane. W50 cannot close
  on the source arm alone; W00 stands up the live lane it closes on.
- **Sequencing vs W51 (recommended W51-BEFORE per the convergence plan).** The convergence plan
  sequences W51 (the global `--ui-scale`) BEFORE W45/W50 so they specialize the global axis. If W51
  lands first, W50's `--dropdown-text` re-anchors onto `--ui-scale` at mint time (a one-line
  derivation); if W50 lands first (this doc's standalone form), W51 re-points the dropdown token in its
  own pass. Either order is a clean re-anchor — the token's default-on-the-ladder makes the
  specialization trivial; no hard blocker.

---

## Open questions / RATIFY-BEFORE-IMPL

1. **The section-label rung — RATIFY-BEFORE-IMPL.** The Select/DropdownMenu/ContextMenu `*Label`
   surfaces are `text-sm` at HEAD; the Combobox/Command group-headings are `text-xs` — the SAME
   conceptual "section label" role at two scales (witness 2). RATIFY ONE rung for the role.
   Recommendation: collapse the labels DOWN to `--dropdown-text-secondary` (a section label is a
   quieter-than-item caption, matching the combobox/command heading). Confirm at the VISUAL-TRUTH audit
   the labels do not read TOO quiet on the secondary rung — if a Select label needs the primary scale
   to read as a header, that is the genuine "the role wants two rungs" finding (then SelectLabel →
   primary, group-heading → secondary, governed by the role not the per-file literal).
2. **The MultiSelect selected-badge — RATIFY.** `MultiSelect.vue:139` is a `<Badge variant="secondary">`
   chip, conceptually a Badge-family surface not a picker menu surface. RATIFY whether its `text-xs`
   reads on the Badge token-family scale (leave it — the gate scopes the picker SURFACES, not the chip)
   or on `--dropdown-text-secondary` (fold it into the family). Recommendation: LEAVE on the Badge
   family — the badge is a chip, the picker-scale token is for the menu surfaces; the gate's family-dir
   scope excludes the badge.
3. **`--dropdown-input-height` default register — RATIFY.** Combobox is `h-10` (2.5rem), Command is
   `h-11` (2.75rem). RATIFY the unified default. Recommendation: `2.5rem` (the `h-10` register — the
   more common picker-input height; the Command `h-11` was the outlier). Confirm at the live audit the
   Command filter input does not read cramped at the smaller register.
4. **W51 reconcile timing — RATIFY (the §Dependencies hinge).** RATIFY whether W50 mints `--dropdown-text`
   STANDALONE (ladder-anchored, this doc's form) with W51 re-pointing it later, OR W50 waits for W51's
   `--ui-scale` to land and mints the dropdown token as a specialization from the start. Recommendation:
   land W50 standalone (the family uniformity + override seam are independently valuable + the user's
   immediate ask); the W51 re-anchor is a trivial one-line follow-up (recorded in the reconcile note).
