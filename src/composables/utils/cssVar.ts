/**
 * Read a CSS custom property at runtime.
 *
 * For WAAPI consumers that need literal values (not `var()` strings) —
 * `Element.animate()` keyframe arrays cannot dereference custom properties,
 * so consumers reading `--scale-press` etc. for spring-driven press
 * animations need the resolved literal up front.
 *
 * Reads from `document.documentElement` by default; pass an element to read
 * the resolved value at a specific cascade depth (e.g. for tokens overridden
 * inside `.dark` or a scoped theme container).
 *
 * @param name CSS custom property name (e.g. `--scale-press`).
 * @param root element to resolve against. Defaults to `<html>`.
 * @returns the trimmed property value, or an empty string if unset.
 *
 * @example
 * const press = cssVar("--scale-press"); // "0.95"
 * el.animate([{ transform: `scale(${press})` }, { transform: "scale(1)" }], 200);
 */
export function cssVar(name: string, root?: HTMLElement | null): string {
    const el = root ?? document.documentElement;
    return getComputedStyle(el).getPropertyValue(name).trim();
}
