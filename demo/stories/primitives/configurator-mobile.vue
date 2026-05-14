<script setup lang="ts">
// N.W2 Lane A — mobile-density proof-of-concept.
// Renders the same Configurator content side-by-side at two density rungs
// (`mobile` vs `comfortable`) so reviewers can A/B the gap/padding ladder
// without resizing the viewport.
import { ref } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import {
    Configurator,
    ConfiguratorLayer,
    ConfiguratorRow,
} from "../../../src/components/custom/configurator";
import {
    LabeledSelect,
    LabeledSlider,
    LabeledSwitch,
} from "../../../src/components/custom/labeled-field";

const spread = ref(60);
const bloom = ref(40);
const medium = ref("paper");
const grain = ref(true);
const mediumOpen = ref(false);
const mediums = ["paper", "ink", "gouache"] as const;
</script>

<template>
    <StoryPage>
        <StorySection
            label="density axis (N.W2 Lane A)"
            blurb="`density?: 'mobile' | 'compact' | 'comfortable' | 'spacious'` cascades from `<Configurator>` to descendant `<ConfiguratorRow>` via provide/inject. Rows may override locally — prop wins. Side-by-side: same content, two rungs."
        >
            <div class="grid gap-4 lg:grid-cols-2">
                <ShowcaseFrame pad="md" tier="quiet">
                    <p class="mb-3 text-admin-label text-muted-foreground">density="mobile"</p>
                    <Configurator density="mobile" scroll-mode="never">
                        <template #stage>
                            <div class="grid h-full place-items-center p-4 text-muted-foreground">
                                <code class="fira-code text-xs">{{ medium }} · {{ spread }} · {{ bloom }}</code>
                            </div>
                        </template>
                        <ConfiguratorLayer label="Field">
                            <ConfiguratorRow label="Medium">
                                <LabeledSelect
                                    v-model="medium"
                                    v-model:is-open="mediumOpen"
                                    :items="mediums as unknown as readonly string[]"
                                    label="medium"
                                    tooltip="Painterly medium."
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Spread">
                                <LabeledSlider v-model="spread" :min="0" :max="100" :step="1" label="spread" tooltip="Field spread, 0-100." />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Bloom">
                                <LabeledSlider v-model="bloom" :min="0" :max="100" :step="1" label="bloom" tooltip="Diffusion radius." />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Grain">
                                <LabeledSwitch v-model:checked="grain" label="grain" tooltip="Paper grain overlay." />
                            </ConfiguratorRow>
                        </ConfiguratorLayer>
                    </Configurator>
                </ShowcaseFrame>

                <ShowcaseFrame pad="md" tier="quiet">
                    <p class="mb-3 text-admin-label text-muted-foreground">density="comfortable"</p>
                    <Configurator density="comfortable" scroll-mode="never">
                        <template #stage>
                            <div class="grid h-full place-items-center p-4 text-muted-foreground">
                                <code class="fira-code text-xs">{{ medium }} · {{ spread }} · {{ bloom }}</code>
                            </div>
                        </template>
                        <ConfiguratorLayer label="Field">
                            <ConfiguratorRow label="Medium">
                                <LabeledSelect
                                    v-model="medium"
                                    v-model:is-open="mediumOpen"
                                    :items="mediums as unknown as readonly string[]"
                                    label="medium"
                                    tooltip="Painterly medium."
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Spread">
                                <LabeledSlider v-model="spread" :min="0" :max="100" :step="1" label="spread" tooltip="Field spread, 0-100." />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Bloom">
                                <LabeledSlider v-model="bloom" :min="0" :max="100" :step="1" label="bloom" tooltip="Diffusion radius." />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Grain">
                                <LabeledSwitch v-model:checked="grain" label="grain" tooltip="Paper grain overlay." />
                            </ConfiguratorRow>
                        </ConfiguratorLayer>
                    </Configurator>
                </ShowcaseFrame>
            </div>
        </StorySection>
    </StoryPage>
</template>
