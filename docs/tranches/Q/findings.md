# Q — findings (verbatim user directive + extracted scope)

## User directive (verbatim, 2026-05-18 — Q open)

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
> Some items in our consumers are totally broken, like in value.js, keyframes.js, etc. Dock items, animations, dropdowns, glass-cards. Audit our core features, styles, ensure proper co-location, cohesion, and consistency.

## §1 — Binding new constraint over P

Q inherits P's binding invariant 28 (zero deferral at tranche close) + invariant 29 (AB+1 retrospective discipline) — both codified at P.W6 close in the precept submodule (`3310a8c`).

Q adds one binding NEW emphasis:

**CONSUMER-FUNCTIONAL-REGRESSION is the HEADLINE.** The user reports that real consumer applications (value.js, keyframes.js) have "totally broken" surfaces — specifically **dock items, animations, dropdowns, glass-cards**. This is not a doc-drift or substrate-hygiene concern; it is a functional-regression report from live consumer use. The Q audit MUST find the breakage, attribute its cause, and the Q plan MUST remediate it.

The user pairs this with a core-feature directive: "Audit our core features, styles, ensure proper co-location, cohesion, and consistency." — i.e. the breakage is a symptom; the audit must reach the substrate-level cohesion gap that produced it.

## §2 — State at Q open

### P tranche CLOSED at v1.8.4 (commit `9f774b4`)

P shipped 8 tags (v1.7.0 → v1.8.4) across 7 implementation waves. 38 inheritance-ledger items dispositioned; zero P-residuals declared at FINAL.md. Per `docs/tranches/P/FINAL.md`.

### Post-P-close shadow cohort — 7 commits (4TH K-INVARIANT-3 RECURRENCE)

Between P close (`9f774b4`, 2026-05-16) and Q open (`d244dd5`, 2026-05-18), **7 commits landed without a `docs/tranches/<LETTER>/` plan folder**:

| Commit | Date | Subject | Tranche attribution |
|---|---|---|---|
| `949474a` | 2026-05-16 17:57 | refactor(freshness): retire assertDistFresh + freshness-walk + freshness-gate apparatus | AD.W4.T2 (speedtest AD-tranche driven) |
| `099d51e` | 2026-05-17 23:46 | fix(dock): retire purposeless edge-fade mask that shadowed the last dock item | NONE |
| `3cb70db` | 2026-05-17 23:51 | feat(timeline): stitched continuous gradient + rounded ends + glassy dots | NONE |
| `beec35e` | 2026-05-18 01:35 | fix(toggle,dock): card variant sizes to content + inactive dock layers leave the hit-test tree | NONE |
| `9ba68ca` | 2026-05-18 01:36 | feat(metric-stack): compact result register + tokenised value-clamp cqi arm | NONE |
| `1c6c3e5` | 2026-05-18 01:52 | feat(data-table): responsive card-per-row projection at narrow widths | NONE |
| `d244dd5` | 2026-05-18 02:03 | fix(metric-stack): tame the result register — label-clamp tokens + tighter value ceiling | NONE |

This is the **4th K-invariant-3 recurrence** (V → AB → AB+1 → this post-P cohort). Notably it recurred IMMEDIATELY AFTER P.W6 codified invariant 29 (AB+1 retrospective discipline) — the codification did not prevent the next instance. 6 of 7 commits are untagged shadow work; 1 (`949474a`) carries a speedtest-AD-tranche reference.

**Critically**: 4 of the 7 commits touch the EXACT surfaces the user reports broken — `099d51e` + `beec35e` (dock), `3cb70db` (timeline animation), `beec35e` (toggle card variant). The post-P shadow cohort is the prime suspect for the consumer breakage.

### Consumer-breakage signal

The user names: **value.js + keyframes.js — dock items, animations, dropdowns, glass-cards "totally broken"**. P.W5 landed cross-repo writes at both repos (value.js `755b3cd` on WIP branch; keyframes.js `2183f32` pushed). The breakage is either:
1. Caused by the P.W5 cross-repo writes (consumer-side migration error), OR
2. Caused by the post-P shadow cohort's dock/toggle/timeline changes (substrate regression the consumers consume via `file:../glass-ui`), OR
3. Pre-existing + surfaced now.

The Q round-1 + round-2 audits attribute the cause.

### Tooling change — Playwright AVAILABLE

The `mcp__plugin_playwright_playwright__*` browser-automation tools came online at Q open. The visual-runtime probe (π lane) — formal-archived 3× as tooling-unavailable (N.W4 → O.W7 → P.W6) — can now ACTUALLY RUN. Q's visual-runtime audit is no longer a deferred lane; it is the canonical breakage-forensics instrument.

## §3 — Extracted directive cohorts (Q1–Q12)

### Audit + plan mandates (Q1–Q4)

- **Q1** — 6-agent parallel audit (round 1) — same shape as N + O + P opens.
- **Q2** — consumer audit (round 2) — per-consumer functional-state verification.
- **Q3** — Recap ALL prior prompts (K → L → M → N → O → AB+1 → P → post-P-cohort → Q) + verify each addressed at HEAD or scheduled in Q.
- **Q4** — Visual-runtime probe is BINDING (Playwright available); the breakage forensics run live against the demo + consumer apps.

### Process mandates (Q5–Q9)

- **Q5** — Idiomatic / gestalt approaches binding (no quick fixes; no workarounds).
- **Q6** — NO LEGACY CODE.
- **Q7** — Architectural transposition in service of elegance, simplicity, performance — desirable AND necessary.
- **Q8** — ZERO DEFERRAL at Q close (inherited P invariant 28).
- **Q9** — Core-feature co-location + cohesion + consistency audit — dock, glass-card, dropdown, animation substrate. The breakage is a symptom of a cohesion gap.

### Process constraints (Q10–Q12)

- **Q10** — Planning-only round. No implementation. Tranche development only.
- **Q11** — Hardened agent git clause (inherited; tooling-side `scripts/audit-stash-list.mjs` now enforces).
- **Q12** — Post-P shadow-cohort retrospective is a Q headline (4th K-invariant-3 recurrence; analog of P.W0 Lane A AB+1 retrospective).

## §4 — Inheritance ledger (every item folded; zero deferral)

### From P FINAL.md

P declared ZERO P-residuals at close. The inheritance into Q is therefore NOT P-deferred items (there are none) but:

| Q ID | Item | Source | Q destination |
|---|---|---|---|
| Q-postP | 7-commit post-P shadow cohort retrospective | 4th K-invariant-3 recurrence | Q-wave: retrospective plan folder + tranche attribution |
| Q-break | Consumer functional regression (dock/animations/dropdowns/glass-cards at value.js + keyframes.js) | User Q-open report | Q-wave: breakage forensics + substrate remediation + consumer re-write |
| Q-css-headroom | CSS gzip budget headroom thin (9.8% at P close; ε agent flag) | P.W6 ε audit | Q-wave: rebaseline OR reduction |
| Q-π-tooling | Visual-runtime probe was 3×-archived; Playwright now available | P.W6 π archive (`visual-runtime-tooling.md`) | Q-wave: π lane RE-ACTIVATED as binding breakage instrument |

### Chronically deferred items (per the user "delineate chronically deferred")

P invariant 28 retired the PERMANENT-DEFER classification; P archived PD-1 + PD-2 + PD-3. The Q audit re-examines whether the P archive dispositions were correct OR whether any archived item is in fact a live consumer-facing concern (esp. PD-3 value.js WIP branch — the user now reports value.js broken).

### Cross-repo carry (value.js WIP branch)

P.W5 Lane A landed CR-1 + CR-4 on value.js's WIP branch (`755b3cd`, NOT pushed per PD-3 archive). The user now reports value.js broken. Q must determine: is value.js broken ON the WIP branch (where P's writes landed) or on master? Is the WIP-vs-master split itself the breakage?

## §5 — Round-1 audit dispatch shape (6 agents parallel)

Per N + O + P opens. 6 read-only agents:

1. **Qα — Consumer-breakage forensics (HEADLINE)**: walk value.js + keyframes.js; reproduce the dock/animation/dropdown/glass-card breakage; attribute cause (P.W5 writes vs post-P shadow cohort vs pre-existing). Use Playwright to load the consumer apps + capture the broken state.
2. **Qβ — Core-feature co-location + cohesion**: dock subsystem, glass-card tiers, dropdown/popover family, animation/transition substrate. Are features co-located? Is the CSS/SFC/token split coherent? Did the post-P shadow cohort fracture cohesion?
3. **Qγ — Style consistency + cascade**: tokens.css + theme.css + glass.css + the 15-file styles cascade. Scoped-vs-global discipline. Did the post-P dock.css edits (`099d51e` + `beec35e`) break the cascade?
4. **Qδ — Legacy + workaround sweep (post-P)**: walk `9f774b4..HEAD` for new legacy / workaround / fall-through / defensive-bail. The post-P cohort + any P-residual.
5. **Qε — Recap + chronic-defer + post-P retrospective**: full prompt recap K → Q; verify P close honesty against HEAD; the 7-commit post-P cohort retrospective scope; inheritance-ledger validation.
6. **Qζ — Visual-runtime probe (Playwright; BINDING)**: load the glass-ui demo + consumer apps in a real browser; screenshot dock/animations/dropdowns/glass-cards across ≥ 3 viewports; capture the broken state with visual evidence. The instrument the 3×-archived π lane was always meant to be.

## §6 — Round-2 consumer audit dispatch shape

Per N + O + P opens. Per-consumer functional-state verification AFTER round-1 returns: value.js + keyframes.js (the named-broken consumers) + fourier-analysis + bbnf-buddy + words/frontend + speedtest.

## §7 — Synthesis

After both rounds return, the Q orchestrator authors `Q.md` + `waves/W*.md` + `dispatch/AGENT.md` + `coordination/CONSTELLATION.md` + this `findings.md` companion + `PROGRESS.md`. The Q-open commit lands the planning substrate. Implementation dispatch awaits explicit subsequent user directive per the K → L → M → N → O → P precedent.
