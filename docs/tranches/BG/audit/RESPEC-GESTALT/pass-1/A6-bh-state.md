# A6 — BH current state (lens of RESPEC-GESTALT pass 1)

**Scope:** census BH's band structure B0–B7, verify what has actually landed on disk vs. what the plan/cursor
claim, and map every pending BH wave's dependency on the (twice-folded) BG cursor. Evidence discipline: every
claim below is checked against `docs/tranches/BH/PLAN.md`, `docs/tranches/BH/audit/RESPEC-COHERENCE/AMENDED-BH-COHERENCE-PLAN.md`,
`docs/tranches/BG/execution/EXECUTION-PROGRESS.md`, `docs/tranches/BG/execution/bh-interleave-map.md`, and the
actual git history / working tree at HEAD `976dc890`.

---

## Verdict

BH is genuinely in the state its own docs claim: **12 of ~34 tracked cursor rows DONE, 22 PENDING**, all
concurrent-safe (non-file-colliding) bands executed cleanly with real gates on disk, and the two coherence-audit
folds (RESPEC-COHERENCE pass 2, `eaf2c172`) demonstrably propagated into **both** `PLAN.md` and the BG-tree
(`bh-interleave-map.md` + `EXECUTION-PROGRESS.md`) — this is one of the few multi-tranche cross-references in the
whole corpus that actually holds up byte-for-byte when checked on disk. That said, I found **one real drift that
survived both coherence passes**: two EXECUTION-PROGRESS rows (18.11, 19.2) still carry the pre-fold "2 by-name
asks" / bare-`rg` gate-form literals that the coherence plan explicitly ordered swapped to "4-ask" /
`proof:claude-deletable`, while the sibling `PLAN.md` and `bh-interleave-map.md` copies were correctly updated.
This is a **live, unresolved fold-symmetry gap**, not a hypothetical one — a future agent reading the cursor table
in isolation (its designed use case) will act on stale counts. The dependency skeleton is otherwise sound: BH's
22 PENDING waves gate on 6 distinct BG waypoints (WS2, WS3, WS4, WS5, WS12-full-close), and the sequencing DAG in
`bh-interleave-map.md` is internally consistent with the BG build order recorded in `bg-build-map.md`
(WS1→WS3→WS2→WS5→WS6→WS4→WS7→WS8→WS9→WS10→WS11→WS12).

---

## 1. Band census — B0 through B7, done vs. remains

| Band | Waves (cursor rows) | Status | Evidence |
|---|---|---|---|
| **B0** Repo hygiene | 1 (row 1.1) | **DONE** | `7a138008`; `scripts/proof-git-hygiene.mjs` exists; `.browserslistrc` gone (`ls` confirms absent); `test-results/` untracked. |
| **B1** Legacy excision + payload fix | 3 (rows 1.2–1.4) | **DONE (all 3)** | `7813a695` (lucide externalize), `0d6b9f8a` (value destraddle), `ba23c086` (dragmorph snap excise). All 3 gate scripts exist on disk (`proof-external-payload.mjs`, `proof-peer-conformance.mjs`, `proof-drag-morph.mjs`). |
| **B2** Src restructure (10 sub-waves) | rows 1.5, 1.6, 1.7, 5.1, 7.1, 11.1, 18.1–18.4 | **3 DONE / 7 PENDING** | DONE: B2.0 alias-codemod (`ca988a76`), B2.1-mech (`c98ac8c8`), B2.4a carves (`6daf7ef3`, byte-identical, paint deferred to WS11/12). PENDING: B2.5 [WS2], B2.4c [WS5], B2.4b [WS4], B2.1-swap/B2.2/B2.3/B2.6 [WS12]. |
| **B3** Demo restructure (6 sub-waves) | rows 11.2–11.6 | **0 DONE / 6 PENDING**, all `[WS4]` | Not startable until BG's WS4 lands (the demo-god-module owning wave). |
| **B4** Docs: CLAUDE.md delete + redistribution (9 sub-waves) | rows 1.8–1.11, 5.2, 18.5–18.8, 19.2 | **4 DONE / 6 PENDING** | DONE: B4a archive-refresh (`9724960f`), B4b-skeleton (`2846bb25`), B4c-precept-extract-files (`0ca2d3ce`), B4d-evidence-prune-files (`8490378b`). PENDING: B4c-extraction [WS2], B4b-content/B4c-gate-repoints/B4d-registration/B4e-doc-slim [WS12], B4f-claude-delete [WS12, absolute last]. |
| **B5** Backbone + gate consolidation (4 sub-waves) | rows 9.1, 18.9, 18.10 | **0 DONE / 3 PENDING** (B5d deferred past BH per PLAN §4) | B5a [WS3], B5b/B5c [WS12]. |
| **B6** Core prompts | 1 (row 1.12) | **DONE** | `a9f87453`; `docs/tranches/BH/prompts/` has 3 files + README; `proof:core-prompts` exists. |
| **B7** Cross-repo asks | 1 (row 18.11) | **0 DONE / 1 PENDING**, `[WS12]` | Roster is authored (4 rows, verified §2 below) but the ask-issuance wave itself has not fired. |

**Total tracked: 34 cursor rows, 12 DONE / 22 PENDING** — consistent with the seed's "~30 waves" estimate (some
PLAN.md sub-moves collapse into fewer cursor rows; e.g. B3's δ1–δ6 map to 6 distinct rows but B4's B4c splits into
2 rows for files-vs-extraction).

---

## 2. Verified: what 0d6b9f8a and ba23c086 actually changed on disk

The seed instructed verifying these two commits directly rather than trusting prose. Both check out as claimed:

- **`0d6b9f8a` (B1-W2-value-destraddle).** `package.json:1080` today reads a single `"@mkbabb/value.js": "^1.0.0"`
  (verified via `grep`) — the prior `^0.13.0 || ^1.0.0` straddle is genuinely gone. `scripts/proof-peer-conformance.mjs`
  exists (84 new lines in that commit) implementing `valueDestraddleViolations` + a 4-bite self-test.
- **`ba23c086` (B1-W3-dragmorph-snap-excise).** `src/composables/motion/useDragMorph.ts:325` ships
  `snap: targetsOf().map((t) => t.center)` — confirmed on disk, wired against kf's `DragOptions.snap` (first
  shipped in keyframes.js 5.1.0, per the file's own header comment at line 20). **This is the load-bearing fact
  the whole C1 coherence cluster turns on:** `package.json:1078` STILL reads `"@mkbabb/keyframes.js": "^5.0.0"` at
  HEAD — i.e. the peer floor has not yet been bumped to `^5.1.0`, so a consumer honoring only the declared floor
  gets a **live no-op** on this drag gesture today. This is not a doc inconsistency; it's a real, currently-shipping
  gap between the declared peer contract and the actual runtime dependency, correctly flagged by BH's own C1
  coherence cluster as a "pairing debt" to be discharged at `BH.B2.1-swap [WS12]`. Confirmed: `scripts/gates.mjs`
  and `scripts/proof-peer-conformance.mjs` (as of HEAD) carry **no** kf floor-vs-`snap:` clause yet — that clause is
  correctly deferred to `BG.W-GATE-FIELD-AURORA` (row 12.5, still PENDING at BG/WS7).

Both commits are exactly what the cursor and PLAN.md claim. No overclaim found here.

---

## 3. Coherence-fold verification — did the AMENDED-BH-COHERENCE-PLAN actually land?

This is the most consequential thing to verify for an A6 lens: coherence audits are worthless if their "LOCKED
decisions" stay paper-only. I checked every one of the 6 clusters (C1–C6) against the two trees the write-fence
splits them across.

### BH-tree edits (should be applied directly at develop) — **VERIFIED LANDED**

- C1-a (kf bump text at `PLAN.md:68`) — **present**, verbatim as specified.
- C2-a/b/c (asks-and-consumes.md 2→4 rows; PLAN.md "4-ask" language at :106/:134) — **present**. `asks-and-consumes.md`
  genuinely carries 4 rows (muster/aurora, speedtest/timeline, atlas `--ring`, bbnf-buddy `--glass-blur-dock`),
  each with a `Primary witness` column as demanded.
- C4-a (value.js peer bump text `^1.0.0 → ^1.1.1` at `PLAN.md:68`) — **present**.
- C5-d/e/f/g/h (B5c/B4f/B4b-content/§1-taxonomy/§3-edge edits) — **present**: `PLAN.md:93` now reads
  `proof:claude-deletable` GREEN as the B4f gate (not the bare-rg form); `PLAN.md:99` names doc-consistency:197 as
  the SECOND RELEASE crasher re-homed first; `PLAN.md:48` marks `B5c → B4f` HARD.
- C6-a/d/e (the "+2 siri"→"+1 /siri-island" rewrite, the `^1.2.0`→`^1.1.1` stale-literal fix, the B1-W3 LANDED
  marker) — **present** at `PLAN.md:68`, `:116`, `:62`, `:63`.
- PE-a (B2.4a carve LANDED marker) — **present**, `PLAN.md` §4 B2 band text reads "LANDED" with the exact
  carved-file byte counts (375L→267L, 433L→142L, 449L→87L).

### BG-tree edits (deferred to the BG-side fold owner per the write-fence) — **MOSTLY LANDED, ONE GAP FOUND**

- `bh-interleave-map.md:40` (C1-b, the kf-bump reciprocal + MR-4 gate-owner pointer) — **present**, verbatim
  cross-references `PLAN.md:68` and states the WS7→WS12 red-window is "EXPECTED / BY DESIGN."
- `bh-interleave-map.md` "+2 siri"→"+1 siri" sites (C6-b) — **present** at line 101 (`WS6 (+1 /siri-island published
  subpath entry...)`).
- `EXECUTION-PROGRESS.md:239` (row 12.5, C1-c: the kf floor-vs-API CLAUSE deliverable) — **present**, the full
  MR-4 split language is there verbatim, including the "red-window EXPECTED" note.
- `EXECUTION-PROGRESS.md:303` (row 18.1, C1-d/C4-a-mirror: widen the wave-name + Gate cell to absorb G4
  single-writer obligations) — **present**, both the kf bump and the value.js bump are now named in this row's
  Gate cell along with L15 budget re-pin, `gates:emit-ci`, `proof:binding-sweep`.
- `EXECUTION-PROGRESS.md:319` (row 19.1, C4-b: re-annotate `BG.W-CUT` as assert-not-edit) — **present**, the row
  explicitly states "NONE is a `package.json` edit at this wave."

**GAP — rows 18.11 and 19.2 were NOT touched by either coherence fold, and they carry exactly the stale
literals the fold targeted elsewhere:**

- **Row 18.11** (`EXECUTION-PROGRESS.md:313`): wave-name literal reads `BH.B7 W-api-ask-roster (2 by-name asks · G7)`
  — should read "4 by-name asks" per C2-b/c (both applied correctly in `PLAN.md:106/134` and in
  `asks-and-consumes.md`). The Gate cell also cites bare `proof:crossrepo-asks` — the coherence plan explicitly
  named this the "BB-scoped, vacuous-for-BH" gate and mandated the swap to `proof:crossrepo-asks:bh` (C2-b: "Change
  the Gate line from `proof:crossrepo-asks` (BB-vacuous) → `proof:crossrepo-asks:bh` GREEN"). Neither correction
  reached this row.
- **Row 19.2** (`EXECUTION-PROGRESS.md:320`): Gate cell reads `rg -l 'CLAUDE\.md' scripts/proof-*.mjs == 0 ·
  proof:claude-deletable born-RED whole-tranche → GREEN at delete` — i.e. it lists BOTH the superseded bare-rg
  form AND the new gate name side-by-side with a `·` conjunction, rather than the clean swap C5-e/C6-c mandated
  ("Change the gate line from the bare-rg form to `proof:claude-deletable` GREEN... the bare-rg form CANNOT pass at
  HEAD"). Leaving the bare-rg clause in place as a co-equal condition is exactly the "close-class lie" pattern the
  coherence plan was trying to kill (a form that can never pass sitting beside a form that can, inviting an
  execution agent to satisfy the wrong one or get confused about which is binding).

This is a genuine finding, not a nitpick: these two rows are precisely the ones the coherence plan's fold-agent
instructions (`AMENDED-BH-COHERENCE-PLAN.md` §2, action items 5–7) were supposed to touch — `EXECUTION-PROGRESS.md`
rows 12.5/18.1/19.1 got the treatment (verified above) but the fold silently skipped 18.11/19.2, the two rows that
carry the OTHER two BH-tree numeral edits (C2's ask-count, C5/C6's gate-form swap) on their BG-tree mirror. The
asymmetry suggests the fold-agent enumerated its edit list from the coherence doc's explicit BG-tree table
(§2 items 5–7, which only names rows 12.5/18.1/19.1 for `EXECUTION-PROGRESS.md`) and never cross-checked that
*every* PLAN.md numeral it touched had a cursor-side mirror — rows 18.11 and 19.2 simply weren't in that list,
even though they are the two cursor rows that most directly restate the B7/B4f facts PLAN.md changed.

---

## 4. BH wave → BG dependency map (verified against the current, twice-folded BG cursor)

Every PENDING BH wave, its declared BG waypoint, and cross-check against `bg-build-map.md`'s stated build order
(`WS1→WS3→WS2→WS5→WS6→WS4→WS7→WS8→WS9→WS10→WS11→WS12`):

| BH wave | Declared gate | BG waypoint | Cross-check |
|---|---|---|---|
| B2.5 W-dock-leaf-verify | verify GlassDock/fission carved | **WS2** | Consistent — WS2 is the dock band; row 5.1 correctly sequenced after WS1/WS3. |
| B4c-extraction (precept design-docs) | DOCK_SPRING 0.68/0.64 not stale | **WS2** | Consistent — WS2 is the one wave that rewrites DOCK_SPRING; extraction after it avoids capturing a stale value (this was itself a coherence-audit catch, per PLAN.md:90). |
| B5a-deps-currency | style-assets split | **WS3** | Consistent — WS3 is the glass/substrate band touching `vite.style-assets.ts:497-501`. |
| B2.4c W-leaf-verify-ws5 | verify blob/goo-dot leaves | **WS5** | Consistent — WS5 owns `useBlobSatellites`/`useGooDotMatrix`. |
| B2.4b W-leaf-verify-ws4 | verify canvas/tabs/luma leaves | **WS4** | Consistent — WS4 owns `createCanvasLifecycle`/`useWebGPUCanvas`/`useGlassBackdropLuminance`/`SegmentedTabs`. |
| B3 δ1–δ6 (all 6 sub-waves) | demo restructure | **WS4** | Consistent — WS4 is "build-last among the demo-god-module owners" per PLAN.md:78, covering WS1/WS2/WS5's demo splits too. |
| B2.1-swap, B2.2, B2.3, B2.6 | src restructure finalization | **WS12 (full close)** | Consistent — these are the file-moving/export-breaking bands that must sequence after ALL BG src edits land, not just after WS7. |
| B4b-content, B4c-gate-repoints, B4d-registration, B4e-doc-slim, B4f-claude-delete | docs finalization | **WS12** | Consistent. B4f is correctly the LAST wave (gated on B5c per the HARD edge). |
| B5b, B5c | gate consolidation | **WS12** | Consistent. |
| B7 W-api-ask-roster | cross-repo asks | **WS12 + after B2.2** | Consistent — asks can't issue until the export break (B2.2) actually lands. |

**No dependency-DAG inconsistency found.** Every PENDING wave's stated BG waypoint matches the build order BG's
own `bg-build-map.md` declares, and the "full BG close = after WS12, not WS7" correction (flagged as "the dominant
Pass-1 error, corrected in Pass-2" in both PLAN.md:40 and `bh-interleave-map.md:13`) is consistently applied
across every WS12-tagged row — I found zero rows that still anchor to WS7 as if it were the close.

---

## 5. Secondary findings

1. **The C1 "live no-op" is real production risk, correctly tracked, not yet resolved.** Confirmed independently
   in §2 above: `useDragMorph.ts` ships `snap:` against a kf API version the declared peer floor doesn't guarantee.
   This is BH's own honestly-tracked debt (not a new finding), but it is worth flagging to the orchestrator that
   this is a **currently shipping** defect on `tranche/BG` at HEAD, not a future risk — any consumer who npm-installs
   glass-ui off this branch today (or off an intermediate tag before `BH.B2.1-swap` lands) with kf pinned at exactly
   `5.0.x` gets silently-broken drag-to-snap. The mitigation (both fixes land together at the WS12 joint cut) is
   sound, but it means the branch must never be tagged/published between `ba23c086` and `BH.B2.1-swap`'s completion.
   No gate currently enforces "don't publish mid-window" beyond the `--run full` close-battery discipline; this
   relies on operational discipline (never tag off a mid-tranche commit) rather than a machine fence. Given the
   project's own precept about the d6 fork ("no out-of-band lineage publish"), this is arguably a place where the
   SAME discipline should have a named gate rather than resting on "the close only happens once."

2. **The B7 roster's primary witness for row 4 (bbnf token-retire) is a BG deliverable that does not exist yet.**
   Confirmed: `proof:retired-token-consumers` is named in `asks-and-consumes.md` as the row-4 primary witness but
   is NOT registered in `gates.mjs`/`package.json` at HEAD (grep returns nothing). This is correctly flagged as an
   "ACCEPTED, named owner" residual in the coherence plan (`BG.W-CLOSEFIX-9SITE` owns minting it) — not a new
   finding, just confirmed still-true and worth carrying forward so a later pass doesn't have to re-derive it.

3. **The BH tranche's total footprint (34 cursor rows / ~30 planned waves) is proportionate**, unlike several BG
   bands flagged elsewhere in this audit series for wave-granularity-as-disease. BH's waves are genuinely
   file-scoped, mechanical, and each has a real, checkable gate — this is NOT a target for pruning. If anything,
   BH is a positive counter-example to cite: a de-indirection tranche that resisted the temptation to spawn a wave
   per sub-symptom (e.g., all 6 B3 demo-restructure moves are correctly ONE band gated by a single runtime
   route-walk, not 6 independent gates).

---

## Fold candidates

1. **[amend-wave] Fix the two stale BG-tree cursor rows the coherence fold missed.** Target: `EXECUTION-PROGRESS.md`
   rows 18.11 and 19.2. Gestalt approach: this is not a new wave — it's completing the SAME mechanical fold-agent
   pass that already correctly touched rows 12.5/18.1/19.1, just extended to cover the two rows the coherence
   plan's explicit table under-enumerated. Row 18.11: change `(2 by-name asks · G7)` → `(4 by-name asks · G7)` and
   swap the Gate-cell's bare `proof:crossrepo-asks` reference to `proof:crossrepo-asks:bh` (mirroring the exact
   text already correct in `PLAN.md:106`). Row 19.2: replace the dual `rg -l ... == 0 · proof:claude-deletable ...`
   OR-form with the single `proof:claude-deletable GREEN` form (mirroring `PLAN.md:93`'s already-correct swap) —
   delete the bare-rg clause entirely rather than leaving it as an alternate/co-equal condition. This closes the
   exact "two forms disagree, one can never pass" failure mode the coherence plan itself was built to eliminate,
   applied consistently to the two rows it skipped. Should be folded as a doc-only edit riding whatever pass next
   touches `EXECUTION-PROGRESS.md` (no new wave needed — a one-paragraph correction note is sufficient).

2. **[plan-doc-edit] Name a machine gate (not just operational discipline) for "no publish between B1-W3 and
   B2.1-swap."** The C1 pairing-debt window is currently closed only by "the joint cut happens once, at WS12." If
   this audit series is amending BG/BH's close-battery machinery anyway (per the seed's `proof:close-battery-parity`
   and `proof:live-verified-ledger` precedents already in the corpus), it is idiomatically consistent to add ONE
   assertion to the same `--run full`/`--run release` battery: "if `useDragMorph.ts` references `DragOptions.snap`,
   the `@mkbabb/keyframes.js` peer floor MUST be `^5.1.0`" — which is EXACTLY the clause already speced for
   `BG.W-GATE-FIELD-AURORA` (row 12.5) per the MR-4 split. This is not a new ask; it's confirmation that the
   existing plan already closes this gap correctly and no further wave is needed — recorded here so a later
   synthesis pass doesn't re-flag it as an open risk. (Downgrade candidate: if row 12.5's `proof:field-aurora-aa`
   wave is ever pruned/merged elsewhere in this audit series, the kf floor-vs-API clause it carries must be
   explicitly re-homed, not silently dropped — flag this coupling to whichever lens/pass touches BG.WS7.)

3. **[defer-honest] No BH band needs pruning or merging.** Explicitly recording a NEGATIVE finding for the
   synthesis pass: BH's 8-band/34-row structure is right-sized, each wave has a real on-disk gate for its DONE
   rows, and the PENDING rows' BG dependencies are internally consistent with zero DAG contradictions found. Do
   not fold BH waves into BG or vice versa; the write-fence (`§3` of PLAN.md) that keeps the two tranches from
   colliding on `src/index.ts`/`gates.mjs`/`CLAUDE.md` is doing real work and should be preserved as-is.
