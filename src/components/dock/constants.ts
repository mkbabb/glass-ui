// Shared Dock constants. Composables and DI contexts import their motion values
// and labels from this single owner.

import { springPreset } from "../../composables/motion/spring/springPresets";

/**
 * The ONE dock-morph spring authority — the iOS-26 interruptible-physics tuning the
 * dock morph orchestrator and controlled face crossfade both read. Co-located here so
 * the `response`/`damping` pair is defined once.
 */
export const DOCK_SPRING = {
    response: springPreset("dock").response,
    dampingFraction: springPreset("dock").dampingFraction,
} as const;

/**
 * The OPEN-DISMISSABLE-LAYER probe for the dock's Escape guard (`GlassDock.vue`).
 *
 * `[data-dismissable-layer]` is reka's own marker, stamped by `DismissableLayer` — the
 * single primitive that owns Escape→dismiss. It is therefore EXACTLY the set of hosted
 * layers entitled to eat an Escape (Dialog/Sheet/Popover/Menu/Select/Combobox/
 * HoverCard/NavigationMenu/Tooltip content), and it excludes the disclosure primitives
 * that merely stamp `data-state="open"` (Accordion, Collapsible) — those handle no
 * Escape, so they must NOT swallow the dock's collapse.
 *
 * `:not([data-state="closed"])` is the OPEN half: a non-`forceMount` layer only exists
 * while open, and a `forceMount` one stays mounted with `data-state="closed"`. Written
 * as a negation, not `[data-state="open"]`, because the marker element is not
 * guaranteed to carry a state attribute at all (e.g. `ToastViewport`).
 *
 * ONE attribute pair beats an enumerated content-class list: reka owns the marker, so
 * a new dismissable primitive is covered without touching this constant.
 */
export const OPEN_DISMISSABLE_LAYER_SELECTOR =
    '[data-dismissable-layer]:not([data-state="closed"])';

/** `Symbol()` label for the `DockContext` injection key (`dockContext.ts`). */
export const DOCK_CONTEXT_LABEL = "glass-ui:dock-context";

/** `Symbol()` label for the `DockCrossfadeContext` injection key (`dockCrossfadeContext.ts`). */
export const DOCK_LAYER_GROUP_LABEL = "glass-ui:dock-layer-group";

/** Intent dwell before a collapsed→hover expand commits. A chasing leave inside
 * this window cancels the expansion. */
export const HOVER_INTENT_MS = 60;

/** A touch or pen press held this long on a collapsed dock's persistent seat expands
 * the dock instead of pressing the seat (the coarse pointer has no hover). */
export const DOCK_LONG_PRESS_MS = 500;

/** Travel, in px, past which a held press is a drag and never a long press. */
export const DOCK_LONG_PRESS_SLOP_PX = 10;

/**
 * The one idle window before an unheld, unhovered dock auto-collapses: six seconds
 * after the pointer and focus leave it, or after mount for a dock mounted open. Long
 * enough that a reader who steps away to the page and comes back finds the dock still
 * open. `useDockState` is its one reader.
 */
export const DOCK_COLLAPSE_DELAY_MS = 6000;

/* Morph-settle window for the click-integrity guard
 * (`useDockClickIntegrity`). After the dock flips collapsed→expanded (a tap or a
 * hover-approach click that initiated the expand), the layer swap shifts every
 * control's coordinates as the box morphs. A click that arrives within this window
 * AND lands on a DIFFERENT element than the one under the pointer at pointerdown is
 * the post-swap-coordinate hit (a Home link under a gear tap, Next under a gear
 * click) — it is swallowed. The window is the `--spring-dock` settle ENVELOPE; it is
 * a floor backstop only — the live `[data-morphing]` attribute is the primary
 * settle signal, this caps the window so a never-settling morph can't trap clicks
 * forever. */
export const MORPH_SETTLE_MS = 840;

/**
 * THE DECLARED SEAT MARKER (atlas G-4, arm b-ii; INBOUND O-102d). The dock run roves a
 * direct child only when it carries this attribute, and claims `role="toolbar"` only
 * when it has one and every direct child carries it, glass's `<DockSeparator>` and
 * reka's form `<select aria-hidden="true" tabindex="-1">` (beside a named `Select`'s
 * trigger) aside. Glass's seat primitives, `<DockControl>` and `<DockTrigger>`, set it;
 * a consumer's own seat sets it by hand. Nothing is inferred from focusability: an
 * undeclared child keeps its natural tab stop and its own keys.
 */
export const DOCK_SEAT_ATTR = "data-glass-dock-seat";
