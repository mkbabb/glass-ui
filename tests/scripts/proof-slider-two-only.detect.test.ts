import { describe, expect, it } from "vitest";

import {
    compareSemver,
    scanSliderVariants,
} from "../../scripts/proof-slider-two-only.mjs";

/**
 * AY.W-SLD2 — the pure-detector units for proof:slider-two-only clause (5)
 * CONSUMER-BOUNDARY.
 *
 * The gate's consumer arm is the born-RED→GREEN canary the orchestrator verifies
 * device-free. These units lock the `scanSliderVariants` detector so its
 * classification paths cannot regress to false-GREEN (the silent-no-op binding
 * class — a consumer `<Slider variant="rounded">` that resolves `undefined` at
 * runtime and paints the default with no tell). The precedent is the
 * `dock-wrap-content-driven.detect` device-free canary.
 *
 *   - a RED fixture (static `variant="rounded"` AND bound `:variant="'rounded'"`)
 *     → both are out-of-keyset LITERALS → `hits.length === 2`;
 *   - a GREEN fixture (`variant="spectrum"` + default `<Slider />`) → in-keyset /
 *     unbound → `hits.length === 0`;
 *   - an UNCHECKABLE fixture (`:variant="someRef"`) → a ref the gate cannot
 *     statically resolve → `uncheckable === 1`, `hits.length === 0` (the
 *     blind-spot is LOGGED in the facts, NEVER flagged — a false-positive there
 *     would lie).
 */

// The RED source shape — two out-of-keyset variant bindings (static + bound
// literal). Both are the removed-variant silent-no-op the clause must bite.
const SFC_RED = `
<template>
    <Slider variant="rounded" :model-value="[40]" :max="100" />
    <Slider :variant="'rounded'" :model-value="[60]" :max="100" />
</template>
`;

// The GREEN source shape — an in-keyset spectrum binding + a default (unbound,
// resolves the `standard` default). Zero hits.
const SFC_GREEN = `
<template>
    <Slider variant="spectrum" :model-value="[40]" :max="100" />
    <Slider :model-value="[60]" :max="100" />
</template>
`;

// The UNCHECKABLE source shape — a bound ref the gate cannot statically resolve.
// Reported as uncheckable, NOT a violation (flagging it would be a false-positive).
const SFC_UNCHECKABLE = `
<template>
    <Slider :variant="someRef" :model-value="[40]" :max="100" />
</template>
`;

describe("scanSliderVariants()", () => {
    it("is born-RED on two out-of-keyset variant bindings (static + bound literal)", () => {
        const { hits, uncheckable } = scanSliderVariants(SFC_RED, "fixture.vue");
        expect(hits.length).toBe(2);
        expect(hits.every((h) => h.variant === "rounded")).toBe(true);
        expect(hits.every((h) => h.file === "fixture.vue")).toBe(true);
        // No uncheckable binds — both bindings resolve to a literal `rounded`.
        expect(uncheckable).toBe(0);
    });

    it("is GREEN on an in-keyset spectrum binding + a default unbound Slider", () => {
        const { hits, uncheckable } = scanSliderVariants(SFC_GREEN, "fixture.vue");
        expect(hits.length).toBe(0);
        expect(uncheckable).toBe(0);
    });

    it("reports a bound REF as uncheckable (logged, NOT flagged — no false-positive)", () => {
        const { hits, uncheckable } = scanSliderVariants(SFC_UNCHECKABLE, "fixture.vue");
        expect(hits.length).toBe(0);
        expect(uncheckable).toBe(1);
    });

    it("does NOT match a distinct `<SliderRoot>` / `<SliderControl>` component", () => {
        // The `<Slider` open-tag scan is word-boundary-fenced — a removed-variant
        // value on a DIFFERENT component is not a glass-ui `<Slider>` no-op.
        const src = `
            <SliderRoot variant="rounded" />
            <SliderControl variant="rounded" />
        `;
        const { hits, uncheckable } = scanSliderVariants(src, "fixture.vue");
        expect(hits.length).toBe(0);
        expect(uncheckable).toBe(0);
    });

    it("captures a variant= on a line BELOW the multi-line <Slider open tag", () => {
        // `variant=` legally lives on a line below `<Slider` — the tag slice must
        // reach it (the multi-line tolerance the live demo/speedtest sites need).
        const src = `
            <Slider
                :model-value="[40]"
                variant="rounded"
                :max="100"
            />
        `;
        const { hits } = scanSliderVariants(src, "fixture.vue");
        expect(hits.length).toBe(1);
        expect(hits[0].variant).toBe("rounded");
    });
});

describe("compareSemver()", () => {
    it("orders the two-only floor correctly (the version-pin scope)", () => {
        expect(compareSemver("3.1.0", "3.9.0")).toBe(-1); // pre-floor → out of scope
        expect(compareSemver("3.9.0", "3.9.0")).toBe(0); // exactly the floor → in scope
        expect(compareSemver("3.10.0", "3.9.0")).toBe(1); // above floor → in scope
        expect(compareSemver("4.0.0", "3.9.0")).toBe(1);
    });
    it("ignores a pre-release/build suffix (a published RC of the floor IS the floor)", () => {
        expect(compareSemver("3.9.0-rc.1", "3.9.0")).toBe(0);
        expect(compareSemver("v3.9.0", "3.9.0")).toBe(0);
    });
});
