# AY.W-CONVERGE — Per-major-component frontend-design FIT audit (glass-ui ↔ slides)

**State:** NET-NEW · **Repo:** glass-ui (`/Users/mkbabb/Programming/glass-ui`) · **Band:** F (cohesion + structure; the un-homed transcript directive)
**Type:** audit (read-only ≤7 lanes; no source edits in this wave)
**Unblocks:** the L-tranche `L.W-ADOPT` adoption inventory + routes each FIT gap to its owning Band-A/F glass-ui wave. This is the per-component FIT audit that the AY plan's §0 row ("per-component frontend-design convergence → W-CONVERGE (net-new)") names but no spec yet carries.

---

## §0 — Goal criterion + completion criterion (paired)

**Goal criterion.** The user's verbatim directive — "deploy 6 frontend-design agents to analyze every major glass-ui component used therein … converge upon a library optimum for glass-ui, which is used by slides for every major component that's BEFITTING … what gaps exist in glass-ui, what gaps exist in slides?" — has, today, NO AY home that answers it. `W-SB3`'s story-language gate is a thin proxy: it audits storybook PRESENTATION (does every story compose `StoryPage`/`StorySection`/`ShowcaseFrame` + the canonical spring tokens), NOT the component-vs-consumer FIT the user asked for (does slides compose the RIGHT glass-ui component, with the right props/variant/composition, for each major surface — and where it does NOT, is that a glass-ui GAP, a slides GAP, or a correct BEFITTING exclusion). The aim of W-CONVERGE is a single audit document that, per MAJOR component, states the glass-ui↔slides FIT and a one-word disposition (KEEP / EXTEND / FIX / EXCLUDE) with the file:line consumer evidence behind it, so that (a) the L-tranche has an exact adoption list, (b) every glass-ui-side gap is ROUTED to an owning AY wave (not re-discovered later), and (c) the "befitting" exclusions (aurora/blob/slider/configurator — not consumed by slides, by design) are RECORDED as deliberate, not as un-noticed misses.

**Completion criterion.** The single hard gate below verifies: a committed audit document `AY/audit/convergence/W-CONVERGE-fit.md` carrying (1) a per-major-component FIT disposition TABLE — one row per component in the canonical set {dock, constellation, aurora, blob, slider, card, button, dialog, configurator}, each with its consumer-evidence file:line, its FIT verdict, its disposition word, and its routed owning-wave; (2) every FIX/EXTEND gap cross-referenced to an EXISTING AY wave id (or, if no wave owns it, a named net-new row the audit proposes — no gap left unrouted); (3) every EXCLUDE row carrying the befitting-rationale (why slides correctly does NOT consume it); (4) the L-tranche adoption inventory delta enumerated. The gate is machine-checked by `proof:convergence-fit-coherent` (a NET-NEW doc-coherence script, authored in this wave) which parses the disposition table and FAILS if any canonical component lacks a row, any FIX/EXTEND disposition lacks a routed wave id that exists in `AY.md §2`, or any cited consumer-evidence path does not resolve on disk. This is a read-only AUDIT wave: the source FIXES land in the routed waves, not here.

---

## §1 — The verified defect (file:line)

### D1 (planning-coherence BLOCKER) — the per-component FIT directive has no AY home; `W-SB3` is a category-mismatched proxy.

The directive is recorded verbatim in two hardening lanes:

> `AY/audit/hardening/H-past-conversation.md:177-191` — "**a) The per-component frontend-design convergence (verbatim):** 'Deploy another 6 frontend design agents to analyze every major glass-ui component used therein, alongside our dock, constellation… What gaps exist in glass-ui, what gaps exist in slides? We must properly converge upon a library optimum for glass-ui, which is used by slides for every major component that's BEFITTING.' … **Net-new wave needed:** `W-CONVERGE` — a 6-agent (or 6-lane) per-major-component audit … producing a per-component disposition (keep/extend/fix) and the L-tranche adoption list."

> `H-overfitting.md:113-119` — "the convergence directive ('converge on a glass-ui library optimum') is per-component … L.W-ADOPT's hard gate ('bespoke copy gone') is single-instance; it should be 'NO deck consumes a bespoke copy of a befitting glass-ui visual'."

`AY.md:61` already lists the disposition (`per-component frontend-design convergence (glass-ui↔slides FIT) | W-CONVERGE (net-new; un-homed transcript directive)`) and `AY.md:199` carries the one-line Band-F row, but NO `waves/AY.W-CONVERGE.md` spec exists (`ls docs/tranches/AY/waves/` confirms the gap). The directive is therefore SPEC-HOMELESS: a one-line plan row with no edit-sites, no evidence-backed gate, no routing.

`W-SB3` (`AY.md:170`) is the only candidate proxy and it is the WRONG category: its gate is "a machine-checkable LANGUAGE assertion green (every story composes the shared `StoryPage`/`StorySection`/`ShowcaseFrame` chassis + the canonical spring tokens)." That audits storybook chassis adoption WITHIN glass-ui's demo — it cannot see the slides consumer at all, and it says nothing about whether slides composes the right component for each surface. Using it as the convergence home is the "thin proxy" the hardening lane flagged.

### D2 (the live FIT picture — measured, not asserted) — slides composes 7 glass-ui families, reimplements 1, and excludes 5; only ONE of these is currently audited.

Measured against the slides working tree (`grep -rhoE "@mkbabb/glass-ui[a-z/-]*" /Users/mkbabb/Programming/slides/src | sort | uniq -c`):

| glass-ui surface | slides consumption (file:line) | current FIT state |
|---|---|---|
| `dock` (GlassDock/DockIconButton) | `slides/src/deck/DeckView.vue:5,136-179`; `DeckSettings.vue:14` | COMPOSED, but with deck-local wrapper chrome (`keepOpen/release` glue `:64-65`; fixed-position wrapper `:198-217`); the dock items-lag (W-DOCK1/2) is the open FIT defect |
| `button` (`variant="glass"`/`primary-audacious`) | `DeckView.vue:6,117-127`; `DeckGate.vue:4,70`; `dist` root `:1` | COMPOSED cleanly; variant FIT un-verified |
| `dialog` | `DeckGate.vue:3,43-72` | COMPOSED cleanly |
| `dropdown-menu` + full sub-tree | `DeckSettings.vue:4-12,39-45` | COMPOSED cleanly |
| `hover-card` | `feedback-coder/components/CodedTurnBank.vue:20,93-108` | COMPOSED cleanly |
| `toggle-group` | `CodedTurnBank.vue:19` | COMPOSED cleanly |
| `forms` (Input) | `DeckGate.vue:5` | COMPOSED cleanly |
| `fourier-field` | `feedback-coder/slides/Slide01.vue:10`, `Slide05.vue` | COMPOSED, BUT a 2nd bespoke-token-drift class rides alongside (`feedback-coder/theme.css:72` `--m-red: var(--viz-fourier)`) |
| `status-dot`, `controls`, `color`, `deck` | various | COMPOSED cleanly |
| **`constellation`** | **NOT consumed — slides ships a BESPOKE copy** `til-briefing/constellation.ts` (consumed by `deck.ts` + 3 slides) | **FIX/converge — the exemplar to KILL** |
| `card` | NOT consumed (`grep "GlassCard\|<Card\|/card" slides/src` → 0); slides carries bespoke `deck.css` surfaces | FIT question: is a befitting glass card surface a slides GAP, or correctly local? |
| `aurora` | NOT consumed (`grep Aurora slides/src` → 0) | EXCLUDE candidate — needs befitting-rationale |
| `blob` (GooBlob) | NOT consumed (`grep GooBlob slides/src` → 0) | EXCLUDE candidate — needs befitting-rationale |
| `slider` | NOT consumed | EXCLUDE candidate — needs befitting-rationale |
| `configurator` | NOT consumed | EXCLUDE candidate — needs befitting-rationale |

Only ONE of these FIT states (the constellation bespoke copy) is currently tracked anywhere in the AY/L plan (L.W-ADOPT, single-instance). The other 13 are un-audited: the clean-composition rows are unverified-good, the fourier token-drift is the H-overfitting Finding-4 "unnamed second bespoke-copy class," and the 5 EXCLUDE candidates have no recorded befitting-rationale — so a later "did we converge?" pass cannot tell a deliberate exclusion from an overlooked gap. That ambiguity IS the directive's gap.

### D3 (the routing gap) — the per-component gaps, where they exist, are scattered across waves with no single FIT ledger linking them.

The constellation FIX routes to W-CON1/2/3 + L.W-ADOPT; the dock items-lag to W-DOCK1/2/3; the fourier token-drift to W-FF1/2 + the slides arm; the glass-cohesion FIT (does slides' button-on-dock read as ONE glass register) to W-GLASS. But there is no document that, per major component, states the FIT verdict AND points at the owning wave — so the convergence directive cannot be DISCHARGED (a fresh auditor cannot answer "did we converge per component?" by reading one table). The audit produces exactly that table; the FIXES stay in their owning waves (no scope-creep into this read-only wave).

---

## §2 — Objective (the gestalt; read-only convergence)

Produce ONE convergence audit document that answers the directive per major component, in three moves:

1. **Per-component FIT disposition.** For each component in the canonical set {dock, constellation, aurora, blob, slider, card, button, dialog, configurator}, state: the slides consumer evidence (file:line, or "not consumed"); the glass-ui surface it does/should compose; the FIT verdict (does slides compose the RIGHT glass-ui component, with the right variant/props/composition, for that surface); and ONE disposition word:
   - **KEEP** — slides composes the right component cleanly; the FIT is optimal; nothing to change (verify-only).
   - **EXTEND** — the right component is composed but glass-ui LACKS a behaviour/prop slides needs (the gap is in the LIBRARY; route to the owning AY wave).
   - **FIX** — slides composes a bespoke copy or the wrong/divergent surface; converge it onto the library (the gap is in the CONSUMER; route to L.W-ADOPT + the library prerequisite wave).
   - **EXCLUDE** — slides correctly does NOT consume this component (no befitting surface in a slide deck); record the befitting-rationale so the exclusion is deliberate, not an unnoticed miss.

2. **Route every FIX/EXTEND gap.** Each non-KEEP/non-EXCLUDE row names the EXISTING AY wave (or proposes a named net-new row) that owns the fix. No gap is left unrouted. This is the "converge on a library optimum" deliverable: the gaps become a worklist, not a vibe.

3. **Emit the L-tranche adoption inventory delta.** The set of slides surfaces that should adopt (or stop reimplementing) a glass-ui component once the routed library waves land — the input to `L.W-ADOPT`'s adoption table and the broadened bespoke-copy-CLASS gate (per H-overfitting Finding-4).

This is the audit the directive asked for. It is READ-ONLY: it produces the FIT ledger + routes; the source fixes land in the routed waves (W-CON*, W-DOCK*, W-FF*, W-GLASS, L.W-ADOPT). The wave does NOT edit any component, token, or consumer — that scope belongs to the owning waves and would duplicate their hard gates.

---

## §3 — Edit-sites (exact)

This wave writes exactly TWO artefacts (a doc + its coherence gate). It edits NO source under `src/`, no token, no slides consumer.

### E1 — `AY/audit/convergence/W-CONVERGE-fit.md` (NEW — the audit document)

The convergence audit. Required sections:

**E1a. The per-component FIT disposition table** (the load-bearing artefact). One row per canonical component; columns:

| component | slides consumer evidence (file:line / "not consumed") | glass-ui surface | FIT verdict | disposition | routed owning wave |
|---|---|---|---|---|---|

The nine canonical rows, pre-grounded from §1.D2 (the audit CONFIRMS/refines each against live source — it does not merely copy this seed):

- **dock** → `DeckView.vue:5,136-179` + `DeckSettings.vue:14` → `@mkbabb/glass-ui/dock` → composed but the items-lag is the open FIT defect + the deck-local `keepOpen/release` wrapper glue is a candidate to fold into a dock nav-pattern → **EXTEND** → `AY.W-DOCK1` (verify lag) / `AY.W-DOCK2` (real lockstep gate) / `AY.W-DOCK3` (dock+slider). The audit also records whether the deck-edge `<Button variant="glass">` + the GlassDock read as ONE coherent glass register or two (routes to `AY.W-GLASS` if not).
- **constellation** → NOT consumed; bespoke `til-briefing/constellation.ts` → `@mkbabb/glass-ui/constellation` → **FIX** (the exemplar to kill) → `AY.W-CON1` (refit + wander transpose-UP) + `AY.W-CON2` (warp verify) + `AY.W-CON3` (?freeze seam) prerequisites; consume + delete bespoke → `L.W-ADOPT`.
- **aurora** → NOT consumed → `@mkbabb/glass-ui/aurora` → **EXCLUDE** with rationale (a TIL/briefing deck's hero is the constellation field + fourier viz; a full-bleed WebGL aurora is not a befitting deck surface — record this, do NOT mark it a slides gap). The audit confirms zero `Aurora` import in slides.
- **blob** → NOT consumed → `@mkbabb/glass-ui/goo-blob` → **EXCLUDE** with rationale (same — no befitting deck surface).
- **slider** → NOT consumed → `@mkbabb/glass-ui/slider` → **EXCLUDE** with rationale (a slide deck has no continuous-value control surface; the dock-with-slider composition is a glass-ui demo, not a slides need).
- **card** → NOT consumed; slides carries bespoke `deck.css` glass surfaces → `@mkbabb/glass-ui/card` (+ the `.glass-card` CSS recipe) → **FIT question** the audit must RESOLVE: is the slides bespoke card surface a befitting deck-local layout (EXCLUDE-with-rationale) or a divergence that should compose the library `.glass-card` recipe (FIX → route to L.W-ADOPT)? Decide on the evidence (read `slides/src/styles/deck.css` for whether it re-implements `.glass-card`'s tier/shadow/radius or is a genuinely deck-specific layout).
- **button** → `DeckView.vue:6,117-127` (`variant="glass"`) + `DeckGate.vue:70` (`variant="primary-audacious"`) → `@mkbabb/glass-ui/button` → composed cleanly; verify the variants are FIT (the glass-first W54 default; the primary-audacious CTA) → **KEEP** (verify-only). If the deck-edge glass button does NOT read as glass over its backdrop, route the legibility to `AY.W-A11Y-PERF`/`AY.W-GLASS`.
- **dialog** → `DeckGate.vue:3,43-72` → `@mkbabb/glass-ui/dialog` → composed cleanly → **KEEP** (but cross-link: if the FIT audit finds the deck-gate dialog over a bright backdrop is illegible, that is the W-A11Y-PERF/W-GLASS adaptive-glass gap, not a dialog gap).
- **configurator** → NOT consumed → `@mkbabb/glass-ui/configurator` → **EXCLUDE** with rationale (no preset-driven controls column in a deck; the DeckSettings dropdown is the right surface, already composed).

PLUS two rows the audit MUST add because they are befitting-composed-but-FIT-divergent (the H-overfitting Finding-4 class) and the directive's "every major component used therein" reaches them:

- **dropdown-menu / hover-card / toggle-group / forms** (the cleanly-composed secondary set) → record as a single **KEEP-cohort** row with their consumer file:lines, so the audit is COMPLETE (no composed surface unaudited).
- **fourier-field** → `feedback-coder/slides/Slide01.vue:10`,`Slide05.vue` (consumed) + `feedback-coder/theme.css:72` `--m-red: var(--viz-fourier)` (the 2nd bespoke-token-drift class) → `@mkbabb/glass-ui/fourier-field` → **EXTEND/FIX** → the element FIX is `AY.W-FF1/W-FF2` (the intensity model born-RED); the token-drift is documented-preset-or-fork → `L.W-ADOPT` broadened gate (per H-overfitting Finding-4: deck-local token re-points are documented presets, not silent forks).

**E1b. The routing roll-up.** A short table mapping every FIX/EXTEND disposition → its owning AY wave id (cross-checked to exist in `AY.md §2`) → the gap one-liner. This is the convergence worklist the directive demanded.

**E1c. The befitting-exclusion ledger.** Each EXCLUDE row's rationale, in one sentence, so a fresh auditor reading this document can tell a deliberate exclusion (aurora/blob/slider/configurator) from an overlooked gap.

**E1d. The L-tranche adoption inventory delta.** The enumerated set of slides surfaces that adopt-or-stop-reimplementing a glass-ui component post-publish: (1) DELETE `til-briefing/constellation.ts`, mount `<Constellation wander>`; (2) document the feedback-coder `--m-red: var(--viz-fourier)` re-point as a NAMED preset (not a silent fork); (3) the card FIT decision's consequence; (4) any dock wrapper-glue fold. Cited by `L.W-ADOPT` as its adoption table input.

### E2 — `scripts/proof-convergence-fit-coherent.mjs` + `package.json` (NEW — the coherence gate)

A NET-NEW doc-coherence script. It parses `AY/audit/convergence/W-CONVERGE-fit.md`'s disposition table and asserts (see §6). Wire `"proof:convergence-fit-coherent"` into `package.json` scripts and into the local `proof:*` aggregator (it is a doc-coherence gate, local-tier — it does not need CI promotion, mirroring the precedent doc-artefact-coherence gate `proof:live-verified-ledger` at `package.json:682` / `gates.mjs:728`, which parses a tranche ledger doc and asserts every live-verified wave carries a captured DELTA — the same parse-a-committed-doc-and-assert-structural-completeness shape). Use the shared `scripts/gate-output.mjs` artefact writer (the house pattern). Fail-CLOSED: a missing doc, a missing canonical row, an unrouted FIX/EXTEND, or a dangling consumer-evidence path exits non-zero.

---

## §4 — The 6-lane read-only structure (the directive's "6 agents")

The directive says "deploy 6 frontend-design agents." The wave runs ≤6 read-only audit lanes (the ORCHESTRATION wave-model audit ceiling = 7), each a frontend-design angle on the FIT, feeding the single E1 synthesis:

| lane | angle | scope |
|---|---|---|
| 1 | **chrome / chassis fit** | dock + button + the deck-edge composition: does slides compose the right dock nav-pattern + glass-button register, or carry wrapper glue that should fold UP? |
| 2 | **viz / hero fit** | constellation + aurora + blob + fourier-field: which is bespoke-reimplemented (FIX), which is befitting-excluded, which is composed-but-token-drifted? |
| 3 | **control / overlay fit** | dialog + dropdown + hover-card + toggle-group + forms: composed cleanly, or divergent props/variants? |
| 4 | **surface / card fit** | card + the slides bespoke `deck.css` surfaces: is the deck card a befitting local layout or a `.glass-card` divergence? |
| 5 | **token / identity fit** | the feedback-coder `theme.css` `--m-*`/`--viz-fourier` re-points + the constellation `--constellation-alpha`: documented presets vs silent forks (the H-overfitting Finding-4 class, library-wide) |
| 6 | **cohesion / a11y fit** | does the composed set read as ONE glass-first register (W54) over the slides backdrops, or do legibility/cohesion gaps surface (route to W-GLASS/W-A11Y-PERF)? |

Each lane returns a row-set + evidence; the synthesis writes E1. No lane edits source. (This wave does NOT spawn frontend-design *generation* agents — it is an analysis, not a build; the `frontend-design` skill's generation mode is for the OWNING waves that implement the routed fixes.)

---

## §5 — Risk ledger

1. **Scope-creep into the owning waves.** The temptation is to FIX the constellation/dock/fourier gaps inside this wave. FORBIDDEN — this is a read-only audit; the source fixes land in W-CON*/W-DOCK*/W-FF*/W-GLASS/L.W-ADOPT, each with its OWN hard gate. This wave only ROUTES. The coherence gate (§6) checks routing exists; it does NOT check the fixes landed (that is each owning wave's gate). Locked by: this wave touches zero files under `src/` (a `git diff --stat src/` deletion-proof at close).
2. **Re-litigating settled exclusions.** aurora/blob/slider/configurator are EXCLUDE-by-befitting; the audit records the rationale and does NOT propose adding them to slides (that would invert the "befitting" filter the user set). The rationale is one sentence per row, not a re-design proposal.
3. **Stale consumer evidence.** Slides moves; the audit's file:lines must resolve at audit time. The coherence gate asserts every cited consumer-evidence path EXISTS on disk (it cannot assert the line still contains the import without a slides checkout, so it asserts path-existence + the import-substring where the slides tree is reachable; where it is not, the path-existence floor holds). The audit is re-runnable: a fresh grep regenerates the §1.D2 table.
4. **Routing to a non-existent wave.** A FIX/EXTEND row could name a wave id that is not in `AY.md §2` (a phantom-wave routing, the exact class H-overfitting Finding-5 flagged). The coherence gate asserts every routed wave id appears in `AY.md §2`'s wave table — a phantom route REDs the gate.
5. **Double-counting with L.W-ADOPT.** L.W-ADOPT owns the slides-side adoption + the bespoke-copy-CLASS gate (`proof:no-bespoke-visual`). This wave produces the INPUT inventory L.W-ADOPT consumes; it does NOT author the slides-side gate (wrong repo) — that is L's. The handoff is the E1d delta + the cross-reference, not a duplicated gate.

---

## §6 — HARD GATE (evidence-backed)

**Gate name:** `proof:convergence-fit-coherent` (NEW; `scripts/proof-convergence-fit-coherent.mjs`; local doc-coherence tier, mirroring the real precedent `proof:live-verified-ledger` — a tranche-doc parser that asserts structural completeness against the live tree). It is a DOC-ARTEFACT coherence gate — the artefact is the committed audit table, machine-parsed — not a grep-only or "doc exists" check: it asserts STRUCTURAL completeness + routing validity + evidence resolvability against the live tree.

The gate is GREEN only when ALL hold:

1. **COMPLETE-CANONICAL-SET.** The disposition table in `AY/audit/convergence/W-CONVERGE-fit.md` carries a row for EVERY component in the canonical set `{dock, constellation, aurora, blob, slider, card, button, dialog, configurator}`. A missing canonical component REDs the gate. (Born-RED at HEAD: the doc does not exist.)

2. **DISPOSITION-WELL-FORMED.** Every row's disposition is exactly one of `{KEEP, EXTEND, FIX, EXCLUDE}`. No blank, no multi-word, no novel verb.

3. **EVERY-FIX/EXTEND-IS-ROUTED-TO-A-REAL-WAVE.** Every row with disposition `EXTEND` or `FIX` names an owning wave id; the gate asserts that id appears in `AY.md §2`'s wave table (parse the `**W-...**` cells) OR, for slides-side fixes, is `L.W-ADOPT`. A routed id absent from `AY.md §2` (a phantom route) REDs the gate. (This closes the H-overfitting Finding-5 phantom-gate/phantom-route class for this wave.)

4. **EVERY-EXCLUDE-HAS-A-RATIONALE.** Every `EXCLUDE` row carries a non-empty befitting-rationale cell (the deliberate-exclusion record). A bare `EXCLUDE` with no rationale REDs the gate.

5. **CONSUMER-EVIDENCE-RESOLVES.** Every cited consumer-evidence path of the form `slides/src/...` or `src/...` resolves on disk (the file exists); where the slides tree is reachable at audit time, the cited import substring is additionally asserted present. A dangling evidence path REDs the gate (no fabricated file:lines). The `"not consumed"` rows are exempt (nothing to resolve) but must instead carry a grep-negative note.

6. **ADOPTION-DELTA-PRESENT.** The L-tranche adoption inventory delta section (E1d) exists and enumerates ≥ the constellation-delete + the fourier-token-preset + the card decision (the three minimum known adoptions). The gate asserts the section is present and non-empty; `L.W-ADOPT`'s own gate verifies they land.

7. **READ-ONLY PROOF.** `git diff --stat` over `src/`, `slides/src/`, `package.json` `dependencies`, and every `*.css` token file shows ZERO changes attributable to this wave (the only adds are the audit doc + the new proof script + its `package.json` script-key line). A source edit in this wave REDs the wave (scope-creep guard, §5.1).

**Born-RED at HEAD:** `AY/audit/convergence/W-CONVERGE-fit.md` does not exist (assert 1 cannot pass); `scripts/proof-convergence-fit-coherent.mjs` does not exist and `package.json` has no `proof:convergence-fit-coherent` key (the gate cannot run). The wave is complete only when the audit doc carries the complete, well-formed, fully-routed, evidence-resolving disposition table + the adoption delta, and `npm run proof:convergence-fit-coherent` exits 0.

---

## §7 — Cross-references

- Hardening findings: `AY/audit/hardening/H-past-conversation.md` (§"Two recent directives with NO AY home" a — the verbatim per-component directive), `H-overfitting.md` (Finding 4 — the bespoke-copy CLASS, fourier token-drift; Finding 5 — phantom-route/gate discipline; the convergence criterion §"Convergence criterion").
- Routed owning waves (where the FIXES land — NOT this wave): `AY.W-CON1`/`W-CON2`/`W-CON3` (constellation FIX prerequisites), `AY.W-DOCK1`/`W-DOCK2`/`W-DOCK3` (dock EXTEND — the items-lag + wrapper-glue), `AY.W-FF1`/`W-FF2` (fourier element FIX), `AY.W-GLASS` (glass-cohesion FIT), `AY.W-A11Y-PERF` (legibility FIT over slides backdrops).
- Downstream: `L.W-ADOPT` (slides consumes the per-component adoption delta E1d emits; the broadened bespoke-copy-CLASS gate `proof:no-bespoke-visual` is L's, not this wave's), `L.W-CHR` (the slides chrome FIT consequences).
- Sibling proxy (re-scoped, NOT the convergence home): `AY.W-SB3` (storybook story-language gate — audits glass-ui demo PRESENTATION, orthogonal to this component-vs-consumer FIT).
- Precepts: `docs/precepts/instructions/TRANCHE-AND-WAVE-SPEC.md` §"Hard gate" (artefact-backed doc-coherence, not grep), §"Pre-execution audit (the six-lane pattern)" (the read-only multi-lane → synthesis shape); the "fix at the ROOT, not in the consumer" precept; the ≥2-consumer / befitting bar (J inv 10 / L inv 8); the presets-in-consumers precept (deck-local token re-points are documented presets).
