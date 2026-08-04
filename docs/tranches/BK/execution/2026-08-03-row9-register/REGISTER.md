# BJ TERMINAL-ROSTER row #9 — W-GATE-TRUTH · THE REGISTER

**HEAD** `0a0f95cc61ec9edbfcec76fa4c8b98b417c334fc` · measured 2026-08-03 · row #9 (`TERMINAL-ROSTER.md:159`), Φ3
**Cursor standing discharged**: ⊕¹³ᵃ (`docs/tranches/BK/EXECUTION-PROGRESS.md:124`) forbade #9/#65 quoting any code-side register figure *until the detector is recovered from the pinned stash or re-derived and committed*. It is re-derived, in-tree, and executable: `scripts/gate-register.mjs` + `tests/gates/gate-register.test.ts`. **The prohibition lifts.**

**No figure in this receipt appears without its detector, and no count appears without its unit.** A bare figure anywhere here fails the row on its own terms.

---

## 1 · THE ONE SUITE FIGURE (J-10, reconciled — not averaged)

| figure | value | unit | detector |
|---|---|---|---|
| test files | **209** | files collected | `npx vitest run` · corroborated `npx vitest list --filesOnly \| wc -l` → 209 |
| **collected cases** | **1,423** | `it()` cases the runner instantiates | `npx vitest run` · independently `npx vitest list \| wc -l` → 1,423 (exact agreement) |
| passing | **1,421** | cases | `npx vitest run` |
| expected-fail | **1** | case | `it.fails` at `tests/styles/stacked-url-filter.test.ts:121` |
| failing | **1** | case | `tests/gates/boot-graph.test.ts` — **foreign to this lane**, see §1.2 |

### 1.1 · The J-10 disagreement, resolved

Three seats produced three counts (1,133 · 1,097+196 · 1,093+194) and ⊕² added a fourth (2,610/2,614). **None was wrong. None stated its unit.** They are four different measurements:

| unit | what it counts | at HEAD | detector |
|---|---|---|---|
| call sites | literal registration calls in source text | **1,253** (1,215 `it(` + 37 `it.each(` + 1 `it.fails(`) | `grep -rhoE '(^\|[^.\w$])it\(' tests scripts --include='*.test.ts' --include='*.spec.ts' \| wc -l`, and the two modifier forms likewise |
| **collected cases** | what the runner instantiates (`it.each` tables expand) | **1,423** | `npx vitest run` / `npx vitest list` |
| assertions | `expect()` evaluations | 2,6xx (⊕²'s figure, its own detector) | a full `npm test` receipt |

The **1,253 → 1,423 gap (+170)** is exactly the point: 37 `it.each` tables expand into more cases than they have call sites. A static grep and the runner **cannot** agree, and every seat that quoted one while meaning the other was reporting a real number under the wrong name.

**CANONICAL UNIT = collected cases**, on the ground that it is what the runner itself reports and what a regression actually changes. **Every future quote states its unit or is void.** The historical figures are not struck — they are re-labelled with the unit they always measured.

The scout seat measured **207 files / 1,387 cases** at `f7e2d7b7`. HEAD has since moved to `0a0f95cc`. The delta is **+2 files / +36 cases**: **+2 files / +16 cases are this row's** (§3), the remaining **+20 cases are foreign lanes'** landing under files that already existed. Declared, with its cause, per acceptance check 6.

### 1.2 · The two non-green cases, both held honestly

- **Expected-fail — `tests/styles/stacked-url-filter.test.ts:121`.** G-NO-STACKED-URL-FILTER's born-RED on `PagerDots.vue:493`, latched via the house `it.fails` idiom. **A live defect, not a pass.** TR row #7 holds it as a UNIT CASE (no seat, no roster line); #40 W-PAGER owns emptying it and flipping `it.fails`→`it`.
- **Failing — `tests/gates/boot-graph.test.ts` "the dist-demo it measures is NEWER than every source it is built from".** A staleness latch: `dist-demo/index.html` built 18:22Z, newest source 19:09Z. Its source roots are `demo/` + `src/` (`boot-graph.test.ts:504-516`). **This lane touched zero bytes in either** (§5); the 19:09 edit is another lane's live work. Cured by `npm run demo:dist:build`, not by this row. Recorded, not laundered.

---

## 2 · THE TWO-FIGURE GATE REGISTER (jointly #9 / #65 — `TERMINAL-ROSTER.md:215`)

Row #65's law: *"both figures ship with their detectors or neither ships."* Both ship. **One command emits both:**

```
$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 \
  bound:7 armOnly:2 unbound:51 drift:1 rosterSha256:dc05df91 violations:0
```
exit **0**.

### FIGURE A — the doc register: **exactly 60 seats**

Source `TERMINAL-ROSTER.md` §B.5 family table, 18 families. Detector: `SEAT-BINDING.json` carries all 60 rows with their family; `scripts/gate-register.mjs` check 4 asserts `seats.length === 60` **and** that every family's row count equals its declared §B.5 count. Re-added ⊘ this seat: 8+2+5+6+4+2+4+4+4+8+5+1+1+1+2+1+2 = **60**. Budget unmoved, no mints, add-one-retire-one intact.

### FIGURE B — the code register: **active 48 · reserved 5 (4 hard + 1 conditional) · worstCase 53 · remaining 7 · external 11**

Source `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/GATE-SEMANTIC-ROSTER-C19.json`, sha256 `dc05df9124024d721ce3a69dca297c237c965fa31921fbae6e0e46bb72257b52`. **Detector: `scripts/gate-register.mjs` checks 1-3** — the sha pin, the counts **recomputed from the arrays** (never read off the stored `counts` object), and every row resolved to a live executable.

Previously this figure had **no committed detector at all**; the one that produced it died with the governance stash. That is precisely what ⊕¹³ᵃ fenced, and it is what §3 repairs.

### 2.1 · THE ACTUAL OPEN WORK — the namespace defect, now named

**The two registers shared ZERO identifiers.** `G-*` ids appear in C19 **0 times** (detector: `JSON.stringify(c19).match(/G-[A-Z]/g)` → `0`); C19 keys on a dotted namespace (`token.graph.published-names-backed`) with `owner` = wave name. The 60 doc seats and the 48 code rows were **only ever printed side by side, never reconciled** — the "two figures" were two unrelated censuses wearing one heading.

`SEAT-BINDING.json` is the missing bijection: 60 rows, `{seat, family, gId, binding, paths, note}`. Seats **+0**. It mints nothing; it states which of the 60 names an executable actually carries.

### 2.2 · The binding truth, stated without rounding

| binding | n | meaning |
|---|---|---|
| `seat-detector` | **7** | an executable carries the name verbatim **and** asserts the seat's predicate |
| `arm-only` | **2** | an executable names the seat only as an ARM's host (seats +0) — deliberately **not** counted as bound |
| `none` | **51** | no executable under `tests/` or `scripts/` carries the name |

Independent corroboration (`grep -rhoE 'G-[A-Z0-9]+(-[A-Z0-9]+)*' tests scripts | sort -u`) returns exactly these 9 §B.5 names and no others. The remaining `G-*` strings the grep finds (`G-2`, `G-PLACEMENT`, `G-PARITY`, `G-NO-STACKED-URL-FILTER`, `G-EASE`, `G-TABINDEX`, `G-ROOT-BARREL-IMPORTS`, `G-INDICATOR`, `G-FALLBACK`, `G-BINDING`, `G-AWARE`) are **lane-local ids — §B.5's own close-battery class, not seats.** They are not counted toward `bound` and must never be.

**The 7 bound:** G-PACK-INSTALL · G-BARREL-EXPLICIT · G-BUNDLE-RATCHET · G-NO-ORPHAN-EXPORT · G-GLASS-HAS-FROST · G-WK-COLORMIX-BUDGET · **G-GATE-BUDGET** (the 7th, and it binds *here* — §3).
**The 2 arm-only:** G-RUNG-ONLY · G-CSS-REACH-UNION, both named by `tests/gates/trap-gates.test.ts` (§4).

### 2.3 · `unbound:51` is a REPORTED FIGURE, never a failure — and never an allowlist

Acceptance check 1 admitted two outcomes: `unbound:0`, or the real number with the strike list routed. **`unbound` cannot honestly reach 0**, and the reason is the mandate itself: driving it to zero means minting 51 gate names into code to satisfy a counter. That is the contrived-gate class the gates-abrogation mandate exists to forbid. So the register **reports** it and **routes** it.

What the detector *does* fail on is a binding that was **claimed and is not there** — a seat declared bound whose name is absent from its named file REDs (bite proven, §3). Suppression in neither direction; there is no allowlist anywhere in `gate-register.mjs`.

**STRIKE-OR-RENAME LIST, routed to #65** (which owns §B.5; #9 counts, #65 strikes). 51 seats, by family:

| family | unbound | names |
|---|---|---|
| RELEASE | 4 | public-surface re-pin register · G-THEME-BLEED · G-RELAY · G-BATTERY-EXISTS |
| HYGIENE | 1 | G-MUTATION-BITE |
| STRUCTURE | 4 | G-OVERFIT · G-NO-INWARD-DOCK · G-COLOCATED · G-COMMENT-RATIO |
| MATERIAL | 4 | G-FROST-TRANSMISSION · G-RADIUS-ROLE · G-SCRIM-NO-BLUR · G-NO-ENGINE-BRANCH |
| MOTION | 4 | G-SPRING-HONEST · G-SPRING-ONE-JOB · G-ENGAGE-RUNG · G-NO-FLASH |
| SEAM | 2 | G-TABS-SEAM · G-FEEDBACK-TINT-SEAM |
| A11Y | 4 | G-COARSE-TARGET · G-CONTRAST-COMPUTED · G-FOCUS-VISIBLE · G-KEY-SCOPE |
| LAYOUT | 4 | G1 no-H-overflow · G-MEASURE-LAW · G6 transposition-singleton · G-FORK-CENSUS |
| DOCK | 4 | BUDGET · RUN+MORPH · REACH · STATE |
| SUBSTRATE | 8 | the blob six · AURORA · G-FF-ONE-LAW |
| STORY/DOC | 5 | G-TILE-COVERAGE · G-ONE-NAME · G-FIRST-PAINT · G-QUIESCENT · G-DOC-TRUTH |
| PROPORTION | 1 | the CWT-2:1533 tranche-wide register |
| ACCOUNTING | 1 | G-ROW-HOMED |
| PROCESS | 2 | G-PROVENANCE · G-NO-EVIDENCE-COMMIT |
| CONFIG | 1 | G-CFG-EXPRESS |
| HANDMARK | 2 | G-HM-MARK · G-HM-LAYER |

BUILD (1) is fully bound. **Many of these 51 have live executables that simply do not carry the seat *name*** — the RELEASE re-pin register runs at `tests/public-surface.spec.ts`, MOTION's spring seats have real assertions. #65's decision is per-row **name-the-executable** vs **strike-with-honest-recount**; this row supplies the measurement, not the verdict.

### 2.4 · The ONE roster drift — pinned, not allowlisted

`reka.tags-input.value-binding` (`tests/components/ui/reka-binding-idiom.test.ts`):

- **roster says**: *"TagsInput: the active item resolves `data-[state=active]` (the `tag=` idiom is gone)"*
- **HEAD says**: *"TagsInput: item text renders from `value=` (the stale `tag=` idiom is gone)"*
- **verdict**: STALE IN SUBSTANCE, not a re-word — active-item *state resolution* vs item *text rendering* are two different assertions.

The other **47 of 48** active rows bind verbatim to a live registration. All 48 `sourcePath`s exist (28 distinct files); all 11 external `sourcePath`s and every enrollment anchor resolve.

**C19 is NOT edited.** Its sha is the provenance pin quoted at `TERMINAL-ROSTER.md:159` and `:215` and in §B.5; row #9 may not move it. The drift is recorded in `SEAT-BINDING.declaredTitleDrift` and **pinned**: the detector REDs if a *second* row drifts **and** REDs if this one is repaired without updating the record. An allowlist suppresses one way; this suppresses neither. Successor mechanism is C19's own `authority.supersedesRosterSha256` — **#65's call, not this row's**.

Verified unmoved: `shasum -a 256 …GATE-SEMANTIC-ROSTER-C19.json` → `dc05df91…257b52`.

---

## 3 · THE DETECTOR — `scripts/gate-register.mjs` + `tests/gates/gate-register.test.ts`

~200 lines, deps `node:fs` + `node:crypto` only. **G-GATE-BUDGET's executable** — the seat that owns "exactly 60" had never had one. Five checks:

1. **sha pin** — C19 hashes to `dc05df91…`, so the figure #9/#65 quote is backed by a committed detector.
2. **counts recomputed** from the `activeVitest`/`reservedVitest`/`externalEnforcement` arrays and compared against the stored `counts`; `remainingSeats` derived as `60 − worstCase`.
3. **row → file → title** — every active row's `sourcePath` exists and its `currentRegistration` is a **live registration**, i.e. the whole quoted title is the first argument of an `it(`/`test(` call (any chained `.each(…)`/`.fails`/`.only`/`.skip`/`.concurrent`). Every external row's `sourcePath` exists and every enrollment anchor resolves (`package.json#scripts.*` keys checked as real keys; text anchors as substrings).
4. **seat bijection** — `SEAT-BINDING.json` holds exactly 60 rows, family counts match §B.5, and **every claimed binding is verified against the file**.
5. **drift equality** — the measured drift set must equal the declared one, exactly.

Non-zero exit on any violation. **No allowlist, no fallback, no skip.**

**Deliberately absent** (the apparatus the abrogation mandate names): no `governedInvariant` wrapper, no `vitest.governed-setup.mjs`, no `package.json` script chain, no 48-registration migration across 28 files. Verified: `grep -rn "governedInvariant" src demo tests scripts vitest.config.ts package.json` → **2 hits, both prose in this row's own files explaining why the apparatus stayed quarantined.** Zero code.

**Detector strengthened this seat.** The inherited draft matched the roster title as a bare quoted string anywhere in the file — a title surviving only in a comment would have counted as bound. Now the `it(`/`test(` **call form** is required. Measured before changing anything: all 47 loose matches were already strict matches, so the tightening moved **no figure** — it closed a false-pass hole at zero cost. A bite proves it (below).

**The bites — 7, one per claim** (in-memory io overrides, zero disk writes):
1. mutated roster byte → sha pin REDs
2. stale `counts` object → recomputation REDs
3. severed `it(` title → undeclared-drift REDs
4. **a rostered title demoted to a COMMENT → drifts** (the call-form bite)
5. seat claiming a binding its file does not carry → REDs
6. seat register ≠ 60 rows → budget REDs
7. missing external enrollment anchor → REDs

**9 collected cases.**

---

## 4 · THE B4/B5 VERIFY CLAUSE — ANSWERED

Row #9: *"confirm the `light-dark()` inset-shadow and scoped-`:global()` trap gates survived the `governedInvariant` migration sweep; if unseated they re-enter as ARMS (+0 seats)."*

**Measured answer: worse than unseated — neither ever had a standing gate.**

| trap | state at HEAD | detector |
|---|---|---|
| `light-dark()` inset-shadow | **no standing gate.** One narrow local assertion only: `tests/components/ui/dialog/graded-backdrop.test.ts:113` `expect(form2Region).not.toContain("light-dark(")`, scoped to one region of one file. The three other `light-dark`-mentioning test files are unrelated (a token read, a Canvas2D resolver, a bundle profiler). | `grep -rln "light-dark" tests scripts` → 4 files, each read |
| scoped `:global()` | **nothing at all.** 0 hits in `tests/`, 0 in `scripts/`; `src/` carries exactly one mention, inside a comment (`_shared/field/field-surfaces.css:191`). Green **by accident**, unwatched. | `grep -rn ":global(" tests scripts src` |

Both are **user-recorded recurring defect classes** (the `:global()` drop logged at its third recurrence). Per the row's own clause they re-enter as **ARMS, seats +0** — `tests/gates/trap-gates.test.ts`:

- **`light-dark()` inset-shadow → arm of G-RUNG-ONLY** (MATERIAL). No `box-shadow` and no `--*shadow*` custom property in `src/**` may carry an `inset` fragment **inside** a `light-dark()` call — the whole declaration computes to `none`, silently, in both modes. Parenthesis-aware so `inset` *outside* the call (the cure) never fires. Census over `src/`: **0 violations**.
- **scoped `:global()` → arm of G-CSS-REACH-UNION** (STRUCTURE). No `<style scoped>` block in `src/**/*.vue` may contain `:global(` — silently dropped from emitted CSS. SFC-parsed, so an *unscoped* block (legal) never fires; parse failure fails **closed**. Census: **0 violations**.

Both carry bites both ways — a planted violation REDs, and the legal forms provably do not fire (5 negative cases for the shadow arm, 2 for the reach arm). An arm that cannot fail is the hollow class this tranche abrogated. **6 collected cases. Budget stays exactly 60**; `SEAT-BINDING.json` records both hosts as `arm-only` so this file naming its seats can never inflate `bound`.

---

## 5 · C-13 — THE BLANKET CLAIM CORRECTED

§B.5 states *"C-13 remains BLOCKING — an unwired gate cannot fail."* **Measured, that is true of the remainder but false of the pair:**

- `tests-visual/` is an npm **workspace** (`package.json:13-15`), **174** spec files, own `@playwright/test` devDep.
- The **pixel-floor pair IS enrolled**, both edges live: `.github/workflows/ci.yml:57,59` → `gate:pixel-floor:ci{,:planted}`; `scripts/release.sh:45-46` → `gate:pixel-floor{,:planted}`. All 11 C19 `externalEnforcement` rows resolve ⊘ (detector: `gate-register.mjs` check 3).

**Correction: C-13 scopes to the ~172 unenrolled specs, not to the suite.** Those have no CI or release edge and remain unwired. That remainder is C-13's own lane (#66's close battery), not this row's.

---

## 6 · THE NINE RECOVERED ARTIFACTS — ADJUDICATED

`docs/tranches/BK/recovery/2026-07-28-governance-stash/` — all 9 git-tracked (SE-1 loss repaired). Stash message states the owner-ratified boundary verbatim: *"REJECTED-WITH-SALVAGE (owner-ratified; salvage lands at Phi0 row 1: 3 detector conversions + 3 hardened bodies, annotation-stripped)."* Five of those six already landed by another route; the class is **REJECTED-WITH-SALVAGE — adjudicate, never wholesale**.

| # | artifact | verdict | grounds |
|---|---|---|---|
| 1 | `scripts_verify-governed-invariants.mjs` (581 L) | **QUARANTINE file · SALVAGE 4 checks** | Run from the recovery path: **57 violations, exit 1** (3 missing files · 48 × "must resolve exactly once; found 0" · 6 enrollment); external edges 11/11 pass. Green costs 3 new files + 6 enrollment edits + a 48-registration migration across 28 files with frozen title strings and sha-pinned ordered-id digests — an apparatus whose headline figure is *still* read off a JSON. Its four load-bearing checks re-derive slim and **are** §3. |
| 2 | `tests_governance_governedInvariant.ts` | **QUARANTINE** | Pure pass-through (`void id; void metadata; return it(title, handler)`). Zero runtime strength; a grep anchor only. 47/48 rows bind by title at HEAD at zero source cost. |
| 3 | `vitest.governed-setup.mjs` | **QUARANTINE** | Only runs #1 on every collect. Replaced by one vitest gate test. |
| 4 | `tests_governance_chipListener.setup.ts` | **QUARANTINE (hard)** | Rewrites `addEventListener`/`removeEventListener` on their prototype-chain owners from a *setup* file, keeps a global ledger, ships a `runFixedDecoyMutation()` that proves the ledger proves itself. Zero consumers. Detector-for-the-detector class. Its subject already executes at `chip.contract.test.ts:142`. Corroborated ⊘: `vitest.config.ts` has one project, `setupFiles: ["./tests/setup.ts"]` — **no `chip-listener` project survives**, so the quarantine holds structurally. |
| 5 | `tests_governance_fixtures_captureEventMethod.ts` | **QUARANTINE** | Sole consumer is #4; dies with it. |
| 6 | `tests_composables_glass_supportsBackdropRefract.test.ts` | **QUARANTINE — subject dead** | `src/composables/glass/supportsBackdropRefract.ts` deleted at `82bdc93e` "fix(BK/Φ0): delete the refract runtime latch" (verified ⊘: file absent, commit present). The spec cannot resolve its import; re-landing resurrects a latch BK deliberately killed (no-backwards-compat). Its two born-REDs recorded **DISCHARGED-BY-DELETION**. |
| 7 | `tests_styles_tokenGraphDetector.ts` (~430 L) | **QUARANTINE file · ROUTE the merit out** | The blindness is real — `tests/styles/token-graph.test.ts:31-33` scans `/\[(--[\w-]+):/g` over raw concatenated source **with comments intact**, so a token named only in a `//` comment counts as defined: G-MUTATION-BITE's **+DETECTOR-BLIND** arm exactly. But the cure ships compiler-sfc + typescript + postcss AST machinery plus a frozen 7-file carrier census with per-branch mount harnesses — overfit to one token family, RED on any legitimate carrier move, single-consumer with no export (fails the ≥2-site law). **Routed to the G-MUTATION-BITE owner** as a ≤20-line in-place cure (strip comments before the arbitrary-property scan; require the hit's file to be in the reach set) + one self-test bite. **Row #9 owns the register, not the token graph.** |
| 8 | `card-raw.json` | **STAYS QUARANTINED** — HOLD-FOR-OWNER | One-shot browser capture; evidence, not detector. Hold conditioned on the UNSTARTED #22 frost ruling. Tracked inside the recovery dir, so the loss is repaired. **Must not be restored to the repo root** — a root copy is the evidence-at-root defect G-NO-EVIDENCE-COMMIT names. |
| 9 | `motion-probe.json` | **STAYS QUARANTINED** — same grounds | `/foundations/motion` capture. #77 W-MOMENTUM-CENSUS evidence (`evidence_state=owed` there), routed to #10. Cite from #77; do not restore to root. |

**The one body that genuinely re-lands** — `tests/components/chip.contract.test.ts:142`, *"does not retain stale pressed semantics when mode changes"*. The stash body carried ~20 lines of real strength under a ledger prologue: the mode-transition case mounted with **hostile caller attrs** (`role`, `tabindex`, `aria-pressed="true"`, `data-state="caller-state"`, `onClick`) proved non-authoritative across selectable→action→static, plus `role`/`tabindex` clearing on static and the pre-transition selectable assertions. HEAD's prior body never tested component-owns-semantics-against-consumer. **Landed annotation-stripped**: ledger prologue, `positiveTrace`, `captureEventMethod` and the `loadChip()` lazy-import indirection (which existed *only* so the ledger could install pre-import) all gone — verified ⊘, zero residue. Title unchanged, so the C19 binding stays green.

**Net: 0 of 9 files re-land as files · 4 verifier checks re-derive slim (§3) · 1 hardened body re-lands annotation-stripped · 1 merit routes out.**

Recovery dir untouched: `git status --porcelain docs/tranches/BK/recovery/` → **clean**.

---

## 7 · ROUTED OUT OF THIS ROW

| item | owner |
|---|---|
| the 51 unbound seats — strike or name-the-executable, per row | **#65** (owns §B.5) |
| the `reka.tags-input.value-binding` roster drift + any C19 successor cut | **#65** |
| `tokenGraphDetector`'s comment-blindness merit, as a ≤20-line in-place cure | **G-MUTATION-BITE / +DETECTOR-BLIND owner** |
| `card-raw.json` | **#22** (owner-held, UNSTARTED) |
| `motion-probe.json` | **#77 / #10** |
| the ~172 unenrolled visual specs | **C-13's lane (#66 close battery)** |
| `dist-demo` staleness (boot-graph RED) | the lane holding the 19:09 `demo/`+`src/` edit |
| CWT-3 §5 residue: 55 lane-minted born-RED = close-battery class · easing 11→≤7 · credits banked | recorded; the classification is §B.5's law, unchanged by this row |

---

## 8 · ACCEPTANCE — measured

| # | check | result |
|---|---|---|
| 1 | `node scripts/gate-register.mjs` exits 0, prints one line | **PASS** — `seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:7 armOnly:2 unbound:51 drift:1 rosterSha256:dc05df91 violations:0`, exit 0. `unbound` prints its real number with the strike list routed to #65 (§2.3) — **never an allowlist** |
| 2 | the two new gate files green incl. every bite | **PASS** — 2 files, 16 cases, 0 failed |
| 3 | C19 sha unchanged | **PASS** — `dc05df9124024d721ce3a69dca297c237c965fa31921fbae6e0e46bb72257b52` |
| 4 | `governedInvariant` absent from code | **PASS** — 2 hits, both prose in this row's files |
| 5 | recovery dir clean, 9 files untouched | **PASS** — `git status --porcelain` empty |
| 6 | full suite, delta declared with cause | **PASS with one foreign RED** — 209 files · 1,423 cases · 1,421 pass · 1 expected-fail · 1 foreign staleness. This row adds **+2 files / +16 cases** (§3, §4); +20 further cases are foreign lanes' |
| 7 | both register figures each beside its detector, suite figure with its unit | **PASS** — §1, §2 |
| 8 | diff touches only `tests/**`, `scripts/gate-register.mjs`, `docs/tranches/BK/execution/2026-08-03-row9-register/**`; **zero `src/`** | **PASS** — §9 |

---

## 9 · THE DIFF

| path | state |
|---|---|
| `scripts/gate-register.mjs` | new — the detector |
| `tests/gates/gate-register.test.ts` | new — G-GATE-BUDGET's vitest seat, 9 cases, 7 bites |
| `tests/gates/trap-gates.test.ts` | new — the B4/B5 arms, 6 cases, 4 bites, seats +0 |
| `tests/components/chip.contract.test.ts` | edited — the one salvage, annotation-stripped |
| `docs/tranches/BK/execution/2026-08-03-row9-register/SEAT-BINDING.json` | tracked at `0a0f95cc`; edited — HEAD re-pinned, re-verification recorded. The 60-seat bijection + the pinned drift |
| `docs/tranches/BK/execution/2026-08-03-row9-register/REGISTER.md` | this receipt |

**Zero `src/` bytes.** `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/GATE-SEMANTIC-ROSTER-C19.json` unedited (sha verified). `docs/tranches/BK/recovery/` unedited. `package.json` and `vitest.config.ts` unedited — the new gates are reachable from `npm test` because they live under `tests/gates/`, which the existing include already covers.
