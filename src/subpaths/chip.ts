// @mkbabb/glass-ui/chip — the ONE folded chip (BI.W-CHIP-FOLD).
//
// The value.js-QUARANTINED leaf of the chip family: <Chip>'s tonal ink solve rides a
// dynamic `import('./accent-tone-solve')` boundary INSIDE `useAccentTone` (the sync
// value.js-free shell), so a plain-boolean toggle (a `var()` / unset tone) stays
// value.js-free — but a concrete `#hex`/`oklch(…)` tone loads value.js. So <Chip>
// ships as its OWN subpath leaf and is NOT on the value.js-FREE root barrel (the
// SCC-trap discipline; the /border-progress + /easing precedent — a value.js-bearing
// component carves OFF the value.js-free root). A consumer imports here.
export * from "../components/custom/chip";
