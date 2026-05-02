<script setup lang="ts">
import { computed, useAttrs, watchEffect } from "vue";
import { useGlobalDark } from "../../../composables/useGlobalDark";
import { cn } from "../../../utils/cn";

defineOptions({ inheritAttrs: false });

type DarkModeToggleSize = "sm" | "md" | "lg" | "control" | "dock";

const props = withDefaults(
    defineProps<{
        passive?: boolean;
        /**
         * Button size. `sm` = 28px, `md` = 36px (default), `lg` = 44px.
         * `control` follows generic control CSS variables; `dock` follows
         * GlassDock sizing variables.
         */
        size?: DarkModeToggleSize;
        /**
         * When true, CSS transitions on `<html>` and all descendants are
         * temporarily suppressed during dark mode toggle to prevent jank.
         * @default false
         */
        disableTransitions?: boolean;
    }>(),
    {
        passive: false,
        size: "md",
        disableTransitions: false,
    }
);

const attrs = useAttrs();

const rootClass = computed(() =>
    cn(
        "dark-mode-toggle-button",
        "relative isolate inline-flex shrink-0 items-center justify-center",
        "cursor-pointer border-0 bg-transparent",
        "rounded-[var(--radius-pill)]",
        "opacity-80",
        attrs.class as string | undefined
    )
);

const { isDark, toggleDark, setDisableTransitions } = useGlobalDark();

const forwardedAttrs = computed(() => {
    const { class: _omit, ...rest } = attrs;

    if (props.passive) {
        return rest;
    }

    return {
        type: "button",
        "aria-label": isDark.value ? "Switch to light mode" : "Switch to dark mode",
        "aria-pressed": isDark.value ? "true" : "false",
        ...rest,
    };
});

watchEffect(() => {
    setDisableTransitions(props.disableTransitions);
});
</script>

<template>
    <!-- Credit to Kevin Powell at https://codepen.io/kevinpowell/pen/PomqjxO -->
    <component
        :is="passive ? 'div' : 'button'"
        :class="rootClass"
        :data-size="props.size"
        v-bind="forwardedAttrs"
        @click="!passive && toggleDark()"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 472.39 472.39"
            class="block h-full w-full fill-[var(--foreground)]"
        >
            <g class="toggle-sun">
                <path
                    d="M403.21,167V69.18H305.38L236.2,0,167,69.18H69.18V167L0,236.2l69.18,69.18v97.83H167l69.18,69.18,69.18-69.18h97.83V305.38l69.18-69.18Zm-167,198.17a129,129,0,1,1,129-129A129,129,0,0,1,236.2,365.19Z"
                />
            </g>
            <g class="toggle-circle">
                <circle cx="236.2" cy="236.2" r="90" />
            </g>
        </svg>
    </component>
</template>

<style scoped>
.toggle-sun {
    transform-origin: center center;
    transition: transform 750ms var(--spring-bouncy);
}

.toggle-circle {
    transform: translateX(0%);
    transition: transform 500ms var(--ease-out);
}

/* Dark mode styles — use :where(.dark) so it doesn't leak to <html> */
:where(.dark) .dark-mode-toggle-button .toggle-sun {
    transform: rotate(0.5turn);
}

:where(.dark) .dark-mode-toggle-button .toggle-circle {
    transform: translateX(-15%);
}
</style>
