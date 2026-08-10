<script setup lang="ts" generic="T">
import { computed, type HTMLAttributes } from "vue";
import { cn } from "../_shared/class-names";
import { ExpandableContainer } from "../expandable-container";
import { FadingScroll } from "../fading-scroll";
import {
    provideConfiguratorSize,
    type ConfiguratorSize,
} from "./size";

/**
 * Scroll behavior for the controls column.
 *
 * - `auto`   — the controls column renders a <FadingScroll axis="y"> scroll-port
 *              (sharp at rest, feathered while overflowing); controls scroll when
 *              their intrinsic height exceeds the host. Default.
 * - `always` — same <FadingScroll> scroll-port + thin scrollbar. Use when
 *              authors want a fixed-height studio regardless of content.
 * - `never`  — controls do not scroll; host grows to content height. Renders a
 *              plain div (no FadingScroll). Use for popover/sheet hosts that
 *              already manage their own overflow.
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
 * Where the preset gallery sits.
 *
 * `aside` (default) keeps the preset row inside the right-hand aside (the
 * inspector idiom — the legacy placement, unchanged).
 *
 * `top` lifts the gallery OUT of the 360px aside and pins it as a large,
 * full-width, horizontally-scrollable glass dock across the TOP of the studio
 * frame — the §2.1 reflow (gallery up-top + larger + scrollable). The stage +
 * controls reclaim the full height below it. An additive axis: the grid arm is
 * the precompiled `[data-slot=configurator][data-gallery=top]` rule in
 * configurator.css (never a dead JIT bracket — the lesson).
 */
export type ConfiguratorGalleryPlacement = "aside" | "top";

/**
 * Generic preset descriptor. Consumers pass `T` as the live config shape.
 * The primitive carries no preset semantics beyond `key + label` for
 * the picker row and `config: T` for the active payload — preset
 * selection, diff-from-preset, reset semantics live in the optional
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
         * Row-level density axis. Cascades to descendant
         * `<ConfiguratorRow>` children via provide/inject. A row may
         * override locally by setting its own `size` prop (prop wins
         * over inject). Default `"md"` uses the
         * `gap-1.5 py-2` recipe exactly.
         */
        size?: ConfiguratorSize;
        /**
         * Which side the aside sits on at `lg`+ width. Default `"right"`
         * (the inspector idiom). `"left"` flips the visual column via
         * grid-column placement + border-side swap only — DOM/tab order
         * stays stage→aside. No effect below `lg` (single-column).
         */
        asideSide?: ConfiguratorAsideSide;
        /**
         * Where the preset gallery sits. Default `"aside"` (the inspector idiom).
         * `"top"` pins the gallery as a large full-width scrollable glass dock
         * across the top of the studio (the §2.1 up-top reflow), driven by the
         * precompiled `[data-gallery="top"]` rule in configurator.css.
         */
        galleryPlacement?: ConfiguratorGalleryPlacement;
        /**
         * Aside width band at `lg`+ width, as a CSS length pair driving
         * `minmax(--configurator-aside-min, --configurator-aside-max)`. The
         * prop sets the two inline custom properties; consumers may instead
         * (or also) set `--configurator-aside-min`, `--configurator-aside-max`
         * via the cascade. Default band is `280px`/`360px`. Pass a single
         * length to pin the band (`min === max`), or a `[min, max]` pair.
         */
        asideWidth?: string | readonly [min: string, max: string];
        /**
         * Mount the studio inside an <ExpandableContainer>: a corner trigger that
         * promotes the whole instrument to a full-window ROOM and back. The
         * container already ships focus trap, Esc, body-overflow lock and focus
         * restore, so this prop wires an affordance rather than a mechanism.
         *
         * The subtree is TELEPORTED, never duplicated — one mount, so a live GPU
         * stage in the `#stage` slot survives the promotion instead of being torn
         * down and re-created behind a second canvas.
         *
         * Expanded, the gallery is forced to `top`: the room has the width for the
         * full preset ribbon, and spending it on a 400px gutter is the one thing
         * expansion is for.
         */
        expandable?: boolean;
        /** Accessible name of the expand trigger. */
        expandLabel?: string;
        /** Accessible name of the collapse trigger. */
        collapseLabel?: string;
        /** Optional outer container override. */
        class?: HTMLAttributes["class"];
    }>(),
    {
        scrollMode: "auto",
        size: "md",
        asideSide: "right",
        galleryPlacement: "aside",
        expandable: false,
        expandLabel: "Expand configurator",
        collapseLabel: "Collapse configurator",
    },
);

/** Two-way so a consumer can drive/observe the room from outside the trigger. */
const expanded = defineModel<boolean>("expanded", { default: false });

// Provide the size to descendant <ConfiguratorRow>s. Rows still accept
// their own `size` prop; the prop wins over inject (see ConfiguratorRow).
provideConfiguratorSize(computed(() => props.size));

const emit = defineEmits<{
    /** Fired when the user picks a preset chip from the default `presets` slot. */
    (e: "select-preset", key: string): void;
    /** Fired when the user picks a layer chip from the default `controls` slot. */
    (e: "select-layer", id: string): void;
    /** Fired when the user clicks the optional reset affordance. */
    (e: "reset"): void;
}>();

/*
 * THE SHELL — the material plate AND the size container.
 *
 * The instrument used to be one box: the plate, the grid and the responsive fork
 * all on `[data-slot="configurator"]`. The fork keyed on `@media (min-width:
 * 1024px)`, i.e. on the WINDOW, and the window is not what decides whether a
 * studio has room for two columns — a studio inside a 336px story cel at a 1440px
 * window took the two-column arm and painted a 400px inspector into a 336px track.
 *
 * An element cannot query ITSELF, so the container and the grid cannot be the same
 * box. The shell is that second box, and it is the OUTER one deliberately: the
 * plate, the corner clip and any consumer `class` (height envelope, cast) belong to
 * the thing that owns the studio's rect, and `[data-slot="configurator"]` keeps its
 * three region children exactly as before.
 */
const shellClass = computed(() =>
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
        // The shell's own single-row grid is NOT an arbitrary utility here: it lives
        // beside the container declaration in configurator.css, which is the same
        // discipline §4 states for the two-column geometry — structural layout ships
        // as precompiled CSS, never as a bracket that can die in a content scan.
        "configurator-shell glass-floating rounded-panel border border-border/60 overflow-hidden",
        props.class,
    ),
);

const containerClass = computed(() =>
    cn(
        "configurator",
        // Single column below the fork (a plain utility — emits reliably). Past it
        // the DESKTOP TWO-COLUMN layout (stage 1fr + the aside band) comes from
        // the PRECOMPILED `[data-slot="configurator"]` rule in configurator.css,
        // not a content-scanned arbitrary utility. The
        // `lg:grid-cols-[minmax(0,1fr)_minmax(var(--configurator-aside-min,…),…)]`
        // arbitrary bracket (nested `var()` + commas) silently died in a
        // consumer's content-scan (the self-emission class), so the
        // chassis stayed single-column on ALL widths. The structural layout now
        // lives in library CSS and is never
        // load-bearing on a JIT reach. The aside band still reads the SAME
        // `--configurator-aside-{min,max}` token pair (defaults 280px/360px,
        // retunable via the `asideWidth` prop or the cascade).
        // the gallery is now a section-level grid
        // child (a `data-gallery-dock` row), so the base single-column stack is
        // gallery → stage → controls. The explicit named areas + the desktop
        // two-column placement ride the precompiled configurator.css rules
        // (`[data-slot=configurator]` + `[data-gallery=…]`) — never a dead JIT
        // bracket. The base `grid-cols-1` keeps the mobile single column.
        "grid grid-cols-1",
        // the single-column band sets EXPLICIT rows so the
        // stage row is a DEFINITE track (a `--configurator-stage-min` floor),
        // not a content-auto row that collapses to 0 when its child sizes off a
        // percentage/`h-full` height (the mobile 0×0 live-specimen collapse —
        // a GooBlob hero painting nothing on a phone). The aside row takes the
        // remainder (`minmax(0,1fr)`) and scrolls its controls internally. At
        // `lg`+ the two-COLUMN layout (configurator.css) owns the geometry, so
        // the explicit rows reset to `none` there (one auto row stretched to the
        // taller column) — the `grid-template-rows: none` arm rides the same
        // precompiled desktop rule.
        // Mobile rows: gallery (auto) → stage (a definite `--configurator-stage-min`
        // floor so a percentage/`h-full` stage child cannot collapse to 0 — the
        //  mobile 0×0 fix) → controls (the 1fr remainder, scrolls
        // internally). When no gallery renders the first `auto` row collapses to 0.
        // Past the fork the configurator.css rules reset the template to the
        // two-column geometry (per `data-gallery`).
        "grid-rows-[auto_minmax(var(--configurator-stage-min,18rem),auto)_minmax(0,1fr)]",
        "min-h-0",
    ),
);

/*
 * The expand HOST. `<component :is>` rather than a `v-if`/`v-else` pair, because the
 * alternative is two copies of the whole studio markup and the copies drift.
 * Un-expandable, the host is a `display: contents` div: present in the tree, absent
 * from layout, so the shell's box is unchanged whether the affordance is on or off.
 */
const expandHost = computed(() => (props.expandable ? ExpandableContainer : "div"));
const expandHostClass = computed(() =>
    props.expandable ? "configurator-expand-host" : "contents",
);
const expandHostProps = computed(() =>
    props.expandable
        ? {
              open: expanded.value,
              "onUpdate:open": (value: boolean) => {
                  expanded.value = value;
              },
              expandLabel: props.expandLabel,
              collapseLabel: props.collapseLabel,
          }
        : {},
);

/* Expanded, the gallery is forced `top` — see the `expandable` prop docstring. The
   consumer's own `galleryPlacement` is untouched and returns on collapse. */
const resolvedGalleryPlacement = computed<ConfiguratorGalleryPlacement>(() =>
    props.expandable && expanded.value ? "top" : props.galleryPlacement,
);

// Inline custom props projected onto the SHELL (they inherit to the whole studio).
//
// The Configurator shell publishes its resolved panel corner
// (`--radius-panel`, painted by `rounded-panel`)
// the containerClass paints) as --radius-ctx + its section inset (--configurator-pad-inline)
// as --radius-inset, so a nested `.configurator-layer` section DERIVES its own corner
// concentric with the outer:
//   border-radius: max(var(--radius-floor), calc(var(--radius-ctx) − var(--radius-inset)))
// (the gear Sheet is the sibling site #3 — SheetContent publishes --radius-dialog/-inset).
//
// The `asideWidth` prop (when set) projects the aside band pair onto the SAME root; a single
// length pins the band (min === max), a [min, max] pair sets each rail. When absent the band
// stays unset and the cascade/defaults apply.
const containerStyle = computed(() => {
    const style: Record<string, string> = {
        "--radius-ctx": "var(--radius-panel)",
        "--radius-inset": "var(--configurator-pad-inline)",
    };
    if (props.asideWidth != null) {
        const [min, max] = Array.isArray(props.asideWidth)
            ? props.asideWidth
            : [props.asideWidth, props.asideWidth];
        style["--configurator-aside-min"] = min;
        style["--configurator-aside-max"] = max;
    }
    return style;
});

// Visual side placement never reorders the DOM. `data-aside-side` lets
// configurator.css swap grid columns while the source and tab order remain
// stage→aside. The default `right` placement follows natural source order.

// The aside's hairline follows the side — but it is no longer a `lg:border-l` /
// `lg:border-r` pair here, because those are VIEWPORT utilities and the columns they
// divide are now decided by the studio's own width. The stacked `border-t` stays on
// the element; the side rule lives in the same `@container` block that places the
// columns (configurator.css §4), so the seam and the split can never disagree.

// The controls column uses <FadingScroll axis="y">. The
// `never` mode does NOT scroll (the host owns overflow — a popover/sheet host),
// so it renders a plain `<div>`; `auto`/`always` render the FadingScroll
// scroll-port (which sets `overflow-y: auto` itself + drives the per-edge
// scroll-state mask — sharp at rest, feathered while overflowing). `scrollMode`
// thus selects the wrapper element, not a class.
const controlsScrolls = computed(() => props.scrollMode !== "never");
</script>

<template>
    <!-- The expand host: <ExpandableContainer> when `expandable`, otherwise a
         `display: contents` div that costs nothing. See `expandHost` above. -->
    <component :is="expandHost" v-bind="expandHostProps" :class="expandHostClass">
    <!-- THE SHELL — the plate, and the studio's SIZE CONTAINER (configurator.css
         §0). Everything inside keys on THIS box's inline size, never the window. -->
    <div :class="shellClass" :style="containerStyle">
    <section
        data-slot="configurator"
        :data-aside-side="asideSide"
        :data-gallery="resolvedGalleryPlacement"
        :class="containerClass"
    >
        <!-- ── Preset GALLERY ────────────────
             The gallery is a SECTION-level child (no longer trapped inside the
             360px aside), grid-PLACED by the precompiled
             `[data-slot=configurator][data-gallery]` rules in configurator.css:
               · data-gallery="aside" — it sits in the aside column, row 1 (the
                 legacy inspector placement, byte-identical to before).
               · data-gallery="top"   — it spans BOTH columns up-top as a large
                 full-width scrollable glass dock; the stage + controls reclaim
                 the full height below it (the §2.1 reflow).
             ONE render — CSS owns the placement, no dual markup (KISS/DRY). -->
        <div
            v-if="$slots.presets || (presets && presets.length > 0)"
            data-gallery-dock
            class="configurator-presets shrink-0 px-3 py-2"
        >
            <slot name="presets" :presets="presets" :active-preset="activePreset">
                <!--
                    Default preset gallery: the warm-glass toggle-button tiles
                    (). The a11y fence is ONE pattern —
                    plain type="button" + aria-pressed in a role="group"
                    aria-label="Presets" container (NOT role="tab"+aria-selected,
                    an ARIA contradiction; the FadingScroll is not a tablist).
                    Each tile is a `.glass-capsule` warm-glass cel (the §3 field
                    reads through) with the cartoon cast, NOT an opaque bg-card
                    chip. Consumers wanting a baked field-well pass the slot.
                -->
                <FadingScroll
                    axis="x"
                    class="configurator-gallery-track flex gap-2 scrollbar-hidden"
                    role="group"
                    aria-label="Presets"
                >
                    <button
                        v-for="p in presets"
                        :key="p.key"
                        type="button"
                        data-preset-tile
                        :data-active="p.key === activePreset || undefined"
                        :aria-pressed="p.key === activePreset"
                        :class="
                            cn(
                                // The warm-glass cel: `.glass-capsule` is the
                                // shared warm-transmissive lozenge register (the
                                // §3 field reads THROUGH, never a flat bg-card
                                // scrim). `.glass-capsule-hover` is the shared
                                // specular-lift + press-snap. `shadow-cartoon`
                                // adds the static technicolor cel cast (a direct
                                // box-shadow utility — the cast is static on a
                                // chip, not the moving inert-child caster).
                                'configurator-preset-chip glass-capsule glass-capsule-hover shadow-cartoon focus-ring shrink-0 px-3 py-1 text-micro font-medium text-foreground',
                                p.key === activePreset && 'is-active',
                            )
                        "
                        @click.stop="emit('select-preset', p.key)"
                    >
                        {{ p.label }}
                    </button>
                </FadingScroll>
            </slot>
        </div>

        <!-- ── Stage column (live specimen viewport) ─────────────────── -->
        <div
            class="configurator-stage relative min-h-0 min-w-0 overflow-hidden"
        >
            <slot name="stage" />
        </div>

        <!-- ── Aside (controls + footer) ─────────────────────────────── -->
        <!-- The aside/footer chrome dividers read
             the dark-adaptive --configurator-divider token (configurator.css), so
             the hairlines survive the dark glass plate. The preset GALLERY moved
             OUT to a section-level child (grid-placed); the aside now holds the
             controls body + the optional footer. -->
        <aside
            class="configurator-aside flex min-h-0 min-w-0 flex-col border-t"
        >
            <!-- Controls column (layered config body) —
                 the `auto`/`always` scroll modes render the <FadingScroll axis="y">
                 scroll-port (sharp at rest, feathered while overflowing) off the
                 retired `.scroll-fade-y` mask; `never` renders a plain div (the
                 host owns overflow). -->
            <FadingScroll
                v-if="controlsScrolls"
                axis="y"
                class="configurator-controls flex-1 min-h-0 scrollbar-thin"
            >
                <slot
                    name="controls"
                    :layers="layers"
                    :active-layer="activeLayer"
                    :select-layer="(id: string) => emit('select-layer', id)"
                >
                    <div class="flex flex-col">
                        <slot />
                    </div>
                </slot>
            </FadingScroll>
            <div v-else class="configurator-controls flex-1 min-h-0 overflow-visible">
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
                class="configurator-footer shrink-0 border-t px-3 py-2"
            >
                <slot name="footer" :reset="() => emit('reset')" />
            </div>
        </aside>
    </section>
    </div>
    </component>
</template>
