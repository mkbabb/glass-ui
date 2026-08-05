<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from "vue";
// The shell mounts SHEETS, never the centred plate. Deep-import the root and the three
// text atoms so the dialog BARREL does not drag `DialogContent` — and its lucide ✕ — into
// the eager boot graph for a surface that can never show either.
import Dialog from "@glass/components/dialog/Dialog.vue";
import DialogDescription from "@glass/components/dialog/DialogDescription.vue";
import DialogHeader from "@glass/components/dialog/DialogHeader.vue";
import DialogTitle from "@glass/components/dialog/DialogTitle.vue";
import SheetContent from "@glass/components/sheet/SheetContent.vue";
import { Slider } from "@glass/components/slider";
import { Switch } from "@glass/components/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@glass/components/select";
import { Label } from "@glass/components/label";
import { Button } from "@glass/components/button";
import { SegmentedTabs, type SegmentedTabOption } from "@glass/components/tabs";
import { ConfiguratorLayer, ConfiguratorRow } from "@glass/components/configurator";
import { DarkModeToggle } from "@glass/components/dark-mode-toggle";
import { PRESETS } from "./presets/manifest";
import {
    FONT_OPTIONS,
    usePresetEditor,
    type Density,
    type FontSlots,
} from "./usePresetEditor";
import { useConfiguratorOpen } from "./useConfiguratorOpen";

const CONFIG_EVENT = "glass-ui-demo:toggle-configurator";

const cfg = usePresetEditor();
// The SHARED open singleton (-SHELL) — the gear control reflects this same
// ref via aria-expanded. The Dialog binds it directly.
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
// Dark mode is owned by the canonical <DarkModeToggle>; the preset store has no
// shadow copy.

// ─── Preset — a short enum (default · neutral · custom) → the segmented register.
// The active preset's prose rides a
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

// ─── Density — a three-rung enum → the segmented register. ─────────────

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
    <!-- The gear-hosted demo configurator is controlled by the SidebarDock gear;
         the Dialog is open-controlled by `open` (driven by the `,` shortcut + the
         `glass-ui-demo:toggle-configurator` window event — both still functional)
         + the dock gear, so there is no in-component DialogTrigger. -->
    <Dialog v-model:open="open">
        <SheetContent side="right" class="glass-resting w-full sm:max-w-md p-0">
            <div class="flex h-full flex-col">
                <DialogHeader
                    class="px-(--configurator-pad-inline) pt-6 pb-4 border-b"
                    style="border-color: var(--configurator-divider)"
                >
                    <DialogTitle class="font-display text-2xl">
                        glass-ui demo Configurator
                    </DialogTitle>
                    <DialogDescription class="text-prose text-small">
                        Live-tune the design axes — glass, scale, and token presets.
                        Changes persist locally.
                    </DialogDescription>
                </DialogHeader>

                <!-- ConfiguratorLayer and ConfiguratorRow own the section hierarchy.
                     This wrapper is the single-column scroll port while Dialog owns
                     the surface. Sheet chrome and rows share --configurator-pad-inline. -->
                <div
                    class="configurator-sheet-body min-h-0 flex-1 overflow-y-auto py-3"
                >
                    <!-- Appearance — the dark toggle LEADS (: dark-mode at the TOP
                         of the gear view), now the canonical live <DarkModeToggle>. -->
                    <ConfiguratorLayer label="Appearance" :dividers="true">
                        <ConfiguratorRow
                            label="Dark mode"
                            description="The single chrome dark control — flips the live global mode."
                        >
                            <div class="flex w-full items-center justify-end">
                                <DarkModeToggle
                                    size="control"
                                    aria-label="Toggle dark mode"
                                />
                            </div>
                        </ConfiguratorRow>
                        <ConfiguratorRow
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
                            />
                        </ConfiguratorRow>
                        <ConfiguratorRow
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
                            />
                        </ConfiguratorRow>
                    </ConfiguratorLayer>

                    <!-- Preset — the segmented register (: glassy pill tabs,
                         not bare radios). The active preset's prose rides below. -->
                    <ConfiguratorLayer label="Preset">
                        <div class="space-y-2">
                            <SegmentedTabs
                                v-model="presetModel"
                                :options="PRESET_OPTIONS"
                                class="w-full"
                                aria-label="Design preset"
                            />
                            <p class="text-micro leading-snug text-muted-foreground/80">
                                {{ presetDescription }}
                            </p>
                        </div>
                    </ConfiguratorLayer>

                    <!-- Typography -->
                    <ConfiguratorLayer label="Typography" :dividers="true">
                        <ConfiguratorRow
                            v-for="slot in [
                                'serif',
                                'sans',
                                'display',
                                'mono',
                            ] as const"
                            :key="slot"
                            :label="slot[0].toUpperCase() + slot.slice(1)"
                            :name="`--font-${slot}`"
                            can-reset
                            @reset="() => cfg.setFont(slot, cfg.defaults.font[slot])"
                        >
                            <Select
                                :model-value="effectiveFont(slot)"
                                @update:model-value="
                                    (v) => v && onFontChange(slot, String(v))
                                "
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
                        </ConfiguratorRow>

                        <ConfiguratorRow
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
                            />
                        </ConfiguratorRow>
                    </ConfiguratorLayer>

                    <!-- Color & texture -->
                    <ConfiguratorLayer label="Color & texture" :dividers="true">
                        <ConfiguratorRow
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
                            />
                        </ConfiguratorRow>
                        <ConfiguratorRow
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
                            />
                        </ConfiguratorRow>
                    </ConfiguratorLayer>

                    <!-- Layout -->
                    <ConfiguratorLayer label="Layout" :dividers="true">
                        <ConfiguratorRow
                            label="Density"
                            name="--density-pad / --density-gap"
                            description="Adds deltas to story padding and gaps."
                            can-reset
                            @reset="() => cfg.clearField('density')"
                        >
                            <SegmentedTabs
                                v-model="densityModel"
                                :options="DENSITY_OPTIONS"
                                class="w-full"
                                aria-label="Layout density"
                            />
                        </ConfiguratorRow>

                        <ConfiguratorRow
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
                            />
                        </ConfiguratorRow>
                    </ConfiguratorLayer>

                    <!-- Surface -->
                    <ConfiguratorLayer label="Surface">
                        <ConfiguratorRow
                            label="Cartoon shadow"
                            name="--shadow-card / --shadow-card-hover"
                            description="Routes demo card shadows through semantic surface tokens."
                            can-reset
                            @reset="() => cfg.clearField('cartoonShadow')"
                        >
                            <div class="flex w-full items-center justify-end">
                                <Switch v-model="cartoonModel" />
                            </div>
                        </ConfiguratorRow>
                    </ConfiguratorLayer>
                </div>

                <div
                    class="configurator-footer flex items-center justify-between gap-2 px-(--configurator-pad-inline) py-4 border-t"
                >
                    <Label class="text-micro font-mono text-muted-foreground/70">
                        glass-ui-demo-config
                    </Label>
                    <Button emphasis="quiet" size="sm" @click="cfg.reset">
                        Reset all
                    </Button>
                </div>
            </div>
        </SheetContent>
    </Dialog>
</template>
