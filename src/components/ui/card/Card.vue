<script setup lang="ts">
import { computed } from "vue";
import { cn } from "@utils";
import { cardVariants, type CardProps } from "./index";

/**
 * <Card> — surface primitive.
 *
 * `variant`:
 *  - `default` glass bg + grain overlay + shadow
 *  - `pane`    translucent bg + blur, no grain (for scroll panes)
 *  - `cartoon` translucent bg + heavier blur + drop shadow, no grain.
 *              Tokens (`--glass-*-cartoon`, `--shadow-cartoon`) fall back
 *              to the default glass tokens, so consumers opting into the
 *              variant without defining tokens get the default look.
 *  - `subtle`  subtle glass bg + subtle blur, no grain
 *  - `cream`   cream-surface noun (warm-cream identity, paper grain overlay,
 *              cream-edge border, cartoon-sm shadow); `.cream-surface` ships
 *              its own padding + radius + shadow recipe
 *  - `paper`   paper-tier sibling to glass; `.paper-card` ships paper-2 bg +
 *              paper-grain-overlay + cartoon shadow, no backdrop-filter
 *
 * `plain` collapses to a structural wrapper. `flush` drops the surface
 * shadow on `default` / `pane` / `subtle`; `cartoon` resolves its shadow
 * via `.glass-cartoon` and `cream`/`paper` ship their own — `flush` is a
 * no-op there.
 */
const props = defineProps<CardProps>();

const variantClass = computed(() => {
    if (props.plain) return "scrollbar-hidden rounded-xl";

    const variant = props.variant ?? "default";
    const base = cardVariants({ variant });

    if (props.flush) return base;

    if (variant === "default" || variant === "pane") {
        return cn(base, "shadow-[var(--shadow-card)]");
    }
    if (variant === "subtle") {
        return cn(base, "shadow-[var(--glass-shadow-subtle)]");
    }
    return base;
});
</script>

<template>
    <div :class="cn(variantClass, props.class)">
        <slot />
    </div>
</template>
