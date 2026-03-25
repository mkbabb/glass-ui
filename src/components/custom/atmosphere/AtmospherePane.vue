<template>
    <Card variant="pane" class="flex flex-col min-w-0 min-h-0 max-h-full overflow-hidden">
        <CardHeader class="font-display m-0 pt-3 pb-0 relative w-full px-3 sm:px-6 min-w-0">
            <h2 class="text-lg font-semibold">Atmosphere</h2>
            <p class="text-pane-description">Background canvas tuning.</p>
        </CardHeader>

        <CardContent class="flex flex-col w-full px-3 sm:px-6 pt-2 pb-0 min-w-0 lg:flex-1 lg:min-h-0 overflow-y-auto">
            <template v-for="(section, si) in sections" :key="section.title">
                <Separator v-if="si > 0" class="my-1" />
                <div class="flex flex-col gap-1.5 py-2">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="section-label">{{ section.title }}</h3>
                            <p class="font-mono-code text-2xs text-muted-foreground/60 leading-tight">{{ section.desc }}</p>
                        </div>
                        <button
                            class="p-1 rounded-md text-muted-foreground/50 hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
                            title="Reset section"
                            @click="resetSection(section.params)"
                        >
                            <RotateCcw class="w-3 h-3" />
                        </button>
                    </div>
                    <div v-for="p in section.params" :key="p.key" class="flex flex-col gap-0.5">
                        <div class="flex justify-between items-baseline">
                            <div class="flex items-baseline gap-1.5">
                                <span class="font-mono-code text-2xs text-foreground/80">{{ p.label }}</span>
                                <span class="font-mono-code text-2xs text-muted-foreground/40 hidden sm:inline">&mdash; {{ p.desc }}</span>
                            </div>
                            <span class="font-mono-code text-2xs tabular-nums text-foreground/60">{{ fmt(p) }}</span>
                        </div>
                        <Slider
                            :model-value="[(cfg as any)[p.key]]"
                            :min="p.min"
                            :max="p.max"
                            :step="p.step"
                            @update:model-value="(v: number[]) => set(p.key, v[0]!)"
                        />
                    </div>
                </div>
            </template>
        </CardContent>

        <!-- Fixed footer -->
        <div class="flex justify-center gap-2 px-3 sm:px-6 py-3 border-t border-border/50">
            <Button
                variant="outline"
                size="sm"
                class="rounded-full font-mono-code text-xs gap-1.5 cursor-pointer"
                @click="resetAll"
            >
                <RotateCcw class="w-3 h-3" />
                Reset all
            </Button>
            <Button
                variant="outline"
                size="sm"
                class="rounded-full font-mono-code text-xs gap-1.5 cursor-pointer"
                :class="copyState === 'ok' ? 'border-green-500/50 text-green-600 dark:text-green-400' : copyState === 'err' ? 'border-destructive/50 text-destructive' : ''"
                @click="copyJson"
            >
                <Check v-if="copyState === 'ok'" class="w-3 h-3" />
                <XIcon v-else-if="copyState === 'err'" class="w-3 h-3" />
                <Copy v-else class="w-3 h-3" />
                {{ copyState === 'ok' ? 'Copied' : copyState === 'err' ? 'Failed' : 'Copy JSON' }}
            </Button>
        </div>
    </Card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Card, CardHeader, CardContent } from "../../ui/card";
import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";
import { Slider } from "../../ui/slider";
import { RotateCcw, Copy, Check, X as XIcon } from "lucide-vue-next";
import { copyToClipboard } from "../../../composables/useClipboard";
import {
    DEFAULT_ATMOSPHERE_CONFIG,
    ATMOSPHERE_SECTIONS,
} from "./composables/atmosphereConfig";
import type {
    AtmosphereConfig,
    AtmosphereParam,
} from "./composables/atmosphereConfig";

const props = withDefaults(
    defineProps<{
        config: AtmosphereConfig;
        /** Override reset targets (defaults to DEFAULT_ATMOSPHERE_CONFIG) */
        defaults?: AtmosphereConfig;
    }>(),
    {
        defaults: () => DEFAULT_ATMOSPHERE_CONFIG,
    },
);

const cfg = props.config;
const copyState = ref<"idle" | "ok" | "err">("idle");
const sections = ATMOSPHERE_SECTIONS;
const allParams = sections.flatMap((s) => s.params);

function fmt(p: AtmosphereParam): string {
    const v = (cfg as any)[p.key] as number;
    return p.step >= 1 ? String(v) : v.toFixed(2);
}

function set(key: keyof AtmosphereConfig, v: number) {
    (cfg as any)[key] = v;
}

function resetSection(params: AtmosphereParam[]) {
    for (const p of params) {
        (cfg as any)[p.key] = props.defaults[p.key];
    }
}

function resetAll() {
    Object.assign(cfg, props.defaults);
}

async function copyJson() {
    const snapshot: Record<string, number> = {};
    for (const p of allParams) snapshot[p.key] = (cfg as any)[p.key];
    copyState.value = (await copyToClipboard(JSON.stringify(snapshot, null, 2))) ? "ok" : "err";
    setTimeout(() => { copyState.value = "idle"; }, 2000);
}
</script>
