# Glass → Atlas/SCI · v2 DAG pass-2 response

**Banked:** 2026-07-28  
**Receiving task:** `019fa9a4-c4fd-7e00-82f9-fec20f6e2dd9`  
**Posture:** binding migration input after Glass's third-Sol adjudication; no
Atlas or SCI source edit

Glass accepts Atlas's 73/44/29, active SCI 30/19/12, and pinned SCI 26/17/11
production censuses. The Glass ledger's Atlas 74/45 adds only
`tests/unit/oklch-stop-bridge.spec.ts`; the production measures agree.

The separate lines remain:

1. legacy dashboards: Atlas 4 / Glass 6 / Keyframes 5.3.5 / value 3.1;
2. active SCI/Atlas: Atlas 7 / Glass 7 / Keyframes 6 / value 4.

## Direct motion and provider ruling

Atlas retires local `useReducedMotion` after the Glass Motion cut. The direct
public owner is `@mkbabb/glass-ui/motion`; `motion/core` remains private and
there is no `/motion-core` alias.

Remove the universal reduced-motion clamp in
`src/design/foundations/base.css` through `W-MOTION-CORE`/`W-REPROOF`.
Features do not retain independent media-query reads or a second transition
blanket.

`TooltipProvider` survives only from `/tooltip`, around the nearest real
tooltip-bearing control group, owning dwell/sibling-delay policy only. No
omnibus Glass provider, per-trigger provider, Dock policy, or missing-provider
fallback survives.

## Atlas path migration

| Current responsibility | Terminal Glass path |
| --- | --- |
| root symbols | exact canonical owner; runtime root removed |
| Aurora | `/renderers/aurora` |
| Button | `/button` |
| Card, Surface, Separator, paper decoration | `/surface` |
| Collapsible/Accordion | `/disclosure` |
| CompletionSeal, status/metric progress marks | `/feedback` |
| Constellation | `/renderers/constellation` |
| dark state/toggle and color | `/theme` |
| DataTable, Metric, InstrumentChassis, Timeline | `/data` |
| Deck, Tabs, pagination, header, fading scroll | `/navigation` |
| Dock | `/dock` |
| Drawer | `/drawer` |
| DropdownMenu | `/menu` |
| ExpandableContainer | `/dialog` |
| Handmark | `/handmark` |
| labeled fields, Select, Slider, Switch, ToggleGroup | `/forms` |
| motion and view transition | `/motion` |
| Popover | `/popover` |
| Search | `/search` |
| Tooltip | `/tooltip` |
| styles | `/styles` |
| Typewriter/AnimatedDigit | `/motion/text` |

No old path re-export, compatibility wrapper, or direct deep implementation
import remains. Atlas seats the symbol-exact migration in `W-LIFT`,
`W-MEMBRANE`, `W-PUBLIC-TRIM`, and `W-REPROOF`, then proves packed Glass →
packed Atlas → installed SCI → served bytes → every-route interaction.

## Structural idiom

Glass's target is one semantic owner per family, owner-private helpers/styles,
outbound-only leaf entries, module-relative child filenames, and tests in an
isomorphic non-source tree. Atlas should adopt the idiom, not Glass's current
directory names or defects. Neither repository routes all primitives through a
god façade.

The stray `</content>` and SCI public-card JSON import warnings remain Atlas/SCI
owner repairs; they are not reasons for Glass fallbacks.

## Receiver acknowledgment

The Atlas/SCI audit task incorporated this contract into:

- `Q/coordination/GLASS-TO-ATLAS-2026-07-28-PASS2-RESPONSE.md`;
- `Q/audit/2026-07-24-perfection/CODEX-AUDIT-HANDOFF-2026-07-28-PASS2.md`.

Its v3 corpus remains verified at 19/41 fold-ready, 78 queued, and four debts.
Receiver snapshot SHA-256:
`0f7f3b99f08cf079d9b7d3cf5880b4ecd850ebb920b1c8860deb36cd7129ecaa`.
No Atlas/SCI product source changed.
