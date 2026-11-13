// The scrubber thumb's colour hook. The base `.slider-thumb` rule paints
// `var(--slider-thumb-bg, var(--foreground))`, so a site recolours the thumb by token as
// it recolours the fill with `--slider-range-bg`, and with the token unset the paint is
// the page's ink. The forced-colors block keeps its own system colours.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(join(process.cwd(), "src/components/slider/styles.css"), "utf8").replace(
    /\/\*[\s\S]*?\*\//g,
    "",
);

/** The body of the first top-level rule whose selector is exactly `selector`. */
const body = (selector: string): string => {
    const m = css.match(new RegExp(`(^|\\})\\s*${selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\{([^}]*)\\}`));
    return m?.[2] ?? "";
};

describe("slider thumb colour token", () => {
    it("the base thumb reads --slider-thumb-bg over --foreground", () => {
        expect(body(".slider-thumb")).toMatch(/background:\s*var\(--slider-thumb-bg,\s*var\(--foreground\)\);/);
    });

    it("no other thumb rule paints a bare --card", () => {
        expect(css).not.toMatch(/background:\s*var\(--card\)\s*;/);
    });

    it("forced colours still paint the scrubber thumb Canvas", () => {
        const forced = css.slice(css.indexOf("@media (forced-colors: active)"));
        expect(forced).toMatch(
            /\.glass-slider:not\(\[data-variant="spectrum"\]\) \.slider-thumb \{[^}]*background: Canvas;/,
        );
    });
});
