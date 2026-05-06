# I.W7.α — Plan vs Actual Audit (HEAD `864e882`)

**Date**: 2026-05-06
**Owner**: orchestrator (lane agent timed out post-65 tool uses; doc authored from observation against commit chain + wave proof docs).
**Method**: walk every wave spec line-by-line against per-wave commits + audit deliverables. Strictly read-only.

## §1. Wave-by-wave disposition

| Wave | Planned | Landed | Commit | Proof doc | Disposition |
|---|---|---|---|---|---|
| W0 | reconciliation audit + 6-agent close precept | 21 ζ rows + 60 β + 21 γ + 11 δ disposed; submodule pin bumped (cc57c91 → 67c1412) | `c3bf0a2` | `audit/W0-reconciliation.md` | LANDED |
| W1 | β orphans + 5 silent-add packages + 9 alias families + ~25 diary leaks + 3 sub-bar CVAs + CI guard | 6 packages retired + 6 slot-class props + 9 alias families + --accent-pink + 20 token-orphans + 31 diary leaks + 8 evidence docs + lint.yml CI guard | `35773c4` (joint W1+W2) | `audit/W1-{A,B,CD-merged,E,F}-proof.md` | LANDED |
| W2 | shimmer matrix + 3 failing tests + Tabs verification | flourishes.vue:201 array-binding + DOCK_KEEP_OPEN_SINK_KEY in dock surface + .code-badge retired + --shimmer-duration → canonical + Tabs ledger | `35773c4` (joint W1+W2) | `audit/W2-{runtime-regressions,tabs-verification}.md` | LANDED |
| W3 | substrate-tier hierarchy + story-fidelity + axis ownership + 7 architectural tensions + 5 chronic deferrals | 3 DESIGN.md sections + CLAUDE.md Design Axes + Card cream variant retired + cartoon @utility hoist + NumberField provide/inject + dock keep-open single sink + --easing-accent → --accent-color + sliderVariants CVA + 5 formal-deferral entries | `987fc41` | `audit/W3-{substrate-hierarchy,axis-ownership,chronic-deferral-assessments,cartoon-hoist,dock-easing-slider}.md` | LANDED |
| W4 | 41-story aesthetic uplift | 32 stories repaired with canonical wrapper (post-W1 retires removed 3; W3.α policy permits 3 foundations specimen-quiet); all 32 carry CreamSurface + DisplayHero + FlourishDivider + section accent | `864e882` | `audit/W4-{A1,A2,B,C}-uplift-proof.md` | LANDED |
| W5 | 24 doc-fix items | 21 H-named + 3 since-H absorbed; 3 W5-named-deferrals (rec 12/13 DESIGN.md catalogs + rec 16 instructions/README.md) handed to W7 close-ceremony absorb | `73c40fa` | `audit/W5-doc-reconciliation.md` | LANDED-WITH-NAMED-DEFERRALS |
| W6 | 11 subpath retire + CI workflow + bundle-budget gate | 9 candidates KEPT (all have ≥ 1 cross-repo speedtest consumer) + lint.yml extended with bundle-budget soft-fail + scripts/profile-bundle.mjs budget table + ay-close.sh retired | `63e29e4` | `audit/W6-perf-infrastructure.md` | LANDED |
| W7 | close ceremony + 6-agent post-close audit | this audit | (pending — fires within W7) | `audit/I-audit-{α,β,γ,δ,ε,π}-*.md` | IN-PROGRESS |

## §2. Commit-by-commit ownership (`c5f196c..HEAD`)

Walking each commit since H close (`c5f196c`) for wave ownership + silent-surface check:

| Commit | Wave | Notes |
|---|---|---|
| `ca34354 fix(audit): playwright deep-audit surfaces 3 bugs` | pre-I (H post-close) | H absorb |
| `9427536 fix(blob): lazy-mount via IntersectionObserver` | pre-I | H absorb |
| `1ae6013 docs(tranche-h/post-final): 6-lane deep audit` | pre-I (H W7 absorb) | H ceremony |
| `f654c24 chore(tranche-i/open): land I plan + 8 wave specs scaffold` | I-open | tranche I plan |
| `1279b1d feat(composables): land useResizeObserver` | pre-W0 | substrate-with-consumer (9 sites) |
| `4fb163d feat(typography): add text-mono-prose utility` | pre-W0 | substrate-with-consumer (MetricBadge xl) |
| `0fa6980 feat(custom/metric-badge): add xl size mapping` | pre-W0 | consumer for text-mono-prose |
| `ce0c56d fix(custom/metric-badge): re-map md → text-mono-caption` | pre-W0 | latent bug fix |
| `837c1bd docs(stories/metric-badge): extend story` | pre-W0 | story extension |
| `c569f7e docs(styles/dock): comment Tailwind v4 utilities-vs-components cascade` | pre-W0 | annotation |
| `e62c787 feat(composables/useResizeObserver): harden + migrate 9 hand-rolled call sites` | pre-W0 | substrate hardening |
| `37676e8 fix(styles/dock): establish inline-size container` | pre-W0 (Q-tranche cross) | reverted |
| `602d135 Revert "fix(styles/dock): establish inline-size container"` | pre-W0 | revert |
| `64b3488 feat(glyph-face): clip-to-silhouette default + cap-strength 0.55` | pre-W0 (Q-tranche cross) | NOT-IN-WAVE — Q-tranche silent surface |
| `7e8a809 feat(styles/dock): tier-primary phase-tint ::before backplate` | pre-W0 (Q-tranche cross) | NOT-IN-WAVE — Q-tranche cross |
| `0cb88c2 feat(custom/hover-popover): land HoverPopover primitive` | pre-W0 (Q-tranche cross) | NOT-IN-WAVE — silent addition; W0 audit caught + W1.B emitted evidence doc |
| `2414abc feat(stories/primitives): extend Q.W3` | pre-W0 (Q-tranche cross) | NOT-IN-WAVE — Q-tranche cross |
| `5dbfe8a feat(styles/instrument-chassis): bezel-line α lift` | pre-W0 (P-tranche cross) | NOT-IN-WAVE — P-tranche cross |
| `c3bf0a2 feat(tranche-i/w0): reconciliation audit + 6-agent close pattern` | I.W0 | wave close |
| `b28017f docs(DESIGN): post-Q.W5.C-3 reconcile mirror — 8 delta rows applied` | NOT-IN-WAVE | parallel cross-tranche commit between W0 and W1+W2; touched DESIGN.md ahead of W3.α; flagged for γ audit which confirmed W3.α landed cleanly on top |
| `35773c4 feat(tranche-i/w1+w2): surface trim wave 2 + alias retire + diary scrub + runtime fixes` | I.W1+W2 | joint wave close (parallel dispatch) |
| `987fc41 feat(tranche-i/w3): substrate hierarchy + cartoon hoist + dock keep-open + easing-accent rename + slider CVA` | I.W3 | wave close |
| `63e29e4 feat(tranche-i/w6): perf infrastructure + bundle-budget gate + ay-close.sh retire` | I.W6 | wave close |
| `73c40fa docs(tranche-i/w5): doc reconciliation wave 2` | I.W5 | wave close |
| `864e882 feat(tranche-i/w4): pre-G story aesthetic uplift` | I.W4 | wave close |

**NOT-IN-WAVE commits (5)**: 4 Q-tranche cross-repo + 1 P-tranche cross-repo + 1 DESIGN reconcile (`b28017f`). All silent-surface adds (HoverPopover) were caught by W0 audit + owned by W1.B per I invariant 3. The DESIGN reconcile was non-disruptive (W3.α landed on top cleanly).

## §3. Chronic-deferral disposition (21 ζ rows)

All 21 rows from W0 §1 disposed:

| Row | Item | Disposition | Wave / Commit |
|---|---|---|---|
| 1 | R4 HarmonicLevelGrid | DEFER (permanent consumer-territory) | W3 / `987fc41` (entry in W3-chronic-deferral-assessments.md) |
| 2 | R5 Blob Web Worker | DEFER (encoded but unreachable on M4 Max) | W3 / `987fc41` |
| 3 | --cartoon-shadow* aliases | RETIRE | W1 / `35773c4` (alias retire lane) |
| 4 | --accent-pink | RETIRE | W1 / `35773c4` |
| 5 | Tabs provide/inject | RESOLVED (already shipped pre-I per Σ-1) | n/a (W0 sigma corrected) |
| 6 | Cartoon recipe 4× CVAs | RETIRE (refactor to @utility) | W3 / `987fc41` (cartoon-hoist lane) |
| 7 | NumberField descendant-selector | RETIRE (refactor to provide/inject) | W3 / `987fc41` |
| 8 | Card variant=cream + paper | RETIRE (cream collapsed; paper documented) | W3 / `987fc41` |
| 9 | R-NEW-1 41-story uplift | WIRE | W4 / `864e882` (32 stories; 3 W1-retired + 3 foundations exempt) |
| 10 | R-NEW-3 D-tranche evidence-doc Source paths | WIRE | W5 / `73c40fa` |
| 11 | Plugin extraction | DEFER (permanent consumer-territory) | W3 / `987fc41` |
| 12 | Bundle/CSS soft-fail gate | WIRE | W6 / `63e29e4` |
| 13 | a11y deeper sweep | WIRE (posture statement landed) | W3 / `987fc41` (Accessibility Posture in DESIGN.md) |
| 14 | 101 C.W0 candidates | RESOLVED | n/a (cumulative C/D/G/H retire) |
| 15 | R6 storyless | RESOLVED | n/a (closed in H) |
| 16 | R1/R7 DESIGN.md drift | RESOLVED | n/a (closed in H W2) |
| 17 | R2 stress baseline | RESOLVED | n/a (closed in H W5) |
| 18 | R3 Slider glass-track + dock sink | RESOLVED | n/a (closed in H W3) |
| 19 | Dock keep-open dual-authority | RETIRE (DockPopover migrated to sink; raw keys deleted) | W3 / `987fc41` (Σ-2 source override) |
| 20 | Recovery-diary leaks | WIRE (binary scrub + CI guard) | W1 / `35773c4` |
| 21 | scripts/ay-close.sh | RETIRE | W6 / `63e29e4` |

**21/21 chronic items disposed.**

## §4. Hard-gate artefacts

I.md §Hard Gates:

| Gate | Artefact | Verified |
|---|---|---|
| 1. typecheck + build green per wave | each wave proof cites `npm run typecheck` + `npm run build` green | YES |
| 2. wave proof doc records every accepted finding | 14 audit/W*-*.md proof docs across W0-W6 | YES |
| 3. orchestrator commits each wave's diff | 6 per-wave commits in `c5f196c..HEAD` | YES |
| 4. PROGRESS.md status reflects close | 4 stale entries (γ §4 finding) — absorbed in W7 | PARTIAL — γ flagged; W7 absorbs |
| 5. zero library-orphans post-W1 | β audit confirms 0 runtime artefacts | YES |
| 6. zero recovery-diary leaks | δ audit confirms canonical grep returns 0 | YES |
| 7. zero round-trip alias families | δ audit confirms 0 hits | YES |
| 8. 41-story R-NEW-1 set passes design-fidelity | 32 stories carry canonical wrapper at HEAD; π audit confirms shimmer + W4 wrappers + dock-keep-open + sliderVariants render clean | YES |

## §5. Invariant honor check

| Inv | Title | Honored? |
|---|---|---|
| 1 | Precepts bind, no quick fixes/legacy | YES — clean breaks throughout (--cartoon-shadow alias retire, --easing-accent rename, dock raw-key delete, Card cream retire) |
| 2 | Chronic deferrals MUST resolve | YES — 21/21 disposed; no soft "future tranche may revisit" |
| 3 | Cross-tranche silent surface owned | YES — 5 silent-add packages + 1 since-H Q-tranche addition all owned by W1.B with evidence docs |
| 4 | Visual audit binding | YES — 6-agent precept landed in W0 Lane II; π lane fired in W7 |
| 5 | Recovery-diary scrub binary | YES — δ confirms 0 hits |
| 6 | Token alias chains retire single-direction | YES — δ confirms 0 alias-direction hits |
| 7 | Architectural tensions resolve or document hierarchy | YES — W3.α DESIGN.md ## Substrate Hierarchy + Story Fidelity Policy + Accessibility Posture |
| 8 | Bundle/CSS soft-fail gate | YES — W6 lint.yml bundle-budget job (continue-on-error: true) |
| 9 | README.md is documentation-of-source | YES — γ audit verified 11/11 README claims (1 partial: peer-dep table never in W5 scope) |
| 10 | No new public components | YES — only new public surface is HoverPopover (Q-tranche silent addition, owned by W1.B; not added by I scope itself) |
| 11 | Sub-bar CVA evidence-doc OR retire | PARTIAL — β audit found 9 sub-bar CVAs without evidence docs (W1.E only emitted the 3 H FINAL-named variants); W7 absorbs |
| 12 | R5 Blob Web Worker trigger reassess | YES — W3 chronic-deferral assessment retired trigger as "encoded but unreachable" |

## §6. Findings

| # | Severity | Finding | Disposition |
|---|---|---|---|
| α-1 | MAJOR | β audit found 9 sub-bar CVAs without evidence docs (invariant 11 partial) | W7 absorb (emit 9 evidence docs OR retire each) |
| α-2 | MINOR | γ audit found 5 critical doc-drift items (DESIGN.md catalogs + Accessibility Posture stale + PROGRESS.md status) + 3 lower-severity items | W7 absorb (doc-only fixes) |
| α-3 | INFORMATIONAL | 6 wave-spec Status: lines carry stale "(commit pending)" parenthetical post-commit | W7 absorb (rewrite to closed (commit hash)) |
| α-4 | INFORMATIONAL | b28017f cross-tranche DESIGN.md reconcile slipped between W0 and W1+W2; W3.α landed cleanly on top — non-disruptive | document only |

## §7. Verdict

**FOUND-3 absorbable findings (α-1, α-2, α-3) + 1 informational (α-4).**

All findings are **doc-only or evidence-doc emissions** — no source regressions. W7 absorbs them in-wave; FINAL.md is authored only after absorb closes.

**Sanity probe**: `npm run typecheck` — green at HEAD `864e882` (no source changes during this audit).
