# MetricStack

## Artefact path

`src/components/custom/metric-stack/` (the published subpath `@mkbabb/glass-ui/metric-stack`).

## Verdict

`keep-current` — **sole-but-real** (one real external production call-site + the showcase story).
`MetricStack` + `MetricRow` are the vertical metric-grouping grid. The honest component-orphan
census (source files only, library publication machinery + demo own-story excluded) measures it at
exactly **1 real external production call-site** — below the bare ≥2 bar, but a genuine load-bearing
production use, not an orphan. Booked here per the evidence-doc escape.

## Consumer proof (re-runnable)

**External consumers — 1 (real, production; plus its test).** speedtest composes it in the result
stack:

```bash
grep -rln 'MetricStack|MetricRow|metric-stack' ~/Programming/speedtest/src
#   → ~/Programming/speedtest/src/components/speedtest/ResultStack.vue          (production)
#   → ~/Programming/speedtest/src/components/speedtest/__tests__/SpeedtestResults.complete.test.ts (its test)
```

**Internal consumers — 1 demo (the showcase story).**

```bash
grep -rn '<MetricStack' demo/   # → demo/stories/data/metric-stack.vue
```

## The named ≥2-consumer TRIGGER

A SECOND real production consumer (a fourier or slides metric grouping) clears the bar on its own
and retires this doc's load-bearing role. Until then this is the honest book: one real production
call-site, kept.

## Re-audit proof

Satisfies the `proof:component-orphan` `keep-current` verdict for `metric-stack` while the speedtest
call-site stays present. If speedtest drops it AND no second consumer arrives, the verdict returns
to `library-orphan` (formally retire the subpath + export).

## Cross-references

- `~/Programming/speedtest/src/components/speedtest/ResultStack.vue` (the real consumer).
- `demo/stories/data/metric-stack.vue` (the showcase story).
- `docs/consumer-evidence/metric-cell.md` (the sibling compact-card primitive).
