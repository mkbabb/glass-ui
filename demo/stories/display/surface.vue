<script setup lang="ts">
import { ref } from "vue";
import type { SurfaceDecoration, SurfaceTier } from "@glass/components/surface";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import SurfaceStage from "./surface.stage.vue";

const tier = ref<SurfaceTier>("resting");
const decoration = ref<SurfaceDecoration>("glass");

const TIERS: { value: SurfaceTier; label: string }[] = [
    { value: "wash", label: "Wash" },
    { value: "quiet", label: "Quiet" },
    { value: "resting", label: "Resting" },
    { value: "floating", label: "Floating" },
    { value: "overlay", label: "Overlay" },
];
const DECORATIONS: { value: SurfaceDecoration; label: string }[] = [
    { value: "glass", label: "Glass" },
    { value: "veil", label: "Veil" },
    { value: "opaque", label: "Opaque" },
];

const snippet = `<script setup lang="ts">
import { Surface } from "@mkbabb/glass-ui/surface";
<\/script>

<template>
    <Surface tier="floating" surface="glass">
        <slot />
    </Surface>
</template>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="tall" field>
                <SurfaceStage :tier="tier" :decoration="decoration" />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow v-model="tier" label="Prominence" :options="TIERS" />
                <StoryVariantRow v-model="decoration" label="Decoration" :options="DECORATIONS" />
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
