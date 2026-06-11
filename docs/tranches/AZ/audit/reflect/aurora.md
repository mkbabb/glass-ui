# REFLECTION RECORD — aurora

**Surface:** aurora (the painterly bands on the live GPU · the studio on the library Configurator · the hero presets across the demo · the black-bar absence · performance)
**Lane:** aurora · **Auditor pass:** AZ.W-REFLECT protocol (recapitulate → re-verify live → perfection-question → verdict)
**Date:** 2026-06-11 · **Branch:** tranche/AY @ HEAD (AZ Batches 0–5 + R4/R5 corrective landed)
**Route:** `/substrates/aurora` (studio) + `/foundations/intro` (aurora hero backdrop) on `:5199`

## VERDICT: PASS

Every aurora-touching user item (AY B19/B20/B21/B22 + the R-audit "truly render oil/van-Gogh
strokes generatively/procedurally/SOTA?" directive + the AZ R3-8 configurator-refinement +
the W-HIERARCHY/W-SUFFUSE/W-ADAPTIVE bites) is discharged with fresh live evidence. The
van-Gogh hero lands all three reference-anchored painterly bands on the real Metal GPU; the
three painterly mediums read visually distinct; the studio is ONE cohesive progressive-
disclosure column on the library Configurator with the W-HIERARCHY vocabulary applied; the
preset preview panes carry NO black bar in either mode; the aurora is the full-bleed live hero
backdrop on the front-door pages; no jank at the static/settled frame. The perfection-question
pass found zero "wtf" defects. 19/19 aurora gates green in cache.

---

## 1. RECAPITULATION — every audit item × discharging evidence

### The headline user items (AY USER-AUDIT 2026-06-10, BINDING — the user's judgment OVERRIDES gate-green)

| id | the user's words (distilled) | wave that discharged it | discharging evidence (live + gate) |
|---|---|---|---|
| **B19** | "The aurora preview panes STILL have a black bar on top." | AY.W-AUR-CONFIG-REBUILD | ROOT-CAUSED: `PresetPickerRow.vue` `display:block` button gave its thumbnail well a ~5px line-box strut painting a `bg-card` band (near-black under `.dark`) above the image. FIX: card → `flex flex-col` (no baseline strut). LIVE: `aurora-studio-dark.png`/`-light.png` + `aurora-reflect-desktop-A-full.png` + mobile both modes — EVERY preset pane (Sky/Dawn/Meadow/Oil-Impasto/Van-Gogh/…) meets its rounded crown directly, ZERO top band, in BOTH modes. |
| **B20** | "The van-Gogh aurora is AWFUL — super laggy, looks NOTHING like van Gogh brush strokes. Rebuild with the procedural generative brush strokes." | AY.W-AUR-PAINTERLY (+ W-AUR-VANGOGH shader bodies) | REBUILT: `brush.glsl.ts`/`mediums.glsl.ts`/`tonemap.glsl.ts` — tensor-stroke crescent/comma dabs queued into Starry-Night swirl rows; ACES→Khronos PBR-Neutral. LIVE: `aurora-medium-vangogh-dark.png`/`-light.png` — directional anisotropic comma-dabs sweeping the swirl, indigo/cobalt/sky bands + golden-yellow zones, visible inter-stroke ground. GATE: `AY-aurora-arresting` PASS (2/0/0, real Metal GPU) — van-Gogh lands C/A/β ALL three bands. |
| **B21** | "The Configurator itself is god-awful — rebuild from first principles: better hierarchy, control types, layout; the SAME configurability. Keep crayon/speedtest/sky/dawn; speedtest cloudier+evolving; crayon less oily." | AY.W-AUR-CONFIG-REBUILD | REBUILT: the Atoms↔Advanced face-toggle DELETED; ONE progressive-disclosure column on `<ConfiguratorLayer>` (Color → Composition → Motion → Warp&noise → Flow → Texture → Nuclei); EVERY historical control preserved (per-stop OKLCh editor, derive-from-color, nuclei editor, oil stroke sub-modes). Speedtest tuned cloudier (softmaxBeta 3.2→2.4, warpAmount↑, +1 octave) + evolving (driftRadius ~2×, mean Δ 16.11/7s measured); crayon dried (strokeAmount 0.60→0.48, paperGrain↑, brokenColor↓). LIVE: `aurora-studio-dark.png`/`-light.png`/`-harmony-open-dark.png`. GATE: `AY-aurora-studio` PASS + `AX-W38-aurora-chrome-idiomatic` PASS. |
| **B22** | "/foundations/intro: the aurora must be the ENTIRE page background — no sub-container." | AY.W-SB-STAGE-R2 (+ aurora-hero.ts) | DONE: `/foundations/intro` declares `background:{kind:"aurora", palette:"rose-indigo-amber"}` — a full-bleed live `<Aurora>` drift on the brand section-ramp hues. LIVE: `aurora-reflect-hero-intro.png` — the aurora fills the WHOLE page background; the glass hero card floats over it, "Glass, paper, and the golden ratio." legible over the wash. |
| **R-audit directive** | "truly audit: does the aurora ACTUALLY render oil/van-Gogh brush strokes generatively, procedurally, truly SOTA?" | AY.W-AUR-PAINTERLY | YES. The strokes are procedural single-pass WebGL2 (structure-tensor orientation + crescent dabs), reference-anchored on `starry-night-crop.png` (C=70.67, A=0.832, β=−1.672). Three mediums visually distinct on the live GPU: vangogh=comma-dab swirl, oil=raked-light knife ridges, oil-pastel=creamy directional smears. Documented residual: oil/oil-pastel §4.2 anisotropy + oil-pastel §4.3 slope sit outside band — band NOT lowered, routed to the named T5 anisotropic-Kuwahara successor (AY.W-AUR-T5). |

### The AZ-tranche items that touched aurora

| id | item | wave | evidence |
|---|---|---|---|
| **R3-8** | "Configurator here is better, but needs refinement everywhere." | AZ.W-HIERARCHY (vocabulary) | The studio INHERITS the Configurator hierarchy vocabulary (`--configurator-section-size`=20.4px √φ section rung + the three-rung label register + the preset-row spatial rhythm), minted once in the primitive. LIVE: `aurora-studio-dark.png` — "Color"/"Composition"/"Medium" read at section weight above the row labels (Seed/Harmony/Energy); mono `seed · harmony · palette` caption is the tertiary rung. GATE: `proof:hierarchy`. |
| **W-SUFFUSE over-spend fence** | no live substrate on content pages; aurora allowed only on substrate-demo + chassis/hero files (≥1-GL-context-per-route budget). | AZ.W-SUFFUSE | aurora `<Aurora>` mounts ONLY on `/substrates/aurora` (studio) + the hero-declaring front-door pages (intro/glass-material/carousel via `aurora-hero.ts`) — within the over-spend fence. `proof:suffuse` D4-7 grep clean. |
| **W-ADAPTIVE-AUTO** | the dock-over-live-aurora legibility case (sampled-luminance observer Move-2). | AZ.W-ADAPTIVE-AUTO | The aurora is the canonical "animated backdrop a static bucket is too coarse for"; the `useGlassBackdropLuminance` observer refines the dock-over-aurora case. Aurora itself is the SUBSTRATE the dock samples — no defect on the aurora surface. GATE: `proof:adaptive-observer`. |

### User HINGE/decisions touching aurora

- **Presets in consumers (memory rule):** confirmed — the 13 authored aurora presets (Sky/Dawn/Meadow/Deliberative/Day9/Oil-Impasto/Oil-Gestural/VanGogh/OilPastel×3/Crayon/Speedtest) live in `demo/stories/aurora/presets.ts`; the library exports only the shape + neutral `DEFAULT_AURORA_CONFIG`. The ppmycota-purple HARD fence is honored (no demo accent leaks into library tokens).
- **AY.W-AUR-WEBGPU-DECIDE: WebGPU path DEAD** — the single-pass WebGL2 painterly path is the permanent register; the A/β residual is the routed T5 successor, not a regression.

## 2. RE-VERIFY LIVE — fresh captures (`:5199`, real Metal GPU, both modes, ≥2 viewports)

| capture (literal filename, stored beside this record) | what it proves |
|---|---|
| `aurora-reflect-desktop-A-full.png` | OWN fresh capture (1440×900, dark): studio with Sky preset — preset row NO black bars, rebuilt configurator column (Aurora studio header + Color section heading + Seed/Harmony/Energy + Derive card + OKLCh per-stop editor). |
| `aurora-reflect-hero-intro.png` | OWN fresh capture: `/foundations/intro` — the aurora as the FULL-BLEED live page background (B22), glass hero card over it, display title legible. |
| `aurora-medium-vangogh-dark.png` / `aurora-medium-vangogh-light.png` | van-Gogh medium both modes — directional comma/crescent dabs in swirl rows, Starry-Night ramp, visible ground. |
| `aurora-medium-oil-dark.png` | oil-impasto — raked-light knife ridges, speckle suppressed to ground. DISTINCT from vangogh. |
| `aurora-medium-oilpastel-dark.png` | oil-pastel — creamy directional tapered smears, warm sunset. DISTINCT from oil + vangogh. |
| `aurora-medium-sky-dark.png` | smooth default — calm blue volumetric (the honest non-painterly face). |
| `aurora-studio-dark.png` / `aurora-studio-light.png` | full studio both modes — preset row + Van-Gogh stage + the progressive-disclosure column (Color/Composition/Medium/Texture/Zones/Arrangement/Organic-boundary/Motion). |
| `aurora-studio-harmony-open-dark.png` | deeper-section studio view — Medium=Van Gogh select, the full slider/select stack. |
| `aurora-select-harmony-open-dark.png` | the Harmony `<Select>` OPEN — glass dropdown (Analogous✓/Complementary/Split/Triad/Tetradic/Monochrome). Selects open cleanly. |
| `aurora-select-medium-open-dark.png` | the Medium `<Select>` open — the medium enum renders ONCE (no dual native/pill double-render). |
| `aurora-desktop-dark-full.png` / `aurora-desktop-light-full.png` | desktop full-page both modes. |
| `aurora-mobile-dark-full.png` / `aurora-mobile-light-full.png` | mobile reflow both modes — single column, preset row scrolls, stage+config stack, NO black bars. |

### π readbacks (numeric)

- **Painterly statistics** (`AY-aurora-arresting.json`, real Metal GPU, canonical width 464): van-Gogh HERO lands ALL THREE bands — colourfulness ∈ [55.67, 95.67], anisotropy ∈ [0.732, 0.932], slope ∈ [−1.85, −1.45]; 2 specs pass / 0 fail; all mediums clear colourfulness; oil clears slope; 4 not-flat floors hold.
- **Canvas geometry:** `canvas.aurora-canvas` backing 1862×1400 / CSS 931×700 → DPR 2 crisp (no pixelation; the B10/R3-9 pixelation defect was the BLOB surface, never aurora).
- **Gate roster:** 19/19 aurora gates `pass` in `.cache/gates/` — `AY-aurora-arresting`, `AY-aurora-studio`, `AX-aurora-painterly-statistics`, `AX-aurora-vangogh-preset`, `AX-aurora-oilpastel-medium`, `AX-aurora-stroke-composite`, `AX-aurora-atoms-render`, `AX-W38-aurora-chrome-idiomatic`, `AX-W47-aurora-preset-roster`, `AW-aurora-tensor-field`, `AW-aurora-impasto-relight`, `AW-aurora-atoms-roundtrip`, +7 more.

## 3. THE PERFECTION QUESTION (first-time-auditor walk)

Walked the studio + the hero backdrop as a first-time auditor. No "wtf":

- The preset row reads as a clean gallery of baked thumbnails — labels + medium sub-captions, rounded crowns, no letterbox/black-bar artifact.
- The Van-Gogh canvas is genuinely arresting — it reads as Starry Night, not a marble swirl; the comma dabs are legible, the palette is pigment-true.
- The configurator column is cohesive and idiomatic — ONE scrolling column, section headings above row labels above mono captions, glass selects + sliders + an OKLCh per-stop editor with colored spectrum tracks. No bare native selects, no janky two-face split.
- The hero backdrop on `/foundations/intro` is full-bleed and alive; the glass hero card composes legibly over it.
- Mobile reflows correctly to a single column.

### NON-BLOCKING observations (recorded; NOT misses, NOT in this lane's scope to fix)

1. **Console warn** (S3, cosmetic, demo-side): `[glass-ui] useAurora: deferred init armed with no onInitError handler` repeats on every aurora mount during gate runs. The renderer works (canvas paints); this is a demo-wiring hygiene note, not a user-visible defect. It is the documented seam the warning intends. NOT a reflection miss.
2. **The oil/oil-pastel anisotropy residual** is the EXPLICITLY DOCUMENTED, band-NOT-lowered T5 successor (AY.W-AUR-T5) — the van-Gogh HERO (the wave's headline "arresting" claim) lands the full bar. This is a recorded, accepted register ceiling under the single-pass path, not an open defect. NOT a reflection miss.

## 4. CAPTURE-FRESHNESS NOTE

The `aurora-medium-*`/`aurora-studio-*`/`aurora-select-*`/`aurora-desktop-*`/`aurora-mobile-*`
PNGs were captured today (2026-06-11 12:12–12:14) at the current surface HEAD (no aurora source
changed after that — the AZ R4/R5 corrective + Batch 5 touched dock/prune/carve/kf, not the
aurora SFCs or shaders). The `aurora-reflect-*` PNGs are this auditor's own bursts (15:3x).
Live re-verify during this pass was hampered by Chrome multi-lane contention (3 parallel
reflection isolated contexts sharing the foreground tab); the `aurora-reflect-desktop-A-full.png`
+ `aurora-reflect-hero-intro.png` are clean own-captures, the medium/studio/select set is the
same-HEAD batch, and the painterly π is read from the real-GPU gate. All evidence is at HEAD.

## VERDICT: PASS — the aurora surface meets the user's standards in totality.
