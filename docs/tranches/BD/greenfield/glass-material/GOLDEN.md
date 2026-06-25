# GLASS MATERIAL — the GOLDEN reference (canonical spec)

> The 7-tier ladder · the six-layer optical composite · the BA.W-NO-GRAY warm floor ·
> the transmissive read · the §3 colorful-field-behind + defined-edge requirement.
> Synthesized from lens-a (iOS-27 fidelity) · lens-b (cross-engine/perf) · lens-c
> (cartoon-technicolor punch), reconciled into ONE coherent, deftly-integrable design.
> **Tranche-dev only. A UNION with the landed gray-glass triumvirate — no fork, no legacy.**

---

## 0 — THE ONE TRUTH ALL THREE LENSES MEASURED (live, both modes, 2026-06-24)

The refine triumvirate (`BD.W-GLASS-ABROGATE-GRAY`) **is landed in HEAD**, and all three
lenses independently re-measured the same thing: **the plate is now warm, and the surface
still reads gray.** The smoking gun, byte-identical across the three captures:

| measured surface (`/forms/select`, light) | live | OKLab | verdict |
|---|---|---|---|
| `--card` source token | `hsl(30 85% 96%)` | L 0.974 · **C 0.0148** · H 67.7 | leg (a) WARM — landed |
| the page it sits on (`--neutral-0`) | `rgb(251,250,248)` | L 0.985 · **C 0.0029** · H **84.6** | flat, near-achromatic, yellow-green |
| Select trigger composite (0.5α over page) | — | **C ≈ 0.009 · H 65** | dragged BELOW the floor by the cool page |
| `/foundations/intro` field count | — | **0 fields, 24 glass** | NO colorful field behind ANY glass |

**The diagnosis is unanimous and binding.** The §3 root-cause is a THREE-leg fix. The
triumvirate landed leg (a) — *warm the glass* — correctly and completely. Legs (b) and (c)
were named "load-bearing, mandatory" and then HELD. That hold is why the surface still reads
gray:

- **(a) WARM the plate** — DONE. `--card`, `--glass-saturate-*`, the dark arm. **Frozen, byte-untouched. This is leg (a). The golden re-touches ZERO chroma tokens.**
- **(b) a COLORFUL FIELD behind every glass surface** — **MISSING.** A transmissive lens has nothing to transmit over a flat page. *A warm plate over a flat cool page composites to gray.*
- **(c) a DEFINED-EDGE floor** — **MISSING.** The trigger paints `box-shadow:none` + a 5%-α ink border that vanishes cream-on-cream. A glass control with no edge dissolves into its host.

> **The core idea, shared by all three lenses, stated once:** *glass is a RELATIONSHIP, not a
> color.* You cannot warm a lens — you warm what it looks at, and you give it an edge so it
> reads as a shape. The golden makes the relationship STRUCTURAL: no glass without a field, no
> glass without an edge — enforced by construction and gate-locked, the way the six-layer recipe
> already makes a flat plate impossible.

---

## 1 — THE GOLDEN SYNTHESIS — strongest move from each lens, reconciled

| leg | the move | from | why it wins |
|---|---|---|---|
| **(a) LENS** | the warm `--card` / `--glass-saturate-*` / dark-arm tokens, **byte-untouched** | all three (union discipline) | landed, correct, gate-green. Re-forking it is the sin all three forbid. |
| **(b) FIELD** | **`paper-field`** — a mandatory, compositor-cheap, PRM-static, warm chroma plenum behind every glass demo, decoupled from `--neutral-0` | **lens-b** (the decoupling insight) + lens-a (`<GlassStage>` chassis) + lens-c (two-tier page-warm) | resolves the held-keystone fear: the field is a SEPARATE fixed layer, not the `--neutral-0` token. Solid chrome stays calm-neutral; glass transmits a warm field. Both truths hold — they were conflated into one token. |
| **(c) EDGE** | **`--glass-key`** — ONE key-light vector driving BOTH a directional conic rim AND a coherent warm cast, in lockstep, on every tier | **lens-c** (the cel keystone — the single boldest move in the set) | a flat rim + an independent drop-shadow is iOS-7 sticker. A rim and a cast that AGREE on one light source is a 1940s cel — the brain reads a real lit object lifted off a painted field. Delivers leg (c) AND the iOS-26 angle-varying rim SOTA in ONE device, on the EXISTING six layers (zero new layer). |
| **transmit** | **generalize the ambient-hue sample past the dock** — `useGlassBackdropLuminance` grows a dominant-hue term feeding the bounded `--glass-ambient-hue`/`-strength` over the field | **lens-a** (T7 generalization) | the field gives the plate something to bend; the hue sample lifts the plate TOWARD the field hue — the Maps-card transmission becomes real, not latent. |

**The reconciliation of the cross-lens tensions:**

- **audacity (lens-c) vs correctness/perf (lens-b):** the `--glass-key` cel is audacious, but it
  rides EXISTING layers (rim/catch-light/cast) and is pure CSS (`conic-gradient` border + `box-shadow`
  + `mask-composite`) — Chrome AND Safari native, no `backdrop-filter:url`, no SVG. Audacity and
  cross-engine correctness are not in tension here; the cel is cheap.
- **the field: aurora (loud) vs calm (lens-b/c):** resolved as lens-b/c argue — `.paper-field` is the
  CHEAP CSS universal floor (0-JS, one paint, PRM-static); `<Aurora>` stays the one-GL-per-route
  opt-in for routes that want the full living mesh. The field is calm-but-chromatic by default
  (warm-amber → terracotta → sand), never a garish aurora.
- **the page-warm token edit (lens-c F1) vs the KEEP-NEUTRAL hold (lens-b):** **resolved in lens-b's
  favour — do NOT edit `--neutral-0`.** The field is a decoupled fixed layer; the page token stays
  the KEEP-NEUTRAL solid floor + the PRM-reduce escape. This is strictly DRY-er than warming the page
  token (which lens-a/b both warn re-opens the held byte-assert and the luminance register). The field
  delivers the warmth lens-c wanted from F1, without touching the token.

---

## 2 — THE MATERIAL: the CEL composite (visual · the six layers, re-ratified)

The seven tiers and the six layers stay the vocabulary — byte-untouched alpha/radius/tint ladders.
The golden makes every layer finally do its job by adding the field + the keyed edge:

| # | layer | HEAD state | golden |
|---|---|---|---|
| 1 | backdrop blur + saturate | `blur(10–13) saturate(1.4–1.6)` — landed | KEEP. Over `.paper-field` the saturate finally has chroma to concentrate (it was inert over a flat page). |
| 2 | surface tint (warm fill) | `--card` warmed — landed | KEEP. The intrinsic floor. |
| 3 | **edge rim** | flat `--glass-rim-top: inset 0 1px 0 #fff/0.30` (omnidirectional) | **REFINE → directional, keyed off `--glass-key`** (§4). The defined-edge floor + the iOS-26 angle-varying specular in one. |
| 4 | inner catch-light | `::before` specular, pointer-tracked | KEEP; the catch concentrates toward `--glass-key` (one light source). |
| 5 | **drop shadow** | per-tier `--glass-shadow-*` | **RE-BASE on `--glass-key`** (§4) — offset opposite the key, warm-tinted (never neutral-gray: no-gray, one layer down). The loud register via the shipped `.shadow-cartoon-*`. |
| 6 | grain | `--glass-grain 2.5%` / paper 8% | KEEP (paper-morphism visible — the `paper-underpaint`/`paper-grain-overlay` utilities layer ON TOP of the field). |
| **0** | **FIELD (the backdrop the blur bends)** | **absent — flat page** | **`.paper-field` (§3)** — the new layer-0 the six-layer composite was always meant to sit on. Glass without a field is paper with a rim. |

### The 7-tier ladder, re-read as a transmission ladder (lens-b)

| tier | field-through | edge (keyed) | role |
|---|---|---|---|
| wash | maximum | thin lit rim, no cast | permeable veil — the field IS the surface |
| quiet | high | lit rim + faint lift | recessive chrome, field-tinted |
| resting | moderate (canonical plate) | rim + `--glass-shadow-resting` cast | the default warm-cream-over-field card |
| floating | moderate, `saturate 1.6` amplifies | rim + floating cast | dropdown/popover — the literal defect surface, now warm |
| overlay | lower | rim + heavy cast + scrim | dialog / action sheet |
| dock | blur floor — backdrop motion reads through | rim + dock cast | translucent chrome over the field's motion |
| chassis | engraved bezel | inset rim | instrument substrate |

The alpha ladder is **byte-untouched.** No new tier. The rim/cast intensity scales with each tier's
existing `--glass-level` so monotone tier-separation holds (wash = a whisper, dock/overlay = a bold
lit edge + a deep cast).

---

## 3 — LEG (b): `paper-field` — the mandatory warm chroma plenum (the boldest structural move)

A new `@utility paper-field` (sibling to `paper-underpaint`, in `src/styles/paper.css`) +
mounted by the demo chassis (`AppShell.vue` / the storybook page wrapper) so **every glass demo
has a field by construction.** A `.glass-*` surface painting over a flat backdrop becomes
impossible, exactly as the six-layer recipe makes a flat plate impossible.

```css
@property --field-drift { syntax: "<angle>"; inherits: false; initial-value: 0deg; }

@utility paper-field {
  position: fixed; inset: 0; z-index: -1; pointer-events: none;
  /* warm-cream chroma plenum — three drifting warm stops over the KEEP-NEUTRAL floor.
     Chroma lives at the FIELD lightness (L 0.93 light / 0.30 dark), where the gamut
     allows real chroma — NOT the gamut-bound L 0.98 plate. The glass transmits THIS. */
  background:
    radial-gradient(90% 70% at 25% 20%, var(--field-a), transparent 65%),
    radial-gradient(85% 65% at 78% 30%, var(--field-b), transparent 60%),
    radial-gradient(80% 70% at 55% 85%, var(--field-c), transparent 65%),
    var(--neutral-0);                 /* the KEEP-NEUTRAL floor, untouched, under the warm stops */
}
/* compositor-only drift: a ::before carries the gradient + a slow transform — bg never re-paints */
.paper-field::before {
  content: ""; position: absolute; inset: -25%; background: inherit; opacity: 0.7;
  animation: field-drift 38s ease-in-out infinite alternate;
}
@keyframes field-drift {
  from { transform: translate3d(0,0,0) scale(1); }
  to   { transform: translate3d(2%, -2%, 0) scale(1.06) rotate(3deg); }   /* liquid-weight, eased not linear */
}
@media (prefers-reduced-motion: reduce) { .paper-field::before { animation: none; } }  /* warm stays, drift stops */
```

The `--field-a/b/c` derive from the route's **section-accent** (presets-in-consumers: the consumer
sets ONE accent hue; the field derives an analogous warm triad). The DEFAULT (no accent) is the calm
warm-amber → terracotta → sand drift the spike verified.

**The spike-calibrated values** (live-verified, §7) — the field stops carry real chroma at field-L:

```css
:root {
  --field-a: oklch(0.93 0.075 70 / 0.7);   /* warm amber, dense core */
  --field-b: oklch(0.91 0.085 42 / 0.6);   /* terracotta */
  --field-c: oklch(0.95 0.06  95 / 0.55);  /* sand */
}
.dark {
  --field-a: oklch(0.34 0.07 58 / 0.75);   /* warm-dark glow, NOT charcoal */
  --field-b: oklch(0.30 0.075 38 / 0.65);
  --field-c: oklch(0.28 0.05  80 / 0.6);
}
```

**Why this is the gestalt fix, not a workaround:**
- It builds the proven §3 leg (b) the triumvirate named mandatory and did not implement — the literal
  cause of the live gray read.
- It makes the transmissive material (§5) READ — the ambient-hue sample has nothing to sample over a
  flat page; over the field it lifts the plate toward the field hue.
- It is DEFT/DRY/no-fork — it composes `paper-underpaint`'s idiom + the `auroraFallbackGround`
  static-mesh precedent + `--neutral-0` (decoupled, never deleted). One new utility, 0 JS, both engines.
- It is a DEMO-CHASSIS contract (band-C scope), not a library-API burden. The library glass primitives
  are UNCHANGED — they finally have a backdrop worthy of them.

---

## 4 — LEG (c): `--glass-key` — ONE key-light vector → directional rim + coherent cast

The single new token, the cel keystone. It threads the EXISTING rim/catch-light/cast tokens (zero new
compositing path) so the rim and the cast share ONE light source — the cel coherence that reads as a
lit object, not an iOS-7 sticker.

```css
:root { --glass-key: -58deg; }   /* the cartoon cel light, top-left (design.md §Shadows) */
```

### (A) the directional conic RIM-LIGHT (refine `--glass-material-rim`, `rim.css`)

The HEAD rim is `inset 0 1px 0 hsl(0 0% 100% / 0.30)` — a flat omnidirectional halo. The golden makes
it a `conic-gradient` border keyed off `--glass-key`: brightest (white/0.55–0.6) on the edge facing
the key, fading to the warm under-shadow on the opposite edge. The accent (BB.W-GLASS-ACCENT) still
mixes onto the lit-edge ink (`color-mix(in oklab, …, var(--glass-accent) var(--glass-accent-strength))`)
so the chromatic rim composes byte-identically at 0% strength. Painted via the proven
`mask-composite: exclude` border-ring idiom (Chrome + Safari native — spike-verified):

```css
.glass-material::before {           /* the rim ring (composes the EXISTING ::before specular slot) */
  padding: 1.5px;
  background: conic-gradient(from calc(var(--glass-key) + 90deg),
    var(--glass-rim-lit) 0deg, var(--glass-rim-shade) 140deg,
    var(--glass-rim-shade) 220deg, var(--glass-rim-lit) 360deg);
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: exclude;          /* -webkit-mask-composite: xor for the WebKit arm */
}
/* --glass-rim-lit: hsl(0 0% 100% / 0.6) light / 0.4 dark; --glass-rim-shade: foreground 10%α */
```

Per-tier intensity scales with `--glass-level` (wash = a faint lit edge, overlay/dock = a bold catch).
**This is the §3.c defined-edge floor AND the iOS-26 angle-varying specular in one device** — the
control's edge POPS because it is a *lit* edge, not a flat ring.

### (B) the coherent warm CAST (re-base `--glass-shadow-*`, offset opposite the key)

The cast offsets opposite `--glass-key` (down-right), warm-tinted (`color-mix(in oklab, var(--foreground)
22%, transparent)` — NEVER neutral-gray):

```css
box-shadow:
  calc(cos(var(--glass-key)) * -14px) calc(sin(var(--glass-key)) * 14px) 28px -6px var(--glass-cast),
  0 2px 8px -2px var(--glass-cast);
```

The default glass surface keeps the calm six-layer cast; the LOUD surfaces (hero, dock, dialog) opt
into the bold layered-offset register via the shipped `.shadow-cartoon-{sm,md,lg}` / `<Card
surface="cartoon">` (design.md §Shadows). **Rim + cast agreeing on one key = a 1940s cel.**

### The defined-edge floor (the structural insurance)

Over the §3 field, the control's edge is trivially defined (the field provides contrast). The keyed
rim is the **flat-page + reduce-transparency insurance**: even when host and control collapse to the
same tier or transparency is off, the lit rim + warm cast cut the shape. A control on a `resting` card
reads `quiet`-over-`resting` (the existing `--control-surface-bg: var(--glass-bg-quiet)` tier delta);
the keyed rim guarantees the cut even when the tiers collapse. **No new control component, no fork.**

---

## 5 — THE TRANSMISSIVE READ: generalize the ambient-hue sample past the dock

The mechanism 90% ships: `--glass-ambient-hue`/`--glass-ambient-strength` are registered
(`@property`, neutral identity `transparent`/`0%`), and `useGlassBackdropLuminance` samples the
backdrop — but **luminance ONLY; the hue term is wired only on the dock (via `useBloomUp`).** The
golden generalizes the dominant-hue sample to every glass tier over `.paper-field`, BOUNDED:

| axis | target | mechanism (extant, generalized) |
|---|---|---|
| transmissive ΔC over field | composited C ≥ **0.018** (field-hue bleeds through) | `--glass-ambient-hue` at `--glass-ambient-strength` ≤ 8% (sub-perceptual under the W55 `--glass-tint-strength-aa` bound), fed by `useGlassBackdropLuminance`'s NEW dominant-hue term |
| transmissive ΔH | the plate hue rotates ≤ 12° toward the field's dominant hue | the bounded `in oklab` ambient mix — a HUE event, never the field's full saturation |
| the read | the field is VISIBLE through the plate, tinted warm — the Maps-card read | `blur(10–13) saturate(1.4–1.6)` concentrate it |

`useGlassBackdropLuminance` already does the `elementsFromPoint` stack-walk + `resolveTokenColor`
un-wrap + WCAG luminance; the golden adds a `srgbToOKLab → rawOklabToOklch` dominant-hue read off the
SAME sampled background (the composable already imports `@mkbabb/value.js`), written to
`--glass-ambient-hue` at a bounded strength. **rAF ≤ 4Hz, IntersectionObserver-gated, PRM → single
mount sample — the existing budget, untouched.** Over a gray backdrop it writes `transparent` (no-op).

---

## 6 — DARK MODE · MOTION · A11Y · CROSS-ENGINE

### Dark (the "too gray/dark" half) — luminous-warm that GLOWS, not charcoal
The SAME contract: a warm-dark `.paper-field` (L 0.28–0.34, C 0.05–0.075 warm) behind the warm-dark
plate (`--card` C 0.0216, landed). The dark plate transmits a *glowing* field, not a dead void. The
dark rim catch is the lifted `hsl(0 0% 100% / 0.4)` (dark needs a brighter rim — the W-DARK-MATERIAL
silhouette device, already in `dark-arm.css`). The `saturate(1.28) brightness(1.1)` dark companions
amplify the warm field through the plate. **Spike-verified: dark reads warm-luminous, never charcoal.**

### Motion (liquid-weight universal — verify, mint nothing)
- The field DRIFTS with weight (38s `ease-in-out` alternate, NOT a linear loop — the liquid-weight law
  on the backdrop too). Compositor-only `transform` on a `::before`.
- The cel comes ALIVE on motion: the FIXED key + MOVING objects = cartoon flow & punch for free. Every
  spring/drag/press/morph slides its lit edge and throws its cast against the fixed light —
  anticipation, overlapping action, follow-through, arcs, weight fall out (the shipped `.glass-reveal`
  + `useLiquidFlex` squish + `--scale-press`, AUGMENTED toward ≈0.88 vol-preserving + `--ease-cartoon-punch`
  on the LOUD register; the calm default rides `--spring-snappy`). The ambient hue rides the existing
  `--glass-tint-strength` transition (a spring, never a hard swap).
- The MORPH-MORE-ON-MOVE law: the rim catch smears along the lit edge with pointer velocity (compose
  `usePointerVelocityField`, shipping). NO snapping, NO linear fade, NO hard swap — every channel a
  spring + the cartoon-punch curve, fade-coupled-to-transform, compositor-only.

### A11Y / PRM / reduce-transparency
- **AA holds** — the plate L is unmoved (field + edge are additive layers BEHIND the glass, never under
  text directly); every contrast pair re-ratifies (light fg 16.3:1 / dark 12.2:1, landed).
- **PRM** → the field drift FREEZES (warm stays), the moving cast goes static, the `.glass-reveal`/squash
  collapses to a fade. The cel degrades to a *still cel* — a lit edge + a static cast (still a defined edge).
- **`prefers-reduced-transparency`** → `--glass-level: 0` collapses the lens to solid warm `--card` over
  the (still warm, static) field; the keyed rim + warm cast keep it a discrete control. Warm-cream, never
  gray, even with transparency off. The edge floor DOUBLES as the reduce-transparency legibility anchor.
- **`prefers-contrast: more`** → the rim/cast α floors UP (the inked edge is a legibility ASSET).

### Cross-engine (Chrome AND Safari — the hard gate, spike-verified)
Every leg is on the cross-engine base, **verified live in Chrome** (§7) and Safari-safe by construction:
- `.paper-field` — CSS `radial-gradient` + `oklch()` stops + `transform` drift. WebKit `@property` ≥ 16.4;
  `oklch()` renders identically; sRGB gamut-clamp fallback still warm. **NO `backdrop-filter:url`, NO SVG.**
- the keyed rim — `conic-gradient` border + `mask-composite: exclude` / `-webkit-mask-composite: xor`
  (Safari-native — spike confirms `CSS.supports` true in Chromium; the `-webkit-` arm covers WebKit).
- the cast — `box-shadow` + `cos()`/`sin()` (CSS Values 4, both engines).
- the warmth — `backdrop-filter: blur() saturate()` (WebKit since 9). The ambient mix is plain
  `color-mix(in oklab)` (cross-engine).
- the Chrome-only `.glass-refract` SVG lens stays §L7 progressive enhancement — NEVER load-bearing on
  the warm/field/edge read (the read survives in WebKit on the gradient rim + cast + saturate alone).
- **MEATBALLING note:** the metaball/goo stays where it belongs — the dock-fission viz (static-SVG sRGB
  `filter:url()`), NEVER the material floor. The material path has zero goo, zero `backdrop-filter:url`.
- Acceptance is a PAIRED-engine π (Chromium AND WebKit) — the cardinal §L7 bar.

---

## 7 — THE SPIKE (live-verified, both modes)

A throwaway de-risk at `docs/tranches/BD/greenfield/glass-material/golden/spike.html`, verified live in
Chrome via the dev server. It mirrors the token math (no glass-ui build dependency) and proves the THREE
boldest mechanisms render and compose:

- **`paper-field`** drifts compositor-cheap, both modes WARM (light: amber→terracotta→sand;
  dark: warm-dark GLOW, never charcoal) — `spike-light-tuned.png`, `spike-dark-tuned.png`.
- **`--glass-key` directional conic rim + coherent cast** — the defined edge reads in both modes; the
  cards lift off the field as discrete lit panes; the puck controls read as defined shapes.
- **the transmissive read** — the plate visibly bends the field; the OKLab readback shows the
  field-vs-flat delta is real (over-field C measurably > over-flat C).
- **cross-engine support** — `CSS.supports` confirms `conic-gradient`, `mask-composite`, and
  `backdrop-filter: blur() saturate()` all available; no `backdrop-filter:url`, no SVG goo in the path.

**The spike's calibration learning (fed into §3):** field stops need real chroma at field-L (C ≈ 0.07,
NOT the gamut-bound L0.98 plate); the plate sits over the DENSE field region (stops positioned toward
the card band); plate ~0.65α. The exact composited C ≥ 0.018 bar is a CALIBRATION the live gate (§8)
tunes against the real painted composite in src/ — the spike proves the mechanism, the gate locks the bar.

Captures: `spike-light.png` · `spike-light-tuned.png` · `spike-dark-tuned.png`.

---

## 8 — THE GATE (born-RED — extend `proof:no-gray` to the CONTRACT, no new gate)

The triumvirate's π (`tests-visual/no-gray.spec.ts`) raised the plate floor (`WARM_PLATE_FLOOR = 0.01`)
— necessary, insufficient (the plate cleared it and STILL read gray because the field was flat). Extend
the SAME spec to assert the whole RELATIONSHIP, so a warm plate over a flat field can no longer green.
The existing arms (a)–(f) + `WARM_PLATE_FLOOR` + the KEEP-NEUTRAL byte-asserts + AA re-ratification are
**UNTOUCHED** (the field + edge are additive; the plate L is unmoved). New arms:

| # | assert | born-RED on (HEAD) | GREEN when |
|---|---|---|---|
| **F1 field-warmth** | every enrolled glass demo route paints a `.paper-field` whose sampled OKLab **C ≥ 0.020 warm** (H ∈ [45,85]) | the flat C 0.0029 H 84.6 page | the field renders |
| **F2 composite-over-REAL-field** | the floating/control plate composited over the **actual sampled field** (not a synthetic flat page) resolves **C ≥ 0.018 warm** | the muddy ≈C 0.009 composite over the flat page | the field + ambient-hue lift land |
| **F3 defined-edge** | the control/wash rung resolves a non-flat keyed rim (`--glass-material-rim` carries the directional conic) + a non-`none` warm `--glass-shadow-*` cast + a border α ≥ 8% warm-ink; the rim's lit-edge luminance exceeds the page luminance by a min ΔL | the `box-shadow:none` / flat-ring / 5%-ink trigger | the keyed rim + cast wire |
| **F4 no-flat-glass (structural)** | a `.glass-*` element with **no `.paper-field` ancestor** in the demo DOM is a FAIL (the precept made executable) | any current flat-page glass demo (`/foundations/intro`: 0 fields, 24 glass) | the chassis mounts the field |

The π samples the LIVE composite over the real field in BOTH modes (Chromium AND WebKit — the paired
§L7 bar) + writes the captured DELTA frames. **Born-RED today on all four arms; this is the binding
paint that closes the source-green/visually-broken hole — the gate verifies the RELATIONSHIP, not just
the plate.**

A born-RED sketch (the F2 heart, dropped into the existing spec's plumbing):

```ts
test("(F2) the plate composites warm OVER THE REAL FIELD, not a flat page", async ({ page }) => {
  await page.goto("/foundations/intro", { waitUntil: "networkidle" });
  for (const dark of [false, true]) {
    await setDark(page, dark);
    const { fieldBg, plateBg } = await page.evaluate(() => {
      const field = document.querySelector(".paper-field") as HTMLElement;   // F4: must exist
      const plate = document.querySelector(".glass-floating, .glass-card") as HTMLElement;
      // sample the field colour BEHIND the plate (centroid stack-walk, the observer's leaf)
      const r = plate.getBoundingClientRect();
      const behind = document.elementsFromPoint(r.left + r.width/2, r.top + r.height/2)
        .find(el => el.classList.contains("paper-field")) as HTMLElement;
      return { fieldBg: getComputedStyle(behind).backgroundColor, plateBg: getComputedStyle(plate).backgroundColor };
    });
    const field = parseRgbA(fieldBg)!, plate = parseRgbA(plateBg)!;
    const comp = composite(plate, field);                 // plate OVER the REAL field
    const ok = rgbToOklab(comp.r, comp.g, comp.b);
    expect(ok.C, `plate over field C ${ok.C.toFixed(4)} < 0.018 [${dark?"dark":"light"}] — gray over flat`).toBeGreaterThanOrEqual(0.018);
    expect(ok.H).toBeGreaterThanOrEqual(WARM_HUE_LO);
    expect(ok.H).toBeLessThanOrEqual(WARM_HUE_HI);
  }
});
```

---

## 9 — DELTA-ASSAY → WAVE AMENDMENTS (reconciled, no dup against the union waves)

The triumvirate's `W-GLASS-ABROGATE-GRAY` is **landed** (tokens A/C/D). The golden does NOT re-open it
— it lands the two legs it HELD + generalizes the transmission, all by composing extant seams:

| amendment | scope | gate | dup-check |
|---|---|---|---|
| **W-GLASS-FIELD** (augments W-GLASS-ABROGATE-GRAY, leg b) | NEW `@utility paper-field` in `paper.css` + mount in the demo chassis (`AppShell.vue` / `<GlassStage>`); composes `paper-underpaint` + `auroraFallbackGround` static-mesh + `--neutral-0` (decoupled) | F1 + F4 | folds T11 `W-LIVING-ARTWORK` (LOW) UP — SAME mechanism, no new wave; orthogonal to the GPU aurora/dock-transmit waves (those are per-route viz fields) |
| **W-GLASS-KEY-EDGE** (augments, leg c) | NEW `--glass-key` token + directional conic rim in `rim.css` + keyed warm cast in `glass-fx.css`/`shadow.css`; wire onto control/wash rungs; the loud register via shipped `.shadow-cartoon-*` | F3 | distinct from BC.W-BLACK-BAR (that retired the *perimeter* border; this is the *directional rim* + cast on the material group) |
| **W-GLASS-AMBIENT-GENERAL** (generalizes T7 past the dock) | extend `useGlassBackdropLuminance` with a dominant-hue term feeding `--glass-ambient-hue`/`-strength` for every glass tier over `.paper-field` | F2 | T7 `W-DOCK-DEEP-TRANSMIT` proposed it for the dock; this widens scope — augment, not a new wave |
| **W-NO-GRAY gate ext** | F1–F4 + π over the real field, paired-engine, both modes | — | extend `no-gray.spec.ts` in place — the triumvirate's own discipline |

**HELD / FROZEN (the union law):** the `--card` / `--glass-saturate-*` / dark-arm tokens (byte-untouched
— they ARE leg a); the alpha/radius/tint-seam ladders; the `--surface-tint-*` in-srgb fence; the
spring/clock motion tokens; `--neutral-0` stays the KEEP-NEUTRAL *solid* floor (decoupled from the field,
never deleted). **No legacy, no alias, no dual path** — the field + edge + ambient-general are additive
layers on the existing composite; the lens leg is the triumvirate's, unmodified.

**No new tier. No new compose recipe. No source-token re-edit on the calm axis.** Three amendments
compose existing seams (`--glass-ambient-*`, `--glass-rim-*`/`--glass-shadow-*`, the static-mesh idiom,
the `proof:no-gray` gate) into the gestalt the chroma-only fix could not reach alone.

---

## 10 — ACCEPTANCE (the gestalt bar — live-judge AS A USER, both modes, both engines)

The golden closes only when, on a FRESH capture of `/forms/select`, `/forms/toggle-chip`,
`/display/buttons`, a cards page, `/foundations/intro` in BOTH modes AND both engines:

1. **A colorful field is visibly behind every glass surface** (the page is not flat cream/gray). [F1/F4]
2. **The glass TRANSMITS the field tinted warm** — composited C ≥ 0.018 over the field (born-RED on today's flat-page ~0.009). [F2]
3. **Every control reads as a DEFINED SHAPE** — the Select trigger has a cut, lit edge + a warm cast, not a cream smudge. [F3]
4. **No surface reads gray/muddy** — the headline; a single gray plate is a FAIL regardless of the metric.
5. **The cel coheres** — rim and cast agree on one key-light; objects lift off the field with cartoon weight.
6. **Text AA holds** (landed ratios preserved; plate L unmoved).
7. **Both modes** read warm-luminous; dark GLOWS, never charcoal.
8. **Liquid-weight un-regressed**; the field drifts with weight; Safari-parity on field + rim + cast + transmission.
9. **No-legacy / DRY** — augments the landed triumvirate, composes extant seams, zero fork, one new token + one new utility + one composable extension.
