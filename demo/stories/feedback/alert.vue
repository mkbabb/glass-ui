<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import AlertStage, { type AlertTone } from "./alert.stage.vue";

const tone = ref<AlertTone>("warning");

const TONES: { value: AlertTone; label: string }[] = [
    { value: "neutral", label: "Neutral" },
    { value: "info", label: "Info" },
    { value: "success", label: "Success" },
    { value: "warning", label: "Warning" },
    { value: "destructive", label: "Destructive" },
];

const snippet = `<script setup lang="ts">
import { TriangleAlert } from "@lucide/vue";
import { Alert, AlertDescription, AlertTitle } from "@mkbabb/glass-ui/alert";
<\/script>

<template>
    <Alert tone="warning">
        <TriangleAlert />
        <AlertTitle>Nearing your limit</AlertTitle>
        <AlertDescription>You have used most of this hour's quota.</AlertDescription>
    </Alert>
</template>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="fit">
                <AlertStage :tone="tone" />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow v-model="tone" label="Tones" :options="TONES" />
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
