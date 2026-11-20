<script setup lang="ts">
import { Input } from "@glass/components/input";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import InputsStage from "./inputs.stage.vue";

const snippet = `<script setup lang="ts">
import { ref } from "vue";
import { Input } from "@mkbabb/glass-ui/input";
import { Label } from "@mkbabb/glass-ui/label";

const email = ref("");
<\/script>

<template>
    <Label for="email">Email</Label>
    <Input id="email" v-model="email" type="email" required />
</template>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="fit">
                <InputsStage />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow label="Types">
                    <Input class="forms-row-field" type="password" model-value="correct horse" aria-label="Password" />
                    <Input class="forms-row-field" type="search" placeholder="Search" aria-label="Search" />
                    <Input class="forms-row-field" type="date" model-value="2026-11-15" aria-label="Date" />
                    <Input class="forms-row-field" type="time" model-value="09:30" aria-label="Time" />
                </StoryVariantRow>
                <StoryVariantRow label="States">
                    <Input class="forms-row-field" model-value="Read only" readonly aria-label="Read only" />
                    <Input class="forms-row-field" model-value="Disabled" disabled aria-label="Disabled" />
                </StoryVariantRow>
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>

<style scoped>
.forms-row-field {
    inline-size: 10.5rem;
}
</style>
