# AZ tranche — PROGRESS

The dock-redesigned-from-first-principles tranche: 24 waves over 8 bands (6 Dock, 2
Register, 2 Blob, 2 Motion, 2 Shell, 3 Design, 3 cross-repo, 4 hygiene+close), grounded in
the user's round-3 live audit (`audit/USER-AUDIT-2026-06-10-R3.md`, 15 binding items) and the
32-lane deep audit (`audit/FLEET-DIGEST.md`, 374 findings). Base **tranche/AY @ v3.10.1** (the
AY close cut, published with provenance). **NO implementation has begun — this tranche is in the
AUTHORING phase; the wave specs are the deliverable until the user greenlights (AZ invariant 2).**

The cardinal-lesson forcing function is inherited from AY: `proof:live-verified-ledger` is
tranche-parameterizable and reads the home this PROGRESS lives in. AZ.W-GATES (Batch 0) migrates
the freshness model OFF git-ancestry onto a content-hash of the declared surface files (AZ
invariant 4 — an unrelated commit to a shared file no longer re-stales every dock DELTA) and
re-persists the AY-pathed visual ledger against the AZ home. Until W-GATES lands, `proof:all`
is CRASHABLE at HEAD (the malformed `gates.mjs:689-691` row) — no downstream wave's local
`proof:all` can green.

**Binding done-definition + run order: [`EXECUTION-DAG.md`](./EXECUTION-DAG.md).** The DAG is
the source of truth for the wave SET, the 7-batch order (Batch 0 → Batch 6), the five user-domain
hinges (H1 de-red scope, H2 dock taxonomy, H3 luma observer default, H4 morph architecture, H5
the deploy creds), and the W-ADOPT early-run option. "Done" is the DAG's close-criteria GREEN
with falsifying gates, NOT a row count.

## Status legend (the reconciled vocabulary, inherited from AY; `(DEVELOPED)` stays RETIRED)

- `planned` — spec authored or not yet authored; no code landed. `planned (spec authored)` marks
  a wave whose tranche-format wave-doc exists under `waves/` (Status: SPEC) but is unbuilt. Every
  AZ wave is `planned` until the user greenlights; the authored rows are `planned (spec authored)`.
- `in-progress` — code landing.
- `dev-complete` — the device-free gates closed GREEN; no live DELTA owed (a NON-visual wave — a
  doc/gate/decision/taxonomy-rename wave that changed no pixels, OR a cross-repo gate wave whose
  effect is a deletion proof + import resolve, not a render).
- `live-pending` — the device-free gates closed GREEN but the binding on-disk `.png` DELTA capture
  is OWED (a visual wave whose code landed but whose own-surface capture has not been written), OR
  the real-device audit surfaced a CONTRADICTION (the wave RE-OPENS until the live truth is GREEN
  — the re-open rule below).
- `live-verified` — GATE-DEFINED (a fresh on-disk own-surface capture exists at ≥2 viewports ×
  {light,dark}, matched to the wave's own surface, with a π readback where the criterion is a
  measured ratio/geometry), never author-asserted. A visual wave is "done" ONLY at this state. The
  cardinal lesson: a green headless proof over a black/broken live canvas is NOT done; `complete`
  never collapses to `headless-green` (MEMORY `feedback_live_verify_capture`).
- `complete` — a non-visual wave whose device-free gates closed GREEN. A `complete` wave that
  CHANGED PIXELS adds its wave-id to the AZ visual allowlist and is then held to the SAME
  own-surface DELTA bar as `live-verified` (the gate covers `complete`, so no visual wave hides
  behind the token).

**The re-open rule (the R3 precedent that BUILT this tranche):** a real-device contradiction
re-opens a wave the close had marked `live-verified`. AY closed four bands as live-verified that
the R3 audit re-opened in person (the dock rail, the morph flicker, the dock-over-light
illegibility, the blob page). A row that re-opens drops from `live-verified` back to `live-pending`
and names the mechanism finding (AZ invariant 3: re-opened ≠ rebuilt-blind — the lane starts from
the fleet's root-cause, never a fresh diagnosis).

**The DELTA-owed contract:** every `live-pending` row owes a captured before/after `.png` to the
AZ visual home before it can flip to `live-verified`; an allowlisted `complete` row owes the same
own-surface light+dark capture. The capture IS the close criterion. The visual home + the
`proof:live-verified-ledger:az` parameterization are stood up by AZ.W-GATES (Batch 0).

## The wave board (24 roster waves; run order is `EXECUTION-DAG.md §3`, NOT alphabetical)

The Status column reflects each wave's reconciled state. The Grounding column carries the
FLEET-DIGEST finding ids + the R3 user item the wave closes; the Batch column is the
EXECUTION-DAG position. The AZ waves are NET-NEW relative to a build — the board fills as waves
roster-named here but un-authored; the authoring phase is INCOMPLETE until each gains a spec.

| Wave | Band | Grounding (finding ids · R3 item) | Batch | Status |
|---|---|---|---|---|
| W-GATES | Z | B5-1 (the malformed `gates.mjs:689-691` crash), F3-4, B5-2/3/4/5 (route/port/shader-split/freshness), D7 (font-cascade-live moved-token-file false RED — AY-§3 residual, not in FLEET) | 0 | dev-complete — D1-D7 discharged: the malformed-row crash GONE, parity pre-pass hardened born-RED, the :5173→:5199 sweep zeroed (4 scripts + playwright config), /dock/layers re-point, the blob shader-split gates wired+GREEN, the content-hash freshness model live (3 AY DELTAs re-stamped FRESH), the :az ledger arm + AZ allowlist minted, R6 re-persisted; proof:gate-manifest-sound authored born-RED; clause-3 bash-3.2 local env limitation recorded (greens on CI) |
| W-DOCK-RAIL | D | C1-R3-1-indicator-glass-plate, C1-R3-1-rail-fused-gutter, F2-R3-1, D6-1, A1-1 · R3-1 | 1 | planned (spec authored) |
| W-DOCK-FLICKER | D | C2-1/C2-2 (mechanism), C2-7, D5-7 (S1), F2-R3-3 (refuted-as-literal) · R3-3 | 1 | planned (spec authored) |
| W-ADAPTIVE-AUTO | R | C5-2..C5-10, B3-1/B3-2, E3G-4, F2-R3-7, A5-1 (modal-scrim double-wrap, Arm-3 sweep) · R3-7 [H3] | 1 | planned (spec authored) |
| W-REGISTER-IOS | R | C4-hover-register, D6-2, D3-2 · R3-6 [H1] | 1 | planned (spec authored) |
| W-DOCK-TAXONOMY | D | C1-R3-2-taxonomy-overload, E2-3, E3G-2, C1-dock-api-inventory · R3-2 [H2] | 2 | planned (spec authored) |
| W-RAIL-EXTEND | D | E3G-1 (net-new GAP S1), C1-R3-2-hairline-rail-netnew · R3-2 | 2 | planned (spec authored) |
| W-DOCK-NORMALIZE | D | C3-DOCK-CENSUS-SHELL, C3-NORMALIZATION-SCOPE (the 26-dock census) · R3-5 | 2 | planned (spec authored) |
| W-DOCK-CONTEXT | D | E3G-7 (absent contextual facility), C1-R3-14-contextual-layers-absent, E3-gaps · R3-14 | 2 | planned (spec authored) |
| W-BLOB-PAGE | B | C6-1/F2-R3-9-pixelation (REFUTED — GL crisp), C6-2, C6-3, C6-4 · R3-9 | 3 | planned (spec authored) |
| W-BLOB-STUDIO | B | C6-5, C6-6, C6-7, C6-8, C6-10, B1-W-BLOB-GLASS (folded) · R3-10 | 3 | planned (spec authored) |
| W-MOTION-SUITE | M | B4-1/B4-2/B4-3/B4-4, C7-2/C7-3, D5-4, E1-7/C7-5 (ppmycota demo-local) · R3-11 | 3 | planned (spec authored) |
| W-SHELL-CONFIG | S | C3-GEAR-WIRING, C3-GEAR-MISSING-AXES, C3-DARKTOGGLE-PLACEMENTS, C3-COMPOSABLES-VIEW, E1-10 · R3-4 | 3 | planned (spec authored) |
| W-SHELL-IDENTITY | S | C8-R3-12-a (MEASURED), C8-R3-15-b (ink-mass offset MEASURED), C1-R3-12-foundations-logo-corroborate, F2 · R3-12, R3-15 | 3 | planned (spec authored) |
| W-MORPH-SHOWCASE | M | C8-R3-13-engine/-goo/-w42/-archA/B/C, C1-R3-13-axis-morph-absent, E3G-3, B1-W-LIQUID (folded) · R3-13 [H4] | 4 | planned (spec authored) |
| W-HIERARCHY | G | D1-1..D1-10 (7 findings headline), D6-3 · R3-8 | 4 | planned (spec authored) |
| W-SUFFUSE | G | D2-typography, D3-color-pop, D4-glass/grid/math thin-spots | 4 | planned (spec authored) |
| W-METRIC-UNIFY | G | E2-1, E2-3 (the `amount \|\| placeholder` zero-value bug; ConfiguratorRow vs LabeledField) | 4 | planned (spec authored) |
| W-CARVE | Z | the chronic central-CSS rows (dock-controls.css 636, theme.css 530; the 2 ratchet rows) | 5 | planned |
| W-PRUNE2 | Z | E4 (4 candidates incl. status-dot 1-consumer), B1 books (W-AUR-T5 Kuwahara, W-LIGHTHOUSE) | 5 | planned |
| W-KF-CONSUMER | X | B4-5 (S1 — the phantom `/header-ribbon` + `/glass-panel` subpaths), B4-7 (pin census) | 5 | planned (spec authored) |
| W-CLOSE | Z | the AY close pattern (overfitting audit, FINAL.md, `proof:az-final`, budget rebaseline) | 6 | planned |
| W-ADOPT | X | A4L-11 (un-started S1), A4L-13 (the exact enumeration), B4-7 (pin → 3.10.1) | 6 (or 0) | planned (spec authored) |
| W-DEPLOY | X | the standing slides.friday.institute requirement; A4L-2/A4L-12 (8 served slides) · H5 | 6 | planned (spec authored) |

### Authoring-phase status (LOUD)

**All 24 roster waves carry an authored `waves/AZ.W-*.md` spec** (the Band-Z trio —
W-CARVE/W-PRUNE2/W-CLOSE — was authored by the orchestrator after the fanout lane hit the
session wall; same binding format).

(The Band-G trio — `AZ.W-HIERARCHY.md`, `AZ.W-SUFFUSE.md`, `AZ.W-METRIC-UNIFY.md` — and the
cross-repo `AZ.W-KF-CONSUMER.md` are now AUTHORED; this board reflects the dir at the time of
writing.)

The authoring phase is INCOMPLETE until these 3 Band-Z specs land in tranche format (header with
track/type/depends/status SPEC; §0 RE-GROUND with the re-grep mandate; the file:line defect table;
goal + completion criteria; the born-RED gate spec; a scope fence; named successors). W-CLOSE's
`proof:az-final` is the terminal gate and W-CARVE's ratchet-drain is its precondition; neither can
dispatch without a spec, and the close cannot run before both are authored AND landed.

## Hinge ledger (answer before or at the named batch)

| id | decision | gates batch | status |
|---|---|---|---|
| H1 | how far the de-red goes (R3-6 vs the prior warm-red-selected decision) — recommend (a) red retires from ALL state registers | Batch 1 (W-REGISTER-IOS) | OPEN |
| H2 | the dock taxonomy naming (R3-2) — recommend (a) ONE `GlassDock` + ONE `orientation` axis | Batch 2 (W-DOCK-TAXONOMY) | OPEN |
| H3 | the automatic luma observer default (R3-7) — recommend (a) default-ON for the dock family | Batch 1 (W-ADAPTIVE-AUTO) | OPEN |
| H4 | the V↔H morph architecture (R3-13) — recommend (a) the metaball-bridge | Batch 4 (W-MORPH-SHOWCASE) | OPEN |
| H5 | `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` in the env at the deploy hinge | Batch 6 (W-DEPLOY) | OPEN |

Each authored hinge-gated wave specs BOTH arms (the recommendation first); the impl agent does not
pick — the orchestrator carries the user's decision into dispatch.

## Scope fences (carried from AZ.md)

- NO slides `docs/tranches/M/**` edits (foreign session owns it).
- The GL blob renderer + the aurora painterly pipeline are NOT re-opened (refuted/closed) — only
  the named surfaces (watercolor swatches, satellites-config, studio chrome) are in scope.
- The `in srgb` surface-tint family, the `cn()` deduplicator, and the `.focus-ring` divergences
  remain deliberate keeps (AW.W26) — no "fixes."
- ppmycota purple never enters library tokens (E1-7) — it is a DEMO-LOCAL accent only; the motion
  family's library purple anchor is the existing `--viz-legendre`.
- `:5173` is never a default anywhere after W-GATES (the `:5199` convention sweep).
