# BI.W-AURORA-VIBRANCY — vibrant auroras + the setting-sun preset + the larger studio canvas

Band B5 (substrates). All auroras lift into the warm-vivid chroma band; a demo-local setting-sun preset
(the pink note); the studio canvas grows.

## §Mandate

Discharges (registry rows this wave OWNS):
- **UF-E1** — "All background auroras should have slightly more vibrant and interesting colors… could have
  a few more notes of pink—like the setting sun. This should be a proper preset, too, setting sun."
- **UF-E4** — "/substrates/aurora is good, but the core chosen aurora space should be larger." (the studio
  canvas).

## §Design

Decided mechanism — D-VIZ PASS-1 §3.5 (vibrancy config-level, ZERO shader edit; setting-sun DEMO-LOCAL) +
the prior-art OKLCH candidates (BANK, adopted as constraints). NO re-litigating the shader fence (GL is
absolute — this is config + demo-preset + layout only).

- **Vibrancy (all auroras, config-level, ZERO shader edit):** lift the PALE presets' chroma into the
  0.13–0.20 warm band (the vivid presets already live there) by engaging the existing chroma-floor scaffold
  (`DEFAULT_VIVIDNESS`/`VIVID_TARGET`, `presets.ts`); "interesting" = a SECOND complementary-warm accent hue
  per palette (the DAWN-lilac / SUNSET-rose model — a monochrome ramp reads flat). The vibrancy lift NEVER
  drops content-over-glass below the AA/APCA floor (bounded by the bright-bucket darken headroom — G9).
- **The setting-sun preset (DEMO-LOCAL — presets-in-consumers; NEVER a library token):**
  `demo/stories/substrates/aurora/presets.ts`, smooth-medium, three OKLCH candidates:
  - **A "Setting Sun" (default, safest):** `[{L:.52,C:.15,h:32}, {L:.66,C:.145,h:12}(rose sun-core — THE
    pink note), {L:.78,C:.135,h:55}, {L:.87,C:.11,h:82}, {L:.93,C:.045,h:78}]` — hues 12–82 all warm.
  - **B "Dusk":** stronger coral-rose + ONE low-chroma dusk-lilac top stop (`C 0.075, h 320` — a whisper
    twilight, warm mass dominates).
  - **C "Vivid Setting Sun":** the "slightly more vibrant" delivery — two pink/coral notes, chroma to 0.175,
    still all-warm.
  - Composition: warm nuclei biased LOW (y 0.6–0.9), pale stop up top (y≈0.2), horizon glow horizontally
    elongated (elongation ≈2, angle 0 — a sun-BAND not a blob), softmaxBeta ≈3.0, nucleiDrift 0.015–0.03.
- **The studio canvas** (UF-E4): `AuroraStage.vue` / `VizStudio.vue` max-width/height layout bump — demo-only,
  low-risk (the "core chosen aurora space larger").
- **Interactability is DISCHARGED BY W-FIELD-CORE** (`auroraCursorMapping` + `useRoutePointer`) — this wave
  CONSUMES it (the setting-sun preset is the T-38 verify surface), never re-authors a pointer path.

## §Work

- `src/components/custom/aurora/constants/presets.ts` — engage the chroma-floor scaffold; lift the pale
  presets into the 0.13–0.20 band; the second-accent-hue per palette (library identity vivid moves only, no
  ppmycota/demo hue into a library token).
- `demo/stories/substrates/aurora/presets.ts` — the SETTING_SUN / DUSK / VIVID_SETTING_SUN demo-local
  presets (candidates A/B/C); wire A as the default in the aurora story + as the W-FIELD-CORE / W-E10
  entrance verify surface.
- `demo/stories/substrates/aurora/AuroraStage.vue` + `demo/stories/substrates/VizStudio.vue` — the
  max-width/height canvas bump.

## §Acceptance

Gate: **`proof:aurora-vibrancy`** (NEW or EXTEND `proof:aurora-preset-roster`).
Born-RED at HEAD: the pale library presets sit below the 0.13 warm-chroma floor (mean OKLab chroma reads
below the vivid band). GREEN here.
- AV1 — the pale library presets clear the warm-chroma floor (mean OKLab C ≥ ~0.13 in the vivid band);
  each palette carries a second warm accent hue (not a monochrome ramp).
- AV2 — the setting-sun/dusk/vivid presets are DEMO-LOCAL (in `demo/`, NOT a library token — the
  presets-in-consumers fence; no pink hue enters `src/`).
- AV3 — the vibrancy lift never drops content-over-glass below AA/APCA (the bright-bucket headroom bound).
- AV4 — the studio canvas layout bump present (demo-only).
- Self-test bite: a planted setting-sun hue in a library token REDs; a planted pale preset below the chroma
  floor REDs.

## §π/DELTA

`tests-visual/aurora-vibrancy.spec.ts` (NEW; LOCAL real-GPU) + the setting-sun DELTA:
- Each candidate (A/B/C) composited BEHIND the real warm-glass plate at the vividness floor: the mean OKLab
  chroma/hue reads warm-sun-with-pink NOT pink-field (mean C ≥ ~0.045, no grey wash); a caption over the
  busiest interactive frame clears AA/APCA in BOTH modes (G9).
- The pink note reads on the sun-core (candidate A) without over-rotating to a pink field.
- The larger studio canvas capture (the "core aurora space larger" read).
- Chrome + real WebKit, both modes. Rides the W-PI-IN-CLOSE battery + the W-GESTALT-LEDGER-FILE substrate
  verdict.

## §Obligations

- **Device run (SAF-1):** the candidate palettes behind the warm-glass plate on real WebKit (the AA readback
  + the vividness floor). `dis:safari-metal-verify` seam. Shared with W-FIELD-CORE's aurora-interactability
  capture (the setting-sun preset is the same surface).
- No cross-repo ask (vibrancy is a library-identity default evolution — the library's OWN tokens evolve, per
  presets-in-consumers; setting-sun is demo-local; muster's `AuroraConfig` consume is the /aurora subpath,
  unchanged).

## §Dispositions

- **wants:aur-prism / aur-reactive / aur-satin** (CHRONIC — the unminted medium books) → RETIRE-verified
  (prism-medium-absent / uShimmer-absent / satin-absent asserts); this wave does NOT re-open them. Terminal.
- **The interactability claim** is discharged by W-FIELD-CORE, not re-authored here (the one-field-core fence).
