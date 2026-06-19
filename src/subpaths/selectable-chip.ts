// @mkbabb/glass-ui/selectable-chip — the BC.W-ACCENT-TONE tonal-accent chip face.
//
// The value.js-BEARING leaf of the chip family: <SelectableChip> statically imports
// `useAccentTone` (the contrast-safe-ink composable, which reaches value.js
// `safeAccentColor`/`computeSafeAccent`), so its chunk transitively reaches value.js
// — it ships as its OWN subpath leaf and is NOT on the value.js-FREE root barrel (the
// SCC-trap discipline; the /border-progress + /easing precedent — a value.js-bearing
// component carves OFF the value.js-free root). A consumer that wants the tonal chip
// imports here.
export * from "../components/custom/selectable-chip";
