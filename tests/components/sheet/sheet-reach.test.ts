// G-SHEET-REACH — an arm of the LAYOUT seat (G1, its G2 occlusion clause). No seat is
// minted: the invariant is "a declared control of an open surface is reachable", which
// is what the occlusion arm already says, asserted here on the one geometry that
// violated it.
//
// WHAT IT GUARDS. A detent must be a SIZE. The shipped drawer made it a translate — the
// box stayed viewport-tall and slid — so at every rung below full its bottom edge sat
// below the fold and the footer went with it. Measured: the Close button's
// `rect.bottom` was 1554.66 / 1419.66 / 1149.66 against a 900px viewport at t =
// 0.25 / 0.4 / 0.7, `elementFromPoint` returned something else at all three, and nothing
// scrolled it back because the sheet declared `overflow-y: visible`.
//
// The pixel measurement is a π obligation (a browser has layout; jsdom does not). What
// is checkable HERE is its cause, and the spec states the mutation in exactly those
// terms: any translate-based detent, or a restoration of `height: 100%` + `mt-auto`,
// turns this red.
//
// Every read is LAZY and inside its clause. A module-scope read of a file that does not
// exist yet is one load error and "no tests" — ABSENT under the ⊕²⁵ vocabulary, which is
// not the same thing as RED.

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const SRC = (rel: string): string => join(process.cwd(), rel);

function read(rel: string): string {
    const path = SRC(rel);
    expect(existsSync(path), `${rel} must exist`).toBe(true);
    return readFileSync(path, "utf8");
}

/** The rule bodies whose selector text satisfies `accept`, comments stripped. */
function rulesWhere(css: string, accept: (selector: string) => boolean): string[] {
    const bare = css.replace(/\/\*[\s\S]*?\*\//g, "");
    const found: string[] = [];
    const re = /([^{}]+)\{([^{}]*)\}/g;
    let match: RegExpExecArray | null;
    while ((match = re.exec(bare)) !== null) {
        if (accept(match[1]!)) found.push(match[2]!);
    }
    return found;
}

/** The rule bodies whose selector text matches `pattern`, comments stripped. */
function rules(css: string, pattern: RegExp): string[] {
    return rulesWhere(css, (selector) => pattern.test(selector));
}

describe("gate:G-SHEET-REACH — a detent is a size, so the actions stay on the edge", () => {
    it("sizes the anchored axis off the rung scalar on BOTH axes", () => {
        const css = read("src/components/sheet/styles.css");
        const block = rules(
            css,
            /\[data-detents\]\[data-side="(bottom|top)"\]/,
        ).join("\n");
        expect(block, "top/bottom detent arm must size its block axis").toMatch(
            /block-size:\s*calc\([^;]*--detent-t/,
        );
        const inline = rules(
            css,
            /\[data-detents\]\[data-side="(left|right)"\]/,
        ).join("\n");
        expect(inline, "left/right detent arm must size its inline axis").toMatch(
            /(width|inline-size):\s*calc\([^;]*--detent-t/,
        );
    });

    it("never translates a detented sheet — the box the frost samples is stationary", () => {
        const sfc = read("src/components/sheet/SheetContent.vue");
        // The detented branch of the spring style publishes the scalar and returns.
        const branch = /if\s*\(detented\.value\)\s*return\s*\{([^}]*)\}/.exec(sfc);
        expect(branch, "the detented arm must have its own style branch").not.toBeNull();
        expect(branch![1]).toContain("--detent-t");
        expect(branch![1]).not.toContain("translate");
        expect(branch![1]).not.toContain("transform");

        const css = read("src/components/sheet/styles.css");
        const detentRules = rules(css, /\[data-detents\]/).join("\n");
        expect(detentRules).not.toMatch(/\btranslate\s*:/);
        expect(detentRules).not.toMatch(/\btransform\s*:/);
    });

    it("restores neither `height: 100%` nor `mt-auto` on the detented block axis", () => {
        const css = read("src/components/sheet/styles.css");
        const block = rules(
            css,
            /\[data-detents\]\[data-side="(bottom|top)"\]/,
        ).join("\n");
        expect(block).not.toMatch(/(block-size|height)\s*:\s*100%/);
        const sfc = read("src/components/sheet/SheetContent.vue");
        expect(sfc).not.toContain("mt-auto");
    });

    it("registers the rung scalar CLOSED — a dead writer collapses, never seats open", () => {
        const css = read("src/components/sheet/styles.css");
        const reg = /@property\s+--detent-t\s*\{([^}]*)\}/.exec(css);
        expect(reg, "--detent-t must be a registered property").not.toBeNull();
        expect(reg![1]).toMatch(/initial-value:\s*0\s*;/);
        expect(reg![1]).toMatch(/inherits:\s*false/);
    });

    // The registration clause above is only half the contract, and on its own it locked a
    // DEAD mechanism in: `inherits: false` is right (a nested sheet must never take its
    // parent's rung), but it means the scalar resolves to its initial `0` on every element
    // that does not DECLARE it. The first cut published it on the content root alone and
    // read it from the grandchild grip, so the mark's width computed 32px at every rung
    // forever — while this file asserted the lerp's SOURCE TEXT and passed. Writer and
    // reader are bound together here: the element the SFC publishes on must be the element
    // whose rules dereference it, and both read-out legs must dereference it.
    it("binds the scalar's WRITER to its READER — the mark moves on BOTH legs", () => {
        const sfc = read("src/components/sheet/SheetContent.vue");
        const writer = /markStyle\s*=\s*computed[\s\S]{0,240}?"--detent-t"/.exec(sfc);
        expect(writer, "the SFC must publish a mark-level `--detent-t`").not.toBeNull();

        const grip = /<span\b[^>]*data-slot="sheet-detent-grip"[^>]*\/>/.exec(sfc);
        expect(grip, "the grip element must be found").not.toBeNull();
        expect(grip![0], "the grip element itself must carry the scalar").toContain(
            ':style="markStyle"',
        );

        const css = read("src/components/sheet/styles.css");
        const readOut = rulesWhere(
            css,
            (selector) =>
                selector.includes('[data-slot="sheet-detent-grip"]') &&
                !/:hover|:focus-visible|\[data-dragging\]/.test(selector),
        ).join("\n");
        expect(readOut, "the WIDTH leg must dereference the rung scalar").toMatch(
            /inline-size:\s*calc\([^;]*var\(--detent-t\)/,
        );
        expect(readOut, "the IDLE α leg must dereference it too").toMatch(
            /opacity:\s*calc\([^;]*var\(--detent-t\)/,
        );
    });

    // §2.7 calls the band the one thing the library owes reka's non-modal arm. It was
    // prose until now: the anatomy test checks the data attribute, nothing checked the
    // rule, and swapping the band for `--z-modal` passed every gate in the register.
    it("bands a live-behind sheet UNDER the dock chrome", () => {
        const css = read("src/components/sheet/styles.css");
        const band = rules(css, /\[data-modal="false"\]/).join("\n");
        expect(band, "the non-modal arm must carry a band rule").not.toBe("");
        expect(band).toMatch(/z-index:\s*calc\(\s*var\(--z-dock\)\s*-\s*1\s*\)/);
    });

    // A7's fifth affordance. The ✕ is the SIBLING's control — one unscoped
    // `[data-slot="dialog-close"]` recipe in `dialog/styles.css` — so what belongs to the
    // sheet is that it renders one, and that the header it would otherwise run under
    // reserves the gutter on the arm where the two share a row.
    it("renders the close affordance and reserves its gutter where the two collide", () => {
        const sfc = read("src/components/sheet/SheetContent.vue");
        // The ELEMENT, not the prose: this file's own comments name the shared recipe by
        // its selector, so a substring search would pass on a sheet that renders nothing.
        expect(
            /<RekaDialogClose\b[^>]*\bdata-slot="dialog-close"/.test(sfc),
            "the sheet must RENDER a close control carrying the shared slot",
        ).toBe(true);

        const css = read("src/components/sheet/styles.css");
        const gutter = rulesWhere(
            css,
            (selector) =>
                selector.includes(':has([data-slot="dialog-close"])') &&
                selector.includes('[data-slot="dialog-header"]'),
        ).join("\n");
        expect(gutter, "the header must reserve the ✕'s target").toMatch(
            /padding-inline-end:\s*calc\(var\(--touch-target\)\s*\+\s*var\(--space-atom\)\)/,
        );
    });

    it("pins the header and the footer and scrolls only the body, chaining contained", () => {
        const css = read("src/components/sheet/styles.css");
        const region = rulesWhere(
            css,
            (selector) =>
                selector.includes("[data-detents]") &&
                selector.includes('[data-slot="sheet-content-region"]') &&
                !selector.includes(":not("),
        ).join("\n");
        expect(region, "the detented region owns the three-row grammar").toMatch(
            /grid-template-rows:\s*auto\s+minmax\(0,\s*1fr\)\s+auto/,
        );
        const body = rules(
            css,
            /:not\(\[data-slot="dialog-header"\]\):not\(\[data-slot="dialog-footer"\]\)/,
        ).join("\n");
        expect(body).toMatch(/overflow-y:\s*auto/);
        expect(body).toMatch(/overscroll-behavior:\s*contain/);
    });

    it("keeps the footer a row of the flow — never absolute, never margin-pushed", () => {
        const css = read("src/components/sheet/styles.css");
        const footer = rules(css, /\[data-slot="dialog-footer"\]/).join("\n");
        expect(footer).not.toMatch(/position\s*:\s*(absolute|fixed)/);
        expect(footer).not.toMatch(/margin-block-start\s*:\s*auto/);
    });
});
