# P — findings (verbatim user directives + extracted scope)

## User directive (verbatim, 2026-05-14 — P open)

> DEEPLY audit with 6 agents in parallel our original plan and waves thereof, alongside all changes made herein.
>
> Devise a path forward: audit the hitherto made changes and the remaining plan; recapitulate our original prompts, plans, and precepts: NO quick solutions, NO workarounds: idiomatic, gestalt approaches. This is a development product, architectural transpositions in the sake of elegance, simplicity, and performance above all are both necessary and desirable.
>
> NO legacy code.
>
> Delineate any chronically deferred items and fold them into this new tranche.
>
> Delineate any deferred items and fold them into this new tranche.
>
> Recap ALL of our prompts and requests hitherto and ensure they've been adressed.
>
> This is NOT an implementation phase. Tranche development only.
>
> No more deferrals. No carry-forward. This will all be addressed herein. Create this tranche.

## §1 — Binding new constraint

P operates under one new binding constraint that did not bind at K → L → M → N → O:

**ZERO DEFERRAL.** Every item carried forward from O FINAL.md §5 + every chronic deferral inherited from L (PD-1 + PD-2) + every cross-repo carry from O11/a-f re-audits + every "permanent-defer" classification — ALL fold into P's wave schedule. No item exits P-close as a P-residual. No PERMANENT-DEFER survives this tranche.

The user's previous tranches had "deferral with named destination" as a valid close-path (per `tranche/SPEC.md §"Close"`). P retires that path. The substrate either lands in P, retires explicitly, or is formally archived with a permanent-out-of-scope rationale (the last category is empty per audit at planning time).

## §2 — Inheritance ledger (every item folded; no PERMANENT-DEFER)

### From O FINAL.md §5 internal carry-forwards (7 items)

| O ID | Item | Source | P destination |
|---|---|---|---|
| P-1 | Playwright/Chrome MCP runtime visual probe — 2nd consecutive π TOOLING-DEFERRED | O.W7 π audit | P-wave: bind tooling-availability as a HARD GATE at close OR formally archive π lane until tooling-side fix |
| P-2 | CSS budget rebaseline (95.7% raw at HEAD) | O.W7 ε audit | P-wave: rebaseline `bundle-budget.json` (42_000 raw / 7_400 gzip target) |
| P-3 | 3 pre-W2 typed-key sites missing paired helpers (`CONFIGURATOR_DENSITY_KEY` + `SORTABLE_CONTEXT` + `GlyphFaceSilhouetteKey`) | O.W7 δ audit | P-wave: invariant-25 completion sweep (3 paired-helper authors) |
| P-4 | Demo stories for 4 W6 promotions (useClipboard / HeaderRibbon / dock-icon-button token ladder / scale-on-hover) | O.W7 δ + π audits | P-wave: demo-coverage cohort |
| P-5 | `<Slider variant="glass-scrubber">` substrate (3 fourier-analysis sites) | O11/b carry-forward | P-wave: substrate proposal + wire OR retire formally |
| P-6 | "robust" banned-word at W6 Lane A proof doc + corpus-wide spaced-em-dash style drift | O.W7 δ audit | P-wave: style-precept enforcement sweep |
| P-7 | γ-M5 CHANGELOG v1.3.0 "8 constants" typo | O.W7 γ audit | P-wave: doc-fix (1-line; folded under doc-tier wave) |

### From O FINAL.md §5 cross-repo carry-forwards (7 items)

| O ID | Item | Consumer | P destination |
|---|---|---|---|
| CR-1 | value.js v1.7.0 adoption fix (avatar typo + 2 dock-key injects) | value.js (WIP branch) | P-wave: user-authorized cross-repo write OR formal hand-off |
| CR-2 | fourier-analysis 2 dock-key injects + 3 useClipboard inline parallels | fourier-analysis | P-wave: cross-repo write |
| CR-3 | keyframes.js HeaderRibbon adoption + scale-on-hover 13-site migration | keyframes.js | P-wave: cross-repo write (cohort-able on `EditorShell.vue`) |
| CR-4 | value.js HeaderRibbon retirement + 20 useClipboard sites | value.js | P-wave: cross-repo write (cohorts with CR-1) |
| CR-5 | bbnf-buddy `ToolsLayer.vue:328` :deep() retirement | bbnf-buddy | P-wave: 1-line cross-repo write |
| CR-6 | speedtest AC.W6 cohort full consumer adoption | speedtest (AC tranche in-flight) | P-wave: AC cohort handoff coordination |
| CR-7 | Fira Code woff2 binary fetch | glass-ui orchestrator | LANDED post-O at v1.5.0 (per AC.W6b commit `2474440`) — RETIRED from carry; verified during planning |

### From O FINAL.md §5 PERMANENT-DEFER items (3 items)

| O ID | Item | Source | P destination |
|---|---|---|---|
| PD-1 | `L-vue-passive-listeners` | L tranche residual | P-wave: investigate + wire OR formally archive with permanent rationale |
| PD-2 | `L-cache-ttl` | L tranche residual | P-wave: investigate + wire OR formally archive |
| PD-3 | M.W1 value.js WIP branch sync | M.W1 cross-repo | P-wave: explicit landing OR user-directed WIP retirement |

### From post-O.W7 shadow execution — AB+1 cohort (NEW DEBT)

The v1.5.0 → v1.7.0 minor cohort shipped under "AB+1 substrate cohort (speedtest AC.W6b/c/d/W8e)" commit-message naming WITHOUT a `docs/tranches/<LETTER>/` plan folder. This is the **third recurrence** of the K-invariant-3 shadow-execution anti-pattern (V → AB → AB+1).

Audited commits (8 source commits between v1.4.1 close `8e741ba` and HEAD `b201b03`):

- `4660a0d` (docs/typography): self-host font policy
- `2474440` (typography): Fira Code + Plus Jakarta Sans OFL self-host (v1.5.0)
- `8246e07` (release): v1.5.0 tag
- `099910d` (chassis): `--phase-color-label` cascade (v1.5.1)
- `8bf51c4` (timeline): `::before inset -15px` for 44×44 WCAG hit area
- `bb1f15b` (primitives): MetricRow + MetricStack + AnimatedDigit ship (v1.6.0)
- `12e7f55` (docs/design): custom-prop cascade pattern + primitive catalog
- `d813c63` (metric-stack): `as` prop TransitionGroup support
- `e238862` (release): v1.6.0 tag
- `7ddb260` (docs/changelog): AC.W6 cross-reference
- `8dad58d` (primitives): MetricCell + ResponsiveTabs + ToggleGroupItem card variant (v1.7.0)
- `b201b03` (release): v1.7.0 bump (NOT YET TAGGED — current HEAD)

| P ID | Item | Source | P destination |
|---|---|---|---|
| P-AB1 | AB+1 post-hoc plan folder retrospective | K invariant 3 third recurrence | P W0 HEADLINE: author `docs/tranches/AB+1/` (or equivalent naming per the synthesis decision) retrospective plan with per-wave specs, FINAL.md, coordination doc |
| P-AB1-tag | v1.7.0 NOT YET TAGGED (HEAD has bumped package.json but no git tag exists) | post-O at HEAD `b201b03` | P W0: verify, tag, push |
| P-AB1-AC.W6b/c/d/W8e | 4 speedtest-AC waves' worth of consumer-side adoption | speedtest AC tranche | P-wave: AC handoff status review + remaining work cohort |

## §3 — Extracted directive cohorts (P1–P11)

### Audit + plan mandates (P1–P3)

- **P1** — 6-agent backend audit (round 1; parallel) — same shape as N + O opens.
- **P2** — 6-agent consumer audit (round 2; parallel, AFTER round 1) — same shape as N + O opens.
- **P3** — Recap ALL prior prompts (K → L → M → N → O → AB+1 → P) + verify each is addressed at HEAD or scheduled in P. NO unaddressed prompts allowed past close.

### Process mandates (P4–P7)

- **P4** — Idiomatic / gestalt approaches binding (no quick fixes; no workarounds).
- **P5** — NO LEGACY CODE.
- **P6** — Architectural transposition in service of elegance, simplicity, performance — desirable AND necessary.
- **P7** — ZERO DEFERRAL at P close. No item exits P as P-residual. Every item lands OR formally retires.

### Process constraints (P8–P11)

- **P8** — Planning-only round. No implementation. Tranche development only.
- **P9** — Hardened agent git clause (inherited; 6th-recurrence window still open per O ι audit).
- **P10** — AB+1 shadow-execution retrospective is W0 HEADLINE (analog of O.W0 Lane A but at higher recurrence severity — third strike).
- **P11** — Per O's invariant 27 (tooling-side stash enforcement) — ι at P close must verify `scripts/audit-stash-list.mjs` (or equivalent fail-closed shell command) exists + runs as the canonical stash-list audit.

## §4 — Recap of prior user prompts (full ledger; K → P open)

(Captured at P open; verified addressed at P close.)

| Tranche | Verbatim user directive | Addressed? | Evidence |
|---|---|---|---|
| K open | "Begin tranche K ... continue indefatigably; idiomatic gestalt" | YES | K closed 2026-05-08; v0.9.3 + v0.9.4 |
| L open | "v1.0 standardization sweep" | YES | L closed; v1.0 published |
| M open | "Begin and continue current tranche ... idiomatic, gestalt approaches" | YES | M closed `54a8acb`; v1.0.4 + v1.0.5 |
| N open | "DEEPLY audit ... 6 agents in parallel ... Devise a path forward..." | YES | N planning + N.W4 13-agent audit; CLEAN at v1.1.4 |
| N KISS revision | "KISS. Conservative on additions and removals. Audit overfitting." | YES | Plan pivoted; spot-verification gate caught 6 false-positives |
| N wiring correction | "useTouchGate is used... Metaballs, paper-backdrop, typewriter should be used elsewhere too" | YES | 5 strategic wires landed at N.W0 |
| O open | "Analyze backend codebase ... NO god modules ... 6 agents in parallel ..." | YES | O closed `8e741ba`; v1.4.1; 8 waves; 13-lane audit |
| O continuation prompts (×4) | "Begin and continue the current tranche..." | YES | indefatigable execution across W2 + W5 + post-fallback recovery |
| AB+1 open (implicit) | NO PROMPT — work shipped under shadow-execution | NO | **P-AB1 retrospective** |
| **P open (this)** | "DEEPLY audit ... NO legacy code ... No more deferrals ... Create this tranche" | THIS TRANCHE | P planning round; round-1 + round-2 audits then synthesis |

## §5 — Substrate-health rough sketch at HEAD (pre-audit)

- glass-ui at HEAD `b201b03` (package.json v1.7.0; last tag v1.6.0 — v1.7.0 untagged).
- 4 new flat subpaths since O close: `/metric-stack`, `/animated-digit`, `/metric-cell`, `/responsive-tabs` (per package.json).
- 1 new font subsystem: OFL self-host (Fira Code + Plus Jakarta Sans) at `src/fonts/` populated.
- 1 new chassis CSS-var: `--phase-color-label` (WCAG label-register cascade).
- 1 timeline a11y fix: `::before inset -15px` 44×44 hit-area on touch.
- Consumer-side: speedtest AC tranche shipped AC.W6b/c/d/W8e against this glass-ui surface.

**Round-1 audit verifies, expands, and dispositions this sketch.**

## §6 — Round-1 backend audit dispatch shape

Per N + O opens. 6 read-only agents parallel:

1. **Pα — Legacy code identification (post-O)**: rg the v1.4.1 → HEAD window for new `@deprecated` / `// LEGACY` / shim / migration scaffold / fallback / defensive bail / fall-through patterns. Distinguish: AB+1 cohort legacy vs O-residual legacy.

2. **Pβ — God-module audit (post-O)**: every src/ + scripts/ + demo/ file over 500 LOC at HEAD. Did AB+1 introduce new god modules? Did W3's splits hold?

3. **Pγ — Encapsulation + service boundaries (post-O)**: new W4 invariant-25 helper-pair shape — did AB+1 cohort preserve it? Are the 3 pre-W2 typed-key sites still without paired helpers? Identify any new leaky abstractions from AB+1.

4. **Pδ — DI patterns + provide/inject (post-O)**: every new provide/inject pair shipped at v1.5/v1.6/v1.7 — verify typed-key + helper-pair canonical shape per invariant 25.

5. **Pε — Pipeline orchestration (post-O)**: 4 new release tags (v1.5/v1.5.1/v1.6/v1.7) ran the W5 canonical gate matrix? Did the freshness DRY extract hold? Did CI gate matrix run? Did the heap-bump need persist?

6. **Pζ — Recap + chronic + deferral fold**: walk EVERY entry in §2 of this findings doc. For each, identify the substrate at HEAD. Recap 12 user prompts (above) + verify addressed-status at HEAD. Synthesize the inheritance ledger into a P-wave assignment — NO ITEM exits without a wave destination.

## §7 — Round-2 consumer audit dispatch shape

Per N + O opens. 6 read-only agents parallel (AFTER round 1 returns):

- P11/a — words/frontend at glass-ui v1.7.0
- P11/b — fourier-analysis/web
- P11/c — bbnf-buddy
- P11/d — keyframes.js
- P11/e — value.js (WIP branch)
- P11/f — speedtest (AC tranche cohort coordinate)

Focus: which CR-* (cross-repo carry-forward) items still need a P-wave write? Which have already migrated naturally? What new defers surface from the v1.5–v1.7 substrate?

## §8 — Synthesis (post-audit)

After both rounds return, the P orchestrator authors:

- `P.md` — plan + thesis + invariants + wave schedule (NO deferrals in any wave's hard gate)
- `waves/W*.md` — per-wave specs sized to absorb the full inheritance ledger
- `dispatch/AGENT.md` — extends O template with P-specific clauses (esp. AB+1 retrospective dispatch shape + cross-repo MULTI-WRITER scope expansion)
- `coordination/CONSTELLATION.md` — multi-peer manifest at P open
- `PROGRESS.md` — initial + per-round dispatch log

The P-open commit lands the planning substrate. Implementation dispatch awaits explicit subsequent user directive (per N/O precedent — though the user's "No more deferrals. No carry-forward. This will all be addressed herein. Create this tranche." may foreshadow immediate implementation authorization).
