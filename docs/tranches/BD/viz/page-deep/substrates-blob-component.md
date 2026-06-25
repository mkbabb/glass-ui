# Pass-E COMPONENT deep audit — substrates/blob → `GooBlob` (`@mkbabb/glass-ui/goo-blob`)

Audit target: the SOURCE component(s) the `substrates/blob` page demos, NOT the demo page.

## Files read (real code)

| file | role |
|---|---|
| `src/components/custom/goo-blob/GooBlob.vue` | the SFC — config-resolve, token-color un-wrap, pointer-wake, pause seam, grounded gel-dome CSS shadow |
| `composables/useMetaballRenderer.ts` | the renderer — `createGpuSubstrate` picker, shared `resolveFrame` sim advance, demand-gate `shouldContinue`, wake scheduler, DPR resize |
| `composables/useBlobSatellites.ts` | the deterministic orbit→merge→absorb→emerge phase machine + quiescence/`nextEventMs` |
| `composables/wgpuSetup.ts` | the WGSL `setupWGPU` seam (pipeline, premultiplied blend, typed-struct buffer write) |
| `shaders/metaball.wgsl.ts` | the WebGPU-FIRST primary — SDF smin body + satellites + trail, analytic normal, OKLCh perturb, lit-glass, soft-shadow march, 2 `fwidth()` sites |
| `constants.ts` / `types.ts` / `src/styles/tokens/shadow.css` | tuning atoms, `PULSE_OMEGA/ZETA`, the `--blob-shadow-*` gel-dome tokens |

Cross-ref north stars: PROCEDURAL-SUITE.md (goo-blob rank 2, MIGRATED), README §Substrate, DESIGN.md six-layer composite, motion-canon P1–P6.

---

## (1) ANIMATION — affordance audit

**STRONG where it counts; ONE structural gap.**

- **Living motion is rich + idiomatic.** The mood→{valence,arousal} affect model drives orbit speed / wobble / sheen; the satellite phase machine cycles orbit→merge→absorb→emerge with eased blends (`easeIn`/`easeOut` + smoothstep `ORBIT_BLEND_MS`); the click fires a real damped-harmonic spring impulse (`PULSE_OMEGA=18`, `PULSE_ZETA=0.35` symplectic-Euler oscillator) — a genuine one-shot overshoot-then-ring, not a CSS transition. The BC.W-VIZ-GOOBLOB-MEATBALL accel-term fold (the `usePointerVelocityField` second-derivative read → iOS-27 gel snap-back on a decelerating flick) is wired into the SAME `resolveFrame` callback (no own rAF). This is HIGH animation affordance.
- **The "four-state contract" maps correctly for a canvas primitive.** A `<canvas aria-hidden>` is not a four-state interactive atom; its analogue is rest (orbiting) · hover (pointer-lean deformation + `:hover` gel-dome shadow swell) · active/press (click spring impulse + accel burst) · disabled (PRM/pause freeze). All four are present and live.
- **GAP — NO ENTRANCE/EXIT (motion-canon P2/P3 unmet at the component edge).** The blob has zero mount choreography: on mount the canvas simply begins painting the resolved field. The iOS-27 / DESIGN.md liquid language wants a glass surface to BLOOM into being (the `useLiquidReveal` / `.glass-reveal` register: scale+fade+blur-settle from the anchor). The procedural body is paint-only; there is no `opacity 0→1` + `scale(0.9)→1` settle on the WRAPPER (compositor-only, PRM-static). Today a blob just appears. This is the single most visible animation miss for the user's "HIGH animation affordance for EVERY component" bar.
- No dead/janky animation found in the renderer. The `dtMs` clamp `[0,50]` + `Math.max(0,…)` correctly kills the post-resume negative-dt divergence (AY.W-BLOB-CONFIG D4); the tempo-integrated `simTimeMs` keeps FBM continuous across pause. Clean.

## (2) PROCEDURAL VIZ — PROCEDURAL-SUITE conformance

**Adheres fully.** goo-blob is the rank-2 MIGRATED member: `metaball.wgsl.ts` WebGPU-first primary + byte-untouched `metaball.frag.ts` WebGL2 fallback, both over the ONE `createCanvasLifecycle` leaf via `createGpuSubstrate`. The two `fwidth()` sites (AA half-width + Toksvig spec clamp) are transcribed to WGSL fragment-stage `fwidth()`. The BC.W-GOOBLOB-MEATBALL **uniformity structural fix is real and correct** — `Nh`/`nVar` are HOISTED to uniform control flow at the top of `fs_main` (before the `alpha < 0.001` early-return and the non-uniform `uLit`/`uShadow`/`uStage` branches), so the WGSL primary ARMS on Metal instead of falling to the net (the BB residual). The shared `procedural-color.wgsl.ts` chunk guarantees no color drift vs the GLSL fallback. STAGE-1 (`variant="blob"`) / STAGE-2 (`meatball`) gate via `uStage` is clean. Cited-SOTA math (IQ smin value+gradient, IQ rmshadows penumbra, Ottosson OKLCh) — all named.

## (3) PERFORMANCE

**Excellent, gate-locked.** Demand-driven `shouldContinue` parks the loop at quiescence + arms a `setTimeout` wake at the next satellite/auto-mood horizon (no poll). Offscreen-pause via `useIntersectionPause` (`off-screen-io` reason, distinct from the CV `off-screen` — the F6 one-writer-per-reason fix) + `content-visibility:auto`. Live-PRM freeze in the leaf. DPR clamped `≤2` (`resolveBudgetDpr`) + the `half` quality axis. The CSS is compositor-only: `will-change: transform` on the canvas, two chained `drop-shadow()` filters following the irregular silhouette, `contain: layout style` (NO `paint` — deliberately, so the 160% satellite overflow renders). **One micro-note:** the wrapper `transition: filter … 0.45s` on hover animates a `drop-shadow` filter — compositor-safe (filter is a paint/composite prop, not layout), so no thrash. No layout animation anywhere.

## (4) SAFARI

**Compatible by design.** The whole point of the BC.W-GOOBLOB-MEATBALL uniformity hoist is Metal/Safari WGSL arming; the `target`→`targetL` reserved-keyword rename (BC.W-WEBGPU-EVERYWHERE W7) was the other Safari blocker, fixed. `softShadow2D` is derivative-FREE (fragment-safe). The WebGL2 fallback covers the pre-WebGPU Safari tail. `metaball.frag.ts` byte-fence holds. The binding cross-GPU truth (real per-GPU `fwidth()` drift + a Metal live capture) is the open item, booked to W-VIZ-PARITY-METAL — that is where Safari is PROVEN, not just intended.

## (5) IDIOMATIC / no-legacy

**Clean, no dual-path.** The DOM-free renderer contract holds (the SFC's `resolveTokenColor` leaf un-wraps `var(--token)` ONCE; `getComputedStyle` appears exactly once in the codebase for this). The `renderConfig` Proxy (per-instance `variant` override forwarding straight through to the live `cfg`) is elegant — one config object, no second state path. The pause seam binds the SAME captured renderer handles declaratively (`v-model:paused`) + imperatively (`pause`/`resume`) — no parallel pause path. The shared `resolveFrame` makes the sim substrate-agnostic; only upload+draw diverges. **TWO demo-facing nits (not src bugs):**
  - **Import-path label NOT standardized** — `blob.vue` imports `from "../../../src/components/custom/goo-blob"` (deep relative), not the canonical `@mkbabb/glass-ui/goo-blob` subpath the README/CLAUDE.md advertise. The user's "standardize the import-path label" ask lands here (a demo-page concern, the page-deep sibling owns the actual demo edit).

## (6) The glass six-layer composite

**N/A by correct design — the blob is a LIT GEL BEAD, not a glass plate.** DESIGN.md's six-layer optical composite (backdrop blur+saturate · surface tint · edge rim · inner catch-light · drop shadow · grain) is the GLASS-TIER spec; goo-blob is an opaque-fill procedural creature (`glass-cannot-sample-glass` — a blob does not blur a backdrop). It DOES carry the congruent gel-bead optics: Blinn-Phong glint + Fresnel rim (edge rim + catch-light analogue), fake-SSS thickness inner-glow, the procedural silhouette-following soft contact shadow (drop shadow), the IGN 1-LSB dither (grain analogue), and the CSS two-rung grounded gel-dome `drop-shadow` (ambient + contact). The six-layer bar belongs to the CARD this blob sits IN, not the blob.

---

## Findings → BD tranche disposition

| # | finding | severity | disposition | wave |
|---|---|---|---|---|
| F1 | NO entrance/exit bloom on the component (motion-canon P2/P3 unmet at the canvas edge) — the blob just appears | MAJOR (the user's HIGH-affordance bar) | **AUGMENT** — add a compositor-only `opacity/scale/blur-settle` mount bloom on the `.goo-blob-wrapper` (the `.glass-reveal`/`useLiquidReveal` spring register, PRM-static), additive default-on | **FOLD into `BD.W-BLOB-MOTION-TUNE`** (it already owns the live-blob motion-honesty tunes; this is the third motion arm) |
| F2 | Import-path label is the deep relative `../../../src/.../goo-blob`, not `@mkbabb/glass-ui/goo-blob` | MINOR (demo) | **MODIFY** the demo import + every substrates page label in lockstep | **`BD.W-PAGE-OFFTOKEN-SWEEP`** (the page-hygiene sweep owns the standardize-label edit) |
| F3 | Metal/Safari WGSL parity is intended but not yet PROVEN on a real GPU (live capture pending) | MAJOR (Safari bar) | **KEEP booked** — no code change; verify-and-capture | **`BD.W-VIZ-PARITY-METAL`** (already owns the per-GPU `fwidth()` drift + Metal live capture) |
| F4 | Per-satellite derived-shade color still booked (single warm body mean; satellites do not tint per-orbit) | MINOR (richness) | **KEEP booked** — the GL color-seam fence is not widened here | **`BD.W-GOOBLOB-SAT-SHADE`** (already the owner) |
| F5 | Squircle-refract edge lensing on the bead | ENHANCEMENT | **KEEP booked** | **`BD.W-GOOBLOB-SQUIRCLE-REFRACT`** (already the owner) |
| F6 | `responsiveness`/`stretch` flick-pseudopod still reads near the noise floor (~6%) per W-BLOB-MOTION-TUNE arm-2 | MINOR | **DECIDE on the live engine** (make-read or honest-down) — no new wave | **`BD.W-BLOB-MOTION-TUNE`** arm 2 (existing) |

No PRUNE findings — no dead code, no dual-path, no non-idiomatic pattern in the component. Only ONE net-new code change is warranted (F1, the entrance bloom), and it folds into an existing wave rather than minting one.

---

## 5-line verdict

1. **Animation:** rich living motion (mood affect + satellite phase machine + spring-impulse + accel snap-back, all on the one rAF) — but ZERO entrance/exit bloom: the blob just appears, missing motion-canon P2/P3 at the component edge (F1, the only net-new code, FOLD→W-BLOB-MOTION-TUNE).
2. **Procedural viz:** fully PROCEDURAL-SUITE-conformant — WGSL-primary/GLSL-fallback over one lifecycle leaf, the BC uniformity hoist correctly arms the two `fwidth()` sites on Metal, shared color chunk prevents drift; STAGE-1/2 gate clean.
3. **Performance + Safari:** exemplary — demand-park + offscreen-pause + live-PRM + DPR≤2, compositor-only CSS, derivative-free shadow march; Safari compatible by design but the real-GPU parity capture is the open proof (F3, KEEP→W-VIZ-PARITY-METAL).
4. **Idiomatic:** clean — DOM-free renderer, single-config Proxy, one-loop sim advance, no dual-path or legacy; the only nit is the deep-relative import label vs `@mkbabb/glass-ui/goo-blob` (F2, MODIFY→W-PAGE-OFFTOKEN-SWEEP).
5. **Six-layer composite:** correctly N/A — the blob is an opaque lit gel bead (glass-cannot-sample-glass), carrying the congruent gel optics (Fresnel rim + SSS + silhouette soft-shadow + dither + grounded gel-dome); the six-layer bar belongs to its host CARD.
