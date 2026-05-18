# Q — Cross-repo dev-resolution contract + consumer un-break (zero-deferral binding)

**Tranche letter**: Q.
**Successor to**: P `9f774b4` (v1.8.4) + post-P shadow cohort HEAD `d244dd5` (7 untagged commits).
**Cohort identity**: restore the consumer fleet to buildable; codify the cross-repo dev-resolution contract that the AD.W4 conditional-exports flip left half-applied; absorb the post-P shadow cohort retrospectively; close the core-feature cohesion + style co-location fractures the audit surfaced. **ZERO DEFERRAL at Q close** (inherited P invariant 28).
**Mode**: planning-only at this open per user directive ("This is NOT an implementation phase. Tranche development only.").
**Open**: 2026-05-18.

## §1 — Thesis

The user opened Q on a functional-regression report: value.js + keyframes.js — dock items, animations, dropdowns, glass-cards "totally broken". The 8-deliverable Q audit (6 round-1 + 2 round-2) attributed the cause precisely, and the attribution overturns the surface impression:

**The breakage is NOT a glass-ui substrate regression.** glass-ui's demo renders every probed surface cleanly (Qζ Playwright probe — first successful live runtime probe in the K→Q span: dock at 3 viewports, the 5-rung glass-card ladder, dropdowns, the post-P continuous timeline — zero console errors). The post-P shadow cohort's code is sound (Qα + Qβ line-by-line review).

**The breakage is a cross-repo dev-resolution contract desync.** One root cause, fleet-wide:

- keyframes.js's `package.json` `exports["."]` advertises `import → ./dist/keyframes.js` + `types → ./dist/keyframes.d.ts`. The AD.W4 freshness-retire wave **deleted both `dist/` artefacts**. keyframes.js's manifest now points at files its own working tree removed.
- Dev servers survive — the `development` export condition routes to `src/`. But `npm run build` (uses `import` → deleted `dist/`) and `vue-tsc` (uses `types` → deleted `dist/`) **fail in all 5 consumers**: value.js, fourier-analysis, bbnf-buddy, words/frontend, speedtest. The intermittent-looking symptom (dev works, build red) is the `development`-condition mask.
- value.js is additionally **dev-broken**: its `vite.config.ts` hard-aliases `@mkbabb/keyframes.js → ../keyframes.js/dist/keyframes.js` (the deleted file), and the alias shadows conditional-exports entirely.
- The deeper architecture: the AD.W4 `"development"` conditional-exports model was applied to the **publisher side** (every `@mkbabb/*` `exports` map) but **never the resolver side** (no repo declares `resolve.conditions`; value.js carries a hostile fossil alias). The model worked in glass-ui + keyframes.js only by Vite's serve-mode auto-injection accident.

Three further audit-surfaced concerns fold into Q:

1. **Stale Card API** — value.js (11 SFCs) + bbnf-buddy (6 SFCs) use `<Card variant="pane">` — a prop glass-ui's `Card` never had (only `tier` / `shadow` / `grain`). glass-ui's `Card` **silently swallows** the unknown prop → falls back to `tier:"resting"` + `shadow:true` → the hard black drop-shadow the user saw. The silent-swallow is a substrate cohesion gap (O invariant 24 fail-explicit was never applied to component props).
2. **Post-P shadow cohort** — 7 untagged commits (`9f774b4..d244dd5`); the 4th K-invariant-3 recurrence, occurring 1-2 days AFTER P.W6 codified invariant 29 against exactly this. The codification is necessary-but-not-sufficient; Q escalates to a tooling-side gate.
3. **Cohesion + style fractures** — 4 pre-P core-feature co-location fractures (Qβ) + token-co-location defects incl. an 8-token private SFC dialect the post-P metric-stack commits introduced (Qγ) + the CSS budget at 93.6% gzip.

Per the user directive ("idiomatic, gestalt approaches ... architectural transpositions ... NO workarounds"): every Q remediation is a **deletion of a fossil that fights an existing mechanism**, not new machinery. The P.W5 `@mkbabb/value.js` phantom devDep — a band-aid for this very desync — RETIRES.

## §2 — Binding invariants (inherited + extended)

1-29. All 29 invariants from P inherited (V 1-20; N 21-23; O 24-27; P 28-29).
30. **NEW @ Q — Cross-repo dev-resolution contract.** Every `@mkbabb/*` package's `package.json` `exports` declares the canonical condition set; every consumer's resolver config declares explicit `resolve.conditions` and carries ZERO hard `dist/` aliases to sibling `@mkbabb/*` packages. The contract is glass-ui-owned, documented at the precept submodule, and mechanically gated by `scripts/proof-resolution-contract.mjs`. Codify at Q close.
31. **NEW @ Q — Component props fail-explicit.** Component primitives do not silently swallow unknown props. A consumer passing a prop the component does not declare gets a dev-mode warning (or a typed-rejection at the `defineProps` boundary). Extends O invariant 24 (fail-explicit) from composables to the component-prop surface. Codify at Q close.

## §3 — Wave schedule (6 waves)

| Wave | Opens after | Headline | Tag |
|---|---|---|---|
| **W0 HEADLINE** | open | Post-P shadow-cohort retrospective (`docs/tranches/AB+2/`) + cross-repo dev-resolution contract authored + `scripts/proof-resolution-contract.mjs` gate + precept edict draft | v1.8.5 (gate script + contract doc) |
| **W1 HEADLINE** | W0 close | Fleet-wide consumer un-break — keyframes.js `exports` fix + value.js hard-alias retire + value.js dist-clobber fix + glass-ui phantom-devDep retiral + 5-consumer `resolve.conditions` sweep | v1.8.6 (glass-ui devDep retiral) |
| **W2** | W1 close | Card cohesion — glass-ui `Card` props fail-explicit (invariant 31) + value.js 11-site + bbnf-buddy 6-site `<Card variant="pane">` → `tier` migration | v1.8.7 |
| **W3** | W2 close | Core-feature cohesion transpositions — dock `data-density` split-brain consolidation + `cards.css` glass-cartoon relocation + dropdown scoped-style + `beec35e` dock-duplication consolidation + token-home drift | v1.9.0 minor (substrate transposition) |
| **W4** | W3 close | Style + token co-location — metric-stack private-token-dialect promotion to tokens.css + `-webkit-backdrop-filter` single-source + transitions.css `@layer` fix + `--scale-press-*` disposition + CSS budget rebaseline + legacy cosmetic sweep | v1.9.1 |
| **W5 close** | W4 close | Strengthened audit (7 lanes) + consumer re-audit + visual-runtime re-probe (π BINDING — Playwright) + FINAL.md + precept advance (invariants 30-31 + π lane re-activation) | aggregate final |

**Critical path**: W0 → W1 → W2 → W3 → W4 → W5. The dev-resolution contract (W0) MUST precede the consumer un-break (W1) — W1's fixes conform to the contract W0 defines.

## §4 — Inheritance ledger absorption (every item; zero deferral)

### Consumer breakage (the HEADLINE)

| Q ID | Item | Wave | Verdict |
|---|---|---|---|
| Q-break-1 | keyframes.js `exports` points at deleted `dist/` — fleet-wide build/typecheck failure | W1 | ADDRESS (keyframes.js `package.json` exports fix) |
| Q-break-2 | value.js hard alias to keyframes.js deleted `dist/` — dev-boot 500 | W1 | ADDRESS (retire the fossil alias) |
| Q-break-3 | value.js `gh-pages` build clobbers its own library `dist/` | W1 | ADDRESS (route demo build to `dist/gh-pages/`) |
| Q-break-4 | glass-ui `@mkbabb/value.js` phantom devDep (P.W5 band-aid) | W1 | RETIRE (the contract enables real nested-graph resolution) |
| Q-break-5 | 5-consumer Vite `resolve.conditions` un-swept post-AD.W4 | W1 | ADDRESS (per-consumer resolver config) |
| Q-card-1 | value.js 11 + bbnf-buddy 6 `<Card variant="pane">` stale API | W2 | ADDRESS (consumer migration to `tier`) |
| Q-card-2 | glass-ui `Card` silently swallows unknown props | W2 | ADDRESS (invariant 31 fail-explicit) |

### Post-P shadow cohort

| Q ID | Item | Wave | Verdict |
|---|---|---|---|
| Q-postP-1 | 7-commit post-P cohort retrospective (`docs/tranches/AB+2/`) | W0 | ADDRESS (retrospective folder) |
| Q-postP-2 | 4th K-invariant-3 recurrence AFTER invariant 29 codified — codification necessary-but-not-sufficient | W0 | ADDRESS (diagnose + escalate to tooling gate) |

### Core-feature cohesion (Qβ)

| Q ID | Item | Wave |
|---|---|---|
| Q-coh-1 | dock `data-density` split-brain (dock.css + utilities.css) | W3 |
| Q-coh-2 | `cards.css` near-empty; `.glass-cartoon` misplaced in glass.css | W3 |
| Q-coh-3 | dropdown lone scoped-style exception | W3 |
| Q-coh-4 | token-home drift (no consistent feature-token-home rule) | W3 / W4 |
| Q-coh-5 | `beec35e` patched into 2 parallel dock rule-sets (`.dock-layer` + `.dock-layer-item-host`) | W3 |

### Style + token (Qγ)

| Q ID | Item | Wave |
|---|---|---|
| Q-sty-1 | metric-stack 8-token private SFC dialect → tokens.css promotion | W4 |
| Q-sty-2 | timeline `--timeline-dot-*` private knobs | W4 |
| Q-sty-3 | manual `-webkit-backdrop-filter` violating glass.css single-source policy | W4 |
| Q-sty-4 | transitions.css unlayered class rules (cascade hazard) | W4 |
| Q-sty-5 | `--scale-press-{xs,md,lg}` substrate-without-consumer | W4 |
| Q-sty-6 | CSS budget 93.6% gzip — rebaseline (gated after token promotions) | W4 |

### Legacy + misc (Qδ + Q11)

| Q ID | Item | Wave |
|---|---|---|
| Q-leg-1 | cosmetic comment rephrasings (test-file "legacy consumers", dock.css archaeology) | W4 |
| Q-misc-1 | speedtest `manualChunks` dead `/dist/` match branches | W1 (cohorts with the resolver sweep) |
| Q-misc-2 | consumer build/CI-gate audit (no consumer caught its own red build) | W5 |

### Chronic-defer re-examination (Qε)

| Q ID | Item | Wave | Verdict |
|---|---|---|---|
| Q-chron-1 | PD-3 (value.js WIP-vs-master split) RE-OPENS — P wrote to WIP; user reports value.js broken | W1 | ADDRESS (the un-break forces the WIP-vs-master resolution) |
| Q-chron-2 | π visual-runtime lane — Playwright now available; archived purely on tooling-unavailability | W5 | RE-ACTIVATE (archived → binding canonical close lane) |

## §5 — Cross-repo coordination

Per `coordination/CONSTELLATION.md`. The Q remediation is fleet-wide cross-repo: keyframes.js (the headline `exports` fix) + value.js + fourier-analysis + bbnf-buddy + words/frontend + speedtest all receive resolver-config writes. Per the AGENT.md MULTI-WRITER policy — per-repo lanes, never bundled; orchestrator owns consumer commits + pushes.

## §6 — Risk register

1. **keyframes.js `exports` fix is the fleet keystone** — one `package.json` change unblocks 5 consumers; it MUST land first (W1) + be verified against all 5 before the per-consumer sweeps.
2. **value.js WIP-vs-master** — P.W5 wrote to the WIP branch; Q-chron-1 forces the resolution. W1 Lane must determine the canonical branch before writing.
3. **CSS budget rebaseline ordering** — Q-sty-6 rebaselines AFTER the W4 token promotions so it happens once (Qγ recommendation).
4. **invariant-29 recurrence** — the 4th K-invariant-3 instance happened after codification. W0 must produce a real tooling gate (analog of the P.W2 stash-script escalation), not another prose edict.
5. **π re-activation depends on Playwright stability** — W5 confirms the tooling holds across a second probe before codifying π as binding.

## §7 — Authority

Plan substrate at Q open: this file + `findings.md` + `PROGRESS.md` + `dispatch/AGENT.md` + `coordination/CONSTELLATION.md` + `research/Q{α-ζ}*.md` (6 round-1) + `audit/Q1{1,2}-*.md` (2 round-2) + `research/screenshots/` (12 Playwright captures) + `waves/W{0-5}.md`.

Per the Q-open user directive ("This is NOT an implementation phase. Tranche development only."), implementation dispatch awaits explicit subsequent user directive per the K → L → M → N → O → P precedent.
