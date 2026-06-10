# AY.W-BLOB-CONFIG — the blob page: Configurator adoption + the two broken axes + the dead hero color-feed + the pause→resume render-wreck · live DELTA

This wave closes the cluster RA-blob found AROUND the alive creature-core: the page's
config UI was a HAND-ROLLED `<input type=range>` strip (not the library Configurator — the
inv-16 dog-food gap), the `pointerAttraction` sign was DROPPED (a "-1 shy-away" lunged
TOWARD the cursor), the seed/harmony palette never reached the LIVE hero (a byte-identical
coral body), the `stretch` axis was a measurable no-op, and the page's own WCAG-2.2.2 pause
control could DESTROY the canvas on resume (the strobe-to-charcoal-slab wreck). Four config
fixes + the Configurator adoption land here; the alive interaction core (hover-lean,
drag-follow, mood-latch) is untouched.

**Captured 2026-06-09** against the AY line (`tranche/AY`, da930d0 ancestor) on the live
demo (`npm run dev`, `/substrates/blob`) via Playwright on the real Metal GPU backend
(`--use-gl=angle --use-angle=metal`, the π-lane device). The numbers below are the
paired-π readbacks the new `blob-config-delta.spec.ts` emits (and the `proof:blob-config`
source gate locks the STRUCTURE each fix needs).

---

## VERDICT — PASS (the four defects fixed, the demo on the library Configurator; all gates ratify)

The blob page is now a CREDIBLE SOTA claim (RA-blob §D): a robust, **Configurator-driven**
studio whose every advertised axis bites and whose pause control is safe. The hand-rolled
strip is GONE — the showcase USES the library `Configurator`/`ConfiguratorLayer`/
`ConfiguratorRow` + `useConfiguratorState`, mirroring Aurora's chrome (the inv-16 dog-food).

### The paired-π readbacks (the falsifiable numbers, not prose)

| # | fix | BEFORE (HEAD) | AFTER (this wave) |
|---|---|---|---|
| D1 | seed → hero body color | coral byte-identical after a blue seed (RA-blob: (239,118,123)→(239,117,123), ΔB≈+5) | **blue: (251,213,159)→(72,172,246), ΔB=+87, ΔR=−179** |
| D2 | `pointerAttraction` sign | INVERTED — a "-1 shy-away" lunged +0.089 TOWARD, STRONGER than the +0.042 lean | **honored — lean-in (+0.8) shift 0.105 > shy-away (-0.8) shift 0.078** |
| D3 | `stretch` axis | a measurable no-op (RA-blob ~6%, within noise; live aspect Δ = 0%) | **documented swamped + de-slidered** (the honest-removal branch) |
| D4 | paused-prop resume | the negative-dt resume could explode (motion 65.3 / mask 0.99 / charcoal slab) | **CLEAN — covResume 0.122 (resting band), no flood, bead intact** |
| D5 | config UI | a hand-rolled `<input type=range>` strip + raw `<select>`/mood-pills | **library Configurator** (0 raw range inputs; preset row + 2 layers + rows) |

### D1 — the dead hero color-feed (the headline break)

The renderer reads a `resolvedStops` Ref every frame, but the Ref was resolved ONCE at
mount and only re-resolved on a `color`-prop / dark-mode flip — there was NO watcher on
`paletteStops`, AND `cfg` was a mount-time SNAPSHOT that went stale when the demo's
`heroConfig` computed re-emitted a fresh config object. So a seed/harmony change updated the
CONFIG but never reached the painted body. The fix adds a `liveConfig()` getter (re-reads
the reactive `config` prop) + a watcher on `liveConfig().color.paletteStops` that
re-resolves into the Ref + a renderer wake on the stops change. A blue seed
(`oklch(0.6 0.2 250)`) now drives the body from cream (251,213,159) to blue (72,172,246) —
ΔB=+87, ΔR=−179. Capture: `W-BLOB-CONFIG-d1-blue-seed-desktop-light.png` (a vivid blue bead
in the studio stage).

### D2 — the dropped `pointerAttraction` sign

The shader's sample-shift sign was `uv -= normalize(pointerDir + 1e-6) * influence`. A live
attraction sweep over a HELD pointer measured the body shifting MORE toward the cursor as
attraction went MORE NEGATIVE (a=-1 → +0.081, a=0 → +0.063, a=+1 → +0.042) — exactly
inverted: a "shy-away" -1 lunged AT the cursor. TWO fixes: (1) the shader sign flips to
`uv += …` (sample ALONG `pointerDir` to MOVE the body toward the pointer); (2) the
decaying-radius pseudopod (the trail), which reached toward the cursor on MOVEMENT ALONE
sign-independent, is gated by `reachFactor = Math.max(0, min(1, netAttraction))` so a
shy-away RETRACTS its reach. With the sign corrected the body lean now ADDS to the
pseudopod reach instead of cancelling it, so `pointerStrength` drops 0.18 → 0.10 to keep the
default lean calm (the prior 0.042 "calm lean" was an artifact of the inverted body lean
cancelling the trail; the corrected calm lean is ≈0.075, and `blob-render.spec.ts`'s
`CENTROID_SHIFT_MAX` re-points 0.07 → 0.09 to the corrected-sign live value). AFTER: lean-in
(+0.8) shift 0.105 > shy-away (-0.8) shift 0.078 — the sign is honored. Capture:
`W-BLOB-CONFIG-d2-shy-away-desktop-light.png`.

### D3 — the swamped `stretch` axis (the honest-removal decision)

The squash-stretch rides the smoothed spring velocity (`useBlobPointer`'s critically-damped
`response: 0.18` follow), heavily damped and down-scaled into body space — so the
tanh-saturated elongation reads at the noise floor (live: 0% body-aspect change between
`stretch=0` and `stretch=1.5`). Per the §2 D3 recorded decision, the **honest-removal**
branch: the `stretch` jsdoc names it a SWAMPED fine-detail axis (kept — the
volume-preserving map is correct and lands a whisper on the fastest flicks — but DEMOTED),
and the demo no longer surfaces it as a top-level slider (the flick blurb is honest-down to
match). The flick-overstatement (W-BLOB3 §RESIDUE R1) is the SAME axis and is bound by this
decision.

### D4 — the SEVERE pause→resume render-wreck (the WCAG-2.2.2 control)

`createCanvasLifecycle.resume()` rebases the substrate clock (`startTime = now − 1000`), so
the first post-resume `timeSec` snaps back to ~1.0 while the renderer's `lastTimeSec` still
holds the pre-pause elapsed (tens of seconds). The raw per-frame dt is then strongly
NEGATIVE (`-1178`, `-2017`ms measured live on a manual resume), and a negative dt run
BACKWARD through the symplectic click-pulse integrator (`pulseVel += accel·dt; pulse +=
pulseVel·dt`) flips its sign and diverges — the strobe-to-charcoal-slab wreck. The prior
`Math.min(rawDtMs, 50)` clamped only the UPPER bound (the offscreen/PRM seconds-long
re-arm), letting the negative half through. The fix clamps the LOWER bound too —
`Math.max(0, Math.min(rawDtMs, 50))` — so a resume rebase is a no-op step (dt 0 this frame,
normal next frame) and the simulation CANNOT run backward. The clean off-screen-park path
hits the SAME rebase, so this also hardens it; the shared `createCanvasLifecycle` substrate
is UNCHANGED (the fix is the blob-specific first-frame guard — the spec's E4 escape — so
the aurora resume is NON-regressed). AFTER: covResume 0.122 (resting band, the bead intact),
no flood (the wreck was ≈0.99), holds 5s later (0.114). Capture:
`W-BLOB-CONFIG-d4-resume-clean-desktop-light.png` (an intact cream bead after pause→resume,
NOT the charcoal slab).

### D5 — the library Configurator adoption (the inv-16 dog-food)

The hand-rolled strip (3 raw `<input type=range>` + a seed input + a harmony `<select>` + 5
mood pills) is REPLACED by the library `Configurator` + `ConfiguratorLayer` +
`ConfiguratorRow` + `useConfiguratorState` (`cloneMode: "per-preset"`, mirroring Aurora's
chrome). The blob STAGE is the `#stage` slot (one live `<GooBlob>`); the axes are
`ConfiguratorRow`s in two layers — "Interaction" (attraction + clickImpulse `LabeledSlider`s)
and "Mood + palette" (mood + harmony `LabeledSelect`s, the seed input, a live `WatercolorDot`
stops preview). Three presets — Calm (cream · curious), Excited (warm · leans in +0.8), Shy
(cool · shies away −0.8) — drive `useConfiguratorState`. Zero raw `<input type=range>`
remain (live-probed: 0 range inputs / 2 `role="slider"`). The blob showcase now dog-foods
the component the library ships.

---

## The captured own-surface PNGs

The Configurator studio (`/substrates/blob`), ≥2 viewports × {light, dark}, **REAL 390-width
mobile**:

- `W-BLOB-CONFIG-studio-desktop-light.png` — 1280, light: the WatercolorDot static register
  grid + the studio intro (the page top).
- `W-BLOB-CONFIG-studio-desktop-dark.png` — 1280, dark.
- `W-BLOB-CONFIG-studio-mobile-light.png` — 390, light.
- `W-BLOB-CONFIG-studio-mobile-dark.png` — 390, dark.

The four-fix proof captures:

- `W-BLOB-CONFIG-d1-blue-seed-desktop-light.png` — the Configurator studio with a BLUE bead
  in the stage after a blue seed (the D1 dead-feed fix; the preset tabs + the two
  ConfiguratorLayers visible).
- `W-BLOB-CONFIG-d2-shy-away-desktop-light.png` — the Shy preset (−0.8) at a held rightward
  hover (the D2 sign fix — the creature shies, it does not lunge).
- `W-BLOB-CONFIG-d4-resume-clean-desktop-light.png` — an intact cream bead after a
  pause→resume (the D4 SEVERE fix — no charcoal slab).

---

## Gate ledger (all GREEN on the real device + source)

| Gate | Arms | Result |
|---|---|---|
| `proof:blob-config` (the wave gate, source arm) | D1 watcher + D2 sign/reach + D3 documented/de-sliderd + D4 lower-clamp + D5 Configurator/no-raw-range + self-test | **PASS** |
| `blob-config-delta.spec.ts` (π — the four live readbacks + captures) | D1 ΔB>30 · D2 shy<lean · D4 resume-clean · 4 captures | **PASS 7/7** |
| `proof:blob-render` (π) | containment + dome-variance + silhouette + field + the re-pointed lean ceiling | **PASS 3/3** |
| `proof:blob-mood-live` (π) | manual-mood DELTA + PERSISTENCE (preset-tab driven) | **PASS** |
| `proof:blob-pause-seam` / `-integration` (π) | WCAG-2.2.2 pause-park + context-bound + README | **PASS 3/3** |
| `proof:blob-warm-default` (π) | cream body-L ≥ 0.62 light + dark | **PASS 2/2** |
| `proof:blob-tempo-suppression` (source) | the dt-clamp regex still matches the `Math.max(0, Math.min(rawDtMs, 50))` form | **PASS** |
| `proof:blob-config-atoms` / `-mood-resolved` / `-interaction-prm` / `-smin-normalized` / `-space-gamma` / `-value-free` / `blob3-strip` (source) | the adjacent blob fleet | **PASS** |

`npx vue-tsc --noEmit` exits 0.

### Sibling-spec re-points (the IA consolidation consequence)

The Configurator adoption folded the interaction + mood heroes into ONE Configurator-driven
studio (one live `<GooBlob>`), so the π specs that assumed the two-blob IA were re-pointed:
`blob-mood-live.spec.ts` reads `.first()` (was `.nth(1)`) and drives the mood via the studio
preset tab-row (was a mood-pill button row); `blob3-interaction-capture.spec.ts`'s mood
capture is gated `if (moodCount >= 2)` and gracefully skips with one blob (it is a capture
spec, not a registered gate). `blob-render.spec.ts`'s `CENTROID_SHIFT_MAX` re-points
0.07 → 0.09 (the corrected-sign calm lean is ≈0.075; the prior 0.042 was the inverted-sign
cancellation artifact). The mood/harmony `LabeledSelect` controlled-open does not open under
Chrome-headless (a pre-existing reka-ui headless quirk, identical on the
`compositions/configurator` route — NOT a regression of this wave); the mood is also
driveable via the preset row (the primary path).
