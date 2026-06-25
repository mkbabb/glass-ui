# DotMatrix — WAVE-AMENDMENT (reconciled against the extant 116-wave set; no duplicative work)

> References `docs/tranches/BD/greenfield/dot-matrix/GOLDEN.md` as the reference
> implementation (challenge-hardened per `DELTA-ASSAY.md` §3). The engine spine is
> KEEP-byte-for-byte; the felt viz is net-new. **Verdict: REFINE + GROUND-fold, no re-fork.**

## Reconciliation — why this is genuinely NEW, not a dup

- **`union/W-VIZ-BROKEN-FIX.md:217` EXPLICITLY DEFERS this content**: *"the C4 dot-matrix
  gravity/2d-bg (shader-content / separate waves — OUT of scope)."* The directional-gravity
  lens + the 2D-plane register were always slated for a separate wave. There is **no extant
  wave** that owns the warp/ground/vivid content — confirmed by grep across
  `union/waves/` (no `dotmatrix-lens`/`gravity` wave exists).
- `BD.W-DOT-UNIFY` is a SHELL/configurator re-home that **byte-FREEZES the three render
  mechanisms** (its B6 cage-gate fence). The lens warp + `u7` lane must land BEFORE unify
  re-homes the mechanism, so unify inherits the new warp as part of the frozen surface —
  COORDINATE, do not duplicate.
- `BD.W-DOTFLOW-REBUILD` owns dot-flow's `flow`/`field` registers — a sibling mechanism. The
  shared idioms are φ-twinkle + warm-ground + vignette-density (adjacent, no edge); per
  challenge-1 R1 there is **no shared GLSL render-helper** (distinct vertex vs fragment
  stages). ADJACENT, no dup.

---

## NEW wave — `BD.W-DOTMATRIX-LIQUID-LENS` (the headline; author under `union/waves/`)

**Band 13 (per-viz redevelopments) · depends: `BD.W-VIZ-PARITY-METAL` (the Metal×ANGLE LIVE
net the paired-engine clauses read) · coordinates-BEFORE: `BD.W-DOT-UNIFY` (land the warp +
`u7` lane before unify byte-freezes the mechanism) · consumes: `BD.W-PAGE-BACKGROUND` (the
warm ground) · adjacent: `BD.W-DOTFLOW-REBUILD` (φ-twinkle/vignette idioms, no shared leaf)**

**Scope (the UNION path, `DELTA-ASSAY.md` §2/§4):**
1. **ONE `u7` vec4 lane** `(velX, velY, twinkleRate, wakeStrength)` — a SINGLE
   `uniformBridgeWGPU` table edit. Offsets per challenge-2 R4 / challenge-3 R4: insert AFTER
   `u6` (vec4-index 28 / byte off 112), shift spin0→128/spin1→144/spin2→160/ints→176/bg→192/
   pal→208; `DOT_RENDER_UNIFORM_BYTES = 208 + MAX_DOT_STOPS*16 = 272`; `U_OFF` words +4.
   `DotPointerState`+`restingPointer()` gain `velX/velY/accelMag`; `useDotMatrix.onFrame`
   writes them from the **already-computed, currently-discarded** `pointer.velocity`/
   `acceleration` (the dead-lever reclaim — no new rAF, no new measurement);
   `packDotRenderUniforms` packs `u7 = (velX, velY, config.twinkle, push.active)`.
2. **REPLACE `lift = toCursor * well` IN PLACE** (no alias, no dual-path — no-legacy) with the
   anisotropic velocity-warped liquid lens, BOTH twins line-for-line: squash/stretch the
   distance metric along `vdir` (ellipse ∝ `vmag`), an anticipation-LEAD (`LEAD =
   gravRadius/φ²·0.4`), a comet-tail wake streamed BEHIND (`WAKE_GAIN≈12`) + a luminance
   trailing-glow, lens magnify on `sizeTaper` (`LENS_MAGNIFY` over the existing 0.9 swell),
   a chromatic rim that **EXCISES** the L199/L117 `out.tone = clamp(1.0-facing)` in place.
   All constants ladder off √φ, re-anchored at the SHIPPED (lowered) radius (challenge-2 R3).
3. **Re-aim the sphere `else` branch** to the same screen-space directional lens (ONE warp
   idiom, both registers), bounded by `facing` so the silhouette can't tear (challenge-2 R8);
   `proof:viz-dotmatrix` flat-uniform + round-trip bites stay GREEN.
4. **Re-lay the plane lattice viewport-filling + edge-clearing** (`buildDotsBuffer` plane
   branch — a jittered/rectangular phyllotaxis grid replacing the center-dense unit disc) +
   a dot-matrix-LOCAL vertex-stage vignette (`presence`) the lens punches through + the
   φ-twinkle (`TWK`, on-GPU `instance_index` hash, no new buffer). Snippets are LOCAL, NOT a
   cross-viz shared leaf (challenge-1 R1).
5. **The cartoon offset-cast** (challenge-3 R1, PRECEPT-PROMOTED from the GOLDEN's deferred
   stretch-gate): a cheap per-instance darkened +offset lower-α duplicate billboard in the
   SAME instanced draw, keyed off `nearness·pAct`, offset along a √φ light vector — zero new
   pass, zero new buffer.
6. **PRM determinism** (challenge-3 R5): pin `uTime` to a FIXED √φ-rung constant under
   PRM/capture so the warp settle AND the twinkle `sin` are bit-identical across runs.

**The library identity is BYTE-FROZEN** (challenge R2 / presets-in-consumers):
`WARM_IDENTITY_PALETTE` (C:0.03/0.07) + `baseOpacity 0.5` are UNTOUCHED in `src/`. The
`twinkle` field is new (default low); the plane `gravityRadius` lowers toward ~0.34 (a config
value so the warp READS at the shipped radius, not a √φ smuggle).

**Gate `proof:dotmatrix-golden`** (`scripts/proof-dotmatrix-golden.mjs`, `tags:["local"]` —
PAINTED truth, paired-engine via `BD.W-VIZ-PARITY-METAL`, BOTH registers, NEVER reducedMotion
+ the PRM arm). **Every clause born-RED on HEAD — live-verified this session:**

- **G1 — directional ellipse.** Sweep → near-cursor footprint is an ellipse elongated along
  travel, measured AGAINST a static-hold baseline. *Born-RED:* static-hold eccentricity =
  **1.003** (a circle) live; the warp must lift it.
- **G2 — comet-tail (the TRAP-CORRECTED clause).** The velocity-CONDITIONED
  centroid-behind AVERAGE over the high-`vmag` window (mean(centroid-behind)>0 AND
  positive-frame-fraction≥0.8 AND ≈0 at rest) **PLUS** the luminance trailing-glow as the
  PRIMARY witness. *Explicitly NOT* a single-frame or naive swept-eccentricity check — live
  this session a swept symmetric pool read ecc **2.735** / centroid-behind **+0.196** purely
  as sweep-history artifact (the false-pass trap). *Born-RED:* the symmetric pool's
  velocity-conditioned glow asymmetry ≈0.
- **G3 — magnify DELTA over HEAD.** Near-cursor footprint exceeds HEAD's existing
  `0.8+0.9·nearness` swell by ≥ a stated ratio (challenge-1 R5). *Born-RED:* `LENS_MAGNIFY`
  gain absent on HEAD.
- **G4 — read-at-rest on the DEMO page.** `litFrac` over the warm ground ≥ floor. *Born-RED:*
  live `litFrac 0.0191` (near-invisible).
- **G5 — plane vignette (edge>center).** Edge-density > center-density at rest on the
  viewport-filling grid. *Born-RED:* the current center-dense disc is the inverse.
- **G6 — vivid-no-gray + purge.** Mean painted chroma ≥0.045 (lib floor on demo) / ≥0.10
  (vivid preset) AND hue∈[20,90] (re-runs the `proof:teal-navy-purge` cyan bite). *Born-RED:*
  live near-cursor C **0.0406** < floor.
- **G7 — colourful ground present, both modes.** Page-bg behind the canvas is non-flat warm.
  *Born-RED:* live `bodyBg transparent / bodyBgImage none`.
- **G8 — parity** (WGSL/GLSL twins ΔE within bar on the SAME form, incl. the **rim-active
  frame** — OKLab-on-GPU, challenge-2 R1).
- **G9 — PRM** symmetric calm well + frozen twinkle + PINNED uTime + ONE static frame.
- **G10 — lifecycle regression** (offscreen-park + `paused` seam + no-2nd-rAF unchanged).
- **G11 — frame-budget** within X% of HEAD mid-sweep on the WebGL2/Safari fallback
  (challenge-2 R7 — the tripled vertex transcendentals).
- **G12 — cartoon offset-cast lobe** (the promoted precept): a measurable dark offset-lobe
  under the lens. *Born-RED:* the current field is shadowless.

**Self-test bites:** (a) a symmetric `toCursor*well` → G1/G2 RED; (b) a `{h:205}` palette
stop → G6 purge RED; (c) `auroraFallbackGround` blue ground → G7 purge RED; (d) a single-frame
swept-ecc G2 → caught as the TRAP (does NOT certify); (e) baseOpacity 0.5 on the demo →
G4 RED; (f) the center-dense disc → G5 RED.

---

## FOLD (no new wave) — the colourful WARM GROUND → `BD.W-PAGE-BACKGROUND`

The §3 ground is a **small NEW warm-mesh CSS primitive** (~6-line `radial`/`conic-gradient`
stack — the spike's own `#stage` block, sRGB-interp, compositor-only), **NOT
`auroraFallbackGround`** (challenge-2 R2 / R6: that is aurora's static blue-cyan raster — a
`proof:teal-navy-purge` violation behind warm dots). It rides `BD.W-PAGE-BACKGROUND`'s
per-category live-field facility as a demo-chassis ground shared across the §3 flat-page
vizzes; dark mode → deep warm-brown (NOT navy). Demo-only (presets-in-consumers); the library
`background: transparent` default + the purge fence are UNTOUCHED.

**`BD.W-PAGE-BACKGROUND` augment:** add a `substrates → warm-mesh ground` row (or a per-page
`dot-matrix` override) to `CATEGORY_DEFAULT_BG`, and a born-RED clause that the page-bg behind
`/substrates/dot-matrix` paints a non-flat WARM dominant hue both modes (= the lens's G7).

---

## AUGMENT (no new wave) — the demo vivid preset → `demo/stories/substrates/presets.ts`

Confirmed live: `DOT_MATRIX_PRESET_WARM` is just `{...DEFAULT}` (C:0.03, baseOpacity 0.5) — the
demo leads with the gray-warm floor. AUGMENT the demo: a NEW `DOT_MATRIX_PRESET_VIVID` (the
technicolor amber→gold ladder `{L:0.90,C:0.12,h:72}` core / `{L:0.76,C:0.13,h:48}` ember rim +
raised `baseOpacity`/`twinkle`); `dot-matrix.vue` LEADS with it + mounts the warm ground under
`ShowcaseFrame tier="field"`; **correct the stale "dot-SPHERE … on a sphere SURFACE" blurb**
(live-confirmed drift, challenge-3 note) to the plane-default story. This rides the existing
demo-preset pattern — no new wave.

---

## COORDINATE (no edit, an ordering edge) — `BD.W-DOT-UNIFY`

Land `BD.W-DOTMATRIX-LIQUID-LENS` (the `u7` lane + the warp) BEFORE `BD.W-DOT-UNIFY`
byte-freezes the mechanism, so unify's `kind="sphere"`/`kind="plane"` permutation inherits the
directional lens as part of the frozen surface (its B6 cage gate stays GREEN by construction).
Resolve the `<DotMatrix>` name collision THERE, not here. No content overlap.

---

## PRUNE / EXCISE

- **PRUNE:** nothing. No extant wave covers this content (`W-VIZ-BROKEN-FIX:217` deferred it).
- **EXCISE (in the build, no-legacy):** the `lift = toCursor * well` symmetric line (REPLACED
  in place); the L199/L117 `out.tone = clamp(1.0-facing)` (REPLACED by the rim); the
  thrown-away `pointer.velocity`/`acceleration` dead-lever (now CONSUMED).
- **DROP from the GOLDEN (challenge-folded, do NOT build):** the `src/` palette/baseOpacity
  edit (→ demo preset); the cross-viz shared `presence`/`dotTwinkle` GLSL helper (→ local
  snippets); the `auroraFallbackGround` reuse (→ new warm-mesh CSS); the deferred-shadow
  stretch-gate (→ promoted into the headline as G12); the radius-0.30 spike calibration
  (→ re-anchored at the shipped lowered radius); the "off 112 is free" / "sRGB throughout" /
  "already wired a11y" prose (→ corrected per §3).

---

## Ledger row (for `GREENFIELD-HARDENING-PLAN.md §6`)

`A | dot-matrix | R | delta✓ | REFINE+GROUND-fold ~92%` — see the §6 row text below.
