# BA.W-MENU-GLASS — the glass menu-row register minted on the shared menuItemVariants CVA

**Name**: W-MENU-GLASS - the glass menu-row + menu-section register
**Opens after**: Batch 1 (W-DARK-MATERIAL — the dark register prerequisite, BA inv-5) AND the W-SURFACE-AXIS unit-1 mixin landing (Batch-4 intra-batch sequence — this wave CONSUMES the shared surface mixin; see Dependencies). Runs ‖ W-FEEDBACK-TONE ‖ W-GLASS-CAL ‖ W-PROGRESS-GRADIENT (disjoint component-family bounds per EXECUTION-DAG §5).
**Agents**: 2 serial (the CVA/recipe unit, then the consumer-adoption + gate unit) — single worktree, no intra-wave path contention (see Disjointness)
**Hard gate**: `proof:menu-glass` (born-RED) — three falsifiable SOURCE witnesses + a π readback DELTA: the shared `menuItemVariants` CVA paints the `.glass-menu-row` glass-quiet hover-lift register (not the flat `bg-accent` fill) on the SAME `surface` axis W-SURFACE-AXIS mints, the row clears the 44px touch floor, and the `.glass-menu-section` mono-caption/hairline recipe exists and is consumed by ≥2 surfaces (the library menu defaults + the slides DeckSettings reference).
**Status**: SPEC

## Goal criterion

Every menu/picker item in the library — across DropdownMenu, ContextMenu, Command, Select, Combobox — reads as a glass-quiet hover-lift plate by default (the iOS-grade glassy menu-row, 44px touch floor, leading-glyph / label / trailing-glyph anatomy), and a sectioned menu groups its rows under a mono-caption + hairline recipe — so the slides `DeckSettings` gear menu (and any consumer) drops its ~120 lines of hand-built menu CSS onto a library register, NOT a per-SFC bypass of the shared CVA. The wave succeeds if a user opening any dropdown/context-menu in BOTH modes sees the glassy hover-lift the R5-10/R8-12 mandate names, with zero per-SFC menu-row edits to the 13 consuming primitives.

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

This wave starts from the fleet's grounded root cause, NOT a blind re-diagnose (BA inv-3 — re-opened ≠ rebuilt-blind). Before touching a byte, the impl agent re-greps each anchor below at HEAD and confirms the mechanism still holds; if any cite has drifted, the agent records the drift in PROGRESS and re-locates the mechanism before proceeding — it does NOT re-invent the diagnosis.

Grounding findings (the BA fleet): **IG-A2** [`idiom-gaps.md:61-96`] — the glass MENU-ROW + PANEL-SECTION recipes earned promotion, ≥2-consumer bar PASSES (the CVA fans to the menu/picker family; slides `DeckSettings` is the named first downstream consumer). **RECAP2-R5-10** [`prompts-recap-2.md:97`, `:208`] — R5-10 UNADDRESSED: none of the three sub-parts landed (the `.glass-menu-row` CVA register, the `.glass-menu-section` recipe; the roomier panel rung = R5-4 DID land), the slides `DeckSettings.vue` is the reference impl. **DC-EXT-5** [`deferred-census.md:228-242`] — R5-10 FOLDS into the BA glass-grammar band because R8-12 ("ALL components glassy by default… buttons, dropdowns, popovers, toasts") is the forcing function: the glass MENU-ROW is exactly the dropdown/context-menu glass register R8-12 mandates as a LIBRARY default, and the 2nd consumer (the library's own menu defaults) materializes here.

Captures: the R8-12 all-components-glassy reads live across `audit/ground/` (the dropdown/menu flat-accent state); the slides reference is `~/Programming/slides/src/.../DeckSettings.vue` (~120 lines of hand-built menu CSS — read-only reference, NEVER edited, BA inv-10 foreign-repo fence).

The root cause (confirmed at HEAD this authoring): **the shared `menuItemVariants` CVA paints a FLAT `bg-accent` accent triad, with no glass plate.** `src/components/ui/_shared/menuItemVariants.ts:29-50` is the canonical CVA composed by **13** menu-family + picker-family SFCs (the lane's "9" undercounts the HEAD fan — re-grep confirms 13: `combobox/ComboboxItem`, `command/CommandItem`, `context-menu/{ContextMenuItem,ContextMenuCheckboxItem,ContextMenuRadioItem,ContextMenuSubTrigger}`, `dropdown-menu/{DropdownMenuItem,DropdownMenuCheckboxItem,DropdownMenuRadioItem,DropdownMenuSubTrigger}`, `select/SelectItem`, plus `_shared/index.ts` re-export). The CVA's hover/focus/highlight triad is `hover:bg-accent hover:text-accent-foreground` (`:40`), `focus:bg-accent …` (`:41`), `data-[highlighted]:bg-accent …` (`:42`), `data-[state=open]:bg-accent` (`:44`) — a FLAT accent FILL, NO `.glass-quiet`-tier plate, NO `translateY` hover-lift, and NO leading/trailing-glyph slot grammar beyond the `indicator` gutter variant (`:57-61`). So every menu item across the five families reads as a flat-accent row, and a glassy menu-row consumer (slides `DeckSettings`) must BYPASS the CVA with ~120 lines of hand-built CSS. The `DropdownMenuContent`/`ContextMenuContent` PLATES are already correctly `glass-floating rounded-panel` — the gap is the ITEM register, not the container.

The substrates the recipe folds onto already exist (re-grep confirms each):
- `.glass-quiet` (`src/styles/glass/material.css:38`) + the element-level oklab tint `color-mix(in oklab, var(--glass-bg-quiet), var(--glass-tint-source) var(--glass-tint-strength))` (`glass/ladder.css:58`, `glass/surfaces.css:19`) — the glass-quiet plate the row composes AT THE ELEMENT (the substitution-vs-inheritance discipline: read the element-level oklab tint, NOT the pre-baked `--glass-bg-quiet` raw token, so the row darkens over a light backdrop and lifts over a dark one per W-DARK-MATERIAL).
- `.section-label` (`src/styles/typography.css:485`) + `--border-hairline` (`src/styles/tokens/glass.css:165`) — the mono caption + hairline the `.glass-menu-section` recipe folds onto.
- `--control-floor: var(--touch-target, 2.75rem)` (44px, `src/styles/tokens/light-dark.css:20`) — the WCAG-2.5.5 touch floor the row clamps its min-block-size at via `max(…, var(--control-floor))`.
- The shared `surface` axis mixin W-SURFACE-AXIS mints (Batch-4 sibling, `src/styles/glass/surfaces.css` + its variant-token set) — the row's glass register is an EXPRESSION of that axis, not a parallel mechanism.

RE-GROUND command set (run all; confirm each mechanism + the 13-consumer fan):

```
sed -n '29,74p' src/components/ui/_shared/menuItemVariants.ts        # the flat bg-accent triad + the indicator/density variants
grep -rln 'menuItemVariants' src/components/                          # MUST be 13 SFCs + _shared barrel
grep -n 'glass-quiet'   src/styles/glass/material.css                # the glass-quiet plate
grep -n 'glass-bg-quiet' src/styles/glass/ladder.css src/styles/glass/surfaces.css  # the element-level oklab tint seam
grep -n 'section-label'  src/styles/typography.css                   # the mono caption
grep -n 'border-hairline' src/styles/tokens/glass.css                # the hairline token
grep -n 'control-floor'  src/styles/tokens/light-dark.css            # the 44px touch floor
grep -n 'surface'        src/styles/glass/surfaces.css               # the W-SURFACE-AXIS mixin (CONSUME, do not fork)
```

## Defect table (file:line — RE-GREP at HEAD)

| # | finding | file:line | the mechanism |
|---|---|---|---|
| 1 | IG-A2 menu-row flat-accent [S2] | `_shared/menuItemVariants.ts:40-42` (the hover/focus/highlight `bg-accent` triad), `:44` (`data-[state=open]:bg-accent`) | the shared CVA paints a flat accent FILL — no `.glass-quiet` plate, no `translateY` lift, no glyph-slot grammar — so all 13 consuming SFCs read flat-accent |
| 2 | IG-A2 no section recipe [S2] | `idiom-gaps.md:92`; (NO `.glass-menu-section` recipe in `src/styles/`) | the library lacks a "mono section-label + hairline over a row group" recipe; the slides gear hand-builds it |
| 3 | RECAP2-R5-10 UNADDRESSED [S2] | `prompts-recap-2.md:97`; slides `DeckSettings.vue` (~120 lines hand-built menu CSS) | the named-successor (AZ FINAL §6) never landed; the slides reference bypasses the CVA wholesale |
| 4 | DC-EXT-5 R8-12 forcing function [S2] | `deferred-census.md:234-241` | R8-12 "all components glassy" mandates the dropdown/context-menu glass register as a LIBRARY default — the 2nd consumer (library menu defaults) materializes, tripping the ≥2-consumer bar |

## Scope

1. **Mint the `.glass-menu-row` glass register ON the existing shared `menuItemVariants` CVA** (`_shared/menuItemVariants.ts`) — NOT a parallel class. Add a `surface` axis to the CVA whose `glass` value (the DEFAULT, since glass is the MAXIMAL default per AX.W54) swaps the flat `hover:bg-accent`/`focus:bg-accent`/`data-[highlighted]:bg-accent`/`data-[state=open]:bg-accent` triad for the `.glass-menu-row` recipe (a glass-quiet hover-lift plate + the PRM-gated `translateY` lift), and whose `accent` value preserves the current flat-accent fill for the escape case. The axis name + value vocabulary MIRRORS the W-SURFACE-AXIS shared mixin (`glass`/`veil`/`opaque` register) — this wave EXPRESSES that axis on the menu band, it does not fork a second one (coordination: if the shared mixin's shape blocks the menu register, that is a scope-reveal trigger per §Triumvirate, not a license to fork — EXECUTION-DAG §5).
2. **Author the `.glass-menu-row` CSS recipe** (a new `src/styles/menu.css` partial, `@import`ed into `index.css` in the floating/transitions band): the hover/focus/`data-highlighted` states paint the element-level glass-quiet oklab tint (`color-mix(in oklab, var(--glass-bg-quiet), var(--glass-tint-source) var(--glass-tint-strength))` — the element-level seam, per the substitution-vs-inheritance discipline, so the row darkens-over-light AND lifts-over-dark per W-DARK-MATERIAL's tint arm) + a `translateY(var(--menu-row-lift))` lift on the SAME §6 easing doctrine (surface props → `--ease-standard`; the lift transform → `--spring-smooth`), PRM-gated (no lift under `prefers-reduced-motion: reduce`). The row clamps its `min-block-size` at `max(<base>, var(--control-floor))` (the 44px touch floor). The `data-[highlighted]` reka-internal-highlight state reaches the SAME register (Combobox/Command/Select parity — the CVA already routes all three through `data-[highlighted]`).
3. **Author the `.glass-menu-section` recipe** (same `menu.css` partial): a mono section-label (folds onto `typography.css` `.section-label`) + a `--border-hairline` rule over a row group — the "section caption + hairline" the slides gear hand-built. Tokenized on a `--menu-section-*` knob set so a consumer retunes via `:root` override.
4. **Anatomy slot grammar**: confirm the leading-glyph / label / trailing-glyph anatomy reads on the new register (the existing `indicator` gutter variant reserves the leading slot; the recipe must not regress the radio-dot/check/chevron indicator spans the consumer SFCs render absolutely-positioned). NO per-SFC template edits to the 13 consumers are in scope — the register lands at the CVA + the recipe, so all 13 inherit it in ONE edit (the substitution-over-redeclaration discipline). The ONLY consumer-side change is the demo/menu story adopting `.glass-menu-section` as the 2nd consumer of the section recipe (see §Disjointness — the demo story is the in-repo 2nd consumer; the slides `DeckSettings` is the foreign downstream consumer the gate names but never edits).
5. **The default-flip decision is recorded**: `glass` is the CVA `surface` default (glass-first canon). This is a CLEAN BREAK for any consumer relying on the flat-accent look (BA inv-7, no aliases) — MIGRATION.md carries the row at W-CLOSE (the `accent` value is the explicit escape, NOT a back-compat alias). The wave records the break; it does not preserve a silent fallback.

## Triumvirate Dispatch

- **File-bounds expansion that invalidates the wave**: if expressing the glass register on the shared CVA cannot be done WITHOUT editing the W-SURFACE-AXIS mixin file (`src/styles/glass/surfaces.css` — a Batch-4 sibling's bound this wave reads but must not write) — that is a scope-reveal; triumvirate (research the mixin shape + plan-augment the consumption seam + redress), do NOT fork a second surface axis nor widen into the sibling's file unilaterally (EXECUTION-DAG §5: "If the mixin's shape blocks a consumer wave, that is a scope-reveal trigger, not a license to fork a second axis").
- **Hard-gate failures not local-edit-recoverable**: if the π contrast/touch-floor readback for the rebuilt row cannot clear AA at the glass-quiet register in DARK mode (the row plate too faint to read over the dark floor, OR the lift induces a sub-44px reflow) after the recipe lands — that is a register-design miss coupling to W-DARK-MATERIAL's tint arm; triumvirate, do not loop on token values.
- **Diagnostic loop halt**: if the CVA `surface=glass` default still paints the flat `bg-accent` after the recipe lands and three iterations have not isolated which cascade layer wins (the `interactive-item` substrate utility at `menuItemVariants.ts:31` vs the recipe vs the reka base classes), halt and triumvirate — the `cn()`/tailwind-merge ordering vs `@layer` precedence is the suspect (the same class as the AZ dock-rail `@layer`-loses-to-utility trap).

## File Bounds

| File | Access |
|---|---|
| `src/components/ui/_shared/menuItemVariants.ts` | modify (add the `surface` axis; swap the flat triad for the glass register on the `glass` default) |
| `src/styles/menu.css` | create (the `.glass-menu-row` + `.glass-menu-section` recipes + the `--menu-*` token knobs) |
| `src/styles/index.css` | modify-carve (add the `@import "./menu.css"` line in the floating/transitions cascade band) |
| `demo/stories/**/<a menu story>.vue` | modify (the in-repo 2nd consumer of `.glass-menu-section` — the menu demo adopts the section recipe; the impl agent picks the existing dropdown/context-menu demo story at RE-GROUND) |
| `scripts/proof-menu-glass.mjs` | create (the born-RED gate) |
| `package.json` | modify (register `proof:menu-glass` + add to `proof:all`/parity) |
| `scripts/gates.mjs` | modify (register the gate row in the gate registry) |
| `CLAUDE.md` | modify (record the glass-menu-row register in the menu/dropdown section) |

Do NOT touch:
- `src/styles/glass/surfaces.css` and the W-SURFACE-AXIS shared `surface` mixin token set — **W-SURFACE-AXIS owns the mixin** (Batch-4 sibling); this wave CONSUMES the axis vocabulary, never edits its definition. A blocked consumption fires the triumvirate above.
- `scripts/proof-glass-cohesion.mjs` and the toast/notification/alert tone files — **W-FEEDBACK-TONE owns those** (Batch-4 sibling); its census-gate extension to CVA variant arms is its bound, not this wave's.
- The six `--glass-blur-*-radius` primitives + `btn-audacious`/`btn-audacious-gold`/the disco knobs + `toggle-chip` — **W-GLASS-CAL owns those** (Batch-4 sibling, the blur dial-back + disco retirement).
- `src/components/ui/progress/*` — **W-PROGRESS-GRADIENT owns those** (Batch-4 sibling).
- The 13 consuming SFC templates' anatomy/markup beyond what the inherited register requires (the register lands at the CVA + recipe; no per-SFC menu-row rewrite — touching them re-introduces the per-component edit the substitution discipline retires).
- The GL shader internals (aurora.frag / metaball.frag) — standing fence (BA inv-9), not in this band.
- ppmycota purple / the demo motion-violet — standing fence (BA inv-9); the menu register is house tokens only, no demo-local hue.
- The slides `M` docs + `~/Programming/slides/.../DeckSettings.vue` — foreign repo (BA inv-10); the slides reference is READ-ONLY at RE-GROUND, NEVER edited; the slides adopt lands in the slides session at W-CLOSE.

### Disjointness

Two serial agent units, single worktree, NO shared modify path within the wave:
- **Unit 1** writes `_shared/menuItemVariants.ts` + `src/styles/menu.css` (create) + `index.css` (the one `@import` line).
- **Unit 2** writes the demo menu story (the in-repo 2nd consumer) + `scripts/proof-menu-glass.mjs` (create) + `package.json` + `scripts/gates.mjs` + `CLAUDE.md`.

No file appears in both units' bounds. Across Batch 4 (parallel siblings, EXECUTION-DAG §5): W-SURFACE-AXIS writes `glass/surfaces.css` + the content/floating component families (this wave reads the mixin, writes none of those); W-FEEDBACK-TONE writes toast/notification/alert + `proof-glass-cohesion.mjs` (this wave touches none); W-GLASS-CAL writes the blur primitives + btn/toggle-chip (none here); W-PROGRESS-GRADIENT writes `progress/*` (none here). `_shared/menuItemVariants.ts`, `src/styles/menu.css`, and the dropdown/context-menu band are touched by NO other Batch-4 wave. The one declared seam — the shared `surface` mixin — is CONSUMED not written (EXECUTION-DAG §5 "the mixin lands in a file only W-SURFACE-AXIS writes; consumers import").

## Hard Gate

`proof:menu-glass` (born-RED at HEAD, driven GREEN by the wave) — three falsifiable SOURCE witnesses (the comment-strip + pure-detector house pattern, mirroring `proof-glass-cohesion.mjs`), each red at HEAD pre-wave; plus the binding π readback.

1. **W1 — the menu-row paints the glass register, not the flat accent.** The shared `menuItemVariants` CVA's `glass` surface value (the DEFAULT) routes its hover/focus/`data-highlighted`/`data-[state=open]` states through the `.glass-menu-row` glass-quiet recipe, NOT the flat `bg-accent` fill. **Bite-tightening (anti-evasion)**: the source half asserts the POSITIVE — the CVA's default `surface` arm carries the `.glass-menu-row` register AND the `.glass-menu-row` recipe's hover/highlight `background` resolves the element-level glass-quiet oklab tint (`color-mix(in oklab, var(--glass-bg-quiet), …)`), and asserts the NEGATIVE — the CVA default no longer paints the unconditional `hover:bg-accent`/`data-[highlighted]:bg-accent` flat fill on the glass arm. It does NOT merely check for a `surface` prop literal (a renamed/re-defaulted axis must still drop the flat plate). RED at HEAD: `menuItemVariants.ts:40-42,44` is the unconditional flat `bg-accent` triad with no glass register and no `surface` axis.
2. **W2 — the section recipe exists and reads the mono-caption/hairline vocabulary.** A `.glass-menu-section` rule EXISTS in `src/styles/menu.css` composing the `.section-label` mono caption (or its `--font-mono`/√φ caption register) + a `--border-hairline` rule over a row group, on a `--menu-section-*` token knob. RED at HEAD: no `.glass-menu-section` recipe anywhere in `src/styles/` (`grep menu-section src/styles/` returns 0).
3. **W3 — the row clears the 44px touch floor + the ≥2-consumer bar.** The `.glass-menu-row` recipe clamps `min-block-size` (or `min-height`) at `max(<base>, var(--control-floor))` (the WCAG-2.5.5 44px floor), AND the `.glass-menu-section` recipe has ≥2 declared consumers: the library menu defaults (the CVA register reaches all 13 SFCs) + the in-repo demo menu story (Unit 2's adoption). The slides `DeckSettings` is the NAMED foreign downstream consumer (recorded, not asserted in-repo). RED at HEAD: no `--control-floor` clamp on any menu item; no `.glass-menu-section` consumer.
4. **The π binding readback** (the cardinal-lesson DELTA, captured own-surface, BOTH modes): a live capture of a dropdown AND a context-menu (open, with one item hovered) in LIGHT and DARK with a paired π readback proving (a) the hovered/highlighted row's resolved `background` is the glass-quiet oklab tint (NOT the flat `--accent` — a POSITIVE token test, the tint references the `--glass-bg-quiet`/`--glass-tint-*` register, not a `≠`-string), (b) the row's resolved `min-block-size`/painted height ≥ 44px, (c) the row's hover-lift `translateY` is non-zero under motion AND zero (identity) under `prefers-reduced-motion: reduce`, and (d) the `.glass-menu-section` caption + hairline read at the mono-caption register. Captured to `docs/tranches/BA/audit/visual/W-MENU-GLASS-DELTA.md` with before/after frames (the flat-accent HEAD state → the glass register) in BOTH modes. **The π half is the binding visual truth — if the source half passes but the live dropdown still renders the flat accent fill, the wave does NOT close (the source-green/visually-broken gap is the exact AZ P-1 close-class the BA gestalt bar exists to kill).**

W1–W3 are the device-free CI half (`proof:menu-glass`); the π readback is the binding visual truth. **Per BA invariant 4 (the GESTALT BAR), per-mechanism greens alone do NOT close this visual wave**: the surface is captured whole — the menu open over its real backdrop in BOTH modes, judged as a gestalt ("does this menu read as a designed glassy whole?") — and the `proof:ba-gestalt` menu/dropdown surface verdict (W-GESTALT-GATE roster) must record operative-PASS at W-REFLECT2. A page-of-mechanisms-green with a flat-looking menu closes `complete_with_misses`, not `complete`.

## Format And Lint Cadence

`npm run typecheck` after the CVA `surface`-axis edit (the `MenuItemVariants` `VariantProps` type widens — confirm the 13 consumers still typecheck); `npm run build` to confirm the new `menu.css` partial compiles into the `/styles` bundle in the right cascade band; `node scripts/proof-menu-glass.mjs` born-RED before the source edits (proof it fails at HEAD), GREEN at close; `npm run proof:gate-script-parity` after the package.json/scripts/gates.mjs registration; `git diff --check` before close.

## Verification Artefacts

- `docs/tranches/BA/audit/visual/W-MENU-GLASS-DELTA.md` — before/after dropdown + context-menu frames in BOTH modes + the paired π readback (hovered-row bg = glass-quiet tint, row height ≥44px, lift non-zero / PRM-zero, section caption + hairline).
- The `proof:menu-glass` JSON artefact (born-RED log + GREEN-at-close log).
- The gate-script-parity output post-registration.
- The `proof:ba-gestalt` menu/dropdown surface verdict record (consumed at W-REFLECT2).

## Commit Plan

- impl commit: `feat(menu): glass menu-row register on the shared menuItemVariants CVA + the glass-menu-section recipe (BA.W-MENU-GLASS)` — names the CVA surface-axis express + the two recipes in the body, and records the glass default flip as the clean break (no flat-accent alias).
- gate commit: `test(menu): proof:menu-glass born-RED→GREEN + parity registration`.
- doc/status commit: the CLAUDE.md glass-menu-row record + the DELTA doc + PROGRESS row + the MIGRATION-row note booked to W-CLOSE.

## Dependencies

- **Depends on**: **W-DARK-MATERIAL** (Batch 1, BA inv-5) — the row's glass-quiet register reads the element-level oklab tint whose DARK arm (the dark tint-seam lift) W-DARK-MATERIAL mints; staging the menu register over a broken dark floor is wasted capture work, so this wave's π readback runs only after the dark register holds. **W-SURFACE-AXIS** (Batch-4 sibling) — this wave CONSUMES the shared `surface` axis vocabulary; the menu register is an expression of that axis, not a fork. The DAG sequences W-SURFACE-AXIS's mixin-landing unit ahead of the menu-row express (EXECUTION-DAG §5 declared seam); if concurrent, the menu register points at the shared axis token, never a literal parallel definition.
- **Blocks**: **W-FEEDBACK-TONE** shares the R8-12 "all components glassy" census (the menu/dropdown band is the menu-row's; the toast/notification/alert band is W-FEEDBACK-TONE's) — the two collapse independent slices of the same census; the W-REFLECT2 glass-grammar gestalt verdict checks BOTH landed. **W-CLOSE** carries the MIGRATION.md row (the glass-default flip is a clean break for flat-accent-reliant consumers — speedtest + slides re-pin).

## Archaeology

Prior attempt: R5-10 (the slides-bank lift candidate) was booked "lift WHOLESALE on wave cadence" at AZ FINAL §6 (`prompts-recap-2.md:97`, `:208`) — a named-successor that NEVER landed (UNADDRESSED at HEAD). The slides `DeckSettings.vue` trapped the reference impl (~120 lines hand-built menu CSS bypassing the shared CVA). The new guardrail: this wave mints the register ON the shared CVA so all 13 consumers inherit it in ONE edit (not a per-SFC bypass), and the ≥2-consumer bar — un-MET when R5-10 had only the single slides consumer — is now TRIPPED by R8-12's forcing function (the library's own menu defaults become the 2nd consumer the census demands, per `deferred-census.md:234-241`). The gate asserts the RENDERED glass register with a BOTH-modes π readback, not the recipe-presence the prior book implied — the source-green/visually-broken gap is exactly the P-1 close-class the BA gestalt bar (inv-4) exists to kill.
