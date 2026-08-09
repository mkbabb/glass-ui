# BK #65 · W-GATE-COLLAPSE (Φ7) — RECORD

**MODEL ID: `claude-opus-5[1m]`** (Opus 5, 1M context). Asserted before the first byte, per the Opus-only fanout law.

**Date** 2026-08-08 · **HEAD at open** `4bb46eaad52118d4af08d8037fb55f9a23ec61c4` · **seat** IMPLEMENT.

---

## §0 · STEP-0 BASELINE, banked before any byte

| measure | value |
|---|---|
| baseline diff | `/tmp/bk-row65-baseline-1786246565.diff`, 164 lines, sha256 `16853a6d71eec0b1d600ba0c9ad88a08f4d5bd4c52fa830c0f9ad0bf05b86481` |
| porcelain | **13** |
| untracked (enumerated separately — `-U0` is blind to them) | **0** |
| HEAD | `4bb46eaa` |

Byte-identical to the scout's bank. The tree was unmoved between the two seats.

**Pre-move copies banked before ACT 3** (the #40 lesson: *"future re-homes BANK THE PRE-MOVE COPY"* — a `git diff --stat` restore is a corroboration, not a witness):

```
ed7dbcba38470262dcc4b31fbee26de3cc52caa3e30eb892bc7eecaa4e3ecdae  pager-dots.contract.test.ts.premove
8bcffd58d773af0aeea9f81c402c1bcd8c781fee41dc55e70e6186b46a9ac0fc  pager-dots.morph.test.ts.premove
```

Both re-measured at the new home AFTER the move: **byte-identical**. The move has a witness.

---

## §1 · THE RECEIPT — every figure that moved has an act above it

```
BEFORE  seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8  armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:0
AFTER   seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:15421032 violations:0
```

| field | move | the act |
|---|---|---|
| `drift` | 1 → **0** | ACT 1 — C20 adopts the HEAD title. The one figure the driver's fence names. |
| `bound` | 8 → **13** | ACT 2 — five cursor-named binds. |
| `unbound` | 50 → **45** | the same five. |
| `rosterSha256` | `dc05df91` → **`15421032`** | **BY CONSTRUCTION.** `rosterSha256` is `sha256(read(ROSTER_PATH))` (`gate-register.mjs:449-450`), so a successor cut moves it necessarily. The driver's *"every OTHER figure byte-identical"* is satisfiable only with this exception stated, and the scout flagged it before the first byte. **Not a defect.** |
| everything else | **unmoved, character-identical** | `seats` · `active` · `reserved` · `worstCase` · `remaining` · `external` · `armOnly` · `violations`. |

**Nothing minted. Budget exactly 60. Zero allowlists. Zero relaxed assertions.**

---

## §2 · THE THREE-`C` NAMESPACE COLLISION — recorded ONCE, renumbered NEVER

Three independent `C-nn` tables collide, and #65's own title draws from a different one than the cursor's prose. *(The two §B.7 cites below are `:389`/`:390` on disk — `:381`/`:382` are that table's C-1/C-2 rows, `track-well.css` and `material-roles.css`.)*

| key | table | subject | owner |
|---|---|---|---|
| C-9 | `COMPONENT-WAVES-TERMINAL.md:1112` §2 | `public-surface.spec.ts` + `surface.subpaths.exact` | W-GATE-COLLAPSE |
| C-10 | `COMPONENT-WAVES-TERMINAL.md:1113` §2 | the roster SHA | W-GATE-COLLAPSE |
| C-9 | `TERMINAL-ROSTER.md:389` §B.7 | `.glass-specular-track` | **#86 (+#80) — NOT #65's** |
| C-10 | `TERMINAL-ROSTER.md:390` §B.7 | subpath mints, *"all ten → #65/#66"* | #65/#66 |
| C-11 | `COMPONENT-WAVES-TERMINAL-3.md:1053` | export-set delta | discharged by RT-84E at `67b8f0e1` |
| C20 | `SEAT-BINDING.json:28` **at `4bb46eaa`** (`declaredTitleDrift[0].successorRecipe.preferredMechanism`), banked verbatim at `banked/declaredTitleDrift-at-4bb46eaa.json` | the successor roster FILE | #65 |

**RULING: the cursor's keys govern** — cursor **C-9 = the SHA pin**, cursor **C-10 = the export/binding batch**. Senior by recency, by volume (~20 committed blocks + `gates/ROSTER.md:55` + `SEAT-BINDING.json`), and by carrying three committed detectors. **Renumbering nothing: a re-key is a mint in bookkeeping clothes.**

**`C-20` IS A HYPHENATION DRIFT OF `C20`, not a third act.** **The figure states its detector, because the two detectors disagree.** `grep -rn "C-20" . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=2026-08-08-row65-gate-collapse` is a SUBSTRING match and returns **48** (`C-20` is a prefix of `C-200`-class ledger keys elsewhere); the word-bounded form `grep -rnw` over the same scope returns **THREE**: the cursor's two forward-looking procession sites (`EXECUTION-PROGRESS.md:3761`, `:4281`) **and a third, `docs/tranches/H/audit/W3-slider-glass-track-proof.md:154`** — tranche H's own ledger row `C-20` (the `EditorControlsDock` per-control sliders), **a FOURTH independent `C-nn` namespace that STRENGTHENS this section's collision record rather than weakening it**. Including this row's own record directory the same two detectors read **56** and **11**. What survives unchanged is the load-bearing half: **zero definitions exist under the hyphenated spelling**. The definition is `SEAT-BINDING.json:28` **at `4bb46eaa`** (`declaredTitleDrift[0].successorRecipe.preferredMechanism`, banked verbatim at `banked/declaredTitleDrift-at-4bb46eaa.json`), spelled `C20` — **the bare cite is false on the EXIT tree**, where ACT 1 consumed the recipe and `:28` now reads `"family": "RELEASE",`; the cursor itself spells it `C20` at `:3650`/`:3659`, and at `:4518`. The drift entered at `b2456d56` (⊕⁶⁶). Struck in place at both sites — the strike text is in `PASTE-BLOCKS.md` §3, since the cursor belongs to the annotation seat.

---

## §3 · THE ACTS

### ACT 1 — C-9 / C20: the ONE batched SHA pin · **EXECUTED**

**The path choice was the row's first ruling and it took the SUCCESSOR path, not in-place.** Grounds, measured:

- On C20, C19 stays **byte-frozen on disk** at `dc05df91…`, so all ~50 committed quotations of that digest remain TRUE *as statements about C19* — and **no strike-bracket is owed** at `TERMINAL-ROSTER.md:159` · `:188` · `:215` · `:333` (detector verbatim, `grep -n dc05df91 docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md` → those four lines and no others: **`:216` does not quote the digest and `:188` does**), at #68's `CANON.md:297/:301/:404`, or at `ADJUDICATION.md:16`. In-place would owe all seven.
- C20 is the only path that can carry a `sourcePath` move (ACT 3 needs one), because `SEAT-BINDING.json:28` **at `4bb46eaa`** (banked verbatim at `banked/declaredTitleDrift-at-4bb46eaa.json`) allows the two constants to move **exactly once**.

**New file** `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/GATE-SEMANTIC-ROSTER-C20.json`, **sha256 `154210323fa22cc061ca2c18394cd9bcf7e4465f0b29676c2866c28f10667411`**, **65,102 B** (C19: **68,741 B**) — `wc -c`, verbatim. *(The 65,081/68,722 first written here were CHARACTER counts, `len(read())` in the authoring script; the two files carry multi-byte UTF-8, so bytes exceed characters by 21 and 19 respectively. Bytes are stated as bytes.)*

C19 round-trips **byte-identically** at `json.dumps(indent=2)` — asserted in the authoring script before any transform — so every byte of difference is one of these **seven** acts and nothing else. Structural diff, re-measured at this seat over the two files' parsed trees: **56 delta entries, ZERO additions** — `enrollment` ×27 · `requiredCaseIdentity` deleted ×20 · `head` · `tree` · `supersedesRosterSha256` · `canonicalBinding` deleted · `mode` deleted · `maximumCountedSeats` deleted · `currentRegistration` · `sourcePath` · **`activeVitest[16].predicate`**:

1. **THREE `authority` keys DELETED OUTRIGHT, none added** — `canonicalBinding: "governedInvariant"` · `mode: "enabled"` · `maximumCountedSeats: 60`. The quarantined machine (0 of 9 re-landed) and the field that performed §C-1's illegal charge. Clean break, **no `mode: "disabled"` shim** — that would merely re-declare a machine that does not exist. Re-verified live before writing: `grep -rn 'canonicalBinding\|maximumCountedSeats' scripts/ tests/` → **0**, so nothing live regresses.
2. `authority.supersedesRosterSha256` → `dc05df91…` (was C18's `d29f851d…`, which C19 still carries on disk, so the lineage walks through the files themselves). `head`/`tree` → this row's.
3. **The ONE title repair** — `reka.tags-input.value-binding.currentRegistration` adopts the HEAD title verbatim. The executable was **not touched**, per the adjudication's own `doNot`: the ROSTER side drifted.
4. **RT-40-A's `sourcePath` move** — `pager.tabs.panel-linkage` → `tests/components/pager-dots/contract.test.ts`.
5. **RT-26B — `requiredCaseIdentity` STRUCK from all 20 rows that carried it.** See §4.
6. **#9's SIX supplemental anchors FOLDED** — 27 bare-path anchors replaced by their fragment-bearing form across 10 external rows. Replaced, not added beside: **the bare path IS the blindness**, and keeping it would leave the weaker anchor resolving on `existsSync` alone.
7. **`activeVitest[16].predicate` — RT-26B's predicate repair, counted here rather than disclosed only at §4(b).** `spring.mirror.gentle-critical` read *"The gentle preset remains exactly critically damped…"* → *"The critically damped register remains exactly critically damped … `world` since BK #26 retired `gentle`."* It is the SEVENTH delta class and the only one the original six did not cover; it raises no drift because `predicate` is not read by the register. **The count was six and the tree had seven** — stating the delta at six made this act look like it rode another's ticket.

**Files:** C20 (new) · `scripts/gate-register.mjs` (`ROSTER_PATH`, `PINNED_ROSTER_SHA256`, the violation message that named C19 by line, and four header comments this cut made false) · `SEAT-BINDING.json`.

### ACT 2 — C-10(a): the batched SEAT-BINDING pass · **EXECUTED, FIVE**

| RT | seat | executable (live `describe` title) | cursor cite |
|---|---|---|---|
| RT-32B | `G-TABS-SEAM` | `tests/gates/tabs-seam.test.ts:80` | `:4086`, `:4269` |
| RT-71B | `G-FEEDBACK-TINT-SEAM` | `tests/gates/feedback-tint-seam.test.ts:121` | `:3857`, `:4269` |
| RT-26A | `G-SPRING-HONEST` | `tests/styles/spring-authority.test.ts:64` | `:4504` (*"expect bound:8 → bound:10"*) |
| RT-26A | `G-SPRING-ONE-JOB` | `tests/styles/spring-authority.test.ts:125` | `:4504` |
| RT-27A | `G-ENGAGE-RUNG` | `tests/styles/engage-ladder.test.ts:130` | `:644` (*"BIND routed to #65 (RT-27A)"*) |

All five verified TRACKED and live at HEAD before writing. *(`engage-ladder.test.ts:357` is a COMMENT, not the executable — the live `describe("G-ENGAGE-RUNG — …")` is `:130`; `grep -n "describe(" tests/styles/engage-ladder.test.ts` → `130`/`170`/`218`/`313`/`399`, the last four all `· … arm` suffixes. The binding itself was always sound; only the cite was wrong.)* `SEAT-BINDING.json` only; no code, no mint, budget exactly 60 — the RT-7/PROPORTION precedent (*"this is a binding, not a movement"*).

**`G-SPRING-ONE-JOB` is bound to ONE path, not two.** `nameIsLive` also matches `tests/styles/feedback-motion.test.ts:202`, which is a close-battery **arm naming its seated host** — binding a seat to the arm that cites it is how a register inflates itself.

**SCOPE RULED AT FIVE, and the other fourteen refused with a measurement rather than an argument.** The scout offered 5 or up to 18 and asked for a scope word. Absent one, the five cursor-named routes are the charter; the rest are not routed to #65 by any cursor line, and binding them would be #65 improvising past its own act list. What IS banked is the measurement — the register's **own** `nameIsLive` over `git ls-files tests scripts`, all 50 unbound seats, reproduced independently at this seat:

```
19 of 50 already carry a live-name executable at HEAD.
  RELEASE   G-RELAY             -> tests/styles/dock-name-canon.test.ts        ⚠ wrong-family smell
  STRUCTURE G-OVERFIT           -> tests/gates/overfit-structure.test.ts
  MATERIAL  G-RADIUS-ROLE       -> tests/styles/radius-role-canon.test.ts
  MOTION    G-NO-FLASH          -> tests/styles/route-motion.test.ts
  A11Y      G-COARSE-TARGET     -> tests/components/a11y/coarse-target.test.ts + tests/styles/dissolve.test.ts  ⚠ two
  A11Y      G-CONTRAST-COMPUTED -> tests/styles/contrast-computed.test.ts
  A11Y      G-FOCUS-VISIBLE     -> tests/components/a11y/focus-visible.test.ts
  A11Y      G-KEY-SCOPE         -> tests/components/a11y/key-scope.test.ts
  LAYOUT    G1 no-H-overflow / G-MEASURE-LAW / G6 transposition-singleton / G-FORK-CENSUS
                                -> tests/styles/layout-canon.test.ts (all four)
  STORY/DOC G-ONE-NAME          -> tests/styles/dock-name-canon.test.ts
  SUBSTRATE AURORA              -> scripts/profile-bundle.mjs   ⛔ DEMONSTRATED FALSE POSITIVE
  (+ the five bound above)
```

**`AURORA` is the banked detector hole surfacing in the other direction** — a one-word seat name matching a bundle profiler. `nameIsLive` has no block-level suppression and no family scoping. **Therefore: no seat is bound on the scan alone**, and the remaining thirteen await a per-seat live-title read at their own seat. **Driving `unbound` to 0 by minting names is the forbidden class** (`gate-register.mjs:44-49`); the figure is reported, never chased.

### ACT 3 — C-10(b): RT-40-A, the pager test re-home · **EXECUTED**

`pager-dots.contract.test.ts` → `tests/components/pager-dots/contract.test.ts`; `pager-dots.morph.test.ts` → `.../morph.test.ts`. Three test homes now consistent (`carousel/` and `deck/` were already directory-homed). Both files import only through the `@glass/…` alias, so the depth change is inert. Plain `mv`, **nothing staged**. C20 carries the `sourcePath`.

### ACT 4 — C-10(c): the `dropdown-menu` → `menu` subpath act · **REFUSED AS SCOPED, RE-ROUTED WHOLE → RT-65-C**

**The tree contradicts the act list, so it is refused with grounds rather than improvised.** Three measurements:

1. **The spec is narrower than the act list.** `DAG-RULINGS.md:230` §4.4, verbatim: *"**`dropdown-menu` MOVE → `components/menu/`.** Same SFC names, one directory, `./menu` subpath, `./dropdown-menu` gone."* **SAME SFC NAMES** — so the act list's *"`src/index.ts` (37 `DropdownMenu*` occurrences)"* is not the act; only the import path moves.
2. **The act is a proper SUBSET of C-10's export cut, and the rest is marked in LIVE CODE.** C-10 keys as *"subpath mints \| **all ten** → #65/#66 \| **ONE** batched export-surface cut + **ONE** `public-surface.spec.ts` re-pin … no lane bumps the pin solo"*. Grepping the live tree for its own markers finds **six more key movements** the act list did not name:
   - `scripts/lib/subpath-policy.mjs:57` + `src/index.ts:306` — **`sheet` INTERNAL → `./sheet` mints**, *"rides the ONE batched export cut"*, routed **RT-38D → #65** at `tests/public-surface.spec.ts:201`.
   - `tests/public-surface.spec.ts:177-180` — **the four `./input` · `./textarea` · `./checkbox` · `./radio-group` mints and the `./forms` RETIREMENT** *"remain the ONE batched export-surface cut's (CWT-3 §2 C-10)"*.
   - `src/styles/glass/overlay-plate.css:112` — **the class-spelling namespace**: *"The class spellings keep the `dropdown` namespace until C-10's batched export cut renames the family (`./menu` mints there, with the four consumer MIGRATION tables)"* — 14 selectors in `overlay-plate.css`, `a11y-overrides.css:117`, the `data-slot` paint hooks, and 4 doc-truth sites.
   Executing one seventh of a cut whose own text says ONE is the half-state ⊕⁶⁴ forbids, and it would **spend the single `public-surface.spec.ts` re-pin that C-10 reserves for the whole batch.**
3. **It is outside the driver's verify contract for this row.** The standing verify names `vue-tsc` · `build` · `demo:dist:build` · the narrow battery · `gate-register` · `regen-exports`. It contains **no `public-surface.spec.ts` run and no MIGRATION duty** — and a seven-key export cut necessarily moves `public-surface`'s 83/83 and owes `MIGRATION.md` rows. The driver scoped #65 as a bookkeeping cut; #66 is *"CLOSE + 8.0.0 … the release path"* and already carries the MIGRATION-row duty (~~`TERMINAL-ROSTER.md:220`~~ [⊕⁷² 2026-08-09 · mis-cite, the CURE-65-5 class one seat late: **`:216`**, the #66 CLOSE row (“StatusDot MIGRATION rows”); `:220` is row 70's ARCHAEOLOGY/RECKONING intake]).

**RT-65-C — the full inventory is in §6 so #66 executes it in ONE act.** The cost is stated rather than hidden: see §6's *"the second pin"* note.

### ACT 5 — the two singleton routes

- **RT-32C · EXECUTED.** `useSelectionGroup.ts:52` carried `type SelectionValue = SelectionOption["value"]`, a local alias resolving to the canonical type but making the library's scalar identity read as two declarations — the #84 C-1 residue the widening existed to end. Deleted; the canonical name is imported from `../../../components/_shared/selection`, exactly as the sibling `useSelectionIndicator.ts:20` already reaches it. `vue-tsc` **0**.
- **RT-35B · PARKED WITH A NAMED OWNER, not annexed.** The eight-token `inherits: false` descendant-read cohort (`--specular-x/y` · `--specular-intensity` · `--veil-x/y` · `--flex-vel` · `--cast-travel` · `--cast-spread` · `--vap-saturate`). This is an **eight-token AUDIT and the #39 R2-class defect** — a registered non-inheriting scalar read on a grandchild computes `0` forever while a source-text gate passes. It cannot ride one pin, it owes paint per token, and it is the class that has shipped dead paint twice (#39's grip, #32's underline). **Owner: its own seat. Route: RT-65-D.**

### ACT 6 — RT-18A, the conditional · **RULED: PARK to #66, riding RT-65-C**

The scout was right that leaving it unruled is the class that stalls a close, so it is ruled explicitly. #18 refused the `tags-input` deletion because it would force the pin, *"reserved to band close"*. **The pin is spent here, so #18's stated blocker dissolves — and the deletion still does not belong in this commit**, on three measured grounds:

1. **It breaks the driver's fence on three figures.** Deleting the component deletes `tests/components/tags-input.contract.test.ts`, so C20 must drop the `tags-input.ime-delimiter-guard` active row: ~~`active` **48 → 47**, `worstCase` **53 → 52**, `remaining` **7 → 8**~~ [2026-08-09 · BK #66 CLOSE — **ONE SEAT SHORT, corrected by measurement at the cut**: the deletion kills **TWO** active rows, not one. `activeVitest[6] reka.tags-input.value-binding` (`tests/components/ui/reka-binding-idiom.test.ts`) mounts `TagsInput`/`TagsInputItem`/`TagsInputItemText` from the deleted directory — the case cannot compile and the seat loses its subject. The true movement is `active` **48 → 46**, `worstCase` **53 → 51**, `remaining` **7 → 9**, with `counts.baseProductTooling` 31 → 30, `counts.componentBehavior` 17 → 16 and BOTH `machineLaw.activeSemanticClassIdDigests` re-derived. The fence argument itself is UNTOUCHED and was correct — only its arithmetic was one row light.]. The driver's standing line permits `drift` and `bound`/`unbound` to move and nothing else. That fence is senior to a lane route from #18.
2. **It is release-path, not bookkeeping.** Measured at this HEAD: ~~exports **66 → 65**~~ [2026-08-09 · BK #66 CLOSE — **NOT REPRODUCIBLE, corrected at the cut**: `package.json.exports["./tags-input"]` did not exist and `COMPONENT_CLASS["tags-input"]` was `"INTERNAL"` (`scripts/lib/subpath-policy.mjs`), so RT-18A moves **ZERO** export keys. The landing count for the whole batched cut is **66 → 70** — −1 `./forms`, −1 `./dropdown-menu`, +4 form-component mints, +1 `./sheet`, +1 `./menu` — measured `exportKeys 70/70 · jsSubpaths 64 · drops 0 adds 0 · EXACT REPRODUCTION: YES`. The point of the item — that the deletion is release-path work and not bookkeeping — STANDS, and this cut is what proves it.], a `public-surface.spec.ts` row cut, a demo route + `manifest.ts:835` + `dock-layer-contexts.ts:272`, and **12 in-`src` CSS/token commentary sites** naming TagsInput as a live member of the control band (`ladder.css:223` · `control-edge.css:33` · `control-surfaces.css:4/:37/:71` · `radius.css:68/:84/:86` · `bridges.css:328` · `glass.css:322` · `scale-paper.css:67` · `_shared/field/control.css:4`). Plus a marked MIGRATION addendum per the consumer-updates ruling.
3. **#18's walk is four days and three landings stale.** *"0 consumers / 15 roots, g5 upheld"* was measured at #18's HEAD on 2026-08-05; RATIFICATION §1.1 wants the whole-repo 8-sibling walk at the cut, not before it.

It rides RT-65-C, where the export surface is spent once and the walk is fresh.

### Already discharged — the strike verified, not redone

**RT-84E LANDED at `67b8f0e1`** (`src/index.ts | 5 -----`; the three surviving `ToggleGroupItem`/`…Props`/`ToggleGroupProps` at `:375-377` are live and correct). Recorded in row 65's ⊕⁷¹ bracket — *"C-10 LOSES ONE ACT."* Nothing owed. This also discharges **C-11**.

---

## §4 · TWO FINDINGS THE ACT LIST DID NOT CARRY, both routed to #65 by name, both PAID

### (a) `requiredCaseIdentity` — dead data behind a live pin. **STRUCK, with its detector stated.**

The scout found that `requiredCaseIdentity` (`{count, keys, orderedKeysSha256}` on 20 active rows) is **never read** by `scripts/gate-register.mjs` — `grep -n requiredCaseIdentity scripts/gate-register.mjs` → **zero hits** — and called it *"the exact half of #65's own 'both figures ship with their detectors or neither ships' law that a citation is supposed to satisfy."* This seat measured **why no detector can be written**, which decides the disposition:

> The only machine that ever consumed the field is the **quarantined** `governedInvariant` wrapper. `docs/tranches/BK/recovery/2026-07-28-governance-stash/scripts_verify-governed-invariants.mjs:540-545` compares `row.requiredCaseIdentity` to `registration.caseIdentity` — **the wrapper's own declaration inside the test file**, i.e. a second copy of itself. It is **never** derived from the cases the runner executes.

So the field is duplicated derived data with no derivation recipe committed anywhere, verifiable only against a machine that is 0-of-9 re-landed. **It cannot be repaired, only removed** — the same clean break, on the same ground, as C20's three `authority` keys: *C20's `authority` declares only what a live machine reads.*

**And it is demonstrably dead, not merely unread.** Four spring rows carry `keys: [smooth, snappy, bouncy, gentle, dock, press, panel, orb-drop]` — **five of those eight are #26's graves.** `surface.subpaths.exact` carries `count: 48` against an export set that has since been 73 → 68 → 67 → 66.

### (b) RT-26B — routed to *"#65's ONE C-9 pin"* by name at cursor `:4504`, and carried in a LIVE source comment.

`tests/composables/motion/springTokenMirror.test.ts:90-98` says, in committed code: *"This case is `spring.mirror.gentle-critical` in the sha-PINNED C19 register, whose title, id and eight-name `requiredCaseIdentity` all still spell the retired roster … ROUTED: #65."* **Neither the prompt nor the act list enumerated it.** Both halves are paid here:

- the eight names die with the field (a);
- `spring.mirror.gentle-critical.predicate` is repaired — it read *"The gentle preset remains exactly critically damped"* while the body asserts `world` (#26 retired `gentle`). `predicate` is not read by the register, so the repair raises no drift.
- **The `id` and `currentRegistration` are deliberately LEFT** spelling `gentle`: re-titling is a drift this row would have to declare, and #26 held the title byte-identical on purpose. The comment is struck in place where this cut made it false, and states why the held half is still held.

---

## §5 · MUTATION BATTERY — 11/11 BITE

Run **pure over the injected io** (`verifyGateRegister(io)`), so every bite is severed **in memory**: no byte written to the shared tree, no restore owed, no restore to get wrong.

| # | bite | fires |
|---|---|---|
| 1 | one byte of C20 severed | `roster sha256 …` |
| 2 | the repaired title put BACK to stale in C20 | `title drift set moved` + `drift:1` |
| 3a-e | each of the five bound seat names struck from its own file | `seat <NAME>: claimed bound …` ×5 |
| 4 | `verify:package` gutted from `release.sh` | `enrollment anchor unresolved` |
| 5 | `tests/` dropped from `tsconfig.test.json` | **8 violations**, one per folded type row |
| 6 | a 61st seat pushed | `seat register holds 61 rows` |
| 7 | a bound seat pointed at a missing file | `bound to a missing file` |

**Bite 2 is the one that matters most**: an emptied drift set is the one state that can go vacuous-green, so the committed executable now re-proves the reverse direction on the repaired bytes rather than asserting emptiness and stopping.

### The three REDs this cut earned, and how each was AMENDED rather than relaxed

`tests/gates/gate-register.test.ts` — the seat's own executable — convicted the cut three times. Correct behaviour; the figures were pinned.

1. *"states both figures"* — `expected 13 to be 8`. **Re-pinned** to 13/2/45 with the five routes named in a dated bracket, the prior 8/50 struck in place beside RT-7's own.
2. *"holds the ONE roster drift"* — `expected [] to deeply equal [reka.tags-input.value-binding]`. **Re-authored, not emptied**: it now asserts `drift === []` AND `declaredTitleDrift === []` AND re-stales C20 in memory to prove the drift returns. Retitled *"holds the roster drift set…"*.
3. *"BITE — gutting release.sh's pixel-floor commands REDs the supplemental anchor"* — `expected false to be true`. **THE MECHANISM MOVED AND THE BITE FOLLOWED IT.** The anchors are in C20's `enrollment` now, so check 3 carries them, not check 6. Left alone this case would have gone **vacuous-green over an empty array** — the identical class #39 deleted the immersive-scrim describe over, and #55 struck the `watercolor-swatch` guard over. Re-pointed at `badAnchors` + the live `external external.browser.aurora-floor` message, and it additionally asserts `supplementalAnchors === []` so the old home cannot claim the bite.

**One case ADDED** (`tsconfig.test.json` → 8 REDs), an **arm** of the already-seated `G-GATE-BUDGET` in its existing file. **Seats +0, zero new test files.**

---

## §6 · ROUTES OUT

| id | subject | to | note |
|---|---|---|---|
| **RT-65-C** | **C-10's EXPORT-SURFACE half, WHOLE** | **#66** | ONE batched cut, ONE `public-surface.spec.ts` re-pin. Inventory: (i) `dropdown-menu` → `components/menu/`, same SFC names, `./menu` mints / `./dropdown-menu` dies, 3 tests → `tests/components/menu/`; (ii) `sheet` INTERNAL → PUBLISH (RT-38D); (iii) `./input` · `./textarea` · `./checkbox` · `./radio-group` mint, `./forms` retires; (iv) the `.dropdown-menu__*` class + `data-slot` namespace → `menu` (`overlay-plate.css` ×14, `a11y-overrides.css:117`, 4 doc sites); (v) **RT-18A** `tags-input` DELETED (fresh 15-root walk owed); (vi) the 4 consumer MIGRATION tables fire → **#76** (RT-89-F). |
| **RT-65-C′** | **the second pin, stated not hidden** | **#66** | RT-65-C moves source files under three C19/C20 rows (`behavior.dropdown.keyboard-roving-typeahead`, `external.types.dropdown-menu`, `tags-input.ime-delimiter-guard`), so it must re-cut the pin. **This is cheap and it is NOT a new roster file**: C20 is a BK-authored artefact quoted only in this record, so #66 edits **C20 in place** and re-cuts `PINNED_ROSTER_SHA256` once, striking this record's `15421032…` in place. The never-edit-in-place law was specific to C19 being quoted in three committed records outside #65's fence — C19 stays frozen forever and that law is permanently satisfied. |
| **RT-65-D** | RT-35B's eight-token `inherits: false` cohort | **its own seat** | an audit + a π cell per token, not a bookkeeping ride. #39 R2-class. |
| **RT-65-E** | `machineLaw.countedCeilingExpression` in C20 | **#66 / driver** | **MEASURED, NOT ACTED ON.** It reads `activeVitest + hardReservedVitest + conditionalReservedVitest <= 60` — §C-1's illegal charge restated outside the `authority` block that C-2 authorised deleting. Acting on it would be improvising past the banked recipe; leaving it unreported would make the three-key deletion look cosmetic. Note it is **not** load-bearing: `remainingSeats` is computed from `gate-register.mjs`'s own `SEAT_BUDGET`, never from the roster. |

**NOT #65's, verified and left alone:** `boot-graph` 63-vs-60 → **#66** (RT-40-C) · `emitted-utility-vars` → **#85** (RT-40-B) · TR §B.7's C-9 `.glass-specular-track` → **#86 (+#80)** · RT-32A/RT-71A → blocked, #22 CURE-CUT · RT-32D → #61 · RT-32E → driver · π everywhere → #10/#67. **#65 owns no browser seat and claims no paint.**

---

## §7 · THE FENCE — 13 → 24 porcelain (23 at the cut + CURE-65-7's one live-comment path), every added path attributed

**The 11 paths this row adds (10 at the cut + the cure pass's `tests/components/deck/contract.test.ts`, a 1/1 comment truth-up):**

| path | act |
|---|---|
| `docs/…/GATE-SEMANTIC-ROSTER-C20.json` *(new)* | ACT 1 |
| `docs/…/2026-08-03-row9-register/SEAT-BINDING.json` | ACT 1 + ACT 2 |
| `scripts/gate-register.mjs` | ACT 1 (2 constants + 1 message + 4 false header comments) |
| `tests/gates/gate-register.test.ts` | §5's three amendments + one added arm |
| `tests/components/pager-dots.contract.test.ts` → `pager-dots/contract.test.ts` | ACT 3 |
| `tests/components/pager-dots.morph.test.ts` → `pager-dots/morph.test.ts` | ACT 3 |
| `src/composables/motion/morph/useSelectionGroup.ts` | ACT 5 / RT-32C |
| `tests/composables/motion/springTokenMirror.test.ts` | §4(b) |
| `docs/…/2026-08-08-row65-gate-collapse/` *(new)* | this record + the banked drift witness |

**The 13 pre-existing paths, ruled per path on the HUNKS** (⊕⁷¹'s own lesson: *"the attribution is in the hunk, not in the filename"*). The scout's per-path rulings were re-read against the diff and **all thirteen are sustained**:

**TEN RIDE C-10 as one batched doc-truth act** — every one a dead-cite or dead-plural correction to committed text with a landed commit behind it; none changes emitted bytes; none needs a gate:
`configurator/styles.css` (`select.css` → `glass/overlay-plate.css`, #89/C-11's `bca22bd9`) · `handmark/HandMark.vue` + `handmark/texture.ts` (#55's *"two handmark provenance citations"*, component deleted at `62305f4a`) · `handmark/README.md` (self-signed `[2026-08-08 · BK #32]`, a correctly dated strike) · `procedural/color.glsl.ts` + `procedural/prng.ts` (#55's *"the prng + color.glsl docblocks"*, verbatim) · `glass/rim.css` (*"the timelines"* → *"the timeline"*; #46's 5→1 collapse at `9bc8d25f`) · `glass/surface-axis.css` (#32's doc-truth strike **plus** a dangling `CLAUDE.md` pointer — user-deleted 2026-07-13, never recreated) · `tests/styles/engage-ladder.test.ts` (`menuRowClass.ts` → `rowClass.ts`, landed `49c38506`) · `motion/core/index.ts` (already adjudicated at cursor `:4204-4206` as the timeline-rename class).

**TWO PARKED with a named owner** — neither is a truth-up: `foundations/typography.vue` (`span` is a LIVE prop, `StorySection.vue:33/40` — a layout choice → the story-layout lane) · `substrates/aurora.vue` (`heightClass` is LIVE on `VizStudio.vue:52/58/71` — deleting the binding is a substantive stage-height change → the aurora lane).

**ONE OUT OF SCOPE ENTIRELY** — `composables/dark/darkModeSyncScript.ts`, 36/1, the largest hunk: **a substantive public-API addition**, not a truth-up. Three new options (`defaultDark`, `queryOverride`, `normalize`), a widened `DarkModeSyncScriptOptions`, changed emitted-IIFE runtime bytes, and a capture-forcing `?light`/`?dark` seam. It owes a MIGRATION/CHANGELOG row, a born-RED gate and a π cell. **A bookkeeping pin cannot carry it.**

---

## §8 · STANDING VERIFY — verbatim, real exit codes, never a piped tail's

| command | measured | verdict |
|---|---|---|
| `npx vue-tsc --noEmit` | **exit 0**, zero output | GREEN — no regression from the rider batch |
| `npm run build` | **exit 0** · `declaration entries: projected 61 public entries` · `glass-ui:ready` | GREEN |
| `npm run demo:dist:build` | **exit 0** · `✓ built in 853ms` | GREEN |
| `npx vitest run tests/styles tests/components tests/gates` *(after both builds)* | exit 1 · `Test Files  2 failed \| 160 passed (162)` · `Tests  2 failed \| 1544 passed \| 5 expected fail (1551)` | **The FAILURE SET is byte-identical to standing** — `gate:boot-graph` (`63 modulepreloads … expected 63 to be less than or equal to 60`) → **#66**, and `emitted-utility-vars` (`expected '0s' to contain 'var(--duration-fast'`) → **#85**. Neither is #65's. `passed` moves 1543 → **1544** and the total 1550 → **1551**: that is §5's ONE added arm on an existing seat. **The failures only subtracted-or-held, as the fence requires; nothing new is red.** |
| `node scripts/gate-register.mjs` | **exit 0** · `seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:15421032 violations:0` | §1 — every moved figure has an act |
| `node scripts/regen-exports.mjs` | **exit 0** · `exportKeys 66/66  jsSubpaths=60  drops=0 adds=0 targetMismatch=0 tvDrops=0 tvAdds=0` · `>>> EXACT REPRODUCTION: YES` | **EXACT** — and it is exact *because* ACT 4 was refused; the export surface is untouched. |

**Both builds ran BEFORE the battery**, per ⊕⁶⁵'s standing rule that `boot-graph` is a function of the build and must be re-read after any rebuild.
