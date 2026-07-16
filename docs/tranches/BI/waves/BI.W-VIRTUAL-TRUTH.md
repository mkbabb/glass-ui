# BI.W-VIRTUAL-TRUTH — terminal `/virtual` consumer truth

Band: B8 (prunes + consumer truth). Superseded at execution by BI.W-Q031.

## Finding

The BC un-retire relied on a false binary-consumer claim. Words owns a divergent local
implementation, while Glass production accepts only an optional target-window callback. The package
has zero external consumers and zero `src/` runtime consumers.

## Terminal design

Retire the `/virtual` package surface and keep the smallest useful implementation with its real
owners. The three-file demo facility (`index`, `useVirtualSectionWindow`, and
`virtualSectionLayout`) lives at `demo/composables/virtual/` and is consumed by exactly two stories:

- `demo/stories/data/virtual-section.vue`
- `demo/stories/dock/dock-search.vue`

`useWindowedStore` is deleted because no demo or product consumes it. The ToC story is not a virtual
window consumer: `useScrollTo` + `useLazyLoader` already own its target mounting and progressive
rendering, so a second window authority was redundant. It passes only progressively mounted
`visibleSections` to `useScrollTracker` while retaining the full hierarchy index. Observer work is
bound to the observer instance that created it: a roots change disconnects and invalidates the old
instance, waits for the DOM flush, and re-observes the mounted tree. A still-valid active descendant
survives that rebind; fallback occurs only when the active id leaves the mounted tree. Late callbacks,
disconnected targets, superseded `nextTick` work, and work after unmount are inert.

The second challenge accepts the browser's terminal geometry clamp: at maximum scroll, the final
heading can remain below the 20% active line, and no tail padding or offset/root-margin shim is added.
Within 1 CSS px of an element or document scroll maximum, `collectIds()` in reverse selects the last
connected tracked node before either IO visibility or geometric active-zone resolution. The same
terminal winner governs scroll, forced recalculation, and late IO delivery; more than 1px before the
maximum preserves the existing nearest-above/closest-below geometry.

There is no `src/composables/virtual/` directory, package export, root re-export, source forwarder,
declaration, alias, or compatibility path. The focused behavior test lives at
`tests/demo/virtual-section-layout.test.ts`; only `useDockSearch` retains an injected target-window
seam. A far-target request first incorporates pending measurements, seats the target at its current
layout coordinate, and lets the ordinary viewport + overscan range determine the only rendered set.
It records rendered ids from that range through the target. Until each recorded ref reports—including
an estimate-equal ref—measurement changes add only the target-top delta produced by pre-target rows
to the same `scrollTop`; measurements at or after the target cannot move it. Completion, replacement
by a newer target, and unmount clear the reconciliation deterministically. There is no forced-range
type, hold timer, second scroll path, content-wrapper branch, consumer-tunable extent, module cache,
cache reset, public offset/root readback, or outward recalculation.

## Acceptance and disposition

The relocated behavior test challenges two measurement batches containing before-, at-, and
after-target rows, estimate-equal ref completion, stable target placement, and deterministic release.
The sidebar lifecycle test challenges active root A/child, late root B, activation through the new
observer, and a stale callback from the disconnected observer. Its terminal counter-arm uses a 480px
scroller at max−2px, where the penultimate node wins geometrically, then exact max, where the last
connected child and its final root own active state despite a late penultimate IO callback.
Source/demo/test typecheck, library build, and demo production build remain the ordinary checks. The
390 CSS-px native source-close is
green: ToC 1→12 and the repeat converge on Section 12 with focus retained; the virtual jump holds 15
mounted rows, active 850, focus, and a 1.6875px target top unchanged at 120/770/1470ms, then ordinary
user scroll leaves 16 mounted with 850 absent. Remaining native debt is the terminal ToC re-close,
desktop equivalents, and `/dock/dock-search` keyboard selection/landing/focus at desktop and 390 CSS
px. No permanent proof, consumer-census, or file-presence gate is retained.

DOC-4 and the BC un-retire are terminally corrected. A future public facility requires new real
binary-consumer evidence and a fresh product decision; the Atlas document-native ask is not a
current package consume.
