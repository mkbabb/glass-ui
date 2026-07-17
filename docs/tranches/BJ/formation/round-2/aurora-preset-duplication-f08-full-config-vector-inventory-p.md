# Round 2 — Aurora preset duplication (F08): full config-vector inventory, pairwise similarity clustering, medium real-vs-skin analysis, and a data-backed keep/kill/merge reduction proposal.

## Summary

SCOPE: All 17 authored aurora presets live in demo/stories/substrates/aurora/presets.ts (the library ships none — only DEFAULT_AURORA_CONFIG + PAPER_WASH_GROUND in src/components/aurora/constants/presets.ts). Roster: SETTING_SUN, DUSK, VIVID_SETTING_SUN (smooth); OPENAI_SKY, OPENAI_DAWN (smooth); OPENAI_MEADOW, DAY9_YELLOW (watercolor); DELIBERATIVE (pastel); OIL_IMPASTO, OIL_GESTURAL (oil); VANGOGH (vangogh); OILPASTEL_SUNSET/RAINBOW/OCEAN (oil-pastel); CRAYON (crayon); METAL (metal); SPEEDTEST (smooth, alpha 0.26 dashboard baseline).

REAL MEDIA vs SKINS (read from shader bodies):
- Genuinely distinct rendering bodies, dual-ported (WebGL2 + WGSL): smooth(base no-op), pastel (mediumPastel), watercolor (mediumWatercolor), crayon (mediumCrayon — DRY tooth-multiply, its OWN body on both backends), kuwahara (mediumKuwahara), metal (metalShade BRDF). CRAYON is one of the few with a truly independent body on BOTH backends — the user's intuition that "crayon is almost identical to oil" is FALSE at the shader level; crayon is a tooth-multiply, oil is a stroke cascade.
- oil (mediumOil) + vangogh (mediumVangogh): distinct bodies on WebGL2 only.
- SKINS (constants only, per the repo's own "a mode that only changes constants is a skin" rule): oil-pastel (uMedium 6) shares paintStrokeMedium() with oil (uMedium 3); the only difference is the StrokeProfile struct returned by profileFor(MEDIUM_OILPASTEL) — same cascade, tooth, relight. The oil strokeModes knife/chunky are also profileFor constant-swaps. metal-gradient = metalShade + one additive sparkle term (near-skin, no preset uses it).
- BACKEND COLLAPSE (the biggest fact): on the WGSL primary, applyMedium (aurora-mediums.wgsl.ts:399-400) maps medium==3||5||6||7 ALL to mediumKuwahara. So oil, vangogh, oil-pastel and kuwahara render byte-identically on WebGPU, distinguished only by palette + strokeScale/strokeAmount/canvasGrain fed to the same Kuwahara operator.

SIMILARITY CLUSTERS (computed deltas):
- Setting-sun trio (near-duplicate): SETTING_SUN vs VIVID_SETTING_SUN nuclei mean-displacement 0.012, palette dC 0.031/dHue 18°; VIVID is SETTING_SUN +~0.02 chroma. DUSK differs only by ONE lilac top-stop (h320, C0.075) — same elongated-band nuclei archetype, same warp/motion. In-source comments label these "candidate A / candidate B / candidate C" — three alternatives for one slot, all shipped.
- Oil-pastel trio (one preset, three palettes): SUNSET/RAINBOW/OCEAN share identical medium, identical 5-nucleus archetype (Δ0.045-0.058), identical stroke params (strokeAmount 0.65-0.72, strokeScale 155-165, aniso 0.88-0.90, canvasGrain 0.05, impasto 0). Differ ONLY by palette hue-family + flow angle. On WGSL even more identical (both → Kuwahara).
- Oil pair: OIL_IMPASTO(knife,impasto0.65,layers1) vs OIL_GESTURAL(chunky,impasto0.42,layers2) — genuinely distinct on WebGL, collapse to identical Kuwahara on WGSL; palettes overlap (both warm+cool-accent).
- Watercolor pair: MEADOW vs DAY9_YELLOW both yellow-dominant watercolor with a cool intrusion (blue h220-240 vs teal h200-215); moderately redundant.
- Genuinely distinct, keep: SKY (only cool-blue atmospheric), DAWN (pink/orange/lilac diagonal), CRAYON, METAL, VANGOGH, DELIBERATIVE (pastel/radial).

REDUCTION PROPOSAL (17 → 9-10, honoring the "keep the best: sky/sunset/dusk/dawn" ask):
KEEP: OPENAI_SKY(→Sky), OPENAI_DAWN(→Dawn), SETTING_SUN(→Sunset; optionally fold VIVID's +chroma in), DUSK(→Dusk; the lilac stop is its one real differentiator), CRAYON, METAL, VANGOGH(medium hero — flag WGSL→Kuwahara caveat), one watercolor (MEADOW or DAY9), optionally DELIBERATIVE(pastel), one oil (OIL_IMPASTO).
KILL as JND/palette-swap duplicates: VIVID_SETTING_SUN (SETTING_SUN + 0.02 chroma), OILPASTEL_RAINBOW + OILPASTEL_OCEAN (keep OILPASTEL_SUNSET as the single Oil Pastel), OIL_GESTURAL (keep OIL_IMPASTO), one of MEADOW/DAY9.
RELOCATE: SPEEDTEST is a consumer dashboard config (alpha 0.26 static baseline), not an aesthetic showcase — belongs in the consumer/speedtest repo per presets-in-consumers.
This is a ~45% cut removing 6-7 near-duplicates. NOTE: reducing to "smooth-only atmospheric + crayon + metal" would be even more defensible on WebGPU since oil/oil-pastel/vangogh are visually indistinct there.

## Findings (8)

### [critical] primary-backend-medium-collapse

**Claim:** On the WGSL primary backend (WebGPU, the runtime's preferred path), oil/vangogh/oil-pastel/kuwahara mediums all render the identical Kuwahara body, so the six oil/oil-pastel/vangogh presets differ only by palette on the backend most users run.

**Evidence:** src/components/aurora/constants/shaders/aurora-mediums.wgsl.ts:399-400 — `if (medium == 3 || medium == 5 || medium == 6 || medium == 7) { return mediumKuwahara(col, p, t); }`. useAurora.ts:25 + runtime.ts:2 confirm WebGPU-first. Affected presets: OIL_IMPASTO, OIL_GESTURAL, VANGOGH, OILPASTEL_SUNSET/RAINBOW/OCEAN (presets.ts:194-498).

**Proposed:** The medium distinction among oil/oil-pastel/vangogh is invisible on WebGPU; this alone justifies collapsing all oil-family showcase presets to at most one per genuinely-distinct WebGL body (or one Kuwahara showcase). Either port the full stroke bodies to WGSL or stop treating these as distinct presets.

### [major] candidate-trio-shipped-as-three-presets

**Claim:** SETTING_SUN, DUSK, and VIVID_SETTING_SUN are three A/B/C candidates for a single 'warm setting sun' slot that all got shipped; they share an identical nuclei archetype and differ by JND-level palette/param amounts.

**Evidence:** presets.ts:584 (`SETTING_SUN (candidate A — the default lead)`), :621 (`DUSK (candidate B)`), :653 (`VIVID_SETTING_SUN (candidate C)`). Computed: SETTING_SUN↔VIVID nuclei mean-displacement 0.012, palette dC 0.031/dHue 18° (VIVID = SETTING_SUN +~0.02 chroma); DUSK differs from SETTING_SUN only by one lilac top-stop (h320 C0.075) — same elongated sun-band nuclei, same warp 0.5/1.5, same motion.

**Proposed:** KILL VIVID_SETTING_SUN (pure +chroma duplicate — bump SETTING_SUN's chroma if more vividness is wanted). KEEP SETTING_SUN (→Sunset) and DUSK (its lilac stop is the one real differentiator) to honor the user's 'sunset, dusk' naming.

### [major] palette-swap-triplet

**Claim:** OILPASTEL_SUNSET, OILPASTEL_RAINBOW, and OILPASTEL_OCEAN are one preset with three palettes: identical medium, identical nuclei archetype, and identical stroke parameters — differing only by palette hue-family and flow angle.

**Evidence:** presets.ts:318-498. Nuclei mean-displacement 0.045-0.058; stroke params identical (strokeAmount 0.65-0.72, strokeScale 155-165, strokeAnisotropy 0.88-0.90, canvasGrain 0.05, impasto 0, strokeOrient tensor); only palette (warm/rainbow/cool) + flowAngle (-15/-20/+25) differ. On WGSL all three additionally collapse to the same Kuwahara render.

**Proposed:** MERGE to one. KEEP OILPASTEL_SUNSET as the single 'Oil Pastel' showcase; KILL RAINBOW and OCEAN (a cool/rainbow variant is a palette swatch, not a separate preset).

### [major] oil-pastel-is-a-skin-of-oil

**Claim:** The oil-pastel medium (uMedium 6) is a parameter-only skin of the oil medium (uMedium 3), not a distinct rendering mode: both call the same paintStrokeMedium() substrate, differing only by StrokeProfile constants.

**Evidence:** src/components/aurora/constants/shaders/mediums.glsl.ts:493-496 — mediumOilPastel() is just `return paintStrokeMedium(col, p, t, profileFor(MEDIUM_OILPASTEL, 0), 0)`, same body as mediumOil() (:376-382). oil-modes.glsl.ts:54-91 shows profileFor(MEDIUM_OILPASTEL) only sets struct constants (shapeType, bristleAmp, hardness, streakFreq…). Per the repo's own charter criterion, a mode that only changes constants is a skin.

**Proposed:** Treat oil and oil-pastel as one rendering family. At the preset level this reinforces merging the oil (2) and oil-pastel (3) presets down to one showcase each at most; the oil-pastel/oil medium split is a taxonomy skin, not a distinct engine.

### [minor] oil-submode-skins

**Claim:** OIL_IMPASTO and OIL_GESTURAL differ only by oil strokeMode (knife vs chunky) — which are profileFor constant-swaps — plus strokeLayers; they are the same stroke-cascade body with different constants, and render identically on WGSL.

**Evidence:** presets.ts:225 (strokeMode knife) vs :265 (strokeMode chunky); oil-modes.glsl.ts:93-110 shows knife(mode 1)/chunky(mode 3) only mutate StrokeProfile constants over the shared cascade. Palette dL 0.127 but overlapping warm+cool-accent hue families; both → mediumKuwahara on WGSL.

**Proposed:** MERGE to one oil showcase. KEEP OIL_IMPASTO (the more dramatic knife/impasto read); KILL OIL_GESTURAL.

### [minor] watercolor-pair-overlap

**Claim:** OPENAI_MEADOW and DAY9_YELLOW are both yellow-dominant watercolor presets with a cool diagonal intrusion — overlapping concept.

**Evidence:** presets.ts:96-127 (MEADOW: yellow h95-100 + blue h220-240, watercolor, hybrid warp, diagonal -25) vs :163-192 (DAY9: yellow h90-95 + teal h200-215, watercolor, diagonal -35). Same medium, same yellow+cool-intrusion structure, similar diagonal flow.

**Proposed:** MERGE to one watercolor showcase; KILL the redundant one (keep MEADOW for the hybrid-warp block territories, or DAY9 for the higher-beta hard cells — pick one).

### [note] speedtest-is-consumer-config-not-preset

**Claim:** SPEEDTEST is a consumer dashboard baseline (static alpha 0.26 landing-page tone), not an aesthetic showcase preset, and per presets-in-consumers belongs in the speedtest consumer repo.

**Evidence:** presets.ts:399-458 — comment states it is 'the live config used by a consumer dashboard' with the reactive light/dark fork living 'in the consumer repo'; alpha:0.26 is a functional transmissivity baseline, not a look.

**Proposed:** RELOCATE to the consumer/speedtest repo; remove from the demo showcase gallery.

### [note] stale-doc-comment-drift

**Claim:** uniformBridge.ts claims the WGSL primary renders the smooth core for every painterly id (1-7), but the WGSL port actually renders pastel/watercolor/crayon/kuwahara bodies and routes oil/vangogh/oil-pastel to Kuwahara — the comment is stale and misdescribes the real backend behavior.

**Evidence:** src/components/aurora/composables/uniformBridge.ts:76-79 ('The WGSL primary renders the smooth core for every painterly id (1-7)') contradicts aurora-mediums.wgsl.ts:387-403 (real bodies for 1/2/4, Kuwahara for 3/5/6/7) and the aurora.wgsl.ts:13-16 header ('NEVER a silent smooth degrade').

**Proposed:** Correct the uniformBridge.ts comment; it currently understates the WGSL fidelity and would mislead any reduction decision based on backend parity.

