# RECAP — every request hitherto + its disposition (the AW/H grounding)

The traceability ledger across the session's prompts. Each request → DONE (with the AV/G commit) or FOLD (the AW/H wave that carries it). AW = the next glass-ui tranche (augments AV); H = the next slides tranche (augments G). This is tranche-development only; nothing here is an implementation instruction.

## Legend
- **DONE** — implemented + committed (+ published where noted).
- **FOLD→AW.x / H.x** — carried into the next tranche as a wave (with the area).
- **PARTIAL** — landed but a follow-up folds.

---

## 1. glass-ui storybook + prune (the live-demo audit)

| Request | Disposition |
|---|---|
| Re-invent the storybook structure (incoherent sidebar IA) | **DONE** — AV.W10, the 11-category IA (Foundations · Substrates · Primitives · Containers · Navigation · Data · Feedback · Motion · Tools · Compositions · Composables); the custom/dock/utilities/sliders bins dissolved. |
| Remove `/custom/header-ribbon` | **DONE** — AV.W10 (demo-route deleted). |
| Remove all instrument-chassis items | **PARTIAL / FOLD→AW** — the audit found real consumers (GlassDock `variant="instrument-strip"`, InstrumentChassis←InstrumentRail), so they were BOOKed with evidence, not blind-removed. AW decides: migrate those consumers off, then remove, OR keep as a documented primitive. |
| Remove `/primitives/glyph-face`; "wtf disco-glyph" | **FOLD→AW** — both ship with provide/inject silhouette cooperation + demo consumers; AW resolves (migrate/remove vs keep+document). |
| `metric-badge` vs `metric-pill` "wtf" | **DONE (clarified)** — not a dedup; MetricPill composes MetricBadge. The true orphans metric-cell + metric-stack were targeted (AV.W10) but a hidden dep restored them; **FOLD→AW** the clean orphan prune. |
| "why is configurator a primitive?"; hover-popover | **DONE** — AV.W10 recategorized configurator→Compositions, hover-popover→Containers. |
| "why do all the glass-panels suck?" | **FOLD→AW** — glass-panel quality refinement (the iOS-26 material + the component polish). |
| `/primitives/card` toggles don't work | **FOLD→AW** — the broken card toggles (route to the component wave). |
| `/foundations/native-top-layer` totally broken | **DONE (relocated)** AV.W10→Containers; **FOLD→AW** if the demo itself still misbehaves. |
| `/navigation/carousel` progress bar broken | **DONE** — AV.W13 diagnosed + fixed the Progress.vue silent sectioned-modelValue override (prop-boundary contract). |
| `/dock/icon-button-token-ladder` "wtf" | **DONE** — AV.W10 → foundations/dock-active-tokens. |
| `/composables/use-token-color` "wtf" | **FOLD→AW** — composables-IA refinement (the real-public vs reference split). |
| `/compositions/drawer-live-behind` "wtf" | **FOLD→AW** — the live-behind composition audit. |
| "where's aurora and blob?" (buried) | **DONE** — AV.W10 surfaced them under Substrates. |
| "dock items in many sections" | **DONE** — AV.W10 consolidated the dock routes. |
| Fonts all wrong | **DONE** — AV.W10 stripped the 4 retired faces (Computer Modern, General Sans, Inter, JetBrains Mono) from the demo defaults; repointed `--font-stack-serif` onto the shipped Fraunces. Gate `proof:font-canon`. |
| speedtest primitives in glass-ui — should be owned by speedtest | **DONE** — AV.W17 removed the 3 /dom orphans (useBreakpoint/useIdleReady/useViewportReady); the moves are name-forward (inv-16). |

## 2. The dock (the headline)

| Request | Disposition |
|---|---|
| "dock animations COMPLETELY broken; fix from first principles with our layering system" | **PARTIAL** — AV.W9 retired the dual-driver (the AU.W8b interpolate-size arm fighting the SpringProgress driver); the **DockLayerGroup** multi-layer switch now animates (runtime-verified 40→197 over 12 frames). |
| The **simple two-layer collapse** (default + `#collapsed`, what slides use) | **FOLD→AW (HIGH)** — REGRESSION found via slides e2e: the state toggles to expanded but the **width does not morph** (stuck at collapsed width). AV.W9 fixed the layer-switch but broke GlassDock's own collapse. Shipped in 3.3.0; the AW dock wave fixes it with a behavioral gate. |
| "dock animations not springy / iOS-like" | **FOLD→AW** — the iOS spring physics, the consistent motion language. |
| "dock shrinks first, THEN items fade a few ms later" (the lockstep lag) | **FOLD→AW (HIGH)** — the parent/children desync; one-timeline lockstep fix. |
| dock-with-slider broken | **FOLD→AW** — the keepDockOpen + the slider-in-dock interaction. |
| dock wrap "not correct, better stylized" | **FOLD→AW** — the multi-row wrap layout + morph. |
| dock rail / layering refinement | **FOLD→AW** — the DockLayerGroup rail polish, the consistent layering. |
| A dock README (research-backed) | **FOLD→AW** — the dock-animation workflow produces it. |

## 3. The slider

| "too many slider kinds → standard (rounded iOS continuous knob) + spectrum; port all consumers" | **DONE** — AV.W11: the continuous `border-radius:50%` knob, the spectrum gradient-track slider, keyset reduced to exactly `['standard','spectrum']`, consumers ported. Gate `proof:slider-two-only`. |

## 4. Aurora (perfection)

All **FOLD→AW** (the 32-agent aurora research workflow drives the path-forward + README + waves):
- derive-color variant; full + total OKLAB/OKLCh migration; modern WebGPU rendering.
- the oil-pastel mode genuinely painterly / oil-pastel-redolent (not a uniform gradient).
- a van-gogh variant with proper **atomic brushstrokes** (depth, variation, congruent to real van gogh, no subject matter).
- ultra-high-fidelity brushwork + gradient art; better the OpenAI/Stripe mesh-gradient backdrops procedurally; stunning, arresting, composed-art backdrops from atoms of control (zones, noise, color).
- keep the wispy-sky default; **simplify the option set**.
- fully dynamic + interactive if requested.
- (AV.W1 already fixed the OETF darkening + the IGN dither; AV.W2 created the shared procedural-color.glsl chunk — the AW painterly engine builds on these.)

## 5. Blob (perfection)

All **FOLD→AW** (the 32-agent blob research workflow):
- perfect the visual style, animation, interaction; visually appealing + intuitive; seamless glass-ui integration; performant modern web tech without sacrificing quality; dynamic/interactive.

## 6. Constellation

| "where's our slides primitive with the bottom bar?"; abstract the constellation into a glass-ui component | **FOLD→AW** — the AV.W8 useCanvas2D + Constellation primitive was GATED-NOT-LANDED (only 1 consumer); the slides constellation refactor (the 2nd consumer) unblocks it. AW lands the glass-ui constellation component + a README. |
| constellation not visible enough (dark mode + light mode) | **FOLD→H** — the visibility tuning. |
| constellation interactive (pointer reactivity) | **FOLD→AW/H**. |

## 7. The backend / architecture sweep

| Request | Disposition |
|---|---|
| Excise legacy/deprecated/workaround/fallback OR fail explicitly | **DONE** — AV.W12 (fail-explicit; befitting @supports kept; the silent swallows excised; api/index.ts archaeology → CHANGELOG). |
| No god modules (>500-line files) | **DONE** — AV.W13 (aurora.frag 819→348, useSortable, Progress, runtime, metaball decomposed; no src file >500 lines). |
| Encapsulation, service boundaries, DI, pipeline orchestration | **DONE (DI) / FOLD→AW** — AV.W14 shipped createStrictContext/createOptionalContext; the deeper component-colocation + composable assay folds. |
| No nested imports; no test files in src | **DONE** — AV.W14 (tests → a top-level tests/ mirror; nested imports hoisted). |
| Idiomatic modern Tailwind; localized design idioms; no brittle CSS | **DONE (v4 idiom) / FOLD→AW** — AV.W16 (@theme inline, container queries); the deeper styling assay (brittle calc/magic-numbers, monolithic-vs-colocated, design-idiom localization) folds. |
| DRY, KISS | **ongoing precept**. |

## 8. The slides (til-briefing)

| Request | Disposition |
|---|---|
| #2 the ~$5M cut off at the top | **DONE** — G.W6 (the dark hero column overflowed 720p by 72px; fixed at source). |
| Can't call out Pitt; frame as a what-if/hypothetical (the given copy) | **DONE** — G.W4 fold (the general-pattern reframe; `grep -ri pitt`=0 asserted). |
| "AI handles..." overlapping the headline (#3) | **DONE** — G.W6 (z-index + offset). |
| XRAY its own slide (not chopped into #5) | **DONE** — G.W5 (SlideXray.vue, the full hero). |
| #6 "wtf" → a proper conclusion; restructure 5+6, +1 slide ok | **DONE** — G.W5 (the 7-slide deck: ...close, XRAY, CONCLUSION). |
| dark-mode: each slide a proper inverse | **DONE (verified)** — G.W1 (already correct at HEAD post-F; all 6 screenshot-verified). |
| the locked-item modal text contrast | **DONE** — G.W1 (DeckGate: failing AA ~3:1 → --muted-foreground-strong/--foreground/--red-text; 6.5–14:1). |
| Bottom progress bar should NOT be baked into the dock; a separate bottom-of-page element (as before, as on mobile) | **FOLD→H (HIGH)** — de-dock the progress bar. |
| "few dollars" language shoe-horned; tune | **FOLD→H** — language tuning (the de-minimis framing, no shoe-horn). |
| Access-key modal more glass-ui styled (ugly); locked homepage decks slightly blurred + a lock symbol | **FOLD→H** — the gate restyle + the homepage lock affordance. |
| download pptx icons + a light/dark pptx popover | **FOLD→H** — the pptx-download UI. |
| Mobile slides squished (the "AI does..." list) | **FOLD→H** — the mobile reflow. |
| AI XRAY full-height on mobile; remove the "Open AI XRAY" button (the portal does it) | **FOLD→H** — the XRAY mobile + the button removal. |
| Too much negative space | **FOLD→H** — the spacing/density audit. |
| A graph's aspect ratio wrong on mobile; the complex slides (graphs, node/flow charts) | **FOLD→H** — the complex-slide layout audit (playwright + frontend-design). |

## 9. Process / governance (standing)

- Tranche-development only this phase; augment AV/G, don't replace.
- 30+ waves for AW/H; the research→plan→harden→synthesize loop, looped to a convergent optimum per feature.
- Maximal parallelism + workflow usage (rate-limit-aware: serialize the heavy research fans).
- NO legacy, NO workarounds, gestalt/idiomatic; architectural transpositions for elegance/simplicity/performance.
- The research-backed READMEs: dock, constellation, aurora, blob.
- The published state: **glass-ui 3.3.0 is live on npm** (the dock simple-collapse regression shipped with it — AW fixes it; a 3.3.1 hotfix is a later implementation decision, not this tranche).
- slides bumped to `^3.3.0` locally (uncommitted, held — not deploy-ready until the dock fix).

---

## The AW wave areas (glass-ui) — to be fleshed by synthesis
Dock animation-language (lockstep + springiness + the simple-collapse regression + layering + rail + wrap) · Aurora painterly engine (oil-pastel/van-gogh/atomic-strokes) · Aurora color (full OKLCh + derive-color) · Aurora options-simplification · Aurora WebGPU path · Aurora interactivity · Blob visual/surface (iridescence/SSS/specular) · Blob soft-body + interaction · Blob mood/expressiveness · Constellation glass-ui component (useCanvas2D) · Component-colocation + composable assay · Styling assay (brittle CSS, design-idiom localization) · glass-panel + card + the broken-route fixes · The instrument/glyph orphan resolution · The metric-cell/stack clean prune · The READMEs (dock/constellation/aurora/blob) · The library-convergence (glass-ui gaps vs slides).

## The H wave areas (slides) — to be fleshed by synthesis
De-dock the progress bar · The gate restyle + homepage lock affordance · The pptx-download icons + light/dark popover · The mobile squish reflow · The XRAY mobile full-height + button removal · The negative-space/density pass · The constellation visibility (dark + light) · The complex-slide layout (graphs/node-flow + aspect ratio) · The language tuning · The constellation-component consumption (the 2nd consumer for AV.W8/AW).

---

## ADDENDUM 2 — monolithic totality + glass-atoms + lock-removal (user, 2026-06-06)

The AW/H tranches are **monolithic + totality**: perfect EVERY faction of glass-ui (AW) and slides (H), not a curated subset. New asks folded:

- **AW glass-atoms perfection band (NEW).** Perfect the glass-ui ATOMS — the glass cards, the glass effect/material, the glass tiers, and EVERY core primitive — leveraging idiomatic reka-ui (^2.9), shadcn-vue (the CVA pattern), idiomatic Tailwind v4.3 (NOTE: there is no Tailwind v5; latest is 4.3.0, `next`=4.0.0 — target v4.3 idiom), and modern-web-guidance (the Baseline CSS). This extends the component-quality band (W12-W15) into a full atoms-perfection band: the glass material (backdrop-filter layering, the iOS-26 Liquid Glass specular/edge/refraction — already partly in AV.W15), the card geometry/surface/shadow, the glass tiers reading on content, the button/input/select/dialog/badge/tooltip/tabs/switch atoms each perfected (affordance + state + motion + a11y), the reka-binding correctness sweep (the binding-verification class). Cogent, DRY, design-language-coherent.
- **H slides totality.** Same totality for slides: every slide + every deck-chrome element perfected (already broad in H.W1-W10).
- **REMOVE the til-briefing lock (supersedes H.W6's gate-restyle/homepage-lock).** The lock is the soft-gate: `DeckGate.vue` + `VITE_TIL_ACCESS_KEY`, gated in `DeckPage.vue:44` (`meta.ts:9 protected:false`). The user: "remove the lock from the til-slides. Not needed any longer." H.W6 becomes a LOCK-REMOVAL wave: drop the DeckGate gating for til-briefing (the deck boots directly), retire the homepage locked-deck blur/lock-symbol ask (no lock to show), keep DeckGate available for genuinely-protected decks if any. The earlier "gate restyle / homepage lock" ask is RETIRED by this.
- **Tailwind v5?** No v5 exists (latest 4.3.0). Target idiomatic Tailwind v4.3 throughout. Record this in the styling waves so no wave chases a nonexistent v5.
