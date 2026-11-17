<script setup lang="ts">
// Menu's stage: one menu, opened from a button or by a right press (a long press on
// touch) anywhere on the stage. The page opens the button's menu below its button
// each time the button's pane mounts, on arrival and on every return to Dropdown, and
// that open leaves focus where it is; a card mounts it closed. The right-press menu
// opens where the pointer is, so it waits for one.
import { watch } from "vue";
import { MousePointerClick } from "@lucide/vue";
import { ContextMenu, DropdownMenu, DropdownMenuTrigger } from "@glass/components/menu";
import { Button } from "@glass/components/button";
import StageSwap from "../../chassis/variants/StageSwap.vue";
import MenuItems from "./_parts/MenuItems.vue";

const props = withDefaults(
    defineProps<{ mode?: "dropdown" | "context"; openOnLoad?: boolean }>(),
    { mode: "dropdown", openOnLoad: false },
);

// The open that comes with a mount keeps focus where it is; a menu opened by a press
// or a key takes it, so the arrow keys move through the items. The flag is armed
// again each time the mode becomes Dropdown, before the pane mounts.
let arrival = props.openOnLoad;
watch(
    () => props.mode,
    (mode) => {
        if (mode === "dropdown") arrival = props.openOnLoad;
    },
);
function onOpenAutoFocus(event: Event): void {
    if (!arrival) return;
    arrival = false;
    event.preventDefault();
}
</script>

<template>
    <StageSwap :swap-key="mode" class="menu-stage">
        <div v-if="mode === 'dropdown'" class="menu-stage-centre" :data-arrival="openOnLoad || undefined">
            <DropdownMenu :default-open="openOnLoad">
                <DropdownMenuTrigger as-child>
                    <Button emphasis="primary">Options</Button>
                </DropdownMenuTrigger>
                <MenuItems @open-auto-focus="onOpenAutoFocus" />
            </DropdownMenu>
        </div>
        <ContextMenu v-else>
            <DropdownMenuTrigger as-child>
                <button
                    type="button"
                    class="menu-stage-target focus-ring transition-control"
                    aria-label="Canvas: right press for actions"
                >
                    <MousePointerClick class="size-8" aria-hidden="true" />
                </button>
            </DropdownMenuTrigger>
            <MenuItems />
        </ContextMenu>
    </StageSwap>
</template>

<style scoped>
.menu-stage {
    block-size: 100%;
}
.menu-stage :deep(.stage-swap-pane) {
    block-size: 100%;
}
.menu-stage-centre {
    display: grid;
    place-items: center;
    block-size: 100%;
    padding: var(--sp-4);
    padding-block-end: 14rem;
}
/* The page opens the menu below its button, so the button rides at the top and the
   whole open menu fits inside the stage under it. (Not `data-reserve`: the dock's
   stylesheet makes any `[data-reserve]` box let presses through, which left the
   button unpressable.) */
.menu-stage-centre[data-arrival] {
    place-items: start center;
    padding-block: var(--sp-5) 0;
}
.menu-stage-target {
    display: grid;
    place-items: center;
    inline-size: 100%;
    block-size: 100%;
    color: var(--foreground);
    background-color: transparent;
    cursor: context-menu;
    transition-property: background-color;
}
.menu-stage-target:hover {
    background-color: color-mix(in srgb, var(--foreground) 4%, transparent);
}
</style>
