# K.W1 — Silent-miss Closeout Proof (`hoverOpenDelay` rename)

**Wave**: K.W1 (sequential, single agent, shared isolation)
**Decision**: Option B — clean-break rename `openDelay` → `hoverOpenDelay`
**Rationale**: K invariant 1 (no legacy code) forbids alias-deprecate
shims; `openDelay` is generic, `hoverOpenDelay` matches J's named API
and reads as hover-popover-specific so deeper-nested popovers can
extend the defer without colliding with sibling cadence vocabulary.
**Date**: 2026-05-09
**Branch**: master (W1 dispatch on `o-w2_7-instrument-chassis` planning
branch; per K invariant 7, this proof doc is authored by the agent;
the orchestrator owns the index and commits the wave at close)

## Pre-state

```
$ rg -n "openDelay" src/ demo/
src/components/custom/hover-popover/HoverPopover.vue:52:        openDelay?: number;
src/components/custom/hover-popover/HoverPopover.vue:79:        openDelay: 250,
src/components/custom/hover-popover/HoverPopover.vue:128:    <HoverCardRoot v-model:open="isOpen" :open-delay="openDelay" :close-delay="closeDelay">
```

3 hits — all internal to `HoverPopover.vue` (type field, default,
template binding to the underlying reka-ui `HoverCardRoot`'s
`open-delay` prop). No external consumer in `src/` or `demo/` was
binding `:open-delay="…"` to `<HoverPopover>` — the rename touches
only the public outer-facing prop.

```
$ rg -n "hover-popover|HoverPopover" src/ demo/
```

The pre-state hover-popover footprint, surveyed for completeness:

- `src/components/custom/hover-popover/HoverPopover.vue` (the SFC)
- `src/components/custom/hover-popover/index.ts` (barrel)
- `src/index.ts:10` (root barrel re-export)
- `src/hover-popover.ts:1` (subpath export)
- `src/styles/hover-popover.css` (substrate sheet)
- `src/styles/index.css:35` (substrate import)
- `src/styles/dock.css:582` (cross-substrate citation, no prop)
- `src/components/custom/dock/GlassDock.vue:94` (J.W3.B citation, no prop)
- `src/components/custom/dock/composables/dockContext.ts:9` (citation)
- `demo/stories/manifest.ts:126` (manifest entry)
- `demo/stories/primitives/hover-popover.vue` (story; 7 instances)
- `demo/stories/navigation/dock.vue` (3 instances; uses
  `keep-dock-open` only)
- `demo/stories/composables/use-touch-gate.vue:15` (prose mention)

None of the consumer sites was binding `:open-delay`. The story did
not exercise a non-default value.

## Post-state

```
$ rg "openDelay" src/components/custom/hover-popover/ demo/stories/
(no output)

$ rg "openDelay" src/ demo/
(no output)
```

0 hits — the rename is total.

```
$ rg "hoverOpenDelay|hover-open-delay" src/ demo/
demo/stories/primitives/hover-popover.vue:            <p class="section-label">hover-open-delay · nested cadence</p>
demo/stories/primitives/hover-popover.vue:                <HoverPopover content="snappy · 80ms" side="top" :hover-open-delay="80">
demo/stories/primitives/hover-popover.vue:                <HoverPopover content="deferred · 500ms" side="top" :hover-open-delay="500">
demo/stories/primitives/hover-popover.vue:                <code class="rounded bg-muted px-1">hoverOpenDelay</code> tunes
src/components/custom/hover-popover/HoverPopover.vue:        hoverOpenDelay?: number;
src/components/custom/hover-popover/HoverPopover.vue:        hoverOpenDelay: 250,
src/components/custom/hover-popover/HoverPopover.vue:    <HoverCardRoot v-model:open="isOpen" :open-delay="hoverOpenDelay" :close-delay="closeDelay">
```

7 hits (≥ 2 required):

- `HoverPopover.vue` × 3 — the prop type, default, template binding
  forwarding to the reka-ui kebab-cased `:open-delay` (which stays
  unrenamed, as it targets reka-ui internals, not the public outer
  prop).
- `demo/stories/primitives/hover-popover.vue` × 4 — the new section
  label, two non-default cells (80ms snappy, 500ms deferred), and
  the `<code>` mention in the caption.

## Files changed

| Path | Change |
|---|---|
| `src/components/custom/hover-popover/HoverPopover.vue` | rename `openDelay` → `hoverOpenDelay` (type field L52, default L79, template binding L128); JSDoc updated to motivate the hover-popover-specific naming |
| `demo/stories/primitives/hover-popover.vue` | new "hover-open-delay · nested cadence" section with 3 cells (default 250ms baseline + 80ms snappy + 500ms deferred) demonstrating the prop's effect on cluster vs. nested cadence |

`src/components/custom/hover-popover/index.ts` — unchanged. The barrel
re-exports the SFC default; renaming a prop on the SFC does not change
the barrel API surface.

## Demo cell added

**File**: `demo/stories/primitives/hover-popover.vue` (lines added at
the end of the template, after the existing "align variants" section).

**Demonstrates**:
- A baseline cell using the default 250ms (no explicit
  `:hover-open-delay` binding).
- A "snappy" cell at `:hover-open-delay="80"` — supports cluster-tier
  hover affordances where the user is already in interaction mode.
- A "deferred" cell at `:hover-open-delay="500"` — suits deeper-nested
  popovers where the longer wait avoids accidental fire on pointer
  transit.

Caption explicitly cites `hoverOpenDelay` so the storybook surfaces
the rename to consumers visually.

## Verification

```
$ rg "openDelay" src/ demo/
(0 hits)

$ rg "hoverOpenDelay|hover-open-delay" src/ demo/
(7 hits — 3 SFC, 4 demo story)

$ npm run typecheck
> @mkbabb/glass-ui@0.9.2 typecheck
> vue-tsc --noEmit
EXIT=0
```

`npm run typecheck` returns clean (exit 0). No new type errors.

## DESIGN.md note

**Deferred to W4 Lane A doc cohort.** Per W1 REVISION 2026-05-08
file-bounds clause, this wave does not touch DESIGN.md, CLAUDE.md, or
README.md. The W4.A doc cohort absorbs the `hoverOpenDelay` rename
into the doc surface alongside the 11 V-tranche primitives + 23
v0.9.0 composables + 5 chassis demo primitives doc-drift catch-up.

## Hardened agent git clause confirmation

No mutating git subcommand was run. Read-only git used:
`git -C /Users/mkbabb/Programming/glass-ui status` (working-tree state
inspection only). No `add`, `commit`, `stash`, `checkout`, `reset`,
`restore`, or `push` issued. Orchestrator owns the wave-close commit.
