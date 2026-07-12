# BI.W-VIZ-DELETIONS — delete dot-flow-field / concentric / dot-matrix (the breaking MAJOR cut)

Band B5 (substrates). The three condemned vizzes + their gates + stories + exports + subpath barrels +
consumer-evidence reconciles — a BREAKING export change routed into the 5.0.0 MAJOR cut (STRUCT-2).

## §Mandate

Discharges (registry rows this wave OWNS):
- **UF-E8** — "Dot flow field, concentric, dot matrix—all to be deleted. You've failed 30+ attempts to
  implement these." (components + stories + gates).
- **STRUCT-2 [P0]** — viz-deletions are BREAKING export changes → belong in the MAJOR cut, NOT the
  "zero-churn 5.1.0" flatten. **STRUCT-14** — the dot-flow delete REVERSES BG.W-DOTFLOW-REBUILD; liquid-grid
  is a KEEPER (not deleted). **STRUCT-3** — the stale count (viz 9→6). **STRUCT-9/10** — orphaned viz gates +
  the PROCEDURAL-SUITE reconcile.

## §Design

Decided mechanism — FIXED (D-VIZ PASS-1 §0, not relitigated): the three are DELETED. Their
`usePointerVelocityField` consumption retires WITH them; the surviving field-consumer compat set is aurora +
goo-blob + fourier-field + constellation + liquid-grid (`useLiquidGrid`) + `(useDockFission — RETIRED by BI.W-DOCK-RETIRES, not a surviving consumer)`. Clean break,
no alias — the symmetric-closure discipline (a broken-reference half-delete REDs the same as a stub).

- **DELETE the three component dirs, stories, subpath barrels, and package.json exports** (breaking — the
  MAJOR cut carries it; paper-grid/goo-dot-matrix drops were zero-consumer per XR, and these three have zero
  binary consumers too — safe on the sibling census).
- **Orphan the ~5 gates:** `proof:concentric`, `proof:dot-matrix`, `proof:viz-dotflow`, `proof:flow-field`
  (the dot-flow-field colocation gate) — remove from `package.json` + the `gates.mjs` registry (all four are
  local/ci-tagged single-viz gates). The aggregate `proof:viz` re-points off the deleted viz rows.
- **Reconcile the shared-chunk consumer evidence** (the ≥N-consumer bars re-base, no false-green):
  - `docs/consumer-evidence/curl-fbm.md` — DROP consumer #3 (the flow-field viz). Remaining LIVE: #1
    aurora-curl-warp + #2 paper-grid → the bar re-bases to the ≥2 `procedural-color.glsl.ts` shared-chunk
    precedent (curlFBM KEEPS; `flow.glsl.ts`/`flow.wgsl.ts` stay — paper-grid consumes them).
  - `docs/consumer-evidence/use-pointer-velocity-field.md` — drop the dot-flow-field/concentric booked
    binary consumers; the ≥2 bar re-bases onto the surviving live consumers (the field-core wiring under
    W-FIELD-CORE is the real consumer set).
  - `docs/consumer-evidence/use-gpu-substrate.md` — drop the dot-flow-field parity row; the ≥2 bar re-bases
    onto aurora + blob (+ paper-grid) WGSL; `proof:gpu-substrate-single` drops the dot-flow-field parity
    table row.
- **PROCEDURAL-SUITE.md reconcile** (STRUCT-10): the suite doc (7 members) drops the 3 deleted members → the
  4 survivors (aurora · goo-blob · fourier-field · paper-grid) + constellation; the per-viz migration verdict
  updated.
- **MIGRATION.md** — a row for the 3 dropped subpaths (the honest clean-break record; zero binary
  consumers, so no consumer relay ask is owed — a no-op-for-consumers record, not a silent prune).

## §Work

- DELETE `src/components/custom/{dot-flow-field,concentric,dot-matrix}/` (the whole dirs — components,
  composables, shaders, stories, constants, README).
- DELETE `src/subpaths/{dot-flow-field,concentric,dot-matrix}.ts` (the mirror barrels).
- `package.json` — remove the `./concentric` / `./dot-flow-field` / `./dot-matrix` exports +
  `typesVersions` entries; remove `proof:concentric`/`proof:dot-matrix`/`proof:viz-dotflow`/`proof:flow-field`
  from `scripts`.
- `scripts/gates.mjs` — de-register the four gate rows.
- DELETE `demo/stories/substrates/{dot-flow-field,concentric,dot-matrix}.vue`; remove their rows from
  `demo/stories/manifest.ts` (+ the /substrates index tiles they seeded — coordinate with the B6 story band's
  UF-E9 real-preview rebuild so the index does not 404 a folded member).
- DELETE the gate scripts (`scripts/proof-concentric.mjs`, `proof-dot-matrix.mjs`, `proof-viz-dotflow.mjs`,
  `proof-flow-field.mjs`) + their `tests-visual/*.spec.ts` (if enrolled, drop from the pi-runner manifest).
- `docs/consumer-evidence/{curl-fbm.md,use-pointer-velocity-field.md,use-gpu-substrate.md}` — the re-base
  reconciles above.
- `src/components/custom/PROCEDURAL-SUITE.md` — the 3-member drop.
- `scripts/proof-gpu-substrate-single.mjs` (+ `docs/tranches/**/gpu-parity-table.md`) — drop the
  dot-flow-field parity row.
- `MIGRATION.md` — the 3-subpath drop row.
- `scripts/proof-viz.mjs` — re-point the aggregate off the deleted rows; update the hardcoded viz count.

## §Acceptance

Gate: **`proof:viz-deletions`** (NEW; census gate, `["local","ci"]`) + the surviving family gates stay
GREEN by construction.
Born-RED at HEAD: the 3 dirs + 3 exports + 3 subpath barrels + 3 stories + 4 gate rows all present. GREEN
here.
- V1 — `src/components/custom/{dot-flow-field,concentric,dot-matrix}/` DEFINITION-ABSENT; the 3 subpath
  barrels absent; the 3 package exports absent.
- V2 — the 4 gate rows de-registered (no dangling `proof:concentric`/`proof:dot-matrix`/`proof:viz-dotflow`/
  `proof:flow-field` in package.json/gates.mjs); the gate scripts deleted.
- V3 — the 3 stories + manifest rows absent; no route resolves to a deleted viz.
- V4 — the consumer-evidence re-bases hold: curlFBM ≥2 (aurora + paper-grid), pointer-velocity ≥2,
  use-gpu-substrate ≥2 — NO false-green orphan (a shared chunk retaining a deleted consumer REDs).
- V5 — PROCEDURAL-SUITE.md + the viz count + MIGRATION.md reconciled (no stale 9-member/9-viz claim).
- Self-test bite: a planted re-mint of any deleted viz dir REDs; a planted dangling gate row REDs; a planted
  curl-fbm.md retaining the flow-field consumer REDs.

## §π/DELTA

No new visual capture — a deletion changes ZERO paint on the surviving surfaces. The proof is the census gate
+ the surviving family gates (`proof:viz-aurora`/`proof:blob-*`/`proof:viz-constellation`/`proof:viz-papergrid`/
`proof:fourier-field`) staying GREEN + `proof:no-dual-path` (no orphaned half-delete) + the build exit-0 with
93→90 export targets resolving.

## §Obligations

- **The MAJOR-cut routing (STRUCT-2):** this wave's breaking export changes bind to the 5.0.0 cut, NOT the
  5.1.0 flatten — the structure spine (B9) census runs POST-deletion. The 5.0.0 tag stays USER-GATED.
- No cross-repo ask (zero binary consumers on the 3 subpaths — the sibling census confirms; a no-op-for-
  consumers MIGRATION record, not a silent prune, per invariant-11).
- **Coordinate with W-FIELD-CORE** (the surviving pointer-velocity consumer set) + **the B6 story band**
  (UF-E9 /substrates index real-preview rebuild must not tile the deleted members).

## §Dispositions

- **STRUCT-14 (dot-flow REVERSES BG.W-DOTFLOW-REBUILD):** DECIDED — the 30+-attempt viz family is RETIRED,
  not re-attempted; a future streamline need re-enters through a NEW honest trigger, never a re-open of the
  deleted register. Terminal.
- **liquid-grid is a KEEPER** (STRUCT-14) — NOT in the delete set; `useLiquidGrid` stays a live
  pointer-velocity consumer. Recorded.
- **cmd:wgsl-flow-tail** (CHRONIC — flow.wgsl.ts) stays MET (shared chunk landed; paper-grid consumes it);
  the concentric consumer drop does not un-MET it (paper-grid + the flow-field-arm survivors hold). No
  re-book.
