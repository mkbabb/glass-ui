<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from "vue";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "../../src/components/ui/sheet";
import { Slider } from "../../src/components/ui/slider";
import { Switch } from "../../src/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../src/components/ui/select";
import { Label } from "../../src/components/ui/label";
import { Button } from "../../src/components/ui/button";
import {
    SegmentedTabs,
    type SegmentedTabOption,
} from "../../src/components/custom/tabs";
import { PRESETS } from "../presets/manifest";
import {
    FONT_OPTIONS,
    usePresetEditor,
    type Density,
    type FontSlots,
} from "./usePresetEditor";
import { useConfiguratorOpen } from "./useConfiguratorOpen";
import PresetEditorField from "./PresetEditorField.vue";

const CONFIG_EVENT = "glass-ui-demo:toggle-configurator";

const cfg = usePresetEditor();
// The SHARED open singleton (AZ.R4-SHELL) — the gear control reflects this same
// ref via aria-expanded. The Sheet binds it directly.
const { open, toggle } = useConfiguratorOpen();

// ─── External event wiring ────────────────────────────────────────────────

function onToggleEvent(): void {
    toggle();
}

onMounted(() => {
    window.addEventListener(CONFIG_EVENT, onToggleEvent);
});
onBeforeUnmount(() => {
    window.removeEventListener(CONFIG_EVENT, onToggleEvent);
});

// ─── Slider bindings — Reka sliders model number[] ────────────────────────

function num(v: unknown, fallback: number): number {
    if (Array.isArray(v) && typeof v[0] === "number") return v[0];
    if (typeof v === "number") return v;
    return fallback;
}

const scaleBaseModel = computed<number[]>({
    get: () => [cfg.effective("scaleBase")],
    set: (v) => cfg.setField("scaleBase", num(v, cfg.defaults.scaleBase)),
});
const hueShiftModel = computed<number[]>({
    get: () => [cfg.effective("hueShift")],
    set: (v) => cfg.setField("hueShift", num(v, cfg.defaults.hueShift)),
});
const grainModel = computed<number[]>({
    get: () => [cfg.effective("grain")],
    set: (v) => cfg.setField("grain", num(v, cfg.defaults.grain)),
});
const radiusModel = computed<number[]>({
    get: () => [cfg.effective("radius")],
    set: (v) => cfg.setField("radius", num(v, cfg.defaults.radius)),
});

const glassLevelModel = computed<number[]>({
    get: () => [cfg.effective("glassLevel")],
    set: (v) => cfg.setField("glassLevel", num(v, cfg.defaults.glassLevel)),
});
const scaleModel = computed<number[]>({
    get: () => [cfg.effective("scale")],
    set: (v) => cfg.setField("scale", num(v, cfg.defaults.scale)),
});

const cartoonModel = computed<boolean>({
    get: () => cfg.effective("cartoonShadow"),
    set: (v) => cfg.setField("cartoonShadow", v),
});
const darkModel = computed<boolean>({
    get: () => cfg.effective("dark"),
    set: (v) => cfg.setField("dark", v),
});
const motionModel = computed<boolean>({
    get: () => cfg.effective("motion"),
    set: (v) => cfg.setField("motion", v),
});

// ─── Preset — a short enum (default · neutral · custom) → the segmented register
// (R4-4: glassy pill tabs, not bare radios). The active preset's prose rides a
// description line BELOW the strip so the choice keeps its rationale. ──────────

const PRESET_OPTIONS = computed<SegmentedTabOption[]>(() => [
    ...PRESETS.map((p) => ({ label: p.label, value: p.id })),
    { label: "Custom", value: "custom" },
]);

const presetModel = computed<string>({
    get: () => cfg.effective("preset"),
    set: (v) => {
        if (v) cfg.setPreset(v as "default" | "neutral" | "custom");
    },
});

const presetDescription = computed<string>(() => {
    const id = cfg.effective("preset");
    if (id === "custom") {
        return `Based on ${presetLabel("default")} with local overrides — any field you touch flips here.`;
    }
    return PRESETS.find((p) => p.id === id)?.description ?? "";
});

// ─── Density — a three-rung enum → the segmented register (R4-4). ─────────────

const DENSITY_OPTIONS: SegmentedTabOption[] = (
    ["cozy", "comfortable", "compact"] as const
).map((d) => ({ label: d[0].toUpperCase() + d.slice(1), value: d }));

const densityModel = computed<string>({
    get: () => cfg.effective("density"),
    set: (v) => cfg.setField("density", v as Density),
});

function onFontChange(slot: keyof FontSlots, stack: string): void {
    cfg.setFont(slot, stack);
}

function presetLabel(id: string): string {
    return PRESETS.find((p) => p.id === id)?.label ?? id;
}

function effectiveFont(slot: keyof FontSlots): string {
    return cfg.effectiveFont(slot);
}
</script>

<template>
    <!-- AZ.W-SHELL-CONFIG — the gear-hosted demo configurator. The floating FAB
         is GONE (the open is rehomed onto the SidebarDock gear DockIconButton);
         the Sheet is open-controlled by `open` (driven by the `,` shortcut + the
         `glass-ui-demo:toggle-configurator` window event — both still functional)
         + the dock gear, so there is no in-component SheetTrigger. -->
    <Sheet v-model:open="open">
        <SheetContent
            side="right"
            class="glass-resting w-full sm:max-w-md overflow-y-auto p-0"
        >
            <div class="flex h-full flex-col">
                <SheetHeader class="px-6 pt-6 pb-4 border-b border-border/40">
                    <SheetTitle class="font-display text-2xl">
                        glass-ui demo Configurator
                    </SheetTitle>
                    <SheetDescription class="text-prose text-sm">
                        Live-tune the post-W54 design axes — glass, scale, motion,
                        and the token presets. Changes persist locally.
                    </SheetDescription>
                </SheetHeader>

                <div class="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                    <!-- Appearance — the dark toggle leads (R4-3: dark-mode at the
                         TOP of the gear view), then the post-W54 design axes:
                         --glass-level (the maximal-glass knob), --ui-scale (the
                         global comfort scalar), and the reduced-motion override. -->
                    <section class="space-y-1">
                        <h3 class="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                            Appearance
                        </h3>
                        <PresetEditorField
                            label="Dark mode"
                            description="Mirrors the global dark toggle — the single chrome dark control."
                            can-reset
                            @reset="() => cfg.clearField('dark')"
                        >
                            <div class="flex w-full items-center justify-end">
                                <Switch v-model="darkModel" />
                            </div>
                        </PresetEditorField>
                        <PresetEditorField
                            label="Glass level"
                            name="--glass-level"
                            :description="`${cfg.effective('glassLevel').toFixed(2)} — 0 opaque · 1 calibrated · >1 clearer`"
                            can-reset
                            @reset="() => cfg.clearField('glassLevel')"
                        >
                            <Slider
                                v-model="glassLevelModel"
                                :min="0"
                                :max="1.5"
                                :step="0.05"
                                class="w-full"
                            />
                        </PresetEditorField>
                        <PresetEditorField
                            label="UI scale"
                            name="--ui-scale"
                            :description="`${cfg.effective('scale').toFixed(2)}× — the global comfort scalar (the dock derives from it)`"
                            can-reset
                            @reset="() => cfg.clearField('scale')"
                        >
                            <Slider
                                v-model="scaleModel"
                                :min="0.85"
                                :max="1.5"
                                :step="0.05"
                                class="w-full"
                            />
                        </PresetEditorField>
                        <PresetEditorField
                            label="Reduce motion"
                            name="--demo-reduce-motion"
                            description="Force-reduce spatial animation this session (overrides the system preference)."
                            can-reset
                            @reset="() => cfg.clearField('motion')"
                        >
                            <div class="flex w-full items-center justify-end">
                                <Switch v-model="motionModel" />
                            </div>
                        </PresetEditorField>
                    </section>

                    <!-- Preset — the segmented register (R4-4: glassy pill tabs,
                         not bare radios). The active preset's prose rides below. -->
                    <section class="space-y-2">
                        <h3 class="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                            Preset
                        </h3>
                        <SegmentedTabs
                            v-model="presetModel"
                            variant="segmented"
                            :options="PRESET_OPTIONS"
                            class="w-full"
                            aria-label="Design preset"
                        />
                        <p class="text-micro leading-snug text-muted-foreground/80">
                            {{ presetDescription }}
                        </p>
                    </section>

                    <!-- Typography -->
                    <section class="space-y-1">
                        <h3 class="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                            Typography
                        </h3>
                        <PresetEditorField
                            v-for="slot in (['serif', 'sans', 'display', 'mono'] as const)"
                            :key="slot"
                            :label="slot[0].toUpperCase() + slot.slice(1)"
                            :name="`--font-${slot}`"
                            can-reset
                            @reset="() => cfg.setFont(slot, cfg.defaults.font[slot])"
                        >
                            <Select
                                :model-value="effectiveFont(slot)"
                                @update:model-value="(v) => v && onFontChange(slot, String(v))"
                            >
                                <SelectTrigger class="w-full">
                                    <SelectValue placeholder="Select font" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem
                                        v-for="opt in FONT_OPTIONS"
                                        :key="opt.id"
                                        :value="opt.stack"
                                    >
                                        {{ opt.label }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </PresetEditorField>

                        <PresetEditorField
                            label="Scale base"
                            name="--type-body"
                            :description="`${cfg.effective('scaleBase')}px`"
                            can-reset
                            @reset="() => cfg.clearField('scaleBase')"
                        >
                            <Slider
                                v-model="scaleBaseModel"
                                :min="14"
                                :max="18"
                                :step="0.5"
                                class="w-full"
                            />
                        </PresetEditorField>
                    </section>

                    <!-- Color & texture -->
                    <section class="space-y-1">
                        <h3 class="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                            Color & texture
                        </h3>
                        <PresetEditorField
                            label="Hue shift"
                            name="--hue-shift"
                            :description="`${cfg.effective('hueShift')}° — rotates sections via filter`"
                            can-reset
                            @reset="() => cfg.clearField('hueShift')"
                        >
                            <Slider
                                v-model="hueShiftModel"
                                :min="-180"
                                :max="180"
                                :step="1"
                                class="w-full"
                            />
                        </PresetEditorField>
                        <PresetEditorField
                            label="Grain"
                            name="--glass-grain-opacity"
                            :description="cfg.effective('grain').toFixed(3)"
                            can-reset
                            @reset="() => cfg.clearField('grain')"
                        >
                            <Slider
                                v-model="grainModel"
                                :min="0"
                                :max="0.1"
                                :step="0.005"
                                class="w-full"
                            />
                        </PresetEditorField>
                    </section>

                    <!-- Layout -->
                    <section class="space-y-1">
                        <h3 class="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                            Layout
                        </h3>
                        <PresetEditorField
                            label="Density"
                            name="--density-pad / --density-gap"
                            description="Adds deltas to story padding and gaps."
                            can-reset
                            @reset="() => cfg.clearField('density')"
                        >
                            <SegmentedTabs
                                v-model="densityModel"
                                variant="segmented"
                                :options="DENSITY_OPTIONS"
                                class="w-full"
                                aria-label="Layout density"
                            />
                        </PresetEditorField>

                        <PresetEditorField
                            label="Radius"
                            name="--radius"
                            :description="`${cfg.effective('radius')}px`"
                            can-reset
                            @reset="() => cfg.clearField('radius')"
                        >
                            <Slider
                                v-model="radiusModel"
                                :min="0"
                                :max="16"
                                :step="1"
                                class="w-full"
                            />
                        </PresetEditorField>
                    </section>

                    <!-- Toggles -->
                    <section class="space-y-1">
                        <h3 class="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                            Surface
                        </h3>
                        <PresetEditorField
                            label="Cartoon shadow"
                            name="--shadow-card / --shadow-card-hover"
                            description="Routes demo card shadows through semantic surface tokens."
                            can-reset
                            @reset="() => cfg.clearField('cartoonShadow')"
                        >
                            <div class="flex w-full items-center justify-end">
                                <Switch v-model="cartoonModel" />
                            </div>
                        </PresetEditorField>
                    </section>
                </div>

                <div class="flex items-center justify-between gap-2 px-6 py-4 border-t border-border/40">
                    <Label class="text-micro font-mono text-muted-foreground/70">
                        glass-ui-demo-config
                    </Label>
                    <Button variant="ghost" size="sm" @click="cfg.reset">
                        Reset all
                    </Button>
                </div>
            </div>
        </SheetContent>
    </Sheet>
</template>
