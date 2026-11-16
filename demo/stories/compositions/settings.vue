<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import SettingsStage from "./settings.stage.vue";

const snippet = `<Card>
    <CardContent>
        <SegmentedTabs v-model="tab" :options="tabs" variant="underline" semantics="tabs" />
        <LabeledSwitch v-model="emailAlerts" label="Email alerts" layout="horizontal" />
        <LabeledSwitch v-model="digest" label="Weekly digest" layout="horizontal" />
    </CardContent>
</Card>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="tall">
                <SettingsStage />
            </StoryStage>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
