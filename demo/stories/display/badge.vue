<script setup lang="ts">
import { Badge } from "@glass/components/badge";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import BadgeStage from "./badge.stage.vue";

const TONES = [
    { value: "destructive", label: "Failed" },
    { value: "success", label: "Paid" },
    { value: "warning", label: "Pending" },
    { value: "info", label: "New" },
] as const;

// A data tone is a series colour as the fill; the ink is whichever of black or white
// reads on it.
const DATA_TONES = [
    { token: "--viz-fourier", label: "Revenue" },
    { token: "--viz-chebyshev", label: "Costs" },
    { token: "--viz-legendre", label: "Margin" },
] as const;

const snippet = `<script setup lang="ts">
import { Badge } from "@mkbabb/glass-ui/badge";
<\/script>

<template>
    <Badge variant="outline">Draft</Badge>
    <Badge tone="success">Paid</Badge>
</template>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="fit">
                <BadgeStage />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow label="Tones">
                    <Badge v-for="t in TONES" :key="t.value" :tone="t.value">{{ t.label }}</Badge>
                </StoryVariantRow>
                <StoryVariantRow label="Data tones">
                    <Badge
                        v-for="t in DATA_TONES"
                        :key="t.token"
                        class="border-transparent"
                        :style="{
                            backgroundColor: `var(${t.token})`,
                            color: `contrast-color(var(${t.token}))`,
                        }"
                    >
                        {{ t.label }}
                    </Badge>
                </StoryVariantRow>
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
