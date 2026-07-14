import { describe, expect, it } from "vitest";

import {
    detectDemoControlLive,
    isControlBound,
    isControlWired,
} from "../../scripts/proof-demo-control-live.mjs";

/**
 * BI.W-GRAIN-WIRE — the pure-detector units for proof:demo-control-live.
 *
 * Lock the story dead-control detector so it cannot regress to false-GREEN: a GREEN
 * settings fixture (the four appearance knobs wired to real inherited tokens) passes
 * clean; each RED fixture flips exactly its witness (the born-RED shapes the wave's
 * work cured — a write-only knob, a missing token write).
 */

// A GREEN settings body: the four enrolled knobs read outside their control (via the
// surfaceStyle computed / :class), and the named grain/paper/density tokens written.
const GREEN = `
<script setup lang="ts">
const grain = ref(3.5);
const density = ref("Comfortable");
const cartoonShadow = ref(true);
const paperGrain = ref(true);
const reducedMotion = ref(false);
const surfaceStyle = computed(() => {
    const grainAlpha = (grain.value / 100).toFixed(4);
    const spacing = DENSITY_SPACING[density.value];
    const style = {
        "--glass-grain-opacity": grainAlpha,
        "--paper-grain-opacity": grainAlpha,
        "--density-gap": spacing,
        "--density-pad": spacing,
    };
    if (reducedMotion.value) style["--motion-weight"] = "0";
    if (!cartoonShadow.value) style["--shadow-cartoon-md"] = "none";
    return style;
});
</script>
<template>
    <div
        class="settings-page"
        :class="{ 'paper-grain-overlay': paperGrain }"
        :style="surfaceStyle"
    >
        <LabeledSlider v-model="grain" label="Grain" />
        <LabeledSelect :model-value="density" @update:model-value="(v) => (density = v)" />
        <LabeledSwitch :checked="cartoonShadow" @update:checked="(v) => (cartoonShadow = v)" />
        <LabeledSwitch :checked="paperGrain" @update:checked="(v) => (paperGrain = v)" />
        <LabeledSwitch :checked="reducedMotion" @update:checked="(v) => (reducedMotion = v)" />
    </div>
</template>`;

describe("detectDemoControlLive — the GREEN settings fixture", () => {
    it("passes clean (no violations)", () => {
        const { violations } = detectDemoControlLive({ settingsVue: GREEN });
        expect(violations).toEqual([]);
    });

    it("marks every enrolled knob wired", () => {
        const { facts } = detectDemoControlLive({ settingsVue: GREEN });
        for (const ref of facts.enrolled) {
            expect(facts.dcl1[ref]).toEqual({ bound: true, wired: true });
        }
        expect(facts.dcl2.grainWired).toBe(true);
        expect(facts.dcl2.paperOverlayToggled).toBe(true);
        expect(facts.dcl2.densityWired).toBe(true);
    });
});

describe("detectDemoControlLive — per-witness RED fixtures", () => {
    it("DCL1: a write-only knob (bound, read nowhere) reds", () => {
        // grain bound to a slider but never read in style/class/computed.
        const RED = `
<script setup>
const grain = ref(3.5);
const cartoonShadow = ref(true);
const paperGrain = ref(true);
const reducedMotion = ref(false);
</script>
<template>
  <div class="settings-page" :class="{ 'paper-grain-overlay': paperGrain }">
    <LabeledSlider v-model="grain" label="Grain" />
    <LabeledSwitch :checked="cartoonShadow" @update:checked="(v) => (cartoonShadow = v)" />
    <LabeledSwitch :checked="reducedMotion" @update:checked="(v) => (reducedMotion = v)" />
  </div>
</template>`;
        const { facts, violations } = detectDemoControlLive({ settingsVue: RED });
        expect(facts.dcl1.grain).toEqual({ bound: true, wired: false });
        expect(facts.dcl1.cartoonShadow.wired).toBe(false);
        expect(violations.some((v: string) => v.includes("`grain` is WRITE-ONLY"))).toBe(
            true,
        );
    });

    it("DCL1: an enrolled ref bound to no control reds as no-subject", () => {
        const { violations } = detectDemoControlLive({
            settingsVue: "<template><div /></template>",
            enrolled: ["ghost"],
        });
        expect(
            violations.some((v: string) => v.includes("`ghost` is not bound")),
        ).toBe(true);
    });

    it("DCL2: a missing --glass-grain-opacity write reds the grain witness", () => {
        const RED = GREEN.replace(/"--glass-grain-opacity": grainAlpha,/, "");
        const { facts, violations } = detectDemoControlLive({ settingsVue: RED });
        expect(facts.dcl2.grainWired).toBe(false);
        expect(
            violations.some((v: string) =>
                v.includes("does not write `--glass-grain-opacity`"),
            ),
        ).toBe(true);
    });

    it("DCL2: a missing .paper-grain-overlay toggle reds the paper witness", () => {
        const RED = GREEN.replace(/:class="\{ 'paper-grain-overlay': paperGrain \}"/, "");
        const { facts } = detectDemoControlLive({ settingsVue: RED });
        expect(facts.dcl2.paperOverlayToggled).toBe(false);
    });

    it("DCL2: a missing --density-gap write reds the half-wired density witness", () => {
        const RED = GREEN.replace(/"--density-gap": spacing,/, "");
        const { facts } = detectDemoControlLive({ settingsVue: RED });
        expect(facts.dcl2.densityWired).toBe(false);
    });
});

describe("isControlWired / isControlBound — the mask primitive", () => {
    it("a ref read only in its control read-back + write is NOT wired", () => {
        const sfc = `<template><Switch :checked="x" @update:checked="(v) => (x = v)" /></template>`;
        expect(isControlBound("x", sfc)).toBe(true);
        expect(isControlWired("x", sfc)).toBe(false);
    });

    it("a ref additionally read in :class IS wired", () => {
        const sfc = `<template><Switch :checked="x" @update:checked="(v) => (x = v)" /><div :class="{ on: x }" /></template>`;
        expect(isControlWired("x", sfc)).toBe(true);
    });

    it("a ref read in a script computed IS wired", () => {
        const sfc = `<script setup>const x = ref(1); const s = computed(() => x.value * 2);</script><template><LabeledSlider v-model="x" /></template>`;
        expect(isControlWired("x", sfc)).toBe(true);
    });

    it("the declaration alone does not count as a read", () => {
        const sfc = `<script setup>const lonely = ref(1);</script><template><Switch :checked="lonely" @update:checked="(v) => (lonely = v)" /></template>`;
        expect(isControlWired("lonely", sfc)).toBe(false);
    });
});
