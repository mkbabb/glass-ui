<template>
    <!-- Normal mode: render inline -->
    <div v-if="!isFullscreen" class="relative" v-bind="$attrs">
        <button
            class="absolute z-10 rounded-lg bg-card/70 backdrop-blur-sm p-1.5 text-muted-foreground hover:text-foreground transition-colors shadow-sm border border-border/40"
            :class="buttonPosition === 'left' ? 'left-2 top-2' : 'right-2 top-2'"
            title="Fullscreen"
            @click="isFullscreen = true"
        >
            <Maximize2 class="h-4 w-4" />
        </button>
        <slot :fullscreen="false" />
    </div>

    <!-- Fullscreen mode: teleport to body -->
    <Teleport to="body">
        <div
            v-if="isFullscreen"
            class="fixed inset-0 z-[var(--z-modal)] flex flex-col bg-background"
        >
            <button
                class="absolute z-10 rounded-lg bg-card/70 backdrop-blur-sm p-2 text-muted-foreground hover:text-foreground transition-colors shadow-sm border border-border/40"
                :class="buttonPosition === 'left' ? 'left-3 top-3' : 'right-3 top-3'"
                title="Exit fullscreen"
                @click="isFullscreen = false"
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
import { ref, watch, onUnmounted, defineOptions } from "vue";

defineOptions({ inheritAttrs: false });
import { Maximize2, Minimize2 } from "lucide-vue-next";

withDefaults(defineProps<{
    buttonPosition?: "left" | "right";
}>(), {
    buttonPosition: "right",
});

const isFullscreen = ref(false);

watch(isFullscreen, (fs) => {
    document.body.style.overflow = fs ? "hidden" : "";
});

function onKeydown(e: KeyboardEvent) {
    if (e.key === "Escape" && isFullscreen.value) {
        isFullscreen.value = false;
    }
}
document.addEventListener("keydown", onKeydown);
onUnmounted(() => {
    document.removeEventListener("keydown", onKeydown);
    document.body.style.overflow = "";
});
</script>
