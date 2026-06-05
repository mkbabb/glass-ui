<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { cn } from "../../../utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../ui/select";
import { UnderlineTabs, type TabOption } from "../tabs";

/**
 * ResponsiveTabs — single consume that renders as `<Select>` below the
 * configured breakpoint and `<UnderlineTabs>` at/above it.
 *
 * AC.W8e (glass-ui v1.7.0) — promoted from speedtest's 3-site duplicated
 * mobile-Select / desktop-UnderlineTabs swap (AdminDataView,
 * AdminDashboardLayout, PublicDashboardLayout). Each site rolled its own
 * `sm:hidden` / `hidden sm:block` pair; the primitive collapses the
 * duplication onto a single matchMedia-driven swap. The dual-mount CSS
 * pattern is preserved at the JSDOM/SSR level by initializing
 * `isDesktop` from `window.matchMedia(...)`'s `matches` (or `true` when
 * `window` is absent, matching server-rendered desktop-first).
 *
 * The `breakpoint` prop is a CSS length consumed inside the
 * `(min-width: <breakpoint>)` media query — pass `"640px"` (the Tailwind
 * `sm:` rung default), `"720px"` (speedtest's grid-engagement rung), or
 * any other value the consumer needs.
 *
 * The select trigger inherits `glass-ui`'s canonical `text-small w-auto
 * min-w-input-sm` chrome so the mobile control reads at the small text
 * register. UnderlineTabs receives the `text-body` register and forwards
 * any consumer-passed `class`.
 *
 * Consumer-side reactive selection flows through `modelValue` /
 * `update:modelValue` symmetrically across both controls; the primitive
 * exposes one model so the consumer doesn't bind two.
 */

export interface ResponsiveTabsProps {
    /** Tab options — shared between mobile select + desktop tabs. */
    options: TabOption[];
    /**
     * Optional subset for desktop tabs. If a consumer has a mobile-only
     * tab (e.g. speedtest AdminDataView's "Filters" tab which is
     * desktop-sidebar-rendered), pass the desktop-relevant subset here.
     * Falls back to `options` when unset.
     */
    desktopOptions?: TabOption[] | null;
    /**
     * CSS length string for the media query breakpoint. Mobile-control
     * (Select) below; desktop-control (UnderlineTabs) at/above.
     * Defaults to `"640px"` (Tailwind `sm:`).
     */
    breakpoint?: string;
    /** Class merged onto both controls' chrome. */
    class?: HTMLAttributes["class"];
    /** Class merged onto the desktop UnderlineTabs only. */
    desktopClass?: HTMLAttributes["class"];
    /** Class merged onto the mobile SelectTrigger only. */
    mobileTriggerClass?: HTMLAttributes["class"];
    /**
     * Accessible name for the mobile `<SelectTrigger>` (axe `select-name` /
     * WCAG 4.1.2 — the bare trigger carries only a `<SelectValue>`). Defaults to
     * the active option's label.
     */
    ariaLabel?: string;
}

const props = withDefaults(defineProps<ResponsiveTabsProps>(), {
    breakpoint: "640px",
    desktopOptions: null,
});

// Vue 3.5 defineModel — one model drives BOTH the mobile Select and the
// desktop UnderlineTabs so the consumer binds a single `v-model`.
const model = defineModel<string>({ required: true });

const isDesktop = ref(true);

let mql: MediaQueryList | null = null;

function handleChange(event: MediaQueryListEvent | MediaQueryList) {
    isDesktop.value = event.matches;
}

onMounted(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    mql = window.matchMedia(`(min-width: ${props.breakpoint})`);
    isDesktop.value = mql.matches;
    mql.addEventListener("change", handleChange);
});

onBeforeUnmount(() => {
    mql?.removeEventListener("change", handleChange);
    mql = null;
});

const effectiveDesktopOptions = computed(
    () => props.desktopOptions ?? props.options,
);

/**
 * Effective desktop value — when the consumer's `modelValue` points at a
 * mobile-only tab, the desktop UnderlineTabs receives the first desktop
 * option instead so the underline doesn't render against a missing tab.
 * Mirrors speedtest AdminDataView's `activeTab === 'filters' ? 'results'
 * : activeTab` ternary at the primitive level.
 */
const effectiveDesktopValue = computed(() => {
    const opts = effectiveDesktopOptions.value;
    if (opts.some((o) => o.value === model.value)) {
        return model.value;
    }
    return opts[0]?.value ?? model.value;
});

// The mobile Select's accessible name — the consumer's `ariaLabel`, else the
// active option's label (so the icon-only trigger is never name-less).
const mobileAriaLabel = computed(
    () =>
        props.ariaLabel ??
        props.options.find((o) => o.value === model.value)?.label ??
        "Select",
);

function onUpdate(value: unknown) {
    if (typeof value === "string") {
        model.value = value;
    }
}
</script>

<template>
    <template v-if="isDesktop">
        <UnderlineTabs
            :options="effectiveDesktopOptions"
            :model-value="effectiveDesktopValue"
            :class="cn('responsive-tabs__desktop text-body', props.class, desktopClass)"
            @update:model-value="onUpdate"
        />
    </template>
    <template v-else>
        <div :class="cn('responsive-tabs__mobile w-fit', props.class)">
            <Select :model-value="model" @update:model-value="onUpdate">
                <SelectTrigger
                    :aria-label="mobileAriaLabel"
                    :class="cn('responsive-tabs__trigger text-small w-auto min-w-input-sm', mobileTriggerClass)"
                >
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem
                        v-for="opt in options"
                        :key="opt.value"
                        :value="opt.value"
                    >
                        {{ opt.label }}
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    </template>
</template>
