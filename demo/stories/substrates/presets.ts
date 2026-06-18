// BB.W-VIZ-SUITE (W-FLOWFIELD) — the demo presets for the substrates-band new viz.
//
// PRESETS-IN-CONSUMERS (the binding fence). The reference teal-on-navy reproduction is a
// DEMO preset here, NEVER a library token — the library default is warm-cream identity
// (`DEFAULT_FLOW_CONFIG`). This file lives in the DEMO tree; `proof:flow-field` clause 5
// reds a teal/navy literal in the LIBRARY `constants.ts`, while this demo file is the
// sanctioned home for the reference palette.

import type {
    FlowFieldConfig,
    OklchStop,
} from "../../../src/components/custom/dot-flow-field";
import {
    DEFAULT_FLOW_CONFIG,
    DEFAULT_WAVE_COMPONENTS,
} from "../../../src/components/custom/dot-flow-field";

// The reference TEAL dots — a two-stop teal ramp (the "Claude co-work" dot-wave).
const TEAL_PALETTE: OklchStop[] = [
    { L: 0.82, C: 0.11, h: 195 }, // bright teal (the dot core)
    { L: 0.66, C: 0.13, h: 205 }, // deeper teal-cyan (the velocity edge)
];

// The reference dark-navy ground.
const NAVY_GROUND: OklchStop = { L: 0.18, C: 0.05, h: 255 };

/** The reference reproduction — teal dots over dark navy. */
export const FLOW_PRESET_REFERENCE: FlowFieldConfig = {
    ...DEFAULT_FLOW_CONFIG,
    waveComponents: DEFAULT_WAVE_COMPONENTS,
    palette: TEAL_PALETTE,
    background: NAVY_GROUND,
    windDirection: 35,
    windSpeed: 1.0,
    curlStrength: 0.6,
    dotSize: 2.4,
    dotSizeVelocity: 0.5,
    particleCount: 4000,
};

/** The warm-cream library-identity preset (the default look). */
export const FLOW_PRESET_WARM: FlowFieldConfig = {
    ...DEFAULT_FLOW_CONFIG,
};
