<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import { TabsIndicator, type TabsIndicatorProps } from "reka-ui";
import { cn } from '../../../utils';

// BH.W-AXIS-GRAMMAR — the `surface` HOMONYM killed. `surface` is the shared
// {glass·veil·opaque·clear} decoration axis everywhere else; here it was a
// BOOLEAN gating the baked glass PLATE utilities — a name collision. Renamed to
// `plate` (the honest word for "bake the glass-quiet backplate?"). The base
// `<Tabs>` underline register wants the plate (default `true`, byte-identical to
// the prior unconditional render). The dock switcher rail renders
// `<TabsIndicator :plate="false">` so the element carries NO baked
// `bg-(--glass-bg-quiet) [backdrop-filter:…]` plate — leaving the
// `.dock-layer-tab-indicator` token rule (`--dock-layer-rail-active`) as the sole
// paint. An `@layer components` rule always loses to an unlayered Tailwind
// utility, so the only way the token register wins is to NOT bake the plate. The
// pointer-events/position/sizing utilities stay unconditional (they are the
// travelling-mechanism, not the plate).
const props = withDefaults(
    defineProps<TabsIndicatorProps & { class?: HTMLAttributes["class"]; plate?: boolean }>(),
    { plate: true },
);

const delegatedProps = computed(() => {
    const { class: _, plate: __, ...delegated } = props;
    return delegated;
});
</script>

<template>
    <TabsIndicator
        data-slot="tabs-indicator"
        v-bind="delegatedProps"
        :class="cn(
            'pointer-events-none absolute left-0 bottom-1 top-1 z-0 w-(--reka-tabs-indicator-size) translate-x-(--reka-tabs-indicator-position) rounded-pill transition-[width,translate] duration-normal ease-spring-snappy',
            props.plate && 'bg-(--glass-bg-quiet) [backdrop-filter:var(--glass-blur-quiet)]',
            props.class,
        )"
    />
</template>
