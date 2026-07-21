import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { Skeleton } from "@glass/components/skeleton";

const SKELETON_SRC = readFileSync(
    resolve(process.cwd(), "src/components/skeleton/Skeleton.vue"),
    "utf8",
);
const MOTION_TOKENS = readFileSync(
    resolve(process.cwd(), "src/styles/tokens/scheme-motion.css"),
    "utf8",
);

const tokenSeconds = (name: string): number => {
    const raw = MOTION_TOKENS.match(
        new RegExp(`${name.replace(/[-]/g, "\\-")}:\\s*([\\d.]+)s`),
    )?.[1];
    return raw ? Number(raw) : Number.NaN;
};

describe("Skeleton contract", () => {
    it("renders one explicitly decorative reserved shape", () => {
        const wrapper = mount(Skeleton);

        expect(wrapper.attributes("data-slot")).toBe("skeleton");
        expect(wrapper.attributes("aria-hidden")).toBe("true");
        expect(wrapper.attributes("role")).toBeUndefined();
        expect(wrapper.element.children).toHaveLength(0);
    });

    it("keeps loading semantics on the parent rather than accepting them itself", () => {
        const wrapper = mount(Skeleton, {
            attrs: {
                role: "status",
                "aria-label": "Loading",
                "aria-busy": "true",
            },
        });

        expect(wrapper.attributes("aria-hidden")).toBe("true");
        expect(wrapper.attributes("role")).toBeUndefined();
        expect(wrapper.attributes("aria-label")).toBeUndefined();
        expect(wrapper.attributes("aria-busy")).toBeUndefined();
    });

    it("leaves geometry and composition classes to the caller", () => {
        const wrapper = mount(Skeleton, {
            props: { class: "h-12 w-32 rounded-full" },
            attrs: { style: "max-width: 10rem" },
        });

        expect(wrapper.classes()).toEqual(
            expect.arrayContaining(["skeleton", "h-12", "w-32", "rounded-full"]),
        );
        expect(wrapper.attributes("style")).toContain("max-width: 10rem");
    });
});

// BJ.W-FEEDBACK-MOTION-TUNE gate (b) — Δ-F24-1. The shimmer scan must ride the
// documented FAST skeleton rung, never the 5s brand-metal one-pass sweep clock.
describe("Skeleton shimmer rides the canon skeleton rung (F24 / Δ-F24-1)", () => {
    // (b)(ii) RUNG-BINDING — RED at HEAD: skeleton-scan bound `var(--duration-shimmer, 2.4s)`,
    // which resolves to the 5s brand-metal `--duration-shimmer` clock, and carried a dead 2.4s
    // fallback literal.
    it("binds --duration-shimmer-fast, never the brand-metal --duration-shimmer sweep clock", () => {
        const scan = SKELETON_SRC.match(/animation:\s*skeleton-scan\s+([^;]+);/)?.[1] ?? "";
        expect(scan).toContain("var(--duration-shimmer-fast)");
        // The 5s brand-metal one-pass clock must NOT drive the looping band-pass scan.
        expect(scan).not.toMatch(/var\(--duration-shimmer[),\s]/);
        // The dead 2.4s fallback literal is gone (the token always resolves in the library).
        expect(scan).not.toContain("2.4s");
    });

    // (b)(i) PERIOD-VALUE — the rung the scan now binds resolves to the ≤3s canon value
    // (the ladder's own intent: --duration-shimmer-fast = 3s, the FAST band-pass tempo).
    it("resolves the shimmer scan to the canon 3s fast rung, at or under the 3s ladder ceiling", () => {
        const fast = tokenSeconds("--duration-shimmer-fast");
        const metal = tokenSeconds("--duration-shimmer");
        expect(fast).toBe(3);
        expect(fast).toBeLessThanOrEqual(3);
        expect(fast).toBeLessThan(metal); // the fast rung is strictly quicker than the 5s sweep
    });
});
