import { mount } from "@vue/test-utils";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { InstrumentChassis, type InstrumentChassisPhase } from "../index";

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
    resolve(__dirname, "../../../../styles/instrument-chassis.css"),
    "utf8",
);
const tokensSource = readFileSync(
    resolve(__dirname, "../../../../styles/tokens.css"),
    "utf8",
);

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
            resolve(__dirname, "../InstrumentChassis.vue"),
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

    it("`complete` resolves to `--color-gold` (brand-canon directly, not a `--chart-*` alias)", () => {
        const completeRegex =
            /\[data-phase="complete"\][\s\S]*?--phase-color:\s*var\(--color-gold\)/;
        expect(cssSource).toMatch(completeRegex);
    });
});
