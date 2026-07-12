# BI.W-ENCAP-REDRAIN — proof:encapsulation redrain (the luminance god-module carve)

Band B0 (cut-blocker). Born-RED at HEAD.

## Mandate

- **FAM-1** `proof:encapsulation` RED ✔ (orchestrator-verified at HEAD): `useGlassBackdropLuminance.ts` is 554 lines > 500, no ratchet row → gate FAILs. Disposition: W-ENCAP-REDRAIN.
- **H-4 / C-ENCAP** (partial): the RATCHET_BASELINES=={} cut-precondition is unmet; this wave discharges the luminance driver.

This wave owns the `useGlassBackdropLuminance.ts` drain ONLY. The `no-god-module` global redrain (dark-arm/ladder/surfaces/property-regs/segmented-tabs) is `BI.W-STYLE-REDRAIN`; the dock/aurora god-modules drain in their own bands (D-DOCK, D-VIZ); the ratchet-contract harden is `BI.W-RATCHET-GROWTH`.

## Design

The house discipline for a >500-line composable is the COLOCATION CARVE (BB.W-CARVE precedent, `proof:encapsulation` C1/E1): lift a self-contained STATELESS leaf into a sibling module the host COMPOSES, with the ratchet row drained in the SAME diff. `proof-encapsulation.mjs:181-183` already declares the carve target (`useGlassBackdropLuminance` host, ratchetKey `composables/glass/useGlassBackdropLuminance.ts`) — the gate is authored FOR this carve and is born-RED until it lands.

The carve leaf is the STATELESS sampling/color math — the `elementsFromPoint` stack-walk luminance reducer + the downsampled-canvas `drawImage+getImageData` reader + the OKLab luminance reduction (the pure functions, no rAF/observer/reactive state) → `composables/glass/backdropLuminanceSample.ts`. The host retains only the reactive wiring (the `useRAFLoop`/`useIntersectionPause`/`useResizeObserver` composition + the `--glass-backdrop-luma`/`--glass-backdrop` writes). No behaviour change — a MECHANICAL carve (the AX.W06/BB.W-CARVE byte-preserving precedent); the public composable signature is byte-identical.

Clean break, no shim: the leaf is a real sibling module the host imports, not a re-export husk.

## Work

- `src/composables/glass/useGlassBackdropLuminance.ts:383+` — lift `sampleStatic` (the `elementsFromPoint` walk) + the animated-canvas `drawImage+getImageData` sampler + the OKLab reduce into `src/composables/glass/backdropLuminanceSample.ts` (stateless exports); host composes them. Host drops ≤500.
- `scripts/proof-no-god-module.mjs` RATCHET_BASELINES — no row exists for this file today (it is over-bound with NO row, which is why `no-god-module` also reds; see W-STYLE-REDRAIN). This wave's drain removes the file from the >500 set entirely.
- `src/composables/glass/index.ts` — the leaf stays INTERNAL (off the public glass barrel; the composable's public surface unchanged).

## Acceptance

Gate: **`proof:encapsulation`** — GREEN at close (BORN-RED at HEAD: driver 554 > 500).

Clauses:
- C1 `useGlassBackdropLuminance.ts` ≤ 500 lines AND no RATCHET_BASELINES row for it (`proof-encapsulation.mjs:274-279`).
- C2 the leaf exists at `backdropLuminanceSample.ts` AND the host imports it (no severed import).
- C3 no-dual-path: the sampling math has ONE home (the leaf); the host carries no inline copy.
- Self-test bite: a synthetic host re-inlining the sampler (leaf-import fig-leaf over a live duplicate) REDs C3.

Cross-gate no-regression: `proof:adaptive-observer` + the `useGlassBackdropLuminance` unit suite stay GREEN (the carve is behaviour-preserving).

## π/DELTA

None — device-free MECHANICAL carve; zero pixel change. The luminance-observer paint is already covered by `proof:adaptive-glass-live` / `tests-visual/adaptive-glass-live.spec.ts` (un-regressed here).

## Obligations

None (glass-ui-internal; no device run, no cross-repo ask, no user judgment).

## Dispositions

- Discharges the `useGlassBackdropLuminance` arm of **H-4** (C-ENCAP). The RATCHET_BASELINES=={} close-state is the collective B10 precondition across all redrain waves.
