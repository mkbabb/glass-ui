# AY.W-TRIAGE — the residual-planned umbrella (the folded DRAFT-W8) + the W-DECK deck-chassis lift decision

**State:** LANDED · **Repo:** glass-ui (`/Users/mkbabb/Programming/glass-ui`) · **Band:** E (the AX close)
**Type:** triage · **Track:** content (a disposition table + a machine-readable register + one gate-script extension; near-zero source-feature risk).

> **Landed (verified 2026-06-10, W-CARRY-LIVE1-FINISH):** the disposition table (`audit/W-TRIAGE.md §3`) +
> its machine mirror (`audit/residual-disposition.json`, 15 rows) disposition every residual AX `planned`
> wave (W20/W21/W28-32/W35/W39/W41-43/W49) + W-DECK — ADDRESSED (10) / DEFERS (2) / RETIRES (2 + the
> W42-residue). The W-DECK decision is recorded KEEP-BESPOKE under the ≥2-consumer bar (1 repo-consumer,
> `deck-subpath` register row widened). The 2 DEFERS book rows (`speedtest-native-first-receive`,
> `keyframes-prune-migration-dag`) are minted in the register + appended to the manifest. The phantom-owner
> clause is landed in `proof-disposition-live.mjs` (UNCONDITIONAL). Gate GREEN: `residual rows: 15`,
> `phantom owners: 0`. Born-RED witness confirmed (flip an ADDRESSED `ayWave` to a fake id → `phantom
> owners: 1` + the PHANTOM line, non-zero exit; reverted clean).
**Depends on:** none for the table authoring (parallel slack). The disposition CELLS that route a residual to an AY wave become TRUE only when that AY wave lands, so the **completeness re-read** is a W-CLOSE1 input (the AY-disposition column is verified against the live wave-set + register at the close, not at dispatch).
**Unblocks:** **AY.W-CLOSE1** — the FINAL's "every AX `planned` wave is dispositioned, none silently carried" (P-inv-28 / GOLDEN G-3, the zero-deferral discipline) is **gate-true** only if W-TRIAGE's register is GREEN under the completeness clause first.

---

## Goal criterion

Every residual AX `planned` wave (W20/W21/W28-W32/W35/W39/W41/W42/W43/W49 — 14 waves) and the
one un-homed bespoke-chassis question (the slides `src/deck/` lift) EXITS the AY engagement with a
single explicit disposition — **ADDRESSED-at-AY.W#** (the scope folded into a named, authored AY/L
wave), **RETIRES-with-rationale** (no AY scope admits it; out-of-scope recorded, not silently
dropped), or **DEFERS-with-`{trigger}`** (booked into the disposition register with a re-evaluable
`min-consumers` trigger, never "future tranche") — and the **W-DECK lift-or-keep-bespoke decision**
is recorded with its consumer-count evidence. No residual rides forward as a one-line table cell no
machine reads (the exact DRAFT-W8 failure the H-wave-completeness lane named: "a long residual AX
planned set lives in prose no machine reads"). The "phantom-owner" class is closed: a disposition
that NAMES an owning AY wave but that wave does not exist (or does not actually carry the scope) is a
machine-caught violation, not a prose claim.

## Completion criterion

The single hard gate (§4) verifies: (1) `docs/tranches/AY/audit/W-TRIAGE.md` carries the
14-residual + W-DECK disposition table, every row ADDRESSED/RETIRES/DEFERS with a cited destination;
(2) a NEW machine-readable `docs/tranches/AY/audit/residual-disposition.json` mirrors the table —
every ADDRESSED row names an `ayWave` id, every DEFERS row carries a register `bookId`, every RETIRES
row carries a `rationale`; (3) `proof:disposition-live` extended with a **phantom-owner clause** (runs
UNCONDITIONALLY, like W-CARRY's completeness clause) that REDs the close if any `residual-disposition.json`
ADDRESSED row names an `ayWave` with NO spec file in `docs/tranches/AY/waves/`, or any DEFERS row names a
`bookId` absent from `DISPOSITION-REGISTER.json` — born-RED demonstrable (flip one ADDRESSED row to a
fake wave id → RED), GREEN at HEAD once every residual is disposed against the real wave-set + register;
(4) the W-DECK decision recorded with the live consumer-count artefact (the deck chassis has exactly
**one** repo-consumer → KEEP-BESPOKE under the ≥2-consumer bar, booked as the `deck-subpath` register row).

---

## §1 — The verified defect (file:line)

### D1 — the residual AX `planned` set is 14 one-line PROGRESS rows no machine triages

`docs/tranches/AX/PROGRESS.md` carries fourteen rows still marked `planned` at HEAD:

> ```
> PROGRESS.md:64  | W20 | primitive fix — native top-layer, card toggles, glass-panel retire | planned |
> PROGRESS.md:65  | W21 | primitive recategorize — ledger/barrel coherence + metric reconcile | planned |
> PROGRESS.md:74  | W28 | speedtest native-first receive | planned |
> PROGRESS.md:75  | W29 | repatriation prune + orphan prune | planned |
> PROGRESS.md:76  | W30 | slides baseline — constellation Canvas2D leak | planned |
> PROGRESS.md:77  | W31 | slides content reframe + visual defects | planned |
> PROGRESS.md:78  | W32 | slides motion-form adoption + deploy verify | planned |
> PROGRESS.md:80  | W34 | cross-constellation idiom + consumer-adoption ledger | planned |
> PROGRESS.md:81  | W35 | keyframes prune + migration DAG | planned |
> PROGRESS.md:85  | W39 | lighthouse perf/a11y route matrix | planned |
> PROGRESS.md:87  | W41 | publisher cross-repo build supplier-edge | planned |
> PROGRESS.md:88  | W42 | liquid-morph substrate | planned |
> PROGRESS.md:89  | W43 | fourier-field first-class | planned |
> PROGRESS.md:96  | W49 | math-paper composes latex-paper (D16) | planned |
> ```

(**W34** is in the list textually but is ALREADY pulled forward as **AY.W-CONSUMER** — `AY.md:186`,
the consumer-staleness ledger — so it exits THIS umbrella as ADDRESSED, not re-triaged here. The
table §3 records that fold; the residual SET this wave dispositions is the 13 remaining + the W34
cross-reference = 14 rows.)

The AY-DRAFT booked these as an umbrella (`AY-DRAFT.md:305-322`, "AY.W8 — Residual-planned umbrella")
with a hard gate — "Every residual AX `planned` wave exits AY as ADDRESSED-at-AY.W# / RETIRES /
DEFERS-with-`{trigger}`" — but the DRAFT W8 wave was DROPPED when `AY.md` re-expressed the close under
the named scheme (H-wave-completeness §1, `AY.md:96` — "AY.W8 residual-triage … no named equivalent —
DROPPED in AY.md"). It was re-folded as the named **W-TRIAGE** row (`AY.md:189`) but that row is a
one-line table cell with no spec, no disposition table, and no machine artefact — exactly the prose-no-
machine-reads gap.

### D2 — there is NO machine that triages the residual waves; the existing `proof:disposition-live` reads only BOOK/ARCHIVED ITEMS, not residual WAVES

`scripts/proof-disposition-live.mjs:136-143` iterates `reg.items` in
`docs/tranches/AX/audit/DISPOSITION-REGISTER.json` — the BOOK/ARCHIVED **feature** rows
(`native-drawer-as-asChild`, `panel-host-primitive`, `interruptible-reorder`). It re-evaluates each
row's `min-consumers` trigger. It has NO awareness of the residual AX `planned` **wave** set: a
residual wave dispositioned ADDRESSED-at-a-phantom-AY-wave, or DEFERS-to-a-bookId-that-was-never-minted,
is invisible to every gate at HEAD. The seed's "`proof:disposition-live` sees zero phantom-owner rows"
is therefore NOT satisfiable by the gate as it stands — the gate must GROW a phantom-owner clause that
reads the residual dispositions, or the gate is being asked to assert a class of row it never loads
(the precept's "grep-only / API-exists is insufficient" trap — a gate that cannot SEE the rows cannot
gate them).

### D3 — the W-DECK question is un-homed in BOTH tranches; the slides deck-chassis is source-marked "consumer #1 of the eventual `/deck`" but glass-ui ships only `/deck-progress`

The H-slides-adopt-deploy lane (F8) and H-wave-completeness (§3 N7) both name this as the real
"befitting component → glass-ui" body, unaddressed:

- `slides/src/deck/` is a wholesale BESPOKE deck chassis — **15 files** (`ls`): `DeckView.vue`,
  `DeckPager.vue`, `DeckSlide.vue`, `DeckSettings.vue`, `useDeck.ts`, `useDeckNav.ts`, `deckSpring.ts`,
  `pagerWindow.ts`, `deckKeys.ts`, `captureMode.ts`, `reveal.ts`, `slideContext.ts`, `useCountup.ts`,
  `useEdgeZones.ts`, `types.ts`.
- The SOURCE explicitly marks it pending-lift: `slides/src/deck/DeckSlide.vue:10` ("the local consumer
  #1 of the eventual @mkbabb/glass-ui/deck"); `useDeck.ts:4` ("a future `<DeckPager>` /
  @mkbabb/glass-ui/deck"); `DeckPager.vue:15` ("the eventual @mkbabb/glass-ui/deck <DeckPager>
  generalizes this"); `deckKeys.ts:2` ("lifts cleanly into @mkbabb/glass-ui/deck's").
- glass-ui ships **NO `/deck` subpath** — only `./deck-progress` (`package.json:340`;
  `src/subpaths/deck-progress.ts`). The single largest bespoke surface in the slides repo is
  acknowledged-pending-lift in the source, yet AY has no W-DECK lift wave and the decision is recorded
  in no plan document.

**The consumer-count evidence (the load-bearing input to the decision):** the deck chassis is consumed
by THREE internal decks within ONE repo (`slides/src/decks/{til-briefing,feedback-coder,_fixture}/`),
but by exactly **one consumer REPO** (slides). The `feedback-coder` repo (`/Users/mkbabb/Programming/
feedback-coder`) does NOT carry its own deck chassis (`ls src/deck` → absent) — the "feedback-coder"
DECK lives inside slides. No second external repo consumes a deck chassis. The `min-consumers`
semantics `proof:disposition-live` already uses (`proof-disposition-live.mjs:60-77` — DISTINCT present
consumer **repos**, self excluded) counts **1** for a `deck` subpath import across the present
constellation. So the lift does NOT clear the ≥2-consumer bar (L invariant 8 / the
visual-load-bearing-ness J-invariant 10 / `feedback_overfitting_audit`).

---

## §2 — Objective

Make the residual-planned set + the W-DECK question a MACHINE-TRIAGED disposition register, not prose,
and record the deck-chassis lift decision against its consumer-count evidence.

Three units:

- **W-TRIAGE.1 — the disposition table + the machine mirror.** Author `audit/W-TRIAGE.md` (the human
  table, every residual row dispositioned ADDRESSED/RETIRES/DEFERS with a cited destination) and its
  machine extract `audit/residual-disposition.json` (the gate reads the JSON; the table is the human
  source, kept in sync by the gate's own cross-check). DEFERS rows mint a register `book` row in
  `DISPOSITION-REGISTER.json` with a `min-consumers` trigger.
- **W-TRIAGE.2 — the W-DECK decision.** Record the deck-chassis lift-or-keep decision in `W-TRIAGE.md
  §"W-DECK"` with the live consumer-count artefact (1 repo-consumer). The decision is **KEEP-BESPOKE,
  book the `/deck` lift** (under the ≥2-consumer bar) — encoded as the existing `deck-subpath` register
  row (W-CARRY mints it as ledger #6; W-TRIAGE WIDENS its `note` to cite the W-DECK decision + the
  15-file inventory + the 1-repo-consumer count, so the deck-chassis lift is the SAME booked row, not a
  second fork). If the in-wave consumer re-count surfaces a genuine 2nd repo-consumer, the decision
  flips to a net-new `AY.W-DECK` lift wave (the scope-reveal trigger) — but at HEAD the count is 1 and
  the decision is KEEP-BESPOKE-with-trigger.
- **W-TRIAGE.3 — the phantom-owner clause.** Extend `scripts/proof-disposition-live.mjs` with a
  phantom-owner check (UNCONDITIONAL, runs before the sibling skip — the W-CARRY structural precedent):
  parse `residual-disposition.json`, assert every ADDRESSED `ayWave` resolves to a spec file in
  `docs/tranches/AY/waves/`, every DEFERS `bookId` resolves to a `DISPOSITION-REGISTER.json` row, every
  RETIRES row carries a non-empty `rationale`; print the disposition reconciliation in the gate artefact.

**Goal:** after this wave, the residual-planned set is a machine-checked disposition register where a
phantom owner (an ADDRESSED row pointing at a non-existent wave) or a phantom defer (a DEFERS row
pointing at an unminted register id) REDs the close — so W-CLOSE1's FINAL claims "zero silently-carried
residual" with the gate as the artefact, and the W-DECK decision is recorded against evidence, not
hand-waved.

---

## §3 — The disposition table (authored in-wave; the W-TRIAGE.1 artefact)

Every residual AX `planned` wave maps to exactly ONE disposition. The table below is the SOURCE; the
`ayWave` / `bookId` / `rationale` columns become the machine mirror in `residual-disposition.json`. The
re-verification of each ADDRESSED cell against the live wave-set is the gate's phantom-owner check
(W-TRIAGE.3); the table is the human-readable proof.

| AX wave | scope (AX title) | disposition | destination (machine field) |
|---|---|---|---|
| **W20** | primitive fix — native top-layer, card toggles, glass-panel retire | **ADDRESSED** | `ayWave: W-SB1` (the native-top-layer fold + glass-panel-retire verdict ride the storybook per-route KEEP/FIX/RETIRE wave; `AY.md:238` W-SB1 "native-top-layer fold + header-ribbon retire") + `ayWave: W-GLASS` (the card-toggle glass cohesion). Co-routed; primary = `W-SB1`. |
| **W21** | primitive recategorize — ledger/barrel coherence + metric reconcile | **ADDRESSED** | `ayWave: W-SB2` (the metric co-location + barrel coherence — `AY.md:238` W-SB2 "metric co-location + speedtest-boundary closed"). The configurator-root-barrel reconcile + drawer live-behind disambiguate fold into `W-GLASS` (drawer) + `W-SB2` (barrel). |
| **W28** | speedtest native-first receive | **DEFERS** | `bookId: speedtest-native-first-receive` — a CROSS-REPO consumer-side wave (speedtest receives native metric-cell/stack + instrument-chassis). glass-ui owns the substrate (shipped: `/metric-cell`, `/metric-stack`, `/instrument-chassis` subpaths); the RECEIVE is speedtest's. Trigger: `min-consumers n:2 grep:"metric-cell\|metric-stack\|instrument-chassis"` re-evals MET when speedtest+1 import them — booked, not AY-owned (inv-16: glass-ui writes glass-ui). |
| **W29** | repatriation prune + orphan prune | **ADDRESSED** | `ayWave: W-SB1` (the orphan-COMPONENT prune — header-ribbon/glass-panel/useTokenColor orphans, H-overfitting F3/F4; `AY.md:238` W-SB1 "component-RETIRE for orphans"). The cross-repo repatriation prune half folds to `W-CONSUMER` (the consumer-staleness ledger discharges the repatriated-then-stale imports). |
| **W30** | slides baseline — constellation Canvas2D leak | **ADDRESSED** | `ayWave: L.W-ADOPT` (the constellation Canvas2D leak IS the bespoke-engine defect the slides adopt-the-lib-constellation wave kills — `AY.md` directive fold; H-slides-adopt-deploy F1/F3). The library-side fix is W-CON1/CON2/CON3 (already-shipped warp + the `?freeze` seam). |
| **W31** | slides content reframe + visual defects | **ADDRESSED** | `ayWave: L.W1` (the 5/6/7 cohesive rebuild) + `ayWave: L.W2/L.W3` (the P0/P1 content reframe). The slides-content body is the entire L tranche; primary = `L.W1`. |
| **W32** | slides motion-form adoption + deploy verify | **ADDRESSED** | `ayWave: L.W-ADOPT` (motion-form adoption) + `ayWave: L.W5` (deploy verify — the decomposed deploy gate). |
| **W34** | cross-constellation idiom + consumer-adoption ledger | **ADDRESSED** | `ayWave: W-CONSUMER` (pulled forward — `AY.md:186`; the consumer-staleness ledger is W34's `proof:consumer-staleness` born-RED on 12 stale imports). Already folded; recorded here for completeness, not re-triaged. |
| **W35** | keyframes prune + migration DAG | **DEFERS** | `bookId: keyframes-prune-migration-dag` — a CROSS-REPO supplier-edge (keyframes.js prune + the migration DAG glass-ui depends ON). glass-ui is the CONSUMER; the prune is keyframes.js-owned (USER-DOMAIN publisher). Trigger: `min-consumers n:2 grep:"@mkbabb/keyframes.js"` (re-evals each close; the migration is keyframes.js's wave, glass-ui re-pins on publish). Booked, not AY-owned. |
| **W39** | lighthouse perf/a11y route matrix | **ADDRESSED** | `ayWave: W-A11Y-PERF` (the route-matrix perf/a11y — `AY.md:198` W-A11Y-PERF carries the frame-budget gate + the contrast oracle; the lighthouse route matrix is its perf arm). A slides-side lighthouse run folds to `L.W5` (deploy verify). |
| **W41** | publisher cross-repo build supplier-edge | **ADDRESSED** | `ayWave: W-PUB1` (the publish hinge — `AY.md:190`; the cross-repo build supplier-edge IS the publish→re-pin→adopt sequence the W-PUB1 + L.W5 chain encodes). |
| **W42** | liquid-morph substrate | **ADDRESSED** | `ayWave: W-DOCK2` (the `--dock-morph-t` axis-parametric morph driver — the liquid-morph substrate is the dock morph engine; `AY.W-DOCK2.md` owns it). The arbitrary-shape facility (circle/custom) was HONESTLY NARROWED at AX (the web-platform clip-path-topology limit, AX DOCK-FACILITIES §19.11); W-DOCK2 carries the superellipse-k continuous family; the discrete-custom-presets residue is **RETIRES** (rationale: matched-geometry-into-anything is not a web-platform capability — recorded, not carried). Primary = `W-DOCK2`. |
| **W43** | fourier-field first-class | **ADDRESSED** | `ayWave: W-FF1` (rebase the born-RED W43 spec) + `ayWave: W-FF2` (LAND the intensity model — `AY.md:151-152`; the element is exported + live-consumed but visibly broken, W-FF2 lands the `OUTLINE_PEAK_ALPHA` intensity fix + 3-substrate parity). Primary = `W-FF2`. |
| **W49** | math-paper composes latex-paper (D16) | **RETIRES** | `rationale:` "math-paper × latex-paper is a SLIDES-editorial composition (the feedback-coder/fourier-analysis math-paper aesthetic), not a glass-ui library primitive. glass-ui ships `paper-backdrop` + `paper.css` (the paper substrate); the latex-paper COMPOSITION is consumer-editorial (slides decks compose it from the shipped paper utilities). No glass-ui scope admits a `latex-paper` primitive at HEAD (0 library-side consumers; the math-paper aesthetic is 1 slides deck). Out-of-scope: the paper substrate is shipped; the latex composition is the consumer's. Re-opens iff ≥2 repos need a shared latex-paper primitive (booked NOWHERE — a genuine retirement, the substrate is sufficient)." |

**Disposition tally:** ADDRESSED = 10 (W20, W21, W29, W30, W31, W32, W34, W39, W41, W42-primary,
W43); DEFERS = 2 (W28 speedtest-receive, W35 keyframes-prune); RETIRES = 2 (W42-custom-presets-residue,
W49 latex-paper). (W42 splits: the substrate is ADDRESSED at W-DOCK2; the never-buildable custom-shape
residue RETIRES — recorded as a sub-row so neither half rides silently.)

### W-DECK — the deck-chassis lift decision (the W-TRIAGE.2 artefact)

**Decision: KEEP-BESPOKE — book the `/deck` lift; do NOT lift the chassis to `@mkbabb/glass-ui/deck`
at AY.**

**Evidence (the load-bearing consumer count):** the `slides/src/deck/` chassis (15 files, §1 D3) is
consumed by exactly **one consumer REPO** (slides) — three internal decks share it
(`til-briefing`, `feedback-coder`, `_fixture`), but all within slides; the separate `feedback-coder`
repo carries NO deck chassis (`ls /Users/mkbabb/Programming/feedback-coder/src/deck` → absent). The
`proof:disposition-live` `min-consumers` evaluator counts DISTINCT consumer repos (self excluded,
`proof-disposition-live.mjs:60-77`) → **1** for any `@mkbabb/glass-ui/deck` import across the present
constellation.

**Rationale (gestalt + ≥2-consumer bar):** the ≥2-consumer bar (L invariant 8; the
visual-load-bearing-ness J-invariant 10; `feedback_overfitting_audit`) makes substrate-without-a-second-
consumer a RETIRE-or-BOOK, never a speculative lift. Lifting a 15-file chassis to a public `/deck`
subpath on a single repo-consumer would (a) ship a maximal public surface with one user — the exact
overfit the bar exists to prevent; (b) freeze the chassis API against slides' still-evolving deck
needs (the source marks `useCountup.ts:6` as slides-editorial, NOT to ride upstream — the lift
boundary is not even clean); (c) add a per-publish coupling (every slides deck change → a glass-ui
publish → a re-pin) for zero second-consumer benefit. The gestalt-correct move is KEEP-BESPOKE with a
NAMED trigger: glass-ui ships `/deck-progress` (the one deck primitive that DID clear the bar — the
progress rail, 2+ consumers); the full chassis stays in slides until a 2nd repo needs it.

**Encoding:** the decision is the existing `deck-subpath` register row (W-CARRY mints it as ledger #6 —
`AY.W-CARRY.md:56`, trigger `min-consumers n:2 grep:"@mkbabb/glass-ui/deck\|--deck-pager-active"`).
W-TRIAGE WIDENS that row's `note` to record: the W-DECK KEEP-BESPOKE decision; the 15-file chassis
inventory; the 1-repo-consumer count; the trigger that flips it to a net-new `AY.W-DECK` lift wave
(the scope-reveal trigger) when a 2nd repo imports a deck primitive. It is the SAME booked row, not a
second fork — `residual-disposition.json` carries W-DECK as a DEFERS row with `bookId: deck-subpath`.

---

## §4 — The exact edit-sites

### W-TRIAGE.1 — `docs/tranches/AY/audit/W-TRIAGE.md` (NEW) + `residual-disposition.json` (NEW)

**`audit/W-TRIAGE.md`** — the §3 disposition table verbatim (the human source + the W-DECK decision
block). Authored in-wave; this IS the document-reconciliation artefact for Leg 4.

**`audit/residual-disposition.json`** (NEW — the machine mirror the gate reads):

```json
{
    "$schema": "AY.W-TRIAGE — machine-readable disposition for every residual AX `planned` wave. Each row is ADDRESSED (ayWave names an authored docs/tranches/AY/waves/<id>.md spec), DEFERS (bookId names a DISPOSITION-REGISTER.json row), or RETIRES (rationale non-empty). proof:disposition-live's phantom-owner clause cross-checks: an ADDRESSED ayWave with no spec file, or a DEFERS bookId with no register row, REDs the close.",
    "source": "docs/tranches/AX/PROGRESS.md (the `planned` rows) + docs/tranches/AY/audit/W-TRIAGE.md §3",
    "residuals": [
        { "axWave": "W20", "disposition": "addressed", "ayWave": "W-SB1", "coRoute": ["W-GLASS"] },
        { "axWave": "W21", "disposition": "addressed", "ayWave": "W-SB2", "coRoute": ["W-GLASS"] },
        { "axWave": "W28", "disposition": "defers", "bookId": "speedtest-native-first-receive" },
        { "axWave": "W29", "disposition": "addressed", "ayWave": "W-SB1", "coRoute": ["W-CONSUMER"] },
        { "axWave": "W30", "disposition": "addressed", "ayWave": "L.W-ADOPT", "repo": "slides" },
        { "axWave": "W31", "disposition": "addressed", "ayWave": "L.W1", "repo": "slides" },
        { "axWave": "W32", "disposition": "addressed", "ayWave": "L.W-ADOPT", "coRoute": ["L.W5"], "repo": "slides" },
        { "axWave": "W34", "disposition": "addressed", "ayWave": "W-CONSUMER" },
        { "axWave": "W35", "disposition": "defers", "bookId": "keyframes-prune-migration-dag" },
        { "axWave": "W39", "disposition": "addressed", "ayWave": "W-A11Y-PERF" },
        { "axWave": "W41", "disposition": "addressed", "ayWave": "W-PUB1" },
        { "axWave": "W42", "disposition": "addressed", "ayWave": "W-DOCK2", "retiresResidue": "custom-clip-path-shape-morph (web-platform topology limit; AX DOCK-FACILITIES §19.11 honest-narrow)" },
        { "axWave": "W43", "disposition": "addressed", "ayWave": "W-FF2", "coRoute": ["W-FF1"] },
        { "axWave": "W49", "disposition": "retires", "rationale": "latex-paper is a slides-editorial composition of the shipped paper-backdrop/paper.css substrate, not a glass-ui primitive; 0 library-side consumers; re-opens iff >=2 repos need a shared latex-paper primitive." },
        { "axWave": "W-DECK", "disposition": "defers", "bookId": "deck-subpath", "decision": "keep-bespoke", "consumerRepos": 1, "note": "slides/src/deck (15 files) consumed by 1 repo (slides; 3 internal decks); does NOT clear the >=2-consumer bar. Flips to a net-new AY.W-DECK lift wave when a 2nd repo imports a deck primitive." }
    ]
}
```

(`repo: "slides"` marks the rows whose owning wave is in the L tranche — the phantom-owner clause
checks those against `slides/docs/tranches/L/waves/` when the sibling is present, and SKIPs the
cross-repo leg when slides is absent, the registry-default world, so the glass-ui CI close is not
hostage to a checked-out sibling. The glass-ui-owned ADDRESSED rows are checked unconditionally.)

### W-TRIAGE.2 — `docs/tranches/AX/audit/DISPOSITION-REGISTER.json`

Add TWO `book` rows (W28, W35 DEFERS) + WIDEN the `deck-subpath` row's note (the W-DECK decision). Row
shape mirrors the existing three (`proof-disposition-live.mjs:79-83` reads `kind:"min-consumers"`, `n`,
`grep`):

```json
{
    "id": "speedtest-native-first-receive",
    "disposition": "book",
    "summary": "Speedtest/muster RECEIVE the native metric-cell/stack + instrument-chassis (consumer-side; substrate shipped).",
    "trigger": {
        "kind": "min-consumers", "n": 2,
        "grep": "metric-cell|metric-stack|instrument-chassis",
        "note": "AX W28 residual; the substrate is shipped (/metric-cell, /metric-stack, /instrument-chassis subpaths); the RECEIVE is speedtest's (inv-16 — glass-ui writes glass-ui). Re-evaluates MET when >=2 consumer repos import; booked, not AY-owned."
    },
    "resolved": false
}
```

```json
{
    "id": "keyframes-prune-migration-dag",
    "disposition": "book",
    "summary": "keyframes.js prune + migration DAG (cross-repo supplier-edge; keyframes.js is the publisher, glass-ui the consumer).",
    "trigger": {
        "kind": "min-consumers", "n": 2,
        "grep": "@mkbabb/keyframes.js",
        "note": "AX W35 residual; the prune is keyframes.js-owned (USER-DOMAIN publisher); glass-ui re-pins on publish. Re-evaluates each close; booked, not AY-owned."
    },
    "resolved": false
}
```

The `deck-subpath` row (minted by W-CARRY as ledger #6) gets its `note` widened to cite the W-DECK
KEEP-BESPOKE decision + the 15-file inventory + the 1-repo-consumer count. **Coordination with
W-CARRY:** if W-TRIAGE lands BEFORE W-CARRY, W-TRIAGE mints `deck-subpath`; if W-CARRY lands first,
W-TRIAGE only WIDENS the note. Either order leaves ONE `deck-subpath` row (the orchestrator serializes
the two register writers; both append to `DISPOSITION-REGISTER.json` `items`). The two NEW DEFERS rows
(`speedtest-native-first-receive`, `keyframes-prune-migration-dag`) are W-TRIAGE-exclusive — not in
W-CARRY's ledger-mirror set (they are residual-WAVE defers, not feature-deferral BOOK rows), so they
ALSO land in W-CARRY's `deferred-ledger-manifest.json` `bookIds` (W-TRIAGE appends the two ids) so the
completeness clause covers them. No write-scope conflict: W-CARRY owns the manifest's ledger-derived
ids; W-TRIAGE appends its two residual-defer ids (orchestrator-serialized append).

### W-TRIAGE.3 — `scripts/proof-disposition-live.mjs` (the phantom-owner clause)

Add the phantom-owner check, structured to run UNCONDITIONALLY (before the sibling skip — the W-CARRY
D4 structural precedent, so it gates the CI close even on a sibling-free runner):

1. Add a `RESIDUAL` const next to `REGISTER` (`:26`):
   ```js
   const RESIDUAL = join(ROOT, "docs/tranches/AY/audit/residual-disposition.json");
   const WAVES_DIR = join(ROOT, "docs/tranches/AY/waves");
   ```
2. AFTER loading `reg` (`:90`) and BEFORE the `anySiblingPresent` skip (`:100`), insert the clause:
   ```js
   // ── Phantom-owner clause (AY.W-TRIAGE) ──────────────────────────────────────
   // Every residual AX `planned` wave carries a disposition; an ADDRESSED row that
   // names an AY wave with NO spec file (phantom owner), or a DEFERS row whose
   // bookId is absent from the register (phantom defer), or a RETIRES row with an
   // empty rationale (silent drop) REDs the close. PURE document cross-check — no
   // siblings — so it runs BEFORE the sibling skip and gates CI with zero consumers.
   if (existsSync(RESIDUAL)) {
       const residual = JSON.parse(readFileSync(RESIDUAL, "utf8"));
       const registerIds = new Set((reg.items ?? []).map((i) => i.id));
       const specExists = (id) =>
           existsSync(join(WAVES_DIR, `AY.${id}.md`));
       const phantoms = [];
       for (const r of residual.residuals ?? []) {
           if (r.disposition === "addressed") {
               // L.* rows are cross-repo: checked only when slides is on disk.
               if ((r.repo === "slides") || /^L\./.test(r.ayWave ?? "")) continue;
               if (!r.ayWave || !specExists(r.ayWave)) {
                   phantoms.push(`${r.axWave} → ADDRESSED names ayWave "${r.ayWave}" with no spec in docs/tranches/AY/waves/`);
               }
           } else if (r.disposition === "defers") {
               if (!r.bookId || !registerIds.has(r.bookId)) {
                   phantoms.push(`${r.axWave} → DEFERS names bookId "${r.bookId}" absent from DISPOSITION-REGISTER.json`);
               }
           } else if (r.disposition === "retires") {
               if (!r.rationale || !r.rationale.trim()) {
                   phantoms.push(`${r.axWave} → RETIRES with empty rationale (a silent drop, not a recorded retirement)`);
               }
           } else {
               phantoms.push(`${r.axWave} → unknown disposition "${r.disposition}" (must be addressed/defers/retires)`);
           }
       }
       console.log("proof:disposition-live — phantom-owner clause (AY.W-TRIAGE)");
       console.log(`  residual rows         : ${(residual.residuals ?? []).length}`);
       console.log(`  phantom owners        : ${phantoms.length}`);
       for (const p of phantoms) console.error(`  PHANTOM   ${p}`);
       if (phantoms.length > 0) {
           console.error(`\n[proof:disposition-live] ${phantoms.length} residual disposition(s) name a phantom owner — the AY wave / register row does not exist. Author it or correct the disposition (AY.W-TRIAGE).`);
           process.exit(1);
       }
   } else {
       console.error(`[proof:disposition-live] residual-disposition manifest not found: ${RESIDUAL}`);
       process.exit(1);
   }
   ```
3. Carry the residual reconciliation (`residualRows`, `phantomCount`) into BOTH `writeGateArtifact`
   calls (`:104` skip + `:157` pass/fail) so the artefact always prints the disposition state.

No `package.json` / `gates.mjs` / `ci.yml` edit: the gate is ALREADY wired (`package.json:685`,
`gates.mjs:741`, `ci.yml:226`). The phantom-owner clause is an ADDITIVE extension of the existing gate,
not a new gate — it composes cleanly with W-CARRY's completeness clause (both run unconditionally
before the sibling skip; W-CARRY checks the ledger-mirror, W-TRIAGE checks the residual-disposition).

### W-TRIAGE.4 — `docs/tranches/AX/PROGRESS.md` (the residual rows annotated, NOT mutated)

The 14 `planned` rows STAY `planned` in the AX PROGRESS (AX is closed; rewriting its ledger is
greenfield-no-meta drift — the AX PROGRESS is the historical record). Instead, W-TRIAGE.md §3 IS the
forward disposition; the AX PROGRESS gets a SINGLE pointer line at the residual-section head:
`> Residual `planned` waves dispositioned at AY.W-TRIAGE — see docs/tranches/AY/audit/W-TRIAGE.md`.
This is the one non-mutating annotation (a cross-reference, not a status flip on a closed tranche).

---

## §5 — The HARD GATE (evidence-backed)

A single binding condition with four artefact-verifiable legs. ALL must hold.

### Leg 1 — the phantom-owner clause is born-RED→GREEN (the triage truth)

`npm run proof:disposition-live` run with a DELIBERATELY-broken `residual-disposition.json` (flip ONE
ADDRESSED row's `ayWave` to a fake id, e.g. `"W-DOESNOTEXIST"`) prints `phantom owners: 1` +
`PHANTOM   <axWave> → ADDRESSED names ayWave "W-DOESNOTEXIST" with no spec …` and exits NON-ZERO — the
born-RED witness. With the real `residual-disposition.json` at HEAD (every ADDRESSED row pointing at an
authored `docs/tranches/AY/waves/AY.<id>.md`, every DEFERS at a real register row, every RETIRES
carrying a rationale), the SAME command prints `phantom owners: 0` and exits ZERO. **Evidence:** the
two gate runs (RED-witness then GREEN) captured in `AY/PROGRESS.md` with the printed phantom count — a
build-diff, not a prose claim. This leg runs unconditionally (no siblings), so it gates the CI close.

### Leg 2 — every glass-ui-owned ADDRESSED row resolves to a real, authored AY wave (the no-phantom-owner proof)

A direct check (the gate's clause + a manual cross-check for the artefact): for each
glass-ui-owned ADDRESSED row, `ls docs/tranches/AY/waves/AY.<ayWave>.md` succeeds — verified at HEAD
against the authored set (W-SB1, W-SB2, W-CONSUMER, W-A11Y-PERF, W-PUB1, W-DOCK2, W-FF2 all exist; `ls`
the waves dir confirms 39 specs present). The L.* cross-repo rows (W30→L.W-ADOPT, W31→L.W1,
W32→L.W-ADOPT/L.W5) are checked against `slides/docs/tranches/L/waves/` ONLY when the slides sibling is
present (registry-default skip otherwise — the glass-ui close is not hostage to a checked-out sibling).
**Evidence:** the gate's `residual rows: 15 / phantom owners: 0` line + the `ls` of the waves dir
showing every cited spec present.

### Leg 3 — the W-DECK decision is recorded with its consumer-count artefact (the ≥2-consumer-bar proof)

`audit/W-TRIAGE.md §"W-DECK"` carries: the KEEP-BESPOKE decision; the 15-file
`slides/src/deck/` inventory (the `ls` output); the **1-repo-consumer** count (slides only; the
`feedback-coder` repo has no `src/deck`, verified `ls /Users/mkbabb/Programming/feedback-coder/src/deck`
→ absent); the `deck-subpath` register row widened to cite the decision + the trigger that flips it to
a net-new `AY.W-DECK` lift wave (a 2nd repo imports a deck primitive). The `residual-disposition.json`
W-DECK row carries `disposition: "defers"`, `bookId: "deck-subpath"`, `consumerRepos: 1`,
`decision: "keep-bespoke"`. **Evidence:** the W-TRIAGE.md §"W-DECK" block + the register row + the
consumer-count `ls` — the decision is recorded against evidence (the ≥2-consumer bar applied to a
counted topology), not hand-waved.

### Leg 4 — every residual is dispositioned; the tally reconciles; no silent carry (the document-reconciliation proof)

`audit/W-TRIAGE.md §3` carries the 14-residual + W-DECK table, every row in
{ADDRESSED·RETIRES·DEFERS}, and the disposition tally (ADDRESSED=10, DEFERS=2, RETIRES=2, +W42-residue
RETIRES, +W-DECK DEFERS) reconciles against the 14 AX `planned` rows (`PROGRESS.md:64-96`) — every
`planned` wave accounted, none unmapped. The `residual-disposition.json` `residuals` array length = 15
(14 AX waves + W-DECK) and every `axWave` in `PROGRESS.md`'s residual set appears exactly once.
**Evidence:** the §3 table (document reconciliation, the AX-PROGRESS-row format) + the JSON
`residuals.length === 15` + a dedup check (no AX wave dispositioned twice; W34's ADDRESSED-to-W-CONSUMER
is the one already-folded cross-reference, recorded not re-triaged).

**The gate is the conjunction:** Leg 1 (phantom-owner born-RED→GREEN, unconditional) ∧ Leg 2 (every
glass-ui ADDRESSED row resolves to a real wave) ∧ Leg 3 (W-DECK decision recorded with consumer-count)
∧ Leg 4 (every residual dispositioned, tally reconciles). Any leg RED blocks W-CLOSE1 — so the FINAL's
"zero silently-carried residual" is gate-true.

**The single headline gate condition (for the FINAL table):** `proof:disposition-live` extended with
the phantom-owner clause — every residual AX `planned` wave (W20/W21/W28-32/W35/W39/W41-43/W49) +
W-DECK exits ADDRESSED-at-a-real-AY-wave / RETIRES-with-rationale / DEFERS-with-a-registered-trigger;
the gate sees `phantom owners: 0` (born-RED on a fake `ayWave`); the W-DECK lift-or-keep-bespoke
decision is recorded KEEP-BESPOKE under the ≥2-consumer bar (1 repo-consumer) with the `deck-subpath`
trigger that re-opens it at a 2nd consumer.

---

## §6 — Non-goals (explicit, to bound the wave)

- **NO building any residual wave's scope.** W-TRIAGE DISPOSITIONS the residual set; it does NOT execute
  W20's primitive fix, W42's morph substrate, W43's intensity model, etc. Those land in their ADDRESSED
  owning waves (W-SB1, W-DOCK2, W-FF2). W-TRIAGE is pure disposition + register + one gate clause; zero
  source-feature risk.
- **NO lifting the deck chassis.** The W-DECK decision is KEEP-BESPOKE under the ≥2-consumer bar
  (1 repo-consumer at HEAD). W-TRIAGE does NOT author a `/deck` subpath, does NOT mint a `src/deck/`
  primitive in glass-ui. It records the decision + the booked trigger. The lift is a net-new
  `AY.W-DECK` wave IFF a 2nd repo-consumer appears (the scope-reveal trigger).
- **NO mutating the AX PROGRESS ledger.** The 14 `planned` rows stay `planned` (AX is a closed
  historical record; greenfield-no-meta). The forward disposition lives in W-TRIAGE.md §3 + the JSON
  mirror; the AX PROGRESS gets one cross-reference pointer line, not a status rewrite.
- **NO overlap with W-CARRY's completeness clause.** W-CARRY mirrors the AT W0-L4 deferral-ITEM ledger
  (feature deferrals: icon-sm, drawer-spring, …); W-TRIAGE triages the AX residual-WAVE set (W20/W42/…).
  Disjoint sets. The two NEW DEFERS rows W-TRIAGE mints (`speedtest-native-first-receive`,
  `keyframes-prune-migration-dag`) ALSO append to W-CARRY's `deferred-ledger-manifest.json` `bookIds`
  (orchestrator-serialized) so the completeness clause covers them — the two clauses compose, neither
  duplicates.
- **NO slides source edit.** The L.*-owned ADDRESSED rows (W30/W31/W32 → L.W1/L.W-ADOPT/L.W5) are
  RECORDED here as cross-repo dispositions; their EXECUTION is the L tranche's (inv-16 — glass-ui writes
  glass-ui). The phantom-owner clause checks the L.* rows only when the slides sibling is present.

---

## §7 — Dependency + sequencing notes

- **W-TRIAGE → W-CLOSE1 (hard ordering).** The phantom-owner clause must be GREEN before W-CLOSE1's
  `proof:ay-final` aggregates the "zero silently-carried residual" claim (`AY.md:188`). W-TRIAGE's
  ADDRESSED cells become TRUE as their owning waves land, so the gate's GREEN is the close-time read
  (the phantom check passes once every cited wave-spec exists — which is at HEAD, since the specs are
  authored; the SCOPE landing is the owning waves' gates, not W-TRIAGE's).
- **W-TRIAGE ⊥ the impl bands (no dependency for authoring).** The disposition table + the JSON mirror
  + the gate clause are pure documentation + gate-script work; W-TRIAGE can land EARLY (Batch 4, with
  W-DELTA0/W-CONSUMER/W-CARRY, pre-publish — `AY.md:215`). Its ADDRESSED cells REFERENCE the impl waves
  but do not BLOCK on them at authoring time (a spec file exists before its scope lands).
- **W-TRIAGE ↔ W-CARRY (shared file, serialized).** Both append to `DISPOSITION-REGISTER.json` `items`
  and both extend `scripts/proof-disposition-live.mjs` (W-CARRY = completeness clause; W-TRIAGE =
  phantom-owner clause) and both touch `deferred-ledger-manifest.json` (W-CARRY authors it; W-TRIAGE
  appends 2 ids). The orchestrator serializes the two writers (the EXECUTION-DAG places them in the
  same batch). The two gate clauses are independent additive blocks (no line-region overlap — W-CARRY
  inserts the completeness block, W-TRIAGE inserts the phantom-owner block, both before the sibling
  skip, sequentially).
- **W-TRIAGE → L (cross-repo fold, recorded not executed).** W30/W31/W32's L-tranche destinations are
  recorded; the slides arm executes them. The AY FINAL's residual section NOTEs the cross-repo handoff
  so the L-owned residuals are on a machine path (the L.* `ayWave` cells), not prose.
