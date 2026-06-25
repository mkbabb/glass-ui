# BG convergence protocol — the 5-stage iterative loop (the operating cursor)

The user-specified orchestration. Tranche-DEV only (the prototypes in Stage 3 are VALIDATION
instruments — concrete or spec — that prove a spec and measure convergence; the production
implementation happens only after 100% convergence crystallizes the wave set, on greenlight).

## A PASS (sequential, per cluster; clusters batched of 3 / one workflow at a time / Opus fanout)

1. **Research** — up to 8 agents in parallel: the web (iOS-26/27 liquid-glass, SOTA references),
   the extant codebase (HEAD source, real file:line), the tranches hitherto (AT..BF + BD greenfield),
   the historical user requests. (Pass 1's research = the 27-agent forensic audit, already run — a
   superset. Pass 2+ research is TARGETED re-research of the un-converged clusters + the gaps the
   prior critique named + fresh web/SOTA.)
2. **Synthesize** — ONE agent: fold the research into a COGENT specification + plan for the cluster
   (the gestalt approach, the files, the mechanism, the acceptance bar). First-principles, idiomatic,
   KISS/DRY/no-legacy.
3. **Prototype** — a FLEET: greenfield brainstorm + TEST-IMPLEMENT the spec (each in an isolated git
   worktree when it touches src, so they never collide). "Sometimes concrete implementation,
   sometimes prototype-augmented specification." Each prototype returns: what it built, the live
   evidence it works (a real-paint capture / a behavior proof), and the deltas it discovered vs the
   spec. The prototype is the convergence INSTRUMENT — it proves the spec is buildable + correct.
4. **Critique** — a FLEET of adversarial critics: harden, challenge, refine each begotten item. Each
   returns a **convergence percentage** (the rubric below) + a critical analysis (what is missing /
   wrong / un-idiomatic / un-converged, concretely). Diverse lenses (correctness · architecture ·
   design-fidelity · cross-engine/a11y/perf · does-the-prototype-actually-validate).
5. **Agglomerate** — ONE synthesizing agent: aggregate Stages 3+4 into the pass report + the updated
   spec + the per-cluster convergence score + the next-pass research targets (the "newfound
   contextual information"). Then the loop begins again for any cluster < 100%.

**Stop condition: a cluster at 100% convergence is FROZEN** (its spec is final). When EVERY cluster
is 100%, STOP the loop and develop out the exact tranche plan / wave set(s) — the BG wave roster,
each wave ready to implement/refine/align.

## The convergence rubric (the critic's % — weighted, 0-100)

- **Correctness (30)** — does it actually fix the defect / achieve the goal? Live-paint / behavior
  evidence, not assertion. (A spec with no validating prototype caps here.)
- **Architecture (25)** — idiomatic, gestalt, first-principles, KISS, DRY, NO legacy, deft
  integration (a union not a bolt-on), proper encapsulation/colocation.
- **Design fidelity (25)** — warm/weighty/liquid identity, iOS-27 grade, the 12 laws of animation,
  aristotelian √φ proportion, cartoon-technicolor punch, AND the explicit asks below.
- **Robustness (20)** — Chrome AND Safari, a11y (PRM/focus/contrast/aria), performance (GL budget,
  CLS, offscreen-pause), dark+light parity, the headless-green gap closed (a real-paint gestalt
  gate that would CATCH a regression).

100% = a critic, given the spec+prototype, cannot name a single concrete improvement on any axis.

## The work-item CLUSTERS (the loop's units)

Foundational repair:
- **C1 Routing/transitions** — the linchpin; ONE coherent idiomatic route transition, the leave
  ALWAYS unmounts, the contrivance (bloom-find-child, no-op VT watchers, scroll-build collision)
  gone; iOS-27 liquid page-transition that WORKS.
- **C2 Field → aurora-per-page** — retire the metallic paper field; a calm warm aurora behind every
  route (the GL-budget + offscreen-pause + Safari reconcile); paper/grain optional only.
- **C3 Cast / clip / aliasing** — the red `.cartoon-cast` → a tasteful cartoon shadow; card-corner
  clipping; dock-corner aliasing.

The glass + dock convergence (the USER'S EXPLICIT ASKS — first-class):
- **C4 GLASS + BLUR STANDARDIZATION** — ONE coherent glass material across the whole library: the
  same blur/tint/specular register on dock·buttons·items·cards·overlays. **LESS blur overall** (the
  user: "less blurring"). The dock must read with the SAME blur as the buttons/cards (today the dock
  uses `--glass-blur-dock` 9px while cards use resting 10px / floating 13px — they diverge). A single
  calm blur scale, the dock a peer of the components, not a special heavier register. Audit the
  `--glass-*` axes (level/tint/accent/deep/capsule/key/cast) for sprawl and unify.
- **C5 Dock refinement** — **smoother, more liquid animations** (the user); the morph V↔H as a DOCK
  BUTTON in-place (not a modal, no VT-crossfade variant); the persistent ℱ section removed; dock
  scroll works; the dock KISS/DRY re-modularization (33 files → a coherent module).

The page + component surface:
- **C6 Scroll-shrink + hero/type + top-bar** — restore the scroll-shrink title choreography; bound
  the √φ display clamp (hero no longer blows out); kill the aberrant top bar.
- **C7 Previews + viz refinement + dock-scroll** — /substrates previews render; the procedural-viz
  refinement census (smoother, warmer, Chrome+Safari, the substrate KISS/DRY).
- **C8 Configurator + category live-previews + demo arch** — the configurator drawer works; the
  category/landing cards show LIVE real-component specimens (not icons); the demo modularization.
- **C9 Component encapsulation** — the >500-line splits, colocation, composable consistency,
  state/store coherence, the non-dock families.
- **C10 Motion consolidation** — the ONE morph engine + the spring family + the reveal/press/flex
  primitives unified; the 12-laws coverage; dead-primitive deletes.

New capabilities (the Siri triumvirate rides this loop):
- **C11 Siri warm waveform** — a glass-ui primitive, warm-identity, listening/responding states.
- **C12 Siri glass island + dock integration** — the descending liquid-glass island that deftly
  augments GlassDock.

Cross-cutting:
- **C13 Gate-system / headless-green close + a11y/perf/cross-engine** — real-paint gestalt gates that
  would have caught the 4.2.0 breakage; the quality fences every wave honors.
- **C14 Historical coverage + chronic/deferred fold + BD/BE/BF reconcile** — every past request
  addressed; every deferred/chronic item folded or retired-with-rationale; no silent drop.

## The design north-star (binding on every cluster's design-fidelity score)

- **Consistent glass** — one material, one blur scale, applied uniformly (C4). The dock is a peer.
- **Less blur** — calmer than today; structure reads through the plate.
- **Smoother, weighty, liquid motion** — every transition carries inertia/bounce; the dock morph +
  page transitions feel like iOS-27 liquid glass; the 12 laws applied.
- **Warm-cream identity** — no metallic, no gray, no red-bleed; the warm aurora field.
- **Aristotelian √φ proportion, cartoon-technicolor punch, audacious type — bounded** (no blow-out).

## Cadence

One workflow (pass) at a time; within a pass, agents batched ≤3 concurrent (the rate wall); Opus for
fanout; worktree isolation for concrete-impl prototypes. The orchestrator (core model) reads each
pass report and fires the next pass autonomously (no relinquish) until 100% across all clusters,
then crystallizes the wave roster into `docs/tranches/BG/PLAN.md §Roster` + per-wave specs.
