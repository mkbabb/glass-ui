# P.W5 Lane A.1 follow-on—MetricRow clamp-endpoint token extension (E.3 unblock)

**Status**: COMPLETED.
**Date**: 2026-05-16.
**Lane shape**: orchestrator-direct (small CSS-token extension; absorb of Lane E.3 substrate-mismatch finding).

## §1—Scope

Per the W5 Lane E partial-completion report § E.3: `<MetricRow>` value clamp floors at `4.5rem` (audacious-poster register; speedtest-bound). The words/frontend consumer's compact metric cells need `text-title` (~1.5rem) to `text-4xl` (~2.25rem) — order-of-magnitude smaller register.

Per P invariant 28 (zero deferral) + the user's "no quick solutions; idiomatic, gestalt approaches" directive: glass-ui-side substrate extension is the canonical absorb (rather than deferring the consumer adoption to a successor wave).

## §2—Edit

`src/components/custom/metric-stack/MetricRow.vue` value + unit clamp endpoints routed through CSS-var tokens; audacious-poster defaults preserved bit-for-bit:

```css
.metric-row__value {
    font-size: clamp(
        var(--metric-row-value-clamp-min, 4.5rem),
        calc(
            34cqi * var(--result-row-scale, 1) * 3 /
                max(3, var(--digit-count))
        ),
        var(--metric-row-value-clamp-max, var(--type-display-hero))
    );
    /* ... */
}

.metric-row__unit {
    font-size: clamp(
        var(--metric-row-unit-clamp-min, 1.5rem),
        calc(6cqi * var(--result-row-scale, 1)),
        var(--metric-row-unit-clamp-max, 3.25rem)
    );
    /* ... */
}
```

Four new tokens; defaults match prior hardcoded values exactly. Canonical custom-property cascade per DESIGN.md texture-system pattern.

## §3—Consumer-side adoption (post-ship)

Words/frontend's compact-register cells override at `:root` (or per-row):

```css
:root {
    --metric-row-value-clamp-min: 1.5rem;     /* text-title */
    --metric-row-value-clamp-max: 2.25rem;    /* text-4xl */
    --metric-row-unit-clamp-min: 0.875rem;    /* text-sm */
    --metric-row-unit-clamp-max: 1rem;        /* text-base */
}
```

Or per-row scoping (`.metric-card--compact { --metric-row-value-clamp-min: ... }`).

## §4—Verification

- `npm run typecheck` — PASS.
- `npm run build` — PASS (29.94 s).
- `npm run verify-export-types` — PASS.
- `npm run profile:budget` — PASS (CSS 89.0% raw / 90.2% gzip; the 4 new fallback tokens are inline `var(name, default)` references with no token declarations added — zero raw bytes beyond the longer var() expressions).
- `npm test` — PASS (32 files / 367 tests; +2 from useClipboard+copyToClipboard surface-lock additions at v1.8.2).

## §5—P invariant compliance

- **P invariant 4 (idiomatic gestalt)**: the absorb is the canonical custom-property cascade pattern — no compact-variant prop, no `--metric-row-mode` mode union, no SFC fork. Defaults preserve audacious-poster bit-for-bit.
- **P invariant 5 (NO LEGACY CODE)**: no shim, no variant alias, no migration path beyond the CSS-var override.
- **P invariant 28 (zero deferral)**: E.3 closes at this absorb. Consumer-side adoption is consumer-orchestrator-tranche-owned (per CONSTELLATION.md §6) but the substrate gap is filled.

## §6—Status: COMPLETED.
