# N — Prune Ledger (KISS-conservative)

Synthesized from 6 N11 consumer audits + 1 N-W4 overfitting audit. Per user N-revision directive: KISS; conservative on both additions and removals; only fold in GENUINELY useful primitives; remove dead/unused/contrived items.

## Read this first

- Total artefacts enumerated: **172** (43 UI + 30 custom + 12 composables + 14 CSS + 73 internal modules)
- Cross-slice verdict distribution: 94 keep / 33 keep-current / 1 inline-and-remove / 3 demo-only-private / 1 delete-unused / 0 library-orphan
- **Conservative retention rate: 94%** (only 5 + 3 prune candidates surfaced from 172 artefacts)

This is the LEAN ledger. The full audit is at `N-W4-overfitting-audit.md`; the per-consumer audits are at `N11-Lane-{a..f}-*.md`.

## A — RETIRE (zero usage; V3 NO legacy code)

| ID | Item | Slice | Evidence | Action | Wave |
|---|---|---|---|---|---|
| **A1** | `useGlassAlpha` | composables/glass/ | rg = 0 sites constellation-wide | Delete `src/composables/glass/useGlassAlpha.ts` + barrel export | N.W0 |
| **A2** | `/freshness` subpath + `src/freshness.ts` | subpath | rg = 0 sites constellation-wide; V.W3 wire-claim never landed; keep `scripts/freshness-gate.mjs` CLI as internal-only | Delete src/freshness.ts; remove from package.json `exports`; remove dist target | N.W0 |
| **A3** | `--{success,warning,info}-foreground` tokens (J-6 chronic) | styles/tokens.css §6 | substrate-without-consumer; deferred since J; never wired | Delete from tokens.css + theme.css bridge | N.W0 |
| **A4** | Stress harness (J-11 chronic) | (ε P2; verify location) | substrate-without-consumer; deferred since J | Verify location + delete if present | N.W0 |
| **A5** | `useTouchGate` | composables/dom/ | rg = 1 (self-definition only); not used anywhere | Inline at definition if salvage value OR delete | N.W0 (inline-and-remove verdict) |

**A-batch totals**: 5 items. All trivial deletions with zero risk to consumers (zero usage means zero breakage).

## B — DEMO-PRIVATIZE (not retire; reclassify; not on library surface)

| ID | Item | Slice | Evidence | Action | Wave |
|---|---|---|---|---|---|
| **B1** | `metaballs` | custom/metaballs/ | 0 external consumers; 3 demo-only sites; WebGL visual substrate | Move to `demo/_internal/metaballs/`; remove from `package.json` exports + subpath; remove `src/components/custom/metaballs/` from glass-ui surface | N.W1 |
| **B2** | `paper-backdrop` | custom/paper-backdrop/ | 0 external consumers; design-specific backdrop | Same: move to `demo/_internal/paper-backdrop/`; surface removal | N.W1 |
| **B3** | `typewriter` | custom/typewriter/ | 0 external consumers; niche animation effect | Same: move to `demo/_internal/typewriter/`; surface removal | N.W1 |

**B-batch totals**: 3 items. Substrate moves from library surface to demo-private. Removes ~3 subpaths from `package.json` exports and reduces dist chunk count.

## C — DEFER (conditional; not pruning at N)

| ID | Item | Slice | Reason for defer |
|---|---|---|---|
| **C1** | `disco-glyph` | custom/disco-glyph/ | 4 sites; N-2 production-consumer audit deferred from M; check user signal before retire (visual-load-bearing in dock UI per Rβ N-2) |
| **C2** | `status-dot` | custom/status-dot/ | 2 sites (ultra-low); semantic but candidate for consolidation into `icon-tooltip` or `status-icon` pattern; needs consumer feedback before merge |
| **C3** | `glass-carousel` | custom/glass-carousel/ | 4 sites (subpath-only); niche themed-carousel variant; defer until 2nd consumer pattern emerges or carousel+glass.css recipe proves sufficient |
| **C4** | 6 dock-family components ONLY consumed by speedtest (per N11/f) | custom/dock/ | reverse-overfitting candidate; speedtest is canonical consumer; defer to AB+ if no 2nd consumer emerges |
| **C5** | `useLeaveTimer` in bbnf-buddy (per N11/c) | (bbnf-local) | LOCAL to bbnf-buddy; not glass-ui surface; inlineable per V3 but harmless as-is; consumer-side decision; M's "no push to consumers from glass-ui" applies |

## D — KEEP, NO ACTION (substantive but low-reach with semantic value)

Per the overfitting audit's "keep-current" verdict — 33 items in this class. Examples:
- `cartoon-card`, `metric-pill`, `notification`, `scroll-pane`, `tags-input`, `toggle-group` (UI; 3 sites each; design-cohesion + re-exported public surface)
- `dock-group`, `instrument-chassis`, `stacked-icons`, `scrolling-text`, `metric-badge`, `pulse`, `glass-panel` (custom; design-specific composites)
- `useInterval`, `useResizeObserver`, `useTokenColor`, `useSidebar`, `useSortable`, `useKeyboardShortcuts`, `useCarousel` (composables with single-domain semantic value)

**Disposition**: KEEP all. Per KISS + L invariant 8: "≥ 2 consumers OR formally retired" — these all pass. Reverse-overfitting risk is monitored but not yet load-bearing for retirement.

## E — REVERSE-OVERFITTING WATCH (glass-ui shipped for a single consumer)

Per N11/f speedtest reverse-overfitting probe:
- **Dock family** (`GlassDock`, `DockLayer`, `DockLayerGroup`, `DockIconButton`, `DockTabButton`, `DockSelectTrigger`): designed for speedtest's three-layer UI; 0 adoption by other consumers; NOT pruning yet (speedtest IS the canonical consumer; reverse-overfitting is acceptable for canonical-consumer-driven substrate)

**N-disposition**: WATCH; no action at N. If by O tranche no 2nd dock-consumer emerges, consider moving dock family to `@mkbabb/glass-ui/speedtest` namespace OR formal-retire.

## F — N-NEW DIRECTIVE re-evaluation (KISS revision)

Per user KISS revision, ALL N-new directive additions need re-justification:

| ID | Original directive | Revised disposition |
|---|---|---|
| **N6** Storybook mobile + configurators | KEEP — small targeted improvements (viewport meta + ConfiguratorRow mobile density CVA). NO new component invented. |
| **N7** Dock blur reduction | KEEP minimal — perceptual audit (W0 Lane III); likely no-op since dock blur is at compositor floor (0px). NO new tokens unless audit surfaces a gap. |
| **N8** `<DockMobileToggle>` new primitive | **RECONSIDER per KISS** — new component for "mobile arrows springy/squish/blob/glass". Per user KISS directive: "conservative with additions ... only fold in new GENUINELY useful primitives". Decision: defer to user. The component is GENUINELY USEFUL for mobile UX, but introduces a new primitive with single consumer (the demo proof-of-concept). Either (a) keep as part of N if user authorizes new primitive OR (b) defer to O with confirmed multi-consumer demand. |
| **N9** Glass panels frosted-default + typography | KEEP — verify-only on glass-panel default (no new tier); promote `text-micro` `@utility` (NO new token; promotes existing `--type-micro`); typography sweep is PRUNING ad-hoc literals to canonical class. |
| **N10** Bidirectional style audit | EXECUTED at N open via Rγ + Rδ + N11 consumer-audit-fan-out (6 parallel agents now complete) + overfitting audit. Codify the practice in precept canon as invariant 21. NO further wave-work needed beyond the codification. |
| **N11** 6-agent consumer post-migration audit | EXECUTED at this revision; all 6 audits + overfitting audit landed. Findings drive this prune ledger. |

## G — Cross-cutting cosmetic absorbs (LOW-RISK CLEANUP at N)

These are tiny doc/cosmetic items absorbed inline at the relevant wave:
- M-residuals N-6 (demo carousel/metaballs import-path harmonisation) → N.W1 demo privatization absorbs
- M-residuals N-8 (`_shared` package naming clarity) → N.W1 docs absorb
- M-residuals N-4 (26 pre-existing AA timeline-story typecheck errors) → N.W1 typography sweep absorbs
- L-P3-3 (Aurora `-inset-6` bloom) → N.W1 demo polish absorb
- bbnf-buddy `useLeaveTimer` inline candidate (per N11/c) → DEFER (consumer-side; M's "no push to consumers from glass-ui" applies)
- value.js `header-ribbon/` orphan (per N11/e) → DEFER (consumer-side)

## Summary

| Category | Count | Disposition |
|---|---|---|
| A — RETIRE (zero usage; V3) | 5 | N.W0 delete |
| B — DEMO-PRIVATIZE (move out of library surface) | 3 | N.W1 reclassify |
| C — DEFER (conditional; needs more signal) | 5 | DEFER to O |
| D — KEEP, no action (semantic value with low-reach) | 33 | KEEP |
| E — REVERSE-OVERFITTING WATCH (dock family) | 6 components | WATCH |
| F — N-new directives revisited | 6 | 4 keep / 1 reconsider (N8) / 1 codify-only |
| G — Cosmetic absorbs | 6 | inline at appropriate wave |

**Net library surface change at N close**: −5 items (A-batch deletions) + −3 items moved demo-private (B-batch) = **−8 items removed from glass-ui public surface**. Plus 0–1 new component (N8 if authorized).

## Verdict

The library is HEALTHY. 94% keep rate means glass-ui is NOT over-engineered relative to its consumer constellation. The 8-item prune (A + B batches) is the proper KISS application: delete genuine orphans, privatize what was never library-grade. Everything else has earned its place.

The N tranche plan should be revised to be PRUNING-FORWARD (A-batch + B-batch as the HEADLINE) with the original N6/N7/N9 directives as supporting work and N8 (new DockMobileToggle component) deferred or re-justified per the user's KISS directive.
