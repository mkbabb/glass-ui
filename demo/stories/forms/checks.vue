<script setup lang="ts">
import { Checkbox } from "@glass/components/checkbox";
import { Label } from "@glass/components/label";
import { Switch } from "@glass/components/switch";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import ChecksStage from "./checks.stage.vue";

const snippet = `<script setup lang="ts">
import { ref } from "vue";
import { Checkbox } from "@mkbabb/glass-ui/checkbox";
import { Label } from "@mkbabb/glass-ui/label";

const basil = ref(true);
<\/script>

<template>
    <Checkbox id="basil" v-model="basil" />
    <Label for="basil">Basil</Label>
</template>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="fit">
                <ChecksStage />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow label="States">
                    <span class="checks-row-bit">
                        <Checkbox id="checks-disabled" disabled />
                        <Label for="checks-disabled" disabled>Disabled</Label>
                    </span>
                    <span class="checks-row-bit">
                        <Checkbox id="checks-disabled-on" :model-value="true" disabled />
                        <Label for="checks-disabled-on" disabled>Disabled</Label>
                    </span>
                    <span class="checks-row-bit">
                        <Checkbox id="checks-mixed" model-value="indeterminate" />
                        <Label for="checks-mixed">Mixed</Label>
                    </span>
                    <span class="checks-row-bit">
                        <Checkbox id="checks-invalid" invalid />
                        <Label for="checks-invalid">Invalid</Label>
                    </span>
                    <span class="checks-row-bit checks-row-switch">
                        <Switch id="checks-switch-off" disabled />
                        <Label for="checks-switch-off" disabled>Disabled</Label>
                    </span>
                </StoryVariantRow>
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>

<style scoped>
.checks-row-bit {
    display: inline-flex;
    align-items: center;
}
.checks-row-switch {
    gap: var(--sp-3);
}
</style>
