# REFLECTION — constellation surface (AZ.W-REFLECT)

**Lane:** constellation · **Auditor pass:** 2026-06-11 · **Branch:** tranche/AY @ HEAD (AZ Batches 0–5 + R4/R5 corrective landed)
**Verdict: PASS**

The constellation surface meets the user's standards in totality. Every R5-6 generalization item
landed first-class (or closed honestly on the zero-deck-domain canon), the protected slides quintet
is byte-compatible, the warp/freeze/refit/recession/focal registers all verified LIVE on :5199 with
fresh captures + π readbacks, every constellation gate is GREEN, and a first-time-auditor walk found
no "wtf." No defects routed to the triumvirate.

---

## 1. Recapitulation — every audit item × wave × discharging evidence

### Audit items that touched the constellation surface

| id | source | the user's words / item | discharged by | live evidence |
|---|---|---|---|---|
| A2 (AY) | USER-AUDIT 2026-06-10 | constellation too opaque, type over it hard to read → recession under text zones | `opacityCeiling` envelope (AY.W-COHERE E3) | recession π: full 0.0257 vs dim 0.0171 ink-coverage, dim recedes (ratio 0.66 by coarse coverage; per-channel alpha bite locked by gate) |
| A3 (AY) | USER-AUDIT 2026-06-10 | click → the anomaly warps to the NEAREST point of the click (the lib `warpOnClick` exactly) | `warpTo`/`warpStep`/`setWarpTarget` (AX.W17); slides re-points via the protected quintet | warp-live π: pre `targetIdx -1` → real-click → `targetIdx 40` (nearest), spring travel 80.7px (warp.x 422.5→341.8); `constellation-warp-after-click-desktop-light.png` |
| R5-6 G1 | USER-AUDIT R5-SLIDES | a PINNED node excluded from `stepField` drift | AZ.W-CON-GEN G1 — `pinnedIndex` on `ConstellationField` + `stepField` skip + `pinned` prop + `pinNode()` expose | π: pinnedDelta 4.16px (drift-only) vs meanOthers 31.2px over 59 nodes (all moved) — pin holds ~7.5× tighter |
| R5-6 G2 | USER-AUDIT R5-SLIDES | an accent anomaly-EDGE skin on `drawEdges` | AZ.W-CON-GEN G2 — trailing `accentIndex` param on `drawEdges`, incident edges stroke `palette.accent` | gen-section captures: the pinned-node incident edges read terracotta accent both modes |
| R5-6 G3 | USER-AUDIT R5-SLIDES | `edgeFloor` + `accent` + anomaly-alpha on `ConstellationPalette` | AZ.W-CON-GEN G3 — palette gains `accent`/`edgeFloor`/`edgeAccentAlpha`; `readPalette` probes them; tokens `--constellation-edge-floor`/`-edge-accent-alpha` minted | live tokens: accent `hsl(18 58% 46%)`, edge-floor `0` (lib default-OFF), edge-accent-alpha `0.30` |
| R5-6 G4 | USER-AUDIT R5-SLIDES | label text in the overlay seam | SPEC'D-NOT-BUILT (honest book) — the `drawOverlay` seam already carries label text; no `label` prop on the zero-deck-domain canon | gen π gate `G4 ZERO-DECK-DOMAIN: yes`; README §"Non-goal" + the demo `drawPinnedAnomaly` `fillText("anomaly")` recipe |
| R5-6 G5 | USER-AUDIT R5-SLIDES | an autonomous slow drift distinct from click-warp | AZ.W-CON-GEN G5 — `pinnedDrift` engine mode (closed-form easeInOutQuad inside the single rAF), orthogonal to `wander` | π: pinnedDrift ON, wanderFrac 0.16, durMs 2400, pinnedDelta 4.16px within anchorBound 170.2px (`withinAnchorBound: true`) |
| R5-6 G6 | USER-AUDIT R5-SLIDES | warp auto-release + an `isSettled` signal | AZ.W-CON-GEN G6 — `warpSettled()` expose + `warpAutoRelease` prop (settled warp clears `targetIdx`) | warp-live π: after settle `finalTargetIdx -1` (auto-released), `warpSettled() true`; the on-screen `settled` badge present both modes |

### Prior constellation waves carried forward (re-verified UNREGRESSED)

| wave | facility | re-verify evidence |
|---|---|---|
| AX.W17 | tokens + warp-on-click | `proof:constellation-warp-live` 2/0; `proof:constellation-tokens` PASS |
| AY.W-CON1 | resize re-fit + auto-drift `wander` + `warpSettled`/`pickWanderTarget` | `proof:constellation-refit-live` 2/0 |
| AY.W-CON2 | `gravityWell` + `readInteractionConfig` + the demo supernova | `proof:constellation-egg-live` 2/0 |
| AY.W-CON3 | `?freeze` deterministic capture | `proof:constellation-freeze-live` 4/0; freeze π: both runs still, paintedNow 0, overlayRadius 9.890625 identical cross-run |
| AY.W-COHERE E3 | `opacityCeiling` recession | recession section paints, dim recedes vs full |
| AY.W-COLOCATE | feature-dir split (field/interaction/draw/constants/composables) | dir intact at `src/components/custom/constellation/` |

### User decisions honored

- **Standing directive "all core changes at the ROOT; idiomatic gestalt; NO workarounds":** every R5-6 item is a first-class library member, not a consumer fork. The slides anomaly skin re-expresses as ≈30 lines of `drawOverlay` recipe over library surface (the demo `drawPinnedAnomaly`).
- **No-backwards-compat / protected quintet byte-compatible:** `seedField`/`readPalette`/`BASE_WIDTH`/`warpTo`/`warpStep` keep exact signatures; every addition is a new optional prop/member/export; `drawEdges` gains a TRAILING optional param. Verified via `index.ts` grep + `typecheck` GREEN.
- **Presets-in-consumers:** ppmycota/deck-domain wording stays the consumer's `drawOverlay`; `--constellation-accent` is the consumer-preset boundary (slides aliases it to `--ncsu-red`). The library ships the NEUTRAL field + the ACCENT-edge MECHANISM, never deck wording (machine-locked by `proof:constellation-substrate-single` ANOMALY-IS-SKIN: yes).
- **≥2-consumer bar per item:** each built item musters the demo exerciser ("pinned anomaly (generalized)" section) + the named slides re-point; G4 honestly SPEC'D-NOT-BUILT.

---

## 2. Gate roster (all GREEN at HEAD)

| gate | result |
|---|---|
| `proof:constellation-gen` (R5-6 six-item) | PASS — G1✓ G2✓ G3✓ G4✓(honest book) G5✓ G6✓ + UNIT RUNTIME-TRUTH✓ |
| `proof:constellation-field` (unit suite) | PASS — 35/35 |
| `proof:constellation-tokens` (Canvas2D-safe tokens) | PASS — TOKEN-BLOCK both arms, READPALETTE 6/6, NO-LIGHT-DARK |
| `proof:constellation-warp-live` | PASS — 2/0 |
| `proof:constellation-freeze-live` | PASS — 4/0 |
| `proof:constellation-refit-live` | PASS — 2/0 |
| `proof:constellation-egg-live` | PASS — 2/0 |
| `proof:constellation-substrate-single` | PASS — PRNG-SINGLE-SOURCE✓, ANOMALY-IS-SKIN✓ |
| `npm run typecheck` | GREEN (additive palette/field types thread clean) |

---

## 3. Live re-verification — captures (stored beside this record)

Captured fresh on :5199 (web-history route `/substrates/constellation`, deviceScaleFactor 2),
2 viewports (desktop 1440×900, mobile 390×844) × 2 modes. The π readbacks ran PRM-OFF with the
host scrolled into the IntersectionObserver window (a PRM-default headless context parks the substrate
and zeroes ALL node deltas — confirmed; the meaningful sample requires `reducedMotion: no-preference`
+ on-screen).

| filename | what it proves |
|---|---|
| `constellation-substrate-desktop-light.png` | the full story hero — lattice background, focal node, pointer-reactive toggle, floating dock |
| `constellation-substrate-desktop-dark.png` | dark substrate, light-toned lattice (the dark `--constellation-line` arm) |
| `constellation-substrate-mobile-light.png` | mobile hero, lattice + dock fit |
| `constellation-substrate-mobile-dark.png` | mobile dark |
| `constellation-gen-section-desktop-light.png` | the pinned-anomaly (generalized) section — accent anomaly mark + dashed "anomaly" callout + accent incident edges + `settled` badge |
| `constellation-gen-section-desktop-dark.png` | same, dark — accent + callout + badge legible |
| `constellation-gen-section-mobile-light.png` | mobile gen section (accent mark faint at small k but present) |
| `constellation-gen-section-mobile-dark.png` | mobile gen dark |
| `constellation-hero-light.png` | `/compositions/hero` — constellation full-page background, typewriter title, dock floating over the lattice (the B16 invisible-constellation regression resolved) |
| `constellation-hero-dark.png` | hero dark |
| `constellation-warp-after-click-desktop-light.png` | post-real-click — the accent focal mark warped to the nearest node, springing onto it; the single accent event over a neutral lattice |

### π readbacks (literal)

- **Pinned hold + drift (G1/G5):** `pinnedDelta 4.16px` vs `meanOthersDelta 31.2px` (max 31.26, all 59 other nodes moved); `pinnedDrift` ON, `wanderFrac 0.16`, `durMs 2400`, `anchorBoundPx 170.2`, `withinAnchorBound true`.
- **Warp-on-click (A3/warpTo) + auto-release (G6):** before `targetIdx -1` → real click → acquired nearest `targetIdx 40` → spring travel `80.7px` → after settle `finalTargetIdx -1` (auto-released), `warpSettled() true`.
- **Freeze determinism (?freeze):** two independent mounts both `still: true` over 1.2s, `paintedNow: 0` (FROZEN_NOW handed to drawOverlay), `overlayPulseRadius 9.890625` identical cross-run.
- **Tokens (G3):** `--constellation-accent hsl(18 58% 46%)`, `--constellation-edge-floor 0` (lib default-OFF, byte-identical), `--constellation-edge-accent-alpha 0.30`.
- **Recession (A2/opacityCeiling):** full 0.0257 vs dim 0.0171 ink-coverage — the recessed instance reads dimmer (directional bite confirmed; the precise per-channel alpha ratio is locked by the substrate-single gate, coarser by binary coverage threshold).

---

## 4. The perfection question — first-time-auditor walk

Walked all eight sections (proximity-graph, click-to-warp, resize re-fit + auto-drift, gravity-well,
recession envelope, pinned anomaly generalized, double-tap supernova, anomaly recipe + ?freeze) at
both viewports × modes. Nothing draws a "wtf":

- The lattice reads cleanly as a decorative proximity graph on both the cream (light) and ink (dark)
  substrate; edges/nodes track the `--constellation-*` legibility tokens per mode.
- The ONE accent event per focal/anomaly mark is proportionate (the one-color-event idiom) — terracotta
  ring + halo + core + dashed monospace callout, never two competing color families.
- The `settled` badge reads correctly (muted "settled" at rest; the prose explains it flips to "warping…"
  in flight then auto-releases).
- The hero composition shows the constellation as a full-page background with the dock floating over it —
  present + legible, no longer the B16 invisible regression.
- The warp springs onto the nearest node on a real click (not a teleport, not a miss) — the A3 contract.

Naming-discrepancy noted + RESOLVED (NOT a miss): the spec text (AZ.W-CON-GEN) named the token
`--constellation-edge-anomaly-alpha` and member `edgeAnomalyAlpha`; the implementation settled on
`--constellation-edge-accent-alpha` / `edgeAccentAlpha` to align with the `accent` register vocabulary.
This is a benign, internally-consistent rename (token ↔ palette member ↔ `readPalette` probe ↔ `drawEdges`
all agree); `readPalette` resolves it and `proof:constellation-tokens` READPALETTE 6/6 passes. No defect.

---

## 5. Misses

None. Zero S1/S2/S3 misses. No item routed to the triumvirate.

**VERDICT: PASS.**
