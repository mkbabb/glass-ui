# Style audit — slice D: `demo/` (the storybook ORACLE)

**Run:** 2026-06-03 · glass-ui self-audit · READ-ONLY
**Slice:** `/Users/mkbabb/Programming/glass-ui/demo/` (170 source files)
**Canon:** `src/styles/{tokens,theme,typography,utilities,glass}.css`, `src/components/{ui,custom}/*`, `demo/stories/{StoryPage,StorySection}.vue`

## Preamble

The demo is the **oracle**: drift here means the canon contradicts itself — a story shows a consumer how NOT to use the library it documents. The headline finding is exactly that class: the demo ships two canonical chassis (`StoryPage`, `StorySection`) and a full semantic typography + token vocabulary, yet a band of stories (concentrated in `stories/navigation/**`, `stories/containers/alert.vue`, `stories/feedback/notification.vue`, `demo/configurator/**`) hand-roll the very idioms those chassis exist to absorb. The drift is overwhelmingly **author-inconsistency between story files** — `primitives/buttons.vue` uses `.text-subheading` for its section heads while `navigation/tabs.vue` uses `text-sm font-semibold text-muted-foreground` for the same role. None of it is a token *gap* in the library; all of it is the demo not dogfooding its own surface. Two genuine library gaps surfaced bidirectionally (a missing Alert intent-CVA branch; a missing diagonal cartoon-lift utility).

No `transition: all`, no hand-rolled `cubic-bezier`, no custom `@keyframes`, no inline `z-index` literals, no `:deep()` against reka-ui internals were found — the demo is clean on those axes. Scale transforms correctly read `var(--scale-hover)` / `var(--scale-press-btn)` at the two configurator sites that animate.

---

## Drift by axis

### Axis 1 — Token alignment

| # | Site(s) | Drift | Canonical |
|---|---------|-------|-----------|
| 1.1 | `stories/feedback/notification.vue:49-52` | status-type → color map uses raw `bg-blue-500` / `bg-emerald-500` / `bg-amber-500` / `bg-red-500` | `bg-info` / `bg-success` / `bg-warning` / `bg-destructive` — all generated theme utilities (`theme.css:168-170,78`) bridging the `--info/--success/--warning/--destructive` tokens (`tokens.css:471-473,371`). This is the **notification story** — the canonical proof-of-tokens — painting the swatches with off-token palette colors. |
| 1.2 | `stories/containers/alert.vue:43,57,71` (×3 intents) | warning/info/success Alerts hand-roll full `border-amber-500/50 text-amber-700 dark:text-amber-300 [&>svg]:text-amber-600 dark:[&>svg]:text-amber-400` ladders | the `--warning/--info/--success` tokens already encode the dark flip (`tokens.css:471-473`, dark overrides via `light-dark()`); `text-warning border-warning/50` collapses the manual dark-variant pair. See GAP-1 (Alert needs the CVA branch). |
| 1.3 | `stories/primitives/buttons.vue:134` | `text-zinc-900` literal on the viz-basis buttons | `text-foreground` (or a dark-aware token); raw `zinc-900` bakes a light-mode value that won't unwind in dark. |
| 1.4 | `stories/utilities/scale-on-hover.vue:23,26,29,32` | `text-rose-500 / text-amber-500 / text-violet-500 / text-sky-500` decorative icon tints | acceptable as pure demo decoration, but the library exposes `--viz-*` basis hues (`bg-viz-*`) used elsewhere (`buttons.vue:128`); prefer those for on-brand swatches. |
| 1.5 | `stories/foundations/intro.vue:68` | inline `style="--story-card-shadow-hover: var(--shadow-card-hover, var(--shadow-cartoon-hover));"` — a demo-local token aliasing the canonical cartoon-hover shadow | fold into the cartoon-lift utility (GAP-2); the local alias only exists because no canonical diagonal-lift class is exposed. |

### Axis 2 — Utility / @apply hygiene

| # | Site(s) | Drift | Canonical |
|---|---------|-------|-----------|
| 2.1 | 24 sites: `navigation/{tabs,dock,carousel,bouncy-tabs,command,dock-layers}.vue`, `compositions/{math-paper,hero,drawer-live-behind}.vue` … | `rounded-[var(--radius-card)]` / `rounded-[var(--radius-pill)]` / `rounded-[var(--radius-input)]` / `rounded-[var(--radius-dialog)]` arbitrary-value escape hatch | the `--radius-{card,pill,input,dialog,panel}` tokens are `@theme` entries (`theme.css:219-228`) → Tailwind generates `rounded-card` / `rounded-pill` / `rounded-input` / `rounded-dialog` directly. The arbitrary-value form is the long way round. |
| 2.2 | 70 sites: raw `<section class="flex flex-col gap-3">` across `stories/**` | the exact wrapper idiom `StorySection.vue` was minted to absorb (its header comment: *"129 hosts ship the `flex flex-col gap-3` wrapper; 104 ship the section-label paragraph"*) | `<StorySection label="…" blurb="…">` — already adopted by 52 stories; the 70 raw wrappers are the un-migrated remainder. |
| 2.3 | `stories/aurora/PresetPickerRow.vue:47` | `focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--ring)]` reinvents the focus ring | `.focus-ring` (`utilities.css:140`) / `--focus-ring-shadow` (`tokens.css:995`). |

### Axis 3 — Interactive consistency

| # | Site(s) | Drift | Canonical |
|---|---------|-------|-----------|
| 3.1 | `stories/navigation/dock.vue:191-193,207-209,230` (7 bare `<button>`) | menu items styled `rounded px-2 py-1.5 text-left text-sm hover:bg-muted` — hover only, **no focus-visible, no active-scale, no disabled state** | `.interactive-item` (`utilities.css:156`) bundles hover-bg + focus-ring + active-scale 0.98 + disabled. These rows are keyboard-unreachable-by-sight (no focus indicator). |
| 3.2 | `compositions/auth-shell.vue:123`, `aurora/OklchStopRow.vue:48,107`, `data/sortable-list.vue:112,148`, `aurora/config/NucleiLayer.vue:62`, `data/tags-input.vue:58` (~9) | `hover:text-foreground` / `hover:text-destructive` text-only interactives with no focus-visible | `.interactive-item` or at minimum `.focus-ring`. Coalesced count ≈ 9. |
| 3.3 | `stories/primitives/glass-panel.vue:39,47` | tier-toggle buttons `rounded-md border bg-card px-3 py-1.5 hover:bg-accent` (no focus, no press) | `.interactive-item` or `<Button variant="outline" size="sm">` + a pressed-state token. |
| 3.4 | `configurator/PresetEditor.vue:151,162` | label rows `cursor-pointer transition-colors hover:bg-card/60` with no focus-visible on a clickable label | `.interactive-item` (the `has-[[data-state=checked]]` selection styling is fine; the missing focus ring is the drift). |

### Axis 4 — Variant orthogonality + rooting

| # | Site(s) | Drift | Canonical |
|---|---------|-------|-----------|
| 4.1 | `stories/containers/alert.vue:42-43,56-57,70-71` | ad-hoc intent styling applied at the `<Alert class="…">` call-site instead of an `<Alert variant="…">` branch | `alertVariants` (`src/components/ui/alert/index.ts:7`) only ships `default` + `destructive`; warning/info/success are reinvented per-call. Patch at the CVA root → **GAP-1**. |
| 4.2 | `stories/navigation/tabs.vue:48`, `bouncy-tabs.vue` | `data-[state=active]:bg-background data-[state=active]:shadow-sm` patched on `<TabsTrigger>` per-call | active-tab styling belongs on the Tabs CVA / a tab-active token, not re-applied at every story (orthogonality leak — every consumer re-derives the active read). |

### Axis 5 — Overlay + motion vocab

Clean. Dialog/Popover/Toast stories compose the canonical `z-*` + tier + Vue Transition. No `transition: all`, no duplicate `@keyframes`. Spatial motion in motion-heavy SFCs (`compositions/{settings,dock-with-slider,hero}.vue`, `feedback/progress.vue`, `data/timeline-continuous.vue`, `composables/use-raf-loop.vue`, `primitives/status-dot.vue`) IS bracketed by `prefers-reduced-motion`.

| # | Site(s) | Drift | Canonical |
|---|---------|-------|-----------|
| 5.1 | `stories/motion/stagger.vue:61-62`, `composables/{use-stagger,use-stagger-reveal,use-story-demo}.vue` | inline `translate-y-4 opacity-0` ↔ `translate-y-0 opacity-100` toggles with NO `prefers-reduced-motion` guard at the demo level | these demo the stagger composables (which may guard internally), but the demo SFC's own `transition-[transform,opacity] duration-300/500` (`use-stagger-reveal.vue:27`, `use-story-demo.vue:43`) is unbracketed spatial motion. |

### Axis 6 — Typographic / structural

| # | Site(s) | Drift | Canonical |
|---|---------|-------|-----------|
| 6.1 | 17 sites: `navigation/{tabs,dock,command,carousel,bouncy-tabs}.vue` | section sub-heads as `<h2 class="text-sm font-semibold text-muted-foreground">` | the semantic register is `.text-subheading` (`typography.css:287`) for a heading, or `<StorySection label>` → `.section-label` (`typography.css:454`) for the label-body idiom. `primitives/buttons.vue:87` already uses `.text-subheading` for the identical role — the navigation authors diverged. |
| 6.2 | 11 sites: `compositions/{hero,dashboard,settings,auth-shell,math-paper}.vue` | `class="text-admin-label section-label"` — **both** label utilities stacked | `.text-admin-label` (`typography.css:351`) and `.section-label` (`typography.css:454`) are near-identical mono-caps registers; stacking them is double-application (conflicting `font-size`/`color`). Pick one — likely `.section-label` (carries `--muted-foreground`). |
| 6.3 | `compositions/hero.vue:191`, `compositions/math-paper.vue:23` | `text-admin-label section-label font-mono` — **three** redundant mono-label utilities | both `.text-admin-label` and `.section-label` already set `font-family: var(--font-mono)` (`typography.css:352,455`); the `font-mono` is a third redundant copy. |
| 6.4 | 10 sites: `configurator/PresetEditor.vue:144,183,232,269,318`, `navigation/dock.vue:190,206`, `bouncy-tabs.vue:63,67`, `feedback/notification.vue:84` | `text-xs font-mono uppercase tracking-wider text-muted-foreground` (and `text-[10px] uppercase tracking-wider …`) | this is `.section-label` byte-for-byte (`typography.css:454-459`: mono + caption + muted + uppercase + caps-tracking). The configurator reinvents it 5×. |
| 6.5 | `navigation/{tabs,dock,command,bouncy-tabs,carousel}.vue` (~20 `<h2 class="text-sm font-semibold …">`) | headings on the ad-hoc `text-sm` size | `.text-subheading` / `.text-heading`. Overlaps 6.1; counted once there. |

### Axis 7 — A11y resilience

| # | Site(s) | Drift | Canonical |
|---|---------|-------|-----------|
| 7.1 | `compositions/math-paper.vue:14`, `motion/scroll-type.vue:39` | `bg-card/80 backdrop-blur-sm` hand-rolls a glass surface — translucent bg + manual blur with **no `@supports not (backdrop-filter)` fallback** and no `prefers-reduced-transparency` opaque-fallback | compose a `.glass-*` tier (`glass.css` — the ladder ships the fallbacks). Only `stories/aurora.vue` carries the `@supports`/`prefers-*` guards; these two reimplement glass without them. |

---

## GLASS-UI GAPS (library should expose; surfaced by the demo)

### GAP-1 — `alertVariants` is missing `success` / `warning` / `info` branches
**Sites forcing the workaround:** `stories/containers/alert.vue:42-43,56-57,70-71` (3 intents, each a full hand-rolled `border-*/50 text-*-700 dark:text-*-300 [&>svg]:text-*-600 dark:[&>svg]:text-*-400` ladder).
`src/components/ui/alert/index.ts:7` ships only `default` + `destructive`, yet the library has first-class `--success/--warning/--info` tokens (`tokens.css:471-473`) + their theme bridges (`theme.css:168-170`) + foregrounds (`tokens.css:481-483`). Every consumer wanting a non-destructive intent Alert must hand-roll the dark-flip ladder the tokens already encode.
**Proposed:** add `success`/`warning`/`info` to `alertVariants` (`text-success bg-card [&>svg]:text-current …` mirroring the existing `destructive` branch). The demo's three hand-rolls collapse to `<Alert variant="warning">`.

### GAP-2 — no canonical diagonal "cartoon-lift" utility
**Sites (9, ≥3 threshold):** `compositions/{hero.vue:177,empty-states.vue:99,dashboard.vue:115}`, `aurora/PresetPickerRow.vue:46`, `foundations/{intro.vue:65,icons.vue:84,shadows.vue:60}`, `primitives/buttons.vue:134,151`. All ship `hover:-translate-x-px hover:-translate-y-px` (+ usually `hover:shadow-cartoon-hover` + `transition-transform`).
The lib's `.hover-lift{,-md,-lg}` (`utilities.css:583-603`) lifts **vertical-only** (`translate: 0 var(--lift-sm)`); the demo's signature idiom — hero.vue:58 calls it *"the signature that defines the whole system"* — is a **diagonal** 1px lift paired with the cartoon shadow. There is no canonical class for it, so it's pasted 9×, and `intro.vue:68` even mints a local `--story-card-shadow-hover` alias to carry the hover shadow.
**Proposed:** add `.hover-cartoon` (or `.hover-lift-cartoon`) to `utilities.css` near the `.hover-lift` family: `translate: -1px -1px; box-shadow: var(--shadow-cartoon-hover)` on hover, transition reading `--duration-fast`/`--ease-out`. Collapses 9 sites + retires the demo-local token.

### GAP-3 — no Tabs active-state token / CVA slot
**Sites:** `navigation/tabs.vue:48`, `navigation/bouncy-tabs.vue`, repeated `data-[state=active]:bg-background data-[state=active]:shadow-sm` patched on `<TabsTrigger>` per-call.
The active-tab read (background + elevation shadow) is re-derived at every consumer. **Proposed:** bake a `--tab-active-bg` / `--tab-active-shadow` token + default it on the `TabsTrigger` CVA so the active read ships out of the box; consumers retune the token, not re-apply the data-attr classes. (Lower confidence — could be intentional per-story styling demonstration.)

---

## UNION CANDIDATES (same pattern, both forms — propose canonical)

### UNION-1 — three overlapping mono-caps label registers
`.text-admin-label` (`typography.css:351`) and `.section-label` (`typography.css:454`) are near-duplicates: both `font-family: var(--font-mono)` + uppercase + `--type-tracking-caps`; they differ only in `font-size` (`--type-admin-label` vs `--type-caption`) and `.section-label` adding `color: --muted-foreground` + `font-weight`. The demo can't tell them apart — it stacks **both** at 11 sites (6.2) and adds `font-mono` for a third copy at 2 sites (6.3), and reinvents the same look ad-hoc at 10 more (6.4). **Canonical:** collapse to ONE label utility (keep `.section-label`, retire `.text-admin-label` or make it `@apply section-label` with a size override), then migrate the 23 demo sites + the `StoryPage.vue:33` eyebrow onto it. This is a tokens/typography-canon dedup, not just a demo fix.

### UNION-2 — section label-body idiom: `<StorySection>` vs raw `<section><h2>`
Two coexisting forms of the same "labelled section" pattern: the canonical `<StorySection label blurb>` (52 stories) and the raw `<section class="flex flex-col gap-3"><h2 class="text-sm font-semibold text-muted-foreground">` (70 wrappers / 17 ad-hoc heads). **Canonical:** `<StorySection>` is already the oracle's answer (its own header comment documents the idiom it replaces). Migrate the navigation/ band onto it; the raw form should not exist in the oracle.

---

## Tally

**Drift rows:** 22 (axis-1: 5, axis-2: 3, axis-3: 4, axis-4: 2, axis-5: 1, axis-6: 5, axis-7: 1) across ≈140 coalesced sites · **GLASS-UI GAPS:** 3 (Alert intent-CVA, diagonal cartoon-lift utility, Tabs active token) · **UNION candidates:** 2 (mono-label dedup, StorySection adoption) · clean on: `transition:all`, hand-rolled cubics, custom keyframes, z-literals, reka `:deep()`.
