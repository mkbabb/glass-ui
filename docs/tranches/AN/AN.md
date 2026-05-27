# Tranche AN — F-tranche root-redress (styles completeness · detented Drawer · role contracts · reorder recipe · chassis phase)

**Tranche letter**: AN.
**Predecessor**: AM (consumer-gap root-redress; v2.0.0 unchanged at HEAD). AN is the next free folder after AM.
**Origin**: cross-repo — the gaps were surfaced by the muster (dine-vote) F-tranche redesign (`/Users/mkbabb/Programming/dine-vote/docs/tranches/F/waves/W10.md` §Scope items 1-5 + `/Users/mkbabb/Programming/dine-vote/docs/tranches/F/audit/W8-build.md §F.W8.6-axe` named-misses). muster consumes the AN fixes through `"@mkbabb/glass-ui": "file:../../glass-ui"` under the contract-v2 cross-repo-dev-resolution seam.

## §1 — Thesis

AM closed the A-E consumer surface (16 gaps). The muster F redesign — a Configurator-spine rebuild over a verdict-first verdict/instrument split with mobile co-location, an interruptible reorder ambition, and a ⌘K command palette — surfaced a second class of glass-ui gaps that AM did not reach: five surface gaps the F redesign needed at the ROOT plus three intrinsic-primitive role-contract residues that the F.W8.6 axe sweep dredged up from behind AM's higher-cardinality fixes.

AN is the F-tranche root-redress: a focused close that makes the `/styles` bundle complete, ships a real detented Drawer variant, adds role contracts to the three primitives whose `<span aria-label>` shape currently trips `aria-prohibited-attr`, and dispositions the two substrate-without-consumer items (interruptible MetricStack reorder, dock panel-host) per the J inv 10 / L inv 8 binary gate. The cross-repo seam contract is binding: muster keeps its two consumer-wiring bridges and its local detented-Drawer stopgap until AN publishes; the F.W10 bridge-retire is HARD-gated on AN landing.

## §2 — Binding question

Can glass-ui ship a complete `/styles` bundle (cascade + SFC scoped CSS + template-emitted utilities), a detented + non-modal + live-behind `Drawer` variant, a sanctioned interruptible `MetricStack` reorder recipe (or its substrate-without-consumer archive), role contracts on the three primitives (StatusDot / SortableHandle / NumberField) that the F.W8.6 axe sweep flagged, and a chassis "scoring" phase disposition — all under the glass-ui release process with every proof gate green?

## §3 — Goal criterion

A muster-shaped consumer mounts `@import "@mkbabb/glass-ui/styles"` once and gets the complete stylesheet (token cascade + SFC scoped CSS); the published `dist` ships the utility classes its own templates emit OR the `@source` requirement is documented as binding in CLAUDE.md §Consumer wiring with the same authority as `tw-animate-css`. A consumer mounts `<Drawer :modal="false" :should-scale-background="false" :snap-points="[0.12, 0.5, 1]">` and gets a non-modal, live-behind, peek/half/full bottom sheet with no focus trap and no page `aria-hidden`. A labelled `<NumberField>`, a consumer-bound `<StatusDot :aria-label>`, and a consumer-bound `<SortableHandle :aria-label>` each render an axe-clean accessible name on the right element. The two substrate-without-consumer items (interruptible reorder recipe, dock panel-host) carry an explicit LANDED-or-ARCHIVED disposition with a named realisation condition. The chassis `"scoring"` question is closed — either a real `"scoring"` union member ships or `"ping"` is documented as the canonical generic-active phase.

## §4 — Completion criterion

All AN hard gates (§7) verify: `npm run typecheck` + `npm run build` exit 0 (the 8 GB `NODE_OPTIONS` baseline); the release proof gates — `verify-export-types`, `proof:package`, `proof:theme`, `proof:resolution`, `profile:budget` — exit green; the `/styles` completeness probe captures a single-import resolution carrying the SFC scoped CSS; the detented Drawer variant typechecks + paints + announces non-modal correctly; the three primitives each pass an axe smoke against a consumer-bound `aria-label`; the disposition ledger (§5) accounts for all 8 named gaps; `AN/FINAL.md` is authored with the gate table and the cross-repo handoff to muster F.W10.

## §5 — Inherited invariants

All standing glass-ui invariants bind unchanged. The load-bearing ones for AN:

- **Substrate-without-consumer is binary** (J invariant 10 / L invariant 8) — a primitive or subpath ships only at ≥ 2 realised consumers, else it ARCHIVES with a named realisation condition. Gates AN's interruptible-reorder recipe + the dock panel-host carry.
- **Zero deferral** (P invariant 28) — no item exits the close as "deferred"; every gap dispositions to LANDED / ARCHIVED-on-2-consumer-gate / DOCUMENTED within AN.
- **Token-first** (J invariant) — every visual behaviour is a CSS custom property; the chassis-phase additive union member (if landed) extends the type, not the consumer's preset.
- **No backwards-compat aliases** (L invariant 4) — the Drawer variant is additive (consumers opt in via new props); no shim, no legacy branch.
- **Hardened agent git clause** (K W0) — implementation agents are read-only on git (never stage/commit/stash/checkout/reset/restore); the orchestrator owns the index.
- **vueuse-FREE root barrel** (L.W1) — no AN addition reintroduces a `@vueuse/core` import into a root-barrel-reachable symbol.
- **Contract-v2 cross-repo-dev-resolution** (invariant 30) — the `file:` seam resolves the built `dist/`; AN rebuilds `dist/` at close so muster F.W10 picks the fixes up; `build:watch` keeps it fresh during a consumer dev session.

**AN introduces one new sub-invariant**: every gap dispositioned by AN close — LANDED, ARCHIVED-on-2-consumer-gate (with named realisation condition), or DOCUMENTED-disposition; no silent open. This is the F-side ask "every gap a named disposition" stated at AN-level.

## §6 — Disposition ledger (all 8 gaps)

The gap numbering follows the F.W10.md §Scope item order (1-5) for the surface gaps + the F.W8.6-axe matrix order for the named-misses (A-C):

| Gap | Disposition | Wave / rationale |
|---|---|---|
| 1 — two consumer-wiring bridges → one clean `@import` (F.W10 item 1; gap 4 / δ.B1) | **LANDED** (W1) | AN.W1 — `/styles` resolves to complete bundle (cascade + SFC scoped CSS); decide utility-emit vs document `@source` in W2 |
| 2 — Tailwind template-utility emission (F.W10 item 1b) | **LANDED-or-DOCUMENTED** (W2) | AN.W2 — ship the `h-full`/`w-full`/etc. utilities the library's templates emit OR document `@source ".../dist"` as a binding contract in CLAUDE.md §Consumer wiring (same authority as `tw-animate-css`) |
| 3 — detented + non-modal + live-behind Drawer variant (F.W10 item 2 / H2-FATAL→HIGH + H3-MED) | **LANDED** (W3) | AN.W3 — peek/half/full snap-points + `scaleBackground: false` + non-modal `<Drawer>` props the consumer opts into; decide `/drawer` subpath question (default: root-barrel + document) |
| 4 — interruptible per-row-`useSpring` MetricStack reorder recipe (F.W10 item 3 / H1-HIGH→prototype) | **ARCHIVED-on-2-consumer-gate** (W5) | AN.W5 — muster v1 contract is settle-on-pointerup (F.md decision 2); the recipe is 2-consumer-gated. LAND if a second consumer materialises in glass-ui or another `@mkbabb/*` project during AN's open window; else ARCHIVE with named realisation condition |
| 5 — dock panel-host variant (F.W10 item 4 / H3-FATAL→reshape) | **ARCHIVED-on-2-consumer-gate** (W6) | AN.W6 — muster's F redesign cut "the dock IS the app" (synthesis SYNTHESIS §2.2); the v1 composition needs no panel-host. ARCHIVE with realisation condition (ships when value.js or another consumer declares a tall-vertical-pane stacked-control pattern) |
| 6 — InstrumentChassis `"scoring"` phase (F.W10 item 5 / gap 3-MED; F.md Decision 5) | **LANDED** (W6, additive type-union expansion) OR **DOCUMENTED** (`"ping"` canon) | AN.W6 — additive `"scoring"` member is a clean LOW-risk type-union expansion; the orchestrator picks LAND (semantic refinement) by default. If the additive change reaches dist-size headroom concerns or the F-side moves to `"ping"` permanently, DOCUMENT `"ping"` as canonical generic-active in CLAUDE.md §Component architecture |
| A — StatusDot role contract (F.W8.6-axe `aria-prohibited-attr` site) | **LANDED** (W4) | AN.W4 — `<span>` root with `aria-label` and no role trips axe; add `role="img"` when the consumer binds `aria-label`, OR expose a `role` prop pass-through. Mirrors RankedVerdict hue-dots fix C2 at the source |
| B — SortableHandle role contract (F.W8.6-axe `aria-prohibited-attr` site) | **LANDED** (W4) | AN.W4 — same span-root pattern as StatusDot. Drag-handle affordance role (`role="button"` is the canonical pick for an interactive grip) plus an explicit `aria-label` channel for the consumer's reorder context |
| C — NumberField label binding (F.W8.6-axe `label` rule + F.W10 AM-seam carry) | **CONFIRM-LANDED** (W4) | AN.W4 — AM.W0.2 added `inheritAttrs:false` + `v-bind="$attrs"` to `<NumberFieldInput>`; F.W8.6 reports 5 nodes/perm residue (down from 14). Re-confirm the AM fix reaches the inner `<input>` from a `<label>`/`aria-labelledby`-bound NumberField; if the residue is a consumer-authoring gap (the label is not bound on the field at all), close as DOCUMENTED with the binding shape muster's SignalsLayer should use |

LANDED: 5 (gaps 1, 2 if utility-emit, 3, 6 if union-expansion, A, B; gap C confirm). ARCHIVED-on-2-consumer-gate: 2 (gaps 4, 5). DOCUMENTED: 1-2 (gap 2 if `@source` doc-only, gap 6 if `"ping"` canon, gap C if consumer-authoring residue).

The exact LANDED-vs-DOCUMENTED count flexes per the AN orchestrator's W2 + W6 decisions; the §7 hard gates verify the disposition shape, not a fixed LANDED count.

## §7 — Wave table

| Wave | Title | Agents | Closes-on (evidence) | Status |
|---|---|---|---|---|
| AN.W0 | Audit + intake | 2 (read-only: F.W10 named scope + F.W8.6 axe evidence ‖ AM seam + current glass-ui source) | `docs/tranches/AN/audit/W0-intake.md` lands with the per-gap WHAT/WHY/WHERE/HOW table feeding W1-W6 dispatch | planned |
| AN.W1 | `/styles` completeness | 1 (build pipeline; `vite-plugin-dts` / Vite CSS emit) | `@mkbabb/glass-ui/styles` resolves to a single CSS payload carrying the token cascade + the SFC scoped component CSS (Aurora's grid layering, etc.); `proof:theme` confirms the bundle ships every cascade rung; the second `@import "@mkbabb/glass-ui/styles.css"` retires from the consumer pattern | planned |
| AN.W2 | Tailwind utility emission | 1 (component template authoring + CLAUDE.md) | The dist ships the utilities its own templates emit (`h-full`, `w-full`, …) so the consumer needs no `@source ".../@mkbabb/glass-ui/dist"` glob — option A (default ask), OR the `@source` requirement is a documented binding contract in CLAUDE.md §Consumer wiring exactly as `tw-animate-css` is — option B (fallback if option A's payload tradeoff is unacceptable) | planned |
| AN.W3 | Detented Drawer variant | 1-2 (drawer SFC + composable wiring ‖ demo proof + docs) | `<Drawer>` accepts `snap-points` + `should-scale-background:false` + `modal:false` (already pass through vaul-vue; AN proves them, adds defaults, adds the detent grammar); a probe mounts the peek/half/full sheet over a live verdict (no focus trap, no page `aria-hidden`); `/drawer` subpath question closed (default: root-barrel + document) | planned |
| AN.W4 | Role contracts on StatusDot · SortableHandle · NumberField | 1 (three focused SFC carves, each <30 lines) | `<StatusDot :aria-label>` renders with `role="img"`; `<SortableHandle :aria-label>` renders with `role="button"` (or the chosen interactive role) + accessible name; `<NumberField>` label binding probe re-runs against the F.W8.6 SignalsLayer shape and confirms the AM.W0.2 fix reaches the inner `<input>` (or the residue is documented as a consumer-binding gap); axe smoke on the AN demo confirms zero `aria-prohibited-attr` from the three sites | planned |
| AN.W5 | Interruptible MetricStack reorder recipe — LAND or ARCHIVE | 1 (recipe SFC + `*-move` class + PRM carve) OR (ARCHIVE author + named realisation) | If a second consumer materialises during AN: the per-row-`useSpring` Y-offset reorder recipe ships at `demo/stories/compositions/` with the canonical `*-move` + PRM `transition: none` carve; else ARCHIVE with the realisation condition "ships at ≥ 2 consumers declaring a mid-drag-reorder pattern; muster F-side stays settle-on-pointerup until then" | planned |
| AN.W6 | Dock panel-host disposition + chassis phase | 1 (decision-record + optional `"scoring"` member) | Dock panel-host: ARCHIVED on the 2-consumer gate with named realisation (muster F v1 cut "dock IS the app"; ships at ≥ 2 consumers needing a tall-vertical-pane). Chassis phase: either `InstrumentChassisPhase` adds `"scoring"` as a real union member (additive expansion; LOW risk) OR CLAUDE.md §Component architecture documents `"ping"` as the canonical generic-active phase | planned |
| AN.W7 | Close — disposition ledger + overfitting + proof gates + FINAL | 1 (orchestrator-led close sweep) | The §6 ledger confirmed against the W1-W6 evidence; the overfitting audit clean (every AN artefact ≥ 2 sites or exported or demo-private); `proof:all` + `proof:resolution` + `verify-export-types` green; `dist/` rebuilt so muster F.W10's `file:` seam resolves the fixes; `AN/FINAL.md` authored with the gate table + the cross-repo handoff to muster F.W10 | planned |

DAG — AN.W0 runs first (the intake is the input to every subsequent wave's dispatch). AN.W1 + AN.W2 are sequential (W2 is the consumer-facing payload decision; W1 establishes the completeness baseline). AN.W3 + AN.W4 run after AN.W0 in parallel (disjoint write scope — `drawer/` vs `status-dot/` + `sortable-list/` + `number-field/`). AN.W5 runs after AN.W0 (read-only intake; the LAND-or-ARCHIVE decision happens during W5 dispatch). AN.W6 runs after AN.W0 (single-decision wave). AN.W7 closes after every other wave lands.

Cross-repo gate — muster F.W10.1 (bridge-retire + local-Drawer stopgap retire) opens after AN.W3 + AN.W2 publish through the `file:` seam; muster F.W10's hard-gate row "AN builds + proof gates green" reads AN.W7's FINAL gate table.

## §8 — Hard gates (tranche-level)

1. **Build + typecheck clean.** `npm run typecheck` + `npm run build` exit 0 against the AN surface (the 8 GB `NODE_OPTIONS` baseline holds).
2. **`/styles` completeness.** `@mkbabb/glass-ui/styles` resolves to a single CSS payload containing the token cascade AND the compiled SFC scoped CSS; a fresh consumer needs no second `@import "@mkbabb/glass-ui/styles.css"`. Evidence — a probe in `audit/W1-styles-completeness.md` + `proof:theme` green.
3. **Template-utility resolution.** Either the dist ships the `h-full`/`w-full`/`@apply`-reached utilities OR CLAUDE.md §Consumer wiring documents the `@source` requirement as binding with the same authority as `tw-animate-css`. Evidence — `audit/W2-tailwind-utilities.md` + the CLAUDE.md diff.
4. **Detented Drawer variant.** `<Drawer :modal="false" :should-scale-background="false" :snap-points="[0.12, 0.5, 1]">` mounts a non-modal peek/half/full bottom sheet with no focus trap and no page `aria-hidden`; a probe captures the three detents. Evidence — `audit/W3-drawer-detents.md`.
5. **Role contracts on StatusDot · SortableHandle · NumberField.** `<StatusDot :aria-label>` → `role="img"` + name; `<SortableHandle :aria-label>` → `role="button"` + name; `<NumberField>` labelled-field probe confirms the AM.W0.2 input-aria reach (or the residue is documented as a consumer-binding gap). Evidence — axe-clean DOM snippets in `audit/W4-role-contracts.md`.
6. **Reorder recipe disposition.** AN.W5 closes LANDED-with-demo OR ARCHIVED-with-named-realisation. Evidence — `audit/W5-reorder-recipe.md`.
7. **Dock panel-host + chassis phase disposition.** AN.W6 records dock panel-host ARCHIVED with realisation condition; chassis-phase LANDED (additive `"scoring"`) or DOCUMENTED (`"ping"` canon). Evidence — `audit/W6-dock-panelhost-chassis-phase.md`.
8. **Disposition ledger complete.** All 8 named gaps account in §6; the archived gaps carry named realisation conditions; no silent open. Evidence — `audit/W7-disposition-ledger.md`.
9. **Proof gates green.** `npm run proof:all` + `npm run proof:resolution` + `npm run verify-export-types` + `npm run profile:budget` exit 0. Evidence — command output in PROGRESS + FINAL.
10. **Cross-repo seam.** `dist/` rebuilt at close; AN.FINAL.md names muster F.W10 as the consumption-verification handoff. Evidence — `git show --stat` of the dist-rebuild + FINAL.md §Handoff.

## §9 — Folded ledger (cross-repo origin → AN wave)

F.W10.md §Scope items 1-5 + F.W8.6-axe named-misses map into AN waves as:

| Origin | AN wave |
|---|---|
| F.W10 item 1a (`/styles` completeness — cascade + SFC scoped CSS) | AN.W1 |
| F.W10 item 1b (Tailwind template-utility emission) | AN.W2 |
| F.W10 item 2 (detented + non-modal + live-behind Drawer variant) | AN.W3 |
| F.W10 item 3 (interruptible MetricStack reorder recipe) | AN.W5 |
| F.W10 item 4 (dock panel-host variant — substrate gate candidate) | AN.W6 (panel-host half) |
| F.W10 item 5 (InstrumentChassis `"scoring"` phase OR `"ping"` doc) | AN.W6 (chassis half) |
| F.W8.6-axe `aria-prohibited-attr` StatusDot site | AN.W4 |
| F.W8.6-axe `aria-prohibited-attr` SortableHandle site | AN.W4 |
| F.W8.6-axe `label` NumberField site (AM-seam carry) | AN.W4 |

The AM seam stays intact — AM closed 16 gaps; AN closes the 8 the F redesign surfaced. The two tranches do not overlap on a single gap.

## §10 — Style discipline

Greenfield voice. Em dashes unspaced. No epanorthosis. Every wave item carries WHAT + WHY. Goal + completion criteria paired at tranche / wave / sub-wave levels per TRANCHE-AND-WAVE-SPEC.md. AN is glass-ui's tranche — muster is the consumer-side context, not the home of AN.

## §11 — Authority

- Plan: this file (`docs/tranches/AN/AN.md`).
- Execution log: `docs/tranches/AN/PROGRESS.md`.
- Close report: `docs/tranches/AN/FINAL.md` (AN.W7).
- Wave specs: `docs/tranches/AN/waves/W{0..7}.md`.
- Audit artefacts: `docs/tranches/AN/audit/W{0..7}-*.md`.
- Cross-repo origin: muster `docs/tranches/F/waves/W10.md` §Scope items 1-5 + muster `docs/tranches/F/audit/W8-build.md §F.W8.6-axe`.
- Consumption handoff: muster `docs/tranches/F/waves/W10.md` (F.W10.1 bridge-retire + local-Drawer stopgap retire gate on AN publishing).
