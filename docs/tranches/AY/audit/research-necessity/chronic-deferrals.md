# chronic-deferrals — research-necessity audit (the TRENDS lane)

**Lane** chronic-deferrals · **Date** 2026-06-09 · **Branch** tranche/AY (`at-dock-convergence`)
**Verdict: REFINE-FROM-EXISTING** — no fresh external research pass is warranted. This lane's
question ("what classes of work chronically slip, why, and what stops each") is a process-archaeology
question whose entire evidence base lives inside the repo, and the corpus has ALREADY answered it
twice: `H-chronic-defer.md` is a completed dedicated research pass on exactly this topic, and
`AY.W-CARRY.md` is a fully-authored remediation spec with the gate-extension code pre-written.
What remains is EXECUTION (land W-CARRY, deepen the capture gate, build the named-but-unbuilt
slides gate) plus the refinements divined below. A third research pass over the same ledgers
would be churn — the canonical re-producing-a-doc-instead-of-landing-the-fix anti-pattern this
very lane indicts (AUDIT-LEDGER "Fourier W43: the path-forward exists TWICE").

---

## §1 — The existing corpus (complete; no gaps a web search could fill)

| Doc | What it settles |
|---|---|
| `docs/tranches/AY/audit/hardening/H-chronic-defer.md` | The dedicated 30-lane hardening pass on this lane's exact question. §1 names 9 chronic classes (A–I) with tranche-depth + slip mechanism + landing wave; §2 the gate coverage hole (3-of-~25); §3 the stale-label vector; §5 six convergence criteria; §6 wave-spec inputs. |
| `docs/tranches/AY/waves/AY.W-CARRY.md` | The fully-authored fix: §1 D1–D4 verified defects, §3 the manifest JSON + the completeness-clause code COPY-IN-READY, §6 the 47-row ledger→disposition reconciliation table already drafted. |
| `docs/tranches/AT/audit/W0-L4-deferred-chronic-ledger.md` §3 | The gold-standard 47-row HEAD-verified deferral inventory (BOOK/KILL/USER-DOMAIN/AT-WAVE vocabulary) — the format every re-ground since has copied. |
| `docs/tranches/AY/audit/hardening/H-cardinal.md` | The capture-debt class dissected: 4 holes in `proof:live-verified-ledger` (complete-exempt, AX-hardcoded, slides-absent, shallow binding) + the backfill table. |
| `docs/tranches/AY/audit/hardening/b2/*.md` | The freshest live instances: B2-con1 F2/F3 (fabricated "mobile" PNGs), B2-blob F1/F2/F3 (god-module growth + non-demonstrative mood frames), B2-dock F1/F2 (zero W-DOCK2 PNGs; GREEN never exercised on the real dock), B2-ff F5/F6 (cross-repo dup deferred; self-justifying consumer), B2-readiness §1 (5-of-8 specs stale at HEAD — the spec-frozen-under-landing-lanes trap). |
| `docs/tranches/AY/audit/AUDIT-LEDGER.md` | The re-grounded ledger + the corrected 10-entry "Chronically-deferred" register. |
| `docs/tranches/AY/audit/MASTER-RECAP-2026-06-09.md` §B | The RG-debt telemetry roster ("all RG-noted on the board... none silently carried"). |
| `docs/tranches/AX/PROGRESS.md:269-283` | The founding relapse artefact: items 16/17/18 promised as register rows inside the wave (W62) that built the anti-relapse gate — never written. |
| `docs/tranches/AY/EXECUTION-DAG.md` §1/§2 | The ordering mechanics: E12 (W-CARRY → W-CLOSE1), E13 (content → W-GOD1), the publish→re-pin→adopt chain that explains the 4-tranche constellation slip. |

## §2 — As-built state at HEAD (verified live, not quoted)

- `docs/tranches/AX/audit/DISPOSITION-REGISTER.json` — **still 3 items** (`native-drawer-as-asChild`
  book, `panel-host-primitive` + `interruptible-reorder` archived). The ~22-row BOOK onboarding has
  NOT happened.
- `scripts/proof-disposition-live.mjs` — **175 lines, NO completeness clause** (grep `MANIFEST|uncovered`
  = 0). `docs/tranches/AY/audit/deferred-ledger-manifest.json` — **does not exist**. W-CARRY is
  `planned` (PROGRESS.md:95) and entirely un-landed. CI wiring intact (`ci.yml:222-223`,
  `package.json:699`).
- `scripts/proof-ay-w0-reground.mjs` — **EXISTS** + wired (`package.json:588`); the B2-readiness §3.1
  "phantom gate" finding is CLOSED at HEAD (W0-REGROUND landed its gate after that audit ran).
- `proof:live-verified-ledger` — tranche-parameterized + `complete`-allowlist + own-surface
  filename match + {light,dark} pair floor ALL landed (`scripts/proof-live-verified-ledger.mjs:2,63,115-145`;
  `package.json:697` `--tranche=AY`). H-cardinal holes #1/#2/#4 are substantially closed. **The
  residual hole: no PNG-dimension assertion** — grep `IHDR|dimension` = 0 — so a desktop screenshot
  named `-mobile-` still passes (see §3 class E).
- `scripts/proof-no-bespoke-constellation.mjs` — **NOT BUILT** (named hard gate, spec'd copy-in-ready
  at `AY.W-CON3.md §5`, still no script). The slides repo still has zero carry-closure gate.
- `proof:no-god-module` — `package.json:638`, **absent from `ci.yml`** (local-only, exactly as
  AUDIT-LEDGER §A row 2 states). RED at HEAD with 4 violators.
- The four RG debts, live-checked: **W-DOCK2 own-surface PNGs = 0 on disk** (debt OPEN);
  **`W-CON1-refit-mobile-light.png` is still 1280×721** (debt OPEN — the fabricated-mobile file was
  never replaced); W-BLOB2 mood frames unchanged (debt OPEN; the in-flight W-BLOB3/finisher landed
  `W-BLOB3-blob-mood-*.png` which may partially discharge it — IN-FLIGHT, judge after the finisher
  settles); FF light-floor un-re-opened in source (W-FF2 §0 RG rides the perfecting pass).
- Counter-datum that the feedback loop WORKS: the in-flight `W-CON2-warp-mobile-light.png` is
  **314×421 — a real small-viewport capture**, landed AFTER B2-con1 F2 named the 1280×721
  fabrication. The hand-challenge → next-wave correction edge functions when findings are fresh.

## §3 — THE TRENDS: seven chronically-deferred CLASSES, the structural WHY, and the stopping mechanism

This is the lane's deliverable — the trend-grading rubric for the hand-challenge. Every class is
grounded in ≥2 instances across ≥2 tranches.

### Class A — Live-capture debt (the cardinal class; the #1 meta-chronic)
**Instances:** the 7 AX `dev-landed · live-pending` carriers; the 6 AX visual `complete`-exempt rows
(W05/W08/W15/W16/W17/W23 — W15 shipped `complete` with "Could NOT run a real browser" on record);
W-DOCK2 HG6 owed (zero PNGs at HEAD); W-CON1 fabricated mobile set; W-BLOB2 non-demonstrative mood
frames; W52 closing on neighbors' PNGs.
**WHY it slips (structural):** the capture needs a live device/GPU + a running dev server + a
serialized browser session — it cannot ride the parallel code-writing lanes, so it is always the
detachable LAST step; and the gate floor is presence-shaped (a real PNG referenced), so the cheap
counterfeit (any PNG, a neighbor's PNG, a desktop shot renamed mobile) passes while the expensive
true artefact (the capture OF THE CLAIM) is deferred.
**Mechanism status:** mostly built — W-CARDINAL-INFRA landed the tranche-param + allowlist +
filename-match + light/dark floor. **The remaining slip vector is semantic depth**: dimensions,
demonstrativeness (5 byte-distinct-but-visually-identical frames pass), and the green-on-real-surface
artefact (B2-dock F2). Stopping mechanism: (1) the IHDR dimension assertion (§5 R1); (2) the
"persisted GREEN artefact against the real surface" clause — a born-RED proof plus a synthetic-arm
GREEN is not a GREEN-on-the-real-thing (B2-dock F2's exact gap).

### Class B — Consumer-#2 / min-consumers BOOK backlog
**Instances:** the ~22 AT BOOK rows (icon-sm, clampLabel, tooltip-mono, select-size, spring-crisp,
metric-badge-icon, inline-edit, labeled-slider-readout, the 6 CSS-lever books, the 3 platform pilots,
demandPark, styles-split…) — individual rows at depth 5 (AN→AS); the blob DI seam (built for a
consumer that never arrived); `/fourier-math` (importer #1 is a self-written test, B2-ff F6).
**WHY:** the trigger lives OUTSIDE the repo (a sibling must adopt) and outside agent write-scope
(inv-16: glass-ui writes only glass-ui), so no in-repo wave can ever close it; and with the register
holding 3 of ~25 rows, no machine re-evaluates the other ~22 — they ride prose ledgers across
tranche boundaries by default.
**Mechanism:** `proof:disposition-live` is the right machine (self-proving, CI-wired) but is
data-starved. **W-CARRY is the complete, pre-written fix — un-executed.** Stopping rule: the
completeness clause (register = ledger-manifest mirror, unconditional, before the sibling skip)
makes a prose-only deferral structurally impossible to close over.

### Class C — Cross-repo re-points / publish-gated adoption
**Instances:** constellation-consume (slides H→I→K→L, 4 tranches); fourier-analysis still
byte-duplicating `fourierPositionsAt` (B2-ff F5); the slides caret `^3.9.0` re-pin; `/deck`.
**WHY:** double-gated on (a) a USER-DOMAIN hinge (the tag-push publish — agents never execute it)
and (b) a consumer-repo edit the wave cannot make; historically the publish→re-pin→adopt chain was
never sequenced INTO the adoption wave ("two words across two repos" — EXECUTION-DAG §1), so the
cross-repo edge had no owner on either side.
**Mechanism:** the DAG §1 chain now sequences it (steps 4–5 explicit). Two pieces still missing:
`proof:no-bespoke-constellation` (named, spec'd, **not built** — a carry-closure gate that is itself
deferred, H-chronic-defer §4) and the slides-side disposition register (folded to L.W7). Stopping
rule: every cross-repo deferral gets a machine row in the CONSUMING repo's register, born-RED, so
the next tranche's close re-evaluates it without human memory.

### Class D — God-module carves / structural refactors that chase moving targets
**Instances:** W-GOD1 `planned` while its targets GREW under it — constellationField 510→653 during
W-CON1 (B2-con1 F1), useMetaballRenderer →707 during W-BLOB2 (B2-blob F1), GlassDock 624,
SegmentedTabs 689; W-DOCK2 booked HG4 + §F2 + rail-persistence INTO W-GOD1 (the carve wave is
accreting other waves' hard parts).
**WHY (two-sided trap):** the correct ordering rule "carve AFTER content settles" (E13) doubles as
a free pass — every content wave may grow a violator with impunity because the gate is local-only
(not in ci.yml) and the carve is always downstream; meanwhile the carve spec's line-counts go stale
(W-GOD1 still grades constellationField at 510), so the carve itself needs a re-ground before it can
run — deferral begetting deferral.
**Mechanism (divined, §5 R4):** a RATCHET, not a cap — CI-promote `proof:no-god-module` with a
recorded per-violator baseline and fail any commit that INCREASES a violator's line count. The
carve still lands later; the growth stops now. Plus: any wave BOOKING work into W-GOD1 must update
W-GOD1's spec counts in the same change (the B2-con1 staleness rule).

### Class E — Mobile/device-fidelity verification
**Instances:** W-CON1 "mobile 375×667" PNGs that are 1280×721 page shots; slides mobile polish
(F→H→AX→L, 4 tranches — fix lands, stale capture re-opens it); the W-SCALE2 axe target-size harness
(named, never built — "a real axe harness, not a grep").
**WHY:** mobile truth needs correctly-driven viewport emulation, and NOTHING machine-checks that a
file named `-mobile-` was captured at a mobile viewport — the claim is encoded in the filename, the
truth in the pixel header, and no gate compares them. Per-defect capture sets also lack a manifest,
so "mobile pass" stays a blanket label that re-absorbs each new occlusion.
**Mechanism:** §5 R1 (dimension assertion) kills the fabrication vector outright; the L.W-MOB
manifest-bound per-slide capture-set pattern kills the blanket-label vector.

### Class F — User-judgment hinges
**Instances:** the slider design-intent contradiction (re-stated in every tranche corpus, closed
only when W-SLD1 forced resolution (b) as a user-directed decision); the feedback-coder honesty
audience-lock; G-4/G-5/G-6's book-or-retire disposition (W-CARRY.2 explicitly routes each to a
user-decidable fork).
**WHY:** the item needs a NAMED user decision; absent a decision-forcing artefact it re-enters each
tranche's recap as prose, gets re-discussed, and re-defers — the corpus grows while the state
machine doesn't move.
**Mechanism:** the decision-register pattern (slides `REFINEMENT-DECISIONS.md`; AX's user-decided
hinge commits): encode "awaiting-user-decision: <the exact question>" as a register disposition so
the close SURFACES the question instead of re-absorbing it. W-CARRY's `retired`+`successor` field
vocabulary already supports this — extend the disposition enum with `user-hinge` (§5 R3).

### Class G — Promise-inside-the-close relapse + ledger staleness (the meta-class)
**Instances:** AX PROGRESS:282 promised G-4/5/6 register rows INSIDE W62 (the anti-relapse-gate
wave) and never wrote them; the AY AUDIT-LEDGER shipped as a session-limit draft marking ≥6 shipped
features DEFERRED (caught by 6 independent lanes, fixed by W0-REGROUND); B2-readiness found 5-of-8
Batch-2 specs stale at HEAD because lane-mates landed underneath them; PROGRESS.md rows lagging
reality (W-CARDINAL-INFRA/W0-REGROUND read `planned` while their substance was landed — since
restamped).
**WHY:** doc-state and HEAD diverge whenever execution is concurrent or session-capped, and a
closure promise written in prose has no born-RED check — the register can fail to grow and every
gate stays green (the second-order hole: the closure mechanism has no closure check).
**Mechanism:** W-CARRY.3's completeness clause IS the closure-of-the-closure; the step-0
re-grep-every-cite mandate (the stale-worktree-trap MEMORY, inverted) for any spec executed after
its lane-mates land; and W0-REGROUND-as-standing-ritual — a batch-0 HEAD re-ground per tranche, now
precedented and gate-minted (`proof:ay-w0-reground` exists at HEAD).

**The cross-class signature:** every class slips for the SAME root reason — the expensive true
closure (a device capture, a sibling adoption, a user decision, a carve) is detachable from the
cheap gate-green close, and nothing machine-readable holds the detached half. Every working
mechanism in the set is the same move: convert the detached half into a born-RED machine row that
the NEXT close must re-evaluate. The corpus knows this; the gap is purely that 3 of the 5
mechanism-pieces (W-CARRY, the slides gate, the no-bespoke-constellation script) are specced and
unbuilt.

## §4 — Corpus vs as-built grading (the README analog)

This lane has no component README; the graded artefacts are the corpus docs against HEAD.

- `AY.W-CARRY.md` — **ACCURATE.** Every §1 claim re-verified at HEAD: register = 3 rows, script =
  175 lines/no clause, manifest absent, G-4/5/6 greps still 0. The spec is execute-ready as written.
- `H-chronic-defer.md` — **ACCURATE on the chronic inventory; 2 rows since-landed.** Its §5
  criterion 4 (ledger re-ground) is DONE (W0-REGROUND landed + gate minted); the AY-pathed cardinal
  gate it implies under criterion-adjacent text is DONE (`:697`). Criteria 1/2/3/5/6 remain open.
- `H-cardinal.md` — **STALE (deliberately — overtaken by W-CARDINAL-INFRA).** Holes #1/#2/#4 are
  closed at HEAD (complete-allowlist, tranche-param, filename-match + light/dark floor all in the
  316-line gate). Hole #3 (slides) remains. Its residual truth: no depth-of-pixel (dimension)
  assertion.
- `B2-readiness.md` — **STALE in one load-bearing spot:** §3.1's "phantom `proof:ay-w0-reground`"
  is now FALSE (`package.json:588` + script on disk). The §1 line-drift findings stand for any spec
  not yet re-grounded.
- `AY/PROGRESS.md` — accurate post-restamp for Batch ≤2; the in-flight finisher rows (W-CON2/3,
  W-DOCK3, W-SLD2, W-AUR2/PAINTERLY/WEBGPU) have DELTAs on disk ahead of their table rows — the
  same Class-G lag, mark for restamp at finisher-settle.

## §5 — Divined refinements (no research needed; file:line-grounded)

- **R1 — PNG-dimension assertion in the cardinal gate.** Extend
  `scripts/proof-live-verified-ledger.mjs` (the real-PNG check around `:115-145`) to parse the IHDR
  width/height (bytes 16–24) and assert: a basename containing `-mobile-` has width ≤ 500; a DELTA
  declaring "375×667" references ≥1 PNG at that width. Eight lines; would have mechanically caught
  B2-con1 F2 (`W-CON1-refit-mobile-light.png` = 1280×721, still on disk) and protects every future
  mobile claim. The self-test gains a synthetic wrong-dimension row.
- **R2 — Execute W-CARRY as written.** The manifest JSON (`AY.W-CARRY.md §3` — the 29 `bookIds`),
  the completeness clause (verbatim code at §3, inserts before the sibling skip in
  `proof-disposition-live.mjs:~100`), and the §6 reconciliation table are pre-authored. Born-RED
  witness available immediately (3 register rows vs ~22 ledger BOOK ids → `uncovered ≥ 19`).
- **R3 — `user-hinge` disposition in the register schema.** Add the disposition value alongside
  `book/archived/retired` in `DISPOSITION-REGISTER.json` + `proof-disposition-live.mjs`'s row
  reader (`:79-83` shape), carrying `question:` instead of `trigger:` — coverage-satisfying,
  never trigger-evaluated, surfaced verbatim in the gate artefact so every close re-prints the
  open user questions (Class F's mechanism).
- **R4 — the god-module RATCHET.** Promote `proof:no-god-module` (`package.json:638`) into
  `ci.yml` with a recorded per-violator baseline (`{useMetaballRenderer:707, SegmentedTabs:689,
  constellationField:653, GlassDock:624}`): RED if any file EXCEEDS its baseline or a new >500 file
  appears; the carve (W-GOD1) lowers baselines as it lands. Stops Class-D growth without inverting
  the E13 carve-last ordering. Companion rule: a wave booking work into W-GOD1 updates W-GOD1's
  spec line-counts in the same change.
- **R5 — build `scripts/proof-no-bespoke-constellation.mjs`.** Spec is copy-in-ready at
  `AY.W-CON3.md §5`; H-chronic-defer §4 names it "a carry-closure gate that is itself deferred."
  Sibling-skip honest (the `resolveSibling` machinery from `constellation.mjs` per the W-SLD2
  precedent). Born-RED today (the bespoke `slides/src/decks/til-briefing/constellation.ts` exists).
- **R6 — the GREEN-on-real-surface clause** (Class A, B2-dock F2): `proof:dock-animation-live`'s
  persisted artefact (`.cache/gates/AX-dock-animation-live.json`) must be `status:pass` against the
  real `/dock/overview` route — a born-RED synthetic plus prose is not a close. Generalize: any
  born-RED gate's close requires the persisted PASS artefact on the real surface, named in the
  DELTA.
- **R7 — restamp the in-flight PROGRESS rows at finisher-settle** + re-grade the four RG debts
  (W-DOCK2 PNGs still 0; W-CON1 mobile set still fabricated on disk; W-BLOB2 mood vs the new
  W-BLOB3 mood captures; FF light-floor) — the MASTER-RECAP §B "none silently carried" claim is
  only as true as this re-grade.

## §6 — Research gaps

**None.** Every open question in this lane is answerable from the repo's own ledgers, gates, and
captures (and was — §3 cites only in-repo evidence). There is no external SOTA for "how this
specific repo's deferral register should mirror this specific repo's ledger." The only
externally-flavored question ever adjacent to this lane (what a carry-closure register should look
like) was settled by the in-house `proof:disposition-live` design at AX.W62 and its hardening at
H-chronic-defer. Dispatching a fresh research lane here would itself be a Class-G instance:
re-producing the doc instead of landing the fix.

## §7 — Hand-challenge rubric feed (grade each wave against the trend classes)

For every wave under challenge, ask: (A) does its close detach a device capture, and does the DELTA
prove the CLAIM (dimensions, demonstrative frames, real-surface GREEN artefact) or just reference a
PNG? (B) does it mint substrate whose #2 consumer is out-of-repo, and is that trigger a register
row? (C) does it lean on a publish/sibling edit, and is the cross-repo edge a born-RED machine row
in the consuming repo? (D) does it grow a >500 file under the carve-last pass? (E) does any mobile
claim carry a machine-checkable viewport? (F) does it hide a user decision in prose? (G) does it
promise a future doc/register/gate row inside its own close — and if so, is that promise itself
gate-checked? A wave clean on all seven is trend-clean; any YES without the named mechanism is a
relapse-in-progress.
