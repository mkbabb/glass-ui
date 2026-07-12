# BI.W-DOCK-LUMA-SHARE — ONE shared backdrop-luminance observer per route (12 observers → 1)

Band B5 (substrates / perf). The 12 per-dock `useGlassBackdropLuminance` observers doing 10 getImageData
readbacks off a `preserveDrawingBuffer` aurora collapse to ONE shared observer.

## §Mandate

Discharges (registry rows this wave OWNS):
- **PERF-6 [P0] / FAM-5** — `/dock/overview` runs ~10–12 per-dock `useGlassBackdropLuminance` observers doing
  `drawImage(auroraCanvas) + getImageData` (32×32 downsample, ≤4Hz) off the shared `preserveDrawingBuffer`
  DockStage aurora (measured live: all 12 `.glass-dock` have `--glass-backdrop-luma` written — an observer
  active on every one).
- **SUFFUSION-MAP R12** — `useGlassBackdropLuminance` = luminance-only, ONE shared observer per route.
- **Contributes to UF-C4** (dock sluggish — the dock-band owns the user row; this + W-STAGE-FIELD-CLAMP are
  the FAM-5 mechanism pair).

## §Design

Decided mechanism — FAM-5 disposition W-DOCK-LUMA-SHARE + SUFFUSION-MAP R12/D6. The luminance signal is a
per-ROUTE property of the shared backdrop, not a per-DOCK one — N docks over the SAME aurora read the SAME
luma. NO re-litigating (the observer stays luminance-only; the dominant-hue-sample arm is RETIRED UNBUILT
per D6/T7 — real `backdrop-filter` already carries per-pixel locality; a sampled tint paints WRONG on any
two-color backdrop).

- **ONE shared observer per route:** a single `useGlassBackdropLuminance` observer samples the DockStage
  aurora once (≤4Hz, 32×32) and writes `--glass-backdrop-luma` at a shared scope (the route/stage root); all
  N docks INHERIT it via the cascade (the registered inheriting custom property re-substitutes per-element).
  The per-dock observer wiring (`GlassDock.vue:96` `if(props.autoLuminance!==false)`) reads the inherited
  value instead of mounting its own `drawImage+getImageData` loop.
- **`autoLuminance` default reconcile:** the `GlassDock.vue:58` `autoLuminance: true` default is what wires
  the per-dock observer; the shared-observer model makes the dock READ the inherited luma (the dock does not
  each own a readback). A single explicit stage observer + inheriting docks — 12 readbacks → 1.
- The observer stays LUMINANCE-ONLY (R12/R13) — no dominant-hue sample; the plate's own `backdrop-filter`
  carries hue transmission.

## §Work

- `src/components/custom/dock/composables/useGlassBackdropLuminance.ts:24-28` — keep the drawImage+getImageData
  core; the shared-observer entry writes at a route/stage scope.
- `demo/stories/dock/DockStage.vue:64-82` — mount ONE stage-level observer over the DockStage aurora (the
  `preserveDrawingBuffer: true` mount serves the ONE observer, not 10); write `--glass-backdrop-luma` at the
  stage root.
- `src/components/custom/dock/GlassDock.vue:58,96` — the `autoLuminance` path reads the INHERITED
  `--glass-backdrop-luma` (from the shared observer) rather than each dock mounting its own
  `drawImage+getImageData` loop; a dock over an unknown backdrop with no shared observer falls back to its
  own single sample (the honest floor, not a crash).
- `overview.vue` — the 10 `<GlassDock :background-canvas>` bindings collapse onto the shared stage observer.

## §Acceptance

Gate: **`proof:dock-luma-share`** (NEW; source arm `["local","ci"]`, live count LOCAL).
Born-RED at HEAD: `/dock/overview` runs 10–12 `getImageData` readbacks (one per dock). GREEN here.
- DL1 — `/dock/overview` runs ONE `drawImage+getImageData` readback per route (not per dock); the N docks
  inherit `--glass-backdrop-luma`.
- DL2 — the observer is luminance-only (no dominant-hue sample arm — the retired-unbuilt R12 arm stays
  absent).
- DL3 — the `autoLuminance` default still yields correct legibility (the inherited luma reaches every dock;
  a dock with no shared observer falls back to a single self-sample, never a crash).
- Self-test bite: a planted per-dock readback loop (N observers) REDs; a planted dominant-hue sample arm REDs.

## §π/DELTA

`tests-visual/dock-luma-share.spec.ts` (NEW; LOCAL real-GPU) + `W-DOCK-LUMA-SHARE-DELTA.md`:
- The live readback count on `/dock/overview`: ONE per route (down from 12); all N docks read the SAME
  inherited `--glass-backdrop-luma`; the dock legibility (AA over the bright aurora) UN-REGRESSED, both modes.
- The frame-timing before/after on Chrome + **real WebKit** (the getImageData sync-readback cost under
  `preserveDrawingBuffer`).
- Rides the W-PI-IN-CLOSE battery + the W-GESTALT-LEDGER-FILE dock verdict.

## §Obligations

- **Device run (SAF-1):** the readback cost on real WebKit (the FAM-5 dock-sluggish amplification, paired
  with W-STAGE-FIELD-CLAMP). `dis:safari-metal-verify` seam.
- **Cross-repo (recorded):** `useGlassBackdropLuminance` is DEMO-PRIVATE (off the public glass barrel — the
  dock is the only binary consumer at HEAD); no consumer relay owed. `GlassDock`'s `autoLuminance` prop is
  public but its default behavior is preserved (the dock reads inherited luma; a consumer binding
  `:auto-luminance` or `:background-canvas` still works). Note the STAB-B-2 test-crash class (happy-dom lacks
  `elementsFromPoint`) — the shared-observer refactor must keep the dock test suite green (the wave re-runs
  the dock suite, closing the BG.W-GLASS-SIGNAL-TRUTH stale-gate-green that never re-ran it).

## §Dispositions

- **The dominant-hue-sample arm (BD.W-DOCK-DEEP-TRANSMIT arm ii)** stays RETIRED UNBUILT (R12/T7) — this wave
  does NOT re-open it. Terminal.
- **STAB-B-2** (the autoLuminance default-TRUE happy-dom crash, ~30 dock tests) is a B0-CUT repair the
  shared-observer refactor MUST leave green — recorded as a coordination fence with the B0 stability band, not
  re-owned here.
