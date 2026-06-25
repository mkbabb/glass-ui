# birthdaycolor.com — the interactivity distillation + the aurora-supersedes proof

**Lane** BD viz-framework · **Status** AUTHORED 2026-06-22 · **Branch** prototype/liquid-dock ·
**Scope** PLANNING/RESEARCH ONLY — zero `src/` edits ·
**Grounded against** `src/components/custom/aurora/composables/{cursorModel,useCursorInteraction,color}.ts` +
the BD waves `BD.W-COLOR-{CARD,PROTAGONIST}` / `BD.W-SEED-MORPH` / `BD.W-AUR-ALBUM` at HEAD ·
**Reads with** `docs/tranches/BD/viz/research/aurora.md` (the 12-idea brainstorm + the 4-axis better-it table) +
`docs/tranches/BD/union/audit/birthdaycolor-glass-audit.md` (the glass-coverage law).

> The user's edict (binding): *"the above birthdaycolor-like interactivity (though our extant aurora
> likely supersedes it)."* This doc PROVES the supersession against the shipped aurora code, then
> distills the SPECIFIC birthdaycolor interactions to ADOPT (not just better) + the Safari-safe shape.

---

## 0. TL;DR

birthdaycolor.com is a **date→color generative ritual**: pick a birthday, it derives one Pantone-style
color, and a soft animated WebGL noise-gradient field crossfades to it behind an opaque Pantone card
(swatch + hex + Japanese name + keywords), with a faint grain. Its genre (high-confidence; the SPA bundle
is unread — confirm-pass in §6) is the canonical **flowing-WebGL-gradient** class: a Perlin/simplex-noise
field in a fragment shader interpolating between two-to-few palette stops, calm-morphed on selection.

**The supersession is real and already-coded on three of four axes.** Aurora is a strict SUPERSET of
birthdaycolor's field (multi-nuclei fbm + the −5/3 turbulence cascade + 8 painterly mediums + OKLCh
shorter-hue crossfade ⊃ their single noise blob + sRGB `mix()`), AND it already ships a RICHER
interactivity surface (velocity-reactive flow burst + cursor-as-light + full nucleus CRUD) than
birthdaycolor's *inert-post-select* field. The ONE axis where birthdaycolor genuinely teaches us is its
**serene ONE-protagonist focus** — the whole page IS that one color — which aurora's multi-nuclei
richness can read busy against. That gap is already specced as three BD waves
(`BD.W-COLOR-PROTAGONIST` / `BD.W-COLOR-CARD` / `BD.W-SEED-MORPH`).

**Verdict: aurora supersedes birthdaycolor on field, color-space, derivation, AND interactivity; we ADOPT
birthdaycolor's date→color *ritual* + its calm one-color *focus discipline* (the `single-hue` mode + the
veil color-card), not its engine.** Everything ships Safari-first on the shader/own-pixel path — never the
WebKit-broken `backdrop-filter: url()`.

---

## 1. The birthdaycolor technique, re-distilled (what it actually does)

| Layer | birthdaycolor.com | Confidence |
|---|---|---|
| **Background field** | a full-viewport animated WebGL noise-gradient — a Perlin/simplex-displaced two-to-few-stop palette field in a fragment shader, slow temporal drift (the "flowing WebGL gradient" genre, cf. alexharri.com deconstruction [S1]) | HIGH (genre); shader source unread |
| **Color derivation** | date → one dominant Pantone-style hue → a fixed analogous spread (Colorstrology lineage [S2]: astrology+numerology+color-theory table) | HIGH |
| **Crossfade on select** | a calm morph between the old field and the new palette — an **sRGB `mix()`** between stops (the genre default; greys the warm→cool midpoint) | MED-HIGH (genre default; confirm in §6) |
| **Grain** | a subtle film-grain overlay over the field (sells the "physical color card" feel) | HIGH (visible) |
| **Card UI** | an **OPAQUE** Pantone card on top: swatch + hex + name + Japanese poetic label + keywords + a short meaning | HIGH (visible) |
| **Interactivity** | **near-zero in-field**: the field is a calm autonomous drift, *inert after selection* — the interaction is the FORM (the date picker), not the field. No pointer-reactive field life, no click-to-bloom, no drag. | HIGH |
| **Export** | wallpaper + card export (phone/desktop, sharp/rounded) | HIGH |

**The essence in one line:** birthdaycolor's power is the **ritual** (a date becomes a personal color) +
the **serenity** (one color, calmly morphed, legibly named) — NOT the rendering. The field is deliberately
quiet so the COLOR is the protagonist.

---

## 2. The supersession proof (grounded in shipped aurora code)

The four-axis better-it (`research/aurora.md §2`) restated against the actual source, with the code cite:

| Axis | birthdaycolor | aurora — shipped or one-wave-away | Code-grounded proof |
|---|---|---|---|
| **A1 · crossfade color-space** | sRGB `mix()` → violet→teal **greys** at t≈0.5 | OKLCh **shorter-hue** seed-morph: per-stop `interpolateHue(fromH, toH, t, "shorter")` + `gamutMapStop` per in-flight frame | `composables/color.ts` (`deriveHue`, `HARMONY_METHOD → "shorter"`), `BD.W-SEED-MORPH` C2 (the sRGB-midpoint anti-pattern is a gate-RED bite). Chroma holds across the warm→cool arc; sRGB dips at the midpoint. |
| **A2 · field structure** | flat multi-stop noise-gradient, no eddy/texture | multi-nuclei softmax-Gaussian field + −5/3 Kolmogorov turbulence cascade + 8 painterly mediums (`smooth…vangogh…kuwahara`) | `atoms.ts` `nucleiPrior`, `shaders/mediums.glsl.ts`, `RESEARCH.md §4` (radial power-spectrum β recovers −1.67; a flat gradient rolls off β≪−2). |
| **A3 · derivation richness** | one hue → fixed analogous table | `deriveAurora(seed, {harmony})` — a GENERATIVE fn of seed × harmony × medium; + the album-art extractor `deriveAuroraPalette` (OKLCh-histogram dominant hue) | `color.ts:182 deriveAurora`, `BD.W-AUR-ALBUM` `deriveAuroraPalette`. Not a lookup table — a parameterized function. |
| **A4 · interactivity** | **inert post-select** | the field is ALIVE under the pointer: cursor-as-light bias + idle orbit + a velocity-reactive flick BURST + per-move velocity easing + full nucleus CRUD (spawn/drag/remove) | `cursorModel.ts` (`injectCursorVelocity`/`advanceCursor`/`burst`), `useCursorInteraction.ts` (spawn alt-click, drag, shift/right-click remove, anisotropic hit-test). **birthdaycolor has NONE of this.** |

**The two genuine A4 mechanics, in code (the supersession is not aspirational — it ships):**

1. **The velocity-reactive flick burst (`cursorModel.ts`).** A fast pointer flick injects a transient
   `burst` (`injectCursorVelocity`: `burst = min(1, burst + speed·4)`) that decays over ~1s
   (`CURSOR_BURST_DECAY_PER_FRAME = 0.96`), distinct from the steady attraction `strength`
   (`CURSOR_STRENGTH_LERP = 0.18`, `CURSOR_DECAY_PER_FRAME = 0.992` ≈ 2s half-life). The pointer delta is
   clamped (`CLAMP = 0.12`) so a tab-in/scroll teleport doesn't spike. The whole interactive stack freezes
   at `tempo = 0` (the single PRM/pause suppression seam) — `advanceCursor` multiplies the retained
   fraction by `k = clamp(tempo)`, **never scales `uTime`** (the W11 discipline: scaling the clock makes
   the flow jump; the integration STEP scales, the absolute clock keeps marching).

2. **Full nucleus CRUD + anisotropic hit-test (`useCursorInteraction.ts`).** The field is editable:
   alt-click SPAWNS a nucleus (`approximatePaletteId` seeds its hue from the field at that point), drag
   MOVES it (pointer-capture), shift/right-click REMOVES it (preserving ≥1). The hit-test mirrors the
   shader's `nucleiField` exactly (`anisotropicD2` — the same elongation/angle local-frame distance), so
   CPU hit-testing and the painted field AGREE. birthdaycolor's field cannot be touched at all.

**The honest caveat (record it — the ONE thing birthdaycolor does better):** birthdaycolor's STRENGTH is
its **serene legibility** — one color, the whole page, calmly named. Aurora's multi-nuclei richness can
read busy where birthdaycolor reads serene. The match is the **`single-hue` palette mode** (every stop
holds the dominant hue; only L/C travel — `BD.W-AUR-ALBUM` C3 / `BD.W-COLOR-PROTAGONIST` `mode` default),
capped at the `breathing` motion ceiling (never `drifting`). The better-it is *"aurora can be BOTH"*; the
fence is *"default to the calm single-hue mode for a protagonist surface."*

---

## 3. What to ADOPT from birthdaycolor (the 3 things it teaches — already specced as waves)

Aurora supersedes the ENGINE; birthdaycolor teaches the **product framing**. Three adoptions, each a
COMPOSITION of shipped facilities (no new engine), each already a BD Band-7 wave:

### A · The date→color RITUAL — `<AuroraProtagonist :seed>` (BD.W-COLOR-PROTAGONIST)
The one-prop "the page IS this color" facade. `<AuroraProtagonist :seed="color | imgSrc" :mode :ceiling>`
COMPOSES `<Aurora>` + `deriveAurora`/`deriveAuroraPalette` + the seed-morph crossfade — no second
renderer. `mode="single-hue"` + `ceiling="breathing"` default give birthdaycolor's serene one-color
register out of the box; the consumer supplies the seed (a date→Pantone color in birthdaycolor's case,
presets-in-consumers). **This is the adoption: the calm one-protagonist focus, made a one-prop door.**

### B · The CALM seed-morph — `useAuroraSeedMorph` (BD.W-SEED-MORPH)
The crossfade-on-selection, **bested**: per-stop OKLCh `interpolateHue(…, "shorter")` + `gamutMapStop`
over a SLOW (~600–900ms) breathing clock driven by `useLiquidFlex.drive(t)` off the substrate's own loop
(no new rAF, no new spring). Adopts birthdaycolor's *calm-morph-on-select* feel while fixing its
sRGB-greys-the-midpoint defect (the chroma stays saturated across the arc). PRM seats the TO palette
instantly (a hue shift is not motion).

### C · The Pantone color-card, **veil not opaque** — `<ColorCard>` (BD.W-COLOR-CARD)
The headline better. birthdaycolor's card OCCLUDES the very color it labels (opaque panel on top);
glass-ui's `<Card surface="veil">` over a live `<AuroraProtagonist :seed>` field lets the color READ
THROUGH the card (`<ShowcaseFrame tier="field">` precedent) — the card floats AS the color, not on top of
it. Swatch + hex + name + keyword-chips, all reading ONE source color (the one-color-event rule). **This
is the literal "our glass bests their opaque panel" claim.**

**The grain** (birthdaycolor's fourth layer) is already a glass-ui idiom — the pop-free grain `::after`
(`--paper-clean-texture`, always-present longhand, opacity cross-fade — `proof:glass-cohesion` liquid-hover
arm). No wave needed; the protagonist surface composes the existing grain.

---

## 4. The interactivity DELTA aurora should ALSO land (birthdaycolor-grade, beyond it)

birthdaycolor's field is inert; aurora's is alive. But the BD mandate ("each viz: robust mouse/keyboard
interactivity") plus the supersession ambition want the protagonist-grade modes from `research/aurora.md
§5` wired. The four that directly answer "the page paints under your touch" (each compositor-safe,
PRM-gated, on `usePointerVelocityField` / the substrate clock — NO new rAF):

- **I1 · cursor-as-protagonist (THE birthdaycolor headline-better).** The pointer is a MOVING color source
  — a transient nucleus following the cursor, blooming the cursor-hue into the field locally, then
  diffusing + fading (`expImpulse` decay). birthdaycolor's field never responds; aurora's PAINTS where you
  point. Mechanism: the velocity-reactive burst (already coded) generalized to a color-injecting transient
  `nuclei[]` slot. Bar: a captured drag leaves a fading color trail; PRM → no trail.
- **I2 · flick-to-fling momentum.** A fast flick imparts MOMENTUM to the flow field (C¹ fling, the kf
  `Draggable.decayRest` precedent `useDragMorph` wires). Generalizes the existing `burst`. Bar: post-flick
  field translates + decelerates; a slow drag does not fling (the velocity threshold).
- **I3 · the draggable focal dot (direct-manipulation configurator).** `focalX/Y` (already plumbed to
  `uFlowFocal`) becomes a draggable dot ON the preview canvas — grab it and the prism/sheen anchor follows
  1:1; arrow keys nudge it (the keyboard surface). Bar: dragging re-anchors the bright point.
- **I4 · keyboard interactivity (the mandate gap — aurora has ZERO today).** Arrows nudge the focal,
  `[`/`]` step medium, `+`/`-` step turbulence, `space` cycles motion, `r` re-seeds (→ seed-morph
  crossfade), digit keys jump zone-count. Composes the shipped `useKeyboardShortcuts` (`/keyboard`) — no
  hand-rolled keydown. Every palette-changing key rides `useAuroraSeedMorph` so keyboard reads as liquid +
  a `role="img"` live-region announces the protagonist hue.

(These are aurora's own §5 brainstorm; named here because they are the EXACT axis where aurora moves from
"supersedes birthdaycolor's inert field" to "is the reference for an interactive color field." I1+I4 are
the load-bearing pair — I1 is the headline-better, I4 closes the mandate's keyboard gap.)

---

## 5. The Safari-safe shape (load-bearing — the ABSOLUTE fence)

Every birthdaycolor adoption + every interactivity DELTA ships Safari-first. The fence (from the union
audit + ORCHESTRATOR-NOTES, restated for this surface):

| Mechanism | Safari-safe path | NEVER |
|---|---|---|
| The color field | `<Aurora>` smooth core — WebGL2 (universal) / WGSL primary (Safari 26+, falls to WebGL2) | — |
| The veil card plate | `backdrop-filter: blur()` (own-pixel + backdrop, `-webkit-` prefixed) — WebKit-supported | `backdrop-filter: url(#…)` (WebKit bug 245510, broken) |
| The seed-morph color math | value.js OKLCh + `color-mix`/`oklch()` — universal | sRGB channel-lerp (the greys-midpoint defect, AND a `proof:seed-morph` RED) |
| The grain | the `::after` longhand opacity cross-fade — universal | a `background-image: none↔image` swap (the one-frame pop) |
| `@property` morph scalars | declared with a safe `initial-value` (Safari 16.4+; the rest value is the fallback) | a bare unregistered `var()` (snaps, no interpolation) |
| The cursor/keyboard interactivity | pointer-capture + `usePointerVelocityField` + `useKeyboardShortcuts` (DOM events) — universal | a private rAF (breaks `proof:offscreen-pause`); a hand-rolled keydown |
| PRM | the substrate's live `matchMedia` freeze (`tempo = 0`) — one static frame then park | scaling `uTime` to "slow" motion (the flow jumps) |

**The whole protagonist + color-card surface is the MOST Safari-safe surface in the band** — no goo, no
`feDisplacementMap`, no `backdrop-filter: url()`. It is a smooth-core field + a veil plate + JS color math.
This is deliberate: birthdaycolor's serene register doesn't NEED the refractive/goo mechanics (those are
the dock/blob band), so the protagonist surface ships with zero WebKit-gap dependencies.

---

## 6. Open confirm-pass (before fidelity-lock — not blocking)

The genre + the better-it map are solid regardless, but two birthdaycolor specifics are `[INFERRED]` and
worth a live capture (connected browser → DevTools Network for the bundle, Elements for the canvas/grain
node) before locking the π fidelity bars:

1. **The crossfade color-space** — confirm it's sRGB `mix()` (the genre default the A1/SEED-MORPH better-it
   assumes). If birthdaycolor already does OKLCh, the better-it narrows to A2/A3/A4 (still decisive).
2. **The field shader** — confirm Perlin/simplex two-stop vs a richer field (the A2 better-it assumes
   flat-multi-stop; a richer birthdaycolor field only sharpens the need for aurora's turbulence cascade).

Neither changes the verdict — aurora supersedes on field/color/derivation/interactivity and adopts the
ritual/focus/card — but the capture tightens the A1 π control (the sRGB-control hue-migration frame-series).

---

## Sources
- [S1] alexharri.com — *A flowing WebGL gradient, deconstructed* (the canonical genre reference for the
  noise-displaced two-stop gradient field birthdaycolor is in the class of).
- [S2] Colorstrology (Michele Bernhardt × Pantone) — the date→color derivation lineage birthdaycolor draws
  on (astrology + numerology + color theory over the Pantone database).
- Shipped aurora code: `src/components/custom/aurora/composables/{cursorModel,useCursorInteraction,color}.ts`.
- BD waves: `docs/tranches/BD/union/waves/BD.W-{COLOR-CARD,COLOR-PROTAGONIST,SEED-MORPH,AUR-ALBUM}.md`.
- `docs/tranches/BD/viz/research/aurora.md §2` (the 4-axis better-it) + `§5` (the 12-idea brainstorm).
- `docs/tranches/BD/union/audit/birthdaycolor-glass-audit.md` (the glass-coverage law + the Safari fence).
