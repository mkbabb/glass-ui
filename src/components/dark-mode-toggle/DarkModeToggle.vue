<script setup lang="ts">
import { computed, ref, useAttrs, watchEffect } from "vue";
import { useGlobalDark } from "../../composables/dark";
import { useLiquidPress } from "../../composables/motion/spring/useLiquidPress";
import { cn } from "../_shared/class-names";

defineOptions({ inheritAttrs: false });

export type DarkModeToggleSize = "sm" | "md" | "lg" | "control" | "dock";

export interface DarkModeToggleProps {
    size?: DarkModeToggleSize;
    /** Suppress incidental page transitions during the theme flip. */
    disableTransitions?: boolean;
}

const props = withDefaults(defineProps<DarkModeToggleProps>(), {
    size: "md",
    disableTransitions: false,
});
const attrs = useAttrs();
const button = ref<HTMLElement | null>(null);
const press = useLiquidPress({ el: button, squish: false });
const { isDark, toggleDark, setDisableTransitions } = useGlobalDark();

const forwardedAttrs = computed(() => {
    const { class: _class, type: _type, ...rest } = attrs;
    return {
        "aria-label": isDark.value ? "Switch to light mode" : "Switch to dark mode",
        "aria-pressed": isDark.value,
        ...rest,
    };
});

watchEffect(() => setDisableTransitions(props.disableTransitions));
</script>

<template>
    <button
        ref="button"
        type="button"
        :class="cn('dark-mode-toggle-button', attrs.class as string | undefined)"
        :data-size="props.size"
        :data-press-armed="press.armed.value ? '' : undefined"
        :style="press.pressStyle.value"
        v-bind="{ ...forwardedAttrs, ...press.handlers }"
        @click="toggleDark"
    >
        <svg viewBox="0 0 472.39 472.39" aria-hidden="true">
            <g class="toggle-sun" data-allow-motion>
                <path
                    d="M403.21,167V69.18H305.38L236.2,0,167,69.18H69.18V167L0,236.2l69.18,69.18v97.83H167l69.18,69.18,69.18-69.18h97.83V305.38l69.18-69.18Zm-167,198.17a129,129,0,1,1,129-129A129,129,0,0,1,236.2,365.19Z"
                />
            </g>
            <g class="toggle-circle" data-allow-motion>
                <circle cx="236.2" cy="236.2" r="90" />
            </g>
        </svg>
    </button>
</template>
