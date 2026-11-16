<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import TypographyStage, { type TypeFace } from "./typography.stage.vue";

const face = ref<TypeFace>("display");

const FACES: { value: TypeFace; label: string }[] = [
    { value: "display", label: "Display" },
    { value: "text", label: "Text" },
    { value: "mono", label: "Mono" },
];

const snippet = `<template>
    <h1 class="text-display-3">Warm glass</h1>
    <p class="text-prose">Long reading sits here.</p>
    <code class="fira-code text-mono-small">npm run dev</code>
</template>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="tall">
                <TypographyStage :face="face" />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow v-model="face" label="Register" :options="FACES" />
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
