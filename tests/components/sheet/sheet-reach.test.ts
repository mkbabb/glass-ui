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
        const block = rules(css, /\[data-detents\]\[data-side="(bottom|top)"\]/).join(
            "\n",
        );
        expect(block, "top/bottom detent arm must size its block axis").toMatch(
            /block-size:\s*calc\([^;]*--detent-t/,
        );
        const inline = rules(css, /\[data-detents\]\[data-side="(left|right)"\]/).join(
            "\n",
        );
        expect(inline, "left/right detent arm must size its inline axis").toMatch(
            /(width|inline-size):\s*calc\([^;]*--detent-t/,
        );
    });

    it("never translates a detented sheet — the box the frost samples is stationary", () => {
        const sfc = read("src/components/sheet/SheetContent.vue");
        // The detented branch of the spring style publishes the scalar and returns.
        const branch = /if\s*\(detented\.value\)\s*return\s*\{([^}]*)\}/.exec(sfc);
        expect(
            branch,
            "the detented arm must have its own style branch",
        ).not.toBeNull();
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
        const block = rules(css, /\[data-detents\]\[data-side="(bottom|top)"\]/).join(
            "\n",
        );
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

    // THE ROOT IS TWO ROWS, and that is the whole of P1's cause. The region used to take
    // `block-size: 100%` — the WHOLE content box — while sitting below the 44px grip
    // handle in normal flow, so the flow ran exactly one handle past the sheet's own edge
    // and carried the footer with it (measured: footer `bottom` 923 against a 900px
    // viewport at EVERY rung, with `contain: paint` destroying 24 of its 53px). The
    // remainder row is what the region always meant.
    it("gives the detented root its own two rows, so the region is the REMAINDER", () => {
        const css = read("src/components/sheet/styles.css");
        const root = rulesWhere(
            css,
            (selector) =>
                selector.includes('[data-slot="sheet-content"][data-detents]') &&
                !selector.includes(">") &&
                !selector.includes("[data-side") &&
                !selector.includes("[data-modal"),
        ).join("\n");
        // the remainder row's own MINIMUM is the floor clause's; what this one locks is
        // that the handle has a row of its own and the region is what is left over.
        expect(root, "the detented root must own the handle/region split").toMatch(
            /grid-template-rows:\s*auto\s+minmax\([^,]+,\s*1fr\)/,
        );
        expect(root).toMatch(/display:\s*grid/);
        expect(root).toMatch(/contain:\s*layout paint/);

        const region = rulesWhere(
            css,
            (selector) =>
                selector.includes("[data-detents]") &&
                selector.includes('[data-slot="sheet-content-region"]') &&
                !selector.includes(":not("),
        ).join("\n");
        expect(region, "the region may never claim the whole content box").not.toMatch(
            /block-size:\s*100%/,
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
        // The header row yields FIRST where the rung cannot afford it (`minmax(0, auto)`
        // against the body's own floor), and `align-content: end` keeps the last row's
        // end on the region's end — so what a short rung loses is the crown, never the
        // action.
        expect(region, "the detented region owns the three-row grammar").toMatch(
            /grid-template-rows:\s*minmax\(0,\s*auto\)\s+minmax\([^,]+,\s*1fr\)\s+auto/,
        );
        expect(region).toMatch(/align-content:\s*end/);
        const body = rules(
            css,
            /:not\(\[data-slot="dialog-header"\]\):not\(\[data-slot="dialog-footer"\]\)/,
        ).join("\n");
        expect(body).toMatch(/overflow-y:\s*auto/);
        expect(body).toMatch(/overscroll-behavior:\s*contain/);
    });

    // ── π-39 CURE II ──────────────────────────────────────────────────────────────
    //
    // R2-1. A CLAMP IS NOT A FIT. The cure that made P1's figure green also made it
    // UNFALSIFIABLE: `overflow: hidden` + `align-content: end` pins the footer's
    // `rect.bottom` to the region's end whether or not one pixel of the action paints, so
    // the measured bar passed with the footer 0% visible. At the shipped 0.12 peek the
    // primary action was 45% clipped on a 900 viewport and 81% clipped on a real 780 one.
    // The ruling is a FLOOR: a resting rung can never be smaller than the smallest honest
    // sheet — the chrome, in the tokens the chrome is built from, so it transposes one rung
    // down at mobile for free.
    //
    // It is NOT `min-content`, and that is the subtlety: under an intrinsic constraint a
    // `1fr` row resolves to its item's MAX-content contribution and an `auto` row to the
    // header's, so `min-content` reads the sheet's NATURAL height — 447.23 on a 780
    // viewport, which floors rungs 0.25 AND 0.4 onto one box and destroys the ladder it was
    // meant to protect. The floor owes the ACTION, not the content: the crown is absent
    // from the sum by intent, and the body is in it for exactly one line.
    it("floors a resting rung at the smallest honest sheet, in tokens", () => {
        const css = read("src/components/sheet/styles.css");
        const block = rules(css, /\[data-detents\]\[data-side="(bottom|top)"\]/).join(
            "\n",
        );
        const floor = /min-block-size:\s*calc\(([\s\S]*?)\);/.exec(block)?.[1];
        expect(
            floor,
            "the detented block arm must floor at its own chrome",
        ).toBeTruthy();

        expect(floor, "the grip's row and the action's own target").toContain(
            "var(--touch-target)",
        );
        expect(floor, "the region's gutters").toContain("var(--space-body)");
        expect(floor, "the plate's own padding").toContain("var(--space-family)");
        expect(floor, "the seams it draws").toContain("var(--sheet-seam-width)");
        expect(floor, "the body's last line").toContain("1lh");
        expect(
            floor!
                .replace(/var\(--[\w-]+\)|1lh/g, "")
                .match(/\d+(px|rem|em|%|dvh|vh)/g),
            "no bare length may stand in for a chrome row",
        ).toBeNull();

        // …and the seam the floor counts is the seam the chrome actually draws.
        const seams = rules(css, /\[data-slot="dialog-(header|footer)"\]/).join("\n");
        expect(seams).toMatch(/border-block-(start|end):\s*var\(--sheet-seam-width\)/);

        // The remainder row keeps a ZERO minimum on purpose: an intrinsic one would make
        // the region's own natural height a hard floor on the track, and the rung would
        // overflow the sheet it is supposed to fit inside.
        const root = rulesWhere(
            css,
            (selector) =>
                selector.includes('[data-slot="sheet-content"][data-detents]') &&
                !selector.includes(">") &&
                !selector.includes("[data-side") &&
                !selector.includes("[data-modal"),
        ).join("\n");
        expect(root, "the remainder track may not carry an intrinsic minimum").toMatch(
            /grid-template-rows:\s*auto\s+minmax\(0,\s*1fr\)/,
        );
    });

    // R2-2. THE YIELD ORDER, AGAINST ITS OWN COMMENT. "A short rung loses the CROWN, never
    // the action" — but the `1fr` body yielded FIRST and WHOLLY: at the demo's own t=0.25
    // the body measured 0px and not one content row rendered. The header is the crown; it
    // must go before the body loses its last line.
    it("yields the crown before the body — the body keeps a line at every rung", () => {
        const css = read("src/components/sheet/styles.css");
        const region = rulesWhere(
            css,
            (selector) =>
                selector.includes("[data-detents]") &&
                selector.includes('[data-slot="sheet-content-region"]') &&
                !selector.includes(":not("),
        ).join("\n");
        const rows = /grid-template-rows:\s*([^;]+);/.exec(region)?.[1] ?? "";
        const [header, body] = [
            /^minmax\(0,\s*auto\)/.test(rows.trim()),
            /minmax\(1lh,\s*1fr\)/.test(rows),
        ];
        expect(header, "the header row must be able to reach zero").toBe(true);
        expect(body, "the body row must never yield its last line").toBe(true);
    });

    // R2-3. The `scroll` prop was silently DEAD on the detented arm: the cure's
    // `overflow: hidden` sits at the same (0,0,0) specificity LATER in source than
    // `[data-scroll] > region { overflow-y: auto }`, so it won by order alone. With the
    // floor above, the region can no longer overflow its own tracks and the clip has
    // nothing left to hide — so it goes, and the scroll arm is reachable again.
    it("leaves the `scroll` arm reachable on a detented sheet", () => {
        const css = read("src/components/sheet/styles.css");
        // the REGION's own rule — not the chrome rules that hang off it, since the header
        // clips its own overflow by design and that clip is the crown yielding.
        const region = rulesWhere(
            css,
            (selector) =>
                selector.includes("[data-detents]") &&
                selector.includes('[data-slot="sheet-content-region"]') &&
                !selector.includes(":not(") &&
                !selector.includes('[data-slot="dialog-'),
        ).join("\n");
        expect(
            region,
            "the detented region may not clip its own scrollport",
        ).not.toMatch(/overflow:\s*hidden/);
        const scrollArm = rulesWhere(
            css,
            (selector) =>
                selector.includes("[data-scroll]") &&
                selector.includes('[data-slot="sheet-content-region"]'),
        ).join("\n");
        expect(scrollArm).toMatch(/overflow-y:\s*auto/);
    });

    // R2-4. THE FILE'S OWN HEADER PROMISES (0,0,0) EVERYWHERE so a consumer's utility
    // wins. A compound written `:where(host) > child` computes (0,1,0) and ships layout at
    // a specificity the header says it never uses.
    it("keeps every sampler rule at (0,0,0), the specificity its own header promises", () => {
        const css = read("src/components/sheet/styles.css");
        const bare = css.replace(/\/\*[\s\S]*?\*\//g, "");
        const re = /([^{}]+)\{[^{}]*\}/g;
        const offenders: string[] = [];
        let match: RegExpExecArray | null;
        while ((match = re.exec(bare)) !== null) {
            const selector = match[1]!.trim();
            if (!selector.includes('[data-slot="glass-graded-halo"]')) continue;
            if (!selector.startsWith(":where(")) offenders.push(selector);
            // a combinator OUTSIDE the `:where()` is the (0,1,0) tell
            else if (/\)\s*[>+~]/.test(selector)) offenders.push(selector);
        }
        expect(offenders, "sampler rules must be fully wrapped in :where()").toEqual(
            [],
        );
    });

    // The sampler's box must not be a function of the rung. It was `inset: 0` inside a box
    // whose extent IS `--detent-t`, so a drag re-derived a viewport-wide backdrop-filter
    // region on every frame. Each side pins the box to the edge its ramp is anchored at and
    // releases the opposite inset, so the surplus runs off-screen behind the anchored edge.
    //
    // [π-39 CURE II · R2-4] The released inset is PHYSICAL now. The box's side names, its
    // ramp directions and its placements were already physical; releasing a LOGICAL one
    // among them put the ramp ±865px off its own edge under `direction: rtl`.
    it("holds the graded sampler's box CONSTANT across the rung range", () => {
        const css = read("src/components/sheet/styles.css");
        const sideBox = (side: string): string =>
            rulesWhere(
                css,
                (selector) =>
                    selector.includes(`[data-detents][data-side="${side}"]`) &&
                    selector.includes('[data-slot="glass-graded-halo"]'),
            ).join("\n");

        for (const [side, extent, released] of [
            ["bottom", /height:\s*100dvh/, /bottom:\s*auto/],
            ["top", /height:\s*100dvh/, /top:\s*auto/],
            ["left", /width:\s*100dvw/, /left:\s*auto/],
            ["right", /width:\s*100dvw/, /right:\s*auto/],
        ] as const) {
            const box = sideBox(side);
            expect(box, `${side}: the sampler needs a constant extent`).toMatch(extent);
            expect(box, `${side}: the surplus must run away from the viewport`).toMatch(
                released,
            );
            expect(box, `${side}: the sampler's box may not read the rung`).not.toMatch(
                /--detent-t/,
            );
            expect(box, `${side}: the released inset must be PHYSICAL`).not.toMatch(
                /inset-(block|inline)-(start|end)/,
            );
        }
    });

    it("keeps the footer a row of the flow — never absolute, never margin-pushed", () => {
        const css = read("src/components/sheet/styles.css");
        const footer = rules(css, /\[data-slot="dialog-footer"\]/).join("\n");
        expect(footer).not.toMatch(/position\s*:\s*(absolute|fixed)/);
        expect(footer).not.toMatch(/margin-block-start\s*:\s*auto/);
    });
});
