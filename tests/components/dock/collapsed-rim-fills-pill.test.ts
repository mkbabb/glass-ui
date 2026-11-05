// D-08 (U/B7d M3): a collapsed dock's progress rim is out of flow and fills the pill. The rule that
// centres the pill's one glyph also caught the rim, shrank it to 0 x 0, and left its track no length.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(resolve(process.cwd(), "src/components/dock/styles/morph.css"), "utf8");
const PERSISTENT = ".glass-dock.collapsed:has(.dock-layer--summary:empty) .dock-persistent";

describe("the collapsed dock's progress rim", () => {
    it("is not centred with the pill's glyph", () => {
        const rule = css.match(/\.dock-persistent > \.scroll-progress-rim\s*\{([^}]*)\}/);
        expect(rule, `${PERSISTENT} > .scroll-progress-rim`).not.toBeNull();
        expect(rule![1]).toMatch(/place-self:\s*stretch/);
    });

    it("comes after the rule that centres the glyph, at higher specificity", () => {
        expect(css.indexOf("> .scroll-progress-rim")).toBeGreaterThan(css.indexOf(`${PERSISTENT} > *`));
    });
});
