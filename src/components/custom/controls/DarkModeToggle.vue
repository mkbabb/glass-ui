<script setup lang="ts">
import { computed, ref, useAttrs, watchEffect } from "vue";
import { useGlobalDark } from "../../../composables/dark";
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
        /**
         * Opt-in slow-ECLIPSE register: a LONG-PRESS (vs the normal click) flips
         * the mode through an indulgent, stretched sun↔moon cross-fade — the
         * `--toggle-eclipse-duration` (≈1600ms) over the default 750ms. The bare
         * `@click` flip is UNCHANGED (the default-path canary). Under
         * `prefers-reduced-motion: reduce` the long-press flips INSTANTLY (no
         * eclipse). Default false — the toggle behaves exactly as before.
         * @default false
         */
        eclipse?: boolean;
    }>(),
    {
        passive: false,
        size: "md",
        disableTransitions: false,
        eclipse: false,
    }
);

const attrs = useAttrs();

// ── The long-press eclipse register (opt-in via `eclipse`) ───────────────────
// A pointer held past the threshold flips the mode through the stretched-eclipse
// transition; a short tap falls through to the normal @click flip. The default
// (`eclipse:false`) leaves the click path byte-identical.
const eclipsing = ref(false);
const prefersReduced =
    typeof matchMedia !== "undefined" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches;
let pressTimer: ReturnType<typeof setTimeout> | null = null;
let didEclipse = false;

function clearPress(): void {
    if (pressTimer !== null) {
        clearTimeout(pressTimer);
        pressTimer = null;
    }
}

function onEclipseDown(): void {
    if (!props.eclipse || props.passive) return;
    didEclipse = false;
    clearPress();
    pressTimer = setTimeout(() => {
        didEclipse = true;
        pressTimer = null;
        // Under reduce, flip instantly (no eclipse register).
        if (!prefersReduced) {
            eclipsing.value = true;
            window.setTimeout(() => (eclipsing.value = false), 1700);
        }
        toggleDark();
    }, 460);
}

function onEclipseEnd(): void {
    clearPress();
}

function onEclipseClick(e: MouseEvent): void {
    // If the long-press already toggled, swallow the trailing click so it does
    // not double-toggle back.
    if (props.eclipse && didEclipse) {
        e.preventDefault();
        e.stopPropagation();
        didEclipse = false;
        return;
    }
    if (!props.passive) toggleDark();
}

const rootClass = computed(() =>
    cn(
        "dark-mode-toggle-button",
        "relative isolate inline-flex shrink-0 items-center justify-center",
        "cursor-pointer border-0 bg-transparent",
        "rounded-pill",
        "opacity-80",
        // Canonical focus-visible affordance for an interactive button —
        // pulls the `--focus-ring-shadow` recipe via the shared utility.
        // Per audit U.W0.C-b axis 3 #16.
        "focus-ring",
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
        :data-eclipsing="eclipse && eclipsing ? 'true' : undefined"
        v-bind="forwardedAttrs"
        @click="onEclipseClick"
        @pointerdown="onEclipseDown"
        @pointerup="onEclipseEnd"
        @pointerleave="onEclipseEnd"
        @pointercancel="onEclipseEnd"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 472.39 472.39"
            class="block h-full w-full fill-foreground"
        >
            <!--
                BA.W-ATLAS-RECONCILE A-3 (d6 2755ebbd re-land) — `data-allow-motion`
                carves the icon's OWN morph out of the `.no-transition` theme-flip
                suppression storm (utilities/a11y-overrides.css). The whole purpose
                of this control is the half-turn spring; the blanket kill that
                suppresses the page's incidental transitions during a flip must NOT
                gag the toggle's deliberate animation. Reduced-motion still
                OVERRIDES this carve (the icon snaps under PRM) — see the PRM
                `[data-allow-motion]` override in a11y-overrides.css.
            -->
            <g class="toggle-sun" data-allow-motion>
                <path
                    d="M403.21,167V69.18H305.38L236.2,0,167,69.18H69.18V167L0,236.2l69.18,69.18v97.83H167l69.18,69.18,69.18-69.18h97.83V305.38l69.18-69.18Zm-167,198.17a129,129,0,1,1,129-129A129,129,0,0,1,236.2,365.19Z"
                />
            </g>
            <g class="toggle-circle" data-allow-motion>
                <circle cx="236.2" cy="236.2" r="90" />
            </g>
        </svg>
    </component>
</template>

<style scoped>
/* BA.W-ATLAS-RECONCILE A-3 (d6 2755ebbd re-land) — authored as transition
   LONGHANDS (not the `transition:` shorthand) so the suppression carve operates
   on an explicit `transition-duration` — and the authored spring duration is the
   single, legible source of truth (the ported icon-morph gate reads the cascaded
   `transition-duration` off a real `.toggle-sun`; a shorthand it cannot expand). */
.toggle-sun {
    transform-origin: center center;
    transition-property: transform;
    transition-duration: 750ms;
    transition-timing-function: var(--spring-bouncy);
}

.toggle-circle {
    transform: translateX(0%);
    transition-property: transform;
    transition-duration: 500ms;
    transition-timing-function: var(--ease-out);
}

/* The opt-in slow-ECLIPSE register (E5): while a long-press eclipse is in flight
   the sun↔moon cross-fade stretches to an indulgent ~1.6s — the moon disc slides
   slowly across, the rays rotate at half speed. The default (no `data-eclipsing`)
   keeps the 750ms/500ms transitions above byte-identical. */
.dark-mode-toggle-button[data-eclipsing="true"] .toggle-sun {
    transition: transform 1600ms var(--ease-standard);
}
.dark-mode-toggle-button[data-eclipsing="true"] .toggle-circle {
    transition: transform 1600ms var(--ease-standard);
}

@media (prefers-reduced-motion: reduce) {
    /* Under reduce the eclipse never animates — the flip is instant. */
    .dark-mode-toggle-button[data-eclipsing="true"] .toggle-sun,
    .dark-mode-toggle-button[data-eclipsing="true"] .toggle-circle {
        transition: none;
    }
}

/* Dark mode styles — use :where(.dark) so it doesn't leak to <html> */
:where(.dark) .dark-mode-toggle-button .toggle-sun {
    transform: rotate(0.5turn);
}

:where(.dark) .dark-mode-toggle-button .toggle-circle {
    transform: translateX(-15%);
}
</style>
