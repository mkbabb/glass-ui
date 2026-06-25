# BG tranche — the post-ship convergence (PLAN + durable cursor)

**Status: TRANCHE DEVELOPMENT (audit + spec only — NO implementation).** Branch: a fresh BG branch
off `master` (the 4.2.0 ship). The cardinal laws (binding): NO quick solutions / NO workarounds,
idiomatic gestalt first-principles, NO legacy code, KISS + DRY + DEFT integration, presets-in-
consumers, warm/weighty/liquid iOS-27 identity, Chrome AND Safari, foreign-tree fence absolute.

## Why BG exists

glass-ui **4.2.0 shipped to npm** (the BD greenfield redesign), but LIVE validation reveals **most
pages + most core functionality are broken** — the recurring *headless-green / visually-broken* gap
(356 gates green, the UX broken). BG is the first-principles convergence: audit every BD change +
the original plan/waves, recap ALL historical requests, KISS/DRY/encapsulate the whole surface,
fold in every chronic/deferred item, and add the two new Siri capabilities — then ship a system that
actually works AND is beautiful.

## The CONFIRMED live defect ledger (orchestrator-verified 2026-06-25)

| # | Defect | Root cause (confirmed) | Owning audit |
|---|--------|------------------------|--------------|
| D1 | **Routing freeze** — nav changes URL but not the page; reload required | `.scroll-build` mount `animation` on the page root collides with `<Transition name="fade-slide">` in AppShell.vue → Vue mis-detects transition type → leave hook never resolves → old+new coexist (childCount 2→3, stale heading). Compounded by the bloom-find-child hack + 2 no-op `startViewTransition` watchers. | D-routing |
| D2 | **Metallic background everywhere** → wants AURORA per page | `paper.css .paper-field` conic-gradient cel-sheen + 4 high-chroma radials + `--paper-grain-tooth` feTurbulence speckle @0.22 | D-field-aurora |
| D3 | **Red/maroon shadow-cast halo** around docks; **card corners don't clip**; **dock bottom-left aliasing** | `.cartoon-cast` child reads `--shadow-cartoon-*`/`--cartoon-ink` mis-tuned warm→red; glass-surface radius vs overflow/backdrop-filter clip | D-aliasing-clip |
| D4 | **Titles no longer scroll-and-shrink** (ScrollCard register dead) | scroll timeline source / @supports / regressed selector | D-scroll-topbar |
| D5 | **A preposterous full-width horizontal line on every page** (user screenshot 2026-06-25) | the `.demo-scroll-progress` reading rail: `.scroll-progress` references its named scroll-timeline via `scroll(--demo-main-progress block)`, but `scroll()` takes only root/nearest/self → invalid → `animation-timeline: auto` → the `scaleX(0→1)` fills instantly → stuck full-width. Fix: `animation-timeline: var(--scroll-progress-scroller, scroll(root block))` + scaleX(0) base | D5-scroll-progress-bar-confirmed → WS1 BG.W-SCROLL-PROGRESS-RAIL |
| D6 | **/substrates previews broken** | viz canvas sizing / substrate arm / offscreen-pause / field occlusion | D-previews-dockscroll |
| D7 | **Configurator drawer broken** | gear trigger / event wiring / Sheet / the dock-rework collateral | D-configurator |
| D8 | **Persistent ℱ brand section** atop V+H dock useless → REMOVE | shell dock #persistent slot | D-dock-morph |
| D9 | **Page transitions broken** (= D1) | (see D1) | D-routing |
| D10 | **/compositions/hero broken, headers WAY too large** | the √φ display clamp over-scales (peaks 177-352px) | D-hero-type |
| D11 | **Category cards waste space** → wants LIVE real-component previews not icons | SectionLanding bento = icon + empty thumbnail | D-category-previews |
| D12 | **Dock scrolling broken** | dock overflow port / scroll gates | D-previews-dockscroll |
| D13 | **V↔H morph is a modal, esc broken; only liquid-teardrop works** → wants a DOCK BUTTON that morphs V↔H in place; remove the VT-crossfade variant | AppShell morphStage modal + dual VT/liquid variants | D-dock-morph |
| D14 | **`/foundations/colors` palette scroll animation gone** (cute on-scroll cascade dead) | `.scroll-cascade--columns` `animation-range: calc(45% + 60ms*0)` mixes `%`+`<time>` → invalid calc → computes `normal` → entrance stretched across the whole viewport passage → imperceptible (runtime-confirmed) | D-scroll-cascade-columns (→ WS4 BG.W-SCROLL-SHRINK-UNIFY + WS7 cascade-animates gate) |

## The Siri new-capability references (the triumvirate, separate workflow)

Two iOS recordings (frames at `scratchpad/evidence/frames-2144|2207/`): the **Siri glass island** (a
liquid-glass pill that descends/morphs over content + answers, "2 plus 2 is 4." with a warm under-
glow; the home "Search or Ask" pill; the Dynamic-Island relationship) and the **Siri waveform** (a
warm luminous amber/orange/pink waveform pulsing under the island). iOS-26 "Liquid Glass" vocabulary:
edge-to-edge glow, real-time lensing/light-bending, specular highlights, adaptive shadow. BG must
recreate BOTH and **deftly integrate them with the GlassDock system** (a Siri-island that augments
the dock; the waveform as a glass-ui primitive in the warm identity).

## The method — the user's 5-step convergence loop (binding)

Each workstream is developed by an ITERATIVE convergence loop (`docs/tranches/BG/converge/bg-converge.wf.js`,
invoked per workstream), one PASS = sequential:
1. **Research** — up to 8 agents in parallel (batches of 3): web SOTA/iOS-27 · codebase deep-read ·
   tranche history · seed-audit synthesis · reference/competitor · constraints (a11y/perf/Safari/GL) ·
   KISS/DRY/no-legacy · risk/feasibility.
2. **Synthesize** — ONE agent → a cogent spec + plan + the riskiest prototype items.
3. **Prototype** — a fleet (batches of 3): greenfield brainstorm + **worktree test-implement** (build/
   typecheck-proven, throwaway) OR concrete code-sketch proof. Survival of the fittest.
4. **Critique** — a fleet (batches of 3): adversarial harden/challenge/refine → each returns a
   **convergence %** + critical analysis (the headless-green/visually-broken trap is the bar).
5. **Re-synthesize** — ONE agent agglomerates → the converged spec + OVERALL convergence % + the
   unconverged-frontier context, which seeds the NEXT pass.

The loop repeats with newfound context until **100% convergence** (or MAX_PASSES=4), then the
workstream's exact wave set is locked. Batches of 3 throughout (rate-wall). Opus fanout. Prototypes
prove buildability in discarded worktrees — **nothing lands to master**; the deliverable is the
converged spec. Actual src landing waits for the user's greenlight on the locked tranche.

**Movement A** (workflow `bg-research-tail-synth`): completes the 6 dead audit agents + ONE global
synthesis that partitions the 27 findings + the new dock-refinement & glass-standardization directives
into the convergence workstreams (with seed specs + convergence criteria).

**Movement A2 — directive archaeology (binding anti-amnesia pass)** (workflow `bg-archaeology`): the
recent audit is NOT the only source of directives. ALL 13 session transcripts (403MB) were mechanically
mined → a clean **1517-distinct-directive** corpus (`scratchpad/archaeology/`), chunked into 9 slices.
A 9-agent archaeology fleet (batches of 3) excavates every substantive historical directive (design /
architecture / behavior / material / motion / type / color / process — including the terse load-bearing
ones), then a synthesis agent dedupes + categorizes + maps each to a workstream + status → the master
**`docs/tranches/BG/DIRECTIVE-LEDGER.md`**. EVERY distinct directive maps to exactly one workstream or
an explicit retire-with-rationale — no silent drop. The chronic-unaddressed cluster (repeated across
many tranches, still unaddressed/regressed) is the highest-priority BG carries. This ledger is a
**binding input to every workstream's convergence brief** — each Movement-B pass must honor its
directive-ledger slice. After A + A2 land, the orchestrator RECONCILES the ledger against the
workstream partition (fold unaddressed, add workstreams if a cluster fits none), then runs Movement B.

**Movement B**: the convergence loop per workstream, sequential (one workflow at a time).

## New user directives folded (2026-06-25, second brief)

- **Dock refinement** — LESS blurring, better + smoother animations; + the 33-file KISS/DRY
  re-modularization (A-dock-arch). → workstream *Dock*.
- **Glass standardization** — consistent glass effects/blur across components; **the dock must have
  the SAME blur as buttons / items / cards** — ONE coherent glass register, not per-surface dialects.
  → workstream *Glass-standardization*.
- The convergence-loop protocol itself (above) is now the binding method.

## The BG phases

1. **Forensic audit** (IN PROGRESS — workflow `bg-forensic-audit`, 27 Opus agents, batches of 3).
   Findings land in `docs/tranches/BG/audit/*.md`. Covers: the 13 defects (root-cause + gestalt
   fix spec) · dock/component/motion/glass/demo/viz KISS-DRY + encapsulation + >500-line splits ·
   historical-request coverage matrix · BD-execution coverage (the 39 greenfield items) · chronic +
   deferred fold · BE/BF wave fold · design-adherence · first-principles gaps · the gate-system
   headless-green gap · a11y/perf/cross-engine · the Siri frame-by-frame.
2. **Synthesis + wave roster** (orchestrator). Merge the audit findings into the BG wave roster +
   the defect→wave map + the deferred-fold ledger + the historical-coverage matrix.
3. **Siri triumvirate** (workflow — research → 3 proposals → adversarial challenge → golden →
   prototype spec, for the waveform AND the island, integrated with the dock).
4. **The BG wave specs + ledger** (orchestrator + workflow fanout for the spec write-ups). Each wave:
   id, intent, gestalt approach, files, acceptance/π bar, folded chronic/deferred items.

The audit is the breadth; the orchestrator (core model) owns synthesis/design. NO implementation
until the user greenlights (this is a development product; the spec must be right first).

## Bands (provisional — finalized after synthesis)

- **Band F (Foundational repair)** — the linchpin functional defects: routing/transitions, the
  field→aurora, the cast/clip/aliasing, scroll-shrink/topbar, previews, configurator, dock-scroll.
- **Band D (Dock convergence)** — the dock KISS/DRY re-modularization + persistent-removal +
  morph-as-dock-button + the Siri-island integration.
- **Band C (Component encapsulation)** — the >500-line splits, colocation, composable consistency,
  the non-dock families, demo modularization.
- **Band M (Motion + material)** — the motion-primitive consolidation, the glass/token coherence,
  the cartoon-cast register, the 12-laws coverage.
- **Band V (Viz refinement)** — the procedural-viz census refinements + substrate KISS/DRY.
- **Band S (Siri capabilities)** — the waveform + the glass island.
- **Band Q (Quality + close)** — the real-paint gestalt gates (close the headless-green gap),
  a11y/perf/cross-engine, the design-adherence conformance, the historical-coverage close.

## §Roster — the 7 convergence workstreams (LOCKED by Movement A; full detail in SYNTHESIS-PASS-1.md)

~87 candidate waves · 66 deferred items folded · all D1–D13 mapped. Each runs the 5-step convergence
loop to 100% (Movement B), seeded by its audit files + its directive-ledger slice.

| WS | Title | Waves | Defects | Gestalt goal |
|----|-------|------:|---------|--------------|
| **WS1** | Shell · Routing · Field | 7 | D1·D2·D5·D9·D10 | ONE idiomatic route transition (leaving page ALWAYS unmounts); metallic field → ONE shared offscreen-paused `<Aurora>` per route; top-bar + hero-fit fixed at source |
| **WS2** | Dock convergence | 12 | D8·D12·D13 | LESS blur, smoother/weightier anim; 33→~24 files (5 springs→1, 2 morph engines→1, ~1500 LOC cut); morph = in-dock button flipping the real dock V↔H in place (no modal); persistent ℱ cut; cap-axis-scrolls |
| **WS3** | Glass standardization | 10 | D3 | ONE coherent glass/blur/tint register — dock blur == card/button blur, calmer; 5 tint axes→1; maroon cast → in-gamut warm brown; ONE paint-box clip discipline |
| **WS4** | Components · Demo · Encapsulation | 26 | D4·D6·D7·D11 | scroll-shrink titles restored; configurator drawer works; live REAL category previews; colocation-gate structural; >500 splits; motion-primitive dedup (~4000 LOC); demo chassis consolidate |
| **WS5** | Viz refinement | 9 | D6 | 11 DISTINCT live previews (not 11 frozen aurora stills); intrinsic-size collapse fixed; sizer adopted; reveal-bloom shipped; fourier+constellation DE-migrate off WebGPU (their own DO-NOT verdict) |
| **WS6** | Siri capabilities | 4 | — | the glass ISLAND (4 forms on ONE radius+size scalar, dock-anchored) + the warm prismatic WAVEFORM (lens-flare, amplitude-reactive) — a COMPOSITION of shipped substrates, dock-search wired |
| **WS7** | Quality · Coverage · Close | 19 | — | the no-silent-drop machine FIRST; `proof:ba-gestalt` born-RED on 4.2.0 (real-paint: hue/clip/routing/top-bar predicates); live-π a TAG precondition; BE/BF + AX + deferred fold-ledger DECIDED; Safari-parity gate; honest re-cut |

**Convergence order (Movement B, sequential — one workflow at a time):** WS1 (routing is the
precondition for ALL downstream paint-verification) → WS3 (owns the unified blur register) → WS2
(consumes WS3's blur; the dock) → WS5 (viz) → WS6 (siri) → WS4 (components/demo) → WS7 (the close).
Reconcile the directive ledger (Movement A2) into every workstream brief before its loop runs.

**The 7 standing risks (Movement A):** (1) the headless-green trap recurs unless WS7's paint-gate is
built FIRST + blocks the tag (shipped broken 3×); (2) WS1-routing gates all SPA-nav paint-verify —
no workstream marks 100% on a hard-load-only π; (3) WS2/WS3 coupled at the blur seam (WS3 owns it,
dock is a peer); (4) over-correction without a gestalt loop (gray→metallic) — every criterion is the
GESTALT on a fresh capture; (5) the dead-engine cut must not delete a LANDED-but-unwired engine
WS2/WS6 needs (fission/bloom/goo) — DECIDE wires-or-retires, never blind-delete; (6) Safari parity is
a standing per-surface risk (Siri/glass/chart highest); (7) the deferred-fold compounds a 4th time
unless `W-DEFERRED-LEDGER` is Band-0 wave-1.
