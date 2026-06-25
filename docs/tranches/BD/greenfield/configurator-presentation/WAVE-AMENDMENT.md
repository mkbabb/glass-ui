# WAVE-AMENDMENT — configurator-presentation (reconciled vs the extant 116-wave BD set)

> The CONCRETE tranche amendment for the per-page CONFIGURATOR + preset GALLERY. Reference
> implementation: `docs/tranches/BD/greenfield/configurator-presentation/GOLDEN.md`
> (as hardened by `challenge/1.md`, `2.md`, `3.md` and the live re-measure in `DELTA-ASSAY.md`).
> No duplicative work: the gestalt is already 75%-booked by `BD.W-CONFIG-GALLERY-DOCK` +
> `BD.W-PRESET-RENDER` + `BD.W-VIZ-CONFIGURATOR`. This amendment RE-ROOTS one diagnosis,
> AUGMENTS two waves, and authors ONE new wave.
>
> **Verdict: 2 AUGMENT + 1 NEW + 5 DEPEND/CROSS-LINK. NO wave PRUNED. NO wave EXCISED.**

---

## A · AUGMENT `BD.W-PRESET-RENDER.md` (RE-ROOT — the diagnosis is wrong)

`BD.W-PRESET-RENDER` diagnoses a WebGPU swap-chain READBACK race (`toDataURL` after present →
empty buffer) and prescribes a WebGL2-pin / owned-target / yield-collapse. **The live failure
is a different layer** (DELTA-ASSAY §2, challenge 3 R-top, source + console verified):

- The bake aborts at `usePresetThumbnails.ts:77-80` — the `catch` wrapping the
  `createAurora(…,{mode:"capture"})` CALL. Console: `[Aurora] thumbnail bake aborted: Error:
  [useWebGPUCanvas] device not acquired`. The readback loop (L91-97) is **never reached**, so
  the readback fix lands on a loop that never runs.
- The sync-arm is gated OFF for capture (`runtime.ts:462`); `await armAsync()` already ships
  (`usePresetThumbnails.ts:90`). The real failure is **device-acquire REJECTION** in this host
  (validation-probe / SwiftShader / no-device, `runtime.ts:138-148`). No reorder/readback fix
  makes a device appear.

**AUGMENTS:**
- **Re-root the §"defect" + §"mechanism":** the default thumbnail is the **shipped device-free
  `auroraFallbackGround(config)`** (`src/components/custom/aurora/composables/auroraFallbackGround.ts`,
  already a consumer in `Aurora.vue` for the `"css"` substrate) — per-preset-distinct, ≥2-hue,
  deterministic, ZERO WebGL/WebGPU. **DELETE the eager `mode:"capture"` offscreen bake as the
  default** (the no-backwards-compat clean break).
- **Demote the readback race to a TRUE-OPTIONAL Tier-1 (or CUT it):** a real GL bake is opt-in,
  WebGL2-pinned (the existing Close A is the right mechanism for Tier-1), gated on a real
  hardware-GPU probe (not "armAsync resolved" — challenge 2 R-G: SwiftShader succeeds SLOWLY,
  not rejects); if no device, Tier-0 stays. If no hardware host can ever light Tier-1 in CI, CUT
  it (KISS).
- **Re-base the gate `proof:preset-render`:** P1 reads a device-free chroma/ΔE floor on the
  rendered well in BOTH Chromium AND WebKit (perceptual, not byte-equality — challenge 1/2/3 R-A);
  the "byte-identical Chrome⇄Safari" claim → "**device-free + visually-equivalent + never-blank**."
  P3/P4 (the same-tick readback-shape fence) DEMOTE to the Tier-1-only arm (they fence a path
  that is now opt-in). NEW arm: `usePresetThumbnails` must NOT create a `left:-99999px` offscreen
  WebGPU capture canvas on the DEFAULT path (the device-free Tier-0 creates none).
- **Born-RED stays real:** HEAD is still all-13-blank (`img count 0` / 13 skeletons) — RED by
  construction; GREEN at the device-free Tier-0. The self-test bites keep (b) flat-webp / (c)
  partial-bake; add a bite: a default path that touches `createAurora({mode:"capture"})` REDs.

---

## B · AUGMENT `BD.W-CONFIG-GALLERY-DOCK.md` (fold the golden + challenge hardenings)

`BD.W-CONFIG-GALLERY-DOCK` already owns the gestalt structure (route 5 viz through
`<VizStudio>`, gallery up-top + larger + scrollable, collapse to a `<GlassDock>` hub pill via
`useDockState`/`useDockLink`, enlarge the configurator). It is FIT — and critically, its
collapse mechanism (`useDockState`, NOT `useScrollChrome`) is **MORE correct than the golden**
(challenge 2 R-B: the studio doesn't scroll, so `useScrollChrome` can't fire). KEEP the wave's
spine; AUGMENT with the material + a11y + φ + gate hardenings the golden adds:

**AUGMENTS:**
- **B1 — warm-glass tile re-skin + dark-aside re-floor (the §3 read-through, UNBOOKED defect).**
  Add an arm: re-skin the preset tile from the OPAQUE `bg-card` plate (live: light
  `rgb(253,245,236)`, dark `rgb(53,42,34)`, both `backdrop-filter:none`) to the warm-cream
  six-layer transmissive composite (`.glass-floating` tier); the thumbnail well is the §3 field
  (the device-free `auroraFallbackGround` from §A); the collapsed core capsule is `.glass-deep`
  over the vibrant field; the dark aside re-floors off `rgb(53,42,34)` toward the warm composite.
  NEW gate clause **C6 [LIVE π] — the tile + core composite TRANSMITS the §3 field** (composited
  background-alpha < 1 + a read-through delta: tile-region pixels track the stage field, not a
  flat fill), BOTH modes. **Assert TRANSMISSION, NOT `!isGrey`** — the tile already clears any
  grey-chroma floor (chroma ~17/19); an `!isGrey` gate would GREEN the opaque plate
  (challenges 1/2/3 unanimous). Consumes BA.W-NO-GRAY warm-floor + `.glass-floating`/`.glass-deep`
  — no new material minted.
- **B2 — the a11y pattern fence (challenge 1 R2).** The golden §6 mixes `role="tab"` +
  `aria-pressed` (an ARIA contradiction — `tab` uses `aria-selected`) and asserts `GlassDock`
  exposes `role="tablist"` (it does not). COMMIT to ONE pattern: the toggle-button idiom (plain
  `type="button"` + `aria-pressed`, a `role="group"` `aria-label="Presets"` container, roving
  optional) — simplest, matches HEAD, KISS. The gate asserts `aria-pressed` (NOT `aria-selected`);
  no `role="tab"`. Fold the portaled-dock roving/focus-restore/Escape live-test (challenge 2 R-F:
  the portal moves the dock out of its natural tab-order parent).
- **B3 — φ-proportion arm (Aristotelian, golden §5).** φ-tall tile (16:10 well ≈ φ crowned by a
  label band); the collapsed-core width = active-tile width ÷ φ; the aside-widen band φ-derived
  (the existing `asideWidth` widen toward ~420px). A structural arm, no new physics.
- **B4 — fence the collapse to `useDockState` (NOT `useScrollChrome`).** Add an explicit fence
  note: the collapse is the dock's `useDockState` morph driven by a toggle/hover/focus affordance,
  NOT a scroll delta (the studio does not scroll — challenge 2 R-B). The golden's `useScrollChrome`
  citation is REJECTED here; the extant `useDockState` arm-3 is the truth. (Optional polish: the
  re-erupt may layer a `useLiquidReveal` source-rect bloom on top of the dock morph — NOT the spine.)
- **B5 — gate hygiene (challenge 1 R4).** Make C3/C4/C5 selectors null-safe (a missing node is a
  clean RED, not a `Cannot read properties of null` throw) and add HEAD-baseline selectors
  (`.configurator-aside` for the cramped gallery, `[class*=skeleton]` for the dead tiles,
  `.configurator-stage` for the stage) so the gate provably runs RED on HEAD TODAY, then GREEN on
  the new `data-*` hooks. C1's "≥5 consumers" keeps a BEHAVIOUR arm (a second studio's tiles
  render device-free + the gallery collapses), not a bare call-site count (challenge 3 R6).

---

## C · NEW `BD.W-CONFIG-GALLERY-DEAL.md` (the ONLY genuinely-new authoring — the cartoon deal)

**Band 16 (demo-chassis) · depends: `BD.W-CONFIG-GALLERY-DOCK` (the gallery host) ·
`BD.W-PRESET-RENDER` (the device-free tile the deal flies) · `W-LIQUID-ENTRANCE-GENERAL` ·
`W-DOCK-SCROLL-FISSION` (fission-bridge necks) · `BD.W-JUBILANCE-WIRE` (merge-splash) ·
`BD.W-MOTION-WEIGHT` (DOCK_SPRING register).**

The golden §3 four-beat cartoon DEAL (anticipate → arc → goo-merge → settle on a single
`--gallery-deal-t` scalar) is the one unbooked, genuinely-new piece. Authored with the
challenge corrections folded:

**The mechanism (corrected engines):**
- **ANTICIPATION (t 0→0.12):** the picked tile squishes inward (`useLiquidFlex`, ≈0.92,
  vol-preserving), the `.shadow-cartoon-lg` caster DEEPENS (`::after` transform, NEVER animated
  box-shadow); siblings squish a hair (`--i`-indexed overlapping-action lag).
- **DEAL/ARC (t 0.12→0.55):** the tile flies tile-rect → STAGE-rect via **`flipShared`** (the
  forward a→b FLIP — challenge 1 R1: `useLiquidReveal` reveals onto its OWN rect, the WRONG
  direction; `flipShared` ships via `src/composables/motion/suite.ts`) along a NON-straight path
  — the NEW `--gallery-deal-t` arced-translate keyer (the ONE genuinely-new piece; spiked, NOT
  "zero new physics"). Neighbours shuffle to close the gap.
- **BURST (t 0.55):** a FLIP + GL config cross-fade + a merge-SPLASH **overlay** (a DOM element
  over the stage that shares the filter region — `BD.W-JUBILANCE-WIRE` gold coalesce). **NOT a
  tile→canvas metaball neck** (challenge 2 R-C: `DockGooFilter` cannot weld a CSS tile to the
  opaque pixels of an independent GL canvas; goo necks scope to DOM↔DOM seams only).
- **SETTLE (t 0.55→1.0):** the new active tile's ring blooms (`DOCK_SPRING` ζ≈0.7 give), a micro
  ripple runs the neighbours; if auto-collapse-on-pick, the gallery `useDockState`-collapses in
  the wake.

**Fences:** the apply path (`useConfiguratorState.selectPreset`) is UNTOUCHED (GREEN — must
STAY green); goo necks are DOM↔DOM only; PRM → instant color swap + accent-flood, ZERO
transform/blur/cast/arc frames (challenge 2 R-F: the per-pick `auroraFallbackGround` repaint is
bounded + idle-chunked, the merge-splash is motion-gated); `@supports not (filter:url)` → the
deal degrades to a clean scale-FLIP (still arcs + merges, no goo).

**The gate `proof:config-gallery-deal` (born-RED on the flat ring-flip):**
- **D1 — APPLY stays GREEN.** A tile click updates the live stage config (header stops/nuclei
  change). Born-GREEN today — must STAY green (regression fence).
- **D2 — the DEAL frame-series (the cartoon, born-RED).** A pick runs the frame-series:
  anticipate-squish (scale≠1, X·Y≈1) → arc-travel (the tile rect travels a measurably
  non-straight path, apex off the straight line by a φ-derived offset) → merge-splash trails the
  snap (squash ≥1.04 on the merge axis then recoil — real exaggeration, NOT clamped flat) →
  settle ring-bloom. **Born-RED on HEAD** (a flat `hover:-translate` + a ring-flip, no deal).
  The π is a captured compositor frame-series (challenge 3 R3: an unproven boldest-move is a
  born-GREEN gate — a real motion capture is mandatory, not prose).
- **D3 — `flipShared` is the flight engine (not `useLiquidReveal`).** A call-site assert:
  the tile→stage flight composes `flipShared` (the forward FLIP); `useLiquidReveal` is used ONLY
  for the re-erupt-from-core (if at all). The NEW arc-keyer is named + spiked.
- **D4 — PRM single-paint.** Under `prefers-reduced-motion`, the pick lands the color swap +
  accent-flood instantly, ZERO deal frames.
- **Self-test bites:** (a) a flat ring-flip with no squish → D2 RED; (b) a straight-line
  translate (arc apex on the line) → D2 RED; (c) a deal crediting `useLiquidReveal` for the
  forward flight → D3 RED; (d) a tile→canvas goo-neck attempt → flagged (DOM↔DOM fence).

---

## D · DEPEND / CROSS-LINK (no re-author)

- **DEPEND `BD.W-DOCK-INTEGRATE` / `BD.W-DOCK-LINK-API`** — the `useDockLink`/`useDockState`
  collapse-hub `BD.W-CONFIG-GALLERY-DOCK` arm-3 consumes (already its declared dependency).
- **DEPEND `BD.W-VIZ-CONFIGURATOR`** — the sibling that lifts the 3 dot studios onto `<VizStudio>`
  (together all 8 studios route through ONE chassis — the DRY R6 generalization is a BEHAVIOUR
  arm across both waves, not a call-site count).
- **DEPEND `BD.W-MOTION-WEIGHT`** — the `DOCK_SPRING`/`--motion-weight` register the deal rides
  (no re-mint; the same booked register the tabs/buttons amendments depend on).
- **CROSS-LINK `BD.W-SHEET-TRANSLUCENT` / `BD.W-CARD-SHEET-EXPAND`** — the demo-wide
  `demo/configurator/PresetEditor.vue` gear-Sheet (a DISTINCT surface from the per-page
  aurora gallery — it edits `demo/presets/manifest.ts` themes) keeps its Sheet host and adopts
  the warm-glass material via these existing sheet waves (golden §2.4 "noted, not forced"). No
  double-author — the gear-Sheet is enrolled in the sheet-material census, not re-specced here.
- **`W-DOCK-HUB-API` / `W-DOCK-SCROLL-FISSION` exist as waves** — the golden calls
  `useDockHub`/`useScrollChrome` collapse "phantom" (correct that they are not SHIPPED ENGINES),
  but `W-DOCK-HUB-API` IS a booked WAVE. This item does NOT depend on it shipping first — the
  collapse is built from the SHIPPED `useDockState` (`BD.W-CONFIG-GALLERY-DOCK` arm-3). If
  `W-DOCK-HUB-API` ever lands a real engine, the gallery becomes its consumer for free.

---

## E · WHAT IS EXCISED FROM THE GOLDEN (over-claims the hardenings remove)

- §4.2 the "init-ORDER" Tier-1 fix (a no-op — the sync-arm is gated off, the await already
  ships; the real fix is device-free Tier-0).
- §2.2 the `useScrollChrome` scroll-collapse (the studio doesn't scroll — `useDockState` is the
  fitter mechanism, already booked).
- §3/§7 "composed 100% from `useLiquidReveal` / zero new physics core" (the forward flight needs
  `flipShared`; the arc is a NEW keyer).
- §3 "the tile's metaball neck snaps into the stage canvas / the preview becomes the stage" (a
  FLIP + cross-fade + splash overlay; goo necks are DOM↔DOM only).
- §4.1/§6 "byte-identical Chrome ⇄ Safari" (the browser path is a `toDataURL` raster →
  "device-free + visually-equivalent + never-blank").
- §6 `role="tab"` + `aria-pressed` + "GlassDock tablist" (an ARIA contradiction → the toggle-button
  `aria-pressed` pattern).
- §1/§5 "gray, not glass" (the tile is warm-but-OPAQUE → the defect is TRANSMISSION/§3-read-through).
- §0 the `DOCK_SPRING (useLiquidMorph.ts)` path slip (it lives in `dock/constants.ts`).

---

## F · SUMMARY TABLE

| Action | Wave | What |
|---|---|---|
| **AUGMENT** | `BD.W-PRESET-RENDER` | RE-ROOT: device-acquire rejection → device-free `auroraFallbackGround` Tier-0 default (DELETE eager `mode:"capture"`); readback-race → optional Tier-1; gate → device-free chroma/ΔE in both engines, NOT byte-identical |
| **AUGMENT** | `BD.W-CONFIG-GALLERY-DOCK` | +warm-glass tile/aside re-skin (C6 TRANSMISSION) +a11y toggle-button fence +φ arm +`useDockState`-not-`useScrollChrome` fence +null-safe gate w/ HEAD baseline +behaviour R6 |
| **NEW** | `BD.W-CONFIG-GALLERY-DEAL` | the `--gallery-deal-t` 4-beat deal on `flipShared`+NEW arc-keyer+fission DOM-necks+jubilance splash (NOT tile→canvas goo); `proof:config-gallery-deal` born-RED on the flat ring-flip |
| **DEPEND** | DOCK-INTEGRATE · DOCK-LINK-API · VIZ-CONFIGURATOR · MOTION-WEIGHT · LIQUID-ENTRANCE-GENERAL · DOCK-SCROLL-FISSION · JUBILANCE-WIRE | reused, no re-author |
| **CROSS-LINK** | SHEET-TRANSLUCENT · CARD-SHEET-EXPAND | the gear-Sheet PresetEditor adopts warm-glass via existing sheet waves |
| **PRUNE/EXCISE** | — | NO wave pruned; the golden over-claims are EXCISED (§E) |
