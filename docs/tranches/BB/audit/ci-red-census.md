# BB Batch-0 — the master-CI-red census (W-CI-GREEN input)

**Captured 2026-06-16, siblings-absent (a clean `/tmp` worktree on `master` @ `855d2746`), the CI-accurate environment.** The four sibling-dependent gates that fail in the local dev repo but skip-pass on the clean runner (`consumers:static`, `motion-demo`, `motion2`, `phantom-classes`) are correctly ABSENT — these 18 are the genuine master-CI-red set.

**The integrity finding:** `ci ⊂ local` (156 ⊂ 195), so these 18 are also in the `local` set. The BA close's `FINAL.md §3` claim of "`gates.mjs --run local` green" was therefore **substantially false** — 18 real gates are red. Combined with the release-only failures the publish surfaced (6 fix commits) and the silent cardinal-ledger gate, the BA "complete" close was over-claimed on the gate front. The 4.0.0 PACKAGE is valid (the `release` 43-gate subset is genuinely green + provenance-published); the broader gate health is not. This census is W-CI-GREEN's work-list and the proof that W-CLOSE-BATTERY (the full-set close rule) is load-bearing.

## The 18 (by likely fix-class — each verified per-gate at execution)

### Doc / gate-data drift (BA added surfaces/gates, the doc/gate never synced)
- `proof:readme-meta-clean` — component README gate tables missing the shipped BA gates (`proof:dock-sections`, `proof:dock-morph-insitu`, …).
- `proof:no-god-module` — RATCHET drained to ∅ while 3 files exceed 500 (`offsets-sizing.css` 562 · `utilities/base.css` 541 · `FourierField.vue` 505). → honest re-baseline (book the carve to W-CARVE3) OR carve.

### Demo / storybook drift (BA added components/routes, the demo never demonstrated them)
- `proof:storybook-complete` — `DockSection` (+ likely other BA exports) has zero demonstration (no story imports it).
- `proof:storybook-ia` — story IA drift.
- `proof:no-orphan-demo-route` — orphan demo route.
- `proof:shell-config` — the configurator's `single-dark-home` (the dark `Switch` v-model) missing on a demo shell.
- `proof:page-redesign` — page-redesign cohesion drift.
- `proof:substrate-cohesion` — the G-RECESSION knob set: constellation arm failing.
- `proof:aurora-chrome-idiomatic` · `proof:aurora-oilpastel-medium` — aurora demo-chrome idiom drift.
- `proof:constellation-gen` · `proof:constellation-substrate-single` — constellation gen/substrate drift.

### Source / token drift
- `proof:card-veil` — the veil-fill ladder routing.
- `proof:liquid-glass-tokens` — reduced-motion static token.
- `proof:tailwind-v4-idiom` — modern-v4 cohesion (theme()/bare-var/container).
- `proof:webgl-substrate-single` — the substrate single-source scheduling.

### a11y
- `proof:touch-target` — `Switch` (forms/checks) hit-rect 24×24 (no halo).
- `proof:slider-two-only` — slider two-thumb orphan selectors.

## Disposition
W-CI-GREEN (Batch-0) investigates + fixes each. The honest-interim path (the gate's own grandfather mechanism) is permitted where the true fix is a genuine refactor booked to a later batch (e.g. `no-god-module` → re-baseline + W-CARVE3) — but recorded, never a silent ratchet-drain. A live-π gate mis-tagged into the headless `ci` set (if `touch-target`/`substrate-cohesion` prove to need a render) routes to W-GATE-HYGIENE (re-tag), not a fake source pass. The full-set close rule (W-CLOSE-BATTERY) makes this census class impossible to ship again.
