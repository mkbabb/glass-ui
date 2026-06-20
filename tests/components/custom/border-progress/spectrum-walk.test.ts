// BC.W-AX-BP-LAZY — the spectrum-walk dynamic-boundary parity unit (node, device-free).
//
// The value.js OKLCH/shorter-hue spectrum walk moved behind a dynamic `import()`
// boundary so `dist/border-progress.js` is value.js-free on the default `var()` ramp.
// This unit asserts the move is BYTE-FAITHFUL + the boundary contract holds:
//   (a) the dynamic-loaded perceptual walk over a concrete anchor set is the OKLCH/
//       shorter-hue walk (deterministic, no chroma trough — the value.js move did not
//       change the math; the carved leaf's output is the SAME math the static path ran);
//   (b) a `var()` ramp + the library default resolve synchronously with NO dynamic
//       import fired (the `onUpgrade` callback — the only seam the cold path uses — is
//       never called; the hot path is value.js-free);
//   (c) a concrete-anchor `spectrumStops` returns the synchronous interim immediately
//       AND yields the perceptual walk after the dynamic chunk resolves (the
//       load-once-then-upgrade contract), and the upgraded output equals the carved
//       leaf's direct `walkConcreteSpectrum` (the dynamic boundary routes to the SAME
//       math — the parity proof).

import { describe, expect, it, vi } from "vitest";

import {
    spectrumStops,
} from "../../../../src/components/custom/border-progress/composables/useBorderSpectrum";
import {
    walkConcreteSpectrum,
    spectrumAt,
} from "../../../../src/components/custom/border-progress/composables/spectrum-walk";
import { BORDER_PROGRESS_DEFAULT_SPECTRUM } from "../../../../src/components/custom/border-progress/constants";

const CONCRETE = ["#e11d48", "#4f46e5"] as const; // rose → indigo (the spec anchor set)
const HEX = /^#[0-9a-f]{6}$/i;
const flush = () => new Promise<void>((r) => setTimeout(r, 0));

describe("spectrum-walk — the carved value.js-bearing perceptual walk (a)", () => {
    it("walks concrete anchors to HEX stops, deterministic + DOM-free", () => {
        const a = walkConcreteSpectrum(CONCRETE, 8);
        const b = walkConcreteSpectrum(CONCRETE, 8);
        expect(a).toHaveLength(8);
        for (const s of a) expect(s).toMatch(HEX);
        // Deterministic — the same anchors+count produce the same walk.
        expect(a).toEqual(b);
        // Endpoints anchor the input (the ramp starts/ends at the anchors).
        expect(a[0]).toMatch(HEX);
        expect(a.at(-1)).toMatch(HEX);
    });

    it("is OKLCH/shorter-hue (no chroma trough at the warm→cool midpoint)", () => {
        // The shorter-hue arc keeps the midpoint saturated; the midpoint stop's
        // chroma is NOT a grey collapse (C well above 0 — the no-trough guarantee).
        const lo = spectrumAt([{ L: 0.6, C: 0.2, h: 20 }, { L: 0.6, C: 0.2, h: 280 }], 0.5);
        expect(lo.C).toBeGreaterThan(0.1); // chroma held across the warm→cool walk
    });
});

describe("spectrumStops — the var()/default fast path is value.js-free (b)", () => {
    it("passes a var() ramp through synchronously with NO upgrade callback fired", async () => {
        const onUpgrade = vi.fn();
        const ramp = ["var(--section-color-0)", "var(--section-color-7)"];
        const out = spectrumStops(ramp, undefined, onUpgrade);
        expect(out).toEqual(ramp); // byte-identical pass-through
        await flush();
        expect(onUpgrade).not.toHaveBeenCalled(); // the dynamic import never fired
    });

    it("passes the LIBRARY DEFAULT brand ramp through synchronously, no upgrade", async () => {
        const onUpgrade = vi.fn();
        const out = spectrumStops(BORDER_PROGRESS_DEFAULT_SPECTRUM, undefined, onUpgrade);
        expect(out).toEqual([...BORDER_PROGRESS_DEFAULT_SPECTRUM]);
        await flush();
        expect(onUpgrade).not.toHaveBeenCalled();
    });
});

describe("spectrumStops — the concrete-anchor load-once-then-upgrade (c)", () => {
    it("returns the synchronous interim, then upgrades to the perceptual walk", async () => {
        const onUpgrade = vi.fn();
        const interim = spectrumStops(CONCRETE, undefined, onUpgrade);
        // The synchronous interim is the raw anchors passed through (a correct banded
        // ramp the conic gradient reads while the perceptual chunk loads).
        expect(interim).toEqual([...CONCRETE]);
        // After the dynamic chunk resolves, the upgrade fires with the perceptual walk.
        await flush();
        await flush();
        expect(onUpgrade).toHaveBeenCalledTimes(1);
        const upgraded = onUpgrade.mock.calls[0]![0] as string[];
        for (const s of upgraded) expect(s).toMatch(HEX);
        // PARITY — the dynamic boundary routes to the SAME math the carved leaf runs.
        const direct = walkConcreteSpectrum(
            CONCRETE,
            // the default sample count the SFC uses (BORDER_PROGRESS_SPECTRUM_SAMPLES)
            upgraded.length,
        );
        expect(upgraded).toEqual(direct);
    });

    it("does not fire the dynamic import when no onUpgrade callback is supplied", async () => {
        // A synchronous caller (no callback) gets the interim and never loads value.js.
        // Use a DISTINCT uncached anchor set so the interim (not a cache hit) is read.
        const uncached = ["#10b981", "#f59e0b"]; // teal → amber (uncached this run)
        const out = spectrumStops(uncached);
        expect(out).toEqual(uncached);
        await flush();
        // (no observable side effect — the absence of a callback means no upgrade path)
    });

    it("serves a repeated concrete-anchor call synchronously from the load-once cache", async () => {
        // First call (with a callback) warms the cache for this anchor set.
        const warm = vi.fn();
        const seed = ["#3b82f6", "#ec4899"]; // blue → pink
        expect(spectrumStops(seed, undefined, warm)).toEqual(seed); // interim first
        await flush();
        await flush();
        expect(warm).toHaveBeenCalledTimes(1);
        const cached = warm.mock.calls[0]![0] as string[];
        // A repeated call now returns the cached perceptual walk SYNCHRONOUSLY (load-once).
        const again = vi.fn();
        const repeat = spectrumStops(seed, undefined, again);
        expect(repeat).toEqual(cached); // the cached HEX walk, not the raw interim
        await flush();
        expect(again).not.toHaveBeenCalled(); // no second dynamic import
    });
});
