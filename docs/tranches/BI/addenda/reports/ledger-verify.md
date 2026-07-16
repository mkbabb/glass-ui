# BI chronic + disposition ledger — verification against current truth

**Auditor mode:** read-only chronic-deferral ledger audit. **Repo:** glass-ui, branch `master`,
HEAD `e5b3a209`, package.json `6.0.0`. **Formation base:** `26c5ae68` (tranche/BI). **Observed:** 2026-07-16.

Every verdict below carries a SHA or file:line. Where I could not verify an owner ran, I say
UNVERIFIED and never infer completion from a commit subject.

---

## §A · The topology fact that reframes the whole audit (verified)

The task hypothesis was that the P-execution rebuilt from a stale base and orphaned the B-bands.
**That is false — the opposite is true, and it is worse.** Verified:

- `f20a2aa9^` = `26c5ae68` — the P-execution formation commit's parent IS the tranche/BI formation
  tip. `git merge-base 26c5ae68 HEAD` = `26c5ae68`. So the whole B-band lineage (B0–B8, addenda,
  cleanup, TAIL-EXCAVATION `a20060ad`) is a **linear ancestor of the shipped HEAD**. Every B-band
  owner commit (`ae71daa0`, `db861d71`, `2f05d771`, `92e00ff7`, `184bf765`, `2bfcf2b9`, `850df929`,
  the B68 band waves) `git merge-base --is-ancestor … HEAD` = YES.
- Therefore **CHRONIC-DISPOSITIONS rows routed to executed B-band waves are DONE-VERIFIED at the
  commit level** — their owner ran and is in shipped history.
- The P-execution (`26c5ae68..HEAD`, 69 commits) then built ON TOP, executing the held MS structural
  moves (ms2/ms4–ms8) and a component/design/motion cascade as ~67 conventional commits.

**But the P-execution's very first act destroyed the ledger's own enforcement machine.**

### The linchpin: P000 abrogated the entire machine-gated chronic spine

- `1c2cda3a feat(bi-p000): replace the legacy gate mesh with one fail-closed verifier`.
- `proof-*` scripts: **384 at `26c5ae68` → 0 real at HEAD** (`git ls-tree -r HEAD -- scripts | grep proof-`
  returns exactly one path, `scripts/__tests__/proof-vt-names.test.ts`, a test — not a gate).
- `proof:` package.json script keys at HEAD: **0**.
- The specific chronic-spine gates are all GONE at HEAD: `proof-bg-deferred-ledger` (0),
  `proof-disposition-live` (0), `proof-budget` (0), `proof-meta` (0), `gates-verify-ci` (0).
- Replacement is `scripts/verify.mjs` + `scripts/verification/` — a **wave-transaction verifier**
  (subject OIDs / Git modes / mutation fixtures, verify.mjs:2112-2116). It does **not** assert ledger
  liveness, orphaned-wave claims, re-stamp ceilings, or disposition discharge.

**Consequence:** TAIL-EXCAVATION's THESIS — *"the 20-tranche tail runs a machine-gated chronic spine
(`proof:disposition-live` + `proof:bg-deferred-ledger §G`)"* (TAIL-EXCAVATION.md:10-13) — is **FALSE
at HEAD.** Every "liveness probe a gate must carry" column in CHRONIC-DISPOSITIONS.md (§0 doctrine,
§8 doctrine, every row's last column) is now unbacked: the gates that were the load-bearing lesson
("every chronic chain that got a real tooling gate STOPPED slipping", TAIL §4) were deleted wholesale.
This is a **vacuous-gate** condition across ~85 rows simultaneously.

### The old close-waves the ledgers route to never ran

- **#92 (BI.W-DOCK-DEVICE / visible-Safari π batch):** no execution commit anywhere. Only a
  formation/spec commit `6bc077ac` ("DOCK-DEVICE rescoped to both Metal arms"). No `…): built`
  commit, no device/Safari/Metal/π capture artifact in `26c5ae68..HEAD` (grep returns only unrelated
  view-transition + ms4 commits). **#92 never executed.**
- **#93 (close-battery / ledger true-up / GESTALT-LEDGER fill):** no BI close-battery commit in the
  P-range. `proof:meta --operative-close` (the gestalt oracle, `ac998852`) is deleted at HEAD.
- **#95 (USER-gated cross-repo cut with 9 consumer ACKs):** no consumer-ACK / asks-and-consumes
  resolution commit in the P-range. The only consumer-adjacent commit is `0326fbec test(package):
  verify … in an isolated consumer` (an internal test, not a real consumer handshake).
- **Releases shipped anyway, outside the contract:** `v5.0.0` = `56ad0ea2`→ tag on `9a8761f0`
  (`refactor(structure/ms4)` — mid-structure!), `v6.0.0` = `b262e2d3`→ HEAD `e5b3a209`, via ad-hoc
  `chore(release)` commits `319cd711` / `b5216887`. EXECUTION-READINESS.md:106-110 forbids release
  "until all 134 cursor rows are terminal … all nine in-scope owner ACKs bind the candidate tarball
  … FINAL/tag/package bytes agree." **None of those preconditions were met; 5.0.0 and 6.0.0
  published regardless** (npm 2026-07-15). This is protocol-abandonment at the release gate.

### The uncommitted transaction tears down the scaffolding

`git status`: 698 M / 155 D / 105 ??. Among the deletes: `scripts/tranche/*` (cursor, receipt,
transaction-envelope), `docs/tranches/BI/EXECUTION-PROGRESS.md`, `docs/tranches/BI/BOOTSTRAP.json`,
`docs/tranches/BI/FORMATION/execution-cursor.seed.json`. The execution machinery that would let anyone
reconstruct wave state is being removed in the same transaction that ships — the ledgers' audit trail
is being severed from the tree.

---

## §B · TAIL-EXCAVATION §2 promotion rows (the 8 STILL-LOST owners) — verdicts

| id | item | routed owner | owner ran? | VERDICT |
|----|------|--------------|-----------|---------|
| **A1** | `proof:budget-gate-present` anti-deletion meta-gate | REPO-CLEANUP gates-abrogation rider (DEFER-2) | grep=0 across all history; never built. P000 then deleted the whole gate mesh incl. `profile:budget` it was meant to protect | **REBOOKED-ORPHAN** (owner superseded by P000 gate abrogation; meta-gate never existed and its subject is gone) |
| **A2** | `proof:no-orphaned-wave-claim` ledger-integrity meta-gate | #93 close-battery + W-CENSUS-DETECTOR-HARDEN | grep=0; never built. #93 never ran. `verify.mjs` does not implement it | **REBOOKED-ORPHAN** — and this is the exact gate whose absence let the doc-done/tree-no disease this audit catches go undetected |
| **C1** | fourier-analysis phantom-classes (foreign-tree) | REPO-CLEANUP W-RED-COLLATERAL | W-RED-COLLATERAL ran (`71884a47`) but never names fourier; its host gate `proof:consumers:static`/`proof:resolution` deleted by P000 | **DONE-CLAIMED-UNVERIFIED** (subject moot — gate gone; no explicit terminal record; foreign-tree, low sev) |
| **D1** | BD-union demo-tail (W-BLURRED-IMAGE-BG / W-STICKY-TITLE-CONDENSE / W-MEDIA-DOCK+NOWPLAYING / W-LIVING-ARTWORK) | MINT `BI.W-BD-UNION-TRUE-UP` | wave MINTED `a20060ad`; only sticky-title probe cited (`9f0a5285`). No RETIRE/FOLD execution commit for blurred-image / living-artwork / media-dock | **REBOOKED-ORPHAN** — owner minted pre-formation, not a P-graph wave, never executed |
| **D2** | N-19 FBO multipass / N-21 shader transpiler / N-22 novel-viz | "add 3 RETIRE rows to CHRONIC-DISPOSITIONS" | grep=0 in history; CHRONIC-DISPOSITIONS.md contains NO N-19/N-21/N-22 rows (read in full) | **REBOOKED-ORPHAN** — the promised ledger note was never written |
| **E1** | BG WS3 Safari blur re-answer + 4 BG glass paint-pending surfaces (CARTOON-INK/GLASS-BLUR-PEER/FIELD-AURORA/BACKDROP-BLUR-ENGAGE) | enumerate under #92 | #92 never ran; the four surfaces are never enumerated by SHA anywhere post-formation | **REBOOKED-ORPHAN** (visual cert subsumed by implication only; owner dead) |
| **F1** | retirement-guard no-meta successor-tranche direction | record-terminal-DEAD (ruling Q3) | ruled DEAD in `a20060ad` ("F1 record-terminal-DEAD") | **DONE-VERIFIED** (dispositioned DEAD by orchestrator ruling; greenfield-no-meta makes it moot) |
| **G1** | SRC-restructure collapse (subpaths/api/utils/types) — "single most load-bearing promotion" | BI.W-STRUCTURE-RESEQUENCE | `src/api` `src/types` `src/utils` deleted pre-formation (`58ddaf21`/`b02176e3`/`9c3c49e6`); `src/subpaths` removed by ms6 `bb5c1e5c`. HEAD tree: all four `git cat-file` = GONE | **DONE-VERIFIED** — the headline chronic is actually resolved |

Promotion scorecard: **5 of 8 REBOOKED-ORPHAN (A1, A2, D1, D2, E1)**, 1 DONE-CLAIMED-UNVERIFIED (C1),
2 DONE-VERIFIED (F1, G1). The two the ledger judged safest-and-owned (F1, G1) landed; the meta-gates
and demo-tail the ledger judged "at the fore / small promotion work" are the ones that died.

---

## §C · TAIL-EXCAVATION §1 registry (47 rows) — owner-execution verdicts

Focus: rows with a named terminal owner. "#92/#93/#95" owners = superseded-and-never-ran.

| # | item | hop | ledger disp | owner | VERDICT |
|---|------|-----|-------------|-------|---------|
| 1 | doc-drift CLAUDE.md | 16+ | DEAD | `8b0f9acc` | DONE-VERIFIED (CLAUDE.md deleted) |
| 2 | AX 21-book cluster | ~10 | OWNED-LIVE | mixed; 3 BUILDs → METRICS-DEMO/a11y/DOCK-CONTROLS | BUILDs DONE-VERIFIED; RETIRE arms self-executing but **re-stamp-ceiling gate deleted (vacuous)** |
| 3 | inline-edit primitive | ~10 | OWNED-LIVE (user ruling) | §6.2 open-Q | STILL-OWNED / **orphaned-at-cut** (6.0.0 shipped w/o ruling) |
| 4 | panel-host-primitive | ~10 | DEAD | §5 archived | DONE-VERIFIED (archived-terminal) |
| 5 | interruptible-reorder | ~10 | DEAD | §5 archived | DONE-VERIFIED |
| 6 | fourier phantom-classes | ~10 | STILL-LOST→C1 | W-RED-COLLATERAL | DONE-CLAIMED-UNVERIFIED (see §B/C1) |
| 7 | **dock fundamentals** | **8+** | OWNED-LIVE/DONE(spine) | DOCK-SPINE `ae71daa0` + paint rides **#92** | spine DONE-VERIFIED; **paint/Safari cert REBOOKED-ORPHAN (#92 dead)** — DISEASE |
| 8 | native-drawer | ~8 | DEAD | `6b0ba06f` | DONE-VERIFIED |
| 9 | /deck subpath | ~8 | DONE | `7fb2d1b7` | DONE-VERIFIED (`./deck` ships) |
| 10 | bundle-budget gate | 7+ | OWNED-LIVE + A1 | `profile:budget` | **REBOOKED-ORPHAN** — budget gate itself deleted by P000; A1 meta-gate never built |
| 11 | CompletionSeal family | ~7 | DONE | completion-seal.css | DONE-VERIFIED |
| 12 | primitive-prune 2nd-consumer | 6+ | OWNED-LIVE | METRICS-DEMO/AFFORDANCE | DONE-VERIFIED (both waves ran pre-formation) |
| 13 | **AY PENDING-RESHOOT** | ~6 | OWNED-LIVE | ride **#92** | **REBOOKED-ORPHAN** (#92 dead; pixels never shot) — DISEASE |
| 14 | **π visual-runtime lane** | 5+ | OWNED-LIVE | **#92/#93** | **REBOOKED-ORPHAN** (both dead) — DISEASE |
| 15 | dot-flow-field/concentric | 5 | DEAD | `f7be02dc` | DONE-VERIFIED (dirs absent) |
| 16 | **Safari/Metal real-device** | ~5 | OWNED-LIVE | **#92 (DOCK-DEVICE)** | **REBOOKED-ORPHAN** — "highest re-inheritance risk" per ledger, now confirmed dead — DISEASE |
| 17 | **SRC-restructure** | ~4 | STILL-LOST→G1 | STRUCTURE-RESEQUENCE | **DONE-VERIFIED** (all 4 dirs gone from HEAD) |
| 18 | NPM_TOKEN CI-publish | ~4 | DONE | release.yml | DONE-VERIFIED |
| 19 | Fraunces @font-face | ~4 | DEAD | typography.css | DONE-VERIFIED |
| 20 | /freshness subpath | 4 | DEAD | AD.W4 | DONE-VERIFIED |
| 21 | git-stash precept | ~4 | OWNED-LIVE | audit:stash | DONE-VERIFIED at commit; **gate deleted by P000 (vacuous now)** |
| 22 | story-language leaks | ~4 | OWNED-LIVE | proof:story-language | **REBOOKED-ORPHAN of enforcement** — gate deleted by P000 |
| 23 | reduced-motion sweep | ~4 | DONE | 135 arms | DONE-VERIFIED |
| 24 | ci.yml gate-drift | ~3 | OWNED-LIVE | gates:verify-ci | **REBOOKED-ORPHAN of enforcement** — `gates:verify-ci` deleted by P000 |
| 25 | dock-scroll-fission | 3 | DEAD | dock/index.ts:121 | DONE-VERIFIED (retired) |
| 26 | deriveAurora/VAL-1 | ~3 | DONE | color.ts:113 | DONE-VERIFIED |
| 27 | **speedtest adopt/bump** | ~3 | OWNED-LIVE | cut **#95** | **REBOOKED-ORPHAN** (#95 never ran; no ADOPT ACK) |
| 28 | consumer-mis-prune | ~2 | DONE + guard | AP.W4 | DONE-VERIFIED; guard gate deleted by P000 |
| 29 | **cross-repo pin-guard** | ~2 | OWNED-LIVE | USER-gated cut **#95** | **REBOOKED-ORPHAN** — "single hardest pre-publish blocker" never gated; 6.0.0 shipped without it |
| 30 | value.js co-land | ~2 | OWNED-LIVE | #95 window | DONE-CLAIMED-UNVERIFIED (peer present; no co-land ACK commit) |
| 31 | deep-glass dual-book | ~2 | OWNED-LIVE (flip #93) | `785edf12`/`ccd56953` | DONE-VERIFIED at ledger (flip evidenced); #93 terminal-flip moot |
| 32 | cartoon-shadow round-trip | ~2 | OWNED-LIVE | bridges.css | DONE-VERIFIED |
| 33 | early permanent-defer cohort | ~4 | DEAD | archived | DONE-VERIFIED |
| 34 | W-BLURRED-IMAGE-BG | 1 | STILL-LOST→D1 | BD-UNION-TRUE-UP | **REBOOKED-ORPHAN** (never executed) |
| 35 | W-STICKY-TITLE-CONDENSE | 1 | STILL-LOST→D1 | probe `9f0a5285` | DONE-CLAIMED-UNVERIFIED (probe cited, no build) |
| 36 | W-MEDIA-DOCK+NOWPLAYING | 1 | STILL-LOST→D1 | BD-UNION-TRUE-UP | **REBOOKED-ORPHAN** |
| 37 | W-LIVING-ARTWORK | 1 | STILL-LOST→D1 | BD-UNION-TRUE-UP | **REBOOKED-ORPHAN** |
| 38 | N-19/N-21/N-22 tail | 1-2 | STILL-LOST→D2 | ledger note | **REBOOKED-ORPHAN** (note never written) |
| 39 | retirement-guard no-meta | 1 | STILL-LOST→F1 | record-DEAD | DONE-VERIFIED (`a20060ad`) |
| 40 | BG WS3 Safari var()-blur | 1-2 | STILL-LOST→E1 | #92 | **REBOOKED-ORPHAN** |
| 41 | 4 BG glass paint-pending | 1 | STILL-LOST→E1 | #92 | **REBOOKED-ORPHAN** |
| 42 | **PE-GESTALT ledger zero-filed** | 1 | OWNED-LIVE | GESTALT-LEDGER-FILE (`ac998852`) → fill at **#93** | **REBOOKED-ORPHAN** — file minted with 36 PENDING cells; oracle `proof:meta` deleted by P000; #93 never ran → cells permanently unfillable |
| 43 | proof:no-orphaned-wave-claim | 0 | STILL-LOST→A2 | #93 | **REBOOKED-ORPHAN** (never built) |
| 44 | judgment batch a–g | 1 | OWNED-LIVE | captures ride #92 | judgment specs landed (DOCK-SPRING-UNIFY etc. `e3c35c99`); **capture cert REBOOKED-ORPHAN (#92)** |
| 45 | AW halt set | halt | DONE | v3.6.0→5.0.0 | DONE-VERIFIED |
| 46 | AZ named-successors | ~2 | DONE | easing.ts/menu.css | DONE-VERIFIED |
| 47 | DDR-AS-RC-2 punch-list | ~5 | DONE | touch-floor.css etc. | DONE-VERIFIED |

---

## §D · CHRONIC-DISPOSITIONS (85 rows / 30 disease) — owner-execution verdicts by band

### §1a AX 21-book cluster (21 rows, all ~10 closes, ⚠ DISEASE)
- RETIRE arms (icon-sm, select-size, tooltip-mono, spring-crisp, raf-demand-park, slider-readout,
  cartoon-quiet, kf-prune-dag, speedtest-a11y-bundle, directional-VT, +8 Baseline open-Qs): the
  RETIRE disposition is a ledger act, self-executing. **BUT** the enforcing "re-stamp-count ceiling"
  probe each names lived in `proof:bg-deferred-ledger`/`proof:disposition-live` — **deleted by P000.**
  Verdict: dispositions stand on paper; **enforcement VACUOUS-GATE.**
- FOLD arms with real owners: `ax:metric-badge-icon`→METRICS-DEMO (`c90f51f4` DONE),
  `ax:labeled-field-for-id`→SLIDER-THUMB-NAME (`85c7f130` DONE), `ax:dock-select-clamp-label`→
  DOCK-CONTROLS (`15a38a63` DONE). **DONE-VERIFIED at commit.**
- 8 Baseline standing-books (§6.1 open-Q): **STILL-OWNED / orphaned-at-cut** — 6.0.0 shipped without
  the user RETIRE ruling.

### §1b/1c disease rows
| id | owner | ran? | verdict |
|----|-------|------|---------|
| dis:dock-chronic | DOCK-SPINE `ae71daa0` | code DONE; Safari-gestalt verdict rides #92 | **paint verdict REBOOKED-ORPHAN** — DISEASE (3+) |
| dis:safari-metal-verify | DOCK-DEVICE (#92) | **never** | **REBOOKED-ORPHAN** — DISEASE (3+) |
| dis:detector-blind-spot | LEDGER-DETECTOR-HARDEN `2f05d771` | DONE at commit | gate deleted by P000 → **enforcement VACUOUS** |
| dis:ratchet-regrowth | STYLE-REDRAIN `db861d71` + ENCAP-REDRAIN `910dfffd` | carve DONE at commit | `proof:encapsulation`/no-god-module ratchet deleted by P000 → **regrowth-RED enforcement VACUOUS** |

### §2 BUILD → named BI wave (9 rows) — all owners ran pre-formation
`bld:radius-grammar`→RADIUS-GRAMMAR `92e00ff7`; `bld:tabs-factor`→TABS-FACTOR `184bf765`;
`bld:orphan-binary-split`→ORPHAN-BINARY-SPLIT `b9de684f`; `bld:gate-owner-resolve`→AXES-GATES
`850df929`; `bld:esc-stack`→ESC-STACK `f24577c7`; `bld:demo-control-wire`→GRAIN-WIRE `47c295a6`;
`bld:metrics-relocate`→METRICS-DEMO `c90f51f4`; `bld:tabs-factor`; `bld:census-detector-harden`→
LEDGER-DETECTOR-HARDEN `2f05d771`; `bld:drag-reattach`→DRAG-REATTACH `2f1f154d`.
**All DONE-VERIFIED at commit.** Every born-RED→GREEN gate they minted is deleted by P000 (vacuous).

### §3 8 detector-blind BOOKED markers → dispositioned owners
Fold targets (TABS-FACTOR, GLASS-DEDUP `2bfcf2b9`, DOCK-SPINE, DOCK-SPRING-UNIFY `e3c35c99`,
DOCK-CROSSFADE `353b1c35`, DOCK-RETIRES `98b52613`) all ran pre-formation → **DONE-VERIFIED at
commit.** RETIRE-the-marker arms self-executing. Note: the P-execution's own dock/structure
rewrites (ms4 flatten `9a8761f0`, `refactor(overlays)` `062a2b12`, `fix(dock)` `95b0d20f`) moved these
files again after the B-band; the specific marker cleanup at HEAD is UNVERIFIED but low-sev.

### §4a device/perf-gated (D8/D24/D25/BF.W-GOO-SPLIT-PERF/BE.W-VIZ-PARITY-METAL)
All FOLD → **BI.W-DOCK-DEVICE (#92)** → **never ran** → **5× REBOOKED-ORPHAN** (DISEASE 2-3+).

### §4b/4c album-shade + CLAUDE.md successors
RETIRE arms self-executing (album-shade, nowplaying-pill, useAsyncSearch). `cmd:chromatic-aberration-rim`
→GLASS-DEDUP `2bfcf2b9` DONE-VERIFIED. §6.3 aurora-medium-lazy = open-Q → **orphaned-at-cut.**

### §5 MET/LANDED flip-with-evidence (20 rows)
On-disk-truth asserts (D27 snap, deep-glass-16px, wants:* absent, /deck, completion-seal,
oklch-relative, /styles-split, drawer-abrogate, native-drawer-retired, panel-host-archived, etc.).
Spot-verified representative SHAs resolve. **DONE-VERIFIED** as a class; the discharge-probe gates
that would keep them from re-drifting are deleted by P000 (vacuous, but subjects are terminal).

### §6 open_questions (6 rows, user ruling owed)
inline-edit, Baseline-book batch, aurora-lazy-split, completion/border-progress consumer, metrics
sextet scope, hover-popover Kronecker fold. **All STILL-OWNED / orphaned-at-cut** — 6.0.0 published
with none resolved; there is no #93 checklist left to batch them into.

---

## §E · Hop-count DISEASE roll-up (rows now riding 3+ closes AND orphaned)

Named individually per mandate. All are the **#92/#93 close-wave carriers that never ran**:

1. **reg#16 Safari/Metal real-device** (~5 hops) → #92 DOCK-DEVICE — never ran. Ledger's own
   "highest re-inheritance risk" call, now confirmed orphaned.
2. **reg#7 dock paint/Safari cert** (8+ hops) → #92 — spine code shipped, visual cert orphaned.
3. **reg#13 AY PENDING-RESHOOT** (~6 hops) → #92 — pixels never shot on real GPU.
4. **reg#14 π visual-runtime lane** (5+ hops) → #92/#93 — both dead.
5. **dis:safari-metal-verify** (3+) → #92 — never ran.
6. **dis:dock-chronic** (3+) → Safari gestalt verdict → #92 — orphaned.
7. **§4a D8/D24/D25/GOO-SPLIT-PERF/VIZ-PARITY-METAL** (2-3+ each) → #92 — 5 rows orphaned.
8. **reg#2 AX 21-book cluster** (~10 hops) → RETIRE stands but re-stamp-ceiling gate vacuous.

DISEASE rows whose owner DID run (not orphaned, for contrast): reg#17 SRC-restructure (G1, DONE),
dis:detector-blind-spot / dis:ratchet-regrowth (carve DONE, only enforcement vacuous).

---

## §F · Counts

| axis | value |
|------|------:|
| Promotion rows REBOOKED-ORPHAN (§B) | 5 / 8 (A1,A2,D1,D2,E1) |
| Registry §1 rows REBOOKED-ORPHAN | 12 (#7-paint,10,13,14,16,27,29,34,36,37,38,40,41,42,43 — 15 incl. paint splits) |
| Registry §1 enforcement-vacuous (gate deleted, subject stands) | reg 21,22,24,28 + all §2/§3 born-RED gates |
| CHRONIC §4a device rows REBOOKED-ORPHAN | 5 |
| open_questions STILL-OWNED / orphaned-at-cut | 6 (§6) + 8 Baseline-book (§6.1) + inline-edit |
| Named 3+-hop DISEASE rows now orphaned | 8 clusters (§E) |
| Machine-gated spine gates deleted by P000 | ~384 proof-* → 0 |
| Released outside terminal contract | 5.0.0 (`9a8761f0`) + 6.0.0 (`e5b3a209`) |
| DONE-VERIFIED headline chronics | G1 (SRC), F1, #17, drawer, viz-deletions, /deck |

**Bottom line.** The B-band did land (as ancestors of HEAD), and the single most load-bearing chronic
(G1 SRC-restructure) is genuinely resolved. But the P-execution's opening move (P000) deleted the
entire chronic-enforcement machine the ledgers were built to run on, then abandoned its own receipt
protocol after P001, ran ~67 unreceipted conventional commits, never executed the #92/#93/#95
close-waves the ledgers route ~20 chronic rows to, and shipped 5.0.0 + 6.0.0 in direct violation of
the release-forbidden-until-terminal contract. The re-booking disease this audit exists to catch is
present and severe: the owners of the highest-hop chronics (device/Safari/π verification, gestalt
acceptance, the two ledger-integrity meta-gates, the BD demo-tail, the cross-repo consumer ACK) were
superseded by the P-graph and **never ran and now never will under the current execution style.**
