// A-9 (O-20) — the HINT role's BLOCK CEILING.
//
// The overlay register's menu arm has always capped itself against reka's measured
// `--reka-popper-available-height`; the tooltip arm declared radius, pad and font-size
// and nothing else, so a tall hint grew past the viewport with no ceiling and no
// scroller. This file reads the register's own bytes and requires both halves of the
// cap on the hint arm.
//
// WHY THE POPPER SPELLING AND NOT THE TOOLTIP ALIAS. reka sets
// `--reka-popper-available-height` on the FLOATING WRAPPER and mints the per-component
// alias (`--reka-tooltip-content-available-height`) on the inner node. The plate class
// lands on the inner node, so the popper var inherits to every role from ONE
// declaration while the alias would need one spelling per role — a second seam in the
// register that exists to have none. The assertion therefore names the popper var by
// name: reading the alias here would pass a cure that does not resolve.
//
// SEATS +0 — a plain vitest file in the `tests/styles/*` readFileSync idiom
// (`focus-veil.test.ts`), no G-id, nothing minted.
//
// BORN-RED, measured: at HEAD 2984e377 the `[data-reveal="tooltip"]` block reads
//   { --radius-ctx; --radius-inset; padding; font-size }
// and both arms below fail on it.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const PLATE = "src/styles/glass/overlay-plate.css";

const css = readFileSync(join(process.cwd(), PLATE), "utf8").replace(
    /\/\*[\s\S]*?\*\//g,
    "",
);

/** The declaration body of the first rule whose selector list contains `selector`. */
const ruleBody = (selector: string): string => {
    const at = css.indexOf(selector);
    if (at === -1) return "";
    const open = css.indexOf("{", at);
    if (open === -1) return "";
    let depth = 0;
    for (let i = open; i < css.length; i++) {
        if (css[i] === "{") depth++;
        else if (css[i] === "}" && --depth === 0) return css.slice(open + 1, i);
    }
    return "";
};

const tooltip = ruleBody('.glass-overlay-plate[data-reveal="tooltip"]');
const menu = ruleBody('.glass-overlay-plate[data-reveal="menu"]');

describe("overlay plate — the hint role's block ceiling", () => {
    it("caps the hint against reka's measured available height", () => {
        // Non-vacuity: a missing/renamed arm would give an empty body and pass a
        // "contains nothing bad" test. Require the subject first.
        expect(tooltip.length).toBeGreaterThan(0);

        const declaration = tooltip.match(/max-block-size\s*:\s*([^;]+);/);
        expect(declaration).not.toBeNull();
        const value = declaration![1].replace(/\s+/g, " ").trim();
        expect(value).toContain("--reka-popper-available-height");
        // The ceiling stands alone before reka measures: the family's own
        // `--overlay-max-block` is both the outer bound and the var's fallback.
        expect(value).toContain("--overlay-max-block");
    });

    it("gives the capped hint a scroller instead of clipping it", () => {
        // The base `.glass-overlay-plate` declares `overflow: hidden`, so a cap with
        // no scroller would silently swallow the tail of a long hint — a masking
        // fallback, which house law bars. The cap and the scroller land together.
        expect(/overflow-y\s*:\s*auto\s*;/.test(tooltip)).toBe(true);
    });

    it("reads the same channel the menu arm reads", () => {
        // ONE register, one spelling. If the menu arm ever moves to another channel
        // this arm fails and the two are re-unified deliberately, not by drift.
        expect(menu).toContain("--reka-popper-available-height");
    });
});

// O-23 L-6—the hint's leading. The arm borrows the caption SIZE (`--tooltip-text`,
// defaulting to `--type-caption`), so it carries the caption's own leading pairing
// too, the one `@utility text-caption` applies; without it the chip inherits body's
// `--type-leading-body` (1.5) from <body>, where the portal lands.
describe("overlay plate — the hint role's leading", () => {
    it("pairs the caption size with the caption leading", () => {
        expect(tooltip).toMatch(/font-size\s*:\s*var\(--tooltip-text\)\s*;/);
        expect(tooltip).toMatch(/line-height\s*:\s*var\(--type-leading-caption\)\s*;/);
    });
});
