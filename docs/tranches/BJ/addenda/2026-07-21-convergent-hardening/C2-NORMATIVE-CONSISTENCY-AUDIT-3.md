# Candidate-2 normative consistency audit 3

**Seat:** independent Sol x-high consistency audit

**Audit pin:** 2026-07-22T01:39:07-0400

**Verdict:** **HOLD — THE CURRENT NORMATIVE CORPUS IS INTERNALLY CONSISTENT, BUT CANDIDATE 2 IS NOT YET READY TO FREEZE**

**Scope:** documentary audit only. No product, test, evidence, receipt, existing formation, archive,
freeze, or workflow byte was changed. This report is the only repository write.

The five defects from `C2-PREFREEZE-CONSISTENCY-2.md` are repaired, the seven defects from
`UNTOUCHED-WAVES-CHALLENGE-C2.md` are propagated, and the live roster correctly advanced from
22/69/1 to 23/68/1 after the W6 Card precursor. The hold is not a hidden documentary contradiction:
the working implementation is still moving/dirty, W2/W6/W7/W8 and Browser acceptance remain RED,
and the planned state-receipt prose is not yet an exact executable byte-stream recipe. No candidate-2
digest or archive exists.

## 1. Exact live pin

- Branch: `master`, 96 commits ahead of `origin/master`.
- HEAD: `8786d2c8c91f289abd3dc7290a4e0b869416b4f0`.
- HEAD tree: `863ba00514bf60d4b6a6a4fdb716c3f515e3d250`.
- HEAD meaning: useful W6 Card precursor only; the coupled codemod/reset/gate remains dirty and RED.
- Porcelain entries excluding this report: 95.
- `git status --porcelain=v1` SHA-256 excluding this report:
  `fa7ea315a5eb1e0c899c565d0450b8a239793e7e8aab4abbea65ef2fd1f64056`.
- Working-tree binary patch SHA-256:
  `7f98380c5c53efb26bac4e8511c8659cadf07371b047ccd720a38cbdf3cdb626`.
- Cached binary patch SHA-256: `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`
  (empty index delta).
- Untracked files excluding this report: 48.
- `LC_ALL=C` sorted untracked-path-list SHA-256 excluding this report:
  `bf444948742cb0b6c346ae502981da1445f359989c184931812f07260bc64fc4`.
- `LC_ALL=C` sorted untracked-content-manifest SHA-256 excluding this report:
  `2a5d4fc8c4a02b4b76beb91bc0399f34ff248899e2fa215c67b0c9752806916e`.

The dirty-tree hashes are observation receipts, not a freeze. They prove why a current source/test
GREEN or an HMR frame cannot become exact-candidate acceptance.

## 2. Planned 16-file normative set

The `FREEZE-MANIFEST.md` Candidate-2 order, digest command, and uncompressed `ustar` command agree
exactly with the present sixteen-file set. All sixteen paths exist. The diagnostic outer digest over
the current bytes is
`dee3ff2b7c6e312939c9103e99abd1ce7b9b4302c83a35d1b4affbb6ecd19392`:

| SHA-256 | path |
| --- | --- |
| `d4614fcc8b172f7470353cd74c5bf2ec59ce5726e32781f8095e23207ac45fe4` | `docs/tranches/BJ/ASK.md` |
| `5f2a308d6145c3a2219a47261c885f855a2e9abaf0800498229c325f241effd4` | `docs/tranches/BJ/PLAN.md` |
| `f513098dd1416a9f5b93611bd054387ab90391559e46e4955cc030d6a06c463f` | `docs/tranches/BJ/EXECUTION-PROGRESS.md` |
| `f0c47c2ae3a1dcfba6d3639e364d48fb7a05f2a08a4fd3729a5312f8f9b824d7` | `docs/tranches/BJ/waves/BAND-REDUCTION.md` |
| `53b6805b6c581678cbef473df992f111081911c2363e4330423bbccc949ffc6c` | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/GOAL.md` |
| `bc88b0bd962c726465b18ed5b41240315ada865ce5a8aa2fc8705fa0f93a6fd0` | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/INVENTORY.md` |
| `7f208eb54de6a185ef45b03453ed4b0b77fa09c7a54847536aa76d79076fefdc` | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/REGISTRY.md` |
| `3c60972d13293a41349e59204160d09da3ec3e0d328a4da5481734b05cecb06a` | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/VISUAL-HARDENING.md` |
| `86e61058753d94cd70129b3b977311570c8763197df3f332a9a0c9aa8efceba4` | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/GATES.md` |
| `87997d9e37f88ab1cc4d64c2511825fb6cd25142eea7fe159ac2690261300def` | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/COORDINATION.md` |
| `36cf5609ddd223db36beb2449fcc426f11f5be207ad7ad80b6a21208d13fc6ec` | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/REJECTIONS.md` |
| `33a0b9148e4e30221982f8d64d281036455029b5be45baf50e1fb950f8146edf` | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/RESEARCH.md` |
| `1fa012d3f702cc2d6f8ea678164a79b9c366bffcd52a7ee0299eb3c4992d96f9` | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/ROW-CHALLENGE-MATRIX.md` |
| `ba8441522aad3bd539eb8ded4c099e7278573ff7ffce8cc64b6c6c9eb6ce49e0` | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/EXEMPLAR-RECONCILIATION.md` |
| `76cf33a02d503213cb25de3c2a34fc52389bd6902f2aed469cf421ceb7076aef` | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/EXEMPLAR-CRIT-ADJUDICATION-C2.md` |
| `f534905a03dc5accbcd80186c0d5cbdad1f532b456a439fa2ac3e606ad721b7e` | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/IMPLEMENTATION-ASKS-C2.md` |

The exclusions are also coherent: `FREEZE-MANIFEST.md`, `CHALLENGES.md`, this report, W2/W6/W7/W8
critics, Browser truth, Claude reconciliation/receipts, untouched-wave reports, and other audit
metadata do not enter the normative digest. The planned archive listing, fresh-directory extraction,
per-file hashes, outer digest, archive hash, and complete refreeze after any normative edit are all
explicit.

### Remaining recipe discrepancy

The normative digest and archive commands are exact, but the dirty-state receipt sentence is not yet
an executable recipe. It names a “porcelain status hash,” “tracked diff hash,” and “sorted
untracked-file hash” without fixing:

- porcelain v1 versus v2 and `--untracked-files=all`;
- whether status input is C-locale sorted or Git order;
- working-tree and cached binary diffs as two independent channels;
- untracked path-list bytes versus a sorted content-hash manifest;
- exclusion of the manifest/archive/audit file being written.

This is observable now: ordinary porcelain reports 95 entries while the all-file untracked census has
48 files, and path-list and content-manifest hashes are intentionally different. Before freeze, add
literal commands for each receipt and run them after the final normative write but before archive
declaration. This is a freeze-method HOLD, not permission to mint a digest from the diagnostic value
above.

## 3. Earlier five-amendment audit

| earlier defect | result | current truth |
| --- | --- | --- |
| exact Candidate-2 recipe absent | **PASS with receipt HOLD above** | exact sixteen-file order, digest, `ustar`, verification, and metadata exclusions are present |
| REDUCTION W7 said unminted/PU | **PASS** | primary status is `UNION — AP-33 · PARKED PENDING OWNER MARK`; the old ASK-A4/PU state is explicitly historical |
| GF-DOCK W9 over-parked ASK-16 | **PASS** | matrix class is `AP-16(s)+DH`; only optional `+N` waits |
| prospective Fable/Opus instruction remained | **PASS** | the block is past-tense history; the future re-Fable offer is struck |
| GOAL lacked the live cursor | **PASS** | GOAL and every live authority surface name `8786d2c8` as a non-frozen W6 Card precursor |

## 4. Roster arithmetic and the moving five

Mechanical parsing of `ROW-CHALLENGE-MATRIX.md` returns rows 1–92 exactly once, with no duplicate or
missing identifier:

- 23 classes beginning `ST`;
- 68 other untouched/ASK/dependency/authority classes;
- one `U+BE` IOS W-0 row;
- total: 92.

The previous 22/69/1 classification and five outside-the-committed-set worktree candidates were exact
at HEAD `626540ad`. Commit `8786d2c8` touched MATERIAL W6 through the Card precursor, so current truth
is 23/68/1. Four candidate rows remain outside the committed 23—A11Y STATE, A11Y CONTRAST, A11Y
LIVE-REGIONS, and GATES RAMP-RESET—while TYPE-CODEMOD's main codemod/reset/gate tail remains dirty
inside its now-source-touched row. `INVENTORY`, `REGISTRY`, `ROW-CHALLENGE-MATRIX`, `GOAL`,
`COORDINATION`, and `EXECUTION-PROGRESS` agree. No source-touched or dirty-candidate row is called DONE.

## 5. Seven untouched-wave defects

All seven challenge defects are retained under existing owners rather than minted as duplicate waves:

| row | result | propagated current ruling |
| --- | --- | --- |
| 8 `BJ.W-COLO-3` | **PASS** | dead SFC cannot rescue unpublished CSS; public reach/package-output and dead-leaf mutation are binding |
| 17 `BJ.W-GATE-COLLAPSE` | **PASS** | P-EX1 is reopened; over-budget and vanished-required-guard mutations remain RED |
| 20 `BJ.W-RAMP-RESET` | **PASS** | atomic with W6; no silent sm/xs-only narrowing before a Sol scope ruling |
| 26 `BJ.W-TYPE-CODEMOD` | **PASS** | Card precursor is ST but W6 remains RED; Fira cascade, false Badge copy, scope, paint, receipt/model and critic debt are named |
| 32 `BJ.W-ROUTE-PENDING` | **PASS** | PERF owns pending feel after STORY's director, never a second F07 director |
| 42 `BJ.W-STORY-TAXONOMY` | **PASS** | class is `U+AP-13(s)`; only optional `scene` waits while the settled taxonomy/front-door work proceeds |
| 48 `BJ.W-STORY-TRANSITIONS` | **PASS** | STORY is sole episode/director authority; generation/error/focus/skip and initiation coverage remain RED |

`REGISTRY`, `GATES`, `ROW-CHALLENGE-MATRIX`, `EXECUTION-PROGRESS`, and
`IMPLEMENTATION-ASKS-C2` carry the corresponding mechanisms and mutations. The six numbered I-8
instructions cover seven rows by intentionally coupling RAMP-RESET with TYPE-CODEMOD and
ROUTE-PENDING with STORY-TRANSITIONS.

## 6. Status and authority checks

### P-EX1, STORY and route authority — PASS

- P-EX1 is explicitly `REOPENED ACCEPTANCE-RED`; the historical source ledger is not presented as a
  replayable 5-of-5 close.
- STORY W1 is a slice park only. The five settled page types, manifest registry, wrapper fold and
  one-front-door/D0 cure remain executable.
- STORY W7 is the single route episode/director. PERF W4 follows for pending feel; GF-DOCK W6 consumes
  the selected class and owns shell/no-blank/CLS only. Older senior/co-owner prose is explicitly
  superseded, not allowed to create a second director.

### W2 / W7 / W8 — PASS as truthful RED

- W2 `626540ad`: narrow arithmetic/build credit only; unified producer/receiver/package-consumer and
  freeze RED. Selector/source-intent loss, ordered alpha/gradient/provider representation, real Atlas
  CSS/shader witness, immutable package identity and exact lock repin remain required.
- W7 `4442b451` + `2ad97ca1`: source/cascade/package reach credit only; dead-SFC gate honesty, K4,
  removable and real-glass-Badge fixtures, Safari/Chromium paint, receipt/model and exact-byte critics
  remain acceptance RED.
- W8 `44621bb4`: safe CSS floor and public root export are retained. `f0d32d69` is a rejected
  component-side-effect redress; root ownership, total collision-safe lifecycle, OFF/real-ON/forced
  false-positive-ON paint and consumer adoption remain acceptance/freeze RED.
- Browser report `0fe9a52d…` remains infrastructure RED and supplies zero UI acceptance; discovered
  routes are not promoted to trusted 390/1440 evidence.

The exact critic pins used here are:

| SHA-256 | report |
| --- | --- |
| `dd4ba2a4292033f1bc290bbeb3070cfa575fff3337b0d4ff7da7bff84d63c1b0` | `W2-626-CRIT-MECHANISM-C2.md` |
| `323008f5061a0f41eb7b769e53aaf92d3c88ace48fc0dcc17bfc788a6d6488bd` | `W2-626-CRIT-INTEGRATION-C2.md` |
| `8d820e00809de071620b05d180a82f869d4e8c628258235882fd5eb04645c399` | `W7-CRIT-CSS-C2.md` |
| `5d8f6f3d570ae8d7179043a29ee303e7a8c075262110c66dc7563ddbaf7ddbbe` | `W7-CRIT-PAINT-C2.md` |
| `500ec6560636f181dbe37d2c9f8a2b89d324434593b7ecd44555713b25371845` | `W8-CRIT-MECHANISM-C2.md` |
| `fd15fd948d4966141bf79c489334c058e67581fae0c548bda062a3a6e6038bfb` | `W8-CRIT-INTEGRATION-C2.md` |
| `53fc5bda08a14d43c85d46a6fdd6f43ee0d5035ee1096421776e2bb7985fc13d` | `W8-F0D-CRIT-CONTRACT-C2.md` |
| `f844f3e04bd9ae501e46cbe6e7a9b8107c1942b619944d32e30a552456b19543` | `W8-F0D-CRIT-MECHANISM-C2.md` |
| `0fe9a52d9bc560f7e22b14a94f548382ba2c6bbccb65efd9afe2963075f03992` | `BROWSER-W7-W8-TRUTH-C2.md` |
| `2cfc20510d2d59dc62ae6065c1dfecba92a0f3ba472ac2506c17d6f0dce22ac3` | `W6-MOVING-CRIT-C2.md` |

### Safe frame — PASS as discovery only

The corpus keeps GF-DOCK W9 an actual-tree/posture investigation. `/ecf` manifest `2c5fee…` supplies
overlap/blank-settle discovery but no dock rect. Speedtest v4 `8a0dcda7…` and USF Integrity v4
`058b8f52…` resolve the current fixed `44×60` rail and reproduce heading/versal/control intersections,
but moving SCI/Atlas/Glass identities make them discovery-only. The remedy remains an actual-tree
side-slot prototype that preserves current posture; a bottom-row family requires explicit owner
authorization. No padding, scroll-margin, simplified prototype, Glass-frame claim, or bottom-posture
inference receives acceptance credit.

### Prospective model law — PASS

Every future design, judgment, audit, challenge and paint-taste seat is declared Sol x-high. Every
bounded mechanical redress is declared Luna x-high. Historical Fable/Opus labels remain factual and
cannot satisfy prospective acceptance. The current Opus W6/phase-2 output is therefore correctly held
as source-candidate history requiring Luna redress and fresh Sol judgment/critics; it is not relabelled.

## 7. Freeze ruling

Candidate 2 is **not ready to freeze at this pin**.

The documentary corpus is coherent enough to preserve the current RED plan, but the freeze preconditions
are not met:

1. the state-receipt byte streams need literal commands;
2. no candidate-2 archive, archive hash, per-file manifest or declared normative digest exists;
3. the Claude workflow and its receipt boundary are still open, and the working tree contains 95
   porcelain entries;
4. W6 is a precursor plus dirty coupled tail, with a proven font-register regression and an
   acceptance-false committed close;
5. W2/W7/W8 and Browser/consumer evidence remain explicitly RED.

After the implementation workflow reaches its natural boundary, re-pin HEAD/tree/status/diff/untracked
bytes with the exact receipt commands, incorporate only findings that change the normative plan, and
then form and verify the sixteen-file archive. The first exact-candidate Sol audit starts only after that
artifact exists. This report is metadata and does not count as a freeze or a clean post-freeze audit.
