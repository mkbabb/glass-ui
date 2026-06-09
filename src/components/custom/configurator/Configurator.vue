<script setup lang="ts" generic="T">
import { computed, type HTMLAttributes } from "vue";
import { cn } from "../../../utils/cn";
import {
    provideConfiguratorDensity,
    type ConfiguratorDensity,
} from "./density";

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
 * Which side the aside (preset row + controls) sits on at `lg`+ width.
 *
 * `right` (default) is the inspector idiom — stage left, controls right.
 * `left` is a reversible, taste-level flip: the aside renders on the
 * left while DOM/tab order stays stage→aside (the flip is grid-column
 * placement + border-side only, no source reorder — no a11y regression).
 * Below `lg` the layout is a single column and the side has no meaning.
 */
export type ConfiguratorAsideSide = "left" | "right";

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
        /**
         * Row-level density axis (N.W2 Lane A). Cascades to descendant
         * `<ConfiguratorRow>` children via provide/inject. A row may
         * override locally by setting its own `density` prop (prop wins
         * over inject). Default `"comfortable"` preserves the prior
         * `gap-1.5 py-2` recipe exactly.
         */
        density?: ConfiguratorDensity;
        /**
         * Which side the aside sits on at `lg`+ width. Default `"right"`
         * (the inspector idiom). `"left"` flips the visual column via
         * grid-column placement + border-side swap only — DOM/tab order
         * stays stage→aside. No effect below `lg` (single-column).
         */
        asideSide?: ConfiguratorAsideSide;
        /**
         * Aside width band at `lg`+ width, as a CSS length pair driving
         * `minmax(--configurator-aside-min, --configurator-aside-max)`. The
         * prop sets the two inline custom properties; consumers may instead
         * (or also) set `--configurator-aside-min` / `--configurator-aside-max`
         * via the cascade. Default band is `280px`/`360px`. Pass a single
         * length to pin the band (`min === max`), or a `[min, max]` pair.
         */
        asideWidth?: string | readonly [min: string, max: string];
        /** Optional outer container override. */
        class?: HTMLAttributes["class"];
    }>(),
    {
        scrollMode: "auto",
        density: "comfortable",
        asideSide: "right",
    },
);

// Provide the density to descendant <ConfiguratorRow>s. Rows still accept
// their own `density` prop; the prop wins over inject (see ConfiguratorRow).
provideConfiguratorDensity(computed(() => props.density));

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
        // Shape geometry is `rounded-panel` (--radius-panel = --radius-xl):
        // a floating *panel* carries panel radius, matching every other
        // glass-floating surface in the library (HoverCardContent,
        // DropdownMenuContent, ComboboxList, ContextMenuContent, …). Surface
        // tier × shape geometry stay orthogonal (DESIGN.md §Orthogonal
        // variants); the radius is owned here at the container root so the
        // rounding does not stop one level too high (the stacked
        // ConfiguratorLayer sections inherit a rounded outer clip).
        "configurator glass-floating rounded-panel border border-border/60 overflow-hidden",
        // Single column below `lg`; at `lg`+ a stage 1fr + aside band. The
        // band reads from the `--configurator-aside-{min,max}` token pair
        // (defaults 280px/360px), retunable via the `asideWidth` prop or the
        // cascade — muster's CLS-fence carrier + value.js's dual-pane axis.
        "grid grid-cols-1",
        "lg:grid-cols-[minmax(0,1fr)_minmax(var(--configurator-aside-min,280px),var(--configurator-aside-max,360px))]",
        "min-h-0",
        props.class,
    ),
);

// Inline custom props the `asideWidth` prop projects onto the root. A single
// length pins the band (min === max); a [min, max] pair sets each rail. When
// the prop is absent both stay unset and the cascade/defaults apply.
const containerStyle = computed(() => {
    if (props.asideWidth == null) return undefined;
    const [min, max] = Array.isArray(props.asideWidth)
        ? props.asideWidth
        : [props.asideWidth, props.asideWidth];
    return {
        "--configurator-aside-min": min,
        "--configurator-aside-max": max,
    } as Record<string, string>;
});

// Visual side flip without a DOM reorder: at `lg`+ place the stage and aside
// into explicit grid columns. `right` (default) keeps source order (stage in
// col 1, aside in col 2 — the natural fill). `left` swaps the column targets
// so the aside paints first; tab order stays stage→aside (no a11y regression).
// Below `lg` (single column) neither override applies.
const stageColumnClass = computed(() =>
    props.asideSide === "left" ? "lg:col-start-2" : "",
);
const asideColumnClass = computed(() =>
    props.asideSide === "left" ? "lg:col-start-1 lg:row-start-1" : "",
);

// The aside's vertical/horizontal rules follow the side: on the right the
// hairline sits on its left edge (`lg:border-l`); flipped left, on its right
// edge (`lg:border-r`). The mobile top border is side-agnostic.
const asideBorderClass = computed(() =>
    props.asideSide === "left" ? "lg:border-r lg:border-l-0" : "lg:border-l",
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
    <section data-slot="configurator" :class="containerClass" :style="containerStyle">
        <!-- ── Stage column (live specimen viewport) ─────────────────── -->
        <div
            :class="
                cn(
                    'configurator-stage relative min-h-0 min-w-0 overflow-hidden',
                    stageColumnClass,
                )
            "
        >
            <slot name="stage" />
        </div>

        <!-- ── Aside (preset row + controls) ─────────────────────────── -->
        <aside
            :class="
                cn(
                    'configurator-aside flex min-h-0 min-w-0 flex-col border-t border-border/40 lg:border-t-0',
                    asideBorderClass,
                    asideColumnClass,
                )
            "
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
                            data-slot="configurator-preset"
                            :aria-selected="p.key === activePreset"
                            :data-active="p.key === activePreset || undefined"
                            :class="
                                cn(
                                    // Glass-atoms chip: tap-squish press-spring +
                                    // transition-control surface cross-fade + the
                                    // canonical focus-ring + --radius-pill geometry.
                                    // The active chip is a translucent glass-tier
                                    // fill (the quiet glass-tint rung over a real
                                    // backdrop-blur) — NOT an opaque bg-foreground
                                    // stamp — so it reads as a glass pill seated on
                                    // the aside, legible over the live AuroraStage.
                                    'tap-squish focus-ring transition-control shrink-0 rounded-pill border px-3 py-1 text-xs font-medium',
                                    p.key === activePreset
                                        ? 'glass-quiet border-border/50 text-foreground'
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
