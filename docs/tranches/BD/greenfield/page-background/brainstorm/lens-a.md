# PAGE-BACKGROUND — Lens A: the Warm-Mesh Plenum

> GREENFIELD brainstorm (pure iOS-27 fidelity lens). Designs the per-route FIELD
> behind every glass surface + procedural viz so they read transmissive/vivid,
> not gray/dull. The asset `BD.W-PAGE-BACKGROUND` specs but **has never been
> built**. This is the load-bearing systemic fix — the user's #1 gray-glass
> complaint at the root.
>
> Tranche-dev only. No `src/` or demo paint here — this is the design + the
> buildable-wave amendment + the born-RED gate spec.

---

## 0. The born-RED truth (live-measured, not asserted)

Sampled on `localhost:5173` at HEAD (getComputedStyle + canvas readback, both modes):

| route / state | painted page chroma | verdict |
|---|---|---|
| `/forms/select` light — `.story-hero-bg`/`.grid-bg`/`.paper-underpaint` all paint `rgb(251,250,248)` | **C = 0.0029** @ h 84.6, L 0.985 | **16× below the §3 0.045 floor** — gray-glass-over-nothing |
| `/forms/select` dark — page bg `hsl(24 9% 4%)` | **C = 0.0028** @ L 0.146 | gray-charcoal, NOT warm-luminous |
| `/substrates/aurora` — live `<canvas>` reads `all transparent` via `drawImage` | (WebGL alpha pre-mult) | **the anti-evasion trap**: the field is real on screen but un-sampleable from the canvas surface — the gate MUST read the COMPOSITED page pixel, never the canvas |
| `--background` / `--card` / `--neutral-0` tokens | all near-achromatic cream/charcoal | the flat base is the substrate the blur transmits = nothing |

The §3 story — "a colorful field behind glass + a defined edge" — rests on an
asset that paints flat cream at C 0.0029. Every viz delta + glass-material
`BD.W-GLASS-FIELD` + `BD.W-AUR-VIVIDNESS` routes its fix HERE. **This wave is the
one shared primitive they all point at.** Grep confirms zero hits for
`.warm-mesh` / `.page-field` / `--page-field` in `src/` — there is no greenfield
to inherit. This is a from-first-principles build.

---

## 1. Core idea — the Warm-Mesh Plenum: ONE CSS field, TWO realizations, a per-route palette spine

The field is **not** a new fixed plane and **not** a per-viz fork. It is a single
**warm-mesh plenum** — a compositor-only radial/conic OKLCH gradient stack that
warms the ALREADY-mounted `<PaperBackdrop>` (`AppShell.vue:251`) — driven by a
**per-route palette spine** (4 warm OKLCH stops the route declares), realized at
**two intensities** that share one token contract:

- **`ground`** (the universal floor, every route): a CALM warm mesh — mean OKLab
  chroma **C ≥ 0.055** (clears the 0.045 floor with margin), 3–4 drifting radial
  stops at FIELD lightness (L 0.90–0.93 light / 0.30–0.36 dark, where the gamut
  admits real chroma — NOT the gamut-bound L0.98 plate). Compositor-only drift on
  a `::before` transform. This is the cheapest possible field and the DEFAULT
  every page wears. It clears the floor so glass reads transmissive and viz reads
  lit, without a GL context.
- **`vivid`** (hero / showcase surfaces): the SAME mesh stops, pushed to **C ≥
  0.10**, with a 4th conic "aurora-grade" sweep stop + a faster drift — the
  cartoon-technicolor punch the front-door demands. Where a route wants MORE, it
  opts the `<Aurora>` engine IN as the field realization of the same spine (§4) —
  the per-route Aurora preset literally consumes the same 4 OKLCH stops.

One contract: **`--field-stops` (4 OKLCH triples) + `--field-intensity`
(`ground` | `vivid`) + `--field-drift` (period).** The CSS mesh and the Aurora
engine are two RENDERERS of the same spine, so a route never re-declares its
palette — it declares it once, and `ground`/`vivid`/`aurora` are realizations.

This unifies the four claimants:
- viz §3 deps → the `ground` mesh is the warm field every viz composites over.
- `BD.W-GLASS-FIELD` → the mesh IS that wave's warm register on `<PaperBackdrop>`.
- `BD.W-AUR-VIVIDNESS` → `vivid`/`aurora` is the Aurora preset built from the spine.
- `BD.W-GLASS-KEY-EDGE` → unchanged (the edge axis is orthogonal; the field is the
  fill axis). The plenum + the keyed edge are the two halves of §3.

### The single boldest move

**Kill the flat `--neutral-0` page as the glass substrate entirely: make the
warm-mesh plenum the DEFAULT app-root paint via a per-route palette spine derived
from the SAME `--section-color-N` ramp the heroes already use — so every one of
the 118 routes inherits its OWN vivid warm field for free (zero per-page craft,
zero GL), and the gate samples the COMPOSITED page pixel behind a real glass
control (never the canvas, never `getComputedStyle` of the base token).** The mesh
is not opt-in decoration bolted behind glass-heavy bands; it is the ground every
glass surface in the system finally has something to refract. The `ground` floor
is so cheap (one `::before`, four `radial-gradient`s, one slow transform) that it
costs nothing to make universal — which is exactly why the user's complaint is
SYSTEMIC and the fix must be too. Per-route distinctness comes from the spine
(forms = indigo-warmed amber, substrates = the aurora-blue family warmed at the
edges, feedback = ruby-warm), so no two pages share the "one constellation
default" the brief forbids.

---

## 2. The mechanism — tokens, recipes, the per-route registry

### 2a. The token contract (`tokens.css §FIELD`, the single consumer seam)

Per the Feature-token-home rule, the knobs live in `tokens.css` under a new
`§FIELD` block; the recipe consumes them from `paper.css` / a new `field.css`.

```css
:root {
  /* The per-route palette spine — 4 warm OKLCH stops. The DEFAULT is the
     warm-cream identity; a route overrides via [data-field-palette] (§2c). */
  --field-stop-0: oklch(0.92 0.07 62);   /* amber-cream      */
  --field-stop-1: oklch(0.90 0.09 38);   /* terracotta       */
  --field-stop-2: oklch(0.93 0.05 85);   /* sand / wheat     */
  --field-stop-3: oklch(0.91 0.08 18);   /* rose-clay        */
  --field-intensity: 0.6;                /* ground rung; vivid ≈ 1.0          */
  --field-drift: 64s;                    /* the liquid-weight breath period   */
  --field-chroma-gain: 1;                /* vivid routes lift this to ~1.7     */
}
.dark :root, .dark {
  /* WARM-LUMINOUS dark — NEVER gray. Lower L, KEEP chroma (the gamut admits more
     chroma at mid-low L than at the L0.98 plate). The BA.W-NO-GRAY warm floor. */
  --field-stop-0: oklch(0.34 0.075 58);
  --field-stop-1: oklch(0.31 0.085 34);
  --field-stop-2: oklch(0.36 0.06 80);
  --field-stop-3: oklch(0.30 0.08 16);
}
```

**The BINDING purge (hue ∈ [180,270] forbidden).** Every default stop sits in
h ∈ [16,85] — warm amber/terracotta/sand/rose. The substrates spine (which wants
the aurora-blue family) is the ONLY route allowed a cool stop, and even there the
EDGES warm-suffuse (the dot-flow surpass-lever: "the dots carry a faint warm-amber
→ identity gradient at the edges"). A `proof:teal-navy-purge`-style hue clamp on
the `§FIELD` defaults keeps the universal floor warm.

### 2b. The `ground` realization — the warm-mesh on `<PaperBackdrop>` (`field.css`)

The mesh warms the EXISTING mounted underpaint — NO second fixed plane (the
glass-material `WAVE-AMENDMENT` C#2 R8 fold). `<PaperBackdrop field>` gains a
`::before` that paints four drifting radial stops OVER `--neutral-0` (decoupled,
untouched — the KEEP-NEUTRAL floor survives for `prefers-reduced-transparency`):

```css
.paper-field::before {           /* the warm-mesh plenum */
  content: ""; position: fixed; inset: -10%;     /* over-bleed so drift never gaps */
  pointer-events: none; z-index: -1;
  background:
    radial-gradient(62% 55% at 22% 28%, color-mix(in oklch, var(--field-stop-0), transparent calc(100% - 64% * var(--field-intensity))), transparent 72%),
    radial-gradient(58% 60% at 80% 24%, color-mix(in oklch, var(--field-stop-1), transparent calc(100% - 60% * var(--field-intensity))), transparent 70%),
    radial-gradient(70% 62% at 32% 82%, color-mix(in oklch, var(--field-stop-2), transparent calc(100% - 58% * var(--field-intensity))), transparent 74%),
    radial-gradient(54% 58% at 88% 86%, color-mix(in oklch, var(--field-stop-3), transparent calc(100% - 62% * var(--field-intensity))), transparent 70%);
  background-color: var(--neutral-0);            /* the decoupled flat floor underneath */
  animation: field-drift var(--field-drift) cubic-bezier(.37,0,.63,1) infinite alternate;
}
@keyframes field-drift {                          /* liquid-weight: ease, NOT linear */
  to { transform: translate3d(2.5%, -2%, 0) rotate(0.6deg) scale(1.06); }
}
```

- **Why `color-mix(in oklch, …)` not raw rgba:** OKLCH mix keeps the hue/chroma
  honest across the blend so the composited mean clears the 0.045 floor — an sRGB
  mix muddies toward gray (the exact §3 disease).
- **`--field-intensity`** scales the stop opacity: `ground` 0.6 → composited mean
  C ≈ 0.055; `vivid` 1.0 → C ≈ 0.10+. ONE scalar, two rungs.
- **Compositor-only:** the drift is a `transform` on a fixed `::before` — GPU
  composited, zero paint-cost per frame (§L7 sanctioned channel). `background`
  itself never re-rasterizes.

### 2c. The per-route registry — derive the spine from the section-color ramp

No bespoke per-page palette. A route's spine is DERIVED from its
`--section-color-N` index (the same ramp `aurora-hero.ts` already mirrors). A new
`sectionColorToFieldSpine(n)` helper (composing the shipped `cssToOklch`, zero
re-rolled OKLCH math) lifts the jewel section hue into the FIELD lightness band
and emits the 4 warm stops + 1 neighbour, written as `--field-stop-*` on the route
root via a `[data-field-palette="cat-<id>"]` attribute the chassis already sets:

| route band | section hue | field spine (warmed) |
|---|---|---|
| forms | indigo 265 | amber-cream + terracotta + indigo-warmed-edge + sand — reads WARM with an indigo whisper, the blueprint identity survives |
| substrates | teal 222 | the aurora-blue family in the CENTER, warm-amber suffused at the 4 EDGES (the dot-flow surpass-lever) |
| feedback | ruby 8 | rose-clay + ruby + terracotta + warm-cream — the status band warms |
| display / containers | amber 69 / slate 240 | amber-dominant / slate warmed to bronze |

This is the `CATEGORY_DEFAULT_BG` precedent EXTENDED: where the map today routes a
*kind* (`grid`/`aurora`), the spine routes a *palette*. Every category its own
vivid warm field, NONE the same — exactly the "per-route registry, not one
constellation default" the brief binds.

### 2d. The `vivid` / `aurora` realization — the spine IS the Aurora preset

For hero/showcase surfaces (`variant="hero"`, the front door), the field opts the
`<Aurora>` engine in as the renderer of the SAME spine. `heroAuroraConfig` already
maps a palette to an `AuroraConfig`; the reconciliation is: **the Aurora palette
stops ARE the `--field-stop-*` spine, read once.** A route declaring its field
palette gets the CSS mesh at `ground` and — IF it's a hero — the same 4 stops
drifting as a live Aurora. No fork: `BD.W-AUR-VIVIDNESS` is satisfied by lifting
the Aurora `saturation`/chroma toward the `vivid` rung (C ≥ 0.10) so the hero
field is VIVID, not the current pale pastel wash (the live aurora page screenshot
confirms it reads pale today). The CSS mesh is the cheap universal ground; Aurora
is the GL upgrade for the ONE-GL-per-route hero — they share the spine, so they
never disagree on hue.

---

## 3. How it composes EXISTING primitives (deft, DRY, no re-fork)

| concern | reuse | not a new… |
|---|---|---|
| the mounted ground | `<PaperBackdrop>` @ `AppShell.vue:251` — warm its `::before` | second fixed plane |
| the per-route palette | `--section-color-N` ramp + `cssToOklch` (shipped) | bespoke per-page hue |
| the hero field | `<Aurora>` + `heroAuroraConfig` (shipped) | parallel field engine |
| the contained-page field | `StoryHero.vue` `liveBackdrop` branch (shipped mount) | new mount mechanism |
| the offscreen-pause / PRM freeze | `useIntersectionPause` + `content-visibility` (inherited by Aurora) | new perf seam |
| the warm floor / no-gray | `W-GLASS-ABROGATE-GRAY` F1–F4 arms + `proof:teal-navy-purge` hue clamp | new gate family |
| the token home | `tokens.css §FIELD` (new block, the rule) | scattered literals |

The CSS `ground` mesh is the only net-new artefact (a `field.css` recipe + the
`§FIELD` token block + the `sectionColorToFieldSpine` helper). Everything else is
a re-point of a shipped seam. The library glass material stays BYTE-UNTOUCHED —
the component was always right; it finally has a backdrop worthy of it.

---

## 4. Cross-engine (Chrome + Safari) — §L7 floor

- **`ground` mesh = pure `radial-gradient` + `color-mix(in oklch)` + `transform`
  drift.** All three are native + identical on Chrome AND WebKit (no
  `backdrop-filter: url`, no SVG goo, no trig). The drift is a compositor
  `transform` on a fixed layer — GPU on both engines.
- **`color-mix(in oklch)`** is shipping in both Chrome and Safari 16.4+. The
  `@supports not (color-mix(in oklch, red, blue))` arm falls back to
  `color-mix(in srgb)` (slightly muddier but still clears a relaxed floor) — the
  honest degraded arm.
- **No glass-samples-glass trap:** the field is a fixed `-z-1` sibling BEHIND all
  glass; the glass `backdrop-filter` samples the field's COMPOSITED output (a
  normal painted layer), never another `backdrop-filter`. The §L1 "glass cannot
  sample glass" rule holds by construction (the field carries no filter).
- **The `aurora` realization** inherits Aurora's existing cross-engine arm
  (`renderMode="auto"` → CSS-gradient placeholder on low-power/PRM/Safari-fragile;
  itself a warm radial/linear wash ≥ the static — so the upgrade is strictly ≥ on
  every device).
- **Acceptance = paired-engine π** (Chromium + WebKit captures of the composited
  page pixel behind a real glass control), never a single-engine green.

---

## 5. a11y / PRM carve

- **`prefers-reduced-motion`** → the `field-drift` animation freezes (the warm
  mesh stays — only the drift stops). Static warm field is still vivid; the
  user just loses the breath.
- **`prefers-reduced-transparency`** → `--field-intensity: 0` so the mesh stops
  drop to transparent and the decoupled `--neutral-0` flat floor shows through
  (the calm opaque legibility floor). The field is a transmissive enhancement, not
  a legibility dependency.
- **`prefers-contrast: more`** → the field is geometry-neutral; prose AA is
  guaranteed by the `--glass-backdrop: light` bucket the chassis already sets on
  the card (`StoryHero.vue:329,379`). The calm `ground` rung keeps mean opacity
  below the "loud protagonist" ceiling so dense-control bands (forms/feedback)
  stay legible — the proportion fence.
- **Worst-case contrast (§L5):** the `ground` chroma is bounded (C ≈ 0.055, not a
  saturated aurora) precisely so glass prose holds 4.5:1 against the brightest AND
  darkest field pixel. `vivid`/`aurora` is reserved for hero surfaces where the
  content is the field, not dense prose.

---

## 6. The DELTA-ASSAY → making `BD.W-PAGE-BACKGROUND` buildable

The spec wave today maps *kinds* and threads the staging seam — correct, but it
rests on the unbuilt warm field. The amendment makes it BUILDABLE:

1. **NEW src artefact:** `src/styles/field.css` (the `ground` warm-mesh recipe) +
   `tokens.css §FIELD` (the spine contract) + `PaperBackdrop` `field` prop. This is
   the warm-mesh primitive the brief says has never been built. (The
   glass-material amendment scoped this to `paper.css`; lift it to its own
   `field.css` since it's now the universal ground, not a paper variant.)
2. **NEW demo helper:** `sectionColorToFieldSpine(n)` in `aurora-hero.ts` (the
   per-route registry, derived — not bespoke).
3. **Mount:** `<PaperBackdrop field>` at `AppShell.vue:251` (universal ground) +
   the chassis writes `[data-field-palette="cat-<id>"]` per route.
4. **Reconcile:** `heroAuroraConfig` reads the `--field-stop-*` spine so Aurora and
   the mesh share one palette (kills the dup; `BD.W-AUR-VIVIDNESS` resolves here).

### The born-RED painted-pixel gate (`tests-visual/page-background.spec.ts`)

The flat-page condition is born-RED TODAY (live-measured C 0.0029). The gate's
cardinal rule — **sample the COMPOSITED page pixel behind a REAL glass/viz
surface, never a hardcoded inline field, never `getComputedStyle` of the flat base
token, never the WebGL canvas (it reads transparent — proven above).** Use a
full-page screenshot → `getImageData` of the field region BEHIND the glass control:

| # | assert | born-RED on HEAD | GREEN when |
|---|---|---|---|
| **G1 field-chroma-floor** | mean OKLab chroma of the painted field region ≥ **0.045** (ground floor; vivid ≥ 0.10) | C 0.0029 (live) | the warm mesh paints |
| **G2 warm-hue-bind** | the field's dominant hue ∈ [16,110] (warm); ZERO field pixels in the [180,270] purge band above the chroma floor (substrates: only the CENTER may, edges warm) | flat cream (no hue) | the spine is warm |
| **G3 non-uniform** | spatial luminance variance of the field region > floor (real structure to refract — a flat fill has variance ≈ 0 and REDs) | flat plate, var ≈ 0 | mesh stops vary |
| **G4 dark-warm-luminous** | dark-mode field mean C ≥ 0.045 AND NOT gray (the warm floor) | C 0.0028 @ L 0.146 (live) | warm dark mesh |
| **G5 glass-reads-live** | the composited `.input-pill`/`.feedback-tone` region differs from the same surface over a flat plate (the blur has live input — morphism is PERCEPTIBLE) | identical (nothing behind) | field is live |
| **G6 prose-AA** | body text clears 4.5:1 over the calm field, both modes | — | bucket holds |
| **G7 proportion** | field mean opacity below the loud-protagonist ceiling (dense bands read calm-live, not aurora-loud) | — | ground rung |
| **G8 anti-evasion self-test** | the gate FAILS on a flat-base field AND on a hardcoded inline field, PASSES on the real composited mesh (proves it reads painted pixels, not the base token) | — | self-test |

**Surfaces:** `/forms/select`, `/forms/inputs`, `/containers/dialog`,
`/feedback/alert`, `/substrates/aurora`, `/substrates/blob`, `/display/buttons`,
BOTH modes. Born-RED by construction (all flat at C ≈ 0.003 today). NO source-green
close — the painted π is the binding truth.

---

## 7. Gestalt — the bar

Open `/forms/select` + `/substrates/*` + `/display/buttons` and judge: is there a
**vivid warm field** behind the glass/viz, both modes, no teal? Today: NO — flat
cream at C 0.0029, the glass floats over nothing, the input pills read as flat
cream pills (screenshot-confirmed). After: every route wears its own warm-mesh
plenum (forms warm-indigo, substrates warm-edged aurora-blue, feedback ruby-warm),
the glass refracts a live drifting field, the dark mode is warm-luminous not gray —
and the front-door heroes push to `vivid`/`aurora` for the cartoon-technicolor
punch. The §3 colorful-field half of the iOS-27 bar is finally REAL, sampled on
painted pixels, not faked by a hardcoded spike.
