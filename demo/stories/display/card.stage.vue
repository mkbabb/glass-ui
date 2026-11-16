<script setup lang="ts">
// Card's stage: one card, an option the reader can press. Density cross-fades the
// card; selection rides the card's own tween.
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    type CardSize,
} from "@glass/components/card";
import StageSwap from "../../chassis/variants/StageSwap.vue";

withDefaults(defineProps<{ size?: CardSize }>(), { size: "md" });

const selected = defineModel<boolean>("selected", { default: false });
</script>

<template>
    <div class="card-stage" role="listbox" aria-label="Reports">
        <StageSwap :swap-key="size" class="card-stage-swap">
            <Card
                :size="size"
                :selected="selected"
                class="card-stage-card"
                @click="selected = !selected"
                @keydown.enter.prevent="selected = !selected"
                @keydown.space.prevent="selected = !selected"
            >
                <CardHeader>
                    <CardTitle>Weekly report</CardTitle>
                    <CardDescription>Seven days of activity across the team.</CardDescription>
                </CardHeader>
                <CardContent>Twelve reviews closed, three waiting on a reply.</CardContent>
            </Card>
        </StageSwap>
    </div>
</template>

<style scoped>
.card-stage {
    display: flex;
    align-items: center;
    justify-content: center;
    block-size: 100%;
    padding: var(--sp-4);
}
.card-stage-swap {
    inline-size: min(100%, 26rem);
    padding: var(--sp-3);
}
</style>
