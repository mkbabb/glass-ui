# Tranche AW — the dock motion-language rebuild + the aurora/blob painterly perfection + the convergence primitives

AW is glass-ui's post-AV tranche. AV shipped 3.3.0 (the AU+AV cut) — the aurora OETF
fix, the slider two-only collapse, the god-module decomposition, the DI factory pair, the
iOS-26 Liquid Glass token edits — and the deep-audit verdict on the primitive set is
**well-built and cohesive (the AW work is a targeted fix pass, not a rebuild)**. AW lands the
ONE high regression that shipped with 3.3.0 (the GlassDock simple-collapse width-morph froze
when AV.W9 fixed the layer-switch), perfects the two procedural backdrops the research fans
named (aurora painterly + blob droplet), prunes the orphans a spot-verify clears, and ships
the convergence primitive the slides arm is the 2nd consumer of (the Constellation on a
`useCanvas2D` substrate). NO landed AV work is re-litigated.

**Plan basis** — `RECAP.md` (the disposition ledger: every session ask → DONE/FOLD/PARTIAL),
`audit/avg-deep-audit-digest.md` (the fold ledger + the convergence plan), and the five
research digests under `audit/research/` (`dock-animation-digest.md`, `aurora-digest.md`,
`blob-digest.md`, `code-quality-digest.md`, `frontend-convergence-digest.md`) plus the two
path-forward syntheses (`aurora/PATH-FORWARD.md`, `blob/PATH-FORWARD.md`). Every wave cites the
digest section it lands. glass-ui HEAD is `afdc485`, branch `at-dock-convergence`, version
**3.3.0 published on npm**.

**Format** — mirrors AV (`AW.md` charter + `PROGRESS.md` + per-wave specs under `waves/` +
`FINAL.md`). This file is the CHARTER only — DEV (it writes no `src`). The per-wave specs
(`waves/AW.W1-dock-collapse-regression.md`, `waves/AW.W4-aurora-painterly.md`, …) are authored
by the sibling fleet, each matching `precepts/instructions/tranche/WAVE_SPEC.md §1-11`. AW.W0
(formalize + spot-verify) is the only DEV wave; W1-W32 are IMPL and W33 is the close (LAST).

---

## §0 — The directive → disposition

The user's AW-round asks (from `RECAP.md`), each → one disposition row. No ask is silently
absorbed; the disposition cites the RECAP line.

| # | The user's directive (AW round) | Disposition |
|---|---|---|
| D-1 | **"the simple two-layer collapse is broken"** (dock width does not morph) | **AW.W1 HEADLINE (HIGH).** The slides e2e found the regression: AV.W9 fixed the `DockLayerGroup` layer-switch but broke GlassDock's own collapse — state toggles to expanded, width stays stuck at collapsed. Shipped in 3.3.0. AW.W1 fixes it under a behavioral frame-timing gate (`RECAP §2`). |
| D-2 | **"dock shrinks first, THEN items fade — the lockstep lag"** | **AW.W2 (HIGH).** The parent/children desync: child opacity ties to the inner spring settle, not the outer morph start. One-timeline lockstep so opacity begins when both boxes start morphing (`RECAP §2`). |
| D-3 | **"dock animations not springy / iOS-like"** + the rail/wrap/slider refinement | **AW.W3.** Unify the motion language onto one spring family across collapse/switch/press; absorb the dock-with-slider interaction, the multi-row wrap morph, and the DockLayerGroup rail polish into the layering refinement (`RECAP §2`). |
| D-4 | **"make aurora stunning — genuinely painterly oil-pastel + van-Gogh atomic brushstrokes"** | **AW.W4 (the four-fold painterly arc).** The structure-tensor orientation keystone, the height-field impasto relight, the energy-graded van-Gogh medium (tensor strokes + impasto + OKLCh jitter), the reworked deposition/scumble oil-pastel bake — all on the WebGL2 single-pass path (`aurora/PATH-FORWARD.md §1`). |
| D-5 | **"full OKLCh + a derive-color front door"** | **AW.W5 (opens FIRST in the aurora band — W4 consumes its jitter seam).** Move the linear-sRGB palette interpolation + the YIQ hue jitter onto the value.js Ottosson OKLCh core; ship the `deriveScene(seed, mood)` authoring entry over a single seed (`aurora/PATH-FORWARD.md §0`). |
| D-6 | **"keep the wispy-sky default; simplify the option set"** + WebGPU + interactivity | **AW.W6 + W7 + W8.** ADDITIVE `resolveAtoms` authoring door — a small atom set maps to the full `AuroraConfig`, the default atoms resolve to the wispy-sky default, NOTHING removed from `AuroraConfig` (W6); the gated WebGPU render path behind `navigator.gpu` (WebGL2 stays the declared fallback, W7); the fully-dynamic interactive mode on request (W8) (`aurora/PATH-FORWARD.md §0`, `RECAP §4`). |
| D-7 | **"make the blob stunning — visual style, interaction, mood; perfect, performant, dynamic"** | **AW.W9-W11.** The lit iridescent droplet (fake-normal specular + Fresnel rim + OKLCh iridescence), the soft-body squish + felt pointer model, the mood/state system wired-or-excised (`blob/PATH-FORWARD.md §1`, `RECAP §5`). |
| D-8 | **"why do all the glass-panels suck?"** + the broken card toggles + the datatable split | **AW.W12-W15.** The glass-panel svg-filter-tier variant collapse (five rungs → one), the card-toggle perception trap, the DataTable colocation split, the styling/composable hygiene (`frontend-convergence-digest`, `code-quality-digest`). |
| D-9 | **"where's our slides primitive with the bottom bar — abstract it into glass-ui"** | **AW.W16 + W17.** Ship the `DeckProgress` composition over the existing `Progress` fill (W16); land the Constellation component + the `useCanvas2D` substrate (W17; AV.W8 gated-not-landed at 1 consumer, the slides H is consumer #2) (`RECAP §6`, `avg-deep-audit-digest §3`). |
| D-10 | **"the orphan resolution"** (instrument/glyph/disco-glyph, metric-cell/stack) | **A DEDICATED orphan-resolution wave** (the sibling fixer authors it; the `AW.W14-datatable-split.md` file is DataTable-split ONLY — it carries no orphan/metric-cell scope). After a mandatory W0 spot-verify (consumer counts through re-export aliases AND the external-consumer sweep over the constellation consumer repos per `SPEC §"Audit-verdict spot-verification gate"`): migrate-off-and-remove OR keep-and-document. metric-cell/metric-stack resolve KEEP-and-document — the AV.W10 hidden dep was the EXTERNAL speedtest subpath consumer (≥2: `ResultDetailSheet.vue` ×4 + `ResultStack.vue` ×6 + the demo), so there is no prune. `useBreakpoint` (removed at AV `cbbaeb0`) is RE-INSTATED to `/dom` on its ≥2 external value.js + speedtest consumers (`RECAP §1`). |
| D-11 | **"the READMEs"** (dock, aurora, blob, constellation) | **AW.W33 (the close wave, LAST).** The four research-backed READMEs ride the gate-fleet + π-lane + `FINAL.md` close; the W18 slot holds the gate-pattern access-modal idiom, W19 the orphan-resolution (keep-and-document — incl. metric-cell/stack + the useBreakpoint re-instate), W20 the styling-assay, W22-W26 the GLASS-ATOMS band, and W28-W32 the NEW-SCOPE band G ahead of the close (`RECAP §6`, `RECAP ADDENDUM 3`). |
| D-12 | **"perfect the glass atoms"** — the glass-material/card/primitive material + idiom sweep | **AW.W22-W26 (the GLASS-ATOMS band, band F).** The 8-agent glass-atoms research (`audit/research/glass-atoms-digest.md`) returns ONE verdict: glass-ui's material spine, card surface, and glass ladder are SOTA — the defect is **uneven application** of that spine across the interactive atoms, plus three Baseline-2025 capabilities left unused. A DRY-consolidation band that routes every atom onto the existing spine + folds the unused Baseline-2025 capabilities: W22 glass-material unify+extend (specular/rim into the ladder, gated `#glass-refract`/`corner-shape:squircle`/directional-rim/content-tint), W23 glass-card shadcn-2025 perfection (`--card-spacing`/`CardAction`/hover-elevation/specular seam/cream-read), W24 primitive geometry+material+bug (`--radius-field`/Textarea-pill-fix/Switch+Checkbox glass/Checkbox-indeterminate), W25 cross-atom motion+a11y+overlay-band+tone parity (press-spring universalize, `.focus-ring`, Toast/Command→`glass-floating`, Alert/Toast tones), W26 reka/shadcn/Tailwind/mwg idiom + binding guard (`data-slot`, CVA modernization, `aria-invalid` paint, text-shadow tokens, the binding Playwright spec). The named affordance bugs (gold-audacious, 8%α borders, slider fill) stay owned by W13; the `[aria-invalid]` ring widen by W18. |
| D-13 | **"is this the whole picture?"** — the monolithic-totality re-check | **The glass-atoms digest is the totality answer (`glass-atoms-digest §SYNTHESIS`).** The four faction plans (material, card, primitives, idiom) converge on 5 waves with NO proliferation — material+card fold into two waves, the whole primitive sweep into two, idiom into one. The stale `light-dark(light-dark())` double-nest claim (W12 §3.3) is struck: at HEAD the `--glass-bg-*` tokens carry a single `light-dark()`, so that sub-item is a no-op and is NOT re-seeded. The negative findings (the `srgb` glass ladder is Baseline-correct, scrollbar utils + `@container-size` + stock palettes are at-or-above the v4.3 bar) are NOT re-litigated. |
| D-14 | **stack-currency** — reka-ui 2.9 + shadcn-vue (CVA 0.7) + Tailwind v4.3 | **Idiom-only, NO upgrade (`glass-atoms-digest §stack currency`).** Installed + verified: reka-ui 2.9.7, Tailwind 4.3.0, CVA 0.7.1, Vue 3.5.34 — all current. The glass-atoms band targets **Tailwind v4.3 (NO v5)** + idiomatic reka-ui ^2.9 + shadcn-vue; every gated Baseline capability is `@supports`-gated with a round/`border-radius` fallback (`corner-shape:squircle`, `backdrop-filter:url(#…)` refraction). New reka 2.9 `Color*`/`Autocomplete`/`MonthPicker` wraps are NOT minted speculatively (visual-load-bearing ≥2-consumer); only Checkbox-indeterminate has concrete in-repo demand and lands (W24). |
| D-15 | **"storybook layout perfected — EVERY component demonstrated"** + **"a brand-new dock-based demo nav: a SIDEBAR dock AND a BOTTOM-bar dock"** | **AW.W28 (band G, the demo-shell wave).** Audit the AV.W10 11-category demo IA for completeness (no glass-ui component without a story) AND re-build the storybook navigation on the glass-ui dock — a sidebar dock + a bottom-bar dock, both dock-driven, dogfooding the shipped dock + the glass atoms with iOS-26 idiom. DEMO-INTERNAL: the nav shell is demo-private chrome over the already-shipped `GlassDock`/`DockLayerGroup` primitives — it does NOT mint a new library primitive (`RECAP ADDENDUM 3`). |
| D-16 | **"the aurora CONFIGURATOR redesign"** | **AW.W29 (band G).** Re-design the aurora controls surface with iOS-26 + idiomatic glass atoms; it EXTENDS the existing shipped `Configurator` (a restyle/dogfood of an already-shipped primitive with consumers — aurora chrome + the demo — not a new control) (`RECAP ADDENDUM 3`). |
| D-17 | **"the CAROUSEL redesign"** | **AW.W30 (band G).** Re-design the carousel with iOS-26 + idiomatic glass atoms; it restyles the already-shipped `GlassCarousel`/`carousel` family (an existing-component refactor with consumers, not a speculative mint) (`RECAP ADDENDUM 3`). |
| D-18 | **"a deep ANIMATION audit + a DESIGN.md audit"** | **AW.W31 (band G).** The animation-language coherence audit across the dock/aurora/blob/primitives motion (one spring vocabulary, consistent timing/curves) + the DESIGN.md currency/completeness pass (it documents the warm-cream + iOS-26 + glass-atoms spine the tranche landed). Audit-and-reconcile over the shipped motion + the standing DESIGN doc — no new primitive (`RECAP ADDENDUM 3`). |
| D-19 | **"a deep LIGHTHOUSE audit for every page + slide"** (perf/a11y/best-practices/SEO) | **AW.W32 (band G, glass-ui demo arm) + H (slides arm).** The glass-ui demo Lighthouse audit (perf/a11y/best-practices/SEO over every demo page) lands as AW.W32; the slides Lighthouse audit is the H arm (`RECAP ADDENDUM 3`, `H.md`). Audit-and-fix over the demo pages — it ships fixes, not a new surface. |

---

## §1 — Where AW stands (re-ground, HEAD `afdc485`)

HEAD `afdc485`, branch `at-dock-convergence`, version **3.3.0 published on npm** (the AU+AV cut;
release run cited in `MEMORY project_publish_ci_broken`). The deep-audit verdict on the AV+AU
primitive set is **strong architectural discipline** — of 19 large components only `DataTable.vue`
(442) clearly exceeds the god-module threshold, colocation is consistently applied, no orphan
composables (`code-quality-digest §1`). AW is therefore a **refinement-and-perfection tranche**,
not a corrective successor: it lands the one regression the static gates could not catch (the
simple-collapse width-morph — same gate-vs-runtime gap class AV.W9 named for the layer-switch),
perfects the two backdrops the research fans proved have headroom, and ships the convergence
primitives the ≥2-consumer rule now clears.

**The regression — the AW.W1 headline.** AV.W9 retired the AU.W8b dual-driver and made the
`DockLayerGroup` multi-layer switch animate (runtime-verified 40→197 over 12 frames). It also
broke the SIMPLE two-layer collapse — the default + `#collapsed` slot path that slides consume:
the state toggles to expanded, but the width does not morph (stuck at collapsed width). This
shipped green in 3.3.0 because the dock-motion gate samples the layer-switch path, not the
plain-collapse path. AW.W1 fixes it AND widens the gate to sample BOTH paths so this class
cannot ship green again (`RECAP §2`, `avg-deep-audit-digest §1 row 1`).

**AW's braids:**
1. **The dock motion-language** (W1-W3) — the simple-collapse regression fix, the one-timeline
   lockstep, the unified iOS spring family across collapse/switch/press + the slider/wrap/rail
   refinement. Grounded against `dock-animation-digest` (the M3 Expressive spatial-vs-effects
   spring separation, the `.bouncy` morph spring, the velocity-continuity-on-retarget).
2. **The aurora painterly engine** (W4-W8) — the OKLCh color core + derive-color front door
   (W5, opens FIRST in the band), the four-fold painterly arc (structure-tensor + impasto-relight
   + van-Gogh medium + reworked oil-pastel — W4, consumes W5's OKLCh jitter seam), the ADDITIVE
   `resolveAtoms` authoring door (W6 — nothing removed from `AuroraConfig`), the gated WebGPU
   backend (W7), the interactivity (W8). Grounded against `aurora/PATH-FORWARD.md`.
3. **The blob droplet** (W9-W11) — the lit iridescent surface material, the soft-body + felt
   interaction, the mood system. Grounded against `blob/PATH-FORWARD.md`.
4. **The component fix pass** (W12-W15) — the glass-panel tier collapse, the affordance lifts
   (8%-border, gold-audacious cream-on-cream text, goo-blob `var()` throw), the DataTable split,
   the colocation/naming hygiene. Grounded against `frontend-convergence-digest` +
   `code-quality-digest`.
5. **The convergence + gate-pattern + hygiene** (W16-W20) — the `DeckProgress` composition (W16)
   over the existing Progress fill, the Constellation + `useCanvas2D` (W17, the 2nd-consumer
   unblock), the gate-pattern access-modal idiom (W18), the orphan-resolution + metric-cell/stack
   prune (W19), the styling assay — tokenization + Tabs pill-track + ToggleGroup re-roll (W20).
6. **The glass-atoms band** (W22-W26, band F) — the DRY-consolidation that routes every interactive
   atom onto glass-ui's already-SOTA material spine + folds the four unused Baseline-2025
   capabilities: glass-material unify+extend (W22), glass-card shadcn-2025 perfection (W23),
   primitive geometry+material+bug (W24), cross-atom motion+a11y+overlay-band+tone parity (W25),
   the reka/shadcn/Tailwind-v4.3/mwg idiom + binding guard (W26). Grounded against
   `audit/research/glass-atoms-digest.md` (the SYNTHESIS + the eight lane briefs).
7. **The new-scope band G** (W28-W32) — the demo-shell + existing-surface restyle work `RECAP
   ADDENDUM 3` folded: the storybook-completeness audit + the dock-based demo nav (sidebar dock +
   bottom-bar dock, dogfooding the shipped dock/atoms — DEMO-INTERNAL) (W28), the aurora-Configurator
   restyle (W29), the carousel restyle (W30), the animation-coherence audit + the DESIGN.md currency
   pass (W31), the glass-ui-demo Lighthouse audit (W32). These dogfood/restyle ALREADY-SHIPPED
   primitives (the dock, Configurator, carousel) and audit-and-fix the demo — they do NOT mint new
   speculative primitives. Grounded against `RECAP ADDENDUM 3`.
8. **The close** (W33, LAST) — the gate-fleet registration + `proof:aw-final` + the four
   research-backed READMEs + the overfitting audit + the π visual-runtime lane + `FINAL.md`.

The `waves/` dir holds the per-wave specs this table references.

---

## §2 — The wave table (W0-W33 · 7 bands + gate-pattern + orphan-prune + styling-assay + close)

The tranche runs seven bands plus the gate-pattern wave, the orphan-prune, the styling-assay, and a
close wave. **Band A (W1-W3)** is the dock motion-language — AW.W1 (the simple-collapse regression)
is the HIGH headline, AT-disjoint, opens FIRST. **Band B (W4-W8)** is the aurora painterly engine
(W5 — the OKLCh color core — opens BEFORE W4, which consumes its jitter seam). **Band C (W9-W11)**
is the blob droplet. **Band D (W12-W15)** is the component fix pass. **Band E (W16-W17)** is the
convergence (W16 DeckProgress, W17 Constellation). **W18** is the gate-pattern access-modal idiom;
**W19** is the orphan-resolution + metric-cell/stack prune; **W20** is the styling assay
(tokenization + Tabs pill-track + ToggleGroup re-roll). **Band F (W22-W26)** is the GLASS-ATOMS
band — the DRY-consolidation that routes every interactive atom onto glass-ui's already-SOTA
material spine + folds the four unused Baseline-2025 capabilities (`audit/research/glass-atoms-digest.md`).
**Band G (W28-W32)** is the NEW-SCOPE band `RECAP ADDENDUM 3` folded — the storybook-completeness +
dock-based demo nav (W28), the aurora-Configurator restyle (W29), the carousel restyle (W30), the
animation-coherence + DESIGN.md currency audit (W31), the glass-ui-demo Lighthouse audit (W32); these
dogfood/restyle ALREADY-SHIPPED primitives (the dock, Configurator, carousel) + audit-and-fix the
demo, minting NO new speculative primitive. **W33** is the gate-fleet + READMEs close (LAST). **W21
retired in the renumber** — the close moved to W27 to open after the glass-atoms band, then to W33
to open after band G, so the W21 slot is unused (no file, no row). Each wave names a falsifiable HARD
gate; the gate is RED on HEAD and GREEN at close.

| Wave | What | Type | HARD gate (one-line, falsifiable) |
|---|---|---|---|
| **AW.W0** | **Formalize + spot-verify (DEV).** Write `AW.md`+`PROGRESS.md`; re-ground against HEAD `afdc485`; bind zero-deferral at open (P-Inv 28). Run the overfitting spot-verify BEFORE any retire wave: every cited path EXISTS (ls/Read), every rg consumer-count re-run verbatim, every "zero consumers" claim resolved through re-export aliases (INTERNAL) AND — for any subpath-EXPORTED candidate — the external-consumer sweep over the constellation consumer repos (speedtest/value.js/… — external npm consumers reached over the flat subpaths count the same as internal ones), or the provisional-pending-a-constellation-grep flag + the known-consumer roster (instrument-chassis/instrument-rail, glyph-face/disco-glyph, metric-cell/metric-stack, the `/dom` `useBreakpoint` — see `SPEC §"Audit-verdict spot-verification gate"`). See `waves/AW.W0-spot-verify.md`. | DEV | `proof:aw-w0-reground` — `AW.md`+`PROGRESS.md` exist; HEAD `afdc485` ancestor-reachable; every digest fold tagged; the spot-verify ledger records EXISTS + verbatim-rg-count + alias-resolved verdict + the external-consumer sweep (or provisional flag + known roster) for every W19 retire candidate; a hallucinated item or under-count (internal OR external) halts the close |
| **AW.W1** | **DOCK SIMPLE-COLLAPSE REGRESSION FIX (the HIGH headline).** Restore the GlassDock two-layer collapse (default + `#collapsed`) width morph that AV.W9 broke when it fixed the layer-switch. ONE size authority across both the collapse path AND the layer-switch path (the regression is the two paths diverged). Widen the behavioral gate to sample BOTH the FLIP and the VT timelines. See `waves/AW.W1-dock-collapse-regression.md`. Opens FIRST (AT-disjoint) | IMPL | `proof:dock-animation-live` — born-RED on HEAD goes GREEN: a real-browser rAF probe samples the GlassDock OWN collapse↔expand width morph (the `summary`↔`full` outer pair, NO DockLayerGroup) over ≥3 rising frames on BOTH the FLIP and VT paths; bite: a frozen-at-collapsed-width single-frame timeline → RED |
| **AW.W2** | **DOCK LOCKSTEP (HIGH).** Put the outer box, inner box, and child opacity on ONE timeline so opacity begins when both boxes START morphing — not at the inner-spring settle (the "shrinks first, THEN items fade" desync). One opacity authority keyed off the same progress the size authority reads; re-seat opacity from its live value (not 0%) through a mid-flight retarget. Retune `DOCK_SPRING` and the `--spring-dock` token together. See `waves/AW.W2-dock-motion-unify.md`. Opens after W1 | IMPL | `proof:dock-animation-live` (opacity re-seats from its live value through a retarget; the width/opacity arrival delta holds ≤16.7ms — one frame — on the interrupted swap) + `proof:spring-tokens-synced` (`DOCK_SPRING` and the `--spring-dock` token moved together to the retuned curve); bite: re-tie opacity to the inner settle → the start-delta exceeds one frame → RED |
| **AW.W3** | **DOCK LAYERING POLISH + slider/wrap/rail.** Unify the layering motion onto ONE iOS spring family (the M3 spatial-vs-effects separation: spatial springs overshoot, effects springs do not — `dock-animation-digest §B`): directional VT asymmetry (expand vs collapse carry distinct curves), a spring-keyed item-stagger (not a fixed-ms timer), the collapsed-hover scale on the dock spring vocabulary, the multi-row `overflow="wrap"` reflow MORPHING rather than snapping at the `--dock-overflow-bp` boundary, and the DockLayerGroup switcher-rail polish; the dock-with-slider `keepDockOpen` interaction. See `waves/AW.W3-dock-layering-rail-wrap.md`. Opens after W2 | IMPL | `proof:dock-layering-polish` — a Playwright gate asserts directional VT asymmetry (distinct expand/collapse `:active-view-transition-type` curves), the spring-keyed expand-stagger cascade, the collapsed-hover scale riding the dock spring, and the wrap-row reflow morphing at the `--dock-overflow-bp` crossing; bite: a snap (non-morph) wrap or a fixed-ms stagger → RED |
| **AW.W4** | **Aurora painterly - the four-fold painterly arc (tensor + impasto + van-Gogh + oil-pastel).** The per-pixel structure-tensor orientation+anisotropy field (Kyprianidis & Kang 2009) that drives `strokeOrient:"tensor"`; the height-field impasto relight (a `uLightDir`-driven catch-light replacing the fixed-RGB rim constant in `paintOver`); the energy-graded van-Gogh medium (tensor strokes + impasto + OKLCh jitter); the reworked oil-pastel deposition/scumble bake — all on the WebGL2 single-pass path inside `profile:budget`. The Gaussian-smoothed multi-tap tensor + per-stroke compute are W7's WebGPU scope. See `waves/AW.W4-aurora-painterly.md`. Opens after W5 (the OKLCh color core) | IMPL | four born-RED gates: `proof:aurora-tensor-field` (eigen-decomp matches a synthetic gradient field; `strokeOrient:"tensor"` tracks the field gradient) + `proof:aurora-impasto-relight` (the fixed-RGB rim constant is gone; a `uLightDir` sweep moves the catch-light) + `proof:aurora-vangogh-preset` (the `vangogh` medium resolves its uniforms + the `renderAt(t)` bake is snapshot-blessed) + `proof:aurora-oilpastel-medium` (the reworked bake is blessed + the single-pass path stays inside `profile:budget`); bite: a major-eigenvector swap / a restored fixed rim → RED |
| **AW.W5** | **Aurora color - full OKLCh interp + derive-color front door.** Migrate the palette interpolation + the `brokenColorJitter`/`saturate3` jitter off linear-sRGB/YIQ onto the value.js Ottosson OKLCh core (splicing the shared `OKLCH_MATRICES_GLSL`); add `split-complementary` + `tetradic` to the `AuroraHarmony` union + `deriveHue`, `lightnessEasing`/`chromaEasing`, `temperatureShift`, and the `deriveScene(seed, mood)` front door (one seed → the full palette). Opens BEFORE W4 (the painterly arc consumes the OKLCh jitter seam). See `waves/AW.W5-aurora-color-derive.md`. Opens first in the aurora band | IMPL | two born-RED gates: `proof:aurora-oklch-interp` (the spliced `OKLCH_MATRICES_GLSL` matches the value.js Ottosson constants to 1e-6 + the OKLCh interp of a vivid blue→yellow pair holds chroma ABOVE the linear-`mix` midpoint) + `proof:aurora-derive-gamut` (every stop of every harmony × easing × temperature combo over a neon-seed matrix is in-sRGB after `gamutMapStop`); bite: revert `samplePalette` to the linear `mix()` / remove a `gamutMapStop` guard → RED |
| **AW.W6** | **Aurora options - the additive authoring door (keep wispy-sky default).** Ship `resolveAtoms(atoms) → AuroraConfig`: a pure, TOTAL mapper over the ≤7 Tier-1 atoms (seed, harmony, mood, medium, textureAmount, motion, zones) so a consumer authors an aurora from a small atom set rather than the full `AuroraConfig`. ADDITIVE — nothing is removed from `AuroraConfig`; `AuroraAtoms` + `DEFAULT_ATOMS` are exported (+ `AuroraAtoms` on `/api`) and the default atoms resolve to the wispy-sky `DEFAULT_AURORA_CONFIG`. See `waves/AW.W6-aurora-options.md`. Opens after W5 | IMPL | `proof:aurora-atoms-roundtrip` — `resolveAtoms` is a total function (every atom combination yields a valid in-range `AuroraConfig` respecting every `budget.ts` cap, no NaN/out-of-range) AND `resolveAtoms(DEFAULT_ATOMS)` deep-equals `DEFAULT_AURORA_CONFIG`; bite: a `DEFAULT_ATOMS` value so the default no longer resolves to wispy-sky / a removed `budget.ts` clamp overflowing a vivid×6-zone combo → RED |
| **AW.W7** | **Aurora WebGPU (gated).** Lift the backend-AGNOSTIC lifecycle out of `useWebGLCanvas.ts` into a shared core + add a `createGPUCanvas` sibling behind `navigator.gpu`-detection — the multi-tap smoothed tensor + per-stroke compute the WebGL2 single-pass cannot afford; WebGL2 STAYS the declared zero-regression fallback (WebGPU is Limited Baseline per AV's SOTA crosswalk). Hand-written WGSL, no Three.js/TSL. See `waves/AW.W7-aurora-webgpu.md`. Opens after W4/W5 | IMPL | two born-RED gates: `proof:aurora-backend-fallback` (force the WebGL2 path; it renders the identical visual contract — the declared zero-regression fallback) + `proof:aurora-wgsl-equivalence` (the WGSL color/noise chunk matches its GLSL twin to 1e-6 — the AV.W1 divergence-bug-class pre-empt); `proof:offscreen-pause` GREEN with the WebGPU path; bite: break the WebGL2 fallback route / perturb a WGSL matrix constant → RED |
| **AW.W8** | **Aurora interactive.** The fully-dynamic interactive mode on request — cursor-as-light driving W4's `uLightDir`, a velocity-reactive flow burst, scroll coupling via `useScrollProgress`, the WebGPU stateful wake (the ping-pong velocity texture) on the W7 branch; a master tempo scalar dials the stack (opt-in, reduced-motion-guarded so the wispy-sky default stays calm). See `waves/AW.W8-aurora-interactive.md`. Opens after W4/W7 | IMPL | `proof:aurora-interaction-prm` — every new interactive/parallax axis is SUPPRESSED under `prefers-reduced-motion: reduce` AND the master tempo scalar zeroes the stateful field; the `DockBackgroundToggle` pause stops every axis; `proof:offscreen-pause` (W7-extended) confirms a parked rAF skips the wake's self-advection; bite: detach an axis from the master tempo scalar so it animates under reduce → RED |
| **AW.W9** | **BLOB DROPLET — the lit surface material (the HEADLINE).** Flip the flat-shaded silhouette to a wet droplet: derive the fake surface normal from the SDF gradient (already called for the `fwidth` AA), add Blinn-Phong specular (a tight lobe for wet glass + a broad lobe for gel sheen) + Schlick/Fresnel rim — all in linear light before the OETF, premultiply-correct, reusing the shared `procedural-color.glsl.ts` (no new color seam); retire the `POS_SCALE`/`/0.22` smoothK fudge and subsume the `edgeGlow` site into the Fresnel rim. See `waves/AW.W9-blob-droplet.md`. Opens after the blob baseline confirm | IMPL | `proof:blob-smin-normalized` + `proof:blob-gradient-unit-length` (the derived normal is unit-length across the interior; the `edgeGlow` site is gone) + `proof:blob-spec-premult` (light folds into rgb before `linearToSrgb` and before `* alpha`); `proof:blob-color-equivalence` + `proof:blob-space-gamma` stay green; bite: strip the normal → the flat silhouette returns → RED |
| **AW.W10** | **BLOB SOFT-BODY + INTERACTION — wire the built-but-dead model.** The headline finding: `setMood`/`nudge`/`pointerAttraction` are exposed but no consumer calls them. Wire the pointer interaction (a felt, frame-rate-independent attraction over the substrate's single rAF — reusing `useSpring`, not a hand-rolled fixed-α lerp) + a soft-body squish; the demo story drives the shipped interaction (no orphaned `pointerAttraction`); every new motion axis collapses to no-op under `prefers-reduced-motion` and stays reachable by `pause()`/`resume()`. See `waves/AW.W10-blob-interaction.md`. Opens after W9 | IMPL | `proof:blob-interaction-prm` — every new motion axis is no-op/instant under PRM, routes through the single rAF, stays `pause()`/`resume()`-reachable, and the spring is frame-rate independent; the demo story drives it; `proof:offscreen-pause` stays green; bite: an axis that animates under PRM / a frame-rate-dependent deflection → RED |
| **AW.W11** | **BLOB MOOD + SURFACE COLOR — iridescence/SSS + wire-or-excise.** Land the warm-biased OKLCh iridescence + SSS terms in the surface color (in OKLCh before the gamut clamp, splicing the shared chunk; the blob consumes the shared `ColorHarmony`, no forked `deriveHue`); resolve the 5-mood cross-fade engine — a consumer-reachable mood API with a demo exercising every shipped mood OR excise the unwired engine (the substrate-without-consumer rule); no orphaned `setMood`/`orbitSpeedScale`/`wobbleScale`. See `waves/AW.W11-blob-mood.md`. Opens after W10 | IMPL | `proof:blob-color-equivalence` (the iridescence + SSS terms in the TS port; the warm-bias chroma-cap holds) + `proof:single-color-core` (the blob consumes the shared `ColorHarmony`, no forked `deriveHue`) + `proof:blob-mood-resolved` (the mood model is wire-or-cut, no orphaned `setMood`/`orbitSpeedScale`/`wobbleScale`; a demo story exercises every shipped mood); bite: an unwired mood engine survives → RED |
| **AW.W12** | **GLASS-PANEL TIER-COLLAPSE FIX + demo backdrop.** The five-rung ladder collapses to ONE rung under the default `svg-filter` tier (`GlassPanel.vue:60-72` returns `glass-panel--svg` for ALL variants; `:104-108` paints only `--glass-bg-wash`). Make the `--svg`/`--fallback` branches honor `variant` via `--glass-bg-{variant}`; clean the double-nested `light-dark()` bg tokens; give the glass-panel + card stories a high-frequency backdrop (existing Aurora/PaperBackdrop) so the rungs read. See `waves/AW.W12-glass-panel-fix.md`. Opens after the Band-A close | IMPL | `proof:glass-panel-tiers` — the five variants render five DISTINCT backgrounds under the svg-filter tier (a render-capture assert finds five distinct computed `--glass-bg-*`, not five identical wash); bite: re-hardcode wash on `--svg` → the five collapse to one → RED |
| **AW.W13** | **AFFORDANCE LIFTS.** The too-timid cream affordances: lift the 8%-α resting input/select border (token) so the field edge reads on cream; replace `text-white` on `gold-audacious` (cream-on-cream invisible CTA text) with a foreground/contrast token surviving the 8% rest tint + audit `primary-audacious`; fix the goo-blob `var(--primary)` throw (`defaultBlobColorResolver`→`cssToOklch` feeds `var()` to value.js which throws — resolve against computed style OR fix the story to pass concrete colors); fix the card-toggle perception trap (the demo staging, not the component). See `waves/AW.W13-affordance.md`. Opens after W12 | IMPL | `proof:affordance-contrast` — the resting input border resolves above the cream perceptual floor; `gold-audacious`/`primary-audacious` CTA text clears WCAG-AA on its rest substrate (a contrast probe ≥4.5:1); the goo-blob story renders without a per-frame throw (console clean); bite: revert any of the three → RED |
| **AW.W14** | **DATATABLE COMPOSABLE SPLIT.** Split `DataTable.vue` (442→≤380) into two colocated internal composables (`useDataTableRowIdentity` owns row-identity, `useDataTableResponsive` owns the card-vs-table projection) — no public API change, `index.ts` diff empty. See `waves/AW.W14-datatable-split.md`. Opens independent of W12/W13/W15 (disjoint bounds). The orphan-resolution + metric-cell/stack-prune scope D-10 once folded here moved to a DEDICATED orphan-resolution wave the sibling fixer authors (the W14 file is DataTable-split only) | IMPL | `DataTable.vue ≤ 380 lines`; `vue-tsc --noEmit` green; `vitest run tests/components/ui/data-table/` green; `proof:no-test-in-src` clean; `git diff src/components/ui/data-table/index.ts` empty; bite: a >380 `DataTable.vue` or a public-API delta → RED |
| **AW.W15** | **COLOCATION + NAMING HYGIENE.** Every public composable that returns a state object exports a named `Use<Name>Return` interface (or returns a documented primitive); the `twin-line-divider` idiom collapses to a single `@utility` with ≥2 consumers; `useTokenColor` accepts an optional injected resolver (proven by a unit); the cleared god-modules carry a one-line DO-NOT-SPLIT rationale. See `waves/AW.W15-hygiene.md`. Opens independent of W12/W13/W14 (disjoint bounds). The deeper styling assay D-? (brittle-number→token tokenization, Tabs pill-track, raw-`<button>`→`<ToggleGroup>` re-roll) moved to a DEDICATED styling-assay wave the sibling fixer authors (the W15 file is colocation/naming-hygiene only) | IMPL | every state-returning public composable carries a named `Use<Name>Return` interface (or a documented primitive); `twin-line-divider` is a single `@utility` with ≥2 consumers; `useTokenColor` injection seam proven by a unit (`tests/composables/dom/useTokenColor.test.ts`); `vue-tsc --noEmit` green, zero import-site breakage; `proof:no-test-in-src` clean; bite: a state-returning composable with no named return interface → RED |
| **AW.W16** | **DECKPROGRESS POSITION RAIL.** Ship the position-progress RAIL over the EXISTING `Progress` fill (NOT a fork): a `.glass-progress-rail` CSS recipe in `glass.css` (hairline track, leading-edge glow, `--progress-rail-*` token axes) + a thin `DeckProgress.vue` `:value`-only wrapper rendering `<Progress variant="default" :model-value="value" class="glass-progress-rail">`. NO `deckProgress(index, total)` math leaf (the arithmetic is a consumer one-liner — `100·(k+1)/N`), NO `position`/`z-index`/`env(safe-area)` in the wrapper (the viewport-pinned chrome is consumer-supplied), NO `/deck` subpath (the name is reserved for the slides deck-engine lift). The 2nd consumer is slides H.W1 (the de-docked bar); the 1st is the glass-ui demo story. See `waves/AW.W16-deckprogress.md`. Opens after W12 | IMPL | `proof:deck-progress-rail` — a `.glass-progress-rail` rule exists in `glass.css` reading `--progress-rail-*` tokens and composing the shipped `<Progress>` hooks (no second width-animated track); `DeckProgress.vue` references `<Progress` (composes, not forks), declares no `position:`/`z-index:`/`env(safe-area`, and imports no `deckProgress`/math helper; no `src/subpaths/deck.ts` and no `./deck` export entry; born RED on HEAD (no recipe, no wrapper); bite: fork the fill / pin the chrome / mint the math leaf or the `/deck` subpath → RED |
| **AW.W17** | **CONSTELLATION COMPONENT + `useCanvas2D` (the 2nd-consumer unblock).** Land the AV.W8 gated-not-landed work: the `Constellation` component on a NEW `useCanvas2D` substrate (Canvas2D, sibling to `useWebGLCanvas`, composing `useRAFLoop` + `useIntersectionPause` + the shared `prng.ts`) — the proximity-graph engine mechanism ports (dpr-resize, palette-read-on-dark-flip, RAF arm/disarm, the draw passes); the slides red-anomaly skin stays a consumer overlay. The 2nd consumer is slides H.W4/W10; the 1st is the glass-ui demo story. See `waves/AW.W17-constellation-component.md`. Opens after the Band-A close | IMPL | `proof:constellation-substrate-single` — `useCanvas2D` (exports `createCanvas2D`) + `Constellation` compose it, the engine consumes glass-ui's `prng` (`mulberry32`/`hashString`, NO private copy), and the anomaly skin is a consumer draw-pass (no `accentColor`/`--ncsu-red`/`Fira Code` literal in `src/components/custom/constellation/*`); the substrate parks offscreen/under PRM; born RED on HEAD; bite: a private `mulberry32` re-roll or a red-skin literal in `src/` → RED |
| **AW.W18** | **GATE PATTERN — the non-dismissable access-modal glass idiom.** Widen the `.input-pill` invalid-ring selector group to include `[aria-invalid="true"]` alongside `:user-invalid`/`.user-invalid-fallback` (the one genuinely ≥2-consumer library edit the slides `DeckGate` surfaced — any app-driven-validation form), and ship a `GatePattern.story.vue` demonstrating the form-in-`Dialog` idiom (consumer #1) composing shipped parts with NO new component; the slides `DeckGate` (H.W2) is consumer #2. Digest: `frontend-convergence-digest` Lane 4 Findings 1+2. See `waves/AW.W18-gate-pattern.md`. Opens independent of the dock/aurora/blob arcs | IMPL | `proof:input-invalid-aria` — the `.input-pill` invalid-ring selector group contains all three members (`:user-invalid`, `.user-invalid-fallback`, `[aria-invalid="true"]`) and the ring still resolves `var(--destructive)`; born RED on HEAD (the rule keys off two of three); bite: drop the `[aria-invalid]` arm → RED |
| **AW.W19** | **ORPHAN RESOLUTION (keep-and-document).** Resolve every W0-ledger orphan candidate one of exactly two ways per the W0 verdict — keep-and-document (≥2 genuine consumers + a one-line load-bearing rationale) OR migrate-off-and-remove (zero residue). metric-cell/metric-stack KEEP on their ≥2 EXTERNAL speedtest consumers (the AV.W10 "hidden dep" was that external subpath consumer, surfaced by W0's external-consumer sweep — no prune, no kept substitute to migrate onto; the subpath mirrors + `api/index.ts` types + `package.json` exports all STAY); `useBreakpoint` is RE-INSTATED to `/dom` (restored from `cbbaeb0`'s parent) on its ≥2 external value.js + speedtest consumers. W19 executes the W0 ledger; it does not re-adjudicate. See `waves/AW.W19-orphan-prune.md`. Opens after W0 + the Band-D close | IMPL | `proof:orphan-resolved` — every W0-ledger candidate has ≥2 documented genuine consumers (incl. metric-cell/stack + the re-instated `useBreakpoint`) OR is removed with zero residue (a hallucinated item or under-count from W0 is a close-blocker) AND `proof:no-god-module` green; `verify-export-types` shows the metric-cell/stack subpaths still published + `/dom` re-exporting `useBreakpoint`; bite: a retire against a W0 keep-verdicted candidate (e.g. a metric-cell/stack deletion) / a surviving residue → RED |
| **AW.W20** | **STYLING ASSAY — tokenization + Tabs pill-track + ToggleGroup re-roll.** The deeper styling assay AV.W16 left: the brittle calc/magic-number sites resolve through tokens; the Tabs/BouncyTabs/UnderlineTabs pill-track is token-driven (not a hand-computed pixel); the glass-panel/card demo raw-`<button>` tier-force controls re-roll onto `<ToggleGroup>` (the canonical single-select case); `useTokenColor` carries its public-vs-reference doc. The drawer-live-behind + native-top-layer dropped-audits are dispositioned (§0 of the wave file). See `waves/AW.W20-styling-assay.md`. Opens after W12 | IMPL | `proof:styling-hygiene` — no brittle magic-number survives where a token resolves (the named sites tokenized); the demo controls consume `<ToggleGroup>` (grep finds no raw-`<button>` tier-force re-roll — the ToggleGroup bite); `useTokenColor` documents its public-vs-reference status; bite: a surviving brittle literal / a re-rolled raw control → RED |
| **AW.W22** | **GLASS-MATERIAL UNIFY (band F, the spine).** Promote the moving-specular + the `--glass-edge-light` rim + the pointer interaction-light into ONE `.glass-material` mixin the five rungs compose, so every floating/overlay/dock/dialog/sheet/popover/card surface carries the same catch-light + rim grammar without per-component opt-in; retire the three per-component opt-ins. DRY consolidation, no new tech. See `waves/AW.W22-glass-material-unify.md`. Opens first in band F | IMPL | `proof:glass-material-unified` — every glass surface in the floating/overlay band + the card resolves the unified specular `::before` + rim (computed-style probe over a mounted matrix); the opt-in wiring is gone; `prefers-reduced-transparency` drops it; born-RED (specular opt-in on 3 components at HEAD); bite: a per-component hand-rolled highlight survives → RED |
| **AW.W23** | **GLASS-MATERIAL SOTA FOLDS (gated Baseline-2025).** Ship the four unused capabilities as out-of-box LIBRARY assets, each `@supports`-gated with a fallback: the `#glass-refract` convex-lens filter (squircle profile `y=⁴√(1−(1−x)⁴)`, Snell n=1.5, baked displacement + `feBlend screen`); `corner-shape:squircle` PE on `.glass-card`/`.glass-pill`/`.glass-dock`/`.btn-pill` (Chrome-139+, `border-radius` fallback); chromatic edge dispersion (warm/cool `oklab` fringe, reduced-transparency-off); the `--glass-tint-source` content-adaptive tint (`color-mix(in oklab,…)` ≤30%, default warm-white zero-delta). Blur stays substrate. See `waves/AW.W23-glass-material-sota.md`. Opens after W22 | IMPL | `proof:glass-material-sota` — the four capabilities ship as library assets, each behind its `@supports` gate with a documented fallback (an ungated Baseline capability → RED); base `border-radius` unchanged; bite: a refract/squircle decl outside `@supports` → RED |
| **AW.W24** | **GLASS-CARD PERFECTION (shadcn-2025 + hover + specular).** Adopt `--card-spacing` driving CardHeader/Content/Footer padding + gap from one knob (retire the three `p-6` + `gap-y-1.5`); `data-size="sm"` rung; a `CardAction` slot + `@container` header reflow; opt-in `<Card hover>` elevation reusing the cartoon longhand-translate mechanism (no fork); wire the dormant `--mouse-x/--mouse-y` specular seam behind the opt-in; the content-layer cream-read fix (opaque legible ring + under-shadow lift). Pure structure/CVA — the glass tier system is untouched. See `waves/AW.W24-glass-cards.md`. Opens after W22 (card edge-light) + W12 (backdrop staging) | IMPL | `proof:glass-card-tiers` — the five card tiers render perceptibly distinct staged over a busy backdrop (computed-style + sampled-pixel diff); a `--card-spacing` override re-resolves all three subcomponents; `<Card hover>` shows a hover `translate`/`box-shadow` delta while static `<Card>` is unchanged; bite: a hardcoded `p-6` / a flat-on-backdrop tier → RED |
| **AW.W25** | **PRIMITIVES PERFECTION (the cross-atom affordance/state/motion/a11y sweep).** One comprehensive KISS sweep routing every interactive atom onto the existing canon: the universal `.tap-squish` press-spring (swap the ad-hoc `active:scale`) + the four-state contract + `.focus-ring` (Accordion/Collapsible triggers) + `transition-control`; `--radius-field`/`--radius-control` geometry (Textarea + NumberFieldInput off the 9999px pill; Checkbox/Tabs off raw `rounded-sm`); Switch thumb glass-highlight + spring-on-travel; Checkbox glass-tint fill + the indeterminate `<Minus>` branch (the always-`<Check>` bug); Toast + Command onto `glass-floating`; `success/warning/info` tone parity on Alert + Toast; `TabsIndicator` into base `<Tabs>`; the W13 affordance floors (gold-audacious legibility, the 8%α border, the slider track-fill) re-asserted uniformly. See `waves/AW.W25-primitives-perfection.md`. Opens after W13/W18 | IMPL | `proof:primitive-affordance` — every named interactive atom carries the four-state contract (hover ∧ active-press ∧ focus-ring ∧ disabled) ∧ a semantic-radius token ∧ `transition-control`; no multi-line/stepper atom resolves `9999px`; the indeterminate checkbox renders the dash; every floating-band surface carries a `glass-*` tier; AA contrast floors hold; bite: a press-feedback-less atom / a 9999px Textarea / an always-`<Check>` indeterminate / a flat Toast → RED |
| **AW.W26** | **reka/shadcn/Tailwind-v4.3/mwg IDIOM + BINDING GUARD.** Refactor Toast to `useForwardPropsEmits` + a single `Toaster` provider/viewport hoist; `SelectContent` transform-origin; blanket `data-slot` on the family roots + `:data-variant`/`:data-size` on CVA roots; Button/Badge/Toggle CVA base modernization (icon-sizing, gap, `has-[>svg]` padding) verified against the `cn()` bucket table; `aria-invalid:` error-paint on the 5 `useUserInvalidAria`-wired form controls; the `--text-shadow-*` `@theme` token bridge; `text-wrap` balance/pretty/wrap-anywhere on type/label atoms; ONE Playwright binding-regression spec (the silently-no-op reka class: Toggle/Combobox/TagsInput/Switch/Checkbox rendered-effect); the MIGRATION.md Combobox-`searchTerm` note. Tailwind v4.3, NO v5. See `waves/AW.W26-reka-shadcn-tailwind-idiom.md`. Fully disjoint from W22-W25 | IMPL | `proof:reka-binding-idiom` — every `ui/` root carries a `data-slot`; the three modernized CVA bases resolve icon-sizing without a `cn()` false-merge; each named form atom paints on `aria-invalid`; `text-shadow-sm` resolves + no raw multi-stop literal survives; the binding spec asserts each model's rendered effect; Toast mounts N>1 under one provider; bite: a missing `data-slot` / a false-merged icon size → RED |
| **AW.W28** | **STORYBOOK COMPLETENESS + DOCK-BASED DEMO NAV (band G, demo-internal).** Audit the AV.W10 11-category demo IA for completeness (no shipped glass-ui component without a story) AND re-build the storybook navigation on the glass-ui dock — a SIDEBAR dock + a BOTTOM-bar dock for core page nav, both dock-driven, dogfooding the shipped `GlassDock`/`DockLayerGroup` + the glass atoms with iOS-26 idiom. DEMO-INTERNAL chrome over already-shipped primitives — no new library primitive, no fake 2nd consumer (the nav is demo-private). See `waves/AW.W28-storybook-dock-nav.md`. Opens after band F | IMPL | `proof:demo-dock-nav` — the demo nav mounts a sidebar dock AND a bottom-bar dock both composing the shipped `GlassDock` (a render probe finds both dock instances driving core-page nav, no raw-`<nav>` re-roll) + `proof:storybook-complete` — every shipped glass-ui component resolves a story in the 11-category IA (a coverage walk over the export barrel vs the story registry → zero uncovered); born RED on HEAD (the nav is not dock-driven; ≥1 component has no story); bite: a non-dock nav / a component with no story → RED |
| **AW.W29** | **AURORA CONFIGURATOR REDESIGN (band G, existing-surface restyle).** Re-design the aurora controls surface with iOS-26 + idiomatic glass atoms — it EXTENDS the already-shipped `Configurator`/`ConfiguratorLayer`/`ConfiguratorRow` (the aurora chrome + the demo are its existing consumers), routing the controls onto the glass-atoms material/press/radius spine the band-F waves landed. A restyle/dogfood of a shipped primitive, NOT a new control. See `waves/AW.W29-aurora-configurator.md`. Opens after band F + W8 (the interactive aurora surface it configures) | IMPL | `proof:configurator-glass-atoms` — the aurora configurator surface resolves the glass-atoms spine (the `.glass-material` rim/specular on its rows, the `.tap-squish` press on its controls, the semantic-radius rungs — a computed-style probe over the mounted configurator) AND composes the shipped `Configurator` family (grep finds no forked controls column); born RED on HEAD (the configurator predates the band-F spine); bite: a hand-rolled control off the atoms / a forked column → RED |
| **AW.W30** | **CAROUSEL REDESIGN (band G, existing-surface restyle).** Re-design the carousel with iOS-26 + idiomatic glass atoms — it restyles the already-shipped `GlassCarousel`/`carousel` family (its existing consumers), routing the carousel chrome (the dots/arrows/track) onto the glass-atoms material + press + radius spine. An existing-component refactor, NOT a speculative mint. See `waves/AW.W30-carousel-redesign.md`. Opens after band F | IMPL | `proof:carousel-glass-atoms` — the carousel controls resolve the glass-atoms spine (the arrows/dots carry the four-state contract + `.tap-squish` press + a `glass-*` tier + semantic-radius — a computed-style probe over the mounted carousel) AND composes the shipped `GlassCarousel`/`carousel` (no forked carousel primitive); born RED on HEAD (the carousel chrome predates the band-F spine); bite: a flat off-atoms arrow/dot / a forked carousel → RED |
| **AW.W31** | **ANIMATION-COHERENCE AUDIT + DESIGN.md CURRENCY + NAMING (band G, audit-and-reconcile).** The animation-language coherence audit across the dock/aurora/blob/primitives motion — ONE spring vocabulary, consistent timing/curves/PRM-discipline, no off-canon ad-hoc easing — reconciling any drift the band-A/B/C/F waves left; the DESIGN.md currency/completeness pass (DESIGN.md documents the warm-cream + iOS-26 + glass-atoms spine the tranche landed, with no stale claim); AND the naming-consistency doc-lint (wave-header style + charter↔file headline match + no phantom token-family citation). Audit-and-fix over the shipped motion + the standing doc — no new primitive. See `waves/AW.W31-animation-designmd.md`. Opens after band F (the motion is landed) | IMPL | `proof:animation-coherence` — every animated atom resolves a `--spring-*`/`--ease-*`/`--duration-*` token from the canon (a grep + computed-style sweep finds no off-canon ad-hoc easing literal on a shipped surface; every motion axis is PRM-reachable) + `proof:design-md-current` — DESIGN.md cites the landed spine (the warm-cream tokens, the iOS-26 material, the glass-atoms consolidation) and carries no stale/struck claim (a grep asserts the documented token names resolve at HEAD) + `proof:naming-consistency` — every `AW.W<N>` wave header matches `# AW.W<N> - <Title>`, the charter §2 headlines match their wave files, and no `src/`-or-other-wave-doc cites the phantom `--glass-edge-light-{wash..overlay}` family; born RED on HEAD (≥1 off-canon easing survives; DESIGN.md predates the band-F spine; the W4-W8 aurora headers are ALLCAPS-en-dash); bite: an ad-hoc easing literal / a stale DESIGN.md claim / an un-normalized wave header → RED |
| **AW.W32** | **LIGHTHOUSE AUDIT — glass-ui demo (band G, perf/a11y/best-practices/SEO).** The deep Lighthouse audit over every glass-ui demo page (perf, a11y, best-practices, SEO) — record the per-page scores, fix the regressions the audit surfaces (the a11y/perf floors), and gate the demo against a documented score floor. Audit-and-fix over the demo pages — it ships fixes, not a new surface. The slides Lighthouse arm is H-owned. See `waves/AW.W32-lighthouse.md`. Opens after W28 (the demo nav is the page shell it audits) | IMPL | `proof:lighthouse-demo` — every glass-ui demo page clears the documented Lighthouse floor (a11y ≥ the recorded threshold, perf/best-practices/SEO recorded + above floor) over the page set; the audit artefact records the per-page scores + the fixed regressions; born RED on HEAD (≥1 page below the a11y/perf floor before the fixes); bite: a page regressing below the floor → RED |
| **AW.W33** | **GATE-FLEET CLOSE + READMEs (LAST).** Register every AW gate W0-W32 in `gates.mjs` with its `{local,ci,release,sibling}` tag (NOT hand-listed in ci.yml) — the four arcs + convergence + gate-pattern + orphan-prune + styling-assay + the glass-atoms band (`proof:glass-material-unified`/`-sota`, `proof:glass-card-tiers`, `proof:primitive-affordance`, `proof:reka-binding-idiom`) + the NEW-SCOPE band G (`proof:demo-dock-nav`/`proof:storybook-complete`, `proof:configurator-glass-atoms`, `proof:carousel-glass-atoms`, `proof:animation-coherence`/`proof:design-md-current`, `proof:lighthouse-demo`); the four research-backed READMEs (dock, aurora, blob, constellation); the overfitting audit (PROPS, zero orphans); the π visual-runtime lane over the visual-change waves (W1-W3 dock, W4-W11 aurora/blob, W12-W13 component, W16-W17 convergence, W22-W26 glass-atoms, W28-W32 band G); `AW.FINAL` citing a green run id per wave. Opens AFTER all bands. The prior W18 close slot was content-swapped to the gate-pattern wave; this was first restored as W21, re-anchored to W27 when the glass-atoms band inserted ahead, then to W33 when band G inserted ahead (W21 retired in the renumber). See `waves/AW.W33-close.md` | IMPL (LAST) | `proof:aw-final` — full matrix green over a clean tree; `gates:verify-ci` green (no hand-listed gate); the four READMEs exist + cite their research digest; the π lane ran (≥3 viewports, ≥5 frames per state-toggle, AA contrast, per-story consumption sweep) OR recorded the build-verification floor with the re-probe obligation named; overfitting audit zero orphans; `FINAL.md` cites a green run id per wave |

---

## §3 — Critical files + ownership

| Surface | Files | Owning wave |
|---|---|---|
| Dock motion | `src/components/custom/dock/GlassDock.vue`, `dock/composables/useDockState.ts`, `useLayerTransition.ts`, `dockContext.ts`, `dockLayerContext.ts`, `src/styles/dock.css` | W1·W2·W3 |
| Aurora | `src/components/custom/aurora/`, `src/composables/glass/webgl/shaders/aurora.frag.ts` + the painterly GLSL chunks, `procedural-color.glsl.ts` (shared, read-not-rewrite) | W4-W8 |
| Blob | `src/components/custom/goo-blob/`, `metaball.frag.ts`, `procedural-color.glsl.ts` (shared) | W9-W11 |
| Components | `src/components/custom/glass-panel/GlassPanel.vue`, `ui/data-table/DataTable.vue`, `ui/button/index.ts`, `ui/input/`, `src/styles/utilities.css` | W12-W15 |
| Convergence | a `DeckProgress` package + `deckProgress` helper (new), `src/composables/glass/canvas2d/useCanvas2D.ts` (new), `src/components/custom/constellation/` (new), `src/utils/prng.ts` (read), the existing `<Progress>` fill (compose) | W16·W17 |
| Gate pattern | `src/styles/glass.css` (the `.input-pill` invalid-ring widen), a `GatePattern.story.vue` | W18 |
| Orphan-resolution / styling-assay | `src/components/custom/{metric-cell,metric-stack}/index.ts` (keep+document — ≥2 external speedtest consumers; the subpath mirrors + `api/index.ts` types + `package.json` exports STAY), `src/composables/dom/useBreakpoint.ts` (re-instate from `cbbaeb0`'s parent) + `src/composables/dom/index.ts` (re-export+document — ≥2 external value.js + speedtest consumers) (W19); `src/styles/{utilities.css,tokens.css}` (tokenize), the Tabs pill-track, the glass-panel/card demo controls (W20) | W19·W20 |
| Glass atoms (band F) | `src/styles/{glass.css,glass-specular-track.css,tokens.css,theme.css}` (material mixin, `#glass-refract`, squircle PE, `--card-spacing`/`--radius-field`/`--text-shadow-*`, W22·W23·W24·W26); `ui/card/`, `ui/{checkbox,switch,textarea,number-field}/`, `ui/{toast,command,alert}/`, the 36 family roots `data-slot` (W23·W24·W25·W26) | W22-W26 |
| New scope (band G) | `demo/` (the demo-private dock-nav shell + the storybook IA stories — W28); `src/components/custom/configurator/` + the aurora chrome (restyle — W29); `src/components/custom/{glass-carousel,carousel}/` + `carousel` family (restyle — W30); `DESIGN.md` + the shipped motion surfaces (audit-and-reconcile — W31); `demo/` pages + the a11y/perf fix sites (W32) — DEMO-INTERNAL chrome + existing-surface restyles, no new library primitive | W28-W32 |
| Gates + docs | `scripts/gates.mjs`, `scripts/proof-aw-final.mjs`, the four READMEs, `docs/tranches/AW/` | W33 |

**Disjointness:** Band A (dock), Band B (aurora), Band C (blob), Band D (components) write
disjoint surfaces and parallelize across worktrees. Within a band, the waves sequence per their
named dependencies (W2 after W1, W5 after W4, …) — no two parallel waves write the same path.
`procedural-color.glsl.ts` is READ by W4/W5/W9 and not rewritten (the AV.W2 shared chunk is the
single OETF/FBM/matrix source; AW splices, never diverges). The glass-atoms band (W22-W26)
sequences after W12/W13/W18 where it shares file bounds — W22 is the band-F spine (the material
unify), W23 extends the card edge from it, W24/W25 ride W13's affordance tokens (W24 touches only
the `.input-pill` radius declarations, W13 owns border-color/alpha), and W26 is fully disjoint and
parallel-schedulable. The new-scope band G (W28-W32) sequences AFTER band F (it routes the demo
nav, the Configurator restyle, and the carousel restyle onto the band-F glass-atoms spine, and the
animation-coherence audit reconciles the band-A/B/C/F motion): W28's nav shell + the storybook
stories live under `demo/` (disjoint from the `src/` band-F surfaces); W29 writes the
`configurator/` package + the aurora chrome; W30 the carousel family; W31 reconciles `DESIGN.md` +
the shipped motion surfaces; W32 the `demo/` pages — disjoint per-wave surfaces, parallel-schedulable
within band G except W32 opens after W28 (the demo nav is the page shell W32 audits).

---

## §4 — Cross-repo shape (the publish/consume edges)

**The ownership chain** `value.js ← keyframes.js ← glass-ui ← slides` holds (`AV.md §5`). AW is
glass-ui-internal; every cross-repo item is NAME-FORWARD (glass-ui writes only glass-ui).

**The publish hinge — E1: glass-ui 3.4.0 → npm (USER-DOMAIN).** AW lands the dock-collapse
regression fix + the convergence primitives, then cuts **3.4.0**. The publish fans out to slides
**H.W1** (the pin bump `^3.3.0 → ^3.4.0` + the `DeckProgress` consume) ∥ H.W4/W10 (the
Constellation consume). The publish leg stays confirm-first (the boundary is irreversibility);
agents never run an irreversible release step.

**The convergence primitives AW ships → H consumes:**

| AW ships (wave) | What it absorbs from slides | 2nd consumer | H consumes in |
|---|---|---|---|
| `DeckProgress` (W16) | The viewport-pinned `.deck-progress` fixed/full-width/safe-area/z-layer/leading-glow chrome over the generic percentage/state math. | glass-ui demo story + slides DeckView | H.W1 (de-dock + consume) |
| `Constellation` + `useCanvas2D` (W17) | The `constellation.ts` proximity-graph engine mechanism (dpr-resize, palette-read-on-dark-flip, RAF arm/disarm, draw passes). The branded NCSU-red anomaly + narrative STAY in the slides overlay. | glass-ui demo story + slides deck | H.W4 (visibility) + H.W10 (dedup) |

**The dock-collapse fix → H consumes (W1):** the H.W1 slides arm consumes 3.4.0 purely via the
pin bump — the dock simple-collapse now morphs, so the slides dock chrome animates. The
`DeckProgress` de-dock (H.W1) consumes the AW.W16 composition.

**STAYS slides-specific (never ports):** the NCSU-red anomaly node + the narrative framing, the
XRAY portal embed, the PPTX export pipeline, the `deck.css` brand register (NCSU-red,
cartoon-shadow vocabulary, Fraunces/Newsreader). Only the engine mechanism ports; the brand
content is H-owned (`avg-deep-audit-digest §3 "STAYS slides-specific"`).

---

## §5 — Design language (the cogency the perfection serves)

AW's visual work is bound to ONE coherent design language; every backdrop, panel, and dock
surface reads as the same object. The three axes:

- **Warm-cream glass.** The field is warm paper — `--neutral-0: hsl(48 12% 98%)`, the hue-48
  warm-paper L\* ladder, muted-black ink `--foreground: hsl(24 10% 10%)`, the 5-rung glass ladder,
  the cartoon offset-stamp shadow as the signature, `0.625rem` base radius
  (`frontend-convergence-digest §design-spine`). The affordance lifts (W13) push the too-timid
  8%-α edges UP so glass reads on cream WITHOUT going loud — affordance, not noise.

- **iOS-26 Liquid Glass.** The rim/specular material (the AV.W15 token edits): per-rung saturate,
  the `--glass-edge-light` full-perimeter rim, the content-aware under-shadow, the pointer-anchored
  moving specular. The dock (W3) gets the Liquid-Glass shell identity + the unified hover grammar
  its buttons already carry; the blob droplet (W9) is the glass read made literal — a wet,
  specular, Fresnel-rimmed surface. The iOS spring family (W3) unifies the motion to the same
  Liquid-Glass register.

- **NCSU-red accent.** The hero accent (`#cc0000` + `light-dark()` ink lift) is the consumer-layered
  single-focal-red — the constellation anomaly, the deck trip-line. It STAYS consumer-side; the
  library ships the warm-cream + iOS-26 spine and the consumer layers its red.

**The AI-Nutrition-Label idiom — scoped to SlideXray (the H arm, not AW).** The same-org XRAY app
(Friday Institute / NCSU TIL) speaks the FDA-nutrition-label broadsheet brutalism — heavy-grotesk
display, mono labels, the load-bearing `bar-thick` solid-ink rule, tabular numerics, the cold-blue
AI-lane counterpart. That idiom is XRAY's STRENGTH and survives; the H arm makes XRAY a glass-ui
consumer the way slides is (pulls the shared cream/red/Fraunces spine + the grade-semantic token
set) WITHOUT reskinning the label. AW ships NO nutrition-label component — the
`<NutritionLabel>`/FactsPanel is the one real ≥2-consumer headline candidate but it is below the
bar until both XRAY and the slide consume it; it stays KEEP-BOOK
(`frontend-convergence-digest §nutrition`). The slides `SlideNutrition.vue` already speaks the
idiom in the deck's dialect — H adds the missing heavy-bar signature, never a reskin.

---

## §6 — Precepts in force (HARD gates, not sentiments)

- **inv P1 — no legacy / no workaround.** Every clean break carries NO alias. The dock-collapse
  fix REPLACES the broken size authority (it does not add a `legacyCollapse` flag); the aurora
  OKLCh migration DELETES the linear-sRGB/YIQ interp (it does not keep both behind a switch); the
  orphan prune REMOVES the artefact (it does not deprecate-and-keep). A grep for any retired form
  outside its deletion commit = 0.
- **inv P2 — gestalt transposition over patch.** Each fix is a structural correction, not a
  band-aid: the dock-collapse regression is ONE size authority across both paths (the regression
  was the paths diverged), not a per-path special-case; the glass-panel fix makes the tier branch
  honor `variant` (it does not hardcode a second wash). Net-deletion-or-neutral, proved by LOC.
- **inv P3 — KISS.** The blob droplet reuses the SDF gradient already computed for the `fwidth` AA
  (one quantity unlocks normal/specular/rim/iridescence) — the simplest correct path, not a
  re-architecture. The DataTable split is colocation, not a new public surface.
- **inv P4 — DRY / consume-glass-ui-where-befitting.** No duplication: the aurora/blob shaders
  splice the shared `procedural-color.glsl.ts` (the single OETF/FBM/matrix source); the
  `DeckProgress` composes the existing `Progress` fill (NOT a fork); the Constellation consumes the
  shared `prng.ts` + `useRAFLoop` + `useIntersectionPause`; the demo controls consume
  `<ToggleGroup>` (not raw `<button>`). The GLASS-ATOMS band (W22-W26) is a DRY-CONSOLIDATION:
  it ROUTES every atom onto the existing spine (the unified `.glass-material` specular/rim, the
  canonical `.tap-squish` press-spring, the semantic-radius rungs, the shadcn `--card-spacing`
  idiom, blanket `data-slot`) — glass-ui already has deep material, so these are DRY folds + the
  unused Baseline-2025 capabilities, NOT from-scratch primitives. The card-hover reuses the
  `cartoon-surface` longhand-translate mechanism (no fork); the `--text-shadow-*` bridge DELETES
  the hand-rolled multi-stop literals (`proof:glass-material-unified`/`-sota`,
  `proof:glass-card-tiers`, `proof:primitive-affordance`, `proof:reka-binding-idiom`).
- **inv P5 — visual-load-bearing (≥2-consumer).** Every new public surface clears the
  ≥2-DISTINCT-consumer bar before it ships (J-inv-10). `Constellation`/`useCanvas2D`/`DeckProgress`
  each name the glass-ui demo story + the slides H consumer as the two; the blob mood engine ships
  ONLY if a demo exercises ≥2 moods, else it is excised. The glass-atoms `CardAction` slot names the
  demo + the speedtest metric cards as its two; new reka 2.9 `Color*`/`Autocomplete`/`MonthPicker`
  wraps are NOT minted speculatively (only Checkbox-indeterminate has concrete in-repo demand). The
  new-scope band G (W28-W32) mints NO new library primitive: the demo-dock nav is DEMO-INTERNAL
  chrome over the already-shipped `GlassDock`/`DockLayerGroup` (a demo-private helper, not a
  ≥2-consumer surface), the W29 Configurator restyle + the W30 carousel restyle are EXISTING-component
  refactors of already-shipped primitives (with their existing consumers — no fake 2nd consumer is
  invented), and W31/W32 are audit-and-fix passes over the shipped motion + the demo pages. The
  overfitting audit tallies PROPS; the W0 spot-verify gates every retire.
- **inv P6 — design-language cogency.** Every visual surface reads as warm-cream glass + iOS-26
  Liquid Glass; the NCSU-red stays consumer-layered; the AI-Nutrition-Label idiom is scoped to
  SlideXray (the H arm). No surface mints its own palette. The glass-atoms band serves the cogency:
  it routes every atom onto the ONE warm-cream + iOS-26 material spine (no atom keeps a hand-rolled
  highlight/shadow literal off the `--glass-*` rungs); the content-tint stays warm-cream-biased by
  default (NOT iOS-blue); the directional rim is dark-arm via the existing `--shadow-color` flip.
  The new-scope band G (W28-W32) serves the SAME cogency: the demo-dock nav, the Configurator
  restyle, and the carousel restyle route their chrome onto the band-F glass-atoms spine (the
  `.glass-material` rim/specular, the `.tap-squish` press, the semantic-radius rungs) with iOS-26
  idiom — no restyle mints its own palette or off-canon material; the W31 animation-coherence audit
  enforces ONE spring vocabulary across the whole tranche; W32's a11y fixes hold the AA floors.
- **inv P8 — gated Baseline / Tailwind-v4.3-not-v5.** The glass-atoms band targets Tailwind v4.3
  (NO v5) + idiomatic reka-ui ^2.9 (2.9.7 installed) + shadcn-vue (CVA ^0.7.1) — idiom-only, no
  stack upgrade. Every gated Baseline-2025 capability ships `@supports`-gated WITH a round /
  `border-radius` fallback: `corner-shape: squircle` (Chrome 139+ only), `backdrop-filter: url(#…)`
  refraction (Chromium-only). An ungated Baseline capability reddens `proof:glass-material-unified`.
- **inv P7 — the spot-verify gate is binding.** Before W19 retires any orphan, the W0
  spot-verify ledger records EXISTS + verbatim-rg-count + alias-resolved verdict for every
  candidate (`SPEC §"Audit-verdict spot-verification gate"`). A hallucinated item or an under-count
  is an integrity-sweep close-blocker.
- **inv-27 — green-means-green.** Every "done" cites AW's OWN green CI run id. Every born-RED
  gate reddens on a deliberate inject; `git status` clean after `proof:all`; `gates:verify-ci`
  fails closed on drift.
- **the π visual-runtime lane is binding** (AW ships visual changes). Coverage: ≥3 viewports
  (375×667, 1280×800, 1440×900), ≥5 animation frames per state-toggle (the dock collapse/switch,
  the aurora/blob transitions, the glass-atoms press-spring + card-hover + squircle PE, the band-G
  demo-dock nav + the restyled Configurator/carousel), WCAG-AA contrast-vs-background, per-story
  consumption sweep. The tooling-contingency clause applies if browser automation is unavailable
  (build-verification floor + the named re-probe obligation).

**USER-DOMAIN boundaries (inv-16):** the dirty `docs/precepts` submodule is NOT touched in-flight.
The 3.4.0 publish leg is confirm-first; agents NEVER run an irreversible release step. Agents are
read-only on git (the orchestrator owns the index).

---

**AW headline:** *Fix the dock simple-collapse regression that shipped with 3.3.0 [W1] under a
behavioral frame-timing gate that samples BOTH the collapse and the layer-switch paths, put the
dock motion on one iOS-spring timeline [W2-W3], perfect the two procedural backdrops the research
fans proved have headroom — the aurora engine (the OKLCh color core + derive-color front door [W5,
opens FIRST], the four-fold painterly arc — structure-tensor + impasto-relight + van-Gogh medium +
oil-pastel [W4], the additive `resolveAtoms` authoring door [W6], the gated WebGPU path [W7], the
interactive mode [W8]) and the blob lit droplet (the SDF-normal specular + Fresnel rim + OKLCh
iridescence, the wire-the-dead soft-body interaction + mood) [W9-W11]
— fix the component pass the live audit named (the glass-panel tier collapse, the cream-on-cream
affordances, the DataTable split, the colocation/naming hygiene) [W12-W15], ship the convergence
primitives the ≥2-consumer rule now clears — the `DeckProgress` composition over the existing
Progress fill [W16] and the Constellation on a `useCanvas2D` substrate [W17] — then the gate-pattern
access-modal idiom [W18], the orphan-resolution + metric-cell/stack prune [W19], the styling assay
[W20], and the GLASS-ATOMS band that routes every interactive atom onto glass-ui's already-SOTA
material spine + folds the four unused Baseline-2025 capabilities (glass-material unify+extend [W22],
glass-card shadcn-2025 perfection [W23], primitive geometry+material+bug [W24], cross-atom
motion+a11y+overlay-band+tone parity [W25], the reka/shadcn/Tailwind-v4.3/mwg idiom + binding guard
[W26]) — then the new-scope band G that dogfoods/restyles the already-shipped primitives onto that
spine (the storybook-completeness + dock-based demo nav — sidebar + bottom-bar, demo-internal [W28],
the aurora-Configurator restyle [W29], the carousel restyle [W30], the animation-coherence +
DESIGN.md currency audit [W31], the glass-ui-demo Lighthouse audit [W32]) — then the gate-fleet
close + the four research-backed READMEs [W33, LAST].* The engine
mechanisms port to glass-ui while the slides brand content (NCSU-red anomaly, narrative, PPTX) stays
H-owned; the design language is warm-cream glass + iOS-26 Liquid Glass with the NCSU-red
consumer-layered and the AI-Nutrition-Label idiom scoped to SlideXray.
