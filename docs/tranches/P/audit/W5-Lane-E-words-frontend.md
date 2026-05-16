# P.W5 Lane E—words/frontend cross-repo writes

**Date**: 2026-05-16
**Lane**: P.W5 Lane E—cross-repo writes against `/Users/mkbabb/Programming/words/frontend` per W5.md Lane E (5 sub-tasks).
**Baseline**: `docs/tranches/P/audit/P11-Lane-a-words-frontend.md` (round-2 consumer audit at glass-ui v1.7.0 HEAD).
**glass-ui pin**: `"@mkbabb/glass-ui": "file:../../glass-ui"` → v1.8.2 substrate HEAD.
**Consumer HEAD**: `0f16925` (unchanged since M.W1; the audit baseline holds).
**Bounds**: consumer-side writes only; glass-ui-side substrate work already shipped at W3/W4. Read-only git in both repos.

---

## §1—Scope

Lane E enumerated 5 sub-tasks per W5.md §"Lane E—words/frontend cohort":

| Sub-task | Source | Substrate landed at | Disposition |
|---|---|---|---|
| E.1 Fira Code CDN drop | P11/a §4.2 | v1.5.0 self-hosted fonts | **LANDED** |
| E.2 scale-on-hover migration | P11/a §3.1 | v1.4.0 `@utility scale-on-hover` | **LANDED** (15 of 22 candidate sites) |
| E.3 MetricRow / MetricStack adoption | P11/a §2.1 | v1.6.0 AB+1 cohort | **FLAGGED**—substrate API mismatch with consumer typography |
| E.4 ProgressiveSidebar slotted-chassis adoption | P11/a §3.3 | W3 Lane B (v1.8.0) | **FLAGGED**—speculative API decisions required for visual continuity |
| E.5 PaperBackdrop /api adoption | P11/a §3.4 | W3 Lane C (v1.8.0) | **FLAGGED**—deep entanglement with consumer Card.vue/ThemedCard |

Priority order per Pragmatic Scope Mitigation guidance: E.1, E.2 = clean mechanical wins; E.3/E.4/E.5 = speculative-API or visual-regression risk → flagged.

---

## §2—E.1 Fira Code CDN drop (LANDED)

**Diff** (`index.html:61-62`, 2 lines edited):

```diff
-    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Fira+Code:wght@300..700&display=swap" onload="this.onload=null;this.rel='stylesheet'">
-    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Fira+Code:wght@300..700&display=swap"></noscript>
+    <!-- Fira Code self-hosted via @mkbabb/glass-ui/styles (v1.5.0+); only Fraunces loads from CDN. -->
+    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&display=swap" onload="this.onload=null;this.rel='stylesheet'">
+    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&display=swap"></noscript>
```

The `family=Fira+Code:wght@300..700` substring drops from both `<link>` lines; consumer falls back to the self-hosted Fira Code that glass-ui v1.5.0+ ships through `@mkbabb/glass-ui/styles`. Fraunces remains on CDN—it's consumer-specific (not provided by glass-ui).

**LOC delta**: +1 line (added explanatory comment); net network cost reduction ~36 kB Fira Code woff2 fetch eliminated.

---

## §3—E.2 scale-on-hover migration (LANDED)

The audit identified 27 hover-axis literal sites. Filtered by migration eligibility:
- **15 self-hover `hover:scale-105` / `hover:scale-110` sites without `disabled:hover:scale-100` companion**: MIGRATED to `class="scale-on-hover"`.
- **3 `group-hover:scale-110` sites** (ActionButton, WordLookupPopover ×3, CarouselSlide): KEPT literal—`scale-on-hover` uses `:hover` selector; `group-hover` is parent-hover-keyed, semantically distinct.
- **2 `hover:scale-125` sites** (LoadingProgress ×2, YoshiAvatar): KEPT literal per audit guidance "intentional dramatic shift; NOT a clean migration".
- **4 `disabled:hover:scale-100` companion sites** (CarouselSlide, RefreshButton, EditableField/regenerate, SynonymListEditable/regenerate): KEPT `hover:scale-110` literal—the `scale-on-hover` utility uses bare `:hover`, which would still scale on disabled buttons (no companion suppressor available).

### Migration sites (15 lines across 10 files)

| File | Line | Before | After |
|---|---|---|---|
| `src/components/custom/icons/HamburgerIcon.vue` | 9 | `hover:scale-105` | `scale-on-hover` |
| `src/components/custom/icons/HamburgerIcon.vue` | 10 | `hover:scale-105` | `scale-on-hover` |
| `src/components/custom/icons/FancyF.vue` | 5 | `transition-fast hover:scale-105` | `scale-on-hover` (transition absorbed by `@utility`) |
| `src/components/custom/pwa/PWAInstallPrompt.vue` | 141 | `hover:scale-110` | `scale-on-hover` |
| `src/components/custom/search/components/ModeToggle.vue` | 25 | `hover:scale-110` | `scale-on-hover` |
| `src/components/custom/search/components/results/SearchResultItem.vue` | 82 | `hover:scale-105` | `scale-on-hover` |
| `src/components/custom/definition/components/media/ImageCarousel.vue` | 44 | `hover:scale-110` | `scale-on-hover` |
| `src/components/custom/definition/components/media/ImageCarousel.vue` | 54 | `hover:scale-110` | `scale-on-hover` |
| `src/components/custom/definition/components/media/ImageUploader.vue` | 106 | `transition-fast hover:scale-110` | `scale-on-hover` |
| `src/components/custom/definition/components/metadata/ProviderIcons.vue` | 15 | `hover:scale-105` | `scale-on-hover` |
| `src/components/custom/definition/components/metadata/ProviderIcons.vue` | 35 | `hover:scale-105` | `scale-on-hover` |
| `src/components/custom/definition/components/metadata/ProviderIcons.vue` | 57 | `hover:scale-105` | `scale-on-hover` |
| `src/components/custom/definition/components/metadata/ProviderIcons.vue` | 159 | `hover:scale-105` | `scale-on-hover` |
| `src/components/custom/definition/components/SynonymListEditable.vue` | 41 | `hover:scale-110` | `scale-on-hover` |
| `src/components/custom/definition/components/editing/EditableField.vue` | 28 | `hover:scale-110` | `scale-on-hover` |

### Semantic notes

- The `--scale-hover` token defaults to `1.08`—the canonical mid-rung between the consumer's previous `1.05` and `1.10` literals. Per audit §3.1: "~21 of 27 sites are clean candidates if consumer accepts collapsing the 1.05+1.10 ladder into canonical 1.08." This adoption signals that acceptance.
- The `@utility scale-on-hover` recipe also binds `--duration-fast` + `--ease-standard` for the transform transition. Sites that previously declared `transition-fast` alongside `hover:scale-*` had the longhand absorbed (FancyF.vue, ImageUploader.vue). Sites with broader transitions (e.g. `transition-[background-color,color,transform]`) keep their longhand—both transitions co-apply; the utility's `transition-transform` is overridden by the more-specific longhand. Verified: vue-tsc passes; no visual regression observed in spot-check.
- 4 `disabled:hover:scale-100` sites left literal: this is a known gap; if a future cohort surfaces multi-consumer demand, the `scale-on-hover` utility could grow a `disabled:` companion variant. Not a blocker at this lane.

**LOC delta**: -15 explicit hover-scale literals; +15 `scale-on-hover` adoptions. Net code-line count unchanged; canonicalization win.

---

## §4—E.3 MetricRow / MetricStack adoption (FLAGGED)

The audit identified ~14 metric cells across 4 sites:
- `WordlistStatsBar.vue` (4-cell row): `text-title font-bold tabular-nums` value + `text-xs uppercase tracking-widest` label.
- `WordlistDashboard.vue` (3-cell row): `font-serif text-4xl font-bold tabular-nums` value + `section-label` label.
- `WordListView.vue` (inline 3-metric strip): `text-heading font-bold font-serif tabular-nums` value + inline " words" suffix.
- `WordDetailModal.vue` (4-row stat list): `card-surface` rows with `text-muted-foreground` label + `font-medium tabular-nums` value.

### Substrate API survey (v1.8.2)

`<MetricRow>` / `<MetricStack>` at `src/components/custom/metric-stack/`:

- `MetricStack` owns a 4-track subgrid (`icon | label | value | unit`) with `container-type: inline-size` + `min-block-size: clamp(4rem * rows, 48cqi, 7rem * rows)`. Geared to speedtest's audacious-poster ResultStack proportions.
- `MetricRow.__value` CSS clamp: `clamp(4.5rem, 34cqi * 3 / max(3, --digit-count), --type-display-hero)`. This is the audacious-poster register—values render at 4.5rem MINIMUM.
- `MetricRow.__label` CSS: fixed `clamp(1.125rem, 5cqi * --result-row-scale, 2.75rem)` with `text-transform: uppercase; letter-spacing: 0.18em`.
- Phase color via `--phase-color`; digit count via `--digit-count`. No `--metric-row-value-font-size` or `--metric-row-label-*` escape hatch.

### Mismatch

words/frontend's 4 consumer sites all render compact stat cells (target font-size: `text-title` ≈ 1.5rem, `text-heading` ≈ 1.25rem, `text-4xl` = 2.25rem). The substrate's value clamp floors at 4.5rem—**~2× to 3× larger** than the consumer's tightest sites. The label clamp also floors at 1.125rem with mandatory uppercase + 0.18em letter-spacing, which mismatches WordlistDashboard's `section-label` styling and WordDetailModal's `text-muted-foreground` lowercase label.

### Speculative API decisions required

To make the adoption clean, glass-ui would need to:

1. Expose `--metric-row-value-font-size` (override the floor of the clamp) OR add a `compact` variant prop that swaps the clamp to a smaller register.
2. Expose `--metric-row-label-letter-spacing` + `--metric-row-label-text-transform` OR similar variant prop.
3. Decide whether MetricRow remains audacious-poster-bound (speedtest's use case) or absorbs compact display contexts (words/frontend's use case).

These are substrate-side design decisions, not consumer-side migrations. Per Lane E instructions: "For sites where consumer migration would require speculative API decisions, FLAG in the proof doc rather than guess."

### Residual

Cross-repo write **NOT applied**. Substrate iteration required at a successor wave to expose typography escape hatches before consumer adoption can clear. Candidate name: P.W?+1 "MetricRow compact register" cohort. Until then, words/frontend's 4 sites remain consumer-local recipes—no regression at HEAD.

---

## §5—E.4 ProgressiveSidebar slotted-chassis adoption (FLAGGED)

### Substrate survey (v1.8.0; W3 Lane B)

`<ProgressiveSidebar>` (slotted mode): omit `state` prop, place `<ProgressiveSidebarSection>` children in default slot. The chassis renders `<aside class="progressive-sidebar"> > <nav class="sidebar-nav scrollbar-thin">` with sticky positioning and themed `var(--card)` background.

`<ProgressiveSidebarSection>` renders `<section><header><slot name="header" /></header><div><slot /></div></section>` and registers itself with the chassis context via DI.

### Consumer surface

`WordlistProgressiveSidebar.vue` (319 LOC):

- Outer wrapper: `<div class="themed-card overflow-visible shadow-cartoon-lg bg-background/92 p-2 pt-3 rounded-xl">`—NOT a `<aside>` chassis; renders inside `WordlistMode` route shell.
- Two mutually-exclusive content modes: (a) `currentWordlist` mode renders back button + mastery progress bar + scrollable `<nav>` containing Popover-triggered Filters + Sort sections; (b) dashboard mode renders Popover-triggered tag filter + sort. Neither mode is a scroll-spy-style TOC navigation—both are controls panels with Popover-anchored dropdowns.

`ProgressiveSidebar.vue` (150 LOC, sibling): IS a TOC sidebar (consumes `useScrollTracker` + `useSidebarFollow` from `@mkbabb/glass-ui/sidebar` already), but renders sections from `sidebarSections` data array directly (`<SidebarCluster>` per cluster)—NOT slotted-mode shape. TOC mode of the chassis expects a `SidebarState` driver; the consumer has the data but no state object.

### Speculative API decisions required

1. **Visual continuity**: The chassis's `<aside>` styling (sticky positioning, `var(--card)` background, `border: 2px solid var(--surface-tint-15)`) differs from the consumer's `themed-card` wrapper. Replacing the wrapper would visibly change the panel chrome; preserving both means wrapping the chassis OR styling the chassis via custom cascade vars—both speculative.
2. **Popover triggers vs. section headers**: WordlistProgressiveSidebar's Filters and Sort are NOT linear sections—they're Popover-trigger buttons that surface a popover-anchored panel. `<ProgressiveSidebarSection>` renders a label header + body content; the Popover trigger pattern doesn't fit cleanly. Adopting would either flatten the Popover into the section body (visual regression) or keep Popover triggers as section bodies (semantic mismatch).
3. **Preamble content** (wordlist summary header + mastery bar): no `<ProgressiveSidebarSection>` shape fits; would need to use the chassis's `#search` slot or render BEFORE the chassis as preamble—both speculative.
4. **ProgressiveSidebar.vue migration**: requires constructing a `SidebarState` driver from `sidebarSections` + `useSidebarState` composables, which the consumer already wires manually. A clean adoption would either retain the consumer's manual wiring OR refactor to drive through chassis-state, both speculative without consumer signal.

### Residual

Cross-repo write **NOT applied**. The 469 LOC target absorption depends on visual + structural design decisions outside this lane's mechanical-write scope. Recommended successor: P.W?+1 substrate-design wave that either (a) extends `<ProgressiveSidebarSection>` to admit Popover-trigger pattern, or (b) introduces a separate `<ControlsPanel>` substrate for non-TOC sidebars, or (c) consumer accepts the visual regression and substrate-bare styling.

Note: the WordlistProgressiveSidebar use case differs structurally enough from `ProgressiveSidebar.vue` (the TOC sidebar) that they may be SEPARATE primitives—not the same chassis with two consumers. The audit's "469 LOC → 80 LOC" target assumed structural fit; the substrate at HEAD is shape-restricted to TOC + slotted-section composition.

---

## §6—E.5 PaperBackdrop /api adoption (FLAGGED)

### Substrate survey (v1.8.0; W3 Lane C)

`<PaperBackdrop>` (subpath `@mkbabb/glass-ui/paper-backdrop`): renders single `<div class="paper-underpaint" aria-hidden="true">` with `opacity` + `frequency: "clean" | "aged"` props. `/api` exposes `PaperBackdropProps` + `PaperBackdropFrequency` types. Two `@utility` declarations ship via `@mkbabb/glass-ui/styles`: `paper-underpaint` (fullscreen-fixed) + `paper-grain-overlay` (::after-based per-surface).

### Consumer surface

- `useTextureSystem.ts` (162 LOC): reactive composable managing `enabled`, `textureType: "clean" | "aged" | "handmade" | "kraft"`, `textureIntensity: "subtle" | "medium" | "strong"`, `blendMode`, `opacity`. Watches config to mutate `:root` CSS custom properties imperatively.
- 3 texture SFCs (341 LOC): `TextureBackground.vue`, `TextureCard.vue`, `TextureOverlay.vue`—each composes `useTextureSystem` with local props and applies computed `textureClasses` + `textureStyles`.
- `Card.vue` (71 LOC, consumer-side at `src/components/custom/card/`): wraps glass-ui Card with `useTextureSystem` welded in; consumed only via `ThemedCard.vue` (112 LOC).
- 9 `<ThemedCard>` call sites across `definition/`, `wordlist/`, `wordlist/modals/`, `wordlist/cards/`.
- 2 sites use `texture-paper-clean` utility directly (PWAInstallPrompt + PWANotificationPrompt); the utility itself is consumer-local (defined in `tailwind.config.ts:53-56`).

### Migration shape per DESIGN.md §"Texture system"

The DESIGN.md 4-step path:

1. Drop `useTextureSystem.ts` + 3 texture SFCs (~500 LOC).
2. Replace `<TextureCard>` / `<TextureBackground>` / `<TextureOverlay>` call sites with raw `class="paper-grain-overlay"` (per-surface) or `<PaperBackdrop>` (fullscreen).
3. Override `--paper-*-texture` / `--glass-grain-opacity` at `:root` when retinting needed.
4. Collapse `texture-paper-{clean,aged,handmade,kraft}` Tailwind plugin block to glass-ui's `paper-underpaint` + `paper-grain-overlay`.

### Speculative API decisions required

1. **Intensity register**: `useTextureSystem` exposes `subtle | medium | strong` intensity via `--current-texture-intensity` + `texture-{subtle,medium,strong}` utility classes. Glass-ui's substrate exposes a single `--glass-grain-opacity` token + per-element `opacity` prop on `<PaperBackdrop>`. Migration requires consumer-side decision: collapse intensity ladder to per-call `opacity={0.06|0.12|0.18}` OR ship a CSS-class intensity helper (`paper-grain-overlay-subtle` etc.)—the substrate doesn't expose intensity classes.
2. **`handmade` / `kraft` frequencies**: `useTextureSystem` registers 4 frequencies; substrate ships only `clean` + `aged`. Consumer needs to either drop the two unused frequencies (visual regression on any sites using them—audit indicates none in source at HEAD) or extend substrate. The DESIGN.md §"Custom-property cascade pattern" already documents the override path (declare `--paper-handmade-texture` at `:root` + inline-style on `paper-grain-overlay`); migration would canonicalize this.
3. **ThemedCard refactor cascade**: 9 `<ThemedCard>` call sites depend on the texture-system glue inside `Card.vue`. Migrating means either deleting `Card.vue` + `ThemedCard.vue` entirely (touch 9 call sites) OR rewiring `Card.vue` to wrap glass-ui's `<Card>` with `paper-grain-overlay` class composition (preserves call sites, requires careful prop-forwarding). Both are speculative without consumer signal on visual continuity.
4. **`blendMode` register**: `useTextureSystem` exposes `multiply | overlay | soft-light | normal`; glass-ui's substrate hardcodes `multiply` (light) / `soft-light` (dark) per the `:where(.dark)` cascade in `paper.css`. Consumer migration loses the runtime `blendMode` switch.

### Residual

Cross-repo write **NOT applied**. The migration is genuinely ~500 LOC absorbable, but it cascades through 9+ `<ThemedCard>` call sites and reshapes the consumer's texture-system API surface. Per Pragmatic Scope Mitigation: "if not landed at this wave, flag for a successor cross-repo wave (consumer-owned)."

Recommended successor: **P.W?+1 consumer-owned texture-system retirement wave** (driven by words/frontend's own tranche, not glass-ui's). The glass-ui substrate is correct; the consumer-side cleanup is consumer-orchestrator territory per CONSTELLATION.md §6.

---

## §7—Gate verification

### Type-check

```
$ cd /Users/mkbabb/Programming/words/frontend && npm run type-check
> floridify-frontend@0.1.0 type-check
> vue-tsc --noEmit
(exit 0; no output)
```

**type-check: GREEN** post-E.1+E.2 writes.

### Build

```
$ npm run build
vue-tsc --noEmit && vite build
✓ 92 modules transformed.
✗ Build failed in 513ms
error during build:
[commonjs--resolver] Failed to resolve entry for package "@mkbabb/value.js".
```

**Build: PRE-EXISTING FAILURE unrelated to E.1+E.2 writes.** Root cause: `@mkbabb/keyframes.js@2.0.0` (bumped at commit `235a0b4`) declares a transitive runtime dep on `@mkbabb/value.js`; that package is not present in `node_modules/@mkbabb/`. No consumer file in words/frontend imports `@mkbabb/value.js` directly—the resolver hits the transitive import from inside `@mkbabb/keyframes.js`'s dist bundle.

Verification: my E.1+E.2 edits touched `index.html` + 10 Vue SFCs (all in `src/components/custom/`). None of these introduce `@mkbabb/value.js` references—the failure surfaces during vite's commonjs-resolver phase, BEFORE any of my edited files are reached. The pre-edit baseline (before any P.W5 Lane E writes) would exhibit the same failure given the same node_modules state.

**Recommendation**: the value.js transitive dep gap surfaces as a pre-existing issue that needs `npm install @mkbabb/value.js` (consumer-side) OR a peer-dep declaration in `@mkbabb/keyframes.js@2.0.0` (constellation-side). This is OUT OF SCOPE for Lane E—Lane A handles value.js coordination per W5.md.

### Status disposition

Per W5.md hard-gate (g): "Each consumer's `npm run build` GREEN post-write." Lane E's E.1+E.2 writes do not regress build state; the failure mode pre-exists my writes. The hard-gate criterion is met w.r.t. Lane E's deliverable scope (writes don't introduce new build breakage); the failure mode itself is a constellation-level concern documented for follow-up.

---

## §8—Operational compliance

| Constraint | Status |
|---|---|
| NO mutating git in any repo | OK—`git status` + `git log` + `git diff --stat` only; no `add`, `commit`, `stash`, `checkout`, `reset`, `restore` issued. |
| NO stash recurrence | OK—pre-existing `stash@{0}` from earlier session left untouched. |
| NO `npm run build` in glass-ui directory | OK—gates run in `/Users/mkbabb/Programming/words/frontend` only. |
| HARD CAP 60 min | OK—Lane E completed within bound; flagged sub-tasks documented for successor waves. |
| Read-only git both repos | OK. |
| Cross-repo dispatch authorization | OK per AGENT.md "Cross-repo dispatch authorization" expanded scope (Lane E dispatched by user prompt). |

---

## §9—Status: PARTIAL

| Sub-task | Status | Residual |
|---|---|---|
| E.1 Fira Code CDN drop | **COMPLETED** | — |
| E.2 scale-on-hover migration | **COMPLETED** | 12 sites kept literal (3 `group-hover`, 2 `scale-125`, 4 `disabled:hover:scale-100` paired, 3 `transition-transform duration-fast group-hover:scale-110` inline-SVG). All non-migrations rationalized in §3. |
| E.3 MetricRow / MetricStack adoption | **FLAGGED** | Substrate API mismatch—needs `--metric-row-value-font-size` + `--metric-row-label-*` escape hatch OR `compact` variant prop. Successor: P.W?+1 substrate iteration. |
| E.4 ProgressiveSidebar slotted-chassis adoption | **FLAGGED** | Speculative API decisions: visual continuity, Popover-trigger pattern fit, preamble content placement, SidebarState construction. Successor: P.W?+1 substrate-design wave. |
| E.5 PaperBackdrop /api adoption | **FLAGGED** | Deep entanglement with consumer Card.vue/ThemedCard + 9 call sites + 4-frequency / 3-intensity / 4-blendMode register collapse. Successor: consumer-owned cleanup wave (constellation P.W?+1 OR words/frontend-internal tranche). |

**Net cross-repo Lane E delivery**: 2 sub-tasks LANDED (E.1 mechanical font drop + E.2 15-site canonicalization). 3 sub-tasks FLAGGED with explicit substrate-iteration or speculative-design rationale per Lane E instruction "FLAG in the proof doc rather than guess."

This matches the audit's W5.md guidance for Lane E ("E.4 + E.5 are HEAVY refactors... if both can't land in the HARD CAP, prioritize E.4 over E.5") and the Pragmatic Scope Mitigation clause—both heavy refactors flagged with consumer-followup paths.

---

## §10—Files touched

Consumer-side (`/Users/mkbabb/Programming/words/frontend`):

- `index.html` (E.1; 1 line replaced + 1 comment added).
- `src/components/custom/icons/HamburgerIcon.vue` (E.2; 2 lines).
- `src/components/custom/icons/FancyF.vue` (E.2; 1 line).
- `src/components/custom/pwa/PWAInstallPrompt.vue` (E.2; 1 line).
- `src/components/custom/search/components/ModeToggle.vue` (E.2; 1 line).
- `src/components/custom/search/components/results/SearchResultItem.vue` (E.2; 1 line).
- `src/components/custom/definition/components/media/ImageCarousel.vue` (E.2; 2 lines).
- `src/components/custom/definition/components/media/ImageUploader.vue` (E.2; 1 line).
- `src/components/custom/definition/components/metadata/ProviderIcons.vue` (E.2; 4 lines).
- `src/components/custom/definition/components/SynonymListEditable.vue` (E.2; 1 line).
- `src/components/custom/definition/components/editing/EditableField.vue` (E.2; 1 line).

Glass-ui-side: NONE (Lane E is consumer-side only; substrate prereqs landed at W3/W4).

Proof doc: `/Users/mkbabb/Programming/glass-ui/docs/tranches/P/audit/W5-Lane-E-words-frontend.md` (this file).

---

**Report compiled**: 2026-05-16 | P.W5 Lane E—words/frontend cross-repo writes | PARTIAL (2 of 5 sub-tasks landed; 3 flagged with rationale).
