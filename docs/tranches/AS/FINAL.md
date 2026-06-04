# AS — FINAL

**Tranche AS is CLOSED.** glass-ui made its *verification substrate* statically
sound (inv-θ), took the modern-web leverage AR specified but never ran
(re-derived against HEAD), passed a visual/design correctness review (13
reported defects), closed the gate-RED publish floor the W0b deep audit found,
and shipped it all as the **3.2.0** minor through the repaired release pipeline
with npm provenance — the end-to-end proof the #177 CI repair works.

## The headline — inv-θ

AR made a *component's* platform binding statically sound (`proof:vt-names`,
inv-η). AS is its dual one level up: the *gate fleet* is now a pure,
sibling-portable function of source + tooling.

- One `scripts/constellation.mjs` — a single PUBLISHERS/CONSUMERS membership
  list + a `resolveSibling` policy encoding the registry-default world —
  collapses the five hardcoded constellation copies (and the
  `bbnf-buddy`↔`bbnf-lang/playground` drift) and the three ad-hoc
  absent-sibling encodings into one.
- One `scripts/gates.mjs` manifest tagged `{local, ci, release, sibling}` from
  which `proof:all`, the `ci.yml` matrix, and `release.{sh,yml}` are *filters*
  — local == ci == release, structurally. `gates:verify-ci` fails closed on
  ci.yml drift (now 14 ci gates).
- Gate output routes to a gitignored `.cache/gates/` with `generatedAt`
  dropped — a gate run leaves `git status` clean (no tracked-state side effect).
- A lockfile re-drift guard (`proof:lockfile`) so a stray sibling re-link
  cannot re-poison `package-lock.json`.
- `proof:vt-names` hardened to its claim (the four evasion vectors + a per-mint
  dataflow trace) and — AS.W2b R5 — now carries a committed 10-fixture vitest
  spec, so the gate that makes inv-η structural is itself guarded.

## Success criteria — met

- **Gate-integrity class closed (W2).** Zero re-listed constellation copies;
  `git status` clean after a gate run; `release.{sh,yml}` run the binding-
  correctness floor; `proof:vt-names` covers the four vectors + dataflow. `d2d1d0b`.
- **`proof:vt-names` hardened + tested (W2 + W2b R5).** `8c0cced`, `fef1b8e`.
- **The leverage, re-derived against HEAD (W3/W4/W5).** G4 `scheduler.postTask`
  on `/motion-core` (`usePrioritizedTask`/`postTaskSafe`, reduced-motion carve,
  `MessageChannel` + `AbortSignal` fallback); G1 density `@container
  style(--density)` over the kept `[data-density]` base; G2 `@container
  scroll-state(scrollable)` retiring the overflow-fade listener; the AS-GU
  bundle at the ≥2 bar with no double-mint. `8c0cced`.
- **Visual/design correctness (W7).** 13 reported defects fixed across a
  three-wave audit → frontend-design → harden cycle; the harden wave caught a
  silent-no-op dock binding. `96858c8`, `00bd5f9`. `deriveAurora` ships (the
  user's D10b ask is the ≥2 witness).
- **The publish floor (W2b + follow-up).** R1 externalize value.js (aurora
  47.7 → 16.8 KiB); R2 strip the 68 `development` keys (proof:resolution
  glass-ui-clean); R3 the P9 `--spacing` base + `proof:components-css` gate;
  R4 useTextHighlight multiplex; R6 signal merge + the G1 style-probe; **R7
  keyframes peer `^2.2.0 || ^3.0.0`** (keyframes 3.0.0 is the published latest;
  validated). `8114bba`, `fef1b8e`, `5e2f055`.
- **Gates green + the fold (W6).** Overfitting audit clean (18/18, zero
  orphans); the gates.mjs-derived matrix green on glass-ui's own surface; the
  **3.2.0** minor published through the repaired `release.yml` on a clean-runner
  tag with provenance. `audit/W6-close.md`.

## Wave ledger

| Wave | Phase | Status | Commit |
|---|---|---|---|
| AS.W0 | DEV — 6-lens audit | DONE | (audit files) |
| AS.W1 | DEV — design slices (boundary) | DONE | AS.md |
| AS.W2 | IMPL — gate-integrity (inv-θ) | DONE | `d2d1d0b` |
| AS.W3 | IMPL — G4 postTask | DONE | `8c0cced` |
| AS.W4 | IMPL — G1/G2 container queries | DONE | `8c0cced` |
| AS.W5 | IMPL — AS-GU re-derived | DONE | `8c0cced` |
| AS.W7 | IMPL — visual/design correctness | DONE | `96858c8`, `00bd5f9` |
| AS.W2b | IMPL — gate-fix floor + follow-up | DONE | `8114bba`, `fef1b8e`, `5e2f055` |
| AS.W6 | IMPL — close + 3.2.0 publish | DONE | `ba0a117` (close) + `9031972` (proof:package sequenced-run fix — the tagged/published commit) → tag `v3.2.0` (`8903d9d`) → release run `26964913257` |

## Cross-repo posture (inv-16 / inv-27)

AS is glass-ui-internal. Every cross-repo item is NAME-FORWARD — AS records,
does not absorb. The residual local gate REDs are all sibling/handoff
conditions, CI-green when the siblings are absent:

- **value.js K.W2.5** — reverts its own `development` export key in lockstep
  with glass-ui R2 (the coordinated contract-v2 strip). Until it lands,
  `proof:resolution` is sibling-RED on value.js locally.
- **bbnf-lang/playground** — the dist-alias fossil (a `proof:resolution`
  consumer flag).
- **fourier-analysis Q.W4 Lane F** — an un-applied phantom-class patch (a
  `proof:phantom-classes` pending handoff).
- **keyframes 3.0.0** — published latest; glass-ui's peer now accepts it (R7),
  unblocking the cohort (value.js K.W4 wants keyframes 3.0.0 + glass-ui 3.2.0).

The 3.2.0 tag's `release.yml` run on the clean runner (siblings absent) is the
binding green per inv-27 — **release run `26964913257`** (Node-24, the full
`gates.mjs --run release` filter, `npm publish --provenance` → SLSA
`provenance/v1`; companion `ci` run `26964815843`). It is the keystone the
constellation waits on. The published tarball's `dist/` bytes are sha256-identical
to local dist (post-publish verification, 2026-06-04).

## Cohort handoff — the glass-ui-owned asks, satisfied at HEAD

Every glass-ui-owned ask the cohort's `K.W4` adoption bundle names is verified
present in the published 3.2.0 build (not just at HEAD), so the cohort resolves
them from the registry:

- **dock-vt-name** — `GlassDock.vue:137` mints `glass-dock-${useId()}` (+
  `DockLayerGroup.vue:69`); the prior setup-local counter is gone. Clears
  fourier's e2e duplicate-`view-transition-name` red. `proof:vt-names` enforces
  it statically.
- **a11y inert** — `ConfiguratorLayer.vue:144` `:inert="!internalOpen || undefined"`
  on the collapsed `role="region"` body — closes the axe `aria-hidden-focus`
  serious violation.
- **asideSide (A-3, P0/keystone)** — `Configurator.vue:85/101/162` — the
  controls-side flip via grid-column placement + border-side swap, no DOM
  reorder (no a11y regression). Plus `asideWidth`, `scrollMode`, `density`.
- **P5 — close-as-designed.** Rounding is owned at the container-root clip
  (`Configurator.vue:130` `rounded-panel ... overflow-hidden`); inner sections
  keep straight `border-b` dividers. `779fed7` deliberately reverted the
  per-section `rounded-panel` (b6d6cf4) after adversarial verification found it
  geometrically inert and divider-deforming. The fourier ledger's "not satisfied
  until inner sections round" is a misdiagnosis; the user CANON ("rounded at the
  root") IS satisfied. See `audit/visual/W-cmp-configurator.md`.
- **useTextHighlight (R4)** — multi-instance multiplexing (shared-name range
  union), tested, on the root barrel.
- **cascade-gui** — `package-lock.json` resolves `@mkbabb/*` from the registry
  (no `file:` links).

Sibling adoption is each sibling's own arm (inv-16, NOT glass-ui's to execute):
fourier `K.W4` (bump `^3.1.0→^3.2.0`, regen lock, un-`test.fixme` the two a11y
keystones, retire the dock-vt-name console bridge, wire `asideSide`/`useTextHighlight`
into `J.W5`); value.js WC (its own `development`-key strip `K.W2.5` — still
pending — + optionally migrate off the `file:../glass-ui` link to `^3.2.0`).

## Named-forward / terminal (carried, not opened here)

G3 cross-document VT (demo-or-named-forward); G5/G6/G8/`text-box-trim`
(Baseline/consumer-gated); the demo-gated pilots (graduate at Baseline Widely);
the watched conditions (inline-edit, dock panel-host, shadcn-parity —
convergence-gated, lean REJECT on shadcn-parity); value.js VAL-9 (terminal
kill). No AS successor is opened.

**The control-pane polish asks (fourier 2026-06-04 control-pane audit, booked
into fourier `K.W4`) — name-forward to a glass-ui successor (AT), NOT 3.2.0.**
Both are net-new single-component P2 polish: they fail the ≥1-release-boundary
test for opening a tranche now and lack a ≥2-consumer witness (fourier #1 + a
glass-ui demo story #2 would be greenfield-in-AT). They are NOT cohort blockers
— fourier's H1-H10 consume the already-shipping 3.1.0 primitives.

- **A-1 — `ConfiguratorLayer`/`ConfiguratorRow` machined-groove inter-row
  divider opt-in.** Today: a flat `border-b border-border/40` (`ConfiguratorLayer.vue:100`).
  AT: a token-first opt-in (a `Configurator` panel `data-attr`) porting the
  `.instrument-rail` twin-line groove (`instrument-rail.css`, catch-light over
  under-shadow, dark-aware) onto the configurator chassis, reusing
  `--surface-tint-*`. CSS budget fits (~174-246 gzip vs the `/styles` headroom),
  but `index.css` is at 99.5% — a conscious budget rebase is the AT precondition.
- **A-2 — `label`/`sub` bound to the typography ladder at the component root.**
  Today: magic literals `text-sm font-semibold` + `text-micro font-mono`
  (`ConfiguratorLayer.vue:118/121`). AT: a class swap to the ladder rungs (≈0 net
  CSS — the rungs ship). Flag: it restyles EVERY configurator label across all
  consumers, so it needs visual verification.

**Two HEAD findings the post-publish audit surfaced — AT, not 3.2.1:**

- **DataTable vueuse root-barrel re-export (Design-Axis-6 nuance).** `src/index.ts:104`
  re-exports `data-table`, and `DataTable.vue:3` imports `useElementSize` from
  `@vueuse/core` — so a vueuse symbol is reachable through the SOURCE root barrel.
  Pre-existing since `1c6c3e5` (v1.8.x), NOT an AS regression. Build-split
  mitigates the common case (`dist/glass-ui.js` has 0 `useElementSize` static
  refs — DataTable is a lazy chunk), so it is not a bundle defect for a
  tree-shaking consumer. AT: make `data-table` subpath-only (the `/data-table`
  subpath exists) OR swap to the in-house `useResizeObserver`. **Gate gap:** no
  proof enforces vueuse-free-root-barrel — `proof:package` is a resolution/type
  probe, not an `@vueuse`-reachability import-graph trace. AT should add a
  static-import-graph gate that fails closed on `@vueuse/core` reachability from
  `dist/glass-ui.js`.
- **`supportsPostTask` thin witness.** Exported public predicate with 0 in-repo
  call sites (`usePrioritizedTask` uses `getSchedulerPostTask()` directly). Clears
  the overfitting bar as exported API, but AT should either wire it into
  `usePrioritizedTask` (DRY) or drop it.

**Process note (inv-16 name-forward).** The 3.2.0 commit/push/tag/`npm publish`
(release run `26964913257`) were executed by a concurrent driver during this
session's read-only audit phase — the result is CI-gated-correct. The precept
reinforcement (agents/sub-drivers NEVER run an irreversible release step —
`npm publish`, push of a release tag, `gh release/workflow` dispatch — the
boundary is irreversibility, not just index-ownership; extends
`AGENT_DISPATCH_TEMPLATE.md` design-axis-5) belongs in the shared `docs/precepts`
submodule, authored in the precepts repo's own flow (inv-16 — NOT committed from
inside glass-ui's submodule), then the glass-ui pin advanced. Recorded here as
the name-forward. The dirty `docs/precepts` working tree (constellation-authored
in-flight content, not glass-ui scratch) is likewise left to the precepts owner.

**AS is closed at v3.2.0.**
