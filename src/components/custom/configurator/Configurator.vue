<script setup lang="ts" generic="T">
import { computed, type HTMLAttributes } from "vue";
import { cn } from "@/utils/cn";

/**
 * Scroll behavior for the controls column.
 *
 * - `auto`   — overflow-y-auto with `.scroll-fade-y` mask; controls scroll
 *              when their intrinsic height exceeds the host. Default.
 * - `always` — controls always render scroll affordance (mask + thin
 *              scrollbar). Use when authors want a fixed-height studio
 *              regardless of content.
 * - `never`  — controls do not scroll; host grows to content height. Use
 *              for popover/sheet hosts that already manage their own
 *              overflow.
 */
export type ConfiguratorScrollMode = "auto" | "always" | "never";

/**
 * Generic preset descriptor. Consumers pass `T` as the live config shape.
 * The primitive carries no preset semantics beyond `key + label` for
 * the picker row and `config: T` for the active payload — preset
 * selection / diff-from-preset / reset semantics live in the optional
 * `useConfiguratorState<T>` composable.
 */
export interface ConfiguratorPreset<T> {
    readonly key: string;
    readonly label: string;
    readonly sub?: string;
    /** Optional baked thumbnail (data URL or static path). */
    readonly thumb?: string;
    readonly config: T;
}

/**
 * Props.
 *
 * `presets` and `layers` are *optional* — both surfaces also accept
 * named slots (`presets`, `controls`). The props form is convenient
 * for declarative consumers; the slot form is the escape hatch when
 * a consumer needs custom chrome (preset picker variant, layer
 * grouping, etc.).
 */
const props = withDefaults(
    defineProps<{
        /** Optional preset table; presented to the `presets` slot fallback. */
        presets?: readonly ConfiguratorPreset<T>[];
        /** Currently active preset key — display only; selection is the consumer's. */
        activePreset?: string;
        /** Optional layer descriptors; presented to `controls` slot fallback. */
        layers?: readonly { id: string; label: string }[];
        /** Active layer id — display only; switching is the consumer's. */
        activeLayer?: string;
        /** Scroll behavior for the controls column. Default: `auto`. */
        scrollMode?: ConfiguratorScrollMode;
        /** Optional outer container override. */
        class?: HTMLAttributes["class"];
    }>(),
    {
        scrollMode: "auto",
    },
);

const emit = defineEmits<{
    /** Fired when the user picks a preset chip from the default `presets` slot. */
    (e: "select-preset", key: string): void;
    /** Fired when the user picks a layer chip from the default `controls` slot. */
    (e: "select-layer", id: string): void;
    /** Fired when the user clicks the optional reset affordance. */
    (e: "reset"): void;
}>();

const containerClass = computed(() =>
    cn(
        // glass-floating is the canonical "studio panel" tier; honors
        // prefers-reduced-transparency via the @media block in glass.css.
        "configurator glass-floating rounded-card border border-border/60 overflow-hidden",
        "grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]",
        "min-h-0",
        props.class,
    ),
);

const controlsScrollClass = computed(() => {
    switch (props.scrollMode) {
        case "always":
            return "overflow-y-auto scroll-fade-y scrollbar-thin";
        case "never":
            return "overflow-visible";
        case "auto":
        default:
            return "overflow-y-auto scroll-fade-y scrollbar-thin";
    }
});
</script>

<template>
    <section :class="containerClass">
        <!-- ── Stage column (live specimen viewport) ─────────────────── -->
        <div class="configurator-stage relative min-h-0 min-w-0 overflow-hidden">
            <slot name="stage" />
        </div>

        <!-- ── Aside (preset row + controls) ─────────────────────────── -->
        <aside
            class="configurator-aside flex min-h-0 min-w-0 flex-col border-t border-border/40 lg:border-l lg:border-t-0"
        >
            <!-- Preset picker row -->
            <div
                v-if="$slots.presets || (presets && presets.length > 0)"
                class="configurator-presets shrink-0 border-b border-border/40 px-3 py-2"
            >
                <slot name="presets" :presets="presets" :active-preset="activePreset">
                    <!--
                        Default preset row: horizontal scroll-fade chip list. Consumers
                        with thumbnails / richer chrome should provide the slot.
                    -->
                    <div
                        class="flex gap-2 overflow-x-auto scroll-fade-mask scrollbar-hidden"
                        role="tablist"
                        aria-label="Presets"
                    >
                        <button
                            v-for="p in presets"
                            :key="p.key"
                            type="button"
                            role="tab"
                            :aria-selected="p.key === activePreset"
                            :class="
                                cn(
                                    'focus-ring shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                                    p.key === activePreset
                                        ? 'border-foreground/40 bg-foreground text-background'
                                        : 'border-border/40 bg-card/40 text-foreground hover:bg-card/70',
                                )
                            "
                            @click="emit('select-preset', p.key)"
                        >
                            {{ p.label }}
                        </button>
                    </div>
                </slot>
            </div>

            <!-- Controls column (layered config body) -->
            <div :class="cn('configurator-controls flex-1 min-h-0', controlsScrollClass)">
                <slot
                    name="controls"
                    :layers="layers"
                    :active-layer="activeLayer"
                    :select-layer="(id: string) => emit('select-layer', id)"
                >
                    <!--
                        Default body: render whatever the consumer drops in via
                        the default slot (typically a stack of `<ConfiguratorLayer>`
                        children).
                    -->
                    <div class="flex flex-col">
                        <slot />
                    </div>
                </slot>
            </div>

            <!-- Optional footer (reset affordance hook) -->
            <div
                v-if="$slots.footer"
                class="configurator-footer shrink-0 border-t border-border/40 px-3 py-2"
            >
                <slot name="footer" :reset="() => emit('reset')" />
            </div>
        </aside>
    </section>
</template>
