# H — Deep-Audit Lane α (cross-tranche plan-vs-actual)

**Date**: 2026-05-05.
**Lane**: deep-audit α — cross-tranche plan-vs-actual at HEAD post-H-close (`c5f196c`).
**Method**: read-only walk of `docs/precepts/instructions/{README.md,tranche/SPEC.md}`, every `docs/tranches/{C..H}/FINAL.md`, H-tranche `H.md` + `PROGRESS.md` + `FINAL.md`, and the four W6 audit lanes against actual repo state. Every claim cites an exact `git`/`rg` invocation or `file:line`. No source files modified, no destructive git commands run.

## 1. Preamble

H closes seven waves on commit chain `bbdd896 → 97c825e → e2ad404 (interlude) → 68e4097 → b4927ae → f3caa9f → 28e6c6a → 4a2b382 → 13ca1c3 → c5f196c` (10 commits), wires-or-retires 77 G-shipped artefacts, lands the canonical 4-agent post-close audit pattern, and emits three R-NEW-* residuals. Substrate clean: β confirmed 0 G-orphans; build dropped 10×; G's lessons promote to binding precepts (submodule `cc57c91`).

What this deep-audit surfaces: (a) W6 close commit `c5f196c` is one atomic commit holding audit deliverables AND FINAL.md (`git log --oneline c5f196c -- docs/tranches/H/audit/ docs/tranches/H/FINAL.md` returns one commit) — H invariant 4 chronology held semantically but not as separate commits; (b) the 3 β-flagged sub-bar CVAs shipped without `docs/consumer-evidence/<artefact>.md` files, which Refined-D demands (`docs/audits/overfitting-audit.md:36,40`); (c) post-FINAL fix commits `ca34354` + `9427536` landed three real bug fixes from a Playwright + Chrome MCP deep-visual audit after FINAL.md — H's own gates closed clean but a deeper visual gate caught latent issues; (d) three G-δ gestalt violations carried into H invariant 5: Tabs WAS delivered (verified at HEAD; δ audit's "not delivered" claim is FALSE — FINAL.md:110 correctly identifies); `--cartoon-shadow*` became R-NEW-2; `--accent-pink` offloaded to "consumer-evidence territory" with no R-N.

## 2. Chronic-deferral inventory

Each named residual at H close, traced to first appearance.

| Residual | First seen | Tranches survived | Current named destination | Honest or stale |
|---|---|---:|---|---|
| **R4** `<HarmonicLevelGrid>` / Filmstrip | G FINAL.md:96 (W6-residuals, 2026-05-04) | 1 (only G→H) | "out of scope; consumer territory; ≥2-bar fail" — no destination | **honest** (decided on bar-fail; not a deferral) |
| **R5** Blob Web Worker | G blob/SPEC.md:453 §11.4 user-lock (2026-05-04, pre-Wβ0) | 1 (only G→H) | locked-deferred, trigger 8+ multi-instance use cases | **honest** (user-lock with named trigger; not a stall) |
| **R-NEW-1** 41 pre-G stories needing aesthetic uplift | H W4 design-fidelity rerun (2026-05-05) | 0 (newly named at H close) | "future tranche workstream — ~30 lines per story" | **honest** (origin, scope, and shape all named) |
| **R-NEW-2** `--cartoon-shadow*` round-trip aliases (8 tokens) | G δ §4.4 (`tokens.css:240-244,289-291` ↔ `theme.css:228-232,243-245`) | **2** (G FINAL → G-FINAL-II → H) | "future docs-only tranche or Tailwind-4-@theme-cleanup pass" | **stale-trending** — survived G's "honest re-close" without retire and survived H's wire-or-retire surface trim |
| **R-NEW-3** 3 stale D-tranche evidence-doc Source paths (`animated-number.md`, `use-animated-number-options.md`, `use-animated-number.md`) | β audit at H close, but the speedtest paths were stale before H opened | 0 (newly named at H; underlying staleness ≥ 1 tranche) | "docs-only refresh in future tranche or speedtest follow-up" | **honest** (newly diagnosed) |

**Top 3 stalest residuals**:

1. **R-NEW-2 `--cartoon-shadow*`** — 2 tranches. G δ §4.4 recommended deletion ("`--shadow-*` form wins and `--cartoon-shadow-*` deletes"); G-FINAL-II carry; H W1 Lane E retired 23 tokens but not these 8. δ re-flagged at H W6; FINAL.md:70 reframes as R-NEW-2.
2. **`--accent-pink` orphan** — same lineage (G δ §4.2; preserved against G invariant 2; carried). H FINAL.md:113 reroutes as "consumer-evidence territory" rather than R-NEW-N. **Silent narrowing**: zero non-self consumers (`tokens.css:205,587` + `theme.css:113`); per Refined-D demotes to library-orphan; "consumer-evidence territory" without a consumer-tranche-in-progress IS the projection-only pattern H invariant 2 forbids.
3. **R5 Blob Web Worker** — 1 tranche; user-locked at G blob/SPEC.md:453 §11.4 behind 8+ multi-instance trigger. Honest because trigger is concrete.

## 3. H wave-by-wave plan integrity

For each wave, the W6 close commit's stat reconciled against the wave-spec File Bounds.

### W0 (`97c825e`)
- Wave-spec: `audit/W0-reconciliation.md` (164 rows) + `docs/precepts/instructions/` submodule update.
- Actual: `git show 97c825e --stat` shows W0-reconciliation.md (314 lines), PROGRESS.md (47 lines), submodule pointer 458c2d1 → cc57c91. Match.
- Internal contradiction: PROGRESS.md:47 names "W0 close commit `e6f1411`" (dangling; not on HEAD chain); Status table line 107 names `97c825e` (HEAD-reachable). γ flagged P3.

### W1 (`68e4097`)
- Wave-spec: 5 lanes (custom / composables / utilities+tokens / CVA / runtime); each lane proof + reconciliation result.
- Actual: 5 proof docs + reconciliation result present. 77 retires landed.
- Internal contradiction: PROGRESS.md:85 + Status table line 108 cite `4a3da38` (dangling; sibling worktree only); HEAD chain rides `68e4097`. γ flagged CRIT-4.
- Arithmetic drift: W1-A-proof.md + W1-B-proof.md claim "10 export lines deleted from src/index.ts"; δ verified at `git diff 97c825e..68e4097 -- src/index.ts` shows 6.

### W2 (`b4927ae`)
- Wave-spec: docs-only on DESIGN.md; 47 W0.β drift rows + verify rows 53-56.
- Actual: `git show b4927ae --stat` shows 1 file changed, 188 insertions / 106 deletions on DESIGN.md only. 57/57 rows resolved (W2 expanded scope to absorb pass-2 carryover). Match.
- Caveat: the e2ad404 interlude landed P-tranche DESIGN.md sections that W2 left untouched; α flagged.

### W3 (`f3caa9f`)
- Wave-spec: dock-keep-open sink (Lane I) + Slider glass-track variant (Lane II).
- Actual: `dist/dock.d.ts:310,335` ships `DOCK_KEEP_OPEN_SINK_KEY` + `interface DockKeepOpenSink`; `Slider.vue:11-19` extends variant union; 5 fourier+EditorControls consumer ledger sites enumerated. Match.
- Internal contradiction: commit subject "slider glass-track variant + dock keep-open sink"; W3.md hard-gate (e) named "round-trip" not "sink". α flagged as wording variation.
- Open question (δ CRITICAL-1): dock-keep-open has dual authority — `DockPopover` consumes raw `dockKeepOpen`/`dockRelease` provide-keys (`DockPopover.vue:38-46`); Slider consumes the new sink (`Slider.vue:44-56`). FINAL.md:109 disposes as "layered API, not violation" (the function-keys are dock-internal primitives consumed by sibling dock components; the sink is the leaf-consumer facade). The disposition is defensible but is *not* one-path KISS.

### W4 (`28e6c6a`)
- Wave-spec: slider-glass-track story + manifest entry + design-fidelity rerun.
- Actual: 1 new story landed (`primitives/slider-glass-track.vue`); manifest:124 entry; rerun scored 36 PASS / 41 NEEDS-REPAIR / 0 FAIL. The 41 NEEDS-REPAIR became R-NEW-1.
- Cosmetic discrepancy: trailing `</content></invoke>` tags survive in `W4-coverage-result.md:89-91` and `W4-design-fidelity-rerun.md:153-155` (Write-tool artifact). α flagged; W6 absorb did not strip them.

### W5 (`13ca1c3`)
- Wave-spec: Playwright capture script + CI workflow + `audit/W5-stress-baseline.md` + `__blobStressMetrics` story extension.
- Actual: all four artefacts present (`scripts/stress/blob-stress-capture.mjs` 17022 bytes; `.github/workflows/stress.yml` 2559 bytes; baseline doc 60 lines; `_internal/blob-stress.vue:84-86`).
- Real measured numbers (FPS 119.62 / Mem 0 KB · M4 Max · Chromium 147), not deferred-to-CI. Match.
- Discrepancy: threshold-check table renders the per-frame mean-RAF-delta verdict as "n/a" while a number IS captured (8.36 ms vs 0.50 ms reference); α flagged.

### W6 (`c5f196c`)
- Wave-spec: orchestrator pre-close + 4 audit lanes + absorb + FINAL.md.
- Actual: `git show c5f196c --stat` shows 20 files / 1241 insertions / 67 deletions. Includes H-pre-close.md + 4 audit deliverables + FINAL.md + 7 wave-spec status updates + CLAUDE.md + PROGRESS.md + H.md + 4 recovery-diary scrubs (utilities.css, blob/index.ts × 2, flourishes.vue).
- **Audit-before-FINAL chronology**: see §7.

## 4. Cross-tranche chrome matrix

Items that appeared in earlier-tranche plans, were not delivered, named in next-tranche residual, and current state at HEAD:

| Item | First plan | First deferral | Re-named in | At HEAD | Verdict |
|---|---|---|---|---|---|
| Tabs `provide`/`inject` refactor (variant on List + Trigger) | G δ §1.3 | G FINAL.md was unclear; G-FINAL-II:117 claimed "Tabs provide/inject pattern adopted (matches ToggleGroup)" | H invariant 5 (named for refactor) | **Delivered** — `Tabs.vue:13` provides; `TabsList.vue:12` + `TabsTrigger.vue:12` inject | **honest at HEAD** — δ audit's "not delivered" claim is FALSIFIED; FINAL.md:110 correctly identifies the audit error |
| `--cartoon-shadow*` aliases | G δ §4.4 — recommended retire | G FINAL → G-FINAL-II carry | H W6 → R-NEW-2 | All 8 aliases survive at `tokens.css:240-244,289-291`; round-trip in `theme.css:228-232,243-245` | **chronic** — 2 tranches; H W1 Lane E retired tokens but not these |
| `--accent-pink` orphan | G δ §4.2 — recommended delete | G FINAL kept (rescinded retire per W0 challenge §B.1); G-FINAL-II carry | H FINAL.md:113 — "consumer-evidence territory" (no R-N) | At `tokens.css:205,587` + `theme.css:113`; zero non-self consumers | **silent narrowing** — never given an R-N residual ID despite same shape as R-NEW-2 |
| NumberField cartoon descendant-attr-selector outlier | G δ §1.4 | G FINAL silent | not in H residuals | At `number-field/index.ts:18-19` | **silently dropped** — δ called it unresolved; not in any tranche FINAL.md residual list |
| Cartoon recipe duplicated 4× across CVAs (Button/Select/Input/NumberField) | G δ §1.2 | G FINAL silent | not in H residuals | At HEAD | **silently dropped** — δ §4 noted unresolved |
| Card variant=cream / paper duplicate authority with `<CreamSurface>` / `.paper-N` | G δ §10 | G FINAL silent (out of G scope per plan) | not in H residuals | At HEAD | **out of scope per G plan; carries** |
| 7 storyless G artefacts (`<KeyboardShortcutsModal>`, etc.) | G W4 ledger projection only | G FINAL R6 | H W1 retired all 7 | All zero hits at HEAD | **closed cleanly** |
| 47 W0.β DESIGN.md drift rows | G W0.β | G FINAL R7 | H W2 closed 57/57 | DESIGN.md 1174 lines | **closed cleanly** |
| Wβ stress runtime profile | G blob/Wβ3 | G FINAL R2 (deferred to consumer-CI) | H W5 closed | Real numbers captured M4 Max | **closed cleanly** |
| `<Slider variant="glass-track">` round-trip | G W3 | G FINAL R3 | H W3 closed via `dockKeepOpenSink` | At HEAD | **closed cleanly** |

**Silently dropped count**: 2 (NumberField cartoon outlier; Cartoon recipe 4× duplication). Both were G δ findings, not present in any tranche FINAL.md residual list at HEAD, and remain visible at HEAD source. δ called both unresolved at H W6 (§4 row §1.2 + row §1.4) but the absorb did not lift them into a named-destination R-N.

## 5. W6 absorb completeness — per finding per lane

α findings (6 minor + 1 silent addition):

| α finding | Disposition in FINAL.md | At HEAD | Status |
|---|---|---|---|
| `e2ad404` interlude | absorbed: H FINAL.md:84 + PROGRESS.md:87 + H-pre-close.md:21,74 all flag it | unchanged in source; doc trail present | **absorbed** |
| PROGRESS.md W1 hash `4a3da38` → `68e4097` | γ CRIT-4; FINAL.md and γ both call for canonicalization | `git show c5f196c -- docs/tranches/H/PROGRESS.md` shows the W6 commit edits PROGRESS.md (37-line delta); `rg '4a3da38' docs/tranches/H/PROGRESS.md` returns hits at lines 85 + 108 still | **partially absorbed** — γ claimed corrected; the hash lives at HEAD |
| W2 typecheck disposition note | trivial, doc-only | not edited at W6 | **silently dropped** (cosmetic) |
| W3 commit subject "sink" vs "round-trip" | wording variation; FINAL.md accepts | accepted as-is | **acknowledged** |
| W4 trailing `</content></invoke>` tags | cosmetic doc-only | `rg '</content></invoke>' docs/tranches/H/audit/W4-*.md` returns matches at HEAD | **silently dropped** |
| W5 mean-RAF-delta verdict cell label | cosmetic doc-only | not edited at W6 | **silently dropped** |
| `e2ad404` author-identity hedge | informational | doc trail correctly notes user-attribution at HEAD | **absorbed** |

β findings (3 sub-bar CVAs + 3 stale evidence docs + 1 sink-single-chain):

| β finding | Disposition in FINAL.md | At HEAD | Status |
|---|---|---|---|
| Toast `variant="inverse"` sub-bar | FINAL.md:91: "Future tranche may emit `docs/consumer-evidence/<artefact>.md`" | no evidence doc at HEAD; verdict held as "keep-current second-branch reading" | **deferred-without-name** — β recommended (a) accept second-branch reading + document, OR (b) emit 3 evidence docs; FINAL.md picked (a) implicitly without naming the alternative |
| ToggleGroupItem `variant="card"` sub-bar | same | same | **deferred-without-name** |
| Slider `variant="glass-track"` sub-bar | same | same | **deferred-without-name** |
| 3 stale D-tranche evidence docs | absorbed → R-NEW-3 | unchanged at HEAD | **absorbed-with-name** |
| Sink single-chain consumer | FINAL.md:93: "cleared via in-repo def + consumer" | unchanged | **absorbed-with-rationale** |

γ findings (6 critical doc-drift):

| γ finding | Disposition | At HEAD | Status |
|---|---|---|---|
| CRIT-1 CLAUDE.md runtime-tokens line | absorbed in W6 | `rg 'chartNeutrals\|vizColorsHex' CLAUDE.md` returns 0; live exports correct | **absorbed** |
| CRIT-2 CLAUDE.md `composables/{color,monaco}` | absorbed in W6 | `rg 'composables/.*color.*monaco' CLAUDE.md` returns 0 | **absorbed** |
| CRIT-3 CLAUDE.md custom-package tree | absorbed in W6 | CLAUDE.md count line says 40 dirs | **absorbed** |
| CRIT-4 PROGRESS.md W1 hash | absorbed | `rg '4a3da38' docs/tranches/H/PROGRESS.md` STILL returns matches; FINAL.md:101 says "PROGRESS.md W1 hash: corrected to `68e4097`" — claim is partial | **claimed-not-fully-realized** — see contradiction below |
| CRIT-5 7 wave-spec Status lines | absorbed in W6 (`git show c5f196c -- docs/tranches/H/waves/W*.md` shows 7 single-line edits) | each wave file's `**Status**:` line updated | **absorbed** |
| CRIT-6 H.md wave-table + R-NEW-1 | absorbed | H.md edited (30-line delta) | **absorbed** |
| Brittleness window check | "no undeclared brittleness window detected" | confirmed at HEAD | **absorbed** |

δ findings (3 critical + 23 recovery-diary leaks claimed; 4 verified):

| δ finding | Disposition | At HEAD | Status |
|---|---|---|---|
| CRITICAL-1 dual-authority on dock keep-open | FINAL.md:109: "layered API, not a violation" + documented inline | unchanged in source | **acknowledged-without-fix** |
| CRITICAL-2 Tabs not delivered | FINAL.md:110 says δ was incorrect; verified at HEAD | `Tabs.vue:13` provides; `TabsList.vue:12` + `TabsTrigger.vue:12` inject | **falsified** — δ's claim was wrong; FINAL.md correctly identifies |
| CRITICAL-3 `--cartoon-shadow*` round-trip | absorbed → R-NEW-2 | tokens still at HEAD | **absorbed-with-name** |
| 23 recovery-diary leaks | "23 claimed; 4 actually verified; scrubbed in W6 absorb" | `rg -n 'H\.W[0-9]\|user-direction\|silent-failure' src/ demo/` at HEAD: see verification | see below |
| `--accent-pink` orphan (δ §4.2 sister-finding) | FINAL.md:113 says "→ consumer-evidence territory" | tokens.css:205,587 + theme.css:113 still define; zero consumers | **silently narrowed** — no R-N issued |
| NumberField cartoon outlier (δ row 12 / G δ §1.4) | not in FINAL.md residuals | unchanged | **silently dropped** |
| Cartoon recipe 4× duplication (δ §4 row §1.2) | not in FINAL.md residuals | unchanged | **silently dropped** |
| W1 proof "10 export lines" arithmetic (δ Check 10) | not in FINAL.md absorb | proof docs unchanged | **silently dropped** |
| Slider `R3` markers (δ row 15) | not scrubbed | `rg -n '\bR3\b' src/components/ui/slider/Slider.vue` returns 3 hits at HEAD | **silently dropped** |
| Orphan `class="svg-filters"` on blob.vue (δ row 7) | not absorbed | unchanged | **silently dropped** |

**Verification of γ CRIT-4**: W6 edited PROGRESS.md (37-line delta) but at HEAD `rg '4a3da38' docs/tranches/H/PROGRESS.md` still returns line 85 (history paragraph) — only Status-table cell canonicalized. FINAL.md:101 says "corrected to `68e4097`" — partial, not full.

**Verification of δ recovery-diary scrubs**: 4 sites scrubbed (utilities.css:159, blob/index.ts × 2, flourishes.vue:243); 19 sites survive at HEAD (G.W tags in src/index.ts × 7, theme.css × 3, GLSL provenance × 2, Slider R3 × 3, blob story comments × 2, etc.). FINAL.md:112 reframes as "23 claimed; 4 actually verified" — defensible (the 19 are GLSL license, version-history, or grouping comments, not recovery-diary), but the count optically inflates absorb.

**Silently-dropped count**: 4 cosmetic + 4 substantive (NumberField outlier, Cartoon 4× recipe, W1 arithmetic, Slider R3 markers). The substantive ones are repeated G→H ignores.

## 6. Sub-bar CVA evidence-doc gap analysis

Per `docs/audits/overfitting-audit.md:36`: *"`keep-current` — exactly 1 usage site... requires a matching `docs/consumer-evidence/<artefact>.md` file and a fresh rerun of that file's cited proof grep."*

β found 3 sub-bar CVAs (Toast inverse, ToggleGroupItem card, Slider glass-track) all with exactly 1 distinct consumer file. Per Refined-D, each requires an evidence doc. None exist at HEAD (`ls docs/consumer-evidence/` returns 25 entries, all D-tranche).

H invariant 2 has a relaxed second-branch reading: "≥2 in-repo call sites... **or two stories that exercise distinct shapes**". β recommended either (a) document the second-branch reading in FINAL.md OR (b) emit 3 evidence docs. FINAL.md:91 picked (a) implicitly: "Future tranche may emit..."

**Per `feedback_overfitting_audit` Refined-D verdict precedence, this is a silent narrowing.** The strict reading requires evidence docs NOW; the second-branch reading demands two distinct story files, not "one story with multiple attribute uses" — slider-glass-track has 6 attribute mentions in 1 file across 3 hero shapes + 3 dock-bridge layers; Toast inverse has 2 attribute + 3 CVA-direct calls in 1 file; ToggleGroupItem card has 6 attribute mentions in 1 file. H invariant 1 ("C, D, D-II, E, F, G precepts still bind") inherits Refined-D; using a relaxation as the default while never emitting evidence docs converts it into a silent narrowing.

**Verdict**: FINAL.md should have either (i) explicitly amended invariant 2 with a rationale and named the relaxation as a precept update for I, or (ii) emitted the 3 evidence docs in W6. Option (b) was on the table per β; FINAL.md picked neither cleanly.

## 7. Audit-before-FINAL chronology verification

H invariant 4: *"Post-close audit runs BEFORE FINAL.md is final. The 4-agent challenge pattern is part of the close ceremony, not an after-the-fact pass."*

`git log --oneline c5f196c -- docs/tranches/H/audit/H-audit-α-plan-vs-actual.md` and `... -- docs/tranches/H/FINAL.md` both return one commit: `c5f196c`. Both audit deliverables and FINAL.md land in the same atomic commit.

**Strict-chronology reading**: invariant demanded audit-before-FINAL as separate commits → bundled → **violated**.
**Semantic-chronology reading**: invariant demanded findings-inform-FINAL, sequenced in working-tree time. Commit message + PROGRESS.md:122 both sequence "1. Pre-close 2. 4-agent dispatch 3. Findings absorb 4. FINAL.md authored AFTER absorb completion". `tranche/SPEC.md:124-126` reads "absorbed BEFORE `FINAL.md` is final" — "final" (lowercase) suggests semantic finality, not commit boundary. **Reading 2 is canonical.**

**Verdict**: chronology held semantically. Recommendation for I: separate audit-deliverables commit from FINAL.md commit to create a verifiable git-chronology trail.

## 8. Verdict

**Clean-with-acknowledged-debt.**

Hard gates clear:
- 0 G-artefact library-orphans at HEAD (β confirmed).
- 77 G artefacts retired cleanly; build dropped 10×; public surface narrowed by ≥6 export lines + 4 dirs + 4 runtime helpers.
- Build green / typecheck green at every wave close.
- 4 binding precepts promoted (`cc57c91`).
- 4-agent post-close audit pattern delivered.
- 3 chronic-deferral G residuals closed (R2, R3, R6, R7); 2 carry honestly (R4 bar-fail, R5 user-lock).

Acknowledged debt that prevents "clean" rather than "clean-with-debt":
- **R-NEW-2** (`--cartoon-shadow*`) survived G→G-FINAL-II→H without retire despite G δ §4.4 explicit recommendation. H W1 Lane E retired 23 tokens; not these 8. The named-destination ("future docs-only tranche") is honest but the chronic-deferral pattern echoes G's R-residuals.
- **`--accent-pink`** orphan was offloaded to "consumer-evidence territory" without an R-N residual ID. Same shape as R-NEW-2; given different treatment. **Silent narrowing.**
- **Sub-bar CVA evidence docs** were deferred to "future tranche may emit" rather than emitted in W6. Per Refined-D this is a silent narrowing of the audit precedence the H plan explicitly inherits.
- **2 G-δ violations silently dropped at H close**: NumberField cartoon descendant-attr-selector outlier (G δ §1.4); Cartoon recipe 4× duplication across CVAs (G δ §1.2). Neither has a named-destination residual; both visible at HEAD source.
- **Atomic-commit chronology**: audit deliverables and FINAL.md land in same commit; semantic reading of H invariant 4 holds, strict reading does not.

Not violations but worth flagging:
- 19 of δ's 23 recovery-diary leaks survive at HEAD; FINAL.md:112 reframed the count as "23 claimed; 4 actually verified" which is technically defensible but optically inflates the absorb.
- Two post-FINAL fix commits (`ca34354`, `9427536`) landed three real bugs from a Playwright + Chrome MCP deep-visual audit run AFTER FINAL.md was authored. The bugs (GLSL `#version` line-1 violation; `metric-strip.vue` import path; Chrome WebGL context-cap exhaustion) are honest fixes, but their existence implies H closed clean by its own gates while a deeper visual gate caught latent issues. This argues for adding a Playwright + Chrome MCP visual-audit pass to the canonical close ceremony for tranche I.

## 9. Recommendations for tranche I

Top 3 (substantive):

1. **Open R-NEW-2 + sister-orphans (`--accent-pink`, NumberField cartoon outlier, Cartoon 4× recipe duplication) as a dedicated docs+source convergence wave.** All four are G δ findings that have survived 2 tranches; the chronic pattern erodes "no silent deferrals" trust. A single ≤200-line wave can retire `--cartoon-shadow*` aliases (rewrite `theme.css:228-232` to read `var(--shadow-cartoon-X)` directly), retire `--accent-pink`, hoist the cartoon recipe to `@utility cartoon-surface`, and decide the NumberField outlier.

2. **Emit the 3 sub-bar CVA evidence docs (Toast inverse, ToggleGroupItem card, Slider glass-track) OR amend the audit precedence with a documented relaxation.** β recommended path (a) or (b); H FINAL.md picked neither cleanly. Tranche I should pick one and write the rationale into the precepts. If amending precedence, the `feedback_overfitting_audit` Refined-D text needs an "ε" addition explaining the H-style "one story exercising multiple shapes" relaxation.

3. **Add a Playwright + Chrome MCP visual-audit pass to the canonical close ceremony.** The post-FINAL `ca34354` + `9427536` fix commits demonstrate that the 4-agent audit (read-only doc + grep) misses runtime-visual bugs (GLSL version-line, import-path resolution, WebGL context-cap). A 5th audit lane "ε — runtime-visual" running Playwright + Chrome MCP across all storybook routes before FINAL.md is authored would have caught the three bugs at H close rather than after. The lane is procedurally identical to the existing 4-agent dispatch; the artefact is `audit/H-audit-ε-runtime-visual.md` with per-route PASS/FAIL + console-error count.

Top 3 (procedural / discipline):

4. **Separate audit-deliverables commit from FINAL.md commit.** `c5f196c` bundles 5 audit docs + FINAL.md + 9 absorb edits + 7 wave-spec status updates into one commit; H invariant 4's git-chronology reading does not hold even though semantic reading does. A two-commit pattern (`feat(tranche-I/wN-audit): post-close 4-agent audit deliverables` then `feat(tranche-I/wN-final): close ceremony + FINAL.md absorb`) creates a verifiable git-chronology trail.

5. **Promote "no R-N is open if its shape is silent narrowing" as a binding precept.** R-NEW-2 was named with a destination; `--accent-pink` was given the same shape but no R-N. Future tranches should require: any G→H-shape orphan (zero non-self consumers in src/+demo/, named in a prior tranche's δ audit, not retired in the current tranche) MUST receive an R-N residual ID with a named destination, OR be retired in the current tranche. No "consumer-evidence territory" off-ramps without an R-N.

6. **Add an arithmetic-sanity hard gate to W*-proof.md docs.** W1-A-proof.md + W1-B-proof.md claimed "10 export lines deleted"; actual was 6 (δ Check 10). The proof's narrative held but its arithmetic didn't. A single `git diff --shortstat` line per proof doc, with the actual numbers, would have caught it.

## 10. Authority

Read-only deep-audit. No source files modified, no commits created, no destructive git command (`git stash`, `git stash pop`, `git checkout HEAD --`, `git reset`, `git branch -D`, `git push --force`) executed during this lane. Every claim cites an exact `git`/`rg` invocation or `file:line` reference. Word count: ~3,950.
