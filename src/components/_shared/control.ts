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

/* [2026-08-25 · BK #42 W-SEARCH] ~~`controlSizeClasses` + `controlSizeClass(size)`~~ —
 * DELETED, and the deletion was not this unit's idea: `G-OVERFIT`'s EXPORT-REACH arm
 * REDded the moment `SearchBar.vue` went, naming the function as "referenced nowhere
 * outside its own module AND ships on no published subpath". `SearchBar` was its ONLY
 * call site in the entire tree — measured, not assumed — so it went from one caller to
 * zero in a single act. CWT-2 §SEARCH had already listed it for deletion ("the
 * `controlSizeClass` re-export (F11)", the ROUND-1 shim), which is the same finding
 * reached from the other end.
 *
 * NOTHING IS LOST, AND THIS IS THE PART WORTH READING. The function emitted two
 * arbitrary-property utilities, `[--control-pill-h:…]` and `[--control-pill-text:…]`.
 * Those CSS SEAMS are untouched and still live: `.input-bar`
 * (`styles/utilities/components.css:33,60`) and `.control-pill`
 * (`glass/control-surfaces.css:28,56`) both read them WITH FALLBACKS, so a consumer
 * that wants a size rung sets the property and gets it. What died is a Tailwind-class
 * string-builder wrapping a two-line lookup — a `md` rung that emitted the empty
 * string, which is the tell: a "size axis" whose default value is no bytes at all was
 * a lookup table pretending to be an API. */

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
