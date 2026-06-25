# BD.W-COLOR-PROTAGONIST — `<AuroraProtagonist :seed>`: the one-prop "the page IS this color" field

**Band 7 · depends: BD.W-AUR-ALBUM (the `deriveAuroraPalette` extractor + the immersive register) · BD.W-SEED-MORPH (the seed→palette cross-fade)**

## The defect / the ask

birthdaycolor.com (the union's "REFERENCE SITES TO BEST", birthdaycolor-glass-audit §"The 4 genuine BD waves" item 2) is a generative color-field SPA where THE COLOR IS THE PAGE — a date picks a Pantone color, and the whole page becomes that color's field with a calm morph on selection. SEED-DRAFT Band-7 names the register: "a thin `<Aurora :seed>` 'the page IS this color' register (birthdaycolor best): a one-prop Aurora wrapper that takes a seed color/image and renders the page-protagonist color field (compose Aurora + deriveAuroraPalette, NO new viz)." The audit verdict: glass-ui ships a SUPERSET (`<Aurora>` ⊃ their single Perlin blob; the `/color` OKLCh shorter-hue leaf ⊃ their sRGB `mix()`) — but the ONE-PROP protagonist facade is the missing affordance: a consumer wanting "the page IS this color" today must hand-thread `deriveAurora` → `AuroraConfig.palette` → `<Aurora :config>` + own the per-route immersive mount + the calm-ceiling (the full BD.W-AUR-ALBUM mechanism). That is the KISS gap — no one-prop door.

The HEAD gap, a real source fact:
1. **`<Aurora>` takes a full `AuroraConfig`, never a bare seed.** `src/components/custom/aurora/Aurora.vue:41-98` `defineProps<{ config?: AuroraConfig; renderMode?; opacityCeiling?; … }>` — the consumer-facing surface is the ~28-field config (or the `resolveAtoms` ≤7-atom door, `index.ts:44`). There is NO `:seed` prop that says "make the whole field this color." A color/image seed → the page-protagonist field is a hand-composition every consumer re-builds.

## The mechanism

ONE thin wrapper SFC `<AuroraProtagonist :seed>` (`src/components/custom/aurora/AuroraProtagonist.vue`, on `/aurora` + the root barrel — Aurora's barrel posture). It COMPOSES `<Aurora>` + `deriveAuroraPalette` (BD.W-AUR-ALBUM) + the SEED-MORPH cross-fade — NO new viz, NO second renderer, NO new color path. It is the KISS facade over the AUR-ALBUM mechanism.

1. **The one-prop door.** `<AuroraProtagonist :seed="color | imgSrc" :mode :ceiling>`:
   - `seed` — a CSS color STRING (`"#7B3FF2"` / `"oklch(...)"`) OR an album-art `HTMLImageElement`/URL/canvas (the SAME `source` shape `deriveAuroraPalette` takes, BD.W-AUR-ALBUM).
   - For a COLOR seed → call the SHIPPED `deriveAurora(seed, { harmony })` (`color.ts:182`) directly (a color is already a seed); for an IMAGE seed → route through `deriveAuroraPalette` (the extractor) first. ONE branch, both terminating in the SHIPPED `deriveAurora` (no re-roll).
   - The derived `palette` becomes the `<Aurora>` config's `palette`; the rest of the config is the wispy-sky default refined (the `resolveAtoms` `base`-refine precedent, `atoms.ts:263` — the protagonist field seeds FROM the default so the non-palette fields survive).
   - `mode` (`"single-hue"` default | `"harmony"`) — the calm-vs-rich axis (BD.W-AUR-ALBUM's mode), `"single-hue"` default for the birthdaycolor "the page IS this color" coherent ramp.
   - `ceiling` (`"breathing"` default) — the calm-ceiling cap (never `drifting`), threaded onto the `motion` atom.
2. **The seed-change cross-fade (composes BD.W-SEED-MORPH).** When `:seed` changes (the date→color ritual), the palette re-derives and CROSS-FADES via BD.W-SEED-MORPH's generic OKLCh shorter-hue morph (the `useLiquidFlex` scalar over `interpolateHue("shorter")`, re-uploading via the runtime `update()`) — no hard cut, the calm morph the birthdaycolor reference shows, PERCEPTUALLY SUPERIOR to their sRGB `mix()` (OKLCh stays saturated across the warm→cool arc; sRGB greys the midpoint — the audit's "bests their `mix()` crossfade perceptually"). The cross-fade is SEED-MORPH's one driver — the wrapper OWNS no clock.
3. **The full-bleed protagonist envelope.** The wrapper carries the `fixed inset-0` / full-bleed positioning + the `opacityCeiling` pass-through (the page-protagonist field fills the route). It is the per-route immersive mount (BD.W-AUR-ALBUM's register) wrapped as a component — a consumer mounts `<AuroraProtagonist :seed>` and the page becomes that color, ONE prop.

**Compositor-only**: the wrapper writes the `<Aurora>` config + the cross-fade re-uploads palette (shader read) — no DOM layout animation. **Safari-safe**: it is `<Aurora>` (the smooth-core WebGL2/WGSL field WebKit-26 supports) + JS color math (value.js, universal) + the cross-fade is config-only; NO `backdrop-filter: url()`, NO goo. **PRM**: the seed-change cross-fade collapses to an instant seat (SEED-MORPH's PRM path — a hue shift is not motion). **KISS+DRY**: ZERO new mechanism — a thin facade over `deriveAuroraPalette` + `deriveAurora` + SEED-MORPH + `<Aurora>`; the one-prop door is the entire value.

## The gate — proof:color-protagonist (born-RED → GREEN)

Device-free SOURCE arm, `["local","ci"]` (the binding paint is the π + the gestalt row). NEW gate. The detector comment-strips first + exports a pure detector for the self-test bites. `proof:single-color-core` + `proof:aur-album` + `proof:seed-morph` stay GREEN by construction (this wave COMPOSES them, edits none).

- **C1 — `<AuroraProtagonist>` exists ONCE + composes `<Aurora>` (no second viz).** The SFC exists on `/aurora` + the root barrel + the colocation/publication binary; it renders `<Aurora>` (no new canvas/renderer/shader). Born-RED: the wrapper is ABSENT. Anti-fork bite: a wrapper that mounts its own `<canvas>`/`useWebGLCanvas` (a second renderer) REDS — it MUST compose `<Aurora>`.
- **C2 — the seed terminates in the SHIPPED `deriveAurora` (no re-roll).** A COLOR seed calls `deriveAurora` directly; an IMAGE seed routes through `deriveAuroraPalette` (which itself calls `deriveAurora`). Born-RED: an inline hand-rolled palette build bypassing `deriveAurora` REDS (`proof:single-color-core` cross-assert).
- **C3 — the seed-change CROSS-FADES via BD.W-SEED-MORPH (no hard cut, no second engine).** A `:seed` change drives the SEED-MORPH OKLCh shorter-hue morph, not a direct `config.palette =` hard swap. Born-RED: a hard-cut seed change (no morph) REDS outside PRM; a `new SpringProgress`/second rAF in the wrapper REDS (the morph is SEED-MORPH's clock).
- **C4 — the one-prop door + the calm-ceiling.** The prop surface is `{ seed, mode, ceiling, … }` (a bare `:seed` mounts the field — no required `config`); `mode` defaults `"single-hue"`, `ceiling` defaults `"breathing"` (never `drifting`). Born-RED: a wrapper requiring a full `config` (no `:seed` door) REDS C4-a; a `drifting`-capable protagonist REDS C4-b.
- **C5 — ≥2 REAL consumers.** ≥2 real `src/`/`demo/` call-sites mount `<AuroraProtagonist :seed>` — the birthdaycolor color-card route (`demo/stories/.../color-card.vue`, W-MAPS-CARD/W-BD-COLOR-CARD's host) + a second protagonist surface (the immersive media route OR a `/aurora` story tile). Born-RED: <2 real call-sites (a markdown-keyword "consumer" does not count — the gate enumerates `<AuroraProtagonist` mount sites in real SFCs).
- **C6 — Safari-safe + presets-in-consumers.** The wrapper composes `<Aurora>` (no `backdrop-filter: url()`, no goo) AND injects NO library token from the seed (the seed color lives in the consumer — presets-in-consumers; the protagonist hue is the CONSUMER's data, never a minted token). Born-RED: a `backdrop-filter: url()` in the wrapper REDS; a library token re-pointed to the seed hue REDS.

**Self-test bites:** (a) a wrapper mounting its own `<canvas>`/renderer → C1 RED; (b) a hand-rolled palette bypassing `deriveAurora` → C2 RED; (c) a hard-cut seed change → C3 RED; (d) a `new SpringProgress` in the wrapper → C3 RED; (e) a wrapper requiring `config` with no `:seed` → C4-a RED; (f) a `drifting` protagonist ceiling → C4-b RED; (g) a single-call-site wrapper → C5 RED; (h) a `backdrop-filter: url()` / a seed-hue library token → C6 RED.

**What reds on the pre-fix tree:** C1 (no `<AuroraProtagonist>` — `<Aurora>` takes only `config`), C4 (no `:seed` door — the only mount path is the full config / the `resolveAtoms` door), C5 (no consumer).

## The binding π — tests-visual/color-protagonist.spec.ts

The painted-truth readback, BOTH modes AND the **webkit project** (Safari-first §8 — `<AuroraProtagonist>` is `<Aurora>`, the smooth-core WebGL2/WGSL field WebKit-26 supports). Served at `:5199`, NEVER `reducedMotion` (the live seed-change arm). 4 PNGs {light,dark}×{desktop,mobile} + a `getComputedStyle` oklab pixel readback + a surface-hash.

- **THE PAGE IS THE SEED (the headline):** mount `<AuroraProtagonist :seed="#7B3FF2">` (violet) vs `:seed="#1FA88C"` (teal) full-bleed; the painted field's mean OKLch hue resolves the seed's hue (violet field reads violet, teal reads teal — sample a getImageData mean → decode to OKLab), and in `single-hue` mode the field reads a COHERENT one-hue ramp (low per-quadrant hue variance — the birthdaycolor "the page IS this color"). A control with a multi-hue `harmony` mode reads a wider hue spread (the calm-vs-rich axis distinguishes).
- **THE SEED CROSS-FADE:** change `:seed` violet→teal and capture the frame-series — the mean hue migrates along the OKLCh SHORTER arc across ≥3 frames (no grey midpoint — the OKLCh-bests-sRGB readback: the intermediate frames stay saturated, where an sRGB `mix()` control reads a grey midpoint frame), over the slow breathing clock.
- **THE CALM-CEILING:** the field motion reads as `breathing` (sub-perceptual drift), never `drifting` (the per-frame structural travel stays under the breathing bound).
- **PRM single-paint:** under `prefers-reduced-motion: reduce`, a seed change seats the new field INSTANTLY (one static frame, zero cross-fade frames).

## The gestalt row

**BD-union-roster surface: `color-protagonist` (the one-prop color-field verdict).** The verdict requirement: a FRESH whole-page both-mode `:5199` capture of the protagonist route at a seed-change moment, NEVER `reducedMotion`, surface-hash freshness floor, 4 PNGs {light,dark}×{desktop,mobile}. The gestalt judgement: a ONE-PROP `<AuroraProtagonist :seed>` makes the whole page read as that color's living field — coherent (single-hue ramp), calm (breathing), cross-fading perceptually (OKLCh, no grey midpoint) on seed change — matching/bettering birthdaycolor's generative color-field with the glass-ui superset. Born-FAIL on HEAD (no one-prop door — the protagonist field is a hand-composition). Wired into the union roster by W-GESTALT-WIRE.

## Fences

- **No-legacy / clean break.** `<AuroraProtagonist>` is a NEW additive facade — it does NOT alias or wrap a retired component; `<Aurora :config>` stays the full-control surface (the wrapper is the KISS door BESIDE it, not a replacement). No dual protagonist path.
- **No re-fork.** A thin facade — it COMPOSES `<Aurora>` + `deriveAuroraPalette` + `deriveAurora` + SEED-MORPH. ZERO new viz/renderer/shader/color-core/spring. The whole wave is the one-prop door + the consumer wiring.
- **Presets-in-consumers.** The seed color/image is the CONSUMER's data (a date→Pantone in birthdaycolor's case) — ZERO library token absorbs it. The warm-cream identity stays the library default; the protagonist field is the consumer's chosen color at runtime.
- **The Safari fall.** `<AuroraProtagonist>` IS `<Aurora>` — the smooth-core WebGL2 (+ WGSL primary) field, the most Safari-safe aurora path; the seed math is value.js (universal). NO `backdrop-filter: url()`, NO `feDisplacementMap`, NO goo. On a WebGL2-unavailable engine the field degrades through Aurora's own CSS-substrate fallback (`Aurora.vue:155` — the luminance-faithful ground), so the protagonist color still composites (the warm wash, just static).
- **The anti-pattern this must NOT become:** a SECOND aurora component (a re-forked renderer) — the gate's compose-`<Aurora>` clause fences it; OR a heavyweight config-passthrough that requires the full `AuroraConfig` (defeating the one-prop KISS purpose — the `:seed`-door clause fences it); OR a saturated-slab field (the calm-ceiling + the OKLCh-shorter-hue derive keep it a living field, not a flat fill).

## Disposition links

- **CONSUMES BD.W-AUR-ALBUM** — `deriveAuroraPalette` (the image extractor) + the immersive register + the calm-ceiling are AUR-ALBUM's mechanism; this wave is the one-prop facade over them (a color seed shortcuts straight to `deriveAurora`; an image seed routes through `deriveAuroraPalette`).
- **CONSUMES BD.W-SEED-MORPH** — the seed-change cross-fade IS the generic OKLCh shorter-hue morph; `<AuroraProtagonist>` is a SEED-MORPH consumer (the ≥2-consumer bar: this wrapper + the album field + the birthdaycolor card).
- **SUBSUMES the SEED-DRAFT `W-COLOR-CARD/PROTAGONIST/SEED-MORPH [NEW, birthdaycolor]` cluster's PROTAGONIST member** — the audit's `W-BD-COLOR-PROTAGONIST` ("a thin `<Aurora :seed>` register") IS this wave (renamed `<AuroraProtagonist>` for the component-name clarity). W-BD-COLOR-CARD (the Pantone glass color-card over the field) is the W-MAPS-CARD/Band-7 composition that CONSUMES this wrapper.
- **MINTS** `<AuroraProtagonist>` (the one-prop protagonist component).
