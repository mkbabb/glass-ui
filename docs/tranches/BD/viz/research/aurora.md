# Aurora — BD research + brainstorm (the generative-viz redevelopment + the configurator/interactivity expansion)

**Lane** BD viz-research / aurora · **Status** AUTHORED 2026-06-22 · **Branch** prototype/liquid-dock ·
**Substrate-grounded** against `src/components/custom/aurora/**` at HEAD + the BD/BE/BF wave pool ·
**Scope** PLANNING/RESEARCH ONLY — zero `src/` edits. This doc is the aurora chapter of the BD
generative-viz expansion: the SOTA record, the birthdaycolor.com better-it proof, the mouse/keyboard +
configurator robustness picture, and 8–12 novel ideas with falsifiable bars.

> Read alongside the shipped per-dir docs: `aurora/RESEARCH.md` (the painterly arresting-bar metrics,
> the −5/3 Kolmogorov keystone), `aurora/DESIGN.md`, `aurora/README.md`, and the BD union waves
> (`BD.W-AUR-ALBUM`, `BD.W-SEED-MORPH`, `BD.W-HUE-HISTOGRAM-HOIST`, `BD.W-COLOR-PROTAGONIST`) +
> the BE pool (`BE.W-AUR-SATIN`, `BE.W-AUR-PRISM`, `BE.W-AUR-REACTIVE`) + the BD pool
> (`BD.W-AURORA-WGSL-STROKES`, `BD.W-AURORA-KUWAHARA-MULTIPASS`, `BD.W-AURORA-WGSL-CURL`).

---

## 0. TL;DR

Aurora is the SUITE's most mature member and the one viz the user singles out as "likely supersedes"
birthdaycolor.com. The substrate axis (linear-light OKLCh nuclei-field, WGSL primary + WebGL2 fallback,
the −5/3 turbulence cascade, the 8 painterly mediums) is genuinely SOTA. The gaps are: (1) a thin,
underspecified INTERACTIVITY surface (only `light` + `scroll` of the 4 declared atoms are wired; the
cursor model is a quiet impasto-light bias, not a birthdaycolor-grade protagonist), (2) the
album/seed-reactive REGISTER is half-built and demo-local (BD/BE waves spec it but it is not landed), and
(3) the configurator never exposes the rich atom door as a designed studio. This doc proves the
birthdaycolor better-it on FOUR concrete axes, maps the interactivity/configurator robustness, and
brainstorms 12 novel ideas — each with a SOTA anchor, a Safari-first fence, and a falsifiable bar.

---

## 1. The shipped SOTA (the substrate we build ON — recorded, not re-researched)

| Axis | What ships at HEAD | Source-of-truth |
|---|---|---|
| **Color core** | linear-light compositing, one OETF close; OKLab-rectangular per-stop interp + per-stop gamut map; value.js Ottosson constants the ONE color source | `composables/color.ts`, `shaders/procedural-color.{glsl,wgsl}.ts`, `proof:single-color-core` |
| **Field** | multi-nuclei softmax-Gaussian zones (`MAX_NUCLEI=6`, `MAX_STOPS=8`); thirds-zone LUT placement; DC-suppressed by construction | `composables/atoms.ts` `nucleiPrior`, `presets.ts` |
| **Domain warp** | fbm / cellular / hybrid / **curl** (Bridson divergence-free, the shared `CURL_FBM_GLSL` chunk) | `WarpMode`, `shaders/flow.glsl.ts` |
| **Painterly mediums** | smooth · pastel · watercolor · oil · crayon · vangogh · oil-pastel · **kuwahara** (anisotropic-Kuwahara soft-blend, `uMedium==7`, default-off) | `AuroraMedium`, `shaders/mediums.glsl.ts` |
| **Turbulence prior** | the −5/3 Kolmogorov eddy/dab cascade + the 3 reference-anchored arresting metrics (colorfulness / structure-tensor coherence / radial power-spectrum slope) | `RESEARCH.md` §4, `scripts/aurora-arresting-metric.mjs` |
| **Tonemap** | Khronos PBR-Neutral default (hue+saturation preserving over designed backdrops) | `shaders/composition.glsl.ts` |
| **Substrate** | WGSL primary (`aurora.wgsl.ts`) + byte-untouched WebGL2 fallback (`aurora.frag.ts`); `createCanvasLifecycle` leaf; offscreen-park + live-PRM freeze | `useGpuSubstrate`, `PROCEDURAL-SUITE.md` |
| **Atom door** | ≤7-atom config (`zones` · `noise` · `medium` · `motion` · `colorEnergy` · `interactivity`), every atom OPTIONAL, empty → wispy-sky default | `composables/atoms.ts` `resolveAtoms`, `proof:aurora-atoms-roundtrip` |
| **Cursor** | velocity-reactive flow burst (AW.W8.1) + cursor-as-light impasto bias; PRM-gated, the `cursorModel.ts` `advanceCursor` (which `usePointerVelocityField` generalized) | `composables/cursorModel.ts`, `useCursorInteraction.ts` |

**The BD CANVAS2D MANDATE for aurora.** The user's edict ("ZERO Canvas2D, no fallbacks") names aurora's
`getContext("2d")` raster ground as a migration target: `composables/auroraFallbackGround.ts`
(`sampleAuroraField`) one-shot rasters the CSS placeholder on a 2D canvas. Per the mandate this becomes a
WebGL2/WGSL one-frame render (the SAME field shader, drawn once + parked) — NOT a 2D `getImageData`
upscale. **Fence:** the album-art EXTRACTOR (`deriveAuroraPalette`, BD.W-AUR-ALBUM) legitimately uses a
32×32 `getImageData` read — that is a COLOR-SAMPLE of an external image, not a viz drawing context; the
mandate is about the VIZ render surface, the sampler is exempt (documented so the migration sweep does
not over-cut the histogram read).

---

## 2. The birthdaycolor.com better-it (the user: "our aurora likely supersedes it" — the proof)

**birthdaycolor.com** is a date→color generative field: you pick a birthday, it derives a palette, and a
soft animated gradient field crossfades to it. It is the union's "best-it" reference + the
`<ColorCard>` / `<ColorProtagonist>` lineage (BD.W-COLOR-CARD, BD.W-COLOR-PROTAGONIST). The four axes
where aurora is already-or-trivially superior, each falsifiable:

| Axis | birthdaycolor.com | aurora (HEAD or one BD wave away) | The better-it proof |
|---|---|---|---|
| **A1 — crossfade color space** | sRGB `mix()` between palettes → the warm→cool midpoint **GREYS** (violet→teal passes through mud) | the **OKLCh shorter-hue** seed-morph (`BD.W-SEED-MORPH` `interpolateHue("shorter")`, gamut-mapped per in-flight stop) — no muddy midpoint, the hue arc stays saturated | §4.1 colorfulness stays in-band across EVERY crossfade frame; a control sRGB-lerp dips chroma at t≈0.5 (the binding π hue-migration frame-series) |
| **A2 — field structure** | a flat multi-stop CSS gradient (no eddy structure, no painterly texture) | the multi-nuclei fbm field + the −5/3 turbulence cascade + 8 painterly mediums | §4.3 radial power-spectrum slope: aurora recovers −1.67 (van-Gogh-congruent); a flat gradient rolls off at β≪−2 (the flat-pole control) |
| **A3 — derivation richness** | one dominant hue → a fixed analogous spread | `deriveAurora(seed, {harmony})` over value.js gamut-mapped lightness-walk + the `single-hue`/`harmony` MODE axis + the album-art extractor (`deriveAuroraPalette`, OKLCh-histogram dominant hue) | the palette is a GENERATIVE function of seed × harmony × medium, not a fixed table — the ParamExplorer degeneracy-curation sweep (`RESEARCH.md` T7) proves coverage |
| **A4 — interactivity** | a static field once selected (no pointer life) | the velocity-reactive flow burst + cursor-as-light + the brainstormed birthdaycolor-grade protagonist modes (§5) | a captured interaction DELTA: a flick spikes the field; birthdaycolor's field is inert post-select |

**The honest caveat (record it).** birthdaycolor's STRENGTH aurora must MATCH, not just better: its
date→color story is a clean, legible, ONE-protagonist focus — the whole page IS that one color. Aurora's
multi-nuclei richness can read busy where birthdaycolor reads serene. The **`single-hue` palette mode**
(BD.W-AUR-ALBUM C3 — every stop holds the dominant hue, only L/C travel) is the register that matches
birthdaycolor's serenity; the `harmony` mode is the richer-than-birthdaycolor register. The
better-it is "aurora can be BOTH"; the fence is "default to the calm mode for a protagonist surface."

---

## 3. The configurator — from atom-door to a designed STUDIO

The atom door (`AuroraAtoms`: `zones` · `noise` · `medium` · `motion` · `colorEnergy` · `interactivity`)
is a clean ≤7-knob model but is NOT yet a first-class configurator studio inheriting the AZ.W-HIERARCHY
vocabulary. The BD robust-configurator mandate wants every viz to ship one. The aurora studio rungs:

- **Section 1 — Palette** (the protagonist): seed (`<ColorSwatch>`), harmony (single-hue / analogous /
  complementary), an image-drop slot (`deriveAuroraPalette` — drop album art, the field absorbs it),
  the `colorEnergy` warm-light/cool-shadow temperature slider.
- **Section 2 — Field**: `zones` count (1..6) + arrangement (scattered/composed/centred), `noise`
  (0..1, the smooth→turbulent organic-edge knob driving warpAmount/scale/mode/octaves together).
- **Section 3 — Medium**: the 8 mediums as a `<SegmentedTabs>` material picker, each with its signature
  `amount` slider (textured mediums only — `smooth` structurally has no amount, the discriminated atom).
- **Section 4 — Motion + interactivity**: still/breathing/drifting (the calm-ceiling register), the
  interactivity axes (light/flow/scroll/wake) as toggles, the cursor-mode picker (§5).
- **Section 5 — Flow**: pattern (the `FlowPattern` set), focal (`focalX/Y`, a draggable focal dot ON the
  preview canvas — see §5 I3), curl intensity.

**The studio is a CONSUMER composition** (presets-in-consumers): it composes `useConfiguratorState<AuroraConfig>`
+ the `<Configurator>` primitive; the library ships the atom resolver + the `deriveAuroraPalette` /
`useAuroraSeedMorph` composers, the demo ships the studio SFC. The configurator hierarchy vocabulary
(section weight / label register / control rhythm) is INHERITED, never re-authored.

---

## 4. The mouse/keyboard interactivity audit (the gap-to-robust)

**Wired today:** `light` (cursor-as-light impasto bias + idle orbit) + `scroll` (parallax) + the AW.W8.1
velocity-reactive flow burst (a flick spikes the field). **Declared-but-unwired:** `flow` + `wake` (the
atom door admits them; the runtime does not consume them — `atoms.ts:85-90`). **Keyboard: ZERO.** There
is no keyboard interactivity surface at all — a fully-mouse-bound viz fails the BD "mouse AND keyboard
INTERACTIVITY" mandate.

The robustness path (each compositor-safe, PRM-gated, on the existing `usePointerVelocityField` /
substrate clock — NO new rAF):

- **Mouse — wire the 2 dead atoms.** `flow` = the pointer DRAGS the flow field (the focal follows a held
  pointer, the field streams toward it); `wake` = a click/tap injects a local impulse ripple
  (`expImpulse` envelope, IQ [S8]) that decays over the field. Both are already-declared, just unconsumed.
- **Mouse — the protagonist modes (§5 I1–I4).** Cursor-as-light is the calm register; the
  birthdaycolor-grade modes are the headline.
- **Keyboard — the NEW surface (the mandate gap).** Arrow keys nudge the focal; `[`/`]` step the medium;
  `+`/`-` step `noise`/turbulence; `space` cycles motion register; digit keys jump zone-count;
  `r` re-seeds (a new random seed → the seed-morph crossfade). Composes the shipped
  `useKeyboardShortcuts` (`/keyboard`) — NO hand-rolled keydown. Every keyboard action that changes the
  palette rides the `useAuroraSeedMorph` crossfade (no hard cut), so keyboard control reads as liquid.
- **Accessibility floor.** The interactive aurora carries a `role="img"` + a live-region label that
  updates on protagonist change ("aurora field: violet"); the keyboard surface is reachable + the
  focal-dot is a focusable control (the configurator's `focalX/Y` draggable). PRM collapses every motion
  arm to an instant seat (the substrate live-PRM freeze).

---

## 5. The novel ideas (12 — each: idea · SOTA anchor · Safari-fence · falsifiable bar)

The mediums below are NEW `uMedium` slots on the existing dispatch ladder (the `BE.W-AUR-SATIN`/`PRISM`
precedent: a type member + a `MEDIUM_ID` slot + a `.frag` body + the WGSL lockstep + an atom-door case;
default byte-identical, GL-fence on existing bodies, single-pass/no-FBO unless noted). Two slots are
already pool-claimed (`satin==8`, `burst==9`) — listed for completeness + extended.

### New mediums / reactive modes

- **M1 — `aurora-borealis` (the literal namesake).** Vertical curtain-folds of light that ripple along a
  horizontal axis — the actual northern-lights register the viz is NAMED for but does not paint (it paints
  painterly gradients). Curtains derive from a 1D fbm height profile swept vertically with a per-column
  phase; the green→magenta auroral palette is a PRESET (warm-cream stays the library default).
  *SOTA:* real-aurora rendering uses height-banded emission profiles (the 557nm/630nm O-line altitude
  separation) — a 2-band vertical gradient with a fbm-rippled lower edge. *Safari:* fragment-only, WGSL
  lockstep. *Bar:* a vertical-curtain π — the field shows distinct vertical luminance columns rippling
  horizontally, DISTINCT from the isotropic smooth field; the per-column phase advances over `t`.

- **M2 — `satin` (POOL-CLAIMED `==8`, extend).** Folded-silk light-bending: fold height from the
  domain-warp magnitude, a directional sheen along the structure-tensor ridges. *Extension:* couple the
  sheen `uLightDir` to the cursor (cursor-as-key-light — the sheen runs where the pointer is), making
  satin the showcase medium for the cursor-as-light atom.

- **M3 — `burst` (POOL-CLAIMED `==9`, extend).** Angular prismatic palette-walk around the flow focal —
  the field fans the brand spectrum radially. *Extension:* fire a one-shot `expImpulse` burst-radius
  expansion on protagonist change (the station-change delight) — the prism blooms outward then settles.

- **M4 — `caustics` (water-light).** Refracted-light caustic web over the field — the bright filigree
  light casts on a pool floor. *SOTA:* caustics ≈ the divergence of a curl-warped gradient (the `curlFBM`
  chunk ALREADY ships — this is a free consumer of the shared flow operator); the bright veins are where
  the warped UV converges. *Safari:* fragment + the shared `CURL_FBM` chunk (WGSL twin pool-booked).
  *Bar:* a thin-bright-vein π — the field carries high-frequency bright filaments over the smooth base,
  the veins flowing along the curl field; a structure-tensor read shows the anisotropic vein coherence.

- **M5 — `nebula` (volumetric depth).** A faux-volumetric depth cue: 3 fbm octave layers at different
  parallax depths, the near layer cursor-parallaxed, giving the flat field a sense of looking INTO a
  cloud. *SOTA:* layered-noise faux-volumetrics (Book of Shaders fBm [S15]); the parallax is a per-layer
  UV offset by `cursor × depth`. *Safari:* fragment-only. *Bar:* a parallax π — moving the cursor shifts
  the near layer more than the far (a depth-separated motion-parallax read across the frame-series).

- **M6 — `chromatic-aberration` (the prism-edge refinement).** A per-channel UV-split at the field edges
  (R/G/B sampled at slightly offset UVs scaled by radial distance) — the booked successor the
  `W-LENSING` chromatic-aberration note names, applied to the aurora field. *SOTA:* lens-fringe RGB-split.
  *Safari:* fragment-only, default-off (a bounded `uAberration` scalar, byte-identical at 0). *Bar:* an
  edge-fringe π — the field's high-contrast edges carry a sub-perceptual R/B fringe at `uAberration>0`,
  zero at the default.

### New interaction modes (the birthdaycolor-better-it protagonist register)

- **I1 — cursor-as-protagonist (the birthdaycolor headline-better).** The pointer is a MOVING color
  source — a transient nucleus that follows the cursor, injecting the cursor-hue into the field locally
  (the field BLOOMS the cursor's color where you point, then it diffuses + fades). birthdaycolor's field
  is inert post-select; aurora's field PAINTS under the cursor. *SOTA:* the velocity-reactive flow burst
  (AW.W8.1) generalized to a color-injecting transient nucleus + an `expImpulse` diffuse-decay. *Safari:*
  config-only (a transient nucleus is an existing `nuclei[]` slot driven by the pointer) + the shader read.
  *Bar:* a cursor-bloom π — a captured drag leaves a fading color trail in the field; PRM → no trail.

- **I2 — flick-to-fling the field (momentum).** A fast flick imparts MOMENTUM to the whole flow field —
  the field streams in the flick direction then decays (C¹ fling, the kf `Draggable` `decayRest`
  precedent `useDragMorph` already wires). *SOTA:* IQ `expImpulse` + the decay-projected rest. *Safari:*
  config/uniform-only. *Bar:* a flick-momentum π — the post-flick field translates + decelerates over the
  frame-series; a slow drag does not fling (the velocity-threshold decision).

- **I3 — the draggable focal dot (the direct-manipulation configurator).** The flow focal
  (`focalX/Y`, already plumbed to `uFlowFocal`) becomes a DRAGGABLE dot on the preview canvas — grab it
  and the prism/satin/sheen anchor follows your finger 1:1. *SOTA:* direct manipulation; the
  `useDragMorph` follow. *Safari:* pointer-capture + config write. *Bar:* a focal-drag π — dragging the
  dot re-anchors the burst/sheen (the bright point follows); keyboard arrows also nudge it (the §4 surface).

- **I4 — the audio/album reactive protagonist (BD.W-AUR-ALBUM, land it).** The field absorbs the playing
  album's dominant OKLCh hue (`deriveAuroraPalette`), re-derives the palette as a single-hue lightness-
  walk, and crossfades on protagonist change (the `useAuroraSeedMorph` OKLCh shorter-hue crossfade). The
  calm-ceiling (cap at `breathing`). This is the V2 Apple-generative-aurora north-star + the now-playing
  dock pill source. *Bar:* the BD.W-AUR-ALBUM π (the field-IS-the-album hue + the protagonist crossfade
  frame-series).

- **I5 — generative seed-gallery + curation (the ParamExplorer betterment).** A "shuffle" affordance
  samples N (seed × harmony × medium) combos, scores each against the §4 arresting bars, and surfaces the
  TOP-K — so a consumer never lands a degenerate corner. *SOTA:* ParamExplorer degeneracy curation [S10],
  Art Blocks hash-to-traits [S11]. *Safari:* pure JS scoring + the config crossfade. *Bar:* extend
  `proof:aurora-atoms-roundtrip` to the coverage sweep — no sampled combo falls below the §4 floors.

- **I6 — `prefers-color-scheme` + ambient-light reactive temperature.** The field's warm-light/cool-
  shadow `colorEnergy` temperature couples to the AMBIENT register — dark mode cools the shadow band,
  and (where the Ambient Light Sensor or a backdrop-luminance sample is available) the field warms in a
  bright room, cools in a dim one. *SOTA:* the BE.W-AMBIENT-TINT `--glass-ambient-hue` sampler + the
  `useGlassBackdropLuminance` observer. *Safari:* the backdrop-luminance proxy (no ALS dependency — the
  observer is the universal path). *Bar:* a temperature π — the field's shadow-band hue shifts cooler in
  dark mode / under a dim backdrop, warmer under bright.

---

## 6. The dispatch + the sequencing fences

- The new mediums (M1/M4/M5/M6) are each a self-contained `uMedium` slot — sequence after `satin==8` /
  `burst==9` (the next free slots are `==10..13`); each is single-pass (no FBO — the multi-pass Kuwahara
  is the ONE FBO case, user-hinge gated, `BD.W-AURORA-KUWAHARA-MULTIPASS`).
- The interaction modes (I1/I2/I3) compose `usePointerVelocityField` + the existing `nuclei[]`/`uFlowFocal`
  config — NO new rAF, NO new color core; the keyboard surface (§4) composes `useKeyboardShortcuts`.
- I4 (album) + I5 (curation) ride the LANDED `BD.W-AUR-ALBUM` + `BD.W-SEED-MORPH` engines — this doc
  proposes I4/I5 as the LANDING + extension of the specced-but-unbuilt waves, not a re-fork.
- Every new term is bounded + default-off (the GL-fence: existing medium bodies byte-untouched, smooth
  byte-identical) + WGSL-lockstep (the Safari-first floor — no Chromium-only path).
- The Canvas2D raster ground (`auroraFallbackGround.ts`) migrates to a one-frame WebGL2/WGSL render per
  the BD mandate; the album-art `getImageData` sampler is exempt (a color-sample, not a viz context).

---

## Sources

- `aurora/RESEARCH.md` (the painterly arresting-bar: Hasler-Süsstrunk colorfulness, the van-Gogh −5/3
  Kolmogorov cascade [Ma et al. arXiv 2310.03415], structure-tensor coherence, Kuwahara soft-blend)
- `[S8]` Inigo Quilez — `expImpulse`, gradient noise, filterable procedurals (the impulse/flick envelopes)
- `[S10]` ParamExplorer arXiv 2512.16529 (degeneracy curation) · `[S11]` Art Blocks hash-to-traits
- `[S15]` Book of Shaders — Noise (fBm / domain-warp / faux-volumetrics)
- BD union waves: `BD.W-AUR-ALBUM`, `BD.W-SEED-MORPH`, `BD.W-HUE-HISTOGRAM-HOIST`, `BD.W-COLOR-PROTAGONIST`
- BE pool: `BE.W-AUR-SATIN` (`==8`), `BE.W-AUR-PRISM` (`==9`), `BE.W-AUR-REACTIVE`, `BE.W-AMBIENT-TINT`
- BD pool: `BD.W-AURORA-WGSL-STROKES`, `BD.W-AURORA-KUWAHARA-MULTIPASS`, `BD.W-AURORA-WGSL-CURL`
- On-disk HEAD: `src/components/custom/aurora/{constants/presets.ts, composables/atoms.ts, color.ts,
  cursorModel.ts, useCursorInteraction.ts, auroraFallbackGround.ts}`, the shared `flow.glsl.ts` curl chunk
- Reference: birthdaycolor.com (the union better-it target) · V2 Apple generative aurora (the north star)
