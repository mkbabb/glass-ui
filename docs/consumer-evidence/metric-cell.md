# MetricCell

## Artefact path

`src/components/custom/metric-cell/` (the published subpath `@mkbabb/glass-ui/metric-cell`).

## Verdict

`keep-current` — **sole-but-real** (one real external production call-site + the showcase story).
`MetricCell` is the compact metric card — icon + label over value/unit on a wash-tier surface, in
`dashboard` / `compact` / `bare` registers. The honest component-orphan census (source files only,
library publication machinery + demo own-story excluded) measures it at exactly **1 real external
call-site** — below the bare ≥2 bar, but a genuine load-bearing production use, not an orphan.
Booked here per the evidence-doc escape.

## Consumer proof (re-runnable)

**External consumers — 1 (real, production).** speedtest composes it in the result detail sheet:

```bash
grep -rln 'MetricCell|metric-cell' ~/Programming/speedtest/src
#   → ~/Programming/speedtest/src/components/dashboard/ResultDetailSheet.vue
```

**Internal consumers — 1 demo (the showcase story).**

```bash
grep -rn '<MetricCell' demo/   # → demo/stories/data/metric-cell.vue
```

## The named ≥2-consumer TRIGGER

A SECOND real consumer (a fourier metric panel, a slides KPI card) clears the bar on its own and
retires this doc's load-bearing role. Until then this is the honest book: one real production
call-site, kept.

## Re-audit proof

Satisfies the `proof:component-orphan` `keep-current` verdict for `metric-cell` while the speedtest
call-site stays present. If speedtest drops it AND no second consumer arrives, the verdict returns
to `library-orphan` (formally retire the subpath + export).

## Cross-references

- `~/Programming/speedtest/src/components/dashboard/ResultDetailSheet.vue` (the real consumer).
- `demo/stories/data/metric-cell.vue` (the showcase story).
- `docs/consumer-evidence/metric-stack.md` (the sibling result-grouping primitive).
