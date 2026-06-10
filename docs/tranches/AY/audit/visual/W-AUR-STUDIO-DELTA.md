# W-AUR-STUDIO — DELTA (aurora studio repair + polish)

**Wave** AY.W-AUR-STUDIO · **Surface** aurora studio (`/substrates/aurora`)
· **Device** real Metal GPU (darwin, ANGLE→Metal) · **Server** `:5199` (the live demo)
· **State** DONE — the five dead selects open + bite, the two RED gates flip `fail`→`pass`,
the atoms surface seeds FROM the live preset (no first-touch clobber), the served-app
sentinel fails-closed, the D5 radii arm is measured + reverted, and the T5 dead pointer
is re-routed onto the live `AY.W-AUR-T5` owner.

---

## D1 — the FIVE dead selects now OPEN + bite (the headline)

The root cause: `LabeledSelect` binds reka's CONTROLLED `:open` prop and emits
`update:open`; the five aurora sites passed a literal `:is-open="false"` and never handled
the emit, so the select was controlled-shut forever. The fix is the SAME idiom every working
consumer (`compositions/settings.vue`) uses — `:is-open="ref"` + `@update:open="(v) => (ref = v)"`
(the `v-model:is-open` sugar does NOT work here: the component emits `update:open`, not
`update:isOpen`, so the v-model would listen for an event that never fires — the binding-
verification footgun).

Wired at all five sites (`AuroraAtomsPanel.vue` Harmony/Arrangement/Medium/Motion +
`config/MediumLayer.vue` Advanced Medium). **Live-verified on the real GPU:**

| signal | HEAD | now |
|---|---|---|
| medium trigger `aria-expanded` on click | `false` (forever) | `true` |
| `[role="option"]` mounted on open | 0 | **7** (Smooth/Pastel/Watercolor/Oil/Crayon/Van Gogh/Oil Pastel) |
| Texture slider reachable | never (only via preset) | **yes** (after a textured-medium pick — the `v-if="isTextured"` gate now opens) |
| canvas Δ on a medium pick (interior mean-channel) | n/a (dead) | **> floor 8** (the field visibly changes) |

PNGs: `W-AUR-STUDIO-select-open-desktop-light.png`, `W-AUR-STUDIO-select-open-desktop-dark.png` (the dropdown OPEN with all 7
options, "Van Gogh" highlighted) · `W-AUR-STUDIO-texture-reachable-desktop-light.png`, `W-AUR-STUDIO-texture-reachable-desktop-dark.png`, `W-AUR-STUDIO-texture-reachable-mobile-light.png`, `W-AUR-STUDIO-texture-reachable-mobile-dark.png`
(the Texture slider revealed after the Oil pick).

## D2 / D3 — the two RED gates re-skinned + flipped `fail`→`pass`

Both specs drove native `<select>` / `<input type=range>` markup the LabeledSelect/
LabeledSlider re-skin removed (the `selectOption` / `input.fill` timeouts). The drivers are
re-pointed onto the reka DOM (the `data-atom` anchors survive):

- **`aurora-atoms-render.spec.ts`** — sliders drive via the reka `role="slider"` thumb
  (Home→min / End→max, the band edges the spec asks for); the medium select drives via the
  `role="combobox"` trigger → click → `[role="option"]` by Title-Case label. **PASS** on the
  real GPU (1 spec).
- **`aurora-painterly-statistics.spec.ts`** — the four media each need their FULL hero config
  (the van-Gogh gap-fraction comes from the preset's sparse `densityFill`, NOT a bare medium
  swap over a smooth preset), so `selectMedium` drives the medium via its hero PRESET button
  (the same robust path the arresting spec uses). **PASS** on the real GPU (2 specs, both
  viewports). The four-media-distinct + crayon clause is preserved.

**Ledger flips (the committed artefacts):**

| ledger | HEAD | now |
|---|---|---|
| `.cache/gates/AX-aurora-painterly-statistics.json` | `status:fail` (`locator.selectOption` timeout ×2) | **`status:pass`** (2 passed) |
| `.cache/gates/AX-aurora-atoms-render.json` | (born-RED by timing out; no committed ledger) | **`status:pass`** (1 passed; the new `proof:aurora-atoms-render` driver) |

## D4 — the atoms surface seeds FROM the live preset (no first-touch clobber)

**The trap (HEAD):** the `atoms` reactive was a fixed wispy-sky default that never re-synced
on a preset switch, and the first atom touch replaced the WHOLE per-preset config with the
atoms-default resolution (RA measured Δ=255.7 — "nudging one Atoms slider on Van Gogh
discards the entire Van Gogh look").

**The fix (gestalt, disposition 1 — seed-from-preset):**

1. A new `configToAtoms(config): AuroraAtoms` inverse (lib `composables/atoms.ts`, exported)
   projects the live config back onto the ≤7 atoms (seed off `palette[0]`, energy off
   `saturation`, zone-count off `nuclei.length`, noise off `warpAmount`, medium+amount,
   motion off the drift fields). Lossy by design — `harmony` / `arrangement` are baked into
   the resolved palette/nuclei and take their door defaults.
2. The dock SEEDS `atoms` from `configToAtoms(config)` on mount + every preset switch (a
   `presetKey` watcher) + reset, capturing a deep `presetBaseline` snapshot.
3. `resolveAtoms` gains an optional `base` parameter (defaults to `DEFAULT_AURORA_CONFIG` —
   the default-preserving contract is byte-unchanged; `proof:aurora-atoms-roundtrip` stays
   GREEN). The dock resolves the atoms OVER the `presetBaseline`, so the ~21 non-atom fields
   the projection does not carry SURVIVE the atom touch. An UNTOUCHED seed/harmony is stripped
   from the resolve so the preset's hand-authored palette is not re-derived on an
   energy/zone/noise refinement.

**Live-verified on the real GPU (Van Gogh):**

| signal | HEAD | now |
|---|---|---|
| medium atom reads after selecting Van Gogh | "Smooth" (fixed default) | **"Van Gogh"** (true projection of the live preset) |
| medium after a one-atom (energy) touch | flipped/clobbered | **stays "Van Gogh"** (refines, not clobbers) |
| canvas Δ on a one-step energy refine (interior mean-channel) | **255.7** (full clobber) | **41.4** (within the 60 survive floor) |

PNGs: `W-AUR-STUDIO-seeded-desktop-light.png`, `W-AUR-STUDIO-seeded-desktop-dark.png`, `W-AUR-STUDIO-seeded-mobile-light.png`, `W-AUR-STUDIO-seeded-mobile-dark.png` (the atoms surface reading the
Van Gogh preset).

> Aside (not this wave's scope): the demo binds a global `ArrowRight` preset-cycle shortcut
> with `allowInInput:false`, which fires on a focused reka slider thumb (a `<span role=slider>`,
> not a text input) — so keyboard-arrowing a slider ALSO cycles the preset. The seed-from-preset
> fix is correct under a pointer drag; the keyboard collision is a pre-existing demo shortcut
> conflict, recorded here for a forms/keyboard-hardening successor, NOT fixed here.

## D5 — the −5/3 radii arm (BOUNDED, measured, REVERTED + recorded)

`mediums.glsl.ts:385-387` `sBig/sMed/sSml` at `2.4 / 1.1 / 0.45` (the ≈2.18×/2.44× uneven
step). The φ-adjacent geometric candidate `2.4 / 1.45 / 0.87` (a fixed ≈1.66× step — the −5/3
spacing the matrix named) was applied + re-measured on the real GPU:

| medium | metric | before (2.4/1.1/0.45) | after (2.4/1.45/0.87) | band | verdict |
|---|---|---|---|---|---|
| oil-pastel | §4.3 β | **−2.534** | **−2.413** | [−1.85, −1.45] | moved TOWARD band, NOT into it |
| van-Gogh | §4.2 A | 0.7346 | 0.7641 | [0.732, 0.932] | in band (no regression) |
| van-Gogh | §4.3 β | −1.8098 | −1.5873 | [−1.85, −1.45] | in band (no regression) |
| oil | §4.3 β | −1.5728 | −1.5368 | [−1.85, −1.45] | in band (no regression) |
| oil | §4.2 A | 0.3592 | 0.3530 | [0.732, 0.932] | residual unchanged |

**Disposition: REVERTED (recorded, not silently struck).** The keep-iff rule was "KEEP the
respacing ONLY IF oil-pastel β moves INTO band (≥−1.85)". It moved `−2.534 → −2.413` —
toward the −1.85 floor but **not across it**. The single-pass WebGL2 path is the true
limiter (HC-aurora §5 anticipated this). The hand-set `2.4 / 1.1 / 0.45` stays (van-Gogh's
landed-band spacing); the oil-pastel β residual ROUTES to `AY.W-AUR-T5` as the named
multi-pass candidate. (The reverted candidate is recorded in the `mediums.glsl.ts` comment.)

## D6 — the T5 dead-pointer re-route (the live owner)

`W-AUR-WEBGPU-DECIDE` closed TERMINAL (the WGSL scaffold deleted grep-0); the residual
materialized AFTER that close, so it routed into a wave that could no longer receive it.
**Minted `AY.W-AUR-T5`** (`docs/tranches/AY/waves/AY.W-AUR-T5.md`) — a greenfield WebGL2/FBO
multi-pass anisotropic-Kuwahara wave (NOT a WebGPU resurrection — that path is DEAD), gated on
the recorded USER-HINGE (accept the single-pass A/β ceiling vs spend the multi-pass FBO+Kuwahara
cost). The four dead `W-AUR-WEBGPU-DECIDE` route cites are re-pointed onto `AY.W-AUR-T5`:

- `tests-visual/aurora-arresting.spec.ts` (the §4.2/§4.3 residual comment + the residual log line)
- `scripts/proof-aurora-arresting.mjs` (the header + the gate-artefact `note`)
- `W-AUR-PAINTERLY-DELTA.md` §Named-successor
- `PROGRESS.md:66` — the orchestrator's SHARED file; the re-pointed text is reported in
  `sharedFileDeltas` (not edited by this lane).

W-DOC1's aurora §References cleanup reads this re-route (coordination edge) so it does NOT
re-cite the retired wave.

## D7 — the served-app sentinel + the ≥1280px clause + the margin disclosure

- **Served-app sentinel** (`tests-visual/served-app-sentinel.ts`): `assertServedDemoAurora`
  asserts the served page IS the glass-ui demo aurora surface (the unique
  `[data-aurora-atoms-surface]` marker + the demo `<title>` "glass-ui Feature Demo"). It
  THROWS (fail-CLOSED) when a FOREIGN app holds the port — distinct from the device-absence
  SKIP the caller keeps ONLY when the demo IS served but the canvas never paints. Wired into
  the arresting + atoms-render + painterly-statistics specs (before the canvas wait). A
  born-RED→GREEN CANARY in `aurora-studio.spec.ts` proves the sentinel passes on the real demo
  AND throws on a planted wrong-root fixture (`page.setContent` with no marker, a different
  title). **PASS** on the real GPU.
- **≥1280px capture clause** (HC-aurora §1b): the studio + painterly captures run at a 1440×900
  viewport; the painterly-statistics spec asserts at 1280 (tablet) + 1440 (desktop). The
  arresting readback downscales to the reference-matched `CANONICAL_WIDTH=464` by design (the
  fixed-octave reference match, NOT a per-medium width) — that downscale is the metric's
  working width, distinct from the capture viewport. The honest as-built: captures are ≥1280-wide
  viewports; the metric width is the reference-anchored 464 (recorded, not a defect).
- **Razor-thin margin disclosure** (HC-aurora §2b): van-Gogh A=0.7346 clears the 0.732 floor by
  **0.0026**; β=−1.8098 clears the −1.85 edge by **0.040** — a thin margin on a hard close gate
  (made hotter by the §2a clobber the sentinel now closes). Recorded as a flake-risk: a future
  shader edit near these axes must re-measure on the real GPU, not assume headroom.

## Gate

`proof:aurora-studio` (new, `scripts/proof-aurora-studio.mjs`) is GREEN on the real GPU,
asserting all six clauses: (1) dead-select deletion-proof (comment-stripped, 0 `:is-open="false"`),
(2) selects-open π, (3) the two re-skin gates PASS + their ledgers read `pass`, (4)
atoms-seed-from-preset round-trip π, (5) served-app sentinel canary, (6) D5/D6 outcomes
recorded (0 dead WEBGPU-DECIDE route cite + the `AY.W-AUR-T5` spec exists + this DELTA records
the radii triples). `proof:aurora-arresting` STILL GREEN (no shader regression — the radii
revert restores the byte-identical hand-set spacing). `proof:aurora-atoms-roundtrip` STILL
GREEN (the `resolveAtoms` base default preserves the contract). `vue-tsc --noEmit` exit 0.
