# AB — Living-UI canon (chassis token + timeline structural split + Pulse aura + sectioned Progress + dock-shadow consumer canon)

**Tranche letter**: AB.
**Predecessor close**: M `54a8acb` (v1.0.5 published; precept submodule `46d6cfb`).
**This close**: `a28560f` (v1.0.5 → v1.1.0; CHANGELOG finalize) + post-close `2b3727f` (dock-shadow directional drop + 1px outer ring retired at the canonical token).
**Cohort identity**: Living UI canon. Five cross-repo lanes accumulating against the M trunk and shipping as a single minor (v1.1.0) — chassis layout token + GlassTimeline Option C structural split + Pulse `variant="aura"` ambient halo + Progress `variant="sectioned"` phase-bus + dock-shadow consumer canon documentation (with post-close substrate refinement).
**Open**: 2026-05-12 22:42 EDT (`69c59fa` — first AB commit).
**Close**: 2026-05-13 00:26 EDT (`a28560f` v1.1.0); substrate-refinement coda at `2b3727f` 2026-05-13 17:45 EDT.
**Authored retroactively at**: O.W0 Lane A — 2026-05-14 (per K invariant 3: no tranche-letter shadow execution).

## §1 — Thesis (Living UI canon)

AB is the **living UI canon** tranche. Where L closed the vueuse SCC trap and M held the v1.0 surface stable through `src/api/` promotions + per-consumer M.W1 standardization, AB refines the v1.0 substrate into a *living* surface — every primitive in the AB cluster (chassis + timeline + Pulse + Progress + dock) now reads as alive under capped ambient motion + reduced-motion contracts + state-aware visual register.

The work is additive — five new public surfaces (1 token + 1 utility + 1 emit + 1 variant + 1 variant), no retirements, no breaking changes. The minor bump (v1.1.0 rather than a patch sequence) is deliberate: the AB cumulative API surface adds `--chassis-max-block-size`, `.dock-label`, `<HoverPopover>` `v-model:open`, `<GlassTimeline>` Option C structural split + `popoverContent` slot + `currentSegmentKey` prop + `hoverEnd` event, `<Pulse variant="aura">` + 6 ambient-pulse tokens + `@keyframes ambient-pulse`, `<Progress variant="sectioned">` + 2 progress-sectioned tokens + 3 new props + the `ProgressSegment` shape, and the dock-shadow consumer recipe.

AB is **not a structural-union tranche** (V did that). It is **not a substrate-retirement tranche** (L did that). It refines what shipped at v1.0 into a vocabulary that wears motion + state-distinction as canonical primitives — the substrate any consumer of v1.0+ inherits is now living-UI by default.

## §2 — Binding invariants (inherited from V; no new at AB)

AB inherits the 20 V-invariants holding at M close. No new invariants land at AB; the additive-only cohort exercises the existing precept ladder without extending it:

1-20. All 20 V-invariants from M close hold at AB open and at AB close. The AB work itself binds:
- I-2 (token-first) — every AB visual behaviour is a CSS custom property (`--chassis-max-block-size`, `--animate-ambient-pulse-*`, `--pulse-aura-opacity-*`, `--progress-sectioned-*`).
- I-3 (component over CSS class) — `<Pulse variant="aura">` + `<Progress variant="sectioned">` ship as component variants, not raw CSS recipes.
- I-10 (visual-load-bearing binary) — every new variant has a wire-claimed consumer (speedtest Living-UI canon cohort) before merge; the wire claim is verified post-N at O.W0 (see §4 cross-repo coordination).
- I-15 (reduced-motion contract) — every motion-introducing variant ships with a scoped `@media (prefers-reduced-motion: reduce)` bracket.
- K-3 (no tranche-letter shadow execution) — AB violates this at execution time; this plan folder closes the precept loop retroactively per the K.WV / V-post-hoc pattern.

## §3 — Wave schedule

| Wave | Title | Mode | Commit chain | Hard gate (TL;DR) | Status |
|---|---|---|---|---|---|
| AB.W1 | Chassis token + dock-label typography | sequential token-tier | `69c59fa` → `13f4f87` → `a04f05f` | `--chassis-max-block-size` lands; `.dock-label` @utility lands; DESIGN + CHANGELOG note the AB-in-flight band | closed @ `a04f05f` |
| AB.W2 | Timeline Option C structural split + HoverPopover v-model | sequential structural-fix | `215ad06` → `6263330` → `14631b7` | `<HoverPopover>` exposes `v-model:open`; `<GlassTimeline>` continuous variant restructures (4 coupled fixes — Option C axe split + opaque dot + popover slot + currentSegmentKey + hoverEnd); CHANGELOG + DESIGN canon refinements | closed @ `14631b7` |
| AB.W3 | Pulse aura + Progress sectioned (living UI ambient motion + state-distinct phase-bus) | sequential variant-batch | `2796b28` → `a36cae8` → `46d0891` | `<Pulse variant="aura">` + 6 tokens + animation keyframe land; `<Progress variant="sectioned">` + 2 tokens + 3 props + `ProgressSegment` shape land; CHANGELOG entries | closed @ `46d0891` |
| AB.W4 | Dock-shadow consumer canon + v1.1.0 close | sequential close + post-close coda | `a28560f` + (coda) `2b3727f` | CHANGELOG header rewrite from "Unreleased — AB in-flight" → "1.1.0 — 2026-05-13 — AB Living-UI canon"; package.json 1.0.5 → 1.1.0; v1.1.0 tag; the B5 honesty close documents the dock-shadow consumer recipe (no canon edit needed). Post-close coda `2b3727f` retires the directional drop + 1px outer ring at the canonical `--shadow-dock` token after a fourth user-perception flag | closed @ `a28560f` + coda `2b3727f` |

**Critical path**: AB.W1 → AB.W2 → AB.W3 → AB.W4. Four sequential edges. Zero parallelism — every commit landed direct-to-master without orchestrator-side wave gating (the precept violation; see §6 risk register + Process observations).

## §4 — Cross-repo coordination

**Speedtest is the canonical AB consumer.** Every AB substrate item ships with a wire-claimed speedtest adoption per the Living-UI canon — the speedtest tranche letter is **also AB** at the constellation level (concurrent execution; speedtest's AB tranche cohort consumed every glass-ui AB substrate as it landed):

| AB substrate | Speedtest consumer | Verification |
|---|---|---|
| `--chassis-max-block-size` (AB.W1.T1) | speedtest `.results-card` chassis (AB.W1.T2) — repairs B1 (card-too-tall occlusion) + B10 (mobile/desktop fit) + H3 (mobile-375 CLS 0.926 → ≤ 0.15) | wire claim cited in commit `69c59fa` body |
| `.dock-label` @utility (AB.W1.T5) | speedtest DockTabButton text spans — `text-heading` → `dock-label` sweep (B8) | wire claim cited in commit `a04f05f` body |
| `<HoverPopover>` `v-model:open` (AB.W2) | glass-ui internal — load-bearing for `<GlassTimeline>` continuous variant pointer-skim cadence | landed in same wave; commit `215ad06` |
| `<GlassTimeline>` Option C split + popover slot + currentSegmentKey + hoverEnd (AB.W2.T1-T4) | speedtest PhaseTimeline + ConvergenceTimeline composables consume continuous variant | cited inline in CHANGELOG |
| `<Pulse variant="aura">` + 6 tokens (AB.W3.T1) | speedtest 5-cap aura surfaces — Start button idle, idle hero pill, complete-headline one-shot, active result-row value, timeline current-stage panel | wire claim in commit `2796b28`; **RE-CONFIRMED at HEAD** by O.W0 Lane Iβ (per O11/f §5.1 — 4 aura surfaces + 1 dots-variant idle at ResultStack + PhaseTimeline + SpeedtestResults×2) |
| `<Progress variant="sectioned">` + 2 tokens + 3 props (AB.W3.T2) | speedtest `MeterColumn.vue` phase-bus replaces the prior single-color gradient | wire claim in commit `a36cae8`; **RE-CONFIRMED at HEAD** by O.W0 Lane Iβ (per O11/f §5.2 — `<Progress variant="gradient">` consumer at MeterColumn under-bar) |
| dock-shadow consumer canon (AB.W4) | speedtest `<GlassDock :style="{ '--shadow-dock-override': 'var(--shadow-uniform)' }">` to neutralize the directional drop on the settings-gear right-edge halo (B5) | recipe published in CHANGELOG entry at `a28560f`; post-close coda `2b3727f` makes the override unnecessary at the substrate (single uniform glow becomes canon) |

**Cross-repo writer-vs-reader boundary**: glass-ui is the substrate writer; speedtest is the consumer writer. AB ran without a CONSTELLATION manifest (the precept violation); the per-substrate wire claims live in commit message bodies + CHANGELOG entries.

## §5 — Critical path

`69c59fa` → `13f4f87` → `a04f05f` → `215ad06` → `6263330` → `14631b7` → `2796b28` → `a36cae8` → `46d0891` → `a28560f` → `2b3727f` (post-close coda).

11 sequential commits over ~26 hours of wall-clock (2026-05-12 22:42 → 2026-05-13 00:26 for v1.1.0; then a quiet day before the dock-shadow coda lands at 17:45). No parallel waves; no orchestrator dispatch.

## §6 — Risk register (retrospective)

1. **K invariant 3 precept violation (LIVE during AB; closed retroactively at O.W0 Lane A)** — AB shipped 8 substrate-touching commits + 2 CHANGELOG/DESIGN docs commits + 1 release commit + 1 post-close coda without a `docs/tranches/AB/` plan folder. Every commit landed direct-to-master without orchestrator-side wave gating, agent-isolation worktrees, or hardened-agent-git clauses. **Mitigation**: this plan folder closes the loop. The precept is reaffirmed at O.W0 Lane B (precept submodule advance — pending).
2. **Bundle-budget accounting deferred** — AB shipped ~10 KB CSS additions (chassis token block + dock-label utility + pulse aura recipe + sectioned progress recipe + animations) without re-running `npm run profile:budget` at AB close. The K W4 baseline (29_000 raw / 5_750 gzip) was exceeded silently. **Mitigation**: N.W0 inherited and rebaselined the bundle-budget from 29_000 → 36_000 raw and 5_750 → 6_700 gzip in `scripts/profile-bundle.mjs`. This plan folder DOCUMENTS the AB-side origin of that rebaseline — the K-invariant-3 closure point. (See FINAL.md §3 for the accounting.)
3. **AB.W4 B5 "honesty bomb" (live finding at close)** — Z.W2 had declared B5 (dock-shadow override) RESOLVED via two coupled tokens (`--shadow-dock-override` + `--shadow-uniform`) that BOTH silently no-op'd because no consumer ever composed them. AB.W4's Playwright deep-probe reconciled the A4/A5 disagreement: canon was healthy; consumer recipe was missing. CHANGELOG documents the consumer recipe as v1.1.0-class canon refinement; **post-close coda** `2b3727f` (2026-05-13 17:45) retires the directional drop + 1px outer ring at the substrate after a fourth user-perception flag.
4. **β under-wire (post-N residual; absorbed inline at N.W4)** — AB.W3 substrate (Pulse aura + 6 tokens; Progress sectioned + 2 tokens + 3 props) shipped to public surface without any glass-ui-side demo consumer. The wire was speedtest-only. N.W4 β audit (`docs/tranches/N/audit/N-audit-beta-substrate-consumer.md` F-β-1 + F-β-2) flagged both as P1 SOFT under-wire; N.W4 absorbed inline by adding aura + sectioned rows to the demo stories.
5. **No close ceremony at AB** — no 6/7-agent strengthened audit pattern; no plan-vs-actual; no doc-drift audit; no idiomatic-gestalt audit; no performance audit; no visual-runtime probe. Same shape as V's precept violation. **Mitigation**: N.W4 strengthened audit (with 6 N11 consumer audits) covered the AB substrate retroactively; O.W0 closes the AB plan folder retroactively.

## §7 — Release plan (executed)

| Version | Commit | Wave | Cohort headline |
|---|---|---|---|
| v1.0.5 | `54a8acb` | M close (pre-AB) | M cohort tag |
| (no intermediate) | — | AB.W1, AB.W2, AB.W3 | All AB work accumulates under "Unreleased — AB in-flight (target: v1.1.0 at AB.W4 close)" CHANGELOG header per user 2026-05-13 "Full bump to 1.1" directive |
| **v1.1.0** | `a28560f` | AB.W4 close | AB Living-UI canon (5 cross-repo lanes; minor bump because cumulative API surface adds variants + props + tokens + emit + utility) |
| (post-close coda) | `2b3727f` | AB.W4 substrate refinement | Dock-shadow directional drop + 1px outer ring retired at canonical token; published as canon-side refinement that obviates the consumer override pairing for the common case |

Single minor bump at AB.W4 close per the user directive. No patch sequence; the AB tranche is bundled and shipped as one.

## §8 — Authority

This file (`AB.md`) is the retrospective canonical AB plan artefact. Cross-references:

- `docs/tranches/AB/PROGRESS.md` — reverse-engineered per-commit execution log
- `docs/tranches/AB/waves/W{1,2,3,4}.md` — per-wave specs reconstructed from commit chains
- `docs/tranches/AB/FINAL.md` — close report with bundle-budget rebaseline accounting + carry-forward to N
- `docs/tranches/AB/coordination/CONSTELLATION.md` — multi-peer manifest (speedtest canonical consumer; AB ran without one; reconstructed here)
- `docs/tranches/O/audit/W0-Lane-A-AB-post-hoc-proof.md` — disposition + verification + open questions for the orchestrator (lives in O's audit folder, not AB's, per the post-hoc proof convention)

AB authored retroactively at O.W0 Lane A (2026-05-14) per the K.WV precedent. The work itself is high-quality + cohesive; the process is precept-violating per K invariant 3 (no tranche-letter shadow execution). This plan folder closes the historical loop without rewriting commits.

## §9 — Revision history

- 2026-05-14 — Initial retrospective authoring at O.W0 Lane A. Sourced from `git log 54a8acb..a28560f` + CHANGELOG entries at `46d0891` / `14631b7` / `a28560f` + post-close coda `2b3727f`. No future revisions expected — AB is a closed tranche.
