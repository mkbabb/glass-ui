<!-- BB.W-DEAD-SWEEP ARM .2 — the gate-fleet reconcile + the ExpandableContainer
     always-teleport redress. The styles half (the dead-token sweep + proof:no-dead-token
     + the dist before/after grep) is ARM .1's W-DEAD-SWEEP-DELTA.md; the orchestrator
     merges this gate-fleet+π half on registration. -->

# W-DEAD-SWEEP — gate-fleet reconcile + ExpandableContainer redress (ARM .2)

Freshness: captured at HEAD `9b64d014` (BB Batch 1; branch `tranche/BB`), 2026-06-16.
The gate-fleet edits change ZERO paint — their binding truth is the born-RED→GREEN gate
logs + the orphan-drain reconcile, recorded below. The ExpandableContainer redress IS
paint-bearing — its binding truth is the π (`tests-visual/expandable-container.spec.ts`),
owed to the visual-π runner (W-VISUAL-RUNNER) / W-REFLECT3 capture.

## 1 — The 3 AW orphan-gate verdict (KNOWN_ORPHANS drained to ∅)

Each AW orphan re-grounded at HEAD; each asserts a LIVE invariant over a still-shipping
surface → REGISTERED + tagged (no deletion). `KNOWN_ORPHANS` → `new Map([])`.

| orphan script | wave | invariant at HEAD | run | verdict |
|---|---|---|---|---|
| `proof-affordance-contrast.mjs` | AW.W13 | gold-CTA calm / input-select border lifted / slider fill lifted / goo-blob var() resolved — all live in the surface | device-free, PASS | REGISTER `proof:affordance-contrast`, tag `ci` |
| `proof-datatable-split.mjs` | AW.W14 | DataTable.vue ≤380 lines (376) + the 2 colocated composables present + consumed | device-free, PASS | REGISTER `proof:datatable-split`, tag `ci` |
| `proof-dock-big-dock.mjs` | AW.W3b | the `shape="card"`/`layout="grid"` big-dock behavioral surface (live in `demo/stories/dock/overview.vue`) | device-π, SKIPs clean when demo absent | REGISTER `proof:dock-big-dock`, tag `local` |

`scripts/proof-gate-script-parity.mjs` `KNOWN_ORPHANS` drained to `new Map([])`. The gate
reds with 3 NEW orphans UNTIL the orchestrator registers the 3 keys (the disjoint-merge
interim — the AZ.W-CARVE2 idiom); GREEN after the merge.

## 2 — The 24 registered-but-unmanifested gates (tag-or-remove)

23 tagged into an aggregate, 1 removed (superseded). After the orchestrator merge,
`proof:gate-manifest-sound` clause-10 `facts.unmanifestedGates === []`.

### LOCAL (device-π / Playwright; the live-π set CI does not run headless)

`proof:dock-items-lag-capture` · `proof:dock-clip-reveal` · `proof:dock-layering-polish`
· `proof:demo-dock-nav-runtime` · `proof:blob-render` · `proof:blob-integration` ·
`proof:constellation-warp-live` · `proof:constellation-refit-live` ·
`proof:blob-warm-default` — all Playwright drivers. `proof:dock-items-lag-capture` is
fail-CLOSED when the demo origin is unreachable (the orchestrator's `local` run has the
`:5199` demo up). `proof:blob-render` + `proof:blob-warm-default` are BORN-RED at HEAD
(the default `<GooBlob>` paints a dark/flat slab with an unbounded orbit — the blob
default is genuinely broken; the flip is owed to the blob-default redress, NOT in BB).
Reported in gatesBornRed; tagged `local` (the born-RED `local` precedent — BB.W-SPINE-
CONSTELLATION — ledger-backstopped, never in the CI/release blocking set).

### CI (device-free source / math / static)

`proof:dock-lockstep-bornred` (the device-free born-RED witness — exits 0 when correctly
detecting a synthetic lag) · `proof:motion-suite` · `proof:blob-smin-normalized` ·
`proof:blob-gradient-unit-length` · `proof:blob-spec-premult` · `proof:blob-mood-resolved`
· `proof:aurora-arresting-ref` (a pngjs metric harness over a static fixture — no GPU) ·
`proof:constellation-tokens` · `proof:glass-material-unified` · `proof:glass-material-sota`
· `proof:reka-binding-idiom` · `proof:design-md-current` · `proof:naming-consistency` —
all run device-free, exit 0 at HEAD (verified under `CI=true`).

### RELEASE (publication peer-range conformance)

`proof:peer-conformance` — offline-safe registry `npm view` peer-range conformance
(falls back to the pinned audited latest; the publication-time gate). Tag `release`.

### REMOVE (superseded — clean break, no alias)

`proof:primitive-affordance` (AW.W25) — its load-bearing clauses 6+7 (`Toast must compose
glass-floating` + `Toast paints --success/--warning/--info`) assert over the RETIRED
AW.W25 opaque-slab Toast surface that BA.W-FEEDBACK-TONE INVERTED (Toast now reads as
COLORED GLASS via `.feedback-tone`, no `bg-<tone>` plate, no direct `--<tone>` token
paint). The gate FAILS at HEAD (exit 1) on exactly those stale clauses; the live
Toast-as-glass invariant moved to `proof:glass-cohesion`'s feedback-tone arm + the
press-spring/focus-ring/form-radius clauses are redundantly covered by
`proof:animation-coherence` + `proof:glass-cohesion`. Script `scripts/proof-primitive-
affordance.mjs` DELETED; the orchestrator removes the package.json key.

## 3 — The :5175 residue strip + the clause-4 bare-port widen

- The stale `:5175` prose stripped from `scripts/proof-gate-manifest-sound.mjs` header
  (`:25-31`) + the clause-4 scope comment (re-anchored: "the live-demo origin is
  uniformly :5199; the bare-port blind spot closed at BB.W-DEAD-SWEEP"). The
  `gates.mjs:1278` note re-anchor is an orchestrator sharedFileRequest (gates.mjs is hot).
- **Clause 4 widened.** The BA widen's URL-string-only `NULLISH_DEFAULT_PORT` regex
  (a snapshot-census scope, not a structural guarantee) gains a SECOND arm:
  `BARE_PORT_DEFAULT = /\?\?\s*(\d{4,5})\b/g`. A bare-port `?? <port>` default flags
  UNLESS it is `:5199` or on the recorded `SERVICE_PORT_ALLOWLIST` (`9337` Chrome
  DevTools remote-debug + `9347` profile twin — a finite Map WITH per-port rationale,
  NOT fail-open). A future `GLASS_UI_DEMO_URL ?? 5175` bare-port default now reds.
- **Clause-4 self-test (the bite the BA URL-string-only regex could not demonstrate).**
  A synthetic `?? 5175` MUST flag (Arm 2) AND `?? 9337`/`?? 9347` MUST stay GREEN; the
  gate's own file is EXCLUDED from `liveGateScripts()` (it is the detector, carrying the
  self-test fixture literals). Verified: `bare-port-5175-red ✓ | service-port-green ✓`.

## 4 — proof:gate-manifested (NEW clause 10, homed in proof-gate-manifest-sound.mjs)

Every package.json `proof:*` key resolves to a `gatesFor()` manifest row (any tag, incl.
the empty-tag historical-close rows) OR is on the recorded `COMPOSITE_OR_RUNNER`
allowlist (`proof:all`, `proof:full`, the 5 `proof:live-verified-ledger:{ax,ay,az,ba,bb}`
sub-keys — each carrying a NON-EMPTY rationale). A key with a live script but no row +
no allowlist entry is manifest dark matter → RED.

**The two anti-evasion bites (self-tested, load-bearing):** a synthetic unmanifested
`proof:*` key reds; a bare-rationale `COMPOSITE_OR_RUNNER` allowlist entry reds. Both
verified firing (`SELF-TEST FAILED` count: 0).

## 5 — ExpandableContainer always-teleport redress

`src/components/custom/expandable-container/ExpandableContainer.vue` — the unconditional
`<Teleport to="body">` gated `:disabled="!open"` (the Vue idiom: a disabled Teleport
renders its children IN PLACE, not to body). The inline (`!open`) state mounts NO body
anchor (the inner `v-if="open"` is false AND nothing renders in place); only fullscreen
teleports. The inline `<div v-if="!open">` branch + `<slot :fullscreen="false"/>` (the
real canvas) is UNTOUCHED; the BA.W-SURFACE-AXIS `:data-surface` + `glass-overlay`
decoration is PRESERVED. The `open`-driven `syncBodyOverflowLock` watcher is ORTHOGONAL
(it fires on the `open` state, never on the teleport mount), so the lock ordering is
intact (the Triumvirate-Dispatch case-4 lock-vs-teleport interaction does not bite).

**The binding π** (`tests-visual/expandable-container.spec.ts`, auto-enrolled in the
visual-π runner): (a) inline renders REAL canvas (a non-zero painted box) + NO fixed
`.glass-overlay` on `document.body` (the always-teleport blank-canvas residual gone);
(b) after the Maximize2 trigger fires the overlay teleports as exactly ONE direct body
child AND frosts over content (`glass-overlay` background alpha < 1, the un-walled
plate). Both modes, ≥2 viewports, fail-CLOSED. Owed to the runner / W-REFLECT3 capture.

## Disjoint-merge interim (the orchestrator-owned final merge)

At HEAD-of-this-arm (before the orchestrator's package.json/gates.mjs merge) BOTH parity
gates RED by construction (the disjoint-merge contract): `proof:gate-script-parity` reds
on 3 NEW orphans (the 3 AW scripts await registration) + 1 NEW dangling
(`proof:primitive-affordance` key awaits removal); `proof:gate-manifest-sound` clause-10
reds on 24 unmanifested (await tagging/removal). The code edits + the orchestrator
registration = GREEN. Verified at this arm: clause-4 OK, clause-4b/clause-10 self-tests
load-bearing, the SERVICE_PORT_ALLOWLIST + COMPOSITE_OR_RUNNER recorded with rationale.
