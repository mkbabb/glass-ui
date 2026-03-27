<template>
    <!-- Credit to Kevin Powell at https://codepen.io/kevinpowell/pen/PomqjxO -->
    <component
        :is="passive ? 'div' : 'button'"
        class="dark-mode-toggle-button"
        v-bind="$attrs"
        @click="!passive && toggleDark()"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="472.39"
            height="472.39"
            viewBox="0 0 472.39 472.39"
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

<script setup lang="ts">
import { watchEffect } from "vue";
import { useGlobalDark } from "../../../composables/useGlobalDark";

const props = defineProps<{
    passive?: boolean;
    /**
     * When true, CSS transitions on `<html>` and all descendants are
     * temporarily suppressed during dark mode toggle to prevent jank.
     * @default false
     */
    disableTransitions?: boolean;
}>();

const { toggleDark, setDisableTransitions } = useGlobalDark();

watchEffect(() => {
    setDisableTransitions(props.disableTransitions ?? false);
});
</script>

<style scoped>
.dark-mode-toggle-button {
    cursor: pointer;
    border: 0;
    padding: 0;
    border-radius: 9999px;
    position: relative;
    isolation: isolate;
    background: none;
    opacity: 0.8;

    transition: opacity var(--duration-normal) var(--ease-standard),
                background var(--duration-normal) var(--ease-standard);

    z-index: var(--z-popover);

    svg {
        fill: hsl(var(--foreground));
        width: 100%;
        height: 100%;
    }

    &:hover,
    &:focus {
        outline: none;
        opacity: 1;
        background: hsl(0 0% 50% / 0.15);
    }
}

.toggle-sun {
    transform-origin: center center;
    transition: transform 750ms var(--ease-overshoot);
}

.toggle-circle {
    transform: translateX(0%);
    transition: transform 500ms var(--ease-decelerate);
}

/* Dark mode styles — use :where(.dark) so it doesn't leak to <html> */
:where(.dark) .dark-mode-toggle-button .toggle-sun {
    transform: rotate(0.5turn);
}

:where(.dark) .dark-mode-toggle-button .toggle-circle {
    transform: translateX(-15%);
}
</style>
