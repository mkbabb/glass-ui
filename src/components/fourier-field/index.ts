export { default as FourierField } from "./FourierField.vue";
export {
    dftFromPoints,
    partialSumAt,
    positionsAt,
    makeEllipticSpectrum,
    makeHarmonicFigure,
    FOURIER_FIGURES,
    FOURIER_FIGURE_KEYS,
    type BasisComponent,
} from "./math";
export { mintSpectrum, type MintedSpectrum } from "./renderer/mint";
// `FourierSource` rides the barrel because `FourierFieldConfig.source` is published and
// spends it: without the name a consumer building a config has to write the indexed
// access `FourierFieldConfig["source"]`, which is what the studio story did.
export {
    DEFAULT_FOURIER_CONFIG,
    type FourierFieldConfig,
    type FourierSource,
} from "./constants";
