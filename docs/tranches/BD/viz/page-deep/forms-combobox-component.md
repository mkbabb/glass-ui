# Pass-E deep audit — forms/combobox COMPONENT

**Page:** `forms/combobox` · import label `@mkbabb/glass-ui/forms`
**Demoed src:** `src/components/ui/combobox/` (11 SFCs: Combobox/Anchor/Trigger/Input/List/Item/ItemIndicator/Empty/Group/Viewport/Separator) over the reka-ui `Combobox*` headless substrate.
**Shared substrate read:** `_shared/menuItemVariants.ts` (the CVA), `styles/menu.css` (`.glass-menu-row` / `.glass-menu-section`), `styles/glass/reveal.css` (`.glass-reveal`), `styles/glass/control-surfaces.css` (`.input-pill`/`.control-surface` REST register).

All citations read at HEAD on `tranche/BB` (BD execution base).

---

## 1 · ANIMATION — affordance, four-state, spring/entrance-exit

**The LIST entrance is correct + idiomatic.** `ComboboxList.vue:24` composes `glass-reveal` — the BB.W-LIQUID-REVEAL spring-clocked coupled bloom (scale on `--spring-snappy` + own settle clock, opacity/`filter` blur-settle on `--ease-out`, `transform-origin` at `--reka-combobox-content-transform-origin`, PRM-carved to fade-only). This is the iOS-27 bloom-from-anchor; it is the everywhere floor and is wired here. ✓

**The ITEM hover register is correct.** `ComboboxItem.vue:22` → `menuItemVariants({ indicator: 'none' })` defaults `surface: "glass"` → `.glass-menu-row`: the element-level glass-quiet oklab tint on `:hover`/`:focus`/`[data-highlighted]`, the PRM-gated `translateY(--menu-row-lift)` lift on `--spring-smooth`, the 44px touch floor, the `:active { scale(0.98) }` from `.interactive-item`. All four input modes (pointer/keyboard/reka-highlight/open) reach the same plate. Four-state contract MET on the item. ✓

**FINDING A1 (dead/missing animation — the INPUT is flat).** `ComboboxInput.vue` is the only interactive surface with NO animation affordance: the search-input row (`:34`) is a static `border-b` box; on `:focus` it gains NOTHING (no border-color glide, no glass-tint, no focus ring — the `.glass-reveal`/`.glass-menu-row` registers stop at the list and items). The destructive ring (`:has([aria-invalid])`) is the only state transition the row owns, and that is an error state, not a focus affordance. Against the motion-canon (HIGH animation affordance for EVERY component) the type-ahead input — the surface the user actually touches — is dead. → **AUGMENT BD.W-CONTROL-SMOOTH** (the BC control-smooth register already owns the `.input-pill`/`.control-surface` four-state focus glide; the ComboboxInput must read it, not stay `bg-transparent border-b`).

**FINDING A2 (no surface-six-layer on the input).** Tied to A1 — see §6.

---

## 2 · PROCEDURAL VIZ

**N/A — combobox carries no aurora/blob/fourier/GPU viz.** No PROCEDURAL-SUITE member is in this component; the GPU-only/Safari viz bar does not apply. The COLORFUL-aurora-backdrop ask is a DEMO-PAGE concern (the field floats over the page substrate via `<StoryPage>` background routing), not a component concern — correctly out of the component's scope.

---

## 3 · PERFORMANCE

**Compositor-only — PASS.** `.glass-reveal` animates `scale`/`translate`/`opacity`/`filter` only (longhands, no layout property, no stacking-context mint). `.glass-menu-row` animates `translate` + `background` cross-fade. No `@keyframes` touches the reflow set. ✓

**No offscreen-pause needed** — combobox is event-driven (no rAF loop); the only animation is transition-on-state. No frame loop to park. ✓

**FINDING P1 (raw-bracket sizing — off-token, latent content-scan fragility).** `ComboboxViewport.vue:24` carries `max-h-[300px]` (a fully-arbitrary bracket utility). Per BA.W-EMISSION the structural arbitrary brackets (`max-height`) are exactly the class that is NOT reliably reachable by a consumer's content-scan AND is rejected by the P9 `classish` filter — they must be PRE-COMPILED scoped CSS keyed off a `data-slot`, the way `select.css` ships the SelectContent `max-height: min(24rem, 60dvh)` rule. The combobox viewport's `max-h-[300px]` is the dead-bracket class the gate forbids; it also hardcodes 300px instead of the `min(…, 60dvh)` collision-bound the picker family standardized. → **AUGMENT BD.W-MISSED-SLAB-CENSUS** (or a thin scoped-CSS fold beside `select.css`): move the bound to `[data-slot="combobox-viewport"]` scoped CSS at the `min(24rem, 60dvh)` register.

---

## 4 · SAFARI COMPATIBILITY

**PASS — every feature the component uses is Safari-supported.** `color-mix(in oklab, …)` (Safari 16.2+), `:has()` (15.4+), `@property` for the reveal/spring tokens (16.4+), `transition-behavior: allow-discrete` + `@starting-style`-free data-state reveal (Safari 17.4+ for `allow-discrete`; the reka data-state form degrades to an instant swap pre-17.4, never broken). No `scroll()`/`view()` timeline in the component (those are demo-page-only). No WebGL/WebGPU. The `.glass-reveal` PRM carve + the menu-row touch floor are media-query-gated, fully portable. ✓

---

## 5 · IDIOMATIC / NO-LEGACY

**FINDING I1 (the GROUP heading is NOT the eyebrow register — non-idiomatic).** `ComboboxGroup.vue:18` paints the group heading as `px-2 py-1.5 text-dropdown-secondary font-medium text-muted-foreground` — a flat label, NOT the `.glass-menu-section` / `.glass-menu-section-label` mono small-caps caption register that BA.W-MENU-GLASS minted as the canonical section caption for the picker family (the recipe the DropdownMenuLabel composes). The combobox group label is the one picker-family section caption that bypasses the shared register — a divergence, not a keep. → **FOLD onto BD.W-TOC-MENU-GLASS** (which already touches the menu-glass section register) OR **AUGMENT BD.W-BC-COMPONENT-CANON**: route ComboboxGroup's heading through `.glass-menu-section-label`.

**FINDING I2 (the demo TRIGGER hand-rolls glass — demo-page, not component, but the component offers no trigger material).** `combobox.vue:73` hand-rolls the trigger as `glass-wash focus-ring rounded-full px-3` raw on a bare `<button>`. The component ships NO styled `ComboboxTrigger` material (it forwards reka's bare primitive), so every consumer re-hand-rolls the trigger paint — the de-shadcn material-first principle (BD.W-DESHADCN-CANON: glass-ui = 100% of the material) is unmet for the trigger surface. → **AUGMENT BD.W-DESHADCN-CANON scope / BD.W-CONTROL-SMOOTH**: the component should own a default trigger material (`.control-surface` REST register) so the demo passes `as-child` to a styled trigger, not a raw `glass-wash` paste.

**No dead code / dual-path in the 11 SFCs.** Each is a thin reka forward (`useForwardPropsEmits` + `reactiveOmit('class')` + `cn()`); no legacy alias, no workaround, no fork. The `data-slot` vocabulary is consistent. ✓ (One nit: `ComboboxInput.vue:33` carries `data-slot="command-input-wrapper"`/`command-input` — COPIED from the Command family, mislabeled for the combobox slot namespace. Cosmetic; FOLD onto BD.W-MISSED-SLAB-CENSUS.)

---

## 6 · THE GLASS SIX-LAYER COMPOSITE

- **LIST (`ComboboxContent`):** `glass-floating` → carries backdrop blur+saturate · surface tint · edge rim (`--glass-border-*`) · inner catch-light (`.glass-material::before`) · drop shadow · grain. SIX-LAYER PRESENT. ✓
- **ITEM:** the `.glass-menu-row` plate materializes the quiet glass-tint on hover (element-level oklab tint reading the W55/dark-material seam). Layer-faithful on the active state. ✓
- **INPUT:** **MISSING** — `bg-transparent border-b` is a flat shadcn-neutral hairline, ZERO of the six layers (this is the BD.W-DESHADCN-CANON forbidden `border-input`-class residual on the picker's most-touched surface). → the A1/A2/I2 cluster: route the input + trigger onto `.control-surface` so the six-layer composite reaches them.

---

## Map to BD tranche

| Finding | Disposition | Wave |
|---|---|---|
| A1/A2 input flat (no focus glide, no six-layer) | AUGMENT | BD.W-CONTROL-SMOOTH (ComboboxInput reads `.control-surface`/`.input-pill` four-state) |
| P1 `max-h-[300px]` raw bracket → scoped `min(24rem,60dvh)` | AUGMENT | BD.W-MISSED-SLAB-CENSUS |
| I1 group heading bypasses `.glass-menu-section-label` | FOLD | BD.W-TOC-MENU-GLASS / BD.W-BC-COMPONENT-CANON |
| I2 no default trigger material (demo hand-rolls glass) | AUGMENT | BD.W-DESHADCN-CANON / BD.W-CONTROL-SMOOTH |
| slot-namespace `command-input` mislabel | FOLD (cosmetic) | BD.W-MISSED-SLAB-CENSUS |

No PRUNE/MODIFY — the component has no dead code; the findings are all AUGMENT/FOLD (missing affordance + off-register, not over-built). The user's page-design asks (own glassy cards, bigger main area, dock contextual-switching, aurora backdrops, import-label standardization, tighten copy) are DEMO-PAGE waves already covered by BD.W-FORMS-CARD-FOLD + BD.W-PAGE-HEADER-FOLD + the manifest import-label (`forms/combobox → @mkbabb/glass-ui/forms`, already standardized) — they are not component findings.
