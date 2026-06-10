# AY.W-CONSUMER — the {receiver, close-gate} consumer-staleness ledger

The reverse cross-repo staleness gate (`proof:consumer-staleness`) is born-RED at HEAD on the W53
tabs-unification clean break (`d4c2910` — `BouncyToggle`/`BouncyTabs`/`UnderlineTabs`/`ResponsiveTabs`
deleted, subsumed into ONE `SegmentedTabs` with a `variant` axis). Two consumers still import the deleted
family. This ledger is the seam: per stale import, it records who discharges it and when.

**Born-RED count (live-re-measured 2026-06-09 at HEAD `at-dock-convergence`, dist d.ts present):**
**5 stale imports across 2 siblings** — NOT the DRAFT's stale "12 across 4" (a session-limit-era snapshot;
the `project_workflow_stale_worktree_trap` chronic — re-measured per the cardinal-DELTA discipline). The
other two then-stale siblings have since partially migrated: speedtest now carries only a code-COMMENT +
a test-STUB referencing `UnderlineTabs`, neither an `import … from` the gate flags.

**The fix is MIGRATE, never a re-export alias.** glass-ui does NOT re-introduce `UnderlineTabs`/`BouncyToggle`
as a back-compat alias (that violates the no-backwards-compat invariant — the W53 clean break deleted them).
The receiver surface is `SegmentedTabs` on `@mkbabb/glass-ui/tabs`, a DROP-IN: `UnderlineTabs` →
`<SegmentedTabs variant="underline">` (panel-nav, `role="tablist"`); `BouncyToggle` → `<SegmentedTabs>`
(segmented default, `role="group"`). Same `:options` + `:model-value`/`@update:model-value` API; no prop
reshape, no emit rename. Per MEMORY `feedback_glass_ui_binding_verification`: the receiver-wave MUST e2e-verify
the migrated tab RENDERS (a stale reka-ui prop silently no-ops; vue-tsc + units miss it).

## The ledger (the deliverable — the gate's E2 clause reads the DEFERRED rows)

Disposition: `MIGRATED` (discharged at a consumer SHA; the gate sees no violation) | `DEFERRED` (carries a
NON-EMPTY `{receiver-wave, close-gate}` terminal — the gate's allowlist downgrades it from RED to an
ALLOWED-WITH-TERMINAL notice). An empty terminal, or "deferred to a future tranche," is REFUSED (stays RED).

<!-- W-CONSUMER-LEDGER-MACHINE-BEGIN
Each DEFERRED row below is machine-parsed by proof-consumer-staleness.mjs. Format (pipe-delimited):
  repo | file | symbol | subpath | disposition | receiver-wave | close-gate | landed-SHA
`file` is the gate's relative path (the rel() form: ../<repo>/src/...). A DEFERRED row MUST carry a
non-empty receiver-wave AND close-gate or the gate refuses it (stays RED).
-->

| repo | file | symbol | subpath | disposition | receiver-wave | close-gate | landed-SHA |
|---|---|---|---|---|---|---|---|
| fourier-analysis/web | ../fourier-analysis/web/src/components/equation/EquationView.vue | UnderlineTabs | /tabs | DEFERRED | fourier-analysis/web I.W-TABS-MIGRATE | proof:consumer-staleness GREEN over this site | |
| fourier-analysis/web | ../fourier-analysis/web/src/components/visualization/GalleryView.vue | UnderlineTabs | /tabs | DEFERRED | fourier-analysis/web I.W-TABS-MIGRATE | proof:consumer-staleness GREEN over this site | |
| fourier-analysis/web | ../fourier-analysis/web/src/components/visualization/VisualizationView.vue | UnderlineTabs | /tabs | DEFERRED | fourier-analysis/web I.W-TABS-MIGRATE | proof:consumer-staleness GREEN over this site | |
| words/frontend | ../words/frontend/src/components/custom/search/components/controls/LookupControlsPanel.vue | BouncyToggle | /tabs | DEFERRED | words/frontend A.W-TABS-MIGRATE | proof:consumer-staleness GREEN over this site | |
| words/frontend | ../words/frontend/src/components/custom/search/components/controls/WordlistControlsPanel.vue | BouncyToggle | /tabs | DEFERRED | words/frontend A.W-TABS-MIGRATE | proof:consumer-staleness GREEN over this site | |

<!-- W-CONSUMER-LEDGER-MACHINE-END -->

## Disposition rationale

All 5 are **DEFERRED**, each with a `{receiver-wave, close-gate}` terminal naming the migration wave in the
CONSUMER's OWN tranche (NOT a glass-ui wave — inv-16; glass-ui owns the forcing-function gate, the consumer owns
the fix). The clean-break canon means the only green paths are MIGRATE (the consumer flips
`UnderlineTabs`→`SegmentedTabs variant="underline"` / `BouncyToggle`→`SegmentedTabs`) or this LEDGER-WITH-TERMINAL;
glass-ui does NOT re-introduce the deleted family.

- **fourier-analysis/web** — 3 `UnderlineTabs` sites (`equation/EquationView.vue:13`,
  `visualization/GalleryView.vue:13`, `visualization/VisualizationView.vue:27`). Receiver-wave:
  `fourier-analysis/web I.W-TABS-MIGRATE` (the fourier tranche I is the active tranche). The migration is the
  drop-in `<SegmentedTabs variant="underline">` swap + the e2e render-verify (the binding-verification memory).
- **words/frontend** — 2 `BouncyToggle` sites (`…/controls/LookupControlsPanel.vue:119`,
  `…/controls/WordlistControlsPanel.vue:156`). Receiver-wave: `words/frontend A.W-TABS-MIGRATE`. The migration is
  the drop-in `<SegmentedTabs>` (segmented default) swap + the e2e render-verify.

Why DEFERRED, not MIGRATED-in-this-wave: glass-ui's surface is FIXED (`SegmentedTabs` is the canonical receiver
at `d4c2910`); the consumer SOURCE edit + its binding-e2e-verify is the consumer-tranche wave's job (a glass-ui
build lane cannot reliably e2e-verify a cross-repo consumer render — the exact silent-no-op class
`feedback_glass_ui_binding_verification` names). The coordination doc
(`docs/tranches/AY/coordination/from-AY-W-CONSUMER-tabs-migration.md`) hands the consumer the exact drop-in
mapping so the receiver-wave is mechanical. When a receiver-wave lands its migration, its row flips to MIGRATED
(landed-SHA recorded) and the gate sees zero violation for that site — at which point the DEFERRED terminal is
discharged.

## The gate (the hard gate — §6)

`proof:consumer-staleness` flips born-RED → GREEN with the (B) deleted-symbol arm armed (dist d.ts present) and
the ledger-allowlist clause landed: every present-consumer glass-ui import either resolves against the current
surface (MIGRATED) OR matches a DEFERRED row here with a non-empty `{receiver-wave, close-gate}` terminal. The
verifying command is `npm run emit-types && npm run proof:consumer-staleness` → exit 0 with `violations: 0` +
`allowed-with-terminal: 5` (all 5 are ledger DEFERRED rows). An UN-ledgered stale import or a DEFERRED row with an
empty terminal stays RED (bite preserved). `proof:ay-final` (W-CLOSE1) resolves this ledger path for the
carry-closure clause.
