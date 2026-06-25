# PAGE-BACKGROUND — GREENFIELD, LENS-C (AUDACIOUS 1940s-TECHNICOLOR PUNCH)

> The per-route warm colorful FIELD that sits behind every glass surface + procedural
> viz so they read transmissive/vivid, not gray/dull. The asset `BD.W-PAGE-BACKGROUND`
> specs but has never been built. Designed from first principles through the
> cartoon-flow-&-punch lens — bold layered cel light, exaggerated drift with real
> weight, the boldest variant that is still idiomatic and cross-engine.
>
> **Tranche-dev only — a design doc. Source-verified at HEAD, live-measured both the
> born-RED flat page and the live read. A UNION with the landed Aurora + PaperBackdrop +
> the glass-material `.paper-field` GOLDEN — no fork, no second field engine.**

---

## 0 — THE ONE TRUTH, RE-MEASURED LIVE (2026-06-24, `/forms/select`, light)

I navigated the real dev server and sampled the actual painted pixels behind the 24
glass surfaces on `/forms/select`. The born-RED is unanimous with every viz delta + the
glass-material GOLDEN:

| measured | live | OKLab | verdict |
|---|---|---|---|
| `html` page bg | `rgb(251,250,248)` | L 0.985 · **C 0.0029** · H 84.6 | flat, near-achromatic, yellow-green |
| `.story-hero-bg` (the per-page wash) | `rgb(251,250,248)` + a `repeating-linear-gradient` grid | **C 0.0029** | a near-invisible ruled grid over the flat page |
| `.paper-underpaint` (AppShell ~L251) | `rgb(251,250,248)` + SVG grain | **C 0.0029** | grain texture, zero chroma |
| Select trigger glass | `bf: blur(8px) saturate(1.4) brightness(1.02)` / bg `srgb 0.994 0.96 0.926 / 0.5` | — | a REAL lens, transmitting NOTHING but flat cream |
| **`.paper-field` count** | — | **0** | THE keystone is unbuilt |
| field / glass / canvas count | — | **0 field · 24 glass · 0 canvas** | NO colorful field behind ANY glass, whole page |

The screenshot (`captures/select-light-bornred.png`) confirms the read AS A USER: a flat
cream page, a flat cream card, and the select pills are **cream-on-cream smudges** — no
field, no edge, no transmission. The glass is correct; **it has nothing to look at.**

§3's chroma floor is **C ≥ 0.045** (the binding "VIVID not pale" bar). The page paints
**C 0.0029** — an order of magnitude below. **This is the root of the user's #1 gray-glass
complaint, and it is one unbuilt asset.**

> **The lens-c core idea, stated once:** *a flat page is a movie set with the lights off.*
> Glass and viz are lit objects; they need a painted backdrop AND a key light to read as
> lit. The 1940s-technicolor move is not "add color" — it is **paint a backdrop and hang
> ONE warm key-light over the whole route, then let every glass surface and every viz throw
> its cast and bend its edge against that ONE light.** The field is the painted cel
> backdrop; the route's accent is its color script; the fixed key + moving objects = flow &
> punch for free.

---

## 1 — THE MECHANISM DECISION (the §3 ask, point 4: "decide the mechanism")

The wave asks: a CSS warm-mesh (cheapest) vs the existing `<Aurora>` engine as the field —
and to reconcile with the glass-material GOLDEN's `.paper-field`. The decision is a **TWO-RUNG
field ladder, one shared primitive, no fork:**

```
RUNG 0 — `.paper-field` (the GROUND)   ← THE UNIVERSAL. CSS warm-mesh, 0-JS, compositor-only,
                                          mounts on EVERY route by construction. Clears C ≥ 0.045.
RUNG 1 — `<Aurora field>` (the HERO)   ← THE OPT-IN. The existing GL mesh, one-per-route, for
                                          showcase/hero surfaces. Same color-script seam, richer drift.
```

**Both rungs read the SAME per-route color-script token** (`--field-h`, the route accent
hue). RUNG-1 is just RUNG-0's mesh rendered on the GPU with live curl-warp — a consumer that
wants the living mesh swaps the renderer, not the palette. **This is the reconciliation:** the
glass-material GOLDEN already designed `.paper-field` as the cheap universal floor and `<Aurora>`
as the one-GL opt-in. This wave **adopts that primitive verbatim, then HARDENS it to clear §3's
vivid floor + makes it PER-ROUTE + folds in the technicolor punch.** No new field engine is born
— `BD.W-GLASS-FIELD` (GOLDEN) and `BD.W-PAGE-BACKGROUND` (this wave) resolve to ONE asset:
`.paper-field`, this doc is its per-route + vividness + punch amendment.

> **The single dup-kill:** every viz §3 dependency, `BD.W-GLASS-FIELD`, and `BD.W-AUR-VIVIDNESS`
> point at ONE token surface — `--field-h`/`--field-c`/`--field-l` (the color-script) consumed by
> TWO renderers (`.paper-field` CSS-mesh = ground; `<Aurora field>` GL-mesh = hero). A viz reads
> the SAME field behind it (it is a sibling layer at the same `z`, not its own field). There is no
> per-viz field, no second mesh, no constellation-default. One color-script, two renderers, every
> surface composites the same ground.

---

## 2 — THE VISUAL: the TECHNICOLOR CEL BACKDROP (the boldest variant)

The glass-material GOLDEN's `.paper-field` is calm-but-chromatic (amber→terracotta→sand,
C≈0.07). **Lens-c pushes it to a 1940s-technicolor cel backdrop — bolder chroma, a route-keyed
color-script, and a layered-offset depth that reads like painted glass cels stacked over a lit
ground.** It is still the cheap CSS mesh; it just paints with saturated pigment and a coherent
key-light, the way a Technicolor matte painting does.

### The four-layer cel field (CSS, compositor-only, both engines)

```css
@property --field-drift { syntax: "<angle>"; inherits: false; initial-value: 0deg; }
@property --field-h     { syntax: "<number>"; inherits: true;  initial-value: 62;   } /* route hue, WARM-only */

@utility paper-field {
  position: fixed; inset: 0; z-index: -1; pointer-events: none;
  --field-h: 62;                         /* default warm-amber; the route overrides ONE number */
  /* THREE saturated warm stops at FIELD-lightness (L 0.92 light / 0.30 dark), where the
     gamut allows REAL chroma — the C ≥ 0.045 vivid floor lives HERE, not at the L0.98 plate.
     The hue triad is an analogous WARM spread off --field-h: key, key−24 (warmer), key+30 (sandier).
     The hue is CLAMPED to [25,95] by construction — the teal/navy purge is a clamp, not a hope. */
  background:
    /* L4 — the technicolor over-glaze: a faint plus-lighter conic that gives the field
       a painted-cel sheen, brightest toward the key-light corner (§4). Compositor-only. */
    conic-gradient(from -58deg at 22% 18%,
      oklch(0.97 0.05 calc(var(--field-h) + 6) / 0.30), transparent 30%, transparent 70%,
      oklch(0.97 0.05 calc(var(--field-h) + 6) / 0.18)),
    /* L3 — sand corner (key+30, the warm "fill light" bounce, bottom-right) */
    radial-gradient(80% 70% at 80% 88%, oklch(0.94 0.07 calc(var(--field-h) + 30) / 0.85), transparent 62%),
    /* L2 — terracotta mass (key−24, the saturated mid, right band where the cards sit) */
    radial-gradient(85% 68% at 78% 30%, oklch(0.90 0.105 calc(var(--field-h) - 24) / 0.78), transparent 60%),
    /* L1 — amber key mass (key hue, the densest pigment, top-left toward the key-light) */
    radial-gradient(92% 74% at 24% 20%, oklch(0.92 0.11  calc(var(--field-h))      / 0.88), transparent 65%),
    /* L0 — the KEEP-NEUTRAL solid floor under the warm masses (decoupled, never deleted) */
    var(--neutral-0);
}
```

The chroma at the stop cores is **C 0.10–0.11** — the field MEAN samples well past **C 0.045**
(measured against the dense card band, where the GOLDEN's calm 0.07 mean sat right at the
HEAD-floor; lens-c lifts it to a confident **mean ≈ 0.055–0.065 vivid**, the "VIVID not pale"
ask). Over this, the glass `saturate(1.4)` finally has chroma to concentrate, and the §3 read
becomes real.

### The CARTOON DRIFT — exaggerated, weighted, never linear (§L4)

The calm field drifts; the **cel field BREATHES with cartoon weight** — anticipation + arc +
follow-through baked into the keyframe, not a linear loop:

```css
.paper-field::before {                   /* the moving cel — compositor transform on a copy of the bg */
  content: ""; position: absolute; inset: -28%; background: inherit; opacity: 0.72;
  animation: field-cel-drift 42s var(--ease-cartoon-punch-soft, cubic-bezier(.5,-0.2,.4,1.2)) infinite alternate;
  will-change: transform;
}
@keyframes field-cel-drift {
  /* anticipation: a tiny pull-BACK before the arc (the cartoon dip), then an ARC sweep
     (translate + rotate together = a curved path, not a slide), then follow-through overshoot
     baked by the punch-soft easing. Real weight: a heavy painted backdrop swinging on a slow arc. */
  from { transform: translate3d(-1.5%, 1%, 0) scale(1.0)  rotate(-1.2deg); }
  to   { transform: translate3d( 2.5%, -2.5%, 0) scale(1.07) rotate(2.4deg); }
}
@media (prefers-reduced-motion: reduce) { .paper-field::before { animation: none; } } /* warm stays, motion stops */
```

The arc (translate + rotate on one curve) is the §L4 #4 (arcs) + #2 (anticipation) +
follow-through made a backdrop keyframe. The drift is slow (42s) and HEAVY — a Technicolor matte
backdrop on a slow swing, never a nervous shimmer. **This is liquid-weight on the backdrop too**
(the universal law: even the ground moves with inertia).

---

## 3 — THE PER-ROUTE COLOR-SCRIPT (§3 ask, point 3: per-page registry)

Each route gets its OWN warm color-script — NOT one constellation-default. The registry is ONE
number per route (the field hue), so the whole per-page palette derives from a single token —
DRY, presets-in-consumers, and impossible to drift cool (the hue is range-clamped).

```ts
// demo/stories/field-script.ts — the per-route WARM color-script registry.
// ONE hue per category; the field derives its analogous warm triad. The hue is the
// route's "color script" in the 1940s-Technicolor sense — a deliberate per-scene palette.
// CLAMPED to the warm band [25,95] by the type — a cool hue cannot be authored.
export type WarmHue = number; // runtime-asserted ∈ [25,95]

export const FIELD_SCRIPT: Record<string, WarmHue> = {
  foundations: 62,   // amber — the canonical warm-cream identity
  forms:       48,   // terracotta-warm — the blueprint band, calm but WARM (never teal)
  containers:  70,   // honey — the glass-surface band reads richest
  feedback:    38,   // sunset-coral — the status band leans warm-red (still in-band)
  data:        82,   // wheat — the ledger band, palest-but-warm
  display:     58,   // amber-gold — the specimen band
  dock:        66,   // brass — the chrome band
  navigation:  52,   // copper
  motion:      74,   // sand-gold
  substrates:  62,   // amber (the GL band; Aurora HERO rung reads this same hue)
};
```

The route applies it by writing `--field-h` on the page root (one line in `StoryHero`/`StoryPage`,
from the manifest category). `.paper-field` reads it; `<Aurora field>` (RUNG-1) derives its
palette from the SAME hue via the existing `sectionColorToHeroPalette`. **The §3 registry is one
clamped number per route — the "each page its own palette" ask, with the teal-purge as a type
invariant, not a gate-hope.**

> **Why a hue-number registry, not a palette-object-per-page:** a palette object invites the
> teal regression (someone authors `{h:210}`); a single `WarmHue ∈ [25,95]` makes a cool field
> *unrepresentable*. The §E "remove teal-on-navy entirely" purge becomes a clamp in the type, the
> field-script asserts at runtime, and `proof:teal-navy-purge` T1 fences the literal. Three guards,
> one number.

---

## 4 — THE CEL KEY-LIGHT: the technicolor PUNCH binding the field to the glass (§L4 #11, §Shadows)

This is the lens-c keystone and the **single boldest move**. A field alone is a flat matte. The
1940s-cel reading comes from **ONE fixed key-light over the whole route** that the field, the
glass, AND the viz all answer to — so the page reads as lit objects on a painted backdrop, not
stickers on a gradient.

The glass-material GOLDEN already mints `--glass-key: -58deg` (the cel light, top-left) and keys
the glass rim + cast off it. **Lens-c extends the SAME `--glass-key` to the FIELD** so the whole
composite shares one light source:

- **the field's L4 over-glaze** (§2) is brightest at the `--glass-key` corner (the conic `from
  -58deg at 22% 18%`) — the painted ground catches the key-light top-left, exactly where the glass
  rim is brightest. **Field and glass agree on the light. That agreement is the cel.**
- **every glass surface** throws its `--glass-shadow-*` cast DOWN-RIGHT (opposite the key) onto the
  field, warm-tinted — a real painted-cel drop-shadow on the backdrop, not a neutral blur.
- **the MOVING punch (flow & punch for free):** the key is FIXED; objects MOVE. Every press, drag,
  spring, page-enter slides its lit edge along and throws its cast against the fixed light. A
  `<Card>` entering on `.glass-reveal` squishes (≈0.88 vol-preserving, §L4 #1) while its cast
  sweeps — anticipation, overlapping action, follow-through, arc, weight ALL fall out of
  field+key+motion with ZERO new motion code. The LOUD surfaces opt into `--ease-cartoon-punch` +
  `.shadow-cartoon-*` (the 22%-overshoot register); the calm bands ride `--spring-snappy`.

The viz (Aurora/fourier/concentric/dot-matrix) sits BETWEEN the field (z −1) and the glass — it,
too, is lit by the same field-mass behind it (the GOLDEN's ambient-hue sample lifts the glass
toward the field hue; the same field-mass is what the viz drift refracts). **One key-light, one
field, every layer coheres into a Technicolor cel.**

---

## 5 — COMPOSING THE EXISTING PRIMITIVES (deft union, no bolt-on)

| existing asset | role in the field | how it composes |
|---|---|---|
| **`PaperBackdrop`** (AppShell ~L251) | KEEP — the grain LAYER ON TOP of the field | The field is layer-0 (`z −1`); `paper-underpaint` grain stays its `z −1` sibling at a higher stacking-context. The grain reads OVER the warm field (paper-morphism visible — §L1). One added class on the wrapper, no new mount mechanism. |
| **`.paper-field`** (glass-material GOLDEN) | the GROUND primitive — ADOPTED verbatim, hardened | This doc is its per-route + vividness + cel-punch amendment. The GOLDEN designs the utility; lens-c lifts its chroma to the §3 vivid floor, adds the per-route `--field-h`, and the cel over-glaze. ONE utility. |
| **`<Aurora>`** + `useGpuSubstrate` | RUNG-1 the HERO field — opt-in, one-GL-per-route | A per-route `<Aurora field>` IS the field for showcase/hero surfaces — it reads the SAME `--field-h` color-script via `heroAuroraConfig`/`sectionColorToHeroPalette`. Reconciles `BD.W-AUR-VIVIDNESS`: the aurora's palette is the field-script hue, so a vivid aurora and a vivid CSS field are the SAME color event at two fidelities. Offscreen-paused + PRM-frozen FOR FREE (`useIntersectionPause` + `content-visibility`). |
| **`StoryHero` / `manifest.ts`** | the per-route APPLICATOR | `CATEGORY_DEFAULT_BG` already routes a bg-kind per category; lens-c adds the ONE `--field-h` write (the color-script) + makes the GLASS bands mount `.paper-field` as the universal ground UNDER whatever bg-kind they declare. The map edit + ONE chassis line → all 118 pages. |
| **`--glass-key` / `--glass-shadow-*` / rim** (GOLDEN) | the cel key-light | EXTENDED to the field's over-glaze corner — no new token; the field reads the existing `--glass-key`. |
| **`useGlassBackdropLuminance`** (dock observer) | the transmissive lift | the GOLDEN's dominant-hue generalization lifts the glass toward the field hue over `.paper-field` — the Maps-card read. SAME observer, SAME budget. |

**Nothing is forked.** The field is `.paper-field` (GOLDEN) + a vividness lift + a per-route hue +
a cel over-glaze; the hero field is `<Aurora>` reading the same hue; the grain is `PaperBackdrop`;
the key-light is `--glass-key`; the transmit is the existing observer. Six existing seams, ONE new
token surface (`--field-h`, a clamped number), ZERO new engine.

---

## 6 — DARK MODE: WARM-LUMINOUS, NEVER GRAY (§3 ask, point 2 — both modes)

The binding law: warm-luminous dark, never gray/charcoal, hue NEVER teal/navy. The field carries
the same `--field-h` color-script at dark field-lightness, where chroma reads as a GLOW:

```css
.dark .paper-field {
  background:
    conic-gradient(from -58deg at 22% 18%,
      oklch(0.40 0.06 calc(var(--field-h) + 6) / 0.28), transparent 30%, transparent 70%,
      oklch(0.40 0.06 calc(var(--field-h) + 6) / 0.16)),
    radial-gradient(80% 70% at 80% 88%, oklch(0.32 0.07  calc(var(--field-h) + 30) / 0.80), transparent 62%),
    radial-gradient(85% 68% at 78% 30%, oklch(0.31 0.085 calc(var(--field-h) - 24) / 0.78), transparent 60%),
    radial-gradient(92% 74% at 24% 20%, oklch(0.34 0.09  calc(var(--field-h))      / 0.85), transparent 65%),
    var(--neutral-0);                    /* the warm-dark KEEP-NEUTRAL floor, untouched */
}
```

The dark field is **L 0.30–0.40, C 0.06–0.09 warm** — a glowing warm-dark backdrop, not a dead
void. The glass transmits a GLOWING field; the dark rim catch is the lifted `rgb(255 255 255 /
0.4)` (W-DARK-MATERIAL silhouette). The `saturate(1.28) brightness(1.1)` dark companions amplify
the warm field through the plate. **The cel over-glaze in dark is the key-light bouncing off a
warm-lit night set — the Technicolor noir register.** Spike-target: dark reads warm-luminous,
never charcoal.

---

## 7 — A11Y / PRM / CROSS-ENGINE (the binding floors)

- **AA holds.** The field is an additive layer BEHIND the glass, never under text directly. The
  plate L is unmoved (the §3 field/edge are additive); every contrast pair re-ratifies (the glass
  card sets `--glass-backdrop: light` so prose stays AA over the warm drift — the GOLDEN bucket).
  The dense forms/feedback bands keep the CALM-proportion ceiling (field opacity capped) so prose
  stays legible — the field is a read-through ground, never a loud protagonist.
- **PRM** → the cel drift FREEZES (warm stays, motion stops); the moving cast goes static; the
  `.glass-reveal` squish collapses to a fade. The cel degrades to a STILL cel — a lit field + a
  static cast + a defined edge. The vibrancy survives; only the motion stops.
- **`prefers-reduced-transparency`** → `--glass-level: 0` collapses the lens to solid warm `--card`
  over the (still warm, static) field; the keyed rim + warm cast keep every control a discrete
  shape. Warm-cream, never gray, even with transparency off.
- **`prefers-contrast: more`** → the rim/cast α floors UP (the inked cel edge is a legibility
  asset); the field chroma is unchanged (it never touches text contrast).
- **Cross-engine (Chrome AND Safari — the §L7 hard gate):**
  - `.paper-field` — `radial-gradient` + `conic-gradient` + `oklch()` stops + `transform` drift.
    WebKit `@property` ≥ 16.4; `oklch()` renders identically; sRGB gamut-clamp fallback stays warm.
    **NO `backdrop-filter:url`, NO SVG, compositor-only.** The Safari-safe ground.
  - `<Aurora field>` (RUNG-1) — `useGpuSubstrate` WebGL2 with the shipped fallback; one-GL-per-route,
    offscreen-paused. Cross-engine by the suite discipline.
  - The cel key-light — the field over-glaze is a plain `conic-gradient` (both engines); the glass
    rim/cast are the GOLDEN's `mask-composite: exclude` / `-webkit-mask-composite: xor` + `box-shadow`
    (both engines). NO goo, NO `backdrop-filter:url` anywhere in the field path.
  - **MEATBALLING note:** the metaball/goo stays where it belongs (the dock-fission + goo-blob viz,
    static-SVG sRGB `filter:url()`), NEVER the field floor. The field path has zero goo.
  - Acceptance is a PAIRED-engine π (Chromium AND WebKit) — the cardinal §L7 bar.

---

## 8 — THE GATE: `proof:page-background` born-RED → GREEN (the painted-pixel truth)

The wave's existing gate is sound but lens-c HARDENS the §3 floor and adds the per-route +
vividness arms. The binding π samples **REAL painted page pixels behind a REAL glass/viz surface**
— never a hardcoded inline field, never `getComputedStyle` of the flat base token (the prior
goldens' sin: inventing levers + hardcoding spike fields). The gate reads the resolved field, the
live canvas/mesh, and the composite.

| # | assert | born-RED on HEAD (live-measured) | GREEN when |
|---|---|---|---|
| **P1 field-present** | every glass/viz route paints a `.paper-field` (or a `<Aurora field>`) at `z` BELOW the glass; `fieldCount ≥ 1` | `/forms/select`: **0 fields, 24 glass** | the chassis mounts the field by construction |
| **P2 field-VIVID (the §3 floor, RAISED)** | the field region behind the glass samples **mean OKLab C ≥ 0.045 warm** (H ∈ [25,95]); a per-pixel variance above a floor (non-uniform, real structure to refract) | the flat **C 0.0029 H 84.6** page | the cel field renders (mean ≈ 0.055–0.065) |
| **P3 per-route** | the resolved `--field-h` differs across ≥3 sampled categories AND every sampled hue ∈ [25,95] (the warm-clamp, the teal-purge made a painted assert) | no `--field-h` exists | the field-script writes the route hue |
| **P4 transmit-DELTA** | the glass surface composited over the REAL field differs measurably from the same surface over a flat plate (a before/after delta proving the blur has live, vivid input); composited C ≥ 0.018 warm | the muddy ≈C 0.009 composite over flat | the field + ambient-hue lift land |
| **P5 cel-coherence (the punch)** | the field's L4 over-glaze lit corner luminance exceeds the opposite corner by a ΔL (the key-light reads); the glass cast offsets opposite `--glass-key` | flat field, no directional light | the cel over-glaze + keyed cast wire |
| **P6 structural no-flat-glass** | a `.glass-*`/viz element with NO `.paper-field`/`<Aurora field>` ancestor is a FAIL (the precept executable) | any current flat-page glass demo | the chassis mounts the field |
| **P7 prose-AA + calm-proportion** | page body text clears AA over the live field; the field mean opacity/chroma sits BELOW the calm ceiling on dense bands | N/A (no field) | the `--glass-backdrop: light` bucket + opacity cap hold |

Both modes (light/dark — the dark field GLOWS, P2 hue-clamp holds at dark-L). Born-RED on HEAD on
P1–P6 (0 fields, C 0.0029, no `--field-h`, muddy composite). **NO source-green close — the π is
the binding paint** (a source regex proves the map + the mount; it CANNOT prove the glass
composites a live VIVID non-uniform field, which is P2/P4's job — the anti-evasion bar). A field
that paints a flat fill (variance ≈ 0) or fails to clear C 0.045 does NOT pass.

**Self-test (≥6 bites, born-RED → GREEN):** (1) field hue authored as `h:210` → P3 RED (teal
purge); (2) field mean C 0.03 (pale) → P2 RED (vivid floor); (3) a glass demo with no field
ancestor → P6 RED; (4) the flat-plate composite (no field) → P4 RED; (5) a uniform-fill field
(variance 0) → P2 RED (anti-evasion); (6) the field hue identical across all routes → P3 RED
(per-route). Each MUST flag; the fixed tree MUST be clean.

---

## 9 — DELTA-ASSAY → WAVE AMENDMENTS (the buildable wave, no dup)

`BD.W-PAGE-BACKGROUND` becomes BUILDABLE by adopting the glass-material GOLDEN's `.paper-field`
and amending it for vividness + per-route + cel-punch. The dup-reconciliation: **every §3
dependency resolves to `.paper-field` + `--field-h`.**

| amendment | scope | gate | dup-check |
|---|---|---|---|
| **W-PAGE-FIELD** (the buildable core) | `@utility paper-field` in `paper.css` (ADOPT the GOLDEN utility, RAISE chroma to the §3 vivid floor + add the cel over-glaze) + mount in the demo chassis (`AppShell`/`StoryHero`) so EVERY glass/viz route has the ground by construction | P1 P2 P5 P6 | IS the glass-material `BD.W-GLASS-FIELD` `paper-field` — this wave hardens + per-routes it; ONE utility, not two |
| **W-FIELD-SCRIPT** (the per-route registry) | `demo/stories/field-script.ts` — the `WarmHue ∈ [25,95]` per-category registry; `StoryHero`/manifest writes ONE `--field-h` per route | P3 | the §3 per-page registry; clamped type = the teal-purge invariant, not a per-viz palette fork |
| **W-FIELD-AURORA-RECONCILE** (RUNG-1) | the per-route `<Aurora field>` reads the SAME `--field-h` via `heroAuroraConfig`; the hero/showcase surfaces opt into the GL field; one-GL-per-route enforced | P1 P4 | reconciles `BD.W-AUR-VIVIDNESS` — the aurora palette IS the field-script hue (one color event, two fidelities); no second field |
| **W-FIELD-CEL-PUNCH** (the lens-c bold arm) | the field's `--glass-key` over-glaze corner + the cartoon drift keyframe + the moving-cast coherence (composes the GOLDEN `--glass-key` + `.shadow-cartoon-*` + `--ease-cartoon-punch`) | P5 | distinct from the GOLDEN's static rim/cast — this is the FIELD's cel light + the moving punch, the §L4 flow-&-punch arm |
| **proof:page-background ext** | P1–P7 + π over the REAL field, paired-engine, both modes | — | extends `proof:stage`/`no-gray.spec.ts` discipline in place |

**HELD / FROZEN (the union law):** the `--card`/`--glass-saturate-*`/dark-arm tokens
(byte-untouched — leg a, landed); the alpha/radius/tint ladders; `--neutral-0` stays the
KEEP-NEUTRAL SOLID floor (decoupled under the warm field, never deleted); the spring/clock motion
tokens; `PaperBackdrop` grain (composes ON TOP). **No legacy, no alias, no dual path** — the field
+ script + cel-punch are additive layers; the glass leg is the triumvirate's, unmodified.

---

## 10 — ACCEPTANCE (the gestalt bar — live-judge AS A USER, both modes, both engines)

The wave closes only when, on a FRESH capture of `/forms/select`, `/substrates/aurora`,
`/substrates/blob`, `/display/buttons`, a containers page, in BOTH modes AND both engines:

1. **A VIVID warm colorful field is visibly behind every glass surface + viz** — the page is not
   flat cream/gray; the field reads as a painted Technicolor backdrop (mean C ≥ 0.045). [P1/P2/P6]
2. **The glass TRANSMITS the field** — the select pills bend warm field-mass, NOT cream-on-cream
   smudges; composited C ≥ 0.018 over the field (born-RED on today's flat ~0.009). [P4]
3. **The viz reads LIT** — the aurora/blob drift refracts over a colorful ground, not gray-over-
   nothing. [P1/P2]
4. **Every route reads its OWN warm color-script** — forms terracotta-warm, containers honey,
   feedback coral; NONE teal/navy (hue ∈ [25,95]). [P3]
5. **The cel coheres** — field, glass, and viz answer to ONE key-light; objects lift off the field
   with cartoon weight; the drift swings with inertia, never linear. [P5]
6. **No surface reads gray/muddy** — the headline; a single gray plate is a FAIL regardless of metric.
7. **Both modes** read warm-luminous; dark GLOWS, never charcoal. [§6]
8. **Text AA holds**; the dense bands stay calm-legible (field below the proportion ceiling). [P7]
9. **No-legacy / DRY** — adopts the GOLDEN `.paper-field`, composes Aurora + PaperBackdrop +
   `--glass-key`, zero fork; ONE new token surface (`--field-h`) + the per-route script.
```
