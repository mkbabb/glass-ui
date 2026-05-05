# Lane F — `value.js` consumer (color/palette tooling)

Scope: `/Users/mkbabb/Programming/value.js/` — covers `demo/color-picker/` shell, `demo/@/components/{ui,custom}/`, `demo/@/composables/`, `demo/@/styles/`, plus `demo/hero-lab/`. Library proper (`src/`) is non-Vue color math and out of scope. Glass-ui revision: `master @ badc536` (v0.5.0). value.js consumes `@mkbabb/glass-ui` via `file:../glass-ui`.

The consumer's identity is palette tooling — every chrome decision is in service of evaluating an arbitrary user-chosen color against the substrate. That makes its evidence on **colorful flourishes**, **accent-driven recipes**, **swatch surfaces**, **dock-pane composition** and the **bold/audacious** axis the load-bearing input for this lane.

---

## 1. Drift findings (axes 1–7)

### Axis 1 — Token alignment

| Site | Drift | Canonical replacement |
|---|---|---|
| `demo/@/styles/style.css:11-12` | `--color-gold: #D4AF37;` and `--color-gold-light: #F5E6A3;` redeclared in `@theme`, ignoring glass-ui's `--gold`/`--gold-light`/`--gold-dark` (`tokens.css:411-413`). | Re-export `--color-gold: var(--gold)` or drop the override entirely; consumer's hex is identical to library default in light mode. |
| `demo/@/styles/style.css:13-14` | `--color-ppmycota: hsl(248 88% 71%);` duplicates glass-ui's `--easing-accent: hsl(248 88% 71%)` (`tokens.css:209`). | Either alias `--color-ppmycota: var(--easing-accent)` or surface as named token `--accent-violet` if shared. |
| `demo/@/components/custom/gradient/EasingSelector.vue:61` | `stroke="hsl(248, 88%, 71%)"` — same literal as `--easing-accent` baked into SVG. | `stroke="var(--easing-accent)"`. |
| `demo/@/components/custom/dock/menus/ProfileSection.vue:75` | `style="border-color: var(--color-gold)"` and similar inline gold borders. | Class via `border-gold` (already defined in glass-ui `theme.css`). Already used at `PaletteCard.vue:32`. |
| `demo/@/components/custom/palette-browser/PaletteDialog.vue:611-619` | Modal box-shadow hand-rolled with `color-mix(in srgb, var(--foreground) 25%, transparent)` and `0 0 0 1px var(--border)`. | `var(--shadow-modal)` + `var(--glass-shadow-elevated)` (`tokens.css:227-229,333-335`). |
| `demo/@/components/custom/palette-browser/PaletteDialog.vue:598,605` | Custom `backdrop-filter: blur(4px) saturate(0.7);` — file even self-flags as INTENTIONAL departure. | Either `--glass-blur-default` (currently `blur(6px)` since v0.4) or surface as `--glass-blur-modal-backdrop` token. Listed as legitimate gap below. |
| `demo/color-picker/App.vue:351-391` | Pane-slide transitions hand-roll `transform: translateX(110%) rotate(2deg)` with `var(--duration-slow) var(--spring-snappy)`. Tokens are correct, but the named transform compound (`pane-slide-enter-from`) duplicates the lib's `slide-in-from-side` pattern. | Either keep as consumer-specific (rotate-on-exit is a value.js signature) or promote as `slide-pane` keyframe with rotate parameter. |
| `demo/@/components/custom/palette-browser/PaletteDialog.vue:642` | `color: var(--color-muted-foreground)` — non-existent shorthand; canonical is `var(--muted-foreground)`. | Replace 3 sites at `PaletteDialog.vue:642,651` with `var(--muted-foreground)`. (Likely silent-failing.) |
| `demo/@/components/custom/watercolor-dot/WatercolorDot.vue:67-69,86-88,103-105` | Inset-glow recipe duplicated across base/hover/focus states with hand-tuned percentages. | Either CSS custom property `--watercolor-shadow` parameterising 35/40/35% × 6/8/6 or accept as `WatercolorDot` internal. |
| `demo/@/components/custom/color-picker/controls/SpectrumCanvas.vue:251-253` | `box-shadow: 8px 8px 0px 0px color-mix(in srgb, var(--spectrum-shadow, transparent) 50%, black);` — magic 8px duplicates `--shadow-card` consumer override. | `var(--shadow-card)` already overridden to 8px in `style.css:37`. Use the token. |
| `demo/@/components/custom/color-picker/visual/HeroBlob.vue` (via `GooBlob.vue:75-94`) | Hover filter swap `drop-shadow(5px 5px → 7px 7px)` hand-tuned. | Express in terms of `--lift-sm`/`--lift-md`. |
| `demo/@/components/custom/color-picker/controls/ColorInput.vue:361-366` | `crown-appear` keyframe references `var(--color-gold-light)` and `var(--color-gold)` directly. Acceptable, but the rotation amplitudes (-15deg/5deg/-2deg) are bespoke. | Promote `crown-appear` to library `@keyframes` if any other "approved" indicator emerges; until then, consumer-local is fine. |
| `demo/hero-lab/hero-lab.css:5-7` | Page background `radial-gradient(circle at top left, color-mix(...))` with hand-tuned percentages. | `--background` plus `--paper-aged-texture` would carry the warm-cream + radial fall. |

### Axis 2 — Utility & `@apply` hygiene

| Site | Drift | Replacement |
|---|---|---|
| `demo/@/styles/style.css:198-208` | `.section-subtitle` is a per-consumer extension of glass-ui's `.section-label`. Comment correctly notes the parent comes from glass-ui. | Add a `.section-subtitle` `@utility` to `typography.css`, gated on `--type-caption` + 50% muted. ≥3 sites: `BrowsePane`, `PaletteDialog` ribbon, `MixSourceSelector`. |
| `demo/@/styles/style.css:211-231` | `.filter-section` / `.filter-option` recipe — radius-md, hover via `color-mix(in srgb, var(--accent) 50%, transparent)`. | Either extract to `floating-panel-item` variant on glass-ui's `floating-panel.css` or accept as palette-browser-specific. ≥4 call sites in `SearchFilterBar.vue:19-50`, `SortFilterMenu.vue` (similar style). |
| `demo/@/styles/style.css:167-189` | `.touch-gate-target` + `.touch-gate-active` — outline-based gate indicator paired with `useTouchGate` from glass-ui. The composable is in glass-ui but the visual recipe is in consumer. | Promote `.touch-gate-target` and `.touch-gate-active` into `glass-ui/src/styles/utilities.css` adjacent to `useTouchGate` so consumer + lib stay paired. ≥3 call sites: `SpectrumCanvas`, `ComponentSliders`, plus glass-ui's own slider. |
| `demo/@/components/custom/palette-browser/PaletteDialogHeader.vue:91-104` | `.pastel-rainbow-text` — gradient-clip recipe with 6 OKLCH stops, scoped CSS but referenced via class from `Dock.vue:268`, `PalettesPane.vue:4`, `PaletteDialogHeader.vue:35`. | Promote to glass-ui `utilities.css` as `.text-rainbow-pastel` (rainbow tokens already exist at `tokens.css:430-436`). The OKLCH literals should reference `--rainbow-pastel-{red,orange,yellow,green,blue,indigo,violet}`. |
| `demo/@/components/custom/dock/Dock.vue:399-402` | `.gold-shimmer-icon` defined in scoped CSS but `.gold-shimmer` (text variant) is referenced from `Dock.vue:284`, `ProfileSection.vue:75` — undefined class. | Promote `.gold-shimmer` and `.gold-shimmer-icon` as `utilities.css` siblings of `.rainbow-text`. ≥3 sites; the text variant currently silently fails to apply. |
| `demo/@/components/custom/palette-browser/PaletteDialogHeader.vue:68-88` | `.admin-golden` + `.admin-golden::after` shimmer overlay — OKLCH (85% 0.15 85deg) gradient with `mix-blend-mode: overlay`. | Same family as above; `.admin-golden` is a consumer-specific tier indicator but the shimmer overlay technique is reusable. Surface as glass-ui `.shimmer-overlay` utility (tokenised stops). |
| `demo/@/components/custom/palette-browser/PaletteCard.vue:369-387` | `.featured-badge` linear-gradient text-clip animation duplicating the same gradient-clip-shimmer recipe at `PaletteDialogHeader.vue:69`. | Single canonical `.text-shimmer-gold` with `--shimmer-from`/`--shimmer-to` custom props. |
| `demo/@/styles/style.css:144-147` | `.underline-tabs` + active-tab border — bespoke tab rendering on top of glass-ui `Tabs`. | Add `variant="underline"` to glass-ui `TabsList`/`TabsTrigger` CVA. ≥2 sites in palette browser. |
| `demo/@/styles/style.css:151-165` | `.palette-tab-content[data-state="…"]` content-visibility + position swap. | Pure consumer optimisation, leave as-is. |
| `demo/@/components/custom/palette-browser/CurrentPaletteEditor.vue:284-302` | `.edit-overlay` duplicates `glass-bg-elevated` + `glass-blur-elevated` + `glass-shadow-elevated` triplet inline; this is the canonical `.glass-elevated` substrate plus a position adjustment. | Apply `.glass-elevated` from glass-ui `glass.css` and position via separate selector. |
| `demo/@/components/custom/dock/menus/ProfileSection.vue:42` | `class="… focus-ring"` — uses glass-ui's `.focus-ring`. Correct. (Documenting non-drift.) | — |
| `demo/@/components/ui/v-calendar/Calendar.vue:119-301` | Heavy `@apply` soup against shadcn-vue idiom; not glass-ui-aware. Vendor-generated. | Out of scope (auto-generated shadcn-vue). |

### Axis 3 — Interactive consistency

| Site | Drift | Replacement |
|---|---|---|
| `demo/@/components/custom/palette-browser/CurrentPaletteEditor.vue:63-67,80-83` | `class="… hover:scale-110 active:scale-95"` — bespoke, ignoring `--scale-hover` (1.08) / `--scale-press` (0.95). | Use `<Button>` with `size="icon"` + `variant="ghost"` (already exists). 4 sites in this file. |
| `demo/@/components/custom/mix/MixSourceSelector.vue:130-136` | `class="… hover:scale-110 hover:border-primary/60 transition-all"` for the "add color" dashed-border tile. Bespoke press + transition-all. | Same: `<Button variant="outline" size="icon" />` with class for dashed border. |
| `demo/@/components/custom/dock/menus/ProfileSection.vue:42-47` | Hand-rolled pill-shaped login button (`flex items-center gap-1.5 text-mono-small font-bold px-3 py-0.5 rounded-full border whitespace-nowrap transition-colors cursor-pointer focus-ring`). | `<Button variant="outline" size="sm" class="rounded-full border-color-from-style">` plus inline `--ring`. Repeated at `:82-88`, `MobileMenuDropdown.vue:42-44`, `AdminFlaggedPanel`/`AdminUsersPanel` for slug pills (≥6 sites). |
| `demo/@/components/custom/palette-browser/PaletteCard.vue:103-108` | "More menu" trigger uses bare `<button class="p-1 bg-transparent border-none shadow-none cursor-pointer focus-visible:outline-none">`. | `<Button variant="ghost" size="icon">` — single source for hover/press/disabled. |
| `demo/@/components/custom/palette-browser/PaletteCard.vue:79-89` | Vote button hand-rolls focus-visible ring, transition-colors duration token, etc. | `<Button variant="ghost" size="sm" class="gap-1">`. |
| `demo/@/components/custom/dock/Dock.vue:305-329` | `.action-bar-toggle-slot` grid-template-columns 0fr→1fr trick — clever, but bespoke. Not coverage drift, but the same FLIP-without-FLIP pattern recurs at every dock-action-bar site. | Either keep or promote as `.dock-slot-collapse` utility. |

### Axis 4 — Variant orthogonality and rooting

| Site | Drift | Replacement |
|---|---|---|
| `demo/@/components/custom/color-picker/ColorPicker.vue:3` | `<Card variant="pane" class="… rounded-2xl">` — passes `rounded-2xl` to override card radius. The `Card` already does `rounded-xl` for `pane`. Inconsistent intent. | Either drop the `rounded-2xl` class or extend `Card` with `radius="xl"|"2xl"` prop. ≥3 sites: ColorPicker, all panes use `Card variant="pane"` but only ColorPicker overrides radius. |
| `demo/@/components/custom/color-picker/display/ColorSpaceSelector.vue:13-20` | `<SelectTrigger variant="ghost" :style="{color: safeAccent, fontFamily: 'var(--font-display)' }" class="… text-3xl sm:text-4xl tracking-tight p-0 m-0 pb-1 self-end focus:outline-none select-none [&>span]:overflow-visible [&>span]:line-clamp-none [&>span]:block">` — the trigger is being pressed into duty as a display-1 heading. Inline `[&>span]:line-clamp-none` × 3 in the codebase. | Add `size="display"` or `as="h1"` variant to glass-ui `SelectTrigger`, or expose `:size` enum bridging to typography scale. ≥3 sites: ColorSpaceSelector, Dock view-select trigger, AuroraPane select. |
| `demo/@/components/custom/dock/Dock.vue:240-250` | `<DockSelectTrigger class="text-small font-display font-normal [&>span]:line-clamp-none" :style="{ '--dock-ring': safeAccent }">` — tunnels safe-accent through `--dock-ring` custom prop. | The slot-class workaround is already what consumers should do, but the lib should bless `--dock-ring` as a documented custom-property hook. |
| `demo/@/components/custom/palette-browser/PaletteDialog.vue:641-658` | `:has(> .lucide-x)` selector to retarget Dialog close button. | Add `closeIconClass` slot-class prop on `Dialog`/`DialogContent`. ≥1 site, but every consumer dialog hits this. |
| `demo/@/components/custom/palette-browser/PaletteCard.vue:378` | `.featured-badge :deep(svg) { stroke: var(--color-gold); … }` — the only `:deep` in custom/. | `<Badge>` icon slot-class prop. |

### Axis 5 — Overlay and motion vocabulary

| Site | Drift | Replacement |
|---|---|---|
| `demo/@/components/custom/palette-browser/PaletteDialog.vue:609-633` | Custom `dialog-in`/`dialog-out`/`dialog-out-to-drawer`/`dialog-in-from-drawer` — last two are genuinely novel (fly to/from drawer position), first two duplicate canonical. | Adopt canonical `<Transition name="dialog-scale">` for in/out; keep the to/from-drawer pair as consumer-local since it's a content-driven asymmetric exit. |
| `demo/color-picker/App.vue:355-391` | `pane-left`/`pane-right` transitions: enter-from `translateX(-110%) rotate(-2deg)`, leave-to `translateX(110%) rotate(2deg)`. Spring-snappy entering, ease-out leaving. | Authentic value.js identity (the asymmetric rotate-on-exit is a signature); ineligible for promotion unless a second consumer adopts it. |
| `demo/@/components/custom/color-picker/visual/HeroBlob.vue` (via GooBlob hover transition) | `transition: filter var(--duration-slow, 0.3s) var(--ease-standard, ease)` with the literal fallback values inline. Tokens are correct in non-fallback path. | Drop the fallbacks — glass-ui tokens are guaranteed. |
| `demo/@/components/custom/dock/Dock.vue:411-418,420-425` | `.action-bar-toggle-slot` transition `grid-template-columns 0fr → 1fr` with `--duration-normal var(--ease-standard)`. Tokenised. (Documenting non-drift.) | — |
| `demo/@/components/custom/palette-browser/CurrentPaletteEditor.vue:307` | `transform var(--duration-slow) var(--ease-dock)` — `--ease-dock` is not a defined glass-ui token. | Define `--ease-dock` in `tokens.css §2` or replace with `--ease-apple-spring` per the dock's actual feel. Currently silently falls back to `initial`/`ease`. |
| `demo/@/components/custom/color-picker/visual/PointerDebugOverlay.vue:259,267` | `animation: blink 0.5s infinite` + bespoke `@keyframes blink`. Dev-only overlay. | Out of scope (debug). |
| `demo/@/components/custom/image-palette-extractor/ImageEyedropper.vue:379-384` | `swatch-pop` keyframe — appears glass-ui-canon-shaped (scale 0→1 with overshoot). | Could share `pop` from `transitions.css` with `<Transition name="pop">`. ≥1 site. |
| `demo/@/components/custom/palette-browser/PaletteCard.vue:373` and `PaletteDialogHeader.vue:84` | `animation: golden-text-shimmer 4s var(--ease-standard) infinite` and `golden-shimmer 3s ease-in-out infinite` — same effect, two different keyframe names + two different durations. | Single canonical `.text-shimmer-gold` with `--shimmer-duration` custom prop. |
| `demo/@/components/custom/palette-browser/CurrentPaletteEditor.vue:246-265` | TransitionGroup `swatch-item-{enter,leave,move}` — pop with scale 0. Tokenised. (Non-drift, exemplary.) | — |

### Axis 6 — Typographic and structural hierarchy

| Site | Drift | Replacement |
|---|---|---|
| `demo/@/components/custom/palette-browser/PaletteDialogHeader.vue:28` | `class="font-display text-3xl sm:text-5xl font-black tracking-tight"` — bypasses `.text-display-{1..5}`. | `class="text-display-3 sm:text-display-1"` per the scale at `typography.css`. |
| `demo/@/components/custom/color-picker/display/ColorSpaceSelector.vue:17` | `class="… text-3xl sm:text-4xl tracking-tight"` on the SelectTrigger. | Same: `class="text-display-4 sm:text-display-3"`. This is precisely the **large/audacious typography** axis the consumer leans on; promoting to library tokens is the right fix. |
| `demo/@/components/custom/panes/PaneHeader.vue:1-3` | `<h3 class="pane-header-title text-heading">` with `font-size: var(--type-heading)` keyframe in scope. (Non-drift.) | — |
| `demo/@/components/custom/dock/Dock.vue:385` | `class="text-base font-display text-foreground whitespace-nowrap …"` for collapsed dock label. | `class="text-prose font-display"` per the `.text-prose` semantic. |
| `demo/@/components/custom/palette-browser/PaletteCard.vue:27` | `class="text-subheading line-clamp-2 sm:line-clamp-1"` — uses canonical `.text-subheading`. (Non-drift.) | — |
| `demo/@/components/custom/dock/menus/ProfileSection.vue:109` | `class="text-2xs italic text-muted-foreground leading-tight font-display"` — `text-2xs` not in glass-ui scale. | `text-micro` (closest equivalent — golden-ratio step below `text-caption`). |
| `demo/@/components/custom/palette-browser/PaletteCard.vue:42-67` | Repeated `text-micro text-muted-foreground` with hand-tuned `gap-0.5` and inline icon. | `.inline-pill` from glass-ui `utilities.css` already covers this idiom. ≥4 sites (fork, version, tags). |
| `demo/@/components/custom/panes/PaneHeader.vue` exists as a structural wrapper that only forwards 1 prop + a slot. | The `PaneHeader` carries scroll-timeline animation that's pane-specific — legitimate. | — |
| `demo/@/components/custom/color-picker/ColorPicker.vue:4` | `<CardHeader class="font-display m-0 pt-3 pb-0 relative z-10 …">` — `m-0` to override CardHeader's default. | Either expose `padded={false}` prop or accept inline override. |

### Axis 7 — Accessibility resilience

| Site | Drift | Replacement |
|---|---|---|
| `demo/@/components/custom/palette-browser/CurrentPaletteEditor.vue:284-302` | `.edit-overlay` reimplements glass surface (`backdrop-filter: var(--glass-blur-elevated)`) without `@supports not (backdrop-filter)` fallback. Glass-ui `.glass-elevated` has it. | Use `.glass-elevated` per Axis 2. |
| `demo/@/components/custom/palette-browser/PaletteDialog.vue:597-606` | Custom backdrop blur on dialog overlay; no `prefers-reduced-transparency` fallback. | Wrap in `@media (prefers-reduced-transparency: no-preference)`. |
| `demo/@/components/custom/goo-blob/GooBlob.vue:110-122` | `prefers-reduced-motion` correctly handled (`!important` filter freeze, transition: none). (Non-drift, exemplary.) | — |
| `demo/@/components/custom/watercolor-dot/WatercolorDot.vue:64-74` | No `prefers-reduced-motion` check — the rAF border-radius animation runs unconditionally. Not glass per se but a perceptual motion source. | Gate the `useWatercolorBlob` reactive update behind `prefers-reduced-motion: no-preference`. |
| `demo/@/components/custom/color-picker/controls/SpectrumCanvas.vue:259` | `filter: url(#watercolor-filter)` on the spectrum dot — feDisplacementMap on every paint. No reduced-motion gate. | `@media (prefers-reduced-motion)` should drop the filter. |
| `demo/@/components/custom/color-picker/visual/HeroBlob.vue` + `GooBlob` overall | The blob is a WebGL canvas; pointer + mood + satellite animations have no PRM gate at the system level (only the wrapper drop-shadow transition is gated). | Pause `useMetaballRenderer` rAF under PRM. |

### One-line drift tally

15 distinct token-alignment rows, 11 utility/`@apply` rows, 8 interactive rows, 5 variant-rooting rows, 9 motion rows, 8 typography rows, 5 a11y rows. Total: 61 rows across 7 axes; 36 are repeated across ≥2 sites and resolve to ≤8 canonical-replacement classes.

---

## 2. Glass-ui gaps surfaced by value.js

### G1. `Swatch` primitive — the missing accent surface

Patterns the lib doesn't ship yet, but the consumer needs everywhere it shows arbitrary user colors.

- A circular/cartoon-shadowed colored disc with hover lift (`scale-110`) and click feedback. value.js's answer is `WatercolorDot` (organic feDisplacementMap blob) + a parallel naive `<div class="w-{n} h-{n} rounded-full" :style="{backgroundColor: ...}">` recipe.
- Call sites:
  - `demo/@/components/custom/palette-browser/PaletteColorStrip.vue:11-21` — flat strip of div-swatches with `:style="{backgroundColor}"`.
  - `demo/@/components/custom/palette-browser/CurrentPaletteEditor.vue:28-72` (`SwatchHoverMenu` wrapper around `WatercolorDot`).
  - `demo/@/components/custom/palette-browser/MiniColorPicker.vue:18-20,41-43` — thumb dots + result preview.
  - `demo/@/components/custom/dock/Dock.vue:178-191,374-378` — edit-target dots + collapsed dock dot.
  - `demo/@/components/custom/color-picker/visual/HeroBlob.vue` (the audacious large variant).
- Proposal: glass-ui `<Swatch :color :variant="solid|watercolor|cartoon" :size="sm|md|lg|xl" :animated />`. Pulls `WatercolorDot` + its `useWatercolorBlob` composable + `feTurbulence` filter pack into `src/components/custom/swatch/`. The `cartoon` variant carries the recurring "border-2 border-border shadow-cartoon-sm" recipe at `MiniColorPicker.vue:41`, `SearchFilterBar.vue:75`. The `watercolor` variant requires an `<SvgFilters />` mount (the consumer has its own at `svg-filters/SvgFilters.vue`) — the lib should ship that filter pack as `glass-ui/components/custom/svg-filters/` (companion to existing `aurora`/`metaballs`).

### G2. Pane composition — `DockLayerGroup` slot-prop extensions

The dock canon already supports multi-layer, but value.js needs richer slot props.

- `demo/@/components/custom/dock/Dock.vue:171-393` orchestrates **5 layers** (`mobile-edit`, `slug-edit`, `action-bar`, `main`, plus `collapsed` template) with **layer-level activation watchers** (`watch(actionBarLayerActive, …) → dockRef.keepOpen()/release()`).
- The activation watcher boilerplate at `Dock.vue:106-109,151-154,156-159` (3 distinct mutex-style watchers calling `keepOpen`/`release`) is duplicated state-management.
- `useDockActionBar.ts` (`composables/useDockActionBar.ts:14-39`) is a generic layer descriptor (`label`, `icon`, `actions`, `accentColor`) consumed by `useGenericActionBar.ts` for 3 separate views.
- Call sites for the gap:
  - `useGenericActionBar.ts:13-54` — pattern repeated for `generate`/`gradient`/`mix` views.
  - `Dock.vue:54-90` — `viewEntries` decides which layer is "main" given mode toggle.
  - `Dock.vue:151-154` — `anyEditActive` opens the dock-keeper.
- Proposal additions to glass-ui:
  - `DockLayerGroup` exposes a `:keepOpenWhile` prop (Ref<boolean>) wired to `keepOpen`/`release` automatically — eliminates 3 watcher hooks per consumer.
  - Export `defineDockActionBar({label, icon, actions, accentColor})` factory so the `DockActionBar` interface lives in glass-ui rather than the consumer.
  - `DockLayer` accepts `:onActivate`/`:onDeactivate` callbacks (currently the consumer subscribes via `watch(activeLayer, …)` in two places).

### G3. Color-input + palette primitives — consumer-domain, not library-domain

`ColorInput.vue`, `ColorSpaceSelector.vue`, `MiniColorPicker.vue`, `SpectrumCanvas.vue`, `ComponentSliders.vue` — each is glass-ui-shaped but value.js-specific. **Not** library promotion candidates; flag in §5 (Risk register).

The exception worth promoting:

- **Touch-gate visual recipe** (`utils.css` selectors `.touch-gate-target`, `.touch-gate-active`) ships separately from the `useTouchGate` composable already in glass-ui. Pair them. Sites: `SpectrumCanvas.vue:6-7`, `ComponentSliders.vue:46-48`, plus the `:has(.slider-track)` selector at `style.css:173-175,180-183`.

### G4. Bold accent skeuomorphic recipes

The consumer's signature is **cartoon shadow proportional to the chosen accent**. This is the most concrete signal toward the new "bold" / "modern skeuomorphic with shadowing" axes.

- `demo/@/components/custom/color-picker/controls/SpectrumCanvas.vue:251-253` — on hover: `box-shadow: 8px 8px 0px 0px color-mix(in srgb, var(--spectrum-shadow, transparent) 50%, black)`. The shadow takes the **picked color** as input.
- `demo/@/styles/style.css:37-38,134-135` — the consumer overrides `--shadow-card` to 8px (light) / 50% opacity (dark) cartoon.
- `demo/@/components/custom/goo-blob/GooBlob.vue:75-94` — `drop-shadow(5px 5px 2.5px color-mix(in srgb, var(--blob-color) 20%, var(--foreground)))`.
- `demo/@/components/custom/palette-browser/PaletteCard.vue:4` — uses `--shadow-card-hover`.
- Pattern: the cartoon shadow's tint is parameterised by an accent color (CSS prop on the surface), with two mix percentages: faint at rest (15-20%) and stronger on hover (50%) — and the second component is `var(--foreground)` (light) or `black` (dark fallback).
- Proposal: glass-ui `--shadow-cartoon-accent` recipe with `--cartoon-accent-color` and `--cartoon-accent-mix` custom-property hooks. Companion `.shadow-cartoon-accent` `@utility`. ≥3 prospective call sites in this consumer alone (Spectrum, GooBlob, PaletteCard). The "modern skeuomorphic with shadowing" axis is exactly this — chunky offset shadow tinted by content color.

### G5. Underline tab variant

- `demo/@/styles/style.css:144-147` — `.underline-tabs button[role="tab"][data-state="active"] { border-bottom: 2px solid var(--active-tab-color, var(--primary)); border-radius: 0; }`.
- Used by `PaletteDialog.vue` and elsewhere within palette-browser.
- Sites: `PaletteDialog.vue` (search palette tabs), `PaletteSavedTab.vue`/`PaletteBrowseTab.vue` rim.
- Proposal: extend glass-ui `Tabs` CVA with `variant="underline"` accepting `--active-tab-color` (default `--primary`).

### G6. Dashed-well pattern (duplicate selector, missing definition)

- `demo/@/components/custom/mix/MixSourceSelector.vue:100` and `demo/@/components/custom/palette-browser/CurrentPaletteEditor.vue:3` both reference `class="dashed-well"` but **the class is never defined** in the demo. Silent visual loss.
- Empirically, both call sites embed `border-2 border-dashed border-primary/30 bg-primary/5` style buttons inside (`MixSourceSelector.vue:130-136`, `CurrentPaletteEditor.vue:80-83`).
- Proposal: glass-ui `.well-dashed` `@utility` — dashed-border container with consistent inset padding, gap, label-row layout. ≥2 call sites; legitimate library candidate.

### G7. Section-subtitle, section-label-paired

- `style.css:198-208` — `.section-subtitle` extends `.section-label` (font-mono + caption + 50% muted-foreground + line-clamp-1).
- ≥3 sites where it pairs with a `.section-label` (`PaneHeader`, search bars, gradient editor sections). Glass-ui exposes `.section-label` but not its tagline partner.
- Proposal: companion `.section-subtitle` `@utility` in `typography.css`.

### G8. Pastel-rainbow / shimmer-gold text utilities

- `pastel-rainbow-text` referenced from `Dock.vue:268`, `PalettesPane.vue:4`, `PaletteDialogHeader.vue:35` (3 sites), defined once at `PaletteDialogHeader.vue:91-104`.
- `gold-shimmer` referenced from `Dock.vue:284`, `ProfileSection.vue:75` (2 sites) — **the text variant is never defined** (only `.gold-shimmer-icon`). Silent visual loss.
- `featured-badge` and `admin-golden-text` use the same gradient-clip-shimmer technique with hand-rolled stops.
- Proposal: glass-ui `utilities.css` adds:
  - `.text-rainbow-pastel` (consumes `--rainbow-pastel-{red,…,violet}` from `tokens.css:430-436`).
  - `.text-shimmer-gold` (consumes `--gold` triplet from `tokens.css:411-413`) with `--shimmer-duration` custom prop.
- ≥4 prospective sites in this consumer; both axes are in lib but not exposed as ready-to-go text utilities.

### G9. Contrast-safe accent composable

`demo/@/composables/color/useContrastSafeColor.ts` (`useContrastSafeColor` + `useSafeAccentFn`) computes a contrast-safe oklch() shift relative to a background-lightness threshold. It depends on `value.js`'s own `computeSafeAccent` (color math), so promoting verbatim is impossible — but the **pattern** (provide a "safe" accent shadowRef that components inject for text/icons over arbitrary backgrounds) is library-shaped.

- 4 sites consume it: `App.vue:188`, `ComponentSliders.vue:134`, `PaletteCard.vue:259`, plus implicit via `SAFE_ACCENT_KEY` injection.
- Proposal: glass-ui exports a thin `useContrastSafeAccent({ accent, threshold })` composable that does WCAG-style L* clamping (no full color-math dep) and accepts any color string. Consumers with a richer color stack (value.js) can still override.

---

## 3. Union candidates

| Pattern | value.js form | glass-ui form | Canonical |
|---|---|---|---|
| Swatch surface | `WatercolorDot` (organic) + naive `<div :style="{backgroundColor}">` | none | new `<Swatch>` with `variant="solid|watercolor|cartoon"` (G1). |
| Action-bar dock layer | `useDockActionBar.ts` + `useGenericActionBar.ts` (consumer-local) | `DockLayerGroup`/`DockLayer` (canonical) | promote `DockActionBar` interface + `defineDockActionBar` factory into `glass-ui/dock` (G2). |
| Tab bar with active accent | `.underline-tabs` (style.css:144-147) | `Tabs` CVA with `default`/`pill` variants | add `variant="underline"` (G5). |
| Pill-shaped slug/login button | repeated 6×: `flex items-center gap-1.5 text-mono-small font-bold px-3 py-0.5 rounded-full border` | `<Button variant="outline" size="sm" class="rounded-full">` | promote a `<Button variant="pill-mono" />` or document the recipe (G4 sibling). |
| Cartoon shadow with accent tint | `--spectrum-shadow` inline + `--blob-color` + per-card override | `--shadow-cartoon` (foreground-tinted only) | add `--shadow-cartoon-accent` parameterised by `--cartoon-accent-color` (G4). |
| Backdrop blur on dialog overlay | `palette-dialog: blur(4px) saturate(0.7)` | `--glass-blur-default: blur(6px)` (no saturate) | expose `--glass-blur-modal-backdrop` token; lib opts in by default. |
| Touch-gate visual indicator | `.touch-gate-target` / `.touch-gate-active` (style.css:167-189) | `useTouchGate` composable (no CSS pair) | bundle CSS with composable (G3). |
| Stagger-children utility | `class="stagger-children"` at `ComponentSliders.vue:4` | `useStaggerReveal` composable (no class) | promote `.stagger-children` selector pack (currently only in worktree, never landed) into `utilities.css`. The consumer already references it, so the visual is silently absent. |
| Section subtitle | `.section-subtitle` (style.css:198-208) | `.section-label` only | add companion `.section-subtitle` (G7). |
| Pastel rainbow text-clip | `.pastel-rainbow-text` (PaletteDialogHeader.vue:91) | `--rainbow-pastel-*` tokens, no utility | add `.text-rainbow-pastel` (G8). |
| Shimmer-gold text | `.featured-badge`, `.admin-golden-text`, `.gold-shimmer` (3 implementations) | `--gold` tokens, no shimmer utility | add `.text-shimmer-gold` (G8). |
| Hero blob | `GooBlob.vue` + 4 mood states + satellite system | `Aurora`/`metaballs` exist; the goo-blob is moodful + click-reactive | likely consumer-specific (palette-tooling-domain, see §5). |

---

## 4. Design-language signal toward the new axes

### Cream

- **Where evidenced:** value.js does not push the cream axis directly. The consumer overrides `--glass-opacity-subtle: 0.75` at `style.css:42` to make panes more solid, which leans **away** from cream's warm-paper translucence. Hero-lab page (`hero-lab.css:5-7`) does evidence cream-adjacent gradients (radial mix of foreground + background + muted) that read as warm-paper.
- **Reinvented or hard-coded:** hard-coded `--shadow-card: 8px 8px 0px 0px color-mix(...80%)` overshoots the library's 3px / 8% cartoon — palette tooling needs the offset to read confidently against the user's chosen color, not against neutral cream.
- **Library primitive:** none required from value.js. Cream lives in tokens; value.js's evidence is **opting more solid than cream**, so the cream axis is constrained-by, not propelled-by, this consumer.

### Colorful flourishes (highest signal)

- **Where evidenced:**
  - `demo/@/components/custom/palette-browser/PaletteDialogHeader.vue:1-9,91-104` — gradient bar across full dialog header + pastel-rainbow text title.
  - `demo/@/components/custom/palette-browser/PaletteCard.vue:369-377,383-386` — shimmer-gold badge with text-clip animation.
  - `demo/@/components/custom/dock/Dock.vue:282-298,283` — gold-shimmer Admin entry with shield icon + drop-shadow glow.
  - `demo/@/components/custom/color-picker/controls/ColorInput.vue:30-58,360-367` — Crown indicator for approved color names with `crown-appear` keyframe (gold-tinted scale + rotate overshoot).
  - `demo/@/components/custom/panes/PalettesPane.vue:4` — pastel-rainbow page title.
- **Reinvented:** every flourish is local CSS. No library primitive.
- **Library primitive:** G8 (`.text-rainbow-pastel`, `.text-shimmer-gold`), tokens already exist (`--rainbow-{red..violet}`, `--rainbow-pastel-*`, `--gold`/`--gold-light`/`--gold-dark`). The gap is **utility-class glue**, not tokens.

### Mathematical

- **Where evidenced:** light. `demo/@/components/custom/gradient/EasingSelector.vue:55-67` renders cubic curves as polylines. AboutPane loads KaTeX-rendered color-space markdown. Panes for Aurora/Blob expose numeric sliders with `font-mono-code text-2xs` labels. The color-space selector itself is mathematical content but rendered as ordinary `text-3xl font-display`.
- **Reinvented:** numeric badges hand-rolled (`<span class="font-mono-code text-2xs text-muted-foreground/50">`).
- **Library primitive:** glass-ui has `.text-mono-{small,code}` and `.code-badge`; value.js consumes `font-mono-code` consistently. The mathematical axis is well-served by the existing mono utilities.

### Modern skeuomorphic with shadowing (high signal)

- **Where evidenced:**
  - `demo/@/components/custom/color-picker/controls/SpectrumCanvas.vue:245-253` — spectrum picker hover gets `box-shadow: 8px 8px 0px 0px color-mix(in srgb, var(--spectrum-shadow) 50%, black)`. The shadow is **tinted by the picked color**.
  - `demo/@/components/custom/goo-blob/GooBlob.vue:75-94` — drop-shadow(5px 5px 2.5px color-mix(in srgb, var(--blob-color) 20%, var(--foreground))), strengthens to 7px 7px on hover.
  - `demo/@/styles/style.css:37-38,134-135` — `--shadow-card: 8px 8px 0px 0px color-mix(in srgb, var(--shadow-color) 80%, transparent)` overrides glass-ui's 3px default.
  - `demo/@/components/custom/palette-browser/MiniColorPicker.vue:18,41` — thumb + preview use `shadow-cartoon-sm`.
  - `demo/@/components/custom/palette-browser/SearchFilterBar.vue:75` — color search filter swatch with `shadow-cartoon-sm` + transition to `shadow-cartoon-md`.
- **Reinvented:** the **accent-tinted cartoon shadow** is the recurring pattern; glass-ui's existing cartoon shadows are foreground-tinted only.
- **Library primitive:** G4. Add `--shadow-cartoon-accent` recipe with `--cartoon-accent-color` + `--cartoon-accent-mix` hook. Default fallback to `--foreground` (so existing sites don't change). 5 prospective call sites in this consumer alone.

### Bold / audacious large typography (high signal)

- **Where evidenced:**
  - `demo/@/components/custom/color-picker/display/ColorSpaceSelector.vue:17` — color-space name rendered as `text-3xl sm:text-4xl tracking-tight italic font-display`. This is **the marquee element** of the picker.
  - `demo/@/components/custom/palette-browser/PaletteDialogHeader.vue:28` — "Color **Palettes**" at `text-3xl sm:text-5xl font-black tracking-tight`.
  - `demo/@/components/custom/dock/Dock.vue:385-387` — collapsed dock label `text-base font-display` (intentionally subdued).
- **Reinvented:** bypasses `.text-display-{1..5}` scale.
- **Library primitive:** consumer should adopt `.text-display-3` / `.text-display-1`. **No new primitive needed** — the canonical scale already covers the audacious size range. The signal is that **typography this size needs to be the default for selector triggers in a "color-picker-shaped" library context**, not that the scale is missing.

### Large / audacious iconography

- **Where evidenced:**
  - `demo/@/components/custom/color-picker/visual/HeroBlob.vue` — `<GooBlob class="w-[7rem]">` is the centerpiece of the picker header (large + interactive + colorful + skeuomorphic — hits 4 axes simultaneously).
  - `demo/@/components/custom/dock/Dock.vue:243-245,381-383` — Dock's primary view-switcher icon is `w-6 h-6` shrink-0 with the safe-accent color. Lucide stroke icons throughout.
  - `demo/@/components/custom/palette-browser/PaletteDialogHeader.vue:14-25` — `WatercolorDot w-10 sm:w-12 aspect-square` as dialog avatar.
- **Reinvented:** the goo-blob and watercolor-dot are bespoke. Lucide icons used directly with Tailwind sizing.
- **Library primitive:** G1 (`<Swatch :variant>` carries the watercolor + cartoon + solid axes; the `xl` size + animated mood is the goo-blob territory). The audacious-icon axis benefits from glass-ui shipping at least the `<Swatch>` + filter pack so consumers don't reinvent organic-shape primitives.

---

## 5. Risk register

Patterns that should remain a value.js consumer preset, not a library promotion:

1. **Color-picker domain primitives** — `ColorPicker.vue`, `ColorSpaceSelector.vue`, `ColorInput.vue`, `ColorComponentDisplay.vue`, `ComponentSliders.vue`, `SpectrumCanvas.vue`, `MiniColorPicker.vue`, `EditDrawer.vue`, `ColorNutritionLabel.vue`. All depend on `value.js`'s color-math + `parseCSSColor` and a 15-color-space data model. Stays in consumer.
2. **`useColorModel` family** — `useColorParsing`, `useSliderGradients`, `useColorNameResolution`, `useColorUrl`. Tied to value.js domain.
3. **`useContrastSafeColor`** — relies on `value.js`'s `computeSafeAccent` (Ottosson sRGB gamut mapping). The **shape** is library-promotable (G9) but the implementation is consumer-specific.
4. **Palette browser** — entire `palette-browser/` directory is API-bound (Hono + MongoDB) and palette-domain-shaped. Stays.
5. **`useWatercolorBlob` + Mulberry32 PRNG + feDisplacementMap pack** — could be promoted as an **organic-shape utility** for icon/swatch decoration; cite ≥2 prospective non-color call sites before promoting. As of now, only `WatercolorDot` consumes it. Keep in consumer until a second use emerges.
6. **`GooBlob` / metaball renderer** — WebGL canvas + 4-mood state machine + satellite simulation. Specific to color-picker-as-mascot use case. Glass-ui already has `aurora` and `metaballs` primitives; goo-blob is niche on top.
7. **Pane-slide rotate-on-exit transition** — value.js's signature kineticism. Not a generic primitive until a second consumer adopts.
8. **Aurora `--shadow-card` 8px override** — 3× the library default; appropriate for color-tooling where the card needs to read against arbitrary backgrounds, but not a default for every consumer.
9. **`--ease-dock` reference at `CurrentPaletteEditor.vue:307`** — undefined token. Either the consumer should fix the reference (replace with `--ease-apple-spring`) or the lib should define `--ease-dock`. Currently silently broken; the consumer needs a fix regardless of library action.
10. **`stagger-children` class consumed but not defined** at `ComponentSliders.vue:4`. The class lives only in a worktree branch of glass-ui. Either adopt the worktree change in lib or remove the class from the consumer.
11. **`gold-shimmer` text class consumed but not defined** at `Dock.vue:284` and `ProfileSection.vue:75`. Promotion (G8) fixes this.
12. **`dashed-well` class consumed at 2 sites, never defined** anywhere. Promotion (G6) fixes this.

---

## 6. One-line tally

drift=61 | gaps=9 | union=12 | design-signal=high on **colorful flourishes** (G8) + **modern skeuomorphic shadowing** (G4) + **bold/audacious large typography** (consumer-side adoption of canonical scale) + **large/audacious iconography** (G1 `<Swatch>`) | risk-register=12 patterns flagged consumer-only | silent-failures=3 (`gold-shimmer`, `dashed-well`, `stagger-children` referenced but undefined).
