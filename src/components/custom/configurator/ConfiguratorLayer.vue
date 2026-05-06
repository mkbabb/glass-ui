<script setup lang="ts">
import { ref, watch, type HTMLAttributes } from "vue";
import { ChevronDown } from "lucide-vue-next";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/utils/cn";

/**
 * <ConfiguratorLayer> — collapsible section inside a <Configurator>'s
 * controls column. Composes <Collapsible> from the canonical UI tier;
 * provides a labeled header + chevron affordance + body slot. Authors
 * stack multiple layers to express the per-axis split (per R2 §C: aurora
 * has Medium / Palette / Flow / Texture / Comp / Nuclei; blob has Mood /
 * Body / Surface / Color / Motion / Pointer / Render).
 *
 * The layer is uncontrolled by default (`defaultOpen` opens at mount);
 * pass `:open` + `@update:open` for controlled mode (e.g., when a
 * BouncyTabs / DockLayerGroup at the parent governs which layer is
 * active).
 */
const props = withDefaults(
    defineProps<{
        /** Header label (large, semantic). */
        label: string;
        /** Optional sub-label / token reference (small, monospaced). */
        sub?: string;
        /** Optional id used by external state (e.g., a sibling tab row). */
        id?: string;
        /** Controlled open state. Pair with `@update:open`. */
        open?: boolean;
        /** Uncontrolled initial state. */
        defaultOpen?: boolean;
        class?: HTMLAttributes["class"];
        /** Body wrapper class override. */
        bodyClass?: HTMLAttributes["class"];
    }>(),
    {
        defaultOpen: true,
    },
);

const emit = defineEmits<{
    (e: "update:open", value: boolean): void;
}>();

const internalOpen = ref(props.open ?? props.defaultOpen);

watch(
    () => props.open,
    (v) => {
        if (v !== undefined) internalOpen.value = v;
    },
);

function onToggle(value: boolean): void {
    internalOpen.value = value;
    emit("update:open", value);
}
</script>

<template>
    <Collapsible
        :open="internalOpen"
        :class="cn('configurator-layer border-b border-border/40 last:border-b-0', props.class)"
        @update:open="onToggle"
    >
        <CollapsibleTrigger
            :class="
                cn(
                    'configurator-layer-trigger',
                    'group flex w-full items-center justify-between gap-2 px-3 py-2',
                    'text-left transition-colors hover:bg-foreground/5 focus-ring',
                )
            "
        >
            <div class="flex min-w-0 items-baseline gap-2">
                <span class="text-sm font-semibold text-foreground">{{ label }}</span>
                <span
                    v-if="sub"
                    class="truncate text-[0.6875rem] font-mono text-muted-foreground/70"
                >
                    {{ sub }}
                </span>
            </div>
            <ChevronDown
                class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
                aria-hidden="true"
            />
        </CollapsibleTrigger>
        <CollapsibleContent>
            <div :class="cn('configurator-layer-body px-3 py-2 space-y-2', props.bodyClass)">
                <slot />
            </div>
        </CollapsibleContent>
    </Collapsible>
</template>
