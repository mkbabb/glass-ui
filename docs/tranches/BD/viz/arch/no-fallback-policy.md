# The "no fallbacks, no legacy" policy — what WebGL2 is, what breaks GPU-less, and the clean rule (BD viz-arch)

**Lane** BD viz-research / architecture · **Status** AUTHORED 2026-06-22 · **Branch** `prototype/liquid-dock` ·
**Substrate-grounded** against `src/composables/glass/{webgl,webgpu,canvas2d}/*`, `useGpuSubstrate.ts`, `aurora/constants/renderMode.ts`, `aurora/composables/auroraFallbackGround.ts`, the 10 viz consumers ·
**Scope** PLANNING/RESEARCH ONLY — zero `src/` edits. THIS doc is the binding artifact for the POLICY question; the spine + delete plan is its sibling `gpu-substrate-unify.md`.

> Read alongside `gpu-substrate-unify.md` (the substrate-unification spine — DELETE Canvas2D, ONE picker, the wave `W-GPU-ONLY-SPINE`) and `live-audit.md` §"cross-cutting 5". This doc OWNS the policy decision + the GPU-less consequence analysis; the sibling OWNS the delete list + wiring. They share ONE verdict and do not re-derive each other.

---

## 0. TL;DR — the one-sentence policy

> **WebGPU-first with WebGL2 as the only other path is "TWO GPU BACKENDS" (allowed), NOT a "fallback" (forbidden). The forbidden "fallback" is the CPU rasterizer — Canvas2D — and the no-GPU-at-all CSS/raster ground. A GPU-less env is OUT OF SUPPORT for the live viz (per "no fallbacks") and is handled by a single inert non-animated placeholder, never a degraded Canvas2D viz.**

The mandate's exact words — *"ALL web facilities use WebGPU or WebGL2 — ZERO Canvas2D, NO fallbacks, NO legacy"* — are internally consistent only under this reading: the `or` in *"WebGPU or WebGL2"* is the PERMISSION for two GPU backends; *"NO fallbacks"* binds the CPU-raster tier beneath them.

---

## 1. The decision (the binding policy)

| Tier | What | Verdict | Why |
|---|---|---|---|
| **WebGPU** | the primary GPU path (WGSL pipelines, compute) | **PRIMARY** | the mandate's first-named facility; SOTA |
| **WebGL2** | the second GPU path (GLSL fragment/compute-via-transform-feedback) | **ALLOWED — a co-equal GPU backend, NOT a fallback** | the mandate NAMES it as an allowed facility (the `or`); a GPU shader pipeline, not CPU; byte-equivalent OKLab output |
| **Canvas2D (viz render)** | the CPU-raster substrate (`useCanvas2D`) | **FORBIDDEN — DELETE** | CPU rasterizer; the literal target of "ZERO Canvas2D"; already 0 callers at HEAD |
| **CSS / static-raster ground** | the no-GPU-at-all placeholder (`auroraFallbackGround`, layered-gradient stack) | **OUT OF SUPPORT for the live viz; KEEP only as an inert non-animated FLOOR + a headless-certify mechanism — recorded as a conscious keep** | "no fallbacks" lands HERE; a host with no GPU has no GPU path to offer — the honest answer is a static image, not a degraded viz |

**The headline:** WebGPU-first / WebGL2-net is the shipped policy. KEEP the `useGpuSubstrate` picker. DELETE Canvas2D viz substrate. The GPU-less env is unsupported-for-motion by design.

---

## 2. Why WebGL2 is NOT a "fallback" (the load-bearing distinction)

The trap is treating "fallback" as one word. It has THREE distinct meanings in this substrate, and the mandate binds only two of them:

1. **WebGL2-net** (WebGPU → WebGL2 when `requestAdapter()` returns null / device rejects / device-lost-at-birth). — **ALLOWED.** Both backends are programmable GPU shader pipelines on the GPU rasterizer; the picker's fall is INVISIBLE (`useGpuSubstrate.ts §0` — "the user never sees a downgrade, the SAME viz just renders via the WebGL2 net"); the OKLab output is byte-equivalent (`proof:gpu-substrate-single` parity bar: mean ΔE ≤ 2.0, p99 ≤ 5.0 — below the ≈2.3 just-noticeable). This is not a degraded-quality fallback; it is a second rendering of the SAME viz on the SAME hardware class. The word "fallback" in the mandate means *degraded CPU path*, which this is not.

2. **Canvas2D-substrate fallback** (the dead `useCanvas2D`, the CPU-raster `getContext("2d")` render loop). — **FORBIDDEN.** This is the CPU rasterizer; it IS the "ZERO Canvas2D" target. Already 0 runtime callers at HEAD (`gpu-substrate-unify.md §1`); a pure delete.

3. **CSS/raster ground fallback** (no-GPU-at-all). — **the "no fallbacks" target;** §4 decides (keep as inert floor).

**Recording this de-overload IS the policy** — a future agent reading "no fallbacks" literally would otherwise rip out the WebGL2 net (crash-to-black on the tail + every headless π capture) OR conflate the WebGL2 net with the CSS ground and keep the wrong one. The gate (`proof:gpu-only-spine` G5, sibling §7) machine-locks the de-overload so it cannot silently drift.

**The architectural justification:** the mandate also demands *"robust"* and *"no quick solutions/workarounds."* Dropping the WebGL2 net to honor a literal-"no-fallbacks" reading would crash WebGPU-less hosts to a black void — the opposite of robust. WebGL2-net is the robust path that LETS WebGPU-first ship; it is structural, not cruft.

---

## 3. The browser-support reality (June 2026 — why two GPU backends are mandatory, not optional)

| Facility | Availability | Gap |
|---|---|---|
| **WebGPU** | Chrome/Edge 113+ · Safari 26+ (Metal, no flags) · Firefox 141+ | **Linux Firefox** still flags it · **pre-A12 iPhones** lack it · **headless / SwiftShader CI** returns `null` from `requestAdapter()` · GPU-blocklisted / locked-down VMs |
| **WebGL2** | ~universal (Chrome/Edge/Firefox/Safari, all modern mobile; ~98%+ of real traffic) | a genuinely GL-less env (no GPU drivers at all, save-data forced-software, some headless configs) |

The WebGPU-only-no-WebGL2 stance would crash-to-black on the **~5-10% tail** (Linux Firefox, older iPhones) AND on **every headless π capture** — which kills the BD charter's paint-first / live-verify discipline (charter §9: every painting wave closes against a fresh `:5199` capture; CI runs SwiftShader where `requestAdapter()` is null). WebGL2-net is therefore load-bearing for the tranche's OWN process, not just end-users.

**Net:** WebGPU primary covers the modern majority; WebGL2 covers the rest of the GPU world (~universal). Together the two GPU backends cover ~all real traffic. The thin slice below them (truly no GPU) is §4.

---

## 4. The no-fallback consequence — what breaks GPU-less, and is it acceptable?

The genuinely GPU-LESS env (no WebGPU AND no WebGL2 — no GPU drivers, forced software, the most locked-down headless) is where "no fallbacks" bites with full force. Three current mechanisms live here:

- **`auroraFallbackGround.ts`** — a one-shot `getContext("2d")` `putImageData` baking the field's STATIC composite into a `data:` URI CSS background (the W-AURORA-SWRASTER certify-grade ground). NOT a render loop — one raster, then parked.
- **The layered `radial-gradient` SSR-degrade stack** — the zero-canvas placeholder for non-aurora surfaces.
- **The software-raster guard** (`isSoftwareWebGLRenderer()` in `renderMode.ts`) — forces SwiftShader/llvmpipe to the CSS ground because a full-viewport software-rastered WebGL2 layer STARVES pointer input and HANGS the page (the proven N.W5 hang; only NOT creating the GL surface cures it).

**What breaks if we delete all three (the literal "no fallbacks" reading):**

- **A no-GPU host renders NOTHING** where aurora/a viz would paint (black/empty box). No crash, but no atmosphere.
- **A software-raster host (SwiftShader CI, blocklisted GPU) gets the page-HANG back** — the WebGL2 surface arms on the CPU rasterizer and starves input. This is a HARD regression, not a cosmetic one.
- **The headless contrast certification dies** — `tests-visual/aurora-swraster.spec.ts` asserts a luminance band against the CPU field-sample; with no ground there is nothing to certify, so the paint-first discipline loses its no-GPU floor.

**Is that acceptable per "no fallbacks"? — DECISION: NO, not as a blanket delete. Re-read the mandate's INTENT.** "No fallbacks" targets the *degraded Canvas2D VIZ* (a janky CPU-rendered animation pretending to be the real thing). A host with no GPU has, by definition, no GPU path — so the honest answer is a SINGLE INERT NON-ANIMATED placeholder, which is categorically NOT a "fallback viz." The policy:

> **GPU-less is OUT OF SUPPORT for the LIVE (animated) viz. It is served ONE inert, non-animated placeholder (a static image / gradient stack), never a degraded Canvas2D animation. That placeholder is a conscious KEEP, not a forbidden fallback — it is the don't-crash-to-black floor + the headless-certify mechanism.**

This satisfies "no fallbacks" (there is no degraded viz, no second animation engine, no quality-tier ladder) while staying "robust" (no black void, no page-hang). The software-raster guard STAYS — it is not a "fallback," it is a SAFETY circuit-breaker preventing a page-hang (a host where the GPU path would hang must not take it).

### The two `getContext("2d")` survivors — categorically distinct from viz substrate

Both are STATIC-RASTER-INTO-A-`data:`-URI bakes, NOT render loops (full analysis: sibling `gpu-substrate-unify.md §4`):

- **`auroraFallbackGround` `getContext("2d")`** — the no-GPU CSS ground. **KEEP** (conscious). A host with no GPU cannot run a GL render-to-texture for a static image; `putImageData` is the cheapest correct raster. It is the certify mechanism.
- **`useGlassRenderer` displacement/specular maps `getContext("2d")` ×2** — glass-DECORATION (the refractive lens texture bake), NOT a viz. **KEEP-and-FLAG** — likely superseded by the `.glass-lens` CSS-gradient squircle already; audit liveness, fold onto the CSS path if dead.

Both go on a NAMED ALLOWLIST in `proof:gpu-only-spine` G2 (sibling §7) with a recorded rationale, so a NEW Canvas2D-in-a-viz reds while these two decided edge cases pass — the anti-evasion seam.

### The literal-zero option (recorded, not recommended)

If the orchestrator insists on a LITERAL zero-`getContext("2d")` repo: re-express `auroraFallbackGround` as a CSS layered-`radial-gradient` stack (option 4b-ii in the sibling). Cost: lower fidelity + the headless-certify spec needs reworking off a non-raster ground. **Recommendation: take the conscious-keep; the CPU field-sample on a no-GPU host is the don't-crash floor, not a viz.**

---

## 5. The clean policy statement (drop-in for the roster + the gate)

1. **Two GPU backends, ONE picker.** WebGPU-first via `useGpuSubstrate`; WebGL2 is the co-equal GPU net (an allowed facility, NOT a fallback). The picker's WebGPU→WebGL2 fall is invisible + byte-equivalent.
2. **ZERO Canvas2D viz substrate.** `useCanvas2D` + `resolveCanvasColor` + the `/canvas` subpath DELETED (0 callers, clean break, no alias). No CPU-raster render loop anywhere in `src/components/custom/*/composables/**` or the shader trees.
3. **GPU-less = out of support for live motion.** Served ONE inert non-animated placeholder (the no-GPU floor), never a degraded Canvas2D viz. No quality-tier ladder, no second animation engine.
4. **Two `getContext("2d")` survivors are STATIC-RASTER bakes, not viz** — on a named gate allowlist with rationale (no-GPU certify ground + glass-decoration texture). A NEW viz `getContext("2d")` reds.
5. **The software-raster guard STAYS** — a safety circuit-breaker (prevents the software-WebGL page-hang), not a fallback.
6. **The three-way de-overload of "fallback" is RECORDED + gate-locked** (§2) so "no fallbacks" cannot be mis-read to rip out the WebGL2 net.

Machine-locked by `proof:gpu-only-spine` (sibling §7 G1-G6); no `proof:ba-gestalt` (a backend delete + policy record changes zero live pixels — every viz already paints GPU).

---

## 6. Summary deltas (for the roster)

- **POLICY: WebGPU-first + WebGL2-net = two GPU backends (allowed), NOT a fallback.** The mandate's `or` is the permission; both are GPU shaders, only Canvas2D is CPU.
- **"No fallbacks" binds the CPU tier** (Canvas2D viz + no-GPU-at-all), NOT the WebGL2 path. Recorded de-overload of the three "fallback" meanings prevents the literal mis-read.
- **GPU-less env: out of support for live motion**, served ONE inert non-animated placeholder. No black void, no page-hang, no degraded Canvas2D animation — the robust + honest answer.
- **Two `getContext("2d")` survivors are static-raster bakes** (no-GPU certify ground + glass-decoration), allowlisted with rationale; the software-raster guard stays as a safety circuit-breaker.
- **Browser reality (June 2026):** WebGPU ~modern-majority, WebGL2 ~universal; together ~all real traffic. Dropping WebGL2 = crash-to-black on the ~5-10% tail + every headless π capture (kills the paint-first discipline). WebGL2-net is structural.
- Wave + gate live in the sibling `gpu-substrate-unify.md` (`BD.W-GPU-ONLY-SPINE` / `proof:gpu-only-spine`); this doc supplies the policy + GPU-less consequence analysis it records (G5).
