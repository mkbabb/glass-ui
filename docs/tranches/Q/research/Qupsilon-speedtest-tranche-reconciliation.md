# Qυ (upsilon) — speedtest tranche reconciliation + pane-migration scoping

**Scope**: reconcile the Q pane-migration + dev-resolution-contract work against speedtest's in-flight AF (closed) and AG (planning-ratified) tranches, so Q does not duplicate or collide with speedtest-side work. Audit-augmentation round-4.

**Inputs read in full**: speedtest `docs/tranches/AF/FINAL.md` + `PROGRESS.md`; speedtest `docs/tranches/AG/AG.md` + `PROGRESS.md`; speedtest `docs/audits/2026-05-18-pre-AG/A6-synthesis.md` (the ratified plan of record, 713 LOC); Q `Q.md` + `waves/W1.md`; cross-referenced `Qlambda-speedtest-and-cross-tranche-matrix.md` + `Qnu-speedtest-card-pane-scan.md`. Verified speedtest HEAD source: `vite.config.ts`, `SubnetAddDialog.vue`, `DashboardMap.vue`.

**speedtest HEAD**: `2dce75d0` ("docs(AG): W0 closed — A6 6-wave plan RATIFIED + 9 decisions; HOLD for implementation GO"). One commit past the AG scaffold; AF closed at `35f1e3dd` (`af-close`).

---

## Section 1 — AF tranche summary

### 1.1 — What AF landed

AF was the design + animation refinement tranche — 15 enumerated design items (D1–D15) plus an audit-driven path forward plus the AE.W4-deferred production deployment. Closed 2026-05-18 at `35f1e3dd`. Wave run W0.5 → W1 → W2 → W3 → W4 → W5 → W6 → W7a → W9 (W8 deferred — see §1.2).

The AF.W1 cohort wrote glass-ui — confirmed by the charter and by AF FINAL.md§"Wave summary" W1 row: glass-ui master `7e2e385` carries four primitive edits (D12 rounded leading-edge `<Progress>`/`<ContinuousTimeline>` fill, D4 `--metric-badge-label-weight` token, D7 MetricRow value+unit conjoin 4→3 track, C1 ContinuousTimeline self-drawing completion-tick). The charter names `7e2e385` + `63c88b7` as the merged-into-glass-ui pair; AF PROGRESS.md line 132 records the W1 merge `7e2e385` of `af-w1-glass-ui` off base `95098d1`. The remaining AF waves (W2–W9) are all **speedtest-side**: meter cluster, complete screen, survey, phase animation, reconciliation — none re-opened glass-ui (glass-ui was write-locked W2–W7 per the XR protocol; AF PROGRESS.md line 122–127).

### 1.2 — What "W8 deferred" means

AF.W8 is **production deployment** — CF Pages + Workers + EC2 API ship of the AF-final build to `speedtest.friday.institute`. It was deferred **by explicit user direction** in the AF session ("Defer deployment" 2026-05-18; AF PROGRESS.md line 33; AF FINAL.md line 38 + line 88). AF's design objective was fully met (15/15 D-items visually accepted at W9); only the deploy step is outstanding. The deploy plan is hardened and ready (`AF-r2.md` §W8). "W8 deferred" is therefore a clean, non-silent carry — not an incomplete feature. It folds forward into AG as **AG-CARRY-DEPLOY** and becomes AG's final wave (W-FINAL).

AF's chronic-carry gate (FINAL.md§"Chronic-carry delta gate") dispositioned every AF-CARRY row. The three explicit AF→AF+1 deferrals: W8 deployment, CARRY-22 (`<PhaseDetail>` glass-ui primitive promotion — blocked by the W2–W7 glass-ui write-lock), AF2-D3/E3 (`useMetricResult` `as never` cross-package vue type-identity).

### 1.3 — Does AF touch Card / pane / glass surfaces?

**No pane work, and no Card-variant work.** AF's glass-ui write (W1) was four primitive edits to `<Progress>`, `<ContinuousTimeline>`, `<MetricBadge>`, `<MetricRow>` — the meter/timeline/metric family. None touch `<Card>`, `<ScrollPane>`, the glass-`.glass-*` tier ladder, or any pane-class surface. AF's speedtest-side waves consume glass surfaces (D5 "restored glass-card step title", the `<GlassDock>` transposition at D1) but these are consumption of existing primitives, not pane migration and not Card-variant authorship.

**AF's deferred W8 is pure deployment** — CF/Workers/EC2 infrastructure. It has zero Card/pane/glass overlap with any Q pane-migration target.

**Verdict — AF ⇄ Q pane overlap: NONE.** AF neither performed nor deferred any Card/pane/`<ScrollPane>`/glass-tier work. Q's pane-migration lane (whatever its final target — see §4) does not duplicate or collide with anything AF landed or deferred.

---

## Section 2 — AG tranche summary

### 2.1 — Status

AG is the successor to AF — "successor to AF + production deployment." W0 audit cohort (A1–A6, 3087 LOC) is **CLOSED**; the A6-synthesis 6-wave plan + all 9 G-AG-D decisions are **RATIFIED** (2026-05-18, `2dce75d0`). **Posture: HOLD** — ratification is explicitly NOT an implementation go (AG PROGRESS.md; `[[feedback_tranche_implementation_gate]]`). AG awaits a separate explicit "implement"/"begin" signal from the user before any W1 lane dispatches.

This mirrors Q's own posture exactly — Q is also planning-only ("This is NOT an implementation phase. Tranche development only."). **Both tranches are ratified-but-unstarted.** That symmetry is the central fact of the reconciliation.

### 2.2 — The ratified 6-wave plan

Effective run (W4 collapses — see §2.4): **W1 → W2 → W3 → W5 → W-FINAL → W-CLOSE**.

| Wave | Scope | Card/pane/glass/ScrollPane/resolver? |
|---|---|---|
| W0 | 6-lane audit cohort (A1–A6) | none — read-only |
| W1 | hygiene + W-FINAL prep — SSH-config, `deploy.sh` hardenings, `/api/health` VER, W5 test coverage (TR-1), fixture kill-switch (TR-2), repo hygiene | **none** — see §2.3 |
| W2 | desktop composition design — AG-D1 idle, AG-D2 survey, AG-D3 ThankYou, AG-D4 admin coherence, AG-D5/D6 missing-surface + DPI capture | **glass *consumption*, not pane work** — see §2.5 |
| W3 | animation coherence — 150ms handoff gap, 6 `cubic-bezier()` literals, edge symmetry, `data-phase` smells, DESIGN.md re-honesty | none — motion canon only |
| W4 | chronic promotion (CONDITIONAL) — **collapsed**: both lanes deferred to AG+1 | **CARRY-22 glass-ui touch DEFERRED** — see §2.4 |
| W5 | precept-conformance + visual acceptance + operator-handoff docs | none — verification only |
| W-FINAL | deployment — A5 S0-S7 verbatim, user-confirm at S0 | none — production infra only |
| W-CLOSE | FINAL.md + chronic-delta gate + `ag-close` tag | none |

### 2.3 — AG.W1 — the resolver-relevant wave

AG.W1 (Group α, A6-synthesis §2.1 + §3.1) carries six lanes: L1 SSH-config, L2 `deploy.sh` hardenings (AG-DEPLOY-PROBE / ROLLBACK-API / ROLLBACK-CF), L3 `/api/health` version field, L4 W5-test coverage (AG-EA1/EA2/EA3 — `usePhaseTransition`/`useMeterRenderer` test files), L5 fixture kill-switch (AG-W9-FIND-2 / TR-2 — one line in `tests-e2e/fixtures/speedtest.ts`), L6 repo hygiene (`AC/artefacts` disposition, `AF.md` re-header).

**AG.W1 does NOT touch `vite.config.ts`, `resolve.conditions`, `manualChunks`, or any module-resolution config.** The full A6-synthesis item list (32 items, §1) was searched: there is no AG item for Vite resolver configuration, no `resolve.conditions` item, no `manualChunks` cleanup, no dev-resolution-contract item. AG's "hygiene" lane is deploy-script + test-file + doc hygiene — a different hygiene domain entirely. AG's W0 audit cohort (A1 chronic-recap, A2 engineering, A3 visual, A4 animation, A5 deploy) never surfaced the keyframes.js `dist/`-desync or speedtest's missing `resolve.conditions`. **The AD.W4 conditional-exports desync is invisible to AG** — AG's audits scoped speedtest-internal design/animation/deploy, not the cross-`@mkbabb/*` resolution graph.

### 2.4 — The 9 ratified decisions — Card/pane/glass relevance

| Decision | Ruling | Card/pane/glass/resolver relevance |
|---|---|---|
| G-AG-D1 | animation handoff = small `--phase-handoff-duration` token; gestalt CSS-clock → AG+1 | none — speedtest `tokens.css` motion token, not glass-ui |
| G-AG-D2 | **AG-CARRY-22 `<PhaseDetail>` glass-ui promotion: DEFER to AG+1** | **glass-ui-relevant** — see below |
| G-AG-D3 | AG-CARRY-E3 `useMetricResult` vue-dedup: DEFER to AG+1 | monorepo infra; not pane/Card |
| G-AG-D4 | DPI variant capture: IN SCOPE (W2.L5 / W5.L2) | capture-only; no source edit |
| G-AG-D5 | admin surfaces: IN SCOPE (W2.L4) | glass *consumption* — see §2.5 |
| G-AG-D6 | deploy posture: Path A only | deployment; no overlap |
| G-AG-D7 | `useAutoStart` race: A2 fixture-side reframe wins | test fixture; no overlap |
| G-AG-D8 | desktop survey-dock flush: folded into AG-D2 | composition; see §2.5 |
| G-AG-D9 | gestalt JS-written CSS-clock: DEFER to AG+1 | none |

**G-AG-D2 is the only glass-ui-touching decision, and it RULED DEFER.** AG-CARRY-22 (`PhaseTimelineDetailPanel` → glass-ui `<PhaseDetail>` primitive promotion) was the one item that would have opened a glass-ui write-lock in AG. The ratified decision defers it to AG+1; W4 collapses entirely (both its lanes — CARRY-22 + CARRY-E3 — deferred). **The net result: AG opens no glass-ui write-lock at all.** AG is a wholly speedtest-internal tranche after W4's collapse.

This matters for Q: a `<PhaseDetail>` promotion would have been a glass-ui-side write that Q's own W2 (which also writes glass-ui — invariant-31 fail-explicit) might have raced. AG deferring it removes that race entirely.

### 2.5 — AG.W2 — does the desktop-composition pass touch panes or `<ScrollPane>`?

AG.W2 is the closest AG comes to Q's territory. It is a desktop-composition redesign of five speedtest surfaces (AG-D1 idle meter, AG-D2 survey two-pane cockpit, AG-D3 ThankYou, AG-D4 admin, AG-D5/D6 capture). A6-synthesis §2.2 is explicit: "A3's findings are all desktop-spatial-composition class — none implicate the canvas paint loop or the W5 motion system; all are **template + token-scale + grid-template work**."

The relevant question: AG-D2 is described as a "two-pane cockpit" (dock as left rail). Does "two-pane" mean `<ScrollPane>` or `<Card variant="pane">`? **No.** "Two-pane cockpit" here is a *layout-composition* term (a two-column desktop arrangement of the survey wizard + dock) — it is grid-template + `max-w` token work on `SurveyWizard.vue` + `SurveyResultDock.vue`, per A6-synthesis §3.1 W2.L2. It is not a glass-ui `<ScrollPane>` adoption and not a Card-variant change. The AG-D2 lane edits speedtest templates, not glass-ui primitives.

AG.W2's glass touch is **consumption only**: AG-D4 restores "aurora + glass-card + brand typography" to admin surfaces (re-applying existing glass recipes that were missing), and AG-D3 adopts the instrument-chassis shell on ThankYou. Neither authors a pane primitive nor migrates a `<Card>` variant. AG.W2 reads `<Card tier=…>` sites as they stand at HEAD — it does not re-prop them.

**Verdict — AG ⇄ Q pane overlap: NONE.** AG plans zero Card-variant, zero `<ScrollPane>`-adoption, zero glass-tier-ladder work. AG-D2's "two-pane" is layout composition, not pane primitives. The one glass-ui-touching item (CARRY-22) was ratified DEFER. AG is, after W4's collapse, a speedtest-internal design + deploy tranche with no glass-ui write surface.

---

## Section 3 — Q ⇄ speedtest collision matrix

Three Q waves write speedtest: W1 (resolver sweep — Lane G), W2 (pane migration — IF speedtest is a target), W4 (cluster-C2 phantom-class fleet sweep — IF speedtest carries phantom classes). Each is cross-walked against AF (landed/deferred) and AG (ratified plan).

| Q wave / lane | speedtest file domain | AF owns it? | AG owns it? | Verdict |
|---|---|---|---|---|
| **Q.W1 Lane G** — speedtest resolver sweep: add `resolve.conditions` to `vite.config.ts` per the dev-resolution contract; remove dead `dist/`-path branches in `manualChunks` (Q-misc-1) | `speedtest/vite.config.ts` | NO — AF never touched resolver config; AF.W1 was glass-ui primitive edits, AF.W2-W9 speedtest design | NO — AG.W1 hygiene is deploy-script + test + doc hygiene; no AG item touches `vite.config.ts`/`resolve.conditions`/`manualChunks` (verified against the full 32-item A6 list) | **CLEAR** |
| **Q.W2** — pane migration (`<Card variant="pane">` → `<ScrollPane>` per Qξ Path D) | speedtest has **0** `<Card variant=…>` sites (Qν §2) — speedtest is **not a Q.W2 migration target** | n/a | n/a | **CLEAR (vacuous)** — Q.W2 does not write speedtest at all |
| **Q.W2 (stretch)** — IF the user's "speedtest SHOULD adopt pane semantics" intuition is read as a directive: migrate the 2 weak hand-rolled candidates (`SubnetAddDialog.vue:24`, `DashboardMap.vue:5`) | `speedtest/src/components/dashboard/{SubnetAddDialog,DashboardMap}.vue` | NO — AF never touched these files | **POTENTIAL** — `DashboardMap.vue` is an AG-D5 *capture* surface (MapView), and `SubnetAddDialog` lives under admin/dashboard which AG-D4/D5 walk; AG W2 may re-compose around them | **COORDINATE** — see §4 |
| **Q.W4 Lane F** — cluster-C2 phantom-class fleet sweep (`.glass-{subtle,medium}` sed-rewrite) | speedtest carries **0** phantom-class sites — Qλ §C2 names only keyframes.js (3) + value.js (2) + fourier (9) + words/frontend (4); speedtest is NOT in the C2 cluster | n/a | n/a | **CLEAR (vacuous)** — Q.W4 does not write speedtest |

### 3.1 — Collision count: 0 hard collisions, 1 COORDINATE

- **Q.W1 Lane G — CLEAR.** Verified at HEAD: `speedtest/vite.config.ts` declares only `dedupe: ["vue", "reka-ui"]` and `fs.allow` extensions — **no `resolve.conditions` key exists**. The `manualChunks` function still carries the dead `id.includes("/keyframes.js/dist/")` and `id.includes("/value.js/dist/")` path-match branches (lines ~449–454) — these reference the `dist/` artefacts the AD.W4 freshness-retire deleted. Both the missing `resolve.conditions` and the dead `dist/` branches are exactly the Q.W1 Lane G + Q-misc-1 targets. AG touches neither. **No collision; Q owns this lane outright.**
- **Q.W2 — CLEAR (vacuous).** speedtest has zero direct `<Card variant=…>` sites (Qν confirmed; speedtest got the `5d914df9` S.W4 tier-API sweep value.js/bbnf-buddy missed). Q.W2's 18-site migration fleet is value.js (11) + bbnf-buddy (7) — speedtest contributes nothing. Q.W2 never writes speedtest.
- **Q.W2 stretch — COORDINATE.** The 2 weak hand-rolled candidates touch `DashboardMap.vue` and `SubnetAddDialog.vue`. `DashboardMap.vue` is an AG-D5 capture surface and AG-D4 admin-coherence walks the dashboard family. If Q migrates those 2 sites AND AG re-composes the same files, a textual conflict is possible. This is the only non-CLEAR cell — and §4 resolves it by recommending Q **not** migrate them.
- **Q.W4 Lane F — CLEAR (vacuous).** speedtest is not in the C2 phantom-class cluster.

**Hard collisions: 0. Coordinate items: 1 (the Q.W2-stretch hand-roll migration, resolved by not doing it).**

---

## Section 4 — speedtest pane-migration scope

Per the charter's target-agnostic requirement: report which speedtest sites need pane migration, regardless of whether Q.W2's final target is `<ScrollPane>` or a Card config (Qπ re-adjudicating that).

### 4.1 — Sites Q migrates: ZERO

speedtest has **0** `<Card variant="pane">` sites and **0** `<Card variant=…>` sites of any value (Qν §1–§2, verified at HEAD). The Q.W2 migration fleet (18 sites — value.js 11 + bbnf-buddy 7) does not include speedtest. speedtest received the v0.8.0 `tier`-API sweep at commit `5d914df9` (S.W4) and was written against the canonical tier API from day one; it never inherited the pre-v0.8.0 `variant="pane"` legacy. **Q migrates zero speedtest sites.**

### 4.2 — Sites AG owns: ZERO pane sites

AG plans no Card-variant, no `<ScrollPane>`, no pane work (§2.5). AG owns zero pane-migration sites. AG does *re-compose* `SurveyWizard.vue`/`SurveyResultDock.vue` (AG-D2) and re-style admin/dashboard surfaces (AG-D4/D5), but none of that is pane migration — it is layout + glass-recipe consumption.

### 4.3 — The 2 weak hand-rolled candidates: intentionally NOT panes

Qν round-3 surfaced two weak hand-rolled pane-equivalents. Re-examined here:

- **`SubnetAddDialog.vue:24`** — `<div v-if="newSubnet.prefix" class="glass-wash rounded-lg px-3 py-2 font-mono text-small">` — a CIDR-preview chip inside a `<Dialog>` body. Verified at HEAD. This is a one-off inline mono-font preview readout, not workspace chrome. It is **intentionally not a pane** — it is a transient preview element. A `<ScrollPane>` migration here would be semantically wrong (`<ScrollPane>` is a scroll-region primitive; this chip neither scrolls nor is a region). A Card-config migration would over-formalize a 3-line preview. **Leave as-is.**
- **`DashboardMap.vue:5`** — `<div class="glass-wash max-w-sm rounded-lg p-6 text-center">` — the no-API-key fallback notice nested inside the `glass-card map-container` host. Verified at HEAD. This is the textbook "flat surface nested inside an elevated card" case — but it is a static empty-state message, not a scroll region and not workspace chrome. `<ScrollPane>` is the wrong primitive (nothing scrolls). A `<Card tier="wash" :shadow="false">` would technically work, but it is a 6-line static notice; formalizing it buys nothing. **Leave as-is.**

Both are **intentionally not panes**. Qν already graded them "weak" and the Q.md round-3 resolution recorded Qν's WEAK-REJECT of the pane-pivot. This reconciliation confirms: neither should be migrated by Q. They are not pane-class surfaces — they are a preview chip and an empty-state notice that happen to use `glass-wash` for colour weight.

### 4.4 — Scope summary

| Category | Count | Sites |
|---|---|---|
| Q migrates (in the Q.W2 fleet) | **0** | — |
| AG owns (pane work) | **0** | — |
| Intentionally NOT panes (leave as-is) | 3 | `SubnetAddDialog.vue:24`, `DashboardMap.vue:5`, `DashboardMap.vue:30` (pill geometry — Qν excluded) |
| Idiomatic pane-class already in production | 1 | `SurveyReview.vue:3` (`<Card tier="wash" :grain="false">` — the canonical post-v0.8.0 expression) |

**speedtest's pane-migration scope is empty.** It is the counterfactual consumer — it shows what value.js/bbnf-buddy look like migrated-from-scratch against the current API. No pane work is owed by Q or AG.

---

## Section 5 — Recommendation: how Q sequences against AG

### 5.1 — The two tranches are independent; sequencing is unconstrained

The reconciliation finds **0 hard collisions** across all three Q waves that could write speedtest. Q.W2 and Q.W4 do not write speedtest at all (speedtest is neither a pane-migration target nor in the phantom-class cluster). Only **Q.W1 Lane G** writes speedtest — a single-file `vite.config.ts` edit (add `resolve.conditions`, prune dead `manualChunks` `dist/` branches) — and AG touches that file in zero of its waves. AF touched it in zero of its waves. **Q.W1 Lane G is collision-free against the entire AF+AG arc.**

Therefore Q and speedtest's AG can run **in either order or concurrently** with one narrow caveat (§5.2). There is no hard sequencing dependency.

### 5.2 — The one ordering preference: Q.W1 Lane G lands before AG implementation GO

Although there is no collision, there is a **soundness preference**: Q.W1 Lane G should land before AG begins implementation, for two reasons:

1. **AG.W1 + AG.W-FINAL run `npm run build` / `npm run check` on speedtest.** speedtest's build currently fails (the keyframes.js `dist/`-desync — Q.md §1; the `development` condition masks it in dev but `npm run build` resolves `import → ./dist/keyframes.js` which AD.W4 deleted). If AG dispatches W1 (which has a hard gate "428+ tests PASS; `npm run check` PASS") or W-FINAL (which builds the production bundle) **before** Q.W1 repairs the resolution contract, AG hits a red build that is not AG's fault and not in AG's audit scope to diagnose. AG would either stall or paper over it. Q.W1 landing first means AG inherits a green build.
2. **AG.W-FINAL ships the production bundle.** Q.W1's `manualChunks` cleanup (removing the dead `/keyframes.js/dist/` + `/value.js/dist/` branches) is cosmetically inert today but should be clean before a production deploy bakes the chunk graph. Landing Q.W1 Lane G before AG.W-FINAL means the deployed bundle reflects the corrected resolver config.

This is a **one-directional preference, not a blocker**: Q.W1 → (then) AG implementation GO. It costs Q nothing — Q.W1 is Q's first implementation wave anyway — and it hands AG a buildable speedtest.

### 5.3 — No hand-off needed for Q.W2 / Q.W4

Because speedtest is not a Q.W2 or Q.W4 target, no coordination, hand-off, or sequencing is required for those waves. Qπ's re-adjudication of the Q.W2 target (`<ScrollPane>` vs Card config) is **target-agnostic with respect to speedtest** — whichever target Qπ picks, speedtest contributes zero sites either way. Q.W2 can proceed without any speedtest awareness.

### 5.4 — Do NOT migrate the 2 hand-rolled candidates

The charter asked whether Q should migrate `SubnetAddDialog.vue:24` + `DashboardMap.vue:5`. **Recommendation: NO.** §4.3 establishes both are intentionally-not-panes (a preview chip + an empty-state notice). Migrating them would (a) be semantically wrong for a `<ScrollPane>` target, (b) be over-formalization for a Card target, and (c) introduce the only COORDINATE-class cell in the matrix (§3) — a textual-conflict risk against AG-D4/D5's dashboard re-composition. Leaving them as raw `glass-wash` divs is correct and keeps the Q⇄AG matrix at 0 collisions / 0 coordinate items. If the user later directs adopting pane semantics at those sites, it is a 6-line consumer change best done *after* AG.W2 settles the dashboard composition — i.e. AG+1-era, not Q.

### 5.5 — Constellation note

speedtest is a glass-ui consumer; Q's MULTI-WRITER policy (Q.md §5) governs the Q.W1 Lane G write. AG being HOLD-for-GO and Q being planning-only means **neither tranche has dispatched implementation**. The orchestrator owns both. The clean recommendation: when Q gets its implementation GO, Q.W1 Lane G writes `speedtest/vite.config.ts`; when speedtest gets its AG implementation GO afterward, AG inherits the contract-conformant, buildable speedtest. No lane in either tranche writes a file the other lane writes. The constellation is collision-free.

---

## Summary

- **File**: `/Users/mkbabb/Programming/glass-ui/docs/tranches/Q/research/Qupsilon-speedtest-tranche-reconciliation.md`
- **AF ⇄ pane overlap**: **NONE** — AF's only glass-ui write was 4 Progress/Timeline/Metric primitive edits (W1, `7e2e385`); AF performed and deferred zero Card/`<ScrollPane>`/glass-tier work; AF's deferred W8 is pure deployment infrastructure.
- **AG ⇄ pane overlap**: **NONE** — AG's ratified 6-wave plan plans zero Card-variant / `<ScrollPane>` / glass-tier work; AG-D2's "two-pane cockpit" is layout composition, not pane primitives; the one glass-ui-touching item (CARRY-22 `<PhaseDetail>`) was ratified DEFER-to-AG+1, so AG opens no glass-ui write-lock at all.
- **Q ⇄ speedtest collision count**: **0 hard collisions** (Q.W1 Lane G CLEAR — AG touches no resolver config; Q.W2 + Q.W4 vacuously CLEAR — speedtest is not a target); **1 COORDINATE item** (the Q.W2-stretch hand-roll migration), resolved by recommending Q not perform it.
- **speedtest pane-migration site count Q owns**: **0** — speedtest has 0 `<Card variant=…>` sites (received the v0.8.0 tier-API sweep at `5d914df9`); the 2 weak hand-rolled candidates (`SubnetAddDialog.vue:24`, `DashboardMap.vue:5`) are intentionally-not-panes and should be left as-is.
- **Sequencing recommendation**: Q and AG are independent; only soundness-preference is **Q.W1 Lane G lands before AG's implementation GO** so AG inherits a buildable speedtest (speedtest's `npm run build` currently fails on the keyframes.js `dist/`-desync; AG.W1 + W-FINAL both run builds). One-directional preference, not a blocker.
