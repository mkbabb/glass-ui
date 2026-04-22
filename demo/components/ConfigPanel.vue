<script setup lang="ts">
import type { ConfigSection, ConfigPreset, ConfigContext } from "../backgroundConfigs";
import { Button } from "@/components/ui/button";
import ConfigFields from "./ConfigFields.vue";

const props = defineProps<{
    config: Record<string, unknown>;
    context?: ConfigContext;
    sections: ConfigSection[];
    defaults: Record<string, unknown>;
    title: string;
    presets?: ConfigPreset[];
}>();

const emptyContext: ConfigContext = {};

function ctx(): ConfigContext {
    return props.context ?? emptyContext;
}

function resetToDefaults() {
    for (const [k, v] of Object.entries(props.defaults)) {
        if (k in props.config) {
            (props.config as Record<string, unknown>)[k] = v;
        }
    }
}

function sectionVisible(section: ConfigSection): boolean {
    return section.visibleWhen ? section.visibleWhen(props.config, ctx()) : true;
}
</script>

<template>
    <div class="space-y-8">
        <div class="flex items-center justify-between">
            <h2 class="text-heading">{{ title }} Config</h2>
            <Button variant="ghost" size="sm" @click="resetToDefaults">Reset defaults</Button>
        </div>

        <div v-if="presets?.length" class="glass-default rounded-card p-4">
            <div class="flex flex-wrap items-center gap-2">
                <span class="font-display text-small text-muted-foreground mr-2">Presets</span>
                <Button
                    v-for="p in presets"
                    :key="p.label"
                    variant="glass"
                    size="sm"
                    class="rounded-pill"
                    @click="p.apply(config, ctx())"
                >{{ p.label }}</Button>
            </div>
        </div>

        <div
            v-for="section in sections"
            v-show="sectionVisible(section)"
            :key="section.title"
            class="glass-default rounded-card p-6 space-y-5"
        >
            <h3 class="text-small font-semibold text-muted-foreground uppercase tracking-wider">{{ section.title }}</h3>
            <ConfigFields
                :config="config"
                :context="ctx()"
                :fields="section.fields"
            />
        </div>
    </div>
</template>
