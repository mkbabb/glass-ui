# PASS 1 — TOKEN-SPINE-COHERENCE research (BG cross-wave coherence audit)

**Lens:** DESIGN-TOKEN SPINE COHERENCE — the unified glass blur/tint/specular/parallax/grain/key-direction spine across
WS3 (glass standardization), WS8 (glass-deep / C-SAFARI refraction), WS9 (paper-deep / grain), + the 3 landed live-fixes
(D-1 constellation parallax, D-2 paper-grain warmth, D-3 dock blur).
**Date:** 2026-06-30 · **Baseline HEAD:** `6c1f5386` (the prior coherence-Pass-1 commit; `src/` is byte-identical to the
re-spec FOLD `4c761b64` — only docs added since). **pkg:** 4.2.0 · **Branch:** tranche/BG
**Pass:** 1 of N (re-establish + DEEPEN the baseline). **Fence honored:** read-only under glass-ui; `verify-siblings-intact`
exit 0 before + after.

## Method

This pass RE-VERIFIES every prior-pass token-spine finding (F1–F6) against disk at the actual source line, and HUNTS for
NEW cross-wave token/mechanism conflicts the prior pass missed. Read: SEED-CONTEXT + AMENDED-WAVE-PLAN + the full
build-map WS3/WS5/WS8/WS9/WS12 specs + the actual token definitions on disk
(`src/styles/tokens/{glass,glass-fx,glass-deep,dark-arm,shadow}.css`, `src/styles/glass/{ladder,surfaces,rim,liquid-morph}.css`,
`src/styles/{glass-refract,paper}.css`, `dock/{shell,overflow}.css`, `glassShader.wgsl`,
`composables/motion/{bloomUpField,useBloomUp}.ts`, `composables/glass/useGlassBackdropLuminance.ts`,
`components/custom/constellation/{Constellation.vue,constants.ts}`) + the 3 live-fix commits
(`07c6e6ec`/`e40e5095`/`8947288a`) + the affected gates (`proof-dock-engine.mjs`, `gates.mjs`). Every claim below carries a
file:line verified THIS pass.

## Landed-state baseline (verified on disk at `6c1f5386`, `src/`≡`4c761b64`)

- Three WS3 waves LANDED pre-pause (commits predate the fold): `BG.W-CARTOON-INK-GAMUT` (3857b33b) · `BG.W-GLASS-BLUR-PEER`
  (cd9ce46c) · `BG.W-GLASS-IDIOM-FACTOR` (6ec81deb).
- After BLUR-PEER: `--glass-blur-resting-radius: 8px` (glass.css:88); `--glass-blur-btn` is an alias of
  `--glass-blur-resting` (glass.css:188); the dock reads `--dock-surface-blur: var(--glass-blur-resting)` (shell.css:29,
  consumed :159). `.glass-deep` re-points `--glass-blur-btn`→`--glass-blur-deep` for the hero.
- G4 `BG.W-CLOSEFIX-9SITE` is UNMERGED (a spike, NOT an ancestor of HEAD) — the `--glass-blur-dock` chain is STILL LIVE
  (glass.css:166, dark-arm.css:286, bridges.css:334), exactly as the plan expects (G4 re-implements at resume).
- Carve targets confirmed >500: `glass/ladder.css`=527L, `dock/shell.css`=510L.
- `chromatic_aberration` is the ONLY refraction-dispersion uniform in `src/` (glassShader.wgsl:13, magnitude `*0.003` at
  :132). `uChromatic`/`uDispersion` appear NOWHERE in `src/`.

---

## FINDINGS — cross-wave token/mechanism conflicts

### F1 [HIGH] — CONFIRMED + sharpened. The C-SAFARI "ship operator" `uChromatic` is a CONVERGE-PROTOTYPE name; the genuinely-shipped Tier-2 WGSL uses `chromatic_aberration` at a DIFFERENT magnitude, and the dual-stack is left UNRECONCILED + UNFENCED.

**Waves:** WS8 `BG.W-GLASS-REFRACT-WEBGL` / `BG.W-GLASS-BACKDROP-SAMPLE` / WS7 `BG.W-SAFARI-PARITY-GATE` (G1).

The plan (§2.G1, build-map:624-626) re-points the whole C-SAFARI fence/gate/token/π onto **`uChromatic`** and asserts
the ship splits R/B by `ca = inward·rim·uChromatic·0.0045`. **On disk** `uChromatic` exists ONLY in
`docs/tranches/BG/audit/glass-field-shaders.json` (a converge-phase GLSL PROTOTYPE) + planning prose. The genuinely
shipped refraction shader — the Tier-2 WGSL the build-map (line 623) lists WS8 §2 editing — is
`src/composables/glass/webgpu/glassShader.wgsl`, and it uses:
- `chromatic_aberration: f32` (glassShader.wgsl:13) and `aberration_dir = … * u.chromatic_aberration * 0.003`
  (:130-132) — vs the planned `uChromatic·0.0045` (~1.5× the magnitude).
- `refraction_strength` (:12) `… * u.refraction_strength * 0.02` (:106) — vs the planned `uRefractionStrength·0.045`.

**The conflict:** the gate's F3 clause ("operator-is-`uChromatic` source-scan", build-map:635) scans only the NEW
`glass-refract.glsl.ts` (Tier-1 GLSL, ported from the JSON). NEITHER the build-map NOR the resolve fences the existing
Tier-2 `glassShader.wgsl`, nor reconciles its `chromatic_aberration`→`uChromatic` rename. So the Tier-1 WebGL2 floor and
the Tier-2 WGSL would split R/B at DIFFERENT constants (0.0045 vs 0.003) — a **dual-stack parity break** against the §1.5
"WebGL2+WGSL dual-stack" identity fence; `proof:gpu-substrate-single`'s ΔE bar would red at build, OR the WGSL keeps the
wrong constant un-fenced because F3 never reads it. **Recurrence:** the EXACT wrong-uniform class the RESPEC claims it
FIXED — the correction swapped one non-ship name (`uDispersion`) for another that exists only in a converge prototype
(`uChromatic`); the ACTUAL shipped uniform (`chromatic_aberration`) was never examined. Both planned names are equally
absent from `src/`.

*Mitigating:* the GLSL Tier-1 is NEW, so building it from the JSON is internally fine; the gap is purely (a) the
unreconciled Tier-2 WGSL operator/magnitude and (b) the inaccurate "ship/source-of-truth" provenance label.

### F2 [MEDIUM] — CONFIRMED. `--glass-edge-dispersion` is a CSS `box-shadow` list, not a scalar; "`--glass-edge-dispersion`→`uChromatic` token" is a token-TYPE collision.

**Waves:** WS8 `BG.W-GLASS-REFRACT-WEBGL` (G1).

Build-map:647-648 says the new shader carries "the `--glass-edge-dispersion`→`uChromatic` token"; resolve §1b: the live
retune token `--glass-edge-dispersion` "maps DIRECTLY to `uChromatic` (no derived fraction)". **On disk**
`--glass-edge-dispersion` (glass-fx.css:305) is a **two-inset-ring `box-shadow` value**, consumed AS a `box-shadow` at
`surfaces.css:417` (`.glass-chromatic { box-shadow: var(--glass-edge-dispersion), var(--glass-material-rim) }`). A
box-shadow list cannot drive a shader float uniform (target 0.20–0.30). WS8 must EITHER mint a new scalar token (the
build-map's "→`uChromatic` token" label is then a mis-spec) OR repurpose `--glass-edge-dispersion` as a scalar (breaking
the `.glass-chromatic` box-shadow consumer at surfaces.css:417). The plan flags NEITHER — a latent token-semantics
collision in the single most-watched (★★★) wave.

### F3 [MEDIUM] — CONFIRMED. D-2 paper-grain band-aid ↔ WS9 GRAIN-REAL: the demo-local warm substrate is not reconciled when WS9 warms the LIBRARY grain → double-warm.

**Waves:** live-fix `BG.W-PAPER-GRAIN-WARM-SUBSTRATE` (D-2, e40e5095) ↔ WS9 `BG.W-PAPER-GRAIN-REAL`.

D-2 added a DEMO-LOCAL warm substrate BEHIND the gray library grain, explicitly "library grain utility BYTE-UNTOUCHED."
Verified on disk: `--paper-grain-tooth` (paper.css:44) is STILL the gray `feTurbulence` (`feColorMatrix saturate=0` +
symmetric `feFuncR/G/B slope=1.8 intercept=-0.4` = pure gray; paper.css:16-18 comment confirms "grey-RGB speckle").
WS9 `BG.W-PAPER-GRAIN-REAL` (build-map:697) REPLACES that gray speckle with a warm `feDiffuseLighting` LIT tooth in the
LIBRARY (`paper.css` `--paper-grain-tooth`, warm-hue floor ≥0.020). When WS9 lands, the D-2-patched demo panels carry BOTH
the D-2 warm substrate AND the now-warm library grain → over-warm / double-tint on exactly the surfaces D-2 patched.
NEITHER the WS9 spec NOR EXECUTION-PROGRESS notes retiring/retuning the D-2 band-aid. The root-fix and the band-aid coexist
with no hand-off owner.

### F4 [MEDIUM, window RE-PRICED] — CONFIRMED + tag-resolved. D-3 dock-collapse directional fix ↔ WS2 DOCK-MORPH-UNIFY: the unification rewrites the orchestrator the D-3 fix lives in; WS2's per-wave gate is blind to the regression — caught only at the CUT (not "never," but late).

**Waves:** live-fix `BG.W-DOCK-COLLAPSE-DIR` (D-3, 8947288a) ↔ WS2 `BG.W-DOCK-MORPH-UNIFY` (row 4.1).

D-3: the `--dock-live` SIZE scalar reads the DIRECTIONAL `--dock-expand-t` (not raw `--dock-morph-t`) — killing the
collapse-balloon reversal. The protector is `proof:dock-engine` (its E1 asserts `--dock-expand-t: var(--dock-morph-t)` AND
`var(--dock-expand-t` is read in morph.css — proof-dock-engine.mjs:206-210). WS2 `BG.W-DOCK-MORPH-UNIFY` (build-map:220)
consolidates 5 `SpringProgress` sites → ONE `useDockSpring`, "fold `useLayerTransition` → orchestrator (measure-free)" —
editing the EXACT `dockMorphContext.ts`/`dockMorphMeasure.ts` the D-3 fix lives in. **NEW this pass:** `proof:dock-engine`
is `["local","ci","release"]` (gates.mjs:1761) → it DOES run in the cut's `--run full` siblings-absent battery, so a D-3
regression IS netted at the cut (the prior-pass "cut-only vs never" open question resolves to **cut-netted, not never**).
BUT WS2's per-wave gate (EXEC-PROGRESS row 4.1) is `proof:dock-orchestrator-single` (the 1-SpringProgress structural
gate), NOT `proof:dock-engine`. So a directional-read regression greens WS2 and surfaces ~6 waves later at the cut —
forcing a deep WS2→cut rework. **Fix (cheap):** add `proof:dock-engine` to WS2 `BG.W-DOCK-MORPH-UNIFY`'s per-wave gate
set so E1 fires at WS2 build, not at the cut.

### F5 [LOW-MEDIUM] — CONFIRMED. WS3 GLASS-DYNAMICS "strengthens W-LENSING" then WS8 SUFFUSE/SOTA-LADDER retires + DELETES the lensing path — wasted-work / ambiguous-target risk.

**Waves:** WS3 `BG.W-GLASS-DYNAMICS` (Phase 3) ↔ WS8 §1 `BG.W-GLASS-SUFFUSE-UNIVERSAL` + §4 `BG.W-GLASS-SOTA-LADDER`.

WS3 GLASS-DYNAMICS (build-map:205, earlier in the DAG): "strengthen W-LENSING squircle refraction + NEUTRAL specular
hairline." WS8 §1 (build-map:617) RETIRES `proof:lensing` (registered live at gates.mjs:1297) + `proof:glass-material-sota`
(2217) + `proof:glass-prune` (1683), and folds `useSpecularPointer`; WS8 §4 (build-map:678-681) DELETES `glass-refract.css`
(exists, 10248 B), `.glass-lens` (referenced in surfaces.css / property-regs.css / Button.vue), and `useSpecularPointer.ts`
(exists). So WS3 invests in the CSS-SVG lensing that WS8 then supersedes (GL refraction) and retires. The plan does NOT
disambiguate whether GLASS-DYNAMICS edits the to-be-deleted `glass-refract.css`/`.glass-lens` (wasted, clobbered by WS8) or
only the surviving `useSpecularTracking` specular path. If the former, WS8 clobbers WS3's strengthening — and WS8 §1 already
mints `proof:glass-specular-angle` as the lensing successor, so GLASS-DYNAMICS's "strengthen W-LENSING" has no surviving gate.

### F6 [LOW] — CONFIRMED. Build-map names a wrong WGSL path `src/glassShader.wgsl` (actual: `src/composables/glass/webgpu/glassShader.wgsl`).

Build-map:649 (and :623) lists `src/glassShader.wgsl` as a WS8 §2 file; that path is ABSENT — the real file is under
`src/composables/glass/webgpu/`. The seed's named wrong-anchor/path class; would send a build agent groping for a
non-existent file.

---

## NEW FINDINGS (this pass — not in the prior token-spine baseline)

### F7 [HIGH] — The `--glass-key-direction` SPINE has a DUAL source-of-truth + a DESIGN-DECISION CONTRADICTION + a DAG ordering inversion: WS9 mints a single AZIMUTH that the EXISTING per-axis key family (BD.W-GLASS-KEY-EDGE) already encodes — and which WS8 (landing BEFORE WS9) is claimed to read.

**Waves:** WS9 §0 GU-1 (`--glass-key-direction` mint) ↔ WS8 §1 `BG.W-GLASS-SUFFUSE-UNIVERSAL` bevel ↔ WS12 §5
`BG.W-GLASS-PAPER-CONGRUENCE` (the A6 `--glass-key-*` spine) ↔ the EXISTING `BD.W-GLASS-KEY-EDGE` family.

This is the keystone NEW finding — three coupled defects on the `--glass-key-*` spine:

1. **Dual source-of-truth (class K — substitution/dead-knob).** The library ALREADY encodes the light-key direction as a
   FOUR-component per-axis SIGN family: `--glass-key-lit-x: -1px` / `--glass-key-lit-y: 1px` / `--glass-key-shade-x: 1px` /
   `--glass-key-shade-y: -1px` (glass-fx.css:114-117, BD.W-GLASS-KEY-EDGE). The rim catch-light reads those component
   tokens DIRECTLY (rim.css:81-93 reads `--glass-key-lit-x/-lit-y`; dark-arm.css:412-416 reads the lit+shade set). WS9 GU-1
   (build-map:695) mints a NEW SINGLE `--glass-key-direction` (an AZIMUTH) and "derive[s] 3 under-shadow tier leans" +
   re-points `dock/overflow.css:143`. The GU-1 spec does NOT re-derive the existing `--glass-key-lit/shade-x/y` from the
   azimuth. **Consequence:** re-pointing `--glass-key-direction` moves the grain azimuth + the under-shadow leans but does
   NOT move the rim catch-light (which still reads the 4 component tokens) → the key desyncs across the spine — the exact
   dead-knob class the friction history flags (COHERENCE.md class K explicitly names `--glass-key-direction`). A coherent
   spine needs ONE key source: GU-1 must DERIVE `--glass-key-lit/shade-x/y` from `--glass-key-direction`, OR the existing
   component family stays canonical and GU-1 derives the azimuth FROM it.

2. **Design-decision contradiction.** glass-fx.css:106-109 records the BD design decision VERBATIM: the key is "expressed
   NOT as a `-58deg` angle with sign-inverted cos()/sin() trig (the glass-material sign trap — banned here), but as two
   PLAIN per-axis sign tokens the rim stops read directly." WS9 GU-1 re-introduces precisely an ANGLE/azimuth representation
   (`--glass-key-direction`) — the representation BD deliberately rejected and the comment calls a "banned" trap. The plan
   does not acknowledge or reconcile this; it would re-open the sign-trap the existing comment closes.

3. **DAG ordering inversion.** The DAG is `WS8 → WS9`. The WS9 header (build-map:692) claims GU-1's `--glass-key-direction`
   "lands FIRST … **WS8 bevel** + WS12 A6 spine both read it." But WS8 §1 SUFFUSE's own spec (build-map:613-620) lists
   neither `--glass-key-direction` in its *Files* (it mints `--glass-bevel-*` in glass-fx.css) NOR any GU-1/WS9 precond (its
   *Precond* is "WS3-M3 contain + WS3 saturate revert"). So EITHER (a) WS8 bevel genuinely reads the azimuth → it reads an
   UNDEFINED custom property because WS9 mints it LATER (a real cross-WS forward-dependency the DAG inverts + a missing
   precond), OR (b) the WS9-header "WS8 bevel reads it" claim is unbacked prose. Either way the cross-wave spine doc
   (WS9 says WS8 reads it; WS12 A6 "reads the WS8(bevel)+WS9(tooth) spine") is incoherent with WS8's own spec. WS12 §5's
   A6 reconciliation (build-map:805) is the named owner of the `--glass-key-*` spine, but it runs LAST and inherits all
   three problems above — it would be reconciling the new azimuth against the existing component family with no producer
   having actually wired the bevel read.

**Recurrence:** class K (substitution/dead-knob, "3rd–4th recurrence, NO single catching gate" per COHERENCE.md) + class U
(wrong-anchor: WS8 "reads" a token minted in a later wave). The prior pass noted class-K "rides `--glass-key-direction`"
abstractly; this pass pins the CONCRETE conflict with the existing 4-token family + the BD "banned-angle" decision +
the inverted DAG edge.

### F8 [MEDIUM] — WS3 GLASS-TINT-UNIFY's `--glass-ambient-*`→`--glass-tint-bias-*` rename names 2 of 5 carrier files; the named line anchors are wrong; the `@property` registration + the writer + the consumer are unnamed → silent-no-op + de-registration risk.

**Waves:** WS3 `BG.W-GLASS-TINT-UNIFY` (G-Phase 2; ALSO WS1-coordinated at `useGlassBackdropLuminance.ts`).

The rename source `--glass-ambient-hue`/`--glass-ambient-strength` is carried by **FIVE** files (verified by grep this
pass):
- `glass.css:391/401` — the **`@property --glass-ambient-hue`/`--glass-ambient-strength` REGISTRATION** (the typed
  `<color>`/`<percentage>` + initial-value).
- `glass/liquid-morph.css:34-35,64-69` — the **CONSUMER** (`--glass-tint-source: var(--glass-ambient-hue, transparent)`).
- `bloomUpField.ts:64,71,76,85` — the **WRITER** (`getPropertyValue`/`setProperty` the `--glass-ambient-hue`/-strength).
- `composables/glass/useGlassBackdropLuminance.ts:440` — a **SECOND WRITER** (`setProperty("--glass-ambient-hue", …)`).
- `useBloomUp.ts` — the orchestrator.

The build-map TINT-UNIFY *Files* (build-map:180-182) lists only: `ladder.css, glass-fx.css, useBloomUp.ts:340/343,
useGlassBackdropLuminance.ts:448`. So it **MISSES three of the five carriers** — `glass.css` (the `@property`
registration), `liquid-morph.css` (the consumer), and `bloomUpField.ts` (the primary writer) — and the named anchor
`useBloomUp.ts:340/343` points at the PRM-snap branch (verified: :340-345 is the `if (respectPRM && prefersReducedMotion())`
path), NOT a `--glass-ambient` write (the real writes are in `bloomUpField.ts:71/76`, a file the spec never names).
**Consequences if executed against the *Files* list literally:** (a) the writer keeps writing `--glass-ambient-hue` while
the renamed consumer reads `--glass-tint-bias-hue` (or vice-versa) → the bloom warm-tint silently stops painting (class C —
clean-break-misses-a-consumer); (b) if the customs are renamed but the `@property` registration at glass.css:391/401 is not,
the renamed custom is UNREGISTERED → it loses typed interpolation + initial-value → a bare `var()` SNAPS instead of ramping
(class K — registered-property de-registration, the same dead-knob shape). **Cross-tangle:** `liquid-morph.css` (the
consumer) is ALSO being WHOLE-rehomed to `demo/` by `BG.W-DEMO-STYLE-REHOME` — so the rename + the rehome both touch the
same consumer and must be coordinated. The prior pass marked this rename "coherent/CLEAN" (it verified the TARGET composes
onto `--glass-plate-tinted`); it did not audit the rename SOURCE completeness, which is where the no-op risk lives.

### F9 [MEDIUM-LOW] — D-1 constellation parallax live-fix ↔ WS5 VIZ-DEMIGRATE: the de-migration rewrites `Constellation.vue` (one of the two files D-1 touched) with no preservation note, and D-1 has ZERO standing gate protector (worse than D-3's E4).

**Waves:** live-fix `BG.W-D1-CONSTELLATION` (07c6e6ec) ↔ WS5 §3 `BG.W-VIZ-DEMIGRATE`.

D-1 set `DEFAULT_PARALLAX 0.08→0` (constants.ts:146) AND wires `parallax: DEFAULT_PARALLAX` in `Constellation.vue:50`
(touched files: `Constellation.vue` + `constants.ts`). WS5 §3 VIZ-DEMIGRATE (build-map:272) "DE-migrate[s] constellation
off WebGPU onto `useCanvas2D` … ≥13 files + ≥2500 LOC deleted" — a substrate REWRITE. `Constellation.vue` currently imports
`constellationWGPUSetup` (useConstellation.ts:53), so the de-migration rewrites the SFC's render wiring — the exact file
D-1's parallax-default-off binding lives in. **NEW vs prior pass:** the prior C9 covered the D-2 and D-3 live-fix collisions
but NOT D-1↔WS5. And unlike D-3 (protected by `proof:dock-engine` E1, `release`-tagged), D-1 has **NO standing gate**: a grep
of `scripts/` for `DEFAULT_PARALLAX`/parallax finds only `proof-dot-matrix`/`proof-aurora-interaction-prm`/
`proof-composable-return-types` — none asserts the constellation parallax default. So a VIZ-DEMIGRATE rewrite that
re-introduces pointer-parallax (or resets the default) is INVISIBLE to every device-free gate and surfaces only at the
WS12 480-capture / W-REFLECT3 — the headless-green/visually-broken shape, on a defect the user already reported once.
*Mitigating:* the default lives in `constants.ts:146` (a value, not substrate logic) which VIZ-DEMIGRATE has no reason to
edit; the risk is concentrated in the `Constellation.vue:50` re-wire. **Fix:** a one-line preservation note in
VIZ-DEMIGRATE + a `proof:viz-*` source-assert `DEFAULT_PARALLAX===0` (the cheap protector D-1 lacks).

---

## CLEAN results (no conflict — useful negatives for the baseline)

- **The seed's headline worry is CLEAN.** WS8's refraction does NOT read the `--glass-blur-*` primitives G4 carves: it is a
  GL shader sampling the shell-field FBO (`uField`/`sampleBG`), reading no CSS backdrop-filter token. WS8 §1's bevel reads
  `--glass-saturate-*`/`--glass-blur-deep` — both UNTOUCHED by the G4 retirement (which only retires the dead
  `--glass-blur-dock` chain; 0 live readers of the composite — the only `--glass-blur-dock` ref outside its own
  definition is a code COMMENT at shell.css:26). No later wave reaches for a dead pre-carve blur name. **CONFIRMED.**
- **The `--glass-plate-tinted` factor is coherent.** `--glass-plate-tinted` declared ONCE (ladder.css, landed
  GLASS-IDIOM-FACTOR) and read at multiple sites; TINT-UNIFY composes onto it cleanly (the TARGET side — the rename SOURCE
  gap is F8). The WS1+WS3 `useGlassBackdropLuminance.ts` double-edit is correctly flagged in the build-map as needing ONE
  coordinated diff (build-map:181-183) — a noted coordination requirement, not a gap.
- **G4 carve assertions accurate** against disk (ladder.css 527, dock/shell.css 510; both >500).
- **`--glass-blur-dock` chain 0 live readers** confirmed (only the shell.css:26 comment + its own glass.css/dark-arm.css/
  bridges.css definitions) — G4's "0 orphan readers" holds glass-ui-INTERNALLY (the bbnf sibling override is a separate
  consumer-constellation concern, COHERENCE.md C10, out of this lens).
- **glass-deep saturate doc-drift (LOW, noted not flagged).** Disk: `--glass-saturate-deep: 1.8` + `-ceiling: 1.8`
  (glass-deep.css:58-64, lifted 1.5→1.8 by BD.W-GLASS-ABROGATE-GRAY). The AMENDED-WAVE-PLAN / CLAUDE.md still describe the
  deep saturate as "1.5 (the LOW end)." A doc-vs-disk drift, not a cross-wave token conflict — WS3's "saturate(~1.2) revert"
  is on `--glass-saturate-resting` (the calm tiers), not the separate `--glass-saturate-deep` family, so the two do not
  collide. Recorded for the claim-reconcile wave (COHERENCE.md C13 class).

## Recurring friction classes touched by these findings

- **Wrong-uniform / wrong-anchor (class U)** — F1 (ship operator is a converge prototype; real uniform `chromatic_aberration`
  never examined), F2 (token is the wrong CSS type), F6 (wrong file path), F7.3 (WS8 "reads" a WS9-minted token).
- **Substitution-vs-inheritance / dead-knob (class K)** — F7.1 (azimuth vs the existing 4-token key family), F8
  (`@property` de-registration on a partial rename). The "3rd–4th recurrence, NO single catching gate" verdict holds.
- **Clean-break rename misses a consumer (class C)** — F8 (3 of 5 carrier files unnamed; the bloom writer + consumer +
  registration).
- **Band-aid not reconciled with the root-fix** — F3 (D-2 grain double-warm under WS9).
- **Narrow-gate-misses-regression / headless-green (class A)** — F4 (WS2's structural gate blind to the D-3 directional read;
  cut-netted but late), F9 (D-1 parallax has NO gate at all — caught only at the 480-capture).
- **Strengthen-then-delete wasted work** — F5 (WS3 strengthens lensing; WS8 retires + deletes it).

## Severity-ranked summary (for synthesis)

| # | Sev | One-line | Fix shape |
|---|---|---|---|
| F7 | HIGH | `--glass-key-direction` dual-source + banned-angle + WS8-reads-WS9 inversion | ONE key source (derive component tokens from azimuth or vice-versa); reconcile WS8 precond + DAG; honor the BD "no-angle" decision |
| F1 | HIGH | ship operator `uChromatic`=converge-proto; Tier-2 WGSL uses `chromatic_aberration` @ diff magnitude, unfenced | F3 must also scan/fence `glassShader.wgsl`; reconcile 0.0045 vs 0.003 |
| F8 | MED | TINT-UNIFY rename names 2/5 carriers; wrong line anchor; `@property` reg + writer + consumer unnamed | complete the *Files* list (glass.css @property, bloomUpField.ts, liquid-morph.css); fix the 340/343 anchor |
| F2 | MED | `--glass-edge-dispersion` is a box-shadow, not a uniform scalar | mint a NEW scalar token OR explicitly break `.glass-chromatic` |
| F3 | MED | D-2 demo warm-substrate double-warms under WS9 library grain | assign a WS9 retire/retune owner for the D-2 band-aid |
| F4 | MED | D-3 directional read regressible by WS2; cut-netted (release) but WS2 gate blind | add `proof:dock-engine` to WS2's per-wave gate set |
| F5 | LOW-MED | WS3 strengthens lensing; WS8 deletes it | disambiguate GLASS-DYNAMICS edit target (surviving specular path only) |
| F9 | MED-LOW | D-1 parallax fix in `Constellation.vue` rewritten by WS5; NO gate protector | preservation note + a `DEFAULT_PARALLAX===0` source-assert |
| F6 | LOW | wrong WGSL path `src/glassShader.wgsl` | fix to `src/composables/glass/webgpu/glassShader.wgsl` |

## Open items for PASS 2 (deepen / confirm)

1. **F7:** confirm the INTENDED relationship between `--glass-key-direction` and the existing `--glass-key-lit/shade-x/y`
   family (read the WS12 A6 `WS12-CENSUS.md` "glass-key spine read" arm + the GU-1-glass-key-fill.md spec when authored) —
   is GU-1 meant to SUPERSEDE the component family or feed it? And does WS8 §1 bevel actually reference `--glass-key-*`?
2. **F1:** read the M6 WGSL-shape gate spec — does ANY gate fence the Tier-2 `glassShader.wgsl` operator, or is F1 a true
   un-fenced dual-stack gap? Confirm whether the WGSL is intended to be re-derived from the JSON (renaming
   `chromatic_aberration`→`uChromatic`) or left as-is.
3. **F8:** confirm whether GLASS-TINT-UNIFY's executor uses a tree-wide grep (catching all 5 carriers) or the build-map
   *Files* list literally; check whether DEMO-STYLE-REHOME's liquid-morph.css move and the rename are sequenced/coordinated.
4. **F9:** read the exact VIZ-DEMIGRATE constellation file delta (the ≥13 files) to confirm `Constellation.vue:50`
   `parallax: DEFAULT_PARALLAX` survives the Canvas2D re-wire; check whether any `proof:viz-*` source-assert covers it.
5. **F2:** trace the C17 calibration capture script (`glass-refract-fence-capture.mjs`) to see if a NEW scalar token is
   implicitly minted (resolving F2) or the box-shadow token is genuinely repurposed.
