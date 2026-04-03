<script setup lang="ts">
import type { ConfigSection } from "../backgroundConfigs";
import { LabeledSlider } from "@/components/custom/labeled-field";
import { Button } from "@/components/ui/button";
import {
    Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem,
} from "@/components/ui/select";

const props = defineProps<{
    config: Record<string, unknown>;
    sections: ConfigSection[];
    defaults: Record<string, unknown>;
    title: string;
}>();

function resetToDefaults() {
    for (const [k, v] of Object.entries(props.defaults)) {
        if (k in props.config) {
            (props.config as Record<string, unknown>)[k] = v;
        }
    }
}
</script>

<template>
    <div class="space-y-8">
        <div class="flex items-center justify-between">
            <h2 class="text-heading">{{ title }} Config</h2>
            <Button variant="ghost" size="sm" @click="resetToDefaults">Reset defaults</Button>
        </div>

        <div v-for="section in sections" :key="section.title" class="glass-default rounded-card p-6 space-y-5">
            <h3 class="text-small font-semibold text-muted-foreground uppercase tracking-wider">{{ section.title }}</h3>
            <div class="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
                <div v-for="field in section.fields" :key="field.key" class="space-y-1">
                    <template v-if="field.type === 'slider'">
                        <LabeledSlider
                            :model-value="(config[field.key] as number)"
                            :label="field.label"
                            :tooltip="field.tooltip"
                            :min="field.min!"
                            :max="field.max!"
                            :step="field.step!"
                            @update:model-value="(v: number) => (config as Record<string, unknown>)[field.key] = v"
                        />
                        <span class="text-micro text-muted-foreground font-mono">{{ (config[field.key] as number).toFixed(field.step! < 1 ? 2 : 0) }}</span>
                    </template>

                    <template v-else-if="field.type === 'select'">
                        <label class="font-display text-base text-muted-foreground">{{ field.label }}</label>
                        <Select
                            :model-value="(config[field.key] as string)"
                            @update:model-value="(v) => (config as Record<string, unknown>)[field.key] = v"
                        >
                            <SelectTrigger class="font-mono-code">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup class="font-mono-code">
                                    <SelectItem v-for="item in field.items" :key="item" :value="item">{{ item }}</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
