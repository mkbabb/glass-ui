# BC — the gestalt-first reckoning: rebuild the glass + dock, re-verify the paint, fold every chronic, close honestly

**Status**: DEVELOPED (tranche development only — no implementation until greenlit)
**Opens after**: the BB tranche is frozen at HEAD `e1b4b44c` (the BC.W-AUDIT pre-fix landed the grey-slab unblock so the demo is auditable). BC supersedes the never-run BB Batch 5/6/7.
**Authored from**: the 32-agent deep audit (`docs/tranches/BC/audit/FINDINGS-DIGEST.md`, 29 findings) + the live grounding (`audit/LIVE-GROUNDING.md`).

---

## 0 — The diagnosis (what actually happened)

The BB tranche shipped ~33 commits, every wave reporting **born-RED→GREEN complete** with master CI green, while the **live demo regressed to broken** — glass rendering opaque grey, both docks flat slabs, the rail and the liquid morph broken. This is not a handful of bugs. It is **one architectural disease with three faces**, confirmed by the audit:

1. **The single-terminal-reflect deferral.** ~38-47 BB waves deferred their *binding* acceptance criterion — the live paint / gestalt verdict — to ONE terminal wave, `W-REFLECT3`, that **never ran**. So "complete" meant *source-green-only* across the entire visual surface. The plan-vs-delivery delta: **~31% genuinely-done** (the integrity/structure floor — paints zero pixels, real value), **~46% paper-done** (real source edits on a broken base, paint never validated), **~14% never-run** (all of Batch 5 + the whole close). **0 of ~33 visual waves had their paint verified.** The user's "the vast majority has not been implemented at all" is the correct read of the *delivered-paint* axis.

2. **The gates are paint-blind.** `proof:adaptive-glass`, `proof:dark-material`, `proof:no-gray`, `proof:glass-cohesion` all PASS on **both** the grey-broken and the translucent-fixed state — they verify the *source mechanism exists* (the tint seam, the recipe) and never read the *actual gestalt paint* (grey vs translucent). `proof:ba-gestalt` was tagged `release`-only (absent from CI), reads hand-typed markdown verdicts (stale BA-era stamps), and the WGSL parity captures are device-free ΔE-0.0 tautologies (two identical CPU PNGs, same sha256 — a test that cannot fail). The harness that was supposed to catch this was structurally incapable of it.

3. **The chronic-patch death-spiral.** The dock has **178 dock-touching commits** across the repo's history — patched endlessly across AX/AY/AZ/BA/BB, still broken. The adaptive-glass darken has been "recalibrated" at AX.W54 → AX.W55 → AZ.W-ADAPTIVE-AUTO → BA.W-DARK-MATERIAL (7 scopes) → BB.W-DARK-INK-WARM → BB.W-ON-GLASS-FG → BB.W-CARD-TIER-ALPHA — every one claimed to fix the grey-slab; it is STILL grey. Patching a chronically-broken architecture is the disease. The cure is the architectural transposition the user named: **rip out and rebuild, no legacy.**

**The grey-slab root** (fully isolated, `adaptive-glass-darken` finding): the dock + overlay band re-point `--glass-tint-strength → --glass-tint-strength-aa` (20%, ink-ward) **unconditionally**, with **no read of the backdrop signal**. The `useGlassBackdropLuminance` observer that is *supposed* to gate it is architecturally decorative — it writes `--glass-backdrop-luma` that **nothing reads**, and on real shell routes it never even samples (its `backgroundCanvas` is null, wired live on exactly one demo file). The BC.W-AUDIT pre-fix (commit `e1b4b44c`) moved the dock/overlay band to the 4% floor as a targeted unblock — the seed of the real fix, which is to **close the observer loop**.

---

## 1 — The governing principle

**GESTALT-FIRST, NO LEGACY, MEASURED PAINT.** Three binding rules that every BC wave obeys, mechanically enforced:

1. **Paint is the binding truth, per-wave, at close.** No BC visual wave closes `complete` without its OWN fresh `:5199` live capture (both modes × mobile+desktop) AND a **pixel-readback verdict** (computed-style chroma/luminance/alpha over the live surface) recorded inline. The single-terminal-reflect deferral is abolished. `proof:ba-gestalt` becomes a **pixel-reader** (not a markdown-stamp-reader), re-tagged **ci-BLOCKING**. No structural-proxy, no device-free ΔE-0.0 tautology, no "rides W-REFLECT3."

2. **No legacy, no workaround — architectural transposition.** Where patching has failed (the dock at 178 commits, the adaptive-darken at 7 recalibrations), BC **rips out and rebuilds** as ONE coherent engine. Clean break, no alias, no back-compat shim. The genuinely-done integrity/structure floor (~31%) is TRUSTED as-is — the carves, the spine, the canvas-unify, the dead-sweep, the gate containers — only the verdict-source was wrong, not the plumbing.

3. **Re-verify, don't re-do.** The ~46% paper-done visual primitives (the entire liquid-glass band — lensing, glass-accent, metal-shimmer, button-glass, deep-glass, press-unify, liquid-reveal, drag-morph, …) are **real in source**. They don't need rebuilding; they need a **non-grey base to paint on** + a fresh per-wave capture. The disease was the close-model, not the individual primitives. BC re-walks each on the rebuilt floor; the ones that paint correctly flip GREEN, the rest re-open — **never rubber-stamped**.

---

## 2 — The bands (sequenced — foundation precedes paint precedes adopt)

### Band 0 — The verification transposition (FIRST — the process fix that makes everything else honest)

- **BC.W-GESTALT-FIRST** — abolish the single-terminal-reflect. Mint the per-wave live-capture-gates-the-wave discipline + the shared `:5199` pixel-readback harness; re-make `proof:ba-gestalt` a **computed-style pixel reader** over fresh captures, re-tag it **ci-BLOCKING** (not release-deferred). Born-RED on HEAD (the grey paint), GREEN only when the surfaces actually paint translucent-warm.
- **BC.W-PAINT-GATE** — the source-string-only glass/dock/viz gates each gain a **paint arm** (a live computed-style assert: a calm-light backdrop yields α<0.7 ∧ oklab-L>0.85 ∧ chroma>0 — translucent, warm, NOT grey). Retire the device-free ΔE-0.0 WGSL tautology for a real-swap-chain readback.
- **BC.W-FOLD-LEDGER** — a machine-checkable `FOLD-LEDGER.json` mirroring the 71-wave plan-vs-delivery delta + every chronic/deferred/booked item; `proof:bc-fold-ledger` REDs the close if any folded item is silently dropped (the anti-evasion floor the BB close lacked).

### Band 1 — The glass rebuild (FOUNDATION — everything paints on it)

- **BC.W-GLASS-IDENTITY** — define + land the target glass identity: translucent **warm** liquid glass (the iOS-26/27 register), the backdrop reads THROUGH, calm-translucent default. The token + 5-rung cascade as ONE coherent model (no accreted over-darken).
- **BC.W-ADAPTIVE-RECONCILE** — **close the observer loop** (the headline glass fix). The darken becomes a PURE FUNCTION of measured backdrop luminance: register `--glass-tint-strength` as a typed inheriting `@property <percentage>`; the observer writes the STRENGTH DIRECTLY (continuous lerp off `--glass-backdrop-luma`) — 0–4% over a calm/dark backdrop, ramping to ≤20% only as sampled luma crosses the bright threshold. DELETE the unconditional `:where(.glass-dock)`/`:where(.glass-floating,.glass-overlay)` strength re-points (the BC.W-AUDIT pre-fix is the seed). Make the observer ACTUALLY SAMPLE on every dock/overlay route (not the one hand-wired demo). ONE seam — the observer's continuous write; no `@container` descendant-only parallel path survives.
- **BC.W-GLASS-LEGIBILITY-MEASURED** — the per-tier alpha + the muted/contrast/on-glass-fg reconciliation **measured** (a live contrast readback), not asserted; the dark-rim "black border" re-derived as a catch-light off the (un-darkened) plate, not a near-black hairline.

### Band 2 — The dock + rail + morph rebuild (the headline transposition — the 178-commit chronic ends)

- **BC.W-DOCK-ENGINE** — ONE coherent dock engine replacing the 10-patched-file chronic (`GlassDock` + `DockLayerGroup` + `DockSection` + `DockRail` + `dockMorphContext` + `dockMorphMeasure` + `useDockState` + `useLayerTransition` + the morph-bridge + `dock/{shell,morph,density,layers,layer-group,overflow,controls}.css`). The dock as the **source of absolute expressiveness — the epigrammatic exemplar of the motion + glass primitives**.
- **BC.W-DOCK-STACK-RAIL** — the rail **rebuilt to the user's macOS-expanded-stack spec** (the divider-carousel of W-DOCK-RAIL-SEAT-FINAL is RE-OPENED — it contradicts the ask): the rail EXTENDS beyond the dock; on hover of a core rail item its icons EXPAND OUT to sit NEXT TO the rail; **3 (configurable) items visible at a time, scrollable**; the bottom-most stack item extends to the dock bottom, the rest sit in the dock (1) + against the rail (n scrollable); only the 1-or-n displayed, **NOT shadowed**.
- **BC.W-LIQUID-MORPH** — the morph **generalized to arbitrary shapes** (the box-size V↔H morph of W-DOCK-MORPH-FAMILY that turns WHITE/invisible is RE-OPENED). The morph never goes white; it is the expressive exemplar of `useLiquidFlex` + the glass primitives morphing into arbitrary silhouettes.
- **BC.W-DOCK-EDGE** — the rim/border as a catch-light, not the black hairline (folds with the glass-rim fix).

### Band 3 — The procedural-viz modernization (real, working, interactive, tested-LIVE)

- **BC.W-WGSL-COMPILE-GATE** — a headless WGSL **compile floor** that catches the GooBlob `var target` reserved-keyword error (250×/frame invalid-pipeline, 0 pixels live) + fixes the **dead WebGPU capture path** (the sync-arm-before-async-device that greys all 5 aurora thumbnails). The "WGSL primary" stops being a dormant always-fall-to-WebGL2 path.
- **BC.W-GPU-PARITY-REAL** — replace the ΔE-0.0 tautology with a real-swap-chain readback; verify WebGPU actually executes.
- **BC.W-VIZ-LIVE** — each procedural viz (aurora · goo-blob · fourier-field · dot-flow-field · concentric · constellation · watercolor-dot) validated **LIVE**: renders + interacts + a real per-viz paint capture. Aurora, blob, the new viz — modernized + working + interactive, not structural-proxy-claimed.

### Band 4 — The visual reconcile (honestly discharge the ~33 paper-done BB primitives)

- **BC.W-VISUAL-RECONCILE** — re-walk every paper-done BB primitive (the liquid-glass band + suffuse + hierarchy + display-tracking + the demo-design panes) **live on the rebuilt glass floor**. The ones that paint correctly flip GREEN with a fresh capture; the rest re-open. NOT rubber-stamped. This is the wave that honestly closes the BB visual band.

### Band 5 — The chronic-fold + the dropped asks + the recap

- **BC.W-CHRONIC-FOLD** — the complete enumeration (the AX DISPOSITION-REGISTER + every booked/held/successor item across AX→BB) DECIDED (built · retired · met · held-with-rationale), zero re-book.
- **BC.W-PROMPT-LEDGER** — every user prompt/request mapped to delivered/undelivered (see §3), the dropped asks surfaced + owned.
- **BC.W-DIST-COMMENT-FIX** (urgent, isolated, EARLY) — paren/bracket-balance the `src/styles/index.css:196-217` comment (the `Missing opening (` token poisoning Tailwind's Oxide candidate-extractor, shipping in every consumer dist tarball) + a born-RED `proof:dist-css-balanced` guard. **Unblocks the speedtest fleet's build** independent of the rebuild.
- **BC.W-CONSTELLATION** + **BC.W-SLIDES** — the constellation reconcile + the slides adopt (sequenced into Band 6).

### Band 6 — The cross-repo adopt + the honest cut (LAST — sequenced AFTER the rebuild, because adopting against broken glass is the trap BB fell into)

- **BC.W-DECK-BUILD** — build the genuinely-unbuilt `/deck` subpath + `src/components/custom/deck/` + `--spring-deck` + `proof:deck` (the springTimingFunction consume is pre-existing; W-DECK's deliverable is vapor). The slides DONOR re-grounded.
- **BC.W-CROSSREPO-ADOPT** — drive slides 3.13.0→4.x (retire the `.glass-dock`-omitting opt-out that hides the grey-dock disease) + speedtest `^4.x` (delete `?aurora=css`/the App.vue/register.css interims) + W-CONSUMER-MODERNIZE/W-LEAF-MODERNIZE — each verified by a real install + typecheck on the sibling, not a paper handshake.
- **BC.W-CUT** — the actual 4.x publish + the slides.friday.institute deploy, gated on a full `--run full` siblings-absent battery + the live-paint gestalt PASS (the W-CLOSE carry, done honestly — never a phantom-reflect deferral).

---

## 3 — Prompt recap (every request → delivered / undelivered, owned)

| Request (this engagement) | Status | BC home |
|---|---|---|
| Execute the BB tranche IN TOTALITY → 4.1.0 publish + slides redeploy | **UNDONE** — source landed, paint broke, the close never ran, version 4.0.0 | the whole BC tranche; the cut is BC.W-CUT |
| Maximal parallelism / workflow usage, rate-safe batches of 3 | **DONE** (process) — but it shipped broken paint; the *process fix* is BC.W-GESTALT-FIRST | — |
| Card padding in golden proportion across all pages/components | **PAPER-DONE** (W-CARD-PAD source) — paint unverified on the grey base | re-verified in BC.W-VISUAL-RECONCILE |
| Speedtest AW v3 relay (B1-B9, A1-A3) | **MIXED** — A/C confirms real; B-asks source-landed/unverified; the `^4.1.0` consume blocked on the never-cut version | BC.W-CROSSREPO-ADOPT + BC.W-DIST-COMMENT-FIX |
| Fix the vertical dock (this turn) | **DONE** (the grey-slab unblock, `e1b4b44c`) — full dock rebuild is BC | BC.W-DOCK-ENGINE |
| Start the dev server | **DONE** — live at :5199 | — |
| The rail = macOS hover-expand stack (3 configurable, scrollable, n-stack) | **UNDONE / CONTRADICTED** — a divider-carousel was built instead | BC.W-DOCK-STACK-RAIL |
| The liquid morph (never white) + generalize to arbitrary shapes; the dock = absolute expressiveness | **UNDONE** — the box-morph turns white | BC.W-LIQUID-MORPH |
| Glass primitives (not destroyed) | **REGRESSED** — grey-opaque | BC Band 1 |
| Constellation updated · slides updated · procedural modernized/working/tested/interactive | **UNDONE** | BC.W-CONSTELLATION / BC.W-SLIDES / BC Band 3 |
| Recap all prompts/precepts; fold all chronic + deferred; no legacy; gestalt transpositions | **THIS DOCUMENT** | BC.W-PROMPT-LEDGER + BC.W-CHRONIC-FOLD |

---

## 4 — Precept enforcement (what was violated, made mechanical in BC)

- **live-verify-capture** ("live-verified needs a captured DELTA + paired-π, not a commit-message claim") — **VIOLATED at scale** (the single-terminal-reflect deferral + structural-proxy captures). BC.W-GESTALT-FIRST makes it per-wave + pixel-read + ci-blocking.
- **gestalt-redesigns-over-patches / architectural-approach** ("no workarounds, no legacy code") — **VIOLATED** (the dock at 178 commits, the adaptive-darken at 7 recalibrations). BC rips out + rebuilds (Bands 1-2).
- **glass-ui-binding-verification** (stale bindings silently no-op; only e2e catches) — the same class as the paint-blind gates; BC.W-PAINT-GATE adds the e2e/computed-style arm.
- **no-backwards-compat / clean break** — KEPT (honor it in the rebuild: no aliases for the ripped-out dock/glass).
- **analyze-in-full** — honored by this 32-agent audit + this recap.

---

## 5 — The fold ledger (chronic + deferred — summary; full machine-checkable list = BC.W-FOLD-LEDGER)

Folded into BC, every item DECIDED (no re-book): the whole Batch-7 close + the single-reflect deferral mechanism (killed); all of Batch 5 cross-repo adopt + W-DECK (built/sequenced); the ~33 paper-done π verdicts (re-verified inline); the WGSL real-GPU parity + the GooBlob compile error + the dead WebGPU capture path; W-PERF-PRODUCER + the never-run live Lighthouse score; the contradicted W-DOCK-RAIL-SEAT-FINAL + W-DOCK-MORPH-FAMILY (re-opened); the 178-commit dock chronic + the adaptive-darken recalibration chronic + the dark-rim + the scope-7 half-fix (rebuilt); the value.js `sampleColorRamp` consume-and-delete; the dist-CSS-comment build bug; the fourier-web glass-scrubber token cruft; the AX DISPOSITION-REGISTER residuals.

---

## 6 — Sequencing + the close model

```
Band 0 (gestalt-first + paint-gate + fold-ledger)   ← the harness becomes honest FIRST
  → Band 1 (glass rebuild)                            ← the foundation everything paints on
    → Band 2 (dock + rail + morph rebuild)            ← the headline transposition
    → Band 3 (procedural-viz live)                    ‖ (parallel with Band 2, disjoint files)
      → Band 4 (visual reconcile of the BB primitives on the rebuilt floor)
        → Band 5 (chronic-fold + recap + dist-fix + constellation/slides)
          → Band 6 (cross-repo adopt + the honest 4.x cut + deploy)
```

The close (Band 6) gates on: master CI green (the FULL `--run full` set, siblings-absent), `proof:ba-gestalt` 8/8 on **content-verified both-mode mobile+desktop pixel captures** (never a markdown stamp), the `--run pi` visual suite GREEN-on-real-device, the FOLD-LEDGER with zero dropped items, and a clean 4.x tag + the slides deploy. **The close is a verification of paint, not a flush of debt — and never a deferral to a wave that won't run.**
