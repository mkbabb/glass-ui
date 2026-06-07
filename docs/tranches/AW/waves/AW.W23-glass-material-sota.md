# AW.W23 - Glass-material SOTA folds (gated Baseline-2025 capabilities)

## State

**Name**: W23 - Glass-material SOTA folds (gated Baseline-2025 capabilities)
**Opens after**: W22 (consumes the `.glass-material` mixin W22 mints; the squircle PE, chromatic dispersion, and adaptive tint all ride that one grammar rather than N opt-in classes) and W12 (backdrop staging — the folds only read over a busy backdrop)
**Agents**: 1 serial
**Hard gate** (`proof:glass-material-sota`): the four gated Baseline-2025 capabilities ship as LIBRARY assets, each behind its `@supports` gate with a documented fallback — (1) the `#glass-refract` convex-lens SVG filter exists as a shipped asset so `.glass-refract` works out-of-box, gated by `@supports (backdrop-filter: url(#…))`, blur the un-gated substrate; (2) `corner-shape: squircle` on `.glass-card`/`.glass-pill`/dock/dialog gated by `@supports (corner-shape: squircle)` with `border-radius` the un-gated fallback; (3) the chromatic edge-dispersion fringe gated `prefers-reduced-transparency: no-preference`; (4) the `--glass-tint-source` adaptive-tint `color-mix(in oklab,…)` recipe defaulting to warm-white zero-delta. Each gate clause + each fallback is asserted by a grep/computed-style probe: the `#glass-refract` filter node exists in a shipped CSS/SVG asset; every fold's decl sits INSIDE its `@supports` block and the un-gated base (`border-radius`, the blur, the warm-white tint) is unchanged when the gate is absent. Born RED on HEAD — none of the four assets exist (the `.glass-refract` garnish at HEAD requires a consumer-hand-mounted `#…` filter; there is no shipped `#glass-refract` node, no squircle decl, no chromatic fringe, no `--glass-tint-source`).

## 2a. Goal criterion

This wave succeeds if the four UNUSED Baseline-2025 glass capabilities ship as out-of-box library assets, each a `@supports`-gated progressive enhancement over a working fallback, so a consumer gets the iOS-26 Liquid Glass refraction/squircle/dispersion/content-tint reads on Chromium WITHOUT hand-mounting a filter or editing library source, and ZERO regression on Safari/Firefox (the gate falls back to today's render). The digest is explicit that glass-ui already has DEEP material — these are the gated Baseline-2025 capabilities left on the table, not from-scratch material. Every fold extends the W22 `.glass-material` grammar (one source), is `@supports`-gated with a fallback (the gated-Baseline precept), stays warm-cream/NCSU-red biased (NOT iOS-blue), and respects `prefers-reduced-transparency`. Refraction stays a PE garnish (NOT promoted to the card/primitive substrate — resize-expensive, Chromium-only); blur stays substrate.

## 3. Scope

1. `src/styles/glass-refract.css` (or the W22 `glass-specular-track.css`/`glass.css` refraction block) + the SVG-filter asset — ship the named `#glass-refract` convex-lens SVG filter as a LIBRARY asset so `.glass-refract` works out-of-box. The filter is the canonical 3-primitive recipe: `feImage` (a pre-baked displacement map computed from the convex-squircle surface profile `y = ⁴√(1 − (1 − x)⁴)` via Snell's law n₁=1 air → n₂=1.5 glass) → `feDisplacementMap` (R=x-shift, G=y-shift, `scale`=max px, neutral 128) → `feImage` specular + `feBlend mode="screen"`. The filter node ships in the `/styles` bundle (an inline `<svg>` the library mounts, or a data-URI in the CSS) so the consumer does NOT hand-mount it. Keep the existing `@supports (backdrop-filter: url(#…))` gate — Chromium-only; Safari/Firefox restrict `backdrop-filter` to built-in functions (WebKit bug 245510 open). Blur stays the un-gated substrate. Do NOT promote `.glass-refract` to the card/primitive substrate (resize-expensive — only the `scale` attr animates without rebuilding the map); it stays a PE-only opt-in garnish layered over the blur base. Cite kube.io/LogRocket math.
2. `src/styles/glass.css` (the `.glass-card`/`.glass-pill` block) + `src/styles/dock.css` + the dialog tier — `corner-shape: squircle` progressive enhancement, `@supports (corner-shape: squircle)`-gated, on `.glass-card`, `.glass-pill`, the dock shell, and dialog. The literal iOS-26 superellipse corner geometry that `backdrop-filter`/borders/shadows follow; degrades to the existing `border-radius` round at zero cost when the gate is absent (Chrome-139+ only, no Safari/FF). The `border-radius` fallback is the un-gated base; the squircle decl sits ONLY inside the `@supports` block.
3. `src/styles/glass.css` (the W22 `.glass-material` rim) + `tokens.css` — the chromatic edge-dispersion fringe: a low-alpha warm/cool oklab fringe on the rim (warm fringe on one edge, cool on the other — the "polished glass" dispersion Apple shows), via a second thin gradient ring or the rim's R/B channel split. Token-gated, low-alpha, biased warm-cream/NCSU-red NOT iOS-blue, composed OVER the W22 uniform rim (does not replace it). Gated `@supports`-feasible and dropped under `prefers-reduced-transparency: reduce` (the fringe is a transparency garnish). The `prefers-reduced-transparency: no-preference` arm carries it; the `reduce` arm drops it with the blur.
4. `src/styles/tokens.css` + `src/styles/glass.css` (the W22 `.glass-material` tint) — content-aware adaptive tint: mint `--glass-tint-source` + a `color-mix(in oklab, … ≤ 30%)` recipe so a surface can tint toward a consumer-provided dominant backdrop color, extending the existing `[data-over-content]` attribute model from an under-shadow swap into a TINT axis. mwg-safe: `color-mix(in oklab,…)` ≤30%, NEVER a lightness-shift in `oklch(from …)` (browsers don't gamut-map yet). DEFAULT `--glass-tint-source` = today's warm-white → zero surface delta when the consumer sets nothing. Dark-arm via the existing `--shadow-color`/`*-dark` flip.
5. `demo/stories/substrates/glass-material.vue` (extend the W22 story) — exercise the four folds over the shipped backdrop: a `.glass-refract` panel (Chromium refraction visible), a squircle-vs-round corner pair (the `@supports` PE read), the chromatic-fringe rim, and a `--glass-tint-source`-driven tint sampling the backdrop's dominant color. So every SOTA fold is screenshot-verifiable, NOT subtle-over-cream. Demo-private; consumes the new classes/tokens, no library re-roll.

## 3a. Triumvirate Dispatch

Trigger a triumvirate (research + plan augment + redress) when:

- the `#glass-refract` filter cannot be shipped as a self-contained library asset (the `feImage` displacement map needs a build-time generation step or a runtime canvas bake the `/styles` pipeline can't carry) — file bounds expand into the build/`vite.library.ts` pipeline and the "ship the asset out-of-box, CSS/SVG only" precept is implicated;
- a squircle `@supports` block leaks its corner geometry onto the un-gated fallback (a browser reporting partial `corner-shape` support paints a broken corner) — a non-local-recoverable gating failure where the fallback is not clean;
- the `color-mix(in oklab,…)` adaptive tint shifts the default warm-white surface by a perceptible delta when `--glass-tint-source` is unset (the zero-delta default is broken) — escalate to re-derive the default-tint identity rather than patch the recipe;
- a third diagnostic iteration on the refraction probe fails to surface the `#glass-refract` filter resolving inside the `@supports` arm (the gated `backdrop-filter: url(#glass-refract)` is not applying on a Chromium probe) — escalate to re-derive the filter mount, not patch the consuming class.

## 4. File Bounds

| File | Access |
|---|---|
| `src/styles/glass-refract.css` | create (the `#glass-refract` SVG-filter asset + the `@supports`-gated `.glass-refract` class) |
| `src/styles/index.css` | modify-carve (add the `glass-refract.css` import to the cascade order only) |
| `src/styles/glass.css` | modify-carve (the squircle `@supports` PE on `.glass-card`/`.glass-pill`; the chromatic-fringe + adaptive-tint folds onto the W22 `.glass-material` rim/tint only) |
| `src/styles/dock.css` | modify-carve (the dock-shell squircle `@supports` PE only) |
| `src/styles/tokens.css` | modify-carve (mint `--glass-tint-source` + the chromatic-fringe + oklab-tint rungs only) |
| `demo/stories/substrates/glass-material.vue` | modify (extend the W22 story with the four folds) |

Do NOT touch: the W22 `.glass-material` mixin BODY (W23 composes folds ONTO it — the rim, the specular `::before`, the rung composition are W22-owned and stay), `src/composables/glass/` (the renderer + WebGL substrate stay; refraction is a CSS/SVG PE garnish, not a renderer change), the W12 GlassPanel branches, the W13 `.input-pill`/slider/button carves, `src/components/` SFC sources (the folds are CSS/token assets the existing classes pick up; no SFC class-string change — the `.glass-card`/`.glass-pill`/dock/dialog already carry their rung).

## 4a. Disjointness

Single agent unit; no intra-wave path contention. W23 OPENS AFTER W22 (it consumes the `.glass-material` mixin) so there is no concurrent write to `glass.css` — W22's mixin work has landed before W23's fold carve. W23 shares no `modify` path with W12 (GlassPanel + tokens §8 + two stories — W23's `tokens.css` carve is the §11/§18 specular/tint rungs, DISJOINT from W12's §8 `--glass-bg-*` nesting collapse) or W13 (`.input-pill`/slider/button — W23 touches the `.glass-card`/`.glass-pill`/rim/tint rules, not the input pill). The `glass.css` and `tokens.css` files are shared with W12/W13 across the tranche but W23 opens AFTER them and carves DISJOINT rule blocks; the §4 access notes pin each carve to its block.

## 5. Agent Units

### AW.W23.a Refraction asset + squircle PE + chromatic dispersion + adaptive tint

- Goal: the four gated Baseline-2025 glass capabilities ship as out-of-box library assets, each `@supports`-gated over a working fallback, riding the W22 `.glass-material` grammar.
- Mechanism: author `#glass-refract` (squircle profile `y=⁴√(1−(1−x)⁴)`, Snell n=1.5, baked `feImage`→`feDisplacementMap`→`feBlend screen` specular) as a shipped `glass-refract.css` asset behind the existing `@supports url()` gate; add `@supports (corner-shape: squircle)` PE on `.glass-card`/`.glass-pill`/dock/dialog over the `border-radius` fallback; compose the low-alpha warm/cool oklab chromatic fringe onto the W22 rim, dropped under reduced-transparency; mint `--glass-tint-source` + the `color-mix(in oklab, … ≤30%)` recipe defaulting warm-white zero-delta; extend the W22 demo story to exercise all four.
- Files: `src/styles/glass-refract.css`, `src/styles/index.css`, `src/styles/glass.css`, `src/styles/dock.css`, `src/styles/tokens.css`, `demo/stories/substrates/glass-material.vue`.
- Sub-gate: a grep asserts the `#glass-refract` filter node ships in the asset; a computed-style/grep probe asserts every fold's decl sits inside its `@supports` block and the un-gated base (`border-radius`, blur, warm-white tint) is unchanged; the chromatic fringe resolves under `no-preference` and drops under `reduce`; `--glass-tint-source` unset → the surface tint equals warm-white (zero delta); `vue-tsc --noEmit` + `npm run build` green.

## 6. Hard Gate

1. **Refraction asset ships out-of-box.** `grep`/AST proves a `#glass-refract` filter node (`feImage` → `feDisplacementMap` → `feImage` + `feBlend mode="screen"`) ships in a library CSS/SVG asset (`glass-refract.css` or the `/styles` bundle), so `.glass-refract` resolves `backdrop-filter: …url(#glass-refract)…` WITHOUT a consumer hand-mounting the filter. Pre-fix the repo has NO `#glass-refract` node — BORN RED.
2. **Refraction stays gated, blur stays substrate.** The `.glass-refract` `backdrop-filter: url(#glass-refract)` decl sits ONLY inside `@supports (backdrop-filter: url(#…))`; the blur base is un-gated and unchanged. A probe confirms a non-Chromium fallback (gate absent) renders the blur with no filter, no broken paint.
3. **Squircle PE gated with a round fallback.** `@supports (corner-shape: squircle)` wraps the `corner-shape: squircle` decl on `.glass-card`/`.glass-pill`/dock/dialog; the un-gated `border-radius` is unchanged and is the fallback. A grep asserts no `corner-shape` decl sits OUTSIDE an `@supports` block (a leak would break the round fallback). Pre-fix there is no `corner-shape` decl anywhere — BORN RED.
4. **Chromatic fringe gated on transparency preference.** The warm/cool oklab edge-dispersion fringe composes onto the W22 rim under `prefers-reduced-transparency: no-preference` and is DROPPED under `reduce`. A computed-style probe reads the fringe present at `no-preference` and absent at `reduce`; the fringe is warm-cream/NCSU-red biased (the warm-edge channel resolves a warm hue, not iOS-blue). Pre-fix there is no fringe — BORN RED.
5. **Adaptive tint defaults to zero delta.** `--glass-tint-source` exists with a `color-mix(in oklab, … ≤ 30%)` recipe; with `--glass-tint-source` UNSET the surface tint equals today's warm-white (a computed-color probe reads zero delta vs the W22 baseline); setting `--glass-tint-source` to a sample backdrop color shifts the tint ≤30% toward it. A grep asserts no `oklch(from … l …)` lightness-shift is used (the mwg gamut-map caveat). Pre-fix there is no `--glass-tint-source` — BORN RED.
6. **Demo exercises the four folds.** `demo/stories/substrates/glass-material.vue` renders a `.glass-refract` panel, a squircle-vs-round pair, the chromatic fringe, and a `--glass-tint-source`-driven tint over the shipped backdrop; `grep` confirms the four classes/tokens are exercised, no raw re-roll.
7. **Build + types + cascade green.** `npm run build` (the `/styles` bundle now carries `glass-refract.css` in the cascade), `npm run typecheck`, and `npm run proof:phantom-classes` pass.

## 7. Format And Lint Cadence

- `npm run typecheck` after the token/CSS carves and again before close.
- `npm run build` before close (confirms `glass-refract.css` joins the `/styles` cascade and the `@supports` blocks emit intact).
- `npm run proof:phantom-classes` after the carve (the new `.glass-refract`/squircle classes must be content-scan-reachable).
- `git diff --check` for whitespace.
- No formatter is skipped.

## 8. Verification Artefacts

- `docs/tranches/AW/audit/W23-glass-material-sota.md` — the gate-clause probe output: the `#glass-refract` node presence, each fold's `@supports` gating + fallback, the reduced-transparency fringe drop, the zero-delta tint default.
- Playwright screenshots on Chromium (refraction + squircle + fringe + tint visible) AND a non-Chromium engine (the clean fallback render), at 1440×900, saved under `docs/tranches/AW/audit/screens/`, so the gate-and-fallback pair is screenshot-proven.
- The integration commit hash.

## 9. Commit Plan

- `feat(glass): ship #glass-refract convex-lens SVG filter as a gated library asset` — the `glass-refract.css` asset + the `@supports url()` gate + the `index.css` cascade import; body cites the squircle-profile/Snell math and the Chromium-only blur-substrate split.
- `feat(glass): corner-shape squircle PE on card/pill/dock/dialog over a border-radius fallback` — the `@supports (corner-shape: squircle)` carve; body names the Chrome-139 gate + the round fallback.
- `feat(glass): chromatic edge dispersion + content-aware adaptive tint on the .glass-material rim` — the oklab fringe + `--glass-tint-source` recipe; body cites the reduced-transparency drop and the warm-white zero-delta default.
- `chore(demo): exercise the four glass-material SOTA folds over the shipped backdrop` — the story extension.
- `docs(AW): W23 close — SOTA-fold gate-clause probe + Chromium/fallback screens` — the artefact + status commit.

## 10. Dependencies

- **Depends on**: W22 (the `.glass-material` mixin the squircle/fringe/tint folds ride) and W12 (the backdrop staging the folds read over).
- **Blocks**: nothing downstream in the glass-material band. The close (the reconciler-renamed close wave) registers `proof:glass-material-unified` (W22) and `proof:glass-material-sota` (W23) in `scripts/gates.mjs` with `{local,ci,release}` tags.

## 11. Archaeology

The four capabilities are Baseline-2025 facts the digest's glass-material-sota lane flagged as UNUSED at HEAD: `backdrop-filter: url(#…)` is Chromium-only (WebKit bug 245510 open, Firefox not shipping); `corner-shape: squircle`/`superellipse()` is Chrome-139+ only (June 2025), no Safari/FF — both MUST be `@supports`-gated PE; `color-mix(in oklab,…)` is Baseline Widely but the `oklch(from …)` lightness-shift is unsafe (no browser gamut-maps yet — mwg `css` §5). glass-ui's existing `.glass-refract` garnish ALREADY gates `backdrop-filter: url()` correctly but ships NO `#glass-refract` filter — it requires the consumer to hand-mount one, which W23 closes by shipping the asset. The squircle illusion existed only as the `--glass-curvature-overlay` radial on InstrumentChassis (a fake); W23 ships the real `corner-shape`. The guardrail is the gate-clause-and-fallback probe (gates 2-5), which asserts every fold is gated AND its fallback is clean, so a future engine without support never breaks. Sources: WWDC25 session 219 "Meet Liquid Glass"; kube.io/blog/liquid-glass-css-svg; blog.logrocket.com/how-create-liquid-glass-effects-css-and-svg; MDN corner-shape; caniuse css-backdrop-filter + css-relative-colors; modern-web-guidance `css` §5/§8.
