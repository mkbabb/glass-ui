# PAGE-BACKGROUND — lens-b (cross-engine / perf-first) greenfield

> The warm colorful field primitive: the per-route layer-0 behind every glass surface +
> procedural viz, so glass reads transmissive and viz reads lit — not gray/dull over nothing.
> Designed from first principles through the CHROME+SAFARI / KISS / compositor-only lens.
> **Tranche-dev only. A UNION with the extant `<PaperBackdrop>` + `<Aurora>` + the glass-material
> `BD.W-GLASS-FIELD` finding — no fork, no second fixed plane, no per-viz field.**

---

## 0 — THE LIVE TRUTH (measured, `:5173`, 2026-06-24)

Re-measured the born-RED page on real pixels (chrome-devtools-mcp, both routes, light mode):

| surface | live | OKLab | verdict |
|---|---|---|---|
| `/forms/select` page ground (`.paper-underpaint` bg) | `rgb(251,250,248)` | L 0.985 · **C 0.0029** · H 84.6 | FLAT, near-achromatic, yellow-green — **15× below the §3 0.045 floor** |
| `--card` source token | `hsl(30 85% 96%)` | L 0.979 · C 0.0141 · H 74.4 | warm (leg-a landed) but a lens over a flat ground = gray |
| `/forms/select` `canvasCount` | **0** | — | NO live field behind ANY glass |
| `/forms/select` painted layers | `paper-underpaint` (flat `rgb(251,250,248)`) + `grid-bg` (static `repeating-linear-gradient`, z -5) | — | dead wash, both layers achromatic |
| `/substrates/blob` page ground | **same** `rgb(251,250,248)` C 0.0029 | — | even the VIZ band's page is flat — the blob canvas floats over nothing; its edges read dull |

**Diagnosis (matches the glass-material golden byte-for-byte):** the page is layer-less. The
`<PaperBackdrop>` is mounted at `AppShell.vue:251` but paints the flat `--neutral-0`. The grid/paper
washes are achromatic. There is no chroma anywhere for the glass to bend or the viz to sit lit upon.
The whole §3 story (glass-material + 8 vizzes) routes its fix HERE — and HERE is unbuilt. The spec
`BD.W-PAGE-BACKGROUND` describes a per-category MAP onto EXISTING field kinds (aurora/liquid-grid) —
but those kinds are GL engines (the one-GL budget caps them) or achromatic (grid). **Neither is the
cheap, universal, vivid, warm, per-route chroma plenum the §3 floor actually needs.** That primitive
does not exist. This is what we greenfield.

The screenshot confirms the gestalt: `/forms/select` is a flat gray-cream sheet, the select pills are
flat cream pills with zero perceptible refraction, no colorful field, both modes dead.

---

## 1 — THE CORE IDEA: `viz-field` — ONE token-driven warm plenum, three consumers

**Glass is a relationship, not a color (the glass-material truth) — and so is a procedural viz.**
You cannot warm a lens or vivify a particle field; you warm/vivify *what they sit on*. The fix is a
single **layer-0** primitive — a compositor-only CSS warm-mesh — that THREE consumers share:

1. **glass** transmits it (backdrop-filter has chroma to concentrate);
2. **procedural viz** sits lit on it (its sRGB ground = the field, not transparent-over-nothing);
3. **paper grain** layers on top of it (the existing `paper-underpaint`/`paper-grain-overlay` ride ON the field).

The primitive is **`viz-field`** — a fixed, full-bleed, `z-index:-1`, pointer-none CSS radial-mesh
that paints a warm chroma plenum from a per-route palette. It is the layer the six-layer glass
composite and every viz canvas were ALWAYS meant to sit on. It is NOT a new fixed plane stacked on
the `<PaperBackdrop>` — it **re-paints the backdrop the chassis already mounts** (the
glass-material C#2 R8 fold: one backdrop, warmed; the grain rides on top).

```
z order (bottom → top), ONE fixed backdrop element + the existing grain + the viz/glass:
  viz-field      (CSS radial-mesh, warm chroma, per-route triad)   z:-1  ← NET-NEW: the plenum
  paper grain    (existing feTurbulence, mix-blend multiply)        on ::after of the same el
  [optional] <Aurora>/viz canvas   (opt-in amplifier, one-GL-per-route)  z:-1..0 OVER the mesh
  glass surfaces (input-pill / feedback-tone / cards)               z:0+  ← transmit the mesh
```

### Why a CSS radial-mesh, not Aurora, as the universal ground (the cross-engine/perf decision)

| mechanism | cost | chroma | cross-engine | verdict |
|---|---|---|---|---|
| **CSS radial-gradient mesh** (3–4 warm stops over `--neutral-0`) | ONE compositor paint, 0 JS, 0 GL context | real chroma at FIELD-L (≥0.06 achievable) | Chrome+Safari native (`radial-gradient`+`oklch()`+`transform` — no `backdrop-filter:url`, no SVG, no trig) | **THE UNIVERSAL GROUND** |
| `<Aurora>` GL engine | a WebGL context, rAF, intersection-pause machinery | maximal living mesh | one-GL-per-route budget caps it to ONE route | **the opt-in AMPLIFIER** for hero/showcase only |
| `grid`/`paper` static | cheap | **achromatic** (the live defect) | fine | RETIRED for glass bands (keep for true blueprint identity only) |

The CSS mesh is the cheapest mechanism that hits the §3 vivid-warm bar (KISS). `<Aurora>` is NOT the
universal field — it cannot be (the budget); it is the *amplifier* a hero route layers OVER the mesh.
**The mesh is the floor; Aurora is the ceiling.** Every route gets the mesh (free); the showcase/hero
routes additionally get one Aurora (the budget's single GL). They COMPOSE — Aurora paints its drift
OVER the warm mesh ground, so even where the GL drift is faint the warm chroma still clears the floor.

---

## 2 — THE MECHANISM (tokens · recipe · per-route registry)

### 2a — `src/styles/viz-field.css` — the plenum utility (NET-NEW, ~40 lines)

```css
@property --viz-field-drift { syntax: "<angle>"; inherits: false; initial-value: 0deg; }

/* The warm chroma plenum. Chroma lives at FIELD-L (0.90–0.94 light / 0.26–0.32 dark) —
   where the oklch gamut allows REAL chroma, NOT the gamut-bound L0.98 plate. */
@utility viz-field {
  position: fixed; inset: 0; z-index: -1; pointer-events: none;
  background:
    radial-gradient(120% 90% at 22% 18%, var(--viz-field-a), transparent 60%),
    radial-gradient(110% 80% at 80% 28%, var(--viz-field-b), transparent 58%),
    radial-gradient(100% 95% at 58% 88%, var(--viz-field-c), transparent 62%),
    var(--neutral-0);                       /* KEEP-NEUTRAL floor, untouched, decoupled */
  background-attachment: fixed;
}

/* compositor-only drift: the gradients live on a ::before that translates+scales —
   the background itself NEVER re-paints (liquid-weight: eased, not linear). */
.viz-field::before {
  content: ""; position: absolute; inset: -28%;
  background: inherit; opacity: 0.85;
  animation: viz-field-drift 44s cubic-bezier(0.45,0,0.55,1) infinite alternate;
  will-change: transform;
}
@keyframes viz-field-drift {
  from { transform: translate3d(0,0,0) scale(1)    rotate(0deg); }
  to   { transform: translate3d(2.5%,-2%,0) scale(1.07) rotate(2.5deg); }
}
@media (prefers-reduced-motion: reduce)        { .viz-field::before { animation: none; } }      /* warm stays, drift stops */
@media (prefers-reduced-transparency: reduce)  { .viz-field { background: var(--neutral-0); } .viz-field::before { display:none; } }
```

### 2b — the warm chroma triad (spike-calibrated to clear C ≥ 0.045, ideally ~0.06)

The DEFAULT (no route accent) is the calm warm-amber → terracotta → sand drift. The HUE PURGE is
binding: every default stop sits H ∈ [40, 95] — NEVER teal/navy [180, 270].

```css
:root {                                    /* light — chroma at FIELD-L where gamut allows */
  --viz-field-a: oklch(0.92 0.090 68 / 0.85);   /* warm amber, dense core */
  --viz-field-b: oklch(0.90 0.100 40 / 0.70);   /* terracotta */
  --viz-field-c: oklch(0.94 0.070 92 / 0.65);   /* sand-gold */
}
.dark {                                    /* warm-LUMINOUS dark, never gray */
  --viz-field-a: oklch(0.32 0.085 56 / 0.90);   /* warm-dark glow, NOT charcoal */
  --viz-field-b: oklch(0.28 0.090 36 / 0.78);   /* deep terracotta ember */
  --viz-field-c: oklch(0.26 0.060 80 / 0.72);   /* dim gold */
}
```

The chroma is HIGHER than the glass-material golden's first pass (0.075/0.085/0.06) — that pass was
tuned to the COMPOSITE-behind-glass floor (~0.012). THIS primitive must clear the §3 FIELD floor
(0.045) on the field ITSELF, vivid-not-pale, so it survives the blur attenuation AND reads at the
viz edges. The exact stops are the gate's calibration target (§4 spike).

### 2c — the per-route registry (presets-in-consumers — the demo owns the palettes)

This is the load-bearing "per-route, NOT one constellation default" requirement. The registry lives
in the DEMO (`demo/stories/viz-field-palettes.ts`), keyed by category/route, deriving the triad from
ONE route accent hue (an analogous warm triad: accent ± 14° at three lightnesses). The chassis writes
the three vars on the `<VizField>` element per route — ONE writer, the StoryHero/AppShell seam.

```ts
// demo/stories/viz-field-palettes.ts  (presets-in-consumers; library default stays warm-amber)
export const VIZ_FIELD_PALETTES = {
  forms:        { accent: 64,  // gold-blueprint warm
  containers:   { accent: 28,  // terracotta — the glass showcase band
  feedback:     { accent: 50,  // amber-honey
  substrates:   { accent: 38,  // warm-ember under the GL drift
  display:      { accent: 78,  // sand-cream
  // ... per category; each derives { a,b,c } via warmTriad(accent)
} satisfies Record<string, { accent: number }>;
```

Each page reads ITS palette → ITS field. The forms blueprint is gold-warm; containers terracotta;
feedback honey; substrates a warm ember UNDER the GL drift. Never one constellation default. The
`warmTriad(accent)` helper CLAMPS every derived hue into [40, 95] (the purge is enforced in code, not
trusted to the author).

### 2d — the mount (the chassis seam — ONE writer, propagates to all 118 pages)

`<PaperBackdrop>` at `AppShell.vue:251` grows a `field` prop (or a sibling `<VizField :palette>`).
When `field` is set, it composes `viz-field` + the existing grain on the SAME fixed element (one
backdrop, warmed — not a second plane). The per-route palette flows from the chassis `CATEGORY_*`
map → the element's three CSS vars. The library glass primitive is BYTE-UNCHANGED; it finally has a
backdrop worthy of it. This is a demo-chassis preset contract, NOT a library-API guarantee.

---

## 3 — HOW IT COMPOSES THE EXISTING PRIMITIVES (deft · DRY · no re-fork)

| existing asset | how `viz-field` unions with it (never forks) |
|---|---|
| `<PaperBackdrop>` (`AppShell.vue:251`) | RE-PAINT it — the `field` prop adds the warm-mesh background to the SAME fixed element; the grain `::after` rides on top. NOT a second fixed plane (the glass-material C#2 R8 fold). |
| `paper-underpaint` / `paper-grain-overlay` | UNTOUCHED. The grain layers ON the field (paper-morphism visible — multiply/soft-light over the warm mesh, not over flat neutral). |
| `<Aurora>` engine | The OPT-IN amplifier. A hero/showcase route mounts ONE Aurora OVER the mesh (the budget's single GL). Aurora's `auroraFallbackGround` static-mesh is literally this idea already — `viz-field` generalizes it to the universal CSS floor; Aurora stays the living-mesh ceiling. Reconciles `BD.W-AUR-VIVIDNESS`: Aurora need not carry the whole field warmth — the mesh under it guarantees the floor even when the GL drift is faint or offscreen-paused. |
| StoryHero `liveBackdrop` seam (`:202`) | The contained-field mount stays; the mesh is the universal FLOOR under whatever `liveBackdrop` kind resolves. The `grid`/`paper` static kinds gain warmth for free (they paint OVER the mesh). |
| `CATEGORY_DEFAULT_BG` map (`manifest.ts:181`) | KEEP as the *amplifier* selector (which routes get an Aurora/liquid-grid OVER the mesh). The mesh itself is universal — every route. The map no longer has to choose "live vs dead"; it chooses "amplified vs plain", and NO route is ever dead. |
| `--neutral-0` (KEEP-NEUTRAL floor) | DECOUPLED + untouched — it is the mesh's base layer under the warm stops; solid-chrome routes (PRM-reduce) fall back to it cleanly. |
| 8 procedural vizzes | Each viz's transparent/none ground becomes the mesh. The viz canvas is `position:absolute` over the `viz-field`; the viz samples the mesh as its sRGB ground where it composites translucent (the dot-flow halftone, the goo-blob edges, the concentric rings all gain a warm lit ground instead of dull-over-nothing). NO per-viz field fork — the ONE plenum serves all. |

**The DRY win:** the glass-material `BD.W-GLASS-FIELD`, all 8 viz §3 deltas, and `BD.W-GLASS-FIELD`
collapse into ONE primitive + ONE mount + ONE per-route registry. The map's job shrinks from "route a
live field per category" to "pick the per-route accent + opt-in the amplifier." No dup, no per-viz
field, no second fixed plane.

---

## 4 — THE CROSS-ENGINE FLOOR (§L7 — Chrome AND Safari, the binding lens)

- **NO `backdrop-filter: url(#…)`** — the mesh is a plain `background` on its own layer; nothing
  references an SVG filter through backdrop-filter (the WebKit drop-trap). The glass surfaces ABOVE
  use their existing plain `backdrop-filter: blur()` (already cross-engine).
- **NO SVG goo, NO trig** in the field path — `radial-gradient` + `oklch()` + `transform`, all
  WebKit-native since Safari 15 (`oklch`) / forever (`radial-gradient`, `transform`). The drift is a
  `transform` on a `::before` — compositor-only, identical in both engines.
- **sRGB color-interp** — `oklch()` stop colors resolve to sRGB; the gradient interpolation is in the
  default (sRGB) space — no `in oklab` interpolation hint that WebKit handles differently, so the mesh
  is byte-comparable Chrome↔Safari. (The stop COLORS are authored in oklch for gamut-correct chroma;
  the INTERPOLATION between transparent stops is plain — no cross-engine drift.)
- **`background-attachment: fixed`** — supported both engines; the mesh stays viewport-locked (the
  field FRAMES content by receding, the ios27 T17 dot-flow read).
- **The Aurora amplifier** keeps its existing §L7 arms (the GL engine's WebKit fences are already
  shipped — `useIntersectionPause`, `content-visibility`, sRGB). The mesh adds ZERO new cross-engine
  surface area.
- **Paired-engine π** — the gate captures BOTH Chromium and WebKit (the mesh must clear the C≥0.045
  floor in both; oklch gamut-mapping differs slightly between engines, so the floor is verified per
  engine, not assumed).

**The cross-engine verdict:** the universal field is the CHEAPEST possible mechanism AND the most
cross-engine-safe — a pure compositor `background` with no filter, no SVG, no trig, no GL. The GL
(Aurora) is confined to the ONE budgeted opt-in where its WebKit arms already ship. This is KISS made
load-bearing: the simplest mechanism is also the most portable.

---

## 5 — A11y / PRM / PERF CARVE

- **PRM (`prefers-reduced-motion`)** → the drift `::before` animation stops; the warm mesh stays
  static (the colorful field is content, not motion — it survives PRM, only the drift freezes).
- **`prefers-reduced-transparency`** → the mesh collapses to `--neutral-0` (the KEEP-NEUTRAL solid
  floor shows); glass surfaces already have their reduced-transparency arms. No chroma is LOST as a
  legibility asset is gained.
- **`prefers-contrast: more`** → prose stays AA via the chassis `--glass-backdrop: light` bucket
  (already set on the card, `StoryHero.vue:370`); the mesh is a CALM read-through underpaint (the
  proportion fence), never a loud protagonist over which dense controls fail.
- **Offscreen / perf** — the mesh is ONE compositor paint that never re-rasters (the drift is a
  transform). A field a screen down spends ZERO paint frames (it is `background`, not a canvas). The
  Aurora amplifier inherits its existing offscreen-pause. **Net cost of the universal field: one
  extra compositor layer per route, no JS, no rAF, no GL.** Cheaper than the current `grid-bg`
  (which is also a gradient but achromatic — same cost, real chroma).
- **The calm-proportion fence** — the mesh mean chroma is VIVID (≥0.045) but its OPACITY/contrast
  against prose is bounded by the stop alphas (0.65–0.90) + the `--glass-backdrop: light` AA bucket,
  so dense forms/feedback bands read calm-live, not aurora-loud. Vivid ≠ loud: the chroma is high,
  the luminance contrast against text is low (warm-on-warm).

---

## 6 — THE GATE (born-RED → GREEN; the painted-pixel truth, never a token regex)

The spec's gate is source-structural (the MAP + the mount). THIS lens adds the BINDING painted-pixel
arm — the prior goldens FAKED §3 with hardcoded `fieldSample` constants; the gate MUST sample REAL
painted page pixels behind a REAL glass/viz surface (`canvas.drawImage(documentElement-region)` →
`getImageData`, NOT `getComputedStyle().backgroundColor` of the flat base token).

`tests-visual/viz-field.spec.ts` (paired-engine, Chromium + WebKit), both modes, born-RED on HEAD:

1. **FIELD-CHROMA (the §3 floor).** A `getImageData` sample of the page-field region (behind, NOT
   inside, the glass demo) reads **mean OKLab C ≥ 0.045** (the §3 floor), H ∈ [40, 95] (the warm
   purge). HEAD reads C 0.0029 H 84.6 → **born-RED**. Self-test: a flat-`--neutral-0` field FAILS,
   the warm-mesh field PASSES (proves it reads the chroma layer, not the achromatic base).
2. **FIELD-NON-UNIFORM (real content to refract).** Spatial-luminance variance of the field region
   above a floor (the radial-mesh has structure; a flat fill has variance ≈ 0 → RED).
3. **NO-TEAL/NAVY (the binding purge).** No sampled field pixel resolves H ∈ [180, 270] above the
   chroma floor (extends `proof:teal-navy-purge` T5 onto the field). Both modes.
4. **COMPOSITE-THROUGH-GLASS.** The glass surface region composited over the mesh differs measurably
   from the same surface over a flat plate (a before/after delta proving the blur has live chromatic
   input — the morphism is PERCEPTIBLE). HEAD: glass-over-flat → imperceptible → RED.
5. **VIZ-LIT.** On a substrate route, the viz canvas EDGE region (where it composites translucent)
   reads the warm mesh chroma behind it (≥0.045), not dull-over-nothing. HEAD: blob edges over flat
   `rgb(251,250,248)` → RED.
6. **DARK-WARM-LUMINOUS.** In dark mode the field reads warm-luminous (C ≥ 0.045, H ∈ [40, 95], L in
   the dark-glow band), NEVER gray-charcoal. HEAD dark: flat near-black → RED.
7. **AA-PROSE / PROPORTION.** Body text clears the contrast floor over the live field; the field mean
   luminance-contrast-vs-prose stays below the loud ceiling (calm-live, not protagonist).

**Self-test (born-RED → GREEN, ≥6 bites):** (1) flat-base field → arm-1 RED; (2) a teal stop
`oklch(0.7 0.1 210)` → arm-3 RED; (3) field opacity 0 (no paint) → arm-2 RED; (4) glass over flat
plate → arm-4 RED; (5) dark field set to gray `oklch(0.3 0 0)` → arm-6 RED; (6) field chroma 0.10 +
opacity 0.95 (loud protagonist, prose fails AA) → arm-7 RED. The fixed tree is clean in BOTH engines.

**Anti-evasion (the cardinal lesson):** the gate samples the PAINTED field via canvas raster, NEVER a
hardcoded inline field, NEVER `getComputedStyle` of `--neutral-0`/`--viz-field-a`. A field that fails
to paint, paints flat, or paints teal does NOT pass. The FIELD_FLOOR (0.045) is the §3 number, and the
spike (below) VERIFIES it is achievable on real pixels in both engines before it is asserted — if the
gamut caps the achievable chroma below 0.045 through an AA-legible stop, the bar is the honestly-
achievable number, STATED, never an acceptance number the evidence fails.

**The de-risk spike** (`docs/tranches/BD/greenfield/page-background/golden/spike.html`): render the
mesh, sample the painted field centroid + the glass-over-mesh composite + the dark arm, in Chrome AND
Safari; push the triad chroma until BOTH engines clear 0.045 on the field and the composite reads
perceptibly warmer than over-flat, with prose still AA. Quote THOSE numbers as the calibrated triad.

---

## 7 — THE WAVE-AMENDMENT (make `BD.W-PAGE-BACKGROUND` buildable)

`BD.W-PAGE-BACKGROUND` is SPEC-ONLY today — it describes a per-category MAP onto field KINDS that are
either GL-budget-capped (aurora) or achromatic (grid). It has no chroma primitive. The amendment:

| action | what | why |
|---|---|---|
| **NEW (src)** | `src/styles/viz-field.css` — the `viz-field` utility + the warm triad tokens (light + dark) | the universal compositor warm-mesh plenum; the §3 chroma floor primitive that does not exist today. ~40 lines, 0 JS, both engines. |
| **NEW (demo)** | `demo/stories/viz-field-palettes.ts` — the per-route accent registry + `warmTriad()` (clamps [40,95]) | presets-in-consumers; per-route palette, never one default. |
| **AUGMENT** | `<PaperBackdrop>` grows a `field`/`palette` prop → composes `viz-field` on the SAME mounted element | one backdrop warmed, not a second plane (DRY). |
| **AUGMENT** | `AppShell.vue:251` / StoryHero seam writes the per-route palette vars | ONE writer → 118 pages. |
| **RECONCILE** | `CATEGORY_DEFAULT_BG` becomes the AMPLIFIER selector (which routes layer Aurora/liquid-grid OVER the mesh); the mesh is universal | the map no longer chooses live-vs-dead; no route is ever dead. |
| **RECONCILE** | glass-material `BD.W-GLASS-FIELD` + all 8 viz §3 deltas + `BD.W-AUR-VIVIDNESS` → POINT AT `viz-field` | ONE primitive, no dup, no per-viz fork; Aurora is the amplifier, the mesh is the floor. |
| **NEW (gate)** | `tests-visual/viz-field.spec.ts` — the painted-pixel born-RED gate (§6) + the spike | the binding §3 truth a source regex cannot prove; born-RED today (C 0.0029, 0 fields). |
| **KEEP** | the spec's W1–W6 source arms (the map + ShowcaseFrame `tier="field"` + one-GL fence + the dock BUG-D1/D2 folds) | still valid as the STRUCTURAL arm; the painted-pixel gate is the new BINDING arm beside them. |

**Fences:** ONE plenum (no second fixed plane, no per-viz field); `--neutral-0` decoupled +
untouched; the warm triad is presets-in-consumers (no demo hue enters a library token; the library
DEFAULT triad is warm-amber, the identity); Aurora stays the one-GL opt-in amplifier; no
`backdrop-filter:url`, no SVG, no trig in the field path; the purge [180,270] is clamped in code +
gated on painted pixels; PRM/reduced-transparency carved; calm-proportion bounded.

---

## 8 — THE GESTALT BAR

Open `/forms/select` + `/substrates/blob` + `/substrates/aurora` + `/display/buttons`, BOTH modes,
fresh paint: every page reads a VIVID WARM FIELD behind the glass + viz — the select pills visibly
bend a warm amber mesh (not flat cream), the blob/aurora viz sits LIT on a warm ground (not dull over
flat), dark mode reads warm-luminous (not gray-charcoal), and NO teal/navy anywhere. The field is
per-route (forms gold, containers terracotta, feedback honey) — not one constellation default. PASS
iff every enrolled surface composites a perceptible warm chroma field ≥0.045 in both modes, both
engines. Born-RED on HEAD (C 0.0029, 0 fields, flat). The bold claim: **no glass-ui route is ever
flat again — the field is layer-0, mounted by construction, for every page.**
