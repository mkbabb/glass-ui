# BJ TERMINAL-ROSTER row #9 — W-GATE-TRUTH · THE REGISTER

**HEAD** ~~`0a0f95cc61ec9edbfcec76fa4c8b98b417c334fc`~~ ~~`85915b2d27b602cdebbbf6638051d76a463a7eeb`~~ **[2026-08-03 CURE ROUND: re-pinned `85915b2d…`.** The first pin went stale by **ten commits** (`git rev-list --count 0a0f95cc..85915b2d` → 10; the register artifacts themselves landed six commits along, at `6cf8eb51`) — the same stale-HEAD defect this row correctly caught in its own spec, reintroduced in its own output (challenger finding 10). Every figure below is **re-measured at the new pin**; the cure bytes of this round are in the working tree at measurement time and land with the driver's commit.**]**

**[⊕²⁷ 2026-08-04 04:44Z · ROUND-3 CURE SEAT — THE SEAL-TIME RE-PIN, per cure #10's own clause. HEAD is now `e2b7a0b5710c712a80c9cc58694b29ae96eab164`** — *"feat(gates): land row-9 cure round 2 — nine of ten discharged, CURE-REQUIRED residue banked"*. `git rev-list --count 85915b2d..e2b7a0b5` → **5**; the round-2 pin was 2 commits stale when it was written and 5 at this seat's clock.

**The delta is NOT docs-only, and the round-2 residue's "verified — docs-only" was true only at the adjudicator's clock.** Detector, verbatim: `git diff --name-only 85915b2d..HEAD | grep -v '^docs/'` → **2 paths**, `scripts/gate-register.mjs` and `tests/gates/gate-register.test.ts` — **this row's own round-2 cure bytes landing at `e2b7a0b5`**, zero foreign source. It is therefore docs-only *for the figures*, and that is proved rather than asserted: the same script run from all three pins emits the **byte-identical** register line (detector: `formatRegisterLine(verifyGateRegister())` over `git show 85915b2d:scripts/gate-register.mjs`, `git show e2b7a0b5:…`, and the round-3 working tree) —

```
85915b2d               seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:7 armOnly:2 unbound:51 drift:1 rosterSha256:dc05df91 violations:0
e2b7a0b5 (round-2)     seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:7 armOnly:2 unbound:51 drift:1 rosterSha256:dc05df91 violations:0
round-3 working tree   seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:7 armOnly:2 unbound:51 drift:1 rosterSha256:dc05df91 violations:0
```

**Every figure below is re-measured at `e2b7a0b5` + this round's working-tree cure bytes**, and where a figure moved it is struck in place, never overwritten. **The same residue stands as at every prior round and is stated, not hidden:** this round's bytes (the three matcher closures, their four bites, these strikes) are working-tree-only until the driver commits them.**]** · row #9 (`TERMINAL-ROSTER.md:159`), Φ3

**Cursor standing — ⊕¹³ᵃ: CONDITIONAL, and the condition is now SATISFIED.**
~~**Cursor standing discharged**: ⊕¹³ᵃ … It is re-derived, in-tree, and executable … **The prohibition lifts.**~~ **[2026-08-03 cure #4 — the original claim elided the cursor's second condition and had to be struck.]** ⊕¹³ᵃ (`EXECUTION-PROGRESS.md:124`, restated `:139-141`) forbids #9/#65 quoting any code-side register figure *until the detector is RECOVERED (from the pinned stash) **or re-derived and committed***. **Two conditions, both now met:**

| condition | state | evidence |
|---|---|---|
| **re-derived** | MET | `scripts/gate-register.mjs` re-derives the sha pin, the counts, the row→file→title binding, the external edges and (cure #3) §B.5 itself — none of it read off a JSON |
| **committed** | MET at **`6cf8eb51`** — *"feat(gates): land BK row-9 W-GATE-TRUTH register + detector — landed-candidate, CURE-REQUIRED"* | that commit tracks `scripts/gate-register.mjs`, `tests/gates/gate-register.test.ts`, `tests/gates/trap-gates.test.ts`, `REGISTER.md` and `SEAT-BINDING.json` — ~~the five files that were `??` untracked when the adjudicator ruled~~ **[⊕²⁷ 2026-08-04 · ROUND-3 cure #4 — FALSE, struck. `SEAT-BINDING.json` was already TRACKED before that commit. Detector, verbatim, run per path: `git cat-file -e 6cf8eb51^:<path>` → exit 0 for `docs/…/SEAT-BINDING.json`, exit 1 (`??`) for the other four. Corroborated by `git show --stat 6cf8eb51`, which lists `SEAT-BINDING.json \| 3 +-` — a **3-line modification**, not a creation, against 253/265/181/265 insertions for the four new files. The true provenance is **four files created + one file modified**; the commit's ⊕¹³ᵃ-satisfying force is unchanged by the correction, and the correction is recorded because a figure this row asserts about its own commit is exactly the class it convicts elsewhere.]** |

**The prohibition lifts at `6cf8eb51`**, not before, and not by this row's assertion — by a commit. At the adjudication the honest state was **CONDITIONAL — PENDING COMMIT**, because the seat that authored the bytes is walled from `git add`/`commit`; **the committing seat is the driver/lead** (roster row 1's adjudication bank names the lead's seal commit as the landing act), and it acted. Until it did, the row re-instantiated its own **E-1** — *"the entire governed-gate apparatus exists only in the working tree"*. **Residue, stated rather than hidden:** this cure round's own bytes (the strict matchers, the structural anchors, this receipt) are again working-tree-only until the driver commits them; the condition is per-commit, not per-row, and it is satisfied only for what `6cf8eb51` carries.

**No figure in this receipt appears without its detector, and no count appears without its unit.** A bare figure anywhere here fails the row on its own terms.

---

## 0 · THE STATUS VOCABULARY — ⊕²⁵ LANDS HERE

Routed to this row from **#11 §2a** (`docs/tranches/BK/execution/2026-08-03-row11-process-cure/PROCESS-CURE.md:168`, Z-6 gate half, `REGISTRY.md:409` DECIDED—STRUCK). The clause, received and restated so the route resolves at **both** ends:

> **A gate's status is what its runner emits — PASS · FAIL · ABSENT — never what an author asserts. An unwired gate is ABSENT, never GREEN.**

It is the value-form of this row's own C-13 blocker (*"an unwired gate cannot fail"*, `docs/tranches/BK/gates/ROSTER.md:12`). It is **load-bearing here, not ceremonial** — it settles three of this row's own payloads:

| where | the word |
|---|---|
| the ~~51~~ **50** [⊕³⁶ 2026-08-04 · #65: `unbound:51` → `unbound:50` — RT-7 bound the PROPORTION seat `the CWT-2:1533 tranche-wide register` to `tests/styles/proportion-register.test.ts`. The **word** is unchanged and that is this row's whole point: the other 50 are still **ABSENT**, not "unbound-but-probably-fine".] seat names with no executable (§2.3) | **ABSENT.** Not "unbound-but-probably-fine", not "a reported figure" — the honest word, and strictly stronger than the one the first draft used |
| ~~E-8's `./styles.css` manifest gate, green when `dist/component-styles.css` is absent (§10)~~ **[⊕²⁷ 2026-08-04 · ROUND-3 cure #5 — RE-SCOPED, the claim was too wide: the artifact edge IS bound, in the same file. See §10 E-8.]** E-8's residue: `public-surface.spec.ts:539`'s manifest-string compare is unguarded **if the sibling built-artifact `describe` ever moves** (§10) | ~~**ABSENT reported as PASS.** The precise defect, in one word~~ **[⊕²⁷ struck — it does not reproduce at file grain.]** **A NARROW COUPLING, not an ABSENT-as-PASS.** The file-grain status when `dist/` is absent is **FAIL**, loudly (`:703`), which is the ⊕²⁵-correct emission |
| a `.skip`'d / `.todo`'d / commented-out registration (§3) | **ABSENT.** Which is why the detector's matchers were tightened this round: it scored all four forms BOUND, i.e. it *asserted* a status the runner never emitted |

The detector echoes the sentence in its header comment and prints it under every register line, so the vocabulary travels with the figure it governs.

---

## 1 · THE ONE SUITE FIGURE (J-10, reconciled — not averaged)

**Re-pinned at the cure round** (2026-08-03, HEAD `85915b2d`). The `0a0f95cc` figures are struck in place, not deleted — they were true at their pin and false ten commits later, which is the whole reason this row exists.

| figure | value | unit | detector |
|---|---|---|---|
| test files | **209** | files collected | `npx vitest run` · corroborated `npx vitest list --filesOnly \| wc -l` → 209 · **[⊕²⁷ 2026-08-04 · ROUND-3: re-derived at `e2b7a0b5`+tree, same detector → **209**, unmoved]** |
| **collected cases** | ~~1,423~~ ~~1,430~~ → **1,449** | `it()` cases the runner instantiates | `npx vitest run` · independently `npx vitest list \| wc -l` → 1,430 (exact agreement) · **[⊕²⁷ 2026-08-04 · ROUND-3 re-pin: `npx vitest list \| wc -l` → **1,449**. Delta +19 from `85915b2d`, declared with cause: **+4 are this row's** (the four round-3 bites, `gate-register.test.ts` 16→20, §3), **+15 foreign** (other lanes, file count unmoved at 209)]** |
| passing | ~~1,421~~ → **1,428** | cases | `npx vitest run` **[⊕²⁷ 2026-08-04 · ROUND-3 — NOT re-run at this pin, and therefore NOT re-asserted: this figure stands **at its `85915b2d` pin** and is labelled with it. The round-3 seat re-derived the *collection* figures only (`vitest list`, two commands); a pass/fail split needs a full run this seat did not perform, and quoting one it did not take is the exact class §1 exists to kill. **PASS/FAIL/ABSENT (⊕²⁵): the pass count at this seat's clock is ABSENT, not green.** The two gate files this row owns ARE re-run and green at this pin — 2 files / **26** cases / 0 failed]** |
| expected-fail | **1** | case | `it.fails` at `tests/styles/stacked-url-filter.test.ts:121` |
| failing | **1** | case | `tests/demo/router-field-ownership.test.ts` — **foreign, load-only flake**, see §1.2 |

**Measurement window stated, because the tree is shared and it moved inside it:** the suite figures are the **03:29Z** full run. At **03:45Z** a re-run of `tests/gates` alone came back **1 failed / 52 passed** — `boot-graph`'s staleness latch, flipped by another lane's 03:44:28Z `src/**` writes (§1.2). Nothing of this row's moved; the figure is quoted with its clock rather than re-run until it flatters.

**The +7 delta from `0a0f95cc` to `85915b2d`, declared with its cause:** **+6 are this row's** — the six new bites the cure round adds to `tests/gates/gate-register.test.ts` (it.skip · commented-out · gutted-ci · gutted-release.sh · seat-name-in-comment · §B.5 family movement), taking this row's two gate files from 16 cases to **22**. **+1 is foreign** (other lanes' landings under files that already existed). File count unmoved at 209.

**[⊕²⁷ 2026-08-04 · ROUND-3 cure #9 — THE STRIKE RECORD ANNOTATED, not renumbered.** The `~~9~~` struck at §3 and §9 reproduced the pre-cure receipt faithfully, **and that receipt was itself false**: `6cf8eb51` carries **10** registrations, not 9. Detector, verbatim: `git show 6cf8eb51:tests/gates/gate-register.test.ts \| grep -cE '^\s+it\('` → **10** (3 assertions + **7** bites; the bite figure in the same strike was correct). The arithmetic of the sentence above is what proves it — 10 (`gate-register`) + 6 (`trap-gates`) = **16 → 22**, which only balances at 10. **The false 9 stays struck rather than silently corrected**, because a strike is a record of what was claimed; the correction rides beside it. **This round's own delta, same detector at HEAD `e2b7a0b5` + working tree: `grep -cE '^\s+it\(' tests/gates/gate-register.test.ts` → **20** (was 16 at `e2b7a0b5`), `trap-gates.test.ts` → **6** (unmoved), corroborated case-for-case by `npx vitest list <file> \| wc -l` → **20** and **6**. The two gate files go **22 → 26**, +4, all four this round's new bites (block-suppression · live-`.only` · block-scalar comment · embedding rename).]**

### 1.1 · The J-10 disagreement, resolved

Three seats produced three counts (1,133 · 1,097+196 · 1,093+194) and ⊕² added a fourth (2,610/2,614). **None was wrong. None stated its unit.** They are four different measurements:

| unit | what it counts | at HEAD | detector |
|---|---|---|---|
| call sites | literal registration calls in source text | ~~**1,253** (1,215 `it(` + 37 `it.each(` + 1 `it.fails(`)~~ → ~~**1,316** (**1,278** `it(` + **37** `it.each(` + **1** `it.fails(`) at `e2b7a0b5` + this round's tree~~ **[⊕²⁹ 2026-08-04 driver-adjudication: the seat's 1,278 was the UNGUARDED count — dropping `(^|[^.\w$])` admits 27 substring hits (`.split(`×12, `vm.$emit(`×7, `visit(`×6, …). The GUARDED detector run verbatim at the adjudicating clock: `it(` → **1,252** · `it.each(` → **37** · `it.fails(` → **1** · **call sites = 1,290**; independently concordant with the verify seat's own run]** | `grep -rhoE '(^\|[^.\w$])it\(' tests scripts --include='*.test.ts' --include='*.spec.ts' \| wc -l`, and the two modifier forms likewise (`…it\.each\(` · `…it\.fails\(`) |
| **collected cases** | what the runner instantiates (`it.each` tables expand) | ~~1,423~~ → **1,430** at `85915b2d` | `npx vitest run` / `npx vitest list` |
| assertions | `expect()` evaluations | 2,6xx (⊕²'s figure, its own detector) | a full `npm test` receipt |

~~The **1,253 → 1,423 gap (+170)** is exactly the point~~ **[⊕²⁷ 2026-08-04 · ROUND-3 cure #10 — THE FIGURE WAS CARRIED, NOT RE-MEASURED, AND THE SENTENCE RAN ON A RETIRED NUMBER.** §1 declares *"every figure below is re-measured at the new pin"*; the `1,253` (and its `1,215` component) were inherited verbatim from the `0a0f95cc` pin, unstruck, under that declaration — the row's own J-10 disease, one level in. It is re-measured **here, at this seat's pin (`e2b7a0b5` + this round's working-tree cure bytes), with the detector run verbatim as §1.1 states it**: ~~`it(` → **1,278** · `it.each(` → **37** · `it.fails(` → **1** · **call sites = 1,316**~~ **[⊕²⁹ 2026-08-04 driver-adjudication: 1,278 was the UNGUARDED grep (27 substring hits admitted); GUARDED, verbatim, at the adjudicating clock: `it(` → **1,252** · `it.each(` → **37** · `it.fails(` → **1** · **call sites = 1,290**]**. Collected cases at the ~~same~~ adjudicating clock: ~~**1,449**~~ **[⊕²⁹: **1,450**, +1 foreign drift]** (`npx vitest list \| wc -l`), files **209** (`npx vitest list --filesOnly \| wc -l`). **The gap is ~~1,316 → 1,449 = +133~~ [⊕²⁹: **1,290 → 1,450 = +160**].** Two prior clocks are recorded so the drift is legible rather than laundered: the round-2 challenger measured 1,267 and the adjudicator 1,270 (1,232+37+1) — three different clocks, three different trees, one shared lesson: **a call-site figure is only ever true at its pin, and it must be re-run, never carried.**]** — 37 `it.each` tables expand into more cases than they have call sites. A static grep and the runner **cannot** agree, and every seat that quoted one while meaning the other was reporting a real number under the wrong name.

**CANONICAL UNIT = collected cases**, on the ground that it is what the runner itself reports and what a regression actually changes. **Every future quote states its unit or is void.** The historical figures are not struck — they are re-labelled with the unit they always measured.

The scout seat measured **207 files / 1,387 cases** at `f7e2d7b7`. HEAD has since moved to `0a0f95cc` **[cure round: and on to `85915b2d`]**. The delta is **+2 files / +36 cases**: **+2 files / +16 cases are this row's** (§3), the remaining **+20 cases are foreign lanes'** landing under files that already existed. Declared, with its cause, per acceptance check 6. **[2026-08-03 cure round: +0 files / +6 further cases are this row's — the six new bites; +1 foreign. 209 files / 1,430 cases.]** **[⊕²⁷ 2026-08-04 · ROUND 3: +0 files / **+4 further cases are this row's** — the four new bites (§3 items 14-17); **+15 foreign**. **209 files / 1,449 cases**, detector `npx vitest list --filesOnly \| wc -l` and `npx vitest list \| wc -l`.]**

### 1.2 · The non-green cases, both held honestly

- **Expected-fail — `tests/styles/stacked-url-filter.test.ts:121`.** G-NO-STACKED-URL-FILTER's born-RED on `PagerDots.vue:493`, latched via the house `it.fails` idiom. **A live defect, not a pass.** TR row #7 holds it as a UNIT CASE (no seat, no roster line); #40 W-PAGER owns emptying it and flipping `it.fails`→`it`.
- **`tests/gates/boot-graph.test.ts` "the dist-demo it measures is NEWER than every source it is built from" — a FLAPPING foreign staleness latch, and the flap itself is the honest record.** GREEN in the full-suite run at 03:29Z; **RED** when `tests/gates` was re-run at 03:45Z, because a concurrent lane wrote five `src/**` files at **03:44:28Z** (`src/composables/glass/backdropLuminanceSample.ts` · `useGlassBackdropLuminance.ts` · `src/styles/glass/{ladder,liquid-fill,material}.css`) after the `dist-demo/index.html` build at **03:03:41Z**. Its source roots are `demo/` + `src/` (`boot-graph.test.ts:504-516`); **this lane touched zero bytes in either**. Cured by `npm run demo:dist:build` in the lane holding those bytes — not by this row, and not by re-running until it is green. Recorded, not laundered.
- **Failing — `tests/demo/router-field-ownership.test.ts` "lets the Aurora studio exclusively own its route field"**, 5000 ms timeout. **Foreign and load-only**, the same case ⊕²⁶ adjudicated: it RED once under cold transform (138 s wall, 545 s transform under contention) and is **2/2 green warm in 1.66 s** on immediate re-run — reproduced twice this seat. No lane byte of mine is in `demo/`. Recorded as a flake **with its detector**, never as a pass.
- **Foreign typecheck RED, recorded because it is live at this pin:** `npx vue-tsc --noEmit -p tsconfig.test.json` → **1 error**, `tests/components/music-staff.contract.test.ts(165,49)` TS2322 (the row-91 lane's `mode: "loading"` props union). Zero errors in this row's files. Not this row's to cure; stated so the next seat quoting "typecheck green" does not inherit a lie.

---

## 2 · THE TWO-FIGURE GATE REGISTER (jointly #9 / #65 — `TERMINAL-ROSTER.md:215`)

Row #65's law: *"both figures ship with their detectors or neither ships."* Both ship. **One command emits both:**

```
$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:7 armOnly:2 unbound:51 drift:1 rosterSha256:dc05df91 violations:0
  STATUS VOCABULARY (⊕²⁵): PASS · FAIL · ABSENT. `unbound` is the ABSENT count — seat names with no live executable. An unwired gate is ABSENT, never GREEN.
  DRIFT (routed to #65) reka.tags-input.value-binding — tests/components/ui/reka-binding-idiom.test.ts
    roster title: TagsInput: the active item resolves `data-[state=active]` (the `tag=` idiom is gone)
```
exit **0**. **[⊕²⁷ 2026-08-04 · ROUND 3 — THE FOUR-LINE RECEIPT, RE-DERIVED AT THE NEW PIN (`e2b7a0b5` + this round's tree). The block above is reproduced BYTE-IDENTICALLY by `node scripts/gate-register.mjs`, exit 0, at this seat's clock — all four lines, including the ⊕²⁵ vocabulary line and the two routed-drift lines. Corroborated across pins in the header table: the `85915b2d`, `e2b7a0b5` and round-3 scripts each emit the same figure line.]** The figure line is unmoved by the cure round — **every strictness added this round left both figures where they were**, which is the point: the holes were real and nothing was standing in them. **[⊕²⁷ ROUND 3: and it is unmoved AGAIN by round 3's three matcher closures — `drift:1 violations:0`, with 0 live skip/todo/only modifiers censused across all 28 rostered `sourcePath`s (§3). A closure that moved a figure would have been a repair; these are hole-closures, and the distinction is stated rather than blurred.]** The ⊕²⁵ vocabulary line and the routed drift print beneath it, so no seat can quote the count without the word that governs it.

### FIGURE A — the doc register: **exactly 60 seats**

Source `TERMINAL-ROSTER.md` §B.5 family table, 18 families (17 live + the retired `~~HAIRLINE~~` row at 0). Re-added ⊘ this seat: 8+2+5+6+4+2+4+4+4+8+5+1+1+1+2+1+2 = **60**. Budget unmoved, no mints, add-one-retire-one intact.

~~Detector: `SEAT-BINDING.json` carries all 60 rows with their family; check 4 asserts `seats.length === 60` **and** that every family's row count equals its declared §B.5 count.~~ **[2026-08-03 cure #3 — struck as self-referential. The detector opened exactly two files, neither of them the authority: `seats.length === 60` and the family tally compared `SEAT-BINDING.json` **to itself**, and `SEAT_BUDGET = 60` hard-coded in the script was the only independent record of the ceiling. The one risk the budget actually has — §B.5 moving a seat — was invisible.]**

**Detector, cured:** `scripts/gate-register.mjs` now **parses §B.5 itself** (`ROSTER_MD_PATH`) and re-derives Figure A from the authority in three independent ways — the heading's *"exactly 60 seats"*, the family table's rows, and the `**Sum: … = 60.**` line's addends — then requires all three to agree with each other, with `SEAT_BUDGET`, with `SEAT-BINDING.json`'s `familyCounts`, and with the 60 rows' own family tally. Move `| MOTION | 4 |` to `5` at the authority and the register REDs (bite proven, §3).

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
| `none` | **51** | no executable under `tests/` or `scripts/` carries the name — **ABSENT** in the ⊕²⁵ vocabulary (§0) |

**All three counts are measured under the STRICT matchers as of the cure round** (§3): a roster title binds only as the first argument of a *running* `it(`/`test(` call (`.skip`/`.todo` struck, comments stripped first ~~)~~ **[⊕²⁷ 2026-08-04 · ROUND 3: — and, new this round, **not inside a `describe.skip(`/`.todo(`/`.skipIf(` block**, and **not a sibling of a live `.only`**; block suppression is resolved by extent, so a skipped block never condemns a running one)]**, and a seat name binds only in a **live string literal or an exported identifier**, never in prose **[⊕²⁷ ROUND 3: and only as a **whole name** — `-` is a non-word character, so both `indexOf` and `\b` matched a seat inside `XX-<seat>-RETIRED`; the boundary alphabet is `[A-Za-z0-9_-]`]**. **All three counts held at 7 / 2 / 51 under round 3's tightening as well.** Both figures held at 7 / 2 / 51 under the tightening — with one real repair: **`G-GATE-BUDGET`'s claim on `scripts/gate-register.mjs` was carried by a header COMMENT**, which the strict seat matcher REDs. The script now emits its own seat name in its violation messages, so the claim is live rather than narrated.

Independent corroboration (`grep -rhoE 'G-[A-Z0-9]+(-[A-Z0-9]+)*' tests scripts | sort -u`) returns exactly these 9 §B.5 names and no others. The remaining `G-*` strings the grep finds (`G-2`, `G-PLACEMENT`, `G-PARITY`, `G-NO-STACKED-URL-FILTER`, `G-EASE`, `G-TABINDEX`, `G-ROOT-BARREL-IMPORTS`, `G-INDICATOR`, `G-FALLBACK`, `G-BINDING`, `G-AWARE`) are **lane-local ids — §B.5's own close-battery class, not seats.** They are not counted toward `bound` and must never be.

~~**The 7 bound:**~~ **The 8 bound** [⊕³⁶ 2026-08-04 · #65, RT-7 — one ABSENT seat became BOUND; `bound:7` → `bound:8`, `seats:60` byte-identical, nothing minted]**:** G-PACK-INSTALL · G-BARREL-EXPLICIT · G-BUNDLE-RATCHET · G-NO-ORPHAN-EXPORT · G-GLASS-HAS-FROST · G-WK-COLORMIX-BUDGET · **G-GATE-BUDGET** (the 7th, and it binds *here* — §3) · **the CWT-2:1533 tranche-wide register** (PROPORTION, the 8th — bound by **#65** at `tests/styles/proportion-register.test.ts`, `binding:seat-detector`, `gId` null).
**The 2 arm-only:** G-RUNG-ONLY · G-CSS-REACH-UNION, both named by `tests/gates/trap-gates.test.ts` (§4).

### 2.3 · ~~`unbound:51` = **51 seat names ABSENT from code**~~ `unbound:50` = **50 seat names ABSENT from code** — never a failure, never an allowlist, and never a strike list on its own [⊕³⁶ 2026-08-04 · #65: RT-7 bound PROPORTION, the one seat of the 51 that #68's L-1 gave an executable. The caveat this section exists to carry is **unchanged and still binding** on the remaining 50 — ≥5 have live detectors under other titles, and 17 further gate files sit in neither register.]

~~### 2.3 · `unbound:51` is a REPORTED FIGURE, never a failure~~ **[2026-08-03 cure #5: "reported figure" was the weaker word. Under ⊕²⁵ the honest one is ABSENT — a gate name with no executable is a gate the runner cannot emit any status for.]**

**The figure, stated exactly: 51 of the 60 §B.5 seat names are ABSENT from `tests/` and `scripts/` — no live executable carries the name.** That is a statement about **names**, not about coverage, and the difference is the whole caveat below.

Acceptance check 1 admitted two outcomes: `unbound:0`, or the real number with the strike list routed. **It cannot honestly reach 0**, and the reason is the mandate itself: driving it to zero means minting 51 gate names into code to satisfy a counter. That is the contrived-gate class the gates-abrogation mandate exists to forbid. So the register **reports** it and **routes** it.

**THE CAVEAT #65 MUST CARRY WITH THE FIGURE** (challenger-verified, and it is why this list is *strike-or-name*, never *strike*): **at least five ABSENT seats have live detectors under other titles** — `G-RADIUS-ROLE` → `tests/styles/radius-role-canon.test.ts` (a full six-requirement radius-role gate) · `G-CONTRAST-COMPUTED` → `tests/styles/placeholder-contrast.test.ts` (live, and itself defective — E-6, §10) · `G-SPRING-*` → `tests/composables/motion/springTokenMirror.test.ts` + `springProjection.test.ts` · `G-FIRST-PAINT` → `tests/gates/boot-graph.test.ts` · `G-FOCUS-VISIBLE` → ~~`tests/components/ui/dock/DockLayerRail.a11y.test.ts`~~ **`tests/components/custom/dock/DockLayerRail.a11y.test.ts`** **[⊕²⁷ 2026-08-04 · ROUND-3 cure #6 — the path did not resolve. Detector, verbatim: `find tests -name 'DockLayerRail.a11y.test.ts'` → exactly one hit, under `custom/dock/`, none under `ui/dock/`. This is the caveat #65 is ORDERED to carry with the strike-or-name list; §11's own law admits only citations that resolve, so a caveat citing a path that does not exist would have handed #65 a reason to strike a covered seat.]**. **`unbound:51` delivered to #65 as "51 seats without detectors" would strike covered invariants.** It means *51 seat names absent from code*, and nothing more.

**A third population neither register sees** (challenger-verified, recorded here so #65 does not cut against a two-way frame): **17 gate-flavoured test files are in neither C19 nor `SEAT-BINDING.json`** — `radius-role-canon` · `stacked-url-filter` · `typed-track-seam` · `prm-no-resurrection` · `pager-dots.morph` · three handmark files · `DockLayerRail.a11y` · `GlassDock.motion-parity` · `dock-hold-contract` · `toast.queue` · `Skeleton` · `ScrollProgressRim` · `backdropLuminanceSample` · `feedback-motion-tune` · `music-staff.geometry`. The "two-figure" framing is itself incomplete; the third figure is #65's to seat, strike or leave unseated with grounds.

What the detector *does* fail on is a binding that was **claimed and is not there** — a seat declared bound whose name lives only in prose REDs (bite proven, §3). Suppression in neither direction; there is no allowlist anywhere in `gate-register.mjs`.

**STRIKE-OR-NAME LIST, routed to #65** (which owns §B.5; #9 counts, #65 strikes). 51 seats, by family:

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
| PROPORTION | ~~1~~ **0** | ~~the CWT-2:1533 tranche-wide register~~ **BOUND, not struck** [⊕³⁶ 2026-08-04 · #65: this family's one seat left the ABSENT population at RT-7 — bound to `tests/styles/proportion-register.test.ts`, `binding:seat-detector`. **Not a strike and not a movement:** PROPORTION still holds exactly 1 seat at §B.5, `familyCounts.PROPORTION` is still 1, and the budget is still exactly 60. The table's own total falls `51` → `50` with it (`:154`, *"51 seats, by family"*).] |
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

~~**555 lines**~~ → **668 lines** **[⊕²⁷ 2026-08-04 · ROUND 3; detector: `wc -l scripts/gate-register.mjs`]** (comment-dense by design: every check states what it refuses to do), deps `node:fs` + `node:crypto` only. **G-GATE-BUDGET's executable** — the seat that owns "exactly 60" had never had one. ~~Five checks:~~ **Six checks** (cure round):

1. **sha pin** — C19 hashes to `dc05df91…`, so the figure #9/#65 quote is backed by a committed detector.
2. **counts recomputed** from the `activeVitest`/`reservedVitest`/`externalEnforcement` arrays and compared against the stored `counts`; `remainingSeats` derived as `60 − worstCase`. **Honest standing (cure #3): this check is DOMINATED by check 1.** The sha pin freezes the same bytes, so it cannot fire today without the pin firing first — its own bite comment conceded *"the sha necessarily moves too"*. It is **defense-in-depth for #65's successor cut**, kept because the moment the pin is re-cut it is the only thing that re-derives `counts` from the arrays instead of trusting the stored object. ~~"four checks that carry their own weight"~~ **[struck: three carry their own weight; this is the fourth, kept with its dominance declared.]**
3. **row → file → title** — every active row's `sourcePath` exists and its `currentRegistration` is a **live registration**: comments are stripped from the source first, then the whole quoted title must be the first argument of an `it(`/`test(` call carrying only modifiers that **still run the case** — `.each(…)`, `.fails`, `.only`, `.concurrent`, `.sequential`. ~~(any chained `.each(…)`/`.fails`/`.only`/`.skip`/`.concurrent`)~~ **[2026-08-03 cure #1 — `.skip` and `.todo` STRUCK from the admitted set. The adjudicating probe proved all four of `it.skip(`, `it.todo(`, `// it(` and `/* it( */` scored **BOUND** against a real rostered row; the impl's claim that the matcher had been "tightened to the call form" was materially false for every form anyone actually uses to disable a test. Under ⊕²⁵ a skipped case is ABSENT, and the register was calling it live.]** **[⊕²⁷ 2026-08-04 · ROUND-3 cure #1 — THE HOLE WAS ONE NESTING LEVEL UP, AND CURE #1 DID NOT REACH IT. `CALL_FORM` reads the single call its title sits in; a `describe.skip(` / `.todo(` / `.skipIf(` **wrapping the file** left every rostered row beneath it scored **BOUND**. **Probe, pre-cure vs post-cure, same planted bytes through both scripts** (`git show e2b7a0b5:scripts/gate-register.mjs` vs the working tree, io-injected, zero disk writes): demoting `tests/styles/token-graph.test.ts`'s `describe(` to `describe.skip(` — **PRE-CURE** `drift:1 violations:0`, `drift=[reka.tags-input.value-binding]`, i.e. the register saw **nothing**; **POST-CURE** `drift:3 violations:1`, `drift=[token.graph.published-names-backed, token.graph.alias-acyclic, reka.tags-input.value-binding]`, `VIOLATION title drift set moved`. Identical output for `.todo(` and `.skipIf(true)(`. **`.only` is the same species read the other way** — a live `it.only(` on `token.graph.published-names-backed` makes every sibling runtime-ABSENT: **PRE-CURE** `drift:1 violations:0` (both bound); **POST-CURE** `drift:2 violations:1`, the `.only` case itself still bound (it runs) and `token.graph.alias-acyclic` drifted (it does not). Resolved **by extent**, never by a file-wide flag, so a skipped block cannot condemn a sibling block that still runs; `.skipIf(cond)` suppresses unconditionally because `cond` is not statically knowable and **failing toward ABSENT is the only direction ⊕²⁵ allows**; unbalanced source fails CLOSED. Two bites, both green.]**
4. **external enrollment, STRUCTURALLY** — every external row's `sourcePath` exists and every anchor resolves: `package.json#scripts.*` as real keys; **`#fragment` anchors only against text a runner would execute** — a YAML `run:` step value (inline or block scalar) for workflows, a non-comment command line for shell, comment-stripped source for JS/TS/JSONC. ~~(text anchors as substrings)~~ **[2026-08-03 cure #2 — STRUCK. The challenger deleted all four pixel-floor step lines from `ci.yml`, the word survived in the prose comment at `:57`, and the register returned `badAnchors: [] violations: []`. That is **C-13's own class** — *"an unwired gate cannot fail"* — reproduced inside the detector that scopes C-13.]** **[⊕²⁷ 2026-08-04 · ROUND-3 cure #2 — CURE #2 STRIPPED COMMENTS FROM THE INLINE `run:` FORM ONLY, so C-13's class simply relocated into the standard multi-line Actions idiom: `yamlRunValues` pushed block-scalar body lines **verbatim**, and a `#`-commented command inside `run: \|` still resolved the anchor. **Probe, same planted bytes through both scripts:** both `ci.yml` pixel-floor commands relocated into `run: \|` with a single `# npm -w tests-visual run gate:pixel-floor:ci` body line — **PRE-CURE** `violations:0`, `badAnchors=[]`; **POST-CURE** `violations:1`, `badAnchors=[external.browser.blob-floor -> .github/workflows/ci.yml#pixel-floor]`. Cured with **one rule for both forms** — `stripShellComment`, matching `liveCommandText`'s shell branch verbatim — and it also fixes the narrower inline bug it inherited (the old expression stripped only a ` #`, so a line-leading `#` survived). One bite.]** Plus **#9's supplemental anchors** (§3.1 below).
5. **seat bijection, against the AUTHORITY** — §B.5 is parsed (heading · family table · sum line, all three required to agree), `SEAT-BINDING.json` holds exactly 60 rows, its `familyCounts` and the rows' own tally both match §B.5, and **every claimed binding is verified against the LIVE bytes of its file** — a live string literal (a `describe(`/`it(` title or a thrown/reported message) or an exported identifier, never a comment. ~~(verified against the file)~~ **[2026-08-03 cure #3 — the seat side was a bare `includes`, so a seat named only in a header comment counted as bound; `G-GATE-BUDGET` itself was exactly that in `scripts/gate-register.mjs`.]** **[⊕²⁷ 2026-08-04 · ROUND-3 cure #3 — `nameIsLive` WAS BOUNDARY-BLIND, so the strictness cure #3 added could be walked straight around by a rename. `indexOf` matches a seat name inside a longer one, and `\b` does not save it: `-` is a **non-word** character, so `\bG-RUNG-ONLY\b` matches happily inside `XX-G-RUNG-ONLY-RETIRED`. **Probe, same planted bytes through both scripts:** every `G-RUNG-ONLY` in `tests/gates/trap-gates.test.ts` renamed to `XX-G-RUNG-ONLY-RETIRED` (2 occurrences before → **0** whole-name after, 2 substring after) — **PRE-CURE** `nameIsLive("G-RUNG-ONLY")` → **true**, register `violations:0`, a phantom binding to a seat nothing carries; **POST-CURE** `nameIsLive` → **false**, `violations:1`, `VIOLATION seat G-RUNG-ONLY: claimed bound to tests/gates/trap-gates.test.ts, but that file carries the name only in prose`. **This is not a hypothetical motion — it is §B.5's own add-one-retire-one**, performed name-first. Name characters are `[A-Za-z0-9_-]` because seat names are dash-joined; word boundaries are the wrong alphabet for them. Applied to the string-literal arm and to both export arms. One bite.]**
6. **drift equality** — the measured drift set must equal the declared one, exactly.

Non-zero exit on any violation. **No allowlist, no fallback, no skip.**

**One admitted form is broader than cure #3's parenthetical, and it is broader by measurement, not by convenience.** The cure names *"describe/it title or exported identifier"*; the two script-side seats (`G-PACK-INSTALL`, `G-NO-ORPHAN-EXPORT`) carry their names in thrown `Error` strings in `scripts/verify-export-types.mjs`, which are live code a runner emits, not prose. The rule implemented is therefore **live string literal or exported identifier**. Narrowing it to titles alone would have moved `bound:7`→`5` by fiat rather than by measurement — the J-10 disease in miniature.

### 3.1 · #9's SUPPLEMENTAL ANCHORS — the bare-path half of cure #2, measured and routed

C19 anchors four enrollment edges as **bare paths** (`scripts/release.sh`, `tsconfig.test.json`, and both workflow files), so they resolve on `existsSync` alone: gut every command in `release.sh` and the register stays green. **C19 is sha-pinned and #9 may not edit it**, so the missing fragments are measured in `SEAT-BINDING.supplementalAnchors` and **routed to #65** for the successor cut. Six, all resolving today, each falsifiable:

| row | supplemental anchor | what it binds |
|---|---|---|
| `external.package.export-resolution` | `scripts/release.sh#verify:package` | `release.sh:35` |
| `external.package.export-resolution` | `.github/workflows/release.yml#verify:package` | `release.yml:42` |
| `external.types.*` (all 8, identical enrollment) | `.github/workflows/ci.yml#typecheck` | `ci.yml:21` |
| `external.types.*` | `.github/workflows/release.yml#typecheck` | `release.yml:38` |
| `external.types.*` | `tsconfig.test.json#tests/` | the `include` that makes the 8 `.test-d.ts` rows typecheck at all |
| `external.browser.aurora-floor` | `scripts/release.sh#gate:pixel-floor` | `release.sh:45-46` — the aurora floor's release edge, now falsifiable |

**These can only ADD violations.** There is no allowlist in this file and none may ever be added.

**Deliberately absent** (the apparatus the abrogation mandate names): no `governedInvariant` wrapper, no `vitest.governed-setup.mjs`, no `package.json` script chain, no 48-registration migration across 28 files. Verified: `grep -rn "governedInvariant" src demo tests scripts vitest.config.ts package.json` → **2 hits, both prose in this row's own files explaining why the apparatus stayed quarantined.** Zero code.

~~**Detector strengthened this seat.** The inherited draft matched the roster title as a bare quoted string anywhere in the file … Now the `it(`/`test(` **call form** is required … it closed a false-pass hole at zero cost.~~ **[2026-08-03 cure round — STRUCK AS OVERSTATED, and the overstatement is the sharpest thing the adjudication found.** The "call form" it shipped admitted `.skip` and `.todo` and never stripped comments, so the four forms anyone actually uses to disable a test — `it.skip(`, `it.todo(`, `// it(`, `/* it( */` — all still scored **BOUND** against a real rostered row. The bite that "proved" it picked the one demotion form (`// see "TITLE" — retired`) nobody uses. **The hole was described as closed while it was open.**]**

**Detector strengthened at the CURE round, proved against the pre-cure bytes.** The probe re-runs each severance through the cured matcher and through the pre-cure `CALL_FORM` verbatim:

| severance | title text still in file | PRE-CURE | CURED |
|---|---|---|---|
| `it.skip(` | yes | **BOUND** | **ABSENT → drift** |
| `it.todo(` | yes | **BOUND** | **ABSENT → drift** |
| `// it(` | yes | **BOUND** | **ABSENT → drift** |
| `/* it( */` | yes | **BOUND** | **ABSENT → drift** |
| all 4 pixel-floor run steps deleted from `ci.yml` (word survives in the `:57` comment) | yes | `violations: 0` | **anchor unresolved → RED** |
| both `gate:pixel-floor` commands deleted from `release.sh` | yes | `violations: 0` | **supplemental anchor unresolved → RED** |
| a seat name demoted to comment-only (`trap-gates.test.ts` describe title) | yes | **BOUND** | **"only in prose" → RED ×2** |
| `\| MOTION \| 4 \|` → `5` at §B.5 | — | invisible (authority never read) | **family mismatch → RED** |
| **[⊕²⁷ R3]** `describe(` → `describe.skip(` over a rostered file | yes | **BOUND** — `drift:1 violations:0` | **both rows ABSENT → `drift:3 violations:1`** |
| **[⊕²⁷ R3]** the same as `describe.todo(` / `describe.skipIf(true)(` | yes | **BOUND** — `drift:1 violations:0` | **both rows ABSENT → `drift:3 violations:1`** |
| **[⊕²⁷ R3]** a live `it.only(` on one rostered row | yes | **BOTH BOUND** — `drift:1 violations:0` | **the `.only` case bound, its sibling ABSENT → `drift:2 violations:1`** |
| **[⊕²⁷ R3]** both `ci.yml` pixel-floor commands moved into `run: \|` and `#`-commented | yes | `violations:0`, `badAnchors:[]` | **anchor unresolved → `violations:1`** |
| **[⊕²⁷ R3]** every `G-RUNG-ONLY` renamed to `XX-G-RUNG-ONLY-RETIRED` | as a substring | **BOUND** — `nameIsLive` **true**, `violations:0` | **`nameIsLive` false → "only in prose" RED** |

Victim row for the registration severances: `token.graph.published-names-backed` @ `tests/styles/token-graph.test.ts` — a real rostered row, chosen because it is registered as a plain `it("…")`. **Every figure held unchanged under the tightening** (7 / 2 / 51 / drift 1): the holes were real and nothing was standing in them.

~~**The bites — 13**~~ **The bites — 17** **[⊕²⁷ 2026-08-04 · ROUND 3: +4, items 14-17]** (in-memory io overrides, zero disk writes):
1. mutated roster byte → sha pin REDs
2. stale `counts` object → recomputation REDs
3. severed `it(` title → undeclared-drift REDs
4. a rostered title demoted to a COMMENT → drifts
5. **`it.skip(`'d registration → ABSENT, drifts** *(cure #1)*
6. **`// it(`-commented registration → ABSENT, drifts** *(cure #1)*
7. **gutted `ci.yml` run steps → enrollment anchor unresolved** *(cure #2)*
8. **gutted `release.sh` commands → supplemental anchor unresolved** *(cure #2)*
9. **a seat name surviving only in a comment → REDs** *(cure #3)*
10. **a §B.5 family movement → REDs Figure A against its authority** *(cure #3)*
11. seat claiming a binding its file does not carry → REDs
12. seat register ≠ 60 rows → budget REDs
13. missing external enrollment anchor → REDs
14. **a `describe.skip(` / `.todo(` / `.skipIf(true)(` block over a rostered file → every row beneath it ABSENT, drifts** *(⊕²⁷ cure #1; one bite, three modifiers)*
15. **a live `it.only(` → its rostered siblings ABSENT, itself still bound** *(⊕²⁷ cure #1)*
16. **a `#`-commented command inside a `run: \|` block scalar → enrollment anchor unresolved** *(⊕²⁷ cure #2)*
17. **an EMBEDDING seat rename (`XX-…-RETIRED`) → "only in prose" REDs instead of binding** *(⊕²⁷ cure #3)*

**Every one of 14-17 is born-RED against the pre-cure bytes and green against the cured ones** — the pre-cure/cured cells are the last five rows of the severance table above, and each was re-derived by running the **same planted mutation through `git show e2b7a0b5:scripts/gate-register.mjs` and the working-tree script in one process**. A bite that cannot name the form it forbids is the hollow class this tranche abrogated; these name theirs, and quote its pre-cure output. **Census, so the closures are not sold as more than they are: 0 `.skip`/`.todo`/`.only`/`.skipIf`/`.runIf` modifiers stand in any rostered `sourcePath` at this pin.** Detector, verbatim: `/(^\|[^.\w$])(describe\|suite\|it\|test)\.(skip\|todo\|only\|skipIf\|runIf)\b/g` matched against the **raw** bytes (comments included, so the census cannot under-count) of the **28** distinct `sourcePath`s in `GATE-SEMANTIC-ROSTER-C19.activeVitest` → **0 occurrences**. The register line is unmoved (`drift:1 violations:0`), which is again the point: the holes were real and nothing was standing in them.

~~**16 collected cases** in `gate-register.test.ts` (struck: 9), 22 across the row's two gate files.~~ **[⊕²⁷ 2026-08-04 · ROUND-3 — re-measured, and the strike annotated per cure #9. `gate-register.test.ts` → **20 collected cases**, `trap-gates.test.ts` → **6**, **26 across the row's two gate files** (detector: `npx vitest list <file> \| wc -l`, corroborated `grep -cE '^\s+it\(' <file>`; both agree exactly, 20 and 6). The parenthetical `~~9~~` names the `6cf8eb51` count and **that figure was itself false — the true pre-cure count is 10** (`git show 6cf8eb51:tests/gates/gate-register.test.ts \| grep -cE '^\s+it\('` → 10). Struck, annotated, not renumbered.]**

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
- The **pixel-floor pair IS enrolled**, both edges live: ~~`.github/workflows/ci.yml:57,59`~~ **`.github/workflows/ci.yml:59,61`** **[⊕²⁷ 2026-08-04 · ROUND-3 cure #7 — `:57` was the WRONG line and the wrongest possible one: it is the **prose comment §12 act 3 convicts** (*"It runs pre-tag on real hardware — see release.yml `pixel-floor-gpu`"*, a citation to a job that does not exist). Citing it as a live enrollment edge put §5 in direct contradiction with §10's Y-6 row and §12's act 3 inside one document. Detector, verbatim: `grep -n 'pixel-floor' .github/workflows/ci.yml` → `38:    pixel-floor:` (the job) · `57:            # It runs pre-tag …` (the comment) · **`59:              run: npm -w tests-visual run gate:pixel-floor:ci`** · **`61:              run: npm -w tests-visual run gate:pixel-floor:ci:planted`** · `66:                  name: pixel-floor-pi-reports` (an artifact name). The two live `run:` steps are `:59` and `:61`.]** → `gate:pixel-floor:ci{,:planted}`; `scripts/release.sh:45-46` → `gate:pixel-floor{,:planted}`. All 11 C19 `externalEnforcement` rows resolve ⊘ (detector: `gate-register.mjs` check 3).

**Correction: C-13 scopes to the ~172 unenrolled specs, not to the suite.** Those have no CI or release edge and remain unwired — **ABSENT**, in the §0 word.

~~That remainder is C-13's own lane (#66's close battery), not this row's.~~ **[2026-08-03 cure #9 — THE ROUTING IS WITHDRAWN. It was the terminal-reflect funnel (Z-1), performed by the row that owns deleting it: #66 IS the close row, C-13 is *blocking at* #66 (`gates/ROSTER.md:39`, `PLAN.md:110`, cursor `:502`), and this row's own title carries "+C-13 wiring". Deferring the largest payload into the close wave — and into the row it blocks — is circular, and it is the exact mechanism Z-1 convicts.]**

**Re-grounded (§11 authors the law; §12 schedules the act):** the ~172 unenrolled specs are **wire-or-delete work at the wave grain**, scheduled **before Φ7**, on a seat with the `tests-visual/**` + `.github/**` wall this seat does not have. Not deferred to a close battery — there is no close-wave to defer to.

---

## 6 · THE NINE RECOVERED ARTIFACTS — ADJUDICATED

`docs/tranches/BK/recovery/2026-07-28-governance-stash/` — all 9 git-tracked (SE-1 loss repaired). Stash message states the owner-ratified boundary verbatim: *"REJECTED-WITH-SALVAGE (owner-ratified; salvage lands at Phi0 row 1: 3 detector conversions + 3 hardened bodies, annotation-stripped)."* Five of those six already landed by another route; the class is **REJECTED-WITH-SALVAGE — adjudicate, never wholesale**.

| # | artifact | verdict | grounds |
|---|---|---|---|
| 1 | `scripts_verify-governed-invariants.mjs` (581 L) | **QUARANTINE file · SALVAGE 4 checks** | Run from the recovery path: **57 violations, exit 1** (3 missing files · 48 × "must resolve exactly once; found 0" · 6 enrollment); external edges 11/11 pass. Green costs 3 new files + 6 enrollment edits + a 48-registration migration across 28 files with frozen title strings and sha-pinned ordered-id digests — an apparatus whose headline figure is *still* read off a JSON. Its four load-bearing checks re-derive slim and **are** §3 — **[cure #3: three of the four carry their own weight; the counts recomputation is dominated by the sha pin and is kept as declared defense-in-depth, §3 item 2]**. |
| 2 | `tests_governance_governedInvariant.ts` | **QUARANTINE** | Pure pass-through (`void id; void metadata; return it(title, handler)`). Zero runtime strength; a grep anchor only. 47/48 rows bind by title at HEAD at zero source cost. |
| 3 | `vitest.governed-setup.mjs` | **QUARANTINE** | Only runs #1 on every collect. Replaced by one vitest gate test. |
| 4 | `tests_governance_chipListener.setup.ts` | **QUARANTINE (hard)** | Rewrites `addEventListener`/`removeEventListener` on their prototype-chain owners from a *setup* file, keeps a global ledger, ships a `runFixedDecoyMutation()` that proves the ledger proves itself. Zero consumers. Detector-for-the-detector class. Its subject already executes at `chip.contract.test.ts:142`. Corroborated ⊘: `vitest.config.ts` has one project, `setupFiles: ["./tests/setup.ts"]` — **no `chip-listener` project survives**, so the quarantine holds structurally. |
| 5 | `tests_governance_fixtures_captureEventMethod.ts` | **QUARANTINE** | Sole consumer is #4; dies with it. |
| 6 | `tests_composables_glass_supportsBackdropRefract.test.ts` | **QUARANTINE — subject dead** | `src/composables/glass/supportsBackdropRefract.ts` deleted at `82bdc93e` "fix(BK/Φ0): delete the refract runtime latch" (verified ⊘: file absent, commit present). The spec cannot resolve its import; re-landing resurrects a latch BK deliberately killed (no-backwards-compat). Its two born-REDs recorded **DISCHARGED-BY-DELETION**. |
| 7 | `tests_styles_tokenGraphDetector.ts` (~430 L) | **QUARANTINE file · ROUTE the merit out** | The blindness is real — `tests/styles/token-graph.test.ts:31-33` scans `/\[(--[\w-]+):/g` over raw concatenated source **with comments intact**, so a token named only in a `//` comment counts as defined: G-MUTATION-BITE's **+DETECTOR-BLIND** arm exactly. But the cure ships compiler-sfc + typescript + postcss AST machinery plus a frozen 7-file carrier census with per-branch mount harnesses — overfit to one token family, RED on any legitimate carrier move, single-consumer with no export (fails the ≥2-site law). **Routed to the G-MUTATION-BITE owner** as a ≤20-line in-place cure (strip comments before the arbitrary-property scan; require the hit's file to be in the reach set) + one self-test bite. **Row #9 owns the register, not the token graph.** |
| 8 | `card-raw.json` | **STAYS QUARANTINED** — HOLD-FOR-OWNER | One-shot browser capture; evidence, not detector. Hold conditioned on the UNSTARTED #22 frost ruling. Tracked inside the recovery dir, so the loss is repaired. **Must not be restored to the repo root** — a root copy is the evidence-at-root defect G-NO-EVIDENCE-COMMIT names. |
| 9 | `motion-probe.json` | **STAYS QUARANTINED** — same grounds | `/foundations/motion` capture. #77 W-MOMENTUM-CENSUS evidence (`evidence_state=owed` there), routed to #10. Cite from #77; do not restore to root. |

**The one body that genuinely re-lands** — `tests/components/chip.contract.test.ts:142`, *"does not retain stale pressed semantics when mode changes"*. The stash body carried ~20 lines of real strength under a ledger prologue: the mode-transition case mounted with **hostile caller attrs** (`role`, `tabindex`, `aria-pressed="true"`, `data-state="caller-state"`, `onClick`) proved non-authoritative across selectable→action→static, plus `role`/`tabindex` clearing on static and the pre-transition selectable assertions. HEAD's prior body never tested component-owns-semantics-against-consumer. **Landed annotation-stripped**: ledger prologue, `positiveTrace`, `captureEventMethod` and the `loadChip()` lazy-import indirection (which existed *only* so the ledger could install pre-import) all gone — verified ⊘, zero residue. Title unchanged, so the C19 binding stays green.

**Net: 0 of 9 files re-land as files · 4 verifier checks re-derive slim (§3 — three independent, one declared-dominated) · 1 hardened body re-lands annotation-stripped · 1 merit routes out.** **[cure round: +2 checks this row authored that the recovered runner never had — the §B.5 authority parse and the structural enrollment resolver; six checks total.]**

Recovery dir untouched: `git status --porcelain docs/tranches/BK/recovery/` → **clean**.

---

## 7 · ROUTED OUT OF THIS ROW

| item | owner |
|---|---|
| the 51 **ABSENT** seat names — strike or name-the-executable, per row, **carrying §2.3's caveat** (≥5 have live detectors under other titles; 17 more gate files are in neither register) | **#65** (owns §B.5) |
| the `reka.tags-input.value-binding` roster drift + any C19 successor cut | **#65** |
| **`remaining:7` — the cross-register subtraction** `SEAT_BUDGET(60, doc) − worstCase(53, code)`. §2.1 proves the two populations share **zero** identifiers, yet C19 declares `authority.maximumCountedSeats: 60`. Two disjoint sets charged against one ceiling: **a ruling is owed before either figure is quoted again** | **#65** |
| **C19's dead `authority.canonicalBinding: "governedInvariant" / mode: "enabled"`** — that machine is exactly what this row quarantined (0 of 9 re-landed). A pinned roster asserting an enabled binding that does not exist is a live doc-truth defect; the successor cut is where it dies | **#65** |
| **#9's six supplemental enrollment anchors** (§3.1) — fold into the C19 successor so the bare-path anchors stop resolving on `existsSync` | **#65** |
| `tokenGraphDetector`'s comment-blindness merit, as a ≤20-line in-place cure | **G-MUTATION-BITE / +DETECTOR-BLIND owner** |
| `card-raw.json` | **#22** (owner-held, UNSTARTED) |
| `motion-probe.json` | **#77 / #10** |
| ~~the ~172 unenrolled visual specs~~ ~~**C-13's lane (#66 close battery)**~~ **[2026-08-03 cure #9: WITHDRAWN — the terminal-reflect funnel. Re-grounded at §12: wire-or-delete on a `tests-visual/**` + `.github/**` seat, scheduled BEFORE Φ7, at the wave grain]** | **the E-9/Y-6 act seat (§12)**, not #66 |
| **L-12 — the doc-canon seam with zero importers** (§10). ~~Z-5's disposition names **both** owners~~ **[⊕²⁷ 2026-08-04 · cure #11 — true of **Z-5** (`REGISTRY.md:408`, both owners) but **not** of L-12's own row (`:341`, `W-GATE-TRUTH` alone, quoted verbatim at §10); `:408` supersedes `:341` on the record. State re-scored **LIVE — named owner + scheduled act**, never the minted "ROUTED"]**; the constant-diff gate is a `G-DOC-TRUTH` arm (seats +0) and #61 holds the canon | **#61 W-DOC-TRUTH** (act at **Φ6**, `EXECUTION-PROGRESS.md:507`), co-owned with this row (§10) |
| **#15 PROVENANCE — `G-STAMP-EMITTED`.** Its cursor cell (~~`EXECUTION-PROGRESS.md:410`~~ **`EXECUTION-PROGRESS.md:427`** **[⊕²⁷ 2026-08-04 · ROUND-3 cure #8 — `:410` did not resolve; it lands in the Φ1 table's tail / the `## Φ2` header region. Detector, verbatim: `grep -n 'STAMP-EMITTED' docs/tranches/BK/EXECUTION-PROGRESS.md` → a single hit, **`427`**, which is row #15's cell and carries the quoted text. Inherited verbatim from `ADJUDICATION.json` cure #10 — a shared error is still an unresolvable citation, and §11's law binds the citation, not its author.]**) reads *"STAMP-EMITTED half stays unarmed under ⊕¹³ᵃ (**#9/#65 apparatus**)"* — a **SEALED** row waiting on an apparatus that shipped without naming it. **The apparatus is `scripts/gate-register.mjs` at `6cf8eb51`**: a committed, importable, io-injectable verifier whose output line is machine-emitted, which is the substrate a close stamp needs. ⊕¹³ᵃ no longer blocks #15's arming | **#15** (hand-off stated here so the route resolves at both ends) |
| `dist-demo` staleness (boot-graph RED) | ~~the lane holding the 19:09 `demo/`+`src/` edit~~ **[cure round: the lane holding the 03:44:28Z `src/composables/glass/**` + `src/styles/glass/**` writes — the latch FLAPPED green→red inside this seat's own measurement window (§1.2); one `npm run demo:dist:build` in that lane clears it]** |
| the `router-field-ownership` cold-transform flake + the `music-staff.contract` TS2322 | the demo lane / the row-91 lane (§1.2) |
| the trap-arm census scope: `censusTrapViolations` walks `src/` only, so `demo/`'s 175 SFCs are unwatched (2 prose `:global(` mentions today, no live violation) | **this row's arm at its next touch** — recorded, not silently widened: widening the census past the cure set is scope the cure round did not carry |
| CWT-3 §5 residue: 55 lane-minted born-RED = close-battery class · easing 11→≤7 · credits banked | recorded; the classification is §B.5's law, unchanged by this row |

---

## 8 · ACCEPTANCE — measured

| # | check | result at ~~the CURE round (HEAD `85915b2d`)~~ **[⊕²⁷ 2026-08-04] ROUND 3 (HEAD `e2b7a0b5` + this round's tree)** |
|---|---|---|
| 1 | `node scripts/gate-register.mjs` exits 0, prints one line | **PASS** — `seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:7 armOnly:2 unbound:51 drift:1 rosterSha256:dc05df91 violations:0`, exit 0. `unbound` prints its real number as **ABSENT** with the strike-or-name list routed to #65 (§2.3) — **never an allowlist**. **Declared change:** the figure line is now followed by the ⊕²⁵ vocabulary line and the routed drift, so the emitted receipt is 4 lines, not 1 — the count no longer travels without the word that governs it |
| 2 | the two new gate files green incl. every bite | **PASS** — 2 files, ~~**22 cases** (~~16~~)~~ **26 cases** **[⊕²⁷ 2026-08-04 · ROUND 3: +4 bites; `npx vitest run tests/gates/gate-register.test.ts tests/gates/trap-gates.test.ts` → **Test Files 2 passed (2) · Tests 26 passed (26)**]**, 0 failed |
| 3 | C19 sha unchanged | **PASS** — `dc05df9124024d721ce3a69dca297c237c965fa31921fbae6e0e46bb72257b52` |
| 4 | `governedInvariant` absent from code | **PASS** — 2 hits, both prose in this row's files |
| 5 | recovery dir clean, 9 files untouched | **PASS** — `git status --porcelain` empty |
| 6 | full suite, delta declared with cause | ~~**PASS with one foreign flake** — 209 files · **1,430 cases** · 1,428 pass · 1 expected-fail · 1 cold-transform flake (green 2/2 warm). This row adds **+2 files / +22 cases** in total (§3, §4), **+6 of them this round**; the rest is foreign~~ **[⊕²⁷ 2026-08-04 · ROUND 3 — re-derived HONESTLY, which means partly ABSENT. Collection re-run at this pin: **209 files / 1,449 cases** (`npx vitest list --filesOnly \| wc -l` · `npx vitest list \| wc -l`), delta **+19** from `85915b2d` = **+4 this row's** (the four round-3 bites) **+15 foreign**. **The pass/fail split was NOT re-run at this pin and is therefore NOT re-asserted** — under ⊕²⁵ it is **ABSENT at this seat's clock**, and the `1,428 pass` figure stands only at its `85915b2d` pin, labelled with it. What IS re-run: this row's two gate files, **2 files / 26 cases / 0 failed**. This row adds **+2 files / +26 cases** in total (§3, §4), **+4 of them this round**]** |
| 7 | both register figures each beside its detector, suite figure with its unit | **PASS** — §1, §2; Figure A now beside **its authority**, not its copy (§2, cure #3) |
| 8 | diff touches only `tests/**`, `scripts/gate-register.mjs`, `docs/tranches/BK/execution/2026-08-03-row9-register/**`; **zero `src/`** | **PASS** — §9. The cure round's own wall was narrower still: `scripts/gate-register.mjs` · `tests/gates/gate-register.test.ts` · `tests/gates/trap-gates.test.ts` · this directory. **Nothing else was touched, which is why cure #7 is UNDISCHARGED — see §10** **[⊕²⁷ 2026-08-04 · ROUND 3 — the round-2 adjudication ruled that refusal **CORRECT**: `tests/styles/**` and `tests/public-surface.spec.ts` sit outside the four-path wall, and a seat editing files it also certifies is the class this tranche abrogated. Cure #7 stays UNDISCHARGED **as the right answer**, not as a shortfall; E-6 and E-8 are scheduled at §12 act 4 with a named seat and a pre-Φ7 trigger. Round 3's wall is identical and was likewise not exceeded: `git diff --name-only` over this round → `scripts/gate-register.mjs` · `tests/gates/gate-register.test.ts` · this directory (`trap-gates.test.ts` in-wall, untouched)]** |

---

## 9 · THE DIFF

| path | state |
|---|---|
| `scripts/gate-register.mjs` | ~~new — the detector~~ **[⊕²⁷ 2026-08-04 · ROUND 3: committed `6cf8eb51` (265 L), round-2 cure landed `e2b7a0b5`; **round 3: 668 L** — the three matcher closures (block-level suppression by extent · one shell-comment rule for both `run:` forms · whole-name seat boundaries). `wc -l scripts/gate-register.mjs` → 668]** |
| `tests/gates/gate-register.test.ts` | committed `6cf8eb51`; ~~**cure round: 16 cases, 13 bites** (struck: 9 cases, 7 bites)~~ **[⊕²⁷ 2026-08-04 · ROUND 3: **20 cases, 17 bites** — +4 over round 2's 16/13. The struck `9 cases` was FALSE at its own pin (cure #9): `6cf8eb51` carries **10** cases (`git show 6cf8eb51:… \| grep -cE '^\s+it\('` → 10); the `7 bites` half of the same strike was correct. Round-2's 16/13 re-verified at `e2b7a0b5` by the same detector.]** |
| `tests/gates/trap-gates.test.ts` | committed `6cf8eb51` — the B4/B5 arms, 6 cases, 4 bites, seats +0. **Unchanged by the cure round** — **and unchanged by round 3** **[⊕²⁷ 2026-08-04: in-wall, deliberately untouched; it is the *victim* of the cure-#3 embedding-rename bite (planted in memory, never on disk), and a file that is both subject and instrument of the same bite may not also be edited by the seat writing it]** |
| `tests/components/chip.contract.test.ts` | edited at the impl round — the one salvage, annotation-stripped. **Outside the cure round's wall; untouched this round** |
| `docs/tranches/BK/execution/2026-08-03-row9-register/SEAT-BINDING.json` | committed `6cf8eb51`; **cure round: `supplementalAnchors` added (6 rows, §3.1) + the re-verification record re-stated under the strict matchers** |
| `docs/tranches/BK/execution/2026-08-03-row9-register/REGISTER.md` | this receipt — committed `6cf8eb51`, cured in place here (strike-in-place throughout; no history rewritten). **[⊕²⁷ 2026-08-04 · ROUND 3: ten further strike-in-place corrections — the false five-files provenance (#4) · E-8 re-scoped (#5) · three citations that did not resolve (#6 `DockLayerRail.a11y` path, #7 `ci.yml:57`→`:59,:61`, #8 `EXECUTION-PROGRESS:410`→`:427`) · the `~~9~~` strike itself false (#9) · the carried call-site figure re-measured (#10) · four states under a three-state declaration (#11) · the one-ended #10 hand-off (#12) · the seal-time re-pin (#13). **No prior text deleted; every correction rides beside what it corrects.**]** |

**Zero `src/` bytes.** `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/GATE-SEMANTIC-ROSTER-C19.json` unedited (sha verified). `docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md` **read but unedited** (Figure A's authority — parsed, never mutated). `docs/tranches/BK/recovery/` unedited. `package.json` and `vitest.config.ts` unedited — the new gates are reachable from `npm test` because they live under `tests/gates/`, which the existing include already covers.

---

## 10 · FAMILY E · Z-1 · Z-2 · L-12 · Y-2 · Y-6 — THE ROW'S FULL OWNERSHIP, ACCOUNTED

The spec of record is **`WAVES.md:259` — *"Owns: family E, Z-1, Z-2, L-12, Y-2, Y-6"*** — **seventeen findings**, not the five payloads the roster cell narrates. The first draft accounted for five and left twelve unnamed: no discharge, no strike, no route. Every one is dispositioned here, and the three states are exactly three: **DISCHARGED-HERE · DISCHARGED-ELSEWHERE (with citation) · LIVE (with named owner)**.

**[⊕²⁷ 2026-08-04 · ROUND-3 cure #11 — DECLARED THREE, SCORED FOUR. RESOLVED BY RE-SCORING, and here is why that is the honest half of the disjunction.** The table below scored **L-12 as "ROUTED, co-owned"** — a fourth state, minted in the same document whose §11 authors the law that *"the only admissible dispositions are discharged here, discharged elsewhere with a citation that resolves, or live with a named owner and a scheduled act."* The instrument could not classify its own finding.

**The two admissible fixes were: admit a fourth state, or re-score. Re-scoring is the honest one, on two grounds.** (1) *"ROUTED"* is not a disposition at all — it names a **hand-off**, and a hand-off is the *owner* half of `LIVE with a named owner`, never a state of its own; admitting it would have amended this row's own freshly-authored law to fit this row's own exception, which is the shape §11 exists to forbid. (2) The alternative fold — **DISCHARGED-ELSEWHERE — would have been false**: nothing discharged L-12. The seam still has zero importers at HEAD; no gate diffs documented constants against source anywhere in the tree.

**L-12 re-scored: LIVE — with a named owner AND a scheduled act**, which is the third state, unamended. Owner **#61 W-DOC-TRUTH**; act scheduled at **#61, Φ6** (cursor cell `EXECUTION-PROGRESS.md:507` — detector: `grep -n '^| 61 |' docs/tranches/BK/EXECUTION-PROGRESS.md`, reads `| 61 | W-DOC-TRUTH | Φ6 | UNSTARTED — INBOUND …`), a rostered wave with a Φ, which is a trigger of exactly the kind §12 uses for the E-9/Y-6 act seat. **Score corrected below. The declaration stands at three; the table now obeys it.**]**

| id | finding (abbreviated) | state | grounds / owner |
|---|---|---|---|
| **E-1** | the governed-gate apparatus exists only in the working tree | **DISCHARGED-HERE** | committed at **`6cf8eb51`** — the header table. The row re-instantiated E-1 while its own bytes were `??`; the commit ends it, and this round's bytes carry the same residue until the driver commits (stated, not hidden) |
| **E-2** | `npx vitest run tests/gates` RED at HEAD (2 failed / 60 passed), one a governed seat with a stale roster row | **DISCHARGED-HERE, with one foreign RED stated** | `tests/gates` → **53 cases, 52 pass, 1 fail** at `85915b2d` — the fail is `boot-graph`'s **flapping foreign staleness latch** (§1.2: green at 03:29Z, red at 03:45Z after another lane wrote five `src/**` files), never a gate defect. The stale roster row survives as the **one pinned drift** (§2.4), routed to #65 — recorded, never suppressed. The suite's remaining non-greens are §1.2's expected-fail (honest born-RED) and one foreign flake |
| **E-3** | `caseIdentity` — the anti-erosion device — is a static-vs-static compare with zero runtime binding | **DISCHARGED-ELSEWHERE** | `grep -rn caseIdentity src demo tests scripts` + the C19 roster → **0 hits repo-wide**. The device is gone; nothing to cure. Citation was all this needed |
| **E-4** | raw-regex-over-source gates cannot tell a live rule from a commented-out one; the orphan-CSS walker counts commented-out imports as live edges | **DISCHARGED-HERE (the register half)** + **DISCHARGED-ELSEWHERE (the CSS half)** | The register half was E-4 *in the detector itself* and is cured this round: comments are stripped before **every** match, roster-side and seat-side (§3, bites 5/6/9). The CSS half is `tests/gates/orphan-css-partial.test.ts:67` (`stripComments`, applied at `:103` before the `@import` walk) — see E-5 |
| **E-5** | CSS reachability has two mechanisms and every gate models one | **DISCHARGED-ELSEWHERE** | `tests/gates/orphan-css-partial.test.ts` models the **union** explicitly — *"(1) the transitive `@import` closure of the DECLARED CSS entry roots, and (2) a component reference — `<style src=` or a JS-side `import "./x.css"` — BUT ONLY FROM an SFC/module that is itself reachable from the public JS export entries"* (`:23-26`), with comments stripped first (`:67`, `:103`). Verified on disk; citation only |
| **E-6** | `placeholder-contrast.test.ts` is a contrast gate that computes no contrast | **LIVE** | `tests/styles/placeholder-contrast.test.ts:37-52` string-matches `color: var(--muted-foreground)` and the absence of `surface-tint`/`opacity`/`color-mix`; **zero luminance or ratio math in the file** — re-verified this round. The defect is the frozen-title/false-claim gap: either compute the resolved-token contrast ratio, or re-title to the mechanism-floor assertion the body actually makes. **Owner: the tests-lane act seat (§12)** — `tests/styles/**` is outside the cure round's wall |
| **E-7** | the "≤60 gates" collapse is a labelling change; the figure is a unit confusion | **DISCHARGED-HERE** | §1 — J-10 reconciled by **unit**, not averaged; canonical unit = collected cases; §B.5's classification law (governed seat vs unit case vs π obligation vs acceptance row) left unmoved |
| **E-8** | the only `./styles.css` manifest gate returns green when its artifact is absent | ~~**LIVE**~~ **[⊕²⁷ 2026-08-04 · ROUND-3 cure #5]** **LIVE — RE-SCOPED to a narrow coupling; the headline claim is FALSE at file grain and is struck** | ~~`tests/public-surface.spec.ts:539` … a **manifest-string compare with no existence check** … In §0's word: an **ABSENT** artifact reported as **PASS**.~~ **STRUCK. The artifact edge IS bound, in the same file, and the finding never opened it.** Detector, verbatim: `sed -n '690,740p' tests/public-surface.spec.ts` — `describe("Row 8 built-artifact acceptance")` at **:697** opens with `const built = existsSync("dist")` at **:698**, and `it("has a built dist/ to accept")` **hard-asserts** `expect(built, buildHint).toBe(true)` at **:703**; the shipped-CSS **set equality** at **:714-731** re-asserts `built` at `:715` and requires the shipped set to equal a closure that includes `"component-styles.css"` verbatim (**:727**), with `expect([...shipped].sort()).toEqual([...expected].sort())` at `:730`. With `dist/` absent the file emits **FAIL**, loudly, with the build command in the message — the anti-masking idiom, not a green. **The honest residue, and all of it:** `:539` is in a *different* `describe`, so its manifest-string compare carries no guard of its own — it is bound only by a **sibling's** existence assertion, and the coupling is undeclared. Move or weaken the built-artifact `describe` and `:539` silently becomes the original finding. **Cure: one line — assert the artifact where the string is asserted, or state the coupling in a comment. Owner: the tests-lane act seat (§12)** — `tests/public-surface.spec.ts` is outside this seat's four-path wall |
| **E-9** | 176 Playwright specs, exactly one reachable from any runner; 16 `_`-prefixed one-off captures | **LIVE — measured, scheduled, not executed** | §12. Census re-verified: **174 spec files, 14 `_`-prefixed**. Both halves need the `tests-visual/**` wall |
| **E-10** | the `light-dark()` inset-shadow recurrence is guarded by prose in 7 files and no detector | **DISCHARGED-HERE** | §4 — arm of G-RUNG-ONLY, seats +0, bites both directions, census 0 violations |
| **E-11** | both vitest projects run the whole suite; the chip-listener project's include is inert | **DISCHARGED-ELSEWHERE** | `vitest.config.ts` re-read this round: **one project**, one `include`, `setupFiles: ["./tests/setup.ts"]`, **no chip-listener project**. The split collapsed; citation only |
| **Z-1** | the terminal-reflect funnel — paint truth deferred to a close wave that never runs | **DISCHARGED-HERE (authored)** — §11 | and the row's own instance of it (the ~172 specs → #66) is **WITHDRAWN** at §5 |
| **Z-2** | gate-minting as the standard close remedy, then wholesale abrogation | **DISCHARGED-HERE** | the 60-seat budget is measured against **§B.5 itself** (cure #3), add-one-retire-one is intact, **seats +0 across this row** (both traps landed as ARMS), and the ABSENT list routes to #65 as **strike-or-name** — never an allowlist, never a mint. The counter-pressure Z-2 names ("drive the number to zero") is refused explicitly at §2.3 |
| **L-12** | the doc-canon enforcement seam has zero importers | ~~**ROUTED, co-owned**~~ **[⊕²⁷ 2026-08-04 · cure #11 — a minted fourth state, struck]** **LIVE — named owner + scheduled act** | **The sole-owner text, quoted verbatim because the row's own assignment is not what §10 claimed** — `REGISTRY.md:341` (`docs/tranches/BJ/addenda/2026-07-24-refinement/REGISTRY.md`): *"\| L-12 \| The doc-canon enforcement seam has **zero importers**. \| **BUILD** — `W-GATE-TRUTH`: one gate that diffs documented constants against source, or the docs stop stating constants. \|"* — **`W-GATE-TRUTH` alone.** The co-owner route rests on **Z-5** at the same file, `:408`: *"Owner: `W-DOC-TRUTH` (TR #61) + `W-GATE-TRUTH`"* — verbatim, and it **names both**, so the route is grounded; but `:341` names one, and `:341` is superseded by `:408` **here, on the record, rather than silently**. The constant-diff gate is an **arm of G-DOC-TRUTH (STORY/DOC), seats +0** — it lives where the canon lives, and **#61 owns the canon**; this row supplies the shape: *diff every constant `README`/`DESIGN.md`/`docs/canon` states against source, or the docs stop stating constants*. **State: LIVE at HEAD, measured not assumed** — the seam is `scripts/lib/canon-doc.mjs` (the `docs/canon/*` routing table, `:40-49`) and it still has **zero importers**: `grep -rn 'canon-doc' tests scripts src demo \| grep -v '^scripts/lib/canon-doc.mjs:'` → **0**. No constant-diff gate exists either: `grep -rln 'doc-canon\|docCanon\|G-DOC-TRUTH' tests scripts` → **0 files**. **Owner #61 W-DOC-TRUTH; act scheduled at #61, Φ6** (`EXECUTION-PROGRESS.md:507`, `UNSTARTED — INBOUND`). **A gate authored here would have been a doc-gate authored by the register lane, in a tree this seat is walled from** |
| **Y-2** | `W-GATE-COLLAPSE` is absent and its acceptance instrument was swapped for one that reports success without measuring | **DISCHARGED-HERE** | §1's ONE suite figure **is** the superseding instrument, and it measures: 209 files / 1,430 collected cases / 1,428 pass / 1 expected-fail, unit stated, re-derived by two independent commands. The swapped instrument reported success; this one reports a number a runner emitted |
| **Y-6** | gates authored by BAND-GATES W2/W3 are enrolled in no runner; **`ci.yml` cites a release job that does not exist** | **LIVE — cited, scheduled** | `.github/workflows/ci.yml:57` reads *"It runs pre-tag on real hardware — see release.yml `pixel-floor-gpu`"*; `grep -n pixel-floor .github/workflows/release.yml` → **0 hits**, re-verified this round. The real enrollment is `ci.yml`'s run steps + `release.sh:45-46`. **`.github/**` is outside this wall** — §12 |

~~**Score: 8 DISCHARGED-HERE · 4 DISCHARGED-ELSEWHERE · 1 ROUTED co-owned · 4 LIVE with a named owner and a scheduled act.**~~ **[⊕²⁷ 2026-08-04 · cure #11 — four states scored under a three-state declaration; re-scored, not re-declared.]** **Score: 8 DISCHARGED-HERE · 4 DISCHARGED-ELSEWHERE (with a citation that resolves) · 5 LIVE with a named owner and a scheduled act** — E-6 · E-8 (re-scoped, §0/§12) · E-9 · Y-6 · **L-12** (owner #61, act at Φ6). **17 total, three states, zero unaccounted, zero minted.**

---

## 11 · Z-1 — THE WAVE-GRAIN π LAW, AUTHORED

`REGISTRY.md:404` — Z-1, **DECIDED — BUILD**, owner `W-GATE-TRUTH`. It rode AW, AX, BA, BB *and is live at HEAD*. The law, authored at the row that owns it:

> **THE WAVE-GRAIN π LAW.** Paint truth is owed at the **wave** grain. **No wave closes without its own π/DELTA** — a captured artefact, at a named pin, with its detector stated. **There is no close-wave to defer to, because the close wave is deleted.** A row that routes its own paint obligation, wiring obligation or evidence obligation to a later close battery has not discharged it; it has re-instantiated the funnel. The only admissible dispositions are **discharged here**, **discharged elsewhere with a citation that resolves**, or **live with a named owner and a scheduled act**.

**Its corollary, which is the ⊕²⁵ vocabulary read backwards:** an obligation deferred to a wave that does not exist is **ABSENT**, and ABSENT is never GREEN.

~~**Handed to #10 (π-SUITE) as its protocol basis**~~ **[⊕²⁷ 2026-08-04 · ROUND-3 cure #12 — "Handed to" RESOLVES AT ONE END ONLY, and this row convicted that exact class at ⊕²⁵. Detector, verbatim: `grep -rn 'Z-1' docs/tranches/BK/execution/2026-08-03-row10-pi/` → **0** · `grep -rni 'wave.grain' …` → **0** · `grep -rn 'W-GATE-TRUTH\|row #9\|row-9' …/REGISTER.md` → **0**. #10's bank carries **zero trace** of this law: nothing was handed, because a hand-off with no receiving record is an assertion. The receiving dir is outside this seat's four-path wall, so the honest in-wall word is the offer, not the transfer.]** **OFFERED to #10 (π-SUITE) as its protocol basis — PENDING #10's CONSUMPTION.** The route resolves at this end only until #10 records it; **the receiving record of record is `docs/tranches/BK/execution/2026-08-03-row10-pi/REGISTER.md`**, and the route is closed when — and only when — that file cites this law. The DAG ground is unchanged: `W-GATE-TRUTH (ONE suite figure + detector) → C-13 → π-SUITE` (`TERMINAL-ROSTER.md:252`), and `REGISTRY.md:404` (`docs/tranches/BJ/addenda/2026-07-24-refinement/REGISTRY.md`, verified verbatim) names this row the owner with the disposition **DECIDED — BUILD**. #10 is **offered**: the ONE suite figure with its unit (§1), this law (every #10 receipt cites its port + build freshness *at the wave that owes it*, never at a close battery), and — via §12 — C-13's wire-or-delete act **scheduled before Φ7 rather than parked at #66**, so a Φ3 row is no longer standing behind a Φ7 row.

**The row's own instance, convicted and withdrawn:** §5's routing of the ~172 unenrolled specs to *"C-13's lane (#66 close battery)"* was the funnel, performed by the row that owns deleting it, and aggravated by this row's own title carrying *"+C-13 wiring"*. Withdrawn at §5, re-grounded at §12.

---

## 12 · E-9 + Y-6 — THE ACTS, RECORDED WITH A NAMED SEAT AND A TRIGGER

**Not executed here, and the reason is a wall, not a judgment.** `tests-visual/**` is not `tests/**`, `.github/**` is walled, and `tests/styles/**` + `tests/public-surface.spec.ts` sit outside the cure round's four-path wall (`scripts/gate-register.mjs` · `tests/gates/gate-register.test.ts` · `tests/gates/trap-gates.test.ts` · this directory). Per §11 the honest form is **live with a named owner and a scheduled act** — never a route into a close battery.

**THE ACT SEAT — "row #9 E-9/Y-6/E-6/E-8 act", driver-dispatched.** Wall: `tests-visual/**` · `.github/workflows/ci.yml` · `tests/styles/placeholder-contrast.test.ts` · `tests/public-surface.spec.ts`. **Trigger: before Φ7** — it is C-13's precondition and #66 may not be its home (§11). Four acts, each measured now so the seat inherits a census and not a search:

| # | act | measured at `85915b2d` | acceptance |
|---|---|---|---|
| 1 | **delete the 14 `_`-prefixed one-off capture specs** | `find tests-visual -name '*.spec.ts'` → **174**; `-name '_*.spec.ts'` → **14** | 160 specs remain; `_`-prefixed → 0 |
| 2 | **wire the Playwright suite to a runner, or delete it** per the WAVES spec | the pixel-floor pair is enrolled (`ci.yml` run steps + `release.sh:45-46`); the other **~172** have no CI or release edge — **ABSENT** | every surviving spec is reachable from a runner, or is gone. No third state |
| 3 | **fix `ci.yml:57`'s phantom citation (Y-6)** | the comment cites `release.yml` `pixel-floor-gpu`; `grep -n pixel-floor .github/workflows/release.yml` → **0 hits** | the comment points at the real enrollment — `ci.yml`'s own run steps + `scripts/release.sh:45-46` — or says the GPU floor is release-local and names where |
| 4 | **E-6 · E-8** (§10) | `placeholder-contrast.test.ts:37-52` computes no ratio; ~~`public-surface.spec.ts:539` compares a manifest string with no `existsSync`~~ **[⊕²⁷ 2026-08-04 · ROUND-3 cure #5 — re-measured: `:539` compares the string, and the SIBLING `describe` at `:697-731` hard-asserts `existsSync("dist")` at `:703` plus the shipped-CSS set equality (including `component-styles.css`) at `:714-731`]** | E-6: compute the resolved-token contrast ratio **or** re-title to the mechanism-floor assertion the body makes. ~~E-8: the `./styles.css` gate FAILS or reports **ABSENT** when `dist/component-styles.css` is absent~~ **[⊕²⁷ ROUND-3 — this acceptance is ALREADY MET and must say so: with `dist/` absent the file FAILS at `:703` and again at `:715`/`:730`, which is the stated condition. Re-worded, narrower: E-8's remaining act is to bind `:539`'s assertion to the artifact IN ITS OWN `describe` (or to state the sibling coupling in place), so the acceptance cannot be re-broken by a `describe` move. One line. The seat may also close it as ALREADY-MET-WITH-NOTE and record the coupling — both are admissible; what is not admissible is re-asserting the struck headline]** |

**Why these are not this seat's to take anyway:** a seat that edits the files it also certifies is the detector-for-the-detector class this tranche abrogated. The measurement is banked; the acts are walled; the seat is named; the trigger is dated. That is the wave-grain form.
