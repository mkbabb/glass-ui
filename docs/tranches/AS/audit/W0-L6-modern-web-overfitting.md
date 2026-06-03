# AS.W0 — Lens 6: MODERN-WEB leverage (re-run at HEAD 3.1.1) + overfitting + the 6-wave spine

Read-only audit. No `src/` edits. HEAD is post-AR.W2 (`package.json` version `3.1.1`; the binding-correctness floor shipped — GlassDock `useId()` mint + `proof:vt-names` gate + the a11y/P5 cohort asks + CI #177). This lens re-runs the modern-web baseline against that HEAD, re-classifies each leverage gap by Baseline status + consumer fit, runs the overfitting pass on what AR.W2 shipped, and maps the canonical 6-wave spine onto the AS forward-tranche.

The Chrome modern-web guidance page (`developer.chrome.com/docs/modern-web-guidance`) is an MCP/agent-integration landing page now — it names the lever menu (anchor positioning, container queries, `<dialog>`, Popover API, WebAuthn) but carries no Baseline table. Baseline classifications below are from the platform record (Jan-2026 cutoff) cross-checked against the codebase's own documented classifications in `useYieldToMain.ts` / `useViewTransition.ts` / `AR.md §Modern-web spine mapping`.

## §0 TL;DR

- **AR.W2 already took the binding-correctness floor.** GlassDock mints `dockId` from `useId()` (`GlassDock.vue:2,184`); the module counter is deleted; `proof:vt-names` is green (4 mints, 0 violation; `npm run proof:vt-names` PASS at HEAD). The diagnosed live bug is fixed.
- **Five leverage gaps still stand at HEAD, each with a real glass-ui site.** G1 density (100% `[data-density]`), G2 carousel scroll-state (JS `scroll` listener), G3 cross-document VT (same-document-only helper), G4 `postTask` priority (binary `scheduler.yield()` only). G2's site is sharper than AR.md framed it — see §G2.
- **The consumer-fit verdict splits the gaps.** G1/G4 are clean ≥2-consumer REAL waves. G2 is REAL but the consumer is the OVERFLOW-FADE listener (`useGlassCarousel`), not embla. G3 is the WEAKEST — glass-ui is a substrate not an app shell; cross-document VT is a CONSUMER-owned coupling, demo-or-not-shipped at the library tier.
- **Overfitting pass: AR.W2 shipped clean.** `proof:vt-names` guards 4 real mints + the class (not overfit); the `inert` is consumer-backed (glass-ui-a11y axe-serious ConfiguratorLayer); the P5 change is a correction (removes deformation). All three pass the ≥2-or-demo bar.
- **6-wave spine: W1 REAL (G4), W2 REFUTED (deferred-section shipped), W3 REAL (dock floor + select pilot), W4 REAL (G1+G2), W5 REAL (G3 ceiling, the W2 floor already landed), W6 REFUTED (no PWA consumer).**

## §1 Baseline status menu at HEAD (Jan-2026 record)

| Feature | Baseline | Policy | glass-ui site |
|---|---|---|---|
| Container **size** queries (`@container (min-width:…)`) | Widely (2023) | native | already used (component-adaptive layouts) |
| Container **STYLE** queries (`@container style(--x:…)`) | Newly (2024; bool/keyword forms), `style()` for custom-prop equality Newly→broadening | feature-detected fallback | **G1 — NOT taken**; density is `[data-density]` |
| Scroll-state container queries (`@container scroll-state(snapped \| scrollable \| stuck)`) | Limited (Chromium 133+, 2025; not yet multi-engine) | progressive-only | **G2 — NOT taken**; carousel JS listener |
| `scrollsnapchange` / `scrollsnapchanging` events | Limited (Chromium 129+) | progressive-only | G2 pager-sync (no consumer at HEAD; see §G2) |
| Cross-document View Transitions (`@view-transition { navigation: auto }`) | Newly (Chromium 126+; cross-engine still partial) | feature-detected fallback | **G3 — NOT taken**; helper is same-document-only |
| `scheduler.postTask()` + `TaskController` priority | Newly (broad; `postTask` shipped Chromium 94, Firefox 101, Safari 18.2 = 2024-end) | feature-detected fallback | **G4 — NOT taken**; `useYieldToMain` is binary `scheduler.yield()` |
| `scheduler.yield()` | Newly (Chromium 129+, 2024) | already taken | `useYieldToMain.ts` |
| Same-document View Transitions + `view-transition-class` | Newly (2024) | already taken | `useViewTransition.ts` + `view-transition.css` |
| `@scope` | Newly (2024; cross-engine 2024) | progressive hygiene | G5 — no taken site; `:deep()`/`data-*` in use |
| CSS `:state()` / custom state | Newly→Limited (Chromium + Safari 17.4; Firefox partial) | progressive hygiene | G5 — no consumer |
| CSS `@function` | Limited (Chromium 139+ only, 2025; no Firefox/Safari) | progressive-only / named-forward | G6 — Limited; authoring-DRY not payload |
| Customizable `<select>` (`appearance: base-select`) | Limited (Chromium 135+, 2025; no Firefox/Safari) | progressive-only / demo-gated | G7 — `GlassNativeSelect` not present at HEAD |
| `interestfor` / interest invokers | Limited (experimental; Chromium flag/origin-trial) | demo-gated / named-forward | G8 — no site |
| `content-visibility: auto` | Widely (2024) | already taken | `.deferred-section` (`utilities.css:294`) |
| Scroll-driven animations (`scroll()`/`view()` timelines) | Newly (2024; Chromium + Firefox; Safari partial) | already taken | `scroll-driven.css` |
| `@starting-style` + top-layer entry/exit | Newly (2024) | already taken | `animations.css §TOP-LAYER` |
| Anchor positioning (`anchor-name`/`position-anchor`) | Newly (Chromium 125+; cross-engine partial) | already taken | `UnderlineTabs.vue:57`, `BouncyToggle.vue:393` |
| Popover API / `<dialog>` | Widely | already used | dialog/popover families |

**Net-new Baseline-promoted APIs NOT yet on glass-ui's radar** (scanned for, no consumer):
- `text-box-trim` / `text-box-edge` (Newly 2025) — typography leading-trim; a real fit for the type ladder (`typography.css`) but NO consumer ask at HEAD → named-forward, not a wave.
- `::details-content` pseudo (Newly 2025) — would style the accordion/collapsible reveal box; the existing accordion CSS already paints it via the content wrapper → no net-new capability, name-only.
- View-Transition `types` + `:active-view-transition-type()` (Newly 2025) — directional vocab; this IS the G3/W4 directional-vocab item already booked in AR.md §W4. Folded, not net-new.
- `Observable` / `Promise.try` / `Array.fromAsync` — JS platform, no glass-ui surface.

None of these unseat the G1-G8 framing; the only addition worth a ledger line is `text-box-trim` (named-forward, typography-adjacent, no consumer).

## §2 Per-gap re-assessment at HEAD (file:line + Baseline + consumer fit)

### G1 — Container STYLE queries for density — STANDS, clean REAL
- **Site holds.** Density is still 100% attribute selectors: `dock.css:89,104,117,134` (`.glass-dock[data-density="…"]`), `ConfiguratorRow.vue:120-135`, `MetricPill.vue:65`, `utilities.css:473-478`. A descendant cannot react to an ancestor's `--density` without a markup contract.
- **Baseline.** `@container style(--density: compact|…)` — keyword/value style queries are Newly (Chromium 2024) broadening cross-engine; custom-property-equality `style()` is the slice still firming. Per policy: layer over the kept `[data-density]` via `:where()` flat specificity; `@supports` boundary provable.
- **Consumer fit: ≥2, clean.** Three independent density sites (dock, configurator-row, metric-pill) + the consumer cockpits (speedtest instrument-strip, muster). REAL — AR.W3 / spine-W4. The `[data-density]` stays the SOLE feature-detected fallback (a real role, not a dead mirror — inv 47).

### G2 — Scroll-state container queries for the carousel — STANDS, but the SITE is sharper than AR.md framed
- **Two carousels, not one.** `ui/carousel/` is the **embla** family (`useCarousel.ts:3` `emblaCarouselVue`, `interface.ts:1`) — embla owns drag-physics + `scrollSnapList()`. `custom/glass-carousel/` is a SEPARATE primitive that already runs **native CSS scroll-snap** (`GlassCarousel.vue:61` `scroll-snap-type:${axis}_${type}`, no embla).
- **The real G2 consumer is the OVERFLOW-FADE JS listener, not the pager.** `useGlassCarousel.ts:28-72` attaches a `scroll` listener (`updateOverflow`) purely to set `canScrollStart`/`canScrollEnd` booleans (lines 37-42), which drive the edge-fade mask class (`getOverflowFadeClass`, lines 184-195). This is precisely the `@container scroll-state(scrollable: top|bottom|left|right)` use case — a pure CSS scroll-state query retires the listener entirely. AR.md's "`scroll-state(snapped)` highlights the active slide + `scrollsnapchange` pager-sync" framing aims at the WRONG primitive (the glass-carousel has no JS pager to sync; the embla family has its own observers it needs for drag-physics and would not give them up).
- **Baseline.** `@container scroll-state(...)` is **Limited** (Chromium 133+, 2025; single-engine). Policy: **progressive-only**, the JS listener stays the default. `scrollsnapchange` events are Limited too and have **no consumer at HEAD** (no JS pager exists on the glass-carousel).
- **Consumer fit: REAL but narrowed.** The ≥2 bar is met by the overflow-fade listener being live on glass-carousel + (a converging 2nd: any sidebar/dock scroll-edge fade). **Re-scope the AS wave: G2 = `scroll-state(scrollable)` retires the `useGlassCarousel` overflow-fade `scroll` listener, progressive over the kept JS path.** The `scrollsnapchange` half is demo-or-not-shipped (no pager consumer). Spine-W4.

### G3 — Cross-document View Transitions — STANDS, but the WEAKEST consumer fit
- **Site holds.** `useViewTransition.ts:1-2` is explicitly "same-document"; it wraps `document.startViewTransition` only (line 89). No `@view-transition { navigation: auto }` substrate in `view-transition.css` (the file carries the same-document `.gl-list-item` group recipe + `--vt-*` axes only).
- **Baseline.** Cross-document VT is Newly (Chromium 126+). Feature-detected; `@view-transition` at-rule is inert on non-supporting engines (graceful).
- **Consumer fit: WEAKEST — substrate/app-shell mismatch.** glass-ui is a COMPONENT substrate. `@view-transition { navigation: auto }` is an APP-SHELL / multi-page-app concern owned by the CONSUMER's routing layer (the consumer adds `<link rel="expect">` + Speculation Rules in their own `index.html`). glass-ui cannot ship `navigation: auto` as library CSS without imposing route-morph behavior on every consumer page. The library-tier deliverable is at most: (a) a `view-transition.css` directional/types VOCAB section (the `:active-view-transition-type()` axes) the consumer OPTS INTO, and (b) docs. **The `navigation: auto` substrate itself is NOT a glass-ui artefact — it is consumer-owned.** Per inv 10 (substrate-without-consumer is binary): the directional-vocab CSS clears the bar ONLY if ≥2 consumers wire it; at HEAD that is **0 confirmed** (muster J uses the same-document path). Verdict: **G3 is demo-or-not-shipped at the library tier — REAL as the W5 ceiling ONLY IF the types/directional vocab gets ≥2 opt-in consumers; otherwise NAMED-FORWARD.** AR.md's "extends `useViewTransition`" framing overstates the library's ownership of the cross-document leg.

### G4 — `scheduler.postTask` priority — STANDS, clean REAL
- **Site holds.** `useYieldToMain.ts:22-32` wraps ONLY the binary `scheduler.yield()` (the `SchedulerWithYield` interface carries `yield?` only). No `postTask`, no `TaskController`, no priority model.
- **Baseline.** `scheduler.postTask()` + `TaskController` is Newly and broad — Chromium 94, Firefox 101, **Safari 18.2 (2024)** = the widest of the four gaps (`postTask` ships in all three engines, unlike cross-document VT or scroll-state). Feature-detected ≤20-LOC fallback (the same MessageChannel macrotask `yieldToMain` already ships).
- **Consumer fit: ≥2, clean.** The existing yield consumers (fourier ι, muster J.W5.1, speedtest AS-MW-INP — documented in `useYieldToMain.ts:3-5`) re-type against `user-blocking`/`user-visible`/`background` priorities + abort. REAL — AR.W4 / spine-W1. Lands on `/motion-core` (dependency-free leaf, mirrors `yieldToMain`).

### G5 — `@scope` / `:state()` — STANDS as hygiene only
- `@scope` Newly, `:state()` Newly→Limited. No taken site; `:deep()`/`data-*` still in use. This is an AUTHORING-DRY re-expression, NOT a payload win (gzipped CSS is compression-saturated — the AP refuted-premise lesson). **Progressive-only hygiene; a wave ONLY if it clears the overfitting bar in-flight; otherwise named-forward.** Not a standalone wave.

### G6 — CSS `@function` — Limited, NAMED-FORWARD (unchanged)
- Chromium 139+ ONLY (2025); no Firefox/Safari. Authoring-DRY not payload. Correctly named-forward in AR.md; **no change** — revisit when Baseline lifts. NOT a wave.

### G7 — Customizable `<select>` — Limited, demo-gated ONLY
- `appearance: base-select` Limited (Chromium 135+, 2025; single-engine). No `GlassNativeSelect` at HEAD (grep: only `glass.css`/`Textarea.vue`/`form-validation.vue` hit "base-select" as substrings, no component). The existing reka-ui `<Select>` is the shipping primitive. **A `GlassNativeSelect` pilot is demo-gated ONLY (no ≥2 real consumers) — it does NOT public-surface.** Spine-W3, but gated. NOT a public wave artefact.

### G8 — `interestfor` — Limited/experimental, NAMED-FORWARD (unchanged)
- Still flag/origin-trial. Demo-gated only; watch for graduation (Configurator/dock destructive-action-preview fit). **No change** — named-forward. NOT a wave.

## §3 Overfitting pass — what AR.W2 shipped (≥2-consumer OR demo OR not-shipped)

| AR.W2 artefact | Consumers / role | Verdict |
|---|---|---|
| `proof:vt-names` gate (`scripts/proof-vt-names.mjs`) | Guards 4 LIVE mints across 2 components (`GlassDock.vue:184`, `DockLayerGroup.vue:73`) + 2 page-singleton anchors (`UnderlineTabs.vue:57`, `BouncyToggle.vue:393`) + the whole future mint CLASS (inv η). Fail-closed, comment-stripped (AP.W4 discipline). | **NOT overfit** — a class-closing gate guarding 4 real sites; mirrors `proof:theme`/`proof:phantom-classes`. PASS at HEAD. |
| GlassDock `useId()` mint fix (`GlassDock.vue:2,184`) | The fix itself — deletes the module counter, mirrors `DockLayerGroup.vue` idiom (the established 5-component `useId()` pattern). | **Consumer-backed** — fixes a live console-error bug fourier's e2e catches. Correctness, ungated. |
| Pairwise-distinct unit guard (`GlassDock.vt-names.test.ts`) | Mounts ≥2 docks, asserts distinct names — the runtime complement to the static gate. | **NOT overfit** — a regression guard for the exact bug class. |
| `:inert` on ConfiguratorLayer collapsed region (`ConfiguratorLayer.vue:144`) | glass-ui-a11y cohort ask — the collapsed region carried `aria-hidden` + focusable children (axe SERIOUS `aria-hidden-focus`). `:inert` removes the subtree from tab order + AX tree. Mirrors the existing dock `:inert` (`GlassDock.vue:332,338`, `DockLayer.vue:49`). | **Consumer-backed** (real consumer axe failure) + ≥2 inert sites in-tree. Correctness. |
| P5 inner-rounding correction (`779fed7`) | Adversarial verification found the prior fix (`b6d6cf4`) DEFORMED dividers (per-section radius curls hairlines up 12px on a flush border-b-only section). The correction REMOVES the per-section radius; the container's `rounded-panel` + `overflow-hidden` owns root rounding. | **Consumer-backed correction** — removes a defect, adds no speculative surface. Net-negative LOC. Clean. |

**Overfitting verdict: AR.W2 is clean.** No artefact shipped with <2 consumers and no demo. The gate guards a real class; the inert/P5 are consumer-driven corrections. No public-barrel leak (the gate is a script, the fixes are internal). The `--glass-opacity-dock` token (`tokens.css:620`) found in-tree is an EARLIER (pre-AS-GU) rung, not an AR.W2 ship — already consumed by `--glass-bg-dock` (`tokens.css:637`).

## §4 The canonical 6-wave spine mapped onto the AS forward-tranche

Note on naming: HEAD is `3.1.1` (AR.W2 shipped). The forward leverage (G1/G2/G4 + the AS-GU bundle) is the work AR.W3-W6 was authored to carry, folding as the 3.2.0 minor. This audit re-confirms the spine for that forward set under the AS letter.

| Spine wave | Disposition | Consumer-backed lever OR explicit refutation |
|---|---|---|
| **W1 perf/INP** | **REAL** | **G4 `scheduler.postTask` priority** — extends `useYieldToMain` with the priority model + `TaskController` abort. ≥2 yield consumers (fourier/muster/speedtest, `useYieldToMain.ts:3-5`) re-type. Widest Baseline of the gaps (all 3 engines). Lands `/motion-core`. |
| **W2 CWV/content-visibility** | **REFUTED (in-record)** | `.deferred-section` (`content-visibility: auto`, `utilities.css:294-300`) shipped in AQ with a 3-consumer fan-out. Scroll-driven (`scroll()`/`view()`) shipped (`scroll-driven.css`). **No net-new content-visibility capability has a consumer at HEAD.** `text-box-trim` (Newly 2025) is the only CWV-adjacent net-new candidate and has 0 consumers → named-forward, not a wave. The dock dark-legibility/overflow items ride W5 as correctness, not a CWV wave. |
| **W3 forms/a11y** | **REAL (narrow)** | The standalone-`DockIconButton` 44px coarse floor (`dock.css:1079-1083`, AP.W3 R0G-6 already lifts via `--dock-control-size`; the gap is the BARE icon-button outside the dock). Plus `GlassNativeSelect` (G7) — **demo-gated ONLY** (Limited Baseline, no ≥2 consumers). The full forms vocabulary (`useUserInvalidAria`, `forms.ts:19-22`) shipped in AQ.W4. AS adds only the dock-floor (correctness) + the select pilot (demo). |
| **W4 CSS-platform** | **REAL (the leverage headline)** | **G1 container STYLE queries** for density (Newly, ≥2 sites, `:where()` over kept `[data-density]`) + **G2 scroll-state `scrollable`** retiring the `useGlassCarousel` overflow-fade listener (Limited, progressive-only — re-scoped per §G2). `@scope`/`:state()` (G5) hygiene-only-if-it-earns-it; `@function` (G6) named-forward (Limited/Chromium-only, authoring-DRY-not-payload). |
| **W5 motion/VT** | **REAL floor (shipped) + WEAK ceiling** | FLOOR: the VT-name uniqueness gate + GlassDock fix ALREADY SHIPPED in AR.W2 (3.1.1) — the binding-correctness floor is DONE, not forward. CEILING: **G3 cross-document VT is the WEAK leg** — the `navigation: auto` substrate is CONSUMER-owned (app-shell, not component substrate); the library-tier deliverable is at most the directional/types VOCAB section, REAL only with ≥2 opt-in consumers (0 at HEAD) → **demo-or-named-forward**, NOT a confident library wave. The same-document `useViewTransition` is the shipped substrate. |
| **W6 security/PWA** | **REFUTED (in-record)** | No security/PWA lever has a glass-ui consumer. glass-ui is a component substrate, not an app shell. Speculation Rules (`<script type="speculationrules">`) is the CONSUMER's coupling to the (consumer-owned) cross-document VT recipe, not a glass-ui surface. No wave invented. |

## §5 Deltas vs AR.md's record (what this re-run changes)

1. **The W5 binding-correctness FLOOR already shipped (3.1.1).** AR.md frames W2 as forward; at HEAD it is DONE (`proof:vt-names` PASS, GlassDock `useId()` live). The AS-forward set is G1/G2/G4 + AS-GU only.
2. **G2 is re-scoped.** The real glass-ui-owned consumer is `useGlassCarousel.ts:28-72`'s OVERFLOW-FADE `scroll` listener → `@container scroll-state(scrollable)`, NOT `scroll-state(snapped)` pager-sync (which targets the wrong primitive; the glass-carousel has no JS pager, the embla family keeps its drag-physics observers). The `scrollsnapchange` half has 0 consumers → demo-or-not-shipped.
3. **G3 is downgraded to WEAK / demo-or-named-forward.** Cross-document `navigation: auto` is CONSUMER-owned (app-shell); the library cannot ship it as CSS without imposing route-morphs. Only the opt-in directional-vocab is a candidate, and it has 0 confirmed ≥2-consumers. AR.md's "extends `useViewTransition`" overstates library ownership.
4. **G4 is the strongest forward lever** (widest Baseline — all 3 engines; cleanest ≥2-consumer fit). Should lead the forward perf work.
5. **`text-box-trim` (Newly 2025)** is the one net-new Baseline API with a plausible glass-ui fit (typography ladder) — 0 consumers → named-forward, NOT a wave.

## §6 Fold items (deferred into AS)

- **G4 `scheduler.postTask` priority** — the strongest forward lever; clean ≥2 (fourier/muster/speedtest re-type); widest Baseline. Suggested AS perf/INP wave.
- **G1 container STYLE queries for density** — clean ≥2 (dock/configurator/metric-pill); Newly; `:where()` over kept `[data-density]`. Suggested AS CSS-platform wave.
- **G2 `scroll-state(scrollable)` overflow-fade** (RE-SCOPED) — retires `useGlassCarousel.ts:28-72` listener; Limited/progressive-only; the `scrollsnapchange` pager half stays not-shipped (0 consumers). Suggested AS CSS-platform wave (paired with G1).
- **G3 cross-document VT directional-vocab** (DOWNGRADED) — demo-or-named-forward; the `navigation: auto` substrate is consumer-owned; only opt-in vocab is a library candidate and has 0 ≥2-consumers. Chronic risk of substrate-without-consumer.
- **`text-box-trim` typography rung** (NEW) — Newly 2025; typography-ladder fit; 0 consumers → named-forward.
- **G5 `@scope`/`:state()`, G6 `@function`, G7 `GlassNativeSelect`, G8 `interestfor`** — Limited/hygiene/demo-gated; named-forward unless a consumer converges.
</content>
</invoke>
