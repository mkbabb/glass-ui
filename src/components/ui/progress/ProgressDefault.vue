<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import { ProgressIndicator, ProgressRoot, type ProgressRootProps } from "reka-ui";
import { cn } from "../../../utils";

/**
 * Default progress variant — `bg-secondary` rail + `bg-primary` indicator with a
 * `translateX(-%)` intake-pulse. The plainest rung; no lifecycle motion grammar
 * (that lives on the gradient variant). The thin `Progress` dispatcher routes
 * here for `variant="default"`.
 */
const props = defineProps<ProgressRootProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
});
</script>

<template>
    <ProgressRoot
        data-slot="progress"
        v-bind="delegatedProps"
        :class="
            cn(
                'relative h-4 w-full overflow-hidden rounded-pill bg-secondary',
                props.class,
            )
        "
    >
        <ProgressIndicator
            class="h-full w-full flex-1 rounded-pill bg-primary transition-transform"
            :style="{ transform: `translateX(-${100 - (props.modelValue ?? 0)}%)` }"
        />
    </ProgressRoot>
</template>
