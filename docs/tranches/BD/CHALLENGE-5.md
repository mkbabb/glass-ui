# BD CHALLENGE-5 — iteration-6 (5 diverse lenses, 4/5 CLEAN)

{
  "summary": "Phase-2 iteration 6: diverse-lens re-challenge (completeness, phantom, fence, paint-realizability, gate-soundness) after the fence-#4 fix → CHALLENGE-5; the clean-round-1 test toward 2-consecutive-clean. PLANNING ONLY.",
  "agentCount": 5,
  "logs": [
    "BD iteration 6: clean-round-1 diverse-lens re-challenge (5 lenses, batched 3)",
    "rechallenge batch 1: completeness, phantom, fence",
    "rechallenge batch 2: paint-realizable, gate-sound",
    "Rechallenge complete: 4/5 lenses CLEAN"
  ],
  "result": {
    "cleanLenses": 4,
    "totalLenses": 5,
    "reports": [
      "Counts are consistent: 36 page-headers cited consistently across SEED/FOLD-LEDGER/wave; the `jsSubpathExports()` gate function exists and is the canonical source (I independently computed 89 from package.json earlier: 96−1−6=89); DOC-COUNT-SYNC cites 89 twelve times with only one "90" (the synthetic self-test fixture value CHALLENGE-4 already cleared). 43 waves verified on disk.

I have completed a thorough COMPLETENESS-lens audit. Let me consolidate my findings. The headline: the FENCE MAJOR from CHALLENGE-4 was substantively hardened (SEED #4 is now pure-conditional), but the SQUIRCLE §7 "SEED-lens hardener owns" attribution phrases were left in place — a residual that has degraded from MAJOR to MINOR (the cited corrected state now exists; only the fictional-wave attribution is stale).

---

**COMPLETENESS LENS — BD tranche convergence audit (HEAD db22364c)**

**MAJORs: ZERO**

I independently grep-verified every count and traced every fold; the corpus is complete. Specifically confirmed clean:

- **Wave count 43** — disk (`ls waves/*.md`) = 43, SEED:107 = 43, FOLD-LEDGER:124 = 43, all consistent.
- **Page-headers 36** — `grep -rl 'borderLeft:' demo/stories/` = 36 on disk, cited consistently across SEED/FOLD-LEDGER/PAGE-HEADER-FOLD wave.
- **Subpaths 89** — independently computed from `package.json` (96 export keys − 1 root − 6 CSS/font = 89); `jsSubpathExports()` gate fn is the canonical source; DOC-COUNT-SYNC consistent at 89.
- **No-silent-drop** — bidirectional check passes: all 43 wave-ids appear in FOLD-LEDGER; every `→BD.W-*` disposition resolves to a real wave-file (the lone "phantom" `BD.W-SECTION-HEADER-THREAD` is the correctly-RETIRED candidate, all 3 mentions in retire-rationale context, no live BUILD dest).
- **The aria-orientation wave is FULLY specified** — defect real on disk (`SegmentedTabs.vue:406` unconditional `aria-orientation` on the `:role="…'group'"` default); the PagerDots:124 idiom precedent verified; gate clauses A1-A4 + 3 self-test bites + the zero-pixel paint-exemption + the marker-fence (not content-hash) reconcile + the kf cross-repo discharge condition all precise and disk-grounded.
- **The gestalt close-oracle re-point** — I ran G8a's context-aware exemption logic against all 16 "rides W-REFLECT<digit>" hits in the BD corpus: every one is exempt (double-quoted OR `forbidden`/`RETIRE` context), so the re-pointed gate is genuinely GREEN on the real BD corpus, not a false-positive trap. The BC-frozen consts (:70-73), the closed-BC-record fence, and the per-pane→aggregate mapping all verify.
- **VIZ-PARITY-METAL** (the single biggest owed item) is grounded — the structural-proxy records, byte-identical hashes, and `STRUCTURAL proxy` methodology strings verify on disk as the born-RED target.
- **The CHALLENGE-4 FENCE MAJOR was hardened** — SEED.md:115 #4 is now the pure-conditional form ("byte-fenced BY DEFAULT — NOT unconditionally byte-untouched … Conditional, not absolute"); the absolutes the FENCE lens demanded dropped are gone, so the governing GL-fence discipline no longer self-contradicts its band-3 waves.

**MINORs: 3**

- **MINOR-1 (stale phantom-wave attribution — the un-finished half of CHALLENGE-4's harden demand):** CHALLENGE-4 FENCE MAJOR-1 demanded TWO edits — (a) re-word SEED #4 to pure-conditional, AND (b) delete the "SEED-lens hardener owns/bound" forward-references from `BD.W-GOOBLOB-SQUIRCLE-REFRACT.md:87,92`. Edit (a) landed; edit (b) did NOT — §7:87 still says "matches the corrected SEED #4 conditional form the SEED-lens hardener owns" and §7:92 "the SEED #4 absolute-vs-conditional fix is the SEED-lens hardener's bound." No wave named "the SEED-lens hardener" exists (CANDIDATE-WAVES has no such candidate; FOLD-LEDGER has no SEED #4 row). This was a MAJOR in CHALLENGE-4 because it was "a forward-reference to a phantom fix" — but the premise has flipped: SEED #4 IS now corrected on disk, so the cited state exists; only the *attribution* to a fictional owning wave is stale. It binds no gate clause (the §7 work is the real CLAUDE.md:745 + perf-producer:256 reconcile, gate-owned via Q5; the "hardener" mention is pure prose). SEED.md is a planning artifact edited in-place during DEV (the harden landed in the planning commit db22364c), so the SEED edit genuinely needs no execution-wave owner — making the "the hardener owns it" phrasing not just stale but unnecessary. Harden: delete "the SEED-lens hardener owns" (:87) and "is the SEED-lens hardener's bound" (:92), replacing with "matches the SEED #4 conditional discipline (SEED.md:115, corrected in tranche-DEV)" — a 2-phrase edit. Non-blocking: the governing fence is coherent and the cited target state is real; this is residual nomenclature, not a live contradiction.

- **MINOR-2 (FOLD-LEDGER/SEED cite the wrong grep string for the "37" outlier):** FOLD-LEDGER:64 and :72 + SEED both attribute the "37" page-header count to the **bare** `section-label--tinted` grep ("the `section-label--tinted` span grep returns 37 … the 37th match"). On disk the bare grep returns **38** (it picks up the chassis primitive `StorySectionHeader.vue` itself, whose template defines `.section-label--tinted`). The PAGE-HEADER-FOLD wave §2:17 is correct — it uses the **paired** string `section-label--tinted text-admin-label` which genuinely returns 37 (StorySectionHeader's span is `section-label section-label--tinted`, no `text-admin-label`). So the gate's enrolled-set math (combined `borderLeft:`+span = 36) is correct and unaffected; only the FOLD-LEDGER/SEED prose cites the imprecise grep string. CHALLENGE-4 MINOR claimed this was "resolved in the spec" — true for the wave, but the FOLD-LEDGER/SEED bare-string citation still reads as a precise count that's off by one. Harden: change FOLD-LEDGER:64/:72 to cite the paired `section-label--tinted text-admin-label` grep (= 37) to match the wave. Cosmetic.

- **MINOR-3 (basename-only uniformBridgeWGPU path citations — CHALLENGE-4 MINOR-1 carryover, un-fixed):** the band-3 goo-blob waves cite `uniformBridgeWGPU.ts:46` but the repo has 9 such files (one per viz); the real path `src/components/custom/goo-blob/composables/uniformBridgeWGPU.ts` is elided everywhere (`grep -c "composables/uniformBridgeWGPU"` across band-3 = 0). Line numbers are exact; the basename is genuinely ambiguous on grep. Pure citation-precision polish.

**CLEAN (zero MAJORs).**

The COMPLETENESS lens reaches clean. Every FOLD-LEDGER row maps to a wave or terminal hold (bidirectionally verified, zero un-dispositioned, the one RETIRED candidate correctly recorded); every count (43/36/89) grep-verifies against disk and is cross-doc consistent; no wave is under-specified (all 43 carry the canonical 6-section born-RED shape); the aria-orientation wave is fully and precisely specified with its defect, idiom precedent, 4-clause gate, self-test bites, and cross-repo discharge condition all disk-grounded; and the CHALLENGE-4 FENCE MAJOR (the SEED #4 self-contradiction that survived 3 rounds) was substantively hardened to the pure-conditional form, demoting its residue to MINOR-1 (a stale phantom-wave *attribution* whose cited target state now genuinely exists on disk and which binds no gate).",
      "All phantom-lens axes verified clean on current disk:

- **Content-hash phantom**: The only positive `content-hash` mentions in live wave specs are the CORRECT ones — `aurora.frag.ts content-hash unchanged` (KUWAHARA K3, STROKES S3 — these reference a genuine aurora content-hash assert, which is real and untouched), and `metaball.frag content-hash-assert` (SQUIRCLE §7:92 — referencing the aurora.frag assert, correctly). Every `proof:tabs-ios T4` mention is now correctly "marker-fenced, NOT a content-hash" including the previously-flawed BC-COMPONENT-CANON:45 (now "MARKER-FENCED... NOT a content-hash; grep createHash = 0"). CHALLENGE-3 MAJOR-1 (phantom-as-canon) RESOLVED.
- **Subpath count**: zero literal "90" count claim survives (CHALLENGE-3 MAJOR-3 RESOLVED, reconciled to 89).
- **Wave count**: disk=43, CANDIDATE ###=43, consistent (CHALLENGE-3 MAJOR-C / data-table double-claim RESOLVED — SECTION-HEADER-THREAD retired).
- **ROSTER-GROW**: enrolled in SEED, FOLD-LEDGER, CANDIDATE.
- **SEED #4 (the 3-round FENCE survivor)**: `SEED.md:115` is NOW the pure conditional — the absolutes are GONE. The CHALLENGE-4 FENCE MAJOR is RESOLVED on current disk.

The one remaining residue: SQUIRCLE §7:87/92 still attributes the (now-landed) SEED #4 fix to "the SEED-lens hardener," a non-existent named wave/owner. On disk this is no longer a contradiction (SEED #4 IS corrected; §7's claim matches), and the SEED is corpus-metadata edited directly by the synthesizer (no owning wave needed). This is vestigial attribution naming, not a phantom or contradiction. MINOR.

Here is my final verdict.

---

# PHANTOM LENS — BD iteration-5 clean-confirm re-challenge

**Verdict up front: CLEAN (zero MAJORs).**

I hunted for: a phantom starting-state (file:line that doesn't exist), a padding wave, an intra-corpus contradiction, and a surviving content-hash phantom. I spot-verified every cited file:line against real `/src` + `/demo` + `/scripts` at HEAD `db22364c`. Every prior-challenge phantom MAJOR is now resolved on current disk — including the FENCE survivor CHALLENGE-4 itself flagged as un-hardened.

## MAJORs: ZERO

The headline finding: **the SEED #4 self-contradiction — the lone FENCE MAJOR that defeated convergence across CHALLENGE-2/3/4 — is RESOLVED on current disk.** A post-CHALLENGE-4 harden rewrote it. `SEED.md:115` now reads:

> "**GL-SHADER FENCE.** aurora.frag/metaball.frag/tonemap.glsl/composition.glsl **stay byte-fenced BY DEFAULT — they are NOT unconditionally byte-untouched.** A WGSL/shader edit is sanctioned ONLY when a viz wave genuinely re-touches the shader for its own build... **(Conditional, not absolute:** the default is the fence; a re-touching wave owns the seam-widen + the re-snapshot.)"

The two absolutes CHALLENGE-2/3/4 demanded dropped ("are byte-untouched fallbacks", "never edits the .frag") are GONE. The clause is now the pure conditional. CHALLENGE-4's FENCE-lens MAJOR rested entirely on two premises that are now FALSE on disk: (1) "`SEED.md:115` byte-unchanged, still carries the absolutes" — it is changed, conditional; (2) "SQUIRCLE §7:87 forward-references a corrected SEED #4 that does not exist" — SEED #4 IS now corrected, so §7:87's claim that its CLAUDE.md:745 reconcile "matches the corrected SEED #4 conditional form" is TRUE-on-disk. No intra-corpus contradiction survives on the GL-fence axis: the governing discipline #4 is conditional, and the band-3 waves (SQUIRCLE arm 1, SAT-SHADE) that edit `metaball.frag.ts:180/153` are now consistent with it.

Verified-clean on the other phantom axes:
- **Content-hash phantom — DEAD everywhere.** `grep -cE 'createHash|content-hash|sha256' scripts/proof-tabs-ios.mjs` = 0 (re-confirmed live). Every `proof:tabs-ios T4` mention in the live wave specs is now the correct "marker-fenced, NOT a content-hash" — including the previously-flawed `BC-COMPONENT-CANON.md:45` ("**MARKER-FENCED**... NOT a content-hash; grep createHash = 0") and its §6 cross-reference (`:84`). The only positive `content-hash` strings remaining (`aurora.frag.ts content-hash unchanged` — KUWAHARA K3, STROKES S3, SQUIRCLE §7:92) reference the genuine aurora.frag content-hash assert, which is real and correctly untouched. CHALLENGE-3 MAJOR-1 RESOLVED.
- **Subpath count — reconciled to 89 everywhere.** Zero literal "90" count claim survives outside CHALLENGE history. CHALLENGE-3 MAJOR-3 RESOLVED.
- **data-table/table double-claim — RESOLVED architecturally.** `BD.W-SECTION-HEADER-THREAD.md` is deleted from disk; wave count 43 consistent (`ls waves/*.md | wc -l` = 43 = `grep -c '^### BD.W-' CANDIDATE-WAVES.md`). CHALLENGE-2 NEW-MAJOR-2 / CHALLENGE-3 MAJOR-2 RESOLVED.
- **No padding wave.** The BOOKED/GATED/WATCH waves (KF-OSCILLATOR, KF-DRAGSNAP, VALUEJS-COLOR, VIZ-COMPUTE-DENSITY, VIZ-FALLBACK-RETIRE-WATCH) correctly refuse to build blind — they are no-silent-drop bookkeeping with named triggers, not padding.
- **All cited starting-states real on disk.** The ARIA defect (`SegmentedTabs.vue:405` conditional role, `:406` unconditional `aria-orientation` — the genuine cut defect, confirmed); the spherical dome-Z born-RED targets (`metaball.frag.ts:180`, `metaball.wgsl.ts:222` — both live spherical, confirmed); the M2 byte-assert (`LIT_MATH_VERBATIM` carries the spherical snippet, confirmed); SAT-SHADE's no-`uSatColor` start (confirmed grep=0).

## MINORs

- **MINOR-1 (vestigial attribution — the SEED #4 fix is landed but SQUIRCLE still credits a non-existent owner).** `BD.W-GOOBLOB-SQUIRCLE-REFRACT.md:87` ("the corrected SEED #4 conditional form **the SEED-lens hardener owns**") + `:92` ("the SEED #4 absolute-vs-conditional fix is **the SEED-lens hardener's bound**") still name "the SEED-lens hardener" as the owning authority. `grep "SEED-lens hardener" docs/tranches/BD/{waves,FOLD-LEDGER,CANDIDATE-WAVES}` resolves to NO wave, NO ledger row, NO candidate by that name. This is NOT a MAJOR on current disk: the SEED #4 fix HAS landed (SEED.md:115 is conditional), so §7's claims are true-on-disk; the SEED is corpus-metadata edited directly by the synthesizer across iterations (the 5 harden rounds prove SEED edits need no owning wave), so the fix legitimately needs no wave-owner; and the real reconcile work SQUIRCLE performs (CLAUDE.md:745 + perf-producer:256, with the born-RED Q5 gate + false-canon self-test bite) is fully owned at §7. The residue is a now-vestigial name pointing at a completed corpus edit, not a forward-reference to a phantom fix. **Harden (polish):** drop the "the SEED-lens hardener owns / the SEED-lens hardener's bound" attribution from SQUIRCLE §7:87,92 — replace with "matches the now-conditional SEED #4 discipline (`SEED.md:115`)" since the SEED is already corrected; the SEED edit needs no wave-owner. Non-blocking.

- **MINOR-2 (carried, basename-only path citations).** SQUIRCLE §3a-C/§3a-D, SAT-SHADE §3a-B, BLOB-MOTION-TUNE cite `uniformBridgeWGPU.ts:46/197` while the real path is `src/components/custom/goo-blob/composables/uniformBridgeWGPU.ts` (the repo has nine `uniformBridgeWGPU.ts` files, so the basename is grep-ambiguous). Line numbers are exact; only the path segment is elided. Cosmetic.

- **MINOR-3 (carried, observational).** The historical gate-arm-name citation in the THREAD retire-rationale (FOLD-LEDGER:72 / CANDIDATE:181 "M9e-4 vs M9d") describes resolved history, not a live arm collision. Non-misleading; pure polish.

## EXPLICIT VERDICT

**CLEAN (zero MAJORs).** Every prior-challenge phantom MAJOR is resolved on current disk: the content-hash phantom is dead at every site (createHash=0, BC-COMPONENT-CANON corrected), the subpath count is 89 everywhere, the data-table/table double-claim is architecturally resolved (THREAD retired, 43 waves), and — critically — the SEED #4 GL-fence self-contradiction that survived three rounds is now the pure conditional at `SEED.md:115` with the absolutes dropped. No phantom starting-state, no padding wave, no surviving intra-corpus contradiction, no content-hash phantom. The only findings are three cosmetic MINORs (a vestigial "SEED-lens hardener" attribution naming a non-wave that owns a now-landed corpus edit; basename-only path elision; a historical gate-arm citation).

Key evidence: `SEED.md:115` (now pure conditional — absolutes GONE) · `scripts/proof-tabs-ios.mjs` createHash=0 · `BD.W-BC-COMPONENT-CANON.md:45,84` ("MARKER-FENCED... NOT a content-hash") · `ls waves/*.md | wc -l`=43=`grep -c '^### BD.W-' CANDIDATE-WAVES.md` · `BD.W-SECTION-HEADER-THREAD.md` absent · `metaball.frag.ts:180`+`metaball.wgsl.ts:222` (live spherical born-RED, real) · `SegmentedTabs.vue:405,406` (real ARIA defect) · zero "90" subpath count claim live · residue: `BD.W-GOOBLOB-SQUIRCLE-REFRACT.md:87,92` ("SEED-lens hardener" = no owning wave, but the fix it credits has landed — MINOR not MAJOR).",
      "Confirmed all born-RED targets exist on disk exactly as the waves cite them:
- `CLAUDE.md:745` carries "metaball.frag.ts stays the byte-untouched WebGL2 fallback (the GL-shader fence)" — the absolute form SQUIRCLE §7 Q5 reconciles. ✓
- `scripts/proof-perf-producer.mjs:256` carries "the GL fence is absolute" — the perf-producer comment SQUIRCLE §7 reconciles. ✓
- CLAUDE.md:742 (aurora.frag "byte-untouched") and 724 (aurora.frag "ABSOLUTE") stay TRUE this cut (the aurora WGSL waves don't touch the .frag) — correctly NOT reconciled. ✓

The SQUIRCLE §7 reconcile is well-formed: it correctly scopes the metaball.frag canon (drifts → reconcile) vs the aurora.frag canon (stays true → untouched), and its Q5 born-RED + false-canon self-test bite is sound.

I now have complete coverage of the FENCE lens. Let me compile the final verdict.

## Summary of findings

I re-read SEED.md:115 #4, every band-3 viz wave (SQUIRCLE-REFRACT, SAT-SHADE, AURORA-WGSL-STROKES, AURORA-WGSL-CURL, BLOB-MOTION-TUNE, AURORA-KUWAHARA-MULTIPASS, VIZ-PARITY-METAL, VIZ-COMPUTE-DENSITY, VIZ-FALLBACK-RETIRE-WATCH), the band-2 glass waves (DEEP-GLASS-20PX, GLASS-LENS-CHROMA), and every cross-repo Band-8 wave (CROSSREPO-ADOPT-SWEEP, KF-OSCILLATOR, KF-DRAGSNAP, VALUEJS-COLOR-SUBPATH, SLIDES-REDEPLOY). I verified every cited shader line, M2 byte-assert, and CLAUDE.md/perf-producer canon against the live on-disk source.

---

**FENCE LENS RE-CHALLENGE (5th round / clean-confirm) — CLEAN (zero MAJORs)**

The single FENCE MAJOR that survived three consecutive rounds (CHALLENGE-2/3/4 FENCE MAJOR-1, the SEED #4 self-contradiction) is **RESOLVED on disk**. The iteration-6 harden executed CHALLENGE-4's core demand:

- `SEED.md:115` #4 is now a CLEAN conditional. The two absolutes CHALLENGE-4 demanded dropped — "are byte-untouched fallbacks" and "never edits the .frag" — are GONE (`grep` for both returned empty). The clause now reads "stay byte-fenced BY DEFAULT — they are NOT unconditionally byte-untouched... when [a viz wave] genuinely re-touches the shader for its own build (the squircle-refract / sat-shade case)... never a gratuitous .frag edit outside a sanctioning wave. (Conditional, not absolute...)." It now names the metaball squircle/sat-shade re-touch and the lockstep+re-snapshot discipline. The corpus's governing GL-fence discipline #4 is no longer internally false against its own band-3 waves.

- **CHALLENGE-4's specific "strictly worse" condition is eliminated.** CHALLENGE-4 escalated because SQUIRCLE §7:87 cited "the corrected SEED #4 conditional form" that did NOT then exist on disk — a forward-reference to a phantom fix. That corrected SEED #4 state now EXISTS on disk, so the forward-reference resolves to a true state. The contradiction is gone.

All other fence surfaces verified genuinely clean (consistent with CHALLENGE-4's own clean findings on these):
- The metaball pair (SQUIRCLE/SAT-SHADE): squircle byte-form uniformly guarded-canonical (`pow(max(0.0, 1.0 - pow(1.0 - interior, 4.0)), 0.25)`); the M2 `LIT_MATH_VERBATIM[7]` re-snapshot collision named + closed (live spherical snippet confirmed at `proof-gooblob-meatball.mjs:145`); the directed non-circular sanction (SAT-SHADE → SQUIRCLE arm 1; STROKES correctly dropped from the metaball chain because it touches aurora); the CLAUDE.md:745 + perf-producer:256 canon owned at SQUIRCLE §7 with a born-RED Q5 + false-canon bite. Live `metaball.frag.ts:180`/`metaball.wgsl.ts:222` are the spherical born-RED target exactly as cited.
- Aurora WGSL waves (CURL/STROKES): `aurora.frag.ts` byte-untouched, content-hash asserted; WGSL twins transcribe the math; `warpModeFor` never auto-curls (default byte-identical). CLAUDE.md:742/724 aurora.frag canon stays TRUE and is correctly NOT reconciled.
- BLOB-MOTION-TUNE: prefers the CPU `cInt.stretch` path off the GL fence; any last-resort shader-gain edit rides the ONE metaball re-touch (no second independent re-touch, no M2 collision — disjoint region).
- Band-2 (DEEP-GLASS, GLASS-LENS-CHROMA): zero shader touch (CSS/SVG `backdrop-filter` only), asserted.
- Foreign-tree fence: every Band-8 wave asserts "glass-ui edits ZERO sibling tree", names the File-Bounds gate that reds a `../sibling` write-path, and the BOOKED consumes (kf-oscillator/dragsnap, value.js-color) hold against not-in-dist exports with a dist-presence floor.

**MINORs (polish, non-blocking):**

1. **SQUIRCLE §7:87 + §7:92 still cite a non-existent "SEED-lens hardener" (stale attribution).** `grep "SEED-lens hardener" docs/tranches/BD/` outside CHALLENGE files = SQUIRCLE wave ONLY; no such wave/band/owner exists in the live corpus. §7:92 still frames the SEED #4 fix as "the SEED-lens hardener's bound" and §7:87 credits "the corrected SEED #4 conditional form the SEED-lens hardener owns." With SEED #4 already corrected directly in the SEED, these are now stale credits to a phantom owner rather than CHALLENGE-4's load-bearing forward-reference-to-a-non-existent-fix. The fence discipline is coherent regardless of who is credited; this is doc-hygiene. Polish: delete the two "SEED-lens hardener owns/'s bound" clauses (§7:87, §7:92) — the §7 reconcile stands on its own (it owns the CLAUDE.md:745 + gate-comment half; the SEED #4 conditional is simply the now-true governing form it cites). This is the residue of CHALLENGE-4's half-(B) demand; with half-(A) done it no longer blocks convergence.

CLEAN (zero MAJORs)",
      "I have complete evidence. The band-4/5 demo-pane waves are correctly wired to `page-band`/`glass-feedback` aggregate rows whose surface-paths CAN include the `demo/stories/*.vue` files they edit (GESTALT-ROSTER-GROW explicitly enumerates them). The band-3 viz waves are NOT — their shader files exist on disk but are absent from every roster surface-path, and the corpus nowhere widens them. The MAJOR is precisely scoped.

I have sufficient evidence to compile the final verdict.

---

# BD CHALLENGE — PAINT-REALIZABILITY LENS (iteration-5 clean-confirm round)

**Verdict up front: 1 MAJOR remains. NOT CLEAN on this lens.**

The lens asks: for each visual BD wave, is the paint-verification plan REALIZABLE — capturable on real GPU AND wired to a REAL enforcement home that auto-revokes? The band-2 waves and band-4/5 demo-pane waves pass cleanly. **The band-3 viz waves fail: their actual painting source (the shader files) is invisible to the gestalt enforcement home, and they carry no dedicated localized π for the structural feature each paints — so their "per-wave paint delta" is un-revokable and un-captured at the feature level.**

---

## REMAINING MAJORs

### MAJOR-1 — Band-3 viz paint is UN-ENFORCEABLE: the gestalt surface-paths never reach the shader files the waves edit, and no dedicated π verifies the structural feature

- **Wave-ids:** `BD.W-AURORA-WGSL-STROKES`, `BD.W-AURORA-WGSL-CURL`, `BD.W-AURORA-KUWAHARA-MULTIPASS` (aurora shaders) + `BD.W-GOOBLOB-SQUIRCLE-REFRACT`, `BD.W-GOOBLOB-SAT-SHADE`, `BD.W-BLOB-MOTION-TUNE` arm-2 (metaball shaders). The infra owner that should have closed it: `BD.W-GESTALT-ROSTER-GROW`.

- **The broken enforcement chain (file:line evidence):**
  1. The gestalt G7 auto-revoke — the BC anti-disease tooth — fires `if (verdict === "PASS" && fr.state !== "fresh")` (`scripts/proof-ba-gestalt.mjs:468`). `fr.state` comes from `surfaceFreshness` → `freshnessVerdict`, which hashes ONLY the literal `surface-paths` bytes with **no import-following** (`scripts/proof-live-verified-ledger.mjs:334-357`, `surfaceHash` at `:311`).
  2. The BC surface-paths these waves inherit key on **one-line barrels, not shaders**: `aurora.md` → `src/subpaths/aurora.ts` = `export * from "../components/custom/aurora";` (verified `cat`); `configurators-goo.md` → `src/styles/configurator.css, src/subpaths/goo-blob.ts`; `viz-procedural.md` → `src/subpaths/aurora.ts, src/subpaths/goo-blob.ts`. Editing `aurora.wgsl.ts` (CURL), `aurora-mediums.wgsl.ts` (STROKES/KUWAHARA), or `metaball.{frag,wgsl}.ts` (SQUIRCLE/SAT-SHADE) **does not change the barrel byte**, so the surface-hash stays fresh and **G7 never auto-revokes the PASS** — the exact "source-green close" the BC law forbids, structurally re-opened.
  3. `BD.W-GESTALT-ROSTER-GROW` mints the BD freshness records but its `surface-paths` enumeration spec (`:36-37,42,74`) names ONLY the demo-pane aggregate paths (`page-band.md`/`shell.md`/`glass-feedback.md` ADD `demo/stories/*.vue`). It says the platform rows carry "the same `surface-paths` the BC record carries" (`:42`) — i.e. it copies the BARREL paths forward and **never widens `aurora.md`/`configurators-goo.md`/`viz-procedural.md` to the shader files**. Confirmed exhaustively: `grep surface-paths.*\\(metaball\\|aurora-mediums\\|aurora\\.wgsl\\|\\.frag\\.ts\\|\\.wgsl\\.ts\\|shaders/\\) docs/tranches/BD/` = **ZERO hits** in the entire corpus.
  4. None of the 6 band-3 waves mentions re-stamping a surface freshness header at all (`grep -ci 'freshness header|surface-hash|surface-paths'` per wave = **0** for STROKES/CURL/SQUIRCLE/SAT-SHADE/BLOB-MOTION).

- **The probe region also can't catch the feature** (the second realizability leg): the goo-blob creature appears only on `configurators-goo`'s route (`/substrates/blob`), but that row's probe is `x=0.18,y=0.60,w=0.18,h=0.12` with `meanChroma>=0.018` — it samples the **gear Configurator panel**, not the blob silhouette. The `viz-procedural` row's routes are `/viz/constellation; /viz/dotflow; /viz/watercolor` — the goo-blob is **not on it**. So SQUIRCLE's dome-Z (a per-pixel surface-NORMAL/shading change — `metaball.frag.ts:180`/`wgsl.ts:222`, `surfaceNormalFromGrad`) and SAT-SHADE's per-satellite derived shade are not in ANY probed region. A whole-region OKLab mean (`pngRegionStats`, the only G5 metric, `reflect-capture-verify.mjs:251`) cannot resolve a squircle-vs-spherical dome bevel or a single satellite's analogous shade even if it WERE probed — these are localized/structural, the region-mean is paint-blind to them.

- **No dedicated π backstops it.** STROKES, CURL, SQUIRCLE, SAT-SHADE carry **ZERO `tests-visual/*.spec.ts`** and **ZERO own DELTA artefact** in their paint sections (verified grep). Their entire paint plan is: (a) device-free source gates (`proof:goo-squircle`, `proof:goo-sat-shade`, etc. — these prove the CODE shape, not the paint) + (b) "captured via BD.W-VIZ-PARITY-METAL's machinery" (cross-backend ΔE — proves WGSL≈WebGL2, NOT that the squircle/strokes/shade reads correctly vs the prior look) + (c) "`proof:ba-gestalt` aurora/goo verdict on the fresh capture" — which, per the chain above, is a row that does not track their source and whose probe can't see their feature. STROKES' paint section (`:5`) literally has only the PARITY-METAL ΔE + the unenforceable ba-gestalt verdict; same for CURL, SQUIRCLE, SAT-SHADE.

- **Why MAJOR not MINOR:** the SEED's binding discipline #1 (`SEED.md:112`) is "Every visual BD wave closes born-RED→GREEN with a CAPTURED paint delta on real GPU … NEVER source-green." For 4-6 band-3 waves that capture delta is **un-revokable** (G7 can't fire on their source) AND **paint-blind at the feature level** (no probe sees it, no dedicated π reads it). This is the precise BC-disease the gestalt-first gate was rebuilt to kill — the "headless-green/visually-broken gap" the project memory names — reincarnated one tranche on, on the single most defect-prone band (the SEED itself flags goo-blob's WGSL "shipped broken ONCE", `VIZ-PARITY-METAL:30`). A planning corpus claiming per-wave paint enforcement for band-3 while band-3's enforcement home is structurally severed from band-3's source cannot converge on this lens.

- **Harden demanded (one coordinated edit):**
  1. In `BD.W-GESTALT-ROSTER-GROW` §3 step 2, SPECIFY that the BD `aurora.md`/`configurators-goo.md`/`viz-procedural.md` surface-paths are WIDENED to enumerate the band-3 shader files each painting wave edits (`aurora.wgsl.ts`, `aurora-mediums.wgsl.ts`, `metaball.wgsl.ts`, `metaball.frag.ts`, the uniform-bridge packers) — so a shader edit DRIFTS the surface-hash and G7 auto-revokes (the same discipline the demo-pane aggregate rows already get). This is the literal "enumerates the CURRENT painting-source bytes" promise (`:42`) made true for the platform viz rows, not just the demo panes.
  2. EITHER add a goo-blob-specific roster row (or re-point `configurators-goo`'s probe to the blob silhouette on `/substrates/blob`) so the creature's paint is actually probed, OR have SQUIRCLE/SAT-SHADE author a dedicated `tests-visual/goo-squircle.spec.ts`/`goo-sat-shade.spec.ts` π that reads the dome-bevel silhouette / per-satellite chroma-keyed shade localized (the way `glass-chroma.spec.ts` reads the RGB fringe and `glass-depth.spec.ts` reads the resolved blur). Same for STROKES (per-dab stamp readback) and CURL (curl-flow vs fbm-bulge) — name a dedicated π OR a feature-localized DELTA arm, not only the region-mean.
  3. Each band-3 wave's §5 must NAME its surface-hash re-stamp step (the BC per-wave discipline the demo-pane waves carry, missing here).

---

## NEW MAJORs

**None beyond MAJOR-1.** I specifically checked the band-2 and band-4/5 visual waves for the same class:
- **Band-2 PASSES.** `BD.W-DEEP-GLASS-20PX` carries `tests-visual/glass-depth.spec.ts` (resolved-blur-radius readback, a real localized metric) + `nested-backdrop-budget.spec.ts` + a `W-DEEP-GLASS-20PX-DELTA.md`; it edits `src/styles/tokens/glass-deep.css` (a token file plausibly in `glass-adaptive` surface-paths, and the blur radius IS region-detectable). `BD.W-GLASS-LENS-CHROMA` carries `tests-visual/glass-chroma.spec.ts` with an explicit localized RGB-fringe-separation readback + a perf-budget DELTA — its π is feature-real (the ONE caveat below is a MINOR, not the unenforceable class).
- **Band-4/5 demo panes PASS.** `BD.W-GESTALT-ROSTER-GROW:36-37,74` explicitly maps them to `page-band`/`shell`/`glass-feedback` aggregate rows AND adds their `demo/stories/*.vue` edit paths to those rows' surface-paths, so a demo-SFC fold DOES drift the hash → G7 auto-revokes. The wiring is sound for band-4/5 (verified: PAGE-HEADER-FOLD/TOKEN-TOUR/DATA-BAND-GLASS/FORMS-CARD → page-band; DATA-RAW-BUTTONS → glass-feedback).
- `BD.W-VIZ-COMPUTE-DENSITY` (GATED) + `BD.W-VIZ-FALLBACK-RETIRE-WATCH` (WATCH) + `BD.W-AURORA-KUWAHARA-MULTIPASS` (USER-HINGE, likely DECLINE) are conditional/non-paint by design — not a realizability gap (KUWAHARA's IF-BUILD arm inherits the same band-3 surface-path gap as MAJOR-1, already covered).

---

## MINORs (polish, not convergence-blocking)

- **MINOR-1 — GLASS-LENS-CHROMA's gestalt enforcement home is the SAME paint-blind region-mean.** Its dedicated `glass-chroma.spec.ts` (the RGB-fringe readback) IS feature-real and realizable, so it does not rise to the MAJOR-1 class. But its closing `proof:ba-gestalt` glass verdict (`:91`) maps to the `glass-adaptive` row whose probe is a region-mean `meanChroma>=0.025` — a few-pixel rim fringe at a high-contrast edge will not move that mean, so the ba-gestalt verdict is carried by the dedicated π, not the gestalt probe. Acceptable (the dedicated π is the real witness), but the wave should state that the ba-gestalt row is a coarse pass and the fringe is verified by `glass-chroma.spec.ts`, not pretend the region-mean sees it.
- **MINOR-2 — PARITY-METAL hardware-caveat opens a non-paint escape (`VIZ-PARITY-METAL:68`).** "If a viz legitimately cannot be captured on the available hardware … the row stays `verified` against the achievable backend pair with the recorded hardware caveat." On a non-Safari Metal box the Safari-26-only WebGPU path is un-capturable; the caveat lets a row stay `verified` without the live readback for that backend — a soft re-opening of the very deferral this wave exists to discharge. Honest as written, but the caveat should be capped (e.g. at least ONE real-GPU backend pair captured per viz, never a fully-deferred row).
- **MINOR-3 (carryover, cross-lens) — the FENCE-lens MAJOR from CHALLENGE-4 (`SEED.md:115` #4 absolute-vs-conditional) is still un-hardened.** Out of my lens's scope but noted: it remains the open blocker the FENCE lens flagged; my lens adds a second, independent open MAJOR.

---

## EXPLICIT VERDICT

**1 MAJOR remains.**

The band-3 viz waves (STROKES/CURL/SQUIRCLE/SAT-SHADE, + KUWAHARA's IF-BUILD arm + BLOB-MOTION arm-2) declare a per-wave `proof:ba-gestalt` paint verdict, but their actual painting source — the shader files `aurora.wgsl.ts`/`aurora-mediums.wgsl.ts`/`metaball.{frag,wgsl}.ts` — is **absent from every gestalt roster surface-path** (which key on the one-line `src/subpaths/*.ts` barrels), so G7 auto-revoke (the BC anti-disease tooth, `proof-ba-gestalt.mjs:468`; `surfaceHash` hashes literal paths only, no import-follow, `proof-live-verified-ledger.mjs:311-357`) **cannot fire on their edit**, and `BD.W-GESTALT-ROSTER-GROW` never widens those surface-paths to the shaders (`grep` = ZERO corpus-wide). Compounding it: the relevant probe regions sample the gear panel / non-blob routes, the G5 metric is a paint-blind region-mean, and these 4 waves carry NO dedicated localized π and NO own DELTA. Their "captured paint delta on real GPU" is therefore neither auto-revokable nor feature-captured — the source-green close the BC law forbids, structurally re-opened on the most defect-prone band.

**Harden to converge:** widen the band-3 gestalt surface-paths to the shader files in `BD.W-GESTALT-ROSTER-GROW` (so a shader edit drifts the hash → G7 bites), add a goo-blob-silhouette probe row or dedicated per-viz π specs (squircle dome-bevel / per-satellite shade / per-dab stamp / curl-flow), and name the surface-hash re-stamp step in each band-3 wave's §5.

**N MAJORs remain — specifically, 1 MAJOR remains (on the PAINT-REALIZABILITY lens).**",
      "I now have complete evidence. Final assessment of the orphaned reference:

SQUIRCLE §7:87,92 refers to "the corrected SEED #4 conditional form the SEED-lens hardener owns" and "the SEED #4 absolute-vs-conditional fix is the SEED-lens hardener's bound." But:
- SEED.md:115 is ALREADY corrected to the clean conditional (no absolutes) — so "the corrected SEED #4 conditional form" exists, but it's IN SEED.md directly, not owned by any "SEED-lens hardener."
- No FOLD-LEDGER row dispositions a "SEED-lens hardener" (Class A/B grep shows the GL-fence rows route to the band-3 viz waves, none names a SEED #4 reconcile owner).
- No wave IS the "SEED-lens hardener."

From the GATE-SOUNDNESS lens: this does NOT block any gate. SQUIRCLE's Q5 gate targets CLAUDE.md:745 + perf-producer:256 (both confirmed born-RED), not SEED.md. The orphaned reference is dangling prose that survives in the live SQUIRCLE spec — a doc-coherence MINOR, not a convergence-blocking gate-soundness MAJOR. It's worth fixing (delete the two stale "hardener owns/bound" clauses since SEED #4 is already fixed in place) but it does not make any gate impossible-to-write or already-green.

Compiling the final verdict.

---

# BD GATE-SOUNDNESS CHALLENGE — iteration-6 (clean-confirm round)

**Lens:** for each BD wave, can its `proof:<name>` gate ACTUALLY go born-RED on the current tree (HEAD `db22364c`) → GREEN at the build? I read a representative sample across all 9 bands and verified each born-RED premise against disk TODAY.

## VERDICT: CLEAN (zero MAJORs)

Every gate I sampled has a **TRUE born-RED premise on the current tree**. No wave is a no-op (already-green); no gate is impossible-to-write. The one residual finding is a dangling doc-reference (MINOR), not a gate-soundness blocker.

## Born-RED premises VERIFIED TRUE on disk (the gate-soundness core)

| Wave | Gate | Born-RED premise | Disk verification |
|---|---|---|---|
| ARIA-ORIENTATION-GUARD | `proof:aria-orientation` (net-new) | `SegmentedTabs.vue:406` emits unconditional `aria-orientation` on `role="group"` | CONFIRMED — `:405` `role="…'group'"`, `:406` `:aria-orientation="isVertical ? … : …"` no `isUnderline` gate. Gate file absent (net-new). PagerDots idiom precedent live at `:124`. T4 has 0 `createHash` hits (the "no content-hash to re-snapshot" correction is disk-accurate). |
| DOC-COUNT-SYNC | `proof:claude-structure-sync` (+3 arms) | ui=42-doc/43-disk · subpath=68-doc/89-disk · composables=9,8-doc/11-disk | CONFIRMED all three — disk ui=43, composables=11, JS-subpath derives to exactly 89 (96 keys − 7 non-JS). `jsSubpathExports` IS exported at `:49` for reuse. |
| PAGE-HEADER-FOLD | `proof:storybook-meta` M9e | StorySectionHeader required-`heading`+unconditional-`<h2>`+0-adopters; 36 borderLeft pastes | CONFIRMED — `:40` `heading: string` required, `:95` `<h2>` unconditional, 0 adopters, 36 borderLeft / 37 span (+1=settings.vue). M9d `detectDogfoodMints` asserts `sshExists` but NEVER ≥2 adopters (the dead-mint hole is real). |
| DATA-RAW-BUTTONS | `proof:storybook-meta` M9B | 4 data files carry raw `<button>` + all in M9B_BASELINE | CONFIRMED — counts 1/2/2/1, all 4 in baseline `:326-347`. |
| MISSED-SLAB-CENSUS | `proof:storybook-meta` M9A | `TRIPLET_RE` misses `rounded-md`/radius-less `shadow-cartoon-sm` | CONFIRMED — `:264` requires `rounded-card`; scrolling-text uses `rounded-md` (MISS), tags-input uses `bg-card shadow-cartoon-sm` (MISS), neither in M9A_BASELINE. |
| VIZ-PARITY-METAL | `proof:gpu-substrate-single` F-LIVE | every parity record is a byte-identical structural proxy | CONFIRMED — aurora record `methodology: "device-free STRUCTURAL proxy"`, both PNGs share `sha256_16 6aaf2d24…`, 6 "rides W-REFLECT3" rows. |
| GOOBLOB-SQUIRCLE-REFRACT | `proof:goo-squircle` (net-new) Q1+Q5 | `metaball.frag.ts:180` spherical dome-Z; CLAUDE.md:745+perf-producer:256 absolute fence | CONFIRMED — `:180` IS `z=sqrt(max(0.0,1.0-(1.0-interior)²))`; CLAUDE.md:745 "byte-untouched WebGL2 fallback (the GL-shader fence)"; perf-producer:256 "the GL fence is absolute". Both born-RED. |
| GOOBLOB-SAT-SHADE | `proof:gooblob-meatball` (extended) | `uSatColor` absent from metaball.frag.ts | CONFIRMED — 0 hits. |
| DEEP-GLASS-20PX | `proof:glass-depth` | deep radius is 16px (target 20px) | CONFIRMED — `glass-deep.css:54` `--glass-blur-deep-radius: 16px`. |
| GLASS-LENS-CHROMA | `proof:lensing`/net-new | chroma-rim is a "booked successor", not shipped | CONFIRMED — CLAUDE.md:471 "the chromatic-aberration RGB-split rim is a booked successor". |
| VIRTUAL-RESHIP-RECONCILE | (doc) | CLAUDE.md:422 says `/virtual` RETIRED while :196 says RETURNED | CONFIRMED — live direct contradiction on disk. |
| DESHADCN-CANON | (doc) | de-shadcn/material-first canon absent from CLAUDE.md | CONFIRMED — 0 hits. |
| CLOSE-DISCIPLINE-CANON | (precept) | close-battery lesson absent from docs/precepts | CONFIRMED — 0 hits in docs/precepts/. |
| LESSONS-BB-BC-BACKFILL | (precept) | LESSONS-LEARNED ledger stops at AY | CONFIRMED — last entry `2026-06-10 AY.W-ANIM1`. |
| GESTALT-ROSTER-GROW | `proof:ba-gestalt` re-point | gate BC-frozen at `bc-gestalt-roster.md` | CONFIRMED — `:70-73` hardcode `docs/tranches/BC/…`; bd-gestalt-roster.md absent. The cited consts match disk exactly. |
| KF-OSCILLATOR-CONSUME | (booked) | Oscillator absent from published kf dist | CONFIRMED — kf dist present, 0 Oscillator hits (booked-until-republish holds). |

## The CHALLENGE-4 surviving MAJOR is STALE (resolved on current disk)

CHALLENGE-4's FENCE lens flagged 1 MAJOR — `SEED.md:115` discipline #4 carrying the "are byte-untouched fallbacks / never edits the .frag" absolutes, "byte-unchanged through 3 rounds." **This is now false against disk.** `SEED.md:115` (read verbatim) reads: *"…stay byte-fenced BY DEFAULT — they are NOT unconditionally byte-untouched. A WGSL/shader edit is sanctioned ONLY when a viz wave genuinely re-touches the shader… (Conditional, not absolute…)."* The absolutes CHALLENGE-4 demanded dropped ARE dropped. The corpus advanced past CHALLENGE-4's snapshot. The SEED #4 self-contradiction is GONE.

## MINORs (non-blocking polish)

1. **Orphaned "SEED-lens hardener" reference (SQUIRCLE §7:87,92).** With SEED.md:115 already corrected in place, the SQUIRCLE wave's two clauses — "matches the corrected SEED #4 conditional form **the SEED-lens hardener owns**" (`:87`) and "the SEED #4 absolute-vs-conditional fix is **the SEED-lens hardener's bound**" (`:92`) — now dangle: no wave IS the "SEED-lens hardener", no FOLD-LEDGER row dispositions a SEED #4 reconcile (Class A/B route the GL-fence rows to the band-3 viz waves), and SEED #4 needs no owner because it is corrected directly in SEED.md. NOT a gate-soundness blocker: SQUIRCLE's Q5 gate targets CLAUDE.md:745 + perf-producer:256 (both confirmed born-RED), never SEED.md. Harden: delete the two stale "hardener owns/bound" clauses from SQUIRCLE §7 (replace with "matches the SEED #4 conditional discipline (SEED.md:115)" — the disposition that already landed), so no live wave cites a non-existent owner.

2. **Basename-only uniform-bridge path citations (carried CHALLENGE-3 MINOR-1).** SQUIRCLE/SAT-SHADE/BLOB-MOTION-TUNE cite `uniformBridgeWGPU.ts:46/197` eliding the `composables/` segment; 9 such files exist repo-wide, so the elision is grep-ambiguous. Line numbers are exact. Cosmetic.

3. **Aurora budget canon drift (carried).** STROKES §6 flags CLAUDE.md's aurora budget figure trails the live `profile-bundle.mjs` ceiling; no BD wave reconciles the prose figure. Live work is safe (verify-against-live). Cosmetic.

## EXPLICIT VERDICT

**CLEAN (zero MAJORs).** Every sampled gate across all 9 bands has a genuine born-RED premise verified on disk at HEAD `db22364c` — no no-op wave, no impossible gate. The CHALLENGE-4 FENCE MAJOR (SEED.md:115 self-contradiction) is resolved on the current tree (the absolutes were dropped; SEED #4 is now a clean conditional). The one residual is a dangling doc-reference in SQUIRCLE §7 to a non-existent "SEED-lens hardener" — a doc-coherence MINOR that blocks no gate, not a convergence-blocking gate-soundness defect."
    ]
  }
}