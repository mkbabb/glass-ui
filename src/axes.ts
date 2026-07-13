// src/axes.ts — the `@mkbabb/glass-ui/axes` types-only subpath barrel
// (BH.W-AXIS-GRAMMAR + BI.W-AXES-GATES). The honest `/api` discovery successor: the
// SEVEN axes (Size · Orientation · Motion · Surface + the factor-band Tone ·
// Placement · Trigger) + their frozen tuples, ONE import. BI.W-SYNONYM-RENAMES:
// `Tone` is the published home the retired `ToastVariant`/`type`/`variant` tone
// synonyms fold onto (api-lockstep). GENERATED into `package.json` exports via
// `subpath-policy.mjs` (the CURATED bucket) — never hand-listed. The tuples are
// ~0.1KB of frozen const arrays (no functions, no component code); a consumer
// iterates `SIZES`/`TONES` for an axis-matrix, or types against `Size`/`Tone`.
export * from "./components/ui/_shared/axes";
