# BD CHALLENGE-3 — iteration-4 re-challenge (3 lenses)

CHALLENGE-2 RE-CHALLENGE (3rd round) — COMPLETENESS LENS

**Scope:** Re-verified the three CHALLENGE-2 MAJORs (A = content-hash phantom in W-CUT/FOLD-LEDGER; B = 28-vs-37 in FOLD-LEDGER/CANDIDATE; C = roster-grow unrostered + count) against the BD corpus + `/src` + `/demo` at HEAD. Also re-checked CHALLENGE-2's NEW-MAJOR-2 (the disjoint-paste-set contradiction) since it was a live MAJOR on the prior pass and convergence requires zero MAJORs.

**Verdict up front: NOT CLEAN — 1 MAJOR remains.** The three MAJORs I was tasked to verify (A, B, C) are ALL fully fixed on disk. But CHALLENGE-2's NEW-MAJOR-2 — the `data-table.vue`/`table.vue` double-claim — survives byte-unchanged and is an architectural (not doc-coherence) blocker.

---

## The three tasked MAJORs — ALL FULLY FIXED (verified clean)

### MAJOR-A (content-hash phantom) — FIXED ✓
Every site CHALLENGE-2 flagged is reconciled to "There is NO content-hash to re-snapshot":
- `BD.W-CUT.md:32` — "There is NO content-hash to re-snapshot: `proof:tabs-ios` T4 is a marker-presence + constant-band fence (`detectEngineFence`, NOT a `createHash` byte-fence)…T4 stays GREEN by construction."
- `BD.W-CUT.md:51` (CUT5) — "No content-hash arm — `proof:tabs-ios` T4 is a marker-presence fence untouched by the one-attribute edit."
- `FOLD-LEDGER.md:57` — the row title is now "KF-BC.md:41,132 'content-hash'/'byte-fenced' over-claim **reconcile**" with the rationale "There is NO content-hash to re-snapshot…the lockstep arm is the DOC reconcile."
- Disk anchor: `grep -cE "createHash|content-hash|sha256" scripts/proof-tabs-ios.mjs` = **0** (gate has no hash, confirmed). Zero "content-hash …re-snapshot" assertion survives anywhere in W-CUT/FOLD-LEDGER/SEED/CANDIDATE.

### MAJOR-B (28-vs-37 count) — FIXED ✓
The page-header count is **37** consistently everywhere; the disk truth is 37 (`grep -rln "section-label--tinted text-admin-label" demo/stories/` = 37):
- `SEED.md:54` — "37-file"; `FOLD-LEDGER.md:64` — "37-file hand-rolled page-identity header paste"; `FOLD-LEDGER.md:71` — "The 37 page-identity headers are PAGE-HEADER-FOLD's disjoint set"; `CANDIDATE-WAVES.md:122,123,124,125` — all "37".
- The CHALLENGE-2 sub-finding (the "13+ in-body" double-count at FOLD-LEDGER:71) is ALSO fixed: FOLD-LEDGER:71 now reads "the EXACTLY 2 in-body IconChip-led headers — `data/data-table.vue` + `data/table.vue`, 1 each, VERIFIED." Zero "13+" survives in the BD corpus (only in CHALLENGE-1/2 report text).
- The surviving "28" hits are unrelated subjects (Tier 28 cross-repo adopts; 28 DISPOSITION-REGISTER rows) — not the page-header count.

### MAJOR-C (roster-grow unrostered + count) — FIXED ✓
`BD.W-GESTALT-ROSTER-GROW` is now fully enrolled in all three index/ledger docs, and the count is reconciled:
- `SEED.md:100` — Band-9 bullet present ("the close oracle — grow + re-point proof:ba-gestalt to the BD tree…").
- `CANDIDATE-WAVES.md:380` — `### BD.W-GESTALT-ROSTER-GROW` spec entry present.
- `FOLD-LEDGER.md:107` — Class-I row present, disposition string matches the wave's own §2 verbatim.
- Count reconciled: `SEED.md:108` = **44** ("VERIFIED `ls …waves/*.md | wc -l` = 44"); disk = 44; `grep -c "^### BD.W-" CANDIDATE-WAVES.md` = **44**. No stale "43" wave-count survives (the remaining "43" is the unrelated `ui/`-dir count, correct).
- The no-silent-drop attestation (`FOLD-LEDGER.md:123`) is reconciled: "every BD wave-file on disk (44…) carries a ledger row — including the close-oracle infra wave BD.W-GESTALT-ROSTER-GROW (Class I)." The phantom self-back-reference is now backed by a real ledger row.

---

## REMAINING MAJOR (CHALLENGE-2 NEW-MAJOR-2 — un-hardened)

### MAJOR — The "disjoint paste-sets" reconciliation is still PHYSICALLY FALSE: `data-table.vue` + `table.vue` are double-claimed with contradictory build instructions and contradictory gate arms
- **Wave-ids:** `BD.W-PAGE-HEADER-FOLD` (band 4) + `BD.W-SECTION-HEADER-THREAD` (band 5).
- **Problem:** CHALLENGE-2's NEW-MAJOR-2 demanded "Resolve the call-site OWNERSHIP, not just the primitive-API coexistence — either remove `data/{data-table,table}.vue` from PAGE-HEADER-FOLD's 37-set (making it a 35-set), or MERGE." **Neither was done.** Both waves still claim the same two files with mutually-exclusive shapes:
  - `BD.W-PAGE-HEADER-FOLD.md:47` — `data/{data-table,table}.vue` is in the 37-file enrolled set; §3 Step B (`:92`) DELETES the inline header "at every call site"; M9e-2 (`:106`) asserts ZERO surviving paste across all 37 (incl. data-table/table); M9e-4 (`:108`) asserts the folded calls carry **NO `heading=` attr**.
  - `BD.W-SECTION-HEADER-THREAD.md:24-27` — the SAME `data/data-table.vue:160-178` + `data/table.vue:52-70` are its "live in-body IconChip-led headers at HEAD…the ≥2-consumer floor BD threads"; §3 Arm A (`:33-35`) re-points them with `heading="…"` **PRESENT**; M9d's `sshTwoAdopters` (`:45`) greens on data-table + table = 2.
- **Disk truth (verified by reading):** each file has **exactly ONE** `section-label--tinted text-admin-label` header (`grep -c` = 1 per file), and that header is the **first child of `<StoryPage>`** at `data-table.vue:159-178` — a page-identity header, with the file's OWN comment (`:16`) reading "PH3-safe (inline borderLeft…)" — the IDENTICAL comment PAGE-HEADER-FOLD §3:63 cites for its page-identity sites. There is NO separate in-body header distinct from the page-identity one. The same DOM node is claimed by both waves.
- **The contradiction bites at execution + at the gate:**
  - If PAGE-HEADER-FOLD runs first (heading-ABSENT): SECTION-HEADER-THREAD's Arm A starting-state (the inline `<header borderLeft>` at :160-178) is already DELETED → its build is a no-op and its claimed heading-PRESENT shape never lands; its M9d greens vacuously on PAGE-HEADER-FOLD's adopters — the exact "M9d could green on adopters that belong to the other wave's scope" double-count CHALLENGE-1 MAJOR-3 named.
  - If SECTION-HEADER-THREAD runs first (heading-PRESENT): PAGE-HEADER-FOLD's M9e-4 (no `heading=` on enrolled sites) REDS on data-table/table.
- **The "coordinate" prose explicitly LEAVES IT UNRESOLVED.** `BD.W-SECTION-HEADER-THREAD.md:60` (§6) acknowledges the tension but defers: "this wave consumes whichever form lands…Either way the orphan gets ≥2 adopters." `BD.W-PAGE-HEADER-FOLD.md:137` says "Coordinate the M9d/M9e clause split so the two waves' gate arms do not collide" — but the split is NOT decided on disk: M9e-2 still folds data-table/table heading-absent while M9d still claims them as its sole ≥2-floor heading-present. No 35-set carve, no merge, no DAG run-order resolves it.
- **Harden demanded:** Decide call-site ownership concretely. Either (a) REMOVE `data/{data-table,table}.vue` from PAGE-HEADER-FOLD's 37-set → a 35-set (and re-sync every "37" + "disjoint" claim to 35-page-identity + 2-in-body), letting SECTION-HEADER-THREAD own them heading-present; or (b) MERGE SECTION-HEADER-THREAD's ≥2-adopter gate widen into PAGE-HEADER-FOLD and retire/re-scope the THREAD wave (its ≥2-bar has NO consumers outside PAGE-HEADER-FOLD's set at HEAD). As written, the two waves cannot both execute, and the "disjoint" premise is false on disk.

---

## MINORs (polish; not convergence-blocking)

- **MINOR-1 — `FOLD-LEDGER.md:92` loose "disk 90" subpath count vs gate-canonical 89.** The Class-H row rationale says "68/76/72 subpaths (disk **90**)"; the load-bearing DOC-COUNT-SYNC wave-target + the gate's `jsSubpathExports()` = **89** (verified: 96 export keys − 6 CSS/font − the `.` root = 89; the "90" loosely counts one extra). The wave-spec target (89, DERIVED-not-frozen) is correct; only the ledger's rationale text is off-by-one. Carryover from CHALLENGE-2 MINOR-1, still present.
- **MINOR-2 — `BD.W-PAGE-HEADER-FOLD.md:17` "borderLeft = 36" vs the 37-header count.** Disk confirms 37 headers but only 36 carry `borderLeft:` in `:style` (verified: 37 span-class hits, 36 borderLeft hits). The 1-file outlier (a header using a different border mechanism) is real; the M9e-2 detector keys on `borderLeft:`-in-`:style` AND the span class combined — the 37th file may not match M9e-2's combined regex. Worth a one-line note naming the outlier so the enrolled-set ratchet does not silently miss it. Carryover from CHALLENGE-2 MINOR-2.

---

## CONVERGENCE VERDICT (COMPLETENESS lens)

**NOT CLEAN — 1 MAJOR remains.**

The harden between CHALLENGE-2 and this pass was **substantive and correct on the three tasked MAJORs**: MAJOR-A (content-hash phantom), MAJOR-B (28→37 + the 13+ residue), and MAJOR-C (roster-grow rostering + 43→44 count) are ALL fully reconciled on disk, internally consistent, and gate-viable. The summary-layer laggard pattern CHALLENGE-1/2 diagnosed is, for these three, finally swept clean.

**But CHALLENGE-2's NEW-MAJOR-2 — the architectural double-claim of `data-table.vue` + `table.vue` — was NOT hardened.** It is the one MAJOR that required a genuine decision (call-site ownership, not a doc-reconcile), and the corpus still ships the false "disjoint paste-sets" premise with two waves whose gate arms (M9e-4 no-heading vs M9d heading-present-adopters) contradict at execution. This is the lone surviving convergence blocker on this lens.

Fix this one MAJOR (re-scope PAGE-HEADER-FOLD to 35 OR merge the THREAD wave) plus the 2 MINORs, and the lens reaches clean. The three CHALLENGE-2 MAJORs this round was scoped to are converged; the data-file partition is the single genuine open architectural item carried over un-touched.

**Key file evidence:** `BD.W-PAGE-HEADER-FOLD.md:47` (`data/{data-table,table}.vue` in the 37-set, folded heading-absent), `:106,108` (M9e-2/M9e-4 cover them, NO `heading=`) vs `BD.W-SECTION-HEADER-THREAD.md:24-27` (the SAME 2 files as the sole ≥2-floor), `:33-35` (re-pointed heading-present), `:45,60` (M9d greens on them; §6 leaves it unresolved) · `demo/stories/data/data-table.vue:159-178` (1 header, first child of `<StoryPage>`, page-identity) + `table.vue` (1 header) · FIXED anchors: `scripts/proof-tabs-ios.mjs` (createHash = 0), `FOLD-LEDGER.md:57,64,71,107,123`, `SEED.md:100,108`, `CANDIDATE-WAVES.md:122-125,380` (all reconciled).",
      "All starting-states verified. Final confirmations:

1. **ARIA defect is REAL on disk** — `SegmentedTabs.vue:405` conditional role, `:406` unconditional `aria-orientation` (the genuine cut defect). The headline wave's starting-state is sound.

2. **/virtual + /pager contradiction is REAL** — `./virtual` present (live) but CLAUDE.md:422 says "RETIRED"; `./pager` absent, `./pager-dots` present but CLAUDE.md:144 says "subpath /pager". VIRTUAL-RESHIP starting-state confirmed.

3. **The 90-count contradiction** survives at FOLD-LEDGER:92 and CANDIDATE-WAVES:271 — and DOC-COUNT-SYNC:94 EXPLICITLY says "the FOLD-LEDGER's 'disk 90' figure is itself off-by-one... the correct count... is 89." So the corpus contains a wave-spec that names a peer doc's number as WRONG, while that peer doc (and the master CANDIDATE summary) still assert the wrong number. This is a live intra-corpus contradiction on the exact count-drift axis the tranche exists to kill.

I now have comprehensive, evidence-backed coverage of the PHANTOM lens for this 3rd round. Let me compile the final verdict.

Summary of my assessment:
- CHALLENGE-2's 5 MAJORs: 3 fully hardened (ROSTER-GROW enrolled+count 44; content-hash swept from SEED/CANDIDATE/W-CUT/FOLD-LEDGER:57; 28→37 swept; 13+ swept from ledger). 
- **NEW PHANTOM (MAJOR)**: BD.W-BC-COMPONENT-CANON.md:45 reintroduces the content-hash phantom as TRUE canon ("the SFC is byte-fenced by proof:tabs-ios T4 (the content-hash)... must re-snapshot the T4 hash in lockstep") — a sweep-miss that would bake the phantom into CLAUDE.md.
- **SURVIVING (MAJOR)**: the data-table/table double-claim (CHALLENGE-2 NEW-MAJOR-2) is NOT resolved — disk proves all 37 headers are structurally identical page-identity headers, SECTION-HEADER-THREAD's 2 "in-body" adopters ARE 2 of PAGE-HEADER-FOLD's 37, with contradictory heading-present/absent gate arms.
- **SURVIVING (MAJOR)**: the 90-vs-89 subpath count contradiction at FOLD-LEDGER:92 + CANDIDATE:271 vs DOC-COUNT-SYNC:94's explicit 89.

# BD CHALLENGE-3 — PHANTOM RE-CHALLENGE REPORT (3rd round)

**Scope:** Re-read the full BD corpus (SEED, CANDIDATE-WAVES, FOLD-LEDGER, 44 wave files) against the CHALLENGE-2 MAJORs + a fresh phantom/count/contradiction scan, spot-verified against real `/src` + `/demo` + `package.json` at HEAD. **Verdict up front: NOT CLEAN — 3 MAJORs remain. The CHALLENGE-2 harden fixed the high-traffic docs but (a) MISSED one wave that REINTRODUCES the content-hash phantom as TRUE canon, (b) did NOT genuinely resolve the data-table/table double-claim (annotated, not fixed — disk proves it false), and (c) left the 90-vs-89 subpath count as a live intra-corpus contradiction its own DOC-COUNT-SYNC wave explicitly flags as wrong.** The pattern is identical to CHALLENGE-1/2: the wave-spec layer converges, the summary/sibling-doc layer lags one sweep behind.

---

## REMAINING / NEW MAJORs

### MAJOR-1 (NEW) — The content-hash phantom REINTRODUCED as TRUE canon at `BD.W-BC-COMPONENT-CANON.md:45` — a sweep-miss that bakes the phantom into CLAUDE.md
- **Wave-id:** BD.W-BC-COMPONENT-CANON (Band 7).
- **Problem:** CHALLENGE-1 MAJOR-3 + CHALLENGE-2 MAJOR-A demanded the "T4 content-hash re-snapshot" phantom be deleted EVERYWHERE. The harden swept SEED:33, CANDIDATE:18, W-CUT:32/51, FOLD-LEDGER:57, and ARIA-GUARD:47 (all now correctly REFUTE it: "There is NO content-hash to re-snapshot"). **But `BD.W-BC-COMPONENT-CANON.md:45` ASSERTS the phantom as TRUE**, verbatim:
  > "**The SFC is byte-fenced** by `proof:tabs-ios` T4 (**the content-hash**) — this is why the BD.W-ARIA-ORIENTATION-GUARD wave is the ONLY authorized SFC-touch + **must re-snapshot the T4 hash in lockstep**."
- **Why it is worse than a residue:** this wave's PURPOSE is to WRITE per-component canon INTO CLAUDE.md. So the phantom would be baked into the shipped CLAUDE.md as permanent false canon, AND it commands the orchestrator to make BD.W-ARIA-ORIENTATION-GUARD "re-snapshot the T4 hash in lockstep" — the exact non-existent build step the entire rest of the corpus was hardened to refute. It directly contradicts SEED:33, W-CUT:32/51, FOLD-LEDGER:57, and ARIA-GUARD:47 within the same corpus.
- **Evidence:** `grep -cE "createHash|content-hash|sha256" scripts/proof-tabs-ios.mjs` = **0** (re-confirmed; T4 is `detectEngineFence`, a marker-presence fence). `BD.W-BC-COMPONENT-CANON.md:45` (verbatim above) vs `BD.W-ARIA-ORIENTATION-GUARD.md:47` ("there is no content-hash to re-snapshot... not a hash re-bake").
- **Harden demanded:** Rewrite `BD.W-BC-COMPONENT-CANON.md:45` to "the SFC is **marker-fenced** by `proof:tabs-ios` T4 (a marker-presence + constant-band fence, NOT a content-hash) — BD.W-ARIA-ORIENTATION-GUARD is the only authorized SFC-touch; T4 stays GREEN by construction (the one-attribute edit touches no T4 marker), so there is NO hash to re-snapshot." Otherwise the canon-writing wave ships the very phantom CHALLENGE-1/2 killed everywhere else.

### MAJOR-2 (REMAINING — CHALLENGE-2 NEW-MAJOR-2 NOT resolved) — The data-table/table double-claim is annotated, not fixed; disk proves the "disjoint paste-sets" premise FALSE
- **Wave-ids:** BD.W-PAGE-HEADER-FOLD (Band 4) + BD.W-SECTION-HEADER-THREAD (Band 5).
- **Problem:** CHALLENGE-2 NEW-MAJOR-2 demanded the call-site OWNERSHIP of `data-table.vue` + `table.vue` be RESOLVED (a genuine architectural decision: merge or re-scope). The harden added coordination PROSE but did not resolve it — the two waves still both enroll the SAME 2 physical call-sites with CONTRADICTORY gate arms:
  - **PAGE-HEADER-FOLD §2:47** lists `data/{data-table,table}.vue` in its enrolled 37-file set; §3:92 folds them with **heading ABSENT**; **M9e-4 reds any `heading=` on an enrolled site**; M9e-2 reds a surviving inline paste across all 37.
  - **SECTION-HEADER-THREAD §2:24-25, §3:34** names the SAME 2 files as its SOLE ≥2-adopter floor; §3:34 threads them with **heading PRESENT** ("supply the section's name... promoted from the eyebrow").
- **Disk proof the premise is FALSE:** all 37 `section-label--tinted text-admin-label` headers are STRUCTURALLY IDENTICAL — every one of the 37 files (verified) has the IconChip-led `borderLeft` header, and `data-table.vue` + `table.vue` EACH have **exactly ONE** such header (`grep -c` = 1 each), which IS the page-identity top header (eyebrow `Data · Data table`/`Data · Table` + blurb, **NO `<h2>` heading** — `data-table.vue:160-178`, `table.vue:52-70`, read in full). There is NO separate "in-body section header" in these files distinct from the page-identity header. So SECTION-HEADER-THREAD's 2 "in-body" adopters ARE 2 of PAGE-HEADER-FOLD's 37 page-identity headers — the "DISJOINT paste-sets" claim (PAGE-HEADER-FOLD §1:7, SECTION-HEADER-THREAD §2:27) is physically false.
- **The gate collision (unchanged from CHALLENGE-2):** if SECTION-HEADER-THREAD threads them heading-PRESENT, PAGE-HEADER-FOLD's M9e-4 (no `heading=` on enrolled sites) REDS on data-table/table. If PAGE-HEADER-FOLD folds them heading-ABSENT first, SECTION-HEADER-THREAD's Arm-A starting-state (the inline `<header borderLeft>`) is already DELETED and its ≥2-floor evaporates (0 distinct adopters → the J-inv-10 dead-mint it claims to cure stays uncured). The two waves cannot both execute as written.
- **Bonus disk finding (the irony):** the ONLY files with genuinely-MULTIPLE such headers — `compositions/settings.vue` (**4**) and `feedback/progress.vue` (**2**) — are where a distinct in-body section header COULD legitimately exist, yet SECTION-HEADER-THREAD names neither; it names the two single-header data files instead. So even the evidence selection is wrong.
- **Evidence:** `grep -c "section-label--tinted text-admin-label"`: data-table.vue=1, table.vue=1, settings.vue=4, progress.vue=2; all 37 files carry the IconChip+borderLeft header (enumerated); `data-table.vue:160-178` + `table.vue:52-70` read (no `<h2>`).
- **Harden demanded:** Resolve OWNERSHIP, not coexistence. Either (a) SECTION-HEADER-THREAD re-scopes its ≥2-floor to the genuinely-multi-header files (settings.vue's 2nd-4th headers, progress.vue's 2nd) that are distinct in-body section headers — IF those are in-body and not page-identity; or (b) REMOVE `data/{data-table,table}.vue` from PAGE-HEADER-FOLD's 37-set (→35-set) and let SECTION-HEADER-THREAD own them; or (c) MERGE the two waves (SECTION-HEADER-THREAD's ≥2-bar has no consumers outside PAGE-HEADER-FOLD's set). The "disjoint" prose must stop asserting a partition disk contradicts.

### MAJOR-3 (REMAINING — CHALLENGE-2 MINOR-1 escalated) — The 90-vs-89 subpath count is a LIVE intra-corpus contradiction its own DOC-COUNT-SYNC wave flags as wrong
- **Wave-id:** BD.W-DOC-COUNT-SYNC (Band 7).
- **Problem:** The harden made `BD.W-DOC-COUNT-SYNC` fully correct at **89** JS subpaths (`:20,:44,:48,:70,:83`), and `:94` EXPLICITLY calls out the FOLD-LEDGER's "disk 90" as "itself off-by-one (the correct... count... is 89; 90 would include the root)." **But the two summary docs were NOT corrected to match:**
  - **`FOLD-LEDGER.md:92`** still says "68/76/72 subpaths **(disk 90)**".
  - **`CANDIDATE-WAVES.md:271`** still says "package.json=**90** JS subpaths" AND "76-entry per-subpath split (×2, **=90**)".
- **Why MAJOR not MINOR:** this is no longer an off-by-one polish item — it is a within-CORPUS contradiction where a wave-spec (DOC-COUNT-SYNC:94) names a peer doc's number as factually WRONG while that peer doc (FOLD-LEDGER:92) and the master summary (CANDIDATE:271) still assert it. The FOLD-LEDGER `what` field is the row a future `proof:bd-fold-ledger` lifts into the machine ledger, so the wrong 90 ships into the JSON. This is precisely the count-drift class BD.W-DOC-COUNT-SYNC exists to kill, surviving inside BD's own ledger — the same irony CHALLENGE-1/2 flagged on the 28-vs-37 axis, recurring on the subpath axis.
- **Evidence:** disk = **89** JS subpaths (`node -e`: 96 total keys − 1 root − 6 css/font = 89, verified); `FOLD-LEDGER.md:92` ("disk 90"); `CANDIDATE-WAVES.md:271` ("=90" ×2); `BD.W-DOC-COUNT-SYNC.md:94` (explicitly: "the correct... count... is 89").
- **Harden demanded:** Re-sync FOLD-LEDGER:92 + CANDIDATE-WAVES:271 to **89** (the number DOC-COUNT-SYNC already proves and the disk confirms).

---

## MINORs (polish, not convergence-blocking)

- **MINOR-1 — `BD.W-DOC-COUNT-SYNC.md:20` carries a stale internal "90" beside its corrected 89.** Line 20 reads "package.json exports keys = 96 total... → 89 JS subpath exports" (correct) but the parallel CANDIDATE:271 starting-state it derives from still says 90; once MAJOR-3 lands, verify DOC-COUNT-SYNC's own §2 starting-state quote of CANDIDATE is reconciled. Cosmetic (the wave's binding numbers are all 89).
- **MINOR-2 — SECTION-HEADER-THREAD §3:34 instructs ADDING a heading that doesn't exist on disk.** "supply the section's name, e.g. 'Data table' promoted from the eyebrow" would synthesize an `<h2>` the page-identity header never had — sub-finding of MAJOR-2; resolves when ownership is decided.
- **MINOR-3 — `borderLeft:` count is 36, header-span count is 37.** One enrolled file uses a non-`borderLeft` border mechanism for its page-identity header. PAGE-HEADER-FOLD §2:18 acknowledges "borderLeft: = 36" but M9e-2 keys on the `borderLeft:`-in-`:style` AND span-class combination — the 37th (non-borderLeft) file may slip M9e-2's combined regex. Worth naming the outlier file so the enrolled-set ratchet doesn't silently miss it. (Flagged in CHALLENGE-2 MINOR-2; still un-named.)

---

## What I verified as GENUINELY HARDENED (no challenge)

- **Content-hash phantom — swept from SEED:33, CANDIDATE:18, W-CUT:32/51, FOLD-LEDGER:57, ARIA-GUARD:47** (all now refute it). ONLY BD.W-BC-COMPONENT-CANON:45 missed (MAJOR-1).
- **28→37 page-header count — fully swept** (no "28" survives in live corpus; SEED/CANDIDATE/FOLD-LEDGER/wave-spec all 37; disk grep = 37).
- **13+ double-count — swept from the ledger** (FOLD-LEDGER:71 now "EXACTLY 2"; the only "13+" left is SECTION-HEADER-THREAD:27 correctly DISCLAIMING it as page-identity, not in-body).
- **ROSTER-GROW enrollment + count — fully fixed** (disk=44, SEED=44, CANDIDATE ###=44, FOLD-LEDGER Class I:107, attestation:123 = 44; ROSTER-GROW in all three index docs).
- **W-CUT 13-surface roster — fixed** (`:7,:17,:56,:60` all "13-surface"; the "8-surface" framing gone).
- **All starting-states real on disk:** the ARIA defect (`SegmentedTabs.vue:405-406`), the /virtual contradiction (CLAUDE.md:422 "RETIRED" vs live `./virtual`) + /pager mismatch (`./pager-dots` live, `./pager` absent, CLAUDE.md:144 says "/pager"), the 11 gate names BC-COMPONENT-CANON cites (all PRESENT; `proof:separator` correctly flagged ABSENT with the caveat honored), the structure counts (ui/=43, custom/=49, composables=11, JS-subpaths=89).
- **The BOOKED/GATED/WATCH waves** (KF-OSCILLATOR/KF-DRAGSNAP/VALUEJS-COLOR, VIZ-COMPUTE-DENSITY, VIZ-FALLBACK-RETIRE-WATCH) correctly refuse to build blind — no-silent-drop bookkeeping, not padding.

---

## CONVERGENCE VERDICT (PHANTOM lens)

**3 MAJORs remain — NOT CLEAN.**

1. **MAJOR-1 (NEW)** — `BD.W-BC-COMPONENT-CANON.md:45` reintroduces the content-hash phantom as TRUE canon ("the SFC is byte-fenced... the content-hash... must re-snapshot the T4 hash in lockstep") — a sweep-miss that would bake the phantom into CLAUDE.md, contradicting the 5 docs the harden corrected. `grep createHash proof-tabs-ios.mjs = 0`.
2. **MAJOR-2 (REMAINING)** — the data-table/table double-claim (CHALLENGE-2 NEW-MAJOR-2) is annotated, not fixed; disk proves all 37 headers structurally identical page-identity headers, SECTION-HEADER-THREAD's 2 "in-body" adopters ARE 2 of PAGE-HEADER-FOLD's 37, with contradictory heading-present/absent M9e-4/M9d gate arms that cannot both execute.
3. **MAJOR-3 (REMAINING)** — the 90-vs-89 subpath count is a live intra-corpus contradiction (FOLD-LEDGER:92 + CANDIDATE:271 say 90; DOC-COUNT-SYNC:94 explicitly says 90 is wrong + the disk = 89) — the count-drift disease inside the count-sync tranche's own ledger.

MAJOR-1 and MAJOR-3 are pure reconcile-the-laggard-doc fixes (the corrected layer already exists and names the wrong values). MAJOR-2 is the one genuine open architectural item — it requires deciding call-site ownership of the 2 data headers (likely a MERGE or a re-scope of SECTION-HEADER-THREAD onto settings.vue/progress.vue's genuinely-multi-header files), and it has survived two challenge rounds un-fixed. **Harden these 3 (plus the 3 MINORs) and re-run.** The substantive build (ROSTER-GROW, the per-pane→aggregate mapping, the goo-blob GL-fence pair, the band-6/7 canon) is sound; the corpus is one targeted sweep away from convergence, but this lens does NOT reach 2-consecutive-clean on this pass.

Key file evidence: `docs/tranches/BD/waves/BD.W-BC-COMPONENT-CANON.md:45` (phantom-as-canon) vs `scripts/proof-tabs-ios.mjs` (grep createHash=0) · `demo/stories/data/data-table.vue:160-178` + `table.vue:52-70` (single page-identity header each, no `<h2>`) double-claimed by `BD.W-PAGE-HEADER-FOLD.md:47` (37-set, heading-absent, M9e-4) + `BD.W-SECTION-HEADER-THREAD.md:24-25,34` (same 2 files, heading-present) · `docs/tranches/BD/FOLD-LEDGER.md:92` + `CANDIDATE-WAVES.md:271` ("disk 90") vs `BD.W-DOC-COUNT-SYNC.md:94` ("the correct count is 89") + disk=89 · `src/components/custom/tabs/SegmentedTabs.vue:405-406` (the real ARIA defect, headline wave sound).",
      "Confirmed. The SEED was edited in place by the harden (the conditional sentence was added — count=1), shifting the line to :116, but the "byte-untouched fallbacks / never edits the .frag" absolutes were LEFT in the same clause. NO wave owns the SEED #4 reconcile (the only hit, SQUIRCLE-REFRACT, explicitly DISCLAIMS editing SEED). CANDIDATE-WAVES carries no SEED #4 reconcile candidate. The grep hits in STROKES + BLOB-MOTION-TUNE are byte-untouched assertions about the AURORA `.frag` (correctly true) — not the metaball SEED #4 reconcile.

This is the lone genuine REMAINING fence MAJOR. The "SEED-lens hardener's bound" framing does not discharge it: a planning corpus that ships with binding-discipline #4 stating "metaball.frag...are byte-untouched fallbacks...never edits the .frag" while two of its own band-3 waves (SQUIRCLE arm 1 + SAT-SHADE) explicitly edit `metaball.frag.ts:180` is an intra-corpus contradiction on a load-bearing instruction — exactly the FENCE MAJOR-2(a) CHALLENGE-2 raised, un-hardened.

Now let me weigh whether this should be ranked MAJOR or MINOR for the FENCE lens specifically. The contradiction is real and on a load-bearing fence-discipline. But I must be precise: SQUIRCLE §7's CLAUDE.md reconcile and Q5 gate DO make the in-repo canon coherent at execution; the SEED is a planning doc whose #4 is the governing discipline the waves cite. Let me verify the exact severity by re-reading whether SQUIRCLE's §7 reconcile text inadvertently quotes the SEED #4 as ALREADY conditional (which would compound the contradiction).

I have sufficient evidence. Let me compile the final harsh, specific FENCE re-challenge report.

Based on my complete read of both squircle/refract band-3 viz waves, the sibling band-3 viz waves (SAT-SHADE, BLOB-MOTION-TUNE, FALLBACK-RETIRE-WATCH, PARITY-METAL), CHALLENGE-2, and live disk verification of every cited gate/shader/uniform line:

---

# BD CHALLENGE-3 — FENCE LENS RE-CHALLENGE (3rd round)

**Scope:** the CHALLENGE-2 fence MAJORs (M2 collision, uStretch sequencing, GL-seam justification, the §3/§3a-A squircle byte-form mismatch) + the SQUIRCLE §3/§3a-A byte-form consistency + a fresh scan of all band-3 viz waves for new fence violations. Repo HEAD; corpus `docs/tranches/BD/`.

**Verdict up front: NOT CLEAN — 1 MAJOR remains.** The headline CHALLENGE-2 NEW MAJOR-A (the §3/§3a-A squircle byte-form drift) is **fully hardened**, and 3 of the 4 fence items are clean. But CHALLENGE-2's FENCE MAJOR-2(a) — the SEED #4 self-contradiction — survives byte-unchanged and un-owned.

---

## REMAINING MAJOR

### MAJOR-1 — SEED.md:116 discipline #4 still self-contradicts the band-3 waves it governs (CHALLENGE-2 FENCE MAJOR-2(a), un-hardened)
- **Wave-ids:** BD.W-GOOBLOB-SQUIRCLE-REFRACT (arm 1) + BD.W-GOOBLOB-SAT-SHADE — the two waves that explicitly edit `metaball.frag.ts:180`.
- **Problem:** `SEED.md:116` reads verbatim: *"aurora.frag/metaball.frag/tonemap.glsl/composition.glsl **are byte-untouched fallbacks**. A WGSL/shader edit is sanctioned ONLY when a viz wave re-touches the shader anyway; it mirrors/transcribes the GLSL math, **never edits the .frag**; the typed-struct uniform packer moves in lockstep."* The clause carries **both** the absolute ("are byte-untouched fallbacks" / "never edits the .frag") **and** the conditional ("a WGSL/shader edit is sanctioned ... when a viz wave re-touches the shader anyway") in the SAME sentence. CHALLENGE-2 FENCE-lens demand #1 was explicit: "drop the 'byte-untouched fallbacks / never edits the .frag' absolutes." The clause is **byte-identical** to the form CHALLENGE-2 flagged (the harden only ADDED the conditional, which CREATED the contradiction; it never removed the absolutes). SQUIRCLE §3:25 ("`metaball.frag.ts:180` AND `metaball.wgsl.ts:222` change in LOCKSTEP") and SAT-SHADE §3.3:30 ("add `uSatColor[4]` ... `gl.uniform3f` writes in `uploadBlobUniforms.ts`", G1:48 "`metaball.frag.ts` reads `uSatColor[i]`") both **edit `metaball.frag.ts`** — so binding-discipline #4's "never edits the .frag" is FALSE against its own band-3 waves.
- **Evidence:** `SEED.md:116` (verbatim above, `grep -c "sanctioned ONLY when a viz wave re-touches" SEED.md` = 1, confirming the conditional was added in place); `metaball.frag.ts:180` live spherical dome-Z (to be edited by SQUIRCLE arm 1, verified); NO wave owns the SEED #4 reconcile (`grep "edit SEED" docs/tranches/BD/waves/` = empty; SQUIRCLE §7:92 explicitly **disclaims** it: "the SEED #4 absolute-vs-conditional fix is the SEED-lens hardener's bound ... never editing SEED.md"; CANDIDATE-WAVES carries no SEED #4 reconcile candidate). SQUIRCLE §7:87 even quotes the SEED #4 as if it ALREADY names the conditional ("RECONCILE to the CONDITIONAL the SEED #4 discipline names") — but the SEED's #4 does NOT cleanly name the conditional; it carries the absolute alongside it, so the wave's own claim that SEED #4 is "the coherent sibling form" is false against the disk.
- **Why MAJOR not MINOR:** this is the exact intra-corpus contradiction class BD Band-7 (DOC-COUNT-SYNC, the doc-drift kill) exists to eliminate, shipped inside BD's own SEED, on a **load-bearing fence-discipline** the waves cite as their governing authority. A planning corpus whose non-negotiable discipline #4 says "never edits the .frag" while two of its band-3 waves edit `metaball.frag.ts:180` cannot converge — the fence is internally false. The CLAUDE.md:745 + perf-producer:256 halves WERE owned (SQUIRCLE §7 + Q5, well-formed — see below), but the SEED #4 half was orphaned to a "hardener's bound" that is not a wave and was never executed.
- **Harden demanded:** Re-word `SEED.md:116` #4 to the pure conditional — e.g. "aurora.frag/metaball.frag/tonemap.glsl/composition.glsl are the WebGL2/CPU fallbacks — **byte-untouched UNLESS a band-3 viz wave re-touches the metaball shader on its own merits** (SQUIRCLE arm 1's squircle dome-Z + SAT-SHADE's per-satellite lane), in which case `.frag`+`.wgsl`+the typed-struct packer move in LOCKSTEP transcribing the SAME math across backends; the fence is the LOCKSTEP discipline, not an absolute no-touch" — dropping "are byte-untouched fallbacks" and "never edits the .frag." This is a one-clause edit to the SEED; either assign it to a BD band-7 doc wave or execute it as the SEED-lens harden in this round (a "hardener's bound" with no owning wave is the orphan that defeated convergence here).

---

## NEW MAJORs

**None.** No new fence violation was introduced by the 3rd-round harden. The §3/§3a-A byte-form drift (CHALLENGE-2's NEW MAJOR-A) was correctly closed without introducing a successor.

---

## What I re-verified as GENUINELY FENCE-CLEAN (no challenge)

- **The §3/§3a-A squircle byte-form is now CONSISTENT — CHALLENGE-2 NEW MAJOR-A FULLY HARDENED.** Every POSITIVE statement of the squircle byte-string is the IDENTICAL guarded canonical form `pow(max(0.0, 1.0 - pow(1.0 - interior, 4.0)), 0.25)` — §3 build-leg (`:24`, both the arrow-form and the explicit "THE BYTE-FORM IS LOAD-BEARING ... the shipped shader byte-string is ..."), §3a-A re-snapshot (`:41,42`), Q1 (`:58`), Q4 (`:61`). The terse/unguarded form `pow(1 - pow(1 - interior, 4.0), 0.25)` now appears ONLY in **prohibition context** ("NEVER a terse ... restatement" `:24`; "a shader carrying a terse un-guarded ... reds" `:61`). Q4 even adds an explicit self-test bite for the byte-drift state ("a shader carrying a terse un-guarded ... while M2 carries the guarded canonical form reds"). The drift that would re-red M2 on execution is eliminated.
- **FENCE MAJOR-1 (silent M2 break) — STILL closed.** §3a-A names the collision, mandates the `LIT_MATH_VERBATIM[7]` re-snapshot in the same diff, Q4 + the self-test bite prove the two gates land on ONE dome-Z SoT. Verified live: `LIT_MATH_VERBATIM[7]` (`proof-gooblob-meatball.mjs:145`) IS the spherical dome-Z snippet; the live WGSL line is `metaball.wgsl.ts:222`, frag `:180` — all citations exact.
- **FENCE MAJOR-3 (circular sanction) — STILL closed.** The sanction is DIRECTED both sides: SQUIRCLE §3a-B (`:46`) "arm 1 ... is the SOLE INDEPENDENT metaball-shader re-touch ... This wave does NOT depend on SAT-SHADE." SAT-SHADE §3a-A (`:37`) mirrors "DIRECTED: SAT-SHADE → SQUIRCLE arm 1." STROKES correctly dropped from the chain in BOTH waves ("STROKES touches the *aurora* shader, NOT metaball").
- **FENCE MAJOR-2(b) (CLAUDE.md:745 + perf-producer un-owned) — HARDENED.** SQUIRCLE §7 now explicitly OWNS the CLAUDE.md:745 + perf-producer:256 reconcile (the sole-independent-re-touch wave owns the seam-widen + doc reconcile), adds a born-RED Q5 CANON-COHERENCE clause + a false-canon self-test bite. SAT-SHADE §3a-D correctly defers to SQUIRCLE §7 (single-home, no double-ownership, no gap). Live disk confirms both sites carry the absolute form at HEAD (the correct born-RED target for a planning spec).
- **uStretch sequencing (CHALLENGE-2 verified-clean) — STILL clean.** BLOB-MOTION-TUNE arm 2 PREFERS the CPU `cInt.stretch` path (off the GL fence — verified `uniformBridgeWGPU.ts:197` = `f32[OFF.s6 + 3] = cInt.stretch;`); the shader-gain last-resort uStretch region (`metaball.wgsl.ts:162,174,178` / `metaball.frag.ts:118,122` — all verified exact on disk) is DISJOINT from the dome-Z (`:222/:180`); a gain edit rides the SAME ONE re-touch SQUIRCLE+SAT-SHADE establish (never a 2nd independent re-touch); the `s6.w` lane is already packed so M3 is undisturbed.
- **SAT-SHADE M3 cross-check — sound.** The satColor lane is APPENDED at a new end offset; `BLOB_WGPU_UNIFORM_BYTES` (`uniformBridgeWGPU.ts:46` = `352 + TRAIL_N * 16; // 592`, verified) extends, but M3's `res.z`/`res.w` regex asserts (`proof-gooblob-meatball.mjs:230-241`, verified — `f32[OFF.res + 2]`/`[OFF.res + 3]` at lines 240/241) stay GREEN. G5 + the self-test bite catch a re-pack that shifts them.
- **PARITY-METAL — capture-only, fence-clean.** Edits ZERO shaders (`:34,44,67` "GL-shader fence ABSOLUTE — this captures, not edits"), runs FIRST as the sequencing gate, and clause F-LIVE correctly demands distinct sha256 + non-zero ΔE for the fwidth-bearing goo-blob row.
- **FALLBACK-RETIRE-WATCH — do-not-delete held.** Deletes nothing; re-affirms `proof:gpu-substrate-single` clause B (the machine-block at `:315-329`, verified); records HELD-with-rationale; no fence violation.
- **The FOLD-LEDGER:57 phantom content-hash row (cross-lens residual) — FIXED.** Now reworded to "KF-BC.md:41,132 'content-hash'/'byte-fenced' over-claim reconcile" with the correct rationale ("There is NO content-hash to re-snapshot ... T4 is a marker-presence + constant-band fence ... grep `createHash` = ZERO"). Confirmed live `grep createHash scripts/proof-tabs-ios.mjs` = 0.

---

## MINORs (polish, not convergence-blocking)

- **MINOR-1 — basename-only uniform-bridge citations.** SQUIRCLE §3a-D, SAT-SHADE §3a-B, and BLOB-MOTION-TUNE §6 cite `uniformBridgeWGPU.ts:46/197/262-265`, but the real path is `src/components/custom/goo-blob/composables/uniformBridgeWGPU.ts` (the `composables/` segment is elided). Line numbers are exact; the basename elision is cosmetic but is a path imprecision in a corpus that prizes exact citations. One-line note on the full path.
- **MINOR-2 — aurora budget canon drift (cross-cutting).** STROKES §6 flags that CLAUDE.md's aurora budget ("lifted to 50000") trails the live `profile-bundle.mjs` ceiling (gzip 54000) "by one lift"; no BD wave reconciles that CLAUDE.md figure (the wave handles it for itself via verify-against-live). Polish — the live work is safe, the prose stays stale.

---

## CONVERGENCE VERDICT (FENCE lens)

**NOT CLEAN — 1 MAJOR remains.**

The 3rd-round harden was substantive and well-targeted: it fully closed CHALLENGE-2's headline NEW MAJOR-A (the §3/§3a-A squircle byte-form drift is now ONE consistent guarded-canonical string with a self-test bite against the drift state), and it kept the three structural fence MAJORs closed (M2 collision re-snapshot, directed non-circular sanction, the CLAUDE.md:745 + perf-producer canon reconcile owned at SQUIRCLE §7 with a born-RED Q5 + false-canon bite). The squircle §3/§3a-A byte-form question — the core of this lens — is **clean**.

The lone survivor is **CHALLENGE-2 FENCE MAJOR-2(a)**: `SEED.md:116` discipline #4 still carries the "byte-untouched fallbacks / never edits the .frag" absolutes in the same clause that sanctions the conditional shader re-touch — byte-unchanged since CHALLENGE-2 flagged it — making the corpus's non-negotiable fence-discipline #4 internally false against its own SQUIRCLE/SAT-SHADE waves (which edit `metaball.frag.ts:180`). No wave owns the fix; SQUIRCLE §7 explicitly disclaims it to a "SEED-lens hardener's bound" that is not a wave and was never executed. This is a one-clause SEED edit, but it is the genuine open item: the FENCE-lens cannot reach 2-consecutive-clean while the seed's governing GL-fence discipline contradicts the band-3 waves it governs.

**Harden demanded to converge:** re-word `SEED.md:116` #4 to the pure conditional (drop "are byte-untouched fallbacks" + "never edits the .frag"; keep the "sanctioned ONLY when a viz wave re-touches the shader anyway, in lockstep" form), and assign it to a real BD wave or execute it as the SEED-lens harden in this round. After that single edit lands, the FENCE lens is clean.

**1 MAJOR remains.**

Key evidence: `docs/tranches/BD/SEED.md:116` ("are byte-untouched fallbacks ... never edits the .frag" + the conditional, self-contradicting; byte-unchanged since CHALLENGE-2) · `BD.W-GOOBLOB-SQUIRCLE-REFRACT.md:24,41,42,58,61` (squircle byte-form now uniformly the guarded canonical `pow(max(0.0, 1.0 - pow(1.0 - interior, 4.0)), 0.25)` — NEW MAJOR-A closed) · `:87,92` (SEED #4 reconcile disclaimed to a non-wave "hardener's bound") · `scripts/proof-gooblob-meatball.mjs:145` (LIT_MATH_VERBATIM[7] spherical dome-Z, M2) · `src/components/custom/goo-blob/shaders/metaball.{wgsl.ts:222,frag.ts:180}` (live spherical, born-RED targets) · `src/components/custom/goo-blob/composables/uniformBridgeWGPU.ts:46,197,240,241` (BLOB_WGPU_UNIFORM_BYTES=592, cInt.stretch s6.w, res.z/res.w shadow lanes — all wave citations exact) · `docs/tranches/BD/FOLD-LEDGER.md:57` (phantom content-hash row FIXED)."
    ],
    "cleanLenses": 0
  }
}