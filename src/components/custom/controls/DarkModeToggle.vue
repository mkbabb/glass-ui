<script setup lang="ts">
import { computed, useAttrs, watchEffect } from "vue";
import { useGlobalDark } from "../../../composables/useGlobalDark";
import { cn } from "../../../utils/cn";

defineOptions({ inheritAttrs: false });

type DarkModeToggleSize = "sm" | "md" | "lg";

const props = withDefaults(
    defineProps<{
        passive?: boolean;
        /**
         * Button size. `sm` = 28px, `md` = 36px (default), `lg` = 44px.
         * Override with a Tailwind sizing class on the component
         * (e.g. `class="size-6"`) when a non-standard size is required.
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

const SIZE_CLASS: Record<DarkModeToggleSize, string> = {
    sm: "h-7 w-7 p-1",
    md: "h-9 w-9 p-1.5",
    lg: "h-11 w-11 p-2",
};

const attrs = useAttrs();

const rootClass = computed(() =>
    cn(
        "dark-mode-toggle-button",
        "relative isolate inline-flex shrink-0 items-center justify-center",
        "cursor-pointer border-0 bg-transparent",
        "rounded-[var(--radius-pill)]",
        "opacity-80 transition-[opacity,background] duration-[var(--duration-normal)] ease-[var(--ease-standard)]",
        "hover:opacity-100 hover:bg-white/10 focus:outline-none focus:opacity-100 focus:bg-white/10",
        SIZE_CLASS[props.size],
        attrs.class as string | undefined
    )
);

const forwardedAttrs = computed(() => {
    const { class: _omit, ...rest } = attrs;
    return rest;
});

const { toggleDark, setDisableTransitions } = useGlobalDark();

watchEffect(() => {
    setDisableTransitions(props.disableTransitions);
});
</script>

<template>
    <!-- Credit to Kevin Powell at https://codepen.io/kevinpowell/pen/PomqjxO -->
    <component
        :is="passive ? 'div' : 'button'"
        :class="rootClass"
        v-bind="forwardedAttrs"
        @click="!passive && toggleDark()"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 472.39 472.39"
            class="block h-full w-full fill-[hsl(var(--foreground))]"
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
