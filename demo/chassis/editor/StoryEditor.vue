<script setup lang="ts">
// StoryEditor: the editor form. The studio fills the page under the header: the stage
// on the left, the editor column on the right with its presets as one chip row at the
// top. Narrow, the same pieces stack: presets, stage, editor. Only the editor column
// scrolls; the stage never moves. The page header is the studio's only name.
import {
    Configurator,
    type ConfiguratorLayout,
    type ConfiguratorPreset,
} from "@glass/components/configurator";

withDefaults(
    defineProps<{
        presets?: readonly ConfiguratorPreset<unknown>[];
        activePreset?: string;
        layout?: ConfiguratorLayout;
    }>(),
    { layout: "attached" },
);

const emit = defineEmits<{
    (e: "select-preset", key: string): void;
    (e: "reset"): void;
}>();
</script>

<template>
    <div class="story-editor" data-story-stage="fill">
        <Configurator
            gallery-placement="aside"
            aside-side="right"
            :aside-width="['400px', '400px']"
            :presets="presets"
            :active-preset="activePreset"
            :layout="layout"
            class="story-editor-shell"
            @select-preset="(k: string) => emit('select-preset', k)"
            @reset="() => emit('reset')"
        >
            <template #stage>
                <slot name="stage" />
            </template>
            <template #controls>
                <slot name="controls" />
            </template>
            <template v-if="$slots.presets" #presets="scope">
                <slot name="presets" v-bind="scope" />
            </template>
        </Configurator>
    </div>
</template>
