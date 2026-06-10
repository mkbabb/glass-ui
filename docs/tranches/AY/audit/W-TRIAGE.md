# AY.W-TRIAGE — residual AX `planned`-wave disposition table + the W-DECK lift decision

**State:** LANDED · **Repo:** glass-ui · **Band:** E (the AX close) · **Type:** triage (disposition table + machine register + one gate-script clause)

This is the human-source disposition table the machine mirror (`residual-disposition.json`) reflects and the
`proof:disposition-live` phantom-owner clause cross-checks. Every residual AX `planned` wave exits the AY
engagement ADDRESSED-at-a-real-AY-wave, RETIRES-with-rationale, or DEFERS-with-a-registered-trigger — no residual
rides forward as a one-line PROGRESS cell no machine reads.

---

## §1 — the residual AX `planned` set (the input)

`docs/tranches/AX/PROGRESS.md` carries fourteen `planned` rows at HEAD (W20/W21/W28/W29/W30/W31/W32/W34/W35/
W39/W41/W42/W43/W49). W34 is ALREADY pulled forward as **AY.W-CONSUMER** (the consumer-staleness ledger), so it
exits as ADDRESSED, recorded for completeness, not re-triaged. With the W-DECK deck-chassis lift question that is
**15 disposition rows** (14 AX waves + W-DECK).

---

## §2 — the disposition table (the W-TRIAGE.1 artefact, the Leg-4 reconciliation)

Every residual AX `planned` wave maps to exactly ONE disposition. The `ayWave` / `bookId` / `rationale` columns
are the machine mirror in `docs/tranches/AY/audit/residual-disposition.json`; the phantom-owner clause
re-verifies each ADDRESSED cell against the live `docs/tranches/AY/waves/` set + the `DISPOSITION-REGISTER.json`.

| AX wave | scope (AX title) | disposition | destination (machine field) |
|---|---|---|---|
| **W20** | primitive fix — native top-layer, card toggles, glass-panel retire | **ADDRESSED** | `ayWave: W-SB1` (native-top-layer fold + glass-panel-retire verdict ride the storybook per-route KEEP/FIX/RETIRE wave) + co-route `W-GLASS` (card-toggle glass cohesion). Primary = `W-SB1`. |
| **W21** | primitive recategorize — ledger/barrel coherence + metric reconcile | **ADDRESSED** | `ayWave: W-SB2` (metric co-location + barrel coherence) + co-route `W-GLASS` (configurator-root-barrel reconcile + drawer live-behind disambiguate). |
| **W28** | speedtest native-first receive | **DEFERS** | `bookId: speedtest-native-first-receive` — a CROSS-REPO consumer-side wave. glass-ui ships the substrate (`/metric-cell`, `/metric-stack`, `/instrument-chassis`); the RECEIVE is speedtest's. Trigger: `min-consumers n:2 grep:"metric-cell\|metric-stack\|instrument-chassis"` (booked, not AY-owned — inv-16). |
| **W29** | repatriation prune + orphan prune | **ADDRESSED** | `ayWave: W-SB1` (the orphan-COMPONENT prune — header-ribbon/glass-panel/useTokenColor orphans) + co-route `W-CONSUMER` (the cross-repo repatriation prune half — the consumer-staleness ledger discharges the repatriated-then-stale imports). |
| **W30** | slides baseline — constellation Canvas2D leak | **ADDRESSED** | `ayWave: L.W-ADOPT` (slides; the constellation Canvas2D leak IS the bespoke-engine defect the slides adopt-the-lib-constellation wave kills). The library-side fix is W-CON1/CON2/CON3 (already-shipped warp + the `?freeze` seam). |
| **W31** | slides content reframe + visual defects | **ADDRESSED** | `ayWave: L.W1` (slides; the 5/6/7 cohesive rebuild + the P0/P1 content reframe). |
| **W32** | slides motion-form adoption + deploy verify | **ADDRESSED** | `ayWave: L.W-ADOPT` (slides; motion-form adoption) + co-route `L.W5` (deploy verify). |
| **W34** | cross-constellation idiom + consumer-adoption ledger | **ADDRESSED** | `ayWave: W-CONSUMER` (pulled forward — the consumer-staleness ledger is W34's `proof:consumer-staleness` born-RED). Already folded; recorded here, not re-triaged. |
| **W35** | keyframes prune + migration DAG | **DEFERS** | `bookId: keyframes-prune-migration-dag` — a CROSS-REPO supplier-edge. glass-ui is the CONSUMER; the prune is keyframes.js-owned (USER-DOMAIN publisher). Trigger: `min-consumers n:2 grep:"@mkbabb/keyframes\.js/(migrate\|migration)\|keyframes-migration-dag"` (the migration-DAG ARTEFACT marker, NOT the generic keyframes.js import which every consumer carries). Booked, not AY-owned. |
| **W39** | lighthouse perf/a11y route matrix | **ADDRESSED** | `ayWave: W-A11Y-PERF` (the route-matrix perf/a11y — the frame-budget gate + the contrast oracle). A slides-side lighthouse run folds to `L.W5`. |
| **W41** | publisher cross-repo build supplier-edge | **ADDRESSED** | `ayWave: W-PUB1` (the publish hinge — the cross-repo build supplier-edge IS the publish→re-pin→adopt sequence). |
| **W42** | liquid-morph substrate | **ADDRESSED** (+ residue RETIRES) | `ayWave: W-DOCK2` (the `--dock-morph-t` axis-parametric morph driver — the liquid-morph substrate is the dock morph engine; W-DOCK2 carries the superellipse-k continuous family). The discrete-custom-shape-morph residue **RETIRES** (`retiresResidue`: matched-geometry-into-anything is not a web-platform capability — AX DOCK-FACILITIES §19.11 honest-narrow). Primary = `W-DOCK2`. |
| **W43** | fourier-field first-class | **ADDRESSED** | `ayWave: W-FF2` (LAND the intensity model — the `OUTLINE_PEAK_ALPHA` intensity fix + 3-substrate parity) + co-route `W-FF1` (rebase the born-RED W43 spec). Primary = `W-FF2`. |
| **W49** | math-paper composes latex-paper (D16) | **RETIRES** | `rationale:` latex-paper is a slides-editorial composition of the shipped `paper-backdrop`/`paper.css` substrate, not a glass-ui library primitive; 0 library-side consumers; the math-paper aesthetic is 1 slides deck. Re-opens iff ≥2 repos need a shared latex-paper primitive (booked nowhere — the substrate is sufficient). |
| **W-DECK** | the slides bespoke deck-chassis lift question | **DEFERS** | `bookId: deck-subpath`, `decision: keep-bespoke`, `consumerRepos: 1`. See §3. |

**Disposition tally (the machine mirror — `residual-disposition.json`):** ADDRESSED = 11 (W20, W21, W29, W30,
W31, W32, W34, W39, W41, W42-primary, W43); DEFERS = 3 (W28 speedtest-receive, W35 keyframes-prune, W-DECK
deck-subpath); RETIRES = 1 (W49 latex-paper). The W42 never-buildable custom-shape residue is recorded on the
W42 row's `retiresResidue` field (not a separate row — the substrate is ADDRESSED at W-DOCK2; the residue is the
honest-narrow). `residuals.length === 15`; every AX `planned` wave + W-DECK appears exactly once; no AX wave is
dispositioned twice.

---

## §3 — W-DECK — the deck-chassis lift decision (the W-TRIAGE.2 artefact)

**Decision: KEEP-BESPOKE — book the `/deck` lift; do NOT lift the chassis to `@mkbabb/glass-ui/deck` at AY.**

**Evidence (the load-bearing consumer count, live-verified 2026-06-10):**

- `slides/src/deck/` is a 15-file bespoke deck chassis (`ls`): `DeckPager.vue DeckSettings.vue DeckSlide.vue
  DeckView.vue captureMode.ts deckKeys.ts deckSpring.ts pagerWindow.ts reveal.ts slideContext.ts types.ts
  useCountup.ts useDeck.ts useDeckNav.ts useEdgeZones.ts`.
- The source explicitly marks it pending-lift (`DeckSlide.vue:10` "the local consumer #1 of the eventual
  @mkbabb/glass-ui/deck"; `useDeck.ts:4`; `DeckPager.vue:15`; `deckKeys.ts:2`).
- glass-ui ships **NO `/deck` subpath** — only `./deck-progress` (the one deck primitive that DID clear the
  ≥2-consumer bar — the progress rail).
- **Consumer count = 1 repo.** The chassis is consumed by THREE internal decks within ONE repo
  (`slides/src/decks/{til-briefing,feedback-coder,_fixture}/`), but by exactly **one consumer REPO** (slides).
  The `feedback-coder` repo carries NO deck chassis (`ls /Users/mkbabb/Programming/feedback-coder/src/deck` →
  ABSENT). No second external repo consumes a deck chassis. The `min-consumers` evaluator counts DISTINCT present
  consumer repos → **1** for any `@mkbabb/glass-ui/deck` import.

**Rationale (≥2-consumer bar):** the ≥2-consumer bar (L invariant 8; the visual-load-bearing-ness J-invariant 10;
`feedback_overfitting_audit`) makes substrate-without-a-second-consumer a RETIRE-or-BOOK, never a speculative
lift. Lifting a 15-file chassis to a public `/deck` subpath on a single repo-consumer would (a) ship a maximal
public surface with one user — the exact overfit the bar exists to prevent; (b) freeze the chassis API against
slides' still-evolving deck needs (`useCountup.ts` is marked slides-editorial, NOT to ride upstream — the lift
boundary is not even clean); (c) add a per-publish coupling (every slides deck change → a glass-ui publish → a
re-pin) for zero second-consumer benefit. The gestalt-correct move is KEEP-BESPOKE with a NAMED trigger.

**Encoding:** the decision is the `deck-subpath` register row (W-CARRY ledger #6, trigger
`min-consumers n:2 grep:"@mkbabb/glass-ui/deck|--deck-pager-active"`), whose `note` records the W-DECK
KEEP-BESPOKE decision + the 15-file inventory + the 1-repo-consumer count + the scope-reveal trigger that flips
it to a net-new `AY.W-DECK` lift wave when a 2nd repo imports a deck primitive. `residual-disposition.json`
carries W-DECK as a `defers` row with `bookId: deck-subpath`, `decision: keep-bespoke`, `consumerRepos: 1` — the
SAME booked row, not a second fork.

---

## §4 — the machine mirror + the gate clause

- **`docs/tranches/AY/audit/residual-disposition.json`** — the machine extract the phantom-owner clause reads.
- **`docs/tranches/AX/audit/DISPOSITION-REGISTER.json`** — the two NEW DEFERS rows
  (`speedtest-native-first-receive`, `keyframes-prune-migration-dag`) + the widened `deck-subpath` note.
- **`docs/tranches/AY/audit/deferred-ledger-manifest.json`** — the two residual-defer ids appended to `bookIds`
  (so W-CARRY's completeness clause covers them; the two clauses compose, neither duplicates).
- **`scripts/proof-disposition-live.mjs`** — the phantom-owner clause (runs UNCONDITIONALLY, before the sibling
  skip): every ADDRESSED `ayWave` resolves to a `docs/tranches/AY/waves/AY.<id>.md` spec (L.* rows skipped —
  cross-repo, inv-16); every DEFERS `bookId` resolves to a register row; every RETIRES carries a rationale.

### The AX PROGRESS annotation (non-mutating)

The 14 `planned` rows STAY `planned` in `docs/tranches/AX/PROGRESS.md` (AX is closed; rewriting its ledger is
greenfield-no-meta drift). The forward disposition lives in THIS doc §2 + the JSON mirror; the AX PROGRESS gets a
single cross-reference pointer line at the residual-section head, not a status flip.

---

## §5 — the HARD GATE (evidence-backed) — LANDED

- **Leg 1 (born-RED→GREEN).** `npm run proof:disposition-live` with a deliberately-broken `residual-disposition.json`
  (flip ONE ADDRESSED `ayWave` to `W-DOESNOTEXIST`) prints `phantom owners: 1` + the `PHANTOM W20 → ADDRESSED
  names ayWave "W-DOESNOTEXIST"…` line and exits NON-ZERO (witnessed 2026-06-10). With the real manifest it prints
  `phantom owners: 0` and exits ZERO.
- **Leg 2 (every glass-ui ADDRESSED row resolves).** W-SB1, W-SB2, W-CONSUMER, W-A11Y-PERF, W-PUB1, W-DOCK2,
  W-FF2 all exist under `docs/tranches/AY/waves/` (`ls` confirmed). The L.* rows (W30/W31/W32) are skipped (the
  glass-ui close is not hostage to a checked-out sibling).
- **Leg 3 (W-DECK recorded with consumer-count).** §3 carries the KEEP-BESPOKE decision + the 15-file inventory +
  the 1-repo-consumer count (feedback-coder src/deck ABSENT) + the `deck-subpath` register row + the
  scope-reveal trigger.
- **Leg 4 (every residual dispositioned, tally reconciles).** §2 maps all 14 AX `planned` rows + W-DECK; the JSON
  `residuals.length === 15`; no AX wave dispositioned twice; the disposition tally reconciles.

**The headline gate condition:** `proof:disposition-live` extended with the phantom-owner clause — every residual
AX `planned` wave + W-DECK exits ADDRESSED-at-a-real-AY-wave / RETIRES-with-rationale / DEFERS-with-a-registered-
trigger; the gate sees `phantom owners: 0` (born-RED on a fake `ayWave`); W-DECK is KEEP-BESPOKE under the
≥2-consumer bar (1 repo-consumer) with the `deck-subpath` trigger that re-opens it at a 2nd consumer.
