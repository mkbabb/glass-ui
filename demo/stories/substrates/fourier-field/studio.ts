// The Fourier Field page's editor state: one preset per traced shape, and the
// spectrum each one draws.
import type { ConfiguratorPreset } from "@glass/components/configurator";
import {
    FOURIER_FIGURES,
    makeEllipticSpectrum,
    makeHarmonicFigure,
    mintSpectrum,
    type MintedSpectrum,
} from "@glass/components/fourier-field";
import { getFourierShape } from "./fourier-paths";

export interface FourierStudio {
    source: string;
    harmonics: number;
    /** How crinkled the generated figure is; only the generated source reads it. */
    richness: number;
    showMachine: boolean;
    rainbowChain: boolean;
    interactive: boolean;
    trailArc: number;
    markStroke: number;
    inkOffset: number;
    squash: number;
    glow: number;
    intensity: number;
    speed: number;
    color: string;
}

const LOOK: Omit<FourierStudio, "source" | "harmonics"> = {
    richness: 0.5,
    showMachine: true,
    rainbowChain: true,
    interactive: true,
    trailArc: 0.6,
    markStroke: 8,
    inkOffset: 0.7,
    squash: 0.55,
    glow: 0.14,
    intensity: 1,
    speed: 1,
    color: "var(--viz-fourier)",
};

const preset = (source: string, label: string, harmonics: number, over: Partial<FourierStudio> = {}): ConfiguratorPreset<FourierStudio> => ({
    key: source,
    label,
    config: { ...LOOK, source, harmonics, ...over },
});

export const FOURIER_PRESETS: readonly ConfiguratorPreset<FourierStudio>[] = [
    preset("elliptic", "Generated", 6),
    preset("f-mark", "Script F", 24),
    preset("heart", "Heart", 24, { color: "var(--viz-legendre)" }),
    preset("star", "Star", 18, { color: "var(--viz-chebyshev)" }),
    preset("trefoil", "Trefoil", 2, { trailArc: 1 }),
    preset("quatrefoil", "Quatrefoil", 2, { trailArc: 1 }),
    preset("pentafoil", "Pentafoil", 2, { trailArc: 1, color: "var(--viz-chebyshev)" }),
    preset("hexafoil", "Hexafoil", 2, { trailArc: 1, color: "var(--viz-legendre)" }),
    preset("spiro", "Spirograph", 3, { trailArc: 1 }),
];

// A small seeded generator, so the generated figure is the same on every visit.
function seeded(seed: number): () => number {
    let a = seed >>> 0;
    return () => {
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

export function mintFor(source: string, richness: number): MintedSpectrum {
    if (source === "elliptic") return mintSpectrum(makeEllipticSpectrum(seeded(0x5eed), richness));
    if (source in FOURIER_FIGURES) {
        return mintSpectrum(makeHarmonicFigure(FOURIER_FIGURES[source as keyof typeof FOURIER_FIGURES]));
    }
    return mintSpectrum(getFourierShape(source).spectrum);
}
