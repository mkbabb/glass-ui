# Perfected-BI addenda audit — Verification architecture, release truth, consumer truth

**Auditor role:** verification-architecture + consumer-truth census (read-only).
**Repo:** `/Users/mkbabb/Programming/glass-ui`. **HEAD:** `e5b3a209` (tag `v6.0.0`), branch `master`.
**Working tree:** 958 status rows — an in-flight uncommitted transaction that stages the "7.0.0 (unreleased)" work.
**Method:** every claim below carries a `file:line`, a commit SHA, or exact command output. Where a formation
promise could not be confirmed delivered, it is marked UNVERIFIED / DROPPED rather than inferred from a
commit subject.

---

## CENSUS 1 — VERIFICATION NOW

### The trajectory of the verification harness

| Stage | Commit | State of automated verification |
|---|---|---|
| Legacy gate mesh | pre-`1c2cda3a` | 403 gate identities + 387 `proof-*` runner files |
| P000 | `1c2cda3a` (2026-07-14 22:52) | Deletes 387 proof/runner files (155,426 deletions); installs ONE fail-closed verifier `scripts/verify.mjs` (2,486 lines) + `scripts/verification/{invariants,mutation-fixtures,discover}.mjs` + `scripts/tranche/{cursor,transaction-envelope,bootstrap-receipt}.mjs` + `tests/verification/engine.test.ts` (1,175 lines) + `tests/tranche/`. Wired into `.githooks/commit-msg`, `.github/workflows/ci.yml`, and (originally) release. |
| P001 | `b5eee380` (2026-07-15 10:19) | Adds receipt schema + transaction envelope + reconstructable cursor. Last commit with a `BI-Receipt-SHA256` trailer. |
| Post-P001 (~65 commits) | `ea3c002c`..`e5b3a209` | Receipt/cursor protocol ABANDONED. Every commit bypasses the hook. `ea3c002c` body: *"The commit hook is bypassed because it invokes the user-abrogated BI cursor/receipt verifier rather than a product check."* |
| In-flight working tree | uncommitted | DELETES the entire P000/P001 harness (see below) and reverts CI to `typecheck`+`test`+`build`. |

### (a) Verification that exists AT HEAD (v6.0.0, `e5b3a209`)

- `scripts/verify.mjs` and the whole `scripts/verification/`, `scripts/tranche/`, `tests/verification/`,
  `tests/tranche/` harness are **still present at HEAD** (`git ls-tree -r HEAD -- scripts/` confirms).
- The commit-msg hook is present at HEAD (`.githooks/commit-msg`, blob `df1521f2`) and calls
  `node scripts/verify.mjs --state auto --profile commit`. It was bypassed on every post-P001 commit.
- `HEAD:.github/workflows/ci.yml:22` runs `node scripts/verify.mjs --state auto --profile ci --wave-from-commit HEAD`.
  Given ~65 receiptless commits landed on first-parent history, this CI step cannot honor the receipt contract;
  the release path does not depend on it (below).
- **What actually gated the 6.0.0 publish** — `HEAD:.github/workflows/release.yml` (triggered on `v*.*.*`):
  `npm ci` → tag==version check → `npm run typecheck` → `npm run build` → `npm test -- --exclude tests/tranche/cursor.test.ts`
  → `npm publish --provenance`. **`scripts/verify.mjs` is NOT invoked in the release job.** The cursor test is
  explicitly excluded (per `e5b3a209` body: *"keep the release suite substantive by excluding only the cursor meta harness"*).
- `npm test` = `vitest run`; `vitest.config.ts:26` sets `environment: "happy-dom"` — device-free, no real browser, no paint.

**Net at HEAD:** the fail-closed engine exists on disk and in the commit-msg/CI wiring but is dead-lettered
(bypassed on commits, absent from release). The verification that actually ran for 6.0.0 = typecheck + build +
happy-dom vitest.

### (b) Verification that survives AFTER the in-flight transaction

The working tree deletes the harness outright (git status ` D`):

- `scripts/verify.mjs`, `scripts/verification/*` (5 files), `scripts/tranche/*` (6 files) — DELETED (dirs left empty on disk).
- `tests/verification/{engine,external-scenario-contract}.test.ts`, `tests/tranche/{bootstrap-receipt,cursor,transaction-envelope}.test.ts` — DELETED.
- `.githooks/commit-msg` — DELETED (` D`); `package.json` `prepare` script drops `install-hooks.mjs`.
- Working-tree `package.json` removes the `tranche:cursor` and `gen:structure` scripts.
- Working-tree `.github/workflows/ci.yml` reverts to `npm run typecheck` / `npm test` / `npm run build` (no `verify.mjs`; `grep verify.mjs .github/` → none).

**Surviving executable verification set (working tree):**

| Check | How run | Kind |
|---|---|---|
| `npm run typecheck` | `vue-tsc --noEmit` + test tsconfig | device-free types |
| `npm run build` | `vite build && vue-tsc emit + flatten-subpath-types` | package/declaration build |
| `npm test` | `vitest run`, `environment: happy-dom` | 165 device-free test files |
| `tests/public-surface.spec.ts` | under `npm test` | hand-maintained export-name surface assertion |
| `tests-visual/**` (172 Playwright specs incl. a `webkit`/Desktop-Safari project, `playwright.config.ts:117,123`) | `playwright test` in the `tests-visual` workspace | **NOT wired to CI, release, or any root npm script** — manual only |

### The 40 durable invariants: orphaned, not enforced

- `docs/tranches/BI/FORMATION/invariants.json` = **40 semantic invariant families** (`count: 40`, `schemaVersion: 1`,
  `sourceBase: 26c5ae68`), at the floor of the user-mandated 40-60 target. **The file is UNMODIFIED in the working
  tree** (`git status` clean) but its only runtime consumer (`scripts/verification/invariants.mjs` → `scripts/verify.mjs`)
  is DELETED. It becomes descriptive prose with no engine.
- Split by kind: **17 device-free** (8 `integrity.*`, 4 `architecture.*`, `design.token-graph`, `motion.single-clock`,
  `procedural.lifecycle`, `performance.resource-ownership`, `constellation.handshake`) and **23 browser** (6 `design.*`/a11y,
  4 `motion.*`, 7 `behavior.*`, 3 `procedural.*`, `performance.experience`, 2 `demo.*`).

### Invariant classes with NO surviving release-path check

| Invariant class | Families | Surviving check after transaction | Verdict |
|---|---|---|---|
| Public-surface / export reproduction | `integrity.entry-graph` | `tests/public-surface.spec.ts` (vitest, hand-maintained name lists). `scripts/regen-exports.mjs` + `scripts/verify-export-types.mjs` exist but are wired to NO npm script/CI. | PARTIAL — name-set only; the generated round-trip is manual |
| Governance / release gate | `integrity.cursor`, `integrity.dag`, `integrity.release`, `integrity.lineage` | none — the cursor/DAG/receipt machinery they describe is DELETED | ABSENT (semantically void) |
| Consumer imports / handshake | `constellation.handshake` | `scripts/verify-siblings-intact.mjs` only checks siblings are un-mutated (foreign-tree fence); it does not verify consumer import truth. No test resolves a sibling. | ABSENT |
| CSS cascade couplings | `design.material-hierarchy`, `design.token-graph` (paint half) | only `tests-visual/css-critical.spec.ts` etc. (unwired) | ABSENT from automation |
| A11y (contrast, PRM, focus/escape) | `design.contrast`, `design.adaptive-accessibility`, `motion.reduced`, `behavior.focus-escape` | a few happy-dom unit tests (e.g. `DockLayerRail.a11y.test.ts`); real contrast/PRM/forced-colors paint lives in `tests-visual/{a11y-*,forced-colors-skin,touch-target}.spec.ts` (unwired) | PARTIAL — paint half unwired |
| Motion / spring / PRM paint | `motion.spring-language`, `motion.transition-continuity`, `motion.scroll`, `motion.reduced` | happy-dom unit tests assert curve math; paint/settle is `tests-visual` (unwired) | PARTIAL — paint half unwired |
| Paint / π (all procedural + demo.gestalt + performance.experience) | `procedural.renderer-parity/color/interaction`, `demo.gestalt`, `performance.experience` | **entirely** `tests-visual/**` — unwired from CI/release | ABSENT from automation |

**Bottom line (Census 1):** After the transaction, enforced verification collapses to typecheck + build +
happy-dom vitest. The 40-family invariant taxonomy survives only as an un-run JSON document; **all 23 browser
families plus the 4 governance families have no automated check on the release path.** The single largest gap is
paint/π and native-Safari, which exist as a 172-spec Playwright suite that nothing in CI or release invokes.

---

## CENSUS 2 — RELEASE TRUTH

### The formation contract (what release required)

`EXECUTION-READINESS.md:106-110`: *"Release remains forbidden until all 134 cursor rows are terminal, every
applicable property and fresh native-browser obligation is green on the exact candidate tree, all nine in-scope
owner ACKs bind the candidate tarball, independent audit is clean, two clean convergence passes share the frozen
digest, and FINAL/tag/package bytes agree."*

### What actually shipped

- **v5.0.0** — tag on `9a8761f0` (`refactor(structure/ms4): flatten component families`), `package.json` version
  5.0.0, commit 2026-07-15 10:59, published ~15:02Z. **Cut mid-structure-migration** — ms5/ms6/ms7/ms8 (`bba7b51d`,
  `bb5c1e5c`, `4bf29831`, `f1acf31f`) all land AFTER the 5.0.0 tag commit.
- **v6.0.0** — tag on `e5b3a209` (HEAD), published ~21:37Z the same day.
- Whole execution compressed into ~19 hours on 2026-07-15; 67 commits from P000 to HEAD, of which exactly 2
  (P000, P001) carry receipts.

### The commits that dismantled the release gate

- `319cd711` (2026-07-15 15:01, "prepare the honest 6.0.0 producer boundary"):
  *"publication still depended on terminal tranche metadata instead of direct product validation … make the
  provenance workflow run typecheck, build, and tests directly. The obsolete BI trailer hook is bypassed because
  this commit explicitly removes release dependence on that meta process."*
- `b5216887` ("reconcile the Glass 6 bootstrap"): *"bypassed the BI transaction hook … direct product evidence
  above is authoritative"*; evidence = *"typecheck and production/type builds passed; release-critical suites
  passed 76/76; npm pack dry-run … ; the local all-suite runner was stopped after an open-handle stall; hosted
  Node 24 CI is the terminal full-suite witness."*
- `e5b3a209` ("preserve virtual grid semantics"): release suite excludes `tests/tranche/cursor.test.ts`.

### What the 6.0.0 cut DID verify

Per `HEAD:.github/workflows/release.yml`: `npm ci`, tag==version, `npm run typecheck`, `npm run build`,
`npm test` (happy-dom vitest minus the cursor test), `npm publish --provenance`. Plus the commit-body claims:
clean pencil-boil 0.9.2 install, 259 focused Pencil-integration tests, 76/76 release-critical suites, pack
dry-run confirming `ScrollProgressRim` present and `Section`/stacked-icons/empty-animate.css absent.

### What the 6.0.0 cut DID NOT verify (against the contract)

1. **134 cursor rows terminal — FALSE.** Protocol died after P001; ~65 receiptless commits. No cursor exists to
   be "terminal." value.js independently proved several formation waves were NOT implemented at 6.0.0 (Census 3).
2. **Nine consumer ACKs binding the candidate tarball — NOT obtained pre-publish.** No consumer handshake ran in
   release.yml. The two consumers that did adopt (atlas, sci-report) pinned 6.0.0 *after* the publish (atlas
   `package.json` 6.0.0 landed 2026-07-15 20:38, ~3h post-publish).
3. **Fresh native-browser (Safari/WebKit) evidence on the candidate tree — ABSENT.** Release ran happy-dom vitest
   only. The Playwright `webkit`/Desktop-Safari project (`tests-visual/playwright.config.ts:117`) is invoked by
   nothing in CI or release.
4. **Independent audit clean; two clean convergence passes sharing the frozen digest; FINAL/tag/package bytes
   agree — none run.** The formation FINAL/attestation ceremony was explicitly abrogated ("user-abrogated BI
   cursor/receipt verifier").

**Bottom line (Census 2):** 6.0.0 shipped on a deliberately reduced gate — typecheck + build + device-free
vitest + provenance. Every consumer-handshake, native-Safari, cursor-terminality, and convergence-audit
precondition from `EXECUTION-READINESS.md` was waived, not satisfied. This was an explicit decision recorded in
the release commit bodies, not an accident.

---

## CENSUS 3 — CONSUMER TRUTH

### Sibling pins at audit time (read-only)

| Consumer | glass-ui pin | value.js | keyframes.js | State vs 6.0.0 |
|---|---|---|---|---|
| **atlas** (`atlas/package.json`, v4.0.0) | `6.0.0` exact (dev) / `^6.0.0` (peer) | `3.1.0` / `^3.1.0` | `5.3.5` / `^5.3.5` | **ADOPTED 6.0.0** (landed 20:38, post-publish) |
| **sci-report** (`sci-report/dashboards/package.json`) | `6.0.0` exact | `3.1.0` | `5.3.5` | **ADOPTED 6.0.0** (pin-guard auto-resolve hazard resolved by explicit pin) |
| **value.js** (`value.js/package.json`, v3.1.0) | `file:../glass-ui` (dev) | — (self, 3.1.0) | `file:../keyframes.js` | co-located/current; satisfies `^3.1.0` floor; NOT yet at value 4.0.0 |
| **keyframes.js** (v6.0.0) | — (upstream producer) | dep `^3.1.0` | — | provides value `^3.1.0`; glass-ui peer floor is kf `^5.2.0` |
| **muster** (`muster/frontend`) | `^3.1.0` | `^0.10.0` | — | **STALE** — cannot even resolve 5/6.x |
| **slides** | `3.13.0` exact | — | `^3.0.0` | **STALE** — no adoption |
| **speedtest** | `^4.0.1` | `^0.13.0` | `^4.3.0` | **STALE** — no adoption |
| **words** (`words/frontend`) | `^3.0.0` (+ vendored d6 fork, not a registry consumer) | — | — | **STALE** |
| **bbnf-buddy** | `^3.9.0` | — | — | **STALE** |

**Nine-consumer handshake reality:** 2 genuine tarball adopters (atlas, sci-report), 1 file-linked (value.js),
1 upstream producer (keyframes.js), **5 stale non-adopters** (muster, slides, speedtest, words, bbnf-buddy). The
"all nine in-scope owner ACKs bind the candidate tarball" precondition is unmet.

### glass-ui 6.0.0 peer floor (`HEAD:package.json`)

kf `^5.2.0`, value `^3.1.0`, pencil-boil `^0.9.2` — and kf/value/pencil-boil are **optional** peers
(`peerDependenciesMeta`). The optionality softens the "unsatisfiable value peer" pin-guard hazard (npm warns, not
errors). The in-flight working tree bumps the floor to kf `^6.0.0` / value `^4.0.0` and drops CVA/clsx/perfect-freehand
from peers (the 7.0.0 CVA-removal).

### Ask-by-ask cross-check (roster: `asks-and-consumes.md`, dispositions: `INBOUND-MARKS.md`)

- **atlas #21 (flatten export-map delta)** — `atlas-outbound-2026-07-12-decision-0.md:11-13`: a dated old→new
  subpath table was OWED at `BI.W-STRUCTURE-RESEQUENCE` close. The flatten landed (ms4-ms8) but **no such dated
  outbound exists** in the coordination dir (newest atlas file is the 2026-07-12 decision-0). **DROPPED promise** —
  immaterial in outcome: atlas self-migrated to 6.0.0. Related `./styles/theme` (ATLAS-N C4) is **not exported at
  6.0.0** (`'./styles/theme' in exports` → False) — UNDELIVERED.
- **atlas #22b/c (dock greenfield contract note)** — OWED at `BI.W-DOCK-SPINE` close. Dock work landed
  (`70a7be9a`, `e3a10ab8`, `95b0d20f`) but **no dock contract-note outbound was produced**. DROPPED promise.
- **atlas #23 (BorderProgress successor → ScrollProgressRim)** — DELIVERED. `/scroll-progress-rim` exported at
  6.0.0; `ScrollProgressRim` shipped and iterated (`298bbbdd`, `d87d0bd1`, `e5b3a209`).
- **atlas #24 (`/deck` headless core)** — `/deck` exported at 6.0.0 (True). But 6.0.0 CHANGELOG removes
  `installDeckSpring`/`deckEase`/`DECK_SPRING` — the exact motion helpers the #24 outbound described as shipped —
  with no fresh outbound. Core survives; motion-helper surface changed silently.
- **atlas #25 (`@property` registration posture)** — DELIVERED as a ruling (informational, no code ask).
- **`./data-table` INBOUND-CONSUMER-PENDING** — HELD CORRECTLY. `./data-table` still exported at 6.0.0 (True) and
  actively developed (`4cdabdd1`, `e5b3a209`); atlas's recorded 2nd-party consume was not ruled dead.
- **value.js U-F77 / U-F34 co-land** — OPEN. value.js is still 3.1.0, not 4.0.0; the `{from}2{to}` rename +
  value `^4.0.0` peer widen are 7.0.0/value-4.0.0-window work (working tree stages the peer to `^4.0.0`). Not a
  6.0.0 blocker; the glass-side reader (`spectrum-walk` raw channel) was preserved.
- **keyframes lockstep** — 6.0.0 floor kf `^5.2.0` satisfied (atlas/sci-report pin 5.3.5). keyframes.js itself is
  at 6.0.0; the kf-`^6.0.0` lockstep is in-flight 7.0.0 work.
- **speedtest metric-pill OFFER (row 15)** — offer-only, 0 import sites; `MetricPill` deleted from glass-ui;
  nothing owed. speedtest is stale (`^4.0.1`) and never saw 6.0.0, so the offer stands unconsumed (acceptable).
- **slides adopt chain** — OPEN/UNACTIONED. slides at 3.13.0, kf `^3.0.0`; the `/constellation` + `/fourier-field`
  viz-subpath asks (roster row 11) remain BI-proposal-gated. No 6.0.0 adoption.
- **speedtest `/api` (row 1), muster `/api` (row 2)** — the `./api` key is dropped at 6.0.0 (`'./api' in exports`
  → False), but both consumers are stale (speedtest `^4.0.1`, muster `^3.1.0`) so the break has not yet reached
  them; the re-point asks are OPEN.

### The smoking gun — value.js's live 6.0.0 mismatch census

`valuejs-inbox-2026-07-15-v-formation.md` (State: *ACTION REQUIRED in the active post-BI execution*; cut chain
value 4.0.0 → kf 6.0.0 → glass-ui 7.0.0) reads the published 6.0.0 and reports, under *"Live v6 mismatch census
— do not report these as already shipped"*:

- `InstrumentChassis` (P122) still emits nested `<main>`, auto-emits `ChassisDivider`, old strip/dial/control
  slots — the P122 stage/inspector/action contract is ABSENT.
- `WatercolorDot` (P051) still exposes `tag?: "div" | "button"` — P051's face-only break is ABSENT.
- Typography (P019) — no family-neutral `1/√φ` kicker/headline pair; still independently clamped display tokens.
- Blob (P047) — settled seam + typed `BlobConfig.geometry.bodyRadius` exist, but the full measurement protocol
  does not.

*"These mismatches are why V targets 7.0.0."* This is independent third-party proof that a swath of the 134
formation waves (P019, P047, P051, P122, and the component-apotheosis cohort now staged in the working-tree
"7.0.0" MIGRATION section) were NOT implemented at the 6.0.0 cut — directly falsifying the "all 134 cursor rows
terminal" release precondition.

**Bottom line (Census 3):** Consumer coordination has a thorough terminal-disposition ledger
(`INBOUND-MARKS.md`, every row OWNED/DISCHARGED/DECLINED-TERMINAL), but "OWNED — BI.W-<wave>" is a routing
assignment, not a delivery receipt, and with the protocol dead several promised proactive outbounds (atlas #21
flatten table, #22 dock contract note, C4 `./styles/theme`) were silently dropped. Real adoption at 6.0.0 is two
consumers (atlas, sci-report); five are stale with open asks; `./data-table` pending-consumer protection held;
and value.js has formally flagged that 6.0.0 did not ship its named waves.

---

## Cross-census synthesis

The formation designed a fail-closed, receipt-driven, consumer-gated release machine. In execution it survived
exactly two waves (P000, P001) before being abrogated by user order; the remaining ~65 waves ran as ordinary
commits that bypassed the hook. 5.0.0 and 6.0.0 shipped on a typecheck+build+happy-dom-vitest gate with no
native-browser, no consumer ACK, and no cursor-terminality. The in-flight "7.0.0" transaction now deletes the
dormant harness entirely, leaving the 40 invariant families as an un-run JSON document and the 172-spec paint/π
Safari suite unwired from all automation. value.js has already caught 6.0.0 shipping incomplete formation waves.
The verification and consumer contracts were not met; they were explicitly set aside.
