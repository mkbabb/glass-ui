/* The shared CONTROL contract — the size axis the pills ride and the state axis the
 * binary triad rides. Renamed from `control-size.ts` at BK #83 W-CONTROL-BIT (C-6):
 * the module now holds more than the size union, and a module name that describes
 * half its contents is a name that has to be re-read to be believed.
 *
 * OWNERSHIP: #83 owns this file; #82 (W-FIELD) and #84 (W-TOGGLE-ROW) consume it.
 * A consumer takes `ControlProps` from here, never from `.control-bit` — the
 * register is CSS and the contract is types; conflating them is how a toggle row
 * ends up inheriting a checkbox's paint. */

export type ControlSize = "sm" | "md" | "lg";

const controlSizeClasses: Record<ControlSize, string> = {
    sm: "[--control-pill-h:var(--control-h-sm)] [--control-pill-text:var(--control-text-sm)]",
    md: "",
    lg: "[--control-pill-h:var(--control-h-lg)]",
};

export const controlSizeClass = (size: ControlSize = "md") =>
    controlSizeClasses[size];

/** The state axis every binary control exposes. */
export interface ControlProps {
    invalid?: boolean;
    disabled?: boolean;
}

/* ONE invalid grammar, minted once and stamped by every member (K26). The triad
 * shipped FOUR grammars — and the checkbox's was UNREACHABLE through its own typed
 * surface, keying `[aria-invalid="true"]` while exposing no `invalid` prop, so
 * nothing in the library or the demo ever set it. `|| undefined` rather than the
 * boolean so a false value omits the attribute entirely: `data-invalid="false"` is
 * still a matching attribute selector, and an assistive tree reading
 * `aria-invalid="false"` is louder than silence. */
export const controlStateAttrs = (invalid?: boolean) => ({
    "data-invalid": invalid || undefined,
    "aria-invalid": invalid || undefined,
});
