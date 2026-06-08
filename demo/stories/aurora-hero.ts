// AX.W57 (P7) — demo hero-radial reauthor helper.
//
// The Class-A demo heros (hero / intro / paper-glass / auth-shell) hand-rolled
// multi-stop radial-gradient washes keyed off the `--section-color-*` brand
// ramp. P7 replaces those static radials with a LIVE `<Aurora>` painterly
// drift that keeps the SAME page-identity hues — so each hero gains life
// (drift) + idiom (one shared shipped substrate) without losing the
// brand-color seam.
//
// Aurora's `config.palette` is a JS `OklchStop[]` (the shader reads stops, not
// `var(--section-color-*)`), so this factory mirrors the section-ramp HUES
// (tokens.css §colors: rose 359.8, indigo 265.5, amber 69.6, …) into lighter-
// L painterly stops. A consumer re-tinting the wash overrides the palette here
// (the demo-side analogue of overriding `--section-color-*`).
//
// `renderMode="auto"` resolves to the CSS-gradient placeholder
// (`paletteToCssGradient`) on low-power / reduced-motion / save-data devices —
// itself a radial/linear wash, so the replacement is strictly >= the prior
// static radial on every device. One live GL context per mounted route only
// (the demo router mounts ONE story page at a time — within the WebGL budget).

import type { AuroraConfig } from "../../src/components/custom/aurora";
import { DEFAULT_AURORA_CONFIG } from "../../src/components/custom/aurora";

/** A painterly hero stop mirroring a `--section-color-*` brand hue, lifted to
 *  a pastel-wash L/C the static radial blooms used. */
type HeroStop = { L: number; C: number; h: number };

/** The brand section-ramp hues this demo's heros paint with (tokens.css §colors). */
const HERO_PALETTES = {
    /** hero.vue / intro.vue — rose → indigo → amber (section-color-0/2/5). */
    "rose-indigo-amber": [
        { L: 0.78, C: 0.13, h: 359.8 }, // rose      (--section-color-0)
        { L: 0.74, C: 0.12, h: 265.5 }, // indigo    (--section-color-2)
        { L: 0.86, C: 0.1, h: 69.6 }, // amber     (--section-color-5)
        { L: 0.92, C: 0.04, h: 30.0 }, // warm cream tail
    ],
    /** paper-glass.vue — amber → indigo → rose (section-color-5/2/0 order). */
    "amber-indigo-rose": [
        { L: 0.86, C: 0.1, h: 69.6 }, // amber     (--section-color-5)
        { L: 0.74, C: 0.12, h: 265.5 }, // indigo    (--section-color-2)
        { L: 0.78, C: 0.13, h: 359.8 }, // rose      (--section-color-0)
        { L: 0.93, C: 0.03, h: 80.0 }, // cream tail
    ],
    /** auth-shell.vue brand panel — purple → tomato (section-color-1/6). */
    "purple-tomato": [
        { L: 0.74, C: 0.12, h: 305.9 }, // purple    (--section-color-1)
        { L: 0.76, C: 0.13, h: 30.4 }, // tomato    (--section-color-6)
        { L: 0.9, C: 0.04, h: 350.0 }, // warm tail
    ],
} satisfies Record<string, HeroStop[]>;

export type HeroPaletteKey = keyof typeof HERO_PALETTES;

/**
 * Build an `AuroraConfig` for a demo hero from a named brand palette. The
 * nuclei + warp + medium ride the calm `DEFAULT_AURORA_CONFIG` so the drift is
 * a gentle painterly wash (the hero is text-dense — pair with
 * `opacityCeiling` on the `<Aurora>` so the drift recedes behind the prose).
 */
export function heroAuroraConfig(palette: HeroPaletteKey): AuroraConfig {
    return {
        ...DEFAULT_AURORA_CONFIG,
        palette: HERO_PALETTES[palette].map((s) => ({ ...s })),
        // A slightly slower breath + gentler drift than the studio default —
        // a hero backdrop should drift, not animate at it.
        breathPeriod: 48,
        nucleiDrift: 0.012,
        paletteDrift: 0.012,
        saturation: 0.95,
    };
}
