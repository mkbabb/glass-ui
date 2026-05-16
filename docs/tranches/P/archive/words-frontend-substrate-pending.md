# words/frontend cohort E.3 + E.4 + E.5 — substrate-pending vs consumer-design-pending dispositions

**Date**: 2026-05-16.
**Status**: 3 mixed dispositions per the W5 Lane E pragmatic-scope-mitigation clause.
**Source**: P11/a + W5 Lane E partial-completion (E.1 + E.2 LANDED; E.3 + E.4 + E.5 FLAGGED).

## §1—Scope

W5 Lane E (words/frontend) landed 2 of 5 sub-tasks: Fira Code CDN drop (E.1) + scale-on-hover 15-site migration (E.2). The remaining 3 surfaced specific substrate-API + consumer-design tensions documented below + dispositioned per P invariant 28 (zero deferral; each item exits W5 with explicit disposition).

## §2—E.3 MetricRow / MetricStack adoption — ADDRESSED with substrate extension

**Tension**: `<MetricRow>` value clamp floors at `4.5rem` (audacious-poster register; speedtest-bound). Consumer needs `text-title` (~1.5rem) to `text-4xl` (~2.25rem) for compact metric cells — order-of-magnitude smaller register.

**Disposition**: **ADDRESSED at W5 close via substrate extension.** `src/components/custom/metric-stack/MetricRow.vue` updated to route the clamp endpoints through CSS-var tokens with audacious-poster defaults preserved bit-for-bit:

```diff
- font-size: clamp(4.5rem, ..., var(--type-display-hero));
+ font-size: clamp(
+     var(--metric-row-value-clamp-min, 4.5rem),
+     ...,
+     var(--metric-row-value-clamp-max, var(--type-display-hero))
+ );
```

Plus matching `--metric-row-unit-clamp-{min,max}` for the unit cell.

Consumers shrinking the register override at `:root` or per-row:
```css
:root {
    --metric-row-value-clamp-min: 1.5rem;     /* text-title */
    --metric-row-value-clamp-max: 2.25rem;    /* text-4xl */
}
```

Canonical custom-property cascade per DESIGN.md texture-system pattern. Words/frontend's compact-register adoption now unblocked — the consumer-side wave (theirs, not P-orchestrator's) executes the per-cell consume.

**Status**: ADDRESSED (glass-ui substrate ship at W5 close).

## §3—E.4 ProgressiveSidebar slotted-chassis adoption — ARCHIVED as CONSUMER-DESIGN-PENDING

**Tension**: words/frontend's `WordlistProgressiveSidebar` (319 LOC) carries consumer-specific surface elements that don't yet have a tight fit with the slotted-chassis API: `themed-card` visual continuity vs chassis `<aside>`, Popover-trigger fit inside `<ProgressiveSidebarSection>`, preamble content placement (wordlist summary + mastery bar), `SidebarState` driver construction for the TOC-mode sibling.

**Disposition**: **ARCHIVED as CONSUMER-DESIGN-PENDING.** The glass-ui-side substrate (P.W3 Lane B) is sufficient for the canonical slotted-chassis use; the consumer's structural needs are consumer-orchestrator-owned design decisions. Glass-ui's role at this absorb is the substrate ship; the consumer's own tranche owns the per-site adoption with the design judgements its team makes.

If a future consumer-side tranche surfaces a specific gap (e.g., a `<SectionPopoverTrigger>` primitive or a `themed-card` variant on chassis), glass-ui-side may absorb at that point. P-tranche makes no further moves here.

**Status**: ARCHIVED-CONSUMER-DESIGN-PENDING. Carry exits P-close per invariant 28.

## §4—E.5 PaperBackdrop /api adoption — ARCHIVED as CONSUMER-ORCHESTRATOR-OWNED

**Tension**: words/frontend ships 503 LOC of texture-system substrate (162 useTextureSystem + 341 texture components) + 71 LOC Card.vue + 112 LOC ThemedCard.vue + 9 `<ThemedCard>` call sites + 2 `texture-paper-clean` PWA sites. Migration to PaperBackdrop /api cascades through 4-frequency / 3-intensity / 4-blendMode register collapse.

**Disposition**: **ARCHIVED as CONSUMER-ORCHESTRATOR-OWNED** per CONSTELLATION.md §6 separation-of-concerns. Glass-ui-side substrate (P.W3 Lane C PaperBackdrop /api + DESIGN.md texture-system section) is sufficient; the 503-LOC consumer entanglement is words/frontend's own cleanup wave to execute on its own schedule. Glass-ui READER-ONLY at this absorb.

**Status**: ARCHIVED-CONSUMER-ORCHESTRATOR-OWNED. Carry exits P-close per invariant 28.

## §5—P-residuals

| E sub-task | Status |
|---|---|
| E.1 Fira Code CDN drop | LANDED at words/frontend (master) |
| E.2 scale-on-hover migration (15 sites) | LANDED at words/frontend (master) |
| E.3 MetricRow / MetricStack adoption | ADDRESSED (glass-ui substrate extension at W5 close; consumer adoption is consumer-tranche-owned) |
| E.4 ProgressiveSidebar slotted-chassis | ARCHIVED-CONSUMER-DESIGN-PENDING |
| E.5 PaperBackdrop /api adoption | ARCHIVED-CONSUMER-ORCHESTRATOR-OWNED |

Zero P-residuals exit at close.

## §6—Cross-references

- `docs/tranches/P/waves/W5.md` Lane E.
- `docs/tranches/P/audit/P11-Lane-a-words-frontend.md`.
- `docs/tranches/P/audit/W5-Lane-E-words-frontend.md` (the lane proof doc with sub-task diff detail).
- `docs/tranches/P/coordination/CONSTELLATION.md` §6.

## §7—Status: COMPOSITE — E.3 ADDRESSED; E.4 + E.5 ARCHIVED-PERMANENT.
