<script setup lang="ts">
import { ref } from "vue";
import { MoreHorizontal, Save } from "@lucide/vue";
import { Button } from "@glass/components/button";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import ButtonsStage from "./buttons.stage.vue";

const saving = ref(false);

const ICON_EMPHASES = ["primary", "secondary", "quiet"] as const;

function save(): void {
    saving.value = true;
    window.setTimeout(() => (saving.value = false), 2400);
}

const snippet = `<script setup lang="ts">
import { Button } from "@mkbabb/glass-ui/button";
<\/script>

<template>
    <Button emphasis="primary">Save</Button>
    <Button emphasis="quiet" tone="destructive">Delete</Button>
</template>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="fit">
                <ButtonsStage />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow label="Sizes">
                    <Button size="xs">Extra small</Button>
                    <Button size="sm">
                        <Save aria-hidden="true" />
                        Small
                    </Button>
                    <Button>Medium</Button>
                    <Button size="lg">Large</Button>
                </StoryVariantRow>
                <StoryVariantRow label="States">
                    <Button
                        data-scenario="button-loading"
                        emphasis="primary"
                        :loading="saving"
                        @click="save"
                    >
                        Save
                    </Button>
                    <Button data-scenario="button-disabled" disabled>Disabled</Button>
                    <Button
                        data-scenario="button-disabled-destructive"
                        tone="destructive"
                        disabled
                    >
                        Disabled
                    </Button>
                </StoryVariantRow>
                <StoryVariantRow label="Icon only">
                    <Button
                        v-for="emphasis in ICON_EMPHASES"
                        :key="emphasis"
                        :data-scenario="`button-icon-${emphasis}`"
                        :emphasis="emphasis"
                        icon-only
                        aria-label="More actions"
                    >
                        <MoreHorizontal aria-hidden="true" />
                    </Button>
                </StoryVariantRow>
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
