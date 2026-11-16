<script setup lang="ts">
// Settings' stage: one settings panel. Its tabs swap the panel's rows, and the
// panel cross-fades and tweens its height between them.
import { ref } from "vue";
import { Button } from "@glass/components/button";
import { Card, CardContent } from "@glass/components/card";
import {
    LabeledField,
    LabeledInput,
    LabeledSlider,
    LabeledSwitch,
} from "@glass/components/labeled-field";
import { SegmentedTabs, type SegmentedTabOption } from "@glass/components/tabs";
import StageSwap from "../../chassis/variants/StageSwap.vue";

type Tab = "account" | "display" | "alerts";

const TABS: SegmentedTabOption<Tab>[] = [
    { value: "account", label: "Account" },
    { value: "display", label: "Display" },
    { value: "alerts", label: "Alerts" },
];

type Theme = "light" | "dark" | "system";

const THEMES: SegmentedTabOption<Theme>[] = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "system", label: "System" },
];

const tab = ref<Tab>("account");

const name = ref("Ada Lovelace");
const email = ref("ada@example.com");

const theme = ref<Theme>("system");
const textSize = ref(16);
const reduceMotion = ref(false);

const emailAlerts = ref(true);
const desktop = ref(false);
const digest = ref(true);
</script>

<template>
    <div class="settings-stage">
        <Card class="settings-stage-card">
            <CardContent class="settings-stage-content">
                <SegmentedTabs
                    v-model="tab"
                    :options="TABS"
                    variant="underline"
                    semantics="tabs"
                    aria-label="Settings"
                />
                <StageSwap :swap-key="tab">
                    <div v-if="tab === 'account'" class="settings-stage-rows">
                        <LabeledInput v-model="name" label="Name" layout="horizontal" />
                        <LabeledInput
                            v-model="email"
                            label="Email"
                            type="email"
                            layout="horizontal"
                        />
                        <div class="settings-stage-actions">
                            <Button emphasis="primary" size="sm">Save</Button>
                        </div>
                    </div>
                    <div v-else-if="tab === 'display'" class="settings-stage-rows">
                        <LabeledField
                            label="Theme"
                            layout="horizontal"
                            :control-labelable="false"
                        >
                            <template #default="{ labelledBy }">
                                <SegmentedTabs
                                    v-model="theme"
                                    :options="THEMES"
                                    :aria-labelledby="labelledBy"
                                />
                            </template>
                        </LabeledField>
                        <LabeledSlider
                            v-model="textSize"
                            label="Text size"
                            layout="horizontal"
                            :min="12"
                            :max="20"
                            :step="1"
                        />
                        <LabeledSwitch
                            v-model="reduceMotion"
                            label="Reduce motion"
                            layout="horizontal"
                        />
                    </div>
                    <div v-else class="settings-stage-rows">
                        <LabeledSwitch
                            v-model="emailAlerts"
                            label="Email alerts"
                            layout="horizontal"
                        />
                        <LabeledSwitch
                            v-model="desktop"
                            label="Desktop notifications"
                            layout="horizontal"
                        />
                        <LabeledSwitch
                            v-model="digest"
                            label="Weekly digest"
                            layout="horizontal"
                        />
                    </div>
                </StageSwap>
            </CardContent>
        </Card>
    </div>
</template>

<style scoped>
.settings-stage {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    place-items: center;
    block-size: 100%;
    padding: var(--sp-5);
}

.settings-stage-card {
    inline-size: min(46rem, 100%);
    min-inline-size: 0;
}

.settings-stage-content {
    display: flex;
    flex-direction: column;
    gap: var(--sp-4);
}

.settings-stage-rows {
    display: flex;
    flex-direction: column;
    gap: var(--sp-4);
    padding-block: var(--sp-2);
}

.settings-stage-actions {
    display: flex;
    justify-content: flex-end;
}

@container (inline-size < 34rem) {
    .settings-stage {
        padding: var(--sp-3);
    }
}
</style>
