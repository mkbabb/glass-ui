# I — Progress Log

## 2026-05-05 — Tranche open

I opens against H's clean close at `c5f196c`: build/typecheck green; H FINAL.md present; six deep-audit deliverables under `docs/tranches/H/audit/H-deep-audit-{α,β,γ,δ,ε,ζ,playwright}.md`; chronic-deferral master inventory in ζ audit (21 items, 11 chronic).

I reads the six deep audits as load-bearing input — no open design space, no research wave.

I thesis: substrate is settling but not yet steady-state. G expanded; H trimmed; I completes the inward correction by closing every chronically deferred item, resolving three architectural tensions, and promoting the 6-agent post-close audit pattern to canonical close.

Wrote initial `I.md`, `waves/W{0..7}.md`, this `PROGRESS.md`.

## 2026-05-05 — W0 close

W0 dispatched as 2 parallel lanes:

- **Lane I** (read-only HEAD reconciliation, agent `a264ce2fb288a1f42`): walked 21 ζ chronic-deferral rows + 60 β orphans + 21 γ doc-fix items + 11 δ criticals against HEAD `5dbfe8a`. Disposition splits: 5 WIRE, 6 RETIRE, 3 formal DEFER, 6 RESOLVED, 3 conditional (W3 picks). β count holds at ~59 (31 library-orphan + 28 sub-bar; row 7 promoted to sub-bar). γ count is **24** (21 + 3 since-H additions: HoverPopover catalog, useResizeObserver tree, text-mono-prose typography). Sigma check found 1 source-vs-FINAL override (Σ-2: dock keep-open dual-authority, deep-audit δ wins via source) and 1 false-positive correction (Σ-1: Tabs provide/inject IS shipped, contrary to W6.δ first-pass). Cross-tranche silent surface count is now **5** (P-tranche 4 + Q-tranche `hover-popover` since H close). 5 net-new recovery-diary leaks since H close from P/Q-tranche additions. 3 `tests/public-surface.spec.ts` failures unchanged at HEAD. Output: `audit/W0-reconciliation.md`.

- **Lane II** (precepts submodule update, agent `a5c76e8ee830d09c6`): updated `docs/precepts/instructions/tranche/SPEC.md` `## Close` section (4-agent → 6-agent pattern α/β/γ/δ/ε/π + visual-runtime caveat); appended bundle-budget non-negotiable to `tranche/AGENT_DISPATCH_TEMPLATE.md`; appended 3 new 2026-05-05 entries to `LESSONS-LEARNED.md` (read-only audits miss tailwind-merge / cross-tranche silent additions / recovery-diary scrub binary). Submodule commit: `67c1412`.

W1.md amended to absorb HoverPopover into Lane B (5 silent-addition packages now, not 4) and update leak count to ~25 (5 net-new since H close). Parent typecheck green; build green.

W0 close commit: pending.

## 2026-05-05 — W1 + W2 close (parallel dispatch)

W1 dispatched in 2 passes due to file-bounds conflicts the spec didn't catch (src/index.ts, tokens.css, theme.css written by 3 different lanes).

**Pass 1 (4 parallel agents + W2 in parallel)**:
- **Lane A** (`a790c6b2f933eca5a`) — orphan packages + slot-class props: 6 packages retired (`MultiSelect`, `TagsInput`, `GlassPanel`, `MetaballCanvas`+`Metaballs` whole package, `PaperBackdrop`, `StatusDot`); 6 slot-class props removed from 4 LabeledField components + DataTableColumn; `badgeToneVariants.tone.destructive` confirmed sub-bar (2 demo consumers) and KEPT. Incidental absorbs: `tests/components.smoke.spec.ts`, `tests/public-surface.spec.ts`, `vite.library.ts`, `package.json`, `scripts/proof-package.mjs`, `demo/layout/AppShell.vue`. 43 files touched.
- **Lane B** (`a6e2f3661e84ce515`) — 5 cross-tranche silent-addition packages: 5 evidence docs emitted (all WIRE per ≥ 2 in-repo + speedtest sites); `dock-group` at the bar (1 demo + 1 speedtest). 5 docs created.
- **Lane E** (`af7c8a578c502da00`) — 3 sub-bar CVA evidence docs: all 3 WIRE (toast/inverse, toggle/card, slider/glass-track); demo as canonical Storybook-as-oracle consumer per W0 §2.2.
- **Lane F** (`adbd47b2a3810d890`) — W3 architectural-tension flags doc: 7 W3-bound items (C-1, C-5/6/7/9/10/11) + 3 conditional dispositions (R5, plugin extraction, a11y) + 1 permanent-deferral entry (C-8 blob double-rAF).
- **W2** (`affef196f54867314`) — runtime regressions: shimmer matrix array-binding fix at `flourishes.vue:201`; 3 failing public-surface tests fixed (DOCK_KEEP_OPEN_SINK_KEY added; `.code-badge` rule retired; `--shimmer-duration` → canonical `--duration-shimmer`); Tabs provide/inject re-verified clean (Σ-1 settled in favour of H FINAL §δ).

**Pass 2 (1 agent, after Pass 1)**:
- **W1.CD-merged** (`aa773ea0b607bb9e6`) — combined alias retire + accent-pink + token-orphans + recovery-diary scrub + CI guard: 9 round-trip alias families retired single-direction (recipes hoisted from `tokens.css :root` into `theme.css @theme` for Tailwind v4 utility-emission); `--accent-pink` deleted from 3 sites; 20 token-orphans retired; 31 recovery-diary leaks scrubbed across 16 files; `.github/workflows/lint.yml` lands with recovery-diary grep job + typecheck job. 19 files touched.

**Final integrated verification**:
- `npm run typecheck` — green
- `npm run build` — green (14.77s)
- `npm run test` — 266/266 across 18 files
- canonical recovery-diary grep — 0 hits
- `--cartoon-shadow` alias grep — 0 hits
- `--accent-pink` grep — 0 hits
- `npm run proof:theme` — all 27 probe utilities present, all assertions pass

**Total combined diff**: 63 files changed (169 insertions / 2035 deletions); 8 evidence docs + 6 audit docs + 1 CI workflow + 1 PROGRESS update created.

W1+W2 close commit: pending.

## Status

| Wave | Status |
|---|---|
| W0 | complete |
| W1 | complete |
| W2 | complete |
| W3 | open (ready to dispatch) |
| W4 | pending W3 |
| W5 | open (ready to dispatch — parallel with W3) |
| W6 | open (ready to dispatch — parallel with W3 + W5) |
| W7 | pending W4 + W5 + W6 |
