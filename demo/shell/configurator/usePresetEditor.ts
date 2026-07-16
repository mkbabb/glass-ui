// demo/shell/configurator/usePresetEditor.ts — thin façade.
//
// The former monolith was split into six cohesive
// sub-modules under `./preset-editor/`. This façade preserves the exact
// public surface the demo consumes (`./index.ts` barrel + `PresetEditor.vue`).
//
// Concrete homes:
//   - Types               → ./preset-editor/types.ts
//   - Defaults + tables   → ./preset-editor/defaults.ts
//   - CSS-variable writers → ./preset-editor/css-writers.ts
//   - localStorage I/O    → ./preset-editor/persistence.ts
//   - Stylesheet swap     → ./preset-editor/stylesheet-swap.ts
//   - Singleton store     → ./preset-editor/store.ts

export { DEFAULT_CONFIG, FONT_OPTIONS, usePresetEditor } from "./preset-editor/store";
export type {
    ConfigBaseline,
    ConfigDelta,
    DeltaKey,
    Density,
    FontOption,
    FontSlots,
    PresetEditor,
} from "./preset-editor/store";
