export { default as Configurator } from "./Configurator.vue";
export { default as ConfiguratorLayer } from "./ConfiguratorLayer.vue";
export { default as ConfiguratorRow } from "./ConfiguratorRow.vue";
export type {
    ConfiguratorAsideSide,
    ConfiguratorGalleryPlacement,
    ConfiguratorPreset,
    ConfiguratorScrollMode,
} from "./Configurator.vue";
export {
    CONFIGURATOR_DENSITY_KEY,
    provideConfiguratorDensity,
    useOptionalConfiguratorDensity,
    type ConfiguratorDensity,
} from "./density";
export {
    useConfiguratorState,
    type ConfiguratorCloneMode,
    type ConfiguratorState,
    type ConfiguratorStateOptions,
} from "./useConfiguratorState";
