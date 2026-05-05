# G-audit-β — Substrate-without-consumer + dead/under-utilized/shim falsification

**Agent**: G.audit.β (read-only post-close challenge audit).
**Date**: 2026-05-04.
**Scope**: Every src/ artefact added in tranche G (W1 tokens, W2 utilities, W3 components/CVA/composables, Wβ blob primitives, Lane F runtime tokens, slot-class props, factory).
**Methodology**: ripgrep counts in `src/` + `demo/` only. Consumer-ledger projections (used by W5 to clear the ≥2 bar) are NOT credited — only artefact evidence in this repo counts. Per `docs/audits/overfitting-audit.md` precedence: `delete-unused > library-orphan > inline-and-remove > keep-current > demo-only-private > keep`.
**Falsification thesis**: the W5 overfitting audit asserts every artefact cleared the ≥2-bar via "story site + consumer ledger projection." Ledger projections are unverifiable from this repo; the bar must be cleared by **artefact** here. This audit re-counts.

A note on baseline: the W3 component proof openly records that a residual agent's `git stash` round-trip silently reverted the W1+W2 token/utility additions; the orchestrator recovered them inline. This audit does not attempt to relitigate the recovery — it counts the source as it stands today.

---

## 1. Token call-site verification (G.W1 additions)

| Artefact | def-site | sites in src+demo (excl def + theme alias + tokens.css declaration) | verdict | rationale (rg) |
|---|---|---:|---|---|
| `--cream` | tokens.css | 12 (CreamSurface, LiveSnippet, math-surface, button/input/select/number-field, math.css, cards.css, utilities.css, demo stories) | keep | `rg -l '\-\-cream\b' src/ demo/` (14 distinct files) |
| `--cream-warm` | tokens.css | 9 | keep | `rg -l '\-\-cream-warm' src/ demo/` (12 distinct files) |
| `--cream-cool` | tokens.css | 4 (CreamSurface, MathSurface, cards.css, demo cream/cream-card) | keep | `rg -l '\-\-cream-cool' src/ demo/` |
| `--cream-edge` | tokens.css | 4 (Card.vue, LiveSnippet, cards.css, demo) | keep | `rg -l '\-\-cream-edge' src/ demo/` |
| `--cream-foreground` | tokens.css | 6 (button/input/select/number-field/cards.css/demo) | keep | `rg -l '\-\-cream-foreground' src/ demo/` |
| `--paper-bg-{1..4}` | tokens.css | 1 (paper.css only) | **library-orphan** | `rg -l '\-\-paper-bg-1' src/ demo/` → only tokens.css + paper.css. Tokens are consumed transitively via `.paper-{1..4}` utilities, but those utilities themselves cluster on a single demo (paper-card.vue) — see §2. The token primitives themselves have one in-source consumer each. |
| `--paper-shadow-{1..4}` | tokens.css | 1 (paper.css) | library-orphan | `rg -l '\-\-paper-shadow' src/ demo/` |
| `--paper-border-{1..4}` | tokens.css | 1 (paper.css) | library-orphan | `rg -l '\-\-paper-border' src/ demo/` |
| `--icon-2xl`, `--icon-3xl`, `--icon-mega` | tokens.css | 1 demo (foundations/icons.vue), generated via theme.css | keep-current | `rg -l '\-\-icon-mega' src/ demo/` (only icons.vue references the token name; class consumption tracked separately under §2) |
| `--shadow-cartoon-accent` | tokens.css | 5 (button/input/select/number-field/cartoon-controls.vue) | keep | `rg -l '\-\-shadow-cartoon-accent' src/ demo/` |
| `--cartoon-accent-color` | tokens.css | 3 (cartoon-controls, prose-block, button) | keep | `rg -l '\-\-cartoon-accent-color' src/ demo/` |
| `--cartoon-accent-mix` | tokens.css | 0 external | **library-orphan-as-primitive** | `rg -l '\-\-cartoon-accent-mix' src/ demo/` → only tokens.css. Justified as recipe-internal — but ≥2 bar not cleared in src+demo. |
| `--space-phi-1` | tokens.css | 9 demos + math.css | keep | `rg -l '\-\-space-phi-1' src/ demo/` |
| `--space-phi-2` | tokens.css | 24 sites | keep | as above |
| `--space-phi-3` | tokens.css | 30+ sites | keep | as above |
| `--space-phi-4` | tokens.css | 14 sites | keep | as above |
| `--shimmer-blue-{dark,mid,light}` | tokens.css | 1 (utilities.css `.text-shimmer-blue` only) | library-orphan-as-primitive | `rg -l '\-\-shimmer-blue' src/ demo/` (3 files: tokens.css + theme.css + utilities.css). Demo class hits use `.text-shimmer-blue`, not the raw tokens. |
| `--blob-color` | tokens.css | 1 (Blob.vue) | library-orphan-as-primitive | `rg -l '\-\-blob-color' src/ demo/` |
| `--blob-border-mix` | tokens.css | 1 (demo/stories/primitives/blob.vue) | library-orphan-as-primitive | as above |
| `--blob-border-mix-contrast` | tokens.css | 0 | **library-orphan / dead** | `rg -l '\-\-blob-border-mix-contrast' src/ demo/` → only tokens.css. Token defined and never read. |
| `--blob-grain-opacity` | tokens.css | 0 | **library-orphan / dead** | `rg -l '\-\-blob-grain-opacity' src/ demo/` → only tokens.css. Token defined and never read. |
| `--blob-chromatic-aberration` | tokens.css | 3 (Blob.vue + types.ts + useMetaballRenderer + demo) | keep | `rg -l '\-\-blob-chromatic-aberration' src/ demo/` |
| `--blob-cast-shadow-y` | tokens.css | 1 (Blob.vue) | library-orphan-as-primitive | `rg -l '\-\-blob-cast-shadow-y' src/ demo/` |
| `--blob-cast-shadow-blur` | tokens.css | 1 (Blob.vue) | library-orphan-as-primitive | as above |
| `--blob-cast-shadow-mix` | tokens.css | 1 (Blob.vue) | library-orphan-as-primitive | as above |
| `--type-display-mega` | typography.css | consumed by `.text-display-mega` `@utility` | keep | `rg -l 'text-display-mega' src/ demo/` (3 demo stories) |
| `--type-display-ultra` | typography.css | consumed by `.text-display-ultra` `@utility` | keep | `rg -l 'text-display-ultra' src/ demo/` (3 demo stories) |
| `--type-formula` | typography.css | 1 (math.css `.text-formula`) | library-orphan-as-primitive | `rg -l 'text-formula' src/ demo/` → math.css + theme.css only. **`.text-formula` is not used by any demo or component.** |
| `--tracking-tightest` | typography.css | 2 (utilities.css `.text-display-stat`, MetricBadge) | keep | `rg -l '\-\-tracking-tightest' src/ demo/` |
| `--font-display-{1..5,mega,ultra}-variation-settings` (7 tokens) | typography.css | 1 internal each (typography.css `.text-display-N` `@utility`) | keep-current as primitive | each rung's variation token is consumed by its rung's utility. Internal coupling — fine. |

**Token retirements** (verified clean):

| Artefact | Status |
|---|---|
| `--section-heading` | retired in tokens.css; only a docstring comment remains. **Clean.** |
| `:root[data-typography-preset="brand-uniform-sans"]` | `rg 'data-typography-preset' src demo` → empty. **Clean.** |
| `--shadow:` alias | retained per W0 challenge; consumed by `.depth-text` + `--color-shadow`. ≥2 bar cleared in src+demo via `.depth-text` consumption (DisplayHero variation="depth"). |
| `--accent-pink` | **STILL DEAD IN-REPO.** `rg accent-pink src/ demo/` → only tokens.css + theme.css. The W1 proof claimed 4 fourier consumer sites; this audit cannot verify them, and per the new methodology (only this repo counts) this token is library-orphan. |
| `--accent-red` | 1 in-source consumer (`LiveSnippet.vue` + `prism-theme.css token.deleted` mapping). |
| `.depth-text` | DisplayHero `variation="depth"` consumed by typography.vue story. ≥2 bar cleared in-repo via DisplayHero + utility def. |

**Token verdict distribution**:
- keep: ~16 (cream namespace, space-phi family, display-mega/ultra/formula tokens with utility consumers, cartoon-accent recipe, depth-text/shadow alias, per-rung Fraunces axes, `--blob-chromatic-aberration`).
- **library-orphan / dead**: `--blob-border-mix-contrast`, `--blob-grain-opacity`, `--cartoon-accent-mix` (no in-repo consumer), `--accent-pink` (no in-repo consumer post-rename of `Toast inverse`), `--paper-bg-{1..4}`, `--paper-shadow-{1..4}`, `--paper-border-{1..4}` (each consumed only by paper.css `.paper-N` utilities, which themselves have weak consumer story — see §2).
- library-orphan-as-primitive (consumed only inside library, no in-repo end-consumer): `--type-formula` (no `.text-formula` consumer), `--shimmer-blue-{dark,mid,light}` (consumed only inside `.text-shimmer-blue` whose use sites are demo+button), `--blob-color`/`--blob-cast-shadow-{y,blur,mix}` (single Blob.vue consumer, plus def).

---

## 2. Utility class call-site verification (G.W2 additions)

For each utility added in W2 (`utilities.css`, `paper.css`, `cards.css`, `math.css`, `prism-theme.css`), counted distinct files in `src/` + `demo/` referencing the class **excluding the definition file**.

| Class | non-def consumer files | verdict | rg invocation |
|---|---:|---|---|
| `.bg-rainbow` | 2 (button/index.ts + flourishes.vue) | keep | `rg -l '\bbg-rainbow\b' src/ demo/` |
| `.bg-rainbow-vivid` | 2 (button/index.ts + flourishes.vue) | keep | as above |
| `.bg-rainbow-pastel` | 1 (flourishes.vue only) | **inline-and-remove** if not exported / **keep-current** if part of axis | `rg -l 'bg-rainbow-pastel' src/ demo/` |
| `.text-rainbow-pastel` | 1 (flourishes.vue) | **inline-and-remove / library-orphan** | as above |
| `.text-shimmer-gold` | 1 (flourishes.vue + sortable-list.vue) | keep | `rg -l 'text-shimmer-gold' src/ demo/` (2 files) |
| `.text-shimmer-blue` | 1 (flourishes.vue) | **library-orphan** (the token claim of "bbnf 3 runtime call sites" is not verifiable in this repo) | `rg -l 'text-shimmer-blue' src/ demo/` |
| `.text-shimmer-vivid` | 1 (flourishes.vue) | **library-orphan** | as above |
| `.text-shimmer-pastel` | 1 (flourishes.vue) | **library-orphan** | as above |
| `.rainbow-stroke` | 1 (`RainbowGradientDef.vue`) | inline-and-remove (paired) | `rg -l 'rainbow-stroke' src/ demo/` |
| `.divider-flourish-rainbow` | 0 (only via `<FlourishDivider tone="rainbow">` template literal — works) | keep (consumed via interpolated class) | `rg -l 'divider-flourish-rainbow' src/ demo/` |
| `.divider-flourish-gold` | 0 (consumed via `tone="gold"`) | keep | as above |
| `.divider-flourish-section-0..12` | varies per N (see below) | mixed | see below |
| `.flourish-stripe-rainbow` | 1 (flourishes.vue) | **library-orphan** | `rg -l 'flourish-stripe-rainbow' src/ demo/` |
| `.flourish-stripe-pastel` | 1 (flourishes.vue) | **library-orphan** | as above |
| `.flourish-stripe-gold` | 1 (flourishes.vue) | **library-orphan** | as above |
| `.code-badge` | 3 (code-prose.vue + paper-card.vue + audacious-hero.vue) | keep | `rg -l 'code-badge' src/ demo/` |
| `.well-dashed` | 4 demos + manifest entry | keep | `rg -l 'well-dashed' src/ demo/` |
| `.icon-stamp` | 6 (IconStamp.vue + multiple demos) | keep | `rg -l 'icon-stamp' src/ demo/` |
| `.icon-emboss` | 2 (IconStamp.vue + foundations/icons.vue) | keep | `rg -l 'icon-emboss' src/ demo/` |
| `.icon-{xs..mega}` (8 generated utilities) | each: 1 demo (foundations/icons.vue) | **inline-and-remove** for the icon utility *family* OR keep-current — the entire ladder is used by exactly one matrix story | `rg -l 'icon-mega' src/ demo/` etc. |
| `.text-display-stat` | 3 (utilities.css internal + flourishes.vue + golden-ratio.vue) | keep | `rg -l 'text-display-stat' src/ demo/` |
| `.text-prose-lettrine` | 7 demos | keep | `rg -l 'text-prose-lettrine' src/ demo/` |
| `.text-mono-body` | **0** | **delete-unused** | `rg -l 'text-mono-body' src/ demo/` → only utilities.css |
| `.text-mono-prose` | **0** | **delete-unused** | as above |
| `.section-subtitle` | **0** | **delete-unused** | `rg -l 'section-subtitle' src/ demo/` → only utilities.css |
| `.touch-gate-target` | **0** | **delete-unused** | `rg -l 'touch-gate-target' src/ demo/` |
| `.touch-gate-active` | **0** | **delete-unused** | as above |
| `.confetti-piece` | 1 (confetti.vue) | inline-and-remove | `rg -l 'confetti-piece' src/ demo/` |
| `.collapse-x` | **0** | **delete-unused** | `rg -l 'collapse-x' src/ demo/` |
| `.paper-1`, `.paper-2`, `.paper-3`, `.paper-4` | each 1 (paper-card.vue iterates) | keep-current as ladder | `rg -l 'paper-1' src/ demo/` |
| `.paper-card` | 1 (Card variant="paper" via internal map) | keep | indirect via Card variant |
| `.paper-rule` | 1 (paper-card.vue) | inline-and-remove or keep-current | `rg -l 'paper-rule' src/ demo/` |
| `.cream-surface` | 28 demos + CreamSurface.vue | keep | `rg -l 'cream-surface' src/ demo/` |
| `.math-display` | 1 (MathSurface.vue) | inline-and-remove | `rg -l 'math-display' src/ demo/` |
| `.math-inline-pill` | 2 (MathFormula + MathSurface) | keep | `rg -l 'math-inline-pill' src/ demo/` |
| `.formula-block` | 1 (MathFormula.vue) | inline-and-remove | `rg -l 'formula-block' src/ demo/` |
| `.text-formula` | **0** | **delete-unused** | `rg -l 'text-formula' src/ demo/` → math.css + theme.css only |
| `.production-rule` (+ `.lhs`, `.rhs`) | **0** | **delete-unused** | `rg -l 'production-rule' src/ demo/` → only math.css |
| `.perf-number` / `.perf-unit` | **0** | **delete-unused** | `rg -l 'perf-number' src/ demo/` |
| Prism `.token.*` mappings | 1 (code-prose.vue indirectly via highlighting) | keep | indirect but fine |

### `.divider-flourish-section-{N}` per-N audit

`<FlourishDivider tone="section-N">` interpolates the class. Distinct N values consumed in src+demo:
- `section-0`: foundations/flourishes.vue
- `section-2`: prose-block.vue
- `section-3`: 7 demos
- `section-5`: cream-card.vue
- `section-6`: foundations/flourishes.vue
- `section-9`: foundations/flourishes.vue

`section-1`, `section-4`, `section-7`, `section-8`, `section-10`, `section-11`, `section-12` (**7 of 13**) are dead in this repo. The flourishes.vue story exercises only the 4 quarter-points {0, 3, 6, 9} as labels in a sample matrix.

Verdict: define-only utilities for sections 1, 4, 7, 8, 10, 11, 12 are **library-orphan**.

### Utility verdict distribution (re-tabulated)

- keep: ~14 (cream-surface, code-badge, icon-stamp/emboss, well-dashed, prose-lettrine, display-stat, paper-{1..4} ladder, math-inline-pill, divider-flourish-section-{0,2,3,5,6,9}, divider-flourish-{rainbow,gold} via FlourishDivider).
- **delete-unused**: `.text-mono-body`, `.text-mono-prose`, `.section-subtitle`, `.touch-gate-target`, `.touch-gate-active`, `.collapse-x`, `.text-formula`, `.production-rule` (+ `.lhs` + `.rhs`), `.perf-number`, `.perf-unit`. **10 utilities defined and never used.**
- **library-orphan**: `.bg-rainbow-pastel`, `.text-rainbow-pastel`, `.text-shimmer-blue`, `.text-shimmer-vivid`, `.text-shimmer-pastel`, `.flourish-stripe-rainbow`, `.flourish-stripe-pastel`, `.flourish-stripe-gold`, `.divider-flourish-section-{1,4,7,8,10,11,12}` (7 sections). **15 utilities with only one foundations-story matrix consumer.**
- inline-and-remove: `.confetti-piece`, `.formula-block`, `.math-display`, `.paper-rule`, `.rainbow-stroke`. **5 utilities used by exactly one site each.**

---

## 3. Component verification (W3 + Wβ2 additions)

| Component | `<ComponentName` count in src+demo | Manifest story? | verdict |
|---|---:|---|---|
| `<CreamSurface>` | 28 | yes (foundations/cream + containers/cream-card) | keep |
| `<DisplayHero>` | 22 | indirect (composed in audacious-hero) | keep |
| `<FlourishDivider>` | 26 | yes (foundations/flourishes) | keep |
| `<IconStamp>` | 6 | yes (primitives/icon-stamp) | keep |
| `<MathSurface>` | 2 | indirect (composed in math-paper) | keep |
| `<MathFormula>` | 5 | yes (composed in math-paper) | keep |
| `<MathGlyph>` | 3 | yes (composed in math-paper, golden-ratio) | keep |
| `<KeyframeTimeline>` family (`KeyframeTimeline`, `TimelineMarker`, `TimelinePlayhead`, `TimelineRuler`) | 3 each | yes (motion/timeline) | keep |
| `<BezierCurveCanvas>` | 2 | yes (motion/bezier-canvas) | keep |
| `<NotificationDot>` | 2 | yes (primitives/notification-dot) | keep |
| `<KeyboardShortcutsModal>` | **1 (its own def file)** | **NO STORY** in manifest | **library-orphan** |
| `<TierBadge>` | **1 (its own def file)** | **NO STORY** in manifest | **library-orphan** |
| `<LikeButton>` | **1 (its own def file)** | **NO STORY** in manifest | **library-orphan** |
| `<PipelineFlow>` | 2 | yes (primitives/pipeline-flow) | keep |
| `<LiveSnippet>` | 2 | yes (primitives/live-snippet + composed in code-prose) | keep |
| `<Blob>` | 3 | yes (primitives/blob + _internal/blob-stress) | keep |
| `<Swatch>` | 2 | indirect (composed in primitives/blob) | keep |
| `<SvgFilters>` | **1 (only blob.vue)** | indirect | **inline-and-remove or keep-current** — single demo site exposed via `<SvgFilters>` import |
| `<RainbowGradientDef>` | **1 (only blob.vue)** | indirect | **inline-and-remove or keep-current** — single site, paired with `.rainbow-stroke` (also single-site) |

### Component findings

- **`<KeyboardShortcutsModal>`, `<TierBadge>`, `<LikeButton>`** are exported from `src/index.ts` (verified at `src/index.ts:23-25`), but have **zero `<ComponentName` references** anywhere in src+demo. **No manifest story exists** for any of the three. The W3 proof claimed "demo + fourier ledger" / "demo + bbnf ledger" — the demo half is fictitious. **Verdict: library-orphan, three components.**
- **`<SvgFilters>` and `<RainbowGradientDef>`**: only mounted in `demo/stories/primitives/blob.vue`. The W5 audit claimed `<RainbowGradientDef>` was paired with `.rainbow-stroke` "+ canon" — `.rainbow-stroke` itself only appears in `RainbowGradientDef.vue` and the def. Single-site abstractions both — **inline-and-remove** candidates if the design language doesn't mandate the public surface.

---

## 4. Composable verification (W3 + Wβ1 additions)

| Composable | usage call-sites in src+demo (excl own file + barrel index.ts) | verdict | rg |
|---|---:|---|---|
| `useBlob` | 1 (Blob.vue) | inline-and-remove or keep-current | `rg -l 'useBlob\b' src/ demo/` |
| `useBlobMood` | 1 (useBlob.ts) | library-orphan-as-primitive | as above |
| `useBlobPointer` | 1 (useBlob.ts) | library-orphan-as-primitive | as above |
| `useBlobSatellites` | 1 (useBlob.ts) | library-orphan-as-primitive | as above |
| `useMetaballRenderer` | 1 (useBlob.ts) | library-orphan-as-primitive | as above |
| `useWatercolorBlob` | 1 (Swatch.vue) | inline-and-remove | `rg -l 'useWatercolorBlob' src/ demo/` |
| `useContrastSafeAccent` | **0** consumers | **library-orphan / dead** | `rg -l 'useContrastSafeAccent' src/ demo/` → only own file + barrel |
| `useMonacoTheme` | **0** consumers | **library-orphan / dead** | `rg -l 'useMonacoTheme' src/ demo/` → only own file + barrel |
| `useRAFLoop` (capital RAF) | 6 demos + 2 src + tests | keep | `rg -l 'useRAFLoop' src/ demo/` |
| `useCollapse` | **0** consumers | **library-orphan / dead** | `rg -l 'useCollapse' src/ demo/` → only own file + barrel |
| `mulberry32` | 4 (useBlobSatellites + useWatercolorBlob + useBlob + useMetaballRenderer) | keep | `rg -l 'mulberry32' src/ demo/` |

### Composable findings

- **`useContrastSafeAccent`**, **`useMonacoTheme`**, **`useCollapse`** are exported from their package barrels (`src/composables/{color,monaco,motion}/index.ts`) and re-exported through `src/index.ts`, but have **zero in-source consumers**. The W5 audit claimed "value.js 4 sites" / "bbnf 1 + ledger projection" / "demo + keyframes ledger" — the demo + library portion is empty. **Verdict: three library-orphans.**
- The blob sub-composables (`useBlobMood`, `useBlobPointer`, `useBlobSatellites`, `useMetaballRenderer`) are consumed only by `useBlob`. As single-public-export factory components they are debatable — but each is independently exported from `src/composables/blob/index.ts`, surfacing four public APIs whose only consumer is one sibling composable. **Recommend: hide them as private to `composables/blob/_internal/` or absorb into `useBlob`.** As public surfaces they are library-orphans.

---

## 5. CVA branch verification (W3 lane 4)

| Branch | story site? | other consumer sites | verdict |
|---|---|---:|---|
| `Button variant="cartoon"` | yes (cartoon-controls) | 6 demos + glass.css | keep |
| `Button variant="transport"` | yes (motion/timeline) | 0 other | inline-and-remove (single site) |
| `Button variant="rainbow"` | indirect (audacious-hero, confetti) | 2 | keep |
| `Button size="icon"` | many sites incl data-table | 7 sites | keep |
| `Tabs variant="underline"` | **NO STORY** | **0 sites** | **library-orphan / delete-unused** |
| `Tabs variant="pill"` | yes (bouncy-tabs + AuroraConfigDock) | 5 sites | keep |
| `Select variant="cartoon"` | yes (cartoon-controls) | 1 | keep-current |
| `Input variant="cartoon"` | yes (cartoon-controls) | 1 | keep-current |
| `NumberField variant="cartoon"` | yes (cartoon-controls) | 1 | keep-current |
| `Toast variant="inverse"` | yes (toast-inverse, via `toastVariants({...})`) | 1 | keep-current |
| `Badge tone="success/warning/destructive/info"` (`badgeToneVariants`) | yes (badge-tones, color-pill) | 2 sites use the helper | keep |
| `Badge variant="color"` | **NO direct usage** found | **0** | **library-orphan**: variant defined in `badgeVariants` but no `<Badge variant="color">` site exists in src+demo |
| `MetricBadge size="xl"` | **NO DIRECT USAGE**; only the variant defn references "xl" | **0** | **library-orphan / delete-unused** |
| `ToggleGroupItem variant="card"` | **NO DIRECT USAGE** | **0** | **library-orphan / delete-unused**. `toggle-card.vue` story exists but exercises `Card`, not `ToggleGroupItem variant="card"`. |
| `Card variant="cream"` | yes (cream-card, dictionary-pronunciation) | 4 sites | keep |
| `Card variant="paper"` | yes (paper-card + 3 compositions) | 6 sites | keep |
| `StatusDot variant="progress"` | story exists but **does NOT exercise `progress`** | **0** | **library-orphan / delete-unused** |
| `GlassDock position="fixed"` (W3.4-residual) | (not searched here; outside the 14-CVA scope) | n/a | n/a |

### CVA findings

- 5 CVA branches are defined but never exercised: `Tabs variant="underline"`, `Badge variant="color"`, `MetricBadge size="xl"`, `ToggleGroupItem variant="card"`, `StatusDot variant="progress"`.
- 1 single-site CVA: `Button variant="transport"`.
- W5 audit claim "all 14 CVA branches have ≥1 W4 story site + ≥1 consumer ledger projection" is wrong on the in-repo half for these five.

---

## 6. Slot-class + factory verification

| Artefact | in-source/demo consumption? | rg | verdict |
|---|---|---|---|
| `HoverCardContent.contentClass` | **NONE** | `rg ':?contentClass=' src/ demo/` → only StoryPage.vue's *unrelated* prop and the def file | **library-orphan** |
| `DialogContent.closeIconClass` | **NONE** | `rg 'closeIconClass=' src/ demo/` → only def file | **library-orphan** |
| `DockLayerGroup.keepOpenWhile` | **NONE** | `rg 'keepOpenWhile=' src/ demo/` → only def file (declared as a prop, no consumer site) | **library-orphan** |
| `defineDockActionBar()` factory | **NONE** | `rg 'defineDockActionBar' src/ demo/` → only def file (declaration + docstring) | **library-orphan** |

All 4 slot-class / factory additions are public surfaces with **zero in-repo consumers**. The W5 audit said each was "≥2 bar cleared via cross-consumer ledger projections." This audit cannot verify those projections from this repo; per the audit methodology only this repo's evidence counts.

---

## 7. Runtime token verification (W3 lane F)

| Artefact | imports in src+demo | verdict |
|---|---:|---|
| `chartNeutrals` | **0** (only def in tokens.ts) | **library-orphan** |
| `vizColorsHex` | **0** | **library-orphan** |
| `spectrumColor()` | **0** | **library-orphan** |
| `NAMED_EASING_BEZIER` | 1 (motion/bezier-canvas.vue) | keep-current |
| `goldenShimmer()` | **0** | **library-orphan** |

`rg 'chartNeutrals|vizColorsHex|spectrumColor|goldenShimmer' src demo` confirms each of the four orphans appears only in `src/tokens.ts`. The W5 audit asserted "all ≥2 bar cleared via consumer ledger projections" — that is true only if ledger projections count, which contradicts the audit's stated `total-sites` definition.

---

## 8. Dead / under-utilized findings (consolidated)

### Components defined-and-orphan in this repo

1. `KeyboardShortcutsModal.vue` — exported, no story, no consumer.
2. `TierBadge.vue` — exported, no story, no consumer.
3. `LikeButton.vue` — exported, no story, no consumer.

### Composables defined-and-orphan in this repo

4. `useContrastSafeAccent` (color/) — exported, no consumer.
5. `useMonacoTheme` (monaco/) — exported, no consumer.
6. `useCollapse` (motion/) — exported, no consumer.
7. `useBlobMood`, `useBlobPointer`, `useBlobSatellites`, `useMetaballRenderer`, `useWatercolorBlob` — each exported as public surface; only ever consumed by sibling composables in the same package. Recommend collapse to one public `useBlob`.

### CVA branches defined-and-orphan

8. `Tabs variant="underline"` — declared in tabsList/tabsTrigger, exercised nowhere.
9. `Badge variant="color"` — declared, exercised nowhere.
10. `MetricBadge size="xl"` — declared, exercised nowhere.
11. `ToggleGroupItem variant="card"` — declared, exercised nowhere.
12. `StatusDot variant="progress"` — declared, story does not exercise it.

### Utility classes defined-and-orphan

13. `.text-mono-body`, `.text-mono-prose` — utilities.css.
14. `.section-subtitle` — utilities.css.
15. `.touch-gate-target`, `.touch-gate-active` — utilities.css. (The token claim "value.js 15 sites + paired with canon `useTouchGate`" misrepresents in-repo state — `useTouchGate` exists at `src/composables/useTouchGate.ts` but is unrelated to these classes.)
16. `.collapse-x` — utilities.css. (Claim: "+ W3 useCollapse paired" — `useCollapse` itself is also a library-orphan, see #6.)
17. `.text-formula` — math.css. (`--type-formula` token has no consumer either.)
18. `.production-rule`, `.production-rule .lhs`, `.production-rule .rhs` — math.css.
19. `.perf-number`, `.perf-unit` — math.css. (Claim of "bbnf perf-number/-unit" sites is unverifiable in-repo.)
20. `.divider-flourish-section-{1,4,7,8,10,11,12}` — utilities.css. (7 of 13 generated section utilities are dead.)

### Slot-class + factory

21. `HoverCardContent.contentClass`, `DialogContent.closeIconClass`, `DockLayerGroup.keepOpenWhile`, `defineDockActionBar()` — all four public surfaces have zero in-repo consumers.

### Runtime tokens

22. `chartNeutrals`, `vizColorsHex`, `spectrumColor`, `goldenShimmer` — four of five new runtime tokens have zero in-repo consumers.

### Token primitives with weak consumer story

23. `--blob-grain-opacity`, `--blob-border-mix-contrast`, `--cartoon-accent-mix` — defined and not read anywhere.
24. `--paper-bg-{1..4}`, `--paper-shadow-{1..4}`, `--paper-border-{1..4}` — each consumed only by paper.css `.paper-N` rules (themselves single-site).
25. `--accent-pink` — retained per W0 challenge, but no in-repo consumer.

**Total dead/under-utilized findings: ~50 distinct artefact families.**

---

## 9. Shim-like / complex-code findings

### Recovery-comment debris

The post-stash recovery work seeded the source with intermediate-decision comments that violate the "no legacy / no quick-fix narration" precept:

- `src/styles/utilities.css:124`: "G.W2 silent-failure resolution S1+S7. Retires `.gold-shimmer`; W5..."
- `src/styles/typography.css:45`: "Per-rung Fraunces variation axes per G.W0 user-direction overlay #6."
- `src/styles/tokens.css:153`, `:202`, `:247`, `:467`, `:489`: explicit "Per G.W0 challenge §B.1", "user-direction overlay #1", "silent-failure resolution S7" annotations.
- `src/styles/cards.css:4`: "G.W2 Lane I adds .cream-surface ..."
- `src/components/ui/card/index.ts:14`: "(G.W3) resolve..."

Per `feedback_no_backwards_compat` the source should read as a clean state, not as a recovery diary. **Recommendation: scrub all `G.W{0..5}` / "user-direction overlay" / "silent-failure resolution" annotations**; the ledger lives in `docs/tranches/G/`.

### Dual-API in `useRAFLoop.ts`

`src/composables/motion/useRAFLoop.ts` exports BOTH:
- `useRAFLoop(callback, options): RAFLoopControls` (capital RAF, full timing object with `frame` counter)
- `useRafLoop(callback, options): RafLoopHandle` (lowercase, simpler shared-driver)

The barrel re-exports both names with both `RAFLoopCallback`/`RafCallback` and `RAFLoopTiming`/`RafLoopHandle`. This is a parallel-API duplicate, not a synonym alias. Two implementations of the same concept, exported under two casings. Distribution today:
- `useRAFLoop` is consumed by 6 demo stories + 2 src composables.
- `useRafLoop` (lowercase) is consumed by 2 src composables (`useWatercolorBlob`, `useMetaballRenderer`).

**Recommendation: collapse to one. The lowercase variant has the shared-rAF driver + reduced-motion-on-start guard which the demo loops want; the capital variant has the timing object the test suite uses. Pick one shape and migrate.** As of today this is a complex two-module-in-one-file pattern that ships two casings of the same primitive.

### Per-rung Fraunces-axis token expansion

`--font-display-{1..5,mega,ultra}-variation-settings` (7 named tokens) each consumed by exactly one matching `@utility text-display-{N}` block. The pattern is functional but reads as 7 tokens-per-rung where one composable token + a CSS function call would be simpler:

```css
@utility text-display-N {
    font-variation-settings: "WONK" 1, "SOFT" calc(N * 25), "wdth" calc(100 + N * 2);
}
```

Or accept the 7-per-rung pattern and document it explicitly as the contract. Either way, the current state (7 tokens, 7 utilities, 1:1 coupling) is not idiomatic — the token names are an implementation detail leaked as public surface. **Recommendation: collapse to inline values or commit to per-rung as a documented design choice.**

### Cream + paper tier dark-mode mirrors

`src/styles/tokens.css` has cream and paper tokens declared at `:root` and again at `.dark` — consistent with the file's existing pattern (verified). Not a shim.

### `--shadow:` alias retention

W0 challenge §B.1 R6 said "keep canonical, but Synthesis Theme 3 says repurpose for `<DisplayHero>` + splash; W2/W3 owns. Note words consumer cleanup as a W5 ledger item." `.depth-text` IS now consumed via `<DisplayHero variation="depth">` (foundations/typography.vue exercises `variation="depth"`). The repurpose landed. **Coherent.**

### `--accent-pink` retained-without-consumer

W0 challenge cited "4 fourier-analysis component sites" as the reason to keep. Those four sites cannot be verified from this repo. The token is dead in-repo. **Recommendation: either delete now (per `feedback_no_backwards_compat` "no preserving for ledger projections") or cite a live evidence file at `docs/consumer-evidence/accent-pink.md` per the Refined-D verdict precedence.** Same applies to `--accent-red` (only 1 in-repo consumer beyond Prism's `token.deleted` mapping, but at least it has one).

### Wave-status references in source

The 11+ source files containing `G.W0`, `G.W1`, `G.W2`, `G.W3` / "user-direction overlay" / "silent-failure resolution" / "challenge §B.1" comments are wave-bookkeeping bleeding into the source-of-truth. The orchestrator's `npm run build` succeeds, but the source reads as in-flight, not as a closed tranche.

---

## 10. Final verdict distribution vs W5 overfitting audit

### W5 audit claimed:

- keep: ~72 artefacts.
- delete-unused (clean retirements): 3 (`--section-heading`, `:root[data-typography-preset="brand-uniform-sans"]`, `.gold-shimmer`).
- library-orphan: **0**.
- inline-and-remove: 0.
- keep-current: 0.
- demo-only-private: `_internal/blob-stress.vue`.

### G-audit-β finds (in-repo evidence only):

- keep: ~40-45 artefacts (mostly cream tokens, space-phi, the actively-storied components, headline utilities like `cream-surface`/`code-badge`/`well-dashed`/`prose-lettrine`, paper-card, math-inline-pill, the actively-consumed CVA branches).
- delete-unused: **~20 artefacts** — `.text-mono-body/-prose`, `.section-subtitle`, `.touch-gate-target/-active`, `.collapse-x`, `.text-formula`, `.production-rule` family, `.perf-number/-unit`, plus 5 dead CVA branches (`Tabs underline`, `Badge color`, `MetricBadge xl`, `ToggleGroupItem card`, `StatusDot progress`), plus tokens `--blob-grain-opacity`, `--blob-border-mix-contrast`, `--cartoon-accent-mix`, plus 7 dead section dividers.
- **library-orphan**: **~25 artefacts** — 3 components (`KeyboardShortcutsModal`, `TierBadge`, `LikeButton`), 3 composables (`useContrastSafeAccent`, `useMonacoTheme`, `useCollapse`), 4 blob sub-composables (`useBlobMood`/`useBlobPointer`/`useBlobSatellites`/`useMetaballRenderer` — independently exported), 4 slot-class/factory (`contentClass`, `closeIconClass`, `keepOpenWhile`, `defineDockActionBar`), 4 runtime helpers (`chartNeutrals`, `vizColorsHex`, `spectrumColor`, `goldenShimmer`), 7 shimmer/flourish utilities (`.text-shimmer-blue`, `.text-shimmer-vivid`, `.text-shimmer-pastel`, `.bg-rainbow-pastel`, `.text-rainbow-pastel`, `.flourish-stripe-{rainbow,pastel,gold}`).
- inline-and-remove: ~6 (`.confetti-piece`, `.formula-block`, `.math-display`, `.paper-rule`, `.rainbow-stroke`, `Button variant="transport"`).
- keep-current (single-site with semantic value): the cartoon-input/select/number-field variants, the icon-{xs..mega} ladder family.

### Divergence count

The W5 audit and this audit disagree on **~50 artefacts** — every "library-orphan: 0" claim is contradicted by ~25 actual library-orphans + ~20 delete-unused + ~6 inline-and-remove findings.

The root divergence: W5 credited consumer-ledger-projection sites toward the ≥2 bar without an evidence-doc per Refined-D verdict precedence, despite those projections being unverifiable from this repo.

---

## 11. Recommendations before declaring G's overfitting audit clean

### Tier 1 — must fix before any close

1. **Delete dead utilities** (or wire ≥1 in-repo consumer): `.text-mono-body`, `.text-mono-prose`, `.section-subtitle`, `.touch-gate-target`, `.touch-gate-active`, `.collapse-x`, `.text-formula`, `.production-rule` family, `.perf-number/-unit`. **10 utilities.**
2. **Delete dead CVA branches**: `Tabs variant="underline"`, `Badge variant="color"`, `MetricBadge size="xl"`, `ToggleGroupItem variant="card"`, `StatusDot variant="progress"`. **5 branches.**
3. **Delete or wire stories for** `KeyboardShortcutsModal`, `TierBadge`, `LikeButton`, OR add stories now and reclassify as keep-current with `docs/consumer-evidence/{name}.md` per Refined-D verdict precedence.
4. **Delete dead composables**: `useContrastSafeAccent`, `useMonacoTheme`, `useCollapse`. None has a consumer.
5. **Decide on slot-class props**: `contentClass`, `closeIconClass`, `keepOpenWhile`, `defineDockActionBar` need either a story (`navigation/dock-layers` could exercise `keepOpenWhile`; `containers/hover-card` could exercise `contentClass`) or an evidence doc. Otherwise delete.
6. **Decide on runtime helpers**: 4 of 5 are unused. Either consume them in demo charts (e.g., `motion/display-axes` could call `spectrumColor`) or move them to consumer presets.

### Tier 2 — clean breaks per `feedback_no_backwards_compat`

7. Delete `--accent-pink` (no in-repo consumer; W0 ledger-only retention contradicts the no-shims edict).
8. Delete `--blob-grain-opacity`, `--blob-border-mix-contrast`, `--cartoon-accent-mix` (defined-and-not-read).
9. Delete `.divider-flourish-section-{1,4,7,8,10,11,12}` OR widen the flourishes story matrix to cover all 13.

### Tier 3 — idiomatic cleanup

10. Collapse `useRAFLoop` + `useRafLoop` into one canonical name + signature; delete the redundant export.
11. Hide `useBlobMood`/`useBlobPointer`/`useBlobSatellites`/`useMetaballRenderer` under `composables/blob/_internal/` (or absorb into `useBlob` as factory parameters). Currently 4 public composables that nobody but `useBlob` consumes.
12. Scrub `G.W{0..5}` / "user-direction overlay" / "silent-failure resolution" / "Per G.W0 challenge" comment annotations from `src/styles/*.css`, `src/index.ts`, `src/tokens.ts`, `src/composables/blob/blob.{frag,vert}.glsl`, `src/components/ui/card/index.ts`. Source should read as a clean state per `feedback_writing_style`.

### Tier 4 — substrate decisions

13. The per-rung `--font-display-{1..5,mega,ultra}-variation-settings` 7-token expansion is internal coupling masquerading as public surface. Either inline values into the 7 `@utility text-display-{N}` blocks (no tokens) or commit to per-rung-tokens as documented design with a clear rationale. The current 1:1 coupling is the cost of both choices, none of the benefits.

14. The paper-tier tokens (`--paper-bg-{1..4}`, `--paper-shadow-{1..4}`, `--paper-border-{1..4}`) bottom out at `paper.css`'s `.paper-N` rules. Each utility has at most one demo. If the paper ladder is the design language's voice, broaden the consumer story; if not, collapse to a single `paper.css` recipe with custom-property overrides per `[data-paper-tier="N"]`.

---

## Authority

Read-only audit by G.audit.β. Every count cites an `rg` invocation. The audit's bar is the `feedback_overfitting_audit` ≥2 in-repo call sites, applied per Refined-D verdict precedence (no ledger projections without an evidence doc). Where the W5 close audit credited cross-consumer ledger projections, this audit does not — and finds the bar fails for ~50 artefacts.

The tranche should not declare clean until Tier 1 + Tier 2 are addressed.
