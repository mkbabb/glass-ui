# BI.W-P114 — HeaderRibbon persistent command band

**Status:** RE-SPECIFIED (persistent-only) — source, types, focused suite, typecheck, build, and
strict declaration close are green; the left/right wide/narrow native matrix and two fresh
independent challenges remain owed before terminal.
**Owner:** glass-ui

## Product ruling

Retain `HeaderRibbon` as one persistent corner command band, exported from
`@mkbabb/glass-ui/header-ribbon`. It wraps a caller's `#items` in a quiet functional-glass
`Surface` pinned to a viewport corner. No disclosure mode, anchor button, reveal/pin gesture,
timeout lifecycle, or second layout wrapper survives.

## Amendment rationale (collapsible cut)

The wave originally shipped a discriminated `persistent | collapsible` contract. The pass-2
gestalt challenge (`addenda/reports/challenges/P114-f2-gestalt.md`) faulted this as
**FIT-PARTIAL**: the `persistent` boundary is consumed and principled; the `collapsible` half was
speculative surface. The harden sweep and consumer census confirm the cut:

- **Zero real consumers of `collapsible`** anywhere in the constellation (keyframes.js, value.js,
  atlas, sci-report, slides, speedtest, muster, words swept). The one real consumer, keyframes
  `demo/components/instrument/shell/EditorShell.vue:16`, uses `mode="persistent" placement="right"`
  with `#items` only — and its `defineExpose({ headerRibbonRef })` is a dead ref-forward (never
  read; the component never exposed an instance API). The entire disclosure/pin/hover-reveal/
  Escape/focus-presence machinery was exercised only by this component's own demo story.
- **Half-duplicated the disclosure family**: it hand-rolled `aria-controls`/`aria-expanded`
  wiring instead of `src/components/_shared/disclosure-context.ts`.
- **Dead knobs and magic literals**: `--header-ribbon-actions-width` had no setter anywhere; the
  30rem-actions vs 32rem-band split was two uncoordinated literals.

Per the session ruling (cuts and keeps adjudicated on merit through the twice-critique; consumer
dependence alone preserves nothing; no legacy, no dual paths; transposition for simplicity is
desirable), `collapsible` is cut. The persistent-only flatten preserves the deeper intent of the
value.js V-A90–V-A92 line (the broken VNode/DOM inference stays dead — there is no mode left to
infer) while removing the unconsumed surface.

**Cross-repo:** the cut supersedes-in-part value.js's V-A92 opt-in-collapsible prescription. The
coordination mark is recorded at
`~/Programming/value.js/docs/tranches/V/GLASS-INBOUND-2026-07-16-headerribbon-persistent-only.md`
(value.js updates V-A92/V-A128, FINAL.md:40, DECISIONS D2/D41, PROMPT-RECAP:225, and the W17
`headerRibbonMode` manifest expectation to persistent-only at its own boundary). Value 4.0.0 stays
immutable; nothing here reopens a producer.

## Landed contract

- Public props are one flat interface: `placement?: "left" | "right"` (default `"left"`),
  `ariaLabel?: string`, and `class`. No `mode`, no `anchorLabel`.
- One public slot, `items`. The ribbon renders it inside a `role="toolbar"` host that is expanded
  and operable from first paint. There is no `anchor` slot and no ribbon-owned button.
- Semantic state: `data-placement` on the named `role="toolbar"` owner. `data-expanded`/
  `data-pinned` are gone with the reveal machinery.
- Placement reverses presentation only. DOM and action order remain stable; RTL flows the action
  row while the band keeps its physical corner.
- One colocated stylesheet consumes the shared functional glass `Surface`, `--z-header`, the
  `--radius-pill`/`--panel-padding`/`--size-icon-btn` tokens, coarse-pointer geometry, the
  forced-colors boundary, and the RTL row direction.

## Clean breaks

- `mode`, `anchorLabel`, the `anchor` slot, `HeaderRibbonMode`, and `HeaderRibbonAnchorSlotProps`
  are removed. `collapsible` never shipped in a published release; no alias or dual path remains.
- `position` remains the already-ruled 5.0 rename to `placement`; no alias is restored.
- `hideTimeoutMs` remains removed. The duplicate anchor-slot `toggled` state and the unused `left`
  slot remain removed.

## Consumer handoff

Keyframes `EditorShell.vue` keeps the `/header-ribbon` subpath and the `items` slot with
`placement="right"` and no `mode` — zero behavior change. Its dead `headerRibbonRef` forward can
be dropped at keyframes' own boundary (it never consumed an instance API).

## Verification

Focused component contracts cover toolbar semantics, the flat prop shape (mode/anchorLabel
removed at type level), placement, one action owner, first-render operability, attribute
forwarding, blank-aria-label naming, and persistent SSR. Source/demo typechecks, iterative build,
and the strict package verifier are the release-boundary checks. Native browser review is required
when the in-app browser backend is available.

## Outstanding at handoff

- Green on the persistent-only re-spec: focused suite (shrunk from 23 to 6 cases), typecheck,
  `npm run build`, `npm run verify:package`.
- Owed before terminal: the left/right, wide/narrow native browser matrix (first paint, forced
  colors, coarse pointer, RTL) and two fresh independent post-edit challenge passes.
- `docs/consumer-evidence/header-ribbon.md` records the keyframes persistent census and the
  collapsible cut, closing the previously-dangling `MIGRATION.md` citation.
