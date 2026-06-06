# AV.W17 — speedtest-ownership coordination

## 2. State

**Name**: W17 — speedtest-ownership coordination
**Opens after**: AV.W14 (the `proof:no-orphan-composable` born — W17 cross-references that gate's no-orphan invariant and extends it to the speedtest-origin set). AT-disjoint; non-publish-blocking coordination + name-forward.
**Agents**: 1 serial — a single doc-authoring + consumer-verify lane. No src write, no parallel split.
**Hard gate**: `proof:speedtest-boundary` SPECIFIED born-RED-on-orphan (every glass-ui composable in the speedtest-origin set has ≥2 genuine glass-ui consumers OR is removed; no app-specific orphan survives); the stay-vs-move ledger is grounded against HEAD consumer-greps; the name-forward asks to the speedtest session are recorded inv-16-clean (glass-ui writes no speedtest source).
**Status**: planned

**Type:** coordination + name-forward (DEVELOPMENT-only; this wave authors ONE doc — the ownership spec. It writes NO src, mutates NO git, runs NO publish. The glass-ui-side dispositions it names are EXECUTED by a later IMPL wave, not here.)
**Scope source:** `docs/tranches/AV/audit/reinvent/ios26-partial-digest.md §3` (THE SPEEDTEST-OWNERSHIP, the five-lane audit: inventory · repo-audit · scheduling · breakpoint · boundary-spec). The user's framing: *"why do we have speedtesting primitives in glass-ui? Those should be owned by speedtest totally — audit that repo and devise that."* This file is the fully-formed coordination spec; the HEAD consumer-greps below CORRECT two stale digest claims (§11).

**Precepts in force.** No legacy / no back-compat aliases — a moved composable is REMOVED, not aliased (clean break, house no-backwards-compat rule; MIGRATION.md documents the return). Visual-/visual-load-bearing-ness (J inv 10) — a composable ships from glass-ui ONLY when ≥2 genuine glass-ui consumers; below the bar it is removed or moved. inv-16 — glass-ui writes ONLY glass-ui source + `docs/tranches/AV/`; the speedtest moves are NAME-FORWARD asks the speedtest session executes, never a cross-repo edit. The honest principle: **the ≥2-consumer bar — not the ORIGIN — decides ownership.** A speedtest-origin primitive glass-ui genuinely consumes twice STAYS as CORE; one glass-ui does not consume moves back. Origin is provenance, not title.

## 2a. Goal criterion

This wave succeeds if the speedtest-origin composable set has a single grounded ownership ledger — every entry is STAY-as-CORE (a general web-platform primitive with ≥2 genuine glass-ui consumers) or MOVE-to-speedtest (app-specific OR orphaned in glass-ui), with the verdict backed by a HEAD consumer-grep — AND the boundary contract (what speedtest consumes from glass-ui CORE vs what speedtest owns) is named, AND the `proof:speedtest-boundary` gate is SPECIFIED so a future orphan trips it. The reader's test: a maintainer reads the ledger, runs the cited grep, and reaches the SAME verdict for each composable; the user's question (*"why do we have speedtesting primitives in glass-ui?"*) is answered with a per-composable disposition, not a blanket purge.

## 3. Scope

The eight speedtest-origin composables, each ledgered against a HEAD consumer-grep. Numbered, concrete:

1. **The STAY-vs-MOVE ledger (the headline).** For each speedtest-origin composable, the disposition + the grounding grep. STAY-as-CORE requires a GENERAL web-platform primitive AND ≥2 genuine glass-ui consumers (or public-export / demo-private-importer counting per the overfit bar). MOVE-to-speedtest is the verdict for an app-specific pattern OR a composable with no genuine glass-ui consumer. The table sits at §A below.
2. **The ownership principle, stated plainly.** ≥2-consumer-not-origin. A speedtest-origin primitive that glass-ui genuinely uses twice STAYS CORE regardless of where it was born; one glass-ui never reaches MOVES back. Provenance does not confer ownership; the consumer bar does. This is the resolution of the digest's inventory-vs-scheduling-lane conflict (the inventory lane's bar is sharper and wins).
3. **The name-forward asks (inv-16; glass-ui can't write speedtest).** For each MOVE item: the ask to the speedtest session (land the composable + tests in speedtest, repoint local imports, confirm no third repo consumes it) AND the glass-ui-side disposition (REMOVE the composable from the `src/composables/` barrel + the subpath barrel + `src/api/` + `package.json` exports IFF it has no glass-ui consumer; if glass-ui DOES consume it ≥2, it STAYS regardless of origin). §C below.
4. **The boundary contract.** The speedtest↔glass-ui edge: what speedtest consumes from glass-ui CORE (subpath-routed, never root for the heavy families) vs what speedtest owns (the app Dock facade, the metric/stagger animation patterns). inv-16 holds — glass-ui writable, speedtest READ-ONLY here; glass-ui → speedtest one-way. §D below.
5. **The gate spec.** `proof:speedtest-boundary` — every glass-ui composable in the speedtest-origin set has ≥2 genuine glass-ui consumers OR is removed; no app-specific orphan. Cross-references `proof:no-orphan-composable` (AV.W14). §6.

This wave authors the doc ONLY. It does not move a composable, does not edit a barrel, does not register the gate in `package.json`. Those are a later IMPL wave's work, gated on this spec.

## 3a. Triumvirate Dispatch

A triumvirate (research + plan augment + redress) is mandatory — the orchestrator may NOT redispatch alone — when:

- **A consumer-grep contradicts a ledger verdict at execution time.** If the future IMPL wave's grep finds a genuine glass-ui consumer for a composable this spec marked MOVE (or finds an orphan for one marked STAY), the ledger is wrong, not the code — halt and re-derive the disposition. The grep is the source of truth; the spec's verdict is provisional on it.
- **A MOVE item turns out to have a third-repo consumer.** If a name-forward grep across the constellation (value.js demo, keyframes demo, slides) finds a SECOND repo consuming a MOVE candidate, the ≥2-DISTINCT-repo bar is MET and the item becomes a genuine CORE primitive — halt the MOVE, re-ledger as STAY. (None found at HEAD; this is the guard.)
- **The boundary gate cannot be authored without false-RED-ing a legitimate internal-only consumer.** A composable consumed once internally + once via a demo-private importer is NOT an orphan (the overfit bar counts demo-private). A gate that reddens that case is a plan defect — halt and encode the demo-importer-counts rule.
- **Any diagnostic loop reaches its third iteration** on a consumer-count dispute — halt, do not iterate a fourth time.

## 4. File Bounds

| File | Access |
|---|---|
| `docs/tranches/AV/waves/AV.W17-speedtest-ownership.md` | create (THIS file — the only write) |

Do NOT touch: any `src/` file (the moves/removes are a later IMPL wave) · `package.json` / `src/api/index.ts` / any subpath barrel (the gate registration + the removals are downstream) · `scripts/` (the `proof:speedtest-boundary` script is AUTHORED by the IMPL wave, SPECIFIED here) · `docs/precepts/**` (READ-ONLY) · the speedtest repo source (READ-ONLY, name-forward only — inv-16) · any git index (NO stage/commit/stash).

### §A — The stay-vs-move ledger (HEAD-grounded)

Eight speedtest-origin composables. Disposition + the consumer-grep that grounds it. "Genuine consumer" = a non-test, non-self, non-barrel `import`/call site in glass-ui `src/` OR `demo/` (demo-private importer counts per the overfit bar); a public subpath EXPORT also passes the overfit bar (a documented public surface is load-bearing by contract). The ≥2-DISTINCT-repo bar is the higher CORE-ship bar the digest's inventory lane applies for cross-repo de-dup.

| Composable | Subpath | Genuine glass-ui consumers (HEAD grep) | Disposition | Rationale |
|---|---|---|---|---|
| `useYieldToMain` / `yieldToMain` | `/motion-core` | **1** — `useRAFLoop.ts:14` imports `yieldToMain` as its INP-cede lever (`controls.yieldToMain()`). `usePrioritizedTask` references it in comments only (no import). | **STAY CORE** | A pure `scheduler.yield` wrapper, feature-detected, engine-free — a general web-platform primitive. It has ONE genuine internal consumer (`useRAFLoop`), but `useRAFLoop` is itself a multi-consumer CORE substrate, so `yieldToMain` is load-bearing through it; AND it is part of the `/motion-core` public surface (export passes the overfit bar). STAY by the general-primitive + transitive-load-bearing test. NOT a speedtest pattern. |
| `usePrioritizedTask` / `postTaskSafe` | `/motion-core` | **0** — no glass-ui call site. `platformSupport.ts:8-21` references it in COMMENTS only; the dock/aurora do NOT consume it (grep clean: `src/components/custom/dock/` + `aurora/` have zero `postTask`/`usePrioritizedTask` hits). No demo importer. | **STAY CORE (export-load-bearing) — RE-MUSTER FLAG** | The digest claims "dock/aurora consume them" — **STALE; corrected against HEAD** (§11). `postTaskSafe` is a pure `scheduler.postTask` wrapper with a MessageChannel fallback, zero domain logic — a general primitive, and it is on the `/motion-core` public surface (export passes the overfit bar) and is locked by `proof:supports-post-task-wired`. So it STAYS as a documented public CORE primitive. BUT it has NO internal consumer at HEAD: flag it for the `proof:speedtest-boundary` re-muster — if the public-export lock is the ONLY thing holding it, the IMPL wave decides keep-as-public-primitive vs move (the export bar holds it CORE today; the flag records the thin grounding). |
| `useBreakpoint` | `/dom` | **0** — no glass-ui consumer. `ResponsiveTabs.vue:90-91` hand-rolls its OWN `window.matchMedia` rather than consuming `useBreakpoint`. No demo importer. | **MOVE → speedtest** | The digest cites a "2-consumer promotion trigger (SurveyWizard + AdminDataSourceToggle)" — both are SPEEDTEST consumers, not glass-ui. Reactive matchMedia is a general primitive, BUT glass-ui itself never consumes it (the one plausible site, `ResponsiveTabs`, hand-rolls its own) and it is NOT on a public subpath surface as a documented primitive beyond the `/dom` barrel re-export. Single-repo (speedtest only) → MOVE. If glass-ui ever wants it, `ResponsiveTabs` adopting it would make it a genuine internal consumer and re-ledger it STAY. |
| `useIdleReady` | `/dom` | **0** — no glass-ui consumer. No demo importer. (`useViewportReady.ts` references it in comments only.) | **MOVE → speedtest** | `requestIdleCallback` post-mount gate — a general lazy-mount primitive, but glass-ui has ZERO genuine consumers (the 5-site promotion was all speedtest). Orphan in glass-ui → MOVE. Note: AV.W5 separately considers extracting `useIdleSchedule` from `useAurora`'s `scheduleAfterFirstPaint` IFF a 2nd consumer — that is a DISTINCT aurora-origin primitive, not this speedtest-origin one; do not conflate. |
| `useViewportReady` | `/dom` | **0** — no glass-ui consumer. No demo importer. | **MOVE → speedtest** | Two-stage IO + rIC heavy-widget hydration gate — general in shape, but a glass-ui orphan (2-site promotion was all speedtest). MOVE. |
| `useStagger` | `/motion-core` | **0 internal** — `useStaggerReveal` does NOT call it (grep: `useStaggerReveal.ts` hand-rolls its own `setTimeout(staggerMs * idx)` ramp, no `useStagger` import). **3 demo-private importers** — `demo/stories/composables/use-stagger.vue`, `use-stagger-reveal.vue`, `demo/stories/motion/stagger.vue`. Public-exported on `/motion-core` + root barrel. | **MOVE → speedtest** (digest verdict) — **with a glass-ui-retains caveat** | The digest sources the climax row-tint cascade from `SpeedtestResults.vue:251-267` and verdicts MOVE: a speedtest test-flow animation PATTERN, single-repo, not a zero-domain browser API. The demo-private importers pass the OVERFIT bar (so it is not a bare orphan), and the public export holds it CORE by contract. **Resolution:** because glass-ui's OWN demo consumes it AND it is public-exported, the strict reading is that it STAYS as a public CORE primitive by the export-bar — but the digest's cross-repo de-dup test (zero-domain AND ≥2 DISTINCT repos) is the sharper bar for the CONJOINT union, and it fails both. The IMPL wave reconciles: KEEP as a glass-ui public stagger primitive (the demo + export ground it) OR honor the digest MOVE if the demo story is retired alongside. Flag for re-muster; default to the digest MOVE only if the demo importers are dropped in the same change (else the removal orphans the demo). |
| `useAnimatedNumberMap` | `/motion` | **0 internal** — no glass-ui call site. **1 demo-private importer** — `demo/stories/composables/use-animated-number-map.vue`. Public-exported on `/motion` + root barrel (`src/api`? no — `motion.ts` barrel, 2 hits). | **MOVE → speedtest** (digest verdict) — **with the same retain caveat** | The digest verdicts MOVE: solves speedtest's `MetricPillCluster.vue:125-134` fan-out specifically — a metric-smoothing PATTERN, used only in speedtest. The demo importer + public export hold it CORE by the overfit/export bar today. Same reconcile as `useStagger`: the cross-repo de-dup bar fails (single-repo, domain-coupled), so the digest MOVE stands FOR THE UNION, but the glass-ui removal must drop the demo story in the same change or it orphans the demo. Flag for re-muster. |
| `useViewTransition` | `/motion` (also root-barrel-safe via `/motion-core`) | **multiple** — `document.startViewTransition` wrapper; the M5 dock single-plane morph fold (AV.W3) is a named consumer; muster J.W5 cross-repo coupling. | **STAY CORE** | A general View-Transitions browser-API wrapper, root-barrel-safe (SCC-trap-free), NOT speedtest-owned. STAY by the general-primitive + ≥2-consumer test. (Listed for completeness — the digest counts it among the speedtest-origin promotions but it is the clearest STAY.) |

**The honest summary.** Three clean STAYs (`useYieldToMain`, `useViewTransition`, and `usePrioritizedTask` by the export bar), three clean MOVEs (`useBreakpoint`, `useIdleReady`, `useViewportReady` — glass-ui orphans), and two RE-MUSTER MOVEs (`useStagger`, `useAnimatedNumberMap` — held CORE today only by the demo-importer + public-export bar, verdicted MOVE for the conjoint union, conditional on retiring the demo story in the same change). The digest's six-STAY/two-MOVE headline is REFINED by HEAD: `usePrioritizedTask` has no internal consumer (the digest's dock/aurora claim is stale) and the three `/dom` gates are glass-ui orphans, not load-bearing CORE.

### §B — The ownership principle (stated plainly)

The bar — not the origin — decides ownership.

- A speedtest-ORIGIN composable that glass-ui genuinely consumes ≥2 times (or exports as a documented public primitive) STAYS as glass-ui CORE. Where it was born is provenance, not title.
- A composable — speedtest-origin or otherwise — that glass-ui never genuinely consumes is an ORPHAN; it is removed, and if a sibling owns the domain it is moved there.
- The CROSS-REPO de-dup bar (the conjoint-union test, sharper than the single-repo overfit bar) is: zero domain coupling AND ≥2 DISTINCT consumer REPOS. A primitive that is a browser-API wrapper with a feature-detected fallback clears it; a single-repo animation PATTERN (stagger cascade, metric smoothing) does not — even when it is public-exported, because the export is glass-ui-internal contract, not a second repo.

This resolves the digest's inventory-vs-scheduling-lane conflict: the inventory lane's bar (zero-domain AND ≥2 distinct repos) is sharper and WINS for the union. `useStagger` and `useAnimatedNumberMap` fail it (single-repo, domain-coupled patterns) and MOVE; the browser-API wrappers pass it and STAY.

### §C — Name-forward asks (inv-16; glass-ui writes no speedtest source)

For the MOVE items — glass-ui cannot write speedtest, so these are ASKS the speedtest session executes, paired with the glass-ui-side disposition the later IMPL wave performs.

**Asks to the speedtest session (speedtest-owned; READ-ONLY here):**

1. Land `useBreakpoint`, `useIdleReady`, `useViewportReady` in speedtest (`speedtest/src/composables/dom/` — move + tests). These are the three clean glass-ui orphans; speedtest is their sole consumer.
2. For the two RE-MUSTER MOVEs (`useStagger`, `useAnimatedNumberMap`): land them in speedtest (`speedtest/src/composables/motion/` — move + tests) ONLY in lockstep with the glass-ui removal that also retires the demo story; repoint speedtest's local imports to local ownership.
3. Re-export hygiene: confirm no THIRD repo (value.js demo, keyframes demo, slides) consumes any MOVE item — grep the constellation. (The digest's inventory lane verified zero external consumers; this re-confirms at IMPL time. A second-repo hit re-ledgers the item STAY per §3a.)

**glass-ui-side dispositions (a later IMPL wave executes — NOT this wave):**

1. REMOVE the three `/dom` orphans (`useBreakpoint`, `useIdleReady`, `useViewportReady`) from `src/composables/dom/index.ts` + the `/dom` subpath barrel + `src/api/index.ts` (if listed) + `package.json` exports (if a dedicated entry) — IFF they have no glass-ui consumer (confirmed at HEAD).
2. For `useStagger` / `useAnimatedNumberMap` — REMOVE from `composables/motion/core/index.ts` (`useStagger`) + `composables/motion/index.ts` (`useAnimatedNumberMap`) + the `/motion` / `/motion-core` barrels + root barrel + `src/api/` + `package.json` exports, AND retire the demo stories in the SAME change (else the removal orphans the demo). Default to the digest MOVE only when the demo retire is in scope; else re-muster and hold.
3. KEEP `useYieldToMain`, `usePrioritizedTask`, `useViewTransition` — they STAY CORE. (`usePrioritizedTask` carries the RE-MUSTER FLAG: its only grounding is the public export + `proof:supports-post-task-wired`; the IMPL wave records that thin grounding but keeps it as a documented public primitive.)
4. CHANGELOG + MIGRATION.md: document each return as a CLEAN BREAK (no legacy alias — house no-backwards-compat rule).
5. Extend the speedtest-side `check-glass-ui-boundary` ask: assert dark/forms/motion are never root-exported (closes the SCC-regression class the repo-audit lane flagged) — speedtest-owned, name-forward.

### §D — The boundary contract (speedtest ↔ glass-ui)

inv-16 holds: glass-ui writable + speedtest READ-ONLY in this wave; the edge is glass-ui → speedtest one-way, PUBLISHED-SURFACE only (never a branch pin, never a reverse import).

**What speedtest consumes from glass-ui CORE (subpath-routed):** the dock family (`GlassDock`, `DockLayer`, `DockLayerGroup`, `DockIconButton`, `DockSelectTrigger`, `DockDropdownTrigger`, `useDockState`, `useLayerTransition`), the base UI primitives (Button, Card, Dialog, Sheet, Tabs, Select, Slider, Skeleton, …), the promoted components (`AnimatedDigit`, `MetricCell`, `MetricStack`/`Row`, `ResponsiveTabs`), `/motion-core` (`useRAFLoop`, `useIntersectionPause`, `useScrollProgress`, the View-Transitions seam), and the STAY composables. The repo-audit lane confirms `check:boundary` returns ZERO violations: all 45 subpath imports correctly routed (`from "@mkbabb/glass-ui/dock"`, never root for the heavy families); the only root import is `Skeleton` (root-barrel-approved).

**What speedtest OWNS (app-specific, stays in speedtest):** the speedtest Dock FACADE (`SpeedtestStatus` / `SurveyDockState` — app-specific role chrome over the generic `GlassDock`), the survey/admin flows (`SurveyWizard`, `AdminDataSourceToggle` — the `useBreakpoint` consumers), the metric/result animation patterns (`SpeedtestResults` row-tint cascade, `MetricPillCluster` fan-out — the `useStagger`/`useAnimatedNumberMap` consumers), and after the MOVE the five moved composables. `DockLayerGroup`/`GlassDock` STAY in glass-ui as generic layout primitives; only the ROLE-named facades are speedtest-owned (the README no-`<Role>Dock`-component rule).

The boundary is CLEAN at HEAD (zero violations); this wave's MOVE asks REINFORCE it — they pull the app-specific patterns back to the owner so glass-ui CORE carries only the ≥2-consumer general primitives.

## 5. Agent Units

### AV.W17.A The speedtest-ownership coordination spec

- Goal: a single grounded ownership ledger — every speedtest-origin composable is STAY-as-CORE or MOVE-to-speedtest with a HEAD consumer-grep behind the verdict — plus the boundary contract, the name-forward asks, and the gate spec, so a maintainer reaches the same disposition from the doc and the user's *"why do we have speedtesting primitives in glass-ui?"* is answered per-composable.
- Mechanism: author THIS doc (`docs/tranches/AV/waves/AV.W17-speedtest-ownership.md`) with §A ledger (eight composables, each grep-grounded), §B principle (≥2-consumer-not-origin), §C name-forward (the MOVE asks + the glass-ui-side dispositions a later IMPL wave runs), §D boundary, §6 gate spec. Ground every verdict against a HEAD grep (the greps are cited inline in §A). Correct the two stale digest claims (§11). Write NO src; the dispositions are SPECIFIED for a downstream IMPL wave, not executed here.
- Files: `docs/tranches/AV/waves/AV.W17-speedtest-ownership.md` (create — the only write).
- Sub-gate: the doc exists with the five canonical sections (ledger · principle · name-forward · boundary · gate spec); every §A verdict cites its grep; `proof:speedtest-boundary` is SPECIFIED (born-RED-on-orphan, the bite named); the name-forward asks are inv-16-clean (no speedtest source write); `git diff --check` clean on the doc.

## 6. Hard Gate

W17 closes when every condition is evidence-backed:

1. **The doc exists** at `docs/tranches/AV/waves/AV.W17-speedtest-ownership.md` carrying the five canonical sections — the stay-vs-move ledger (§A), the ownership principle (§B), the name-forward asks (§C), the boundary contract (§D), and the gate spec (§6 here).
2. **Every ledger verdict is HEAD-grounded.** Each of the eight composables carries the consumer-grep behind its STAY/MOVE disposition. The two stale digest claims are corrected (§11): `usePrioritizedTask`'s dock/aurora consumers (grep clean — none) and the `/dom` gates' "promotion" framing (the promotion was speedtest-side; glass-ui has zero genuine consumers).
3. **`proof:speedtest-boundary` is SPECIFIED** (authored + registered by a downstream IMPL wave, NOT this doc-only wave). The spec: for every composable in the speedtest-origin set, ASSERT it has ≥2 genuine glass-ui consumers (non-test, non-self, non-barrel import/call site, OR a demo-private importer, OR a documented public subpath export) OR it is REMOVED from the barrels. No app-specific orphan survives. **Bite:** a composable that is barrel-exported with zero genuine consumer AND no public-export grounding → RED. Cross-references `proof:no-orphan-composable` (AV.W14) — that gate proves the general no-orphan invariant; `proof:speedtest-boundary` SPECIALIZES it to the speedtest-origin set + the boundary-routing assert (no speedtest-specific pattern is barrel-exported as CORE).
4. **inv-16 clean.** The name-forward asks (§C) are recorded as ASKS to the speedtest session; this wave writes NO speedtest source, NO glass-ui src, NO git mutation.
5. **No regression.** No existing gate is touched (doc-only wave); `git diff --check` clean on the single doc.

**Gate registration (manifest==ci — DEFERRED to the IMPL wave):** `proof:speedtest-boundary` is SPECIFIED here, REGISTERED in `package.json` + `gates.mjs` by the downstream IMPL wave AFTER the moves/removes land (a born-RED gate against un-moved barrels would violate manifest==ci). This doc-only wave registers NO gate.

## 7. Format And Lint Cadence

Docs-only wave — no formatter/linter runs against src (none touched). At close:

- `git diff --check` (whitespace / conflict-marker) on `docs/tranches/AV/waves/AV.W17-speedtest-ownership.md`.
- `npm run proof:doc-consistency` IF the IMPL wave later cites this doc from `CLAUDE.md` / `AV.md` — NOT run by this wave (this wave adds no doc-currency claim to CLAUDE.md; it is a wave spec under `docs/tranches/`).

No formatter is skipped that applies — the wave writes one Markdown doc; the grep-grounded ledger is the binding evidence.

## 8. Verification Artefacts

- The doc itself: `docs/tranches/AV/waves/AV.W17-speedtest-ownership.md` — the stay-vs-move ledger with inline grep citations.
- The HEAD consumer-greps behind §A (re-runnable: `grep -rn "<composable>" src/ --include="*.ts" --include="*.vue" | grep -v __tests__ | grep -v "<self>.ts" | grep -v "/index.ts"` plus the `demo/` arm) — the verdicts reproduce from them.
- `git diff --check` clean output on the doc — recorded at close in `PROGRESS.md` by the orchestrator (NOT written by this wave).

## 9. Commit Plan

This wave authors ONE doc and mutates NO git (the dispatch is read-only-git; the orchestrator owns the index). The expected checkpoint:

- **Orchestrator doc commit** — `docs(tranche-AV): W17 — speedtest-ownership coordination spec`. (Body required — names the stay-vs-move headline, the ≥2-consumer-not-origin principle, the two corrected stale digest claims.) Committed by the ORCHESTRATOR, not this agent.

No implementation commit (no src), no gate-registration commit (the gate is specified, registered downstream), no generated-output commit.

## 10. Dependencies

- **Depends on**: AV.W14 (`proof:no-orphan-composable` born — W17's `proof:speedtest-boundary` SPECIALIZES it). The `ios26-partial-digest.md §3` five-lane audit (the scope source). The HEAD consumer state of `src/composables/` (the greps in §A ground against it).
- **Blocks**: the downstream IMPL wave that EXECUTES the moves/removes + AUTHORS + REGISTERS `proof:speedtest-boundary` (this spec is that wave's grounding). The speedtest session's MOVE-execution (name-forward; gated on this spec's asks). Nothing publish-blocking — this is coordination, AT-disjoint with the 3.3.0 hinge.

## 11. Archaeology

Not a re-attempt of a prior failed wave. Three HEAD-grounding corrections fold in — they CORRECT stale digest claims against the HEAD consumer-greps, not prior-failure archaeology:

1. **`usePrioritizedTask` has NO dock/aurora consumer — the digest is stale.** `ios26-partial-digest.md:89` claims "the dock/aurora consume them." The HEAD grep is CLEAN: `src/components/custom/dock/` + `aurora/` have zero `postTask`/`usePrioritizedTask` hits, and the only `postTaskSafe`/`usePrioritizedTask` reference outside the file itself is a COMMENT in `platformSupport.ts:8-21`. `usePrioritizedTask` STAYS CORE by the PUBLIC-EXPORT bar (it is on `/motion-core` + locked by `proof:supports-post-task-wired`), NOT by an internal consumer — flagged RE-MUSTER so the thin grounding is recorded, not hidden.
2. **The three `/dom` gates are glass-ui ORPHANS, not load-bearing CORE.** The digest frames `useBreakpoint`/`useIdleReady`/`useViewportReady` as "promotions" with consumer triggers — but every cited trigger (SurveyWizard, AdminDataSourceToggle, the 5-site/2-site promotions) is SPEEDTEST-side. The HEAD grep finds ZERO genuine glass-ui consumers and ZERO demo importers; `ResponsiveTabs` (the one plausible `useBreakpoint` site) hand-rolls its OWN `matchMedia`. They are orphans → MOVE. The digest's "six STAY" headline over-counts by treating speedtest-side promotions as glass-ui consumers.
3. **`useStagger` does NOT back `useStaggerReveal` — the delay-ramp claim is mis-attributed.** `useStaggerReveal.ts` hand-rolls its own `setTimeout(staggerMs * idx)` ramp and does NOT import `useStagger`. So `useStagger` has ZERO genuine glass-ui internal consumers (only 3 demo-private story importers + the public export). The digest D1 fold (`useStagger.ts:135` + `useStaggerReveal.ts:68` composing keyframes `stagger()`) is a SEPARATE AV.W3 concern (the delay-ramp source), not a consumer relationship — recorded so the W17 MOVE verdict is not conflated with the W3 keyframes adoption.

The net correction: the digest's clean six-STAY/two-MOVE becomes three clean STAYs + three clean MOVEs (the `/dom` orphans) + two RE-MUSTER MOVEs (`useStagger`/`useAnimatedNumberMap`, held CORE today only by the demo-importer + export bar). The ≥2-consumer-not-origin principle (§B) is the through-line that makes every verdict reproducible from a grep.
