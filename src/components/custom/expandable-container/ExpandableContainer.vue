<template>
    <!-- Normal mode: render inline -->
    <div v-if="!open" class="relative" v-bind="$attrs">
        <button
            class="absolute z-10 rounded-lg bg-card/70 [backdrop-filter:var(--glass-blur-subtle)] p-1.5 text-muted-foreground hover:text-foreground transition-colors shadow-sm border border-border/40"
            :class="buttonPosition === 'left' ? 'left-2 top-2' : 'right-2 top-2'"
            title="Fullscreen"
            @click="open = true"
        >
            <Maximize2 class="h-4 w-4" />
        </button>
        <slot :fullscreen="false" />
    </div>

    <!-- Fullscreen mode: teleport to body -->
    <Teleport to="body">
        <div
            v-if="open"
            class="fixed inset-0 z-modal flex flex-col bg-background"
        >
            <button
                class="absolute z-10 rounded-lg bg-card/70 [backdrop-filter:var(--glass-blur-subtle)] p-2 text-muted-foreground hover:text-foreground transition-colors shadow-sm border border-border/40"
                :class="buttonPosition === 'left' ? 'left-3 top-3' : 'right-3 top-3'"
                title="Exit fullscreen"
                @click="open = false"
            >
                <Minimize2 class="h-4 w-4" />
            </button>
            <div class="h-full w-full">
                <slot :fullscreen="true" />
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from "vue";
import { Maximize2, Minimize2 } from "lucide-vue-next";
import { registerShortcut } from "../../../composables/useKeyboardShortcuts";

defineOptions({ inheritAttrs: false });

withDefaults(
    defineProps<{
        buttonPosition?: "left" | "right";
    }>(),
    { buttonPosition: "right" },
);

/**
 * Two-way `open` model so consumers can drive fullscreen externally
 * (programmatic toggles, route-driven launches, etc.) while the corner
 * buttons continue to operate without parent wiring.
 */
const open = defineModel<boolean>("open", { default: false });

watch(open, (fs) => {
    document.body.style.overflow = fs ? "hidden" : "";
});

let unregEsc: (() => void) | null = null;

onMounted(() => {
    unregEsc = registerShortcut(
        "Escape",
        () => {
            if (open.value) open.value = false;
        },
        { label: "Exit fullscreen", group: "UI", allowInInput: true },
    );
});

onUnmounted(() => {
    unregEsc?.();
    document.body.style.overflow = "";
});
</script>
