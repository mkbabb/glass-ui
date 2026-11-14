<script setup lang="ts">
// W-I.8 R-8: renders its slot into a named dock's region, as direct children, and
// provides that dock's context (and the face mark, for the run) to it.
import { computed, defineComponent, onBeforeUnmount, provide, watch, type PropType } from "vue";
import { DOCK_CONTEXT_KEY, DockFace, type DockContext } from "./composables/dockContext";
import { dockRegistry, wantRegion, type DockOutletRegion } from "./composables/dockRegistry";

const props = withDefaults(
    defineProps<{ to: string; region?: DockOutletRegion }>(),
    { region: "run" },
);

const entry = computed(() => dockRegistry.get(props.to));
const target = computed(() => entry.value?.regions[props.region] ?? null);

watch(
    () => [props.to, props.region] as const,
    ([to, region], prev) => {
        if (prev) wantRegion(prev[0], prev[1], -1);
        wantRegion(to, region, 1);
    },
    { immediate: true },
);
onBeforeUnmount(() => wantRegion(props.to, props.region, -1));

const Scope = defineComponent({
    name: "DockOutletScope",
    props: { context: { type: Object as PropType<DockContext>, required: true } },
    setup(p, { slots }) {
        provide(DOCK_CONTEXT_KEY, p.context);
        return () => slots.default?.();
    },
});
</script>

<template>
    <Teleport v-if="target && entry" :to="target">
        <Scope :key="entry.id" :context="entry.context">
            <DockFace v-if="region === 'run'"><slot /></DockFace>
            <slot v-else />
        </Scope>
    </Teleport>
</template>
