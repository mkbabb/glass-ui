// `resolveCanvasColor`: the shared `light-dark()` → `rgb()` probe-span
// resolver for a Canvas2D `strokeStyle`/`fillStyle` write.
//
// THE DEFECT IT SOLVES. Canvas2D's `ctx.strokeStyle`/`ctx.fillStyle` setters
// SILENTLY REJECT a CSS color they cannot parse on the spot — a `light-dark()`,
// a `color-mix()`, a `var(--token)` chain. The setter does not throw; it keeps
// the channel's PRIOR value (black/transparent at init), so a constellation /
// field that reads `getComputedStyle(host).getPropertyValue("--foreground")`
// and hands the raw token straight to `strokeStyle` paints BLACK, not the
// resolved hue. The defect is invisible in light mode against a dark token and
// only surfaces as "the canvas went black" under a `light-dark()` flip.
//
// THE FIX. Resolve the token to a CONCRETE `rgb()`/`rgba()` string BEFORE the
// `ctx` write, by forcing the browser to evaluate the `var()`/`light-dark()`/
// `color-mix()` chain against the live cascade. We paint the candidate color
// onto a TRANSIENT, visually-inert probe element appended INTO the cascade at
// `el` (so it inherits `el`'s `color-scheme` — the axis `light-dark()` keys off
// — and every `--token` cascade), read `getComputedStyle(probe).color` (the
// browser-resolved concrete color), then remove the probe. The probe is its own
// throwaway node — we never mutate `el`'s own inline style.
//
// Single-source: the library's ONE answer to the `light-dark()`-into-Canvas2D
// class the constellation (constellationField), a consumer constellation,
// and FourierField (its bespoke per-consumer probe) each hit. A token READER —
// it injects no style onto a live element, it resolves a value for the
// consumer's own `ctx` write (the slice-28 token-first / no-`el.style`-color
// boundary).
//
// SSR / feature degradation is befitting-silent (per §0): no `document` /
// `window` → return the input unchanged (the documented fallback), NOT a
// library-internal throw.

/**
 * Resolve a CSS custom property or color value to a Canvas2D-VALID
 * `rgb()`/`rgba()` string.
 *
 * @param cssVar a `--custom-property` NAME (resolved as `var(<name>)`) OR a full
 *   CSS color value (`light-dark(...)`, `color-mix(...)`, `var(...)`, `oklch()`,
 *   `hsl()`, hex, a named color). A bare `--token` is wrapped as `var(--token)`.
 * @param el an element ON the cascade — the canvas host or any descendant. The
 *   probe is appended here so it inherits `el`'s `color-scheme` + `--token`
 *   cascade; the resolved color reflects the live theme at `el`.
 * @returns the browser-resolved `rgb()`/`rgba()` string, ready to hand straight
 *   to `ctx.strokeStyle`/`ctx.fillStyle`. On SSR / no-DOM, returns the input
 *   `cssVar` unchanged (the befitting-silent fallback).
 *
 * @example
 * // A `light-dark()` `--foreground` token that Canvas2D would reject raw:
 * ctx.strokeStyle = resolveCanvasColor("--foreground", canvas);
 * // → "rgb(28, 25, 23)" in light, "rgb(250, 250, 249)" in dark — NOT black.
 */
export function resolveCanvasColor(cssVar: string, el: HTMLElement): string {
    const value = cssVar.trim();
    // A bare custom-property name → wrap as `var(<name>)`; any other value
    // (a `light-dark()`/`color-mix()`/`var()` chain, an `oklch()`/`hsl()`/hex)
    // passes through to the probe as-is.
    const candidate = value.startsWith("--") ? `var(${value})` : value;

    // SSR / no-DOM → the befitting-silent fallback (return the input unchanged).
    if (
        typeof document === "undefined" ||
        typeof window === "undefined" ||
        !el ||
        typeof el.appendChild !== "function"
    ) {
        return cssVar;
    }

    const probe = document.createElement("span");
    // Visually + layout inert: no box, no paint, removed from a11y/hit-testing.
    // We read `color` only — never render the probe.
    const s = probe.style;
    s.position = "absolute";
    s.width = "0";
    s.height = "0";
    s.padding = "0";
    s.margin = "0";
    s.border = "0";
    s.visibility = "hidden";
    s.pointerEvents = "none";
    s.color = candidate;

    el.appendChild(probe);
    // `getComputedStyle(...).color` resolves the `var()`/`light-dark()`/
    // `color-mix()` chain to a concrete `rgb()`/`rgba()` against the live
    // cascade at `el` — the canvas-valid form.
    const resolved = window.getComputedStyle(probe).color;
    el.removeChild(probe);

    // An unresolvable candidate (a typo'd token, an unsupported function on an
    // old engine) leaves `color` at its initial — return the resolved value if
    // present, else fall back to the input so the consumer is no worse off than
    // the raw read (befitting-silent).
    return resolved || cssVar;
}
