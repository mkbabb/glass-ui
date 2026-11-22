<script setup lang="ts">
import { computed, ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import NavStage from "./nav.stage.vue";

const tabs = ref<"words" | "icons">("words");
const icons = computed(() => tabs.value === "icons");

const snippet = `<GlassDock :collapse="false" fit-content aria-label="Site">
    <DockControl
        v-for="p in pages"
        :key="p.id"
        shape="tab"
        :aria-current="p.id === page ? 'page' : undefined"
        @click="page = p.id"
    >
        {{ p.label }}
    </DockControl>
    <template #persistent-end>
        <DockSeparator />
        <DarkModeToggle size="dock" />
    </template>
</GlassDock>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="tall" field>
                <NavStage :icons="icons" />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow
                    v-model="tabs"
                    label="Tabs"
                    :options="[
                        { value: 'words', label: 'Words' },
                        { value: 'icons', label: 'Icons and words' },
                    ]"
                />
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
