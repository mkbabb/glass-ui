# Candidate-2 pre-freeze consistency audit 2

**Seat:** independent Sol x-high exact consistency audit  
**Audit pin:** 2026-07-22T01:20:39-0400  
**Verdict:** **DEFECT — CANDIDATE 2 IS NOT READY TO FREEZE**  
**Scope:** documentary pre-freeze audit only. No product, test, evidence, commit, receipt, existing
formation, freeze, archive, or workflow byte was changed. This report is the only repository write.

## 1. Exact repository and moving-tree pin

- Branch: `master`, 95 commits ahead of `origin/master` at the audit pin.
- HEAD: `626540adbe10fd84f47b8365977925a7fbd2e17a`.
- HEAD tree: `c96ac03d4afb06455cc35096933410b14df2966f`.
- Linear candidate-2 source ancestry was reproduced:
  `562db5c7` → `4442b451` → `2ad97ca1` → `44621bb4` → `bb33810c` →
  `f0d32d69` → `626540ad`.
- Final `git status --porcelain=v1` entry count and hashes are recorded in §8 after this report path
  exists. Existing source, tests, band files, evidence, receipts, and other addenda are foreign-owned
  moving-tree bytes. They were not modified by this audit.

Candidate 1's pins are historical: initial/freeze-0 `1be91765…`, candidate-1 re-pin
`562db5c7…`, normative digest `2b3f15c…`, and retained archive `candidate-1-normative.tar` with
SHA-256 `e1aeaf59…`. The live candidate-2 formation cursor is HEAD `626540ad…`; it is not a freeze.

## 2. Exact invariant results

| invariant | result | exact audit result |
| --- | --- | --- |
| roster arithmetic | **PASS** | `48 + 35 + 8 + 1 = 92`; the matrix contains exactly rows 1–92 once each |
| source classification | **PASS** | 22 `ST` rows + 69 other untouched/ASK/dependency classes + one `U+BE` IOS W-0 row = 92 |
| IOS cursor | **PASS** | W-0 remains source-untouched and banked at `1d0c17c6` with 6 PASS / 1 DEFER / 0 FAIL; W-1…W-7 are the remaining execution cursor and W-7 owns the deferred tail |
| conditional row | **PASS** | `BJ.W-IMMERSIVE-SCRIM` is not row 93 now; ASK-26 ADOPT keeps 92, DECLINE mints row 93 and forces arithmetic/refreeze |
| current source/acceptance truth | **PASS** | W7 is source/cascade/package-green but acceptance-red; W8 is source/build-green but integration/acceptance-red; `f0d32d69` is history and rejected; W2 `626540ad` is a narrow source/build subset and unified-contract/freeze-red |
| source-touched is not DONE | **PASS** | no matrix row or canonical addendum converts the 22 touched rows to DONE merely from a landing |
| Q safe-frame truth | **PASS** | manifest `2c5fee7796801dfe0f47b30470940f9f7f0be5caae3fa3980361026d2c07bb78` remains moving-tree RED discovery; `.99` blank settle and rail/heading overlap have no terminal dock-geometry credit because `state.dock=null`; no posture is authorized |
| Browser truth | **PASS** | report `0fe9a52d…` remains **BROWSER INFRASTRUCTURE RED / ZERO UI ACCEPTANCE**; real routes are `/forms/chip`, `/data/tags-input`, `/display/badge`, and `/navigation/tabs`; the 1440×900/390×844 matrix is still owed |
| Claude workflow truth | **PASS** | `wf_689ca3dc-541` remains pending at the inspected session EOF and its outputs remain implementation/source candidates; historical Opus labels are preserved but provide no Sol/Luna acceptance |
| W2 critic propagation | **PASS** | both `dd4ba2a4…` and `323008f5…` are present in the current challenge/implementation surfaces; selector loss, source-intent collapse, Atlas placeholder/transparent-canvas truth, missing representation, immutable package identity, and receiver repin remain RED |
| model-law head rule | **PASS with defect below** | the governing clauses correctly require declared Sol x-high for judgment and Luna x-high for bounded mechanical work; one stale prospective Fable sentence remains in the historical block |
| freeze/archive readiness | **DEFECT** | candidate 2 has no exact enumerated 16-file manifest/archive/digest recipe yet; the candidate-1 recipe is known incomplete for candidate 2 |

The row arithmetic was mechanically re-derived from `ROW-CHALLENGE-MATRIX.md`: `ROWS=92 ST=22
UBE=1 OTHER=69`, with no missing or duplicate row number.

## 3. ASK park reconciliation

The live ASK disposition is internally consistent except for the matrix slice notation defect in
§4 D3:

- active owner parks/slices are ASK-1…14 as individually routed, ASK-16's optional collapsed-tray
  slice, ASK-17's DOC-TRUTH comment slice, ASK-20's authority conflict, ASK-25, ASK-27, ASK-28…33;
- ASK-15 is superseded by ASK-32; ASK-18/19 are owner-resolved; ASK-21 is superseded by ASK-29;
  ASK-22 is discharged; ASK-23 is a standing offer; ASK-24 fired and was ruled;
- ASK-26 is a veto window and paint-lane decision, not an ASK park;
- ASK-33 is the live authority seat for REDUCTION W7, so the current class is `AP-33`, not
  `PARKED-UNROUTABLE`;
- V-PERCH is unparked, and GF-DOCK W7 remains separately ASK-14-parked.

## 4. Exact defects and required amendments

### D1 — Candidate-2 freeze/archive recipe is not exact

`CHALLENGES.md` correctly records the candidate-1 freeze-method defect and says candidate 2 must
include every dirty normative file, at minimum `waves/BAND-REDUCTION.md` and the new normative
addenda. `FREEZE-MANIFEST.md`, however, still contains only candidate 1's twelve-file order and
recipe. “At minimum” is not an exact canonical set and can repeat the omission class.

**Required amendment before freeze:** add a Candidate 2 entry only after bytes stabilize. It must pin
HEAD/tree, status/tracked-patch/untracked-path digests, every per-file SHA-256, an uncompressed archive
and archive SHA-256, and the ordered outer digest. The exact normative order for the present corpus is
the sixteen paths in §6. `FREEZE-MANIFEST.md`, `CHALLENGES.md`, this report, and the W2/W7/W8/browser/
Claude critic reports are audit metadata, not normative-digest inputs. Any normative edit after the
manifest invalidates the candidate and requires repin/refreeze; no exact-candidate audit may begin
before that artifact exists.

### D2 — REDUCTION W7's primary status still says the authority row is unminted

`waves/BAND-REDUCTION.md:764` presents the primary bold `Status` as “ASK-GATED ON AN UNMINTED ROW”
and ends “PARKED-UNROUTABLE.” Lines 765–767 immediately correct this historically, and every live
surface says ASK-33 now exists and W7 is `AP-33`. The adjacent dated bracket does not make the primary
machine/human status unambiguous.

**Required amendment:** make the primary status `UNION — AP-33 · PARKED PENDING OWNER MARK`; retain
the former unminted/`ASK A4` story only as explicitly historical evidence. Do not unpark W7 or infer
the recommendation as an owner decision.

### D3 — GF-DOCK W9 overstates the ASK-16 park

`ROW-CHALLENGE-MATRIX.md:82` classifies GF-DOCK W9 as `AP-16+DH`, while `ASK.md`,
`EXECUTION-PROGRESS.md`, and `INVENTORY.md` all say ASK-16 gates only W9's optional collapsed `+N`
tray slice. Other partial parks use `(s)`.

**Required amendment:** change the class to `AP-16(s)+DH`; leave its safe-frame/Atlas ScrollRoot
dependency and `D/D/A` challenge receipt unchanged. This notation cure does not change 22/69/1.

### D4 — The historical model block retains a prospective Fable offer

`EXECUTION-PROGRESS.md:32–48` is titled discharged and ends by saying the Sol/Luna supersession
prevents new launches, but lines 38–46 remain written as live future procedure: Fable-designated seats
“spawn as Opus,” and sealed waves “get a Fable re-challenge offered … once Fable returns.” That is a
prospective Fable/Opus instruction inside the current execution cursor, directly competing with the
otherwise-correct Sol/Luna law.

**Required amendment:** convert those sentences to past tense historical receipt only and strike the
future re-Fable offer. Preserve actual historic model labels; all future critique/rechallenge uses
declared Sol x-high and all bounded mechanical redress uses declared Luna x-high.

### D5 — GOAL omits the live candidate-2 cursor from its authority header

`GOAL.md:6–7` labels only freeze-0 `1be91765…` and freeze-1/candidate-1 `562db5c7…` under
“Repository authority.” `INVENTORY.md`, `COORDINATION.md`, and `ROW-CHALLENGE-MATRIX.md` correctly
name live formation cursor `626540ad…`, but the active goal's authority header does not distinguish
that live pin from its historical pins.

**Required amendment:** relabel `1be91765…` and `562db5c7…` as historical and add live
candidate-2 formation cursor `626540adbe10fd84f47b8365977925a7fbd2e17a`, explicitly “not frozen.”
If HEAD advances before freeze, update every live cursor and the 22/69/1 classification as necessary.

## 5. Source candidate versus acceptance status

| slice | exact status at this audit | remaining acceptance boundary |
| --- | --- | --- |
| MATERIAL W7 `4442b451` + `2ad97ca1` | source/cascade/package-green; acceptance-red | dead-SFC gate honesty, K4 TagsInput removal, removable/real-glass-Badge packed fixture, Safari+Chromium paint, receipt, fresh critics |
| MATERIAL W8 `44621bb4` | source/build-green; integration/acceptance-red | remove `f0d` component arm by a later commit, total/collision-safe detector, OFF/real-ON/false-positive-ON arms, first-painted-sharp failure, explicit app-root adoption, immutable receiver evidence, fresh critics |
| W8 redress `f0d32d69` | historical source commit; rejected for acceptance | component-global arm, lens-free `/tabs` cost, fixed-id collision, stale/throw lifecycle, and deferred armed proof remain disallowed |
| MATERIAL W2 `626540ad` | narrow arithmetic + isolated-build credit only; unified contract/freeze-red | preserve source forms and selector, ordered/provider representation, CSS/static/live/PRM parity, real Atlas CSS/shader receiver, unique immutable package + lock repin, Luna redress, two new Sol critics |
| current W6 working copy | moving implementation/source candidate only | no commit/receipt/exact-byte acceptance at this audit pin |

No product source needs to be reverted by this audit. Correct historical commits remain in history;
their status is narrowed rather than rewritten.

## 6. Required Candidate-2 normative order

The exact current canonical set is sixteen files:

1. `docs/tranches/BJ/ASK.md`
2. `docs/tranches/BJ/PLAN.md`
3. `docs/tranches/BJ/EXECUTION-PROGRESS.md`
4. `docs/tranches/BJ/waves/BAND-REDUCTION.md`
5. `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/GOAL.md`
6. `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/INVENTORY.md`
7. `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/REGISTRY.md`
8. `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/VISUAL-HARDENING.md`
9. `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/GATES.md`
10. `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/COORDINATION.md`
11. `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/REJECTIONS.md`
12. `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/RESEARCH.md`
13. `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/ROW-CHALLENGE-MATRIX.md`
14. `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/EXEMPLAR-RECONCILIATION.md`
15. `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/EXEMPLAR-CRIT-ADJUDICATION-C2.md`
16. `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/IMPLEMENTATION-ASKS-C2.md`

## 7. Current file SHA-256 pins

### Normative candidate inputs

| SHA-256 | path |
| --- | --- |
| `d4614fcc8b172f7470353cd74c5bf2ec59ce5726e32781f8095e23207ac45fe4` | `docs/tranches/BJ/ASK.md` |
| `5f2a308d6145c3a2219a47261c885f855a2e9abaf0800498229c325f241effd4` | `docs/tranches/BJ/PLAN.md` |
| `bad6119e058d60073790776fbf9d0a4288c6e592e5ac9f8acfefc66065a4f4b2` | `docs/tranches/BJ/EXECUTION-PROGRESS.md` |
| `50612b9a6a252171759e681d367b0418eada02c6e683b253b50495a10d93925c` | `docs/tranches/BJ/waves/BAND-REDUCTION.md` |
| `bf4ec49d404372ef30e8d93113a57a80696beec2b0812bb6e733563496c21672` | `GOAL.md` |
| `71b04d7f3358deeb7290d11fbc80b8056b10883a64de4f9e8e10796c26600c0e` | `INVENTORY.md` |
| `e9eefc7f17d4c0685821297ec3207b06698668f7b7d5e4e973108934a0d40910` | `REGISTRY.md` |
| `3c60972d13293a41349e59204160d09da3ec3e0d328a4da5481734b05cecb06a` | `VISUAL-HARDENING.md` |
| `f758406309aa087ab336fe39e381647e0d69d1a5efb8aeedf823ba2ccd6633a8` | `GATES.md` |
| `49c599279320f2efce870b3f9bde96158537eeb600917afcfe8f7f9079085440` | `COORDINATION.md` |
| `36cf5609ddd223db36beb2449fcc426f11f5be207ad7ad80b6a21208d13fc6ec` | `REJECTIONS.md` |
| `33a0b9148e4e30221982f8d64d281036455029b5be45baf50e1fb950f8146edf` | `RESEARCH.md` |
| `4fc8ae88ddd8c022fb11b1df578746998ae0072fa5a4cc7184570fb3d5816c66` | `ROW-CHALLENGE-MATRIX.md` |
| `ba8441522aad3bd539eb8ded4c099e7278573ff7ffce8cc64b6c6c9eb6ce49e0` | `EXEMPLAR-RECONCILIATION.md` |
| `76cf33a02d503213cb25de3c2a34fc52389bd6902f2aed469cf421ceb7076aef` | `EXEMPLAR-CRIT-ADJUDICATION-C2.md` |
| `f8d7380b19ef46cf2af8df9ba92b82500a5ffdcbb475ff11f750af4fab15334f` | `IMPLEMENTATION-ASKS-C2.md` |

These are audit pins, not a Candidate-2 normative digest or freeze. The five required amendments in
§4 will change them.

### Audit metadata inputs

| SHA-256 | path / verdict role |
| --- | --- |
| `9ac66f18b30cc4f300e7bf180b3c6e33ba41429b0b92c0ef1e43a1768350d318` | `CHALLENGES.md` |
| `dd4ba2a4292033f1bc290bbeb3070cfa575fff3337b0d4ff7da7bff84d63c1b0` | `W2-626-CRIT-MECHANISM-C2.md` |
| `323008f5061a0f41eb7b769e53aaf92d3c88ace48fc0dcc17bfc788a6d6488bd` | `W2-626-CRIT-INTEGRATION-C2.md` |
| `8d820e00809de071620b05d180a82f869d4e8c628258235882fd5eb04645c399` | `W7-CRIT-CSS-C2.md` |
| `5d8f6f3d570ae8d7179043a29ee303e7a8c075262110c66dc7563ddbaf7ddbbe` | `W7-CRIT-PAINT-C2.md` |
| `500ec6560636f181dbe37d2c9f8a2b89d324434593b7ecd44555713b25371845` | `W8-CRIT-MECHANISM-C2.md` |
| `fd15fd948d4966141bf79c489334c058e67581fae0c548bda062a3a6e6038bfb` | `W8-CRIT-INTEGRATION-C2.md` |
| `53fc5bda08a14d43c85d46a6fdd6f43ee0d5035ee1096421776e2bb7985fc13d` | `W8-F0D-CRIT-CONTRACT-C2.md` |
| `f844f3e04bd9ae501e46cbe6e7a9b8107c1942b619944d32e30a552456b19543` | `W8-F0D-CRIT-MECHANISM-C2.md` |
| `0fe9a52d9bc560f7e22b14a94f548382ba2c6bbccb65efd9afe2963075f03992` | `BROWSER-W7-W8-TRUTH-C2.md` — infrastructure RED, zero UI acceptance |
| `72cee2add212ac831f77f31a6fccf2ebddb2a003abc987b672234494a5b80a28` | `CLAUDE-WORKFLOW-RECONCILIATION-C2.md` — observation-pin metadata; its embedded earlier canonical hashes are historical, not current |

All embedded W2/W7/W8/browser report hashes named by the current canonical surfaces recompute exactly.

## 8. Final moving-tree digests

- `git status --porcelain=v1`: 89 entries (77 tracked, 12 untracked status entries); SHA-256
  `ad48da891f4a2d46f2ee7097ba76c2d4b40d87cac083642a2e3681d7284d2adc`.
- `git diff --binary`: SHA-256
  `061a0d68fd6ffa4ae7153ac6b3237fd6749c60a92a6671b98856343c9328560f`.
- sorted `git ls-files --others --exclude-standard`: 48 paths; SHA-256
  `e34701b9a454411bf605ac633bde7f5697fc72408cf24fd8356f44a92815eec8`.

These digests are audit-time moving-tree context only. They do not authorize freezing dirty product
bytes and do not substitute for the later candidate archive.

## 9. Freeze ruling

**Do not freeze Candidate 2 from these bytes.** The five documentary defects in §4 require amendment
and a fresh pin. After those amendments and any concurrent source/report movement settle, record the
exact sixteen-file Candidate-2 manifest/archive/digest; then run the required exact-byte full-roster
Sol x-high audit. Only a passing post-freeze audit can begin clean audits A and B, and any intervening
normative edit resets that sequence.

The SHA-256 of this report is intentionally not embedded in the report itself; it must be computed
from the final bytes and carried by the audit handoff.
