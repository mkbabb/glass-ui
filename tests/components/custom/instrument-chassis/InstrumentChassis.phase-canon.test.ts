import { mount } from "@vue/test-utils";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { readMonolith } from "../../../../scripts/read-css-monoliths.mjs";

import { InstrumentChassis, type InstrumentChassisPhase } from "@glass/components/custom/instrument-chassis/index";

/**
 * AI.W5-α + AI.W5-β — chassis phase-cascade canon test.
 *
 * Asserts:
 *   1. The `InstrumentChassisPhase` union enumerates every phase the chassis
 *      CSS cascade and the `--chart-*` token canon recognise — including
 *      `"jitter"` (the W5-α additive entry).
 *   2. Every `data-phase="…"` CSS rule names a fallback chain that matches the
 *      `--chart-*` canon at `tokens.css` (W5-β CHASSIS-FALLBACK-WRONG-CANON
 *      retire — the prior `data-phase="upload"` fallback read
 *      `var(--chart-upload, var(--viz-legendre))` instead of `--viz-amber`).
 *   3. The chassis surface emits the supplied `phase` as a `data-phase`
 *      attribute on the root — the load-bearing hook the cascade reads.
 */

const cssSource = readFileSync(
    resolve(__dirname, "../../../../src/styles/instrument-chassis.css"),
    "utf8",
);
// AY.W-CSS1 — tokens.css is a thin @import root; read the carved partials as the
// concatenated cascade so the `--chart-*` canon scan keeps finding the declarations.
const tokensSource = readMonolith(resolve(__dirname, "../../../../"), "tokens");

/** Canon mapping at tokens.css:626–629. Single source of truth. */
const PHASE_CANON: Record<Exclude<InstrumentChassisPhase, "ready" | "complete">, string> = {
    ping: "--viz-chebyshev",
    download: "--viz-fourier",
    upload: "--viz-amber",
    jitter: "--viz-legendre",
};

describe("InstrumentChassis phase-cascade canon", () => {
    it("enumerates every phase including `jitter` in the TypeScript union", () => {
        // Re-derive the union members by parsing the SFC source. This guards
        // against silent removal of a phase from the type without a matching
        // cascade retire.
        const sfcSource = readFileSync(
            resolve(__dirname, "../../../../src/components/custom/instrument-chassis/InstrumentChassis.vue"),
            "utf8",
        );
        const unionMatch = sfcSource.match(
            /export type InstrumentChassisPhase =([\s\S]*?);/,
        );
        expect(unionMatch).not.toBeNull();
        const members = (unionMatch?.[1] ?? "")
            .split("|")
            .map((s) => s.trim().replace(/^"|"$/g, ""))
            .filter((s) => s.length > 0);
        expect(members).toEqual(
            expect.arrayContaining([
                "ready",
                "ping",
                "download",
                "upload",
                "jitter",
                "complete",
            ]),
        );
    });

    it.each(Object.entries(PHASE_CANON))(
        "phase `%s` fallback chain matches the `--chart-*` canon (`var(--chart-%s, var(%s))`)",
        (phase, canonToken) => {
            // Token canon — `--chart-{phase}: var({canonToken})` lives at tokens.css.
            const canonRegex = new RegExp(
                `--chart-${phase}\\s*:\\s*var\\(${canonToken}\\)`,
            );
            expect(tokensSource).toMatch(canonRegex);

            // Cascade fallback — `--phase-color: var(--chart-{phase}, var({canonToken}))`.
            const cascadeRegex = new RegExp(
                `\\[data-phase="${phase}"\\][\\s\\S]*?--phase-color:\\s*var\\(--chart-${phase},\\s*var\\(${canonToken}\\)\\)`,
            );
            expect(cssSource).toMatch(cascadeRegex);
        },
    );

    it("paints `data-phase` on the chassis root from the `phase` prop", () => {
        const wrapper = mount(InstrumentChassis, {
            props: { phase: "jitter" satisfies InstrumentChassisPhase },
            slots: {
                strip: "<div>strip</div>",
                dial: "<div>dial</div>",
                control: "<div>control</div>",
            },
        });
        expect(wrapper.find(".instrument-chassis").attributes("data-phase")).toBe(
            "jitter",
        );
    });

    it("defaults `data-phase` to `ready` when the prop is omitted", () => {
        const wrapper = mount(InstrumentChassis, {
            slots: {
                strip: "<div>strip</div>",
                dial: "<div>dial</div>",
                control: "<div>control</div>",
            },
        });
        expect(wrapper.find(".instrument-chassis").attributes("data-phase")).toBe(
            "ready",
        );
    });

    it("`complete` resolves through the `--phase-complete-color` consumer token (BB.W-PHASE-PALETTE — demoted off the direct `--color-gold` bake, NOT a `--chart-*` alias)", () => {
        // The complete phase reads the overridable consumer token …
        const completeRegex =
            /\[data-phase="complete"\][\s\S]*?--phase-color:\s*var\(--phase-complete-color\)/;
        expect(cssSource).toMatch(completeRegex);
        // … and that token DEFAULTS to the brand-canon gold (no --chart-* alias,
        // no back-compat --color-gold dual-read in the phase arm).
        expect(cssSource).toMatch(
            /--phase-complete-color:\s*var\(--color-gold\)/,
        );
    });
});
