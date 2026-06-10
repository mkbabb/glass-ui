# AZ.W-BLOB-STUDIO - the studio refinement: interaction, metaball merge, satellite controls, shadow, configurator hierarchy, + the folded uBackdrop refraction

**Name**: W-BLOB-STUDIO - the studio refinement + the folded W-BLOB-GLASS refraction
**Opens after**: AZ open (Batch 3; ‖ W-BLOB-PAGE, W-MOTION-SUITE, W-SHELL-CONFIG, W-SHELL-IDENTITY). Consumes W-HIERARCHY's configurator-hierarchy vocabulary — if W-HIERARCHY (Batch 4) has not landed, this wave applies the hierarchy idioms inline and W-HIERARCHY ratifies them as the shared vocabulary at Batch 4.
**Track**: Band B (the blob) · **Type**: implementation (demo studio + library tuning + the conditional refraction) · **Depends on**: W-GATES; coordinates `types.ts` disjointness with W-BLOB-PAGE.
**Hard gate**: born-RED `proof:blob-studio` — the studio exposes a Satellites geometry layer (count/orbit/satellite-radius), the configurator carries the primary→secondary→tertiary hierarchy with dividers, the metaball bridge widens on a louder smoothK, the shadow reads as a grounded gel-dome; PLUS the FOLDED `proof:blob-glass` refraction bites under their ORIGINAL G-PERF + G-BROWSER binding gates (inherited verbatim from `AY.W-BLOB-GLASS.md`).
**Status**: SPEC

## §0 — RE-GROUND (mandatory step-0 before any edit)

RE-GREP every cite at HEAD; the digest compresses line numbers. The BINDING re-attribution holds: the GL bead is crisp (`C6-1`/`F2-R3-9` REFUTED) — this wave does NOT re-open the renderer's resolution/DPR. R3-10 is a REFINEMENT ask over an already-working creature ("Good, but needs refinement: better interaction, better metaballing, better satellite options, better shadowing; configurator needs refinement and design-hierarchy structuring"). The booked `B1-W-BLOB-GLASS` folds in: re-read `docs/tranches/AY/waves/AY.W-BLOB-GLASS.md` IN FULL and inherit its G-PERF (the M5-Max frame baseline at §2) + G-BROWSER (WebGL2-core-only, three-engine capture) gates VERBATIM — they are BINDING conditions, not footnotes (the user's conditional greenlight 2026-06-09: "if this is performant and actually works on all browsers, absolutely").

The fleet finding ids this wave executes (re-grep each):

| finding | verdict | what it means for this wave |
|---|---|---|
| `C6-5` | DESIGN-FINDING S2 | studio bead undersized + off-center (w-64 max-w-[80%] in an h-[min(70vh,560px)] stage → bead ~30% of stage height, left of center). |
| `C6-6` | DESIGN-FINDING S3 | metaball merge quality: `smoothK=0.05` + `merge='quadratic'` creases at the seam; `circular` rounds menisci; a louder smoothK widens the gooey bridge so a metaballing-in satellite reads as a stretching neck not a hard pop. |
| `C6-7` | GAP S2 | studio exposes NO satellite/geometry controls — `satelliteCount`/`satelliteRadius`/`orbitRadius`/`eccentricity` are all unsurfaced; a Satellites ConfiguratorLayer makes the C6-3 orbit a live knob. |
| `C6-8` | DESIGN-FINDING S3 | shadow is a single soft `filter:drop-shadow` on the wrapper — no in-scene grounding (no contact-darkening, no AO under merged satellites). |
| `C6-9` | DESIGN-FINDING S3 | interaction reads near-static: `pointerStrength=0.10` + `pointerAttraction=0.35` calm; the squash/stretch axis is a noise-floor whisper (`stretch=0.5`, a measured 0% body-aspect change between stretch 0 and 1.5). |
| `C6-10` / `F3-M11` | DESIGN-FINDING S2 / GAP S2 | the studio Configurator is a flat undifferentiated stack — preset pills plain, no dividers, no primary→secondary→tertiary hierarchy. The R3-8/R3-10 design-structure half. |
| `C6-11` / `B1-W-BLOB-GLASS` | FOLD-TO-AZ S1 | the booked uBackdrop Snell refraction folds in here under G-PERF + G-BROWSER. NOTE: /substrates/blob has NO aurora behind the bead → the over-static-surface one-shot snapshot path is the relevant FBO source, not the aurora handshake. |
| `C6-12` | VERIFIED S3 | the live page is console-clean, one GL context, the pause seam + per-preset clone work — the defects are visual/geometry/IA, not runtime breakage. |

## §1 — Verified defect table (file:line at HEAD — RE-GREP)

| # | defect | evidence (file:line) | capture |
|---|---|---|---|
| D1 | studio bead undersized/off-center: stage is `h-[min(70vh,560px)]` but the GooBlob wrapper is fixed `w-64 max-w-[80%]` (256px) — bead occupies ~30% of stage height, sits small/left while the controls aside pushes it | `demo/stories/substrates/blob.vue` (the studio stage + GooBlob wrapper sizing) | `ground/c6-blob-08-studio-bead.png`, `c6-blob-09-studio-bead-zoom.png` |
| D2 | metaball merge creases: `smoothK: 0.05` + `merge: "quadratic"` (the quadratic smin creases at the seam); the IQ-normalized smin band rides `smoothK*moodMult*POS_SCALE` so the bridge is tight | `src/components/custom/goo-blob/types.ts:239` (smoothK 0.05), `:240` (merge quadratic); `src/components/custom/goo-blob/composables/uploadBlobUniforms.ts` (the smin band upload, RE-GREP the line) | — |
| D3 | NO satellite/geometry controls surfaced: the studio exposes only attraction/clickImpulse/mood/seed/harmony; `BlobGeometry` atoms (`satelliteCount` default 3, shader cap `MAX_SATS=4`, `satelliteRadius` 0.082, `orbitRadius` 0.17, `eccentricity` 0.05) are unsurfaced | `demo/stories/substrates/blob.vue:298-359` (controls expose interaction+mood only); `src/components/custom/goo-blob/types.ts:86-90` (BlobGeometry atoms); `src/components/custom/goo-blob/constants.ts:13` (MAX_SATS 4) | `ground/c6-blob-04-studio.png` |
| D4 | shadow is flat/ungrounded: a single soft `filter:drop-shadow(var(--blob-shadow))` with a hover variant `--blob-shadow-hover` on the wrapper — no contact-darkening at the base, no AO under merged satellites | `src/components/custom/goo-blob/GooBlob.vue:262,267` (RE-GREP) | — |
| D5 | interaction near-static at rest: `pointerStrength: 0.1` + `pointerAttraction: 0.35` calm; `stretch: 0.5` is a noise-floor whisper (the D3 comment notes a live readback measured ~0% body-aspect change between stretch 0 and 1.5 — the squash is uncoupled from a visible taffy-pull) | `src/components/custom/goo-blob/types.ts:335` (pointerAttraction 0.35), `:336` (pointerStrength 0.1), `:337` (stretch 0.5) | — |
| D6 | configurator flat: preset pills (Calm/Excited/Shy) read as plain text pills with no weight; `ConfiguratorLayer` sections have `dividers` UNSET; bare LabeledSlider/LabeledSelect rows with no grouping emphasis — no primary→secondary→tertiary hierarchy | `demo/stories/substrates/blob.vue:299,321` (dividers unset on the two layers) | `ground/c6-blob-04-studio.png`, `ground/a3-B21-configurator.png` |
| D7 (FOLD) | the bead is ENAMEL not GLASS: it does not refract the backdrop (zero displacement today) — the booked W-BLOB-GLASS move is unbuilt | `src/components/custom/goo-blob/shaders/metaball.frag.ts` (the squircle-bevel edit-site, RE-GREP per `AY.W-BLOB-GLASS.md §1.3`); no `uBackdrop` sampler today | — |

## §2 — Goal criterion

The blob studio is a refined instrument: the living bead fills the stage as a LARGE centered hero; the metaball merge reads as a rounded gooey bridge (a metaballing-in satellite stretches a neck, never a hard pop); the configurator exposes the satellite/orbit geometry as live knobs so the user can dial the orbit out and WATCH the metaballing; the pointer interaction has a louder lean register the studio can reach; the shadow grounds the bead as a gel dome sitting ON a surface; and the configurator carries a clear primary(interaction)→secondary(mood/palette)→tertiary(geometry) hierarchy with section dividers and a weighted preset row. PLUS, IF AND ONLY IF the two binding conditions hold, the bead becomes GLASS — refracting the backdrop through the dome (the folded W-BLOB-GLASS move). A studio session is a tuning experience with visible cause→effect, not a flat stack of sliders over a small static-looking bead.

## §3 — Scope

1. **Stage the hero (D1).** Scale the studio GooBlob to fill the stage — a LARGE centered living bead, not a small swatch in a big empty stage. Re-base the wrapper sizing off the fixed `w-64 max-w-[80%]` onto a stage-proportional size; center it against the controls aside.
2. **Metaball merge quality (D2).** Surface `smoothK` and `merge` (quadratic|circular) as studio knobs AND re-base the studio default toward the rounder read: a louder `smoothK` so the gooey bridge widens (the metaballing-in satellite reads as a stretching neck), and `merge='circular'` for rounder menisci where the seam-crease shows. This is a LIBRARY default decision in `types.ts` (coordinate disjointness with W-BLOB-PAGE) plus the studio surfacing.
3. **Satellite geometry layer (D3 + the C6-7 GAP).** Add a "Satellites" `ConfiguratorLayer` to the studio: a count slider (0–`MAX_SATS`=4), an orbit-radius slider, a satellite-radius slider, an eccentricity slider — threaded through the studio's per-preset clone config. This makes the C6-3 orbit-vs-body geometry a LIVE knob (the user dials orbitRadius past bodyRadius and SEES the metaballing — the cause→effect the user asked for). The layer consumes the existing `BlobGeometry` atoms; no new substrate.
4. **Shadow grounding (D4).** Move the blob shadow from a single soft wrapper drop-shadow to a grounded read: a layered/elliptical contact shadow that darkens at the bead base (the gel-dome-on-a-surface read) plus an AO hint under merged satellites. This rides the existing `--blob-shadow` token family (token-first — a consumer retints by overriding the rung); the W-BLOB-GLASS refraction (if it lands) also displaces the shadow read, so sequence the shadow tune to compose with §3.7.
5. **Interaction loudness register (D5).** Surface a louder pointer-lean register for the studio (a "responsiveness" axis or a re-coupled velocity-squash) so a fast flick reads a visible taffy-pull — the D3-comment uncoupling path (re-couple the velocity squash off the heavily-damped spring). The SHIPPED calm default stays the page/library default (AX.W46 calibrated-calm); the studio gains the louder lean as a surfaced knob, NOT a default re-base. Restraint counter recorded.
6. **Configurator design hierarchy (D6 + the C6-10/F3-M11 ask, consuming W-HIERARCHY vocabulary).** Restructure the studio Configurator into a clear primary→secondary→tertiary hierarchy: enable `dividers` on the layers, strengthen the preset row as the PRIMARY affordance (weighted pills, not plain text), order the layers primary(Interaction)→secondary(Mood+palette)→tertiary(Geometry/Satellites), apply the section-weight/label-register/control-rhythm vocabulary W-HIERARCHY defines. If W-HIERARCHY has not yet landed its vocabulary, apply the idioms inline here and flag them for W-HIERARCHY ratification (the blob/aurora studios are W-HIERARCHY's named inheritors — `AZ.md` Band G).
7. **The FOLDED W-BLOB-GLASS refraction (D7 — CONDITIONAL).** Execute the booked uBackdrop Snell refraction + squircle bevel per `AY.W-BLOB-GLASS.md §1` IN FULL — the `uBackdrop` sampler (over /substrates/blob's static surface → the one-shot snapshot path, NOT the aurora-FBO handshake, per `C6-11`), the in-shader Snell offset composed UNDER the existing rim/specular/SSS stack, the circle→quartic-squircle dome-Z profile. The two BINDING gates G-PERF + G-BROWSER are inherited VERBATIM from `AY.W-BLOB-GLASS.md §2-§3` (the M5-Max frame baseline, the three-engine capture, the additive-on-detect enamel fallback). **If G-PERF or G-BROWSER cannot hold after a genuine attempt, §3.7 closes CONDITIONS-UNMET with the measurements recorded and the enamel state stands** — the greenlight evaporates on a failed condition, never a degraded ship (the user's conditional was explicit). The rest of the wave (§3.1-§3.6) is UNCONDITIONAL and does not depend on §3.7.
8. **The born-RED gate `proof:blob-studio`** (§6) + the folded `proof:blob-glass` bites.

### §3a — Triumvirate Dispatch

- **File-bounds expansion**: if the refraction (§3.7) needs a render-pipeline change beyond one sampler + one tap + the bevel profile (the `AY.W-BLOB-GLASS §4` scope fence: NOT a ray-marcher, NOT a second pipeline), the scope-reveal trigger fires — triumvirate, do not let the refraction metastasize.
- **Hard-gate failure not local-edit-recoverable**: G-PERF regression (any blob state over 16.7ms throttled with refraction ON) is NOT a local edit — it closes §3.7 CONDITIONS-UNMET per the inherited clause; the orchestrator records the measurement and stands the enamel state (no triumvirate needed, the close path is specified).
- **Diagnostic loop**: three iterations tuning the metaball merge (§3.2) without a rounder bridge readback → triumvirate (the smin-band research lane).
- **Disjointness with W-BLOB-PAGE**: both touch `types.ts`. W-BLOB-PAGE owns the PAGE-default satellite geometry (orbitRadius vs bodyRadius for the page hero); this wave owns the STUDIO merge/satellite defaults + the surfaced knobs. Sequence: W-BLOB-PAGE sets the page default first; this wave re-bases the merge default + adds the studio knobs. NEVER parallel-write `types.ts`.

## §4 — File Bounds

| File | Access |
|---|---|
| `demo/stories/substrates/blob.vue` | modify (stage sizing, the Satellites layer, the louder-lean knob, the configurator hierarchy — coordinate with W-BLOB-PAGE which owns the page IA/static-row; this wave owns the STUDIO block §296-359) |
| `src/components/custom/goo-blob/types.ts` | modify (merge default re-base; coordinate disjointness with W-BLOB-PAGE) |
| `src/components/custom/goo-blob/shaders/metaball.frag.ts` | modify (the squircle-bevel + Snell offset — §3.7 CONDITIONAL) |
| `src/components/custom/goo-blob/shaders/sdf-body.glsl.ts` | modify (the smin-band widen — §3.2; the dome-Z profile if §3.7) |
| `src/components/custom/goo-blob/composables/useMetaballRenderer.ts` | modify (the uBackdrop sampler wiring — §3.7 CONDITIONAL) |
| `src/components/custom/goo-blob/composables/uploadBlobUniforms.ts` | modify (the smin-band uniform + the louder-lean uniform — §3.2/§3.5) |
| `src/components/custom/goo-blob/GooBlob.vue` | modify (the grounded shadow — §3.4) |
| `src/styles/` blob-shadow rung (RE-GREP the file) | modify (the grounded contact-shadow token — §3.4) |
| `scripts/proof-blob-studio.mjs` | create (the born-RED gate, including the folded proof:blob-glass bites) |
| `scripts/gates.mjs` | modify (register the row — coordinate with W-GATES) |

Do NOT touch: the WatercolorDot component (W-BLOB-PAGE owns its filter). The blob page IA / static swatch row (W-BLOB-PAGE owns the page staging). The aurora pipeline. `demo/stories/substrates/blob.vue` lines OUTSIDE the studio block (the static-register section is W-BLOB-PAGE's).

### §4a — Disjointness

This wave runs as ONE agent unit — the studio surfaces (stage, configurator, satellite layer, shadow, interaction) plus the conditional refraction are coupled (the refraction displaces the shadow read; the satellite layer makes the orbit a live knob the merge-tune then reads). The `types.ts` and `blob.vue` shared-file risks with W-BLOB-PAGE are sequenced (§3a). `scripts/gates.mjs` is appended after W-GATES (Batch 0). No intra-wave parallel write.

## §5 — Agent Units

### AZ.W-BLOB-STUDIO.1 the studio refinement + conditional glass

- **Goal**: the studio is a large-hero tuning instrument with a satellite-geometry layer, a rounder metaball bridge, a grounded shadow, a louder-lean register, a primary→secondary→tertiary configurator hierarchy, and (conditionally) a refracting glass bead.
- **Mechanism**: stage-fill sizing; a Satellites ConfiguratorLayer over the BlobGeometry atoms; smin-band widen + circular merge default; a layered contact-shadow token; a surfaced louder pointer-lean; `dividers` + weighted preset row + the hierarchy vocabulary; and the §3.7 uBackdrop Snell refraction + squircle bevel under the inherited G-PERF/G-BROWSER gates.
- **Files**: the §4 set.
- **Sub-gate**: `proof:blob-studio` GREEN (the §6 conditions) + the folded `proof:blob-glass` bites GREEN-or-CONDITIONS-UNMET-recorded + the π DELTA pairs on disk.

## §6 — Hard Gate (born-RED `proof:blob-studio` + the folded `proof:blob-glass`)

A SPECIFICATION authored as `scripts/proof-blob-studio.mjs`, born-RED against HEAD. Bites:

1. **SATELLITE-LAYER-LIVE (source-witness + π).** The studio renders a Satellites ConfiguratorLayer with count/orbit-radius/satellite-radius controls bound to the BlobGeometry atoms; a live readback confirms dialing orbit-radius up SEPARATES a satellite (the connected-component/neck-pinch metric from W-BLOB-PAGE §6.2, here driven by the knob). RED today (no geometry controls — `blob.vue:298-359`).
2. **MERGE-BRIDGE-ROUNDER π (born-RED).** With a louder `smoothK`, capture the body→satellite bridge during a metaball-in and assert the bridge band is WIDER than the HEAD baseline (a measured neck-width at the bridge, or the absence of the quadratic seam-crease). RED today (`smoothK=0.05` quadratic creases).
3. **CONFIGURATOR-HIERARCHY (source-witness + π).** The studio Configurator carries `dividers` enabled, the preset row weighted as primary, and the layer order primary(Interaction)→secondary(Mood/palette)→tertiary(Geometry/Satellites); a π capture shows the differentiated hierarchy (not the flat stack). RED today (`blob.vue:299,321` dividers unset).
4. **SHADOW-GROUNDED π (born-RED).** The blob shadow reads as a grounded gel-dome (a contact-darkening band at the base + AO under merged satellites) — a π capture DELTA against the single-soft-drop-shadow HEAD state. RED today (`GooBlob.vue` single drop-shadow).
5. **STAGE-FILL π.** The studio bead occupies ≥ a target fraction of the stage height (the C6-5 ~30% → a larger floor) and is centered — a measured bounding-box-vs-stage ratio. RED today (`w-64` in `h-[min(70vh,560px)]`).
6. **THE FOLDED `proof:blob-glass` (CONDITIONAL — inherited verbatim from `AY.W-BLOB-GLASS.md §3`):**
   - **REFRACTION-READS π (born-RED)**: a high-contrast backdrop feature samples through the bead edge at the η-predicted offset (ZERO shift = enamel = RED today). Over /substrates/blob this is the static-surface one-shot snapshot path (no aurora behind the bead — `C6-11`).
   - **G-PERF**: the frame-budget arm GREEN with refraction ON, the SHIPPED budget unchanged, re-run of the `AY.W-BLOB-GLASS §2` M5-Max protocol (4× throttle, p50 ≤ ~12ms / 0% over 16.7ms). A regression over 16.7ms throttled → §3.7 closes CONDITIONS-UNMET, enamel stands.
   - **G-BROWSER**: WebGL2-core-only source-witness (no `getExtension` beyond the shipped set, no float-texture dependency) + the chromium+webkit+firefox capture set on disk; additive-on-detect enamel fallback.
   - **IDENTITY-PRESERVED**: `proof:blob-warm-default` + the blob-render band stay GREEN.
7. **IDENTITY + DELTA.** `proof:component-orphan` GREEN; the captured before/after DELTA pairs (stage, merge bridge, configurator, shadow, refraction tri-engine), light+dark, on disk under `ground/W-BLOB-STUDIO-`.

## §7 — Format And Lint Cadence

`npm run typecheck` after each of the type/shader edits and at close; the shader-split gates (`proof:blob-tempo-suppression`/`proof:blob-interaction-prm`) must stay GREEN after the smin/refraction edits (W-GATES re-points them to the splice-resolved chunk set per `B1-blob-shader-split-repoint` — coordinate). `git diff --check` before close. Gate defaults `:5199`, never `:5173`.

## §8 — Verification Artefacts

- `ground/W-BLOB-STUDIO-{stage,merge-bridge,configurator,shadow}-{before,after}-{light,dark}.png`
- `ground/W-BLOB-STUDIO-refraction-{chromium,webkit,firefox}-{before,after}.png` (the tri-engine set — §3.7)
- `ground/W-BLOB-STUDIO-gperf-{rest,hover,click}.json` (the re-run frame-budget arm)
- `scripts/proof-blob-studio.mjs` (the gate, GREEN or with §3.7 CONDITIONS-UNMET recorded)
- the `proof:blob-studio` PASS log + the G-PERF/G-BROWSER measurement record

## §9 — Commit Plan

- one implementation commit for §3.1-§3.6: `feat(AZ): blob-studio refinement — satellite layer + merge bridge + grounded shadow + louder lean + configurator hierarchy + stage hero`.
- one commit for §3.7 IF it lands GREEN: `feat(AZ): blob glass-not-enamel — uBackdrop Snell refraction + squircle bevel (G-PERF/G-BROWSER green)` (body: the measured perf/browser record). If CONDITIONS-UNMET: a `docs(AZ)` commit recording the measurements + the enamel-stands decision.
- the gate-registration line + a status commit at close.

## §10 — Dependencies

- **Depends on**: W-GATES (proof:all crashable; the shader-split gate re-point); W-HIERARCHY (the configurator-hierarchy vocabulary — soft: apply inline + ratify if W-HIERARCHY lands later).
- **Blocks**: nothing hard; coordinates `types.ts`/`blob.vue` disjointness with W-BLOB-PAGE.

## §11 — Archaeology

`AY.W-BLOB-GLASS.md` is the prior recorded DECISION (CONDITIONALLY greenlit 2026-06-09); its G-PERF baseline (`§2`, the M5-Max frame table, run 2026-06-09) is the measured floor the refraction starts from. New guardrail: the refraction folds into the studio wave (not a separate green run, per AY FINAL §2: "folded into the blob band — no separate green run owed"), and the §6.6 bites are the inherited gates verbatim — the implementation agent does not re-derive G-PERF/G-BROWSER, it RE-RUNS the recorded protocol. The C6-11 note (no aurora behind the /substrates/blob bead → the one-shot snapshot FBO path, not the aurora handshake) is the relevant source for THIS page.
