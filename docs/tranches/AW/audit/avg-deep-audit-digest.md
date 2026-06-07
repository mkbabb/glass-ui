# AV/G deep-audit + fold ledger (6-agent, clean)

The RECAP is canonical and grounds the briefs well. The briefs largely agree; the main correction is brief 3's GlassDock path (it lives at `dock/GlassDock.vue`, not `glass-dock/`). I have enough to synthesize. Brief 6's line-number citations to SPEC/STYLE/WAVE_SPEC are unverified but the precept names are standard. I'll write the ledger now.

---

# THE AW/H FOLD LEDGER + CONVERGENCE PLAN

Grounded against `docs/tranches/AW/RECAP.md` (the canonical traceability ledger) and the live repo. glass-ui 3.3.0 is published; the dock simple-collapse regression shipped with it. AW = next glass-ui tranche (augments AV); H = next slides tranche (augments G). Tranche-development only — nothing below is an implementation instruction.

Note on a brief inaccuracy: GlassDock lives at `src/components/custom/dock/GlassDock.vue`, NOT `glass-dock/` (brief 3 cited the wrong path). The dock composables are `dockContext.ts`, `dockLayerContext.ts`, `useDockState.ts`, `useLayerTransition.ts`, `isTeleportedTarget.ts` under `dock/composables/`.

---

## 1. THE AW FOLD LEDGER (glass-ui)

Every deferred / BOOKed / PARTIAL glass-ui item + the new issues → the AW wave that carries it. RECAP line cites the source.

| # | Item | Disposition at HEAD | RECAP src | → AW wave |
|---|---|---|---|---|
| 1 | **Dock simple-collapse regression** — GlassDock two-layer collapse (default + `#collapsed`) toggles state but width does not morph (stuck collapsed). Shipped in 3.3.0. | PARTIAL/REGRESSION (HIGH) | :39 | **AW.W1** |
| 2 | **Dock lockstep lag** — "shrinks first, THEN items fade"; parent/children opacity ties to inner spring settle, not outer start. | FOLD (HIGH) | :41 | **AW.W2** |
| 3 | **Dock springiness** — not iOS-like; inconsistent motion language across collapse/switch. | FOLD | :40 | **AW.W3** |
| 4 | **dock-with-slider** — keepDockOpen + slider-in-dock interaction broken. | FOLD | :42 | **AW.W4** |
| 5 | **Dock wrap layout** — multi-row wrap morph + stylization. | FOLD | :43 | **AW.W5** |
| 6 | **DockLayerGroup rail polish** — consistent layering + switcher-rail refinement. | FOLD | :44 | **AW.W6** |
| 7 | **Aurora painterly engine** — oil-pastel mode genuinely painterly; van-gogh atomic-brushstroke variant; arresting composed-art backdrops from zones/noise/color atoms. | FOLD (32-agent research) | :53-57 | **AW.W7-W8** |
| 8 | **Aurora full OKLCh + derive-color** — total OKLAB/OKLCh migration; derive-color variant. | FOLD | :54 | **AW.W9** |
| 9 | **Aurora options-simplification** — keep wispy-sky default; slim the option set. | FOLD | :58 | **AW.W10** |
| 10 | **Aurora WebGPU path** — modern WebGPU render path; `navigator.gpu`-detection (WebGL2 stays substrate). | FOLD (deferred-with-trigger) | :54 | **AW.W11** |
| 11 | **Aurora interactivity** — fully dynamic + interactive when requested. | FOLD | :59 | **AW.W12** |
| 12 | **Blob visual/surface** — iridescence / SSS / specular material perfection. | FOLD (32-agent research) | :64-65 | **AW.W13** |
| 13 | **Blob soft-body + interaction** — soft-body deformation + pointer interaction. | FOLD | :65 | **AW.W14** |
| 14 | **Blob mood/expressiveness** — expressive states + mood. | FOLD | :65 | **AW.W15** |
| 15 | **Constellation glass-ui component** — `useCanvas2D` substrate + `Constellation` component. AV.W8 GATED-NOT-LANDED (1 consumer); slides H is the 2nd consumer that unblocks it. | FOLD (gated → unblocked by H) | :69 | **AW.W16** |
| 16 | **glass-panel quality refinement** — iOS-26 material + component polish ("why do all the glass-panels suck?"). | FOLD | :22 | **AW.W17** |
| 17 | **Card toggles broken** — `/primitives/card` toggle interaction broken. | FOLD | :23 | **AW.W18** |
| 18 | **native-top-layer demo correctness** — relocated to Containers (AV.W10); verify demo no longer misbehaves. | DONE-relocated / FOLD-if-broken | :24 | **AW.W18** |
| 19 | **drawer-live-behind composition audit** — the "wtf" composition route. | FOLD | :28 | **AW.W18** |
| 20 | **Instrument-chassis orphan resolution** — real consumers found (GlassDock `variant="instrument-strip"`, InstrumentChassis←InstrumentRail); BOOKed not blind-removed. Migrate-off+remove OR keep+document. | PARTIAL/FOLD | :18 | **AW.W19** |
| 21 | **glyph-face / disco-glyph orphan resolution** — provide/inject silhouette cooperation + demo consumers; resolve migrate/remove vs keep+document. | FOLD | :19 | **AW.W19** |
| 22 | **metric-cell / metric-stack clean prune** — true orphans targeted AV.W10 but a hidden dep restored them; surface the dep + clean removal. | PARTIAL/FOLD | :20 | **AW.W20** |
| 23 | **Component-colocation + composable assay** — deeper DI/encapsulation refactor; real-public vs reference split (`use-token-color` "wtf"). | DONE-DI / FOLD | :27,:79 | **AW.W21** |
| 24 | **Styling assay** — brittle calc/magic-numbers → tokens; monolithic→colocated CSS; design-idiom localization. | DONE-v4-idiom / FOLD | :81 | **AW.W22** |
| 25 | **READMEs (research-backed)** — dock, constellation, aurora, blob. | FOLD | :110 | **AW.W23** |
| 26 | **Library-convergence** — glass-ui gaps vs slides; the deck-progress + dialog-form gaps (see §3). | FOLD | :117 | **AW.W24** |
| 27 | **Dock README (research-backed)** — produced by the dock-animation workflow. | FOLD | :45 | folds into **AW.W23** |

### AW KEEP-BOOK (carried, explicit triggers, no AW wave yet)

| Item | Reason held | Trigger to re-open |
|---|---|---|
| `proof:webgl-golden` (blob pixel-golden headless capture) | Needs stable headless WebGL2-live frame runner CI lacks; aurora capture-render already covers 8-assert CPU-equivalence. | Stable headless live-frame runner lands. |
| OffscreenCanvas + Worker (RAF main-thread contention) | Needs stable headless frame-timing runner (LoAF). | Profiled LoAF regression on aurora/blob RAF. |
| `text-box-trim` SFC consumer | 0 consumers at HEAD; orphaned feature. | A real SFC consuming component. |
| anchor-positioning (dock popovers) | reka `PopperContent` yields the positioning seam; native `anchor()` double-positions. | A consumer needing native anchor (not a blocker). |
| Drawer `:native` / `GlassNativeDrawer` | 2nd native consumer unmet (slides `mode="live-behind"` partially discharged AN.W3). | A TRUE 2nd native consumer (not vaul-vue). |
| role-typed `<Role>Dock` base | No 2nd consumer needing role-typed base. | A 2nd consumer surfaces. |
| `interpolate-size` / `calc-size()` native size morph | Chromium-only; W9 retired the dual-driver race; FLIP+spring is the sole path. | Cross-engine support lands. |
| Scroll-driven `scroll()`/`view()` native | Firefox flag-gated; `@supports`-primary posture correct. | Firefox unflips. |

---

## 2. THE H FOLD LEDGER (slides)

Slides items → the H wave. RECAP §8 + §6 cites.

| # | Item | Disposition | RECAP src | → H wave |
|---|---|---|---|---|
| 1 | **De-dock the progress bar** — move from dock anchor to a separate bottom-of-page element (pre-F behavior, mobile form). | FOLD (HIGH) | :95 | **H.W1** |
| 2 | **Gate restyle + homepage lock affordance** — access-key modal glass-ui-styled; locked homepage decks blurred + lock symbol. | FOLD | :97 | **H.W2** |
| 3 | **pptx-download UI** — download icons + light/dark pptx popover menu. | FOLD | :98 | **H.W3** |
| 4 | **Mobile squish reflow** — the "AI does…" dense lists at ≤700px (Slide08/Slide10). | FOLD | :99 | **H.W4** |
| 5 | **XRAY mobile + button removal** — SlideXray full-height on mobile; remove the "Open AI XRAY" button (portal nav does it). | FOLD | :100 | **H.W5** |
| 6 | **Negative-space / density pass** — audit all slides for excessive gutter; tighten without cramping. | FOLD | :101 | **H.W6** |
| 7 | **Constellation visibility** — graph contrast/readability across dark + light. | FOLD | :70 | **H.W7** |
| 8 | **Complex-slide layout** — graphs / node-flow charts aspect-ratio at narrow/16:9/wide/portrait (playwright + frontend-design). | FOLD | :102 | **H.W8** |
| 9 | **Language tuning** — "few dollars" de-minimis framing, de-shoehorn (G.W4 reframe landed; polish pass). | FOLD | :96 | **H.W9** |
| 10 | **Constellation-component consumption** — adapt SlideXray + Slide01 to consume the glass-ui Constellation; preserve the `drawAnomaly` skin. The 2nd consumer that unblocked AW.W16. | FOLD (depends on AW.W16) | :69,:120 | **H.W10** |

### H KEEP-BOOK (glass-ui-side, AV-owned, NOT carried to H)

| Item | Owner | Disposition |
|---|---|---|
| FG.W-deck (`/deck` lift) | AV/AW | Precondition recorded (consumer #2 = a glass-ui demo Deck story); H consumes once AW lands it. No H wave until lift. |
| FG.W-motion (`useCountup` / `vReveal` upstream) | AV/AW | slides extracted locally in F.W5; no H dependency. AV.W3 already shipped `useCountup`/`vReveal`. |
| FG.W-card-badge | AV/AW | Card cartoon dark-arm + Badge accent; KEEP-BOOK, no H dependency. |

---

## 3. THE LIBRARY-CONVERGENCE PLAN

What AW adds to glass-ui so slides H can stop re-implementing, and what stays slides-specific. The discipline is the ≥2-consumer rule — each new primitive must have glass-ui (story/demo) + slides as two real consumers before it ships.

### AW ADDS to glass-ui (consumed by H)

| New surface | What it absorbs from slides | 2nd consumer | AW wave | H consumes in |
|---|---|---|---|---|
| **`Constellation` component + `useCanvas2D` composable** | The 488-LoC `constellation.ts` engine signature — dpr-resize, palette-read-on-dark-flip, RAF arm/disarm via MutationObserver on `[data-state]`, 5 draw passes. The MECHANICAL skeleton ports; the branded content (NC State Red anomaly, narrative) stays. | glass-ui story + slides deck | AW.W16 | H.W10 |
| **`DeckProgress` composition** (over the shipped `Progress.vue`) | Slides' viewport-pinned `.deck-progress` + `nav.progress` `--p` CSS-var binding (`DeckView.vue`). Wraps Progress variant=default; accepts `currentIndex`+`total`; emits `--p`. The de-dock (H.W1) consumes this. | glass-ui story + slides DeckPager | AW.W24 (library-convergence) | H.W1 |
| **`DialogForm` pattern + docs** | Slides' `DeckGate` non-dismissable form-in-modal contract (`@escape-key-down.prevent`, `@interact-outside.prevent`, error/shake state, footer submit). Documented composition over Dialog/DialogContent — not a new component, a blessed pattern. | glass-ui story + slides DeckGate | AW.W24 | H.W2 (gate restyle consumes the pattern) |

### Deck-engine generics — AW MAY absorb (the `/deck` lift, gated on a 2nd consumer)

Brief 6 catalogues ~15 deck primitives in slides that are >90% generic (`useDeck` headless core, `useDeckNav`/`useDeckInput`, `slideContext`, `DeckSlide`, `DeckPager`, `pagerWindow`, `deckKeys`, `captureMode`, `useEdgeZones`, `useCountup`, `reveal`, `DeckView` skeleton, `types.ts`, `deckSpring`). These are KEEP-BOOK at the `/deck` lift gate — the 2nd consumer (a glass-ui demo Deck story) is the unblock, NOT slides alone. The `/deck` lift is a LARGE wave family that should be its OWN tranche or a late-AW band, not folded into the dock/aurora/blob work. Recommend: record the precondition in AW.W24, do NOT lift the full deck engine in AW unless the demo Deck story lands as consumer #2.

### STAYS slides-specific (H-owned, never ports)

| Artefact | Why it stays |
|---|---|
| **Constellation branded content** — NC State Red anomaly node, the narrative framing, palette tokens. | Brand identity; only the engine mechanism ports. |
| **XRAY portal** — xray.friday.institute embed, "TRANSPARENCY PORTAL" branding, reachability probe. | Narrative SPA embed; URL-specific. Mechanism (deferred iframe + poster fallback) is generic but content is not. |
| **PPTX export infra** — `export-pptx.mjs`, the image-per-slide pipeline, DeckSettings submenu. | Slides chose image-per-slide (fidelity over editability); a delivery choice, not a primitive. `captureMode` flags MAY port as a generic pattern. |
| **DeckGate gate semantics** — soft-gating, access-key, homepage lock. | Platform feature; the gate UI is slides-owned (it consumes the `DialogForm` pattern AW documents). |
| **deck.css brand register** — NC State Red, cartoon-shadow vocabulary, deck-local fg/bg overrides. | Visual identity; the generic type-scale (cqi-based φ ladder) + motion patterns MAY become a reference stylesheet. |

---

## 4. THE PRECEPT-CONFORMANCE CHECKLIST (for the AW/H synthesis)

The RECAP is an inventory, not a plan. Before dispatch, synthesis MUST produce formal AW.md + H.md. The checklist (from brief 6, grounded against the canonical precept set — WAVE_SPEC.md, SPEC.md, STYLE.md, instructions Edicts):

**A. Wave structure**
- [ ] AW.md + H.md formalized: tranche thesis, goal criterion (1-2 sentences), invariants, wave table, completion criterion, cross-tranche debt.
- [ ] Wave table uses canonical `W<N> - <Title>` form (never bare `W<N>` or title alone).
- [ ] Per-wave specs at `waves/AW.W<N>-<kebab>.md` for broad/parallel waves (aurora, dock-motion, blob, styling-assay, mobile-reflow) per WAVE_SPEC §1-11.
- [ ] Max 6 parallel agents per wave.

**B. Goal + completion criterion (paired, every unit)**
- [ ] Each wave declares BOTH a goal criterion (forward aim) AND completion criterion (hard gates). Both hold for a clean close.
- [ ] Hard gates are falsifiable — a command, runtime probe, benchmark, diff, or deletion proof. Not an intent-assertion.

**C. No-legacy + gestalt transposition**
- [ ] Each wave names the anti-pattern it abrogates AND the structural replacement (e.g., "the dual-driver interpolate-size/spring race" → one-authority-per-concern).
- [ ] No `*_v2` codepaths, stubs, or disabled gates without a restoration wave.
- [ ] Prose is evidence ("removes N branches"), not editorial ("cleaner").

**D. Overfitting / ≥2-consumer gate — CRITICAL for AW**
- [ ] A spot-verification pass runs BEFORE any retire wave (AW.W19 instrument/glyph, AW.W20 metric-cell/stack): every cited path EXISTS (ls/Read); every rg count re-run verbatim; every "zero consumers" claim resolved through re-export aliases.
- [ ] Hallucinated items or under-counts are integrity-sweep blockers.
- [ ] Wire-before-retire: attempt ≥2-consumer wiring before deletion. The metric-cell/stack "hidden dep" (RECAP :20) MUST be surfaced before the prune.
- [ ] Constellation/DeckProgress/DialogForm each have 2 real consumers (glass-ui story + slides) before shipping.

**E. π visual-runtime lane — BINDING at close (AW ships visual changes)**
- [ ] Every visual-change wave (aurora, blob, dock-motion, glass-panel, card, gate-restyle, mobile-reflow) triggers a π probe.
- [ ] Coverage: ≥3 viewports (375×667, 1280×800, 1440×900), ≥5 animation frames per state-toggle, WCAG-AA contrast-vs-background, per-story consumption sweep.
- [ ] Tooling-contingency clause recorded if browser automation unavailable: π runs at build-verification floor + names the re-probe obligation to the next tranche.

**F. Scope-reveal protocol**
- [ ] The RECAP PARTIAL items (instrument-chassis, glyph-face, metric-cell/stack, glass-panel, composables-IA) are named as absorbed-scope-reveal waves OR escalated to triumvirate if file bounds expand beyond ≤2 paths.

**G. Style + explication**
- [ ] All prose unpretentious-academic: no scare-quotes, rhetorical questions, hype. Rewrite RECAP colloquialisms ("why do glass-panels suck", "wtf disco-glyph") into evidence-bearing scope.
- [ ] Every wave item carries WHAT (concrete mechanism) + WHY (the problem/gate/prior-decision it discharges).
- [ ] Meta-terms glossed on first use.

**H. File bounds + disjointness**
- [ ] File-bounds table per wave (path + access mode). No two parallel agents write the same modify/modify-carve path. Worktree plan for >1 writer.

**I. Triumvirate triggers**
- [ ] Each broad wave names the conditions mandating triumvirate (research+plan-augment+redress): file-bound expansion, non-local-recoverable gate failures, third diagnostic iteration.

**J. Format/lint cadence + commit plan**
- [ ] Broad impl waves run lint/format per integration batch + before close. Commit checkpoints named (agent impl, orchestrator integration, generated output, docs/status).

Current conformance: ~2/10 (no-legacy pattern inherited from AV; RECAP inventory complete). Target: 10/10 before dispatch.

---

## 5. THE PROPOSED AW + H WAVE LIST (34 waves)

Wave titles + one-line scope. 24 AW + 10 H = 34, clearing the 30+ target.

### AW (glass-ui) — 24 waves

- **AW.W0 — Formalize + spot-verify**: write AW.md, absorb the PARTIAL scope-reveals, run the overfitting spot-verification (instrument/glyph/metric-cell/stack consumer counts through re-export aliases) before any retire wave.
- **AW.W1 — Dock simple-collapse regression fix (HIGH)**: GlassDock two-layer collapse width morph; behavioral gate `proof:dock-collapse-live` (Playwright frame-timing, not just the layer-switch).
- **AW.W2 — Dock lockstep (HIGH)**: outer+inner+child on one timeline so opacity begins when both boxes start morphing, not at inner-spring settle.
- **AW.W3 — Dock springiness**: iOS spring physics + consistent motion language across collapse/switch/press.
- **AW.W4 — dock-with-slider**: keepDockOpen + slider-in-dock interaction; integration gate.
- **AW.W5 — Dock wrap layout**: multi-row wrap morph + stylization.
- **AW.W6 — DockLayerGroup rail polish**: consistent layering + switcher-rail refinement.
- **AW.W7 — Aurora painterly engine I**: oil-pastel mode genuinely painterly (not uniform gradient); the procedural zones/noise/color substrate.
- **AW.W8 — Aurora painterly engine II**: van-gogh atomic-brushstroke variant (depth, variation, no subject matter); arresting composed-art backdrops.
- **AW.W9 — Aurora full OKLCh + derive-color**: total OKLAB/OKLCh migration + derive-color variant.
- **AW.W10 — Aurora options-simplification**: keep wispy-sky default, slim the option set.
- **AW.W11 — Aurora WebGPU path**: modern WebGPU render with `navigator.gpu`-detection; WebGL2 stays substrate.
- **AW.W12 — Aurora interactivity**: dynamic + interactive on request.
- **AW.W13 — Blob visual/surface**: iridescence / SSS / specular material perfection.
- **AW.W14 — Blob soft-body + interaction**: soft-body deformation + pointer interaction.
- **AW.W15 — Blob mood/expressiveness**: expressive states + mood.
- **AW.W16 — Constellation component**: land `useCanvas2D` + `Constellation` (the AV.W8 gated work; slides H is consumer #2).
- **AW.W17 — glass-panel quality**: iOS-26 material + component polish.
- **AW.W18 — Component-route fixes**: card toggles + native-top-layer demo + drawer-live-behind audit.
- **AW.W19 — Instrument/glyph orphan resolution**: migrate-off+remove OR keep+document (post spot-verify).
- **AW.W20 — metric-cell/stack clean prune**: surface the hidden dep, then the clean removal.
- **AW.W21 — Component-colocation + composable assay**: deeper colocation refactor; real-public vs reference split (`use-token-color`).
- **AW.W22 — Styling assay**: brittle calc/magic-numbers → tokens; monolithic→colocated CSS; design-idiom localization.
- **AW.W23 — READMEs**: research-backed dock, constellation, aurora, blob docs.
- **AW.W24 — Library-convergence**: ship `DeckProgress` composition + `DialogForm` pattern + record the `/deck`-lift precondition; the glass-ui-gaps audit.

### H (slides) — 10 waves

- **H.W0 — Formalize + reground**: write H.md, absorb the §8 FOLD items, pin the AW dependencies.
- **H.W1 — De-dock the progress bar (HIGH)**: separate bottom-of-page element; consume AW.W24 `DeckProgress`; do not fight the dock layer-switch.
- **H.W2 — Gate restyle + lock affordance**: access-key modal glass-ui-styled (consume the `DialogForm` pattern); locked homepage decks blurred + lock symbol.
- **H.W3 — pptx-download UI**: download icons + light/dark popover menu.
- **H.W4 — Mobile squish reflow**: the "AI does…" dense lists at ≤700px (Slide08/Slide10).
- **H.W5 — XRAY mobile + button removal**: SlideXray full-height on mobile; remove the "Open AI XRAY" button.
- **H.W6 — Negative-space/density pass**: gutter audit across the 7-slide deck; tighten without cramping.
- **H.W7 — Constellation visibility**: graph contrast/readability across dark + light.
- **H.W8 — Complex-slide layout**: graphs/node-flow aspect-ratio at narrow/16:9/wide/portrait (playwright + frontend-design).
- **H.W9 — Language tuning**: "few dollars" de-minimis de-shoehorn; prose-scoped conformance gate.
- **H.W10 — Constellation-component consumption**: swap SlideXray + Slide01 onto the glass-ui `Constellation` (depends on AW.W16); preserve the `drawAnomaly` skin.

(H is 11 entries W0-W10; if a tighter count is wanted, W0 folds into H.W1's bootstrap, leaving 10 substantive waves.)

---

**HEADLINE: AV+G shipped 3.3.0 carrying ONE high regression (the GlassDock simple-collapse width-morph) — AW.W1+W2 fix it under a behavioral gate; AW carries 24 waves (dock-motion, the aurora-painterly + blob research engines, the Constellation/DeckProgress/DialogForm convergence primitives, the orphan prunes after a mandatory spot-verify) and H carries 10 (de-dock the progress bar, gate restyle, mobile reflow, the constellation consumption that is itself AW's 2nd-consumer unblock); the convergence rule is ≥2 consumers per new primitive, the engine mechanisms port while the slides brand content stays, and the RECAP inventory must be promoted to formal goal+completion-paired wave specs with π-lane visual gates before dispatch.**
