<script setup lang="ts">
// Badge's stage: each variant at each size, at natural size.
import { BadgeCheck } from "@lucide/vue";
import { Badge, type BadgeVariants } from "@glass/components/badge";

type Variant = NonNullable<BadgeVariants["variant"]>;
type Size = NonNullable<BadgeVariants["size"]>;

const VARIANTS: readonly { value: Variant; label: string }[] = [
    { value: "default", label: "Default" },
    { value: "secondary", label: "Secondary" },
    { value: "outline", label: "Outline" },
];
const SIZES: readonly Size[] = ["sm", "md", "lg"];
</script>

<template>
    <div class="badge-stage">
        <template v-for="v in VARIANTS" :key="v.value">
            <Badge
                v-for="s in SIZES"
                :key="`${v.value}-${s}`"
                :variant="v.value"
                :size="s"
                class="badge-stage-item"
            >
                <BadgeCheck v-if="s === 'lg'" aria-hidden="true" />
                {{ v.label }}
            </Badge>
        </template>
    </div>
</template>

<style scoped>
/* Three sizes across, one variant per row. */
.badge-stage {
    display: grid;
    grid-template-columns: repeat(3, auto);
    justify-content: safe center;
    justify-items: center;
    align-items: center;
    gap: 1rem 1.5rem;
}
.badge-stage-item {
    min-inline-size: max-content;
}
/* Narrower than the three columns: the badges wrap as one centred flow. */
@container (inline-size < 19rem) {
    .badge-stage {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.75rem;
    }
}
</style>
