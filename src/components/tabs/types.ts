// The SegmentedTabs public types. They live beside the SFC, not in it, because the
// SFC is generic (`generic="T extends string = string"`) and a generic
// `<script setup>` cannot export types. The option value type parameter defaults
// to `string`, so a plain-string callsite types exactly as a literal-union one
// infers its own `T` from `options` and the model.
import type { HTMLAttributes } from "vue";

import type { Motion } from "../_shared/axes";
import type { TabActivation } from "./composables/useTabRovingFocus";

/** The canonical tab/option shape — one descriptor across both materials. */
export interface SegmentedTabOption<V extends string = string> {
    label: string;
    value: V;
    icon?: string;
    disabled?: boolean;
    /**
     * The `id` of the tabpanel this option reveals. When set and semantics resolve to
     * `tabs`, it is emitted as the tab's `aria-controls`, completing the APG
     * tablist↔tabpanel linkage for consumers that own a panel. Ignored in `toggle`
     * semantics (a toggle group mutates a shared surface, not a distinct panel).
     */
    controls?: string;
}

/** The two materials: `pill` is the default glass eyeglass; `underline` is the paper ink hairline. */
export type SegmentedTabsVariant = "pill" | "underline";

/** The interaction semantic, independent of material. `toggle` exposes a
 *  group of pressed buttons; `tabs` exposes a tablist with selected tabs. */
export type SegmentedTabsSemantics = "toggle" | "tabs";

/** Whether focus movement also selects. Manual activation waits for Enter/Space. */
export type SegmentedTabsActivation = TabActivation;

/** The orientation axis — `horizontal` (default) lays children in a row + tracks
 *  the indicator on the inline axis; `vertical` stacks a column + tracks the
 *  block axis (the vertical underline is the leading-edge ink rail). */
export type SegmentedTabsOrientation = "horizontal" | "vertical";

export interface SegmentedTabsResponsive<V extends string = string> {
    /**
     * CSS length consumed inside `(min-width: <breakpoint>)`. BELOW it the
     * strip collapses to a `<Select>`; at/above it renders the tab strip.
     * Defaults to `"640px"` (Tailwind `sm:`).
     */
    breakpoint?: string;
    /**
     * Optional subset shown in the desktop strip (the mobile Select keeps the
     * full option list). Falls back to `options`.
     */
    desktopOptions?: SegmentedTabOption<V>[] | null;
    /** Accessible name for the mobile `<SelectTrigger>`. */
    ariaLabel?: string;
    /** Class merged onto the mobile `<SelectTrigger>` only. */
    triggerClass?: HTMLAttributes["class"];
}

export interface SegmentedTabsProps<V extends string = string> {
    options: SegmentedTabOption<V>[];
    /** Accessible name shared by the desktop strip and responsive Select. */
    ariaLabel?: string;
    /**
     * The material — `pill` (DEFAULT, the glass eyeglass) or `underline` (the paper
     * ink-hairline rule). TWO, and the eyeglass is not a third: it is what `pill`
     * IS. A "million variants that are essentially the same thing" is the failure
     * mode this axis exists to refuse.
     */
    variant?: SegmentedTabsVariant;
    /**
     * Interaction semantics, independent of `variant`. When omitted, preserves the
     * historical mapping: `pill` → `toggle`, `underline` → `tabs`.
     */
    semantics?: SegmentedTabsSemantics;
    /** Selection follows focus by default; manual mode activates with Enter/Space. */
    activation?: SegmentedTabsActivation;
    /**
     * Orientation — `horizontal` (default) or `vertical`. Axis-derived on the
     * one indicator engine.
     */
    orientation?: SegmentedTabsOrientation;
    /**
     * Responsive collapse — below the breakpoint the strip becomes a `<Select>`.
     * `true` uses defaults; an object tunes the breakpoint, desktop subset, and
     * accessible name.
     */
    responsive?: boolean | SegmentedTabsResponsive<V>;
    /**
     * Motion weight. `full` (default) lets the pill indicator follow a pointer,
     * squash with drag velocity, and settle to the nearest tab. Drag supplements the
     * fully operable click and keyboard path; it is never the sole selection method.
     * `reduced` and `off` use the click-only strip while preserving roving focus.
     * Underline has no deformable indicator. Reduced-motion preference forces
     * `full → reduced`.
     */
    motion?: Motion;
    class?: HTMLAttributes["class"];
}
