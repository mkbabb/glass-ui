# Lens B3 — Encapsulation Quality of the Component / Composable Surfaces

**Audit #3 (RESPEC-GESTALT), pass 1.** Branch `tranche/BG`, HEAD `976dc890`, verified on disk 2026-07-01.
Scope: (1) prop-shape grammar consistency; (2) leaky boundaries; (3) the composables tree; (4) the
76→95-entry subpath + root-barrel import story. All claims cite `file:line`.

---

## Verdict

The library's encapsulation is **half-excellent, half-incoherent, and the incoherent half is exactly the
gestalt-critical half.** The token-first retint idiom is genuinely pervasive and disciplined — `:deep()` has
been driven down to a **single** real reach in `src/` (`LabeledField.vue:183`), and there are **176**
`var(--token, fallback)` consumer-retint seams across component CSS. That is real, hard-won encapsulation and
it is a strength to defend, not touch.

But the **prop-shape grammar is fragmented at the identity layer.** The same five cross-cutting concepts —
`surface`, `tier`, `variant`, `density`, `size` — are each expressed through 3–5 mutually-incompatible TypeScript
types, and in two cases the SAME prop NAME carries two unrelated meanings on sibling components. The worst case is
structural: **`Card` and `GlassPanel`, the two flagship glass surfaces, invert each other's vocabulary** — the
visual-elevation rung is `Card.tier` but `GlassPanel.variant`, while the word `tier` means "render backend" on
`GlassPanel` and "visual rung" on `Card`. A consumer who learns one cannot read the other. CLAUDE.md asserts the
surface axis is "factored ONCE" and "NO second axis is possible" (`proof:surface-axis W1`), yet `CardSurface`,
`SkeletonSurface`, and `BadgeVariants['surface']` are each a *different* private union that does not include the
canonical `Surface` type's members — the "one axis" claim is prose the disk contradicts.

Separately, the **import story is un-dogfooded**: the 156-page demo — the only in-repo consumer, the gestalt
showcase — imports **zero** times from the published `@mkbabb/glass-ui/*` subpath surface. It reaches
`@glass/components/ui/button`, `@glass/components/custom/icon-chip`, `@glass/composables/motion/useBloomUp` — a raw
`src/*` alias into deep internal paths. The entire BH B2 export-restructure band is reshaping a 95-entry API surface
that no in-repo consumer exercises, so its consumer-coherence is asserted only by gates, never by use.

This is the user's critique made concrete: **N locally-correct component APIs, not one designed grammar.**

---

## Findings (ranked by severity)

### F1 (MAJOR) — `Card` vs `GlassPanel`: the flagship glass surfaces invert each other's vocabulary

Two sibling glass-surface components name the same concepts with opposite words, and overload one word across two
concepts:

| concept | `Card` | `GlassPanel` |
|---|---|---|
| visual elevation rung (wash…overlay) | **`tier`** = `CardTier` (`Card.vue:66`) | **`variant`** = `GlassPanelVariant` (`GlassPanel.vue:50`) |
| render backend (`svg-filter`/`css`/`fallback`) | — | **`tier`** = `GlassTier` (`GlassPanel.vue:42`) |
| material decoration (glass/veil/opaque) | `surface` = `CardSurface` (`Card.vue:74`) | `surface` = `Surface` (`GlassPanel.vue:56`) |

- `Card.vue:66` — `tier?: CardTier` is the **visual rung**.
- `GlassPanel.vue:42` — `tier?: GlassTier` imported from `composables/glass/useGlassRenderer.ts:3`, where
  `GlassTier = "svg-filter" | "css" | "fallback"` — a **render-backend** preference. Its own header comment
  (`GlassPanel.vue:10-14`) admits: "it had `tier`/`variant` only… `variant` (the 5-rung CSS-tier selector) and
  `tier` (the renderer preference)."

So `tier` is a **homonym** (visual rung on Card, render backend on GlassPanel) and the visual-rung concept has
**three names** across the codebase: `CardTier` (Card.vue:35), `GlassPanelVariant` (the `variant` prop), and a
THIRD canonical `SurfaceTier = "wash"|"quiet"|"resting"|"floating"|"overlay"` that already exists in
`_shared/useSurfaceAxis.ts:53` but which neither component's prop is typed against. A consumer cannot transfer
knowledge between the two most-used glass surfaces. This is the single clearest "not one designed product" defect.

### F2 (MAJOR) — the `surface` axis is NOT factored once; four private unions + a boolean homonym

CLAUDE.md: "surface is a single SHARED axis — minted once… NO second axis is possible: a consumer wave forking its
own three-rung surface recipe fails `proof:surface-axis W1`." Disk contradicts this on five surfaces:

- Canonical: `Surface = "glass" | "veil" | "opaque" | "clear"` (`_shared/useSurfaceAxis.ts:42`).
- `CardSurface = "glass" | "cartoon" | "veil"` (`Card.vue:61`) — **missing `opaque` AND `clear`, adds `cartoon`.**
- `SkeletonSurface = "glass" | "opaque"` (`Skeleton.vue:38`) — a private 2-member subset, not `Surface`.
- `BadgeVariants['surface']` (`Badge.vue:15`) — a CVA-derived surface, a fifth shape.
- `surface?: boolean` (`TabsIndicator.vue:17`) — **the prop NAME collides on a boolean**: here `surface` means
  "paint the plate or not," semantically unrelated to the material axis.

The consequence is a real gestalt hole: **Card cannot express `surface="opaque"` or `surface="clear"`** even though
it composes the identical `.glass-opaque` decoration through its `tier` axis. So the same visual outcome (an opaque
plate) is reached by `surface="opaque"` on Dialog/Sheet but `tier="opaque"` on Card — the axis a consumer uses
depends on the component, defeating the "one axis" intent. And `cartoon` — which Card carries on the surface union
— is orthogonal decoration that overlaps `shadow`/`grain` (Card.vue:67-73 admits "Orthogonal to `tier`/`shadow`/
`grain`"), so it does not belong on the material-decoration axis at all.

Doc/disk drift rider: CLAUDE.md's prose describes the axis as three-member (`glass·veil·opaque`) throughout; disk
is four-member (`clear` added at BE.W-CLEAR-VARIANT, `useSurfaceAxis.ts:42`). The gate `proof:surface-axis` (342
scripts scanned; line 362) only checks that DialogContent dropped its binary `variant` — it does **not** assert
Card/Skeleton/Badge unify onto `Surface`, so the "factored once" invariant is gate-vacuous for the three divergent
surfaces.

### F3 (MAJOR) — `density` is three incompatible unions for one concept

- `MetricPillDensity = "comfortable" | "spacious"` (`MetricPill.vue:25`) — 2 members.
- `ConfiguratorDensity = "mobile" | "compact" | "comfortable" | "spacious"` (`configurator/density.ts:19`) — 4.
- `DockDensity = "compact" | "comfortable" | "spacious" | "audacious"` (`dock/composables/useDockShellProps.ts:21`)
  — 4, but a **different** set (`audacious`, no `mobile`).

Three density scales, three member sets, overlapping only on `comfortable`/`spacious`. There is no `DensityScale`
canon; each family re-invented the axis. A single ordered `DensityScale =
"mobile"|"compact"|"comfortable"|"spacious"|"audacious"` with per-component *subset* constraints (a TS
`Extract<DensityScale, …>`) would give one grammar and let the density-token cascade (`--density`, the
`@container style()` companion) resolve uniformly.

### F4 (MAJOR) — `size` has ≥5 shapes and ≥3 overlapping-but-divergent scales

- Shared: `ControlSize = "sm" | "default" | "lg"` (`_shared/useControlSize.ts:34`) — used by **9** files (the form
  family: Input/Textarea/NumberField/Select/etc.). This is the ONE good shared axis and the model to generalize.
- CVA-derived, each independent: `ButtonVariants['size']`, `SliderVariants['size']`, `ToggleVariants['size']`,
  `AvatarVariants['size']`, `BadgeVariants['size']`, `ToggleGroupVariants['size']` — no shared scale. Members drift:
  Toggle uses `default|sm|lg` (same members as ControlSize but a *different type*), Avatar `sm|base`, Badge `sm|md`.
- Bespoke named: `MetricPillSize`, `MetricBadgeSize`, `DarkModeToggleSize`, `SelectableChipVariants["size"]`.
- Inline literal: `SelectTrigger size?: 'sm' | 'default' | 'display' | 'audacious'` (a two-range axis mixing height
  AND font-rung on one prop — itself an encapsulation smell), IconChip `size?: "sm" | "md"`, and a `"sm"|"md"|"lg"`.
- Raw number (px): `size?: number` on several viz/chip components.

One concept, five type-families. The form family's `ControlSize` proves the shared-axis pattern works; nothing else
adopts it.

### F5 (MAJOR) — the import story is un-dogfooded; the demo bypasses the published surface entirely

`vite.config.ts:20-22` defines `"@glass" → resolve(__dirname, "src")`. Every one of the 156 demo pages imports via
this raw-source alias into deep internal paths — the top reaches:

```
45  @glass/components/custom/icon-chip
44  @glass/components/ui/button
27  @glass/components/custom/aurora
 6  @glass/composables/motion/useBloomUp   ← reaches an individual composable file
```

`grep` for the bare public barrel across all of `demo/`: **0 imports of `@mkbabb/glass-ui`**, **1 of any
`@mkbabb/glass-ui/*` subpath**. So:

- The 95-entry published subpath API (`package.json` exports: **96 keys / 95 subpaths**, verified) is exercised by
  **no in-repo consumer**. Its coherence rests entirely on gates (`proof:subpath-enumeration`,
  `verify-export-types`), never on use.
- The demo reaches down to *individual SFCs and composable files* (`@glass/components/ui/button/Button.vue`-depth),
  so the barrel curation (which symbol is public, which subpath owns it) is untested by the showcase.
- The alias's own comment (`vite.config.ts:13-17`) frames it as decoupling "the demo's deep-relative `../../src/…`
  imports" — i.e. the demo ALWAYS reached into src internals; the alias only tidied the relative depth of the reach.

This is directly lens-mandate #4: the consumer import story is not merely "possibly incoherent" — it is
**unvalidated**, because the one consumer that could validate it opts out. BH's B2 export-restructure is
reshaping an API whose real-world ergonomics nothing in-repo tests.

### F6 (MINOR) — CLAUDE.md subpath counts are stale by ~20 entries

CLAUDE.md prose repeatedly says "76 flat JS subpaths" / "73 entries total" / "72 JS subpath exports at HEAD."
Disk: `package.json` exports = **96 keys (95 subpaths)**; `src/subpaths/*.ts` = **79 mirror barrels**. The prose
trails the gate by ~20 entries. (BH B2 is aware the mirror dir dies; the count staleness is a "distrust doc claims"
data point — the number in the identity doc is wrong by a quarter.)

### F7 (MINOR) — `/api` is a 505-line god-module discovery layer; the third redundant export tier

`src/api/index.ts` is **505 lines** (`wc -l`), a >500-line god-module re-declaring the "canonical public types +
constants." Combined with the 79 mirror barrels (`src/subpaths/`, a pure indirection: `subpaths/aurora.ts` →
`components/custom/aurora/index.ts`) and the colocated dir barrels, that is the **three-tier export redundancy** BH
research already found (`lane-zeta-backbone.md §3.2, §3.5`). This finding CONFIRMS + EXTENDS it toward the quality
judgment: the redundancy is not just mechanical bloat — the `/api` layer is where the type-grammar fragmentation
(F1–F4) is *published*, so folding `/api` into per-subpath typed surfaces is the natural moment to unify the
grammar rather than re-publish the fragments.

### F8 (MINOR) — the `data-part`/`data-mode` "::part()-analogue" is a stringly-typed consumer seam with no TS

`ExpandableContainer` exposes a light-DOM `::part()` analogue: consumers re-skin via a plain descendant selector on
`data-part="trigger|overlay|panel"` + `data-mode="expand|collapse"` (authored at the six sites the grep found).
This is a documented feature, but it is a **stringly seam a consumer must memorize with zero type surface** — there
is no exported `ExpandableContainerPart` union a consumer can import to know the legal strings. Of the **71**
distinct `data-*` attributes authored across components, this is the one promoted to a consumer contract; it should
carry an exported type. (Low severity — one component — but it is the template for how NOT to publish a seam.)

### Positive controls (defend these — do not "fix")

- `:deep()` is down to **one** real reach (`LabeledField.vue:183`); every other mention is a comment documenting
  its deliberate avoidance in favor of `var(--token, fallback)`. This is genuine encapsulation discipline.
- **176** `var(--token, fallback)` retint seams — the component-over-CSS-class axis (Design Axis 2) is real.
- `ControlSize` shared across the 9-file form family is the proof that a single cross-component axis works; it is
  the pattern F3/F4 should generalize, not a thing to change.
- Every `custom/` dir has an `index.ts` barrel (colocation is complete) — Option-A entry-glob (BH ζ) is unblocked.

---

## Fold candidates (for the BG/BH amended plan)

### FC1 — NEW WAVE: `W-PROP-GRAMMAR` — the unified cross-component axis vocabulary (aligns with BH B2)

**Gestalt approach, not a patch.** Mint five canonical axis types ONCE in `_shared/` and constrain every component
to a subset of the canon rather than a private union:

- `SurfaceTier` already exists (`useSurfaceAxis.ts:53`) — make it THE visual-rung type. Rename `Card.tier`'s type
  to compose it (`CardTier = SurfaceTier | "opaque" | "deep" | "cartoon"` as an explicit superset), and **rename
  `GlassPanel`'s visual-rung prop from `variant` to `tier`** (clean break, no alias — matches the no-legacy
  precept), and **rename `GlassPanel`'s render-backend prop off `tier`** (e.g. `renderTier`/`backend`) to kill the
  homonym (F1).
- Fold `CardSurface`/`SkeletonSurface`/`BadgeVariants['surface']` onto the canonical `Surface`; move `cartoon` off
  the surface union onto its own decoration axis (it is already orthogonal to shadow/grain). This makes
  `proof:surface-axis W1`'s "factored once" claim TRUE on disk (F2). Rename `TabsIndicator`'s boolean `surface` to
  `plate` to end the homonym.
- Mint `DensityScale = "mobile"|"compact"|"comfortable"|"spacious"|"audacious"`; each family types its prop as an
  `Extract<DensityScale, …>` subset (F3).
- Generalize `ControlSize` into a `SizeScale` the CVA `size` variants are typed against; drop the per-CVA
  divergent member sets (F4).

This is one wave because the five axes share ONE mechanism (canonical union in `_shared` + subset-Extract per
component) and ONE gate (`proof:prop-grammar`: assert no component declares a private surface/tier/density union;
assert no prop-name homonym). **Sequence it BEFORE / INTO BH B2's `/api` fold** — the moment `/api` dies and each
subpath publishes its own typed surface (F7) is exactly when the grammar must already be unified, or B2 re-publishes
the fragments. Visual impact is near-zero (renames + type-narrowing), so no Fable design arm needed — mechanical
audit/build work.

### FC2 — AMEND BH B2 export band: add the DOGFOOD clause (`W-DEMO-DOGFOODS-SURFACE`)

**Gestalt approach.** The export restructure must be validated by a real consumer, not only by gates. Amend the B2
band so that after the mirror-dir dies and the entry-glob lands, a **representative demo slice re-points from
`@glass/*` (raw src) to the published `@mkbabb/glass-ui/*` subpaths** — turning the demo into the first real
subpath consumer. This closes F5: the import-story coherence gets exercised by use, and a broken barrel curation
(a symbol on the wrong subpath, a subpath that fails to resolve) surfaces in the demo build, not only in a gate.
Keep the `@glass` alias for internal-only demos (e.g. viz-substrate stress pages), but the component/gestalt pages
consume the public surface. This is the single highest-leverage encapsulation repair and it costs one convention +
a lint, not a rewrite.

### FC3 — MERGE into FC1: publish the `data-part` seam as a type (`ExpandableContainerPart`)

Fold F8 into the grammar wave: any `data-*` promoted to a consumer contract exports its literal-union type from the
component's barrel, so the light-DOM `::part()` analogue has a TS surface. Small, but it sets the rule for future
seams (the `data-cta-pending`/`data-surface` family should follow), so it belongs in the grammar-canon wave rather
than as a lone edit.

### FC4 — PLAN-DOC-EDIT: reconcile the CLAUDE.md subpath count + surface-member drift before the CLAUDE.md delete

F6 + the F2 doc drift (`Surface` is 4-member on disk, 3-member in prose). BH plans to DELETE CLAUDE.md and
redistribute canon to per-component READMEs / docs-canon. Fold a clause: the redistribution must carry the
**correct** numbers (95 subpaths, 4-member Surface incl. `clear`) — do not copy the stale figures forward. This is
a plan-doc edit, not a wave, but it must be booked or the drift survives the delete.

### FC5 — DEFER-HONEST: the specular family (`createSpecularWriter` + `vSpecular` + `useSpecularPointer` +
`useSpecularTracking`) is four names for one write-source

Noted for completeness: `composables/glass/` ships four specular symbols. CLAUDE.md justifies this as ONE
position-write core delivered three ways (directive / :style-ref / angle-adding wrapper), and the count is
defensible (each is a distinct delivery surface with a real consumer). **Keep booked, no action** — flag only so a
future consolidation pass does not "discover" it as sprawl and collapse a legitimate delivery seam. This is a
defer-honest, not a fold.
