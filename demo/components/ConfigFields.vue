<script setup lang="ts">
import { computed } from "vue";
import type { ConfigField, ConfigContext } from "../backgroundConfigs";
import type { OklchStop } from "@/components/custom/aurora";
import { LabeledSlider } from "@/components/custom/labeled-field";
import { Button } from "@/components/ui/button";
import {
    Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem,
} from "@/components/ui/select";
import OklchEditor from "./OklchEditor.vue";

defineOptions({ name: "ConfigFields" });

const props = defineProps<{
    config: Record<string, unknown>;
    context: ConfigContext;
    fields: ConfigField[];
}>();

// ── Path helpers (support dotted keys like "palette.hem") ────────────────
function getByPath(obj: Record<string, unknown>, path: string): unknown {
    return path.split(".").reduce<unknown>(
        (cur, seg) => (cur == null ? undefined : (cur as Record<string, unknown>)[seg]),
        obj,
    );
}

function setByPath(obj: Record<string, unknown>, path: string, value: unknown): void {
    const segs = path.split(".");
    let cur: Record<string, unknown> = obj;
    for (let i = 0; i < segs.length - 1; i++) {
        const seg = segs[i]!;
        const next = cur[seg];
        if (next == null || typeof next !== "object") cur[seg] = {};
        cur = cur[seg] as Record<string, unknown>;
    }
    cur[segs[segs.length - 1]!] = value;
}

function target(field: ConfigField): Record<string, unknown> {
    return field.target === "context" ? props.context : props.config;
}

function get(field: ConfigField): unknown {
    return getByPath(target(field), field.key);
}

function set(field: ConfigField, value: unknown): void {
    setByPath(target(field), field.key, value);
}

function visible(field: ConfigField): boolean {
    return field.visibleWhen ? field.visibleWhen(props.config, props.context) : true;
}

// ── Select coercion for numeric union types ───────────────────────────────
function onSelect(field: ConfigField, v: unknown) {
    const current = get(field);
    if (typeof current === "number") {
        const n = Number(v);
        set(field, Number.isFinite(n) ? n : current);
    } else {
        set(field, v);
    }
}

// ── Array item management ─────────────────────────────────────────────────
function arrayValue(field: ConfigField): Array<Record<string, unknown>> {
    const v = get(field);
    return Array.isArray(v) ? (v as Array<Record<string, unknown>>) : [];
}

function addItem(field: ConfigField) {
    const arr = arrayValue(field);
    if (field.maxItems != null && arr.length >= field.maxItems) return;
    const next = field.itemDefault ? field.itemDefault() : {};
    set(field, [...arr, next]);
}

function removeItem(field: ConfigField, index: number) {
    const arr = arrayValue(field);
    if (field.minItems != null && arr.length <= field.minItems) return;
    set(field, arr.filter((_, i) => i !== index));
}

// ── Slider precision ──────────────────────────────────────────────────────
function displayValue(field: ConfigField, v: number): string {
    const step = field.step ?? 1;
    if (step >= 1) return v.toFixed(0);
    if (step >= 0.01) return v.toFixed(2);
    if (step >= 0.001) return v.toFixed(3);
    return v.toFixed(4);
}

// ── Expansion state for array items ───────────────────────────────────────
const expanded = computed(() => new Map<string, boolean>());
function isExpanded(field: ConfigField, i: number): boolean {
    return expanded.value.get(`${field.key}:${i}`) ?? (i === 0);
}
function toggleExpanded(field: ConfigField, i: number) {
    const key = `${field.key}:${i}`;
    expanded.value.set(key, !isExpanded(field, i));
}
</script>

<template>
    <div class="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
        <template v-for="field in fields" :key="field.key">
            <div v-if="visible(field)" :class="field.type === 'array' || field.type === 'oklch' ? 'md:col-span-2' : ''" class="space-y-1">
                <template v-if="field.type === 'slider'">
                    <LabeledSlider
                        :model-value="(get(field) as number)"
                        :label="field.label"
                        :tooltip="field.tooltip"
                        :min="field.min!"
                        :max="field.max!"
                        :step="field.step!"
                        @update:model-value="(v: number) => set(field, v)"
                    />
                    <span class="text-micro text-muted-foreground font-mono">{{ displayValue(field, get(field) as number) }}</span>
                </template>

                <template v-else-if="field.type === 'select'">
                    <label class="font-display text-base text-muted-foreground" :title="field.tooltip">{{ field.label }}</label>
                    <Select
                        :model-value="String(get(field))"
                        @update:model-value="(v) => onSelect(field, v)"
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

                <template v-else-if="field.type === 'color'">
                    <label class="font-display text-base text-muted-foreground" :title="field.tooltip">{{ field.label }}</label>
                    <input
                        type="color"
                        :value="(get(field) as string)"
                        class="h-9 w-full cursor-pointer appearance-none rounded-pill border-2 border-border/30 bg-transparent p-0 [&::-webkit-color-swatch-wrapper]:p-1 [&::-webkit-color-swatch]:rounded-pill [&::-webkit-color-swatch]:border-none"
                        @input="(e) => set(field, (e.target as HTMLInputElement).value)"
                    />
                </template>

                <template v-else-if="field.type === 'oklch'">
                    <OklchEditor
                        :model-value="(get(field) as OklchStop)"
                        :label="field.label"
                        :tooltip="field.tooltip"
                        @update:model-value="(v) => set(field, v)"
                    />
                </template>

                <template v-else-if="field.type === 'array'">
                    <div class="flex items-center justify-between">
                        <label class="font-display text-base text-muted-foreground" :title="field.tooltip">
                            {{ field.label }}
                            <span class="ml-2 text-micro text-muted-foreground font-mono">({{ arrayValue(field).length }})</span>
                        </label>
                        <Button
                            variant="glass-subtle"
                            size="sm"
                            class="h-7 rounded-pill px-3 text-micro"
                            :disabled="field.maxItems != null && arrayValue(field).length >= field.maxItems"
                            @click="addItem(field)"
                        >+ Add</Button>
                    </div>
                    <div class="space-y-3 mt-2">
                        <div
                            v-for="(item, i) in arrayValue(field)"
                            :key="i"
                            class="glass-subtle rounded-panel p-4"
                        >
                            <div class="flex items-center justify-between mb-3">
                                <button
                                    type="button"
                                    class="flex items-center gap-2 font-display text-small hover:text-foreground"
                                    @click="toggleExpanded(field, i)"
                                >
                                    <span class="inline-block w-3 text-muted-foreground">{{ isExpanded(field, i) ? '▾' : '▸' }}</span>
                                    {{ field.itemLabel ? field.itemLabel(i, item) : `Item ${i + 1}` }}
                                </button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    class="h-6 rounded-pill px-2 text-micro text-muted-foreground hover:text-destructive"
                                    :disabled="field.minItems != null && arrayValue(field).length <= field.minItems"
                                    @click="removeItem(field, i)"
                                >Remove</Button>
                            </div>
                            <ConfigFields
                                v-if="isExpanded(field, i)"
                                :config="item"
                                :context="context"
                                :fields="field.itemFields ?? []"
                            />
                        </div>
                    </div>
                </template>
            </div>
        </template>
    </div>
</template>
