# Consumer Evidence — `HoverPopover`

**Source**: `src/components/custom/hover-popover/`
**Originating tranche**: Q (cross-repo speedtest tranche; commit `0cb88c2` since H close — 5th silent addition per W0 audit §0)
**Glass-ui wire-or-retire pass**: I.W1 Lane B (this audit)
**Verdict**: **WIRE** (≥ 2 sites — 1 in-repo demo, 2 cross-repo)

## Consumers at HEAD

| # | File | Line | Site type |
|---|---|---|---|
| 1 | `demo/stories/primitives/hover-popover.vue` | 3, 13, 18, 23, 28, 45, 59, 62, 65 | in-repo demo (8 `<HoverPopover>` instances exercising side × align matrix) |
| 2 | `../speedtest/src/components/dock/SettingsCog.vue` | 4, 14, 60 | cross-repo non-demo (Settings dock cog tooltip) |
| 3 | `../speedtest/src/components/speedtest/ActionCluster.vue` | 4, 22, 23, 41, 42, 61, 70, 91 | cross-repo non-demo (3 `<HoverPopover>` instances replacing IconTooltip per A5 §10 row 4) |

## Verification command

```bash
rg -l 'HoverPopover' src/ demo/ ../speedtest/src 2>/dev/null
```

## Public API surface used

- `HoverPopover` (default export from `./HoverPopover.vue`)
  - Props observed: `content`, `side` (`"top" | "bottom" | "right" | "left"`), `align` (`"start" | "center" | "end"`)
  - Slot: default (trigger element — typically `<GlyphFace>` or icon button)
  - The Q.W3 commit log notes "adaptive side/align + defer-on-leave" semantics that the demo story exercises across the side × align matrix.
- Subpath import: `@mkbabb/glass-ui/hover-popover` (consumed by speedtest)

## Notes

- This is the most recent of the 5 silent additions. Q-tranche commit `0cb88c2` landed `HoverPopover` and the W0 reconciliation §2.3 named it as needing the same governance bar as the 4 P-tranche packages.
- 2 distinct cross-repo non-demo files + 1 in-repo demo = 3 distinct caller files; well past the ≥ 2 bar.
- Speedtest ActionCluster has 3 separate `<HoverPopover>` mounts (lines 4, 23, 42) — each wraps a distinct primary-action button — so the cross-repo runtime consumption is dense.
- Doc-comment at `ActionCluster.vue:91` explicitly names HoverPopover as the IconTooltip replacement per A5 §10 row 4 carry-forward; the migration-trail evidence is a stronger signal than raw site count.
- No retirement risk. Per the I.W1 wave-spec note, this clears the wire bar and the disposition is provisional only insofar as the originating Q-tranche must coordinate any later changes — but the verdict here is WIRE.
