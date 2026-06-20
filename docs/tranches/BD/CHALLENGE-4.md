# BD CHALLENGE-4 — iteration-5 re-challenge (3 lenses)

COMPLETENESS RE-CHALLENGE — 4th ROUND (data-table/table double-claim lens)

**Verdict up front: CLEAN (zero MAJORs).** The lone surviving convergence blocker from CHALLENGE-3 (the `data-table.vue`/`table.vue` double-claim, CHALLENGE-2 NEW-MAJOR-2) is now genuinely RESOLVED on disk — not annotated, architecturally decided. The two sibling CHALLENGE-3 MAJORs (phantom-content-hash-as-canon, 90-vs-89 subpath count) are also hardened. No fold is un-dispositioned, no wave-count drift survives, and the data-band wave cluster introduces NO new double-claim.

## REMAINING MAJORs (from CHALLENGE-3): ZERO

**CHALLENGE-3 MAJOR-2 (the double-claim) — RESOLVED.** The architectural decision was made: `BD.W-SECTION-HEADER-THREAD` is RETIRED, not annotated. Disk-verified:
- The wave-spec file is GONE (`ls waves/BD.W-SECTION-HEADER-THREAD.md` → No such file).
- Wave count is 43 everywhere — disk (`ls waves/*.md | wc -l` = 43), CANDIDATE-WAVES (`grep -c '^### BD.W-'` = 43), SEED.md:107, FOLD-LEDGER.md:124. The `44→43` transition is recorded consistently (FOLD-LEDGER:72, CANDIDATE-WAVES:395, SEED:107).
- The "disjoint paste-sets" premise is now disk-proven false IN the corpus, matching real disk: `grep borderLeft: demo/stories/**/*.vue` = 36, `grep "section-label--tinted text-admin-label"` = 37, the +1 delta is EXACTLY `compositions/settings.vue` (verified via `comm`). `data-table.vue` + `table.vue` each carry exactly ONE `borderLeft:` header — confirming they ARE 2 of PAGE-HEADER-FOLD's 36.
- The contradictory gate arms are GONE: the THREAD's heading-PRESENT M9d arm died with the file. PAGE-HEADER-FOLD now owns a single coherent M9e-1..4 family (heading-optional / paste-gone / ≥2-adopters / PH3-heading-ABSENT), with the dead-mint cure + self-test folded into M9e-3 (`waves/BD.W-PAGE-HEADER-FOLD.md:104-113`). One wave, one M9e family, one adopter count.
- `data-table.vue:185 "Repositories"` is a SEPARATE `<StorySection heading>` — disk-confirmed (`sed -n '183,188p'`), so the page-identity header (eyebrow-only, folded) and the card heading do not collide.

**CHALLENGE-3 MAJOR-1 (phantom content-hash reintroduced as canon) — RESOLVED.** `BD.W-BC-COMPONENT-CANON.md:45,84` now explicitly state "NOT a content-hash" with the inline disproof "`grep -cE 'createHash|content-hash|sha256' scripts/proof-tabs-ios.mjs` = 0" — disk-confirmed `grep -c createHash scripts/proof-tabs-ios.mjs` = 0. The wave even adds a standing instruction (`:84`) that the orchestrator must NOT introduce a phantom hash re-snapshot.

**CHALLENGE-3 MAJOR-3 (90-vs-89 subpath count) — RESOLVED.** `BD.W-DOC-COUNT-SYNC.md` is consistently 89 throughout (`:20,44,45,48,56,70,83,94`) with the full derivation (96 export keys − 1 root − 6 CSS/font = 89). FOLD-LEDGER:93 agrees (89). No "disk 90" / "90 subpath" residue survives (grep returned empty).

## NEW MAJORs: ZERO

I specifically hunted for a NEW double-claim introduced by the data-band cluster now that THREAD's scope merged into PAGE-HEADER-FOLD. FOUR live waves touch `data-table.vue`/`table.vue` — all disjoint or explicitly coordinated:
- **PAGE-HEADER-FOLD** folds the inline page-identity header; KEEPS the `<STOP>_STOP` constant feeding `:section` (`:91`).
- **DATA-SUFFUSE** explicitly coordinates (`:54,:85`): for data-table/table "the `:section="9"` on the primitive IS the event (do not add a second header)"; its `data-band-suffused` clause asserts only the 11 zero-identity stories (`:65`), NOT data-table/table.
- **DATA-BAND-HEADINGS** explicitly KEEPS the suffuse page-header eyebrow (`:37`) and only touches body section headers (`:73,:126`).
- **DATA-BAND-GLASS** touches the table-atom wrapper (`:193`) — a disjoint DOM node.

I verified the one place a fold could silently break a sibling gate: `proof-suffuse.mjs` keys the data-table/table event on `--section-label-accent`/`<IconChip :section>` (`:502`) + a computed-style readback (DATA-SUFFUSE:74), NOT on inline `borderLeft`. The fold's `StorySectionHeader :section="9"` call preserves the baked `--section-color-9`, so the suffuse LEDGER rows (`:201-202`) survive. No silent gate breakage.

## Fold/disposition completeness: CLEAN
- Every one of 43 wave-files on disk carries a FOLD-LEDGER row (verified loop — zero MISSING).
- FOLD-LEDGER self-claims 43 (`:124`) and disk = 43.
- The retired THREAD candidate carries its Class-F RETIRE-rationale row (FOLD-LEDGER:72); the no-delete fence is correctly scoped to LEDGER rows, not the folded spec file.
- No residual stale `44` survives in the live corpus (the only `44` hits are line-number citations in unrelated waves + the documented `44→43` transitions).

## MINORs: ONE (cosmetic, non-blocking)

- **MINOR-1 (gate-arm-name drift in a HISTORICAL row):** FOLD-LEDGER.md:72 + CANDIDATE-WAVES.md:181 describe the retired double-claim using the arm names "PAGE-HEADER-FOLD **M9e-4** vs THREAD **M9d**". The current PAGE-HEADER-FOLD spec's heading-absent guard is M9e-4 (correct), but the *paste-gone/adopter* arms are M9e-2/M9e-3. The "M9e-4 (heading-absent) vs M9d (heading-present)" pairing accurately names the past contradiction being resolved — it is describing history, not a live arm collision. The reference is precise enough to be non-misleading, but a reader could momentarily conflate "M9e-4" with the live PH3 arm. Pure polish; does not affect convergence.

## EXPLICIT VERDICT

**CLEAN (zero MAJORs).** The data-table/table double-claim is RESOLVED ON DISK (one wave owns those files, counts re-synced to 43/36/89 consistently, no contradictory gate arms, FOLD-LEDGER reconciled with the THREAD retire-rationale row). The two sibling CHALLENGE-3 MAJORs are hardened. No fold un-dispositioned, no wave-count drift, no NEW double-claim from the data-band cluster. This lens reaches clean — the only finding is one cosmetic MINOR (a historical gate-arm-name citation in a retire row).

Key file evidence: `ls waves/BD.W-SECTION-HEADER-THREAD.md` → absent · `ls waves/*.md | wc -l` = 43 = `grep -c '^### BD.W-' CANDIDATE-WAVES.md` · `grep borderLeft: demo/stories/**/*.vue` = 36, span = 37, `comm` delta = `compositions/settings.vue` (matches corpus exactly) · `data-table.vue` + `table.vue` = 1 borderLeft header each · `waves/BD.W-PAGE-HEADER-FOLD.md:104-113` (single coherent M9e-1..4 family) · `BD.W-BC-COMPONENT-CANON.md:45,84` + `grep -c createHash scripts/proof-tabs-ios.mjs` = 0 · `BD.W-DOC-COUNT-SYNC.md:94` (89, no "90" residue) · `BD.W-DATA-SUFFUSE.md:54,65,85` (explicit PAGE-HEADER-FOLD coordination, no overlap) · `scripts/proof-suffuse.mjs:502` (fold-robust detector).",
      "All 4 hits are confirmed **negations/refutations**, not assertions:
- **W-CUT.md:32** — "There is NO content-hash to re-snapshot... NOT a `createHash` byte-fence"
- **W-CUT.md:51** — "No content-hash arm — `proof:tabs-ios` T4 is a marker-presence fence"
- **ARIA-GUARD.md:39,40,47,101,122** — explicitly "THIS IS NOT WHAT THE GATE DOES", "NOT a content-hash", "no content-hash to re-snapshot", "The SEED's 're-snapshot the T4 content-hash in lockstep' coupling does not apply", "must NOT introduce a phantom hash re-snapshot step"
- **SEED.md:16,33** — "There is NO content-hash to re-snapshot... grep... = ZERO", "NO content-hash re-snapshot (T4 is a marker-presence fence)"
- **FOLD-LEDGER.md:57** — "There is NO content-hash to re-snapshot... grep... = ZERO"

Every single live-corpus occurrence is a refutation that names the phantom only to kill it. The regex matched because these sentences *quote* the phantom phrasing in order to negate it. There is ZERO positive assertion of a content-hash re-snapshot anywhere in the live spec layer (the only positive quotations are in CHALLENGE-2.md and CHALLENGE-3.md, which are historical findings docs quoting the now-deleted text).

The phantom lens is CLEAN. My verification is complete and airtight across all three of CHALLENGE-3's MAJORs (the phantom is the named lens; MAJOR-2 and MAJOR-3 were co-flagged contradictions that must also be zero for convergence).

---

PHANTOM RE-CHALLENGE (4th round) — CLEAN (zero MAJORs)

The content-hash phantom is GONE from ALL sites including BD.W-BC-COMPONENT-CANON.md. The 90-vs-89 subpath count is reconciled to 89 everywhere. The co-flagged data-table/table double-claim contradiction is resolved. No surviving phantom, count-drift, or intra-corpus contradiction on this lens.

REMAINING MAJORs (from CHALLENGE-3): NONE — all three fixed.
- **CH-3 MAJOR-1 (phantom-as-canon at BD.W-BC-COMPONENT-CANON.md:45)** — FIXED. Line 45 now reads "The SFC is MARKER-FENCED by `proof:tabs-ios` T4 (`detectEngineFence` — a marker-presence + constant-band fence... NOT a content-hash; grep `createHash` = 0)... there is NO hash to re-snapshot." The §6 fence (line 84) reinforces it with "the orchestrator must NOT introduce a phantom hash re-snapshot step." `grep -c "NOT a content-hash"` = 2 in that file. The old verbatim phantom ("byte-fenced by proof:tabs-ios T4 (the content-hash)... must re-snapshot the T4 hash in lockstep") is absent from every live wave spec.
- **CH-3 MAJOR-2 (data-table/table double-claim)** — FIXED. `BD.W-SECTION-HEADER-THREAD.md` is deleted from disk (wave count 44→43, confirmed `ls *.md | wc -l` = 43, matching SEED:107 + FOLD-LEDGER:124). FOLD-LEDGER:72 carries the RETIRE-rationale declaring the "disjoint paste-set" premise physically false. BD.W-PAGE-HEADER-FOLD now solely owns the dead-mint cure (M9e-3 ≥2-adopter), with one M9e clause family, no M9d/M9e gate-arm collision (§6:136).
- **CH-3 MAJOR-3 (90-vs-89)** — FIXED. FOLD-LEDGER:93 now says "(disk **89**)"; CANDIDATE-WAVES:266 now says "package.json=**89**... 76-entry per-subpath split (×2, →89)"; BD.W-DOC-COUNT-SYNC is internally consistent at 89 (:20,:44,:48,:56,:70,:83,:94). No literal subpath "90" survives anywhere in the live corpus (grep ZERO).

NEW MAJORs: NONE.

MINORs (non-blocking, all CHALLENGE-3 carryovers, observational only):
- **MINOR (CH-3 MINOR-3 carryover) — the 36-vs-37 outlier file is now NAMED.** BD.W-PAGE-HEADER-FOLD §2:17 explicitly identifies the 37th span-class match as `compositions/settings.vue` (settings-group labels, no inline `borderLeft`, `grep -c IconChip` = 0) and confirms the combined `borderLeft:`+span RE self-consistently yields the enrolled 36. CHALLENGE-3's "worth naming the outlier" ask is satisfied — this is no longer even a live MINOR, it is resolved in the spec.
- **MINOR (observational) — BD.W-DOC-COUNT-SYNC.md:73 contains the literal "90" inside a SYNTHETIC self-test fixture** ("a synthetic 90th subpath is added to the fixture `pkg.exports` → the SS-SUBPATH arm MUST flag"). This is a legitimate planted-defect test value proving the count is DERIVED-not-frozen, NOT a count claim. Not a drift; flagged only for completeness.

Disk anchors verified this pass: `ls docs/tranches/BD/waves/*.md | wc -l` = 43 · `grep -cE "createHash|content-hash|sha256" scripts/proof-tabs-ios.mjs` = 0 · `BD.W-SECTION-HEADER-THREAD.md` = No such file · all 4 phantom-regex hits in the live corpus (W-CUT, ARIA-GUARD, SEED, FOLD-LEDGER) are refutations quoting the phantom to kill it, zero positive assertions · subpath "90" count claim = ZERO live.

CONVERGENCE VERDICT (PHANTOM lens): **CLEAN (zero MAJORs).** All three CHALLENGE-3 MAJORs hardened; no new phantom, count-drift, or intra-corpus contradiction introduced. This lens reaches clean on this pass.",
      "Confirmed. Final state:
- **43 waves** (SECTION-HEADER-THREAD retired into PAGE-HEADER-FOLD — iteration-5 resolved CHALLENGE-3's MAJOR-2 data-table/table double-claim by retiring the duplicate-claim wave; that was a COMPLETENESS-lens fix, not a FENCE item).
- **"SEED-lens hardener" appears ONLY in** `CHALLENGE-3.md` (the prior challenge) and `BD.W-GOOBLOB-SQUIRCLE-REFRACT.md` (which disclaims the SEED #4 fix to it). **No wave IS the SEED-lens hardener; no wave owns the SEED #4 reconcile; no FOLD-LEDGER row dispositions it.**
- **SEED.md:115 discipline #4 is byte-identical** to what CHALLENGE-3 flagged — still carries both absolutes ("are byte-untouched fallbacks" + "never edits the .frag") alongside the conditional.

The FENCE MAJOR survives un-hardened through iteration-5. I have complete, evidence-backed coverage. Let me compile the final verdict.

---

# BD CHALLENGE-4 — FENCE LENS RE-CHALLENGE (4th round)

**Scope:** the four FENCE items named (squircle byte-form, M2 collision, GL-seam justification, SEED #4 absolute/conditional) + a fresh scan of all band-2/band-3 viz waves for any new fence violation introduced by the iteration-5 harden. Repo HEAD; corpus `docs/tranches/BD/`.

**Verdict up front: NOT CLEAN — 1 MAJOR remains.** Three of the four fence items are clean; the iteration-5 harden was well-targeted on the COMPLETENESS-lens items (SECTION-HEADER-THREAD retired, 44→43) but **left the FENCE-lens survivor — CHALLENGE-3 FENCE MAJOR-1, the SEED #4 self-contradiction — byte-unchanged and still un-owned.** This is now the SAME un-hardened MAJOR across CHALLENGE-2, CHALLENGE-3, and CHALLENGE-4.

---

## REMAINING MAJORs

### MAJOR-1 — `SEED.md:115` discipline #4 still self-contradicts the band-3 waves it governs (CHALLENGE-3 FENCE MAJOR-1, un-hardened a 3rd time)
- **Wave-ids:** BD.W-GOOBLOB-SQUIRCLE-REFRACT (arm 1, edits `metaball.frag.ts:180`) + BD.W-GOOBLOB-SAT-SHADE (edits `metaball.frag.ts:153-155`, reads `uSatColor[i]`).
- **Problem:** `SEED.md:115` reads verbatim, byte-unchanged since CHALLENGE-2/3: *"**GL-SHADER FENCE.** aurora.frag/metaball.frag/tonemap.glsl/composition.glsl **are byte-untouched fallbacks**. A WGSL/shader edit is sanctioned ONLY when a viz wave re-touches the shader anyway; it mirrors/transcribes the GLSL math, **never edits the .frag**; the typed-struct uniform packer moves in lockstep."* The clause carries BOTH the absolute ("are byte-untouched fallbacks" / "never edits the .frag") AND the conditional ("sanctioned ONLY when a viz wave re-touches the shader anyway") in the SAME sentence. The harden between CHALLENGE-3 and this pass touched the SEED #4 clause ZERO times (`grep` confirms it is the identical string; `sanctioned ONLY` count = 1, unchanged). CHALLENGE-2/3's explicit demand — "drop the 'byte-untouched fallbacks / never edits the .frag' absolutes" — was NOT executed.
- **The contradiction is live on disk:** discipline #4's "metaball.frag...never edits the .frag" is FALSE against its own band-3 waves. SQUIRCLE §3:25 ("`metaball.frag.ts:180` AND `metaball.wgsl.ts:222` change in LOCKSTEP") edits the metaball `.frag`; SAT-SHADE §2:12 + G1:48 ("`metaball.frag.ts` reads `uSatColor[i]`") edits it too. Verified live: `metaball.frag.ts:180` = `float z = sqrt(max(0.0, 1.0 - (1.0 - interior) * (1.0 - interior)));` (the born-RED spherical target SQUIRCLE arm 1 edits).
- **No wave owns the fix — and the orphan is named as a NON-wave.** `grep "SEED-lens hardener" docs/tranches/BD/` resolves ONLY to CHALLENGE-3.md (the prior challenge) and `BD.W-GOOBLOB-SQUIRCLE-REFRACT.md`, which **explicitly disclaims** it: §7:92 — "the SEED #4 absolute-vs-conditional fix is the SEED-lens hardener's bound (this wave...never editing SEED.md)." There is NO wave called the SEED-lens hardener; CANDIDATE-WAVES carries no SEED #4 reconcile candidate; FOLD-LEDGER carries no SEED #4 disposition row. The fix is orphaned to an authority that does not exist in the corpus.
- **The orphan now propagates a FALSE PREMISE into a real wave.** SQUIRCLE §7:87 asserts its CLAUDE.md:745 reconcile "**matches the corrected SEED #4 conditional form the SEED-lens hardener owns**" — but SEED #4 is NOT corrected (byte-identical absolutes at `:115`) and no hardener owns it. So a live, executing wave (SQUIRCLE) cites a corrected sibling state that does not exist on disk — a forward-reference to a phantom fix. This is strictly WORSE than CHALLENGE-3's framing: the contradiction is no longer just latent in the SEED, it is now an explicit false claim inside the wave that anchors the entire band-3 GL-seam sanction.
- **Why MAJOR not MINOR:** this is the exact intra-corpus contradiction class BD Band-7 (DOC-COUNT-SYNC, the doc-drift kill) exists to eliminate, shipped inside BD's own SEED, on a **load-bearing fence-discipline #4** that every band-3 wave cites as its governing authority. A planning corpus whose non-negotiable discipline #4 says "never edits the .frag" while two of its band-3 waves edit `metaball.frag.ts` cannot converge — the fence is internally false, and a real wave now name-checks a phantom "corrected" version of it. The CLAUDE.md:745 + perf-producer:256 halves WERE owned (SQUIRCLE §7 + the born-RED Q5 + false-canon bite — well-formed), but the SEED #4 half stays orphaned across three challenge rounds.
- **Evidence:** `SEED.md:115` (verbatim above, byte-unchanged) · `metaball.frag.ts:180` + `metaball.wgsl.ts:222` (live spherical, born-RED) · `BD.W-GOOBLOB-SQUIRCLE-REFRACT.md:25,87,92` (edits the `.frag`; cites "corrected SEED #4"; disclaims the SEED edit) · `BD.W-GOOBLOB-SAT-SHADE.md:12,48` (edits `metaball.frag.ts`) · `grep "SEED-lens hardener" docs/tranches/BD/` = {CHALLENGE-3.md, SQUIRCLE wave} only.
- **Harden demanded:** Re-word `SEED.md:115` #4 to the pure conditional — drop "are byte-untouched fallbacks" + "never edits the .frag"; e.g. *"aurora.frag/metaball.frag/tonemap.glsl/composition.glsl are the WebGL2/CPU fallbacks — byte-untouched UNLESS a band-3 viz wave re-touches that shader on its own merits (SQUIRCLE arm 1's squircle dome-Z + SAT-SHADE's per-satellite lane edit metaball.frag.ts:180/153; aurora.frag/tonemap/composition stay byte-untouched this cut), in which case `.frag`+`.wgsl`+the typed-struct packer move in LOCKSTEP transcribing the SAME math; the fence is the LOCKSTEP discipline, not an absolute no-touch."* Then either (a) assign the edit to a real BD band-7 doc wave (the natural home is alongside DOC-COUNT-SYNC / the canon-resync band), OR (b) execute it as a named SEED-lens harden and DELETE the "hardener's bound" disclaimer from SQUIRCLE §7:92 + the "corrected SEED #4" forward-reference from §7:87. A "hardener's bound" with no owning wave is the orphan that has defeated convergence on this lens for three rounds running.

---

## NEW MAJORs

**None.** The iteration-5 harden introduced no new fence violation. The COMPLETENESS-lens fixes (SECTION-HEADER-THREAD retired into PAGE-HEADER-FOLD; SEED.md:62/107 reconciled to the 36-page-identity + 2-data-file-are-2-of-36 partition; 44→43 count) touched no fence surface. The band-2 (DEEP-GLASS-20PX, GLASS-LENS-CHROMA) and the aurora WGSL waves (STROKES, CURL) all correctly assert the GL fence for the shaders they do NOT edit (GLASS-LENS-CHROMA L6 = zero shader edit; CURL/STROKES keep `aurora.frag.ts` byte-untouched, transcribing the math into the WGSL twin). No successor fence drift.

---

## What I re-verified as GENUINELY FENCE-CLEAN (no challenge)

- **The §3/§3a-A squircle byte-form — STILL fully consistent (CHALLENGE-3 NEW MAJOR-A stays closed).** Every positive statement is the IDENTICAL guarded canonical `pow(max(0.0, 1.0 - pow(1.0 - interior, 4.0)), 0.25)` — §3:24, §3a-A:41/42, Q1:58, Q4:61. The terse unguarded form appears ONLY in prohibition context ("NEVER a terse..."; "a shader carrying a terse un-guarded...reds" — Q4:61 has the explicit byte-drift self-test bite). The drift that would re-red M2 on execution is eliminated.
- **FENCE: the M2 byte-assert collision — STILL closed.** §3a-A names the collision, mandates the `LIT_MATH_VERBATIM[7]` re-snapshot in the same diff, Q4 + the self-test bite prove the two gates land on ONE dome-Z SoT. Live: `LIT_MATH_VERBATIM[7]` (`proof-gooblob-meatball.mjs:145`) IS the spherical dome-Z snippet (the born-RED baseline); the squircle re-snapshot string is byte-identical to the shipped shader form.
- **FENCE: the directed (non-circular) sanction — STILL closed.** SAT-SHADE §2:7/21, §3a-A:37, §6:65 all assert DIRECTED (SAT-SHADE → SQUIRCLE arm 1; "SQUIRCLE does NOT cite SAT-SHADE as its anchor"). SQUIRCLE §3a-B:46 mirrors "the SOLE INDEPENDENT metaball-shader re-touch...does NOT depend on SAT-SHADE." STROKES correctly DROPPED from the metaball sanction chain in BOTH waves ("STROKES touches the *aurora* shader, NOT metaball").
- **FENCE: the GL-seam justification (CLAUDE.md:745 + perf-producer:256) — STILL owned at SQUIRCLE §7.** The sole-independent-re-touch wave owns the seam-widen + the doc reconcile; born-RED Q5 CANON-COHERENCE clause + false-canon self-test bite; SAT-SHADE §3a-D defers to SQUIRCLE §7 (single-home, no double-ownership). Live disk confirms both sites carry the absolute form at HEAD (correct born-RED target).
- **SAT-SHADE M3 cross-check — sound.** The satColor lane APPENDS at a new end offset; `BLOB_WGPU_UNIFORM_BYTES` (`uniformBridgeWGPU.ts:46` = `352 + TRAIL_N * 16; // 592`, verified) extends, but M3's `res.z`/`res.w` shadow-lane regex asserts (`proof-gooblob-meatball.mjs:227-241`) stay GREEN (offsets unmoved). G5 + the self-test bite catch a re-pack that shifts them.
- **AURORA-WGSL-CURL / STROKES aurora fence — clean.** `aurora.frag.ts` byte-untouched (WGSL arm only); the WGSL curl is the byte-faithful twin of the existing `.frag:290-296` branch; `warpModeFor` never auto-selects `'curl'` (default byte-identical). STROKES S3 asserts the aurora content-hash unchanged.

---

## MINORs (polish, not convergence-blocking)

- **MINOR-1 — basename-only uniform-bridge path citations (CHALLENGE-3 MINOR-1, un-fixed).** SQUIRCLE §3a-C/§3a-D, SAT-SHADE §3a-B, and BLOB-MOTION-TUNE cite `uniformBridgeWGPU.ts:46/197` but the real path is `src/components/custom/goo-blob/composables/uniformBridgeWGPU.ts` (`grep -c "composables/uniformBridgeWGPU"` across the band-3 waves = 0 — the `composables/` segment is elided everywhere). Line numbers are EXACT (`:46` = `BLOB_WGPU_UNIFORM_BYTES = 352 + TRAIL_N * 16; // 592`, verified); the basename elision is cosmetic but is a path imprecision in a corpus that prizes exact citations. The repo has NINE `uniformBridgeWGPU.ts` files (one per viz), so the elision is genuinely ambiguous on grep.
- **MINOR-2 — aurora budget canon drift (cross-cutting, carried).** STROKES §6 flags that CLAUDE.md's aurora budget ("lifted to 50000") trails the live `profile-bundle.mjs` ceiling by one lift; no BD wave reconciles that CLAUDE.md figure. The live work is safe (verify-against-live); the prose stays stale.

---

## CONVERGENCE VERDICT (FENCE lens)

**NOT CLEAN — 1 MAJOR remains.**

The iteration-5 harden was substantive on the COMPLETENESS lens (SECTION-HEADER-THREAD retired, the data-file partition resolved, 44→43) and kept ALL THREE structural FENCE MAJORs closed (the squircle byte-form is one consistent guarded-canonical string with a byte-drift self-test bite; the M2 re-snapshot collision; the directed non-circular sanction; the CLAUDE.md:745 + perf-producer canon owned at SQUIRCLE §7 with a born-RED Q5 + false-canon bite). The squircle byte-form question — the core technical fence item — is **clean**.

But **CHALLENGE-3 FENCE MAJOR-1 — the SEED #4 self-contradiction — was NOT hardened for the third consecutive round.** `SEED.md:115` discipline #4 is byte-identical to the form CHALLENGE-2 first flagged: it carries the "are byte-untouched fallbacks / never edits the .frag" absolutes in the same clause that sanctions the conditional shader re-touch, making the corpus's non-negotiable GL-fence-discipline #4 internally false against its own SQUIRCLE/SAT-SHADE waves (which edit `metaball.frag.ts:180/153`). No wave owns the fix; SQUIRCLE §7:92 disclaims it to a "SEED-lens hardener's bound" that is not a wave and was never executed; AND SQUIRCLE §7:87 now name-checks a "corrected SEED #4...the SEED-lens hardener owns" that does not exist on disk — a forward-reference to a phantom fix, strictly worse than the latent contradiction CHALLENGE-3 flagged.

This is a one-clause SEED edit, but it is the genuine open FENCE item, and a planning corpus cannot reach 2-consecutive-clean on this lens while its governing GL-fence discipline contradicts the band-3 waves it governs AND a live wave cites a non-existent corrected version of it.

**Harden demanded to converge:** re-word `SEED.md:115` #4 to the pure conditional (drop the two absolutes; keep the lockstep-conditional form, and explicitly scope aurora.frag/tonemap/composition as byte-untouched-this-cut while naming metaball.frag as the sanctioned band-3 re-touch); assign it to a real BD band-7 doc wave (or execute as a named SEED-lens harden); and DELETE the "hardener's bound" disclaimer (§7:92) + the "corrected SEED #4" forward-reference (§7:87) from SQUIRCLE so no wave cites a phantom fix. After that single coordinated edit, the FENCE lens is clean.

**1 MAJOR remains.**

Key evidence: `docs/tranches/BD/SEED.md:115` (the absolutes byte-unchanged through 3 rounds; `sanctioned ONLY` count=1) · `BD.W-GOOBLOB-SQUIRCLE-REFRACT.md:25,87,92` (edits metaball.frag; cites "corrected SEED #4"; disclaims the SEED edit to a non-wave) · `BD.W-GOOBLOB-SAT-SHADE.md:12,48` (edits metaball.frag) · `src/components/custom/goo-blob/shaders/metaball.{frag.ts:180,wgsl.ts:222}` (live spherical born-RED) · `grep "SEED-lens hardener" docs/tranches/BD/` = {CHALLENGE-3.md, SQUIRCLE wave} only — no owning wave · squircle byte-form (§3:24, §3a-A:41/42, Q1:58, Q4:61) uniformly guarded-canonical = NEW-MAJOR-A stays closed · `scripts/proof-gooblob-meatball.mjs:145` (LIT_MATH_VERBATIM[7] spherical, M2) · `uniformBridgeWGPU.ts:46` (BLOB_WGPU_UNIFORM_BYTES=592, the MINOR-1 elided path)."
    ],
    "cleanLenses": 2
  }
}