# M · Rγ — Residuals-to-waves proposal

**Authored**: 2026-05-12.
**Lane**: γ — synthesize the M tranche wave plan (W0..W_N) from L close residuals + cross-repo constellation state + (when available) M.Rα retrospective + M.Rβ chronic-deferrals.
**Mode**: READ-ONLY across src/+demo/+tests/+docs/+CHANGELOG.md+package.json; WRITE only this file.
**Inputs (read in order)**:
- `docs/tranches/L/audit/L-residuals.md` (post-W8 7-agent surface; M-bound list)
- `docs/tranches/L/FINAL.md` (verdict + cross-repo summary + transposition ledger)
- `docs/tranches/L/L.md` (plan; HEADLINE thesis)
- `docs/tranches/L/research/R{α,β,γ,δ,ε,ζ}-*.md` (L pattern source; Rγ predecessor)
- `docs/tranches/L/audit/W0-reconciliation.md` (115-entry ledger; 49 L-bound dispositions)
- `docs/tranches/L/audit/L-audit-{α,β,γ,δ,ε,π,ι}-*.md` (7-agent strengthened close)
- `docs/tranches/L/coordination/speedtest-Y.md` (cross-repo writer/reader boundary)
- `docs/precepts/instructions/tranche/SPEC.md` (canonical wave-shape clauses; document set; ι integrity-sweep mandate)
- `docs/precepts/instructions/LESSONS-LEARNED.md` (process-failure ledger)
- `/Users/mkbabb/Programming/speedtest/docs/tranches/Y/{Y.md,PROGRESS.md,waves/W*.md}` (peer-tranche state; Y opens parallel-with-L, closes parallel-with-M)
- M.Rα retrospective + M.Rβ chronic-deferrals — **NOT YET PUBLISHED at this lane's authoring instant**. This document hypothesizes their content from Rα-precedent shape and notes the resolution paths at §H.
**Pattern source**: `docs/tranches/L/research/Rγ-residuals-to-waves.md` (immediate predecessor; 9-wave shape with HEADLINE at W1 + 7-agent strengthened close at W8).
**Predecessor patterns**: J, K, L all use the same canonical bbnf-lang tranche shape (W0 recon + W1 HEADLINE + W2..W7 supporting + W8 strengthened close). M continues the pattern unless workload shape demands transposition.
**Hardened agent git clause**: binding; read-only git only.

---

## §A — Inputs digest

L closed clean at `3e4d472` on 2026-05-12 with v1.0.0 tagged + pushed. The residual surface bound for M is **bounded and cosmetic**: 0 P0 / 0 P1 / 4 P2 / 12+ P3 + 1 substrate-residual (F-ε-3 Configurator recursion under Lighthouse) + 1 process residual (precept submodule push reconciliation) + 1 LESSONS-LEARNED extension (W1 Lane B self-disclosed `git checkout`). No P0 / P1 surface debt carries forward.

### §A.1 — L-bound residuals (M absorb candidates)

| # | Severity | Description | Source | Disposition target |
|---|---|---|---|---|
| **F-π-1** | P2 | `/foundations/chart-chassis-palette` overflows +38 px at 375; TokenLadder layout="stacked" 3-column grid cells lack `min-w-0` / `break-words` | β/π audit | M demo-side fix |
| **F-π-2** | P2 | `/compositions/dashboard` overflows +134 px at 375 + +93 px at 1024; activity-feed `<span class="text-small flex-1">` lines force grid columns to max-content | β/π audit | M demo-side fix |
| **G4** | P2 | `composables/motion/index.ts` uses explicit-named exports while sibling sub-tree barrels use `export *` — cosmetic | δ audit | M doc/cosmetic cleanup |
| **G14** | P2 | `ModalOverlay.vue:16` comment describes `layout="edge"` as "legacy alias" (actually reserved alias) | δ audit | M doc-comment correction |
| **R-α-P1-4** | P3 | F-ε-3 Configurator recursion warning at /motion/metaballs under Lighthouse — load-timing dependent | ε audit | M reproduction harness + fix OR formal documented-defer |
| **R-α-1-textarea** | P3 | `src/forms.ts` Textarea duplicate — re-exported via `./components/ui/textarea` AND via `./components/ui/combobox/Combobox.vue` indirect (may be stale comment) | α audit | M verify + clean |
| **R-α-2-GlassPanelVariant** | P3 | `GlassPanelVariant` not promoted to `src/api/index.ts` (Lane B oversight) | α audit | M discovery-layer extension |
| **R-α-3-aurora-inset** | P3 | Aurora `-inset-6` 8px bloom (pre-L K-residual; cosmetic /aurora 375 overflow) | α audit | M visual polish |
| **G1-G3 + G5-G13 + G15-G19** | P3 | 15 per-story consumption-sweep cosmetic findings from L δ audit | δ audit | M doc/cosmetic sweep |
| **W1-B-checkout-precept** | process | W1 Lane B self-disclosed `git checkout` not in the explicit-forbidden subset — extend LESSONS-LEARNED + AGENT_DISPATCH_TEMPLATE | L FINAL §7 | M.W0 Lane II precept update |
| **Precept-push-reconciliation** | process | Precept submodule origin/main diverged 15 commits with REAUDIT-stream work; force-push forbidden | L FINAL §4 + §9 | M.W0 Lane III reconciliation |
| **Doc-narrowing-re-evaluation** | re-eval | 5 documented-narrowing entries (β audit): `/api` aggregator (0 importers); `cloneMode="per-preset"` (1 consumer); `keyboard.ts` subpath (1); `carousel.ts` subpath (1+1 demo); `composables/sortable` (1) | β audit | M β-lane re-evaluation; some may earn 2nd consumer organically; others may retire |
| **PERMANENT-DEFER** | retired | Vue runtime `uses-passive-event-listeners` (upstream); `uses-long-cache-ttl` (hosting) | L W6 | document only; not absorbed |

### §A.2 — Speedtest Y tranche state (cross-repo coordination context)

Y is parallel-with-L through the L flight window. Y.W0 closed at speedtest `f6873b66` (6-agent audit synthesis + plan). Y.W1 (visual + perf quick-fixes), Y.W2 (modularization HEADLINE — `src/api/` extraction + `src/speedtest/` promotion + composables prune + boundary gate + worker carve), Y.W3 (keyframes.js cross-repo carve — CONDITIONAL on operator WIP), Y.W4 (close ceremony) — **all currently PENDING per `/Users/mkbabb/Programming/speedtest/docs/tranches/Y/PROGRESS.md`** at the M.Rγ authoring instant. The speedtest re-link commit `98f88325` LANDED inside L W1's close window, verifying SCC trap closure (modulepreload 1→0; entry-chunk gz −32.5 KB).

**Implication for M**: Y is mid-flight. Y.W1+W2+W3 will land during M's flight unless Y front-runs M's opening. The peer-tranche letter for M's coordination doc is **Y** (still), unless Y closes before M opens — in which case M coordinates with **Z** (next speedtest tranche, accumulator of Y's deferrals: auto-deploy precept + possible App.abandon flake fix + possible keyframes.js carve). The proposal below names BOTH coordination targets (Y for any active overlap; Z for the handoff after Y closes).

### §A.3 — Constellation state (read-only walk)

- **glass-ui** master `3e4d472` (L close); v1.0.0 published; precept submodule `b51047d` (push deferred).
- **speedtest** master `98f88325` (Y mid-flight); Y.W1+W2 pending.
- **keyframes.js** — Y.W3 names a "cross-repo carve" candidate; the carve targets glass-ui's `useSpringOrchestrator` consumption chain. Status unknown at this lane (no glass-ui-side dispatch lane yet). M will inherit any keyframes.js-touching work if Y.W3 DEFERRED-TO-Z.
- **precepts submodule** — diverged 15 commits with REAUDIT-stream work. Reconciliation routed to M.W0 per L W0 invariant 17 + L residuals "process failures" section.
- **value.js + parse-that + fourier-* + words + mkb-utils + bbnf-lang + mathanim + vite-plugin-shebang** — no active glass-ui-consumer touchpoints known. No M coordination doc needed unless a wave proposes substrate carve to/from a peer.

---

## §B — Wave-shape principle reaffirmation

Per SPEC.md `Document Set` clause + the J/K/L canonical pattern proven thrice:

- **W0** = recon + precept update + low-risk patches (potentially shipping a patch release).
- **W1** = HEADLINE (the architectural transposition; may break things; brittleness window).
- **W2..W6** = supporting waves (modularization, substrate-without-consumer, mobile/π, doc cohort, Lighthouse, etc.).
- **W7** = substrate cohesion / finishing.
- **W8** = close ceremony + 7-agent strengthened audit + ι integrity-sweep + FINAL.md.

L invariant 11 / precept-update did NOT change the 7-agent strengthened ceiling — the REAUDIT-stream divergence has a 10→6 parallel-agent ceiling that contradicts our 7-agent strengthened audit pattern. Until reconciliation lands (M.W0 Lane III), glass-ui continues to treat 7-agent strengthened audit as canonical; SPEC.md hard ceiling remains "max 10 parallel agents."

---

## §C — M's workload shape vs HEADLINE candidacy

L was a v1.0 cohort tranche: HEADLINE-architectural (Phase 2 SCC trap closure) + modularization-sweep (composables/ restructure + api/ discovery layer + subpath flatten) + second-consumer fidelity (retire-or-wire across 8 substrates) + doc cohort + brittleness window (W1 declared). L delivered **7 architectural transpositions** (per FINAL §5).

M does **NOT** inherit a P0/P1 surface. L closed CLEAN with 0 P0 / 0 P1 residuals after W8 within-wave absorb. The M-bound surface is 4 P2 + 12+ P3 cosmetic + 1 substrate-residual + 2 process-residuals + 5 documented-narrowing re-evaluations.

This is the shape of a **post-v1.0 stabilization tranche**: cosmetic absorbs + process hardening + cross-repo coordination + one substrate investigation (F-ε-3 Configurator recursion under Lighthouse). The HEADLINE candidacy options are:

### §C.1 — HEADLINE candidate A: Precept-submodule reconciliation + cross-repo governance hardening

**Pitch**: The 15-commit REAUDIT-stream divergence on the precept submodule is the single largest process-debt item carried into M. Reconcile by reading both streams' diffs, identifying philosophical conflicts (REAUDIT 10→6 ceiling vs our 7-agent strengthened audit pattern), integrating via merge OR rebase, verifying no clause is lost, pushing. Pair with the LESSONS-LEARNED extension to enumerate self-corrective vs. recovery-loophole git mutations (`checkout` added to the explicit-forbidden subset).

**Why HEADLINE**: cross-constellation governance is load-bearing; until reconciliation lands, every parallel tranche (M + Y + future Z) operates against potentially-stale precepts. L FINAL §7 explicitly names this as M.W0 work — promoting it to HEADLINE elevates the process discipline.

**Why NOT HEADLINE**: it's process-only, not architectural; doesn't satisfy the "named gestalt collapse" invariant cleanly; precept reconciliation is W0 work by canon, not W1 HEADLINE.

### §C.2 — HEADLINE candidate B: F-ε-3 Configurator recursion under Lighthouse — substrate hardening

**Pitch**: L W7 absorbed the aurora `cyclePreset` `DataCloneError` via `toRaw` clone hardening but does NOT touch the metaballs render path. The recursion is load-timing-dependent (Playwright doesn't reproduce; Lighthouse does). Build a methodical reproduction harness; identify the watcher-graph or computed-side-effect root cause; fix; verify under Lighthouse + Playwright + ad-hoc Vitest fixture.

**Why HEADLINE**: substrate hardening of the Configurator family is the natural continuation of L W7 Lane B (aurora chrome Option-A unification). The Configurator family achieved ≥2-consumer maturity at L W7; M closes the load-timing edge case that remained.

**Why NOT HEADLINE**: scope is narrow (one warning under one auditor); single-agent serialized work; doesn't shape multiple waves; best-practices=96 is non-blocking.

### §C.3 — HEADLINE candidate C: Cross-repo modularization carve — keyframes.js → glass-ui OR vice versa

**Pitch**: speedtest Y.W3 (CONDITIONAL) names a keyframes.js cross-repo carve removing `value.js` + `parse-that` from speedtest's entry chunk (-40 KB target). The carve touches glass-ui's `useSpringOrchestrator` consumption of keyframes.js. If Y.W3 DEFERS-TO-Z, glass-ui M may inherit the carve as a substrate-modularization HEADLINE.

**Why HEADLINE**: cross-repo carves match the "HEADLINE is cross-repo modularization" §C.1 question in the dispatch brief. Would justify multiple cross-repo dispatch lanes (one per peer touched).

**Why NOT HEADLINE**: this is speculative (Y.W3 disposition is CONDITIONAL on operator WIP); the carve doesn't depend on glass-ui's L-close shape; if M waits for Y.W3 disposition to clarify, M opens after Y closes — at which point Y has either landed it (M doesn't repeat) or deferred to Z (Z owns).

### §C.4 — HEADLINE candidate D: Post-v1.0 stabilization sweep + Lighthouse hardening

**Pitch**: absorb the L P2 + P3 cosmetic surface PLUS extend the Lighthouse perf budget (L W6 retired Vue + cache-ttl items; the remaining perf gains are CDN / hosting / consumer-side concerns NOT in glass-ui scope). HEADLINE is "stabilize v1.0 to v1.1 by absorbing every L residual + tightening per-subpath bundle budgets + extending the discovery layer (`src/api/`) with the missed `GlassPanelVariant` + closing the Configurator recursion edge case."

**Why HEADLINE**: matches the post-v1.0 stabilization shape (a "patch tranche" per the dispatch brief §C.4); proposes a v1.1 cohort; modest scope; high signal-to-noise.

**Why NOT HEADLINE**: lacks architectural gestalt; mostly absorbs + polishes.

### §C.5 — HEADLINE recommendation

**Recommended HEADLINE: Composite — B (F-ε-3 substrate hardening) + D (v1.1 stabilization sweep)**, with **A (precept reconciliation) as W0 work per canon** and **C (cross-repo carve) absorbed reactively if Y.W3 DEFERS-TO-Z**.

This composes as: **M is the v1.1 stabilization + Configurator family load-timing hardening tranche**. HEADLINE = F-ε-3 root-cause investigation + fix + reproduction-harness fixture, paired with the discovery-layer extension + cosmetic absorb sweep + precept-push reconciliation + LESSONS-LEARNED extension. Smaller than L (5-6 waves suffice); cross-repo touchpoints managed via `coordination/{Y,Z}.md` artefacts.

---

## §D — Proposed M wave structure (6 waves)

**Wave count**: 6 (W0..W5). Smaller than L (9 waves) and K (9 waves); larger than D-II (which carried a 4-wave shape). Reflects the "patch tranche" workload shape per §C.5.

### §D.1 — M.W0 — Recon + precept reconciliation + LESSONS-LEARNED extension (FOUNDATION)

| Field | Value |
|---|---|
| **Title** | Recon + precept-submodule push reconciliation + LESSONS-LEARNED `checkout` extension + AGENT_DISPATCH_TEMPLATE clarification |
| **Opens after** | M open commit (no predecessor) |
| **Lanes** | 3 — Lane I (read-only reconciliation ledger walks L residuals + Rα + Rβ findings); Lane II (LESSONS-LEARNED + AGENT_DISPATCH_TEMPLATE update); Lane III (precept submodule push reconciliation — read both streams' diffs, identify philosophical conflicts, integrate via merge OR rebase, verify no clause lost, push) |
| **Mode** | parallel; file bounds disjoint (Lane I in `docs/tranches/M/audit/`; Lane II in `docs/precepts/instructions/{LESSONS-LEARNED.md, tranche/AGENT_DISPATCH_TEMPLATE.md, tranche/SPEC.md}`; Lane III in precept submodule git) |
| **Hard gate** | (1) `M/audit/W0-reconciliation.md` enumerates every L-bound P2/P3 + α/β/π/δ finding + Rα/Rβ rows + cross-repo state; (2) LESSONS-LEARNED gains an entry on self-corrective `checkout` (W1 Lane B) → `checkout` joins the explicit-forbidden subset in AGENT_DISPATCH_TEMPLATE; (3) precept submodule REAUDIT-stream reconciliation lands (merge or rebase); origin/main no longer diverges; push completes; the 10→6 parallel-agent ceiling vs 7-agent strengthened audit conflict is resolved (whichever wins, both repos converge to a single ceiling); (4) `M/coordination/speedtest-{Y,Z}.md` published (peer-tranche state captured) |
| **Brittleness window** | NO — read-only + doc-only + submodule housekeeping |
| **File bounds** | `docs/tranches/M/{M.md, PROGRESS.md, audit/W0-*.md, coordination/speedtest-Y.md, coordination/speedtest-Z.md}` (CREATE); `docs/precepts/instructions/**` (modify); precept submodule git (rebase/merge + push) |
| **Cross-repo coordination** | YES — precept submodule is shared infra with speedtest; the REAUDIT-stream divergence affects every consuming repo. M.W0 Lane III is the canonical reconciliation moment |
| **Hypothesized commit shape** | `chore(tranche-m/w0): recon + precept reconciliation + LESSONS-LEARNED checkout-clause` (single commit absorbing all 3 lanes) + 1 precept submodule commit |

### §D.2 — M.W1 — HEADLINE — F-ε-3 Configurator recursion fix + reproduction harness + `src/api/` extension

| Field | Value |
|---|---|
| **Title** | F-ε-3 Configurator recursion root-cause + fix + reproduction harness + `GlassPanelVariant` promotion to `src/api/` + Textarea duplicate cleanup |
| **Opens after** | M.W0 close |
| **Lanes** | 2 — Lane A (F-ε-3 investigation + fix + Vitest reproduction fixture); Lane B (`src/api/` extension + Textarea duplicate verification + cleanup) |
| **Mode** | parallel; file bounds disjoint (Lane A in `src/components/custom/configurator/`, `src/components/custom/metaballs/`, `tests/diagnostics/configurator-recursion.spec.ts`; Lane B in `src/api/index.ts`, `src/forms.ts`) |
| **Hard gate** | (1) F-ε-3 reproduces under Lighthouse before fix + does NOT reproduce after fix; (2) Vitest fixture at `tests/diagnostics/configurator-recursion.spec.ts` reproduces the watcher-graph cycle synthetically AND passes after the fix; (3) Lighthouse best-practices=100 at /motion/metaballs (was 96); (4) `GlassPanelVariant` exported from `src/api/index.ts` (33 symbols, was 32); (5) `src/forms.ts` Textarea duplicate either confirmed-as-stale-comment or de-duped |
| **Brittleness window** | NO — fix is bounded; backward-compat preserved (no public API reshape) |
| **File bounds** | `src/components/custom/configurator/useConfiguratorState.ts` (modify if root cause is in watcher-graph); `src/components/custom/metaballs/**` (modify if root cause is in metaballs render path); `tests/diagnostics/configurator-recursion.spec.ts` (CREATE); `src/api/index.ts` (modify); `src/forms.ts` (modify or comment-cleanup); CHANGELOG.md (v1.1.0 entry — substrate hardening + `GlassPanelVariant` discovery surface) |
| **Cross-repo coordination** | YES — speedtest reads `/aurora` + `/configurator` types from L W1's `src/api/` aggregator; the `GlassPanelVariant` addition is outbound signal but NOT a hard gate. F-ε-3 fix is consumer-transparent (no API change) |
| **Hypothesized commit shape** | `fix(tranche-m/w1): F-ε-3 Configurator recursion fix + reproduction harness + GlassPanelVariant promotion` |

### §D.3 — M.W2 — Demo viewport fitness + doc-comment + barrel-style cosmetic sweep (P2 absorb)

| Field | Value |
|---|---|
| **Title** | Demo viewport-fitness (F-π-1 chart-chassis-palette 375 + F-π-2 dashboard 375/1024) + δ doc-comment fixes (G4 motion/index.ts + G14 ModalOverlay edge alias) + aurora -inset-6 bloom polish |
| **Opens after** | M.W0 close (parallel-safe with M.W1; file bounds disjoint) |
| **Lanes** | 2 — Lane A (demo viewport-fitness on F-π-1 + F-π-2 + aurora bloom — single-agent π sweep); Lane B (δ doc-comment fixes — G4 + G14 + the per-story cosmetic G1-G3 + G5-G13 + G15-G19 cohort) |
| **Mode** | parallel; file bounds disjoint (Lane A in `demo/stories/foundations/{chart-chassis-palette,token-ladder}.vue` + `demo/stories/compositions/dashboard.vue` + `demo/stories/aurora/**`; Lane B in `src/composables/motion/index.ts` + `src/components/ui/_shared/ModalOverlay.vue` + per-story demo files) |
| **Hard gate** | (1) Playwright π re-probe at 375×667 + 1024×768 + 1440×900: F-π-1 + F-π-2 + aurora bloom all PASS; (2) `composables/motion/index.ts` uses canonical `export *` pattern (matches sibling sub-tree barrels) OR explicit-named-with-rationale documented; (3) `ModalOverlay.vue:16` comment re-worded "legacy alias" → "reserved alias" OR `layout="edge"` value dropped (KISS path); (4) per-story consumption sweep δ cosmetic cohort absorbed |
| **Brittleness window** | NO — demo-only + cosmetic |
| **File bounds** | `demo/stories/foundations/chart-chassis-palette.vue`, `demo/stories/foundations/token-ladder.vue`, `demo/stories/compositions/dashboard.vue`, `demo/stories/aurora/**`, `src/composables/motion/index.ts`, `src/components/ui/_shared/ModalOverlay.vue`, plus the 15-site δ cosmetic per-story cohort |
| **Cross-repo coordination** | NO (intra-repo demo-only) |
| **Hypothesized commit shape** | `fix(tranche-m/w2): demo viewport fitness + δ doc-comment cleanup + aurora bloom polish` |

### §D.4 — M.W3 — Documented-narrowing re-evaluation + second-consumer drift check

| Field | Value |
|---|---|
| **Title** | β-lane re-evaluation of 5 documented-narrowing entries: `/api` aggregator, `cloneMode="per-preset"`, `/keyboard` subpath, `/carousel` subpath, `composables/sortable` sub-tree |
| **Opens after** | M.W1 close (some re-evals depend on the v1.1 release / `src/api/` extension) |
| **Lanes** | 1 — single-agent β-style sweep |
| **Mode** | sequential — single agent walks the 5 documented-narrowing surfaces, re-greps for consumer count at HEAD + speedtest src + post-Y consumer state, dispositions each (KEEP-AS-DOCUMENTED-NARROWING / EARNED-2nd-CONSUMER / RETIRE-AT-M) |
| **Hard gate** | (1) per-surface consumer count re-grepped at HEAD; (2) per-surface disposition documented in `M/audit/W3-narrowing-reeval.md`; (3) any RETIRE disposition lands in the same wave (one commit per retire), with rationale in `feedback_overfitting_audit.md` line entry; (4) `src/api/` aggregator's 0-importer status re-evaluated against the L W1 hypothesis that aggregator-subpath is pure-additive discovery (KEEP-as-documented or retire-the-aggregator-subpath path) |
| **Brittleness window** | NO — but ONE of the retire paths (if pursued) could be a breaking change. Per `feedback_no_backwards_compat` precept, retire is clean-break; no aliases. v1.1.x or v1.2.0 bump depending on disposition |
| **File bounds** | `src/api/index.ts` (modify if `/api` aggregator retires OR per-package barrel re-org happens); `src/components/custom/configurator/useConfiguratorState.ts` (modify if `cloneMode="per-preset"` retires); `src/keyboard.ts` + `src/carousel.ts` (modify if subpath retires); `src/composables/sortable/**` (modify if sub-tree retires); `package.json` exports map (modify if subpath retires); CHANGELOG.md (entry per retire); MIGRATION.md (extension if retire is breaking) |
| **Cross-repo coordination** | YES — speedtest is a consumer-of-record for some subpaths; any retire requires speedtest annotation + recommended re-link |
| **Hypothesized commit shape** | `refactor(tranche-m/w3): β-lane re-evaluation + documented-narrowing dispositions` |

### §D.5 — M.W4 — Doc cohort + CHANGELOG cleanup + v1.1.0 release (optional)

| Field | Value |
|---|---|
| **Title** | Doc cohort — CLAUDE.md + README.md + DESIGN.md alignment with post-W1+W2+W3 HEAD + CHANGELOG.md v1.1.0 entry + optional v1.1.0 tag |
| **Opens after** | M.W1 + M.W2 + M.W3 close |
| **Lanes** | 1 — single-agent doc cohort |
| **Mode** | sequential |
| **Hard gate** | (1) `CLAUDE.md` reflects HEAD (any subpath count delta from W3 retires; `GlassPanelVariant` mention if W1 absorbed); (2) `README.md` subpath count + DESIGN.md ladder/composables tree align; (3) `CHANGELOG.md` v1.1.0 entry (F-ε-3 substrate hardening + `GlassPanelVariant` discovery extension + any W3 retire enumerations + cosmetic polish summary); (4) optional v1.1.0 tag pushed if W1 or W3 lands substantive changes |
| **Brittleness window** | NO |
| **File bounds** | `CLAUDE.md`, `README.md`, `DESIGN.md`, `CHANGELOG.md`, MIGRATION.md (extension if W3 retires breaking), package.json (version bump if release), `scripts/release.sh` (if release) |
| **Cross-repo coordination** | YES IF release — speedtest consumer signal; otherwise NO |
| **Hypothesized commit shape** | `docs(tranche-m/w4): doc cohort + CHANGELOG v1.1.0` (+ optional release commit if v1.1.0 tagged) |

### §D.6 — M.W5 — Close ceremony (7-agent strengthened audit + ι integrity-sweep + FINAL.md)

| Field | Value |
|---|---|
| **Title** | Close ceremony — 7-agent strengthened post-close audit (α/β/γ/δ/ε/π/ι) + FINAL.md |
| **Opens after** | M.W4 close |
| **Lanes** | 1 orchestrator + 7 audit lanes (α plan-vs-actual; β substrate-without-consumer; γ doc-drift; δ idiomatic-gestalt per-story; ε performance/Lighthouse; π multi-viewport; ι integrity-sweep + reflog scan) |
| **Mode** | implementation: `M/audit/M-pre-close.md` + 7 audit deliverables + `M/FINAL.md` |
| **Hard gate** | (1) all 7 audit lanes return clean OR with documented residuals + named N-tranche destinations; (2) named-but-not-landed sweep clean (ι); (3) Lighthouse re-run confirms F-ε-3 fix holds at best-practices=100; (4) bundle-budget gate PASS (no regression vs L baseline 124K raw / 22.4K gz); (5) ι reflog scan: zero unauthorized agent mutations across glass-ui + speedtest + precept submodule during M flight; (6) FINAL.md authored after findings absorbed |
| **Brittleness window** | NO (terminal wave) |
| **File bounds** | `docs/tranches/M/audit/M-audit-{α,β,γ,δ,ε,π,ι}-*.md` (CREATE); `docs/tranches/M/FINAL.md` (CREATE); `docs/tranches/M/PROGRESS.md` (modify); `docs/precepts/instructions/LESSONS-LEARNED.md` (modify if ι surfaces M-derived lessons); precept submodule advance (if M.W0 reconciliation produced delta) |
| **Cross-repo coordination** | YES — speedtest disposition update if v1.1.0 ships or W3 retires affect speedtest |
| **Hypothesized commit shape** | `feat(tranche-m/w5): close ceremony + 7-agent strengthened post-close audit + FINAL.md` |

---

## §E — Critical-path analysis (DAG)

```
                       (open M)
                          │
                       M.W0 (recon + precept reconciliation)
                          │
              ┌───────────┼───────────┐
              │           │           │
            M.W1        M.W2         (parallel-safe)
       (HEADLINE:    (demo viewport
        F-ε-3 +      + δ cosmetic +
        api/ +       aurora bloom)
        Textarea)
              │           │
              └─────┬─────┘
                    │
                  M.W3
            (documented-narrowing
             re-evaluation)
                    │
                  M.W4
              (doc cohort
               + v1.1.0 tag)
                    │
                  M.W5
            (close ceremony +
             7-agent audit)
```

**Critical path**: M.W0 → M.W1 → M.W3 → M.W4 → M.W5 = **4 sequential edges**. Shorter than L's 5-edge critical path (L.W0 → L.W1 → L.W2 → L.W5 → L.W6 → L.W8) — consistent with M being a smaller patch tranche.

**Parallel slots**:
- M.W2 parallel-with M.W1 (file bounds disjoint; demo + cosmetic vs src/api + src/components/custom/configurator).
- M.W3 sequences after M.W1 close (because some re-evals depend on the v1.1 release shape and on the `src/api/` extension).

**Peak parallelism**: 4 simultaneous agents at M.W0 (3 lanes) — assuming the parallel sweep dispatches Lane I + Lane II + Lane III concurrently. Within the strengthened-audit ceiling (7) and SPEC max-10. The W1+W2 parallel batch peaks at 2+2=4 lanes. The W5 close ceremony peaks at 7 audit lanes — still within ceiling.

**REAUDIT-stream divergence note** (per dispatch brief §E): L invariant 11 / precept-update did NOT change the ceiling. M.W0 Lane III is the canonical moment to reconcile the REAUDIT 10→6 ceiling clause vs our 7-agent strengthened audit pattern. **Until reconciliation**, glass-ui's M continues to treat 7-agent strengthened audit as canonical. The reconciled ceiling lands at M.W0 close.

### §E.1 — Wave-batch estimate

| Batch | Wave(s) | Agents | Estimated days | Parallel | Notes |
|---|---|---|---:|---|---|
| Batch-1 | M.W0 | 3 | 0.5 | 3 lanes parallel | Recon + precept reconciliation + LESSONS-LEARNED extension |
| Batch-2 | M.W1 + M.W2 | 2 + 2 = 4 | 1.5 | both waves parallel | HEADLINE (F-ε-3 + api/ + Textarea) + demo viewport + δ cosmetic |
| Batch-3 | M.W3 | 1 | 0.5 | single | β-lane re-evaluation |
| Batch-4 | M.W4 | 1 | 0.5 | single | doc cohort + optional v1.1.0 release |
| Batch-5 | M.W5 | 8 (1 orchestrator + 7 audit lanes) | 1.0 | 7 parallel audit lanes | close ceremony |

**Total**: ~4 days end-to-end across 5 wave-batches; agent-budget total ~16 dispatches (3 W0 + 4 W1+W2 + 1 W3 + 1 W4 + 7 W5 audit + 1 orchestrator).

---

## §F — Cross-repo coordination artefact recommendations

Per L W0 Lane II's new SPEC clause: `coordination/<peer-letter>.md` for each cross-repo peer-tranche in flight.

### §F.1 — `docs/tranches/M/coordination/speedtest-Y.md`

**Required IF** Y is still mid-flight at M open. Speedtest Y.W1+W2+W3+W4 are PENDING at the M.Rγ authoring instant; Y likely lands Y.W1+W2 during M's W0+W1 window. Coordination:

- **Y writer surfaces**: speedtest `frontend/`, `backend/`, `src/api/` extraction (Y.W2), `src/speedtest/` promotion (Y.W2), boundary gate (Y.W2), keyframes.js carve (Y.W3 conditional).
- **M writer surfaces**: glass-ui `src/`, `demo/`, package.json, precepts submodule.
- **Shared touchpoints**: glass-ui v1.0 consumed by speedtest at `98f88325`; the `src/api/` aggregator in glass-ui and the planned `src/api/` extraction in speedtest are **separate concepts** (glass-ui's is a discovery aggregator over re-exports; speedtest's is a frontend HTTP-client boundary). NO name-collision risk; coordination doc clarifies the two distinct concepts.
- **Conflict resolution**: same protocol as L's coordination/speedtest-Y.md — disagreements surface in respective audit logs; orchestrators reconcile; decision lands in canonical wave-spec.

### §F.2 — `docs/tranches/M/coordination/speedtest-Z.md`

**Required IF** Y closes during M flight (likely; Y is smaller than X and faster). The Z tranche accumulates Y's deferrals (auto-deploy precept; possible App.abandon flake fix; possible keyframes.js carve if Y.W3 DEFERRED). At M open:

- **Z probable surfaces**: auto-deploy GitHub Action; speedtest server-side `App.abandon` flake fix; potentially keyframes.js carve.
- **M reader-only on Z**: unless Z proposes a glass-ui change, M does NOT touch speedtest. If Z proposes (e.g.) a keyframes.js cross-repo carve that adjusts glass-ui's `useSpringOrchestrator` consumption, M may absorb as a wave OR formally re-defer to N.
- **The Z coordination doc is provisional** until Y closes; document the placeholder + the handoff condition (Y close commit).

### §F.3 — Optional: `docs/tranches/M/coordination/keyframes-js.md`

**Required IF** Y.W3 DEFERRED-TO-Z AND M proposes to absorb keyframes.js work directly. This is the speculative §C.3 HEADLINE-C path that we recommended AGAINST. If M does NOT absorb keyframes.js work, skip this coordination doc.

---

## §G — Per-wave risk register

| Wave | Risk | Mitigation |
|---|---|---|
| M.W0 | Precept submodule reconciliation surfaces irreconcilable clause conflict (REAUDIT 10→6 ceiling vs 7-agent strengthened audit) | Pre-dispatch read of both streams' diffs at Lane I; if irreconcilable, escalate to user before Lane III dispatches. Default: glass-ui 7-agent wins for substantive close ceremony (proven across J/K/L); REAUDIT 10→6 reframes for higher-throughput recon waves (e.g., M.W0 itself). Document the split. |
| M.W0 | `git checkout` LESSONS-LEARNED extension surfaces additional hidden self-corrective git operations | Audit `git reflog --since="2026-04-29" -- '<every-tracked-worktree>'` across glass-ui + speedtest + precept submodule for any not-yet-documented mutating operations. ι integrity-sweep at M.W5 close re-runs this. |
| M.W0 | Cross-repo coordination doc Y/Z ambiguity at authoring instant (Y still mid-flight) | Author `coordination/speedtest-Y.md` first (current state); add `coordination/speedtest-Z.md` as provisional placeholder. Update both at M.W4 if Y closed during M flight. |
| M.W1 | F-ε-3 root cause is in a Vue reactivity / vueuse / reka-ui upstream rather than in our code | Reproduction harness must isolate the watcher-graph cycle; if the root cause is upstream, formal-retire-as-not-our-scope with named external tracker + Lighthouse exclusion config. Avoid open-ended deep-dive. |
| M.W1 | F-ε-3 fix breaks the L W7 `toRaw` clone hardening | Vitest fixture covers both: aurora `cyclePreset` `DataCloneError` (L W7's regression test) AND the new metaballs Configurator recursion case. Both must pass. |
| M.W1 | `src/api/` `GlassPanelVariant` promotion introduces dependency cycle | Verify import-graph after promotion; should not (api/ is a leaf aggregator). |
| M.W2 | Demo viewport fix changes layout enough to break a parallel V tranche demo-private chassis (StorySection/ShowcaseFrame consumer) | Playwright π re-probe at all 3 viewports re-verifies the affected demo surfaces. β audit at M.W5 sweeps. |
| M.W2 | δ cosmetic cohort exposes per-story drift from canonical idioms (e.g., `text-foreground` vs `text-on-glass`) | Per-story consumption sweep is one of the 7 strengthened-audit lanes; M.W5 δ re-runs. |
| M.W3 | Documented-narrowing retire of `/api` aggregator subpath breaks any cross-repo consumer | Pre-retire, `rg "@mkbabb/glass-ui/api" /Users/mkbabb/Programming/speedtest/src` returns 0 (per L W8 β audit). Re-grep at M.W3 dispatch; if a new consumer surfaced post-L close, KEEP. |
| M.W3 | `cloneMode="per-preset"` retire is breaking for aurora chrome (the sole consumer) | If retire, aurora chrome reshapes its API; v1.2.0 bump; MIGRATION.md absorbs. Default disposition: KEEP-as-documented-narrowing per L W7 precedent. |
| M.W4 | v1.1.0 release timing collides with speedtest Y close + re-link cycle | Coordinate release timing via `coordination/speedtest-Y.md`; if Y is closing, defer v1.1.0 to post-Y-close OR ship v1.1.0 first and let speedtest opportunistically re-link during Y close. |
| M.W5 | ι reflog scan surfaces unauthorized agent mutation during M flight | Halt close; remediate per W0 SPEC clause; document; resume. Same pattern as L W8 ι (which returned clean). |
| M.W5 | 7-agent audit ceiling collides with M.W0 reconciled REAUDIT 10→6 ceiling | If reconciliation landed REAUDIT 10→6 as canonical, M.W5 audit lane count must drop to 6. Re-spec the close-ceremony lane assignment at M.W4 doc cohort. |

---

## §H — M tranche thesis recommendation

### §H.1 — Synthesized one-sentence thesis

> **M is the post-v1.0 stabilization + Configurator-family load-timing hardening tranche** — it absorbs every L-bound P2/P3 cosmetic residual, closes the F-ε-3 Lighthouse-only Configurator recursion edge case via a methodical reproduction harness + fix, extends the `src/api/` discovery layer with the missed `GlassPanelVariant`, re-evaluates the 5 documented-narrowing surfaces against post-Y consumer state, and reconciles the 15-commit REAUDIT-stream precept-submodule divergence — landing as v1.1.0 if W1 + W3 produce substantive substrate delta.

### §H.2 — Comparison against M.Rα candidate theses (HYPOTHESIZED — not yet published)

**At Rγ authoring instant, M.Rα and M.Rβ are NOT YET PUBLISHED**. Rγ hypothesizes the M.Rα candidate theses from the Rα-precedent shape (J Rα, K Rα, L Rα all classify the predecessor close into CANONICAL / AMENDMENT / AMENDMENT-DRIFT / DEFER-WITH-RATIONALE / DEFER-AS-RESIDUAL / EXECUTED-WITH-WORKAROUND / MISSED-SILENTLY categories AND emit 2-3 candidate theses for the successor tranche).

Hypothesized M.Rα candidate theses:

1. **"M is the v1.0 stabilization tranche"** — most likely, given L closed CLEAN at 0 P0 / 0 P1. Matches §C.4 above. Synthesis aligns.
2. **"M is the cross-repo governance + precept-reconciliation tranche"** — plausible if M.Rα weights the 15-commit REAUDIT-stream divergence + W1 Lane B `checkout` incident heavily. Matches §C.1 above. Synthesis treats this as W0 work, not HEADLINE.
3. **"M is the Configurator-family completion tranche"** — plausible if M.Rα weights F-ε-3 as the residual that proves the v1.0 substrate-cohesion narrative incomplete. Matches §C.2 above. Synthesis composes this with §C.4 in the HEADLINE.

**The §H.1 thesis composes #1 + #3 with #2 absorbed as W0 work** — which is the canonical pattern (L did the same: HEADLINE = SCC trap closure; W0 = recon + typing gap + precept update).

### §H.3 — Reconciliation path with M.Rα + M.Rβ when published

When M.Rα + M.Rβ publish (expected before M open):

- If Rα's primary thesis matches §H.1 → synthesis confirmed; proceed with the 6-wave shape.
- If Rα's primary thesis names a different headline (e.g., "M is the keyframes.js cross-repo carve tranche" — §C.3 above), re-evaluate: was Y.W3 DEFERRED-TO-Z? Did Z open already? If yes, M may absorb. If no, M stays the stabilization shape and the keyframes.js work routes to a future N.
- If Rβ surfaces NEW chronic-deferral candidates beyond the 4 P2 + 12+ P3 cosmetic, re-rank: rows tagged ≥2x-chronic gain priority for M absorb. (L Rβ promoted A30 — StoryPager 4px overflow — to L absorb after 2x defer; M Rβ likely surfaces similar candidates.)
- If Rβ confirms the 5 documented-narrowing entries earned 2nd consumers (or did not), M.W3 disposition is informed.

---

## §I — Wave-spec evidence-vs-claim mapping (per SPEC.md "Hard Gates" clause)

Per SPEC.md, hard gates close on artefacts: build/lint/test output, runtime observation, benchmark, generated-code diff, deletion proof, or explicit document reconciliation. Invalid hard gates ("API exists"; "grep found a source string" for runtime behaviour; "consumer will be wired later"; disabled flag without restoration wave; narrative-only proof).

Per-wave evidence shape:

| Wave | Evidence shape | Artefact location |
|---|---|---|
| M.W0 | Document reconciliation + submodule push proof + reflog scan transcript | `M/audit/W0-*.md` + precept submodule git log + reflog transcript |
| M.W1 | Lighthouse audit JSON (before + after) + Vitest reproduction fixture (passing) + `rg "GlassPanelVariant" src/api/` (presence) + Textarea de-dup diff | `M/audit/W1-A-proof.md` + `M/audit/W1-B-proof.md` + Lighthouse artefacts + Vitest fixture file |
| M.W2 | Playwright π probe transcripts at 3 viewports (PASS table) + δ doc-comment diffs | `M/audit/W2-π-proof.md` + per-story diff records |
| M.W3 | Per-surface consumer-count grep transcripts + per-surface disposition record | `M/audit/W3-narrowing-reeval.md` |
| M.W4 | Doc-drift grep transcripts (CLAUDE/README/DESIGN HEAD-alignment) + CHANGELOG diff + optional release-tag presence | `M/audit/W4-doc-proof.md` + git tag listing |
| M.W5 | 7 audit deliverables (α/β/γ/δ/ε/π/ι) + FINAL.md + ι reflog scan transcript | `M/audit/M-audit-*.md` + `M/FINAL.md` |

Zero waves use narrative-only proof; every gate names a verifiable artefact.

---

## §J — Out-of-scope (explicit)

- **New design-language axes** — M is a stabilization tranche; no new tier rungs, glass tiers, or token families.
- **New public components** — M extends `src/api/` with `GlassPanelVariant` (missed in L W1 Lane B); no new ui/ or custom/ packages.
- **Consumer-repo edits** — M does NOT touch speedtest source. Cross-repo coordination via documents only.
- **keyframes.js carve** — UNLESS Y.W3 DEFERS-TO-Z AND Z opens during M flight AND Z proposes the carve as a glass-ui change. Default: not in M scope.
- **Vue runtime upstream items** — PERMANENT-DEFER per L W6.
- **CDN / hosting cache-ttl** — PERMANENT-DEFER per L W6.
- **N tranche planning** — M closes; future session opens N if needed.
- **Configurator family API reshape beyond F-ε-3 fix** — out-of-scope; L W7 + M W1 close the Configurator-family substrate-cohesion narrative.

---

## §K — Notes on waves NOT proposed

- **No "comprehensive vocabulary audit" wave** — K W3 + W2 + WV converged the vocab surface; L W2 confirmed; M is structural/cosmetic only.
- **No "second-consumer fidelity audit"** — L W3 closed the cohort. M.W3 re-evaluates the 5 documented-narrowing entries (a smaller scope than L W3); no new substrate proposed.
- **No "Lighthouse cohort"** — L W6 closed the cohort. M.W1 absorbs the F-ε-3 best-practices=96 → 100 delta as part of the HEADLINE substrate hardening.
- **No "mobile-viewport finishing"** — L W4 closed K R1 (StoryPager); M.W2 absorbs only the 2 demo-side viewport P2s (F-π-1 + F-π-2).
- **No "modularization sweep"** — L W2 closed the cohort. M does not re-modularize.
- **No "Phase 3 SCC trap closure"** — Phase 2 closed the trap canonically at L W1; there is no Phase 3.
- **No "tranche split into M-I + M-II"** — M's workload is small enough for one tranche shape.

---

## §L — Cross-references

- `docs/tranches/L/audit/L-residuals.md` — primary M-bound input.
- `docs/tranches/L/FINAL.md` — L close verdict + transposition ledger.
- `docs/tranches/L/L.md` — L plan + invariants (still binding for M unless reconciled otherwise).
- `docs/tranches/L/research/Rγ-residuals-to-waves.md` — predecessor pattern (M Rγ mirrors).
- `docs/tranches/L/coordination/speedtest-Y.md` — coordination doc precedent.
- `docs/precepts/instructions/tranche/SPEC.md` — wave-shape + close-ceremony clauses.
- `docs/precepts/instructions/LESSONS-LEARNED.md` — process-failure ledger; M.W0 Lane II extends.
- `docs/precepts/instructions/tranche/AGENT_DISPATCH_TEMPLATE.md` — hardened agent git clause; M.W0 Lane II extends with explicit `checkout` enumeration.
- `/Users/mkbabb/Programming/speedtest/docs/tranches/Y/Y.md` — peer-tranche plan.
- `/Users/mkbabb/Programming/speedtest/docs/tranches/Y/waves/W{1,2,3,4}.md` — peer-tranche wave specs.

---

## §M — Verdict + handoff

**M tranche proposed structure**:

- **6 waves** total: M.W0 + M.W1 (HEADLINE) + M.W2 + M.W3 + M.W4 + M.W5 (close).
- **HEADLINE**: F-ε-3 Configurator recursion fix + reproduction harness + `src/api/` discovery-layer extension (`GlassPanelVariant` promotion) + Textarea duplicate cleanup. Pairs L W7's aurora chrome unification with the metaballs render-path edge case.
- **Critical path**: M.W0 → M.W1 → M.W3 → M.W4 → M.W5 = **4 sequential edges** (shorter than L's 5).
- **Parallel slots**: M.W2 fires after M.W0 alongside M.W1 (disjoint file bounds).
- **Peak parallelism**: 7 simultaneous agents at M.W5 close (audit lanes); 4 at M.W1+M.W2 batch.
- **Cross-repo coordination**: `coordination/speedtest-Y.md` (active overlap) + `coordination/speedtest-Z.md` (provisional handoff if Y closes during M flight).
- **Estimated timeline**: ~4 days end-to-end across 5 wave-batches.
- **Estimated agent budget**: ~16 dispatches total (3 W0 + 4 W1+W2 + 1 W3 + 1 W4 + 7 W5 audit).
- **Brittleness window**: NONE — M is a stabilization tranche; no breaking changes proposed (W3 retires are clean-break per `feedback_no_backwards_compat` but bounded; if any lands, MIGRATION.md absorbs).
- **Release**: optional v1.1.0 tag at M.W4 close; gated on substantive W1+W3 substrate delta.

**Thesis** (one sentence):

> M is the post-v1.0 stabilization + Configurator-family load-timing hardening tranche — absorbing every L-bound P2/P3 cosmetic residual, closing the F-ε-3 Lighthouse-only Configurator recursion edge case, extending the `src/api/` discovery layer, re-evaluating documented-narrowing surfaces against post-Y consumer state, and reconciling the 15-commit REAUDIT-stream precept-submodule divergence — landing as v1.1.0 if substantive substrate delta produced.

**HEADLINE invariant**:

> M.W1 carries the named architectural transposition: F-ε-3 Configurator recursion root-cause + fix + reproduction-harness fixture, closing the Configurator-family load-timing edge case that L W7 absorbed only partially via `toRaw` clone hardening.

**Out-of-scope items deferred to N+**:

- keyframes.js cross-repo carve (UNLESS Y.W3 DEFERS-TO-Z; even then, default to Z-owner).
- Plugin extraction (permanent consumer-territory deferral; per I/J/K/L).
- New design-language axes (M freezes; doesn't extend).
- Vue runtime + hosting cache-ttl (PERMANENT-DEFER per L W6).

**Hardened agent git clause**: binding across every M dispatch; read-only git only; the M.W0 LESSONS-LEARNED extension formalizes `checkout` in the explicit-forbidden subset (closing the W1 Lane B self-disclosed loophole).

This research deliverable is read-only output. No source files modified. No mutating git invoked.
