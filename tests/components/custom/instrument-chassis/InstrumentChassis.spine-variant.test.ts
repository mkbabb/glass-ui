import { mount } from "@vue/test-utils";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { readMonolith } from "../../../../scripts/read-css-monoliths.mjs";

import {
    InstrumentChassis,
    type InstrumentChassisVariant,
} from "@glass/components/custom/instrument-chassis/index";

/**
 * AL-W1-α augmented — chassis spine-variant canon test (per AL-X5 §4.1).
 *
 * The `variant="spine"` register closes the AK W2 chassis-spine
 * architectural underclaim. This test asserts:
 *   1. The `InstrumentChassisVariant` union exports both `"glass"` and
 *      `"spine"` (the discriminator the App-level mount path reads).
 *   2. The chassis surface paints the `variant` as a `data-variant`
 *      attribute on the root — the load-bearing hook the spine CSS rule
 *      keys off.
 *   3. The variant defaults to `"glass"` when the prop is omitted, so
 *      every existing consumer keeps its current register without
 *      migration.
 *   4. The 4 spine tokens (`--glass-spine-{opacity,blur,border,vignette}`)
 *      publish at `tokens.css` and the under-shadow rim
 *      (`--glass-under-shadow-spine`) wires the housing's box-shadow.
 *   5. The spine-variant CSS rule retires `backdrop-filter` (per the
 *      housing-is-not-glass spec) and retires the engraved-bezel
 *      `::before` inner stroke (the spine carries its own hairline
 *      outer stroke; the inner bezel would collide with the inner
 *      card's hairline ring).
 */

const cssSource = readFileSync(
    resolve(__dirname, "../../../../src/styles/instrument-chassis.css"),
    "utf8",
);
// AY.W-CSS1 — tokens.css is a thin @import root; read the carved partials as the
// concatenated cascade so the token-publish scan keeps finding the declarations.
const tokensSource = readMonolith(resolve(__dirname, "../../../../"), "tokens");

describe("InstrumentChassis spine variant canon", () => {
    it("exports `glass` and `spine` in the `InstrumentChassisVariant` union", () => {
        const sfcSource = readFileSync(
            resolve(__dirname, "../../../../src/components/custom/instrument-chassis/InstrumentChassis.vue"),
            "utf8",
        );
        const unionMatch = sfcSource.match(
            /export type InstrumentChassisVariant =([\s\S]*?);/,
        );
        expect(unionMatch).not.toBeNull();
        const members = (unionMatch?.[1] ?? "")
            .split("|")
            .map((s) => s.trim().replace(/^"|"$/g, ""))
            .filter((s) => s.length > 0);
        expect(members).toEqual(expect.arrayContaining(["glass", "spine"]));
    });

    it("paints `data-variant` on the chassis root from the `variant` prop", () => {
        const wrapper = mount(InstrumentChassis, {
            props: { variant: "spine" satisfies InstrumentChassisVariant },
            slots: { dial: "<div>dial</div>" },
        });
        expect(
            wrapper.find(".instrument-chassis").attributes("data-variant"),
        ).toBe("spine");
    });

    it("defaults `data-variant` to `glass` when the prop is omitted", () => {
        const wrapper = mount(InstrumentChassis, {
            slots: { dial: "<div>dial</div>" },
        });
        expect(
            wrapper.find(".instrument-chassis").attributes("data-variant"),
        ).toBe("glass");
    });

    it("publishes the 4 spine-tier tokens at `tokens.css`", () => {
        expect(tokensSource).toMatch(/--glass-spine-opacity\s*:\s*0\s*;/);
        expect(tokensSource).toMatch(/--glass-spine-blur\s*:\s*0px\s*;/);
        expect(tokensSource).toMatch(
            /--glass-spine-border\s*:\s*var\(--surface-tint-8\)\s*;/,
        );
        expect(tokensSource).toMatch(/--glass-spine-vignette\s*:[\s\S]*?radial-gradient/);
    });

    it("publishes the 4 under-shadow recipe tokens at `tokens.css`", () => {
        expect(tokensSource).toMatch(/--glass-under-shadow-quiet\s*:/);
        expect(tokensSource).toMatch(/--glass-under-shadow-default\s*:/);
        expect(tokensSource).toMatch(/--glass-under-shadow-vivid\s*:/);
        expect(tokensSource).toMatch(/--glass-under-shadow-spine\s*:/);
    });

    it("composes the spine variant rule with NO backdrop-filter + spine border + under-shadow rim", () => {
        const spineRuleRegex =
            /\.instrument-chassis\[data-variant="spine"\]\s*\{[\s\S]*?backdrop-filter\s*:\s*none[\s\S]*?border\s*:\s*1px solid var\(--glass-spine-border\)[\s\S]*?box-shadow\s*:\s*var\(--glass-under-shadow-spine\)/;
        expect(cssSource).toMatch(spineRuleRegex);
    });

    it("retires the engraved-bezel `::before` at the spine variant", () => {
        const beforeRetireRegex =
            /\.instrument-chassis\[data-variant="spine"\]::before\s*\{\s*display\s*:\s*none/;
        expect(cssSource).toMatch(beforeRetireRegex);
    });

    it("reads the dock backdrop off the unified resting peer — the --glass-blur-dock chain retired (BG.W-CLOSEFIX-9SITE) + the BD dock base alpha (0.50)", () => {
        // BG.W-GLASS-BLUR-PEER re-pointed the dock backdrop onto --glass-blur-resting
        // (8px, the ONE unified glass material); BG.W-CLOSEFIX-9SITE then FULLY RETIRED
        // the --glass-blur-dock chain (composite + saturate + radius + the --blur-dock
        // bridge). The dock paints blur via --dock-surface-blur: var(--glass-blur-resting)
        // (shell.css), so its own rung is gone. BD.W-DOCK-CORE (D3) lifted the dock base
        // alpha 0.42 → 0.50 (margin-insurance for the warm-chromatic darken); it stays
        // the lightest chrome tier (below resting 0.65) and is UNTOUCHED by the retire.
        expect(tokensSource).not.toMatch(/--glass-blur-dock-radius\s*:/);
        expect(tokensSource).toMatch(/--glass-blur-resting-radius\s*:\s*8px\s*;/);
        expect(tokensSource).toMatch(/--glass-opacity-dock\s*:\s*0\.50\s*;/);
    });
});
