# CURE-ORDER #66 CLOSE + 8.0.0 — driver-ratified residue (2026-08-09)

Adjudicator (Fable, quartet run wf_821eb4e2-566) ruled CURE-REQUIRED. The driver
ratifies all six cures. What STANDS: the cut itself — every green independently
reproduced with real exit codes by seat + both challengers (typecheck both arms 0
· build 0 · demo:dist:build 0 · narrow battery 0 with 1538 passed | 5 xf, zero
unrouted · full npm test 0 at 1947 | 5 xf · verify:package 0, tarball 02a3a8d3…
922,642 B, ratchet equal · receipt character-identical at rosterSha256:00086bd4
violations:0 · regen-exports EXACT 70/70 · public-surface 87/87 · the
13-foreign-path fence re-hashes 16853a6d… ≡ step-0 · version 8.0.0 · exports 70
· CHANGELOG dated · gates exactly 60 · the export-cut MIGRATION rows present) ·
the clean-checkout rehearsal paid three times with byte-identical tarball
reproduction · the two parked paths + darkModeSyncScript untouched inside the
fence hash.

## Cures (exact, from the adjudication; driver rulings inline)

- **CURE-66-1 (BLOCKS THE COMMIT — the hand-typed digests):** in
  `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/GATE-SEMANTIC-ROSTER-C20.json`
  set `machineLaw.activeSemanticClassIdDigests` to the DERIVED values per the
  roster's own recipe SHA-256(JSON.stringify(active row IDs in roster order)):
  base-product-tooling =
  `a562639a3d3b717a5843a9a75403303460a2ab5c5b5f086ff3659affe728cf59`,
  component-behavior =
  `b1b725f4ccd997c37c6682e05c42f0e60e56e8a623144fe2736468c2dfc7aa00`
  (three independent derivations concur; the recipe reproduces HEAD's pinned
  digests byte-exactly). Then recompute the roster sha256, move
  `PINNED_ROSTER_SHA256` at `scripts/gate-register.mjs:117`, re-author the `:91`
  "second-and-last movement" comment honestly (a third movement, cause named),
  update EVERY quotation of `00086bd4` + the receipt line (RECORD.md:42/:50/
  :110/:290, PASTE-BLOCKS.md:15/:94/:96 + the §4 commit-message block), and add
  a dated strike bracket on RECORD.md's false "recomputed…verified to reproduce
  the prior digests byte-exactly" claim.
- **CURE-66-2 (BLOCKS THE TAG — MIGRATION grain/specular):** correct
  MIGRATION.md:416 and :467 (grain/specular are NOT retained — the shipped
  Surface d.ts is tier/surface/deep/class only; Card adds size/shadow/selected
  and states "grain and specular are gone from the whole library"); add explicit
  §8.0.0 removal rows for Surface/Card `grain`, `specular`, and the
  `SurfaceSpecular` type (declared at v7.0.0 — a breaking removal; under
  checkUnknownProps a consumer keeping `<Card grain specular>` hard-errors);
  dated brackets on the §7.0.0 rows at :531-532 whose successors are dead
  (CardSpecular→SurfaceSpecular, CardSurface→CardVariant).
- **CURE-66-3 (BLOCKS THE TAG — G-PACK-INSTALL honesty; DRIVER RULING: the
  PEERS ARM):** the `scripts/verify-export-types.mjs:623` injection of
  `vue-component-type-helpers` rests on a false premise (reka-ui@2.10.1 declares
  it only in devDependencies — no consumer install gets it), so the release gate
  greens over a real skipLibCheck:false consumer break — the masking shape.
  Execute the adjudicator's preferred arm: declare `vue-component-type-helpers`
  in glass-ui's peerDependencies (range compatible with reka-ui's ^3.0.3 usage),
  DELETE the injection line (the sandbox receives it through the declared-peers
  path like pencilPeer), add the MIGRATION §8.0.0 + CHANGELOG row naming the
  reka-ui upstream packaging defect. The keep-the-injection alternative is NOT
  taken. The package.json change re-moves the ratchet + tarball figures —
  re-measure everywhere they are quoted, never copy.
- **CURE-66-4 (record truth, all five):** (a) apply the owed dated strikes at
  row65 RECORD.md:154-155 ("48→47/53→52/7→8" → "48→46/53→51/7→9"; "exports
  66→65" → "66→70") — the paste blocks exist at row66 PASTE-BLOCKS §3, apply
  them; (b) RECORD.md:99 + PASTE-BLOCKS.md:15 — `build-consumer-ledger.mjs`
  EXISTS (git-tracked at docs/tranches/BJ/audits/2026-07-28-consumer-constellation/,
  13,913 B); re-label the walk "read from the 2026-07-28 ledger, corroborated by
  fresh grep"; (c) RECORD.md:244 + PASTE-BLOCKS.md:15 — strike the false
  "enumerated in MIGRATION.md §8.0.0" sentence; correct 47 edges → the fresh 52
  (forms 36/8 roots, dropdown-menu 16/6, sheet 3/2) with the five blind-spot
  edges named (atlas vi.mock ×2, words vite.config optimizeDeps ×2, speedtest
  vite.config ×1) — carry to #76; (d) RECORD.md:269 + the fence census —
  porcelain 99 = 65 M · 30 D · 4 untracked (the 4th is the row's own record
  dir); (e) RECORD.md:294 — the true battery delta is 10 cases gone / 2 added,
  arithmetic 1544−9+1+2=1538.
- **CURE-66-5 (LOW):** non-vacuity guard on the second emitted-utility-vars arm
  (`tests/styles/emitted-utility-vars.test.ts`):
  `expect(others.length).toBeGreaterThan(0)` so the literal-forbidding arm
  cannot pass over an empty emission.
- **CURE-66-6 (after 1–3):** re-verify on the final tree — gate-register (new
  receipt line, violations:0) · verify:package (re-measure tarball sha/bytes +
  .bundle-ratchet rebind, name the delta) · narrow battery if tests moved · ONE
  fresh pristine git-archive rehearsal of the seven release.yml steps with real
  exit codes · re-quote every figure in RECORD.md/PASTE-BLOCKS.md — measured,
  never carried.

## Driver notes ratified (not cures)

release/4.3.0 (28cf1cd1) measured superseded (its Δ-set targets the removed
custom/dock/**) — fold-verify-then-delete stands, the branch write is the
DRIVER's, post-tag. Hazard 1 (prepublishOnly typecheck-before-build needs a
built tree; release.sh runs in one) and Hazard 2 (regen-exports bumps
package.json mtime and REDs boot-graph staleness until demo:dist:build re-runs
— keep the charter's ordering) recorded, no cure. The KiB-rounding dismissal
(503,421→503,808, absolute tighten from 512,000) stands recorded.

## Driver duties at commit/tag (not the cure seat's)

Fence: final-minus-baseline (/tmp/bk-row66-baseline-<epoch>.diff per the seat's
step-0 bank) with the 13-foreign carve-out re-hashed (the ten doc-truth paths
LAND with this row; typography.vue + aurora.vue + darkModeSyncScript.ts stay);
scoped add per the census (99 porcelain: 65 M · 30 D · 4 untracked); verify
every edit's replace count NONZERO before the chain; ⊕-index at commit time
(expect ⊕⁷³); commit → push → tag via scripts/release.sh v8.0.0 → push tag
(release.yml runs the gated provenance publish); then the ⊕⁷⁴ close annotation
+ the release/4.3.0 fold-verify-then-delete.
