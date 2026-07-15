export { default as PresetEditor } from "./PresetEditor.vue";
// BA.W-CONFIG-CHASSIS.3 — PresetEditorField RETIRED (it was a byte-for-byte
// ConfiguratorRow clone; the gear now composes the library <ConfiguratorRow>).
export {
    DEFAULT_CONFIG,
    FONT_OPTIONS,
    usePresetEditor,
    type PresetEditor as PresetEditorApi,
    type ConfigBaseline,
    type ConfigDelta,
    type DeltaKey,
    type Density,
    type FontOption,
    type FontSlots,
} from "./usePresetEditor";
