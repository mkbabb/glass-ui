# PROOF-SWEEP — the banked adjudications (owner sitting items 1-7)

Run `wf_8a75422c-8a1` (`wf/proof-sweep.wf.js`), CLOSED 23/23 seats 0 errors, 2026-07-28.
Three Fable adjudications over 20 Opus evidence seats: (A) every uncommitted codex edit ·
(B) the chopping-block consumer proofs · (C) the BA-BJ tails inventory.

---

## LANE A · THE CODEX-EDIT DISPOSITION TABLE

modelId: **claude-fable-5**

# THE CODEX-EDIT DISPOSITION TABLE — lane-A adjudication, 2026-07-28

## 0 · Adjudication basis and fresh-disk re-verification

HEAD moved during the digest window (seats reported `0371836d`/`e277ea42`/`192879b7`; it is now `b505f1de`). I re-ran the load-bearing disputed claims this seat:

1. **Typecheck (A3 vs A4 — decisive conflict).** `npx vue-tsc --noEmit -p tsconfig.test.json` → **46 × TS2559, 2 × TS2345, 2 × TS2322, 2 × TS2339 = 52 errors** (exit measured this seat). A3's claim CONFIRMED exactly: 50 edit-induced errors on top of the 2 pre-existing `track-well-fold` TS2339s. `package.json:519` runs this tsconfig inside `npm run typecheck`, which gates `prepublishOnly` (`package.json:514`). **Every ADOPT verdict A4 issued for an annotated file is overruled to HOLD** — A4 never ran vue-tsc; committing any `governedInvariant`-annotated file with the wrapper as-authored breaks the publish gate.
2. **postcss provenance (A2's devDep carve-out — REFUTED).** `git show HEAD:tests/gates/type-hygiene.test.ts | grep postcss` → empty; same for `token-hygiene` and `reka-binding-idiom`. The postcss/`@vue/compiler-sfc` imports exist **only in the working tree**. A2's ground "pre-existing HEAD defect this diff happens to fix" is false on disk — the devDeps have no standalone justification and **ride the sweep: HOLD**, not ADOPT.
3. **Sol substitutions confirmed** at `docs/tranches/BJ/ASK.md:270` and `:377` ("Sol x-high + DesignSync", "Sol x-high/DesignSync") — void per `EXEC-STATE.md:62,455-457` and the e277ea42 posture commit ("Sol/Luna process directives VOID").
4. **Fresh status:** `docs/tranches/BJ/EXECUTION-PROGRESS.md` and `PLAN.md` are now **clean** (committed mid-window), so A5's "committed cursor" cites hold. Four dirty docs and the coordination/addenda untracked trees were **digested by no seat** — they enter the table as out-of-scope holds, never blind commits.
5. Multi-seat-corroborated findings taken as established without re-run: the `vitest.config.ts` include-union (A2 measured 6.5×, A3 `vitest list` = 200/199, A4 observed double execution); the verifier running green with the on-disk sha match (A2, A3, A4 all executed it); the runtime-inert wrapper (A3, A4 quoting `governedInvariant.ts:36-38`).

**Adjudication test applied throughout:** ADOPT-COMMIT only if some amendment-free or mechanically-amendable form lands under the standing record; REVERT only if **no** owner ruling ever lands these bytes AND the bytes are banked or reproducible; HOLD-FOR-OWNER otherwise, per J-11 (`TERMINAL-ROSTER.md:22` — "adjudicate, commit or discard, never lose any of it").

---

## 1 · DISPOSITION TABLE

### Class ADOPT-COMMIT (5 files — 4 need mechanical pre-commit amendments, spec'd in §3)

| # | file | verdict | grounds |
|---|---|---|---|
| 1 | `docs/tranches/BJ/FEEDBACK-LEDGER.md` | **ADOPT-COMMIT as-is** | Pure append (+9/−0), verbatim owner words, evidence on disk; three committed files (`ECOUTE.md:8`, `RECONCILIATION.md:150`) assert the 68-row count that is **false at HEAD** without it. The v6-only `appearance="dashboard"` defect and the F18-vs-CFR-01 conflict are already owned by `RECONCILIATION.md:289` R-1 — dated brackets later, never edits to the row body |
| 2 | `docs/tranches/BJ/addenda/2026-07-23-metric-shape-consumer-report.md` (untracked) | **ADOPT-COMMIT with #1** | Adjudicator's addition: CFR-01's cited evidence doc is untracked; committing the ledger row without it mints a dangling cite — the exact disease this adjudication exists to stop. A5 verified the file on disk (4,785 B, honest v6 scoping) |
| 3 | `docs/tranches/BJ/ASK.md` | **ADOPT-COMMIT (AMENDED — A-1, A-2 mandatory)** | Reverting breaks the committed record: `EXECUTION-PROGRESS.md:246,259,262-266`, `BK/PORT.md:117,158-165` cite ASK-28..33 which exist only here. Rows are freeze-law-compliant new mints; every bracket cite verified by A5 on disk. Blocking amendments: strike the two void Sol seats (`:270`, `:377` — `EXEC-STATE.md:62`); convert the 8 destructive §5 cell rewrites to strike-in-place (`EXECUTION-PROGRESS.md:289` forbids reword; old cells recoverable from `git show HEAD:`). Recommended, non-blocking: scope ASK-32 to the gated-variant half (first fork already RATIFIED, `GF-DOCK-PASS3.md:245,321`); true the ASK-26 cell to DECLINE (`EXECUTION-PROGRESS.md:264`) |
| 4 | `docs/tranches/BJ/waves/BAND-REDUCTION.md` | **ADOPT-COMMIT (AMENDED — A-3)** | Byte-matches the committed cursor on `AP-33` (`EXECUTION-PROGRESS.md:289-290`); STAB9 escalation demoted-not-deleted (strike-in-place honored); `ASK A4`→`ASK-33` repairs correct. One factual error must be fixed pre-commit: `"Deck/FM W8"` — FM has no W8; correct is REDUCTION W8 deck-half + FM W6 (`BAND-FEEDBACK-MOTION.md:299`, `BAND-REDUCTION.md:820-824`) |
| 5 | `scripts/safari-probe.mjs` (untracked) | **ADOPT-COMMIT (AMENDED — A-4)** | Cited by path in the terminal paint protocol (`CURES.md:290`, `COMPONENT-WAVES-TERMINAL-3.md:571,1299`); the #4 TRACK-STRAYS row makes its landing the precondition for `G-CITE-COMMITTED` (`TERMINAL-ROSTER.md:55,325`). Must not land with D1/D3 baked in: `:18` default port 4188 serves nothing (dev = 5400), `:56` reads unprefixed `backdropFilter` only (silent-zero against no-masking-fallback), `:37` never re-reads the window rect (unverified MOBILE label = fabricated cell class per live-verify-capture). Preferred amendment: swap in the strictly-later probe body at `scratchpad/bj10/safari.mjs` (already carries 5400 + webkit fallback + squircle/radii cells); path cites survive a body swap |

### Class REVERT (2 files — banked via stash before removal, §5 step 1)

| # | file | verdict | grounds |
|---|---|---|---|
| 6 | `vitest.config.ts` | **REVERT (bank first)** | No owner ruling lands these bytes. With `extends: true` the project `include` **unions** with the root include: `chip-listener` collects all 200 files (A3 `vitest list`), serially, under the global `addEventListener` monkeypatch — measured 6.5× wall (57s→367s, A2), and **verdicts diverge by project** (`token-graph` fails only under `chip-listener`; `aurora-stage-affordance`/`router-field-ownership` only under `unit`). A suite whose verdict depends on which project drew the file is not a gate. It also drops vitest's default excludes and double-invokes the 24.7s verifier. The chip-isolation *intent* survives in the banked stash + the held `chipListener.setup.ts`; on ratification the config must be redesigned (root `include: []` + fully explicit per-project includes, or per-file setup import), never re-proposed as-is. Accepted consequence: the held-dirty `chip.contract.test.ts` runs RED locally until the owner sitting — the tree is already RED and honesty outranks a doubled suite |
| 7 | `motion-probe.json` (untracked) | **REVERT (delete; emitter preserved)** | Zero citers beyond the stray census; mid-token truncation makes every cell inadmissible (`".glass-capsule-hover:not([data-press-armed {scale: 1;}"`); rule provenance points into gitignored `dist-demo/`; its one substantive reading (hover 1.015) is superseded by an adjudicated, better-measured cell at `PROPORTION-CATEGORIES.md:60`. The durable artefact is the emitter `scratchpad/probe.js`, not the dump |

### Class HOLD-FOR-OWNER — the governance sweep (one atomic unit, adjudicate at a single sitting)

The e277ea42 posture ruling is dispositive: the codex meta-audit is **EVIDENCE, "preserved, not ratified."** Two tracked terminal docs disagree about whether this instrument even exists under the 60-seat ceiling — `COMPONENT-WAVES-TERMINAL.md:501,1179-1187` prices C19 as live (53→59 of 60), `docs/tranches/BK/gates/ROSTER.md` sums its own disjoint `G-*` roster to 60 with intake CLOSED (J-4), and the two share **zero** ids (A2 §9b). Same user ceiling, budgeted twice, two totals. That is an owner adjudication, and until it lands nothing below commits — reinforced by four hard blocks measured this seat or corroborated across seats: (i) 50 edit-induced typecheck errors via `governedInvariant.ts:19`; (ii) hard import dependency on 4 untracked artifacts (atomicity mandatory); (iii) the verifier sha-pins an untracked 35MB tranche tree and self-locks (`verify-governed-invariants.mjs:14-17,359-379`), and `prepublishOnly` would inherit that dependency; (iv) `token-graph` deterministically RED at the 5000ms default (7.39s isolated, A4).

| # | file(s) | verdict | key grounds beyond the shared blocks |
|---|---|---|---|
| 8 | `package.json` | **HOLD (entire file — A2's devDep carve-out OVERRULED)** | Script wiring binds `npm test` and the publish path to the held instrument; devDeps' standalone ground refuted on disk (§0.2) — postcss/compiler-sfc imports exist only in held working-tree files |
| 9 | `package-lock.json` | **HOLD** | Rides #8; committing it alone desyncs nothing but buys nothing |
| 10 | `scripts/verify-governed-invariants.mjs` (untracked) | **HOLD** | Competent and fail-closed, but: untracked-roster sha pin (fresh clone dies), self-lock (`verifyEnrollment`), literal `^`-range pins that red the suite on any routine dep bump. On ratification: track the roster, relax the range pins, keep the vue≡compiler-sfc equality |
| 11 | `vitest.governed-setup.mjs` (untracked) | **HOLD** | No meaning apart from #10; duplicates the npm-script invocation (2 × 24.7s); `process.cwd()` root-fragile |
| 12 | `tests/governance/governedInvariant.ts` (untracked) | **HOLD (amend then land on ratification)** | Runtime-inert by construction (`:36-38`) — but `:19` `Parameters<typeof it>[1]` resolves to `TestCollectorOptions` under Vitest 4, the single root of all 46 TS2559 + the checkbox TS2345. One-line type fix is the gate to everything else |
| 13 | `tests/governance/chipListener.setup.ts` (untracked) | **HOLD** | Strongest artifact in the set (self-proving interposition) but mis-scoped by #6 onto 200 files, and carries the ledger-constant fictions (TS2322 at `:160`; `decoyTraversals` counters never incremented) that make the chip test's expects tautological — strike before landing |
| 14 | `tests/governance/fixtures/captureEventMethod.ts` (untracked) | **HOLD** | Rides #13; no independent existence |
| 15 | 13 annotation-only contract tests: `accordion` · `checkbox` · `command` · `dropdown-menu` · `infinite-scroll` · `labeled-field` · `number-field` · `pager-dots` · `slider` · `sortable-list` · `tags-input` · `tooltip` · `typewriter` (`tests/components/*.contract.test.ts`) | **HOLD** | Byte-identical assertion bodies (A3); land as-authored once #12 is fixed **and** the owner ratifies; if the owner rejects, revert to HEAD losing nothing (annotations carry zero assertion content). A3's outright-REVERT is softened to HOLD: the ratification question is open in the tracked record, not closed. `checkbox` additionally needs #12's `.each` tuple-union fix (TS2345) |
| 16 | `tests/components/avatar.contract.test.ts` | **HOLD — body-preserve directive** | The `Image`-stub rewrite is genuine hardening (single-probe proof, `loading`→`error` ordering, identity-node stability) and must survive **either** owner ruling: on rejection, strip the annotation and keep the body |
| 17 | `tests/components/custom/typewriter/TypewriterText.contract.test.ts` | **HOLD — body-preserve** | Awaited promise + `getTimerCount()===0` leak gate are real; flag: the immediate-settle property is no longer proven (timers drained pre-assert) — A3's CANNOT-VERIFY on that sub-claim carries |
| 18 | `tests/components/ui/reka-binding-idiom.test.ts` | **HOLD — body-preserve after TS2322 fix** | The CSS mutation controls are the opposite of theatre (both mutants verified discriminating against `src/components/button/styles.css:30,35`); the `walkDecls` arrow needs a braced body (`:39` TS2322) |
| 19 | `tests/components/chip.contract.test.ts` | **HOLD — strike tautologies first** | Real strengthening (data-mode identity, role/tabindex nulling, hostile-listener probe) entangled with expects that restate setup constants (`:159-160`, `:216-222` vs `chipListener.setup.ts:153,156,208-209`) and a hard coupling to the defective #6 project. Cannot run under `unit` at all |
| 20 | `tests/public-surface.spec.ts` | **HOLD** | Manifest byte-identical — the S0 `surface.root.exact` RED survives honestly and is cured only by W-REFRACT-DELETE's subtraction, not by anything in this sweep. A4's ADOPT overruled on typecheck + atomicity only |
| 21 | Annotation-only gate/style/motion tests: `tests/gates/orphan-css-partial.test.ts` · `tests/styles/glass-subtlety.test.ts` · `tests/styles/radius-dialog-bind.test.ts` · `tests/styles/typography.test.ts` · `tests/composables/motion/springProjection.test.ts` · `tests/composables/motion/springTokenMirror.test.ts` | **HOLD** | Same as #15 (A4's ADOPTs overruled on typecheck). `typography` carries the unperformed `migrationTransform` (both literals the roster orders deleted still on disk at `:15-17,:26`) — standing debt, discharge at land |
| 22 | Detector-conversion gates: `tests/gates/token-hygiene.test.ts` · `tests/gates/type-hygiene.test.ts` · `tests/gates/boot-graph.test.ts` | **HOLD** | The postcss/AST conversions are real strengthenings (comment-satisfiable regex → lineage proof; `RAW_FONT_SIZE` now catches `clamp(...)`) and discharge the roster's `requiredDetectorRedress` — worth landing under either ruling, but each carries the annotation (typecheck) and postcss dep (#8). On rejection: strip annotations, keep detectors — that is the KISS cut |
| 23 | `tests/styles/token-graph.test.ts` + `tests/styles/tokenGraphDetector.ts` (untracked) | **HOLD — three defects to cure** | Deterministically RED at the 5s default; three assertions that cannot fail (`:286`, `:341`, `:412-413`); and a **product gate reading `docs/tranches/**` as input data at module scope** (`:36-50`) — the architectural inversion A2 correctly demands severed regardless of the ratification ruling |
| 24 | `src/composables/glass/supportsBackdropRefract.ts` (+37/−4) | **HOLD — sequenced to W-REFRACT-DELETE's land seat. THE ONE src/ FENCE MATTER, see §2** | Three record cites already own its disposition (`VALIDATION.md:61` CURE-8, `CURES.md:116`, `FROST-TABS-REAUDIT.md:116,179`); the file it hardens is ruled DELETE (`TERMINAL-ROSTER.md:53`, owner-reversible in one word). Cures 3-of-4 routed defects (per-Document starvation uncured — `:52,:144` unchanged); does not touch the S0. On reversal only: ADOPT-WITH-AMENDMENT (per-Document `WeakMap` keying + retry cap for the new unbounded-re-probe path). On DELETE: record the diff verbatim in #2's §CLOSE or cite the stash SHA |
| 25 | `tests/composables/glass/supportsBackdropRefract.test.ts` (untracked) | **HOLD (REVERT-as-authored if anyone proposes landing now)** | Measured RED ×2 projects (barrel-cell 5s timeout); the `dist/.d.ts` arm is the documented launderer class (`BAND-MATERIAL.md:1291-1296` — passes only via a stray local build); pins the two exports the DELETE removes, writing the S0 into the suite as an expectation; the owed two-document born-RED arm is absent. The 14 lifecycle tests are craft worth carrying in #24's record |
| 26 | `card-raw.json` (untracked, repo root) | **HOLD-FOR-OWNER → default delete** | Named on the Φ0 docket twice (`TERMINAL-ROSTER.stage2-take2.arm-fable.md:59`, `stage2.arm-opus-run2.md:88`) — this seat does not pre-empt that row. Content verified true at HEAD but fully re-derivable from `tokens/glass.css:150-151,189-190,211-212` + `theme/radius.css:67,78`; light-mode-only, fails the `CURES.md:290` P0 mode-assertion. If the frost-thinning ruling cites it: move to `docs/tranches/BJ/evidence/<wave>/` with a dark arm + mode stamp. Never the root |

### Class OUT-OF-DIGEST-SCOPE (no seat examined these — CANNOT-VERIFY, HOLD, do not commit blind)

| # | file(s) | disposition |
|---|---|---|
| 27 | `docs/tranches/BJ/addenda/2026-07-24-refinement/PROCEDURAL-APOTHEOSES.md` (M) · `TERMINAL-ROSTER.md` (M) · `docs/tranches/BK/EXECUTION-PROGRESS.md` (M) · `docs/tranches/BK/PORT.md` (M) | **HOLD — CANNOT-VERIFY.** Dirtied after/outside the digest window, almost certainly by the live proof-sweep/stage-2 workflow seats (HEAD `b505f1de` shows that fold mid-flight). Not codex edits; not mine to disposition. Do not touch |
| 28 | Untracked coordination + addenda trees: `docs/tranches/BJ/coordination/` (36 SOL-TO-CLAUDE steers, SCI-BEAD-INBOUND, atlas/valuejs outbounds, `webkit-dock-crash-repro.html`) · `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/` (incl. the C19 roster) · the stage-2 arm files | **HOLD — Φ0 docket / #63 gitignore-or-sweep row** (`TERMINAL-ROSTER.md:111`). One dependency note: if the owner ratifies the governance instrument, `GATE-SEMANTIC-ROSTER-C19.json` MUST track in that same atomic cut (fresh-clone death otherwise) |

---

## 2 · LOUD FLAGS

**src/-byte fence matter — exactly one, and it is sequenced.** `src/composables/glass/supportsBackdropRefract.ts` is the **only** src/ file in the entire codex edit set. It is a +37/−4 hardening of a module the ratified roster **deletes** (`TERMINAL-ROSTER.md:53` W-REFRACT-DELETE, overturn recorded at `:312`), inside the branch the Sixth Ecoute outlaws (`FROST-TABS-REAUDIT.md:106-108`, engine-conditional glass paint). Three record cites make its reconciliation the property of #2's land seat, not of any adjudication commit. Any seat that commits it independently is defying the sequencing rulings.

**Gate-semantics changes — theatre and weakenings (a weakened assertion is theatre):**
1. **Tautological expects in `chip.contract.test.ts`** (`:159-160`, `:216-222`): `positiveTrace` equals the literal at `chipListener.setup.ts:156`; `decoyTraversals` counters are never incremented; `positivePredicate`/`chainsUnchanged` are `as const` literals. Four expects that cannot fail; the real enforcement is the setup-time `throw`. TS2322 at `chipListener.setup.ts:160` exposes the fiction.
2. **Three cannot-fail assertions added to `token-graph.test.ts`** (`:286`, `:341`, `:412-413`) — filler wearing mutation-coverage clothes.
3. **`caseIdentity` verification is literal-vs-literal** (`verify-governed-invariants.mjs:541-543`) — a tamper seal on the declaration, never a derivation from the product. The convergence-gates anti-pattern (duplicated derived data gated against itself) at the heart of the new instrument.
4. **`token-hygiene` surface narrowing**: `.vue` scanning now covers only `<style>` blocks (`:64-66`); template inline `style="border-radius: 13px"` would have red at HEAD and is now invisible. Roster-authorized, not currently exploited — but a narrowing.
5. **`TypewriterText` immediate-settle property no longer proven** (timers drained before the assert). Net stronger file, one property lost.
6. **The include-union amplifier** (`vitest.config.ts:42` vs `:55`): whole suite ×2, verdicts diverging by project. Not an assertion change — a verdict-integrity failure, which is worse.
7. **Positive findings, for balance**: `public-surface` manifest byte-identical (the S0 RED survives untouched — no laundering); `boot-graph` comment-satisfiable regex → full AST lineage proof; `type-hygiene` `RAW_FONT_SIZE` now catches `clamp()`; `avatar`/`reka-binding-idiom` carry real, verified-discriminating mutation controls. **No pre-existing product assertion was weakened anywhere in the set** (A3+A4 concur; wrapper is a runtime passthrough).
8. **The dual-roster 60-seat conflict** (C19: 53/60 dotted ids vs `BK/gates/ROSTER.md`: 60/60 `G-*`, zero overlap, both claiming the one user-mandated ceiling) — the owner adjudication on which the entire HOLD class turns.

**Digest-claim overrules, for the record:** A2's devDep ADOPT carve-out (ground refuted on disk — no postcss import at HEAD); A4's ten ADOPT-COMMITs (typecheck break confirmed by run + atomicity with held untracked artifacts). All other seat verdicts sustained, some tightened. Carried CANNOT-VERIFYs: live-engine probe discrimination (A1); the "canonical 30-subpath claim" (A4 — no on-disk figure); flake-vs-deterministic on the three cross-project failure deltas (A2); the exact `card-raw.json` emitter variant (A6); the TypewriterText immediate-settle empirical delta (A3).

---

## 3 · Pre-commit amendments (land-seat edits, exact specs — nothing commits without its amendment)

- **A-1** (`ASK.md`, blocking): `:270` `Sol x-high + DesignSync` → `Fable + DesignSync`; `:377` `Sol x-high/DesignSync` → `Fable/DesignSync`. Grounds: `EXEC-STATE.md:62,455-457`; moot besides (`EXECUTION-PROGRESS.md:264` records ASK-26 DECLINE).
- **A-2** (`ASK.md`, blocking): the 8 rewritten §5 cells (ASK-6/13/15/16/17/20/21/22) become strike-in-place — `~~<HEAD cell text>~~ <new text>`, HEAD text from `git show HEAD:docs/tranches/BJ/ASK.md`, matching the file's own mechanism at `:24,:57`. Recommended same commit: scope ASK-32 to the gated-variant half; true the ASK-26 cell to DECLINE.
- **A-3** (`BAND-REDUCTION.md`, blocking): `Deck/FM W8 already severed and executed` → `REDUCTION W8 deck-half + FM W6 already severed and executed`.
- **A-4** (`scripts/safari-probe.mjs`, blocking): `:18` default `TARGET` → `http://localhost:5400/`; `:56` → `s.backdropFilter || s.webkitBackdropFilter`; `:37` capture the returned rect and abort the labelled run on mismatch — or swap in the `scratchpad/bj10/safari.mjs` probe body wholesale (preferred; already carries the first two plus squircle/radii/glassSummary cells).

---

## 4 · Discharge conditions for the HOLD class (stated so they cannot rot)

At the single owner sitting on the governance instrument (row #1 / J-11): **RATIFY** → one atomic cut containing: the `governedInvariant.ts:19` type fix (+ `.each` tuple fix) · a redesigned `vitest.config.ts` (include actually restricting) · the tracked C19 roster · relaxed range-pins in the verifier · the token-graph timeout + the three vacuous lines struck + the `docs/`-read severed · the chip ledger tautologies struck · the 28 annotated files · `package.json`+lock — then re-run `npm run typecheck` and `npm test` to green-or-known-RED before any tag. **REJECT** → revert the 24 annotated tracked files to HEAD, keep the avatar/TypewriterText/reka bodies and the three detector conversions as stripped-annotation edits, delete the untracked governance artifacts after banking. Either way: `supportsBackdropRefract.ts` (#24) and its test (#25) discharge **only** at W-REFRACT-DELETE's land seat, per the standing sequencing rulings.

---

## 5 · GIT COMMAND LISTS (text only — I run nothing; land seat executes top-to-bottom)

**Step 0 — bank everything first (J-11; before any revert):**
```
cd /Users/mkbabb/Programming/glass-ui
git diff > /private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-9bbe793e21-adjudication-bank.tracked.patch 2>/dev/null || git diff > /tmp/codex-2026-07-28.tracked.patch
tar -czf /tmp/codex-2026-07-28.untracked.tar.gz scripts/verify-governed-invariants.mjs scripts/safari-probe.mjs vitest.governed-setup.mjs tests/governance tests/styles/tokenGraphDetector.ts tests/composables/glass/supportsBackdropRefract.test.ts card-raw.json motion-probe.json
```

**Class REVERT (banked-and-removed atomically; record the stash SHA in the adjudication receipt):**
```
git stash push -u -m "codex-2026-07-28 REVERT bank (lane-A adjudicated): vitest.config.ts include-union + motion-probe.json truncated dump" -- vitest.config.ts motion-probe.json
git stash list --format='%gd %H %s'
```

**Class ADOPT-COMMIT (only after amendments A-1..A-4 are applied and verified by re-reading the four files):**
```
git add docs/tranches/BJ/ASK.md docs/tranches/BJ/FEEDBACK-LEDGER.md docs/tranches/BJ/addenda/2026-07-23-metric-shape-consumer-report.md docs/tranches/BJ/waves/BAND-REDUCTION.md
git commit -m "docs(BJ): land the Sol-era record cut — ASK-28..33 minted, CFR-01 + evidence addendum, W7=AP-33 (amended: Fable seat restored per EXEC-STATE §model-law, §5 cells strike-in-place, FM-W6 cite fix)"
git add scripts/safari-probe.mjs
git commit -m "feat(scripts): track the Safari WebDriver probe (amended: 5400 default, -webkit-backdrop-filter fallback, rect assert) — lands the #4 stray toward G-CITE-COMMITTED"
```

**Class HOLD-FOR-OWNER (no commit commands — guards only):**
```
git restore --staged .        # only if anything is staged; nothing currently is
# NEVER run: git add -A | git add . | git commit -a   (the #63 G-NO-EVIDENCE-COMMIT hazard — 40+ untracked coordination/addenda files would ride along)
# deferred, post-Phi-0, only if the frost ruling does not cite it:  rm card-raw.json
# deferred, W-REFRACT-DELETE land seat only:  disposition of src/composables/glass/supportsBackdropRefract.ts + tests/composables/glass/supportsBackdropRefract.test.ts
```

**Post-commit verification (any class):**
```
git status --porcelain        # confirm only intended paths moved
npm run typecheck             # must show exactly the 2 pre-existing track-well-fold errors, nothing new
```

---

## LANE B · THE DISPOSITION EVIDENCE TABLE

All evidence grounded. Composing the disposition table.

---

modelId: **claude-fable-5**

# LANE-B ADJUDICATION—THE DISPOSITION EVIDENCE TABLE

Sources of ratified record: `docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md:113` (row 18), `:135` (row 40), `GESTALT.md` Ruling 1 (`:11-19`) and Ruling 6 (`:32`). Seat concordance: B1/B2/B3/B4 agree on every cell except three, each re-grepped this seat (§0). Class law (B4 §2, adopted): every consumer pin is caret-or-exact within its major, so no 8.0.0 publish breaks an install—**ON-7.x** = relay addendum REQUIRED in the consumer's tranche; **OLD-MAJOR** = burden subsumed by an already-owed multi-major rewrite, relay noted-not-blocking (consumer-updates ruling).

## §0 · Incredulity re-greps—three contested cells, ruled

| Cell | Dispute | Re-grep result | Ruling |
|---|---|---|---|
| deck in atlas | B3: atlas ×3 files incl. `useDeckDetent.ts`; B4: detent mirror-only | Closed-universe `.p-totality/atlas/src`: `editorial/DashboardEssay.vue:51,172` + `stage/useStageDeck.ts:2,26`—**no** `useDeckDetent.ts`, and `DashboardEssay.vue:169` records "no `useDeckDetent`" by design. Mirror (`atlas@6.0.0`) holds `stage/useDeckDetent.ts:1,127` + `useStageDeck.ts:2` | **B4 correct**; B3 conflated active with mirror |
| muster metric-family | B3 ×4 files; B4 ×5 | 5 import files confirmed: `RankedVerdict.vue:40` + `WhyThisWonSheet.vue:35` (`MetricStack, MetricRow` from `/metric-stack`), `TravelMatrix.vue:27` (`MetricCell`), `WinnerHero.vue:48` + `CommandDock.vue:42` (`MetricBadge`); +1 test stub `WinnerHero.spring.spec.ts:80` | **B4 correct**; note the extra symbol `MetricRow` |
| completion-seal atlas cite | Roster names `DashboardHero.vue`; B3/B4 name `completion.ts`+`category.ts` | Both true—one chain: direct glass-ui edges are `src/design/recipes/completion.ts:5` (value+types) and `src/skin/category.ts:1` (type-only); `DashboardHero.vue:49` imports the local shim and renders `<CompletionSeal>` at `:372` | Direct-edge count = 2 files; render site real |

HEAD census run this seat: all 16 component dirs exist under `src/components/`; subpath exports exist for all **except** `./avatar` and `./tags-input` (absent from `package.json` exports), and `./metric-badge`/`./metric-cell`/`./metric-stack` are absent (dirs gone, exports gone—the cut already shipped in 7.0.0 per B4's `git show v7.0.0:package.json`).

## §1 · The table

**1. carousel—OWNER WORD BINDS: NOT DELETED.**
- Consumers: words@^3.0.0 only—`frontend/src/components/custom/definition/components/media/ImageCarousel.vue:83-90` (2 edges; `Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious` + `type CarouselApi`), substantive (embla api drives lazy-load `:157-169`, delete-fixup `:190-221`, keyboard `:245-258`), reachable on six routes via `Home.vue:48` (`router/index.ts:8-40`); +`vite.config.ts:217` optimizeDeps. Zero elsewhere; zero root-barrel `Carousel` anywhere (B2 §2, positive-control-validated).
- Ratified: **KEEP by owner word** (A-2 item 5, `TERMINAL-ROSTER.md:113`; `:307` restores the component count to 55/54; `:171` strikes the deletion relay—words rows become adopt evidence). Consolidation-into-apotheosis stays legal; deletion does not.
- Evidence: **SUSTAINS**. Component alive at HEAD (`package.json:244`, source+story+contract test—B2 §4); the words census is exactly the S-11 ground-strike the roster banked. Three adopt riders travel with the KEEP: (i) `CarouselNext/Previous` deleted at `490cc46e` and gated out (`tests/components/carousel.contract.test.ts:65-66`)—words' `:87-88` breaks on adopt; (ii) silent a11y regression—HEAD gates `role/aria-roledescription/tabindex` on `ariaLabel` (`Carousel.vue:11,86-90`), words passes none and its local `handleKeydown` is unbound; (iii) stale barrel doc `src/index.ts:36-37` still advertises Next/Previous.
- Relay: **OLD-MAJOR only** (words ^3.0.0)—adopt addendum in words' tranche, not blocking.

**2. instrument-chassis—OWNER CONDITION: DELETES UNLESS THE USE CASE IS PROVEN. The proof, stated plainly: it does not stand on the current contract.**
- Consumers: speedtest@^4.0.1—4 import edges + type seam (`App.vue:257` shell on all non-suppressed routes `:98-155`; `ChartsView.vue:132` ×2 mounts; `MapView.vue:53`; `useRouteTransition.ts:31-34` type seam) + anatomy-coupled CSS (`SpeedtestResults.vue:916-946`, `ThankYou.vue:177`) + `vite.config.mjs:1042` + test mock `tests/App.surveyEntry.test.ts:101`. muster@^3.1.0—6 edges/5 files (`App.vue:31,215-437` root shell, no `v-if`; `WinnerHero.vue:46-47` the LCP element; `InstrumentAside.vue:17` with `ChassisDivider` rendered ×3 `:58,63,68`; `VerdictStage.vue:11`; `useMusterApp.ts:33`) + critical-CSS allowlist (`extract-critical-css.mjs:58`). **Zero at value, atlas, keyframes, sci on any contract** (B1 §4, all four seats concordant).
- Ratified: S2 **DELETE as default** behind the owner's proof condition (`TERMINAL-ROSTER.md:113`, A-2 item 6); verdict rests with the owner on this delivered list.
- The adjudication: the use case is **proven in substance at old majors**—two shipping apps' load-bearing housings, 10 edges, 8 render sites. But **not one edge compiles against HEAD**: every consumer targets `ChassisDivider`, `InstrumentChassisPhase/Variant`, `variant`/`phase` props, `#dial/#strip/#control` slots—all deleted at HEAD, which exports only `InstrumentChassis` with `state|tone|proportion|boundaries|reserve` and `stage|inspector|action` (`src/components/instrument-chassis/index.ts:1-8`, `types.ts:8-15`, `InstrumentChassis.vue:47-58`). The HEAD artefact has **zero adopters at any version**; its only forward signal is one unimplemented doc line at value.js (`area-scenes.json:331`, HEAD "inspector" vocabulary). On the owner's named proof set—value.js: 0 code; speedtest: proven against the deleted API only. **The proof fails on the version axis before the prop axis is reached** (B4 §5.2). Both consumers owe full multi-major rewrites regardless.
- Verdict on the ratified default: evidence **SUSTAINS the DELETE** under the owner's condition, while honestly recording B1's counterweight—deletion forfeits the only landing pad for a migration both apps already owe (keeping costs 257 source lines). One binding rider either way: the **A-1 machined-groove extinction**—the twin-line idiom lives only in `instrument-chassis/styles.css`, and a live cross-repo ask dies with it; #52-owner ∥ #18 sequencing binds (`TERMINAL-ROSTER.md:148`).
- Relay: **zero ON-7.x**; speedtest+muster relays are OLD-MAJOR, noted in #76's batches (`:171,:352`).

**3. metric—DELETE (R-1), relay REQUIRED.**
- Consumers: keyframes@7.0.0 `demo/scenes/sequence/SequenceTarget.vue:138` (`Metric`); sci-active@7.0.0 `dashboards/ecf/story/points/01-window-arc/Point.vue:23` (same path in sci-report@6.0.0).
- Ratified: DELETE via #18 (`TERMINAL-ROSTER.md:113`), relay row "metric→sci-report + keyframes" (`:171`).
- Evidence: **SUSTAINS with one hardening**—both consumers sit ON-7.x (the F18 flip-clause pair, B4 row 5), so this relay is in the blocking class, not the noted class; the roster's "sci-report" cite should read sci-active for the current-contract copy.
- Relay: **ON-7.x ×2 roots, 2 files—REQUIRED.**

**4-6. metric-badge / metric-cell / metric-stack—CUT ALREADY BANKED AT 7.0.0; no live disposition to adjudicate.**
- Consumers (all OLD-MAJOR, all already broken against 7.0.0): badge—fourier ×7 (`EquationView.vue:10` et al.), speedtest ×2 code (`SurveyResultDock.vue:166`, `SpeedtestResults.vue:641`—the D-2 ledger miss) +`vite.config.mjs:1044`, muster ×2 (`WinnerHero.vue:48`, `CommandDock.vue:42`), sci-report ×2; cell—speedtest ×3+vite (`ResultDetailSheet.vue:7`, `SharedResultView.vue:104`, test `:27`), muster ×1 (`TravelMatrix.vue:27`), sci-report scratch ×1; stack—speedtest ×1+vite (`ResultStack.vue:172`), muster ×2 (`RankedVerdict.vue:40`, `WhyThisWonSheet.vue:35`, symbols `MetricStack, MetricRow`).
- Ratified: no roster seat—the subpaths died at `490cc46e` and shipped absent in v7.0.0; consumer duty booked in #76's per-repo batches (`TERMINAL-ROSTER.md:352`).
- Evidence: **SUSTAINS treat-as-banked** (B4 finding 1): any 8.0.0 deliberation counting these as a prospective break is re-litigating a debt already paid. Relay: **zero marginal; OLD-MAJOR noted rows only.**

**7. animated-digit—DELETE-with-relay STANDS, with the re-take rider.**
- Consumers: fourier@^4.0.0 `CoefficientsSpectrum.vue:19`; speedtest@^4.0.1 `ResultStack.vue:173` +`vite.config.mjs:609`.
- Ratified: DELETE-with-relay (GESTALT Ruling 1—merit ground "trivial recipe, 92 LOC"); verdict re-taken under RATIFICATION §1.1 before the cut (`TERMINAL-ROSTER.md:113`, GF-FOURIER's routed row).
- Evidence: **SUSTAINS**—both consumers OLD-MAJOR, zero ON-7.x (B4 row 9); the merit ground is untouched by any census fact. Relay: **noted-not-blocking.**

**8. paper-backdrop—DELETE-with-relay STANDS; relay upgraded to blocking via the peer chain.**
- Consumers: atlas-active@7.0.0 `src/platform/chrome/background/Atmosphere.vue:64`; speedtest@^4.0.1 `ThankYou.vue:99`.
- Ratified: DELETE-with-relay (Ruling 1—merit; the row never claimed zero consumers); relay row at `:171`.
- Evidence: **SUSTAINS**, with the one hardening B4 row 10 supplies: atlas is ON-7.x **and** the constellation's only peer-dep relay (`.p-totality/atlas/package.json:111` peers glass-ui; sci-active depends `@mkbabb/atlas 7.0.0`)—the addendum lands in atlas's tranche and re-emits to sci. Relay: **ON-7.x ×1 root—REQUIRED, cascading**; speedtest OLD-MAJOR noted.

**9. header-ribbon—DELETE-with-relay STANDS (inline into keyframes).**
- Consumers: keyframes@7.0.0 `demo/components/instrument/shell/EditorShell.vue:116`, sole consumer everywhere (mirror@6.0.0 same path).
- Ratified: DELETE-with-relay, the single-consumer-overfit ground, relay inlines the ribbon into keyframes (Ruling 1 "the weakest of the four"; already booked in keyframes' batch `TERMINAL-ROSTER.md:343` "header-ribbon inline").
- Evidence: **SUSTAINS**—four seats concordant on the ×1 census. Relay: **ON-7.x ×1 root, 1 file—REQUIRED.**

**10. completion-seal—DELETE-with-relay STANDS; the relay is type-surface as well as component.**
- Consumers: atlas-active@7.0.0 ×2 direct edges—`completion.ts:5` (`CompletionSeal` + `CompletionSealProps/Shape`) and `category.ts:1` (`type CompletionSealShape` only)—rendering through `DashboardHero.vue:372`; sci-active@7.0.0 `CategoryHomeView.vue:4` + `GalleryView.vue:19` (same paths at sci-report@6.0.0).
- Ratified: DELETE-with-relay (Ruling 1—F26 "greatly overfit", and the row already read "-with-relay").
- Evidence: **SUSTAINS**; §0's re-grep reconciles the roster's `DashboardHero.vue` cite with the seats' direct-edge census. Relay: **ON-7.x ×2 roots, 4 files—REQUIRED**, includes a pure type edge, and rides the atlas→sci peer cascade.

**11. watercolor-dot—RELOCATE to value.js STANDS, and the evidence is its best argument.**
- Consumers: value@^7.0.0 ×11 files (`ColorSpaceSelector.vue:110`, `CurrentPaletteEditor.vue:191`, `SwatchHoverMenu.vue:62`, `ConsoleRail.vue:91`, `SpectrumCanvas.vue:38`, `EmptyState.vue:70`, `Dock.vue:6`, `ImageEyedropper.vue:96`, `GenerateControls.vue:15`, `MixResultDisplay.vue:6`, `MixSourceSelector.vue:7`). Nobody else, anywhere.
- Ratified: RELOCATE (Ruling 6; R-2 receiving end at `TERMINAL-ROSTER.md:345`).
- Evidence: **SUSTAINS strongly**—the heaviest ON-7.x file count in the table (11) lives entirely in the repo it relocates to, converting the constellation's largest apparent burden into one intra-repo move. Relay: **ON-7.x ×1 root, 11 files—REQUIRED, but degenerate** (the relocation IS the relay).

**12. drawer—MERGE-INTO dialog (#39 W-DIALOG-DETENT) STANDS; widest ON-7.x spread in the table.**
- Consumers: ON-7.x—atlas ×3 (`ReadoutSheet.vue:37`, `FilterPanel.vue:17`, `VizAppendixDock.vue:9`) + 2 `vi.mock("@mkbabb/glass-ui/drawer")` targets (`foot-dock-legend.spec.ts:110`, `viz-plate-source-grid.spec.ts:115`—break as unresolvable mocks); keyframes ×1 (`ControlsPaneWrapper.vue:166`); sci-active ×1 (`SpeedtestReadoutSheet.vue:38`). OLD-MAJOR—speedtest ×1 (`DashboardMapControls.vue:175`), sci-report ×1, muster ×1 barrel (`MobileInstrumentSheet.vue:23`—a stale-pin artefact valid only at 3.1.0's barrel, B3; muster counts as a subpath-consumer-to-be, not a barrel defender).
- Ratified: MERGE-INTO dialog (Ruling 6; `TERMINAL-ROSTER.md:134`).
- Evidence: **SUSTAINS** (merge preserves the capability; nothing found contradicts the detent fold) while pricing it honestly: **3 ON-7.x roots, 7 files—the heaviest REQUIRED relay after watercolor-dot**, plus the atlas→sci cascade.

**13. deck—RE-HEARD, not deleted (#40) SUSTAINED, with a docket correction.**
- Consumers: ON-7.x atlas-active ×2—`DashboardEssay.vue:51,172` (`useDeck` as the settled-page/a11y engine, PA-5) and `useStageDeck.ts:2,26`. Mirror@6.0.0: `useDeckDetent.ts:1,127` + `useStageDeck.ts`. slides/slides-k **confirmed non-consumers** (`deckKeys.ts:2` is a comment—B4 D-8, ledger concurs).
- Ratified: RE-HEAR; the tier-2 DELETE does not execute until the merit ruling (`TERMINAL-ROSTER.md:135`).
- Evidence: **SUSTAINS the re-hear**—two substantive current-contract consumers—but the #40 docket ("useStageDeck.ts + useDeckDetent.ts on the table") is half-stale: on the current contract the pair is `useStageDeck.ts` + `DashboardEssay.vue`; `useDeckDetent` survives only in the 6.0.0 mirror, and the active DashboardEssay records dropping it deliberately (`:169`). The re-hearing should weigh the essay's "useDeck for a11y ONLY" pattern, not the detent. Relay: **ON-7.x ×1 root, 2 files** if it falls.

**14. tags-input—the one genuinely free cut; disposition ownership currently vacant.**
- Consumers: **zero, everywhere**—no subpath exists, barrel line `src/index.ts:129` has no external reader, no code reference in 15 roots + mirrors (B3 and B4 independently; only audit prose remains).
- Ratified: DEMOTE ruled (`RECONCILIATION.md:105`, the one component in 62 with no consumer of any kind; `:270` "tags-input is demoted"), routed to W-DAG-REDUCE by CWT (`COMPONENT-WAVES-TERMINAL.md:1288`)—but the terminal roster **struck the demote from #21** (`TERMINAL-ROSTER.md:116`) and no other roster row owns it; `RECONCILIATION.md:136` leaves it "pending owner marks".
- Evidence: **SUSTAINS and exceeds** the demote—the census supports outright deletion at zero relay cost. Flag for the owner: the disposition needs a seated owner before execution; today it is ruled but unowned. Relay: **ZERO.**

**15. avatar—KEEP, consolidated into #87 W-MARKS; the zero-count is a census artefact.**
- Consumers (barrel-only—**no `./avatar` subpath exists at any published version**, B3 headline, re-verified at HEAD this seat): ON-7.x—keyframes `MbabbMenu.vue:82` (`Avatar, AvatarImage`), value shim `demo/ui/avatar/index.ts:1`→`MobileMenuDropdown.vue:12` + `ProfileSection.vue:13`; OLD-MAJOR—bbnf-buddy `SettingsPanel.vue:8`, words `SidebarHeader.vue:83`.
- Ratified: survives into the #87 marks lane (`TERMINAL-ROSTER.md:182`); S-12 (`:42`) adopts the survive; `CWT:1262` already ruled "giving them subpaths is a fix, not a deletion".
- Evidence: **SUSTAINS**—4 roots' consumption refutes any zero-consumer reading a subpath census produces (B3 finding 1). Any future move needs a subpath minted first or all 4 break with no migration target. Relay: none owed now; **ON-7.x ×2 roots** if the marks fold reshapes its API.

**16. separator—KEEP + FIX + INK-FOLD (overturn) STANDS; half its consumption is barrel-invisible.**
- Consumers: barrel arm—keyframes ×4 (`KeyframeCardList.vue:29`, `KeyframeTimeline.vue:170`, `ChannelOptions.vue:408`, `LayerConfigPanel.vue:76`), value shim ×1→3 leaves, bbnf-buddy ×1; subpath arm—speedtest ×5, slides-k ×1 (`DeckSettings.vue:4`).
- Ratified: OVERTURNED→KEEP + FIX + INK-FOLD (`CWT-3:1426,1470,1472` via roster J-3 `:14`); register absorbed into #87 (`:131` #36 RETIRED, `:182`).
- Evidence: **SUSTAINS**; B3 finding 3 (the uncounted barrel half) is the load-bearing correction any ink-fold API change must price. Relay if reshaped: **ON-7.x ×2 roots, 5 files + 3 transitive.**

**17. easing—KEEP (DEMOTE STRUCK) STANDS; configurator sub-delete unopposed.**
- Consumers: ON-7.x—keyframes ×2 (`TimingFunctionPanel.vue:62`, `EasingSidebar.vue:76`), value ×4 files/5 cites (`useGradientModel.ts:12`, `EasingAuthoringStage.vue:29-30`, `easingCatalogue.ts:35`, `GradientEasingEditor.vue:30`); mixed value+type surface (`EasingPicker` + `type EasingPickerValue`).
- Ratified: #85 W-EASING—`EasingCurve.vue` extracted, configurator deleted (0/7 repos), REDUCTION:90's DEMOTE STRUCK on 11 cross-repo consumer files (`TERMINAL-ROSTER.md:180`).
- Evidence: **SUSTAINS**—6 current-contract consumer files confirm the demote-strike; no seat found any configurator consumer, so that sub-delete is clean. Relay if the picker API shifts at #85: **ON-7.x ×2 roots, 6 files.**

**18. constellation—KEEP + rework (#45 W-CONSTELLATION) STANDS.**
- Consumers: ON-7.x atlas `Constellation.host.vue:64-65` (`Constellation` + `type ConstellationField`); OLD-MAJOR slides@3.13.0 `til-briefing/constellation.ts:40`.
- Ratified: #45, after #52, slides-R7 vehicle, technicolor+HEAVY defaults (`TERMINAL-ROSTER.md:140,210`); S-12 survive.
- Evidence: **SUSTAINS**. One hygiene note (B3): the root barrel's `constellationWellMapping`/`ConstellationWellResult` (`src/index.ts:236,252`) belong to `pointerFieldMappings`, not this component, and have zero consumers. Relay: **ON-7.x ×1 root, 1 file** through the rework.

**19. data-table—KEEP (SPLIT ruled, no spec, #64 residual) STANDS; its barrel line serves nobody.**
- Consumers, all subpath: ON-7.x atlas `SourceDataBrowser.vue:11`; OLD-MAJOR speedtest ×3 (`AdminSessionsTable.vue:5`, `ResultsTable.vue:4`, `IPLookupManager.vue:90`).
- Ratified: `data-table+table (SPLIT ruled, no spec)` in the tier-3 residual (`TERMINAL-ROSTER.md:159`).
- Evidence: **SUSTAINS**; plus B3 finding 4—the root-barrel export `src/index.ts:90` has zero external readers and is a pure SCC-widening liability, a free strike for #21/#89. Relay through the split: **ON-7.x ×1 root, 1 file.**

## §2 · Roll-up: where the required relays land

| ON-7.x tranche | Components owed | Files | Weight |
|---|---|---|---|
| value | watercolor-dot(11) · easing(4) · avatar shim(1+2) · separator shim(1+3) | 17 direct + 5 transitive | heaviest; all demo-tier; watercolor is self-relocating |
| atlas | drawer(3+2 mocks) · completion-seal(2) · paper-backdrop(1) · deck(2, if it falls) · constellation(1) · data-table(1) | 11-13 | heavy, and it **re-emits to sci** via the peer chain—the only cascading relay in the universe |
| keyframes | separator(4) · easing(2) · drawer(1) · avatar(1) · metric(1) · header-ribbon(1, inline) | 10 | heavy; all demo-tier |
| sci-active | completion-seal(2) · drawer(1) · metric(1) | 4 | moderate |

All OLD-MAJOR burdens (speedtest 25 cites, muster 11, fourier 8, sci-report 6, words 4, bbnf-buddy 2, slides-k 1, slides 1) are subsumed by already-owed multi-major rewrites—noted rows in #76's batches, never blocking. bbnf-lang, latex-paper, parse-that, oscilloscope: zero chopping-block edges (negative control holds).

## §3 · Corrections that must survive into execution

1. **Ledger under-count class (B4 D-2..D-6, root-caused):** `build-consumer-ledger.mjs:178` runs `ts.preProcessFile()` on raw `.vue` source, dropping large SFCs (`SpeedtestResults.vue:641` missed). Fix before the ship-time census re-run that #76 mandates.
2. **Ledger D-1:** `keyframes-working-mirror` is a declared 6.0.0 consumer at its HEAD (`package.json:71` optionalDependencies); the ledger's `—` recorded the dirty worktree.
3. **#40's re-hear docket** should be amended to name `DashboardEssay.vue` and demote `useDeckDetent` to mirror-only evidence (§0, §1.13).
4. **Stale barrel doc** `src/index.ts:36-37` (CarouselNext/Previous) is a live falsifier of the barrel's own map under the carousel KEEP.
5. **Standing law reaffirmed by this lane:** a zero subpath-count proves nothing for barrel-only components (avatar), and a nonzero count proves nothing for survival (Ruling 1—existence⇒relay, never⇒KEEP; the override channel is the owner's word, exercised once here, for carousel).

## §4 · CANNOT-VERIFY

- Runtime paint of any consumer (all chains proven static-only; no browser run this lane—B2's caveat adopted table-wide).
- words' resolved barrel shape (`node_modules` absent there—B3; source edges verified regardless).
- B1's one discarded timed-out constellation-wide grep (replaced by the bounded per-root method + 67-manifest census; ledger and independent greps agree exactly).

Every component named in the lane brief appears above with a verdict; no silent drops.

---

## LANE C · THE BA-BJ UNION TAILS LEDGER

`modelId: claude-fable-5`

# THE UNION TAILS LEDGER — BA→BJ, lane-C adjudication

**Currency stamp:** all adjudicating reads this seat at **2026-07-28 17:02 EDT, HEAD `192879b7`**, working tree dirty (`TERMINAL-ROSTER.md`, `BJ/ASK.md`, `BAND-REDUCTION.md` mid-edit by a concurrent seat — TR cited below by row-id `#n` and by line only where I read the line myself this hour). TR = `docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md`; EP = `docs/tranches/BK/EXECUTION-PROGRESS.md`; PORT = `docs/tranches/BK/PORT.md`.

## §0 · Intake, incredulity, and the dedupe arithmetic

**No seat claimed zero tails — all ten disproved it themselves**, so the incredulity clause discharges affirmatively: BA (`BA/FINAL.md:208-260` nine live §6 bullets), BB (never closed — `BB/PROGRESS.md:108-109` terminal-SPEC), BC (83), BD (cursor self-contradiction `BD/IMPLEMENTATION-PROGRESS.md:3` vs `:33-40`), BE (executed-then-stopped), BF (never executed — `BF/INDEX.md:39`), BG (never closed — cited at `RECONCILIATION.md:316`), BH (`BH/PLAN.md:3` still "awaiting execution greenlight"), BI (no FINAL.md on disk), BJ (no FINAL.md, closed by supersession). I independently corroborated the two likeliest zero-claim candidates: the gate-farm death every seat leans on (`ls scripts/` → 10 files, no `gates.mjs`, no `proof-*.mjs` — read this seat) and the AX register staleness (`docs/tranches/AX/audit/DISPOSITION-REGISTER.json` parsed this seat: **all 31 rows `reStampedAt:"BG"`** — three seats' claims confirmed by one read).

**Intake:** ~380 seat rows across ten reports. **Union after dedupe:** the same debts recur on long provenance chains (the AX register three times; surface="clear" twice; satin/prism twice; Snell twice; kf-Oscillator twice; device-parity four times; the "no PORT section for my letter" finding five times). Raw orphan units ≈85 → **50 union orphan rows** after dedupe (−~30) and re-verdicts (−4, §3 below). Every seat row not individually named below is covered by its seat's own verdict, unchanged by this adjudication; only conflicts, dedupes, and re-verdicts are re-ruled here — named exhaustively in §3 and §CANNOT-VERIFY, so nothing moves silently.

---

## §1 · FOLDED

**Count: ~205 union units** (BA 22 · BB ~14 derived from its tables, no seat tally given · BC ~44 · BD ~24 · BE 27 · BF ~15 · BG ~20 · BH 11 · BI ~30 · BJ's folded classes ≈ the whole band program + parked register, counted as units per its tables 3-7), minus the cross-seat duplicates absorbed into single union rows. The folds concentrate on few carriers: **#76 W-CONSUMER-BAND is the single largest** (≥40 union units), then #47/#49/#50 greenfields, #10 π-SUITE, #12-15/#16 accounting, #66 close.

**Spot-verified sample of 5 — every cite re-read by me this seat:**

1. **BA rows 8/9 (W-EASING-PRIMITIVE + steppedEase) → #85.** EP #85 row read: "owns `EasingPicker.vue` (C-4)" ✓ (line drifted from the seat's `:113`; content exact). Disk: `ls src/components/easing/` → `EasingPicker.vue` present ✓. **GREEN.**
2. **BI T9 (LabeledField KEEP) → TR#76 payload.** `TERMINAL-ROSTER.md:171` read verbatim: "…clampLabel (5th booking) · dock first-tap … · **LabeledField association** · `TooltipContent variant="mono"` · the `/deck` seventh-carry…" ✓. **GREEN** — and the same line confirms BA rows 1/3/7's carrier claims.
3. **BC C1 (Tier-28 SPEEDTEST-ADOPT) → #76.** EP Φ6/7 table: #76 UNSTARTED, "THE UNIVERSE IS GENERATED … 15 roots" ✓; sibling corroboration read-only: `/Users/mkbabb/Programming/speedtest/package.json:93` = `"@mkbabb/glass-ui": "^4.0.1"` ✓ — the BC-era pin, live today. **GREEN.**
4. **BG D10 (Safari PAINT certification) → EXEC-STATE §OWED row 5 → #10.** `EXEC-STATE.md:297-311` read: rows 1/2/3/4/6 DISCHARGED, "row 5 (the Safari arm) is **the one live row** — owner roster #3/#10, the serialized browser seat" ✓. **GREEN** — and the same read proves the row is *generic* (no SHAs, no `var()` row), confirming orphan U-35.
5. **BE 1d (W-FOLD-LEDGER, the no-silent-drop machine) → #16.** `BK/gates/ROSTER.md` ACCOUNTING row read: `G-ROW-HOMED (+BI-CARRY +UF +BG-join)` ✓; PORT §1.2: "the mechanism that makes a silent BI drop detectable" ✓. **GREEN** — and the same read is the proof of orphan U-01: the arm list ends at BG-join; **no BD/BE/BF/BC/BB arm exists.**

Sample verdict: 5/5 GREEN. One wrong cite was found in the opposite direction — a FOLDED row misfiled as ORPHAN (BI T55, §3) — the spot-check discipline cuts both ways.

---

## §2 · RETIRED

**Count: ~120 union units**, under **seven ruling clusters** (each member carries its seat verdict; the cluster carries the ruling cite):

| ruling | cite | members (by seat id) |
|---|---|---|
| **R1 · Gate-farm abrogation** | commits `1c2cda3a` + `d17153ec`; user mandate TR §B.5 exactly-60 (`TERMINAL-ROSTER.md` §B.5, register `active 48·reserved 5`); verified this seat: `scripts/` = 10 files, zero `proof:*` | BA 5·6·23·24; BB W-VISUAL-RUNNER·W-SPINE-CONSTELLATION·dead-sweep gates·suffuse/button-glass REDs; BC `az-gates-range-freshness`+C19 gate-half; BD T3·T5·T38; BE W-GESTALT-ROSTER-BE; BF W-GESTALT-WIRE·W-DESHADCN-GATE·D32; BG D12-class; BH T-03·T-04·T-18·T-19·T-21·T-23·T-25; BI T27·T28 |
| **R2 · CLAUDE.md hard-delete** | `8b0f9acc`, never-recreate ruling (feedback_claudemd_deprecated); `ls CLAUDE.md` absent | BA 22; BB 7-wave merge set; BC C9; BD T35; BE precept-canon half; BG A1; BH T-01 |
| **R3 · Deletion commits** | `79f4641c` (BG WS4) · `967811e4`/`98b52613`/`b494e526` (BI) · `bda718ac` (BJ W3) · `490cc46e` · `e5164e51` | BE bloom-up·silhouette·haptic·celebrate·alive-idle; BC IconChip rows·stacked-icons; BF W-SPIKE-DELETE·D15·D2/D30; BD T7·T9·T10·T13-part |
| **R4 · Ratified batch rulings** | PORT.md r10 (8 Baseline books, read ✓) · r9 (inline-edit, read ✓) · RATIFICATION §1.3 Q051-r15 (dot-flow) · `MOTION-CANON.md:84` (jubilance/bouncy) · RATIFICATION §1.6 (Q081) · §2 R-2 (watercolor veto closed) | BA 1-part·2; BG F2·F3; BD T4·T25; BI T24; BB W-NDA-DECIDE; BE W-ANTICIPATE-FOLLOW |
| **R5 · Retired-by-execution on disk** | `useDragMorph.ts:20-30` (kf snap) · `flatten-subpath-types.mjs` built · `SegmentedTabs.vue:342-346` (aria-orientation) · value `/color` imports ×5 · the 4.1.0/4.2.0/5.0.0/7.0.0 cuts | BC C18; BD T27·T28·T32-fix; BH T-11·T-16·T-17·T-20·R9/R10; BB W-CLOSE·W-CI-GREEN; BF W-CUT; BG A2·D5·E1; **BF orphan-5 (D27 kf snap) re-verdicted RETIRED here** |
| **R6 · Premise-void / trigger-death** | WebGPU-only owner ruling (`EXEC-STATE.md:188`, `PORT.md:93`); concentric absent at HEAD; DockNowPlaying never existed | BD T16·T24·T47; BF D24/D25 triggers; BE W-VIZ-PARITY scope-half — **the record-line residue stays orphan U-37** |
| **R7 · Falsified-on-disk claims** | fourier phantom-classes 0-hit (`fourier-analysis/web/src`, BA seat's grep) — falsifies `BI/TAIL-EXCAVATION.md` §1 row 6; `RECONCILIATION.md:77`'s "froze at frontier 0.7" falsified by `20f2eabe` (BG seat) | BA row 4; BG I1-correction — both **corrections #12-15 must carry** |

---

## §3 · RE-VERDICTS — where this adjudication overrules a seat

1. **BI T55 (no FINAL-at-tag clause) — ORPHAN → FOLDED-AT #66.** The EP #66 row read this seat ends its acceptance cell "…fresh census · re-pin · **`FINAL.md`**". The ceremony IS named in the close row. The BI seat's grep missed it; a wrong cite in reverse.
2. **BF orphan-5 (D27 kf `snap`) — CANNOT-VERIFY → RETIRED (R5).** BC C18 + BD T27 supply the disk proof (`useDragMorph.ts:20-30`, `keyframes.d.ts:1139`).
3. **BA O-3 — NARROWED.** `TERMINAL-ROSTER.md:142` read: #47 carries "overflow grammar in W3" — the dock-stage-column site is FOLDED (BC's cite verified). `:159` carries fading-scroll at #64. Only the **embla-momentum leg at the 12-family tabs overrun** remains unnamed → survives as one line inside U-21.
4. **BE's fold of W-DISPOSITION-RESTAMP at #16 — OVERRULED to ORPHAN (absorbed into U-04).** `G-ROW-HOMED`'s scope (ECOUTE:223-225 per the BC seat, arms verified this seat) does not reach the AX register; three seats' evidence beats one seat's optimism.
5. **BC's structural discharge of the Kuwahara USER-HINGE via ASK.md g3 — OVERRULED (BD T19 stands).** g3 is the DUSK/DAWN glance; the multipass-FBO hinge is a different question and was never presented. Rides U-19 + U-45's ASK mechanism.

---

## §4 · ORPHANS — the deliverable. 50 union rows, each with its exact BK seat

**Verification key:** ⊘ = grep/read run by me this seat (17:02 EDT). Provenance chains use →.

### A · Governance/accounting holes (7)

| U | orphan (provenance) | BK seat it needs |
|---|---|---|
| **U-01** | **The pre-BG lineage-arm gap.** ⊘ `gates/ROSTER.md` ACCOUNTING = `G-ROW-HOMED (+BI-CARRY +UF +BG-join)` — no BD/BE/BF/BC/BB arm; ⊘ PORT has §1 BI · §2 BJ only. BD's 1,338 routed rows (`BI/FORMATION/open-row-routing.json`) covered only transitively; BB/BC reach BK by noun through `BC/DEFERRAL-LEDGER.md §5` + `BD/FOLD-LEDGER.md` — load-bearing files named nowhere in BK. (BD T48 ≡ BB structural ≡ BC structural ≡ BE/BF/BG PORT-silence findings) | **#16**: a `+BD-CARRY` arm seeded from `open-row-routing.json` filtered `^docs/tranches/BD/`; **PORT**: a §0 pre-history section naming `BC/DEFERRAL-LEDGER.md` + `BD/FOLD-LEDGER.md`/`union/DEFERRED-CENSUS.md` as lineage docs of record |
| **U-02** | The 134-file BI FORMATION P-corpus, 50 nonterminal, no PORT row (BI T1/T2; the same class as PORT:249's own seal-miss #1) | **PORT §1.5** per-lane disposition (8 lanes, `HANDOFF-ACTIVE-EXECUTION.md:382-391`) + a **§3** Σ row |
| **U-03** | **THE OWNER SITTING round 2, items 8-12** — metric-family apotheosis discharging R-1 · instrument-chassis DELETE + the muster-is-a-PROTOTYPE census rule · watercolor RELOCATION CENSUS · deck-consults-slides three-way inventory widening #40 · carousel/deck one windowed-sequence engine. ⊘ re-read `EXEC-STATE.md:438-460` verbatim this seat; ⊘ 0 carriers in TR/PORT/EP/ASK at 17:02; TR#18 still publishes the contradicted metric-R-1/chassis-conditional text. **Later owner words, uncarried — severity 1.** (BJ O-1) | An **A-2-style ⊕ overlay** applying items 8-12 onto **#18 · #40 · #55 · #76 · TR §B.6 · TR §C**, exactly as items 5/6 were applied |
| **U-04** | **The AX DISPOSITION-REGISTER** — ⊘ parsed: 31/31 rows `reStampedAt:"BG"`; BC and BD both promised re-stamps that never happened; 23 HELD books carry `{kind,n,grep}` graduation triggers with zero watcher since `1c2cda3a`. (BA O-6 ≡ BC ax-reg-held-23 ≡ BD T36; absorbs BC-minor token-tour-contrast-field and BB-CV's BC §7 T2/T9/T10 HOLD rows — the same watcher-less-hold class) | **#16**: one arm re-dispositioning the 23 books + the T2/T9/T10 holds, **or** an explicit RETIRE-the-machine line naming `BI/ledgers/CHRONIC-DISPOSITIONS.md` the record of truth and the JSON historical |
| **U-05** | The BG absorb-list gap at #12-15: B3 `W-DS-COMPLETE` · B4 `W-GLASS-BACKDROP-SAMPLE` · B5 `W-VIZ-SUBSTRATE-DELETE2` · B6 `createFragmentGLPass` unnamed; `BE-BF-LEDGER.md` (70 rows, 33 NEVER-BUILT) not in scope; the 3 WS7 DROP-WITH-TRIGGER units un-adjudicated; + the two R7 record-corrections (BG G1, D12, I1) | **#12-15**: extend the `RECONCILIATION.md:340` absorb list — four named lines, one file-name line for `BE-BF-LEDGER.md`, one MOOT-BY-ABROGATION line, two correction lines (walk FINAL.md's 60 unmapped names, not the cursor) |
| **U-06** | `BJ/formation/stability/TERMINAL-ROUTINGS.md` R-1…R-7 — register + its close condition, 0 BK hits; R-namespace collides with RATIFICATION §2 (BJ O-3) | **#65/#66**: one strike-with-grounds line (most rows dead by supersession; the close condition needs an owner) |
| **U-07** | `BJ/formation/NATIVE-PENDING-ROSTER.md` — 35 members "witnessed or struck before BJ FINAL", a deadline that will never exist (BJ O-4) | **#10/#16**: adopt as a witness ledger, or one batch strike-with-rationale |

### B · Close protocol, #66 (3)

| U | orphan | BK seat |
|---|---|---|
| **U-08** | **`--run release` names a dead runner.** ⊘ `scripts/release.sh` has no `--run` mode; `gates.mjs` deleted; yet TR#66 + EP #66 both read "`--run release`". The exact over-claim class W-CLOSE-BATTERY existed to forbid, inside the wave inheriting it (BB O-4) | **#66**: re-bind the close phrase to the surviving machinery (`verify-governed-invariants.mjs` + `verify:package` + C-13) |
| **U-09** | `R-PUBLIC-8-LEDGER` — the complete v7→8 export/type diff + migration map + census, with its ten named removals (BJ O-2; `BJ/PLAN.md:30-39`) | **#66** pre-cut condition line, or an arm on `G-NO-ORPHAN-EXPORT` (§B.5) |
| **U-10** | The parked `release/4.3.0` Δ-set + the never-fired ATLAS-M early-cut option (BG D4) | **#66** pre-tag census: one owner word — publish, fold, or delete the branch |

### C · Consumer band, #76/TR §C (8)

| U | orphan | BK seat |
|---|---|---|
| **U-11** | words `BouncyToggle` (DC-EXT-1 survivor) — ⊘ TR:351 words row = carousel/button/hover-card/toast/card/confirm-dialog/popover, **no BouncyToggle/tabs**; the symbol has no 8.0.0 successor (BA O-1) | **TR §C words row**: one relay line — migrate to `SegmentedTabs` or record the `^3.0.0` freeze |
| **U-12** | **The atlas by-name cluster** — `:interaction="manual"` at `Dock.vue:226` (BI T15) · `.text-gilt`→`.gold-shimmer` STILL-OPEN MIGRATION (BI T47) · G-1 40px/44px · G-2 shape-pill radius · G-3 attenuation-vs-struck-lever · G-5 adornment-slot note (BJ O-5). ⊘ all six nouns 0-hit in TR+PORT | **TR §C atlas row**: six lines (G-3 with the corrected G1 draft per `RECONCILIATION.md:73`) |
| **U-13** | **The speedtest by-name cluster** — the `data-protagonist` §6c promise retraction (BC C13, ⊘-class verified by BC) · fonts preload-posture `ASK-GU-HERO-FACE-PRELOAD` (BH O-2) · GU-1 holdout tier (`--shadow-sm…2xl` + `SortableList:122` drag-lift, BG D2) · GU-3 StatusDot forced-colors `signal` (BG D3, shared with #87) | **TR §C speedtest row** + **#87** for GU-3: four lines |
| **U-14** | kf `Oscillator`/`waveformValue` — **trigger fired** (kf `^6.0.0` ships it; 0 consumption in src/demo), booking uncaught; TR §C keyframes row omits it (BD T26; BC C17's seam-routing to #85/#54 covers consumers, not the booking) | **#76 keyframes batch**: consume-and-delete the de-synced sine, or retire the booking with reason |
| **U-15** | slides `--glass-frost` cool root-fork — reconcile-or-sanction, owner-owned, parked on never-run W-SLIDES-DRIVE; ⊘ 0 hits in BK+TR this seat (BB O-1). Plus the record note that BC 5f's six slides rows ride the repo, not names | **TR §C slides row**: one reconcile-or-sanction default line — load-bearing on **#22**'s transmission gate at the 8.0.0 adopt |
| **U-16** | The W-LEAF-MODERNIZE accounting (pencil-boil/latex-paper/value→1.0 pre-guard — MOOT by constellation passage, hold never closed) (BB O-3) | **#76 §C**: one MOOT-with-evidence line |
| **U-17** | The homescreen marquee-rail library half (BC minor) | **#76** name-or-strike, one line |
| **U-18** | The ScrollCardHeader absorb door (`useHeaderCondense` seed, window open now) + the veil-lever consumer naming (E-3) (BI T50; subject half live as `CardHeader` `shrink`) | **#79** (card) + **#22** (frost): one line each, or a decline |

### D · Greenfield spec drops (5)

| U | orphan | BK seat |
|---|---|---|
| **U-19** | **Aurora five-part**: satin/prism `uMedium 8/9` slots consumed by metal/metal-gradient against BD D87's own ruling, D87 called false by BD's critic, never reconciled (BE 2/3 ≡ BF 6) · WGSL stroke cascade (BD T17) · `warpMode==3` curl branch (BD T18 ≡ BG D7 member) · **Kuwahara multipass USER-HINGE never presented** (BD T19, re-ruled §3.5) · OD-4 texture-parity certification clause (BD T45) | **#49 GF-AURORA**: one arm-or-RETIRE line each; the hinge additionally needs a **BK/ASK.md** row with a ratified default |
| **U-20** | Blob Snell/`uBackdrop` refraction + dome-Z squircle ⁴√ — folded at #50 "by scope not by name" (BC 5b) vs orphan (BD T21); the charter's six arms name neither | **#50 GF-BLOB**: one named arm-or-retire line |
| **U-21** | **Dock five-part**: silhouette restore-or-retire (551L deleted un-ruled; #47's restore list omits it — BF 1) · `useDockItemDrag` LIVE-or-RETIRE + stale `controls.css:43` prose (BG E3) · `useContextualDockLayers` still demo-private + drill-in unowned (BF 3) · dock-tinted-chip consumer (BE partial) · the D43/D66 scroll-collapse fence restatement + the tabs-overrun embla-momentum leg (BE record + BA O-3 narrowed, §3.3) | **#47 GF-DOCK**: five one-liners (fence + momentum can share W3's overflow-grammar cell) |
| **U-22** | Handmark WS9 four: deckle · anisotropic crayon grain · perfect-freehand consume of the **measurably live** `freehand.ts` · raster paper fallback (BG D8) | **#51 GF-HANDMARK**: KEEP-BOOKED block or batch RETIRE (the freehand consume is a real one-line decision) |
| **U-23** | The R5-9 deck PAGE-TURN primitive — gating half retired, surface under re-hearing, primitive named nowhere (BA O-2) | **#40's re-hearing** — one line, naturally inside U-03 item 11's widened deck apotheosis |

### E · Material/component one-liners (11)

| U | orphan | BK seat |
|---|---|---|
| **U-24** | `surface="clear"` + `--glass-opacity-clear` — built at BE `0be4792a`, silently un-shipped, re-booked BD-union D46, 0 BK rows; `axes.ts:22` has three members (BE 1 ≡ BF 4) | **#86 W-SURFACE-MATERIAL**: retire-with-rationale or re-mint |
| **U-25** | `--radius-concentric` (Apple containerConcentric) — 0 disk, 0 BK (BE 4) | **#68 W-TOKEN-CANON**: fold or RETIRE |
| **U-26** | IconChip Control-Center grouped-squircle cluster idiom — component ruled dead (BA/BC), idiom disposition unwritten (BE 5) | **#43 W-CHIP**: one disposition line |
| **U-27** | `.glass-reveal` backdrop-settle leg (BE 6) | **#30 W-DISSOLVE**: BUILD-or-RETIRE line |
| **U-28** | `<GlassControl>` + SEARCH-WELL rider — BK's "glass-control" hits are a different register (BE 7) | **#82 W-FIELD** or explicit retire |
| **U-29** | The cross-engine squircle Safari floor — twice-critical at BE, now *sanctioned* via the owner-reversible forks without the acceptance being ruled (BE 8; BF 28 confirms the fork ships) | **#23 W-RADIUS-ROLE**: one recorded-acceptance line |
| **U-30** | `--glass-edge-dispersion` — one consumer, its lens host dies at #2, token unnamed in #22's orphan-token arm (BE partial ≡ BF 27 residue) | **#22 W-FROST**: name it in the F-7/F-9/F-11 arm |
| **U-31** | The per-route deep-glass budget discipline (BF 17 residue) | **#22/#69**: record line |
| **U-32** | SelectTrigger two-concept-axis exemption — sole carrier was an abrogated gate (BI T11) | **#65 or #19**: restate or strike |
| **U-33** | `verify-export-types.mjs` — live, wired at `verify:package`, unnamed in the [40,60] roster (BI T4; ⊘ present in `scripts/` this seat) | **#8 or #65**: keep/kill/exempt, one line |
| **U-34** | The de-shadcn standing lock — no seat among the 60; ⊘ mitigated this hour: TR:159 #64 ⊕² now defines the finite eight-family DECLARATION∥IDIOM ledger, still a one-shot (BE partial ≡ BF 21 residue) | **#65**: one retired-with-rationale line for the lock, citing #64's ledger as the successor |

### F · π/capture enumeration drops, #10 (4)

| U | orphan | BK seat |
|---|---|---|
| **U-35** | The 4 BG paint-pending SHAs (`3857b33`·`cd9ce46`·`b3d65eec`·`20b09bc7`) + the Safari `var()`-in-`backdrop-filter` re-answer — BI's cure was enumeration; ⊘ OWED row 5 read this seat is generic (BI T32) | **#10**: write the five rows into the π roster |
| **U-36** | The 5 AY DELTA `PENDING-RESHOOT (#92)` names — class-folded (DISPOSITIONS→Q002→#10) but names never traveled; surfaces rebuilt 3× since (BA O-4 ≡ BI T35 fragment) | **#10**: RETIRE-as-superseded-by-rebuild, one batch line |
| **U-37** | The device-parity record — cross-backend parity/goo-p50/metal-box triggers all die by implication (WebGPU-only + goo fence + D-2 non-goal) with no ruling that says so; four seats flagged the silence (BD T16 ≡ BE 9 ≡ BF 2+D24/D25 ≡ BG F4 residue) | **#10**: one recorded RETIRE line so a five-tranche "single biggest owed item" ends as a ruling, not an implication |
| **U-38** | Corner-AA — homed as a detection cell only; no cure owner exists for the first RED (BF 7; BD T49's corner-aliasing sub-item) | record at **#10**, cure-owner named at **#22** when the cell first REDs |

### G · Motion (3)

| U | orphan | BK seat |
|---|---|---|
| **U-39** | The clock-fence: 2 bridge rows undischarged by DONE owners (`layer-group.css:287-289`, `ConfiguratorLayer.vue:207`) + 4 post-gate drift sites (`literals.css:19-22`), watcher dead; #26's preset deletion forces re-authoring but no invariant survives (BC C19) | **#26**: a spring-owns-its-own-clock arm on `G-SPRING-ONE-JOB` |
| **U-40** | `useLiquidPress` `el` unthreaded at `Button.vue:61-64` (BD T8) | **#80 W-BUTTON**: thread it or record the static fallback terminal |
| **U-41** | The TooltipProvider console error, never live-checked; provider live and consumed by SegmentedTabs (BD T14) | **#32 W-TABS**: a console-clean clause |

### H · Doc-truth, #61 (3)

| U | orphan | BK seat |
|---|---|---|
| **U-42** | **The grouped strike list**: BA close-doc defects (§11/§12/§13 dangling, dup rows, 30-vs-32) · BC Tier-27 cursor contradiction (C8) · BC's 14 delta-less waves bands 5/12/13/14 marked UNVERIFIED-or-superseded (C10) · BD's three doc arms (KF-BC "content-hash", ASK#2 row, lockstep) · `goo-blob` comment sites ×5 (BG D6) · `liquid-enter.css:18` useBloomUp phantom (BE) · `BH/PLAN.md:3` status lie (BH) · the three BI addenda instruments lacking SUPERSEDED banners (BI T22) · the BB retint-idiom precept line, ⊘ 0 hits in both design-idioms copies this seat (BB O-2 → also #78) | **#61 W-DOC-TRUTH**: extend the grown B.4 strike list — ~12 lines, zero machinery |
| **U-43** | `.themed-card` live at `toc-tracking.vue:89,124` — TOC-MENU-GLASS's clean break unexecuted; overlaps BD T49's toc-readability sub-item (BD T33) | **#58 or #56**: one line |
| **U-44** | `LESSONS-BB-BC-BACKFILL` — target file nonexistent (BD T34) | **#78**: retire the row or name the successor doc |

### I · Owner asks never presented (3)

| U | orphan | BK seat |
|---|---|---|
| **U-45** | OQ1 (pixels-vs-prose, Op B ≈3.65 GB) + OQ2 (BG relocatability) — STILL-USER, three tranches unanswered (BI T38/T39) | **BK/ASK.md**: two rows with ratified defaults, or explicit RETIRE rulings |
| **U-46** | The value.js `glass-ui-pinned` fenced worktree at `2e559f7a` — co-land unconfirmable (BI T40) | **BK/ASK.md**: one row or a decline |
| **U-47** | The ℱ-as-Foundations dedup question — owner-gated, never asked, three tranches old (BC minor) | **BK/ASK.md**: one row with a default, or a strike |

### J · Miscellaneous (3)

| U | orphan | BK seat |
|---|---|---|
| **U-49** | KF-6 `W-DEMO-DOGFOODS-SURFACE` — consumer-coherence proven by USE; phantom-owner class (BH O-1) | **#8 W-PKG-TRUTH**: an arm, or a one-line §REJECTED decline |
| **U-50** | The BH net-indirection LOC measure — the tranche's headline acceptance never taken (BH O-3) | **#17/#62**: one row, one number |
| **U-51** | The BJ `OPEN-*` id census — 50 ids, 2 named in TR, no per-id ledger; + the 21-evidence-dir vs 4-landed-waves delta (BJ §4 gaps) | **#16's sweep**: one seeded id-list so `G-ROW-HOMED` can see a specific OPEN drop |

---

## §5 · CANNOT-VERIFY (carried honestly, with owners)

1. The 11 booked successors inside `bb-successors-blob-tokens` — count without items, source register uncited by path (BC's CV). Rides #50's charter absorption; unresolvable from BC's corpus.
2. BD's 39-greenfield-item ↔ 116-wave ↔ 10-phase per-slug arithmetic — class covered, arithmetic never taken (BD T50).
3. PORT §1.3's 109-wave EXECUTED-or-SUPERSEDED class ruling, wave-by-wave — partially reproduced by the BI seat (which found the P-corpus gap, U-02); full reproduction is #16's job at close.
4. BB tails buried in `complete` wave bodies absent from its cursor (BB's stated method limit) — the only recoverable detector is U-01's lineage-arm.

## §6 · Standing verdict

The BK destination is sound; the **lineage into it is one-eyed** — `G-ROW-HOMED` sees BI/UF/BG and nothing earlier (U-01 is the headline), the later owner words of 07-28 are not yet carried anywhere (U-03 is the most urgent), and the recurring failure class across all ten seats is uniform: **generic carriers swallowing named obligations** — a repo row without its symbol (U-11..U-14), a π seat without its SHAs (U-35), a close row citing a dead runner (U-08). Forty-six of the fifty rows need exactly one line on an existing seat; only U-01/U-02/U-03/U-04 need structure. No repo bytes were authored by this seat; all sibling reads (`speedtest/package.json`) were read-only.
