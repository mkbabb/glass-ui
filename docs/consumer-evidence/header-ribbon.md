# HeaderRibbon

## Artefact path (RETAINED persistent-only — BI.W-P114 re-spec)

`src/components/header-ribbon/` (`HeaderRibbon.vue` + `types.ts` + `index.ts` + `styles.css`) +
the published `@mkbabb/glass-ui/header-ribbon` subpath + `HeaderRibbonProps` +
`HeaderRibbonPlacement`. **RETAINED** as one persistent corner command band. The `collapsible`
mode, the `anchor` slot, `mode`, `anchorLabel`, `HeaderRibbonMode`, and
`HeaderRibbonAnchorSlotProps` are **DELETED clean-break** (no alias; `collapsible` never shipped
in a published release — it is cut pre-7.0.0).

## Verdict — persistent RETAIN, collapsible CUT (adjudicated on merit, twice-critiqued)

The wave originally shipped a discriminated `persistent | collapsible` contract. The pass-2
gestalt challenge (`docs/tranches/BI/addenda/reports/challenges/P114-f2-gestalt.md`) faulted it
**FIT-PARTIAL**; the constellation harden sweep confirmed the split verdict.

### Consumer census (the earning law: ≥2 real sites OR exported-with-demand)

| Site | Kind | Mode | Slots | Verdict |
|---|---|---|---|---|
| keyframes `demo/components/instrument/shell/EditorShell.vue:16` | real external, published boundary | `persistent`, `placement="right"` | `#items` only | **counts** (exported-with-demand) |
| glass-ui `demo/stories/navigation/header-ribbon.vue` | demo specimen | — | items | does not count (specimen) |

- **Real consumers of `persistent`: 1** (keyframes, across the published `/header-ribbon`
  subpath). Under *exported-with-demand*, this earns persistent's retention.
- **Real consumers of `collapsible`: 0.** The entire disclosure/pin/hover-reveal/Escape/
  focus-presence machinery was exercised only by this component's own demo story — a demo-chassis
  pattern wearing a library coat. It fails the ≥2-sites law and is cut.
- The sole consumer's `defineExpose({ headerRibbonRef })` (`EditorShell.vue:197`) is a **dead
  ref-forward** — never read, and `HeaderRibbon` exposed no instance API. keyframes treats the
  ribbon as inert positioned chrome, not an interactive widget.

### Constellation harden sweep (2026-07-16)

Swept keyframes.js, value.js, atlas, sci-report, slides, speedtest, muster, words for any
`HeaderRibbon` `collapsible` / `anchorLabel` / `anchor`-slot / `mode=` usage. **Zero collapsible
usage in any sibling code** — every non-persistent reference is documentation. The one code
consumer (keyframes `EditorShell`) is `persistent`/`right`/`#items` and survives the flatten with
**zero behavior change**. atlas and words have no `HeaderRibbon` reference at all.

### Why collapsible earned deletion, not a home

- It **half-duplicated the disclosure family** — hand-rolled `aria-controls`/`aria-expanded`
  instead of `src/components/_shared/disclosure-context.ts`.
- **Dead knob** `--header-ribbon-actions-width` (no setter anywhere) and the uncoordinated
  30rem-actions width cap and the --header-ribbon-actions-width knob, both entirely inside the
  collapsible geometry. (The 32rem band cap survives deliberately as the persistent band's
  responsive max-inline-size — styles.css — and is not part of the cut.)
- Per the session ruling: cuts and keeps are adjudicated on merit through the twice-critique;
  consumer dependence alone preserves nothing; no legacy, no dual paths.

## Cross-repo coordination

The cut supersedes-in-part value.js's V-A92 opt-in-collapsible prescription. The value.js core
intent is **preserved**: the broken VNode/DOM anchor inference (V-A90/V-A91) stays dead — with no
mode, there is nothing to infer. The coordination mark is recorded at
`~/Programming/value.js/docs/tranches/V/GLASS-INBOUND-2026-07-16-headerribbon-persistent-only.md`;
value.js updates V-A92/V-A128, `FINAL.md:40`, `DECISIONS` D2/D41, `PROMPT-RECAP:225`, and the W17
`headerRibbonMode` manifest expectation to persistent-only at its own boundary. Value 4.0.0 stays
immutable; no producer is reopened.

## Retained surface

`HeaderRibbon` keeps the `/header-ribbon` subpath, `placement="left|right"`, `ariaLabel`, `class`,
and the `#items` slot — a `role="toolbar"` host, expanded from first paint, wrapping a quiet
functional-glass `Surface` with `--z-header`, coarse-pointer geometry, the forced-colors boundary,
and RTL row flow.
