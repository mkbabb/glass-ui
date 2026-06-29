# BG / BH JOINT 5.0.0 — VALIDATION REPORT

HEAD `ff0933a3` · branch `tranche/BG` · siblings-intact exit 0 (before + after)

## 2026-06-29 11:02 EDT — post-reset validation

**VERDICT: allProper = FALSE.** 24 waves audited; 23 `proper`, 1 `defect` (BG.W-DEFERRED-LEDGER, clobbered post-land). The CI/full battery carries 12 `realDefect=TRUE` reds (10 CI + 2 local-only) — every one is the "a wave changed code and left a registered close-gate un-re-pointed" class, NOT a reverted source deliverable. Clobber surface is NOT clean (1 finding). The core library is sound: `typecheck` / `build` / `test` (122 files, 1133 tests) / `verify-export-types` / `profile:budget` all GREEN. The actionable work is gate/ledger/registry re-points + 1 carve + 2 token/registry deletions + 1 comment reword — all owned by the SYNTH/fix wave, none a broken deliverable.

The `allProper` floor fails on all three predicates:
- per-wave: 1 `defect` (not every verdict `proper`)
- battery: 12 `realDefect=TRUE` reds (not zero)
- clobber: `clean=false`

---

### Per-wave verdicts

| # | Wave | specMatch | intact | Verdict | Note |
|---|------|-----------|--------|---------|------|
| 1 | BG.W-PAINT-IS-THE-GATE | ✓ | ✓ | **proper** | Real OKLab pixel-decoder + born-RED Stage-0 ground; operative FAIL is by-design (DONE-override certified). |
| 2 | BG.W-GESTALT-ROSTER-RE-POINT | ✓ | ✓ | **proper** | `surface-closure.mjs` transitive paint-closure; 15 tokens→14 seeds; born-RED operative by design. |
| 3 | BG.W-SHIP-DISCIPLINE-LIVE-PRECONDITION | ✓ | ✓ | **proper** | `proof:ship-attestation` Mac-only fail-closed; self-test 7/7; `[absent]` = intended born-RED tag-blocker. |
| 4 | **BG.W-DEFERRED-LEDGER** | ✓ | ✗ | **defect** | CLOBBERED by ba23c086 (BH.B1-W3): kf-snap CONSUME marker excised → corpus 136→135, FOLD-LEDGER.json carries orphan row; gate REDs at HEAD. |
| 5 | BG.W-BE-BF-LEDGER | ✓ | ✓ | **proper** | 70-row BE+BF parity ledger, disk-derived; gate exit 0, self-test 7/7. |
| 6 | BG.W-DISPOSITION-RESTAMP | ✓ | ✓ | **proper** | 31/31 rows reStampedAt→BG, 2 pendings discharged; `proof:disposition-live` GREEN (note: re-stamp REDs the stale BC-era `proof:bc-fold-ledger`, fix #11). |
| 7 | BH.B0 W0-scratch-sweep | ✓ | ✓ | **proper** | test-results untracked, dead .browserslistrc deleted, commit-msg hook env-driven; `proof:git-hygiene` GREEN. |
| 8 | BH.B1 W1-external-payload | ✓ | ✓ | **proper** | libraryExternal de-dead'd onto `@lucide/vue`; `proof:external-payload` exit 0; profile:budget mirror landed. |
| 9 | BH.B1 W2-value-destraddle | ✓ | ✓ | **proper** | value.js peer+dev `^1.0.0` single-leg; semver predicate + 4-bite self-test; `proof:peer-conformance` GREEN. |
| 10 | BH.B1 W3-dragmorph-snap-excise | ✓ | ✓ | **proper** | commitSnapOnRelease re-roll excised → kf 5.1.0 native `DragOptions.snap`; `proof:drag-morph` PASS. **(root cause of fixes #1-3 — left 4 sibling gates un-re-pointed.)** |
| 11 | BH.B2.0 W-alias-codemod | ✓ | ✓ | **proper** | 719 specifiers → `@glass`; 3 alias planes wired; typecheck exit 0. **(root cause of fixes #4-6.)** |
| 12 | BH.B2.1-mech W-regen-mechanism | ✓ | ✓ | **proper** | `subpath-policy.mjs` single-source + fail-closed generator; EXACT_REPRODUCTION 96/96; `proof:subpath-classify` exit 0. |
| 13 | BH.B2.4a W-bh-carves | ✓ | ✓ | **proper** | 3 byte-identical colocation carves (all ≤500); `proof:colocation` exit 0. (no-god-module red is on a sibling file — fix #9.) |
| 14 | BH.B4a-archive-refresh | ✓ | ✓ | **proper** | 20 files git-mv'd 100%-similar + provenance README; 0 gate reads them; doc-only class-C. |
| 15 | BH.B4b-skeleton | ✓ | ✓ | **proper** | `canon-doc.mjs`/`design-docs.mjs` resolvers + `regen-structure.mjs --check` FRESH; skeleton-by-design. |
| 16 | BH.B4c-precept-extract (files) | ✓ | ✓ | **proper** | 4 design docs extracted; `proof:design-docs-files` + 4-bite self-test GREEN. |
| 17 | BH.B4d-evidence-prune (files) | ✓ | ✓ | **proper** | 31 live evidence docs (29 dead pruned); `proof:consumer-evidence-live` exit 0, dead=0. |
| 18 | BH.B6 W-core-prompts | ✓ | ✓ | **proper** | 3 prompts + README, born-RED `robust`→`sturdy` excision; `proof:core-prompts` GREEN. |
| 19 | BG.W-ROUTE-TRANSITION | ✓ | ✓ | **proper** | 4-mechanism collapse → bare keyed swap; `proof:route-confounder` PASS. **(root cause of fixes #7-9.)** |
| 20 | BG.W-FIELD-AURORA | ✓ | ✓ | **proper** | `.paper-field` surgical retire → recessive shell `<Aurora>`; `proof:no-paper-field` + `proof:focal-complete` exit 0. |
| 21 | BG.W-SCROLL-PROGRESS-RAIL | ✓ | ✓ | **proper** | `.scroll-progress` hoisted unconditional + full-value-var timeline; `proof:ba-animate` 8/8. (stale manifest prose + paint-pending — non-blocking.) |
| 22 | BG.W-FIELD-ACCENT-RECONCILE | ✓ | ✓ | **proper** | warm-field.ts collapsed onto single-source aurora-hero exports; hue parity 0.0000°; `proof:field-accent-reconcile` 4/4. **(grew sibling ratchet file — fix #9.)** |
| 23 | BG.W-PAPER-GRAIN-OPTIN | ✓ | ✓ | **proper** | universal `<PaperBackdrop>` shell mount removed → per-surface opt-in; `proof:no-paper-field` 5/5. |
| 24 | BG.W-HERO-FIT | ✓ | ✓ | **proper** | ONE chassis title path + svh fit-cap + short displayTitle; `proof:hero-fit` HF1-HF6 PASS. |

---

### Battery reds (`--run ci` 314 gates; the runner bails at #10, all 305 driven manually; + 55 local-only)

`realDefect` flag per the battery agent's classification. **12 `realDefect=TRUE` (10 CI + 2 local-only)** are the actionable close-blockers; **9 `realDefect=FALSE`** are born-RED-by-design close gates, sibling/consumer reds (skip/green in a fresh siblings-absent CI checkout), browser-π (no served demo), or audit-induced.

| Gate | realDefect | Class | Why |
|------|:----------:|-------|-----|
| `proof:alias-codemod` | **TRUE** | gate false-positive | comment-blind matcher trips on a `// `-comment `../src/` literal in a later-added config (= the clobber finding). |
| `proof:no-god-module` | **TRUE** | ratchet | useGlassBackdropLuminance.ts grew 542→559 (BG.W-FIELD-ACCENT-RECONCILE). |
| `proof:storybook-complete` | **TRUE** | scanner stale | `@glass` codemod broke the src-path demonstration enumerator (~30 false "zero demonstration"). |
| `proof:bc-fold-ledger` | **TRUE** | stale gate | BC-era `{BC,BD}` reStampedAt hardcode vs the sanctioned BG re-stamp → 27 F7 reds. |
| `proof:bg-deferred-ledger` | **TRUE** | orphan row | snap-excise dropped the kf-snap CONSUME marker; FOLD-LEDGER.json phantom row (136 vs 135). |
| `proof:motion-one-clock` | **TRUE** | dead allowlist | useDragMorph decayRest-snap-reroll OFF_SPINE_ALLOWLIST entry now trips nothing. |
| `proof:tunable-anim` | **TRUE** | phantom axis | registry names `--scroll-build-step`, deleted by W-ROUTE-TRANSITION. |
| `proof:liquid-tab` | **TRUE** | un-re-pointed | BC.W-LIQUID-TAB L3/L4 still require decayRest + CONSUME marker. |
| `proof:storybook-meta` | **TRUE** | dogfood clobbered | W-ROUTE-TRANSITION deleted AppShell's Card import + no-match empty-state → m9c imports-Card=false. |
| `proof:no-dead-token` | **TRUE** | dead token | redundant src-declared `--story-hero-rise` (demo fallback suffices). |
| `proof:gen-ci-fresh` [local] | **TRUE** | ci.yml drift | committed ci.yml 638 vs `--emit-ci` 660; B2.0 added gates without regen. |
| `proof:story-language` [local] | **TRUE** | meta-language | 2 stories reference `proof:route-single-root` in comments. |
| `proof:consumers:static` | FALSE | sibling | words/frontend imports retired ui/Tabs; consumer migration owed at 5.0.0 (THEIR edit). |
| `proof:phantom-classes` | FALSE | sibling-pending | only fourier-analysis cartoon-card sites; glass-ui src+demo clean. |
| `proof:ship-attestation` | FALSE | born-RED-by-design | SHIP-ATTESTATION.json absent = intended tag-blocker; flips at Metal ship ceremony. |
| `proof:dock-animation-live` | FALSE | browser-π | ERR_CONNECTION_REFUSED — no served demo in audit env. |
| `proof:consumer-staleness` | FALSE | sibling | 72 un-ledgered constellation imports (skip in CI). |
| `proof:ba-gestalt` | FALSE | born-RED-by-design | 10/10 paint-is-the-gate surfaces FAIL until paint waves land + non-authoring re-capture. |
| `proof:tier-class-staleness` | FALSE | sibling | 19 fourier cartoon-card WARN sites; never in CI. |
| `audit:stash` | FALSE | environment | 5 prior workflow scratch stashes; green in fresh checkout. |
| `proof:gate-manifest-sound` [local] | FALSE | audit side-effect | 16 AY/AZ PNGs overwritten by THIS audit's browser-π runs; orchestrator owns `git checkout`. |

---

### Clobber findings (clean = FALSE)

| Wave clobbered | By | File | Severity |
|----------------|----|------|----------|
| BH.B2.0-W-alias-codemod (ca988a76) | demo:dist infra 26ac25af (landed AFTER) | `demo/vite.demo-dist.config.ts` | **close-blocker** (gate red), but NO source reverted |

The codemod deliverable is fully intact (719 rewrites + 3 alias planes survive). `proof:alias-codemod` (tagged `local,ci,release` → IN the `--run full` close battery) is a comment-string false-positive: the later-added config's doc-comment (lines ~19-22) contains the literal `@import "../src/styles/index.css"`, and the gate's `(../)+src/` detector does not strip `//` comments. The joint 5.0.0 `--run full` close battery RED on this gate until fixed.

---

### Prioritized FIX LIST

Each entry is one defect / clobber / realDefect-red with its wave id + a one-line remediation a fix-builder can act on. Clustered by root cause; ordered close-blocking first.

**Cluster A — BH.B1-W3 dragmorph snap-excise (ba23c086) greened `proof:drag-morph` but left 4 gates un-re-pointed**
1. `proof:bg-deferred-ledger` + **BG.W-DEFERRED-LEDGER defect** — drop/discharge the phantom row `src/composables/motion/useDragMorph.ts#CONSUME#kf-snap` from `docs/tranches/BG/FOLD-LEDGER.json` (+ .md) so the derived corpus reconciles 136→135.
2. `proof:liquid-tab` (BC.W-LIQUID-TAB) — re-point gate L3 (`composes decayRest`) + L4 (`// CONSUME(kf snap):` marker) onto the kf 5.1.0 native `DragOptions.snap` path, OR retire the gate as satisfied-by-`proof:drag-morph`.
3. `proof:motion-one-clock` — remove the now-dead `OFF_SPINE_ALLOWLIST` entry for `useDragMorph.ts` (`decayRest-snap-reroll`); the seam no longer exists.

**Cluster B — BH.B2.0 `@glass` codemod (ca988a76) + later demo:dist infra**
4. `proof:storybook-complete` — re-point the demonstration enumerator to recognize the `@glass` alias (it scans `.../src/...` import paths; the codemod rewrote all 492 demo imports to `@glass/...` → ~30 false "zero demonstration").
5. `proof:gen-ci-fresh` [local] — run `npm run gates:emit-ci` + commit `.github/workflows/ci.yml` (drifted 638 vs 660 lines; line 122 expects `proof:alias-codemod`).
6. `proof:alias-codemod` (= **clobber finding**, BH.B2.0 vs 26ac25af) — reword the `//` doc-comment in `demo/vite.demo-dist.config.ts` (~lines 19-22) so it carries no literal `../src/` specifier, OR harden the gate's matcher to strip `//` comments (the `proof:route-confounder` comment-strip precedent).

**Cluster C — BG.W-ROUTE-TRANSITION (89dc3dee)**
7. `proof:storybook-meta` (m9c) — drop the Card-dogfood anchor from the gate, OR restore AppShell's `import { Card }` + the no-match "Pick a story" `<Card>` empty-state (the wave deleted both).
8. `proof:tunable-anim` — delete the phantom `--scroll-build-step` axis from `docs/design/tunable-anim.md:121` + `docs/precepts/tunable-anim.md:121` (the token was deleted with `.scroll-build`).
9. `proof:story-language` [local] — remove the `proof:route-single-root` gate-name commentary from `demo/stories/SectionLanding.vue:82` + `demo/stories/StoryPage.vue:71`.

**Cluster D — BG.W-FIELD-ACCENT-RECONCILE (825d4125)**
10. `proof:no-god-module` — carve `src/composables/glass/useGlassBackdropLuminance.ts` (559L > 542 ratchet, grown by the auto-discover rewire) into a colocated leaf, OR re-point the ratchet baseline with a justified note.

**Cluster E — BG hero work (WS1)**
11. `proof:no-dead-token` — delete the redundant `--story-hero-rise` declaration in `src/styles/tokens/scroll-tokens.css:36` (the demo `var(--story-hero-rise, 1.5rem)` fallback in `story-hero.css` already supplies it; no src/dist reader).

**Cluster F — BG.W-DISPOSITION-RESTAMP (002e9d32)**
12. `proof:bc-fold-ledger` — widen the BC-era `reStampedAt ∈ {BC,BD}` hardcode to include `BG`, OR retire `proof:bc-fold-ledger` to a closed-tranche tracker arm (the `:ax`/`:ay` live-verified-ledger precedent). The BG re-stamp is CLAUDE.md-sanctioned and `proof:disposition-live` is GREEN; this gate alone is stale (27 F7 reds).

**Environment / orchestrator-owned (non-defect, no fix-builder edit)**
- `proof:gate-manifest-sound` [local] — 16 AY/AZ visual-capture PNGs were overwritten by THIS audit's browser-π gate runs (`proof:aurora-*`, `proof:blob-studio`); git was clean at session start. The orchestrator owns the index and should `git checkout` them (the agent git clause bars the auditor from restoring).
- The 9 `realDefect=FALSE` reds (ship-attestation, ba-gestalt born-RED-by-design; consumers:static / phantom-classes / consumer-staleness / tier-class-staleness siblings; dock-animation-live browser-π; audit:stash environment) need no fix — they skip/green in a fresh siblings-absent CI checkout or flip at the ship/paint ceremonies.

---

### Bottom line

Source deliverables are sound — 23/24 waves `proper` and intact, the lone `defect` (BG.W-DEFERRED-LEDGER) is a post-land ledger desync, not a reverted build. The joint 5.0.0 `--run full` close battery cannot go green until the 12 `realDefect=TRUE` gate re-points (Clusters A-F + the 2 local-only) land. None require touching working library logic beyond one carve (#10) and two token/registry deletions (#8, #11); the remainder are gate/ledger/registry/ci.yml/comment re-points. Recommend a single SYNTH fix wave executing Clusters A-F, then `npm run gates:emit-ci`, then re-run `--run full` siblings-absent to confirm before the irreversible tag.
