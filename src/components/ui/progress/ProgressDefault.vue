<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import { ProgressIndicator, ProgressRoot, type ProgressRootProps } from "reka-ui";
import { cn } from "../../../utils";

/**
 * Default progress variant — a `--progress-track` rail + a `--progress-fill`
 * indicator with a `translateX(-%)` intake-pulse. The plainest rung; no lifecycle
 * motion grammar (that lives on the gradient variant). The thin `Progress`
 * dispatcher routes here for `variant="default"`.
 *
 * Token-read parity with the `gradient` variant (AX.W24 F1): the rail/indicator
 * colour read `--progress-track`/`--progress-fill` (fallbacks
 * `var(--progress-track-on-glass)`/`var(--primary)`) as Tailwind arbitrary
 * properties — `bg-[var(--token,…)]` /
 * `[background:var(--token,…)]` — NOT the `bg-secondary`/`bg-primary` utility
 * classes. A `bg-primary` utility lives in `@layer utilities`, which ALWAYS
 * outranks the `@layer components` `.glass-progress-rail` recipe regardless of
 * source order, so a `:root { --progress-fill }` (or `.glass-progress-rail`'s
 * token-set) override was a silent no-op on the default variant. Reading the token
 * at source makes the `default` variant token-retintable for EVERY consumer.
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
                'relative h-4 w-full overflow-hidden rounded-pill bg-[var(--progress-track,var(--progress-track-on-glass))]',
                props.class,
            )
        "
    >
        <ProgressIndicator
            class="h-full w-full flex-1 rounded-pill [background:var(--progress-fill,var(--primary))] transition-transform"
            :style="{ transform: `translateX(-${100 - (props.modelValue ?? 0)}%)` }"
        />
    </ProgressRoot>
</template>
