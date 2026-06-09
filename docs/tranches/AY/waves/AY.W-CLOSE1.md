# AY.W-CLOSE1 — The terminal close: FINAL + `proof:ay-final` + overfitting audit + budget rebaseline

**State:** OPEN · **Repo:** glass-ui (`/Users/mkbabb/Programming/glass-ui`) · **Band:** E (the AX close, finished under AY)
**Type:** close (authors a gate + a FINAL + an audit; mutates `theme.css` + `proof-squircle-language.mjs` for the squircle reconcile)
**Depends on:** every AY impl wave landed; `AY.W-CARDINAL-INFRA` (mints `docs/tranches/AY/PROGRESS.md` + `AY/audit/visual/` + the `proof:live-verified-ledger:ay` arm) · `AY.W-LIVE1` (the cardinal gate freshness clause) · `AY.W-CARRY` (the register-completeness clause on `proof:disposition-live`) · `AY.W-DELTA0` (the AX owed-DELTA backfill: the 3 open `live-pending` rows W09/W19/W56 + the 6 `complete`-allowlist rows + the W52 own-surface re-capture — flips them all `live-verified`)
**Blocks:** `AY.W-PUB1` (the USER-DOMAIN master-merge + provenance publish; `proof:ay-final` is the staged-not-published readiness gate it runs at the tag boundary)

> bbnf wave spec. TRANCHE-DEVELOPMENT artefact. The implementer session authors the §FileBounds
> edits + the gate; the close ceremony runs `proof:ay-final` born-RED→GREEN. Per the hardened
> agent git clause (K W0): agents NEVER stage/commit/stash/checkout/reset/restore — the
> orchestrator owns the index. `proof:ay-final` is release-only (NOT ci), the DEV-meta analogue
> of `proof:au-final` — it asserts the close is COHERENT and staged to READY-TO-PUBLISH; the
> publish itself is USER-DOMAIN (W-PUB1).

---

## §0 — Goal criterion + completion criterion (paired)

**Goal criterion.** The AY tranche reaches a clean terminal close: the AX close that AY inherited
is FINISHED. A single meta-gate (`proof:ay-final`, born here) aggregates every close clause so
"is AY done?" is answerable by one artefact-verifiable command, not by reading prose across the 43
wave specs. The FINAL.md exists and cites a green run per wave. The two stale-base seeds the
hardening lanes flagged are RESOLVED ONCE: the squircle panel-membership contradiction (W56 body
+ gate say panels stay ROUND; the W56b amendment dated today RATIFIES panels JOIN the squircle
family) is DECIDED, and the new `--corner-shape-*` aliases are a CLEAN BREAK (no shadow keyword,
no dual round+squircle declaration — the no-backwards-compat keep). The orphan surfaces the
overfitting lane found (`evalFourier`, and the bespoke-copy CLASS) are caught by an authored
orphan-scan, not by a one-off grep. The bundle budget is rebaselined against the AY-landed dist
so `profile:budget --enforce` gates a reviewed reference, and no doc carries a stale version
assertion.

**Completion criterion.** The single hard gate below verifies, as ONE born-RED→GREEN command:
`npm run proof:ay-final` exits non-zero at this wave's open (FINAL.md absent, the gate's other
clauses unmet) and exits zero only when ALL of: (1) `docs/tranches/AY/FINAL.md` exists AND cites
a green run/actions per AY wave; (2) the FINAL carries an AX→AY inheritance cross-walk naming the
inherited close items (overfitting audit · FINAL · budget · squircle · publish-readiness) each
mapped to its discharging AY artefact; (3) the budget was rebaselined — the committed baseline
`docs/tranches/AP/W4-bundle-profile.baseline.json` reflects the AY dist AND `profile:budget
--enforce` is green; (4) no PROGRESS row anywhere in `docs/tranches/{AX,AY}/PROGRESS.md` carries
an open `live-pending`/`(DELTA owed)`/`(DEVELOPED)` token (the no-open-live-pending assert);
(5) BOTH `proof:live-verified-ledger:ay` (the AY-active cardinal gate) AND `proof:live-verified-ledger:ax`
(the AX backlog tracker — GREEN proves W-DELTA0 paid the 6 `complete`-allowlist + W52 + W19/W09 debt
the no-open-live-pending clause 4 cannot see) are GREEN, AND `proof:disposition-live` is GREEN with its
register-completeness clause (the W-CARRY register covers the full BOOK ledger);
(6) the squircle panel-membership is decided ONCE — `theme.css` + `proof-squircle-language.mjs`
AGREE, and `proof:squircle-language` is green over the decided policy; (7) the overfitting orphan
audit `docs/tranches/AY/audit/W-CLOSE1-overfitting-audit.md` exists and records a ZERO-ORPHANS
verdict (the `evalFourier` / library-orphan / bespoke-copy CLASS all dispositioned); (8) a
`.changeset/*.md` is staged AND `package.json` version is still `3.9.0` (STAGED-NOT-PUBLISHED — the
`v3.10.0` cut is W-PUB1/USER-DOMAIN). Born-RED is the correct close-open signal; the gate greens
only at the discharged terminal state.

---

## §1 — The verified defect (file:line)

### D1 (the gate is ABSENT) — `proof:ay-final` does not exist; "green" is undefined.

`grep '"proof:ay-final"' package.json` → no hit; `ls scripts/proof-ay-final.mjs` → absent. The
AY plan (`AY.md:188`, `EXECUTION-DAG.md:159`) names `proof:ay-final` as W-CLOSE1's hard gate, but
the gate it cites must first be AUTHORED. Per `TRANCHE-AND-WAVE-SPEC.md:41-42` a hard gate is
valid only when an artefact verifies it; a gate that does not exist cannot be that artefact. The
gate's CLAUSES must be specified in this spec or "green" has no definition (H-convergence F3;
H-cardinal §9 "For the AY pathing"). **GREEN after:** the authored `scripts/proof-ay-final.mjs` +
the `package.json` script, born-RED at this wave's open.

### D2 (FINAL.md is absent) — there is no AX-close report under AY.

`ls docs/tranches/AX/FINAL.md docs/tranches/AY/FINAL.md` → both absent. The tranche close report
(`tranche/SPEC.md`, the required document set) does not exist. AY is the corrective successor to
AX (`AY.md:3`) and ABSORBS the AX close — so the close report is `docs/tranches/AY/FINAL.md`, the
AY-tranche FINAL, with an AX→AY inheritance cross-walk (the AX close items finished under AY).
**GREEN after:** `docs/tranches/AY/FINAL.md` written, citing a green run per AY wave.

### D3 (the squircle panel-membership is CONTRADICTORY) — round and squircle simultaneously.

`scripts/proof-squircle-language.mjs:178-180` HARD-ASSERTS `--corner-shape-panel must be \`round\``
(the POLICY-CARD-ROUND clause), and the W56 spec body
(`AX.W56-squircle-design-language.md:81` — "cards, pills/buttons, small docks, and panels stay
ROUND") agrees. But the W56b amendment dated **2026-06-09** (today,
`AX.W56-squircle-design-language.md:13-20,155,177-180,217-221`) RATIFIES the USER-DECISION that
**panels JOIN the squircle family** ("extend the iOS superellipse to dialogs + sheets + panels +
glass hero cards"). The implementation already moved: `theme.css:94` is
`--corner-shape-panel: round` (the OLD policy) but the amendment's witness 6 demands
`superellipse(var(--corner-k-squircle))`. So at HEAD the gate would FALSE-RED the correct
implementation. H-precept-drift F6 + H-convergence: AY's "finish the AX close" cannot close while
the W56 gate and its own amendment disagree. **GREEN after:** the panel-membership decided ONCE —
gate clause 2 splits the round set (`card`/`pill`) from the squircle set
(`bigdock`/`dialog`/`sheet`/`panel`/`hero`); `theme.css:94` flips to the superellipse;
`proof:squircle-language` green over the decided policy.

### D4 (the new corner-shape aliases must CLEAN-BREAK) — no shadow keyword, no dual declaration.

The W56b amendment mints `--corner-shape-{dialog,sheet,panel,hero}`
(`AX.W56-squircle-design-language.md:217-221`); `theme.css:102-108` already carries
`--corner-shape-{dialog,sheet,thumb}`. The no-backwards-compat keep (CLAUDE.md; MEMORY
"No backwards compat") binds: the new aliases REPLACE, they do NOT alias a retired keyword, and no
surface carries a dual round+squircle declaration. `proof-squircle-language.mjs:269-276` already
forbids `.glass-card/.glass-btn/.btn-pill` carrying `corner-shape` (cards stay round even where
supported) and `:224-235,260-267` forbid an UN-gated `corner-shape` leak (the PE-gate must wrap
it). Those fail-closed clauses must stay; the panel addition rides the EXISTING `@supports
(corner-shape: superellipse(2))` token-read pattern (the `dialog`/`sheet` precedent at `:277-308`),
not a parallel block. H-precept-drift F7. **GREEN after:** `--corner-shape-hero` minted alongside
the existing `dialog`/`sheet`/`panel`; the panel/hero surfaces read `var(--corner-shape-{panel,hero})`
INSIDE the `@supports` block over the un-gated `border-radius` round fallback; no bare `squircle`
keyword anywhere off the token; `proof:squircle-language` green.

### D5 (the overfitting orphans have no scan) — `evalFourier` + the library-orphans + the bespoke CLASS.

H-overfitting Finding 2/3/4: (a) `evalFourier` is dead on a published subpath —
`src/components/custom/fourier-field/index.ts:4` re-exports it from `math.ts:39`, on the
`/fourier-field` subpath (`src/subpaths/fourier-field.ts`), with ZERO call sites
(`rg "evalFourier" src/ demo/` → def + re-export + a jsdoc `{@link}` only). (b) the route-prune
waves (W-SB1) resolve DEMO ROUTES but the component verdict on `header-ribbon` / `glass-panel` /
`useTokenColor` (0 src + 0 external consumers each — `useResolveTokenColor.ts:18-22` explicitly
disclaims consuming `useTokenColor`) is the substrate-without-consumer-binary invariant (L
invariant 8). (c) the bespoke-copy CLASS — the slides feedback-coder Fourier deck-local
token-drift is a second divergence surface the single-instance "kill constellation.ts" framing
misses. The AX close ran an overfitting audit (`proof:au-final.mjs:166-175` ZERO-ORPHANS clause
reads `W10-overfitting-audit.md`); AY's terminal close owes the equivalent audit document, and
`proof:ay-final` must read it. **GREEN after:** `docs/tranches/AY/audit/W-CLOSE1-overfitting-audit.md`
records every orphan's disposition (RETIRED with deletion-proof / EVIDENCED / demo-private) and a
ZERO-ORPHANS verdict.

> **Note — disposition vs. execution.** The actual RETIRE/keep EDITS for `evalFourier` and the
> three library-orphans land in their owning waves (`W-FF2` for `evalFourier`; `W-SB1`/`W-SB2` for
> the component verdicts; the slides arm for the bespoke CLASS). W-CLOSE1 does NOT re-execute those
> retirements — it AUDITS that they discharged and records the ZERO-ORPHANS verdict the gate reads.
> If an orphan survives undispositioned at close, the audit records it NON-zero and `proof:ay-final`
> reds (clause 7) — the close cannot lie.

### D6 (the budget baseline is stale) — `profile:budget --enforce` gates a pre-AY reference.

`scripts/profile-bundle.mjs:48-51` reads the committed baseline
`docs/tranches/AP/W4-bundle-profile.baseline.json`; `:446-459` the `--rebaseline` flag is the ONLY
path that writes it (a reviewed git mutation). AY landed dist deltas (glass-level, slider, dock,
constellation, the retirements). The baseline must be rebased against the AY dist so the budget
gate measures drift from a reviewed AY reference, not from the AP point. **GREEN after:** the
baseline reflects the AY dist AND `npm run profile:budget` (i.e. `--enforce`) exits zero.

### D7 (stale version assertions) — README/docs currency at the close.

`README.md` + the CLAUDE.md subpath surface + the migration docs carry version-bearing prose. The
close sweep asserts ZERO stale version assertions (no doc claims a version below the AY cut as
"current", no retired-symbol prose survives the AY retirements). The `proof:doc-consistency` +
`proof:design-md-current` + `proof:naming-consistency` gates (already in the fleet,
`package.json:576,671,672`) cover the structural half; the close adds the README-currency assert
to the FINAL's inheritance cross-walk.

---

## §2 — Objective

Author `proof:ay-final` as a real artefact-verifiable meta-gate (the `proof:au-final` analogue,
mechanically), write `docs/tranches/AY/FINAL.md`, run the overfitting orphan-scan audit, rebaseline
the budget, decide the squircle panel-membership ONCE (gate ↔ amendment reconciled, aliases
clean-break), and sweep README/doc version currency — so the AY terminal close is a single
born-RED→GREEN command with NO prose-only clause. Root-not-consumer (the squircle/budget/gate are
glass-ui-side), gestalt (one aggregating gate, not eight scattered prose checks), no-workaround
(the panel decision is a real token+gate reconcile, not a gate skip), greenfield-no-meta (the
FINAL builds on the real AX history, the cross-walk is accurate-status not invented).

---

## §3 — File bounds (edit-sites)

| File | Edit |
|---|---|
| `scripts/proof-ay-final.mjs` (**NEW**) | Author the meta-gate. Mechanical mirror of `scripts/proof-au-final.mjs`: ESM `.mjs`, lazy-memoized `cliPaths()`, a `detectFinal(inputs)` pure detector with IO injected (unit-testable clauses), a byte-stable JSON artefact via `writeGateArtifact`, a human summary, `process.exit(1)` on any violation, `import.meta.url === pathToFileURL(process.argv[1]).href` guard. The 8 clauses of §4. |
| `package.json` | ADD `"proof:ay-final": "node scripts/proof-ay-final.mjs"` (alongside `proof:au-final` at `:579`). Tag it `release`-only in `scripts/gates.mjs` manifest (NOT ci — the live-verification + close meta-gates are `local`/`release` only per the manifest note at `gates.mjs:30-41`). It is invoked by `release.sh` at the tag boundary and by the close ceremony. |
| `docs/tranches/AY/FINAL.md` (**NEW**) | The AY close report (`tranche/SPEC.md` close-document shape): the gate table (every AY wave id + its green run/actions/DELTA), the AX→AY inheritance cross-walk (§4 clause 2), the misses + named successors, the chronic-miss honesty roll-up, the publish handoff to W-PUB1. |
| `docs/tranches/AY/audit/W-CLOSE1-overfitting-audit.md` (**NEW**) | The orphan-scan run of `docs/audits/overfitting-audit.md` over `{SCOPE_PATHS=src/}` × `{CONSUMER_PATHS=src/ demo/ ../slides/src ../speedtest/src}`: the per-artefact table + the verdict column, the `evalFourier` / `header-ribbon` / `glass-panel` / `useTokenColor` disposition rows, the bespoke-copy CLASS row, and the verdict line "Zero orphans." with `library-orphan \| 0` + `delete-unused \| 0`. |
| `src/styles/theme.css:94` | `--corner-shape-panel: round` → `--corner-shape-panel: superellipse(var(--corner-k-squircle))` (the panel JOINS the squircle family, USER-DECISION R1). Mint `--corner-shape-hero: superellipse(var(--corner-k-squircle))` alongside `:102-108` (the new large-radius alias; `dialog`/`sheet`/`thumb` already minted). |
| `scripts/proof-squircle-language.mjs:178-180` | Reconcile the POLICY clause: REMOVE the `--corner-shape-panel must be \`round\`` assertion; ADD `--corner-shape-panel` to the squircle set (must resolve a `superellipse(...)` riding `var(--corner-k-squircle)`, mirroring the bigdock assertion at `:182-196`). Update the comments at `:9-10,32-33,169` to the decided policy (round set = card/pill; squircle set = bigdock/dialog/sheet/panel/hero). Extend clause 5 (`:247-308`) to assert the panel/hero glass surfaces read `var(--corner-shape-{panel,hero})` inside `@supports` (the dialog/sheet precedent), and that `--corner-shape-hero` resolves a superellipse in theme.css. |
| `src/styles/glass.css` (or `floating-panel.css`/`configurator`) | The panel + hero glass surfaces gain `corner-shape: var(--corner-shape-{panel,hero})` INSIDE the existing `@supports (corner-shape: superellipse(2))` block over the un-gated `border-radius` round fallback (the W56b folds 6-9 — landed in the squircle-finish wave; W-CLOSE1 AUDITS they discharged via the gate). If unlanded at close, this is the squircle-finish wave's bound, not W-CLOSE1's — but the gate clause 6 reds until both AGREE. |
| `docs/tranches/AP/W4-bundle-profile.baseline.json` | Rebased via `npm run profile:budget -- --rebaseline` against the AY dist (the reviewed mutation; `profile-bundle.mjs:452-459`). |
| `README.md` + version-bearing docs | The README-currency sweep (D7): no stale version claim, no retired-symbol prose. |

---

## §4 — `proof:ay-final` — the 8 clauses (the gate definition)

The gate is the `proof:au-final.mjs` structure with AY-specific clauses. The pure detector
`detectFinal(inputs)` returns `{facts, violations}`; `violations.length === 0 ⇒ pass`. Each clause
is artefact-verifiable (no grep-only, no "API exists").

1. **FINAL-EXISTS + per-wave green citation.** `docs/tranches/AY/FINAL.md` exists AND for each AY
   wave id (enumerate the `waves/` set — the 43 `AY.W*.md` specs at HEAD), the regex
   `${w}\b[\s\S]{0,200}(run|actions|green|DELTA|live-verified)` matches. Bite: drop a wave's
   green/DELTA citation → RED. (Mirrors `proof-au-final.mjs:135-150`; the wave list is read from
   `docs/tranches/AY/waves/*.md` filenames, not hardcoded, so a new wave is auto-required.)

2. **INHERITANCE-CROSSWALK.** The FINAL carries an "AX → AY inheritance" section mapping each
   inherited AX close item to its discharging AY artefact. The clause asserts the FINAL contains a
   line for EACH of the 5 inherited items, each within 200 chars of a discharging token: overfitting
   audit → `W-CLOSE1-overfitting-audit.md`; FINAL → this file; budget → `W4-bundle-profile.baseline.json`
   rebaseline; squircle → the panel-membership decision; publish-readiness → `W-PUB1`. Bite: omit an
   inherited item's mapping → RED.

3. **BUDGET-REBASELINED.** `docs/tranches/AP/W4-bundle-profile.baseline.json` exists AND a
   subprocess `node scripts/profile-bundle.mjs --enforce` exits 0 (the budget gate green against the
   rebased reference). The clause shells the profiler (the `verifyCiGreen` idiom at
   `proof-au-final.mjs:93-101`). Bite: dist drift over the un-rebased baseline → `--enforce` reds →
   clause reds.

4. **NO-OPEN-LIVE-PENDING.** Parse `docs/tranches/AX/PROGRESS.md` + `docs/tranches/AY/PROGRESS.md`
   wave rows (the `waveRows` parser from `proof-live-verified-ledger.mjs:77-95`); assert ZERO rows
   carry an open `live-pending` / `(DELTA owed)` / `(DEVELOPED)` token in their status cell. This is
   the cardinal-lesson terminal assert: a close cannot ship while a row is dev-landed-but-uncaptured.
   Bite: any surviving `live-pending` row (e.g. the W-DELTA0 backfill incomplete) → RED. **The open
   AX carriers re-verified at HEAD are {W09, W19, W56}** (NOT the stale "7 carriers
   W19/W45/W52/W53/W56/W57/W59" — W45/W52/W53/W57/W59 are ALREADY `live-verified` at HEAD); all
   three flip via W-DELTA0 (W56 readback, W19 deletion-proof, W09 absorbed-by-W52), and this clause
   is their terminal check.

5. **CARDINAL-GATE-GREEN (BOTH ARMS) + REGISTER-COMPLETE.** Three subprocesses exit 0:
   `npm run proof:live-verified-ledger:ay` (the AY-active cardinal gate — every AY visual wave's
   own-surface DELTA captured) AND `npm run proof:live-verified-ledger:ax` (the AX backlog TRACKER —
   the W-CARDINAL-INFRA §4a non-blocking arm; it must be GREEN at the terminal close, proving
   W-DELTA0 PAID the 6 `complete`-allowlist + W52 + W19/W09 debt — clause 4's NO-OPEN-LIVE-PENDING
   does NOT see the 6 plain-`complete` allowlist rows, only `:ax` does, so the `:ax` green is the
   load-bearing W-DELTA0-discharge check) AND `npm run proof:disposition-live` (the W-CARRY
   register-completeness clause: register-row-count ≥ ledger-BOOK-count). Bite: an AY visual wave
   with no own-surface DELTA → `:ay` reds; an unpaid AX `complete`-allowlist row → `:ax` reds; a
   BOOK ledger row absent from the register → disposition reds; any → clause reds.

6. **SQUIRCLE-DECIDED-ONCE.** A subprocess `npm run proof:squircle-language` exits 0 AND a parse of
   `src/styles/theme.css` confirms `--corner-shape-panel` resolves a `superellipse(...)` (the decided
   policy — panel JOINED the squircle family) AND `scripts/proof-squircle-language.mjs` no longer
   carries the string `--corner-shape-panel must be \`round\`` (the gate ↔ amendment reconcile — the
   contradiction is GONE, asserted by absence of the old policy line). Bite: theme says superellipse
   but the gate still asserts round → the gate reds → clause reds; OR the old policy-round line
   survives in the gate script → clause reds (the contradiction un-resolved).

7. **ZERO-ORPHANS.** `docs/tranches/AY/audit/W-CLOSE1-overfitting-audit.md` exists AND records the
   zero-orphan verdict: `/zero\s+orphans/i` AND `/library-orphan\s*\|\s*\*?\*?0/i` AND
   `/delete-unused\s*\|\s*\*?\*?0/i` (the `proof-au-final.mjs:170-174` shape). The audit explicitly
   dispositions `evalFourier`, `header-ribbon`, `glass-panel`, `useTokenColor`, and the bespoke-copy
   CLASS. Bite: an orphan survives undispositioned → the verdict is non-zero → clause reds.

8. **STAGED-NOT-PUBLISHED.** A `.changeset/*.md` (non-README) is staged AND `package.json` version is
   still `3.9.0` (the `v3.10.0` cut is W-PUB1 / USER-DOMAIN — `changeset version` bumps it). Mirrors
   `proof-au-final.mjs:177-183`. Bite: no changeset → RED; a bumped version → RED (the cut already
   ran, the close gate must run BEFORE the cut).

Plus the CLEAN-TREE allowlist guard (`proof-au-final.mjs:45-55,72-85`): `git status --porcelain`
carries only documented USER-DOMAIN dirt (the `docs/precepts` submodule pointer); any other dirty
entry means a gate mutated a tracked artefact (inv-θ) or the close is uncommitted → RED.

**DEV-meta, no born-RED@HEAD in the `au-final` sense:** the gate greens once FINAL.md + the
changeset + the discharged clauses exist. At THIS wave's open it is RED (FINAL absent, audit absent,
budget un-rebased, panel-contradiction live) — born-RED→GREEN across the close. The self-evident
born-RED is clause 1 (no FINAL.md at open).

---

## §5 — HARD GATE (evidence-backed)

**`proof:ay-final` is AUTHORED, born-RED at this wave's open, and driven GREEN aggregating all 8
clauses of §4 — the single terminal command for the AY close.**

Concretely, ALL must hold (the gate's own clauses, machine-verified):

- **G1 — born-RED at open.** `npm run proof:ay-final` exits NON-ZERO before the close artefacts
  exist (FINAL.md absent ⇒ clause 1 reds). Captured: the RED artefact
  `.cache/gates/AY-final.json` with `status:fail` + the clause-1 violation.
- **G2 — FINAL written + cross-walk.** `docs/tranches/AY/FINAL.md` exists, cites a green
  run/actions/DELTA per AY wave (clause 1), and carries the AX→AY inheritance cross-walk (clause 2).
- **G3 — budget rebaselined + enforced.** `docs/tranches/AP/W4-bundle-profile.baseline.json`
  reflects the AY dist AND `npm run profile:budget` (`--enforce`) exits 0 (clause 3).
- **G4 — no open live-pending.** ZERO `live-pending`/`(DELTA owed)`/`(DEVELOPED)` rows across
  `docs/tranches/{AX,AY}/PROGRESS.md` (clause 4); `proof:live-verified-ledger:ay` + `proof:disposition-live`
  both green (clause 5).
- **G5 — squircle decided ONCE.** `theme.css:94` resolves `superellipse(var(--corner-k-squircle))`
  for `--corner-shape-panel`, `--corner-shape-hero` is minted, the gate at
  `proof-squircle-language.mjs:178-180` no longer asserts panel-round, and `npm run
  proof:squircle-language` exits 0 over the decided policy (clause 6). The new aliases are
  clean-break: `grep -c "corner-shape\s*:\s*squircle\b"` over `src/styles/` returns 0 OFF the
  `@supports`-gated token reads (no bare keyword shadow); no surface carries a dual round+squircle
  declaration.
- **G6 — zero orphans.** `docs/tranches/AY/audit/W-CLOSE1-overfitting-audit.md` records the
  ZERO-ORPHANS verdict with `evalFourier` + the three library-orphans + the bespoke CLASS each
  dispositioned (clause 7).
- **G7 — staged-not-published.** a `.changeset/*.md` staged + `package.json` version == `3.9.0`
  (clause 8); the clean-tree guard green.
- **G8 — GREEN.** `npm run proof:ay-final` exits 0 with `.cache/gates/AY-final.json` `status:pass`,
  all 8 clauses satisfied — the captured GREEN artefact is the close evidence.

The DELTA backing this wave's own visual edit (the squircle panel/hero superellipse readback) is
NOT owed by W-CLOSE1 — it rides the squircle-finish wave's `proof:squircle-language` π cornerShape
readback (the W56b folds). W-CLOSE1's evidence is the gate-artefact pair: the RED `.cache/gates/AY-final.json`
at open (G1) and the GREEN one at close (G8), plus the FINAL.md + overfitting-audit.md documents.

**Verification commands (the close ceremony runs these):**

```
npm run proof:ay-final              # RED at open (G1), GREEN at close (G8)
npm run profile:budget              # --enforce; G3
npm run proof:squircle-language     # G5 — over the decided policy
npm run proof:live-verified-ledger:ay   # G4 — AY-active cardinal gate
npm run proof:live-verified-ledger:ax   # G4 — AX backlog tracker (W-DELTA0 discharge proof)
npm run proof:disposition-live      # G4 — register-completeness
node scripts/gates.mjs --verify-ci  # the matrix coherence guard (clean-tree sibling)
```

---

## §6 — Out of scope (named, not silently dropped)

- **The publish itself (W-PUB1).** master-merge + `v3.10.0` tag + provenance publish is
  USER-DOMAIN; `proof:ay-final` is the readiness gate, not the publish. The changeset is STAGED here;
  `changeset version` + the tag push are W-PUB1.
- **The orphan RETIRE edits.** `evalFourier` deletion (W-FF2), the component verdicts (W-SB1/W-SB2),
  the bespoke-copy CLASS (the slides arm) — W-CLOSE1 AUDITS the disposition, it does not re-execute it.
- **The AX 7-DELTA backfill (W-DELTA0).** clause 4 is the terminal CHECK that W-DELTA0 discharged;
  the captures themselves are W-DELTA0's.
- **The squircle CSS surface edits (the W56b folds 6-9).** the panel/hero `corner-shape` decls land
  in the squircle-finish wave; W-CLOSE1's gate clause 6 reds until theme ↔ gate AGREE, and decides
  the policy ONCE (the `theme.css:94` flip + the gate reconcile are W-CLOSE1's because they are the
  contradiction-resolution, the close-blocking seed).

---

## §7 — Goal/completion cross-check (the close-honesty self-audit)

- **Goal met?** AY reaches a clean terminal close: one command answers "is AY done?"; the squircle
  contradiction is gone; the orphans are caught by a scan, not a grep; the budget gates a reviewed AY
  reference; no doc lies about a version.
- **Completion met?** `npm run proof:ay-final` exits 0 with all 8 clauses green (the captured
  `.cache/gates/AY-final.json` `status:pass`), FINAL.md + the overfitting-audit.md exist, the budget
  baseline is rebased + enforced green, the squircle policy is decided once (theme ↔ gate agree), and
  the changeset is staged at version `3.9.0`.
- **A completion-miss blocks the close.** If any clause cannot green (e.g. a `live-pending` row
  survives because W-DELTA0 did not fully discharge), `proof:ay-final` reds and the close-honesty
  checklist names the successor (the owing wave) rather than forcing the gate green — the cardinal
  lesson: no prose-claimed close.
