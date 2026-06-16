# BB — EXECUTION DAG

The dependency spine + the parallelism plan for the FULL post-amendment 64-wave tranche. Batches gate left-to-right; waves within a batch run in parallel (the registry single-owner rule: ONE wave per parallel group owns `package.json` + `scripts/gates.mjs`; the others emit rows). Opus fanout, batches of ≤3 concurrent to dodge the rate wall.

This DAG graphs ALL 64 waves across SIX bands: the original 8-batch INTEGRITY spine (Batches 0–7), the cross-repo PRIMITIVES band (Batch P), the LIQUID-GLASS band (Batch L, incl. the deep-SOTA addendum), the doc-coherence node (W-DAG-RECONCILE), and the substrates / procedural-viz band (Batch V). The §-fences are carried + extended at the bottom.

## §1 — The spine (the integrity floor → the close)

```
Batch 0  INTEGRITY FLOOR ─────────────────────────────────────────────► (unblocks all)
  W-CI-GREEN ──┐  (the master-CI-red set, siblings-absent)
  W-CLOSE-BATTERY ─┤  (the full-set close rule + gate: local∪ci∪release)
  W-LEDGER-REPAIR ─┤  (the silent cardinal-ledger gate)
  W-DISPOSITION-RESTAMP ─┘  (the ~28 books + the HELD-prose reconcile)
        │
        │   ◄── W-DAG-RECONCILE lands HERE (Batch-0-adjacent doc-coherence; this very file —
        │        makes the 64-wave story navigable BEFORE execution; no gate, no code)
        ▼
Batch 1  GESTALT-BAR HARDENING ──────────────────────────────────────► (the close oracle, made real)
  W-GESTALT-GATE2   (mobile + content + dimension + freshness; today desktop-PNG-existence only)
  W-VISUAL-RUNNER   (execute the ~93 tests-visual π specs in CI/close)
  W-CHIP-GRAZE      (the SWEPT /forms/inputs form-field collision — the open gestalt FAIL)
        │
        │  every later band's gestalt verdict rides the HARDENED proof:ba-gestalt
        ▼
┌──────────────────────────── parallel after Batch 1 ────────────────────────────┐
│                                                                                  │
Batch 2  FINISH BA + RETIRE DEAD     Batch 3  PERFORMANCE        Batch 4  ARCHITECTURE TRANSPOSITIONS
  W-SCROLL-FADE-RETIRE                 W-LIGHTHOUSE (gate)          W-CARVE3
  W-SURFACE-AXIS-COMPLETE              W-CSS-CRITICAL               W-CANVAS-UNIFY
  W-DEAD-SWEEP                         W-CARD-COMPOSITE ◄┐          W-DARK-INK-WARM
  W-DOCK-RAIL-SEAT-FINAL               W-PERF-PRODUCER  │          W-INVALID-RING
                                       W-PAYLOAD-DEFER  │          W-EYEBROW-UNION
│                                                       │                                          │
└───────────────────────────────────────────────────── │ ────────────────────────────────────────┘
                                                        │
   W-CARD-COMPOSITE is the CLS-keyframes-fix ARM of the W-SCROLL-CARD umbrella (Batch P) —
   ONE card-scroll family, the row counts here, the umbrella owns it. (coherence-harden §6)
        │
        ▼
Batch 5  CROSS-REPO ADOPT             Batch 6  CHRONIC RESIDUALS + DOC SYNC   (parallel after the lib work stabilizes)
  W-PEER-SPINE   (4.0.1-candidate → 4.1.0)  W-NDA-DECIDE   (build-or-retire)
  W-ADOPT-RECONCILE                          W-AUR-KUWAHARA (build-or-retire)
  W-SLIDES-DRIVE (DRIVEN; the one foreign tree)  W-PRECEPT-SYNC
  W-EASING-PRIMITIVE (cross-repo)            W-DELTA-RESHOOT
  W-LINEAGE-PROBE (gate)                     W-DOC-FRESHEN
  W-CROSSREPO-ASKS (by-name)
        │                                          │
        └──────────────────────┬───────────────────┘
                               ▼
Batch 7  CLOSE
  W-REFLECT3  (fresh gestalt under the HARDENED proof:ba-gestalt; both modes, mobile + desktop)
  W-CLOSE     (4.1.0 cut; the FULL release battery local∪ci∪release; the lineage map)
```

## §2 — Batch P — the cross-repo PRIMITIVES band (the speedtest AW v2.1 "Living Instrument")

Runs **PARALLEL with Batches 2–4** (forward feature work), after the Batch-0 integrity floor + the Batch-1 gestalt hardening. Each primitive's gestalt verdict rides the HARDENED `proof:ba-gestalt`. Ships at the single 4.1.0 cut; speedtest bumps `^4.1.0` at AW.W7.

```
        (Batch 1 hardened gate)
                  │
                  ▼
Batch P  PRIMITIVES ──────────────────────────────────────────────────► feeds Batch 5 (the 4.1.0 consume)
  ── P0 (the living-chrome core) ──
  W-BORDER-PROGRESS   ◄── consumes value.js OKLCH sampleColorRamp helper (cross-repo; W-CROSSREPO-ASKS)
  W-DECK              ◄── lifts slides/src/deck → /deck SIBLING subpath;  ◄── kf springTimingFunction (--spring-deck)
  W-DOCK-MORPH-FAMILY  (extends the BA W-DOCK-MORPH-INSITU lineage — compositor-transform + PRM-seat + self-reserve REPAIR)
  W-ON-GLASS-FG        (distinct contrast-target register beside the BA adaptive-glass seam — targets the composited fill)
  W-AURORA-SWRASTER    (coordinates-with W-PAYLOAD-DEFER — the aurora split)
  ── P1 ──
  W-SCROLL-CARD ──────► ABSORBS W-CARD-COMPOSITE (Batch 3, the A'-3 CLS arm); shares proof:no-layout-animation
  W-LIQUIDHOVER        (the tier-root specular auto-arm — feeds the W-LENSING specular family; disco-grain-pop-kill stays its own)
  W-PHASE-PALETTE
  W-PAPER-GRID-TEXTURE
  ── P2 (refinements; speedtest ships green without them) ──
  W-CONTROL-TOKENS
```

Intra/inter-band edges:
- `W-SCROLL-CARD` is the family umbrella; `W-CARD-COMPOSITE` (Batch 3) is its CLS-keyframes arm — drawn once, counted in Batch 3.
- `W-DECK` TRIGGERS the chronic `deck-subpath` disposition book (speedtest survey + slides re-consume = ≥2 consumers) and FEEDS `W-SLIDES-DRIVE` phase-2 (slides retires its own `src/deck/` onto `/deck` after 4.1.0 ships).
- `W-LIQUIDHOVER` shares the `useSpecularPointer` leaf with the LIQUID-GLASS specular family (`W-LENSING` mints it).

## §3 — Batch L — the LIQUID-GLASS band (the SOTA animation + design upgrade)

Runs **PARALLEL with the other BB feature bands**, after the integrity floor + the gestalt + **W-MOTION-CANON** (the doctrine + the compositor-only gate the whole band is bound by). The deep-SOTA addendum's 4 new waves + W-SCROLL-MOTION join here; the §1 deep-SOTA refinement-notes fold IN as annotations (not nodes).

```
        (Batch 1 hardened gate)
                  │
                  ▼
        W-MOTION-CANON  ◄── the doctrine + proof:no-layout-animation extended library-wide
                  │            (the §6 easing floor + per-spring clock are the FLOOR, not a re-tune)
                  │            += --ease-expo-out (deep-SOTA §1 note) + the DEPRECATE fences
                  │               (scroll-jacking / cursor-hijack / WebGL preloaders / jitter)
                  ▼
Batch L  LIQUID-GLASS ─────────────────────────────────────────────────────►
  ── the specular / refraction / press FAMILY (useSpecularPointer = the ONE shared leaf) ──
  W-LENSING ───────────────┐  mints useSpecularPointer (writes --mouse-x/y) + --glass-refract + .glass-lens
     │  (refraction axis)   │  += consumes W-DEEP-GLASS --glass-depth for the deeper register (deep-SOTA §1 note)
     ▼                      ▼
  W-DEEP-GLASS          W-BUTTON-GLASS ──► consumes useSpecularPointer; FIX the W55 substitution trap on the lit register;
     │  (--glass-depth      │              wire useSpringPress; += BG-2 live-field staging + the CTA --glass-depth (deep-SOTA §1)
     │   opt-in tier        │
     │   ABOVE calm)        ▼
     │                  W-PRESS-UNIFY   (the gesture — wire the shipped-but-dead useSpringPress: buttons/cards/dock/list-rows)
     │
  ── the motion signature ──
  W-LIQUID-REVEAL  ◄── kf flipShared + springTimingFunction; the bloom-from-source; replaces popover-animate as the top-layer default
  W-DRAG-MORPH     ◄── kf Draggable (UNCONSUMED) + useLiquidFlex velocity-squish + SpringProgress fling
     │                  consumers: SegmentedTabs :draggable (≡ the prose "W-LIQUID-TABS") + DockLayerGroup pull-to-switch (≥2)
     │                  shares the compositor-transform discipline with W-DOCK-MORPH-FAMILY (Batch P) — NOT the engine
  ── the pops + hierarchy (within proportion) ──
  W-SUFFUSE3       += the pop-ENTRANCE reaching the color/badge/icon tours + the :saturated axis (deep-SOTA §1)
  W-HIERARCHY2     += the buttons CTA-inversion (deep-SOTA §1); REINFORCES W-CHIP-GRAZE + W-DOCK-RAIL-SEAT-FINAL
                      (A4: the dock-facet/title collision is on EVERY desktop route — the re-seat GENERALIZES)
  ── the deep-SOTA HARDEN/PRUNE/DESIGN layer ──
  W-SCROLL-MOTION  (promoted from candidate) += ADOPT sticky-pin + IntersectionObserver + smooth-scroll (deep-SOTA §1)
  W-DISPLAY-TRACKING  (the Apple proportional negative tracking + tight display line-height; a display-ONLY rung)
  W-PRUNE-CONSOLIDATE ◄── proof:no-dual-path: popover-animate / CSS press / specular-disc ABSENT once their successor lands
                          (depends on W-LIQUID-REVEAL + W-PRESS-UNIFY + W-LENSING having shipped their replacements)
  W-DEMO-DESIGN ◄── WIRES the band primitives + the Batch-P new exports onto designed demo specimens (not re-authored);
                    the demo panes JOIN the gestalt roster; closes the storybook-complete bar (coherence-harden §5)
```

Family map (coherence-harden §6 — NOT overlap):
- `useSpecularPointer` is the ONE shared leaf: **W-LENSING mints**, **W-LIQUIDHOVER (Batch P) auto-arms**, **W-BUTTON-GLASS consumes**.
- `--glass-depth` (W-DEEP-GLASS) + the refraction (W-LENSING) are DISTINCT axes; the press (W-PRESS-UNIFY) is the gesture.
- `W-DOCK-MORPH-FAMILY` (Batch P) is the scalar/button-driven V↔H morph REPAIR; `W-DRAG-MORPH` is the NEW pointer pull-gesture — they share the compositor discipline, not the engine.
- `proof:no-layout-animation` is ONE gate (W-MOTION-CANON owns it library-wide; W-CARD-COMPOSITE / W-SCROLL-CARD consume it), not three.

## §4 — Batch V — the substrates / procedural-viz band (the WebGPU-first suite)

Discharges the coherence-harden §3 WebGPU REVISIT (the AV.W deferral premise dissolved — WebGPU is June-2026 Baseline; the user directed "ALL of our visualizations… should be WebGPU first when possible"). The five sub-waves run **SERIAL, not parallel** — each proves the pattern the next is born onto. Soft-reads `W-CANVAS-UNIFY` (Batch 4) so `proof:gpu-substrate-single` lands on the post-de-fork shape. FEEDS the Batch-7 close (the `proof:ba-gestalt` dock/substrate verdicts read the new viz over their real backdrops).

```
   W-CANVAS-UNIFY (Batch 4)  ──soft-read──►  Batch V
   (the Canvas2D de-fork; proof:gpu-substrate-single is a SUPERSET of proof:webgl-substrate-single)
                  │
                  ▼
W-VIZ-SUITE (umbrella) ── proof:gpu-substrate-single (NEW, born-RED) ─────────────────────────────►
  │
  │  the SERIAL chain (no parallel — a compute-particle viz on an unproven substrate conflates substrate ∧ viz bugs):
  │
  W-GPU-SUBSTRATE  ──►  W-AURORA-WGPU  ──►  W-GOOBLOB-WGPU  ──►  W-FLOWFIELD  ──►  W-CONCENTRIC
   (.a FOUNDATION)      (.b rank-1 port)    (.c rank-2 port)     (.d NEW viz)     (.e NEW viz + family doc)
   useWebGPUCanvas      aurora.wgsl;        metaball.wgsl;       <DotFlowField>;  <Concentric>; closes the
   (3rd thin backend    calibrates the      proves SDF smin +    born onto the    suite family-doc rider
   over createCanvas-   OKLab ΔE bar +      the 2 fwidth()       proven           (PROCEDURAL-SUITE.md,
   Lifecycle, ZERO      the shared          AA/Toksvig sites;    substrate;       all SEVEN members) +
   scheduling re-fork)  procedural-         metaball.frag        the reference    the per-viz Substrate
   + useGpuSubstrate    color.wgsl.ts       byte-UNTOUCHED       reproduction     sections + parity table
   picker; the born-    chunk; aurora.frag
   RED parity gate      byte-UNTOUCHED
                  │
                  └──────────────────────────────────────────────────────────────► feeds Batch 7 close
```

Aliases + non-migrators + booked successors:
- **W-FLOWFIELD ≡ W-VIZ-DOTFIELD** and **W-CONCENTRIC ≡ W-VIZ-CONCENTRIC** — the standalone spec names (`waves/W-VIZ-DOTFIELD.md`, `waves/W-VIZ-CONCENTRIC.md`) are ALIASES of the .d / .e sub-waves (the same primitive authored as a README-grade build doc), **NOT extra waves** — they do not add to the 64.
- The migrators IN the band: aurora (rank 1) + goo-blob (rank 2). The non-migrators recorded WITH the reason: fourier-field (Canvas2D right tool), constellation (Canvas2D handles the count), watercolor-dot (PERMANENTLY OUT — mounts zero drawing context).
- Booked successors (trigger-gated NON-band nodes — NOT counted in the 64): **W-FOURIER-GPU** (trigger: thousands of phasors), **W-CONSTELLATION-GPU** (trigger: a much denser lattice), the 4.x per-satellite blob color (W-GOO-COLOR), the gated `.frag` fallback retirement.

## §5 — Critical-path rationale

- **Batch 0 is the gate.** Nothing closes honestly until master CI is green (the full set, siblings-absent) AND the close-battery rule exists — every later batch's gate must run under the repaired harness. W-CI-GREEN + W-CLOSE-BATTERY are the literal close-class fix (the `--run local`-only over-claim made structurally impossible); the rest of the tranche inherits a trustworthy gate floor.
- **W-DAG-RECONCILE lands NOW/early (Batch-0-adjacent).** A 64-wave tranche passes the deft-integration test only if a reader can trace the ONE story; the stale 34-wave DAG failed it. This doc-coherence node has no gate and no code — it makes the spine navigable before execution.
- **Batch 1 hardens the binding-close gate BEFORE the work it must judge.** `proof:ba-gestalt` + the visual-π runner are the close oracle — they must be made real (mobile + content + freshness + executed) before any visual wave's verdict means anything. W-CHIP-GRAZE rides here because it IS the open gestalt FAIL the hardened gate must catch.
- **Batches 2/3/4 fan out** — finishing-BA, performance, and the transpositions are independent surfaces. Within each, the registry single-owner rule holds.
- **Batch P (the cross-repo PRIMITIVES hinge) runs parallel with 2–4.** It is the live 4.0.0 forward-deliverable: the speedtest AW v2.1 living-chrome primitives, built + published by glass-ui (inv-16; speedtest builds none). It feeds Batch 5's consume (the `^4.1.0` bump) and Batch 7's cut. `W-SCROLL-CARD` absorbs Batch 3's W-CARD-COMPOSITE (one card-scroll family); `W-DECK` triggers the chronic deck-subpath book and feeds `W-SLIDES-DRIVE`'s deck consume-back.
- **Batch L (the LIQUID-GLASS hinge) runs parallel with the feature bands, gated on W-MOTION-CANON.** The SOTA direction is mostly WIRING the rich kf/vjs substrate (flipShared / Draggable / SpringProgress — UNCONSUMED today) into the liquid choreography, not net-new engines. W-MOTION-CANON's doctrine + the compositor-only gate bind the band; the specular/refraction/press family coordinates on the ONE `useSpecularPointer` leaf; W-PRUNE-CONSOLIDATE retires the superseded paths (no dual path) AFTER their successors land; W-DEMO-DESIGN wires the band + the Batch-P exports onto designed specimens (the storybook-complete + gestalt bar).
- **Batch V (the substrates/viz hinge) is SERIAL by necessity.** A new compute-particle viz born onto an unproven WebGPU substrate would conflate substrate bugs with viz bugs — so W-GPU-SUBSTRATE (foundation) proves first, W-AURORA-WGPU (cleanest port) calibrates the ΔE bar + the shared WGSL chunk, W-GOOBLOB-WGPU proves the SDF + fwidth() port, then the two NEW viz are born onto the proven substrate, and W-CONCENTRIC closes the family doc. It soft-reads W-CANVAS-UNIFY (Batch 4) and feeds the Batch-7 close's gestalt substrate/dock verdicts.
- **Batch 5 is the cross-repo hinge** — sequenced after the library work + Batch P stabilize so the adopt targets (the peer spine, the EasingPicker, the /deck subpath, the slides hooks) are final. W-SLIDES-DRIVE DRIVES slides Tranche N in totality (the orchestrator owns the slides index; agents stay read-only on git; the push/deploy stays USER-DOMAIN). W-PEER-SPINE / W-ADOPT-RECONCILE / W-LINEAGE-PROBE are re-grounded against the LIVE registry (the cadence is staler than the docs — value.js shipped 0.13.0, the OKLCH helper IS published; the cross-repo cardinal-lesson).
- **Batch 6 decides the chronics** — none re-book; each builds, retires, meets, or holds-with-rationale.
- **Batch 7 closes** under the hardened gate at the single 4.1.0 cut, the full release battery (W-CLOSE-BATTERY: local∪ci∪release, siblings-absent) — the `--run local`-only over-claim cannot recur.

## §6 — The wave-count arithmetic (verify 64)

| band | waves | count |
|---|---|---|
| Batch 0 — INTEGRITY FLOOR | W-CI-GREEN · W-CLOSE-BATTERY · W-LEDGER-REPAIR · W-DISPOSITION-RESTAMP | 4 |
| Batch 1 — GESTALT-BAR HARDENING | W-GESTALT-GATE2 · W-VISUAL-RUNNER · W-CHIP-GRAZE | 3 |
| Batch 2 — FINISH BA + RETIRE DEAD | W-SCROLL-FADE-RETIRE · W-SURFACE-AXIS-COMPLETE · W-DEAD-SWEEP · W-DOCK-RAIL-SEAT-FINAL | 4 |
| Batch 3 — PERFORMANCE | W-LIGHTHOUSE · W-CSS-CRITICAL · W-CARD-COMPOSITE¹ · W-PERF-PRODUCER · W-PAYLOAD-DEFER | 5 |
| Batch 4 — ARCHITECTURE TRANSPOSITIONS | W-CARVE3 · W-CANVAS-UNIFY · W-DARK-INK-WARM · W-INVALID-RING · W-EYEBROW-UNION | 5 |
| Batch P — PRIMITIVES (cross-repo) | W-BORDER-PROGRESS · W-DECK · W-DOCK-MORPH-FAMILY · W-ON-GLASS-FG · W-AURORA-SWRASTER · W-SCROLL-CARD · W-LIQUIDHOVER · W-PHASE-PALETTE · W-PAPER-GRID-TEXTURE · W-CONTROL-TOKENS | 10 |
| Batch 5 — CROSS-REPO ADOPT | W-PEER-SPINE · W-ADOPT-RECONCILE · W-SLIDES-DRIVE · W-EASING-PRIMITIVE · W-LINEAGE-PROBE · W-CROSSREPO-ASKS | 6 |
| Batch 6 — CHRONIC RESIDUALS + DOC SYNC | W-NDA-DECIDE · W-AUR-KUWAHARA · W-PRECEPT-SYNC · W-DELTA-RESHOOT · W-DOC-FRESHEN | 5 |
| Batch L — LIQUID-GLASS | W-LIQUID-REVEAL · W-DRAG-MORPH · W-LENSING · W-BUTTON-GLASS · W-MOTION-CANON · W-PRESS-UNIFY · W-HIERARCHY2 · W-SUFFUSE3 | 8 |
| Batch L — deep-SOTA addendum | W-SCROLL-MOTION · W-DISPLAY-TRACKING · W-DEEP-GLASS · W-PRUNE-CONSOLIDATE · W-DEMO-DESIGN | 5 |
| coherence-harden — DAG | W-DAG-RECONCILE | 1 |
| Batch V — substrates / procedural-viz | W-VIZ-SUITE + the 5 serial sub-waves (W-GPU-SUBSTRATE · W-AURORA-WGPU · W-GOOBLOB-WGPU · W-FLOWFIELD · W-CONCENTRIC) | 6 |
| Batch 7 — CLOSE | W-REFLECT3 · W-CLOSE | 2 |
| **TOTAL** | | **64** |

`4 + 3 + 4 + 5 + 5 + 10 + 6 + 5 + 8 + 5 + 1 + 6 + 2 = 64.`

¹ **W-CARD-COMPOSITE is counted ONCE (Batch 3)** — it is the CLS-keyframes-fix ARM of the W-SCROLL-CARD umbrella (Batch P), per coherence-harden §6 ("one wave with a sub-unit, NOT two competing"). The §A5 "absorbs" and the spec's "builds on" are the SAME statement.

**NOT counted in the 64** (recorded so the arithmetic is unambiguous):
- `W-VIZ-DOTFIELD` ≡ `W-FLOWFIELD` and `W-VIZ-CONCENTRIC` ≡ `W-CONCENTRIC` — ALIAS spec names, the same .d / .e sub-waves authored as build docs.
- The booked trigger-gated successors: `W-FOURIER-GPU` · `W-CONSTELLATION-GPU` · the 4.x per-satellite blob color (`W-GOO-COLOR`) · the gated `.frag` fallback retirement.
- The ONE honest HOLD: `useGlassBackdropLuminance` 2nd-binary-consumer promotion (trigger genuinely unmet — recorded, not folded).

## §7 — Stale references reconciled (this wave's doc-coherence work)

- **W-SLIDES-HANDOFF → W-SLIDES-DRIVE.** The stale DAG's coordination-only `W-SLIDES-HANDOFF` (Batch 5) is SUPERSEDED by `W-SLIDES-DRIVE` (the cross-repo amendment lifts it from coordination → DRIVEN: BB drives slides Tranche N in totality; H-BA cleared by the 4.0.0 publish; N.W-DEPLOY waits on H-DEPLOY).
- **The 34-wave graph → 64.** The stale DAG graphed only the original 8-batch structure (34 waves). This DAG graphs the full post-amendment 64-wave spine (Batch P + Batch L + the deep-SOTA addendum + W-DAG-RECONCILE + Batch V).
- **The §1 coherence-harden cross-repo hardenings are ANNOTATIONS, not nodes** — folded onto W-PEER-SPINE (the value.js ^0.13.0 / ^1.0.0 born-RED leg + the dual-instance intersect), W-ADOPT-RECONCILE (the MULTI-EDGE fourier re-pin + the stale-prop-binding probe), W-LINEAGE-PROBE (the Atlas as a PRESENT on-disk member at `sci-report/usf/web` + the gate-name reconcile).
- **The deep-SOTA §1 refinement-notes are ANNOTATIONS, not nodes** — folded onto W-MOTION-CANON (--ease-expo-out + the DEPRECATE fences), W-LENSING (--glass-depth consume), W-BUTTON-GLASS (BG-2 staging + CTA depth), W-SUFFUSE3 (the pop-entrance reaching the tours), W-HIERARCHY2 (the CTA-inversion), W-SCROLL-MOTION (the sticky-pin + IO ADOPT).
- **W-CARD-COMPOSITE / W-SCROLL-CARD** reconciled to ONE statement (umbrella + CLS arm; coherence-harden §6).
- **The booked successors** (W-FOURIER-GPU, W-CONSTELLATION-GPU) are shown as trigger-gated NON-band nodes, NOT counted in the 64.

## §8 — The §7-style fences (carried from AZ/BA, extended for the new bands)

- **The hardened-agent git clause.** Fanout agents NEVER stage/commit/checkout/tag/publish. The orchestrator owns the index + the irreversible legs. (`docs/precepts/instructions/tranche/AGENT_DISPATCH_TEMPLATE.md`.)
- **The GL-shader fence (absolute), NOW covering the WGSL migrations.** `aurora.frag.ts` (405L) + `metaball.frag.ts` (417L) are BYTE-UNTOUCHED (`git diff --stat` empty at close). A WebGPU migration authors a NET-NEW parallel `.wgsl` PRIMARY and LEAVES the `.frag.ts` as the WebGL2 fallback; the OKLab ΔE capture-pair verifies byte-equivalent output. The pilot `glassShader.wgsl` is READ for convention, never edited. The new viz' shaders are NET-NEW files in their own feature-dir `shaders/`. The goo `uSatColor` GL-color seam stays the ONE booked 4.x wave (W-GOO-COLOR) that may widen the legacy GL-color path.
- **presets-in-consumers (the hard fence).** ppmycota / demo presets NEVER enter library tokens (the W-DARK-INK-WARM recipe stays on the library legendre identity). The viz band's teal-on-navy reference is a DEMO preset (`demo/stories/substrates/presets.ts`), NEVER a library token; every viz DEFAULT palette is neutral/warm-cream-identity via the ColorResolver / value.js OKLCh seam.
- **The cross-repo foreign-tree fence is bidirectional — with SLIDES the ONE driven exception.** No edits to value.js / kf / fourier / speedtest trees (by-name asks + consume contracts only). The fence is LIFTED for **slides** ONLY (via W-SLIDES-DRIVE — the user explicitly directed BB to drive it; the orchestrator owns the slides index; agents stay read-only on git; the push/deploy stays USER-DOMAIN).
- **Compositor-only + PRM-safe (the LIQUID-GLASS + viz binding posture).** transform/opacity/filter/clip-path only; every liquid motion snaps to its endpoint under `prefers-reduced-motion: reduce`; every spring pairs with its `--spring-<name>-duration` clock; the WebGPU substrate mirrors `useWebGLCanvas`'s offscreen-pause/IO/PRM/DPR discipline. The DEPRECATE fences (scroll-jacking / cursor-hijack / WebGL preloaders / motion-everywhere jitter) are binding in W-MOTION-CANON's doctrine.
- **The cardinal lesson (live-verified = an own-surface DELTA + a paired π).** Each wave NAMES the own-surface DELTA it captures at execution (a frame-series for reveal/drag/press; a refraction ON/OFF over the live aurora; the per-viz parity capture-pair; both modes) with AZ-form freshness headers; the gestalt verdict rides the HARDENED `proof:ba-gestalt` (W-GESTALT-GATE2).

---

*The path-forward synthesis graphs the full 64-wave spine. The per-wave specs live in `waves/`; PROGRESS.md is the running index + status source of truth. No implementation — tranche development only.*
