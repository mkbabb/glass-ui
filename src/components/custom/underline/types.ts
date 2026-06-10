// GlassUnderline public types (AY.W-UNDERLINE).

import type { TimingFunction } from "@mkbabb/keyframes.js";

/** Which clock drives the draw. */
export type GlassUnderlineClock = "load" | "scroll" | "static";

/**
 * The render variant. `pen` is the only PROVEN, filter-free render (the masthead
 * invariant). pencil | crayon | boil are UNPROVEN headroom — the API seam for a
 * future wave, NOT shipped (they render pen today).
 */
export type GlassUnderlineVariant = "pen" | "pencil" | "crayon" | "boil";

/**
 * The geometry escape tuple (DEC-7). Carries the FULL geometry so an escaped path
 * stays dash-coherent — a bare `d`-string escape silently breaks the dash model when
 * the consumer geometry's viewBox/length differ from the canonical
 * (`0 0 100 10` + `len` 120).
 */
export interface GlassUnderlinePaths {
    /** The primary pen stroke `d`. */
    readonly stroke: string;
    /** The faint ghost overdraw `d`. Omit for a single-path (no overdraw) render. */
    readonly ghost?: string;
    /** The SVG viewBox. Default `0 0 100 10`. */
    readonly viewBox?: string;
    /** The dasharray length (the over-long fixed dash). Default `120`. */
    readonly len?: number;
}

/** GlassUnderline props (the public prop surface). */
export interface GlassUnderlineProps {
    /** Which clock drives the draw. Default `load`. */
    clock?: GlassUnderlineClock;
    /** The render variant. Default `pen` (the only proven render). */
    variant?: GlassUnderlineVariant;
    /** The stroke colour. Default `var(--primary)` (re-resolves under `.dark`). */
    color?: string;
    /** The load-clock draw duration (ms). Default `700`. */
    drawMs?: number;
    /** The load-clock easing (value.js `TimingFunction`). Default `easeOutCubic`. */
    easing?: TimingFunction;
    /** The scroll-clock timeline name. Default the element's own `view()`. */
    timeline?: string;
    /**
     * The declarative third clock — a thin overlay ON the load clock. `undefined`
     * (default) = source parity (parent fires `play()`); rising edge → play, falling
     * edge → reset-to-undrawn (re-rise REPLAYS), mount-`true` → plays. Only
     * meaningful with `clock="load"`.
     */
    active?: boolean;
    /** The geometry escape tuple. Defaults to the canonical pen + ghost. */
    paths?: GlassUnderlinePaths;
}

/** The imperative handle exposed via `defineExpose` / a template ref. */
export interface GlassUnderlineExpose {
    /** Draw the load-clock underline once (the awaitable a Sequence chains). */
    play: () => Promise<void>;
    /** Snap to terminal (drawn) — the PRM / interrupt path. */
    snap: () => void;
}
