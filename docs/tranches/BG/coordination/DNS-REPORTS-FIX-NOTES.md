# DNS-analysis relay fixes — the dock consumer-fence (BG.W-DOCK-CONSUMER-FENCE)

Two verified dns-analysis consumer-integration bugs (relay + runnable repro at
`dns-analysis/.claude/worktrees/pass-artifacts/docs/proto-archive/glassui-{relay,repro}/`,
2026-07-02) fixed on `tranche/BG`. Both are idiomatic gestalt fixes — clean break, no
shim, byte-identical library paint.

## Bug 1 — the consumer-namespace CSS leak (BUG-1-unscoped-dock-css.md)

**Defect.** The dock stylesheets shipped BARE `.dock-layer`-family selectors — e.g.
`.dock-layer:not(.is-active):not(.is-leaving) { opacity:0; visibility:hidden;
pointer-events:none }` and `.dock-layer:not(.is-active) { position:absolute; inset:0 }`.
A consumer element carrying a COINCIDENTAL `.dock-layer` / `.dock-layers` /
`.dock-layer-item-host` class (dns-analysis has a bespoke pre-glass-ui `GlassDock.vue`)
inherited the library's HIDE/reposition rules and VANISHED — no error, no warning
(3-of-5 pages had their primary Add buttons hidden).

**Fix.** Every INTERNAL `.dock-layer`-family part rule gains a dock-root ANCESTRY anchor
at ZERO specificity cost — `:where(.glass-dock, .dock-layer-group) .dock-layer{,-item-host,
-rail,-tab,-tab-indicator,-stack}` and `:where(.glass-dock, .dock-layer-group) .dock-layers`.
`:where()` is specificity `(0,0,0)`, so the library's own paint is BYTE-IDENTICAL (same
cascade weight, same source order); a bare consumer `.dock-layer` OUTSIDE a dock is simply
never matched (the descendant combinator now requires a real dock-root ancestor).

- **DOM ancestry verified** (GlassDock.vue / DockLayerGroup.vue): `.dock-layer` +
  `.dock-layers` always live under `.glass-dock`; `.dock-layer-item-host` / `.dock-layer-stack`
  / `.dock-layer-rail` / `.dock-layer-tab*` always live under `.dock-layer-group` — which can
  render STANDALONE outside a `.glass-dock` (the morph context self-orchestrates). The
  OR-anchor `:where(.glass-dock, .dock-layer-group)` covers EVERY internal use, including the
  standalone `<DockLayerGroup>`.
- **Roots stay bare.** Rules keyed on the component-identity roots themselves (`.glass-dock`,
  `.dock-layer-group`) are unchanged — a consumer colliding on the component-identity class is
  the consumer's call, out of scope (the relay's option-1 clean-break rename is the deeper
  5.0.0-major path, not this scoping fix).
- **Custom-property-only registers exempt.** `dock.css`'s `:where(.glass-dock, .dock-layer-stack,
  .dock-layer-item-host, .dock-layer-tab, …) { --dock-motion-*: … }` sets only motion tokens
  (paints NOTHING on a bare consumer element) — left as-is.

23 selectors anchored across `src/styles/dock/layers.css` (12) + `src/styles/dock/layer-group.css`
(11). Shipped bytes verified: `dist/styles/dock/layers.css:192` (hide) + `:274` (reposition)
carry the `:where(.glass-dock, .dock-layer-group)` anchor; zero bare-leftmost hide/reposition
`.dock-layer` rules remain.

### CAVEAT (recorded for the relay / orchestrator)

The anchor fixes the **coincidental `.dock-layer` OUTSIDE a dock** leak (the relay's own
regression fixture: a synthetic `div.dock-layer` with no dock ancestor stays visible+static).
A consumer that ALSO adopts glass-ui's `.glass-dock` / `.dock-layer-group` **component-ROOT**
class names on a bespoke dock (dns-analysis's own `.glass-dock`) is colliding on the
component-identity — those `.dock-layer` descendants inside their reused `.glass-dock` would
still match `:where(.glass-dock) .dock-layer`. The task scoped this out ("rules keyed on
`.glass-dock` ITSELF are fine and stay"); the full isolation for that case is the clean-break
namespace rename (relay option-1, a breaking 5.0.0 major). The dns-analysis consumer's own
resolution: migrate its bespoke dock off the reused `.glass-dock`/`.dock-layer` class names.

## Bug 2 — the synthetic global overlay dismissal (BUG-2-synthetic-pointerdown…md)

**Defect.** `useDockState.dismissOpenOverlays()` fired a SYNTHETIC
`document.body.dispatchEvent(new PointerEvent("pointerdown", …))` on every collapse. reka-ui's
`DismissableLayer` reads ANY document pointerdown as an OUTSIDE interaction, so the body-target
fake closed EVERY open dismissable layer — including a Dialog / Select / Popover whose TRIGGER
is a dock CHILD (repro: a Select opened inside a dock-anchored Dialog dismissed the whole
Dialog on first click).

**Decision: option (a) — DELETE the synthetic dispatch entirely (clean break, no shim).**
The two call sites justify it — the real cases are already covered WITHOUT faking a gesture:

1. **Click-away** (`collapse()` from `onPointerDownOutside`): reka's OWN `DismissableLayer`
   dismisses on the SAME real outside pointerdown. The synthetic re-dispatch was pure
   redundancy there.
2. **Timer** (`scheduleCollapse`): gated by `keepOpenCount` — a dock-anchored overlay that must
   hold its dock open takes a `keepOpen` token (the Slider `useDockHold` / DockLayerGroup seam;
   a consumer wires its overlay's `@update:open` → `keepOpen`/`release`), so the dock never
   times-out-collapses while a held overlay is open. The dock owns ITS OWN state; it never
   reaches into a third-party layer with a synthesized DOM gesture.

Verified: the demo dock overview story (`demo/stories/dock/overview.vue`) opens Select /
Dropdown / Popover from dock triggers and relies on reka's own dismiss (the overlays are not
`keepOpen`-wired); no test/gate asserted the synthetic; the `keepDockOpen`/`dockHeld`/`isHeld`
contract (Slider) is untouched. `dismissOpenOverlays` + the body dispatch are gone from
`dist/dock.js`.

## The gate — `proof:dock-consumer-fence` (born-RED → GREEN)

`scripts/proof-dock-consumer-fence.mjs`, tags `["local","ci","release"]`. Device-free SOURCE
arm + a 7-check self-test:

- **C1** — every internal `.dock-layer`-family rule (in `src/styles/dock/*.css` + `dock.css`)
  that declares a paint/layout property carries a LEFTMOST dock-root anchor
  (`:where(.glass-dock, .dock-layer-group)` / `.glass-dock …`); custom-property-only registers
  are exempt. A planted bare `.dock-layer { visibility: hidden }` REDs; an anchored form
  passes; a `.dock-layer-stack { --x: 1 }` register is exempt.
- **C2** — no synthetic global gesture: a `.dispatchEvent(new (Pointer|Mouse|Touch)Event(` in
  `src/components/custom/dock/**` REDs (grep-fence; a planted body-pointerdown bites, a clean
  `addEventListener` does not).
- **C3** — the relay REGRESSION shapes: shape 1 — a bare consumer `.dock-layer` sentinel
  outside a dock is matched by ZERO hide/reposition rule (visible+static); shape 2 —
  `dismissOpenOverlays` + the body PointerEvent dispatch are DEFINITION-ABSENT from
  `useDockState.ts`.

**Born-RED verified** against the pre-fix HEAD bytes (the gate's OWN `detectC1`/`detectC3`):
23 C1 violations, 7 shape-1 sentinel leakers, `dismissOpenOverlays` present. **GREEN** on the
fix. `proof:dock-opacity-lockstep` (a sibling reader that located the base/active rules by the
comma-pair selector) FOLLOWS the anchor — its two locators now tolerate an optional leading
`:where(...)` (reader-follows-the-carve). The full dock gate family + typecheck + build stay
green.
