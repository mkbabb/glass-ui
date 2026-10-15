// authored/relays.mjs — AUTHORED input to derive/edits.mjs (step B-S9, LAW §5, B11 and B12).
//
// B12: only a door re-exports, and no module keeps a declaration mirror.
//   - paint-arm.mjs relays four colour-math names from reflect-capture-verify.mjs; no reader
//     takes any of them through paint-arm (F-1: its 8 readers import statsFromResolvedBg,
//     paintBand and bandForTier), so the two relay statements leave and the import it uses
//     itself stays.
//   - tokens/tokens.ts re-exports the manifest; the tokens door (the ./tokens entry source)
//     re-exports it instead, so the published names are unchanged.
//   - scripts/lib/minify-css.d.mts mirrors minify-css.mjs for its one typed reader,
//     vite.style-fold.ts (in the main program). The module becomes TypeScript (S10 moves it,
//     S11 types it and deletes the mirror), so it declares its own types once.
// B11: an internal door publishes only names read from outside its module. The overlay door
//   carries 8 type names and the context door 2 that nothing outside reads; they leave the
//   doors and stay exported from their files.

export const why = "B12: the paint-arm and tokens relays leave; B11: ten internal-door names nothing outside reads leave their doors";

export const edits = [
    {
        file: "scripts/lib/paint-arm.mjs",
        why: "B12: no reader takes oklabFromRgb through paint-arm",
        from: `import { oklabFromRgb } from "./reflect-capture-verify.mjs";\n\nexport { oklabFromRgb } from "./reflect-capture-verify.mjs";\n`,
        to: `import { oklabFromRgb } from "./reflect-capture-verify.mjs";\n`,
    },
    {
        file: "scripts/lib/paint-arm.mjs",
        why: "B12: no reader takes the hue helpers through paint-arm; they are read from their home",
        from: "// + hue-family classifier live in the ONE colour-math home (reflect-capture-verify.mjs —\n// no import cycle); paint-arm RE-EXPORTS them so the probe surface is one place, and adds\n// warmIdentityVerdict (the widened-predicate band, the twin of paintBand) below.\nexport {\n    hueFamily,\n    dominantHue,\n    pngRegionHueHistogram,\n} from \"./reflect-capture-verify.mjs\";\n",
        to: "// + hue-family classifier live in the ONE colour-math home (reflect-capture-verify.mjs —\n// no import cycle), and are read from there; paint-arm adds warmIdentityVerdict (the\n// widened-predicate band, the twin of paintBand) below.\n",
    },
    {
        file: "src/styles/tokens/tokens.ts",
        why: "B12: the relay leaves the leaf",
        from: `\nexport * from "./manifest";\n`,
        to: "",
    },
    {
        file: "src/styles/tokens/index.ts",
        why: "B12: the door publishes the manifest beside the projection",
        from: `export * from "./tokens";\n`,
        to: `export * from "./tokens";\nexport * from "./manifest";\n`,
    },
    {
        file: "src/components/_shared/overlay/index.ts",
        why: "B11: OverlayAttrs and OverlayRole have no reader outside overlay",
        from: `export { overlayContentAttrs, type OverlayAttrs, type OverlayRole } from "./content";`,
        to: `export { overlayContentAttrs } from "./content";`,
    },
    {
        file: "src/components/_shared/overlay/index.ts",
        why: "B11: four participation types have no reader outside overlay",
        from: `export {
    useDockParticipation,
    useHoldToken,
    type DockParticipation,
    type DockPortalAttrs,
    type HoldTarget,
    type HoldToken,
} from "./participation";`,
        to: `export { useDockParticipation, useHoldToken } from "./participation";`,
    },
    {
        file: "src/components/_shared/overlay/index.ts",
        why: "B11: FloatingAlign and FloatingSide have no reader outside overlay",
        from: `export type {
    FloatingAlign,
    FloatingPlacementProps,
    FloatingSide,
} from "./placement";`,
        to: `export type { FloatingPlacementProps } from "./placement";`,
    },
    {
        file: "src/composables/context/index.ts",
        why: "B11: the two context types have no reader outside context",
        from: `export {
    createStrictContext,
    createOptionalContext,
    type StrictContext,
    type OptionalContext,
} from "./createContext";`,
        to: `export { createStrictContext, createOptionalContext } from "./createContext";`,
    },
];
