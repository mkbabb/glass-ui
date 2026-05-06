# J.W4 Lane C — Metaballs Configurator + Speedtest Aurora Preset Proof

**Lane**: C — Metaballs configurator buildout + speedtest aurora preset.
**Wave**: J.W4.
**Author**: Lane C agent.
**Closes-on**: hard gate (a)–(h).

---

## Scope reveal

W4 wave-spec (`docs/tranches/J/waves/W4.md` Lane C) names "blob configurator
buildout". Master HEAD has no `blob` substrate — the blob mascot grammar was
renamed to **metaballs** (`src/components/custom/metaballs/`) prior to J's
planning baseline absorption. Lane C scope therefore reads as **metaballs
configurator buildout + speedtest preset**. The W4-C-blob proof-doc filename
preserves the wave-spec naming so the wave-spec ledger still resolves.

---

## §1 — Speedtest aurora preset

### Source

`../speedtest/src/config/auroraConfig.ts:1–129` — **the live config is
reachable on disk**. Per the dispatch protocol ("prefer reading the live
preset config over the R2 §D literal"), this lane sourced the SPEEDTEST
preset from the live speedtest repo.

R2 §D extracts the same literal verbatim; the two sources agree on every
field. The live config additionally exports a reactive light/dark +
idle/running alpha fork (`useSpeedtestAuroraConfig`) that this lane does
**not** ship — per memory rule `feedback_presets_in_consumer.md`, that
reactive fork is consumer-domain (it binds to `useSpeedtestStore.currentPhase`
which is a speedtest-only concept). The library demo ships only the static
`alpha: 0.26` baseline.

### Landing site

`demo/stories/aurora/presets.ts` — added as the 12th entry. Mapping onto the
canonical preset shape:

```ts
const SPEEDTEST = cfg({
    palette: [/* 6 OKLCH stops — purple/blue/pink/emerald/amber/violet */],
    nuclei:  [/* 6 nuclei distributed across canvas */],
    softmaxBeta: 3.2,
    valueVariance: 0.08,
    warpAmount: 0.38, warpScale: 1.6, warpDrift: 0.02, warpMode: "fbm",
    noiseOctaves: 4,
    medium: "smooth",
    flow: { pattern: "none", focalX: 0.5, focalY: 0.5, angle: 0, curl: 0 },
    /* ...stroke/medium knobs all zero per "smooth" medium... */
    nucleiDrift: 0.04, paletteDrift: 0.02,
    breathDepth: 0.08, breathPeriod: 42, saturation: 0.85,
    paperGrain: 0,
    alpha: 0.26,
});
```

`PRESET_META.SPEEDTEST = { label: "Speedtest", sub: "smooth · 6 nuclei · 6-hue", medium: "smooth" }`.

### Verification

```bash
$ rg "SPEEDTEST" demo/stories/aurora/presets.ts
376:// ── SPEEDTEST ─────────────────────────────────────────
383:const SPEEDTEST = cfg({
480:    SPEEDTEST,
503:    SPEEDTEST:      { label: "Speedtest", ... }
```

Lane B's chrome refactor (`PresetPickerRow.vue`) renders SPEEDTEST without
breakage — the canonical preset shape was matched exactly. Aurora story at
`demo/stories/aurora.vue` continues to render every preset in the picker
row including SPEEDTEST.

---

## §2 — Metaballs configurator buildout

### R2 7-axis split ↔ metaballs API mapping

R2 §C named a 7-axis split for the (renamed) blob primitive. Mapping onto
the actual metaballs API (`src/components/custom/metaballs/types.ts`):

| R2 axis              | Metaballs prop           | Configurator layer  | Notes |
|----------------------|--------------------------|---------------------|-------|
| `falloff`            | `edgeSoftness`           | **Falloff**         | Smoothstep range at the threshold boundary; lower → sharper edges. |
| `count`              | `blobCount`              | **Count**           | NumberField bound; capped at 16 (shader uniform array limit). |
| `radius`             | `baseRadius`             | **Radius**          | Slider 0.04..0.3, fraction of viewport. |
| `color/hue/luminance`| `colors[]`               | **Color**           | Per-stop HTML color picker + add/remove rows; replaces the static specimen swatches. |
| `isoLevel`           | `threshold`              | **IsoLevel**        | Slider 0.5..2; higher → sharper iso surface. |
| `motionMode`         | `speed` + `orbitAmplitude` | **Motion**        | BouncyToggle (Still/Drift/Orbit) drives a composite preset over both; raw sliders below for fine control. |
| `noise`              | (folded into Motion)     | (no separate layer) | Metaballs uses deterministic phi/√2/√3 oscillation with no separate noise channel — the orbit *is* the noise source. The 7th layer surfaces as **Output** (`bgAlpha`) so all live knobs are reachable. |

**6 axis layers in the configurator** (per actual metaballs surface), plus
an Output layer for `bgAlpha`. The mapping is documented in the story file
header so future agents reading metaballs.vue see the rationale.

### Landing site

`demo/stories/motion/metaballs.vue` — full rewrite. Was: 188 LOC of static
specimens (single canvas + readout grid). Is: ~330 LOC composing the
canonical `<Configurator>` + `<ConfiguratorLayer>` + `<ConfiguratorRow>`
primitives from Lane A, with `useConfiguratorState<T>` orchestrating preset
selection / dirty detection / reset semantics.

Three example presets ship:
- **Sunset** — warm, 10 blobs (the prior story's default).
- **Cool** — pastel, 7 blobs (the prior story's direct-canvas specimen).
- **Mono** — slate, 12 blobs (new — proves the count axis at higher density).

### Step 3 (optional — extract metaballs presets)

Step 3 was completed inline within `metaballs.vue` rather than extracted to
a separate `metaballs-presets.ts` file. Three presets at this scale do not
yet warrant a separate module. The presets are typed as
`ConfiguratorPreset<Required<MetaballConfig>>[]`; extracting later is a
mechanical move.

---

## §3 — Accessibility gates

### `prefers-reduced-motion`

Pre-Lane-C: `useMetaballs` had no PRM gate. **Added** in
`src/components/custom/metaballs/useMetaballs.ts`:

```ts
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const isReducedMotion = ref(matchesMedia(REDUCED_MOTION_QUERY));

function render(now: number) {
    // Freeze time cursor so blobs hold a single deterministic frame; the
    // RAF loop continues so live config edits still re-paint.
    const effectiveNow = isReducedMotion.value ? startTime : now;
    const t = (effectiveNow - startTime) * 0.001 * cfg.speed;
    // ...
}
```

Listener wired in `init()`, removed in `dispose()`. Re-anchors `startTime`
when reduced-motion is toggled OFF so live unfreezes don't catapult through
accumulated paused time.

### `prefers-reduced-transparency`

Metaballs alpha-composites — `bgAlpha` defaults to 0 (transparent canvas) and
the SRC_ALPHA blend lets the host substrate bleed through. Per R2's
prescription for substrate primitives that composite: **lift the effective
alpha to a solid surface** under PRT.

```ts
function effectiveBgAlpha(): number {
    return isReducedTransparency.value ? 1 : cfg.bgAlpha;
}
gl.uniform1f(uBgAlpha, effectiveBgAlpha());
```

Both refs (`isReducedMotion`, `isReducedTransparency`) are exposed from
`useMetaballs` and re-exposed via `MetaballCanvas.vue`'s `defineExpose` so
parent stories can read them. `metaballs.vue` displays a status caption
("reduced-motion · single frame" / "reduced-transparency · solid bg") when
either matches.

---

## §4 — Files changed

| File | LOC delta | Notes |
|------|---:|-------|
| `demo/stories/aurora/presets.ts` | +52 | SPEEDTEST preset + PRESET_META entry. |
| `demo/stories/motion/metaballs.vue` | +205 / -53 | Static specimens → `<Configurator>` consumption with 7 layers (6 axis + Output) + 3 presets + PRM/PRT readouts. |
| `src/components/custom/metaballs/useMetaballs.ts` | +60 | PRM/PRT gates: media-query refs, listeners, `effectiveBgAlpha()`, render-loop freeze. |
| `src/components/custom/metaballs/MetaballCanvas.vue` | +5 | Re-expose `isReducedMotion` + `isReducedTransparency` via `defineExpose`. |

No `src/components/custom/metaballs/types.ts` changes — the API surface is
unchanged; PRM/PRT are runtime concerns, not config knobs.

---

## §5 — Hard-gate verification

| Gate | Status | Evidence |
|------|--------|----------|
| (a) `auroraPresets.SPEEDTEST` defined | **PASS** | `rg "SPEEDTEST" demo/stories/aurora/presets.ts` returns 4 hits across the canonical entry, the `PRESETS` map, and `PRESET_META`. |
| (b) `metaballs.vue` consumes `<Configurator>` with 7 axis layers | **PASS** (6 metaballs axes + 1 Output; documented mapping) | `grep -c "<ConfiguratorLayer" demo/stories/motion/metaballs.vue` = 7. |
| (c) `MetaballCanvas` honors PRM AND PRT | **PASS** | `useMetaballs.ts:5,6,242,204`. |
| (d) `npm run typecheck` green | **PASS** | clean output, no errors. |
| (e) `npm run build` green | **PASS** | `✓ built in 17.40s`. |
| (f) `npm run test` green | **partial** — 2 failing tests both about `DockPopover` retirement (W3 work), unrelated to Lane C. Lane C added 0 failing tests. | `tests/public-surface.spec.ts` failures are about `DockPopover` not being exported from `@mkbabb/glass-ui/dock` after W3's retirement — Lane W3 territory, not Lane C. |
| (g) per-story consumption sweep | **PASS** | metaballs story consumes `<Configurator>` from Lane A; aurora story (via Lane B's chrome refactor) consumes the SPEEDTEST preset entry through `PresetPickerRow`. |
| (h) Lane C proof doc with extraction source + mapping table + step 3 disposition | **THIS DOCUMENT** | §1 (live `../speedtest/src/config/auroraConfig.ts` chosen over R2 §D literal — they agree); §2 (mapping table); §2 (step 3 inline within metaballs.vue). |

---

## §6 — Coordination notes

- **Lane A** (`<Configurator>` primitive) was complete and consumable by the
  time Lane C consumed it. The primitive's API (slots `stage`, `presets`,
  `controls`, `footer`; props `presets`, `activePreset`, `scrollMode`;
  emits `select-preset`, `select-layer`, `reset`) matched the R2 §C
  prescription closely.
- **Lane B** (aurora chrome refactor) modified `PresetPickerRow.vue` — Lane
  C's SPEEDTEST entry follows the canonical preset shape exactly so Lane B's
  chrome resolves it without breakage.
- **No file-bound violations**: Lane C touched only `demo/stories/aurora/presets.ts`,
  `demo/stories/motion/metaballs.vue`, and `src/components/custom/metaballs/*`.

---

## §7 — Open follow-ups (not Lane C scope)

- **`<MetaballCanvas>` story-fidelity**: the new metaballs story uses the
  canonical Slider for sliders. If W5 ships `sliderVariants` size axis
  (sm/md/lg) per its plan, the dense configurator rows could opt into
  `size="sm"` to reduce vertical rhythm — but that's W5 territory.
- **Test failures in `tests/public-surface.spec.ts`** — about `DockPopover`
  retirement — are W3 territory; W3's close ceremony owns the test
  reconciliation.
