// demo/shell/configurator/useConfiguratorOpen.ts — the shared open-state singleton
// for the gear-hosted demo Configurator (AZ.R4-SHELL).
//
// ONE source of truth for "is the gear view open": the PresetEditor binds the
// Sheet's `v-model:open` to this ref, and the SidebarDock gear control reflects
// it via `aria-expanded` (the a11y contract — the INTERACTIVE trigger carries
// aria-expanded, never the presentational dock root; see CLAUDE.md GlassDock
// aria contract). The `,` keyboard shortcut + the `glass-ui-demo:toggle-
// configurator` window event toggle the SAME ref, so every open path agrees and
// the gear's aria-expanded stays honest regardless of which path opened it.

import { ref, type Ref } from "vue";

const open = ref(false);

export function useConfiguratorOpen(): {
    open: Ref<boolean>;
    toggle: () => void;
} {
    function toggle(): void {
        open.value = !open.value;
    }
    return { open, toggle };
}
