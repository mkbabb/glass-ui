# Tranche AY (DRAFT) — fold the AX deferrals + finish the close

> **STATUS: DRAFT — for author review.** This is the AY charter draft. It folds the
> AX deferred/incomplete set (the W25/W26/W27 god-module-and-gate-hardening batch, the
> never-built W33 formal close, the booked native-drawer-asChild row, the local-only
> live-gate CI decision, and the residual `planned` AX wave set) into ordered AY waves.
> Every defect below is **re-verified LIVE** against `at-dock-convergence @ fba6262`
> (HEAD; `v3.9.0` is an ancestor) at write-time — line counts, gate tags, and
> file-absences are real, not trusted from the inventory. Nothing here writes `src`;
> this is the spec-formation pass.

AY is glass-ui's post-AX tranche. AX is **not a clean close** we succeed — it is a
mostly-shipped convergence (3.9.0 cut, CI-green on the convergence branch's gate fleet)
whose **last structural batch (Batch 8 encapsulation) and entire terminal close wave
(Batch 9 / W33) never ran**, and whose 3.9.0 cut lives only on `at-dock-convergence`
(31 commits ahead of `master`). AY is the corrective successor: it lands the four
god-module carves AX deferred, builds the formal close machinery AX never authored
(`proof:ay-final` + `FINAL.md` + the overfitting audit + the inheritance cross-walk +
the budget rebaseline + the gate-fleet meta-sweep), discharges the cross-repo consumer
ledger that `proof:consumer-staleness` is born-RED awaiting, decides the local-only
live-gate CI story (keep-the-ledger vs add a headless-render lane), and re-anchors every
stale version-arithmetic assertion the AX.W33 spec carried (it targets a superseded
3.8.0/3.7.0 lineage). **NOTHING is "done" until audited GREEN against the live product**
— the cardinal lesson AX inherited from AW carries into AY verbatim.

**Plan basis** — `docs/tranches/AX/PROGRESS.md` (the per-wave landed/planned ledger +
the live-verified rows with on-disk `audit/visual/*.png` DELTAs), `docs/tranches/AX/GOLDEN.md`
(the 9-criterion done-definition + the 10-batch DAG; Batch 8 = encapsulation, Batch 9 =
close), `docs/tranches/AX/waves/AX.W25a|W25b|W26|W27a|W27b.md` (the authored-but-unrun
encapsulation specs), `docs/tranches/AX/waves/AX.W33-close-*.md` (the authored-but-unbuilt
close spec — six born-RED witnesses), `docs/tranches/AX/audit/DISPOSITION-REGISTER.json`
(the book/archive rows + `proof:disposition-live` triggers), and the live re-measurement
recorded in §1. Every wave below cites the AX wave it folds AND the live defect it
inherits.

**Format** — mirrors AX/AU/AV (`AY.md` charter + `PROGRESS.md` + per-wave specs under
`waves/AY.W#-*.md` + `FINAL.md`). This file is the CHARTER DRAFT only — DEV (it writes no
`src`). AY is **tranche-development ONLY** until greenlit for execution: plan / research /
harden / synthesize / write. No merges, no publish, no `src` edits until the execution
mandate opens.

**Agent-ceiling.** The binding dual ceiling holds (ORCHESTRATION.md §Wave Model):
**≤6 implementation agents per wave, ≤7 read-only-audit lanes.** Each per-wave spec
declares its actual count.

**Hardened agent git clause (K W0).** Agents NEVER stage / commit / stash / checkout /
reset / restore. Read-only git only; the orchestrator owns the index. The master-merge +
publish hinge (W7) is USER-DOMAIN.

---

## §0 — Directive → disposition table

Each AX directive/deferral, its source, the live re-verification, and where it lands in AY.

| # | AX directive / deferral | Source | Live re-verify @ `fba6262` | AY disposition |
|---|---|---|---|---|
| D1 | Split the 4 TS/Vue god-modules (Batch 8 / W26) | `AX.W26.md`; GOLDEN §C Batch 8 | `useMetaballRenderer.ts` **694**, `SegmentedTabs.vue` **689**, `GlassDock.vue` **608**, `constellationField.ts` **510** — all > 500, exactly the GOLDEN counts | **AY.W1** — TS/Vue encapsulation carves |
| D2 | CSS monolith carves + `.css`-aware god-module gate (W25a/W25b) | `AX.W25a.md`, `AX.W25b.md` | `proof:no-god-module` is `tags: ["local"]` (gates.mjs:387) — `.css`-blind + not in CI; tokens/utilities/glass still uncarved | **AY.W2** — CSS carves + gate-extension + **promote `proof:no-god-module` to `ci`** on close |
| D3 | Legacy gate hardening — barrel scrub, tag-parity, var-in-arbitrary guard (W27a) | `AX.W27a.md` (spec-only, `Mode: tranche-development`) | `proof:tag-parity` / `proof:var-in-arbitrary-guard` not registered; W21's `proof:no-retired-survivor` authored, not registered | **AY.W3** — legacy-gate hardening + tag-parity + retired-survivor registration |
| D4 | Full-tree legacy-commentary sweep (W27b) | `AX.W27b.md` (spec-only) | `proof:no-legacy-commentary` is `tags: ["local"]` (gates.mjs) scoped to `api/index.ts` + `src/index.ts` only | **AY.W3** (fold) — widen scope full-tree + Card stale-prop finalize |
| D5 | The formal close — `proof:ay-final` + `FINAL.md` + overfitting audit + inheritance cross-walk + budget rebaseline + gate-fleet meta-sweep + README currency | `AX.W33.md` (6 born-RED witnesses; UNBUILT) | `FINAL.md` ABSENT; `proof-ax-final.mjs` ABSENT; `archive/` ABSENT — all confirmed | **AY.W6** — the terminal close (re-anchored to the AY cut; W33 scope ported) |
| D6 | The cross-repo consumer-adoption ledger feeding carry-closure (W34) | `AX.W34.md`; `proof:consumer-staleness` born-RED | `proof:consumer-staleness` registered; born-RED on 12 real speedtest stale imports across 4 siblings, pending W34 discharge | **AY.W5** — consumer-adoption ledger (hard prereq for W6's carry-closure) |
| D7 | Local-only live-gate CI decision (the cardinal-lesson residual) | `06fe5e2`; gates.mjs header §30-44; W33 "π-gate-in-CI infra decision" | 18 gates `tags: ["local"]`; the 11 π/Playwright gates re-tagged local; `proof:live-verified-ledger` is the ci-side static proof | **AY.W4** — DECIDE: keep local-only + ledger, or add a SwiftShader/Dawn headless-render CI lane |
| D8 | The owed-DELTA captures (W19, W56) | PROGRESS rows `dev-landed · live-pending (DELTA owed)` | W19 + W56 carry owed `.png` DELTA captures despite green gates | **AY.W0** — owed-DELTA capture sweep (Batch 0, lands first) |
| D9 | `native-drawer-as-asChild` (DISPOSITION book row) | `DISPOSITION-REGISTER.json` | Re-evaluates **un-MET** — muster absent, speedtest does not import `dialog-native`; `proof:disposition-live` confirms un-MET each close | **WATCH** (no wave) — carry the book row with its `min-consumers n:2` trigger; the 2 ARCHIVED rows stay archived |
| D10 | Master-merge + provenance-clean publish of the AX→AY line | GOLDEN §C Batch 9 "provenance-clean master-merged"; MEMORY `project_publish_ci_broken` | `master` @ `c6244e2` (docs-only); HEAD 31 ahead; no W44-W63 commit on master | **AY.W7** — the publish hinge (USER-DOMAIN, confirm-first) |
| D11 | Residual `planned` AX wave set (W20/W21, W28-W32, W34, W35, W39, W41, W42, W43, W49) | PROGRESS `planned` rows | All `planned`; W34 is W6's hard input (D6); the rest are primitives/slides/cross-repo/substrate | **AY.W8** (umbrella) — triage into AY sub-waves OR explicit defer-with-trigger; NOT silently carried |
| D12 | Stale version arithmetic in the W33 spec (targets 3.8.0 + 3.7.0 lineage) | `AX.W33.md §11`, `proof:prod-validation` `npm view == 3.8.0` | 3.9.0 already cut from this branch; the W33 assertion is stale | **AY.W6** (fold) — re-anchor every version assertion to the AY cut |

---

## §1 — Re-ground (the post-AX landed state, HEAD `fba6262`)

HEAD `fba6262`, branch `at-dock-convergence`, version **3.9.0** (`v3.9.0` @ `3d16653` is
an ancestor; HEAD is `v3.9.0` + 7 CI-fix commits). The AX convergence (W44-W63 + the
GOLDEN batches 0-7) is **SHIPPED and CI-green on this branch's gate fleet** — the 3.9.0
cut passed typecheck / test / build / budget / resolution + the static proof fleet, and
the live-verified PROGRESS rows each carry an on-disk `audit/visual/*.png` DELTA. W62
landed the soundness gate battery (ci.yml is GENERATED from `gates.mjs --emit-ci`; 92 ci
gates byte-matched; `tests/` folded into typecheck).

**Topology (load-bearing).** `master` is still at the merge-base `c6244e2` (docs-only —
MASTER-PLAN + story-language scrub). The entire W44-W63 implementation + the 3.9.0 cut
sit on `at-dock-convergence`, **31 commits ahead**. So "3.9.0 published / CI green" is true
*of the convergence branch's gate fleet and the cut*, NOT of `master`. The master-merge is
itself an open close-step (AY.W7).

**What AY picks up — the deferred set (live-confirmed):**

1. **Batch 8 never ran.** The four god-modules are live over budget at the GOLDEN counts
   (694 / 689 / 608 / 510). The CSS monoliths (tokens/utilities/glass) are uncarved.
   `proof:no-god-module` is `["local"]`-tagged and `.css`-blind, which is exactly *why*
   3.9.0 cut clean over four TS/Vue violators — the gate is RED-by-design but never blocks
   CI. The legacy-gate-hardening + commentary-sweep specs (W27a/W27b) are `Mode:
   tranche-development` (spec-only, no impl ever landed).

2. **Batch 9 / the formal close never ran.** `proof:ax-final` does not exist, `FINAL.md`
   does not exist, `docs/tranches/AX/archive/` does not exist. No overfitting audit, no
   inheritance-ledger cross-walk, no 8th budget rebaseline, no gate-fleet meta-registration
   (`proof:no-retired-survivor` authored at W21 but unregistered), no README planned→landed
   currency sweep (aurora/goo-blob/dock/constellation). The W33 spec that would build all
   of this is written against a stale 3.8.0 cut + a 3.7.0 lineage-merge — both superseded.

3. **The consumer-adoption ledger (W34) is unbuilt** and `proof:consumer-staleness` is
   born-RED on 12 real speedtest stale imports across 4 siblings, pending its discharge.
   W34 is a hard prerequisite for the close: its `{receiver, close-gate}` ledger is the
   primary input to the carry-closure gate.

4. **The live-truth-in-CI question is open.** 18 gates are `["local"]`-tagged; the 11
   π/Playwright live gates were re-tagged local at `06fe5e2` ("align ci gate-set with the
   cardinal-lesson") because a clean CI runner has no browser binary / GPU. CI instead
   relies on the ci-tagged static `proof:live-verified-ledger` (every `live-verified` row
   has an on-disk `.png` DELTA). The architecture is coherent but means the live truth is
   **never re-executed server-side** — a regression that breaks a painting surface ships
   green if a stale DELTA `.png` still sits on disk. This is the single highest-value AY
   follow-up against the tranche's own cardinal lesson.

5. **Owed DELTAs + residual planned waves.** W19 (primitive-prune A) + W56 (squircle) read
   `dev-landed · live-pending (DELTA owed)` — the gates are green, the `.png` capture is
   owed. A long residual planned set (W20/W21 primitives, W28-W32 speedtest/slides,
   W35 keyframes-prune, W39 lighthouse, W41 publisher edge, W42 liquid-morph, W43
   fourier-field, W49 math-paper) is `planned` — these are the bulk of forward work and
   are triaged in AY.W8, never silently carried.

---

## §2 — Waves

The AY wave set: a Batch-0 owed-DELTA sweep, the Batch-8 encapsulation carves
(TS/Vue + CSS + legacy-gate-hardening), the live-gate CI decision, the consumer ledger,
the terminal close, the publish hinge, and the residual-triage umbrella. Order is the DAG:
W0 first (cheap, flips owed rows), W1-W3 the structural carves (close prerequisites),
W4 the CI decision (informs the close's gate-tag policy), W5 the consumer ledger (close
input), W6 the terminal close (dependsOn all), W7 the publish (USER-DOMAIN), W8 the
forward triage (parallel, not a close blocker).

| Wave | Track | Type | Depends | Headline | HARD GATE |
|---|---|---|---|---|---|
| **AY.W0** | visual | gate | — | Owed-DELTA capture sweep (W19 + W56) — flip both `live-pending` rows to `live-verified` | Both rows in PROGRESS read `live-verified` with a new on-disk `audit/visual/{W19,W56}-DELTA.md` + `.png`; `proof:live-verified-ledger` GREEN over both |
| **AY.W1** | encapsulation | refactor | W0 | TS/Vue god-module carves — `useMetaballRenderer.ts` / `SegmentedTabs.vue` / `GlassDock.vue` / `constellationField.ts` each < 500, return-shape byte-identical | `proof:no-god-module` (TS/Vue arm) GREEN; the 4 public return shapes unchanged (typecheck + the existing unit/proof gates for each surface stay green) |
| **AY.W2** | encapsulation | refactor | W1 | CSS monolith carves + `.css`-aware gate-extension — tokens/utilities/glass under budget; **promote `proof:no-god-module` to `["local","ci"]`** | `proof:no-god-module` `.css`-aware AND ci-tagged, GREEN over the whole tree; `/styles` bundle byte-equivalent (cascade order preserved); `gates:verify-ci` GREEN |
| **AY.W3** | hardening | gate | W2 | Legacy-gate hardening — register `proof:no-retired-survivor`, add `proof:tag-parity` + `proof:var-in-arbitrary-guard`, widen `proof:no-legacy-commentary` full-tree, Card stale-prop finalize | All four gates registered with correct local/ci tags + GREEN; tag-parity asserts every `proof-*.mjs` has a matching `package.json` key (the AX W33 RED-witness-2 12-orphan sweep returns 0) |
| **AY.W4** | infra | gate | — | Live-gate CI decision — DECIDE keep-local-only+ledger vs add a SwiftShader/Dawn headless-render lane; if the lane: re-execute ≥ `substrate-paints-color` + `dock-animation-live` server-side | A DECISION doc + (Branch A) the ledger-only rationale recorded as a precept, OR (Branch B) a green CI job that re-runs the 2 named gates against a headless GPU; either branch closes the "stale-DELTA-over-broken-surface" residual explicitly |
| **AY.W5** | cross-repo | content | — | Consumer-adoption ledger (W34 port) — the `{receiver, close-gate}` cross-walk; discharge the 12 speedtest stale imports | `proof:consumer-staleness` flips born-RED → GREEN (0 stale imports OR each carries an explicit `{receiver-wave, close-gate}`); the ledger doc exists and is the cited input to W6's carry-closure |
| **AY.W6** | close | gate | W1,W2,W3,W4,W5,W8 | The terminal close — `proof:ay-final` + `FINAL.md` + overfitting audit + inheritance cross-walk (`archive/`) + 8th budget rebaseline + gate-fleet meta-sweep + README currency; re-anchor all stale version arithmetic | `proof:ay-final` born-RED→GREEN aggregating every clause; `FINAL.md` + `archive/<item>.md` exist; budget rebaselined for glass-first CSS; carry-closure returns 0 un-receivered carries; the 4 READMEs zero `(planned — *)` for landed work |
| **AY.W7** | publish | mechanical | W6 | The publish hinge — master-merge the AY line + provenance-clean tag-publish (USER-DOMAIN, confirm-first) | `master` contains the AY cut; `npm view @mkbabb/glass-ui version` == the AY cut; `release.yml` provenance publish green from master (per MEMORY `project_publish_ci_broken`) |
| **AY.W8** | triage | content | — | Residual-planned umbrella — triage W20/W21/W28-W32/W35/W39/W41/W42/W43/W49 into AY sub-waves OR explicit defer-with-trigger (no silent carry) | Every residual AX `planned` wave exits AY as ADDRESSED-at-AY.W# / RETIRES-with-rationale / DEFERS-with-`{trigger}`; `proof:disposition-live` + the W6 carry-closure see zero phantom-owner rows |

### Wave detail

#### AY.W0 — Owed-DELTA capture sweep
- **Track / type / depends:** visual · gate · (none — Batch 0, lands first).
- **Defect:** PROGRESS rows W19 (`AX.W19`, `dev-landed · live-pending (DELTA owed)`) +
  W56 (`AX.W56`, same) — gates green, the `.png` DELTA capture owed. Live-confirmed in
  PROGRESS.md lines 63 + 103.
- **Objective:** Capture the two owed live DELTAs so both rows flip to `live-verified`
  and the ledger gate is satisfiable over them. This is the cheap first move that drains
  the only remaining owed-DELTA backlog before the structural work.
- **Files/edit-sites:** `docs/tranches/AX/PROGRESS.md` (flip 2 rows);
  `docs/tranches/AX/audit/visual/W19-DELTA.md` + `W56-DELTA.md` + paired `.png`
  (NEW captures, per the live-verify-capture discipline — screenshot + paired-π, not a
  commit-message claim).
- **HARD GATE:** Both rows read `live-verified` with an on-disk DELTA `.md` + `.png`;
  `proof:live-verified-ledger` GREEN over both (the ci-tagged static proof now has its
  evidence). Bite: delete a `.png` → the ledger gate goes RED.

#### AY.W1 — TS/Vue god-module carves
- **Track / type / depends:** encapsulation · refactor · AY.W0.
- **Defect:** Four files over the 500-line `proof:no-god-module` budget, live at the
  GOLDEN counts: `src/components/custom/goo-blob/composables/useMetaballRenderer.ts`
  **694**, `src/components/custom/tabs/SegmentedTabs.vue` **689**,
  `src/components/custom/dock/GlassDock.vue` **608**,
  `src/components/custom/constellation/constellationField.ts` **510**.
- **Objective:** State-encapsulation carves per AX.W26 — extract pure leaves
  (per-frame upload / program-build for metaball; the indicator-engine + responsive-collapse
  for tabs; derived-state `computed()` + morph-orchestrator handoff for dock; the field-math
  leaf for constellation), each public return shape byte-identical. SURGICAL, not a rebuild
  (the composables/state layer is exemplary per AX §4 note 10).
- **Files/edit-sites:** the four files above + their new sibling sub-modules (e.g.
  `goo-blob/composables/{metaball-program.ts,uploadMetaballUniforms.ts}`); the AX.W26
  RED-witness-2 dock derived-state hand-sync trap (`useDockState.ts` 19 mutations vs 13
  `syncDerived()` — replace with `computed()`).
- **HARD GATE:** `proof:no-god-module` TS/Vue arm GREEN (all four under 500); `typecheck`
  0; every existing per-surface proof/unit gate (`proof:tabs-unified`, `proof:dock-*`,
  the blob/constellation gates) stays GREEN — the carve changes no public surface.

#### AY.W2 — CSS monolith carves + `.css`-aware gate-extension
- **Track / type / depends:** encapsulation · refactor · AY.W1.
- **Defect:** `proof:no-god-module` is `tags: ["local"]` (gates.mjs:387) AND `.css`-blind
  (collector accepts only `.ts`/`.vue` per AX.W25a RED-witness-1) — so the CSS monoliths
  (tokens.css, utilities.css, glass.css) ship structurally invisible, and the gate never
  runs in CI.
- **Objective:** Carve the CSS monoliths into cohesive `@import`-root partials (the
  AX.W06 `dock.css → dock/*` precedent), extend the gate collector to scan `.css`, and
  **promote `proof:no-god-module` to `["local","ci"]`** so the budget is CI-enforced from
  AY forward.
- **Files/edit-sites:** `src/styles/{tokens,utilities,glass}.css` (carve into partials,
  preserve `index.css` cascade order); `scripts/proof-no-god-module.mjs:47` (collector);
  `scripts/gates.mjs:387` (tag promotion).
- **HARD GATE:** `proof:no-god-module` is `.css`-aware AND `["local","ci"]`-tagged and
  GREEN over the whole tree; the `/styles` bundle is byte-equivalent (cascade order
  unchanged — a CSS-output diff is empty); `gates:verify-ci` GREEN (ci.yml regenerated).

#### AY.W3 — Legacy-gate hardening + commentary sweep
- **Track / type / depends:** hardening · gate · AY.W2.
- **Defect:** `proof:no-retired-survivor` authored at AX.W21 but NOT registered
  (`grep -c no-retired-survivor package.json` → 0); no `proof:tag-parity` (the AX.W33
  RED-witness-2 found 12 `proof-*.mjs` orphans with no `package.json` key); no
  `proof:var-in-arbitrary-guard`; `proof:no-legacy-commentary` is `["local"]` scoped to
  `api/index.ts` + `src/index.ts` only.
- **Objective:** Land AX.W27a/W27b — register `proof:no-retired-survivor`, add
  `proof:tag-parity` (every `proof-*.mjs` ↔ a `package.json` key) + `proof:var-in-arbitrary-guard`,
  widen `proof:no-legacy-commentary` full-tree, finalize the Card stale-prop, fix the
  scripts test-boundary.
- **Files/edit-sites:** `scripts/gates.mjs` (register 3 gates); `scripts/proof-tag-parity.mjs`
  + `proof-var-in-arbitrary-guard.mjs` (NEW); `scripts/proof-no-legacy-commentary.mjs`
  (widen scope); Card `index.ts`/`Card.vue` (stale-prop finalize).
- **HARD GATE:** All four gates registered with correct local/ci tags + GREEN;
  `proof:tag-parity` asserts the AX.W33 12-orphan sweep now returns 0; full-tree legacy
  commentary sweep GREEN; `gates:verify-ci` GREEN.

#### AY.W4 — Live-gate CI decision (the cardinal-lesson residual)
- **Track / type / depends:** infra · gate · (none — parallel; its OUTCOME informs W6's
  gate-tag policy).
- **Defect:** 18 gates are `["local"]`-tagged; the 11 π/Playwright live gates
  (`substrate-paints-color`, `dock-animation-live`, `aurora-painterly-statistics`,
  `tabs-unified`, `dock-orchestrator-single`, `dock-wrap-content-driven`, `font-cascade-live`,
  `deck-progress-rail`, `squircle-language`, `glass-material-demo`, `blob-live-truth`) were
  re-tagged local at `06fe5e2`. CI relies on the static `proof:live-verified-ledger`.
  Residual gap: a regression breaking a painting surface ships green if a stale DELTA `.png`
  remains on disk — the live truth is never re-executed server-side.
- **Objective:** DECIDE the π-gate-in-CI infra question the AX.W33 spec contemplated.
  **Branch A:** keep local-only + the ledger; record the rationale as a binding precept
  (the ledger IS the CI-side proof that live-verification happened; a clean runner has no
  GPU). **Branch B:** stand up a SwiftShader/Dawn headless lane (or a scheduled real-GPU
  runner) so at least `substrate-paints-color` + `dock-animation-live` re-execute
  server-side.
- **Files/edit-sites:** `docs/tranches/AY/audit/W4-live-gate-ci-decision.md` (DECISION);
  Branch A → `docs/precepts/` addition; Branch B → `.github/workflows/ci.yml` + a headless
  GPU harness + the 2 gate re-tags in `scripts/gates.mjs`.
- **HARD GATE:** A DECISION doc with the chosen branch. Branch A: the ledger-only rationale
  is a cited precept and `proof:live-verified-ledger` stays the sole CI live-proof.
  Branch B: a green CI job re-runs `substrate-paints-color` + `dock-animation-live` against
  a headless GPU; the "stale-DELTA-over-broken-surface" residual is explicitly closed in
  either branch (no silent punt).

#### AY.W5 — Consumer-adoption ledger (W34 port)
- **Track / type / depends:** cross-repo · content · (none — but a hard input to W6).
- **Defect:** AX.W34 (cross-constellation idiom + consumer-adoption ledger) is `planned`;
  `proof:consumer-staleness` is registered and born-RED on 12 real speedtest stale imports
  across 4 sibling repos, pending W34's discharge.
- **Objective:** Author the `{receiver, close-gate}` consumer-adoption ledger (the primary
  input to W6's carry-closure gate), and discharge the 12 stale imports — either the
  consumers migrate to the AY surface (SegmentedTabs etc.) or each stale row carries an
  explicit `{receiver-wave, close-gate}` terminal.
- **Files/edit-sites:** `docs/tranches/AY/audit/W5-consumer-adoption-ledger.md` (NEW);
  the speedtest consumer migration sites (cross-repo, coordination-doc-gated);
  `scripts/proof-consumer-staleness.mjs` (the staleness list).
- **HARD GATE:** `proof:consumer-staleness` flips born-RED → GREEN — 0 stale imports OR
  every remaining one carries an explicit `{receiver-wave, close-gate}`; the ledger doc
  exists and is cited by `proof:ay-final` (the carry-closure clause).

#### AY.W6 — The terminal close
- **Track / type / depends:** close · gate · AY.W1, W2, W3, W4, W5, W8 (ENUMERATED — the
  antidote to the AW.W33 renumber-drift; LAST, HARD-gated terminal).
- **Defect:** The whole close is unbuilt (live-confirmed): `proof-ax-final.mjs` ABSENT,
  `FINAL.md` ABSENT, `docs/tranches/AX/archive/` ABSENT; `proof:no-retired-survivor`
  unregistered (→ W3); no overfitting audit; no inheritance cross-walk; no budget
  rebaseline; the 4 READMEs (aurora/goo-blob/dock/constellation) carry stale `(planned —)`
  prose for landed work; the W33 version arithmetic targets a superseded 3.8.0/3.7.0
  lineage.
- **Objective:** Build the AY close as a concrete HARD-gated terminal wave (port the W33
  scope, re-anchored to AY): register the full AY gate-fleet + a fleet meta-assertion,
  author `proof:ay-final` aggregating the close, sweep the 4 READMEs planned→landed against
  live π captures, run the overfitting audit (every `src/` artefact ≥2 sites OR exported OR
  demo/test helper), cross-walk the AX §13/§14 deferrals to ADDRESSED/RETIRES/ARCHIVES into
  `docs/tranches/AY/archive/`, rebaseline the budget for glass-first CSS (the LAST pre-tag
  act), run the carry-closure gate (0 un-receivered carries), and reconcile `FINAL.md`
  honestly. **Re-anchor every version assertion** (the stale `npm view == 3.8.0`) to the AY
  cut.
- **Files/edit-sites:** `scripts/proof-ay-final.mjs` + the meta-sweep gates (NEW);
  `package.json` (register the fleet); `docs/tranches/AY/FINAL.md` + `archive/<item>.md`
  (NEW); `src/components/custom/{aurora,goo-blob,dock,constellation}/README.md` (currency
  sweep); the budget baseline file (`profile:budget` rebaseline).
- **HARD GATE:** `proof:ay-final` born-RED→GREEN aggregating every clause; `FINAL.md` +
  `archive/` exist; the budget is rebaselined and `profile:budget --enforce` GREEN; the
  carry-closure meta-assertion returns 0 un-receivered carries; the 4 READMEs have zero
  `(planned — *)` for landed surfaces (a currency assertion that fails at HEAD passes after);
  zero stale version assertions remain. A tranche provably cannot ship without this green.

#### AY.W7 — The publish hinge (USER-DOMAIN)
- **Track / type / depends:** publish · mechanical · AY.W6 (confirm-first; USER-DOMAIN).
- **Defect:** `master` @ `c6244e2` (docs-only) does not contain v3.9.0 or any W44-W63
  commit; HEAD is 31 ahead. GOLDEN §C Batch 9 ends with "provenance-clean master-merged."
- **Objective:** Master-merge the AY line and run the gated provenance publish (per MEMORY
  `project_publish_ci_broken`: push the `v*` tag, `release.yml` does the gated provenance
  publish from master). This is the single irreversible leg — USER-DOMAIN, confirm-first.
- **Files/edit-sites:** the master-merge (orchestrator/user); the `v*` tag; `release.yml`
  (the existing gated provenance flow — no edit expected).
- **HARD GATE:** `master` contains the AY cut; `npm view @mkbabb/glass-ui version` == the
  AY cut; `release.yml` ran green with npm provenance from master (G-5). Agents do not
  execute this leg.

#### AY.W8 — Residual-planned umbrella
- **Track / type / depends:** triage · content · (none — parallel; feeds W6's carry-closure).
- **Defect:** A long residual AX `planned` set: W20/W21 (primitive fix/recategorize),
  W28/W29 (speedtest native-first + repatriation prune), W30/W31/W32 (slides
  baseline/reframe/deploy), W35 (keyframes prune + migration DAG), W39 (lighthouse route
  matrix), W41 (publisher cross-repo supplier-edge), W42 (liquid-morph substrate), W43
  (fourier-field first-class), W49 (math-paper × latex-paper). All `planned`.
- **Objective:** Triage each into an AY sub-wave (if AY admits the scope) OR an explicit
  defer-with-named-trigger (if it does not) — no item is silently carried, per P-inv-28.
  W34 is already pulled forward as W5 (its carry-closure input is load-bearing for W6).
  The DISPOSITION book/archive rows ride here too: `native-drawer-as-asChild` stays a
  WATCH row (`min-consumers n:2` un-MET); the 2 ARCHIVED rows stay archived.
- **Files/edit-sites:** `docs/tranches/AY/audit/W8-residual-triage.md` (NEW — the
  disposition table for every residual wave); `DISPOSITION-REGISTER.json` (carry the book
  rows).
- **HARD GATE:** Every residual AX `planned` wave exits AY as ADDRESSED-at-AY.W# /
  RETIRES-with-rationale / DEFERS-with-`{trigger}`; `proof:disposition-live` GREEN (no
  book/archive trigger newly MET); W6's carry-closure sees zero phantom-owner rows.

---

## §3 — Standing gate re-evaluation (no wave owed)

- `native-drawer-as-asChild` — BOOK, `min-consumers n:2` on `dialog-native|GlassDialogNative`.
  Re-evaluates **un-MET** among present consumers each close (muster absent; speedtest does
  not import dialog-native). `proof:disposition-live` confirms un-MET. Carried as a WATCH
  row in W8; actioned only if a 2nd real consumer appears.
- `panel-host-primitive`, `interruptible-reorder` — ARCHIVED; stay archived.

---

*End of DRAFT — author review pending. Numbering (W0-W8) is provisional; finalize against
the GOLDEN batch DAG and the residual-triage outcome before opening the execution phase.*
