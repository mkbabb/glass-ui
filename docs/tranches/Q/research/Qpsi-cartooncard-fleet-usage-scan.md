# Qψ — `<CartoonCard>` + cartoon-surface fleet-wide consumer-usage scan

**Round**: Q audit-augmentation round-5
**Charter**: produce the complete fleet-wide usage map of `<CartoonCard>` + the cartoon surface so the Q wave specs can fully specify every consumer migration with zero sites missed, whatever sibling Qχ concludes on the DEMOTE-to-Card-variant question.
**Method**: read-only. Broad grep across all 6 consumers + glass-ui demo, every form (`<CartoonCard`, `CartoonCard` import, `cartoon-card` subpath, `variant="cartoon"`, `.cartoon-card` / `.glass-cartoon` / `.elevated-card` class, `--shadow-cartoon` / `--cartoon-*` / `--glass-*-cartoon` tokens, `tier="cartoon"`).

---

## Headline findings (read before the tables)

1. **The `.cartoon-card` CSS class no longer exists in glass-ui.** It was deleted at C.W5 (`glass-ui` commit `304ac78` — "remove ScrollArea, ScrollPane, .cartoon-card, .elevated-card, .dock-play-btn"). `src/styles/cards.css` line 1 documents the removal; `src/styles/index.css:39` still carries a stale comment claiming cards.css ships `.cartoon-card` + `.elevated-card` (itself a doc bug). The canonical replacement is the `<CartoonCard>` component (resolves through the `.glass-cartoon` utility in `glass.css`).

2. **fourier-analysis has 20 sites applying `class="cartoon-card"` to a bare `<div>`/`<button>`.** Since the class is deleted from glass-ui and fourier defines no local `.cartoon-card` recipe (verified — `web/src/style.css` only `@import "@mkbabb/glass-ui/styles"`, no `@utility cartoon-card`), all 20 sites are **dead CSS** — the class resolves to nothing and the cartoon surface (2px border + offset shadow + hover-lift) is silently absent. This is a live cosmetic regression, not a stylistic preference. Three of the 20 sites layer a fourier-local size-only extension class (`.levels-card`, `.config-card`, `.eq-card` — padding/height only; they do NOT re-supply the surface visuals).

3. **bbnf-buddy `AnimationWorkspace.vue:157` passes `:variant="props.inline ? 'default' : 'cartoon'"` to `<Card>`.** glass-ui's `<Card>` has **no `variant` prop at all** — only `tier` / `shadow` / `grain` (verified in `src/components/ui/card/Card.vue`). The `variant` attribute is silently swallowed as a passthrough HTML attr — the cartoon surface never renders. This is the known `AnimationWorkspace.vue:157` site; the scan confirms it is the **only** stale-`variant="cartoon"` site fleet-wide (the bbnf 7-site `<Card variant>` corpus that Q.W2 owns is the `pane`/other-variant family — see Qξ; this one cartoon-valued site is one of those 7).

4. `<CartoonCard>` component proper has **zero** consumer adoptions fleet-wide. Its only usage is the glass-ui demo story `demo/stories/primitives/cartoon-card.vue` (3 element sites + 1 import). The component is on the public root barrel (`src/index.ts:90`, via `ui/index.ts:7`) — so consumers CAN import `{ CartoonCard } from "@mkbabb/glass-ui"`, but none do.

5. The `--glass-{bg,blur,border}-cartoon` surface tokens are **not defined** in glass-ui's `tokens.css`. `.glass-cartoon` and bbnf's `LayersPanel.vue` `.drag-preview` both reference them via `var(--glass-bg-cartoon, var(--glass-bg-quiet))` fall-through, so they resolve to quiet-tier defaults. bbnf's LayersPanel is therefore TOKEN-ONLY and renders correctly via fall-through — not a regression, no migration needed.

6. No consumer's own tranche has migrated or scheduled a cartoon-surface migration. fourier Tranche A waves W2/W5 *mention* `cartoon-card` but both treat it as a still-live glass-ui surface to *adopt onto* (W5: "re-surface rows on `cartoon-card`") — written against the pre-C.W5 reality and never reconciled. So those tranche references are stale, not owning.

---

## Section 1 — Per-consumer usage table

Classification key: **COMPONENT** = `<CartoonCard>` proper · **STALE-VARIANT** = `<Card variant="cartoon">` (swallowed) · **RAW-CLASS** = `.cartoon-card`/`.glass-cartoon` applied to a bare element · **TOKEN-ONLY** = cartoon token without the full surface.

### keyframes.js — `/Users/mkbabb/Programming/keyframes.js/`

No hits. No cartoon-surface usage of any form.

### value.js — `/Users/mkbabb/Programming/value.js/`

No cartoon-surface hits. (`shadow-cartoon-sm`/`-md` Tailwind shadow-utility appears in `demo/@/components/custom/palette-browser/` swatch elements and `demo/@/styles/style.css` token overrides — these are the cartoon *shadow scale*, not the cartoon *surface*; out of charter scope, no migration implication.)

### fourier-analysis — `/Users/mkbabb/Programming/fourier-analysis/`

| # | file:line | form | classification | consumer-tranche-owned |
|---|-----------|------|----------------|------------------------|
| 1 | `web/src/components/visualization/ContourSettings.vue:187` | `<div class="cartoon-card px-3 py-2">` | RAW-CLASS (dead) | no |
| 2 | `web/src/components/visualization/BasisSelector.vue:109` | `<div class="cartoon-card px-3 py-2">` | RAW-CLASS (dead) | no |
| 3 | `web/src/components/visualization/BasisCanvas.vue:478` | `class="canvas-container cartoon-card"` | RAW-CLASS (dead) | no |
| 4 | `web/src/components/visualization/EditorToolsPanel.vue:18` | `<div class="cartoon-card px-3 py-2">` | RAW-CLASS (dead) | no |
| 5 | `web/src/components/visualization/ImageUpload.vue:38` | `class="cartoon-card px-3 py-2 relative"` | RAW-CLASS (dead) | no |
| 6 | `web/src/components/visualization/ContourPreview.vue:33` | `<div class="cartoon-card px-3 py-2">` | RAW-CLASS (dead) | no |
| 7 | `web/src/components/visualization/CoefficientsPanel.vue:40` | `<div class="cartoon-card px-3 py-2">` | RAW-CLASS (dead) | no |
| 8 | `web/src/components/visualization/VisualizationView.vue:160` | `<div class="mx-auto max-w-md cartoon-card p-6 ...">` | RAW-CLASS (dead) | no |
| 9 | `web/src/components/equation/EqCoefficientsPanel.vue:40` | `<div class="cartoon-card px-3 py-2">` | RAW-CLASS (dead) | no |
| 10 | `web/src/components/equation/FunctionInput.vue:92` | `<div class="cartoon-card px-3 py-2">` | RAW-CLASS (dead) | no |
| 11 | `web/src/components/equation/FunctionInput.vue:170` | `<div class="cartoon-card px-3 py-2">` | RAW-CLASS (dead) | no |
| 12 | `web/src/components/equation/EquationView.vue:228` | `<div class="cartoon-card p-4 max-w-md text-center">` | RAW-CLASS (dead) | no |
| 13 | `web/src/components/equation/EquationView.vue:237` | `<div v-if="computing" class="cartoon-card px-3 py-2 ...">` | RAW-CLASS (dead) | no |
| 14 | `web/src/components/equation/EquationView.vue:241` | `<div v-else-if="error" class="cartoon-card px-3 py-2 ... border-red-500/30 ...">` | RAW-CLASS (dead) | no |
| 15 | `web/src/components/equation/EquationView.vue:249` | `class="cartoon-card relative eq-card"` (+ local size-only `.eq-card`) | RAW-CLASS (dead) | no |
| 16 | `web/src/components/equation/EquationView.vue:303` | `<div class="cartoon-card px-3 py-2 flex-1 ...">` | RAW-CLASS (dead) | no |
| 17 | `web/src/components/equation/InfoCard.vue:17` | `<div class="cartoon-card px-3 py-2 space-y-2">` | RAW-CLASS (dead) | no |
| 18 | `web/src/components/morph/HarmonicLevelGrid.vue:2` | `<div class="cartoon-card levels-card">` (+ local size-only `.levels-card`) | RAW-CLASS (dead) | no |
| 19 | `web/src/components/morph/MorphShapePreview.vue:4` | `<button class="morph-button cartoon-card" ...>` | RAW-CLASS (dead) | no |
| 20 | `web/src/components/morph/MorphPhaseConfig.vue:2` | `<div class="cartoon-card config-card">` (+ local size-only `.config-card`) | RAW-CLASS (dead) | no |
| T1 | `web/src/components/visualization/gallery/GalleryCard.vue:151` | `box-shadow: var(--shadow-cartoon);` | TOKEN-ONLY | no |
| T2 | `web/src/components/visualization/gallery/GalleryCard.vue:161` | `box-shadow: var(--shadow-cartoon-hover);` | TOKEN-ONLY | no |

Notes: sites 15/18/20 each combine the dead `.cartoon-card` with a fourier-local class that supplies *only* padding/height (`.eq-card` = height/overflow; `.levels-card` / `.config-card` = padding) — they do not back-fill the lost surface. `--shadow-cartoon` / `--shadow-cartoon-hover` (T1/T2) are still-live glass-ui tokens (`tokens.css §` "Tiered cartoon shadows") — T1/T2 render correctly; listed for completeness, no migration.

### words — `/Users/mkbabb/Programming/words/`

No cartoon-surface hits. (`words/frontend` uses `shadow-cartoon-sm/-md/-lg` shadow-utility extensively across the search/sidebar chrome — cartoon *shadow scale*, not the cartoon *surface*; out of scope. `StarIcon.vue:13` has a "cartoon-like star" code comment — not a surface.)

### bbnf-buddy — `/Users/mkbabb/Programming/bbnf-buddy/`

| # | file:line | form | classification | consumer-tranche-owned |
|---|-----------|------|----------------|------------------------|
| 1 | `src/editor/components/animation/AnimationWorkspace.vue:157` | `<Card :variant="props.inline ? 'default' : 'cartoon'" ...>` | STALE-VARIANT | no |
| T1 | `src/editor/components/LayersPanel.vue:367-370` | `.drag-preview { background: var(--glass-bg-cartoon); backdrop-filter: var(--glass-blur-cartoon); border: 1px solid var(--glass-border-cartoon); }` | TOKEN-ONLY | no |

Notes: site 1 — `<Card>` is imported from `@mkbabb/glass-ui` (`AnimationWorkspace.vue:13`); `<Card>` has no `variant` prop, so `variant` is a silently-swallowed passthrough attr. This is one of bbnf's 7 stale `<Card variant>` sites already inside Q.W2's migration corpus. T1 — bbnf's `.drag-preview` references the undefined `--glass-{bg,blur,border}-cartoon` tokens; they fall through to quiet-tier defaults (the `var(x, fallback)` pattern `.glass-cartoon` uses) — renders fine, no migration.

### speedtest — `/Users/mkbabb/Programming/speedtest/`

No cartoon-surface hits of any form. No `<CartoonCard>`, no `.cartoon-card`, no `variant="cartoon"`, no cartoon tokens in `src/`.

### glass-ui demo — `/Users/mkbabb/Programming/glass-ui/demo/`

| # | file:line | form | classification | tranche-owned |
|---|-----------|------|----------------|---------------|
| 1 | `demo/stories/primitives/cartoon-card.vue:3` | `import { CartoonCard } from "../../../src/components/ui/cartoon-card"` | COMPONENT (import) | demo-private |
| 2 | `demo/stories/primitives/cartoon-card.vue:51` | `<CartoonCard ...>` | COMPONENT | demo-private |
| 3 | `demo/stories/primitives/cartoon-card.vue:79` | `<CartoonCard class="flex flex-col gap-4 p-6">` | COMPONENT | demo-private |
| 4 | `demo/stories/primitives/cartoon-card.vue:103` | `<CartoonCard as="article" class="p-6">` | COMPONENT | demo-private |
| 5 | `demo/stories/manifest.ts:104` | story registration `s("primitives","cartoon-card","Cartoon Card", ...)` | COMPONENT (story meta) | demo-private |

Notes: the demo `cartoon-card` story is the canonical `<CartoonCard>` showcase and the component's only consumer fleet-wide. (`demo/stories/primitives/slider.vue` + `sliders/glass-scrubber.vue` reference `variant="glass-cartoon"` — that is the **Slider** `glass-cartoon` variant, an unrelated primitive; not the cartoon card surface. `demo/configurator/preset-editor/*` `cartoonShadow` field toggles `--shadow-card` / `--shadow-card-hover` — the cartoon shadow scale, not the surface. Both out of charter scope.)

---

## Section 2 — Fleet totals

| Consumer | COMPONENT | STALE-VARIANT | RAW-CLASS | TOKEN-ONLY | total in-scope |
|----------|-----------|---------------|-----------|------------|----------------|
| keyframes.js | 0 | 0 | 0 | 0 | 0 |
| value.js | 0 | 0 | 0 | 0 | 0 |
| fourier-analysis | 0 | 0 | **20** | 2 | 22 |
| words | 0 | 0 | 0 | 0 | 0 |
| bbnf-buddy | 0 | **1** | 0 | 1 | 2 |
| speedtest | 0 | 0 | 0 | 0 | 0 |
| glass-ui demo | 5 | 0 | 0 | 0 | 5 |
| **GRAND TOTAL** | **5** | **1** | **20** | **3** | **29** |

- **STALE-VARIANT: 1 site** — bbnf-buddy `AnimationWorkspace.vue:157`.
- **RAW-CLASS: 20 sites** — all fourier-analysis, all dead CSS (class deleted at glass-ui C.W5).
- **TOKEN-ONLY: 3 sites** — fourier `GalleryCard.vue` ×2 (live `--shadow-cartoon*`, render fine); bbnf `LayersPanel.vue` `.drag-preview` (undefined `--glass-*-cartoon`, fall-through to quiet-tier). None need migration.
- **COMPONENT: 5 sites** — all glass-ui demo-private (the canonical `cartoon-card` story). No consumer adoption.

Migration-relevant total = **21 sites** (1 STALE-VARIANT + 20 RAW-CLASS). TOKEN-ONLY and COMPONENT carry zero migration debt.

---

## Section 3 — Migration scope (both Qχ branches)

The 21 migration-relevant sites need a write under **either** Qχ verdict. The only difference between branches is the *target identifier*, not the *site set* — every RAW-CLASS and STALE-VARIANT site migrates regardless.

### Branch A — Qχ verdict = DEMOTE (`<CartoonCard>` becomes `<Card variant="cartoon">` / `tier`-style)

All 21 sites migrate to the demoted Card API.

- **bbnf-buddy ×1** — `AnimationWorkspace.vue:157` already *writes* `variant="cartoon"`. Under DEMOTE this becomes a *valid* prop. The migration is: keep `:variant="props.inline ? 'default' : 'cartoon'"` as-is **iff** the demoted variant name is exactly `cartoon`; otherwise rename to whatever Qχ canonicalises. Either way the W2 fail-explicit-props change (invariant 31) means the attribute must become a *declared* `<Card>` prop or the build breaks — so this site is touched by W2 no matter what.
- **fourier-analysis ×20** — replace each `<div class="cartoon-card ...">` / `<button class="... cartoon-card">` with `<Card variant="cartoon" class="...non-cartoon utility classes...">` (and `as="button"` for site 19 `MorphShapePreview.vue`). Drop the dead `cartoon-card` token from the class list; preserve `px-3 py-2` / `p-6` / layout utilities. For sites 15/18/20 keep the local `.eq-card`/`.levels-card`/`.config-card` size classes via `:class` / `class` passthrough.

### Branch B — Qχ verdict = KEEP (`<CartoonCard>` stays a standalone sibling component)

All 21 sites migrate to `<CartoonCard>`.

- **bbnf-buddy ×1** — `AnimationWorkspace.vue:157` becomes conditional component selection, not a variant prop. Recommended shape: `<component :is="props.inline ? Card : CartoonCard">` (with `Card` getting `tier="wash"` / `:grain="false"` for the inline branch per the W2 canonical recipe), `import { CartoonCard } from "@mkbabb/glass-ui"`. This *removes* the swallowed `variant` attr — required anyway once W2 makes Card fail-explicit on unknown props.
- **fourier-analysis ×20** — replace each bare-element-with-`.cartoon-card` with `<CartoonCard class="...remaining utilities...">`; `import { CartoonCard } from "@mkbabb/glass-ui"` per file (10 files). Site 19 (`MorphShapePreview.vue`) needs `<CartoonCard as="button" @click=... :disabled=...>` — `<CartoonCard>` is a reka-ui `Primitive` and accepts `as`, verified in `CartoonCard.vue`. Sites 15/18/20 keep their local size-extension class via the `class` passthrough (`cn()` merges it).

### Common to both branches

The dead `.cartoon-card` token must be deleted from every fourier class list — leaving it is harmless but is phantom-class debt that Q.W4's "fleet-wide phantom-class corpus = zero sites" gate explicitly forbids. The stale `src/styles/index.css:39` glass-ui comment ("cards.css — .cartoon-card, .elevated-card") should also be corrected — minor glass-ui doc fix, fold into W4 Lane A-E (style/token co-location).

---

## Section 4 — Consumer-tranche reconciliation

| Consumer | own tranche | cartoon site owned by it? | Q must own? |
|----------|-------------|---------------------------|-------------|
| keyframes.js | none (`docs/tranches/` absent) | n/a — no sites | n/a |
| value.js | A / B / C | no — no cartoon-surface sites; tranche A research mentions `--shadow-cartoon*` only as glass-ui tokens not to re-declare | n/a |
| fourier-analysis | A / B | **no** — A/W2 + A/W5 *mention* `cartoon-card` but both treat it as a still-live glass-ui surface to adopt onto (W5: "re-surface rows on `cartoon-card`"). Written pre-C.W5, never reconciled to the deletion. fourier `git log` shows no commit touching the 20 sites. Tranche B has zero cartoon refs. | **YES — Q owns all 20** |
| words | none | no — no sites | n/a |
| bbnf-buddy | none (`docs/tranches/` absent) | no — no tranche exists | **YES — Q owns the 1 site** |
| speedtest | AA…AG (+ G…Z) | no — no sites; AF/AG tranches have zero cartoon refs | n/a |

Cross-reference: `Qφ` (value.js reconciliation) and `Qυ` (speedtest reconciliation) confirm neither repo carries cartoon-surface debt — consistent with this scan (0 sites each). `Qξ` (Card-pane-variant history) and `Qπ` (ScrollPane adjudication) establish the C.W5 deletion-of-recipes pattern; the `.cartoon-card` removal at `304ac78` is the same C.W5 cleanup commit — so the fourier dead-class corpus is the cartoon analogue of the phantom `.scroll-pane` / pane-variant class that Qξ/Qπ already mapped.

**Net: 0 sites owned by any consumer tranche. Q owns all 21 migration-relevant sites.** No duplication risk.

---

## Section 5 — Wave fold-in

| Sites | Wave | Lane | Rationale |
|-------|------|------|-----------|
| bbnf-buddy `AnimationWorkspace.vue:157` (STALE-VARIANT ×1) | **Q.W2** | Lane B (bbnf-buddy migration) | W2's hard gate already names "bbnf-buddy's 7 stale `<Card variant=>` sites migrated to `<Card tier="wash" :grain="false">` + `<CartoonCard>`". The cartoon-valued site is one of those 7 and W2 *already cites `<CartoonCard>`* as a target — this scan confirms it is the lone cartoon-valued member. No new lane needed; W2 Lane B spec must explicitly enumerate this site with the chosen Qχ-branch target. |
| fourier-analysis 20 RAW-CLASS dead-`.cartoon-card` sites | **Q.W4** | Lane F-I (consumer cosmetic sweep) | W4's hard gate already names "**fleet-wide phantom-class corpus = zero sites** (cluster C2 sweep across 4 consumers)". The 20 fourier `.cartoon-card` sites ARE phantom-class corpus (class deleted at glass-ui C.W5). They land in the fourier-analysis lane of the W4 F-I consumer-cosmetic block. W4 Lane F-I spec must add the fourier `.cartoon-card` → `<CartoonCard>` / `<Card variant="cartoon">` migration (Qχ-branch-dependent) as an explicit cluster, 10 files / 20 sites. |
| glass-ui `src/styles/index.css:39` stale comment | **Q.W4** | Lane A-E (style/token co-location) | One-line doc fix — the comment claims cards.css ships `.cartoon-card`/`.elevated-card`; both removed at C.W5. Fold into the W4 style-cleanup lane. |
| TOKEN-ONLY ×3 (fourier `GalleryCard` ×2, bbnf `LayersPanel` ×1) | — | none | No migration. `--shadow-cartoon*` are live tokens; `--glass-*-cartoon` fall through to quiet-tier. Listed for audit completeness only. |
| COMPONENT ×5 (glass-ui demo `cartoon-card` story) | — | none | Demo-private; correct usage. If Qχ verdicts DEMOTE, the demo story `cartoon-card.vue` + `manifest.ts:104` get rewritten as part of the glass-ui-side DEMOTE work (W2 Lane A or a Qχ-spawned lane) — flag for Qχ, not a consumer-migration item. |

**Per-wave migration counts:** Q.W2 — **1 site** (bbnf-buddy). Q.W4 — **20 sites** (fourier-analysis) + 1 glass-ui doc-comment fix. Total consumer-migration sites = **21**, spanning **2 waves**, **2 repos**, **11 files** (1 bbnf + 10 fourier).

---

## Appendix — evidence trail

- `.cartoon-card` deletion: `glass-ui` `git log -S'.cartoon-card' -- src/styles/cards.css` → `304ac78 chore(cleanup): remove ScrollArea, ScrollPane, .cartoon-card, .elevated-card, .dock-play-btn (C.W5)`.
- `<Card>` has no `variant` prop: `src/components/ui/card/Card.vue` — `Props` declares only `tier` / `shadow` / `grain` / `class` (+ `PrimitiveProps`).
- `<CartoonCard>` resolves through `.glass-cartoon`: `src/components/ui/cartoon-card/CartoonCard.vue` — `cn('glass-cartoon rounded-card ...')`, reka-ui `Primitive` (accepts `as`).
- `.glass-cartoon` recipe: `src/styles/glass.css:105-118` — 2px border, `var(--glass-bg-cartoon, var(--glass-bg-quiet))` fall-through, `--shadow-cartoon`, `:hover` lift.
- `--glass-*-cartoon` undefined: `grep -E 'glass-(bg|blur|border)-cartoon' src/styles/tokens.css` → no matches (fall-through by design, per `CartoonCard.vue` docstring).
- `CartoonCard` public export: `src/index.ts:90` (`export * from "./components/ui/cartoon-card"`), `src/components/ui/index.ts:7`.
- fourier defines no local `.cartoon-card`: `grep -E '\.cartoon-card\s*\{|@utility cartoon' web/` → no matches; `web/src/style.css:3` = `@import "@mkbabb/glass-ui/styles"` only.
