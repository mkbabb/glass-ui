<script setup lang="ts">
import { ref } from "vue";
import { RotateCcw } from "@lucide/vue";
import {
    ConfiguratorLayer,
    useConfiguratorState,
    type ConfiguratorPreset,
} from "@glass/components/configurator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@glass/components/select";
import { Slider } from "@glass/components/slider";
import { Switch } from "@glass/components/switch";
import { Button } from "@glass/components/button";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryEditor from "../../chassis/editor/StoryEditor.vue";
import StoryEditorRow from "../../chassis/editor/StoryEditorRow.vue";
import ConfiguratorStage from "./configurator.stage.vue";

interface Cfg {
    medium: string;
    spread: number;
    bloom: number;
    grain: boolean;
}

const MEDIUMS = ["aurora", "ink", "gouache"] as const;

const presets: readonly ConfiguratorPreset<Cfg>[] = [
    { key: "quiet", label: "Quiet", config: { medium: "ink", spread: 28, bloom: 18, grain: false } },
    { key: "default", label: "Default", config: { medium: "aurora", spread: 60, bloom: 50, grain: true } },
    { key: "lush", label: "Lush", config: { medium: "gouache", spread: 92, bloom: 82, grain: true } },
];

const cfg = useConfiguratorState<Cfg>({ presets, initialPreset: "default" });

// One layer open at a time.
const openLayer = ref<"field" | "studio" | null>("field");
function setLayer(id: "field" | "studio", open: boolean): void {
    openLayer.value = open ? id : null;
}

const detached = ref(false);
</script>

<template>
    <StoryPage form="editor">
        <template #stage>
            <StoryEditor
                :presets="presets"
                :active-preset="cfg.activePreset.value"
                :layout="detached ? 'detached' : 'attached'"
                @select-preset="cfg.selectPreset"
                @reset="cfg.resetCurrent"
            >
                <template #stage>
                    <ConfiguratorStage
                        :medium="cfg.config.medium"
                        :spread="cfg.config.spread"
                        :bloom="cfg.config.bloom"
                        :grain="cfg.config.grain"
                    />
                </template>
                <template #controls>
                    <ConfiguratorLayer
                        label="Field"
                        :open="openLayer === 'field'"
                        @update:open="setLayer('field', !!$event)"
                    >
                        <template #actions>
                            <Button
                                size="sm"
                                emphasis="quiet"
                                icon-only
                                aria-label="Reset to preset"
                                @click="cfg.resetCurrent"
                            >
                                <RotateCcw class="size-4" aria-hidden="true" />
                            </Button>
                        </template>
                        <StoryEditorRow label="Medium" for="cfg-medium">
                            <Select v-model="cfg.config.medium">
                                <SelectTrigger id="cfg-medium">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem v-for="m in MEDIUMS" :key="m" :value="m">
                                        {{ m }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </StoryEditorRow>
                        <StoryEditorRow label="Spread">
                            <Slider
                                :model-value="[cfg.config.spread]"
                                :min="0"
                                :max="100"
                                :step="1"
                                aria-label="Spread"
                                @update:model-value="(v) => v && (cfg.config.spread = v[0]!)"
                            />
                        </StoryEditorRow>
                        <StoryEditorRow label="Bloom">
                            <Slider
                                :model-value="[cfg.config.bloom]"
                                :min="0"
                                :max="100"
                                :step="1"
                                aria-label="Bloom"
                                @update:model-value="(v) => v && (cfg.config.bloom = v[0]!)"
                            />
                        </StoryEditorRow>
                        <StoryEditorRow label="Grain" for="cfg-grain">
                            <Switch id="cfg-grain" v-model="cfg.config.grain" />
                        </StoryEditorRow>
                    </ConfiguratorLayer>
                    <ConfiguratorLayer
                        label="Studio"
                        :open="openLayer === 'studio'"
                        @update:open="setLayer('studio', !!$event)"
                    >
                        <StoryEditorRow label="Detached" for="cfg-detached">
                            <Switch id="cfg-detached" v-model="detached" />
                        </StoryEditorRow>
                    </ConfiguratorLayer>
                </template>
            </StoryEditor>
        </template>
    </StoryPage>
</template>
