# Consumer Evidence — `DockGroup`

**Source**: `src/components/custom/dock-group/`
**Originating tranche**: P (cross-repo speedtest tranche; landed in glass-ui without owning a glass-ui-side wire-or-retire pass)
**Glass-ui wire-or-retire pass**: I.W1 Lane B (this audit)
**Verdict**: **WIRE** (≥ 2 sites — 1 in-repo demo, 1 cross-repo non-demo; meets bar via fresh evidence)

## Consumers at HEAD

| # | File | Line | Site type |
|---|---|---|---|
| 1 | `demo/stories/primitives/dock-group.vue` | 3, 14, 19, 25, 30, 36, 49, 55, 57 | in-repo demo (4 `<DockGroup>` arrangements covering default + `density="audacious"` + slotted children) |
| 2 | `../speedtest/src/components/speedtest/MetricStrip.vue` | 3, 21, 44, 284 | cross-repo non-demo (canonical pill-row shelf for metric strip) |

## Verification command

```bash
rg -l 'DockGroup' src/ demo/ ../speedtest/src 2>/dev/null
```

## Public API surface used

- `DockGroup` (default export from `./DockGroup.vue`)
  - Props observed: `density` (`"audacious"` value seen in both consumers; default density also exercised in demo)
  - Slot: default (children — typically `MetricBadge` / pill-tier consumers per CLAUDE.md "pill-row shelf for dock-tier consumers" description)
  - Companion CSS shelf rules ship with the package (consumer comment `MetricStrip.vue:284` notes "DockGroup ships its own inline-flex / gap / shelf rules")
- Subpath import: `@mkbabb/glass-ui/dock-group` (consumed by speedtest)

## Notes

- The W0 reconciliation §2.2 row 17 marked DockGroup as sub-bar (1 in-repo + 1 cross-repo). Re-walking against fresh `rg` confirms the 2-site count holds at HEAD; per the I.W1 Lane B method ("≥ 2 distinct consumer files → WIRE"), this clears the bar.
- The two consumers exercise distinct roles: the demo story tests the default + `audacious` density rungs; speedtest `MetricStrip.vue` is the canonical pill-row shelf for dock-tier metric pills.
- Note: this is the thinnest of the 4 P-tranche packages — exactly at the ≥ 2 bar. If speedtest's MetricStrip ever drops the wrapper in favor of inline flex utilities, DockGroup falls under the bar and the verdict re-opens. The CLAUDE.md catalog describes it as `(P)` provisional; consumer-evidence here is what holds the WIRE verdict.
