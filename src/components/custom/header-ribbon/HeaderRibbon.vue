<template>
    <div
        :class="[
            'fixed z-[var(--z-dock)] pointer-events-none w-fit flex items-center px-4 pt-4 pb-2',
            position === 'left' ? 'top-0 left-0' : 'top-0 right-0',
        ]"
        @mouseleave="onGroupMouseLeave"
    >
        <!-- Optional extra slot anchored alongside the ribbon (e.g. a logo). -->
        <div v-if="$slots.left" class="pointer-events-auto shrink-0 mr-2">
            <slot name="left" />
        </div>

        <div
            class="pointer-events-auto flex items-center h-6"
            @mouseenter="onRibbonMouseEnter"
        >
            <!-- position=right: items first (expand left), then anchor. -->
            <template v-if="position === 'right'">
                <div
                    :class="[
                        'header-items-wrapper header-items-right flex items-center gap-3',
                        isVisible ? '' : 'header-collapsed-right',
                    ]"
                >
                    <slot name="items" />
                </div>
            </template>

            <div class="shrink-0" @click="onAnchorClick">
                <slot name="anchor" :pinned="isPinned" :toggled="isToggled" />
            </div>

            <!-- position=left: anchor first, then items expand right. -->
            <template v-if="position === 'left'">
                <div
                    :class="[
                        'header-items-wrapper header-items-left flex items-center gap-3',
                        isVisible ? '' : 'header-collapsed-left',
                    ]"
                >
                    <slot name="items" />
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";
import type { HeaderRibbonProps } from "./types";

const props = withDefaults(defineProps<HeaderRibbonProps>(), {
    position: "left",
    hideTimeoutMs: 2000,
});

const isExpanded = ref(false);
const isPinned = ref(false);
const isToggled = ref(false);
// Hover-tracking guard — prevents premature collapse scheduling while the
// pointer is still inside the ribbon (the keyframes.js refinement).
const isMouseOver = ref(false);

let hoverTimeout: ReturnType<typeof setTimeout> | undefined;

const isVisible = computed(() => isExpanded.value || isPinned.value);

function clearHoverTimeout(): void {
    if (hoverTimeout != null) {
        clearTimeout(hoverTimeout);
        hoverTimeout = undefined;
    }
}

function startHideTimeout(): void {
    // Don't schedule collapse while the pointer is still over the ribbon —
    // the timeout would fire while the user is mid-interaction.
    if (isMouseOver.value) return;
    clearHoverTimeout();
    hoverTimeout = setTimeout(() => {
        isExpanded.value = false;
    }, props.hideTimeoutMs);
}

function onRibbonMouseEnter(): void {
    isMouseOver.value = true;
    clearHoverTimeout();
    isExpanded.value = true;
}

function onGroupMouseLeave(): void {
    isMouseOver.value = false;
    if (!isPinned.value) {
        startHideTimeout();
    }
}

function onAnchorClick(): void {
    if (isPinned.value) {
        isPinned.value = false;
        isToggled.value = false;
        startHideTimeout();
    } else {
        isPinned.value = true;
        isExpanded.value = true;
        isToggled.value = true;
        clearHoverTimeout();
    }
}

onBeforeUnmount(clearHoverTimeout);

defineExpose({ isPinned, isExpanded, isVisible, isToggled });
</script>

<style scoped>
/*
 * Header-ribbon collapse animation.
 *
 * `--header-max-width` is the canonical override hook — consumers set the
 * variable on the ribbon root (or any ancestor) to widen / narrow the
 * expanded-state envelope without forking the component.
 */
.header-items-wrapper {
    --header-max-width: 30rem;
    max-width: var(--header-max-width);
    opacity: 1;
    overflow: visible;
    transition:
        max-width var(--duration-slow) var(--ease-standard),
        margin var(--duration-slow) var(--ease-standard),
        opacity var(--duration-normal) var(--ease-decelerate);
}

.header-items-left {
    margin-left: 0.75rem;
}
.header-items-right {
    margin-right: 0.75rem;
}

:is(.header-collapsed-left, .header-collapsed-right) {
    max-width: 0;
    opacity: 0;
    pointer-events: none;
    overflow: hidden;
}
.header-collapsed-left {
    margin-left: 0;
}
.header-collapsed-right {
    margin-right: 0;
}
</style>
