# K.W0 — Lane I reconciliation deliverable

This file is the canonical W0 Lane I gate-fulfillment artifact per the K
plan's `audit/W0-reconciliation.md` named-deliverable. The load-bearing
ledger lives at `audit/K-reconciliation-2026-05-08.md` (560 lines; 38
hard-gate items dispositioned across 9 wave specs). This document is a
thin pointer + state-as-of-W0-dispatch addendum; it does not duplicate
the dated reconciliation.

## Source ledger

`audit/K-reconciliation-2026-05-08.md` — authored 2026-05-08 against HEAD
`23ce73c` (v0.9.0). Walks every K wave spec line-by-line against the
67 post-open commits; cross-walks Rβ chronic-deferrals + Rα silent-misses
+ Rγ residual mapping + Rε architectural-transposition candidates.

## Disposition summary (verbatim from source)

| Wave | hard-gate items | ABSORBED | PARTIAL | OPEN | OBSOLETE |
|---|---:|---:|---:|---:|---:|
| W0 | 4 | 0 | 0 | 4 | 0 |
| W1 | 3 | 1 | 1 | 0 | 1 |
| W2 | 5 | 4 | 0 | 1 | 0 |
| W3 | 5 | 0 | 2 | 3 | 0 |
| W4 | 4 | 0 | 0 | 4 | 0 |
| W5 | 3 | 0 | 1 | 1 | 1 |
| W6 | 5 | 0 | 0 | 5 | 0 |
| W7 | 2 | 0 | 0 | 2 | 0 |
| W8 | 7 | 0 | 0 | 7 | 0 |
| **Total** | **38** | **5** | **4** | **27** | **2** |

## State-as-of-W0-dispatch addendum (post-2026-05-08)

Between the 2026-05-08 reconciliation and W0 dispatch, additional commits
landed on master via the speedtest W tranche cross-repo dispatch:

- `49c1516` perf(cn) — replaced tailwind-merge with clsx + hand-rolled dedup (W3.b.2 / v0.9.2 SCC trap).
- `9a7d4b7` test(cn) — conflict-pair dedup coverage 340/340.
- `3afbe41` fix(index) — drop freshness from root barrel (browser-safe).
- `cc30e74` release: v0.9.2.
- `ba6c5ad` docs(tranches/K) — add WS wave (vueuse SCC trap).

Counts re-verified at W0 dispatch:

- 7 src files contain `color-mix(--foreground)` (was 19 in plan; consolidated by V tokens.css cleanup at HEAD).
- 2 demo files contain `color-mix(--foreground)`.
- 5 demo files contain `focus-visible:shadow-[var(--focus-ring-shadow)]`.
- 5 `transition-all` survivors (3 V-introduced demo composable stories + `motion/stagger.vue:59` + `CarouselDots.vue:62`).
- `.overlay-scrim` @utility still present at `src/styles/utilities.css`.
- `cssVar()` consumed only by `BouncyToggle.vue` (3 sites).
- `hoverOpenDelay` not present at HEAD; `openDelay` exists with default 250.
- 16 demo files carry the raw `rounded-card border bg-card shadow-cartoon` triplet (speedtest W2.T10 owns).
- `meta-description` absent from `index.html`.
- `npm run profile:budget` script absent from `package.json`.

## Gate fulfillment

W0 hard gate (a) — reconciliation ledger present at `audit/W0-reconciliation.md` ✓ (this file + dated source).
W0 hard gates (b)–(d) — fulfilled by Lane II precept-submodule update + W0 close commit.

## Authority

This document closes W0 Lane I. Lane II is agent-dispatched; its proof
doc at `docs/precepts/instructions/{ORCHESTRATION.md, tranche/AGENT_DISPATCH_TEMPLATE.md, LESSONS-LEARNED.md}`
plus the parent submodule pin bump close W0.
