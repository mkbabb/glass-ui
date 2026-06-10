# AZ — the dock redesigned from first principles, the iOS-glassy register, the motion suite, and the cross-repo convergence

**Repo** glass-ui (+ the slides/keyframes cross-repo arm) · **Base** tranche/AY @ v3.10.1 (the AY close cut, published with provenance) · **Status** AUTHORED — awaiting user greenlight; NO implementation has begun.

AZ is grounded in the user's round-3 live audit (`audit/USER-AUDIT-2026-06-10-R3.md`, 15 binding items)
and the 32-lane deep audit (`audit/FLEET-DIGEST.md`, 374 findings: 56 open defects — 20 S1 — 39
chronic-defers, 36 gaps, 58 design findings, 5 refutations). Every wave below carries its grounding
finding ids; every defect is file:line- or capture-anchored — no wave is authored on prose alone.

## The shape of the problem

AY closed with clean source machinery and a green release battery, but the R3 live audit re-opened
four bands the close had marked live-verified — the AY status legend's own rule (a real-device
contradiction re-opens the wave) applied by the user in person. The deep audit's verdict: the
contradictions are real, and in every case the fleet found the EXACT mechanism the close missed:

- **The dock-layers rail** paints a `--surface-tint-8` PLATE fused to the pill (not a hairline), its
  travelling indicator paints `--glass-bg-quiet` near-white because the reka `TabsIndicator.vue`
  Tailwind utilities BEAT the `@layer components` rule, and the tab glyphs compute 4px wide
  (squished slivers). Three stacked root causes — none of them "icons don't render."
- **The morph flicker** is a 1–2-frame geometric scale pop: `.collapsed` flips synchronously while
  the box is still painted at expanded width, and the UNGUARDED `.glass-dock.collapsed:hover
  { scale: 1.1 }` multiplies the 535px box (±24–34px edge jump, frame-traced). Not a state thrash —
  a paint-order seam.
- **The dock-over-light illegibility** is a self-engage NO-OP: `.glass-dock` declares
  `--glass-backdrop: light` on ITSELF, but `@container style()` queries an ANCESTOR's computed
  style — the rule can never match. The W55 bucket works; the dock's wiring of it cannot.
- **The blob "pixelation"** is correctly RE-ATTRIBUTED: the GL bead is crisp (820×820 backing for a
  410px box, DPR 2.002); the offending "top blobs" are the watercolor-dot CSS swatches, and the
  absent satellites are a demo-config gap, not a renderer gap.

The register tension is named, not papered over: the warm-red selected register was a prior user
decision (the NCSU/Fourier-red identity); R3-6 now rejects red on hover/click "at the root." The
fleet found the red lives in the DEMO preset (`demo/layout/dock-nav.css`), not the library default —
but the user said ROOT, so the resolution is a root register redefinition + the demo override
retire, scoped by hinge H1 below.

## Invariants (inherited + new)

1. All AY/AX invariants hold (token-first, component-over-class, ≥2-consumer bar, no shadow
   execution, agents never git, the cardinal lesson: live-verified = captured own-surface DELTA + π
   readback).
2. **NO implementation before the user's greenlight** — this tranche document and its wave specs are
   the deliverable of the authoring phase.
3. **Re-opened ≠ rebuilt-blind.** Every re-opened wave starts from the fleet's mechanism finding
   (the §0 RE-GROUND cites it); a lane may not re-diagnose from scratch what the audit already
   root-caused, and may not "fix" a refuted reading (F2/C6 refutations are binding).
4. **The freshness model migrates off the treadmill** (W-GATES): capture-freshness binds to a
   content hash of the declared surface files, not git ancestry of a frozen SHA — so an unrelated
   commit touching a shared file stops re-staling every dock DELTA.
5. **NO legacy code, no aliases** — the dock taxonomy rename (W-DOCK-TAXONOMY) is a clean break;
   MIGRATION.md carries the rename table; consumers re-pin.
6. Model discipline: fable orchestrates/designs/synthesizes; opus/sonnet carry workflow fanout.
7. The slides repo `docs/tranches/M/` is foreign to this tranche (another session owns it).

## USER HINGES — decisions that gate batches (answer before or at the named batch)

| id | decision | options (recommendation first) | gates |
|---|---|---|---|
| **H1** | How far does the de-red go? (R3-6 vs the prior warm-red-selected decision) | (a) **Red retires from ALL STATE registers** (hover/active/selected become the iOS luminance-lift glass register); red survives ONLY as brand ink — the ℱ wordmark, data-viz strokes, the gold/red CTA family. (b) Red survives as the selected-GLYPH tint over a glass plate. (c) Full de-red everywhere. | Batch 1 (W-REGISTER-IOS) |
| **H2** | The dock taxonomy naming (R3-2) | (a) **ONE `GlassDock` with ONE `orientation` axis** — the redundant `variant=rail` expression collapses (rail-ness becomes orientation+density), the "rail" noun is freed for the new beyond-dock facility. (b) A named pair (`DockBar` horizontal / `DockRail` vertical) — two components, shared core. | Batch 2 (W-DOCK-TAXONOMY) |
| **H3** | The automatic luma observer default (R3-7) | (a) **Default-ON for the dock family** (a downsampled element-under sample, rAF-throttled ≤4Hz, writes `--glass-backdrop-luma`; the declarative bucket stays the floor + the override) — the "just works" iOS-27 behavior the user named. (b) Opt-in prop. | Batch 1 (W-ADAPTIVE-AUTO) |
| **H4** | The V↔H morph architecture (R3-13; topology change cannot continuously interpolate — AX.W42 fold 7) | (a) **The metaball-bridge**: the dock collapses to the circle, an SVG-goo/metaball teardrop carries the travel + the amorphous squish, the target dock expands from the circle — deterministic, keyframes-driven, bidirectional, GPU-cheap. (b) The full-time SVG-goo overlay on the live dock (riskier perf). (c) View-Transitions crossfade (cheapest, least liquid). | Batch 4 (W-MORPH-SHOWCASE) |
| **H5** | W-DEPLOY needs `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` in the environment at execution | provide at the deploy hinge | Batch 6 |

## The wave roster (24 waves, 8 bands)

Specs live at `waves/AZ.W-*.md`; each carries §0 RE-GROUND (the fleet finding ids + re-grep
mandate), the file:line defect table, goal/completion criteria, the born-RED gate SPEC, a scope
fence, and a named successor for anything deferred.

### Band D — the dock (6)

| wave | grounding | one line |
|---|---|---|
| W-DOCK-RAIL | R3-1; C1, F2-R3-1, D6-1, A1-1 | The in-dock switcher rail rebuilt to the hairline register: the plate retires, the TabsIndicator utility-bake loses to the token rule (fix at the wrapper seam), the 4px-squish root-caused + fixed, tabs sized/contrasted to the nav-glyph canon. |
| W-DOCK-TAXONOMY | R3-2; C1, E2-2, E3G-1 | The first-principles disambiguation per H2: one orientation axis, the `variant`×`orientation` redundancy collapsed, the "rail" noun de-overloaded (4 constructs → named registers), the layering system first-class on BOTH orientations. Clean break + MIGRATION table. |
| W-RAIL-EXTEND | R3-2; E3G-1 | NET-NEW: the hairline-rail facility — an extended dividing line running BEYOND the dock with a leading/trailing icon that controls the dock's layer context. ≥2 demo consumers at birth (the shell + a story). |
| W-DOCK-FLICKER | R3-3; C2 (mechanism), D5-7, F2-R3-3 (instrument note) | The collapse-onset scale pop killed at the seam: the `.collapsed:hover` scale gates on morph settle (`--dock-morph-t` ≥ threshold or a `data-morphing` guard), hover gains geometric hysteresis (re-check containment post-morph). The F2 width-instrument reading is recorded as the wrong observable, not a refutation of the user. |
| W-DOCK-CONTEXT | R3-14; E3 | Page-driven contextual layers: a route/context seam (provide/inject from the shell) that selects which DockLayer set a dock shows per page; the demo shell becomes the reference consumer. |
| W-DOCK-NORMALIZE | R3-5; C3 | ALL docks carry the persistent nav/home control pattern — the census matrix from C3 executed; zero hand-rolled home chrome; `proof:dock-unify` extended to bind it. |

### Band R — the register (2)

| wave | grounding | one line |
|---|---|---|
| W-REGISTER-IOS | R3-6; C4, D6-2 | Per H1: the ROOT selected/hover/active register redefined to the iOS luminance-lift glass model (translucent material lift + glyph ink stays semantic, never brand-red); the demo `--demo-nav-accent→--viz-fourier` glyph/edge-bar overrides retire; the library default `--primary` selected tint re-pointed to the glass register. |
| W-ADAPTIVE-AUTO | R3-7; C5-2/3, F2-R3-7, B3-1, E3G-4 | The self-engage no-op fixed at the mechanism (the bucket moves to the dock's PARENT seam or an unconditional dock-self rule joins the overlay-band precedent) + per H3 the sampled-luminance observer ships writing `--glass-backdrop-luma` (the declarative bucket stays the floor) + the all-glass-views readability sweep with π contrast readbacks as the binding gate. |

### Band B — the blob (2)

| wave | grounding | one line |
|---|---|---|
| W-BLOB-PAGE | R3-9; C6-1 (re-attribution binding), F2-R3-9 | The TRUE defect surface: the watercolor-dot swatch fidelity (the feTurbulence low-res read) + satellites enabled/morphing on the demo mount + the page staging so the GL bead leads. The GL renderer is NOT re-opened (refuted-crisp). |
| W-BLOB-STUDIO | R3-10; C6, B1-W-BLOB-GLASS | The studio refinement: interaction feel, metaball merge quality, satellite options surfaced in the configurator, shadow tuning; configurator design hierarchy (with W-HIERARCHY's vocabulary); the booked W-BLOB-GLASS uBackdrop refraction folds in under its original G-PERF + G-BROWSER binding gates. |

### Band M — motion (2)

| wave | grounding | one line |
|---|---|---|
| W-MOTION-SUITE | R3-11; C7, E3, F3-M1 | The robust motion demo: the curve canon expands to ALL curves (the value.js ~18 named easings + the keyframes timing curves + steps + editable bezier), the springs.vue LOCAL SPRING FORK is killed onto SPRING_PRESETS (the drift the single-source was built to prevent), a live spring playground (response/ζ), the scroll facilities demoed (scroll-driven.css + useViewTransition + supportsCssTimeline), foundations/motion.vue de-duplicated onto the gallery, ppmycota purple as the DEMO-LOCAL accent (presets-in-consumers — E1-7 binding: it does NOT enter library tokens). The keyframes demo UI port (configurator/playground chassis) transposes per the tailwind-first rule. |
| W-MORPH-SHOWCASE | R3-13; C8 (3 architectures), B1-W-LIQUID | Per H4: the vertical↔horizontal liquid morph showcase — deterministic, keyframes-driven, bidirectional; W-LIQUID (the Siri amorphous-blob facility) folds in as the substrate wave; the topology-interpolation impossibility (AX.W42 fold 7) is the design constraint, not a surprise. |

### Band S — the shell (2)

| wave | grounding | one line |
|---|---|---|
| W-SHELL-CONFIG | R3-4; C3, E3 | The gear opens the glass-ui demo CONFIGURATOR (density · ui-scale · glass-level · theme · motion/PRM); the composables view and the floating PresetEditor FAB are REMOVED (the R3-4 deletions); the dark-mode toggle folds INTO the configurator view. |
| W-SHELL-IDENTITY | R3-12, R3-15; C8 (measured) | ℱ becomes the Foundations entry (the Compass dup drops), demarcated by a DockSeparator, slightly larger; the glyph's optical centering corrected by the measured dx=+2.38/dy=+3.25 ink-mass offset (a transform nudge, not flex churn); the hover pill gains its proper glass register. |

### Band G — design (3)

| wave | grounding | one line |
|---|---|---|
| W-HIERARCHY | R3-8; D1 (7 findings), D6-3 | Design-hierarchy structuring: the D1 incongruence set fixed; the Configurator controls column gains hierarchy/proportion (section weight, label registers, control rhythm) — the vocabulary the blob/aurora studios then inherit. |
| W-SUFFUSE | D2, D3, D4 | The suffusion pass: the audacious-type uplift list (D2), the color-pop map under the one-color-event rule (D3 — including the motion band's purple event), the glass/grid/math thin-spots (D4) — each surface gets its ONE deliberate event; restraint counters recorded. |
| W-METRIC-UNIFY | E2-1, E2-3 | The Metric* family (Badge/Pill/Cell/Row) converges on ONE value-display core (killing the latent `amount \|\| placeholder` zero-value bug); ConfiguratorRow vs LabeledField get a shared chassis or a documented divergence note. |

### Band X — cross-repo (3)

| wave | grounding | one line |
|---|---|---|
| W-ADOPT | A4L-11/13 (the exact enumeration) | Slides: exact-pin `3.10.1`, the 547-line bespoke `constellation.ts` deleted onto `@mkbabb/glass-ui/constellation` (three declarative mounts + `drawOverlay` skins + the `?freeze` seam), `proof:no-bespoke-constellation` homed, frame-budget + perceptual-diff DELTAs. Publish-gated on the AZ cut only if AZ touches the constellation surface; otherwise runs against 3.10.1 immediately on greenlight. |
| W-DEPLOY | the standing requirement; H5 | slides.friday.institute via `deploy.sh` (wrangler → CF Pages), live HTTP 200 + captured DELTA. |
| W-KF-CONSUMER | B4-5 (S1) | keyframes.js: the phantom-subpath imports (`/header-ribbon`, `/glass-panel` — retired at 3.10.x) re-pointed to the surviving primitives + the glass-ui re-pin; fourier-analysis applies its pending phantom-classes patch; bbnf-lang's hard dist alias removed (closes the two documented-expected local CI reds). |

### Band Z — hygiene + close (4)

| wave | grounding | one line |
|---|---|---|
| W-GATES | B5 (headline: the MALFORMED row gates.mjs:689-691 crashes `proof:all`), F3-4 | The gate-manifest repair: the malformed row fixed + both parity meta-gates gain the cmd-less-row blind-spot assert; the 7 `:5173` script defaults → `:5199`; the dead `/navigation/dock-layers` route re-pointed; the shader-split gate re-points (blob-tempo-suppression / blob-interaction-prm); the content-hash freshness model replaces git-ancestry (kills the treadmill — the 3 graced NOTEs close); the R6 dock-animation-live PASS re-persisted on a quiet server; the W-DELTA0 own-wave-id re-captures paid. |
| W-CARVE | the chronic central-CSS rows | dock-controls.css (636) + theme.css (530) carve to @import-root partials < 500; the dock-controls-reading gates re-point composed; the two ratchet rows DRAIN (the monotonic close). |
| W-PRUNE2 | E4 (4 candidates), B1 books | The round-2 prune verdicts executed; the carried books (W-AUR-T5 Kuwahara, W-LIGHTHOUSE) re-dispositioned with explicit triggers or executed; every BOOK marker re-audited. |
| W-CLOSE | the AY close pattern | The terminal close: overfitting audit, FINAL.md, `proof:az-final` (born-RED, the staged-or-cut machine inherited), budget rebaseline, the full release battery, the 3.11.0 cut [USER-DOMAIN]. |

## EXECUTION DAG (post-greenlight)

```
Batch 0  W-GATES                                    (infra first — proof:all is crashable today)
Batch 1  W-DOCK-RAIL ‖ W-DOCK-FLICKER ‖ W-ADAPTIVE-AUTO [H3] ‖ W-REGISTER-IOS [H1]   (the S1 quartet)
Batch 2  W-DOCK-TAXONOMY [H2] → W-RAIL-EXTEND ‖ W-DOCK-NORMALIZE ‖ W-DOCK-CONTEXT   (taxonomy renames first)
Batch 3  W-BLOB-PAGE ‖ W-BLOB-STUDIO ‖ W-MOTION-SUITE ‖ W-SHELL-CONFIG ‖ W-SHELL-IDENTITY
Batch 4  W-MORPH-SHOWCASE [H4] ‖ W-HIERARCHY ‖ W-SUFFUSE ‖ W-METRIC-UNIFY
Batch 5  W-CARVE ‖ W-PRUNE2 ‖ W-KF-CONSUMER
Batch 6  W-CLOSE → 3.11.0 cut [USER] → W-ADOPT → W-DEPLOY [H5]
         (W-ADOPT may instead run at Batch 0 against the published 3.10.1 — it has no AZ dependency;
          it waits only if the user prefers one slides re-pin instead of two.)
```

## Scope fences

- NO slides `docs/tranches/M/` edits (foreign session).
- The GL blob renderer and the aurora painterly pipeline are NOT re-opened (refuted/closed) — only
  the named surfaces (watercolor swatches, satellites-config, studio chrome) are in scope.
- The `in srgb` surface-tint family, the cn() deduplicator, and the .focus-ring divergences remain
  deliberate keeps (AW.W26) — no "fixes."
- ppmycota purple never enters library tokens (E1-7).
- `:5173` is never a default anywhere after W-GATES.
