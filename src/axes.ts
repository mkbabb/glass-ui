// src/axes.ts — the `@mkbabb/glass-ui/axes` types-only subpath barrel
// (BH.W-AXIS-GRAMMAR). The honest `/api` discovery successor: the four grammar
// axes (Size · Orientation · Motion · Surface) + their frozen tuples, ONE import.
// GENERATED into `package.json` exports via `subpath-policy.mjs` (the CURATED
// bucket) — never hand-listed. The tuples are ~0.1KB of frozen const arrays (no
// functions, no component code); a consumer iterates `SIZES`/`SURFACES` for an
// axis-matrix, or types against `Size`/`Surface` directly.
export * from "./components/ui/_shared/axes";
