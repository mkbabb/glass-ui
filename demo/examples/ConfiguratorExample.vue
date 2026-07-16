<script setup lang="ts">
import {
    useConfiguratorState,
    type ConfiguratorPreset,
} from "@glass/components/configurator";
import { Button } from "@glass/components/button";

interface ExampleConfig {
    intensity: number;
}

const presets: readonly ConfiguratorPreset<ExampleConfig>[] = [
    { key: "quiet", label: "Quiet", config: { intensity: 25 } },
    { key: "bold", label: "Bold", config: { intensity: 80 } },
];

const studio = useConfiguratorState({ presets, initialPreset: "quiet" });
</script>

<template>
    <div class="flex flex-wrap items-center gap-3">
        <Button size="sm" @click="studio.cyclePreset()">Cycle preset</Button>
        <Button size="sm" @click="studio.config.intensity += 5">
            Raise intensity
        </Button>
        <output class="text-mono-caption">
            {{ studio.activePreset }} · {{ studio.config.intensity }} ·
            {{ studio.isDirty ? "edited" : "preset" }}
        </output>
    </div>
</template>
