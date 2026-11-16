<script setup lang="ts">
import { ref } from "vue";
import type { CardSize } from "@glass/components/card";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import CardStage from "./card.stage.vue";

const size = ref<CardSize>("md");
const selected = ref<"no" | "yes">("no");

const snippet = `<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@mkbabb/glass-ui/card";
<\/script>

<template>
    <Card size="sm">
        <CardHeader>
            <CardTitle>Weekly report</CardTitle>
        </CardHeader>
        <CardContent>Twelve reviews closed.</CardContent>
    </Card>
</template>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="tall">
                <CardStage
                    :size="size"
                    :selected="selected === 'yes'"
                    @update:selected="(v: boolean) => (selected = v ? 'yes' : 'no')"
                />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow
                    v-model="size"
                    label="Density"
                    :options="[
                        { value: 'md', label: 'Comfortable' },
                        { value: 'sm', label: 'Compact' },
                    ]"
                />
                <StoryVariantRow
                    v-model="selected"
                    label="Selected"
                    :options="[
                        { value: 'no', label: 'No' },
                        { value: 'yes', label: 'Yes' },
                    ]"
                />
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
