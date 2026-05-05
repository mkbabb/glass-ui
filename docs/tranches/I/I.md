# I — Convergence to Steady-State + Visual Audit Promotion

I is the convergence-and-resolution tranche. H trimmed G's expansion (77 retires, 0 library-orphans of G additions) but the deep audit dispatched after H's FINAL surfaced four classes of unresolved debt that bridge multiple tranches: 60 pre-G + post-G library-orphan candidates β missed; 24 recovery-diary leaks (only 4 of 23 actually scrubbed in W6); 9 round-trip token-alias families (W6.δ counted 1); 41 story-aesthetic uplift gaps (R-NEW-1) plus 21 doc-fix items (γ never covered README.md); plus three architectural tensions that have lived across tranches without resolution (substrate-tier hierarchy, story-fidelity bifurcation, F instrument-cluster vs G design-language axis). Plus one runtime regression that only the Playwright visual-audit lane caught: `flourishes.vue` shimmer matrix is silently broken by `cn() + tailwind-merge`.

I closes every chronically deferred item that has bounced through 2+ tranches without resolution; promotes the 6-agent post-close audit (5 read-only + 1 Playwright visual) to canonical close pattern; and resolves the three architectural tensions either by collapsing duplicate paths or by codifying a named layered hierarchy.

## Prelude

I opens against H's close at `c5f196c`: build/typecheck green; H FINAL.md present; 6 deep-audit deliverables under `docs/tranches/H/audit/H-deep-audit-{α,β,γ,δ,ε,ζ,playwright}.md`; chronic-deferral master inventory in ζ audit (21 items tracked, 11 chronic). H's binding precepts bind all subsequent tranches.

I reads the 6 deep-audit deliverables as the load-bearing input — there is no open design space, no new research wave, no challenge wave. The work is mechanical convergence + tension resolution + process hardening.

## Thesis

**The substrate is settling but not yet steady-state.** G expanded; H trimmed; the parallel P-tranche (speedtest origin) shipped 4 silent additions (`instrument-chassis`, `glyph-face`, `disco-glyph`, `dock-group`) that never owned a glass-ui-side tranche. Every tranche from C through F was strictly tightening; G is the single inflection point. H corrected by adding 10 process invariants. I completes the inward correction by:

1. **Substrate convergence wave 2**: every β-flagged orphan + every chronically deferred substrate item (R-NEW-2 alias chain; --accent-pink; G δ unresolved violations; the 4 P-packages owned for the first time) reaches a wire-or-retire verdict.
2. **Process hardening**: the 6-agent post-close audit pattern (4 read-only + 1 performance + 1 Playwright visual) promotes to canonical close in `tranche/SPEC.md`.
3. **Architectural tension resolution**: substrate-tier hierarchy, story-fidelity bifurcation, F-vs-G axis — each gets either a single canonical primitive OR a documented named-hierarchy.
4. **Doc reconciliation wave 2**: README.md never reconciled by W6.γ; tranche I owns the README.md sync to actual src/ state.
5. **Runtime regression fixes**: shimmer matrix bug; 3 failing public-surface tests; sub-bar CVA evidence-doc emission.

I is intentionally smaller in scope than G but larger than H: G expanded vocabulary; H trimmed G's additions; I trims the *whole library* (not just G additions) to steady state.

## Binding Invariants

1. **C, D, D-II, E, F, G, H precepts still bind**: KISS, no quick fixes, no workarounds, no legacy codepaths, no silent deferrals, consumed substrate, evidence over claims, wire-or-retire is binary, no destructive git as agent recovery, post-close audit BEFORE FINAL is final, idiomatic gestalt > artefact preservation, per-wave commits at wave close, DESIGN.md is documentation-of-source.

2. **Chronic deferrals (≥ 2 tranches without closure) MUST resolve in I.** Each item from ζ audit's chronic-deferral inventory either: (a) closes in I via wire / retire / refactor; (b) is formally retired with named replacement primitive; (c) carries an explicit "permanent deferral" justification with binding rationale (not a soft "future tranche may revisit"). No fourth option.

3. **Cross-tranche silent surface additions are owned in I.W1.** The 4 P-tranche packages (`instrument-chassis`, `glyph-face`, `disco-glyph`, `dock-group`) get the wire-or-retire ≥ 2-bar treatment that tranche P never gave them. If they retire, the P-tranche orchestrator is informed; if they wire, evidence docs land in `docs/consumer-evidence/`.

4. **Visual audit is a binding close-ceremony lane.** The 6-agent post-close audit (4 read-only α/β/γ/δ + 1 performance ε + 1 Playwright visual π) replaces the 4-agent pattern in `docs/precepts/instructions/tranche/SPEC.md`'s close criteria. Tranche I W0 codifies. The Playwright lane catches runtime + tailwind-merge + scoped-style + provide-inject interactions that read-only doc/grep audits cannot.

5. **Recovery-diary scrub is binary at close**: zero `H.W*` / `G.W*` / `O.W*` / `pass-N` / `silent-failure` / "scope reveal" / "user-direction overlay" / "stash regression" annotations in src/ or demo/ at I close. Tranche-history annotations belong in `docs/tranches/`, not source. (W6 claimed 4 of 23 scrubbed; I.W1 finishes the job + adds a CI guard so future tranches cannot leak.)

6. **Token alias chains retire single-direction.** When a token has both `--shadow-cartoon` and `--cartoon-shadow` defined as round-trip aliases through `theme.css`, the canonical name wins (`--shadow-X` per Tailwind 4 `@theme` convention) and the alias retires. Same pattern for any other discovered round-trip family.

7. **Architectural tensions resolve or document a named hierarchy.** Per ζ §8: paper/cream/glass have 2-3 paths each; story-fidelity is bifurcated; F instrument-cluster vs G design-language axes co-resident with no documented ownership. I W3 picks: collapse to one primitive, OR write a `DESIGN.md ## Substrate Hierarchy` section that names the layers explicitly.

8. **Bundle / CSS size floors promote to soft-fail gates.** F invariant 12 kept measurements-only; F/G/H all measured but never gated. Per ε audit recommendation, the existing `npm run profile:bundle` script gains a regression-budget table (current size + 5% headroom). CI fails the workflow if the budget is exceeded but does NOT block local dev (soft-fail). Hard-fail promotion is named for a future tranche.

9. **README.md is documentation-of-source** (extending G invariant 7). README.md sync to actual src/ state lands in I.W5 alongside CLAUDE.md residual fixes.

10. **No new public components or composables.** Same as H invariant 9. I closes existing scope; ships nothing new (the only new substrate is the visual-audit lane infrastructure if any tooling change is needed).

11. **Sub-bar CVA variants emit evidence docs OR retire.** β audit's 3 sub-bar variants (Toast inverse, ToggleGroupItem card, Slider glass-track) — H FINAL deferred to "future tranche may emit". I.W1 emits all three OR retires by inline-and-remove. No more "may emit".

12. **The R5 Blob Web Worker trigger condition is reassessed.** Wβ3 stress story already exercises 8 multi-instance specimens; H W5 captured FPS 119.62 at the 8-instance baseline; the 8+ trigger may already be unfindable. I.W3 either re-encodes a different trigger condition or retires R5 with explicit "trigger encoded but unreachable" framing.

## Sub-tranche structure

I has no sub-tranches. The 41-story R-NEW-1 aesthetic-uplift workstream is its own wave (W4) with its own 5-lane parallel split if the agent budget permits.

## Critical Files (initial)

| Concern | Path |
|---|---|
| Tranche plan | `docs/tranches/I/I.md` (this file) |
| Wave specs | `docs/tranches/I/waves/W{0..7}.md` |
| Audit reports | `docs/tranches/I/audit/W{N}-*.md` |
| Master debt inventory (load-bearing input) | `docs/tranches/H/audit/H-deep-audit-ζ-cross-tranche-debt.md` |
| Substrate orphan ledger (load-bearing input) | `docs/tranches/H/audit/H-deep-audit-β-substrate.md` |
| Doc-drift ledger (load-bearing input) | `docs/tranches/H/audit/H-deep-audit-γ-doc-drift.md` |
| Idiomatic-gestalt ledger (load-bearing input) | `docs/tranches/H/audit/H-deep-audit-δ-idiomatic-gestalt.md` |
| Performance ledger (load-bearing input) | `docs/tranches/H/audit/H-deep-audit-ε-performance.md` |
| Runtime visual regression (load-bearing input) | `docs/tranches/H/audit/H-deep-audit-playwright.md` |
| Precept update target | `docs/precepts/instructions/tranche/SPEC.md` (canonical close pattern) + `tranche/AGENT_DISPATCH_TEMPLATE.md` |

## Wave Schedule

| Wave | Title | Agents | Mode | Hard Gate | Status |
|---|---|---:|---|---|---|
| W0 | Reconciliation audit + binding precept update (visual-audit lane canonical) | 2 | parallel: HEAD reconciliation + precept-update lane | reconciliation ledger lists every chronic-deferral disposition; SPEC.md close criteria + AGENT_DISPATCH_TEMPLATE.md updated with 6-agent pattern; orchestrator commits W0 close | open |
| W1 | Surface trim wave 2 + recovery-diary scrub + alias retire | 5-6 | parallel: β orphans / 4 P-packages / cartoon-shadow alias retire / accent-pink + recovery-diary scrub / sub-bar CVA evidence-doc-or-retire / chronic-deferral substrate items | every β orphan reaches verdict; 4 P-packages own a glass-ui-side disposition; 9 round-trip alias families retired single-direction; 24 recovery-diary leaks scrubbed; 3 sub-bar CVA variants either have evidence docs or are retired; CI guard added that fails on `H\.W` / `G\.W` / `O\.W` / `pass-[0-9]` / `silent-failure` / etc grep hits in src/ + demo/; orchestrator commits W1 close | pending W0 |
| W2 | Runtime regression fixes | 1 | implementation on flourishes.vue + tests/public-surface.spec.ts + Tabs verification | shimmer matrix renders correctly (Playwright probe confirms `text-shimmer-{blue,vivid,pastel}` survive `cn()`); 3 failing public-surface tests pass; Tabs provide/inject re-verified clean; orchestrator commits W2 close | pending W0 |
| W3 | Architectural tension resolution | 1-2 | parallel: substrate-tier hierarchy + story-fidelity bifurcation decision + F-vs-G axis ownership | DESIGN.md gains a `## Substrate Hierarchy` section OR each tension's duplicate paths collapse to one canonical primitive; story-fidelity policy documented (bold-maximalist canon for new stories; specimen-quiet retired or migrated); F vs G axis ownership documented in CLAUDE.md; orchestrator commits W3 close | pending W1 |
| W4 | R-NEW-1 — 41-story aesthetic uplift | 3-5 | parallel: 8-12 stories per agent | every NEEDS-REPAIR story passes design-fidelity gate per G-audit-δ criteria (each story commits a deliberate, design-language-committed gesture visible in <2s); design-fidelity rerun returns 0 NEEDS-REPAIR; orchestrator commits W4 close | pending W3 |
| W5 | Doc reconciliation wave 2 (README.md + CLAUDE.md + γ residue) | 1 | docs-only on README.md + CLAUDE.md + docs/consumer-evidence/ refresh | 21 γ doc-fix items resolved; README.md "32 shadcn-vue components" → 39; `.glass-pill` claim retired across 3 README.md sites + CLAUDE.md residue; `.cartoon-card` / `.elevated-card` phantom claims retired; D-tranche evidence-doc Source paths refreshed (R-NEW-3); orchestrator commits W5 close | pending W1 |
| W6 | Performance + bundle infrastructure | 1-2 | parallel: subpath retire + CI workflow extension + bundle-budget gate + (optional) dts caching exploration | 11 zero-payload subpath stubs retired (per ε audit); CI workflow gains `npm run typecheck` + `npm run test` + bundle-budget probe; bundle-budget table lands in package.json or scripts/profile-bundle.mjs; orchestrator commits W6 close | pending W2 |
| W7 | Close ceremony + 6-agent post-close audit | 1 (orchestrator) + 6 audit lanes | implementation on `audit/I-pre-close.md` + `audit/I-deep-audit-{α,β,γ,δ,ε,π}.md` + FINAL.md | 6-agent audit returns; FINAL.md authored AFTER findings absorbed; per-wave commits closed; tranche I closes clean | pending W4 + W5 + W6 |

Total wave count: 8. Wave concurrency: W2 + W3 + W5 + W6 can run in parallel after W1 close (W2 needs W0 only; W3 needs W1; W5 needs W0; W6 needs W2 for the test fixes). W4 needs W3 (architectural decisions inform aesthetic-uplift gestures). W7 closes after W4+W5+W6.

## Hard gates

A wave closes only when all of:
1. typecheck + build green
2. wave proof doc records every accepted finding's resolution
3. orchestrator commits the wave's diff (per H invariant 10) — never carry uncommitted state across waves
4. PROGRESS.md status table reflects the close
5. (when applicable) Playwright visual-audit probe confirms no runtime regression introduced

Tranche I closes only when all of:
1. every wave closed per above
2. zero library-orphans remaining post-W1 (verified by re-running the β-style overfitting audit at HEAD)
3. zero recovery-diary leaks in src/ + demo/ (verified by canonical grep)
4. zero open round-trip alias families (verified by token-alias scan)
5. 41-story R-NEW-1 set passes design-fidelity gate (verified by design-fidelity rerun)
6. 21 doc-fix items resolved (R-NEW-3 + γ residue)
7. shimmer matrix renders correctly (verified by Playwright probe at I close)
8. **6-agent post-close audit runs and returns clean** before FINAL.md is final (per invariant 4)
9. binding precept updates landed in `docs/precepts/`

## Cross-tranche debt and explicit deferrals

- **Plugin extraction** (chronic 4 tranches: E/F/G/H aspirational) — assess in I.W3 alongside architectural tensions. If the underlying primitives have stabilized post-H trim, plugin extraction may finally be ready; if not, formally retire as "permanent deferral with documented rationale" rather than continuing to defer.
- **Reduced-motion + a11y deeper sweep** (chronic 5 tranches dormant since C) — assess in I.W3. Library has prefers-reduced-motion guards in many components (per CSS audits) but no a11y posture statement. I.W3 either lands a one-pass a11y audit + posture statement OR formally names "consumer-grade a11y posture" as out-of-scope with binding rationale.
- **R4 `<HarmonicLevelGrid>` / Filmstrip primitive** (chronic 2 tranches) — confirmed consumer-territory. I formally retires R4 as "permanent deferral; never returning to library" rather than letting it sit as a chronic.
- **R5 Blob Web Worker** (chronic 2 tranches; trigger encoded but possibly unreachable) — I.W3 reassesses trigger condition per Wβ3 stress baseline.
- **Bundle/CSS size floors as hard gates** (chronic 3 tranches measurement-only) — I.W6 promotes to soft-fail gate. Hard-fail named for a future tranche.

## Brittleness window

None planned. I opens against H's clean close `c5f196c` and closes against a green build. If a wave reveals a regression that requires a brittleness window (e.g., the 41-story aesthetic uplift in W4 momentarily breaks the design-fidelity gate while in flight), the wave spec declares it explicitly with a restoration wave per `tranche/SPEC.md` Brittleness Window protocol.

## Out of scope (explicit)

- New design-language axes — H closed expansion; I extends nothing.
- Plugin extraction unless I.W3 explicitly converts it from chronic to "ready" with named consumer.
- Consumer-repo edits — I does not touch consumer trees.
- New public subpath — runtime additions stay under existing `@mkbabb/glass-ui/tokens` per G invariant 13. I.W6 may RETIRE subpaths but does not add.
- New CVA variants beyond what's needed for tension-resolution refactors.
- New stories beyond the 41-set R-NEW-1 uplift.
- Hard-fail bundle gates (soft-fail in I; hard-fail named for a future tranche).
