# BI.W-P124 — Easing

**Status:** DONE

## Shipped contract

`EasingPicker` is the glass-owned easing editor while value.js remains the curve-math authority.

- Canonical two-way `v-model` hydration and writeback cover cubic Bézier and steps values.
- Named, value-bearing handles share pointer and keyboard edit paths.
- Copy success and failure remain explicit, with the full literal available for manual recovery.
- Preview is a bounded editor-local one-shot, stops under reduced motion, and makes no physical-playback claim.
- `EasingConfigurator` composes the picker rather than maintaining a second easing state or solver.
- Keyframes is the direct package consumer of the public easing surface.

## Evidence

`tests/components/easing.contract.test.ts` covers canonical model flow, editing, copy recovery, preview, and reduced-motion behavior.
