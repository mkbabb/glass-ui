import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { Skeleton } from "@glass/components/skeleton";

// CODE, NEVER PROSE. The SFC's own comments name the declarations this wave
// deleted — a strike that does not say what it struck is one nobody can audit —
// so a raw read would fire on the explanation of the cure and call it the defect.
const SKELETON_SRC = readFileSync(
    resolve(process.cwd(), "src/components/skeleton/Skeleton.vue"),
    "utf8",
).replace(/\/\*[\s\S]*?\*\//g, "");
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

// [2026-08-08 · BK #87 W-MARKS · D4/S2] THE Δ-F24-1 SHIMMER-RUNG BLOCK IS STRUCK,
// DEAD BY SUBJECT. It bound `skeleton-scan`'s clock, and `skeleton-scan` no longer
// exists: F24 was closed at its MECHANISM, not at its clock. Its two rows are
// unrecoverable rather than repairable — (b)(ii) matched
// `animation: skeleton-scan …` and there is no such declaration, and (b)(i)
// measured `--duration-shimmer-fast`, a rung this component no longer rides at all
// (its remaining consumers are `theme/literals.css:43` and `Timeline.vue:535`,
// which own it).
//
// That block is itself the receipt for why the mechanism had to go: it was a gate
// binding a CLOCK against a defect that was a CURVE and a GEOMETRY. The band eased
// an infinite ONE-WAY loop — 71.3% of every cycle parked off-box, decelerating to
// zero velocity right at the wrap seam — and travelled 220% of its own inline-size
// in a fixed clock, so it ran at 157 px/s on a 213px chip and 914 px/s on a 1246px
// block, 5.8× apart on one route. Both figures move together when the clock is
// retuned; the ratio never does. A gate on the clock could pass forever.
//
// What replaces it binds the mechanism instead.
describe("Skeleton breathes — F24 closed at the mechanism (BK #87 · S2)", () => {
    // BORN-RED at HEAD: `SKELETON_SRC` carried `skeleton-scan`, `translate3d` and
    // `will-change` (5 matching lines) and its animation read
    // `skeleton-scan var(--duration-shimmer-fast) ease-in-out infinite`.
    it("runs ONE animation, on an alternate cycle, on an ease — never a linear loop", () => {
        const declared = SKELETON_SRC.match(/^\s*animation:\s*([^;]+);/gm) ?? [];
        const running = declared.filter((line) => !/animation:\s*none/.test(line));

        expect(running).toHaveLength(1);
        expect(running[0]).toContain("skeleton-breathe");
        // `alternate` is what lets an ease carry weight in BOTH directions. Easing a
        // one-way loop is the shipped defect; a `linear` loop is weightless by
        // construction under the liquid-weight edict. Only this pairing is honest.
        expect(running[0]).toContain("alternate");
        expect(running[0]).toContain("var(--ease-standard)");
        expect(running[0]).not.toMatch(/\blinear\b/);
    });

    // THE MUTATION THAT BITES, and the reason this row exists at all: retune the
    // clock while keeping the ±110% translate and this still REDS. The travel term
    // is what is measured, not the duration.
    it("animates no property whose travel scales with the box's own width", () => {
        expect(SKELETON_SRC).not.toMatch(/translate3d|translateX|will-change|skeleton-scan/);
        // Opacity is compositor-only and has no geometry to scale, so the breathe is
        // identical on a 213px chip and a 1246px block.
        expect(SKELETON_SRC).toMatch(/@keyframes skeleton-breathe\s*\{[^}]*opacity/);
        // The no-op `prefers-reduced-transparency` branch went with it — its body was
        // byte-identical to the base rule it claimed to override.
        expect(SKELETON_SRC).not.toContain("prefers-reduced-transparency");
    });

    it("stills under reduced motion and under forced colors", () => {
        expect(SKELETON_SRC).toMatch(
            /@media \(prefers-reduced-motion: no-preference\)\s*\{[^}]*animation:/,
        );
        expect(SKELETON_SRC).toMatch(
            /@media \(forced-colors: active\)\s*\{[^}]*animation:\s*none/,
        );
    });
});
