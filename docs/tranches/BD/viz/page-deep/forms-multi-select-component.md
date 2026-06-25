# Pass-E deep audit — forms/multi-select COMPONENT

**Page:** `forms/multi-select` · import label `/forms/multi-select` (a RAW route string — see I0; NOT a real `@mkbabb/glass-ui/*` subpath).
**Demoed src:** `src/components/ui/multi-select/MultiSelect.vue` — a single hand-rolled COMPOSITE (157 lines) of `Popover`+`Command`+`Button`+`Badge`+`@lucide/vue` `Check`/`ChevronDown`/`X`. NOT a reka forward; NOT a thin wrapper — it re-assembles four shipped families into a bespoke control.
**Shared substrate read:** `popover/` + `command/` (the `.glass-reveal` list + `.glass-menu-row` item register), `button/index.ts` (`variant="outline"` trigger, `ghost`/`sm` X-button), `badge/index.ts` (`variant="secondary"`, `size` rung).

All citations read at HEAD on `tranche/BB` (BD execution base).

---

## 0 · The shape — why this component is the band's outlier

Every other forms-band control (Input/Textarea/Select/Combobox/NumberField/Slider) is a thin reka forward that reads the unified `.control-surface`/`.input-pill` REST register and ships via a real subpath. MultiSelect is the ONE control that hand-rolls its entire surface out of OTHER components: the trigger is a `<Button variant="outline">`, the list is a `<Command>` inside a `<Popover>`, the chips are `<Badge variant="secondary">`. This is a composite-of-primitives, not a control on the shared seam — so it inherits NONE of the band's material/focus/touch canon by construction. That single fact drives most findings below.

---

## 1 · ANIMATION — affordance, four-state, spring/entrance-exit

**The LIST entrance is correct (inherited).** The `<PopoverContent>` composes `.glass-reveal` (BB.W-LIQUID-REVEAL — the spring-clocked coupled bloom from the trigger anchor, PRM-carved). Wired for free through the Popover. ✓
**The ITEM hover is correct (inherited).** `<CommandItem>` rides `menuItemVariants` default `surface:"glass"` → `.glass-menu-row` (element-level glass-quiet oklab tint on hover/highlight, the `--menu-row-lift` on `--spring-smooth`, 44px floor). ✓

**FINDING A1 (the TRIGGER four-state is `variant="outline"` — a shadcn-neutral box, NO glass focus glide).** `MultiSelect.vue:88` paints the trigger as `<Button variant="outline">`. `outline` is on the BC.W-DESHADCN HEAD-residual list (`button/index.ts` outline = `border-input` shadcn-neutral) — it is NOT the `.control-surface`/`.input-pill` four-state focus register the rest of the band reads. So the surface the user CLICKS to open has no glass-tint-on-focus, no `--invalid-ring`, no border glide — it reads as a generic shadcn outline button, NOT a forms control. The peer Select/Input/Combobox triggers all read the unified seam; MultiSelect alone does not. → **AUGMENT BD.W-CONTROL-SMOOTH** (route the trigger off `variant="outline"` onto `.control-surface` / a `SelectTrigger`-class material — see I2 for the architectural transposition that subsumes this).

**FINDING A2 (the SELECTED-CHIPS block has ZERO entrance/exit animation — dead).** `:134` the selected badges render in a `v-for` with NO `<TransitionGroup>`, no stagger, no `vReveal`. A chip APPEARS instantly on select and VANISHES instantly on remove (the `X` click hard-removes the array entry). Against motion-canon P2/P3 (enter-bouncy + fade-coupled-to-transform) the most dynamic surface of the control — tags adding/removing — is the one with no affordance. The IconChip `:reveal` spring-pop (BC.W-SUFFUSE3) or a `<TransitionGroup>` on `--spring-snappy` is the idiomatic fill. → **AUGMENT** (a new BD chip-entrance arm, or fold into the I2 rebuild).

**FINDING A3 (the X remove-button hover is a flat color snap, off-register).** `:152` the chip's remove `<Button>` uses `hover:bg-destructive hover:text-destructive-foreground` — a raw Tailwind color toggle on the default `--ease-standard`, fine for color but it is the BC.W-FEEDBACK-TONE `bg-<tone>` OPAQUE-slab class the cohesion gate forbids on a glass surface (a full-saturation destructive plate, not the `.feedback-tone` colored-glass register). → **MODIFY** (route the destructive hover through the tinted-glass tone register, not a raw opaque `bg-destructive`).

---

## 2 · PROCEDURAL VIZ

**N/A.** MultiSelect carries no aurora/blob/fourier/GPU viz. The GPU-only/Safari viz bar does not apply. The COLORFUL-aurora-backdrop ask is a DEMO-PAGE concern (the field floats over the `<StoryPage>` substrate), not a component concern — correctly out of component scope.

---

## 3 · PERFORMANCE

**Compositor-only — PASS (inherited).** `.glass-reveal`/`.glass-menu-row` animate transform/opacity/filter only; no `@keyframes` touches the reflow set. No rAF loop (event-driven), so no offscreen-pause owed. ✓

**FINDING P1 (the selected-chips `flex-wrap` block reflows the whole page on every tag change — layout-thrash class).** `:134` the chips live in `<div class="flex flex-wrap gap-1 mt-2">` BELOW the popover, growing the control's block height as tags are added (`mt-2` + wrap). Adding/removing a tag changes the in-flow document height — a genuine reflow + the absence of any reserve means the page below jumps (the CLS class the BB.W-DESKTOP-RESERVE / W-CARD-COMPOSITE discipline kills elsewhere). Not a per-frame storm (it is a discrete user action), but it is an un-reserved layout shift with no transition. Compounds A2 (the instant pop makes the jump abrupt). → **AUGMENT** (a reserved chip-row min-block + a `<TransitionGroup>` so the height change is a settled morph, not a snap; the I2 rebuild subsumes it — a TagsInput-style inline-chip well has the chips INSIDE the well, not a separate reflowing block).

---

## 4 · SAFARI COMPATIBILITY

**PASS.** Every feature is Safari-supported: `color-mix(in oklab,…)` (16.2+) via the inherited glass registers, `:has()` (15.4+), the Popover/Command reka portal + collision. No `scroll()`/`view()` timeline, no WebGL/WebGPU, no `@property`-only path the component itself authors. The `truncate`/`flex-wrap`/`text-[length:…]` brackets are portable. ✓

---

## 5 · IDIOMATIC / NO-LEGACY

**FINDING I0 (the import label is a RAW ROUTE STRING — the component is NOT published anywhere).** `manifest.ts:239` maps `forms/multi-select → "/forms/multi-select"` (a slash-route literal), and the demo imports it via the deep relative path `../../../src/components/ui/multi-select`. Grep confirms `MultiSelect` is exported from NEITHER the root barrel (`src/index.ts`), NOR `/api`, NOR any `src/subpaths/*.ts`, NOR `package.json` exports. It is a library component with NO consumer-reachable import path — the only `ui/` form control in this state. The user's "standardize the import-path label" ask is LOAD-BEARING here: the label cannot be standardized to `@mkbabb/glass-ui/multi-select` until the subpath is actually MINTED (a barrel + a `src/subpaths/multi-select.ts` + the `exports` entry). This is the cardinal idiomatic gap. → **AUGMENT BD.W-DESHADCN-CANON / a new BD subpath-mint arm** (publish the subpath, fix the manifest label to the real `@mkbabb/glass-ui/multi-select`).

**FINDING I1 (the composite duplicates Combobox/Command — a parallel-path, not the canonical multi-select).** The library ALREADY ships the canonical multi-select primitive: `<ToggleGroup type="multiple">` (the N-pressed register, CLAUDE.md §Tabs-vs-ToggleGroup) for chip-strips, and the `Command`/`Combobox` family for searchable pickers. MultiSelect re-assembles Popover+Command+Button+Badge into a THIRD shape that none of those own — the exact "no dual-path / no parallel recipe" class the SOTA discipline forbids. The idiomatic transposition is a TagsInput-style searchable multi-select built ON the `Combobox` substrate (the band's published searchable picker) with chips rendered IN the well, OR a `<Command>` with multi-select item state — not a bespoke Popover+Badge composite. → **MODIFY / architectural transposition** (the gestalt rebuild; see I2).

**FINDING I2 (the architectural transposition — fold onto the Combobox/TagsInput seam).** The elegant shape: the trigger becomes a `.control-surface` WELL (the unified REST register, A1's fix) that displays selected chips INLINE (subsuming A2/A3/P1 — chips live in the well, animate on `--spring-snappy`, the X rides the tone-glass register), the dropdown stays the inherited `.glass-reveal` `<Command>` list with the `Check` indicator (already correct), and the whole thing ships as a real `@mkbabb/glass-ui/multi-select` subpath (I0's fix). This is one transposition that closes A1+A2+A3+P1+I0+I1 — the component reads as a forms control on the shared seam instead of a four-component composite. → **MODIFY BD.W-CONTROL-SMOOTH scope** (widen to enroll MultiSelect's trigger-well rebuild) **+ a subpath-mint arm**.

**FINDING I3 (raw off-register literals).** `:139` `text-[length:var(--control-text-sm)]` (a fully-arbitrary bracket — the BA.W-EMISSION dead-bracket class; Badge ALREADY ships a `size="sm"` rung that resolves this token, so the chip should pass `size="sm"` not a raw bracket). `:93` `text-left font-normal` overrides the Button's own type register inline. `:96`/`:152`/`:155` hardcoded `h-4 w-4`/`h-3 w-3`/`h-2 w-2` icon sizes off the glyph-token register. All minor, all the component-over-class divergence. → **FOLD onto BD.W-MISSED-SLAB-CENSUS / BD.W-PAGE-OFFTOKEN-SWEEP**.

**FINDING I4 (the trigger displays a comma-joined STRING, not the selected material).** `:53-63` `displayText` builds `"Fourier, Chebyshev... (+2)"` as a plain truncated string in the trigger. The selected items are ALSO rendered as badges below (`:134`) — so selection is shown TWICE in two materials (a string in the trigger + chips in a separate block). The idiomatic single-source is chips-in-the-well (I2); the dual display is the duplicated-surface smell. → subsumed by **I2**.

---

## 6 · THE GLASS SIX-LAYER COMPOSITE

- **LIST (`PopoverContent`):** `glass-floating` via the Popover → backdrop blur+saturate · surface tint · edge rim · inner catch-light · drop shadow · grain. SIX-LAYER PRESENT (inherited). ✓
- **ITEM (`CommandItem`):** `.glass-menu-row` materializes the quiet glass-tint on hover. Layer-faithful on the active state. ✓
- **TRIGGER (`Button variant="outline"`):** **MISSING** — a `border-input` shadcn-neutral outline box, ZERO of the six layers (the BD.W-DESHADCN forbidden residual on the control's most-touched surface). A1/I2 fix.
- **CHIPS (`Badge variant="secondary"`):** flat `bg-secondary` opaque plate — NOT the glass-well or `.glass-accent` chromatic-rim register; no catch-light, no rim glint. The chips read as flat shadcn pills, not glass-ui material. A2/I2 fix.

---

## Map to BD tranche

| Finding | Disposition | Wave |
|---|---|---|
| I0 import label is a raw route string; component unpublished (no subpath/barrel/api) | AUGMENT (mint the subpath) | BD.W-DESHADCN-CANON + a new subpath-mint arm; fix `manifest.ts` label to `@mkbabb/glass-ui/multi-select` |
| A1 trigger is `variant="outline"` shadcn-neutral, no glass focus glide / six-layer | AUGMENT | BD.W-CONTROL-SMOOTH (trigger reads `.control-surface`) |
| A2 selected-chips have no entrance/exit animation (dead) | AUGMENT | BD.W-CONTROL-SMOOTH (chip `<TransitionGroup>` on `--spring-snappy`) |
| A3 X-button `hover:bg-destructive` opaque slab off the tone-glass register | MODIFY | route through `.feedback-tone` tinted-glass |
| P1 selected-chips `flex-wrap` block reflows page on tag change (un-reserved CLS) | AUGMENT | subsumed by I2 (chips-in-well) |
| I1/I2/I4 composite duplicates Combobox/ToggleGroup; transpose onto the Combobox/TagsInput well seam | MODIFY (gestalt rebuild) | BD.W-CONTROL-SMOOTH scope widen — chips-in-well over `.control-surface`, single-source selection |
| I3 raw `text-[length:…]`/`text-left`/`h-N w-N` off-token literals | FOLD | BD.W-MISSED-SLAB-CENSUS / BD.W-PAGE-OFFTOKEN-SWEEP |
| chips `Badge variant="secondary"` flat slab, not glass material | MODIFY | subsumed by I2 |

**No PRUNE.** There is no dead code per se — but I1/I2 is the heaviest finding in the forms band: MultiSelect is a parallel-path composite that re-implements selection out of four components instead of reading the canonical Combobox/ToggleGroup seam, AND it ships via no import path at all. The single architectural transposition (chips-in-a-`.control-surface`-well over the inherited `.glass-reveal` Command list, published as a real subpath) closes A1+A2+A3+P1+I0+I1+I4 at once. The user's page-design asks (own glassy cards, bigger main area, dock contextual-switching, aurora backdrops, tighten copy) are DEMO-PAGE waves already covered by BD.W-FORMS-CARD-FOLD (the `:97` grouped-section → `<ShowcaseFrame>`) + BD.W-PAGE-HEADER-FOLD; the "standardize the import-path label" ask is the component-level I0 above (it cannot be a pure demo fix — the subpath must be minted first).
