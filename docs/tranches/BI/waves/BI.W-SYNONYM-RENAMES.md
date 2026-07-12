# BI.W-SYNONYM-RENAMES — the library-wide synonym-rename law + the /api lockstep

Band B8 (Kronecker factorization). Design: D-FACTOR (PASS-1 §"synonym-rename law"; PASS-4B factor P5 —
the mechanical count + api lockstep check).

## §Mandate

Discharges: UF-P7 ("proper synonym de-duplication" across ALL components). Registry: FAM-10 mechanism-
distinctness (a synonym is a name-duplicate, not a distinct mechanism). Closes 5 of the 6
`proof:variant-residual` born-RED residuals (the tone residuals: alert:success/warning/info,
badge:warning/info — button:destructive is W-BUTTON-TONE's).

## §Design

Decided (PASS-1 rename law — library-wide clean breaks, no aliases):

- `type` → `tone` (Notification / Alert / Toast / Badge — the tone concept success/warning/info/destructive
  currently hiding in `type`/`variant` maps).
- `axis` / `direction` → `orientation` (the inline `"horizontal"|"vertical"` copies factor onto the ONE
  `ORIENTATIONS` tuple, zero value change).
- `side` / `position` → `placement` (aligns with the Dialog/Sheet placement axis).
- `register` → `size` (the Metric/SelectTrigger register-name → the ONE `SIZES` ordinal).
- `ToggleChip.variant` → `shape` (folded in W-CHIP-FOLD; the rename is recorded here as law).
- `variant` becomes RESIDUAL-ONLY — no size/tone/surface concept may hide in a `variant` map (gate-enforced
  by `proof:variant-residual`).

## §Work

- `src/components/ui/alert/index.ts`, `src/components/ui/badge/index.ts`, `src/components/ui/toast/use-toast.ts`,
  `src/components/ui/notification/Notification.vue` — migrate the tone maps off `type`/`variant` onto a `tone`
  axis reading the `TONES` tuple (W-AXES-GATES). Clean break; every call site renames.
- Sweep `axis`/`direction`/`side`/`position`/`register` prop names → `orientation`/`placement`/`size` across
  the component set (the mechanical P5 count is the worklist; each is a name rename, zero value change).
- `src/api/index.ts` — the /api surface re-exports in LOCKSTEP: every renamed axis type publishes under the
  new name; the old name is DEFINITION-ABSENT (no dual export). The api-lockstep clause asserts the /api
  surface ≡ the component prop surface.
- MIGRATION.md rows for every rename → W-FACTOR-ASKS.

## §Acceptance

Gate: **`proof:variant-residual`** (W-AXES-GATES) + an **api-lockstep** clause.
- `proof:variant-residual` (BORN-RED at HEAD — 5 tone residuals live: alert:success/warning/info,
  badge:warning/info): each tone concept is a `tone` axis value, DEFINITION-ABSENT from any `variant`/`type`
  map → GREEN. (button:destructive is W-BUTTON-TONE's clause; the two waves jointly GREEN the 6-residual gate.)
- api-lockstep clause (BORN-RED — the old synonym names still export): every renamed axis exports under the
  new name on `/api`; `type`/`axis`/`direction`/`side`/`position`/`register` as PUBLIC axis-prop names are
  DEFINITION-ABSENT.
- Self-test bite: a synthetic `type: "success"` prop map REDs variant-residual; a stale `/api` `register`
  export REDs api-lockstep.

## §π/DELTA

Byte-diff: every renamed component paints byte-identical (a name rename, zero value change) — Notification/
Alert/Toast/Badge tone surfaces, BOTH modes (0 delta). DELTA: `W-SYNONYM-RENAMES-DELTA.md` (also carries the
W-BUTTON-TONE tone byte-diff). Rides W-REFLECT (`proof:ba-gestalt` feedback-band, un-regressed).

## §Obligations

- SelectTrigger `size` two-concept axis (height vs font-emphasis — PASS-1 factor gap 6): the `register→size`
  rename must NOT re-open the BA-VJS-4 trigger/items desync — the height tiers + font-rung tiers both write
  the shared `--dropdown-text` token; keep that seam. (If a genuine split is needed it is a rider, flagged
  to the orchestrator — see orphans.)
- The full call-site + consumer migration (words/atlas/muster/sci-report) → W-FACTOR-ASKS.

## §Dispositions

- Terminalizes the synonym-rename law rows: `type→tone`, `axis/direction→orientation`, `side/position→
  placement`, `register→size`, `ToggleChip.variant→shape` — **RENAMED-TERMINAL**, /api in lockstep, clean
  break no alias. `variant` = RESIDUAL-ONLY, gate-enforced.
