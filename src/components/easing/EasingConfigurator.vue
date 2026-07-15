<script setup lang="ts">
// BB.W-EASING-PRIMITIVE — the <EasingConfigurator> register: <EasingPicker> seated
// in a <ConfiguratorLayer>/<ConfiguratorRow> shell. The fuller register a consumer
// reaches for when the curve picker is ONE row in a larger controls column (the
// value.js GradientPane consumer shape — an ease-along-the-ramp picker beside the
// gradient stops).
//
// This is a THIN composition (the picker + the configurator chassis the library
// already ships — the W-HIERARCHY vocabulary inherited, no per-studio re-author).
// The two names are ONE primitive family: <EasingPicker> is the bare editor,
// <EasingConfigurator> is the chassis-seated register; both on /easing, sharing the
// useEasingPicker composable (EasingPicker owns it; this seats EasingPicker, so the
// state is single-sourced — NO second composable instance).
import { ConfiguratorLayer, ConfiguratorRow } from "../configurator";
import EasingPicker from "./EasingPicker.vue";
import type {
    EasingPickerMode,
    EasingPickerValue,
    JumpTerm,
} from "./composables/useEasingPicker";

withDefaults(
    defineProps<{
        /** Section label for the configurator layer. */
        label?: string;
        /** A token-style sub-label (the mono caption rung). */
        name?: string;
        /** The curve-authoring mode. */
        mode?: EasingPickerMode;
        /** The initial bezier preset key. */
        preset?: string;
        /** The initial step count. */
        steps?: number;
        /** The initial step jump term. */
        term?: JumpTerm;
    }>(),
    {
        label: "Easing",
        name: undefined,
        mode: "bezier",
        preset: undefined,
        steps: undefined,
        term: undefined,
    },
);

const model = defineModel<EasingPickerValue>();
</script>

<template>
    <ConfiguratorLayer :label="label" :sub="name">
        <ConfiguratorRow label="Curve" :name="model?.css">
            <EasingPicker
                v-model="model"
                :mode="mode"
                :preset="preset"
                :steps="steps"
                :term="term"
            />
        </ConfiguratorRow>
    </ConfiguratorLayer>
</template>
