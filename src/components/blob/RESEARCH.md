# GooBlob — SOTA research: the settled axis, the OPEN items, and the decided default identity

**Lane** AY.W-BLOB1 (research-consume) · **Status** EXECUTED 2026-06-09 (consumes the AX 32-facet
synthesis + the `H-research-blob.md` SOTA brief against the real HEAD — NOT a from-zero re-sweep) ·
**Consumes** `docs/tranches/AX/research/blob-synthesis.md` (the settled axis), `docs/tranches/AY/audit/hardening/H-research-blob.md` (the 2025 liquid-glass corpus + the open items) ·
**Downstream consumers** `AY.W-BLOB2` (the default-identity decision + the born-RED `proof:blob-warm-default`
gate + the ≤12 atom ceiling), `AY.W-BLOB3` (the consumer-#2 decision row), `AY.W-DOC1` (the README
content + the doc↔render reconciliation), `AY.W-GOD1` (the ordering dependency) ·
**HEAD** the AY line; the blob present at `src/components/goo-blob/` on the `useWebGLCanvas` substrate.

> Research artefact. Writes no `src/` shader/composable/types code. The decisions + the ranked path +
> the born-RED gate (`proof:blob-warm-default`, `tests-visual/blob-warm-default.spec.ts`,
> `scripts/proof-blob-warm-default.mjs`) below fold into the downstream impl waves. The captured measurement
> ground is cited (the AX synthesis + the AX W46 live captures), the same way the W43 exemplar cites its
> reference plates — that is the measurement ground, not version-history meta on the shipped surface.

---

## 0. The SETTLED axis (consumed from the AX synthesis — NOT re-opened)

The AX 32-facet sweep ALREADY ran (`blob-synthesis.md`) and concluded the blob's GENERATIVE MODEL and
MOTION are at or beyond the public web frontier. This section records what is closed BEFORE the open items,
so a future agent never re-runs the settled question — the structural antidote to the 32-agent re-sweep.

| Settled axis | Verdict (consumed) | Source | Lock |
|---|---|---|---|
| **Metaball / SDF math** | CORRECT & gate-green. IQ-2024 normalized smin (quadratic `k*=4.0` + circular variants), the IQ tetrahedron SDF-gradient normal + dome-Z lift, the POS_SCALE inner-region compression regime, premultiplied-alpha. NOT an algorithm-replacement axis. | `blob-synthesis.md:11,17-29`; `H-research-blob.md:25-29` ("the math IS correct, gate-green") | 12 `proof:blob-*` (smin-normalized, space-gamma, gradient-unit-length, spec-premult, color-equivalence, render, …) |
| **Motion doctrine** | SOTA & PRESERVED unchanged. De-synced multi-sine breath (~6 bpm), critically-damped pointer spring (response 0.18 / ζ 1.0, no overshoot), underdamped symplectic-Euler click impulse, volume-preserving `1/sa` anisotropic squash, the Codrops 15-sphere decaying-radius pseudopod. **The motion is fine; the SURFACE is the gap.** | `H-research-blob.md:93-98` (§1 T5), `:184` (§5 item 5); `blob-synthesis.md:127-134` | `proof:blob-tempo-suppression`, `proof:blob-interaction-prm` |
| **Render-path floor** | WebGL2 single-pass 2D-SDF is the PERMANENT floor. A 2D screen-space field beats raymarching on every axis that matters for a flat UI mark (flat `O(W·H·N)`, no overdraw, no per-fragment step loop, `fwidth`-AA resolution-independence, the "volume" faked by the dome-lifted 2D gradient). | `blob-synthesis.md:85-91`; `H-research-blob.md` (the WebGL2 floor IS correct on this point — `:233`) | §4 (ratified non-goal below) |

**These three are NOT re-researched here.** A sixth tune-pass of the self-lit-overlay lighting layers in
lieu of an architecture change is the chronic-miss trap (`H-research-blob.md:140-147`, CHRONIC across
AT→AU→AV→AW→AX) — the open items below are the architecture/identity gaps, not a re-tune.

---

## 1. The OPEN-item ranked path-forward table (the four items the AX sweep deferred or could not see)

Each row carries `{open item, root cause (file:line), the SOTA/decision source, the downstream impl wave,
the born-RED evidence that proves it closed}`. The born-RED column is the falsifiable target — this is NOT
a vibe list.

| # | OPEN item | Root cause (file:line) | Source | Downstream wave | Born-RED evidence (the falsifiable target) |
|---|---|---|---|---|---|
| **OPEN-1 (KEYSTONE)** | The DEFAULT renders a **dark coffee-bean**, not the "warm-cream living bead" every doc claims. | `types.ts:251` `paletteStops: []` (empty → body falls back to the mounted `color`) + `types.ts:291` `rimColor: "var(--foreground)"`. In light mode `--foreground` AND the demo-mounted `--primary` (`hsl(24 10% 10%)`) are BOTH near-black warm-ink, so a bare default paints a dark body with a near-black rim; the "warm-cream" identity is a thin SPECULAR/rim sheen (the `metaball.frag.ts` `warmCream` OKLCh stop) on a DARK body — it does not make a dark body read cream. | `H-research-blob.md` finding 2 (F2); the captured DELTA `docs/tranches/AX/audit/visual/W46/blob-default-AFTER-calm.png` (a charcoal/brown amorphous mass) vs the COLORED variants (`blob-default-AFTER-mobile.png`, lit beads). The exact headless-green/visually-broken trap MEMORY flags as the AX-halt cause. | **W-BLOB2** | `proof:blob-warm-default` (minted by THIS wave): the resting BODY mean OKLCh-L over the modal-non-background interior reads as a LIGHT bead `L ≥ 0.62`; the AT-HEAD dark default measures WELL BELOW it — the calm reference plate reads body-L `≈ 0.53` (a brown/charcoal body whose mean is lifted by the lit-rim + cream-AA pixels; MEASURED against the committed fixture), and the live near-black `var(--primary)` body reads lower — so the gate exits NON-ZERO at HEAD. |
| **OPEN-2** | The ~50-knob `BlobConfig` carries the aurora "simplify to atoms" sprawl, but NO simplification clause was ever applied to the blob. | `metaball.frag.ts` declares **46 uniforms** (verified `grep -c '^uniform'` = 46); `types.ts` `BlobConfig` ships **~50** tunable fields. The `orbitSpeedScale` / `wobbleScale` "derived-but-unread" smell the AX synthesis flagged (`blob-synthesis.md:54` — re-confirmed below: BOTH now read per `proof:blob-mood-resolved`, but the over-parameterization SURFACE persists). | The aurora "simplify the options set to atoms" HARD GATE (`AY.md` W-AUR2 / the PROMPT-CORPUS mandate) — asymmetric: never applied to the blob despite the identical sprawl. | **W-BLOB2** | A top-level-config-atom-count CEILING `≤ 12` (the numeral set in §2) that the current ~50-field surface FAILS; every derived-but-unread field wired-and-read OR DELETED (no field survives the W-CLOSE1 overfitting audit). |
| **OPEN-3** | The AX-named **consumer #2** (value.js repatriation) never landed — substrate-without-a-second-consumer. | Zero `GooBlob` / `goo-blob` / `metaball` reference across `~/Programming/{slides,speedtest,value.js}/src` (verified: value.js `src/` is `easing/math/parsing/quantize/transform/units/utils` — a color/value lib, NO goo-blob fork present at AY-execution time). The only real consumer is the demo story `demo/stories/substrates/blob.vue`. A full ColorResolver DI seam was built for a value.js fork that never repatriated. | `H-research-blob.md` finding 4 (F4); the AX synthesis item-8 close-criterion (`blob-synthesis.md:79`); the `L invariant 8` substrate-without-consumer bar. | **W-BLOB3** | The §3 decision row STATES which branch fires (recorded for the W-CLOSE1 overfitting audit) — NOT carried forward undecided. |
| **OPEN-4** | The **doc↔render lie**: the README sells "lit warm-cream bead" / "living membrane" while the default renders charcoal. | The component README + the AX W16 note-9 planned→landed sweep over-claim against the live look (`H-research-blob.md` finding 5, `:124-130`). | `H-research-blob.md` finding 5 + finding 2. | **W-DOC1** | The README cites THIS RESEARCH.md + the W-BLOB2 captured DELTA (the cardinal lesson — a captured paired BEFORE/AFTER, no aspirational copy); no "lit warm-cream" claim survives without a paired capture proving it. |

---

## 2. The default-identity DECISION (the headline decision this wave owns) + the atom-count ceiling

### 2.1 The decision — ship a genuinely warm-cream OKLCh default base (RECORDED, resolved)

**DECIDED:** ship a **light warm-cream OKLCh default `paletteStops` ramp** so a bare
`<GooBlob :config="BLOB_CONFIG_DEFAULTS">` paints the cream bead the docs promise. This is the greenfield
**"the SOTA look IS the default"** move — the same edict AX.W15 applied when it flipped `lit: true`. The
doc-correction-only retreat (`H-research-blob.md` F2 option-(b): leave the dark default, soften the docs)
is **explicitly REJECTED** here as the non-greenfield path (MEMORY greenfield-no-meta edict +
no-backwards-compat: a greenfield product has no legacy dark default to preserve).

**The concrete mechanism W-BLOB2 executes** (recorded, not built here):

1. **Promote a light warm-cream default `paletteStops` ramp** replacing the empty `types.ts:251 []`. A
   light OKLCh stop family (the demo's seed-palette analogous ramp promoted to the DEFAULT — e.g. an
   analogous family of warm-cream stops `L ≈ 0.90→0.70`, low chroma `C ≈ 0.03–0.06`, warm hue `h ≈ 70–95°`,
   derived from glass-ui's warm tokens via `deriveBlobPalette('analogous', …)` per `blob-synthesis.md` item-5),
   so the BODY reads cream — NOT the mounted near-black `color` fallback. The DEFAULT must paint cream
   without a consumer passing `color`; `var(--primary)` stays the explicit per-instance OPT-IN (the colored
   showcase variants stay as they are — the user-facing register the docs ALSO promise).
2. **Re-balance the rim/specular DOWN to the thin edge catch-light on top** — the H-research-blob.md §5
   item-4 instruction ("re-balance the lit layers DOWN now that the cream base carries the body read"). The
   lit terms become the thin edge catch-light over the cream body, NOT the whole show (the over-worked five
   layers — `types.ts:283-296` `iridescence:0.09 + sssScale:0.1 + coreGlow:0.06 + specStrength:0.16 +
   rimStrength:0.32` — were cranked precisely because there was no light base under them; with the cream
   base they drop). The dark-mode rim guard stays (chroma-reduce + L-lift the rim stop, not a re-tint).
3. **The rim `rimColor` over a light body** — `var(--foreground)` over a now-LIGHT cream base reads as a
   contrasting warm-DARK edge (the right direction); W-BLOB2 verifies the rim does not over-ring on the
   lighter base (the `rimStrength` may soften further).

The binding success measure W-BLOB2 turns GREEN: the `proof:blob-warm-default` gate (minted below) reads the
resting body mean OKLCh-L `≥ 0.62` over a transparent backdrop — a warm-cream body, not the dark-body
default measured at HEAD (the calm reference plate reads body-L `≈ 0.53`; the live near-black `var(--primary)`
body lower). A genuine cream OKLCh L≈0.85 stop family clears the 0.62 floor comfortably.

### 2.2 The atom-count CEILING — top-level `BlobConfig` reduces to ≤ 12 atoms

**DECIDED numeral: `≤ 12` top-level config atoms** (mirroring the aurora seed/harmony/mood/medium/zones/motion
atom set). The current ~50-field `BlobConfig` FAILS this. W-BLOB2 reduces the surface to a small atom set —
the candidate atoms (W-BLOB2 ratifies the exact partition):

- `seed` · `color` · `paletteStops` (or a `harmony` atom that derives them) · `mood` · `quality` · `tempo`
- one `geometry` atom (the body/orbit/satellite/smin cohort — re-derived atomically per W15, NOT five
  separately-tunable lengths a consumer can re-flood) · one `surface`/`lit` atom (the bundled lighting
  weights) · one `motion`/`membrane` atom (noise/warp/pulse) · `pointer`/`interaction` atom · `refraction`
  (the §4 candidate axis, default-low) · `dispersion` (default whisper-low)

**Every derived-but-unread field is WIRED-AND-READ or DELETED** — no derived-but-unread field survives the
W-CLOSE1 overfitting audit. (At HEAD `orbitSpeedScale`/`wobbleScale` are read per `proof:blob-mood-resolved`;
the over-parameterization is the FLAT SURFACE — ~50 sibling knobs where the aurora ships ~6 atoms. The
ceiling collapses the flat surface to atoms; the bundle fields move BEHIND each atom, J §6.3 "the variant IS
the bundle".) This is the "default-identity decision recorded" the seed's hard gate names.

---

## 3. The consumer-#2 DECISION ROW (which branch W-BLOB3 fires)

The two branches and the recorded decision:

- **(a) BIND consumer #2** — value.js DELETES its local goo-blob fork and consumes
  `@mkbabb/glass-ui/goo-blob` through the existing ColorResolver seam (the seam was designed for exactly
  this), OR a speedtest/real-slides surface adopts the hero.
- **(b) FORMALLY BOOK demo-only** — the blob is recorded as a demo-only showcase primitive retained with
  rationale, and the speculative DI ceremony (the loud-throw + the inject DI built for the absent value.js
  fork) is STRIPPED to the demo's actual one-resolver need.

**RECORDED DECISION → branch (b): FORMALLY BOOK demo-only + STRIP the speculative DI.**

The decision condition (recorded per the seed's default recommendation): *branch (a) if value.js still ships
a local goo-blob fork at AY-execution time; else branch (b) with the DI strip.* **Verified at this wave's
authoring time:** value.js carries **NO** goo-blob fork — `~/Programming/value.js/src` is
`easing/math/parsing/quantize/transform/units/utils` (a color/value lib), and a recursive grep for
`goo-blob` / `GooBlob` / `metaball` across `~/Programming/{slides,speedtest,value.js}/src` returns **zero**.
The fork the AX seam anticipated does not exist and is not arriving — so the condition resolves to branch
(b). The speculative seam does not outlive a one-consumer reality (`L invariant 8`).

**The branch is STATED, not carried forward undecided** (the H-blob.md F4 / `L invariant 8` bar). If the
value.js tree is somehow re-checked at W-BLOB3 and a goo-blob fork HAS appeared since (unlikely), branch (a)
fires instead — W-BLOB3 re-verifies against the live tree before stripping (the named-successor
conditional). W-BLOB3 executes the strip; the DI removal is recorded for the W-CLOSE1 overfitting audit.

---

## 4. The WebGPU + particle-swarm NON-GOAL ratification (consume the AX verdict) + the `uBackdrop` candidate

### 4.1 The non-goals (transcribed from `blob-synthesis.md:85-93`)

**WebGL2 single-pass 2D-SDF is the permanent floor. WebGPU is NOT warranted. Particle-swarm is NOT
warranted. Both are explicit, research-backed NON-GOALS** — recorded so a future agent never re-opens the
settled raymarch/WebGPU question (the H-blob.md convergence criterion 6).

- **WebGPU compute is a net LOSS at ≤4 nuclei.** Compute beats a fragment field only for
  hundreds-to-thousands of balls (the `O(balls × pixels)` accumulation bottleneck) OR 3D marching-cubes
  mesh extraction. This blob is body + ≤3 satellites + ≤15 trail + ≤4 stops, CPU-simulated, uploaded as
  ~12 uniforms — a compute pre-pass adds a buffer round-trip + a sync barrier with ZERO field-eval savings.
- **A decorative background cannot carry a hard WebGPU dependency** (Baseline-2026 "newly available",
  ~70–95% coverage).
- **IF ever adopted, WebGPU is a SUBSTRATE-WIDE decision** (Aurora's WGSL path), NEVER blob-local. The
  lifecycle core (`createCanvasLifecycle`) is backend-agnostic, so the park gate + quiescence predicate
  carry over for free; the premultiplied `alphaMode:'premultiplied'` math is identical; satellites would
  pack as `array<vec4f, N>` in `var<storage, read>` (the Aurora pattern), never `var<uniform>` (the W07
  Metal dynamic-index-returns-zero lesson).

### 4.2 The ONE place the floor EXTENDS (NOT re-opens) — `uBackdrop` refraction under the WebGL2 floor

`H-research-blob.md` §1 T1/T4 names the deeper 2025 liquid-glass move: the current blob is a **self-lit
premultiplied-alpha OVERLAY** (`metaball.frag.ts:497` `fragColor = vec4(rgb*alpha, alpha)` over the blob's
OWN color; the shader samples NOTHING behind it), so it reads as a lit OPAQUE droplet — the WWDC-2015 "goo",
not the WWDC-2025 "liquid glass" that bends/lenses the backdrop through itself. The 2025 refraction read is
ARCHITECTURALLY absent, not mis-tuned.

**The glass-ui escape — recorded as a W-BLOB2/W-BLOB3 CANDIDATE technique UNDER the existing WebGL2 floor,
explicitly NOT a WebGPU re-open and NOT a DOM-sampling path:** the blob samples a **backdrop texture
glass-ui itself produces** — a `uBackdrop` sampler over an Aurora FBO or a CSS-gradient baked to a texture.
This makes TRUE Snell refraction (displacement off the dome-bevel normal the shader ALREADY computes
analytically) + low chromatic dispersion feasible as a **portable WebGL2 primitive** with no DOM-sampling
API. html2canvas / the Chrome HTML-in-Canvas origin trial are non-portable / research-rejected
(`H-research-blob.md:84-90`). The candidate dovetails with the AY aurora waves: "blob over the aurora" is
the canonical backdrop-refraction hero composition. Two related notes for the downstream:

- **The dome-Z is the spherical-circle profile, not Apple's convex squircle** (`metaball.frag.ts:273`
  `z = sqrt(1 - (1-interior)²)`). Apple's preferred liquid-glass bevel is `⁴√(1-(1-x)⁴)` (softer
  flat-to-curve, kube.io) — the right family, the wrong curve; it should rhyme with the library's own
  squircle identity (AX.W56). A W-BLOB2/W-BLOB3 candidate switch.
- **`AY.W-GOD1` ordering dependency:** `useMetaballRenderer.ts` is **694 LOC** (verified `wc -l = 694`,
  over the 500 floor) — a still-live god-module + W-GOD1's named carve target. Any blob impl wave that ADDS
  a `uBackdrop` sampling pass MUST land on the post-carve module, so **W-GOD1 runs WITH/AFTER the blob
  content waves**, re-gated on `proof:blob-render` + `proof:blob-color-equivalence` byte-identity. RECORDED;
  W-BLOB1 does NOT carve.

This §4.2 is the one extension; it does NOT re-open the WebGL2/WebGPU floor (which §4.1 ratifies as
permanent) — refraction is a portable WebGL2 sampler pass, not a WebGPU compute path.

---

## 5. The born-RED gate harness (the reproducibility leg — what makes this a real gate, not prose)

This wave SHIPS the harness born-RED: it FAILS at HEAD on the dark default. W-BLOB2 turns it GREEN by
shipping the warm-cream default base (§2.1). The three pieces:

| Piece | File | Role |
|---|---|---|
| The π workspace spec | `tests-visual/blob-warm-default.spec.ts` | Mounts the REAL `<GooBlob>` with `BLOB_CONFIG_DEFAULTS` (the first/default instance on the `/substrates/blob` route, resolved via `PI_TARGETS.blob`), reads back the painted pixels via `locator.screenshot()` + pngjs (the `blob-render.spec.ts` modal-bg + interior-inset precedent — NOT `getImageData`, which reads empty without `preserveDrawingBuffer`), and ASSERTS the resting BODY mean OKLCh-L `≥ 0.62` (a warm-cream body), born-RED — the AT-HEAD dark default measures well below the floor (the calm reference plate body-L `≈ 0.53`, MEASURED; the live near-black `var(--primary)` body lower). |
| The gate driver | `scripts/proof-blob-warm-default.mjs` | The `proof-blob-render.mjs` fail-closed pattern: invokes the spec via the workspace Playwright runner, parses the JSON report, emits a byte-stable gate artefact via `gate-output.mjs`. Workspace-PRESENT + render-broken/dark → exit 1; genuine device-absence on a zero-dep runner → befitting SKIP exit 0. |
| The invocation | `package.json` `proof:blob-warm-default` | `node scripts/proof-blob-warm-default.mjs` — the runnable the HARD GATE reads. |
| The BEFORE plate | `tests-visual/fixtures/blob-default-charcoal-HEAD.png` | The committed AT-HEAD dark-default plate (the cardinal DELTA's BEFORE half) for the W-BLOB2 AFTER comparison; a fixture under `tests-visual/fixtures/`, NEVER imported into `src/` or shipped in `dist/`. |

The harness is consumer-#1; W-BLOB2's GREEN run is consumer-#2 — clears the ≥2-consumer bar for the harness
leaf (it is a build/test leaf, not a published `/goo-blob` metric export — the ≥2-consumer substrate bar
does not apply to a CI harness).

**OKLCh-L computation (recorded for the spec):** tests-visual ships only `@playwright/test` + `pngjs` (no
culori). The spec computes L inline from the sampled sRGB: sRGB → linear (the standard `≤0.04045 ? /12.92 :
((c+0.055)/1.055)^2.4` OETF inverse) → the Björn Ottosson linear-sRGB→OKLab `M1`/`M2` matrices + the cube-root
nonlinearity (the SAME path `src/composables/glass/webgl/shaders/procedural-color.glsl.ts` uses in-shader), L
= the OKLab L channel. The body region is the modal-non-background interior (the `blob-render.spec.ts` modal-bg
+ interior-inset readback), so the cream field does not dilute the body-L estimate.

### 5.1 FLAGGED for the orchestrator / W-BLOB2 — the pre-existing stale π-route (NOT this wave's fix)

At HEAD the demo blob story id is `substrates/blob` (route `/substrates/blob`,
`demo/stories/manifest.ts:139`), but `tests-visual/pi-manifest.ts:75` resolves `PI_TARGETS.blob` as
`resolveScene("substrates", "goo-blob")` — a STALE route (the story was renamed `goo-blob` → `blob` and
pi-manifest never tracked it). This breaks ALL five π-workspace blob gates at HEAD (`proof:blob-render`,
`proof:blob-mood-resolved`, `proof:blob-interaction-prm`, `proof:blob-live-truth`, `proof:blob-integration`
all exit non-zero with `scene substrates/goo-blob not found`). This wave's `blob-warm-default.spec.ts` reads
the route via the SAME `PI_TARGETS.blob` resolver (the pi-manifest anti-drift discipline — it does NOT
hard-code a route), so when the stale resolution is fixed (one line: `resolveScene("substrates", "blob")` +
the `blob-mood.vue`/`blob.vue` story-id reconciliation in `proof:blob-mood-resolved`), this gate tracks it
automatically. The fix is OUT OF THIS WAVE's edit-site scope (pi-manifest is shared infra owned elsewhere);
it is FLAGGED here so the orchestrator/W-BLOB2 lands it — the born-RED truth (the dark-body L well below the
0.62 floor) is read on the workspace once the route resolves, and the gate is born-RED either way (currently
for the stale-route reason, after the route fix for the dark-body-L reason — both exit non-zero at HEAD).
The body-L readback math itself is VALIDATED at this wave's authoring: run against the committed BEFORE plate
fixture, the modal-bg + interior-inset isolation reads the cream field at L≈0.98 and the brown/charcoal body
at L≈0.53 (21k body pixels cleanly separated) — so the harness CAN separate a charcoal body from a cream one
(the named-successor diagnostic-loop trigger does not fire; the readback is sound).

---

## 6. The one-screen extract (for W-BLOB2 + W-DOC1)

1. **Settled (do NOT re-open):** metaball/SDF math (gate-green) + the motion doctrine (SOTA, preserved) +
   the WebGL2 single-pass 2D-SDF floor. 12 `proof:blob-*` lock them.
2. **OPEN-1 (keystone):** the dark coffee-bean default (`types.ts:251 []` + `:291 var(--foreground)`) →
   **ship a light warm-cream OKLCh default `paletteStops` base** (the greenfield SOTA-is-the-default move,
   NOT a doc retreat); lit terms re-balanced DOWN to the thin edge catch-light. Born-RED: `proof:blob-warm-default`
   (body L ≥ 0.62; HEAD measures well below — the calm plate body-L ≈ 0.53, the live near-black body lower).
3. **OPEN-2:** the ~50-knob `BlobConfig` → **≤ 12 atoms** (the aurora atom-set mirror); no derived-but-unread
   field survives W-CLOSE1.
4. **OPEN-3:** consumer #2 → **branch (b): book demo-only + STRIP the speculative DI** (value.js carries no
   goo-blob fork — verified zero across slides/speedtest/value.js `src/`).
5. **OPEN-4:** the doc↔render lie → **W-DOC1** cites this RESEARCH.md + the W-BLOB2 captured DELTA, no
   aspirational copy.
6. **Non-goals:** WebGPU + particle-swarm (research-backed permanent non-goals). The ONE extension under the
   WebGL2 floor: a `uBackdrop` Snell-refraction sampler over a glass-ui-rendered backdrop (aurora FBO /
   baked gradient) — a portable WebGL2 candidate for W-BLOB2/W-BLOB3, NOT a WebGPU re-open, NOT a DOM-sample.
7. **Ordering:** `useMetaballRenderer.ts` = 694 LOC → W-GOD1 carves WITH/AFTER the blob content waves
   (byte-identity re-gate).

---

## Sources

- `docs/tranches/AX/research/blob-synthesis.md` — the AX 32-facet synthesis (the settled axis §0 consumes; §4 non-goal verbatim from `:85-93`).
- `docs/tranches/AY/audit/hardening/H-research-blob.md` — the 2025 liquid-glass SOTA brief (the OPEN items, the refraction architecture, the convergence criteria).
- `docs/tranches/AX/audit/visual/W46/blob-default-AFTER-calm.png` — the captured AT-HEAD dark coffee-bean default (the cardinal DELTA's BEFORE half; copied to `tests-visual/fixtures/blob-default-charcoal-HEAD.png`).
- `docs/tranches/AX/audit/visual/W46-goo-blob-desktop-{light,dark}.png` — the four-blob default capture (the colored variants read as lit beads; the default dark one does not).
- Live verification (the cardinal lesson): value.js fork-absence (`~/Programming/value.js/src` enumerated, zero goo-blob reference across slides/speedtest/value.js); the 46-uniform / 694-LOC / `types.ts:251,291` source facts (read at HEAD).
- Liquid-glass corpus (via H-research-blob.md): kube.io (bevel/squircle refraction), Maxime Heckel (dispersion), aave.com (glass-for-web), Geeks3D (chromatic aberration GLSL).
