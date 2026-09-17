// B-6 (O-20) — the SLIDER'S DRAG AFFORDANCE.
//
// The slider is the library's most-consumed dragging surface and the only one that did
// not speak the house drag idiom: a full census of the published CSS found 47 cursor
// rules and not one whose selector matched `.glass-slider`, `.slider-track`,
// `.slider-range`, `.slider-thumb` or `.glass-loupe`. The scrubber rendered the default
// arrow, so nothing on screen said "pull me".
//
// The idiom is already in the tree and is adopted verbatim rather than invented:
// `sheet/styles.css` :257 `cursor: grab` on the detent handle and :101 `grabbing` under
// `[data-dragging]`; `tabs/styles/drag.css` :22/:27 for `.glass-drag-grabbable` /
// `.glass-drag-lift`. The state hooks are the ones the component already writes and the
// stylesheet already reads — `[data-held]`, `[data-disabled]` — so this is three rules
// and no JS.
//
// This is an UPGRADE, not a restoration: the recipe the consumer lost declared
// `cursor: pointer` on the retired `.glass-track`. Pointer says "click"; a scrubber is
// pulled, so it says grab.
//
// SEATS +0 — plain vitest, the `tests/styles/*` readFileSync idiom of
// `focus-veil.test.ts`. BORN-RED on the byte at HEAD 2984e377: the subject file has
// zero `cursor` substrings.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const SHEET = "src/components/slider/styles.css";

const css = readFileSync(join(process.cwd(), SHEET), "utf8").replace(
    /\/\*[\s\S]*?\*\//g,
    "",
);

/** Every rule as `{ selector, body }`, top level and nested alike. */
const rules = (): Array<{ selector: string; body: string }> => {
    const out: Array<{ selector: string; body: string }> = [];
    for (let i = 0; i < css.length; i++) {
        if (css[i] !== "{") continue;
        const head = css.slice(0, i);
        const start = Math.max(head.lastIndexOf("{"), head.lastIndexOf("}")) + 1;
        const selector = head.slice(start).replace(/\s+/g, " ").trim();
        let depth = 0;
        let end = i;
        for (; end < css.length; end++) {
            if (css[end] === "{") depth++;
            else if (css[end] === "}" && --depth === 0) break;
        }
        out.push({ selector, body: css.slice(i + 1, end) });
    }
    return out;
};

const all = rules();

/** The cursor keyword declared by the first rule whose selector matches. */
const cursorFor = (test: (selector: string) => boolean): string | null => {
    for (const { selector, body } of all) {
        if (!test(selector)) continue;
        const match = body.match(/(?:^|[;{])\s*cursor\s*:\s*([^;]+);/);
        if (match) return match[1].trim();
    }
    return null;
};

describe("slider — the drag affordance", () => {
    it("declares the pull affordance on the slider root", () => {
        expect(all.length).toBeGreaterThan(0);
        expect(cursorFor((s) => s === ".glass-slider")).toBe("grab");
    });

    it("switches to grabbing while the scrubber is held", () => {
        // Both predicates, because the weight-train already governs both: `[data-held]`
        // is the component's own grasp register and `:active` covers the frame before
        // it is written.
        const held = cursorFor(
            (s) => s.includes(".glass-slider[data-held]") && s.includes(":active"),
        );
        expect(held).toBe("grabbing");
    });

    it("says not-allowed when the slider is disabled", () => {
        expect(cursorFor((s) => s === '.glass-slider[data-disabled]')).toBe(
            "not-allowed",
        );
    });
});
