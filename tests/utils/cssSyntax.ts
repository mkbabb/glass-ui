// The ONE source for the CSS-syntax primitives the hygiene gates share.
//
// `token-hygiene` and `type-hygiene` both walk PostCSS declarations and both need the
// same two things: "does this value substitute a custom property?" and "what is this
// property name, case-folded?". They carried byte-identical private copies; a divergence
// between them would silently split one invariant into two.
//
// Both spellings are deliberate, per the Φ0 round-4 ruling (CSS property names and
// function keywords are ASCII case-insensitive, custom-property identifiers are NOT):
//   - `VAR_FUNCTION` matches the `var(` keyword case-insensitively via an explicit ASCII
//     character class rather than an `i` flag, so the pattern cannot be reused somewhere
//     it would also fold the `--Custom-Prop` identifier that follows.
//   - `asciiLowerCase` folds A–Z only. `String.prototype.toLowerCase()` is locale-aware
//     (the Turkish dotless-ı case) and would mangle a property name under a tr-TR ICU
//     default; CSS folding is ASCII-only by spec.

/** The `var()` substitution keyword — ASCII-insensitive, identifier-preserving. */
export const VAR_FUNCTION = /[vV][aA][rR]\(/;

/** ASCII-only case fold, for CSS property names and function keywords. */
export const asciiLowerCase = (value: string): string =>
    value.replace(/[A-Z]/g, (character) => character.toLowerCase());
