// G-DLG-ROOM — the dialog plate's proportion, as a source invariant.
//
// CLOSE-BATTERY ROW, seats +0. This files against the seated PROPORTION register; it
// mints no gate seat and the register receipt is byte-identical across this wave.
//
// The BROWSER half of G-DLG-ROOM (computed `border-radius === 24`, resolved padding,
// the four-corner gutter read at 393, the two-viewport type dump) is the row's π
// obligation and is OWED — it cannot be asserted here, because happy-dom runs no CSS
// cascade. What IS checkable in source, and what the defect class actually was, is the
// SHAPE of the declarations: every space value a named rung, no width query, no `sm:`
// gate, no minted multiplier.
//
// BORN-RED at HEAD, every clause, measured on a pristine `git archive HEAD` tree:
//   radius        `rounded-dialog` → --radius-card → 16, not the room rung
//   padding       `[--overlay-pad-inline:--spacing(6)]` + a `*1.272` block multiplier
//                 → 30.528 / 24, block ≠ inline, and 1.272 is on no series
//   gutter        none at all — x 0, w 393, innerWidth 393 at the mobile capture
//   section gap   `gap-4` → 16, the family rung, not the body rung
//   header gap    `gap-y-1.5` → 6
//   footer gap    `sm:gap-x-2` → 8 at ≥640 and 0.00 below it, on the destructive target
//   alignment     `text-center sm:text-left` → a per-viewport alignment flip
//
// MUTATIONS THAT BITE: drop the inline gutter clamp → RED · restore any `sm:`-gated gap
// or alignment → RED · re-mint `*1.272` → RED · put the plate back on the card rung → RED.

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// Read LAZILY, inside each clause. A module-scope read turns a missing file into one
// load error and "no tests" — every clause must be able to red on its own subject.
const read = (rel: string): string => readFileSync(rel, "utf8");
const dialogCss = () => read("src/components/dialog/styles.css");

const SFC_PATHS = [
    "src/components/dialog/DialogContent.vue",
    "src/components/dialog/DialogHeader.vue",
    "src/components/dialog/DialogFooter.vue",
    "src/components/dialog/DialogTitle.vue",
    "src/components/dialog/DialogDescription.vue",
];
const sfcs = () => SFC_PATHS.map((path) => ({ path, source: read(path) }));

/** The declarations of the FIRST rule whose selector block matches `re`. */
const blockOf = (css: string, re: RegExp): string => {
    const m = css.match(re);
    expect(m, `no rule matched ${re}`).not.toBeNull();
    return m![1];
};

const declOf = (block: string, prop: string): string | undefined => {
    const m = block.match(new RegExp(`(?:^|[;{\\s])${prop}\\s*:\\s*([^;]+);`));
    return m ? m[1].replace(/\s+/g, " ").trim() : undefined;
};

const plate = () =>
    blockOf(dialogCss(), /:where\(\[data-slot="dialog-content"\]\)\s*\{([^}]*)\}/);
const header = () =>
    blockOf(dialogCss(), /:where\(\[data-slot="dialog-header"\]\)\s*\{([^}]*)\}/);
const footer = () =>
    blockOf(dialogCss(), /:where\(\[data-slot="dialog-footer"\]\)\s*\{([^}]*)\}/);
const close = () =>
    blockOf(dialogCss(), /:where\(\[data-slot="dialog-close"\]\)\s*\{([^}]*)\}/);

describe("G-DLG-ROOM · the plate is a room", () => {
    it("rounds on the room rung, not the card", () => {
        expect(declOf(plate(), "border-radius")).toBe("var(--radius-3xl)");
    });

    it("pads block === inline on ONE named rung, with no minted multiplier", () => {
        expect(declOf(plate(), "padding-inline")).toBe("var(--space-family)");
        expect(declOf(plate(), "padding-block")).toBe("var(--space-family)");
        // The `--overlay-pad-*` ladder and its sqrt-phi block lift are gone. 30.528 is on
        // no series, and a block axis that disagrees with the inline one is not a pad.
        // (√φ survives one rung further down as the TYPE interval, which is its job.)
        expect(dialogCss()).not.toMatch(/--overlay-pad/);
        expect(plate()).not.toMatch(/1\.272/);
    });

    it("clamps its own viewport gutter inline", () => {
        expect(declOf(plate(), "inline-size")).toBe(
            "min(100% - 2 * var(--space-section), 32rem)",
        );
    });
});

describe("G-DLG-ROOM · every gap is a named rung", () => {
    it("gaps the sections on the body rung", () => {
        expect(declOf(plate(), "gap")).toBe("var(--space-body)");
    });

    it("gaps title ↔ description on the atom rung", () => {
        expect(declOf(header(), "gap")).toBe("var(--space-atom)");
    });

    it("gaps peer ↔ peer on the body rung, in a row at every viewport", () => {
        expect(declOf(footer(), "gap")).toBe("var(--space-body)");
        expect(declOf(footer(), "flex-direction")).toBe("row");
    });
});

describe("G-DLG-ROOM · nothing is width-conditional", () => {
    // The ONE mobile transposition in the library is `tokens/sizing.css` §1.1, which
    // steps every space rung down exactly one at ≤768px. A component that reads the
    // rungs transposes for free; a component that authors its own width query
    // re-decides its spacing at its own breakpoint, which is how nine ad-hoc
    // transposition factors got minted in the first place.
    it("authors no media query in the dialog lane", () => {
        const widthQueries = dialogCss().match(/@media[^{]*(?:min|max)-width/g) ?? [];
        expect(widthQueries).toEqual([]);
    });

    it("carries no `sm:`-gated layout on any dialog SFC", () => {
        for (const { path, source } of sfcs()) {
            const stripped = source.replace(/<!--[\s\S]*?-->/g, "");
            expect(stripped, path).not.toMatch(/\bsm:/);
        }
    });

    it("does not flip alignment per viewport", () => {
        expect(declOf(header(), "text-align")).toBe("start");
    });
});

describe("G-DLG-ROOM · the type pair is one derived interval", () => {
    it("sizes the description on the body rung", () => {
        const desc = blockOf(
            dialogCss(),
            /:where\(\[data-slot="dialog-description"\]\)\s*\{([^}]*)\}/,
        );
        expect(declOf(desc, "font-size")).toBe("var(--type-body)");
        expect(declOf(desc, "line-height")).toBe("var(--type-leading-body)");
    });

    it("derives the title √φ above it, off the SAME fluid value", () => {
        const title = blockOf(
            dialogCss(),
            /:where\(\[data-slot="dialog-title"\]\)\s*\{([^}]*)\}/,
        );
        expect(declOf(title, "font-size")).toBe("calc(var(--type-body) * 1.272)");
        expect(declOf(title, "line-height")).toBe("var(--type-leading-body)");
    });

    it("takes no part in the §1.1 space transposition", () => {
        // P2, stated checkably. The spec's literal clause — "font-size identical at both
        // viewports" — is FALSIFIED BY THE HOUSE'S OWN LADDER: `--type-body` is
        // `clamp(1rem, 0.92rem + 0.27vw, 1.375rem)` (typography/scale.css), so a type rung
        // with a vw arm cannot be identical across viewports by construction. What P2
        // actually says is that TYPE keeps its own clamp and never rides the space
        // transposition — no type rung appears in sizing.css's §1.1 block. That is the
        // checkable invariant, and it is what this asserts.
        const sizing = read("src/styles/tokens/sizing.css");
        const mobile = blockOf(sizing, /@media \(max-width: 768px\) \{([\s\S]*?)\n\}/);
        expect(mobile).not.toMatch(/--type-/);
        expect(read("src/styles/typography/scale.css")).toMatch(
            /--type-body:\s*clamp\(/,
        );
    });
});

describe("G-DLG-ROOM · the ✕ is a real target with real states", () => {
    it("carries the 44px touch floor and the pill role", () => {
        expect(declOf(close(), "inline-size")).toBe("var(--touch-target)");
        expect(declOf(close(), "block-size")).toBe("var(--touch-target)");
        expect(declOf(close(), "border-radius")).toBe("var(--radius-pill)");
        expect(declOf(close(), "cursor")).toBe("pointer");
    });

    it("separates hover from press, and paints a real focus outline", () => {
        const hover = blockOf(
            dialogCss(),
            /:where\(\[data-slot="dialog-close"\]\):hover::before\s*\{([^}]*)\}/,
        );
        const press = blockOf(
            dialogCss(),
            /:where\(\[data-slot="dialog-close"\]\):active::before\s*\{([^}]*)\}/,
        );
        expect(declOf(hover, "background")).not.toBe(declOf(press, "background"));
        expect(declOf(hover, "scale")).not.toBe(declOf(press, "scale"));

        const focus = blockOf(
            dialogCss(),
            /:where\(\[data-slot="dialog-close"\]\):focus-visible\s*\{([^}]*)\}/,
        );
        expect(declOf(focus, "outline")).toMatch(/^2px solid /);
        expect(declOf(focus, "outline")).not.toMatch(/\bnone\b/);
        expect(declOf(focus, "outline-offset")).toBe("2px");
    });

    it("reserves its own gutter on the header, and only where a ✕ renders", () => {
        // The ✕ sits at `inset-inline-end: --space-family` — the plate's own inline pad —
        // so it occupies the last `--touch-target` of the content box, over the header.
        // 16px of collision became 44px when the target grew to meet A6.
        const gutter = blockOf(
            dialogCss(),
            /:where\(\[data-slot="dialog-content"\]:has\(\[data-slot="dialog-close"\]\)\)\s*:where\(\[data-slot="dialog-header"\]\)\s*\{([^}]*)\}/,
        );
        expect(declOf(gutter, "padding-inline-end")).toBe(
            "calc(var(--touch-target) + var(--space-atom))",
        );
        // `deliberate` and `locked` render no ✕, so the unconditional header rule must
        // not carry the reservation — that would be 52px of dead inline space on two of
        // the three dismiss rungs.
        expect(declOf(header(), "padding-inline-end")).toBeUndefined();
    });

    it("is reachable FIRST by keyboard, matching the visual order", () => {
        const content = sfcs().find((f) => f.path.endsWith("DialogContent.vue"))!.source;
        const closeAt = content.indexOf('data-slot="dialog-close"');
        const slotAt = content.indexOf("<slot />");
        expect(closeAt).toBeGreaterThan(-1);
        expect(slotAt).toBeGreaterThan(-1);
        expect(closeAt).toBeLessThan(slotAt);
    });
});
