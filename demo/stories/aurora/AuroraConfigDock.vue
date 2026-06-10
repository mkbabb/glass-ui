<script setup lang="ts">
import { nextTick, reactive, watch } from "vue";
import { RefreshCw } from "@lucide/vue";
import { Button } from "../../../src/components/ui/button";
import { SegmentedTabs } from "../../../src/components/custom/tabs";
import { ConfiguratorLayer } from "../../../src/components/custom/configurator";
import {
    resolveAtoms,
    configToAtoms,
    type AuroraConfig,
    type AuroraAtoms,
} from "../../../src/components/custom/aurora";
import AuroraAtomsPanel from "./AuroraAtomsPanel.vue";
import CompositionLayer from "./config/CompositionLayer.vue";
import FlowLayer from "./config/FlowLayer.vue";
import MediumLayer from "./config/MediumLayer.vue";
import NucleiLayer from "./config/NucleiLayer.vue";
import PaletteLayer from "./config/PaletteLayer.vue";
import TextureLayer from "./config/TextureLayer.vue";

/**
 * The dock opens on the "Atoms" tab — the few intuitive controls (COLOR / ZONES
 * / NOISE / MEDIUM / MOTION) drive the canvas through `resolveAtoms`. The full
 * `AuroraConfig` lives behind the "Advanced" disclosure (the raw `config/*Layer.vue`
 * panels) — the escape hatch, not the default chrome.
 *
 * Data flow: the Atoms panel edits an `AuroraAtoms` object; on any atom change
 * `resolveAtoms(atoms)` is copied field-by-field onto the live `props.config`
 * reactive, so the canvas, the Advanced raw layers, and the preset dirty-detection
 * all read the one config object.
 */

const props = defineProps<{
    config: AuroraConfig;
    /**
     * Retained for the consumer's threaded layer state. The Advanced
     * disclosure now composes independently-collapsible ConfiguratorLayer
     * sections (no single "active layer" switcher), so this is no longer
     * read internally; kept on the interface so the host wiring is stable.
     */
    activeLayer?: string;
    /** "atoms" (default) | "advanced" — which top-level surface is shown. */
    tab: string;
    /**
     * The active preset key. A change ⇒ a genuine preset SWITCH (not an atom edit):
     * the atoms surface re-seeds FROM the new preset's config via `configToAtoms`, so
     * the atoms read the live preset and the first atom touch REFINES rather than
     * clobbering to the wispy-sky default (the W-AUR-STUDIO D4 atoms-trap fix).
     */
    presetKey?: string;
}>();

const emit = defineEmits<{
    (e: "update:activeLayer", v: string): void;
    (e: "update:tab", v: string): void;
    (e: "reset"): void;
}>();

// The Atoms surface state — the ≤7 control elements. SEEDED FROM the active preset's
// config (`configToAtoms`), so the atoms read the live preset on mount + every switch;
// editing one writes the resolved config back onto props.config (refines, not clobbers).
const atoms = reactive<AuroraAtoms>(configToAtoms(props.config));

/** A stable deep snapshot of the preset BASELINE (taken on seed). The atoms resolve OVER
 *  this, so the ~21 non-atom fields the ≤7-knob projection does not carry (the hero's
 *  stroke params, the hand-authored palette) SURVIVE every atom touch — the first edit
 *  REFINES the preset rather than clobbering it to the wispy-sky default. */
function snapshot(c: AuroraConfig): AuroraConfig {
    return JSON.parse(JSON.stringify(c)) as AuroraConfig;
}
let presetBaseline: AuroraConfig = snapshot(props.config);
// The seeded seed/harmony at baseline. The seed atom RE-DERIVES the palette (its purpose),
// so over a preset baseline we only re-derive when the user actually MOVES a color-source
// atom (seed/harmony) — an UNTOUCHED seed keeps the preset's hand-authored palette intact.
let seededSeed = atoms.seed;
let seededHarmony = atoms.harmony;

/** Resolve the atoms OVER the preset baseline + copy onto the live reactive in place
 *  (preserve proxy identity so the canvas/Advanced layers keep their reactivity). */
function applyAtoms() {
    const colorSourceMoved =
        atoms.seed !== seededSeed || atoms.harmony !== seededHarmony;
    // Strip the palette-re-derive trigger (seed/harmony) unless the user moved it, so an
    // energy/zone/noise/medium/motion refinement keeps the preset's authored palette; the
    // energy's saturation/value/breath legs still apply over the base.
    const next: AuroraAtoms = {
        ...atoms,
        zones: { ...atoms.zones! },
        medium: { ...atoms.medium! },
        ...(colorSourceMoved ? {} : { seed: undefined, harmony: undefined }),
    };
    const resolved = resolveAtoms(next, presetBaseline);
    Object.assign(props.config, resolved);
}

// Drive the canvas whenever any atom changes (deep — the zones/medium nested objects).
// Suppressed while re-seeding FROM a preset switch (the seed is a config→atoms read, not
// an atoms→config write — otherwise the lossy seed would clobber the full preset config).
let seeding = false;
watch(atoms, () => {
    if (seeding) return;
    applyAtoms();
}, { deep: true });

/** Re-seed the atoms surface from the live config (on a genuine preset switch). The new
 *  config becomes the baseline the subsequent atom edits refine OVER. */
function reseedFromConfig() {
    seeding = true;
    presetBaseline = snapshot(props.config);
    Object.assign(atoms, configToAtoms(props.config));
    seededSeed = atoms.seed;
    seededHarmony = atoms.harmony;
    // Release the guard AFTER the deep watcher's flush so the seed's own mutation does
    // not write the lossy projection back over the preset's full-fidelity config.
    void Promise.resolve().then(() => {
        seeding = false;
    });
}

// A preset-key change is a genuine SWITCH — re-seed the atoms from the new preset's
// config so the atoms surface is a TRUE projection of the live preset (the D4 fix).
watch(
    () => props.presetKey,
    (next, prev) => {
        if (next !== undefined && next !== prev) reseedFromConfig();
    },
);

const TOP_TABS = [
    { label: "Atoms", value: "atoms" },
    { label: "Advanced", value: "advanced" },
] as const;

function setTab(next: string | string[]) {
    emit("update:tab", String(next));
}

// Reset restores the preset baseline onto props.config in the host; re-seed the atoms
// from the reverted config so the atoms surface stays a true projection (same D4 fix as
// a preset switch). nextTick lets the host's resetCurrent mutation flush first.
function onReset() {
    emit("reset");
    void nextTick(reseedFromConfig);
}
</script>

<template>
    <div class="flex h-full flex-col">
        <!-- Header with reset -->
        <div class="flex items-center justify-between gap-2 border-b border-border/40 px-3 py-2">
            <p class="text-admin-label text-muted-foreground">Aurora</p>
            <Button
                variant="ghost"
                size="sm"
                class="h-7 gap-1.5 px-2 text-caption"
                :aria-label="'Reset current preset'"
                @click="onReset"
            >
                <RefreshCw :size="12" />
                Reset
            </Button>
        </div>

        <!--
          Top-level Atoms ↔ Advanced switch. The Atoms tab is the DEFAULT surface
          (the ≤7 control elements); Advanced is the raw ~28-field escape hatch.
        -->
        <div class="border-b border-border/40 px-3 py-2">
            <SegmentedTabs
                :options="[...TOP_TABS]"
                :model-value="tab"
                variant="pill"
                @update:model-value="setTab"
            />
        </div>

        <!-- ── Atoms surface (DEFAULT) — drives the canvas via resolveAtoms. ── -->
        <div
            v-show="tab === 'atoms'"
            class="flex-1 min-h-0 overflow-y-auto overflow-x-clip scroll-fade-y scrollbar-hidden"
            data-aurora-atoms-surface
        >
            <AuroraAtomsPanel v-model:atoms="atoms" />
        </div>

        <!-- ── Advanced surface — the raw config layers (the escape hatch). ──
             Composes the library's own ConfiguratorLayer collapse sections
             (independently expandable) instead of a DockLayerGroup crossfade —
             the idiomatic preset-controls column the studio is built to use. -->
        <template v-if="tab === 'advanced'">
            <div class="flex-1 min-h-0 overflow-y-auto overflow-x-clip scroll-fade-y scrollbar-hidden">
                <ConfiguratorLayer label="Medium">
                    <MediumLayer :config="config" />
                </ConfiguratorLayer>
                <ConfiguratorLayer label="Palette" :default-open="false">
                    <PaletteLayer :config="config" />
                </ConfiguratorLayer>
                <ConfiguratorLayer label="Flow" :default-open="false">
                    <FlowLayer :config="config" />
                </ConfiguratorLayer>
                <ConfiguratorLayer label="Texture" :default-open="false">
                    <TextureLayer :config="config" />
                </ConfiguratorLayer>
                <ConfiguratorLayer label="Comp" :default-open="false">
                    <CompositionLayer :config="config" />
                </ConfiguratorLayer>
                <ConfiguratorLayer label="Nuclei" :default-open="false">
                    <NucleiLayer :config="config" />
                </ConfiguratorLayer>
            </div>
        </template>
    </div>
</template>
