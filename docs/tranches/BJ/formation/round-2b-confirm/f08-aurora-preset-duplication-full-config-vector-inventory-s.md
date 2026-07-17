# Round 2B (confirmation pass) — F08 aurora preset duplication — full config-vector inventory, similarity clustering, and shader-path skins-vs-modes verdict

## Summary

The library exports only DEFAULT_AURORA_CONFIG; the 17 named presets live in demo/stories/substrates/aurora/presets.ts (PRESETS, L685-703) and are surfaced by aurora.vue via PRESET_KEYS. Extracting every full config vector shows three tight duplication clusters where presets differ ONLY by palette (and cosmetic sub-noise deltas): (1) the oil-pastel trio SUNSET/RAINBOW/OCEAN — every non-palette field within ~5%, nuclei layouts byte-identical; (2) the smooth-sunset trio SETTING_SUN/DUSK/VIVID_SETTING_SUN — authored in-comment as "candidate A/B/C" for ONE user ask and all shipped, config-identical modulo pink-note palette nuance; (3) the watercolor pair MEADOW/DAY9_YELLOW — same yellow→cream→blue palette family, differ mainly in warpMode. On the CRITICAL skins-vs-modes sub-question: reading the shader, 8 of the 10 medium enum values are genuinely-distinct rendering bodies (smooth/pastel/watercolor/oil-cascade/crayon/vangogh/kuwahara/metal), but oil-pastel (uMedium 6) is a PARAMETER-ONLY skin of the oil stroke cascade — mediumOilPastel calls the identical paintStrokeMedium→paintStrokeLayers as mediumOil, differing only in the profileFor StrokeProfile constants; oil's own knife/chunky are likewise profile-constant branches. metal-gradient (uMedium 9) is ~90% the metal metalShade body plus a small luma-flatten + flake-sparkle term. crayon and vangogh, by contrast, ARE dedicated distinct bodies (dry tooth-multiply / atomic-dab). Net: 17 presets carry ~11-12 distinct configs; a defensible reduction kills/merges ~5 palette-only duplicates toward the sky/sunset/dusk/dawn exemplar class the user named. kuwahara(7) and metal-gradient(9) also have ZERO named preset.

## Findings (6)

### [major] palette-only-preset-clone (oil-pastel cascade skinned 3×)

**Claim:** OILPASTEL_SUNSET, OILPASTEL_RAINBOW and OILPASTEL_OCEAN are ONE preset rendered with three palettes: every non-palette config field is within ~5% and the nuclei x/y layouts are byte-identical (only driftPhase/radius jitter). They are the purest F08 duplication.

**Evidence:** presets.ts OILPASTEL_SUNSET L320-356, OILPASTEL_RAINBOW L360-397, OILPASTEL_OCEAN L462-498. Non-palette fields: medium 'oil-pastel'/'oil-pastel'/'oil-pastel'; strokeOrient tensor all; impasto 0 all; strokeAmount 0.72/0.65/0.70; strokeScale 160/165/155; strokeAnisotropy 0.90/0.88/0.88; brokenColor 0.30/0.25/0.28; canvasGrain 0.05 all; softmaxBeta 3.5/3.2/3.5; warpAmount 0.50/0.52/0.48; warpScale 1.6/1.7/1.6; breathDepth 0.04 all; breathPeriod 50/48/52; saturation 1.10/1.08/1.05; paperGrain 0.012/0.011/0.011. Nuclei[] positions identical: (0.15,0.30)(0.50,0.25)(0.82,0.40)(0.32,0.78)(0.76,0.82) across all three. Only real cosmetic delta is flow.angle -15/-20/+25 (a diagonal-direction flip). Palettes differ (warm-sunset vs rainbow vs cool-ocean).

**Proposed:** KEEP OILPASTEL_SUNSET as the single oil-pastel exemplar (warmest/most-vivid, on-family with the user's sunset class). KILL OILPASTEL_RAINBOW and OILPASTEL_OCEAN outright, OR if the palettes are worth keeping, express them as palette-only swaps against one shared oil-pastel base object (cfg({...oilPastelBase, palette})) rather than three full duplicated configs. Net -2 presets.

### [major] shipped-design-candidates (3 alternates for 1 slot)

**Claim:** SETTING_SUN, DUSK and VIVID_SETTING_SUN are config-identical smooth warm-sunsets that differ only in palette pink-note nuance; their own comments label them 'candidate A / candidate B / candidate C' for a single user request — all three candidates were shipped instead of one chosen.

**Evidence:** presets.ts SETTING_SUN L584-619 ('candidate A — the default lead, safest'), DUSK L621-651 ('candidate B'), VIVID_SETTING_SUN L653-683 ('candidate C ... slightly MORE vibrant'). Identical non-palette config: softmaxBeta 3.0 all; warpAmount 0.5/0.52/0.5; warpScale 1.5/1.5/1.45; nucleiDrift 0.022/0.024/0.024; paletteDrift 0.016/0.018/0.018; breathDepth 0.05/0.05/0.06; breathPeriod 44/46/44; saturation 1.02/1.04/1.08; all medium 'smooth'; all share the 5-nucleus elongated sun-band layout at (0.50,~0.82) elongation 2.0. Palette deltas: SETTING_SUN 1 rose note (h12); DUSK swaps top stop to a dusk-lilac whisper (h320 C0.075); VIVID bumps chroma to 0.175 and adds a 2nd pink (h14,352).

**Proposed:** KEEP SETTING_SUN as the canonical warm-sunset (matches the user's named exemplar). KILL VIVID_SETTING_SUN — it is SETTING_SUN with chroma dialed up, already reachable via the saturation/vividness knobs. Optionally KEEP DUSK only if its single cool dusk-lilac note is judged a distinct read; otherwise offer it as a palette swap. Net -1 to -2 presets.

### [major] parameter-skin-masquerading-as-medium (oil-pastel = oil cascade)

**Claim:** oil-pastel (uMedium==6) is NOT a distinct rendering path — it is a parameter-only skin of the oil stroke cascade. mediumOilPastel calls the identical paintStrokeMedium→paintStrokeLayers body as mediumOil; the only difference is the StrokeProfile constant vector returned by profileFor. Oil's own knife/chunky are the same story (profileFor constant branches).

**Evidence:** mediums.glsl.ts mediumOilPastel L493-496 = `profileFor(MEDIUM_OILPASTEL,0); return paintStrokeMedium(...)`; mediumOil L376-382 = `profileFor(MEDIUM_OIL,mode); return paintStrokeMedium(...)`. Both dispatch through paintStrokeMedium (L344) and paintStrokeLayers (L251) — one shared 4-layer bestOil cascade. The differentiation is 100% in profileFor's StrokeProfile struct constants (oil-modes.glsl.ts L9-111): the MEDIUM_OILPASTEL branch L54-91 only reassigns fields (bristleAmp 0.25→0.10, hardness 0.80→0.58, energyGrade 0.0→0.80, etc). Oil knife(mode 1)/chunky(mode 3) at L94-109 are the same constant-branch pattern. Contrast crayon (mediumCrayon L152, dry tooth-multiply) and vangogh (mediumVangogh vangogh-medium.glsl.ts L116, dedicated atomic-dab body) which ARE distinct code bodies.

**Proposed:** State the verdict explicitly in any reduction: 8 genuinely-distinct medium bodies (smooth/pastel/watercolor/oil/crayon/vangogh/kuwahara/metal) vs oil-pastel as a profile skin of oil and metal-gradient as a near-skin of metal. If pruning mediums, oil-pastel is the strongest merge candidate into oil-as-a-mode (an 'oil-pastel' strokeMode), since it already shares the entire cascade. Do NOT prune crayon/vangogh on 'looks similar' grounds — they are distinct paths.

### [minor] near-duplicate-preset (watercolor pair)

**Claim:** OPENAI_MEADOW and DAY9_YELLOW are near-duplicate watercolors: same yellow→cream→blue/teal palette family, same watercolor medium, same diagonal flow; the only material differences are warpMode (hybrid vs fbm) and softmaxBeta/strokeAmount.

**Evidence:** presets.ts OPENAI_MEADOW L96-127 (palette h100,95,80,220,240; warpMode 'hybrid'; softmaxBeta 4.0; strokeAmount 0.15; wetEdge 0.45; granulation 0.15; diagonal -25). DAY9_YELLOW L163-192 (palette h95,90,80,200,215; warpMode default fbm; softmaxBeta 6.0; strokeAmount 0.30; wetEdge 0.50; granulation 0.18; diagonal -35). Palettes are the same lemon-yellow→cream→blue structure.

**Proposed:** MERGE toward one watercolor exemplar. KEEP OPENAI_MEADOW because it is the ONLY preset exercising the cellular/hybrid warp path (warpMode 'hybrid', domainWarp branch aurora.frag.ts L281-285) — killing it drops warp-mode render coverage. Merge/kill DAY9_YELLOW. Net -1 preset.

### [minor] over-covered-identity (warm-sunset painted 5×)

**Claim:** The warm coral→amber→gold sunset identity is carried by five separate configs, well beyond the user's single 'sunset' exemplar slot: DEFAULT_AURORA_CONFIG (library), SETTING_SUN, DUSK, VIVID_SETTING_SUN, and OILPASTEL_SUNSET — plus OPENAI_DAWN's pink/orange is adjacent.

**Evidence:** presets.ts DEFAULT_AURORA_CONFIG palette h30/55/82 (constants/presets.ts L407-411, 'warm coral-amber base... amber body... warm-gold apex'); SETTING_SUN L592-598 (coral h32/rose h12/amber h55/gold h82/cream h78); DUSK L625-631; VIVID_SETTING_SUN L657-663; OILPASTEL_SUNSET L321-328 (vermillion h22/tangerine h40/yellow h75). OPENAI_DAWN L71-78 pink/orange/lilac.

**Proposed:** After the trio-collapse (findings 2), keep exactly ONE smooth warm-sunset (SETTING_SUN) plus the OILPASTEL_SUNSET painterly variant, so the sunset identity is represented once per medium-family rather than 4× within smooth. This aligns the roster to the sky/sunset/dusk/dawn exemplar spread the user asked for.

### [note] medium-with-no-preset (dead exemplar surface)

**Claim:** Two of the ten medium enum values have zero named preset: kuwahara (uMedium 7) and metal-gradient/'Brushed Metal' (uMedium 9). metal-gradient is additionally a near-skin of metal (shared metalShade core + luma pre-flatten + a small flake-sparkle term), so the un-exemplified surface is also the least-distinct medium.

**Evidence:** mediumOptions (demo/stories/substrates/aurora/config/options.ts L22-37) lists all 10 mediums incl. Kuwahara and 'Brushed Metal'. PRESETS (presets.ts L685-703) covers only smooth/watercolor/pastel/oil/crayon/vangogh/oil-pastel/metal — no kuwahara, no metal-gradient. metal-gradient body mediumMetalGradient (metal-medium.glsl.ts L98-115) = `metalShade(mix(col,luma,0.55),...)` + additive twinkle; metal body mediumMetal L90-93 = `metalShade(col,...)`. kuwahara body mediumKuwahara (mediums.glsl.ts L397) is a genuine distinct body but the type doc (constants/presets.ts L89-93) marks it DEFAULT-OFF and no preset selects it.

**Proposed:** Decide per medium: either author a minimal exemplar preset for kuwahara (its own distinct edge-preserving body justifies a showcase) OR document it as studio-only. For metal-gradient, given it is a thin skin of metal, either fold it into metal as a 'sparkle' knob or keep it studio-only; do not add a full duplicate preset. This is medium-coverage bookkeeping, not a config duplication per se.

